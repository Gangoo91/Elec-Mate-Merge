import { useMemo } from 'react';

export type EICTabId = 'details' | 'inspection' | 'testing' | 'declarations' | 'certificate';

export interface ValidationRule {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  regulation?: string;
  tab?: EICTabId;
}

const TAB_LABEL: Record<EICTabId, string> = {
  details: 'Installation Details',
  inspection: 'Schedule of Inspections',
  testing: 'Schedule of Testing',
  declarations: 'Declarations',
  certificate: 'Certificate',
};
export { TAB_LABEL };

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationRule[];
  warnings: ValidationRule[];
  completionPercentage: number;
}

export const useEICValidation = (formData: any): ValidationResult => {
  return useMemo(() => {
    const errors: ValidationRule[] = [];
    const warnings: ValidationRule[] = [];
    let completedFields = 0;
    const totalRequiredFields = 15; // Adjust based on actual required fields

    // Installation Details Validation
    if (!formData.clientName) {
      errors.push({
        field: 'clientName',
        message: 'Client name',
        severity: 'error',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    if (!formData.installationAddress) {
      errors.push({
        field: 'installationAddress',
        message: 'Installation address',
        severity: 'error',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    if (!formData.installationDate) {
      errors.push({
        field: 'installationDate',
        message: 'Installation date',
        severity: 'error',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    if (!formData.installationType) {
      warnings.push({
        field: 'installationType',
        message: 'Installation type',
        severity: 'warning',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    // Supply & Earthing Validation
    if (!formData.supplyVoltage) {
      errors.push({
        field: 'supplyVoltage',
        message: 'Supply voltage',
        severity: 'error',
        regulation: 'Chapter 31',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    if (!formData.earthingArrangement) {
      errors.push({
        field: 'earthingArrangement',
        message: 'Earthing arrangement',
        severity: 'error',
        regulation: 'Chapter 54',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    if (!formData.mainProtectiveDevice) {
      errors.push({
        field: 'mainProtectiveDevice',
        message: 'Main protective device',
        severity: 'error',
        regulation: 'Chapter 43',
        tab: 'details',
      });
    } else {
      completedFields++;
    }

    // Declaration Validation
    if (!formData.designerName) {
      errors.push({
        field: 'designerName',
        message: 'Designer name',
        severity: 'error',
        regulation: 'Part 6',
        tab: 'declarations',
      });
    } else {
      completedFields++;
    }

    if (!formData.designerSignature) {
      errors.push({
        field: 'designerSignature',
        message: 'Designer signature',
        severity: 'error',
        regulation: 'Part 6',
        tab: 'declarations',
      });
    } else {
      completedFields++;
    }

    if (!formData.constructorName) {
      errors.push({
        field: 'constructorName',
        message: 'Constructor name',
        severity: 'error',
        regulation: 'Part 6',
        tab: 'declarations',
      });
    } else {
      completedFields++;
    }

    if (!formData.constructorSignature) {
      errors.push({
        field: 'constructorSignature',
        message: 'Constructor signature',
        severity: 'error',
        regulation: 'Part 6',
        tab: 'declarations',
      });
    } else {
      completedFields++;
    }

    if (!formData.inspectorName) {
      errors.push({
        field: 'inspectorName',
        message: 'Inspector name',
        severity: 'error',
        regulation: 'Part 6',
        tab: 'declarations',
      });
    } else {
      completedFields++;
    }

    if (!formData.inspectorSignature) {
      errors.push({
        field: 'inspectorSignature',
        message: 'Inspector signature',
        severity: 'error',
        regulation: 'Part 6',
        tab: 'declarations',
      });
    } else {
      completedFields++;
    }

    // Technical Validation Warnings
    const rawVoltage = formData.supplyVoltage?.replace(/V$/i, '') || '';
    if (rawVoltage && rawVoltage !== '230' && rawVoltage !== '400') {
      warnings.push({
        field: 'supplyVoltage',
        message: 'Non-standard supply voltage — verify',
        severity: 'warning',
        regulation: 'Section 312',
        tab: 'details',
      });
    }

    if (formData.scheduleOfTests && formData.scheduleOfTests.length === 0) {
      warnings.push({
        field: 'scheduleOfTests',
        message: 'No test results recorded',
        severity: 'warning',
        regulation: 'Chapter 61',
        tab: 'testing',
      });
    }

    // inspectionItems may be a Record<string,{result,...}> (wizard path) or an array (legacy)
    // The component stores results under 'result', not 'outcome' — check both for safety
    const hasInspections = (() => {
      const items = formData.inspectionItems;
      if (items && !Array.isArray(items) && typeof items === 'object') {
        return Object.values(items).some((i: any) => i.result || i.outcome);
      }
      if (Array.isArray(items) && items.length > 0) {
        return items.some((i: any) => i.result || i.outcome);
      }
      return false;
    })() || (formData.inspections && Object.keys(formData.inspections).length > 0);
    if (!hasInspections) {
      warnings.push({
        field: 'inspections',
        message: 'No inspections recorded',
        severity: 'warning',
        regulation: 'Chapter 61',
        tab: 'inspection',
      });
    }

    // Additional completeness checks
    if (formData.designerName && !formData.designerQualifications) {
      warnings.push({
        field: 'designerQualifications',
        message: 'Designer qualifications',
        severity: 'info',
        tab: 'declarations',
      });
    }

    if (formData.constructorName && !formData.constructorQualifications) {
      warnings.push({
        field: 'constructorQualifications',
        message: 'Constructor qualifications',
        severity: 'info',
        tab: 'declarations',
      });
    }

    const completionPercentage = Math.round((completedFields / totalRequiredFields) * 100);
    const isValid = errors.length === 0;

    return {
      isValid,
      errors,
      warnings,
      completionPercentage,
    };
  }, [formData]);
};
