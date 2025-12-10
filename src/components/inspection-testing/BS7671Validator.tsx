import { TestStep, TestResult, ValidationResult } from '@/types/inspection-testing';
import { zsValues, rcdZsValues, get80PercentZs } from '@/components/apprentice/calculators/zs-values/ZsValuesData';

export class BS7671Validator {
  
  // BS 7671 Table 41.3 - Maximum Zs values for MCBs (0.4s disconnection)
  private static maxZsValues: { [key: string]: number } = {
    // Type B MCBs
    'B3': 7.28, 'B6': 3.64, 'B10': 2.19, 'B16': 1.37, 'B20': 1.09, 'B25': 0.87,
    'B32': 0.68, 'B40': 0.55, 'B50': 0.44, 'B63': 0.35, 'B80': 0.27, 'B100': 0.22, 'B125': 0.17,
    // Type C MCBs
    'C3': 3.64, 'C6': 1.82, 'C10': 1.09, 'C16': 0.68, 'C20': 0.55, 'C25': 0.44,
    'C32': 0.34, 'C40': 0.27, 'C50': 0.22, 'C63': 0.17, 'C80': 0.14, 'C100': 0.11, 'C125': 0.09,
    // Type D MCBs  
    'D3': 1.82, 'D6': 0.91, 'D10': 0.55, 'D16': 0.34, 'D20': 0.27, 'D25': 0.22,
    'D32': 0.17, 'D40': 0.14, 'D50': 0.11, 'D63': 0.09, 'D80': 0.07, 'D100': 0.05, 'D125': 0.04,
    // RCDs (Table 41.5)
    'RCD30': 1667, 'RCD100': 500, 'RCD300': 167, 'RCD500': 100
  };

  static validateContinuityTest(result: TestResult): ValidationResult {
    const value = result.value;
    
    if (value === undefined) {
      return {
        isValid: false,
        message: 'Reading required for continuity test',
        severity: 'error'
      };
    }

    // BS 7671 Table 62 - Maximum values for R1+R2
    if (value > 1.67) {
      return {
        isValid: false,
        message: `Reading of ${value}Ω exceeds BS 7671 maximum (1.67Ω for most circuits)`,
        severity: 'error'
      };
    }

    if (value > 0.05) {
      return {
        isValid: true,
        message: `Reading acceptable but consider investigating values above 0.05Ω`,
        severity: 'warning'
      };
    }

    return {
      isValid: true,
      message: `Continuity test passes BS 7671 requirements`,
      severity: 'info'
    };
  }

  static validateInsulationResistance(result: TestResult): ValidationResult {
    const value = result.value;
    
    if (value === undefined) {
      return {
        isValid: false,
        message: 'Insulation resistance reading required',
        severity: 'error'
      };
    }

    // BS 7671 Table 61 - Minimum insulation resistance values
    const minimumValues = {
      'SELV/PELV': 0.25, // MΩ
      'up to 500V': 1.0,  // MΩ
      'above 500V': 1.0   // MΩ
    };

    if (value < 1.0) {
      return {
        isValid: false,
        message: `Insulation resistance of ${value}MΩ below BS 7671 minimum (1MΩ)`,
        severity: 'error'
      };
    }

    if (value < 2.0) {
      return {
        isValid: true,
        message: `Reading acceptable but consider further investigation below 2MΩ`,
        severity: 'warning'
      };
    }

    return {
      isValid: true,
      message: `Insulation resistance passes BS 7671 requirements`,
      severity: 'info'
    };
  }

  static validateEarthFaultLoop(result: TestResult, circuitType: string = 'B32'): ValidationResult {
    const value = result.value;
    
    if (value === undefined) {
      return {
        isValid: false,
        message: 'Zs measurement required',
        severity: 'error'
      };
    }

    // Get max Zs from BS 7671 tables
    const maxZs = this.maxZsValues[circuitType] || this.maxZsValues['B32'];
    const testZs = get80PercentZs(maxZs); // 80% rule for ambient temperature

    if (value > maxZs) {
      return {
        isValid: false,
        message: `Zs of ${value}Ω exceeds BS 7671 maximum (${maxZs}Ω) for ${circuitType}`,
        severity: 'error'
      };
    }

    if (value > testZs) {
      return {
        isValid: true,
        message: `Zs of ${value}Ω exceeds 80% test value (${testZs}Ω). May fail when cable is at operating temperature`,
        severity: 'warning'
      };
    }

    return {
      isValid: true,
      message: `Earth fault loop impedance within BS 7671 limits (max ${maxZs}Ω, 80% test value ${testZs}Ω)`,
      severity: 'info'
    };
  }

  static validateRCDTest(result: TestResult, rcdRating: number = 30): ValidationResult {
    const value = result.value;
    
    if (value === undefined) {
      return {
        isValid: false,
        message: 'RCD trip time measurement required',
        severity: 'error'
      };
    }

    // BS 7671 requirements for RCD operation times
    const maxTripTimes = {
      30: { // 30mA RCD
        '1x': 300,   // 1x rated current - max 300ms
        '5x': 40     // 5x rated current - max 40ms
      },
      100: { // 100mA RCD
        '1x': 300,
        '5x': 40
      },
      300: { // 300mA RCD
        '1x': 300,
        '5x': 40
      },
      500: { // 500mA RCD
        '1x': 300,
        '5x': 40
      }
    };

    const limits = maxTripTimes[rcdRating as keyof typeof maxTripTimes] || maxTripTimes[30];

    // Assume this is a 1x test unless specified otherwise
    const maxTime = limits['1x'];

    if (value > maxTime) {
      return {
        isValid: false,
        message: `RCD trip time of ${value}ms exceeds BS 7671 maximum (${maxTime}ms)`,
        severity: 'error'
      };
    }

    if (value > maxTime * 0.8) {
      return {
        isValid: true,
        message: `RCD trip time acceptable but approaching limit`,
        severity: 'warning'
      };
    }

    return {
      isValid: true,
      message: `RCD operation within BS 7671 requirements`,
      severity: 'info'
    };
  }

  static validatePolarity(result: TestResult): ValidationResult {
    // Polarity is typically a pass/fail test
    if (result.status === 'failed') {
      return {
        isValid: false,
        message: 'Polarity fault detected - single pole devices connected to neutral',
        severity: 'error'
      };
    }

    if (result.status === 'completed') {
      return {
        isValid: true,
        message: 'Polarity correct - all single pole devices on line conductor',
        severity: 'info'
      };
    }

    return {
      isValid: false,
      message: 'Polarity test incomplete',
      severity: 'warning'
    };
  }

  static validateTestStep(step: TestStep, result: TestResult): ValidationResult {
    switch (step.id) {
      case 'continuity-measurement':
        return this.validateContinuityTest(result);
      
      case 'insulation-test':
        return this.validateInsulationResistance(result);
      
      case 'zs-measurement':
        return this.validateEarthFaultLoop(result);
      
      case 'rcd-trip-test':
        return this.validateRCDTest(result);
      
      case 'polarity-check':
        return this.validatePolarity(result);
      
      default:
        return {
          isValid: true,
          message: 'Test completed',
          severity: 'info'
        };
    }
  }

  static getComplianceReport(testFlow: any, session: any): {
    overallCompliance: boolean;
    criticalIssues: string[];
    warnings: string[];
    recommendations: string[];
  } {
    const criticalIssues: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    session.results.forEach((result: TestResult) => {
      const step = testFlow.steps.find((s: TestStep) => s.id === result.stepId);
      if (step) {
        const validation = this.validateTestStep(step, result);
        
        if (!validation.isValid && validation.severity === 'error') {
          criticalIssues.push(validation.message);
        } else if (validation.severity === 'warning') {
          warnings.push(validation.message);
        }
      }
    });

    // Add general BS 7671 recommendations
    recommendations.push(
      'Ensure all test results are recorded in accordance with BS 7671 Chapter 63',
      'Consider environmental conditions during testing (temperature, humidity)',
      'Verify test equipment calibration certificates are current',
      'Document any deviations from standard test procedures',
      'Apply 80% rule when testing Zs at ambient temperature (Regulation 643.7.2)'
    );

    return {
      overallCompliance: criticalIssues.length === 0,
      criticalIssues,
      warnings,
      recommendations
    };
  }
  
  // Get maximum Zs value for a specific device
  static getMaxZs(deviceType: string): number | null {
    return this.maxZsValues[deviceType] || null;
  }
  
  // Get 80% test value for a specific device
  static getTestZs(deviceType: string): number | null {
    const maxZs = this.maxZsValues[deviceType];
    if (!maxZs) return null;
    return get80PercentZs(maxZs);
  }
}
