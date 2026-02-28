// Heat Pump Load Calculator Constants and Data

export const INSULATION_LEVELS = {
  poor: {
    factor: 150,
    label: 'Poor (Pre-1920s)',
    description: 'Solid walls, no cavity insulation, single glazing',
  },
  average: {
    factor: 100,
    label: 'Average (1920s-1990s)',
    description: 'Cavity walls, some insulation, double glazing',
  },
  good: {
    factor: 70,
    label: 'Good (Post-1990s)',
    description: 'Well insulated, modern building standards',
  },
  excellent: {
    factor: 50,
    label: 'Excellent (Passivhaus)',
    description: 'Passive house standard, triple glazing',
  },
} as const;

export const AIR_TIGHTNESS_LEVELS = {
  poor: {
    multiplier: 1.3,
    label: 'Poor (>10 ACH)',
    description: 'Very draughty, old windows/doors',
  },
  average: {
    multiplier: 1.1,
    label: 'Average (5-10 ACH)',
    description: 'Some draughts, standard construction',
  },
  good: {
    multiplier: 1.0,
    label: 'Good (3-5 ACH)',
    description: 'Well sealed, modern construction',
  },
  excellent: {
    multiplier: 0.9,
    label: 'Excellent (<3 ACH)',
    description: 'Airtight construction, tested',
  },
} as const;

export const UK_REGIONS = {
  scotland: {
    designTemp: -8,
    label: 'Scotland',
    description: 'Northern regions, colder climate',
  },
  northern: {
    designTemp: -5,
    label: 'Northern England',
    description: 'Manchester, Newcastle, Leeds area',
  },
  midlands: {
    designTemp: -3,
    label: 'Midlands',
    description: 'Birmingham, Nottingham, Leicester area',
  },
  southern: {
    designTemp: -2,
    label: 'Southern England',
    description: 'London, Bristol, Brighton area',
  },
  southwest: {
    designTemp: -1,
    label: 'South West',
    description: 'Cornwall, Devon, Dorset area',
  },
} as const;

export const HEAT_PUMP_TYPES = {
  'air-source': {
    baseCOP: 3.5,
    label: 'Air Source Heat Pump (ASHP)',
    description: 'Extracts heat from outdoor air',
    tempDerating: 0.05,
  },
  'ground-source': {
    baseCOP: 4.5,
    label: 'Ground Source Heat Pump (GSHP)',
    description: 'Extracts heat from ground via loops',
    tempDerating: 0.02,
  },
  'air-to-air': {
    baseCOP: 3.2,
    label: 'Air-to-Air Heat Pump',
    description: 'Direct air heating, no radiators',
    tempDerating: 0.06,
  },
} as const;

export const EMITTER_TYPES = {
  radiators: {
    flowTemp: 55,
    label: 'Standard Radiators',
    description: 'Traditional wet heating system',
    efficiency: 0.95,
  },
  underfloor: {
    flowTemp: 35,
    label: 'Underfloor Heating',
    description: 'Low temperature radiant heating',
    efficiency: 1.0, // Corrected: emitter efficiency cannot exceed 1.0
  },
  fancoils: {
    flowTemp: 45,
    label: 'Fan Coil Units',
    description: 'Forced air over heat exchanger',
    efficiency: 1.0,
  },
  'low-temp-rads': {
    flowTemp: 45,
    label: 'Low Temperature Radiators',
    description: 'Oversized radiators for low flow temps',
    efficiency: 1.0, // Corrected: emitter efficiency cannot exceed 1.0
  },
} as const;

export const DHW_OPTIONS = {
  none: {
    load: 0,
    label: 'No DHW',
    description: 'Heating only system',
  },
  cylinder: {
    load: 3,
    label: 'Hot Water Cylinder',
    description: 'Standard domestic hot water via cylinder',
  },
  'integrated-dhw': {
    load: 2.5,
    label: 'Integrated DHW',
    description: 'Heat pump with built-in DHW function',
  },
  'separate-dhw': {
    load: 4,
    label: 'Separate DHW Heat Pump',
    description: 'Dedicated DHW heat pump',
  },
} as const;

export const ELECTRICAL_CONSTANTS = {
  defaultRate: 0.3, // £/kWh
  peakRate: 0.45,
  offPeakRate: 0.15,
  gasCO2Factor: 0.185, // kg CO2/kWh
  electricCO2Factor: 0.233, // kg CO2/kWh
  heatingHoursPerDay: 12,
  heatingDaysPerYear: 200,
} as const;

export const MCS_REQUIREMENTS = {
  maxOversizing: 1.2, // 20% max oversizing
  minUndersizing: 0.8, // 20% max undersizing
  designMargin: 1.1, // 10% design margin
  diversityFactor: 0.9, // For multiple heat pumps
} as const;

// Fuel comparison data for running cost analysis
// Prices are typical UK 2024/25 rates — user can override electricity rate
export const FUEL_COMPARISON = {
  gas: {
    label: 'Mains Gas',
    pricePerKwh: 0.065, // £/kWh (Ofgem cap typical)
    boilerEfficiency: 0.92, // Modern condensing boiler
    co2Factor: 0.185, // kg CO2/kWh
  },
  oil: {
    label: 'Heating Oil',
    pricePerKwh: 0.075, // £/kWh equivalent (~80p/litre ÷ 10.35 kWh/litre)
    boilerEfficiency: 0.88,
    co2Factor: 0.247, // kg CO2/kWh
  },
  lpg: {
    label: 'LPG',
    pricePerKwh: 0.095, // £/kWh equivalent
    boilerEfficiency: 0.88,
    co2Factor: 0.214, // kg CO2/kWh
  },
  electric: {
    label: 'Direct Electric',
    pricePerKwh: 0.3, // £/kWh — uses user rate at runtime
    boilerEfficiency: 1.0,
    co2Factor: 0.207, // kg CO2/kWh — BEIS 2024
  },
} as const;

// Defrost cycle energy penalty — percentage of annual output lost to defrost
// ASHP loses 2-3% annually, up to 9% in cold snaps; GSHP has no defrost
export const DEFROST_PENALTY: Record<string, number> = {
  'air-source': 0.03,
  'ground-source': 0,
  'air-to-air': 0.04,
};

// BUS (Boiler Upgrade Scheme) grant amounts — England & Wales only
export const BUS_GRANT = {
  'air-source': 7500,
  'ground-source': 7500,
  'air-to-air': 2500,
  maxCapacity: 45, // kWth
} as const;

// Building archetype presets — typical UK dwelling types
export const BUILDING_ARCHETYPES = {
  'victorian-terrace': {
    label: 'Victorian Terrace',
    floorArea: 85,
    insulationLevel: 'poor' as const,
    airTightness: 'poor' as const,
  },
  'semi-1930s': {
    label: '1930s Semi-Detached',
    floorArea: 95,
    insulationLevel: 'average' as const,
    airTightness: 'average' as const,
  },
  'detached-1970s': {
    label: '1970s Detached',
    floorArea: 130,
    insulationLevel: 'average' as const,
    airTightness: 'average' as const,
  },
  'modern-semi': {
    label: 'Modern Semi (Post-2000)',
    floorArea: 90,
    insulationLevel: 'good' as const,
    airTightness: 'good' as const,
  },
  'new-build': {
    label: 'New Build (Post-2020)',
    floorArea: 100,
    insulationLevel: 'excellent' as const,
    airTightness: 'excellent' as const,
  },
  bungalow: {
    label: 'Bungalow',
    floorArea: 75,
    insulationLevel: 'average' as const,
    airTightness: 'average' as const,
  },
  flat: {
    label: 'Flat / Apartment',
    floorArea: 60,
    insulationLevel: 'good' as const,
    airTightness: 'good' as const,
  },
} as const;
