/**
 * Installation Method Stream
 *
 * Editorial streaming surface for the Installation Specialist. Drives
 * stage progress from `jobProgress` thresholds and previews the live
 * step list as soon as the job emits any partial output. Mirrors
 * `CostEstimateStream` so the swap to results feels like a continuation,
 * not a transition.
 *
 * Backend note: when the edge function is upgraded to write to a
 * `installation_method_partials` table (same shape as
 * `cost_engineer_partials`), this component can subscribe and lose the
 * threshold heuristic.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import {
  InstallationMethodInputs,
  INSTALLATION_TYPE_OPTIONS,
} from '@/types/installation-method-inputs';

interface InstallationStreamProps {
  inputs?: InstallationMethodInputs;
  /** Job ID — required to subscribe to streaming partials. */
  jobId?: string | null;
  jobProgress?: number;
  jobStatus?: 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep?: string;
  error?: string | null;
  /** Live partial method data — first steps may stream in mid-flight. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  liveMethod?: any | null;
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

const STAGES: Stage[] = [
  {
    id: 'briefing',
    label: 'Reading the brief',
    description: 'Parsing your description and any drawings, photos or PDFs.',
    threshold: 5,
  },
  {
    id: 'rag',
    label: 'Grounding against BS 7671',
    description: 'Pulling regulations and practical-work facets relevant to the job.',
    threshold: 32,
  },
  {
    id: 'method',
    label: 'Drafting the outline',
    description: 'Sequencing the steps, isolation points and inspection gates.',
    threshold: 50,
  },
  {
    id: 'enrichment',
    label: 'Deepening every step',
    description:
      'Each step gets its own focused RAG pass — sub-steps, safety, tools, acceptance criteria.',
    threshold: 70,
  },
  {
    id: 'validation',
    label: 'Verifying BS 7671 cites',
    description: 'Every regulation cite is checked against the live facets table.',
    threshold: 84,
  },
  {
    id: 'finalise',
    label: 'Finalising',
    description: 'Assembling the printable method statement.',
    threshold: 92,
  },
];

export const InstallationStream = ({
  inputs,
  jobId,
  jobProgress = 0,
  jobStatus = 'processing',
  currentStep,
  error,
  liveMethod,
  onCancel,
}: InstallationStreamProps) => {
  const [elapsedSec, setElapsedSec] = useState(0);
  const [startTime] = useState(Date.now());
  const [partials, setPartials] = useState<Map<string, PartialRow>>(new Map());

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  // Realtime subscription to installation_method_partials. Initial fetch
  // catches anything inserted before the channel opened, then we listen
  // for INSERT/UPDATE for the duration of the run.
  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
         
        .from('installation_method_partials' as any)
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
      .channel(realtimeChannelName(`imp-${jobId}`))
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'installation_method_partials',
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
          table: 'installation_method_partials',
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

  const cancelled = jobStatus === 'cancelled';
  const failed = jobStatus === 'failed' || !!error;
  const complete = jobStatus === 'complete';

  // Stage progress is partial-driven once the first partial lands;
  // falls back to jobProgress thresholds while the first partial is in
  // flight. Mirrors the Cost Engineer stream.
  let currentStageIndex = -1;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    const id = STAGES[i].id;
    if (partials.has(id) || jobProgress >= STAGES[i].threshold) {
      currentStageIndex = i;
      break;
    }
  }

  // RAG partial gives us a quick metadata strip showing how many regs +
  // practical-work hits are grounding the answer.
  const ragPayload = partials.get('rag')?.payload;
  const facetCount = ragPayload?.facetCount ?? null;
  const practicalCount = ragPayload?.practicalCount ?? null;

  const attachmentCount = inputs?.attachments.length ?? 0;
  const descriptionLength = inputs?.description.length ?? 0;
  const typeLabel = INSTALLATION_TYPE_OPTIONS.find(
    (o) => o.value === inputs?.installationType
  )?.label;

   
  const liveSteps: any[] = Array.isArray(liveMethod?.steps) ? liveMethod.steps : [];

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
                  complete
                    ? 'bg-emerald-400'
                    : failed || cancelled
                      ? 'bg-red-400'
                      : 'bg-elec-yellow animate-pulse'
                )}
              />
              {complete
                ? 'Method ready'
                : failed
                  ? 'Generation failed'
                  : cancelled
                    ? 'Cancelled'
                    : 'Generating'}
            </span>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Installation Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {inputs?.projectName || 'Method Statement'}
              </h1>
            </div>
            {onCancel && !complete && (
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
          <Eyebrow>STREAMING METHOD</Eyebrow>
          <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
            {complete
              ? 'Method statement is ready.'
              : failed
                ? 'Something went wrong.'
                : cancelled
                  ? 'Generation cancelled.'
                  : 'Sequencing the install.'}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-white/75 leading-relaxed max-w-2xl">
            {complete
              ? 'Opening the method statement.'
              : failed
                ? error || 'The job failed before it could finish.'
                : cancelled
                  ? 'You can edit the brief and try again.'
                  : currentStep ||
                    'BS 7671 grounding, step sequencing and per-step safety are all running in parallel.'}
          </p>

          {/* Context strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-[12px] text-white/65">
            {typeLabel && (
              <span className="uppercase tracking-[0.16em] text-[10.5px] font-semibold text-white/55">
                {typeLabel}
              </span>
            )}
            <span className="tabular-nums">{descriptionLength} chars</span>
            {attachmentCount > 0 && (
              <span className="tabular-nums">
                {attachmentCount} attachment{attachmentCount === 1 ? '' : 's'}
              </span>
            )}
            {facetCount !== null && (
              <span className="tabular-nums">
                {facetCount} reg{facetCount === 1 ? '' : 's'} grounded
              </span>
            )}
            {practicalCount !== null && (
              <span className="tabular-nums">
                {practicalCount} procedure{practicalCount === 1 ? '' : 's'}
              </span>
            )}
            <span className="tabular-nums">{formatTime(elapsedSec)}</span>
            <span className="tabular-nums">{Math.min(99, Math.round(jobProgress))}%</span>
          </div>
        </section>

        {/* STAGE LIST */}
        <section>
          <Eyebrow className="mb-3">STAGES</Eyebrow>
          <ol className="-mx-4 sm:mx-0 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
            {STAGES.map((stage, i) => {
              const done = i < currentStageIndex || complete;
              const active = i === currentStageIndex && !complete && !failed && !cancelled;
              return (
                <motion.li
                  key={stage.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-4 sm:px-5 py-4 sm:py-5 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {done ? (
                      <div className="h-6 w-6 rounded-full bg-emerald-400/15 border border-emerald-400/40 inline-flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          className="text-emerald-300"
                        >
                          <path
                            d="M2.5 6.5l2.5 2.5 4.5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : active ? (
                      <div className="h-6 w-6 rounded-full border-2 border-elec-yellow/60 border-t-elec-yellow animate-spin" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border border-white/15 inline-flex items-center justify-center text-[10px] font-semibold text-white/40 tabular-nums">
                        {i + 1}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3
                        className={cn(
                          'text-[14px] sm:text-[15px] font-semibold tracking-tight',
                          done ? 'text-white/65' : active ? 'text-elec-yellow' : 'text-white/85'
                        )}
                      >
                        {stage.label}
                      </h3>
                      {active && currentStep && (
                        <span className="text-[10.5px] uppercase tracking-[0.16em] font-semibold text-elec-yellow/80 truncate ml-2">
                          {currentStep}
                        </span>
                      )}
                    </div>
                    <p className="text-[12.5px] text-white/55 leading-snug mt-0.5">
                      {stage.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>

        {/* LIVE STEPS PREVIEW */}
        {liveSteps.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>LIVE METHOD</Eyebrow>
              <span className="text-[11px] tabular-nums text-white/55">
                {liveSteps.length} step{liveSteps.length === 1 ? '' : 's'} drafted
              </span>
            </div>
            <ul className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
              {liveSteps.slice(0, 6).map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 sm:px-5 py-3 sm:py-4 flex items-start gap-3"
                >
                  <span className="text-[10.5px] font-semibold tracking-[0.16em] text-elec-yellow tabular-nums mt-0.5">
                    {String(step.stepNumber ?? i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] text-white/85 leading-snug">
                    {step.title || step.content?.slice(0, 90) || '—'}
                  </span>
                </motion.li>
              ))}
            </ul>
          </section>
        )}

        {/* FAILURE STATE */}
        {failed && (
          <section className="-mx-4 sm:mx-0 bg-red-500/[0.06] border-y sm:border sm:rounded-2xl border-red-400/25 px-4 sm:px-5 py-4 sm:py-5 space-y-2">
            <h3 className="text-[14px] font-semibold text-red-300 tracking-tight">
              Method generation failed
            </h3>
            <p className="text-[12.5px] text-red-200/85 leading-snug">
              {error ||
                'The model couldn&rsquo;t complete this run. Edit the brief or try again — your inputs are still saved.'}
            </p>
          </section>
        )}
      </main>
    </div>
  );
};
