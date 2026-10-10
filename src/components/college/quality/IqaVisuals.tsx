import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';

/* ==========================================================================
   IQA visuals (ELE-1871). The IQA cycle is plan → sample → verdict →
   actions → closure. Every IQA screen shows where the college (or one plan)
   is in that cycle with the same strip, so an EQA can follow the chain.
   A step that needs someone has an orange ring and its line in orange; a
   finished step is green.
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

/** Five numbered steps in a row from tablets up, one row each on a phone. */
export function IqaFlowStrip({
  steps,
  title = 'The IQA cycle',
}: {
  steps: FlowStep[];
  title?: string;
}) {
  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      aria-label={title}
      className="-mx-4 max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] card-surface p-4 sm:mx-0 sm:rounded-2xl sm:border sm:p-5"
    >
      <p className="text-[13px] font-semibold text-white">{title}</p>
      {/* Phone: one row per step (ring, name, figure; the line under it),
          so five steps never leave an odd tile. Desktop: equal tiles in a row. */}
      <ol className="mt-3 divide-y divide-white/[0.06] lg:mt-4 lg:grid lg:grid-cols-5 lg:divide-x lg:divide-y-0 lg:[&>li:first-child>*]:pl-0">
        {steps.map((s, i) => {
          const ring = (
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold tabular-nums',
                s.state === 'done'
                  ? 'border border-emerald-400/70 text-emerald-300'
                  : s.state === 'now'
                    ? 'border border-orange-400/70 text-orange-300'
                    : 'border border-white/[0.25] text-white'
              )}
              aria-hidden
            >
              {s.state === 'done' ? '✓' : i + 1}
            </span>
          );
          // Showcase pass (10 Oct): no "To do" badge on every open step. The
          // step's own line says what is waiting, in orange; the rest stay white.
          const subCn = s.state === 'now' ? 'font-semibold text-orange-300' : 'text-white';
          const body = (
            <>
              {/* Phone: ring, step and its line, the figure on the right. */}
              <span className="flex min-w-0 items-start gap-2.5 lg:hidden">
                {ring}
                <span className="min-w-0 flex-1">
                  <span className="text-[14px] font-semibold text-white">{s.label}</span>
                  <span className={cn('mt-0.5 block text-[12.5px] leading-snug', subCn)}>
                    {s.sub}
                  </span>
                </span>
                <span className="shrink-0 text-right text-[16px] font-bold leading-tight tabular-nums text-white">
                  {s.value}
                </span>
              </span>
              {/* Desktop tile. */}
              <span className="hidden lg:block">
                <span className="flex min-w-0 items-center gap-2">
                  {ring}
                  <span className="text-[14px] font-semibold text-white">{s.label}</span>
                </span>
                <span className="mt-2 block text-[20px] font-bold leading-tight tabular-nums text-white">
                  {s.value}
                </span>
                <span className={cn('mt-1 block text-[12.5px] leading-snug', subCn)}>{s.sub}</span>
              </span>
            </>
          );
          // Desktop: five cells in one card with a hairline between, not five
          // boxes (10 Oct: a row of orange-edged boxes read as alarms).
          const cls = 'block h-full w-full py-3 text-left lg:rounded-xl lg:px-4 lg:py-2';
          return (
            <li key={s.key} className="min-w-0">
              {s.onClick ? (
                <button
                  type="button"
                  onClick={s.onClick}
                  className={cn(
                    cls,
                    'touch-manipulation transition-colors active:bg-white/[0.05] lg:hover:bg-white/[0.03]'
                  )}
                >
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
