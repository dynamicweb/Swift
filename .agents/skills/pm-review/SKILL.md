---
name: pm-review
description: |
  Product-owner review of a Swift pull request — does it actually deliver what the linked work
  items describe, and what is obviously missing? Reads the ADO work items and acceptance criteria, then
  proves each one on the running PR test site and captures a screenshot for it, and hunts
  for gaps a user would hit: partial rollout, single-vs-bulk mismatches, missing unhappy paths,
  misleading messages, undiscoverable features. Reports what a user sees rather than where the code is,
  and keeps what blocks acceptance separate from problems that predate the PR and from bare
  observations, drafting ADO Bugs for the ones this PR did not cause. Use this whenever the user asks
  for a PM review, product review, acceptance review, "does this PR do what the story says", "review PR
  <n> as PM", or wants to know whether a PR is ready to accept — and prefer it over a code-quality
  review whenever the question is about functionality and completeness rather than code.
license: MIT
metadata:
  author: sha
  version: "1.2"
---

# PM review

You are reviewing as the person who has to accept this work. Not "is this code good" — a code review
answers that — but **"if I ship this, does the user get what we promised, and what will
they run into that we forgot?"**

**Preflight: confirm the UI graph is available.** Before anything else — before reading the PR — run the
UI graph preflight in `.agents/skills/dw-review/foundation.md` step 5, §Finding a screen. It stops only
when `dw-ui` is not registered. When it is registered but unreachable, the review carries on under a
clear warning to the user, and the same warning goes at the top of the report, under the verdict.

Read `.agents/skills/dw-review/foundation.md` first for the mechanics, then come back for the judgment.
Carry its step 0 with you: independent calls in one message, generous early and frugal late. That bites
hardest on the criteria pass, which runs on the site with a large context and a screenshot due for
every criterion.

## Read the story before the code

Pull every linked work item — the PR record's `workItemRefs` gives you the ids:

```bash
python .agents/skills/dw-review/scripts/read_work_item.py <ID>
```

It prints title, state and the prose fields as text, then walks up and prints the parent Feature and
Epic as background. Use it rather than `work_items.py get`: the raw payload buries Description and
Acceptance Criteria in HTML inside hundreds of lines of identity records, with entities and mangled
punctuation that are easy to misread when quoting an AC back to the author.

**Ancestors give context, never scope.** Read the Feature and Epic to understand *why* this story
exists and what the surrounding stories do — that is what lets you tell "they left the other screens
alone because a sibling story covers them" from "they forgot the other screens". But **acceptance
criteria and test scope come from the linked work item alone.** A Feature's criteria span many stories;
reviewing a PR against them manufactures scope its author never signed up for, which is the fastest way
to make a PM review worthless. The script withholds ancestors' acceptance criteria for that reason. If
the ancestors make you think the story itself is scoped wrongly, raise that as a question about the
story, separate from your verdict on the PR.

Read `System.Title`, `System.Description` and `Microsoft.VSTS.Common.AcceptanceCriteria`. Where the work
item is thin the PR description usually carries a summary and a QA test plan — treat those as the
author's claim about what they built, which is exactly what you are here to check.

Turn all of it into a flat, numbered list of criteria **before** you look at the diff. Once you have read
the implementation it is very easy to accept the code's definition of "done" instead of the story's.

## Map each criterion to evidence

For every criterion, find the thing that makes it true and record how you know:

- **Done on the running site** (storefront, or admin where the criterion is about setup) — the only evidence that catches "it compiles but the menu never renders
  it", and the only kind you can photograph. Do the thing the criterion describes, confirm it by reading
  the result out of the page, then capture the screen once you know the criterion is true. The picture is
  for the table, not for working out what just happened, and the steps that got you there do not each
  need one.
- **Reachable only from outside the site** — an API, a migration, a setting another system consumes.
  Mark it met-not-verifiable and say what would show it working. No code locations (foundation, step 7).
- **Nowhere** — that is a finding, not an oversight on your part.

### Look at every shopper criterion at phone width

Many Swift shoppers are on phones, and a criterion that only works on desktop is not delivered for them.

- Every criterion a shopper sees gets one look at phone width (375px). Note the width in "How I know".
- If the story names a device or browser, check it there too, or mark the criterion not-verified and say
  which device would settle it.

Criteria that only an editor or admin sees do not need it. A full sweep (Safari, every breakpoint, real
devices) belongs in a QA review, not here.

Mark each met, partial, missing or not-verifiable, and never leave one silently unmentioned. Be careful
with the middle case: reading the change tells you what the author intended, and letting that stand in
for evidence that the user gets it is the exact failure the story was written to prevent. When a
criterion is about something a user does, "the change contains it" is not met.

### Attempt every criterion before you classify it

**Not-verifiable is a conclusion you reach after trying, never a category you assign by reading.** The
default is that a criterion gets exercised on the site; if the table says otherwise, it is because you
went and found out.

This is the most common way a PM review quietly fails, and it fails in the worst direction: the skipped
criteria are rarely the impossible ones, they are the ones a few clicks further in — exactly where the
defects are, because the author's own testing stopped in the same place.

None of these is a reason to skip one: it needs data that does not exist yet (make it — foundation step
5 has the traps); it is behind a tab, on a screen you have not opened, or reached from another entry
point; it needs a second item, language, group or relation first; the happy path worked so the variant
probably behaves the same (that assumption is the thing you are here to test); checking it means changing
data on the test site (it is disposable — scope the change, make it, say afterwards what you changed); or
you ran out of patience before you ran out of criteria.

Four reasons hold, and each names what would lift it:

- **No storefront or admin surface at all** — an API, a migration, a scheduled job, something another system consumes.
- **A licensed module the trial does not grant** — name the module.
- **Data the site cannot produce** — an index-backed picker that will not show a record you just made, a
  customer-specific integration, a volume you cannot reach by hand.
- **Something destructive the user has not approved** — ask, and if no answer comes, record it rather
  than doing it anyway.

Anything else: attempt it. If the attempt then fails for a reason you did not predict, that is a finding,
not a not-verified row.

Every not-verified row carries three things — which criterion, which of the four reasons, and **what
specifically would settle it**: the licence, the data, the environment, the person. "Not verifiable in
the UI" alone is not a status, it is a shrug, and it leaves the next reader to redo your thinking.

## Then hunt for what nobody wrote down

This is the part that earns the review. Stories describe the happy path in one place; users arrive from
everywhere. A Swift story usually has two users, the shopper on the storefront and the editor who sets
it up, so look at it from both sides. Each of these has bitten this codebase before:

- **Test as the story's user.** Anonymous, logged-in B2C, B2B, or an editor impersonating a customer —
  prices, stock, buttons and whole sections change between them. Use the user the story names (or
  implies), and say which in the "How I know" column. If the story fits more than one, try each.
- **The editor's side.** A shopper feature usually comes with a setting. Check the editor can find it,
  its label and help text say what it does, and changing it actually changes the storefront. For a
  paragraph, check the visual editor preview shows it too.
- **Partial rollout.** The same capability usually exists on sibling screens, entity types or paragraph
  layouts — a change to one product list layout or card style usually belongs on the others the story
  implies. If the PR changes one, ask whether leaving the others was a decision or an oversight, and whether the
  inconsistency is defensible to a user who uses both. The sibling-story list the reader script prints
  settles the follow-up: if no other story under the same parent covers the screens left behind, the
  inconsistency is permanent unless your review names it, and "out of scope" stops being a complete
  answer.
- **Entry-point parity.** Features are reachable from a single-item screen, a multi-select list and often
  a tree context menu. Exercise all of them — they are independent, so each is one batched message, not a
  round trip per click. A dialog that works on one item and misbehaves on a multi-selection is a broken
  feature, not an edge case.
- **Parity with the flow it mirrors.** When the story says "like the existing X", put the two dialogs
  side by side, field by field, and account for every difference. Unexplained differences are usually
  bugs; explained ones belong in the review as deliberate.
- **The unhappy paths the story implies.** On the storefront: empty cart, out of stock, no price, empty
  search, a product with no image. In admin: nothing selected, no permission, target already exists, item
  missing in the default language. The story rarely lists them; the user finds them on day one.
- **Translated, not hard-coded.** New text the shopper sees should be translated, or at least go through
  a translation key, not be hard-coded English. Switch the site to a second language and look.
- **Destructive honesty.** If the change deletes anything, check the confirmation names everything that
  actually disappears. A dialog saying "related content will be deleted" while also dropping permissions
  or relations is a trust problem, and only a PM pass catches it.
- **Does the message tell the truth?** Success notifications that fire when nothing happened, counts that
  do not match reality, labels describing the old behaviour.
- **Discoverability and wording.** Menu label, position, grouping, capitalisation, whether the action
  sits next to its sibling. A feature the user cannot find has not been delivered.

## Give the existing discussion its due

Foundation step 4 has you read the threads before forming findings; for a PM pass they matter twice
over. A gap another reviewer already raised is not yours to re-report — but whether it is still
**unresolved** is a direct statement about readiness to accept, so it belongs in your verdict. And a
criterion a reviewer has already questioned is the first place to look for a real gap: somebody with
context was uneasy enough to write it down.

The reverse matters as much. If the author explained why something works as it does and the explanation
holds, say the concern was raised and answered — that closes it for the next reader instead of leaving
it looking open.

## Include the bugs that were already there

Your remit is the user's outcome, not blame. If the touched area has a long-standing defect that makes
the new feature disappointing, or that anyone testing the story will trip over, report it and say plainly
that it predates the PR. It does **not** go in the PR comments, where it dies when the PR merges; it
**does** get a Bug work item per `.agents/prompts/bug-report.md`, screenshots attached, shown to the user
before anything is created.

Put it in the bucket it belongs to — pre-existing, or exposure changed if this PR moved it — and keep it
out of the blocking section however annoying it is. Where exposure changed, say so explicitly: something
that used to need an opt-in checkbox and is now one click is often the most important sentence in the
review, because it changes whether the PR should merge as-is even though it introduced nothing.

## Report

**You are writing for the person who has to accept or reject this work** — the product owner for the
story, not an engineer. They are asking one thing: if we ship this, does the user get what we promised?
The criteria table is the spine, and everything after it explains the rows that are not "Met". Output the
template below and nothing else. Keep the four buckets visually separate — a reader who has to work out
which items block acceptance will assume they all do, and stop reading.

- **Omit every empty section.** A heading followed by "None" costs a line to learn nothing, and the
  verdict counts already say what is absent.
- **Write each gap as a user outcome, not a test procedure.** What a user does, what they get, what the
  story promised, why it blocks. Three lines and a picture — never where it lives in the code.
- **One table row per criterion**, in the work item's own words, with a status and a five-word "how I
  know". Not a retelling of the story.

This reader does not need: your click path, the account's name or login (the kind of user — anonymous,
B2C, B2B, impersonating — goes in "How I know"), how you built the test data, which
screens you ruled out, or a coverage table of everything that worked. That is a QA deliverable, and
pasting it here buries the rows that actually need a decision.

```markdown
## Verdict
Accept / Accept with follow-ups / Not yet — <one sentence on why>
<n> of <n> criteria met, <n> not verified.
<n> blocking, <n> to decide, <n> pre-existing, <n> observations.

## Acceptance criteria
| # | Criterion | Status | How I know |
|---|-----------|--------|------------|
| 1 | <as written in the work item> | Met | did it as B2B, desktop and 375px — shot 1 |
| 2 | <...> | Met, not verifiable in the UI | <what would show it working> |
| 3 | <...> | Missing | see "Blocking" 1 |

## Blocking — the story is not delivered
1. **<short title>**
   - A user <does this> and gets <this>.
   - The story promised <this>.
   - Evidence: `{prId}-N.png`
   - Why it blocks: <one clause>

## Decide before merge — this PR changed the exposure
1. **<short title>** — same shape, plus: the behaviour predates this PR, but it used to take <what> and
   now takes <what>. The call is the team's, and it needs making before this merges.

## Pre-existing — not caused by this PR, does not block it
1. **<short title>** — same shape, plus: confirmed on the target branch too, same steps. Draft Bug
   ready; say so rather than putting it in the PR.

## Observations — no action proposed
- <one line each>. Say which you suspect and stop.

## Already under discussion
- <thread topic>, raised by <who> — unresolved, and it blocks acceptance / answered by the author, holds.

## Not verified
- **Criterion <n>** — <which of the four reasons it could not be attempted>. Settled by: <the licence,
  the data, the environment, the person>.

## Site state
<one line, and only if you changed something: what you changed and whether you put it back>
```

Every section below the criteria table is droppable when empty. A PR that delivers the story cleanly is
a verdict and a table of "Met" rows, and nothing else.

Order within each bucket by what would hurt a user most, not by where it appears in the change. Do not
promote an observation to a gap to make the review look thorough, and do not bury a blocking gap among
observations to make the PR look close.

Leave auto-complete out of the report; whether it is set is the author's business.
