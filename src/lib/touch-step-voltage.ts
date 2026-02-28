/**
 * Touch and Step Voltage Calculation Engine
 *
 * Calculates touch voltages, step voltages, electrode resistance,
 * body current and physiological effect zones for UK earthing
 * installations.
 *
 * Standards:
 *   - BS 7671:2018+A2:2022 Sections 411 / 412
 *   - BS EN 50522 (Earthing of power installations exceeding 1 kV AC)
 *   - ENA TS 41-24 (Guidelines for the design, installation, testing
 *     and maintenance of main earthing systems in substations)
 *   - IEC 60479-1 (Effects of current on human beings)
 */

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface TouchStepInputs {
  /** Earth fault current in amperes */
  earthFaultCurrent: number;
  /** Soil resistivity in ohm-metres */
  soilResistivity: number;
  /** Type of earth electrode */
  electrodeType: 'rod' | 'plate' | 'strip' | 'mesh';
  /** Physical dimensions of the electrode (metres) */
  electrodeDimensions: {
    /** Driven length (rod) or horizontal run (strip / mesh) */
    length?: number;
    /** Burial depth (strip) */
    depth?: number;
    /** Surface area (plate / mesh) in m squared */
    area?: number;
    /** Diameter of rod or width of strip in metres */
    diameter?: number;
  };
  /** Fault duration in seconds */
  faultDuration: number;
  /** Whether this is a touch or step contact scenario */
  contactScenario: 'touch' | 'step';
  /** Body impedance in ohms (default 1000 ohm per IEC 60479) */
  bodyImpedance?: number;
}

export interface TouchStepResult {
  /** Calculated electrode resistance in ohms */
  electrodeResistance: number;
  /** Prospective touch voltage in volts */
  touchVoltage: number;
  /** Prospective step voltage in volts */
  stepVoltage: number;
  /** Maximum permissible touch voltage for the fault duration */
  permissibleTouchVoltage: number;
  /** Maximum permissible step voltage for the fault duration */
  permissibleStepVoltage: number;
  /** Body current in milliamperes */
  bodyCurrent: number;
  /** IEC 60479 physiological effect zone description */
  physiologicalZone: string;
  /** Overall pass or fail assessment */
  passOrFail: 'pass' | 'fail';
  /** Earth potential rise (EPR) in volts */
  earthPotentialRise: number;
}

// ---------------------------------------------------------------------------
// UK soil resistivity presets (ohm-metres)
// ---------------------------------------------------------------------------

export const SOIL_PRESETS: Record<string, number> = {
  clay: 40,
  sand: 200,
  chalk: 100,
  rock: 1000,
  loam: 80,
  gravel: 300,
};

// ---------------------------------------------------------------------------
// Permissible voltage curves  (IEC 60479 / BS 7671 Table 41.1)
// ---------------------------------------------------------------------------

/**
 * Returns the maximum permissible touch voltage for a given fault
 * duration, derived from the IEC 60479 body-current / time curves and
 * BS 7671 Table 41.1.
 */
function getPermissibleTouchVoltage(faultDuration: number): number {
  if (faultDuration <= 0.1) return 750;
  if (faultDuration <= 0.2) return 500;
  if (faultDuration <= 0.4) return 250;
  if (faultDuration <= 1.0) return 120;
  return 50; // continuous contact per BS 7671
}

/**
 * Step voltages are inherently less dangerous because current flows
 * foot-to-foot rather than hand-to-foot.  BS EN 50522 and ENA TS 41-24
 * apply a factor of approximately 2x compared with touch voltages.
 */
function getPermissibleStepVoltage(faultDuration: number): number {
  return getPermissibleTouchVoltage(faultDuration) * 2;
}

// ---------------------------------------------------------------------------
// Physiological effect zones (IEC 60479-1)
// ---------------------------------------------------------------------------

function getPhysiologicalZone(bodyCurrentMa: number): string {
  if (bodyCurrentMa < 0.5) {
    return 'Zone 1 — no reaction (below perception threshold)';
  }
  if (bodyCurrentMa <= 10) {
    return 'Zone 2 — perception, but no harmful effect';
  }
  if (bodyCurrentMa <= 100) {
    return 'Zone 3 — muscular contractions likely, reversible effects';
  }
  return 'Zone 4 — ventricular fibrillation risk, potentially lethal';
}

// ---------------------------------------------------------------------------
// Electrode resistance calculations
// ---------------------------------------------------------------------------

/**
 * Vertical driven rod:
 *   R = (rho / (2 * pi * L)) * ln(4L / d)
 *
 * Where:
 *   rho = soil resistivity (ohm-m)
 *   L   = driven length (m)
 *   d   = rod diameter (m)
 */
function rodResistance(rho: number, length: number, diameter: number): number {
  return (rho / (2 * Math.PI * length)) * Math.log((4 * length) / diameter);
}

/**
 * Buried plate electrode:
 *   R = rho / (4 * sqrt(A / pi))
 *
 * Where A = plate area (m squared).
 */
function plateResistance(rho: number, area: number): number {
  const equivalentRadius = Math.sqrt(area / Math.PI);
  return rho / (4 * equivalentRadius);
}

/**
 * Horizontal strip (or tape) electrode:
 *   R = (rho / (pi * L)) * ln(2L squared / (w * d))
 *
 * Where:
 *   L = strip length (m)
 *   w = strip width (m)  — passed via diameter field
 *   d = burial depth (m)
 */
function stripResistance(rho: number, length: number, width: number, depth: number): number {
  return (rho / (Math.PI * length)) * Math.log((2 * length * length) / (width * depth));
}

/**
 * Mesh (grid) electrode:
 *   R = rho / (4 * r) + rho / L
 *
 * Where:
 *   r = equivalent radius = sqrt(A / pi)
 *   L = total conductor length within the mesh (m)
 */
function meshResistance(rho: number, area: number, totalLength: number): number {
  const equivalentRadius = Math.sqrt(area / Math.PI);
  return rho / (4 * equivalentRadius) + rho / totalLength;
}

// ---------------------------------------------------------------------------
// Electrode resistance dispatcher
// ---------------------------------------------------------------------------

function calculateElectrodeResistance(
  rho: number,
  electrodeType: TouchStepInputs['electrodeType'],
  dims: TouchStepInputs['electrodeDimensions']
): number {
  switch (electrodeType) {
    case 'rod': {
      const length = dims.length ?? 2.4; // typical 2.4 m rod
      const diameter = dims.diameter ?? 0.016; // 16 mm copper-bonded rod
      return rodResistance(rho, length, diameter);
    }

    case 'plate': {
      const area = dims.area ?? 0.5; // 0.5 m squared default
      return plateResistance(rho, area);
    }

    case 'strip': {
      const length = dims.length ?? 10;
      const width = dims.diameter ?? 0.025; // 25 mm tape
      const depth = dims.depth ?? 0.6; // 600 mm burial depth
      return stripResistance(rho, length, width, depth);
    }

    case 'mesh': {
      const area = dims.area ?? 100; // 10 m x 10 m grid
      const totalLength = dims.length ?? 60; // total conductor run
      return meshResistance(rho, area, totalLength);
    }

    default: {
      const _exhaustive: never = electrodeType;
      throw new Error(`Unsupported electrode type: ${_exhaustive}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

/**
 * Calculates touch and step voltages, body current, physiological
 * effect zone and overall pass/fail for a given earthing arrangement.
 *
 * Touch voltage is taken as 70 % of the earth potential rise (EPR) per
 * BS EN 50522 Annex E simplified approach, and step voltage as 20 % of
 * EPR per ENA TS 41-24.
 */
export function calculateTouchStepVoltage(inputs: TouchStepInputs): TouchStepResult {
  const bodyImpedance = inputs.bodyImpedance ?? 1000;

  // 1. Electrode resistance
  const electrodeResistance = calculateElectrodeResistance(
    inputs.soilResistivity,
    inputs.electrodeType,
    inputs.electrodeDimensions
  );

  // 2. Earth potential rise  (EPR = If * Re)
  const earthPotentialRise = inputs.earthFaultCurrent * electrodeResistance;

  // 3. Touch and step voltages (BS EN 50522 / ENA TS 41-24 ratios)
  const touchVoltage = earthPotentialRise * 0.7;
  const stepVoltage = earthPotentialRise * 0.2;

  // 4. Body current for the selected contact scenario
  const prospectiveVoltage = inputs.contactScenario === 'touch' ? touchVoltage : stepVoltage;
  const bodyCurrentA = prospectiveVoltage / bodyImpedance;
  const bodyCurrentMa = bodyCurrentA * 1000;

  // 5. Permissible limits
  const permissibleTouchVoltage = getPermissibleTouchVoltage(inputs.faultDuration);
  const permissibleStepVoltage = getPermissibleStepVoltage(inputs.faultDuration);

  // 6. Physiological zone
  const physiologicalZone = getPhysiologicalZone(bodyCurrentMa);

  // 7. Pass / fail assessment
  const touchOk = touchVoltage <= permissibleTouchVoltage;
  const stepOk = stepVoltage <= permissibleStepVoltage;
  const passOrFail: 'pass' | 'fail' = touchOk && stepOk ? 'pass' : 'fail';

  return {
    electrodeResistance: parseFloat(electrodeResistance.toFixed(3)),
    touchVoltage: parseFloat(touchVoltage.toFixed(2)),
    stepVoltage: parseFloat(stepVoltage.toFixed(2)),
    permissibleTouchVoltage,
    permissibleStepVoltage,
    bodyCurrent: parseFloat(bodyCurrentMa.toFixed(2)),
    physiologicalZone,
    passOrFail,
    earthPotentialRise: parseFloat(earthPotentialRise.toFixed(2)),
  };
}
