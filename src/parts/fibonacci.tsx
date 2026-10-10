import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { Part } from "../lib/Page";
import { Band } from "../bands/Band";
import { Fact, Figure } from "../lib/boxes";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";
import { RatioChart, ContinuedFraction } from "../diagrams";

/**
 * Part V — the Fibonacci numbers. This is the one page where the grid is
 * not a metaphor for its content but the content itself: the library lays
 * out squares whose sides are consecutive Fibonacci numbers, so a band of
 * seven squares IS the sequence 1, 1, 2, 3, 5, 8, 13, and the numbers
 * printed in the squares are their own side lengths.
 */
const FIB = [13, 8, 5, 3, 2, 1, 1];

function Sequence() {
  const viewport = useViewport();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [7, "right"],
    tablet: [7, "bottom"],
    desktop: [7, "bottom"],
  });
  return (
    <Band
      id="sequence"
      title="The sequence"
      lesson="In the Fibonacci sequence each term is the sum of the preceding two, starting from 0 and 1: 0, 1, 1, 2, 3, 5, 8, 13, 21, …. The sequence is named for Leonardo of Pisa, called Fibonacci, who used the ratio in geometry problems around 1200 without observing its connection to these numbers; that connection was noted by Simon Jacob in the sixteenth century and by Kepler in 1608."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=true · 21:13 ${viewport === "mobile" ? "turned portrait" : ""}`}
      kind="rule"
    >
      <GoldenGrid from={1} to={to} placement={placement} outline="1px solid var(--rule)">
        {FIB.map((n, i) => (
          <GoldenBox key={i}>
            <Fact label={i === 0 ? "F₇ · side 13" : undefined} fitClass="fit--num" tone={i % 2 ? "deep" : "paper"}>{String(n)}</Fact>
          </GoldenBox>
        ))}
      </GoldenGrid>
    </Band>
  );
}

function Convergence() {
  const x = useExpandGroup();
  return (
    <Band
      id="convergence"
      title="Successive ratios"
      lesson="The golden ratio is the limit of the ratios of successive terms in the Fibonacci sequence and in the Lucas sequence, 2, 1, 3, 4, 7, 11, …: if a Fibonacci or Lucas number is divided by its immediate predecessor, the quotient approximates φ. These approximations are alternately lower and higher than φ, and converge to it as the numbers increase. For example F₁₆ / F₁₅ = 987 / 610 = 1.6180327…."
      note='from=1 to=2 · placement="left" · 2:1'
    >
      <GoldenGrid from={1} to={2} placement="left">
        <GoldenBox>
          <Figure label="Figure 6" caption="F(n+1) / F(n) for n = 1 … 13. Kepler showed in 1608 that the limit is φ.">
            <RatioChart />
          </Figure>
        </GoldenBox>
        <GoldenBox {...x.boxProps("limit")}>
          <Fact label="Limit" tone="ink" fitClass="fit--num" body={<p>The same limit holds for the Lucas numbers, 2, 1, 3, 4, 7, 11, …, which obey the same rule from a different start.</p>} source="Relationship to Fibonacci and Lucas numbers"
            expand={{
              group: x, slotKey: "limit", title: "Fibonacci and Lucas numbers",
              full: (
                <>
                  <p>In the Fibonacci sequence each term is the sum of the preceding two, starting from 0 and 1. The Lucas numbers obey the same rule but start from 2 and 1. Exceptionally, the golden ratio is equal to the limit of the ratios of successive terms in both sequences: if a Fibonacci or Lucas number is divided by its immediate predecessor, the quotient approximates φ. These approximations are alternately lower and higher than φ, and converge to φ as the numbers increase.</p>
                  <p>Closed-form expressions for both sequences involve the golden ratio: F(n) = (φⁿ − (−φ)⁻ⁿ) / √5 and L(n) = φⁿ + (−φ)⁻ⁿ. Combining them gives φⁿ = (L(n) + F(n)√5) / 2.</p>
                </>
              ),
              source: "Adapted from the section Relationship to Fibonacci and Lucas numbers.",
              related: [
                { href: "#chronology", label: "Jacob and Kepler, who noticed" },
                { href: "#rectangle", label: "The golden rectangle" },
              ],
            }}
            spoken="F of n plus one, over F of n, tends to phi"
          >
            {"F(n+1) / F(n)\n→ φ"}
          </Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

function Fraction() {
  const viewport = useViewport();
  return (
    <Band
      id="fraction"
      title="The slowest fraction"
      lesson="The formula φ = 1 + 1/φ can be expanded recursively to obtain a continued fraction for the golden ratio, [1; 1, 1, 1, …], whose convergents are ratios of successive Fibonacci numbers. The consistently small terms explain why the approximants converge so slowly, which makes φ an extreme case of Hurwitz's inequality for Diophantine approximation: the constant √5 in that inequality cannot be improved without excluding the golden ratio. Applying φ² = 1 + φ recursively instead gives φ as a nested square root."
      note='from=1 to=3 · placement="top" · clockwise=true · hero right · 3:2'
      cap={viewport === "desktop" ? "60rem" : undefined}
      kind="rule"
    >
      <GoldenGrid from={1} to={3} placement="top" outline="1px solid var(--rule)">
        <GoldenBox>
          <Figure label="Figure 7" caption="Truncating the fraction after n ones gives F(n+1)/F(n).">
            <ContinuedFraction />
          </Figure>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Also" tone="deep" fitClass="fit--num" source="nested radicals" spoken="the square root of one plus the square root of one plus the square root of one plus, and so on">{"√(1 + √(1 +\n√(1 + …)))"}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Binet's formula" tone="red" fitClass="fit--num" source="de Moivre, Bernoulli, Euler; Binet 1843" spoken="F of n equals phi to the n, minus minus phi to the minus n, all over the square root of five">{"F(n) =\n(φⁿ − (−φ)⁻ⁿ) / √5"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

export function Fibonacci() {
  return (
    <Part
      id="fibonacci"
      kicker="§ Relationship to Fibonacci and Lucas numbers"
      title="Fibonacci"
      standfirst="Fibonacci numbers and Lucas numbers have an intricate relationship with the golden ratio. The ratio of each term to the one before it approaches φ, alternately from below and above; φ itself is the continued fraction of all ones, whose convergents are those ratios; and Binet's formula writes every Fibonacci number in terms of φ."
    >
      <Sequence />
      <Convergence />
      <Fraction />
    </Part>
  );
}
