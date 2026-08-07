import { useState, useCallback } from 'react';

export interface EICObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'limitation' | 'not-applicable';
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
      createdAt: new Date().toISOString(),
    };

    setObservations((prev) => [...prev, newObservation]);
    return newObservation.id;
  }, []);

  const updateObservation = useCallback((id: string, field: keyof EICObservation, value: any) => {
    setObservations((prev) =>
      prev.map((obs) => (obs.id === id ? { ...obs, [field]: value } : obs))
    );
  }, []);

  const removeObservation = useCallback((id: string) => {
    setObservations((prev) => prev.filter((obs) => obs.id !== id));
  }, []);

  const autoCreateObservation = useCallback(
    (inspectionItem: { id: string; item: string; clause: string; notes?: string }) => {
      const existingObservation = observations.find(
        (obs) => obs.inspectionItemId === inspectionItem.id
      );

      if (!existingObservation) {
        // Use notes from the inspection item if available
        // The electrician's own words, or nothing — the previous default was
        // stored, not a placeholder, and printed verbatim on signed certificates.
        const description =
          inspectionItem.notes && inspectionItem.notes.trim() ? inspectionItem.notes : '';

        return addObservation({
          item: `${inspectionItem.item} (${inspectionItem.clause})`,
          defectCode: 'C2',
          description,
          // Left empty for the same reason as the description.
          recommendation: '',
          rectified: false,
          inspectionItemId: inspectionItem.id,
        });
      } else if (inspectionItem.notes && inspectionItem.notes.trim()) {
        // Update existing observation with new notes
        updateObservation(existingObservation.id, 'description', inspectionItem.notes);
      }

      return existingObservation.id;
    },
    [observations, addObservation, updateObservation]
  );

  return {
    observations,
    setObservations,
    addObservation,
    updateObservation,
    removeObservation,
    autoCreateObservation,
  };
};
