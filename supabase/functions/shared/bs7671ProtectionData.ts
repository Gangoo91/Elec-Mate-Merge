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
 * 
 * BS EN 60898 / BS EN 61009 MCBs and RCBOs
 * Final circuits ≤32A
 */
export const MAX_ZS_MCB_TYPE_B_04S: MaxZsData[] = [
  { deviceType: 'B', deviceRating: 6, maxZs: 7.67, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 10, maxZs: 4.60, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 16, maxZs: 2.87, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 20, maxZs: 2.30, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 25, maxZs: 1.84, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 32, maxZs: 1.44, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 40, maxZs: 1.15, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 50, maxZs: 0.92, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 63, maxZs: 0.73, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 80, maxZs: 0.57, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 100, maxZs: 0.46, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'B', deviceRating: 125, maxZs: 0.37, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
];

export const MAX_ZS_MCB_TYPE_C_04S: MaxZsData[] = [
  { deviceType: 'C', deviceRating: 6, maxZs: 3.83, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 10, maxZs: 2.30, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 16, maxZs: 1.44, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 20, maxZs: 1.15, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 25, maxZs: 0.92, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 32, maxZs: 0.72, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 40, maxZs: 0.57, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 50, maxZs: 0.46, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 63, maxZs: 0.36, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 80, maxZs: 0.29, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 100, maxZs: 0.23, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'C', deviceRating: 125, maxZs: 0.18, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
];

export const MAX_ZS_MCB_TYPE_D_04S: MaxZsData[] = [
  { deviceType: 'D', deviceRating: 6, maxZs: 1.92, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 10, maxZs: 1.15, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 16, maxZs: 0.72, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 20, maxZs: 0.57, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 25, maxZs: 0.46, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 32, maxZs: 0.36, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 40, maxZs: 0.29, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 50, maxZs: 0.23, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
  { deviceType: 'D', deviceRating: 63, maxZs: 0.18, disconnectionTime: 0.4, voltage: 230, regulation: 'Table 41.3' },
];

/**
 * Get maximum Zs value for a protective device
 * 
 * @param deviceType - Type of protective device
 * @param deviceRating - Current rating in Amperes
 * @param disconnectionTime - Required disconnection time (default 0.4s for final circuits)
 * @returns Maximum Zs in ohms
 */
export function getMaxZs(
  deviceType: 'B' | 'C' | 'D',
  deviceRating: number,
  disconnectionTime: 0.4 | 5 = 0.4
): { maxZs: number; regulation: string } | null {
  let table: MaxZsData[];
  
  switch (deviceType) {
    case 'B':
      table = MAX_ZS_MCB_TYPE_B_04S;
      break;
    case 'C':
      table = MAX_ZS_MCB_TYPE_C_04S;
      break;
    case 'D':
      table = MAX_ZS_MCB_TYPE_D_04S;
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
