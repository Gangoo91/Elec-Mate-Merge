import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, CheckCheck, RotateCcw, Ban, Zap, Shield, AlertTriangle } from 'lucide-react';
import { InspectionSection } from '@/data/bs7671ChecklistData';
import EnhancedInspectionItemRow from './EnhancedInspectionItemRow';
import EnhancedInspectionItemCard from './EnhancedInspectionItemCard';
import InspectionSectionProgress from '../InspectionSectionProgress';

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
    }
  };

  const getSectionIcon = (sectionNumber: string) => {
    switch (sectionNumber) {
      case '1': return <Zap className="h-5 w-5 text-bs7671-earth" />;
      case '2': return <Shield className="h-5 w-5 text-bs7671-info" />;
      case '3': return <Shield className="h-5 w-5 text-bs7671-safe" />;
      case '4': return <Shield className="h-5 w-5 text-bs7671-info" />;
      case '5': return <Zap className="h-5 w-5 text-bs7671-warning" />;
      default: return <AlertTriangle className="h-5 w-5 text-bs7671-caution" />;
    }
  };

  const getSectionPriority = (sectionNumber: string): 'critical' | 'important' | 'standard' => {
    const num = parseInt(sectionNumber);
    if ([1, 3, 5].includes(num)) return 'critical';
    if ([2, 4, 7, 10].includes(num)) return 'important';
    return 'standard';
  };

  const sectionPriority = getSectionPriority(section.sectionNumber);
  const sectionItems = section.items;
  const completedItems = sectionItems.filter(sItem => {
    const inspectionItem = inspectionItems.find(item => item.id === sItem.id);
    return inspectionItem?.outcome !== undefined && inspectionItem.outcome !== '';
  });
  const completedCount = completedItems.length;
  const progressPercent = sectionItems.length > 0 ? Math.round((completedCount / sectionItems.length) * 100) : 0;

  return (
    <div className="relative">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <div className={`rounded-xl border-2 transition-all duration-300 bg-card/95 backdrop-blur-sm ${
          sectionPriority === 'critical' 
            ? 'border-bs7671-earth/50' 
            : sectionPriority === 'important'
            ? 'border-bs7671-info/50'
            : 'border-border/50'
        } ${isExpanded ? 'shadow-2xl' : 'shadow-lg'}`}>
          
          {/* Header Section - Clean and Professional */}
          <CollapsibleTrigger className="w-full" asChild>
            <button 
              className="w-full text-left hover:bg-muted/30 transition-colors rounded-t-xl group min-h-11 touch-manipulation"
              aria-expanded={isExpanded}
              aria-controls={`section-${section.id}-content`}
            >
              <div className="px-3 py-1.5 sm:px-5 sm:py-2">
                {/* Mobile-optimized Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  {/* Top Row: Icon + Title + Chevron */}
                  <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                    {/* Icon Badge - Smaller on mobile */}
                    <div className={`flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                      sectionPriority === 'critical' 
                        ? 'bg-bs7671-earth/15 border border-bs7671-earth/30' 
                        : sectionPriority === 'important'
                        ? 'bg-bs7671-info/15 border border-bs7671-info/30'
                        : 'bg-primary/10 border border-primary/20'
                    }`}>
                      <div className="scale-90 sm:scale-100">
                        {getSectionIcon(section.sectionNumber)}
                      </div>
                    </div>
                    
                    {/* Title, Description and Meta */}
                    <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                      <div className="flex items-start justify-between gap-2 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-1.5 sm:gap-2 flex-nowrap min-w-0">
                          <span className="truncate">{section.sectionNumber}: {section.title}</span>
                          {sectionPriority === 'critical' && (
                            <Badge variant="destructive" className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 font-bold uppercase">
                              Critical
                            </Badge>
                          )}
                          {sectionPriority === 'important' && (
                            <Badge className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 font-bold uppercase bg-blue-500/20 text-blue-400 border-blue-500/40">
                              Important
                            </Badge>
                          )}
                        </h3>
                        
                        {/* Mobile: Chevron next to title */}
                        <div className="sm:hidden text-muted-foreground transition-transform group-hover:translate-y-0.5">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {section.description}
                        </p>
                      )}
                      
                      {/* Meta Info - Stacked on mobile */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[11px] sm:text-xs">
                        <span className="text-muted-foreground font-medium">
                          BS 7671:18+A3:2024
                        </span>
                        <span className="text-muted-foreground">
                          <span className="font-semibold text-foreground">{completedCount}</span>
                          <span className="mx-0.5">/</span>
                          <span>{sectionItems.length}</span>
                          <span className="ml-1">items</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop: Progress & Chevron on right */}
                  <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                    <div className={`text-2xl font-bold tabular-nums transition-colors ${
                      progressPercent === 100 ? 'text-green-500' : 
                      progressPercent > 0 ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {progressPercent}%
                    </div>
                    
                    <div className="text-muted-foreground transition-transform group-hover:translate-y-0.5">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  
                  {/* Mobile: Progress bar at bottom */}
                  <div className="sm:hidden">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-muted-foreground font-medium">Progress</span>
                      <span className={`text-sm font-bold tabular-nums ${
                        progressPercent === 100 ? 'text-green-500' : 
                        progressPercent > 0 ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          progressPercent === 100 ? 'bg-green-500' : 'bg-primary'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            {/* Quick Actions Bar */}
            <div className="px-3 py-2 sm:px-5 sm:py-3 border-t border-border">
              <div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4 bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-bs7671-earth" />
                  <span className="font-semibold sm:font-bold text-sm sm:text-base text-foreground">Quick Actions</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  {onBulkMarkSatisfactory && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onBulkMarkSatisfactory(section.id);
                      }}
                      className="bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-500/70 font-semibold"
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Mark All Satisfactory
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
                            ? { ...item, outcome: 'not-applicable', inspected: false }
                            : item
                        );
                        onUpdateItem('__BULK_UPDATE__', '__BULK_UPDATE__', allItems);
                      }
                    }}
                    className="bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/70 font-semibold"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Mark All N/A
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
                      className="bg-muted/30 border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground font-semibold"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Inspection Items Section */}
            <div className="px-5 pb-5">
              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-border hover:bg-muted/30">
                      <TableHead className="w-16 text-center font-semibold text-foreground">✓</TableHead>
                      <TableHead className="font-semibold text-foreground">Item & Description</TableHead>
                      <TableHead className="w-40 font-semibold text-foreground">BS 7671 Clause</TableHead>
                      <TableHead className="w-56 font-semibold text-foreground">Outcome</TableHead>
                      <TableHead className="font-semibold text-foreground">Notes & Observations</TableHead>
                      <TableHead className="w-32 font-semibold text-foreground text-center">Actions</TableHead>
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
              <div className="md:hidden space-y-3">
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
        </div>
      </Collapsible>
    </div>
  );
};

export default EnhancedInspectionSectionCard;