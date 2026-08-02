import React, { useEffect } from 'react';
import { updateSmartFieldDependencies } from '@/utils/inspectionFiltering';

interface SmartFieldDependenciesProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

// Defaults the current EIC UI can no longer represent — 'pme' was removed from
// the electrode options (ELE-1389) and 'recommended' has never been an RCD chip
// value. Writing either leaves controls half-lit, so they are skipped.
const UNREPRESENTABLE_DEFAULTS: Record<string, string[]> = {
  earthElectrodeType: ['pme'],
  rcdMainSwitch: ['recommended'],
};

const SmartFieldDependencies: React.FC<SmartFieldDependenciesProps> = ({ formData, onUpdate }) => {
  useEffect(() => {
    // Auto-set all smart field dependencies based on property type
    // NOTE: This only auto-fills form fields, it does NOT filter the inspection checklist
    // The switch is installationType (the Property type picker) — description is
    // free text and only gates the effect so defaults land once the job is described.
    if (formData.description && formData.installationType) {
      const smartDefaults = updateSmartFieldDependencies(formData.installationType);

      if (smartDefaults) {
        // Only update fields that are empty to avoid overriding user choices
        Object.entries(smartDefaults).forEach(([field, value]) => {
          if (UNREPRESENTABLE_DEFAULTS[field]?.includes(String(value))) return;
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

  // Default earthing arrangement to TN-C-S (most common UK domestic supply — PME).
  // Runs once on mount and only if the field is empty, so existing certs are
  // untouched. 'tncs' is the canonical stored code the chips and PDF formatter
  // compare — never the display label 'TN-C-S'.
  useEffect(() => {
    if (!formData.earthingArrangement) {
      onUpdate('earthingArrangement', 'tncs');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component doesn't render anything
};

export default SmartFieldDependencies;
