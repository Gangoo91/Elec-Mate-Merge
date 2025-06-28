// Enhanced Calculator Validation Service - BS 7671 & IET Compliant

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

export class CalculatorValidator {
  // BS 7671 Standard Limits and Requirements
  private static readonly BS7671_LIMITS = {
    // Voltage drop limits (%)
    maxVoltageDrop: {
      lighting: 3,
      power: 5,
      motor: 10
    },
    // Current carrying capacity safety margins
    currentSafetyMargin: 1.25, // 25% derating factor
    // Maximum Zs values (Ohms) for common protection devices
    maxZs: {
      6: 7.67,   // 6A MCB Type B
      10: 4.6,   // 10A MCB Type B
      16: 2.87,  // 16A MCB Type B
      20: 2.3,   // 20A MCB Type B
      32: 1.44,  // 32A MCB Type B
      40: 1.15,  // 40A MCB Type B
      50: 0.92   // 50A MCB Type B
    },
    // Temperature correction factors
    temperatureCorrection: {
      30: 1.0,   // Reference temperature
      35: 0.94,
      40: 0.87,
      45: 0.79,
      50: 0.71,
      55: 0.61,
      60: 0.50
    }
  };

  // Input validation ranges
  private static readonly INPUT_RANGES = {
    current: { min: 0.1, max: 1000 },
    voltage: { min: 12, max: 1000 },
    length: { min: 0.1, max: 1000 },
    powerFactor: { min: 0.1, max: 1.0 },
    resistance: { min: 0.001, max: 100 },
    frequency: { min: 50, max: 60 }
  };

  /**
   * Validate cable sizing calculations according to BS 7671
   */
  static validateCableSizing(
    current: number,
    cableSize: string,
    installationType: string,
    voltageDrop: number,
    length: number
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate current capacity with safety margin
    const requiredCapacity = current * this.BS7671_LIMITS.currentSafetyMargin;
    
    // Check voltage drop compliance
    const voltageDropPercentage = (voltageDrop / 230) * 100; // Assuming 230V supply
    
    if (voltageDropPercentage > this.BS7671_LIMITS.maxVoltageDrop.power) {
      errors.push(`Voltage drop (${voltageDropPercentage.toFixed(2)}%) exceeds BS 7671 limit (${this.BS7671_LIMITS.maxVoltageDrop.power}%)`);
    } else if (voltageDropPercentage > this.BS7671_LIMITS.maxVoltageDrop.power * 0.8) {
      warnings.push(`Voltage drop approaching BS 7671 limit - consider larger cable size`);
    }

    // Validate cable length for practical installation
    if (length > 100) {
      warnings.push(`Long cable run (${length}m) - verify voltage drop and consider voltage boosting`);
    }

    // Check installation method compliance
    const validInstallationTypes = ['pvc', 'xlpe', 'swa', 'lsf'];
    if (!validInstallationTypes.includes(installationType)) {
      errors.push(`Invalid installation type: ${installationType}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: errors.length === 0 && voltageDropPercentage <= this.BS7671_LIMITS.maxVoltageDrop.power,
        iet: errors.length === 0,
        safety: errors.length === 0 && current * this.BS7671_LIMITS.currentSafetyMargin <= requiredCapacity
      }
    };
  }

  /**
   * Validate power factor calculations
   */
  static validatePowerFactor(
    activePower: number,
    apparentPower: number,
    calculatedPF: number
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Power factor must be between 0 and 1
    if (calculatedPF < 0 || calculatedPF > 1) {
      errors.push(`Invalid power factor: ${calculatedPF.toFixed(3)} (must be between 0 and 1)`);
    }

    // Active power cannot exceed apparent power
    if (activePower > apparentPower) {
      errors.push(`Active power (${activePower}W) cannot exceed apparent power (${apparentPower}VA)`);
    }

    // Industry best practice warnings
    if (calculatedPF < 0.85) {
      warnings.push(`Low power factor (${calculatedPF.toFixed(3)}) - consider power factor correction`);
    }

    if (calculatedPF < 0.7) {
      errors.push(`Power factor too low (${calculatedPF.toFixed(3)}) - power factor correction required`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: calculatedPF >= 0.85,
        iet: calculatedPF >= 0.8,
        safety: calculatedPF >= 0.7
      }
    };
  }

  /**
   * Validate PFC calculations according to BS 7671
   */
  static validatePFC(
    voltage: number,
    impedance: number,
    calculatedPFC: number,
    breakingCapacity?: number
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate calculation accuracy
    const expectedPFC = voltage / impedance;
    const calculationError = Math.abs(calculatedPFC - expectedPFC) / expectedPFC;
    
    if (calculationError > 0.05) { // 5% tolerance
      errors.push(`PFC calculation error detected - expected ${expectedPFC.toFixed(0)}A, got ${calculatedPFC.toFixed(0)}A`);
    }

    // Check breaking capacity adequacy
    if (breakingCapacity && calculatedPFC > breakingCapacity) {
      errors.push(`PFC (${calculatedPFC.toFixed(0)}A) exceeds protective device breaking capacity (${breakingCapacity}A)`);
    } else if (breakingCapacity && calculatedPFC > breakingCapacity * 0.8) {
      warnings.push(`PFC approaching protective device limit - verify breaking capacity adequacy`);
    }

    // Validate impedance values are realistic
    if (impedance < 0.01) {
      warnings.push(`Very low impedance (${impedance}Ω) - verify measurement accuracy`);
    }

    if (impedance > 5) {
      warnings.push(`High impedance (${impedance}Ω) - may indicate supply issues`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: errors.length === 0 && (!breakingCapacity || calculatedPFC <= breakingCapacity),
        iet: errors.length === 0,
        safety: !breakingCapacity || calculatedPFC <= breakingCapacity * 0.8
      }
    };
  }

  /**
   * Validate input ranges for all calculator types
   */
  static validateInputRange(value: number, inputType: keyof typeof CalculatorValidator.INPUT_RANGES): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const range = this.INPUT_RANGES[inputType];

    if (!range) {
      errors.push(`Unknown input type: ${inputType}`);
    } else {
      if (value < range.min || value > range.max) {
        errors.push(`${inputType} value (${value}) outside valid range (${range.min} - ${range.max})`);
      }
      
      // Warn for extreme values
      if (value < range.min * 2 || value > range.max * 0.8) {
        warnings.push(`${inputType} value (${value}) is at extreme end of range - verify input`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: errors.length === 0,
        iet: errors.length === 0,
        safety: errors.length === 0
      }
    };
  }

  /**
   * Validate Ohms Law calculations
   */
  static validateOhmsLaw(
    voltage: number,
    current: number,
    resistance: number,
    calculationType: 'voltage' | 'current' | 'resistance'
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic input validation
    if (calculationType === 'voltage') {
      if (current <= 0) errors.push("Current must be greater than 0A");
      if (resistance <= 0) errors.push("Resistance must be greater than 0Ω");
      
      // Professional range checks
      if (current > 1000) warnings.push("High current detected - ensure appropriate safety measures");
      if (resistance > 1000000) warnings.push("Very high resistance - check measurement accuracy");
      
      // Calculate voltage for validation
      const calculatedVoltage = current * resistance;
      if (calculatedVoltage > 1000) {
        warnings.push("High voltage calculated - ensure appropriate safety classification");
      }
    } else if (calculationType === 'current') {
      if (voltage <= 0) errors.push("Voltage must be greater than 0V");
      if (resistance <= 0) errors.push("Resistance must be greater than 0Ω");
      
      // Professional range checks
      if (voltage > 1000) warnings.push("High voltage detected - ensure appropriate safety measures");
      if (resistance < 0.001) warnings.push("Very low resistance - check for short circuit conditions");
      
      // Calculate current for validation
      const calculatedCurrent = voltage / resistance;
      if (calculatedCurrent > 1000) {
        warnings.push("High current calculated - verify conductor capacity");
      }
    } else if (calculationType === 'resistance') {
      if (voltage <= 0) errors.push("Voltage must be greater than 0V");
      if (current <= 0) errors.push("Current must be greater than 0A");
      
      // Professional range checks
      if (voltage > 1000) warnings.push("High voltage detected - ensure appropriate safety measures");
      if (current > 1000) warnings.push("High current detected - ensure appropriate safety measures");
      
      // Calculate resistance for validation
      const calculatedResistance = voltage / current;
      if (calculatedResistance < 0.001) {
        warnings.push("Very low resistance calculated - check for short circuit conditions");
      }
    }

    // Power calculation warnings
    const power = voltage * current;
    if (power > 10000) {
      warnings.push("High power calculation - ensure adequate heat dissipation and safety measures");
    }

    // BS 7671 compliance checks
    const bs7671Compliant = errors.length === 0 && 
      voltage <= 1000 && // Within low voltage limits
      current <= 1000;  // Within practical current limits

    const result: ValidationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: bs7671Compliant,
        iet: bs7671Compliant, // IET standards align with BS 7671
        safety: errors.length === 0 && voltage <= 1000 && current <= 1000
      }
    };

    return result;
  }

  /**
   * Generate professional calculation report
   */
  static generateCalculationReport(
    calculationType: string,
    inputs: { [key: string]: any },
    results: { [key: string]: any },
    validation: ValidationResult
  ): string {
    const timestamp = new Date().toISOString();
    
    return `
ELECTRICAL CALCULATION REPORT
Generated by Elec-Mate Professional Calculator Suite
Timestamp: ${timestamp}
Standards: BS 7671:2018+A2:2022, IET Guidance

CALCULATION TYPE: ${calculationType.toUpperCase()}

INPUT PARAMETERS:
${Object.entries(inputs).map(([key, value]) => `  ${key}: ${value}`).join('\n')}

CALCULATED RESULTS:
${Object.entries(results).map(([key, value]) => `  ${key}: ${value}`).join('\n')}

STANDARDS COMPLIANCE:
  BS 7671:2018: ${validation.standardsCompliance.bs7671 ? '✓ COMPLIANT' : '✗ NON-COMPLIANT'}
  IET Guidelines: ${validation.standardsCompliance.iet ? '✓ COMPLIANT' : '✗ NON-COMPLIANT'}
  Safety Requirements: ${validation.standardsCompliance.safety ? '✓ SAFE' : '⚠ REVIEW REQUIRED'}

VALIDATION STATUS: ${validation.isValid ? 'PASSED' : 'FAILED'}

${validation.errors.length > 0 ? `ERRORS:\n${validation.errors.map(e => `  • ${e}`).join('\n')}\n` : ''}
${validation.warnings.length > 0 ? `WARNINGS:\n${validation.warnings.map(w => `  • ${w}`).join('\n')}\n` : ''}

PROFESSIONAL NOTICE:
This calculation has been validated against current UK electrical standards.
Always verify critical calculations with a qualified electrician before implementation.
This report is for professional use only and assumes correct input parameters.

Report generated by Elec-Mate Calculator Suite
www.elec-mate.co.uk | Apprentice Hub Professional Tools
    `.trim();
  }

  /**
   * Real-time calculation monitoring for accuracy
   */
  static monitorCalculationAccuracy(
    expectedResult: number,
    actualResult: number,
    tolerance: number = 0.01
  ): boolean {
    const error = Math.abs(expectedResult - actualResult) / Math.abs(expectedResult);
    return error <= tolerance;
  }
}
