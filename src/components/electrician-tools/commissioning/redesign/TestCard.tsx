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
          {/* Test Duration & Prerequisites */}
          {(test.testDuration || test.prerequisiteTests?.length) && (
            <div className="pt-5 flex flex-wrap gap-2">
              {test.testSequence && (
                <div className="px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
                  <span className="text-xs text-white font-medium">Test #{test.testSequence}</span>
                </div>
              )}
              {test.testDuration && (
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                  <span className="text-xs text-white font-medium">⏱ {test.testDuration}</span>
                </div>
              )}
              {test.prerequisiteTests && test.prerequisiteTests.length > 0 && (
                <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <span className="text-xs text-white font-medium">⚠ Requires: {test.prerequisiteTests.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          {/* Acceptance Criteria */}
          <div className={test.testDuration || test.prerequisiteTests?.length ? "" : "pt-5"}>
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

          {/* Site Reality Factors */}
          {test.siteRealityFactors && test.siteRealityFactors.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-amber-400">⚠️ Site Reality Factors</span>
              </h4>
              <div className="space-y-2">
                {test.siteRealityFactors.map((factor, idx) => (
                  <div key={idx} className="text-sm text-white/80 bg-amber-500/5 border-l-4 border-amber-500/50 p-3 rounded-lg">
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Efficiency Tips */}
          {test.efficiencyTips && test.efficiencyTips.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-green-400">⚡ Efficiency Tips</span>
              </h4>
              <div className="space-y-2">
                {test.efficiencyTips.map((tip, idx) => (
                  <div key={idx} className="text-sm text-white/80 bg-green-500/5 border-l-4 border-green-500/50 p-3 rounded-lg">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Temperature Notes */}
          {test.temperatureNotes && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-blue-400">🌡️ Temperature Considerations</span>
              </h4>
              <p className="text-sm text-white/80 bg-blue-500/5 border-l-4 border-blue-500/50 p-3 rounded-lg">
                {test.temperatureNotes}
              </p>
            </div>
          )}

          {/* Client Explanation */}
          {test.clientExplanation && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-purple-400">💬 Client Explanation</span>
              </h4>
              <p className="text-sm text-white/80 bg-purple-500/5 border-l-4 border-purple-500/50 p-3 rounded-lg italic">
                "{test.clientExplanation}"
              </p>
            </div>
          )}

          {/* Real Incident Example */}
          {test.realIncidentExample && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-red-400">📋 Case Study</span>
              </h4>
              <p className="text-sm text-white/80 bg-red-500/5 border-l-4 border-red-500/50 p-3 rounded-lg">
                {test.realIncidentExample}
              </p>
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
