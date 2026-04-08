import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Check, Minus, MessageSquare } from 'lucide-react';
import { EICInspectionItem } from '@/data/bs7671EICChecklistData';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface EICInspectionChecklistCardProps {
  inspectionItems: EICInspectionItem[];
  onUpdateItem: (id: string, field: keyof EICInspectionItem, value: any) => void;
  onAutoCreateObservation?: (inspectionItem: {
    id: string;
    item: string;
    itemNumber?: string;
    notes?: string;
    defectCode?: 'limitation';
  }) => string;
  onNavigateToObservations?: () => void;
}

const InspectionItemRow: React.FC<{
  item: EICInspectionItem;
  onOutcomeChange: (id: string, outcome: 'satisfactory' | 'not-applicable' | 'limitation') => void;
  onNotesChange: (id: string, notes: string) => void;
}> = ({ item, onOutcomeChange, onNotesChange }) => {
  const haptic = useHaptic();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [localNotes, setLocalNotes] = useState(item.notes || '');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => onNotesChange(item.id, value), 300);
    setDebounceTimer(timer);
  };

  React.useEffect(() => {
    setLocalNotes(item.notes || '');
  }, [item.notes]);

  React.useEffect(() => {
    return () => { if (debounceTimer) clearTimeout(debounceTimer); };
  }, [debounceTimer]);

  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      const offset = Math.max(-80, Math.min(80, e.deltaX));
      setSwipeOffset(offset);
    },
    onSwipedRight: () => {
      if (swipeOffset > 40) {
        haptic.success();
        onOutcomeChange(item.id, 'satisfactory');
      }
      setSwipeOffset(0);
    },
    onSwipedLeft: () => {
      if (swipeOffset < -40) {
        haptic.light();
        onOutcomeChange(item.id, 'not-applicable');
      }
      setSwipeOffset(0);
    },
    onTouchEndOrOnMouseUp: () => setSwipeOffset(0),
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: false,
  });

  const getBorderColor = () => {
    switch (item.outcome) {
      case 'satisfactory': return 'border-l-green-500';
      case 'not-applicable': return 'border-l-white/20';
      case 'limitation': return 'border-l-amber-500';
      default: return 'border-l-transparent';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Swipe backgrounds */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className={cn('flex-1 flex items-center px-4', swipeOffset > 20 ? 'opacity-100' : 'opacity-0', 'bg-green-500/20')}>
          <Check className="h-5 w-5 text-green-400" />
        </div>
        <div className={cn('flex-1 flex items-center justify-end px-4', swipeOffset < -20 ? 'opacity-100' : 'opacity-0', 'bg-white/[0.06]')}>
          <span className="text-xs text-white">N/A</span>
        </div>
      </div>

      <div
        {...swipeHandlers}
        style={{ transform: `translateX(${swipeOffset}px)`, transition: swipeOffset === 0 ? 'transform 200ms ease-out' : 'none' }}
        className={cn(
          'relative p-3 border-l-4 bg-white/[0.06] border border-white/[0.08] rounded-lg touch-manipulation',
          getBorderColor(),
          item.outcome === 'satisfactory' && 'bg-green-500/[0.08]',
          item.outcome === 'limitation' && 'bg-amber-500/[0.08]',
        )}
      >
        {/* Item number + description + buttons in one row */}
        <div className="flex items-start gap-2">
          <span className={cn(
            'text-[10px] font-bold mt-0.5 shrink-0 w-5 text-center',
            item.outcome === 'satisfactory' ? 'text-green-400' :
            item.outcome === 'limitation' ? 'text-amber-400' :
            'text-elec-yellow'
          )}>
            {item.itemNumber}
          </span>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-white leading-snug">{item.description}</p>

            {/* Outcome buttons — compact row */}
            <div className="flex gap-1 mt-2">
              <button
                onClick={() => { haptic.light(); onOutcomeChange(item.id, 'satisfactory'); }}
                className={cn(
                  'h-8 flex-1 rounded-md font-semibold text-[11px] transition-all touch-manipulation active:scale-[0.97] flex items-center justify-center gap-1',
                  item.outcome === 'satisfactory'
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white'
                )}
              >
                ✓
              </button>
              <button
                onClick={() => { haptic.light(); onOutcomeChange(item.id, 'not-applicable'); }}
                className={cn(
                  'h-8 flex-1 rounded-md font-semibold text-[11px] transition-all touch-manipulation active:scale-[0.97]',
                  item.outcome === 'not-applicable'
                    ? 'bg-white/[0.08] border border-white/[0.15] text-white'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white'
                )}
              >
                N/A
              </button>
              <button
                onClick={() => { haptic.warning(); onOutcomeChange(item.id, 'limitation'); }}
                className={cn(
                  'h-8 flex-1 rounded-md font-semibold text-[11px] transition-all touch-manipulation active:scale-[0.97]',
                  item.outcome === 'limitation'
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white'
                )}
              >
                LIM
              </button>
            </div>

            {/* Notes — only when outcome is set */}
            {item.outcome && (
              <div className="mt-2">
                <Textarea
                  placeholder="Notes..."
                  value={localNotes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="min-h-[40px] text-xs bg-white/[0.04] border-white/[0.06] resize-none focus:ring-1 focus:ring-elec-yellow/30 placeholder:text-white"
                  style={{ fontSize: '13px' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EICInspectionChecklistCard: React.FC<EICInspectionChecklistCardProps> = ({
  inspectionItems,
  onUpdateItem,
  onAutoCreateObservation,
  onNavigateToObservations,
}) => {
  const handleOutcomeChange = (
    id: string,
    outcome: 'satisfactory' | 'not-applicable' | 'limitation'
  ) => {
    const currentItem = inspectionItems.find((item) => item.id === id);
    if (currentItem?.outcome === outcome) {
      onUpdateItem(id, 'outcome', '');
    } else {
      onUpdateItem(id, 'outcome', outcome);
      if (outcome === 'limitation' && currentItem && onAutoCreateObservation) {
        onAutoCreateObservation({
          id: currentItem.id,
          item: currentItem.description,
          itemNumber: currentItem.itemNumber,
          notes: currentItem.notes,
          defectCode: 'limitation',
        });
        if (onNavigateToObservations) {
          setTimeout(() => onNavigateToObservations(), 300);
        }
      }
    }
  };

  const handleNotesChange = (id: string, notes: string) => {
    onUpdateItem(id, 'notes', notes);
  };

  if (inspectionItems.length === 0) {
    return (
      <div className="text-center py-8 text-white text-xs">
        No inspection items found
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-[9px] text-white mb-2">Swipe right = ✓ · Swipe left = N/A</p>
      {inspectionItems.map((item) => (
        <InspectionItemRow
          key={item.id}
          item={item}
          onOutcomeChange={handleOutcomeChange}
          onNotesChange={handleNotesChange}
        />
      ))}
    </div>
  );
};

export default EICInspectionChecklistCard;
