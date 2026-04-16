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
  const progressPercent =
    sectionItems.length > 0 ? Math.round((completedCount / sectionItems.length) * 100) : 0;
  const isComplete = progressPercent === 100;

  return (
    <div data-section={section.id}>
      <div className="h-[1px] bg-gradient-to-r from-elec-yellow/30 via-elec-yellow/10 to-transparent" />
      <Collapsible
        open={isExpanded}
        onOpenChange={() => {
          haptic.light();
          onToggle();
        }}
      >
        {/* Section Header — clean compact */}
        <CollapsibleTrigger className="w-full" asChild>
          <button
            className="w-full flex items-center gap-2.5 p-3 text-left touch-manipulation active:scale-[0.98] transition-all"
          >
            {/* Section number */}
            <span
              className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0',
                isComplete
                  ? 'bg-green-500/15 text-green-400'
                  : progressPercent > 0
                    ? 'bg-elec-yellow/15 text-elec-yellow'
                    : 'bg-white/[0.06] text-white/80'
              )}
            >
              {isComplete ? <CheckCircle className="h-3.5 w-3.5" /> : section.sectionNumber}
            </span>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3 className={cn('text-sm font-semibold truncate', isComplete ? 'text-green-400' : 'text-white')}>
                {section.title}
              </h3>
            </div>

            {/* Progress */}
            <span className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0',
              isComplete
                ? 'bg-green-500/15 text-green-400'
                : progressPercent > 0
                  ? 'bg-white/[0.06] text-elec-yellow'
                  : 'bg-white/[0.04] text-white'
            )}>
              {completedCount}/{sectionItems.length}
            </span>

            {/* Chevron */}
            <ChevronDown
              className={cn(
                'h-4 w-4 text-white transition-transform duration-200 flex-shrink-0',
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
            <div className="hidden md:block rounded-xl border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-white/5 border-white/10 bg-white/[0.02]">
                    <TableHead className="w-14 text-center text-white text-xs uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="text-left text-white text-xs uppercase tracking-wider">
                      Item & Regulation
                    </TableHead>
                    <TableHead className="w-72 text-left text-white text-xs uppercase tracking-wider">
                      Outcome
                    </TableHead>
                    <TableHead className="text-left text-white text-xs uppercase tracking-wider">
                      Notes
                    </TableHead>
                    <TableHead className="w-24 text-center text-white text-xs uppercase tracking-wider">
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
