# AI Agent Onboarding — Dynamicweb10

This guide is for **developers** setting up AI assistance (Claude Code, Copilot, Codex) in this repo. The agent configuration is already checked in — you just need the right tools installed and your credentials stored locally.

1. [Prerequisites](#1-prerequisites) — what to install
2. [First-time setup](#2-first-time-setup) — store your credentials in local memory
3. [What the agent can do](#3-what-the-agent-can-do)
4. [Workflow prompts](#4-workflow-prompts) — copy-paste starting points for common scenarios
5. [Tips](#5-tips)

---

## 1. Prerequisites

### Required for all developers

| Tool | Purpose | Install |
|------|---------|---------|
| **Claude Code** and/or **GitHub Copilot** | AI coding assistant | [Claude Code](https://claude.ai/code) / VS Code Copilot extension |
| **.NET SDK 10.0** | Build and test the solution | [dotnet.microsoft.com](https://dotnet.microsoft.com/download) |
| **Node.js 18+** | MCP server (`@azure-devops/mcp`) runs via `npx` | [nodejs.org](https://nodejs.org) |
| **Python 3.10+** | Azure DevOps skill scripts | [python.org](https://www.python.org/downloads/) |

### Python dependencies

Install the `keyring` package used to store your Azure DevOps PAT securely:

```bash
pip install keyring
```

Or from the skill directory:

```bash
pip install -r .agents/skills/azure-devops/requirements.txt
```

---

## 2. First-time setup

The agent needs two pieces of personal information to operate your Azure DevOps workflow. These are stored in your **local** Claude memory (never committed to the repo).

Open Claude Code in this repo and run:

```
Remember my developer initials as: <your initials>
Remember my Azure DevOps PAT as: <your PAT>
```

For example:
```
Remember my developer initials as: np
Remember my Azure DevOps PAT as: abc123xyz...
```

**Your initials** are 2–3 letters (e.g. `np`, `sha`, `jd`). They are used for branch naming (`np/27641-fix-login`) and to derive your full Azure DevOps username (`np@dynamicweb.dk`).

**Your PAT** (Personal Access Token) is used to authenticate Azure DevOps API calls. Create one at:
`https://dev.azure.com/dynamicwebsoftware/_usersSettings/tokens`

Required scopes:
- Work Items: Read & Write
- Code: Read & Write
- Build: Read & Execute

> The agent will ask you for these if they are missing. You only need to do this once per machine.

---

## 3. What the agent can do

The agent is configured to handle the full development workflow autonomously, pausing only for actions that affect shared systems (push, PR creation).

| What you can ask | What happens |
|-----------------|--------------|
| Fix a bug from a work item ID | Reads the work item, creates a branch, implements the fix, commits, pushes, creates a PR, updates the work item |
| Implement a feature | Same flow — creates or uses an existing work item, branches, implements, PR |
| Start from a GitHub issue or forum link | Paste the URL — the agent reads it, creates a work item, then follows the full workflow |
| Code review | Reviews the current branch diff against master, flags issues against project conventions |
| Explain a part of the codebase | Reads and explains any file, class, or concept |
| Run tests | Runs `dotnet test` and reports results |
| Build | Runs fast or full build and reports errors |

The agent will not: merge PRs, force-push, or modify pipeline YAML without your explicit instruction.

---

## 4. Workflow prompts

These are ready-to-use prompts. Replace the placeholders (`<...>`) with real values and paste them into Claude Code.

---

### Starting from a work item ID

You already have a work item in Azure DevOps and want to start working on it.

```
I want to work on work item #<id>. Read it, create a branch, and set it to Active.
```

To go all the way through to a PR in one shot:

```
Work item #<id>. Read it, implement the fix, commit, push and create a PR. Work item is a child of #<parent-id>.
```

---

### Starting from a GitHub issue link

Paste the issue URL and let the agent handle the rest.

```
<paste GitHub issue URL here>

Read this issue. Create a work item for it as a child of #<parent-id>, create a branch, implement the fix, commit, push and create a PR.
```

---

### Starting from a forum thread or bug report (text)

Paste the report and describe what you want done.

```
Here is a bug report from our forum:

<paste bug description>

Create a work item for this as a child of #<parent-id>, create a branch, implement the fix, commit, push and create a PR.
```

---

### New feature — you have a rough description

```
I want to build: <describe the feature in a sentence or two>

Create a User Story work item for this as a child of #<parent-epic-id>, create a feature branch, scaffold the implementation and create a PR when ready.
```

---

### Just fix it — you found the bug yourself

```
<describe what is broken and where>

Fix it, commit and push. Work item is #<id> (or: create a work item for it under #<parent-id>).
```

---

### Code review before pushing

```
Review the changes on this branch against master. Check for violations of project conventions, API breaking changes, and anything QA should know about.
```

---

### Explain a piece of code

```
Explain how <class or feature name> works, and where it fits in the solution architecture.
```

---

## 5. Tips

**You don't need to spell out every step.** The agent knows the full workflow from `agents.md`. A prompt like `"Work on #27641"` is enough to get it started — it will read the work item and ask if anything is unclear.

**Parent work item IDs matter for area path.** If you're creating a new work item, tell the agent which Epic or Feature it belongs to — this is how the area path and sprint get set correctly.

**The agent pauses before push and PR.** You'll always get a chance to review before anything is visible to others.

**Branch naming is automatic.** Based on your initials and the work item ID — you don't need to think about it.

**The QA test plan in the PR is generated for you.** Based on what changed, the agent writes meaningful checklist items for QA — what to verify, what side effects to watch for. Review and adjust as needed before submitting.

**If something goes wrong mid-workflow**, just tell the agent where you are:
```
The branch was created but the work item is still New. Set it to Active and continue.
```
