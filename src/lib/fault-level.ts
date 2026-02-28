/**
 * Fault Level Calculation Engine for UK Electrical Installations
 *
 * Calculates prospective fault currents at each point in a distribution
 * system, from the source (transformer or supply) through cable segments.
 *
 * References:
 *   - BS 7671:2018+A2:2022, Regulation 434.2
 *   - IEC 60909 (Short-circuit currents in three-phase AC systems)
 *
 * All values use SI units unless stated otherwise.
 * Cable data based on copper and aluminium conductors at 20 degrees C.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CableSegment {
  /** Human-readable label, e.g. "Sub-main to DB-A" */
  label: string;
  /** Cross-sectional area in mm squared */
  size: number;
  /** Route length in metres */
  length: number;
  /** Conductor material: copper or aluminium */
  material: 'cu' | 'al';
  /** Installation method reference, e.g. "C" (clipped direct) */
  installationMethod: string;
}

export interface FaultLevelInputs {
  /** Whether the source is a transformer or a known supply Ze */
  sourceType: 'transformer' | 'supply';
  /** Transformer rated apparent power in kVA */
  transformerKVA?: number;
  /** Transformer percentage impedance (%) */
  transformerImpedance?: number;
  /** External earth fault loop impedance in ohms (supply mode) */
  supplyZe?: number;
  /** Nominal system voltage in volts (line-to-line), typically 400 V */
  systemVoltage: number;
  /** Ordered cable segments from source to final point */
  cableSegments: CableSegment[];
}

export interface FaultPoint {
  /** Label describing this point in the distribution */
  label: string;
  /** Impedance contribution of this segment in ohms */
  impedance: number;
  /** Cumulative impedance from the source to this point in ohms */
  cumulativeZ: number;
  /** Three-phase symmetrical fault current in amperes */
  faultCurrent3ph: number;
  /** Single-phase to earth fault current in amperes */
  faultCurrent1ph: number;
  /** PEN fault current in amperes (TN-C-S / PME systems) */
  faultCurrentPEN: number;
  /** Minimum breaking capacity required in kA */
  breakingCapacity: number;
}

export interface FaultLevelResult {
  /** Fault data at each distribution point */
  points: FaultPoint[];
  /** Total impedance from source to final point in ohms */
  totalImpedance: number;
  /** Source impedance only (transformer or Ze) in ohms */
  sourceImpedance: number;
}

// ---------------------------------------------------------------------------
// Transformer lookup table — UK standard distribution sizes
// ---------------------------------------------------------------------------

export interface TransformerSpec {
  /** Rated apparent power in kVA */
  ratingKVA: number;
  /** Typical percentage impedance (%) */
  typicalImpedancePercent: number;
  /** Secondary voltage (line-to-line) in volts */
  secondaryVoltage: number;
  /** Typical full-load current on secondary side in amperes */
  fullLoadCurrent: number;
}

/**
 * Standard UK three-phase oil-filled distribution transformer data.
 *
 * Impedance values are representative; always confirm against the
 * manufacturer nameplate for the actual installation.
 */
export const TRANSFORMER_DATA: TransformerSpec[] = [
  {
    ratingKVA: 50,
    typicalImpedancePercent: 4.0,
    secondaryVoltage: 400,
    fullLoadCurrent: 72.2,
  },
  {
    ratingKVA: 100,
    typicalImpedancePercent: 4.0,
    secondaryVoltage: 400,
    fullLoadCurrent: 144.3,
  },
  {
    ratingKVA: 200,
    typicalImpedancePercent: 4.5,
    secondaryVoltage: 400,
    fullLoadCurrent: 288.7,
  },
  {
    ratingKVA: 315,
    typicalImpedancePercent: 4.5,
    secondaryVoltage: 400,
    fullLoadCurrent: 454.7,
  },
  {
    ratingKVA: 500,
    typicalImpedancePercent: 5.0,
    secondaryVoltage: 400,
    fullLoadCurrent: 721.7,
  },
  {
    ratingKVA: 800,
    typicalImpedancePercent: 5.5,
    secondaryVoltage: 400,
    fullLoadCurrent: 1154.7,
  },
  {
    ratingKVA: 1000,
    typicalImpedancePercent: 6.0,
    secondaryVoltage: 400,
    fullLoadCurrent: 1443.4,
  },
];

// ---------------------------------------------------------------------------
// Cable resistivity and reactance data
// ---------------------------------------------------------------------------

/** Resistivity of copper at 20 degrees C in ohm-mm-squared per metre */
const CU_RESISTIVITY = 0.0178;

/** Resistivity of aluminium at 20 degrees C in ohm-mm-squared per metre */
const AL_RESISTIVITY = 0.0286;

/**
 * Approximate cable reactance in ohms per metre.
 *
 * For cables up to 25 mm squared the reactance is approximately
 * 0.08 milliohms per metre; for larger cables it drops to roughly
 * 0.07 milliohms per metre. These are typical values for single-core
 * or multicore cables in trefoil or flat formation.
 */
const REACTANCE_THRESHOLD_MM2 = 25;
const REACTANCE_SMALL_OHM_PER_M = 0.00008; // 0.08 milliohms/m
const REACTANCE_LARGE_OHM_PER_M = 0.00007; // 0.07 milliohms/m

/** Square root of 3 — used in three-phase calculations */
const SQRT3 = Math.sqrt(3);

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Return the resistivity for the given conductor material.
 */
function resistivityForMaterial(material: 'cu' | 'al'): number {
  return material === 'cu' ? CU_RESISTIVITY : AL_RESISTIVITY;
}

/**
 * Return the per-metre reactance based on cable cross-sectional area.
 */
function reactancePerMetre(sizeMm2: number): number {
  return sizeMm2 <= REACTANCE_THRESHOLD_MM2 ? REACTANCE_SMALL_OHM_PER_M : REACTANCE_LARGE_OHM_PER_M;
}

/**
 * Calculate the impedance of a single cable segment.
 *
 * Z = sqrt(R squared + X squared)
 * where R = (resistivity * length) / cross-sectional area
 *       X = reactance per metre * length
 */
function cableImpedance(segment: CableSegment): number {
  const rho = resistivityForMaterial(segment.material);
  const resistance = (rho * segment.length) / segment.size;
  const reactance = reactancePerMetre(segment.size) * segment.length;
  return Math.sqrt(resistance * resistance + reactance * reactance);
}

/**
 * Calculate the source impedance referred to the secondary side
 * of a transformer.
 *
 * Z_source = (V squared / (kVA * 1000)) * (impedance% / 100)
 *
 * Where V is the line-to-line voltage on the secondary.
 */
function transformerSourceImpedance(
  voltageV: number,
  ratingKVA: number,
  impedancePercent: number
): number {
  return ((voltageV * voltageV) / (ratingKVA * 1000)) * (impedancePercent / 100);
}

/**
 * Calculate the three-phase symmetrical fault current.
 *
 * I_fault_3ph = V_line / (sqrt(3) * Z_total)
 */
function threePhFaultCurrent(lineVoltage: number, totalZ: number): number {
  if (totalZ <= 0) return Infinity;
  return lineVoltage / (SQRT3 * totalZ);
}

/**
 * Calculate the single-phase to earth fault current.
 *
 * I_fault_1ph = V_phase / Z_total
 * where V_phase = V_line / sqrt(3)
 */
function singlePhFaultCurrent(lineVoltage: number, totalZ: number): number {
  if (totalZ <= 0) return Infinity;
  const phaseVoltage = lineVoltage / SQRT3;
  return phaseVoltage / totalZ;
}

/**
 * Estimate the PEN fault current for TN-C-S (PME) systems.
 *
 * In a combined neutral/earth conductor the fault loop impedance
 * is approximately 1.5 times the phase-conductor impedance because
 * the return path shares part of the line conductor impedance.
 *
 * I_fault_PEN = V_phase / (1.5 * Z_total)
 *
 * This is a conservative approximation; detailed calculations should
 * consider the actual conductor arrangement.
 */
function penFaultCurrent(lineVoltage: number, totalZ: number): number {
  if (totalZ <= 0) return Infinity;
  const phaseVoltage = lineVoltage / SQRT3;
  return phaseVoltage / (1.5 * totalZ);
}

/**
 * Determine the minimum standard breaking capacity in kA that
 * exceeds the prospective fault current.
 *
 * Standard breaking capacities per BS EN 60898 / BS EN 61009:
 * 1.5, 3, 4.5, 6, 10, 16, 25, 36, 50 kA.
 */
function requiredBreakingCapacity(faultCurrentA: number): number {
  const standardRatings = [1.5, 3, 4.5, 6, 10, 16, 25, 36, 50];
  const faultCurrentKA = faultCurrentA / 1000;
  for (const rating of standardRatings) {
    if (rating >= faultCurrentKA) {
      return rating;
    }
  }
  // If the fault current exceeds the highest standard rating,
  // return the actual value rounded up to the nearest whole kA.
  return Math.ceil(faultCurrentKA);
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validate the inputs and return an error message if something is wrong,
 * or null if the inputs are acceptable.
 */
function validateInputs(inputs: FaultLevelInputs): string | null {
  if (inputs.sourceType === 'transformer') {
    if (inputs.transformerKVA === undefined || inputs.transformerKVA <= 0) {
      return 'Transformer kVA rating must be a positive number.';
    }
    if (
      inputs.transformerImpedance === undefined ||
      inputs.transformerImpedance <= 0 ||
      inputs.transformerImpedance > 100
    ) {
      return 'Transformer impedance must be greater than 0 and up to 100 percent.';
    }
  }

  if (inputs.sourceType === 'supply') {
    if (inputs.supplyZe === undefined || inputs.supplyZe <= 0) {
      return 'Supply Ze must be a positive number in ohms.';
    }
  }

  if (inputs.systemVoltage <= 0) {
    return 'System voltage must be a positive number.';
  }

  for (const segment of inputs.cableSegments) {
    if (segment.size <= 0) {
      return `Cable segment "${segment.label}" has an invalid size. Must be a positive number in mm squared.`;
    }
    if (segment.length <= 0) {
      return `Cable segment "${segment.label}" has an invalid length. Must be a positive number in metres.`;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the prospective fault level at each point in a distribution
 * system, working from the source through each cable segment.
 *
 * Regulation reference:
 *   BS 7671:2018+A2:2022 Regulation 434.2 requires that the prospective
 *   fault current at every relevant point shall be determined. Every
 *   protective device must have a rated short-circuit capacity not less
 *   than the prospective fault current at its point of installation.
 *
 * IEC 60909 provides the standardised method for calculating
 * short-circuit currents in three-phase AC systems.
 *
 * @param inputs - Source data and cable segment definitions
 * @returns Fault level results with a breakdown at each point
 * @throws Error if inputs are invalid
 */
export function calculateFaultLevel(inputs: FaultLevelInputs): FaultLevelResult {
  const validationError = validateInputs(inputs);
  if (validationError) {
    throw new Error(validationError);
  }

  // Determine source impedance
  let sourceZ: number;
  if (inputs.sourceType === 'transformer') {
    sourceZ = transformerSourceImpedance(
      inputs.systemVoltage,
      inputs.transformerKVA!,
      inputs.transformerImpedance!
    );
  } else {
    sourceZ = inputs.supplyZe!;
  }

  // Build up fault points, accumulating impedance along the route
  const points: FaultPoint[] = [];
  let cumulativeZ = sourceZ;

  // Add the source point itself
  const sourceFault3ph = threePhFaultCurrent(inputs.systemVoltage, cumulativeZ);
  const sourceFault1ph = singlePhFaultCurrent(inputs.systemVoltage, cumulativeZ);
  const sourceFaultPEN = penFaultCurrent(inputs.systemVoltage, cumulativeZ);
  const sourceBreaking = requiredBreakingCapacity(sourceFault3ph);

  points.push({
    label:
      inputs.sourceType === 'transformer'
        ? `Transformer secondary (${inputs.transformerKVA} kVA)`
        : 'Supply point (Ze)',
    impedance: sourceZ,
    cumulativeZ,
    faultCurrent3ph: sourceFault3ph,
    faultCurrent1ph: sourceFault1ph,
    faultCurrentPEN: sourceFaultPEN,
    breakingCapacity: sourceBreaking,
  });

  // Process each cable segment
  for (const segment of inputs.cableSegments) {
    const segmentZ = cableImpedance(segment);
    cumulativeZ += segmentZ;

    const fault3ph = threePhFaultCurrent(inputs.systemVoltage, cumulativeZ);
    const fault1ph = singlePhFaultCurrent(inputs.systemVoltage, cumulativeZ);
    const faultPEN = penFaultCurrent(inputs.systemVoltage, cumulativeZ);
    const breaking = requiredBreakingCapacity(fault3ph);

    points.push({
      label: segment.label,
      impedance: segmentZ,
      cumulativeZ,
      faultCurrent3ph: fault3ph,
      faultCurrent1ph: fault1ph,
      faultCurrentPEN: faultPEN,
      breakingCapacity: breaking,
    });
  }

  return {
    points,
    totalImpedance: cumulativeZ,
    sourceImpedance: sourceZ,
  };
}
