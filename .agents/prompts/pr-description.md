# Prompt: PR Description

Use this prompt when generating a pull request description for Dynamicweb10.

---

## Instructions for agent

Write a pull request description for the changes on the current branch. Follow this format exactly:

```
## Summary
- <bullet: what changed and why — one sentence per logical change>
- <bullet>
- (add more as needed; omit if only one change)

## Type of change
- [ ] Bug fix
- [ ] New feature / enhancement
- [ ] Refactor (no behaviour change)
- [ ] DataIntegration provider change
- [ ] Ecommerce / pricing change
- [ ] Infrastructure / build / CI change

## QA test plan
- [ ] <step or scenario QA should manually verify — e.g. "Create an order and confirm price is calculated correctly">
- [ ] <verify the bug is fixed — describe the flow that previously failed>
- [ ] <potential side effects to check — e.g. "Method X is also used in Y and Z — verify those flows still work">

## Testing
- <bullet: describe what was tested — unit tests added/updated, manual steps, integration test coverage>

## Breaking changes
- None  ← or describe removed/changed public API members and the migration path

## Related work items
- #<id> <title>
```

**Rules:**
- Derive all content from the actual diff (`git diff main...HEAD`) and commit messages — do not invent details
- **QA test plan**: write meaningful checklist items for QA — what to verify works, what could break as a side effect of this change (e.g. shared methods used elsewhere), and any regressions to watch for. Do not write generic items like "test the feature" — be specific about flows and scenarios
- If the change touches public API (new/removed/changed public members), note it under Breaking changes
- If the change touches `Dynamicweb.Ecommerce` with `<Nullable>disable</Nullable>`, note it
- If a `GlobalSuppressions.cs` was modified, mention which suppressions were added and why
- Keep the Summary bullets concise — one clause each, no filler words
- Reference work items by `#id` if they appear in commit messages
