#!/usr/bin/env python3
"""
Azure DevOps branch policy operations: list, create, update, delete policies.
"""

import argparse
import json
import sys

from api_client import api_request


def list_policies(project, branch=None, repo=None):
    """List all branch policies in a project."""
    params = {}
    if branch:
        ref_name = branch if branch.startswith("refs/") else f"refs/heads/{branch}"
        params["scope[0].refName"] = ref_name
    if repo:
        params["scope[0].repositoryId"] = repo
    return api_request("GET", f"{project}/_apis/policy/configurations", params=params)


def get_policy(project, policy_id):
    """Get a specific policy configuration."""
    return api_request("GET", f"{project}/_apis/policy/configurations/{policy_id}")


def list_types(project):
    """List available policy types."""
    return api_request("GET", f"{project}/_apis/policy/types")


def create_min_reviewers(project, repo_id, branch, min_reviewers,
                         creator_vote_counts=False, allow_downvotes=False, reset_on_push=False):
    """Create a minimum reviewers policy."""
    ref_name = branch if branch.startswith("refs/") else f"refs/heads/{branch}"
    data = {
        "isEnabled": True,
        "isBlocking": True,
        "type": {"id": "fa4e907d-c16b-4a4c-9dfa-4906e5d171dd"},
        "settings": {
            "minimumApproverCount": min_reviewers,
            "creatorVoteCounts": creator_vote_counts,
            "allowDownvotes": allow_downvotes,
            "resetOnSourcePush": reset_on_push,
            "scope": [{"refName": ref_name, "matchKind": "Exact", "repositoryId": repo_id}],
        },
    }
    return api_request("POST", f"{project}/_apis/policy/configurations", data=data)


def create_build_policy(project, repo_id, branch, build_definition_id,
                        display_name="Build Validation", valid_duration=720):
    """Create a build validation policy."""
    ref_name = branch if branch.startswith("refs/") else f"refs/heads/{branch}"
    data = {
        "isEnabled": True,
        "isBlocking": True,
        "type": {"id": "0609b952-1397-4640-95ec-e00a01b2c241"},
        "settings": {
            "buildDefinitionId": build_definition_id,
            "displayName": display_name,
            "validDuration": valid_duration,
            "scope": [{"refName": ref_name, "matchKind": "Exact", "repositoryId": repo_id}],
        },
    }
    return api_request("POST", f"{project}/_apis/policy/configurations", data=data)


def update_policy(project, policy_id, enabled=None, blocking=None):
    """Update a policy (enable/disable/change blocking)."""
    existing = get_policy(project, policy_id)
    if "error" in existing:
        return existing
    if enabled is not None:
        existing["isEnabled"] = enabled == "true"
    if blocking is not None:
        existing["isBlocking"] = blocking == "true"
    return api_request("PUT", f"{project}/_apis/policy/configurations/{policy_id}", data=existing)


def delete_policy(project, policy_id):
    """Delete a policy."""
    return api_request("DELETE", f"{project}/_apis/policy/configurations/{policy_id}")


def list_evaluations(project, pr_id):
    """List policy evaluations for a pull request."""
    # Resolve project GUID if a name was passed (artifactId requires GUID)
    proj_info = api_request("GET", f"_apis/projects/{project}")
    if "error" in proj_info:
        return proj_info
    project_id = proj_info.get("id", project)
    artifact_id = f"vstfs:///CodeReview/CodeReviewId/{project_id}/{pr_id}"
    return api_request("GET", f"{project}/_apis/policy/evaluations", params={"artifactId": artifact_id})


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps branch policy operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list
    p = subparsers.add_parser("list", help="List branch policies")
    p.add_argument("--project", required=True)
    p.add_argument("--branch", help="Filter by branch name (e.g., main)")
    p.add_argument("--repo", help="Filter by repository ID or name")

    # get
    p = subparsers.add_parser("get", help="Get a policy configuration")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="policy_id")

    # list-types
    p = subparsers.add_parser("list-types", help="List available policy types")
    p.add_argument("--project", required=True)

    # create-min-reviewers
    p = subparsers.add_parser("create-min-reviewers", help="Create minimum reviewers policy")
    p.add_argument("--project", required=True)
    p.add_argument("--repo-id", required=True, help="Repository ID")
    p.add_argument("--branch", required=True, help="Branch to protect (e.g., main)")
    p.add_argument("--min-reviewers", required=True, type=int, help="Minimum number of reviewers")
    p.add_argument("--creator-vote-counts", action="store_true", help="Whether creator's vote counts")
    p.add_argument("--allow-downvotes", action="store_true", help="Allow completion with rejections")
    p.add_argument("--reset-on-push", action="store_true", help="Reset votes on new push")

    # create-build-policy
    p = subparsers.add_parser("create-build-policy", help="Create build validation policy")
    p.add_argument("--project", required=True)
    p.add_argument("--repo-id", required=True, help="Repository ID")
    p.add_argument("--branch", required=True, help="Branch to protect (e.g., main)")
    p.add_argument("--build-definition-id", required=True, type=int, help="Build definition ID")
    p.add_argument("--display-name", default="Build Validation", help="Display name for the policy")
    p.add_argument("--valid-duration", type=int, default=720, help="Minutes build is valid (default: 720)")

    # update
    p = subparsers.add_parser("update", help="Update a policy")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="policy_id")
    p.add_argument("--enabled", choices=["true", "false"], help="Enable or disable the policy")
    p.add_argument("--blocking", choices=["true", "false"], help="Set policy as blocking or optional")

    # delete
    p = subparsers.add_parser("delete", help="Delete a policy")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="policy_id")

    # list-evaluations
    p = subparsers.add_parser("list-evaluations", help="List policy evaluations for a PR")
    p.add_argument("--project", required=True)
    p.add_argument("--pr-id", required=True, type=int)

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "list":
        return list_policies(args.project, args.branch, args.repo)
    elif args.command == "get":
        return get_policy(args.project, args.policy_id)
    elif args.command == "list-types":
        return list_types(args.project)
    elif args.command == "create-min-reviewers":
        return create_min_reviewers(args.project, args.repo_id, args.branch, args.min_reviewers,
                                    args.creator_vote_counts, args.allow_downvotes, args.reset_on_push)
    elif args.command == "create-build-policy":
        return create_build_policy(args.project, args.repo_id, args.branch, args.build_definition_id,
                                   args.display_name, args.valid_duration)
    elif args.command == "update":
        return update_policy(args.project, args.policy_id, args.enabled, args.blocking)
    elif args.command == "delete":
        return delete_policy(args.project, args.policy_id)
    elif args.command == "list-evaluations":
        return list_evaluations(args.project, args.pr_id)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
