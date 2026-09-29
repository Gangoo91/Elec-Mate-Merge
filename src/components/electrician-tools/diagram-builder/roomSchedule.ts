/**
 * A plan from a room list (29 Sep 2026).
 *
 * The electrician says what is there — "Bedroom 1, 3.4 × 3.8, four doubles,
 * one light" — and the plan is drawn from that exactly, with no reading and no
 * guessing: the same list always gives the same drawing.
 *
 * Layout is the plan most buildings actually have: rooms either side of a
 * hall or corridor, doors off it. Rooms keep the sizes typed; the corridor
 * runs the length of the floor. Floors sit side by side, as on a drawing.
 *
 * The output is the same shape the plan reader returns, so it goes through the
 * same layout, circuit design and labelling as a read plan.
 */
import type { AIPlanData, AIRoomEntry } from './aiPlanToObjects';

export type ExtraItem =
  | 'cooker'
  | 'extractor'
  | 'smoke'
  | 'heat'
  | 'shaver'
  | 'towelRail'
  | 'outsideLight'
  | 'tv'
  | 'data'
  | 'ev'
  | 'spur';

export interface ScheduleRoom {
  name: string;
  floor: string;
  /** Metres. Width runs along the corridor; length runs away from it. */
  width: number;
  length: number;
  /** Double sockets. */
  sockets: number;
  lights: number;
  extras: Partial<Record<ExtraItem, number>>;
}

/** What each extra is on the drawing, and whether it goes on a wall or the ceiling. */
export const EXTRAS: {
  id: ExtraItem;
  label: string;
  symbol: string;
  mount: 'wall' | 'ceiling' | 'outer';
}[] = [
  { id: 'smoke', label: 'Smoke alarm', symbol: 'smoke-detector', mount: 'ceiling' },
  { id: 'heat', label: 'Heat alarm', symbol: 'heat-detector', mount: 'ceiling' },
  { id: 'cooker', label: 'Cooker point', symbol: 'socket-cooker-45a', mount: 'wall' },
  { id: 'extractor', label: 'Extractor fan', symbol: 'extractor-fan', mount: 'outer' },
  { id: 'spur', label: 'Fused spur', symbol: 'socket-switched-fused-spur', mount: 'wall' },
  { id: 'shaver', label: 'Shaver point', symbol: 'socket-shaver', mount: 'wall' },
  { id: 'towelRail', label: 'Towel rail', symbol: 'towel-rail', mount: 'wall' },
  { id: 'tv', label: 'TV point', symbol: 'socket-tv-aerial', mount: 'wall' },
  { id: 'data', label: 'Data point', symbol: 'socket-data', mount: 'wall' },
  { id: 'outsideLight', label: 'Outside light', symbol: 'light-outside', mount: 'outer' },
  { id: 'ev', label: 'EV charger', symbol: 'socket-ev-charger', mount: 'outer' },
];

/**
 * Typical starting points by room — editable on the form. Counts are a
 * starting point for the electrician to adjust, not a compliance statement.
 */
export const ROOM_PRESETS: {
  name: string;
  width: number;
  length: number;
  sockets: number;
  lights: number;
  extras: ScheduleRoom['extras'];
}[] = [
  { name: 'Lounge', width: 4.5, length: 4, sockets: 5, lights: 1, extras: { tv: 1, data: 1 } },
  {
    name: 'Kitchen',
    width: 4,
    length: 3,
    sockets: 6,
    lights: 4,
    extras: { cooker: 1, extractor: 1, heat: 1, spur: 2 },
  },
  { name: 'Bedroom', width: 3.4, length: 3.6, sockets: 4, lights: 1, extras: { tv: 1 } },
  {
    name: 'Bathroom',
    width: 2.4,
    length: 2,
    sockets: 0,
    lights: 2,
    extras: { extractor: 1, shaver: 1, towelRail: 1 },
  },
  {
    name: 'En-suite',
    width: 2,
    length: 1.6,
    sockets: 0,
    lights: 1,
    extras: { extractor: 1, shaver: 1 },
  },
  { name: 'WC', width: 1.6, length: 1, sockets: 0, lights: 1, extras: { extractor: 1 } },
  { name: 'Hall', width: 4, length: 1.2, sockets: 1, lights: 2, extras: { smoke: 1 } },
  { name: 'Landing', width: 4, length: 1.2, sockets: 1, lights: 2, extras: { smoke: 1 } },
  { name: 'Office', width: 3, length: 3, sockets: 6, lights: 2, extras: { data: 2 } },
  { name: 'Utility', width: 2.2, length: 2, sockets: 3, lights: 1, extras: { spur: 1 } },
  { name: 'Garage', width: 3, length: 5.5, sockets: 2, lights: 2, extras: { ev: 1 } },
  { name: 'Dining room', width: 4, length: 3.5, sockets: 3, lights: 1, extras: {} },
  { name: 'Conservatory', width: 4, length: 3, sockets: 3, lights: 2, extras: {} },
];

const CIRCULATION = /\b(hall|hallway|landing|corridor|passage)\b/i;
const DOOR_WIDTH = 0.8;
const MIN_CORRIDOR = 1.0;
const FLOOR_GAP = 3;
const r2 = (n: number) => Math.round(n * 100) / 100;
// 0.9 m: the smallest room a plan can hold a door and a fitting in.
const clampSize = (n: number) => Math.min(Math.max(Number.isFinite(n) ? n : 3, 0.9), 40);

type Side = 'north' | 'east' | 'south' | 'west';
type Sym = NonNullable<AIRoomEntry['symbols']>[number];

/** `count` points spread evenly along a set of walls, as {wall, position}. */
function spread(
  count: number,
  walls: { id: Side; length: number }[]
): { wall: Side; position: number }[] {
  const usable = walls.filter((w) => w.length >= 0.9);
  if (!count || !usable.length) return [];
  const total = usable.reduce((s, w) => s + w.length, 0);
  const out: { wall: Side; position: number }[] = [];
  for (let i = 0; i < count; i++) {
    let d = ((i + 0.5) / count) * total;
    for (const w of usable) {
      if (d <= w.length) {
        // Keep off the corners, where a socket cannot actually go.
        out.push({ wall: w.id, position: r2(Math.min(Math.max(d, 0.35), w.length - 0.35)) });
        break;
      }
      d -= w.length;
    }
  }
  return out;
}

function roomEntry(
  room: ScheduleRoom,
  x: number,
  y: number,
  w: number,
  h: number,
  doorWall: Side | null,
  outerWall: Side | null
): AIRoomEntry {
  const len: Record<Side, number> = { north: w, south: w, east: h, west: h };
  const symbols: Sym[] = [];
  const circulation = CIRCULATION.test(room.name);

  // Door, and the light switch just inside it on the latch side.
  if (doorWall) {
    const along = Math.min(0.5 + DOOR_WIDTH / 2, len[doorWall] / 2);
    symbols.push({ type: 'door-left', wall: doorWall, position: String(r2(along)) });
    if (!circulation) {
      symbols.push({
        type: 'switch-1way',
        wall: doorWall,
        position: String(r2(Math.min(along + 0.7, len[doorWall] - 0.3))),
      });
    }
  }
  if (circulation) {
    // Two-way switching at each end of a hall or landing.
    const run: Side = w >= h ? 'north' : 'west';
    symbols.push({ type: 'switch-2way', wall: run, position: '0.4' });
    symbols.push({ type: 'switch-2way', wall: run, position: String(r2(len[run] - 0.4)) });
  }

  // Sockets round the walls that are not the door wall.
  const socketWalls = (['north', 'east', 'south', 'west'] as Side[])
    .filter((s) => s !== doorWall)
    .map((id) => ({ id, length: len[id] }));
  // Sockets and the wall-mounted extras (cooker point, spurs, TV…) are
  // spread round those walls TOGETHER, extras dealt in among the sockets —
  // placed separately they all landed on the first wall, on top of each other.
  const inner = EXTRAS.filter((ex) => ex.mount === 'wall').flatMap((ex) =>
    Array.from({ length: room.extras[ex.id] ?? 0 }, () => ex.symbol)
  );
  const total = room.sockets + inner.length;
  const order: string[] = Array.from({ length: total }, () => 'socket-double-13a');
  const taken = new Set<number>();
  inner.forEach((sym, k) => {
    // Its even share of the run, or the next free slot after it.
    let i = Math.min(total - 1, Math.floor(((k + 0.5) * total) / inner.length));
    while (taken.has(i)) i = (i + 1) % total;
    taken.add(i);
    order[i] = sym;
  });
  spread(total, socketWalls).forEach((p, i) =>
    symbols.push({ type: order[i], wall: p.wall, position: String(p.position) })
  );

  // Lights: the ceiling grid lays these out evenly.
  const lightType = /bath|en-?suite|wc|shower|kitchen/i.test(room.name)
    ? 'light-downlight'
    : 'light-ceiling';
  for (let i = 0; i < room.lights; i++) symbols.push({ type: lightType, position: 'center' });

  // Extras.
  EXTRAS.forEach((ex) => {
    const n = room.extras[ex.id] ?? 0;
    if (!n) return;
    if (ex.mount === 'ceiling') {
      for (let i = 0; i < n; i++) symbols.push({ type: ex.symbol, position: 'center' });
      return;
    }
    if (ex.mount === 'wall') return; // dealt in with the sockets above
    // On the outside wall; the layout pass slides it clear of anything there.
    const wall = outerWall ?? socketWalls[0]?.id ?? 'north';
    spread(n, [{ id: wall, length: len[wall] }]).forEach((p) =>
      symbols.push({ type: ex.symbol, wall: p.wall, position: String(r2(p.position)) })
    );
  });

  return {
    room: {
      name: room.name,
      floor: room.floor || undefined,
      origin: { x: r2(x), y: r2(y) },
      dimensions: { width: r2(w), height: r2(h), unit: 'm' },
    },
    walls: (['north', 'east', 'south', 'west'] as Side[]).map((id) => ({
      id,
      length: r2(len[id]),
    })),
    symbols,
  };
}

/** Lay out one floor: rooms either side of a corridor, doors off it. */
function layoutFloor(
  rooms: ScheduleRoom[],
  originX: number
): { entries: AIRoomEntry[]; width: number } {
  const circulation = rooms.filter((r) => CIRCULATION.test(r.name));
  const others = rooms.filter((r) => !CIRCULATION.test(r.name));
  const sized = others.map((r) => ({
    ...r,
    width: clampSize(r.width),
    length: clampSize(r.length),
  }));

  // Two rooms or fewer: side by side, no corridor needed.
  if (sized.length <= 2 && circulation.length === 0) {
    let x = originX;
    const entries = sized.map((r, i) => {
      const e = roomEntry(
        r,
        x,
        0,
        r.width,
        r.length,
        // One room on its own still has a way in: a door on its south wall.
        sized.length === 1 ? 'south' : i === 0 ? 'east' : null,
        'north'
      );
      x += r.width;
      return e;
    });
    return { entries, width: x - originX };
  }

  // Balance the two sides by frontage, largest rooms first, keeping each
  // side in the order typed where the frontage allows.
  const top: typeof sized = [];
  const bottom: typeof sized = [];
  let topW = 0;
  let bottomW = 0;
  sized.forEach((r) => {
    if (topW <= bottomW) {
      top.push(r);
      topW += r.width;
    } else {
      bottom.push(r);
      bottomW += r.width;
    }
  });

  const hall = circulation[0];
  const corridorDepth = clampSize(hall ? Math.min(hall.width, hall.length) : MIN_CORRIDOR);
  const span = Math.max(topW, bottomW, hall ? clampSize(Math.max(hall.width, hall.length)) : 0, 2);
  const topDepth = Math.max(0, ...top.map((r) => r.length));
  const corridorY = topDepth;

  const entries: AIRoomEntry[] = [];
  let x = originX;
  top.forEach((r) => {
    entries.push(roomEntry(r, x, corridorY - r.length, r.width, r.length, 'south', 'north'));
    x += r.width;
  });
  x = originX;
  bottom.forEach((r) => {
    entries.push(roomEntry(r, x, corridorY + corridorDepth, r.width, r.length, 'north', 'south'));
    x += r.width;
  });
  entries.push(
    roomEntry(
      {
        name: hall?.name ?? 'Hall',
        floor: rooms[0]?.floor ?? '',
        width: span,
        length: corridorDepth,
        sockets: hall?.sockets ?? 1,
        lights: hall?.lights ?? Math.max(1, Math.round(span / 3.5)),
        extras: hall?.extras ?? { smoke: 1 },
      },
      originX,
      corridorY,
      span,
      corridorDepth,
      null,
      null
    )
  );
  // Any further circulation spaces the list named sit at the corridor's end.
  // Placed one after another along the corridor's end (the old i × width
  // drew a second landing inside the first).
  let cx = originX + span;
  circulation.slice(1).forEach((c) => {
    const w = clampSize(c.width);
    const l = clampSize(c.length);
    entries.push(roomEntry(c, cx, corridorY, w, l, 'west', null));
    cx += w;
  });
  const width = span + circulation.slice(1).reduce((s, c) => s + clampSize(c.width), 0);
  return { entries, width };
}

/**
 * `stackFloors`: one floor above the next instead of side by side — on a
 * phone, side by side makes a two-storey plan half the width it could be.
 */
export function planFromSchedule(
  rooms: ScheduleRoom[],
  options: { stackFloors?: boolean } = {}
): AIPlanData {
  // Every room listed is drawn: one left unnamed is called "Room N" rather
  // than silently dropped (the form had promised every item was on the plan).
  const valid = rooms.map((r, i) => (r.name.trim() ? r : { ...r, name: `Room ${i + 1}` }));
  const floors = [...new Set(valid.map((r) => r.floor.trim()))];
  let x = 0;
  let y = 0;
  const entries: AIRoomEntry[] = [];
  floors.forEach((floor) => {
    const { entries: e, width } = layoutFloor(
      valid.filter((r) => r.floor.trim() === floor).map((r) => ({ ...r, floor })),
      options.stackFloors ? 0 : x
    );
    if (options.stackFloors) {
      // Shift this floor down below the last, leaving room for its heading.
      const top = Math.min(...e.map((r) => r.room?.origin?.y ?? 0));
      const bottom = Math.max(
        ...e.map((r) => (r.room?.origin?.y ?? 0) + (r.room?.dimensions?.height ?? 0))
      );
      e.forEach((r) => {
        if (r.room?.origin) r.room.origin.y = r2((r.room.origin.y ?? 0) - top + y);
      });
      y += bottom - top + FLOOR_GAP;
    }
    entries.push(...e);
    x += width + FLOOR_GAP;
  });
  return { rooms: entries };
}
