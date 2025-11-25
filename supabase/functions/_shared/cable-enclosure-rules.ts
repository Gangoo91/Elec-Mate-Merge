/**
 * BS 7671 Compliant Cable and Enclosure Selection Rules
 * 
 * Priority Hierarchy:
 * 1. Circuit-Type Rules (highest) - Mandatory for safety-critical circuits
 * 2. Special Location Rules - Based on environmental conditions
 * 3. Environment Rules (lowest) - Default domestic/commercial/industrial standards
 */

// ============================================================================
// PRIORITY 1: CIRCUIT-TYPE CABLE RULES (ALWAYS APPLIED)
// ============================================================================

export interface CircuitTypeCableRule {
  mandatoryCableTypes: string[];
  reason: string;
  overridesEnvironment: boolean;
  bsReference: string;
}

export const CIRCUIT_TYPE_CABLE_RULES: Record<string, CircuitTypeCableRule> = {
  'emergency-lighting': {
    mandatoryCableTypes: ['FP200', 'FP400', 'MICC'],
    reason: 'Emergency lighting must maintain circuit integrity during fire',
    overridesEnvironment: true,
    bsReference: 'BS 5266-1'
  },
  'fire-alarm': {
    mandatoryCableTypes: ['FP200', 'FP400', 'MICC'],
    reason: 'Fire alarm circuits require fire-resistant cables',
    overridesEnvironment: true,
    bsReference: 'BS 5839-1'
  },
  'smoke-detection': {
    mandatoryCableTypes: ['FP200', 'FP400'],
    reason: 'Detection circuits must survive fire conditions',
    overridesEnvironment: true,
    bsReference: 'BS 5839-1'
  },
  'sprinkler-system': {
    mandatoryCableTypes: ['FP200', 'FP400', 'MICC'],
    reason: 'Sprinkler pump/control circuits require fire survival',
    overridesEnvironment: true,
    bsReference: 'BS EN 12845'
  },
  'fire-suppression': {
    mandatoryCableTypes: ['FP200', 'FP400', 'MICC'],
    reason: 'Fire suppression systems require fire-rated cables',
    overridesEnvironment: true,
    bsReference: 'BS 7671 Reg 560.8'
  }
};

// ============================================================================
// PRIORITY 2: SPECIAL LOCATION CABLE RULES
// ============================================================================

export interface SpecialLocationRule {
  domesticCables?: string[];
  commercialCables?: string[];
  industrialCables?: string[];
  allEnvironments?: string[];
  preferredCables?: string[];
  reason: string;
  bsReference: string;
  notes?: string;
  additionalRequirements?: string[];
}

export const SPECIAL_LOCATION_CABLE_RULES: Record<string, SpecialLocationRule> = {
  'outdoor': {
    allEnvironments: ['SWA'],
    reason: 'Protection from external influences and mechanical damage',
    bsReference: 'BS 7671 Reg 522.8',
    notes: 'UV-resistant outer sheath required for exposed installations'
  },
  'underground': {
    allEnvironments: ['SWA'],
    additionalRequirements: [
      'Warning tape 150mm above cable',
      'Marker posts at route changes',
      '450mm minimum depth for light traffic areas',
      '750mm minimum depth under roads'
    ],
    reason: 'Buried cables require armoured protection',
    bsReference: 'BS 7671 Reg 522.8.10'
  },
  'bathroom': {
    domesticCables: ['twin and earth'],
    commercialCables: ['LSZH single'],
    notes: 'Cable route should avoid zones where possible. Supplementary bonding may be required.',
    reason: 'Special considerations for locations containing bath or shower',
    bsReference: 'BS 7671 Section 701'
  },
  'high-temperature': {
    preferredCables: ['XLPE', 'MICC', 'SWA-XLPE'],
    reason: 'Standard PVC insulation limited to 70°C conductor temperature',
    bsReference: 'BS 7671 Reg 523.1',
    notes: 'XLPE rated to 90°C, MICC rated to 250°C'
  },
  'agricultural': {
    allEnvironments: ['SWA'],
    reason: 'Protection from mechanical damage and moisture ingress',
    bsReference: 'BS 7671 Section 705',
    additionalRequirements: ['RCD protection mandatory', 'Regular inspection required']
  },
  'swimming-pool': {
    preferredCables: ['LSZH single in steel conduit', 'SWA'],
    reason: 'Protection from moisture and reduced earth fault loop impedance',
    bsReference: 'BS 7671 Section 702',
    notes: 'Zone restrictions apply. SELV systems required in zones 0 and 1.'
  }
};

// ============================================================================
// PRIORITY 3: ENVIRONMENT-BASED CABLE RULES (DEFAULT)
// ============================================================================

export interface EnvironmentCableRule {
  internal?: {
    standard: string;
    alternatives?: string[];
    sizes?: string[];
    reason?: string;
  };
  external?: {
    standard: string;
    reason: string;
  };
  fireCritical?: {
    standard: string;
    reason: string;
  };
  standard?: string;
  alternatives?: string[];
  heavyDuty?: string;
  reason?: string;
}

export const ENVIRONMENT_CABLE_RULES: Record<string, EnvironmentCableRule> = {
  'domestic': {
    internal: {
      standard: 'twin and earth',
      sizes: ['1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²'],
      reason: 'Cost-effective and suitable for domestic installations'
    },
    external: {
      standard: 'SWA',
      reason: 'Mechanical protection required for external runs'
    }
  },
  'commercial': {
    internal: {
      standard: 'LSZH single in trunking/conduit',
      alternatives: ['SWA for sub-mains', 'FP200/FP400 for fire circuits'],
      reason: 'Low smoke emission required in occupied buildings'
    },
    fireCritical: {
      standard: 'FP200 or FP400',
      reason: 'Fire circuit integrity per BS 5839-1'
    }
  },
  'industrial': {
    standard: 'SWA',
    alternatives: ['LSZH single in heavy-duty steel conduit for fixed machinery'],
    heavyDuty: 'armoured flex for moving machinery',
    reason: 'Mechanical protection in industrial environments'
  }
};

// ============================================================================
// CABLE TYPE → ENCLOSURE MAPPING
// ============================================================================

export interface CableEnclosureMapping {
  indoorOptions: string[];
  outdoorOptions: string[];
  enclosureRequired: boolean;
  reason: string;
  notes?: string;
  additionalRequirements?: string[];
}

export const CABLE_ENCLOSURE_RULES: Record<string, CableEnclosureMapping> = {
  'twin and earth': {
    indoorOptions: ['clipped direct', 'in PVC conduit', 'in mini trunking'],
    outdoorOptions: ['in PVC conduit (IP65)'],
    enclosureRequired: false,
    reason: 'T&E can be clipped direct in dry indoor locations',
    notes: 'Should not be exposed to mechanical damage. Not recommended outdoors - use SWA instead.'
  },
  'SWA': {
    indoorOptions: ['clipped direct', 'on cable tray', 'on cable ladder'],
    outdoorOptions: ['clipped direct with cable glands', 'buried direct'],
    enclosureRequired: false,
    reason: 'SWA provides its own mechanical protection via steel wire armour',
    notes: 'No conduit or trunking needed. Armour provides earth continuity.'
  },
  'LSZH single': {
    indoorOptions: ['in steel conduit', 'in metal trunking', 'on cable basket', 'on cable tray'],
    outdoorOptions: ['in weatherproof steel conduit'],
    enclosureRequired: true,
    reason: 'Single core cables must be enclosed together to prevent electromagnetic effects',
    notes: 'BS 7671 Reg 521.5.1 - singles must be grouped together',
    additionalRequirements: ['All phases and neutral must be enclosed together']
  },
  'FP200': {
    indoorOptions: ['clipped direct with fire-rated clips', 'in steel trunking'],
    outdoorOptions: ['not recommended for outdoor use'],
    enclosureRequired: false,
    reason: 'Fire-rated cable provides 2 hours fire survival',
    notes: 'Must use fire-rated fixings per BS 5839-1',
    additionalRequirements: ['Fire-stopping at compartment boundaries', 'Segregation from other circuits']
  },
  'FP400': {
    indoorOptions: ['clipped direct with fire-rated clips', 'in steel trunking'],
    outdoorOptions: ['not recommended for outdoor use'],
    enclosureRequired: false,
    reason: 'Enhanced fire-rated cable provides 2 hours fire survival plus mechanical protection',
    notes: 'Must use fire-rated fixings per BS 5839-1',
    additionalRequirements: ['Fire-stopping at compartment boundaries', 'Segregation from other circuits']
  },
  'MICC': {
    indoorOptions: ['clipped direct with pyrotenax clips'],
    outdoorOptions: ['clipped direct with appropriate glands'],
    enclosureRequired: false,
    reason: 'Mineral insulated cable is self-supporting and inherently fire-rated',
    notes: 'Excellent fire performance, rated to 250°C conductor temperature'
  },
  'XLPE': {
    indoorOptions: ['clipped direct', 'on cable tray', 'in conduit'],
    outdoorOptions: ['clipped direct', 'buried direct'],
    enclosureRequired: false,
    reason: 'XLPE insulation rated to 90°C, suitable for high-temperature applications',
    notes: 'Often used in industrial applications requiring higher operating temperatures'
  }
};

// ============================================================================
// ENVIRONMENT → ENCLOSURE PREFERENCES
// ============================================================================

export interface EnvironmentEnclosureRule {
  preferredMethods: string[];
  ceilingVoid?: string;
  surface?: string;
  officeFit?: string;
  suspendedCeiling?: string;
  highRisk?: string;
  separation?: string;
  reason?: string;
}

export const ENVIRONMENT_ENCLOSURE_RULES: Record<string, EnvironmentEnclosureRule> = {
  'domestic': {
    preferredMethods: ['clipped direct', 'in PVC conduit', 'in mini trunking'],
    ceilingVoid: 'clipped direct in accessible voids',
    surface: 'mini trunking or surface-mounted PVC conduit',
    reason: 'Cost-effective methods suitable for domestic installations'
  },
  'commercial': {
    preferredMethods: ['in steel trunking', 'on cable tray', 'in metal conduit'],
    officeFit: 'dado trunking for floor boxes and power distribution',
    suspendedCeiling: 'cable tray above false ceiling with accessible drop rods',
    reason: 'Fire-rated containment systems for commercial buildings'
  },
  'industrial': {
    preferredMethods: ['cable tray', 'cable ladder', 'heavy-duty steel conduit'],
    highRisk: 'galvanised steel trunking with IP54+ ratings',
    reason: 'Robust containment for harsh industrial environments'
  },
  'data-centre': {
    preferredMethods: ['cable tray', 'cable basket', 'raised floor containment'],
    separation: 'Power and data must be segregated per TIA-942 standards',
    reason: 'High-density cable management with cooling considerations'
  },
  'healthcare': {
    preferredMethods: ['steel trunking', 'cable tray with covers'],
    reason: 'Cleanable containment systems for hygiene-critical areas',
    separation: 'Medical equipment circuits segregated from general power'
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Detects if a circuit is a fire/emergency circuit from load type or description
 */
export function detectFireEmergencyCircuit(loadType: string, description?: string): string | null {
  const lowerLoad = loadType.toLowerCase();
  const lowerDesc = (description || '').toLowerCase();
  const combined = `${lowerLoad} ${lowerDesc}`;

  if (combined.includes('emergency') && combined.includes('light')) return 'emergency-lighting';
  if (combined.includes('fire') && combined.includes('alarm')) return 'fire-alarm';
  if (combined.includes('smoke') && (combined.includes('detect') || combined.includes('alarm'))) return 'smoke-detection';
  if (combined.includes('sprinkler')) return 'sprinkler-system';
  if (combined.includes('fire') && combined.includes('suppress')) return 'fire-suppression';

  return null;
}

/**
 * Detects special location from description or tags
 */
export function detectSpecialLocation(description: string, tags?: string[]): string | null {
  const lowerDesc = description.toLowerCase();
  const allTags = (tags || []).map(t => t.toLowerCase()).join(' ');
  const combined = `${lowerDesc} ${allTags}`;

  if (combined.includes('outdoor') || combined.includes('external') || combined.includes('outside')) return 'outdoor';
  if (combined.includes('underground') || combined.includes('buried')) return 'underground';
  if (combined.includes('bathroom') || combined.includes('shower')) return 'bathroom';
  if (combined.includes('high temp') || combined.includes('hot')) return 'high-temperature';
  if (combined.includes('farm') || combined.includes('agricultural')) return 'agricultural';
  if (combined.includes('pool') || combined.includes('swimming')) return 'swimming-pool';

  return null;
}

/**
 * Get recommended cable types based on priority rules
 */
export function getRecommendedCableTypes(
  installationType: string,
  loadType: string,
  description?: string,
  tags?: string[]
): { cableTypes: string[]; reason: string; bsReference?: string; priority: 'circuit-type' | 'special-location' | 'environment' } {
  // Priority 1: Circuit-Type Rules
  const circuitType = detectFireEmergencyCircuit(loadType, description);
  if (circuitType && CIRCUIT_TYPE_CABLE_RULES[circuitType]) {
    const rule = CIRCUIT_TYPE_CABLE_RULES[circuitType];
    return {
      cableTypes: rule.mandatoryCableTypes,
      reason: rule.reason,
      bsReference: rule.bsReference,
      priority: 'circuit-type'
    };
  }

  // Priority 2: Special Location Rules
  const specialLocation = detectSpecialLocation(description || '', tags);
  if (specialLocation && SPECIAL_LOCATION_CABLE_RULES[specialLocation]) {
    const rule = SPECIAL_LOCATION_CABLE_RULES[specialLocation];
    if (rule.allEnvironments) {
      return {
        cableTypes: rule.allEnvironments,
        reason: rule.reason,
        bsReference: rule.bsReference,
        priority: 'special-location'
      };
    }
    // Get environment-specific cables for special location
    const envKey = `${installationType.toLowerCase()}Cables` as keyof SpecialLocationRule;
    if (rule[envKey] && Array.isArray(rule[envKey])) {
      return {
        cableTypes: rule[envKey] as string[],
        reason: rule.reason,
        bsReference: rule.bsReference,
        priority: 'special-location'
      };
    }
  }

  // Priority 3: Environment-Based Rules (Default)
  const envRule = ENVIRONMENT_CABLE_RULES[installationType.toLowerCase()];
  if (envRule) {
    if (envRule.internal) {
      return {
        cableTypes: [envRule.internal.standard, ...(envRule.internal.alternatives || [])],
        reason: envRule.internal.reason || 'Standard installation practice',
        priority: 'environment'
      };
    }
    if (envRule.standard) {
      return {
        cableTypes: [envRule.standard, ...(envRule.alternatives || [])],
        reason: envRule.reason || 'Standard installation practice',
        priority: 'environment'
      };
    }
  }

  // Fallback
  return {
    cableTypes: ['twin and earth', 'LSZH single', 'SWA'],
    reason: 'General purpose cables',
    priority: 'environment'
  };
}

/**
 * Get recommended enclosure based on cable type and environment
 */
export function getRecommendedEnclosure(
  cableType: string,
  environment: string,
  isOutdoor: boolean = false
): { enclosure: string; enclosureRequired: boolean; reason: string; notes?: string } {
  const cableRule = CABLE_ENCLOSURE_RULES[cableType];
  const envRule = ENVIRONMENT_ENCLOSURE_RULES[environment.toLowerCase()];

  if (!cableRule) {
    return {
      enclosure: 'clipped direct',
      enclosureRequired: false,
      reason: 'Unknown cable type - default to clipped direct'
    };
  }

  // If cable doesn't require enclosure (SWA, MICC, FP cables)
  if (!cableRule.enclosureRequired) {
    const option = isOutdoor ? cableRule.outdoorOptions[0] : cableRule.indoorOptions[0];
    return {
      enclosure: option,
      enclosureRequired: false,
      reason: cableRule.reason,
      notes: cableRule.notes
    };
  }

  // Cable requires enclosure (LSZH singles)
  if (envRule && envRule.preferredMethods.length > 0) {
    return {
      enclosure: envRule.preferredMethods[0],
      enclosureRequired: true,
      reason: `${cableRule.reason}. ${envRule.reason || ''}`,
      notes: cableRule.notes
    };
  }

  // Default enclosure based on cable rules
  const options = isOutdoor ? cableRule.outdoorOptions : cableRule.indoorOptions;
  return {
    enclosure: options[0],
    enclosureRequired: true,
    reason: cableRule.reason,
    notes: cableRule.notes
  };
}
