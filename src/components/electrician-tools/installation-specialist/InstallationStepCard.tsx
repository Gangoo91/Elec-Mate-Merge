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
      "relative overflow-hidden transition-all duration-300 border-2 animate-fade-in",
      isExpanded 
        ? "border-elec-yellow/60 shadow-2xl shadow-elec-yellow/20" 
        : "border-border/40 hover:border-elec-yellow/40 hover:shadow-lg"
    )}>
      
      <div className={cn("p-6", isMobile && "p-4")}>
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Step number */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "rounded-full flex items-center justify-center font-black transition-all duration-200",
              isMobile ? "w-14 h-14 text-xl" : "w-16 h-16 text-2xl",
              "bg-elec-yellow text-black shadow-lg"
            )}>
              {step.stepNumber}
            </div>
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
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      {step.estimatedDuration && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Duration: {step.estimatedDuration}</span>
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
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="shrink-0 hover:bg-accent"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Expand
                      </>
                    )}
                  </Button>
                </div>

                {/* Description */}
                <div className="text-base leading-relaxed text-foreground/90 bg-muted/30 p-4 rounded-lg border border-border/50">
                  <EnhancedStepContent content={step.content || (step as any).description || ''} />
                </div>

                {/* Expandable section */}
                {isExpanded && (
                  <div className="space-y-5 animate-fade-in">
                    {/* BS 7671 References */}
                    {bsReferences.length > 0 && (
                      <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="h-5 w-5 text-blue-400" />
                          <h4 className="font-bold text-base text-foreground">Regulatory References</h4>
                        </div>
                        <div className="bg-blue-500/20 rounded-md p-3 text-center">
                          <p className="text-sm text-blue-300 font-medium">
                            {bsReferences.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Safety Requirements */}
                    {step.safety && step.safety.length > 0 && (
                      <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          <h4 className="font-bold text-base text-foreground">Safety Requirements</h4>
                        </div>
                        <ul className="space-y-2">
                          {step.safety.map((note, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/30 p-3 rounded-md">
                              <ShieldAlert className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed text-left">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tools Required */}
                    <div className="bg-elec-yellow/10 border-2 border-elec-yellow/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="h-5 w-5 text-elec-yellow" />
                        <h4 className="font-bold text-base text-foreground">Tools Required ({toolsRequired.length})</h4>
                      </div>
                      
                      {toolsRequired.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {toolsRequired.map((tool: string, i: number) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm bg-background/40 p-3 rounded-md border border-border/40">
                              <Wrench className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                              <span className="text-foreground leading-relaxed">{tool}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-md">
                          <p className="text-sm text-red-400">No tools identified</p>
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

                    {/* Inspection Checkpoints */}
                    {inspectionCheckpoints.length > 0 && (
                      <div className="bg-success/10 border-2 border-success/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <h4 className="font-bold text-base text-foreground">Inspection Checkpoints</h4>
                        </div>
                        <ul className="space-y-2">
                          {inspectionCheckpoints.map((checkpoint: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/30 p-3 rounded-md">
                              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Materials Needed */}
                    {step.materialsNeeded && step.materialsNeeded.length > 0 && (
                      <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Wrench className="h-5 w-5 text-primary" />
                          <h4 className="font-bold text-base text-foreground">Materials Needed</h4>
                        </div>
                        <ul className="space-y-2">
                          {step.materialsNeeded.map((material, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 bg-background/30 p-3 rounded-md">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="leading-relaxed">{material}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-5 border-t-2 border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="hover:bg-accent"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Step
                  </Button>
                  {onMoveDown && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={onMoveDown}
                      className="hover:bg-accent"
                    >
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Move Down
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDelete}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
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
