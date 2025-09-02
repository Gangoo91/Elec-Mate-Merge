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
  
  // Regulatory compliance
  ieeeCompliance: boolean;
  bs7671Compliance: boolean;
  gCode5Compliance: boolean;
}

// G5/5 limits for individual harmonics (% of fundamental)
const G5_5_LIMITS = {
  odd: { 3: 5, 5: 6, 7: 5, 9: 1.5, 11: 3.5, 13: 3, 15: 0.5, 17: 2, 19: 1.5, 21: 0.5, 23: 1.5, 25: 1.5 },
  even: { 2: 2, 4: 1, 6: 0.5, 8: 0.5, 10: 0.5, 12: 0.5, 14: 0.5, 16: 0.5, 18: 0.5, 20: 0.5, 22: 0.5, 24: 0.5 }
};

// IEEE 519 THD limits
const IEEE_519_LIMITS = {
  current: { general: 5, critical: 3 },
  voltage: { general: 8, critical: 5 }
};

export function calculatePowerQuality(inputs: PowerQualityInputs): PowerQualityResults {
  const { fundamentalCurrent, fundamentalVoltage, harmonics, systemType, frequency } = inputs;
  
  // Calculate THD for current
  const harmonicCurrentSquareSum = harmonics.reduce((sum, h) => sum + Math.pow(h.current, 2), 0);
  const thdiCurrent = Math.sqrt(harmonicCurrentSquareSum) / fundamentalCurrent * 100;
  
  // Calculate THD for voltage (if voltage harmonics provided)
  const harmonicVoltageSquareSum = harmonics
    .filter(h => h.voltage !== undefined)
    .reduce((sum, h) => sum + Math.pow(h.voltage!, 2), 0);
  const thdvVoltage = harmonicVoltageSquareSum > 0 ? 
    Math.sqrt(harmonicVoltageSquareSum) / fundamentalVoltage * 100 : 0;
  
  // Calculate RMS values
  const rmsCurrentTotal = Math.sqrt(Math.pow(fundamentalCurrent, 2) + harmonicCurrentSquareSum);
  const rmsVoltageTotal = Math.sqrt(Math.pow(fundamentalVoltage, 2) + harmonicVoltageSquareSum);
  
  // Calculate crest factors (estimated)
  const crestFactorCurrent = 1.414 * Math.sqrt(1 + Math.pow(thdiCurrent / 100, 2));
  const crestFactorVoltage = 1.414 * Math.sqrt(1 + Math.pow(thdvVoltage / 100, 2));
  
  // Calculate distortion factor
  const distortionFactor = fundamentalCurrent / rmsCurrentTotal;
  
  // Calculate neutral current for 3-phase systems
  let neutralCurrent = 0;
  if (systemType === 'three-phase') {
    // Simplified neutral current calculation (triplen harmonics)
    const triplenHarmonics = harmonics.filter(h => h.order % 3 === 0);
    neutralCurrent = triplenHarmonics.reduce((sum, h) => sum + h.current, 0) * Math.sqrt(3);
  }
  
  // Calculate K-factor for transformer derating
  const kFactor = 1 + harmonics.reduce((sum, h) => {
    const percentage = (h.current / fundamentalCurrent) * 100;
    return sum + Math.pow(h.order, 2) * Math.pow(percentage / 100, 2);
  }, 0);
  
  // Analyse individual harmonics
  const harmonicSpectrum = harmonics.map(h => {
    const currentPercentage = (h.current / fundamentalCurrent) * 100;
    const voltagePercentage = h.voltage ? (h.voltage / fundamentalVoltage) * 100 : 0;
    
    // Determine compliance based on G5/5 limits
    const isOdd = h.order % 2 === 1;
    const limit = isOdd ? 
      (G5_5_LIMITS.odd as any)[h.order] || 1 : 
      (G5_5_LIMITS.even as any)[h.order] || 0.5;
    
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
      powerContribution: fundamentalVoltage * h.current * Math.cos((h.phase || 0) * Math.PI / 180),
      compliance,
      limit
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
  const ieeeCompliance = thdiCurrent <= IEEE_519_LIMITS.current.general && 
                        thdvVoltage <= IEEE_519_LIMITS.voltage.general;
  const bs7671Compliance = harmonicSpectrum.every(h => h.compliance !== 'fail');
  const gCode5Compliance = bs7671Compliance; // G5/5 is part of BS 7671
  
  const complianceStatus: PowerQualityResults['complianceStatus'] = 
    ieeeCompliance && bs7671Compliance ? 'compliant' :
    harmonicSpectrum.some(h => h.compliance === 'warning') ? 'borderline' : 'non-compliant';
  
  // Generate recommendations
  const primaryConcerns = [];
  const immediateActions = [];
  const recommendations = [];
  const equipmentRisks = [];
  
  if (thdiCurrent > 15) {
    primaryConcerns.push('Excessive current harmonic distortion');
    immediateActions.push('Install active harmonic filters');
    equipmentRisks.push('Transformer overheating and derating');
  }
  
  if (thdvVoltage > 8) {
    primaryConcerns.push('High voltage harmonic distortion');
    immediateActions.push('Review supply quality with DNO');
    equipmentRisks.push('Sensitive equipment malfunction');
  }
  
  if (neutralCurrent > fundamentalCurrent * 1.5) {
    primaryConcerns.push('Excessive neutral current');
    immediateActions.push('Check neutral conductor sizing');
    equipmentRisks.push('Neutral conductor overheating');
  }
  
  if (kFactor > 4) {
    primaryConcerns.push('High K-factor affects transformers');
    recommendations.push('Consider K-rated transformers');
    equipmentRisks.push('Standard transformer overheating');
  }
  
  if (crestFactorCurrent > 2.5) {
    primaryConcerns.push('High crest factor');
    recommendations.push('Consider equipment sizing derating');
    equipmentRisks.push('Circuit breaker nuisance tripping');
  }
  
  // Add general recommendations
  if (powerQualityRating === 'poor' || powerQualityRating === 'critical') {
    recommendations.push('Conduct detailed harmonic survey');
    recommendations.push('Review load scheduling and balancing');
    recommendations.push('Consider power factor correction with harmonic filters');
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
    harmonicSpectrum,
    powerQualityRating,
    complianceStatus,
    riskLevel,
    primaryConcerns,
    immediateActions,
    recommendations,
    equipmentRisks,
    ieeeCompliance,
    bs7671Compliance,
    gCode5Compliance
  };
}