
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
