import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Check } from 'lucide-react';
import { InspectionSection } from '@/data/bs7671ChecklistData';
import EnhancedInspectionItemRow from './EnhancedInspectionItemRow';
import EnhancedInspectionItemCard from './EnhancedInspectionItemCard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
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

interface EnhancedInspectionSectionCardProps {
  section: InspectionSection;
  inspectionItems: InspectionItem[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateItem: (id: string, field: keyof InspectionItem | '__BULK_UPDATE__', value: any) => void;
  onNavigateToObservations?: () => void;
  onAutoCreateObservation?: (inspectionItem: InspectionItem) => void;
  onBulkMarkSatisfactory?: (sectionId: string) => void;
  onBulkClearSection?: (sectionId: string) => void;
  onBulkMarkNotApplicable?: (sectionId: string) => void;
  quickMarkMode?: boolean;
}

// Data titles are ALL CAPS with trailing regulation refs in parentheses.
// Display them sentence case ("Intake equipment — visual inspection only")
// with reg refs split out as a quiet mono suffix. Data stays untouched.
const formatSectionTitle = (raw: string): { title: string; regRefs?: string } => {
  let text = raw.trim();
  let regRefs: string | undefined;

  const parenMatch = text.match(/\s*\(([^)]*)\)\s*$/);
  if (parenMatch && parenMatch[1].length > 2) {
    if (/\d/.test(parenMatch[1])) {
      regRefs = parenMatch[1];
      text = text.slice(0, parenMatch.index).trim();
    } else {
      text = `${text.slice(0, parenMatch.index).trim()} — ${parenMatch[1].toLowerCase()}`;
    }
  }

  let lower = text.toLowerCase();
  lower = lower.replace(/\bpart (\d)/g, 'Part $1');
  return { title: lower.charAt(0).toUpperCase() + lower.slice(1), regRefs };
};

const EnhancedInspectionSectionCard = ({
  section,
  inspectionItems,
  isExpanded,
  onToggle,
  onUpdateItem,
  onNavigateToObservations,
  onAutoCreateObservation,
  onBulkMarkSatisfactory,
  onBulkClearSection,
  onBulkMarkNotApplicable,
  quickMarkMode,
}: EnhancedInspectionSectionCardProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();

  const handleOutcomeChange = (itemId: string, outcome: InspectionItem['outcome']) => {
    const currentInspectionItem = inspectionItems.find((item) => item.id === itemId);

    if (!currentInspectionItem) {
      return;
    }

    try {
      // Save scroll position before state update to prevent scroll jump
      // Two onUpdate calls fire (items + observations), each triggers re-render
      const scrollY = window.scrollY;
      const restoreScroll = () => window.scrollTo(0, scrollY);

      const updatedItem: InspectionItem = {
        ...currentInspectionItem,
        outcome,
        inspected: outcome !== '' && outcome !== 'not-applicable',
      };

      const allItems = inspectionItems.map((item) => (item.id === itemId ? updatedItem : item));

      onUpdateItem('__BULK_UPDATE__', '__BULK_UPDATE__', allItems);

      if (onAutoCreateObservation) {
        onAutoCreateObservation(updatedItem);
      }

      // Restore scroll after both re-renders complete
      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 50);
      setTimeout(restoreScroll, 150);
    } catch (error) {
      console.error('Error updating outcome:', error);
    }
  };

  const handleBulkAction = (action: 'satisfactory' | 'na' | 'clear') => {
    haptic.light();
    if (action === 'satisfactory' && onBulkMarkSatisfactory) {
      onBulkMarkSatisfactory(section.id);
      haptic.success();
    } else if (action === 'na') {
      if (onBulkMarkNotApplicable) {
        onBulkMarkNotApplicable(section.id);
      } else {
        const allItems = inspectionItems.map((item) =>
          section.items.some((si) => si.id === item.id)
            ? { ...item, outcome: 'not-applicable' as const, inspected: false }
            : item
        );
        onUpdateItem('__BULK_UPDATE__', '__BULK_UPDATE__', allItems);
      }
    } else if (action === 'clear' && onBulkClearSection) {
      onBulkClearSection(section.id);
    }
  };

  const sectionItems = section.items;
  const completedItems = sectionItems.filter((sItem) => {
    const inspectionItem = inspectionItems.find((item) => item.id === sItem.id);
    return inspectionItem?.outcome !== undefined && inspectionItem.outcome !== '';
  });
  const completedCount = completedItems.length;
  const countOutcomes = (codes: string[]) =>
    sectionItems.filter((sItem) => {
      const it = inspectionItems.find((item) => item.id === sItem.id);
      return it?.outcome ? codes.includes(it.outcome) : false;
    }).length;
  const c1c2Count = countOutcomes(['C1', 'C2']);
  const c3Count = countOutcomes(['C3']);
  const satisfactoryCount = countOutcomes(['satisfactory']);
  const isComplete = sectionItems.length > 0 && completedCount === sectionItems.length;
  const allOk = sectionItems.length > 0 && satisfactoryCount === sectionItems.length;

  const { title, regRefs } = formatSectionTitle(section.title);

  const bulkChipCn =
    'h-11 sm:h-9 shrink-0 rounded-lg px-3 text-[12px] font-semibold whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]';

  return (
    <div
      data-section={section.id}
      className="rounded-2xl border border-white/[0.1] bg-white/[0.03] overflow-hidden"
    >
      <Collapsible
        open={isExpanded}
        onOpenChange={() => {
          haptic.light();
          onToggle();
        }}
      >
        {/* Section header — quiet number tile, sentence-case title, quiet count */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className="w-full flex items-center gap-3 p-3.5 text-left touch-manipulation active:scale-[0.99] transition-all">
            {/* Section number / done tile */}
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 bg-white/[0.08] text-white">
              {isComplete ? <Check className="h-4 w-4 text-green-400" /> : section.sectionNumber}
            </span>

            {/* Title + reg refs */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold leading-snug text-white">{title}</h3>
              {regRefs && (
                <span className="font-mono text-[11px] text-white/80">{regRefs}</span>
              )}
            </div>

            {/* Defect badges — visible while collapsed so a section's state
                reads at a glance without expanding it */}
            {(c1c2Count > 0 || c3Count > 0) && (
              <div className="flex items-center gap-1 shrink-0">
                {c1c2Count > 0 && (
                  <span className="rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {c1c2Count}
                  </span>
                )}
                {c3Count > 0 && (
                  <span className="rounded-md bg-elec-yellow px-1.5 py-0.5 text-[10px] font-bold text-black">
                    {c3Count}
                  </span>
                )}
              </div>
            )}

            {/* Progress count */}
            <span className="shrink-0 text-[12px] font-medium tabular-nums text-white/80">
              {completedCount}/{sectionItems.length}
            </span>

            {/* Chevron */}
            <ChevronDown
              className={cn(
                'h-5 w-5 text-white/80 transition-transform duration-200 shrink-0',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Bulk actions — neutral chips; All OK goes solid while the section is fully OK */}
          <div
            className={cn(
              'flex gap-1.5 px-3.5 pb-3',
              isMobile ? 'overflow-x-auto' : ''
            )}
          >
            {onBulkMarkSatisfactory && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBulkAction('satisfactory');
                }}
                className={cn(
                  bulkChipCn,
                  allOk
                    ? 'bg-green-500 border border-green-500 text-black'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white'
                )}
              >
                All OK
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleBulkAction('na');
              }}
              className={cn(bulkChipCn, 'bg-white/[0.06] border border-white/[0.12] text-white')}
            >
              All N/A
            </button>
            {onBulkClearSection && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBulkAction('clear');
                }}
                className={cn(bulkChipCn, 'bg-white/[0.06] border border-white/[0.12] text-white')}
              >
                Clear
              </button>
            )}
          </div>

          {/* Inspection items */}
          <div className={cn('border-t border-white/[0.1]', isMobile ? 'px-2 py-2' : 'p-3')}>
            {/* Desktop — one dense row per item; the chip labels are the column
                signposts. lg: (not md:) so the switch lines up with
                useIsMobile()'s 1024px break — at md the row has no room for the
                item text and no swipe, while the hint below still promised one. */}
            <div className="hidden lg:block space-y-1.5">
              {section.items.map((sectionItem) => {
                const inspectionItem = inspectionItems.find(
                  (item) => item.id === sectionItem.id
                );
                return (
                  <EnhancedInspectionItemRow
                    key={sectionItem.id}
                    sectionItem={sectionItem}
                    inspectionItem={inspectionItem}
                    onUpdateItem={onUpdateItem}
                    onOutcomeChange={handleOutcomeChange}
                    onNavigateToObservations={onNavigateToObservations}
                  />
                );
              })}
            </div>

            {/* Mobile + tablet card view — swipeable, matches useIsMobile() */}
            <div className="lg:hidden space-y-1.5">
              {section.items.map((sectionItem) => {
                const inspectionItem = inspectionItems.find((item) => item.id === sectionItem.id);
                return (
                  <EnhancedInspectionItemCard
                    key={sectionItem.id}
                    sectionItem={sectionItem}
                    inspectionItem={inspectionItem}
                    onUpdateItem={onUpdateItem}
                    onOutcomeChange={handleOutcomeChange}
                    onNavigateToObservations={onNavigateToObservations}
                    quickMarkMode={quickMarkMode}
                  />
                );
              })}
            </div>

            {/* Swipe hint for first section */}
            {isMobile && section.sectionNumber === '1' && (
              <p className="mt-3 text-center text-[11px] text-white">
                Swipe right to mark OK, tap to expand
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EnhancedInspectionSectionCard;
