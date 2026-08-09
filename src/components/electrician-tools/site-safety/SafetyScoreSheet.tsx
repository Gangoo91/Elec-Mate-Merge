import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type { WeeklySummary, HudsonLevel, ScoreCategory } from '@/hooks/useWeeklySafetySummary';

interface SafetyScoreSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary?: WeeklySummary;
  isLoading?: boolean;
}

const HUDSON_LABEL: Record<HudsonLevel, string> = {
  // Not a band — the absence of one. Shown while coverage is below the
  // minimum, so a new account is never handed "Critical" on day one.
  insufficient_data: 'Building your picture',
  critical: 'Critical',
  reactive: 'Reactive',
  calculative: 'Calculative',
  proactive: 'Proactive',
  generative: 'Generative',
};

const HUDSON_SUB: Record<HudsonLevel, string> = {
  insufficient_data: 'Not enough logged yet to score fairly',
  critical: 'Immediate intervention',
  reactive: 'Compliance only — gaps showing',
  calculative: 'Systems in place — room to grow',
  proactive: 'Workforce engaged',
  generative: 'H&S is how you work',
};

const CATEGORY_LABEL: Record<ScoreCategory, string> = {
  compliance: 'Compliance',
  activity: 'Activity',
  proactive: 'Proactive culture',
  quality: 'Quality',
  outcomes: 'Outcomes',
};

const CATEGORY_DESC: Record<ScoreCategory, string> = {
  compliance: "What's overdue, expired, or unreported right now",
  activity: 'Are you using safety tools regularly',
  proactive: 'Are you surfacing risks before they bite',
  quality: 'Depth and completeness of your safety records',
  outcomes: 'Accident-free posture',
};

/**
 * Safety score breakdown — editorial bottom sheet.
 *
 * Lite version of the Employer Hub scoring model (see Linear ELE-1000).
 * 5 dimensions: Compliance / Activity / Proactive / Quality / Outcomes.
 * Hard cap on unreported RIDDOR. Hudson Ladder maturity label.
 */
export const SafetyScoreSheet: React.FC<SafetyScoreSheetProps> = ({
  open,
  onOpenChange,
  summary,
  isLoading,
}) => {
  /*
   * Same gate as the card. Without it the sheet went on handing out
   * "40 · CRITICAL · Immediate intervention" to an account that simply has not
   * logged anything yet — the exact verdict the coverage work exists to stop,
   * one tap behind a card that had already stopped saying it.
   */
  const enoughEvidence = summary?.hasEnoughEvidence ?? true;
  const coverage = summary?.coverage;
  const score = summary && enoughEvidence ? summary.safetyScore : null;
  const hudsonLevel = summary?.hudsonLevel;
  const hudsonLabel = hudsonLevel ? HUDSON_LABEL[hudsonLevel] : '';
  const hudsonSub = hudsonLevel ? HUDSON_SUB[hudsonLevel] : '';
  const trendDelta = summary?.trendDelta ?? 0;
  const trend = summary?.trend ?? 'stable';
  const hardCap = summary?.hardCap;

  const scoreColor =
    score == null
      ? 'text-white'
      : hudsonLevel === 'generative'
        ? 'text-emerald-400'
        : hudsonLevel === 'proactive'
          ? 'text-emerald-400'
          : hudsonLevel === 'calculative'
            ? 'text-elec-yellow'
            : hudsonLevel === 'reactive'
              ? 'text-amber-400'
              : 'text-red-400';

  const trendLabel =
    trend === 'improving'
      ? `▲ +${trendDelta}`
      : trend === 'declining'
        ? `▼ ${trendDelta}`
        : 'Stable';
  const trendTone =
    trend === 'improving'
      ? 'text-emerald-400'
      : trend === 'declining'
        ? 'text-red-400'
        : 'text-white';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] sm:h-[85vh] rounded-t-2xl bg-[hsl(0_0%_8%)] border-white/[0.08] p-0 overflow-hidden flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-2 text-left">
          {/* No uppercase letterspaced kicker restating the title beneath it —
              that is the deck style the design system removes on sight. */}
          <SheetTitle className="text-[22px] sm:text-[26px] font-bold tracking-tight leading-tight text-white">
            {enoughEvidence ? 'Your safety score' : 'Building your picture'}
          </SheetTitle>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            {enoughEvidence
              ? `Scored across five dimensions over the last ${summary?.windowDays ?? 90} days.`
              : `Scored on ${coverage?.scored ?? 0} of ${coverage?.total ?? 10} signals — not enough yet to score fairly.`}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-8">
          {/* Hard cap banner */}
          {hardCap && (
            <section className="bg-[hsl(0_0%_10%)] border border-red-500/40 rounded-2xl p-5">
              <div className="flex items-baseline gap-3">
                <span className="shrink-0 text-[13px] font-semibold text-red-400">Cap active</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14.5px] font-semibold text-white">
                    Score capped at {hardCap.cap}/100
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white">
                    {hardCap.reason}
                    {hardCap.deadline && (
                      <>
                        {' · '}Report by{' '}
                        <span className="text-red-400 tabular-nums">
                          {new Date(hardCap.deadline).toLocaleDateString('en-GB')}
                        </span>{' '}
                        (statutory deadline)
                      </>
                    )}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Score hero */}
          {/* 80px of figure with a column of letterspaced captions beside it
              left a hole down the right of the screen and stranded the verdict
              in the middle of it. Figure, band and trend now read as one line
              of information, with the sentence directly beneath. */}
          <section className="flex items-end gap-4">
            <span
              className={cn(
                'text-[56px] sm:text-[64px] font-semibold tabular-nums tracking-tight leading-none',
                enoughEvidence ? scoreColor : 'text-white'
              )}
            >
              {enoughEvidence ? (score ?? '—') : `${coverage?.scored ?? 0}`}
            </span>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-[13px] font-medium text-white">
                {enoughEvidence ? 'out of 100' : `of ${coverage?.total ?? 10} signals logged`}
              </p>
              <p
                className={cn(
                  'text-[13px] font-semibold',
                  enoughEvidence ? scoreColor : 'text-white'
                )}
              >
                {hudsonLabel}
                {enoughEvidence && trendLabel ? (
                  <span className={cn('ml-2 font-medium tabular-nums', trendTone)}>
                    {trendLabel}
                  </span>
                ) : null}
              </p>
            </div>
          </section>

          <p className="text-[13.5px] text-white leading-relaxed">{hudsonSub}</p>

          {/* When the score is withheld, say what would unlock it. */}
          {!enoughEvidence && coverage && coverage.missing.length > 0 && (
            <section>
              <h3 className="mb-2 text-[13px] font-semibold text-white">Still to log</h3>
              <div className="flex flex-wrap gap-1.5">
                {coverage.missing.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[12px] text-white"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </section>
          )}

          {isLoading && <p className="text-[12px] text-white">Loading the breakdown…</p>}

          {summary && (
            <>
              {/* 5-dimension strip */}
              <section className="space-y-3">
                <div className="text-[13px] font-semibold text-white">Breakdown by dimension</div>
                {/*
                 * Rows, not a five-cell table.
                 *
                 * The grid was `grid-cols-2` on a phone with five items, so the
                 * last cell sat beside a black hole; and the cells were divided
                 * by 1px of pure black, which on this ground reads as a crack
                 * rather than a border. A dimension is a value against its own
                 * maximum — that is a bar, and bars stack.
                 */}
                <div className="space-y-2.5">
                  {(
                    [
                      'compliance',
                      'activity',
                      'proactive',
                      'quality',
                      'outcomes',
                    ] as ScoreCategory[]
                  ).map((key) => {
                    const value = summary.dimensions[key];
                    const max = summary.dimensionMax[key];
                    const ratio = max > 0 ? value / max : 0;
                    const tone =
                      ratio >= 0.85
                        ? 'text-emerald-400'
                        : ratio >= 0.6
                          ? 'text-elec-yellow'
                          : ratio >= 0.4
                            ? 'text-amber-400'
                            : 'text-red-400';
                    const bar =
                      ratio >= 0.85
                        ? 'bg-emerald-400'
                        : ratio >= 0.6
                          ? 'bg-elec-yellow'
                          : ratio >= 0.4
                            ? 'bg-amber-400'
                            : 'bg-red-400';
                    return (
                      <div
                        key={key}
                        className={cn(
                          'rounded-2xl border border-elec-yellow/35 p-3.5',
                          CARD_SURFACE
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[13.5px] font-semibold text-white">
                            {CATEGORY_LABEL[key]}
                          </span>
                          <span
                            className={cn(
                              'shrink-0 text-[15px] font-semibold tabular-nums tracking-tight',
                              tone
                            )}
                          >
                            {value}
                            <span className="text-[12px] text-white">/{max}</span>
                          </span>
                        </div>
                        {/* Scaled to its OWN maximum — the dimensions are weighted
                            30/25/20/15/10, so a shared scale would rank them wrongly. */}
                        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                          <span
                            className={cn(
                              'block h-full rounded-full transition-[width] duration-700 ease-out',
                              bar
                            )}
                            style={{ width: `${Math.max(ratio * 100, value > 0 ? 4 : 0)}%` }}
                          />
                        </span>
                        <p className="mt-2 text-[12px] leading-snug text-white">
                          {CATEGORY_DESC[key]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Deductions */}
              {summary.deductions.length > 0 && (
                <section className="space-y-3">
                  <div className="text-[13px] font-semibold text-red-400">
                    Where you're losing points
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {summary.deductions.map((d, idx) => (
                      <li key={idx} className="py-3 flex items-baseline gap-3">
                        <span className="text-[11.5px] font-semibold tabular-nums text-red-400 shrink-0 w-10">
                          −{d.points}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13.5px] text-white leading-relaxed">{d.label}</p>
                          <p className="mt-0.5 text-[12px] text-white leading-relaxed">
                            {d.action}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Gains */}
              {summary.gains.length > 0 && (
                <section className="space-y-3">
                  <div className="text-[13px] font-semibold text-emerald-400">
                    Where you're earning points
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {summary.gains.map((g, idx) => (
                      <li key={idx} className="py-3 flex items-baseline gap-3">
                        <span className="text-[11.5px] font-semibold tabular-nums text-emerald-400 shrink-0 w-10">
                          +{g.points}
                        </span>
                        <span className="text-[13.5px] text-white flex-1 leading-relaxed">
                          {g.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Recommendations */}
              {summary.recommendations.length > 0 && (
                <section className="space-y-3">
                  <div className="text-[13px] font-semibold text-elec-yellow">
                    Top moves to improve
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {summary.recommendations.slice(0, 8).map((r, idx) => (
                      <li key={idx} className="py-3 flex items-baseline gap-3">
                        <span className="w-8 shrink-0 text-[12px] font-semibold tabular-nums text-white">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[13.5px] text-white flex-1 leading-relaxed">
                          {r.label}
                        </span>
                        <span className="text-[11.5px] font-semibold tabular-nums text-elec-yellow shrink-0">
                          +{r.pointGain}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Period footer */}
              <p className="text-[11px] text-white tabular-nums">
                30 days to {new Date(summary.period.end).toLocaleDateString('en-GB')} · Previous
                score {summary.previousScore}
              </p>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
