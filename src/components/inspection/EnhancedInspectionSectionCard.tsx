import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, CheckCheck, RotateCcw, Ban, CheckCircle } from 'lucide-react';
import { InspectionSection } from '@/data/bs7671ChecklistData';
import EnhancedInspectionItemRow from './EnhancedInspectionItemRow';
import EnhancedInspectionItemCard from './EnhancedInspectionItemCard';
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
  onBulkMarkNotApplicable
}: EnhancedInspectionSectionCardProps) => {
  const handleOutcomeChange = (itemId: string, outcome: InspectionItem['outcome']) => {
    const currentInspectionItem = inspectionItems.find(item => item.id === itemId);

    if (!currentInspectionItem) {
      console.warn(`[EnhancedInspectionSectionCard] Could not find inspection item ${itemId}`);
      return;
    }

    try {
      const updatedItem: InspectionItem = {
        ...currentInspectionItem,
        outcome,
        inspected: outcome !== '' && outcome !== 'not-applicable'
      };

      const allItems = inspectionItems.map(item =>
        item.id === itemId ? updatedItem : item
      );

      onUpdateItem('__BULK_UPDATE__', '__BULK_UPDATE__', allItems);

      if ((outcome === 'C1' || outcome === 'C2' || outcome === 'C3') && onAutoCreateObservation) {
        onAutoCreateObservation(updatedItem);
      }
    } catch (error) {
      console.error('Error updating outcome:', error);
    }
  };

  const sectionItems = section.items;
  const completedItems = sectionItems.filter(sItem => {
    const inspectionItem = inspectionItems.find(item => item.id === sItem.id);
    return inspectionItem?.outcome !== undefined && inspectionItem.outcome !== '';
  });
  const completedCount = completedItems.length;
  const progressPercent = sectionItems.length > 0 ? Math.round((completedCount / sectionItems.length) * 100) : 0;
  const isComplete = progressPercent === 100;

  return (
    <div className="eicr-section-card">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        {/* Golden accent line */}
        <div className={cn(
          "h-0.5 w-full transition-all duration-300",
          isComplete ? "eicr-section-accent-complete" : "eicr-section-accent"
        )} />

        {/* Section Header */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className="eicr-inspection-section-header">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Section Number Badge */}
              <div className={cn(
                "eicr-section-number flex-shrink-0",
                isComplete && "bg-green-500/15 text-green-400"
              )}>
                {isComplete ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  section.sectionNumber
                )}
              </div>

              {/* Title and Meta */}
              <div className="flex-1 min-w-0 text-left">
                <h3 className={cn(
                  "font-semibold text-sm sm:text-base truncate transition-colors",
                  isComplete ? "text-green-400" : "text-white"
                )}>
                  {section.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/50 mt-0.5">
                  <span>{completedCount}/{sectionItems.length} items</span>
                  {section.specialNote && (
                    <>
                      <span className="text-white/30">·</span>
                      <span className="text-elec-yellow/70 truncate">{section.specialNote}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: Progress + Chevron */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Progress percentage (desktop) */}
              <span className={cn(
                "hidden sm:block text-lg font-bold tabular-nums",
                isComplete ? "text-green-400" : progressPercent > 0 ? "text-elec-yellow" : "text-white/40"
              )}>
                {progressPercent}%
              </span>

              {/* Chevron */}
              <div className={cn(
                "p-1.5 rounded-lg transition-all duration-200",
                "group-hover:bg-white/10"
              )}>
                <ChevronDown className={cn(
                  "h-5 w-5 text-white/50 transition-all duration-300",
                  isExpanded && "rotate-180 text-elec-yellow"
                )} />
              </div>
            </div>
          </button>
        </CollapsibleTrigger>

        {/* Progress bar (mobile) */}
        {!isExpanded && (
          <div className="sm:hidden px-4 pb-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/50">Progress</span>
              <span className={cn(
                "font-semibold",
                isComplete ? "text-green-400" : "text-elec-yellow"
              )}>{progressPercent}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-500 rounded-full",
                  isComplete ? "bg-green-500" : "bg-elec-yellow"
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <CollapsibleContent>
          {/* Quick Actions Bar */}
          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {onBulkMarkSatisfactory && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onBulkMarkSatisfactory(section.id);
                  }}
                  className="h-9 bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                >
                  <CheckCheck className="h-4 w-4 mr-1.5" />
                  All OK
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onBulkMarkNotApplicable) {
                    onBulkMarkNotApplicable(section.id);
                  } else {
                    const allItems = inspectionItems.map(item =>
                      section.items.some(si => si.id === item.id)
                        ? { ...item, outcome: 'not-applicable' as const, inspected: false }
                        : item
                    );
                    onUpdateItem('__BULK_UPDATE__', '__BULK_UPDATE__', allItems);
                  }
                }}
                className="h-9 bg-gray-500/10 border-gray-500/30 text-gray-400 hover:bg-gray-500/20 hover:border-gray-500/50"
              >
                <Ban className="h-4 w-4 mr-1.5" />
                All N/A
              </Button>
              {onBulkClearSection && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onBulkClearSection(section.id);
                  }}
                  className="h-9 bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-1.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Inspection Items */}
          <div className="px-4 pb-4">
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-xl border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-white/5 border-white/10 bg-white/[0.02]">
                    <TableHead className="w-14 text-center text-white/50 text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider">Item & Regulation</TableHead>
                    <TableHead className="w-72 text-white/50 text-xs uppercase tracking-wider">Outcome</TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider">Notes</TableHead>
                    <TableHead className="w-24 text-center text-white/50 text-xs uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.items.map((sectionItem) => {
                    const inspectionItem = inspectionItems.find(item => item.id === sectionItem.id);
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
            <div className="md:hidden space-y-2">
              {section.items.map((sectionItem) => {
                const inspectionItem = inspectionItems.find(item => item.id === sectionItem.id);
                return (
                  <EnhancedInspectionItemCard
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
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EnhancedInspectionSectionCard;
