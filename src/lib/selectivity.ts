// Selectivity calculation types and utilities
export interface SelectivityInputs {
  upstreamDevice: string;
  upstreamRating: number;
  upstreamCurve?: string;
  upstreamMagneticSetting?: number;
  upstreamTimeDelay?: number;
  upstreamBreakingCapacity?: number;
  downstreamDevice: string;
  downstreamRating: number;
  downstreamCurve?: string;
  downstreamMagneticSetting?: number;
  downstreamBreakingCapacity?: number;
  faultCurrent: number;
  shortCircuitCurrent?: number;
  loadCurrent?: number;
  cableLength?: number;
  ambientTemperature?: number;
  installationMethod?: string;
}

export interface SelectivityResult {
  isSelective: boolean;
  selectivityRatio: number;
  selectivityLimit: number;
  overloadSelectivity: boolean;
  shortCircuitSelectivity: boolean;
  breakingCapacityCheck: boolean;
  operatingTimes: {
    upstream: number;
    downstream: number;
  };
  magneticTrips: {
    upstream: number;
    downstream: number;
  };
  recommendations: string[];
  concerns: string[];
  immediateActions: string[];
  complianceStatus: 'compliant' | 'non-compliant' | 'requires-verification';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

// Device characteristic data
const DEVICE_CHARACTERISTICS = {
  mcb: {
    magneticMultipliers: { B: 5, C: 10, D: 20 },
    timeCharacteristics: { thermal: 0.1, magnetic: 0.01 },
    selectivityRatioMin: 1.6
  },
  mccb: {
    magneticMultipliers: { standard: 8, adjustable: 10 },
    timeCharacteristics: { thermal: 0.4, magnetic: 0.02, shortTime: 0.1 },
    selectivityRatioMin: 2.0
  },
  fuse: {
    magneticMultipliers: { gG: 8, aM: 12 },
    timeCharacteristics: { prearcing: 0.01, total: 0.05 },
    selectivityRatioMin: 1.6
  },
  rcbo: {
    magneticMultipliers: { B: 5, C: 10, D: 20 },
    timeCharacteristics: { thermal: 0.1, magnetic: 0.01, rcd: 0.3 },
    selectivityRatioMin: 1.6
  }
};

export function calculateSelectivity(inputs: SelectivityInputs): SelectivityResult {
  const {
    upstreamDevice,
    upstreamRating,
    upstreamCurve,
    upstreamMagneticSetting,
    upstreamTimeDelay = 0,
    upstreamBreakingCapacity = 10, // kA converted to A for comparison
    downstreamDevice,
    downstreamRating,
    downstreamCurve,
    downstreamMagneticSetting,
    downstreamBreakingCapacity = 6, // kA converted to A for comparison
    faultCurrent,
    shortCircuitCurrent = faultCurrent,
    loadCurrent = upstreamRating * 0.8
  } = inputs;

  // Calculate selectivity ratio
  const selectivityRatio = upstreamRating / downstreamRating;

  // Calculate magnetic trip levels
  const downstreamMagnetic = calculateMagneticTrip(
    downstreamDevice,
    downstreamRating,
    downstreamCurve,
    downstreamMagneticSetting
  );

  const upstreamMagnetic = calculateMagneticTrip(
    upstreamDevice,
    upstreamRating,
    upstreamCurve,
    upstreamMagneticSetting
  );

  // Calculate operating times
  const downstreamTime = calculateOperatingTime(
    downstreamDevice,
    faultCurrent,
    downstreamRating,
    downstreamMagnetic,
    0
  );

  const upstreamTime = calculateOperatingTime(
    upstreamDevice,
    faultCurrent,
    upstreamRating,
    upstreamMagnetic,
    upstreamTimeDelay
  );

  // Selectivity limit calculation
  const selectivityLimit = Math.min(
    upstreamMagnetic * 0.8, // 80% of upstream magnetic setting
    downstreamMagnetic * 2.5 // 2.5x downstream magnetic
  );

  // Check different types of selectivity
  const overloadSelectivity = checkOverloadSelectivity(
    upstreamRating,
    downstreamRating,
    loadCurrent,
    selectivityRatio
  );

  const shortCircuitSelectivity = checkShortCircuitSelectivity(
    faultCurrent,
    selectivityLimit,
    upstreamTime,
    downstreamTime
  );

  // Breaking capacity check (convert kA to A for comparison)
  const breakingCapacityCheck = 
    (upstreamBreakingCapacity * 1000) >= shortCircuitCurrent && 
    (downstreamBreakingCapacity * 1000) >= shortCircuitCurrent;

  // Overall selectivity
  const isSelective = overloadSelectivity && shortCircuitSelectivity && breakingCapacityCheck;

  // Generate analysis
  const { recommendations, concerns, immediateActions, complianceStatus, riskLevel } = 
    generateSelectivityAnalysis(inputs, {
      isSelective,
      selectivityRatio,
      selectivityLimit,
      overloadSelectivity,
      shortCircuitSelectivity,
      breakingCapacityCheck,
      faultCurrent,
      shortCircuitCurrent,
      upstreamTime,
      downstreamTime
    });

  return {
    isSelective,
    selectivityRatio,
    selectivityLimit,
    overloadSelectivity,
    shortCircuitSelectivity,
    breakingCapacityCheck,
    operatingTimes: {
      upstream: upstreamTime,
      downstream: downstreamTime
    },
    magneticTrips: {
      upstream: upstreamMagnetic,
      downstream: downstreamMagnetic
    },
    recommendations,
    concerns,
    immediateActions,
    complianceStatus,
    riskLevel
  };
}

function calculateMagneticTrip(
  deviceType: string,
  rating: number,
  curve?: string,
  customSetting?: number
): number {
  if (customSetting) return customSetting;

  const characteristics = DEVICE_CHARACTERISTICS[deviceType as keyof typeof DEVICE_CHARACTERISTICS];
  if (!characteristics) return rating * 10;

  if (deviceType === 'mcb' && curve) {
    const mcbChar = characteristics as typeof DEVICE_CHARACTERISTICS.mcb;
    return rating * (mcbChar.magneticMultipliers as any)[curve];
  }

  if (deviceType === 'mccb') {
    const mccbChar = characteristics as typeof DEVICE_CHARACTERISTICS.mccb;
    return rating * mccbChar.magneticMultipliers.standard;
  }

  if (deviceType === 'fuse') {
    const fuseChar = characteristics as typeof DEVICE_CHARACTERISTICS.fuse;
    return rating * fuseChar.magneticMultipliers.gG;
  }

  return rating * 10; // Default
}

function calculateOperatingTime(
  deviceType: string,
  current: number,
  rating: number,
  magneticTrip: number,
  timeDelay: number
): number {
  const characteristics = DEVICE_CHARACTERISTICS[deviceType as keyof typeof DEVICE_CHARACTERISTICS];
  if (!characteristics) return 0.1;

  let baseTime = 0.1; // Default thermal time

  if (deviceType === 'fuse') {
    const fuseChar = characteristics as typeof DEVICE_CHARACTERISTICS.fuse;
    baseTime = current > magneticTrip ? fuseChar.timeCharacteristics.prearcing : fuseChar.timeCharacteristics.total;
  } else {
    const normalChar = characteristics as typeof DEVICE_CHARACTERISTICS.mcb;
    baseTime = current > magneticTrip 
      ? normalChar.timeCharacteristics.magnetic 
      : normalChar.timeCharacteristics.thermal;
  }

  return baseTime + timeDelay;
}

function checkOverloadSelectivity(
  upstreamRating: number,
  downstreamRating: number,
  loadCurrent: number,
  selectivityRatio: number
): boolean {
  // Check if upstream device won't trip during downstream overload
  const overloadLevel = downstreamRating * 1.45; // 145% for thermal trip
  return selectivityRatio >= 1.6 && upstreamRating > overloadLevel;
}

function checkShortCircuitSelectivity(
  faultCurrent: number,
  selectivityLimit: number,
  upstreamTime: number,
  downstreamTime: number
): boolean {
  const timeDiscrimination = upstreamTime > (downstreamTime + 0.1); // 100ms margin
  const currentDiscrimination = faultCurrent < selectivityLimit;
  return timeDiscrimination && currentDiscrimination;
}

function generateSelectivityAnalysis(inputs: SelectivityInputs, results: any) {
  const recommendations: string[] = [];
  const concerns: string[] = [];
  const immediateActions: string[] = [];

  // Basic selectivity checks
  if (!results.isSelective) {
    concerns.push("Selectivity not achieved - risk of upstream device operating before downstream");
    immediateActions.push("Review protection coordination immediately");
  }

  if (results.selectivityRatio < 1.6) {
    concerns.push("Selectivity ratio below minimum 1.6:1 requirement");
    recommendations.push("Increase upstream device rating or reduce downstream rating");
  }

  if (!results.overloadSelectivity) {
    concerns.push("Overload selectivity not achieved");
    recommendations.push("Ensure upstream thermal setting > 1.45 × downstream rating");
  }

  if (!results.shortCircuitSelectivity) {
    concerns.push("Short-circuit selectivity not achieved");
    recommendations.push("Add time delay to upstream device or reduce fault current");
  }

  if (!results.breakingCapacityCheck) {
    concerns.push("Breaking capacity insufficient for fault current");
    immediateActions.push("Replace devices with higher breaking capacity");
  }

  // Device-specific recommendations
  if (inputs.upstreamDevice === inputs.downstreamDevice) {
    recommendations.push("Consider different device types for better selectivity");
  }

  if (results.faultCurrent > results.selectivityLimit) {
    recommendations.push("Install current-limiting devices or reduce fault current");
  }

  // Add standard recommendations
  recommendations.push("Verify selectivity using manufacturer's coordination tables");
  recommendations.push("Test protection coordination during commissioning");
  recommendations.push("Document selectivity study for compliance records");

  // Determine compliance status and risk level
  let complianceStatus: 'compliant' | 'non-compliant' | 'requires-verification' = 'compliant';
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

  if (!results.isSelective) {
    complianceStatus = 'non-compliant';
    riskLevel = 'critical';
  } else if (concerns.length > 0) {
    complianceStatus = 'requires-verification';
    riskLevel = 'medium';
  }

  return {
    recommendations,
    concerns,
    immediateActions,
    complianceStatus,
    riskLevel
  };
}