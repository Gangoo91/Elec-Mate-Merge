
export interface SafetyValidationResult {
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

export class SafetyValidator {
  // Temperature derating factors for different installation conditions
  static getTemperatureDerating(ambientTemp: number, installationType: string): number {
    const deratingFactors = {
      'clipped-direct': {
        30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.50
      },
      'in-conduit': {
        30: 1.0, 35: 0.96, 40: 0.91, 45: 0.87, 50: 0.82, 55: 0.76, 60: 0.71
      },
      'buried-direct': {
        15: 1.04, 20: 1.0, 25: 0.96, 30: 0.93, 35: 0.89, 40: 0.85, 45: 0.80
      }
    };

    const factors = deratingFactors[installationType as keyof typeof deratingFactors] || deratingFactors['clipped-direct'];
    const temps = Object.keys(factors).map(Number).sort((a, b) => a - b);
    
    // Find appropriate derating factor
    for (let i = 0; i < temps.length; i++) {
      if (ambientTemp <= temps[i]) {
        return factors[temps[i] as keyof typeof factors];
      }
    }
    
    return 0.5; // Safety minimum for extreme temperatures
  }

  // Grouping factors for multiple cables
  static getGroupingFactor(numberOfCables: number, installationType: string): number {
    const groupingFactors = {
      'clipped-direct': {
        1: 1.0, 2: 0.80, 3: 0.70, 4: 0.65, 5: 0.60, 6: 0.57, 9: 0.52, 12: 0.48, 16: 0.45, 20: 0.43
      },
      'in-conduit': {
        1: 1.0, 2: 0.80, 3: 0.70, 4: 0.65, 5: 0.60, 6: 0.55, 9: 0.50, 12: 0.45, 16: 0.40, 20: 0.38
      },
      'in-trunking': {
        1: 1.0, 2: 0.85, 3: 0.79, 4: 0.75, 5: 0.73, 6: 0.72, 9: 0.68, 12: 0.66, 16: 0.64, 20: 0.63
      }
    };

    const factors = groupingFactors[installationType as keyof typeof groupingFactors] || groupingFactors['in-conduit'];
    const counts = Object.keys(factors).map(Number).sort((a, b) => a - b);
    
    // Find appropriate grouping factor
    for (let i = counts.length - 1; i >= 0; i--) {
      if (numberOfCables >= counts[i]) {
        return factors[counts[i] as keyof typeof factors];
      }
    }
    
    return 1.0;
  }

  // Validate cable sizing with real-world factors
  static validateCableSizing(
    designCurrent: number,
    cableSize: string,
    installationType: string,
    ambientTemp: number = 30,
    numberOfCables: number = 1,
    cableLength: number = 0
  ): SafetyValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const criticalAlerts: string[] = [];

    // Get derating factors
    const tempDerating = this.getTemperatureDerating(ambientTemp, installationType);
    const groupingFactor = this.getGroupingFactor(numberOfCables, installationType);
    const overallDerating = tempDerating * groupingFactor;

    // Cable current ratings (A) - simplified for common sizes
    const cableRatings: Record<string, Record<string, number>> = {
      '1.5': { 'clipped-direct': 20, 'in-conduit': 16, 'buried-direct': 24 },
      '2.5': { 'clipped-direct': 27, 'in-conduit': 23, 'buried-direct': 32 },
      '4.0': { 'clipped-direct': 37, 'in-conduit': 31, 'buried-direct': 43 },
      '6.0': { 'clipped-direct': 47, 'in-conduit': 39, 'buried-direct': 54 },
      '10.0': { 'clipped-direct': 65, 'in-conduit': 54, 'buried-direct': 75 },
      '16.0': { 'clipped-direct': 85, 'in-conduit': 73, 'buried-direct': 100 }
    };

    const baseCableRating = cableRatings[cableSize]?.[installationType] || 0;
    const deratedCableRating = baseCableRating * overallDerating;

    // Critical safety checks
    if (designCurrent > deratedCableRating) {
      criticalAlerts.push(`DANGER: Design current (${designCurrent}A) exceeds derated cable capacity (${deratedCableRating.toFixed(1)}A). Risk of overheating and fire.`);
    }

    if (designCurrent > baseCableRating * 0.8) {
      warnings.push(`High loading: Cable operating at ${((designCurrent / baseCableRating) * 100).toFixed(1)}% of base capacity`);
    }

    // Temperature warnings
    if (ambientTemp > 40) {
      warnings.push(`High ambient temperature (${ambientTemp}°C) significantly reduces cable capacity`);
    }

    // Grouping warnings
    if (numberOfCables > 6) {
      warnings.push(`High cable grouping (${numberOfCables} cables) reduces capacity to ${(groupingFactor * 100).toFixed(0)}%`);
    }

    // Long circuit voltage drop warning
    if (cableLength > 50) {
      warnings.push(`Long circuit (${cableLength}m) - verify voltage drop compliance`);
    }

    return {
      isValid: criticalAlerts.length === 0,
      errors,
      warnings,
      criticalAlerts,
      safetyFactors: {
        temperatureDerating: tempDerating,
        groupingFactor,
        diversityFactor: 1.0,
        safetyMargin: deratedCableRating / designCurrent
      },
      complianceChecks: {
        bs7671: criticalAlerts.length === 0,
        iet: true,
        buildingRegs: true,
        cdm: true
      }
    };
  }

  // Validate Zs values with temperature considerations
  static validateZsValues(
    measuredZs: number,
    maxZs: number,
    testTemperature: number = 20,
    operatingTemperature: number = 70
  ): SafetyValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const criticalAlerts: string[] = [];

    // Temperature correction factor for copper conductors
    const tempCorrectionFactor = (234.5 + operatingTemperature) / (234.5 + testTemperature);
    const correctedZs = measuredZs * tempCorrectionFactor;

    // Critical safety checks
    if (correctedZs > maxZs) {
      criticalAlerts.push(`DANGER: Temperature-corrected Zs (${correctedZs.toFixed(3)}Ω) exceeds maximum permitted (${maxZs}Ω). Protective device may not operate in time.`);
    }

    if (measuredZs > maxZs * 0.8) {
      warnings.push(`Measured Zs approaching limit - consider cable condition and connections`);
    }

    // Temperature differential warning
    if (Math.abs(testTemperature - 20) > 10) {
      warnings.push(`Test temperature (${testTemperature}°C) significantly different from standard 20°C`);
    }

    return {
      isValid: criticalAlerts.length === 0,
      errors,
      warnings,
      criticalAlerts,
      safetyFactors: {
        temperatureDerating: tempCorrectionFactor,
        groupingFactor: 1.0,
        diversityFactor: 1.0,
        safetyMargin: maxZs / correctedZs
      },
      complianceChecks: {
        bs7671: criticalAlerts.length === 0,
        iet: true,
        buildingRegs: true,
        cdm: true
      }
    };
  }

  // Validate power factor with harmonic considerations
  static validatePowerFactor(
    powerFactor: number,
    harmonicDistortion: number = 0,
    loadType: string = 'linear'
  ): SafetyValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const criticalAlerts: string[] = [];

    // Power factor thresholds
    if (powerFactor < 0.85) {
      warnings.push(`Poor power factor (${powerFactor}) - energy efficiency penalty and increased losses`);
    }

    if (powerFactor < 0.7) {
      criticalAlerts.push(`Very poor power factor (${powerFactor}) - risk of voltage regulation issues and equipment stress`);
    }

    // Harmonic warnings for non-linear loads
    if (loadType === 'non-linear' && harmonicDistortion > 5) {
      warnings.push(`High harmonic distortion (${harmonicDistortion}%) with non-linear loads - consider harmonic filtering`);
    }

    if (harmonicDistortion > 8) {
      criticalAlerts.push(`Excessive harmonic distortion (${harmonicDistortion}%) - risk of equipment malfunction and overheating`);
    }

    return {
      isValid: criticalAlerts.length === 0,
      errors,
      warnings,
      criticalAlerts,
      safetyFactors: {
        temperatureDerating: 1.0,
        groupingFactor: 1.0,
        diversityFactor: 1.0,
        safetyMargin: powerFactor > 0 ? 1 / powerFactor : 0
      },
      complianceChecks: {
        bs7671: powerFactor >= 0.85,
        iet: true,
        buildingRegs: true,
        cdm: true
      }
    };
  }

  // Validate three-phase calculations with imbalance considerations
  static validateThreePhase(
    phaseCurrents: [number, number, number],
    neutralCurrent: number = 0,
    systemType: string = 'balanced'
  ): SafetyValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const criticalAlerts: string[] = [];

    const [i1, i2, i3] = phaseCurrents;
    const avgCurrent = (i1 + i2 + i3) / 3;
    
    // Calculate imbalance percentage
    const maxDeviation = Math.max(
      Math.abs(i1 - avgCurrent),
      Math.abs(i2 - avgCurrent),
      Math.abs(i3 - avgCurrent)
    );
    const imbalancePercent = (maxDeviation / avgCurrent) * 100;

    // Imbalance warnings
    if (imbalancePercent > 5) {
      warnings.push(`Phase imbalance ${imbalancePercent.toFixed(1)}% - may cause motor overheating and reduced efficiency`);
    }

    if (imbalancePercent > 10) {
      criticalAlerts.push(`Severe phase imbalance ${imbalancePercent.toFixed(1)}% - risk of equipment damage and premature failure`);
    }

    // Neutral current warnings
    const theoreticalNeutralCurrent = Math.sqrt(
      Math.pow(i1 - avgCurrent, 2) + Math.pow(i2 - avgCurrent, 2) + Math.pow(i3 - avgCurrent, 2)
    );

    if (neutralCurrent > theoreticalNeutralCurrent * 1.5) {
      warnings.push(`High neutral current - possible harmonic content or phase imbalance`);
    }

    return {
      isValid: criticalAlerts.length === 0,
      errors,
      warnings,
      criticalAlerts,
      safetyFactors: {
        temperatureDerating: 1.0,
        groupingFactor: 1.0,
        diversityFactor: 1.0,
        safetyMargin: 100 / imbalancePercent
      },
      complianceChecks: {
        bs7671: imbalancePercent <= 10,
        iet: true,
        buildingRegs: true,
        cdm: true
      }
    };
  }
}
