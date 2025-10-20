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
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base">{step.title}</h3>
                <div className="flex gap-1 flex-shrink-0">
                  {onMoveUp && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMoveUp}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  )}
                  {onMoveDown && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMoveDown}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDelete}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                {step.content}
              </div>

              {step.riskLevel && (
                <Badge className={riskColors[step.riskLevel]}>
                  {step.riskLevel.toUpperCase()} RISK
                </Badge>
              )}

              {step.safety && step.safety.length > 0 && (
                <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-warning mb-1">Safety Notes</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {step.safety.map((note, i) => (
                          <li key={i}>• {note}</li>
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
