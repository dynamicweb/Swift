#!/usr/bin/env python3
"""
Azure DevOps search operations: code, wiki, work items.
Uses the almsearch.dev.azure.com endpoint.
"""

import argparse
import json
import sys

from api_client import api_request


def search_code(project, query, top=25, skip=0):
    """Search code across repositories."""
    data = {
        "searchText": query,
        "$top": top,
        "$skip": skip,
        "filters": {"Project": [project]},
    }
    return api_request(
        "POST",
        f"{project}/_apis/search/codesearchresults",
        data=data,
        area="almsearch",
    )


def search_wiki(project, query, top=25, skip=0):
    """Search wiki pages."""
    data = {
        "searchText": query,
        "$top": top,
        "$skip": skip,
        "filters": {"Project": [project]},
    }
    return api_request(
        "POST",
        f"{project}/_apis/search/wikisearchresults",
        data=data,
        area="almsearch",
    )


def search_work_items(project, query, top=25, skip=0):
    """Search work items."""
    data = {
        "searchText": query,
        "$top": top,
        "$skip": skip,
        "filters": {"Project": [project]},
    }
    return api_request(
        "POST",
        f"{project}/_apis/search/workitemsearchresults",
        data=data,
        area="almsearch",
    )


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps search operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # code
    p = subparsers.add_parser("code", help="Search code")
    p.add_argument("--project", required=True)
    p.add_argument("--query", required=True)
    p.add_argument("--top", type=int, default=25)
    p.add_argument("--skip", type=int, default=0)

    # wiki
    p = subparsers.add_parser("wiki", help="Search wiki")
    p.add_argument("--project", required=True)
    p.add_argument("--query", required=True)
    p.add_argument("--top", type=int, default=25)
    p.add_argument("--skip", type=int, default=0)

    # work-items
    p = subparsers.add_parser("work-items", help="Search work items")
    p.add_argument("--project", required=True)
    p.add_argument("--query", required=True)
    p.add_argument("--top", type=int, default=25)
    p.add_argument("--skip", type=int, default=0)

    args = parser.parse_args()

    if args.command == "code":
        result = search_code(args.project, args.query, args.top, args.skip)
    elif args.command == "wiki":
        result = search_wiki(args.project, args.query, args.top, args.skip)
    elif args.command == "work-items":
        result = search_work_items(args.project, args.query, args.top, args.skip)
    else:
        result = {"error": f"Unknown command: {args.command}"}

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


if __name__ == "__main__":
    main()
