// BS 7671:2018+A3:2024 - Prospective Short-Circuit Current (PSCC) Calculations
// Regulations 434.5.2, 411.4.9

export interface PSCCCalculation {
  incomingPFC: number; // kA at origin
  cableImpedance: number; // mΩ
  calculatedPSCC: number; // kA at point
  protectionRating: number; // kA (device breaking capacity)
  compliant: boolean;
  regulation: string;
  marginOfSafety: number; // percentage
}

// BS 7671 Table 9A - Conductor resistance (mΩ/m at 20°C) for copper
const CONDUCTOR_RESISTANCE_COPPER = {
  1.0: 18.1,
  1.5: 12.1,
  2.5: 7.41,
  4.0: 4.61,
  6.0: 3.08,
  10: 1.83,
  16: 1.15,
  25: 0.727,
  35: 0.524,
  50: 0.387,
  70: 0.268,
  95: 0.193,
  120: 0.153,
  150: 0.124,
  185: 0.0991,
  240: 0.0754,
  300: 0.0601,
  400: 0.0470
};

// BS 7671 Table 9B - Reactance values (mΩ/m) for cables
const CABLE_REACTANCE = {
  singleCore: {
    touching: 0.08,
    spaced: 0.145
  },
  multiCore: {
    small: 0.08,  // up to 16mm²
    medium: 0.085, // 25-95mm²
    large: 0.09    // 120mm² and above
  }
};

export function calculatePSCC(params: {
  incomingPFC: number; // kA
  voltage: number;
  cableSize: number;
  cableLength: number; // meters
  cableType: 'multicore' | 'singleCore';
  cableCores: number;
  Ze: number; // External earth fault loop impedance (Ω)
  protectionDeviceRating?: number; // kA breaking capacity
}): PSCCCalculation {
  const { incomingPFC, voltage, cableSize, cableLength, cableType, Ze, protectionDeviceRating = 6 } = params;

  // Get conductor resistance
  const resistance = CONDUCTOR_RESISTANCE_COPPER[cableSize as keyof typeof CONDUCTOR_RESISTANCE_COPPER] || 0;
  
  // Get reactance based on cable type
  let reactance = 0;
  if (cableType === 'multicore') {
    if (cableSize <= 16) reactance = CABLE_REACTANCE.multiCore.small;
    else if (cableSize <= 95) reactance = CABLE_REACTANCE.multiCore.medium;
    else reactance = CABLE_REACTANCE.multiCore.large;
  } else {
    reactance = CABLE_REACTANCE.singleCore.touching;
  }

  // Calculate cable impedance (mΩ/m × length in meters)
  const resistanceTotal = resistance * cableLength; // mΩ
  const reactanceTotal = reactance * cableLength; // mΩ
  const cableImpedance = Math.sqrt(resistanceTotal ** 2 + reactanceTotal ** 2); // mΩ

  // Convert Ze to mΩ
  const ZeMilliohms = Ze * 1000;

  // Total impedance at the point
  const totalImpedance = ZeMilliohms + cableImpedance; // mΩ

  // Calculate PSCC at the point
  // I = U / Z (where U is voltage, Z is impedance)
  const calculatedPSCC = (voltage / (totalImpedance / 1000)) / 1000; // kA

  // Check compliance - PSCC must be less than device breaking capacity
  const compliant = calculatedPSCC < protectionDeviceRating;
  const marginOfSafety = ((protectionDeviceRating - calculatedPSCC) / protectionDeviceRating) * 100;

  return {
    incomingPFC,
    cableImpedance: cableImpedance / 1000, // Convert to Ω
    calculatedPSCC: Number(calculatedPSCC.toFixed(2)),
    protectionRating: protectionDeviceRating,
    compliant,
    regulation: 'BS 7671 Reg 434.5.2',
    marginOfSafety: Number(marginOfSafety.toFixed(1))
  };
}

// Calculate maximum cable length for a given PSCC limit
export function calculateMaxCableLength(params: {
  incomingPFC: number;
  voltage: number;
  cableSize: number;
  maxPSCC: number; // kA - device breaking capacity
  cableType: 'multicore' | 'singleCore';
  Ze: number;
}): number {
  const { incomingPFC, voltage, cableSize, maxPSCC, cableType, Ze } = params;

  const resistance = CONDUCTOR_RESISTANCE_COPPER[cableSize as keyof typeof CONDUCTOR_RESISTANCE_COPPER] || 0;
  
  let reactance = 0;
  if (cableType === 'multicore') {
    if (cableSize <= 16) reactance = CABLE_REACTANCE.multiCore.small;
    else if (cableSize <= 95) reactance = CABLE_REACTANCE.multiCore.medium;
    else reactance = CABLE_REACTANCE.multiCore.large;
  } else {
    reactance = CABLE_REACTANCE.singleCore.touching;
  }

  // Maximum impedance allowed
  const maxImpedance = (voltage / (maxPSCC * 1000)) * 1000; // mΩ
  
  // Cable impedance available
  const ZeMilliohms = Ze * 1000;
  const availableImpedance = maxImpedance - ZeMilliohms;

  // Calculate maximum length
  const impedancePerMeter = Math.sqrt(resistance ** 2 + reactance ** 2);
  const maxLength = availableImpedance / impedancePerMeter;

  return Math.floor(maxLength);
}
