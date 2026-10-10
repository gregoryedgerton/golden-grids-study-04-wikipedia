import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import "../styles.css";

/**
 * The shell: a masthead, the contents strip, the six parts, and the
 * disclosure. The reference is one long page with a table of contents that
 * follows the reader down it; so is this. The strip stays under the notice,
 * its links go to the parts of this page, and it marks the part in view.
 */
export const PARTS = [
  { id: "introduction", short: "Introduction", bands: ["lead", "representations", "contents"] },
  { id: "calculation", short: "Calculation", bands: ["derivation", "roots"] },
  { id: "history", short: "History", bands: ["chronology", "quotation"] },
  { id: "geometry", short: "Geometry", bands: ["rectangle", "pentagon", "kepler", "angle"] },
  { id: "fibonacci", short: "Fibonacci", bands: ["sequence", "convergence", "fraction"] },
  { id: "world", short: "In the world", bands: ["applications", "disputed"] },
] as const;

export const ARTICLE = "https://en.wikipedia.org/wiki/Golden_ratio";
export const REVISION = "https://en.wikipedia.org/w/index.php?title=Golden_ratio&oldid=1378520549";

/** A band's heading sits one level under its part's. */
const Level = createContext<2 | 3>(2);
export const useHeadingLevel = () => useContext(Level);

/**
 * One part of the article: its section of the reference named, a heading and
 * a standfirst, then its bands. The first part (`lead`) takes the masthead
 * as its heading, so its own is spoken and not drawn.
 */
export function Part({ id, kicker, title, standfirst, lead, children }: {
  id: string; kicker?: string; title: string; standfirst?: string; lead?: boolean; children: ReactNode;
}) {
  return (
    <section className={`part${lead ? " part--lead" : ""}`} id={id} aria-labelledby={`${id}-title`}>
      {lead ? <h2 id={`${id}-title`} className="visually-hidden">{title}</h2> : (
        <header className="part__header">
          {kicker && <p className="part__kicker">{kicker}</p>}
          <h2 id={`${id}-title`} className="part__title">{title}</h2>
          {standfirst && <p className="part__standfirst">{standfirst}</p>}
        </header>
      )}
      <Level.Provider value={3}>{children}</Level.Provider>
    </section>
  );
}

function Contents() {
  const ref = useRef<HTMLElement>(null);
  const [here, setHere] = useState<string>(PARTS[0].id);

  // The strip tells the page its height, so an opened square's head and a
  // followed link both clear it.
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const set = () => document.documentElement.style.setProperty("--contents-h", `${Math.round(el.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The part in view is the last one whose top has passed under the strip.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = (ref.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let current: string = PARTS[0].id;
      for (const p of PARTS) { const el = document.getElementById(p.id); if (el && el.getBoundingClientRect().top <= line) current = p.id; }
      setHere(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <nav className="contents" aria-label="Contents" ref={ref}>
      <ol>
        {PARTS.map((p) => <li key={p.id}><a href={`#${p.id}`} aria-current={p.id === here ? "location" : undefined}>{p.short}</a></li>)}
      </ol>
    </nav>
  );
}

export function Page({ kicker, title, standfirst, children }: { kicker: string; title: string; standfirst: string; children: ReactNode }) {
  // Display type is hidden (styles.css) until the web fonts are in, so it
  // never flashes from the fallback face. `fonts.ready` resolves whether the
  // fonts loaded or failed; a browser without the API shows the text at once.
  useEffect(() => {
    const show = () => { document.documentElement.dataset.fonts = "ready"; };
    if (!document.fonts) { show(); return; }
    // Wait for the display faces themselves, not just `ready`, which iOS
    // Safari can resolve before a face that is used only later has loaded.
    // Whatever happens, show the type after two seconds.
    const faces = ["600 1em Fraunces", "500 1em Fraunces", "300 1em Fraunces", "italic 400 1em Fraunces", "700 1em 'Archivo Narrow'"];
    Promise.all(faces.map((f) => document.fonts.load(f).catch(() => []))).then(show, show);
    const timer = setTimeout(show, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* The skip link is the first thing in the tab order, before the tools. */}
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      <header className="masthead">
        <p className="masthead__kicker">
          <span><strong className="brand">GIFipedia</strong> · Layout study 04</span>
          <span>{kicker}</span>
        </p>
        <h1 className="masthead__title">{title}</h1>
        <p className="masthead__standfirst">{standfirst}</p>
      </header>
      <Contents />
      <main id="content">{children}</main>
      <StudyDisclosure />
    </>
  );
}
