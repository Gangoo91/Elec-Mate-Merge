import type { RoomType, PropertyType } from '@/types/siteVisit';

export type PromptInputType = 'select' | 'yes_no' | 'text';

export interface SmartPrompt {
  key: string;
  question: string;
  inputType: PromptInputType;
  options?: string[];
  scope: 'global' | 'room';
  /** If scope is 'room', which room types trigger this prompt */
  roomTypes?: RoomType[];
  /** Which property types this prompt applies to (undefined = all) */
  propertyTypes?: PropertyType[];
  helpText?: string;
}

// ============================================================
// Global prompts — shown once at top of Capture step
// ============================================================
export const GLOBAL_PROMPTS: SmartPrompt[] = [
  // All property types
  {
    key: 'cu_type',
    question: 'Consumer unit type?',
    inputType: 'select',
    options: [
      'Metal clad (BS EN 61439-3)',
      'Plastic (existing — to be replaced)',
      'Plastic (existing — acceptable)',
      'Split load',
      'Dual RCD',
      'RCBO board',
      'Unknown — needs inspection',
    ],
    scope: 'global',
    helpText: 'Current consumer unit in the property',
  },
  {
    key: 'earthing_arrangement',
    question: 'Earthing arrangement?',
    inputType: 'select',
    options: ['TN-C-S (PME)', 'TN-S', 'TT', 'Unknown'],
    scope: 'global',
    helpText: 'Check at the meter / intake position',
  },
  {
    key: 'asbestos_risk',
    question: 'Asbestos risk present?',
    inputType: 'select',
    options: ['No — confirmed', 'Possible — pre-2000 build', 'Yes — survey required', 'Unknown'],
    scope: 'global',
    helpText: 'Properties built before 2000 may contain asbestos',
  },
  {
    key: 'existing_rcd',
    question: 'Existing RCD protection?',
    inputType: 'select',
    options: ['Full RCBO protection', 'Dual RCD', 'Single RCD', 'None', 'Unknown'],
    scope: 'global',
    helpText: 'Current level of residual current protection',
  },
  {
    key: 'meter_location',
    question: 'Meter location?',
    inputType: 'select',
    options: [
      'Internal — hallway',
      'Internal — utility',
      'Internal — garage',
      'External — front',
      'External — side',
      'Other',
    ],
    scope: 'global',
  },

  // Commercial-specific global prompts
  {
    key: 'supply_type',
    question: 'Supply type?',
    inputType: 'select',
    options: ['Single phase', 'Three phase', 'Unknown'],
    scope: 'global',
    propertyTypes: ['commercial', 'industrial'],
    helpText: 'Main incoming supply configuration',
  },
  {
    key: 'number_of_phases',
    question: 'Number of phases?',
    inputType: 'select',
    options: ['1', '2', '3', 'Unknown'],
    scope: 'global',
    propertyTypes: ['commercial', 'industrial'],
  },
  {
    key: 'estimated_max_demand',
    question: 'Estimated max demand (kVA)?',
    inputType: 'text',
    scope: 'global',
    propertyTypes: ['commercial', 'industrial'],
    helpText: 'Approximate maximum demand in kVA',
  },
  {
    key: 'fire_alarm_system',
    question: 'Fire alarm system?',
    inputType: 'select',
    options: ['None', 'L1', 'L2', 'L3', 'L4', 'L5', 'LD1', 'LD2', 'LD3', 'Unknown'],
    scope: 'global',
    propertyTypes: ['commercial'],
    helpText: 'BS 5839-1 category classification',
  },
  {
    key: 'emergency_lighting_type',
    question: 'Emergency lighting type?',
    inputType: 'select',
    options: ['None', 'Maintained', 'Non-maintained', 'Combined', 'Unknown'],
    scope: 'global',
    propertyTypes: ['commercial'],
    helpText: 'BS 5266-1 emergency lighting provision',
  },
  {
    key: 'number_of_dbs',
    question: 'Number of distribution boards?',
    inputType: 'text',
    scope: 'global',
    propertyTypes: ['commercial', 'industrial'],
    helpText: 'Total DBs including sub-distribution',
  },

  // Industrial-specific global prompts
  {
    key: 'hazardous_area_zones',
    question: 'Hazardous area zones?',
    inputType: 'select',
    options: ['None', 'Zone 0', 'Zone 1', 'Zone 2', 'Zone 20', 'Zone 21', 'Zone 22'],
    scope: 'global',
    propertyTypes: ['industrial'],
    helpText: 'BS EN 60079-10 hazardous area classification',
  },
  {
    key: 'atex_rating',
    question: 'ATEX rating?',
    inputType: 'select',
    options: ['Not required', 'Category 1', 'Category 2', 'Category 3', 'TBC'],
    scope: 'global',
    propertyTypes: ['industrial'],
    helpText: 'ATEX Directive 2014/34/EU equipment category',
  },
  {
    key: 'ip_rating_requirement',
    question: 'IP rating requirement?',
    inputType: 'select',
    options: ['IP20', 'IP44', 'IP55', 'IP65', 'IP66', 'IP67', 'IP68'],
    scope: 'global',
    propertyTypes: ['industrial'],
    helpText: 'Minimum ingress protection for equipment',
  },
  {
    key: 'cable_containment_type',
    question: 'Cable containment type?',
    inputType: 'select',
    options: ['Tray', 'Ladder', 'Trunking', 'Conduit', 'SWA', 'Mixed'],
    scope: 'global',
    propertyTypes: ['industrial'],
    helpText: 'Primary cable management method',
  },
  {
    key: 'significant_motor_loads',
    question: 'Significant motor loads?',
    inputType: 'yes_no',
    scope: 'global',
    propertyTypes: ['industrial'],
    helpText: 'Large motors requiring DOL/star-delta/VSD starters',
  },
];

// ============================================================
// Room-specific prompts
// ============================================================
export const ROOM_PROMPTS: SmartPrompt[] = [
  // Bathroom / En-suite
  {
    key: 'bathroom_bonding',
    question: 'Supplementary bonding in place?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['bathroom', 'en_suite'],
    helpText: 'Reg 701.415.2 — check cross-bonding of services',
  },
  {
    key: 'bathroom_zones',
    question: 'Which zones are involved?',
    inputType: 'select',
    options: ['Zone 0 only', 'Zone 1 only', 'Zone 2 only', 'Zone 1 + 2', 'Outside zones only'],
    scope: 'room',
    roomTypes: ['bathroom', 'en_suite'],
    helpText: 'BS 7671 Section 701 — bathroom zones',
  },
  {
    key: 'shower_kw',
    question: 'Electric shower rating?',
    inputType: 'select',
    options: ['No electric shower', '7.5 kW', '8.5 kW', '9.5 kW', '10.5 kW', '10.8 kW'],
    scope: 'room',
    roomTypes: ['bathroom', 'en_suite'],
  },

  // Kitchen
  {
    key: 'kitchen_rcd',
    question: 'Kitchen sockets require RCD protection?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['kitchen'],
    helpText: 'Reg 411.3.3 — socket-outlets up to 32A require RCD ≤30mA',
  },
  {
    key: 'kitchen_circuit_type',
    question: 'Ring final or radial?',
    inputType: 'select',
    options: [
      'Ring final circuit',
      'Radial (existing)',
      'New radial recommended',
      'Multiple circuits needed',
    ],
    scope: 'room',
    roomTypes: ['kitchen'],
  },

  // Garage / Garden / External
  {
    key: 'outbuilding_supply',
    question: 'Outbuilding electrical supply?',
    inputType: 'select',
    options: [
      'None — new supply needed',
      'Existing SWA',
      'Existing armoured flex',
      'Overhead line (to be replaced)',
    ],
    scope: 'room',
    roomTypes: ['garage', 'garden_external'],
  },
  {
    key: 'ev_capacity',
    question: 'EV charger — DNO capacity check needed?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['garage', 'garden_external'],
    helpText: 'EV installations over 3.68kW require DNO notification',
  },

  // Loft
  {
    key: 'loft_boarding',
    question: 'Loft boarded?',
    inputType: 'select',
    options: [
      'Fully boarded',
      'Partially boarded',
      'Not boarded — boarding needed',
      'Not boarded — walkways only',
    ],
    scope: 'room',
    roomTypes: ['loft'],
  },
  {
    key: 'loft_insulation',
    question: 'Insulation depth?',
    inputType: 'select',
    options: [
      '270mm+ (compliant)',
      '100-270mm (below standard)',
      'Minimal / none',
      'Spray foam present',
    ],
    scope: 'room',
    roomTypes: ['loft'],
    helpText: 'Cable routing may need adjustment if insulation is deep',
  },

  // Server room
  {
    key: 'server_room_cooling',
    question: 'Cooling system present?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['server_room'],
    helpText: 'Dedicated cooling for IT equipment',
  },
  {
    key: 'server_room_ups',
    question: 'UPS installed?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['server_room'],
    helpText: 'Uninterruptible power supply for critical loads',
  },
  {
    key: 'server_room_floor_type',
    question: 'Floor type?',
    inputType: 'select',
    options: ['Raised floor', 'Solid floor'],
    scope: 'room',
    roomTypes: ['server_room'],
  },

  // Hazardous area
  {
    key: 'hazardous_zone_classification',
    question: 'Zone classification?',
    inputType: 'select',
    options: ['Zone 0', 'Zone 1', 'Zone 2', 'Zone 20', 'Zone 21', 'Zone 22'],
    scope: 'room',
    roomTypes: ['hazardous_area'],
    helpText: 'BS EN 60079-10 zone classification for this area',
  },
  {
    key: 'hazardous_gas_dust_group',
    question: 'Gas/dust group?',
    inputType: 'select',
    options: ['IIA', 'IIB', 'IIC', 'IIIA', 'IIIB', 'IIIC', 'Unknown'],
    scope: 'room',
    roomTypes: ['hazardous_area'],
    helpText: 'Equipment group classification',
  },
  {
    key: 'hazardous_t_class',
    question: 'Temperature class?',
    inputType: 'select',
    options: ['T1 (450°C)', 'T2 (300°C)', 'T3 (200°C)', 'T4 (135°C)', 'T5 (100°C)', 'T6 (85°C)'],
    scope: 'room',
    roomTypes: ['hazardous_area'],
  },

  // Switch room
  {
    key: 'switch_room_arc_flash',
    question: 'Arc flash assessment required?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['switch_room'],
    helpText: 'IEEE 1584 / NFPA 70E arc flash study',
  },
  {
    key: 'switch_room_clearance',
    question: 'Clearance distances adequate?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['switch_room'],
    helpText: 'Minimum working clearances per BS 7671',
  },

  // Car park
  {
    key: 'car_park_ventilation',
    question: 'Ventilation system present?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['car_park'],
    helpText: 'Mechanical ventilation for enclosed car parks',
  },
  {
    key: 'car_park_co_detection',
    question: 'CO detection installed?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['car_park'],
    helpText: 'Carbon monoxide detection system',
  },

  // Plant room
  {
    key: 'plant_room_drainage',
    question: 'Drainage present?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['plant_room'],
  },
  {
    key: 'plant_room_ventilation',
    question: 'Ventilation adequate?',
    inputType: 'yes_no',
    scope: 'room',
    roomTypes: ['plant_room'],
  },
];

/**
 * Returns prompts relevant to a specific room type,
 * optionally filtered by property type.
 */
export function getPromptsForRoom(roomType: RoomType, propertyType?: PropertyType): SmartPrompt[] {
  return ROOM_PROMPTS.filter((p) => {
    if (p.roomTypes && !p.roomTypes.includes(roomType)) return false;
    if (p.propertyTypes && propertyType && !p.propertyTypes.includes(propertyType)) return false;
    return true;
  });
}

/**
 * Returns global prompts, optionally filtered by property type.
 */
export function getGlobalPrompts(propertyType?: PropertyType): SmartPrompt[] {
  if (!propertyType) return GLOBAL_PROMPTS;
  return GLOBAL_PROMPTS.filter((p) => !p.propertyTypes || p.propertyTypes.includes(propertyType));
}
