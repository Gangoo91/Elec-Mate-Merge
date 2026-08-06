// IET On-Site Guide Appendix A — Table A1 (typical current demands) and
// Table A2 (allowances for diversity). BS 7671:2018+A4:2026.
//
// BS 7671 itself publishes NO diversity table. Reg 311.1 reads: "For economic
// and reliable design of an installation within thermal limits and admissible
// voltage drop, the maximum demand shall be determined. In determining the
// maximum demand of an installation or part thereof, diversity MAY be taken
// into account." The "shall" attaches to determining maximum demand; applying
// diversity is permissive.
//
// Citation audit (verified against the On-Site Guide 9th Ed:2022 (A4) text):
//   - The diversity table is Appendix A, Table A2. There is no "Table H2" and
//     no "Table 1B" diversity table. Appendix H is standard circuit
//     arrangements for household and similar premises.
//   - The On-Site Guide expressly excludes blocks of dwellings, large hotels,
//     industrial and large commercial premises from its diversity guidance and
//     requires case-by-case assessment by the designer. Non-domestic figures
//     below are therefore labelled as designer allowances, not OSG values.
//   - BS 7671 Appendix 4 is "Current-carrying capacity and voltage drop for
//     cables" and contains no diversity allowances of any kind.
//   - BS 7671 Reg 722.311.201 PERMITS load curtailment to be taken into account
//     when determining maximum demand. It states no EV "no diversity" rule.
import { CalculationError, validateInput } from '../utils/calculatorUtils';

// Verified OSG citation strings. Row numbers are deliberately not quoted —
// Table A2 rows are described by their subject instead.
const OSG_TABLE_A2 = 'IET On-Site Guide Appendix A, Table A2';
const NON_DOMESTIC_REF =
  'Designer allowance — IET On-Site Guide Appendix A covers household and similar premises only; ' +
  'industrial and large commercial premises must be assessed case by case';

export interface CircuitLoad {
  id: string;
  type:
    | 'lighting'
    | 'ring-final'
    | 'radial-socket'
    | 'dedicated-outlet'
    | 'small-power'
    | 'water-heating'
    | 'space-heating'
    | 'motor'
    | 'cooker'
    | 'shower'
    | 'ev-charging'
    | 'floor-warming'
    | 'thermal-storage'
    // Safety service / special-case loads that take no diversity.
    | 'emergency-lighting'
    | 'lift-motor';
  designCurrent: number;
  installedPower: number; // kW
  quantity: number;
  location: 'domestic' | 'commercial' | 'industrial';
  hasCookerSocket?: boolean;
  thermostaticallyControlled?: boolean;
}

export interface TypeBreakdown {
  type: string;
  displayName: string;
  count: number;
  installedLoad: number;
  installedCurrent: number;
  diversifiedLoad: number;
  diversifiedCurrent: number;
  diversityFactor: number;
  formula: string;
  regulation: string;
  steps: string[];
}

export interface DiversityResult {
  totalInstalledLoad: number; // kW
  totalDesignCurrent: number; // A
  diversifiedLoad: number; // kW
  diversifiedCurrent: number; // A
  overallDiversityFactor: number;
  breakdownByType: TypeBreakdown[];
  complianceNotes: string[];
}

const DISPLAY_NAMES: Record<string, string> = {
  lighting: 'Lighting Circuits',
  'ring-final': 'Ring Final Circuits',
  'radial-socket': 'Radial Socket Outlets',
  'dedicated-outlet': 'Dedicated Outlets',
  'small-power': 'Small Power',
  'water-heating': 'Water Heating',
  'space-heating': 'Space Heating',
  motor: 'Motors',
  cooker: 'Cooker',
  shower: 'Electric Showers',
  'ev-charging': 'EV Charging',
  'floor-warming': 'Floor Warming',
  'thermal-storage': 'Thermal Storage',
  'emergency-lighting': 'Emergency Lighting',
  'lift-motor': 'Lift Motors',
};

/**
 * Expand a set of circuit entries into one current per individual circuit/unit,
 * sorted largest first. `quantity` on a CircuitLoad means "this many identical
 * circuits", and `designCurrent` is the total across them.
 */
function perUnitCurrents(circuits: CircuitLoad[]): number[] {
  const out: number[] = [];
  circuits.forEach((c) => {
    const units = Math.max(1, Math.floor(c.quantity) || 1);
    const each = (c.designCurrent || 0) / units;
    for (let i = 0; i < units; i += 1) out.push(each);
  });
  return out.sort((a, b) => b - a);
}

/**
 * Scale the entered installed power (kW) by the diversity factor.
 *
 * Previously every helper re-derived kW from current as `I × V / 1000`. That is
 * wrong for a three-phase supply (it omits √3) and wrong wherever a power
 * factor was applied on the way in, and it produced absurd figures such as a
 * 32 A ring final becoming 12.8 kW when 400 V was selected. Scaling the power
 * the caller supplied keeps kW and A consistent with each other whatever the
 * supply arrangement.
 */
function scalePower(installedPower: number, totalCurrent: number, diversifiedCurrent: number) {
  if (totalCurrent <= 0) return installedPower;
  return installedPower * (diversifiedCurrent / totalCurrent);
}

/**
 * Apply diversity for lighting circuits
 * IET On-Site Guide Appendix A, Table A2 — lighting row (domestic): 66%
 * Non-domestic: 90% is a designer allowance, not an OSG-published value.
 */
function applyLightingDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const location = circuits[0].location;

  const factor = location === 'domestic' ? 0.66 : 0.9;
  const diversifiedCurrent = totalCurrent * factor;
  const diversifiedLoad = totalPower * factor;
  const pct = (factor * 100).toFixed(0);
  const ref =
    location === 'domestic' ? `${OSG_TABLE_A2} — lighting` : `${NON_DOMESTIC_REF} (lighting)`;

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor: factor,
    formula: `${pct}% of total current demand`,
    regulation: ref,
    steps: [
      `Total lighting load: ${totalCurrent.toFixed(2)}A (${totalPower.toFixed(2)} kW)`,
      `Apply ${pct}% diversity: ${totalCurrent.toFixed(2)}A × ${factor} = ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${ref}`,
    ],
  };
}

/**
 * Apply diversity for ring final circuits
 * IET On-Site Guide Appendix A, Table A2 — socket-outlet row:
 *   100% of the largest circuit + 40% of every other circuit (domestic).
 *
 * FIX: the entered "Rating per Ring" used to be discarded and every ring
 * hard-coded to 32 A. The On-Site Guide rule for an Appendix H standard circuit
 * is that its current demand is the rated current of ITS OWN overcurrent
 * protective device — 20 A, 30 A, 32 A or 40 A as installed. The entered value
 * is now used, with 32 A kept only as a fallback when nothing was entered.
 * The kW figure is also no longer re-derived as I × V / 1000, which made a ring
 * final 12.8 kW whenever 400 V was selected.
 */
function applyRingFinalDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const location = circuits[0].location;
  const entered = perUnitCurrents(circuits).filter((c) => c > 0);
  const numRings = Math.max(1, entered.length || circuits.reduce((s, c) => s + c.quantity, 0));

  // Fallback only — 32 A is the most common domestic ring OCPD rating.
  const ringCurrents = entered.length ? entered : Array.from({ length: numRings }, () => 32);
  const usedFallback = entered.length === 0;

  const totalCurrent = ringCurrents.reduce((s, c) => s + c, 0);
  const totalPower = circuits.reduce((sum, c) => sum + (c.installedPower || 0), 0);

  let diversifiedCurrent: number;
  const steps: string[] = [];

  if (ringCurrents.length === 1) {
    diversifiedCurrent = ringCurrents[0];
    steps.push(
      `Single ring final circuit: ${diversifiedCurrent.toFixed(1)}A${usedFallback ? ' (32A assumed)' : ''}`
    );
    steps.push('No diversity applied for a single ring');
  } else {
    const remainderFactor = location === 'domestic' ? 0.4 : 0.5;
    const remainderPct = (remainderFactor * 100).toFixed(0);
    const largest = ringCurrents[0];
    const others = totalCurrent - largest;
    const remainderCurrent = others * remainderFactor;
    diversifiedCurrent = largest + remainderCurrent;

    steps.push(`${ringCurrents.length} ring final circuits, ${totalCurrent.toFixed(1)}A total`);
    steps.push(`100% of largest ring: ${largest.toFixed(1)}A`);
    steps.push(
      `${remainderPct}% of the other ring(s): ${others.toFixed(1)}A × ${remainderFactor} = ${remainderCurrent.toFixed(1)}A`
    );
    steps.push(
      `Total diversified: ${largest.toFixed(1)}A + ${remainderCurrent.toFixed(1)}A = ${diversifiedCurrent.toFixed(1)}A`
    );
  }

  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const diversifiedLoad = scalePower(totalPower, totalCurrent, diversifiedCurrent);
  const ref =
    location === 'domestic'
      ? `${OSG_TABLE_A2} — socket-outlets`
      : `${NON_DOMESTIC_REF} (socket-outlets)`;
  steps.push(`Per ${ref}`);

  const formula =
    ringCurrents.length === 1
      ? `Single ring = ${diversifiedCurrent.toFixed(1)}A`
      : `100% of largest + ${location === 'domestic' ? '40' : '50'}% of every other ring = ${diversifiedCurrent.toFixed(1)}A`;

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor,
    formula,
    regulation: ref,
    steps,
  };
}

/**
 * Apply diversity for radial socket outlets
 * IET On-Site Guide Appendix A, Table A2 — socket-outlet row:
 *   100% of the largest circuit + 40% of every other circuit (domestic).
 *
 * FIX: this used to compute "100% of the first 10 A + 40% of the remainder",
 * which returned 18.8 A for a single 32 A radial. Two problems:
 *   1. The "first 10 A + x% of the remainder" structure is the Table A2
 *      HOUSEHOLD COOKING APPLIANCE row (verified: first 10 A + 30% of the
 *      remainder, +5 A where the control unit incorporates a socket-outlet).
 *      It is not the socket-outlet row.
 *   2. It contradicted applyRingFinalDiversity, which cited the same Table A2
 *      row while implementing 100%-of-largest + 40%-of-each-other. One
 *      Table A2 row cannot carry two different formulas.
 * The socket-outlet structure is now used for both, matching this calculator's
 * own editorial ("Sockets (largest + 40%)"). It is also the more conservative
 * of the two for every input, so it can never over-state spare capacity.
 * Separately, the On-Site Guide states that for a standard circuit arrangement
 * complying with Appendix H the current demand of that final circuit is the
 * rated current of its own overcurrent protective device — so a 32 A radial
 * contributes 32 A, not 18.8 A.
 */
function applyRadialSocketDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const location = circuits[0].location;

  let remainderFactor: number;
  if (location === 'domestic') remainderFactor = 0.4;
  else if (location === 'commercial') remainderFactor = 0.5;
  else remainderFactor = 0.6;

  const units = perUnitCurrents(circuits);
  const largest = units[0] || 0;
  const others = Math.max(0, totalCurrent - largest);
  const remainderCurrent = others * remainderFactor;
  const diversifiedCurrent = largest + remainderCurrent;

  const steps: string[] = [];
  steps.push(`${units.length} radial socket circuit(s), ${totalCurrent.toFixed(2)}A total`);
  steps.push(`100% of largest circuit: ${largest.toFixed(2)}A`);
  if (others > 0) {
    steps.push(
      `${(remainderFactor * 100).toFixed(0)}% of every other circuit: ${others.toFixed(2)}A × ${remainderFactor} = ${remainderCurrent.toFixed(2)}A`
    );
  }
  steps.push(`Total diversified: ${diversifiedCurrent.toFixed(2)}A`);

  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const diversifiedLoad = scalePower(totalPower, totalCurrent, diversifiedCurrent);
  const ref =
    location === 'domestic'
      ? `${OSG_TABLE_A2} — socket-outlets`
      : `${NON_DOMESTIC_REF} (socket-outlets)`;
  steps.push(`Per ${ref}`);

  const formula = `100% of largest + ${(remainderFactor * 100).toFixed(0)}% of every other circuit = ${diversifiedCurrent.toFixed(1)}A`;

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor,
    formula,
    regulation: ref,
    steps,
  };
}

/**
 * Apply diversity for cooker circuits
 * IET On-Site Guide Appendix A, Table A2 — household cooking appliances:
 *   the first 10 A of the rated current, plus 30% of the remainder, plus 5 A
 *   where the cooker control unit incorporates a socket-outlet.
 *   (Verified: a 40 A appliance gives 10 + 9 = 19 A, or 24 A with a socket.)
 */
function applyCookerDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const hasCookerSocket = circuits.some((c) => c.hasCookerSocket);
  const location = circuits[0].location;

  let diversifiedCurrent: number;
  const steps: string[] = [];

  if (location === 'domestic') {
    diversifiedCurrent = Math.min(10, totalCurrent);
    steps.push(`Cooker load: ${totalCurrent.toFixed(2)}A`);
    steps.push(`First 10A: ${diversifiedCurrent.toFixed(0)}A`);

    if (totalCurrent > 10) {
      const remainder = totalCurrent - 10;
      const thirtyPct = remainder * 0.3;
      diversifiedCurrent += thirtyPct;
      steps.push(
        `30% of excess over 10A: (${totalCurrent.toFixed(2)}A - 10A) × 0.3 = ${thirtyPct.toFixed(2)}A`
      );
    }

    if (hasCookerSocket) {
      diversifiedCurrent += 5;
      steps.push(`Socket outlet on cooker unit: +5A`);
    }

    steps.push(`Total diversified: ${diversifiedCurrent.toFixed(2)}A`);
  } else {
    // Commercial/industrial: 80% flat
    diversifiedCurrent = totalCurrent * 0.8;
    steps.push(`Cooker load: ${totalCurrent.toFixed(2)}A`);
    steps.push(`80% diversity: ${diversifiedCurrent.toFixed(2)}A`);
  }

  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const diversifiedLoad = scalePower(totalPower, totalCurrent, diversifiedCurrent);
  const ref =
    location === 'domestic'
      ? `${OSG_TABLE_A2} — household cooking appliances`
      : `${NON_DOMESTIC_REF} (cooking appliances)`;
  steps.push(`Per ${ref}`);

  let formula = '10A + 30% of remainder over 10A';
  if (hasCookerSocket) formula += ' + 5A socket';

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor,
    formula,
    regulation: ref,
    steps,
  };
}

/**
 * Apply diversity for space heating
 * IET On-Site Guide Appendix A, Table A2 — space heating (domestic):
 *   Thermostatically controlled: 100% (no diversity)
 *   Non-thermostatically controlled: Largest 100% + 75% of remainder
 */
function applySpaceHeatingDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const location = circuits[0].location;

  // Default to thermostatically controlled (most modern heating)
  const isThermostatic = circuits.every((c) => c.thermostaticallyControlled !== false);

  let diversifiedCurrent: number;
  const steps: string[] = [];

  if (location === 'domestic') {
    if (isThermostatic) {
      // Thermostatically controlled = 100%
      diversifiedCurrent = totalCurrent;
      steps.push(
        `Total space heating load: ${totalCurrent.toFixed(2)}A (${totalPower.toFixed(2)} kW)`
      );
      steps.push(`Thermostatically controlled: 100% (no diversity)`);
    } else {
      // Non-thermostatic: largest 100% + 75% remainder
      const sortedCurrents = circuits.map((c) => c.designCurrent).sort((a, b) => b - a);
      const largest = sortedCurrents[0] || 0;
      const remainder = sortedCurrents.slice(1).reduce((sum, c) => sum + c, 0);
      diversifiedCurrent = largest + remainder * 0.75;

      steps.push(`Total space heating load: ${totalCurrent.toFixed(2)}A`);
      steps.push(`Non-thermostatically controlled`);
      steps.push(`100% of largest: ${largest.toFixed(2)}A`);
      if (remainder > 0) {
        steps.push(
          `75% of remainder: ${remainder.toFixed(2)}A × 0.75 = ${(remainder * 0.75).toFixed(2)}A`
        );
      }
      steps.push(`Total diversified: ${diversifiedCurrent.toFixed(2)}A`);
    }
  } else if (location === 'commercial') {
    diversifiedCurrent = totalCurrent * 0.9;
    steps.push(`Total space heating load: ${totalCurrent.toFixed(2)}A`);
    steps.push(`90% diversity: ${diversifiedCurrent.toFixed(2)}A`);
  } else {
    diversifiedCurrent = totalCurrent;
    steps.push(`Total space heating load: ${totalCurrent.toFixed(2)}A`);
    steps.push(`100% (no diversity for industrial)`);
  }

  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const diversifiedLoad = scalePower(totalPower, totalCurrent, diversifiedCurrent);
  const ref =
    location === 'domestic'
      ? `${OSG_TABLE_A2} — space heating`
      : `${NON_DOMESTIC_REF} (space heating)`;
  steps.push(`Per ${ref}`);

  const formula =
    location === 'domestic'
      ? isThermostatic
        ? '100% (thermostatically controlled)'
        : 'Largest 100% + 75% of remainder'
      : location === 'commercial'
        ? '90% of total'
        : '100% (no diversity)';

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor,
    formula,
    regulation: ref,
    steps,
  };
}

/**
 * Apply diversity for shower circuits (instantaneous water heaters)
 * IET On-Site Guide Appendix A, Table A2 — instantaneous water heaters:
 *   100% of largest + 100% of 2nd largest + 25% of remainder
 */
function applyShowerDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const location = circuits[0].location;

  const sorted = [...circuits].sort((a, b) => b.designCurrent - a.designCurrent);
  const steps: string[] = [];

  let diversifiedCurrent: number;

  if (sorted.length === 1) {
    diversifiedCurrent = sorted[0].designCurrent;
    steps.push(`Single shower: ${diversifiedCurrent.toFixed(2)}A (no diversity)`);
  } else if (location === 'domestic') {
    const largest = sorted[0]?.designCurrent || 0;
    const second = sorted[1]?.designCurrent || 0;
    const remainder = sorted.slice(2).reduce((sum, c) => sum + c.designCurrent, 0);

    diversifiedCurrent = largest + second + remainder * 0.25;
    steps.push(`${sorted.length} shower circuits`);
    steps.push(`100% of largest: ${largest.toFixed(2)}A`);
    steps.push(`100% of 2nd largest: ${second.toFixed(2)}A`);
    if (remainder > 0) {
      steps.push(
        `25% of remainder: ${remainder.toFixed(2)}A × 0.25 = ${(remainder * 0.25).toFixed(2)}A`
      );
    }
    steps.push(`Total diversified: ${diversifiedCurrent.toFixed(2)}A`);
  } else {
    // Commercial: 100% largest + 80% second + 60% remainder
    const largest = sorted[0]?.designCurrent || 0;
    const second = sorted[1]?.designCurrent || 0;
    const remainder = sorted.slice(2).reduce((sum, c) => sum + c.designCurrent, 0);

    diversifiedCurrent = largest + second * 0.8 + remainder * 0.6;
    steps.push(`${sorted.length} shower circuits`);
    steps.push(`100% of largest: ${largest.toFixed(2)}A`);
    if (second > 0) steps.push(`80% of 2nd: ${(second * 0.8).toFixed(2)}A`);
    if (remainder > 0) steps.push(`60% of remainder: ${(remainder * 0.6).toFixed(2)}A`);
    steps.push(`Total diversified: ${diversifiedCurrent.toFixed(2)}A`);
  }

  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const diversifiedLoad = scalePower(totalPower, totalCurrent, diversifiedCurrent);
  const ref =
    location === 'domestic'
      ? `${OSG_TABLE_A2} — instantaneous water heaters`
      : `${NON_DOMESTIC_REF} (instantaneous water heaters)`;
  steps.push(`Per ${ref}`);

  const formula =
    location === 'domestic'
      ? '100% largest + 100% 2nd largest + 25% remainder'
      : '100% largest + 80% 2nd + 60% remainder';

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor,
    formula,
    regulation: ref,
    steps,
  };
}

/**
 * Apply diversity for motor circuits
 * Non-domestic: largest 100% + 40% of remaining — a designer allowance, NOT an
 *   On-Site Guide published value (Appendix A covers household and similar
 *   premises only).
 * Domestic: 100% (no diversity).
 *
 * FIX: the domestic branch used to cite "BS 7671 Appendix 4". Appendix 4
 * (Informative) is "Current-carrying capacity and voltage drop for cables" and
 * contains no diversity allowances. Diversity is permitted by Reg 311.1 and
 * quantified only in the On-Site Guide.
 */
function applyMotorDiversity(
  circuits: CircuitLoad[],
  _voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const location = circuits[0].location;

  let diversifiedCurrent: number;
  const steps: string[] = [];

  if (location === 'domestic') {
    diversifiedCurrent = totalCurrent;
    steps.push(`Total motor load: ${totalCurrent.toFixed(2)}A`);
    steps.push(`Domestic: 100% (no diversity)`);
  } else {
    // Commercial/industrial: largest 100% + 40% remainder
    const sorted = [...circuits].sort((a, b) => b.designCurrent - a.designCurrent);
    const largest = sorted[0]?.designCurrent || 0;
    const remainder = sorted.slice(1).reduce((sum, c) => sum + c.designCurrent, 0);

    diversifiedCurrent = largest + remainder * 0.4;
    steps.push(`${circuits.length} motor circuit(s)`);
    steps.push(`100% of largest: ${largest.toFixed(2)}A`);
    if (remainder > 0) {
      steps.push(
        `40% of remaining: ${remainder.toFixed(2)}A × 0.4 = ${(remainder * 0.4).toFixed(2)}A`
      );
    }
    steps.push(`Total diversified: ${diversifiedCurrent.toFixed(2)}A`);
  }

  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const diversifiedLoad = scalePower(totalPower, totalCurrent, diversifiedCurrent);
  const ref =
    location === 'domestic'
      ? 'No diversity applied (conservative) — BS 7671 Reg 311.1 permits diversity but publishes no allowance'
      : `${NON_DOMESTIC_REF} (motors)`;
  steps.push(`Per ${ref}`);

  const formula =
    location === 'domestic' ? '100% (no diversity)' : 'Largest 100% + 40% of remaining';

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor,
    formula,
    regulation: ref,
    steps,
  };
}

/**
 * Apply no diversity (100%) for load types that do not permit diversity.
 *
 * FIX: EV charging used to be attributed to "BS 7671:2018 Section 722.311" as
 * if that section prohibited diversity. 722.311 is only the section heading
 * "Maximum demand and diversity", and its single regulation, 722.311.201
 * (A4:2026), is permissive: "Load curtailment, including load reduction or
 * disconnection, either automatically or manually, may be taken into account
 * when determining maximum demand of the installation or part thereof." It
 * states no 100%/no-diversity rule. The On-Site Guide separately notes that
 * Table A2 does not contemplate EV chargers and that the designer may need to
 * INCREASE the Table A2 values where they are present — which is why no
 * diversity is applied here.
 */
function applyNoDiversity(
  circuits: CircuitLoad[],
  _voltage: number,
  loadType: string
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);

  const regulationMap: Record<string, string> = {
    'water-heating': `${OSG_TABLE_A2} — thermostatically controlled water heating`,
    'floor-warming': `${OSG_TABLE_A2} — floor warming`,
    'ev-charging':
      'No diversity applied — Table A2 does not contemplate EV charge points; BS 7671 Reg 722.311.201 permits load curtailment to be taken into account but sets no allowance',
    'thermal-storage': `${OSG_TABLE_A2} — thermal storage space heating`,
    'dedicated-outlet': 'No diversity applied — dedicated circuit serving a single load',
    'small-power': `${OSG_TABLE_A2} — socket-outlets`,
    'emergency-lighting':
      'No diversity applied — emergency lighting is a safety service and its supply is sized for the full load',
    'lift-motor': 'No diversity applied — lift motors are treated as a special case',
  };

  const regulation = regulationMap[loadType] || 'Conservative approach — no diversity applied';

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad: totalPower,
    diversifiedCurrent: totalCurrent,
    diversityFactor: 1.0,
    formula: 'No diversity allowable (100%)',
    regulation,
    steps: [
      `${circuits.length} ${DISPLAY_NAMES[loadType] || loadType} circuit(s)`,
      `Total load: ${totalCurrent.toFixed(2)}A (${totalPower.toFixed(2)} kW)`,
      `No diversity applied (100%)`,
      `Per ${regulation}`,
    ],
  };
}

/**
 * Apply diversity for small power / radial socket (domestic)
 * Same as radial socket for domestic: 100% of largest + 40% of every other.
 */
function applySmallPowerDiversity(
  circuits: CircuitLoad[],
  voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const location = circuits[0].location;

  if (location === 'domestic') {
    return applyRadialSocketDiversity(circuits, voltage);
  }

  // Commercial/industrial: flat percentage
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const factor = location === 'commercial' ? 0.75 : 0.8;
  const diversifiedCurrent = totalCurrent * factor;
  const diversifiedLoad = totalPower * factor;
  const ref = `${NON_DOMESTIC_REF} (small power)`;

  return {
    installedLoad: totalPower,
    installedCurrent: totalCurrent,
    diversifiedLoad,
    diversifiedCurrent,
    diversityFactor: factor,
    formula: `${(factor * 100).toFixed(0)}% of total`,
    regulation: ref,
    steps: [
      `Total small power load: ${totalCurrent.toFixed(2)}A`,
      `${(factor * 100).toFixed(0)}% diversity: ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${ref}`,
    ],
  };
}

export const calculateDiversity = (
  circuits: CircuitLoad[],
  voltage: number = 230,
  supplyType: 'single-phase' | 'three-phase' = 'single-phase'
): DiversityResult => {
  validateInput(voltage, 200, 440, 'Voltage');

  if (circuits.length === 0) {
    throw new CalculationError('At least one circuit is required', 'NO_CIRCUITS');
  }

  const breakdownByType: TypeBreakdown[] = [];
  const complianceNotes: string[] = [];
  let totalInstalledLoad = 0;
  let totalDiversifiedLoad = 0;
  let totalInstalledCurrent = 0;
  let totalDiversifiedCurrent = 0;

  // Group circuits by type
  const circuitsByType = circuits.reduce(
    (acc, circuit) => {
      if (!acc[circuit.type]) acc[circuit.type] = [];
      acc[circuit.type].push(circuit);
      return acc;
    },
    {} as Record<string, CircuitLoad[]>
  );

  // Calculate diversity for each circuit type
  Object.entries(circuitsByType).forEach(([type, typeCircuits]) => {
    let result: Omit<TypeBreakdown, 'type' | 'displayName' | 'count'>;

    switch (type) {
      case 'lighting':
        result = applyLightingDiversity(typeCircuits, voltage);
        break;
      case 'ring-final':
        result = applyRingFinalDiversity(typeCircuits, voltage);
        break;
      case 'radial-socket':
        result = applyRadialSocketDiversity(typeCircuits, voltage);
        break;
      case 'cooker':
        result = applyCookerDiversity(typeCircuits, voltage);
        break;
      case 'space-heating':
        result = applySpaceHeatingDiversity(typeCircuits, voltage);
        break;
      case 'shower':
        result = applyShowerDiversity(typeCircuits, voltage);
        break;
      case 'motor':
        result = applyMotorDiversity(typeCircuits, voltage);
        break;
      case 'small-power':
        result = applySmallPowerDiversity(typeCircuits, voltage);
        break;
      case 'water-heating':
      case 'ev-charging':
      case 'floor-warming':
      case 'thermal-storage':
      case 'dedicated-outlet':
      case 'emergency-lighting':
      case 'lift-motor':
        result = applyNoDiversity(typeCircuits, voltage, type);
        break;
      default:
        result = applyNoDiversity(typeCircuits, voltage, type);
        break;
    }

    totalInstalledLoad += result.installedLoad;
    totalDiversifiedLoad += result.diversifiedLoad;
    totalInstalledCurrent += result.installedCurrent;
    totalDiversifiedCurrent += result.diversifiedCurrent;

    breakdownByType.push({
      type,
      displayName: DISPLAY_NAMES[type] || type,
      count: typeCircuits.length,
      ...result,
    });

    // Build compliance note
    if (result.diversityFactor < 1.0) {
      complianceNotes.push(
        `${DISPLAY_NAMES[type] || type}: ${result.formula} — ${result.regulation}`
      );
    } else {
      complianceNotes.push(
        `${DISPLAY_NAMES[type] || type}: 100% (no diversity) — ${result.regulation}`
      );
    }
  });

  // Calculate overall values
  const overallDiversityFactor =
    totalInstalledLoad > 0 ? totalDiversifiedLoad / totalInstalledLoad : 1;

  // FIX: the totals used to be re-derived from kW as P / V (single-phase) or
  // P / (√3 · V) (three-phase). The per-type helpers had already produced kW
  // from current WITHOUT √3 and without power factor, so the three-phase branch
  // divided by √3 with nothing to cancel it and the round trip A → kW → A did
  // not return the entered current. The per-type currents are already line
  // currents, so summing them is both correct and self-consistent for either
  // supply arrangement. `supplyType` and `voltage` are still used for
  // validation and for the notes below.
  const totalDesignCurrent = totalInstalledCurrent;
  const diversifiedCurrent = totalDiversifiedCurrent;

  complianceNotes.push(
    `Currents shown are line currents at ${voltage} V ${supplyType === 'three-phase' ? 'three-phase' : 'single-phase'}.`
  );

  complianceNotes.push(
    `Diversity allowances come from the ${OSG_TABLE_A2} (Table A1 gives typical current demands). ` +
      'BS 7671 publishes no diversity table — Reg 311.1 states that in determining maximum demand, diversity MAY be taken into account.'
  );

  const location = circuits[0].location;
  if (location !== 'domestic') {
    complianceNotes.push(
      'The On-Site Guide diversity guidance covers household and similar premises. Blocks of dwellings, large hotels, industrial and large commercial premises are excluded and must be assessed case by case — the non-domestic figures used here are designer allowances, not published values.'
    );
  }

  complianceNotes.push(
    'Reg 536.4.202: diversity shall NOT be used as a means of load curtailment, load control or overload protection. ' +
      'The rated current of the consumer unit or distribution board must be justified by the upstream device rating (In ≤ Ina and Inc), by documented load curtailment, or by the total connected load WITHOUT diversity — not by this diversified figure.'
  );

  if (overallDiversityFactor < 0.6) {
    complianceNotes.push('High diversity applied — verify load patterns match typical usage');
  }

  return {
    totalInstalledLoad: Math.round(totalInstalledLoad * 100) / 100,
    totalDesignCurrent: Math.round(totalDesignCurrent * 10) / 10,
    diversifiedLoad: Math.round(totalDiversifiedLoad * 100) / 100,
    diversifiedCurrent: Math.round(diversifiedCurrent * 10) / 10,
    overallDiversityFactor: Math.round(overallDiversityFactor * 100) / 100,
    breakdownByType,
    complianceNotes,
  };
};

// Helper function for common domestic installation
export const calculateDomesticDiversity = (
  lightingLoad: number,
  socketLoad: number,
  cookerLoad: number = 0,
  showerLoad: number = 0
): DiversityResult => {
  const circuits: CircuitLoad[] = [];

  if (lightingLoad > 0) {
    circuits.push({
      id: 'lighting',
      type: 'lighting',
      designCurrent: (lightingLoad * 1000) / 230,
      installedPower: lightingLoad,
      quantity: 1,
      location: 'domestic',
    });
  }

  if (socketLoad > 0) {
    circuits.push({
      id: 'sockets',
      type: 'ring-final',
      designCurrent: (socketLoad * 1000) / 230,
      installedPower: socketLoad,
      quantity: 1,
      location: 'domestic',
    });
  }

  if (cookerLoad > 0) {
    circuits.push({
      id: 'cooker',
      type: 'cooker',
      designCurrent: (cookerLoad * 1000) / 230,
      installedPower: cookerLoad,
      quantity: 1,
      location: 'domestic',
    });
  }

  if (showerLoad > 0) {
    circuits.push({
      id: 'shower',
      type: 'shower',
      designCurrent: (showerLoad * 1000) / 230,
      installedPower: showerLoad,
      quantity: 1,
      location: 'domestic',
    });
  }

  return calculateDiversity(circuits);
};
