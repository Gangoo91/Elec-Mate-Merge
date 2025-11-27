import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Clock, ChevronDown, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ExpectedReadingsCard } from "./ExpectedReadingsCard";
import { InstrumentSetupPanel } from "./InstrumentSetupPanel";
import { TroubleshootingPanel } from "./TroubleshootingPanel";
import { ProcedureStepCard } from "./ProcedureStepCard";
import { TestSequenceValidator } from "../TestSequenceValidator";
import type { TestProcedure } from "@/types/commissioning-response";

interface EnhancedTestCardProps {
  test: TestProcedure;
  testNumber: number;
  isExpandedByDefault?: boolean;
  allTests?: TestProcedure[];
}

export const EnhancedTestCard = ({ 
  test, 
  testNumber, 
  isExpandedByDefault = false,
  allTests = []
}: EnhancedTestCardProps) => {
  const [showDetails, setShowDetails] = useState(isExpandedByDefault);

  const copyTestProcedure = () => {
    const markdown = `# ${test.testName}
**Regulation**: ${test.regulation}

## Instrument Setup
${test.instrumentSetup}

## Procedure
${test.procedure?.map((step, i) => `${i + 1}. ${step}`).join('\n') || 'No procedure steps'}

## Acceptance Criteria
${test.acceptanceCriteria}
${test.calculation ? `\n## Calculation\n${JSON.stringify(test.calculation, null, 2)}` : ''}
${test.troubleshooting ? `\n## Troubleshooting\n${test.troubleshooting.map(t => `- ${t}`).join('\n')}` : ''}`;

    navigator.clipboard.writeText(markdown);
    toast({
      title: "Test procedure copied",
      description: "Paste into your notes app",
      variant: "success"
    });
  };

  return (
    <div className="border-2 border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-card hover:border-elec-yellow/30 transition-all">
      {/* Header - Always Visible */}
      <div className="bg-elec-dark/50 p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Test Number Badge */}
          <Badge variant="outline" className="shrink-0 text-base px-3 py-1.5 bg-purple-500/20 text-purple-300 border-purple-500/30">
            {testNumber}
          </Badge>

          {/* Test Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base sm:text-lg text-foreground mb-1.5">
              {test.testName}
            </h4>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Regulation Badge */}
              <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30">
                {test.regulation}
              </Badge>

              {/* Duration */}
              {test.testDuration && (
                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                  <Clock className="h-3 w-3 mr-1" />
                  {test.testDuration}
                </Badge>
              )}

              {/* Test Sequence */}
              {test.testSequence && (
                <Badge variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                  Sequence: {test.testSequence}
                </Badge>
              )}
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDetails(!showDetails)}
            className="shrink-0 touch-manipulation"
          >
            <ChevronDown className={cn(
              "h-5 w-5 transition-transform",
              showDetails && "rotate-180"
            )} />
          </Button>
        </div>
      </div>

      {/* Content - Collapsible */}
      {showDetails && (
        <div className="p-4 sm:p-5 space-y-5">
          {/* Test Sequence Validator */}
          {allTests.length > 0 && (
            <TestSequenceValidator 
              currentTest={test} 
              allTests={allTests} 
            />
          )}

          {/* Expected Results - Prominent Display */}
          <ExpectedReadingsCard 
            expectedResult={test.expectedResult}
            acceptanceCriteria={test.acceptanceCriteria}
          />

          {/* Instrument Setup */}
          <InstrumentSetupPanel instrumentSetup={test.instrumentSetup} />

          {/* Procedure Steps */}
          {test.procedure && test.procedure.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-base font-semibold text-foreground mb-3">
                📋 Test Procedure ({test.procedure.length} steps)
              </div>
              <div className="space-y-3">
                {test.procedure.map((step, idx) => (
                  <ProcedureStepCard
                    key={idx}
                    step={step}
                    stepNumber={idx + 1}
                    isExpanded={idx === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Calculation Breakdown */}
          {test.calculation && typeof test.calculation === 'object' && (
            <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-300 text-base font-semibold mb-3">
                <Calculator className="h-5 w-5" />
                Calculation Breakdown
              </div>
              <div className="space-y-2 text-sm">
                {typeof test.calculation === 'string' ? (
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">{test.calculation}</p>
                ) : (
                  <>
                    {test.calculation.formula && (
                      <div>
                        <span className="text-foreground/80">Formula: </span>
                        <span className="text-foreground font-mono">{test.calculation.formula}</span>
                      </div>
                    )}
                    {test.calculation.Ze && (
                      <div>
                        <span className="text-foreground/80">Ze: </span>
                        <span className="text-foreground">{test.calculation.Ze}</span>
                      </div>
                    )}
                    {test.calculation.R1R2 && (
                      <div>
                        <span className="text-foreground/80">R1+R2: </span>
                        <span className="text-foreground">{test.calculation.R1R2}</span>
                      </div>
                    )}
                    {test.calculation.expectedZs && (
                      <div>
                        <span className="text-foreground/80">Expected Zs: </span>
                        <span className="text-foreground">{test.calculation.expectedZs}</span>
                      </div>
                    )}
                    {test.calculation.expectedResult && (
                      <div>
                        <span className="text-foreground/80">Expected Result: </span>
                        <span className="text-foreground font-semibold">{test.calculation.expectedResult}</span>
                      </div>
                    )}
                    {test.calculation.limitCheck && (
                      <div>
                        <span className="text-foreground/80">Limit Check: </span>
                        <span className="text-foreground">{test.calculation.limitCheck}</span>
                      </div>
                    )}
                    {test.calculation.components && typeof test.calculation.components === 'object' && (
                      <div className="mt-2">
                        <div className="text-foreground/80 mb-1">Components:</div>
                        <div className="pl-4 space-y-1">
                          {Object.entries(test.calculation.components).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-foreground/80">{key}: </span>
                              <span className="text-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Troubleshooting Panel */}
          <TroubleshootingPanel
            troubleshooting={test.troubleshooting}
            commonMistakes={test.commonMistakes}
            proTips={test.proTips}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/40">
            <Button
              variant="outline"
              size="lg"
              onClick={copyTestProcedure}
              className="flex-1 min-h-[48px] touch-manipulation"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Test Procedure
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
