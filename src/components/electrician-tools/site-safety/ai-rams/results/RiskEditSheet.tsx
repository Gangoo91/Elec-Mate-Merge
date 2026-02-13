import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Save, X, Trash2, Shield, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  onDelete
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
      setEditedRisk(prev => ({ ...prev, riskRating }));
    }
  }, [editedRisk.likelihood, editedRisk.severity]);

  const handleChange = (updates: Partial<RAMSRisk>) => {
    setEditedRisk(prev => ({ ...prev, ...updates }));
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
          <SheetTitle className="text-lg font-bold text-elec-light">
            Edit Hazard
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4 pb-24">
          {/* Risk Score Display */}
          <div className={cn(
            "flex items-center justify-center gap-3 p-4 rounded-lg",
            riskColors.bg
          )}>
            <AlertTriangle className={cn("h-6 w-6", riskColors.text)} />
            <span className={cn("text-xl font-bold", riskColors.text)}>
              Risk Score: {riskRating}
            </span>
          </div>

          {/* Hazard Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              Hazard Title
            </label>
            <Input
              value={editedRisk.hazard}
              onChange={(e) => handleChange({ hazard: e.target.value })}
              className="text-base min-h-[48px]"
              placeholder="e.g., Working at height"
            />
          </div>

          {/* Risk Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Risk Description
            </label>
            <Textarea
              value={editedRisk.risk}
              onChange={(e) => handleChange({ risk: e.target.value })}
              className="min-h-[100px] text-base"
              placeholder="Describe the potential risk or consequence"
            />
          </div>

          {/* Control Measures - Most Important */}
          <div className="space-y-2 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4">
            <label className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Control Measures (Critical)
            </label>
            <Textarea
              value={editedRisk.controls}
              onChange={(e) => handleChange({ controls: e.target.value })}
              className="min-h-[140px] text-base"
              placeholder="List all control measures to mitigate the risk..."
            />
            <p className="text-xs text-white mt-2">
              💡 Be specific: What actions will prevent or reduce this risk?
            </p>
          </div>

          {/* Likelihood Slider */}
          <div className="space-y-3 bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-elec-light">
                Likelihood
              </label>
              <Badge className="bg-elec-yellow/20 text-elec-yellow">
                {editedRisk.likelihood}/5
              </Badge>
            </div>
            <Slider
              value={[editedRisk.likelihood]}
              onValueChange={(value) => handleChange({ likelihood: value[0] })}
              min={1}
              max={5}
              step={1}
              className="w-full py-4"
            />
            <div className="flex justify-between text-xs text-white">
              <span>Rare</span>
              <span>Unlikely</span>
              <span>Possible</span>
              <span>Likely</span>
              <span>Almost Certain</span>
            </div>
          </div>

          {/* Severity Slider */}
          <div className="space-y-3 bg-card/50 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-elec-light">
                Severity
              </label>
              <Badge className="bg-red-500/20 text-red-400">
                {editedRisk.severity}/5
              </Badge>
            </div>
            <Slider
              value={[editedRisk.severity]}
              onValueChange={(value) => handleChange({ severity: value[0] })}
              min={1}
              max={5}
              step={1}
              className="w-full py-4"
            />
            <div className="flex justify-between text-xs text-white">
              <span>Minor</span>
              <span>Low</span>
              <span>Moderate</span>
              <span>Major</span>
              <span>Catastrophic</span>
            </div>
          </div>

          {/* Residual Risk */}
          <div className="space-y-2 bg-green-500/10 rounded-lg p-4 border border-green-500/30">
            <label className="text-sm font-semibold text-green-400">
              Residual Risk (After Controls)
            </label>
            <Input
              type="number"
              value={editedRisk.residualRisk}
              onChange={(e) => handleChange({ residualRisk: parseInt(e.target.value) || 0 })}
              className="min-h-[48px] text-base"
              min={0}
              max={25}
            />
          </div>

          {/* Further Action */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-blue-400">
              Further Action Required (Optional)
            </label>
            <Textarea
              value={editedRisk.furtherAction || ''}
              onChange={(e) => handleChange({ furtherAction: e.target.value })}
              className="min-h-[80px] text-base"
              placeholder="Any additional actions needed..."
            />
          </div>

          {/* Responsible Person */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-elec-light">
              Person Responsible
            </label>
            <Input
              value={editedRisk.responsible || ''}
              onChange={(e) => handleChange({ responsible: e.target.value })}
              className="min-h-[48px] text-base"
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
