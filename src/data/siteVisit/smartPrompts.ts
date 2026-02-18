import type { RoomType } from '@/types/siteVisit';

export type PromptInputType = 'select' | 'yes_no' | 'text';

export interface SmartPrompt {
  key: string;
  question: string;
  inputType: PromptInputType;
  options?: string[];
  scope: 'global' | 'room';
  /** If scope is 'room', which room types trigger this prompt */
  roomTypes?: RoomType[];
  helpText?: string;
}

// ============================================================
// Global prompts — shown once at top of Capture step
// ============================================================
export const GLOBAL_PROMPTS: SmartPrompt[] = [
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
];

/**
 * Returns prompts relevant to a specific room type.
 */
export function getPromptsForRoom(roomType: RoomType): SmartPrompt[] {
  return ROOM_PROMPTS.filter((p) => !p.roomTypes || p.roomTypes.includes(roomType));
}

/**
 * Returns all global prompts.
 */
export function getGlobalPrompts(): SmartPrompt[] {
  return GLOBAL_PROMPTS;
}
