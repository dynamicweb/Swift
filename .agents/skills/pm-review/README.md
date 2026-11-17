# PM review skill

Product-owner review of a Swift pull request: does it deliver what the linked work items
describe, and what will a user run into that nobody wrote down? The instructions live in
[`SKILL.md`](SKILL.md); this file covers setup and the things that go wrong.

## Which review do I want?

| Question | Skill |
|----------|-------|
| Does this deliver the story, and what is missing? | `pm-review` |
| Can I break it, and what else did it touch? | `qa-review` (not in Swift yet) |
| Is the code any good? | `code-review` (see [`../../prompts/code-review.md`](../../prompts/code-review.md)) |

`pm-review` and `qa-review` overlap on mechanics only — both read
[`../dw-review/foundation.md`](../dw-review/foundation.md) — and are useful back to back on the same PR.

## Setup

1. **Azure DevOps auth**, for the PR record, its threads and the linked work items — see
   [`../azure-devops/README.md`](../azure-devops/README.md), then check with
   `python .agents/skills/azure-devops/scripts/auth.py status`.
2. **Git**, to fetch both refs and diff them locally.
3. **A browser that can reach the PR site** — Claude in Chrome, not the in-app Browser pane, because PR
   sites are plain `http`. The admin account is always `Administrator`; the password is the user's to type.
4. **A screenshot script** for the browser window: `dw-review/scripts/save-screenshot.ps1` on Windows,
   `dw-review/scripts/save-screenshot.sh` on macOS (needs Screen Recording permission). The window has
   to be open, not minimised, not covered, and showing the tab you mean as its active tab.
5. **Optional: the `dw-ui` UI graph** for finding admin screens — see
   [`../dw-review/foundation.md`](../dw-review/foundation.md) step 5 for the one-line setup.
6. **Nothing else to install.** The skill is prose plus the scripts it borrows from `dw-review`.

## Invoking it

```bash
/pm-review 23132
```

A PR number, a branch name, or nothing (resolves the PR for the current branch) all work. In Claude Code
the skill is reached through the loader at `.claude/skills/pm-review/SKILL.md`, which only mirrors the
frontmatter and points back here.

## Output

A markdown report in the conversation, with the screenshots sent alongside it: verdict, an
acceptance-criteria table saying how each one was checked, then the findings in four separate sections
so the reader can see at a glance what acceptance actually costs.

| Section | Means | Action |
|---------|-------|--------|
| Blocking | The story is not delivered. | Fix before merge. |
| Decide before merge | Predates the PR, but this PR made it much easier to hit. | A call the team makes now. |
| Pre-existing | Equally true on the target branch. | Log as a Bug; merge unaffected. |
| Observations | Noticed, not a defect, possibly deliberate. | None proposed. |

Findings describe what a user does and what they get. They do not cite files, classes or line numbers,
and they do not propose a fix — locating the defect in the source is the author's job. Every
behavioural claim carries a screenshot; a claim with no picture says why it has none.

Two escalations, both **opt-in and shown to the user before anything is sent**:

- **Comments on the PR** for blocking gaps, one thread per finding, posted at PR level with the
  screenshot embedded — not anchored to a line of the diff. Never a vote, never a complete or abandon.
- **Bug work items** for pre-existing problems, drafted per
  [`../../prompts/bug-report.md`](../../prompts/bug-report.md) with the screenshots attached — repro
  goes in `Microsoft.VSTS.TCM.ReproSteps` as HTML, not `System.Description`. Pre-existing bugs
  deliberately do not go in PR comments, where they are lost when the PR merges.

## Editing this skill

`SKILL.md` here is canonical. `.claude/skills/pm-review/SKILL.md` is a thin loader that duplicates the
frontmatter, so **a description edited in one place must be edited in both** or triggering and behaviour
drift apart. Plain symlinks were avoided on purpose: a Windows checkout turns committed symlinks into
unusable text files.

## Troubleshooting

**The PR has no linked work items** — `workItemRefs` is empty. There is nothing to accept against; say
so and fall back to reviewing the PR description as the author's claim, rather than inventing criteria.

**The work item is one line with no acceptance criteria** — normal here. The PR description usually
carries a summary and a QA test plan; treat those as the claim under review, not as the specification.

**A criterion reads as satisfied in the code but the feature is invisible** — that is the case the admin
catches and the diff never will. Do not mark a criterion met on code evidence alone when the criterion
is about something the user has to find.

**Ancestors' acceptance criteria are missing from the script output** — deliberate, see
[`../dw-review/README.md`](../dw-review/README.md). Reviewing against a Feature's criteria manufactures
scope the story never signed up for.

**No test-site comment on the PR** — the build service posts
`PR: <id> will be available for test soon - QA: http://swift.qa.<id>.public2.dynamicweb.dk / QA-MAIN: http://swift.qa-main.<id>.public2.dynamicweb.dk`
as a thread. QA runs the PR, QA-MAIN runs `main` for the before/after comparison. If the build or
release has not finished there is no site yet; say the report is static rather than implying the site
was checked.
