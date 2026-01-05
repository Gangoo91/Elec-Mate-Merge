import { useState, useCallback } from 'react';
import { MinorWorksObservation } from '@/components/minor-works/MinorWorksObservationCard';

export const useMinorWorksObservations = (initialObservations: MinorWorksObservation[] = []) => {
  const [observations, setObservations] = useState<MinorWorksObservation[]>(initialObservations);

  const addObservation = useCallback(() => {
    const newObservation: MinorWorksObservation = {
      id: `obs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      defectCode: 'C3',
      description: '',
      recommendation: ''
    };
    
    setObservations(prev => [...prev, newObservation]);
    return newObservation.id;
  }, []);

  const updateObservation = useCallback((id: string, field: keyof MinorWorksObservation, value: any) => {
    setObservations(prev => 
      prev.map(obs => 
        obs.id === id ? { ...obs, [field]: value } : obs
      )
    );
  }, []);

  const removeObservation = useCallback((id: string) => {
    setObservations(prev => prev.filter(obs => obs.id !== id));
  }, []);

  const quickMarkAllNA = useCallback(() => {
    // Clear existing observations and add one N/A observation for each category
    const naObservations: MinorWorksObservation[] = [
      {
        id: `na_c1_${Date.now()}`,
        defectCode: 'C1',
        description: 'No defects found requiring immediate attention',
        recommendation: 'None required'
      },
      {
        id: `na_c2_${Date.now() + 1}`,
        defectCode: 'C2', 
        description: 'No defects requiring urgent attention',
        recommendation: 'None required'
      },
      {
        id: `na_c3_${Date.now() + 2}`,
        defectCode: 'C3',
        description: 'No improvements recommended',
        recommendation: 'None required'
      },
      {
        id: `na_fi_${Date.now() + 3}`,
        defectCode: 'FI',
        description: 'No further investigation required',
        recommendation: 'None required'
      }
    ];
    
    setObservations(naObservations);
  }, []);

  return {
    observations,
    setObservations,
    addObservation,
    updateObservation,
    removeObservation,
    quickMarkAllNA
  };
};