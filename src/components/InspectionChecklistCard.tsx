import React from 'react';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';
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
  propertyType?: string;
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
  const filteredSections = bs7671InspectionSections;

  return (
    <div className="space-y-2">
      {filteredSections.map(section => (
        <InspectionSectionCard
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
        />
      ))}
    </div>
  );
};

export default InspectionChecklistCard;
