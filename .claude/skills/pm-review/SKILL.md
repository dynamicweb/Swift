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

The instructions for this skill live in `.agents/skills/pm-review/SKILL.md` — read that file now and
follow it. This entry exists because Claude Code loads skills from `.claude/skills/`, while the repo
keeps its agent skills under `.agents/skills/`.

The frontmatter above mirrors the canonical file. If you change the description in one place, change it
in both, or triggering and behaviour will drift apart.
