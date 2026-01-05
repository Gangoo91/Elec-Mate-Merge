import { Wrench, Clock, CheckCircle, PoundSterling, GraduationCap, Package, Shield, AlertTriangle, Lightbulb, BookOpen, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import type { CorrectiveAction } from "@/types/commissioning-response";

interface CorrectiveActionCardProps {
  action: CorrectiveAction;
  index: number;
}

const CorrectiveActionCard = ({ action, index }: CorrectiveActionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First card expanded by default

  const skillLevelConfig = {
    apprentice: { color: 'bg-blue-500/20 text-blue-300 border-blue-500/50', icon: GraduationCap },
    qualified: { color: 'bg-green-500/20 text-green-300 border-green-500/50', icon: CheckCircle },
    specialist: { color: 'bg-purple-500/20 text-purple-300 border-purple-500/50', icon: Shield }
  };

  const skillConfig = action.skillLevel ? skillLevelConfig[action.skillLevel] : null;
  const SkillIcon = skillConfig?.icon;

  return (
    <Card className="bg-elec-dark/80 border-2 border-blue-500/30 overflow-hidden hover:border-blue-500/50 transition-colors">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 p-2.5 rounded-lg bg-blue-500/20 border-2 border-blue-500/50">
            <Wrench className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline" className="text-blue-300 border-blue-500/50 text-sm px-3 py-1">
                Fix #{index + 1}
              </Badge>
              {skillConfig && SkillIcon && (
                <Badge variant="outline" className={`${skillConfig.color} text-sm px-3 py-1`}>
                  <SkillIcon className="h-3.5 w-3.5 mr-1.5" />
                  {action.skillLevel}
                </Badge>
              )}
              {action.bs7671Reference && (
                <Badge variant="outline" className="text-purple-300 border-purple-500/50 text-xs">
                  {action.bs7671Reference}
                </Badge>
              )}
            </div>
            <h4 className="text-base font-bold text-foreground mb-1.5">
              For: {action.forSymptom}
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {action.action}
            </p>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-white/10">
          {action.estimatedTime && (
            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-foreground/80 font-medium">{action.estimatedTime}</span>
            </div>
          )}
          {action.materialsCost && (
            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-1.5">
              <PoundSterling className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs text-foreground/80 font-medium">{action.materialsCost}</span>
            </div>
          )}
        </div>

        {/* Detailed Procedure - Enhanced */}
        {action.detailedProcedure && action.detailedProcedure.length > 0 && (
          <Accordion type="single" collapsible value={isExpanded ? "procedure" : ""} onValueChange={(val) => setIsExpanded(val === "procedure")}>
            <AccordionItem value="procedure" className="border-none">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-semibold text-foreground">Detailed Procedure</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {action.detailedProcedure.map((paragraph, idx) => (
                    <div key={idx} className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-sm text-foreground/90 leading-relaxed">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Step-by-Step Fix - Enhanced with numbered cards */}
        {action.stepByStepFix && action.stepByStepFix.length > 0 && (
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4 text-blue-400" />
              <h5 className="text-sm font-semibold text-foreground">Step-by-Step Fix</h5>
            </div>
            <div className="space-y-2">
              {action.stepByStepFix.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-elec-dark/50 border border-blue-500/20 rounded-lg p-3 hover:border-blue-500/40 transition-colors">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-300">{idx + 1}</span>
                  </div>
                  <p className="flex-1 text-sm text-foreground/90 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why This Works - Technical Explanation */}
        {action.whyThisWorks && (
          <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <h5 className="text-sm font-semibold text-purple-300">Why This Works</h5>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{action.whyThisWorks}</p>
          </div>
        )}

        {/* Alternative Methods */}
        {action.alternativeMethods && action.alternativeMethods.length > 0 && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="alternatives" className="border-none">
              <AccordionTrigger className="py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 hover:no-underline hover:bg-amber-500/15">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-300">Alternative Methods</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3">
                <ul className="space-y-2">
                  {action.alternativeMethods.map((method, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                      <span className="text-amber-400 font-bold">{idx + 1}.</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Tools & Parts */}
        {((action.tools && action.tools.length > 0) || (action.partNumbers && action.partNumbers.length > 0) || (action.commonBrands && action.commonBrands.length > 0)) && (
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-400" />
              <h5 className="text-sm font-semibold text-blue-300">Tools & Materials</h5>
            </div>
            
            {action.tools && action.tools.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-foreground/60 font-medium">Tools Required:</p>
                <div className="flex flex-wrap gap-1.5">
                  {action.tools.map((tool, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {action.partNumbers && action.partNumbers.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-foreground/60 font-medium">Part Numbers:</p>
                <div className="flex flex-wrap gap-1.5">
                  {action.partNumbers.map((part, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs font-mono">
                      {part}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {action.commonBrands && action.commonBrands.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-foreground/60 font-medium">Common Brands:</p>
                <div className="flex flex-wrap gap-1.5">
                  {action.commonBrands.map((brand, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-blue-300 border-blue-500/50">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Safety Notes - Prominent */}
        {action.safetyNotes && action.safetyNotes.length > 0 && (
          <div className="mt-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h5 className="text-sm font-bold text-red-300">Safety Notes</h5>
            </div>
            <ul className="space-y-2">
              {action.safetyNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-red-400 text-lg leading-none">•</span>
                  <span className="text-sm text-red-200 leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Verification Test */}
        {action.verificationTest && (
          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-green-300 mb-1">Verification Test</h5>
                <p className="text-sm text-foreground/80 leading-relaxed">{action.verificationTest}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CorrectiveActionCard;
