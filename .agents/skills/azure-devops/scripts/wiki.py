#!/usr/bin/env python3
"""
Azure DevOps wiki operations.
"""

import argparse
import json
import sys

from api_client import api_request


def list_wikis(project):
    """List all wikis in a project."""
    return api_request("GET", f"{project}/_apis/wiki/wikis")


def get_wiki(project, wiki_id):
    """Get wiki details."""
    return api_request("GET", f"{project}/_apis/wiki/wikis/{wiki_id}")


def list_pages(project, wiki_id, path=None, recursion_level="oneLevel"):
    """List pages in a wiki."""
    params = {"recursionLevel": recursion_level}
    if path:
        params["path"] = path
    return api_request("GET", f"{project}/_apis/wiki/wikis/{wiki_id}/pages", params=params)


def get_page(project, wiki_id, path, include_content=True):
    """Get a wiki page."""
    params = {"path": path, "includeContent": str(include_content).lower()}
    return api_request("GET", f"{project}/_apis/wiki/wikis/{wiki_id}/pages", params=params)


def create_or_update_page(project, wiki_id, path, content, version=None):
    """Create or update a wiki page."""
    params = {"path": path}
    headers_extra = {}
    if version:
        headers_extra["If-Match"] = version
    return api_request(
        "PUT",
        f"{project}/_apis/wiki/wikis/{wiki_id}/pages",
        data={"content": content},
        params=params,
        extra_headers=headers_extra if headers_extra else None,
    )


def get_page_content(project, wiki_id, path):
    """Get raw content of a wiki page."""
    params = {"path": path, "includeContent": "true"}
    result = api_request("GET", f"{project}/_apis/wiki/wikis/{wiki_id}/pages", params=params)
    if "error" in result:
        return result
    return {"path": path, "content": result.get("content", ""), "gitItemPath": result.get("gitItemPath")}


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps wiki operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list
    p = subparsers.add_parser("list", help="List wikis")
    p.add_argument("--project", required=True)

    # get
    p = subparsers.add_parser("get", help="Get wiki details")
    p.add_argument("--project", required=True)
    p.add_argument("--wiki-id", required=True)

    # list-pages
    p = subparsers.add_parser("list-pages", help="List wiki pages")
    p.add_argument("--project", required=True)
    p.add_argument("--wiki-id", required=True)
    p.add_argument("--path")
    p.add_argument("--recursion", default="oneLevel", choices=["oneLevel", "full"])

    # get-page
    p = subparsers.add_parser("get-page", help="Get a wiki page")
    p.add_argument("--project", required=True)
    p.add_argument("--wiki-id", required=True)
    p.add_argument("--path", required=True)

    # create-or-update-page
    p = subparsers.add_parser("create-or-update-page", help="Create or update a page")
    p.add_argument("--project", required=True)
    p.add_argument("--wiki-id", required=True)
    p.add_argument("--path", required=True)
    p.add_argument("--content", required=True)
    p.add_argument("--version", help="ETag for update (omit for create)")

    # get-page-content
    p = subparsers.add_parser("get-page-content", help="Get page raw content")
    p.add_argument("--project", required=True)
    p.add_argument("--wiki-id", required=True)
    p.add_argument("--path", required=True)

    args = parser.parse_args()

    if args.command == "list":
        result = list_wikis(args.project)
    elif args.command == "get":
        result = get_wiki(args.project, args.wiki_id)
    elif args.command == "list-pages":
        result = list_pages(args.project, args.wiki_id, args.path, args.recursion)
    elif args.command == "get-page":
        result = get_page(args.project, args.wiki_id, args.path)
    elif args.command == "create-or-update-page":
        result = create_or_update_page(args.project, args.wiki_id, args.path, args.content, args.version)
    elif args.command == "get-page-content":
        result = get_page_content(args.project, args.wiki_id, args.path)
    else:
        result = {"error": f"Unknown command: {args.command}"}

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


if __name__ == "__main__":
    main()
