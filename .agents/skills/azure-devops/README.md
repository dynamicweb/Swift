# Azure DevOps Skill

Manage Azure DevOps projects, work items, repositories, pull requests, pipelines, wikis, test plans, and security alerts through a Python CLI. Reimplementation of the [Azure DevOps MCP server](https://github.com/microsoft/azure-devops-mcp) as lightweight scripts.

## Features

- **13 domains, 99 tools** covering the full Azure DevOps REST API
- **OAuth (device code flow)** or **PAT authentication** stored securely in system keyring
- **Auto token refresh** for OAuth - no manual re-login needed
- **No external dependencies** beyond `keyring` - uses stdlib `urllib.request`
- **Consistent CLI pattern** - argparse subcommands, JSON output

### Domains

| Domain | Script | Tools |
|--------|--------|-------|
| Core | `core.py` | Projects, teams, identities (3) |
| Work Items | `work_items.py` | CRUD, queries, comments, backlogs (20) |
| Iterations | `work.py` | Sprints, capacity (7) |
| Git/PRs | `repos.py` | Repos, branches, pull requests (18) |
| Pipelines | `pipelines.py` | Builds, runs, artifacts (14) |
| Search | `search.py` | Code, wiki, work item search (3) |
| Wiki | `wiki.py` | Pages management (6) |
| Test Plans | `test_plans.py` | Plans, suites, cases, results (9) |
| Security | `security.py` | Advanced security alerts (2) |
| Variable Groups | `variable_groups.py` | Pipeline variable groups (7) |
| Environments | `environments.py` | Environments & approvals (8) |
| Policies | `policies.py` | Branch policies (8) |
| Attachments | `attachments.py` | Work item attachments (6) |

## Quick Start

### 1. Install dependency

```bash
pip install keyring>=24.0.0
```

### 2. Authenticate

**Option A: OAuth (Recommended)**
```bash
cd skills/azure-devops
python scripts/auth.py login --org MyOrganization
# Follow the URL, enter the device code to authorize
# Tokens auto-refresh - no need to re-login
```

**Option B: PAT**

Create a PAT at `https://dev.azure.com/{org}/_usersSettings/tokens` with scopes: Work Items (R&W), Code (R&W), Build (R&E), Wiki (R&W), Test Management (R&W), Advanced Security (R), Project and Team (R), Identity (R).

```bash
cd skills/azure-devops
python scripts/auth.py login --org MyOrganization --pat YOUR_PAT
```

### 3. Verify

```bash
python scripts/auth.py status
python scripts/core.py list-projects
```

## Usage

All scripts follow the same pattern:

```bash
python scripts/<domain>.py <command> --project <name> [options]
```

Output is always JSON. Exit code 1 on errors.

See [SKILL.md](SKILL.md) for complete command reference with examples.

## Troubleshooting

**"Not authenticated" error**: Run `python scripts/auth.py login`

**"HTTP 401"**: Token expired. For OAuth, run `python scripts/auth.py login --org <org>`. For PAT, create a new one and re-login.

**"HTTP 403"**: PAT doesn't have the required scope for this operation.

**"HTTP 404"**: Project, repo, or resource not found. Check the name/ID.

**Keyring issues on Linux**: Install `secretstorage` package: `pip install secretstorage`
