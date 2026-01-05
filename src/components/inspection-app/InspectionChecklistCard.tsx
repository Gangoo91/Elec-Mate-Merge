import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';
import { filterInspectionSections } from '@/utils/inspectionFiltering';
import InspectionSectionCard from './InspectionSectionCard';
interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}
interface InspectionChecklistCardProps {
  inspectionItems: InspectionItem[];
  expandedSections: Record<string, boolean>;
  onToggleSection: (sectionId: string) => void;
  onUpdateItem: (id: string, field: keyof InspectionItem, value: any) => void;
  onNavigateToObservations: () => void;
  onAutoCreateObservation: (inspectionItem: InspectionItem) => void;
  onBulkMarkSatisfactory: (sectionId: string) => void;
  onBulkClearSection: (sectionId: string) => void;
  propertyType?: string; // Add property type for smart filtering
}
const InspectionChecklistCard = ({
  inspectionItems,
  expandedSections,
  onToggleSection,
  onUpdateItem,
  onNavigateToObservations,
  onAutoCreateObservation,
  onBulkMarkSatisfactory,
  onBulkClearSection,
  propertyType
}: InspectionChecklistCardProps) => {
  // Always show all sections for EICR forms
  const filteredSections = bs7671InspectionSections;
  return <Card className="border border-border bg-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <FileText className="h-5 w-5" />
          EICR Inspection Checklist
        </CardTitle>
        <p className="text-sm text-muted-foreground">IET Model Forms - BS7671 18th Edition + A3:2024 compliant. For residential and similar premises with up to 100 A supply.</p>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="space-y-2 sm:space-y-3">
          {filteredSections.map(section => <InspectionSectionCard key={section.id} section={section} inspectionItems={inspectionItems} isExpanded={expandedSections[section.id] || false} onToggle={() => onToggleSection(section.id)} onUpdateItem={onUpdateItem} onNavigateToObservations={onNavigateToObservations} onAutoCreateObservation={onAutoCreateObservation} onBulkMarkSatisfactory={onBulkMarkSatisfactory} onBulkClearSection={onBulkClearSection} />)}
        </div>
      </CardContent>
    </Card>;
};
export default InspectionChecklistCard;