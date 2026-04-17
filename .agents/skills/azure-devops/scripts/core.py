#!/usr/bin/env python3
"""
Azure DevOps core operations: projects, teams, identities.
"""

import argparse
import json
import sys

from api_client import api_request, api_request_paged


def list_projects(top=None):
    """List all projects in the organization."""
    return api_request_paged("_apis/projects", top=top)


def list_teams(project):
    """List teams in a project."""
    return api_request_paged(f"_apis/projects/{project}/teams")


def get_identity(search):
    """Search for a user identity."""
    return api_request(
        "GET",
        "_apis/identities",
        params={"searchFilter": "General", "filterValue": search},
        area="vssps",
    )


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps core operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    lp = subparsers.add_parser("list-projects", help="List all projects")
    lp.add_argument("--top", type=int, help="Max results")

    lt = subparsers.add_parser("list-teams", help="List teams in a project")
    lt.add_argument("--project", required=True, help="Project name or ID")

    gi = subparsers.add_parser("get-identity", help="Search for a user identity")
    gi.add_argument("--search", required=True, help="Search string (name or email)")

    args = parser.parse_args()

    if args.command == "list-projects":
        result = list_projects(args.top)
    elif args.command == "list-teams":
        result = list_teams(args.project)
    elif args.command == "get-identity":
        result = get_identity(args.search)
    else:
        result = {"error": f"Unknown command: {args.command}"}

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


if __name__ == "__main__":
    main()
