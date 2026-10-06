import type { ReactNode } from "react";
/**
 * The study's own diagrams. Inline SVG, drawn from the mathematics rather
 * than copied from the article's figures, in the page's ink and one red.
 * Each fills its box: width 100%, height 100%, preserveAspectRatio meet.
 */
const PHI = (1 + Math.sqrt(5)) / 2;
const INK = "var(--ink)";
const RED = "var(--red)";
const PAPER = "var(--paper)";

const frame = { width: "100%", height: "100%", display: "block" } as const;

/** A line cut in extreme and mean ratio: a + b is to a as a is to b. */
export function Segment() {
  const a = 100 / PHI, b = 100 - a;
  return (
    <svg viewBox="0 0 100 30" style={frame} role="img" aria-label="A line divided into a longer part a and a shorter part b">
      <line x1="2" y1="18" x2="98" y2="18" stroke={INK} strokeWidth="1.2" />
      <line x1={2 + a * 0.96} y1="12" x2={2 + a * 0.96} y2="24" stroke={RED} strokeWidth="1.2" />
      <line x1="2" y1="12" x2="2" y2="24" stroke={INK} strokeWidth="0.8" />
      <line x1="98" y1="12" x2="98" y2="24" stroke={INK} strokeWidth="0.8" />
      <text x={2 + (a * 0.96) / 2} y="9" textAnchor="middle" fontSize="7" fontStyle="italic" fill={INK}>a</text>
      <text x={2 + a * 0.96 + (b * 0.96) / 2} y="9" textAnchor="middle" fontSize="7" fontStyle="italic" fill={RED}>b</text>
      <text x="50" y="29" textAnchor="middle" fontSize="5" fill={INK}>a + b</text>
    </svg>
  );
}

/** A golden rectangle cut into squares, with the quarter-circle spiral. */
export function GoldenRectangle({ spiral = true, labels = true }: { spiral?: boolean; labels?: boolean }) {
  // Squares inscribed clockwise from the left: side, then the remainder.
  const W = 100 * PHI, H = 100;
  const squares: { x: number; y: number; s: number }[] = [];
  let x = 0, y = 0, w = W, h = H, dir = 0;
  for (let i = 0; i < 7; i++) {
    const s = Math.min(w, h);
    if (dir === 0) { squares.push({ x, y, s }); x += s; w -= s; }
    else if (dir === 1) { squares.push({ x, y, s }); y += s; h -= s; }
    else if (dir === 2) { squares.push({ x: x + w - s, y, s }); w -= s; }
    else { squares.push({ x, y: y + h - s, s }); h -= s; }
    dir = (dir + 1) % 4;
  }
  // Each square's quarter circle is centred on the corner it shares with
  // the remainder on the side away from the next square: for a square on
  // the left of its remainder that is the bottom-right corner, and so on
  // round. Drawn as a polyline so there is no ambiguity about which of two
  // arcs through the same endpoints is meant.
  const arc = squares.map((q, i) => {
    const d = i % 4;
    const [cx, cy] = d === 0 ? [q.x + q.s, q.y + q.s] : d === 1 ? [q.x, q.y + q.s] : d === 2 ? [q.x, q.y] : [q.x + q.s, q.y];
    const mid = Math.atan2(q.y + q.s / 2 - cy, q.x + q.s / 2 - cx); // towards the square's centre
    // Sweep clockwise on screen: from the corner the previous arc ended at.
    return Array.from({ length: 13 }, (_, k) => {
      const t = mid - Math.PI / 4 + (k * Math.PI) / 24;
      return `${cx + q.s * Math.cos(t)} ${cy + q.s * Math.sin(t)}`;
    });
  });
  const spiralPath = "M " + arc.flat().join(" L ");
  return (
    <svg viewBox={`-2 -2 ${W + 4} ${H + 4}`} style={frame} role="img" aria-label="A golden rectangle divided into a square and a smaller golden rectangle, repeatedly, with a spiral of quarter circles through the squares">
      {squares.map((q, i) => (
        <rect key={i} x={q.x} y={q.y} width={q.s} height={q.s} fill={i === 0 ? PAPER : "none"} stroke={INK} strokeWidth="0.8" />
      ))}
      {spiral && <path d={spiralPath} fill="none" stroke={RED} strokeWidth="1.4" strokeLinecap="round" />}
      {labels && (
        <>
          <text x={squares[0].s / 2} y={H / 2 + 10} textAnchor="middle" fontSize="28" fontStyle="italic" fill={INK}>a</text>
          <text x={squares[0].s + squares[1].s / 2} y={squares[1].s / 2 + 6} textAnchor="middle" fontSize="18" fontStyle="italic" fill={INK}>b</text>
        </>
      )}
    </svg>
  );
}

/** A regular pentagon with its diagonals: the pentagram. Diagonal : side = φ. */
export function Pentagram() {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const t = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [50 + 46 * Math.cos(t), 52 + 46 * Math.sin(t)] as const;
  });
  const poly = pts.map((p) => p.join(",")).join(" ");
  const star = [0, 2, 4, 1, 3].map((i) => pts[i].join(",")).join(" ");
  return (
    <svg viewBox="0 0 100 104" style={frame} role="img" aria-label="A regular pentagon with all five diagonals drawn, forming a pentagram">
      <polygon points={poly} fill="none" stroke={INK} strokeWidth="0.9" />
      <polygon points={star} fill="none" stroke={RED} strokeWidth="1.3" strokeLinejoin="round" />
      <line x1={pts[0][0]} y1={pts[0][1]} x2={pts[2][0]} y2={pts[2][1]} stroke={INK} strokeWidth="2.2" />
      <line x1={pts[0][0]} y1={pts[0][1]} x2={pts[1][0]} y2={pts[1][1]} stroke={INK} strokeWidth="2.2" />
    </svg>
  );
}

/** Vogel's model of a sunflower head: point n at angle n × 137.5°, radius √n. */
export function Phyllotaxis({ count = 300 }: { count?: number }) {
  const golden = (2 * Math.PI) / (PHI * PHI);
  const dots = Array.from({ length: count }, (_, n) => {
    const r = 2.9 * Math.sqrt(n);
    return [50 + r * Math.cos(n * golden), 50 + r * Math.sin(n * golden), n] as const;
  });
  return (
    <svg viewBox="0 0 100 100" style={frame} role="img" aria-label={`${count} points placed by the golden angle, forming the spiral pattern of a sunflower head`}>
      {dots.map(([x, y, n]) => (
        <circle key={n} cx={x} cy={y} r={0.6 + 1.1 * Math.sqrt(n / count)} fill={n % 21 === 0 ? RED : INK} />
      ))}
    </svg>
  );
}

/** Two angles summing to 360° in the ratio φ: the smaller is the golden angle. */
export function GoldenAngle() {
  const small = 360 / (PHI * PHI);
  const a = ((-90 + small) * Math.PI) / 180;
  const [x, y] = [50 + 40 * Math.cos(a), 50 + 40 * Math.sin(a)];
  return (
    <svg viewBox="0 0 100 100" style={frame} role="img" aria-label="A circle divided into two arcs in the golden ratio; the smaller arc is 137.5 degrees">
      <circle cx="50" cy="50" r="40" fill="none" stroke={INK} strokeWidth="0.8" />
      <path d={`M 50 50 L 50 10 A 40 40 0 0 1 ${x} ${y} Z`} fill={RED} fillOpacity="0.9" />
      <text x="63" y="38" fontSize="7" fill="var(--on-red)" fontWeight="700">137.5°</text>
      <text x="22" y="72" fontSize="7" fill={INK}>222.5°</text>
    </svg>
  );
}

/** The Kepler triangle: sides 1, √φ, φ, with the squares on them. */
export function KeplerTriangle() {
  const s = 26, a = s, b = s * Math.sqrt(PHI);
  // Right angle at (ox, oy); the legs run right and up; the hypotenuse's
  // square is built on its outward side.
  const ox = 44, oy = 72;
  const P1 = [ox + a, oy], P2 = [ox, oy - b];
  const P3 = [P2[0] + b, P2[1] - a], P4 = [P1[0] + b, P1[1] - a];
  const hyp = [P1, P2, P3, P4].map((p) => p.join(",")).join(" ");
  return (
    <svg viewBox="0 0 120 100" style={frame} role="img" aria-label="A right triangle with sides 1, the square root of phi, and phi, with a square drawn on each side; the squares have areas 1, phi and phi squared">
      <rect x={ox} y={oy} width={a} height={a} fill="none" stroke={INK} strokeWidth="0.7" />
      <rect x={ox - b} y={oy - b} width={b} height={b} fill="none" stroke={INK} strokeWidth="0.7" />
      <polygon points={hyp} fill="none" stroke={INK} strokeWidth="0.7" strokeDasharray="1.5 1.5" />
      <polygon points={`${ox},${oy} ${ox + a},${oy} ${ox},${oy - b}`} fill={RED} fillOpacity="0.9" />
      <text x={ox + a / 2} y={oy + a / 2 + 3} textAnchor="middle" fontSize="8" fill={INK}>1</text>
      <text x={ox - b / 2} y={oy - b / 2 + 3} textAnchor="middle" fontSize="8" fill={INK}>φ</text>
      <text x={(P1[0] + P3[0]) / 2} y={(P1[1] + P3[1]) / 2 + 3} textAnchor="middle" fontSize="8" fill={INK}>φ²</text>
    </svg>
  );
}

/** Ratios of successive Fibonacci numbers closing on φ: a chart. */
export function RatioChart() {
  const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
  const ratios = fib.slice(1).map((f, i) => f / fib[i]);
  const x0 = 10, x1 = 98, y0 = 6, y1 = 66;
  const lo = 1, hi = 2.1;
  const px = (i: number) => x0 + (i * (x1 - x0)) / (ratios.length - 1);
  const py = (v: number) => y1 - ((v - lo) / (hi - lo)) * (y1 - y0);
  const d = ratios.map((v, i) => `${i ? "L" : "M"} ${px(i)} ${py(v)}`).join(" ");
  return (
    <svg viewBox="0 0 100 76" style={frame} role="img" aria-label="A line chart: the ratio of each Fibonacci number to the one before it, alternating above and below phi and converging on it">
      <line x1={x0} y1={py(PHI)} x2={x1} y2={py(PHI)} stroke={RED} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      <text x={x1} y={py(PHI) - 1.5} textAnchor="end" fontSize="4.5" fill={RED}>φ = 1.618…</text>
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke={INK} strokeWidth="0.5" />
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke={INK} strokeWidth="0.5" />
      {[1, 1.5, 2].map((v) => (
        <text key={v} x={x0 - 1.5} y={py(v) + 1.5} textAnchor="end" fontSize="4" fill={INK}>{v}</text>
      ))}
      <path d={d} fill="none" stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      {ratios.map((v, i) => (
        <circle key={i} cx={px(i)} cy={py(v)} r="1.1" fill={PAPER} stroke={INK} strokeWidth="0.6" />
      ))}
      {ratios.map((_, i) => (i % 3 === 0 || i === ratios.length - 1) && (
        <text key={`l${i}`} x={px(i)} y={y1 + 5} textAnchor="middle" fontSize="3.4" fill={INK}>{fib[i + 1]}/{fib[i]}</text>
      ))}
    </svg>
  );
}

/** φ as a continued fraction of ones, typeset. */
export function ContinuedFraction() {
  const row = (depth: number, x: number, y: number, w: number): ReactNode[] => {
    if (depth === 0) return [<text key={`e${y}`} x={x + w - 2} y={y + 2} fontSize="7" fill={INK} textAnchor="end">⋱</text>];
    return [
      <text key={`o${y}`} x={x} y={y + 2.5} fontSize="7" fill={INK}>1 +</text>,
      <text key={`n${y}`} x={x + 14 + (w - 14) / 2} y={y - 1.5} fontSize="7" fill={RED} textAnchor="middle">1</text>,
      <line key={`l${y}`} x1={x + 14} y1={y + 1} x2={x + w} y2={y + 1} stroke={INK} strokeWidth="0.5" />,
      ...row(depth - 1, x + 14, y + 10, w - 14),
    ];
  };
  return (
    <svg viewBox="0 0 100 60" style={frame} role="img" aria-label="phi written as a continued fraction: one plus one over one plus one over one plus, and so on">
      <text x="2" y="12" fontSize="9" fontStyle="italic" fill={INK}>φ =</text>
      {row(5, 16, 10, 82)}
    </svg>
  );
}
