// BS 7671 Earth Fault Loop Impedance (Zs) Calculations
import { CalculationError, validateInput } from '../utils/calculatorUtils';

export interface EarthFaultLoopInputs {
  externalLoopImpedance: number; // Ze (Ω)
  cableResistance: number; // R1 + R2 (Ω)
  cableLength: number; // metres
  cableSize: number; // mm²
  cableType: 'pvc' | 'xlpe';
  conductorMaterial: 'copper' | 'aluminium';
  protectiveDevice: {
    type: 'mcb-b' | 'mcb-c' | 'mcb-d' | 'rcbo' | 'fuse-bs88' | 'fuse-bs1361';
    rating: number; // A
  };
  disconnectionTime?: number; // seconds (0.4s for final circuits, 5s for distribution)
}

export interface EarthFaultLoopResult {
  calculatedZs: number; // Ω
  maxPermittedZs: number; // Ω
  compliance: 'pass' | 'fail' | 'marginal';
  disconnectionTime: number; // seconds
  faultCurrent: number; // A
  recommendedRCD: {
    required: boolean;
    type?: '30mA' | '100mA' | '300mA';
    reason?: string;
  };
  cableResistances: {
    r1: number; // Line conductor resistance
    r2: number; // CPC resistance
    total: number; // R1 + R2
  };
  complianceNotes: string[];
  warnings: string[];
}

// BS 7671 Table 41.3 - Maximum Zs values for different protective devices
const maxZsValues = {
  'mcb-b': {
    6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73, 80: 0.57, 100: 0.46, 125: 0.37
  },
  'mcb-c': {
    6: 3.83, 10: 2.30, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72, 40: 0.57, 50: 0.46, 63: 0.36, 80: 0.29, 100: 0.23, 125: 0.18
  },
  'mcb-d': {
    6: 1.92, 10: 1.15, 16: 0.72, 20: 0.57, 25: 0.46, 32: 0.36, 40: 0.29, 50: 0.23, 63: 0.18, 80: 0.14, 100: 0.11, 125: 0.09
  },
  'fuse-bs88': {
    6: 8.0, 10: 4.8, 16: 3.0, 20: 2.4, 25: 1.92, 32: 1.5, 40: 1.2, 50: 0.96, 63: 0.76, 80: 0.6, 100: 0.48
  },
  'fuse-bs1361': {
    5: 9.6, 15: 3.2, 20: 2.4, 30: 1.6, 45: 1.07
  }
};

// Cable resistance values (mΩ/m) at 20°C
const cableResistances = {
  copper: {
    pvc: { // 70°C conductors
      1.0: { line: 18.1, cpc: 18.1 },
      1.5: { line: 12.1, cpc: 12.1 },
      2.5: { line: 7.41, cpc: 7.41 },
      4.0: { line: 4.61, cpc: 4.61 },
      6.0: { line: 3.08, cpc: 3.08 },
      10.0: { line: 1.83, cpc: 1.83 },
      16.0: { line: 1.15, cpc: 1.15 },
      25.0: { line: 0.727, cpc: 0.727 },
      35.0: { line: 0.524, cpc: 0.524 },
      50.0: { line: 0.387, cpc: 0.387 }
    },
    xlpe: { // 90°C conductors
      1.0: { line: 18.1, cpc: 18.1 },
      1.5: { line: 12.1, cpc: 12.1 },
      2.5: { line: 7.41, cpc: 7.41 },
      4.0: { line: 4.61, cpc: 4.61 },
      6.0: { line: 3.08, cpc: 3.08 },
      10.0: { line: 1.83, cpc: 1.83 },
      16.0: { line: 1.15, cpc: 1.15 },
      25.0: { line: 0.727, cpc: 0.727 },
      35.0: { line: 0.524, cpc: 0.524 },
      50.0: { line: 0.387, cpc: 0.387 }
    }
  }
};

// Temperature factors for cable resistance
const temperatureFactors = {
  pvc: 1.2, // Factor for 70°C
  xlpe: 1.28 // Factor for 90°C
};

export const calculateEarthFaultLoop = (inputs: EarthFaultLoopInputs): EarthFaultLoopResult => {
  const {
    externalLoopImpedance,
    cableLength,
    cableSize,
    cableType,
    conductorMaterial,
    protectiveDevice,
    disconnectionTime = 0.4
  } = inputs;

  // Validation
  validateInput(externalLoopImpedance, 0, 50, 'External loop impedance');
  validateInput(cableLength, 0.1, 1000, 'Cable length');
  validateInput(cableSize, 1, 1000, 'Cable size');
  validateInput(protectiveDevice.rating, 1, 1000, 'Protective device rating');

  const warnings: string[] = [];
  const complianceNotes: string[] = [];

  // Get cable resistance data
  const resistanceData = cableResistances[conductorMaterial]?.[cableType]?.[cableSize];
  if (!resistanceData) {
    throw new CalculationError(`Cable data not available for ${cableSize}mm² ${conductorMaterial} ${cableType}`, 'INVALID_CABLE');
  }

  // Calculate cable resistances at operating temperature
  const tempFactor = temperatureFactors[cableType];
  const r1 = (resistanceData.line * cableLength * tempFactor) / 1000; // Convert mΩ to Ω
  const r2 = (resistanceData.cpc * cableLength * tempFactor) / 1000;
  const r1PlusR2 = r1 + r2;

  // Calculate total earth fault loop impedance
  const calculatedZs = externalLoopImpedance + r1PlusR2;

  // Get maximum permitted Zs for the protective device
  const deviceData = maxZsValues[protectiveDevice.type];
  const maxPermittedZs = deviceData?.[protectiveDevice.rating];

  if (!maxPermittedZs) {
    throw new CalculationError(`Maximum Zs value not available for ${protectiveDevice.type} ${protectiveDevice.rating}A`, 'INVALID_DEVICE');
  }

  // Calculate fault current
  const faultCurrent = 230 / calculatedZs; // Assuming 230V nominal voltage

  // Determine compliance
  let compliance: 'pass' | 'fail' | 'marginal';
  if (calculatedZs <= maxPermittedZs * 0.8) {
    compliance = 'pass';
  } else if (calculatedZs <= maxPermittedZs) {
    compliance = 'marginal';
    warnings.push('Zs is close to maximum limit - consider cable upgrade or RCD protection');
  } else {
    compliance = 'fail';
  }

  // RCD recommendation logic
  const recommendedRCD = determineRCDRequirement(calculatedZs, maxPermittedZs, compliance, disconnectionTime);

  // Add compliance notes
  complianceNotes.push(`Maximum Zs for ${protectiveDevice.type.toUpperCase()} ${protectiveDevice.rating}A: ${maxPermittedZs}Ω`);
  complianceNotes.push(`Calculated Zs: ${calculatedZs.toFixed(3)}Ω`);
  
  if (compliance === 'pass') {
    complianceNotes.push('Earth fault loop impedance meets BS 7671 requirements');
  } else if (compliance === 'fail') {
    complianceNotes.push('FAIL: Earth fault loop impedance exceeds BS 7671 limits');
    recommendedRCD.required = true;
  }

  // Calculate actual disconnection time (simplified)
  const actualDisconnectionTime = calculateDisconnectionTime(faultCurrent, protectiveDevice);

  return {
    calculatedZs: Math.round(calculatedZs * 1000) / 1000,
    maxPermittedZs,
    compliance,
    disconnectionTime: actualDisconnectionTime,
    faultCurrent: Math.round(faultCurrent),
    recommendedRCD,
    cableResistances: {
      r1: Math.round(r1 * 1000) / 1000,
      r2: Math.round(r2 * 1000) / 1000,
      total: Math.round(r1PlusR2 * 1000) / 1000
    },
    complianceNotes,
    warnings
  };
};

const determineRCDRequirement = (
  calculatedZs: number, 
  maxPermittedZs: number, 
  compliance: string,
  disconnectionTime: number
): EarthFaultLoopResult['recommendedRCD'] => {
  
  if (compliance === 'fail') {
    return {
      required: true,
      type: '30mA',
      reason: 'Required due to high Zs - ensures disconnection within 0.4s'
    };
  }

  if (disconnectionTime > 0.4) {
    return {
      required: true,
      type: '30mA',
      reason: 'Required for final circuits to achieve 0.4s disconnection time'
    };
  }

  // Check if in bathroom/special location (simplified check)
  if (calculatedZs > maxPermittedZs * 0.9) {
    return {
      required: false,
      reason: 'Consider RCD for additional protection - Zs approaching limit'
    };
  }

  return {
    required: false,
    reason: 'Not required for earth fault protection but may be required for other reasons'
  };
};

const calculateDisconnectionTime = (faultCurrent: number, device: EarthFaultLoopInputs['protectiveDevice']): number => {
  // Simplified disconnection time calculation
  // In reality, this would use the device characteristic curves
  
  if (device.type.includes('mcb')) {
    // MCB simplified time-current relationship
    const magneticTrip = device.rating * (device.type.includes('b') ? 5 : device.type.includes('c') ? 10 : 20);
    
    if (faultCurrent >= magneticTrip) {
      return 0.1; // Magnetic trip typically <0.1s
    } else {
      return 5.0; // Thermal trip could be up to 5s
    }
  }
  
  if (device.type.includes('fuse')) {
    // Fuse time-current approximation
    const ratio = faultCurrent / device.rating;
    if (ratio >= 4) return 0.4;
    if (ratio >= 2) return 5.0;
    return 60; // Could be very slow for low fault currents
  }

  return 0.4; // Default assumption
};

// Helper function for common domestic circuits
export const calculateDomesticZs = (
  cableSize: number,
  cableLength: number,
  protectionRating: number,
  externalZe: number = 0.8
): EarthFaultLoopResult => {
  return calculateEarthFaultLoop({
    externalLoopImpedance: externalZe,
    cableResistance: 0, // Will be calculated
    cableLength,
    cableSize,
    cableType: 'pvc',
    conductorMaterial: 'copper',
    protectiveDevice: {
      type: 'mcb-b',
      rating: protectionRating
    },
    disconnectionTime: 0.4
  });
};