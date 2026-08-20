# Portfolio

> ### ⚠️ Work in progress — the case studies are placeholders
>
> The three projects in `src/content/projects/` are **sample content written to exercise the
> layout**. The metrics, repository links and claims in them are **invented** and describe no real
> work. They exist so the design can be judged at realistic content length, and will be replaced
> with real projects before launch. Please don't read them as claims about anyone's experience.

Astro 5 · Tailwind v4 · deployed to Vercel.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
```

## Adding or changing a project

Write one `.mdx` file in `src/content/projects/`. No component edits. The filename becomes the
URL (`retrieval-eval-harness.mdx` → `/work/retrieval-eval-harness`).

Frontmatter fields are validated by the schema in `src/content.config.ts` — the build fails loudly
if one is missing or malformed, which is deliberate.

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `tagline` | yes | One line, plain language |
| `role` | yes | What *you* owned — reviewers look for this first |
| `period` | yes | e.g. `"2025"` |
| `stack` | yes | Array, most relevant first; first 5 show on the card |
| `problem` | yes | The hardest part, one sentence |
| `repo` / `live` | no | Both render as buttons. **Aim to always have `live`.** |
| `outcomes` | no | `{ metric, label }` — quantified impact, not tech names |
| `shots` | no | `{ src, caption }` — put images in `public/shots/` |
| `order` | no | Sort order on the homepage (default 99) |
| `draft` | no | `true` hides it from build output |

Body structure that the design expects (and that the research says reviewers want):

1. **The constraint** — what you were designing against
2. **What I built**
3. **The decision I'd defend** — with the alternatives you rejected
4. **How I know it works** — evidence, not assertion
5. **What I'd change**

## Identity

All name/contact/social values live in `src/site.ts`. Placeholders are marked `TODO`.

## Design system notes

Tokens are in `src/styles/global.css`. Two rules that must not be broken:

- **Glass** (`.glass`) only ever sits on a `.mesh` backdrop. It carries an opacity floor and a
  semantic border so contrast holds regardless of what's behind it, and it solidifies under
  `prefers-reduced-transparency`.
- **Neumorphic** (`.neu`) is used on exactly one surface (the Approach cards) and always keeps a
  visible border, so the affordance never depends on shadow alone.

Animation is restricted to `transform` and `opacity`. Nothing animates a layout property.

## Deploying

Push to GitHub, import the repo in Vercel — the Astro preset is detected automatically, no
`vercel.json` needed. `main` → production, every branch → a preview URL.

> **Licence note:** Vercel's free Hobby plan is non-commercial only. A job-seeking portfolio is
> explicitly permitted. Adding a rates page, a services pitch, ads, or a donations button makes it
> commercial usage and requires Pro ($20/mo).
