import React, { useEffect } from 'react';
import { bs7671EICInspectionItems, EICInspectionItem } from '@/data/bs7671EICChecklistData';
import EICInspectionChecklistCard from './EICInspectionChecklistCard';
import EICInspectionStatsSummary from './EICInspectionStatsSummary';

interface EICScheduleOfInspectionsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onAutoCreateObservation?: (inspectionItem: {
    id: string;
    item: string;
    itemNumber?: string;
    notes?: string;
    defectCode?: 'limitation';
  }) => string;
  onNavigateToObservations?: () => void;
}

const EICScheduleOfInspections: React.FC<EICScheduleOfInspectionsProps> = ({
  formData,
  onUpdate,
  onAutoCreateObservation,
  onNavigateToObservations
}) => {
  const getInspectionItems = (): EICInspectionItem[] => {
    if (formData.inspectionItems && Array.isArray(formData.inspectionItems) && formData.inspectionItems.length > 0) {
      return formData.inspectionItems;
    }
    return bs7671EICInspectionItems;
  };

  const inspectionItems = getInspectionItems();

  const updateInspectionItem = (id: string, field: keyof EICInspectionItem, value: any) => {
    onUpdate('inspectionItems', (prevItems: EICInspectionItem[]) => {
      const items = (prevItems && Array.isArray(prevItems) && prevItems.length > 0)
        ? prevItems
        : bs7671EICInspectionItems;
      return items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      );
    });
  };

  useEffect(() => {
    if (!formData.inspectionItems || !Array.isArray(formData.inspectionItems) || formData.inspectionItems.length === 0) {
      onUpdate('inspectionItems', [...bs7671EICInspectionItems]);
    }
  }, []);

  return (
    <div className="space-y-4">
      <EICInspectionStatsSummary inspectionItems={inspectionItems} />
      <EICInspectionChecklistCard
        inspectionItems={inspectionItems}
        onUpdateItem={updateInspectionItem}
        onAutoCreateObservation={onAutoCreateObservation}
        onNavigateToObservations={onNavigateToObservations}
      />
    </div>
  );
};

export default EICScheduleOfInspections;
