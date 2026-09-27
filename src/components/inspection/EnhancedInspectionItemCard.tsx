import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Check, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import InspectionPhotoUpload from './InspectionPhotoUpload';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

// Left-edge accent per outcome — status at a glance without a tinted wash
const outcomeBorderL: Record<string, string> = {
  satisfactory: 'border-l-green-500',
  C1: 'border-l-red-600',
  C2: 'border-l-orange-500',
  C3: 'border-l-elec-yellow',
  FI: 'border-l-blue-500',
  'not-applicable': 'border-l-white/[0.2]',
  'not-verified': 'border-l-white/[0.2]',
  limitation: 'border-l-amber-500',
};

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
  /** Passed by the EICR (its route carries no id); other routes fall back to `:id`. */
  reportId?: string;
}

const EnhancedInspectionItemCard: React.FC<EnhancedInspectionItemCardProps> = ({
  sectionItem,
  inspectionItem,
  onUpdateItem,
  onOutcomeChange,
  onNavigateToObservations,
  quickMarkMode,
  reportId: reportIdProp,
}) => {
  const haptic = useHaptic();
  const [localNotes, setLocalNotes] = useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentOutcome = inspectionItem?.outcome || '';

  /*
   * ELE-1617 — a photo is evidence, not a verdict. Alex's workaround was to
   * mark an item LIM, set an observation to N/A, then mark it OK again just to
   * reach the camera. On the phone there was no camera at all; the desktop
   * row has had one for a while. Same hook, same storage (inspection_photos,
   * keyed by report + item), so the PDF appendix picks these up too.
   */
  const { id: routeParamId } = useParams();
  const routeReportId = reportIdProp || routeParamId;
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const { photos, isUploading, uploadPhoto } = useInspectionPhotos({
    reportId: routeReportId || '',
    reportType: 'eicr',
    itemId: sectionItem.id,
  });
  const handlePhotoCapture = async (file: File) => {
    const faultCode = ['C1', 'C2', 'C3', 'limitation'].includes(currentOutcome)
      ? (currentOutcome as 'C1' | 'C2' | 'C3' | 'limitation')
      : undefined;
    await uploadPhoto(file, faultCode, localNotes);
    setShowPhotoUpload(false);
  };

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
      /*
       * ELE-1529 — a classified item folds to its summary row. On a long EICR
       * every item left open after coding is another screen of chips to scroll
       * past; the code is now on the row, and a tap reopens it for notes.
       */
      setIsExpanded(false);
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

  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Swipe background indicators */}
      <div className="absolute inset-0 flex pointer-events-none">
        {/* Left swipe - show options */}
        <div
          className={cn(
            'flex-1 flex items-center justify-end px-4 transition-opacity',
            swipeOffset < -20 ? 'opacity-100' : 'opacity-0',
            'bg-white/[0.1]'
          )}
        >
          <span className="text-xs font-semibold text-white">Options</span>
        </div>
        {/* Right swipe - mark OK */}
        <div
          className={cn(
            'flex-1 flex items-center justify-start px-4 transition-opacity',
            swipeOffset > 20 ? 'opacity-100' : 'opacity-0',
            'bg-green-500'
          )}
        >
          <Check className="h-4 w-4 text-black mr-2" />
          <span className="text-xs font-semibold text-black">OK</span>
        </div>
      </div>

      {/* Main card content */}
      <div
        {...swipeHandlers}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: swipeOffset === 0 ? 'transform 200ms ease-out' : 'none',
        }}
        className={cn(
          'relative border-l-4 rounded-xl bg-white/[0.05] border border-white/[0.1] touch-manipulation',
          flashRed && 'ring-2 ring-red-600',
          outcomeBorderL[currentOutcome] || 'border-l-transparent'
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
          className="w-full p-3 flex items-center gap-2.5 text-left touch-manipulation"
        >
          {/* Item number — quiet fixed-width lead slot; the left edge carries state */}
          <span className="w-9 shrink-0 text-center font-mono text-[11px] font-bold text-elec-yellow">
            {sectionItem.number}
          </span>

          {/* Item title */}
          <div className="flex-1 min-w-0 text-left">
            <p
              className={cn(
                'text-[13px] text-white leading-snug text-left',
                !isExpanded && 'line-clamp-2'
              )}
            >
              {sectionItem.item}
            </p>
            {sectionItem.clause && (
              <span className="block text-left font-mono text-[11px] text-white/80">
                {sectionItem.clause}
              </span>
            )}
          </div>

          {/* ELE-1529 — the code, visible on the folded row */}
          {!isExpanded && currentOutcome ? (
            <span
              className={cn(
                'shrink-0 rounded-md px-2 py-1 text-[11px] font-bold leading-none',
                outcomeChipOn[currentOutcome] || 'bg-white/[0.12] text-white'
              )}
            >
              {outcomeOptions.find((o) => o.value === currentOutcome)?.label ?? currentOutcome}
            </span>
          ) : null}

          {/* Expand indicator */}
          <ChevronRight
            className={cn(
              'h-4 w-4 text-white/80 transition-transform shrink-0',
              isExpanded && 'rotate-90'
            )}
          />
        </button>

        {/* Outcome chips — full-width wrap row, solid when selected.
            ELE-1529: hidden on a folded, classified row; the badge above carries the code. */}
        {(isExpanded || !currentOutcome) && (
          <div className="px-3 pb-3 grid grid-cols-4 gap-1.5">
            {outcomeOptions.map((option) => {
              const isActive = currentOutcome === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOutcomeClick(option.value)}
                  className={cn(
                    'h-11 rounded-lg text-[12px] font-semibold flex items-center justify-center transition-all touch-manipulation active:scale-[0.97]',
                    isActive ? outcomeChipOn[option.value] : outcomeChipOff
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-3 pb-3 space-y-2 border-t border-white/[0.1] pt-3">
            <Textarea
              placeholder="Notes (optional)…"
              value={localNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={2}
              className="textarea-soft min-h-[60px] resize-none rounded-xl border-0 bg-white/[0.05] px-3 py-2.5 text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none touch-manipulation"
            />

            {/* ELE-1617 — evidence photo on any item, whatever its outcome */}
            <button
              type="button"
              onClick={() => setShowPhotoUpload((v) => !v)}
              disabled={!routeReportId}
              className="h-11 w-full rounded-lg bg-white/[0.06] border border-white/[0.12] text-[12px] font-semibold text-white transition-all touch-manipulation active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Camera className="h-4 w-4" />
              {routeReportId
                ? photos.length > 0
                  ? `Photo evidence (${photos.length})`
                  : 'Add photo evidence'
                : 'Save the report once to add photos'}
            </button>
            {showPhotoUpload && routeReportId && (
              <InspectionPhotoUpload
                onPhotoCapture={handlePhotoCapture}
                isUploading={isUploading}
              />
            )}

            {/* View observations — only for C1/C2/C3 */}
            {isCriticalOutcome && onNavigateToObservations && (
              <button
                type="button"
                onClick={onNavigateToObservations}
                className="h-11 w-full rounded-lg bg-white/[0.06] border border-white/[0.12] text-[12px] font-semibold text-white transition-all touch-manipulation active:scale-[0.97]"
              >
                View observations
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedInspectionItemCard;
