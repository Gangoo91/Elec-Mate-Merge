import { createRoot } from 'react-dom/client';
import {
  KpiTile,
  Sparkline,
  Delta,
  ACCENT,
  BLUE,
  AQUA,
  GOOD,
} from '@/components/admin/overview/primitives';

/*
 * The six-figure KPI strip, at the real numbers from the dashboard.
 *
 * The defect this guards is alignment, and alignment is invisible to every
 * other tool. "Churn, September so far" wrapped to two lines, which pushed its
 * number and its footnote below the five tiles beside it — the strip read as
 * five tiles and a mistake. tsc and eslint have nothing to say about a title
 * that is one word too long.
 */
const errors: string[] = [];
window.addEventListener('error', (e) => errors.push('window.error: ' + e.message));
const origErr = console.error;
console.error = (...a: unknown[]) => {
  errors.push('console.error: ' + a.map(String).join(' '));
  origErr(...a);
};

const rising = [40, 44, 43, 52, 58, 61, 69, 74];
const falling = [74, 70, 66, 61, 55, 52, 48, 44];
const noisy = [110, 96, 140, 118, 132, 104, 150, 140];

/*
 * `?long=1` restores the labels as they were BEFORE the fix — the ones that
 * actually wrapped. Without this the guard is decorative: at 1440 and 1180 no
 * title in the shipped set is long enough to wrap, so the height floors that
 * hold the numbers on one baseline are never exercised and removing them still
 * passes. This mode is the regression, kept alive on purpose.
 */
const LONG = new URLSearchParams(location.search).has('long');
const lbl = (short: string, long: string) => (LONG ? long : short);

const TILES = [
  {
    label: 'Paying',
    value: '474',
    accent: BLUE,
    series: rising,
    invert: false,
    delta: (
      <Delta dir="up" tone="good">
        69 on Stripe in 90 days
      </Delta>
    ),
    definition: 'Stripe + stores',
  },
  {
    label: 'On trial',
    value: '57',
    accent: AQUA,
    series: noisy,
    invert: false,
    delta: undefined,
    definition: '≈ 27 will pay if 48% holds',
  },
  {
    label: lbl('Trial conversion', 'Trial conversion rate'),
    value: '48%',
    accent: ACCENT,
    series: falling,
    invert: false,
    delta: (
      <Delta dir="down" tone="bad">
        from 54% in June
      </Delta>
    ),
    definition: 'of 601 trials that ended in 90 days, 287 paid',
  },
  // The tile that broke the row: its title used to be "Churn, September so far".
  {
    label: lbl('Churn · Sep', 'Churn, September so far'),
    value: '10%',
    accent: GOOD,
    series: falling,
    invert: true,
    delta: (
      <Delta dir="down" tone="good">
        on pace for 14% · August 16%
      </Delta>
    ),
    definition: '40 paid then left since 1 Sep · 55 in August',
  },
  {
    label: 'Active today',
    value: '140',
    accent: BLUE,
    series: noisy,
    invert: false,
    delta: (
      <Delta dir="up" tone="good">
        vs 110 a day avg
      </Delta>
    ),
    definition: 'seen in the last 24 h',
  },
  {
    label: lbl('Signups, 90 days', 'Signups, last 90 days'),
    value: '835',
    accent: ACCENT,
    series: rising,
    invert: false,
    delta: (
      <Delta dir="up" tone="good">
        66% vs previous 90
      </Delta>
    ),
    definition: 'accounts created',
  },
];

createRoot(document.getElementById('root')!).render(
  <div className="px-6 py-4">
    <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-6 lg:gap-x-5">
      {TILES.map((t) => (
        <KpiTile
          key={t.label}
          label={t.label}
          value={t.value}
          delta={t.delta}
          definition={t.definition}
          viz={<Sparkline series={t.series} accent={t.accent} invert={t.invert} />}
        />
      ))}
    </div>
  </div>
);

setTimeout(() => {
  const tiles = Array.from(document.querySelectorAll('#root .grid > *'));
  if (tiles.length !== 6) errors.push(`expected 6 tiles, rendered ${tiles.length}`);

  /*
   * THE BUG: every big number must sit on the same baseline. A wrapped title
   * used to push one tile's value down and nothing flagged it.
   */
  const valueTops = tiles.map((t) => {
    const el = Array.from(t.querySelectorAll('div')).find((d) =>
      /^(£?[\d,]+%?|—)$/.test((d.textContent || '').trim())
    );
    return el ? Math.round(el.getBoundingClientRect().top) : NaN;
  });
  const spread = Math.max(...valueTops) - Math.min(...valueTops);
  if (!Number.isFinite(spread)) errors.push('could not find every tile value');
  else if (spread > 1)
    errors.push(`tile values sit on ${spread}px of different baselines — they must align`);

  // Sparklines must all be drawn, and a falling series must not wear the
  // "good" colour just because it was passed one.
  const svgs = tiles.map((t) => t.querySelector('svg'));
  if (svgs.some((s) => !s)) errors.push('a tile is missing its sparkline');
  const strokes = tiles.map((t) =>
    (t.querySelector('svg path[fill="none"][stroke]')?.getAttribute('stroke') || '').toLowerCase()
  );
  if (strokes[2] !== '#ec835a')
    errors.push(`falling Trial conversion should be warned in SERIOUS, got ${strokes[2]}`);
  if (strokes[3] !== '#0ca30c'.toLowerCase())
    errors.push(`falling churn is GOOD news and should wear the accent, got ${strokes[3]}`);
  if (strokes[0] !== '#3987e5')
    errors.push(`rising Paying should wear its accent, got ${strokes[0]}`);

  // Each sparkline carries a baseline at its starting value.
  if (tiles.some((t) => !t.querySelector('svg line[stroke-dasharray]')))
    errors.push('a sparkline has no starting-value baseline');

  if (document.documentElement.scrollWidth > window.innerWidth + 0.5)
    errors.push('the strip scrolls sideways');

  document.getElementById('res')!.textContent = errors.length
    ? 'FAIL::' + errors.join(' ||| ')
    : `PASS::6 tiles · values aligned to ${spread}px · direction-coloured · baselines drawn`;
}, 900);
