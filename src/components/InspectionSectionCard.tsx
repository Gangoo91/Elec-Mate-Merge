
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, CheckCheck, RotateCcw } from 'lucide-react';
import { InspectionSection } from '@/data/bs7671ChecklistData';
import EnhancedInspectionSectionCard from './inspection/EnhancedInspectionSectionCard';
import InspectionItemRow from './InspectionItemRow';
import InspectionItemCard from './InspectionItemCard';
import InspectionSectionProgress from './InspectionSectionProgress';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface InspectionSectionCardProps {
  section: InspectionSection;
  inspectionItems: InspectionItem[];
  isExpanded: boolean;
  onToggle: () => void;
  onUpdateItem: (id: string, field: keyof InspectionItem | '__BULK_UPDATE__', value: any) => void;
  onNavigateToObservations?: () => void;
  onAutoCreateObservation?: (inspectionItem: InspectionItem) => void;
  onBulkMarkSatisfactory?: (sectionId: string) => void;
  onBulkClearSection?: (sectionId: string) => void;
}

const InspectionSectionCard = ({ 
  section, 
  inspectionItems, 
  isExpanded, 
  onToggle, 
  onUpdateItem,
  onNavigateToObservations,
  onAutoCreateObservation,
  onBulkMarkSatisfactory,
  onBulkClearSection
}: InspectionSectionCardProps) => {
  const handleOutcomeChange = (itemId: string, outcome: InspectionItem['outcome']) => {
    console.log(`[InspectionSectionCard] handleOutcomeChange called:`, {
      itemId,
      newOutcome: outcome,
      timestamp: new Date().toISOString()
    });
    
    // Find the current inspection item
    const currentInspectionItem = inspectionItems.find(item => item.id === itemId);
    console.log(`[InspectionSectionCard] Current inspection item:`, currentInspectionItem);
    
    if (!currentInspectionItem) {
      console.warn(`[InspectionSectionCard] Could not find inspection item ${itemId}`);
      return;
    }

    try {
      // Create the updated item with all changes atomically
      const updatedItem: InspectionItem = {
        ...currentInspectionItem,
        outcome,
        inspected: outcome !== '' && outcome !== 'not-applicable'
      };

      console.log(`[InspectionSectionCard] Updated item to be saved:`, updatedItem);

      // Update the entire item atomically using a single call
      // This ensures both outcome and inspected status are updated together
      const allItems = inspectionItems.map(item => 
        item.id === itemId ? updatedItem : item
      );
      
      // Use the bulk update mechanism to update the entire items array at once
      onUpdateItem('__BULK_UPDATE__', '__BULK_UPDATE__', allItems);
      
      // Create observation for C1/C2/C3 outcomes using the updated item data
      if ((outcome === 'C1' || outcome === 'C2' || outcome === 'C3') && onAutoCreateObservation) {
        console.log(`[InspectionSectionCard] Auto-creating observation for ${outcome}:`, updatedItem);
        onAutoCreateObservation(updatedItem);
      }
      
      console.log(`[InspectionSectionCard] handleOutcomeChange completed successfully for ${itemId}`);
    } catch (error) {
      console.error(`[InspectionSectionCard] Error in handleOutcomeChange:`, error);
    }
  };

  console.log(`[InspectionSectionCard] Rendering section ${section.id} with ${inspectionItems.length} items`);

  // Use enhanced component for better UX
  return (
    <EnhancedInspectionSectionCard
      section={section}
      inspectionItems={inspectionItems}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onUpdateItem={onUpdateItem}
      onNavigateToObservations={onNavigateToObservations}
      onAutoCreateObservation={onAutoCreateObservation}
      onBulkMarkSatisfactory={onBulkMarkSatisfactory}
      onBulkClearSection={onBulkClearSection}
    />
  );

  // Fallback to original implementation if needed
  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div className="bg-background/50 hover:bg-background/80 border border-border/50 rounded-lg transition-colors">
        <CollapsibleTrigger className="w-full">
          <div className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left flex-1 min-w-0">
                  <h4 className="font-semibold text-base sm:text-lg text-primary leading-tight break-words">
                    Section {section.sectionNumber}: {section.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed break-words">
                    {section.description}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                  <InspectionSectionProgress 
                    sectionItems={section.items}
                    inspectionItems={inspectionItems}
                  />
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  )}
                </div>
              </div>
              
              {/* Bulk Action Buttons */}
              {isExpanded && (onBulkMarkSatisfactory || onBulkClearSection) && (
                <div 
                  className="flex flex-wrap gap-3 pt-3 border-t border-border/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  {onBulkMarkSatisfactory && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onBulkMarkSatisfactory(section.id);
                      }}
                      className="h-9 px-4 text-sm bg-green-50/80 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400"
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Mark All Satisfactory
                    </Button>
                  )}
                  {onBulkClearSection && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onBulkClearSection(section.id);
                      }}
                      className="h-9 px-4 text-sm"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-2 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8">✓</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="w-20">Clause</TableHead>
                    <TableHead className="w-48">Outcome</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.items.map((sectionItem) => {
                    const inspectionItem = inspectionItems.find(item => item.id === sectionItem.id);
                    
                    return (
                      <InspectionItemRow
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
                  <InspectionItemCard
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
      </div>
    </Collapsible>
  );
};

export default InspectionSectionCard;
