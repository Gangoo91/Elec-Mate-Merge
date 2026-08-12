import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, X, Trash2, Shield, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inputCn, textareaCn } from '@/components/forms/fieldStyles';
import { getRiskColors } from '@/utils/risk-level-helpers';
import type { RAMSRisk } from '@/types/rams';
import { toast } from '@/hooks/use-toast';

interface RiskEditSheetProps {
  risk: RAMSRisk;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (riskId: string, updates: Partial<RAMSRisk>) => void;
  onDelete?: (riskId: string) => void;
}

export const RiskEditSheet: React.FC<RiskEditSheetProps> = ({
  risk,
  open,
  onOpenChange,
  onSave,
  onDelete,
}) => {
  const [editedRisk, setEditedRisk] = useState<RAMSRisk>(risk);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedRisk(risk);
    setHasChanges(false);
  }, [risk, open]);

  useEffect(() => {
    const riskRating = editedRisk.likelihood * editedRisk.severity;
    if (riskRating !== editedRisk.riskRating) {
      setEditedRisk((prev) => ({ ...prev, riskRating }));
    }
  }, [editedRisk.likelihood, editedRisk.severity]);

  const handleChange = (updates: Partial<RAMSRisk>) => {
    setEditedRisk((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(risk.id, editedRisk);
    toast({
      title: 'Hazard Updated',
      description: 'Risk assessment has been updated',
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this hazard?')) {
      onDelete(risk.id);
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

  const riskRating = editedRisk.likelihood * editedRisk.severity;
  const riskColors = getRiskColors(riskRating);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-background z-10 pb-4 border-b border-primary/10">
          <SheetTitle className="text-lg font-bold text-elec-light">Edit Hazard</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4 pb-24">
          {/* Risk Score Display */}
          <div
            className={cn('flex items-center justify-center gap-3 p-4 rounded-lg', riskColors.bg)}
          >
            <AlertTriangle className={cn('h-6 w-6', riskColors.text)} />
            <span className={cn('text-xl font-bold', riskColors.text)}>
              Risk Score: {riskRating}
            </span>
          </div>

          {/* Hazard Title */}
          <div className="space-y-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              Hazard Title
            </label>
            <input
              value={editedRisk.hazard}
              onChange={(e) => handleChange({ hazard: e.target.value })}
              className={cn(inputCn, "text-[16px]")}
              placeholder="e.g., Working at height"
            />
          </div>

          {/* Risk Description */}
          <div className="space-y-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white flex items-center gap-2">
              <Info className="h-4 w-4 text-elec-yellow" />
              Risk Description
            </label>
            <textarea
              value={editedRisk.risk}
              onChange={(e) => handleChange({ risk: e.target.value })}
              className={cn(textareaCn, "w-full min-h-[120px] resize-y")}
              placeholder="Describe the potential risk or consequence"
            />
          </div>

          {/* Control Measures - Most Important */}
          <div className="space-y-2 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Control Measures (Critical)
            </label>
            <textarea
              value={editedRisk.controls}
              onChange={(e) => handleChange({ controls: e.target.value })}
              className={cn(textareaCn, "w-full min-h-[140px] resize-y")}
              placeholder="List all control measures to mitigate the risk..."
            />
            <p className="text-xs text-white mt-2">
              💡 Be specific: What actions will prevent or reduce this risk?
            </p>
          </div>

          {/* Chips, not a slider. A 5-stop slider is imprecise under a thumb and
              the scale labels underneath were unreadable at phone width. */}
          <div className="space-y-2 rounded-xl border border-white/[0.12] bg-white/[0.05] p-4">
            <div className="flex items-baseline justify-between">
              <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">Likelihood</label>
              <span className="text-[12px] font-semibold tabular-nums text-elec-yellow">
                {editedRisk.likelihood}/5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {['Rare', 'Unlikely', 'Possible', 'Likely', 'Certain'].map((word, i) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => handleChange({ likelihood: i + 1 })}
                  aria-pressed={editedRisk.likelihood === i + 1}
                  className={cn(
                    'flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl border px-0.5 transition-colors touch-manipulation',
                    editedRisk.likelihood === i + 1
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white'
                  )}
                >
                  <span className="text-[15px] font-semibold tabular-nums">{i + 1}</span>
                  <span className="text-[8.5px] font-medium uppercase leading-none tracking-[0.02em]">
                    {word}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chips, not a slider. A 5-stop slider is imprecise under a thumb and
              the scale labels underneath were unreadable at phone width. */}
          <div className="space-y-2 rounded-xl border border-white/[0.12] bg-white/[0.05] p-4">
            <div className="flex items-baseline justify-between">
              <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">Severity</label>
              <span className="text-[12px] font-semibold tabular-nums text-elec-yellow">
                {editedRisk.severity}/5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {['Minor', 'Low', 'Moderate', 'Major', 'Severe'].map((word, i) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => handleChange({ severity: i + 1 })}
                  aria-pressed={editedRisk.severity === i + 1}
                  className={cn(
                    'flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl border px-0.5 transition-colors touch-manipulation',
                    editedRisk.severity === i + 1
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white'
                  )}
                >
                  <span className="text-[15px] font-semibold tabular-nums">{i + 1}</span>
                  <span className="text-[8.5px] font-medium uppercase leading-none tracking-[0.02em]">
                    {word}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Residual Risk */}
          <div className="space-y-2 rounded-xl border border-white/[0.12] bg-white/[0.05] p-4">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Residual Risk (After Controls)
            </label>
            <input
              type="number"
              value={editedRisk.residualRisk}
              onChange={(e) => handleChange({ residualRisk: parseInt(e.target.value) || 0 })}
              className={cn(textareaCn, "w-full min-h-[120px] resize-y")}
              min={0}
              max={25}
            />
          </div>

          {/* Further Action */}
          <div className="space-y-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Further Action Required (Optional)
            </label>
            <textarea
              value={editedRisk.furtherAction || ''}
              onChange={(e) => handleChange({ furtherAction: e.target.value })}
              className={cn(textareaCn, "w-full min-h-[120px] resize-y")}
              placeholder="Any additional actions needed..."
            />
          </div>

          {/* Responsible Person */}
          <div className="space-y-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">Person Responsible</label>
            <input
              value={editedRisk.responsible || ''}
              onChange={(e) => handleChange({ responsible: e.target.value })}
              className={cn(textareaCn, "w-full min-h-[120px] resize-y")}
              placeholder="Name or role"
            />
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
          <Button variant="outline" className="flex-1 min-h-[48px]" onClick={handleClose}>
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
