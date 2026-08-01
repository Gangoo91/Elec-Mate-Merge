/**
 * IET On-Site Guide, Appendix A, Table A2 — Allowances for diversity.
 *
 * ELE-1423. The Load Assessment Calculator previously applied flat multipliers
 * (lighting 0.9, sockets 0.6, heating 0.8, cooker 0.6, water heating 1.0,
 * motors 0.8) to kW totals. Those numbers came from no published source. The
 * 0.9 for lighting is close to Table A2's *small shops* column, not the
 * household one, and the cooker rule applied a 10 **ampere** threshold to a kW
 * figure — dimensionally wrong.
 *
 * Every value here is transcribed from the On-Site Guide, printed pages 151–152
 * (Table A2 and its continuation), read directly from the PDF. Nothing is
 * recalled or inferred.
 *
 * Two structural points from the Appendix A preamble that shape this module:
 *
 *  1. Table A2 works in AMPERES, per circuit or per point of utilization, and
 *     most rows are "100% of the largest + x% of the others". It cannot be
 *     expressed as a flat percentage of a kW total.
 *
 *  2. "The current demand of an installation consisting of a number of final
 *     circuits may be assessed using the allowances for diversity given in
 *     Table A2, which are applied to the total current demand of all the
 *     equipment supplied by the installation."
 *
 * And two cautions that must reach the user:
 *
 *  • "The recommendations in Table A2 have not been updated for some time, and
 *    do not necessarily align with modern loads and usages. The values given in
 *    Table A2, therefore, may be increased or decreased as decided by the
 *    installation designer concerned."
 *
 *  • Note †: "It is important to ensure that distribution boards or consumer
 *    units are of sufficient rating to take the total load connected to them
 *    without the application of any diversity."
 *
 * No guidance is given for blocks of dwellings, large hotels, or industrial and
 * large commercial premises — those are assessed case by case.
 */

export type PremisesType = 'household' | 'shops' | 'hotels';

export const PREMISES_LABELS: Record<PremisesType, string> = {
  household: 'Individual household installation (incl. individual dwelling of a block)',
  shops: 'Small shops, stores, offices and business premises',
  hotels: 'Small hotels, boarding houses, guest houses etc.',
};

/** Table A2 row identifiers, numbered as printed. */
export type A2Row =
  | 'lighting'
  | 'heatingAndPower'
  | 'cooking'
  | 'motors'
  | 'waterHeatersInstantaneous'
  | 'waterHeatersThermostatic'
  | 'floorWarming'
  | 'thermalStorage'
  | 'standardCircuits'
  | 'socketsAndStationary';

export const A2_ROW_LABELS: Record<A2Row, string> = {
  lighting: '1 · Lighting',
  heatingAndPower: '2 · Heating and power (final circuits not listed below)',
  cooking: '3 · Cooking appliances',
  motors: '4 · Motors (other than lift motors)',
  waterHeatersInstantaneous: '5 · Water heaters (instantaneous type)',
  waterHeatersThermostatic: '6 · Water heaters (thermostatically controlled)',
  floorWarming: '7 · Floor warming installations',
  thermalStorage: '8 · Thermal storage space heating installations',
  standardCircuits: '9 · Standard final circuits (Appendix H)',
  socketsAndStationary: '10 · Socket-outlets and stationary equipment',
};

/** Verbatim Table A2 wording, per row and premises column. */
export const A2_TEXT: Record<A2Row, Record<PremisesType, string>> = {
  lighting: {
    household: '66% of total current demand',
    shops: '90% of total current demand',
    hotels: '75% of total current demand',
  },
  heatingAndPower: {
    household:
      '100% of total current demand up to 10 A + 50% of any current demand in excess of 10 A',
    shops: '100% f.l. of largest appliance + 75% f.l. of remaining appliances',
    hotels:
      '100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances',
  },
  cooking: {
    household:
      '10 A + 30% f.l. of connected cooking appliances in excess of 10 A + 5 A if a socket-outlet is incorporated in the control unit',
    shops:
      '100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances',
    hotels:
      '100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances',
  },
  motors: {
    household: 'Not applicable',
    shops:
      '100% f.l. of largest motor + 80% f.l. of second largest motor + 60% f.l. of remaining motors',
    hotels: '100% f.l. of largest motor + 50% f.l. of remaining motors',
  },
  waterHeatersInstantaneous: {
    household:
      '100% f.l. of largest appliance + 100% f.l. of second largest appliance + 25% f.l. of remaining appliances',
    shops:
      '100% f.l. of largest appliance + 100% f.l. of second largest appliance + 25% f.l. of remaining appliances',
    hotels:
      '100% f.l. of largest appliance + 100% f.l. of second largest appliance + 25% f.l. of remaining appliances',
  },
  waterHeatersThermostatic: {
    household: 'No diversity allowable',
    shops: 'No diversity allowable',
    hotels: 'No diversity allowable',
  },
  floorWarming: {
    household: 'No diversity allowable',
    shops: 'No diversity allowable',
    hotels: 'No diversity allowable',
  },
  thermalStorage: {
    household: 'No diversity allowable',
    shops: 'No diversity allowable',
    hotels: 'No diversity allowable',
  },
  standardCircuits: {
    household:
      '100% of current demand of largest circuit + 40% of current demand of every other circuit',
    shops:
      '100% of current demand of largest circuit + 50% of current demand of every other circuit',
    hotels:
      '100% of current demand of largest circuit + 50% of current demand of every other circuit',
  },
  socketsAndStationary: {
    household:
      '100% of current demand of largest point of utilization + 40% of current demand of every other point of utilization',
    shops:
      '100% of current demand of largest point of utilization + 70% of current demand of every other point of utilization',
    hotels:
      '100% of current demand of largest point of utilization + 75% of current demand of every other point in main rooms (dining rooms etc.) + 40% of current demand of every other point of utilization',
  },
};

/** Sum a list, largest first. */
function sortedDesc(items: number[]): number[] {
  return items.filter((n) => Number.isFinite(n) && n > 0).sort((a, b) => b - a);
}

/** "100% of largest + p% of the rest", the shape most Table A2 rows take. */
function largestPlusRest(items: number[], restPct: number): number {
  const s = sortedDesc(items);
  if (!s.length) return 0;
  const rest = s.slice(1).reduce((a, b) => a + b, 0);
  return s[0] + rest * restPct;
}

/** "100% largest + p2% second + p3% of the rest". */
function largestSecondRest(items: number[], secondPct: number, restPct: number): number {
  const s = sortedDesc(items);
  if (!s.length) return 0;
  const second = s.length > 1 ? s[1] * secondPct : 0;
  const rest = s.slice(2).reduce((a, b) => a + b, 0) * restPct;
  return s[0] + second + rest;
}

export interface A2RowInput {
  /**
   * Currents in AMPERES. For rows expressed per appliance / point of
   * utilization, pass one entry each — the "100% of largest" rules need to know
   * which is largest. For rows applied to a total (lighting, heating and power)
   * the entries are summed first.
   */
  currents: number[];
  /** Row 3 only: a socket-outlet incorporated in the cooker control unit. */
  cookerControlUnitSocket?: boolean;
}

export interface A2RowResult {
  row: A2Row;
  connected: number;
  diversified: number;
  rule: string;
  /** True where the table gives no allowance, so demand equals connected load. */
  noDiversity: boolean;
  /** True where the table says the row does not apply to these premises. */
  notApplicable: boolean;
}

/**
 * Apply one Table A2 row. All currents in amperes; result in amperes.
 */
export function applyA2Row(row: A2Row, premises: PremisesType, input: A2RowInput): A2RowResult {
  const currents = (input.currents ?? []).filter((n) => Number.isFinite(n) && n > 0);
  const connected = currents.reduce((a, b) => a + b, 0);
  const rule = A2_TEXT[row][premises];
  const base: A2RowResult = {
    row,
    connected,
    diversified: connected,
    rule,
    noDiversity: false,
    notApplicable: false,
  };

  if (!currents.length) return { ...base, diversified: 0, connected: 0 };

  switch (row) {
    // Rows applied to the TOTAL current demand.
    case 'lighting': {
      const pct = premises === 'household' ? 0.66 : premises === 'shops' ? 0.9 : 0.75;
      return { ...base, diversified: connected * pct };
    }

    case 'heatingAndPower': {
      if (premises === 'household') {
        // 100% up to 10 A + 50% of the excess.
        const diversified = connected <= 10 ? connected : 10 + (connected - 10) * 0.5;
        return { ...base, diversified };
      }
      if (premises === 'shops') return { ...base, diversified: largestPlusRest(currents, 0.75) };
      return { ...base, diversified: largestSecondRest(currents, 0.8, 0.6) };
    }

    case 'cooking': {
      if (premises === 'household') {
        // 10 A + 30% of the connected load in EXCESS of 10 A, + 5 A if a
        // socket-outlet is incorporated in the control unit.
        const excess = Math.max(0, connected - 10);
        const socket = input.cookerControlUnitSocket ? 5 : 0;
        const diversified = Math.min(connected, 10 + excess * 0.3) + socket;
        return { ...base, diversified };
      }
      return { ...base, diversified: largestSecondRest(currents, 0.8, 0.6) };
    }

    case 'motors': {
      if (premises === 'household') {
        // Table A2 gives "Not applicable" — no allowance can be claimed, so the
        // full connected load stands rather than silently vanishing.
        return { ...base, diversified: connected, notApplicable: true };
      }
      if (premises === 'shops')
        return { ...base, diversified: largestSecondRest(currents, 0.8, 0.6) };
      return { ...base, diversified: largestPlusRest(currents, 0.5) };
    }

    case 'waterHeatersInstantaneous': {
      // 100% largest + 100% second largest + 25% remaining, all three columns.
      const s = sortedDesc(currents);
      const second = s.length > 1 ? s[1] : 0;
      const rest = s.slice(2).reduce((a, b) => a + b, 0) * 0.25;
      return { ...base, diversified: s[0] + second + rest };
    }

    // No diversity allowable — demand is the connected load.
    case 'waterHeatersThermostatic':
    case 'floorWarming':
    case 'thermalStorage':
      return { ...base, diversified: connected, noDiversity: true };

    case 'standardCircuits': {
      const restPct = premises === 'household' ? 0.4 : 0.5;
      return { ...base, diversified: largestPlusRest(currents, restPct) };
    }

    case 'socketsAndStationary': {
      // The hotels column distinguishes "main rooms" from other points; without
      // that split we apply the lower 40% figure to every other point, which is
      // the conservative reading of the two.
      const restPct = premises === 'household' ? 0.4 : premises === 'shops' ? 0.7 : 0.4;
      return { ...base, diversified: largestPlusRest(currents, restPct) };
    }
  }
}

export interface A2Assessment {
  rows: A2RowResult[];
  /** Total connected current, no diversity — what the CU must be rated for. */
  totalConnected: number;
  /** Assessed maximum demand after Table A2 allowances. */
  maximumDemand: number;
  /** Loads excluded from diversity and added at 100% (EV, heat pump). */
  fullDemandAdditions: number;
}

/**
 * Assess maximum demand across the Table A2 rows.
 *
 * `fullDemandAdditions` covers loads the table predates. BS 7671 A4:2026
 * requires EV charging to be included in the maximum demand of a single-phase
 * installation (the definition of Ton), and Reg 722.311.201 allows a reduced
 * figure only where load management actively limits the output. Absent that,
 * they are 100% demand items and take no diversity.
 */
export function assessMaximumDemand(
  premises: PremisesType,
  rows: Partial<Record<A2Row, A2RowInput>>,
  fullDemandAdditions = 0
): A2Assessment {
  const results: A2RowResult[] = [];
  for (const key of Object.keys(rows) as A2Row[]) {
    const input = rows[key];
    if (!input) continue;
    const r = applyA2Row(key, premises, input);
    if (r.connected > 0) results.push(r);
  }

  const extra =
    Number.isFinite(fullDemandAdditions) && fullDemandAdditions > 0 ? fullDemandAdditions : 0;
  const totalConnected = results.reduce((a, r) => a + r.connected, 0) + extra;
  const maximumDemand = results.reduce((a, r) => a + r.diversified, 0) + extra;

  return {
    rows: results,
    totalConnected: Number(totalConnected.toFixed(2)),
    maximumDemand: Number(maximumDemand.toFixed(2)),
    fullDemandAdditions: extra,
  };
}

/** Convert a kW figure to amperes at the given voltage. */
export function kwToAmps(kw: number, voltage: number, threePhase = false): number {
  if (!Number.isFinite(kw) || kw <= 0 || !Number.isFinite(voltage) || voltage <= 0) return 0;
  const factor = threePhase ? Math.sqrt(3) : 1;
  return (kw * 1000) / (voltage * factor);
}

/** The two cautions the On-Site Guide attaches to Table A2. */
export const A2_CAUTIONS = [
  'Table A2 has not been updated for some time and does not necessarily align with modern loads. The values may be increased or decreased as decided by the installation designer.',
  'Distribution boards and consumer units must be rated for the total connected load without any diversity applied.',
] as const;
