// Selectivity / Discrimination Calculation Library — BS 7671 Compliant
// Covers overload, short-circuit, energy let-through (I²t) and back-up protection

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
  // Energy let-through analysis (I²t)
  energyLetThrough: {
    upstreamI2t: number;
    downstreamI2t: number;
    energySelective: boolean;
    ratio: number;
  };
  // Back-up (cascade) protection per BS 7671 Reg 536.4.3
  cascadeProtection: {
    eligible: boolean;
    combinedBreakingCapacity: number;
    cascadeRating: string;
  };
  // Selectivity limit current Is
  selectivityLimitCurrent: number;
  recommendations: string[];
  concerns: string[];
  immediateActions: string[];
  complianceStatus: 'compliant' | 'non-compliant' | 'requires-verification';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

// Device characteristic data
const DEVICE_CHARACTERISTICS = {
  mcb: {
    magneticMultipliers: { B: 5, C: 10, D: 20 } as Record<string, number>,
    thermalConstant: 100, // k for inverse-time: t = k / ((I/In)² - 1)
    magneticTime: 0.01,
    selectivityRatioMin: 1.6,
    typicalI2tMultiplier: 15000, // A²s per amp-rating²
  },
  mccb: {
    magneticMultipliers: { standard: 8, adjustable: 10 } as Record<string, number>,
    thermalConstant: 400,
    magneticTime: 0.02,
    shortTimeDelay: 0.1,
    selectivityRatioMin: 2.0,
    typicalI2tMultiplier: 40000,
  },
  fuse: {
    magneticMultipliers: { gG: 8, aM: 12 } as Record<string, number>,
    prearcingTime: 0.01,
    totalClearingTime: 0.05,
    selectivityRatioMin: 1.6,
    typicalI2tMultiplier: 20000,
  },
  rcbo: {
    magneticMultipliers: { B: 5, C: 10, D: 20 } as Record<string, number>,
    thermalConstant: 100,
    magneticTime: 0.01,
    rcdTime: 0.3,
    selectivityRatioMin: 1.6,
    typicalI2tMultiplier: 15000,
  },
};

type DeviceType = keyof typeof DEVICE_CHARACTERISTICS;

// ---------------------------------------------------------------------------
// Magnetic trip calculation
// ---------------------------------------------------------------------------

function calculateMagneticTrip(
  deviceType: string,
  rating: number,
  curve?: string,
  customSetting?: number
): number {
  if (customSetting) return customSetting;

  const characteristics = DEVICE_CHARACTERISTICS[deviceType as DeviceType];
  if (!characteristics) return rating * 10;

  if ((deviceType === 'mcb' || deviceType === 'rcbo') && curve) {
    return rating * (characteristics.magneticMultipliers[curve] ?? 10);
  }

  if (deviceType === 'mccb') {
    return rating * characteristics.magneticMultipliers.standard;
  }

  if (deviceType === 'fuse') {
    return rating * characteristics.magneticMultipliers.gG;
  }

  return rating * 10;
}

// ---------------------------------------------------------------------------
// Improved time-current modelling
// ---------------------------------------------------------------------------

/**
 * Inverse-time thermal trip: t = k / ((I/In)² - 1)
 * Definite-time magnetic trip: fixed time once I > I_magnetic
 */
function calculateOperatingTime(
  deviceType: string,
  current: number,
  rating: number,
  magneticTrip: number,
  timeDelay: number
): number {
  const characteristics = DEVICE_CHARACTERISTICS[deviceType as DeviceType];
  if (!characteristics) return 0.1;

  // Magnetic region — current above magnetic threshold
  if (current >= magneticTrip) {
    if (deviceType === 'fuse') {
      const fuseChar = characteristics as typeof DEVICE_CHARACTERISTICS.fuse;
      return fuseChar.prearcingTime + timeDelay;
    }
    if (deviceType === 'mccb') {
      const mccbChar = characteristics as typeof DEVICE_CHARACTERISTICS.mccb;
      return mccbChar.magneticTime + timeDelay;
    }
    return (characteristics as typeof DEVICE_CHARACTERISTICS.mcb).magneticTime + timeDelay;
  }

  // Thermal region — inverse-time characteristic
  const ratio = current / rating;
  if (ratio <= 1.0) return Infinity; // Below rating, device won't trip

  if (deviceType === 'fuse') {
    const fuseChar = characteristics as typeof DEVICE_CHARACTERISTICS.fuse;
    return fuseChar.totalClearingTime * Math.pow(magneticTrip / current, 2) + timeDelay;
  }

  // Inverse-time: t = k / ((I/In)² - 1)
  const thermalK = (characteristics as typeof DEVICE_CHARACTERISTICS.mcb).thermalConstant;
  const thermalTime = thermalK / (ratio * ratio - 1);
  return Math.min(thermalTime, 3600) + timeDelay; // Cap at 1 hour
}

// ---------------------------------------------------------------------------
// Energy let-through (I²t) calculation
// ---------------------------------------------------------------------------

function calculateI2t(
  deviceType: string,
  rating: number,
  faultCurrent: number,
  operatingTime: number
): number {
  const characteristics = DEVICE_CHARACTERISTICS[deviceType as DeviceType];
  if (!characteristics) return faultCurrent * faultCurrent * operatingTime;

  // For very fast operation (magnetic), use I²t = Iarc² × t
  if (operatingTime < 0.1) {
    return faultCurrent * faultCurrent * operatingTime;
  }

  // For thermal region, I²t approximation from device characteristics
  const multiplier = characteristics.typicalI2tMultiplier;
  return multiplier * rating * rating * Math.min(operatingTime, 0.1);
}

// ---------------------------------------------------------------------------
// Back-up (cascade) protection per BS 7671 Reg 536.4.3
// ---------------------------------------------------------------------------

function assessCascadeProtection(
  upstreamDevice: string,
  upstreamRating: number,
  upstreamBreakingCapacity: number,
  downstreamDevice: string,
  downstreamRating: number,
  downstreamBreakingCapacity: number,
  faultCurrent: number
): { eligible: boolean; combinedBreakingCapacity: number; cascadeRating: string } {
  // Cascade (back-up) protection: upstream device with higher breaking capacity
  // protects downstream device with lower breaking capacity
  // Only valid when confirmed by manufacturer's coordination tables

  const faultCurrentKA = faultCurrent / 1000;
  const eligible =
    upstreamBreakingCapacity >= faultCurrentKA &&
    downstreamBreakingCapacity < faultCurrentKA &&
    upstreamRating >= downstreamRating;

  const combinedBreakingCapacity = eligible ? upstreamBreakingCapacity : downstreamBreakingCapacity;

  let cascadeRating = 'Not applicable';
  if (eligible) {
    cascadeRating = `${downstreamRating}A ${downstreamDevice.toUpperCase()} backed up by ${upstreamRating}A ${upstreamDevice.toUpperCase()} — verified to ${upstreamBreakingCapacity} kA`;
  }

  return { eligible, combinedBreakingCapacity, cascadeRating };
}

// ---------------------------------------------------------------------------
// Selectivity limit current Is
// ---------------------------------------------------------------------------

/**
 * The selectivity limit current Is is the maximum fault current at which
 * selectivity is maintained. Above this level, both devices may operate
 * simultaneously. Is is approximated as the lower of:
 *   - 80% of upstream magnetic trip setting
 *   - The current at which upstream and downstream time-current curves intersect
 */
function calculateSelectivityLimitCurrent(
  upstreamMagnetic: number,
  downstreamMagnetic: number,
  upstreamRating: number,
  downstreamRating: number,
  upstreamDevice: string,
  downstreamDevice: string,
  upstreamTimeDelay: number
): number {
  // Method 1: 80% of upstream magnetic setting
  const magneticLimit = upstreamMagnetic * 0.8;

  // Method 2: Time-current curve intersection approximation
  // Find the current where upstream time = downstream time
  // Using binary search between downstream magnetic and upstream magnetic
  let low = downstreamMagnetic;
  let high = upstreamMagnetic * 2;
  let intersectionCurrent = magneticLimit;

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const tDown = calculateOperatingTime(
      downstreamDevice,
      mid,
      downstreamRating,
      downstreamMagnetic,
      0
    );
    const tUp = calculateOperatingTime(
      upstreamDevice,
      mid,
      upstreamRating,
      upstreamMagnetic,
      upstreamTimeDelay
    );

    if (tUp <= tDown * 1.1) {
      // Upstream operates too quickly — reduce current
      high = mid;
      intersectionCurrent = mid;
    } else {
      low = mid;
    }
  }

  return Math.min(magneticLimit, intersectionCurrent);
}

// ---------------------------------------------------------------------------
// Overload selectivity check
// ---------------------------------------------------------------------------

function checkOverloadSelectivity(
  upstreamRating: number,
  downstreamRating: number,
  _loadCurrent: number,
  selectivityRatio: number
): boolean {
  const overloadLevel = downstreamRating * 1.45; // 145% for thermal trip
  return selectivityRatio >= 1.6 && upstreamRating > overloadLevel;
}

// ---------------------------------------------------------------------------
// Short-circuit selectivity check
// ---------------------------------------------------------------------------

function checkShortCircuitSelectivity(
  faultCurrent: number,
  selectivityLimit: number,
  upstreamTime: number,
  downstreamTime: number
): boolean {
  const timeDiscrimination = upstreamTime > downstreamTime + 0.1; // 100ms margin
  const currentDiscrimination = faultCurrent < selectivityLimit;
  return timeDiscrimination && currentDiscrimination;
}

// ---------------------------------------------------------------------------
// Analysis generation
// ---------------------------------------------------------------------------

interface AnalysisInputs {
  isSelective: boolean;
  selectivityRatio: number;
  selectivityLimit: number;
  overloadSelectivity: boolean;
  shortCircuitSelectivity: boolean;
  breakingCapacityCheck: boolean;
  faultCurrent: number;
  shortCircuitCurrent: number;
  upstreamTime: number;
  downstreamTime: number;
  energySelective: boolean;
  cascadeEligible: boolean;
}

function generateSelectivityAnalysis(inputs: SelectivityInputs, results: AnalysisInputs) {
  const recommendations: string[] = [];
  const concerns: string[] = [];
  const immediateActions: string[] = [];

  if (!results.isSelective) {
    concerns.push('Selectivity not achieved — risk of upstream device operating before downstream');
    immediateActions.push('Review protection coordination immediately');
  }

  if (results.selectivityRatio < 1.6) {
    concerns.push('Selectivity ratio below minimum 1.6:1 requirement');
    recommendations.push('Increase upstream device rating or reduce downstream rating');
  }

  if (!results.overloadSelectivity) {
    concerns.push('Overload selectivity not achieved');
    recommendations.push('Ensure upstream thermal setting > 1.45 x downstream rating');
  }

  if (!results.shortCircuitSelectivity) {
    concerns.push('Short-circuit selectivity not achieved');
    recommendations.push('Add time delay to upstream device or reduce fault current');
  }

  if (!results.breakingCapacityCheck) {
    concerns.push('Breaking capacity insufficient for fault current');
    immediateActions.push('Replace devices with higher breaking capacity');
  }

  if (!results.energySelective) {
    concerns.push(
      'Energy let-through (I²t) of downstream exceeds upstream — poor energy selectivity'
    );
    recommendations.push('Select devices where downstream I²t < upstream I²t at fault current');
  }

  if (results.cascadeEligible) {
    recommendations.push(
      'Back-up (cascade) protection available per BS 7671 Reg 536.4.3 — verify with manufacturer tables'
    );
  }

  if (inputs.upstreamDevice === inputs.downstreamDevice) {
    recommendations.push('Consider different device types for improved selectivity');
  }

  if (results.faultCurrent > results.selectivityLimit) {
    recommendations.push('Install current-limiting devices or reduce fault current');
  }

  recommendations.push("Verify selectivity using manufacturer's coordination tables");
  recommendations.push('Test protection coordination during commissioning');
  recommendations.push('Document selectivity study for compliance records');

  let complianceStatus: 'compliant' | 'non-compliant' | 'requires-verification' = 'compliant';
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

  if (!results.isSelective) {
    complianceStatus = 'non-compliant';
    riskLevel = 'critical';
  } else if (concerns.length > 0) {
    complianceStatus = 'requires-verification';
    riskLevel = 'medium';
  }

  return { recommendations, concerns, immediateActions, complianceStatus, riskLevel };
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

export function calculateSelectivity(inputs: SelectivityInputs): SelectivityResult {
  const {
    upstreamDevice,
    upstreamRating,
    upstreamCurve,
    upstreamMagneticSetting,
    upstreamTimeDelay = 0,
    upstreamBreakingCapacity = 10,
    downstreamDevice,
    downstreamRating,
    downstreamCurve,
    downstreamMagneticSetting,
    downstreamBreakingCapacity = 6,
    faultCurrent,
    shortCircuitCurrent = faultCurrent,
    loadCurrent = upstreamRating * 0.8,
  } = inputs;

  const selectivityRatio = upstreamRating / downstreamRating;

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

  // Selectivity limit current Is
  const selectivityLimitCurrent = calculateSelectivityLimitCurrent(
    upstreamMagnetic,
    downstreamMagnetic,
    upstreamRating,
    downstreamRating,
    upstreamDevice,
    downstreamDevice,
    upstreamTimeDelay
  );

  const selectivityLimit = Math.min(upstreamMagnetic * 0.8, downstreamMagnetic * 2.5);

  // Overload and short-circuit selectivity
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

  // Breaking capacity check
  const breakingCapacityCheck =
    upstreamBreakingCapacity * 1000 >= shortCircuitCurrent &&
    downstreamBreakingCapacity * 1000 >= shortCircuitCurrent;

  // Energy let-through (I²t) comparison
  const upstreamI2t = calculateI2t(upstreamDevice, upstreamRating, faultCurrent, upstreamTime);
  const downstreamI2t = calculateI2t(
    downstreamDevice,
    downstreamRating,
    faultCurrent,
    downstreamTime
  );
  const energySelective = downstreamI2t < upstreamI2t;
  const energyRatio = upstreamI2t > 0 ? downstreamI2t / upstreamI2t : 0;

  // Back-up (cascade) protection assessment
  const cascadeProtection = assessCascadeProtection(
    upstreamDevice,
    upstreamRating,
    upstreamBreakingCapacity,
    downstreamDevice,
    downstreamRating,
    downstreamBreakingCapacity,
    faultCurrent
  );

  // Overall selectivity
  const isSelective = overloadSelectivity && shortCircuitSelectivity && breakingCapacityCheck;

  // Analysis
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
      downstreamTime,
      energySelective,
      cascadeEligible: cascadeProtection.eligible,
    });

  return {
    isSelective,
    selectivityRatio,
    selectivityLimit,
    overloadSelectivity,
    shortCircuitSelectivity,
    breakingCapacityCheck,
    operatingTimes: { upstream: upstreamTime, downstream: downstreamTime },
    magneticTrips: { upstream: upstreamMagnetic, downstream: downstreamMagnetic },
    energyLetThrough: {
      upstreamI2t,
      downstreamI2t,
      energySelective,
      ratio: Math.round(energyRatio * 100) / 100,
    },
    cascadeProtection,
    selectivityLimitCurrent: Math.round(selectivityLimitCurrent),
    recommendations,
    concerns,
    immediateActions,
    complianceStatus,
    riskLevel,
  };
}
