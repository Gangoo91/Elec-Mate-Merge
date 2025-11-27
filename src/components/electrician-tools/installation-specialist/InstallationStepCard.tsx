import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, X, Plus, Trash2, ChevronUp, ChevronDown, AlertTriangle, Clock, Wrench, CheckCircle2, ShieldAlert, BookOpen, Package, GraduationCap } from "lucide-react";
import { InstallationStep, SafetyNote } from "@/types/installation-method";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(step.title);
  const [editedDescription, setEditedDescription] = useState(step.content || '');
  const [editedSafety, setEditedSafety] = useState<string[]>(
    (step.safety || []).map(s => typeof s === 'string' ? s : s.note)
  );
  const [editedTools, setEditedTools] = useState<string[]>(step.toolsRequired || []);
  const [editedMaterials, setEditedMaterials] = useState<string[]>(step.materialsNeeded || []);
  const [editedCheckpoints, setEditedCheckpoints] = useState<string[]>((step as any).inspectionCheckpoints || []);
  const [editedQualifications, setEditedQualifications] = useState<string[]>(step.qualifications || []);
  const [editedReferences, setEditedReferences] = useState<string[]>((step as any).bsReferences || []);
  const [editedHazards, setEditedHazards] = useState<string[]>((step as any).linkedHazards || []);
  const [editedDuration, setEditedDuration] = useState(step.estimatedDuration || '');
  const [editedRiskLevel, setEditedRiskLevel] = useState<'low' | 'medium' | 'high'>(step.riskLevel || 'low');
  const { isMobile } = useMobileEnhanced();

  const [sectionsExpanded, setSectionsExpanded] = useState({
    safety: !isMobile,
    tools: !isMobile,
    materials: !isMobile,
    checkpoints: !isMobile,
    qualifications: !isMobile,
    references: !isMobile,
    hazards: !isMobile
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
    setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper to parse regulation from safety note
  const parseRegulationFromSafety = (safetyItem: string | SafetyNote): { text: string; regulation?: string } => {
    if (typeof safetyItem === 'object') {
      return { text: safetyItem.note, regulation: safetyItem.regulation };
    }
    
    // Extract regulation pattern like "(Reg 521.10.202)" or "(BS 7671 Section 521)"
    const match = safetyItem.match(/\((?:Reg\s*|BS\s*7671\s*(?:Section)?\s*)(\d+(?:\.\d+)*)\)/i);
    if (match) {
      return {
        text: safetyItem.replace(match[0], '').trim(),
        regulation: match[1]
      };
    }
    
    return { text: safetyItem };
  };

  const handleSave = () => {
    onUpdate({ 
      ...step, 
      title: editedTitle, 
      content: editedDescription,
      safety: editedSafety.filter(s => s.trim()),
      toolsRequired: editedTools.filter(t => t.trim()),
      materialsNeeded: editedMaterials.filter(m => m.trim()),
      inspectionCheckpoints: editedCheckpoints.filter(c => c.trim()),
      qualifications: editedQualifications.filter(q => q.trim()),
      bsReferences: editedReferences.filter(r => r.trim()),
      linkedHazards: editedHazards.filter(h => h.trim()),
      estimatedDuration: editedDuration,
      riskLevel: editedRiskLevel
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(step.title);
    setEditedDescription(step.content || '');
    setEditedSafety((step.safety || []).map(s => typeof s === 'string' ? s : s.note));
    setEditedTools(step.toolsRequired || []);
    setEditedMaterials(step.materialsNeeded || []);
    setEditedCheckpoints((step as any).inspectionCheckpoints || []);
    setEditedQualifications(step.qualifications || []);
    setEditedReferences((step as any).bsReferences || []);
    setEditedHazards((step as any).linkedHazards || []);
    setEditedDuration(step.estimatedDuration || '');
    setEditedRiskLevel(step.riskLevel || 'low');
    setIsEditing(false);
  };

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const riskColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const linkedHazards = (step as any).linkedHazards || [];
  const qualifications = step.qualifications || [];
  const inspectionCheckpoints = (step as any).inspectionCheckpoints || [];
  const toolsRequired = step.toolsRequired || [];
  const bsReferences = (step as any).bsReferences || [];

  return (
    <Card id={`step-${step.stepNumber - 1}`} className={cn(
      "relative overflow-hidden transition-all duration-300 border-2 animate-fade-in hover:shadow-lg",
      "border-border/40 hover:border-elec-yellow/40"
    )}>
      
      <div className={cn("p-6", isMobile && "p-4")}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
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
              {/* Title */}
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Step title"
                  className={cn("font-semibold text-lg", isMobile && "text-base min-h-[48px]")}
                  autoFocus
                />
              ) : (
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight text-left">
                  {step.title}
                </h3>
              )}

              {/* Metadata badges */}
              <div className="flex flex-wrap gap-2 items-center">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={editedDuration}
                        onChange={(e) => setEditedDuration(e.target.value)}
                        placeholder="e.g., 2-3 hours"
                        className={cn("flex-1", isMobile && "min-h-[48px]")}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <select
                        value={editedRiskLevel}
                        onChange={(e) => setEditedRiskLevel(e.target.value as 'low' | 'medium' | 'high')}
                        className={cn(
                          "px-3 rounded-xl border border-primary/30 bg-elec-grey text-base font-medium",
                          isMobile ? "h-12" : "h-10"
                        )}
                      >
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {/* Description */}
              {isEditing ? (
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Step description"
                  className={cn("min-h-[120px]", isMobile && "min-h-[160px] text-base")}
                />
              ) : (
                <div className="text-base leading-relaxed text-foreground/90 bg-muted/30 p-4 rounded-lg border border-border/50">
                  <EnhancedStepContent content={step.content || (step as any).description || ''} />
                </div>
              )}

              {/* Save/Cancel buttons in edit mode */}
              {isEditing && (
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={handleSave}
                    className={cn("bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90", isMobile && "min-h-[48px]")}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCancel}
                    className={cn(isMobile && "min-h-[48px]")}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}

              {/* Collapsible Sections with Framer Motion */}
              <div className="space-y-3">
                {/* Linked Hazards */}
                {(linkedHazards.length > 0 || isEditing) && (
                  <div className="border-2 border-amber-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('hazards')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-amber-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-amber-400" />
                        <h4 className="font-bold text-base text-foreground">Identified Hazards</h4>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        sectionsExpanded.hazards && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {sectionsExpanded.hazards && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-amber-500/5">
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedHazards.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedHazards, idx, e.target.value)}
                                      placeholder="Specific hazard (e.g., Electric shock from exposed terminals)"
                                      className={cn("flex-1", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedHazards, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedHazards)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Hazard
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {linkedHazards.map((hazard: string, idx: number) => (
                                  <Badge key={idx} className="bg-amber-500/20 text-amber-200 border-amber-500/40 font-medium">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {hazard}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* BS 7671 References */}
                {(bsReferences.length > 0 || isEditing) && (
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
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedReferences.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedReferences, idx, e.target.value)}
                                      placeholder="BS 7671 reference"
                                      className={cn("flex-1 font-mono text-xs", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedReferences, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedReferences)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Reference
                                </Button>
                              </div>
                            ) : (
                              <div className="bg-blue-500/20 rounded-md p-3 text-center">
                                <p className="text-sm text-blue-300 font-medium">
                                  {bsReferences.join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Safety Requirements with BS Regulation Badges */}
                {((step.safety && step.safety.length > 0) || isEditing) && (
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
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedSafety.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedSafety, idx, e.target.value)}
                                      placeholder="Safety requirement (Reg XXX.XX.XXX)"
                                      className={cn("flex-1", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedSafety, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedSafety)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Safety Note
                                </Button>
                              </div>
                            ) : (
                              <ul className="space-y-0 divide-y divide-border/20">
                                {(step.safety || []).map((note, i) => {
                                  const parsed = parseRegulationFromSafety(note);
                                  return (
                                    <li key={i} className="flex items-start gap-3 text-sm py-3 first:pt-0 last:pb-0">
                                      <ShieldAlert className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                                      <div className="flex-1">
                                        <span className="text-foreground/90 leading-relaxed text-left">{parsed.text}</span>
                                        {parsed.regulation && (
                                          <Badge className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs font-mono">
                                            Reg {parsed.regulation}
                                          </Badge>
                                        )}
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Tools Required */}
                {(toolsRequired.length > 0 || isEditing) && (
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
                        <h4 className="font-bold text-base text-foreground">Tools Required</h4>
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
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedTools.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedTools, idx, e.target.value)}
                                      placeholder="Tool name"
                                      className={cn("flex-1", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedTools, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedTools)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Tool
                                </Button>
                              </div>
                            ) : (
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                {toolsRequired.map((tool, i) => (
                                  <li key={i} className="flex items-center gap-2 text-foreground/90">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0" />
                                    <span className="text-left">{tool}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Materials Needed */}
                {((step.materialsNeeded && step.materialsNeeded.length > 0) || isEditing) && (
                  <div className="border-2 border-green-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('materials')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-green-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-green-400" />
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
                          <div className="p-4 bg-green-500/5">
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedMaterials.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedMaterials, idx, e.target.value)}
                                      placeholder="Material name"
                                      className={cn("flex-1", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedMaterials, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedMaterials)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Material
                                </Button>
                              </div>
                            ) : (
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                {step.materialsNeeded.map((material, i) => (
                                  <li key={i} className="flex items-center gap-2 text-foreground/90">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                                    <span className="text-left">{material}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Inspection Checkpoints */}
                {(inspectionCheckpoints.length > 0 || isEditing) && (
                  <div className="border-2 border-purple-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('checkpoints')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-purple-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-400" />
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
                          <div className="p-4 bg-purple-500/5">
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedCheckpoints.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedCheckpoints, idx, e.target.value)}
                                      placeholder="Inspection checkpoint"
                                      className={cn("flex-1", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedCheckpoints, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedCheckpoints)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Checkpoint
                                </Button>
                              </div>
                            ) : (
                              <ul className="space-y-0 divide-y divide-border/20">
                                {inspectionCheckpoints.map((checkpoint, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm py-3 first:pt-0 last:pb-0">
                                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-foreground/90 leading-relaxed text-left">{checkpoint}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Competency Requirements */}
                {(qualifications.length > 0 || isEditing) && (
                  <div className="border-2 border-amber-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection('qualifications')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 bg-amber-500/10 transition-colors",
                        isMobile && "min-h-[56px]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-amber-400" />
                        <h4 className="font-bold text-base text-foreground">Competency Requirements</h4>
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
                          <div className="p-4 bg-amber-500/5">
                            {isEditing ? (
                              <div className="space-y-2">
                                {editedQualifications.map((item, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <Input
                                      value={item}
                                      onChange={(e) => updateItem(setEditedQualifications, idx, e.target.value)}
                                      placeholder="Qualification required"
                                      className={cn("flex-1", isMobile && "min-h-[48px]")}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(setEditedQualifications, idx)}
                                      className={cn("h-auto", isMobile && "min-h-[48px]")}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addItem(setEditedQualifications)}
                                  className={cn("w-full", isMobile && "min-h-[48px]")}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Qualification
                                </Button>
                              </div>
                            ) : (
                              <ul className="grid grid-cols-1 gap-2 text-sm">
                                {qualifications.map((qual, i) => (
                                  <li key={i} className="flex items-center gap-2 text-foreground/90">
                                    <GraduationCap className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                                    <span className="text-left">{qual}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
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

        {/* Action buttons - Bottom anchored on mobile */}
        <div className={cn(
          "flex justify-end gap-2 mt-6 pt-6 border-t",
          isMobile && "flex-col"
        )}>
          {!isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className={cn(
                  "gap-2",
                  isMobile && "min-h-[48px] w-full"
                )}
              >
                <Edit2 className="h-4 w-4" />
                Edit Step
              </Button>
              {onMoveUp && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMoveUp}
                  className={cn(
                    "gap-2",
                    isMobile && "min-h-[48px] w-full"
                  )}
                >
                  <ChevronUp className="h-4 w-4" />
                  Move Up
                </Button>
              )}
              {onMoveDown && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMoveDown}
                  className={cn(
                    "gap-2",
                    isMobile && "min-h-[48px] w-full"
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                  Move Down
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className={cn(
                  "text-destructive hover:text-destructive gap-2",
                  isMobile && "min-h-[48px] w-full"
                )}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

