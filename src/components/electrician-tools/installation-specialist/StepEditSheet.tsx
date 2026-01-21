import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Save, X, Trash2, Shield, Wrench, Clock, Plus, AlertTriangle,
  BookOpen, Package, GraduationCap, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { InstallationStep, SafetyNote } from '@/types/installation-method';
import { toast } from '@/hooks/use-toast';

interface StepEditSheetProps {
  step: InstallationStep;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: InstallationStep) => void;
  onDelete?: () => void;
}

export const StepEditSheet: React.FC<StepEditSheetProps> = ({
  step,
  open,
  onOpenChange,
  onSave,
  onDelete
}) => {
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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open) {
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
      setHasChanges(false);
    }
  }, [step, open]);

  const markChanged = () => setHasChanges(true);

  const handleSave = () => {
    onSave({
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
    toast({
      title: 'Step Updated',
      description: 'Installation step has been updated',
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this step?')) {
      onDelete();
      toast({
        title: 'Step Deleted',
        description: 'Installation step has been removed',
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

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
    markChanged();
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
    markChanged();
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
    markChanged();
  };

  const riskColors = {
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    high: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] overflow-y-auto">
        {/* Sticky Header */}
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b border-primary/10">
          <SheetTitle className="text-lg font-bold text-foreground flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-full font-bold bg-elec-yellow text-black">
              {step.stepNumber}
            </div>
            Edit Step
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4 pb-28">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Step Title</label>
            <Input
              value={editedTitle}
              onChange={(e) => { setEditedTitle(e.target.value); markChanged(); }}
              className="text-base min-h-[48px] touch-manipulation"
              placeholder="e.g., Install consumer unit"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Description</label>
            <Textarea
              value={editedDescription}
              onChange={(e) => { setEditedDescription(e.target.value); markChanged(); }}
              className="min-h-[120px] text-base touch-manipulation"
              placeholder="Detailed description of this step..."
            />
          </div>

          {/* Duration & Risk Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Duration
              </label>
              <Input
                value={editedDuration}
                onChange={(e) => { setEditedDuration(e.target.value); markChanged(); }}
                placeholder="e.g., 2-3 hours"
                className="min-h-[48px] touch-manipulation"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                Risk Level
              </label>
              <select
                value={editedRiskLevel}
                onChange={(e) => { setEditedRiskLevel(e.target.value as 'low' | 'medium' | 'high'); markChanged(); }}
                className="w-full min-h-[48px] px-3 rounded-lg border border-primary/30 bg-background text-base font-medium touch-manipulation"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          {/* Linked Hazards */}
          <div className="space-y-3 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Identified Hazards
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedHazards)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedHazards.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedHazards, idx, e.target.value)}
                    placeholder="e.g., Electric shock from exposed terminals"
                    className="flex-1 min-h-[48px] touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedHazards, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Requirements */}
          <div className="space-y-3 bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-red-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safety Requirements
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedSafety)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedSafety.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedSafety, idx, e.target.value)}
                    placeholder="Safety requirement (Reg XXX.XX.XXX)"
                    className="flex-1 min-h-[48px] touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedSafety, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* BS 7671 References */}
          <div className="space-y-3 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Regulatory References
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedReferences)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedReferences.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedReferences, idx, e.target.value)}
                    placeholder="BS 7671 reference"
                    className="flex-1 min-h-[48px] font-mono text-sm touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedReferences, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Required */}
          <div className="space-y-3 bg-elec-yellow/10 border-2 border-elec-yellow/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-elec-yellow flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Tools Required
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedTools)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedTools.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedTools, idx, e.target.value)}
                    placeholder="Tool name"
                    className="flex-1 min-h-[48px] touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedTools, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Materials Needed */}
          <div className="space-y-3 bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-green-400 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Materials Needed
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedMaterials)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedMaterials.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedMaterials, idx, e.target.value)}
                    placeholder="Material name"
                    className="flex-1 min-h-[48px] touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedMaterials, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection Checkpoints */}
          <div className="space-y-3 bg-purple-500/10 border-2 border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-purple-400 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Inspection Checkpoints
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedCheckpoints)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedCheckpoints.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedCheckpoints, idx, e.target.value)}
                    placeholder="Inspection checkpoint"
                    className="flex-1 min-h-[48px] touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedCheckpoints, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Requirements */}
          <div className="space-y-3 bg-orange-500/10 border-2 border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Competency Requirements
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addItem(setEditedQualifications)}
                className="h-11 w-11 p-0 touch-manipulation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {editedQualifications.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(setEditedQualifications, idx, e.target.value)}
                    placeholder="Qualification required"
                    className="flex-1 min-h-[48px] touch-manipulation"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(setEditedQualifications, idx)}
                    className="h-11 w-11 p-0 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-primary/20 p-4 flex gap-2 z-20">
          {onDelete && (
            <Button
              variant="outline"
              className="flex-1 min-h-[48px] border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-400 touch-manipulation active:scale-[0.98]"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Delete
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1 min-h-[48px] touch-manipulation active:scale-[0.98]"
            onClick={handleClose}
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </Button>
          <Button
            className="flex-1 min-h-[48px] bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-[0.98]"
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
