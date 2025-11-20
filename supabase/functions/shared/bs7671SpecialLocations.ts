/**
 * BS 7671:2018+A3:2024 Part 7 - Special Locations
 * Critical requirements for bathrooms, EV charging, swimming pools, etc.
 */

export interface SpecialLocationRequirement {
  section: string;
  locationName: string;
  zones?: ZoneRequirement[];
  ipRatings?: { zone: string; ipRating: string; description: string }[];
  rcdRequirements: {
    mandatory: boolean;
    rating: number; // mA
    type: 'AC' | 'A' | 'B' | 'F';
    regulation: string;
    reason: string;
  }[];
  equipmentRestrictions: { zone: string; restriction: string }[];
  bondingRequirements?: string;
  keyRegulations: string[];
}

export interface ZoneRequirement {
  zoneName: string;
  description: string;
  dimensions: string;
  restrictions: string[];
}

/**
 * Section 701 - Bathrooms and Showers
 * CRITICAL SPECIAL LOCATION - Very high risk
 */
export const SECTION_701_BATHROOMS: SpecialLocationRequirement = {
  section: '701',
  locationName: 'Locations Containing a Bath or Shower',
  zones: [
    {
      zoneName: 'Zone 0',
      description: 'Interior of bath tub or shower basin',
      dimensions: 'Inside bath/shower basin. For showers without basin: 0.10m height, same horizontal extent as Zone 1',
      restrictions: [
        'NO switchgear or accessories',
        'Only SELV equipment ≤12V AC / 30V DC ripple-free',
        'Safety source OUTSIDE zones 0, 1, 2',
        'Equipment must be IPX7 rated',
        'Fixed and permanently connected only'
      ]
    },
    {
      zoneName: 'Zone 1',
      description: 'Above bath/shower and immediately around it',
      dimensions: 'From floor to 2.25m or highest shower head (whichever higher). Vertical surface around bath/shower basin, or 1.20m from shower outlet for walk-in showers',
      restrictions: [
        'Only SELV switches ≤12V AC / 30V DC',
        'Safety source OUTSIDE zones 0, 1, 2',
        'Equipment must be IPX4 rated minimum',
        'Only specific fixed equipment: whirlpool units, electric showers, shower pumps, SELV/PELV ≤25V AC / 60V DC, ventilation, towel rails, water heaters, luminaires',
        'Space under bath is Zone 1 unless accessible only with tool'
      ]
    },
    {
      zoneName: 'Zone 2',
      description: 'Area extending 0.60m beyond Zone 1',
      dimensions: 'From floor to 2.25m or highest shower head (whichever higher). 0.60m horizontal from Zone 1 boundary',
      restrictions: [
        'NO socket-outlets except SELV (source outside zones) or shaver supply units BS EN 61558-2-5',
        'Equipment must be IPX4 rated minimum',
        'Socket-outlets prohibited within 2.5m horizontally from Zone 1 boundary (except SELV & shaver units)',
        'Switches/accessories only for SELV circuits or shaver supply units'
      ]
    }
  ],
  ipRatings: [
    {
      zone: 'Zone 0',
      ipRating: 'IPX7',
      description: 'Protected against immersion in water'
    },
    {
      zone: 'Zones 1 & 2',
      ipRating: 'IPX4',
      description: 'Protected against splashing water from any direction'
    },
    {
      zone: 'All zones (if water jets)',
      ipRating: 'IPX5',
      description: 'Protected against water jets (e.g., cleaning)'
    }
  ],
  rcdRequirements: [
    {
      mandatory: true,
      rating: 30,
      type: 'A',
      regulation: '701.411.3.3',
      reason: 'ALL circuits serving the location AND circuits passing through zones 1/2 not serving the location'
    }
  ],
  equipmentRestrictions: [
    {
      zone: 'Zone 0',
      restriction: 'ONLY SELV ≤12V AC / 30V DC ripple-free, IPX7 rated, fixed & permanently connected'
    },
    {
      zone: 'Zone 1',
      restriction: 'ONLY specific fixed equipment (showers, pumps, SELV/PELV ≤25V AC/60V DC, ventilation, towel rails, water heaters, luminaires). IPX4 minimum.'
    },
    {
      zone: 'Zone 2',
      restriction: 'NO socket-outlets except SELV (source outside zones) or shaver supply units. IPX4 minimum. Switches only for SELV or shaver units.'
    },
    {
      zone: 'Outside zones',
      restriction: 'Socket-outlets prohibited within 2.5m horizontally from Zone 1 boundary (except SELV sockets & shaver units)'
    }
  ],
  bondingRequirements: `Regulation 701.415.2: Supplementary protective equipotential bonding SHALL connect:
  - Protective conductors of all circuits (Class I & II equipment)
  - Metallic pipes (water, gas, waste)
  - Metallic central heating pipes & air conditioning
  - Accessible metallic structural parts (NOT door frames/window frames unless connected to building structure)
  
  CAN BE OMITTED if:
  - All final circuits comply with Reg 411.3.2 (ADS)
  - All final circuits have 30mA RCD per Reg 415.1.1
  - All extraneous-conductive-parts effectively connected to main protective equipotential bonding per Reg 411.3.1.2`,
  keyRegulations: [
    '701.32 - Zone definitions',
    '701.411.3.3 - Mandatory 30mA RCD for ALL circuits',
    '701.415.2 - Supplementary bonding (or conditions for omission)',
    '701.512.2 - IP ratings (IPX7 for Zone 0, IPX4 for Zones 1 & 2)',
    '701.512.3 - Equipment restrictions by zone',
    '701.55 - Current-using equipment restrictions'
  ]
};

/**
 * Section 722 - Electric Vehicle Charging
 * CRITICAL: Type B RCD and PME earthing issues
 */
export const SECTION_722_EV_CHARGING: SpecialLocationRequirement = {
  section: '722',
  locationName: 'Electric Vehicle Charging Installations',
  rcdRequirements: [
    {
      mandatory: true,
      rating: 30,
      type: 'B',
      regulation: '722.531.3.101',
      reason: 'DC fault protection required for EV charging (EVs contain DC components). Type B RCD OR Type A/F + RDC-DD device.'
    }
  ],
  equipmentRestrictions: [
    {
      zone: 'All EV charging points',
      restriction: 'Each charging point MUST be individually protected by 30mA RCD (Type A, Type F, or Type B)'
    },
    {
      zone: 'Socket-outlets',
      restriction: 'One socket-outlet or vehicle connector per EV only. BS 1363-2 marked "EV" OR BS EN 60309-2 (interlocked) OR BS EN 62196-2 Type 1/2/3 for Mode 3 charging'
    },
    {
      zone: 'Outdoor installations',
      restriction: 'Minimum IP4X (solid bodies) AND IPX4 (water) protection. IK08 impact protection in public areas/car parks (Reg 722.512.2)'
    }
  ],
  bondingRequirements: `Regulation 722.411.4.1: PME EARTHING RESTRICTION
  
  CRITICAL: PME (TN-C-S) supplies create risk if PEN conductor fails - vehicle body can become live.
  
  SOLUTIONS (choose ONE):
  (ii) Separate earth rod (TT system) - NOT RECOMMENDED due to difficulty achieving separation from buried metalwork
  (iii) O-PEN protective device (detects open-circuit PEN, disconnects within specified time based on voltage to earth)
  (iv) Earth electrode + enhanced protection device (shorter disconnection times)
  (v) Isolating transformer BS EN 61558-2-4
  
  NOTE: Simply creating TT earthing often NOT sufficient - buried metalwork connected to supply PEN makes true separation impossible`,
  keyRegulations: [
    '722.411.4.1 - PME earthing restriction and solutions',
    '722.531.3.101 - MANDATORY Type B RCD or Type A/F + RDC-DD',
    '722.511.101 - Equipment must comply with BS EN 61851 series',
    '722.512.2 - IP4X and IPX4 minimum outdoors, IK08 impact protection public areas',
    '722.533.101 - Each charging point on individual final circuit with overcurrent protection',
    '722.55.101 - Socket-outlet types and restrictions'
  ]
};

/**
 * Regulation 522.6.202 - Safe Zones for Cables in Walls
 * CRITICAL: Prevents accidental cable damage
 */
export interface SafeZoneRequirement {
  regulation: string;
  description: string;
  horizontalZones: string[];
  verticalZones: string[];
  depthRequirement: string;
  alternativeProtection: string[];
  rcdRequirement?: string;
}

export const SAFE_ZONES_522_6: SafeZoneRequirement = {
  regulation: '522.6.202',
  description: 'Cables in walls/partitions at depth <50mm MUST be in safe zones OR have additional protection',
  horizontalZones: [
    'Within 150mm from TOP of wall/partition',
    'Within 150mm of angle formed by two adjoining walls/partitions'
  ],
  verticalZones: [
    'Within 150mm of angle formed by two adjoining walls',
    'Horizontally OR vertically to point/accessory/switchgear on wall surface'
  ],
  depthRequirement: 'If cable depth <50mm from surface: MUST be in safe zone OR comply with Reg 522.6.204',
  alternativeProtection: [
    'Incorporate earthed metallic covering (BS 5467, BS 6724, BS 7846, BS 8436, BS EN 60702-1)',
    'Install in earthed conduit (BS EN 61386-21)',
    'Enclose in earthed trunking/ducting (BS EN 50085-2-1)',
    'Provide mechanical protection sufficient to prevent nail/screw penetration',
    'SELV or PELV circuit (Reg 414.4)'
  ],
  rcdRequirement: '522.6.202: If cable in safe zone but depth <50mm, 30mA RCD protection REQUIRED (unless alternative protection 522.6.204 used)'
};

/**
 * Regulation 522.6.203 - Cables in Walls with Metallic Parts
 */
export const METALLIC_WALL_CABLES_522_6_203: SafeZoneRequirement = {
  regulation: '522.6.203',
  description: 'Cables in walls/partitions with internal metallic parts (NOT just nails/screws) MUST have RCD protection OR alternative protection',
  horizontalZones: ['Same as 522.6.202 - within 150mm from top or angles'],
  verticalZones: ['Same as 522.6.202 - to accessories/switchgear'],
  depthRequirement: 'IRRESPECTIVE of buried depth - applies to ANY depth if metallic parts in wall construction',
  alternativeProtection: [
    '30mA RCD protection (Reg 415.1.1) - MANDATORY',
    'OR comply with Reg 522.6.204 alternative protection methods'
  ],
  rcdRequirement: '522.6.203(i): MANDATORY 30mA RCD if wall contains metallic parts (stud walls, metal framework, etc.) - UNLESS alternative protection per 522.6.204'
};

/**
 * Get special location requirements by name or section
 */
export function getSpecialLocationRequirements(locationQuery: string): SpecialLocationRequirement | null {
  const query = locationQuery.toLowerCase();
  
  if (query.includes('bath') || query.includes('shower') || query.includes('701')) {
    return SECTION_701_BATHROOMS;
  }
  
  if (query.includes('ev') || query.includes('charging') || query.includes('722') || query.includes('vehicle')) {
    return SECTION_722_EV_CHARGING;
  }
  
  return null;
}

/**
 * Check if safe zones apply to installation
 */
export function checkSafeZoneCompliance(params: {
  cableDepth: number; // mm
  inWall: boolean;
  wallHasMetalParts: boolean;
  inSafeZone: boolean;
  hasAlternativeProtection: boolean;
}): {
  compliant: boolean;
  regulation: string;
  rcdRequired: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let rcdRequired = false;
  let compliant = true;
  let regulation = '';
  
  if (!params.inWall) {
    return { compliant: true, regulation: 'N/A', rcdRequired: false, issues: [], recommendations: [] };
  }
  
  // 522.6.203 - Metallic wall parts
  if (params.wallHasMetalParts) {
    regulation = '522.6.203';
    if (!params.hasAlternativeProtection) {
      rcdRequired = true;
      issues.push('Wall contains metallic parts - 30mA RCD MANDATORY per Reg 522.6.203');
      compliant = false;
    }
  }
  
  // 522.6.202 - Depth <50mm
  if (params.cableDepth < 50) {
    regulation = regulation || '522.6.202';
    
    if (!params.inSafeZone && !params.hasAlternativeProtection) {
      issues.push('Cable depth <50mm and NOT in safe zone - MUST comply with Reg 522.6.204 OR have 30mA RCD');
      rcdRequired = true;
      compliant = false;
    }
    
    if (params.inSafeZone && !params.hasAlternativeProtection) {
      rcdRequired = true;
      recommendations.push('Cable in safe zone but depth <50mm - 30mA RCD protection required per Reg 522.6.202');
    }
  }
  
  // Recommendations
  if (params.cableDepth >= 50) {
    recommendations.push('Cable depth ≥50mm - outside safe zone requirements (Reg 522.6.201)');
  }
  
  if (params.hasAlternativeProtection) {
    recommendations.push('Alternative protection per Reg 522.6.204 in place - RCD not required');
  }
  
  return {
    compliant,
    regulation,
    rcdRequired,
    issues,
    recommendations
  };
}
