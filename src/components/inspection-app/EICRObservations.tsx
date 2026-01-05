
import React from 'react';
import EICRInspectionChecklist from './EICRInspectionChecklist';

interface EICRObservationsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onNavigateToObservations?: () => void;
}

const EICRObservations = ({ formData, onUpdate, onNavigateToObservations }: EICRObservationsProps) => {
  return (
    <EICRInspectionChecklist 
      formData={formData} 
      onUpdate={onUpdate} 
      onNavigateToObservations={onNavigateToObservations}
    />
  );
};

export default EICRObservations;
