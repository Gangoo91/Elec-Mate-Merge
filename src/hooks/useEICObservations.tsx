
import { useState, useCallback } from 'react';

export interface EICObservation {
  id: string;
  item: string;
  itemNumber?: string;  // EIC inspection item number (e.g., "14")
  defectCode: 'C1' | 'C2' | 'C3' | 'limitation' | 'not-applicable' | 'unsatisfactory';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
  createdAt: string;
}

export const useEICObservations = (initialObservations: EICObservation[] = []) => {
  const [observations, setObservations] = useState<EICObservation[]>(initialObservations);

  const addObservation = useCallback((observation: Omit<EICObservation, 'id' | 'createdAt'>) => {
    const newObservation: EICObservation = {
      ...observation,
      id: `obs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    setObservations(prev => [...prev, newObservation]);
    return newObservation.id;
  }, []);

  const updateObservation = useCallback((id: string, field: keyof EICObservation, value: any) => {
    setObservations(prev => 
      prev.map(obs => 
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  }, []);

  const removeObservation = useCallback((id: string) => {
    setObservations(prev => prev.filter(obs => obs.id !== id));
  }, []);

  const autoCreateObservation = useCallback((inspectionItem: {
    id: string;
    item: string;
    itemNumber?: string;
    clause?: string;
    notes?: string;
    defectCode?: 'limitation' | 'unsatisfactory' | 'C1' | 'C2' | 'C3';
  }) => {
    const existingObservation = observations.find(obs => obs.inspectionItemId === inspectionItem.id);

    if (!existingObservation) {
      // Use notes from the inspection item if available
      const description = inspectionItem.notes && inspectionItem.notes.trim()
        ? inspectionItem.notes
        : 'Item requires attention - inspection outcome not satisfactory';

      // For EIC, use 'limitation' as default; for EICR, use the provided defectCode or 'C2'
      const defectCode = inspectionItem.defectCode || 'limitation';

      // Build item label - include item number if provided (for EIC)
      const itemLabel = inspectionItem.itemNumber
        ? `${inspectionItem.itemNumber}. ${inspectionItem.item}`
        : inspectionItem.clause
          ? `${inspectionItem.item} (${inspectionItem.clause})`
          : inspectionItem.item;

      return addObservation({
        item: itemLabel,
        itemNumber: inspectionItem.itemNumber,
        defectCode,
        description,
        recommendation: 'Investigate and rectify as required to comply with BS 7671',
        rectified: false,
        inspectionItemId: inspectionItem.id
      });
    } else {
      // Update existing observation with new notes and defect code if changed
      if (inspectionItem.notes && inspectionItem.notes.trim()) {
        updateObservation(existingObservation.id, 'description', inspectionItem.notes);
      }
      if (inspectionItem.defectCode) {
        updateObservation(existingObservation.id, 'defectCode', inspectionItem.defectCode);
      }
    }

    return existingObservation.id;
  }, [observations, addObservation, updateObservation]);

  // Remove observation when inspection item outcome is cleared or changed to non-defect
  const removeObservationForInspectionItem = useCallback((inspectionItemId: string) => {
    const existingObservation = observations.find(obs => obs.inspectionItemId === inspectionItemId);
    if (existingObservation) {
      removeObservation(existingObservation.id);
    }
  }, [observations, removeObservation]);

  return {
    observations,
    setObservations,
    addObservation,
    updateObservation,
    removeObservation,
    autoCreateObservation,
    removeObservationForInspectionItem
  };
};
