/**
 * BS 7671:2018+A3:2024 - Part 7 Special Locations (Extended)
 * Section 702 (Swimming Pools), 704 (Construction Sites), 708 (Caravan Parks)
 */

import { SpecialLocationRequirement, ZoneRequirement } from './bs7671SpecialLocations.ts';

// ============ SECTION 702 - SWIMMING POOLS ============

export const SECTION_702_SWIMMING_POOLS: SpecialLocationRequirement = {
  section: '702',
  locationName: 'Swimming Pools and Other Basins',
  zones: [
    {
      zoneName: 'Zone 0',
      description: 'Interior of swimming pool basin',
      dimensions: 'Inside the pool basin including recesses in walls/floors, foot cleaning basins, waterjets, waterfalls and space below',
      restrictions: [
        'Only SELV ≤12V AC / 30V DC ripple-free',
        'Source OUTSIDE zones 0, 1, 2',
        'Equipment must be IPX8 rated',
        'Only fixed equipment specifically designed for swimming pools',
        'Luminaires must comply with BS EN 60598-2-18'
      ]
    },
    {
      zoneName: 'Zone 1',
      description: 'Above pool and 2m around rim',
      dimensions: 'Vertical plane 2m from pool rim. Height to 2.5m above floor. For diving boards: 1.5m from periphery',
      restrictions: [
        'Only SELV ≤25V AC / 60V DC ripple-free permitted',
        'Source OUTSIDE zones 0, 1, 2',
        'Equipment must be IPX4 rated (IPX5 if waterjets for cleaning)',
        'NO switches or socket-outlets',
        'Only fixed equipment designed for pool use',
        'Junction boxes only for SELV circuits'
      ]
    },
    {
      zoneName: 'Zone 2',
      description: '1.5m beyond Zone 1',
      dimensions: 'Vertical plane 1.5m beyond Zone 1. Height to 2.5m above floor',
      restrictions: [
        'SELV, RCD 30mA, or electrical separation permitted',
        'Equipment must be IPX2 (indoor) or IPX4 (outdoor)',
        'Socket-outlets/switches only if RCD 30mA protected',
        'Source for SELV can be in Zone 2 if its supply has RCD 30mA',
        'NO Zone 2 for fountains'
      ]
    }
  ],
  ipRatings: [
    { zone: 'Zone 0', ipRating: 'IPX8', description: 'Continuous immersion' },
    { zone: 'Zone 1', ipRating: 'IPX4 / IPX5', description: 'Splashing / water jets' },
    { zone: 'Zone 2 (indoor)', ipRating: 'IPX2', description: 'Dripping water (15° angle)' },
    { zone: 'Zone 2 (outdoor)', ipRating: 'IPX4 / IPX5', description: 'Splashing / water jets' }
  ],
  rcdRequirements: [
    {
      mandatory: true,
      rating: 30,
      type: 'A',
      regulation: '702.410.3.4 + 702.415.2',
      reason: 'All equipment in zones. Automatic disconnection for Zone 2. SELV for Zones 0 & 1'
    }
  ],
  equipmentRestrictions: [
    { zone: 'Zone 0', restriction: 'Only underwater pool equipment (pumps, lights) designed for immersion' },
    { zone: 'Zone 1', restriction: 'Filtration systems, jet stream pumps in insulated enclosure with tool/key access' },
    { zone: 'Zone 2', restriction: 'General equipment permitted with RCD protection' }
  ],
  bondingRequirements: 'Supplementary bonding MANDATORY in all zones (0, 1, 2) connecting all exposed & extraneous parts. NOT permitted to omit (702.415.2)',
  keyRegulations: [
    '702.410.3.4 - SELV voltage limits',
    '702.415.2 - Mandatory supplementary bonding',
    '702.55.2 - Underwater luminaires BS EN 60598-2-18',
    '702.522.23 - Fountain cable requirements (AG2 protection, HO7RN8-F)'
  ]
};

// ============ SECTION 704 - CONSTRUCTION & DEMOLITION SITES ============

export const SECTION_704_CONSTRUCTION_SITES: SpecialLocationRequirement = {
  section: '704',
  locationName: 'Construction and Demolition Site Installations',
  zones: undefined, // No zone classification for construction sites
  rcdRequirements: [
    {
      mandatory: true,
      rating: 30,
      type: 'A',
      regulation: '704.410.3.10',
      reason: 'Socket-outlets ≤32A AND hand-held equipment ≤32A MUST have RCD 30mA protection'
    }
  ],
  equipmentRestrictions: [
    { zone: 'All areas', restriction: 'Socket-outlets ≤32A MUST be via ACS (Assembly for Construction Sites)' },
    { zone: 'All areas', restriction: 'Hand-held equipment ≤32A: RCD, Reduced low voltage (110V), electrical separation, or SELV' },
    { zone: 'All areas', restriction: 'Portable handlamps: Reduced low voltage (110V centre-tapped 55V) STRONGLY PREFERRED' },
    { zone: 'Confined/damp', restriction: 'SELV system STRONGLY PREFERRED for portable handlamps' }
  ],
  bondingRequirements: 'Standard bonding requirements apply',
  keyRegulations: [
    '704.410.3.10 - RCD protection for sockets ≤32A and hand-held tools',
    '704.537.2 - ACS (Assembly for Construction Sites) mandatory with isolation device',
    '704.410.3.5 - Obstacles and placing out of reach NOT PERMITTED',
    '704.410.3.6 - Non-conducting location, earth-free bonding, electrical separation for >1 equipment NOT PERMITTED',
    'Reduced low voltage (110V centre-tapped to earth = 55V to earth) strongly preferred for portable tools and lighting'
  ]
};

// ============ SECTION 708 - CARAVAN / CAMPING PARKS ============

export const SECTION_708_CARAVAN_PARKS: SpecialLocationRequirement = {
  section: '708',
  locationName: 'Caravan / Camping Parks and Similar Locations',
  zones: undefined,
  ipRatings: [
    { zone: 'All equipment', ipRating: 'IPX4 minimum', description: 'Protected against splashing water (AD4)' },
    { zone: 'All equipment', ipRating: 'IP4X minimum', description: 'Protected against small objects >1mm (AE3)' },
    { zone: 'Impact areas', ipRating: 'IK08 minimum', description: 'Mechanical impact protection (AG3)' }
  ],
  rcdRequirements: [
    {
      mandatory: true,
      rating: 30,
      type: 'A',
      regulation: '708.415.1',
      reason: 'EVERY socket-outlet individually protected by 30mA RCD (all live conductors)'
    },
    {
      mandatory: true,
      rating: 30,
      type: 'A',
      regulation: '708.415.1',
      reason: 'Fixed connection to mobile/residential park home: 30mA RCD accessible to consumer'
    }
  ],
  equipmentRestrictions: [
    { zone: 'All areas', restriction: 'Socket-outlets BS EN 60309-2 with interlocking to prevent live when accessible' },
    { zone: 'All areas', restriction: 'Each socket-outlet individually overcurrent protected (Chapter 43)' },
    { zone: 'Pitch equipment', restriction: 'Located max 20m from connection point on caravan' },
    { zone: 'Pitch equipment', restriction: 'Max 4 socket-outlets grouped together per enclosure' },
    { zone: 'Pitch equipment', restriction: 'Sockets 0.5m to 1.5m height (higher if flood/snow risk with special measures)' },
    { zone: 'Pitch equipment', restriction: 'Minimum 16A rating per socket-outlet' }
  ],
  bondingRequirements: 'Socket-outlet protective conductors SHALL NOT be connected to PME earthing facility (708.553.1.14). TT system required for pitch sockets.',
  keyRegulations: [
    '708.415.1 - Every socket INDIVIDUALLY protected by 30mA RCD',
    '708.553.1.14 - PME PROHIBITED for socket CPCs (caravan safety)',
    '708.411.4 + ESQCR - PME prohibited for any metalwork in leisure accommodation vehicle',
    '708.521.7.2 - Underground cables min 600mm depth (tent peg/anchor protection)',
    '708.521.7.3 - Overhead cables: 6m height (vehicle movement areas), 3.5m elsewhere',
    '708.55.1.1 - BS EN 60309-2 interlocked sockets mandatory',
    '708.512.2.1.3 - AG3 mechanical impact protection required'
  ]
};

// ============ SECTION 717 - MOBILE / TRANSPORTABLE UNITS ============

export const SECTION_717_MOBILE_UNITS: SpecialLocationRequirement = {
  section: '717',
  locationName: 'Mobile or Transportable Units',
  zones: undefined,
  rcdRequirements: [
    {
      mandatory: true,
      rating: 30,
      type: 'A',
      regulation: '717.415',
      reason: 'All socket-outlets rated ≤32A protected by 30mA RCD'
    }
  ],
  equipmentRestrictions: [
    { zone: 'Supply connection', restriction: 'Main switch-disconnector rated ≥supply current capacity' },
    { zone: 'Supply connection', restriction: 'Connection point suitable for anticipated supply system' },
    { zone: 'All areas', restriction: 'Wiring systems suitable for vibration and movement' },
    { zone: 'External surface', restriction: 'Degree of protection minimum IP44' }
  ],
  bondingRequirements: 'All exposed-conductive-parts of unit bonded to main earthing terminal. Extraneous-conductive-parts bonded if external metalwork.',
  keyRegulations: [
    '717.410.3.6 - Non-conducting location and earth-free bonding NOT PERMITTED',
    '717.411 - Automatic disconnection of supply with RCD protection',
    '717.415 - RCD 30mA for all sockets ≤32A',
    '717.52 - Wiring systems suitable for mechanical stress, vibration, movement',
    '717.55.1 - Flexible cables for external connections'
  ]
};

// ============ UTILITY FUNCTIONS ============

export function getSpecialLocationRequirements(locationCode: string): SpecialLocationRequirement | undefined {
  const locations: Record<string, SpecialLocationRequirement> = {
    '702': SECTION_702_SWIMMING_POOLS,
    '704': SECTION_704_CONSTRUCTION_SITES,
    '708': SECTION_708_CARAVAN_PARKS,
    '717': SECTION_717_MOBILE_UNITS
  };
  
  return locations[locationCode];
}

export function checkPMEAllowedSpecialLocation(locationCode: string): {
  allowed: boolean;
  regulation: string;
  restrictions: string;
} {
  if (locationCode === '708') {
    return {
      allowed: false,
      regulation: '708.411.4 + 708.553.1.14 + ESQCR',
      restrictions: 'PME PROHIBITED for caravan metalwork and socket-outlet CPCs. Use TT system.'
    };
  }
  
  if (locationCode === '705') {
    return {
      allowed: false,
      regulation: '705.411.4',
      restrictions: 'TN-C NOT PERMITTED. PME not recommended for livestock areas. TN-C-S allowed for non-livestock areas.'
    };
  }
  
  return {
    allowed: true,
    regulation: 'General requirements apply',
    restrictions: 'None for this special location'
  };
}

export function getRCDRequirementsForLocation(locationCode: string): string {
  const location = getSpecialLocationRequirements(locationCode);
  if (!location) return 'Standard RCD requirements apply (Chapter 41)';
  
  return location.rcdRequirements
    .map(r => `${r.mandatory ? 'MANDATORY' : 'Recommended'}: ${r.rating}mA Type ${r.type} RCD - ${r.reason} (${r.regulation})`)
    .join('\n');
}
