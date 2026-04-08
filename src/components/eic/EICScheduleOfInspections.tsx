import React, { useEffect } from 'react';
import { bs7671EICInspectionItems, EICInspectionItem } from '@/data/bs7671EICChecklistData';
import EICInspectionChecklistCard from './EICInspectionChecklistCard';
import EICInspectionStatsSummary from './EICInspectionStatsSummary';
import { useHaptic } from '@/hooks/useHaptic';

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
  onNavigateToObservations,
}) => {
  const haptic = useHaptic();

  const getInspectionItems = (): EICInspectionItem[] => {
    if (
      formData.inspectionItems &&
      Array.isArray(formData.inspectionItems) &&
      formData.inspectionItems.length > 0
    ) {
      const hasValidDescriptions = formData.inspectionItems.some(
        (item: any) => item.description && item.description.length > 0
      );
      if (hasValidDescriptions) {
        return formData.inspectionItems;
      }
    }
    return bs7671EICInspectionItems;
  };

  const inspectionItems = getInspectionItems();

  const updateInspectionItem = (id: string, field: keyof EICInspectionItem, value: any) => {
    onUpdate('inspectionItems', (prevItems: EICInspectionItem[]) => {
      const items =
        prevItems && Array.isArray(prevItems) && prevItems.length > 0
          ? prevItems
          : bs7671EICInspectionItems;
      return items.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    });
  };

  const handleMarkAllOk = () => {
    haptic.success();
    onUpdate('inspectionItems', (prevItems: EICInspectionItem[]) => {
      const items =
        prevItems && Array.isArray(prevItems) && prevItems.length > 0
          ? prevItems
          : bs7671EICInspectionItems;
      return items.map((item) =>
        item.outcome === '' ? { ...item, outcome: 'satisfactory' } : item
      );
    });
  };

  useEffect(() => {
    const needsInit =
      !formData.inspectionItems ||
      !Array.isArray(formData.inspectionItems) ||
      formData.inspectionItems.length === 0 ||
      !formData.inspectionItems.some(
        (item: any) => item.description && item.description.length > 0
      );

    if (needsInit) {
      onUpdate('inspectionItems', [...bs7671EICInspectionItems]);
    }
  }, []);

  return (
    <div className="space-y-3">
      <EICInspectionStatsSummary
        inspectionItems={inspectionItems}
        onMarkAllOk={handleMarkAllOk}
      />
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
