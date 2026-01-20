/**
 * Device Mapping Constants for Smart Cascading Protective Device Selectors
 *
 * These mappings ensure intelligent filtering between:
 * 1. BS EN Standard -> Device Types
 * 2. Device Type -> Available Ratings (from BS 7671 Tables 41.2, 41.3, 41.4)
 * 3. Device Type -> Available kA Ratings
 */

// ============================================================================
// BS EN Standard -> Device Type Mapping
// ============================================================================

/**
 * Maps BS EN standards to their allowed protective device types
 * Values must match the 'value' field in PROTECTIVE_DEVICE_TYPES
 */
export const STANDARD_TO_DEVICE_TYPES: Record<string, string[]> = {
  // MCBs - BS EN 60898
  'BS EN 60898': ['mcb-type-a', 'mcb-type-b', 'mcb-type-c', 'mcb-type-d'],

  // RCBOs - BS EN 61009
  'BS EN 61009': ['rcbo-type-ac', 'rcbo-type-a', 'rcbo-type-f', 'rcbo-type-b'],

  // MCCBs - BS EN 60947-2
  'BS EN 60947-2': ['mccb'],

  // Fuses - various standards
  'BS 88-2': ['fuse-bs88'],      // HRC fuses (gG industrial)
  'BS 88-3': ['fuse-bs88-3'],    // HRC fuses (System C domestic)
  'BS 3036': ['fuse-bs3036'],    // Semi-enclosed (rewireable) fuses
  'BS 1361': ['fuse-bs1361'],    // Cartridge fuses for AC circuits
  'BS 1362': ['fuse-bs1362'],    // Plug-top cartridge fuses

  // RCDs without overcurrent protection - no device types
  'BS EN 61008': [],  // RCDs without overcurrent protection
  'BS EN 62423': [],  // Type F and Type B RCDs
};

// ============================================================================
// Device Type -> Available Ratings (from BS 7671 Tables)
// ============================================================================

/**
 * Maps device categories to their available ratings in Amps
 * Based on BS 7671 Tables 41.2, 41.3, 41.4
 */
export const DEVICE_TYPE_RATINGS: Record<string, number[]> = {
  // MCBs - Table 41.3 standard sizes
  'mcb': [3, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],

  // RCBOs - Similar to MCBs, Table 41.3
  'rcbo': [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],

  // MCCBs - Manufacturer specific, extended range
  'mccb': [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800],

  // Fuse BS 88-2 (HRC industrial) - Tables 41.2/41.4
  'fuse-bs88': [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200],

  // Fuse BS 88-3 (System C domestic) - Tables 41.2/41.4
  'fuse-bs88-3': [5, 16, 20, 32, 45, 63, 80, 100],

  // Fuse BS 3036 (Rewireable) - Tables 41.2/41.4
  'fuse-bs3036': [5, 15, 20, 30, 45, 60, 100],

  // Fuse BS 1361 (Cartridge) - Similar to BS 88-3
  'fuse-bs1361': [5, 15, 20, 30, 45, 60, 80, 100],

  // Fuse BS 1362 (Plug-top) - Table 41.2
  'fuse-bs1362': [3, 13],
};

// ============================================================================
// Device Type -> Available kA Ratings
// ============================================================================

/**
 * Maps device categories to their available breaking capacities in kA
 */
export const DEVICE_TYPE_KA_RATINGS: Record<string, number[]> = {
  // MCBs - Domestic typically 6kA
  'mcb': [3, 6, 10, 15],

  // RCBOs - Similar to MCB
  'rcbo': [6, 10, 15, 25],

  // MCCBs - Industrial/commercial, high breaking capacity
  'mccb': [10, 16, 25, 36, 50, 65, 70, 100],

  // Fuse BS 88 - HRC fuses, very high breaking capacity
  'fuse-bs88': [80],
  'fuse-bs88-3': [80],

  // Fuse BS 3036 - Limited breaking capacity (check Ik)
  'fuse-bs3036': [1, 1.5, 2, 3, 4],

  // Fuse BS 1361 - Consumer unit fuses
  'fuse-bs1361': [16.5],

  // Fuse BS 1362 - Plug-top fuses
  'fuse-bs1362': [6],
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Gets the device category from a specific device type value
 * e.g., 'mcb-type-b' -> 'mcb', 'rcbo-type-a' -> 'rcbo'
 */
export function getDeviceCategory(deviceType: string): string {
  if (deviceType.startsWith('mcb-')) return 'mcb';
  if (deviceType.startsWith('rcbo-')) return 'rcbo';
  if (deviceType === 'mccb') return 'mccb';
  if (deviceType === 'fuse-bs88') return 'fuse-bs88';
  if (deviceType === 'fuse-bs88-3') return 'fuse-bs88-3';
  if (deviceType === 'fuse-bs3036') return 'fuse-bs3036';
  if (deviceType === 'fuse-bs1361') return 'fuse-bs1361';
  if (deviceType === 'fuse-bs1362') return 'fuse-bs1362';
  return 'mcb'; // Default fallback
}

/**
 * Checks if a device type is valid for a given BS EN standard
 */
export function isDeviceTypeValidForStandard(standard: string, deviceType: string): boolean {
  const allowedTypes = STANDARD_TO_DEVICE_TYPES[standard];
  if (!allowedTypes || allowedTypes.length === 0) return true; // No filtering if no mapping
  return allowedTypes.includes(deviceType);
}

/**
 * Checks if a rating is valid for a given device type
 */
export function isRatingValidForDevice(deviceType: string, rating: string | number): boolean {
  const deviceKey = getDeviceCategory(deviceType);
  const allowedRatings = DEVICE_TYPE_RATINGS[deviceKey];
  if (!allowedRatings) return true; // No filtering if no mapping
  const ratingNum = typeof rating === 'string' ? parseInt(rating, 10) : rating;
  return allowedRatings.includes(ratingNum);
}

/**
 * Checks if a kA rating is valid for a given device type
 */
export function isKaRatingValidForDevice(deviceType: string, kaRating: string | number): boolean {
  const deviceKey = getDeviceCategory(deviceType);
  const allowedKa = DEVICE_TYPE_KA_RATINGS[deviceKey];
  if (!allowedKa) return true; // No filtering if no mapping
  const kaNum = typeof kaRating === 'string' ? parseFloat(kaRating) : kaRating;
  return allowedKa.includes(kaNum);
}
