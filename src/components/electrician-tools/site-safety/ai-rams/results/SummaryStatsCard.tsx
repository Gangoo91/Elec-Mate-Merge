import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { 
  getTotalHazardCount, 
  getHighestRiskScore, 
  getOverallRiskLevel,
  getTotalControlMeasures,
  getRiskColors
} from '@/utils/risk-level-helpers';
import type { RAMSRisk } from '@/types/rams';

interface SummaryStatsCardProps {
  risks: RAMSRisk[];
}

export const SummaryStatsCard: React.FC<SummaryStatsCardProps> = ({ risks }) => {
  const totalHazards = getTotalHazardCount(risks);
  const highestScore = getHighestRiskScore(risks);
  const overallLevel = getOverallRiskLevel(risks);
  const totalControls = getTotalControlMeasures(risks);
  const riskColors = getRiskColors(highestScore);

  const stats = [
    {
      icon: AlertTriangle,
      label: 'Total Hazards',
      value: totalHazards,
      color: 'text-elec-yellow'
    },
    {
      icon: TrendingUp,
      label: 'Highest Risk',
      value: highestScore,
      color: riskColors.text,
      badge: overallLevel.toUpperCase()
    },
    {
      icon: Shield,
      label: 'Control Measures',
      value: totalControls,
      color: 'text-green-400'
    },
    {
      icon: CheckCircle,
      label: 'Mitigated Risks',
      value: risks.filter(r => r.residualRisk <= 4).length,
      color: 'text-blue-400'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-elec-gray via-elec-gray/95 to-elec-gray/90 border-elec-yellow/30 mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-elec-light mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-elec-yellow rounded-full"></span>
          Risk Assessment Summary
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center p-4 bg-card/50 rounded-xl border border-primary/20 hover:border-elec-yellow/40 transition-all"
              >
                <Icon className={`h-8 w-8 mb-2 ${stat.color}`} />
                <div className="text-3xl font-bold text-elec-light mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-elec-light/70 mb-2">
                  {stat.label}
                </div>
                {stat.badge && (
                  <Badge className={riskColors.badge}>
                    {stat.badge}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
