import { Shield, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from '@/components/ui/mobile-accordion';
import { getRiskColors } from '@/utils/risk-level-helpers';
import { useState } from 'react';

interface EnhancedHazardCardProps {
  hazard: any;
  index: number;
  onUpdate?: (index: number, field: string, value: any) => void;
  onDelete?: (index: number) => void;
}

export const EnhancedHazardCard = ({ hazard, index, onUpdate, onDelete }: EnhancedHazardCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const riskScore = hazard.riskScore || (hazard.likelihood * hazard.severity);
  const riskColors = getRiskColors(riskScore);

  // Create likelihood dots
  const likelihoodDots = Array.from({ length: 5 }, (_, i) => i < hazard.likelihood);
  const severityDots = Array.from({ length: 5 }, (_, i) => i < hazard.severity);

  return (
    <div 
      className={`rounded-lg border-l-4 ${riskColors.border} bg-elec-card/50 overflow-hidden hover:shadow-lg transition-all`}
    >
      <MobileAccordion 
        type="single" 
        collapsible
        defaultValue={index < 3 ? `hazard-${index}` : undefined}
      >
        <MobileAccordionItem value={`hazard-${index}`}>
          <MobileAccordionTrigger className="w-full bg-transparent hover:bg-elec-gray/30 border-0 rounded-lg p-4 cursor-pointer">
            <div className="flex flex-col items-center gap-3 w-full sm:flex-row sm:items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 text-center sm:text-left w-full">
                {isEditing ? (
                  <Input
                    value={hazard.hazard}
                    onChange={(e) => onUpdate?.(index, 'hazard', e.target.value)}
                    className="font-semibold text-base mb-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h4 className="font-semibold text-base mb-2">{hazard.hazard}</h4>
                )}
                <div className="flex justify-center sm:justify-start">
                  <Badge className={riskColors.badge}>
                    Risk Score: {riskScore}
                   </Badge>
                 </div>
               </div>
               <div className="absolute top-2 right-2 flex gap-1">
                 <Button
                   size="icon"
                   variant="ghost"
                   onClick={(e) => {
                     e.stopPropagation();
                     setIsEditing(!isEditing);
                   }}
                   className="h-8 w-8 touch-manipulation"
                 >
                   <Edit2 className="h-4 w-4" />
                 </Button>
                 <Button
                   size="icon"
                   variant="ghost"
                   onClick={(e) => {
                     e.stopPropagation();
                     onDelete?.(index);
                   }}
                   className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 touch-manipulation"
                 >
                   <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
             </div>
          </MobileAccordionTrigger>

          <MobileAccordionContent>
            <div className="space-y-4 pt-4 px-4 pb-4">
              {/* Control Measures */}
              {(hazard.controlMeasure || isEditing) && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-3">
                    <Shield className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs font-semibold text-amber-500 uppercase">
                      Control Measures
                    </div>
                  </div>
                  {isEditing ? (
                    <Textarea
                      value={hazard.controlMeasure || ''}
                      onChange={(e) => onUpdate?.(index, 'controlMeasure', e.target.value)}
                      placeholder="Enter control measures..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <div className="space-y-2 text-sm">
                      {hazard.controlMeasure.split(/(?=PRIMARY ACTION:|ENGINEER CONTROLS:|ADMINISTRATIVE CONTROLS:|VERIFICATION:|COMPETENCY REQUIREMENT:|EQUIPMENT STANDARDS:|REGULATION:|ELIMINATE|SUBSTITUTE)/i)
                        .filter(section => section.trim())
                        .map((section, idx) => {
                          const match = section.match(/^([A-Z\s]+):/);
                          if (match) {
                            const label = match[1].trim();
                            const content = section.substring(match[0].length).trim();
                            return (
                              <div key={idx} className="pl-3 border-l-2 border-amber-500/40">
                                <div className="text-xs font-bold text-amber-600 mb-0.5">{label}</div>
                                <div className="text-foreground/90 leading-relaxed">{content}</div>
                              </div>
                            );
                          }
                          return (
                            <div key={idx} className="text-foreground/90 leading-relaxed">{section}</div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* Likelihood & Severity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium text-foreground mb-2">
                    Likelihood
                  </div>
                  {isEditing ? (
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={hazard.likelihood}
                      onChange={(e) => onUpdate?.(index, 'likelihood', parseInt(e.target.value))}
                      className="w-20"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      {likelihoodDots.map((filled, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            filled ? 'bg-elec-yellow' : 'bg-elec-gray'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold">{hazard.likelihood}/5</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground mb-2">
                    Severity
                  </div>
                  {isEditing ? (
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={hazard.severity}
                      onChange={(e) => onUpdate?.(index, 'severity', parseInt(e.target.value))}
                      className="w-20"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      {severityDots.map((filled, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            filled ? 'bg-red-500' : 'bg-elec-gray'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold">{hazard.severity}/5</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Regulation Reference */}
              {(hazard.regulation || isEditing) && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-xs font-semibold text-blue-500 uppercase mb-1">
                    Regulation Reference
                  </div>
                  {isEditing ? (
                    <Input
                      value={hazard.regulation || ''}
                      onChange={(e) => onUpdate?.(index, 'regulation', e.target.value)}
                      placeholder="e.g., BS 7671 Section 537"
                    />
                  ) : (
                    <div className="text-sm">{hazard.regulation}</div>
                  )}
                </div>
              )}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};
