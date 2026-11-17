#!/usr/bin/env python3
"""Print a work item as readable text, plus its ancestors as background context.

`work_items.py get` returns the full ADO payload, where the fields a reviewer actually needs
(Description, Acceptance Criteria, Repro Steps) are HTML buried in several hundred lines of identity
records. This strips the markup so acceptance criteria can be read and quoted directly.

Ancestors (Feature, Epic) are fetched and printed for background only — their **description is shown,
their acceptance criteria deliberately are not**. What a PR has to satisfy is the acceptance criteria
of the work item actually linked to it; a Feature's criteria cover work spread across many stories, so
reviewing against them invents scope the author never signed up for.

    python .agents/skills/dw-review/scripts/read_work_item.py 26401
    python .agents/skills/dw-review/scripts/read_work_item.py 26401 --no-ancestors
"""
from __future__ import annotations

import html
import json
import re
import subprocess
import sys
from pathlib import Path

PARENT_REL = "System.LinkTypes.Hierarchy-Reverse"
CHILD_REL = "System.LinkTypes.Hierarchy-Forward"
MAX_DEPTH = 4  # Story -> Feature -> Epic is the usual ladder; the cap just stops a cyclic link.

SUMMARY = [
    ("System.WorkItemType", "Type"),
    ("System.State", "State"),
    ("System.AreaPath", "Area"),
    ("System.IterationPath", "Iteration"),
]
PROSE = [
    ("System.Description", "Description"),
    ("Microsoft.VSTS.Common.AcceptanceCriteria", "Acceptance criteria"),
    ("Microsoft.VSTS.TCM.ReproSteps", "Repro steps"),
]


def to_text(raw: str | None) -> str:
    if not raw:
        return "(empty)"
    text = re.sub(r"<br\s*/?>", "\n", raw)
    text = re.sub(r"</(li|p|div|tr|h[1-6])\s*>", "\n", text, flags=re.I)
    text = re.sub(r"<li[^>]*>", "- ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text).replace("\xa0", " ")
    # ADO round-trips some punctuation badly; U+FFFD is usually an em dash in these fields.
    text = text.replace("�", "-")
    lines = [line.rstrip() for line in text.splitlines()]
    out: list[str] = []
    for line in lines:
        if line.strip() or (out and out[-1].strip()):
            out.append(line)
    return "\n".join(out).strip() or "(empty)"


def fetch(work_item_id: str | int, expand: str = "relations") -> dict:
    script = Path(__file__).resolve().parents[2] / "azure-devops" / "scripts" / "work_items.py"
    result = subprocess.run(
        [
            sys.executable, str(script), "get",
            "--project", "Dynamicweb",
            "--id", str(work_item_id),
            "--expand", expand,
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        sys.exit(f"work_items.py failed for #{work_item_id}: {result.stderr.strip() or result.returncode}")
    return json.loads(result.stdout)


def parent_id(payload: dict) -> str | None:
    for relation in payload.get("relations") or []:
        if relation.get("rel") == PARENT_REL:
            return relation.get("url", "").rsplit("/", 1)[-1] or None
    return None


def siblings(parent: dict, exclude_id: str) -> list[dict]:
    """The parent's other children — whether an adjacent gap is already someone else's story."""
    ids = [
        url.rsplit("/", 1)[-1]
        for url in (r.get("url", "") for r in parent.get("relations") or [] if r.get("rel") == CHILD_REL)
        if url.rsplit("/", 1)[-1] not in ("", exclude_id)
    ]
    if not ids:
        return []
    script = Path(__file__).resolve().parents[2] / "azure-devops" / "scripts" / "work_items.py"
    result = subprocess.run(
        [sys.executable, str(script), "batch-get", "--project", "Dynamicweb", "--ids", ",".join(ids)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return []
    payload = json.loads(result.stdout)
    return payload.get("value", payload) if isinstance(payload, dict) else payload


def headline(payload: dict) -> str:
    fields = payload.get("fields", {})
    kind = fields.get("System.WorkItemType", "?")
    return f"#{payload.get('id')} [{kind}] {fields.get('System.Title', '(untitled)')}"


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    if len(args) != 1:
        sys.exit(__doc__)

    item = fetch(args[0])
    fields = item.get("fields", {})

    ancestors: list[dict] = []
    if "--no-ancestors" not in flags:
        current, depth = item, 0
        seen = {str(item.get("id"))}
        while depth < MAX_DEPTH:
            next_id = parent_id(current)
            if not next_id or next_id in seen:
                break
            seen.add(next_id)
            current = fetch(next_id)
            ancestors.append(current)
            depth += 1

    if ancestors:
        chain = " > ".join(headline(a) for a in reversed(ancestors))
        print(f"Ancestry: {chain} > #{item.get('id')}\n")

    print("=" * 70)
    print(f"THE WORK ITEM UNDER REVIEW - {headline(item)}")
    print("Acceptance criteria and test scope come from this item only.")
    print("=" * 70)
    print(" | ".join(f"{label}: {fields.get(key, '?')}" for key, label in SUMMARY))
    for key, label in PROSE:
        if key in fields or label != "Repro steps":
            print(f"\n===== {label} =====")
            print(to_text(fields.get(key)))

    for ancestor in ancestors:
        print("\n" + "-" * 70)
        print(f"BACKGROUND ONLY - {headline(ancestor)}")
        print("Why this exists and how the story fits. Not a source of acceptance criteria,")
        print("which is why this item's criteria are not printed.")
        print("-" * 70)
        print(f"\n===== Description =====")
        print(to_text(ancestor.get("fields", {}).get("System.Description")))

        if ancestor is ancestors[0]:
            others = siblings(ancestor, str(item.get("id")))
            print("\n===== Sibling stories under this parent =====")
            if others:
                for sibling in others:
                    print(f"- {headline(sibling)} - {sibling.get('fields', {}).get('System.State', '?')}")
                print(
                    "\nUse these to judge whether a gap you found is covered elsewhere. A gap that is\n"
                    "nobody's story is a gap that will not get fixed unless this review names it."
                )
            else:
                print(
                    "(none - this story is the only child, so any adjacent gap you find has no planned\n"
                    "owner and needs raising explicitly.)"
                )


if __name__ == "__main__":
    main()
