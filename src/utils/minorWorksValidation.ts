// Validation utilities for Minor Works Certificate form data
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// Required fields for a complete Minor Works Certificate
const REQUIRED_FIELDS = [
  'certificateNumber',
  'propertyAddress',
  'postcode',
  'clientName',
  'workDate',
  'dateOfCompletion',
  'contractorName',
  'workDescription',
  'workType',
  'workLocation',
  'supplyVoltage',
  'frequency',
  'supplyPhases',
  'earthingArrangement',
  'circuitDesignation',
  'circuitDescription',
  'protectiveDeviceType',
  'protectiveDeviceRating',
  'continuityR1R2',
  'polarity',
  'earthFaultLoopImpedance',
  'electricianName',
  'position',
  'qualificationLevel',
  'signatureDate',
  'bs7671Compliance',
  'testResultsAccurate',
  'workSafety'
];

// Fields that should be numeric
const NUMERIC_FIELDS = [
  'supplyVoltage',
  'frequency',
  'mainEarthingConductorSize',
  'mainBondingConductorSize',
  'protectiveDeviceRating',
  'protectiveDeviceKaRating',
  'liveConductorSize',
  'cpcSize',
  'continuityR1R2',
  'insulationLiveNeutral',
  'insulationLiveEarth',
  'insulationNeutralEarth',
  'earthFaultLoopImpedance',
  'maxPermittedZs',
  'prospectiveFaultCurrent',
  'rcdRating',
  'rcdOperatingTime'
];

// Validate individual field
function validateField(field: string, value: any): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check required fields
  if (REQUIRED_FIELDS.includes(field) && (!value || value.toString().trim() === '')) {
    errors.push({
      field,
      message: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`,
      severity: 'error'
    });
    return errors;
  }
  
  // Skip validation if field is empty and not required
  if (!value || value.toString().trim() === '') {
    return errors;
  }
  
  // Numeric field validation
  if (NUMERIC_FIELDS.includes(field)) {
    const numValue = parseFloat(value.toString());
    if (isNaN(numValue) || numValue < 0) {
      errors.push({
        field,
        message: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} must be a positive number`,
        severity: 'error'
      });
    }
  }
  
  // Specific field validations
  switch (field) {
    case 'postcode':
      if (!/^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i.test(value)) {
        errors.push({
          field,
          message: 'Please enter a valid UK postcode',
          severity: 'warning'
        });
      }
      break;
      
    case 'certificateNumber':
      if (!/^MW-\d{4}-[A-Z0-9]{6}$/i.test(value)) {
        errors.push({
          field,
          message: 'Certificate number should follow format MW-YYYY-XXXXXX',
          severity: 'warning'
        });
      }
      break;
      
    case 'workDate':
    case 'dateOfCompletion':
    case 'signatureDate':
      const dateValue = new Date(value);
      if (isNaN(dateValue.getTime())) {
        errors.push({
          field,
          message: 'Please enter a valid date',
          severity: 'error'
        });
      }
      break;
      
    case 'supplyVoltage':
      const voltage = parseFloat(value.toString().replace('V', ''));
      if (voltage < 100 || voltage > 1000) {
        errors.push({
          field,
          message: 'Supply voltage should typically be between 100V and 1000V',
          severity: 'warning'
        });
      }
      break;
      
    case 'frequency':
      const freq = parseFloat(value.toString().replace('Hz', ''));
      if (freq !== 50 && freq !== 60) {
        errors.push({
          field,
          message: 'Frequency should typically be 50Hz or 60Hz',
          severity: 'warning'
        });
      }
      break;
  }
  
  return errors;
}

// Validate entire form data
export function validateMinorWorksFormData(formData: any): ValidationResult {
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationError[] = [];
  
  // Validate all fields
  Object.keys(formData).forEach(field => {
    const fieldErrors = validateField(field, formData[field]);
    fieldErrors.forEach(error => {
      if (error.severity === 'error') {
        allErrors.push(error);
      } else {
        allWarnings.push(error);
      }
    });
  });
  
  // Cross-field validations
  if (formData.workDate && formData.dateOfCompletion) {
    const startDate = new Date(formData.workDate);
    const endDate = new Date(formData.dateOfCompletion);
    
    if (endDate < startDate) {
      allErrors.push({
        field: 'dateOfCompletion',
        message: 'Completion date must be after or equal to work start date',
        severity: 'error'
      });
    }
  }
  
  // Earth fault loop impedance vs max permitted (Reg 411.4.4)
  if (formData.earthFaultLoopImpedance && formData.maxPermittedZs) {
    const measured = parseFloat(formData.earthFaultLoopImpedance);
    const maxPermitted = parseFloat(formData.maxPermittedZs);
    
    if (!isNaN(measured) && !isNaN(maxPermitted) && measured > maxPermitted) {
      allErrors.push({
        field: 'earthFaultLoopImpedance',
        message: 'Measured earth fault loop impedance exceeds maximum permitted value',
        severity: 'error'
      });
    }
  }
  
  // Ring circuit validation (Reg 543.2.9) - R1 + R2 continuity
  if (formData.circuitType === 'ring' || formData.circuitDescription?.toLowerCase().includes('ring')) {
    if (formData.continuityR1 && formData.continuityR2) {
      const r1 = parseFloat(formData.continuityR1);
      const r2 = parseFloat(formData.continuityR2);
      const r1r2 = parseFloat(formData.continuityR1R2 || '0');
      
      if (!isNaN(r1) && !isNaN(r2) && !isNaN(r1r2)) {
        // For ring circuits, R1+R2 should be approximately 4 times the measured R1R2
        const expectedR1R2 = (r1 + r2) / 4;
        const tolerance = expectedR1R2 * 0.1; // 10% tolerance
        
        if (Math.abs(r1r2 - expectedR1R2) > tolerance) {
          allWarnings.push({
            field: 'continuityR1R2',
            message: `Ring circuit R1+R2 value (${r1r2}Ω) differs significantly from expected (${expectedR1R2.toFixed(3)}Ω). Verify ring integrity`,
            severity: 'warning'
          });
        }
      }
    }
  }
  
  // RCD/RCBO test validation (Reg 643.10) - Operating time requirements
  if (formData.protectionRcd || formData.protectionRcbo) {
    if (formData.rcdOperatingTime) {
      const operatingTime = parseFloat(formData.rcdOperatingTime);
      const rcdRating = parseFloat(formData.rcdRating || '30');
      
      // Standard: 30mA RCD should trip within 40ms at 5× test current
      // General purpose RCDs: ≤300ms at 1× rated current, ≤40ms at 5× rated current
      if (!isNaN(operatingTime)) {
        if (operatingTime > 300) {
          allErrors.push({
            field: 'rcdOperatingTime',
            message: `RCD operating time (${operatingTime}ms) exceeds 300ms maximum at rated current`,
            severity: 'error'
          });
        } else if (operatingTime > 40 && rcdRating <= 30) {
          allWarnings.push({
            field: 'rcdOperatingTime',
            message: `30mA RCD operating time (${operatingTime}ms) exceeds recommended 40ms at 5× test current`,
            severity: 'warning'
          });
        }
      }
    } else {
      allWarnings.push({
        field: 'rcdOperatingTime',
        message: 'RCD/RCBO installed but operating time not recorded. Test required per Reg 643.10',
        severity: 'warning'
      });
    }
  }
  
  // AFDD validation (Amendment 3:2024 - Reg 421.1.7)
  // AFDDs required for certain circuits (e.g., single-phase AC circuits ≤32A in residential)
  if (formData.workType === 'new-circuit' || formData.workType === 'socket-outlet') {
    const deviceRating = parseFloat(formData.protectiveDeviceRating || '0');
    const isResidential = formData.propertyType?.toLowerCase().includes('residential') || 
                          formData.propertyType?.toLowerCase().includes('domestic');
    
    if (isResidential && deviceRating <= 32 && deviceRating > 0 && !formData.afddInstalled) {
      allWarnings.push({
        field: 'afddInstalled',
        message: 'Amendment 3:2024 Reg 421.1.7 recommends AFDD protection for AC circuits ≤32A in residential properties',
        severity: 'warning'
      });
    }
  }
  
  // SPD validation (Amendment 3:2024 - Reg 443.4)
  // SPDs mandatory in certain installations (risk assessment required)
  if (formData.workType === 'new-circuit' && !formData.spdInstalled) {
    allWarnings.push({
      field: 'spdInstalled',
      message: 'Amendment 3:2024 Reg 443.4 requires SPD risk assessment. Consider SPD installation',
      severity: 'warning'
    });
  }
  
  // Insulation resistance validation (Reg 643.3)
  const insulationFields = ['insulationLiveNeutral', 'insulationLiveEarth', 'insulationNeutralEarth'];
  insulationFields.forEach(field => {
    if (formData[field]) {
      const value = parseFloat(formData[field]);
      if (!isNaN(value) && value < 1.0) {
        allErrors.push({
          field,
          message: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} (${value}MΩ) is below 1.0MΩ minimum requirement`,
          severity: 'error'
        });
      }
    }
  });
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}

// Format field values for better PDF presentation
export function formatFieldForPdf(field: string, value: any): string {
  if (!value) return '';
  
  switch (field) {
    case 'supplyVoltage':
      return value.toString().replace(/[^0-9.]/g, '') + 'V';
      
    case 'frequency':
      return value.toString().replace(/[^0-9.]/g, '') + 'Hz';
      
    case 'workDate':
    case 'dateOfCompletion':
    case 'signatureDate':
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-GB');
      }
      return value.toString();
      
    case 'postcode':
      return value.toString().toUpperCase();
      
    case 'certificateNumber':
      return value.toString().toUpperCase();
      
    default:
      return value.toString().trim();
  }
}