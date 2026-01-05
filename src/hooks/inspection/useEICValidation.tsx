
import { useMemo } from 'react';

export interface ValidationRule {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  regulation?: string;
}

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
        message: 'Client name is required for legal identification',
        severity: 'error'
      });
    } else {
      completedFields++;
    }

    if (!formData.installationAddress) {
      errors.push({
        field: 'installationAddress',
        message: 'Installation address is required',
        severity: 'error'
      });
    } else {
      completedFields++;
    }

    if (!formData.installationDate) {
      errors.push({
        field: 'installationDate',
        message: 'Installation date is required',
        severity: 'error'
      });
    } else {
      completedFields++;
    }

    if (!formData.installationType) {
      warnings.push({
        field: 'installationType',
        message: 'Installation type should be specified',
        severity: 'warning'
      });
    } else {
      completedFields++;
    }

    // Supply & Earthing Validation
    if (!formData.supplyVoltage) {
      errors.push({
        field: 'supplyVoltage',
        message: 'Supply voltage is required for safety calculations',
        severity: 'error',
        regulation: 'BS 7671:2018 Chapter 31'
      });
    } else {
      completedFields++;
    }

    if (!formData.earthingArrangement) {
      errors.push({
        field: 'earthingArrangement',
        message: 'Earthing arrangement must be specified',
        severity: 'error',
        regulation: 'BS 7671:2018 Chapter 54'
      });
    } else {
      completedFields++;
    }

    if (!formData.mainProtectiveDevice) {
      errors.push({
        field: 'mainProtectiveDevice',
        message: 'Main protective device specification required',
        severity: 'error',
        regulation: 'BS 7671:2018 Chapter 43'
      });
    } else {
      completedFields++;
    }

    // Declaration Validation
    if (!formData.designerName) {
      errors.push({
        field: 'designerName',
        message: 'Designer name is legally required',
        severity: 'error',
        regulation: 'BS 7671:2018 Part 6'
      });
    } else {
      completedFields++;
    }

    if (!formData.designerSignature) {
      errors.push({
        field: 'designerSignature',
        message: 'Designer signature is legally required',
        severity: 'error',
        regulation: 'BS 7671:2018 Part 6'
      });
    } else {
      completedFields++;
    }

    if (!formData.constructorName) {
      errors.push({
        field: 'constructorName',
        message: 'Constructor name is legally required',
        severity: 'error',
        regulation: 'BS 7671:2018 Part 6'
      });
    } else {
      completedFields++;
    }

    if (!formData.constructorSignature) {
      errors.push({
        field: 'constructorSignature',
        message: 'Constructor signature is legally required',
        severity: 'error',
        regulation: 'BS 7671:2018 Part 6'
      });
    } else {
      completedFields++;
    }

    if (!formData.inspectorName) {
      errors.push({
        field: 'inspectorName',
        message: 'Inspector name is legally required',
        severity: 'error',
        regulation: 'BS 7671:2018 Part 6'
      });
    } else {
      completedFields++;
    }

    if (!formData.inspectorSignature) {
      errors.push({
        field: 'inspectorSignature',
        message: 'Inspector signature is legally required',
        severity: 'error',
        regulation: 'BS 7671:2018 Part 6'
      });
    } else {
      completedFields++;
    }

    // Technical Validation Warnings
    if (formData.supplyVoltage && formData.supplyVoltage !== '230' && formData.supplyVoltage !== '400') {
      warnings.push({
        field: 'supplyVoltage',
        message: 'Non-standard supply voltage - verify specification',
        severity: 'warning',
        regulation: 'BS 7671:2018 Section 312'
      });
    }

    if (formData.scheduleOfTests && formData.scheduleOfTests.length === 0) {
      warnings.push({
        field: 'scheduleOfTests',
        message: 'No test results recorded - testing required for EIC',
        severity: 'warning',
        regulation: 'BS 7671:2018 Chapter 61'
      });
    }

    if (!formData.inspections || Object.keys(formData.inspections).length === 0) {
      warnings.push({
        field: 'inspections',
        message: 'No inspections recorded - visual inspection required',
        severity: 'warning',
        regulation: 'BS 7671:2018 Chapter 61'
      });
    }

    // Additional completeness checks
    if (formData.designerName && !formData.designerQualifications) {
      warnings.push({
        field: 'designerQualifications',
        message: 'Designer qualifications recommended for competency verification',
        severity: 'info'
      });
    }

    if (formData.constructorName && !formData.constructorQualifications) {
      warnings.push({
        field: 'constructorQualifications',
        message: 'Constructor qualifications recommended for competency verification',
        severity: 'info'
      });
    }

    const completionPercentage = Math.round((completedFields / totalRequiredFields) * 100);
    const isValid = errors.length === 0;

    return {
      isValid,
      errors,
      warnings,
      completionPercentage
    };
  }, [formData]);
};
