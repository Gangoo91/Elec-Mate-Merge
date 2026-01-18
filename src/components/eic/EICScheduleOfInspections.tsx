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
    // Check if we have valid inspection items in formData
    if (formData.inspectionItems && Array.isArray(formData.inspectionItems) && formData.inspectionItems.length > 0) {
      // Validate that items have descriptions (not corrupted data)
      const hasValidDescriptions = formData.inspectionItems.some((item: any) => item.description && item.description.length > 0);
      if (hasValidDescriptions) {
        return formData.inspectionItems;
      }
    }
    // Always return the default items if formData is invalid
    return bs7671EICInspectionItems;
  };

  const inspectionItems = getInspectionItems();

  // Debug log to verify items are loaded
  console.log('[EIC Inspections] Loaded items:', inspectionItems.length, inspectionItems[0]?.description?.substring(0, 30));

  const updateInspectionItem = (id: string, field: keyof EICInspectionItem, value: any) => {
    const updatedItems = inspectionItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdate('inspectionItems', updatedItems);
  };

  useEffect(() => {
    // Initialize or reset if data is missing or corrupted
    const needsInit = !formData.inspectionItems ||
      !Array.isArray(formData.inspectionItems) ||
      formData.inspectionItems.length === 0 ||
      !formData.inspectionItems.some((item: any) => item.description && item.description.length > 0);

    if (needsInit) {
      console.log('[EIC Inspections] Initializing with default items');
      onUpdate('inspectionItems', [...bs7671EICInspectionItems]);
    }
  }, []);

  return (
    <div className="space-y-2">
      {/* Stats and Cards are now combined in EICInspectionChecklistCard */}
      <EICInspectionStatsSummary inspectionItems={inspectionItems} />
      <EICInspectionChecklistCard
        inspectionItems={inspectionItems}
        onUpdateItem={updateInspectionItem}
      />
    </div>
  );
};

export default EICScheduleOfInspections;
