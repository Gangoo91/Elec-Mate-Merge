// Power Quality Calculation Library - BS 7671 18th Edition Compliant

export interface HarmonicData {
  order: number;
  current: number;
  voltage?: number;
  phase?: number;
}

export interface PowerQualityInputs {
  fundamentalCurrent: number;
  fundamentalVoltage: number;
  harmonics: HarmonicData[];
  systemType: 'single-phase' | 'three-phase';
  frequency: number;
  neutralConductorSize?: number;
  loadType: 'linear' | 'non-linear' | 'mixed';
  /** Displacement power factor (fundamental component). Defaults to 0.95 if not provided. */
  displacementPF?: number;
}

export interface PowerQualityResults {
  // Primary metrics
  thdiCurrent: number;
  thdvVoltage: number;
  rmsCurrentTotal: number;
  rmsVoltageTotal: number;
  crestFactorCurrent: number;
  crestFactorVoltage: number;
  distortionFactor: number;

  // Neutral and K-factor analysis
  neutralCurrent: number;
  kFactor: number;
  diversityFactor: number;

  // True vs Displacement PF
  truePowerFactor: number;
  displacementPowerFactor: number;

  // Transformer derating
  transformerDerating: number; // percentage of nameplate capacity

  // Individual harmonic analysis
  harmonicSpectrum: Array<{
    order: number;
    currentMagnitude: number;
    currentPercentage: number;
    voltageMagnitude?: number;
    voltagePercentage?: number;
    powerContribution: number;
    compliance: 'pass' | 'warning' | 'fail';
    limit: number;
  }>;

  // Assessment results
  powerQualityRating: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  complianceStatus: 'compliant' | 'borderline' | 'non-compliant';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';

  // Recommendations and analysis
  primaryConcerns: string[];
  immediateActions: string[];
  recommendations: string[];
  equipmentRisks: string[];
  practicalGuidance: string[];

  // Regulatory compliance
  ieeeCompliance: boolean;
  bs7671Compliance: boolean;
  gCode5Compliance: boolean;
}

// Harmonic load presets — typical spectra as % of fundamental
export const HARMONIC_PRESETS: Record<
  string,
  { label: string; harmonics: Record<number, number> }
> = {
  led_lighting: {
    label: 'LED Lighting',
    harmonics: { 3: 77, 5: 43, 7: 15, 9: 9, 11: 6, 13: 4 },
  },
  vfd: {
    label: 'Variable Frequency Drive (6-pulse)',
    harmonics: { 5: 20, 7: 14, 11: 9, 13: 7, 17: 5, 19: 4 },
  },
  ups: {
    label: 'UPS System',
    harmonics: { 3: 30, 5: 15, 7: 10, 9: 8, 11: 5, 13: 3 },
  },
  it_equipment: {
    label: 'IT Equipment / SMPS',
    harmonics: { 3: 40, 5: 30, 7: 20, 9: 10, 11: 5, 13: 3 },
  },
};

// G5/5 limits for individual harmonics (% of fundamental)
const G5_5_LIMITS = {
  odd: {
    3: 5,
    5: 6,
    7: 5,
    9: 1.5,
    11: 3.5,
    13: 3,
    15: 0.5,
    17: 2,
    19: 1.5,
    21: 0.5,
    23: 1.5,
    25: 1.5,
  },
  even: {
    2: 2,
    4: 1,
    6: 0.5,
    8: 0.5,
    10: 0.5,
    12: 0.5,
    14: 0.5,
    16: 0.5,
    18: 0.5,
    20: 0.5,
    22: 0.5,
    24: 0.5,
  },
};

// IEEE 519 THD limits
const IEEE_519_LIMITS = {
  current: { general: 5, critical: 3 },
  voltage: { general: 8, critical: 5 },
};

export function calculatePowerQuality(inputs: PowerQualityInputs): PowerQualityResults {
  const { fundamentalCurrent, fundamentalVoltage, harmonics, systemType, frequency } = inputs;

  // Calculate THD for current
  const harmonicCurrentSquareSum = harmonics.reduce((sum, h) => sum + Math.pow(h.current, 2), 0);
  const thdiCurrent = (Math.sqrt(harmonicCurrentSquareSum) / fundamentalCurrent) * 100;

  // Calculate THD for voltage (if voltage harmonics provided)
  const harmonicVoltageSquareSum = harmonics
    .filter((h) => h.voltage !== undefined)
    .reduce((sum, h) => sum + Math.pow(h.voltage!, 2), 0);
  const thdvVoltage =
    harmonicVoltageSquareSum > 0
      ? (Math.sqrt(harmonicVoltageSquareSum) / fundamentalVoltage) * 100
      : 0;

  // Calculate RMS values
  const rmsCurrentTotal = Math.sqrt(Math.pow(fundamentalCurrent, 2) + harmonicCurrentSquareSum);
  const rmsVoltageTotal = Math.sqrt(Math.pow(fundamentalVoltage, 2) + harmonicVoltageSquareSum);

  // Calculate crest factors (estimated)
  const crestFactorCurrent = 1.414 * Math.sqrt(1 + Math.pow(thdiCurrent / 100, 2));
  const crestFactorVoltage = 1.414 * Math.sqrt(1 + Math.pow(thdvVoltage / 100, 2));

  // Calculate distortion factor
  const distortionFactor = fundamentalCurrent / rmsCurrentTotal;

  // True PF vs Displacement PF
  const displacementPowerFactor = inputs.displacementPF ?? 0.95;
  const truePowerFactor = displacementPowerFactor * distortionFactor;

  // Calculate neutral current for 3-phase systems
  // Triplen harmonics (3rd, 9th, 15th...) are zero-sequence and add in phase across all 3 phases.
  // Each triplen harmonic contributes 3× its per-phase current to the neutral.
  // Different triplen orders combine as RMS (different frequencies).
  // I_N = 3 × √(Σ I_triplen²)
  let neutralCurrent = 0;
  if (systemType === 'three-phase') {
    const triplenHarmonics = harmonics.filter((h) => h.order % 3 === 0);
    const triplenSquareSum = triplenHarmonics.reduce((sum, h) => sum + Math.pow(h.current, 2), 0);
    neutralCurrent = 3 * Math.sqrt(triplenSquareSum);
  }

  // Calculate K-factor for transformer derating
  const kFactor =
    1 +
    harmonics.reduce((sum, h) => {
      const percentage = (h.current / fundamentalCurrent) * 100;
      return sum + Math.pow(h.order, 2) * Math.pow(percentage / 100, 2);
    }, 0);

  // Transformer derating per IEEE C57.110
  // Derating = 1 / √(1 + (K-1) × e_r) where e_r ≈ 0.05 for typical transformers
  const eddy_ratio = 0.05;
  const transformerDerating = Math.round((1 / Math.sqrt(1 + (kFactor - 1) * eddy_ratio)) * 100);

  // Analyse individual harmonics
  const harmonicSpectrum = harmonics.map((h) => {
    const currentPercentage = (h.current / fundamentalCurrent) * 100;
    const voltagePercentage = h.voltage ? (h.voltage / fundamentalVoltage) * 100 : 0;

    const isOdd = h.order % 2 === 1;
    const limit = isOdd
      ? (G5_5_LIMITS.odd as Record<number, number>)[h.order] || 1
      : (G5_5_LIMITS.even as Record<number, number>)[h.order] || 0.5;

    let compliance: 'pass' | 'warning' | 'fail';
    if (currentPercentage <= limit * 0.8) compliance = 'pass';
    else if (currentPercentage <= limit) compliance = 'warning';
    else compliance = 'fail';

    return {
      order: h.order,
      currentMagnitude: h.current,
      currentPercentage,
      voltageMagnitude: h.voltage,
      voltagePercentage,
      powerContribution:
        fundamentalVoltage * h.current * Math.cos(((h.phase || 0) * Math.PI) / 180),
      compliance,
      limit,
    };
  });

  // Determine overall power quality rating
  let powerQualityRating: PowerQualityResults['powerQualityRating'];
  let riskLevel: PowerQualityResults['riskLevel'];

  if (thdiCurrent <= 3 && thdvVoltage <= 3) {
    powerQualityRating = 'excellent';
    riskLevel = 'low';
  } else if (thdiCurrent <= 5 && thdvVoltage <= 5) {
    powerQualityRating = 'good';
    riskLevel = 'low';
  } else if (thdiCurrent <= 8 && thdvVoltage <= 8) {
    powerQualityRating = 'fair';
    riskLevel = 'medium';
  } else if (thdiCurrent <= 15 && thdvVoltage <= 12) {
    powerQualityRating = 'poor';
    riskLevel = 'high';
  } else {
    powerQualityRating = 'critical';
    riskLevel = 'critical';
  }

  // Check compliance
  const ieeeCompliance =
    thdiCurrent <= IEEE_519_LIMITS.current.general &&
    thdvVoltage <= IEEE_519_LIMITS.voltage.general;
  const bs7671Compliance = harmonicSpectrum.every((h) => h.compliance !== 'fail');
  const gCode5Compliance = bs7671Compliance;

  const complianceStatus: PowerQualityResults['complianceStatus'] =
    ieeeCompliance && bs7671Compliance
      ? 'compliant'
      : harmonicSpectrum.some((h) => h.compliance === 'warning')
        ? 'borderline'
        : 'non-compliant';

  // Primary concerns
  const primaryConcerns: string[] = [];
  const equipmentRisks: string[] = [];

  if (thdiCurrent > 15)
    primaryConcerns.push('Critical current harmonic distortion - immediate action required');
  else if (thdiCurrent > 10)
    primaryConcerns.push('High current harmonics affecting equipment performance');
  else if (thdiCurrent > 5)
    primaryConcerns.push('Moderate harmonic distortion - monitoring recommended');

  if (thdvVoltage > 8) primaryConcerns.push('Voltage distortion exceeds recommended limits');
  if (neutralCurrent > fundamentalCurrent * 1.2)
    primaryConcerns.push('Excessive neutral current from triplen harmonics');
  if (kFactor > 13) primaryConcerns.push('Extreme transformer heating risk from harmonics');
  else if (kFactor > 9) primaryConcerns.push('Elevated transformer operating temperature');
  if (crestFactorCurrent > 2.5)
    primaryConcerns.push('High peak currents may cause protection issues');

  // Equipment risk assessment
  if (kFactor > 20)
    equipmentRisks.push('Critical transformer failure risk - immediate replacement required');
  else if (kFactor > 13)
    equipmentRisks.push('Transformer overheating - significant derating needed');
  else if (kFactor > 9) equipmentRisks.push('Transformer temperature elevation - monitor closely');

  if (thdiCurrent > 15)
    equipmentRisks.push('High harmonic currents cause equipment stress and premature failure');
  if (neutralCurrent > fundamentalCurrent)
    equipmentRisks.push('Neutral conductor overheating risk in 3-phase systems');
  if (crestFactorCurrent > 2.5)
    equipmentRisks.push('Circuit breaker nuisance tripping and arc flash risk');

  // Practical guidance
  const practicalGuidance: string[] = [];
  if (thdiCurrent > 15) {
    practicalGuidance.push(
      'Install K-rated transformers designed for non-linear loads (K-13 or K-20)'
    );
    practicalGuidance.push(
      'Consider active harmonic filters to reduce current distortion below 5%'
    );
    practicalGuidance.push('Implement 12-pulse or 18-pulse drives for large VFDs');
    practicalGuidance.push('Use line reactors (3-5%) on all variable frequency drives');
  } else if (thdiCurrent > 10) {
    practicalGuidance.push(
      'Install passive harmonic filters tuned to dominant frequencies (5th and 7th)'
    );
    practicalGuidance.push('Use DC link reactors on VFDs to reduce harmonic injection');
    practicalGuidance.push('Consider load scheduling to reduce coincident harmonics');
  } else if (thdiCurrent > 5) {
    practicalGuidance.push('Monitor harmonic levels regularly as loads increase');
    practicalGuidance.push('Plan for harmonic mitigation in future expansions');
  }

  if (kFactor > 13) {
    practicalGuidance.push('Replace standard transformers with K-20 rated units immediately');
    practicalGuidance.push('Increase neutral conductor to 200% of phase conductor size');
  } else if (kFactor > 9) {
    practicalGuidance.push('Upgrade to K-13 rated transformers for reliability');
    practicalGuidance.push('Monitor transformer loading and temperature closely');
  }

  practicalGuidance.push('Use true RMS meters for accurate measurements');

  // Recommendations
  const recommendations: string[] = [];
  if (complianceStatus === 'non-compliant') {
    recommendations.push('Immediate compliance assessment required - violates BS 7671 regulations');
    recommendations.push('Engage certified electrical engineer for harmonic mitigation study');
  }
  if (riskLevel === 'critical') {
    recommendations.push('Install temporary harmonic monitoring equipment');
  }
  if (thdiCurrent > 8) {
    recommendations.push('Implement continuous power quality monitoring system');
  }

  // Immediate actions
  const immediateActions: string[] = [];
  if (riskLevel === 'critical') {
    immediateActions.push('Reduce non-linear loads immediately to prevent equipment damage');
    immediateActions.push('Contact electrical consultant within 24 hours');
  } else if (riskLevel === 'high') {
    immediateActions.push('Schedule professional harmonic analysis within 1 week');
    immediateActions.push('Begin daily equipment temperature monitoring');
  } else if (riskLevel === 'medium') {
    immediateActions.push('Plan harmonic assessment within 30 days');
  }

  return {
    thdiCurrent,
    thdvVoltage,
    rmsCurrentTotal,
    rmsVoltageTotal,
    crestFactorCurrent,
    crestFactorVoltage,
    distortionFactor,
    neutralCurrent,
    kFactor,
    diversityFactor: distortionFactor,
    truePowerFactor: Math.round(truePowerFactor * 1000) / 1000,
    displacementPowerFactor,
    transformerDerating,
    harmonicSpectrum,
    powerQualityRating,
    complianceStatus,
    riskLevel,
    primaryConcerns,
    immediateActions,
    recommendations,
    equipmentRisks,
    practicalGuidance,
    ieeeCompliance,
    bs7671Compliance,
    gCode5Compliance,
  };
}
