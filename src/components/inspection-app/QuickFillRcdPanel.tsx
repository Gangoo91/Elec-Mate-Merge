import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { FieldTooltip } from '@/components/ui/field-tooltip';
import { rcdBsStandardOptions } from '@/types/protectiveDeviceTypes';
import { rcdTypeOptions } from '@/types/wiringTypes';

interface QuickFillRcdPanelProps {
  onFillAllRcdBsStandard: (value: string) => void;
  onFillAllRcdType: (value: string) => void;
  onFillAllRcdRating: (value: string) => void;
  onFillAllRcdRatingA: (value: string) => void;
}

const rcdRatingOptions = [
  { value: '10mA', label: '10mA' },
  { value: '30mA', label: '30mA' },
  { value: '100mA', label: '100mA' },
  { value: '300mA', label: '300mA' },
  { value: '500mA', label: '500mA' }
];

const rcdRatingAOptions = [
  { value: '25', label: '25A' },
  { value: '32', label: '32A' },
  { value: '40', label: '40A' },
  { value: '63', label: '63A' },
  { value: '80', label: '80A' },
  { value: '100', label: '100A' }
];

const QuickFillRcdPanel: React.FC<QuickFillRcdPanelProps> = ({
  onFillAllRcdBsStandard,
  onFillAllRcdType,
  onFillAllRcdRating,
  onFillAllRcdRatingA
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedBsStandard, setSelectedBsStandard] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedRatingA, setSelectedRatingA] = useState<string>('');

  return (
    <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/30 dark:to-purple-950/30 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-sm text-foreground">Quick Fill RCD Details</span>
          <FieldTooltip 
            content="Use this to quickly apply RCD details to all circuits when one or two RCDs protect multiple circuits. This saves time by filling all rows at once."
            regulation="Reg 314.1"
            example="If all circuits are protected by a 30mA Type A RCD, select the values and click 'Apply to All Circuits'"
          />
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* BS Standard */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">BS (EN) Standard</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <MobileSelectPicker
                  value={selectedBsStandard}
                  onValueChange={setSelectedBsStandard}
                  options={rcdBsStandardOptions}
                  placeholder="Select..."
                  title="BS (EN) Standard"
                />
              </div>
              <Button
                size="sm"
                onClick={() => selectedBsStandard && onFillAllRcdBsStandard(selectedBsStandard)}
                disabled={!selectedBsStandard}
                className="whitespace-nowrap h-11"
              >
                Apply to All
              </Button>
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <MobileSelectPicker
                  value={selectedType}
                  onValueChange={setSelectedType}
                  options={rcdTypeOptions}
                  placeholder="Select..."
                  title="RCD Type"
                />
              </div>
              <Button
                size="sm"
                onClick={() => selectedType && onFillAllRcdType(selectedType)}
                disabled={!selectedType}
                className="whitespace-nowrap h-11"
              >
                Apply to All
              </Button>
            </div>
          </div>

          {/* IΔn (mA) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">IΔn (mA)</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <MobileSelectPicker
                  value={selectedRating}
                  onValueChange={setSelectedRating}
                  options={rcdRatingOptions}
                  placeholder="Select..."
                  title="RCD Rating (mA)"
                />
              </div>
              <Button
                size="sm"
                onClick={() => selectedRating && onFillAllRcdRating(selectedRating)}
                disabled={!selectedRating}
                className="whitespace-nowrap h-11"
              >
                Apply to All
              </Button>
            </div>
          </div>

          {/* Rating (A) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Rating (A)</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <MobileSelectPicker
                  value={selectedRatingA}
                  onValueChange={setSelectedRatingA}
                  options={rcdRatingAOptions}
                  placeholder="Select..."
                  title="RCD Rating (A)"
                />
              </div>
              <Button
                size="sm"
                onClick={() => selectedRatingA && onFillAllRcdRatingA(selectedRatingA)}
                disabled={!selectedRatingA}
                className="whitespace-nowrap h-11"
              >
                Apply to All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFillRcdPanel;
