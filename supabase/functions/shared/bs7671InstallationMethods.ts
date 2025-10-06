/**
 * BS 7671:2018+A2:2022 - Chapter 52: Selection and Erection of Wiring Systems
 * Installation Methods, Cable Support, Safe Zones, Terminations
 */

// ============ CABLE SUPPORT INTERVALS (Reg 522.8.5) ============

export interface CableSupportInterval {
  cableType: string;
  orientation: 'horizontal' | 'vertical';
  maxSpacing: number; // in mm
  regulation: string;
  notes?: string;
}

export const CABLE_SUPPORT_INTERVALS: CableSupportInterval[] = [
  {
    cableType: 'T&E up to 9mm diameter',
    orientation: 'horizontal',
    maxSpacing: 250,
    regulation: '522.8.5',
    notes: 'Horizontal runs - clips every 250mm'
  },
  {
    cableType: 'T&E up to 9mm diameter',
    orientation: 'vertical',
    maxSpacing: 400,
    regulation: '522.8.5',
    notes: 'Vertical drops - clips every 400mm'
  },
  {
    cableType: 'T&E 9-15mm diameter',
    orientation: 'horizontal',
    maxSpacing: 300,
    regulation: '522.8.5',
    notes: '2.5mm² and 4mm² T&E horizontal'
  },
  {
    cableType: 'T&E 9-15mm diameter',
    orientation: 'vertical',
    maxSpacing: 400,
    regulation: '522.8.5',
    notes: '2.5mm² and 4mm² T&E vertical'
  },
  {
    cableType: 'T&E over 15mm diameter',
    orientation: 'horizontal',
    maxSpacing: 350,
    regulation: '522.8.5',
    notes: '6mm² and larger T&E horizontal'
  },
  {
    cableType: 'T&E over 15mm diameter',
    orientation: 'vertical',
    maxSpacing: 450,
    regulation: '522.8.5',
    notes: '6mm² and larger T&E vertical'
  },
  {
    cableType: 'SWA armoured cable',
    orientation: 'horizontal',
    maxSpacing: 600,
    regulation: '522.8.5',
    notes: 'Armoured cables have greater mechanical strength'
  },
  {
    cableType: 'SWA armoured cable',
    orientation: 'vertical',
    maxSpacing: 900,
    regulation: '522.8.5',
    notes: 'Vertical SWA - less frequent support needed'
  }
];

// ============ SAFE ZONES (Reg 522.6.201, 522.6.202) ============

export interface SafeZone {
  zoneType: string;
  description: string;
  distanceFromEdge: number; // in mm
  regulation: string;
  additionalProtection?: string;
}

export const SAFE_ZONES: SafeZone[] = [
  {
    zoneType: 'Top of wall',
    description: 'Horizontal zone within 150mm from top of wall or partition',
    distanceFromEdge: 150,
    regulation: '522.6.202(i)',
    additionalProtection: 'RCD protection required if cable <50mm depth and outside zone'
  },
  {
    zoneType: 'Wall corner',
    description: 'Vertical zone within 150mm of angle formed by two adjoining walls',
    distanceFromEdge: 150,
    regulation: '522.6.202(i)',
    additionalProtection: 'RCD protection required if cable <50mm depth and outside zone'
  },
  {
    zoneType: 'Accessory zone - horizontal',
    description: 'Horizontal zone to point, accessory or switchgear on wall surface',
    distanceFromEdge: 0,
    regulation: '522.6.202(i)',
    additionalProtection: 'Must run horizontally or vertically to accessory. RCD if <50mm depth'
  },
  {
    zoneType: 'Accessory zone - vertical',
    description: 'Vertical zone to point, accessory or switchgear on wall surface',
    distanceFromEdge: 0,
    regulation: '522.6.202(i)',
    additionalProtection: 'Must run horizontally or vertically to accessory. RCD if <50mm depth'
  },
  {
    zoneType: 'Through joist',
    description: 'Cable through joist must be 50mm from top/bottom or RCD protected',
    distanceFromEdge: 50,
    regulation: '522.6.201',
    additionalProtection: 'If less than 50mm vertical distance, provide mechanical protection or RCD'
  }
];

export interface SafeZoneCompliance {
  isInSafeZone: boolean;
  depth: number; // mm from surface
  requiresRCD: boolean;
  requiresMechanicalProtection: boolean;
  regulation: string;
  reasoning: string;
}

export function checkSafeZoneCompliance(
  location: 'wall' | 'ceiling' | 'floor',
  depth: number,
  distanceFromTop: number,
  distanceFromCorner: number,
  hasAccessoryNearby: boolean
): SafeZoneCompliance {
  const isInSafeZone = 
    distanceFromTop <= 150 || 
    distanceFromCorner <= 150 || 
    hasAccessoryNearby;

  const requiresRCD = depth < 50 && !isInSafeZone;
  const requiresMechanicalProtection = depth < 50 && !isInSafeZone;

  return {
    isInSafeZone,
    depth,
    requiresRCD,
    requiresMechanicalProtection,
    regulation: '522.6.202',
    reasoning: isInSafeZone 
      ? 'Cable is within safe zone - compliant'
      : requiresRCD 
        ? 'Cable outside safe zone and <50mm depth - RCD protection required per 522.6.202'
        : 'Cable >50mm depth - compliant without additional protection'
  };
}

// ============ FIRE-RATED CABLE SUPPORT (Reg 521.10.202) ============

export interface FireRatedSupportRequirement {
  regulation: string;
  requirement: string;
  acceptableMethods: string[];
  prohibitedMethods: string[];
  notes: string;
}

export const FIRE_RATED_SUPPORT: FireRatedSupportRequirement = {
  regulation: '521.10.202',
  requirement: 'Wiring systems shall be supported such that they will not be liable to premature collapse in the event of a fire',
  acceptableMethods: [
    'Steel cable clips (suitably spaced)',
    'Copper cable clips (suitably spaced)',
    'Steel cable saddles',
    'Steel or copper cable ties',
    'Steel cable containment systems (tray, basket, trunking)',
    'Metallic cable trunking'
  ],
  prohibitedMethods: [
    'Non-metallic cable clips as sole means of support (clipped direct)',
    'Non-metallic cable ties as sole means of support (under tray)',
    'Non-metallic cable trunking as sole means of support',
    'Plastic cable clips for cables clipped to exposed surfaces'
  ],
  notes: 'This regulation prevents cables from collapsing and blocking escape routes during fire. Metal supports maintain integrity longer in fire conditions.'
};

// ============ ELECTRICAL CONNECTIONS (Section 526) ============

export interface ConnectionRequirement {
  regulation: string;
  requirement: string;
  considerations: string[];
}

export const ELECTRICAL_CONNECTION_REQUIREMENTS: ConnectionRequirement = {
  regulation: '526.1 - 526.2',
  requirement: 'Every connection shall provide durable electrical continuity and adequate mechanical strength',
  considerations: [
    'Material of conductor and insulation (copper/aluminium compatibility)',
    'Number and shape of wires forming conductor (solid/stranded)',
    'Cross-sectional area of conductor',
    'Number of conductors being connected together',
    'Temperature at terminals in normal service',
    'Adequate locking arrangements in situations with vibration or thermal cycling',
    'Mechanical strain on terminations (avoid undue stress)'
  ]
};

export interface TerminationGuidance {
  conductorType: string;
  torqueSettings: string;
  stripLength: string;
  preparation: string;
  commonErrors: string[];
}

export const TERMINATION_GUIDANCE: TerminationGuidance[] = [
  {
    conductorType: '1.5mm² - 2.5mm² solid copper',
    torqueSettings: '0.8 - 1.2 Nm (check manufacturer)',
    stripLength: '10-12mm for terminal blocks',
    preparation: 'Clean cut, no nicks in conductor, fold back strands',
    commonErrors: [
      'Over-stripping insulation',
      'Loose terminal screws',
      'Conductor strands left exposed',
      'Wrong size terminal for cable'
    ]
  },
  {
    conductorType: '4mm² - 10mm² stranded copper',
    torqueSettings: '1.5 - 2.5 Nm (check manufacturer)',
    stripLength: '12-15mm',
    preparation: 'Use bootlace ferrule for stranded conductors in screw terminals',
    commonErrors: [
      'Not using ferrule on stranded cable',
      'Over-tightening causing conductor damage',
      'Inadequate conductor insertion depth'
    ]
  },
  {
    conductorType: 'Aluminium conductors',
    torqueSettings: 'Use manufacturer-specified connectors for aluminium',
    stripLength: 'Per connector specification',
    preparation: 'Use anti-oxidant compound. Aluminium-rated connectors essential.',
    commonErrors: [
      'Using copper-only terminals',
      'Not using anti-oxidant compound',
      'Dissimilar metal contact (aluminium-copper)'
    ]
  }
];

// ============ CABLE IDENTIFICATION (Reg 514) ============

export interface CableIdentification {
  cableType: string;
  coreCoding: string;
  earthCoding: string;
  labellingRequired: boolean;
  regulation: string;
}

export const CABLE_IDENTIFICATION_STANDARDS: CableIdentification[] = [
  {
    cableType: 'Single-phase T&E (Twin & Earth)',
    coreCoding: 'Brown (Line), Blue (Neutral), Bare (CPC with green/yellow sleeving)',
    earthCoding: 'Green/yellow sleeving required on bare CPC at terminations',
    labellingRequired: true,
    regulation: '514.3'
  },
  {
    cableType: 'Three-phase 4-core + CPC',
    coreCoding: 'Brown (L1), Black (L2), Grey (L3), Blue (N), Green/Yellow (CPC)',
    earthCoding: 'Green/yellow required on CPC',
    labellingRequired: true,
    regulation: '514.3'
  },
  {
    cableType: 'Old colours (pre-2004) - WARNING',
    coreCoding: 'RED = OLD LIVE, BLACK = OLD NEUTRAL',
    earthCoding: 'Must be clearly labelled at interface with new colours',
    labellingRequired: true,
    regulation: '514.3.2 - Caution label required at changeover points'
  },
  {
    cableType: 'SWA (Steel Wire Armoured)',
    coreCoding: 'Cores numbered or coloured per cable schedule',
    earthCoding: 'Armour can be used as CPC if adequately sized, must have earth banjo',
    labellingRequired: true,
    regulation: '514.3 + 543.3'
  }
];

// ============ EXTERNAL INFLUENCES (Section 522) ============

export interface ExternalInfluenceProtection {
  influence: string;
  code: string;
  protection: string;
  regulation: string;
}

export const EXTERNAL_INFLUENCE_PROTECTIONS: ExternalInfluenceProtection[] = [
  {
    influence: 'Impact - Medium severity (AG2)',
    code: 'AG2',
    protection: 'Steel conduit, steel trunking, SWA cable, or impact-resistant trunking',
    regulation: '522.6.2'
  },
  {
    influence: 'Impact - High severity (AG3)',
    code: 'AG3',
    protection: 'Heavy-duty steel conduit, buried cable, or concrete/steel enclosures',
    regulation: '522.6.2'
  },
  {
    influence: 'Presence of water (AD4 - splashing)',
    code: 'AD4',
    protection: 'IP44 minimum enclosures, outdoor-rated cable glands',
    regulation: '522.3.1'
  },
  {
    influence: 'Presence of water (AD6 - waves)',
    code: 'AD6',
    protection: 'IP67 minimum, additional mechanical protection against wave action',
    regulation: '522.3.3'
  },
  {
    influence: 'Corrosive substances (AF2)',
    code: 'AF2',
    protection: 'PVC/LSF sheathed cables, corrosion-resistant conduit, plastic trunking',
    regulation: '522.5.1'
  },
  {
    influence: 'Underground burial',
    code: 'AD8',
    protection: 'SWA cable with earthed armour, min 600mm depth, warning tape above',
    regulation: '522.8.10'
  },
  {
    influence: 'Vibration (AH2)',
    code: 'AH2',
    protection: 'Flexible cable connections, anti-vibration mounts, locking terminal arrangements',
    regulation: '522.7 + 526.2(vi)'
  },
  {
    influence: 'Solar radiation / UV (AN2)',
    code: 'AN2',
    protection: 'UV-stabilised cable sheath, conduit, or shielding from direct sunlight',
    regulation: '522.11.1'
  }
];

// ============ MINIMUM CABLE SIZES (Table 52.3) ============

export interface MinimumCableSize {
  wiringType: string;
  circuitUse: string;
  material: 'copper' | 'aluminium';
  minCSA: number; // mm²
  regulation: string;
  notes?: string;
}

export const MINIMUM_CABLE_SIZES: MinimumCableSize[] = [
  {
    wiringType: 'Non-sheathed and sheathed cables',
    circuitUse: 'Lighting and power circuits',
    material: 'copper',
    minCSA: 1.0,
    regulation: 'Table 52.3',
    notes: 'Standard fixed wiring minimum'
  },
  {
    wiringType: 'Non-sheathed and sheathed cables',
    circuitUse: 'Lighting and power circuits',
    material: 'aluminium',
    minCSA: 16,
    regulation: 'Table 52.3',
    notes: 'Aluminium requires larger CSA than copper'
  },
  {
    wiringType: 'Non-sheathed and sheathed cables',
    circuitUse: 'Signalling and control circuits',
    material: 'copper',
    minCSA: 0.5,
    regulation: 'Table 52.3',
    notes: 'Control circuits can use 0.5mm²'
  },
  {
    wiringType: 'Bare conductors',
    circuitUse: 'Power circuits',
    material: 'copper',
    minCSA: 10,
    regulation: 'Table 52.3',
    notes: 'Bare busbars - rarely used in typical installations'
  },
  {
    wiringType: 'Flexible cables',
    circuitUse: 'General use',
    material: 'copper',
    minCSA: 0.75,
    regulation: 'Table 52.3',
    notes: 'Flexible cables for portable equipment'
  }
];

// ============ UTILITY FUNCTIONS ============

export function getCableSupportInterval(
  cableType: string, 
  orientation: 'horizontal' | 'vertical'
): CableSupportInterval | undefined {
  return CABLE_SUPPORT_INTERVALS.find(
    s => s.cableType === cableType && s.orientation === orientation
  );
}

export function getExternalInfluenceProtection(code: string): ExternalInfluenceProtection | undefined {
  return EXTERNAL_INFLUENCE_PROTECTIONS.find(p => p.code === code);
}

export function getTerminationGuidance(conductorType: string): TerminationGuidance | undefined {
  return TERMINATION_GUIDANCE.find(t => t.conductorType.includes(conductorType));
}

export function validateCableDepth(
  depth: number, 
  isInSafeZone: boolean
): { compliant: boolean; requiresRCD: boolean; reasoning: string } {
  if (depth >= 50) {
    return {
      compliant: true,
      requiresRCD: false,
      reasoning: 'Cable depth ≥50mm - compliant per Reg 522.6.202'
    };
  }
  
  if (isInSafeZone) {
    return {
      compliant: true,
      requiresRCD: true,
      reasoning: 'Cable <50mm but in safe zone - RCD protection required per Reg 522.6.202'
    };
  }
  
  return {
    compliant: false,
    requiresRCD: true,
    reasoning: 'Cable <50mm and outside safe zone - RCD + mechanical protection required per Reg 522.6.202'
  };
}

export function getMinimumCableSize(
  circuitUse: string,
  material: 'copper' | 'aluminium' = 'copper'
): number {
  const match = MINIMUM_CABLE_SIZES.find(
    m => m.circuitUse.toLowerCase().includes(circuitUse.toLowerCase()) && m.material === material
  );
  return match?.minCSA || 1.5; // Default to 1.5mm² if not found
}
