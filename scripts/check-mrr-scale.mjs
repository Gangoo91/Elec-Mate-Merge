#!/usr/bin/env node
/**
 * check:mrr-scale
 * ─────────────────────────────────────────────────────────────────────────────
 * The MRR chart's y-axis arithmetic.
 *
 * WHY THIS EXISTS. The old scale had two faults, and neither could be seen by
 * anything we run:
 *
 *   1. The tick loop excluded the top of the domain, so at £4,652 MRR the axis
 *      labelled £4.5k as its highest gridline while the line ran above it. The
 *      chart read as capped. Nobody noticed until Andrew looked at it.
 *   2. Gridline spacing came from `max - min` — how far the line MOVED — not
 *      from the value. A flat month at £50k would have drawn £100 gridlines.
 *
 * Both are silent: tsc, eslint and a render harness all pass on a chart whose
 * axis is quietly lying. Only arithmetic catches arithmetic.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(resolve(root, 'src/components/admin/overview/mrrScale.ts'), 'utf8');

// Strip the types rather than pulling in a bundler — this file is pure JS once
// the annotations are gone, and the check should not need a build step.
const js = src
  .replace(/export interface [\s\S]*?\n}\n/g, '')
  .replace(/: MrrScale/g, '')
  .replace(/: number\[\]/g, '')
  .replace(/: number \| null \| undefined/g, '')
  .replace(/goal\?: number \| null/g, 'goal')
  .replace(/\(ceiling: number\): number/g, '(ceiling)')
  .replace(/\(v: number\): string/g, '(v)')
  .replace(/const ticks: number\[\] = \[\]/g, 'const ticks = []')
  .replace(
    /const finite = values\.filter\(\(v\) => Number\.isFinite\(v\)\)/,
    'const finite = values.filter((v) => Number.isFinite(v))'
  )
  .replace(/export /g, '');

const mod = new Function(`${js}; return { mrrScale, formatAxisTick };`)();
const { mrrScale, formatAxisTick } = mod;

const failures = [];
const check = (name, fn) => {
  try {
    fn();
  } catch (e) {
    failures.push(`${name}: ${e.message}`);
  }
};
const eq = (a, b, what) => {
  const A = JSON.stringify(a);
  const B = JSON.stringify(b);
  if (A !== B) throw new Error(`${what} — got ${A}, expected ${B}`);
};
const ok = (cond, what) => {
  if (!cond) throw new Error(what);
};

// The exact case from the screenshot: £4,652 MRR over a ~£2.9k–£4.65k series.
const real = [2900, 3100, 3400, 3914, 4200, 4652];

check('the top gridline is LABELLED — the original bug', () => {
  const { hi, ticks } = mrrScale(real);
  ok(
    ticks.includes(hi),
    `hi ${hi} is missing from the ticks — the line will run above the top label`
  );
});

check('£4,652 tops out at £5,000, not £4,500', () => {
  eq(mrrScale(real).hi, 5000, 'ceiling');
});

check('every point fits inside the domain', () => {
  const { lo, hi } = mrrScale(real);
  ok(Math.max(...real) <= hi, 'the highest point is above the ceiling');
  ok(Math.min(...real) >= lo, 'the lowest point is below the floor');
});

check('gridlines are evenly spaced', () => {
  const { ticks } = mrrScale(real);
  ok(
    ticks.every((t, i) => i === 0 || t - ticks[i - 1] === 1000),
    `uneven steps: ${ticks}`
  );
});

check('a flat series still gets a usable domain', () => {
  // The old logic sized the step from max-min, so zero movement meant a step
  // of 100 and a domain with no height.
  const { lo, hi, ticks } = mrrScale([4652, 4652, 4652]);
  ok(hi > lo, 'flat series collapsed the domain');
  ok(ticks.length >= 2, 'flat series produced fewer than two gridlines');
});

check('a flat series at £50k does NOT draw hundreds of gridlines', () => {
  // The headline failure of the old range-based step.
  const { ticks } = mrrScale([50000, 50000, 50010]);
  ok(ticks.length <= 12, `${ticks.length} gridlines is wallpaper, not a grid`);
});

check('the ladder reaches £10k, £15k, £20k as asked', () => {
  eq(mrrScale([9800]).hi, 10000, '£9,800 ceiling');
  eq(mrrScale([10400]).hi, 12500, '£10,400 ceiling');
  eq(mrrScale([14900]).hi, 15000, '£14,900 ceiling');
  eq(mrrScale([15200]).hi, 20000, '£15,200 ceiling');
  eq(mrrScale([5200]).hi, 6000, '£5,200 ceiling — the rung above £5k');
});

/*
  THE AXIS STARTS AT ZERO.

  This replaced a floating floor — the rung at or below the lowest point —
  which is what a sparkline does and what a revenue chart must not: it turned
  a 4% month into a line climbing the full height of the panel. Growth is only
  readable against the whole number. Andrew's call, 21 Sep.
*/
check('the axis always starts at £0', () => {
  eq(mrrScale(real).lo, 0, 'floor for a series bottoming at £2,900');
  eq(mrrScale([3020, 4652]).lo, 0, 'floor when the low is just above a rung');
  eq(mrrScale([49000, 50000]).lo, 0, 'floor at £50k');
  eq(mrrScale([120, 300]).lo, 0, 'floor for a tiny series');
});

/*
  THE TARGET DOES NOT SIZE THE AXIS.

  It did briefly, to keep the dashed target line off the top edge. That put
  £4,914 of MRR on a £10,000 axis and a year of growth then sat in the bottom
  40% of the panel reading as flat — which is the opposite of what the chart is
  for. Andrew's call, 21 Sep: size it by the data, draw the target where it
  falls, omit it when it does not fit.
*/
check('the axis is sized by the data alone', () => {
  eq(mrrScale([2884, 4914]).hi, 5000, 'ceiling for £4,914 of MRR');
  ok(4914 / mrrScale([2884, 4914]).hi > 0.9, 'the line should fill the panel');
});

/*
  THE LADDER IS CLOSE-SPACED, so the data fills most of the panel height at
  every scale. A coarse ladder (1k, 2k, 5k, 10k) is what put £4,914 on a
  £10,000 axis in the first place.
*/
check('the data fills most of the panel at every scale', () => {
  for (const peak of [300, 1200, 2884, 4914, 5200, 9800, 13000, 47000, 120000]) {
    const { hi } = mrrScale([0, peak]);
    const fill = peak / hi;
    ok(fill >= 0.75, `peak £${peak} fills only ${Math.round(fill * 100)}% of a £${hi} axis`);
  }
});


/*
  Five divisions at EVERY scale. The old step came from `max - min`, so the
  gridline count swung with the wobble of the line: hundreds on a flat £50k
  month, a handful on a volatile one.
*/
check('every scale draws the same six gridlines', () => {
  for (const [vals, goal] of [
    [[300], null],
    [real, null],
    [[2884, 4914], 5000],
    [[9800], 10000],
    [[13000], 20000],
    [[120000], null],
    [[50000, 50000, 50010], null],
  ]) {
    const { ticks } = mrrScale(vals, goal);
    eq(ticks.length, 6, `gridline count for ${JSON.stringify(vals)} goal ${goal}`);
  }
});

check('every gridline is a round number', () => {
  for (const [vals, goal] of [
    [real, null],
    [[2884, 4914], 5000],
    [[13000], 20000],
    [[120000], null],
  ]) {
    const { ticks } = mrrScale(vals, goal);
    ok(
      ticks.every((t) => Number.isInteger(t) && t % 50 === 0),
      `ragged gridlines for ${JSON.stringify(vals)}: ${ticks}`
    );
  }
});

check('the floor never goes negative', () => {
  ok(mrrScale([120, 300]).lo >= 0, 'negative MRR floor');
  ok(mrrScale([0, 0]).lo >= 0, 'negative floor on an all-zero series');
});

check('a nearby target lands ON the ceiling, not a rung past it', () => {
  // Including the goal in the scale pushed £4,652 to a £6,000 ceiling — the
  // goal became the max, then the "don't sit on the top edge" rule bumped it.
  const { hi } = mrrScale(real);
  eq(hi, 5000, 'ceiling with a £5,000 target in play');
  ok(5000 <= hi, 'the £5,000 target does not fit under its own ceiling');
});

check('an empty series produces a drawable axis, not NaN', () => {
  // recharts renders a NaN domain as a blank panel with no error.
  const { lo, hi, ticks } = mrrScale([]);
  ok(Number.isFinite(lo) && Number.isFinite(hi), 'NaN domain');
  ok(ticks.length >= 2 && ticks.every(Number.isFinite), 'NaN ticks');
});

check('NaNs in the series are ignored rather than poisoning the domain', () => {
  const { lo, hi } = mrrScale([NaN, 3000, 4652, NaN]);
  ok(Number.isFinite(lo) && Number.isFinite(hi), 'NaN leaked into the domain');
});

check('tick labels stay short enough for the 44px axis column', () => {
  eq(formatAxisTick(4500), '£4.5k', 'sub-£10k label');
  eq(formatAxisTick(12500), '£13k', 'above £10k a decimal is noise');
  eq(formatAxisTick(0), '£0', 'zero');
  ok(
    mrrScale([14900]).ticks.every((t) => formatAxisTick(t).length <= 6),
    'a tick label is too wide for the axis column'
  );
});

if (failures.length === 0) {
  console.log('✔ check:mrr-scale — 16 checks, the axis labels its ceiling and scales by value');
  process.exit(0);
}
console.error('\n✖ check:mrr-scale — the y-axis arithmetic is wrong\n');
for (const f of failures) console.error(`    ${f}`);
console.error('');
process.exit(1);
