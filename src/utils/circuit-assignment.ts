import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';

export interface CircuitAssignment {
  symbolId: string;
  symbolName: string;
  circuitRef: string;
  circuitName: string;
  cableSize: string;
  protectionRating: string;
  rcdRequired: boolean;
  typicalLoad: string;
}

export interface CircuitScheduleEntry {
  circuitRef: string;
  circuitName: string;
  cableSize: string;
  protection: string;
  rcd: string;
  points: number;
  typicalLoad: string;
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
        rcdRequired: false,
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
        rcdRequired: isBathroom,
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
      protectionRating: '32A MCB Type B',
      rcdRequired: false,
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
      rcdRequired: true,
      typicalLoad: '7.4kW',
    });
  });

  // ── Extractor Fan ──
  const extractorSymbols = symbolIds.filter((id) => id === 'extractor-fan');
  extractorSymbols.forEach((id) => {
    // Fused spur from lighting circuit
    const lightingCircuit = splitLighting ? 'L1' : 'L1';
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
      rcdRequired: false,
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
      rcdRequired: false,
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
      rcdRequired: false,
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
      rcdRequired: false,
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
      rcdRequired: false,
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
      // If any symbol on this circuit requires RCD, mark circuit as RCD
      if (a.rcdRequired && existing.rcd === 'N/A') {
        existing.rcd = '30mA RCD';
      }
    } else {
      scheduleMap.set(a.circuitRef, {
        circuitRef: a.circuitRef,
        circuitName: a.circuitName,
        cableSize: a.cableSize,
        protection: a.protectionRating,
        rcd: a.rcdRequired ? '30mA RCD' : 'N/A',
        points: 1,
        typicalLoad: '',
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
