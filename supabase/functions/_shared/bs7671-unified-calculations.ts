// ============================================
// BS 7671 UNIFIED CALCULATION LIBRARY
// Single source of truth for electrical calculations
// Compliant with BS 7671:2018+A2:2022 (18th Edition)
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

export function calculateDiversity(params: DiversityParams): DiversityResult {
  const { circuits, propertyType } = params;
  
  if (propertyType !== 'domestic') {
    // Commercial diversity is more complex - simplified for now
    const total = circuits.reduce((sum, c) => sum + c.load, 0);
    return {
      totalConnected: total,
      diversifiedDemand: total * 0.85, // 85% diversity approximation
      diversityFactor: 0.85,
      breakdown: []
    };
  }
  
  // BS 7671 Appendix A - Domestic diversity
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
  
  // Apply BS 7671 Appendix A diversity factors
  // Lighting: 66% of total, minimum 2300W (10A at 230V)
  const lightingDiversified = Math.max(lightingTotal * 0.66, lightingTotal > 0 ? 2300 : 0);
  
  // Socket outlets: 100% first 7360W (32A), then 40% of remainder
  const socketsDiversified = socketsTotal <= 7360 
    ? socketsTotal 
    : 7360 + (socketsTotal - 7360) * 0.40;
  
  // Cookers: 10A (2300W) + 30% of first 10A (2300W) + 60% of remainder
  // BS 7671 Appendix A Table A1
  const cookersDiversified = cookersTotal > 0 
    ? 2300 + Math.min(cookersTotal - 2300, 2300) * 0.30 + Math.max(0, cookersTotal - 4600) * 0.60 
    : 0;
  
  // Immersion heaters: 100% (no diversity)
  const immersionDiversified = immersionTotal;
  
  // Space heating: 100% (no diversity)
  const heatingDiversified = heatingTotal;
  
  // Other loads: 100% (conservative)
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
      { type: 'heating', connected: heatingTotal, diversified: Math.round(heatingDiversified), factor: 1.0 },
      { type: 'other', connected: otherTotal, diversified: Math.round(otherDiversified), factor: 1.0 }
    ].filter(b => b.connected > 0)
  };
}
