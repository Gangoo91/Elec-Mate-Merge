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
import { cn } from '@/lib/utils';
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
    <Card className="bg-gradient-to-br from-elec-gray via-elec-gray/95 to-elec-gray/90 border-elec-yellow/20 mb-3">
      <CardContent className="p-3">
        <h3 className="text-sm font-bold text-elec-light mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Risk Assessment Summary
        </h3>

        <div className="grid grid-cols-4 gap-1.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-2 bg-card/50 rounded-lg border border-white/[0.08] active:scale-[0.98] transition-all touch-manipulation"
              >
                <Icon className={`h-5 w-5 mb-1 ${stat.color}`} />
                <div className="text-xl font-bold text-elec-light">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white">
                  {stat.label}
                </div>
                {stat.badge && (
                  <Badge className={cn(riskColors.badge, "text-[9px] px-1.5 py-0 mt-1")}>
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
