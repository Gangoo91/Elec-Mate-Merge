/**
 * EV Charging Constants and Standards
 * Based on BS EN 61851 series and IET Code of Practice
 */

export const CHARGER_TYPES = {
  '3kw-ac': { 
    power: 3, 
    voltage: 230, 
    phases: 1, 
    efficiency: 0.90,
    label: '3kW AC (Slow)',
    connector: 'Type 1/2',
    typicalUse: 'Home/overnight charging'
  },
  '7kw-ac': { 
    power: 7, 
    voltage: 230, 
    phases: 1, 
    efficiency: 0.92,
    label: '7kW AC (Standard)',
    connector: 'Type 2',
    typicalUse: 'Home/workplace charging'
  },
  '11kw-ac': { 
    power: 11, 
    voltage: 400, 
    phases: 3, 
    efficiency: 0.93,
    label: '11kW AC (Fast)',
    connector: 'Type 2',
    typicalUse: 'Public/workplace charging'
  },
  '22kw-ac': { 
    power: 22, 
    voltage: 400, 
    phases: 3, 
    efficiency: 0.93,
    label: '22kW AC (Fast)',
    connector: 'Type 2',
    typicalUse: 'High-power public charging'
  },
  '50kw-dc': { 
    power: 50, 
    voltage: 400, 
    phases: 3, 
    efficiency: 0.95,
    label: '50kW DC (Rapid)',
    connector: 'CCS/CHAdeMO',
    typicalUse: 'Rapid public charging'
  },
  '150kw-dc': { 
    power: 150, 
    voltage: 400, 
    phases: 3, 
    efficiency: 0.95,
    label: '150kW DC (Ultra-rapid)',
    connector: 'CCS',
    typicalUse: 'Ultra-rapid highway charging'
  }
} as const;

export const EARTHING_SYSTEMS = {
  'tn-c-s': { 
    label: 'TN-C-S (PME)', 
    zs_max: 0.35, 
    description: 'Combined neutral and earth (PME supply)',
    considerations: 'Most common UK domestic supply'
  },
  'tn-s': { 
    label: 'TN-S', 
    zs_max: 0.8, 
    description: 'Separate neutral and earth',
    considerations: 'Older installations, cable supply'
  },
  'tt': { 
    label: 'TT (Earth Electrode)', 
    zs_max: 200, 
    description: 'Local earth electrode system',
    considerations: 'Rural areas, requires RCD protection'
  }
} as const;

export const CABLE_SPECIFICATIONS = {
  '2.5mm': { current: 20, impedance: 14.8, label: '2.5mm² T&E' },
  '4mm': { current: 25, impedance: 9.22, label: '4mm² T&E' },
  '6mm': { current: 32, impedance: 6.16, label: '6mm² T&E' },
  '10mm': { current: 43, impedance: 3.69, label: '10mm² T&E' },
  '16mm': { current: 57, impedance: 2.31, label: '16mm² SWA' },
  '25mm': { current: 75, impedance: 1.48, label: '25mm² SWA' },
  '35mm': { current: 94, impedance: 1.06, label: '35mm² SWA' }
} as const;

export const PROTECTION_DEVICES = {
  rcbo: { label: 'RCBO (Combined MCB + RCD)', trip_current: 30, type: 'Type A' },
  mcb_rcd: { label: 'MCB + RCD', trip_current: 30, type: 'Type A' },
  dc_protection: { label: 'DC Fault Protection', required_for: 'AC charging points' }
} as const;

export const INSTALLATION_LOCATIONS = {
  internal: { 
    label: 'Internal/Garage', 
    ip_rating: 'IP54',
    special_requirements: 'Adequate ventilation required'
  },
  external: { 
    label: 'External/Driveway', 
    ip_rating: 'IP65',
    special_requirements: 'Weather protection, possible earth electrode'
  },
  commercial: { 
    label: 'Commercial Car Park', 
    ip_rating: 'IP65',
    special_requirements: 'Load management, multiple unit considerations'
  }
} as const;

export const DIVERSITY_FACTORS = {
  single: { value: 1.0, label: 'Single Charger', description: 'One charging point' },
  domestic_multiple: { value: 0.8, label: 'Multiple Domestic', description: '2-4 charging points' },
  commercial_small: { value: 0.6, label: 'Small Commercial', description: '5-10 charging points' },
  commercial_large: { value: 0.4, label: 'Large Commercial', description: '10+ charging points' }
} as const;

export const TYPICAL_BATTERY_CAPACITIES = [
  { capacity: 40, vehicles: 'Nissan Leaf (older)' },
  { capacity: 50, vehicles: 'Volkswagen ID.3' },
  { capacity: 58, vehicles: 'Nissan Leaf e+' },
  { capacity: 64, vehicles: 'Hyundai Kona Electric' },
  { capacity: 75, vehicles: 'Tesla Model 3 Standard' },
  { capacity: 82, vehicles: 'Tesla Model 3 Long Range' },
  { capacity: 100, vehicles: 'Tesla Model S/X' }
] as const;

// Compliance and safety factors
export const SAFETY_FACTORS = {
  design_current_factor: 1.25, // 125% of design current for cable sizing
  voltage_drop_limit: 0.05, // 5% voltage drop limit
  temperature_derating: {
    ambient_30c: 1.0,
    ambient_35c: 0.94,
    ambient_40c: 0.87
  }
} as const;