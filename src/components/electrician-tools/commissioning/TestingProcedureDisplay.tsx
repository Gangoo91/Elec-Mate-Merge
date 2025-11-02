import { useState } from "react";
import { AlertTriangle, CheckCircle2, Zap, Copy, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
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
                  {/* Instrument Setup */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                      <Zap className="h-4 w-4" />
                      Instrument Setup
                    </div>
                    <p className="text-xs text-muted-foreground">{test.instrumentSetup}</p>
                  </div>

                  {/* Procedure */}
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Procedure</div>
                    <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
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
                    <p className="text-xs text-muted-foreground">{test.acceptanceCriteria}</p>
                    {test.expectedResult && (
                      <p className="text-xs text-green-300 mt-1">Expected: {test.expectedResult}</p>
                    )}
                  </div>

                  {/* Troubleshooting */}
                  {test.troubleshooting && test.troubleshooting.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-amber-300 text-sm font-medium mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Troubleshooting
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {test.troubleshooting.map((tip, i) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
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
                      <div className="text-xs text-muted-foreground">{test.regulation}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-3">
                  {/* Instrument Setup */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2">
                      <Zap className="h-4 w-4" />
                      Instrument Setup
                    </div>
                    <p className="text-xs text-muted-foreground">{test.instrumentSetup}</p>
                  </div>

                  {/* Procedure */}
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Procedure</div>
                    <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                      {test.procedure.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Calculation */}
                  {test.calculation && (
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="text-sm font-medium text-purple-300 mb-1">Calculation</div>
                      <p className="text-xs text-muted-foreground font-mono">{test.calculation}</p>
                    </div>
                  )}

                  {/* Expected Results */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-300 text-sm font-medium mb-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Acceptance Criteria
                    </div>
                    <p className="text-xs text-muted-foreground">{test.acceptanceCriteria}</p>
                    {test.expectedResult && (
                      <p className="text-xs text-green-300 mt-1">Expected: {test.expectedResult}</p>
                    )}
                  </div>

                  {/* Troubleshooting */}
                  {test.troubleshooting && test.troubleshooting.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-amber-300 text-sm font-medium mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Troubleshooting
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {test.troubleshooting.map((tip, i) => (
                          <li key={i}>• {tip}</li>
                        ))}
                      </ul>
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
