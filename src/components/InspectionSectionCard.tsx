import React from 'react';
import { InspectionSection } from '@/data/bs7671ChecklistData';
import EnhancedInspectionSectionCard from './inspection/EnhancedInspectionSectionCard';

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
  quickMarkMode?: boolean;
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
  onBulkClearSection,
  quickMarkMode,
}: InspectionSectionCardProps) => {
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
      quickMarkMode={quickMarkMode}
    />
  );
};

export default InspectionSectionCard;
