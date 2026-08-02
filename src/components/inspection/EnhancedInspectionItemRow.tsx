import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InspectionItem as BaseInspectionItem } from '@/data/bs7671ChecklistData';
import EnhancedInspectionOutcomeSelect from './EnhancedInspectionOutcomeSelect';
import { cn } from '@/lib/utils';

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

interface EnhancedInspectionItemRowProps {
  sectionItem: BaseInspectionItem;
  inspectionItem?: InspectionItem;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
  onNavigateToObservations?: () => void;
}

const EnhancedInspectionItemRow: React.FC<EnhancedInspectionItemRowProps> = ({
  sectionItem,
  inspectionItem,
  onUpdateItem,
  onOutcomeChange,
  onNavigateToObservations,
}) => {
  const [localNotes, setLocalNotes] = React.useState(inspectionItem?.notes || '');
  const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
  // Notes live behind a toggle so 66 items stay scannable; a saved note keeps
  // its editor open (incl. async hydration — the effect below re-syncs).
  const [showNotes, setShowNotes] = React.useState(!!inspectionItem?.notes);

  const currentOutcome = inspectionItem?.outcome || '';

  // Sync local notes when inspection item changes
  React.useEffect(() => {
    setLocalNotes(inspectionItem?.notes || '');
    if (inspectionItem?.notes) setShowNotes(true);
  }, [inspectionItem?.notes]);

  // Handle notes input with debouncing
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

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const isCriticalOutcome = ['C1', 'C2', 'C3'].includes(currentOutcome);

  return (
    <div
      className={cn(
        'p-3 sm:py-2.5 border-l-4 bg-white/[0.05] border border-white/[0.1] rounded-xl touch-manipulation',
        outcomeBorderL[currentOutcome] || 'border-l-transparent'
      )}
    >
      {/* One dense line — text left, fixed-width chips + quiet actions right */}
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-1 items-start gap-2 min-w-0 text-left">
                <span className="mt-0.5 w-9 shrink-0 text-center font-mono text-[11px] font-bold text-elec-yellow">
                  {sectionItem.number}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug text-white">{sectionItem.item}</p>
                  {sectionItem.clause && (
                    <span className="font-mono text-[11px] text-white/80">
                      {sectionItem.clause}
                    </span>
                  )}
                </div>
              </div>
            </TooltipTrigger>
            {sectionItem.description && (
              <TooltipContent className="max-w-sm bg-card border-white/10">
                <p className="text-xs text-white">{sectionItem.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <div className="flex shrink-0 items-center gap-1.5">
          <EnhancedInspectionOutcomeSelect
            itemId={sectionItem.id}
            currentOutcome={currentOutcome}
            onOutcomeChange={onOutcomeChange}
            compact={true}
          />
          {isCriticalOutcome && onNavigateToObservations && (
            <button
              type="button"
              onClick={onNavigateToObservations}
              className="h-9 shrink-0 rounded-lg px-2 text-[12px] font-semibold text-white transition-all touch-manipulation active:scale-[0.97]"
            >
              Obs
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowNotes((v) => !v)}
            aria-expanded={showNotes}
            className={cn(
              'h-9 shrink-0 rounded-lg px-2 text-[12px] font-semibold transition-all touch-manipulation active:scale-[0.97]',
              showNotes || localNotes ? 'text-elec-yellow' : 'text-white'
            )}
          >
            Note
          </button>
        </div>
      </div>

      {/* Notes — collapsed behind the toggle; open rows keep the soft area */}
      {showNotes && (
        <div className="mt-2 pl-11">
          <Textarea
            placeholder="Notes (optional)…"
            value={localNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="textarea-soft min-h-[44px] resize-none rounded-xl border-0 bg-white/[0.05] px-3 py-2.5 text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none touch-manipulation"
          />
        </div>
      )}
    </div>
  );
};

export default EnhancedInspectionItemRow;
