// Heat Pump Load Calculator Constants and Data

export const INSULATION_LEVELS = {
  poor: { 
    factor: 150, 
    label: "Poor (Pre-1920s)", 
    description: "Solid walls, no cavity insulation, single glazing" 
  },
  average: { 
    factor: 100, 
    label: "Average (1920s-1990s)", 
    description: "Cavity walls, some insulation, double glazing" 
  },
  good: { 
    factor: 70, 
    label: "Good (Post-1990s)", 
    description: "Well insulated, modern building standards" 
  },
  excellent: { 
    factor: 50, 
    label: "Excellent (Passivhaus)", 
    description: "Passive house standard, triple glazing" 
  }
} as const;

export const AIR_TIGHTNESS_LEVELS = {
  poor: { multiplier: 1.3, label: "Poor (>10 ACH)", description: "Very draughty, old windows/doors" },
  average: { multiplier: 1.1, label: "Average (5-10 ACH)", description: "Some draughts, standard construction" },
  good: { multiplier: 1.0, label: "Good (3-5 ACH)", description: "Well sealed, modern construction" },
  excellent: { multiplier: 0.9, label: "Excellent (<3 ACH)", description: "Airtight construction, tested" }
} as const;

export const UK_REGIONS = {
  scotland: { 
    designTemp: -8, 
    label: "Scotland", 
    description: "Northern regions, colder climate" 
  },
  northern: { 
    designTemp: -5, 
    label: "Northern England", 
    description: "Manchester, Newcastle, Leeds area" 
  },
  midlands: { 
    designTemp: -3, 
    label: "Midlands", 
    description: "Birmingham, Nottingham, Leicester area" 
  },
  southern: { 
    designTemp: -2, 
    label: "Southern England", 
    description: "London, Bristol, Brighton area" 
  },
  southwest: { 
    designTemp: -1, 
    label: "South West", 
    description: "Cornwall, Devon, Dorset area" 
  }
} as const;

export const HEAT_PUMP_TYPES = {
  'air-source': {
    baseCOP: 3.5,
    label: "Air Source Heat Pump (ASHP)",
    description: "Extracts heat from outdoor air",
    tempDerating: 0.05
  },
  'ground-source': {
    baseCOP: 4.5,
    label: "Ground Source Heat Pump (GSHP)",
    description: "Extracts heat from ground via loops",
    tempDerating: 0.02
  },
  'air-to-air': {
    baseCOP: 3.2,
    label: "Air-to-Air Heat Pump",
    description: "Direct air heating, no radiators",
    tempDerating: 0.06
  }
} as const;

export const EMITTER_TYPES = {
  radiators: {
    flowTemp: 55,
    label: "Standard Radiators",
    description: "Traditional wet heating system",
    efficiency: 0.95
  },
  underfloor: {
    flowTemp: 35,
    label: "Underfloor Heating",
    description: "Low temperature radiant heating",
    efficiency: 1.1
  },
  fancoils: {
    flowTemp: 45,
    label: "Fan Coil Units",
    description: "Forced air over heat exchanger",
    efficiency: 1.0
  },
  'low-temp-rads': {
    flowTemp: 45,
    label: "Low Temperature Radiators",
    description: "Oversized radiators for low flow temps",
    efficiency: 1.05
  }
} as const;

export const DHW_OPTIONS = {
  none: { 
    load: 0, 
    label: "No DHW", 
    description: "Heating only system" 
  },
  cylinder: { 
    load: 3, 
    label: "Hot Water Cylinder", 
    description: "Standard domestic hot water via cylinder" 
  },
  'integrated-dhw': { 
    load: 2.5, 
    label: "Integrated DHW", 
    description: "Heat pump with built-in DHW function" 
  },
  'separate-dhw': { 
    load: 4, 
    label: "Separate DHW Heat Pump", 
    description: "Dedicated DHW heat pump" 
  }
} as const;

export const ELECTRICAL_CONSTANTS = {
  defaultRate: 0.30, // £/kWh
  peakRate: 0.45,
  offPeakRate: 0.15,
  gasCO2Factor: 0.185, // kg CO2/kWh
  electricCO2Factor: 0.233, // kg CO2/kWh
  heatingHoursPerDay: 12,
  heatingDaysPerYear: 200
} as const;

export const MCS_REQUIREMENTS = {
  maxOversizing: 1.2, // 20% max oversizing
  minUndersizing: 0.8, // 20% max undersizing
  designMargin: 1.1, // 10% design margin
  diversityFactor: 0.9 // For multiple heat pumps
} as const;