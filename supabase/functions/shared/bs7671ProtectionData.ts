/**
 * BS 7671:2018+A3:2024 Chapter 41
 * Protection Against Electric Shock
 * Maximum Earth Fault Loop Impedance (Zs) Values
 */

export interface MaxZsData {
  deviceType: 'B' | 'C' | 'D' | 'BS88' | 'BS1361' | 'BS3036';
  deviceRating: number; // Amperes
  maxZs: number; // Ohms
  disconnectionTime: 0.1 | 0.4 | 5; // seconds
  voltage: number; // Uo (nominal voltage to Earth)
  regulation: string;
}

/**
 * Table 41.3 - Maximum Zs for MCBs (Circuit-Breakers)
 * For 0.4s disconnection time at 230V (Uo)
 * Using Cmin = 0.95 per BS 7671:2018+A2:2022
 * 
 * BS EN 60898 / BS EN 61009 MCBs and RCBOs
 * Final circuits ≤32A
 */
export const MAX_ZS_MCB_TYPE_B_04S: MaxZsData[] = [
  { deviceType: 'B', deviceRating: 6, maxZs: 7.28, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 10, maxZs: 4.37, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 16, maxZs: 2.73, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 20, maxZs: 2.19, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 25, maxZs: 1.75, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 32, maxZs: 1.37, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 40, maxZs: 1.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 50, maxZs: 0.87, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 63, maxZs: 0.69, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 80, maxZs: 0.55, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 100, maxZs: 0.44, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 125, maxZs: 0.35, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
];

export const MAX_ZS_MCB_TYPE_C_04S: MaxZsData[] = [
  { deviceType: 'C', deviceRating: 6, maxZs: 3.64, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 10, maxZs: 2.19, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 16, maxZs: 1.37, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 20, maxZs: 1.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 25, maxZs: 0.87, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 32, maxZs: 0.68, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 40, maxZs: 0.55, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 50, maxZs: 0.44, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 63, maxZs: 0.35, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 80, maxZs: 0.27, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 100, maxZs: 0.22, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 125, maxZs: 0.17, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
];

export const MAX_ZS_MCB_TYPE_D_04S: MaxZsData[] = [
  { deviceType: 'D', deviceRating: 6, maxZs: 1.82, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 10, maxZs: 1.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 16, maxZs: 0.68, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 20, maxZs: 0.55, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 25, maxZs: 0.44, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 32, maxZs: 0.34, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 40, maxZs: 0.27, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 50, maxZs: 0.22, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 63, maxZs: 0.17, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 80, maxZs: 0.14, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 100, maxZs: 0.11, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 125, maxZs: 0.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
];

/**
 * Table 41.3 - Maximum Zs for Type D MCBs (5s disconnection time at 230V)
 * Using Cmin = 0.95 per BS 7671:2018+A2:2022
 * 
 * IMPORTANT: BS 7671 Table 41.3 specifies 5s values ONLY for Type D MCBs
 * Types B and C do NOT have 5s disconnection times in the standard
 * 
 * For motors, conveyors, fixed equipment - per Regulation 411.3.2.3
 */
export const MAX_ZS_MCB_TYPE_D_5S: MaxZsData[] = [
  { deviceType: 'D', deviceRating: 6, maxZs: 3.64, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 10, maxZs: 2.19, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 16, maxZs: 1.37, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 20, maxZs: 1.09, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 25, maxZs: 0.87, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 32, maxZs: 0.68, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 40, maxZs: 0.55, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 50, maxZs: 0.44, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 63, maxZs: 0.35, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 80, maxZs: 0.27, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 100, maxZs: 0.22, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
  { deviceType: 'D', deviceRating: 125, maxZs: 0.17, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.6' },
];

/**
 * Get maximum Zs value for a protective device (legacy function for backwards compatibility)
 * 
 * @param deviceType - Type of protective device (MCB curves only)
 * @param deviceRating - Current rating in Amperes
 * @param disconnectionTime - Required disconnection time (default 0.4s for final circuits)
 * @returns Maximum Zs in ohms
 * @deprecated Use getMaxZsForDevice() instead for industrial device support
 */
export function getMaxZs(
  deviceType: 'B' | 'C' | 'D',
  deviceRating: number,
  disconnectionTime: 0.4 | 5 = 0.4
): { maxZs: number; regulation: string } | null {
  return getMaxZsForDevice(deviceType, deviceRating, disconnectionTime);
}

/**
 * RCD Requirements - BS 7671 Chapter 41
 */
export interface RCDRequirement {
  location: string;
  regulation: string;
  rcdRating: 30 | 100 | 300; // mA
  rcdType: 'AC' | 'A' | 'B' | 'F';
  mandatory: boolean;
  reason: string;
}

export const RCD_REQUIREMENTS: RCDRequirement[] = [
  {
    location: 'Socket-outlets ≤20A for general use',
    regulation: '411.3.3',
    rcdRating: 30,
    rcdType: 'A',
    mandatory: true,
    reason: 'Additional protection for mobile equipment'
  },
  {
    location: 'Mobile equipment outdoors ≤32A',
    regulation: '411.3.3',
    rcdRating: 30,
    rcdType: 'A',
    mandatory: true,
    reason: 'Additional protection for outdoor use'
  },
  {
    location: 'Bathrooms - all circuits',
    regulation: '701.411.3.3',
    rcdRating: 30,
    rcdType: 'A',
    mandatory: true,
    reason: 'Special location - high risk'
  },
  {
    location: 'Cables concealed in walls <50mm depth',
    regulation: '522.6.202/522.6.203',
    rcdRating: 30,
    rcdType: 'A',
    mandatory: true,
    reason: 'Protection against mechanical damage (unless in safe zones)'
  },
  {
    location: 'EV charging points',
    regulation: '722.531.2.101',
    rcdRating: 30,
    rcdType: 'B',
    mandatory: true,
    reason: 'DC fault protection (Type B RCD required for DC components)'
  },
  {
    location: 'Swimming pools - Zone 1',
    regulation: '702.410.3.4.2',
    rcdRating: 30,
    rcdType: 'A',
    mandatory: true,
    reason: 'Special location - very high risk'
  },
  {
    location: 'Construction sites - socket-outlets',
    regulation: '704.411.3.2',
    rcdRating: 30,
    rcdType: 'A',
    mandatory: true,
    reason: 'Harsh environment protection'
  },
];

/**
 * Check if RCD protection is required for a circuit
 */
export function checkRCDRequirement(
  circuitType: string,
  location?: string
): RCDRequirement[] {
  const requirements: RCDRequirement[] = [];
  
  // Socket circuits
  if (circuitType.toLowerCase().includes('socket')) {
    requirements.push(RCD_REQUIREMENTS.find(r => r.location.includes('Socket-outlets'))!);
  }
  
  // Location-based requirements
  if (location) {
    const locLower = location.toLowerCase();
    
    if (locLower.includes('bathroom')) {
      requirements.push(RCD_REQUIREMENTS.find(r => r.location === 'Bathrooms - all circuits')!);
    }
    
    if (locLower.includes('outdoor') || locLower.includes('outside')) {
      requirements.push(RCD_REQUIREMENTS.find(r => r.location.includes('outdoor'))!);
    }
    
    if (locLower.includes('ev') || locLower.includes('charging')) {
      requirements.push(RCD_REQUIREMENTS.find(r => r.location === 'EV charging points')!);
    }
    
    if (locLower.includes('pool') || locLower.includes('swimming')) {
      requirements.push(RCD_REQUIREMENTS.find(r => r.location.includes('Swimming'))!);
    }
  }
  
  // Cable installation method
  if (circuitType.toLowerCase().includes('concealed') || circuitType.toLowerCase().includes('buried in wall')) {
    requirements.push(RCD_REQUIREMENTS.find(r => r.location.includes('concealed'))!);
  }
  
  return requirements.filter(Boolean);
}

/**
 * Prospective Fault Current and Breaking Capacity
 * Regulation 434.5.2
 */
export interface BreakingCapacityRequirement {
  installationType: 'domestic' | 'commercial' | 'industrial';
  minimumKA: number;
  preferredKA: number;
  regulation: string;
}

export const BREAKING_CAPACITY_REQUIREMENTS: BreakingCapacityRequirement[] = [
  {
    installationType: 'domestic',
    minimumKA: 6,
    preferredKA: 10,
    regulation: '434.5.2'
  },
  {
    installationType: 'commercial',
    minimumKA: 10,
    preferredKA: 16,
    regulation: '434.5.2'
  },
  {
    installationType: 'industrial',
    minimumKA: 16,
    preferredKA: 25,
    regulation: '434.5.2'
  },
];

/**
 * BS 7671 Table 41.4 - Maximum Zs for BS 88-2 gG Fuses (HRC "Red-Spot")
 * Industrial high rupturing capacity fuses for 0.4s disconnection at 230V (Uo)
 * Breaking capacity: 80kA standard
 */
export const MAX_ZS_BS88_GG_04S: MaxZsData[] = [
  { deviceType: 'BS88', deviceRating: 6, maxZs: 8.89, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 10, maxZs: 5.33, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 16, maxZs: 2.82, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 20, maxZs: 2.05, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 25, maxZs: 1.50, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 32, maxZs: 1.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 40, maxZs: 0.86, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 50, maxZs: 0.65, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 63, maxZs: 0.49, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 80, maxZs: 0.36, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 100, maxZs: 0.27, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 125, maxZs: 0.21, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 160, maxZs: 0.16, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 200, maxZs: 0.12, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 250, maxZs: 0.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 315, maxZs: 0.07, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 400, maxZs: 0.055, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 500, maxZs: 0.043, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 630, maxZs: 0.034, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 800, maxZs: 0.027, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 1000, maxZs: 0.021, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 1250, maxZs: 0.017, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
];

/**
 * BS 7671 Table 41.4 - Maximum Zs for BS 88-3 Fuse System C
 * Compact industrial fuses for 5s disconnection at 230V (Uo)
 * Used for motor and fixed equipment protection
 */
export const MAX_ZS_BS88_3_5S: MaxZsData[] = [
  { deviceType: 'BS88', deviceRating: 5, maxZs: 14.6, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 16, maxZs: 3.9, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 20, maxZs: 3.2, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 32, maxZs: 1.6, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 45, maxZs: 1.0, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 63, maxZs: 0.68, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 80, maxZs: 0.51, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 100, maxZs: 0.38, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
];

/**
 * BS 7671 Table 41.4 - Maximum Zs for BS 88-2 gG/gM Fuses (HRC "Red-Spot")
 * For 5s disconnection time at 230V (Uo) - Motors/Fixed Equipment
 * Using Cmin = 0.95 per BS 7671:2018+A2:2022
 */
export const MAX_ZS_BS88_GG_5S: MaxZsData[] = [
  { deviceType: 'BS88', deviceRating: 2, maxZs: 44, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 4, maxZs: 21, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 6, maxZs: 12, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 10, maxZs: 6.8, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 16, maxZs: 4.0, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 20, maxZs: 2.8, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 25, maxZs: 2.2, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 32, maxZs: 1.7, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 40, maxZs: 1.3, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 50, maxZs: 0.99, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 63, maxZs: 0.78, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 80, maxZs: 0.55, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 100, maxZs: 0.42, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 125, maxZs: 0.32, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 160, maxZs: 0.27, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS88', deviceRating: 200, maxZs: 0.18, disconnectionTime: 5, voltage: 230, regulation: 'Table 41.4' },
];

/**
 * BS 7671 Table 41.4 - Maximum Zs for BS 1361 Cartridge Fuses
 * Domestic/commercial cartridge fuses for 0.4s disconnection at 230V (Uo)
 */
export const MAX_ZS_BS1361_04S: MaxZsData[] = [
  { deviceType: 'BS1361', deviceRating: 5, maxZs: 10.9, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 15, maxZs: 3.43, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 20, maxZs: 2.55, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 30, maxZs: 1.60, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 45, maxZs: 0.96, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 60, maxZs: 0.68, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 80, maxZs: 0.47, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
  { deviceType: 'BS1361', deviceRating: 100, maxZs: 0.35, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.4' },
];

/**
 * BS 7671 Table 41.2 - Maximum Zs for BS 3036 Semi-Enclosed (Rewirable) Fuses
 * Legacy fuses found in older installations for 0.4s disconnection at 230V (Uo)
 * Note: No longer recommended for new installations
 */
export const MAX_ZS_BS3036_04S: MaxZsData[] = [
  { deviceType: 'BS3036', deviceRating: 5, maxZs: 10.9, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.2' },
  { deviceType: 'BS3036', deviceRating: 15, maxZs: 2.79, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.2' },
  { deviceType: 'BS3036', deviceRating: 20, maxZs: 1.85, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.2' },
  { deviceType: 'BS3036', deviceRating: 30, maxZs: 1.09, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.2' },
  { deviceType: 'BS3036', deviceRating: 45, maxZs: 0.60, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.2' },
];

/**
 * Get maximum Zs value for any protective device type
 * Extended to support industrial fuses (BS88, BS1361, BS3036)
 */
export function getMaxZsForDevice(
  deviceType: 'B' | 'C' | 'D' | 'BS88' | 'BS1361' | 'BS3036',
  deviceRating: number,
  disconnectionTime: 0.4 | 5 = 0.4
): { maxZs: number; regulation: string } | null {
  let table: MaxZsData[];
  
  // CRITICAL: BS 7671 Table 41.3 only specifies 5s values for Type D
  // Types B and C do NOT have 5s disconnection times in the standard
  if (disconnectionTime === 5 && (deviceType === 'B' || deviceType === 'C')) {
    // Return null for invalid combinations (5s + Type B/C)
    return null;
  }
  
  // Select correct table based on device type AND disconnection time
  switch (deviceType) {
    case 'B':
      // Type B only has 0.4s (already validated above)
      table = MAX_ZS_MCB_TYPE_B_04S;
      break;
    case 'C':
      // Type C only has 0.4s (already validated above)
      table = MAX_ZS_MCB_TYPE_C_04S;
      break;
    case 'D':
      // Type D has both 0.4s and 5s tables
      table = disconnectionTime === 5 ? MAX_ZS_MCB_TYPE_D_5S : MAX_ZS_MCB_TYPE_D_04S;
      break;
    case 'BS88':
      // BS88 has both 0.4s (final circuits) and 5s (motors/fixed equipment) tables
      table = disconnectionTime === 5 ? MAX_ZS_BS88_GG_5S : MAX_ZS_BS88_GG_04S;
      break;
    case 'BS1361':
      table = MAX_ZS_BS1361_04S;
      break;
    case 'BS3036':
      table = MAX_ZS_BS3036_04S;
      break;
    default:
      return null;
  }
  
  const match = table.find(z => z.deviceRating === deviceRating && z.disconnectionTime === disconnectionTime);
  
  if (!match) return null;
  
  return {
    maxZs: match.maxZs,
    regulation: match.regulation
  };
}
