import type { ReactNode } from "react";
import { Fit } from "./fit";
import { ExpandedCell, type ExpandGroup } from "./expand";
import { PARTS } from "./Page";

/** The accessible name of a section link: "Continued in section IV, Geometry". */
function sectionName(href: string): string | undefined {
  const id = href.replace(/^#/, "");
  const i = PARTS.findIndex((p) => p.id === id || (p.bands as readonly string[]).includes(id));
  if (i < 0) return undefined;
  const roman = ["I", "II", "III", "IV", "V", "VI"][i];
  return `Continued in section ${roman}, ${PARTS[i].short}`;
}

/**
 * What goes inside a slot. Three kinds, and every one is a flex column
 * that fills its GoldenBox: a label at the top, something fitted in the
 * middle, and a line at the foot. The fitted thing is what makes the study
 * bite-size: one fact per box, set as large as the box allows.
 */
export type Tone = "paper" | "deep" | "red" | "ink";

/** A square in another part of the page that carries this fact further. */
export interface Related { href: string; label: string }

const tone = (t?: Tone) => (t && t !== "paper" ? ` box--${t}` : "");

/** One fact: a label, a fitted line, optional body copy, a source line,
 *  and optionally a longer passage behind a "more" control. */
export function Fact({
  label, children, fitClass, min, max, body, source, tone: t, align, expand, link, spoken,
}: {
  label?: string;
  children: ReactNode;
  fitClass?: string;
  min?: number;
  max?: number;
  body?: ReactNode;
  source?: string;
  tone?: Tone;
  align?: "top" | "end";
  expand?: { group: ExpandGroup; slotKey: string; title: string; full: ReactNode; source?: string; related?: Related[] };
  /** Where this fact continues on another page. */
  link?: { href: string; label: string };
  /** What a screen reader should say for the fitted line, when the visible
   *  line breaks a formula across lines or uses symbols that do not read. */
  spoken?: string;
}) {
  return (
    <>
      <div className={`box${tone(t)}`}>
        {label && <p className="box__label">{label}</p>}
        <div className={`box__fit${align ? ` box__fit--${align}` : ""}`}>
          <Fit as="p" className={fitClass} min={min ?? 8} max={max} ariaLabel={spoken}>{children}</Fit>
        </div>
        {body && <div className="box__body">{body}</div>}
        {(source || expand || link) && (
          <div className="box__foot">
            {source && <span className="box__source">{source}</span>}
            {link && <a className="more more--link" href={link.href} aria-label={sectionName(link.href)}>{link.label}</a>}
            {expand && <button className="more" aria-label={`More: ${expand.title}`} {...expand.group.triggerProps(expand.slotKey)}>More</button>}
          </div>
        )}
      </div>
      {expand && expand.group.isOpen(expand.slotKey) && (
        <ExpandedCell id={expand.group.panelId(expand.slotKey)} title={expand.title} onClose={expand.group.close} closeRef={expand.group.closeRef}>
          {expand.full}
          {expand.source && <p className="cell__source">{expand.source}</p>}
          {expand.related && expand.related.length > 0 && (
            <nav className="cell__related" aria-label="Related">
              <p className="label">Continues</p>
              <ul>
                {expand.related.map((r) => <li key={r.href}><a href={r.href}>{r.label}</a></li>)}
              </ul>
            </nav>
          )}
        </ExpandedCell>
      )}
    </>
  );
}

/** A diagram or chart, filling the box, with a caption. */
export function Figure({ label, caption, tone: t, children }: { label?: string; caption?: string; tone?: Tone; children: ReactNode }) {
  return (
    <figure className={`box box--figure${tone(t)}`}>
      {label && <p className="box__label">{label}</p>}
      {children}
      {caption && <figcaption className="box__caption">{caption}</figcaption>}
    </figure>
  );
}

/** A box that is a link to another page of the study. */
export function LinkBox({ label, href, tone: t, children }: { label: string; href: string; tone?: Tone; children: ReactNode }) {
  return (
    <a className={`box${tone(t)}`} href={href}>
      <p className="box__label">{label}</p>
      <div className="box__fit">
        <Fit as="span" min={8}>{children}</Fit>
      </div>
      <div className="box__foot"><span className="box__arrow">Read the section</span></div>
    </a>
  );
}
