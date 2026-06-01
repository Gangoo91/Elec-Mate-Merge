// Arc Flash calculations per IEEE 1584-2002 "Guide for Performing Arc-Flash Hazard Calculations".
// Validated against the canonical 20 kA / 480 V LV switchgear example (≈4.8 cal/cm² at 610 mm, 0.2 s).
// NOTE: results are indicative for design awareness; a formal arc-flash study should confirm PPE.

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

// Typical conductor gaps (mm) per IEEE 1584-2002 Table 2, by equipment & voltage.
function getDefaultConductorGap(voltage: number, equipmentType: EquipmentType): number {
  if (voltage > 5000) return 153; // 5–15 kV switchgear
  if (voltage > 1000) return 102; // 1–5 kV switchgear
  if (equipmentType === 'panelboard') return 25; // MCC / panelboard, LV
  if (equipmentType === 'open_air') return 32;
  return 32; // LV switchgear / switchboard
}

// IEEE 1584-2002 coefficients. Open vs box (enclosed) governs the constants.
// K2 = −0.113 assumes a solidly/impedance-grounded system (UK TN, the common case);
// an ungrounded/HRG system would use 0 and read ~30% higher.
function arc2002Coeffs(inputs: ArcFlashInputs): { isOpen: boolean; kArc: number; k1: number; k2: number } {
  const isOpen =
    inputs.enclosureType === 'open' ||
    inputs.electrodeConfig === 'VOA' ||
    inputs.electrodeConfig === 'HOA';
  return {
    isOpen,
    kArc: isOpen ? -0.153 : -0.097, // arcing-current constant
    k1: isOpen ? -0.792 : -0.555, // incident-energy constant
    k2: -0.113, // grounded system
  };
}

// Distance exponent x, IEEE 1584-2002 Table 4.
function getDistanceExponent(equipmentType: EquipmentType, voltage: number): number {
  if (equipmentType === 'open_air') return 2.0;
  if (voltage > 1000) return 0.973; // MV switchgear
  if (equipmentType === 'panelboard') return 1.641; // MCC / panelboard
  return 1.473; // LV switchgear / switchboard
}

// Calculation factor Cf: 1.5 for ≤1 kV, 1.0 above.
function getCalcFactor(voltage: number): number {
  return voltage <= 1000 ? 1.5 : 1.0;
}

// Normalized incident energy En (J/cm² at 610 mm, 0.2 s) — IEEE 1584-2002.
function normalizedEnergy(inputs: ArcFlashInputs, arcingCurrentKA: number): number {
  const gap = inputs.conductorGap || getDefaultConductorGap(inputs.voltage, inputs.equipmentType);
  const { k1, k2 } = arc2002Coeffs(inputs);
  const logEn = k1 + k2 + 1.081 * Math.log10(arcingCurrentKA) + 0.0011 * gap;
  return Math.pow(10, logEn);
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

// Arcing current (kA) — IEEE 1584-2002. Ibf and Ia in kA, V in kV, gap in mm.
function calculateArcingCurrent(inputs: ArcFlashInputs): number {
  const { voltage, boltedFaultCurrent, conductorGap } = inputs;
  const gap = conductorGap || getDefaultConductorGap(voltage, inputs.equipmentType);

  const ibfKA = boltedFaultCurrent / 1000; // input is A → kA
  const vKV = voltage / 1000;
  const lgIbf = Math.log10(ibfKA);

  let logIa: number;
  if (voltage <= 1000) {
    // Equation 1: systems ≤ 1 kV
    const { kArc } = arc2002Coeffs(inputs);
    logIa =
      kArc +
      0.662 * lgIbf +
      0.0966 * vKV +
      0.000526 * gap +
      0.5588 * vKV * lgIbf -
      0.00304 * gap * lgIbf;
  } else {
    // Equation 2: systems > 1 kV
    logIa = 0.00402 + 0.983 * lgIbf;
  }

  return Math.pow(10, logIa); // kA
}

// Incident energy (cal/cm²) — IEEE 1584-2002.
// E(cal/cm²) = Cf · En · (t/0.2) · (610/D)^x, where En is in J/cm² (the 4.184 J↔cal
// factor cancels between the normalised-energy and final-energy equations).
function calculateIncidentEnergy(
  inputs: ArcFlashInputs,
  arcingCurrent: number
): { energy: number; distanceExponent: number } {
  const { voltage, workingDistance, clearingTime, equipmentType } = inputs;
  const En = normalizedEnergy(inputs, arcingCurrent);
  const cf = getCalcFactor(voltage);
  const x = getDistanceExponent(equipmentType, voltage);
  const incidentEnergy = cf * En * (clearingTime / 0.2) * Math.pow(610 / workingDistance, x);
  return { energy: incidentEnergy, distanceExponent: x };
}

// Arc flash boundary (mm): distance at which incident energy falls to 1.2 cal/cm².
function calculateArcFlashBoundary(inputs: ArcFlashInputs, arcingCurrent: number): number {
  const { voltage, clearingTime, equipmentType } = inputs;
  const En = normalizedEnergy(inputs, arcingCurrent);
  const cf = getCalcFactor(voltage);
  const x = getDistanceExponent(equipmentType, voltage);
  const energyAt610 = cf * En * (clearingTime / 0.2); // cal/cm² at 610 mm
  const boundary = 610 * Math.pow(energyAt610 / 1.2, 1 / x);
  return Math.max(200, boundary); // Minimum 200mm boundary
}

// Calculate energy at multiple distances (boundary table)
function calculateBoundaryTable(inputs: ArcFlashInputs, arcingCurrent: number): BoundaryDistance[] {
  const distances = [300, 450, 600, 900, 1200];
  const { voltage, clearingTime, equipmentType } = inputs;
  const En = normalizedEnergy(inputs, arcingCurrent);
  const cf = getCalcFactor(voltage);
  const x = getDistanceExponent(equipmentType, voltage);

  return distances.map((d) => ({
    distance: d,
    energy: Math.round(cf * En * (clearingTime / 0.2) * Math.pow(610 / d, x) * 100) / 100,
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
  const calculationMethod = validation.isValid ? 'IEEE 1584-2002' : 'IEEE 1584-2002 (extrapolated)';

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
