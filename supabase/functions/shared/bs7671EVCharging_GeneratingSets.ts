// BS 7671:2018+A3:2024 - Batch 10
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

// ============================================================================
// SECTION 551: LOW VOLTAGE GENERATING SETS & BATTERY ENERGY STORAGE
// ============================================================================

/**
 * Generating Set Scope (Reg 551.1)
 * Covers backup generators, solar inverters, battery storage, micro-CHP
 */
export interface GeneratingSetScope {
  regulation: string;
  applicability: string;
  supplyArrangements: string[];
  powerSources: string[];
  electricalTypes: string[];
  uses: string[];
}

export const GENERATING_SET_SCOPE: GeneratingSetScope = {
  regulation: 'Reg 551.1',
  applicability: 'All installations incorporating generating sets (continuous or occasional supply)',
  supplyArrangements: [
    'Supply NOT connected to public network (off-grid)',
    'Supply as SWITCHED ALTERNATIVE to public network (standby/backup)',
    'Supply in PARALLEL with public network (grid-tied solar/battery)',
    'Combinations of the above'
  ],
  powerSources: [
    'Combustion engines (diesel/petrol/gas generators)',
    'Turbines (wind, hydro, steam)',
    'Electric motors (rotary UPS)',
    'Photovoltaic cells (solar inverters)',
    'Batteries (energy storage systems)',
    'Other suitable sources (fuel cells, micro-CHP)'
  ],
  electricalTypes: [
    'Synchronous generators (mains-excited or separately excited)',
    'Asynchronous generators (mains-excited or self-excited)',
    'Static convertors (inverters) with or without bypass'
  ],
  uses: [
    'Permanent installations (solar PV, battery storage)',
    'Temporary installations (site generators)',
    'Mobile equipment (portable generators)',
    'Mobile units (motorhomes, caravans) - see Section 717'
  ]
};

/**
 * Grid Connection Requirements (G98/G99)
 * CRITICAL - DNO notification/approval required
 */
export interface GridConnectionRequirement {
  standard: string;
  threshold: string;
  regulation: string;
  requirements: string[];
  timeline: string;
  notes: string[];
}

export const GRID_CONNECTION_REQUIREMENTS: GridConnectionRequirement[] = [
  {
    standard: 'G98 (BS EN 50549-1)',
    threshold: 'Output ≤16A per phase (≤3.68kW single-phase, ≤11.04kW 3-phase)',
    regulation: 'Reg 551.7.4, 551.7.6',
    requirements: [
      'NOTIFICATION to DNO (not approval) - use DNO online portal',
      'Loss of Mains (LOM) protection MANDATORY',
      'Automatic disconnection within 0.5s if grid fails',
      'Settings per BS EN 50549-1:',
      '  - Voltage: 207-253V (single-phase)',
      '  - Frequency: 47-52Hz',
      'Isolation accessible per BS EN 50549-1',
      'Cannot export if DNO limits capacity (export limitation device)'
    ],
    timeline: 'Notify DNO AFTER installation (online submission)',
    notes: [
      'Most domestic solar PV (4-10kW) falls under G98',
      'Plug-and-play systems (e.g., balcony solar) also G98',
      'No DNO approval needed - just notification',
      'DNO has right to refuse if network capacity exceeded'
    ]
  },
  {
    standard: 'G99 (ENA ER G99)',
    threshold: 'Output >16A per phase (>3.68kW single-phase, >11.04kW 3-phase)',
    regulation: 'Reg 551.7.3-551.7.6',
    requirements: [
      'DNO APPROVAL REQUIRED before connection',
      'Submit application via DNO (can take 6-12 weeks)',
      'Loss of Mains (LOM) protection MANDATORY',
      'Protection settings AGREED with DNO (vary by location)',
      'May require:',
      '  - Power quality monitoring',
      '  - Export limitation',
      '  - DNO witness testing',
      '  - G99 commissioning certificate',
      'Isolation accessible to DNO'
    ],
    timeline: 'Apply BEFORE installation - allow 6-12 weeks for DNO approval',
    notes: [
      'Commercial solar (>10kW), large battery systems (>13.8kWh)',
      '3-phase domestic solar (>11kW)',
      'DNO can refuse or require network upgrades (costly)',
      'Export tariff (SEG) requires smart meter + MCS certificate'
    ]
  }
];

/**
 * Standby Generator Requirements (Reg 551.6)
 * Switched alternative to grid supply
 */
export interface StandbyGeneratorRequirements {
  regulation: string;
  application: string;
  earthingRequirement: string;
  switchingRequirements: string[];
  autoStartRequirements: string[];
  fuelStorage: string[];
}

export const STANDBY_GENERATOR_REQUIREMENTS: StandbyGeneratorRequirements = {
  regulation: 'Reg 551.6',
  application: 'Generator provides supply when grid fails (hospitals, data centres, critical infrastructure)',
  earthingRequirement: 'Reg 551.4.3.2.1 - Independent earthing REQUIRED (cannot rely on PME when grid disconnected)',
  switchingRequirements: [
    'Interlocked changeover switch (prevents parallel operation with grid)',
    '3-pole or 4-pole changeover (L1, L2, L3, N)',
    'Neutral switching if TN-S from grid but generator is separately derived',
    'Emergency stop button accessible',
    'Clear labelling: "GENERATOR" and "MAINS"',
    'Manual or automatic transfer switch (ATS)'
  ],
  autoStartRequirements: [
    'Auto-start on grid failure (typical: 10-30 second delay)',
    'Battery-powered starter motor (maintained charged)',
    'Fuel level monitoring (alarm if low)',
    'Coolant temperature/oil pressure protection',
    'Auto shutdown if fault detected',
    'Weekly/monthly self-test (exercise run)'
  ],
  fuelStorage: [
    'Diesel/petrol storage: Building Regulations Part B (fire safety)',
    'Above-ground tanks: Bunded, 110% capacity',
    'Underground tanks: Double-skinned, leak detection',
    'Max 275L domestic (3000L commercial with fire separation)',
    'Ventilation if indoors (CO/fumes exhaust)',
    'Fire extinguisher nearby'
  ]
};

/**
 * Parallel Operation (Grid-Tied) Requirements (Reg 551.7)
 * Solar PV, battery storage, CHP
 */
export interface ParallelOperationRequirements {
  regulation: string;
  application: string;
  protectionRequirements: string[];
  powerQualityRequirements: string[];
  antiIslandingProtection: string[];
  notes: string[];
}

export const PARALLEL_OPERATION_REQUIREMENTS: ParallelOperationRequirements = {
  regulation: 'Reg 551.7',
  application: 'Generating set operates in parallel with grid (exports or imports as needed)',
  protectionRequirements: [
    'Loss of Mains (LOM) protection - Reg 551.7.4',
    'Automatic disconnection if grid fails (<0.5s for G98, agreed for G99)',
    'Prevents "islanding" (generator powering dead grid = danger to DNO workers)',
    'Voltage/frequency monitoring:',
    '  - Overvoltage: >253V (disconnect)',
    '  - Undervoltage: <207V (disconnect)',
    '  - Overfrequency: >52Hz (disconnect)',
    '  - Underfrequency: <47Hz (disconnect)',
    'Isolation accessible to DNO - Reg 551.7.6'
  ],
  powerQualityRequirements: [
    'Reg 551.7.3 - Avoid adverse effects to grid:',
    '  - Power factor ≥0.95 (G98/G99)',
    '  - Harmonic distortion <5% THD',
    '  - Voltage unbalance <2% (3-phase)',
    '  - Flicker limits per G98/G99',
    'Synchronization for rotating machines:',
    '  - Automatic synchronizer (frequency, phase, voltage)',
    '  - Phase sequence correct (L1-L2-L3)',
    '  - Voltage match ±10%',
    '  - Frequency match ±0.2Hz'
  ],
  antiIslandingProtection: [
    'Active anti-islanding (inverters):',
    '  - Frequency shift detection',
    '  - Voltage shift detection',
    '  - Impedance measurement',
    'Passive anti-islanding:',
    '  - Over/under voltage relays',
    '  - Over/under frequency relays',
    '  - ROCOF (Rate of Change of Frequency)',
    'Disconnect within 0.5s of grid loss (G98)',
    'Cannot reconnect until grid stable for 20s minimum'
  ],
  notes: [
    'Most solar inverters have built-in G98/G99 compliance',
    'Battery inverters (e.g., Tesla Powerwall, Givenergy) also compliant',
    'Older generators may need retrofitting with LOM protection',
    'Smart export guarantee (SEG) requires export meter'
  ]
};

/**
 * Battery Energy Storage Requirements (Reg 551.8)
 * Stationary batteries (lithium-ion, lead-acid)
 */
export interface BatteryStorageRequirements {
  regulation: string;
  application: string;
  locationRequirements: string[];
  ventilationRequirements: string[];
  electricalRequirements: string[];
  fireRiskRequirements: string[];
  notes: string[];
}

export const BATTERY_STORAGE_REQUIREMENTS: BatteryStorageRequirements = {
  regulation: 'Reg 551.8',
  application: 'Stationary batteries (home battery storage, UPS, off-grid systems)',
  locationRequirements: [
    'Reg 551.8.1 - Accessible only to skilled/instructed persons',
    'Secure location (locked room/garage) OR secure enclosure (cabinet)',
    'NOT in bedrooms or escape routes',
    'Temperature controlled: 5-30°C (lithium-ion optimal 15-25°C)',
    'Dry location (no condensation)',
    'Away from ignition sources',
    'Floor loading adequate (batteries are HEAVY - e.g., 150kg for 13.5kWh)'
  ],
  ventilationRequirements: [
    'Reg 551.8.1 - Adequate ventilation MANDATORY',
    'Lead-acid batteries: Hydrogen gas release (EXPLOSIVE if concentrated)',
    '  - Ventilation: 0.05m³/h per kWh of battery capacity',
    '  - High & low level vents (prevent stratification)',
    '  - No ignition sources (sparks, naked flames)',
    'Lithium-ion batteries: Less gas, but thermal runaway risk',
    '  - Ventilation for heat dissipation',
    '  - Thermal runaway = toxic gases (HF, CO)',
    '  - Consider mechanical extraction if large system (>20kWh)'
  ],
  electricalRequirements: [
    'Reg 551.8.2 - Basic protection by insulation or enclosures',
    'Bare conductive parts with >120V potential difference:',
    '  - Cannot be inadvertently touched simultaneously',
    '  - Insulated terminals or shrouded busbars',
    'DC isolator (breaking capacity ≥prospective DC short-circuit current)',
    'DC overcurrent protection (fuses or DC-rated MCBs)',
    'Battery Management System (BMS) MANDATORY for lithium-ion',
    'Earthing/bonding of metal enclosures',
    'Cable sizing for DC currents (no diversity)'
  ],
  fireRiskRequirements: [
    'Lithium-ion thermal runaway risk:',
    '  - Install smoke/heat detector in battery room',
    '  - Fire extinguisher: Class D (lithium metal) or Class F (avoid water!)',
    '  - Building Regulations Part B guidance (NFPA 855 US reference)',
    '  - Spacing between battery modules (prevent cascade failure)',
    'Lead-acid battery fire risk:',
    '  - Hydrogen explosion risk (>4% concentration)',
    '  - No smoking signs (BS EN ISO 7010 P003)',
    '  - Spark-proof light switches (outside battery room)',
    'Manufacturer safety data sheets (SDS) available'
  ],
  notes: [
    'Home battery systems (e.g., Tesla Powerwall 13.5kWh) typically lithium-ion',
    'Must comply with manufacturer installation manual',
    'MCS certification required for renewable incentives (SEG)',
    'Insurance notification required (some insurers exclude lithium batteries)',
    'Planning permission usually NOT required (domestic <1m above roof)',
    'Fire brigade notification (>20kWh systems in some areas)'
  ]
};

/**
 * RCD Protection with Generating Sets (Reg 551.4.2)
 */
export const GENERATING_SET_RCD_REQUIREMENTS = {
  regulation: 'Reg 551.4.2',
  requirement: 'RCD protection must remain effective for EVERY combination of sources',
  issues: [
    {
      issue: 'Generator neutral earthed (TN system)',
      problem: 'RCD may not operate correctly if generator neutral earthed when grid is TN-C-S',
      solution: 'Use TT earthing for generator (separate earth electrode) OR ensure neutral-earth bond switches with changeover'
    },
    {
      issue: 'Inverter DC leakage (solar/battery)',
      problem: 'DC components can blind Type AC/A RCDs',
      solution: 'Use RCD Type B OR Type A/F with manufacturer confirmation of DC immunity'
    },
    {
      issue: 'Parallel operation',
      problem: 'Earth fault current shared between sources - RCD may not see full fault current',
      solution: 'Calculate prospective fault current from ALL sources, verify RCD sensitivity adequate'
    }
  ],
  notes: [
    'Solar inverters typically have galvanic isolation (transformer) - no DC leakage',
    'Battery inverters may have DC leakage - check manufacturer specs',
    'Generators with AVR (Automatic Voltage Regulator) affect RCD operation'
  ]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Determine grid connection requirements (G98 vs G99)
 */
export function getGridConnectionRequirement(
  power: number,
  phases: 1 | 3
): {
  standard: string;
  threshold: string;
  approval: string;
  timeline: string;
  notes: string[];
} {
  const currentPerPhase = phases === 1 ? power / 230 : power / (Math.sqrt(3) * 400);
  
  if (currentPerPhase <= 16) {
    return {
      standard: 'G98 (BS EN 50549-1)',
      threshold: `${power}W ≤ ${phases === 1 ? '3.68kW' : '11.04kW'} (≤16A per phase)`,
      approval: 'DNO NOTIFICATION only (not approval)',
      timeline: 'Submit AFTER installation via DNO online portal',
      notes: [
        'Most domestic solar PV systems (4-10kW)',
        'No DNO approval needed - just notification',
        'LOM protection per BS EN 50549-1 required',
        'Can proceed with installation before notifying DNO'
      ]
    };
  } else {
    return {
      standard: 'G99 (ENA ER G99)',
      threshold: `${power}W > ${phases === 1 ? '3.68kW' : '11.04kW'} (>16A per phase)`,
      approval: 'DNO APPROVAL REQUIRED before connection',
      timeline: 'Apply BEFORE installation - allow 6-12 weeks',
      notes: [
        'Commercial solar (>10kW), large battery (>13.8kWh)',
        'DNO can refuse or require network upgrades',
        'Protection settings agreed with DNO',
        'May require witness testing',
        'Cannot connect until approval received'
      ]
    };
  }
}

/**
 * Determine earthing for standby generator
 */
export function getStandbyGeneratorEarthing(
  gridEarthing: 'TN-C-S' | 'TN-S' | 'TT',
  generatorType: 'separately-derived' | 'solidly-grounded'
): {
  earthingMethod: string;
  earthElectrode: boolean;
  neutralSwitching: boolean;
  notes: string[];
} {
  if (gridEarthing === 'TN-C-S') {
    // PME supply - MUST have independent earth when on generator
    return {
      earthingMethod: 'TT earthing system for generator (Reg 551.4.3.2.1)',
      earthElectrode: true,
      neutralSwitching: true,
      notes: [
        '❌ CANNOT rely on PME earth when grid disconnected',
        '✅ Install earth electrode (≤200Ω) for generator supply',
        '✅ 4-pole changeover switch (L1, L2, L3, N)',
        'Neutral must switch to disconnect from PME',
        'Generator neutral connected to earth electrode'
      ]
    };
  } else if (gridEarthing === 'TN-S' && generatorType === 'separately-derived') {
    return {
      earthingMethod: 'Separate earth electrode for generator',
      earthElectrode: true,
      neutralSwitching: true,
      notes: [
        'Generator is separately derived (separate neutral-earth bond)',
        '4-pole changeover to isolate neutral',
        'Earth electrode for generator earthing',
        'Cannot share TN-S earth when on generator power'
      ]
    };
  } else {
    return {
      earthingMethod: 'Can use existing TN-S earthing',
      earthElectrode: false,
      neutralSwitching: false,
      notes: [
        'Grid TN-S earth can be used (not PME)',
        '3-pole changeover acceptable',
        'Generator neutral NOT separately bonded to earth',
        'Verify earth electrode resistance acceptable'
      ]
    };
  }
}

/**
 * Calculate battery ventilation requirement
 */
export function calculateBatteryVentilation(
  batteryCapacity: number,
  batteryType: 'lead-acid' | 'lithium-ion'
): {
  ventilationRequired: boolean;
  flowRate: string;
  notes: string[];
} {
  if (batteryType === 'lead-acid') {
    const flowRate = batteryCapacity * 0.05; // 0.05 m³/h per kWh
    return {
      ventilationRequired: true,
      flowRate: `${flowRate.toFixed(2)} m³/h minimum (natural or mechanical)`,
      notes: [
        '⚠️ HYDROGEN GAS RISK - explosive if >4% concentration',
        'High & low level vents required',
        'Vent area: ≥0.5% of floor area (natural ventilation)',
        'No ignition sources (sparks, naked flames)',
        'Battery room: NO SMOKING signs (BS EN ISO 7010 P003)',
        'Spark-proof light switches (outside room)'
      ]
    };
  } else {
    // Lithium-ion - less gas, but thermal runaway risk
    return {
      ventilationRequired: true,
      flowRate: batteryCapacity < 10 
        ? 'Natural ventilation adequate (vents top & bottom)' 
        : `Mechanical extraction recommended for ${batteryCapacity}kWh (≥${(batteryCapacity * 0.02).toFixed(1)} m³/h)`,
      notes: [
        '⚠️ THERMAL RUNAWAY RISK - toxic gases (HF, CO, CO2)',
        'Natural ventilation usually adequate <10kWh',
        'Consider mechanical extraction if >20kWh',
        'Temperature monitoring (BMS)',
        'Smoke/heat detector in battery room',
        'Fire extinguisher: Class D or F (NOT WATER!)',
        'Manufacturer installation manual MUST be followed'
      ]
    };
  }
}

/**
 * Validate generating set installation
 */
export function validateGeneratingSetInstallation(installation: {
  powerOutput: number;
  phases: 1 | 3;
  gridConnection: 'none' | 'standby' | 'parallel';
  gridEarthing?: 'TN-C-S' | 'TN-S' | 'TT';
  earthElectrodeInstalled?: boolean;
  lomProtectionInstalled?: boolean;
  dnoNotificationSubmitted?: boolean;
}): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check grid connection approval
  if (installation.gridConnection === 'parallel') {
    const gridReq = getGridConnectionRequirement(installation.powerOutput, installation.phases);
    
    if (gridReq.standard.includes('G99') && !installation.dnoNotificationSubmitted) {
      issues.push('❌ G99 approval: DNO approval REQUIRED before connection (>16A per phase)');
    }

    if (!installation.lomProtectionInstalled) {
      issues.push('❌ Loss of Mains (LOM) protection MANDATORY for parallel operation (Reg 551.7.4)');
    }
  }

  // Check standby generator earthing
  if (installation.gridConnection === 'standby') {
    if (installation.gridEarthing === 'TN-C-S' && !installation.earthElectrodeInstalled) {
      issues.push('❌ PME supply: Independent earth electrode REQUIRED for standby generator (Reg 551.4.3.2.1)');
    }
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
