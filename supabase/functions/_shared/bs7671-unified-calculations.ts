// ============================================
// BS 7671 UNIFIED CALCULATION LIBRARY
// Single source of truth for electrical calculations
// Compliant with BS 7671:2018+A3:2024 (18th Edition)
// ============================================

export type CableType = 
  | 'pvc-single' 
  | 'xlpe-single'
  | 'pvc-twin-earth'
  | 'xlpe-twin-earth'
  | 'swa'
  | 'micc'
  | 'aluminium-xlpe';

// ============================================
// 1. VOLTAGE DROP CALCULATIONS (R×cosφ + X×sinφ)
// BS 7671 Appendix 4
// ============================================

export interface VoltageDropParams {
  cableType: CableType;
  cableSize: number;
  current: number;
  length: number;
  voltage: number;
  powerFactor: number;
  phaseConfig: 'single' | 'three';
  temperature: number;
  loadType?: 'lighting' | 'power';
}

export interface VoltageDropResult {
  voltageDropVolts: number;
  voltageDropPercent: number;
  finalVoltage: number;
  compliant: boolean;
  limit: number; // 3% or 5%
  limitType: string;
  equation: string;
  resistance: number; // mΩ/m at operating temp
  reactance: number; // mΩ/m
}

// Temperature coefficients (BS 7671 Appendix 14)
const TEMP_COEFF_COPPER = 0.00393; // per °C
const TEMP_COEFF_ALUMINIUM = 0.00403; // per °C

// Resistance and reactance data at 20°C (BS 7671 Appendix 4, Table 4D1B)
const resistanceData: Record<string, Record<number, { r: number; x: number }>> = {
  'pvc-single': {
    1.0: { r: 18.1, x: 0.14 },
    1.5: { r: 12.1, x: 0.13 },
    2.5: { r: 7.41, x: 0.12 },
    4: { r: 4.61, x: 0.11 },
    6: { r: 3.08, x: 0.11 },
    10: { r: 1.83, x: 0.10 },
    16: { r: 1.15, x: 0.095 },
    25: { r: 0.727, x: 0.090 },
    35: { r: 0.524, x: 0.085 },
    50: { r: 0.387, x: 0.082 },
    70: { r: 0.268, x: 0.079 },
    95: { r: 0.193, x: 0.077 },
    120: { r: 0.153, x: 0.075 },
    150: { r: 0.124, x: 0.074 },
    185: { r: 0.0991, x: 0.073 },
    240: { r: 0.0754, x: 0.072 },
    300: { r: 0.0601, x: 0.071 },
    400: { r: 0.0470, x: 0.070 },
    500: { r: 0.0366, x: 0.069 },
    630: { r: 0.0283, x: 0.068 }
  },
  'xlpe-single': {
    1.0: { r: 18.1, x: 0.14 },
    1.5: { r: 12.1, x: 0.13 },
    2.5: { r: 7.41, x: 0.12 },
    4: { r: 4.61, x: 0.11 },
    6: { r: 3.08, x: 0.11 },
    10: { r: 1.83, x: 0.10 },
    16: { r: 1.15, x: 0.095 },
    25: { r: 0.727, x: 0.090 },
    35: { r: 0.524, x: 0.085 },
    50: { r: 0.387, x: 0.082 },
    70: { r: 0.268, x: 0.079 },
    95: { r: 0.193, x: 0.077 },
    120: { r: 0.153, x: 0.075 },
    150: { r: 0.124, x: 0.074 },
    185: { r: 0.0991, x: 0.073 },
    240: { r: 0.0754, x: 0.072 },
    300: { r: 0.0601, x: 0.071 },
    400: { r: 0.0470, x: 0.070 },
    500: { r: 0.0366, x: 0.069 },
    630: { r: 0.0283, x: 0.068 }
  },
  'pvc-twin-earth': {
    1.0: { r: 18.1, x: 0 },
    1.5: { r: 12.1, x: 0 },
    2.5: { r: 7.41, x: 0 },
    4: { r: 4.61, x: 0 },
    6: { r: 3.08, x: 0 },
    10: { r: 1.83, x: 0 },
    16: { r: 1.15, x: 0 },
    25: { r: 0.727, x: 0 },
    35: { r: 0.524, x: 0 },
    50: { r: 0.387, x: 0 }
  },
  'xlpe-twin-earth': {
    1.0: { r: 18.1, x: 0 },
    1.5: { r: 12.1, x: 0 },
    2.5: { r: 7.41, x: 0 },
    4: { r: 4.61, x: 0 },
    6: { r: 3.08, x: 0 },
    10: { r: 1.83, x: 0 },
    16: { r: 1.15, x: 0 },
    25: { r: 0.727, x: 0 },
    35: { r: 0.524, x: 0 },
    50: { r: 0.387, x: 0 }
  },
  'swa': {
    1.5: { r: 12.1, x: 0.13 },
    2.5: { r: 7.41, x: 0.12 },
    4: { r: 4.61, x: 0.11 },
    6: { r: 3.08, x: 0.11 },
    10: { r: 1.83, x: 0.10 },
    16: { r: 1.15, x: 0.095 },
    25: { r: 0.727, x: 0.090 },
    35: { r: 0.524, x: 0.085 },
    50: { r: 0.387, x: 0.082 },
    70: { r: 0.268, x: 0.079 },
    95: { r: 0.193, x: 0.077 },
    120: { r: 0.153, x: 0.075 },
    150: { r: 0.124, x: 0.074 },
    185: { r: 0.0991, x: 0.073 },
    240: { r: 0.0754, x: 0.072 },
    300: { r: 0.0601, x: 0.071 },
    400: { r: 0.0470, x: 0.070 },
    500: { r: 0.0366, x: 0.069 },
    630: { r: 0.0283, x: 0.068 }
  },
  'micc': {
    1.0: { r: 18.1, x: 0.10 },
    1.5: { r: 12.1, x: 0.10 },
    2.5: { r: 7.41, x: 0.10 },
    4: { r: 4.61, x: 0.10 },
    6: { r: 3.08, x: 0.10 },
    10: { r: 1.83, x: 0.10 },
    16: { r: 1.15, x: 0.10 },
    25: { r: 0.727, x: 0.10 },
    35: { r: 0.524, x: 0.10 },
    50: { r: 0.387, x: 0.10 }
  },
  'aluminium-xlpe': {
    16: { r: 1.91, x: 0.095 },
    25: { r: 1.20, x: 0.090 },
    35: { r: 0.868, x: 0.085 },
    50: { r: 0.641, x: 0.082 },
    70: { r: 0.443, x: 0.079 },
    95: { r: 0.320, x: 0.077 },
    120: { r: 0.253, x: 0.075 },
    150: { r: 0.206, x: 0.074 },
    185: { r: 0.164, x: 0.073 },
    240: { r: 0.125, x: 0.072 },
    300: { r: 0.100, x: 0.071 },
    400: { r: 0.0778, x: 0.070 },
    500: { r: 0.0605, x: 0.069 },
    630: { r: 0.0469, x: 0.068 }
  }
};

function getResistanceData(cableType: CableType, size: number): { resistance: number; reactance: number } | null {
  const data = resistanceData[cableType]?.[size];
  return data ? { resistance: data.r, reactance: data.x } : null;
}

export function calculateVoltageDrop(params: VoltageDropParams): VoltageDropResult | null {
  const {
    cableType,
    cableSize,
    length,
    current,
    voltage,
    powerFactor,
    phaseConfig,
    temperature,
    loadType
  } = params;

  const baseData = getResistanceData(cableType, cableSize);
  if (!baseData) return null;

  // Apply temperature correction: R(T) = R(20) × [1 + α(T - 20)]
  const tempCoeff = cableType.includes('aluminium') ? TEMP_COEFF_ALUMINIUM : TEMP_COEFF_COPPER;
  const operatingResistance = baseData.resistance * (1 + tempCoeff * (temperature - 20));
  const reactance = baseData.reactance;
  
  // Convert mΩ/m to Ω for calculation 
  const R = operatingResistance * length / 1000; // Ω (total resistance)
  const X = reactance * length / 1000; // Ω (total reactance)
  
  // Calculate voltage drop based on phase configuration
  let voltageDrop: number;
  let equation: string;
  
  if (phaseConfig === 'single') {
    // Single phase: Vd = 2 × I × (R × cos φ + X × sin φ)
    const cosφ = powerFactor;
    const sinφ = Math.sqrt(1 - cosφ * cosφ);
    voltageDrop = 2 * current * (R * cosφ + X * sinφ);
    equation = `Vd = 2 × I × (R×cosφ + X×sinφ) = 2 × ${current.toFixed(1)} × (${R.toFixed(4)}×${cosφ.toFixed(3)} + ${X.toFixed(4)}×${sinφ.toFixed(3)}) = ${voltageDrop.toFixed(2)}V`;
  } else {
    // Three phase: Vd = √3 × I × (R × cos φ + X × sin φ)
    const cosφ = powerFactor;
    const sinφ = Math.sqrt(1 - cosφ * cosφ);
    voltageDrop = Math.sqrt(3) * current * (R * cosφ + X * sinφ);
    equation = `Vd = √3 × I × (R×cosφ + X×sinφ) = 1.732 × ${current.toFixed(1)} × (${R.toFixed(4)}×${cosφ.toFixed(3)} + ${X.toFixed(4)}×${sinφ.toFixed(3)}) = ${voltageDrop.toFixed(2)}V`;
  }

  const voltageDropPercent = (voltageDrop / voltage) * 100;
  const finalVoltage = voltage - voltageDrop;

  // BS 7671 Appendix 4 - Voltage drop limits
  const limit = loadType === 'lighting' ? 3 : 5;
  const limitType = loadType === 'lighting' 
    ? '3% (Lighting circuits - BS 7671 Appendix 4)'
    : '5% (Power circuits - BS 7671 Appendix 4)';
  const compliant = voltageDropPercent <= limit;

  return {
    voltageDropVolts: Math.round(voltageDrop * 100) / 100,
    voltageDropPercent: Math.round(voltageDropPercent * 100) / 100,
    finalVoltage: Math.round(finalVoltage * 100) / 100,
    compliant,
    limit,
    limitType,
    equation,
    resistance: Math.round(operatingResistance * 1000) / 1000,
    reactance: Math.round(reactance * 1000) / 1000
  };
}

// ============================================
// 2. EARTH FAULT LOOP IMPEDANCE (Zs)
// BS 7671 Section 411.3.2 & Table 41.3
// ============================================

export interface EarthFaultParams {
  externalZe: number; // Ze (Ω)
  cableType: CableType;
  cableSize: number;
  cpcSize: number; // CPC conductor size
  length: number;
  temperature: number;
  protectiveDevice: {
    type: 'B' | 'C' | 'D';
    rating: number;
  };
}

export interface EarthFaultResult {
  calculatedZs: number; // Ω
  maxZs: number; // Ω from BS 7671 Table 41.3
  compliant: boolean;
  margin: number; // percentage
  r1: number; // Line conductor resistance (Ω)
  r2: number; // CPC resistance (Ω)
  r1PlusR2: number; // Total (Ω)
  faultCurrent: number; // A
  equation: string;
  regulation: string;
}

// BS 7671 Table 41.3 - Maximum Zs values for MCBs (0.4s disconnection, 230V)
const MAX_ZS_VALUES: Record<string, Record<number, number>> = {
  'B': { 6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73, 80: 0.57, 100: 0.46, 125: 0.37 },
  'C': { 6: 3.83, 10: 2.30, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72, 40: 0.57, 50: 0.46, 63: 0.36, 80: 0.29, 100: 0.23, 125: 0.18 },
  'D': { 6: 1.92, 10: 1.15, 16: 0.72, 20: 0.57, 25: 0.46, 32: 0.36, 40: 0.29, 50: 0.23, 63: 0.18, 80: 0.14, 100: 0.11, 125: 0.09 }
};

// Temperature factors for cable resistance at max operating temperature
// BS 7671 Appendix 14: 1.20 for 70°C PVC, 1.28 for 90°C XLPE
const TEMP_FACTORS: Record<string, number> = {
  'pvc': 1.20,
  'xlpe': 1.28,
  'swa': 1.20,
  'micc': 1.20
};

function getConductorResistance(cableType: CableType, size: number): number | null {
  const data = getResistanceData(cableType, size);
  return data?.resistance || null;
}

export function calculateEarthFaultLoop(params: EarthFaultParams): EarthFaultResult | null {
  const { externalZe, cableType, cableSize, cpcSize, length, temperature, protectiveDevice } = params;
  
  // Get conductor resistances
  const lineResistance = getConductorResistance(cableType, cableSize);
  const cpcResistance = getConductorResistance(cableType, cpcSize);
  
  if (!lineResistance || !cpcResistance) return null;
  
  // Get temperature factor based on cable type
  const tempRating = cableType.includes('xlpe') ? 'xlpe' : 'pvc';
  const tempFactor = TEMP_FACTORS[tempRating] || 1.20;
  
  // Calculate R1 + R2 (both at operating temperature)
  // BS 7671 Appendix 14: R = R₂₀ × temperature factor
  const r1 = (lineResistance * length * tempFactor) / 1000; // Convert mΩ to Ω
  const r2 = (cpcResistance * length * tempFactor) / 1000;
  const r1PlusR2 = r1 + r2;
  
  // Calculate Zs: Zs = Ze + (R1 + R2)
  const calculatedZs = externalZe + r1PlusR2;
  
  // Get max Zs from BS 7671 Table 41.3
  const maxZs = MAX_ZS_VALUES[protectiveDevice.type]?.[protectiveDevice.rating];
  if (!maxZs) return null;
  
  // Calculate fault current: If = U₀ / Zs
  const faultCurrent = 230 / calculatedZs; // U₀ = 230V (phase-earth voltage)
  
  // Check compliance
  const compliant = calculatedZs <= maxZs;
  const margin = ((maxZs - calculatedZs) / maxZs) * 100;
  
  const equation = `Zs = Ze + (R1+R2) = ${externalZe}Ω + ${r1PlusR2.toFixed(3)}Ω = ${calculatedZs.toFixed(3)}Ω`;
  const regulation = `BS 7671 Table 41.3 - Type ${protectiveDevice.type} ${protectiveDevice.rating}A: Max Zs = ${maxZs}Ω`;
  
  return {
    calculatedZs: Math.round(calculatedZs * 1000) / 1000,
    maxZs,
    compliant,
    margin: Math.round(margin * 10) / 10,
    r1: Math.round(r1 * 1000) / 1000,
    r2: Math.round(r2 * 1000) / 1000,
    r1PlusR2: Math.round(r1PlusR2 * 1000) / 1000,
    faultCurrent: Math.round(faultCurrent),
    equation,
    regulation
  };
}

// ============================================
// 3. DIVERSITY FACTORS (BS 7671 Appendix A)
// ============================================

export interface DiversityParams {
  circuits: Array<{
    type: 'lighting' | 'sockets' | 'cooker' | 'immersion' | 'heating' | 'other';
    load: number; // Watts
  }>;
  propertyType: 'domestic' | 'commercial';
}

export interface DiversityResult {
  totalConnected: number; // W
  diversifiedDemand: number; // W
  diversityFactor: number;
  breakdown: Array<{
    type: string;
    connected: number;
    diversified: number;
    factor: number;
  }>;
}

// ============================================
// 4. CIRCUIT-LEVEL DIVERSITY (BS 7671 Appendix A)
// Applies diversity to individual circuits for realistic MCB sizing
// ============================================

export type CircuitType = 
  | 'lighting' 
  | 'socket_ring' 
  | 'socket_radial' 
  | 'cooker' 
  | 'shower' 
  | 'immersion' 
  | 'heating' 
  | 'ev' 
  | 'other';

export interface CircuitDiversityParams {
  circuitType: CircuitType;
  connectedLoad: number; // Watts
  voltage: number;
  installationType?: 'domestic' | 'commercial' | 'industrial';
}

export interface CircuitDiversityResult {
  connectedLoad: number;
  diversifiedLoad: number;
  diversityFactor: number;
  diversifiedCurrent: number; // Id - for MCB selection
  maxMcb: number; // Circuit type maximum
  justification: string;
}

export function calculateCircuitDiversity(params: CircuitDiversityParams): CircuitDiversityResult {
  const { circuitType, connectedLoad, voltage, installationType = 'domestic' } = params;
  
  let diversifiedLoad = connectedLoad;
  let diversityFactor = 1.0;
  let maxMcb = 63;
  let justification = '';
  
  // Installation-type-specific diversity factors
  const diversityFactors = {
    domestic: {
      lighting: 0.66,
      socket_radial: 0.40,  // For excess over 7.36kW
      cooker: 'formula',
    },
    commercial: {
      lighting: 0.80,       // Larger areas with more simultaneous use
      socket_radial: 0.60,  // Office/commercial diversity
      cooker: 1.0,          // Commercial kitchens - NO diversity!
      heating: 0.90,        // Zone-controlled commercial heating
    },
    industrial: {
      lighting: 0.90,       // Factory/warehouse - most lit at once
      socket_radial: 0.80,  // Equipment running - less diversity
      cooker: 1.0,
      heating: 1.0,         // Process heating - no diversity
    }
  };
  
  switch (circuitType) {
    case 'lighting':
      // Apply installation-type-specific lighting diversity
      if (installationType === 'commercial') {
        diversifiedLoad = connectedLoad * 0.80;
        diversityFactor = 0.80;
        maxMcb = 16;
        justification = `Lighting: 80% diversity applied (commercial installation - larger areas with simultaneous use). ${(connectedLoad/1000).toFixed(1)}kW × 0.80 = ${(diversifiedLoad/1000).toFixed(1)}kW`;
      } else if (installationType === 'industrial') {
        diversifiedLoad = connectedLoad * 0.90;
        diversityFactor = 0.90;
        maxMcb = 20;
        justification = `Lighting: 90% diversity applied (industrial installation - warehouse/production area lighting). ${(connectedLoad/1000).toFixed(1)}kW × 0.90 = ${(diversifiedLoad/1000).toFixed(1)}kW`;
      } else {
        // Domestic - BS 7671 Appendix A
        diversifiedLoad = connectedLoad * 0.66;
        diversityFactor = 0.66;
        maxMcb = 16;
        justification = `Lighting: 66% diversity per BS 7671 Appendix A (domestic installation). ${(connectedLoad/1000).toFixed(1)}kW × 0.66 = ${(diversifiedLoad/1000).toFixed(1)}kW`;
      }
      break;
      
    case 'socket_ring':
      // Ring finals: ALWAYS 32A, diversity inherent in ring topology
      diversifiedLoad = connectedLoad; // No reduction - ring handles it
      diversityFactor = 1.0;
      maxMcb = 32;
      justification = `Ring final: 32A fixed per BS 7671 Appendix 15. Ring topology provides inherent load diversity across two parallel paths.`;
      break;
      
    case 'socket_radial':
      // Radial sockets: Installation-type-specific diversity
      if (installationType === 'commercial') {
        // Commercial: 60% diversity for office/shop equipment
        if (connectedLoad <= 7360) {
          diversifiedLoad = connectedLoad;
          diversityFactor = 1.0;
          justification = `Radial socket: 100% of ${(connectedLoad/1000).toFixed(1)}kW (commercial - below 7.36kW threshold)`;
        } else {
          diversifiedLoad = 7360 + (connectedLoad - 7360) * 0.60;
          diversityFactor = diversifiedLoad / connectedLoad;
          justification = `Radial socket: 7.36kW + 60% of ${((connectedLoad-7360)/1000).toFixed(1)}kW = ${(diversifiedLoad/1000).toFixed(1)}kW (commercial diversity)`;
        }
      } else if (installationType === 'industrial') {
        // Industrial: 80% diversity - equipment expected to run
        if (connectedLoad <= 7360) {
          diversifiedLoad = connectedLoad;
          diversityFactor = 1.0;
          justification = `Radial socket: 100% of ${(connectedLoad/1000).toFixed(1)}kW (industrial - below 7.36kW threshold)`;
        } else {
          diversifiedLoad = 7360 + (connectedLoad - 7360) * 0.80;
          diversityFactor = diversifiedLoad / connectedLoad;
          justification = `Radial socket: 7.36kW + 80% of ${((connectedLoad-7360)/1000).toFixed(1)}kW = ${(diversifiedLoad/1000).toFixed(1)}kW (industrial - conservative)`;
        }
      } else {
        // Domestic: BS 7671 Appendix A - 40% of remainder
        if (connectedLoad <= 7360) {
          diversifiedLoad = connectedLoad;
          diversityFactor = 1.0;
          justification = `Radial socket: 100% of ${(connectedLoad/1000).toFixed(1)}kW (below 7.36kW threshold per BS 7671 Appendix A)`;
        } else {
          diversifiedLoad = 7360 + (connectedLoad - 7360) * 0.40;
          diversityFactor = diversifiedLoad / connectedLoad;
          justification = `Radial socket: 7.36kW + 40% of ${((connectedLoad-7360)/1000).toFixed(1)}kW = ${(diversifiedLoad/1000).toFixed(1)}kW per BS 7671 Appendix A`;
        }
      }
      maxMcb = 32;
      break;
      
    case 'cooker':
      // Cooker diversity depends on installation type
      if (installationType === 'commercial' || installationType === 'industrial') {
        // Commercial/Industrial kitchens: NO diversity - assume simultaneous use
        diversifiedLoad = connectedLoad;
        diversityFactor = 1.0;
        maxMcb = 63;
        justification = `Cooker: 100% load - no diversity (${installationType} kitchen assumes simultaneous equipment operation). ${(connectedLoad/1000).toFixed(1)}kW`;
      } else {
        // Domestic: BS 7671 Appendix A Table A1: 10A + 30% of first 10A + 60% of remainder
        if (connectedLoad <= 2300) {
          diversifiedLoad = 2300; // Minimum 10A
          diversityFactor = diversifiedLoad / connectedLoad;
          justification = `Cooker: Minimum 10A (2.3kW) per BS 7671 Appendix A Table A1 (domestic)`;
        } else if (connectedLoad <= 4600) {
          diversifiedLoad = 2300 + (connectedLoad - 2300) * 0.30;
          diversityFactor = diversifiedLoad / connectedLoad;
          justification = `Cooker: 2.3kW + 30% of ${((connectedLoad-2300)/1000).toFixed(1)}kW = ${(diversifiedLoad/1000).toFixed(1)}kW per BS 7671 Appendix A (domestic)`;
        } else {
          diversifiedLoad = 2300 + 690 + (connectedLoad - 4600) * 0.60; // 690 = 30% of 2300
          diversityFactor = diversifiedLoad / connectedLoad;
          justification = `Cooker: 2.3kW + 0.69kW + 60% of ${((connectedLoad-4600)/1000).toFixed(1)}kW = ${(diversifiedLoad/1000).toFixed(1)}kW per BS 7671 Appendix A (domestic)`;
        }
        maxMcb = 50;
      }
      break;
      
    case 'shower':
    case 'immersion':
    case 'ev':
      // No diversity for fixed high-power loads
      diversifiedLoad = connectedLoad;
      diversityFactor = 1.0;
      maxMcb = circuitType === 'ev' ? 40 : 50;
      justification = `${circuitType === 'shower' ? 'Shower' : circuitType === 'immersion' ? 'Immersion heater' : 'EV charger'}: 100% load - no diversity applicable (continuous fixed load)`;
      break;
      
    case 'heating':
      // Heating diversity depends on installation type
      if (installationType === 'commercial') {
        // Commercial: 90% diversity for zone-controlled heating
        diversifiedLoad = connectedLoad * 0.90;
        diversityFactor = 0.90;
        maxMcb = 50;
        justification = `Heating: 90% diversity applied (commercial zone-controlled heating). ${(connectedLoad/1000).toFixed(1)}kW × 0.90 = ${(diversifiedLoad/1000).toFixed(1)}kW`;
      } else {
        // Domestic/Industrial: No diversity
        diversifiedLoad = connectedLoad;
        diversityFactor = 1.0;
        maxMcb = 40;
        justification = `Heating: 100% load - no diversity (${installationType === 'industrial' ? 'process heating' : 'thermostatically controlled but assume simultaneous operation'})`;
      }
      break;
      
    default:
      diversifiedLoad = connectedLoad;
      diversityFactor = 1.0;
      maxMcb = 63;
      justification = `General load: 100% (no specific diversity factor in BS 7671 Appendix A)`;
  }
  
  const diversifiedCurrent = diversifiedLoad / voltage;
  
  return {
    connectedLoad: Math.round(connectedLoad),
    diversifiedLoad: Math.round(diversifiedLoad),
    diversityFactor: Math.round(diversityFactor * 100) / 100,
    diversifiedCurrent: Math.round(diversifiedCurrent * 100) / 100,
    maxMcb,
    justification
  };
}

export function calculateDiversity(params: DiversityParams): DiversityResult {
  const { circuits, propertyType } = params;
  
  // Group circuits by type
  const lighting = circuits.filter(c => c.type === 'lighting');
  const sockets = circuits.filter(c => c.type === 'sockets');
  const cookers = circuits.filter(c => c.type === 'cooker');
  const immersion = circuits.filter(c => c.type === 'immersion');
  const heating = circuits.filter(c => c.type === 'heating');
  const other = circuits.filter(c => c.type === 'other');
  
  const lightingTotal = lighting.reduce((sum, c) => sum + c.load, 0);
  const socketsTotal = sockets.reduce((sum, c) => sum + c.load, 0);
  const cookersTotal = cookers.reduce((sum, c) => sum + c.load, 0);
  const immersionTotal = immersion.reduce((sum, c) => sum + c.load, 0);
  const heatingTotal = heating.reduce((sum, c) => sum + c.load, 0);
  const otherTotal = other.reduce((sum, c) => sum + c.load, 0);
  
  let lightingDiversified: number;
  let socketsDiversified: number;
  let cookersDiversified: number;
  let heatingDiversified: number;
  
  if (propertyType === 'commercial') {
    // ========== COMMERCIAL DIVERSITY ==========
    // Lighting: 80% (larger areas with simultaneous use)
    lightingDiversified = lightingTotal * 0.80;
    
    // Socket outlets: 100% first 7360W, then 60% of remainder (office/shop diversity)
    socketsDiversified = socketsTotal <= 7360 
      ? socketsTotal 
      : 7360 + (socketsTotal - 7360) * 0.60;
    
    // Cookers/Kitchen: 100% - NO diversity! (commercial kitchens operate simultaneously)
    cookersDiversified = cookersTotal;
    
    // Heating: 90% (zone-controlled commercial heating)
    heatingDiversified = heatingTotal * 0.90;
    
  } else if (propertyType === 'industrial') {
    // ========== INDUSTRIAL DIVERSITY ==========
    // Lighting: 90% (warehouse/factory - most areas lit at once)
    lightingDiversified = lightingTotal * 0.90;
    
    // Socket outlets: 100% first 7360W, then 80% of remainder (equipment expected to run)
    socketsDiversified = socketsTotal <= 7360 
      ? socketsTotal 
      : 7360 + (socketsTotal - 7360) * 0.80;
    
    // Cookers/Process equipment: 100% - NO diversity!
    cookersDiversified = cookersTotal;
    
    // Heating: 100% (process heating - no diversity)
    heatingDiversified = heatingTotal;
    
  } else {
    // ========== DOMESTIC DIVERSITY (BS 7671 Appendix A) ==========
    // Lighting: 66% of total, minimum 2300W (10A at 230V)
    lightingDiversified = Math.max(lightingTotal * 0.66, lightingTotal > 0 ? 2300 : 0);
    
    // Socket outlets: 100% first 7360W (32A), then 40% of remainder
    socketsDiversified = socketsTotal <= 7360 
      ? socketsTotal 
      : 7360 + (socketsTotal - 7360) * 0.40;
    
    // Cookers: 10A (2300W) + 30% of first 10A + 60% of remainder (BS 7671 Appendix A Table A1)
    cookersDiversified = cookersTotal > 0 
      ? 2300 + Math.min(cookersTotal - 2300, 2300) * 0.30 + Math.max(0, cookersTotal - 4600) * 0.60 
      : 0;
    
    // Space heating: 100% (no diversity - thermostatically controlled but assume simultaneous)
    heatingDiversified = heatingTotal;
  }
  
  // Immersion heaters: 100% (no diversity across all installation types)
  const immersionDiversified = immersionTotal;
  
  // Other loads: 100% (conservative across all installation types)
  const otherDiversified = otherTotal;
  
  const totalConnected = lightingTotal + socketsTotal + cookersTotal + immersionTotal + heatingTotal + otherTotal;
  const diversifiedDemand = lightingDiversified + socketsDiversified + cookersDiversified + 
                           immersionDiversified + heatingDiversified + otherDiversified;
  
  return {
    totalConnected: Math.round(totalConnected),
    diversifiedDemand: Math.round(diversifiedDemand),
    diversityFactor: Math.round((diversifiedDemand / totalConnected) * 100) / 100,
    breakdown: [
      { type: 'lighting', connected: lightingTotal, diversified: Math.round(lightingDiversified), factor: lightingTotal > 0 ? lightingDiversified/lightingTotal : 1 },
      { type: 'sockets', connected: socketsTotal, diversified: Math.round(socketsDiversified), factor: socketsTotal > 0 ? socketsDiversified/socketsTotal : 1 },
      { type: 'cookers', connected: cookersTotal, diversified: Math.round(cookersDiversified), factor: cookersTotal > 0 ? cookersDiversified/cookersTotal : 1 },
      { type: 'immersion', connected: immersionTotal, diversified: Math.round(immersionDiversified), factor: 1.0 },
      { type: 'heating', connected: heatingTotal, diversified: Math.round(heatingDiversified), factor: heatingTotal > 0 ? heatingDiversified/heatingTotal : 1 },
      { type: 'other', connected: otherTotal, diversified: Math.round(otherDiversified), factor: 1.0 }
    ].filter(b => b.connected > 0)
  };
}
