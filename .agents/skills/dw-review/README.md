# Swift review foundation

Shared plumbing for the PR-review skills, `pm-review` and (once it lands) `qa-review`. Ported from the
Dynamicweb10 repo's `dw-review` and adapted to Swift's repo and test sites. It is **not invoked on its
own** — both skills read [`foundation.md`](foundation.md) at the start of a review so that they resolve
the same PR, read the same diff, and test the same site.

## Layout

| File | Purpose |
|------|---------|
| `foundation.md` | The ten mechanics steps: resolve the PR, diff via git, find the test site, read existing threads, get into the admin, capture the evidence, report on behaviour rather than code, ask before touching anything, label evidence, and sort findings into the four buckets. |
| `scripts/read_work_item.py` | Prints a work item's prose fields as readable text, plus its ancestors as background. |
| `scripts/save-screenshot.ps1` | Windows: saves a PNG of the browser window, so a finding can carry a picture. |
| `scripts/save-screenshot.sh` | macOS twin of the above. |
| `scripts/attach_screenshot.py` | Uploads a PNG to a PR and prints the markdown that embeds it in a comment. |

The judgment lives in the calling skill; anything in here that starts sounding like an opinion about a
PR belongs in `pm-review/SKILL.md` or `qa-review/SKILL.md` instead.

## Setup

1. **Azure DevOps auth** — every script call goes through the `azure-devops` skill, so its PAT or OAuth
   token must be in the keyring first. See [`../azure-devops/README.md`](../azure-devops/README.md).

   ```bash
   python .agents/skills/azure-devops/scripts/auth.py status
   ```

2. **Git access to both refs** — the diff is taken locally, not from the API:

   ```bash
   git fetch origin <source-branch> <target-branch>
   ```

3. **A browser that can reach the PR site** — PR sites are plain `http`, which the in-app Browser pane
   cannot render (see Troubleshooting). Claude in Chrome drives the user's real Chrome and works.
4. **Windows PowerShell** for `save-screenshot.ps1`, or on macOS `save-screenshot.sh` with Screen
   Recording permission for the app that runs it. Both grab pixels from a visible on-screen window, so
   the browser window has to be open, not minimised and not covered; there is no headless path.

## read_work_item.py

```bash
python .agents/skills/dw-review/scripts/read_work_item.py 26401
python .agents/skills/dw-review/scripts/read_work_item.py 26401 --no-ancestors
```

Prints the ancestry line, then the work item under review (type, state, area, iteration, Description,
Acceptance Criteria, Repro Steps with the HTML stripped), then the parent Feature and Epic as
background, then the sibling stories under the same parent.

Two deliberate behaviours worth knowing before you "fix" them:

- **Ancestors' acceptance criteria are withheld.** Only their descriptions are printed. A PR has to
  satisfy the criteria of the work item linked to it; a Feature's criteria span many stories, and
  reviewing against them invents scope the author never signed up for.
- **U+FFFD is rewritten to `-`.** ADO round-trips em dashes badly in these fields, and the replacement
  character is almost always one.

Use it rather than `work_items.py get`, which returns the same fields as HTML buried in several hundred
lines of identity records.

## save-screenshot.ps1

```bash
powershell -File .agents/skills/dw-review/scripts/save-screenshot.ps1 -PrId 23241
powershell -File .agents/skills/dw-review/scripts/save-screenshot.ps1 -PrId 23241 -Number 2 -TitleMatch "Products"
```

Writes `%USERPROFILE%\Pictures\Screenshots\{prId}-{n}.png` and prints the path, picking the next free
`{n}` for that PR. `-Process` pins a browser when auto-detection picks the wrong one.

On macOS:

```bash
bash .agents/skills/dw-review/scripts/save-screenshot.sh 23241
bash .agents/skills/dw-review/scripts/save-screenshot.sh 23241 --number 2 --app "Brave Browser"
```

Writes `~/Pictures/Screenshots/{prId}-{n}.png` from the front window of the first running Chrome, Brave
or Edge (`--app` pins one) and prints the window title and the path. It has no blank-capture check; a
missing Screen Recording permission shows up as a picture of the wallpaper, so read the PNG back.

It captures the matched **window**, not the desktop, which is deliberate: a review that uploads a
full-screen grab puts whatever else the user had open in front of the whole team. "Claude in Chrome"
does not necessarily run in Chrome, so it auto-detects Chrome, Brave and Edge.

Three ways it hands back a picture that is not the one you meant. The first two produce a wrong picture
rather than an error: the tab you want must be the **active** tab in that window (an MCP-driven tab is
often a background tab), and nothing may be covering the window. It prints the window title it captured,
which is how you catch both.

The third it does detect: a window on a display that is not currently rendering — a sleeping monitor, a
disconnected or virtual second screen — captures as a flat black rectangle with every other sign of
success. The script samples the image and exits non-zero when it comes back a single uniform colour,
telling you where the window was and to move it to the primary display. That check only catches a blank
capture, though, not a capture of the wrong thing.

So always read the PNG back with the Read tool before citing it.

Do not use the `computer` tool's `save_to_disk` flag instead — it reports success and writes nothing
findable, and it takes no path or filename.

## attach_screenshot.py

```bash
python .agents/skills/dw-review/scripts/attach_screenshot.py --pr 23264 --file <path> --alt "3 deleted, 2 remain"
```

Uploads to that PR's attachments and prints one markdown line — `![3 deleted, 2 remain](https://...)` —
for the body of a comment created with `repos.py create-thread`. Defaults to project `Dynamicweb`, repo
`Swift`; `--name` overrides the attachment name, which otherwise comes from the file.

A name already used on the PR is retried with `-2`, `-3` up to five times, so re-running a review does
not fail on its own earlier attachments. Files over 5 MB are refused — crop to the part that shows the
finding. For a Bug work item, use `attachments.py upload-and-attach` from the `azure-devops` skill
instead; PR attachments and work-item attachments are different stores.

## Troubleshooting

**`work_items.py failed for #<id>`** — the wrapper shells out to the `azure-devops` skill. Run
`python .agents/skills/azure-devops/scripts/auth.py status`; an expired token surfaces here as a
non-zero exit rather than an HTTP error.

**No ancestry line printed** — the item has no `System.LinkTypes.Hierarchy-Reverse` relation, i.e. it is
not parented. Nothing is wrong; there is just no Feature or Epic to show.

**No sibling stories listed** — sibling lookup fails soft. If `batch-get` errors the list comes back
empty rather than stopping the review, so an empty list is not proof the parent has one child.

**`ERR_BLOCKED_BY_CLIENT` on `/Admin/assets/main.css`** — the in-app Browser pane blocks `http`
subresources, so the admin loads as unstyled HTML and the SPA never boots. The site is fine; confirm
with `curl -s -o /dev/null -w "%{http_code}" <css-url>` and switch to Claude in Chrome. Reloading does
not help.

**Signed in on one PR site, locked out of the next** — auth cookies are per-host and are not shared
between `swift.qa.<id>` and `swift.qa-main.<id>`, or across PRs. Every site needs its own login.

**The site opens the license wizard instead of the admin** — normal on a freshly built site, not a
finding. `foundation.md` step 5 has the three clicks through it, which trial to pick, and why the
licence footer's commit is worth a glance. Provisioning the trial changes the site's state, so the
report says so.

**`No browser window found`** (or `No browser window found matching '<text>'`) — the browser is
minimised, closed, or its title does not contain the string passed to `-TitleMatch`. The message lists
the Chrome, Brave and Edge windows it did see, so match on something from one of those titles, or drop
`-TitleMatch` and let auto-detection pick.

**`the capture is blank, not evidence`** — the window is on a display that is not currently rendering: a
sleeping monitor, or a disconnected or virtual second screen. The script samples the PNG and exits
non-zero rather than handing back a black rectangle that reads as evidence. Move the browser window to
the primary display and run it again.

**The capture is bigger than the primary screen** — expected when the browser is on a second,
higher-resolution monitor. The window rectangle is captured from the virtual desktop, so the image is
window-sized, not screen-sized.

**`HTTP 404` from attach_screenshot.py** — the PR id or repo is wrong. Attachments are scoped to one PR;
there is no cross-PR reuse of an uploaded image.

**The `azure-devops` MCP server has no tools** — it drops out of sessions. The Python scripts are the
reliable path, and CLAUDE.md mandates them over `gh` regardless.
