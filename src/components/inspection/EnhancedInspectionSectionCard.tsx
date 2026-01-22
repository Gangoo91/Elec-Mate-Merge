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
  const isMobile = useIsMobile();
  const haptics = useHaptics();

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

  const handleBulkAction = (action: 'satisfactory' | 'na' | 'clear') => {
    haptics.tap();
    if (action === 'satisfactory' && onBulkMarkSatisfactory) {
      onBulkMarkSatisfactory(section.id);
      haptics.success();
    } else if (action === 'na') {
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
    } else if (action === 'clear' && onBulkClearSection) {
      onBulkClearSection(section.id);
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
    <div className={cn(isMobile && "-mx-4")}>
      <Collapsible open={isExpanded} onOpenChange={() => { haptics.tap(); onToggle(); }}>
        {/* Section Header - Edge to edge on mobile */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className={cn(
            "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
            "bg-card/50 border-y border-border/30",
            isExpanded && "bg-card/80",
            "active:bg-card/90"
          )}>
            {/* Section Number Badge with Progress Ring */}
            <div className="relative flex-shrink-0">
              {/* Progress ring background */}
              <svg className="w-12 h-12 -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  className="text-border/30"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  strokeDasharray={`${progressPercent * 1.26} 126`}
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-500",
                    isComplete ? "text-green-500" : "text-elec-yellow"
                  )}
                />
              </svg>
              {/* Center content */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center text-sm font-bold",
                isComplete ? "text-green-400" : "text-elec-yellow"
              )}>
                {isComplete ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  section.sectionNumber
                )}
              </div>
            </div>

            {/* Title and Meta */}
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-base truncate transition-colors",
                isComplete ? "text-green-400" : "text-foreground"
              )}>
                {section.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{completedCount}/{sectionItems.length} items</span>
                <span>·</span>
                <span className={cn(
                  "font-medium",
                  isComplete ? "text-green-400" : progressPercent > 0 ? "text-elec-yellow" : ""
                )}>
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Chevron */}
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Quick Actions Bar */}
          <div className={cn(
            "flex gap-2 p-3 bg-card/30 border-b border-border/20",
            isMobile ? "px-4 overflow-x-auto" : ""
          )}>
            {onBulkMarkSatisfactory && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBulkAction('satisfactory');
                }}
                className="h-10 px-3 bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 touch-manipulation whitespace-nowrap"
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
                handleBulkAction('na');
              }}
              className="h-10 px-3 bg-gray-500/10 border-gray-500/30 text-gray-400 hover:bg-gray-500/20 touch-manipulation whitespace-nowrap"
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
                  handleBulkAction('clear');
                }}
                className="h-10 px-3 bg-white/5 border-white/10 text-white/60 hover:bg-white/10 touch-manipulation whitespace-nowrap"
              >
                <RotateCcw className="h-4 w-4 mr-1.5" />
                Clear
              </Button>
            )}
          </div>

          {/* Inspection Items */}
          <div className={cn(isMobile ? "px-4 py-3" : "p-4")}>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-xl border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-white/5 border-white/10 bg-white/[0.02]">
                    <TableHead className="w-14 text-center text-white/50 text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-left text-white/50 text-xs uppercase tracking-wider">Item & Regulation</TableHead>
                    <TableHead className="w-72 text-left text-white/50 text-xs uppercase tracking-wider">Outcome</TableHead>
                    <TableHead className="text-left text-white/50 text-xs uppercase tracking-wider">Notes</TableHead>
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

            {/* Mobile Card View - Compact with swipe */}
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

            {/* Swipe hint for first section */}
            {isMobile && section.sectionNumber === '1' && (
              <div className="mt-4 p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
                <p className="text-xs text-elec-yellow text-center">
                  💡 Swipe right on items to mark OK, tap to expand for more options
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EnhancedInspectionSectionCard;
