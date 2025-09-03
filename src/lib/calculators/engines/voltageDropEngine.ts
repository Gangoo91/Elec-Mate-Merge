import { CableType } from '../bs7671-data/cableCapacities';

export interface VoltageDropInputs {
  cableType: CableType;
  cableSize: number;
  length: number;
  current: number;
  voltage: number;
  powerFactor: number;
  phaseConfig: 'single' | 'three';
  temperature: number;
}

export interface VoltageDropResult {
  voltageDrop: number; // Volts
  voltageDropPercent: number; // Percentage
  finalVoltage: number; // Volts
  compliance: {
    isCompliant: boolean;
    limit: number; // BS 7671 limit (3% or 5%)
    limitType: string;
  };
  equation: string;
  resistance: number; // mΩ/m at operating temperature
  reactance: number; // mΩ/m
}

// Extended resistance/reactance data including temperature correction
const getResistanceData = (cableType: CableType, size: number, temperature: number) => {
  // Base resistances at 20°C (mΩ/m) - expanded dataset
  const baseResistances: Record<string, Record<number, { r: number; x: number }>> = {
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

  const cableData = baseResistances[cableType];
  if (!cableData || !cableData[size]) {
    return null;
  }

  const baseData = cableData[size];
  
  // Temperature correction for resistance
  // R(T) = R(20) × [1 + α(T - 20)]
  // Copper α = 0.00393/°C, Aluminium α = 0.00403/°C
  const tempCoeff = cableType.includes('aluminium') ? 0.00403 : 0.00393;
  const operatingResistance = baseData.r * (1 + tempCoeff * (temperature - 20));
  
  return {
    resistance: operatingResistance,
    reactance: baseData.x
  };
};

export const calculateVoltageDrop = (inputs: VoltageDropInputs): VoltageDropResult | null => {
  const {
    cableType,
    cableSize,
    length,
    current,
    voltage,
    powerFactor,
    phaseConfig,
    temperature
  } = inputs;

  const resistanceData = getResistanceData(cableType, cableSize, temperature);
  if (!resistanceData) return null;

  const { resistance, reactance } = resistanceData;
  
  // Convert mΩ/m to Ω/km for calculation
  const R = resistance / 1000; // Ω/km
  const X = reactance / 1000; // Ω/km
  const L = length / 1000; // km
  
  // Calculate voltage drop based on phase configuration
  let voltageDrop: number;
  let equation: string;
  
  if (phaseConfig === 'single') {
    // Single phase: Vd = 2 × I × L × (R × cos φ + X × sin φ)
    const cosφ = powerFactor;
    const sinφ = Math.sqrt(1 - cosφ * cosφ);
    voltageDrop = 2 * current * L * (R * cosφ + X * sinφ);
    equation = `Vd = 2 × I × L × (R×cosφ + X×sinφ) = 2 × ${current} × ${length/1000} × (${R.toFixed(4)}×${cosφ.toFixed(3)} + ${X.toFixed(4)}×${sinφ.toFixed(3)}) = ${voltageDrop.toFixed(2)}V`;
  } else {
    // Three phase: Vd = √3 × I × L × (R × cos φ + X × sin φ)
    const cosφ = powerFactor;
    const sinφ = Math.sqrt(1 - cosφ * cosφ);
    voltageDrop = Math.sqrt(3) * current * L * (R * cosφ + X * sinφ);
    equation = `Vd = √3 × I × L × (R×cosφ + X×sinφ) = 1.732 × ${current} × ${length/1000} × (${R.toFixed(4)}×${cosφ.toFixed(3)} + ${X.toFixed(4)}×${sinφ.toFixed(3)}) = ${voltageDrop.toFixed(2)}V`;
  }

  const voltageDropPercent = (voltageDrop / voltage) * 100;
  const finalVoltage = voltage - voltageDrop;

  // BS 7671 voltage drop limits based on circuit type
  // Note: This is simplified - actual limits depend on specific circuit classification
  const limit = 5; // Default to 5% for general circuits
  const limitType = '5% (General circuits - refer to BS 7671 Table 4Db for specific requirements)';
  const isCompliant = voltageDropPercent <= limit;

  return {
    voltageDrop: Math.round(voltageDrop * 100) / 100,
    voltageDropPercent: Math.round(voltageDropPercent * 100) / 100,
    finalVoltage: Math.round(finalVoltage * 100) / 100,
    compliance: {
      isCompliant,
      limit,
      limitType
    },
    equation,
    resistance: Math.round(resistance * 1000) / 1000,
    reactance: Math.round(reactance * 1000) / 1000
  };
};

export const getVoltageDropRecommendations = (result: VoltageDropResult, inputs: VoltageDropInputs): string[] => {
  const recommendations: string[] = [];
  
  if (!result.compliance.isCompliant) {
    recommendations.push(`Voltage drop exceeds ${result.compliance.limit}% limit - consider larger cable size`);
    recommendations.push('Alternative: Reduce cable length or supply closer to load');
    recommendations.push('Consider higher voltage distribution (e.g., 400V instead of 230V)');
  }
  
  if (result.voltageDropPercent > result.compliance.limit * 0.8) {
    recommendations.push('Approaching voltage drop limit - monitor for load increases');
  }
  
  if (result.finalVoltage < 207) { // 230V - 10%
    recommendations.push('Final voltage below recommended minimum (207V)');
  }
  
  return recommendations;
};