/* Sentence helpers for the Quality & Compliance headers (8 Oct 2026). */

/** Joins sentence parts: "a, b and c". */
export function joinAnd(parts: string[]): string {
  const p = parts.filter(Boolean);
  if (p.length <= 1) return p[0] ?? '';
  return `${p.slice(0, -1).join(', ')} and ${p[p.length - 1]}`;
}

/** "1 thing" / "2 things". */
export const plural = (n: number, one: string, many?: string) =>
  `${n} ${n === 1 ? one : (many ?? `${one}s`)}`;

/** Capitalises the first letter of a sentence. */
export const cap = (s: string) => (s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : s);
