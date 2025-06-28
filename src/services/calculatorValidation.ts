
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
  standardsCompliance: {
    bs7671: boolean;
    iet: boolean;
    safety: boolean;
    commercial: boolean;
  };
  professionalNotes: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
}

export interface ValidationRules {
  minValues: { [key: string]: number };
  maxValues: { [key: string]: number };
  requiredFields: string[];
  conditionalFields: { [key: string]: string[] };
  standardLimits: { [key: string]: { min: number; max: number; standard: string } };
}

const validationRules: { [calculatorType: string]: ValidationRules } = {
  'power-factor': {
    minValues: { activePower: 0.1, apparentPower: 0.1, voltage: 1, current: 0.01 },
    maxValues: { activePower: 1000000, apparentPower: 1000000, voltage: 1000, current: 10000 },
    requiredFields: ['activePower'],
    conditionalFields: {
      power: ['activePower', 'apparentPower'],
      currentVoltage: ['voltage', 'current', 'activePower']
    },
    standardLimits: {
      powerFactor: { min: 0.1, max: 1.0, standard: 'BS 7671' },
      voltage: { min: 110, max: 1000, standard: 'BS 7671' }
    }
  },
  'three-phase-load': {
    minValues: { power: 0.1, voltage: 1, current: 0.01 },
    maxValues: { power: 10000000, voltage: 50000, current: 100000 },
    requiredFields: ['power', 'voltage'],
    conditionalFields: {},
    standardLimits: {
      voltage: { min: 380, max: 11000, standard: 'BS 7671' },
      current: { min: 0.1, max: 5000, standard: 'IET' }
    }
  },
  'motor-starting': {
    minValues: { power: 0.1, voltage: 1, efficiency: 0.1 },
    maxValues: { power: 50000, voltage: 50000, efficiency: 1.0 },
    requiredFields: ['power', 'voltage'],
    conditionalFields: {},
    standardLimits: {
      startingCurrent: { min: 1, max: 8, standard: 'BS 7671' },
      efficiency: { min: 0.8, max: 0.98, standard: 'IET' }
    }
  }
};

export const validateCalculation = (
  calculatorType: string,
  inputs: any,
  results: any
): ValidationResult => {
  const rules = validationRules[calculatorType];
  if (!rules) {
    return {
      isValid: false,
      errors: ['Unknown calculator type'],
      warnings: [],
      recommendations: [],
      standardsCompliance: { bs7671: false, iet: false, safety: false, commercial: false },
      professionalNotes: [],
      confidenceLevel: 'low'
    };
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  const professionalNotes: string[] = [];

  // Check required fields
  for (const field of rules.requiredFields) {
    if (!inputs[field] || inputs[field] === '' || inputs[field] === '0') {
      errors.push(`${field} is required`);
    }
  }

  // Check min/max values
  Object.entries(rules.minValues).forEach(([field, minValue]) => {
    const value = parseFloat(inputs[field]);
    if (value && value < minValue) {
      errors.push(`${field} must be at least ${minValue}`);
    }
  });

  Object.entries(rules.maxValues).forEach(([field, maxValue]) => {
    const value = parseFloat(inputs[field]);
    if (value && value > maxValue) {
      warnings.push(`${field} value ${value} is unusually high (max recommended: ${maxValue})`);
    }
  });

  // Check standard limits
  Object.entries(rules.standardLimits).forEach(([field, limit]) => {
    const value = results[field] || parseFloat(inputs[field]);
    if (value) {
      if (value < limit.min || value > limit.max) {
        warnings.push(`${field} value ${value} is outside ${limit.standard} recommended range (${limit.min}-${limit.max})`);
      }
    }
  });

  // Standards compliance
  const standardsCompliance = {
    bs7671: errors.length === 0 && warnings.length <= 1,
    iet: errors.length === 0,
    safety: errors.length === 0 && Object.keys(inputs).some(key => inputs[key]),
    commercial: errors.length === 0 && warnings.length === 0
  };

  // Professional recommendations
  if (calculatorType === 'power-factor' && results.powerFactor && results.powerFactor < 0.85) {
    recommendations.push('Consider power factor correction to improve efficiency');
    professionalNotes.push('Low power factor increases energy costs and may require larger cables');
  }

  if (calculatorType === 'three-phase-load' && results.unbalance && results.unbalance > 5) {
    warnings.push('Phase unbalance exceeds 5% - check load distribution');
    professionalNotes.push('High phase unbalance can cause motor overheating and reduced efficiency');
  }

  const confidenceLevel: 'high' | 'medium' | 'low' = 
    errors.length === 0 && warnings.length === 0 ? 'high' :
    errors.length === 0 ? 'medium' : 'low';

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations,
    standardsCompliance,
    professionalNotes,
    confidenceLevel
  };
};

// Create the CalculatorValidator class that other files expect
export class CalculatorValidator {
  static validateInputRange(value: number, type: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    switch (type) {
      case 'current':
        if (value < 0.01) errors.push('Current must be at least 0.01A');
        if (value > 10000) warnings.push('Current value is unusually high (>10kA)');
        break;
      case 'voltage':
        if (value < 1) errors.push('Voltage must be at least 1V');
        if (value > 50000) warnings.push('Voltage value is unusually high (>50kV)');
        break;
      case 'power':
        if (value < 0.1) errors.push('Power must be at least 0.1W');
        if (value > 1000000) warnings.push('Power value is unusually high (>1MW)');
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      recommendations: [],
      standardsCompliance: {
        bs7671: errors.length === 0,
        iet: errors.length === 0,
        safety: errors.length === 0,
        commercial: errors.length === 0 && warnings.length === 0
      },
      professionalNotes: [],
      confidenceLevel: errors.length === 0 ? (warnings.length === 0 ? 'high' : 'medium') : 'low'
    };
  }

  static validatePowerFactor(activePower: number, apparentPower: number, powerFactor: number): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (powerFactor < 0 || powerFactor > 1) {
      errors.push('Power factor must be between 0 and 1');
    }

    if (activePower > apparentPower) {
      errors.push('Active power cannot exceed apparent power');
    }

    if (powerFactor < 0.85) {
      warnings.push('Power factor below 0.85 may incur utility penalties');
      recommendations.push('Consider power factor correction equipment');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      recommendations,
      standardsCompliance: {
        bs7671: errors.length === 0 && powerFactor >= 0.85,
        iet: errors.length === 0,
        safety: errors.length === 0,
        commercial: errors.length === 0 && powerFactor >= 0.85
      },
      professionalNotes: powerFactor < 0.85 ? ['Low power factor increases cable sizing requirements'] : [],
      confidenceLevel: errors.length === 0 ? 'high' : 'low'
    };
  }

  static validateCableSizing(
    current: number, 
    cableSize: number, 
    installationType: string, 
    voltageDropPercent: number, 
    length: number
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Basic validation
    if (current <= 0) errors.push('Current must be greater than 0');
    if (cableSize <= 0) errors.push('Cable size must be greater than 0');
    if (length <= 0) errors.push('Cable length must be greater than 0');

    // Current density check (typical max 6 A/mm²)
    const currentDensity = current / cableSize;
    if (currentDensity > 6) {
      warnings.push(`Current density ${currentDensity.toFixed(1)} A/mm² exceeds recommended maximum (6 A/mm²)`);
    }

    // Voltage drop check
    if (voltageDropPercent > 5) {
      warnings.push(`Voltage drop ${voltageDropPercent.toFixed(1)}% exceeds BS 7671 limit (5%)`);
      recommendations.push('Consider larger cable size to reduce voltage drop');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      recommendations,
      standardsCompliance: {
        bs7671: errors.length === 0 && voltageDropPercent <= 5 && currentDensity <= 6,
        iet: errors.length === 0,
        safety: errors.length === 0 && currentDensity <= 6,
        commercial: errors.length === 0 && warnings.length === 0
      },
      professionalNotes: currentDensity > 4 ? ['High current density may cause cable heating'] : [],
      confidenceLevel: errors.length === 0 ? (warnings.length === 0 ? 'high' : 'medium') : 'low'
    };
  }

  static generateCalculationReport(
    calculationType: string,
    inputs: any,
    results: any,
    validation: ValidationResult
  ): string {
    const timestamp = new Date().toLocaleString();
    
    let report = `ELECTRICAL CALCULATION REPORT\n`;
    report += `================================\n\n`;
    report += `Calculation Type: ${calculationType}\n`;
    report += `Generated: ${timestamp}\n`;
    report += `Validation Status: ${validation.isValid ? 'VALID' : 'REQUIRES ATTENTION'}\n\n`;
    
    report += `INPUT PARAMETERS:\n`;
    report += `-----------------\n`;
    Object.entries(inputs).forEach(([key, value]) => {
      report += `${key}: ${value}\n`;
    });
    
    report += `\nCALCULATED RESULTS:\n`;
    report += `------------------\n`;
    Object.entries(results).forEach(([key, value]) => {
      report += `${key}: ${value}\n`;
    });
    
    if (validation.errors.length > 0) {
      report += `\nERRORS:\n`;
      report += `-------\n`;
      validation.errors.forEach(error => report += `• ${error}\n`);
    }
    
    if (validation.warnings.length > 0) {
      report += `\nWARNINGS:\n`;
      report += `---------\n`;
      validation.warnings.forEach(warning => report += `• ${warning}\n`);
    }
    
    if (validation.recommendations.length > 0) {
      report += `\nRECOMMENDATIONS:\n`;
      report += `---------------\n`;
      validation.recommendations.forEach(rec => report += `• ${rec}\n`);
    }
    
    report += `\nSTANDARDS COMPLIANCE:\n`;
    report += `--------------------\n`;
    report += `BS 7671: ${validation.standardsCompliance.bs7671 ? 'COMPLIANT' : 'NON-COMPLIANT'}\n`;
    report += `IET: ${validation.standardsCompliance.iet ? 'COMPLIANT' : 'NON-COMPLIANT'}\n`;
    report += `Safety: ${validation.standardsCompliance.safety ? 'COMPLIANT' : 'NON-COMPLIANT'}\n`;
    
    report += `\nPROFESSIONAL NOTICE:\n`;
    report += `-------------------\n`;
    report += `This calculation has been generated by Elec-Mate and validated against UK electrical standards.\n`;
    report += `Always verify critical calculations with a qualified electrician before implementation.\n`;
    
    return report;
  }
}
