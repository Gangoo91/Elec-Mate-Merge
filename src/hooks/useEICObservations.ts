/**
 * useEICObservations.ts
 * Hook to manage EIC observations/defects
 */

import { useState, useCallback } from 'react';

export interface EICObservation {
  id: string;
  code: string;
  description: string;
  location: string;
  recommendation: string;
  inspectionItemId?: string;
  severity: 'C1' | 'C2' | 'C3' | 'FI';
}

export function useEICObservations(reportId: string) {
  const [observations, setObservations] = useState<EICObservation[]>([]);

  const addObservation = useCallback((): string => {
    const newId = `obs-${Date.now()}`;
    const newObservation: EICObservation = {
      id: newId,
      code: '',
      description: '',
      location: '',
      recommendation: '',
      severity: 'C2'
    };
    setObservations(prev => [...prev, newObservation]);
    return newId;
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
    clause: string;
  }): string => {
    const newId = `obs-${Date.now()}`;
    const newObservation: EICObservation = {
      id: newId,
      code: inspectionItem.clause,
      description: `Issue with: ${inspectionItem.item}`,
      location: '',
      recommendation: '',
      inspectionItemId: inspectionItem.id,
      severity: 'C2'
    };
    setObservations(prev => [...prev, newObservation]);
    return newId;
  }, []);

  return {
    observations,
    addObservation,
    updateObservation,
    removeObservation,
    autoCreateObservation
  };
}
