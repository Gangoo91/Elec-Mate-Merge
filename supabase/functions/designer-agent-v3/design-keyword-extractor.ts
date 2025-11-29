/**
 * Comprehensive Design Keyword Extraction for Circuit Designer
 * 400+ keywords across 12 categories for domestic, commercial, and industrial installations
 */

import type { NormalizedInputs } from './types.ts';

// ============================================================================
// LOAD TYPE MAPPING (Frontend → Database)
// ============================================================================

// Map frontend loadType values to database load_types values
const LOAD_TYPE_MAPPING: Record<string, string[]> = {
  'cooker': ['general', 'heating', 'resistive'],
  'shower': ['general', 'heating', 'resistive loads'],
  'socket': ['socket', 'sockets', 'general'],
  'socket-ring': ['socket', 'sockets', 'general'],
  'ring': ['socket', 'sockets', 'general'],
  'lighting': ['lighting', 'general'],
  'ev': ['electric_vehicle_charger', 'electric vehicle charging'],
  'ev-charger': ['electric_vehicle_charger', 'electric vehicle charging'],
  'charger': ['electric_vehicle_charger', 'electric vehicle charging'],
  'immersion': ['heating', 'general', 'resistive'],
  'motor': ['motor', 'motors'],
  'pump': ['motor', 'motors'],
  'fan': ['motor', 'motors'],
  'smoke': ['general', 'control circuits'],
  'fire': ['general', 'control circuits'],
  'general': ['general', 'general loads', 'general circuits'],
};

/**
 * Map frontend loadType to database load_types values
 */
function mapLoadTypeToDatabase(frontendLoadType: string): string[] {
  // Check each mapping key for partial match
  for (const [key, dbValues] of Object.entries(LOAD_TYPE_MAPPING)) {
    if (frontendLoadType.includes(key)) {
      return dbValues;
    }
  }
  // Fallback to general
  return ['general', 'general loads'];
}

// ============================================================================
// COMPREHENSIVE DESIGN KEYWORD MAPS (400+ keywords across 12 categories)
// ============================================================================

// 1️⃣ CALCULATION KEYWORDS (50+ keywords)
const CALCULATION_KEYWORDS = {
  current_relationships: ['Ib', 'In', 'Iz', 'I2', 'design current', 'rated current', 
    'tabulated current', 'fusing current', 'Ib ≤ In', 'In ≤ Iz', 'I2 ≤ 1.45 Iz', '433.1.1'],
  voltage_drop: ['voltage drop', 'mV/A/m', 'volt drop', '3%', '5%', 'percentage drop',
    'Table 4D1B', 'Table 4D2B', 'voltage drop calculation', 'line voltage', 'phase voltage'],
  impedance: ['Zs', 'Ze', 'R1', 'R2', 'R1+R2', 'earth fault loop', 'loop impedance',
    'earth-fault loop impedance', 'external earth fault loop', 'Table 41.2', 'Table 41.3', 'Table 41.4'],
  disconnection: ['disconnection time', '0.4s', '5s', '0.2s', 'automatic disconnection',
    '411.3.2', '411.3.3', 'fault protection', 'maximum Zs'],
  fault_current: ['PFC', 'PSCC', 'prospective fault current', 'prospective short circuit',
    'breaking capacity', 'fault level', 'short-circuit current', 'Icn', 'Ics'],
  correction_factors: ['Ca', 'Cg', 'Ci', 'Cf', 'correction factor', 'derating factor',
    'ambient temperature', 'grouping factor', 'thermal insulation', 'soil thermal resistivity']
};

// 2️⃣ CABLE SELECTION KEYWORDS (60+ keywords)
const CABLE_SELECTION_KEYWORDS = {
  sizing_tables: ['cable sizing', 'current-carrying capacity', 'Table 4D1A', 'Table 4D2A',
    'Table 4D5', 'Table 4E1A', 'Table 4E2A', 'tabulated current', 'base current rating', 'Ic'],
  installation_methods: ['installation method', 'reference method', 'reference method A',
    'reference method B', 'reference method C', 'clipped direct', 'enclosed', 'free air',
    'buried direct', 'in conduit', 'in trunking', 'on tray', 'on ladder'],
  domestic_cables: ['twin and earth', 'T&E', '6242Y', '6243Y', 'flat twin', 'three-core',
    'PVC', 'thermoplastic', 'domestic cable', 'house wiring'],
  commercial_cables: ['LSZH', 'LSF', 'low smoke', 'halogen free', 'singles in conduit',
    'singles in trunking', 'SY cable', 'CY cable', 'data cable'],
  industrial_cables: ['SWA', 'armoured cable', 'steel wire armoured', 'XLPE', 'thermosetting',
    'EPR', 'mineral insulated', 'MICC', 'fire resistant', 'FP200', 'FP400'],
  cable_sizes: ['1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²',
    '50mm²', '70mm²', '95mm²', '120mm²', '150mm²', '185mm²', '240mm²', '300mm²']
};

// 3️⃣ PROTECTION DEVICE KEYWORDS (50+ keywords)
const PROTECTION_KEYWORDS = {
  device_types: ['MCB', 'RCBO', 'RCD', 'MCCB', 'fuse', 'BS 88', 'BS 3036', 'BS EN 60898',
    'protective device', 'overcurrent protection', 'circuit breaker'],
  characteristics: ['Type B', 'Type C', 'Type D', 'characteristic', 'tripping curve',
    'instantaneous trip', 'magnetic trip', 'thermal trip', 'time-current'],
  ratings: ['6A', '10A', '16A', '20A', '25A', '32A', '40A', '45A', '50A', '63A', '80A', '100A'],
  rcd_types: ['30mA', '100mA', '300mA', 'Type A', 'Type AC', 'Type B', 'Type F',
    'RCD protection', '411.3.3', 'additional protection', 'fault protection'],
  coordination: ['discrimination', 'selectivity', 'backup protection', 'coordination',
    'breaking capacity', 'Icn', 'Ics', 'Icu', 'I2t', 'let-through energy']
};

// 4️⃣ EARTHING SYSTEM KEYWORDS (40+ keywords)
const EARTHING_KEYWORDS = {
  systems: ['TN-S', 'TN-C-S', 'TT', 'IT', 'PME', 'earthing system', 'supply earthing',
    'protective multiple earthing', 'separate earth', 'combined earth neutral'],
  components: ['MET', 'main earthing terminal', 'earth bar', 'protective conductor', 'CPC',
    'circuit protective conductor', 'bonding conductor', 'main bonding', 'supplementary bonding'],
  values: ['Ze', 'external earth', '0.35Ω', '0.8Ω', '21Ω', 'earth electrode', 'earth resistance',
    'Ra', 'electrode resistance', 'maximum Ze'],
  regulations: ['Chapter 54', '411', '542', '543', '544', 'protective conductors', 'earthing arrangements']
};

// 5️⃣ DIVERSITY KEYWORDS (30+ keywords)
const DIVERSITY_KEYWORDS = {
  general: ['diversity', 'diversity factor', 'maximum demand', 'Table 4A', 'simultaneity',
    'demand factor', 'load factor', 'connected load', 'design demand'],
  cooker: ['cooker diversity', '10A + 30%', 'first 10A', 'remainder at 30%',
    'cooking appliance diversity', 'Table 4A cooker'],
  socket: ['socket diversity', '100% first circuit', '40% remaining', 'ring circuit diversity',
    'radial diversity'],
  lighting: ['lighting diversity', '66% demand', 'lighting load', 'lighting calculation'],
  heating: ['heating diversity', 'space heating', 'water heating', 'immersion diversity']
};

// 6️⃣ DOMESTIC SECTOR KEYWORDS (40+ keywords)
const DOMESTIC_KEYWORDS = {
  general: ['domestic', 'dwelling', 'house', 'flat', 'residential', 'home', 'Part P',
    'notifiable work', 'Building Regulations', 'domestic installation'],
  equipment: ['consumer unit', 'split load', 'dual RCD', 'main switch', 'RCBO board',
    'garage unit', 'shed supply'],
  circuits: ['ring final', 'radial socket', 'lighting circuit', 'cooker circuit',
    'shower circuit', 'immersion circuit', 'smoke alarm', 'EV charger'],
  wiring: ['clipped direct', 'surface wiring', 'concealed wiring', 'PVC conduit',
    'mini trunking', 'capping', 'cable zones']
};

// 7️⃣ COMMERCIAL SECTOR KEYWORDS (40+ keywords)
const COMMERCIAL_KEYWORDS = {
  general: ['commercial', 'office', 'retail', 'shop', 'business premises', 'workplace',
    'commercial installation', 'non-domestic'],
  equipment: ['distribution board', 'three-phase board', 'sub-distribution', 'busbar',
    'busbar trunking', 'rising main', 'sub-main'],
  circuits: ['sub-main', 'final circuit', 'lighting distribution', 'power distribution',
    'small power', 'dedicated circuit', 'UPS circuit'],
  wiring: ['steel trunking', 'metal conduit', 'cable tray', 'cable basket', 'dado trunking',
    'floor boxes', 'containment system', 'LSZH singles']
};

// 8️⃣ INDUSTRIAL SECTOR KEYWORDS (50+ keywords)
const INDUSTRIAL_KEYWORDS = {
  general: ['industrial', 'factory', 'warehouse', 'manufacturing', 'plant', 'workshop',
    'industrial installation', 'heavy industry'],
  equipment: ['motor control centre', 'MCC', 'switchgear', 'switchboard', 'panel board',
    'variable speed drive', 'VSD', 'VFD', 'soft starter'],
  motors: ['motor circuit', 'DOL', 'direct on line', 'star-delta', 'motor starter',
    'contactor', 'overload relay', 'motor protection', 'starting current', 'FLC'],
  distribution: ['HV/LV', 'transformer', 'busbar chamber', 'ring main', 'radial feed',
    'network distribution'],
  wiring: ['SWA', 'armoured cable', 'cable ladder', 'heavy-duty trunking', 'galvanised conduit',
    'cable management system', 'marshalling box', 'junction chamber']
};

// 9️⃣ LOAD TYPE KEYWORDS (70+ keywords)
const LOAD_TYPE_KEYWORDS = {
  cooker: ['cooker', 'cooking appliance', 'hob', 'oven', 'range', 'cooker control unit',
    '32A cooker', '45A cooker', '6mm² cooker', '10mm² cooker', 'cooker circuit'],
  shower: ['shower', 'electric shower', 'instantaneous', 'shower unit', '8.5kW', '9.5kW', '10.5kW',
    '40A shower', '45A shower', '6mm² shower', '10mm² shower', 'continuous load'],
  socket: ['socket', 'socket outlet', 'socket circuit', 'ring final', 'radial', '32A ring',
    '20A radial', '2.5mm² socket', 'spur', 'fused spur', 'unfused spur', 'non-fused spur'],
  lighting: ['lighting', 'lighting circuit', '6A lighting', '10A lighting', '1.5mm² lighting',
    'downlight', 'LED', 'luminaire', 'emergency lighting', 'maintained', 'non-maintained'],
  ev_charging: ['EV', 'electric vehicle', 'charger', 'EVCP', '32A charger', '7kW', '22kW',
    'Mode 3', 'Type 2', 'PME at risk', 'Section 722'],
  immersion: ['immersion', 'immersion heater', 'water heater', '16A immersion', '3kW',
    'cylinder', 'unvented cylinder', 'DP switch'],
  smoke_detection: ['smoke alarm', 'smoke detector', 'fire detection', 'interlinked',
    'mains powered', 'BS 5839-6', 'Grade D1', 'LD2']
};

// 🔟 SPECIAL LOCATIONS KEYWORDS (50+ keywords)
const SPECIAL_LOCATIONS_KEYWORDS = {
  bathroom: ['bathroom', 'Section 701', 'Zone 0', 'Zone 1', 'Zone 2', 'outside zones',
    'IP44', 'IP65', 'SELV', 'supplementary bonding', '30mA RCD', 'wet location'],
  outdoor: ['outdoor', 'external', 'garden', 'Section 714', 'IP65', 'IP66', 'weatherproof',
    'UV resistant', 'underground', 'buried cable', 'warning tape'],
  ev_charging_location: ['EV installation', 'Section 722', 'charging point', 'PME',
    'TT earthing', 'earth electrode', 'protective equipotential bonding'],
  swimming_pool: ['swimming pool', 'Section 702', 'Zone 0', 'Zone 1', 'Zone 2', 'SELV', 'PELV'],
  agricultural: ['agricultural', 'Section 705', 'farm', 'livestock', 'equipotential bonding']
};

// 1️⃣1️⃣ ENCLOSURE & CONTAINMENT KEYWORDS (30+ keywords)
const ENCLOSURE_KEYWORDS = {
  domestic: ['clipped direct', 'surface wiring', 'mini trunking', 'PVC conduit', 'oval conduit',
    'capping', 'concealed', 'chased'],
  commercial: ['steel trunking', 'metal conduit', 'cable tray', 'cable basket', 'dado trunking',
    'skirting trunking', 'floor trunking', 'underfloor'],
  industrial: ['cable ladder', 'heavy-duty tray', 'galvanised trunking', 'IP54', 'IP65',
    'weatherproof enclosure', 'marshalling', 'gland plate']
};

// 1️⃣2️⃣ THREE-PHASE KEYWORDS (30+ keywords)
const THREE_PHASE_KEYWORDS = {
  basics: ['three-phase', '3-phase', '400V', '415V', 'line voltage', 'phase voltage',
    'L1 L2 L3', 'neutral', '√3', '1.732', 'three phase supply'],
  distribution: ['three-phase board', 'TP&N', 'TPN', 'balanced load', 'phase balance',
    'neutral current', 'phase rotation', 'phase sequence'],
  calculations: ['line current', 'phase current', 'three-phase power', 'kVA', 'kW',
    'power factor', 'cos φ', 'three-phase voltage drop']
};

/**
 * Extract comprehensive design keywords from circuit inputs
 * Returns 50-150+ targeted keywords per job
 */
export function extractDesignKeywords(
  circuits: any[],
  supply: any,
  projectInfo?: any
): {
  keywords: Set<string>;
  loadTypes: Set<string>;
  cableSizes: Set<string>;
} {
  const keywords = new Set<string>();
  const loadTypes = new Set<string>();
  const cableSizes = new Set<string>();

  // Always include core calculation keywords
  Object.values(CALCULATION_KEYWORDS).forEach(group => 
    group.forEach(kw => keywords.add(kw))
  );

  // Always include cable selection fundamentals
  CABLE_SELECTION_KEYWORDS.sizing_tables.forEach(kw => keywords.add(kw));
  CABLE_SELECTION_KEYWORDS.installation_methods.forEach(kw => keywords.add(kw));

  // Always include protection fundamentals
  PROTECTION_KEYWORDS.device_types.forEach(kw => keywords.add(kw));
  PROTECTION_KEYWORDS.rcd_types.forEach(kw => keywords.add(kw));

  // Always include earthing fundamentals
  Object.values(EARTHING_KEYWORDS).forEach(group => 
    group.forEach(kw => keywords.add(kw))
  );

  // Add diversity keywords
  Object.values(DIVERSITY_KEYWORDS).forEach(group => 
    group.forEach(kw => keywords.add(kw))
  );

  // Detect installation type and add sector-specific keywords
  const installationType = detectInstallationType(circuits, projectInfo);
  
  if (installationType === 'domestic') {
    Object.values(DOMESTIC_KEYWORDS).forEach(group => 
      group.forEach(kw => keywords.add(kw))
    );
    CABLE_SELECTION_KEYWORDS.domestic_cables.forEach(kw => keywords.add(kw));
    Object.values(ENCLOSURE_KEYWORDS.domestic).forEach(kw => keywords.add(kw));
  } else if (installationType === 'commercial') {
    Object.values(COMMERCIAL_KEYWORDS).forEach(group => 
      group.forEach(kw => keywords.add(kw))
    );
    CABLE_SELECTION_KEYWORDS.commercial_cables.forEach(kw => keywords.add(kw));
    Object.values(ENCLOSURE_KEYWORDS.commercial).forEach(kw => keywords.add(kw));
  } else if (installationType === 'industrial') {
    Object.values(INDUSTRIAL_KEYWORDS).forEach(group => 
      group.forEach(kw => keywords.add(kw))
    );
    CABLE_SELECTION_KEYWORDS.industrial_cables.forEach(kw => keywords.add(kw));
    Object.values(ENCLOSURE_KEYWORDS.industrial).forEach(kw => keywords.add(kw));
  }

  // Add three-phase keywords if applicable
  if (supply.phases === 'three' || supply.phases === 3) {
    Object.values(THREE_PHASE_KEYWORDS).forEach(group => 
      group.forEach(kw => keywords.add(kw))
    );
  }

  // Process each circuit for load-specific keywords
  circuits.forEach(circuit => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    
    // Map frontend loadType to database values
    const mappedTypes = mapLoadTypeToDatabase(loadType);
    mappedTypes.forEach(dbType => loadTypes.add(dbType));

    // Load type specific keywords
    if (loadType.includes('cooker')) {
      LOAD_TYPE_KEYWORDS.cooker.forEach(kw => keywords.add(kw));
      DIVERSITY_KEYWORDS.cooker.forEach(kw => keywords.add(kw));
    }
    
    if (loadType.includes('shower')) {
      LOAD_TYPE_KEYWORDS.shower.forEach(kw => keywords.add(kw));
      keywords.add('continuous load');
      keywords.add('high current');
    }
    
    if (loadType.includes('socket') || loadType.includes('ring')) {
      LOAD_TYPE_KEYWORDS.socket.forEach(kw => keywords.add(kw));
      DIVERSITY_KEYWORDS.socket.forEach(kw => keywords.add(kw));
      keywords.add('ring final circuit');
      keywords.add('Appendix 15');
    }
    
    if (loadType.includes('lighting')) {
      LOAD_TYPE_KEYWORDS.lighting.forEach(kw => keywords.add(kw));
      DIVERSITY_KEYWORDS.lighting.forEach(kw => keywords.add(kw));
    }
    
    if (loadType.includes('ev') || loadType.includes('charger')) {
      LOAD_TYPE_KEYWORDS.ev_charging.forEach(kw => keywords.add(kw));
      SPECIAL_LOCATIONS_KEYWORDS.ev_charging_location.forEach(kw => keywords.add(kw));
    }
    
    if (loadType.includes('immersion')) {
      LOAD_TYPE_KEYWORDS.immersion.forEach(kw => keywords.add(kw));
    }
    
    if (loadType.includes('smoke') || loadType.includes('fire')) {
      LOAD_TYPE_KEYWORDS.smoke_detection.forEach(kw => keywords.add(kw));
    }

    // Special location keywords
    const specialLocation = circuit.specialLocation?.toLowerCase() || 'none';
    
    if (specialLocation === 'bathroom') {
      SPECIAL_LOCATIONS_KEYWORDS.bathroom.forEach(kw => keywords.add(kw));
    }
    
    if (specialLocation === 'outdoor') {
      SPECIAL_LOCATIONS_KEYWORDS.outdoor.forEach(kw => keywords.add(kw));
      keywords.add('buried cable');
      keywords.add('SWA');
    }
    
    if (specialLocation === 'swimming_pool') {
      SPECIAL_LOCATIONS_KEYWORDS.swimming_pool.forEach(kw => keywords.add(kw));
    }

    // Power-based keywords
    if (circuit.loadPower) {
      if (circuit.loadPower > 7000) {
        keywords.add('high power circuit');
        keywords.add('dedicated circuit');
      }
      if (circuit.loadPower >= 3000 && circuit.loadPower <= 7000) {
        keywords.add('medium power');
      }
    }

    // Cable length keywords (voltage drop)
    if (circuit.cableLength) {
      if (circuit.cableLength > 50) {
        keywords.add('voltage drop');
        keywords.add('long cable run');
        keywords.add('mV/A/m');
      }
      if (circuit.cableLength > 100) {
        keywords.add('voltage drop calculation');
      }
    }
  });

  // Add standard cable sizes with units for database matching
  ['1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²', 
   '50mm²', '70mm²', '95mm²', '120mm²', '150mm²', '185mm²', '240mm²'].forEach(size => 
    cableSizes.add(size)
  );

  return { keywords, loadTypes, cableSizes };
}

/**
 * Detect installation type from circuits
 */
function detectInstallationType(circuits: any[], projectInfo?: any): string {
  // Check project info first
  if (projectInfo?.installationType) {
    return projectInfo.installationType.toLowerCase();
  }

  // Detect from circuit characteristics
  const loadTypes = circuits.map(c => c.loadType?.toLowerCase() || '');
  
  // Industrial indicators
  if (loadTypes.some(lt => 
    lt.includes('motor') || 
    lt.includes('machinery') || 
    lt.includes('vsd') || 
    lt.includes('industrial')
  )) {
    return 'industrial';
  }
  
  // Commercial indicators
  if (loadTypes.some(lt => 
    lt.includes('office') || 
    lt.includes('retail') || 
    lt.includes('shop') || 
    lt.includes('commercial')
  )) {
    return 'commercial';
  }
  
  // Domestic indicators (default)
  if (loadTypes.some(lt => 
    lt.includes('cooker') || 
    lt.includes('shower') || 
    lt.includes('immersion') || 
    lt.includes('ring') || 
    lt.includes('socket')
  )) {
    return 'domestic';
  }
  
  // Default to domestic if unclear
  return 'domestic';
}
