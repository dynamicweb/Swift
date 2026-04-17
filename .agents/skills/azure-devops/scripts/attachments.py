#!/usr/bin/env python3
"""
Azure DevOps work item attachment operations: upload, attach, download, list, remove.
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request

from api_client import api_request
from auth import get_auth_header


def upload(project, file_path, filename=None):
    """Upload an attachment and return the attachment URL."""
    if not os.path.isfile(file_path):
        return {"error": f"File not found: {file_path}"}
    with open(file_path, "rb") as f:
        file_bytes = f.read()
    filename = filename or os.path.basename(file_path)
    return api_request(
        "POST",
        f"{project}/_apis/wit/attachments",
        params={"fileName": filename},
        raw_body=file_bytes,
        content_type="application/octet-stream",
    )


def attach(project, work_item_id, url, comment=None):
    """Attach an already-uploaded file to a work item."""
    patch = [
        {
            "op": "add",
            "path": "/relations/-",
            "value": {
                "rel": "AttachedFile",
                "url": url,
                "attributes": {"comment": comment or ""},
            },
        }
    ]
    return api_request(
        "PATCH",
        f"{project}/_apis/wit/workitems/{work_item_id}",
        data=patch,
        content_type="application/json-patch+json",
    )


def upload_and_attach(project, work_item_id, file_path, comment=None):
    """Upload a file and attach it to a work item in one step."""
    result = upload(project, file_path)
    if "error" in result:
        return result
    attachment_url = result.get("url")
    if not attachment_url:
        return {"error": "Upload succeeded but no URL returned"}
    return attach(project, work_item_id, attachment_url, comment)


def list_attachments(project, work_item_id):
    """List attachments on a work item."""
    result = api_request(
        "GET",
        f"{project}/_apis/wit/workitems/{work_item_id}",
        params={"$expand": "relations"},
    )
    if "error" in result:
        return result
    relations = result.get("relations") or []
    attachments = []
    for i, r in enumerate(relations):
        if r.get("rel") == "AttachedFile":
            r["_relationIndex"] = i
            attachments.append(r)
    return {"attachments": attachments}


_ALLOWED_HOSTS = (".dev.azure.com", ".visualstudio.com")


def download(project, url, output_path):
    """Download an attachment to a local file."""
    # Validate URL to prevent credential leakage to non-Azure hosts
    from urllib.parse import urlparse
    parsed = urlparse(url)
    if not any(parsed.hostname and parsed.hostname.endswith(h) for h in _ALLOWED_HOSTS):
        return {"error": f"URL host must be *.dev.azure.com or *.visualstudio.com, got: {parsed.hostname}"}

    auth_header = get_auth_header()
    if not auth_header:
        return {"error": "Not authenticated. Run: python auth.py login"}

    separator = "&" if "?" in url else "?"
    download_url = f"{url}{separator}api-version=7.1"

    req = urllib.request.Request(download_url, method="GET")
    req.add_header("Authorization", auth_header)

    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(output_path, "wb") as f:
                while True:
                    chunk = response.read(8192)
                    if not chunk:
                        break
                    f.write(chunk)
        size = os.path.getsize(output_path)
        return {"status": "downloaded", "path": output_path, "size": size}
    except urllib.error.HTTPError as e:
        return {"error": f"HTTP {e.code}: {e.read().decode('utf-8', errors='replace')[:500]}"}
    except urllib.error.URLError as e:
        return {"error": f"Request failed: {e.reason}"}


def remove(project, work_item_id, index):
    """Remove an attachment from a work item by relation index."""
    patch = [{"op": "remove", "path": f"/relations/{index}"}]
    return api_request(
        "PATCH",
        f"{project}/_apis/wit/workitems/{work_item_id}",
        data=patch,
        content_type="application/json-patch+json",
    )


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps work item attachment operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # upload
    p = subparsers.add_parser("upload", help="Upload an attachment")
    p.add_argument("--project", required=True)
    p.add_argument("--file", required=True, dest="file_path")
    p.add_argument("--filename", help="Override the filename")

    # attach
    p = subparsers.add_parser("attach", help="Attach an uploaded file to a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--url", required=True)
    p.add_argument("--comment")

    # upload-and-attach
    p = subparsers.add_parser("upload-and-attach", help="Upload and attach a file to a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--file", required=True, dest="file_path")
    p.add_argument("--comment")

    # list
    p = subparsers.add_parser("list", help="List attachments on a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")

    # download
    p = subparsers.add_parser("download", help="Download an attachment")
    p.add_argument("--project", required=True)
    p.add_argument("--url", required=True)
    p.add_argument("--output", required=True, dest="output_path")

    # remove
    p = subparsers.add_parser("remove", help="Remove an attachment from a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--index", required=True, type=int)

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "upload":
        return upload(args.project, args.file_path, args.filename)
    elif args.command == "attach":
        return attach(args.project, args.work_item_id, args.url, args.comment)
    elif args.command == "upload-and-attach":
        return upload_and_attach(args.project, args.work_item_id, args.file_path, args.comment)
    elif args.command == "list":
        return list_attachments(args.project, args.work_item_id)
    elif args.command == "download":
        return download(args.project, args.url, args.output_path)
    elif args.command == "remove":
        return remove(args.project, args.work_item_id, args.index)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
