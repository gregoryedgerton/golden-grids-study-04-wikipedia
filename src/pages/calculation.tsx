import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { mount } from "../main";
import { Page } from "../lib/Page";
import { Band } from "../bands/Band";
import { Fact } from "../lib/boxes";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";

/**
 * Page II — Calculation. The article derives φ in five displayed equations
 * read top to bottom. A derivation is a sequence, and a golden grid is a
 * hierarchy, so the band does not pretend the steps are ranked: the result
 * takes the largest square because it is what the section exists to reach,
 * and the steps that lead to it are read from the smaller squares in the
 * order their labels give.
 */
function Derivation() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [5, "left"],
    tablet: [5, "top"],
    desktop: [5, "top"],
  });
  return (
    <Band
      id="derivation"
      title="From the definition to the number"
      lesson="Two non-zero quantities a and b are in the golden ratio φ if (a + b) / a = a / b = φ. Dividing numerator and denominator of the left-hand side by b and substituting a / b = φ gives (φ + 1) / φ = φ; multiplying both sides by φ gives φ + 1 = φ², which rearranges to the quadratic φ² − φ − 1 = 0. The quadratic formula yields two solutions, and the positive one is the golden ratio. Read the steps in their numbered order."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=false · ${viewport === "mobile" ? "portrait 5:8" : "landscape 8:5"}`}
      kind="rule"
    >
      <GoldenGrid from={1} to={to} placement={placement} clockwise={false} outline="1px solid var(--rule)">
        <GoldenBox {...x.boxProps("result")}>
          <Fact
            label="Result · the positive root"
            fitClass="fit--num"
            body={<p>The quadratic formula yields two solutions. The positive root is the golden ratio; the negative root, −1/φ, shares many of its properties.</p>}
            source="Calculation, final step"
            expand={{
              group: x, slotKey: "result", title: "The two roots",
              full: (
                <>
                  <p>The quadratic formula applied to φ² − φ − 1 = 0 yields two solutions: (1 + √5) / 2 = 1.618033…, and (1 − √5) / 2 = −0.618033….</p>
                  <p>The positive root, φ, is the golden ratio. The negative root, which can be written as either 1 − φ or −1/φ, shares many of its properties: it is the algebraic conjugate of φ, and the two roots sum to 1 and multiply to −1.</p>
                </>
              ),
              source: "Adapted from the section Calculation.",
              related: [
                { href: "./fibonacci.html#fraction", label: "φ as a continued fraction" },
                { href: "./index.html#representations", label: "The three representations" },
              ],
            }}
          >
            {"φ = (1 + √5) / 2\n= 1.618033…"}
          </Fact>
        </GoldenBox>
        <GoldenBox {...x.boxProps("poly")}>
          <Fact label="Step 4 · rearrange" fitClass="fit--num" tone="deep" body={<p>A quadratic equation in φ: its minimal polynomial.</p>}
            expand={{
              group: x, slotKey: "poly", title: "The minimal polynomial",
              full: (
                <>
                  <p>Since the golden ratio is a root of a polynomial with rational coefficients, it is an algebraic number. Its minimal polynomial, the polynomial of lowest degree with integer coefficients that has the golden ratio as a root, is x² − x − 1.</p>
                  <p>This quadratic polynomial has two roots, φ and its conjugate −1/φ. The golden ratio is also closely related to the polynomial x² + x − 1, which has roots −φ and 1/φ. As the root of a quadratic polynomial, the golden ratio is a constructible number.</p>
                </>
              ),
              source: "Adapted from the section Minimal polynomial.",
              related: [{ href: "./geometry.html#pentagon", label: "Constructing φ in the pentagon" }],
            }}
          >φ² − φ − 1 = 0</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Step 3 · multiply by φ" fitClass="fit--num">φ + 1 = φ²</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Step 2 · substitute" fitClass="fit--num" tone="deep">{"(φ + 1) / φ\n= φ"}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Step 1 · define" fitClass="fit--num" link={{ href: "./index.html#lead", label: "§ I" }}>{"(a + b) / a\n= a / b = φ"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

/** Two roots of equal standing: the one range with no hierarchy. */
function Roots() {
  const x = useExpandGroup();
  return (
    <Band
      id="roots"
      title="The two roots"
      lesson="The quadratic has two roots. The positive root is φ. The negative root, −0.618033…, can be written as either 1 − φ or −1/φ; it is the algebraic conjugate of φ and shares many of its properties. The two roots sum to 1 and multiply to −1."
      note='from=1 to=2 · placement="right" · 2:1, no dominant box'
      cap="60rem"
    >
      <GoldenGrid from={1} to={2} placement="right">
        <GoldenBox>
          <Fact label="Positive root" tone="ink" fitClass="fit--num" source="φ, the golden ratio">{"1 + √5\n2"}</Fact>
        </GoldenBox>
        <GoldenBox {...x.boxProps("conj")}>
          <Fact label="Negative root" tone="red" fitClass="fit--num" source="1 − φ = −1/φ"
            expand={{
              group: x, slotKey: "conj", title: "The algebraic conjugate",
              full: (
                <>
                  <p>The conjugate root to the minimal polynomial x² − x − 1 is −1/φ = 1 − φ = (1 − √5) / 2 = −0.618033…</p>
                  <p>The absolute value of this quantity, 0.618…, corresponds to the length ratio taken in reverse order: the shorter segment to the longer segment. This illustrates the unique property of the golden ratio among positive numbers, that 1/φ = φ − 1, or equivalently 1/(1/φ) = 1/φ + 1. The conjugate and the defining quadratic relationship lead to decimal values that have their fractional part in common with φ: φ² = 2.618…, and 1/φ = 0.618…</p>
                </>
              ),
              source: "Adapted from the section Algebraic conjugate and powers.",
            }}
          >{"1 − √5\n2"}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}

mount(
  <Page
    current="calculation.html"
    kicker="Wikipedia · Golden ratio · § Calculation"
    title="Calculation"
    standfirst="To determine φ as a number, start from the definition and divide through by the shorter quantity. Four steps of algebra turn the proportion into a quadratic equation, and the quadratic formula gives two roots: one is the golden ratio, the other its conjugate."
  >
    <Derivation />
    <Roots />
  </Page>
);
