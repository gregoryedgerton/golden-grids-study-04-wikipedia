import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "./lib/Page";
import { Introduction } from "./parts/introduction";
import { Calculation } from "./parts/calculation";
import { History } from "./parts/history";
import { Geometry } from "./parts/geometry";
import { Fibonacci } from "./parts/fibonacci";
import { InTheWorld } from "./parts/world";

/** One page, six parts, in the article's order. */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page
      title="Golden ratio"
      standfirst="In mathematics, two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. The Greek letter φ denotes it. It has been studied since Euclid, named divine by Pacioli, found in the pentagon, the Fibonacci numbers and the arrangement of leaves, and claimed, often wrongly, in art, architecture and nature."
    >
      <Introduction />
      <Calculation />
      <History />
      <Geometry />
      <Fibonacci />
      <InTheWorld />
    </Page>
  </StrictMode>,
);
