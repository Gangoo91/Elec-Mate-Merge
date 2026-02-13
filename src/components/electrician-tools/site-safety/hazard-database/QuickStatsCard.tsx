import React, { useMemo } from 'react';
import { AlertTriangle, Shield, HardHat } from 'lucide-react';
import type { EnhancedRiskConsequence } from '@/data/hazards';

interface QuickStatsCardProps {
  hazards: EnhancedRiskConsequence[];
  categoryName?: string;
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  hazards,
  categoryName,
}) => {
  const stats = useMemo(() => {
    const highRiskCount = hazards.filter((h) => h.riskRating >= 9).length;
    const ppeCount = hazards.filter(
      (h) => h.controlMeasures.ppe && h.controlMeasures.ppe.length > 0
    ).length;

    return {
      total: hazards.length,
      highRisk: highRiskCount,
      withPPE: ppeCount,
    };
  }, [hazards]);

  return (
    <div className="bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/20 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        {/* Left - Total count */}
        <div>
          <h3 className="text-sm font-medium text-white">
            {categoryName ? `${categoryName} Hazards` : 'All Hazards'}
          </h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
        </div>

        {/* Right - Mini stats */}
        <div className="flex gap-5">
          {/* High Risk */}
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-1.5">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
            </div>
            <p className="text-lg font-bold text-white">{stats.highRisk}</p>
            <p className="text-[10px] text-white uppercase tracking-wider">
              High Risk
            </p>
          </div>

          {/* PPE Required */}
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 mb-1.5">
              <HardHat className="h-5 w-5 text-elec-yellow" />
            </div>
            <p className="text-lg font-bold text-white">{stats.withPPE}</p>
            <p className="text-[10px] text-white uppercase tracking-wider">
              PPE Req.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;
