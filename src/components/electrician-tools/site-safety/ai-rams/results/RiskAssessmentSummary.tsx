import React from 'react';
import { RAMSData } from '@/types/rams';

interface RiskAssessmentSummaryProps {
  ramsData: RAMSData;
}

/**
 * Risk Assessment Summary on the Method Statement tab — editorial.
 * 4-stat strip + high-risk hazard list, no card chrome, no icons.
 */
export function RiskAssessmentSummary({ ramsData }: RiskAssessmentSummaryProps) {
  const risks = ramsData.risks || [];
  if (risks.length === 0) return null;

  const hazardsCount = risks.length;
  const controlsCount = risks.reduce((sum, r) => {
    const controls = r.controls?.split('\n').filter((c) => c.trim());
    return sum + (controls?.length || 0);
  }, 0);
  const highRiskHazards = risks.filter((r) => r.riskRating >= 15);
  const mediumRiskHazards = risks.filter((r) => r.riskRating >= 9 && r.riskRating < 15);

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Risk overview
        </div>
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
          Hazards at a glance.
        </h3>
      </div>

      {/* 4-stat editorial strip */}
      <div className="-mx-4 sm:mx-0 grid grid-cols-2 lg:grid-cols-4 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]">
        <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Hazards
          </div>
          <div className="mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none text-elec-yellow">
            {hazardsCount}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Controls
          </div>
          <div className="mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none text-emerald-400">
            {controlsCount}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
            High risk
          </div>
          <div className="mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none text-red-400">
            {highRiskHazards.length}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-6 sm:py-6">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400">
            Medium
          </div>
          <div className="mt-2.5 sm:mt-3 text-[34px] sm:text-[40px] font-semibold tabular-nums tracking-tight leading-none text-amber-400">
            {mediumRiskHazards.length}
          </div>
        </div>
      </div>

      {highRiskHazards.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
            Immediate attention
          </div>
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {highRiskHazards.map((risk, idx) => (
              <li key={idx} className="py-3 flex items-baseline gap-3">
                <span className="text-[11.5px] font-semibold tabular-nums text-red-400 shrink-0 w-8">
                  {risk.riskRating}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] text-white/85 leading-relaxed">{risk.hazard}</p>
                  {risk.linkedToStep !== undefined && risk.linkedToStep > 0 && (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] font-medium text-elec-yellow tabular-nums">
                      Step {risk.linkedToStep}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-[12px] text-white/55 leading-relaxed">
        See the Risk Assessment tab for full hazard analysis, control measures and residual
        risk ratings.
      </p>
    </section>
  );
}
