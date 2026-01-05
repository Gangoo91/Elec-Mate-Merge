/**
 * Smart Validation System
 * Provides helpful, context-aware validation messages for BS7671 compliance
 */

import { getMaxZsFromDeviceDetails } from './zsCalculations';
import { getDefaultBsStandard } from '@/types/protectiveDeviceTypes';

export interface ValidationResult {
  status: 'pass' | 'warning' | 'error' | 'info';
  message: string;
  hint?: string;
  action?: string;
  bs7671Reference?: string;
}

/**
 * Validate Zs (Earth Fault Loop Impedance)
 * Per BS7671 Table 41.2-41.4
 */
export function validateZs(
  value: string,
  deviceType: string,
  deviceRating: string,
  deviceCurve?: string
): ValidationResult {
  const zs = parseFloat(value);
  if (isNaN(zs) || value.trim() === '') {
    return {
      status: 'info',
      message: 'Enter Zs value',
      hint: 'Earth fault loop impedance in Ohms',
    };
  }

  const bsStandard = getDefaultBsStandard(deviceType);
  const maxZs = getMaxZsFromDeviceDetails(bsStandard, deviceCurve || 'B', deviceRating);

  if (maxZs === null) {
    return {
      status: 'warning',
      message: 'Cannot determine max Zs',
      hint: 'Check protective device settings',
    };
  }

  // Apply 80% rule (already done in getMaxZsFromDeviceDetails)
  const percentOfMax = (zs / maxZs) * 100;

  if (zs > maxZs) {
    return {
      status: 'error',
      message: `Zs exceeds limit for ${deviceType} ${deviceCurve || ''}${deviceRating}A`,
      hint: `Maximum allowed: ${maxZs.toFixed(2)}Ω (with 80% derating). Measured: ${zs.toFixed(2)}Ω`,
      action: 'Check cable connections and route length. Verify instrument calibration.',
      bs7671Reference: 'Reg 411.4.5, Table 41.2',
    };
  }

  if (percentOfMax > 80) {
    return {
      status: 'warning',
      message: `Zs approaching limit (${percentOfMax.toFixed(0)}% of max)`,
      hint: `Measured: ${zs.toFixed(2)}Ω, Max: ${maxZs.toFixed(2)}Ω`,
      action: 'Consider cable route - value close to limit',
      bs7671Reference: 'Reg 411.4.5',
    };
  }

  return {
    status: 'pass',
    message: 'Within BS7671 limits',
    hint: `${percentOfMax.toFixed(0)}% of maximum ${maxZs.toFixed(2)}Ω`,
    bs7671Reference: 'Reg 411.4.5',
  };
}

/**
 * Validate R1+R2 (Continuity of CPC)
 * Per BS7671 Reg 612.2
 */
export function validateR1R2(value: string, cableSize?: string): ValidationResult {
  const r1r2 = parseFloat(value);
  if (isNaN(r1r2) || value.trim() === '') {
    return {
      status: 'info',
      message: 'Enter R1+R2 value',
      hint: 'Continuity of protective conductor in Ohms',
    };
  }

  // Typical expected ranges based on cable size
  const expectedRanges: Record<string, { typical: number; max: number }> = {
    '1.0': { typical: 0.8, max: 2.0 },
    '1.5': { typical: 0.5, max: 1.5 },
    '2.5': { typical: 0.3, max: 1.0 },
    '4.0': { typical: 0.2, max: 0.7 },
    '6.0': { typical: 0.15, max: 0.5 },
    '10.0': { typical: 0.1, max: 0.35 },
  };

  const range = cableSize ? expectedRanges[cableSize] : null;

  if (r1r2 <= 0) {
    return {
      status: 'error',
      message: 'Invalid reading - check connections',
      hint: 'R1+R2 must be greater than 0Ω',
      action: 'Verify test leads and connections',
      bs7671Reference: 'Reg 612.2',
    };
  }

  if (r1r2 > 5) {
    return {
      status: 'error',
      message: 'Unusually high reading',
      hint: `Measured: ${r1r2.toFixed(2)}Ω - check for poor connections`,
      action: 'Inspect all terminations and joints',
      bs7671Reference: 'Reg 612.2.1',
    };
  }

  if (range && r1r2 > range.max) {
    return {
      status: 'warning',
      message: `Higher than typical for ${cableSize}mm² cable`,
      hint: `Expected <${range.max}Ω, Measured: ${r1r2.toFixed(2)}Ω`,
      action: 'Check cable length calculation',
    };
  }

  return {
    status: 'pass',
    message: 'Acceptable',
    hint: cableSize && range
      ? `Within expected range for ${cableSize}mm² cable`
      : `Measured: ${r1r2.toFixed(2)}Ω`,
    bs7671Reference: 'Reg 612.2',
  };
}

/**
 * Validate Insulation Resistance
 * Per BS7671 Reg 612.3
 */
export function validateInsulationResistance(
  value: string,
  testVoltage: string = '500V'
): ValidationResult {
  const ir = parseFloat(value);
  if (isNaN(ir) || value.trim() === '') {
    return {
      status: 'info',
      message: 'Enter insulation resistance',
      hint: 'Minimum 1MΩ required per BS7671',
    };
  }

  // Minimum values per BS7671 Table 61
  const minValues: Record<string, number> = {
    '250V': 0.5, // SELV/PELV
    '500V': 1.0, // LV systems
    '1000V': 1.0, // >500V systems
  };

  const minRequired = minValues[testVoltage] || 1.0;

  if (ir < minRequired) {
    return {
      status: 'error',
      message: `Below minimum (${minRequired}MΩ)`,
      hint: `Measured: ${ir.toFixed(1)}MΩ at ${testVoltage}`,
      action: 'Check for moisture, damage, or contamination',
      bs7671Reference: 'Reg 612.3, Table 61',
    };
  }

  if (ir < 2) {
    return {
      status: 'warning',
      message: 'Low insulation resistance',
      hint: `Measured: ${ir.toFixed(1)}MΩ - monitor for deterioration`,
      action: 'Investigate cause - may indicate ageing',
      bs7671Reference: 'Reg 612.3',
    };
  }

  if (ir >= 200 || value.includes('>')) {
    return {
      status: 'pass',
      message: '>200MΩ - Excellent',
      hint: 'Very good insulation condition',
      bs7671Reference: 'Reg 612.3',
    };
  }

  return {
    status: 'pass',
    message: 'Satisfactory',
    hint: `${ir.toFixed(1)}MΩ at ${testVoltage} (min ${minRequired}MΩ)`,
    bs7671Reference: 'Reg 612.3',
  };
}

/**
 * Validate RCD Trip Time
 * Per BS7671 Reg 411.3.2
 */
export function validateRcdTripTime(
  tripTime: string,
  rcdRating: string,
  testMultiplier: '1x' | '5x' = '1x'
): ValidationResult {
  const time = parseFloat(tripTime);
  if (isNaN(time) || tripTime.trim() === '') {
    return {
      status: 'info',
      message: 'Enter RCD trip time',
      hint: 'Maximum trip time in milliseconds',
    };
  }

  // Maximum trip times per BS EN 61008/61009
  const maxTimes: Record<string, Record<string, number>> = {
    '30mA': { '1x': 300, '5x': 40 },
    '100mA': { '1x': 300, '5x': 40 },
    '300mA': { '1x': 300, '5x': 40 },
  };

  const maxTime = maxTimes[rcdRating]?.[testMultiplier] || 300;

  if (time > maxTime) {
    return {
      status: 'error',
      message: `Exceeds ${maxTime}ms limit at ${testMultiplier} IΔn`,
      hint: `Measured: ${time}ms for ${rcdRating} RCD`,
      action: 'RCD may require replacement',
      bs7671Reference: 'Reg 411.3.2, BS EN 61008',
    };
  }

  if (time <= 0) {
    return {
      status: 'error',
      message: 'Invalid reading',
      hint: 'Check test instrument connection',
    };
  }

  // Good performance thresholds
  const goodTime = maxTime * 0.5;
  if (time <= goodTime) {
    return {
      status: 'pass',
      message: 'Excellent response',
      hint: `${time}ms at ${testMultiplier} IΔn (max ${maxTime}ms)`,
      bs7671Reference: 'Reg 411.3.2',
    };
  }

  return {
    status: 'pass',
    message: 'Within limits',
    hint: `${time}ms at ${testMultiplier} IΔn (max ${maxTime}ms)`,
    bs7671Reference: 'Reg 411.3.2',
  };
}

/**
 * Validate Polarity
 */
export function validatePolarity(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return {
      status: 'info',
      message: 'Confirm polarity',
      hint: 'Verify correct L-N-E connections',
    };
  }

  const normalised = value.toLowerCase().trim();

  if (normalised === 'satisfactory' || normalised === 'sat' || normalised === 'ok' || normalised === '✓') {
    return {
      status: 'pass',
      message: 'Correct polarity confirmed',
      bs7671Reference: 'Reg 612.6',
    };
  }

  if (normalised === 'unsatisfactory' || normalised === 'unsat' || normalised === 'fail' || normalised === '✗') {
    return {
      status: 'error',
      message: 'Incorrect polarity detected',
      hint: 'Circuit must be isolated and rectified',
      action: 'DANGER: Correct wiring before energising',
      bs7671Reference: 'Reg 612.6',
    };
  }

  return {
    status: 'warning',
    message: 'Verify polarity status',
    hint: 'Enter "Satisfactory" or "Unsatisfactory"',
  };
}

/**
 * Validate Phase Balance (Three-Phase)
 * Per BS7671 guidance on load distribution
 */
export function validatePhaseBalance(L1: number, L2: number, L3: number): ValidationResult {
  const total = L1 + L2 + L3;
  if (total === 0) {
    return {
      status: 'info',
      message: 'Enter phase load currents',
      hint: 'Measure load current on each phase',
    };
  }

  const average = total / 3;
  const max = Math.max(L1, L2, L3);
  const min = Math.min(L1, L2, L3);
  const imbalance = average > 0 ? ((max - min) / average) * 100 : 0;

  if (imbalance > 10) {
    const highestPhase = L1 >= L2 && L1 >= L3 ? 'L1' : L2 >= L3 ? 'L2' : 'L3';
    const lowestPhase = L1 <= L2 && L1 <= L3 ? 'L1' : L2 <= L3 ? 'L2' : 'L3';

    return {
      status: 'error',
      message: `${imbalance.toFixed(1)}% imbalance exceeds 10% limit`,
      hint: `Highest: ${highestPhase} (${max}A), Lowest: ${lowestPhase} (${min}A)`,
      action: `Consider redistributing load from ${highestPhase} to ${lowestPhase}`,
      bs7671Reference: 'Reg 314.1',
    };
  }

  if (imbalance > 5) {
    return {
      status: 'warning',
      message: `${imbalance.toFixed(1)}% imbalance`,
      hint: 'Within limits but monitor for deterioration',
      bs7671Reference: 'Reg 314.1',
    };
  }

  return {
    status: 'pass',
    message: 'Phases well balanced',
    hint: `${imbalance.toFixed(1)}% imbalance (recommended <10%)`,
    bs7671Reference: 'Reg 314.1',
  };
}

/**
 * Get validation status color classes
 */
export function getValidationColorClass(status: ValidationResult['status']): string {
  switch (status) {
    case 'pass':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800';
    case 'warning':
      return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800';
    case 'error':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800';
    case 'info':
    default:
      return 'text-muted-foreground bg-muted/30 border-border';
  }
}

export default {
  validateZs,
  validateR1R2,
  validateInsulationResistance,
  validateRcdTripTime,
  validatePolarity,
  validatePhaseBalance,
  getValidationColorClass,
};
