# Prompt: Bug Report (Azure DevOps)

Use when creating or updating an Azure DevOps **Bug** for Swift — the repro content
goes in the **`Microsoft.VSTS.TCM.ReproSteps`** field, not `System.Description`
(Bugs in this process template use Repro Steps for the body).

```
work_items.py create --project Dynamicweb --type Bug --title "..." \
  --field System.AreaPath "Dynamicweb\Swift" \
  --field Microsoft.VSTS.TCM.ReproSteps "<html>"
```

With screenshots, upload each one first and put the returned URL in the HTML (see "Screenshots"
below). Scripts are in `.agents/skills/azure-devops/scripts/`.

---

## Instructions for agent

- Goal: anyone can **reproduce the bug from a clean state** by following the steps, and knows
  what they should have seen instead. Write for a tester who does not know the code.
- `Microsoft.VSTS.TCM.ReproSteps` renders as **HTML**. Emit HTML (`<ol>`, `<li>`, `<p>`,
  `<strong>`). Do not emit Markdown. Escape `&`, `<`, `>` in text (`&amp;`, `&lt;`, `&gt;`).
- Ground every step in reality — the actual flow, screen names, data, and config that trigger
  it. Do not invent steps or guess at a repro you have not established.
- Be specific and minimal: exact preconditions, the smallest sequence that triggers it, exact
  observed result (verbatim error text if any), exact expected result.

### Format

```
<h2>Environment</h2>
<p>Version / build, browser or runtime, and any relevant configuration or feature flags.</p>

<h2>Preconditions</h2>
<ul><li>Required setup, data, or state before the steps — e.g. "An index with a grouping field exists"</li>...</ul>

<h2>Steps to reproduce</h2>
<ol>
<li>Concrete action, naming the screen/button/field as the user sees it</li>
<li>...</li>
</ol>

<h2>Expected result</h2>
<p>What should happen.</p>

<h2>Actual result</h2>
<p>What happens instead. Quote any error message or stack trace verbatim inside &lt;pre&gt;.</p>
<p><img src="shots/actual.png" alt="3 deleted, 2 rows remain"></p>

<h2>Impact</h2>
<p>Who is affected and how badly — blocks a flow, data loss, cosmetic, etc.</p>

<h2>Notes</h2>
<ul><li>Frequency (always / intermittent), workaround if any, related work items, when it started</li>...</ul>
```

### Screenshots

A picture of the actual result belongs in the body, next to the step it proves — not only in the
Attachments tab, where a reader has to go looking for it. Swift's `work_items.py` has no
`--embed-images`, so do it in two steps:

1. Upload each PNG: `attachments.py upload --project Dynamicweb --file <path>` prints the
   attachment `url`.
2. Reference that url with a normal `<img src="<url>" alt="...">` in the Repro Steps HTML, then
   create or update the Bug. Once the Bug exists, also link each file to it with
   `attachments.py attach --project Dynamicweb --id <bug-id> --url <url>`, so it shows in the
   Attachments tab too.

It then renders inline exactly like an image pasted into the web editor. Alt text says what the
picture shows.

**Rules:**
- Repro steps numbered (`<ol>`), one action per step, from a clean/known state.
- Screenshots inline via `<img src="<attachment url>" alt="what it shows">`,
  placed under the step or result they prove — never a bare "see attachment".
- **Expected vs Actual** always both present and distinct — the gap is the bug.
- Quote errors **verbatim** (do not paraphrase); wrap multi-line output in `<pre>`.
- State **frequency** (always vs intermittent) and any **workaround** under Notes.
- HTML, not Markdown. Omit a section only if it genuinely does not apply.
- No fix/implementation detail here — that belongs in the PR description.
