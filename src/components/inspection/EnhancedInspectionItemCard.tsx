import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Eye, Check, X, AlertTriangle, AlertCircle, ChevronRight } from 'lucide-react';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface EnhancedInspectionItemCardProps {
  sectionItem: BaseInspectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
}

// Outcome options for quick selection
const outcomeOptions = [
  { value: 'satisfactory' as const, label: 'OK', icon: Check, color: 'green' },
  { value: 'C1' as const, label: 'C1', icon: X, color: 'red' },
  { value: 'C2' as const, label: 'C2', icon: AlertCircle, color: 'orange' },
  { value: 'C3' as const, label: 'C3', icon: AlertTriangle, color: 'yellow' },
  { value: 'not-applicable' as const, label: 'N/A', icon: null, color: 'gray' },
  { value: 'not-verified' as const, label: 'N/V', icon: Eye, color: 'blue' },
];

const EnhancedInspectionItemCard: React.FC<EnhancedInspectionItemCardProps> = ({
  sectionItem,
  inspectionItem,
  onUpdateItem,
  onOutcomeChange,
  onNavigateToObservations
}) => {
  const haptics = useHaptics();
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
        haptics.success();
        onOutcomeChange(sectionItem.id, 'satisfactory');
      }
      setSwipeOffset(0);
    },
    onSwipedLeft: () => {
      if (swipeOffset < -40) {
        haptics.tap();
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

  const handleOutcomeClick = (outcome: InspectionItem['outcome']) => {
    haptics.tap();
    if (currentOutcome === outcome) {
      onOutcomeChange(sectionItem.id, '');
    } else {
      onOutcomeChange(sectionItem.id, outcome);
      if (outcome === 'C1') haptics.warning();
      else if (outcome === 'C2' || outcome === 'C3') haptics.impact();
      else if (outcome === 'satisfactory') haptics.success();
    }
  };

  // Get outcome-based styling
  const getOutcomeStyles = () => {
    switch (currentOutcome) {
      case 'satisfactory': return { border: 'border-l-green-500', bg: 'bg-green-500/5' };
      case 'C1': return { border: 'border-l-red-500', bg: 'bg-red-500/5' };
      case 'C2': return { border: 'border-l-orange-500', bg: 'bg-orange-500/5' };
      case 'C3': return { border: 'border-l-yellow-500', bg: 'bg-yellow-500/5' };
      case 'limitation': return { border: 'border-l-purple-500', bg: 'bg-purple-500/5' };
      case 'not-applicable': return { border: 'border-l-gray-500', bg: 'bg-gray-500/5' };
      case 'not-verified': return { border: 'border-l-blue-500', bg: 'bg-blue-500/5' };
      default: return { border: 'border-l-border/50', bg: '' };
    }
  };

  const styles = getOutcomeStyles();
  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  return (
    <div className="relative overflow-hidden">
      {/* Swipe background indicators */}
      <div className="absolute inset-0 flex">
        {/* Left swipe - show options */}
        <div className={cn(
          "flex-1 flex items-center justify-end px-4 transition-opacity",
          swipeOffset < -20 ? "opacity-100" : "opacity-0",
          "bg-elec-yellow/20"
        )}>
          <span className="text-sm font-medium text-elec-yellow">Options</span>
        </div>
        {/* Right swipe - mark OK */}
        <div className={cn(
          "flex-1 flex items-center justify-start px-4 transition-opacity",
          swipeOffset > 20 ? "opacity-100" : "opacity-0",
          "bg-green-500/20"
        )}>
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-green-500">OK</span>
        </div>
      </div>

      {/* Main card content */}
      <div
        {...swipeHandlers}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        className={cn(
          "relative border-l-4 rounded-lg transition-transform",
          "bg-card/50 border border-border/30",
          styles.border,
          styles.bg
        )}
      >
        {/* Compact header - always visible */}
        <button
          type="button"
          onClick={() => { haptics.tap(); setIsExpanded(!isExpanded); }}
          className="w-full p-3 flex items-center gap-3 text-left touch-manipulation"
        >
          {/* Item Number */}
          <span className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
            currentOutcome === 'satisfactory' ? "bg-green-500/20 text-green-400" :
            currentOutcome === 'C1' ? "bg-red-500/20 text-red-400" :
            currentOutcome === 'C2' ? "bg-orange-500/20 text-orange-400" :
            currentOutcome === 'C3' ? "bg-yellow-500/20 text-yellow-400" :
            currentOutcome === 'not-applicable' ? "bg-gray-500/20 text-gray-400" :
            currentOutcome === 'not-verified' ? "bg-blue-500/20 text-blue-400" :
            currentOutcome === 'limitation' ? "bg-purple-500/20 text-purple-400" :
            "bg-elec-yellow/20 text-elec-yellow"
          )}>
            {currentOutcome === 'satisfactory' ? <Check className="h-4 w-4" /> :
             currentOutcome === 'C1' ? 'C1' :
             currentOutcome === 'C2' ? 'C2' :
             currentOutcome === 'C3' ? 'C3' :
             currentOutcome === 'not-verified' ? 'N/V' :
             currentOutcome === 'limitation' ? 'LIM' :
             sectionItem.number}
          </span>

          {/* Item Title */}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm text-foreground font-medium leading-tight line-clamp-2 text-left">
              {sectionItem.item}
            </p>
            {sectionItem.clause && (
              <span className="text-xs text-muted-foreground font-mono block text-left">
                {sectionItem.clause}
              </span>
            )}
          </div>

          {/* Expand indicator */}
          <ChevronRight className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-90"
          )} />
        </button>

        {/* Inline outcome buttons - always visible */}
        <div className="px-3 pb-3 flex gap-1.5">
          {outcomeOptions.map((option) => {
            const isActive = currentOutcome === option.value;
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOutcomeClick(option.value)}
                className={cn(
                  "flex-1 h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation",
                  "flex items-center justify-center gap-0.5",
                  "active:scale-95",
                  isActive ? (
                    option.color === 'green' ? "bg-green-500 text-white" :
                    option.color === 'red' ? "bg-red-500 text-white" :
                    option.color === 'orange' ? "bg-orange-500 text-white" :
                    option.color === 'yellow' ? "bg-yellow-500 text-black" :
                    option.color === 'gray' ? "bg-gray-500 text-white" :
                    option.color === 'blue' ? "bg-blue-500 text-white" :
                    "bg-purple-500 text-white"
                  ) : (
                    option.color === 'green' ? "bg-green-500/10 text-green-400 border border-green-500/30" :
                    option.color === 'red' ? "bg-red-500/10 text-red-400 border border-red-500/30" :
                    option.color === 'orange' ? "bg-orange-500/10 text-orange-400 border border-orange-500/30" :
                    option.color === 'yellow' ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30" :
                    option.color === 'gray' ? "bg-white/5 text-white/50 border border-white/10" :
                    option.color === 'blue' ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" :
                    "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                  )
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-3 pb-3 space-y-3 border-t border-border/20 pt-3">
            {/* Notes */}
            <div>
              <Textarea
                placeholder="Add inspection notes..."
                value={localNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                rows={2}
                style={{ fontSize: '16px' }}
                className="text-base bg-white/5 border-white/10 focus:border-elec-yellow/50 placeholder:text-white/30 resize-none min-h-[70px]"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 h-11 text-sm bg-white/5 border-white/10 text-white/70 hover:bg-white/10 active:scale-95 touch-manipulation"
              >
                <Camera className="h-4 w-4 mr-2" />
                Photo
              </Button>

              {isCriticalOutcome && onNavigateToObservations && (
                <Button
                  variant="outline"
                  onClick={onNavigateToObservations}
                  className={cn(
                    "flex-1 h-11 text-sm active:scale-95 touch-manipulation",
                    currentOutcome === 'C1' && "bg-red-500/10 border-red-500/30 text-red-400",
                    currentOutcome === 'C2' && "bg-orange-500/10 border-orange-500/30 text-orange-400",
                    currentOutcome === 'C3' && "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                  )}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              )}
            </div>

            {/* LIM option if not in main row */}
            <button
              type="button"
              onClick={() => handleOutcomeClick('limitation')}
              className={cn(
                "w-full h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation",
                "flex items-center justify-center",
                "active:scale-95",
                currentOutcome === 'limitation'
                  ? "bg-purple-500 text-white"
                  : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
              )}
            >
              Mark as Limitation (LIM)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedInspectionItemCard;
