// Phase 1: Calculation Engines - BS 7671 Compliant Calculations
// These are the actual calculation functions from src/lib/calculators/engines/

export interface CableCapacityResult {
  Ib: number;
  In: number;
  Iz: number;
  IzTabulated: number;
  factors: {
    temperature: number;
    grouping: number;
    overall: number;
  };
  compliance: {
    IbLeIn: boolean;
    InLeIz: boolean;
    overallCompliant: boolean;
    safetyMargin: number;
  };
  equation: string;
  voltageDrop: {
    voltageDropVolts: number;
    voltageDropPercent: number;
    compliant: boolean;
    maxAllowed: number;
  };
  earthFault: {
    calculated: number;
    max: number;
    compliant: boolean;
  };
}

export interface VoltageDropResult {
  voltageDropVolts: number;
  voltageDropPercent: number;
  compliant: boolean;
  maxAllowed: number;
}

// Cable capacity calculation (from cableCapacityEngine.ts)
export function calculateCableCapacity(params: {
  cableSize: number;
  designCurrent: number;
  deviceRating: number;
  ambientTemp: number;
  groupingCircuits: number;
  installationMethod: string;
  cableType: string;
  cableLength?: number;
  voltage?: number;
}): CableCapacityResult {
  const { cableSize, designCurrent, deviceRating, ambientTemp, groupingCircuits, installationMethod, cableType, cableLength = 15, voltage = 230 } = params;

  // Get base capacity from BS 7671 tables (simplified)
  const baseCapacities: Record<number, number> = {
    1.5: 19.5,
    2.5: 27,
    4: 37,
    6: 47,
    10: 64,
    16: 85,
    25: 112,
    35: 138,
    50: 168,
    70: 213,
    95: 258,
    120: 299,
  };

  const IzTabulated = baseCapacities[cableSize] || 0;

  // Temperature derating (BS 7671 Table 4B1)
  const tempFactor = ambientTemp <= 25 ? 1.0 :
                     ambientTemp <= 30 ? 0.94 :
                     ambientTemp <= 35 ? 0.87 :
                     ambientTemp <= 40 ? 0.79 :
                     ambientTemp <= 45 ? 0.71 :
                     ambientTemp <= 50 ? 0.61 : 0.5;

  // Grouping factor (BS 7671 Table 4C1)
  const groupingFactor = groupingCircuits === 1 ? 1.0 :
                        groupingCircuits === 2 ? 0.8 :
                        groupingCircuits === 3 ? 0.7 :
                        groupingCircuits <= 6 ? 0.65 :
                        groupingCircuits <= 9 ? 0.6 : 0.5;

  const overallFactor = tempFactor * groupingFactor;
  const Iz = IzTabulated * overallFactor;

  const IbLeIn = designCurrent <= deviceRating;
  const InLeIz = deviceRating <= Iz;
  const safetyMargin = ((Iz - deviceRating) / deviceRating) * 100;

  // Calculate voltage drop
  const voltDrop = calculateVoltageDrop({
    current: designCurrent,
    cableLength,
    cableSize,
    voltage,
    phases: 'single'
  });

  // Calculate earth fault
  const earthFault = calculateMaxZs({
    deviceRating,
    deviceType: 'B'
  });

  return {
    Ib: designCurrent,
    In: deviceRating,
    Iz: Math.round(Iz * 10) / 10,
    IzTabulated,
    factors: {
      temperature: tempFactor,
      grouping: groupingFactor,
      overall: overallFactor,
    },
    compliance: {
      IbLeIn,
      InLeIz,
      overallCompliant: IbLeIn && InLeIz,
      safetyMargin: Math.round(safetyMargin * 10) / 10,
    },
    equation: `Iz = It × Ca × Cg = ${IzTabulated} × ${tempFactor.toFixed(2)} × ${groupingFactor.toFixed(2)} = ${Iz.toFixed(1)}A`,
    voltageDrop: voltDrop,
    earthFault: {
      calculated: 0.35 + (0.01 * cableLength), // Simplified calculation
      max: earthFault.maxZs,
      compliant: (0.35 + (0.01 * cableLength)) <= earthFault.maxZs
    }
  };
}

// Voltage drop calculation (from voltageDropEngine.ts)
export function calculateVoltageDrop(params: {
  current: number;
  cableLength: number;
  cableSize: number;
  voltage: number;
  phases: string;
}): VoltageDropResult {
  const { current, cableLength, cableSize, voltage, phases } = params;

  // mV/A/m values from BS 7671 Table 4D5 (70°C thermoplastic)
  const mvPerAPerM: Record<number, number> = {
    1.5: 29,
    2.5: 18,
    4: 11,
    6: 7.3,
    10: 4.4,
    16: 2.8,
    25: 1.75,
    35: 1.25,
    50: 0.93,
    70: 0.63,
    95: 0.46,
    120: 0.38,
  };

  const mvPerAPerMValue = mvPerAPerM[cableSize] || 0;
  const voltageDropVolts = (mvPerAPerMValue * current * cableLength) / 1000;
  const voltageDropPercent = (voltageDropVolts / voltage) * 100;

  // BS 7671 Reg 525 - max 3% for lighting, 5% for other
  const maxAllowed = 3; // Assume lighting (worst case)

  return {
    voltageDropVolts: Math.round(voltageDropVolts * 100) / 100,
    voltageDropPercent: Math.round(voltageDropPercent * 100) / 100,
    compliant: voltageDropPercent <= maxAllowed,
    maxAllowed,
  };
}

// Diversity calculation (simplified)
export function calculateDiversity(loads: Array<{ type: string; power: number }>): {
  totalConnected: number;
  afterDiversity: number;
  diversityFactor: number;
} {
  const totalConnected = loads.reduce((sum, load) => sum + load.power, 0);

  // BS 7671 diversity factors (simplified)
  const lightingLoads = loads.filter(l => l.type === 'lighting');
  const socketLoads = loads.filter(l => l.type === 'socket');
  const fixedLoads = loads.filter(l => !['lighting', 'socket'].includes(l.type));

  const lightingDemand = lightingLoads.reduce((sum, l) => sum + l.power, 0) * 0.66;
  const socketDemand = Math.min(socketLoads.reduce((sum, l) => sum + l.power, 0), 100) +
                       (socketLoads.reduce((sum, l) => sum + l.power, 0) - 100) * 0.4;
  const fixedDemand = fixedLoads.reduce((sum, l) => sum + l.power, 0);

  const afterDiversity = lightingDemand + socketDemand + fixedDemand;
  const diversityFactor = totalConnected > 0 ? afterDiversity / totalConnected : 1;

  return {
    totalConnected: Math.round(totalConnected),
    afterDiversity: Math.round(afterDiversity),
    diversityFactor: Math.round(diversityFactor * 100) / 100,
  };
}

// Calculate earth fault loop impedance (simplified)
export function calculateMaxZs(params: {
  deviceRating: number;
  deviceType: string; // 'B', 'C', 'D'
}): { maxZs: number; regulation: string } {
  const { deviceRating, deviceType } = params;

  // BS 7671 Table 41.3 - Max Zs for MCBs at 0.4s disconnection
  const zsTable: Record<string, Record<number, number>> = {
    B: {
      6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84, 32: 1.44,
      40: 1.15, 50: 0.92, 63: 0.73, 80: 0.57, 100: 0.46, 125: 0.37,
    },
    C: {
      6: 3.83, 10: 2.30, 16: 1.44, 20: 1.15, 25: 0.92, 32: 0.72,
      40: 0.57, 50: 0.46, 63: 0.36, 80: 0.29, 100: 0.23, 125: 0.18,
    },
    D: {
      6: 1.92, 10: 1.15, 16: 0.72, 20: 0.57, 25: 0.46, 32: 0.36,
      40: 0.29, 50: 0.23, 63: 0.18, 80: 0.14, 100: 0.11, 125: 0.09,
    },
  };

  const maxZs = zsTable[deviceType]?.[deviceRating] || 0;

  return {
    maxZs: Math.round(maxZs * 100) / 100,
    regulation: 'BS 7671 Reg 411.3.2 / Table 41.3',
  };
}
