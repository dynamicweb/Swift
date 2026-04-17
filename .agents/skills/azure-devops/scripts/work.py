#!/usr/bin/env python3
"""
Azure DevOps sprint/iteration and capacity operations.
"""

import argparse
import json
import sys

from api_client import api_request


def list_iterations(project):
    """List all iterations (sprints) for a project."""
    return api_request("GET", f"{project}/_apis/work/teamsettings/iterations")


def create_iteration(project, name, start_date=None, finish_date=None, path=None):
    """Create a new iteration."""
    data = {"name": name}
    if start_date or finish_date:
        data["attributes"] = {}
        if start_date:
            data["attributes"]["startDate"] = start_date
        if finish_date:
            data["attributes"]["finishDate"] = finish_date
    if path:
        data["path"] = path
    return api_request("POST", f"{project}/_apis/wit/classificationnodes/iterations", data=data)


def get_iteration(project, iteration_id):
    """Get iteration details."""
    return api_request("GET", f"{project}/_apis/work/teamsettings/iterations/{iteration_id}")


def team_iterations(project, team, timeframe=None):
    """Get iterations for a specific team."""
    params = {}
    if timeframe:
        params["$timeframe"] = timeframe
    return api_request("GET", f"{project}/{team}/_apis/work/teamsettings/iterations", params=params)


def assign_iteration(project, team, iteration_id):
    """Assign an iteration to a team."""
    return api_request(
        "POST",
        f"{project}/{team}/_apis/work/teamsettings/iterations",
        data={"id": iteration_id},
    )


def get_capacities(project, team, iteration_id):
    """Get team member capacities for an iteration."""
    return api_request(
        "GET",
        f"{project}/{team}/_apis/work/teamsettings/iterations/{iteration_id}/capacities",
    )


def set_capacity(project, team, iteration_id, member_id, activities):
    """Set capacity for a team member in an iteration.

    activities: list of dicts with 'name' and 'capacityPerDay' keys.
    """
    return api_request(
        "PUT",
        f"{project}/{team}/_apis/work/teamsettings/iterations/{iteration_id}/capacities/{member_id}",
        data={"activities": activities, "daysOff": []},
    )


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps iteration/sprint operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list-iterations
    p = subparsers.add_parser("list-iterations", help="List iterations")
    p.add_argument("--project", required=True)

    # create-iteration
    p = subparsers.add_parser("create-iteration", help="Create an iteration")
    p.add_argument("--project", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--start-date", help="Start date (ISO format)")
    p.add_argument("--finish-date", help="End date (ISO format)")
    p.add_argument("--path", help="Parent path")

    # get-iteration
    p = subparsers.add_parser("get-iteration", help="Get iteration details")
    p.add_argument("--project", required=True)
    p.add_argument("--iteration-id", required=True)

    # team-iterations
    p = subparsers.add_parser("team-iterations", help="Get team iterations")
    p.add_argument("--project", required=True)
    p.add_argument("--team", required=True)
    p.add_argument("--timeframe", choices=["past", "current", "future"])

    # assign-iteration
    p = subparsers.add_parser("assign-iteration", help="Assign iteration to team")
    p.add_argument("--project", required=True)
    p.add_argument("--team", required=True)
    p.add_argument("--iteration-id", required=True)

    # get-capacities
    p = subparsers.add_parser("get-capacities", help="Get capacities for iteration")
    p.add_argument("--project", required=True)
    p.add_argument("--team", required=True)
    p.add_argument("--iteration-id", required=True)

    # set-capacity
    p = subparsers.add_parser("set-capacity", help="Set member capacity")
    p.add_argument("--project", required=True)
    p.add_argument("--team", required=True)
    p.add_argument("--iteration-id", required=True)
    p.add_argument("--member-id", required=True)
    p.add_argument("--activity", required=True, help="Activity name")
    p.add_argument("--capacity-per-day", required=True, type=float)

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "list-iterations":
        return list_iterations(args.project)
    elif args.command == "create-iteration":
        return create_iteration(args.project, args.name, args.start_date, args.finish_date, args.path)
    elif args.command == "get-iteration":
        return get_iteration(args.project, args.iteration_id)
    elif args.command == "team-iterations":
        return team_iterations(args.project, args.team, args.timeframe)
    elif args.command == "assign-iteration":
        return assign_iteration(args.project, args.team, args.iteration_id)
    elif args.command == "get-capacities":
        return get_capacities(args.project, args.team, args.iteration_id)
    elif args.command == "set-capacity":
        activities = [{"name": args.activity, "capacityPerDay": args.capacity_per_day}]
        return set_capacity(args.project, args.team, args.iteration_id, args.member_id, activities)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
