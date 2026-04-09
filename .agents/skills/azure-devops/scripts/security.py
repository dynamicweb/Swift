#!/usr/bin/env python3
"""
Azure DevOps Advanced Security operations: alerts.
Uses the advsec.dev.azure.com endpoint.
"""

import argparse
import json
import sys

from api_client import api_request


def list_alerts(project, repo, top=None, state=None, severity=None, alert_type=None):
    """List advanced security alerts for a repository."""
    params = {}
    if top:
        params["$top"] = str(top)
    if state:
        params["criteria.states"] = state
    if severity:
        params["criteria.severities"] = severity
    if alert_type:
        params["criteria.alertTypes"] = alert_type
    return api_request(
        "GET",
        f"{project}/_apis/alert/repositories/{repo}/alerts",
        params=params,
        area="advsec",
    )


def get_alert(project, repo, alert_id):
    """Get details of a specific security alert."""
    return api_request(
        "GET",
        f"{project}/_apis/alert/repositories/{repo}/alerts/{alert_id}",
        area="advsec",
    )


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps Advanced Security operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list-alerts
    p = subparsers.add_parser("list-alerts", help="List security alerts")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True, help="Repository name or ID")
    p.add_argument("--top", type=int)
    p.add_argument("--state", choices=["active", "dismissed", "fixed"])
    p.add_argument("--severity", choices=["critical", "high", "medium", "low", "note"])
    p.add_argument("--type", dest="alert_type", choices=["dependency", "code", "secret"])

    # get-alert
    p = subparsers.add_parser("get-alert", help="Get alert details")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--alert-id", required=True, type=int)

    args = parser.parse_args()

    if args.command == "list-alerts":
        result = list_alerts(args.project, args.repo, args.top, args.state, args.severity, args.alert_type)
    elif args.command == "get-alert":
        result = get_alert(args.project, args.repo, args.alert_id)
    else:
        result = {"error": f"Unknown command: {args.command}"}

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


if __name__ == "__main__":
    main()
