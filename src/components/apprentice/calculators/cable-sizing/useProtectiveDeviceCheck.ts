import { useMemo } from 'react';

export type DeviceType = 'mcb-b' | 'mcb-c' | 'mcb-d' | 'rcbo' | 'fuse-gg' | 'fuse-rewireable' | 'mccb';

export interface DeviceTypeOption {
  value: DeviceType;
  label: string;
  standard: string;
  i2Multiplier: number;
  maxRating: number;
}

export interface ProtectiveDeviceCheck {
  deviceType: DeviceType;
  rating: number;
  checks: {
    ibLessEqualIn: { passed: boolean; ib: number; in_: number };
    inLessEqualIz: { passed: boolean; in_: number; iz: number };
    i2LessEqual145Iz: { passed: boolean; i2: number; limit: number };
  };
  allPassed: boolean;
  suggestions: string[];
}

// Device type configurations with verified I2 multipliers per BS standards
export const deviceTypeOptions: DeviceTypeOption[] = [
  { value: 'mcb-b', label: 'MCB Type B', standard: 'BS EN 60898', i2Multiplier: 1.45, maxRating: 125 },
  { value: 'mcb-c', label: 'MCB Type C', standard: 'BS EN 60898', i2Multiplier: 1.45, maxRating: 125 },
  { value: 'mcb-d', label: 'MCB Type D', standard: 'BS EN 60898', i2Multiplier: 1.45, maxRating: 125 },
  { value: 'rcbo', label: 'RCBO', standard: 'BS EN 61009-1', i2Multiplier: 1.45, maxRating: 125 },
  { value: 'fuse-gg', label: 'BS 88 Fuse (gG)', standard: 'BS 88-2/3', i2Multiplier: 1.6, maxRating: 1250 },
  { value: 'fuse-rewireable', label: 'BS 3036 Rewireable', standard: 'BS 3036', i2Multiplier: 2.0, maxRating: 100 },
  { value: 'mccb', label: 'MCCB', standard: 'BS EN 60947-2', i2Multiplier: 1.3, maxRating: 1600 },
];

// Device-specific standard ratings per relevant BS standards
export const ratingsByDevice: Record<DeviceType, number[]> = {
  // MCBs max 125A per BS EN 60898
  'mcb-b': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  'mcb-c': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  'mcb-d': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  
  // RCBOs max 125A per BS EN 61009
  'rcbo': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  
  // BS 88 Fuses up to 1250A per BS 88-2/3
  'fuse-gg': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250],
  
  // BS 3036 Rewireable fuses (legacy) per BS 3036
  'fuse-rewireable': [5, 15, 20, 30, 45, 60, 100],
  
  // MCCBs up to 1600A per BS EN 60947-2
  'mccb': [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600]
};

// Get I2 multiplier for a device type
export const getI2Multiplier = (deviceType: DeviceType): number => {
  const device = deviceTypeOptions.find(d => d.value === deviceType);
  return device?.i2Multiplier ?? 1.45;
};

// Get device info
export const getDeviceInfo = (deviceType: DeviceType): DeviceTypeOption | undefined => {
  return deviceTypeOptions.find(d => d.value === deviceType);
};

// Filter ratings to sensible options based on design current
export const getFilteredRatings = (deviceType: DeviceType, designCurrent: number): number[] => {
  const allRatings = ratingsByDevice[deviceType] || [];
  // Show ratings from the one just below Ib (or minimum) up to a reasonable range above
  const minRating = allRatings.find(r => r >= designCurrent) || allRatings[0];
  const minIndex = Math.max(0, allRatings.indexOf(minRating) - 2); // Show 2 below the minimum viable
  return allRatings.slice(minIndex);
};

// Main validation function
export const validateProtectiveDevice = (
  designCurrent: number,
  effectiveCapacity: number, // Iz - the derated cable capacity
  deviceType: DeviceType,
  rating: number,
  nextCableSizeUp?: { size: number; capacity: number }
): ProtectiveDeviceCheck => {
  const i2Multiplier = getI2Multiplier(deviceType);
  const i2 = rating * i2Multiplier;
  const limit145Iz = 1.45 * effectiveCapacity;

  // BS 7671 Regulation 433.1 checks
  const check1 = designCurrent <= rating; // Ib ≤ In
  const check2 = rating <= effectiveCapacity; // In ≤ Iz
  const check3 = i2 <= limit145Iz; // I2 ≤ 1.45 × Iz

  const allPassed = check1 && check2 && check3;

  // Generate suggestions if any check fails
  const suggestions: string[] = [];

  if (!check1) {
    // Find next rating up that satisfies Ib ≤ In
    const ratings = ratingsByDevice[deviceType];
    const nextRating = ratings.find(r => r >= designCurrent);
    if (nextRating) {
      suggestions.push(`Increase device rating to at least ${nextRating}A (Ib = ${designCurrent}A)`);
    } else {
      suggestions.push(`Design current ${designCurrent}A exceeds maximum rating for this device type`);
    }
  }

  if (!check2) {
    // Find rating that satisfies In ≤ Iz
    const ratings = ratingsByDevice[deviceType];
    const validRatings = ratings.filter(r => r <= effectiveCapacity && r >= designCurrent);
    
    if (validRatings.length > 0) {
      const maxValidRating = Math.max(...validRatings);
      suggestions.push(`Reduce device rating to ${maxValidRating}A or less (Iz = ${effectiveCapacity}A)`);
    } else if (nextCableSizeUp) {
      suggestions.push(`Upgrade cable to ${nextCableSizeUp.size}mm² (Iz = ${nextCableSizeUp.capacity}A) to use ${rating}A device`);
    } else {
      suggestions.push(`Cable capacity ${effectiveCapacity}A is too low for ${rating}A device — upgrade cable size`);
    }
  }

  if (!check3 && check2) {
    // I2 check failed but In ≤ Iz passed — this shouldn't normally happen with proper devices
    // but could occur with BS 3036 rewireable fuses (I2 = 2.0 × In)
    const deviceInfo = getDeviceInfo(deviceType);
    if (deviceType === 'fuse-rewireable') {
      suggestions.push(`BS 3036 fuses require In ≤ 0.725 × Iz per Reg 433.1.202`);
      const maxRating = Math.floor(effectiveCapacity * 0.725);
      const validRating = ratingsByDevice['fuse-rewireable'].filter(r => r <= maxRating && r >= designCurrent).pop();
      if (validRating) {
        suggestions.push(`Maximum rating for this cable with BS 3036: ${validRating}A`);
      } else {
        suggestions.push(`Consider using MCB/RCBO instead of rewireable fuse`);
      }
    } else {
      suggestions.push(`I₂ (${i2.toFixed(1)}A) exceeds 1.45 × Iz (${limit145Iz.toFixed(1)}A) — reduce device rating or upgrade cable`);
    }
  }

  return {
    deviceType,
    rating,
    checks: {
      ibLessEqualIn: { passed: check1, ib: designCurrent, in_: rating },
      inLessEqualIz: { passed: check2, in_: rating, iz: effectiveCapacity },
      i2LessEqual145Iz: { passed: check3, i2: Math.round(i2 * 10) / 10, limit: Math.round(limit145Iz * 10) / 10 },
    },
    allPassed,
    suggestions,
  };
};

// Hook for protective device validation
export const useProtectiveDeviceCheck = (
  designCurrent: number,
  effectiveCapacity: number,
  deviceType: DeviceType,
  rating: number,
  nextCableSizeUp?: { size: number; capacity: number }
): ProtectiveDeviceCheck | null => {
  return useMemo(() => {
    if (!designCurrent || !effectiveCapacity || !rating) {
      return null;
    }
    return validateProtectiveDevice(designCurrent, effectiveCapacity, deviceType, rating, nextCableSizeUp);
  }, [designCurrent, effectiveCapacity, deviceType, rating, nextCableSizeUp]);
};
