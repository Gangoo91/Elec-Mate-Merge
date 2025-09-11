// BS 7671 Harmonic Content Analysis for LED/Electronic Loads
import { CalculationError, validateInput } from '../utils/calculatorUtils';

export interface HarmonicLoad {
  id: string;
  name: string;
  power: number; // kW
  current: number; // A
  loadType: 'led' | 'fluorescent-electronic' | 'fluorescent-magnetic' | 'computer' | 'ups' | 'variable-speed-drive' | 'switch-mode-psu';
  quantity: number;
  powerFactor: number;
}

export interface HarmonicResult {
  totalLoad: number; // kW
  totalCurrent: number; // A
  harmonicSpectrum: {
    harmonic: number;
    percentage: number;
    current: number; // A
    significance: 'low' | 'moderate' | 'high' | 'critical';
  }[];
  thd: {
    voltage: number; // %
    current: number; // %
  };
  neutralCurrent: number; // A (triple harmonics)
  cableRating: {
    lineCondutors: number; // A
    neutralConductor: number; // A
    recommendedUpsize: boolean;
  };
  compliance: {
    g595: 'pass' | 'fail';
    bs7671: 'pass' | 'fail';
    ieee519: 'pass' | 'fail';
  };
  recommendations: string[];
  warnings: string[];
}

// Typical harmonic spectra for different load types (% of fundamental)
const harmonicProfiles = {
  led: {
    3: 15, 5: 8, 7: 5, 9: 12, 11: 3, 13: 2, 15: 8, 17: 1, 19: 1, 21: 4
  },
  'fluorescent-electronic': {
    3: 25, 5: 12, 7: 8, 9: 18, 11: 5, 13: 3, 15: 12, 17: 2, 19: 2, 21: 6
  },
  'fluorescent-magnetic': {
    3: 5, 5: 3, 7: 2, 9: 2, 11: 1, 13: 1, 15: 1, 17: 0.5, 19: 0.5, 21: 0.5
  },
  computer: {
    3: 30, 5: 15, 7: 10, 9: 20, 11: 8, 13: 5, 15: 15, 17: 3, 19: 3, 21: 8
  },
  ups: {
    3: 35, 5: 20, 7: 15, 9: 25, 11: 10, 13: 8, 15: 20, 17: 5, 19: 5, 21: 12
  },
  'variable-speed-drive': {
    5: 25, 7: 15, 11: 10, 13: 8, 17: 5, 19: 3, 23: 2, 25: 2
  },
  'switch-mode-psu': {
    3: 28, 5: 14, 7: 9, 9: 22, 11: 6, 13: 4, 15: 16, 17: 3, 19: 3, 21: 9
  }
};

// G5/5 limits (part of BS 7671)
const g595Limits = {
  voltage: {
    individual: 3.0, // % for individual harmonics
    total: 5.0 // % THD
  },
  current: {
    3: 16.0, // % of fundamental
    5: 10.0,
    7: 7.0,
    9: 5.0,
    11: 3.5,
    13: 3.0,
    15: 0.3,
    17: 2.0,
    19: 1.5,
    21: 0.2
  }
};

export const analyseHarmonics = (loads: HarmonicLoad[], voltage: number = 230): HarmonicResult => {
  validateInput(voltage, 200, 440, 'Voltage');

  if (loads.length === 0) {
    throw new CalculationError('At least one load is required', 'NO_LOADS');
  }

  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Calculate total load
  const totalLoad = loads.reduce((sum, load) => sum + (load.power * load.quantity), 0);
  const totalCurrent = loads.reduce((sum, load) => sum + (load.current * load.quantity), 0);

  // Calculate harmonic spectrum
  const harmonicSpectrum: HarmonicResult['harmonicSpectrum'] = [];
  const harmonicCurrents: { [harmonic: number]: number } = {};

  // Sum harmonics from all loads
  for (let harmonic = 3; harmonic <= 21; harmonic += 2) { // Odd harmonics only for single phase
    let totalHarmonicCurrent = 0;

    loads.forEach(load => {
      const profile = harmonicProfiles[load.loadType] || {};
      const harmonicPercentage = profile[harmonic] || 0;
      const loadHarmonicCurrent = (load.current * load.quantity * harmonicPercentage) / 100;
      
      // Vector addition for same frequency harmonics
      totalHarmonicCurrent += loadHarmonicCurrent;
    });

    harmonicCurrents[harmonic] = totalHarmonicCurrent;

    // Determine significance
    let significance: 'low' | 'moderate' | 'high' | 'critical';
    const percentage = (totalHarmonicCurrent / totalCurrent) * 100;
    
    if (percentage < 2) significance = 'low';
    else if (percentage < 5) significance = 'moderate';
    else if (percentage < 10) significance = 'high';
    else significance = 'critical';

    harmonicSpectrum.push({
      harmonic,
      percentage,
      current: Math.round(totalHarmonicCurrent * 10) / 10,
      significance
    });
  }

  // Calculate THD
  const harmonicSquareSum = Object.values(harmonicCurrents).reduce((sum, current) => sum + Math.pow(current, 2), 0);
  const currentTHD = Math.sqrt(harmonicSquareSum) / totalCurrent * 100;
  
  // Estimate voltage THD (simplified - assumes source impedance)
  const voltageTHD = currentTHD * 0.3; // Rough approximation

  // Calculate neutral current (triple harmonics: 3rd, 9th, 15th, 21st)
  const tripleHarmonics = [3, 9, 15, 21];
  const neutralCurrent = tripleHarmonics.reduce((sum, harmonic) => {
    return sum + (harmonicCurrents[harmonic] || 0);
  }, 0);

  // Cable rating calculations
  const lineDerating = Math.max(1.0, 1 + (currentTHD / 100) * 0.86); // Simplified derating
  const neutralDerating = Math.max(1.0, neutralCurrent / totalCurrent);
  
  const recommendedLineRating = totalCurrent * lineDerating;
  const recommendedNeutralRating = Math.max(totalCurrent, neutralCurrent * 1.73); // √3 factor
  
  const recommendedUpsize = lineDerating > 1.1 || neutralDerating > 1.1;

  // Compliance checks
  const g595Compliance = checkG595Compliance(harmonicSpectrum, currentTHD, voltageTHD);
  const bs7671Compliance = g595Compliance; // G5/5 is part of BS 7671
  const ieee519Compliance = checkIEEE519Compliance(harmonicSpectrum, currentTHD);

  // Generate recommendations
  if (!g595Compliance) {
    recommendations.push('Install harmonic filters to meet G5/5 requirements');
    warnings.push('Installation exceeds G5/5 harmonic limits - DNO approval may be required');
  }

  if (currentTHD > 15) {
    recommendations.push('Consider K-rated transformers for high harmonic loads');
    warnings.push('High current THD detected - equipment may be affected');
  }

  if (neutralCurrent > totalCurrent * 0.5) {
    recommendations.push('Upsize neutral conductor due to triple harmonic content');
    warnings.push('Significant neutral current from triple harmonics');
  }

  if (recommendedUpsize) {
    recommendations.push('Cable derating required due to harmonic content');
  }

  // Add specific load recommendations
  const highHarmonicLoads = loads.filter(load => 
    ['led', 'computer', 'ups'].includes(load.loadType)
  );
  
  if (highHarmonicLoads.length > 0) {
    recommendations.push('Consider grouping high-harmonic loads on dedicated circuits');
    recommendations.push('Install line reactors or harmonic filters for VSD/UPS loads');
  }

  return {
    totalLoad: Math.round(totalLoad * 100) / 100,
    totalCurrent: Math.round(totalCurrent * 10) / 10,
    harmonicSpectrum,
    thd: {
      voltage: Math.round(voltageTHD * 10) / 10,
      current: Math.round(currentTHD * 10) / 10
    },
    neutralCurrent: Math.round(neutralCurrent * 10) / 10,
    cableRating: {
      lineCondutors: Math.round(recommendedLineRating),
      neutralConductor: Math.round(recommendedNeutralRating),
      recommendedUpsize
    },
    compliance: {
      g595: g595Compliance ? 'pass' : 'fail',
      bs7671: bs7671Compliance ? 'pass' : 'fail',
      ieee519: ieee519Compliance ? 'pass' : 'fail'
    },
    recommendations,
    warnings
  };
};

const checkG595Compliance = (spectrum: HarmonicResult['harmonicSpectrum'], currentTHD: number, voltageTHD: number): boolean => {
  // Check voltage limits
  if (voltageTHD > g595Limits.voltage.total) return false;

  // Check individual harmonic limits
  for (const harmonic of spectrum) {
    const limit = g595Limits.current[harmonic.harmonic as keyof typeof g595Limits.current];
    if (limit && harmonic.percentage > limit) return false;
  }

  return true;
};

const checkIEEE519Compliance = (spectrum: HarmonicResult['harmonicSpectrum'], currentTHD: number): boolean => {
  // Simplified IEEE 519 check (assumes <120kV system)
  const ieee519Limits = { 3: 4.0, 5: 4.0, 7: 4.0, 11: 2.0, 13: 2.0, 17: 1.5, 19: 1.5 };
  
  for (const harmonic of spectrum) {
    const limit = ieee519Limits[harmonic.harmonic as keyof typeof ieee519Limits];
    if (limit && harmonic.percentage > limit) return false;
  }

  return currentTHD <= 5.0;
};

// Helper function for common LED lighting assessment
export const assessLEDLighting = (
  totalLEDPower: number, // kW
  circuitVoltage: number = 230,
  powerFactor: number = 0.9
): HarmonicResult => {
  const current = (totalLEDPower * 1000) / (circuitVoltage * powerFactor);
  
  return analyseHarmonics([{
    id: 'led-lighting',
    name: 'LED Lighting',
    power: totalLEDPower,
    current,
    loadType: 'led',
    quantity: 1,
    powerFactor
  }], circuitVoltage);
};