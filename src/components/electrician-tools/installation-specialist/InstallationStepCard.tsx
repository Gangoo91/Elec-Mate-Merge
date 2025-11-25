import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, X, Trash2, ChevronUp, ChevronDown, AlertTriangle, Clock, Wrench, CheckCircle2, ShieldAlert, BookOpen } from "lucide-react";
import { InstallationStep } from "@/types/installation-method";
import { cn } from "@/lib/utils";
import { EnhancedStepContent } from "./EnhancedStepContent";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import { motion, AnimatePresence } from "framer-motion";

interface InstallationStepCardProps {
  step: InstallationStep;
  onUpdate: (updated: InstallationStep) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const InstallationStepCard = ({
  step,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown
}: InstallationStepCardProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(step.title);
  const [editedDescription, setEditedDescription] = useState(step.content || '');
  const { isMobile } = useMobileEnhanced();

  const [sectionsExpanded, setSectionsExpanded] = useState({
    safety: false,
    tools: false,
    materials: false,
    checkpoints: false,
    qualifications: false,
    references: false
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
    setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveTitle = () => {
    onUpdate({ ...step, title: editedTitle });
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    onUpdate({ ...step, content: editedDescription });
    setIsEditingDescription(false);
  };

  const riskColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const linkedHazards = step.linkedHazards || [];
  const qualifications = step.qualifications || [];
  const inspectionCheckpoints = (step as any).inspectionCheckpoints || [];
  const toolsRequired = step.toolsRequired || [];
  const bsReferences = (step as any).bsReferences || [];

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 border-2 animate-fade-in hover:shadow-lg",
      "border-border/40 hover:border-elec-yellow/40"
    )}>
      
      <div className={cn("p-6", isMobile && "p-4")}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* Step number - Touch optimized */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full flex items-center justify-center font-black transition-all duration-200",
              isMobile ? "w-[72px] h-[72px] text-2xl" : "w-16 h-16 text-2xl",
              "bg-elec-yellow text-black shadow-lg"
            )}>
              {step.stepNumber}
            </div>
          </div>

          <div className="flex-1 w-full min-w-0">
            <div className="space-y-4">
              {/* Title - Inline editing */}
              <div className="flex items-start gap-2">
                {isEditingTitle ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Step title"
                      className={cn("font-semibold text-lg", isMobile && "text-base min-h-[48px]")}
                      autoFocus
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleSaveTitle}
                      className={cn("shrink-0", isMobile && "min-w-[48px] min-h-[48px]")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditedTitle(step.title);
                        setIsEditingTitle(false);
                      }}
                      className={cn("shrink-0", isMobile && "min-w-[48px] min-h-[48px]")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-foreground leading-tight cursor-pointer hover:text-elec-yellow transition-colors flex-1"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {step.title}
                  </h3>
                )}
              </div>

              {/* Metadata badges */}
              <div className="flex flex-wrap gap-2 items-center">
                {step.estimatedDuration && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{step.estimatedDuration}</span>
                  </div>
                )}
                {step.riskLevel && (
                  <Badge className={cn(
                    "font-semibold border",
                    riskColors[step.riskLevel as keyof typeof riskColors]
                  )}>
                    Risk: {step.riskLevel.toUpperCase()}
                  </Badge>
                )}
              </div>

              {/* Description - Inline editing */}
              {isEditingDescription ? (
                <div className="space-y-2">
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Step description"
                    className={cn("min-h-[120px]", isMobile && "min-h-[160px] text-base")}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveDescription}
                      className={cn(isMobile && "min-h-[48px]")}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditedDescription(step.content || '');
                        setIsEditingDescription(false);
                      }}
                      className={cn(isMobile && "min-h-[48px]")}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="text-base leading-relaxed text-foreground/90 bg-muted/30 p-4 rounded-lg border border-border/50 cursor-pointer hover:border-elec-yellow/40 transition-colors"
                  onClick={() => setIsEditingDescription(true)}
                >
                  <EnhancedStepContent content={step.content || (step as any).description || ''} />
                </div>
              )}

              {/* Collapsible Sections with Framer Motion */}
              <div className="space-y-3">
                {/* BS 7671 References */}
                {bsReferences.length > 0 && (
                  <div className="border-2 border-blue-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('references')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-blue-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                        <h4 className="font-bold text-base text-foreground">Regulatory References</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.references && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.references && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-blue-500/5">
                            <div className="bg-blue-500/20 rounded-md p-3 text-center">
                              <p className="text-sm text-blue-300 font-medium">
                                {bsReferences.join(', ')}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Safety Requirements */}
                {step.safety && step.safety.length > 0 && (
                  <div className="border-2 border-destructive/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('safety')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-destructive/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h4 className="font-bold text-base text-foreground">Safety Requirements</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.safety && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.safety && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-destructive/5">
                            <ul className="space-y-2">
                              {step.safety.map((note, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/30 p-3 rounded-md">
                                  <ShieldAlert className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed text-left">{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Tools Required */}
                {toolsRequired.length > 0 && (
                  <div className="border-2 border-elec-yellow/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('tools')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-elec-yellow/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-elec-yellow" />
                        <h4 className="font-bold text-base text-foreground">Tools Required ({toolsRequired.length})</h4>
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
                          <div className="p-4 bg-elec-yellow/5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {toolsRequired.map((tool: string, i: number) => (
                                <div key={i} className="flex items-start gap-2.5 text-sm bg-background/40 p-3 rounded-md border border-border/40">
                                  <Wrench className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                                  <span className="text-foreground leading-relaxed">{tool}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Materials Needed */}
                {step.materialsNeeded && step.materialsNeeded.length > 0 && (
                  <div className="border-2 border-primary/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('materials')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-primary/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-base text-foreground">Materials Needed</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.materials && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.materials && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-primary/5">
                            <ul className="space-y-2">
                              {step.materialsNeeded.map((material, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/30 p-3 rounded-md">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span className="leading-relaxed">{material}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Inspection Checkpoints */}
                {inspectionCheckpoints.length > 0 && (
                  <div className="border-2 border-success/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('checkpoints')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-success/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <h4 className="font-bold text-base text-foreground">Inspection Checkpoints</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.checkpoints && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.checkpoints && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-success/5">
                            <ul className="space-y-2">
                              {inspectionCheckpoints.map((checkpoint: string, i: number) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/30 p-3 rounded-md">
                                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">{checkpoint}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Required Qualifications */}
                {qualifications.length > 0 && (
                  <div className="border-2 border-purple-400/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('qualifications')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-purple-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        <h4 className="font-bold text-base text-foreground">Required Qualifications</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.qualifications && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.qualifications && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-purple-500/5">
                            <div className="flex flex-wrap gap-2">
                              {qualifications.map((qual: string, i: number) => (
                                <Badge key={i} className="bg-purple-500/20 text-purple-100 border-purple-400/30 px-3 py-1">
                                  {qual}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Action Buttons - Touch optimized */}
              <div className="flex flex-wrap gap-2 pt-5 border-t-2 border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className={cn(
                    "text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors active:scale-95",
                    isMobile && "min-h-[48px] px-4"
                  )}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                {onMoveUp && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onMoveUp}
                    className={cn(
                      "hover:bg-accent transition-colors active:scale-95",
                      isMobile && "min-h-[48px] px-4"
                    )}
                  >
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Move Up
                  </Button>
                )}
                {onMoveDown && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onMoveDown}
                    className={cn(
                      "hover:bg-accent transition-colors active:scale-95",
                      isMobile && "min-h-[48px] px-4"
                    )}
                  >
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Move Down
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};