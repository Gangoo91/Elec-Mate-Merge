import { getHighestRiskScore, getRiskLevel } from '@/utils/risk-level-helpers';

interface RiskSummaryStatsProps {
  hazards: any[];
  ppeItems: any[];
  emergencyProcedures: string[];
}

export const RiskSummaryStats = ({
  hazards,
  ppeItems,
  emergencyProcedures,
}: RiskSummaryStatsProps) => {
  const hazardCount = hazards?.length || 0;
  const highestScore = getHighestRiskScore(hazards);
  const riskLevel = getRiskLevel(highestScore);
  const ppeCount = ppeItems?.length || 0;
  const emergencySteps = emergencyProcedures?.length || 0;

  const highestRiskLabel = highestScore <= 4 ? 'LOW' : highestScore <= 12 ? 'MED' : 'HIGH';

  // Risk colour: red for HIGH, amber for MEDIUM, green for LOW
  const riskColorMap = {
    low: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    medium: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' },
    high: { border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-400' },
  };
  const riskColor = riskColorMap[riskLevel];

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-2 py-2.5 text-center">
        <p className="text-lg font-bold text-orange-400">{hazardCount}</p>
        <p className="text-[10px] font-medium text-white">Hazards</p>
      </div>
      <div className={`rounded-xl ${riskColor.border} ${riskColor.bg} px-2 py-2.5 text-center`}>
        <p className={`text-lg font-bold ${riskColor.text}`}>{highestRiskLabel}</p>
        <p className="text-[10px] font-medium text-white">Risk</p>
      </div>
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-2 py-2.5 text-center">
        <p className="text-lg font-bold text-blue-400">{ppeCount}</p>
        <p className="text-[10px] font-medium text-white">PPE</p>
      </div>
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-2 py-2.5 text-center">
        <p className="text-lg font-bold text-emerald-400">{emergencySteps}</p>
        <p className="text-[10px] font-medium text-white">Steps</p>
      </div>
    </div>
  );
};
