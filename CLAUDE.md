# CLAUDE.md

Guidance for agents working in a Golden Grids layout study.

## What this repo is

Study 04: the Wikipedia article *Golden ratio*, as six pages of golden grids
with type fitted to each square. SEVERAL pages, not one: `index.html`,
`calculation.html`, `history.html`, `geometry.html`, `fibonacci.html`,
`world.html`, each a Vite entry (`vite.config.ts`) with its own
`src/pages/<page>.tsx`. No router: pages link with plain relative hrefs.
`src/lib/Page.tsx` is the shared shell (masthead, contents strip, colophon
with the CC BY-SA attribution). `src/lib/fit.tsx` fits type to its box.
`src/lib/boxes.tsx` holds the three box kinds. `src/diagrams/index.tsx` is
every figure. Read `docs/program/PROGRAM.md`, then `STUDY-BRIEF.md`, then
`README.md` here.

## Rules that are not negotiable

- Name the reference page. Substitute every asset. Nothing from the reference
  site — photography, wordmarks, copy — goes into the repo or the deploy.
- The library is consumed from npm at its published version. Never link a
  local checkout. A bug found here is an issue on the library, not a patch.
- Bands stack; they never nest. No wrapper component over `GoldenGrid` — the
  study exists to show the real API being used directly.
- Breakpoints live only in `src/lib/viewport.ts`. Three states, never two.
- Study tools (`src/lib/tools.tsx`) are the only floating UI. Controls go
  there, on their own stacking layer; the study's stylesheet never styles them.
  Grid outlines and band notes are off by default. The panel owns the
  viewport's top-right corner: it is fixed at
  `top: 12px; right: 12px` with `z-index: 2147483000` (`src/lib/tools.css`) —
  a collapsed tab, and a 260px-wide panel when open — and nothing the study
  draws may stack above it. A control the study puts in that corner is
  covered and cannot be clicked, however it is positioned. Put dialog and
  panel controls anywhere else; Study 02's album dialog uses a sticky bar at
  the top left, and an expanded cell's dismiss control sits at its head's
  left edge for the same reason.
- Expansion (`src/lib/expand.tsx`) is how a slot shows content it cannot hold:
  the band grows, nothing scrolls inside a box, and the covered content goes
  inert. Every photograph should be expandable — points of interaction are
  encouraged, and the picture is the affordance.
- Media fills a slot with `object-fit: cover`; per-image `object-position` is
  the escape hatch. Never reshape a band to suit an image.
- Pass one ends with the asset spec in `README.md` filled in. Do not invent
  placeholder content and call the study done.
- No CSS framework, no design system, no routing, no state library, no tests.

## This study's own rules

- The TEXT is Wikipedia's, under CC BY-SA 4.0, and that is the one
  exception to "substitute every asset": the licence permits it and the
  brief allows it. Every page's colophon carries the attribution and the
  revision link; keep both. Shorten and rearrange, do not invent facts, and
  check any claim against `captures/golden-ratio-plain.txt` before writing
  it into a box. Nothing else of Wikipedia's — design, marks, images — is
  used; the figures are drawn from the mathematics.
- The register is a professor's, not a wit's. Band lessons state the
  grid's geometry in the subject's own terms (sides 1, 1, 2, 3, 5; adjacent
  squares in ratio φ) and say whose choice a ranking is. No stamps, no
  jokes, no "doors".
- One fact per square. The fitted line is the fact; body copy, source and
  caption are supporting matter that container queries remove when the
  square is under 150×110px. Never shrink a band's range to make a square
  readable; say the square is too small.
- `Fit` sizes by binary search between 8px and 320px against the PARENT's
  content box. It must be the only child that sets the headline's size;
  do not give `.fit` a font-size in CSS.
- Every page has the same `Page` shell and the same contents strip; the
  colophon's attribution is required on all six.
- The Fibonacci page's seven-square band prints each square's side in it.
  If the range changes, the numbers must change with it.
- At 390 the Contents band keeps all six squares and turns portrait. A
  smaller `to` silently drops the last section, because extra children are
  ignored and the placeholder takes the last child.
- Left·clockwise is the orientation this study lacks; the README says so.
  Add it only to a band that has a reason for it.

Two geometry rules, verified against source, that every band relies on:

- Parity: with *n* = visible boxes (+1 for a placeholder), `right`/`left` are
  landscape only when *n* is even; `top`/`bottom` only when *n* is odd.
- Hero side: the largest box sits on the `placement` side turned *n − 2*
  quarter-turns in the spiral's direction (opposite at 4, one step at 3).

## API facts, verified against 5.0.0 source

- `GoldenGrid` props: `from` (1), `to` (4), `color`, `outline`, `clockwise`
  (true), `placement` (`"right"` | `"bottom"` | `"left"` | `"top"`), `children`.
- `GoldenBox` children map largest slot → smallest. Extra children are ignored.
- When `from > 1`, the skipped positions collapse into one placeholder slot,
  rendered first in the DOM and filled by the **last** `GoldenBox` child.
- Structural CSS is auto-injected. `GoldenBox` renders a 100%×100%
  `position: relative` div and nothing else; it accepts `className` and
  `style`. All visual styling is ours.
- Only direct `GoldenBox` children count; a wrapper component or fragment is
  dropped silently. `from={2}` skips position 1 alone:
  a 1×1 placeholder, rendered first, filled by the last child, raw base colour.
  Same rectangles as `from={1}`, different child mapping and colours. `from === to === 1`
  is `single`: one box, later children ignored.
- DOM order is placeholder first, then slots smallest to largest: the hero is
  the last element.
- There is no dial in this study, by the program's rule that the two
  studies after Netflix stay band-only.

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build → dist/
npm run preview
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`.
Base path derives from `GITHUB_REPOSITORY`; do not hard-code it.

## Sandbox constraints

The library README links this repo as its "try it without installing" path,
opened in StackBlitz at `https://stackblitz.com/~/github.com/gregoryedgerton/golden-grids-study-template`.

- **Vite stays on 7.x.** Vite 8 depends on rolldown, whose WebContainer
  binding is a wasm download fetched at first run under an experimental WASI
  runtime. It made the sandbox slow and fragile. Do not bump to 8 without
  loading the StackBlitz link afterwards and watching it reach `VITE ready`.
- `.stackblitzrc` pins install and start so the importer does not guess.
- Do not append `?file=` to the `~/github.com` link; it made the IDE fail to
  start in testing. The classic `/github/` importer accepts `?file=` but waits
  on a WebSocket and can stall at "Cloning repo from GitHub".
