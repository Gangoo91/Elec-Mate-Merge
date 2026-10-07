import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';

/* ==========================================================================
   IQA visuals (ELE-1871). The IQA cycle is plan → sample → verdict →
   actions → closure. Every IQA screen shows where the college (or one plan)
   is in that cycle with the same strip, so an EQA can follow the chain.
   ========================================================================== */

export type FlowState = 'done' | 'now' | 'todo';

export interface FlowStep {
  key: string;
  label: string;
  /** The figure for this step, e.g. "13 of 20". */
  value: string;
  /** One plain line under the figure. */
  sub: string;
  state: FlowState;
  onClick?: () => void;
}

/** Five numbered steps in a row on desktop, a 2-column grid on phones. */
export function IqaFlowStrip({ steps, title = 'The IQA cycle' }: { steps: FlowStep[]; title?: string }) {
  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      aria-label={title}
      className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6"
    >
      <p className="text-[13px] font-semibold text-white">{title}</p>
      <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {steps.map((s, i) => {
          const body = (
            <>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11.5px] font-bold tabular-nums',
                    s.state === 'done'
                      ? 'bg-emerald-500 text-black'
                      : s.state === 'now'
                        ? 'bg-elec-yellow text-black'
                        : 'border border-white/[0.25] text-white'
                  )}
                  aria-hidden
                >
                  {s.state === 'done' ? '✓' : i + 1}
                </span>
                <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white">{s.label}</span>
              </span>
              <span className="mt-2 block text-[20px] font-bold leading-tight tabular-nums text-white">{s.value}</span>
              <span className="mt-1 block text-[12px] leading-snug text-white">{s.sub}</span>
            </>
          );
          const cls = cn(
            'block h-full w-full rounded-2xl border px-4 py-3.5 text-left',
            s.state === 'now' ? 'border-elec-yellow/60 bg-elec-yellow/[0.06]' : 'border-white/[0.08] bg-white/[0.03]'
          );
          return (
            <li key={s.key} className={cn(i === steps.length - 1 && steps.length % 2 === 1 && 'col-span-2 sm:col-span-1')}>
              {s.onClick ? (
                <button type="button" onClick={s.onClick} className={cn(cls, 'touch-manipulation transition-colors hover:border-white/[0.25]')}>
                  {body}
                </button>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    </motion.section>
  );
}

/**
 * BarList keys its rows by label, so two staff with the same name would clash.
 * Number repeated names: "Andrew Moore", "Andrew Moore (2)".
 */
export function uniqueLabels(names: string[]): string[] {
  const seen = new Map<string, number>();
  return names.map((n) => {
    const c = (seen.get(n) ?? 0) + 1;
    seen.set(n, c);
    return c === 1 ? n : `${n} (${c})`;
  });
}

export interface SampleVerdictRow {
  sampling_plan_id: string;
  verdict: 'pending' | 'agree' | 'disagree' | 'refer';
}

/** Every sample verdict across the college's plans (RLS scopes to the college). */
export function useIqaSampleVerdicts(planIds: string[]) {
  const key = [...planIds].sort().join(',');
  return useQuery({
    queryKey: ['iqa-sample-verdicts', key],
    enabled: planIds.length > 0,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('college_iqa_samples')
        .select('sampling_plan_id, verdict')
        .in('sampling_plan_id', planIds);
      if (error) throw error;
      return (data ?? []) as SampleVerdictRow[];
    },
  });
}
