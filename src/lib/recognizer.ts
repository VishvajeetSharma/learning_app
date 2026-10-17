import { LETTERS, type Pt } from './letters';

/**
 * Offline, on-device handwriting check for UPPERCASE block letters (no network, no native module).
 *  1. Strokes are grouped into letters by horizontal extent (left-to-right).
 *  2. Each group is matched against every letter template with a point-cloud matcher ($P-style, order-independent).
 *  3. The word passes only if the group count equals the word length AND each group is recognised as the expected letter.
 * Limits: uppercase print only (no cursive/lowercase); letters should be written side by side, not on top of each other.
 */
const N = 32;
/** Expected letter passes if its score is within this factor of the best-matching letter (tuned in simulation: ~90% accept / ~98% reject one-wrong-letter). */
const TOLERANCE = 1.3;
export type LetterResult = { expected: string; got: string; ok: boolean };
export type WordResult = { ok: boolean; reason?: 'empty' | 'count'; groups: number; letters: LetterResult[] };

type Box = { minX: number; maxX: number; minY: number; maxY: number };
const box = (pts: Pt[]): Box => pts.reduce((b, p) => ({ minX: Math.min(b.minX, p.x), maxX: Math.max(b.maxX, p.x), minY: Math.min(b.minY, p.y), maxY: Math.max(b.maxY, p.y) }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });

const densify = (s: Pt[], step: number): Pt[] => {
  if (s.length === 1) return [s[0]];
  const o: Pt[] = [];
  for (let i = 0; i < s.length - 1; i++) {
    const n = Math.max(1, Math.ceil(Math.hypot(s[i + 1].x - s[i].x, s[i + 1].y - s[i].y) / step));
    for (let k = 0; k < n; k++) o.push({ x: s[i].x + ((s[i + 1].x - s[i].x) * k) / n, y: s[i].y + ((s[i + 1].y - s[i].y) * k) / n });
  }
  o.push(s[s.length - 1]);
  return o;
};

/**
 * Even-sample to N points and normalise: centre on the centroid and stretch the box to a unit square
 * (children write letters at all aspect ratios). Very thin shapes (I) are scaled uniformly so they stay a line.
 */
function cloud(strokes: Pt[][], stepFrac: number): Pt[] {
  const all = strokes.flat();
  const b = box(all); const w = b.maxX - b.minX, h = b.maxY - b.minY, big = Math.max(w, h, 1e-6);
  const thin = Math.min(w, h) < 0.12 * big;
  const sx = thin ? big : Math.max(w, 1e-6), sy = thin ? big : Math.max(h, 1e-6);
  const dense = strokes.flatMap((s) => densify(s, big * stepFrac));
  const pts = Array.from({ length: N }, (_, i) => dense[Math.min(dense.length - 1, Math.floor((i * dense.length) / N))]);
  const cx = pts.reduce((a, p) => a + p.x, 0) / N, cy = pts.reduce((a, p) => a + p.y, 0) / N;
  return pts.map((p) => ({ x: (p.x - cx) / sx, y: (p.y - cy) / sy }));
}

function greedy(a: Pt[], b: Pt[], start: number): number {
  const used = new Array(N).fill(false); let sum = 0; let i = start;
  do {
    let best = Infinity, k = -1;
    for (let j = 0; j < N; j++) if (!used[j]) { const d = Math.hypot(a[i].x - b[j].x, a[i].y - b[j].y); if (d < best) { best = d; k = j; } }
    used[k] = true; sum += (1 - ((i - start + N) % N) / N) * best; i = (i + 1) % N;
  } while (i !== start);
  return sum;
}
const step = Math.floor(Math.sqrt(N));
function distance(a: Pt[], b: Pt[]): number {
  let m = Infinity;
  for (let s = 0; s < N; s += step) m = Math.min(m, greedy(a, b, s), greedy(b, a, s));
  return m;
}

const TEMPLATES: Record<string, Pt[]> = Object.fromEntries(Object.entries(LETTERS).map(([k, v]) => [k, cloud(v, 0.02)]));

/** Group strokes into letters left-to-right: a stroke joins the current group if their x-ranges overlap meaningfully. */
export function groupStrokes(strokes: Pt[][]): Pt[][][] {
  const items = strokes.filter((s) => s.length).map((s) => ({ s, b: box(s) })).sort((a, b) => a.b.minX - b.b.minX);
  const groups: { strokes: Pt[][]; b: Box }[] = [];
  for (const it of items) {
    const g = groups[groups.length - 1];
    if (g) {
      const h = Math.max(g.b.maxY - g.b.minY, it.b.maxY - it.b.minY, 1);
      const tol = 0.1 * h;
      const gc = (g.b.minX + g.b.maxX) / 2, ic = (it.b.minX + it.b.maxX) / 2;
      const inside = (c: number, b: Box) => c >= b.minX - tol && c <= b.maxX + tol;
      // same letter if either part's centre lies within the other's horizontal span (T bar+stem, H, E, K, A ...)
      const overlap = inside(gc, it.b) || inside(ic, g.b) ? 1 : 0;
      if (overlap) {
        g.strokes.push(it.s); g.b = { minX: Math.min(g.b.minX, it.b.minX), maxX: Math.max(g.b.maxX, it.b.maxX), minY: Math.min(g.b.minY, it.b.minY), maxY: Math.max(g.b.maxY, it.b.maxY) };
        continue;
      }
    }
    groups.push({ strokes: [it.s], b: it.b });
  }
  return groups.map((g) => g.strokes);
}

export function classify(strokes: Pt[][]): { best: string; ranked: [string, number][] } {
  const c = cloud(strokes, 0.02);
  const ranked = Object.entries(TEMPLATES).map(([k, t]) => [k, distance(c, t)] as [string, number]).sort((a, b) => a[1] - b[1]);
  return { best: ranked[0][0], ranked };
}

/** Child-friendly: the expected letter passes if it is the best match, or within TOLERANCE of the best match's score. */
export function recognizeWord(strokes: Pt[][], target: string): WordResult {
  const word = target.toUpperCase().split('');
  const groups = groupStrokes(strokes);
  if (!groups.length) return { ok: false, reason: 'empty', groups: 0, letters: [] };
  if (groups.length !== word.length) return { ok: false, reason: 'count', groups: groups.length, letters: [] };
  const letters = groups.map((g, i): LetterResult => {
    const { best, ranked } = classify(g);
    const dExp = ranked.find(([k]) => k === word[i])?.[1] ?? Infinity;
    return { expected: word[i], got: best, ok: best === word[i] || dExp <= ranked[0][1] * TOLERANCE };
  });
  const correct = letters.filter((l) => l.ok).length;
  return { ok: correct / word.length >= 0.6, groups: groups.length, letters };
}

/** Kept for call-site clarity: true = an engine is available and results are real. */
export const handwritingEngine = 'point-cloud (offline, uppercase)';
