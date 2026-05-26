import React, { useEffect, useState } from 'react';
import { bs7671EICInspectionItems, EICInspectionItem } from '@/data/bs7671EICChecklistData';
import EICInspectionChecklistCard from './EICInspectionChecklistCard';
import EICInspectionStatsSummary from './EICInspectionStatsSummary';
import { useHaptic } from '@/hooks/useHaptic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const [showMarkAllConfirm, setShowMarkAllConfirm] = useState(false);

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
    // Open confirm — bulk action with no undo is too easy to fire by accident.
    setShowMarkAllConfirm(true);
  };

  const confirmMarkAllOk = () => {
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
    setShowMarkAllConfirm(false);
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

      <AlertDialog open={showMarkAllConfirm} onOpenChange={setShowMarkAllConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark all unfilled items as Satisfactory?</AlertDialogTitle>
            <AlertDialogDescription>
              This will set every inspection item you haven't filled to Satisfactory.
              Items you've already marked Sat / Unsat / N/A won't change. You can
              still edit individual items after.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMarkAllOk}>
              Yes, mark all OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EICScheduleOfInspections;
