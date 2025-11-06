import { AlertTriangle, Shield, AlertCircle, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-gray/50">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Risk Assessment Summary
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`${stat.bgColor} p-4 rounded-lg border border-current/20 hover:scale-105 transition-transform`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                  <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                  {stat.badge && (
                    <Badge className={stat.badge}>
                      {stat.value <= 4 ? 'LOW' : stat.value <= 12 ? 'MED' : 'HIGH'}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
