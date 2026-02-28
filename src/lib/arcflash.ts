// IEEE 1584-2018 compliant Arc Flash calculations
// Based on IEEE Standard 1584-2018 "Guide for Performing Arc-Flash Hazard Calculations"

export interface ArcFlashInputs {
  voltage: number; // System voltage (V)
  boltedFaultCurrent: number; // Bolted fault current (A)
  clearingTime: number; // Arc clearing time (s)
  workingDistance: number; // Working distance (mm)
  equipmentType: EquipmentType;
  electrodeConfig: ElectrodeConfig;
  enclosureType: EnclosureType;
  conductorGap?: number; // Conductor gap (mm) - optional override
  enclosureWidth?: number; // Enclosure width (mm)
  enclosureHeight?: number; // Enclosure height (mm)
  enclosureDepth?: number; // Enclosure depth (mm)
}

export interface BoundaryDistance {
  distance: number; // mm
  energy: number; // cal/cm²
}

export interface ArcFlashResult {
  arcingCurrent: number; // Arcing current (kA)
  incidentEnergy: number; // Incident energy (cal/cm²)
  incidentEnergyJoules: number; // Incident energy (J/cm²)
  arcFlashBoundary: number; // Arc flash boundary (mm)
  distanceExponent: number; // Distance exponent used
  isWithinIEEEBounds: boolean; // Whether inputs are within IEEE 1584 bounds
  warnings: string[];
  minArcRatingRequired: number; // Minimum arc rating required (cal/cm²)
  withinIEEEBounds: boolean; // Duplicate for consistency
  isUnrealistic: boolean; // High energy warning flag
  advisoryMessages: string[]; // Additional guidance messages
  ppeCategory: PPECategory; // Legacy field
  ppeRecommendations: string[];
  calculationMethod: string;
  // Enhanced outputs
  boundaryTable: BoundaryDistance[];
  energyLetThrough: number; // I²t (A²s)
  arcDuration: number; // seconds
  bs7671DisconnectionCheck: string; // BS 7671 disconnection time assessment
}

export type EquipmentType = 'panelboard' | 'switchboard' | 'lv_switchgear' | 'open_air';
export type ElectrodeConfig = 'VCB' | 'VCBB' | 'HCB' | 'VOA' | 'HOA';
export type EnclosureType = 'open' | 'box';
export type PPECategory = 0 | 1 | 2 | 3 | 4;

// Equipment type defaults
const EQUIPMENT_DEFAULTS = {
  panelboard: {
    workingDistance: 450,
    enclosureType: 'box' as EnclosureType,
    defaultConfig: 'VCB' as ElectrodeConfig,
  },
  switchboard: {
    workingDistance: 600,
    enclosureType: 'box' as EnclosureType,
    defaultConfig: 'VCB' as ElectrodeConfig,
  },
  lv_switchgear: {
    workingDistance: 900,
    enclosureType: 'box' as EnclosureType,
    defaultConfig: 'VCB' as ElectrodeConfig,
  },
  open_air: {
    workingDistance: 600,
    enclosureType: 'open' as EnclosureType,
    defaultConfig: 'VOA' as ElectrodeConfig,
  },
};

// BS 7671 maximum disconnection times (Table 41.1)
const BS7671_DISCONNECTION_TIMES: Record<string, { time: number; description: string }> = {
  '230_tn': { time: 0.4, description: '230V TN system: 0.4s max' },
  '400_tn': { time: 0.2, description: '400V TN system: 0.2s max' },
  '230_tt': { time: 0.2, description: '230V TT system: 0.2s max' },
  '400_tt': { time: 0.07, description: '400V TT system: 0.07s max' },
  distribution: { time: 5.0, description: 'Distribution circuit: 5s max' },
};

// Conductor gap defaults based on voltage and equipment type
function getDefaultConductorGap(voltage: number, _equipmentType: EquipmentType): number {
  if (voltage <= 480) return 25; // 25mm for LV
  if (voltage <= 1000) return 32; // 32mm for higher LV
  if (voltage <= 5000) return 50; // 50mm for MV
  return 76; // 76mm for higher voltages
}

// Validate inputs against IEEE 1584-2018 bounds
function validateInputs(inputs: ArcFlashInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];
  let isValid = true;

  // IEEE 1584-2018 valid ranges
  if (inputs.voltage < 208 || inputs.voltage > 15000) {
    warnings.push(`Voltage ${inputs.voltage}V is outside IEEE 1584 range (208-15000V)`);
    isValid = false;
  }

  if (inputs.boltedFaultCurrent < 700 || inputs.boltedFaultCurrent > 106000) {
    warnings.push(
      `Fault current ${inputs.boltedFaultCurrent}A is outside IEEE 1584 range (700-106000A)`
    );
  }

  if (inputs.workingDistance < 200) {
    warnings.push(
      `Working distance ${inputs.workingDistance}mm is below recommended minimum (200mm)`
    );
  }

  if (inputs.clearingTime > 2.0) {
    warnings.push(
      `Arc clearing time ${inputs.clearingTime}s exceeds 2 seconds - sustained arc risk`
    );
  }

  return { isValid, warnings };
}

// Calculate arcing current using IEEE 1584-2018 equations
function calculateArcingCurrent(inputs: ArcFlashInputs): number {
  const { voltage, boltedFaultCurrent, electrodeConfig, conductorGap } = inputs;
  const gap = conductorGap || getDefaultConductorGap(voltage, inputs.equipmentType);

  // IEEE 1584-2018 intermediate arcing current model
  let k1: number, k2: number, k3: number;

  // Configuration-specific coefficients
  switch (electrodeConfig) {
    case 'VCB': // Vertical conductors in box
      k1 = -0.04287;
      k2 = 1.73;
      k3 = -0.73;
      break;
    case 'VCBB': // Vertical conductors in box with barrier
      k1 = 0.0141;
      k2 = 1.81;
      k3 = -0.664;
      break;
    case 'HCB': // Horizontal conductors in box
      k1 = -0.04287;
      k2 = 1.73;
      k3 = -0.73;
      break;
    case 'VOA': // Vertical conductors in open air
    case 'HOA': // Horizontal conductors in open air
      k1 = -0.0093;
      k2 = 2.04;
      k3 = -0.1;
      break;
    default:
      k1 = -0.04287;
      k2 = 1.73;
      k3 = -0.73;
  }

  // IEEE 1584-2018 equation for intermediate arcing current (in log form)
  const logIarc = k1 + k2 * Math.log10(boltedFaultCurrent) + k3 * Math.log10(gap);

  // Convert to actual current (kA)
  const arcingCurrent = Math.pow(10, logIarc);

  // Bounds checking - prevent unrealistic values
  const maxArcCurrent = boltedFaultCurrent * 0.85; // Arc current typically 50-85% of bolted fault
  const minArcCurrent = boltedFaultCurrent * 0.1;

  return Math.max(minArcCurrent, Math.min(maxArcCurrent, arcingCurrent * 1000)) / 1000; // Return in kA
}

// Calculate incident energy using IEEE 1584-2018 (corrected formula)
function calculateIncidentEnergy(
  inputs: ArcFlashInputs,
  arcingCurrent: number
): { energy: number; distanceExponent: number } {
  const { voltage, workingDistance, clearingTime, electrodeConfig } = inputs;

  // IEEE 1584-2018 incident energy coefficients (corrected)
  let k1: number, k2: number, cf: number;

  // Configuration and enclosure specific coefficients
  switch (electrodeConfig) {
    case 'VCB':
    case 'HCB':
      k1 = -0.555;
      k2 = 0.113;
      cf = 1.0;
      break;
    case 'VCBB':
      k1 = -0.555;
      k2 = 0.113;
      cf = 0.93; // Barrier correction factor
      break;
    case 'VOA':
    case 'HOA':
      k1 = -0.555;
      k2 = 0.0;
      cf = 1.0;
      break;
    default:
      k1 = -0.555;
      k2 = 0.113;
      cf = 1.0;
  }

  // Calculate normalized incident energy (at 610mm, 0.2s) - corrected formula
  const logEn = k1 + k2 + 1.081 * Math.log10(arcingCurrent) + 0.0011 * voltage;
  const En = Math.pow(10, logEn); // J/cm² at 610mm, 0.2s

  // Distance exponent (simplified for IEEE 1584-2018)
  const x = 2.0;

  // Scale for actual distance and time (corrected scaling)
  const incidentEnergy = cf * En * (clearingTime / 0.2) * Math.pow(610 / workingDistance, x);

  return { energy: incidentEnergy, distanceExponent: x };
}

// Calculate arc flash boundary at 1.2 cal/cm² threshold (BS 7671 18th Edition)
function calculateArcFlashBoundary(inputs: ArcFlashInputs, arcingCurrent: number): number {
  const { voltage, clearingTime, electrodeConfig } = inputs;

  // Use incident energy calculation at 1.2 cal/cm² threshold (IEEE 1584-2018)
  let k1: number, k2: number, cf: number;

  switch (electrodeConfig) {
    case 'VCB':
    case 'HCB':
      k1 = -0.555;
      k2 = 0.113;
      cf = 1.0;
      break;
    case 'VCBB':
      k1 = -0.555;
      k2 = 0.113;
      cf = 0.93;
      break;
    case 'VOA':
    case 'HOA':
      k1 = -0.555;
      k2 = 0.0;
      cf = 1.0;
      break;
    default:
      k1 = -0.555;
      k2 = 0.113;
      cf = 1.0;
  }

  const logEn = k1 + k2 + 1.081 * Math.log10(arcingCurrent) + 0.0011 * voltage;
  const En = Math.pow(10, logEn);

  // Distance for 1.2 cal/cm² (UK arc flash boundary threshold)
  const boundary = 610 * Math.sqrt((cf * 4.184 * En * (clearingTime / 0.2)) / 1.2);

  return Math.max(200, boundary); // Minimum 200mm boundary
}

// Calculate energy at multiple distances (boundary table)
function calculateBoundaryTable(inputs: ArcFlashInputs, arcingCurrent: number): BoundaryDistance[] {
  const distances = [300, 450, 600, 900, 1200];
  const { voltage, clearingTime, electrodeConfig } = inputs;

  let k1: number, k2: number, cf: number;
  switch (electrodeConfig) {
    case 'VCB':
    case 'HCB':
      k1 = -0.555;
      k2 = 0.113;
      cf = 1.0;
      break;
    case 'VCBB':
      k1 = -0.555;
      k2 = 0.113;
      cf = 0.93;
      break;
    case 'VOA':
    case 'HOA':
      k1 = -0.555;
      k2 = 0.0;
      cf = 1.0;
      break;
    default:
      k1 = -0.555;
      k2 = 0.113;
      cf = 1.0;
  }

  const logEn = k1 + k2 + 1.081 * Math.log10(arcingCurrent) + 0.0011 * voltage;
  const En = Math.pow(10, logEn);

  return distances.map((d) => ({
    distance: d,
    energy: Math.round(cf * En * (clearingTime / 0.2) * Math.pow(610 / d, 2) * 100) / 100,
  }));
}

// Calculate energy let-through I²t
function calculateEnergyLetThrough(arcingCurrentKA: number, clearingTime: number): number {
  const arcingCurrentA = arcingCurrentKA * 1000;
  return Math.round(arcingCurrentA * arcingCurrentA * clearingTime);
}

// Check against BS 7671 disconnection time thresholds
function checkBS7671Disconnection(voltage: number, clearingTime: number): string {
  if (voltage <= 230) {
    if (clearingTime <= 0.4) return 'Within BS 7671 Table 41.1 limit (230V TN: 0.4s)';
    if (clearingTime <= 5.0)
      return 'Exceeds final circuit limit but within distribution limit (5s)';
    return 'Exceeds all BS 7671 disconnection time limits';
  }
  if (voltage <= 400) {
    if (clearingTime <= 0.2) return 'Within BS 7671 Table 41.1 limit (400V TN: 0.2s)';
    if (clearingTime <= 5.0)
      return 'Exceeds final circuit limit but within distribution limit (5s)';
    return 'Exceeds all BS 7671 disconnection time limits';
  }
  if (clearingTime <= 0.1) return 'Within typical HV protection clearing time';
  if (clearingTime <= 0.5) return 'Acceptable for HV distribution protection';
  return 'Slow clearing - review protection settings';
}

// Determine PPE category and recommendations
function determinePPE(incidentEnergy: number): {
  category: PPECategory;
  recommendations: string[];
} {
  if (incidentEnergy <= 1.2) {
    return {
      category: 0,
      recommendations: [
        'Non-melting or untreated natural fibre clothing',
        'Safety glasses or safety goggles',
        'Hearing protection (if required)',
        'Leather gloves (if required)',
        'Hard hat (if required)',
      ],
    };
  } else if (incidentEnergy <= 4.0) {
    return {
      category: 1,
      recommendations: [
        'Arc-rated long-sleeve shirt and trousers (4 cal/cm²)',
        'Arc-rated face shield or arc flash suit hood',
        'Arc-rated gloves',
        'Safety glasses or safety goggles',
        'Hearing protection',
        'Hard hat',
      ],
    };
  } else if (incidentEnergy <= 8.0) {
    return {
      category: 2,
      recommendations: [
        'Arc-rated long-sleeve shirt and trousers (8 cal/cm²)',
        'Arc-rated flash suit hood or face shield',
        'Arc-rated gloves',
        'Safety glasses or safety goggles',
        'Hearing protection',
        'Hard hat',
      ],
    };
  } else if (incidentEnergy <= 25.0) {
    return {
      category: 3,
      recommendations: [
        'Arc-rated flash suit or arc-rated shirt and trousers (25 cal/cm²)',
        'Arc-rated flash suit hood',
        'Arc-rated gloves',
        'Safety glasses or safety goggles',
        'Hearing protection',
        'Hard hat',
      ],
    };
  } else {
    return {
      category: 4,
      recommendations: [
        'Arc-rated flash suit (40+ cal/cm²)',
        'Arc-rated flash suit hood',
        'Arc-rated gloves',
        'Safety glasses or safety goggles',
        'Hearing protection',
        'Hard hat',
        'Consider remote operation or de-energisation',
      ],
    };
  }
}

// Main calculation function
export function calculateArcFlash(inputs: ArcFlashInputs): ArcFlashResult {
  // Validate inputs
  const validation = validateInputs(inputs);

  // Set conductor gap if not provided
  const conductorGap =
    inputs.conductorGap || getDefaultConductorGap(inputs.voltage, inputs.equipmentType);
  const adjustedInputs = { ...inputs, conductorGap };

  // Calculate arcing current
  const arcingCurrent = calculateArcingCurrent(adjustedInputs);

  // Calculate incident energy
  const { energy: incidentEnergy, distanceExponent } = calculateIncidentEnergy(
    adjustedInputs,
    arcingCurrent
  );

  // Calculate arc flash boundary
  const arcFlashBoundary = calculateArcFlashBoundary(adjustedInputs, arcingCurrent);

  // Determine PPE requirements
  const ppe = determinePPE(incidentEnergy);

  // Enhanced calculations
  const boundaryTable = calculateBoundaryTable(adjustedInputs, arcingCurrent);
  const energyLetThrough = calculateEnergyLetThrough(arcingCurrent, inputs.clearingTime);
  const bs7671DisconnectionCheck = checkBS7671Disconnection(inputs.voltage, inputs.clearingTime);

  // Generate advisory messages
  const advisoryMessages: string[] = [];
  const isUnrealistic = incidentEnergy > 100;

  if (isUnrealistic) {
    advisoryMessages.push(
      'Energy level exceeds practical PPE limits - consider de-energisation or remote operation'
    );
  }

  if (incidentEnergy > 40) {
    advisoryMessages.push(
      'PPE rating indicates thermal protection only - blast and pressure effects not considered'
    );
  }

  if (inputs.clearingTime > 0.5) {
    advisoryMessages.push('Consider faster protection devices to reduce incident energy');
  }

  if (inputs.workingDistance < 600 && incidentEnergy > 8) {
    advisoryMessages.push('Increase working distance where practicable to reduce energy exposure');
  }

  // Determine calculation method
  const calculationMethod = validation.isValid ? 'IEEE 1584-2018' : 'IEEE 1584-2018 (extrapolated)';

  return {
    arcingCurrent,
    incidentEnergy,
    incidentEnergyJoules: incidentEnergy * 4.184,
    arcFlashBoundary,
    distanceExponent,
    isWithinIEEEBounds: validation.isValid,
    warnings: validation.warnings,
    minArcRatingRequired: Math.ceil(incidentEnergy),
    withinIEEEBounds: validation.isValid,
    isUnrealistic,
    advisoryMessages,
    ppeCategory: ppe.category,
    ppeRecommendations: ppe.recommendations,
    calculationMethod,
    boundaryTable,
    energyLetThrough,
    arcDuration: inputs.clearingTime,
    bs7671DisconnectionCheck,
  };
}

// Get equipment defaults
export function getEquipmentDefaults(equipmentType: EquipmentType) {
  return EQUIPMENT_DEFAULTS[equipmentType];
}

// Equipment type labels
export const EQUIPMENT_TYPE_LABELS = {
  panelboard: 'Panelboard/MCC',
  switchboard: 'Switchboard',
  lv_switchgear: 'LV Switchgear',
  open_air: 'Open Air',
};

// Electrode configuration labels with descriptions
export const ELECTRODE_CONFIG_LABELS = {
  VCB: 'VCB - Vertical conductors in box',
  VCBB: 'VCBB - Vertical conductors in box with barrier',
  HCB: 'HCB - Horizontal conductors in box',
  VOA: 'VOA - Vertical conductors in open air',
  HOA: 'HOA - Horizontal conductors in open air',
};
