import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, X, Trash2, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";
import { InstallationStep } from "@/types/installation-method";

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

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          {step.stepNumber}
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
              {/* Title - Full Width */}
              <h3 className="font-semibold text-lg text-foreground pr-2">{step.title}</h3>
              
              {/* Action Buttons Row */}
              <div className="flex gap-2 flex-wrap">
                {onMoveUp && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onMoveUp}
                    className="h-9 px-3 gap-1.5 touch-manipulation"
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span className="text-xs">Move Up</span>
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
                    <span className="text-xs">Move Down</span>
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

              {/* Content */}
              <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {step.content}
              </div>

              {/* Risk Badge */}
              {step.riskLevel && (
                <Badge className={`${riskColors[step.riskLevel]} font-semibold`}>
                  {step.riskLevel.toUpperCase()} RISK
                </Badge>
              )}

              {/* Safety Notes */}
              {step.safety && step.safety.length > 0 && (
                <div className="mt-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground mb-2">Safety Notes</div>
                      <ul className="text-sm text-foreground space-y-1.5 pl-1">
                        {step.safety.map((note, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-warning mt-0.5">•</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
