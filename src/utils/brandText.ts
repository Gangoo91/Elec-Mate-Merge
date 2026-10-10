/** Black or white text, whichever reads on the firm's colour. */
export function textOn(hex: string): string {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const L = 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? '#ffffff' : '#0a0a0a';
}
