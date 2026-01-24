import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldTooltip } from '@/components/ui/field-tooltip';

interface QuickFillIrPanelProps {
  onFillAllInsulationVoltage: (value: string) => void;
  onFillAllInsulationLiveNeutral: (value: string) => void;
  onFillAllInsulationLiveEarth: (value: string) => void;
}

const testVoltageOptions = [
  { value: '250V', label: '250V' },
  { value: '500V', label: '500V' },
  { value: '1000V', label: '1000V' }
];

const insulationResistanceOptions = [
  { value: '>200', label: '>200 MΩ' },
  { value: '>999', label: '>999 MΩ' },
  { value: 'N/A', label: 'N/A' },
  { value: 'LIM', label: 'LIM' }
];

const QuickFillIrPanel: React.FC<QuickFillIrPanelProps> = ({
  onFillAllInsulationVoltage,
  onFillAllInsulationLiveNeutral,
  onFillAllInsulationLiveEarth
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedVoltage, setSelectedVoltage] = useState<string>('');
  const [selectedLiveNeutral, setSelectedLiveNeutral] = useState<string>('');
  const [selectedLiveEarth, setSelectedLiveEarth] = useState<string>('');

  return (
    <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/30 hover:from-amber-50 hover:to-yellow-50 dark:hover:from-amber-950/50 dark:hover:to-yellow-950/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="font-semibold text-sm text-foreground">Quick Fill Insulation Resistance</span>
          <FieldTooltip
            content="Use this to quickly apply insulation resistance test values to all circuits. Insulation resistance tests verify the integrity of cable insulation between live conductors and earth."
            regulation="Reg 612.3"
            example="For most domestic installations, use 500V test voltage with readings >200MΩ for Live-Earth and Live-Neutral."
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
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Test Voltage */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Test Voltage</label>
            <div className="flex gap-2">
              <Select value={selectedVoltage} onValueChange={setSelectedVoltage}>
                <SelectTrigger className="flex-1 h-11 text-base touch-manipulation">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  {testVoltageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="py-3 text-base touch-manipulation">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => selectedVoltage && onFillAllInsulationVoltage(selectedVoltage)}
                disabled={!selectedVoltage}
                className="h-11 px-4 whitespace-nowrap touch-manipulation"
              >
                Apply to All
              </Button>
            </div>
          </div>

          {/* Live-Neutral */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Live-Neutral (MΩ)</label>
            <div className="flex gap-2">
              <Select value={selectedLiveNeutral} onValueChange={setSelectedLiveNeutral}>
                <SelectTrigger className="flex-1 h-11 text-base touch-manipulation">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  {insulationResistanceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="py-3 text-base touch-manipulation">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => selectedLiveNeutral && onFillAllInsulationLiveNeutral(selectedLiveNeutral)}
                disabled={!selectedLiveNeutral}
                className="h-11 px-4 whitespace-nowrap touch-manipulation"
              >
                Apply to All
              </Button>
            </div>
          </div>

          {/* Live-Earth */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Live-Earth (MΩ)</label>
            <div className="flex gap-2">
              <Select value={selectedLiveEarth} onValueChange={setSelectedLiveEarth}>
                <SelectTrigger className="flex-1 h-11 text-base touch-manipulation">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  {insulationResistanceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="py-3 text-base touch-manipulation">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => selectedLiveEarth && onFillAllInsulationLiveEarth(selectedLiveEarth)}
                disabled={!selectedLiveEarth}
                className="h-11 px-4 whitespace-nowrap touch-manipulation"
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

export default QuickFillIrPanel;
