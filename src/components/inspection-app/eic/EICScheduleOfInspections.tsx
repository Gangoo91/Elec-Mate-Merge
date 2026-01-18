import React, { useEffect } from 'react';
import { bs7671EICInspectionItems, EICInspectionItem } from '@/data/bs7671EICChecklistData';
import EICInspectionChecklistCard from './EICInspectionChecklistCard';
import EICInspectionStatsSummary from './EICInspectionStatsSummary';

interface EICScheduleOfInspectionsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICScheduleOfInspections: React.FC<EICScheduleOfInspectionsProps> = ({
  formData,
  onUpdate
}) => {
  const getInspectionItems = (): EICInspectionItem[] => {
    if (formData.inspectionItems && Array.isArray(formData.inspectionItems) && formData.inspectionItems.length > 0) {
      return formData.inspectionItems;
    }
    return bs7671EICInspectionItems;
  };

  const inspectionItems = getInspectionItems();

  const updateInspectionItem = (id: string, field: keyof EICInspectionItem, value: any) => {
    const updatedItems = inspectionItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdate('inspectionItems', updatedItems);
  };

  useEffect(() => {
    if (!formData.inspectionItems || !Array.isArray(formData.inspectionItems) || formData.inspectionItems.length === 0) {
      onUpdate('inspectionItems', [...bs7671EICInspectionItems]);
    } else {
    }
  }, []);

  return (
    <div className="space-y-2">
      {/* Stats and Cards are now combined in EICInspectionChecklistCard */}
      <EICInspectionChecklistCard
        inspectionItems={inspectionItems}
        onUpdateItem={updateInspectionItem}
      />
    </div>
  );
};

export default EICScheduleOfInspections;
