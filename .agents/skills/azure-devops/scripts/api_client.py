#!/usr/bin/env python3
"""
Shared HTTP client for Azure DevOps REST API.
All domain scripts import api_request from this module.
Supports both OAuth (Bearer) and PAT (Basic) auth transparently.
"""

import json
import urllib.request
import urllib.error
import urllib.parse
from typing import Optional, Union

from auth import get_organization, get_auth_header


def _get_base_url(organization: str, area: Optional[str] = None) -> str:
    """Build base URL based on API area."""
    org = urllib.parse.quote(organization, safe="")
    if area == "vssps":
        return f"https://vssps.dev.azure.com/{org}"
    elif area == "almsearch":
        return f"https://almsearch.dev.azure.com/{org}"
    elif area == "advsec":
        return f"https://advsec.dev.azure.com/{org}"
    else:
        return f"https://dev.azure.com/{org}"


def encode_path(path: str) -> str:
    """URL-encode each segment of an API path while preserving / and $ delimiters."""
    parts = path.split("/")
    encoded = []
    for part in parts:
        if part.startswith("$"):
            # Work item type prefix like $User Story -> $User%20Story
            encoded.append("$" + urllib.parse.quote(part[1:], safe=""))
        else:
            encoded.append(urllib.parse.quote(part, safe="@"))
    return "/".join(encoded)


def api_request(
    method: str,
    path: str,
    data: Optional[Union[dict, list]] = None,
    params: Optional[dict] = None,
    api_version: str = "7.1",
    content_type: str = "application/json",
    area: Optional[str] = None,
    raw_body: Optional[bytes] = None,
    extra_headers: Optional[dict] = None,
) -> dict:
    """
    Make an authenticated request to the Azure DevOps REST API.

    Args:
        method: HTTP method (GET, POST, PATCH, PUT, DELETE)
        path: API path - will be URL-encoded automatically
        data: JSON body (dict or list for JSON Patch)
        params: Query string parameters
        api_version: API version (default 7.1)
        content_type: Content-Type header
        area: API area for different base URLs (vssps, almsearch, advsec)
        raw_body: Raw bytes body (overrides data if set)
        extra_headers: Additional headers to include (e.g., If-Match)

    Returns:
        Parsed JSON response dict, or {"error": "..."} on failure.
        For non-JSON responses, returns {"text": "...", "_continuation_token": "..."}.
    """
    organization = get_organization()
    auth_header = get_auth_header()

    if not organization or not auth_header:
        return {"error": "Not authenticated. Run: python auth.py login"}

    base_url = _get_base_url(organization, area)
    url = f"{base_url}/{encode_path(path)}"

    # Add api-version to params
    if params is None:
        params = {}
    params["api-version"] = api_version

    url += "?" + urllib.parse.urlencode(params)

    headers = {
        "Authorization": auth_header,
        "Content-Type": content_type,
        "Accept": "application/json",
    }
    if extra_headers:
        headers.update(extra_headers)

    if raw_body is not None:
        body = raw_body
    elif data is not None:
        body = json.dumps(data).encode("utf-8")
    else:
        body = None

    try:
        req = urllib.request.Request(url, data=body, headers=headers, method=method)
        with urllib.request.urlopen(req, timeout=30) as response:
            resp_data = response.read().decode("utf-8")
            ct = response.headers.get("Content-Type", "")
            continuation = response.headers.get("x-ms-continuationtoken", "")

            if not resp_data:
                result = {"status": "success"}
            elif "application/json" in ct:
                result = json.loads(resp_data)
            else:
                # Non-JSON response (e.g., build log text)
                result = {"text": resp_data}

            if continuation:
                result["_continuation_token"] = continuation
            return result
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8") if e.fp else str(e)
        try:
            error_json = json.loads(error_body)
            msg = error_json.get("message", error_body)
        except (json.JSONDecodeError, AttributeError):
            msg = error_body[:500] if len(error_body) > 500 else error_body
        return {"error": f"HTTP {e.code}: {msg}"}
    except urllib.error.URLError as e:
        return {"error": f"Request failed: {e.reason}"}
    except json.JSONDecodeError:
        return {"error": "Invalid JSON response"}


def api_request_paged(
    path: str,
    params: Optional[dict] = None,
    api_version: str = "7.1",
    area: Optional[str] = None,
    top: Optional[int] = None,
) -> dict:
    """
    Make a paginated GET request, following continuation tokens.
    Checks both response body and x-ms-continuationtoken header.
    """
    if params is None:
        params = {}
    if top is not None:
        params["$top"] = str(top)

    all_items = []
    continuation_token = None

    while True:
        if continuation_token:
            params["continuationToken"] = continuation_token

        result = api_request("GET", path, params=params, api_version=api_version, area=area)

        if "error" in result:
            return result

        items = result.get("value", [])
        all_items.extend(items)

        # Check continuation token from both body and header
        continuation_token = (
            result.get("continuationToken")
            or result.get("_continuation_token")
        )
        if not continuation_token:
            break

        if top and len(all_items) >= top:
            all_items = all_items[:top]
            break

    return {"value": all_items, "count": len(all_items)}
