# Portfolio — Kokirala Vidhya Sagar

Live at **<https://portfolio-vidhyasagar.vercel.app>**

An AI engineering portfolio built around long-form case studies rather than a project gallery.
Each piece of work gets a full write-up — the architecture, the trade-off, the thing that broke —
because the repositories behind most of it are private and the writing has to carry the evidence.

Astro 5 (static output) · Tailwind v4 · deployed on Vercel · no client framework.

---

## Quick start

```bash
npm install
npm run dev              # http://localhost:4321
npm run dev -- --host    # also serve on the LAN, to test on a phone
npm run build            # static output to dist/
npm run preview          # serve the built output
```

Run exactly one dev server at a time. See [Known gotchas](#known-gotchas).

---

## Repository layout

The git root is this `Website/` folder, not its parent. The parent directory holds the source
projects the case studies are written about (`Agent-evaluator`, `Ai-news-Updater`, `RAG Chatbot`
and so on), each with its own repository. Run `git` and `npm` from here.

Vercel's Root Directory setting stays empty for the same reason — the repository root already is
the site root.

```
src/
  site.ts                 identity, skills, CV data, the availability switch
  content.config.ts       Zod schemas for both content collections
  content/
    projects/*.mdx        one file per case study
    experience/*.md       one file per role
  components/             Astro components, all zero-JS or near it
  layouts/Base.astro      <head>, theme script, ambient field, tilt + reveal observers
  pages/
    index.astro           home
    experience.astro      the CV page
    work/[...slug].astro  case study template
    404.astro
  styles/global.css       tokens, primitives, shared components, print styles
scripts/                  one-off generators, run by hand — see Generated assets
public/                   static files served as-is
```

---

## Content

Two collections, deliberately separate. Professional roles have no public repo and no live demo,
so forcing them into the project schema would leave half the fields dead. Different evidence,
different shape.

Both are validated by Zod in `src/content.config.ts`. The build fails loudly on a missing or
malformed field, which is intentional — a silently half-rendered case study is worse than a
failed build.

### Projects

Write one `.mdx` file in `src/content/projects/`. No component edits are needed. The filename
becomes the URL: `luckrate-trajectory-eval.mdx` serves at `/work/luckrate-trajectory-eval`.

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Shown on the card and as the case-study headline |
| `tagline` | yes | One line, plain language |
| `role` | yes | What you personally owned. Reviewers look for this first |
| `period` | yes | Display string, for example `"2026"` |
| `stack` | yes | Array, most relevant first. The first five show on the card |
| `problem` | yes | The hardest part, in one sentence |
| `outcomes` | no | Array of `metric` and `label`. Quantified impact, never tech names |
| `repo` | no | Renders a button. Omit it rather than point at a private 404 |
| `repoLabel` | no | Overrides the button text. Default is "View source" |
| `live` | no | Renders a button |
| `liveLabel` | no | Overrides the button text. Default is "Open live app" |
| `cover` | no | Hero image. `alt` is required inside it, not optional |
| `shots` | no | Screens gallery. Put the images in `public/shots/` |
| `featured` | no | Boolean |
| `order` | no | Sort order on the home page, default `99` |
| `draft` | no | `true` keeps it out of the build |

On `width` and `height` inside `cover` and `shots`: they are the image's intrinsic pixel size and
they reserve the box before the file loads. Leave them out and that image shifts the page as it
arrives, which Speed Insights records as CLS.

Body structure the design expects:

1. The constraint — what you were designing against
2. What I built
3. The decision I would defend, including the alternatives rejected
4. How I know it works — evidence, not assertion
5. What I would change

### Experience

One `.md` file per role in `src/content/experience/`.

| Field | Required | Notes |
| --- | --- | --- |
| `company` | yes | |
| `role` | yes | |
| `period` | yes | Display string, for example `"Mar 2026 — Present"` |
| `order` | yes | Sort key only, never rendered. Higher is more recent |
| `summary` | yes | One or two lines on the remit |
| `current` | no | Boolean, drives the accent dot on the timeline |
| `location` | no | |
| `owned` | no | Array of `label` and `detail`. The keyword has to lead |
| `platforms` | no | Flagship systems, rendered as progressive disclosure |
| `impact` | no | Array of `metric` and `label` |
| `stack` | no | Array |
| `draft` | no | |

`owned` splits into label and detail on purpose: readers take in the first two words of any line,
so the keyword leads and the prose follows. A plain sentence buries it.

---

## Identity, and the availability switch

Everything about who this is lives in `src/site.ts` — name, role, location, email, social links,
the hero blurb, the CV summary, skills, certifications, education. No component hard-codes any of
it.

Two exports are worth knowing about.

`availability` renders in three places: the home hero, the contact block, and the CV masthead.
Set it to `null` and it disappears from all three at once. That is the whole point of it being one
string — this site is linked from a LinkedIn profile and from the Portfolio link inside the CV
PDF, and it names a current employer on the same page, so the day it needs to come down it needs
to come down in one edit.

It is deliberately **not** baked into the Open Graph card. `public/og.png` is what renders
whenever anyone pastes the link into a chat or a post, which makes it the only surface that
broadcasts without a visit. Changing that is a decision, not a detail.

`cv` and `cvFilename` point at `public/cv.pdf` and name the file once it lands in someone's
Downloads folder.

---

## Generated assets

Three files in `public/` are generated rather than hand-made. All three are committed, and all
three are regenerated by hand — none of this runs at build time, because the Vercel build image
does not have the site's fonts.

| File | Regenerate with | When |
| --- | --- | --- |
| `public/og.png` | `node scripts/make-og.mjs` | The hero line, the role or the domain changes |
| `public/favicon-*.png`, `apple-touch-icon.png` | `node scripts/make-icons.mjs` | `public/favicon.svg` changes |
| `public/cv.pdf` | copy the resume export over it | Every resume update |

`scripts/verify-deps.mjs` is unrelated to the site: it parses every JS file under `node_modules`
and reports any that fail, which catches files left truncated by an interrupted `npm install`.

---

## Never commit the resume

The resume export carries a phone number. `public/cv.pdf` is served publicly and committed; the
working copy in the repo root is not, and must not be.

`.gitignore` blocks `*.pdf`, `*.docx`, `*.doc` and `resume.txt`, with a single exception for
`!public/cv.pdf`. It matches on format rather than filename because the next export will be called
something else again.

Two rules that follow from that:

- Update the published CV by copying the export **over** `public/cv.pdf`. Do not add the export
  itself under its own name — it will not be ignored if it lands outside the root, and it will not
  be published if it does.
- The commit author is `vidhyasagar-lab@users.noreply.github.com`, chosen so the real address
  stays out of public git history. Leave it alone.

---

## Design system

Tokens live at the top of `src/styles/global.css`. The light palette is defined on bare `:root`;
dark redefines only the tokens, twice — once under `prefers-color-scheme` guarded so an explicit
light choice still wins, and once under `:root[data-theme="dark"]` so the toggle wins in both
directions. No component is ever styled inside a media or `[data-theme]` block.

Rules that should not be broken:

- **Glass** (`.glass`) only ever sits on a `.mesh` backdrop. It carries an opacity floor and a
  semantic border so contrast holds regardless of what is behind it, and it solidifies under
  `prefers-reduced-transparency`.
- **Neumorphic** (`.neu`) is used on exactly one surface, the Approach cards, and always keeps a
  visible border, so the affordance never depends on shadow alone.
- **Buttons** (`.btn-primary`, `.btn-ghost`) are defined once, in `global.css`. They were
  previously copied across four files, which is how one of them ended up as the only button on the
  site under the 44px tap target. Contextual overrides stay scoped to their page.
- **Animation** is restricted to `transform` and `opacity`. Nothing animates a layout property.

Three less obvious pieces:

**Card alignment uses subgrid.** `ProjectCard` hands its six bands — role, title, tagline,
metrics, stack, footer — to the page grid, so every card in a row shares one set of row heights.
Before that they were aligned only when two projects happened to have similar-length role strings.
The `outcomes` list is therefore always rendered, even when empty, because subgrid needs a
constant child count.

**Measures are in `em`, never `ch`.** `ch` resolves against the width of the `0` glyph, so a
`max-width` in `ch` silently narrows while the webfont is still loading — the hero lede lost 34px
of width, wrapped onto an extra line, and dropped the page 31px. Both faces also carry
metric-matched fallbacks (`Bricolage Fallback`, `Manrope Fallback`) with measured `size-adjust`
values, so the fallback occupies the same space as the real font. Re-measure those numbers if
either face changes; the ratios are written down beside them.

**`/experience` prints.** There is a real `@media print` block: it drops the chrome and the glass,
forces the light palette, and forces every `<details>` open — which needs two mechanisms, because
older engines hide the children while Chrome and Safari hide `::details-content`. Without it the
platform detail silently does not print.

---

## Known gotchas

**Run one dev server.** Two Astro processes writing `.astro/` at once produce
`EPERM: operation not permitted, rename` on Windows, because the target handle is still held.
A `npm run build` alongside a running dev server is a third writer and does the same thing. If it
happens: kill every node process, delete `.astro/`, start one server.

**Frontmatter edits need a restart.** Astro caches content frontmatter in `.astro/data-store.json`
and HMR does not invalidate it. Editing the body of an `.mdx` hot-reloads fine; editing its
frontmatter does not. Restart the dev server, and delete `.astro/` if it still looks stale.

**`npm run check` does not work.** The script calls `astro check`, but `@astrojs/check` is not
installed. Either `npm i -D @astrojs/check typescript` or drop the script.

**React is installed but not registered.** `@astrojs/react` is a dependency and `tsconfig.json`
still carries the JSX config, but the integration is deliberately left out of `astro.config.mjs`:
nothing hydrates, and an unused renderer emits a ~190 kB client chunk no page references. To add an
island, register `react()` and use `client:visible`.

**Markdown table cells avoid inline emphasis.** An editor formatter in this workspace repeatedly
eats the space before constructs like `*word*` and `**word**` inside table cells, which silently
breaks the emphasis. The tables above use plain text to stay out of its way.

---

## Deploying

Push to `main`. Vercel detects the Astro preset automatically — no `vercel.json`, and Root
Directory stays empty. Every other branch gets a preview URL.

After changing anything that affects the share card, re-scrape the URL with the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/); LinkedIn caches Open Graph
data aggressively and will keep serving the old card otherwise.

> **Licence note:** Vercel's Hobby plan is non-commercial only. A job-seeking portfolio is
> explicitly permitted. Adding a rates page, a services pitch, ads or a donations button makes it
> commercial usage and requires Pro.
