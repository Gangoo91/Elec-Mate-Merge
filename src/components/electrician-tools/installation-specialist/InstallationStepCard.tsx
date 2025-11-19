import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, X, Trash2, ChevronUp, ChevronDown, AlertTriangle, AlertCircle, Clock, Wrench, CheckCircle2, ShieldAlert, BookOpen } from "lucide-react";
import { InstallationStep } from "@/types/installation-method";
import { cn } from "@/lib/utils";
import { EnhancedStepContent } from "./EnhancedStepContent";
import { MobileStepHeader } from "./MobileStepHeader";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";


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
  const [editedStep, setEditedStep] = useState(step);
  const { isMobile } = useMobileEnhanced();

  const handleSave = () => {
    onUpdate(editedStep);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStep(step);
    setIsEditing(false);
  };

  const riskColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const linkedHazards = step.linkedHazards || [];
  const qualifications = step.qualifications || [];
  const inspectionCheckpoints = (step as any).inspectionCheckpoints || [];
  const toolsRequired = step.toolsRequired || [];
  const bsReferences = (step as any).bsReferences || [];

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5 animate-fade-in",
      isExpanded && "ring-2 ring-primary/30 shadow-2xl shadow-primary/20"
    )}>
      {/* Timeline connector (vertical line with gradient) */}
      <div className="absolute left-6 top-12 bottom-0 w-1 bg-gradient-to-b from-elec-yellow via-primary/60 to-transparent rounded-full" />
      
      <div className={cn("p-4", isMobile ? "sm:p-5" : "sm:p-6 lg:p-8")}>
        <div className="flex items-start gap-4">
          {/* Step number with timeline dot and pulse effect */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full flex items-center justify-center font-black transition-all duration-300 touch-manipulation",
              isMobile ? "w-12 h-12 text-xl" : "w-14 h-14 text-2xl lg:w-16 lg:h-16 lg:text-3xl",
              isExpanded 
                ? "bg-gradient-to-br from-elec-yellow to-primary text-black shadow-2xl shadow-elec-yellow/40 scale-110" 
                : "bg-gradient-to-br from-primary/30 to-primary/10 text-primary shadow-md hover:scale-105 active:scale-95"
            )}>
              {step.stepNumber}
            </div>
            {/* Animated pulse ring on active */}
            {isExpanded && (
              <div className="absolute inset-0 rounded-full bg-elec-yellow/20 animate-ping" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              // EDIT MODE
              <div className="space-y-3">
                <Input
                  value={editedStep.title}
                  onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
                  placeholder="Step title"
                  className="font-semibold"
                />
                <Textarea
                  value={editedStep.content}
                  onChange={(e) => setEditedStep({ ...editedStep, content: e.target.value })}
                  placeholder="Step description"
                  className="min-h-[100px]"
                />
                
                {/* Safety Notes in Edit Mode */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Safety Notes (one per line)</label>
                  <Textarea
                    value={editedStep.safety?.join('\n') || ''}
                    onChange={(e) => setEditedStep({ 
                      ...editedStep, 
                      safety: e.target.value.split('\n').filter(s => s.trim()) 
                    })}
                    placeholder="Enter safety requirements, one per line"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <div className="space-y-4">
                {/* Header with title and quick info */}
                <div className="flex items-start justify-between gap-3">
                  {/* Mobile-optimised header */}
                  <MobileStepHeader
                    title={step.title}
                    estimatedDuration={step.estimatedDuration}
                    riskLevel={step.riskLevel}
                    hazardCount={linkedHazards.length}
                  />
                  
                  {/* Expand/Collapse button with improved touch target */}
                  <Button
                    variant="ghost"
                    size={isMobile ? "default" : "sm"}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                      "shrink-0 gap-1.5 font-semibold hover:bg-primary/10 hover:text-primary transition-all touch-manipulation active:scale-95",
                      isMobile ? "min-h-[44px] min-w-[44px] px-3" : "min-h-[36px]"
                    )}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className={cn(isMobile ? "h-5 w-5" : "h-4 w-4", "transition-transform")} />
                        {!isMobile && "Collapse"}
                      </>
                    ) : (
                      <>
                        <ChevronDown className={cn(isMobile ? "h-5 w-5" : "h-4 w-4", "transition-transform")} />
                        {!isMobile && "Expand"}
                      </>
                    )}
                  </Button>
                </div>

                {/* Always visible: Description with improved readability */}
                <div className={cn(
                  "prose prose-sm max-w-none",
                  isMobile && "text-[15px] leading-relaxed"
                )}>
                  <EnhancedStepContent content={step.content || (step as any).description || ''} />
                </div>

                {/* Expandable section with slide-down animation */}
                {isExpanded && (
                  <div className="space-y-4 pt-4 border-t border-border/50 animate-fade-in">
                    {/* Linked Hazards with gradient background */}
                    {linkedHazards.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-destructive/30 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-2.5 mb-3">
                          <div className="p-1.5 bg-destructive/20 rounded-lg">
                            <ShieldAlert className="h-5 w-5 text-destructive" />
                          </div>
                          <div className="font-bold text-base text-foreground">Linked Hazards ({linkedHazards.length})</div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {linkedHazards.map((hazard: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5 p-2 bg-background/50 rounded-lg">
                              <span className="text-destructive font-bold mt-0.5">⚠</span>
                              <span className="text-foreground leading-relaxed">{hazard}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Safety Requirements with shield gradient */}
                    {step.safety && step.safety.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-warning/40 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-2.5 mb-3">
                          <div className="p-1.5 bg-warning/20 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-warning" />
                          </div>
                          <div className="font-bold text-base text-foreground">Safety Requirements</div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {step.safety.map((note, i) => (
                            <li key={i} className="flex items-start gap-2.5 p-2 bg-background/50 rounded-lg">
                              <span className="text-warning font-bold mt-0.5">🛡️</span>
                              <span className="text-foreground leading-relaxed">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tools Required - Always show section with warnings for empty */}
                    <div className="p-4 bg-gradient-to-br from-elec-yellow/10 to-blue-500/5 border border-primary/30 rounded-xl shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-2.5 mb-3">
                        <div className="p-1.5 bg-elec-yellow/20 rounded-lg">
                          <Wrench className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div className="font-bold text-base text-foreground">Tools Required ({toolsRequired.length})</div>
                      </div>
                      
                      {toolsRequired.length > 0 ? (
                        <ul className="grid grid-cols-2 gap-2 text-sm">
                          {toolsRequired.map((tool: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 p-2 bg-background/50 rounded-lg">
                              <span className="text-elec-yellow font-bold mt-0.5">🔧</span>
                              <span className="text-foreground leading-relaxed">{tool}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-red-400">
                                ⚠️ No Tools Identified - AI Generation Issue
                              </p>
                              <p className="text-xs text-red-300 mt-1">
                                This step appears to be missing tool requirements. This may indicate insufficient RAG context or AI extraction failure.
                                {(step.title.toLowerCase().includes('isolation') || 
                                  step.title.toLowerCase().includes('verify dead') ||
                                  step.title.toLowerCase().includes('test')) && (
                                  <span className="block mt-1 font-semibold">
                                    🚨 This is a SAFETY-CRITICAL step and must include specific tools (e.g., voltage indicators, proving units, lock-off kits).
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Required Qualifications */}
                    {qualifications.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-400/30 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-2.5 mb-3">
                          <div className="p-1.5 bg-purple-500/20 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-purple-400" />
                          </div>
                          <div className="font-bold text-base text-foreground">Required Qualifications</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {qualifications.map((qual: string, i: number) => (
                            <Badge key={i} className="bg-purple-500/20 text-purple-100 border-purple-400/30 px-3 py-1">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inspection Checkpoints with success gradient */}
                    {inspectionCheckpoints.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-success/30 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-2.5 mb-3">
                          <div className="p-1.5 bg-success/20 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          </div>
                          <div className="font-bold text-base text-foreground">Inspection Checkpoints</div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {inspectionCheckpoints.map((checkpoint: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5 p-2 bg-background/50 rounded-lg">
                              <span className="text-success font-bold mt-0.5">✓</span>
                              <span className="text-foreground leading-relaxed">{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* BS 7671 References - NEW */}
                    {bsReferences.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-2.5 mb-3">
                          <div className="p-1.5 bg-blue-500/20 rounded-lg">
                            <BookOpen className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="font-bold text-base text-foreground">BS 7671 Regulations</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {bsReferences.map((ref: string, i: number) => (
                            <Badge 
                              key={i} 
                              variant="outline"
                              className="bg-blue-500/10 border-blue-500/30 text-blue-400 font-mono text-xs px-3 py-1"
                            >
                              {ref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className={cn(
                  "flex flex-wrap gap-2 pt-4 border-t border-border/50",
                  isMobile && "pt-5"
                )}>
                  <Button
                    variant="ghost"
                    size={isMobile ? "default" : "sm"}
                    onClick={() => setIsEditing(true)}
                    className={cn(
                      "hover:bg-primary/10 hover:text-primary font-medium touch-manipulation active:scale-95",
                      isMobile ? "min-h-[44px] flex-1" : "min-h-[40px]"
                    )}
                  >
                    <Edit2 className={cn(isMobile ? "h-5 w-5 mr-2" : "h-4 w-4 mr-2")} />
                    Edit Step
                  </Button>
                  {onMoveUp && (
                    <Button 
                      variant="ghost" 
                      size={isMobile ? "default" : "sm"}
                      onClick={onMoveUp}
                      className={cn(
                        "hover:bg-primary/10 hover:text-primary touch-manipulation active:scale-95",
                        isMobile ? "min-h-[44px] flex-1" : "min-h-[40px]"
                      )}
                    >
                      ↑ Move Up
                    </Button>
                  )}
                  {onMoveDown && (
                    <Button 
                      variant="ghost" 
                      size={isMobile ? "default" : "sm"}
                      onClick={onMoveDown}
                      className={cn(
                        "hover:bg-primary/10 hover:text-primary touch-manipulation active:scale-95",
                        isMobile ? "min-h-[44px] flex-1" : "min-h-[40px]"
                      )}
                    >
                      ↓ Move Down
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size={isMobile ? "default" : "sm"}
                    onClick={onDelete}
                    className={cn(
                      "text-destructive hover:bg-destructive/10 hover:text-destructive touch-manipulation active:scale-95",
                      isMobile ? "min-h-[44px] w-full mt-2" : "min-h-[40px] ml-auto"
                    )}
                  >
                    <Trash2 className={cn(isMobile ? "h-5 w-5 mr-2" : "h-4 w-4 mr-2")} />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
