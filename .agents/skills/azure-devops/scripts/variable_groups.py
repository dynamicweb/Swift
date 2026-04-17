#!/usr/bin/env python3
"""
Azure DevOps variable group operations.
"""

import argparse
import json
import sys

from api_client import api_request


def list_variable_groups(project, top=None):
    """List variable groups in a project."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/distributedtask/variablegroups", params=params)


def get_variable_group(project, group_id):
    """Get a variable group by ID."""
    return api_request("GET", f"{project}/_apis/distributedtask/variablegroups/{group_id}")


def create_variable_group(project, name, variables=None, description=None):
    """Create a variable group."""
    data = {
        "name": name,
        "type": "Vsts",
        "variables": {},
    }
    if description:
        data["description"] = description
    if variables:
        data["variables"] = {k: {"value": v} for k, v in variables}
    return api_request("POST", f"{project}/_apis/distributedtask/variablegroups", data=data)


def update_variable_group(project, group_id, name=None, variables=None):
    """Update a variable group (GET, merge, PUT)."""
    existing = get_variable_group(project, group_id)
    if "error" in existing:
        return existing
    if name:
        existing["name"] = name
    if variables:
        for k, v in variables:
            existing["variables"][k] = {"value": v}
    return api_request("PUT", f"{project}/_apis/distributedtask/variablegroups/{group_id}", data=existing)


def delete_variable_group(project, group_id):
    """Delete a variable group."""
    return api_request("DELETE", f"{project}/_apis/distributedtask/variablegroups/{group_id}")


def add_variable(project, group_id, key, value, secret=False):
    """Add or update a single variable in a group."""
    existing = get_variable_group(project, group_id)
    if "error" in existing:
        return existing
    var_entry = {"value": value}
    if secret:
        var_entry["isSecret"] = True
    existing["variables"][key] = var_entry
    return api_request("PUT", f"{project}/_apis/distributedtask/variablegroups/{group_id}", data=existing)


def remove_variable(project, group_id, key):
    """Remove a variable from a group."""
    existing = get_variable_group(project, group_id)
    if "error" in existing:
        return existing
    if key not in existing.get("variables", {}):
        return {"error": f"Variable '{key}' not found in group {group_id}"}
    del existing["variables"][key]
    return api_request("PUT", f"{project}/_apis/distributedtask/variablegroups/{group_id}", data=existing)


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps variable group operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list
    p = subparsers.add_parser("list", help="List variable groups")
    p.add_argument("--project", required=True)
    p.add_argument("--top", type=int)

    # get
    p = subparsers.add_parser("get", help="Get a variable group by ID")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="group_id")

    # create
    p = subparsers.add_parser("create", help="Create a variable group")
    p.add_argument("--project", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--variable", action="append", nargs=2, metavar=("KEY", "VALUE"))
    p.add_argument("--description")

    # update
    p = subparsers.add_parser("update", help="Update a variable group")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="group_id")
    p.add_argument("--name")
    p.add_argument("--variable", action="append", nargs=2, metavar=("KEY", "VALUE"))

    # delete
    p = subparsers.add_parser("delete", help="Delete a variable group")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="group_id")

    # add-variable
    p = subparsers.add_parser("add-variable", help="Add/update a variable in a group")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="group_id")
    p.add_argument("--key", required=True)
    p.add_argument("--value", required=True)
    p.add_argument("--secret", action="store_true")

    # remove-variable
    p = subparsers.add_parser("remove-variable", help="Remove a variable from a group")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="group_id")
    p.add_argument("--key", required=True)

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "list":
        return list_variable_groups(args.project, args.top)
    elif args.command == "get":
        return get_variable_group(args.project, args.group_id)
    elif args.command == "create":
        return create_variable_group(args.project, args.name, args.variable, args.description)
    elif args.command == "update":
        return update_variable_group(args.project, args.group_id, args.name, args.variable)
    elif args.command == "delete":
        return delete_variable_group(args.project, args.group_id)
    elif args.command == "add-variable":
        return add_variable(args.project, args.group_id, args.key, args.value, args.secret)
    elif args.command == "remove-variable":
        return remove_variable(args.project, args.group_id, args.key)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
