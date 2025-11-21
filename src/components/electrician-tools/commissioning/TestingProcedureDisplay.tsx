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
  const [showMoreCheckpoints, setShowMoreCheckpoints] = useState(false);

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
  const initialCheckpointsToShow = 5;
  const hasMoreCheckpoints = visualInspectionCount > initialCheckpointsToShow;

  return (
    <div className="space-y-6">
      {/* Visual Inspection Section */}
      {procedure.visualInspection && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-purple-400" />
              Visual Inspection
            </h3>
            {visualInspectionCount > 0 && (
              <Badge variant="outline" className="text-sm">
                {checkedCount} of {visualInspectionCount} Complete
              </Badge>
            )}
          </div>

          {/* Safety Notes - ALWAYS EXPANDED */}
          {procedure.visualInspection.safetyNotes && Array.isArray(procedure.visualInspection.safetyNotes) && procedure.visualInspection.safetyNotes.length > 0 && (
            <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-300 text-base font-semibold mb-3">
                <AlertTriangle className="h-5 w-5" />
                Safety Notes
              </div>
              <ul className="space-y-2 text-sm text-white leading-relaxed">
                {procedure.visualInspection.safetyNotes.map((note, i) => (
                  <li key={i} className="text-left">• {note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Checkpoints - First 5 visible, rest behind "Show More" */}
          <div className="space-y-3">
            {procedure.visualInspection.checkpoints && Array.isArray(procedure.visualInspection.checkpoints) && 
              procedure.visualInspection.checkpoints
                .slice(0, showMoreCheckpoints ? undefined : initialCheckpointsToShow)
                .map((checkpoint, index) => {
                  const checkboxId = `visual-${index}`;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-elec-gray border-2 border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors"
                    >
                      <Checkbox
                        id={checkboxId}
                        checked={checkedItems[checkboxId] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(checkboxId, checked as boolean)}
                        className="mt-1 min-w-[24px] min-h-[24px] touch-manipulation"
                      />
                      <label htmlFor={checkboxId} className="flex-1 cursor-pointer text-base leading-relaxed">
                        <div className="font-semibold text-white mb-1">{checkpoint.item}</div>
                        <div className="text-sm text-white/90">{checkpoint.requirement}</div>
                        {checkpoint.reference && (
                          <div className="text-sm text-purple-400 mt-1">{checkpoint.reference}</div>
                        )}
                      </label>
                    </div>
                  );
                })}
            
            {hasMoreCheckpoints && !showMoreCheckpoints && (
              <Button
                onClick={() => setShowMoreCheckpoints(true)}
                variant="outline"
                className="w-full min-h-[48px] text-base"
              >
                Show {visualInspectionCount - initialCheckpointsToShow} More Checkpoints
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {showMoreCheckpoints && hasMoreCheckpoints && (
              <Button
                onClick={() => setShowMoreCheckpoints(false)}
                variant="outline"
                className="w-full min-h-[48px] text-base"
              >
                Show Less
                <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Dead Tests Section */}
      {procedure.deadTests && procedure.deadTests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Zap className="h-6 w-6 text-red-400" />
            Dead Tests (Isolation Required)
          </h3>
          
          {/* First 2 tests EXPANDED, rest collapsed */}
          {procedure.deadTests.map((test, index) => (
            <div key={index} className="space-y-3">
              {index < 2 ? (
                // EXPANDED CARD (first 2 tests)
                <div className="border-2 border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray">
                  {/* Always Visible Header */}
                  <div className="px-5 py-4 bg-elec-dark/50">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 text-base px-3 py-1">{index + 1}</Badge>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-base mb-1">{test.testName}</div>
                        <div className="text-sm text-white/90">{test.regulation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className="px-5 pb-5 space-y-4">
                    {/* Test Sequence Validator */}
                    <TestSequenceValidator 
                      currentTest={test} 
                      allTests={procedure.deadTests || []} 
                    />

                    {/* Acceptance Criteria - ALWAYS VISIBLE */}
                    <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Acceptance Criteria
                      </div>
                      <p className="text-sm text-white leading-relaxed">{test.acceptanceCriteria}</p>
                      {test.expectedResult && (
                        <div className="mt-3">
                          {typeof test.expectedResult === 'object' ? (
                            <div className="space-y-2">
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
                              {test.expectedResult.maximumPermitted && (
                                <p className="text-sm text-white">
                                  <span className="font-semibold">Maximum:</span> {test.expectedResult.maximumPermitted}
                                </p>
                              )}
                              {test.expectedResult.result && (
                                <p className="text-sm font-semibold text-green-400">
                                  <span className="font-semibold">Result:</span> {test.expectedResult.result}
                                </p>
                              )}
                              {test.expectedResult.passFail && (
                                <p className={`text-sm font-bold ${test.expectedResult.passFail.toLowerCase().includes('pass') ? 'text-green-400' : 'text-red-400'}`}>
                                  {test.expectedResult.passFail}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-green-300">Expected: {test.expectedResult}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Accordion for Detailed Steps */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details" className="border-white/10">
                        <AccordionTrigger className="text-white hover:text-white/80 py-3">
                          <span className="text-base font-medium">Show Detailed Procedure ({test.procedure?.length || 0} steps)</span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          {/* Instrument Setup */}
                          <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-2">
                              <Zap className="h-5 w-5" />
                              Instrument Setup
                            </div>
                            <p className="text-sm text-white leading-relaxed">{test.instrumentSetup}</p>
                          </div>

                          {/* Procedure Steps */}
                          {test.procedure && Array.isArray(test.procedure) && (
                            <div>
                              <div className="text-base font-semibold text-white mb-3">Procedure</div>
                              <ol className="space-y-2 text-sm text-white leading-relaxed list-decimal list-inside">
                                {test.procedure.map((step, i) => (
                                  <li key={i} className="text-left">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* Troubleshooting */}
                          {test.troubleshooting && Array.isArray(test.troubleshooting) && test.troubleshooting.length > 0 && (
                            <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
                              <div className="flex items-center gap-2 text-amber-300 text-base font-semibold mb-2">
                                <AlertTriangle className="h-5 w-5" />
                                Troubleshooting
                              </div>
                              <ul className="space-y-2 text-sm text-white leading-relaxed">
                                {test.troubleshooting.map((tip, i) => (
                                  <li key={i} className="text-left">• {tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Pro Tips */}
                    {test.proTips && Array.isArray(test.proTips) && test.proTips.length > 0 && (
                      <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Pro Tips
                        </div>
                        <ul className="space-y-2 text-sm text-white leading-relaxed">
                          {test.proTips.map((tip, i) => (
                            <li key={i} className="text-left">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Test Duration */}
                    {test.testDuration && (
                      <div className="text-sm text-white/90 text-left">
                        <span className="font-semibold">⏱️ Estimated Time:</span> {test.testDuration}
                      </div>
                    )}

                    {/* Copy Button */}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => copyTestProcedure(test)}
                      className="w-full min-h-[48px]"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Test Procedure
                    </Button>
                  </div>
                </div>
              ) : (
                // COLLAPSED CARD (remaining tests)
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value={`dead-${index}`}
                    className="border-2 border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-elec-yellow/5 min-h-[56px]">
                      <div className="flex items-center gap-3 text-left w-full">
                        <Badge variant="outline" className="shrink-0 text-base px-3 py-1">{index + 1}</Badge>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-base">{test.testName}</div>
                          <div className="text-sm text-white/90">{test.regulation}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 space-y-4">
                      {/* Test Sequence Validator */}
                      <TestSequenceValidator 
                        currentTest={test} 
                        allTests={procedure.deadTests || []} 
                      />
                      
                      {/* Instrument Setup */}
                      <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-2">
                          <Zap className="h-5 w-5" />
                          Instrument Setup
                        </div>
                        <p className="text-sm text-white leading-relaxed">{test.instrumentSetup}</p>
                      </div>

                      {/* Procedure */}
                      {test.procedure && Array.isArray(test.procedure) && (
                        <div>
                          <div className="text-base font-semibold text-white mb-3">Procedure</div>
                          <ol className="space-y-2 text-sm text-white leading-relaxed list-decimal list-inside">
                            {test.procedure.map((step, i) => (
                              <li key={i} className="text-left">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Expected Results */}
                      <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Acceptance Criteria
                        </div>
                        <p className="text-sm text-white leading-relaxed">{test.acceptanceCriteria}</p>
                        {test.expectedResult && (
                          <div className="mt-3">
                            {typeof test.expectedResult === 'object' ? (
                              <div className="space-y-2">
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
                                {test.expectedResult.maximumPermitted && (
                                  <p className="text-sm text-white">
                                    <span className="font-semibold">Maximum:</span> {test.expectedResult.maximumPermitted}
                                  </p>
                                )}
                                {test.expectedResult.result && (
                                  <p className="text-sm font-semibold text-green-400">
                                    <span className="font-semibold">Result:</span> {test.expectedResult.result}
                                  </p>
                                )}
                                {test.expectedResult.passFail && (
                                  <p className={`text-sm font-bold ${test.expectedResult.passFail.toLowerCase().includes('pass') ? 'text-green-400' : 'text-red-400'}`}>
                                    {test.expectedResult.passFail}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-green-300">Expected: {test.expectedResult}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Troubleshooting */}
                      {test.troubleshooting && Array.isArray(test.troubleshooting) && test.troubleshooting.length > 0 && (
                        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-amber-300 text-base font-semibold mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            Troubleshooting
                          </div>
                          <ul className="space-y-2 text-sm text-white leading-relaxed">
                            {test.troubleshooting.map((tip, i) => (
                              <li key={i} className="text-left">• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Copy Button */}
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => copyTestProcedure(test)}
                        className="w-full min-h-[48px]"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Test Procedure
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Live Tests Section */}
      {procedure.liveTests && procedure.liveTests.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            Live Tests
          </h3>
          
          {/* First 2 tests EXPANDED, rest collapsed */}
          {procedure.liveTests.map((test, index) => (
            <div key={index} className="space-y-3">
              {index < 2 ? (
                // EXPANDED CARD (first 2 tests)
                <div className="border-2 border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray">
                  {/* Always Visible Header */}
                  <div className="px-5 py-4 bg-elec-dark/50">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 text-base px-3 py-1">{index + 1}</Badge>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-base mb-1">{test.testName}</div>
                        <div className="text-sm text-white/90">{test.regulation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div className="px-5 pb-5 space-y-4">
                    {/* Test Sequence Validator */}
                    <TestSequenceValidator 
                      currentTest={test} 
                      allTests={procedure.liveTests || []} 
                    />

                    {/* Acceptance Criteria - ALWAYS VISIBLE */}
                    <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Acceptance Criteria
                      </div>
                      <p className="text-sm text-white leading-relaxed">{test.acceptanceCriteria}</p>
                    </div>

                    {/* Calculation Breakdown */}
                    {test.calculation && typeof test.calculation === 'object' && (
                      test.calculation.formula && test.calculation.components && test.calculation.expectedResult && test.calculation.limitCheck ? (
                        <CalculationBreakdown calculation={test.calculation as any} />
                      ) : (
                        <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
                          <div className="text-base font-semibold text-purple-300 mb-2">Calculation</div>
                          <div className="space-y-2">
                            {test.calculation.formula && (
                              <p className="text-sm text-purple-300 font-mono">{test.calculation.formula}</p>
                            )}
                            {test.calculation.Ze && (
                              <p className="text-sm text-white">Ze = {test.calculation.Ze}</p>
                            )}
                            {test.calculation.R1R2 && (
                              <p className="text-sm text-white">R1+R2 = {test.calculation.R1R2}</p>
                            )}
                            {test.calculation.expectedZs && (
                              <p className="text-sm text-purple-300 font-semibold">Expected Zs = {test.calculation.expectedZs}</p>
                            )}
                          </div>
                        </div>
                      )
                    )}
                    
                    {/* Fallback for old calculation format */}
                    {test.calculation && typeof test.calculation === 'string' && (
                      <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
                        <div className="text-base font-semibold text-purple-300 mb-2">Calculation</div>
                        <p className="text-sm text-white font-mono leading-relaxed">{test.calculation}</p>
                      </div>
                    )}

                    {/* Accordion for Detailed Steps */}
                    <Accordion type="single" collapsible>
                      <AccordionItem value="details" className="border-white/10">
                        <AccordionTrigger className="text-white hover:text-white/80 py-3">
                          <span className="text-base font-medium">Show Detailed Procedure ({test.procedure?.length || 0} steps)</span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                          {/* Instrument Setup */}
                          <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-2">
                              <Zap className="h-5 w-5" />
                              Instrument Setup
                            </div>
                            <p className="text-sm text-white leading-relaxed">{test.instrumentSetup}</p>
                          </div>

                          {/* Procedure Steps */}
                          {test.procedure && Array.isArray(test.procedure) && (
                            <div>
                              <div className="text-base font-semibold text-white mb-3">Procedure</div>
                              <ol className="space-y-2 text-sm text-white leading-relaxed list-decimal list-inside">
                                {test.procedure.map((step, i) => (
                                  <li key={i} className="text-left">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* Troubleshooting */}
                          {test.troubleshooting && Array.isArray(test.troubleshooting) && test.troubleshooting.length > 0 && (
                            <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
                              <div className="flex items-center gap-2 text-amber-300 text-base font-semibold mb-2">
                                <AlertTriangle className="h-5 w-5" />
                                Troubleshooting
                              </div>
                              <ul className="space-y-2 text-sm text-white leading-relaxed">
                                {test.troubleshooting.map((tip, i) => (
                                  <li key={i} className="text-left">• {tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Pro Tips */}
                    {test.proTips && Array.isArray(test.proTips) && test.proTips.length > 0 && (
                      <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Pro Tips
                        </div>
                        <ul className="space-y-2 text-sm text-white leading-relaxed">
                          {test.proTips.map((tip, i) => (
                            <li key={i} className="text-left">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Test Duration */}
                    {test.testDuration && (
                      <div className="text-sm text-white/90 text-left">
                        <span className="font-semibold">⏱️ Estimated Time:</span> {test.testDuration}
                      </div>
                    )}

                    {/* Copy Button */}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => copyTestProcedure(test)}
                      className="w-full min-h-[48px]"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Test Procedure
                    </Button>
                  </div>
                </div>
              ) : (
                // COLLAPSED CARD (remaining tests)
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value={`live-${index}`}
                    className="border-2 border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-elec-yellow/5 min-h-[56px]">
                      <div className="flex items-center gap-3 text-left w-full">
                        <Badge variant="outline" className="shrink-0 text-base px-3 py-1">{index + 1}</Badge>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-base">{test.testName}</div>
                          <div className="text-sm text-white/90">{test.regulation}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 space-y-4">
                      {/* Full content similar to above */}
                      <TestSequenceValidator 
                        currentTest={test} 
                        allTests={procedure.liveTests || []} 
                      />
                      
                      <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-blue-300 text-base font-semibold mb-2">
                          <Zap className="h-5 w-5" />
                          Instrument Setup
                        </div>
                        <p className="text-sm text-white leading-relaxed">{test.instrumentSetup}</p>
                      </div>

                      {test.procedure && Array.isArray(test.procedure) && (
                        <div>
                          <div className="text-base font-semibold text-white mb-3">Procedure</div>
                          <ol className="space-y-2 text-sm text-white leading-relaxed list-decimal list-inside">
                            {test.procedure.map((step, i) => (
                              <li key={i} className="text-left">{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {test.calculation && typeof test.calculation === 'object' && (
                        test.calculation.formula && test.calculation.components && test.calculation.expectedResult && test.calculation.limitCheck ? (
                          <CalculationBreakdown calculation={test.calculation as any} />
                        ) : (
                          <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
                            <div className="text-base font-semibold text-purple-300 mb-2">Calculation</div>
                            <div className="space-y-2">
                              {test.calculation.formula && (
                                <p className="text-sm text-purple-300 font-mono">{test.calculation.formula}</p>
                              )}
                              {test.calculation.Ze && (
                                <p className="text-sm text-white">Ze = {test.calculation.Ze}</p>
                              )}
                              {test.calculation.R1R2 && (
                                <p className="text-sm text-white">R1+R2 = {test.calculation.R1R2}</p>
                              )}
                              {test.calculation.expectedZs && (
                                <p className="text-sm text-purple-300 font-semibold">Expected Zs = {test.calculation.expectedZs}</p>
                              )}
                            </div>
                          </div>
                        )
                      )}
                      
                      {test.calculation && typeof test.calculation === 'string' && (
                        <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
                          <div className="text-base font-semibold text-purple-300 mb-2">Calculation</div>
                          <p className="text-sm text-white font-mono leading-relaxed">{test.calculation}</p>
                        </div>
                      )}

                      <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Acceptance Criteria
                        </div>
                        <p className="text-sm text-white leading-relaxed">{test.acceptanceCriteria}</p>
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => copyTestProcedure(test)}
                        className="w-full min-h-[48px]"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Test Procedure
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestingProcedureDisplay;
