#!/usr/bin/env python3
"""
Azure DevOps work item operations: CRUD, queries, comments, backlogs.
"""

import argparse
import json
import sys

from api_client import api_request


def _json_patch(ops):
    """Build JSON Patch document for work item create/update."""
    return [{"op": "add", "path": f"/fields/{k}", "value": v} for k, v in ops.items()]


def get_work_item(project, work_item_id, expand=None):
    """Get a single work item by ID."""
    params = {}
    if expand:
        params["$expand"] = expand
    return api_request("GET", f"{project}/_apis/wit/workitems/{work_item_id}", params=params)


def create_work_item(project, work_item_type, title, fields=None):
    """Create a new work item."""
    ops = {"System.Title": title}
    if fields:
        ops.update(fields)
    patch = _json_patch(ops)
    return api_request(
        "PATCH",
        f"{project}/_apis/wit/workitems/${work_item_type}",
        data=patch,
        content_type="application/json-patch+json",
    )


def update_work_item(project, work_item_id, fields):
    """Update a work item's fields."""
    patch = _json_patch(fields)
    return api_request(
        "PATCH",
        f"{project}/_apis/wit/workitems/{work_item_id}",
        data=patch,
        content_type="application/json-patch+json",
    )


def batch_get_work_items(project, ids, expand=None):
    """Get multiple work items by IDs."""
    params = {"ids": ",".join(str(i) for i in ids)}
    if expand:
        params["$expand"] = expand
    return api_request("GET", f"{project}/_apis/wit/workitems", params=params)


def add_children(project, parent_id, child_ids):
    """Add child work items to a parent."""
    from auth import get_organization
    org = get_organization()
    results = []
    for child_id in child_ids:
        patch = [
            {
                "op": "add",
                "path": "/relations/-",
                "value": {
                    "rel": "System.LinkTypes.Hierarchy-Forward",
                    "url": f"https://dev.azure.com/{org}/{project}/_apis/wit/workitems/{child_id}",
                },
            }
        ]
        r = api_request(
            "PATCH",
            f"{project}/_apis/wit/workitems/{parent_id}",
            data=patch,
            content_type="application/json-patch+json",
        )
        results.append(r)
    return {"results": results}


def link_work_items(project, source_id, target_id, link_type="System.LinkTypes.Related"):
    """Link two work items."""
    from auth import get_organization
    org = get_organization()
    patch = [
        {
            "op": "add",
            "path": "/relations/-",
            "value": {
                "rel": link_type,
                "url": f"https://dev.azure.com/{org}/{project}/_apis/wit/workitems/{target_id}",
            },
        }
    ]
    return api_request(
        "PATCH",
        f"{project}/_apis/wit/workitems/{source_id}",
        data=patch,
        content_type="application/json-patch+json",
    )


def unlink_work_items(project, source_id, relation_index):
    """Remove a link from a work item by relation index."""
    patch = [{"op": "remove", "path": f"/relations/{relation_index}"}]
    return api_request(
        "PATCH",
        f"{project}/_apis/wit/workitems/{source_id}",
        data=patch,
        content_type="application/json-patch+json",
    )


def add_comment(project, work_item_id, text):
    """Add a comment to a work item."""
    return api_request(
        "POST",
        f"{project}/_apis/wit/workitems/{work_item_id}/comments",
        data={"text": text},
    )


def list_comments(project, work_item_id, top=None):
    """List comments on a work item."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/wit/workitems/{work_item_id}/comments", params=params)


def get_revisions(project, work_item_id, top=None):
    """Get revision history of a work item."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("GET", f"{project}/_apis/wit/workitems/{work_item_id}/revisions", params=params)


def list_types(project):
    """List available work item types in a project."""
    return api_request("GET", f"{project}/_apis/wit/workitemtypes")


def my_work_items(project):
    """Get work items assigned to the current user."""
    safe_project = project.replace("'", "''")
    wiql = {
        "query": f"SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType] "
                 f"FROM WorkItems WHERE [System.AssignedTo] = @me AND [System.TeamProject] = '{safe_project}' "
                 f"ORDER BY [System.ChangedDate] DESC"
    }
    return api_request("POST", f"{project}/_apis/wit/wiql", data=wiql)


def iteration_items(project, iteration_path):
    """Get work items in a specific iteration."""
    safe_project = project.replace("'", "''")
    safe_iteration = iteration_path.replace("'", "''")
    wiql = {
        "query": f"SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType] "
                 f"FROM WorkItems WHERE [System.IterationPath] = '{safe_iteration}' "
                 f"AND [System.TeamProject] = '{safe_project}' "
                 f"ORDER BY [System.ChangedDate] DESC"
    }
    return api_request("POST", f"{project}/_apis/wit/wiql", data=wiql)


def list_backlogs(project, team):
    """List backlogs for a team."""
    return api_request("GET", f"{project}/{team}/_apis/work/backlogs")


def run_query(project, query_id):
    """Run a saved query by ID."""
    return api_request("GET", f"{project}/_apis/wit/wiql/{query_id}")


def run_wiql(project, wiql_query, top=None):
    """Run a WIQL query."""
    params = {}
    if top:
        params["$top"] = str(top)
    return api_request("POST", f"{project}/_apis/wit/wiql", data={"query": wiql_query}, params=params)


def get_query(project, query_path):
    """Get a saved query by path or ID."""
    return api_request("GET", f"{project}/_apis/wit/queries/{query_path}", params={"$depth": "2"})


def list_queries(project, depth=2):
    """List saved queries in a project."""
    return api_request("GET", f"{project}/_apis/wit/queries", params={"$depth": str(depth)})


def delete_work_item(project, work_item_id, destroy=False):
    """Delete (recycle) a work item."""
    params = {}
    if destroy:
        params["destroy"] = "true"
    return api_request("DELETE", f"{project}/_apis/wit/workitems/{work_item_id}", params=params)


def list_recycle_bin(project):
    """List work items in the recycle bin."""
    return api_request("GET", f"{project}/_apis/wit/recyclebin")


def main():
    parser = argparse.ArgumentParser(description="Azure DevOps work item operations")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # get
    p = subparsers.add_parser("get", help="Get a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--expand", choices=["all", "relations", "fields", "links", "none"])

    # create
    p = subparsers.add_parser("create", help="Create a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--type", required=True, dest="work_item_type", help="e.g., Bug, Task, User Story")
    p.add_argument("--title", required=True)
    p.add_argument("--field", action="append", nargs=2, metavar=("FIELD", "VALUE"),
                   help="Additional field (repeatable), e.g., --field System.Description 'desc'")

    # update
    p = subparsers.add_parser("update", help="Update a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--field", action="append", nargs=2, metavar=("FIELD", "VALUE"), required=True,
                   help="Field to update (repeatable)")

    # batch-get
    p = subparsers.add_parser("batch-get", help="Get multiple work items")
    p.add_argument("--project", required=True)
    p.add_argument("--ids", required=True, help="Comma-separated work item IDs")
    p.add_argument("--expand", choices=["all", "relations", "fields", "links", "none"])

    # add-children
    p = subparsers.add_parser("add-children", help="Add child work items to a parent")
    p.add_argument("--project", required=True)
    p.add_argument("--parent-id", required=True, type=int)
    p.add_argument("--child-ids", required=True, help="Comma-separated child IDs")

    # link
    p = subparsers.add_parser("link", help="Link two work items")
    p.add_argument("--project", required=True)
    p.add_argument("--source-id", required=True, type=int)
    p.add_argument("--target-id", required=True, type=int)
    p.add_argument("--link-type", default="System.LinkTypes.Related")

    # unlink
    p = subparsers.add_parser("unlink", help="Remove a link by relation index")
    p.add_argument("--project", required=True)
    p.add_argument("--source-id", required=True, type=int)
    p.add_argument("--relation-index", required=True, type=int)

    # add-comment
    p = subparsers.add_parser("add-comment", help="Add a comment to a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--text", required=True)

    # list-comments
    p = subparsers.add_parser("list-comments", help="List comments on a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--top", type=int)

    # get-revisions
    p = subparsers.add_parser("get-revisions", help="Get revision history")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--top", type=int)

    # list-types
    p = subparsers.add_parser("list-types", help="List work item types")
    p.add_argument("--project", required=True)

    # my-items
    p = subparsers.add_parser("my-items", help="Get work items assigned to me")
    p.add_argument("--project", required=True)

    # iteration-items
    p = subparsers.add_parser("iteration-items", help="Get work items in an iteration")
    p.add_argument("--project", required=True)
    p.add_argument("--iteration-path", required=True)

    # list-backlogs
    p = subparsers.add_parser("list-backlogs", help="List backlogs for a team")
    p.add_argument("--project", required=True)
    p.add_argument("--team", required=True)

    # run-query
    p = subparsers.add_parser("run-query", help="Run a saved query")
    p.add_argument("--project", required=True)
    p.add_argument("--query-id", required=True)

    # run-wiql
    p = subparsers.add_parser("run-wiql", help="Run a WIQL query")
    p.add_argument("--project", required=True)
    p.add_argument("--query", required=True, dest="wiql_query")
    p.add_argument("--top", type=int)

    # get-query
    p = subparsers.add_parser("get-query", help="Get a saved query")
    p.add_argument("--project", required=True)
    p.add_argument("--path", required=True, dest="query_path")

    # list-queries
    p = subparsers.add_parser("list-queries", help="List saved queries")
    p.add_argument("--project", required=True)
    p.add_argument("--depth", type=int, default=2)

    # delete
    p = subparsers.add_parser("delete", help="Delete a work item")
    p.add_argument("--project", required=True)
    p.add_argument("--id", required=True, type=int, dest="work_item_id")
    p.add_argument("--destroy", action="store_true", help="Permanently destroy")

    # recycle-bin
    p = subparsers.add_parser("recycle-bin", help="List recycled work items")
    p.add_argument("--project", required=True)

    args = parser.parse_args()
    result = _dispatch(args)

    print(json.dumps(result, indent=2))
    if isinstance(result, dict) and "error" in result:
        sys.exit(1)


def _dispatch(args):
    if args.command == "get":
        return get_work_item(args.project, args.work_item_id, args.expand)
    elif args.command == "create":
        fields = dict(args.field) if args.field else None
        return create_work_item(args.project, args.work_item_type, args.title, fields)
    elif args.command == "update":
        fields = dict(args.field)
        return update_work_item(args.project, args.work_item_id, fields)
    elif args.command == "batch-get":
        ids = [int(i.strip()) for i in args.ids.split(",")]
        return batch_get_work_items(args.project, ids, args.expand)
    elif args.command == "add-children":
        child_ids = [int(i.strip()) for i in args.child_ids.split(",")]
        return add_children(args.project, args.parent_id, child_ids)
    elif args.command == "link":
        return link_work_items(args.project, args.source_id, args.target_id, args.link_type)
    elif args.command == "unlink":
        return unlink_work_items(args.project, args.source_id, args.relation_index)
    elif args.command == "add-comment":
        return add_comment(args.project, args.work_item_id, args.text)
    elif args.command == "list-comments":
        return list_comments(args.project, args.work_item_id, args.top)
    elif args.command == "get-revisions":
        return get_revisions(args.project, args.work_item_id, args.top)
    elif args.command == "list-types":
        return list_types(args.project)
    elif args.command == "my-items":
        return my_work_items(args.project)
    elif args.command == "iteration-items":
        return iteration_items(args.project, args.iteration_path)
    elif args.command == "list-backlogs":
        return list_backlogs(args.project, args.team)
    elif args.command == "run-query":
        return run_query(args.project, args.query_id)
    elif args.command == "run-wiql":
        return run_wiql(args.project, args.wiql_query, args.top)
    elif args.command == "get-query":
        return get_query(args.project, args.query_path)
    elif args.command == "list-queries":
        return list_queries(args.project, args.depth)
    elif args.command == "delete":
        return delete_work_item(args.project, args.work_item_id, args.destroy)
    elif args.command == "recycle-bin":
        return list_recycle_bin(args.project)
    return {"error": f"Unknown command: {args.command}"}


if __name__ == "__main__":
    main()
