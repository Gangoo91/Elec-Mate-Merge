/**
 * BS 7671:2018+A2:2022 - Chapter 54: Earthing Arrangements and Protective Conductors
 * TN-S, TN-C-S, TT Systems, Main Bonding, Supplementary Bonding, CPC Sizing
 */

// ============ EARTHING SYSTEMS (Reg 542.1.2) ============

export interface EarthingSystem {
  systemType: string;
  description: string;
  earthingConnection: string;
  suitableFor: string[];
  restrictions?: string;
  regulation: string;
}

export const EARTHING_SYSTEMS: EarthingSystem[] = [
  {
    systemType: 'TN-S',
    description: 'Separate earth conductor from supply',
    earthingConnection: 'Main earthing terminal connected to earthed point of source via distributor',
    suitableFor: ['Domestic', 'Commercial', 'Industrial'],
    regulation: '542.1.2.1',
  },
  {
    systemType: 'TN-C-S (PME)',
    description: 'Protective Multiple Earthing - combined neutral and earth',
    earthingConnection: 'Main earthing terminal connected to neutral of source (PME)',
    suitableFor: ['Most installations'],
    restrictions: 'NOT permitted for caravans, petrol stations, EV charging (see 722.411.4.1)',
    regulation: '542.1.2.2'
  },
  {
    systemType: 'TT',
    description: 'Separate earth electrode at installation',
    earthingConnection: 'Main earthing terminal connected to earth electrode',
    suitableFor: ['Remote locations', 'Where PME unavailable', 'Agricultural premises'],
    regulation: '542.1.2.3'
  },
  {
    systemType: 'IT',
    description: 'Isolated or high-impedance earthed supply',
    earthingConnection: 'Installation earthed via earth electrode, supply isolated from earth',
    suitableFor: ['Specialist applications', 'Medical locations (Group 2)'],
    regulation: '542.1.2.3'
  }
];

// ============ MAIN PROTECTIVE BONDING (Reg 544.1) ============

export interface MainBondingRequirement {
  systemType: string;
  minimumCSA: string; // mm²
  calculation: string;
  regulation: string;
  notes: string;
}

export const MAIN_BONDING_REQUIREMENTS: MainBondingRequirement[] = [
  {
    systemType: 'TN-S and TN-C-S (PME) - Main earthing conductor ≤35mm² copper',
    minimumCSA: '10mm² copper',
    calculation: 'Half the CSA of main earthing conductor, min 6mm², max 25mm²',
    regulation: '544.1.1',
    notes: 'Applies to most domestic installations'
  },
  {
    systemType: 'TN-S and TN-C-S (PME) - Main earthing conductor >35mm² copper',
    minimumCSA: '16mm² copper minimum',
    calculation: 'Half the CSA of main earthing conductor, min 6mm²',
    regulation: '544.1.1',
    notes: 'Larger supplies - no maximum limit if >35mm²'
  },
  {
    systemType: 'TT System',
    minimumCSA: '6mm² copper (protected) or 16mm² (unprotected)',
    calculation: 'Based on adiabatic equation or Table 54.1',
    regulation: '544.1.1 + Table 54.1',
    notes: 'Where earth electrode used. Must withstand fault current.'
  }
];

export const MAIN_BONDING_SERVICES = [
  'Gas installation pipes (at point of entry)',
  'Water installation pipes (at point of entry)',
  'Other service pipes and ducting',
  'Central heating and air conditioning (if extraneous)',
  'Exposed metallic structural parts of the building',
  'Lightning protection system (if present - see BS EN 62305)'
];

// ============ SUPPLEMENTARY BONDING (Reg 544.2) ============

export interface SupplementaryBondingRequirement {
  location: string;
  required: boolean;
  minimumCSA: string;
  connectsBetween: string[];
  regulation: string;
  canBeOmitted?: string;
}

export const SUPPLEMENTARY_BONDING_REQUIREMENTS: SupplementaryBondingRequirement[] = [
  {
    location: 'Bathrooms (Section 701)',
    required: true,
    minimumCSA: '4mm² if mechanically protected, 6mm² if not',
    connectsBetween: [
      'Exposed-conductive-parts (Class I equipment)',
      'Extraneous-conductive-parts (pipework, baths, radiators)'
    ],
    regulation: '701.415.2',
    canBeOmitted: 'If ALL circuits have 30mA RCD AND disconnection times ≤0.4s (Reg 415.2.2)'
  },
  {
    location: 'Swimming Pools Zone 0, 1, 2 (Section 702)',
    required: true,
    minimumCSA: '4mm² minimum (copper)',
    connectsBetween: [
      'All exposed-conductive-parts in zones',
      'All extraneous-conductive-parts in zones',
      'Protective conductors of equipment in zones'
    ],
    regulation: '702.415.2',
    canBeOmitted: 'NOT PERMITTED - always required'
  },
  {
    location: 'Agricultural Premises - Livestock Areas (Section 705)',
    required: true,
    minimumCSA: '4mm² minimum, must include metal floor grid if present',
    connectsBetween: [
      'All exposed and extraneous-conductive-parts touchable by livestock',
      'Metal floor grids',
      'Concrete reinforcement in floors'
    ],
    regulation: '705.415.2.1',
    canBeOmitted: 'NOT PERMITTED in livestock areas'
  },
  {
    location: 'General Locations (where local conditions require)',
    required: false,
    minimumCSA: '2.5mm² if mechanically protected, 4mm² if not',
    connectsBetween: [
      'Simultaneous touchable exposed and extraneous-conductive-parts'
    ],
    regulation: '415.2',
    canBeOmitted: 'If conditions of Regulation 415.2.2 are met (RCD + disconnection time)'
  }
];

// ============ CPC SIZING (Reg 543.1) ============

export interface CPCSizingMethod {
  method: string;
  calculation: string;
  applies: string;
  regulation: string;
}

export const CPC_SIZING_METHODS: CPCSizingMethod[] = [
  {
    method: 'Adiabatic Equation',
    calculation: 'S = √(I²t) / k  where I=fault current, t=disconnection time, k=factor from Tables 54.2-54.6',
    applies: 'All protective conductors',
    regulation: '543.1.3'
  },
  {
    method: 'Table 54.7 (Simple sizing)',
    calculation: 'CPC same size as line up to 16mm², then per table',
    applies: 'When line conductor ≤35mm² and CPC is same material',
    regulation: '543.1.4 + Table 54.7'
  }
];

export interface CPCSizeTable {
  lineConductorCSA: string;
  minimumCPCCopper: string;
  minimumCPCAluminium: string;
  regulation: string;
}

export const CPC_SIZE_TABLE_54_7: CPCSizeTable[] = [
  {
    lineConductorCSA: '1.5mm²',
    minimumCPCCopper: '1.5mm²',
    minimumCPCAluminium: 'Not applicable',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '2.5mm²',
    minimumCPCCopper: '2.5mm²',
    minimumCPCAluminium: 'Not applicable',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '4mm²',
    minimumCPCCopper: '4mm²',
    minimumCPCAluminium: '4mm²',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '6mm²',
    minimumCPCCopper: '6mm²',
    minimumCPCAluminium: '6mm²',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '10mm²',
    minimumCPCCopper: '10mm²',
    minimumCPCAluminium: '10mm²',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '16mm²',
    minimumCPCCopper: '16mm²',
    minimumCPCAluminium: '16mm²',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '25mm²',
    minimumCPCCopper: '16mm²',
    minimumCPCAluminium: '16mm²',
    regulation: 'Table 54.7'
  },
  {
    lineConductorCSA: '35mm²',
    minimumCPCCopper: '16mm²',
    minimumCPCAluminium: '16mm²',
    regulation: 'Table 54.7'
  }
];

// ============ EARTH ELECTRODES (Reg 542.2) ============

export interface EarthElectrodeType {
  type: string;
  description: string;
  suitableFor: string;
  typicalResistance: string;
  installation: string;
  regulation: string;
  restrictions?: string;
}

export const EARTH_ELECTRODE_TYPES: EarthElectrodeType[] = [
  {
    type: 'Earth rod',
    description: 'Copper or copper-bonded steel rod driven into ground',
    suitableFor: 'TT systems, most soil types',
    typicalResistance: '10-200Ω depending on soil and depth',
    installation: 'Drive vertically to minimum 1.2m depth, ideally 2m+',
    regulation: '542.2.2(i)'
  },
  {
    type: 'Earth tape/wire',
    description: 'Buried copper tape or bare wire in trench',
    suitableFor: 'TT systems, where rods cannot be driven',
    typicalResistance: '20-100Ω depending on length and soil',
    installation: 'Bury at min 600mm depth, min 25mm² copper if unprotected',
    regulation: '542.2.2(ii) + Table 54.1'
  },
  {
    type: 'Earth plate',
    description: 'Flat copper or copper-clad plate buried in ground',
    suitableFor: 'TT systems, poor soil conditions',
    typicalResistance: '50-150Ω depending on size and soil',
    installation: 'Bury at sufficient depth below frost line',
    regulation: '542.2.2(iii)'
  },
  {
    type: 'Foundation electrode',
    description: 'Conductor embedded in concrete foundation',
    suitableFor: 'New builds, best long-term reliability',
    typicalResistance: '1-10Ω (excellent)',
    installation: 'Install during foundation pour, corrosion-resistant material',
    regulation: '542.2.2(iv) + 542.2.3'
  },
  {
    type: 'Structural metalwork',
    description: 'Metal reinforcement of concrete in ground (not pre-stressed)',
    suitableFor: 'New builds with suitable metallic structure',
    typicalResistance: 'Very low if extensive',
    installation: 'Welded connections, verified electrical continuity',
    regulation: '542.2.2(v)'
  },
  {
    type: 'Water pipe',
    description: 'Metallic water supply pipe',
    suitableFor: 'PROHIBITED for utility water pipes',
    typicalResistance: 'N/A',
    installation: 'NOT PERMITTED as earth electrode per Reg 542.2.6',
    regulation: '542.2.6',
    restrictions: 'Metallic pipe of water utility supply SHALL NOT be used as earth electrode'
  }
];

// ============ BURIED EARTHING CONDUCTOR SIZING (Table 54.1) ============

export interface BuriedEarthingConductor {
  protection: string;
  copperCSA: string;
  steelCSA: string;
  regulation: string;
}

export const BURIED_EARTHING_CONDUCTOR_SIZES: BuriedEarthingConductor[] = [
  {
    protection: 'Protected against both mechanical damage AND corrosion (e.g. in conduit)',
    copperCSA: '2.5mm²',
    steelCSA: '10mm²',
    regulation: 'Table 54.1'
  },
  {
    protection: 'Protected against corrosion by sheath, NOT protected mechanically',
    copperCSA: '16mm²',
    steelCSA: '16mm² coated steel',
    regulation: 'Table 54.1'
  },
  {
    protection: 'NOT protected against corrosion (bare in soil)',
    copperCSA: '25mm²',
    steelCSA: '50mm²',
    regulation: 'Table 54.1'
  }
];

// ============ PME RESTRICTIONS (Critical Safety) ============

export interface PMERestriction {
  location: string;
  permitted: boolean;
  regulation: string;
  reason: string;
  alternative: string;
}

export const PME_RESTRICTIONS: PMERestriction[] = [
  {
    location: 'Caravans and Motor Caravans',
    permitted: false,
    regulation: '708.411.4 + ESQCR',
    reason: 'PEN conductor breakage risk - chassis becomes live',
    alternative: 'TT system with RCD protection'
  },
  {
    location: 'Caravan Parks - socket-outlet protective conductors',
    permitted: false,
    regulation: '708.553.1.14',
    reason: 'Cannot connect socket CPC to PME - caravan safety',
    alternative: 'TT system or separate earth electrode for sockets'
  },
  {
    location: 'Petrol Filling Stations',
    permitted: false,
    regulation: 'PD CLC/TR 50404',
    reason: 'Fire/explosion risk if PEN breaks near fuel vapours',
    alternative: 'TT system'
  },
  {
    location: 'EV Charging Points (conductive to extraneous parts)',
    permitted: false,
    regulation: '722.411.4.1',
    reason: 'Exported neutral voltage to vehicle chassis',
    alternative: 'Separate earth electrode OR equipotential zone'
  },
  {
    location: 'Agricultural Premises (livestock areas)',
    permitted: false,
    regulation: '705.411.1 + Note 2',
    reason: 'PEN failure creates lethal touch voltage for animals',
    alternative: 'NOT RECOMMENDED - use TT system'
  }
];

// ============ UTILITY FUNCTIONS ============

export function getEarthingSystem(systemType: string): EarthingSystem | undefined {
  return EARTHING_SYSTEMS.find(s => s.systemType.toLowerCase().includes(systemType.toLowerCase()));
}

export function getCPCSizeFromTable(lineConductorCSA: number): number {
  if (lineConductorCSA <= 16) {
    return lineConductorCSA; // Same size up to 16mm²
  } else if (lineConductorCSA <= 35) {
    return 16; // 16mm² for 25-35mm²
  } else {
    return lineConductorCSA / 2; // Half for larger
  }
}

export function calculateAdiabaticCPC(
  faultCurrent: number,
  disconnectionTime: number,
  kFactor: number
): { minimumCSA: number; regulation: string } {
  // S = √(I²t) / k
  const S = Math.sqrt(Math.pow(faultCurrent, 2) * disconnectionTime) / kFactor;
  
  return {
    minimumCSA: Math.ceil(S * 10) / 10, // Round up to 1 decimal place
    regulation: '543.1.3'
  };
}

export function getMainBondingSize(
  systemType: 'TN-S' | 'TN-C-S' | 'TT',
  mainEarthingConductorCSA: number
): { minimumCSA: number; regulation: string } {
  if (systemType === 'TT') {
    return { minimumCSA: 6, regulation: '544.1.1 + Table 54.1' };
  }
  
  // TN systems
  const halfSize = mainEarthingConductorCSA / 2;
  
  if (mainEarthingConductorCSA <= 35) {
    // Min 6mm², max 25mm²
    const size = Math.max(6, Math.min(25, halfSize));
    return { minimumCSA: size, regulation: '544.1.1' };
  } else {
    // Min 6mm², no maximum
    const size = Math.max(6, halfSize);
    return { minimumCSA: size, regulation: '544.1.1' };
  }
}

export function checkPMEAllowed(locationType: string): {
  allowed: boolean;
  regulation: string;
  reason: string;
  alternative: string;
} {
  const restriction = PME_RESTRICTIONS.find(r => 
    r.location.toLowerCase().includes(locationType.toLowerCase())
  );
  
  if (restriction) {
    return {
      allowed: restriction.permitted,
      regulation: restriction.regulation,
      reason: restriction.reason,
      alternative: restriction.alternative
    };
  }
  
  return {
    allowed: true,
    regulation: '542.1.2.2',
    reason: 'No restrictions apply for this location type',
    alternative: 'N/A'
  };
}
