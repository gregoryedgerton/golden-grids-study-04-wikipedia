import { useEffect, type ReactNode } from "react";
import { Tools } from "./tools";
import "../styles.css";

/**
 * The shell every page shares: a masthead, the contents strip, the bands,
 * and the attribution. Plain links between plain HTML files — there is no
 * router, and the reference has none either.
 */
export const PAGES = [
  { file: "index.html", title: "Golden ratio", short: "φ" },
  { file: "calculation.html", title: "Calculation", short: "Calculation" },
  { file: "history.html", title: "History", short: "History" },
  { file: "geometry.html", title: "Geometry", short: "Geometry" },
  { file: "fibonacci.html", title: "Fibonacci", short: "Fibonacci" },
  { file: "world.html", title: "In the world", short: "In the world" },
] as const;

export type PageFile = (typeof PAGES)[number]["file"];

export const ARTICLE = "https://en.wikipedia.org/wiki/Golden_ratio";
export const REVISION = "https://en.wikipedia.org/w/index.php?title=Golden_ratio&oldid=1378520549";

export function Page({ current, kicker, title, standfirst, children }: {
  current: PageFile;
  kicker: string;
  title: string;
  standfirst: string;
  children: ReactNode;
}) {
  // Display type is hidden (styles.css) until the web fonts are in, so it
  // never flashes from the fallback face. `fonts.ready` resolves whether the
  // fonts loaded or failed; a browser without the API shows the text at once.
  useEffect(() => {
    const show = () => { document.documentElement.dataset.fonts = "ready"; };
    if (document.fonts?.ready) document.fonts.ready.then(show); else show();
  }, []);

  const index = PAGES.findIndex((p) => p.file === current);
  const prev = PAGES[index - 1];
  const next = PAGES[index + 1];
  return (
    <>
      {/* The skip link is the first thing in the tab order, before the tools. */}
      <a className="skip" href="#content">Skip to content</a>
      <Tools />
      <header className="masthead">
        <p className="masthead__kicker">
          <span>Layout study 04</span>
          <span>{kicker}</span>
          <span>No. {index + 1} of {PAGES.length}</span>
        </p>
        <h1 className="masthead__title">{title}</h1>
        <p className="masthead__standfirst">{standfirst}</p>
        <nav className="contents" aria-label="Contents">
          <ol>
            {PAGES.map((p) => (
              <li key={p.file}>
                {p.file === current
                  ? <span aria-current="page">{p.short}</span>
                  : <a href={`./${p.file}`}>{p.short}</a>}
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <main id="content">{children}</main>

      <nav className="next" aria-label="Sections">
        {prev && (
          <p><span className="label">Previous</span> <a href={`./${prev.file}`}>{prev.title}</a></p>
        )}
        {next && (
          <p><span className="label">Next</span> <a href={`./${next.file}`}>{next.title}</a></p>
        )}
      </nav>

      <footer className="colophon">
        <p>
          An unaffiliated layout study of the Wikipedia article{" "}
          <a href={ARTICLE}>Golden ratio</a>. The text is adapted from that article
          (<a href={REVISION}>revision 1378520549</a>, 2026), by its{" "}
          <a href="https://en.wikipedia.org/w/index.php?title=Golden_ratio&action=history">contributors</a>,
          under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; it has been
          shortened and rearranged, and this page is offered under the same licence. The diagrams and
          charts are original. Nothing of Wikipedia's design or marks is reproduced. Built with{" "}
          <a href="https://github.com/gregoryedgerton/golden-grids">Golden Grids</a> ·{" "}
          <a href="https://www.npmjs.com/package/@gifcommit/golden-grids">npm</a> ·{" "}
          <a href="https://gregoryedgerton.github.io/golden-grids/">generator</a>.
        </p>
      </footer>
    </>
  );
}
