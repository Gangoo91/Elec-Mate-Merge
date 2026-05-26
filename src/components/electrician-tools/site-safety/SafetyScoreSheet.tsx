import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type {
  WeeklySummary,
  HudsonLevel,
  ScoreCategory,
} from '@/hooks/useWeeklySafetySummary';

interface SafetyScoreSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary?: WeeklySummary;
  isLoading?: boolean;
}

const HUDSON_LABEL: Record<HudsonLevel, string> = {
  critical: 'Critical',
  reactive: 'Reactive',
  calculative: 'Calculative',
  proactive: 'Proactive',
  generative: 'Generative',
};

const HUDSON_SUB: Record<HudsonLevel, string> = {
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
  proactive: "Are you surfacing risks before they bite",
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
  const score = summary?.safetyScore ?? null;
  const hudsonLevel = summary?.hudsonLevel;
  const hudsonLabel = hudsonLevel ? HUDSON_LABEL[hudsonLevel] : '';
  const hudsonSub = hudsonLevel ? HUDSON_SUB[hudsonLevel] : '';
  const trendDelta = summary?.trendDelta ?? 0;
  const trend = summary?.trend ?? 'stable';
  const hardCap = summary?.hardCap;

  const scoreColor =
    score == null
      ? 'text-white/40'
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
        : 'text-white/55';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:h-[88vh] rounded-t-2xl bg-[hsl(0_0%_8%)] border-white/[0.08] p-0 overflow-hidden flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-2 text-left">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Safety score
          </div>
          <SheetTitle className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight text-white">
            How you're tracking.
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-8">
          {/* Hard cap banner */}
          {hardCap && (
            <section className="bg-[hsl(0_0%_10%)] border border-red-500/40 rounded-2xl p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-red-400 shrink-0">
                  Cap active
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14.5px] font-semibold text-white">
                    Score capped at {hardCap.cap}/100
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">
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
          <section className="flex items-baseline gap-4 pt-2">
            <span
              className={cn(
                'text-[64px] sm:text-[80px] font-semibold tabular-nums tracking-tight leading-none',
                scoreColor
              )}
            >
              {score ?? '—'}
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/55">
                Out of 100
              </span>
              <span className={cn('text-[11px] font-semibold uppercase tracking-[0.18em]', scoreColor)}>
                {hudsonLabel}
              </span>
              <span className={cn('text-[11px] font-semibold tabular-nums', trendTone)}>
                {trendLabel}
              </span>
            </div>
          </section>

          <p className="text-[13.5px] text-white/75 leading-relaxed">{hudsonSub}</p>

          {isLoading && (
            <p className="text-[12px] text-white/55">Loading the breakdown…</p>
          )}

          {summary && (
            <>
              {/* 5-dimension strip */}
              <section className="space-y-3">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Breakdown by dimension
                </div>
                <div className="-mx-6 sm:mx-0 grid grid-cols-2 sm:grid-cols-5 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
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
                    return (
                      <div
                        key={key}
                        className="bg-[hsl(0_0%_10%)] px-3 py-4 sm:px-4 sm:py-5"
                      >
                        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                          {CATEGORY_LABEL[key]}
                        </div>
                        <div
                          className={cn(
                            'mt-2 text-[22px] sm:text-[26px] font-semibold tabular-nums tracking-tight leading-none',
                            tone
                          )}
                        >
                          {value}
                          <span className="text-white/40 text-[14px]">/{max}</span>
                        </div>
                        <div className="mt-1 text-[10.5px] text-white/45 leading-snug">
                          {CATEGORY_DESC[key]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Deductions */}
              {summary.deductions.length > 0 && (
                <section className="space-y-3">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
                    Where you're losing points
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {summary.deductions.map((d, idx) => (
                      <li key={idx} className="py-3 flex items-baseline gap-3">
                        <span className="text-[11.5px] font-semibold tabular-nums text-red-400 shrink-0 w-10">
                          −{d.points}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13.5px] text-white leading-relaxed">
                            {d.label}
                          </p>
                          <p className="mt-0.5 text-[12px] text-white/55 leading-relaxed">
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
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                    Where you're earning points
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {summary.gains.map((g, idx) => (
                      <li key={idx} className="py-3 flex items-baseline gap-3">
                        <span className="text-[11.5px] font-semibold tabular-nums text-emerald-400 shrink-0 w-10">
                          +{g.points}
                        </span>
                        <span className="text-[13.5px] text-white/85 flex-1 leading-relaxed">
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
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                    Top moves to improve
                  </div>
                  <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {summary.recommendations.slice(0, 8).map((r, idx) => (
                      <li key={idx} className="py-3 flex items-baseline gap-3">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/55 w-8 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[13.5px] text-white/85 flex-1 leading-relaxed">
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
              <p className="text-[11px] text-white/45 tabular-nums">
                30 days to {new Date(summary.period.end).toLocaleDateString('en-GB')} ·{' '}
                Previous score {summary.previousScore}
              </p>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
