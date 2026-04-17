#!/usr/bin/env python3
"""
Azure DevOps test plan operations: plans, suites, cases, results.
"""

import argparse
import json
import sys

from api_client import api_request


def list_plans(project, top=None):
    """List test plans."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/testplan/plans", params=params)


def get_plan(project, plan_id):
    """Get test plan details."""
    return api_request("GET", f"{project}/_apis/testplan/plans/{plan_id}")


def create_plan(project, name, area_path=None, iteration=None, start_date=None, end_date=None):
    """Create a test plan."""
    data = {"name": name}
    if area_path:
        data["areaPath"] = area_path
    if iteration:
        data["iteration"] = iteration
    if start_date:
        data["startDate"] = start_date
    if end_date:
        data["endDate"] = end_date
    return api_request("POST", f"{project}/_apis/testplan/plans", data=data)


def list_suites(project, plan_id):
    """List test suites in a plan."""
    return api_request("GET", f"{project}/_apis/testplan/Plans/{plan_id}/suites")


def get_suite(project, plan_id, suite_id):
    """Get test suite details."""
    return api_request("GET", f"{project}/_apis/testplan/Plans/{plan_id}/suites/{suite_id}")


def list_test_cases(project, plan_id, suite_id):
    """List test cases in a suite."""
    return api_request("GET", f"{project}/_apis/testplan/Plans/{plan_id}/suites/{suite_id}/TestCase")


def add_test_cases(project, plan_id, suite_id, work_item_ids):
    """Add test cases to a suite."""
    data = [{"workItem": {"id": wid}} for wid in work_item_ids]
    return api_request(
        "POST",
        f"{project}/_apis/testplan/Plans/{plan_id}/suites/{suite_id}/TestCase",
        data=data,
    )


def list_results(project, run_id, top=None):
    """List test results for a run."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/test/Runs/{run_id}/results", params=params)


def get_result(project, run_id, result_id):
    """Get a specific test result."""
    return api_request("GET", f"{project}/_apis/test/Runs/{run_id}/results/{result_id}")


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps test plan operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list-plans
    p = subparsers.add_parser("list-plans", help="List test plans")
    p.add_argument("--project", required=True)
    p.add_argument("--top", type=int)

    # get-plan
    p = subparsers.add_parser("get-plan", help="Get test plan details")
    p.add_argument("--project", required=True)
    p.add_argument("--plan-id", required=True, type=int)

    # create-plan
    p = subparsers.add_parser("create-plan", help="Create a test plan")
    p.add_argument("--project", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--area-path")
    p.add_argument("--iteration")
    p.add_argument("--start-date")
    p.add_argument("--end-date")

    # list-suites
    p = subparsers.add_parser("list-suites", help="List test suites")
    p.add_argument("--project", required=True)
    p.add_argument("--plan-id", required=True, type=int)

    # get-suite
    p = subparsers.add_parser("get-suite", help="Get test suite details")
    p.add_argument("--project", required=True)
    p.add_argument("--plan-id", required=True, type=int)
    p.add_argument("--suite-id", required=True, type=int)

    # list-test-cases
    p = subparsers.add_parser("list-test-cases", help="List test cases")
    p.add_argument("--project", required=True)
    p.add_argument("--plan-id", required=True, type=int)
    p.add_argument("--suite-id", required=True, type=int)

    # add-test-cases
    p = subparsers.add_parser("add-test-cases", help="Add test cases to a suite")
    p.add_argument("--project", required=True)
    p.add_argument("--plan-id", required=True, type=int)
    p.add_argument("--suite-id", required=True, type=int)
    p.add_argument("--ids", required=True, help="Comma-separated work item IDs")

    # list-results
    p = subparsers.add_parser("list-results", help="List test results")
    p.add_argument("--project", required=True)
    p.add_argument("--run-id", required=True, type=int)
    p.add_argument("--top", type=int)

    # get-result
    p = subparsers.add_parser("get-result", help="Get a test result")
    p.add_argument("--project", required=True)
    p.add_argument("--run-id", required=True, type=int)
    p.add_argument("--result-id", required=True, type=int)

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "list-plans":
        return list_plans(args.project, args.top)
    elif args.command == "get-plan":
        return get_plan(args.project, args.plan_id)
    elif args.command == "create-plan":
        return create_plan(args.project, args.name, args.area_path, args.iteration,
                          args.start_date, args.end_date)
    elif args.command == "list-suites":
        return list_suites(args.project, args.plan_id)
    elif args.command == "get-suite":
        return get_suite(args.project, args.plan_id, args.suite_id)
    elif args.command == "list-test-cases":
        return list_test_cases(args.project, args.plan_id, args.suite_id)
    elif args.command == "add-test-cases":
        ids = [int(i.strip()) for i in args.ids.split(",")]
        return add_test_cases(args.project, args.plan_id, args.suite_id, ids)
    elif args.command == "list-results":
        return list_results(args.project, args.run_id, args.top)
    elif args.command == "get-result":
        return get_result(args.project, args.run_id, args.result_id)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
