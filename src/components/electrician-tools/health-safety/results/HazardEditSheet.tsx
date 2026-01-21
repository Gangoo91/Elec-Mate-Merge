import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Save, X, Trash2, Shield, AlertTriangle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColors } from '@/utils/risk-level-helpers';
import { toast } from '@/hooks/use-toast';

interface HazardEditSheetProps {
  hazard: any;
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete?: (index: number) => void;
}

export const HazardEditSheet: React.FC<HazardEditSheetProps> = ({
  hazard,
  index,
  open,
  onOpenChange,
  onUpdate,
  onDelete
}) => {
  const [editedHazard, setEditedHazard] = useState(hazard.hazard || '');
  const [editedControlMeasure, setEditedControlMeasure] = useState(hazard.controlMeasure || '');
  const [editedLikelihood, setEditedLikelihood] = useState(hazard.likelihood || 1);
  const [editedSeverity, setEditedSeverity] = useState(hazard.severity || 1);
  const [editedRegulation, setEditedRegulation] = useState(hazard.regulation || '');
  const [hasChanges, setHasChanges] = useState(false);

  const riskScore = editedLikelihood * editedSeverity;
  const riskColors = getRiskColors(riskScore);

  useEffect(() => {
    if (open) {
      setEditedHazard(hazard.hazard || '');
      setEditedControlMeasure(hazard.controlMeasure || '');
      setEditedLikelihood(hazard.likelihood || 1);
      setEditedSeverity(hazard.severity || 1);
      setEditedRegulation(hazard.regulation || '');
      setHasChanges(false);
    }
  }, [hazard, open]);

  const markChanged = () => setHasChanges(true);

  const handleSave = () => {
    onUpdate(index, 'hazard', editedHazard);
    onUpdate(index, 'controlMeasure', editedControlMeasure);
    onUpdate(index, 'likelihood', editedLikelihood);
    onUpdate(index, 'severity', editedSeverity);
    onUpdate(index, 'regulation', editedRegulation);
    onUpdate(index, 'riskScore', riskScore);
    toast({
      title: 'Hazard Updated',
      description: 'Risk assessment has been updated',
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this hazard?')) {
      onDelete(index);
      toast({
        title: 'Hazard Deleted',
        description: 'Risk assessment has been removed',
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

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] overflow-y-auto">
        {/* Sticky Header */}
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b border-primary/10">
          <SheetTitle className="text-lg font-bold text-foreground flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-11 h-11 rounded-full font-bold",
              riskColors.bg,
              riskColors.text
            )}>
              H{index + 1}
            </div>
            Edit Hazard
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4 pb-28">
          {/* Hazard Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Hazard
            </label>
            <Input
              value={editedHazard}
              onChange={(e) => { setEditedHazard(e.target.value); markChanged(); }}
              className="text-base min-h-[48px] touch-manipulation"
              placeholder="e.g., Electric shock from exposed terminals"
            />
          </div>

          {/* Control Measures */}
          <div className="space-y-3 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
            <label className="text-sm font-bold text-amber-500 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Control Measures
            </label>
            <Textarea
              value={editedControlMeasure}
              onChange={(e) => { setEditedControlMeasure(e.target.value); markChanged(); }}
              className="min-h-[150px] text-base touch-manipulation"
              placeholder="Describe control measures to mitigate this hazard..."
            />
          </div>

          {/* Likelihood & Severity with Sliders */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Likelihood</label>
                <span className="text-lg font-bold text-elec-yellow">{editedLikelihood}/5</span>
              </div>
              <Slider
                value={[editedLikelihood]}
                onValueChange={(v) => { setEditedLikelihood(v[0]); markChanged(); }}
                min={1}
                max={5}
                step={1}
                className="touch-manipulation"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Rare</span>
                <span>Unlikely</span>
                <span>Possible</span>
                <span>Likely</span>
                <span>Certain</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Severity</label>
                <span className="text-lg font-bold text-red-500">{editedSeverity}/5</span>
              </div>
              <Slider
                value={[editedSeverity]}
                onValueChange={(v) => { setEditedSeverity(v[0]); markChanged(); }}
                min={1}
                max={5}
                step={1}
                className="touch-manipulation"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minor</span>
                <span>Moderate</span>
                <span>Serious</span>
                <span>Major</span>
                <span>Fatal</span>
              </div>
            </div>

            {/* Risk Score Display */}
            <div className={cn(
              "p-4 rounded-lg border-2 text-center",
              riskColors.border,
              riskColors.bg
            )}>
              <div className="text-xs font-semibold uppercase mb-1 opacity-80">Risk Score</div>
              <div className={cn("text-3xl font-bold", riskColors.text)}>{riskScore}</div>
              <div className={cn("text-sm font-medium mt-1", riskColors.text)}>
                {riskScore <= 4 ? 'Low Risk' : riskScore <= 9 ? 'Medium Risk' : riskScore <= 16 ? 'High Risk' : 'Very High Risk'}
              </div>
            </div>
          </div>

          {/* Regulation Reference */}
          <div className="space-y-3 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
            <label className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Regulation Reference
            </label>
            <Input
              value={editedRegulation}
              onChange={(e) => { setEditedRegulation(e.target.value); markChanged(); }}
              className="min-h-[48px] touch-manipulation"
              placeholder="e.g., BS 7671 Section 537"
            />
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
