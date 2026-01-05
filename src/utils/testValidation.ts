import { TestResult } from '@/types/testResult';
import { protectiveDeviceOptions } from '@/types/protectiveDeviceTypes';

// BS 7671 limits and validation rules
// Table 41.3 - MCBs to BS EN 60898 and RCBOs to BS EN 61009 (0.4s disconnection)
export const BS7671_LIMITS = {
  // Maximum Zs values for different protective devices (Ω)
  ZS_LIMITS: {
    // Type B MCBs - Table 41.3(a)
    'B6': 7.28,
    'B10': 4.37,
    'B16': 2.73,
    'B20': 2.19,
    'B25': 1.75,
    'B32': 1.37,
    'B40': 1.09,
    'B50': 0.87,
    'B63': 0.69,
    'B80': 0.55,
    'B100': 0.44,
    'B125': 0.35,
    // Type C MCBs - Table 41.3(b)
    'C6': 3.64,
    'C10': 2.19,
    'C16': 1.37,
    'C20': 1.09,
    'C25': 0.87,
    'C32': 0.68,
    'C40': 0.55,
    'C50': 0.44,
    'C63': 0.35,
    'C80': 0.27,
    'C100': 0.22,
    'C125': 0.17,
    // Type D MCBs - Table 41.3(c)
    'D6': 1.82,
    'D10': 1.09,
    'D16': 0.68,
    'D20': 0.55,
    'D25': 0.44,
    'D32': 0.34,
    'D40': 0.27,
    'D50': 0.22,
    'D63': 0.17,
    'D80': 0.14,
    'D100': 0.11,
    'D125': 0.09,
  },
  
  // R1+R2 typical values based on cable size and length (Ω/km)
  R1_R2_GUIDANCE: {
    '1.5mm': { min: 24.2, max: 30.2 },
    '2.5mm': { min: 14.8, max: 18.1 },
    '4mm': { min: 9.22, max: 11.5 },
    '6mm': { min: 6.16, max: 7.41 },
    '10mm': { min: 3.66, max: 4.61 },
    '16mm': { min: 2.30, max: 2.87 },
  },
  
  // Minimum insulation resistance (MΩ)
  INSULATION_RESISTANCE: {
    nominal_voltage_up_to_500V: 1.0,
    nominal_voltage_over_500V: 1000.0 / 1000, // Convert to MΩ
  },
  
  // RCD operating times (ms) - Amendment 3: Only 1x required
  RCD_TIMES: {
    '30mA': { one_rated: 300 },
    '100mA': { one_rated: 300 },
    '300mA': { one_rated: 300 },
    '500mA': { one_rated: 300 },
  }
};

export interface ValidationResult {
  isValid: boolean;
  level: 'pass' | 'warning' | 'fail';
  message: string;
  suggestedValue?: string;
}

export interface TestValidationResults {
  r1r2: ValidationResult;
  ringContinuityLive: ValidationResult;
  ringContinuityNeutral: ValidationResult;
  insulationLiveNeutral: ValidationResult;
  insulationLiveEarth: ValidationResult;
  insulationNeutralEarth: ValidationResult;
  polarity: ValidationResult;
  zs: ValidationResult;
  rcdTiming: ValidationResult;
  pfcLiveNeutral: ValidationResult;
  pfcLiveEarth: ValidationResult;
  functionalTesting: ValidationResult;
}

export const validateTestResult = (result: TestResult): TestValidationResults => {
  const validation: TestValidationResults = {
    r1r2: validateR1R2(result.r1r2, result.type),
    ringContinuityLive: validateRingContinuity(result.ringContinuityLive),
    ringContinuityNeutral: validateRingContinuity(result.ringContinuityNeutral),
    insulationLiveNeutral: validateInsulationResistance(result.insulationLiveNeutral),
    insulationLiveEarth: validateInsulationResistance(result.insulationLiveEarth),
    insulationNeutralEarth: validateInsulationResistance(result.insulationNeutralEarth),
    polarity: validatePolarity(result.polarity),
    zs: validateZs(result.zs, result.protectiveDevice),
    rcdTiming: validateRCDTiming(result.rcdRating, result.rcdOneX),
    pfcLiveNeutral: validatePFC(result.pfcLiveNeutral),
    pfcLiveEarth: validatePFC(result.pfcLiveEarth),
    functionalTesting: validateFunctionalTesting(result.functionalTesting)
  };

  return validation;
};

const validateR1R2 = (value: string, circuitType: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, level: 'warning', message: 'R1+R2 value required' };
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, level: 'fail', message: 'Invalid R1+R2 value format' };
  }

  // General guidance - values typically between 0.1 and 5.0Ω for domestic circuits
  if (numValue > 5.0) {
    return { isValid: false, level: 'warning', message: 'R1+R2 value seems high - check connections' };
  }

  if (numValue < 0.01) {
    return { isValid: false, level: 'warning', message: 'R1+R2 value seems low - verify measurement' };
  }

  return { isValid: true, level: 'pass', message: 'R1+R2 within acceptable range' };
};

const validateRingContinuity = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: true, level: 'pass', message: 'Not applicable for this circuit type' };
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, level: 'fail', message: 'Invalid continuity value format' };
  }

  if (numValue > 1.67) {
    return { isValid: false, level: 'warning', message: 'Ring continuity high - check for loose connections' };
  }

  return { isValid: true, level: 'pass', message: 'Ring continuity acceptable' };
};

const validateInsulationResistance = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, level: 'warning', message: 'Insulation resistance measurement required' };
  }

  // Handle >999 format
  if (value.includes('>')) {
    const numValue = parseFloat(value.replace('>', ''));
    if (!isNaN(numValue) && numValue >= 999) {
      return { isValid: true, level: 'pass', message: 'Excellent insulation resistance' };
    }
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, level: 'fail', message: 'Invalid insulation resistance format' };
  }

  if (numValue < BS7671_LIMITS.INSULATION_RESISTANCE.nominal_voltage_up_to_500V) {
    return { 
      isValid: false, 
      level: 'fail', 
      message: `Insulation resistance below BS 7671 minimum (${BS7671_LIMITS.INSULATION_RESISTANCE.nominal_voltage_up_to_500V}MΩ)` 
    };
  }

  if (numValue < 2.0) {
    return { isValid: false, level: 'warning', message: 'Low insulation resistance - investigate further' };
  }

  return { isValid: true, level: 'pass', message: 'Insulation resistance satisfactory' };
};

const validatePolarity = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, level: 'warning', message: 'Polarity check required' };
  }

  const cleanValue = value.trim().toLowerCase();
  if (cleanValue === '✓' || cleanValue === 'correct' || cleanValue === 'pass') {
    return { isValid: true, level: 'pass', message: 'Polarity correct' };
  }

  if (cleanValue === '✗' || cleanValue === 'incorrect' || cleanValue === 'fail') {
    return { isValid: false, level: 'fail', message: 'Polarity incorrect - SAFETY ISSUE' };
  }

  return { isValid: false, level: 'warning', message: 'Polarity result unclear - use ✓ or ✗' };
};

const validateZs = (value: string, protectiveDevice: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, level: 'warning', message: 'Zs measurement required' };
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, level: 'fail', message: 'Invalid Zs value format' };
  }

  // Find the protective device in our options
  const deviceOption = protectiveDeviceOptions.find(option => option.value === protectiveDevice);
  
  if (deviceOption) {
    // Use the specific BS 7671 limit for this protective device
    if (numValue > deviceOption.zsLimit) {
      return { 
        isValid: false, 
        level: 'fail', 
        message: `Zs exceeds BS 7671 limit for ${deviceOption.label} (${deviceOption.zsLimit}Ω)` 
      };
    }

    // Warning if approaching limit (within 10%)
    if (numValue > deviceOption.zsLimit * 0.9) {
      return { 
        isValid: false, 
        level: 'warning', 
        message: `Zs approaching BS 7671 limit for ${deviceOption.label} (${deviceOption.zsLimit}Ω)` 
      };
    }

    return { 
      isValid: true, 
      level: 'pass', 
      message: `Zs compliant with BS 7671 for ${deviceOption.label} (limit: ${deviceOption.zsLimit}Ω)` 
    };
  }

  // Fallback for unknown protective devices
  if (numValue > 1.67) {
    return { isValid: false, level: 'warning', message: 'Zs value high - verify protective device compatibility' };
  }

  if (numValue < 0.1) {
    return { isValid: false, level: 'warning', message: 'Zs value low - verify measurement accuracy' };
  }

  return { isValid: true, level: 'pass', message: 'Zs within typical range (specify protective device for accurate validation)' };
};

const validateRCDTiming = (rating: string, oneX: string): ValidationResult => {
  if (!rating) {
    return { isValid: true, level: 'pass', message: 'RCD not applicable for this circuit' };
  }

  const ratingValue = parseInt(rating);
  const oneXValue = parseFloat(oneX);

  if (isNaN(ratingValue)) {
    return { isValid: false, level: 'warning', message: 'RCD rating format unclear' };
  }

  const ratingKey = `${ratingValue}mA` as keyof typeof BS7671_LIMITS.RCD_TIMES;
  const limits = BS7671_LIMITS.RCD_TIMES[ratingKey];

  if (!limits) {
    return { isValid: false, level: 'warning', message: 'Unusual RCD rating - verify requirements' };
  }

  if (!isNaN(oneXValue) && oneXValue > limits.one_rated) {
    return { isValid: false, level: 'fail', message: `1×In time exceeds ${limits.one_rated}ms` };
  }

  return { isValid: true, level: 'pass', message: 'RCD timing within BS 7671 limits' };
};

const validatePFC = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, level: 'warning', message: 'PFC measurement recommended' };
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, level: 'fail', message: 'Invalid PFC value format' };
  }

  if (numValue < 0.1) {
    return { isValid: false, level: 'warning', message: 'PFC value seems low - verify supply adequacy' };
  }

  if (numValue > 25) {
    return { isValid: false, level: 'warning', message: 'PFC value very high - check protective device ratings' };
  }

  return { isValid: true, level: 'pass', message: 'PFC within typical range' };
};

const validateFunctionalTesting = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, level: 'warning', message: 'Functional testing required' };
  }

  const cleanValue = value.trim().toLowerCase();
  if (cleanValue === '✓' || cleanValue === 'pass' || cleanValue === 'satisfactory') {
    return { isValid: true, level: 'pass', message: 'Functional testing satisfactory' };
  }

  if (cleanValue === '✗' || cleanValue === 'fail' || cleanValue === 'unsatisfactory') {
    return { isValid: false, level: 'fail', message: 'Functional testing failed - investigate' };
  }

  return { isValid: false, level: 'warning', message: 'Functional testing result unclear - use ✓ or ✗' };
};

// Get overall compliance status for a test result
export const getOverallCompliance = (validation: TestValidationResults): { status: 'pass' | 'warning' | 'fail', criticalIssues: string[] } => {
  const criticalIssues: string[] = [];
  let hasWarnings = false;
  let hasFails = false;

  Object.entries(validation).forEach(([key, result]) => {
    if (result.level === 'fail') {
      hasFails = true;
      criticalIssues.push(result.message);
    } else if (result.level === 'warning') {
      hasWarnings = true;
    }
  });

  if (hasFails) {
    return { status: 'fail', criticalIssues };
  } else if (hasWarnings) {
    return { status: 'warning', criticalIssues: [] };
  } else {
    return { status: 'pass', criticalIssues: [] };
  }
};

// ============================================================================
// THREE-PHASE VALIDATION RULES (BS7671 Reg 612.12)
// ============================================================================

export interface ThreePhaseValidationResult {
  phaseRotation: ValidationResult;
  phaseBalance: ValidationResult;
  lineToLineVoltage: ValidationResult;
  neutralCurrent: ValidationResult;
}

/**
 * Validates phase rotation (sequence) per BS7671 Reg 612.12
 */
export const validatePhaseRotation = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      level: 'warning',
      message: 'Phase rotation test required for three-phase circuits (BS7671 Reg 612.12)'
    };
  }

  const cleanValue = value.trim().toLowerCase();

  if (cleanValue === '✓' || cleanValue === 'correct' || cleanValue === 'l1-l2-l3') {
    return { isValid: true, level: 'pass', message: 'Phase rotation correct (L1→L2→L3)' };
  }

  if (cleanValue === '✗' || cleanValue === 'incorrect' || cleanValue === 'l1-l3-l2' || cleanValue === 'reversed') {
    return {
      isValid: false,
      level: 'fail',
      message: 'Phase rotation incorrect - motor/equipment may run in reverse'
    };
  }

  if (cleanValue === 'n/a' || cleanValue === 'not applicable') {
    return { isValid: true, level: 'pass', message: 'Phase rotation N/A for this circuit' };
  }

  return {
    isValid: false,
    level: 'warning',
    message: 'Phase rotation result unclear - use ✓ (correct) or ✗ (incorrect)'
  };
};

/**
 * Validates phase balance per BS7671 guidance
 * Imbalance should be <10% for optimal operation
 */
export const validatePhaseBalance = (
  L1: number | string,
  L2: number | string,
  L3: number | string
): ValidationResult => {
  const l1 = typeof L1 === 'string' ? parseFloat(L1) || 0 : L1;
  const l2 = typeof L2 === 'string' ? parseFloat(L2) || 0 : L2;
  const l3 = typeof L3 === 'string' ? parseFloat(L3) || 0 : L3;

  // Need at least 2 phases with values
  const phasesWithValues = (l1 > 0 ? 1 : 0) + (l2 > 0 ? 1 : 0) + (l3 > 0 ? 1 : 0);
  if (phasesWithValues < 2) {
    return {
      isValid: false,
      level: 'warning',
      message: 'Enter load values for at least 2 phases to calculate balance'
    };
  }

  const values = [l1, l2, l3];
  const max = Math.max(...values);
  const min = Math.min(...values);
  const average = (l1 + l2 + l3) / 3;

  if (average === 0) {
    return { isValid: true, level: 'pass', message: 'No load - phase balance N/A' };
  }

  const imbalancePercent = ((max - min) / average) * 100;

  if (imbalancePercent > 15) {
    return {
      isValid: false,
      level: 'fail',
      message: `Critical phase imbalance (${imbalancePercent.toFixed(1)}%) - redistribute loads urgently`
    };
  }

  if (imbalancePercent > 10) {
    return {
      isValid: false,
      level: 'warning',
      message: `Phase imbalance exceeds 10% (${imbalancePercent.toFixed(1)}%) - consider redistributing loads`
    };
  }

  if (imbalancePercent > 5) {
    return {
      isValid: true,
      level: 'pass',
      message: `Minor imbalance (${imbalancePercent.toFixed(1)}%) - acceptable but could be optimized`
    };
  }

  return {
    isValid: true,
    level: 'pass',
    message: `Excellent phase balance (${imbalancePercent.toFixed(1)}% imbalance)`
  };
};

/**
 * Validates line-to-line voltage per BS7671
 * Nominal 400V ±10% (360V-440V acceptable)
 */
export const validateLineToLineVoltage = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      level: 'warning',
      message: 'Line-to-line voltage measurement required for three-phase circuits'
    };
  }

  const numValue = parseFloat(value.replace('V', ''));
  if (isNaN(numValue)) {
    return { isValid: false, level: 'fail', message: 'Invalid voltage format' };
  }

  const nominal = 400;
  const minAcceptable = nominal * 0.9; // 360V
  const maxAcceptable = nominal * 1.1; // 440V
  const deviation = ((numValue - nominal) / nominal) * 100;

  if (numValue < minAcceptable) {
    return {
      isValid: false,
      level: 'fail',
      message: `Line-to-line voltage too low (${numValue}V) - below 360V minimum. Deviation: ${deviation.toFixed(1)}%`
    };
  }

  if (numValue > maxAcceptable) {
    return {
      isValid: false,
      level: 'fail',
      message: `Line-to-line voltage too high (${numValue}V) - exceeds 440V maximum. Deviation: +${deviation.toFixed(1)}%`
    };
  }

  // Warning zone (within limits but >5% deviation)
  if (Math.abs(deviation) > 5) {
    return {
      isValid: true,
      level: 'warning',
      message: `Line-to-line voltage ${numValue}V (${deviation > 0 ? '+' : ''}${deviation.toFixed(1)}% from nominal) - within limits but notable deviation`
    };
  }

  return {
    isValid: true,
    level: 'pass',
    message: `Line-to-line voltage ${numValue}V - within ±5% of 400V nominal`
  };
};

/**
 * Validates neutral current for three-phase four-wire systems
 */
export const validateNeutralCurrent = (
  L1: number | string,
  L2: number | string,
  L3: number | string
): ValidationResult => {
  const l1 = typeof L1 === 'string' ? parseFloat(L1) || 0 : L1;
  const l2 = typeof L2 === 'string' ? parseFloat(L2) || 0 : L2;
  const l3 = typeof L3 === 'string' ? parseFloat(L3) || 0 : L3;

  if (l1 === 0 && l2 === 0 && l3 === 0) {
    return { isValid: true, level: 'pass', message: 'No load - neutral current N/A' };
  }

  // Vector sum calculation for 120° phase displacement (resistive loads)
  const neutralCurrent = Math.sqrt(
    l1 * l1 + l2 * l2 + l3 * l3 - l1 * l2 - l2 * l3 - l1 * l3
  );

  const maxPhase = Math.max(l1, l2, l3);
  const neutralRatio = maxPhase > 0 ? (neutralCurrent / maxPhase) * 100 : 0;

  if (neutralCurrent > maxPhase) {
    return {
      isValid: false,
      level: 'fail',
      message: `High neutral current (${neutralCurrent.toFixed(1)}A) exceeds max phase current - check for harmonics or severe imbalance`
    };
  }

  if (neutralRatio > 80) {
    return {
      isValid: false,
      level: 'warning',
      message: `Neutral current (${neutralCurrent.toFixed(1)}A) is ${neutralRatio.toFixed(0)}% of max phase - significant imbalance`
    };
  }

  if (neutralRatio > 50) {
    return {
      isValid: true,
      level: 'warning',
      message: `Neutral current (${neutralCurrent.toFixed(1)}A) indicates moderate phase imbalance`
    };
  }

  return {
    isValid: true,
    level: 'pass',
    message: `Neutral current (${neutralCurrent.toFixed(1)}A) within acceptable range`
  };
};

/**
 * Validates all three-phase specific tests for a circuit
 */
export const validateThreePhaseCircuit = (result: TestResult): ThreePhaseValidationResult => {
  return {
    phaseRotation: validatePhaseRotation(result.phaseRotation || ''),
    phaseBalance: validatePhaseBalance(
      result.phaseBalanceL1 || '0',
      result.phaseBalanceL2 || '0',
      result.phaseBalanceL3 || '0'
    ),
    lineToLineVoltage: validateLineToLineVoltage(result.lineToLineVoltage || ''),
    neutralCurrent: validateNeutralCurrent(
      result.phaseBalanceL1 || '0',
      result.phaseBalanceL2 || '0',
      result.phaseBalanceL3 || '0'
    )
  };
};

/**
 * Get overall three-phase compliance status
 */
export const getThreePhaseCompliance = (validation: ThreePhaseValidationResult): {
  status: 'pass' | 'warning' | 'fail';
  issues: string[];
} => {
  const issues: string[] = [];
  let hasWarnings = false;
  let hasFails = false;

  Object.entries(validation).forEach(([key, result]) => {
    if (result.level === 'fail') {
      hasFails = true;
      issues.push(result.message);
    } else if (result.level === 'warning') {
      hasWarnings = true;
      issues.push(result.message);
    }
  });

  if (hasFails) {
    return { status: 'fail', issues };
  } else if (hasWarnings) {
    return { status: 'warning', issues };
  } else {
    return { status: 'pass', issues: [] };
  }
};
