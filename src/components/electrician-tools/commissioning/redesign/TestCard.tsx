import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProcedureStepper } from "./ProcedureStepper";
import { TroubleshootingPanel } from "../testing-results/TroubleshootingPanel";
import { InstrumentSetupPanel } from "../testing-results/InstrumentSetupPanel";
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
    <div className="border-2 border-border/40 rounded-xl overflow-hidden bg-background/40 hover:border-border/60 transition-colors">
      {/* Header - Always Visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors text-left touch-manipulation"
      >
        <div className="flex items-center gap-4 flex-1">
          <Badge 
            variant="outline" 
            className={cn(
              "text-lg px-3 py-1 shrink-0",
              variant === "dead" && "border-red-500/50 text-red-400",
              variant === "live" && "border-yellow-500/50 text-yellow-400"
            )}
          >
            {index + 1}
          </Badge>
          <div className="flex-1">
            <div className="font-semibold text-white text-base mb-1">{test.testName}</div>
            <div className="text-sm text-muted-foreground">
              {test.regulation}
              {test.testDuration && ` • ${test.testDuration}`}
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 py-5 space-y-6 border-t border-border/40">
          {/* Acceptance Criteria */}
          <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-3">
              <CheckCircle2 className="h-5 w-5" />
              Acceptance Criteria
            </div>
            <p className="text-sm text-white leading-relaxed">{test.acceptanceCriteria}</p>
            {test.expectedResult && typeof test.expectedResult === 'object' && (
              <div className="mt-3 space-y-2">
                {test.expectedResult.calculated && (
                  <p className="text-sm text-white">
                    <span className="font-semibold">Calculated:</span> {test.expectedResult.calculated}
                  </p>
                )}
                {test.expectedResult.measured && (
                  <p className="text-sm text-green-300">
                    <span className="font-semibold">Measured:</span> {test.expectedResult.measured}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Instrument Setup */}
          <InstrumentSetupPanel instrumentSetup={test.instrumentSetup} />

          {/* Procedure Stepper */}
          {test.procedure && Array.isArray(test.procedure) && (
            <div className="space-y-3">
              <div className="text-base font-semibold text-white">📋 Procedure</div>
              <ProcedureStepper steps={test.procedure} />
            </div>
          )}

          {/* Troubleshooting & Pro Tips */}
          <TroubleshootingPanel
            troubleshooting={test.troubleshooting}
            commonMistakes={test.commonMistakes}
            proTips={test.proTips}
          />

          {/* Copy Button */}
          <Button
            variant="outline"
            onClick={copyTestProcedure}
            className="w-full touch-manipulation"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Procedure
          </Button>
        </div>
      )}
    </div>
  );
};
