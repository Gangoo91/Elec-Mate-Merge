import React from 'react';
import { createRoot } from 'react-dom/client';
import { MrrChart, type MrrPoint } from '@/components/admin/overview/MrrHero';
import { nextMilestoneTarget } from '@/lib/mrrForecast';

/*
 * The MRR chart, rendered at the real numbers from the dashboard.
 *
 * A chart is the one thing you cannot check by reading: the axis arithmetic
 * can be right and the picture still wrong. The defect that started this was
 * exactly that shape — the domain reached £5,000 and the top gridline was
 * simply never labelled, so the line ran above the highest number on the axis
 * and nobody could see why.
 */
const errors: string[] = [];
window.addEventListener('error', (e) => errors.push('window.error: ' + e.message));
const origErr = console.error;
console.error = (...a: unknown[]) => {
  errors.push('console.error: ' + a.map(String).join(' '));
  origErr(...a);
};

const q = new URLSearchParams(location.search);
const peak = Number(q.get('peak') || '4652');

// A rising series shaped like the real one: ~64% of the way up at the start,
// both rails present, ending exactly on `peak`.
const DAYS = 91;
const points: MrrPoint[] = Array.from({ length: DAYS }, (_, i) => {
  const t = i / (DAYS - 1);
  const total = Math.round(peak * (0.62 + 0.38 * t));
  return {
    day: `2026-0${6 + Math.floor(i / 31)}-${String((i % 31) + 1).padStart(2, '0')}`,
    total,
    stripe: Math.round(total * 0.67),
    rc: Math.round(total * 0.33),
  };
});

createRoot(document.getElementById('root')!).render(
  <div style={{ width: 900 }}>
    <MrrChart points={points} range={90} height={300} goal={nextMilestoneTarget(peak)} showRails />
  </div>
);

/*
 * Poll rather than guess a delay.
 *
 * ResponsiveContainer measures its parent on a later frame — recharts logs
 * "width(-1) and height(-1)" on the first pass and draws nothing. A fixed
 * 1600ms wait read the panel before the axis existed and reported "no labels"
 * against a chart that was about to render perfectly. A harness that fails on
 * its own timing teaches you to ignore it.
 */
const started = Date.now();
const settle = setInterval(() => {
  const text = document.getElementById('root')!.textContent || '';
  /*
    Read the y-axis tick elements, NOT the panel's text.

    Scraping textContent for /£([\d.]+)k/ had two faults. It could not see
    `£0` — the one label that matters now the scale is zero-based, because it
    carries no `k`. And widening it to match bare pounds swept up the target
    caption and the "30 days ago · £3,914" annotation, so `top` became the
    largest number ANYWHERE on the panel rather than the top of the axis.
    Recharts labels its ticks; ask it directly.
  */
  const ticks = Array.from(
    // Axis ticks only. The x-axis shares this class but its labels are month
    // names, and the target caption / "30 days ago" annotation are
    // `.recharts-label` — so filtering tick values to the ones that start with
    // a pound sign isolates the y-axis exactly.
    document.querySelectorAll('.recharts-cartesian-axis-tick-value')
  )
    .map((el) => (el.textContent || '').trim())
    .map((t) => {
      const m = t.match(/^£([\d.]+)(k?)$/);
      return m ? (m[2] ? Number(m[1]) * 1000 : Number(m[1])) : NaN;
    })
    .filter((n) => Number.isFinite(n));

  const timedOut = Date.now() - started > 8000;
  if (ticks.length === 0 && !timedOut) return;
  clearInterval(settle);

  const top = ticks.length ? Math.max(...ticks) : 0;
  if (top === 0) errors.push('no £k axis labels rendered at all');

  /*
    THE AXIS STARTS AT £0. A floating floor makes a 4% month climb the full
    height of the panel; growth is only readable against the whole number.
    Andrew's call, 21 Sep — and invisible to tsc, eslint and the eye alike.
  */
  if (!ticks.includes(0)) {
    errors.push(`the axis does not start at £0 — lowest label is £${Math.min(...ticks)}`);
  }
  // THE ORIGINAL BUG: the highest label must be at or above the peak, or the
  // line is drawn above every number on the axis.
  if (top < peak) {
    errors.push(`top axis label £${top} is BELOW the peak £${peak} — the line runs off the top`);
  }

  const goal = nextMilestoneTarget(peak);
  const goalFits = goal != null && goal <= top;
  const dashed = document.querySelector('[stroke-dasharray]');
  // Drawn exactly when it fits, and never when it does not — a target clipped
  // off the top of the panel is worse than no target at all.
  if (goalFits && !dashed) errors.push(`target £${goal} fits under £${top} but is not drawn`);
  if (!goalFits && dashed)
    errors.push(`a target line is drawn but £${goal} is above the ceiling £${top}`);

  /*
    ONE series. There used to be two thin rails (Stripe, Stores) under the
    total, and this checked both were drawn. They were dropped on 21 Sep: with
    three lines recharts called the tooltip formatter once per series and each
    call re-appended the same breakdown, so the tooltip printed "MRR" three
    times with three different numbers against it. What is asserted now is the
    absence — a rail creeping back brings that tooltip back with it.
  */
  const strokes = Array.from(document.querySelectorAll('path[fill="none"][stroke]')).map((el) =>
    (el.getAttribute('stroke') || '').toLowerCase()
  );
  for (const [colour, name] of [
    ['#60a5fa', 'Stripe'],
    ['#34d399', 'Stores'],
  ] as const) {
    if (strokes.includes(colour)) {
      errors.push(`the ${name} rail is drawn again (${colour}) — the chart is one line now`);
    }
  }

  document.getElementById('res')!.textContent = errors.length
    ? 'FAIL::' + errors.join(' ||| ')
    : `PASS::peak £${peak} · top £${top} · target ${goalFits ? `£${goal}` : 'off-scale, not drawn'} · ${ticks.length} ticks`;
}, 150);
