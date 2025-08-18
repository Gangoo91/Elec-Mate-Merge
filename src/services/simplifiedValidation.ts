// Simplified validation service for cable sizing calculations
// This provides basic safety validation without complex dependencies

export interface SimpleValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  criticalAlerts: string[];
  safetyFactors: {
    temperatureDerating: number;
    groupingFactor: number;
    diversityFactor: number;
    safetyMargin: number;
  };
  complianceChecks: {
    bs7671: boolean;
    iet: boolean;
    buildingRegs: boolean;
    cdm: boolean;
  };
}

export class SimpleValidator {
  static validateCableSizing(
    current: number,
    cableSize: string,
    installationType: string,
    ambientTemp: number = 30,
    cableGrouping: number = 1,
    length: number = 0
  ): SimpleValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const criticalAlerts: string[] = [];

    // Calculate derating factors
    const temperatureDerating = this.calculateTemperatureDerating(ambientTemp);
    const groupingFactor = this.calculateGroupingFactor(cableGrouping);
    const diversityFactor = 1.0; // Default
    
    // Basic safety margin calculation
    const safetyMargin = temperatureDerating * groupingFactor;

    // Basic validations
    if (current <= 0) {
      errors.push("Current must be greater than 0A");
    }

    if (current > 1000) {
      criticalAlerts.push("Very high current detected. Verify calculations and consider specialist consultation.");
    }

    if (ambientTemp > 40) {
      warnings.push("High ambient temperature requires additional derating considerations");
    }

    if (ambientTemp > 60) {
      criticalAlerts.push("Extremely high ambient temperature. Special high-temperature cables required.");
    }

    if (cableGrouping > 12) {
      warnings.push("Large cable groupings require careful thermal management");
    }

    if (length > 100) {
      warnings.push("Long cable runs may require voltage drop verification");
    }

    // Cable size validation
    const cableSizeNum = parseFloat(cableSize.replace(/[^\d.]/g, ''));
    
    if (current > 100 && cableSizeNum < 16) {
      warnings.push("High current with small cable size - verify current capacity");
    }

    if (safetyMargin < 0.8) {
      warnings.push("Low safety margin due to environmental factors");
    }

    if (safetyMargin < 0.6) {
      criticalAlerts.push("Safety margin too low - increase cable size or improve installation conditions");
    }

    // Compliance checks (simplified)
    const bs7671Compliant = errors.length === 0 && criticalAlerts.length === 0;
    
    return {
      isValid: errors.length === 0 && criticalAlerts.length === 0,
      errors,
      warnings,
      criticalAlerts,
      safetyFactors: {
        temperatureDerating,
        groupingFactor,
        diversityFactor,
        safetyMargin
      },
      complianceChecks: {
        bs7671: bs7671Compliant,
        iet: bs7671Compliant,
        buildingRegs: bs7671Compliant,
        cdm: bs7671Compliant && criticalAlerts.length === 0
      }
    };
  }

  private static calculateTemperatureDerating(ambientTemp: number): number {
    if (ambientTemp <= 30) return 1.0;
    if (ambientTemp <= 35) return 0.94;
    if (ambientTemp <= 40) return 0.87;
    if (ambientTemp <= 45) return 0.79;
    if (ambientTemp <= 50) return 0.71;
    if (ambientTemp <= 55) return 0.61;
    if (ambientTemp <= 60) return 0.50;
    return 0.35; // Above 60°C
  }

  private static calculateGroupingFactor(grouping: number): number {
    if (grouping <= 1) return 1.0;
    if (grouping <= 3) return 0.8;
    if (grouping <= 6) return 0.7;
    if (grouping <= 9) return 0.65;
    if (grouping <= 12) return 0.6;
    return 0.5; // More than 12 cables
  }
}

// Export as SafetyValidator for backward compatibility
export const SafetyValidator = SimpleValidator;
export type SafetyValidationResult = SimpleValidationResult;