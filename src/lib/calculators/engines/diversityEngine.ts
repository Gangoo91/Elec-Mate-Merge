// IET On-Site Guide Table 1B / Table H2 Diversity Calculations
// BS 7671:2018+A3:2024 Compliant
import { CalculationError, validateInput } from '../utils/calculatorUtils';

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
    | 'thermal-storage';
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
};

/**
 * Apply diversity for lighting circuits
 * IET On-Site Guide Table 1B item 1 (domestic): 66% of total current demand
 * Table H2 item 1 (commercial/industrial): 90%
 */
function applyLightingDiversity(
  circuits: CircuitLoad[],
  voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const location = circuits[0].location;

  const factor = location === 'domestic' ? 0.66 : 0.9;
  const diversifiedCurrent = totalCurrent * factor;
  const diversifiedLoad = totalPower * factor;
  const pct = (factor * 100).toFixed(0);
  const ref =
    location === 'domestic'
      ? 'IET On-Site Guide Table 1B item 1'
      : 'IET On-Site Guide Table H2 item 1';

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
 * IET On-Site Guide Table 1B item 2 (domestic):
 *   Assumed 32A per ring. 100% of largest ring + 40% each additional ring
 */
function applyRingFinalDiversity(
  circuits: CircuitLoad[],
  voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const location = circuits[0].location;
  const assumedCurrent = 32; // A per ring final circuit
  const numRings = circuits.reduce((sum, c) => sum + c.quantity, 0);

  const totalCurrent = numRings * assumedCurrent;
  const totalPower = (totalCurrent * voltage) / 1000;

  let diversifiedCurrent: number;
  const steps: string[] = [];

  if (numRings === 1) {
    diversifiedCurrent = assumedCurrent;
    steps.push(`Single ring final circuit: ${assumedCurrent}A (assumed)`);
    steps.push(`No diversity applied for single ring`);
  } else {
    const remainderFactor = location === 'domestic' ? 0.4 : 0.5;
    const remainderPct = (remainderFactor * 100).toFixed(0);
    const remainderCurrent = (numRings - 1) * assumedCurrent * remainderFactor;
    diversifiedCurrent = assumedCurrent + remainderCurrent;

    steps.push(`${numRings} ring final circuits at ${assumedCurrent}A each`);
    steps.push(`100% of largest ring: ${assumedCurrent}A`);
    steps.push(
      `${remainderPct}% of ${numRings - 1} additional ring(s): ${numRings - 1} × ${assumedCurrent}A × ${remainderFactor} = ${remainderCurrent.toFixed(1)}A`
    );
    steps.push(
      `Total diversified: ${assumedCurrent}A + ${remainderCurrent.toFixed(1)}A = ${diversifiedCurrent.toFixed(1)}A`
    );
  }

  const diversifiedLoad = (diversifiedCurrent * voltage) / 1000;
  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const ref =
    location === 'domestic'
      ? 'IET On-Site Guide Table 1B item 2'
      : 'IET On-Site Guide Table H2 item 2';
  steps.push(`Per ${ref}`);

  const formula =
    numRings === 1
      ? `Single ring = ${assumedCurrent}A (assumed)`
      : `${assumedCurrent}A + ${location === 'domestic' ? '40' : '50'}% × ${numRings - 1} × ${assumedCurrent}A = ${diversifiedCurrent.toFixed(1)}A`;

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
 * IET On-Site Guide Table 1B item 2 (domestic): 100% up to 10A + 40% of remainder
 */
function applyRadialSocketDiversity(
  circuits: CircuitLoad[],
  voltage: number
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);
  const location = circuits[0].location;

  let remainderFactor: number;
  if (location === 'domestic') remainderFactor = 0.4;
  else if (location === 'commercial') remainderFactor = 0.5;
  else remainderFactor = 0.6;

  let diversifiedCurrent: number;
  const steps: string[] = [];
  steps.push(`Total radial socket load: ${totalCurrent.toFixed(2)}A`);

  if (totalCurrent <= 10) {
    diversifiedCurrent = totalCurrent;
    steps.push(`Load ≤ 10A: 100% = ${diversifiedCurrent.toFixed(2)}A`);
  } else {
    const remainder = totalCurrent - 10;
    diversifiedCurrent = 10 + remainder * remainderFactor;
    steps.push(`First 10A at 100%: 10A`);
    steps.push(
      `${(remainderFactor * 100).toFixed(0)}% of remainder: ${remainder.toFixed(2)}A × ${remainderFactor} = ${(remainder * remainderFactor).toFixed(2)}A`
    );
    steps.push(
      `Total: 10A + ${(remainder * remainderFactor).toFixed(2)}A = ${diversifiedCurrent.toFixed(2)}A`
    );
  }

  const diversifiedLoad = (diversifiedCurrent * voltage) / 1000;
  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const ref =
    location === 'domestic'
      ? 'IET On-Site Guide Table 1B item 2'
      : 'IET On-Site Guide Table H2 item 2';
  steps.push(`Per ${ref}`);

  const formula =
    totalCurrent <= 10
      ? `100% (load ≤ 10A)`
      : `10A + ${(remainderFactor * 100).toFixed(0)}% of ${(totalCurrent - 10).toFixed(1)}A = ${diversifiedCurrent.toFixed(1)}A`;

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
 * IET On-Site Guide Table 1B item 3 (domestic):
 *   10A + 30% of remainder over 10A. +5A if cooker unit has socket outlet
 */
function applyCookerDiversity(
  circuits: CircuitLoad[],
  voltage: number
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

  const diversifiedLoad = (diversifiedCurrent * voltage) / 1000;
  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const ref =
    location === 'domestic'
      ? 'IET On-Site Guide Table 1B item 3'
      : 'IET On-Site Guide Table H2 item 3';
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
 * IET On-Site Guide Table 1B item 4 (domestic):
 *   Thermostatically controlled: 100% (no diversity)
 *   Non-thermostatically controlled: Largest 100% + 75% of remainder
 */
function applySpaceHeatingDiversity(
  circuits: CircuitLoad[],
  voltage: number
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

  const diversifiedLoad = (diversifiedCurrent * voltage) / 1000;
  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const ref =
    location === 'domestic'
      ? 'IET On-Site Guide Table 1B item 4'
      : 'IET On-Site Guide Table H2 item 4';
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
 * Apply diversity for shower circuits
 * IET On-Site Guide Table 1B item 5 (domestic):
 *   100% of largest + 100% of 2nd largest + 25% of remainder
 */
function applyShowerDiversity(
  circuits: CircuitLoad[],
  voltage: number
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

  const diversifiedLoad = (diversifiedCurrent * voltage) / 1000;
  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const ref =
    location === 'domestic'
      ? 'IET On-Site Guide Table 1B item 5'
      : 'IET On-Site Guide Table H2 item 5';
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
 * IET On-Site Guide Table H2 (commercial/industrial):
 *   Largest 100% + 40% of remaining
 * Domestic: 100% (no diversity)
 */
function applyMotorDiversity(
  circuits: CircuitLoad[],
  voltage: number
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

  const diversifiedLoad = (diversifiedCurrent * voltage) / 1000;
  const diversityFactor = totalCurrent > 0 ? diversifiedCurrent / totalCurrent : 1;
  const ref = location === 'domestic' ? 'BS 7671 Appendix 4' : 'IET On-Site Guide Table H2';
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
 * Apply no diversity (100%) for load types that do not permit diversity
 * Water heating (Table 1B item 7), Floor warming (Table 1B item 8),
 * EV charging (BS 7671 Section 722.311), Thermal storage, Dedicated outlets
 */
function applyNoDiversity(
  circuits: CircuitLoad[],
  voltage: number,
  loadType: string
): Omit<TypeBreakdown, 'type' | 'displayName' | 'count'> {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const totalPower = circuits.reduce((sum, c) => sum + c.installedPower, 0);

  const regulationMap: Record<string, string> = {
    'water-heating': 'IET On-Site Guide Table 1B item 7',
    'floor-warming': 'IET On-Site Guide Table 1B item 8',
    'ev-charging': 'BS 7671:2018 Section 722.311',
    'thermal-storage': 'IET On-Site Guide Table H2 item 9',
    'dedicated-outlet': 'IET On-Site Guide — no diversity for dedicated circuits',
    'small-power': 'IET On-Site Guide Table 1B item 2',
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
 * Same as radial socket for domestic: 100% up to 10A + 40% remainder
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
  const ref = 'IET On-Site Guide Table H2 item 2';

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

  // Recalculate design current based on supply type
  let totalDesignCurrent: number;
  let diversifiedCurrent: number;

  if (supplyType === 'three-phase') {
    totalDesignCurrent = (totalInstalledLoad * 1000) / (Math.sqrt(3) * voltage);
    diversifiedCurrent = (totalDiversifiedLoad * 1000) / (Math.sqrt(3) * voltage);
  } else {
    totalDesignCurrent = (totalInstalledLoad * 1000) / voltage;
    diversifiedCurrent = (totalDiversifiedLoad * 1000) / voltage;
  }

  complianceNotes.push(
    'Diversity allowances per IET On-Site Guide (not BS 7671 directly). Diversity is published in the IET On-Site Guide, Tables 1B (domestic) and H2 (commercial/industrial).'
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
