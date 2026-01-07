import React from 'react';
import { Check, X, AlertTriangle, AlertCircle, Circle, FileText, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface EnhancedInspectionOutcomeSelectProps {
  itemId: string;
  currentOutcome: InspectionItem['outcome'];
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  compact?: boolean; // For desktop table view
}

// Primary outcomes (most common)
const primaryOutcomes = [
  {
    value: 'satisfactory' as const,
    label: 'OK',
    icon: Check,
    activeClass: 'bg-green-500 text-white border-green-500',
    inactiveClass: 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
  },
  {
    value: 'C1' as const,
    label: 'C1',
    icon: X,
    activeClass: 'bg-red-500 text-white border-red-500',
    inactiveClass: 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
  },
  {
    value: 'C2' as const,
    label: 'C2',
    icon: AlertCircle,
    activeClass: 'bg-orange-500 text-white border-orange-500',
    inactiveClass: 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20'
  },
  {
    value: 'C3' as const,
    label: 'C3',
    icon: AlertTriangle,
    activeClass: 'bg-yellow-500 text-black border-yellow-500',
    inactiveClass: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20'
  }
];

// Secondary outcomes (less common)
const secondaryOutcomes = [
  {
    value: 'not-applicable' as const,
    label: 'N/A',
    icon: Circle,
    activeClass: 'bg-gray-500 text-white border-gray-500',
    inactiveClass: 'bg-white/5 border-white/20 text-white/50 hover:bg-white/10'
  },
  {
    value: 'not-verified' as const,
    label: 'N/V',
    icon: FileText,
    activeClass: 'bg-blue-500 text-white border-blue-500',
    inactiveClass: 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
  },
  {
    value: 'limitation' as const,
    label: 'LIM',
    icon: Info,
    activeClass: 'bg-purple-500 text-white border-purple-500',
    inactiveClass: 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20'
  }
];

const EnhancedInspectionOutcomeSelect = ({
  itemId,
  currentOutcome,
  onOutcomeChange,
  compact = false
}: EnhancedInspectionOutcomeSelectProps) => {

  const handleChipClick = (value: InspectionItem['outcome']) => {
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // If clicking same value, deselect (set to empty)
    if (currentOutcome === value) {
      onOutcomeChange(itemId, '');
    } else {
      onOutcomeChange(itemId, value);
    }
  };

  // Compact mode for desktop table - single row, smaller chips
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {[...primaryOutcomes, ...secondaryOutcomes].map((chip) => {
          const isActive = currentOutcome === chip.value;
          const IconComponent = chip.icon;

          return (
            <button
              key={chip.value}
              type="button"
              onClick={() => handleChipClick(chip.value)}
              className={cn(
                "px-2 py-1 rounded-lg text-xs font-medium",
                "border transition-all touch-manipulation",
                "active:scale-95",
                isActive ? chip.activeClass : chip.inactiveClass
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Full mode for mobile cards - 2 rows, larger touch targets
  return (
    <div className="space-y-2">
      {/* Row 1: Primary outcomes (OK, C1, C2, C3) */}
      <div className="flex gap-2">
        {primaryOutcomes.map((chip) => {
          const isActive = currentOutcome === chip.value;
          const IconComponent = chip.icon;

          return (
            <button
              key={chip.value}
              type="button"
              onClick={() => handleChipClick(chip.value)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5",
                "h-11 rounded-xl text-sm font-medium",
                "border transition-all touch-manipulation",
                "active:scale-95",
                isActive ? chip.activeClass : chip.inactiveClass
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Row 2: Secondary outcomes (N/A, N/V, LIM) */}
      <div className="flex gap-2">
        {secondaryOutcomes.map((chip) => {
          const isActive = currentOutcome === chip.value;
          const IconComponent = chip.icon;

          return (
            <button
              key={chip.value}
              type="button"
              onClick={() => handleChipClick(chip.value)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5",
                "h-11 rounded-xl text-sm font-medium",
                "border transition-all touch-manipulation",
                "active:scale-95",
                isActive ? chip.activeClass : chip.inactiveClass
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedInspectionOutcomeSelect;
