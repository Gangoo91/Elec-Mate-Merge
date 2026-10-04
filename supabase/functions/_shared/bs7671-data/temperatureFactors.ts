// BS 7671 Table 4B1 - Temperature correction factors
export function getTemperatureFactor(ambientTemp: number, rating: '70C' | '90C'): number {
  const factors70C: Record<number, number> = {
    25: 1.03,
    30: 1.0,
    35: 0.94,
    40: 0.87,
    45: 0.79,
    50: 0.71,
    55: 0.61,
    60: 0.5,
  };

  // Read off the IMAGE of the printed Table 4B1 (BS7671_ocr.pdf, pdf p. 449),
  // 2026-10-04. This column was shifted one row (30 °C read 1.02, 35 °C 1.0 —
  // every Table 4B1 column is 1.00 at 30 °C by definition), over-rating every
  // 90 °C cable above 25 °C.
  const factors90C: Record<number, number> = {
    25: 1.02,
    30: 1.0,
    35: 0.96,
    40: 0.91,
    45: 0.87,
    50: 0.82,
    55: 0.76,
    60: 0.71,
    65: 0.65,
    70: 0.58,
    75: 0.5,
    80: 0.41,
  };

  const table = rating === '90C' ? factors90C : factors70C;

  // Find nearest temperature
  const temps = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);
  const nearestTemp = temps.reduce((prev, curr) =>
    Math.abs(curr - ambientTemp) < Math.abs(prev - ambientTemp) ? curr : prev
  );

  return table[nearestTemp] || 1.0;
}

// BS 7671 Table 4C1 - Grouping factors
// Row 1 (bunched in air, on a surface, embedded or enclosed), read off the
// printed Table 4C1, 2026-10-04. The previous steps (0.65 for 5, 0.60 for 6–9,
// 0.55 for 10+) over-stated Cg from five circuits up, which under-sizes cable.
// Table 4C1 prints 1–9, 12, 16 and 20; a count between columns takes the next
// column up, the conservative choice.
const GROUPING_BUNCHED: [number, number][] = [
  [1, 1.0], [2, 0.8], [3, 0.7], [4, 0.65], [5, 0.6], [6, 0.57], [7, 0.54],
  [8, 0.52], [9, 0.5], [12, 0.45], [16, 0.41], [20, 0.38],
];
export function getGroupingFactor(circuitCount: number): number {
  if (circuitCount <= 1) return 1.0;
  const row = GROUPING_BUNCHED.find(([n]) => n >= circuitCount);
  return row ? row[1] : 0.38; // beyond 20: the table stops; 0.38 is its last value
}
