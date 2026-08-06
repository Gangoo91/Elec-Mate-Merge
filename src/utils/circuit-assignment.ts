import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';

/**
 * ⚠️ These are INDICATIVE starting points for a domestic installation, not a
 * design. They exist to save the electrician typing, and every value is
 * editable before the drawing is issued.
 *
 * RCD defaults follow BS 7671:2018+A4:2026 as verified against the regulations:
 *
 *  - 411.3.4  — within domestic premises, additional protection by a 30mA RCD
 *               SHALL be provided for AC final circuits supplying luminaires.
 *               Lighting circuits previously printed "N/A" here, which is a
 *               non-compliance printed onto a client-facing document.
 *  - 411.3.3  — additional protection for socket-outlets rated up to 32A.
 *  - 722.531.3.101 — EV charging. Cross-references BS EN 62423 (Type B) and
 *               BS IEC 62955 (RDC-DD, mode 3). A plain Type AC/A is not enough.
 *  - 522.6.202 / Table 52.1 — 30mA RCD for cables concealed in a wall at a
 *               depth of less than 50mm, which in practice covers essentially
 *               every domestic final circuit run in a stud or plastered wall.
 *
 * Because 522.6.202 catches almost everything, the honest default is RCD
 * protection ON, with the electrician removing it where a documented reason
 * applies (e.g. cable in earthed metallic conduit) rather than the reverse.
 */
const RCD_30MA = '30mA RCD';

/** Why a circuit carries RCD protection — printed so the drawing is auditable. */
type RcdBasis = '411.3.4' | '411.3.3' | '522.6.202' | 'Section 701' | '722.531.3.101';

export interface CircuitAssignment {
  symbolId: string;
  symbolName: string;
  circuitRef: string;
  circuitName: string;
  cableSize: string;
  protectionRating: string;
  rcdRequired: boolean;
  /** Regulation the RCD requirement comes from, for the drawing's notes. */
  rcdBasis?: RcdBasis;
  typicalLoad: string;
}

/** One way in the consumer unit, derived from the circuit schedule. */
export interface ConsumerUnitWay {
  way: number;
  circuitRef: string;
  circuitName: string;
  protection: string;
  rcd: string;
  cableSize: string;
  points: number;
  connectedLoad: string;
}

export interface CircuitScheduleEntry {
  circuitRef: string;
  circuitName: string;
  cableSize: string;
  protection: string;
  rcd: string;
  /** Regulation reference behind the RCD column, e.g. "411.3.4". */
  rcdBasis?: string;
  points: number;
  typicalLoad: string;
  /**
   * Set when the default needs the designer's attention before issue — the
   * value is deliberately left for them rather than guessed.
   */
  needsReview?: string;
}

// Symbol IDs that are lighting points
const LIGHTING_IDS = new Set([
  'light-ceiling', 'light-wall', 'light-downlight', 'light-emergency',
  'light-fluorescent', 'light-pendant', 'light-bulkhead', 'light-pir',
  'light-outside', 'light-led-strip', 'light-exit-sign', 'light-twin-emergency',
  'light-high-bay',
]);

// Symbol IDs that count as 13A socket points on a ring final
const SOCKET_IDS = new Set([
  'socket-single-13a', 'socket-double-13a', 'socket-usb', 'socket-data',
  'socket-telephone', 'socket-tv-aerial', 'socket-floor', 'socket-outdoor',
  'socket-shaver',
]);

// Fused spurs go on the ring circuit
const SPUR_IDS = new Set([
  'socket-fused-spur', 'socket-switched-fused-spur', 'socket-unswitched-spur',
]);

// Smoke / CO / heat detectors → fire alarm circuit
const FIRE_ALARM_IDS = new Set([
  'smoke-detector', 'co-detector', 'heat-detector',
]);

// Distribution / protection — not on a circuit
const DISTRIBUTION_IDS = new Set([
  'consumer-unit', 'mcb', 'rcd', 'rcbo', 'main-isolator',
  'distribution-board', 'spd', 'meter', 'mccb', 'contactor',
  'changeover-switch', 'generator-changeover', 'busbar-chamber', 'sub-main-board',
]);

// Architectural elements — not electrical circuits
const ARCHITECTURAL_IDS = new Set([
  'door-left', 'door-right', 'door-double', 'window', 'north-arrow', 'stairs',
]);

// Containment — not on a circuit
const CONTAINMENT_IDS = new Set([
  'cable-tray', 'conduit', 'trunking', 'floor-trunking', 'busbar-trunking',
  'cable-tray-drop', 'riser', 'floor-box-multi', 'underfloor-trunking',
]);

// Bathroom-related symbols that require RCD
const BATHROOM_SYMBOLS = new Set([
  'socket-shaver', 'switch-pull-cord', 'towel-rail',
]);

function getSymbolName(symbolId: string): string {
  const sym = symbolRegistry.find((s) => s.id === symbolId);
  return sym?.name || symbolId;
}

/**
 * Build a consumer unit way schedule from the circuit schedule.
 *
 * Purely derived — it re-presents circuits already established (and their
 * regulation-sourced RCD requirements) as board ways, and introduces no new
 * electrical claims of its own. Ways are numbered in schedule order.
 *
 * Note this is a CONNECTED load total. Applying diversity to arrive at maximum
 * demand is a design step requiring the installation's actual usage, so it is
 * deliberately not attempted here.
 */
export function buildConsumerUnitSchedule(
  circuitSchedule: CircuitScheduleEntry[]
): { ways: ConsumerUnitWay[]; totalConnectedLoadKw: number; wayCount: number } {
  const ways = circuitSchedule.map((c, i) => ({
    way: i + 1,
    circuitRef: c.circuitRef,
    circuitName: c.circuitName,
    protection: c.protection,
    rcd: c.rcd,
    cableSize: c.cableSize,
    points: c.points,
    connectedLoad: c.typicalLoad,
  }));

  const totalWatts = circuitSchedule.reduce((sum, c) => {
    const m = c.typicalLoad.match(/([\d.]+)\s*(kW|W)/i);
    if (!m) return sum;
    const v = parseFloat(m[1]);
    return sum + (m[2].toLowerCase() === 'kw' ? v * 1000 : v);
  }, 0);

  return {
    ways,
    totalConnectedLoadKw: Math.round((totalWatts / 1000) * 10) / 10,
    wayCount: ways.length,
  };
}

export function assignCircuits(symbolIds: string[]): {
  assignments: CircuitAssignment[];
  circuitSchedule: CircuitScheduleEntry[];
} {
  // Count each symbol type
  const counts = new Map<string, number>();
  symbolIds.forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));

  const assignments: CircuitAssignment[] = [];

  // ── Lighting ──
  const lightingSymbols = symbolIds.filter((id) => LIGHTING_IDS.has(id));
  const totalLighting = lightingSymbols.length;
  const splitLighting = totalLighting > 12;

  if (totalLighting > 0) {
    // Sort for determinism, then split if needed
    const sorted = [...lightingSymbols].sort();
    sorted.forEach((id, idx) => {
      const circuitNum = splitLighting && idx >= Math.ceil(totalLighting / 2) ? 2 : 1;
      assignments.push({
        symbolId: id,
        symbolName: getSymbolName(id),
        circuitRef: `L${circuitNum}`,
        circuitName: `Lighting Circuit ${circuitNum}`,
        cableSize: '1.5mm² T&E',
        protectionRating: '6A MCB Type B',
        // 411.3.4 — mandatory for AC final circuits supplying luminaires in
        // domestic premises. This printed "N/A" before.
        rcdRequired: true,
        rcdBasis: '411.3.4',
        typicalLoad: '100W per point',
      });
    });
  }

  // ── Sockets (Ring Final) ──
  const socketSymbols = symbolIds.filter((id) => SOCKET_IDS.has(id));
  const spurSymbols = symbolIds.filter((id) => SPUR_IDS.has(id));
  const ringSymbols = [...socketSymbols, ...spurSymbols];
  const totalSockets = ringSymbols.length;
  const splitSockets = totalSockets > 10;

  if (totalSockets > 0) {
    const sorted = [...ringSymbols].sort();
    sorted.forEach((id, idx) => {
      const circuitNum = splitSockets && idx >= Math.ceil(totalSockets / 2) ? 2 : 1;
      const isBathroom = BATHROOM_SYMBOLS.has(id);
      assignments.push({
        symbolId: id,
        symbolName: getSymbolName(id),
        circuitRef: `S${circuitNum}`,
        circuitName: `Ring Final ${circuitNum}`,
        cableSize: '2.5mm² T&E',
        protectionRating: '32A MCB Type B',
        // 411.3.3 covers every socket-outlet rated up to 32A — not only the
        // ones in a bathroom, which is all the old flag caught.
        rcdRequired: true,
        rcdBasis: isBathroom ? 'Section 701' : '411.3.3',
        typicalLoad: '230W per point',
      });
    });
  }

  // ── Cooker ──
  const cookerSymbols = symbolIds.filter((id) => id === 'socket-cooker-45a');
  cookerSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'C1',
      circuitName: 'Cooker Circuit',
      cableSize: '6mm² T&E',
      // 45A is not a standard BS EN 60898 MCB rating — it is the rating of the
      // cooker CONTROL SWITCH, which is what the old value had confused it
      // with. 32A is the conventional protective device for 6mm² on a domestic
      // cooker circuit with diversity applied.
      protectionRating: '32A MCB Type B',
      rcdRequired: true,
      rcdBasis: '522.6.202',
      typicalLoad: '8kW',
    });
  });

  // ── EV Charger ──
  const evSymbols = symbolIds.filter((id) => id === 'socket-ev-charger');
  evSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'EV1',
      circuitName: 'EV Charger',
      cableSize: '6mm² T&E',
      protectionRating: '32A MCB Type B',
      // RCD TYPE, not just sensitivity.
      //
      // Verified against bs7671_facets (A4:2026): Regulation 722.531.3.101
      // cross-references BS EN 62423 (Type F and Type B RCDs) and
      // BS IEC 62955 (RDC-DD — residual direct current detecting device for
      // mode 3 charging), and is listed in Table 537.4. So a plain 30mA Type AC
      // or Type A alone is not sufficient for an EV charge point: it needs a
      // Type B RCD, or Type A together with an RDC-DD.
      //
      // Which of the two applies depends on whether the charge point provides
      // its own DC fault detection, which only the manufacturer's data states —
      // hence both compliant options are printed and the choice is flagged.
      rcdRequired: true,
      rcdBasis: '722.531.3.101',
      typicalLoad: '7.4kW',
    });
  });

  // ── Extractor Fan ──
  const extractorSymbols = symbolIds.filter((id) => id === 'extractor-fan');
  extractorSymbols.forEach((id) => {
    // Fused spur from lighting circuit
    const lightingCircuit = 'L1';
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: lightingCircuit,
      circuitName: 'Lighting Circuit 1 (FCU)',
      cableSize: '1.5mm² T&E',
      protectionRating: '6A MCB Type B',
      rcdRequired: true,
      typicalLoad: '30W',
    });
  });

  // ── Fire Alarm (Smoke / CO / Heat) ──
  const fireAlarmSymbols = symbolIds.filter((id) => FIRE_ALARM_IDS.has(id));
  fireAlarmSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'FA1',
      circuitName: 'Fire Alarm Circuit',
      cableSize: '1.5mm² FP200',
      protectionRating: '6A MCB Type B',
      rcdRequired: true,
      rcdBasis: '522.6.202',
      typicalLoad: '5W per point',
    });
  });

  // ── Immersion / Water Heater ──
  const immersionSymbols = symbolIds.filter((id) => id === 'water-heater');
  immersionSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'IH1',
      circuitName: 'Immersion Heater',
      cableSize: '2.5mm² T&E',
      protectionRating: '16A MCB Type B',
      rcdRequired: true,
      rcdBasis: '522.6.202',
      typicalLoad: '3kW',
    });
  });

  // ── Towel Rail ──
  const towelRailSymbols = symbolIds.filter((id) => id === 'towel-rail');
  towelRailSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'S1',
      circuitName: 'Ring Final 1 (FCU)',
      cableSize: '2.5mm² T&E',
      protectionRating: '32A MCB Type B',
      rcdRequired: true,
      typicalLoad: '100W',
    });
  });

  // ── Boiler ──
  const boilerSymbols = symbolIds.filter((id) => id === 'boiler');
  boilerSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'S1',
      circuitName: 'Ring Final 1 (FCU)',
      cableSize: '2.5mm² T&E',
      protectionRating: '32A MCB Type B',
      rcdRequired: true,
      rcdBasis: '522.6.202',
      typicalLoad: '100W',
    });
  });

  // ── Panel Heater / Heater ──
  const heaterSymbols = symbolIds.filter((id) => id === 'heater' || id === 'panel-heater');
  heaterSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'S1',
      circuitName: 'Ring Final 1 (FCU)',
      cableSize: '2.5mm² T&E',
      protectionRating: '32A MCB Type B',
      rcdRequired: true,
      rcdBasis: '522.6.202',
      typicalLoad: '2kW',
    });
  });

  // ── Hand Dryer ──
  const handDryerSymbols = symbolIds.filter((id) => id === 'hand-dryer');
  handDryerSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'S1',
      circuitName: 'Ring Final 1 (FCU)',
      cableSize: '2.5mm² T&E',
      protectionRating: '32A MCB Type B',
      rcdRequired: true,
      rcdBasis: '411.3.3',
      typicalLoad: '2.4kW',
    });
  });

  // ── Air Conditioning ──
  const acSymbols = symbolIds.filter((id) => id === 'air-conditioning' || id === 'fan-coil-unit');
  acSymbols.forEach((id) => {
    assignments.push({
      symbolId: id,
      symbolName: getSymbolName(id),
      circuitRef: 'AC1',
      circuitName: 'Air Conditioning',
      cableSize: '2.5mm² T&E',
      protectionRating: '16A MCB Type C',
      rcdRequired: true,
      rcdBasis: '522.6.202',
      typicalLoad: '2.5kW',
    });
  });

  // ── Switches ── (not a circuit themselves, they control circuits)
  // Switches, thermostats, junction boxes, CCTV, door entry, comms cabinet,
  // fire alarm call points, sensors, BMS, control panels, lighting control etc.
  // are not assigned to their own circuit — they are part of whichever circuit they control.
  // Skip: distribution, architectural, containment, equipment categories
  // as they are either not circuits or are infrastructure.

  // ── Build Circuit Schedule ──
  const scheduleMap = new Map<string, CircuitScheduleEntry>();

  for (const a of assignments) {
    const existing = scheduleMap.get(a.circuitRef);
    if (existing) {
      existing.points += 1;
      // If any point on this circuit needs an RCD, the whole circuit does.
      if (a.rcdRequired && existing.rcd !== RCD_30MA) {
        existing.rcd = RCD_30MA;
        existing.rcdBasis = a.rcdBasis;
      }
      // A bathroom point on a shared circuit is the stronger citation.
      if (a.rcdBasis === 'Section 701') existing.rcdBasis = 'Section 701';
    } else {
      scheduleMap.set(a.circuitRef, {
        circuitRef: a.circuitRef,
        circuitName: a.circuitName,
        cableSize: a.cableSize,
        protection: a.protectionRating,
        rcd: a.rcdRequired
          ? (a.rcdBasis === '722.531.3.101' ? '30mA Type B / Type A + RDC-DD' : RCD_30MA)
          : 'Not required',
        rcdBasis: a.rcdBasis,
        points: 1,
        typicalLoad: '',
        // The RCD TYPE for EV charging depends on the charge point's own DC
        // fault detection (Section 722). We deliberately don't guess it — the
        // drawing says so rather than printing a type that may be wrong.
        needsReview:
          a.rcdBasis === '722.531.3.101'
            ? 'Type B (BS EN 62423), or Type A with an RDC-DD (BS IEC 62955) where the charge point provides DC fault detection — confirm against the manufacturer’s instructions'
            : undefined,
      });
    }
  }

  // Calculate total typical load per circuit
  for (const [ref, entry] of scheduleMap) {
    const circuitAssignments = assignments.filter((a) => a.circuitRef === ref);
    // Sum numeric loads
    let totalWatts = 0;
    for (const a of circuitAssignments) {
      const match = a.typicalLoad.match(/([\d.]+)\s*(kW|W)/i);
      if (match) {
        const val = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        totalWatts += unit === 'kw' ? val * 1000 : val;
      }
    }
    if (totalWatts >= 1000) {
      entry.typicalLoad = `${(totalWatts / 1000).toFixed(1)}kW`;
    } else {
      entry.typicalLoad = `${Math.round(totalWatts)}W`;
    }
  }

  // Sort schedule deterministically: L, S, C, EV, FA, IH, AC, then others
  const ORDER = ['L', 'S', 'C', 'EV', 'FA', 'IH', 'AC'];
  const circuitSchedule = Array.from(scheduleMap.values()).sort((a, b) => {
    const prefixA = a.circuitRef.replace(/\d+$/, '');
    const prefixB = b.circuitRef.replace(/\d+$/, '');
    const idxA = ORDER.indexOf(prefixA);
    const idxB = ORDER.indexOf(prefixB);
    const orderA = idxA >= 0 ? idxA : ORDER.length;
    const orderB = idxB >= 0 ? idxB : ORDER.length;
    if (orderA !== orderB) return orderA - orderB;
    return a.circuitRef.localeCompare(b.circuitRef);
  });

  return { assignments, circuitSchedule };
}
