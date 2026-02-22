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
  | 'containment'
  | 'distribution'
  | 'fire_alarm'
  | 'access_security'
  | 'hvac'
  | 'commercial_lighting'
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
  { id: 'containment', label: 'Containment' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'fire_alarm', label: 'Fire Alarm' },
  { id: 'access_security', label: 'Access / Security' },
  { id: 'hvac', label: 'HVAC / Mechanical' },
  { id: 'commercial_lighting', label: 'Commercial Lighting' },
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

  // Containment
  { id: 'mini_trunking', category: 'containment', label: 'Mini Trunking', defaultUnit: 'metres' },
  { id: 'dado_trunking', category: 'containment', label: 'Dado Trunking', defaultUnit: 'metres' },
  {
    id: 'cable_trunking',
    category: 'containment',
    label: 'Cable Trunking',
    defaultUnit: 'metres',
  },
  { id: 'pvc_conduit', category: 'containment', label: 'PVC Conduit', defaultUnit: 'metres' },
  { id: 'steel_conduit', category: 'containment', label: 'Steel Conduit', defaultUnit: 'metres' },
  {
    id: 'flexible_conduit',
    category: 'containment',
    label: 'Flexible Conduit',
    defaultUnit: 'metres',
  },
  { id: 'cable_tray', category: 'containment', label: 'Cable Tray', defaultUnit: 'metres' },
  { id: 'cable_basket', category: 'containment', label: 'Cable Basket', defaultUnit: 'metres' },

  // Distribution
  { id: 'consumer_unit', category: 'distribution', label: 'Consumer Unit', defaultUnit: 'each' },
  {
    id: 'distribution_board',
    category: 'distribution',
    label: 'Distribution Board',
    defaultUnit: 'each',
  },
  {
    id: 'sub_distribution_board',
    category: 'distribution',
    label: 'Sub-Distribution Board',
    defaultUnit: 'each',
  },
  { id: 'panel_board', category: 'distribution', label: 'Panel Board', defaultUnit: 'each' },
  { id: 'mccb_panel', category: 'distribution', label: 'MCCB Panel', defaultUnit: 'each' },
  {
    id: 'busbar_trunking',
    category: 'distribution',
    label: 'Busbar Trunking',
    defaultUnit: 'metres',
  },
  { id: 'tap_off_unit', category: 'distribution', label: 'Tap-Off Unit', defaultUnit: 'each' },
  {
    id: 'ats_panel',
    category: 'distribution',
    label: 'Automatic Transfer Switch (ATS)',
    defaultUnit: 'each',
  },
  {
    id: 'capacitor_bank',
    category: 'distribution',
    label: 'Power Factor Correction Unit',
    defaultUnit: 'each',
  },
  { id: 'isolator', category: 'distribution', label: 'Isolator Switch', defaultUnit: 'each' },
  {
    id: 'rotary_isolator',
    category: 'distribution',
    label: 'Rotary Isolator',
    defaultUnit: 'each',
  },

  // Sockets — Industrial / Commercial
  {
    id: 'industrial_socket_16a',
    category: 'sockets',
    label: 'Industrial Socket (16A CEE)',
    defaultUnit: 'each',
  },
  {
    id: 'industrial_socket_32a',
    category: 'sockets',
    label: 'Industrial Socket (32A CEE)',
    defaultUnit: 'each',
  },
  {
    id: 'industrial_socket_63a',
    category: 'sockets',
    label: 'Industrial Socket (63A CEE)',
    defaultUnit: 'each',
  },
  {
    id: 'three_phase_socket',
    category: 'sockets',
    label: '3-Phase Socket',
    defaultUnit: 'each',
  },
  {
    id: 'commando_socket',
    category: 'sockets',
    label: 'Commando Socket',
    defaultUnit: 'each',
  },
  { id: 'floor_box', category: 'sockets', label: 'Floor Box', defaultUnit: 'each' },
  {
    id: 'desk_power_module',
    category: 'sockets',
    label: 'Desk Power Module',
    defaultUnit: 'each',
  },
  {
    id: 'powertrack',
    category: 'sockets',
    label: 'Power Track / Dado Rail Socket',
    defaultUnit: 'each',
  },

  // Commercial Lighting
  {
    id: 'led_panel',
    category: 'commercial_lighting',
    label: 'LED Panel (600x600)',
    defaultUnit: 'each',
  },
  {
    id: 'led_batten',
    category: 'commercial_lighting',
    label: 'LED Batten',
    defaultUnit: 'each',
  },
  {
    id: 'high_bay_light',
    category: 'commercial_lighting',
    label: 'High Bay Light',
    defaultUnit: 'each',
  },
  {
    id: 'low_bay_light',
    category: 'commercial_lighting',
    label: 'Low Bay Light',
    defaultUnit: 'each',
  },
  {
    id: 'floodlight',
    category: 'commercial_lighting',
    label: 'Floodlight',
    defaultUnit: 'each',
  },
  {
    id: 'bulkhead_light',
    category: 'commercial_lighting',
    label: 'Bulkhead Light',
    defaultUnit: 'each',
  },
  {
    id: 'emergency_exit_sign',
    category: 'commercial_lighting',
    label: 'Emergency Exit Sign',
    defaultUnit: 'each',
  },
  {
    id: 'emergency_bulkhead',
    category: 'commercial_lighting',
    label: 'Emergency Bulkhead (3hr)',
    defaultUnit: 'each',
  },
  {
    id: 'occupancy_sensor',
    category: 'commercial_lighting',
    label: 'Occupancy / PIR Sensor',
    defaultUnit: 'each',
  },
  {
    id: 'daylight_sensor',
    category: 'commercial_lighting',
    label: 'Daylight Sensor',
    defaultUnit: 'each',
  },
  {
    id: 'lighting_control_panel',
    category: 'commercial_lighting',
    label: 'Lighting Control Panel',
    defaultUnit: 'each',
  },
  {
    id: 'dali_driver',
    category: 'commercial_lighting',
    label: 'DALI Driver',
    defaultUnit: 'each',
  },
  {
    id: 'track_light',
    category: 'commercial_lighting',
    label: 'Track Lighting',
    defaultUnit: 'each',
  },

  // Fire Alarm
  {
    id: 'fire_alarm_call_point',
    category: 'fire_alarm',
    label: 'Fire Alarm Call Point',
    defaultUnit: 'each',
  },
  {
    id: 'fire_alarm_sounder',
    category: 'fire_alarm',
    label: 'Fire Alarm Sounder',
    defaultUnit: 'each',
  },
  {
    id: 'sounder_beacon',
    category: 'fire_alarm',
    label: 'Sounder / Beacon',
    defaultUnit: 'each',
  },
  {
    id: 'fire_alarm_panel',
    category: 'fire_alarm',
    label: 'Fire Alarm Panel',
    defaultUnit: 'each',
  },
  {
    id: 'fire_alarm_detector',
    category: 'fire_alarm',
    label: 'Fire Alarm Detector (Optical/Heat)',
    defaultUnit: 'each',
  },
  {
    id: 'fire_door_holder',
    category: 'fire_alarm',
    label: 'Fire Door Holder',
    defaultUnit: 'each',
  },
  {
    id: 'fire_alarm_interface',
    category: 'fire_alarm',
    label: 'Fire Alarm Interface Module',
    defaultUnit: 'each',
  },

  // Access / Security
  {
    id: 'access_control_reader',
    category: 'access_security',
    label: 'Access Control Reader',
    defaultUnit: 'each',
  },
  {
    id: 'door_entry_panel',
    category: 'access_security',
    label: 'Door Entry Panel',
    defaultUnit: 'each',
  },
  {
    id: 'magnetic_lock',
    category: 'access_security',
    label: 'Magnetic Door Lock',
    defaultUnit: 'each',
  },
  {
    id: 'cctv_camera',
    category: 'access_security',
    label: 'CCTV Camera',
    defaultUnit: 'each',
  },
  { id: 'nvr_dvr', category: 'access_security', label: 'NVR / DVR Unit', defaultUnit: 'each' },
  {
    id: 'intruder_alarm_panel',
    category: 'access_security',
    label: 'Intruder Alarm Panel',
    defaultUnit: 'each',
  },
  { id: 'pir_detector', category: 'access_security', label: 'PIR Detector', defaultUnit: 'each' },
  {
    id: 'door_contact',
    category: 'access_security',
    label: 'Door Contact',
    defaultUnit: 'each',
  },
  {
    id: 'emergency_stop',
    category: 'access_security',
    label: 'Emergency Stop Button',
    defaultUnit: 'each',
  },

  // HVAC / Mechanical
  {
    id: 'ac_isolator',
    category: 'hvac',
    label: 'Air Conditioning Isolator',
    defaultUnit: 'each',
  },
  {
    id: 'ac_unit',
    category: 'hvac',
    label: 'Air Conditioning Unit Supply',
    defaultUnit: 'each',
  },
  {
    id: 'fan_isolator',
    category: 'hvac',
    label: 'Fan Isolator Switch',
    defaultUnit: 'each',
  },
  {
    id: 'ventilation_unit',
    category: 'hvac',
    label: 'Ventilation Unit / MVHR',
    defaultUnit: 'each',
  },
  {
    id: 'hand_dryer',
    category: 'hvac',
    label: 'Hand Dryer',
    defaultUnit: 'each',
  },
  {
    id: 'water_heater',
    category: 'hvac',
    label: 'Water Heater / Boiler Supply',
    defaultUnit: 'each',
  },
  {
    id: 'pump_supply',
    category: 'hvac',
    label: 'Pump Supply',
    defaultUnit: 'each',
  },
  {
    id: 'bms_controller',
    category: 'hvac',
    label: 'BMS Controller / Outstation',
    defaultUnit: 'each',
  },

  // Data / Comms — Commercial
  {
    id: 'patch_panel',
    category: 'data',
    label: 'Patch Panel',
    defaultUnit: 'each',
  },
  {
    id: 'data_cabinet',
    category: 'data',
    label: 'Data Cabinet / Rack',
    defaultUnit: 'each',
  },
  {
    id: 'wifi_access_point',
    category: 'data',
    label: 'Wi-Fi Access Point',
    defaultUnit: 'each',
  },
  {
    id: 'network_switch',
    category: 'data',
    label: 'Network Switch',
    defaultUnit: 'each',
  },
  {
    id: 'fibre_outlet',
    category: 'data',
    label: 'Fibre Optic Outlet',
    defaultUnit: 'each',
  },

  // Other
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
