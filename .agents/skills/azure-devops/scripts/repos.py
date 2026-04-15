#!/usr/bin/env python3
"""
Azure DevOps Git repository operations: repos, branches, PRs.
"""

import argparse
import json
import sys

from api_client import api_request


def list_repos(project):
    """List all repositories in a project."""
    return api_request("GET", f"{project}/_apis/git/repositories")


def get_repo(project, repo):
    """Get a repository by name or ID."""
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}")


def list_branches(project, repo):
    """List branches in a repository."""
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/refs", params={"filter": "heads/"})


def create_branch(project, repo, name, source_branch="main"):
    """Create a new branch from a source branch."""
    # First get the source branch ref
    refs = api_request("GET", f"{project}/_apis/git/repositories/{repo}/refs",
                       params={"filter": f"heads/{source_branch}"})
    if "error" in refs:
        return refs
    values = refs.get("value", [])
    if not values:
        return {"error": f"Source branch '{source_branch}' not found"}
    source_object_id = values[0].get("objectId")

    return api_request("POST", f"{project}/_apis/git/repositories/{repo}/refs", data=[
        {
            "name": f"refs/heads/{name}",
            "oldObjectId": "0000000000000000000000000000000000000000",
            "newObjectId": source_object_id,
        }
    ])


def search_commits(project, repo, item_path=None, author=None, top=None):
    """Search commits in a repository."""
    params = {}
    if item_path:
        params["searchCriteria.itemPath"] = item_path
    if author:
        params["searchCriteria.author"] = author
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/commits", params=params)


def list_prs(project, repo=None, status="active", top=None, creator=None, reviewer=None):
    """List pull requests."""
    params = {"searchCriteria.status": status}
    if creator:
        params["searchCriteria.creatorId"] = creator
    if reviewer:
        params["searchCriteria.reviewerId"] = reviewer
    if top:
        params["$top"] = str(top)
    path = f"{project}/_apis/git/repositories/{repo}/pullrequests" if repo else f"{project}/_apis/git/pullrequests"
    return api_request("GET", path, params=params)


def get_pr(project, repo, pr_id):
    """Get a pull request by ID."""
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}")


def create_pr(project, repo, source_branch, target_branch, title, description=None, draft=False, reviewers=None):
    """Create a pull request."""
    data = {
        "sourceRefName": f"refs/heads/{source_branch}" if not source_branch.startswith("refs/") else source_branch,
        "targetRefName": f"refs/heads/{target_branch}" if not target_branch.startswith("refs/") else target_branch,
        "title": title,
        "isDraft": draft,
    }
    if description:
        data["description"] = description
    if reviewers:
        data["reviewers"] = [{"id": r} for r in reviewers]
    return api_request("POST", f"{project}/_apis/git/repositories/{repo}/pullrequests", data=data)


def update_pr(project, repo, pr_id, fields):
    """Update a pull request."""
    return api_request("PATCH", f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}", data=fields)


def list_reviewers(project, repo, pr_id):
    """List reviewers on a pull request."""
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}/reviewers")


def add_reviewer(project, repo, pr_id, reviewer_id, vote=0):
    """Add a reviewer to a pull request."""
    return api_request(
        "PUT",
        f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}/reviewers/{reviewer_id}",
        data={"vote": vote},
    )


def list_threads(project, repo, pr_id):
    """List comment threads on a pull request."""
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}/threads")


def create_thread(project, repo, pr_id, content, file_path=None, line=None, status="active"):
    """Create a comment thread on a pull request."""
    data = {
        "comments": [{"content": content, "commentType": "text"}],
        "status": status,
    }
    if file_path:
        data["threadContext"] = {
            "filePath": file_path,
            "rightFileStart": {"line": line or 1, "offset": 1},
            "rightFileEnd": {"line": line or 1, "offset": 1},
        }
    return api_request("POST", f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}/threads", data=data)


def add_thread_comment(project, repo, pr_id, thread_id, content):
    """Add a comment to an existing thread."""
    return api_request(
        "POST",
        f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}/threads/{thread_id}/comments",
        data={"content": content, "commentType": "text"},
    )


def complete_pr(project, repo, pr_id, merge_strategy="squash", delete_source=True):
    """Complete (merge) a pull request."""
    pr = get_pr(project, repo, pr_id)
    if "error" in pr:
        return pr
    last_merge = pr.get("lastMergeSourceCommit", {}).get("commitId", "")
    data = {
        "status": "completed",
        "lastMergeSourceCommit": {"commitId": last_merge},
        "completionOptions": {
            "mergeStrategy": merge_strategy,
            "deleteSourceBranch": delete_source,
        },
    }
    return api_request("PATCH", f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}", data=data)


def abandon_pr(project, repo, pr_id):
    """Abandon a pull request."""
    return api_request(
        "PATCH",
        f"{project}/_apis/git/repositories/{repo}/pullrequests/{pr_id}",
        data={"status": "abandoned"},
    )


def get_diff(project, repo, base_version, target_version, base_version_type="branch", target_version_type="branch"):
    """Get diff between two versions."""
    params = {
        "baseVersion": base_version,
        "baseVersionType": base_version_type,
        "targetVersion": target_version,
        "targetVersionType": target_version_type,
    }
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/diffs/commits", params=params)


def list_files(project, repo, path="/", branch=None):
    """List files/folders in a repository path."""
    params = {"scopePath": path, "recursionLevel": "OneLevel"}
    if branch:
        params["versionDescriptor.version"] = branch
        params["versionDescriptor.versionType"] = "branch"
    return api_request("GET", f"{project}/_apis/git/repositories/{repo}/items", params=params)


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps Git operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list
    p = subparsers.add_parser("list", help="List repositories")
    p.add_argument("--project", required=True)

    # get
    p = subparsers.add_parser("get", help="Get a repository")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)

    # list-branches
    p = subparsers.add_parser("list-branches", help="List branches")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)

    # create-branch
    p = subparsers.add_parser("create-branch", help="Create a branch")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--name", required=True, help="New branch name")
    p.add_argument("--source", default="main", help="Source branch (default: main)")

    # search-commits
    p = subparsers.add_parser("search-commits", help="Search commits")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--path", help="Item path filter", dest="item_path")
    p.add_argument("--author", help="Author filter")
    p.add_argument("--top", type=int)

    # list-prs
    p = subparsers.add_parser("list-prs", help="List pull requests")
    p.add_argument("--project", required=True)
    p.add_argument("--repo")
    p.add_argument("--status", default="active", choices=["active", "completed", "abandoned", "all"])
    p.add_argument("--top", type=int)
    p.add_argument("--creator")
    p.add_argument("--reviewer")

    # get-pr
    p = subparsers.add_parser("get-pr", help="Get a pull request")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)

    # create-pr
    p = subparsers.add_parser("create-pr", help="Create a pull request")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--source", required=True, help="Source branch")
    p.add_argument("--target", required=True, help="Target branch")
    p.add_argument("--title", required=True)
    p.add_argument("--description")
    p.add_argument("--draft", action="store_true")
    p.add_argument("--reviewer", action="append", dest="reviewers", help="Reviewer ID (repeatable)")

    # update-pr
    p = subparsers.add_parser("update-pr", help="Update a pull request")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)
    p.add_argument("--title")
    p.add_argument("--description")
    p.add_argument("--status", choices=["active", "completed", "abandoned"])

    # list-reviewers
    p = subparsers.add_parser("list-reviewers", help="List PR reviewers")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)

    # add-reviewer
    p = subparsers.add_parser("add-reviewer", help="Add a PR reviewer")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)
    p.add_argument("--reviewer-id", required=True)
    p.add_argument("--vote", type=int, default=0, help="Vote: 10=approve, 5=approve-with-suggestions, 0=no-vote, -5=wait, -10=reject")

    # list-threads
    p = subparsers.add_parser("list-threads", help="List PR comment threads")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)

    # create-thread
    p = subparsers.add_parser("create-thread", help="Create a PR comment thread")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)
    p.add_argument("--content", required=True)
    p.add_argument("--file-path", help="File to comment on")
    p.add_argument("--line", type=int, help="Line number")
    p.add_argument("--status", default="active", choices=["active", "fixed", "wontFix", "closed", "byDesign", "pending"])

    # add-thread-comment
    p = subparsers.add_parser("add-thread-comment", help="Reply to a PR thread")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)
    p.add_argument("--thread-id", required=True, type=int)
    p.add_argument("--content", required=True)

    # complete-pr
    p = subparsers.add_parser("complete-pr", help="Complete (merge) a PR")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)
    p.add_argument("--merge-strategy", default="squash", choices=["squash", "noFastForward", "rebase", "rebaseMerge"])
    p.add_argument("--keep-source", action="store_true", help="Don't delete source branch")

    # abandon-pr
    p = subparsers.add_parser("abandon-pr", help="Abandon a PR")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--pr-id", required=True, type=int)

    # get-diff
    p = subparsers.add_parser("get-diff", help="Get diff between versions")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--base", required=True, help="Base version (commit/branch)")
    p.add_argument("--target", required=True, help="Target version (commit/branch)")
    p.add_argument("--base-version-type", default="branch", choices=["branch", "commit", "tag"])
    p.add_argument("--target-version-type", default="branch", choices=["branch", "commit", "tag"])

    # list-files
    p = subparsers.add_parser("list-files", help="List files in a repo path")
    p.add_argument("--project", required=True)
    p.add_argument("--repo", required=True)
    p.add_argument("--path", default="/")
    p.add_argument("--branch")

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "list":
        return list_repos(args.project)
    elif args.command == "get":
        return get_repo(args.project, args.repo)
    elif args.command == "list-branches":
        return list_branches(args.project, args.repo)
    elif args.command == "create-branch":
        return create_branch(args.project, args.repo, args.name, args.source)
    elif args.command == "search-commits":
        return search_commits(args.project, args.repo, args.item_path, args.author, args.top)
    elif args.command == "list-prs":
        return list_prs(args.project, args.repo, args.status, args.top, args.creator, args.reviewer)
    elif args.command == "get-pr":
        return get_pr(args.project, args.repo, args.pr_id)
    elif args.command == "create-pr":
        return create_pr(args.project, args.repo, args.source, args.target, args.title,
                        args.description, args.draft, args.reviewers)
    elif args.command == "update-pr":
        fields = {}
        if args.title:
            fields["title"] = args.title
        if args.description:
            fields["description"] = args.description
        if args.status:
            fields["status"] = args.status
        return update_pr(args.project, args.repo, args.pr_id, fields)
    elif args.command == "list-reviewers":
        return list_reviewers(args.project, args.repo, args.pr_id)
    elif args.command == "add-reviewer":
        return add_reviewer(args.project, args.repo, args.pr_id, args.reviewer_id, args.vote)
    elif args.command == "list-threads":
        return list_threads(args.project, args.repo, args.pr_id)
    elif args.command == "create-thread":
        return create_thread(args.project, args.repo, args.pr_id, args.content,
                           args.file_path, args.line, args.status)
    elif args.command == "add-thread-comment":
        return add_thread_comment(args.project, args.repo, args.pr_id, args.thread_id, args.content)
    elif args.command == "complete-pr":
        return complete_pr(args.project, args.repo, args.pr_id, args.merge_strategy,
                         not args.keep_source)
    elif args.command == "abandon-pr":
        return abandon_pr(args.project, args.repo, args.pr_id)
    elif args.command == "get-diff":
        return get_diff(args.project, args.repo, args.base, args.target,
                       args.base_version_type, args.target_version_type)
    elif args.command == "list-files":
        return list_files(args.project, args.repo, args.path, args.branch)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
