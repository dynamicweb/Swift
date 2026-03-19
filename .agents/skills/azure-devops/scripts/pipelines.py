#!/usr/bin/env python3
"""
Azure DevOps build/pipeline operations.
"""

import argparse
import json
import sys

from api_client import api_request


def create_pipeline(project, name, repo_id, yaml_path, folder=None):
    """Create a new pipeline."""
    data = {
        "name": name,
        "configuration": {
            "type": "yaml",
            "path": yaml_path,
            "repository": {
                "id": repo_id,
                "type": "azureReposGit",
            },
        },
    }
    if folder:
        data["folder"] = folder
    return api_request("POST", f"{project}/_apis/pipelines", data=data)


def list_builds(project, top=None, status=None, definition_id=None, branch=None):
    """List builds."""
    params = {}
    if top:
        params["$top"] = str(top)
    if status:
        params["statusFilter"] = status
    if definition_id:
        params["definitions"] = str(definition_id)
    if branch:
        params["branchName"] = f"refs/heads/{branch}" if not branch.startswith("refs/") else branch
    return api_request("GET", f"{project}/_apis/build/builds", params=params)


def get_build(project, build_id):
    """Get build details."""
    return api_request("GET", f"{project}/_apis/build/builds/{build_id}")


def build_logs(project, build_id, log_id=None):
    """Get build logs."""
    path = f"{project}/_apis/build/builds/{build_id}/logs"
    if log_id:
        path += f"/{log_id}"
    return api_request("GET", path)


def build_changes(project, build_id):
    """Get changes associated with a build."""
    return api_request("GET", f"{project}/_apis/build/builds/{build_id}/changes")


def list_definitions(project, top=None, name=None):
    """List build/pipeline definitions."""
    params = {}
    if top:
        params["$top"] = str(top)
    if name:
        params["name"] = name
    return api_request("GET", f"{project}/_apis/build/definitions", params=params)


def run_pipeline(project, pipeline_id, branch=None, variables=None):
    """Run a pipeline."""
    data = {}
    if branch:
        ref = f"refs/heads/{branch}" if not branch.startswith("refs/") else branch
        data["resources"] = {"repositories": {"self": {"refName": ref}}}
    if variables:
        data["variables"] = {k: {"value": v} for k, v in variables.items()}
    return api_request("POST", f"{project}/_apis/pipelines/{pipeline_id}/runs", data=data)


def get_run(project, pipeline_id, run_id):
    """Get a pipeline run."""
    return api_request("GET", f"{project}/_apis/pipelines/{pipeline_id}/runs/{run_id}")


def list_runs(project, pipeline_id, top=None):
    """List pipeline runs."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/pipelines/{pipeline_id}/runs", params=params)


def update_stage(project, build_id, stage_ref_name, state, force_retry=False):
    """Update a build stage (approve/retry)."""
    data = {"state": state, "forceRetryAllJobs": force_retry}
    return api_request(
        "PATCH",
        f"{project}/_apis/build/builds/{build_id}/stages/{stage_ref_name}",
        data=data,
    )


def get_artifacts(project, build_id):
    """Get build artifacts."""
    return api_request("GET", f"{project}/_apis/build/builds/{build_id}/artifacts")


def queue_build(project, definition_id, branch=None, parameters=None):
    """Queue a build."""
    data = {"definition": {"id": definition_id}}
    if branch:
        data["sourceBranch"] = f"refs/heads/{branch}" if not branch.startswith("refs/") else branch
    if parameters:
        data["parameters"] = json.dumps(parameters)
    return api_request("POST", f"{project}/_apis/build/builds", data=data)


def cancel_build(project, build_id):
    """Cancel a running build."""
    return api_request(
        "PATCH",
        f"{project}/_apis/build/builds/{build_id}",
        data={"status": "cancelling"},
    )


def build_status(project, definition_id=None, branch=None):
    """Get the latest build status."""
    params = {"$top": "1", "queryOrder": "finishTimeDescending"}
    if definition_id:
        params["definitions"] = str(definition_id)
    if branch:
        params["branchName"] = f"refs/heads/{branch}" if not branch.startswith("refs/") else branch
    return api_request("GET", f"{project}/_apis/build/builds", params=params)


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps pipeline/build operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # create
    p = subparsers.add_parser("create", help="Create a pipeline")
    p.add_argument("--project", required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--repo-id", required=True)
    p.add_argument("--yaml-path", required=True, help="Path to YAML file in repo")
    p.add_argument("--folder")

    # list-builds
    p = subparsers.add_parser("list-builds", help="List builds")
    p.add_argument("--project", required=True)
    p.add_argument("--top", type=int)
    p.add_argument("--status", choices=["all", "cancelling", "completed", "inProgress", "none", "notStarted", "postponed"])
    p.add_argument("--definition-id", type=int)
    p.add_argument("--branch")

    # get-build
    p = subparsers.add_parser("get-build", help="Get build details")
    p.add_argument("--project", required=True)
    p.add_argument("--build-id", required=True, type=int)

    # build-logs
    p = subparsers.add_parser("build-logs", help="Get build logs")
    p.add_argument("--project", required=True)
    p.add_argument("--build-id", required=True, type=int)
    p.add_argument("--log-id", type=int, help="Specific log ID")

    # build-changes
    p = subparsers.add_parser("build-changes", help="Get build changes")
    p.add_argument("--project", required=True)
    p.add_argument("--build-id", required=True, type=int)

    # list-definitions
    p = subparsers.add_parser("list-definitions", help="List pipeline definitions")
    p.add_argument("--project", required=True)
    p.add_argument("--top", type=int)
    p.add_argument("--name", help="Filter by name")

    # run
    p = subparsers.add_parser("run", help="Run a pipeline")
    p.add_argument("--project", required=True)
    p.add_argument("--pipeline-id", required=True, type=int)
    p.add_argument("--branch")
    p.add_argument("--variable", action="append", nargs=2, metavar=("KEY", "VALUE"))

    # get-run
    p = subparsers.add_parser("get-run", help="Get pipeline run details")
    p.add_argument("--project", required=True)
    p.add_argument("--pipeline-id", required=True, type=int)
    p.add_argument("--run-id", required=True, type=int)

    # list-runs
    p = subparsers.add_parser("list-runs", help="List pipeline runs")
    p.add_argument("--project", required=True)
    p.add_argument("--pipeline-id", required=True, type=int)
    p.add_argument("--top", type=int)

    # update-stage
    p = subparsers.add_parser("update-stage", help="Update a build stage")
    p.add_argument("--project", required=True)
    p.add_argument("--build-id", required=True, type=int)
    p.add_argument("--stage", required=True, help="Stage reference name")
    p.add_argument("--state", required=True, choices=["cancel", "retry"])
    p.add_argument("--force-retry", action="store_true")

    # get-artifacts
    p = subparsers.add_parser("get-artifacts", help="Get build artifacts")
    p.add_argument("--project", required=True)
    p.add_argument("--build-id", required=True, type=int)

    # queue-build
    p = subparsers.add_parser("queue-build", help="Queue a build")
    p.add_argument("--project", required=True)
    p.add_argument("--definition-id", required=True, type=int)
    p.add_argument("--branch")
    p.add_argument("--parameter", action="append", nargs=2, metavar=("KEY", "VALUE"))

    # cancel-build
    p = subparsers.add_parser("cancel-build", help="Cancel a build")
    p.add_argument("--project", required=True)
    p.add_argument("--build-id", required=True, type=int)

    # build-status
    p = subparsers.add_parser("build-status", help="Get latest build status")
    p.add_argument("--project", required=True)
    p.add_argument("--definition-id", type=int)
    p.add_argument("--branch")

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "create":
        return create_pipeline(args.project, args.name, args.repo_id, args.yaml_path, args.folder)
    elif args.command == "list-builds":
        return list_builds(args.project, args.top, args.status, args.definition_id, args.branch)
    elif args.command == "get-build":
        return get_build(args.project, args.build_id)
    elif args.command == "build-logs":
        return build_logs(args.project, args.build_id, args.log_id)
    elif args.command == "build-changes":
        return build_changes(args.project, args.build_id)
    elif args.command == "list-definitions":
        return list_definitions(args.project, args.top, args.name)
    elif args.command == "run":
        variables = dict(args.variable) if args.variable else None
        return run_pipeline(args.project, args.pipeline_id, args.branch, variables)
    elif args.command == "get-run":
        return get_run(args.project, args.pipeline_id, args.run_id)
    elif args.command == "list-runs":
        return list_runs(args.project, args.pipeline_id, args.top)
    elif args.command == "update-stage":
        return update_stage(args.project, args.build_id, args.stage, args.state, args.force_retry)
    elif args.command == "get-artifacts":
        return get_artifacts(args.project, args.build_id)
    elif args.command == "queue-build":
        parameters = dict(args.parameter) if args.parameter else None
        return queue_build(args.project, args.definition_id, args.branch, parameters)
    elif args.command == "cancel-build":
        return cancel_build(args.project, args.build_id)
    elif args.command == "build-status":
        return build_status(args.project, args.definition_id, args.branch)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
