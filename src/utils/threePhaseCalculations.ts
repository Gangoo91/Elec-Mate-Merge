/**
 * Three-Phase Electrical Calculations for BS7671 Compliance
 *
 * Provides utilities for:
 * - Phase balance calculations
 * - Neutral current estimation
 * - BS7671 compliance validation
 * - Three-phase circuit grouping
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
  L1_N: number;  // Line to Neutral (230V nominal)
  L2_N: number;
  L3_N: number;
  L1_L2?: number; // Line to Line (400V nominal)
  L2_L3?: number;
  L1_L3?: number;
}

export interface PhaseBalanceResult {
  imbalancePercent: number;
  isCompliant: boolean; // BS7671 requires <10% imbalance typically
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
  positions: number[];
  label: string;
  rating: number;
  deviceType: string;
  phases: ['L1', 'L2', 'L3'];
}

// ============================================================================
// PHASE BALANCE CALCULATIONS
// ============================================================================

/**
 * Calculates phase balance percentage per BS7671
 * Imbalance should typically be <10% for optimal operation
 *
 * Formula: ((Max - Min) / Average) × 100
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
      isCompliant: true,
      highestPhase: 'L1',
      lowestPhase: 'L1'
    };
  }

  const imbalancePercent = ((max - min) / average) * 100;
  const maxIndex = values.indexOf(max);
  const minIndex = values.indexOf(min);

  const result: PhaseBalanceResult = {
    imbalancePercent: Math.round(imbalancePercent * 10) / 10,
    isCompliant: imbalancePercent <= 10,
    highestPhase: labels[maxIndex],
    lowestPhase: labels[minIndex]
  };

  // Add recommendations for imbalanced systems
  if (imbalancePercent > 15) {
    result.recommendation = `Critical imbalance (${result.imbalancePercent}%). Redistribute loads from ${result.highestPhase} to ${result.lowestPhase}. May cause neutral overload.`;
  } else if (imbalancePercent > 10) {
    result.recommendation = `High imbalance (${result.imbalancePercent}%). Consider redistributing single-phase loads for better balance.`;
  } else if (imbalancePercent > 5) {
    result.recommendation = `Minor imbalance (${result.imbalancePercent}%). Acceptable but could be optimized.`;
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
  const IN = Math.sqrt(
    L1 * L1 + L2 * L2 + L3 * L3 -
    L1 * L2 - L2 * L3 - L1 * L3
  );

  const maxPhase = Math.max(L1, L2, L3);
  const neutralRatio = maxPhase > 0 ? (IN / maxPhase) * 100 : 0;

  const result: NeutralCurrentResult = {
    estimatedAmps: Math.round(IN * 10) / 10,
    isAcceptable: IN <= maxPhase
  };

  if (IN > maxPhase * 0.8) {
    result.warning = `High neutral current (${result.estimatedAmps}A). Check phase balance and consider harmonic content.`;
  } else if (IN > maxPhase * 0.5) {
    result.warning = `Moderate neutral current (${result.estimatedAmps}A). Phase imbalance present.`;
  }

  return result;
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
  const TOLERANCE = 0.10; // 10%

  const deviations: VoltageComplianceResult['deviations'] = [];

  // Check line-to-neutral
  const lnVoltages = [
    { phase: 'L1-N', voltage: voltages.L1_N },
    { phase: 'L2-N', voltage: voltages.L2_N },
    { phase: 'L3-N', voltage: voltages.L3_N }
  ];

  for (const { phase, voltage } of lnVoltages) {
    const deviation = ((voltage - NOMINAL_LN) / NOMINAL_LN) * 100;
    const acceptable = Math.abs(deviation) <= TOLERANCE * 100;

    deviations.push({
      phase,
      voltage,
      deviation: Math.round(deviation * 10) / 10,
      acceptable
    });
  }

  // Check line-to-line if provided
  const llVoltages = [
    { phase: 'L1-L2', voltage: voltages.L1_L2 },
    { phase: 'L2-L3', voltage: voltages.L2_L3 },
    { phase: 'L1-L3', voltage: voltages.L1_L3 }
  ].filter(v => v.voltage !== undefined);

  for (const { phase, voltage } of llVoltages) {
    if (voltage === undefined) continue;

    const deviation = ((voltage - NOMINAL_LL) / NOMINAL_LL) * 100;
    const acceptable = Math.abs(deviation) <= TOLERANCE * 100;

    deviations.push({
      phase,
      voltage,
      deviation: Math.round(deviation * 10) / 10,
      acceptable
    });
  }

  const allAcceptable = deviations.every(d => d.acceptable);
  const hasWarning = deviations.some(d => Math.abs(d.deviation) > 5 && d.acceptable);

  return {
    isCompliant: allAcceptable,
    deviations,
    overallStatus: allAcceptable ? (hasWarning ? 'WARNING' : 'OK') : 'FAIL'
  };
}

// ============================================================================
// THREE-PHASE CIRCUIT DETECTION
// ============================================================================

/**
 * Detects three-phase circuit groups from circuit list
 * Looks for adjacent circuits with same rating that could be 3-pole MCBs
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

  // Sort by position
  const sorted = [...circuits].sort((a, b) => a.position - b.position);

  let i = 0;
  while (i < sorted.length - 2) {
    const c1 = sorted[i];
    const c2 = sorted[i + 1];
    const c3 = sorted[i + 2];

    // Check if already marked as 3P
    if (c1.phase === '3P' || c2.phase === '3P' || c3.phase === '3P') {
      // This is a three-phase group
      groups.push({
        id: `3p-${c1.position}`,
        positions: [c1.position, c2.position, c3.position],
        label: c1.label || `Three-Phase Circuit`,
        rating: c1.rating || 0,
        deviceType: c1.device,
        phases: ['L1', 'L2', 'L3']
      });
      i += 3;
      continue;
    }

    // Check if three consecutive circuits have same rating (potential 3P interlocked)
    if (
      c1.rating !== null &&
      c1.rating === c2.rating &&
      c2.rating === c3.rating &&
      c1.rating >= 20 && // 3P loads typically 20A+
      c1.position + 1 === c2.position &&
      c2.position + 1 === c3.position
    ) {
      // Likely a 3-pole MCB for three-phase load
      const label = inferThreePhaseLabel(c1.label, c1.rating);

      groups.push({
        id: `3p-${c1.position}`,
        positions: [c1.position, c2.position, c3.position],
        label,
        rating: c1.rating,
        deviceType: c1.device,
        phases: ['L1', 'L2', 'L3']
      });

      i += 3;
      continue;
    }

    i++;
  }

  return groups;
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
    return 'Electric Shower (3P)';
  }
  if (label.includes('ev') || label.includes('charger') || label.includes('vehicle')) {
    return 'EV Charger (3P)';
  }
  if (label.includes('motor') || label.includes('pump')) {
    return 'Motor/Pump (3P)';
  }
  if (label.includes('hvac') || label.includes('ac') || label.includes('air')) {
    return 'HVAC (3P)';
  }
  if (label.includes('heater') || label.includes('immersion')) {
    return 'Heater (3P)';
  }

  // Infer by rating
  if (rating >= 32 && rating <= 50) {
    return 'Three-Phase Load (likely Cooker/EV)';
  }
  if (rating >= 63) {
    return 'Three-Phase Submain/Heavy Load';
  }

  return existingLabel || 'Three-Phase Circuit';
}

// ============================================================================
// DISPLAY HELPERS
// ============================================================================

/**
 * Formats phase balance for display
 */
export function formatPhaseBalance(loads: PhaseLoadData): string {
  const result = calculatePhaseBalance(loads);
  const status = result.isCompliant ? '✓' : '⚠';
  return `${status} ${result.imbalancePercent}% (L1:${loads.L1}A L2:${loads.L2}A L3:${loads.L3}A)`;
}

/**
 * Gets color class for phase balance indicator
 */
export function getPhaseBalanceColor(imbalancePercent: number): string {
  if (imbalancePercent <= 5) return 'text-green-600 bg-green-50';
  if (imbalancePercent <= 10) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
}

/**
 * Formats voltage with deviation indicator
 */
export function formatVoltageWithDeviation(
  voltage: number,
  nominal: number = 230
): string {
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
    63: 16
  };

  const nearestRating = Object.keys(minConductorByRating)
    .map(Number)
    .find(r => r >= circuit.rating) || 63;

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
    issues
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
      reason: `Total load (${totalLoadAmps}A) exceeds single-phase practical limit (80A). Three-phase supply recommended.`
    };
  }

  if (totalLoadAmps > 63) {
    return {
      recommended: true,
      reason: `Total load (${totalLoadAmps}A) is high for single-phase. Consider three-phase for headroom.`
    };
  }

  return {
    recommended: false,
    reason: `Total load (${totalLoadAmps}A) is within single-phase capacity.`
  };
}
