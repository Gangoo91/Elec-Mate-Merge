/**
 * BS EN 62305-2 Lightning Protection Risk Assessment Engine
 *
 * Implements risk assessment methodology per:
 *   - BS EN 62305-1:2011 General principles
 *   - BS EN 62305-2:2012 Risk management
 *   - BS EN 62305-3:2011 Physical damage / life hazard
 *   - BS EN 62305-4:2011 Electrical and electronic systems
 *   - IEC 62305 series
 *
 * All values use SI units unless stated otherwise.
 * Costs are in GBP (typical UK market rates).
 */

// ---------------------------------------------------------------------------
// Public interfaces
// ---------------------------------------------------------------------------

export interface LightningInputs {
  /** Building length in metres */
  buildingLength: number;
  /** Building width in metres */
  buildingWidth: number;
  /** Building height in metres */
  buildingHeight: number;
  /** UK geographic region — determines ground flash density Ng */
  ukRegion: string;
  /** Primary structural construction type */
  buildingConstruction: 'steel_frame' | 'reinforced_concrete' | 'brick' | 'timber';
  /** Roof covering type */
  roofType: 'metal' | 'tile' | 'flat_membrane';
  /** Value / sensitivity of contents */
  contentsRisk: 'low' | 'normal' | 'high' | 'critical';
  /** Building occupancy classification */
  occupancy: 'residential' | 'commercial' | 'industrial' | 'public' | 'hospital';
  /** Types of incoming utility services */
  incomingServices: ('overhead_lines' | 'buried_cables' | 'water_gas_pipes')[];
  /** Existing lightning / surge protection measures */
  existingProtection: 'none' | 'external_lps' | 'spds' | 'both';
}

export interface LightningResult {
  /** Equivalent collection area Ad (m²) */
  collectionArea: number;
  /** Expected direct strikes per year Nd */
  expectedStrikes: number;
  /** Risk component R1 — injury to living beings */
  riskR1: number;
  /** Risk component R2 — physical damage to the structure */
  riskR2: number;
  /** Risk component R3 — failure of internal electrical systems */
  riskR3: number;
  /** Risk component R4 — economic loss */
  riskR4: number;
  /** Total risk R = R1 + R2 + R3 + R4 */
  totalRisk: number;
  /** Tolerable risk RT (BS EN 62305-2 Table 7 — 10⁻⁵) */
  tolerableRisk: number;
  /** Whether lightning protection is required (R > RT) */
  protectionRequired: boolean;
  /** Human-readable verdict summary */
  verdict: string;
  /** Required LPS class (I / II / III / IV) or null if not needed */
  lpsClass: string | null;
  /** Whether surge protective devices are recommended */
  spdRequired: boolean;
  /** Indicative installed cost range in GBP */
  costEstimate: { min: number; max: number };
}

// ---------------------------------------------------------------------------
// UK regional ground flash density Ng (flashes / km² / year)
// ---------------------------------------------------------------------------

export const UK_REGIONS: Record<string, number> = {
  'South East': 1.5,
  'South West': 1.2,
  Midlands: 1.0,
  'North England': 0.8,
  Wales: 0.9,
  Scotland: 0.5,
  'Northern Ireland': 0.6,
};

// ---------------------------------------------------------------------------
// Internal look-up tables
// ---------------------------------------------------------------------------

/** Environment / location factor Cd (BS EN 62305-2 Table A.2) */
const ENVIRONMENT_FACTOR_CD: Record<string, number> = {
  steel_frame: 0.5,
  reinforced_concrete: 0.5,
  brick: 1.0,
  timber: 2.0,
};

/**
 * Probability of damage PB (BS EN 62305-2 Table B.2)
 * Represents the probability that a strike to the structure causes
 * physical damage, accounting for construction and roof type.
 */
const PROBABILITY_PB: Record<string, Record<string, number>> = {
  steel_frame: { metal: 0.001, tile: 0.01, flat_membrane: 0.01 },
  reinforced_concrete: { metal: 0.01, tile: 0.05, flat_membrane: 0.05 },
  brick: { metal: 0.05, tile: 0.1, flat_membrane: 0.1 },
  timber: { metal: 0.1, tile: 0.2, flat_membrane: 0.2 },
};

/**
 * Loss factors per risk component (BS EN 62305-2 Table C.1 simplified)
 * L values depend on occupancy type.
 */
interface LossFactors {
  /** L1 — loss of human life */
  l1: number;
  /** L2 — loss of service to the public */
  l2: number;
  /** L3 — loss of cultural heritage (not used here) */
  l3: number;
  /** L4 — economic loss */
  l4: number;
}

const LOSS_FACTORS: Record<string, LossFactors> = {
  residential: { l1: 1e-2, l2: 1e-3, l3: 0, l4: 1e-2 },
  commercial: { l1: 1e-2, l2: 1e-2, l3: 0, l4: 1e-1 },
  industrial: { l1: 1e-2, l2: 1e-2, l3: 0, l4: 5e-2 },
  public: { l1: 5e-2, l2: 5e-2, l3: 1e-3, l4: 1e-1 },
  hospital: { l1: 1e-1, l2: 1e-1, l3: 0, l4: 5e-1 },
};

/** Contents risk multiplier applied to R3 and R4 */
const CONTENTS_MULTIPLIER: Record<string, number> = {
  low: 0.5,
  normal: 1.0,
  high: 2.0,
  critical: 5.0,
};

/**
 * Protection reduction factor for existing measures.
 * Applied as a divisor to the overall risk.
 */
const EXISTING_PROTECTION_FACTOR: Record<string, number> = {
  none: 1.0,
  external_lps: 0.2,
  spds: 0.5,
  both: 0.05,
};

/** Multiplier for incoming-service contribution to R3 */
const SERVICE_FACTOR: Record<string, number> = {
  overhead_lines: 1.0,
  buried_cables: 0.5,
  water_gas_pipes: 0.2,
};

/** LPS class cost estimate ranges in GBP */
const LPS_COST: Record<string, { min: number; max: number }> = {
  IV: { min: 3_000, max: 8_000 },
  III: { min: 5_000, max: 15_000 },
  II: { min: 8_000, max: 25_000 },
  I: { min: 15_000, max: 50_000 },
};

const SPD_COST = { min: 500, max: 2_000 };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve Ng from region string; falls back to UK average of 1.0. */
function resolveNg(region: string): number {
  return UK_REGIONS[region] ?? 1.0;
}

/**
 * Calculate equivalent collection area Ad (m²).
 *
 * Ad = L × W + 2 × (3H) × (L + W) + π × (3H)²
 *
 * This is the area within which a lightning leader is likely to be
 * attracted to the structure (BS EN 62305-2 Annex A).
 */
function collectionArea(l: number, w: number, h: number): number {
  const tripleH = 3 * h;
  return l * w + 2 * tripleH * (l + w) + Math.PI * tripleH * tripleH;
}

/**
 * Determine the aggregate service factor from a list of incoming services.
 * If no services are present, defaults to 0.5 (basic buried supply).
 */
function aggregateServiceFactor(services: LightningInputs['incomingServices']): number {
  if (services.length === 0) return 0.5;
  return services.reduce((sum, s) => sum + (SERVICE_FACTOR[s] ?? 0), 0);
}

/**
 * Determine LPS class from required protection efficiency E.
 *
 *   E = 1 − RT / R
 *
 * BS EN 62305-1 Table 2:
 *   Class I   → E ≥ 0.98
 *   Class II  → E ≥ 0.95
 *   Class III → E ≥ 0.90
 *   Class IV  → E ≥ 0.80
 */
function determineLpsClass(totalRisk: number, tolerableRisk: number): string | null {
  if (totalRisk <= tolerableRisk) return null;

  const efficiency = 1 - tolerableRisk / totalRisk;

  if (efficiency >= 0.98) return 'I';
  if (efficiency >= 0.95) return 'II';
  if (efficiency >= 0.9) return 'III';
  if (efficiency >= 0.8) return 'IV';

  // Edge case: risk only marginally exceeds RT — Class IV suffices.
  return 'IV';
}

/** Build a human-readable verdict string. */
function buildVerdict(
  protectionRequired: boolean,
  lpsClass: string | null,
  spdRequired: boolean,
  totalRisk: number,
  tolerableRisk: number
): string {
  if (!protectionRequired) {
    return (
      'Lightning protection is not required under BS EN 62305-2. ' +
      `Total risk (${totalRisk.toExponential(2)}) is within the ` +
      `tolerable limit (${tolerableRisk.toExponential(2)}).`
    );
  }

  const parts: string[] = [
    `Lightning protection IS required. Total risk ` +
      `(${totalRisk.toExponential(2)}) exceeds the tolerable limit ` +
      `(${tolerableRisk.toExponential(2)}).`,
  ];

  if (lpsClass) {
    parts.push(`Install a Class ${lpsClass} LPS to BS EN 62305-3.`);
  }

  if (spdRequired) {
    parts.push(
      'Surge protective devices (SPDs) should be installed at the ' +
        'origin and distribution boards to BS EN 62305-4.'
    );
  }

  return parts.join(' ');
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

/**
 * Perform a BS EN 62305-2 lightning protection risk assessment.
 *
 * @param inputs - Building and environmental parameters
 * @returns Full risk assessment result
 */
export function calculateLightningProtection(inputs: LightningInputs): LightningResult {
  // 1. Ground flash density
  const ng = resolveNg(inputs.ukRegion);

  // 2. Collection area Ad
  const ad = collectionArea(inputs.buildingLength, inputs.buildingWidth, inputs.buildingHeight);

  // 3. Environment factor Cd
  const cd = ENVIRONMENT_FACTOR_CD[inputs.buildingConstruction] ?? 1.0;

  // 4. Expected number of direct strikes per year
  //    Nd = Ng × Ad × Cd × 10⁻⁶
  const nd = ng * ad * cd * 1e-6;

  // 5. Probability of damage PB
  const pb = PROBABILITY_PB[inputs.buildingConstruction]?.[inputs.roofType] ?? 0.1;

  // 6. Loss factors
  const loss = LOSS_FACTORS[inputs.occupancy] ?? LOSS_FACTORS.commercial;

  // 7. Contents multiplier
  const cm = CONTENTS_MULTIPLIER[inputs.contentsRisk] ?? 1.0;

  // 8. Service factor for R3
  const sf = aggregateServiceFactor(inputs.incomingServices);

  // 9. Existing protection reduction factor
  const pf = EXISTING_PROTECTION_FACTOR[inputs.existingProtection] ?? 1.0;

  // 10. Calculate individual risk components
  //     R = Nd × P × L (adjusted)
  const riskR1 = nd * pb * loss.l1 * pf;
  const riskR2 = nd * pb * loss.l2 * pf;
  const riskR3 = nd * pb * loss.l2 * sf * cm * pf;
  const riskR4 = nd * pb * loss.l4 * cm * pf;

  const totalRisk = riskR1 + riskR2 + riskR3 + riskR4;

  // 11. Tolerable risk RT = 10⁻⁵ (BS EN 62305-2 Table 7)
  const tolerableRisk = 1e-5;

  // 12. Protection required?
  const protectionRequired = totalRisk > tolerableRisk;

  // 13. LPS class
  const lpsClass = determineLpsClass(totalRisk, tolerableRisk);

  // 14. SPD recommendation
  //     Required if R3 alone exceeds RT, or overhead lines are present,
  //     or contents risk is high / critical.
  const spdRequired =
    riskR3 > tolerableRisk ||
    inputs.incomingServices.includes('overhead_lines') ||
    inputs.contentsRisk === 'high' ||
    inputs.contentsRisk === 'critical';

  // 15. Cost estimate
  const costEstimate = calculateCostEstimate(lpsClass, spdRequired);

  // 16. Verdict
  const verdict = buildVerdict(protectionRequired, lpsClass, spdRequired, totalRisk, tolerableRisk);

  return {
    collectionArea: round(ad, 2),
    expectedStrikes: round(nd, 6),
    riskR1: round(riskR1, 10),
    riskR2: round(riskR2, 10),
    riskR3: round(riskR3, 10),
    riskR4: round(riskR4, 10),
    totalRisk: round(totalRisk, 10),
    tolerableRisk,
    protectionRequired,
    verdict,
    lpsClass,
    spdRequired,
    costEstimate,
  };
}

// ---------------------------------------------------------------------------
// Cost estimation
// ---------------------------------------------------------------------------

function calculateCostEstimate(
  lpsClass: string | null,
  spdRequired: boolean
): { min: number; max: number } {
  let min = 0;
  let max = 0;

  if (lpsClass) {
    const lpsCost = LPS_COST[lpsClass];
    if (lpsCost) {
      min += lpsCost.min;
      max += lpsCost.max;
    }
  }

  if (spdRequired) {
    min += SPD_COST.min;
    max += SPD_COST.max;
  }

  return { min, max };
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/** Round a number to a given number of significant decimal places. */
function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
