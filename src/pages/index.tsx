import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { mount } from "../main";
import { Page } from "../lib/Page";
import { Band } from "../bands/Band";
import { Fact, Figure, LinkBox } from "../lib/boxes";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";
import { Segment, GoldenRectangle } from "../diagrams";

/**
 * Page I — the lead. The reference's lead is five paragraphs beside an
 * infobox. Here the same facts are one hero box and a descent of supporting
 * boxes, then the article's contents as a grid whose squares follow the
 * Fibonacci sequence.
 */
function Lead() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [3, "bottom"],
    tablet: [4, "right"],
    desktop: [4, "right"],
  });
  return (
    <Band
      id="lead"
      title="The number"
      lesson="Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two. The constant satisfies φ² = φ + 1 and is irrational, with a value of (1 + √5) / 2 = 1.618033988749…. Euclid called it the extreme and mean ratio; Luca Pacioli called it the divine proportion."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=true · hero left`}
      kind="rule"
    >
      <GoldenGrid from={1} to={to} placement={placement} outline="1px solid var(--rule)">
        <GoldenBox {...x.boxProps("def")}>
          <Fact
            label="Golden ratio · φ"
            fitClass="fit--num"
            body={<p>Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two.</p>}
            source="Lead paragraph"
            expand={{
              group: x, slotKey: "def", title: "Definition",
              full: (
                <>
                  <p>In mathematics, two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. For quantities <i>a</i> and <i>b</i> with <i>a</i> &gt; <i>b</i> &gt; 0, <i>a</i> is in a golden ratio to <i>b</i> if (<i>a</i> + <i>b</i>) / <i>a</i> = <i>a</i> / <i>b</i> = φ, where the Greek letter phi denotes the golden ratio.</p>
                  <p>The constant φ satisfies the quadratic equation φ² = φ + 1 and is an irrational number with a value of (1 + √5) / 2 = 1.618033988749…</p>
                  <p>The golden ratio was called the <i>extreme and mean ratio</i> by Euclid, and the <i>divine proportion</i> by Luca Pacioli; it also goes by other names.</p>
                </>
              ),
              source: "Adapted from the article's lead.",
              related: [
                { href: "./calculation.html#derivation", label: "How the number is derived" },
                { href: "./geometry.html#rectangle", label: "The golden rectangle" },
              ],
            }}
          >
            1.618…
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Figure label="In one line" caption="The whole is to the longer part as the longer part is to the shorter.">
            <Segment />
          </Figure>
        </GoldenBox>
        <GoldenBox {...x.boxProps("names")}>
          <Fact label="Also called" tone="red" fitClass="fit--italic" source="Euclid · Pacioli"
            expand={{
              group: x, slotKey: "names", title: "The names of the ratio",
              full: (
                <>
                  <p>Euclid's <i>Elements</i> (c. 300 BC) defines the division of a line "in extreme and mean ratio"; the golden section is the same division. Luca Pacioli named his book <i>Divina proportione</i> (1509) after the ratio, and saw Catholic religious significance in it, which led to his work's title. Leonardo da Vinci, who illustrated the book, called the ratio the <i>sectio aurea</i>, the golden section.</p>
                  <p>Though it is often said that Pacioli advocated the golden ratio's application to yield pleasing proportions, Livio points out that the interpretation has been traced to an error in 1799, and that Pacioli actually advocated the Vitruvian system of rational proportions.</p>
                </>
              ),
              source: "Adapted from the lead and the section History.",
              related: [{ href: "./history.html#chronology", label: "Who studied it, and when" }],
            }}
          >
            {"Extreme and\nmean ratio;\ndivine proportion"}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Satisfies" fitClass="fit--num" link={{ href: "./calculation.html#derivation", label: "§ II" }} spoken="phi squared equals phi plus one">{"φ² =\nφ + 1"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

/** The infobox, as a band of three. `bottom` counter-clockwise: the hero
 *  lands on the left. */
function Infobox() {
  const viewport = useViewport();
  return (
    <Band
      id="representations"
      title="Representations"
      lesson="The same number three ways: as a decimal that never repeats, as the algebraic expression (1 + √5) / 2, and as the continued fraction of all ones, [1; 1, 1, 1, …], whose convergents are the ratios of successive Fibonacci numbers."
      note='from=1 to=3 · placement="bottom" · clockwise=false · hero right · 3:2'
      cap={viewport === "desktop" ? "60rem" : undefined}
    >
      <GoldenGrid from={1} to={3} placement="bottom" clockwise={false}>
        <GoldenBox>
          <Fact label="Decimal" tone="ink" fitClass="fit--num" source="OEIS A001622" spoken="1.61803398874989484820 and so on">
            {"1.6180339887\n4989484820…"}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Algebraic form" tone="deep" fitClass="fit--num" link={{ href: "./calculation.html#roots", label: "§ II" }} spoken="one plus the square root of five, over two">{"(1 + √5)\n/ 2"}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Continued fraction" tone="deep" fitClass="fit--num" link={{ href: "./fibonacci.html#fraction", label: "§ V" }} spoken="one; one, one, one, and so on">{"[1; 1,\n1, 1, …]"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

/** The contents. `from={2}` collapses position 1 of the sequence into a
 *  placeholder square, filled by the LAST child: the letter φ. */
function Contents() {
  const viewport = useViewport();
  // Six squares at every width: with fewer, the last section would be
  // dropped, since extra children are ignored and the placeholder takes the
  // last child. At 390 the band turns portrait (top placement, even count).
  const to = 6;
  const placement = pick<PlacementValue>(viewport, { mobile: "top", tablet: "left", desktop: "left" });
  return (
    <Band
      id="contents"
      title="Contents"
      lesson="Mathematicians have studied the golden ratio's properties since antiquity. It is the ratio of a regular pentagon's diagonal to its side and so appears in the dodecahedron and icosahedron; it is the limit of the ratios of Fibonacci numbers; it has been used to analyse the proportions of natural objects and artificial systems, in some cases on dubious fits to data; and some twentieth-century artists and architects proportioned their work to it. The five sections that follow take these in turn."
      note={`from=2 to=${to} · placement="${placement}" · clockwise=false · placeholder filled by the last child`}
      kind="rule"
    >
      <GoldenGrid from={2} to={to} placement={placement} clockwise={false} outline="1px solid var(--rule)">
        <GoldenBox><LinkBox label="II · Calculation" href="./calculation.html">Deriving φ from its definition</LinkBox></GoldenBox>
        <GoldenBox><LinkBox label="IV · Geometry" href="./geometry.html" tone="deep">Rectangle, pentagon, triangle, angle</LinkBox></GoldenBox>
        <GoldenBox><LinkBox label="III · History" href="./history.html">From Euclid to Penrose</LinkBox></GoldenBox>
        <GoldenBox><LinkBox label="V · Fibonacci" href="./fibonacci.html" tone="deep">Successive ratios converge on φ</LinkBox></GoldenBox>
        <GoldenBox><LinkBox label="VI · In the world" href="./world.html">Uses and claims</LinkBox></GoldenBox>
        <GoldenBox><Fact label="Phi" tone="red" fitClass="fit--num">φ</Fact></GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

function Rectangle() {
  return (
    <Band
      id="rectangle"
      title="The golden rectangle"
      lesson="A golden rectangle, a rectangle with an aspect ratio of φ, may be cut into a square and a smaller rectangle with the same aspect ratio, and that one cut again without end. Quarter circles drawn through the squares approximate the golden spiral, a logarithmic spiral whose radius grows by φ every quarter-turn."
      note='from=1 to=1 · single'
      cap="48rem"
    >
      <GoldenGrid from={1} to={1}>
        <GoldenBox>
          <Figure caption="Removing a square from a golden rectangle leaves a golden rectangle. The quarter circles approximate the golden spiral; the exact spiral is r = φ^(2θ/π) in polar coordinates. Continued in § IV, Geometry.">
            <GoldenRectangle />
          </Figure>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

mount(
  <Page
    current="index.html"
    kicker="Wikipedia · Golden ratio"
    title="Golden ratio"
    standfirst="In mathematics, two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. The Greek letter φ denotes it. It has been studied since Euclid, named divine by Pacioli, found in the pentagon, the Fibonacci numbers and the arrangement of leaves, and claimed, often wrongly, in art, architecture and nature."
  >
    <Lead />
    <Infobox />
    <Contents />
    <Rectangle />
  </Page>
);
