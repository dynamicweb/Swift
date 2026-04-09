# Agent Skills

Skills are self-contained CLI tools that agents (and humans) use to interact with external systems.

## Available Skills

| Skill | Path | Description |
|-------|------|-------------|
| `azure-devops` | `azure-devops/` | Full Azure DevOps REST API — work items, repos, PRs, pipelines, wiki, test plans, security, variable groups, environments, policies. 13 domains, 99 tools. |

## Using a Skill

Skills are invoked from the repo root. Always `cd` to the skill directory first or use the full path:

```bash
python .agents/skills/azure-devops/scripts/work_items.py get --project Dynamicweb --id 27238
python .agents/skills/azure-devops/scripts/repos.py create-pr --project Dynamicweb --repo Dynamicweb10 --source mybranch --target master --title "..."
```

See each skill's `SKILL.md` for the full command reference.

## Authentication

The `azure-devops` skill uses a PAT stored in the system keyring. The PAT is pre-configured for the `dynamicwebsoftware` organization. See `azure-devops/README.md` for setup.

## Adding a New Skill

1. Create a subdirectory under `.agents/skills/<skill-name>/`
2. Add a `SKILL.md` with frontmatter (`name`, `description`, `license`, `metadata`) and full command reference
3. Add a `README.md` with setup and troubleshooting
4. Add a row to the table above
