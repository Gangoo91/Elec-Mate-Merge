/**
 * Where the MRR chart's y-axis starts, stops and draws its gridlines.
 *
 * Split out from the chart because it is pure arithmetic with a lot of edge
 * cases, and because it was wrong in ways a renderer cannot show you.
 *
 * ── WHAT WAS WRONG ───────────────────────────────────────────────────────
 *
 * 1. THE TOP GRIDLINE WAS NEVER LABELLED. The tick loop ran
 *    `for (t = lo + step; t < hi; t += step)` — excluding `hi`. At £4,652 MRR
 *    the domain already reached £5,000, but the highest LABEL was £4.5k, so the
 *    line visibly ran above the top number and the chart read as capped.
 *
 * 2. THE STEP CAME FROM THE RANGE, NOT THE MAGNITUDE:
 *
 *        const step = max - min > 1500 ? 500 : max - min > 600 ? 250 : 100;
 *
 *    That is a sparkline's logic. It sizes gridlines to how much the line
 *    MOVED, so a flat month at £50k would still draw £100 gridlines.
 *
 * 3. IT DID NOT START AT ZERO. A floating floor — the rung at or below the
 *    lowest point — is what a sparkline does, and on a revenue chart it lies:
 *    it turns a 4% month into a line that climbs the full height of the panel.
 *    Growth has to be read against the whole number, so the axis starts at £0.
 *
 * ── THE LADDER ───────────────────────────────────────────────────────────
 *
 * `lo` is always 0. The ceiling is the next rung strictly above the data —
 * and above the target, when there is one, so the target line is never drawn
 * along the top edge with no room to see the gap to it. Rungs are chosen so
 * that a fifth of any of them is itself a round number, which is what makes
 * five evenly-spaced gridlines land on values worth printing.
 */

/**
 * Ceilings worth having, in pounds. Each divides by 5 into a round gridline
 * (£1,000 → £200, £10,000 → £2,000, £25,000 → £5,000), which is why the list
 * is hand-picked rather than generated.
 *
 * Deliberately CLOSE-SPACED. A coarse ladder (1k, 2k, 5k, 10k) put £4,914 of
 * MRR on a £10,000 axis, and a year of growth then sat in the bottom 40% of
 * the panel and read as flat. The rungs are near enough together that the
 * data fills most of the height whatever it is worth.
 */
const RUNGS = [
  100, 150, 200, 250, 300, 400, 500, 1_000, 1_500, 2_000, 2_500, 3_000, 4_000, 5_000, 6_000, 8_000, 10_000, 12_500, 15_000,
  20_000, 25_000, 30_000, 40_000, 50_000, 75_000, 100_000, 150_000, 200_000, 250_000, 500_000,
  1_000_000,
];

/** Five gridlines, `hi` included, is a grid; twenty is wallpaper. */
const DIVISIONS = 5;

export interface MrrScale {
  /** Bottom of the domain. Always 0 — see point 3 above. */
  lo: number;
  /** Top of the domain — always a labelled tick. */
  hi: number;
  /** Every gridline, both 0 and `hi` included. */
  ticks: number[];
}

/**
 * Sized by the DATA ALONE — a target does not stretch it.
 *
 * Letting the goal lift the ceiling was tried and is wrong: a £5,000 target
 * against £4,914 of MRR produced a £10,000 axis, which flattened the line into
 * the bottom of the panel. The caller draws the target where it falls and
 * omits it when it does not fit — a goal above the ceiling is one you have not
 * reached, which the "Road to £X" panel says in words anyway.
 *
 * @param values every point currently in view
 */
export function mrrScale(values: number[]): MrrScale {
  const finite = values.filter((v) => Number.isFinite(v));

  // An empty or all-NaN series still has to produce a drawable axis rather
  // than a NaN domain, which recharts renders as a blank panel with no clue.
  const peak = Math.max(0, ...finite);

  // Strictly above, so the line is never drawn along the top edge. Past the top rung fall back to rounding up to the nearest 250k.
  const hi = RUNGS.find((r) => r > peak) ?? Math.ceil((peak + 1) / 250_000) * 250_000;
  const step = hi / DIVISIONS;

  const ticks: number[] = [];
  // `<= hi`, deliberately. Excluding it is the bug this file exists to fix.
  for (let t = 0; t <= hi + 1e-6; t += step) ticks.push(Math.round(t));

  return { lo: 0, hi, ticks };
}

/**
 * Axis labels. `£4.5k` below ten thousand, `£12k` above — a decimal at that
 * size is noise, and the tick column is only 44px wide on a phone.
 */
export function formatAxisTick(v: number): string {
  if (v === 0) return '£0';
  if (v < 1_000) return `£${v}`;
  const k = v / 1_000;
  return `£${k >= 10 ? Math.round(k) : Number(k.toFixed(1))}k`;
}
