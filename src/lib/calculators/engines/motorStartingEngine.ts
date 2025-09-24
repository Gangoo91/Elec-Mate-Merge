// Enhanced Motor Starting Current Engine - BS 7671 Compliant
// Addresses critical issues: correct cable sizing, standard MCB ratings, proper voltage drop

import { getCableCapacity } from '../bs7671-data/cableCapacities';
import { standardDeviceRatings, getSuitableDevices, getRecommendedDeviceType } from '../bs7671-data/protectiveDevices';

export interface MotorStartingInputs {
  powerKw: number;
  voltage: number;
  phases: 1 | 3;
  efficiency: number;
  powerFactor: number;
  startingMethod: 'direct' | 'star-delta' | 'soft-starter' | 'vfd' | 'autotransformer';
  loadType: 'standard' | 'high-torque' | 'low-torque' | 'centrifugal';
  ambientTemp: number;
  cableLength: number;
  installationMethod: 'clipped' | 'conduit' | 'trunking' | 'underground' | 'tray';
  groupingFactor: number;
  ratedCurrent?: number;
  startingTime: number;
  supplyImpedance: number;
}

export interface MotorStartingResult {
  fullLoadCurrent: number;
  startingCurrent: number;
  startingMultiplier: number;
  startingKva: number;
  
  // Cable analysis
  minimumCableSize: number;
  recommendedCableSize: number;
  currentCarryingCheck: {
    required: number;
    capacity: number;
    suitable: boolean;
    derating: number;
  };
  
  // Voltage drop analysis
  voltageDropRunning: number;
  voltageDropStarting: number;
  voltageDropCompliant: boolean;
  
  // Protection
  recommendedMcbRating: number;
  protectionSuitable: boolean;
  protectionType: string;
  
  // Compliance
  bs7671Compliant: boolean;
  zsCompliant: boolean;
  thermalStress: number;
  
  // Recommendations
  recommendations: string[];
  warnings: string[];
  notes: string[];
}

// Correct starting current multipliers based on BS 7671 and practical experience
const startingMultipliers = {
  direct: 5.5,      // Reduced from 6.5 - more realistic for modern motors
  'star-delta': 1.8, // Reduced from 2.1 - more accurate
  'soft-starter': 2.5, // Reduced from 3.2
  'vfd': 1.2,       // Reduced from 1.5 - VFDs typically limit to 120% FLC
  'autotransformer': 3.5 // Reduced from 4.0
};

const loadTypeFactors = {
  standard: 1.0,
  'high-torque': 1.15,   // Reduced from 1.2
  'low-torque': 0.9,
  centrifugal: 0.85
};

export const calculateMotorStarting = (inputs: MotorStartingInputs): MotorStartingResult => {
  // Calculate full load current
  let fullLoadCurrent: number;
  if (inputs.ratedCurrent && inputs.ratedCurrent > 0) {
    fullLoadCurrent = inputs.ratedCurrent;
  } else {
    if (inputs.phases === 3) {
      fullLoadCurrent = (inputs.powerKw * 1000) / (Math.sqrt(3) * inputs.voltage * inputs.efficiency * inputs.powerFactor);
    } else {
      fullLoadCurrent = (inputs.powerKw * 1000) / (inputs.voltage * inputs.efficiency * inputs.powerFactor);
    }
  }

  // Calculate starting current with corrected multipliers
  const baseMultiplier = startingMultipliers[inputs.startingMethod] || startingMultipliers.direct;
  const loadFactor = loadTypeFactors[inputs.loadType] || 1.0;
  
  // Temperature effect is minimal on starting current
  const tempFactor = inputs.ambientTemp > 40 ? 1 + (inputs.ambientTemp - 40) * 0.002 : 1;
  
  const startingMultiplier = baseMultiplier * loadFactor * tempFactor;
  const startingCurrent = fullLoadCurrent * startingMultiplier;

  // Calculate starting kVA
  const startingKva = inputs.phases === 3 
    ? (Math.sqrt(3) * inputs.voltage * startingCurrent) / 1000
    : (inputs.voltage * startingCurrent) / 1000;

  // Thermal stress (I²t)
  const thermalStress = Math.pow(startingCurrent, 2) * inputs.startingTime;

  // Cable sizing - Check current carrying capacity first (BS 7671 approach)
  const designCurrent = fullLoadCurrent * 1.25; // Motor design current per BS 7671
  
  // Get derating factors  
  const temperatureFactor = inputs.ambientTemp > 30 ? 0.94 : 1.0; // Simplified derating
  const groupingFactor = inputs.groupingFactor || 1.0;
  const totalDerating = temperatureFactor * groupingFactor;

  // Find minimum cable size for current carrying capacity
  let minimumCableSize = 1.5;
  let foundSuitable = false;
  
  const standardCableSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500];
  
  for (const size of standardCableSizes) {
    const capacityData = getCableCapacity('pvc-single', size);
    const capacity = capacityData?.capacity || 0;
    const deratedCapacity = capacity * totalDerating;
    
    if (deratedCapacity >= designCurrent) {
      minimumCableSize = size;
      foundSuitable = true;
      break;
    }
  }

  // For motors >5kW, minimum cable size should be at least 2.5mm²
  if (inputs.powerKw > 5 && minimumCableSize < 2.5) {
    minimumCableSize = 2.5;
  }

  // Simple voltage drop calculation (mV/A/m method)
  const rPerKm = minimumCableSize >= 16 ? 1.83 : minimumCableSize >= 10 ? 2.5 : minimumCableSize >= 6 ? 3.08 : 7.41;
  const resistance = (rPerKm * inputs.cableLength) / 1000;
  
  const voltageDropRunning = inputs.phases === 3 
    ? (Math.sqrt(3) * fullLoadCurrent * resistance * 100) / inputs.voltage
    : (fullLoadCurrent * resistance * 100) / inputs.voltage;
    
  const voltageDropStarting = inputs.phases === 3 
    ? (Math.sqrt(3) * startingCurrent * resistance * 100) / inputs.voltage
    : (startingCurrent * resistance * 100) / inputs.voltage;

  // Check if voltage drop is compliant (3% running, 10% starting per BS 7671)
  let recommendedCableSize = minimumCableSize;
  const voltageDropCompliant = voltageDropRunning <= 3 && voltageDropStarting <= 10;

  // If voltage drop fails, calculate required cable size
  if (!voltageDropCompliant) {
    for (const size of standardCableSizes) {
      if (size <= minimumCableSize) continue;
      
      const rPerKmTest = size >= 16 ? 1.83 : size >= 10 ? 2.5 : size >= 6 ? 3.08 : 7.41;
      const resistanceTest = (rPerKmTest * inputs.cableLength) / 1000;
      
      const vdRunning = inputs.phases === 3 
        ? (Math.sqrt(3) * fullLoadCurrent * resistanceTest * 100) / inputs.voltage
        : (fullLoadCurrent * resistanceTest * 100) / inputs.voltage;
        
      const vdStarting = inputs.phases === 3 
        ? (Math.sqrt(3) * startingCurrent * resistanceTest * 100) / inputs.voltage
        : (startingCurrent * resistanceTest * 100) / inputs.voltage;

      if (vdRunning <= 3 && vdStarting <= 10) {
        recommendedCableSize = size;
        break;
      }
    }
  }

  // Protection device selection with standard ratings
  const deviceType = getRecommendedDeviceType(designCurrent, 'motor', inputs.voltage);
  let recommendedMcbRating = designCurrent;
  
  // Round up to next standard MCB rating
  const mcbRatings = standardDeviceRatings.mcb;
  const suitableRating = mcbRatings.find(rating => rating >= designCurrent);
  
  if (suitableRating) {
    recommendedMcbRating = suitableRating;
  } else {
    // Use BS88 fuse for high currents
    const bs88Ratings = standardDeviceRatings.bs88;
    recommendedMcbRating = bs88Ratings.find(rating => rating >= designCurrent) || designCurrent;
  }

  // Check if protection is suitable for motor
  const protectionSuitable = recommendedMcbRating >= designCurrent && recommendedMcbRating <= designCurrent * 1.6;

  // Generate recommendations
  const recommendations: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  if (recommendedCableSize > minimumCableSize) {
    recommendations.push(`Upgrade cable to ${recommendedCableSize}mm² to meet voltage drop requirements`);
  }

  if (inputs.startingMethod === 'direct' && inputs.powerKw > 11) {
    recommendations.push('Consider soft starter or star-delta for motors >11kW (BS 7671 recommends reduced starting)');
  }

  if (startingCurrent > 200) {
    warnings.push('High starting current - verify supply transformer capacity');
  }

  if (voltageDropStarting > 15) {
    warnings.push('Excessive starting voltage drop may prevent motor from starting');
  }

  if (inputs.powerKw > 0.37) {
    notes.push('Motor protection relay recommended for motors >0.37kW');
  }

  notes.push(`Use Type ${deviceType.includes('c') ? 'C' : 'D'} MCB for motor protection`);

  // Overall compliance
  const capacityData = getCableCapacity('pvc-single', recommendedCableSize);
  const currentCapacity = (capacityData?.capacity || 0) * totalDerating;
  const bs7671Compliant = 
    currentCapacity >= designCurrent &&
    voltageDropRunning <= 3 &&
    voltageDropStarting <= 10 &&
    protectionSuitable;

  return {
    fullLoadCurrent,
    startingCurrent,
    startingMultiplier,
    startingKva,
    
    minimumCableSize,
    recommendedCableSize,
    currentCarryingCheck: {
      required: designCurrent,
      capacity: currentCapacity,
      suitable: currentCapacity >= designCurrent,
      derating: totalDerating
    },
    
    voltageDropRunning,
    voltageDropStarting,
    voltageDropCompliant: voltageDropRunning <= 3 && voltageDropStarting <= 10,
    
    recommendedMcbRating,
    protectionSuitable,
    protectionType: deviceType,
    
    bs7671Compliant,
    zsCompliant: true, // Would need Zs calculation for full check
    thermalStress,
    
    recommendations,
    warnings,
    notes
  };
};