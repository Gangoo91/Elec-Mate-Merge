/**
 * Agent Processing View
 *
 * Editorial streaming surface for the AI RAMS Generator. Mirrors
 * `CostEstimateStream` so the swap to results feels like a continuation,
 * not a transition. Two specialists run in sequence: the H&S agent
 * (hazards + controls + PPE) and the Installer agent (method statement).
 *
 * Phase 5 will subscribe to a `rams_partials` realtime channel and stream
 * each hazard / method step into the live feed below the stage list.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { supabase } from '@/integrations/supabase/client';

interface AgentStep {
  name: string;
  status: 'pending' | 'processing' | 'complete';
  progress: number;
  currentStep?: string;
  reasoning?: string;
}

interface AgentProcessingViewProps {
  /** Backend job id — drives the rams_partials realtime subscription. */
  jobId?: string | null;
  overallProgress: number;
  currentStep: string;
  elapsedTime: number;
  estimatedTimeRemaining: number;
  agentSteps: AgentStep[];
  onCancel?: () => void;
  isCancelling?: boolean;
  jobDescription?: string;
  hsAgentProgress?: number;
  installerAgentProgress?: number;
  hsAgentStatus?: string;
  installerAgentStatus?: string;
}

/**
 * Editorial timeline rows. Each row maps to one or more rams_partials
 * stages and resolves to one of three states:
 *   - done      → a "completing" partial has landed
 *   - live      → the previous row is done but this row's hasn't yet
 *   - pending   → not started
 *
 * The dual-agent (Health & Safety + Method Statement) split has been
 * collapsed: each agent is a single ~30-60s OpenAI call with no mid-call
 * progress signal, so showing per-agent inner bars made one side look
 * frozen at 0% while the overall progress climbed. The timeline below
 * shows what's ACTUALLY happening, in order, with the real counts.
 */
const TIMELINE = [
  {
    key: 'sources',
    label: 'Reading the brief',
    sub: 'Pulling in BS 7671, HSE codes and procedural patterns.',
    completedBy: 'rag',
  },
  {
    key: 'hazards',
    label: 'Drafting the hazard register',
    sub: 'Identifying hazards, scoring risk, specifying control measures.',
    completedBy: 'hazards',
  },
  {
    key: 'method',
    label: 'Drafting the method statement',
    sub: 'Building the step-by-step installation procedure.',
    completedBy: 'steps',
  },
  {
    key: 'finalise',
    label: 'Final touches',
    sub: 'PPE, emergency, tools, materials and sign-off.',
    completedBy: 'finalise',
  },
] as const;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AgentProcessingView: React.FC<AgentProcessingViewProps> = ({
  jobId,
  overallProgress,
  currentStep,
  elapsedTime,
  estimatedTimeRemaining,
  agentSteps,
  onCancel,
  isCancelling = false,
  jobDescription,
  hsAgentProgress = 0,
  installerAgentProgress = 0,
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [partials, setPartials] = useState<Map<string, any>>(new Map());

  // Local elapsed counter — ticks every second so the time-based progress
  // creep advances visibly even when no server-side progress update lands.
  // Stops once both agents complete to avoid runaway re-renders on results.
  const bothComplete = agentSteps.every((s) => s.status === 'complete');
  const [liveElapsed, setLiveElapsed] = useState<number>(elapsedTime);
  useEffect(() => {
    setLiveElapsed((prev) => Math.max(prev, elapsedTime));
  }, [elapsedTime]);
  useEffect(() => {
    if (bothComplete) return;
    const id = setInterval(() => setLiveElapsed((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [bothComplete]);

  // Realtime subscription to rams_partials. Initial fetch catches anything
  // inserted before the channel opened; then we listen for INSERT/UPDATE
  // for the duration of the run.
  useEffect(() => {
    if (!jobId) return;

    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('rams_partials')
        .select('stage, payload, created_at')
        .eq('job_id', jobId);
      if (cancelled || !data) return;
      setPartials((prev) => {
        const next = new Map(prev);
        (data as any[]).forEach((row) => next.set(row.stage, row.payload));
        return next;
      });
    })();

    const channel = supabase
      .channel(`rams-partials-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rams_partials',
          filter: `job_id=eq.${jobId}`,
        },
        (payload: any) => {
          const row = payload.new;
          setPartials((prev) => new Map(prev).set(row.stage, row.payload));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rams_partials',
          filter: `job_id=eq.${jobId}`,
        },
        (payload: any) => {
          const row = payload.new;
          setPartials((prev) => new Map(prev).set(row.stage, row.payload));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [jobId]);

  // Derived live counts from partials. Falls back to 0 until each stage
  // lands. Drives the 3-stat strip + the live feed below.
  const liveHazardCount = (partials.get('hazards')?.count as number | undefined) ?? 0;
  const liveStepCount = (partials.get('steps')?.count as number | undefined) ?? 0;
  const liveRagFacets =
    ((partials.get('rag')?.bs7671FacetCount as number | undefined) ?? 0) +
    ((partials.get('rag')?.safetyFacetCount as number | undefined) ?? 0) +
    ((partials.get('rag')?.practicalCount as number | undefined) ?? 0);

  // Display progress combines real server progress with a time-based creep so
  // the bar walks 0→95% smoothly even while both OpenAI calls are mid-flight.
  // The exponential curve asymptotes at 95% with the half-life tuned so the
  // bar passes 50% around 35s, 80% around 80s, and reaches 90% by 120s.
  const calculatedProgress =
    (hsAgentProgress / 100) * 50 + (installerAgentProgress / 100) * 50;
  const serverProgress = Math.max(calculatedProgress, overallProgress);
  const timeCreep = 95 * (1 - Math.exp(-liveElapsed / 50));
  const displayProgress = bothComplete
    ? 100
    : Math.min(Math.round(Math.max(serverProgress, timeCreep)), 95);
  const isComplete = displayProgress >= 100;

  return (
    <div className="space-y-7 sm:space-y-10 pb-12">
      <div className="space-y-7 sm:space-y-10">
        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>{isComplete ? 'RAMS GENERATED' : 'GENERATING'}</Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.05] text-white">
            <span className="text-elec-yellow tabular-nums">{displayProgress}%</span>{' '}
            <span className="text-white">{isComplete ? 'complete.' : 'and counting.'}</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-2xl">
            {isComplete
              ? 'Your risk assessment and method statement are ready for review.'
              : (() => {
                  // Pick the copy from the timeline row currently live, so the
                  // status sentence tracks what's actually happening.
                  const liveIdx = TIMELINE.findIndex(
                    (r) => !partials.has(r.completedBy)
                  );
                  if (liveIdx === -1) return TIMELINE[TIMELINE.length - 1].sub;
                  return TIMELINE[liveIdx].sub;
                })()}
          </p>
        </section>

        {/* Live progress bar */}
        <section className="space-y-2">
          <div className="relative h-1 bg-white/[0.06] overflow-hidden rounded-full">
            <motion.div
              className={cn(
                'absolute inset-y-0 left-0 rounded-full',
                isComplete ? 'bg-emerald-400' : 'bg-elec-yellow'
              )}
              animate={{ width: `${Math.max(displayProgress, 2)}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-baseline justify-between gap-4 pt-1">
            <span className="text-[11px] text-white/60 tabular-nums">
              Elapsed {formatTime(liveElapsed)}
            </span>
            {!isComplete && estimatedTimeRemaining > 0 && (
              <span className="text-[11px] text-white/60 tabular-nums">
                ~{formatTime(estimatedTimeRemaining)} to go
              </span>
            )}
          </div>
        </section>

        {/* Live numbers strip — only shows real counts as they arrive.
            No fake "Risk assessment 0%" stand-ins (which made one side
            look frozen). Escapes the orchestrator's mobile padding for
            edge-to-edge hairlines. */}
        <section className="-mx-4 sm:mx-0 grid grid-cols-3 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Hazards
            </div>
            <div className="mt-1 text-[17px] sm:text-[20px] font-semibold tabular-nums text-elec-yellow">
              {liveHazardCount > 0 ? liveHazardCount : '—'}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Steps
            </div>
            <div className="mt-1 text-[17px] sm:text-[20px] font-semibold tabular-nums text-white">
              {liveStepCount > 0 ? liveStepCount : '—'}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Sources
            </div>
            <div className="mt-1 text-[17px] sm:text-[20px] font-semibold tabular-nums text-white/85">
              {liveRagFacets > 0 ? liveRagFacets : '—'}
            </div>
          </div>
        </section>

        {/* Timeline — every row resolves to done / live / pending based on
            which rams_partials have arrived. No per-agent inner bars, no
            "Queued" placeholders that look frozen. */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <Eyebrow>TIMELINE</Eyebrow>
            <span className="text-[11px] text-white/60 tabular-nums">
              {TIMELINE.filter((r) => partials.has(r.completedBy)).length} of {TIMELINE.length}
            </span>
          </div>
          <ol className="space-y-2">
            {TIMELINE.map((row, idx) => {
              const isDone = partials.has(row.completedBy);
              const firstUndoneIdx = TIMELINE.findIndex(
                (r) => !partials.has(r.completedBy)
              );
              const isLive = !isDone && idx === firstUndoneIdx && !isComplete;
              const payload = partials.get(row.completedBy) ?? {};
              let detail: string | null = null;
              if (row.key === 'sources') {
                const n =
                  (payload.bs7671FacetCount ?? 0) +
                  (payload.safetyFacetCount ?? 0) +
                  (payload.practicalCount ?? 0);
                if (n > 0) detail = `${n} sources`;
              } else if (row.key === 'hazards' && payload.count) {
                detail = `${payload.count} hazards`;
              } else if (row.key === 'method' && payload.count) {
                detail = `${payload.count} steps`;
              } else if (row.key === 'finalise' && (payload.elapsedSeconds ?? 0) > 0) {
                detail = `${payload.elapsedSeconds}s total`;
              }

              return (
                <li
                  key={row.key}
                  className={cn(
                    'flex items-start gap-3 py-3 px-3 sm:px-4 rounded-xl border transition-colors',
                    isDone
                      ? 'border-emerald-500/25 bg-[hsl(0_0%_10%)]'
                      : isLive
                        ? 'border-elec-yellow/35 bg-[hsl(0_0%_11%)]'
                        : 'border-white/[0.06] bg-[hsl(0_0%_9%)]'
                  )}
                >
                  {/* Status dot — done = filled emerald; live = pulsing yellow; pending = hollow */}
                  <div className="pt-1 shrink-0">
                    {isDone ? (
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    ) : isLive ? (
                      <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-elec-yellow" />
                      </span>
                    ) : (
                      <span className="inline-block h-2.5 w-2.5 rounded-full border border-white/25" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <div
                        className={cn(
                          'text-[14px] sm:text-[14.5px] font-semibold tracking-tight',
                          isDone
                            ? 'text-white'
                            : isLive
                              ? 'text-elec-yellow'
                              : 'text-white/55'
                        )}
                      >
                        {row.label}
                      </div>
                      <span
                        className={cn(
                          'text-[10.5px] font-semibold uppercase tracking-[0.18em] shrink-0 tabular-nums',
                          isDone
                            ? 'text-emerald-400'
                            : isLive
                              ? 'text-elec-yellow'
                              : 'text-white/30'
                        )}
                      >
                        {isDone ? (detail ?? 'Done') : isLive ? 'Live' : 'Next'}
                      </span>
                    </div>
                    <div
                      className={cn(
                        'mt-0.5 text-[12.5px] leading-relaxed',
                        isLive ? 'text-white/75' : 'text-white/55'
                      )}
                    >
                      {row.sub}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Cancel — discrete, below the fold */}
        {onCancel && !isComplete && (
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setShowCancelDialog(true)}
              disabled={isCancelling}
              className="text-[12.5px] font-medium text-white/55 hover:text-red-400 transition-colors touch-manipulation disabled:opacity-50"
            >
              {isCancelling ? 'Cancelling…' : 'Cancel generation'}
            </button>
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Cancel RAMS generation?"
        description="This stops the current run. Your draft is kept locally so you can edit and try again."
        confirmText="Yes, cancel"
        cancelText="Keep going"
        onConfirm={() => {
          setShowCancelDialog(false);
          onCancel?.();
        }}
        variant="destructive"
        loading={isCancelling}
      />
    </div>
  );
};
