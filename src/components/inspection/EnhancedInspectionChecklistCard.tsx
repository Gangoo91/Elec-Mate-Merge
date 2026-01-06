import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';
import { filterInspectionSections } from '@/utils/inspectionFiltering';
import EnhancedInspectionSectionCard from './EnhancedInspectionSectionCard';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface EnhancedInspectionChecklistCardProps {
  inspectionItems: InspectionItem[];
  expandedSections: Record<string, boolean>;
  onToggleSection: (sectionId: string) => void;
  onUpdateItem: (id: string, field: keyof InspectionItem | '__BULK_UPDATE__', value: any) => void;
  onNavigateToObservations?: () => void;
  onAutoCreateObservation?: (inspectionItem: InspectionItem) => void;
  onBulkMarkSatisfactory?: (sectionId: string) => void;
  onBulkClearSection?: (sectionId: string) => void;
  onBulkMarkNotApplicable?: (sectionId: string) => void;
  propertyType?: string;
}

const EnhancedInspectionChecklistCard: React.FC<EnhancedInspectionChecklistCardProps> = ({
  inspectionItems,
  expandedSections,
  onToggleSection,
  onUpdateItem,
  onNavigateToObservations,
  onAutoCreateObservation,
  onBulkMarkSatisfactory,
  onBulkClearSection,
  onBulkMarkNotApplicable,
  propertyType
}) => {
  // Show all sections - no filtering based on property type
  const filteredSections = bs7671InspectionSections;

  // Calculate overall progress
  const totalItems = filteredSections.reduce((total, section) => total + section.items.length, 0);
  const completedItems = inspectionItems.filter(item => item.outcome && item.outcome !== '' as any).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Calculate critical outcomes
  const criticalItems = inspectionItems.filter(item => ['C1', 'C2', 'C3'].includes(item.outcome));
  const satisfactoryItems = inspectionItems.filter(item => item.outcome === 'satisfactory');

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="px-2 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                BS 7671 Inspection Checklist
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Electrical installation inspection as per BS 7671:18+A3:2024 requirements
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-muted/50">
              {completedItems}/{totalItems} completed
            </Badge>
            {criticalItems.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {criticalItems.length} critical
              </Badge>
            )}
          </div>
        </div>

        {/* Enhanced Progress Section */}
        <div className="space-y-3 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground/90">Overall Progress</span>
            <span className={`font-medium transition-colors duration-300 ${
              progressPercent === 100 ? 'text-green-400' : 'text-foreground/80'
            }`}>
              {progressPercent}%
            </span>
          </div>
          <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden ring-1 ring-border/30">
            <div 
              className={`h-full transition-all duration-500 ${
                progressPercent === 100 
                  ? 'bg-gradient-to-r from-green-500 via-green-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-primary via-primary/90 to-primary/80'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-6 md:gap-4 text-center">
            <div className="space-y-2 md:space-y-1">
              <p className="text-2xl md:text-lg font-bold text-green-400">{satisfactoryItems.length}</p>
              <p className="text-xs text-muted-foreground">Satisfactory</p>
            </div>
            <div className="space-y-2 md:space-y-1">
              <p className="text-2xl md:text-lg font-bold text-red-400">{criticalItems.length}</p>
              <p className="text-xs text-muted-foreground">Critical Issues</p>
            </div>
            <div className="space-y-2 md:space-y-1">
              <p className="text-2xl md:text-lg font-bold text-foreground/90">{totalItems - completedItems}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>

        {/* Professional Guidance */}
        <div className="bg-muted/30 rounded-lg p-3 mt-4 border border-border/30">
          <div className="flex items-start gap-2">
            <Activity className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p className="font-medium mb-1 text-foreground">Professional Inspection Guidance:</p>
              <p>Complete each section systematically. Mark items as satisfactory or add observations for non-conformities.</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-0">
        <div className="relative space-y-3">
          {filteredSections.map((section) => (
            <EnhancedInspectionSectionCard
              key={section.id}
              section={section}
              inspectionItems={inspectionItems}
              isExpanded={expandedSections[section.id] || false}
              onToggle={() => onToggleSection(section.id)}
              onUpdateItem={onUpdateItem}
              onNavigateToObservations={onNavigateToObservations}
              onAutoCreateObservation={onAutoCreateObservation}
              onBulkMarkSatisfactory={onBulkMarkSatisfactory}
              onBulkClearSection={onBulkClearSection}
              onBulkMarkNotApplicable={onBulkMarkNotApplicable}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedInspectionChecklistCard;