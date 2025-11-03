import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Wrench, Award, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColorsByLevel } from '@/utils/risk-level-helpers';
import type { MethodStep } from '@/types/method-statement';
import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';

interface EnhancedStepCardProps {
  step: MethodStep;
  index: number;
}

export const EnhancedStepCard: React.FC<EnhancedStepCardProps> = ({ step, index }) => {
  const riskColors = getRiskColorsByLevel(step.riskLevel);
  const isEvenRow = index % 2 === 0;

  return (
    <Card 
      className={cn(
        "mb-3 overflow-hidden transition-all",
        `border-l-4 ${riskColors.border}`,
        isEvenRow ? "bg-card" : "bg-card/60"
      )}
    >
      <MobileAccordion type="single" collapsible>
        <MobileAccordionItem value="step-details" className="border-0">
          {/* Collapsed State - Matches Screenshot */}
          <div className="flex items-center gap-3 p-4">
            {/* Step Number Badge */}
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
              riskColors.bg,
              riskColors.text,
              "shadow-lg"
            )}>
              {step.stepNumber}
            </div>

            {/* Step Title */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-elec-light text-base leading-tight line-clamp-2">
                {step.title}
              </h4>
            </div>

            {/* Risk Level Badge */}
            <Badge className={cn(
              "flex-shrink-0 font-bold text-xs px-2 py-1",
              riskColors.badge
            )}>
              {step.riskLevel}
            </Badge>
          </div>

          {/* Trigger for Expansion */}
          <MobileAccordionTrigger className="px-4 py-2 bg-transparent border-0 border-t border-primary/10 hover:bg-transparent">
            <span className="text-xs text-elec-light/70">Tap for full details</span>
          </MobileAccordionTrigger>

          {/* Expanded Content */}
          <MobileAccordionContent className="px-4 pb-4">
            <div className="space-y-4 mt-3">
              {/* Description Section */}
              {step.description && (
                <div className="bg-background/50 rounded-lg p-4">
                  <h5 className="text-sm font-bold text-elec-light mb-2">Description</h5>
                  <p className="text-sm text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                    {step.description}
                  </p>
                </div>
              )}

              {/* Safety Requirements - Prominent */}
              {step.safetyRequirements && step.safetyRequirements.length > 0 && (
                <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-amber-500" />
                    <h5 className="text-sm font-bold text-elec-light">⚠️ Safety Requirements</h5>
                  </div>
                  <ul className="space-y-2">
                    {step.safetyRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-elec-light/90">
                        <span className="text-amber-500 mt-1">•</span>
                        <span className="flex-1">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Equipment Needed */}
              {step.equipmentNeeded && step.equipmentNeeded.length > 0 && (
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4 text-blue-400" />
                    <h5 className="text-sm font-semibold text-elec-light">Equipment Needed</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.equipmentNeeded.map((equip, idx) => (
                      <Badge key={idx} className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                        {equip}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Qualifications */}
              {step.qualifications && step.qualifications.length > 0 && (
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-purple-400" />
                    <h5 className="text-sm font-semibold text-elec-light">Qualifications Required</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.qualifications.map((qual, idx) => (
                      <Badge key={idx} className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                        ✓ {qual}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Duration & Risk Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-semibold text-green-400">Duration</span>
                  </div>
                  <div className="text-sm font-bold text-elec-light">{step.estimatedDuration}</div>
                </div>
                <div className={cn(
                  "rounded-lg p-3 border",
                  step.riskLevel === 'high' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : step.riskLevel === 'medium'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-green-500/10 border-green-500/30'
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={cn(
                      "h-4 w-4",
                      step.riskLevel === 'high' ? 'text-red-400' : 
                      step.riskLevel === 'medium' ? 'text-amber-400' : 
                      'text-green-400'
                    )} />
                    <span className={cn(
                      "text-xs font-semibold",
                      step.riskLevel === 'high' ? 'text-red-400' : 
                      step.riskLevel === 'medium' ? 'text-amber-400' : 
                      'text-green-400'
                    )}>Risk Level</span>
                  </div>
                  <div className="text-sm font-bold text-elec-light uppercase">{step.riskLevel}</div>
                </div>
              </div>

              {/* Critical Points / Linked Hazards */}
              {step.linkedHazards && step.linkedHazards.length > 0 && (
                <div className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h5 className="text-sm font-bold text-red-400">Critical Points</h5>
                  </div>
                  <p className="text-sm text-elec-light/90">
                    This step has {step.linkedHazards.length} linked hazard(s). See Risk Assessment tab for details.
                  </p>
                </div>
              )}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </Card>
  );
};
