import { AlertTriangle, Shield, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getRiskColors, getHighestRiskScore } from '@/utils/risk-level-helpers';

interface RiskSummaryStatsProps {
  hazards: any[];
  ppeItems: any[];
  emergencyProcedures: string[];
}

export const RiskSummaryStats = ({ hazards, ppeItems, emergencyProcedures }: RiskSummaryStatsProps) => {
  const totalHazards = hazards?.length || 0;
  const highestScore = getHighestRiskScore(hazards);
  const riskColors = getRiskColors(highestScore);
  const totalPPE = ppeItems?.length || 0;
  const totalEmergency = emergencyProcedures?.length || 0;

  const stats = [
    {
      icon: AlertTriangle,
      label: 'Hazards Identified',
      value: totalHazards,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Highest Risk',
      value: highestScore,
      badge: riskColors.badge,
      color: riskColors.text,
      bgColor: riskColors.bg.replace('/90', '/10'),
    },
    {
      icon: Shield,
      label: 'PPE Required',
      value: totalPPE,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: AlertCircle,
      label: 'Emergency Steps',
      value: totalEmergency,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`${stat.bgColor} p-4 rounded-xl min-h-[44px]`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-white/50 font-medium">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
            {stat.badge && (
              <Badge className={`${stat.badge} mt-2`}>
                {stat.value <= 4 ? 'LOW' : stat.value <= 12 ? 'MED' : 'HIGH'}
              </Badge>
            )}
          </div>
        );
      })}
    </div>
  );
};
