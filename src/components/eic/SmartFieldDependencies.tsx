import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getPropertyCategory, updateSmartFieldDependencies } from '@/utils/inspectionFiltering';

interface SmartFieldDependenciesProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const SmartFieldDependencies: React.FC<SmartFieldDependenciesProps> = ({ formData, onUpdate }) => {
  const { toast } = useToast();

  useEffect(() => {
    // Auto-set all smart field dependencies based on property type
    // NOTE: This only auto-fills form fields, it does NOT filter the inspection checklist
    if (formData.description && formData.installationType) {
      const smartDefaults = updateSmartFieldDependencies(formData.description);
      
      if (smartDefaults) {
        // Only update fields that are empty to avoid overriding user choices
        Object.entries(smartDefaults).forEach(([field, value]) => {
          if (!formData[field] || formData[field] === '') {
            onUpdate(field, value);
          }
        });
      }
    }
  }, [formData.description, formData.installationType, onUpdate]);

  // Legacy effects kept for backwards compatibility with existing forms
  useEffect(() => {
    // Auto-set phases based on supply voltage (fallback)
    if (formData.supplyVoltage === '230V' && !formData.phases) {
      onUpdate('phases', 'single');
    } else if (formData.supplyVoltage === '400V' && !formData.phases) {
      onUpdate('phases', 'three');
    }
  }, [formData.supplyVoltage, formData.phases, onUpdate]);

  return null; // This component doesn't render anything
};

export default SmartFieldDependencies;
