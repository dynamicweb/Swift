#!/usr/bin/env python3
"""
Authentication management for Azure DevOps API.
Supports two methods:
  - OAuth (device code flow via Azure AD) - recommended
  - PAT (Personal Access Token) - fallback

Credentials stored in system keyring.
"""

import argparse
import base64
import json
import keyring
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

KEYCHAIN_SERVICE = "azure-devops-skill"
KEYCHAIN_ACCOUNT = "default"

# Azure AD OAuth configuration
# Uses the Visual Studio Code client ID - shows "Visual Studio Code" prompt
AZURE_AD_CLIENT_ID = "aebc6443-996d-45c2-90f0-388ff96faa56"
AZURE_DEVOPS_RESOURCE = "499b84ac-1321-427f-aa17-267ca6975798"
AZURE_AD_SCOPE = f"{AZURE_DEVOPS_RESOURCE}/.default offline_access"
AZURE_AD_AUTHORITY = "https://login.microsoftonline.com/organizations"
DEVICE_CODE_ENDPOINT = f"{AZURE_AD_AUTHORITY}/oauth2/v2.0/devicecode"
TOKEN_ENDPOINT = f"{AZURE_AD_AUTHORITY}/oauth2/v2.0/token"

TOKEN_EXPIRY_BUFFER_S = 300  # 5 minutes


# ─── Storage ────────────────────────────────────────────────────────────────

def get_stored_config():
    """Get stored config from keyring."""
    try:
        data_str = keyring.get_password(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT)
        if not data_str:
            return None
        return json.loads(data_str)
    except (json.JSONDecodeError, keyring.errors.KeyringError):
        return None


def save_config(config):
    """Save config to keyring."""
    try:
        keyring.set_password(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT, json.dumps(config))
        return True
    except keyring.errors.KeyringError:
        return False


def clear_config():
    """Clear stored credentials from keyring."""
    try:
        keyring.delete_password(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT)
        return True
    except (keyring.errors.PasswordDeleteError, keyring.errors.KeyringError):
        return False


# ─── OAuth Device Code Flow ─────────────────────────────────────────────────

def _http_post_form(url, data):
    """POST form-encoded data, return parsed JSON."""
    body = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def start_device_code_flow():
    """Start OAuth device code flow. Returns device code response."""
    try:
        return _http_post_form(DEVICE_CODE_ENDPOINT, {
            "client_id": AZURE_AD_CLIENT_ID,
            "scope": AZURE_AD_SCOPE,
        })
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        error_body = ""
        if hasattr(e, "read"):
            error_body = e.read().decode("utf-8", errors="replace")
        print(f"Failed to start device code flow: {e}\n{error_body}", file=sys.stderr)
        return None


def poll_for_token(device_code, interval=5, expires_in=900):
    """Poll for token after user authorizes the device code."""
    deadline = time.time() + expires_in
    while time.time() < deadline:
        time.sleep(interval)
        try:
            result = _http_post_form(TOKEN_ENDPOINT, {
                "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
                "client_id": AZURE_AD_CLIENT_ID,
                "device_code": device_code,
            })
            # Success - got tokens
            return result
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            try:
                err = json.loads(body)
            except json.JSONDecodeError:
                print(f"Unexpected error: {body}", file=sys.stderr)
                return None
            error_code = err.get("error", "")
            if error_code == "authorization_pending":
                continue
            elif error_code == "slow_down":
                interval += 5
                continue
            elif error_code == "expired_token":
                print("Device code expired. Please try again.", file=sys.stderr)
                return None
            else:
                print(f"Auth error: {err.get('error_description', error_code)}", file=sys.stderr)
                return None
        except urllib.error.URLError as e:
            print(f"Network error: {e.reason}", file=sys.stderr)
            return None
    print("Timed out waiting for authorization.", file=sys.stderr)
    return None


def refresh_access_token(refresh_token):
    """Refresh an OAuth access token."""
    try:
        return _http_post_form(TOKEN_ENDPOINT, {
            "grant_type": "refresh_token",
            "client_id": AZURE_AD_CLIENT_ID,
            "refresh_token": refresh_token,
            "scope": AZURE_AD_SCOPE,
        })
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        print(f"Token refresh failed: {e}", file=sys.stderr)
        return None


def perform_oauth_login(org):
    """Full OAuth device code login flow."""
    dc = start_device_code_flow()
    if not dc:
        return None

    print(f"\nTo sign in, open: {dc['verification_uri']}", file=sys.stderr, flush=True)
    print(f"Enter code: {dc['user_code']}\n", file=sys.stderr, flush=True)
    print("Waiting for authorization...", file=sys.stderr, flush=True)

    tokens = poll_for_token(
        dc["device_code"],
        interval=dc.get("interval", 5),
        expires_in=dc.get("expires_in", 900),
    )
    if not tokens:
        return None

    config = {
        "organization": org,
        "auth_type": "oauth",
        "access_token": tokens["access_token"],
        "refresh_token": tokens.get("refresh_token", ""),
        "expires_at": int(time.time()) + tokens.get("expires_in", 3600),
    }
    return config


# ─── PAT Auth ───────────────────────────────────────────────────────────────

def validate_pat(organization, pat):
    """Validate PAT by calling the projects API."""
    url = f"https://dev.azure.com/{organization}/_apis/projects?$top=1&api-version=7.1"
    creds = base64.b64encode(f":{pat}".encode()).decode()
    headers = {"Authorization": f"Basic {creds}"}
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            json.loads(resp.read().decode())
            return True
    except (urllib.error.HTTPError, urllib.error.URLError):
        return False


# ─── Public API (used by api_client.py) ─────────────────────────────────────

def get_organization():
    """Get stored organization name."""
    config = get_stored_config()
    return config.get("organization") if config else None


def get_auth_header():
    """Get the Authorization header value. Handles token refresh for OAuth."""
    config = get_stored_config()
    if not config:
        return None

    auth_type = config.get("auth_type", "pat")

    if auth_type == "oauth":
        # Check if token needs refresh
        expires_at = config.get("expires_at", 0)
        if time.time() > (expires_at - TOKEN_EXPIRY_BUFFER_S):
            refresh_token = config.get("refresh_token")
            if refresh_token:
                print("Refreshing access token...", file=sys.stderr)
                new_tokens = refresh_access_token(refresh_token)
                if new_tokens:
                    config["access_token"] = new_tokens["access_token"]
                    config["expires_at"] = int(time.time()) + new_tokens.get("expires_in", 3600)
                    if new_tokens.get("refresh_token"):
                        config["refresh_token"] = new_tokens["refresh_token"]
                    save_config(config)
                else:
                    print("Token refresh failed. Please re-login.", file=sys.stderr)
                    return None
            else:
                print("Token expired and no refresh token. Please re-login.", file=sys.stderr)
                return None
        return f"Bearer {config['access_token']}"

    elif auth_type == "pat":
        pat = config.get("pat", "")
        creds = base64.b64encode(f":{pat}".encode()).decode()
        return f"Basic {creds}"

    return None


# Keep backward compat for any code using get_pat directly
def get_pat():
    """Get stored PAT (for PAT auth mode only)."""
    config = get_stored_config()
    if config and config.get("auth_type", "pat") == "pat":
        return config.get("pat")
    return None


# ─── CLI ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Azure DevOps authentication")
    subparsers = parser.add_subparsers(dest="command")

    login_parser = subparsers.add_parser("login", help="Authenticate (OAuth device code flow)")
    login_parser.add_argument("--org", help="Organization name")
    login_parser.add_argument("--pat", help="Use PAT instead of OAuth")

    subparsers.add_parser("logout", help="Clear stored credentials")
    subparsers.add_parser("status", help="Check authentication status")
    subparsers.add_parser("token", help="Print current access token")

    args = parser.parse_args()

    if args.command == "login":
        org = args.org
        if not org:
            org = input("Organization name: ").strip()
        if not org:
            print("Organization name is required.", file=sys.stderr)
            sys.exit(1)

        if args.pat:
            # PAT auth
            print("Validating PAT...", file=sys.stderr)
            if not validate_pat(org, args.pat):
                print("Invalid credentials.", file=sys.stderr)
                sys.exit(1)
            config = {"organization": org, "auth_type": "pat", "pat": args.pat}
            if save_config(config):
                print(f"Login successful (PAT)! Organization: {org}")
            else:
                print("Failed to store credentials.", file=sys.stderr)
                sys.exit(1)
        else:
            # OAuth device code flow
            config = perform_oauth_login(org)
            if not config:
                print("OAuth login failed.", file=sys.stderr)
                sys.exit(1)
            if save_config(config):
                print(f"Login successful (OAuth)! Organization: {org}")
                print("Credentials stored in system keyring.")
            else:
                print("Failed to store credentials.", file=sys.stderr)
                sys.exit(1)

    elif args.command == "logout":
        if clear_config():
            print("Logged out successfully.")
        else:
            print("No credentials to clear.")

    elif args.command == "token":
        config = get_stored_config()
        if not config:
            print("Not authenticated. Run: python auth.py login", file=sys.stderr)
            sys.exit(1)
        auth_type = config.get("auth_type", "pat")
        if auth_type == "oauth":
            header = get_auth_header()
            if header:
                # Print just the token part
                print(header.split(" ", 1)[1])
            else:
                print("Token expired. Run: python auth.py login", file=sys.stderr)
                sys.exit(1)
        else:
            print(config.get("pat", ""))

    elif args.command == "status":
        config = get_stored_config()
        if not config:
            print("Status: Not authenticated")
            print("Run: python auth.py login")
            sys.exit(1)

        auth_type = config.get("auth_type", "pat")
        org = config.get("organization", "unknown")
        print(f"Status: Authenticated")
        print(f"Organization: {org}")
        print(f"Auth type: {auth_type}")
        print(f"Storage: System keyring")

        if auth_type == "oauth":
            expires_at = config.get("expires_at", 0)
            remaining = expires_at - time.time()
            if remaining > 0:
                print(f"Token expires in: {remaining / 60:.1f} minutes")
                print(f"Auto-refresh: Yes (has refresh token: {bool(config.get('refresh_token'))})")
            else:
                print(f"Token expired: Yes (will auto-refresh on next request)")
        elif auth_type == "pat":
            valid = validate_pat(org, config.get("pat", ""))
            print(f"PAT valid: {valid}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
