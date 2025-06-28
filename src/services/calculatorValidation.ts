
export class CalculatorValidator {
  // Input range validation
  static validateInputRange(value: number, type: string) {
    const ranges = {
      current: { min: 0.1, max: 1000, unit: 'A' },
      voltage: { min: 1, max: 1000, unit: 'V' },
      power: { min: 0.01, max: 10000, unit: 'W' },
      length: { min: 0.1, max: 10000, unit: 'm' },
      resistance: { min: 0.001, max: 1000, unit: 'Ω' }
    };

    const range = ranges[type as keyof typeof ranges];
    if (!range) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        standardsCompliance: { bs7671: true, iet: true, safety: true }
      };
    }

    const errors = [];
    const warnings = [];

    if (value < range.min) {
      errors.push(`${type} value too low (minimum: ${range.min}${range.unit})`);
    }
    if (value > range.max) {
      errors.push(`${type} value too high (maximum: ${range.max}${range.unit})`);
    }

    // Add warnings for edge cases
    if (type === 'current' && value > 63) {
      warnings.push('High current values may require special protection measures');
    }
    if (type === 'voltage' && value > 400) {
      warnings.push('High voltage installations require additional safety measures');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: errors.length === 0,
        iet: true,
        safety: errors.length === 0 && warnings.length === 0
      }
    };
  }

  // Cable sizing validation
  static validateCableSizing(current: number, cableSize: number, installationType: string, voltageDrop: number, length: number) {
    const errors = [];
    const warnings = [];

    // Current capacity check
    const currentRatings = {
      'Method A (enclosed in conduit)': { 1.0: 11, 1.5: 14.5, 2.5: 20, 4.0: 26, 6.0: 34 },
      'Method B (on cable tray)': { 1.0: 13, 1.5: 17.5, 2.5: 24, 4.0: 32, 6.0: 41 },
      'Method C (clipped direct)': { 1.0: 15, 1.5: 19.5, 2.5: 27, 4.0: 36, 6.0: 46 }
    };

    const ratings = currentRatings[installationType as keyof typeof currentRatings] || currentRatings['Method C (clipped direct)'];
    const rating = ratings[cableSize as keyof typeof ratings];

    if (rating && current > rating) {
      errors.push(`Cable size ${cableSize}mm² insufficient for ${current}A (rating: ${rating}A)`);
    }

    // Voltage drop check (3% for lighting, 5% for other circuits)
    if (voltageDrop > 23) { // 5% of 230V
      warnings.push('Voltage drop exceeds BS 7671 recommendations (5%)');
    }

    // Length considerations
    if (length > 100) {
      warnings.push('Long cable runs may require voltage drop calculations');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: errors.length === 0 && voltageDrop <= 23,
        iet: true,
        safety: errors.length === 0
      }
    };
  }

  // Ohm's Law validation
  static validateOhmsLaw(voltage: number, current: number, resistance: number, power: number) {
    const errors = [];
    const warnings = [];

    // Basic safety checks
    if (voltage > 50 && current > 0.005) {
      warnings.push('High voltage and current combination - ensure proper safety measures');
    }

    if (power > 3000) {
      warnings.push('High power levels require appropriate cable sizing and protection');
    }

    // Calculation consistency check
    const calculatedPower = voltage * current;
    const powerDifference = Math.abs(power - calculatedPower) / power;
    
    if (powerDifference > 0.1) { // 10% tolerance
      warnings.push('Power calculation may be inconsistent with V×I');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: voltage <= 1000 && current <= 100,
        iet: true,
        safety: voltage <= 230 || (voltage <= 400 && current <= 32)
      }
    };
  }

  // PFC (Prospective Fault Current) validation
  static validatePFC(pfc: number, voltage: number, impedance: number) {
    const errors = [];
    const warnings = [];

    // PFC safety limits
    if (pfc > 16000) {
      errors.push('PFC exceeds typical MCB breaking capacity (16kA)');
    }

    if (pfc > 6000) {
      warnings.push('High PFC - ensure MCB/RCBO breaking capacity is adequate');
    }

    if (pfc < 100) {
      warnings.push('Very low PFC may indicate high circuit impedance');
    }

    // Impedance check
    if (impedance > 1.5) {
      warnings.push('High circuit impedance may affect fault protection');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      standardsCompliance: {
        bs7671: pfc <= 16000 && impedance <= 1.64, // BS 7671 maximum Zs values
        iet: true,
        safety: pfc <= 10000 // Conservative safety limit
      }
    };
  }

  // Generate calculation report
  static generateCalculationReport(calculationType: string, inputs: any, results: any, validation: any): string {
    const timestamp = new Date().toISOString();
    
    let report = `ELECTRICAL CALCULATION REPORT\n`;
    report += `Generated: ${timestamp}\n`;
    report += `Calculation Type: ${calculationType}\n`;
    report += `\n--- INPUT PARAMETERS ---\n`;
    
    Object.entries(inputs).forEach(([key, value]) => {
      report += `${key}: ${value}\n`;
    });
    
    report += `\n--- CALCULATED RESULTS ---\n`;
    Object.entries(results).forEach(([key, value]) => {
      report += `${key}: ${value}\n`;
    });
    
    report += `\n--- VALIDATION STATUS ---\n`;
    report += `Overall Status: ${validation.isValid ? 'PASS' : 'FAIL'}\n`;
    report += `BS 7671 Compliant: ${validation.standardsCompliance.bs7671 ? 'YES' : 'NO'}\n`;
    report += `Safety Compliant: ${validation.standardsCompliance.safety ? 'YES' : 'NO'}\n`;
    
    if (validation.errors.length > 0) {
      report += `\n--- ERRORS ---\n`;
      validation.errors.forEach((error: string, index: number) => {
        report += `${index + 1}. ${error}\n`;
      });
    }
    
    if (validation.warnings.length > 0) {
      report += `\n--- WARNINGS ---\n`;
      validation.warnings.forEach((warning: string, index: number) => {
        report += `${index + 1}. ${warning}\n`;
      });
    }
    
    report += `\n--- DISCLAIMER ---\n`;
    report += `This calculation is for guidance only. Professional verification recommended.\n`;
    report += `Always consult BS 7671 and relevant standards for final design decisions.\n`;
    
    return report;
  }
}
