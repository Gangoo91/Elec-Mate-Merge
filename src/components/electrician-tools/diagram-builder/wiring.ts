/**
 * Wiring the drawing up (29 Sep 2026).
 *
 * The circuit engine decides WHICH circuit each item is on. This turns that
 * into an installation: where the board is, the cable run for every circuit
 * (a ring from the board round its sockets and back; a radial chained out),
 * how long each run is, whether that length is within the On-Site Guide's
 * limit, and how much of each cable the job needs.
 *
 * Everything here is an estimate from the drawing and says so. The length
 * limits are only the rows read unambiguously from OSG Table 7.1(i); any
 * other circuit is marked "check", never given a number we can't stand behind.
 */
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { SCALE } from './constants';
import { extractWalls, orthogonalRoute, type Point } from './cableRouter';
import {
  designCircuits,
  scheduleFromObjects,
  type Earthing,
  type BuildingType,
  type DesignedCircuit,
  type RoomFacts,
} from './circuitDesign';

export type { Earthing } from './circuitDesign';
import { wayMap, type Supply, type Way } from './boardWays';
export { lengthCheck, type LengthCheck } from './circuitDesign';
export const EARTHING: { id: Earthing; label: string }[] = [
  { id: 'TN-C-S', label: 'TN-C-S (PME)' },
  { id: 'TN-S', label: 'TN-S' },
  { id: 'TT', label: 'TT' },
];

const isDesigned = (o: CanvasObject) => o.type === 'symbol' && !!o.roomKey;
const isBoard = (o: CanvasObject) =>
  o.type === 'symbol' && (o.symbolId === 'consumer-unit' || o.symbolId === 'distribution-board');

/** The plan's settings, read back from the items that carry them. */
export function planSettings(objects: CanvasObject[]): {
  buildingType?: BuildingType;
  earthing: Earthing;
  supply: Supply;
} {
  const pick = <T extends string>(values: (T | undefined)[]): T | undefined => {
    const counts = new Map<T, number>();
    values.forEach((v) => v && counts.set(v, (counts.get(v) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  };
  const designed = objects.filter(isDesigned);
  return {
    buildingType: pick(designed.map((o) => o.buildingType)),
    earthing: pick(designed.map((o) => o.earthing)) ?? 'TN-C-S',
    supply: pick(objects.map((o) => o.supply)) ?? 'single',
  };
}

/**
 * Design the circuits again from the drawing as it stands — for a building
 * type the electrician has set, or after rooms and items have moved. Every
 * designed item gets its new circuit; the settings are stamped on them so the
 * schedule reads them back. Drawn cable runs are redrawn to match.
 */
export function redesignCircuits(
  objects: CanvasObject[],
  settings: { buildingType?: BuildingType; earthing?: Earthing }
): CanvasObject[] {
  const items = objects.filter((o) => isDesigned(o) && !isBoard(o));
  const byRoom = new Map<string, CanvasObject[]>();
  items.forEach((o) => byRoom.set(o.roomKey!, [...(byRoom.get(o.roomKey!) ?? []), o]));
  const facts = new Map<string, RoomFacts>();
  byRoom.forEach((list, key) => {
    const f = list[0];
    facts.set(key, {
      name: f.roomName ?? 'Room',
      floor: f.floor ?? '',
      areaM2: f.roomArea ?? 0,
      cx: list.reduce((a, o) => a + o.x, 0) / list.length / SCALE,
      cy: list.reduce((a, o) => a + o.y, 0) / list.length / SCALE,
    });
  });
  // A map, not items.find: that made a redesign take seconds on a big plan.
  const byId = new Map(items.map((o) => [o.id, o]));
  const roomOf = (id: string) => {
    const o = byId.get(id);
    return o ? facts.get(o.roomKey!) : undefined;
  };
  const { refs } = designCircuits(items, roomOf, undefined, settings.buildingType);
  const hadRuns = objects.some((o) => o.generated);
  const next = objects
    .filter((o) => !o.generated)
    .map((o) =>
      isDesigned(o)
        ? {
            ...o,
            // A sub-board keeps its way; the main board has none.
            circuitRef: isBoard(o) ? o.circuitRef : refs.get(o.id),
            // New circuits: amendments made to the old ones no longer apply.
            wayPin: undefined,
            circuitEdit: undefined,
            buildingType: settings.buildingType ?? o.buildingType,
            earthing: settings.earthing ?? o.earthing,
          }
        : o
    );
  return hadRuns ? withRuns(next) : next;
}

// ── The board ────────────────────────────────────────────────────────────────

/** The main board: the first without a way of its own (a sub-board has "DB2"…). */
export const findBoard = (objects: CanvasObject[]) =>
  objects.find((o) => isBoard(o) && !o.circuitRef) ?? objects.find(isBoard);
/** Sub-boards, each fed by its own way on the main board. */
export const subBoards = (objects: CanvasObject[]) =>
  objects.filter((o) => isBoard(o) && /^DB\d+$/.test(o.circuitRef ?? ''));
/** "CU" for the main board, else its way ref. */
export const boardName = (b: CanvasObject) => b.circuitRef ?? 'CU';

const BOARD_ROOMS =
  /\b(hall|hallway|entrance|porch|utility|garage|cupboard|store|meter|landing)\b/i;

/**
 * Put a consumer unit on the plan where one usually goes — the hall, utility,
 * garage or a cupboard on the lowest floor — for the electrician to drag to
 * where it really is. Nothing is moved if the drawing already has a board.
 */
export function placeBoard(objects: CanvasObject[]): CanvasObject[] {
  if (findBoard(objects)) return objects;
  const items = objects.filter((o) => o.type === 'symbol');
  if (!items.length) return objects;
  const designed = items.filter(isDesigned);
  // A drawing set often has the existing plan beside the proposed one: wire
  // the proposed (or at least not the existing) ground floor.
  const floors = [...new Set(designed.map((o) => o.floor ?? ''))].sort(
    (a, b) => Number(/existing/i.test(a)) - Number(/existing/i.test(b))
  );
  const lowest =
    floors.find((f) => /ground|lower|basement/i.test(f)) ??
    floors.find((f) => f === '') ??
    floors[0];
  const onFloor = designed.filter((o) => (o.floor ?? '') === lowest);
  const room =
    onFloor.find((o) => BOARD_ROOMS.test(o.roomName ?? ''))?.roomKey ?? onFloor[0]?.roomKey;
  const inRoom = room ? designed.filter((o) => o.roomKey === room) : items;
  const x = Math.min(...inRoom.map((o) => o.x));
  const y = inRoom.reduce((a, o) => a + o.y, 0) / inRoom.length;
  const home = inRoom[0];
  const board: CanvasObject = {
    id: `board-${Date.now()}`,
    type: 'symbol',
    symbolId: 'consumer-unit',
    x,
    y,
    width: 30,
    height: 30,
    rotation: 0,
    ...(home?.roomKey
      ? {
          roomKey: home.roomKey,
          roomName: home.roomName,
          floor: home.floor,
          roomArea: home.roomArea,
        }
      : {}),
  };
  return [...objects, board];
}

// ── Cable runs ───────────────────────────────────────────────────────────────

/** Drops and rises to each point, and the tail into the board — in metres. */
const DROP_PER_POINT_M = 1;
const BOARD_TAIL_M = 2;
/** Up (or down) a storey to reach another floor from the board. */
const STOREY_RISE_M = 2.7;

type Box = { x0: number; y0: number; x1: number; y1: number };

/** Each named floor's extent on the sheet, from its designed items. */
function floorBoxes(objects: CanvasObject[]) {
  const boxes = new Map<string, Box>();
  objects
    .filter((o) => o.type === 'symbol' && o.roomKey && o.floor && !isBoard(o))
    .forEach((o) => {
      const k = o.floor!;
      const b = boxes.get(k) ?? { x0: o.x, y0: o.y, x1: o.x, y1: o.y };
      boxes.set(k, {
        x0: Math.min(b.x0, o.x),
        y0: Math.min(b.y0, o.y),
        x1: Math.max(b.x1, o.x),
        y1: Math.max(b.y1, o.y),
      });
    });
  return boxes;
}

const MARGIN = 3 * SCALE;
const inside = (b: Box, p: Point) =>
  p.x >= b.x0 - MARGIN && p.x <= b.x1 + MARGIN && p.y >= b.y0 - MARGIN && p.y <= b.y1 + MARGIN;
const overlap = (a: Box, b: Box) => a.x0 <= b.x1 && b.x0 <= a.x1 && a.y0 <= b.y1 && b.y0 <= a.y1;

/** Storey number from a floor's name, where it says one — ground is 0. */
function storeyOf(floor: string): number | undefined {
  const f = floor.toLowerCase();
  if (/basement|cellar|lower ground/.test(f)) return -1;
  if (/ground/.test(f)) return 0;
  const words = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  const w = words.findIndex((x) => f.includes(x));
  if (w >= 0) return w + 1;
  const n = /(\d+)(st|nd|rd|th)?\s*floor|level\s*(\d+)|floor\s*(\d+)/.exec(f);
  const v = n && Number(n[1] ?? n[3] ?? n[4]);
  return v || v === 0 ? v : undefined;
}

/**
 * The floor the board is on, from where it sits on the sheet — not from its
 * stamp: a board added from the palette has none, and one dragged to another
 * floor keeps the old one.
 */
function boardFloor(board: CanvasObject, objects: CanvasObject[], boxes: Map<string, Box>) {
  const containing = [...boxes.entries()]
    .filter(([, b]) => inside(b, board))
    .sort(
      (a, b) =>
        (a[1].x1 - a[1].x0) * (a[1].y1 - a[1].y0) - (b[1].x1 - b[1].x0) * (b[1].y1 - b[1].y0)
    );
  if (containing.length) return containing[0][0];
  const nearest = objects
    .filter((o) => o.type === 'symbol' && o.floor && !isBoard(o))
    .reduce<CanvasObject | undefined>(
      (m, o) => (!m || manhattan(o, board) < manhattan(m, board) ? o : m),
      undefined
    );
  return nearest?.floor ?? board.floor ?? '';
}

const manhattan = (a: Point, b: Point) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

/** Visit every point from the board, nearest first, then untangle (2-opt). */
function order(board: Point, pts: CanvasObject[], loop: boolean): CanvasObject[] {
  const left = [...pts];
  const out: CanvasObject[] = [];
  let at: Point = board;
  while (left.length) {
    let best = 0;
    left.forEach((p, i) => {
      if (manhattan(at, p) < manhattan(at, left[best])) best = i;
    });
    at = left[best];
    out.push(left.splice(best, 1)[0]);
  }
  const path = () => [board, ...out, ...(loop ? [board] : [])];
  const total = (p: Point[]) => p.slice(1).reduce((a, q, i) => a + manhattan(p[i], q), 0);
  for (let pass = 0; pass < 4; pass++) {
    let improved = false;
    for (let i = 0; i < out.length - 1; i++)
      for (let j = i + 1; j < out.length; j++) {
        const before = total(path());
        out.splice(i, j - i + 1, ...out.slice(i, j + 1).reverse());
        if (total(path()) + 0.5 < before) improved = true;
        else out.splice(i, j - i + 1, ...out.slice(i, j + 1).reverse());
      }
    if (!improved) break;
  }
  return out;
}

/** Circuits that are a loop back to the board. */
const isRing = (ref: string) => /^S\d/.test(ref);
/** Fire detection zones are wired from the alarm panel, not the board. */
const fromBoard = (ref: string) => !/^FZ\d/.test(ref);

/** What the drawn runs were drawn from: every wired item's place and circuit. */
export function runsFingerprint(objects: CanvasObject[]): string {
  // Walls too: the routes go round them.
  return objects
    .filter(
      (o) =>
        (o.type === 'symbol' && (o.circuitRef || isBoard(o))) ||
        (o.type === 'wall' && o.points && o.points.length >= 2)
    )
    .map((o) =>
      o.type === 'wall'
        ? `${o.id}:${o.points!.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`).join(';')}`
        : `${o.id}:${Math.round(o.x)},${Math.round(o.y)}:${o.circuitRef ?? ''}`
    )
    .sort()
    .join('|');
}

/**
 * One drawn run per circuit per floor, each from the board nearest to it —
 * the main board, or a sub-board placed for a far wing — plus a submain from
 * the main board to each sub-board. Switches are left off the run — they
 * drop from their light, and routing through them drew zig-zags.
 */
export function circuitRuns(objects: CanvasObject[]): CanvasObject[] {
  const main = findBoard(objects);
  if (!main) return [];
  const walls = extractWalls(objects);
  const boxes = floorBoxes(objects);
  const fingerprint = runsFingerprint(objects);
  const boards = [main, ...subBoards(objects)];
  const homes = new Map(boards.map((b) => [b.id, boardFloor(b, objects, boxes)]));

  /** Where a board's cable reaches `floor`: the board itself, or its riser. */
  const originOn = (board: CanvasObject, floor: string) => {
    const home = homes.get(board.id)!;
    const homeBox = boxes.get(home);
    const box = boxes.get(floor);
    const otherFloor = floor !== home && !!box && !!homeBox;
    const at: Point = otherFloor
      ? { x: box!.x0 + (board.x - homeBox!.x0), y: box!.y0 + (board.y - homeBox!.y0) }
      : { x: board.x, y: board.y };
    const a = storeyOf(home);
    const b = storeyOf(floor);
    const storeys = !otherFloor ? 0 : a !== undefined && b !== undefined ? Math.abs(a - b) : 1;
    return { at, storeys };
  };
  // A floor the reader left unnamed, or one drawn over the board's own floor,
  // is the board's floor — not another storey with a made-up riser.
  const floorFor = (board: CanvasObject) => {
    const home = homes.get(board.id)!;
    const homeBox = boxes.get(home);
    return (o: CanvasObject) => {
      const f = o.floor ?? '';
      if (!f || f === home || !homeBox) return home;
      const b = boxes.get(f);
      return b && !overlap(b, homeBox) ? f : home;
    };
  };

  const route = (
    board: CanvasObject,
    all: CanvasObject[],
    ref: string,
    loop: boolean
  ): CanvasObject[] => {
    const floorOf = floorFor(board);
    const byFloor = new Map<string, CanvasObject[]>();
    all.forEach((o) => byFloor.set(floorOf(o), [...(byFloor.get(floorOf(o)) ?? []), o]));
    const pieces: CanvasObject[] = [];
    byFloor.forEach((items, floor) => {
      const { at: origin, storeys } = originOn(board, floor);
      const stops: Point[] = [origin, ...order(origin, items, loop), ...(loop ? [origin] : [])];
      const points: Point[] = [];
      for (let i = 0; i < stops.length - 1; i++) {
        const leg = orthogonalRoute(
          { x: stops[i].x, y: stops[i].y },
          { x: stops[i + 1].x, y: stops[i + 1].y },
          walls
        );
        leg.forEach((p, k) => {
          if (k === 0 && points.length) return; // shared joint
          points.push(p);
        });
      }
      const drawn = points
        .slice(1)
        .reduce((a, p, i) => a + Math.hypot(p.x - points[i].x, p.y - points[i].y), 0);
      const rise = storeys * STOREY_RISE_M * (loop ? 2 : 1);
      // The tail into the board is counted once per circuit.
      const tail = pieces.length === 0 ? BOARD_TAIL_M : 0;
      const lengthM =
        Math.round((drawn / SCALE + items.length * DROP_PER_POINT_M + tail + rise) * 10) / 10;
      pieces.push({
        id: `run-${ref}${pieces.length ? `-${pieces.length}` : ''}`,
        type: 'cable',
        x: points[0].x,
        y: points[0].y,
        points,
        circuitRef: ref,
        generated: true,
        lengthM,
        runsFor: fingerprint,
        fedFrom: boardName(board),
      });
    });
    return pieces;
  };

  const byRef = new Map<string, CanvasObject[]>();
  objects
    .filter(
      (o) =>
        o.type === 'symbol' &&
        o.circuitRef &&
        fromBoard(o.circuitRef) &&
        !isBoard(o) &&
        !/^switch-/.test(o.symbolId ?? '')
    )
    .forEach((o) => byRef.set(o.circuitRef!, [...(byRef.get(o.circuitRef!) ?? []), o]));
  const runs: CanvasObject[] = [];
  byRef.forEach((items, ref) => {
    const loop = isRing(ref);
    // From whichever board gives the shorter run, routed for real: a guess
    // from straight-line distance picked the wrong board and lengthened runs.
    const total = (pieces: CanvasObject[]) => pieces.reduce((a, r) => a + (r.lengthM ?? 0), 0);
    const best = boards
      .map((b) => route(b, items, ref, loop))
      .reduce((m, p) => (total(p) < total(m) ? p : m));
    runs.push(...best);
  });
  subBoards(objects).forEach((db) => runs.push(...route(main, [db], db.circuitRef!, false)));
  return runs;
}

export const hasRuns = (objects: CanvasObject[]) => objects.some((o) => o.generated);
export const withRuns = (objects: CanvasObject[]) => {
  const runs = circuitRuns(objects);
  // Each item keeps the board that feeds it, so the numbering holds when the
  // runs are hidden.
  const fed = new Map(runs.map((r) => [r.circuitRef!, r.fedFrom]));
  return [
    ...objects
      .filter((o) => !o.generated)
      .map((o) =>
        o.type === 'symbol' &&
        o.circuitRef &&
        fed.has(o.circuitRef) &&
        o.fedFrom !== fed.get(o.circuitRef)
          ? { ...o, fedFrom: fed.get(o.circuitRef) }
          : o
      ),
    ...runs,
  ];
};
export const withoutRuns = (objects: CanvasObject[]) => objects.filter((o) => !o.generated);

/** Each circuit's drawn run length, when the runs are drawn. */
export function runLengths(objects: CanvasObject[]): Map<string, number> {
  const m = new Map<string, number>();
  objects
    .filter((o) => o.generated && o.circuitRef)
    .forEach((o) => m.set(o.circuitRef!, (m.get(o.circuitRef!) ?? 0) + (o.lengthM ?? 0)));
  m.forEach((v, k) => m.set(k, Math.round(v * 10) / 10));
  return m;
}

/** True when items have moved or changed circuit since the runs were drawn. */
export function runsAreStale(objects: CanvasObject[]): boolean {
  const run = objects.find((o) => o.generated);
  return !!run && run.runsFor !== runsFingerprint(objects);
}

// ── Materials ────────────────────────────────────────────────────────────────

const CABLE_OF: Partial<Record<DesignedCircuit['kind'], string>> = {
  ring: '2.5/1.5 mm² T&E',
  radial: '2.5/1.5 mm² T&E',
  lighting: '1.5/1.0 mm² T&E',
  cooker: '6/2.5 mm² T&E (typical — size to demand)',
  ev: '6/2.5 mm² T&E (typical — size to length and method)',
  'water-heater': '2.5/1.5 mm² T&E',
  heating: '2.5/1.5 mm² T&E (typical — size to load)',
  // Air conditioning is sized from the maker's data, and fire zones are wired
  // from the alarm panel: neither can be put on an order from the drawing.
  'smoke-alarms': '1.5/1.0 mm² T&E (typical — per BS 5839-6 and the maker)',
  submain: 'Submain cable (size to the sub-board’s load and length)',
};

/**
 * Cable to order, by type, from the drawn runs — rounded up to the next 5 m
 * with 10% for waste and terminations. An estimate for pricing, not a take-off.
 */
export function cableTakeOff(circuits: DesignedCircuit[], lengths: Map<string, number>) {
  const totals = new Map<string, number>();
  circuits.forEach((c) => {
    const len = lengths.get(c.ref);
    const cable = CABLE_OF[c.kind];
    if (!len || !cable) return;
    totals.set(cable, (totals.get(cable) ?? 0) + len);
  });
  return [...totals.entries()].map(([cable, m]) => ({
    cable,
    metres: Math.ceil((m * 1.1) / 5) * 5,
  }));
}

// ── Splitting a circuit that runs too long ───────────────────────────────────

/** Fewer points than this and there is nothing sensible to split. */
export const MIN_SPLIT_POINTS = 4;

/**
 * Split a circuit in two along its run: the half nearer the board keeps the
 * ref, the far half becomes the next free ref of the same kind (S4, L7…).
 * For a ring over the OSG length, this is the usual fix short of a bigger cable.
 */
/**
 * The half of a circuit's items farther from its board, as two compact
 * groups: whole rooms kept together, grouped by position (two-means from the
 * two rooms farthest apart). Halving the walk order instead could hand one
 * half rooms at opposite ends of a building — a split ring 68 m across.
 */
function farHalf(start: Point, items: CanvasObject[]): CanvasObject[] {
  const units = new Map<string, CanvasObject[]>();
  items.forEach((o) => {
    const k = o.roomKey ?? o.id;
    units.set(k, [...(units.get(k) ?? []), o]);
  });
  let groups = [...units.values()];
  // One room: split its items instead.
  if (groups.length < 2) groups = items.map((o) => [o]);
  const centre = (g: CanvasObject[]): Point => ({
    x: g.reduce((a, o) => a + o.x, 0) / g.length,
    y: g.reduce((a, o) => a + o.y, 0) / g.length,
  });
  const pts = groups.map(centre);
  const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
  const mid = centre(items);
  const i0 = pts.reduce((m, p, i) => (dist(p, mid) > dist(pts[m], mid) ? i : m), 0);
  const i1 = pts.reduce((m, p, i) => (dist(p, pts[i0]) > dist(pts[m], pts[i0]) ? i : m), 0);
  let seeds = [pts[i0], pts[i1]];
  let side: number[] = [];
  for (let it = 0; it < 8; it++) {
    side = pts.map((p) => (dist(p, seeds[0]) <= dist(p, seeds[1]) ? 0 : 1));
    // Keep the halves near even in points, so both circuits come out shorter.
    const count = (s: number) => groups.reduce((a, g, i) => a + (side[i] === s ? g.length : 0), 0);
    while (Math.abs(count(0) - count(1)) > Math.max(2, items.length / 3)) {
      const big = count(0) > count(1) ? 0 : 1;
      const movable = pts
        .map((p, i) => ({ i, d: dist(p, seeds[1 - big]) }))
        .filter(({ i }) => side[i] === big)
        .sort((a, b) => a.d - b.d);
      if (movable.length < 2) break;
      side[movable[0].i] = 1 - big;
    }
    seeds = [0, 1].map((s) => {
      const mine = groups.filter((_, i) => side[i] === s).flat();
      return mine.length ? centre(mine) : seeds[s];
    });
  }
  const half = (s: number) => groups.filter((_, i) => side[i] === s).flat();
  const [a, b] = [half(0), half(1)];
  if (!a.length || !b.length) {
    const walked = order(start, items, false);
    return walked.slice(Math.ceil(walked.length / 2));
  }
  return dist(centre(a), start) > dist(centre(b), start) ? a : b;
}

export function splitCircuit(objects: CanvasObject[], ref: string): CanvasObject[] {
  const board = findBoard(objects);
  const family = /^([A-Z]+)/.exec(ref)?.[1];
  const items = objects.filter(
    (o) => o.type === 'symbol' && o.circuitRef === ref && !/^switch-/.test(o.symbolId ?? '')
  );
  if (!family || items.length < MIN_SPLIT_POINTS) return objects;
  // Walk from the board that feeds it — a sub-board, where it has one.
  const fedFrom = objects.find((o) => o.generated && o.circuitRef === ref)?.fedFrom;
  const feeder = [board, ...subBoards(objects)].find((b) => b && boardName(b) === fedFrom);
  const start = feeder ?? board ?? items[0];
  const far = new Set(farHalf(start, items).map((o) => o.id));
  const used = objects
    .map((o) => new RegExp(`^${family}(\\d+)$`).exec(o.circuitRef ?? '')?.[1])
    .filter(Boolean)
    .map(Number);
  const nextRef = `${family}${Math.max(0, ...used) + 1}`;
  // Switches go with the light they control: the nearest light's new circuit.
  // The new circuit starts from the design, not the old one's amendments.
  const next = objects.map((o) =>
    far.has(o.id) ? { ...o, circuitRef: nextRef, wayPin: undefined, circuitEdit: undefined } : o
  );
  const lights = next.filter(
    (o) =>
      o.type === 'symbol' &&
      (o.circuitRef === ref || o.circuitRef === nextRef) &&
      !/^switch-/.test(o.symbolId ?? '')
  );
  const rehomed = next.map((o) => {
    if (o.type !== 'symbol' || o.circuitRef !== ref || !/^switch-/.test(o.symbolId ?? '')) return o;
    // A light in the switch's own room first; the nearest anywhere only if
    // the room has none. Nearest-anywhere moved 1 switch in 9 off its lights.
    const own = lights.filter((l) => o.roomKey && l.roomKey === o.roomKey);
    const near = (own.length ? own : lights).reduce<CanvasObject | undefined>(
      (m, l) => (!m || manhattan(l, o) < manhattan(m, o) ? l : m),
      undefined
    );
    return near ? { ...o, circuitRef: near.circuitRef } : o;
  });
  return hasRuns(rehomed) ? withRuns(rehomed) : rehomed;
}

// ── Sub-boards for a large building ──────────────────────────────────────────

/**
 * Put a distribution board where the over-length circuits are (29 Sep 2026).
 * A school or care-home wing 60 m from the intake cannot be wired from one
 * board inside the OSG lengths; a sub-board near the far rooms can. It goes in
 * a store, cupboard or corridor among those rooms where there is one, and is
 * fed by its own way (DB2, DB3…) on the main board. Circuits then run from
 * whichever board is nearer, and the runs are redrawn.
 */
export function placeSubBoard(objects: CanvasObject[], overRefs: string[]): CanvasObject[] {
  const main = findBoard(objects);
  if (!main || !overRefs.length) return objects;
  const refs = new Set(overRefs);
  const far = objects.filter(
    (o) => isDesigned(o) && !isBoard(o) && o.circuitRef && refs.has(o.circuitRef)
  );
  if (!far.length) return objects;
  // The floor with most of them, then the item farthest from the main board
  // on it: the sub-board goes among the far rooms, not in the middle.
  const perFloor = new Map<string, CanvasObject[]>();
  far.forEach((o) => perFloor.set(o.floor ?? '', [...(perFloor.get(o.floor ?? '') ?? []), o]));
  const group = [...perFloor.values()].sort((a, b) => b.length - a.length)[0];
  const cx = group.reduce((a, o) => a + o.x, 0) / group.length;
  const cy = group.reduce((a, o) => a + o.y, 0) / group.length;
  const centre = { x: cx, y: cy };
  const rooms = new Map<string, CanvasObject[]>();
  group.forEach((o) => rooms.set(o.roomKey!, [...(rooms.get(o.roomKey!) ?? []), o]));
  const ranked = [...rooms.values()].sort(
    (a, b) => manhattan(a[0], centre) - manhattan(b[0], centre)
  );
  const pick =
    ranked.slice(0, 6).find((list) => SUB_BOARD_ROOMS.test(list[0].roomName ?? '')) ?? ranked[0];
  const used = objects
    .map((o) => /^DB(\d+)$/.exec(o.circuitRef ?? '')?.[1])
    .filter(Boolean)
    .map(Number);
  const home = pick[0];
  const board: CanvasObject = {
    id: `board-${Date.now()}`,
    type: 'symbol',
    symbolId: 'distribution-board',
    x: Math.min(...pick.map((o) => o.x)),
    y: pick.reduce((a, o) => a + o.y, 0) / pick.length,
    width: 30,
    height: 30,
    rotation: 0,
    circuitRef: `DB${Math.max(1, ...used) + 1}`,
    roomKey: home.roomKey,
    roomName: home.roomName,
    floor: home.floor,
    roomArea: home.roomArea,
  };
  // Only where it shortens the long runs: a board beside one already there,
  // or among rooms a single circuit sprawls across, fixes nothing.
  const next = withRuns([...objects, board]);
  return overBy(next) < overBy(withRuns(objects)) - 1 ? next : objects;
}

/** Total metres by which runs exceed their OSG length (submains excepted). */
function overBy(objects: CanvasObject[]): number {
  return scheduleFromObjects(objects)
    .circuits.filter((c) => c.kind !== 'submain' && c.length?.ok === false)
    .reduce((a, c) => a + (c.length!.lengthM - (c.length!.maxM ?? c.length!.lengthM)), 0);
}

const overRefsOf = (objects: CanvasObject[]) =>
  scheduleFromObjects(objects)
    .circuits.filter((c) => c.kind !== 'submain' && c.length?.ok === false)
    .map((c) => c.ref);

/**
 * One tap for a plan with long runs: a sub-board where one shortens them (up
 * to three), then split what is still over — longest first — until every run
 * is within its length or can't be split further. Returns what it did, for
 * the electrician to see.
 */
export function fixLongRuns(objects: CanvasObject[]): {
  objects: CanvasObject[];
  added: string[];
  split: string[];
  stillOver: string[];
} {
  let cur = hasRuns(objects) ? objects : withRuns(objects);
  const added: string[] = [];
  const split: string[] = [];
  const tried = new Set<string>();
  const splitWhatHelps = () => {
    for (let i = 0; i < 40; i++) {
      const over = scheduleFromObjects(cur)
        .circuits.filter(
          (c) =>
            c.kind !== 'submain' &&
            c.length?.ok === false &&
            c.points >= MIN_SPLIT_POINTS &&
            !tried.has(c.ref)
        )
        .sort((a, b) => b.length!.lengthM - a.length!.lengthM);
      if (!over.length) return;
      const ref = over[0].ref;
      const next = splitCircuit(cur, ref);
      if (next === cur || overBy(next) >= overBy(cur)) {
        tried.add(ref);
        continue;
      }
      if (!split.includes(ref)) split.push(ref);
      cur = next;
    }
  };
  // Rounds: a sub-board where a cluster of runs is long (a far wing — one
  // ring a few metres over wants splitting, not a new board), then split
  // what is left. A split can leave a new cluster a board then fixes.
  for (let round = 0; round < 3; round++) {
    const over = overRefsOf(cur);
    if (!over.length) break;
    if (over.length >= 3 && subBoards(cur).length < 4) {
      const next = placeSubBoard(cur, over);
      if (next !== cur) {
        const before = new Set(subBoards(cur).map((b) => b.circuitRef));
        added.push(
          ...subBoards(next)
            .map((b) => b.circuitRef!)
            .filter((r) => !before.has(r))
        );
        cur = next;
        tried.clear();
      }
    }
    const was = overBy(cur);
    splitWhatHelps();
    if (overBy(cur) >= was && !added.length) break;
  }
  return { objects: cur, added, split, stillOver: overRefsOf(cur) };
}

const SUB_BOARD_ROOMS =
  /\b(store|cupboard|riser|plant|corridor|landing|hall|lobby|utility|cleaner|comms|server)\b/i;

// ── Board numbering for a drawing ────────────────────────────────────────────

/** Every circuit's board way on this drawing — what tags and schedules show. */
export function waysOf(objects: CanvasObject[]): Map<string, Way> {
  return wayMap(scheduleFromObjects(objects).circuits, planSettings(objects).supply);
}

// ── Amending the board by hand ───────────────────────────────────────────────

/**
 * Move a way up or down its board. `order` is the board's circuits as they
 * stand (way order); every circuit on the board is then pinned to its new
 * place, on its fittings, so the numbering holds everywhere.
 */
export function moveWay(objects: CanvasObject[], order: string[], ref: string, by: -1 | 1) {
  const at = order.indexOf(ref);
  const to = at + by;
  if (at < 0 || to < 0 || to >= order.length) return objects;
  const next = [...order];
  [next[at], next[to]] = [next[to], next[at]];
  const pin = new Map(next.map((r, i) => [r, i + 1]));
  return objects.map((o) =>
    o.type === 'symbol' && o.circuitRef && pin.has(o.circuitRef)
      ? { ...o, wayPin: pin.get(o.circuitRef) }
      : o
  );
}

/** Amend a circuit's description, device, rating or cable — or, with null, undo it. */
export function editCircuit(
  objects: CanvasObject[],
  ref: string,
  edit: CanvasObject['circuitEdit'] | null
): CanvasObject[] {
  return objects.map((o) =>
    o.type === 'symbol' && o.circuitRef === ref ? { ...o, circuitEdit: edit ?? undefined } : o
  );
}
