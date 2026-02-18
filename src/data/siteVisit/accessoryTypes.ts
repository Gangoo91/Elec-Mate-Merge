import type { RoomType } from '@/types/siteVisit';

export interface AccessoryType {
  id: string;
  category: AccessoryCategory;
  label: string;
  defaultUnit: string;
  commonRooms?: RoomType[];
}

export type AccessoryCategory =
  | 'sockets'
  | 'lighting'
  | 'switches'
  | 'appliances'
  | 'safety'
  | 'data'
  | 'heating'
  | 'ev_outdoor'
  | 'other';

export const ACCESSORY_CATEGORIES: { id: AccessoryCategory; label: string }[] = [
  { id: 'sockets', label: 'Sockets' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'switches', label: 'Switches' },
  { id: 'appliances', label: 'Appliances' },
  { id: 'safety', label: 'Safety' },
  { id: 'data', label: 'Data / Comms' },
  { id: 'heating', label: 'Heating' },
  { id: 'ev_outdoor', label: 'EV / Outdoor' },
  { id: 'other', label: 'Other' },
];

export const ACCESSORY_TYPES: AccessoryType[] = [
  // Sockets
  { id: 'single_socket', category: 'sockets', label: 'Single Socket (13A)', defaultUnit: 'each' },
  { id: 'double_socket', category: 'sockets', label: 'Double Socket (13A)', defaultUnit: 'each' },
  {
    id: 'usb_socket',
    category: 'sockets',
    label: 'USB Socket (13A + USB-A/C)',
    defaultUnit: 'each',
  },
  {
    id: 'switched_fused_spur',
    category: 'sockets',
    label: 'Switched Fused Spur',
    defaultUnit: 'each',
  },
  {
    id: 'unswitched_fused_spur',
    category: 'sockets',
    label: 'Unswitched Fused Spur',
    defaultUnit: 'each',
  },
  {
    id: 'shaver_socket',
    category: 'sockets',
    label: 'Shaver Socket',
    defaultUnit: 'each',
    commonRooms: ['bathroom', 'en_suite'],
  },
  {
    id: 'floor_socket',
    category: 'sockets',
    label: 'Floor Socket',
    defaultUnit: 'each',
    commonRooms: ['living_room', 'study_office'],
  },

  // Lighting
  { id: 'ceiling_pendant', category: 'lighting', label: 'Ceiling Pendant', defaultUnit: 'each' },
  { id: 'led_downlight', category: 'lighting', label: 'LED Downlight', defaultUnit: 'each' },
  { id: 'led_strip', category: 'lighting', label: 'LED Strip', defaultUnit: 'metres' },
  { id: 'wall_light', category: 'lighting', label: 'Wall Light', defaultUnit: 'each' },
  { id: 'spotlight_bar', category: 'lighting', label: 'Spotlight Bar', defaultUnit: 'each' },
  {
    id: 'under_cabinet_light',
    category: 'lighting',
    label: 'Under-cabinet Light',
    defaultUnit: 'each',
    commonRooms: ['kitchen'],
  },
  {
    id: 'outdoor_light',
    category: 'lighting',
    label: 'Outdoor Light',
    defaultUnit: 'each',
    commonRooms: ['garden_external', 'garage'],
  },
  {
    id: 'pir_sensor_light',
    category: 'lighting',
    label: 'PIR Sensor Light',
    defaultUnit: 'each',
    commonRooms: ['garden_external', 'hallway', 'garage'],
  },
  { id: 'emergency_light', category: 'lighting', label: 'Emergency Light', defaultUnit: 'each' },
  {
    id: 'bathroom_light',
    category: 'lighting',
    label: 'Bathroom Light (IP44+)',
    defaultUnit: 'each',
    commonRooms: ['bathroom', 'en_suite'],
  },

  // Switches
  { id: 'single_switch', category: 'switches', label: '1-Gang 1-Way Switch', defaultUnit: 'each' },
  { id: 'double_switch', category: 'switches', label: '2-Gang 1-Way Switch', defaultUnit: 'each' },
  { id: 'two_way_switch', category: 'switches', label: '2-Way Switch', defaultUnit: 'each' },
  {
    id: 'intermediate_switch',
    category: 'switches',
    label: 'Intermediate Switch',
    defaultUnit: 'each',
  },
  { id: 'dimmer_switch', category: 'switches', label: 'Dimmer Switch', defaultUnit: 'each' },
  {
    id: 'pull_cord_switch',
    category: 'switches',
    label: 'Pull Cord Switch',
    defaultUnit: 'each',
    commonRooms: ['bathroom', 'en_suite'],
  },
  { id: 'smart_switch', category: 'switches', label: 'Smart Switch', defaultUnit: 'each' },

  // Appliances
  {
    id: 'cooker_outlet',
    category: 'appliances',
    label: 'Cooker Outlet',
    defaultUnit: 'each',
    commonRooms: ['kitchen'],
  },
  {
    id: 'cooker_switch',
    category: 'appliances',
    label: 'Cooker Switch (45A)',
    defaultUnit: 'each',
    commonRooms: ['kitchen'],
  },
  {
    id: 'hob_outlet',
    category: 'appliances',
    label: 'Hob Outlet',
    defaultUnit: 'each',
    commonRooms: ['kitchen'],
  },
  {
    id: 'extractor_fan',
    category: 'appliances',
    label: 'Extractor Fan',
    defaultUnit: 'each',
    commonRooms: ['kitchen', 'bathroom', 'en_suite', 'utility'],
  },
  {
    id: 'towel_rail_spur',
    category: 'appliances',
    label: 'Towel Rail Spur',
    defaultUnit: 'each',
    commonRooms: ['bathroom', 'en_suite'],
  },
  {
    id: 'immersion_heater',
    category: 'appliances',
    label: 'Immersion Heater',
    defaultUnit: 'each',
    commonRooms: ['utility', 'loft'],
  },
  {
    id: 'waste_disposal',
    category: 'appliances',
    label: 'Waste Disposal Unit',
    defaultUnit: 'each',
    commonRooms: ['kitchen'],
  },

  // Safety
  { id: 'smoke_detector', category: 'safety', label: 'Smoke Detector', defaultUnit: 'each' },
  {
    id: 'heat_detector',
    category: 'safety',
    label: 'Heat Detector',
    defaultUnit: 'each',
    commonRooms: ['kitchen', 'garage'],
  },
  { id: 'co_detector', category: 'safety', label: 'CO Detector', defaultUnit: 'each' },

  // Data / Comms
  { id: 'cat6_outlet', category: 'data', label: 'Cat6 Data Outlet', defaultUnit: 'each' },
  { id: 'tv_outlet', category: 'data', label: 'TV / Coaxial Outlet', defaultUnit: 'each' },
  { id: 'bt_outlet', category: 'data', label: 'Telephone Outlet', defaultUnit: 'each' },

  // Heating
  { id: 'storage_heater', category: 'heating', label: 'Storage Heater', defaultUnit: 'each' },
  { id: 'panel_heater', category: 'heating', label: 'Panel Heater', defaultUnit: 'each' },
  { id: 'thermostat', category: 'heating', label: 'Room Thermostat', defaultUnit: 'each' },
  { id: 'underfloor_heating', category: 'heating', label: 'Underfloor Heating', defaultUnit: 'm²' },

  // EV / Outdoor
  {
    id: 'ev_charger',
    category: 'ev_outdoor',
    label: 'EV Charger (7kW)',
    defaultUnit: 'each',
    commonRooms: ['garage', 'garden_external'],
  },
  {
    id: 'outside_socket',
    category: 'ev_outdoor',
    label: 'Outside Socket (IP66)',
    defaultUnit: 'each',
    commonRooms: ['garden_external', 'garage'],
  },
  {
    id: 'garden_spike_light',
    category: 'ev_outdoor',
    label: 'Garden Spike Light',
    defaultUnit: 'each',
    commonRooms: ['garden_external'],
  },

  // Other
  { id: 'consumer_unit', category: 'other', label: 'Consumer Unit', defaultUnit: 'each' },
  { id: 'distribution_board', category: 'other', label: 'Distribution Board', defaultUnit: 'each' },
  { id: 'cable_run', category: 'other', label: 'Cable Run', defaultUnit: 'metres' },
  { id: 'custom_item', category: 'other', label: 'Custom Item', defaultUnit: 'each' },
];

/**
 * Returns accessories filtered by room context.
 * Items with no `commonRooms` are always included.
 * Items with `commonRooms` are included if the room matches.
 */
export function getAccessoriesForRoom(roomType: RoomType): AccessoryType[] {
  return ACCESSORY_TYPES.filter((a) => !a.commonRooms || a.commonRooms.includes(roomType));
}

export function getAccessoryLabel(id: string): string {
  return ACCESSORY_TYPES.find((a) => a.id === id)?.label ?? id;
}

export function getAccessoriesByCategory(
  accessories: AccessoryType[]
): Record<AccessoryCategory, AccessoryType[]> {
  const grouped = {} as Record<AccessoryCategory, AccessoryType[]>;
  for (const cat of ACCESSORY_CATEGORIES) {
    grouped[cat.id] = accessories.filter((a) => a.category === cat.id);
  }
  return grouped;
}
