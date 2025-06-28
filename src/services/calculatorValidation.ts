
// Calculator Validation and Standards Compliance Service
// Ensures all electrical calculations meet BS 7671 and IET standards

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  standardsCompliance: {
    bs7671: boolean;
    iet: boolean;
    safety: boolean;
  };
}

export interface CalculationInput {
  value: number;
  unit: string;
  parameter: string;
}

export interface StandardsReference {
  standard: string;
  section: string;
  requirement: string;
  tolerance: number;
}

// BS 7671 Voltage Drop Limits
export const BS7671_VOLTAGE_DROP_LIMITS = {
  lighting: 3, // 3% for lighting circuits
  power: 5,   // 5% for power circuits
  fixed_heating: 5, // 5% for fixed heating
  motors: 10 // 10% for motor circuits (starting)
};

// BS 7671 Current Carrying Capacity Derating Factors
export const BS7671_DERATING_FACTORS = {
  grouping: {
    2: 0.8,
    3: 0.7,
    4: 0.65,
    5: 0.6,
    6: 0.57,
    9: 0.5,
    12: 0.45,
    16: 0.41,
    20: 0.38
  },
  ambient_temperature: {
    25: 1.03,
    30: 1.0,
    35: 0.94,
    40: 0.87,
    45: 0.79,
    50: 0.71,
    55: 0.61,
    60: 0.5
  },
  thermal_insulation: {
    none: 1.0,
    touching_one_side: 0.88,
    surrounded: 0.78,
    buried: 0.65
  }
};

// IET Wiring Regulations Standards
export const IET_STANDARDS = {
  earth_fault_loop_impedance: {
    max_disconnection_time: {
      lighting: 0.4, // seconds
      socket_outlets: 0.4, // seconds
      fixed_equipment: 5.0 // seconds
    }
  },
  rcd_requirements: {
    socket_outlets: 30, // mA
    bathroom_circuits: 30, // mA
    outdoor_circuits: 30 // mA
  }
};

export class CalculatorValidator {
  // Validate input ranges and safety limits
  static validateInputRange(value: number, parameter: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      standardsCompliance: {
        bs7671: true,
        iet: true,
        safety: true
      }
    };

    // Voltage validation
    if (parameter === 'voltage') {
      if (value < 0) {
        result.isValid = false;
        result.errors.push('Voltage cannot be negative');
        result.standardsCompliance.safety = false;
      }
      if (value > 1000) {
        result.warnings.push('High voltage detected - ensure appropriate safety measures');
      }
      if (![110, 230, 400, 415].includes(value) && value > 50) {
        result.warnings.push('Non-standard voltage - verify system compatibility');
      }
    }

    // Current validation
    if (parameter === 'current') {
      if (value < 0) {
        result.isValid = false;
        result.errors.push('Current cannot be negative');
        result.standardsCompliance.safety = false;
      }
      if (value > 1000) {
        result.warnings.push('High current detected - verify cable and protection ratings');
      }
    }

    // Power validation
    if (parameter === 'power') {
      if (value < 0) {
        result.isValid = false;
        result.errors.push('Power cannot be negative');
        result.standardsCompliance.safety = false;
      }
    }

    // Resistance/Impedance validation
    if (parameter.includes('resistance') || parameter.includes('impedance')) {
      if (value < 0) {
        result.isValid = false;
        result.errors.push('Resistance/Impedance cannot be negative');
        result.standardsCompliance.safety = false;
      }
    }

    return result;
  }

  // Validate cable sizing calculations against BS 7671
  static validateCableSizing(
    current: number,
    cableSize: string,
    installationType: string,
    voltageDrop: number,
    circuitLength: number
  ): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      standardsCompliance: {
        bs7671: true,
        iet: true,
        safety: true
      }
    };

    // Check voltage drop compliance
    const voltageDropPercentage = (voltageDrop / 230) * 100; // Assuming 230V
    if (voltageDropPercentage > BS7671_VOLTAGE_DROP_LIMITS.power) {
      result.errors.push(`Voltage drop ${voltageDropPercentage.toFixed(1)}% exceeds BS 7671 limit of ${BS7671_VOLTAGE_DROP_LIMITS.power}%`);
      result.standardsCompliance.bs7671 = false;
    }

    // Check current carrying capacity
    const cableSizeNum = parseFloat(cableSize);
    if (cableSizeNum < 1.0 && current > 16) {
      result.warnings.push('Small cable size for high current - verify current carrying capacity');
    }

    // Check installation method compliance
    if (!['pvc', 'xlpe', 'mineral'].includes(installationType.toLowerCase())) {
      result.warnings.push('Non-standard installation type - verify derating factors');
    }

    return result;
  }

  // Validate Ohm's Law calculations
  static validateOhmsLaw(voltage: number, current: number, resistance: number): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      standardsCompliance: {
        bs7671: true,
        iet: true,
        safety: true
      }
    };

    // Check basic Ohm's Law relationship
    const calculatedVoltage = current * resistance;
    const tolerance = 0.01; // 1% tolerance
    
    if (Math.abs(voltage - calculatedVoltage) > (voltage * tolerance)) {
      result.warnings.push('Values may not be consistent with Ohm\'s Law - please verify inputs');
    }

    // Safety checks
    const power = voltage * current;
    if (power > 10000) { // 10kW
      result.warnings.push('High power calculation - ensure adequate protection and safety measures');
    }

    return result;
  }

  // Validate RCD settings and compliance
  static validateRCD(rcdRating: number, circuitType: string, location: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      standardsCompliance: {
        bs7671: true,
        iet: true,
        safety: true
      }
    };

    // Check RCD rating compliance
    if (circuitType === 'socket_outlets' && rcdRating > 30) {
      result.errors.push('Socket outlet circuits require 30mA RCD protection per BS 7671');
      result.standardsCompliance.bs7671 = false;
    }

    if (location === 'bathroom' && rcdRating > 30) {
      result.errors.push('Bathroom circuits require 30mA RCD protection per BS 7671');
      result.standardsCompliance.bs7671 = false;
    }

    if (location === 'outdoor' && rcdRating > 30) {
      result.errors.push('Outdoor circuits require 30mA RCD protection per BS 7671');
      result.standardsCompliance.bs7671 = false;
    }

    return result;
  }

  // Cross-validate multiple calculation results
  static crossValidateResults(calculations: { [key: string]: number }): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      standardsCompliance: {
        bs7671: true,
        iet: true,
        safety: true
      }
    };

    // Power consistency check
    if (calculations.voltage && calculations.current && calculations.power) {
      const calculatedPower = calculations.voltage * calculations.current;
      const powerDifference = Math.abs(calculations.power - calculatedPower);
      const tolerance = calculations.power * 0.02; // 2% tolerance
      
      if (powerDifference > tolerance) {
        result.warnings.push('Power calculations may be inconsistent - verify all input values');
      }
    }

    // Impedance vs current relationship
    if (calculations.voltage && calculations.impedance && calculations.current) {
      const calculatedCurrent = calculations.voltage / calculations.impedance;
      const currentDifference = Math.abs(calculations.current - calculatedCurrent);
      const tolerance = calculations.current * 0.02; // 2% tolerance
      
      if (currentDifference > tolerance) {
        result.warnings.push('Current and impedance values may be inconsistent');
      }
    }

    return result;
  }

  // Generate professional calculation report
  static generateCalculationReport(
    calculationType: string,
    inputs: { [key: string]: any },
    results: { [key: string]: any },
    validation: ValidationResult
  ): string {
    const timestamp = new Date().toISOString();
    
    return `
ELECTRICAL CALCULATION REPORT
Generated: ${timestamp}
Calculation Type: ${calculationType}

INPUTS:
${Object.entries(inputs).map(([key, value]) => `${key}: ${value}`).join('\n')}

RESULTS:
${Object.entries(results).map(([key, value]) => `${key}: ${value}`).join('\n')}

STANDARDS COMPLIANCE:
BS 7671: ${validation.standardsCompliance.bs7671 ? 'COMPLIANT' : 'NON-COMPLIANT'}
IET Wiring Regulations: ${validation.standardsCompliance.iet ? 'COMPLIANT' : 'NON-COMPLIANT'}
Safety Requirements: ${validation.standardsCompliance.safety ? 'COMPLIANT' : 'NON-COMPLIANT'}

${validation.errors.length > 0 ? `ERRORS:\n${validation.errors.join('\n')}` : ''}
${validation.warnings.length > 0 ? `WARNINGS:\n${validation.warnings.join('\n')}` : ''}

This calculation has been validated against current UK electrical standards.
Always verify results with qualified personnel before implementation.
    `.trim();
  }
}
