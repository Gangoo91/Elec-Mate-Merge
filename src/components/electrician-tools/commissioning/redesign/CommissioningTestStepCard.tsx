import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronDown, Zap, Settings, ClipboardList, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import type { TestProcedure } from "@/types/commissioning-response";

interface CommissioningTestStepCardProps {
  step: TestProcedure;
  stepNumber: number;
  onToggleComplete?: (stepId: string, completed: boolean) => void;
  isCompleted?: boolean;
}

export const CommissioningTestStepCard = ({
  step,
  stepNumber,
  onToggleComplete,
  isCompleted = false
}: CommissioningTestStepCardProps) => {
  const { isMobile } = useMobileEnhanced();
  const [sectionsExpanded, setSectionsExpanded] = useState({
    instrumentSetup: !isMobile,
    procedure: true,
    acceptanceCriteria: true,
    expectedResult: !isMobile,
    calculation: false,
    troubleshooting: false,
    proTips: false,
    safetyWarnings: true
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
    setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Card id={`step-${stepNumber - 1}`} className={cn(
      "relative overflow-hidden transition-all duration-300 border-2 animate-fade-in hover:shadow-lg",
      isCompleted ? "border-success/40 bg-success/5" : "border-border/40 hover:border-elec-yellow/40"
    )}>
      <div className={cn("p-6", isMobile && "p-4")}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          {/* Step number - Touch optimized */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full flex items-center justify-center font-black transition-all duration-200",
              isMobile ? "w-[72px] h-[72px] text-2xl" : "w-16 h-16 text-2xl",
              isCompleted 
                ? "bg-success text-foreground shadow-lg" 
                : "bg-elec-yellow text-black shadow-lg"
            )}>
              {isCompleted ? <CheckCircle2 className="h-8 w-8" /> : stepNumber}
            </div>
          </div>

          <div className="flex-1 w-full min-w-0">
            <div className="space-y-4">
              {/* Title & Regulation */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight text-left mb-2">
                  {step.testName}
                </h3>
                {step.regulation && (
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono">
                    {step.regulation}
                  </Badge>
                )}
              </div>

              {/* Completion Toggle */}
              {onToggleComplete && (
                <button
                  onClick={() => onToggleComplete(`step-${stepNumber}`, !isCompleted)}
                  className={cn(
                    "w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors",
                    isMobile && "min-h-[48px]",
                    isCompleted 
                      ? "bg-success/20 border-success text-success hover:bg-success/30"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  )}
                >
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">
                    {isCompleted ? 'Completed' : 'Mark Complete'}
                  </span>
                </button>
              )}

              {/* Collapsible Sections */}
              <div className="space-y-3">
                {/* Instrument Setup */}
                {step.instrumentSetup && (
                  <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('instrumentSetup')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-purple-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-purple-400" />
                        <h4 className="font-bold text-base text-foreground">Instrument Setup</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.instrumentSetup && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.instrumentSetup && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-purple-500/5 text-base text-foreground leading-relaxed text-left">
                            {step.instrumentSetup}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Procedure Steps */}
                {step.procedure && step.procedure.length > 0 && (
                  <div className="border-2 border-blue-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('procedure')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-blue-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-blue-400" />
                        <h4 className="font-bold text-base text-foreground">Procedure</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.procedure && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.procedure && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-blue-500/5">
                            <ol className="space-y-3 text-left">
                              {step.procedure.map((procedureStep, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-base text-foreground leading-relaxed">
                                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-sm font-bold text-blue-300">
                                    {idx + 1}
                                  </span>
                                  <span className="flex-1 pt-0.5">{procedureStep}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Acceptance Criteria */}
                {step.acceptanceCriteria && (
                  <div className="border-2 border-green-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('acceptanceCriteria')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-green-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <h4 className="font-bold text-base text-foreground">Pass Criteria</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.acceptanceCriteria && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.acceptanceCriteria && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-green-500/5 text-base text-foreground leading-relaxed text-left">
                            {step.acceptanceCriteria}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Expected Result */}
                {step.expectedResult && (
                  <div className="border-2 border-cyan-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('expectedResult')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-cyan-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-cyan-400" />
                        <h4 className="font-bold text-base text-foreground">Expected Result</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.expectedResult && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.expectedResult && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-cyan-500/5 text-base text-foreground leading-relaxed text-left">
                            {typeof step.expectedResult === 'string' 
                              ? step.expectedResult 
                              : JSON.stringify(step.expectedResult, null, 2)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Calculation Breakdown */}
                {step.calculation && (
                  <div className="border-2 border-orange-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('calculation')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-orange-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-orange-400" />
                        <h4 className="font-bold text-base text-foreground">Calculation</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.calculation && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.calculation && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-orange-500/5">
                            <pre className="text-sm text-foreground font-mono overflow-x-auto text-left whitespace-pre-wrap">
                              {typeof step.calculation === 'string'
                                ? step.calculation
                                : JSON.stringify(step.calculation, null, 2)}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Troubleshooting Tips */}
                {step.troubleshooting && step.troubleshooting.length > 0 && (
                  <div className="border-2 border-yellow-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('troubleshooting')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-yellow-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        <h4 className="font-bold text-base text-foreground">If Test Fails</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.troubleshooting && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.troubleshooting && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-yellow-500/5">
                            <ul className="space-y-2 text-left">
                              {step.troubleshooting.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-foreground leading-relaxed">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Pro Tips */}
                {step.proTips && step.proTips.length > 0 && (
                  <div className="border-2 border-indigo-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('proTips')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-indigo-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-indigo-400" />
                        <h4 className="font-bold text-base text-foreground">Pro Tips</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.proTips && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.proTips && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-indigo-500/5">
                            <ul className="space-y-2 text-left">
                              {step.proTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-foreground leading-relaxed">
                                  <Lightbulb className="h-4 w-4 text-indigo-400 mt-1 flex-shrink-0" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Safety Warnings */}
                {step.commonMistakes && step.commonMistakes.length > 0 && (
                  <div className="border-2 border-red-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('safetyWarnings')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-red-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <h4 className="font-bold text-base text-foreground">Common Mistakes</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.safetyWarnings && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.safetyWarnings && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-red-500/5">
                            <ul className="space-y-2 text-left">
                              {step.commonMistakes.map((mistake, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-foreground leading-relaxed">
                                  <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                                  <span>{mistake}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
