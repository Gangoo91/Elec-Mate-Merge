
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
  static validateInputRange(value: number, type: string): ValidationResult {
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

    switch (type) {
      case 'current':
        if (value <= 0) {
          result.isValid = false;
          result.errors.push('Current must be greater than 0A');
          result.standardsCompliance.bs7671 = false;
          result.standardsCompliance.safety = false;
        }
        if (value > 1000) {
          result.warnings.push('High current values require special consideration');
        }
        break;
      
      case 'voltage':
        if (value <= 0) {
          result.isValid = false;
          result.errors.push('Voltage must be greater than 0V');
          result.standardsCompliance.bs7671 = false;
        }
        if (value > 1000) {
          result.warnings.push('High voltage installation - additional safety measures required');
        }
        break;
      
      case 'length':
        if (value <= 0) {
          result.isValid = false;
          result.errors.push('Cable length must be greater than 0m');
        }
        if (value > 100) {
          result.warnings.push('Long cable runs may require voltage drop consideration');
        }
        break;
    }

    return result;
  }

  static validateCableSizing(
    current: number,
    cableSize: string,
    installationType: string,
    voltageDrop: number,
    length: number
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

    // Basic validation
    if (current <= 0) {
      result.isValid = false;
      result.errors.push('Invalid current value');
      result.standardsCompliance.safety = false;
    }

    // Voltage drop validation (BS 7671 requirements)
    const maxVoltageDrop = current < 100 ? 0.03 : 0.05; // 3% for lighting, 5% for power
    if (voltageDrop > maxVoltageDrop * 230) { // Assuming 230V supply
      result.warnings.push(`Voltage drop exceeds BS 7671 recommendations (${(maxVoltageDrop * 100).toFixed(0)}%)`);
      result.standardsCompliance.bs7671 = false;
    }

    // Cable sizing validation
    if (!cableSize || cableSize.trim() === '') {
      result.isValid = false;
      result.errors.push('No suitable cable size found');
      result.standardsCompliance.safety = false;
    }

    // Long run considerations
    if (length > 50) {
      result.warnings.push('Long cable run - verify voltage drop and consider larger cable size');
    }

    return result;
  }
}
