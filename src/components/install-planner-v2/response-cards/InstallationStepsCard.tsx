import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Wrench, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CitationBadge } from "../CitationBadge";

interface InstallationStep {
  stepNumber: number;
  phase: string;
  title: string;
  description: string;
  safetyRequirements?: string[];
  equipmentNeeded?: string[];
  criticalPoints?: string[];
  regulationReferences?: string[];
  riskLevel?: string;
  qualifications?: string[];
  estimatedDuration?: string;
}

interface InstallationStepsData {
  installationSteps?: InstallationStep[];
  supportIntervals?: string;
  safeZones?: string[];
  specialRequirements?: string[];
}

interface InstallationStepsCardProps {
  data: InstallationStepsData;
  citations?: any[];
}

export const InstallationStepsCard = ({ data, citations }: InstallationStepsCardProps) => {
  const [showAllSteps, setShowAllSteps] = useState(false);
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-purple-500/5 to-transparent hover:border-elec-yellow/30 transition-all max-w-full overflow-hidden">
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4 max-w-full overflow-hidden break-words">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
            🔧 Installation Guide
          </Badge>
        </div>

        {/* Installation Steps Summary (First 3) */}
        {data.installationSteps && data.installationSteps.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-foreground">Installation Sequence</p>
            <ol className="space-y-2 sm:space-y-3">
              {data.installationSteps.slice(0, 3).map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                  <div className="flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-purple-500/20 text-purple-400 text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">
                    {typeof step === 'string' ? idx + 1 : step.stepNumber || idx + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    {typeof step === 'string' ? (
                      <span className="text-foreground leading-relaxed break-words">{step}</span>
                    ) : (
                      <>
                        <p className="font-semibold text-foreground break-words text-base sm:text-lg">{step.phase || step.title}</p>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{step.description}</p>
                        {step.estimatedDuration && (
                          <p className="text-xs sm:text-sm text-purple-400 mt-1">⏱️ {step.estimatedDuration}</p>
                        )}
                        {step.riskLevel && (
                          <Badge variant="outline" className={`text-xs sm:text-sm mt-1 ${
                            step.riskLevel === 'high' ? 'border-red-500/30 text-red-400' :
                            step.riskLevel === 'medium' ? 'border-yellow-500/30 text-yellow-400' :
                            'border-green-500/30 text-green-400'
                          }`}>
                            {step.riskLevel.toUpperCase()} RISK
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {data.installationSteps.length > 3 && (
              <Collapsible open={showAllSteps} onOpenChange={setShowAllSteps}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between text-sm h-10 mt-2"
                  >
                    <span>View All {data.installationSteps.length} Steps</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAllSteps ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <ol className="space-y-3" start={4}>
                    {data.installationSteps.slice(3).map((step, idx) => (
                      <li key={idx + 3} className="flex items-start gap-3 text-sm sm:text-base">
                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold flex-shrink-0 mt-0.5">
                          {typeof step === 'string' ? idx + 4 : step.stepNumber || idx + 4}
                        </div>
                        <div className="flex-1 space-y-1">
                          {typeof step === 'string' ? (
                            <span className="text-foreground leading-relaxed">{step}</span>
                          ) : (
                            <>
                              <p className="font-semibold text-foreground text-base sm:text-lg">{step.phase || step.title}</p>
                              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                              {step.estimatedDuration && (
                                <p className="text-xs sm:text-sm text-purple-400 mt-1">⏱️ {step.estimatedDuration}</p>
                              )}
                              {step.riskLevel && (
                                <Badge variant="outline" className={`text-xs sm:text-sm mt-1 ${
                                  step.riskLevel === 'high' ? 'border-red-500/30 text-red-400' :
                                  step.riskLevel === 'medium' ? 'border-yellow-500/30 text-yellow-400' :
                                  'border-green-500/30 text-green-400'
                                }`}>
                                  {step.riskLevel.toUpperCase()} RISK
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        )}

        {/* Support Intervals */}
        {data.supportIntervals && (
          <div className="bg-muted/30 rounded p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Support Intervals</p>
            </div>
            <p className="text-sm text-foreground">{data.supportIntervals}</p>
          </div>
        )}

        {/* Safe Zones */}
        {data.safeZones && data.safeZones.length > 0 && (
          <div className="border border-elec-yellow/30 rounded p-3 bg-elec-yellow/5">
            <p className="text-xs font-semibold text-elec-yellow mb-2">⚡ Safe Zones (BS 7671 Section 522)</p>
            <ul className="space-y-1">
              {data.safeZones.map((zone, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                  <CheckCircle2 className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Special Requirements */}
        {data.specialRequirements && data.specialRequirements.length > 0 && (
          <div className="border-t border-border/50 pt-3">
            <p className="text-xs font-semibold text-foreground mb-2">Special Requirements</p>
            <ul className="space-y-1">
              {data.specialRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elec-yellow flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Citations */}
        {citations && citations.length > 0 && (
          <div className="border-t border-border/50 pt-3">
            <p className="text-xs font-semibold text-foreground mb-2">Installation Standards Referenced</p>
            <div className="flex flex-wrap gap-1">
              {citations.map((citation, idx) => (
                <CitationBadge key={idx} citation={citation} index={idx} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
