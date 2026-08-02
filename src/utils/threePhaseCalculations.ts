/**
 * Three-phase electrical calculations
 *
 * Provides utilities for:
 * - Phase balance calculations (max deviation from average — NEMA/IEC convention)
 * - Neutral current estimation (vector sum)
 * - Voltage tolerance checks
 * - Three-phase circuit grouping
 * - Rebalancing suggestions (which circuits to move between phases)
 *
 * Note on imbalance: BS 7671 does not prescribe a numeric phase-imbalance
 * limit. Balanced load distribution is good design practice — it reduces
 * neutral current and voltage imbalance — so the bands used here are
 * guidance only, never presented as regulatory limits.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface PhaseLoadData {
  L1: number; // Amps on phase 1
  L2: number; // Amps on phase 2
  L3: number; // Amps on phase 3
}

export interface PhaseVoltageData {
  L1_N: number; // Line to Neutral (230V nominal)
  L2_N: number;
  L3_N: number;
  L1_L2?: number; // Line to Line (400V nominal)
  L2_L3?: number;
  L1_L3?: number;
}

/**
 * Guidance band for phase imbalance (max deviation from average):
 * ≤5% balanced · 5–15% review · >15% high. Advisory only — not a
 * regulatory limit.
 */
export type PhaseBalanceBand = 'balanced' | 'review' | 'high';

export interface PhaseBalanceResult {
  /** Max deviation from the three-phase average, as % of the average */
  imbalancePercent: number;
  /** Guidance band: ≤5% balanced · 5–15% review · >15% high */
  band: PhaseBalanceBand;
  /**
   * @deprecated Legacy convenience flag (true when band !== 'high').
   * Carries no regulatory meaning — use `band` instead.
   */
  isCompliant: boolean;
  highestPhase: 'L1' | 'L2' | 'L3';
  lowestPhase: 'L1' | 'L2' | 'L3';
  recommendation?: string;
}

export interface NeutralCurrentResult {
  estimatedAmps: number;
  isAcceptable: boolean;
  warning?: string;
}

export interface VoltageComplianceResult {
  isCompliant: boolean;
  deviations: {
    phase: string;
    voltage: number;
    deviation: number;
    acceptable: boolean;
  }[];
  overallStatus: 'OK' | 'WARNING' | 'FAIL';
}

export interface ThreePhaseCircuitGroup {
  id: string;
  /** Distinct board ways the group spans (deduped, ascending) */
  positions: number[];
  label: string;
  /** Device rating in amps — null when unknown (never 0-as-unknown) */
  rating: number | null;
  deviceType: string;
  phases: ['L1', 'L2', 'L3'];
}

// ============================================================================
// PHASE BALANCE CALCULATIONS
// ============================================================================

/** Band thresholds (guidance only): ≤5% balanced · 5–15% review · >15% high */
export function phaseBalanceBand(imbalancePercent: number): PhaseBalanceBand {
  if (imbalancePercent <= 5) return 'balanced';
  if (imbalancePercent <= 15) return 'review';
  return 'high';
}

/**
 * Calculates phase imbalance using the NEMA/IEC convention:
 * max deviation from the three-phase average ÷ average × 100.
 *
 * Example: 24A / 40A / 24A → average 29.33A, max deviation 10.67A → 36.4%.
 *
 * Balanced distribution is good practice (it reduces neutral current and
 * voltage imbalance) but the bands returned are guidance, not a BS 7671
 * requirement — no numeric imbalance limit exists in the regulations.
 */
export function calculatePhaseBalance(loads: PhaseLoadData): PhaseBalanceResult {
  const { L1, L2, L3 } = loads;
  const values = [L1, L2, L3];
  const labels: ('L1' | 'L2' | 'L3')[] = ['L1', 'L2', 'L3'];

  const max = Math.max(...values);
  const min = Math.min(...values);
  const average = (L1 + L2 + L3) / 3;

  // Avoid division by zero
  if (average === 0) {
    return {
      imbalancePercent: 0,
      band: 'balanced',
      isCompliant: true,
      highestPhase: 'L1',
      lowestPhase: 'L1',
    };
  }

  const maxDeviation = Math.max(...values.map((v) => Math.abs(v - average)));
  const imbalancePercent = (maxDeviation / average) * 100;
  const maxIndex = values.indexOf(max);
  const minIndex = values.indexOf(min);
  const band = phaseBalanceBand(imbalancePercent);

  const result: PhaseBalanceResult = {
    imbalancePercent: Math.round(imbalancePercent * 10) / 10,
    band,
    isCompliant: band !== 'high',
    highestPhase: labels[maxIndex],
    lowestPhase: labels[minIndex],
  };

  // Advisory recommendations — guidance wording only, no regulatory claims
  if (band === 'high') {
    result.recommendation = `High imbalance (${result.imbalancePercent}% max deviation from average). Moving single-phase loads from ${result.highestPhase} to ${result.lowestPhase} would cut neutral current and voltage imbalance.`;
  } else if (band === 'review') {
    result.recommendation = `Imbalance of ${result.imbalancePercent}% (max deviation from average). Worth reviewing — moving a load from ${result.highestPhase} to ${result.lowestPhase} would improve balance.`;
  }

  return result;
}

/**
 * Estimates neutral current for three-phase four-wire system
 * Uses vector sum calculation for balanced/unbalanced loads
 *
 * For a star-connected system with 120° phase displacement:
 * IN = √(IL1² + IL2² + IL3² - IL1·IL2 - IL2·IL3 - IL1·IL3)
 */
export function calculateNeutralCurrent(loads: PhaseLoadData): NeutralCurrentResult {
  const { L1, L2, L3 } = loads;

  // Vector sum calculation for 120° phase displacement
  // Simplified formula for resistive loads (power factor = 1)
  const IN = Math.sqrt(L1 * L1 + L2 * L2 + L3 * L3 - L1 * L2 - L2 * L3 - L1 * L3);

  const maxPhase = Math.max(L1, L2, L3);
  const neutralRatio = maxPhase > 0 ? (IN / maxPhase) * 100 : 0;

  const result: NeutralCurrentResult = {
    estimatedAmps: Math.round(IN * 10) / 10,
    isAcceptable: IN <= maxPhase,
  };

  if (IN > maxPhase * 0.8) {
    result.warning = `High neutral current (${result.estimatedAmps}A). Check phase balance and consider harmonic content.`;
  } else if (IN > maxPhase * 0.5) {
    result.warning = `Moderate neutral current (${result.estimatedAmps}A). Phase imbalance present.`;
  }

  return result;
}

// ============================================================================
// REBALANCING SUGGESTIONS
// ============================================================================

export interface RebalanceCircuit {
  /** Board way / position of the circuit */
  way: number | string;
  label: string;
  /** Protective device rating in amps (null = unknown, circuit is skipped) */
  rating: number | null;
  /** Phase the circuit currently sits on */
  phase: 'L1' | 'L2' | 'L3';
}

export interface RebalanceMove {
  way: number | string;
  label: string;
  rating: number;
  from: 'L1' | 'L2' | 'L3';
  to: 'L1' | 'L2' | 'L3';
}

export interface RebalanceSuggestion {
  moves: RebalanceMove[];
  /** Imbalance (max deviation from average, %) after all suggested moves */
  projectedImbalancePercent: number;
  /** Estimated neutral current (A) after all suggested moves */
  projectedNeutralAmps: number;
}

const PHASE_KEYS: ('L1' | 'L2' | 'L3')[] = ['L1', 'L2', 'L3'];

/**
 * Greedily proposes up to three single-phase circuit moves from the heaviest
 * phase to the lightest to improve balance. Each step picks the movable
 * circuit whose estimated load is closest to half the current
 * heaviest–lightest gap (the ideal transfer), recomputes the totals, and
 * stops early if no move would improve the imbalance.
 *
 * Estimated loads come from device ratings (`rating × loadFactor`), so
 * projections are estimates, not measurements. `baseLoads` carries any
 * per-phase load that is fixed (three-phase groups, circuits that cannot be
 * moved) so projections line up with the displayed totals.
 *
 * Guidance only — proposed moves must be confirmed as practical on site.
 */
export function suggestRebalance(
  circuits: RebalanceCircuit[],
  options?: { loadFactor?: number; baseLoads?: PhaseLoadData }
): RebalanceSuggestion {
  const loadFactor = options?.loadFactor ?? 0.5;
  const base = options?.baseLoads ?? { L1: 0, L2: 0, L3: 0 };

  // Movable circuits need a usable rating
  const movable = circuits
    .filter((c) => c.rating !== null && Number.isFinite(c.rating) && (c.rating as number) > 0)
    .map((c) => ({ ...c, rating: c.rating as number, load: (c.rating as number) * loadFactor }));

  // Working totals: fixed base + movable circuit loads
  const totals: PhaseLoadData = { L1: base.L1, L2: base.L2, L3: base.L3 };
  movable.forEach((c) => {
    totals[c.phase] += c.load;
  });

  const imbalanceOf = (t: PhaseLoadData): number => {
    const avg = (t.L1 + t.L2 + t.L3) / 3;
    if (avg === 0) return 0;
    const maxDev = Math.max(...PHASE_KEYS.map((k) => Math.abs(t[k] - avg)));
    return (maxDev / avg) * 100;
  };

  const moves: RebalanceMove[] = [];
  const moved = new Set<number>(); // indices into `movable` already proposed

  for (let step = 0; step < 3; step++) {
    const currentImbalance = imbalanceOf(totals);
    if (currentImbalance <= 5) break; // already balanced — stop

    // Identify heaviest and lightest phases on current totals
    let heaviest: 'L1' | 'L2' | 'L3' = 'L1';
    let lightest: 'L1' | 'L2' | 'L3' = 'L1';
    PHASE_KEYS.forEach((k) => {
      if (totals[k] > totals[heaviest]) heaviest = k;
      if (totals[k] < totals[lightest]) lightest = k;
    });
    if (heaviest === lightest) break;

    const gap = totals[heaviest] - totals[lightest];
    const idealTransfer = gap / 2;

    // Candidates: single-phase circuits currently on the heaviest phase
    let bestIdx = -1;
    let bestDistance = Infinity;
    movable.forEach((c, idx) => {
      if (moved.has(idx) || c.phase !== heaviest) return;
      const distance = Math.abs(c.load - idealTransfer);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIdx = idx;
      }
    });
    if (bestIdx === -1) break; // nothing movable on the heaviest phase

    const candidate = movable[bestIdx];

    // Simulate the move — skip (and stop) if it would not improve balance
    const trial: PhaseLoadData = { ...totals };
    trial[heaviest] -= candidate.load;
    trial[lightest] += candidate.load;
    if (imbalanceOf(trial) >= currentImbalance) break;

    totals[heaviest] = trial[heaviest];
    totals[lightest] = trial[lightest];
    moved.add(bestIdx);
    candidate.phase = lightest;
    moves.push({
      way: candidate.way,
      label: candidate.label,
      rating: candidate.rating,
      from: heaviest,
      to: lightest,
    });
  }

  return {
    moves,
    projectedImbalancePercent: Math.round(imbalanceOf(totals) * 10) / 10,
    projectedNeutralAmps: calculateNeutralCurrent(totals).estimatedAmps,
  };
}

/**
 * Validates phase-to-phase and phase-to-neutral voltages per BS7671
 *
 * Nominal: 230V L-N, 400V L-L
 * Acceptable range: ±10% (207-253V L-N, 360-440V L-L)
 */
export function validateVoltageCompliance(voltages: PhaseVoltageData): VoltageComplianceResult {
  const NOMINAL_LN = 230;
  const NOMINAL_LL = 400;
  const TOLERANCE = 0.1; // 10%

  const deviations: VoltageComplianceResult['deviations'] = [];

  // Check line-to-neutral
  const lnVoltages = [
    { phase: 'L1-N', voltage: voltages.L1_N },
    { phase: 'L2-N', voltage: voltages.L2_N },
    { phase: 'L3-N', voltage: voltages.L3_N },
  ];

  for (const { phase, voltage } of lnVoltages) {
    const deviation = ((voltage - NOMINAL_LN) / NOMINAL_LN) * 100;
    const acceptable = Math.abs(deviation) <= TOLERANCE * 100;

    deviations.push({
      phase,
      voltage,
      deviation: Math.round(deviation * 10) / 10,
      acceptable,
    });
  }

  // Check line-to-line if provided
  const llVoltages = [
    { phase: 'L1-L2', voltage: voltages.L1_L2 },
    { phase: 'L2-L3', voltage: voltages.L2_L3 },
    { phase: 'L1-L3', voltage: voltages.L1_L3 },
  ].filter((v) => v.voltage !== undefined);

  for (const { phase, voltage } of llVoltages) {
    if (voltage === undefined) continue;

    const deviation = ((voltage - NOMINAL_LL) / NOMINAL_LL) * 100;
    const acceptable = Math.abs(deviation) <= TOLERANCE * 100;

    deviations.push({
      phase,
      voltage,
      deviation: Math.round(deviation * 10) / 10,
      acceptable,
    });
  }

  const allAcceptable = deviations.every((d) => d.acceptable);
  const hasWarning = deviations.some((d) => Math.abs(d.deviation) > 5 && d.acceptable);

  return {
    isCompliant: allAcceptable,
    deviations,
    overallStatus: allAcceptable ? (hasWarning ? 'WARNING' : 'OK') : 'FAIL',
  };
}

// ============================================================================
// THREE-PHASE CIRCUIT DETECTION
// ============================================================================

/**
 * Detects three-phase circuit groups from circuit list.
 *
 * Two sources of truth, in priority order:
 *
 * 1. Explicit `phase: '3P'` rows. The board scanner expands a 3-pole circuit
 *    into THREE sibling rows (circuitNumber "7.1"/"7.2"/"7.3", one per line
 *    conductor) which all parse to the SAME way number — so explicit rows are
 *    grouped by way, never by adjacency. One way = one group; positions are
 *    the distinct ways (deduped) that carry 3P rows.
 *
 * 2. Heuristic on the remaining single-phase rows: three ADJACENT ways with
 *    the same rating (≥20A) are likely a 3-pole interlocked MCB — that group
 *    genuinely spans three distinct ways (e.g. 7, 8, 9).
 */
export function detectThreePhaseGroups(
  circuits: Array<{
    position: number;
    rating: number | null;
    device: string;
    label: string;
    phase?: '1P' | '3P';
  }>
): ThreePhaseCircuitGroup[] {
  const groups: ThreePhaseCircuitGroup[] = [];
  const sorted = [...circuits].sort((a, b) => a.position - b.position);

  // ── Pass 1: explicit 3P rows, grouped by way ──
  const explicitByWay = new Map<number, typeof sorted>();
  const remaining: typeof sorted = [];
  sorted.forEach((c) => {
    if (c.phase === '3P') {
      const rows = explicitByWay.get(c.position);
      if (rows) rows.push(c);
      else explicitByWay.set(c.position, [c]);
    } else {
      remaining.push(c);
    }
  });

  explicitByWay.forEach((rows, way) => {
    // Prefer the first row that actually carries data for label/rating —
    // sibling phase rows share device details, but be defensive about gaps.
    const labelled = rows.find((r) => r.label) ?? rows[0];
    const rated = rows.find((r) => r.rating !== null && Number.isFinite(r.rating) && r.rating > 0);
    groups.push({
      id: `3p-way-${way}`,
      positions: [way],
      label: labelled.label || 'Three-phase circuit',
      rating: rated ? (rated.rating as number) : null,
      deviceType: rows.find((r) => r.device)?.device || '',
      phases: ['L1', 'L2', 'L3'],
    });
  });

  // ── Pass 2: infer 3-pole interlocked MCBs from adjacent same-rating ways ──
  let i = 0;
  while (i < remaining.length - 2) {
    const c1 = remaining[i];
    const c2 = remaining[i + 1];
    const c3 = remaining[i + 2];

    if (
      c1.rating !== null &&
      c1.rating === c2.rating &&
      c2.rating === c3.rating &&
      c1.rating >= 20 && // 3P loads typically 20A+
      c1.position + 1 === c2.position &&
      c2.position + 1 === c3.position
    ) {
      groups.push({
        id: `3p-${c1.position}`,
        // Adjacent by construction, so already distinct — dedupe defensively
        positions: [...new Set([c1.position, c2.position, c3.position])],
        label: inferThreePhaseLabel(c1.label, c1.rating),
        rating: c1.rating,
        deviceType: c1.device,
        phases: ['L1', 'L2', 'L3'],
      });
      i += 3;
      continue;
    }

    i++;
  }

  return groups.sort((a, b) => a.positions[0] - b.positions[0]);
}

/**
 * Infers circuit label for three-phase loads
 */
function inferThreePhaseLabel(existingLabel: string, rating: number): string {
  const label = existingLabel.toLowerCase();

  // Common three-phase loads by label
  if (label.includes('cooker') || label.includes('oven') || label.includes('range')) {
    return 'Cooker (3P)';
  }
  if (label.includes('shower') || label.includes('instant')) {
    return 'Electric shower (3P)';
  }
  if (label.includes('ev') || label.includes('charger') || label.includes('vehicle')) {
    return 'EV charger (3P)';
  }
  if (label.includes('motor') || label.includes('pump')) {
    return 'Motor/pump (3P)';
  }
  if (label.includes('hvac') || label.includes('ac') || label.includes('air')) {
    return 'HVAC (3P)';
  }
  if (label.includes('heater') || label.includes('immersion')) {
    return 'Heater (3P)';
  }

  // Infer by rating
  if (rating >= 32 && rating <= 50) {
    return 'Three-phase load (likely cooker/EV)';
  }
  if (rating >= 63) {
    return 'Three-phase submain/heavy load';
  }

  return existingLabel || 'Three-phase circuit';
}

// ============================================================================
// DISPLAY HELPERS
// ============================================================================

/**
 * Formats phase balance for display
 */
export function formatPhaseBalance(loads: PhaseLoadData): string {
  const result = calculatePhaseBalance(loads);
  const status = result.band === 'high' ? '⚠' : '✓';
  return `${status} ${result.imbalancePercent}% (L1:${loads.L1}A L2:${loads.L2}A L3:${loads.L3}A)`;
}

/**
 * Gets color class for phase balance indicator.
 * Bands (guidance): ≤5% balanced · 5–15% review · >15% high.
 */
export function getPhaseBalanceColor(imbalancePercent: number): string {
  if (imbalancePercent <= 5) return 'text-green-600 bg-green-50';
  if (imbalancePercent <= 15) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
}

/**
 * Formats voltage with deviation indicator
 */
export function formatVoltageWithDeviation(voltage: number, nominal: number = 230): string {
  const deviation = ((voltage - nominal) / nominal) * 100;
  const sign = deviation > 0 ? '+' : '';
  return `${voltage}V (${sign}${deviation.toFixed(1)}%)`;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validates if a circuit configuration is valid for BS7671
 */
export function validateThreePhaseCircuit(
  circuit: {
    rating: number;
    breakingCapacity: number;
    conductorSize: number;
    length: number;
  },
  supplyType: 'TN-S' | 'TN-C-S' | 'TT'
): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Breaking capacity check (typically 6kA minimum for domestic, 10kA+ commercial)
  if (circuit.breakingCapacity < 6) {
    issues.push('Breaking capacity may be insufficient (minimum 6kA recommended)');
  }

  // Conductor sizing check (simplified - in reality uses Zs calculations)
  const minConductorByRating: Record<number, number> = {
    20: 2.5,
    32: 4,
    40: 6,
    50: 10,
    63: 16,
  };

  const nearestRating =
    Object.keys(minConductorByRating)
      .map(Number)
      .find((r) => r >= circuit.rating) || 63;

  if (circuit.conductorSize < minConductorByRating[nearestRating]) {
    issues.push(`Conductor size may be undersized for ${circuit.rating}A rating`);
  }

  // Length check for voltage drop (simplified - 3% max for final circuits)
  const maxLength = (circuit.conductorSize * 230 * 0.03) / (circuit.rating * 0.0175);
  if (circuit.length > maxLength) {
    issues.push(`Circuit length (${circuit.length}m) may exceed voltage drop limits`);
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Quick check if loads suggest three-phase installation
 */
export function shouldBeThreePhase(totalLoadAmps: number): {
  recommended: boolean;
  reason: string;
} {
  // Single-phase 100A max typical, but 80A practical limit
  if (totalLoadAmps > 80) {
    return {
      recommended: true,
      reason: `Total load (${totalLoadAmps}A) exceeds single-phase practical limit (80A). Three-phase supply recommended.`,
    };
  }

  if (totalLoadAmps > 63) {
    return {
      recommended: true,
      reason: `Total load (${totalLoadAmps}A) is high for single-phase. Consider three-phase for headroom.`,
    };
  }

  return {
    recommended: false,
    reason: `Total load (${totalLoadAmps}A) is within single-phase capacity.`,
  };
}
