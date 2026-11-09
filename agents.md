# Agent Charter — Swift

This document is the single source of truth for all AI agents (Claude Code, Copilot, Codex, and others) operating in this repository. It defines what agents are trusted to do, coding rules, DevOps workflow, and project conventions.

## Project Overview

Swift is a customizable eCommerce storefront built on the **DynamicWeb 10** platform. It provides drag-and-drop content building with a paragraph-based template system for B2B/B2C online stores.

- **Backend**: C# .NET 8.0 library using DynamicWeb 10 APIs
- **Frontend**: ES6 modules bundled with esbuild, SCSS compiled with Sass and post-processed with Lightning CSS, Bootstrap 5.3.8
- **Templating**: Razor CSHTML files inheriting from DynamicWeb ViewModels
- **Interactivity**: HTMX for AJAX updates, Alpine.js for reactive UI

## Build Commands

```bash
npm ci               # Install dependencies from package-lock.json
npm run build        # Production build (minified, with source maps)
npm run dev          # Development build with watch mode and live reload
npm run lint         # ESLint (_src/js) + Stylelint (_src/scss)
```

The build is a single script, `build.mjs`. Output goes to `Files/Templates/Designs/Swift-v2/Assets/`: `js/swift.js`, `css/swift.css` (each with a source map) and `lib/` (the vendor packages' `dist/` folders, copied as-is). `Assets/` is gitignored.

CSS browser targets come from `browserslist` in `package.json`.

Live reload: `npm run dev` starts an event stream on `http://localhost:35729` (override with `SWIFT_LIVERELOAD_PORT`), and the dev build of `swift.js` connects to it. SCSS changes swap `swift.css` in place without a page reload; changes to `_src/js` or any `.cshtml` under `Files/Templates/` reload the page. Production builds contain none of this.

Linting is separate from the build: run `npm run lint` before committing. The pipelines run it as its own step and fail on any lint error.

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
- `Swift-v2.csproj` — .NET project (`net10.0`) referencing Dynamicweb NuGet packages (all `10.*`)
- `Swift-v2.slnx` — solution file (IDE only; not used by the pipelines)
- `Swift-v2.csproj.user` (optional, gitignored) — local override to build against DW10 source instead of NuGet packages; expects the `Dynamicweb10` repo checked out next to Swift

## Code Style

Defined in `.editorconfig`:
- **JS/TS/JSON**: 2 spaces indent
- **CSHTML/HTML/CSS/SCSS/CS**: 4 spaces indent
- **Line endings**: LF everywhere
- **Charset**: UTF-8

## CI/CD

Azure DevOps pipelines in `Pipelines/`:
- `swift-build.yml` — triggered on `main`, builds and publishes artifacts
- `swift-qa.yml` — triggered on PRs to `main`, builds and posts test site links as PR comments. PRs into a `features/*` branch only get this build if a build-validation branch policy covers that branch

- `SwiftPR.yml` — triggered on PRs to `main` and `features/*`, builds a test site package with demo data

All use Node 24.x, run `npm ci`, `npm run lint` and `npm run build`, and archive the `Files/` directory.

## Conventions

- Branch naming: `{initials}/{id}-kebab-title` (e.g. `np/27691-megamenu-fix`) for work branches, `features/{initials}/{id}-kebab-title` for Feature branches — see Branching Strategy for the full rules
- CSHTML templates use `@inherits Dynamicweb.Rendering.ViewModelTemplate<T>` with DynamicWeb ViewModels
- Razor output is not auto-encoded (a bare `@(value)` is raw, attributes included). Encode only where needed: untrusted free text (posted form values, search queries, customer-entered text, order-line comments, ERP/integration-supplied names). IDs, numbers, booleans, enumerated settings and formatted ViewModel values stay raw. Admin free text (group names, translations, free-text item settings) is raw in HTML text only — encode it in attributes, JS strings and JSON (`x-data`, `hx-vals`, `hx-headers`). Match the surrounding template unless it is itself a bug; if unsure, encode and note it in review.
- Encoders: `HtmlEncoder.HtmlEncode()` for HTML/attribute context, `HtmlEncoder.JavaScriptStringEncode()` for JS/JSON string context, `WebUtility.UrlEncode()` for query parameters. See `.agents/context/viewmodel-cheatsheet.md` for the full encoding rules.
- Always use explicit Razor expressions in markup: wrap property/variable output in parentheses — `@(Model.Id)`, `@(Model.Price.CurrencyCode)`, `@(item.Name)` — never bare `@Model.Id`. Parentheses end the expression explicitly, avoiding `@Model.Id.` and `user@domain` parsing ambiguity. Only a direct helper call like `@Translate("ID")` stays bare; dotted calls are wrapped too — `@(HtmlEncoder.HtmlEncode(name))`.
- JavaScript modules follow a namespace pattern: each file exports an object with public methods, composed into the `swift` global
- Version compatibility: Swift v2.2.0 requires DynamicWeb 10.23+
## Azure DevOps Integration

Scripts live in `.agents/skills/azure-devops/scripts/`. Auth is via PAT stored in system keyring.

> **For AI agents**: Before any Azure DevOps operation, check the developer's local memory for their initials and PAT. If either is missing, ask before proceeding.
> - **Initials**: 2–3 letter identifier (e.g. `np`, `sha`) — used for branch naming: `{initials}/{id}-kebab-title` and `features/{initials}/{id}-kebab-title`
> - **Full username**: `{initials}@dynamicweb.dk` — used for `System.AssignedTo` when creating work items
> - Always assign new work items to the current developer via `System.AssignedTo "{initials}@dynamicweb.dk"`

**Key IDs** (do not change):
- Organization: `dynamicwebsoftware`
- Project: `Dynamicweb`
- Project ID: `5a2edd81-7d89-4716-a4f3-1187ba91af92`
- Repo (Swift) ID: `3112f888-8c97-4d1e-ab01-a7dc4d40b954`

### Branching Strategy

Swift follows the DynamicWeb core team model: a **Feature** work item gets a long-lived feature branch, and the work under it is merged into that branch, not into `main`.

| Work item | Branch | Created from | PR target |
|---|---|---|---|
| Feature | `features/{initials}/{id}-kebab-title` | `main` | `main` (once the whole feature is done) |
| User Story / Bug / Task under a Feature that has a feature branch | `{initials}/{id}-kebab-title` | the feature branch | the feature branch |
| Any other User Story / Bug / Task | `{initials}/{id}-kebab-title` | `main` | `main` |

- The prefix is `features/` (plural) — never `feature/`.
- `{initials}` is the owner of that branch: the feature branch carries the Feature owner's initials, child branches carry their own developer's initials.
- To find the base branch for a work item, walk its parent chain for a Feature and look for a matching branch: `git ls-remote --heads origin "features/*/{featureId}-*"`. Found → use it as source and PR target. Not found → use `main`.
- Keep a feature branch up to date with `main` while it lives, so the final PR to `main` stays small to review.
- When a User Story is promoted to a Feature mid-flight, create the feature branch from `main` and retarget the existing PR to it (Azure DevOps lets you change the target of an active PR).

**Standard workflow** for a code change tied to a work item:
1. Get/create work item (set `System.AreaPath` from parent; set `System.IterationPath` to current sprint; set `System.AssignedTo` to `{initials}@dynamicweb.dk`) — `work_items.py`
2. Set work item state to **Active** — `work_items.py update --field System.State "Active"`
3. Determine `{base-branch}` (`main` or the feature branch) per Branching Strategy, then create the branch via API — `repos.py create-branch --source {base-branch}`
4. `git checkout -b {branch-name} && git pull --rebase origin {branch-name}`
5. Make changes, commit with `#<id>` in message — Azure DevOps auto-links the commit; do NOT add it manually via API
6. `git push -u origin {branch-name}`
7. Create PR — `repos.py create-pr --source {branch-name} --target {base-branch}` — use the PR description template (Summary + QA test plan checklist); reviewers are handled by branch policies, do not assign manually. The script does not support explicit work item linking, but Azure DevOps auto-links the PR via the `#{id}` in commit messages and the branch name.
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
| `.agents/context/swift-architecture.md` | Template hierarchy, HTMX/Alpine patterns, JS module system, SCSS layers |
| `.agents/context/commerce-architecture.md` | Cart & order domain — the two cart pipelines, `X-DW-Template` fragments, cart state broadcast, endpoint strategy, caveats. Read before touching `eCom/Cart/`, `eCom/CustomerExperienceCenter/Orders/`, `Swift-v2_MiniCart/`, or `_src/js/_cart*.js` |
| `.agents/context/viewmodel-cheatsheet.md` | ViewModel inheritance, Model properties, TryGet patterns, encoding rules — read before writing CSHTML |
| `.agents/context/design-system.md` | CSS variable chain (--dw-*, --swift-*, --bs-*), color scheme scoping, spacer scale, container widths |
| `.agents/context/paragraph-layouts.md` | Layout subfolder system, anatomy of a layout file, standard building blocks, checklist for new layouts |
| `.agents/prompts/pr-description.md` | PR description template |
| `.agents/prompts/commit-message.md` | Commit message guidelines |
| `.agents/prompts/code-review.md` | Code review checklist |