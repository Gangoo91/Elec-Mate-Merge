import React from 'react';
import {
  getTotalHazardCount,
  getHighestRiskScore,
  getOverallRiskLevel,
  getTotalControlMeasures,
  getRiskColors,
} from '@/utils/risk-level-helpers';
import { cn } from '@/lib/utils';
import type { RAMSRisk } from '@/types/rams';

interface SummaryStatsCardProps {
  risks: RAMSRisk[];
}

/**
 * Risk Assessment Summary — editorial 4-stat strip.
 *
 * No icons, no card chrome on mobile, no "Risk Assessment Summary"
 * preamble — the section eyebrow above already identifies it.
 * Numbers do the talking. Same DNA as AgentSelectorPage's "01 · THIS
 * MONTH" tile strip.
 */
export const SummaryStatsCard: React.FC<SummaryStatsCardProps> = ({ risks }) => {
  const totalHazards = getTotalHazardCount(risks);
  const highestScore = getHighestRiskScore(risks);
  const overallLevel = getOverallRiskLevel(risks);
  const totalControls = getTotalControlMeasures(risks);
  const mitigated = risks.filter((r) => r.residualRisk <= 4).length;
  const riskColors = getRiskColors(highestScore);

  const stats: Array<{
    eyebrow: string;
    value: number | string;
    sub?: string;
    tone?: 'yellow' | 'critical' | 'emerald' | 'neutral';
  }> = [
    { eyebrow: 'Hazards', value: totalHazards, tone: 'yellow' },
    {
      eyebrow: 'Highest risk',
      value: highestScore,
      sub: overallLevel.toUpperCase(),
      tone: 'critical',
    },
    { eyebrow: 'Controls', value: totalControls, tone: 'emerald' },
    { eyebrow: 'Mitigated', value: mitigated, sub: `of ${totalHazards}`, tone: 'neutral' },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-white/[0.1] lg:divide-y-0 overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.05]">
      {stats.map((stat, idx) => {
        const valueClass =
          stat.tone === 'yellow'
            ? 'text-elec-yellow'
            : stat.tone === 'critical'
              ? riskColors.text
              : stat.tone === 'emerald'
                ? 'text-emerald-400'
                : 'text-white';

        return (
          <div key={idx} className="px-4 py-4 sm:px-5 sm:py-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              {stat.eyebrow}
            </div>
            <div
              className={cn(
                'mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none',
                valueClass
              )}
            >
              {stat.value}
            </div>
            {stat.sub && (
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white tabular-nums">
                {stat.sub}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
