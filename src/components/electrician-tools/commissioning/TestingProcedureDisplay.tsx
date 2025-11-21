import { useState } from "react";
import { AlertTriangle, CheckCircle2, Zap, Copy, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CalculationBreakdown } from "./CalculationBreakdown";
import { TestSequenceValidator } from "./TestSequenceValidator";
import type { TestingProcedure } from "@/types/commissioning-response";

interface TestingProcedureDisplayProps {
  procedure: TestingProcedure;
}

const TestingProcedureDisplay = ({ procedure }: TestingProcedureDisplayProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showSafetyNotes, setShowSafetyNotes] = useState(false);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const copyTestProcedure = (test: any) => {
    const markdown = `# ${test.testName}
**Regulation**: ${test.regulation}

## Instrument Setup
${test.instrumentSetup}

## Procedure
${test.procedure.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}

## Acceptance Criteria
${test.acceptanceCriteria}
${test.calculation ? `\n## Calculation\n${test.calculation}` : ''}
${test.troubleshooting ? `\n## Troubleshooting\n${test.troubleshooting.map((t: string) => `- ${t}`).join('\n')}` : ''}`;

    navigator.clipboard.writeText(markdown);
    toast({
      title: "Test procedure copied",
      description: "Paste into your notes app",
      variant: "success"
    });
  };

  const visualInspectionCount = procedure.visualInspection?.checkpoints.length || 0;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Visual Inspection Section */}
      {procedure.visualInspection && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-400" />
              Visual Inspection
            </h3>
            {visualInspectionCount > 0 && (
              <Badge variant="outline" className="text-xs">
                {checkedCount} of {visualInspectionCount} Complete
              </Badge>
            )}
          </div>

          {procedure.visualInspection.safetyNotes && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <button
                onClick={() => setShowSafetyNotes(!showSafetyNotes)}
                className="flex items-center gap-2 text-amber-300 text-sm font-medium w-full"
              >
                <AlertTriangle className="h-4 w-4" />
                Safety Notes
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${showSafetyNotes ? 'rotate-180' : ''}`} />
              </button>
              {showSafetyNotes && (
                <ul className="mt-2 space-y-1 text-xs text-gray-200">
                  {procedure.visualInspection.safetyNotes.map((note, i) => (
                    <li key={i}>• {note}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="space-y-2">
            {procedure.visualInspection.checkpoints.map((checkpoint, index) => {
              const checkboxId = `visual-${index}`;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-elec-gray border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors"
                >
                  <Checkbox
                    id={checkboxId}
                    checked={checkedItems[checkboxId] || false}
                    onCheckedChange={(checked) => handleCheckboxChange(checkboxId, checked as boolean)}
                    className="mt-1 min-w-[20px] min-h-[20px] touch-manipulation"
                  />
                  <label htmlFor={checkboxId} className="flex-1 cursor-pointer text-sm">
                    <div className="font-medium text-foreground">{checkpoint.item}</div>
                    <div className="text-xs text-muted-foreground mt-1">{checkpoint.requirement}</div>
                    {checkpoint.reference && (
                      <div className="text-xs text-purple-400 mt-1">{checkpoint.reference}</div>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dead Tests Section */}
      {procedure.deadTests && procedure.deadTests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-red-400" />
            Dead Tests (Isolation Required)
          </h3>
          <Accordion type="single" collapsible className="space-y-2">
            {procedure.deadTests.map((test, index) => (
              <AccordionItem
                key={index}
                value={`dead-${index}`}
                className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-elec-yellow/5">
                  <div className="flex items-center gap-3 text-left">
                    <Badge variant="outline" className="shrink-0">{index + 1}</Badge>
                    <div>
                      <div className="font-medium text-foreground">{test.testName}</div>
                      <div className="text-xs text-muted-foreground">{test.regulation}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-3">
                  {/* Test Sequence Validator */}
                  <TestSequenceValidator 
                    currentTest={test} 
                    allTests={procedure.deadTests || []} 
                  />
                  
                  {/* Instrument Setup */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                      <Zap className="h-4 w-4" />
                      Instrument Setup
                    </div>
                    <p className="text-xs text-gray-200">{test.instrumentSetup}</p>
                  </div>

                  {/* Procedure */}
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Procedure</div>
                    <ol className="space-y-1 text-xs text-gray-200 list-decimal list-inside">
                      {test.procedure.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Expected Results */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Acceptance Criteria
                    </div>
                    <p className="text-xs text-gray-200">{test.acceptanceCriteria}</p>
                    {test.expectedResult && (
                      <div className="mt-2">
                        {typeof test.expectedResult === 'object' ? (
                          <div className="space-y-1">
                            {test.expectedResult.calculated && (
                              <p className="text-xs text-gray-200">
                                <span className="font-medium">Calculated:</span> {test.expectedResult.calculated}
                              </p>
                            )}
                            {test.expectedResult.measured && (
                              <p className="text-xs text-green-300">
                                <span className="font-medium">Measured:</span> {test.expectedResult.measured}
                              </p>
                            )}
                            {test.expectedResult.maximumPermitted && (
                              <p className="text-xs text-gray-200">
                                <span className="font-medium">Maximum:</span> {test.expectedResult.maximumPermitted}
                              </p>
                            )}
                            {test.expectedResult.result && (
                              <p className="text-xs font-semibold text-green-400">
                                <span className="font-medium">Result:</span> {test.expectedResult.result}
                              </p>
                            )}
                            {test.expectedResult.passFail && (
                              <p className={`text-xs font-bold ${test.expectedResult.passFail.toLowerCase().includes('pass') ? 'text-green-400' : 'text-red-400'}`}>
                                {test.expectedResult.passFail}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-green-300">Expected: {test.expectedResult}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Troubleshooting */}
                  {test.troubleshooting && test.troubleshooting.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-amber-300 text-sm font-medium mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Troubleshooting
                      </div>
                      <ul className="space-y-2 text-xs text-gray-200">
                        {test.troubleshooting.map((tip, i) => (
                          <li key={i} className="text-left leading-relaxed">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {test.commonMistakes && test.commonMistakes.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-red-300 text-sm font-medium mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Common Mistakes to Avoid
                      </div>
                      <ul className="space-y-2 text-xs text-gray-200">
                        {test.commonMistakes.map((mistake, i) => (
                          <li key={i} className="text-left leading-relaxed">• {mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pro Tips */}
                  {test.proTips && test.proTips.length > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Pro Tips
                      </div>
                      <ul className="space-y-2 text-xs text-gray-200">
                        {test.proTips.map((tip, i) => (
                          <li key={i} className="text-left leading-relaxed">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Test Duration */}
                  {test.testDuration && (
                    <div className="text-xs text-muted-foreground text-left">
                      <span className="font-medium">⏱️ Estimated Time:</span> {test.testDuration}
                    </div>
                  )}

                  {/* Copy Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyTestProcedure(test)}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Test Procedure
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Live Tests Section */}
      {procedure.liveTests && procedure.liveTests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Live Tests
          </h3>
          <Accordion type="single" collapsible className="space-y-2">
            {procedure.liveTests.map((test, index) => (
              <AccordionItem
                key={index}
                value={`live-${index}`}
                className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-elec-yellow/5">
                  <div className="flex items-center gap-3 text-left">
                    <Badge variant="outline" className="shrink-0">{index + 1}</Badge>
                    <div>
                      <div className="font-medium text-foreground">{test.testName}</div>
                      <div className="text-xs text-gray-200">{test.regulation}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-3">
                  {/* Test Sequence Validator */}
                  <TestSequenceValidator 
                    currentTest={test} 
                    allTests={procedure.liveTests || []} 
                  />
                  
                  {/* Instrument Setup */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                      <Zap className="h-4 w-4" />
                      Instrument Setup
                    </div>
                    <p className="text-xs text-gray-200">{test.instrumentSetup}</p>
                  </div>

                  {/* Procedure */}
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Procedure</div>
                    <ol className="space-y-1 text-xs text-gray-200 list-decimal list-inside">
                      {test.procedure.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Calculation Breakdown */}
                  {test.calculation && typeof test.calculation === 'object' && (
                    test.calculation.formula && test.calculation.components && test.calculation.expectedResult && test.calculation.limitCheck ? (
                      <CalculationBreakdown calculation={test.calculation as any} />
                    ) : (
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                        <div className="text-sm font-medium text-purple-300 mb-1">Calculation</div>
                        <div className="space-y-1">
                          {test.calculation.formula && (
                            <p className="text-xs text-purple-300 font-mono">{test.calculation.formula}</p>
                          )}
                          {test.calculation.Ze && (
                            <p className="text-xs text-gray-200">Ze = {test.calculation.Ze}</p>
                          )}
                          {test.calculation.R1R2 && (
                            <p className="text-xs text-gray-200">R1+R2 = {test.calculation.R1R2}</p>
                          )}
                          {test.calculation.expectedZs && (
                            <p className="text-xs text-purple-300 font-semibold">Expected Zs = {test.calculation.expectedZs}</p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                  
                  {/* Fallback for old calculation format */}
                  {test.calculation && typeof test.calculation === 'string' && (
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="text-sm font-medium text-purple-300 mb-1">Calculation</div>
                      <p className="text-xs text-gray-200 font-mono">{test.calculation}</p>
                    </div>
                  )}

                  {/* Expected Results */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Acceptance Criteria
                    </div>
                    <p className="text-xs text-gray-200">{test.acceptanceCriteria}</p>
                    {test.expectedResult && (
                      <div className="mt-2">
                        {typeof test.expectedResult === 'object' ? (
                          <div className="space-y-1">
                            {test.expectedResult.calculated && (
                              <p className="text-xs text-gray-200">
                                <span className="font-medium">Calculated:</span> {test.expectedResult.calculated}
                              </p>
                            )}
                            {test.expectedResult.measured && (
                              <p className="text-xs text-green-300">
                                <span className="font-medium">Measured:</span> {test.expectedResult.measured}
                              </p>
                            )}
                            {test.expectedResult.maximumPermitted && (
                              <p className="text-xs text-gray-200">
                                <span className="font-medium">Maximum:</span> {test.expectedResult.maximumPermitted}
                              </p>
                            )}
                            {test.expectedResult.result && (
                              <p className="text-xs font-semibold text-green-400">
                                <span className="font-medium">Result:</span> {test.expectedResult.result}
                              </p>
                            )}
                            {test.expectedResult.passFail && (
                              <p className={`text-xs font-bold ${test.expectedResult.passFail.toLowerCase().includes('pass') ? 'text-green-400' : 'text-red-400'}`}>
                                {test.expectedResult.passFail}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-green-300">Expected: {test.expectedResult}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Troubleshooting */}
                  {test.troubleshooting && test.troubleshooting.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-amber-300 text-sm font-medium mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Troubleshooting
                      </div>
                      <ul className="space-y-2 text-xs text-gray-200">
                        {test.troubleshooting.map((tip, i) => (
                          <li key={i} className="text-left leading-relaxed">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {test.commonMistakes && test.commonMistakes.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-red-300 text-sm font-medium mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Common Mistakes to Avoid
                      </div>
                      <ul className="space-y-2 text-xs text-gray-200">
                        {test.commonMistakes.map((mistake, i) => (
                          <li key={i} className="text-left leading-relaxed">• {mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pro Tips */}
                  {test.proTips && test.proTips.length > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Pro Tips
                      </div>
                      <ul className="space-y-2 text-xs text-gray-200">
                        {test.proTips.map((tip, i) => (
                          <li key={i} className="text-left leading-relaxed">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Test Duration */}
                  {test.testDuration && (
                    <div className="text-xs text-muted-foreground text-left">
                      <span className="font-medium">⏱️ Estimated Time:</span> {test.testDuration}
                    </div>
                  )}

                  {/* Copy Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyTestProcedure(test)}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Test Procedure
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default TestingProcedureDisplay;
