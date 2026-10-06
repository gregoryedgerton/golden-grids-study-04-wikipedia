import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { mount } from "../main";
import { Page } from "../lib/Page";
import { Band } from "../bands/Band";
import { Fact } from "../lib/boxes";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";

/**
 * Page VI — Applications and disputed observations. The article keeps
 * these in two sections and so does this page: what was deliberately
 * built on the ratio, then what has only been claimed about it. The grid
 * ranks the documented uses by how much the article has to say; the
 * disputed claims are ranked by how widely they are repeated, which is
 * the order in which a reader is likely to have met them.
 */
function Applications() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [5, "top"],
    tablet: [6, "left"],
    desktop: [6, "left"],
  });
  return (
    <Band
      id="applications"
      title="Built on the ratio, by intent"
      lesson="Le Corbusier centred his design philosophy on systems of harmony and proportion and built the golden ratio explicitly into his Modulor; his 1927 Villa Stein at Garches approximates golden rectangles in plan, elevation and structure. Salvador Dalí, influenced by Matila Ghyka, made the canvas of The Sacrament of the Last Supper a golden rectangle. Jan Tschichold records that many books made between 1550 and 1770 show the golden section in their page proportions to within half a millimetre. Debussy's La Mer has its formal boundaries at the golden section, though no written evidence shows he sought them. The golden ratio is about 833 cents as a musical interval, and the golden angle spaces points evenly on a sphere in the Fibonacci lattice."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=false · hero left`}
      kind="rule"
    >
      <GoldenGrid from={1} to={to} placement={placement} clockwise={false} outline="1px solid var(--rule)">
        <GoldenBox {...x.boxProps("corb")}>
          <Fact
            label="Architecture · Le Corbusier, 1940s"
            body={<p>The Modulor: a scale of architectural proportion built on the golden ratio, Fibonacci numbers and the measurements of a human body sectioned at the navel, knees and throat.</p>}
            source="Architecture"
            expand={{
              group: x, slotKey: "corb", title: "The Modulor",
              full: (
                <>
                  <p>Le Corbusier explicitly used the golden ratio in his Modulor system for the scale of architectural proportion. He saw this system as a continuation of the long tradition of Vitruvius, Leonardo da Vinci's "Vitruvian Man", the work of Leon Battista Alberti, and others who used the proportions of the human body to improve the appearance and function of architecture.</p>
                  <p>In addition to the golden ratio, Le Corbusier based the system on human measurements, Fibonacci numbers, and the double unit. He sectioned his model human body's height at the navel with the two sections in golden ratio, then subdivided those sections in golden ratio at the knees and throat. His 1927 Villa Stein in Garches exemplified the system's application: the villa's rectangular ground plan, elevation, and inner structure closely approximate golden rectangles.</p>
                </>
              ),
              source: "Adapted from the section Architecture.",
              related: [
                { href: "./history.html#chronology", label: "Pacioli, whom Le Corbusier continued" },
                { href: "./geometry.html#rectangle", label: "The golden rectangle" },
              ],
            }}
          >
            The Modulor
          </Fact>
        </GoldenBox>
        <GoldenBox {...x.boxProps("dali")}>
          <Fact label="Painting · Salvador Dalí, 1955" tone="deep" body={<p><i>The Sacrament of the Last Supper</i>: the canvas is a golden rectangle and a dodecahedron, in perspective, dominates the composition.</p>} source="Art"
            expand={{
              group: x, slotKey: "dali", title: "Art",
              full: (
                <>
                  <p>Leonardo da Vinci's illustrations of polyhedra in Pacioli's <i>Divina proportione</i> have led some to speculate that he incorporated the golden ratio in his paintings. But the suggestion that his <i>Mona Lisa</i>, for example, employs golden ratio proportions, is not supported by Leonardo's own writings. Similarly, although Leonardo's <i>Vitruvian Man</i> is often shown in connection with the golden ratio, the proportions of the figure do not actually match it, and the text only mentions whole number ratios.</p>
                  <p>Salvador Dalí, influenced by the works of Matila Ghyka, explicitly used the golden ratio in his masterpiece, <i>The Sacrament of the Last Supper</i>. The dimensions of the canvas are a golden rectangle. A huge dodecahedron, in perspective so that edges appear in golden ratio to one another, is suspended above and behind Jesus and dominates the composition.</p>
                </>
              ),
              source: "Adapted from the section Art.",
              related: [{ href: "./world.html#disputed", label: "The claims that did not hold" }],
            }}
          >A golden canvas</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Books · Jan Tschichold" tone="red" body={<p>Many books made between 1550 and 1770 show page proportions of 2 : 3, 1 : √3 and the golden section, to within half a millimetre.</p>}>1550–1770</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Music · Debussy" body={<p>Roy Howat finds the formal boundaries of <i>La Mer</i> at the golden section; no written evidence shows intent.</p>}>La Mer</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Music · 833 cents" tone="deep" fitClass="fit--num">833.09</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Optimisation" fitClass="fit--num" link={{ href: "./geometry.html#angle", label: "§ IV" }}>137.5°</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

function Disputed() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [5, "right"],
    tablet: [5, "top"],
    desktop: [5, "top"],
  });
  return (
    <Band
      id="disputed"
      title="Claimed, and not supported"
      lesson="The Parthenon's façade is said by some to be circumscribed by golden rectangles; measurements of 15 temples, 18 tombs, 8 sarcophagi and 58 grave stelae found the ratio totally absent from Greek architecture of the fifth century BC. The Great Pyramid's proportions are not based on it, by the consensus of modern scholars. Nautilus shells grow in a logarithmic spiral that measurement does not connect to φ. The Gutenberg Bible's pages, said to be golden, measure 1.45. A 1999 study of 565 paintings found a mean canvas ratio of 1.34. And psychologists' tests of whether people prefer golden rectangles, begun by Fechner around 1876, have been at best inconclusive."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=true · hero ${viewport === "mobile" ? "top" : "left"}`}
    >
      <GoldenGrid from={1} to={to} placement={placement}>
        <GoldenBox {...x.boxProps("parth")}>
          <Fact
            label="Claim · the Parthenon's façade is a golden rectangle"
            tone="ink"
            fitClass="fit--italic"
            body={<p>Keith Devlin: the assertion "is not supported by actual measurements. In fact, the entire story about the Greeks and golden ratio seems to be without foundation."</p>}
            source="The Parthenon"
            expand={{
              group: x, slotKey: "parth", title: "The Parthenon",
              full: (
                <>
                  <p>The Parthenon's façade (c. 432 BC), as well as elements of its façade and elsewhere, are said by some to be circumscribed by golden rectangles. Other scholars deny that the Greeks had any aesthetic association with the golden ratio.</p>
                  <p>From measurements of 15 temples, 18 monumental tombs, 8 sarcophagi, and 58 grave stelae from the fifth century BC to the second century AD, one researcher concluded that the golden ratio was totally absent from Greek architecture of the classical fifth century BC, and almost absent during the following six centuries. Later sources like Vitruvius (first century BC) exclusively discuss proportions that can be expressed in whole numbers.</p>
                </>
              ),
              source: "Adapted from the section The Parthenon.",
              related: [{ href: "./history.html#chronology", label: "What the Greeks did study" }],
            }}
          >
            {"Absent from the Greek architecture of the fifth century BC."}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Claim · the Great Pyramid is two Kepler triangles" tone="deep" body={<p>Modern scholars' consensus: not based on the golden ratio; inconsistent with Egyptian mathematics of the period.</p>} link={{ href: "./geometry.html#kepler", label: "§ IV" }}>Not φ</Fact>
        </GoldenBox>
        <GoldenBox {...x.boxProps("naut")}>
          <Fact label="Claim · the nautilus shell" tone="red" body={<p>A logarithmic spiral, but measurements do not support the golden ratio.</p>}
            expand={{
              group: x, slotKey: "naut", title: "Disputed observations",
              full: (
                <>
                  <p>The shells of mollusks such as the nautilus are often claimed to be in the golden ratio. The growth of nautilus shells follows a logarithmic spiral, and it is sometimes erroneously claimed that any logarithmic spiral is related to the golden ratio, or sometimes claimed that each new chamber is golden-proportioned relative to the previous one. However, measurements of nautilus shells do not support this claim.</p>
                  <p>Specific proportions in the bodies of vertebrates, including humans, are often claimed to be in the golden ratio; there is a large variation in the real measures, and the proportion in question is often significantly different from the golden ratio. Studies by psychologists, starting with Gustav Fechner c. 1876, have tested the idea that the golden ratio plays a role in human perception of beauty; later attempts to carefully test such a hypothesis have been, at best, inconclusive.</p>
                </>
              ),
              source: "Adapted from the section Disputed observations.",
              related: [{ href: "./geometry.html#rectangle", label: "What the golden spiral actually is" }],
            }}
          >Logarithmic, not golden</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Claim · the Gutenberg Bible page" fitClass="fit--num" source="measured ratio">1.45</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Claim · 565 canvases" fitClass="fit--num" source="mean ratio, 1999 study">1.34</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

mount(
  <Page
    current="world.html"
    kicker="Wikipedia · Golden ratio · § Applications and observations · § Disputed observations"
    title="In the world"
    standfirst="Some twentieth-century artists and architects, including Le Corbusier and Salvador Dalí, proportioned their works to approximate the golden ratio, believing it aesthetically pleasing. The ratio has also been used to analyse the proportions of buildings, shells, bodies and paintings, in many cases on dubious fits to data; the measurements, where they have been made, mostly do not support the claims."
  >
    <Applications />
    <Disputed />
  </Page>
);
