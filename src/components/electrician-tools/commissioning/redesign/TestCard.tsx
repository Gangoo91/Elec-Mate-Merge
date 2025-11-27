import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Copy, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InstrumentSetupPanel } from "../../commissioning/testing-results/InstrumentSetupPanel";
import { ProcedureStepper } from "./ProcedureStepper";
import { TroubleshootingPanel } from "../../commissioning/testing-results/TroubleshootingPanel";
import { toast } from "sonner";
import type { TestProcedure } from "@/types/commissioning-response";

interface TestCardProps {
  test: TestProcedure;
  index: number;
  variant: "dead" | "live";
}

export const TestCard = ({ test, index, variant }: TestCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const copyTestProcedure = () => {
    const markdown = `# ${test.testName}
**Regulation**: ${test.regulation}

## Instrument Setup
${test.instrumentSetup}

## Procedure
${test.procedure?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n') || ''}

## Acceptance Criteria
${test.acceptanceCriteria}`;

    navigator.clipboard.writeText(markdown);
    toast.success("Test procedure copied!", { description: "Paste into your notes app" });
  };

  return (
    <Card className="bg-card border-elec-yellow/20 hover:border-elec-yellow/30 overflow-hidden transition-all">
      {/* Header - Always Visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left hover:bg-elec-yellow/5 transition-colors touch-manipulation"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                <span className="text-sm font-bold text-elec-yellow">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{test.testName}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <BookOpen className="h-3 w-3 text-elec-yellow" />
              {test.regulation}
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-elec-yellow shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white/50 shrink-0" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-elec-yellow/20">
          {/* Acceptance Criteria */}
          <div className="pt-5">
            <div className="flex items-center gap-2 text-white text-base font-semibold mb-3">
              <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
              Acceptance Criteria
            </div>
            <p className="text-sm text-white/90 leading-relaxed bg-elec-yellow/5 border-l-4 border-elec-yellow/50 p-4 rounded-lg">
              {test.acceptanceCriteria}
            </p>
          </div>

          {/* Instrument Setup */}
          {test.instrumentSetup && (
            <InstrumentSetupPanel instrumentSetup={test.instrumentSetup} />
          )}

          {/* Procedure Steps */}
          {test.procedure && test.procedure.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-elec-yellow">Test Procedure</span>
              </h4>
              <ProcedureStepper steps={test.procedure} />
            </div>
          )}

          {/* Troubleshooting & Tips */}
          <TroubleshootingPanel
            troubleshooting={test.troubleshooting}
            commonMistakes={test.commonMistakes}
            proTips={test.proTips}
          />

          {/* Copy Button */}
          <Button
            variant="outline"
            onClick={copyTestProcedure}
            className="w-full touch-manipulation border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Procedure
          </Button>
        </div>
      )}
    </Card>
  );
};
