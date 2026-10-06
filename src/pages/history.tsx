import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { mount } from "../main";
import { Page } from "../lib/Page";
import { Band } from "../bands/Band";
import { Fact } from "../lib/boxes";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";

/**
 * Page III — History. The section is a chronology in prose. A chronology
 * has an order but no ranking; the grid is given one anyway, so the choice
 * of who takes the largest square is an editorial claim and is stated as
 * one: Euclid, because the article's own first definition is his.
 */
function Chronology() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [5, "left"],
    tablet: [6, "right"],
    desktop: [6, "right"],
  });
  return (
    <Band
      id="chronology"
      title="Who studied it, and when"
      lesson="Ancient Greek mathematicians first studied the golden ratio because of its frequent appearance in geometry: the division of a line in extreme and mean ratio matters in the geometry of regular pentagrams and pentagons. According to one story, Hippasus discovered in the fifth century BC that the ratio was neither a whole number nor a fraction, surprising the Pythagoreans. Euclid's Elements gives its first known definition. It was studied peripherally over the next millennium, named divine by Pacioli in 1509, tied to the Fibonacci numbers by Simon Jacob and Kepler, given its modern name in 1789 and its symbol in 1910, and found in the Penrose tilings of the 1970s."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=true · ${viewport === "mobile" ? "portrait" : "landscape 13:8"}`}
      kind="rule"
    >
      <GoldenGrid from={1} to={to} placement={placement} outline="1px solid var(--rule)">
        <GoldenBox {...x.boxProps("euclid")}>
          <Fact
            label="c. 300 BC · Euclid, Elements"
            fitClass="fit--italic"
            body={<p>The first known definition of the golden ratio, as the division of a line in "extreme and mean ratio".</p>}
            source="History"
            expand={{
              group: x, slotKey: "euclid", title: "Euclid's definition",
              full: (
                <>
                  <p>Ancient Greek mathematicians first studied the golden ratio because of its frequent appearance in geometry; the division of a line into "extreme and mean ratio" (the golden section) is important in the geometry of regular pentagrams and pentagons.</p>
                  <p>According to one story, the 5th-century BC mathematician Hippasus discovered that the golden ratio was neither a whole number nor a fraction (it is irrational), surprising Pythagoreans.</p>
                  <p>Euclid's <i>Elements</i> (c. 300 BC) provides several propositions and their proofs employing the golden ratio, and contains its first known definition:</p>
                  <blockquote>A straight line is said to have been cut in extreme and mean ratio when, as the whole line is to the greater segment, so is the greater to the lesser.</blockquote>
                </>
              ),
              source: "Adapted from the section History.",
              related: [
                { href: "./geometry.html#pentagon", label: "Why the Greeks met it: the pentagon" },
                { href: "./world.html#disputed", label: "What the Greeks did not do with it" },
              ],
            }}
          >
            {"As the whole line is to the greater segment, so is the greater to the lesser."}
          </Fact>
        </GoldenBox>
        <GoldenBox {...x.boxProps("pacioli")}>
          <Fact label="1509 · Luca Pacioli" tone="deep" body={<p>Pacioli named his book after the ratio; it explored its properties, including its appearance in some of the Platonic solids. Leonardo da Vinci, who illustrated it, called the ratio the <i>sectio aurea</i>.</p>} source="History"
            expand={{
              group: x, slotKey: "pacioli", title: "Divina proportione",
              full: (
                <>
                  <p>The golden ratio was studied peripherally over the next millennium. Abu Kamil (c. 850–930) employed it in his geometric calculations of pentagons and decagons; his writings influenced that of Fibonacci (Leonardo of Pisa) (c. 1170–1250), who used the ratio in related geometry problems but did not observe that it was connected to the Fibonacci numbers.</p>
                  <p>Luca Pacioli named his book <i>Divina proportione</i> (1509) after the ratio; the book, largely plagiarized from Piero della Francesca, explored its properties including its appearance in some of the Platonic solids. Leonardo da Vinci, who illustrated Pacioli's book, called the ratio the <i>sectio aurea</i>. Though it is often said that Pacioli advocated the golden ratio's application to yield pleasing, harmonious proportions, Livio points out that the interpretation has been traced to an error in 1799, and that Pacioli actually advocated the Vitruvian system of rational proportions.</p>
                </>
              ),
              source: "Adapted from the section History.",
              related: [{ href: "./world.html#applications", label: "Where the ratio was used by intent" }],
            }}
          >
            Divina proportione
          </Fact>
        </GoldenBox>
        <GoldenBox {...x.boxProps("kepler")}>
          <Fact label="c. 1608 · Johannes Kepler" tone="red" body={<p>Rediscovered that consecutive Fibonacci numbers converge on the golden ratio, first noted by Simon Jacob, and called the ratio one of geometry's two great treasures, with the theorem of Pythagoras.</p>}
            expand={{
              group: x, slotKey: "kepler", title: "Kepler and the two treasures",
              full: (
                <>
                  <p>German mathematician Simon Jacob (d. 1564) noted that ratios of consecutive Fibonacci numbers converge to the golden ratio; this was rediscovered by Johannes Kepler in 1608. The first known decimal approximation of the inverse golden ratio was stated as "about 0.6180340" in 1597 by Michael Maestlin of the University of Tübingen in a letter to Kepler, his former student. The same year, Kepler wrote to Maestlin of the Kepler triangle, which combines the golden ratio with the Pythagorean theorem. Kepler said of these:</p>
                  <blockquote>Geometry has two great treasures: one is the theorem of Pythagoras, the other the division of a line into extreme and mean ratio. The first we may compare to a mass of gold, the second we may call a precious jewel.</blockquote>
                </>
              ),
              source: "Adapted from the section History.",
              related: [
                { href: "./fibonacci.html#convergence", label: "The convergence, charted" },
                { href: "./geometry.html#kepler", label: "The Kepler triangle" },
              ],
            }}
          >
            {"A precious\njewel"}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="1789 · J. S. T. Gehler" body={<p>The earliest known use of the term <i>golden section</i>, as "güldnen Schnitt", in his dictionary of physical sciences. The English term follows in 1875.</p>}>Güldner Schnitt</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="1910 · Mark Barr" tone="deep" fitClass="fit--num">φ</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="1973–74 · Roger Penrose" tone="red" link={{ href: "./geometry.html#pentagon", label: "§ IV" }}>Penrose tiling</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

/** A quotation and its attribution: the largest square for the words, the
 *  two unit squares for who said them and where. */
function Quotation() {
  return (
    <Band
      id="quotation"
      title="How the section opens"
      lesson="The article opens its history with the astrophysicist Mario Livio: some of the greatest mathematical minds of all ages, from Pythagoras and Euclid in ancient Greece, through the medieval Italian mathematician Leonardo of Pisa and the Renaissance astronomer Johannes Kepler, to present-day scientific figures such as Oxford physicist Roger Penrose, have spent endless hours over this simple ratio and its properties; biologists, artists, musicians, historians, architects, psychologists and even mystics have pondered and debated the basis of its ubiquity and appeal."
      note='from=1 to=3 · placement="top" · clockwise=true · hero right · 3:2'
      cap="60rem"
    >
      <GoldenGrid from={1} to={3} placement="top">
        <GoldenBox>
          <Fact label="Mario Livio" fitClass="fit--italic" tone="ink">
            {"It is probably fair to say that the Golden Ratio has inspired thinkers of all disciplines like no other number in the history of mathematics."}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Author" tone="deep">Astrophysicist</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Source" tone="deep" fitClass="fit--italic">{"The Golden Ratio, 2002"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

mount(
  <Page
    current="history.html"
    kicker="Wikipedia · Golden ratio · § History"
    title="History"
    standfirst="The golden ratio was defined by Euclid around 300 BC, used by Abu Kamil and Fibonacci in the geometry of pentagons, named the divine proportion by Luca Pacioli in 1509, connected to the Fibonacci numbers by Simon Jacob and Johannes Kepler, called the golden section in 1789, given the letter φ by Mark Barr around 1910, and found again in Roger Penrose's tilings in the 1970s."
  >
    <Chronology />
    <Quotation />
  </Page>
);
