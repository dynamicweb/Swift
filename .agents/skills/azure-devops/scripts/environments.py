#!/usr/bin/env python3
"""
Azure DevOps environment and approval operations.
"""

import argparse
import json
import sys

from api_client import api_request


def list_environments(project, top=None):
    """List environments in a project."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/pipelines/environments", params=params)


def get_environment(project, env_id):
    """Get environment details."""
    return api_request("GET", f"{project}/_apis/pipelines/environments/{env_id}")


def create_environment(project, name, description=None):
    """Create an environment."""
    data = {"name": name}
    if description:
        data["description"] = description
    return api_request("POST", f"{project}/_apis/pipelines/environments", data=data)


def delete_environment(project, env_id):
    """Delete an environment."""
    return api_request("DELETE", f"{project}/_apis/pipelines/environments/{env_id}")


def list_checks(project, env_id):
    """List approval/check configurations for an environment."""
    params = {"resourceType": "environment", "resourceId": str(env_id)}
    return api_request("GET", f"{project}/_apis/pipelines/checks/configurations", params=params, api_version="7.1-preview.1")


def list_approvals(project, state="pending"):
    """List pending approvals."""
    params = {}
    if state != "all":
        params["state"] = state
    return api_request("GET", f"{project}/_apis/pipelines/approvals", params=params, api_version="7.1-preview.1")


def approve_approval(project, approval_id, comment=None):
    """Approve a pending approval."""
    item = {"approvalId": approval_id, "status": "approved"}
    if comment:
        item["comment"] = comment
    return api_request("PATCH", f"{project}/_apis/pipelines/approvals", data=[item], api_version="7.1-preview.1")


def reject_approval(project, approval_id, comment=None):
    """Reject a pending approval."""
    item = {"approvalId": approval_id, "status": "rejected"}
    if comment:
        item["comment"] = comment
    return api_request("PATCH", f"{project}/_apis/pipelines/approvals", data=[item], api_version="7.1-preview.1")


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps environment and approval operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list
    p = subparsers.add_parser("list", help="List environments")
    p.add_argument("--project", required=True)
    p.add_argument("--top", type=int)

    # get
    p = subparsers.add_parser("get", help="Get environment details")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="env_id")

    # create
    p = subparsers.add_parser("create", help="Create an environment")
    p.add_argument("--project", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--description")

    # delete
    p = subparsers.add_parser("delete", help="Delete an environment")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="env_id")

    # list-checks
    p = subparsers.add_parser("list-checks", help="List checks for an environment")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="env_id")

    # list-approvals
    p = subparsers.add_parser("list-approvals", help="List pending approvals")
    p.add_argument("--project", required=True)
    p.add_argument("--state", choices=["pending", "approved", "rejected", "all"], default="pending")

    # approve
    p = subparsers.add_parser("approve", help="Approve a pending approval")
    p.add_argument("--project", required=True)
    p.add_argument("--approval-id", required=True)
    p.add_argument("--comment")

    # reject
    p = subparsers.add_parser("reject", help="Reject a pending approval")
    p.add_argument("--project", required=True)
    p.add_argument("--approval-id", required=True)
    p.add_argument("--comment")

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "list":
        return list_environments(args.project, args.top)
    elif args.command == "get":
        return get_environment(args.project, args.env_id)
    elif args.command == "create":
        return create_environment(args.project, args.name, args.description)
    elif args.command == "delete":
        return delete_environment(args.project, args.env_id)
    elif args.command == "list-checks":
        return list_checks(args.project, args.env_id)
    elif args.command == "list-approvals":
        return list_approvals(args.project, args.state)
    elif args.command == "approve":
        return approve_approval(args.project, args.approval_id, args.comment)
    elif args.command == "reject":
        return reject_approval(args.project, args.approval_id, args.comment)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
