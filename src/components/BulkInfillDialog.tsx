import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TestResult } from '@/types/testResult';
import { ClipboardCheck } from 'lucide-react';

interface BulkInfillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testResults: TestResult[];
  onApply: (value: string, mode: 'all' | 'empty') => void;
}

const BulkInfillDialog: React.FC<BulkInfillDialogProps> = ({
  open,
  onOpenChange,
  testResults,
  onApply,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('N/A');
  const [selectedMode, setSelectedMode] = useState<'all' | 'empty'>('empty');

  // Fields that can be filled (excluding identifiers and metadata)
  const fillableFields: (keyof TestResult)[] = [
    'typeOfWiring', 'referenceMethod', 'pointsServed',
    'liveSize', 'cpcSize',
    'bsStandard', 'protectiveDeviceType', 'protectiveDeviceCurve', 
    'protectiveDeviceRating', 'protectiveDeviceKaRating', 'maxZs',
    'rcdBsStandard', 'rcdType', 'rcdRating', 'rcdRatingA',
    'ringR1', 'ringRn', 'ringR2',
    'r1r2', 'r2',
    'insulationTestVoltage', 'insulationLiveNeutral', 'insulationLiveEarth',
    'polarity', 'zs',
    'rcdOneX', 'rcdTestButton', 'afddTest',
    'pfc', 'notes'
  ];

  // Calculate preview stats
  const calculatePreview = () => {
    let fieldsCount = 0;
    testResults.forEach(result => {
      fillableFields.forEach(field => {
        const currentValue = result[field];
        const isEmpty = !currentValue || currentValue.toString().trim() === '';
        
        if (selectedMode === 'all' || (selectedMode === 'empty' && isEmpty)) {
          fieldsCount++;
        }
      });
    });
    return { circuits: testResults.length, fields: fieldsCount };
  };

  const preview = calculatePreview();

  const handleApply = () => {
    onApply(selectedValue, selectedMode);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-purple-500" />
            Bulk Infill Tool
          </DialogTitle>
          <DialogDescription>
            Fill multiple fields across all circuits with a standard value
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {/* Value Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Select Value</Label>
            <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
              <div className="flex items-center space-x-2 rounded border border-border p-2 hover:bg-accent/50 cursor-pointer active:bg-accent/70 transition-all touch-manipulation">
                <RadioGroupItem value="N/A" id="value-na" />
                <Label htmlFor="value-na" className="flex-1 cursor-pointer text-sm">
                  <span className="font-medium">N/A</span>
                  <span className="text-muted-foreground ml-2">· Not Applicable</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded border border-border p-2 hover:bg-accent/50 cursor-pointer active:bg-accent/70 transition-all touch-manipulation">
                <RadioGroupItem value="LIM" id="value-lim" />
                <Label htmlFor="value-lim" className="flex-1 cursor-pointer text-sm">
                  <span className="font-medium">LIM</span>
                  <span className="text-muted-foreground ml-2">· Limitation</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded border border-border p-2 hover:bg-accent/50 cursor-pointer active:bg-accent/70 transition-all touch-manipulation">
                <RadioGroupItem value="--" id="value-dash" />
                <Label htmlFor="value-dash" className="flex-1 cursor-pointer text-sm">
                  <span className="font-medium">--</span>
                  <span className="text-muted-foreground ml-2">· Not tested</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Fill Mode</Label>
            <RadioGroup value={selectedMode} onValueChange={(v) => setSelectedMode(v as 'all' | 'empty')}>
              <div className="flex items-center space-x-2 rounded border border-border p-2 hover:bg-accent/50 cursor-pointer active:bg-accent/70 transition-all touch-manipulation">
                <RadioGroupItem value="all" id="mode-all" />
                <Label htmlFor="mode-all" className="flex-1 cursor-pointer text-sm">
                  <span className="font-medium">Fill All Fields</span>
                  <span className="text-muted-foreground ml-2">· Overwrite existing</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded border border-border p-2 hover:bg-accent/50 cursor-pointer active:bg-accent/70 transition-all touch-manipulation">
                <RadioGroupItem value="empty" id="mode-empty" />
                <Label htmlFor="mode-empty" className="flex-1 cursor-pointer text-sm">
                  <span className="font-medium">Fill Empty Only</span>
                  <span className="text-muted-foreground ml-2">· Preserve existing</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Preview */}
          <div className="rounded-lg bg-muted/50 p-3 border border-border">
            <div className="text-xs font-semibold mb-1.5">Preview</div>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div className="flex justify-between">
                <span>Circuits:</span>
                <span className="font-medium text-foreground">{preview.circuits}</span>
              </div>
              <div className="flex justify-between">
                <span>Fields to fill:</span>
                <span className="font-medium text-foreground">{preview.fields}</span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-border/50">
                <span>
                  Value "<span className="font-mono font-semibold text-foreground">{selectedValue}</span>" will be applied
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleApply}
            className="bg-purple-600 hover:bg-purple-700 text-foreground"
          >
            Apply Infill
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkInfillDialog;
