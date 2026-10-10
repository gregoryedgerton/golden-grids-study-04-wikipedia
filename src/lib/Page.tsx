import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import "../styles.css";

/**
 * The shell, after the reference's own: the site's name and a search at the
 * top, the article's title over its tabs (Article and Talk; Read, View source
 * and View history), the line saying where the text is from, a table of
 * contents that follows the reader down the page, the six parts, and the
 * disclosure. It does not say "layout study" or name the study here: the
 * notice above it and the disclosure below it do that on every page. The
 * tabs and the links at the right are the reference's, for show: nothing in
 * the header leaves for Wikipedia. Only the notice and the disclosure do.
 */
export const PARTS = [
  { id: "introduction", short: "Introduction", bands: ["lead", "representations", "contents"] },
  { id: "calculation", short: "Calculation", bands: ["derivation", "roots"] },
  { id: "history", short: "History", bands: ["chronology", "quotation"] },
  { id: "geometry", short: "Geometry", bands: ["rectangle", "pentagon", "kepler", "angle"] },
  { id: "fibonacci", short: "Fibonacci", bands: ["sequence", "convergence", "fraction"] },
  { id: "world", short: "In the world", bands: ["applications", "disputed"] },
] as const;


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
      <span className="contents__label" aria-hidden="true">Contents</span>
      <ol>
        {PARTS.map((p) => <li key={p.id}><a href={`#${p.id}`} aria-current={p.id === here ? "location" : undefined}>{p.short}</a></li>)}
      </ol>
    </nav>
  );
}

/**
 * The reference's search box, working on this page: it lists the parts and
 * their bands, and going to one moves there. Nothing is sent anywhere.
 */
function Search() {
  const [q, setQ] = useState("");
  const [none, setNone] = useState(false);
  const places = () => [...document.querySelectorAll<HTMLElement>("section.part, section.band")].map((el) => ({ id: el.id, text: el.querySelector("h2, h3")?.textContent ?? el.id }));
  const [list, setList] = useState<{ id: string; text: string }[]>([]);
  useEffect(() => { setList(places()); }, []);
  const go = () => {
    const needle = q.trim().toLowerCase(); if (!needle) return;
    const hit = list.find((p) => p.text.toLowerCase() === needle) ?? list.find((p) => p.text.toLowerCase().includes(needle))
      ?? [...document.querySelectorAll<HTMLElement>("section.band")].map((el) => ({ id: el.id, text: el.textContent ?? "" })).find((p) => p.text.toLowerCase().includes(needle));
    setNone(!hit);
    if (hit) location.hash = hit.id;
  };
  return (
    <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); go(); }}>
      <label htmlFor="search" className="visually-hidden">Search this article</label>
      <input id="search" type="search" list="search-places" placeholder="Search GIFipedia" value={q} onChange={(e) => { setQ(e.target.value); setNone(false); }} />
      <datalist id="search-places">{list.map((p) => <option key={p.id} value={p.text} />)}</datalist>
      <button type="submit">Search</button>
      <span className="search__none" role="status">{none ? "Nothing on this page matches." : ""}</span>
    </form>
  );
}

export function Page({ title, standfirst, children }: { title: string; standfirst: string; children: ReactNode }) {
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
      {/* The reference's own header: its name and a search at the top, the
          article's title over two rows of tabs, and where the text is from. */}
      <header className="site">
        <div className="site__bar">
          <a className="wordmark" href="#top">
            <span className="wordmark__name">GIFipedia</span>
            <span className="wordmark__tag">The Free Encyclopedia</span>
          </a>
          <Search />
          <ul className="site__links">
            <li><span>Donate</span></li>
            <li><span>Create account</span></li>
            <li><span>Log in</span></li>
          </ul>
        </div>
      </header>
      <main id="content">
      <div className="article" id="top">
        <h1 className="article__title">{title}</h1>
        <div className="tabs">
          <ul className="tabs__left" aria-label="Views of this subject">
            <li><span aria-current="page">Article</span></li>
            <li><span>Talk</span></li>
          </ul>
          <ul className="tabs__right" aria-label="Views of this article">
            <li><span aria-current="page">Read</span></li>
            <li><span>View source</span></li>
            <li><span>View history</span></li>
          </ul>
        </div>
        <p className="article__from">Adapted from Wikipedia, the free encyclopedia</p>
        <p className="article__standfirst">{standfirst}</p>
      </div>
      <Contents />
      {children}
      </main>
      <StudyDisclosure />
    </>
  );
}
