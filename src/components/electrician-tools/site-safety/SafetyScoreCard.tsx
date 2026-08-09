import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useHaptic } from '@/hooks/useHaptic';
import type { HudsonLevel, WeeklySummary } from '@/hooks/useWeeklySafetySummary';

/**
 * The safety score, as a chart rather than a number in a box.
 *
 * It used to be one KPI tile among four: the figure `40`, the words "Needs
 * attention", and nothing to say WHY it was 40 or what to do about it. The
 * score is the only composite figure on the page — the other three are counts
 * you could get by opening the module — so it was carrying the least
 * information per pixel while sitting in the most prominent slot.
 *
 * What is drawn here is real, and only what is real:
 *
 *  - an arc for score / 100, because the score genuinely is out of 100;
 *  - a bar per dimension against ITS OWN max, because the five dimensions are
 *    not weighted equally (`dimensionMax` differs per dimension, so plotting
 *    raw values side by side would misrepresent a 9/10 as worse than a 12/25);
 *  - the delta against `previousScore`, which the summary actually returns.
 *
 * Deliberately NOT drawn: a trend line. The summary gives exactly two points —
 * this score and the previous one. A sparkline through two points is a
 * decorative invention, and inventing a shape for safety data is worse than
 * showing none.
 */

const CATEGORY_LABEL: Record<keyof WeeklySummary['dimensions'], string> = {
  compliance: 'Compliance',
  activity: 'Activity',
  proactive: 'Proactive',
  quality: 'Quality',
  outcomes: 'Outcomes',
};

const HUDSON_LABEL: Record<HudsonLevel, string> = {
  insufficient_data: 'Building your picture',
  critical: 'Critical',
  reactive: 'Reactive',
  calculative: 'Calculative',
  proactive: 'Proactive',
  generative: 'Generative',
};

/** Score bands. Volt is reserved for the healthy end so it still means something. */
function bandOf(score: number): { stroke: string; text: string } {
  if (score >= 80) return { stroke: 'text-emerald-400', text: 'text-emerald-400' };
  if (score >= 60) return { stroke: 'text-elec-yellow', text: 'text-elec-yellow' };
  if (score >= 40) return { stroke: 'text-amber-400', text: 'text-amber-400' };
  return { stroke: 'text-red-400', text: 'text-red-400' };
}

export function SafetyScoreCard({
  summary,
  isLoading,
  onClick,
}: {
  summary?: WeeklySummary;
  isLoading?: boolean;
  onClick?: () => void;
}) {
  const haptic = useHaptic();
  /*
   * The number is withheld until there is enough to judge on.
   *
   * Compliance starts at 30 and Outcomes at 10 and both only deduct, so an
   * empty account scores 40 — and 40 was published as "Critical". That told
   * every new user their safety was the worst it could be before they had
   * done anything, and told a spotless sole trader in a quiet quarter the
   * same. The research on composite safety indices is blunt about where that
   * leads: a score used punitively pushes reporting underground, and
   * self-reported near misses are 15 of these points.
   *
   * Below the coverage minimum the card shows what it is still missing and
   * one thing to do, and no verdict at all.
   *
   * Defaults to TRUE when the field is absent. The edge function is deployed
   * separately from this bundle, so for a window there will be clients running
   * this code against the old payload. Defaulting to false there would show
   * every user "0/10 signals — building your picture", which is worse than the
   * thing being fixed. Absent field → behave exactly as before.
   */
  const enoughEvidence = summary?.hasEnoughEvidence ?? true;
  const score = summary && enoughEvidence ? summary.safetyScore : null;
  const band = bandOf(score ?? 0);
  const coverage = summary?.coverage;

  /*
   * Gauge geometry. The first version used r=54 centred at y=70 inside a
   * 104-tall viewBox — the circle spanned y=16 to y=124, so the bottom third
   * of the arc was clipped away and the value stub rendered as a hook in the
   * corner. The box has to contain the arc:
   *
   *   240° sweep with the gap at the bottom → the arc reaches the top of the
   *   circle (cy - r) and comes down to cy + r·sin(30°) = cy + r/2.
   *   So it is 1.5·r tall and 2·r wide, plus half the stroke all round.
   */
  const R = 46;
  const CX = 60;
  const CY = 58; // 58 - 46 = 12 top, 58 + 23 = 81 bottom — inside a 96-tall box
  const SWEEP = 240;
  const CIRC = 2 * Math.PI * R;
  const arcLen = (SWEEP / 360) * CIRC;
  const filled = score != null ? (score / 100) * arcLen : 0;

  const GAUGE_PATH = describeArc(CX, CY, R, SWEEP);

  const delta = summary?.trendDelta ?? 0;
  const hasPrev = summary?.previousScore != null && summary.previousScore > 0;

  const dims = summary?.dimensions;
  const maxes = summary?.dimensionMax;

  return (
    <button
      type="button"
      onClick={
        onClick
          ? () => {
              haptic.light();
              onClick();
            }
          : undefined
      }
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-elec-yellow/70 p-4 text-left sm:p-5',
        CARD_SURFACE,
        onClick &&
          'touch-manipulation transition-[transform,filter] duration-150 active:scale-[0.99] active:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
      )}
    >
      {/* The volt hairline every hub card wears. A line, never a fill. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/90 to-elec-yellow/0"
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        {/* ── Arc ── */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="relative h-[96px] w-[120px]">
            <svg viewBox="0 0 120 96" className="h-full w-full" aria-hidden>
              {/* Track */}
              <path
                d={GAUGE_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
                className="text-white/[0.08]"
              />
              {/* Value */}
              {score != null && (
                <path
                  d={GAUGE_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${filled} ${CIRC}`}
                  className={cn(band.stroke, 'transition-[stroke-dasharray] duration-700 ease-out')}
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span
                className={cn(
                  'font-semibold leading-none tabular-nums tracking-tight',
                  score == null ? 'text-[28px] text-white' : 'text-[38px]',
                  score == null ? '' : band.text
                )}
              >
                {isLoading
                  ? '—'
                  : score != null
                    ? score
                    : `${coverage?.scored ?? 0}/${coverage?.total ?? 10}`}
              </span>
              <span className="mt-1 text-[11px] text-white">
                {score != null ? 'out of 100' : 'signals'}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white">
              {score != null ? 'Safety score' : 'Safety picture'}
            </p>
            {summary?.hudsonLevel && (
              <p className="mt-0.5 text-[12px] text-white">{HUDSON_LABEL[summary.hudsonLevel]}</p>
            )}
            {/* Only shown when there IS a previous score to compare against —
                "+0 vs last week" on a first-ever run is a fabricated baseline. */}
            {summary?.nextAction && (
              // Campbell Institute: collecting indicators changes nothing —
              // acting on them does. The card always carries the one next move.
              <p className="mt-2 max-w-[26ch] text-[12px] font-medium leading-snug text-elec-yellow">
                {summary.nextAction.label}
              </p>
            )}
            {score != null && hasPrev && (
              <p
                className={cn(
                  'mt-2 text-[12px] font-medium tabular-nums',
                  delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-red-400' : 'text-white'
                )}
              >
                {delta > 0 ? `▲ +${delta}` : delta < 0 ? `▼ ${delta}` : 'No change'}
                <span className="text-white"> vs last week</span>
              </p>
            )}
          </div>
        </div>

        {/* ── Dimension bars ── */}
        {dims && maxes && (
          <div className="min-w-0 flex-1 space-y-2">
            {(Object.keys(CATEGORY_LABEL) as (keyof typeof CATEGORY_LABEL)[]).map((key) => {
              const value = dims[key] ?? 0;
              const max = maxes[key] || 1;
              // Each bar is scaled to its OWN maximum. The dimensions are not
              // weighted equally, so a shared scale would rank them wrongly.
              const pct = Math.max(0, Math.min(1, value / max));
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="w-[86px] shrink-0 text-[11.5px] text-white">
                    {CATEGORY_LABEL[key]}
                  </span>
                  <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                    <span
                      className={cn(
                        'block h-full rounded-full transition-[width] duration-700 ease-out',
                        pct >= 0.8
                          ? 'bg-emerald-400'
                          : pct >= 0.5
                            ? 'bg-elec-yellow'
                            : pct > 0
                              ? 'bg-amber-400'
                              : 'bg-red-400'
                      )}
                      style={{ width: `${Math.max(pct * 100, value > 0 ? 4 : 0)}%` }}
                    />
                  </span>
                  <span className="w-[46px] shrink-0 text-right text-[11.5px] tabular-nums text-white">
                    {value}/{max}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </button>
  );
}

/**
 * A gauge arc: `sweep` degrees with the gap centred on the bottom.
 *
 * Angles here are clock angles — 0 is the top, 90 the right, 180 the bottom.
 * The gap is (360 - sweep) wide and sits astride 180, so the arc runs from
 * `180 + gap/2` clockwise, through the top, to `180 - gap/2`.
 */
function describeArc(cx: number, cy: number, r: number, sweep: number): string {
  const gap = 360 - sweep;
  const from = 180 + gap / 2;
  const to = 180 - gap / 2;
  const p1 = polar(cx, cy, r, from);
  const p2 = polar(cx, cy, r, to);
  const largeArc = sweep > 180 ? 1 : 0;
  // sweep-flag 1 = clockwise in SVG's y-down space, which is the direction a
  // gauge fills.
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

/** Clock angle → point. 0 is the top of the circle. */
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default SafetyScoreCard;
