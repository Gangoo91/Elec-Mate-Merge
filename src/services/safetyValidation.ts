
export interface SafetyFactors {
  temperatureDerating: number;
  groupingFactor: number;
  safetyMargin: number;
}

export interface ComplianceChecks {
  bs7671: boolean;
  iet: boolean;
  buildingRegs: boolean;
  cdm: boolean;
}

export interface SafetyValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  criticalAlerts: string[];
  safetyFactors: SafetyFactors;
  complianceChecks: ComplianceChecks;
}

export class SafetyValidator {
  static validateCableSizing(
    current: number,
    cableSize: string,
    installationType: string,
    ambientTemp: number,
    groupingFactor: number,
    voltageDrop: number
  ): SafetyValidationResult {
    const result: SafetyValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      criticalAlerts: [],
      safetyFactors: {
        temperatureDerating: 1.0,
        groupingFactor: 1.0,
        safetyMargin: 0
      },
      complianceChecks: {
        bs7671: true,
        iet: true,
        buildingRegs: true,
        cdm: true
      }
    };

    // Temperature derating
    if (ambientTemp > 30) {
      const derating = Math.max(0.5, 1 - ((ambientTemp - 30) * 0.01));
      result.safetyFactors.temperatureDerating = derating;
      
      if (ambientTemp > 60) {
        result.criticalAlerts.push(`CRITICAL: Ambient temperature ${ambientTemp}°C exceeds safe operating limits`);
        result.isValid = false;
        result.complianceChecks.bs7671 = false;
        result.complianceChecks.cdm = false;
      } else if (ambientTemp > 40) {
        result.warnings.push(`High ambient temperature (${ambientTemp}°C) requires cable derating`);
      }
    }

    // Grouping factor validation
    if (groupingFactor < 1.0) {
      result.safetyFactors.groupingFactor = groupingFactor;
      
      if (groupingFactor < 0.5) {
        result.warnings.push('Severe cable grouping - consider alternative installation methods');
      }
    }

    // Voltage drop validation
    const voltageDropPercent = (voltageDrop / 230) * 100;
    if (voltageDropPercent > 5) {
      result.warnings.push(`Voltage drop (${voltageDropPercent.toFixed(1)}%) exceeds BS 7671 limits`);
      result.complianceChecks.bs7671 = false;
    }

    if (voltageDropPercent > 10) {
      result.criticalAlerts.push(`CRITICAL: Voltage drop (${voltageDropPercent.toFixed(1)}%) severely exceeds safe limits`);
      result.isValid = false;
      result.complianceChecks.cdm = false;
    }

    // Safety margin calculation
    const totalDerating = result.safetyFactors.temperatureDerating * result.safetyFactors.groupingFactor;
    result.safetyFactors.safetyMargin = totalDerating;

    if (totalDerating < 0.6) {
      result.criticalAlerts.push('CRITICAL: Combined derating factors create unsafe operating conditions');
      result.isValid = false;
      result.complianceChecks.bs7671 = false;
      result.complianceChecks.cdm = false;
    }

    return result;
  }
}
