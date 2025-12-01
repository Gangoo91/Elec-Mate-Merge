import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, AlertTriangle, Zap, Clock, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import type { DiagnosticStep } from "@/types/commissioning-response";

interface FaultDiagnosisStepCardProps {
  step: DiagnosticStep;
  onToggleComplete?: (stepId: string, completed: boolean) => void;
  isCompleted?: boolean;
}

export const FaultDiagnosisStepCard = ({
  step,
  onToggleComplete,
  isCompleted = false
}: FaultDiagnosisStepCardProps) => {
  const { isMobile } = useMobileEnhanced();
  const [sectionsExpanded, setSectionsExpanded] = useState({
    action: true,
    measurement: !isMobile,
    instrumentSetup: false,
    safetyWarnings: true,
    ifFailed: false
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
    setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // RAG status colors
  const ragColors = {
    RED: { bg: 'bg-red-500', text: 'text-red-100', border: 'border-red-500/50' },
    AMBER: { bg: 'bg-amber-500', text: 'text-amber-100', border: 'border-amber-500/50' },
    GREEN: { bg: 'bg-green-500', text: 'text-green-100', border: 'border-green-500/50' }
  };

  const ragColor = ragColors[step.ragStatus];

  return (
    <Card id={`diagnostic-step-${step.stepNumber}`} className={cn(
      "relative overflow-hidden transition-all duration-300 border-2 animate-fade-in hover:shadow-lg",
      isCompleted ? "border-success/40 bg-success/5" : `border-${step.ragStatus.toLowerCase()}-500/40`
    )}>
      <div className={cn("p-6", isMobile && "p-4")}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          {/* Step number with RAG status */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full flex items-center justify-center font-black transition-all duration-200 shadow-lg",
              isMobile ? "w-[72px] h-[72px] text-2xl" : "w-16 h-16 text-2xl",
              ragColor.bg,
              ragColor.text
            )}>
              {step.stepNumber}
            </div>
            <Badge className={cn(
              "absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5",
              ragColor.bg,
              ragColor.text,
              ragColor.border
            )}>
              {step.ragStatus}
            </Badge>
          </div>

          <div className="flex-1 w-full min-w-0">
            <div className="space-y-4">
              {/* Title & Regulation */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight text-left mb-2">
                  {step.stepTitle}
                </h3>
                {step.regulation && (
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono text-sm">
                    {step.regulation}
                  </Badge>
                )}
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-3">
                {/* Action */}
                <div className="border-2 border-blue-500/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('action')}
                    className={cn(
                      "w-full flex items-center justify-between p-4 bg-blue-500/10 transition-colors",
                      isMobile && "min-h-[56px]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-blue-400" />
                      <h4 className="font-bold text-base text-white">Action</h4>
                    </div>
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-transform",
                      sectionsExpanded.action && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {sectionsExpanded.action && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 bg-blue-500/5">
                          <p className="text-base text-white leading-relaxed text-left mb-3">{step.action}</p>
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                            <p className="text-sm font-semibold text-blue-300 mb-1">What to Test:</p>
                            <p className="text-sm text-white">{step.whatToTest}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Measurement Details */}
                {(step.whatToMeasure || step.expectedReading || step.leadPlacement) && (
                  <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('measurement')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-purple-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-400" />
                        <h4 className="font-bold text-base text-white">Measurement Details</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.measurement && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.measurement && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-purple-500/5 space-y-3">
                            {step.whatToMeasure && (
                              <div>
                                <p className="text-sm font-semibold text-purple-300 mb-1">What to Measure:</p>
                                <p className="text-base text-white">{step.whatToMeasure}</p>
                              </div>
                            )}
                            {step.leadPlacement && (
                              <div>
                                <p className="text-sm font-semibold text-purple-300 mb-1">Lead Placement:</p>
                                <p className="text-base text-white">{step.leadPlacement}</p>
                              </div>
                            )}
                            {step.expectedReading && (
                              <div className="bg-purple-500/20 border border-purple-500/40 rounded p-3">
                                <p className="text-sm font-semibold text-purple-200 mb-1">Expected Reading:</p>
                                <p className="text-base text-white font-mono">{step.expectedReading}</p>
                              </div>
                            )}
                            {step.acceptableRange && (
                              <div>
                                <p className="text-sm font-semibold text-purple-300 mb-1">Acceptable Range:</p>
                                <p className="text-base text-white">{step.acceptableRange}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Instrument Setup */}
                {step.instrumentSetup && (
                  <div className="border-2 border-cyan-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('instrumentSetup')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-cyan-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-cyan-400" />
                        <h4 className="font-bold text-base text-white">Instrument Setup</h4>
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
                          <div className="p-4 bg-cyan-500/5 text-base text-white leading-relaxed text-left">
                            {step.instrumentSetup}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Safety Warnings */}
                {step.safetyWarnings && step.safetyWarnings.length > 0 && (
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
                        <h4 className="font-bold text-base text-white">Safety Warnings</h4>
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
                              {step.safetyWarnings.map((warning, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-white leading-relaxed">
                                  <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                                  <span>{warning}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* If Failed */}
                {step.ifFailed && (
                  <div className="border-2 border-amber-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('ifFailed')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-amber-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                        <h4 className="font-bold text-base text-white">If Test Fails</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.ifFailed && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.ifFailed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-amber-500/5 text-base text-white leading-relaxed text-left">
                            {step.ifFailed}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Test Duration */}
                {step.testDuration && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Duration: {step.testDuration}</span>
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
