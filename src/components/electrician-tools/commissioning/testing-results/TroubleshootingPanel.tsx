import { AlertTriangle, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg overflow-hidden">
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 text-amber-300 text-base font-semibold mb-3">
              <AlertTriangle className="h-5 w-5" />
              Troubleshooting
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {troubleshooting.map((item, idx) => {
                // Try to extract symptom and solution if formatted as "symptom: solution" or "symptom - solution"
                const parts = item.split(/[:\-—]/);
                const hasStructure = parts.length >= 2;
                const symptom = hasStructure ? parts[0].trim() : `Issue ${idx + 1}`;
                const solution = hasStructure ? parts.slice(1).join(':').trim() : item;

                return (
                  <AccordionItem 
                    key={idx} 
                    value={`troubleshoot-${idx}`}
                    className="border border-amber-500/20 rounded-lg bg-background/30"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-amber-500/5 text-left">
                      <div className="flex items-start gap-2 w-full">
                        <span className="shrink-0 text-amber-300 font-bold">⚠️</span>
                        <span className="text-sm sm:text-base text-foreground font-medium">{symptom}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3">
                      <div className="bg-amber-500/5 rounded-lg p-3 border-l-4 border-amber-500/50">
                        <p className="text-sm text-foreground leading-relaxed">{solution}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {hasCommonMistakes && (
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 text-red-300 text-base font-semibold mb-3">
            <AlertTriangle className="h-5 w-5" />
            Common Mistakes to Avoid
          </div>
          <ul className="space-y-2.5">
            {commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="shrink-0 text-red-300 font-bold text-lg">✕</span>
                <span className="text-sm sm:text-base text-foreground leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pro Tips */}
      {hasProTips && (
        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4 sm:p-5">
          <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-3">
            <Lightbulb className="h-5 w-5" />
            Pro Tips (30 Years Experience)
          </div>
          <ul className="space-y-2.5">
            {proTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="shrink-0 text-blue-300 font-bold text-lg">💡</span>
                <span className="text-sm sm:text-base text-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
