#!/usr/bin/env python3
r"""Upload a screenshot to a pull request and print the markdown that embeds it in a comment.

A finding the reader can see is worth more than one they have to reconstruct, so every confirmed
behavioural finding should carry a picture. ADO stores per-PR attachments; the returned url embeds in
any comment on that PR.

    python .agents/skills/dw-review/scripts/attach_screenshot.py --pr 23264 --file C:\shots\finding-2-after.png
    python .agents/skills/dw-review/scripts/attach_screenshot.py --pr 23264 --file shot.png --name finding-2-after --alt "3 deleted, 2 remain"

Prints one markdown line. Paste it into the comment body you build with repos.py create-thread.
A name that already exists on the PR is retried with -2, -3 ... rather than failing, because a review
that gets re-run should not have to invent new filenames.
"""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "azure-devops" / "scripts"))

from api_client import api_request  # noqa: E402

MAX_BYTES = 5 * 1024 * 1024  # ADO accepts more, but a review comment full of 20 MB PNGs helps nobody.


def upload(project: str, repo: str, pr_id: int, file_bytes: bytes, filename: str) -> dict:
    return api_request(
        "POST",
        f"{project}/_apis/git/repositories/{repo}/pullRequests/{pr_id}/attachments/{filename}",
        raw_body=file_bytes,
        content_type="application/octet-stream",
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--pr", required=True, type=int, dest="pr_id")
    parser.add_argument("--file", required=True, dest="file_path")
    parser.add_argument("--name", help="Attachment name without extension (default: the file's own name)")
    parser.add_argument("--alt", help="Alt text / caption for the markdown (default: the name)")
    parser.add_argument("--project", default="Dynamicweb")
    parser.add_argument("--repo", default="Swift")
    args = parser.parse_args()

    path = Path(args.file_path)
    if not path.is_file():
        sys.exit(f"File not found: {path}")
    size = path.stat().st_size
    if size > MAX_BYTES:
        sys.exit(f"{path.name} is {size / 1e6:.1f} MB; crop it to the part that shows the finding.")
    data = path.read_bytes()

    stem = args.name or path.stem
    suffix = path.suffix or ".png"

    for attempt in range(1, 6):
        filename = f"{stem}{suffix}" if attempt == 1 else f"{stem}-{attempt}{suffix}"
        result = upload(args.project, args.repo, args.pr_id, data, filename)
        error = result.get("error", "")
        if not error:
            url = result.get("url")
            if not url:
                sys.exit(f"Upload succeeded but returned no url: {result}")
            print(f"![{args.alt or stem}]({url})")
            return
        if "409" not in error and "exist" not in error.lower():
            sys.exit(error)

    sys.exit(f"'{stem}' already exists on PR {args.pr_id} five times over; pass a different --name.")


if __name__ == "__main__":
    main()
