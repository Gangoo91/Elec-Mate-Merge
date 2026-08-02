import React from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome:
    | 'satisfactory'
    | 'C1'
    | 'C2'
    | 'C3'
    | 'FI'
    | 'not-applicable'
    | 'not-verified'
    | 'limitation'
    | '';
  notes?: string;
}

interface EnhancedInspectionOutcomeSelectProps {
  itemId: string;
  currentOutcome: InspectionItem['outcome'];
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  compact?: boolean; // For desktop table view
}

// Resting chip — quiet neutral; the label is the signpost
const outcomeChipOff = 'bg-white/[0.06] border border-white/[0.12] text-white';

// Selected chip — SOLID fills only (translucent washes read brown)
const outcomeChipOn: Record<string, string> = {
  satisfactory: 'bg-green-500 border border-green-500 text-black',
  C1: 'bg-red-600 border border-red-600 text-white',
  C2: 'bg-orange-500 border border-orange-500 text-black',
  C3: 'bg-elec-yellow border border-elec-yellow text-black',
  FI: 'bg-blue-500 border border-blue-500 text-white',
  'not-applicable': 'bg-white/[0.18] border border-white/[0.25] text-white',
  'not-verified': 'bg-white/[0.18] border border-white/[0.25] text-white',
  limitation: 'bg-amber-500 border border-amber-500 text-black',
};

// A4:2026 — all 8 outcomes, in reading order
const outcomeOptions: { value: InspectionItem['outcome']; label: string }[] = [
  { value: 'satisfactory', label: 'OK' },
  { value: 'C1', label: 'C1' },
  { value: 'C2', label: 'C2' },
  { value: 'C3', label: 'C3' },
  { value: 'FI', label: 'FI' },
  { value: 'not-applicable', label: 'N/A' },
  { value: 'not-verified', label: 'N/V' },
  { value: 'limitation', label: 'LIM' },
];

const EnhancedInspectionOutcomeSelect = ({
  itemId,
  currentOutcome,
  onOutcomeChange,
  compact = false,
}: EnhancedInspectionOutcomeSelectProps) => {
  const haptic = useHaptic();

  const handleChipClick = (value: InspectionItem['outcome']) => {
    if (value === 'C1' || value === 'C2') {
      haptic.warning();
    } else {
      haptic.light();
    }

    // If clicking same value, deselect (set to empty)
    if (currentOutcome === value) {
      onOutcomeChange(itemId, '');
    } else {
      onOutcomeChange(itemId, value);
    }
  };

  // Compact mode for desktop rows — one line, fixed widths so the chip
  // columns align down the page
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        {outcomeOptions.map((chip) => {
          const isActive = currentOutcome === chip.value;
          return (
            <button
              key={chip.value}
              type="button"
              onClick={() => handleChipClick(chip.value)}
              className={cn(
                'h-9 w-12 shrink-0 rounded-lg text-[12px] font-semibold flex items-center justify-center transition-all touch-manipulation active:scale-[0.97]',
                isActive ? outcomeChipOn[chip.value] : outcomeChipOff
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Full mode for mobile — full-width wrap row, thumb-sized targets
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {outcomeOptions.map((chip) => {
        const isActive = currentOutcome === chip.value;
        return (
          <button
            key={chip.value}
            type="button"
            onClick={() => handleChipClick(chip.value)}
            className={cn(
              'h-11 rounded-lg text-[12px] font-semibold flex items-center justify-center transition-all touch-manipulation active:scale-[0.97]',
              isActive ? outcomeChipOn[chip.value] : outcomeChipOff
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};

export default EnhancedInspectionOutcomeSelect;
