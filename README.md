# Layout study 04 — Wikipedia: Golden ratio

**Live:** https://gregoryedgerton.github.io/golden-grids-study-04-wikipedia/

An unaffiliated layout study of the Wikipedia article
[Golden ratio](https://en.wikipedia.org/wiki/Golden_ratio): one long article
taken apart into six pages of golden grids, one fact per square, with type
set to the square, published under the author's own brand, GIFcommit. Built with
[Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Licence

The text is adapted from the article,
[revision 1378520549](https://en.wikipedia.org/w/index.php?title=Golden_ratio&oldid=1378520549),
by its [contributors](https://en.wikipedia.org/w/index.php?title=Golden_ratio&action=history),
under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); it is
shortened and rearranged, and the pages are offered under the same licence,
as every colophon says. This is the one study in the series that uses the
reference's text, which the brief allows because the licence does. The
seven figures are original SVG drawn from the mathematics
([`src/diagrams/index.tsx`](src/diagrams/index.tsx)). Nothing of
Wikipedia's design or marks is reproduced.

## Reference

https://en.wikipedia.org/wiki/Golden_ratio, captured signed out on
2026-10-05 at 390 / 820 / 1440 ([`captures/`](captures/), with the wikitext
and a plain extract the pages were cut from). The article is one column of
16px serif at every width: 29,989px tall at 1440, 66,232px at 390, 32
headings, 177 images of which most are rendered formulae, one type size in
the body.

| Width | Reference | Study, page I |
| --- | --- | --- |
| 390px | ![](captures/reference-390.png) | ![](captures/study-index-390.png) |
| 820px | ![](captures/reference-820.png) | ![](captures/study-index-820.png) |
| 1440px | ![](captures/reference-1440.png) | ![](captures/study-index-1440.png) |

The other pages are captured as `study-<page>-<width>.png`, with dark
captures beside them.

## Approach

The reference is one long column of prose with headings, formulas and a few figures. The study divides the lead and five sections (Calculation, History, Geometry, the Fibonacci relationship, Applications with Disputed observations) into six pages and sets each fact in a square with its type fitted to the square. The proofs, the minimal polynomial, the conjugate, Penrose tilings and the solids are not rebuilt.

## Pages and bands

Six HTML files, no router; plain relative links, a contents strip and
previous/next on every page. Squares are given in units of each band's unit
square.

| Page | Band | Range · placement · clockwise | Squares | What it holds |
| --- | --- | --- | --- | --- |
| I Golden ratio | The number | 1–4 · right · cw (1–3 bottom at 390) | 3, 2, 1, 1 | Definition in the hero; the line figure; the names; the identity |
| | Representations | 1–3 · bottom · ccw | 2, 1, 1 | Decimal, algebraic form, continued fraction |
| | Contents | 2–6 · left · ccw (top at 390) | placeholder 1; 1, 2, 3, 5, 8 | Links to the five section pages; the placeholder carries the letter φ |
| | The golden rectangle | 1–1 · single | 1 | The figure, capped at 48rem |
| II Calculation | From the definition to the number | 1–5 · top · ccw (left at 390) | 5, 3, 2, 1, 1 | Result in the hero; four numbered steps |
| | The two roots | 1–2 · right | 1, 1 | Two roots of equal standing |
| III History | Who studied it, and when | 1–6 · right · cw (1–5 left at 390) | 8, 5, 3, 2, 1, 1 | Euclid to Penrose |
| | How the section opens | 1–3 · top · cw | 2, 1, 1 | Livio's quotation; author; source |
| IV Geometry | The golden rectangle | 1–4 · left · ccw (1–3 top at 390) | 3, 2, 1, 1 | Figure 1 and three facts |
| | Pentagon and pentagram | 1–5 · bottom · cw (right at 390) | 5, 3, 2, 1, 1 | Figure 2 and four values of φ |
| | The Kepler triangle | 1–3 · top · ccw | 2, 1, 1 | Figure 3 and two angles |
| | The golden angle | 1–4 · right · ccw (1–3 bottom at 390) | 3, 2, 1, 1 | Figures 4 and 5, the angle, phyllotaxis |
| V Fibonacci | The sequence | 1–7 · bottom · cw (right at 390) | 13, 8, 5, 3, 2, 1, 1 | The numbers are the sides |
| | Successive ratios | 1–2 · left | 1, 1 | Figure 6 and the limit |
| | The slowest fraction | 1–3 · top · cw | 2, 1, 1 | Figure 7, nested radicals, Binet |
| VI In the world | Built on the ratio, by intent | 1–6 · left · ccw (1–5 top at 390) | 8, 5, 3, 2, 1, 1 | Le Corbusier to the Fibonacci lattice |
| | Claimed, and not supported | 1–5 · top · cw (right at 390) | 5, 3, 2, 1, 1 | Parthenon, pyramid, nautilus, Gutenberg, canvases |


Seven of the eight orientations appear; left·clockwise does not.
Breakpoints live in [`src/lib/viewport.ts`](src/lib/viewport.ts); the boxes
use container queries, so a unit square behaves the same at every width.

## How it works

- **Type fits its square.** [`src/lib/fit.tsx`](src/lib/fit.tsx) sizes each
  headline, number and quotation by binary search against a definite box,
  between 8px and 320px, re-running on resize and when the fonts arrive.
  Body copy is sized by container query and removed whole in a short
  square; labels wrap; formulae break only where written; a line that does
  not read aloud as written carries a spoken form for screen readers.
  Display type is held until Fraunces and Archivo Narrow have loaded so it
  does not flash.
- **Depth in flow.** Sixteen squares expand to the article's passage at
  reading measure, each ending with where the fact continues on other
  pages; § marks on squares link to the band they continue in
  ([`src/lib/expand.tsx`](src/lib/expand.tsx), [`src/lib/boxes.tsx`](src/lib/boxes.tsx)).
- **Register.** Old print advertising, not the encyclopaedia: cream stock,
  one black, one red, Fraunces for display and text, Archivo Narrow for
  labels, thick-and-thin rules. Dark follows the device: the two inks
  exchanged, the red lifted as text and kept deep as a ground.
- **Checks.** `captures/scan.cjs`-equivalent runs are clean in Chrome and
  WebKit at 390, 820 and 1440 in both schemes: nothing overflows its square,
  no fitted line under 12px, no axe-core violations; the skip link is first
  in the tab order; every More control and section link has a distinct
  name; targets are at least 24px; no horizontal scroll at 320px. The
  reduced-motion rule is `transition: none`, which matters because the fit
  measures synchronously after each write; the 0.01ms trick collapsed the
  type under iOS Reduce Motion.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict. Whether the layout suits the page is assessed separately, after every study has been reviewed.

- **Derivations.** The calculation page sets step 1 in a unit square and the result in a square of side 5; the order of the steps is carried by their labels.
- **Smallest squares.** 105px at 1440 in a six-square band and 46px at 390; they hold a word or a number.
- **Coverage.** About half the article is rebuilt; the proofs are not.
- **Orientations.** Seven of the eight placement and direction pairs are used; left with clockwise is not.
- **Readers.** It has not been read by a test reader or tried with a screen-reader user.

## Disclosure

Every page says what it is in three places, all read from
[`src/study.json`](src/study.json): its title and description, a sticky notice
at the top, and a disclosure at the very end listing the pages reviewed, what
is real, what is invented or changed, and where each kind of asset came from.

## Study tools

A floating panel (top right) toggles grid outlines (`g`), band notes (`n`,
which carry each band's range and placement) and reduced motion (`m`,
inherited; nothing here animates).

## Running and deploying

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds all six pages to `dist/`; pushing to
`main` deploys to GitHub Pages. The library is consumed from npm at its
published version.
