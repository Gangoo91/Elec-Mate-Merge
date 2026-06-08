import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, CheckCheck, RotateCcw, Ban, CheckCircle } from 'lucide-react';
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
  const progressPercent =
    sectionItems.length > 0 ? Math.round((completedCount / sectionItems.length) * 100) : 0;
  const isComplete = progressPercent === 100;

  return (
    <div
      data-section={section.id}
      className={cn(
        'rounded-2xl border overflow-hidden transition-colors',
        isComplete
          ? 'border-green-500/20 bg-green-500/[0.03]'
          : isExpanded
            ? 'border-elec-yellow/25 bg-white/[0.035]'
            : 'border-white/[0.08] bg-white/[0.025] hover:border-white/[0.14]'
      )}
    >
      <Collapsible
        open={isExpanded}
        onOpenChange={() => {
          haptic.light();
          onToggle();
        }}
      >
        {/* Section Header — number badge, title, inline progress bar */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className="w-full flex items-center gap-3 p-3.5 text-left touch-manipulation active:scale-[0.99] transition-all">
            {/* Section number / done badge */}
            <span
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ring-1',
                isComplete
                  ? 'bg-green-500/15 text-green-400 ring-green-500/30'
                  : progressPercent > 0
                    ? 'bg-elec-yellow/15 text-elec-yellow ring-elec-yellow/30'
                    : 'bg-white/[0.06] text-white/80 ring-white/10'
              )}
            >
              {isComplete ? <CheckCircle className="h-4 w-4" /> : section.sectionNumber}
            </span>

            {/* Title + progress bar */}
            <div className="flex-1 min-w-0">
              <h3 className={cn('text-sm font-semibold truncate', isComplete ? 'text-green-400' : 'text-white')}>
                {section.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-white/[0.07] overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-300',
                      isComplete ? 'bg-green-500/80' : 'bg-elec-yellow/80'
                    )}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-bold tabular-nums flex-shrink-0',
                    isComplete ? 'text-green-400' : progressPercent > 0 ? 'text-elec-yellow' : 'text-white/45'
                  )}
                >
                  {completedCount}/{sectionItems.length}
                </span>
              </div>
            </div>

            {/* Defect badges — visible while collapsed so a section's state
                reads at a glance without expanding it */}
            {(c1c2Count > 0 || c3Count > 0) && (
              <div className="flex items-center gap-1 flex-shrink-0">
                {c1c2Count > 0 && (
                  <span className="text-[10px] font-bold text-red-400 bg-red-500/15 border border-red-500/25 px-1.5 py-0.5 rounded-md">
                    {c1c2Count}
                  </span>
                )}
                {c3Count > 0 && (
                  <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/15 border border-yellow-500/25 px-1.5 py-0.5 rounded-md">
                    {c3Count}
                  </span>
                )}
              </div>
            )}

            {/* Chevron */}
            <ChevronDown
              className={cn(
                'h-5 w-5 text-white/60 transition-transform duration-200 flex-shrink-0',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Quick Actions Bar */}
          <div
            className={cn(
              'flex gap-1.5 p-2 border-b border-white/[0.06]',
              isMobile ? 'px-3 overflow-x-auto' : ''
            )}
          >
            {onBulkMarkSatisfactory && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBulkAction('satisfactory');
                }}
                className="h-9 px-3 rounded-lg bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 touch-manipulation whitespace-nowrap text-xs font-semibold active:scale-[0.98]"
              >
                All OK
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleBulkAction('na');
              }}
              className="h-9 px-3 rounded-lg bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.06] touch-manipulation whitespace-nowrap text-xs font-semibold active:scale-[0.98]"
            >
              All N/A
            </Button>
            {onBulkClearSection && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBulkAction('clear');
                }}
                className="h-9 px-3 rounded-lg bg-white/[0.03] border-white/[0.06] text-white hover:bg-white/[0.06] touch-manipulation whitespace-nowrap text-xs font-semibold active:scale-[0.98]"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Inspection Items */}
          <div className="h-[1px] bg-gradient-to-r from-elec-yellow/20 to-transparent" />
          <div className={cn(isMobile ? 'px-2 py-2' : 'p-4')}>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-xl border border-white/10 overflow-hidden bg-black/20">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/10 bg-white/[0.03]">
                    <TableHead className="pl-4 text-left text-white/55 text-[11px] font-semibold uppercase tracking-wider">
                      Item &amp; Regulation
                    </TableHead>
                    <TableHead className="w-[440px] text-left text-white/55 text-[11px] font-semibold uppercase tracking-wider">
                      Outcome
                    </TableHead>
                    <TableHead className="text-left text-white/55 text-[11px] font-semibold uppercase tracking-wider">
                      Notes
                    </TableHead>
                    <TableHead className="w-24 text-center text-white/55 text-[11px] font-semibold uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
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
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-1.5">
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
              <p className="mt-3 text-[10px] text-white text-center">
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
