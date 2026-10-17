export type Pt = { x: number; y: number };
const arc = (cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n = 14): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
const L = (...p: number[]): Pt[] => p.reduce<Pt[]>((o, v, i, a) => (i % 2 ? o : [...o, { x: v, y: a[i + 1] }]), []);
export const LETTERS: Record<string, Pt[][]> = {
  L: [L(0.25, 0.05, 0.25, 0.95, 0.8, 0.95)],
  I: [L(0.5, 0.05, 0.5, 0.95)],
  O: [arc(0.5, 0.5, 0.35, 0.45, -90, 270, 24)],
  N: [L(0.2, 0.95, 0.2, 0.05, 0.8, 0.95, 0.8, 0.05)],
  E: [L(0.75, 0.05, 0.25, 0.05, 0.25, 0.95, 0.75, 0.95), L(0.25, 0.5, 0.65, 0.5)],
  P: [[...L(0.25, 0.95, 0.25, 0.05, 0.5, 0.05), ...arc(0.5, 0.27, 0.27, 0.22, -90, 90, 10), ...L(0.25, 0.49)]],
  H: [L(0.25, 0.05, 0.25, 0.95), L(0.75, 0.05, 0.75, 0.95), L(0.25, 0.5, 0.75, 0.5)],
  A: [L(0.12, 0.95, 0.5, 0.05, 0.88, 0.95), L(0.28, 0.62, 0.72, 0.62)],
  T: [L(0.15, 0.05, 0.85, 0.05), L(0.5, 0.05, 0.5, 0.95)],
  G: [[...arc(0.55, 0.5, 0.35, 0.45, -35, -325, 24), ...L(0.55, 0.52, 0.85, 0.52, 0.85, 0.7)]],
  R: [[...L(0.25, 0.95, 0.25, 0.05, 0.5, 0.05), ...arc(0.5, 0.27, 0.27, 0.22, -90, 90, 10), ...L(0.25, 0.49)], L(0.5, 0.49, 0.8, 0.95)],
  D: [[...L(0.25, 0.05, 0.25, 0.95, 0.45, 0.95), ...arc(0.45, 0.5, 0.35, 0.45, 90, -90, 14)]],
  C: [arc(0.6, 0.5, 0.4, 0.45, -40, -320, 24)],
  M: [L(0.15, 0.95, 0.15, 0.05, 0.5, 0.65, 0.85, 0.05, 0.85, 0.95)],
  K: [L(0.25, 0.05, 0.25, 0.95), L(0.75, 0.05, 0.25, 0.55, 0.8, 0.95)],
  Y: [L(0.15, 0.05, 0.5, 0.5, 0.85, 0.05), L(0.5, 0.5, 0.5, 0.95)],
  F: [L(0.75, 0.05, 0.25, 0.05, 0.25, 0.95), L(0.25, 0.5, 0.65, 0.5)],
  Z: [L(0.2, 0.05, 0.8, 0.05, 0.2, 0.95, 0.8, 0.95)],
  B: [[...L(0.25, 0.05, 0.25, 0.95)], [...L(0.25, 0.05, 0.5, 0.05), ...arc(0.5, 0.27, 0.25, 0.22, -90, 90, 10), ...L(0.25, 0.49)], [...L(0.25, 0.49, 0.55, 0.49), ...arc(0.55, 0.72, 0.25, 0.23, -90, 90, 10), ...L(0.25, 0.95)]],
  U: [[...L(0.22, 0.05, 0.22, 0.6), ...arc(0.5, 0.6, 0.28, 0.35, 180, 0, 14), ...L(0.78, 0.05)]],
  W: [L(0.15, 0.05, 0.32, 0.95, 0.5, 0.45, 0.68, 0.95, 0.85, 0.05)],
  S: [[...arc(0.52, 0.27, 0.24, 0.22, 30, -180, 10), ...L(0.28, 0.49, 0.72, 0.51), ...arc(0.48, 0.73, 0.24, 0.22, 0, -210, 10)]],
};

const dens = (s: Pt[], step: number): Pt[] => {
  const o: Pt[] = [];
  for (let i = 0; i < s.length - 1; i++) {
    const d = Math.hypot(s[i + 1].x - s[i].x, s[i + 1].y - s[i].y);
    const n = Math.max(1, Math.ceil(d / step));
    for (let k = 0; k < n; k++) o.push({ x: s[i].x + ((s[i + 1].x - s[i].x) * k) / n, y: s[i].y + ((s[i + 1].y - s[i].y) * k) / n });
  }
  o.push(s[s.length - 1]);
  return o;
};
const near = (p: Pt, set: Pt[], tol: number) => set.some((q) => Math.hypot(p.x - q.x, p.y - q.y) <= tol);

/** Real guided verification: user must cover the template and stay near it. Points are in unit-box coords. */
export function verifyTrace(letter: string, strokes: Pt[][]): boolean {
  const tpl = (LETTERS[letter] ?? []).flatMap((s) => dens(s, 0.04));
  const user = strokes.flatMap((s) => dens(s, 0.03));
  if (!tpl.length || user.length < 5) return false;
  const covered = tpl.filter((t) => near(t, user, 0.14)).length / tpl.length;
  const onPath = user.filter((u) => near(u, tpl, 0.16)).length / user.length;
  // direction nudge: the child must begin near where the first stroke of the letter starts
  const t0 = LETTERS[letter]?.[0]?.[0];
  const startOk = !t0 || strokes.some((u) => u.length && Math.hypot(u[0].x - t0.x, u[0].y - t0.y) <= 0.3);
  return covered >= 0.8 && onPath >= 0.75 && startOk;
}
