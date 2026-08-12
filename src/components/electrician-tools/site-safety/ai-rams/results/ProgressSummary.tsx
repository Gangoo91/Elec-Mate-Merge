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
export const ProgressSummary: React.FC<ProgressSummaryProps> = ({ steps, totalEstimatedTime }) => {
  const totalSteps = steps.length;
  const completedSteps = steps.filter((s) => s.isCompleted).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const estimatedTime = totalEstimatedTime || `${totalSteps * 30} min`;

  return (
    <section className="grid grid-cols-1 divide-y divide-white/[0.1] overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.05] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
          Steps
        </div>
        <div className="mt-2.5 sm:mt-3 text-[28px] sm:text-[36px] font-semibold tabular-nums tracking-tight leading-none text-elec-yellow">
          {totalSteps}
        </div>
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
          Progress
        </div>
        <div className="mt-2.5 sm:mt-3 text-[28px] sm:text-[36px] font-semibold tabular-nums tracking-tight leading-none text-emerald-400">
          {progressPercent}%
        </div>
        <div className="mt-2 text-[11px] text-white tabular-nums">
          {completedSteps} of {totalSteps} done
        </div>
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
          Estimated
        </div>
        <div className="mt-2.5 sm:mt-3 text-[17px] sm:text-[22px] font-semibold tabular-nums tracking-tight leading-none text-white">
          {estimatedTime}
        </div>
      </div>
    </section>
  );
};
