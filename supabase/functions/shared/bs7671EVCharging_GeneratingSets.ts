// BS 7671:2018+A2:2022 - Batch 10
// Section 722: Electric Vehicle Charging Installations
// Section 551: Generating Sets and Battery Energy Storage Systems

// ============================================================================
// SECTION 722: ELECTRIC VEHICLE (EV) CHARGING INSTALLATIONS
// ============================================================================

/**
 * EV Charging Scope (Reg 722.11)
 * Applies to all EV charging installations (residential, commercial, public)
 * Modes 1, 2, 3, and 4 charging
 */
export interface EVChargingScope {
  regulation: string;
  applicability: string;
  chargingModes: {
    mode: number;
    description: string;
    typical: string;
  }[];
  locations: string[];
}

export const EV_CHARGING_SCOPE: EVChargingScope = {
  regulation: 'Reg 722.11',
  applicability: 'All EV charging installations for electric vehicles',
  chargingModes: [
    {
      mode: 1,
      description: 'Connection via standard socket (BS 1363) - NOT RECOMMENDED',
      typical: 'Emergency use only - slow charging via household socket'
    },
    {
      mode: 2,
      description: 'Portable charging cable with in-cable protection (RCD)',
      typical: 'Occasional charging - portable EVSE with RCD in cable'
    },
    {
      mode: 3,
      description: 'Dedicated EV charging point with control/pilot function',
      typical: 'MOST COMMON - wallbox/charging station (Type 2 socket/tethered)'
    },
    {
      mode: 4,
      description: 'DC fast charging with external charger',
      typical: 'Rapid charging - CCS/CHAdeMO connectors'
    }
  ],
  locations: ['Domestic dwellings', 'Workplaces', 'Public car parks', 'Commercial premises']
};

/**
 * PME EARTHING RESTRICTIONS FOR EV CHARGING (Reg 722.411.4.1)
 * CRITICAL SAFETY - PME (TN-C-S) creates risk of exported voltage on vehicle body
 */
export interface EVPMEProtectionMethod {
  method: string;
  regulation: string;
  description: string;
  requirements: string[];
  suitableFor: string;
  notes: string;
}

export const EV_PME_PROTECTION_METHODS: EVPMEProtectionMethod[] = [
  {
    method: 'TT Earthing System',
    regulation: 'Reg 722.411.4.1(ii)',
    description: 'Install dedicated earth electrode for EV charging (TT system)',
    requirements: [
      'Earth electrode resistance ≤200Ω (preferably ≤20Ω)',
      'RCD Type A or B with IΔn ≤30mA',
      'Disconnect L+N+PE on fault',
      'Buried CPC sized per Table 54.1',
      'Separation from PME metalwork (if possible)'
    ],
    suitableFor: 'Domestic/commercial - MOST COMMON SOLUTION',
    notes: 'Creating TT may be difficult if buried PME services nearby'
  },
  {
    method: 'PEN Conductor Monitoring Device',
    regulation: 'Reg 722.411.4.1(iii)',
    description: 'Device monitors PEN integrity and disconnects on fault',
    requirements: [
      'Monitors voltage between PE and true Earth',
      'Disconnects L+N+PE if PEN fault detected',
      'Max voltage thresholds (70V/1s, 100V/0.7s, 200V/0.2s)',
      'Auto-reconnect when fault clears',
      'CE/UKCA marked with Declaration of Conformity'
    ],
    suitableFor: 'Domestic/commercial where TT not feasible',
    notes: 'Device must be third-party approved - see Reg 722.411.4.1 Note 1'
  },
  {
    method: 'Special RCD (Type B with PEN Monitoring)',
    regulation: 'Reg 722.411.4.1(iv)',
    description: 'RCD Type B with integrated PEN fault detection',
    requirements: [
      'RCD Type B (DC fault sensitive)',
      'Integrated PEN conductor monitoring',
      'Disconnects L+N+PE on PEN fault',
      'Voltage between L-N: 207-253V rms acceptable',
      'CE/UKCA marked'
    ],
    suitableFor: 'Domestic/commercial - integrated solution',
    notes: 'Combined RCD + PEN monitoring in single device'
  },
  {
    method: 'Alternative Device (Equivalent Safety)',
    regulation: 'Reg 722.411.4.1(v)',
    description: 'Device providing equivalent protection to (iii) or (iv)',
    requirements: [
      'Electrically disconnects vehicle from L+N+PE',
      'Provides isolation per Table 537.4',
      'Equivalent safety to methods (iii) or (iv)',
      'Manufacturer confirmation required',
      'CE/UKCA marked with Declaration of Conformity'
    ],
    suitableFor: 'New technologies - subject to approval',
    notes: 'Must prove equivalent safety - installer responsibility to verify'
  }
];

/**
 * CRITICAL NOTE: PME (TN-C-S) PROHIBITED for EV charging WITHOUT one of above methods
 * Reason: If PEN conductor breaks, vehicle body becomes live at supply voltage (230V)
 * Person touching vehicle body while standing on ground = FATAL SHOCK
 */

/**
 * RCD Requirements for EV Charging (Reg 722.531.3.101)
 */
export interface EVRCDRequirement {
  regulation: string;
  requirement: string;
  rcdType: string;
  ratedCurrent: string;
  dcFaultProtection: string[];
  notes: string[];
}

export const EV_RCD_REQUIREMENTS: EVRCDRequirement = {
  regulation: 'Reg 722.531.3.101',
  requirement: 'Each charging point protected individually by RCD',
  rcdType: 'Type A, Type F, or Type B',
  ratedCurrent: 'IΔn ≤30mA',
  dcFaultProtection: [
    'RCD Type B (sensitive to DC fault currents), OR',
    'RCD Type A/F + RDC-DD (Residual DC Detecting Device per BS IEC 62955)'
  ],
  notes: [
    'Type B preferred for full protection against DC faults from vehicle',
    'Type A/F acceptable if combined with RDC-DD',
    'RDC-DD can be inside charging equipment OR upstream in installation',
    'RCD must disconnect ALL live conductors (L+N)',
    'NOT required if electrical separation used (Reg 722.413)'
  ]
};

/**
 * Socket-Outlet/Connector Types (Reg 722.55.101.0.201.1)
 */
export interface EVSocketType {
  type: string;
  standard: string;
  regulation: string;
  description: string;
  requirements: string[];
  typical: string;
}

export const EV_SOCKET_TYPES: EVSocketType[] = [
  {
    type: 'BS 1363-2 Socket (13A)',
    standard: 'BS 1363-2',
    regulation: 'Reg 722.55.101.0.201.1(i)',
    description: 'Standard UK 13A socket marked "EV" on rear',
    requirements: [
      'Marked "EV" on rear of socket',
      'Label on front: "suitable for electric vehicle charging"',
      'Fixed mounting (not portable)',
      'Mode 2 charging only (with in-cable RCD)',
      'Slow charging (~3kW)'
    ],
    typical: 'Emergency/occasional charging - NOT IDEAL for regular use'
  },
  {
    type: 'BS EN 60309-2 (Commando/Industrial)',
    standard: 'BS EN 60309-2',
    regulation: 'Reg 722.55.101.0.201.1(ii)/(iii)',
    description: 'Industrial socket with interlock (blue 16A/32A)',
    requirements: [
      'Interlocked per BS EN 60309-1 clause 6.1.5',
      'Prevents live contacts when accessible',
      'Self-contained interlocked product (BS EN 60309-4) acceptable',
      'Rated 16A or 32A single-phase',
      'Mode 2/3 charging'
    ],
    typical: 'Commercial/workplace charging - robust connector'
  },
  {
    type: 'Type 1 Connector (J1772)',
    standard: 'BS EN 62196-2',
    regulation: 'Reg 722.55.101.0.201.1(iv)',
    description: 'Single-phase AC connector (USA/Japan standard)',
    requirements: [
      'Mode 3 charging only',
      'Vehicle connector (tethered cable)',
      'Max 32A single-phase',
      'Control pilot function'
    ],
    typical: 'Older vehicles (Nissan Leaf pre-2018) - RARE in UK'
  },
  {
    type: 'Type 2 Socket/Connector (Mennekes)',
    standard: 'BS EN 62196-2',
    regulation: 'Reg 722.55.101.0.201.1(v)',
    description: 'European standard - MOST COMMON in UK',
    requirements: [
      'Mode 3 charging only',
      'Socket OR tethered vehicle connector',
      'Single-phase (32A) or 3-phase (up to 63A)',
      'Control pilot function',
      'Shutter mechanism'
    ],
    typical: 'UK STANDARD - all new EVs, wallboxes, public chargers'
  },
  {
    type: 'Type 3 Connector',
    standard: 'BS EN 62196-2',
    regulation: 'Reg 722.55.101.0.201.1(vi)',
    description: 'Alternative European connector (France/Italy)',
    requirements: [
      'Mode 3 charging only',
      'Socket OR vehicle connector',
      'Shuttered design'
    ],
    typical: 'RARE in UK - mostly France/Italy'
  }
];

/**
 * External Influences (IP/IK Ratings) (Reg 722.512.2)
 */
export interface EVExternalInfluences {
  location: string;
  ipRating: string;
  ikRating: string;
  regulation: string;
  requirements: string[];
}

export const EV_EXTERNAL_INFLUENCES: EVExternalInfluences[] = [
  {
    location: 'Outdoor Installation',
    ipRating: 'IPX4 minimum (IP4X for solids)',
    ikRating: 'IK08 minimum (public areas/car parks)',
    regulation: 'Reg 722.512.2.201-203',
    requirements: [
      'IPX4 - Protected against water splashing',
      'IP4X - Protected against solid objects >1mm',
      'IK08 - Protected against 5 joule impact (AG3 - high severity)',
      'Position to avoid vehicle impact OR provide bollards/barriers',
      'Mechanical protection if in high-traffic area'
    ]
  },
  {
    location: 'Indoor Installation (Garage)',
    ipRating: 'IP2X minimum (if dry)',
    ikRating: 'IK08 if public access',
    regulation: 'Reg 722.512.2',
    requirements: [
      'Lower IP rating acceptable if protected from weather',
      'Consider moisture if vehicle brings in rain/snow',
      'IK08 still recommended to prevent accidental damage'
    ]
  }
];

/**
 * Circuit Protection (Reg 722.533.101)
 */
export interface EVCircuitProtection {
  regulation: string;
  requirement: string;
  deviceTypes: string[];
  notes: string[];
}

export const EV_CIRCUIT_PROTECTION: EVCircuitProtection = {
  regulation: 'Reg 722.533.101',
  requirement: 'Each charging point supplied individually by dedicated circuit',
  deviceTypes: [
    'MCB per BS EN 60898 series (Type B or C)',
    'MCCB per BS EN 60947-2',
    'RCBO per BS EN 61009-1 (RCD + MCB combined)',
    'Fuses per BS EN 60269 series'
  ],
  notes: [
    'ONE charging point per final circuit (no daisy-chaining)',
    'Multiple charging points in equipment = multiple circuits required',
    'Typical ratings: 16A (3.6kW), 32A (7.4kW), 40A (9.2kW)',
    'Cable sized for continuous load (no diversity applied)'
  ]
};

/**
 * Electrical Separation (Reg 722.413)
 */
export interface EVElectricalSeparation {
  regulation: string;
  requirement: string;
  transformerStandard: string;
  limitations: string[];
  notes: string[];
}

export const EV_ELECTRICAL_SEPARATION: EVElectricalSeparation = {
  regulation: 'Reg 722.413.1.2',
  requirement: 'Supply ONE vehicle from ONE unearthed source via isolating transformer',
  transformerStandard: 'BS EN 61558-2-4 (safety isolating transformer)',
  limitations: [
    'ONE charging point per transformer only',
    'Secondary circuit unearthed (floating)',
    'RCD on secondary side (close to transformer)',
    'Protective conductor monitoring required',
    'Fixed isolating transformer (not portable)'
  ],
  notes: [
    'RARE solution - high cost per charging point',
    'Eliminates PME risk (floating secondary)',
    'Useful where TT system not feasible',
    'High inrush current - select primary MCB carefully',
    'See Figure A722 for example arrangement'
  ]
};

/**
 * Labelling Requirements (Reg 722.55.101.0.201.1)
 */
export const EV_LABELLING_REQUIREMENTS = {
  regulation: 'Reg 722.55.101.0.201.1 + Appendix 11',
  labels: [
    {
      location: 'BS 1363 socket rear',
      text: '"EV" marking',
      mandatory: true
    },
    {
      location: 'BS 1363 socket front or adjacent',
      text: '"suitable for electric vehicle charging"',
      mandatory: true
    },
    {
      location: 'Consumer unit / distribution board',
      text: 'Circuit identification: "EV CHARGING POINT - 32A"',
      mandatory: true
    },
    {
      location: 'Charging equipment',
      text: 'Manufacturer\'s instructions and ratings',
      mandatory: true
    }
  ]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get PME protection method recommendation
 */
export function getEVPMEProtectionMethod(scenario: {
  location: 'domestic' | 'commercial' | 'public';
  earthingSystem: 'TN-C-S' | 'TN-S' | 'TT';
  canInstallEarthRod: boolean;
}): string {
  if (scenario.earthingSystem === 'TN-S' || scenario.earthingSystem === 'TT') {
    return 'No PME protection required - TN-S or TT system is safe for EV charging';
  }

  // TN-C-S (PME) - protection REQUIRED
  if (scenario.canInstallEarthRod) {
    return 'Reg 722.411.4.1(ii): Install TT earthing system with earth electrode (≤200Ω, preferably ≤20Ω) + RCD Type A/B ≤30mA. MOST COMMON SOLUTION.';
  } else {
    return 'Reg 722.411.4.1(iii): Install PEN conductor monitoring device (disconnects L+N+PE on PEN fault). Ensure device has CE/UKCA mark and Declaration of Conformity.';
  }
}

/**
 * Get RCD type recommendation
 */
export function getEVRCDType(vehicleType: 'modern' | 'older', hasRDCDD: boolean): string {
  if (vehicleType === 'modern' && !hasRDCDD) {
    return 'RCD Type B (30mA) - Modern EVs can produce DC fault currents. Type B provides full protection.';
  }
  
  if (hasRDCDD) {
    return 'RCD Type A or F (30mA) + RDC-DD (Residual DC Detecting Device per BS IEC 62955). RDC-DD can be in charging equipment or upstream.';
  }

  return 'RCD Type B (30mA) recommended for all EV charging to ensure protection against DC fault currents.';
}

/**
 * Get socket/connector type recommendation
 */
export function getEVSocketRecommendation(application: 'domestic' | 'workplace' | 'public'): string {
  switch (application) {
    case 'domestic':
      return 'Type 2 socket (BS EN 62196-2, Mode 3) - UK standard. 7kW (32A single-phase). Allows owner to use own cable OR install tethered Type 2 cable (more convenient).';
    
    case 'workplace':
      return 'Type 2 tethered cable (BS EN 62196-2, Mode 3) - More user-friendly (no cable needed). 7kW or 22kW (3-phase). Consider load management if multiple points.';
    
    case 'public':
      return 'Type 2 tethered cable (BS EN 62196-2, Mode 3) - Universal compatibility, vandal-resistant. 7kW (fast) or 22kW+ (rapid). IP55/IK10 rating for harsh environment.';
    
    default:
      return 'Type 2 socket or tethered cable (BS EN 62196-2, Mode 3) is UK standard.';
  }
}

/**
 * Validate EV charging installation
 */
export function validateEVChargingInstallation(installation: {
  earthingSystem: string;
  pmeProtectionMethod?: string;
  rcdType: string;
  rcdRating: number;
  socketType: string;
  ipRating: string;
  dedicatedCircuit: boolean;
}): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check PME protection
  if (installation.earthingSystem === 'TN-C-S' && !installation.pmeProtectionMethod) {
    issues.push('❌ PME (TN-C-S) system requires protection per Reg 722.411.4.1 - TT earth electrode OR PEN monitoring device');
  }

  // Check RCD rating
  if (installation.rcdRating > 30) {
    issues.push('❌ RCD rated residual current must be ≤30mA (Reg 722.531.3.101)');
  }

  // Check RCD type
  if (!['Type A', 'Type F', 'Type B'].includes(installation.rcdType)) {
    issues.push('❌ RCD must be Type A, F, or B (Reg 722.531.3.101)');
  }

  // Check dedicated circuit
  if (!installation.dedicatedCircuit) {
    issues.push('❌ Each charging point requires individual dedicated circuit (Reg 722.533.101)');
  }

  // Check IP rating
  if (installation.ipRating && !installation.ipRating.match(/IP[X4-9]/)) {
    issues.push('⚠️ Outdoor installations require minimum IPX4 (Reg 722.512.2.201)');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Calculate EV charging circuit sizing
 */
export function calculateEVCircuitSizing(chargingPower: number, phases: 1 | 3): {
  mcbRating: string;
  cableSize: string;
  notes: string[];
} {
  const voltage = phases === 1 ? 230 : 400;
  const current = phases === 1 
    ? chargingPower / voltage 
    : chargingPower / (Math.sqrt(3) * voltage);

  let mcbRating: number;
  let cableSize: string;
  const notes: string[] = [];

  if (current <= 16) {
    mcbRating = 16;
    cableSize = '2.5mm²';
  } else if (current <= 20) {
    mcbRating = 20;
    cableSize = '4mm²';
  } else if (current <= 32) {
    mcbRating = 32;
    cableSize = '6mm²';
    notes.push('Standard 7kW home charger - most common');
  } else if (current <= 40) {
    mcbRating = 40;
    cableSize = '10mm²';
    notes.push('Fast charging - check supply capacity');
  } else {
    mcbRating = 63;
    cableSize = '16mm²';
    notes.push('Rapid charging - requires DNO approval (G99)');
  }

  notes.push(`EV charging = continuous load - no diversity applied`);
  notes.push(`Cable sizing assumes Reference Method C (clipped direct), 30°C ambient`);
  notes.push(`Verify voltage drop ≤5% (11.5V for 230V) - may need larger cable for long runs`);

  return {
    mcbRating: `${mcbRating}A Type B or C`,
    cableSize: `${cableSize} T&E or SWA (3-core: L, N, CPC)`,
    notes
  };
}
