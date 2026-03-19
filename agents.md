# Agent Charter — Swift

This document is the single source of truth for all AI agents (Claude Code, Copilot, Codex, and others) operating in this repository. It defines what agents are trusted to do, coding rules, DevOps workflow, and project conventions.

## Project Overview

Swift is a customizable eCommerce storefront built on the **DynamicWeb 10** platform. It provides drag-and-drop content building with a paragraph-based template system for B2B/B2C online stores.

- **Backend**: C# .NET 8.0 library using DynamicWeb 10 APIs
- **Frontend**: ES6 modules bundled with Rollup, SCSS compiled to CSS, Bootstrap 5.3.3
- **Templating**: Razor CSHTML files inheriting from DynamicWeb ViewModels
- **Interactivity**: HTMX for AJAX updates, Alpine.js for reactive UI

## Build Commands

```bash
npm install          # Install dependencies
npm run build        # Production build (minified, with source maps)
npm run dev          # Development build with watch mode
```

Build output goes to `Files/Templates/Designs/Swift-v2/Assets/` (JS + CSS).

The build runs ESLint and Stylelint — build fails on lint errors/warnings.

There are no automated tests. Quality is enforced through linting and manual QA.

## Architecture

### Template Hierarchy

**Master template**: `Files/Templates/Designs/Swift-v2/Swift-v2_Master.cshtml` — sets up the HTML document, loads CSS/JS, renders color schemes and typography from DynamicWeb configuration.

**Paragraph templates** (`Files/Templates/Designs/Swift-v2/Paragraph/`): 85+ reusable content blocks (Accordion, Button, Card, Image, etc.) that editors drag-and-drop to build pages.

**eCommerce templates** (`Files/Templates/Designs/Swift-v2/eCom/`):
- `ProductCatalog/` — product display, filtering, variant selection, search
- `CustomerExperienceCenter/` — B2B features (orders, quotes, saved carts, RMA)
- `Order/` — order flow and receipts

### Frontend Module System

Entry point: `_src/js/swift.js` — imports and exports all modules as `window.swift` global.

Key modules in `_src/js/`:
- `_cart.js`, `_favorites.js` — cart and wishlist operations
- `_variantselector.js` — product variant selection
- `_typeahead.js` — search autocomplete
- `_pageupdater.js` — HTMX-based page fragment updates
- `_expressbuybulk.js` — bulk B2B quick ordering

SCSS source: `_src/scss/` organized as `0-base/`, `1-dw/` (DynamicWeb integration), `2-components/`, `3-helpers/`.

### Configuration

- `Files/GlobalSettings.config` — main application configuration
- `Files/GlobalSettings.Ecom.config` — eCommerce-specific settings
- `Swift-v2.csproj` — .NET project referencing Dynamicweb NuGet packages (all `10.*`)

## Code Style

Defined in `.editorconfig`:
- **JS/TS/JSON**: 2 spaces indent
- **CSHTML/HTML/CSS/SCSS/CS**: 4 spaces indent
- **Line endings**: LF everywhere
- **Charset**: UTF-8

## CI/CD

Azure DevOps pipelines in `Pipelines/`:
- `swift-build.yml` — triggered on `main`, builds and publishes artifacts
- `swift-qa.yml` — triggered on PRs to `main`, builds and posts test site links as PR comments

Both use Node 20.x, run `npm install` + `npm run build`, and archive the `Files/` directory.

## Conventions

- Branch naming: `{initials}/{id}-kebab-title` (e.g. `np/27691-megamenu-fix`) — see Azure DevOps Integration section for full naming rules
- CSHTML templates use `@inherits Dynamicweb.Rendering.ViewModelTemplate<T>` with DynamicWeb ViewModels
- HTML encoding is critical in templates — always use `HttpUtility.HtmlEncode()` or `HtmlAttributeEncode()` when outputting user-provided data to prevent XSS
- JavaScript modules follow a namespace pattern: each file exports an object with public methods, composed into the `swift` global
- Version compatibility: Swift v2.2.0 requires DynamicWeb 10.23+
## Azure DevOps Integration

Scripts live in `.agents/skills/azure-devops/scripts/`. Auth is via PAT stored in system keyring.

> **For AI agents**: Before any Azure DevOps operation, check the developer's local memory for their initials and PAT. If either is missing, ask before proceeding.
> - **Initials**: 2–3 letter identifier (e.g. `np`, `sha`) — used for branch naming: `{initials}/{id}-kebab-title`
> - **Full username**: `{initials}@dynamicweb.dk` — used for `System.AssignedTo` when creating work items
> - Always assign new work items to the current developer via `System.AssignedTo "{initials}@dynamicweb.dk"`

**Key IDs** (do not change):
- Organization: `dynamicwebsoftware`
- Project: `Dynamicweb`
- Project ID: `5a2edd81-7d89-4716-a4f3-1187ba91af92`
- Repo (Swift) ID: `3ce1b7ad-e11a-4aeb-b8d1-d44cad1fc60e`

**Standard workflow** for a code change tied to a work item:
1. Get/create work item (set `System.AreaPath` from parent; set `System.IterationPath` to current sprint; set `System.AssignedTo` to `{initials}@dynamicweb.dk`) — `work_items.py`
2. Set work item state to **Active** — `work_items.py update --field System.State "Active"`
3. Create branch via API — `repos.py create-branch --source main` — naming:
   - Most work items: `{initials}/{id}-kebab-title`
   - If asked specifically to create a feature branch: `features/{initials}/{id}-kebab-title`
   - **Always pass `--source main`**
4. `git checkout -b {branch-name} && git pull --rebase origin {branch-name}`
5. Make changes, commit with `#<id>` in message — Azure DevOps auto-links the commit; do NOT add it manually via API
6. `git push -u origin {initials}/{id}-kebab-title`
7. Create PR — `repos.py create-pr --source {branch-name} --target main` — use the PR description template (Summary + QA test plan checklist); reviewers are handled by branch policies, do not assign manually. The script does not support explicit work item linking, but Azure DevOps auto-links the PR via the `#{id}` in commit messages and the branch name.
8. Set work item state to **Resolved** after PR is created
9. Update work item description with summary of what changed
10. Add branch link on work item via API

**Work item state transitions**: New → Active (branch started) → Resolved (PR created) → Closed (PR merged — automatic, do not set manually)

### Area Paths

Use the parent work item's area path. Available paths:

| Area | Path |
|------|------|
| Ecommerce | `\Dynamicweb\Area\Ecommerce` |
| PIM | `\Dynamicweb\Area\PIM` |
| Content | `\Dynamicweb\Area\Content` |
| Marketing | `\Dynamicweb\Area\Marketing` |
| Integration | `\Dynamicweb\Area\Integration` |
| Rapido | `\Dynamicweb\Area\Rapido` |
| Platform | `\Dynamicweb\Area\Platform` |
| Platform / UI and Design | `\Dynamicweb\Area\Platform\UI and Design` |
| Swift | `\Dynamicweb\Area\Swift` |
| Users | `\Dynamicweb\Area\Users` |
| Assets | `\Dynamicweb\Area\Assets` |
| Headless / Frontend | `\Dynamicweb\Area\Headless\Frontend` |
| Headless / Backend | `\Dynamicweb\Area\Headless\Backend` |
| UX / Frontend | `\Dynamicweb\Area\UX\Frontend` |
| UX / Backend | `\Dynamicweb\Area\UX\Backend` |
| Norway | `\Dynamicweb\Area\Norway` |
| AI | `\Dynamicweb\Area\AI` |

### Iteration Paths (Sprints)

Always use the **current sprint**. To find it programmatically:
```bash
python .agents/skills/azure-devops/scripts/work.py list-iterations --project Dynamicweb
```
Or query the classification nodes API and match today's date against `startDate`/`finishDate`.

Sprint cadence: 2-week sprints within quarters (Q1–Q4). Example: `\Dynamicweb\Iteration\2026\Q1\Sprint 06`

See `.agents/skills/azure-devops/SKILL.md` for the full command reference.

### Known API Quirks

**Path formats differ by context**

The classification nodes API returns paths with structural prefixes:
- `\Dynamicweb\Iteration\2026\Q1\Sprint 06`
- `\Dynamicweb\Area\Platform`

But work item field values use short form (no `\Iteration\` or `\Area\` segment):
- `System.IterationPath` → `Dynamicweb\2026\Q1\Sprint 06`
- `System.AreaPath` → `Dynamicweb\Platform`

Always use the short form when setting fields. Read an existing work item to verify the exact format in use.

**Backslash escaping in Python `urllib` requests**

When building JSON patch payloads with `urllib.request`, use `\x5c` for backslashes in field values — standard `\\` gets double-escaped in the resulting JSON and the API rejects it with HTTP 400 `TF401347: Invalid tree name`.

```python
# Wrong — double-escaped, API rejects with HTTP 400
{'value': 'Dynamicweb\\2026\\Q1\\Sprint 06'}

# Correct
{'value': 'Dynamicweb\x5c2026\x5cQ1\x5cSprint 06'}
```

**Create work items with minimal fields, then PATCH**

The `POST /_apis/wit/workitems/$User%20Story` endpoint rejects some field combinations on creation (e.g. `System.IterationPath` together with parent relations). Create with title, area, and assignee first, then PATCH the created item to add iteration path, description, state, and relations.

---

---

## Skills Available

| Skill | Location | Purpose |
|-------|----------|---------|
| `azure-devops` | `.agents/skills/azure-devops/` | Full Azure DevOps REST API — work items, repos, PRs, pipelines, wiki, test plans |

---

## Context Files

| File | Purpose |
|------|---------|
| `.agents/context/architecture.md` | Solution structure, layer responsibilities, project map |
| `.agents/context/conventions.md` | Naming, DI, testing, null-safety, SQL patterns in depth |
| `.agents/prompts/pr-description.md` | PR description template |
| `.agents/prompts/commit-message.md` | Commit message guidelines |
| `.agents/prompts/code-review.md` | Code review checklist |