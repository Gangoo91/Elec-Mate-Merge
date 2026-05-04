/**
 * Cost Estimate Stream
 *
 * Editorial streaming surface for the Cost Engineer. Subscribes to
 * `cost_engineer_partials` via realtime so the materials, labour and
 * overheads sections fill in live as Stage A computes; falls back to
 * `cost_engineer_jobs.progress` thresholds while the first partial is
 * in flight. Mirrors `CircuitDesignStream` so the swap to results feels
 * like a continuation, not a transition.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { CostEstimateInputs, REGION_OPTIONS } from '@/types/cost-estimate-inputs';

interface CostEstimateStreamProps {
  inputs?: CostEstimateInputs;
  jobId?: string | null;
  jobProgress?: number;
  jobStatus?: 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep?: string;
  error?: string | null;
  /** If set, the stream shows the slimmer refinement stage list. */
  refineMode?: 'cheaper' | 'premium' | 'phase' | null;
  onCancel?: () => void;
  onRetry?: () => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PartialRow {
  stage: string;
  payload: any;
  created_at: string;
}

interface Stage {
  id: string;
  label: string;
  description: string;
  threshold: number;
}

const FRESH_STAGES: Stage[] = [
  {
    id: 'extraction',
    label: 'Reading briefing',
    description: 'Parsing the brief and any attachments into priced line items.',
    threshold: 5,
  },
  {
    id: 'materials',
    label: 'Pricing materials',
    description: 'Live UK supplier marketplace match, cheapest in stock.',
    threshold: 25,
  },
  {
    id: 'labour',
    label: 'Estimating labour',
    description: 'Cross-referencing practical work timing benchmarks.',
    threshold: 40,
  },
  {
    id: 'overheads',
    label: 'Overheads & margin',
    description: 'Applying regional multiplier, business overheads, target margin.',
    threshold: 55,
  },
  {
    id: 'compliance',
    label: 'Grounding against BS 7671',
    description: 'Searching BS 7671:2018+A4:2026, OSG, GN3 for compliance flags.',
    threshold: 70,
  },
  {
    id: 'risk_upsells',
    label: 'Risk + upsells',
    description: 'AI annotates risks, payment terms, value engineering and pipeline.',
    threshold: 82,
  },
  {
    id: 'finalise',
    label: 'Finalising',
    description: 'Assembling the client-ready quote.',
    threshold: 95,
  },
];

/** Refinements skip the heavyweight extraction + vision steps. */
const REFINE_STAGES: Stage[] = [
  {
    id: 'extraction',
    label: 'Loading original',
    description: 'Pulling the previous estimate as the starting point.',
    threshold: 5,
  },
  {
    id: 'materials',
    label: 'Re-pricing materials',
    description: 'Repricing the refined item set against the live marketplace.',
    threshold: 25,
  },
  {
    id: 'labour',
    label: 'Re-estimating labour',
    description: 'Updating labour for any swapped or added tasks.',
    threshold: 40,
  },
  {
    id: 'overheads',
    label: 'Overheads & margin',
    description: 'Applying regional multiplier and your margin policy.',
    threshold: 55,
  },
  {
    id: 'compliance',
    label: 'Compliance check',
    description: 'Re-checking BS 7671 obligations on the refined items.',
    threshold: 70,
  },
  {
    id: 'risk_upsells',
    label: 'Risk + narrative',
    description: 'Refreshing the AI annotations for the new spec.',
    threshold: 82,
  },
  {
    id: 'finalise',
    label: 'Finalising',
    description: 'Assembling the refined quote.',
    threshold: 95,
  },
];

export const CostEstimateStream = ({
  inputs,
  jobId,
  jobProgress = 0,
  jobStatus = 'processing',
  currentStep,
  error,
  refineMode = null,
  onCancel,
  onRetry,
}: CostEstimateStreamProps) => {
  const [elapsedSec, setElapsedSec] = useState(0);
  const [startTime] = useState(Date.now());
  const [partials, setPartials] = useState<Map<string, PartialRow>>(new Map());

  const STAGES = refineMode ? REFINE_STAGES : FRESH_STAGES;

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  // Realtime subscription to cost_engineer_partials. Initial fetch
  // catches anything inserted before the channel opened, then we listen
  // for INSERT/UPDATE for the duration of the run.
  useEffect(() => {
    if (!jobId) return;

    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('cost_engineer_partials' as any)
        .select('*')
        .eq('job_id', jobId);
      if (cancelled || !data) return;
      setPartials((prev) => {
        const next = new Map(prev);
        (data as any[]).forEach((row) => next.set(row.stage, row as PartialRow));
        return next;
      });
    })();

    const channel = supabase
      .channel(`cost-partials-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'cost_engineer_partials',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const row = payload.new as PartialRow;
          setPartials((prev) => new Map(prev).set(row.stage, row));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'cost_engineer_partials',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const row = payload.new as PartialRow;
          setPartials((prev) => new Map(prev).set(row.stage, row));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [jobId]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
  };

  const attachmentCount = inputs?.attachments.length ?? 0;
  const descriptionLength = inputs?.description.length ?? 0;

  const regionMultiplier = useMemo(
    () => REGION_OPTIONS.find((r) => r.value === inputs?.region)?.multiplier ?? 1,
    [inputs?.region]
  );

  // Stage progress is now driven by partials when present; fall back to
  // jobProgress thresholds while the first partial is in flight.
  let currentStageIndex = -1;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    const stageId = STAGES[i].id;
    if (partials.has(stageId) || jobProgress >= STAGES[i].threshold) {
      currentStageIndex = i;
      break;
    }
  }

  // Headline numbers from the materials/labour/overheads partials.
  const livePricedItems = (partials.get('materials')?.payload?.items ?? []) as any[];
  const liveLabourTasks = (partials.get('labour')?.payload?.tasks ?? []) as any[];
  const liveMaterialsTotal = livePricedItems.reduce(
    (sum, it) => sum + Number(it.total ?? 0),
    0
  );
  const liveLabourHours = liveLabourTasks.reduce(
    (sum, t) => sum + Number(t.hours ?? 0),
    0
  );
  const cancelled = jobStatus === 'cancelled';
  const failed = jobStatus === 'failed' || !!error;

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white">
              <span
                className={cn(
                  'inline-block h-2 w-2 rounded-full',
                  jobStatus === 'complete'
                    ? 'bg-emerald-400'
                    : failed
                      ? 'bg-red-400'
                      : cancelled
                        ? 'bg-red-400'
                        : 'bg-elec-yellow animate-pulse'
                )}
              />
              {jobStatus === 'complete'
                ? 'Estimate complete'
                : failed
                  ? 'Estimate failed'
                  : cancelled
                    ? 'Cancelled'
                    : 'Pricing'}
            </span>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Cost Engineer
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {inputs?.projectName || 'Cost Estimate'}
              </h1>
            </div>
            {onCancel && jobStatus !== 'complete' && (
              <button
                type="button"
                onClick={onCancel}
                className="text-[12px] font-medium text-white/70 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                {failed || cancelled ? 'Back' : 'Cancel'}
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-7 sm:space-y-10">
        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>
            {refineMode ? `REFINING · ${refineMode.toUpperCase()}` : 'STREAMING ESTIMATE'}
          </Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.05] text-white">
            <span className="text-elec-yellow">{Math.round(jobProgress)}%</span>{' '}
            <span className="text-white">{refineMode ? 'refined.' : 'priced.'}</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-2xl">
            {currentStep ||
              (refineMode
                ? 'Reworking the priced skeleton into a refined version against the live marketplace.'
                : 'Repricing every line against the pricing database and validating the margin.')}
          </p>
        </section>

        {/* Live progress */}
        <section className="space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Pipeline
            </span>
            <span className="text-[24px] sm:text-[28px] font-semibold tabular-nums text-white">
              {Math.round(jobProgress)}
              <span className="text-white/60">%</span>
            </span>
          </div>
          <div className="relative h-px bg-white/[0.06] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-elec-yellow"
              animate={{ width: `${Math.max(jobProgress, 2)}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-baseline justify-between gap-4 pt-1">
            <span className="text-[11px] text-white/60 tabular-nums">
              Elapsed {formatTime(elapsedSec)}
            </span>
            <span className="text-[11px] text-white/60 tabular-nums">
              {attachmentCount > 0 ? `${attachmentCount} attachment${attachmentCount === 1 ? '' : 's'}` : ''}
            </span>
          </div>
        </section>

        {/* Live numbers strip — fills in as partials arrive. Falls back to
            briefing context until pricing lands. */}
        {inputs && (
          <section className="grid grid-cols-3 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {livePricedItems.length > 0 ? 'Materials priced' : 'Briefing'}
              </div>
              <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-elec-yellow">
                {livePricedItems.length > 0
                  ? `£${liveMaterialsTotal.toFixed(0)}`
                  : `${descriptionLength} chars`}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {liveLabourTasks.length > 0 ? 'Labour hours' : 'Attachments'}
              </div>
              <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-white">
                {liveLabourTasks.length > 0 ? `${liveLabourHours.toFixed(1)} h` : attachmentCount}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Region ×
              </div>
              <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-white">
                {regionMultiplier.toFixed(2)}
              </div>
            </div>
          </section>
        )}

        {/* Live materials list — fills in as the marketplace lookups
            land. Big trust signal — the user sees real prices appearing
            against real suppliers, not a spinner. */}
        {livePricedItems.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>MATERIALS — LIVE</Eyebrow>
              <span className="text-[11px] text-white/60 tabular-nums">
                {livePricedItems.length} priced · £{liveMaterialsTotal.toFixed(0)}
              </span>
            </div>
            <div className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:border-white/[0.08] sm:rounded-2xl overflow-hidden divide-y divide-white/[0.06] max-h-[360px] overflow-y-auto">
              {livePricedItems.slice(0, 30).map((it: any, i: number) => {
                const src = it.source ?? null;
                const isLive = src?.table === 'marketplace_products';
                const freshness: string | null = isLive ? src.freshness : null;
                return (
                  <motion.div
                    key={`${it.description}-${i}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-2.5 flex items-baseline gap-3"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/40 shrink-0 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] text-white truncate">
                        {it.description}
                      </div>
                      <div className="text-[10.5px] text-white/45 truncate">
                        {it.supplier ?? 'Unmatched'}
                        {freshness && ` · ${freshness}`}
                      </div>
                    </div>
                    <div className="text-[12.5px] font-semibold tabular-nums text-elec-yellow shrink-0">
                      £{Number(it.total ?? 0).toFixed(0)}
                    </div>
                  </motion.div>
                );
              })}
              {livePricedItems.length > 30 && (
                <div className="px-4 py-2 text-[10.5px] text-white/45 tabular-nums text-center">
                  + {livePricedItems.length - 30} more — full list on results
                </div>
              )}
            </div>
          </section>
        )}

        {/* Stage list — fills in as progress crosses thresholds */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <Eyebrow>STAGES</Eyebrow>
            <span className="text-[11px] text-white/60 tabular-nums">
              {Math.max(currentStageIndex + 1, 0)} of {STAGES.length}
            </span>
          </div>
          <div className="space-y-3">
            {STAGES.map((stage, i) => {
              const isComplete = i < currentStageIndex;
              const isActive = i === currentStageIndex && !failed && jobStatus !== 'complete';
              const isPending = i > currentStageIndex;
              const allDone = jobStatus === 'complete';

              return (
                <div
                  key={stage.id}
                  className={cn(
                    'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5 transition-colors',
                    allDone || isComplete
                      ? 'border-emerald-500/30'
                      : isActive
                        ? 'border-elec-yellow/40'
                        : 'border-white/[0.08] opacity-60'
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums shrink-0',
                        allDone || isComplete
                          ? 'text-emerald-400'
                          : isActive
                            ? 'text-elec-yellow'
                            : 'text-white/40'
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          'text-[14.5px] font-semibold tracking-tight',
                          allDone || isComplete
                            ? 'text-emerald-400'
                            : isActive
                              ? 'text-elec-yellow'
                              : 'text-white/70'
                        )}
                      >
                        {stage.label}
                        {isActive && (
                          <span className="inline-block ml-2 h-2 w-2 rounded-full bg-elec-yellow animate-pulse align-middle" />
                        )}
                      </div>
                      <div className="mt-1 text-[12.5px] leading-snug text-white/65">
                        {stage.description}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-[10.5px] uppercase tracking-[0.18em] font-semibold shrink-0',
                        allDone || isComplete
                          ? 'text-emerald-400'
                          : isActive
                            ? 'text-elec-yellow'
                            : 'text-white/30'
                      )}
                    >
                      {allDone || isComplete ? 'Done' : isActive ? 'Live' : isPending ? 'Queued' : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Failure banner */}
        {failed && (
          <section className="bg-[hsl(0_0%_10%)] border border-red-500/40 rounded-2xl p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-red-400 shrink-0">
                Fail
              </span>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-white">
                  Estimate generation failed
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">
                  {error || 'An unexpected error occurred. Try again, or adjust the scope.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.98] touch-manipulation"
                    >
                      Retry
                    </button>
                  )}
                  {onCancel && (
                    <button
                      type="button"
                      onClick={onCancel}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-white/20 transition-colors active:scale-[0.98] touch-manipulation"
                    >
                      Back to briefing
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
