/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Circuit Design Stream
 *
 * Editorial streaming surface that subscribes to `circuit_design_partials`
 * and renders circuit slots filling in live as the worker designs each one.
 *
 * Replaces the static DesignProcessingView. Visually matches the results page,
 * so the swap to DesignReviewEditor on completion feels like a continuation,
 * not a transition.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { CircuitInput } from '@/types/installation-design';

interface CircuitDesignStreamProps {
  jobId: string | null;
  inputs?: { circuits: CircuitInput[]; projectName?: string; voltage?: number };
  userRequest?: string;
  jobProgress?: number;
  jobStatus?: string;
  currentStep?: string;
  estimatedTimeRemaining?: string | null;
  onCancel?: () => void;
  /** Called when the user opts to view partial results before the job completes. */
  onForceResults?: () => void;
}

interface PartialCircuit {
  circuit_index: number;
  circuit_data: any;
  created_at: string;
}

export const CircuitDesignStream = ({
  jobId,
  inputs,
  userRequest,
  jobProgress = 0,
  jobStatus = 'processing',
  currentStep,
  estimatedTimeRemaining,
  onCancel,
  onForceResults,
}: CircuitDesignStreamProps) => {
  const [partials, setPartials] = useState<Map<number, PartialCircuit>>(new Map());
  const [elapsedSec, setElapsedSec] = useState(0);
  const [startTime] = useState(Date.now());

  const totalCircuits = inputs?.circuits?.length ?? 0;
  const completedCircuits = partials.size;

  // Realtime subscription to circuit_design_partials INSERT
  useEffect(() => {
    if (!jobId) return;

    // Initial fetch in case some inserts happened before subscription opened
    (async () => {
      const { data } = await supabase
        .from('circuit_design_partials' as any)
        .select('*')
        .eq('job_id', jobId);
      if (data) {
        setPartials((prev) => {
          const next = new Map(prev);
          (data as any[]).forEach((row: any) => {
            next.set(row.circuit_index, row as PartialCircuit);
          });
          return next;
        });
      }
    })();

    const channel = supabase
      .channel(`partials-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'circuit_design_partials',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const row = payload.new as any;
          setPartials((prev) => {
            const next = new Map(prev);
            next.set(row.circuit_index, row as PartialCircuit);
            return next;
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'circuit_design_partials',
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const row = payload.new as any;
          setPartials((prev) => {
            const next = new Map(prev);
            next.set(row.circuit_index, row as PartialCircuit);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [jobId]);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m > 0 ? `${m}:${r.toString().padStart(2, '0')}` : `0:${r.toString().padStart(2, '0')}`;
  };

  // Live diversity / load totals from completed partials
  const liveTotals = useMemo(() => {
    let total = 0;
    let diversified = 0;
    partials.forEach((p) => {
      const circuit = p.circuit_data;
      total += Number(circuit?.loadPower ?? 0);
      diversified += Number(
        circuit?.calculations?.diversifiedLoad ?? circuit?.loadPower ?? 0
      );
    });
    return {
      total,
      diversified,
      factor: total > 0 ? diversified / total : 0,
    };
  }, [partials]);

  const cancelled = jobStatus === 'cancelled';

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header — sits BELOW the main app header (ELE-869).
          Main header is fixed top-0 z-50; this sub-header sticks at
          var(--header-height) with a lower z-index so the app banner always
          wins on top. */}
      <div
        className="sticky z-30 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]"
        style={{ top: 'var(--header-height, 56px)' }}
      >
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white">
              <span
                className={cn(
                  'inline-block h-2 w-2 rounded-full',
                  jobStatus === 'complete'
                    ? 'bg-emerald-400'
                    : jobStatus === 'failed' || cancelled
                      ? 'bg-red-400'
                      : 'bg-elec-yellow animate-pulse'
                )}
              />
              {jobStatus === 'complete'
                ? 'Design complete'
                : jobStatus === 'failed'
                  ? 'Design failed'
                  : cancelled
                    ? 'Cancelled'
                    : 'Designing'}
            </span>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {inputs?.projectName || 'Circuit Designer'}
              </h1>
            </div>
            {onCancel && jobStatus !== 'complete' && (
              <button
                type="button"
                onClick={onCancel}
                className="text-[12px] font-medium text-white/70 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-7 sm:space-y-10">
        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>STREAMING DESIGN</Eyebrow>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.05] text-white">
            <span className="text-elec-yellow">{completedCircuits}</span>
            <span className="text-white/40"> / {totalCircuits}</span>{' '}
            <span className="text-white">circuits designed.</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-2xl">
            {currentStep ||
              'Designing each circuit against BS 7671:2018+A4:2026 and citing every choice.'}
          </p>
        </section>

        {/* Live progress bar */}
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
              {estimatedTimeRemaining ?? ''}
            </span>
          </div>
        </section>

        {/* Force-results CTA — appears when we've waited long enough with most
            circuits in. Lets the user bail on a stuck circuit and review what's
            been designed. */}
        {onForceResults &&
          jobStatus !== 'complete' &&
          completedCircuits >= Math.max(1, Math.ceil(totalCircuits * 0.5)) &&
          elapsedSec >= 60 && (
            <section className="bg-[hsl(0_0%_10%)] border border-elec-yellow/30 rounded-2xl p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className="space-y-1 min-w-0">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                    Most circuits ready
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-tight leading-snug text-white">
                    {completedCircuits} of {totalCircuits} designed · view results now?
                  </h3>
                  <p className="text-[12.5px] leading-relaxed text-white/70 max-w-2xl">
                    Some circuits are taking longer than expected. You can review what's
                    designed so far — circuits still working will be flagged for re-design.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onForceResults}
                  className="h-11 px-5 rounded-xl bg-elec-yellow text-black font-semibold text-[13px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation transition-all shrink-0"
                >
                  View results
                </button>
              </div>
            </section>
          )}

        {/* Live totals strip — populates as circuits arrive */}
        <section className="grid grid-cols-3 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Connected load
            </div>
            <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-white">
              {(liveTotals.total / 1000).toFixed(1)}
              <span className="text-white/60"> kW</span>
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Diversified
            </div>
            <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-elec-yellow">
              {(liveTotals.diversified / 1000).toFixed(1)}
              <span className="text-white/60"> kW</span>
            </div>
          </div>
          <div className="bg-[hsl(0_0%_10%)] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Factor
            </div>
            <div className="mt-1 text-[15px] sm:text-[17px] font-semibold tabular-nums text-white">
              {liveTotals.factor > 0 ? liveTotals.factor.toFixed(2) : '—'}
            </div>
          </div>
        </section>

        {/* Circuit slots — fixed in wizard order, fill in as partials arrive */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <Eyebrow>CIRCUITS</Eyebrow>
            <span className="text-[11px] text-white/60 tabular-nums">
              {completedCircuits} of {totalCircuits} ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {(inputs?.circuits ?? []).map((wizardCircuit, index) => {
              const partial = partials.get(index);
              const isFilled = !!partial;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ opacity: 1 }}
                  className={cn(
                    'relative bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5 min-h-[160px]',
                    isFilled
                      ? 'border-elec-yellow/30'
                      : 'border-white/[0.08]'
                  )}
                >
                  {/* Index pill */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                        isFilled ? 'text-white/85' : 'text-white/40'
                      )}
                    >
                      · {isFilled ? 'COMPLETE' : 'DESIGNING…'}
                    </span>
                    {!isFilled && (
                      <span
                        className="ml-auto inline-block h-2 w-2 rounded-full bg-elec-yellow animate-pulse"
                        aria-hidden
                      />
                    )}
                  </div>

                  {/* Circuit name (always shown — comes from wizard input) */}
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-white tracking-tight leading-tight">
                    {wizardCircuit.name || `Circuit ${index + 1}`}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/60 capitalize">
                    {(wizardCircuit.loadType || '').replace(/-/g, ' ')}
                    {wizardCircuit.loadPower
                      ? ` · ${(wizardCircuit.loadPower / 1000).toFixed(1)} kW`
                      : ''}
                  </p>

                  <AnimatePresence mode="wait">
                    {isFilled ? (
                      <motion.div
                        key="filled"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]"
                      >
                        <FactRow
                          label="Cable"
                          value={
                            partial.circuit_data.cableSize
                              ? `${partial.circuit_data.cableSize} mm²`
                              : '—'
                          }
                        />
                        <FactRow
                          label="Protection"
                          value={
                            partial.circuit_data.protectionDevice
                              ? `${partial.circuit_data.protectionDevice.rating}A ${partial.circuit_data.protectionDevice.type}`
                              : '—'
                          }
                        />
                        <FactRow
                          label="Zs"
                          value={
                            partial.circuit_data.calculations?.zs != null
                              ? `${Number(partial.circuit_data.calculations.zs).toFixed(2)} Ω`
                              : '—'
                          }
                        />
                        <FactRow
                          label="VD"
                          value={
                            partial.circuit_data.calculations?.voltageDrop?.percent != null
                              ? `${Number(partial.circuit_data.calculations.voltageDrop.percent).toFixed(2)} %`
                              : '—'
                          }
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="skeleton"
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="mt-3 space-y-2"
                      >
                        <div className="h-3 w-3/4 rounded bg-white/[0.06]" />
                        <div className="h-3 w-1/2 rounded bg-white/[0.06]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Reg cites footer — only when filled */}
                  {isFilled &&
                    Array.isArray(partial.circuit_data.regulation_refs) &&
                    partial.circuit_data.regulation_refs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                        {partial.circuit_data.regulation_refs.slice(0, 4).map((r: any, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-elec-yellow/[0.08] text-elec-yellow border border-elec-yellow/20 tabular-nums"
                          >
                            {r.reg}
                          </span>
                        ))}
                      </div>
                    )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* User brief preview */}
        {userRequest && userRequest.trim().length > 0 && (
          <section className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5 space-y-2">
            <Eyebrow className="text-white/60">YOUR BRIEF</Eyebrow>
            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white/85 whitespace-pre-wrap">
              {userRequest}
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

const FactRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
      {label}
    </span>
    <span className="text-[13px] font-semibold tabular-nums text-white mt-0.5">{value}</span>
  </div>
);
