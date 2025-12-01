import { AlertTriangle, Lightbulb, CheckCircle2, FlaskConical } from "lucide-react";
import { MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Badge } from "@/components/ui/badge";

interface TestingProcedureCardProps {
  test: {
    testName: string;
    regulation: string;
    clientExplanation?: string;
    acceptanceCriteria: string;
    instrumentSetup: string;
    commonMistakes?: string[];
    troubleshooting?: string[];
    proTips?: string[];
    efficiencyTips?: string[];
  };
  index: number;
}

export const TestingProcedureCard = ({ test, index }: TestingProcedureCardProps) => {
  const hasCommonMistakes = test.commonMistakes && test.commonMistakes.length > 0;
  const hasTroubleshooting = test.troubleshooting && test.troubleshooting.length > 0;
  const hasProTips = test.proTips && test.proTips.length > 0;
  const hasEfficiencyTips = test.efficiencyTips && test.efficiencyTips.length > 0;
  
  const whatToLookFor = [...(test.commonMistakes || []), ...(test.troubleshooting || [])];
  const practicalTips = [...(test.proTips || []), ...(test.efficiencyTips || [])];

  return (
    <MobileAccordionItem value={`test-${index}`}>
      <MobileAccordionTrigger>
        <div className="flex items-start gap-3 w-full pr-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-elec-yellow/10 text-elec-yellow shrink-0">
            <span className="text-sm font-bold">{index + 1}</span>
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold text-sm sm:text-base text-white">{test.testName}</div>
            <Badge variant="outline" className="mt-1 text-xs border-elec-yellow/30 text-elec-yellow/80">
              {test.regulation}
            </Badge>
          </div>
        </div>
      </MobileAccordionTrigger>
      
      <MobileAccordionContent>
        <div className="p-4 bg-elec-dark/40 border border-elec-yellow/20 rounded-b-lg space-y-4">
          
          {/* Why We Test */}
          {test.clientExplanation && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm font-semibold text-white">Why We Test</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed pl-6">
                {test.clientExplanation}
              </p>
            </div>
          )}

          {/* What to Look For */}
          {whatToLookFor.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">What to Look For</span>
              </div>
              <ul className="space-y-1.5 pl-6">
                {whatToLookFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span className="text-sm text-white/90 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Tips */}
          {practicalTips.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm font-semibold text-white">Practical Tips</span>
              </div>
              <ul className="space-y-1.5 pl-6">
                {practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span className="text-sm text-white/90 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Acceptance Criteria */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Pass Criteria</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed pl-6">
              {test.acceptanceCriteria}
            </p>
          </div>

          {/* Instrument Setup */}
          <div className="pt-3 border-t border-elec-yellow/20">
            <div className="text-xs font-semibold text-white/70 mb-1">Instrument Setup</div>
            <p className="text-sm text-white/80">{test.instrumentSetup}</p>
          </div>
        </div>
      </MobileAccordionContent>
    </MobileAccordionItem>
  );
};
