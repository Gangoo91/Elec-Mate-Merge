import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
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
  // Notes live behind a toggle so 14 items stay scannable; a saved note keeps
  // its editor open (incl. async hydration — the effect below re-syncs).
  const [showNotes, setShowNotes] = useState(!!item.notes);

  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => onNotesChange(item.id, value), 300);
    setDebounceTimer(timer);
  };

  React.useEffect(() => {
    setLocalNotes(item.notes || '');
    if (item.notes) setShowNotes(true);
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
    <div className="relative overflow-hidden rounded-xl">
      {/* Swipe backgrounds */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className={cn('flex-1 flex items-center px-4', swipeOffset > 20 ? 'opacity-100' : 'opacity-0', 'bg-green-500')}>
          <span className="text-xs font-semibold text-black">Satisfactory</span>
        </div>
        <div className={cn('flex-1 flex items-center justify-end px-4', swipeOffset < -20 ? 'opacity-100' : 'opacity-0', 'bg-white/[0.1]')}>
          <span className="text-xs font-semibold text-white">N/A</span>
        </div>
      </div>

      <div
        {...swipeHandlers}
        style={{ transform: `translateX(${swipeOffset}px)`, transition: swipeOffset === 0 ? 'transform 200ms ease-out' : 'none' }}
        className={cn(
          'relative p-3 sm:py-2.5 border-l-4 bg-white/[0.05] border border-white/[0.1] rounded-xl touch-manipulation',
          getBorderColor(),
        )}
      >
        {/* Mobile: text stacked over the chip row. Desktop: one dense line —
            text left, fixed-width chips + Note toggle right — so 14 items scan
            without a marathon scroll. */}
        <div className="sm:flex sm:items-center sm:gap-3">
          <div className="flex items-start gap-2 sm:flex-1 sm:min-w-0">
            <span className={cn(
              'text-[11px] font-bold mt-0.5 shrink-0 w-5 text-center',
              item.outcome === 'satisfactory' ? 'text-green-400' :
              item.outcome === 'limitation' ? 'text-amber-400' :
              'text-elec-yellow'
            )}>
              {item.itemNumber}
            </span>
            <p className="flex-1 min-w-0 text-[13px] text-white leading-snug">{item.description}</p>
          </div>

          {/* Outcome chips + Note toggle */}
          <div className="mt-2 sm:mt-0 flex items-center gap-1.5 sm:shrink-0 pl-7 sm:pl-0">
            <button
              onClick={() => { haptic.light(); onOutcomeChange(item.id, 'satisfactory'); }}
              className={cn(
                'h-11 flex-1 sm:flex-none sm:w-14 rounded-lg font-semibold text-[12px] transition-all touch-manipulation active:scale-[0.97] flex items-center justify-center',
                item.outcome === 'satisfactory'
                  ? 'bg-green-500 border border-green-500 text-black'
                  : 'bg-white/[0.06] border border-white/[0.12] text-white'
              )}
            >
              Sat
            </button>
            <button
              onClick={() => { haptic.light(); onOutcomeChange(item.id, 'not-applicable'); }}
              className={cn(
                'h-11 flex-1 sm:flex-none sm:w-14 rounded-lg font-semibold text-[12px] transition-all touch-manipulation active:scale-[0.97]',
                item.outcome === 'not-applicable'
                  ? 'bg-white/[0.18] border border-white/[0.25] text-white'
                  : 'bg-white/[0.06] border border-white/[0.12] text-white'
              )}
            >
              N/A
            </button>
            <button
              onClick={() => { haptic.warning(); onOutcomeChange(item.id, 'limitation'); }}
              className={cn(
                'h-11 flex-1 sm:flex-none sm:w-14 rounded-lg font-semibold text-[12px] transition-all touch-manipulation active:scale-[0.97]',
                item.outcome === 'limitation'
                  ? 'bg-amber-500 border border-amber-500 text-black'
                  : 'bg-white/[0.06] border border-white/[0.12] text-white'
              )}
            >
              LIM
            </button>
            <button
              onClick={() => setShowNotes((v) => !v)}
              aria-expanded={showNotes}
              className={cn(
                'h-11 px-2.5 rounded-lg text-[12px] font-semibold transition-all touch-manipulation active:scale-[0.97] shrink-0',
                showNotes || localNotes
                  ? 'text-elec-yellow'
                  : 'text-white'
              )}
            >
              Note
            </button>
          </div>
        </div>

        {/* Notes — collapsed behind the toggle; open rows keep the soft area */}
        {showNotes && (
          <div className="mt-2 pl-7 sm:pl-7">
            <Textarea
              placeholder="Notes (optional)…"
              value={localNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="textarea-soft min-h-[44px] resize-none rounded-xl border-0 bg-white/[0.05] px-3 py-2.5 text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none touch-manipulation"
            />
          </div>
        )}
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
    <div className="space-y-2">
      <p className="text-[11px] text-white sm:hidden">
        Swipe right for satisfactory, swipe left for N/A
      </p>
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
