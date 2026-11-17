# Swift PR review — shared foundation

Mechanics common to `pm-review` and `qa-review`. Those skills own the *judgment*; this file owns the
*plumbing*, so both reviews look at the same PR, diff and site. Read it once, then go back to the
calling skill.

## 0. Work in batches

Every tool call re-reads the whole conversation, so a call costs whatever the context is at that
moment — one during the evidence pass costs several times one at the start.

- **Independent calls go in one message.** The opening moves below (PR record, threads, `git fetch`
  plus diff, work item) do not depend on each other. Same for a handful of greps, several state reads,
  or reading a group of screenshots back.
- **Generous early, frugal late.** Front-load the reading while context is small.

This never trades away coverage. Skipping a counter-test or dropping a screenshot a finding depends on
is not a saving, it is a worse review.

## 1. Resolve the target

A PR number is the id. A branch name resolves the same way. **Nothing** means the current branch's PR —
if there is none, say so and offer the working-tree diff instead; never silently review something else.

```bash
python .agents/skills/azure-devops/scripts/repos.py get-pr --project Dynamicweb --repo Swift --pr-id <ID>
python .agents/skills/azure-devops/scripts/repos.py list-prs --project Dynamicweb --repo Swift
```

The `azure-devops` MCP server has the same data but drops out of sessions; the scripts are the reliable
path, and CLAUDE.md mandates them over `gh` regardless.

Keep from the record: title, description (the QA test plan lives there), source and target refs,
`workItemRefs`, reviewers and votes, and whether **auto-complete is set** — that decides how urgently
you speak up, since an approved PR with auto-complete merges the moment policies pass.

## 2. Get the real diff from git, not the API

The API lists *which* files moved; it does not give reviewable hunks.

```bash
git fetch origin <source-branch> <target-branch>
git diff --stat origin/<target>...origin/<source>
git diff origin/<target>...origin/<source>
```

Three dots, not two — what the source added relative to the merge base, not the target's unrelated
progress. Read every hunk, then open the surrounding files: a diff shows the change and hides the
contract it has to keep. When a PR replaces an older flow, read what it replaced
(`git show origin/<target>:<path>`) and the flow it claims to mirror. Most real findings in this
codebase come from that comparison, not from the hunks.

## 3. Find the test site

```bash
python .agents/skills/azure-devops/scripts/repos.py list-threads --project Dynamicweb --repo Swift --pr-id <ID>
```

Look for the build service's comment:

```
PR: <id> will be available for test soon - QA: http://swift.qa.<id>.public2.dynamicweb.dk / QA-MAIN: http://swift.qa-main.<id>.public2.dynamicweb.dk
```

Swift gets **two** sites per PR. **QA** runs the PR's build. **QA-MAIN** runs `main` on the same data,
which is the target branch for most Swift PRs. That makes it the cheapest way to earn the "New in this
PR" label in step 10: repeat the steps on QA-MAIN. If the PR targets a `features/*` branch, QA-MAIN
shows `main`, not the target, so say so when you lean on it. Both are deployed from PR builds; if the
comment is there but a site does not answer yet, the release has not finished.

Swift is a storefront: most criteria are proven on the **frontend** (product list, product page, cart,
checkout, Customer Center), and the admin is where you set up the paragraphs, item settings and data
the frontend needs. "The site" below means both.

These sites are disposable — a fresh copy can be rolled out any time. So the caution around destructive
tests is not about the site; it is about shared *product* data on it: the seeded demo catalog, and other
reviewers' in-progress state. Scope a risky delete to data you made (a distinctive prefix, a conditional
filter) so the result is unambiguous either way, rather than skipping the test out of concern for the
site itself.

## 4. Read what has already been said

Read the threads **before** you form findings. Turning up with a point the author answered two days ago
costs you the reader's attention for the findings that are new. Most threads are machine-generated
(policy updates, votes, the build-service URL) — keep the ones written by people and read them for four
things:

- **Already raised.** Do not re-report it; reference it. Whether it is still unresolved is a fact about
  the PR's readiness and belongs in your summary.
- **Already answered.** Engage with the author's rationale or drop the point. Restating the concern as
  though nothing was said reads as not having looked.
- **Marked resolved.** Resolved is a claim, not a fix — the author sets the status (`active`, `fixed`,
  `wontFix`, `closed`, `byDesign`, `pending`). Verify it in the current diff or the running admin; a
  resolved-but-unfixed thread is a finding nobody else will catch.
- **Contradicting you.** Say so, and say why you still disagree. Silently overriding another reviewer is
  how a review loses credibility.

Comments may predate the latest push, so check whether the code they refer to has changed — reporting a
concern that is already gone is the same mistake in the other direction.

To add to an existing discussion, reply into that thread rather than opening a competing one:

```bash
python .agents/skills/azure-devops/scripts/repos.py add-thread-comment --project Dynamicweb \
  --repo Swift --pr-id <ID> --thread-id <THREAD> --content "<text>"
```

## 5. Get a working browser, then hand off the login

**Default to Claude in Chrome for any browser-driven task on this repo** — it is the user's stated
preference, not only a workaround for the pane's limitation below. It drives the user's real Chrome and
renders `http` PR sites correctly, and PR test sites are always plain `http`. Check
`list_connected_browsers`; if it is empty the extension is not installed or not signed in. Say so and
wait, rather than looking for a way round: there is no equivalent fallback for an `http` site.

Do not try the in-app Browser pane on a PR site. It blocks `http` subresources and script-initiated
fetches while allowing top-level `http` navigation, so the admin loads unstyled with no `main.js` and
the SPA never boots (`ERR_BLOCKED_BY_CLIENT` on `/Admin/assets/main.css`; reloading does not help).
Rediscovering that costs several round trips. The pane is fine on `https`. To rule the site itself out:
`curl -s -o /dev/null -w "%{http_code}" <css-url>`.

The account is always **Administrator**, the seeded full-admin user PR sites are restored from. Login is
two-step: type `Administrator` at the username step and click Next (a username is not a secret), tick
"Stay signed in", then stop — **the password is the user's to supply, never yours to type.** Expect this
once per PR site; auth cookies are per-host, not shared between the QA and QA-MAIN sites. Frontend
logins (a B2B customer for Customer Center flows) are separate from the admin login: use a user that
exists in the site's demo data, and the same rule applies — the password is the user's to type.

**The licence wizard.** A newly built site often lands on it instead of the admin ("Congratulations on
your new Commerce suite installation!"). That is normal, not a finding. Three clicks: **Get free trial**
→ **Register** (keep the preselected **Suite Trial**, the broadest) → **Go to administration**,
which lands on the normal login. Never **Install license** — there is no licence to install. Afterwards
the login footer reads `License: Trial <version>+<commit>`; that commit should match the PR's merge
commit, which is a free check that the site runs this build. Two consequences: say in the report that
you provisioned a trial, and if the PR touches a module the trial does not grant, that goes in "Not
tested" with the reason rather than being reported as broken.

**Finding a screen: ask the UI graph.** For a Swift PR this matters only when you need an admin screen —
item type settings, paragraph settings, a product or user to set up test data. Storefront pages are not
in the graph (see below); find those from the site itself. Hunting a screen by clicking has been the largest avoidable cost
in these reviews, and guessing its URL is worse: a wrong query parameter renders a plausible *empty*
screen rather than an error. The `dw-ui` MCP server is a read-only Neo4j graph of the admin — every
area, tree node, screen, action, command, model and field, built from this repo's source and the manual,
then checked against a live instance. It answers "where is this screen and how do I get there" in one
call. Register it once per machine:

```bash
claude mcp add --transport http --scope user dw-ui http://10.3.4.9:8000/mcp/
```

This is the only copy of that command; the reviews' preflights point here, so a new address is changed
in one place.

**UI graph preflight.** Both reviews run this before they read the PR:

1. `ToolSearch("select:mcp__dw-ui__read_neo4j_cypher")`. If the tool comes back, you are done.
2. **A miss that says servers are still connecting is not a miss.** In a fresh session the search can
   return at once with "No matching deferred tools found" plus a note that some MCP servers are still
   connecting. Wait about ten seconds and search again, for up to two minutes. Only a miss without that
   note is real.
3. On a real miss, run `claude mcp get dw-ui` — it tells the two cases apart:
   - **Not registered: stop** before reading the PR. Give the user the command above and tell them to
     restart Claude Code so the tool loads. It is a one-time setup fix; continue without the graph only
     if the user says so, and then treat it like the next case. On a Swift PR that touches no admin
     setup, saying so in that message is a fair reason to offer to carry on.
   - **Registered but not reachable** (off VPN, a cloud session, the server down): **do not stop, warn.**
     Tell the user at once, as its own message before anything else, for example:
     > **Warning — UI graph unavailable.** `dw-ui` is registered but not reachable (`<what claude mcp
     > get printed>`). Continuing without it: screens will be found by grep and the class-name rule,
     > which is slower and can land on a plausible empty screen.

     Then put the same warning at the very top of the report, directly under the verdict, so nobody
     reads the findings without knowing the screens were found without the graph.

Its tool is deferred; load it with `ToolSearch("select:mcp__dw-ui__read_neo4j_cypher")`. Its other tool,
`get_neo4j_schema`, **fails** — the server has no APOC plugin. The schema and the usage guide live in the
graph itself: `MATCH (g:GraphInfo) RETURN g.agentGuide`. Read that only when the queries below do not
cover what you need.

*Screen class → tree path, URL and real query parameters.* Walks from the tree to the screen through
list rows, dialogs and embedded lists, so it also finds edit screens that no tree node opens directly:

```cypher
MATCH (s:Screen {class:'ProductEditScreen'})
MATCH p = shortestPath((n:NavNode)-[:OPENS|ADD_OPENS|ITEM_OPENS|NAVIGATES_TO|OPENS_DIALOG|EMBEDS_LIST*1..4]->(s))
WITH s, n, [x IN nodes(p)[1..] | x.class] AS hops
ORDER BY size(hops), n.visibility = 'verified' DESC
RETURN s.urlTemplate AS url, n.pathString AS tree, n.visibility AS vis, n.liveUrl AS liveUrl, hops LIMIT 5
```

```cypher
MATCH (s:Screen {class:'ProductEditScreen'})<-[:SAMPLE_OF]-(l:LiveScreenSample)
RETURN l.url, l.treePath LIMIT 3
```

The second query returns URLs the crawler actually loaded, for example
`/Admin/UI/Products/ProductEdit?Id=10001&LanguageId=ENU&Type=ProductById`. Those **parameter names** are
the ones the application produces; never hand-assemble one you have not seen. The **values** (ids,
groups, query ids) belong to the crawled instance, not to the PR site.

*Words on the screen → where it lives.* When you know a label or a concept but not a class:

```cypher
CALL db.index.fulltext.queryNodes('ui_search', 'order flow') YIELD node, score
RETURN labels(node)[0] AS kind, coalesce(node.pathString, node.class, node.label, node.term, node.task) AS what, score
LIMIT 8
```

*Changed command, model or query → every screen and action that uses it.* The blast-radius question:
which other entry points share the changed code.

```cypher
UNWIND ['ProductSaveCommand','ProductDataModel'] AS name
MATCH (t) WHERE (t:Command OR t:Model OR t:Query) AND t.class = name
OPTIONAL MATCH (s:Screen)-[:RUNS|USES_MODEL]->(t)
OPTIONAL MATCH (a:Action)-[:RUNS]->(t)
OPTIONAL MATCH (n:NavNode)-[:USES_QUERY]->(t)
RETURN name, labels(t)[0] AS kind, collect(DISTINCT s.class) AS screens,
       collect(DISTINCT a.label) AS actions, collect(DISTINCT n.pathString)[..10] AS tree
```

What the graph says is a **lead, not a fact** about the PR site:

- **It maps the admin only.** Storefront pages, templates (Swift), the Delivery API and services that
  read the same data are not in it, so the command → screens query lists *admin* entry points and
  nothing else. Frontend and API consumers of changed code still come from grepping the changed names, and which
  storefront page shows a feature still comes from the site itself.

- `visibility` on each tree node: `verified` was seen live on the crawled instance; `conditional` sits
  behind a license, feature flag, role or data (see `condition`); `possibly` and `unverified` were not
  seen at all. Even `verified` means "on that instance" — the PR site's license, data and feature flags
  can differ.
- It is a snapshot of master (`GraphInfo.built`). A screen **added or renamed by the PR** is not in it,
  and a milestone branch may differ. No hit is not proof the screen does not exist: grep the PR for
  `class .*Screen` — the URL is `/Admin/UI/<namespace segment after .Screens>/<Name without Screen>` —
  and open it from a link on its list screen rather than by a hand-built URL.
- `(:Finding)` nodes record known quirks of the crawled instance (a screen that 500s with no favorites,
  label drift, version drift). Check them before reporting something odd on that screen as new.

Having the path still does not mean clicking it — the driving rules below apply once you are on the site.

**Driving the admin**, both learned the hard way:

- **Click by element reference, not screenshot coordinate.** Coordinates land on the right pixels and
  still do nothing on this SPA — panel-opening buttons are the usual victims, and they fail silently.
  Take the ref from `find` or `read_page`. Coordinates only when there is no ref.
- **Never click in the same batch as a `navigate`.** The screen is not ready and the click is swallowed.

**Test data.** Making scratch data keeps the site's real data out of destructive tests, but budget for
it — a handful of products with assets is dozens of round trips. The trap: **product pickers are
index-backed**, so a product created minutes ago does not appear in an "Add products" picker. Prefer
existing indexed data for those flows; where you cannot, that scenario goes in "Not tested" with the
reason. It is not a defect in the PR.

If no surface works at all, say so plainly and fall back to a static review plus a manual test script.

## 6. Capture the evidence

Everything you report about behaviour needs a picture — it is the difference between a finding the
reader believes and one they must reproduce first, and the only evidence that survives you being wrong
about the cause.

**Check by reading the page; prove with a picture.** Two different jobs at very different prices. To
find out what happened — what the search box contains, how many rows survived, where focus went,
whether the console threw — read it out of the page (`javascript_tool`, `read_page`, `get_page_text`):
a couple of hundred tokens, and numbers you can quote. A screenshot costs roughly ten times that and
gives an impression instead of a number. Shoot for a claim you will put in the report; never to discover
what state you are in or to confirm a page loaded. Reading state first also makes the shot better —
knowing "73 of 249 options left, focus in the search box" tells you what the picture has to show.

Browser tools hand screenshots to the model, not to disk, and a comment needs a file, so capture from
the OS side:

```bash
# Windows
powershell -File .agents/skills/dw-review/scripts/save-screenshot.ps1 -PrId 23241
# macOS
bash .agents/skills/dw-review/scripts/save-screenshot.sh 23241
```

It raises the browser window and captures that window only — not the desktop — to
`{prId}-{n}.png` in the user's `Pictures/Screenshots` folder, picking the next free `{n}` (`-Number` /
`--number` forces one). It auto-detects Chrome, Brave and Edge. Both reviews use it. Do **not** use
the `computer` tool's `save_to_disk` flag: it reports success, writes nothing findable, and takes no
path.

On macOS the app running the script needs Screen Recording permission; without it the PNG shows the
wallpaper instead of the browser.

Three traps it cannot catch, each showing up as a wrong or empty picture rather than an error:

- **The tab you want must be active in that window** — it captures the screen, not the tab the MCP tools
  are driving, and an MCP tab is often in the background. The script prints the window title it
  captured; if that is not your page, you shot the wrong tab.
- **Nothing may cover the window**, or the overlapping window lands in the PNG.
- **The window must be on a display that is rendering.** A sleeping, disconnected or virtual second
  screen captures as flat black while everything else reports success. Move it to the primary display
  and retry. The Windows script exits non-zero on a single flat colour (the macOS one does not check),
  but a capture of the wrong thing still looks fine to it.

So **read every saved PNG back with the Read tool before citing it** — that is the verification step,
and a screenshot you saved but never looked at is not evidence. Read them back in batches: at the end of
each group of captures that shares a screen state, put the `Read` calls in one message. Do not defer
every read-back to the very end; discovering a bad capture after the state that produced it is gone
costs more than it saves.

What to shoot:

- **Pairs around anything that changes state** — the list before, the list after, and the message shown
  in between. A green "3 deleted" beside a list still showing two rows is a whole finding in one image.
- **The thing you are claiming, at the moment you claim it.** A shot taken three steps later proves
  nothing about the step you are describing.
- **Look at the window before it leaves the machine.** The capture includes the tab strip and address
  bar. The URL is useful; unrelated tab titles are the user's workspace, not the team's business.
  Reshoot in a clean window if needed.

Send the files to the user alongside the report, so the pictures are in front of the reader.

For a PR comment, upload to that PR and embed what the script prints (`![alt](https://...)`):

```bash
python .agents/skills/dw-review/scripts/attach_screenshot.py --pr <ID> --file <path> --alt "3 deleted, 2 remain"
```

A name already used on that PR is retried with `-2`, `-3`. For a Bug work item use the work-item path:

```bash
python .agents/skills/azure-devops/scripts/attachments.py upload-and-attach --project Dynamicweb \
  --id <WORK_ITEM_ID> --file <path> --comment "<what the picture shows>"
```

If a finding has no screenshot — no browser, or it only exists in a code path you read — say so on that
finding rather than leaving the reader wondering.

## 7. Report on behaviour, never on code

You report what the product does, not where it does it. Locating the defect is the author's job, they
are faster at it, and a guessed cause spends the reader's attention on the guess instead of the symptom.

So in every report and comment: **no file names, no class or method names, no line numbers, no diff
references, no proposed fix.** Reading the diff is still how you know what to attack — it just never
appears in the output.

- Yes — "Selecting three products where one is missing in the default language and deleting reports
  *3 products deleted*, but two of the rows are still in the list afterwards."
- No — "`DeleteProductsCommandHandler.cs:88` hits `continue` when the lookup returns null and still
  returns `Ok`. Move the check above the loop."

Same rule for placement: comments go on the PR, not on a line of the diff.

## 8. Then ask before touching anything

Default output is a markdown report in the conversation with the screenshots sent alongside. Two
escalations, both opt-in:

- **Comments on the PR.** Show the user the exact comment set and get a yes first — they are visible to
  the whole team and land in the author's inbox. One thread per finding, at PR level, screenshot
  embedded, behaviour described as in step 7. No `--file-path`, no `--line`. Never vote, complete or
  abandon. Replying into a thread a person already opened is fine and preferred (step 4), even when it
  is anchored to a line.

  ```bash
  python .agents/skills/azure-devops/scripts/repos.py create-thread --project Dynamicweb \
    --repo Swift --pr-id <ID> --content "<behaviour, repro, and the ![...](...) line>"
  ```

- **Bug work items for anything this PR did not cause**, which would otherwise die when the PR merges.
  Draft per `.agents/prompts/bug-report.md` (repro in `Microsoft.VSTS.TCM.ReproSteps` as HTML, not
  `System.Description`), attach the screenshots, and show it to the user before creating anything.

## 9. Label your evidence

- **Confirmed** — you saw it happen and the screenshot is attached. Say what you saw, with numbers where
  there are numbers ("permissions went 9 to 8, the explicit grant vanished").
- **Plausible** — you reasoned to it but did not see it, so there is no picture. Say what would settle it.

Never round a Plausible up because it feels right, and never pad with findings you do not believe. A
short review that is entirely true beats a long one the author has to fact-check.

## 10. Sort findings by what the reader has to do about them

The reader's first question is "what does this cost me before I can merge". Answering it is the report's
job. Both reviews use these four buckets, never blurred together; when a finding could sit in two, the
higher one wins.

| Bucket | Means | Action |
|--------|-------|--------|
| **New in this PR** | The change introduced it. Does not happen on the target branch. | **Fix before merge.** |
| **Exposure changed** | Older than the PR, but this change makes it materially easier to hit — behind an opt-in before, one click now. | **Decide before merge**, explicitly, with the user. |
| **Pre-existing** | Reproduces on the target branch just as easily. Not this PR's debt. | **Log as a Bug**; the merge is unaffected. |
| **Observation** | Noticed, but you cannot call it a defect: possibly deliberate, possibly always been this way. | **No action proposed.** |

Two rules keep the buckets honest, both easy to get wrong in the direction that flatters the review:

- **Earn the "New" label.** Run the same steps against the target branch, or read the code the PR
  replaced, and say in the finding that you did and what happened. A pre-existing bug reported as a
  regression costs the author a day proving you wrong.
- **Observations stay observations.** If you cannot say what a user loses, it is not a defect. Keep it to
  a line and do not let it drift upward because the list looks thin — one padded item in the top bucket
  and the reader re-reads the whole report as padding.
