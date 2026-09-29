/**
 * How wide a room name is drawn (29 Sep 2026).
 *
 * Labels are placed before they are drawn, so their size has to be known in
 * advance. A flat "8.5 units a character" undersized anything with capitals —
 * "WC" is two of the widest letters in Arial — and names ran across walls.
 * These are Arial's own advance widths (per 1000 em), so the estimate matches
 * what Fabric draws, and it is the same in the browser and in the checks.
 */
const ARIAL: Record<string, number> = {
  ' ': 278,
  '!': 278,
  '"': 355,
  '#': 556,
  $: 556,
  '%': 889,
  '&': 667,
  "'": 191,
  '(': 333,
  ')': 333,
  '*': 389,
  '+': 584,
  ',': 278,
  '-': 333,
  '.': 278,
  '/': 278,
  ':': 278,
  ';': 278,
  '<': 584,
  '=': 584,
  '>': 584,
  '?': 556,
  '@': 1015,
  '[': 278,
  '\\': 278,
  ']': 278,
  '^': 469,
  _: 556,
  '`': 333,
  '{': 334,
  '|': 260,
  '}': 334,
  '~': 584,
  '×': 584,
  '–': 556,
  '—': 1000,
  '’': 222,
  '²': 333,
  A: 667,
  B: 667,
  C: 722,
  D: 722,
  E: 667,
  F: 611,
  G: 778,
  H: 722,
  I: 278,
  J: 500,
  K: 667,
  L: 556,
  M: 833,
  N: 722,
  O: 778,
  P: 667,
  Q: 778,
  R: 722,
  S: 667,
  T: 611,
  U: 722,
  V: 667,
  W: 944,
  X: 667,
  Y: 667,
  Z: 611,
  a: 556,
  b: 556,
  c: 500,
  d: 556,
  e: 556,
  f: 278,
  g: 556,
  h: 556,
  i: 222,
  j: 222,
  k: 500,
  l: 222,
  m: 833,
  n: 556,
  o: 556,
  p: 556,
  q: 556,
  r: 333,
  s: 500,
  t: 278,
  u: 556,
  v: 500,
  w: 722,
  x: 500,
  y: 500,
  z: 500,
};
const DIGIT = 556;
const FALLBACK = 600;

/** Width of one line of Arial text at `size`, in canvas units. */
export function arialWidth(line: string, size: number): number {
  let units = 0;
  for (const ch of line) units += ARIAL[ch] ?? (/[0-9]/.test(ch) ? DIGIT : FALLBACK);
  return (units / 1000) * size;
}

/** Fabric's default line height is 1.16 em. */
export const LINE_HEIGHT = 1.16;

/** Box of a (possibly multi-line) label at `size`. */
export function labelSize(text: string, size: number): { w: number; h: number } {
  const lines = text.split('\n');
  return {
    w: Math.max(...lines.map((l) => arialWidth(l, size))),
    h: lines.length * size * LINE_HEIGHT,
  };
}
