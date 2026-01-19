import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, X, Trash2, Shield, Wrench, Award, Clock, Plus, AlertTriangle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColorsByLevel } from '@/utils/risk-level-helpers';
import type { MethodStep } from '@/types/method-statement';
import { toast } from '@/hooks/use-toast';

interface StepEditSheetProps {
  step: MethodStep;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (stepId: string, updates: Partial<MethodStep>) => void;
  onDelete?: (stepId: string) => void;
}

export const StepEditSheet: React.FC<StepEditSheetProps> = ({
  step,
  open,
  onOpenChange,
  onSave,
  onDelete
}) => {
  const [editedStep, setEditedStep] = useState<MethodStep>(step);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedStep(step);
    setHasChanges(false);
  }, [step, open]);

  const handleChange = (updates: Partial<MethodStep>) => {
    setEditedStep(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(step.id, editedStep);
    toast({
      title: 'Step Updated',
      description: 'Method statement step has been updated',
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this step?')) {
      onDelete(step.id);
      toast({
        title: 'Step Deleted',
        description: 'Method statement step has been removed',
      });
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    if (hasChanges && !confirm('You have unsaved changes. Are you sure you want to close?')) {
      return;
    }
    onOpenChange(false);
  };

  const addArrayItem = (field: keyof MethodStep, prompt: string) => {
    const value = window.prompt(prompt);
    if (value) {
      const currentArray = (editedStep[field] as string[]) || [];
      handleChange({ [field]: [...currentArray, value] } as Partial<MethodStep>);
    }
  };

  const removeArrayItem = (field: keyof MethodStep, index: number) => {
    const currentArray = (editedStep[field] as string[]) || [];
    handleChange({ [field]: currentArray.filter((_, i) => i !== index) } as Partial<MethodStep>);
  };

  const riskColors = getRiskColorsByLevel(editedStep.riskLevel || 'low');

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b border-primary/10">
          <SheetTitle className="text-lg font-bold text-elec-light flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full font-bold",
              riskColors.bg,
              riskColors.text
            )}>
              {step.stepNumber}
            </div>
            Edit Step
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4 pb-24">
          {/* Step Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light">
              Step Title
            </label>
            <Input
              value={editedStep.title}
              onChange={(e) => handleChange({ title: e.target.value })}
              className="text-base min-h-[48px]"
              placeholder="e.g., Install consumer unit"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light">
              Description
            </label>
            <Textarea
              value={editedStep.description}
              onChange={(e) => handleChange({ description: e.target.value })}
              className="min-h-[120px] text-base"
              placeholder="Detailed description of this step..."
            />
          </div>

          {/* Safety Requirements */}
          <div className="space-y-3 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safety Requirements
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem('safetyRequirements', 'Enter safety requirement:')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedStep.safetyRequirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-background/50 rounded p-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span className="flex-1 text-sm text-elec-light/90">{req}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('safetyRequirements', idx)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Needed */}
          <div className="space-y-3 bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Equipment Needed
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem('equipmentNeeded', 'Enter equipment name:')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedStep.equipmentNeeded.map((equip, idx) => (
                <Badge key={idx} className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-sm py-1">
                  {equip}
                  <button
                    onClick={() => removeArrayItem('equipmentNeeded', idx)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-3 bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Qualifications Required
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem('qualifications', 'Enter qualification:')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedStep.qualifications.map((qual, idx) => (
                <Badge key={idx} className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-sm py-1">
                  ✓ {qual}
                  <button
                    onClick={() => removeArrayItem('qualifications', idx)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Assigned Personnel */}
          <div className="space-y-3 bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Assigned Personnel
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addArrayItem('assignedPersonnel', 'Enter team member name:')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(editedStep.assignedPersonnel || []).map((person, idx) => (
                <Badge key={idx} className="bg-green-500/10 text-green-400 border-green-500/30 text-sm py-1">
                  👤 {person}
                  <button
                    onClick={() => removeArrayItem('assignedPersonnel', idx)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Duration & Risk Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-green-400 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration
              </label>
              <Select
                value={editedStep.estimatedDuration}
                onValueChange={(value) => handleChange({ estimatedDuration: value })}
              >
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 minutes">15 minutes</SelectItem>
                  <SelectItem value="30 minutes">30 minutes</SelectItem>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                  <SelectItem value="4 hours">4 hours</SelectItem>
                  <SelectItem value="1 day">1 day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Risk Level
              </label>
              <Select
                value={editedStep.riskLevel}
                onValueChange={(value: 'low' | 'medium' | 'high') => handleChange({ riskLevel: value })}
              >
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">LOW</SelectItem>
                  <SelectItem value="medium">MEDIUM</SelectItem>
                  <SelectItem value="high">HIGH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-primary/20 p-4 flex gap-2 z-20">
          {onDelete && (
            <Button
              variant="outline"
              className="flex-1 min-h-[48px] border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-400"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Delete
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1 min-h-[48px]"
            onClick={handleClose}
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </Button>
          <Button
            className="flex-1 min-h-[48px] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-card"
            onClick={handleSave}
          >
            <Save className="h-5 w-5 mr-2" />
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
