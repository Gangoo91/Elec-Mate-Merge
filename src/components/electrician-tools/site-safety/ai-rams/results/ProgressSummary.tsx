import React from 'react';
import type { MethodStep } from '@/types/method-statement';

interface ProgressSummaryProps {
  steps: MethodStep[];
  totalEstimatedTime?: string;
}

/**
 * Installation summary — editorial 3-stat strip.
 * Steps · Completed · Estimated time.
 */
export const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  steps,
  totalEstimatedTime,
}) => {
  const totalSteps = steps.length;
  const completedSteps = steps.filter((s) => s.isCompleted).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const estimatedTime = totalEstimatedTime || `${totalSteps * 30} min`;

  return (
    <section className="-mx-4 sm:mx-0 grid grid-cols-3 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
      <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Steps
        </div>
        <div className="mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none text-elec-yellow">
          {totalSteps}
        </div>
      </div>
      <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Progress
        </div>
        <div className="mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none text-emerald-400">
          {progressPercent}%
        </div>
        <div className="mt-2 text-[11px] text-white/55 tabular-nums">
          {completedSteps} of {totalSteps} done
        </div>
      </div>
      <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Estimated
        </div>
        <div className="mt-2.5 sm:mt-3 text-[22px] sm:text-[28px] font-semibold tabular-nums tracking-tight leading-none text-white">
          {estimatedTime}
        </div>
      </div>
    </section>
  );
};
