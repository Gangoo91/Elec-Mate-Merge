import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Check, X, AlertTriangle, AlertCircle, ChevronRight, Search, Info } from 'lucide-react';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
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

interface EnhancedInspectionItemCardProps {
  sectionItem: BaseInspectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
  quickMarkMode?: boolean;
}

// Outcome options for quick selection (A4:2026 — all 8 outcomes)
const outcomeOptions = [
  { value: 'satisfactory' as const, label: 'OK', icon: Check, color: 'green' },
  { value: 'C1' as const, label: 'C1', icon: X, color: 'red' },
  { value: 'C2' as const, label: 'C2', icon: AlertCircle, color: 'orange' },
  { value: 'C3' as const, label: 'C3', icon: AlertTriangle, color: 'yellow' },
  { value: 'FI' as const, label: 'FI', icon: Search, color: 'blue' },
  { value: 'not-verified' as const, label: 'N/V', icon: Eye, color: 'cyan' },
  { value: 'limitation' as const, label: 'LIM', icon: Info, color: 'purple' },
  { value: 'not-applicable' as const, label: 'N/A', icon: null, color: 'gray' },
];

const EnhancedInspectionItemCard: React.FC<EnhancedInspectionItemCardProps> = ({
  sectionItem,
  inspectionItem,
  onUpdateItem,
  onOutcomeChange,
  onNavigateToObservations,
  quickMarkMode,
}) => {
  const haptic = useHaptic();
  const [localNotes, setLocalNotes] = useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentOutcome = inspectionItem?.outcome || '';

  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
  }, [inspectionItem?.notes]);

  const handleNotesChange = (value: string) => {
    setLocalNotes(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      onUpdateItem(sectionItem.id, 'notes', value);
    }, 300);

    setDebounceTimer(newTimer);
  };

  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      // Limit swipe distance
      const maxSwipe = 80;
      const offset = Math.max(-maxSwipe, Math.min(maxSwipe, e.deltaX));
      setSwipeOffset(offset);
    },
    onSwipedRight: () => {
      if (swipeOffset > 40) {
        haptic.success();
        onOutcomeChange(sectionItem.id, 'satisfactory');
      }
      setSwipeOffset(0);
    },
    onSwipedLeft: () => {
      if (swipeOffset < -40) {
        haptic.light();
        setIsExpanded(true);
      }
      setSwipeOffset(0);
    },
    onTouchEndOrOnMouseUp: () => {
      setSwipeOffset(0);
    },
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: false,
  });

  const [flashRed, setFlashRed] = React.useState(false);

  const handleOutcomeClick = (outcome: InspectionItem['outcome']) => {
    haptic.light();
    if (currentOutcome === outcome) {
      onOutcomeChange(sectionItem.id, '');
    } else {
      onOutcomeChange(sectionItem.id, outcome);
      if (outcome === 'C1') {
        haptic.warning();
        setFlashRed(true);
        setTimeout(() => setFlashRed(false), 600);
      } else if (outcome === 'C2' || outcome === 'C3') {
        haptic.heavy();
      } else if (outcome === 'satisfactory') {
        haptic.success();
      }
    }
  };

  // Get outcome-based styling
  const getOutcomeStyles = () => {
    switch (currentOutcome) {
      case 'satisfactory':
        return { border: 'border-l-green-500', bg: 'bg-green-500/5' };
      case 'C1':
        return { border: 'border-l-red-500', bg: 'bg-red-500/5' };
      case 'C2':
        return { border: 'border-l-orange-500', bg: 'bg-orange-500/5' };
      case 'C3':
        return { border: 'border-l-yellow-500', bg: 'bg-yellow-500/5' };
      case 'limitation':
        return { border: 'border-l-purple-500', bg: 'bg-purple-500/5' };
      case 'not-applicable':
        return { border: 'border-l-gray-500', bg: 'bg-gray-500/5' };
      case 'not-verified':
        return { border: 'border-l-blue-500', bg: 'bg-blue-500/5' };
      default:
        return { border: 'border-l-white/20', bg: '' };
    }
  };

  const styles = getOutcomeStyles();
  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  return (
    <div className="relative overflow-hidden">
      {/* Swipe background indicators */}
      <div className="absolute inset-0 flex">
        {/* Left swipe - show options */}
        <div
          className={cn(
            'flex-1 flex items-center justify-end px-4 transition-opacity',
            swipeOffset < -20 ? 'opacity-100' : 'opacity-0',
            'bg-elec-yellow/20'
          )}
        >
          <span className="text-sm font-medium text-elec-yellow">Options</span>
        </div>
        {/* Right swipe - mark OK */}
        <div
          className={cn(
            'flex-1 flex items-center justify-start px-4 transition-opacity',
            swipeOffset > 20 ? 'opacity-100' : 'opacity-0',
            'bg-green-500/20'
          )}
        >
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-green-500">OK</span>
        </div>
      </div>

      {/* Main card content */}
      <div
        {...swipeHandlers}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        className={cn(
          'relative border-l-4 rounded-lg transition-all duration-300',
          'bg-white/[0.06] border border-white/[0.10]',
          flashRed && 'ring-2 ring-red-500/50 bg-red-500/10',
          styles.border,
          styles.bg
        )}
      >
        {/* Compact header - always visible */}
        <button
          type="button"
          onClick={() => {
            if (quickMarkMode && currentOutcome !== 'satisfactory') {
              haptic.success();
              onOutcomeChange(sectionItem.id, 'satisfactory');
            } else {
              haptic.light();
              setIsExpanded(!isExpanded);
            }
          }}
          className="w-full p-3 flex items-center gap-3 text-left touch-manipulation"
        >
          {/* Item Number */}
          <span
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
              currentOutcome === 'satisfactory'
                ? 'bg-green-500/20 text-green-400'
                : currentOutcome === 'C1'
                  ? 'bg-red-500/20 text-red-400'
                  : currentOutcome === 'C2'
                    ? 'bg-orange-500/20 text-orange-400'
                    : currentOutcome === 'C3'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : currentOutcome === 'not-applicable'
                        ? 'bg-white/[0.06] text-white'
                        : currentOutcome === 'not-verified'
                          ? 'bg-blue-500/20 text-blue-400'
                          : currentOutcome === 'limitation'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-elec-yellow/20 text-elec-yellow'
            )}
          >
            {currentOutcome === 'satisfactory' ? (
              <Check className="h-4 w-4" />
            ) : currentOutcome === 'C1' ? (
              'C1'
            ) : currentOutcome === 'C2' ? (
              'C2'
            ) : currentOutcome === 'C3' ? (
              'C3'
            ) : currentOutcome === 'not-verified' ? (
              'N/V'
            ) : currentOutcome === 'limitation' ? (
              'LIM'
            ) : (
              sectionItem.number
            )}
          </span>

          {/* Item Title */}
          <div className="flex-1 min-w-0 text-left">
            <p
              className={cn(
                'text-sm text-white font-medium leading-tight text-left',
                !isExpanded && 'line-clamp-2'
              )}
            >
              {sectionItem.item}
            </p>
            {sectionItem.clause && (
              <span className="text-xs text-white/80 font-mono block text-left">
                {sectionItem.clause}
              </span>
            )}
          </div>

          {/* Expand indicator */}
          <ChevronRight
            className={cn(
              'h-4 w-4 text-white/80 transition-transform',
              isExpanded && 'rotate-90'
            )}
          />
        </button>

        {/* Outcome buttons */}
        <div className="px-3 pb-3 grid grid-cols-4 gap-1.5">
          {outcomeOptions.map((option) => {
            const isActive = currentOutcome === option.value;
            const colorMap: Record<string, { active: string; inactive: string }> = {
              green: { active: 'bg-green-500/25 border-green-500/50 text-green-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
              red: { active: 'bg-red-500/25 border-red-500/50 text-red-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
              orange: { active: 'bg-orange-500/25 border-orange-500/50 text-orange-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
              yellow: { active: 'bg-yellow-500/25 border-yellow-500/50 text-yellow-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
              gray: { active: 'bg-white/[0.15] border-white/[0.20] text-white', inactive: 'bg-white/[0.05] border-white/[0.08] text-white/60' },
              blue: { active: 'bg-blue-500/25 border-blue-500/50 text-blue-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
              cyan: { active: 'bg-cyan-500/25 border-cyan-500/50 text-cyan-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
              purple: { active: 'bg-purple-500/25 border-purple-500/50 text-purple-400', inactive: 'bg-white/[0.05] border-white/[0.08] text-white' },
            };
            const colors = colorMap[option.color] || colorMap.gray;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOutcomeClick(option.value)}
                className={cn(
                  'h-10 rounded-lg text-[11px] font-bold border transition-all touch-manipulation active:scale-[0.98]',
                  isActive ? colors.active : colors.inactive
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-3 pb-3 space-y-2 border-t border-white/[0.06] pt-3">
            <Textarea
              placeholder="Add notes..."
              value={localNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={2}
              style={{ fontSize: '16px' }}
              className="text-base text-white bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow placeholder:text-white/40 resize-none min-h-[60px]"
            />

            <div className="grid grid-cols-2 gap-2">
              {/* View observations — only for C1/C2/C3 */}
              {isCriticalOutcome && onNavigateToObservations && (
                <button
                  type="button"
                  onClick={onNavigateToObservations}
                  className={cn(
                    'h-10 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98]',
                    currentOutcome === 'C1' && 'bg-red-500/10 border border-red-500/30 text-red-400',
                    currentOutcome === 'C2' && 'bg-orange-500/10 border border-orange-500/30 text-orange-400',
                    currentOutcome === 'C3' && 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400'
                  )}
                >
                  View Observations
                </button>
              )}

              {/* LIM toggle */}
              <button
                type="button"
                onClick={() => handleOutcomeClick('limitation')}
                className={cn(
                  'h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
                  isCriticalOutcome && onNavigateToObservations ? '' : 'col-span-2',
                  currentOutcome === 'limitation'
                    ? 'bg-purple-500/20 border border-purple-500/40 text-purple-400'
                    : 'bg-white/[0.05] text-white border border-white/[0.08]'
                )}
              >
                Limitation (LIM)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedInspectionItemCard;
