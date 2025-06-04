
import { TestStep, TestResult, ValidationResult } from '@/types/inspection-testing';

export class BS7671Validator {
  
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

  static validateEarthFaultLoop(result: TestResult, circuitType: string = 'standard'): ValidationResult {
    const value = result.value;
    
    if (value === undefined) {
      return {
        isValid: false,
        message: 'Zs measurement required',
        severity: 'error'
      };
    }

    // BS 7671 Appendix 3 - Maximum Zs values for different protective devices
    const maxZsValues: { [key: string]: number } = {
      'B6': 7.67,   // 6A Type B MCB
      'B10': 4.60,  // 10A Type B MCB
      'B16': 2.87,  // 16A Type B MCB
      'B20': 2.30,  // 20A Type B MCB
      'B32': 1.44,  // 32A Type B MCB
      'C6': 3.83,   // 6A Type C MCB
      'C10': 2.30,  // 10A Type C MCB
      'C16': 1.44,  // 16A Type C MCB
      'C20': 1.15,  // 20A Type C MCB
      'C32': 0.72,  // 32A Type C MCB
      'RCD': 1667   // 30mA RCD protection
    };

    // Default to common 32A Type B MCB if not specified
    const maxZs = maxZsValues[circuitType] || maxZsValues['B32'];

    if (value > maxZs) {
      return {
        isValid: false,
        message: `Zs of ${value}Ω exceeds BS 7671 maximum (${maxZs}Ω) for this protective device`,
        severity: 'error'
      };
    }

    if (value > maxZs * 0.8) {
      return {
        isValid: true,
        message: `Zs acceptable but approaching limit. Consider temperature corrections`,
        severity: 'warning'
      };
    }

    return {
      isValid: true,
      message: `Earth fault loop impedance within BS 7671 limits`,
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
      'Document any deviations from standard test procedures'
    );

    return {
      overallCompliance: criticalIssues.length === 0,
      criticalIssues,
      warnings,
      recommendations
    };
  }
}
