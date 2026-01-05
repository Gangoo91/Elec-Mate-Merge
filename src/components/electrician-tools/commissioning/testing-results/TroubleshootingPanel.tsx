import { AlertTriangle, Lightbulb, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface TroubleshootingPanelProps {
  troubleshooting?: string[];
  commonMistakes?: string[];
  proTips?: string[];
}

export const TroubleshootingPanel = ({ 
  troubleshooting, 
  commonMistakes, 
  proTips 
}: TroubleshootingPanelProps) => {
  const hasTroubleshooting = troubleshooting && troubleshooting.length > 0;
  const hasCommonMistakes = commonMistakes && commonMistakes.length > 0;
  const hasProTips = proTips && proTips.length > 0;

  if (!hasTroubleshooting && !hasCommonMistakes && !hasProTips) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Troubleshooting */}
      {hasTroubleshooting && (
        <Card className="bg-card border-elec-yellow/20">
          <div className="p-5">
            <div className="flex items-center gap-2 text-foreground text-base font-semibold mb-3">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              Troubleshooting
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {troubleshooting.map((item, idx) => {
                const parts = item.split(/[:\-—]/);
                const hasStructure = parts.length >= 2;
                const symptom = hasStructure ? parts[0].trim() : `Issue ${idx + 1}`;
                const solution = hasStructure ? parts.slice(1).join(':').trim() : item;

                return (
                  <AccordionItem 
                    key={idx} 
                    value={`troubleshoot-${idx}`}
                    className="border border-elec-yellow/20 rounded-lg bg-elec-dark/40"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-elec-yellow/5 text-left">
                      <div className="flex items-start gap-2 w-full">
                        <AlertTriangle className="shrink-0 h-4 w-4 text-amber-400 mt-0.5" />
                        <span className="text-sm sm:text-base text-foreground font-medium">{symptom}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <div className="bg-elec-yellow/5 rounded-lg p-3 border-l-4 border-elec-yellow/50">
                        <p className="text-sm text-foreground/90 leading-relaxed">{solution}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </Card>
      )}

      {/* Common Mistakes */}
      {hasCommonMistakes && (
        <Card className="bg-card border-elec-yellow/20">
          <div className="p-5">
            <div className="flex items-center gap-2 text-foreground text-base font-semibold mb-3">
              <XCircle className="h-5 w-5 text-elec-yellow" />
              Common Mistakes to Avoid
            </div>
            <ul className="space-y-2.5">
              {commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="shrink-0 h-4 w-4 text-red-400 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Pro Tips */}
      {hasProTips && (
        <Card className="bg-card border-elec-yellow/20">
          <div className="p-5">
            <div className="flex items-center gap-2 text-foreground text-base font-semibold mb-3">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
              Pro Tips (30 Years Experience)
            </div>
            <ul className="space-y-2.5">
              {proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Lightbulb className="shrink-0 h-4 w-4 text-elec-yellow mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};
