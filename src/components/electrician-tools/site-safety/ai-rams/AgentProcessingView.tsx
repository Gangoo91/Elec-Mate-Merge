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
import { motion, AnimatePresence } from 'framer-motion';
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

/** Known partial stages, in display order. */
const PARTIAL_STAGES = [
  { key: 'rag', label: 'Grounded' },
  { key: 'hazards', label: 'Hazards' },
  { key: 'ppe', label: 'PPE' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'steps', label: 'Steps' },
  { key: 'tools', label: 'Tools' },
  { key: 'materials', label: 'Materials' },
  { key: 'tips', label: 'Tips' },
  { key: 'mistakes', label: 'Mistakes' },
  { key: 'finalise', label: 'Finalised' },
] as const;

const AGENT_META: Record<string, { label: string; description: string }> = {
  'health-safety': {
    label: 'Health & Safety',
    description: 'Identifying hazards, scoring risk, specifying control measures.',
  },
  installer: {
    label: 'Method Statement',
    description: 'Building the step-by-step installation procedure.',
  },
};

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
          <Eyebrow>{isComplete ? 'RAMS GENERATED' : 'STREAMING RAMS'}</Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.05] text-white">
            <span className="text-elec-yellow">{displayProgress}%</span>{' '}
            <span className="text-white">{isComplete ? 'complete.' : 'generated.'}</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-2xl">
            {currentStep ||
              (isComplete
                ? 'Your risk assessment and method statement are ready for review.'
                : 'Two specialists are reading the brief, identifying hazards and building the method statement.')}
          </p>
        </section>

        {/* Live progress */}
        <section className="space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Pipeline
            </span>
            <span className="text-[24px] sm:text-[28px] font-semibold tabular-nums text-white">
              {displayProgress}
              <span className="text-white/60">%</span>
            </span>
          </div>
          <div className="relative h-px bg-white/[0.06] overflow-hidden">
            <motion.div
              className={cn(
                'absolute inset-y-0 left-0',
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
                ~{formatTime(estimatedTimeRemaining)} remaining
              </span>
            )}
          </div>
        </section>

        {/* Live numbers strip — driven by rams_partials realtime channel.
            Hazards / steps counts fill in as each agent finishes its pass;
            facets count appears once RAG completes. Escapes the
            orchestrator's mobile padding for edge-to-edge hairlines. */}
        <section className="-mx-4 sm:mx-0 grid grid-cols-3 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              {liveHazardCount > 0 ? 'Hazards' : 'Risk assessment'}
            </div>
            <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-elec-yellow">
              {liveHazardCount > 0 ? liveHazardCount : `${hsAgentProgress}%`}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              {liveStepCount > 0 ? 'Steps' : 'Method statement'}
            </div>
            <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-white">
              {liveStepCount > 0 ? liveStepCount : `${installerAgentProgress}%`}
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              {liveRagFacets > 0 ? 'Grounded by' : 'Elapsed'}
            </div>
            <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-white">
              {liveRagFacets > 0 ? liveRagFacets : formatTime(liveElapsed)}
            </div>
          </div>
        </section>

        {/* Live feed — each rams_partials row lights up a chip as the
            pipeline progresses. Mirrors CostEstimateStream's live materials
            list but compact since RAMS partials are summaries not items. */}
        {partials.size > 0 && (
          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>LIVE FEED</Eyebrow>
              <span className="text-[11px] text-white/60 tabular-nums">
                {partials.size} of {PARTIAL_STAGES.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {PARTIAL_STAGES.filter((s) => partials.has(s.key)).map((s) => {
                  const payload = partials.get(s.key) ?? {};
                  const detail =
                    s.key === 'hazards'
                      ? `${payload.count ?? 0}`
                      : s.key === 'steps'
                        ? `${payload.count ?? 0}`
                        : s.key === 'rag'
                          ? `${(payload.bs7671FacetCount ?? 0) + (payload.safetyFacetCount ?? 0) + (payload.practicalCount ?? 0)}`
                          : s.key === 'ppe' || s.key === 'emergency' || s.key === 'tools' || s.key === 'materials' || s.key === 'tips' || s.key === 'mistakes'
                            ? `${payload.count ?? 0}`
                            : null;
                  return (
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2 h-8 px-3 rounded-xl bg-[hsl(0_0%_10%)] border border-emerald-500/30 text-[11.5px]"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="font-medium text-white">{s.label}</span>
                      {detail !== null && (
                        <span className="text-emerald-400 tabular-nums">{detail}</span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* Stage cards — Done / Live / Queued */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <Eyebrow>STAGES</Eyebrow>
            <span className="text-[11px] text-white/60 tabular-nums">
              {agentSteps.filter((s) => s.status === 'complete').length} of {agentSteps.length}
            </span>
          </div>
          <div className="space-y-3">
            {agentSteps.map((agent, idx) => {
              const meta = AGENT_META[agent.name] ?? {
                label: agent.name,
                description: '',
              };
              const realProgress =
                agent.name === 'health-safety' ? hsAgentProgress : installerAgentProgress;
              const isStageComplete = agent.status === 'complete';
              const isActive = agent.status === 'processing';
              const isPending = agent.status === 'pending';

              return (
                <div
                  key={agent.name}
                  className={cn(
                    'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5 transition-colors',
                    isStageComplete
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
                        isStageComplete
                          ? 'text-emerald-400'
                          : isActive
                            ? 'text-elec-yellow'
                            : 'text-white/40'
                      )}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          'text-[14.5px] font-semibold tracking-tight flex items-center gap-2',
                          isStageComplete
                            ? 'text-emerald-400'
                            : isActive
                              ? 'text-elec-yellow'
                              : 'text-white/70'
                        )}
                      >
                        <span>{meta.label}</span>
                        {isActive && (
                          <span className="inline-block h-2 w-2 rounded-full bg-elec-yellow animate-pulse" />
                        )}
                      </div>
                      <div className="mt-1 text-[12.5px] leading-snug text-white/65">
                        {agent.currentStep || meta.description}
                      </div>
                      {/* Per-agent progress bar — only when active */}
                      {isActive && realProgress > 0 && (
                        <div className="mt-3 h-px bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full bg-elec-yellow"
                            animate={{ width: `${realProgress}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                          />
                        </div>
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-[10.5px] uppercase tracking-[0.18em] font-semibold shrink-0 tabular-nums',
                        isStageComplete
                          ? 'text-emerald-400'
                          : isActive
                            ? 'text-elec-yellow'
                            : 'text-white/30'
                      )}
                    >
                      {isStageComplete
                        ? 'Done'
                        : isActive
                          ? `${realProgress}%`
                          : isPending
                            ? 'Queued'
                            : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
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
