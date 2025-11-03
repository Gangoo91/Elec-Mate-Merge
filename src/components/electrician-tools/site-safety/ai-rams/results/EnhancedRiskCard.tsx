import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Shield, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColors, getRiskLevelLabel } from '@/utils/risk-level-helpers';
import type { RAMSRisk } from '@/types/rams';
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';

interface EnhancedRiskCardProps {
  risk: RAMSRisk;
  index: number;
  onEdit?: (riskId: string) => void;
  onDelete?: (riskId: string) => void;
}

export const EnhancedRiskCard: React.FC<EnhancedRiskCardProps> = ({
  risk,
  index
}) => {
  const riskColors = getRiskColors(risk.riskRating);
  const riskLevel = getRiskLevelLabel(risk.riskRating <= 4 ? 'low' : risk.riskRating <= 12 ? 'medium' : 'high');

  return (
    <Card 
      className={cn(
        "mb-4 overflow-hidden transition-all hover:shadow-lg",
        `border-l-4 ${riskColors.border}`,
        "bg-card"
      )}
    >
      <MobileAccordion type="single" collapsible>
        <MobileAccordionItem value="risk-details" className="border-0">
          <div className="p-4 pb-0">
            {/* Header - Always Visible */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-lg font-bold text-sm",
                  riskColors.bg,
                  riskColors.text
                )}>
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-elec-light text-base leading-tight line-clamp-2">
                    {risk.hazard || 'Untitled Hazard'}
                  </h4>
                </div>
              </div>
              <Badge className={cn(
                "ml-2 font-bold text-xs px-3 py-1",
                riskColors.badge,
                riskColors.glow
              )}>
                {riskLevel}
              </Badge>
            </div>

            {/* Risk Score Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold",
                riskColors.bg,
                riskColors.text
              )}>
                <AlertTriangle className="h-4 w-4" />
                Risk Score: {risk.riskRating}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          <MobileAccordionTrigger className="px-4 py-3 bg-transparent border-0 hover:bg-transparent">
            <span className="text-xs text-elec-light/70">Tap to view details</span>
          </MobileAccordionTrigger>

          <MobileAccordionContent className="px-4 pb-4">
            <div className="space-y-4 mt-2">
              {/* Risk Description */}
              {risk.risk && (
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm font-semibold text-elec-light">Risk Description</span>
                  </div>
                  <p className="text-sm text-elec-light/90 leading-relaxed">
                    {risk.risk}
                  </p>
                </div>
              )}

              {/* Control Measures - Prominent */}
              <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-bold text-elec-light">Control Measures</span>
                </div>
                <p className="text-sm text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                  {risk.controls || 'No control measures specified'}
                </p>
              </div>

              {/* Likelihood & Severity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
                  <div className="text-xs text-elec-light/60 mb-1">Likelihood</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i < risk.likelihood ? "bg-elec-yellow" : "bg-elec-light/20"
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-elec-light">{risk.likelihood}/5</span>
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
                  <div className="text-xs text-elec-light/60 mb-1">Severity</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i < risk.severity ? "bg-red-500" : "bg-elec-light/20"
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-elec-light">{risk.severity}/5</span>
                  </div>
                </div>
              </div>

              {/* Residual Risk */}
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-400">Residual Risk After Controls</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                    {risk.residualRisk}
                  </Badge>
                </div>
              </div>

              {/* Further Action */}
              {risk.furtherAction && (
                <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                  <div className="text-xs font-semibold text-blue-400 mb-1">Further Action Required</div>
                  <p className="text-sm text-elec-light/90">{risk.furtherAction}</p>
                  {risk.responsible && (
                    <div className="mt-2 text-xs text-elec-light/70">
                      Responsible: <span className="font-semibold">{risk.responsible}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </Card>
  );
};
