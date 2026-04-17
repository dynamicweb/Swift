# Prompt: Commit Message

Use this prompt when generating a commit message for Dynamicweb10.

---

## Instructions for agent

Write a git commit message for the staged changes. Follow these rules:

### Format

```
#<workItemId> <imperative-verb> <what> [in <scope>]

<optional body: why this change was needed, or any non-obvious detail>
```

### Rules

1. **First line** — 72 characters max
2. **Start with `#<id>`** if a work item ID is known — Azure DevOps auto-links commits that reference work items this way
3. **Imperative verb**: `Add`, `Fix`, `Remove`, `Refactor`, `Update`, `Extract`, `Simplify` — not `Added`, `Fixes`, `Changed`
4. **Scope** (optional): the project or namespace most affected, e.g. `in Dynamicweb.Ecommerce.Orders` or `in DataIntegration CSV provider`
5. **Body** (optional): blank line after subject, then explain *why* — not *what* (the diff shows what)
6. Do not mention file names in the subject unless the change is purely in one file and the file name is meaningful
7. Do not end the subject line with a period

### Examples

```
#27238 Simplify overflow CSS in editable list component
```

```
#27592 Preserve scroll position on Visual Editor reload

The editor was resetting to the top on every content save, disrupting
the authoring workflow for long pages.
```

```
#27583 Add database views to settings tree in DataIntegration
```

```
Fix nullable annotation on OrderLine.ProductId
```
