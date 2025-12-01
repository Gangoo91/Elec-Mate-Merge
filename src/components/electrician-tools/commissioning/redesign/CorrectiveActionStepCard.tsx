import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Wrench, Clock, AlertTriangle, Lightbulb, BookOpen, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import type { CorrectiveAction } from "@/types/commissioning-response";

interface CorrectiveActionStepCardProps {
  action: CorrectiveAction;
  stepNumber: number;
}

const skillLevelColors = {
  apprentice: 'bg-green-500/20 text-green-300 border-green-500/50',
  qualified: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  specialist: 'bg-red-500/20 text-red-300 border-red-500/50'
};

export const CorrectiveActionStepCard = ({
  action,
  stepNumber
}: CorrectiveActionStepCardProps) => {
  const { isMobile } = useMobileEnhanced();
  const [sectionsExpanded, setSectionsExpanded] = useState({
    procedure: true,
    stepByStepFix: true,
    tools: !isMobile,
    whyThisWorks: false,
    alternativeMethods: false,
    safetyNotes: true
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
    setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 border-2 border-border/40 hover:border-green-400/40 animate-fade-in hover:shadow-lg">
      <div className={cn("p-6", isMobile && "p-4")}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          {/* Step number - Touch optimized */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full flex items-center justify-center font-black bg-green-500 text-white shadow-lg",
              isMobile ? "w-[72px] h-[72px] text-2xl" : "w-16 h-16 text-2xl"
            )}>
              {stepNumber}
            </div>
          </div>

          <div className="flex-1 w-full min-w-0">
            <div className="space-y-4">
              {/* Title & Badges */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight text-left mb-2">
                  {action.forSymptom}
                </h3>
                <p className="text-base text-white/90 mb-3 text-left">{action.action}</p>
                <div className="flex flex-wrap gap-2">
                  {action.skillLevel && (
                    <Badge className={skillLevelColors[action.skillLevel]}>
                      {action.skillLevel.charAt(0).toUpperCase() + action.skillLevel.slice(1)} Level
                    </Badge>
                  )}
                  {action.estimatedTime && (
                    <Badge variant="outline" className="bg-background/50">
                      <Clock className="h-3 w-3 mr-1" />
                      {action.estimatedTime}
                    </Badge>
                  )}
                  {action.materialsCost && (
                    <Badge variant="outline" className="bg-background/50">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {action.materialsCost}
                    </Badge>
                  )}
                  {action.bs7671Reference && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono">
                      {action.bs7671Reference}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-3">
                {/* Detailed Procedure */}
                {action.detailedProcedure && action.detailedProcedure.length > 0 && (
                  <div className="border-2 border-blue-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('procedure')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-blue-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                        <h4 className="font-bold text-base text-white">Detailed Procedure</h4>
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
                            <div className="space-y-3 text-left">
                              {action.detailedProcedure.map((para, idx) => (
                                <p key={idx} className="text-base text-white leading-relaxed">
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Step-by-Step Fix */}
                {action.stepByStepFix && action.stepByStepFix.length > 0 && (
                  <div className="border-2 border-green-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('stepByStepFix')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-green-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-green-400" />
                        <h4 className="font-bold text-base text-white">Step-by-Step Instructions</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.stepByStepFix && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.stepByStepFix && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-green-500/5">
                            <ol className="space-y-3 text-left">
                              {action.stepByStepFix.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-base text-white leading-relaxed">
                                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center text-sm font-bold text-green-300">
                                    {idx + 1}
                                  </span>
                                  <span className="flex-1 pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Tools Required */}
                {action.tools && action.tools.length > 0 && (
                  <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('tools')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-purple-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-purple-400" />
                        <h4 className="font-bold text-base text-white">Tools & Materials Required</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.tools && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.tools && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-purple-500/5">
                            <ul className="space-y-2 text-left">
                              {action.tools.map((tool, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-white leading-relaxed">
                                  <span className="text-purple-400 mt-1">•</span>
                                  <span>{tool}</span>
                                </li>
                              ))}
                            </ul>
                            {action.partNumbers && action.partNumbers.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-purple-500/20">
                                <p className="text-sm font-semibold text-white mb-1">Part Numbers:</p>
                                <ul className="space-y-1">
                                  {action.partNumbers.map((part, idx) => (
                                    <li key={idx} className="text-sm text-white/80 font-mono">
                                      {part}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Why This Works */}
                {action.whyThisWorks && (
                  <div className="border-2 border-cyan-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('whyThisWorks')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-cyan-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-cyan-400" />
                        <h4 className="font-bold text-base text-white">Technical Explanation</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.whyThisWorks && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.whyThisWorks && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-cyan-500/5 text-base text-white leading-relaxed text-left">
                            {action.whyThisWorks}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Alternative Methods */}
                {action.alternativeMethods && action.alternativeMethods.length > 0 && (
                  <div className="border-2 border-indigo-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('alternativeMethods')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-indigo-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-indigo-400" />
                        <h4 className="font-bold text-base text-white">Alternative Approaches</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.alternativeMethods && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.alternativeMethods && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-indigo-500/5">
                            <ul className="space-y-2 text-left">
                              {action.alternativeMethods.map((method, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-white leading-relaxed">
                                  <Lightbulb className="h-4 w-4 text-indigo-400 mt-1 flex-shrink-0" />
                                  <span>{method}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Safety Notes */}
                {action.safetyNotes && action.safetyNotes.length > 0 && (
                  <div className="border-2 border-red-500/50 rounded-lg overflow-hidden bg-red-500/5">
                    <button
                      onClick={() => toggleSection('safetyNotes')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-red-500/20 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <h4 className="font-bold text-base text-white">⚠️ Safety Notes</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.safetyNotes && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.safetyNotes && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-red-500/10">
                            <ul className="space-y-2 text-left">
                              {action.safetyNotes.map((note, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-base text-white leading-relaxed">
                                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                  <span>{note}</span>
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

              {/* Verification Test */}
              {action.verificationTest && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm font-semibold text-green-300 mb-1">Verification Test:</p>
                  <p className="text-sm text-white">{action.verificationTest}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
