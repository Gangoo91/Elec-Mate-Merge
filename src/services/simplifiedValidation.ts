import {
  getGroupingFactor,
  getTemperatureFactor,
} from '@/lib/calculators/bs7671-data/temperatureFactors';
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
    // NOTE: `iet`, `buildingRegs` and `cdm` flags used to live here, each set to
    // the BS 7671 result. None of those regimes is evaluated anywhere in this
    // file, so they asserted compliance that had never been assessed. Nothing
    // rendered them, which is the only reason this was not shipping a false
    // claim — removed rather than left for a future UI to pick up.
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
      errors.push('Current must be greater than 0A');
    }

    if (current > 1000) {
      criticalAlerts.push(
        'Very high current detected. Verify calculations and consider specialist consultation.'
      );
    }

    if (ambientTemp > 40) {
      warnings.push('High ambient temperature requires additional derating considerations');
    }

    if (ambientTemp > 60) {
      criticalAlerts.push(
        'Extremely high ambient temperature. Special high-temperature cables required.'
      );
    }

    if (cableGrouping > 12) {
      warnings.push('Large cable groupings require careful thermal management');
    }

    if (length > 100) {
      warnings.push('Long cable runs may require voltage drop verification');
    }

    // Cable size validation
    const cableSizeNum = parseFloat(cableSize.replace(/[^\d.]/g, ''));

    if (current > 100 && cableSizeNum < 16) {
      warnings.push('High current with small cable size - verify current capacity');
    }

    if (safetyMargin < 0.8) {
      warnings.push('Low safety margin due to environmental factors');
    }

    if (safetyMargin < 0.6) {
      criticalAlerts.push(
        'Safety margin too low - increase cable size or improve installation conditions'
      );
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
        safetyMargin,
      },
      complianceChecks: {
        bs7671: bs7671Compliant,
      },
    };
  }

  /**
   * Ca and Cg now come from the verified shared tables in
   * `@/lib/calculators/bs7671-data/temperatureFactors`, not from private copies.
   *
   * 🔴 WHAT THE PRIVATE COPIES GOT WRONG
   * Cg was bucketed `<=3 -> 0.80, <=6 -> 0.70, <=9 -> 0.65, <=12 -> 0.60, else 0.50`.
   * Table 4C1 bunched gives 3 -> 0.70, 6 -> 0.57, 9 -> 0.50, 12 -> 0.45, 20 -> 0.38.
   * Every bucket resolved to its most generous member, over-stating capacity by
   * 14% at three circuits and 33% at twelve — the unsafe direction, because Cg
   * multiplies the tabulated rating.
   *
   * Ca's buckets happened to match Table 4B1 for 70 C thermoplastic, but the
   * `return 0.35` above 60 C was invented: 4B1 prints a dash there, and
   * temperatureFactors.ts had already removed that same 0.35 earlier today. This
   * copy never got the fix — which is precisely the argument for not keeping copies.
   */
  private static calculateTemperatureDerating(ambientTemp: number): number {
    return getTemperatureFactor(ambientTemp, '70C');
  }

  private static calculateGroupingFactor(grouping: number): number {
    return getGroupingFactor(grouping, 'bunched');
  }
}

// Export as SafetyValidator for backward compatibility
export const SafetyValidator = SimpleValidator;
export type SafetyValidationResult = SimpleValidationResult;
