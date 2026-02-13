import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Link2 } from 'lucide-react';
import { RAMSData } from '@/types/rams';

interface RiskAssessmentSummaryProps {
  ramsData: RAMSData;
}

export function RiskAssessmentSummary({ ramsData }: RiskAssessmentSummaryProps) {
  const risks = ramsData.risks || [];
  
  if (risks.length === 0) {
    return null;
  }

  const hazardsCount = risks.length;
  const controlsCount = risks.reduce((sum, r) => {
    const controls = r.controls?.split('\n').filter(c => c.trim());
    return sum + (controls?.length || 0);
  }, 0);
  const highRiskHazards = risks.filter(r => r.riskRating >= 15); // High risk = score 15+
  const mediumRiskHazards = risks.filter(r => r.riskRating >= 9 && r.riskRating < 15);

  if (hazardsCount === 0) {
    return null;
  }

  return (
    <Card className="bg-red-500/5 border-red-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Risk Assessment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        {/* Statistics */}
        <div className="grid grid-cols-4 gap-1.5">
          <div className="bg-elec-gray/30 border border-red-500/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-red-400">{hazardsCount}</div>
            <div className="text-[10px] text-white">Hazards</div>
          </div>

          <div className="bg-elec-gray/30 border border-green-500/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-green-400">{controlsCount}</div>
            <div className="text-[10px] text-white">Controls</div>
          </div>

          <div className="bg-elec-gray/30 border border-red-500/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-red-400">{highRiskHazards.length}</div>
            <div className="text-[10px] text-white">High</div>
          </div>

          <div className="bg-elec-gray/30 border border-amber-500/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-amber-400">{mediumRiskHazards.length}</div>
            <div className="text-[10px] text-white">Medium</div>
          </div>
        </div>

        {/* High Risk Hazards */}
        {highRiskHazards.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              High Risk Hazards Requiring Immediate Attention
            </h4>
            <div className="space-y-2">
              {highRiskHazards.map((risk, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs mt-0.5">
                    {risk.riskRating}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-white">{risk.hazard}</p>
                    {risk.linkedToStep && risk.linkedToStep > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Link2 className="h-3 w-3 text-blue-400" />
                        <span className="text-xs text-blue-400">Linked to Step {risk.linkedToStep}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Control Measures Summary */}
        {controlsCount > 0 && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                {controlsCount} Control Measure{controlsCount !== 1 ? 's' : ''} Implemented
              </span>
            </div>
            <p className="text-xs text-white">
              All identified hazards have control measures in place to reduce risk to acceptable levels. 
              Review the full Risk Assessment tab for detailed controls.
            </p>
          </div>
        )}

        {/* Link to Full Risk Assessment */}
        <div className="pt-2 border-t border-border/40">
          <p className="text-xs text-white text-center">
            View the <strong className="text-red-400">Risk Assessment</strong> tab for complete hazard analysis, 
            control measures, and residual risk ratings
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
