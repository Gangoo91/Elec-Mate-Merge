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
import { AnimatePresence, motion } from 'framer-motion';
import { cardCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

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
/**
 * The two agents run CONCURRENTLY, in separate edge-function invocations, each
 * with its own CPU budget (ELE-1386). The old UI showed them as a four-row
 * sequential timeline with the method statement marked "Next" while it was in
 * fact already running — it described an architecture that no longer exists.
 * Each agent now gets its own card, side by side, showing its own live state.
 */
const AGENTS = [
  {
    key: 'hs' as const,
    eyebrow: '03 · Risk assessment',
    title: 'Hazards and controls',
    sub: 'Identifying hazards, scoring risk, specifying control measures.',
    stage: 'hazards',
    noun: 'hazard',
    expected: 18,
  },
  {
    key: 'method' as const,
    eyebrow: '04 · Method statement',
    title: 'The step-by-step',
    sub: 'Building the installation procedure, in sequence.',
    stage: 'steps',
    noun: 'step',
    expected: 14,
  },
];

type AgentState = 'queued' | 'live' | 'done' | 'failed';

/**
 * A single live count. Shows a real 0 rather than an em-dash placeholder —
 * "—" reads as broken, whereas 0 reads as "nothing yet, and I'm watching".
 */
const Stat: React.FC<{ label: string; value: number; accent?: boolean }> = ({
  label,
  value,
  accent,
}) => (
  <div>
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
      {label}
    </div>
    <motion.div
      key={value}
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'mt-1 text-[20px] font-semibold tabular-nums',
        accent ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
    </motion.div>
  </div>
);

/** Small status pill shared by both agent cards. */
const StatePill: React.FC<{ state: AgentState }> = ({ state }) => {
  const copy = { queued: 'Queued', live: 'Live', done: 'Done', failed: 'Failed' }[state];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em]',
        state === 'failed'
          ? 'text-red-400'
          : state === 'done'
            ? 'text-emerald-400'
            : state === 'live'
              ? 'text-elec-yellow'
              : 'text-white'
      )}
    >
      {state === 'live' ? (
        <span className="relative inline-flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-elec-yellow" />
        </span>
      ) : (
        <span
          className={cn(
            'inline-block h-2 w-2 rounded-full',
            state === 'failed'
              ? 'bg-red-400'
              : state === 'done'
                ? 'bg-emerald-400'
                : 'border border-white/40'
          )}
        />
      )}
      {copy}
    </span>
  );
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
  hsAgentStatus = 'pending',
  installerAgentStatus = 'pending',
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [partials, setPartials] = useState<Map<string, any>>(new Map());

  // Local elapsed counter — ticks every second to drive the "Elapsed" readout.
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
      .channel(realtimeChannelName(`rams-partials-${jobId}`))
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

  // Sources consulted. The two agents run as separate invocations and each
  // publishes its own grounding counts, so this sums across both stages. The
  // legacy single `rag` stage is still read so jobs created before the split
  // keep rendering correctly.
  const countFrom = (stage: string, key: string) =>
    (partials.get(stage)?.[key] as number | undefined) ?? 0;
  const liveRagFacets =
    countFrom('rag', 'bs7671FacetCount') +
    countFrom('rag', 'safetyFacetCount') +
    countFrom('rag', 'practicalCount') +
    countFrom('rag_hs', 'bs7671FacetCount') +
    countFrom('rag_hs', 'safetyFacetCount') +
    countFrom('rag_method', 'bs7671FacetCount') +
    countFrom('rag_method', 'practicalCount');

  const hasVision = partials.get('rag')?.visionFindings === true;

  // Progress reflects what the server has actually done — no timer creep.
  //
  // The bar used to walk to 95% on an exponential curve driven purely by
  // elapsed time, independent of any server state. That is what produced the
  // "91% and counting" on a job whose worker had already been killed (ELE-1386)
  // — it advertised progress that was not happening. Each agent owns half the
  // bar, and within an agent the live element count drives the movement, so
  // what you see is grounded in output that actually landed.
  const EXPECTED_HAZARDS = 18;
  const EXPECTED_STEPS = 14;

  const agentShare = (
    agentStatus: string,
    liveCount: number,
    expected: number,
    reportedProgress: number
  ): number => {
    if (agentStatus === 'complete') return 50;
    if (agentStatus === 'failed') return 50; // terminal — stop moving
    if (agentStatus === 'processing') {
      // 5% for starting, then up to 45% more as elements actually stream in.
      // The server's own per-agent progress acts as a floor.
      const fromCounts = 5 + Math.min(liveCount / expected, 1) * 45;
      return Math.max(fromCounts, (reportedProgress / 100) * 50);
    }
    return 0; // pending
  };

  const derived =
    agentShare(hsAgentStatus, liveHazardCount, EXPECTED_HAZARDS, hsAgentProgress) +
    agentShare(installerAgentStatus, liveStepCount, EXPECTED_STEPS, installerAgentProgress);

  const displayProgress = bothComplete
    ? 100
    : Math.min(Math.round(Math.max(derived, overallProgress)), 99);
  const isComplete = displayProgress >= 100;

  const stateFor = (status: string, stage: string): AgentState => {
    const p = partials.get(stage);
    if (status === 'failed' || p?.failed === true) return 'failed';
    if (status === 'complete') return 'done';
    if (status === 'processing') return 'live';
    return 'queued';
  };

  const countFor = (stage: string) => (partials.get(stage)?.count as number | undefined) ?? 0;

  /** Names of the most recently written elements, newest last. */
  const recentFor = (stage: string): string[] => {
    const r = partials.get(stage)?.recent;
    return Array.isArray(r) ? (r as string[]) : [];
  };

  return (
    // Fills the viewport rather than stranding four short cards at the top of a
    // mostly-empty page. The grid takes the remaining height and the agent row
    // grows into it, so the live feeds have somewhere to go as they fill up.
    <div className="flex min-h-[calc(100vh-9rem)] flex-col pb-12">
      {/* The brief, kept on screen while it works.
          `jobDescription` was passed in but never rendered, so the one thing
          you'd want to re-read while waiting — what you actually asked for —
          was the one thing not shown. Full width above the grid so it doesn't
          disturb the 2x2. */}
      {jobDescription && (
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(cardCn, 'mb-4 sm:mb-5')}
        >
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Your brief
          </span>
          <p className="text-[13.5px] leading-relaxed text-white">{jobDescription}</p>
        </motion.section>
      )}

      {/* 2x2 on desktop, single column on mobile. Cards stretch so both in a
          row are the same height, and each is a flex column so its content can
          grow into that height rather than leaving a void underneath. */}
      <div className="-mx-4 grid flex-1 content-start gap-4 sm:mx-0 sm:gap-5 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        {/* 01 — PROGRESS */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(cardCn, 'mx-0 flex min-w-0 flex-col')}
        >
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            {isComplete ? '01 · Generated' : '01 · Generating'}
          </span>
          <h2 className="text-[30px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[36px]">
            <span className="tabular-nums text-elec-yellow">{displayProgress}%</span>{' '}
            <span className="text-white">{isComplete ? 'complete.' : 'and counting.'}</span>
          </h2>

          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className={cn(
                'absolute inset-y-0 left-0 rounded-full',
                isComplete ? 'bg-emerald-400' : 'bg-elec-yellow'
              )}
              animate={{ width: `${Math.max(displayProgress, 2)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[12px] tabular-nums text-white">
              Elapsed {formatTime(liveElapsed)}
            </span>
            {!isComplete && estimatedTimeRemaining > 0 && (
              <span className="text-[12px] tabular-nums text-white">
                ~{formatTime(estimatedTimeRemaining)} to go
              </span>
            )}
          </div>

          <p className="text-[13px] leading-relaxed text-white">
            {isComplete
              ? 'Your risk assessment and method statement are ready for review.'
              : 'Both specialists are running at the same time — each writes its half independently.'}
          </p>
        </motion.section>

        {/* 02 — GROUNDING */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className={cn(cardCn, 'mx-0 flex min-w-0 flex-col')}
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              02 · Grounding
            </span>
            {hasVision && (
              <span className="text-[11px] font-medium text-white">Site photos read</span>
            )}
          </div>
          <h3 className="text-[17px] font-semibold tracking-tight text-white">
            What it is reading
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <Stat label="Sources" value={liveRagFacets} accent />
            <Stat label="Hazards" value={liveHazardCount} />
            <Stat label="Steps" value={liveStepCount} />
          </div>

          <p className="text-[13px] leading-relaxed text-white">
            BS 7671 and On-Site Guide facets, HSE guidance, and practical installation patterns —
            retrieved before either specialist starts writing.
          </p>
        </motion.section>

        {/* 03 / 04 — the two agents, side by side because they run side by side */}
        {AGENTS.map((agent, idx) => {
          const state = stateFor(
            agent.key === 'hs' ? hsAgentStatus : installerAgentStatus,
            agent.stage
          );
          const count = countFor(agent.stage);
          const pct =
            state === 'done'
              ? 100
              : state === 'live'
                ? Math.max(6, Math.min(Math.round((count / agent.expected) * 100), 96))
                : 0;

          return (
            <motion.section
              key={agent.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
              className={cn(
                cardCn,
                'mx-0 flex min-w-0 flex-col',
                state === 'live' && 'sm:ring-1 sm:ring-elec-yellow/25',
                state === 'failed' && 'sm:ring-1 sm:ring-red-500/30'
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  {agent.eyebrow}
                </span>
                <StatePill state={state} />
              </div>

              <div className="flex items-end justify-between gap-4">
                <h3 className="text-[17px] font-semibold tracking-tight text-white">
                  {agent.title}
                </h3>
                {/* Re-keyed on the value so each new element ticks in rather
                    than the number silently swapping. */}
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-[20px] font-semibold tabular-nums text-white"
                >
                  {count > 0 ? `${count} ${agent.noun}${count === 1 ? '' : 's'}` : ''}
                </motion.span>
              </div>

              <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full',
                    state === 'failed'
                      ? 'bg-red-400'
                      : state === 'done'
                        ? 'bg-emerald-400'
                        : 'bg-elec-yellow'
                  )}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              <p className="text-[13px] leading-relaxed text-white">
                {state === 'failed'
                  ? 'This half did not generate. You can retry just this one from the results screen — the other half is kept.'
                  : state === 'queued'
                    ? 'Waiting on the grounding search, then it starts.'
                    : state === 'done'
                      ? `Finished — ${count} ${agent.noun}${count === 1 ? '' : 's'} written.`
                      : agent.sub}
              </p>

              {/* Live feed. The agents publish the names of the elements they've
                  just written, so this is the actual document appearing rather
                  than a spinner — and it's what fills the card's height. */}
              {recentFor(agent.stage).length > 0 && (
                <ul className="mt-auto space-y-1.5 border-t border-white/[0.1] pt-3">
                  <AnimatePresence initial={false}>
                    {recentFor(agent.stage).map((name, i) => (
                      <motion.li
                        key={`${name}-${i}`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-start gap-2 text-[12.5px] leading-snug text-white"
                      >
                        <span className="mt-[3px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow" />
                        <span className="min-w-0 flex-1">{name}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </motion.section>
          );
        })}
      </div>

      {/* Cancel — discrete, below the grid */}
      {onCancel && !isComplete && (
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={() => setShowCancelDialog(true)}
            disabled={isCancelling}
            className="min-h-11 text-[12.5px] font-medium text-white transition-colors hover:text-red-400 disabled:opacity-50 touch-manipulation"
          >
            {isCancelling ? 'Cancelling…' : 'Cancel generation'}
          </button>
        </div>
      )}

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
