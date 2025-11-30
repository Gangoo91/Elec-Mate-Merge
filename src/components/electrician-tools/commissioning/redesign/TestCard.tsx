import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Copy, BookOpen, FileText, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InstrumentSetupPanel } from "../../commissioning/testing-results/InstrumentSetupPanel";
import { ProcedureStepper } from "./ProcedureStepper";
import { TroubleshootingPanel } from "../../commissioning/testing-results/TroubleshootingPanel";
import { TestCalculatorWidget } from "../TestCalculatorWidget";
import { toast } from "sonner";
import type { TestProcedure } from "@/types/commissioning-response";

interface TestCardProps {
  test: TestProcedure;
  index: number;
  variant: "dead" | "live";
  onResultRecorded?: (result: {
    measuredValue?: string;
    unit?: string;
    passed?: boolean;
    notes?: string;
    timestamp: string;
  }) => void;
  initialResult?: {
    measuredValue?: string;
    unit?: string;
    passed?: boolean;
    notes?: string;
  };
}

export const TestCard = ({ test, index, variant, onResultRecorded, initialResult }: TestCardProps) => {
  // Defensive checks for test object
  if (!test) {
    console.error('TestCard received null/undefined test');
    return null;
  }

  const [expanded, setExpanded] = useState(false);
  const [showResultEntry, setShowResultEntry] = useState(false);
  const [measuredValue, setMeasuredValue] = useState(initialResult?.measuredValue || "");
  const [resultNotes, setResultNotes] = useState(initialResult?.notes || "");
  const [isPassed, setIsPassed] = useState<boolean | undefined>(initialResult?.passed);

  const handleSaveResult = () => {
    const result = {
      measuredValue,
      unit: extractUnit(test.acceptanceCriteria),
      passed: isPassed,
      notes: resultNotes,
      timestamp: new Date().toISOString(),
    };
    
    onResultRecorded?.(result);
    toast.success("Test result recorded!", {
      description: `${test.testName} - ${isPassed ? 'PASS' : isPassed === false ? 'FAIL' : 'Recorded'}`,
    });
  };

  const extractUnit = (criteria: string): string => {
    const unitMatch = criteria.match(/\b(Ω|A|V|ms|mA|%|mm²)\b/);
    return unitMatch ? unitMatch[0] : '';
  };

  const copyTestProcedure = () => {
    const procedureSteps = Array.isArray(test.procedure) 
      ? test.procedure.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')
      : 'No procedure steps available';

    const markdown = `# ${test.testName || 'Test Procedure'}
**Regulation**: ${test.regulation || 'N/A'}

## Instrument Setup
${test.instrumentSetup || 'Not specified'}

## Procedure
${procedureSteps}

## Acceptance Criteria
${test.acceptanceCriteria || 'Not specified'}`;

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
            <h3 className="text-lg font-bold text-white">{test.testName || 'Test Procedure'}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <BookOpen className="h-3 w-3 text-elec-yellow" />
            {test.regulation || 'BS 7671'}
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
          {(test.testDuration || (Array.isArray(test.prerequisiteTests) && test.prerequisiteTests.length > 0)) && (
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
              {Array.isArray(test.prerequisiteTests) && test.prerequisiteTests.length > 0 && (
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

          {/* Expected Result */}
          {test.expectedResult && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-green-400">📊 Expected Result</span>
              </h4>
              <div className="text-sm text-white/80 bg-green-500/5 border-l-4 border-green-500/50 p-3 rounded-lg">
                {typeof test.expectedResult === 'string' ? (
                  <p>{test.expectedResult}</p>
                ) : (
                  <div className="space-y-1">
                    {test.expectedResult.calculated && <p><strong>Calculated:</strong> {test.expectedResult.calculated}</p>}
                    {test.expectedResult.measured && <p><strong>Measured:</strong> {test.expectedResult.measured}</p>}
                    {test.expectedResult.maximumPermitted && <p><strong>Max Permitted:</strong> {test.expectedResult.maximumPermitted}</p>}
                    {test.expectedResult.marginOfSafety && <p><strong>Margin of Safety:</strong> {test.expectedResult.marginOfSafety}</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calculation Breakdown */}
          {test.calculation && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">🧮 Calculation</span>
              </h4>
              <div className="text-sm text-white/80 bg-cyan-500/5 border-l-4 border-cyan-500/50 p-3 rounded-lg font-mono">
                {typeof test.calculation === 'string' ? (
                  <p>{test.calculation}</p>
                ) : (
                  <div className="space-y-2">
                    {test.calculation.formula && <p><strong>Formula:</strong> {test.calculation.formula}</p>}
                    {test.calculation.Ze && <p><strong>Ze:</strong> {test.calculation.Ze}</p>}
                    {test.calculation.R1R2 && <p><strong>R1+R2:</strong> {test.calculation.R1R2}</p>}
                    {test.calculation.expectedZs && <p><strong>Expected Zs:</strong> {test.calculation.expectedZs}</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lead Placement */}
          {test.leadPlacement && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-pink-400">🔌 Lead Placement</span>
              </h4>
              <p className="text-sm text-white/80 bg-pink-500/5 border-l-4 border-pink-500/50 p-3 rounded-lg">
                {test.leadPlacement}
              </p>
            </div>
          )}

          {/* Instrument Setup */}
          {test.instrumentSetup && (
            <InstrumentSetupPanel instrumentSetup={test.instrumentSetup} />
          )}

          {/* Instrument Notes */}
          {Array.isArray(test.instrumentNotes) && test.instrumentNotes.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-orange-400">🔧 Instrument Notes</span>
              </h4>
              <div className="space-y-2">
                {test.instrumentNotes.map((note, idx) => (
                  <div key={idx} className="text-sm text-white/80 bg-orange-500/5 border-l-4 border-orange-500/50 p-3 rounded-lg">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Procedure Steps */}
          {Array.isArray(test.procedure) && test.procedure.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-elec-yellow">Test Procedure</span>
              </h4>
              <ProcedureStepper steps={test.procedure} />
            </div>
          )}

          {/* Site Reality Factors */}
          {Array.isArray(test.siteRealityFactors) && test.siteRealityFactors.length > 0 && (
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
          {Array.isArray(test.efficiencyTips) && test.efficiencyTips.length > 0 && (
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
            troubleshooting={Array.isArray(test.troubleshooting) ? test.troubleshooting : []}
            commonMistakes={Array.isArray(test.commonMistakes) ? test.commonMistakes : []}
            proTips={Array.isArray(test.proTips) ? test.proTips : []}
          />

          {/* Test Calculator */}
          <TestCalculatorWidget
            onCalculated={(value) => setMeasuredValue(value)}
            className="w-full"
          />

          {/* Result Entry Section */}
          <div className="space-y-3 bg-background/40 border border-elec-yellow/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Record Test Result
              </h4>
              {isPassed !== undefined && (
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  isPassed 
                    ? "bg-green-500/10 text-green-400 border border-green-500/30" 
                    : "bg-red-500/10 text-red-400 border border-red-500/30"
                )}>
                  {isPassed ? "PASS" : "FAIL"}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-white text-sm">Measured Value</Label>
                <Input
                  type="text"
                  value={measuredValue}
                  onChange={(e) => setMeasuredValue(e.target.value)}
                  placeholder={`e.g., 0.35${extractUnit(test.acceptanceCriteria)}`}
                  className="bg-background/60 border-elec-yellow/30 text-white"
                />
              </div>

              <div>
                <Label className="text-white text-sm">Pass/Fail</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => setIsPassed(true)}
                    variant="outline"
                    className={cn(
                      "flex-1",
                      isPassed === true
                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                        : "border-elec-yellow/30 text-white"
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Pass
                  </Button>
                  <Button
                    onClick={() => setIsPassed(false)}
                    variant="outline"
                    className={cn(
                      "flex-1",
                      isPassed === false
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "border-elec-yellow/30 text-white"
                    )}
                  >
                    Fail
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-white text-sm">Notes (Optional)</Label>
                <Textarea
                  value={resultNotes}
                  onChange={(e) => setResultNotes(e.target.value)}
                  placeholder="Add any observations or issues..."
                  className="bg-background/60 border-elec-yellow/30 text-white min-h-[60px]"
                />
              </div>

              <Button
                onClick={handleSaveResult}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Save Result
              </Button>
            </div>
          </div>

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
