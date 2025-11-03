import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, X, Trash2, ChevronUp, ChevronDown, AlertTriangle, Clock, Wrench, CheckCircle2, ShieldAlert } from "lucide-react";
import { InstallationStep } from "@/types/installation-method";
import { cn } from "@/lib/utils";

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
  const linkedHazards = (step as any).linkedHazards || [];
  const inspectionCheckpoints = (step as any).inspectionCheckpoints || [];
  const toolsRequired = (step as any).toolsRequired || [];

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all",
      isExpanded && "ring-2 ring-primary/20"
    )}>
      {/* Timeline connector (vertical line) */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-transparent" />
      
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Step number with timeline dot */}
          <div className="relative flex-shrink-0">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all",
              isExpanded 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "bg-primary/20 text-primary"
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
              <div className="space-y-3">
                {/* Header with title and quick info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">{step.title}</h3>
                    
                    {/* Quick info badges */}
                    <div className="flex flex-wrap gap-2">
                      {step.estimatedDuration && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.estimatedDuration}
                        </Badge>
                      )}
                      {step.riskLevel && (
                        <Badge className={cn("text-xs font-semibold", riskColors[step.riskLevel])}>
                          {step.riskLevel.toUpperCase()}
                        </Badge>
                      )}
                      {linkedHazards.length > 0 && (
                        <Badge variant="outline" className="text-xs bg-destructive/5 border-destructive/40">
                          <ShieldAlert className="h-3 w-3 mr-1" />
                          {linkedHazards.length} hazards
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Expand/Collapse button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="shrink-0"
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </Button>
                </div>

                {/* Always visible: Description */}
                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {step.content}
                </div>

                {/* Expandable section */}
                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-border animate-fade-in">
                    {/* Linked Hazards */}
                    {linkedHazards.length > 0 && (
                      <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <ShieldAlert className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="font-semibold text-sm text-foreground">Linked Hazards ({linkedHazards.length})</div>
                        </div>
                        <ul className="space-y-1.5 text-sm">
                          {linkedHazards.map((hazard: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-destructive mt-0.5">•</span>
                              <span className="text-foreground">{hazard}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Safety Requirements */}
                    {step.safety && step.safety.length > 0 && (
                      <div className="p-3 bg-warning/5 border border-warning/30 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                          <div className="font-semibold text-sm text-foreground">Safety Requirements</div>
                        </div>
                        <ul className="space-y-1.5 text-sm">
                          {step.safety.map((note, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-warning mt-0.5">•</span>
                              <span className="text-foreground">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tools Required */}
                    {toolsRequired.length > 0 && (
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <Wrench className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <div className="font-semibold text-sm text-foreground">Tools Required ({toolsRequired.length})</div>
                        </div>
                        <ul className="grid grid-cols-2 gap-1.5 text-sm">
                          {toolsRequired.map((tool: string, i: number) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="text-foreground">{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Inspection Checkpoints */}
                    {inspectionCheckpoints.length > 0 && (
                      <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <div className="font-semibold text-sm text-foreground">Inspection Checkpoints</div>
                        </div>
                        <ul className="space-y-1.5 text-sm">
                          {inspectionCheckpoints.map((checkpoint: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-success mt-0.5">•</span>
                              <span className="text-foreground">{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap pt-2">
                  {onMoveUp && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onMoveUp}
                      className="h-9 px-3 gap-1.5 touch-manipulation"
                    >
                      <ChevronUp className="h-4 w-4" />
                      <span className="text-xs">Up</span>
                    </Button>
                  )}
                  {onMoveDown && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onMoveDown}
                      className="h-9 px-3 gap-1.5 touch-manipulation"
                    >
                      <ChevronDown className="h-4 w-4" />
                      <span className="text-xs">Down</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-9 px-3 gap-1.5 touch-manipulation"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="text-xs">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDelete}
                    className="h-9 px-3 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-xs">Delete</span>
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
