/**
 * Circuit design for a planned building (28 Sep 2026).
 *
 * Until now every light was "L1", every socket "S1" and every detector "FA1",
 * whatever the building — 64 lights on one circuit and 81 sockets on one ring
 * for a care home. This groups what is actually on the plan into circuits the
 * way an electrician would, floor by floor and room by room, to limits taken
 * from the primary sources (each circuit carries its reference):
 *
 *   • Socket circuits — OSG 9th Ed Table H2.1: ring (A1) 30/32 A, 2.5 mm²,
 *     ≤ 100 m²; radial (A2) 32 A 4 mm² ≤ 75 m²; radial (A3) 20 A 2.5 mm²
 *     ≤ 50 m². OSG H1.1 / 433.1.204: washing machines, tumble dryers and
 *     dishwashers shared across the ring or given separate circuits — so
 *     kitchens and laundries get their own.
 *   • Lighting — OSG Table 7.1 assumptions: a 6 A lighting circuit is designed
 *     for 5 A; OSG Table A1: at least 100 W per lighting point. 5 A × 230 V =
 *     1,150 W, so no more than 11 points per circuit.
 *   • Shaver supply units, clocks, bell transformers — OSG Table A1: may be
 *     neglected for load. They ride on the room's lighting circuit.
 *   • RCD — BS 7671:2018+A4:2026 Reg 411.3.3: socket-outlets ≤ 32 A.
 *   • AFDD — Reg 421.1.7 (A4): REQUIRED on socket final circuits ≤ 32 A in
 *     care homes, HMOs, purpose-built student accommodation and higher-risk
 *     residential buildings; recommended elsewhere.
 *   • Fire detection — BS 5839-1:2025 cl 12: where the building exceeds
 *     300 m², each zone is restricted to one storey; a zone ≤ 2,000 m².
 *     Cl 24.1: the panel supply is a dedicated circuit from the first
 *     distribution board, its switch labelled "FIRE ALARM. DO NOT SWITCH OFF".
 *
 * Pure: objects in, circuit refs and a schedule out. The schedule is also
 * rebuilt from the drawing itself (`scheduleFromObjects`), so hand edits to a
 * symbol's circuit show up in it.
 */
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import type { CircuitScheduleEntry } from '@/utils/circuit-assignment';

export type Premises = 'dwelling' | 'multi-occupancy';

/**
 * What the building is — set by the electrician, not guessed. It decides two
 * things the design can't safely infer from room names:
 *  • AFDDs on socket circuits ≤ 32 A: REQUIRED in higher-risk residential
 *    buildings, HMOs, purpose-built student accommodation and care homes;
 *    recommended elsewhere (Reg 421.1.7, A4:2026 — confirmed in the RAG).
 *  • Fire detection: a care home is a BS 5839-1 panel system; homes (houses,
 *    flats, HMOs, student rooms) are BS 5839-6 alarms, grade to be confirmed
 *    against the fire risk assessment.
 */
export type Earthing = 'TN-C-S' | 'TN-S' | 'TT';

export type BuildingType =
  'house' | 'flat' | 'hrrb' | 'hmo' | 'student' | 'care-home' | 'non-domestic';
export const BUILDING_TYPES: { id: BuildingType; label: string }[] = [
  { id: 'house', label: 'House' },
  { id: 'flat', label: 'Flat' },
  { id: 'hrrb', label: 'High-rise flat' },
  { id: 'hmo', label: 'HMO' },
  { id: 'student', label: 'Student block' },
  { id: 'care-home', label: 'Care home' },
  // Schools, offices, shops: a BS 5839-1 panel system, not domestic alarms.
  { id: 'non-domestic', label: 'School / office / shop' },
];
const AFDD_REQUIRED: BuildingType[] = ['hrrb', 'hmo', 'student', 'care-home'];
export const premisesOfType = (t: BuildingType): Premises =>
  AFDD_REQUIRED.includes(t) ? 'multi-occupancy' : 'dwelling';

export type CircuitKind =
  | 'ring'
  | 'radial'
  | 'lighting'
  | 'cooker'
  | 'ev'
  | 'fire-zone'
  | 'fire-supply'
  | 'water-heater'
  | 'heating'
  | 'ac'
  | 'smoke-alarms'
  | 'submain';

export interface DesignedCircuit {
  ref: string;
  kind: CircuitKind;
  description: string;
  device: string;
  cable: string;
  points: number;
  /** Floor area served, m² — sockets and fire zones. */
  areaM2?: number;
  floor: string;
  rooms: string[];
  rcd: boolean;
  afdd: boolean;
  notes: string[];
  source: string;
  /** The board this circuit is fed from, when the plan has sub-boards ("DB2"). */
  board?: string;
  /** Its place on the board, where the electrician has moved it. */
  pin?: number;
  /** Amended by hand on the board schedule: its OSG length row no longer applies. */
  edited?: boolean;
  /** When the cable runs are drawn: the run's length and the OSG check. */
  length?: LengthCheck;
}

type Role =
  | 'light'
  | 'lighting-accessory'
  | 'socket'
  | 'spur'
  | 'heater'
  | 'water-heater'
  | 'ac'
  | 'control'
  | 'cooker'
  | 'ev'
  | 'fire'
  | 'none';

const role = (symbolId: string): Role => {
  if (/^light-/.test(symbolId)) return 'light';
  if (symbolId === 'extractor-fan') return 'light';
  // A heater switch or isolator belongs to the appliance it controls.
  if (symbolId === 'switch-heater' || symbolId === 'switch-isolator') return 'control';
  if (symbolId === 'switch-emergency-stop') return 'none';
  if (/^switch-/.test(symbolId) || symbolId === 'socket-shaver') return 'lighting-accessory';
  // Permanently connected equipment: a fused spur off the room's ring (OSG H2.4, H2.5).
  if (['towel-rail', 'boiler', 'hand-dryer'].includes(symbolId)) return 'spur';
  // Space heating: a spur where it is one or two heaters, its own circuit where
  // it is a whole-floor heating installation (OSG H5).
  if (symbolId === 'heater' || symbolId === 'panel-heater') return 'heater';
  if (symbolId === 'water-heater') return 'water-heater';
  if (symbolId === 'air-conditioning' || symbolId === 'fan-coil-unit') return 'ac';
  if (symbolId === 'socket-cooker-45a') return 'cooker';
  if (symbolId === 'socket-ev-charger') return 'ev';
  if (
    [
      'socket-single-13a',
      'socket-double-13a',
      'socket-usb',
      'socket-floor',
      'socket-outdoor',
      'socket-fused-spur',
      'socket-switched-fused-spur',
      'socket-unswitched-spur',
    ].includes(symbolId)
  )
    return 'socket';
  if (
    [
      'smoke-detector',
      'heat-detector',
      'co-detector',
      'fire-alarm',
      'sounder-beacon',
      'break-glass',
      'emergency-call-point',
      'bell',
    ].includes(symbolId)
  )
    return 'fire';
  // Data, TV, telephone, comms, CCTV, door entry: not mains final circuits.
  return 'none';
};

/** Points of load a symbol adds to a circuit (a double socket is one outlet position). */
const RING_MAX_M2 = 100;
const LIGHTING_MAX_POINTS = 11;
const FIRE_STOREY_RULE_M2 = 300;
const FIRE_ZONE_MAX_M2 = 2000;

export interface RoomFacts {
  name: string;
  floor: string;
  areaM2: number;
  kind?: string;
  /** Plan position of the room's centre, metres — used to walk the floor in order. */
  cx: number;
  cy: number;
}

/** A care home or HMO-style building: many bedrooms. Drives the AFDD requirement. */
export function inferPremises(rooms: RoomFacts[]): Premises {
  // A bedroom by name, not anything containing "bed": "Bed 1 En-suite" or a
  // "Bedroom 3 Wardrobe" is not another bedroom, and counting them told a
  // four-bed house that AFDDs were required.
  const bedrooms = rooms.filter(
    (r) =>
      r.kind === 'bedroom' ||
      (/\bbed(room)?s?\b/i.test(r.name) &&
        !/en-?suite|wardrobe|store|cupboard|bath|shower|wc/i.test(r.name))
  ).length;
  return bedrooms >= 7 ? 'multi-occupancy' : 'dwelling';
}

/**
 * A school, office or shop, read from its room names (29 Sep 2026): several
 * rooms no home has, or a run of WCs, and no bedrooms. A primary school came out with domestic
 * smoke alarms because the only test for a panel system was bedroom count.
 */
const NON_DOMESTIC_ROOM =
  /\b(class ?room|classroom|office|reception|staff|meeting|board ?room|canteen|server|lab(oratory)?|workshop|sales|shop|retail|warehouse|plant ?room|lecture|seminar|studio|library|sports? hall|changing|toilets|welfare)\b/i;
export function looksNonDomestic(rooms: RoomFacts[]): boolean {
  const named = rooms.filter((r) => NON_DOMESTIC_ROOM.test(r.name)).length;
  const bedrooms = rooms.filter((r) => /\bbed(room)?s?\b/i.test(r.name)).length;
  // Rooms read only as codes ("JL G002") still give it away: a run of WCs.
  const wcs = rooms.filter((r) => /\b(wc|toilets?)\b/i.test(r.name)).length;
  return bedrooms === 0 && (named >= 3 || wcs >= 4);
}

/** A BS 5839-1 panel system rather than BS 5839-6 alarms. */
export function isPanelSystem(rooms: RoomFacts[], buildingType?: BuildingType): boolean {
  if (buildingType) return buildingType === 'care-home' || buildingType === 'non-domestic';
  return inferPremises(rooms) === 'multi-occupancy' || looksNonDomestic(rooms);
}

/** The note on the smoke-alarm circuit, by building type. */
export const smokeAlarmNote = (buildingType?: BuildingType) =>
  buildingType && buildingType !== 'house' && buildingType !== 'flat'
    ? 'Grade and category to BS 5839-6 and the fire risk assessment — confirm'
    : 'Domestic premises: BS 5839-6 alarms, not a BS 5839-1 panel system — confirm the supply arrangement';

/** The type most items carry — one pasted item must not outvote the plan. */
export function stampedType(objects: CanvasObject[]): BuildingType | undefined {
  const counts = new Map<BuildingType, number>();
  objects.forEach(
    (o) => o.buildingType && counts.set(o.buildingType, (counts.get(o.buildingType) ?? 0) + 1)
  );
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

/**
 * "Kitchen Store", "Laundry Cupboard", "Utility Corridor": named for a kitchen
 * but not one. A school's four kitchen stores each got an appliance ring of
 * one socket.
 */
const NOT_A_KITCHEN = /\b(store|stores|cupboard|corridor|lobby|passage|wc|toilet|office)\b/i;

/** Walk a floor the way a cable run would: in bands top to bottom, alternating direction. */
function walkOrder(rooms: RoomFacts[]): RoomFacts[] {
  const BAND_M = 4;
  const bands = new Map<number, RoomFacts[]>();
  rooms.forEach((r) => {
    const b = Math.floor(r.cy / BAND_M);
    bands.set(b, [...(bands.get(b) ?? []), r]);
  });
  return [...bands.entries()]
    .sort((a, b) => a[0] - b[0])
    .flatMap(([, band], i) => band.sort((a, b) => (i % 2 ? b.cx - a.cx : a.cx - b.cx)));
}

/** "Sockets — Ground floor", or just "Sockets" on a plan with no floors named. */
const onFloor = (base: string, floor: string) => (floor ? `${base} — ${floor}` : base);

/**
 * Assign every symbol a circuit. `roomOf` maps a symbol id to its room.
 * Returns the refs to set and the schedule describing each circuit.
 */
export function designCircuits(
  symbols: CanvasObject[],
  roomOf: (symbolObjectId: string) => RoomFacts | undefined,
  premises?: Premises,
  buildingType?: BuildingType
): { refs: Map<string, string>; circuits: DesignedCircuit[]; premises: Premises } {
  const allRooms = [...new Set(symbols.map((s) => roomOf(s.id)).filter(Boolean) as RoomFacts[])];
  const prem = buildingType ? premisesOfType(buildingType) : (premises ?? inferPremises(allRooms));
  const afddRequired = prem === 'multi-occupancy';
  // A panel system for a care home or a non-domestic building (or, not told,
  // a building read as one).
  const panelSystem = isPanelSystem(allRooms, buildingType);
  const alarmNote = smokeAlarmNote(buildingType);
  const totalArea = allRooms.reduce((a, r) => a + r.areaM2, 0);

  const refs = new Map<string, string>();
  const circuits: DesignedCircuit[] = [];
  const counters: Record<string, number> = {};
  const nextRef = (prefix: string) =>
    `${prefix}${(counters[prefix] = (counters[prefix] ?? 0) + 1)}`;

  const floors = [...new Set(allRooms.map((r) => r.floor))];
  // Grouped once: filtering every symbol for every room × role was cubic, and
  // froze the page for seconds on a large plan.
  const grouped = new Map<RoomFacts, Map<Role, CanvasObject[]>>();
  symbols.forEach((s) => {
    const room = roomOf(s.id);
    if (!room || !s.symbolId) return;
    const byRole = grouped.get(room) ?? new Map<Role, CanvasObject[]>();
    const r = role(s.symbolId);
    byRole.set(r, [...(byRole.get(r) ?? []), s]);
    grouped.set(room, byRole);
  });
  const symbolsIn = (room: RoomFacts, r: Role) => grouped.get(room)?.get(r) ?? [];

  const socketCircuit = (floor: string, desc: string, afdd: boolean): DesignedCircuit => ({
    ref: nextRef('S'),
    kind: 'ring',
    description: desc,
    device: `32 A Type B ${afdd ? 'AFDD/RCBO' : 'RCBO'} 30 mA`,
    cable: '2.5/1.5 mm² T&E (minimum — size to installation method, OSG 7.1)',
    points: 0,
    areaM2: 0,
    floor,
    rooms: [],
    rcd: true,
    afdd,
    notes: afddRequired
      ? ['AFDD required on this circuit (Reg 421.1.7, A4:2026)']
      : ['AFDD recommended (Reg 421.1.7, A4:2026)'],
    source: 'OSG Table H2.1 (A1 ring ≤ 100 m²) · Reg 411.3.3 · Reg 421.1.7',
  });

  for (const floor of floors) {
    const rooms = walkOrder(allRooms.filter((r) => r.floor === floor));

    // ── Sockets ────────────────────────────────────────────────────────────
    const wetLoad = (r: RoomFacts) =>
      !NOT_A_KITCHEN.test(r.name) &&
      (r.kind === 'kitchen' || r.kind === 'laundry' || /kitchen|laundry|utility/i.test(r.name));
    let ring: DesignedCircuit | null = null;
    for (const room of rooms) {
      const sockets = symbolsIn(room, 'socket');
      if (!sockets.length) continue;
      if (wetLoad(room)) {
        // Appliance loads on their own circuit (OSG H1.1 / 433.1.204).
        const c = socketCircuit(floor, `Sockets — ${room.name} (appliances)`, afddRequired);
        c.notes.push('Own circuit for appliance loads (OSG H1.1 / Reg 433.1.204)');
        c.points = sockets.length;
        c.areaM2 = room.areaM2;
        c.rooms = [room.name];
        sockets.forEach((s) => refs.set(s.id, c.ref));
        circuits.push(c);
        continue;
      }
      // A hall, classroom or open-plan floor over 100 m² on its own: its
      // sockets shared across enough rings that each serves ≤ 100 m² of it
      // (OSG H2.1), grouped along the room's long side. A 720 m² hall on one
      // ring was the result before.
      if (room.areaM2 > RING_MAX_M2) {
        const k = Math.min(sockets.length, Math.ceil(room.areaM2 / RING_MAX_M2));
        const xs = sockets.map((s) => s.x);
        const ys = sockets.map((s) => s.y);
        const alongX = Math.max(...xs) - Math.min(...xs) >= Math.max(...ys) - Math.min(...ys);
        const sorted = [...sockets].sort((a, b) => (alongX ? a.x - b.x : a.y - b.y));
        for (let g = 0; g < k; g++) {
          const part = sorted.slice(
            Math.round((g * sorted.length) / k),
            Math.round(((g + 1) * sorted.length) / k)
          );
          const c = socketCircuit(floor, onFloor('Sockets', floor), afddRequired);
          c.points = part.length;
          c.areaM2 = Math.round((room.areaM2 / k) * 10) / 10;
          c.rooms = [room.name];
          part.forEach((s) => refs.set(s.id, c.ref));
          circuits.push(c);
        }
        ring = null;
        continue;
      }
      if (!ring || (ring.areaM2 ?? 0) + room.areaM2 > RING_MAX_M2) {
        ring = socketCircuit(floor, onFloor('Sockets', floor), afddRequired);
        circuits.push(ring);
      }
      ring.points += sockets.length;
      ring.areaM2 = Math.round(((ring.areaM2 ?? 0) + room.areaM2) * 10) / 10;
      ring.rooms.push(room.name);
      sockets.forEach((s) => refs.set(s.id, ring!.ref));
    }

    // ── Fixed appliances and space heating ────────────────────────────────
    // A floor with three or more heaters is a heating installation: its own
    // circuit (OSG H5). Otherwise heaters are fused spurs like a towel rail.
    const floorHeaters = rooms.flatMap((r) => symbolsIn(r, 'heater'));
    const heatingCircuit: DesignedCircuit | null =
      floorHeaters.length >= 3
        ? {
            ref: nextRef('H'),
            kind: 'heating',
            description: onFloor('Heating', floor),
            device: 'Size to heater load — radial, RCBO 30 mA',
            cable: 'Size to load and length',
            points: 0,
            floor,
            rooms: [],
            rcd: true,
            afdd: false,
            notes: ['Space heating installation on its own circuit (OSG H5)'],
            source: 'OSG H5 · OSG H2.5 · Reg 522.6.202',
          }
        : null;
    if (heatingCircuit) circuits.push(heatingCircuit);
    for (const room of rooms) {
      const heaters = symbolsIn(room, 'heater');
      if (heatingCircuit) {
        heaters.forEach((h) => refs.set(h.id, heatingCircuit.ref));
        if (heaters.length) {
          heatingCircuit.points += heaters.length;
          heatingCircuit.rooms.push(room.name);
        }
      }
      const spurs = [...symbolsIn(room, 'spur'), ...(heatingCircuit ? [] : heaters)];
      if (!spurs.length) continue;
      // The ring already serving this room, else the floor's latest ring.
      const roomSocket = symbolsIn(room, 'socket').find((x) => refs.has(x.id));
      // Not a kitchen's own appliance circuit — that is for the kitchen.
      const floorRings = circuits.filter(
        (c) => c.kind === 'ring' && c.floor === floor && !c.description.endsWith('(appliances)')
      );
      const target =
        (roomSocket && circuits.find((c) => c.ref === refs.get(roomSocket.id))) ??
        floorRings[floorRings.length - 1] ??
        (() => {
          const c = socketCircuit(floor, onFloor('Sockets', floor), afddRequired);
          circuits.push(c);
          return c;
        })();
      spurs.forEach((x) => refs.set(x.id, target.ref));
      target.points += spurs.length;
      // A room with only a towel rail or boiler spur is not floor area the
      // ring's sockets serve (OSG Table H2.1 is about socket-outlets), so its
      // area is not added — adding it built rings over 100 m² and then flagged them.
      if (!target.rooms.includes(room.name)) target.rooms.push(room.name);
      if (!target.notes.some((n) => n.startsWith('Fixed appliances'))) {
        target.notes.push('Fixed appliances via fused connection units ≤ 13 A (OSG H2.4, H2.5)');
      }
    }

    // ── Lighting ───────────────────────────────────────────────────────────
    // Split a floor's lights evenly: 12 points is two circuits of 6, not 11 + 1.
    const floorLights = rooms.reduce((n, r) => n + symbolsIn(r, 'light').length, 0);
    const lightingCap = Math.ceil(
      floorLights / Math.max(1, Math.ceil(floorLights / LIGHTING_MAX_POINTS))
    );
    let lighting: DesignedCircuit | null = null;
    for (const room of rooms) {
      const lights = symbolsIn(room, 'light');
      const accessories = symbolsIn(room, 'lighting-accessory');
      if (!lights.length && !accessories.length) continue;
      for (const light of lights) {
        if (!lighting || lighting.points >= lightingCap) {
          lighting = {
            ref: nextRef('L'),
            kind: 'lighting',
            description: onFloor('Lighting', floor),
            device: '6 A Type B RCBO 30 mA',
            cable: '1.5/1.0 mm² T&E',
            points: 0,
            floor,
            rooms: [],
            // Dwellings: 411.3.4. Elsewhere: cables concealed at < 50 mm (522.6.202).
            rcd: true,
            afdd: false,
            notes: [`≤ ${LIGHTING_MAX_POINTS} points: 5 A design load at ≥ 100 W per point`],
            source: `OSG Table 7.1 (6 A lighting, 5 A load) · OSG Table A1 · Reg ${prem === 'dwelling' ? '411.3.4' : '522.6.202'}`,
          };
          circuits.push(lighting);
        }
        lighting.points++;
        if (!lighting.rooms.includes(room.name)) lighting.rooms.push(room.name);
        refs.set(light.id, lighting.ref);
      }
      // Switches, fan isolators and shaver units go with the room's lighting.
      const roomRef = lights.length ? refs.get(lights[0].id) : lighting?.ref;
      if (roomRef) accessories.forEach((a) => refs.set(a.id, roomRef));
    }
    // A room with switches or a shaver point but no light, walked before any
    // lit room, had nothing to join: put it on the floor's first lighting circuit.
    const firstLighting = circuits.find((c) => c.kind === 'lighting' && c.floor === floor);
    if (firstLighting) {
      for (const room of rooms) {
        symbolsIn(room, 'lighting-accessory')
          .filter((a) => !refs.has(a.id))
          .forEach((a) => {
            refs.set(a.id, firstLighting.ref);
            if (!firstLighting.rooms.includes(room.name)) firstLighting.rooms.push(room.name);
          });
      }
    }

    // ── Dedicated ──────────────────────────────────────────────────────────
    for (const room of rooms) {
      symbolsIn(room, 'cooker').forEach((s) => {
        const c: DesignedCircuit = {
          ref: nextRef('C'),
          kind: 'cooker',
          description: `Cooker — ${room.name}`,
          device: '32 A Type B typical — size to the cooker',
          cable: '6/2.5 mm² T&E typical — size to demand',
          points: 1,
          floor,
          rooms: [room.name],
          // Concealed in a wall at < 50 mm, as nearly every domestic run is.
          rcd: true,
          afdd: false,
          notes: ['Demand: first 10 A + 30% of remainder (+5 A if socket in control unit)'],
          source: 'OSG Table A1 (household cooking appliance) · Reg 522.6.202',
        };
        refs.set(s.id, c.ref);
        circuits.push(c);
      });
      symbolsIn(room, 'water-heater').forEach((s) => {
        const c: DesignedCircuit = {
          ref: nextRef('IH'),
          kind: 'water-heater',
          description: `Water heater — ${room.name}`,
          device: '16 A Type B typical (3 kW)',
          cable: '2.5 mm² T&E typical (3 kW)',
          points: 1,
          floor,
          rooms: [room.name],
          rcd: true,
          afdd: false,
          notes: [
            'Own circuit for a vessel over 15 litres; switched cord-outlet connection unit (OSG H5) — confirm vessel size',
          ],
          source: 'OSG H5 · Reg 522.6.202',
        };
        refs.set(s.id, c.ref);
        circuits.push(c);
      });
      symbolsIn(room, 'ac').forEach((s) => {
        const c: DesignedCircuit = {
          ref: nextRef('AC'),
          kind: 'ac',
          description: `Air conditioning — ${room.name}`,
          device: "Per the manufacturer's installation data",
          cable: "Per the manufacturer's installation data",
          points: 1,
          floor,
          rooms: [room.name],
          rcd: true,
          afdd: false,
          notes: ["Confirm device type and rating against the manufacturer's data"],
          source: 'Manufacturer’s instructions · Reg 522.6.202',
        };
        refs.set(s.id, c.ref);
        circuits.push(c);
      });
      // Heater switches and isolators follow the appliance in their room.
      const controls = symbolsIn(room, 'control');
      if (controls.length) {
        const load = [
          ...symbolsIn(room, 'water-heater'),
          ...symbolsIn(room, 'heater'),
          ...symbolsIn(room, 'ac'),
          ...symbolsIn(room, 'spur'),
          ...symbolsIn(room, 'light'),
        ].find((x) => refs.has(x.id));
        if (load) controls.forEach((x) => refs.set(x.id, refs.get(load.id)!));
      }
      symbolsIn(room, 'ev').forEach((s) => {
        const c: DesignedCircuit = {
          ref: nextRef('EV'),
          kind: 'ev',
          description: `EV charge point — ${room.name}`,
          device: '32 A — RCD type per Section 722',
          cable: 'Size to length and method (6 mm² or larger typical)',
          points: 1,
          floor,
          rooms: [room.name],
          rcd: true,
          afdd: false,
          notes: ['Dedicated circuit; check earthing arrangement per Section 722'],
          source: 'BS 7671 Section 722',
        };
        refs.set(s.id, c.ref);
        circuits.push(c);
      });
    }
  }

  // ── Fire detection ────────────────────────────────────────────────────────
  const fireSymbols = symbols.filter((s) => s.symbolId && role(s.symbolId) === 'fire');
  // A house is not a BS 5839-1 system: that part covers premises other than
  // domestic ones and points dwellings to BS 5839-6 — interlinked mains
  // alarms, no panel, no zones. We do not hold BS 5839-6, so the supply
  // arrangement is flagged to confirm rather than stated.
  if (fireSymbols.length && !panelSystem) {
    const alarmRooms = [
      ...new Set(fireSymbols.map((s) => roomOf(s.id)?.name).filter(Boolean) as string[]),
    ];
    circuits.push({
      ref: 'SA1',
      kind: 'smoke-alarms',
      description: 'Smoke and heat alarms (interlinked)',
      device: 'Supply arrangement to BS 5839-6 — confirm',
      cable: 'Per BS 5839-6 and the alarm maker’s instructions',
      points: fireSymbols.length,
      floor: '',
      rooms: alarmRooms,
      rcd: false,
      afdd: false,
      notes: [alarmNote],
      source: 'BS 5839-6 (BS 5839-1:2025 scope excludes domestic premises)',
    });
    fireSymbols.forEach((s) => refs.set(s.id, 'SA1'));
  } else if (fireSymbols.length) {
    const perStorey = totalArea > FIRE_STOREY_RULE_M2;
    const groups = perStorey ? floors : [''];
    for (const floor of groups) {
      const inGroup = fireSymbols.filter((s) => !perStorey || roomOf(s.id)?.floor === floor);
      if (!inGroup.length) continue;
      const zoneRooms = [
        ...new Set(inGroup.map((s) => roomOf(s.id)).filter(Boolean) as RoomFacts[]),
      ];
      let zone: DesignedCircuit | null = null;
      for (const room of walkOrder(zoneRooms)) {
        if (!zone || (zone.areaM2 ?? 0) + room.areaM2 > FIRE_ZONE_MAX_M2) {
          zone = {
            ref: nextRef('FZ'),
            kind: 'fire-zone',
            description: onFloor('Fire detection zone', floor),
            device: 'Fire alarm panel zone',
            cable: 'Fire-resisting cable (BS 5839-1)',
            points: 0,
            areaM2: 0,
            floor,
            rooms: [],
            rcd: false,
            afdd: false,
            notes: [
              perStorey
                ? 'One storey per zone (building > 300 m²)'
                : 'Building ≤ 300 m²: one zone may span storeys',
            ],
            source: 'BS 5839-1:2025 cl 12 (zone ≤ 2,000 m²; one storey above 300 m²)',
          };
          circuits.push(zone);
        }
        const here = inGroup.filter((s) => roomOf(s.id) === room);
        zone.points += here.length;
        zone.areaM2 = Math.round(((zone.areaM2 ?? 0) + room.areaM2) * 10) / 10;
        zone.rooms.push(room.name);
        here.forEach((s) => refs.set(s.id, zone!.ref));
      }
    }
    circuits.push({
      ref: 'FA1',
      kind: 'fire-supply',
      description: 'Fire alarm panel supply',
      device: 'Dedicated way — switch labelled "FIRE ALARM. DO NOT SWITCH OFF"',
      cable: 'Fire-resisting cable to panel',
      points: 0,
      floor: '',
      rooms: [],
      rcd: false,
      afdd: false,
      notes: ['Dedicated circuit from the first distribution board'],
      source: 'BS 5839-1:2025 cl 24.1',
    });
  }

  return { refs, circuits, premises: prem };
}

// ── Colours, shared by the canvas tags and the circuit panel ────────────────

const FAMILY: Record<string, string[]> = {
  L: ['#1D4ED8', '#2563EB', '#3B82F6', '#1E40AF', '#60A5FA', '#1E3A8A'],
  S: ['#B91C1C', '#DC2626', '#EF4444', '#991B1B', '#F87171', '#7F1D1D'],
  C: ['#B45309'],
  H: ['#C2410C', '#EA580C'],
  EV: ['#047857'],
  FZ: ['#BE185D', '#DB2777', '#9D174D'],
  SA: ['#BE185D'],
  FA: ['#BE185D'],
  IH: ['#6D28D9'],
  AC: ['#0E7490'],
};

/** A circuit's colour from its family (L, S, C, EV, FZ…) and number. */
export function circuitColour(ref: string): string {
  // "S1", or a sheet-qualified "S1 · 2" / "S1 · hand-drawn" on an export.
  const m = /^([A-Z]+)(\d+)/.exec(ref);
  if (!m) return '#374151';
  const family = FAMILY[m[1]];
  if (!family) return '#374151';
  const n = Number(m[2]) - 1;
  return family[((n % family.length) + family.length) % family.length];
}

/** A readable name from a ref, for circuits the schedule has no description for. */
export function circuitName(ref: string): string {
  const m = /^([A-Z]+)(\d+)$/.exec(ref);
  const n = m?.[2] ?? '';
  switch (m?.[1]) {
    case 'L':
      return `Lighting ${n}`;
    case 'S':
      return `Sockets ${n}`;
    case 'C':
      return `Cooker ${n}`;
    case 'EV':
      return `EV charger ${n}`;
    case 'FZ':
      return `Fire zone ${n}`;
    case 'SA':
      return 'Smoke and heat alarms';
    case 'FA':
      return 'Fire alarm supply';
    case 'IH':
      return 'Water heater';
    case 'H':
      return `Heating ${n}`;
    case 'AC':
      return 'A/C';
    default:
      return ref;
  }
}

// ── Rebuilding the schedule from the drawing ────────────────────────────────

const BOARD_ORDER = ['DB', 'C', 'EV', 'IH', 'H', 'AC', 'S', 'L', 'SA', 'FA', 'FZ'];
/** Board order — heavy dedicated loads first, fire last — shared by every list of circuits. */
export function circuitRank(ref: string): number {
  // "S1", or "S1 · 2" for sheet 2's S1 when several sheets are exported.
  // "S1 · hand-drawn" for a hand-drawn sheet's S1 beside designed ones.
  const m = /^([A-Z]+)(\d*)(?: · (\d+|hand-drawn))?$/.exec(ref);
  const i = BOARD_ORDER.indexOf(m?.[1] ?? '');
  const sheet = m?.[3] === 'hand-drawn' ? 999 : Number(m?.[3] || 0);
  return (i < 0 ? BOARD_ORDER.length : i) * 1e6 + sheet * 1000 + Number(m?.[2] || 0);
}

/** The room facts a designed symbol carries (set by the plan reader). */
export function roomFactsOf(o: CanvasObject): RoomFacts | undefined {
  if (!o.roomName) return undefined;
  return {
    name: o.roomName,
    floor: o.floor ?? '',
    areaM2: o.roomArea ?? 0,
    kind: o.roomKind,
    cx: 0,
    cy: 0,
  };
}

/**
 * Which room a symbol belongs to. By the room's own key where the plan reader
 * stamped one: keyed by name, eight rooms all labelled "BEDROOM" on a CAD
 * sheet collapsed into one, understating the ring's area and flipping the
 * AFDD requirement.
 */
function roomKeyOf(o: CanvasObject, f: RoomFacts): string {
  return o.roomKey ?? `${f.floor}|${f.name}`;
}

const KIND_OF_PREFIX: Record<string, CircuitKind> = {
  L: 'lighting',
  S: 'ring',
  C: 'cooker',
  EV: 'ev',
  FZ: 'fire-zone',
  H: 'heating',
  IH: 'water-heater',
  AC: 'ac',
  SA: 'smoke-alarms',
  // A sub-board's own way on the main board (29 Sep 2026).
  DB: 'submain',
  // The fire alarm panel's supply, where a hand-drawn plan carries it.
  FA: 'fire-supply',
};

/** The kind of circuit a ref names — "S3" a ring, "DB2" a submain. */
export const kindOfRef = (ref: string): CircuitKind | undefined =>
  KIND_OF_PREFIX[/^([A-Z]+)/.exec(ref)?.[1] ?? ''];

/**
 * The board schedule as the drawing stands now — grouped by each symbol's
 * CURRENT circuit, so moving a socket to another circuit by hand is reflected.
 * Device, cable and source follow the circuit's family.
 */
export function scheduleFromObjects(objects: CanvasObject[]): {
  circuits: DesignedCircuit[];
  premises: Premises;
} {
  const symbols = objects.filter((o) => o.type === 'symbol' && o.circuitRef);
  // Sockets on a ring, per room — to share a room's area between its rings.
  const ringSocketsInRoom = new Map<string, number>();
  symbols.forEach((o) => {
    const f = roomFactsOf(o);
    if (f && o.symbolId && role(o.symbolId) === 'socket' && /^S\d/.test(o.circuitRef!)) {
      const k = roomKeyOf(o, f);
      ringSocketsInRoom.set(k, (ringSocketsInRoom.get(k) ?? 0) + 1);
    }
  });
  const rooms = new Map<string, RoomFacts>();
  symbols.forEach((o) => {
    const f = roomFactsOf(o);
    if (f) rooms.set(roomKeyOf(o, f), f);
  });
  // The building type the electrician set wins; only unset is it inferred.
  const setType = stampedType(symbols);
  const premises = setType ? premisesOfType(setType) : inferPremises([...rooms.values()]);
  const afdd = premises === 'multi-occupancy';

  const byRef = new Map<string, CanvasObject[]>();
  symbols.forEach((o) => byRef.set(o.circuitRef!, [...(byRef.get(o.circuitRef!) ?? []), o]));

  const circuits: DesignedCircuit[] = [];
  byRef.forEach((items, ref) => {
    const prefix = /^([A-Z]+)/.exec(ref)?.[1] ?? '';
    // A hand-drawn plan puts its smoke and heat detectors on "FA1": that is
    // an alarm circuit, not a panel's supply way with nothing on it.
    const kind =
      prefix === 'FA' && items.some((o) => o.symbolId && role(o.symbolId) === 'fire')
        ? 'smoke-alarms'
        : KIND_OF_PREFIX[prefix];
    if (!kind) return;
    const roomSet = new Map<string, RoomFacts>();
    items.forEach((o) => {
      const f = roomFactsOf(o);
      if (f) roomSet.set(roomKeyOf(o, f), f);
    });
    const floorsHere = [...new Set([...roomSet.values()].map((r) => r.floor))];
    // A ring's area is the floor its SOCKETS serve (OSG Table H2.1): a room
    // reached only by a towel-rail or boiler spur is not counted.
    const areaRooms = new Map<string, RoomFacts>();
    items.forEach((o) => {
      const f = roomFactsOf(o);
      if (f && (kind !== 'ring' || (o.symbolId && role(o.symbolId) === 'socket')))
        areaRooms.set(roomKeyOf(o, f), f);
    });
    // A room whose sockets are shared between rings counts on each in
    // proportion to its sockets there — so a big hall split over three rings
    // is ~⅓ of its area on each, not all of it three times.
    const shareOf = (key: string) => {
      if (kind !== 'ring') return 1;
      const here = items.filter(
        (o) => o.symbolId && role(o.symbolId) === 'socket' && roomKeyOf(o, roomFactsOf(o)!) === key
      ).length;
      const all = ringSocketsInRoom.get(key) ?? here;
      return all ? here / all : 1;
    };
    const area =
      Math.round(
        [...areaRooms.entries()].reduce((a, [key, r]) => a + r.areaM2 * shareOf(key), 0) * 10
      ) / 10;
    const loadPoints =
      kind === 'lighting'
        ? items.filter((o) => o.symbolId && role(o.symbolId) === 'light').length
        : kind === 'ring'
          ? items.filter(
              (o) => o.symbolId && ['socket', 'spur', 'heater'].includes(role(o.symbolId))
            ).length
          : kind === 'heating'
            ? items.filter((o) => o.symbolId && role(o.symbolId) === 'heater').length
            : kind === 'fire-zone' || kind === 'smoke-alarms'
              ? items.filter((o) => o.symbolId && role(o.symbolId) === 'fire').length
              : 1;
    const where =
      floorsHere.length === 1 ? floorsHere[0] || '' : floorsHere.filter(Boolean).join(' + ');
    const base = {
      ref,
      kind,
      points: loadPoints,
      floor: floorsHere.join(', '),
      rooms: [...roomSet.values()].map((r) => r.name),
    };
    const notes: string[] = [];
    if (kind === 'ring') {
      if (area > RING_MAX_M2)
        notes.push(`Serves ${area} m² — over the 100 m² ring limit, split it (OSG Table H2.1)`);
      notes.push(
        afdd ? 'AFDD required (Reg 421.1.7, A4:2026)' : 'AFDD recommended (Reg 421.1.7, A4:2026)'
      );
      const appliances =
        base.rooms.length === 1 &&
        /kitchen|laundry|utility/i.test(base.rooms[0]) &&
        !NOT_A_KITCHEN.test(base.rooms[0]);
      if (appliances) notes.push('Own circuit for appliance loads (OSG H1.1 / Reg 433.1.204)');
      if (items.some((o) => o.symbolId && ['spur', 'heater'].includes(role(o.symbolId)))) {
        notes.push('Fixed appliances via fused connection units ≤ 13 A (OSG H2.4, H2.5)');
      }
      circuits.push({
        ...base,
        description: appliances
          ? `Sockets — ${base.rooms[0]} (appliances)`
          : onFloor('Sockets', where),
        device: `32 A Type B ${afdd ? 'AFDD/RCBO' : 'RCBO'} 30 mA`,
        cable: '2.5/1.5 mm² T&E (minimum)',
        areaM2: area,
        rcd: true,
        afdd,
        notes,
        source: 'OSG Table H2.1 · Reg 411.3.3 · Reg 421.1.7',
      });
    } else if (kind === 'lighting') {
      if (loadPoints > LIGHTING_MAX_POINTS)
        notes.push(
          `${loadPoints} points — over ${LIGHTING_MAX_POINTS} for a 6 A circuit at ≥ 100 W each`
        );
      circuits.push({
        ...base,
        description: onFloor('Lighting', where),
        device: '6 A Type B RCBO 30 mA',
        cable: '1.5/1.0 mm² T&E',
        rcd: true,
        afdd: false,
        notes,
        source: `OSG Table 7.1 · OSG Table A1 · Reg ${premises === 'dwelling' ? '411.3.4' : '522.6.202'}`,
      });
    } else if (kind === 'cooker') {
      circuits.push({
        ...base,
        description: onFloor('Cooker', base.rooms.join(', ') || where),
        device: '32 A Type B typical — size to the cooker',
        cable: '6/2.5 mm² T&E typical — size to demand',
        rcd: true,
        afdd: false,
        notes: ['Demand: first 10 A + 30% of remainder (+5 A with socket)'],
        source: 'OSG Table A1 · Reg 522.6.202',
      });
    } else if (kind === 'ev') {
      circuits.push({
        ...base,
        description: onFloor('EV charge point', base.rooms.join(', ') || where),
        device: '32 A — RCD type per Section 722',
        cable: 'Size to length and method',
        rcd: true,
        afdd: false,
        notes: [],
        source: 'BS 7671 Section 722',
      });
    } else if (kind === 'heating') {
      circuits.push({
        ...base,
        description: onFloor('Heating', where),
        device: 'Size to heater load — radial, RCBO 30 mA',
        cable: 'Size to load and length',
        rcd: true,
        afdd: false,
        notes: ['Space heating installation on its own circuit (OSG H5)'],
        source: 'OSG H5 · OSG H2.5 · Reg 522.6.202',
      });
    } else if (kind === 'water-heater') {
      circuits.push({
        ...base,
        description: onFloor('Water heater', base.rooms.join(', ') || where),
        device: '16 A Type B typical (3 kW)',
        cable: '2.5 mm² T&E typical (3 kW)',
        rcd: true,
        afdd: false,
        notes: [
          'Own circuit for a vessel over 15 litres; switched cord-outlet connection unit (OSG H5) — confirm vessel size',
        ],
        source: 'OSG H5 · Reg 522.6.202',
      });
    } else if (kind === 'ac') {
      circuits.push({
        ...base,
        description: onFloor('Air conditioning', base.rooms.join(', ') || where),
        device: "Per the manufacturer's installation data",
        cable: "Per the manufacturer's installation data",
        rcd: true,
        afdd: false,
        notes: ["Confirm device type and rating against the manufacturer's data"],
        source: 'Manufacturer’s instructions · Reg 522.6.202',
      });
    } else if (kind === 'smoke-alarms') {
      circuits.push({
        ...base,
        description: 'Smoke and heat alarms (interlinked)',
        device: 'Supply arrangement to BS 5839-6 — confirm',
        cable: 'Per BS 5839-6 and the alarm maker’s instructions',
        rcd: false,
        afdd: false,
        notes: [smokeAlarmNote(setType)],
        source: 'BS 5839-6 (BS 5839-1:2025 scope excludes domestic premises)',
      });
    } else if (kind === 'submain') {
      circuits.push({
        ...base,
        points: 0,
        description: `Submain to ${ref}${base.rooms[0] ? ` — ${base.rooms[0]}` : ''}`,
        device: 'Size to the sub-board’s design load — confirm',
        cable: 'Size to load, length and installation method — confirm',
        rcd: false,
        afdd: false,
        notes: [
          `Voltage drop counts from the origin: the submain's drop adds to every circuit on ${ref} — confirm (Reg 525.202, Appendix 4 section 6.4)`,
        ],
        source: 'Reg 525.202 · Appendix 4',
      });
    } else if (kind === 'fire-supply') {
      circuits.push({
        ...base,
        points: 0,
        description: 'Fire alarm panel supply',
        device: 'Dedicated way — "FIRE ALARM. DO NOT SWITCH OFF"',
        cable: 'Fire-resisting cable to panel',
        rcd: false,
        afdd: false,
        notes: ['Dedicated circuit from the first distribution board'],
        source: 'BS 5839-1:2025 cl 24.1',
      });
    } else if (kind === 'fire-zone') {
      circuits.push({
        ...base,
        description: onFloor('Fire detection zone', where),
        device: 'Fire alarm panel zone',
        cable: 'Fire-resisting cable (BS 5839-1)',
        areaM2: area,
        rcd: false,
        afdd: false,
        notes: area > FIRE_ZONE_MAX_M2 ? ['Over 2,000 m² — split the zone'] : [],
        source: 'BS 5839-1:2025 cl 12',
      });
    }
  });
  // The electrician's amendments from the board schedule: a way moved, or a
  // circuit's description, device, rating or cable changed. Kept on its
  // fittings, so they travel with the drawing.
  circuits.forEach((c, i) => {
    const items = byRef.get(c.ref) ?? [];
    const pins = items.map((o) => o.wayPin).filter((v): v is number => typeof v === 'number');
    const edit = items.find((o) => o.circuitEdit)?.circuitEdit;
    let next = pins.length ? { ...c, pin: Math.min(...pins) } : c;
    if (edit) next = applyCircuitEdit(next, edit);
    circuits[i] = next;
  });
  if (
    circuits.some((c) => c.kind === 'fire-zone') &&
    !circuits.some((c) => c.kind === 'fire-supply')
  ) {
    circuits.push({
      ref: 'FA1',
      kind: 'fire-supply',
      description: 'Fire alarm panel supply',
      device: 'Dedicated way — "FIRE ALARM. DO NOT SWITCH OFF"',
      cable: 'Fire-resisting cable to panel',
      points: 0,
      floor: '',
      rooms: [],
      rcd: false,
      afdd: false,
      notes: ['Dedicated circuit from the first distribution board'],
      source: 'BS 5839-1:2025 cl 24.1',
    });
  }
  circuits.sort((a, b) => circuitRank(a.ref) - circuitRank(b.ref));
  return { circuits: withLengths(circuits, objects), premises };
}

/** Connected load per point, matching the defaults in circuit-assignment.ts. */
const LOAD_W: Record<CircuitKind, (points: number) => number> = {
  lighting: (n) => n * 100,
  ring: (n) => n * 230,
  radial: (n) => n * 230,
  cooker: () => 8000,
  ev: () => 7400,
  'fire-zone': (n) => n * 5,
  'fire-supply': () => 0,
  'water-heater': () => 3000,
  heating: (n) => n * 2000,
  ac: () => 2500,
  'smoke-alarms': (n) => n * 5,
  submain: () => 0,
};
/**
 * A circuit with the electrician's amendments applied. The device text is
 * rebuilt in the design's own form ("32 A Type B RCBO 30 mA") so everything
 * that reads it — board shorthand, single-line, PDF, certificate — agrees.
 */
export function applyCircuitEdit(
  c: DesignedCircuit,
  edit: NonNullable<CanvasObject['circuitEdit']>
): DesignedCircuit {
  const out: DesignedCircuit = { ...c, notes: [...c.notes, 'Amended on the board schedule'] };
  if (edit.description?.trim()) out.description = edit.description.trim();
  // A submain feeds a board: an MCB with no 30 mA RCD of its own (the
  // circuits beyond carry theirs), run in SWA — not a final circuit's T&E.
  const sub = c.kind === 'submain';
  if (edit.device || edit.rating) {
    const device = sub
      ? 'MCB'
      : (edit.device ??
        (/AFDD/.test(c.device) ? 'AFDD/RCBO' : /RCBO/.test(c.device) ? 'RCBO' : 'MCB'));
    const fromEdit = /^([BCD])(\d+)$/.exec(edit.rating ?? '');
    const fromDesign = /(\d+)\s*A\s*Type\s*([BCD])/.exec(c.device);
    const curve = fromEdit?.[1] ?? fromDesign?.[2] ?? '';
    const amps = fromEdit?.[2] ?? fromDesign?.[1] ?? '';
    const rcd = device !== 'MCB';
    out.device = `${amps ? `${amps} A Type ${curve} ` : ''}${device}${rcd ? ' 30 mA' : ''}`;
    out.rcd = rcd;
    out.afdd = device === 'AFDD/RCBO';
    // Not the device the design's length row was read for.
    out.edited = true;
  }
  if (edit.cable) {
    out.cable = sub ? `${edit.cable} mm² SWA` : `${edit.cable} mm² T&E`;
    out.edited = true;
  }
  return out;
}

/** Connected load of a circuit, in watts (before diversity). */
export const connectedLoadW = (c: DesignedCircuit) => LOAD_W[c.kind](c.points);
const watts = (w: number) => (w >= 1000 ? `${(w / 1000).toFixed(1)}kW` : `${Math.round(w)}W`);

/**
 * The designed circuits in the shape the export sheet and PDF take, so the
 * issued circuit and board schedules carry the design rather than the old
 * "all lights on L1, all sockets on S1" defaults.
 */
export function toScheduleEntries(
  circuits: DesignedCircuit[],
  /** Board numbering (boardWays.wayMap): the circuit number printed for each. */
  ways?: Map<string, { full: string }>
): CircuitScheduleEntry[] {
  return circuits.map((c) => {
    const warnings = c.notes.filter((n) => /over|split|confirm/i.test(n));
    // Every warning goes on the issued schedule: the length note used to
    // replace the others, so an over-area ring lost its area warning.
    const lengthNote =
      c.length && (c.length.ok === false || /^TT supply/.test(c.length.note))
        ? [c.length.note]
        : [];
    return {
      circuitRef: c.ref,
      wayLabel: ways?.get(c.ref)?.full,
      circuitKind: c.kind,
      runLengthM: c.length?.lengthM,
      maxLengthM: c.length?.maxM,
      lengthOk: c.length?.ok,
      // The rooms it serves, so four "Lighting — Ground floor" rows can be
      // told apart: all of them up to four, then the first three and a count.
      circuitName:
        c.rooms.length && !c.rooms.some((r) => c.description.includes(r))
          ? `${c.description} (${
              c.rooms.length <= 4
                ? c.rooms.join(', ')
                : `${c.rooms.slice(0, 3).join(', ')} +${c.rooms.length - 3} more`
            })`
          : c.description,
      cableSize: c.cable,
      protection: c.device,
      // A submain's device is the designer's call — not "not required".
      rcd:
        c.kind === 'submain'
          ? 'Per design'
          : c.rcd
            ? c.kind === 'ev'
              ? '30 mA Type B / Type A + RDC-DD'
              : '30 mA RCD'
            : 'Not required',
      rcdBasis: c.kind === 'submain' ? undefined : c.source,
      points: c.points,
      // A submain carries its sub-board's connected load.
      typicalLoad: watts(
        c.kind === 'submain'
          ? circuits
              .filter((x) => x.board === c.ref)
              .reduce((a, x) => a + LOAD_W[x.kind](x.points), 0)
          : LOAD_W[c.kind](c.points)
      ),
      fedFrom: c.board,
      needsReview:
        [
          ...lengthNote,
          ...(c.kind === 'ev'
            ? [
                'Type B (BS EN 62423), or Type A with an RDC-DD (BS IEC 62955) where the charge point provides DC fault detection — confirm against the manufacturer’s instructions',
              ]
            : warnings),
        ].join('. ') || undefined,
    };
  });
}

/** True when the drawing's circuits came from the plan reader's design. */
export const isDesigned = (objects: CanvasObject[]) =>
  objects.some((o) => o.type === 'symbol' && !!o.roomName && !!o.circuitRef);

// ── Items added by hand to a designed drawing ───────────────────────────────

/** Which circuits an item of each role may join. */
const JOINS: Partial<Record<Role, RegExp>> = {
  light: /^L\d+$/,
  'lighting-accessory': /^L\d+$/,
  control: /^(L|S|H|IH|AC)\d+$/,
  socket: /^S\d+$/,
  spur: /^S\d+$/,
  heater: /^(H|S)\d+$/,
  fire: /^(FZ|SA)\d+$/,
};
/** The circuit a role starts when nothing of its kind is on the drawing yet. */
const FIRST_PREFIX: Partial<Record<Role, string>> = {
  light: 'L',
  socket: 'S',
  spur: 'S',
  heater: 'S',
  fire: 'FZ',
};
/** Roles that always get a circuit of their own. */
const OWN_PREFIX: Partial<Record<Role, string>> = {
  cooker: 'C',
  ev: 'EV',
  'water-heater': 'IH',
  ac: 'AC',
};

/**
 * In a drawing the plan reader designed, a socket placed by hand used to land
 * on "S1" whatever floor it was on. Instead it joins the circuit of the
 * nearest item of the same kind, and takes that room's facts from the nearest
 * designed item, so the schedule stays true. Dedicated loads get the next
 * free ref of their own.
 */
export function circuitForNewSymbol(
  o: CanvasObject,
  objects: CanvasObject[]
): Pick<CanvasObject, 'circuitRef' | 'roomName' | 'floor' | 'roomArea' | 'roomKey'> | undefined {
  if (!o.symbolId) return undefined;
  // A second board added by hand is a sub-board, with its own way (DB2…) on
  // the main board. The first board on a drawing is the main one: no way.
  const boardId = (x: CanvasObject) =>
    x.type === 'symbol' && (x.symbolId === 'consumer-unit' || x.symbolId === 'distribution-board');
  if (boardId(o)) {
    // The main board is the earliest one without a way of its own.
    const main = objects.find((x) => boardId(x) && !x.circuitRef);
    if (!main || main.id === o.id) return undefined;
    const used = objects
      .map((x) => /^DB(\d+)$/.exec(x.circuitRef ?? '')?.[1])
      .filter(Boolean)
      .map(Number);
    return { circuitRef: `DB${Math.max(1, ...used) + 1}` };
  }
  const r = role(o.symbolId);
  if (r === 'none') return undefined;
  const dist = (a: CanvasObject) => Math.hypot(a.x - o.x, a.y - o.y);
  const others = objects.filter((x) => x.id !== o.id && x.type === 'symbol');
  const nearest = (pred: (x: CanvasObject) => boolean) =>
    others
      .filter(pred)
      .reduce<CanvasObject | undefined>((m, x) => (!m || dist(x) < dist(m) ? x : m), undefined);

  const home = nearest((x) => !!x.roomName);
  const facts = home
    ? { roomName: home.roomName, floor: home.floor, roomArea: home.roomArea, roomKey: home.roomKey }
    : {};

  const nextOf = (prefix: string) => {
    const used = others
      .map((x) => new RegExp(`^${prefix}(\\d+)$`).exec(x.circuitRef ?? '')?.[1])
      .filter(Boolean)
      .map(Number);
    return `${prefix}${Math.max(0, ...used) + 1}`;
  };
  const own = OWN_PREFIX[r];
  if (own) return { circuitRef: nextOf(own), ...facts };
  const joins = JOINS[r];
  const peer = joins && nearest((x) => joins.test(x.circuitRef ?? ''));
  if (peer?.circuitRef) return { circuitRef: peer.circuitRef, ...facts };
  // The first of its kind on this drawing starts a circuit of its own.
  // The first detector on a drawing: a house gets domestic alarms, anything
  // with many bedrooms a panel zone.
  // One entry per ROOM: per symbol, every fitting in a bedroom counted as
  // another bedroom, and a three-bed house got a panel zone.
  const roomsHere = new Map<string, RoomFacts>();
  others.forEach((x) => {
    const f = roomFactsOf(x);
    if (f) roomsHere.set(roomKeyOf(x, f), f);
  });
  const first =
    r === 'fire'
      ? isPanelSystem([...roomsHere.values()], stampedType(others))
        ? 'FZ'
        : 'SA'
      : FIRST_PREFIX[r];
  return first ? { circuitRef: nextOf(first), ...facts } : undefined;
}

/**
 * Give every unassigned item in a designed drawing its circuit, one at a time,
 * each seeing the ones before it. Resolving them all against the same array
 * gave two cookers added together the same "C2" — one dedicated circuit for two.
 */
export function assignNewSymbols(objects: CanvasObject[]): {
  objects: CanvasObject[];
  changed: boolean;
} {
  let changed = false;
  const out = [...objects];
  out.forEach((o, i) => {
    if (o.type !== 'symbol' || !o.symbolId || o.circuitRef) return;
    const next = circuitForNewSymbol(o, out);
    if (next) {
      out[i] = { ...o, ...next };
      changed = true;
    }
  });
  return { objects: changed ? out : objects, changed };
}

/**
 * The schedule for several saved rooms (sheets) at once. Each sheet's circuits
 * are designed on their own and numbered from S1/L1, so pooling every sheet's
 * items made sheet A's S1 and sheet B's S1 one ring (with a false "over
 * 100 m²" warning). Built per sheet; where a ref repeats across sheets it is
 * marked with the sheet number ("S1 · 2") so every board way is one circuit.
 */
export function scheduleForRooms(sheets: { name: string; objects: CanvasObject[] }[]): {
  circuits: DesignedCircuit[];
  premises: Premises;
} {
  const per = sheets.map((sh) => ({ sh, ...scheduleFromObjects(sh.objects) }));
  const seen = new Map<string, number>();
  per.forEach((p) => p.circuits.forEach((c) => seen.set(c.ref, (seen.get(c.ref) ?? 0) + 1)));
  const multi = per.filter((p) => p.circuits.length).length > 1;
  const circuits = per.flatMap((p, i) =>
    p.circuits.map((c) => {
      if (!multi) return c;
      // A sub-board repeated on several sheets is several boards: every
      // circuit on it takes the sheet's name for its board ("DB2 · 2"),
      // whether or not its own ref repeats — or one board got two way 1s.
      const board =
        c.board && c.board !== 'CU' && (seen.get(c.board) ?? 0) > 1
          ? { board: `${c.board} · ${i + 1}` }
          : {};
      return (seen.get(c.ref) ?? 0) > 1
        ? {
            ...c,
            ref: `${c.ref} · ${i + 1}`,
            description: `${c.description} (${p.sh.name})`,
            ...board,
          }
        : { ...c, ...board };
    })
  );
  // The stricter premises wins: one multi-occupancy sheet makes it one.
  const premises: Premises = per.some((p) => p.premises === 'multi-occupancy')
    ? 'multi-occupancy'
    : 'dwelling';
  circuits.sort((a, b) => circuitRank(a.ref) - circuitRank(b.ref));
  return { circuits, premises };
}

// ── Length against the On-Site Guide ─────────────────────────────────────────

/**
 * Rows of OSG Table 7.1(i) read unambiguously from the Guide, for the circuits
 * the designer draws (all RCD-protected, 30 mA). The same length applies under
 * TN-S (Ze ≤ 0.8 Ω) and TN-C-S (Ze ≤ 0.35 Ω) for these rows.
 */
const OSG_7_1: { match: (c: DesignedCircuit) => boolean; maxM: number; row: string }[] = [
  {
    match: (c) => c.kind === 'ring' && c.rcd,
    maxM: 106,
    row: '32 A Type B ring, 2.5/1.5 mm², 30 mA RCD',
  },
  {
    match: (c) => c.kind === 'lighting' && c.rcd,
    maxM: 106,
    row: '6 A Type B lighting, 1.5/1.0 mm², 30 mA RCD',
  },
];

export interface LengthCheck {
  lengthM: number;
  maxM?: number;
  ok?: boolean;
  note: string;
}

export function lengthCheck(c: DesignedCircuit, lengthM: number, earthing: Earthing): LengthCheck {
  // An amended device or cable is not the row the design was checked against.
  if (c.edited) {
    return { lengthM, note: 'Check the length against OSG Table 7.1(i) for this device and cable' };
  }
  if (c.kind === 'submain') {
    return {
      lengthM,
      note: 'Size the submain for this length — its voltage drop adds to every circuit it feeds (Reg 525.202)',
    };
  }
  const row = OSG_7_1.find((r) => r.match(c));
  if (!row) {
    return { lengthM, note: 'Check the length against OSG Table 7.1(i) for this device and cable' };
  }
  if (earthing === 'TT') {
    // OSG 7.1 applies on TT where RCDs are installed as OSG 3.6 describes; the
    // RAG holds no separate TT figure, so none is given. A run beyond the TN
    // figure is still flagged — silence on a 300 m ring helped no one.
    const over = lengthM > row.maxM;
    return {
      lengthM,
      ...(over ? { maxM: row.maxM, ok: false } : {}),
      note: over
        ? `TT supply: over the ${row.maxM} m TN figure for ${row.row} (OSG Table 7.1(i)) — split the circuit, or confirm the length against the table's conditions (RCDs per OSG 3.6)`
        : `TT supply: confirm against OSG Table 7.1(i) conditions (RCDs per OSG 3.6) — ${row.row} is ${row.maxM} m on TN systems`,
    };
  }
  const ok = lengthM <= row.maxM;
  return {
    lengthM,
    maxM: row.maxM,
    ok,
    note: ok
      ? `Within ${row.maxM} m — OSG Table 7.1(i), ${row.row}`
      : `Over ${row.maxM} m — split the circuit or increase the cable (OSG Table 7.1(i), ${row.row})`,
  };
}

/** Attach each circuit's drawn run length and its OSG check, where runs are drawn. */
function withLengths(circuits: DesignedCircuit[], objects: CanvasObject[]): DesignedCircuit[] {
  const runs = objects.filter((o) => o.generated && o.circuitRef);
  const boards = objects.filter(
    (o) =>
      o.type === 'symbol' && (o.symbolId === 'consumer-unit' || o.symbolId === 'distribution-board')
  ).length;
  // The board a circuit is fed from: its drawn run, else the stamp its items
  // kept from the last time runs were drawn — so hiding the runs doesn't
  // renumber the whole board back onto the CU.
  const itemBoard = new Map<string, Map<string, number>>();
  objects.forEach((o) => {
    if (o.type !== 'symbol' || !o.circuitRef || !o.fedFrom || o.generated) return;
    const m = itemBoard.get(o.circuitRef) ?? new Map<string, number>();
    m.set(o.fedFrom, (m.get(o.fedFrom) ?? 0) + 1);
    itemBoard.set(o.circuitRef, m);
  });
  const boardOf = (ref: string) => {
    if (boards < 2) return undefined;
    const run = runs.find((r) => r.circuitRef === ref)?.fedFrom;
    if (run) return run;
    const m = itemBoard.get(ref);
    return m ? [...m.entries()].sort((a, b) => b[1] - a[1])[0][0] : undefined;
  };
  const counts = new Map<Earthing, number>();
  objects.forEach((o) => o.earthing && counts.set(o.earthing, (counts.get(o.earthing) ?? 0) + 1));
  const earthing = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'TN-C-S';
  return circuits.map((c) => {
    const board = boardOf(c.ref);
    const withBoard = board ? { ...c, board } : c;
    // A run may be drawn in pieces, one per floor it reaches.
    const total = runs
      .filter((r) => r.circuitRef === c.ref)
      .reduce((a, r) => a + (r.lengthM ?? 0), 0);
    return total
      ? { ...withBoard, length: lengthCheck(c, Math.round(total * 10) / 10, earthing) }
      : withBoard;
  });
}
