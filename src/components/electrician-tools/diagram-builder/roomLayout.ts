/**
 * Make a plan's rooms tile like a drawing (29 Sep 2026).
 *
 * A reader boxes each room by eye, so two rooms that share a wall come back
 * 5–30 cm apart, or lapping over each other, or with a sliver of gap between.
 * Drawn as-is that is a plan of doubled walls and rooms stacked on rooms. An
 * architect's plan has one line per wall. This pass guarantees that, whatever
 * the source (PDF, photo, description, template):
 *
 *   1. Edges that are nearly in line become exactly in line — one wall.
 *      Small gaps close the same way, because both faces snap to one line.
 *   2. Two rooms that partly overlap get a single shared wall between them,
 *      on the SMALLER room's edge: the small room (a WC, a store) keeps its
 *      size and the large room gives up the strip it had drawn over it.
 *   3. A room that sits inside another is kept inside — an en-suite in the
 *      corner of a bedroom is a partition, which is how a plan draws it —
 *      with its edges pulled onto the bigger room's walls where they meet.
 *      If it spans the whole of one side, the bigger room is cut back instead
 *      so the two simply sit side by side.
 *   4. Floors are kept apart so one never lands on another.
 *
 * Pure: in metres, one floor at a time, and deterministic.
 */

export interface LayoutRoom {
  room?: {
    name?: string;
    floor?: string;
    origin?: { x?: number; y?: number };
    dimensions?: { width?: number; height?: number; unit?: string };
  };
  walls?: { id?: string; length: number }[];
}

type Rect = { x0: number; y0: number; x1: number; y1: number };

/** Edges closer than this are the same wall. */
const ALIGN_TOL_M = 0.3;
/** Nested rooms: an inner edge this close to the outer wall is ON the wall. */
const NEST_SNAP_M = 0.6;
/** A room this much inside another is treated as nested. */
const NESTED_SHARE = 0.85;
/** A nested room spanning this share of a side is cut out instead. */
const SPANS_SIDE = 0.8;
const MIN_ROOM_M = 0.8;
/** Overlap deeper than this share of the small room: move it, don't cut. */
const DEEP_SHARE = 0.15;
/** Space left between floors laid side by side. */
const FLOOR_GAP_M = 3;
const EPS = 0.01;

const r2 = (n: number) => Math.round(n * 100) / 100;
const area = (r: Rect) => Math.max(0, r.x1 - r.x0) * Math.max(0, r.y1 - r.y0);
const overlapX = (a: Rect, b: Rect) => Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
const overlapY = (a: Rect, b: Rect) => Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
const overlapArea = (a: Rect, b: Rect) => Math.max(0, overlapX(a, b)) * Math.max(0, overlapY(a, b));

function rectOf(r: LayoutRoom): Rect | null {
  const o = r.room?.origin;
  const wall = (id: string) => r.walls?.find((w) => w.id === id)?.length;
  const w = r.room?.dimensions?.width ?? wall('north') ?? wall('south');
  const h = r.room?.dimensions?.height ?? wall('east') ?? wall('west');
  if (w == null || h == null || w <= 0 || h <= 0) return null;
  const x = o?.x ?? 0;
  const y = o?.y ?? 0;
  return { x0: x, y0: y, x1: x + w, y1: y + h };
}

/**
 * Pull nearly-equal edge values onto one line. Values are clustered in order
 * and each cluster takes its length-weighted mean, so a long wall moves less
 * than the short one meeting it.
 */
function alignAxis(rects: Rect[], axis: 'x' | 'y', tol: number, locked: Set<Rect>) {
  const edges: { r: Rect; key: 'x0' | 'x1' | 'y0' | 'y1'; v: number; w: number }[] = [];
  rects.forEach((r) => {
    const span = axis === 'x' ? r.y1 - r.y0 : r.x1 - r.x0;
    (axis === 'x' ? (['x0', 'x1'] as const) : (['y0', 'y1'] as const)).forEach((key) =>
      edges.push({ r, key, v: r[key], w: locked.has(r) ? span * 1000 : span })
    );
  });
  edges.sort((a, b) => a.v - b.v);
  let i = 0;
  while (i < edges.length) {
    let j = i + 1;
    while (
      j < edges.length &&
      edges[j].v - edges[j - 1].v <= tol + 1e-6 &&
      edges[j].v - edges[i].v <= tol * 2
    )
      j++;
    const group = edges.slice(i, j);
    if (group.length > 1) {
      const total = group.reduce((s, e) => s + e.w, 0);
      const v = r2(group.reduce((s, e) => s + e.v * e.w, 0) / total);
      group.forEach((e) => {
        // Never collapse a room: keep an edge if moving it would.
        const next = { ...e.r, [e.key]: v };
        if (next.x1 - next.x0 >= MIN_ROOM_M && next.y1 - next.y0 >= MIN_ROOM_M) e.r[e.key] = v;
      });
    }
    i = j;
  }
}

/** Is `inner` (nearly) inside `outer`? */
const nestedIn = (inner: Rect, outer: Rect) =>
  area(inner) > 0 &&
  overlapArea(inner, outer) / area(inner) >= NESTED_SHARE &&
  area(outer) > area(inner);

function resolvePair(a: Rect, b: Rect, neighbours: Rect[], precise = false): boolean {
  const ox = overlapX(a, b);
  const oy = overlapY(a, b);
  if (ox <= EPS || oy <= EPS) return false;

  const [small, big] = area(a) <= area(b) ? [a, b] : [b, a];

  if (nestedIn(small, big)) {
    // Spans (most of) a whole side and sits at one end: cut the big room back
    // so they sit side by side. Otherwise it is a partition inside the room.
    const spansW = (small.x1 - small.x0) / (big.x1 - big.x0) >= SPANS_SIDE;
    const spansH = (small.y1 - small.y0) / (big.y1 - big.y0) >= SPANS_SIDE;
    const atTop = small.y0 - big.y0 < NEST_SNAP_M;
    const atBottom = big.y1 - small.y1 < NEST_SNAP_M;
    const atLeft = small.x0 - big.x0 < NEST_SNAP_M;
    const atRight = big.x1 - small.x1 < NEST_SNAP_M;
    if (spansW && atTop && big.y1 - small.y1 >= MIN_ROOM_M) {
      Object.assign(small, { x0: big.x0, x1: big.x1, y0: big.y0 });
      big.y0 = small.y1;
      return true;
    }
    if (spansW && atBottom && small.y0 - big.y0 >= MIN_ROOM_M) {
      Object.assign(small, { x0: big.x0, x1: big.x1, y1: big.y1 });
      big.y1 = small.y0;
      return true;
    }
    if (spansH && atLeft && big.x1 - small.x1 >= MIN_ROOM_M) {
      Object.assign(small, { y0: big.y0, y1: big.y1, x0: big.x0 });
      big.x0 = small.x1;
      return true;
    }
    if (spansH && atRight && small.x0 - big.x0 >= MIN_ROOM_M) {
      Object.assign(small, { y0: big.y0, y1: big.y1, x1: big.x1 });
      big.x1 = small.x0;
      return true;
    }
    // A partition: sit it inside, its outer edges on the big room's walls.
    let moved = false;
    const pin = (k: 'x0' | 'x1' | 'y0' | 'y1', v: number) => {
      if (Math.abs(small[k] - v) > EPS && Math.abs(small[k] - v) < NEST_SNAP_M) {
        small[k] = v;
        moved = true;
      }
    };
    pin('x0', big.x0);
    pin('x1', big.x1);
    pin('y0', big.y0);
    pin('y1', big.y1);
    // Anything still poking outside comes back in.
    (['x0', 'y0'] as const).forEach((k) => {
      if (small[k] < big[k] - EPS) {
        small[k] = big[k];
        moved = true;
      }
    });
    (['x1', 'y1'] as const).forEach((k) => {
      if (small[k] > big[k] + EPS) {
        small[k] = big[k];
        moved = true;
      }
    });
    return moved;
  }

  // Partial overlap.
  //
  // Which axis: normally the shallower overlap. But when the overlap covers
  // the small room's WHOLE width, the rooms meet end-on (a corridor running
  // into a bedroom) and the only honest fix is along its length — sliding it
  // sideways would shove it into the rooms beside it. Same for full height.
  const fullWidth = ox >= small.x1 - small.x0 - EPS;
  const fullHeight = oy >= small.y1 - small.y0 - EPS;
  const alongX = fullWidth && !fullHeight ? false : fullHeight && !fullWidth ? true : ox <= oy;
  const [lo, hi] = alongX ? (['x0', 'x1'] as const) : (['y0', 'y1'] as const);
  const deep =
    (alongX ? ox : oy) > DEEP_SHARE * (small[hi] - small[lo]) && !(alongX ? fullWidth : fullHeight);

  // A deep lap means the reader put a room in the wrong place but read its
  // size right — sizes come off the dimensions printed on the drawing, while
  // positions are the reader's estimate. So push the room that sits further
  // along (down or right) clear, keeping its size; if that pushes it into the
  // next room, that one is pushed on the next pass. Rooms only ever move one
  // way, so this cannot go round in circles; anything left is cut below.
  if (deep && !precise) {
    const later = a[lo] + a[hi] >= b[lo] + b[hi] ? a : b;
    const earlier = later === a ? b : a;
    const d = r2(earlier[hi] - later[lo]);
    if (d > 0) {
      later[lo] = r2(later[lo] + d);
      later[hi] = r2(later[hi] + d);
      return true;
    }
  }

  // Otherwise one shared wall. A shallow lap goes on the small room's edge
  // (the big room gives up its strip); a deep one splits the difference.
  // Cutting only ever shrinks rooms, so this always settles.
  const smallFirst = small[lo] + small[hi] < big[lo] + big[hi];
  const [first, second] = smallFirst ? [small, big] : [big, small];
  const smallEdge = smallFirst ? small[hi] : small[lo];
  const bigEdge = smallFirst ? big[lo] : big[hi];
  const mid = (first[hi] + second[lo]) / 2;
  const candidates = deep ? [mid, smallEdge, bigEdge] : [smallEdge, mid, bigEdge];
  const ok = (p: number) => p - first[lo] >= MIN_ROOM_M && second[hi] - p >= MIN_ROOM_M;
  const p = r2(candidates.find(ok) ?? mid);
  first[hi] = p;
  second[lo] = p;
  return true;
}

/**
 * The final tidy: two walls a few centimetres apart facing each other along a
 * shared run are one wall. Stretch the smaller room's edge to meet the other —
 * only where that overlaps nothing — so it can only ever tidy, never break.
 */
function closeGaps(list: Rect[], tol: number): void {
  const clear = (r: Rect, self: Rect) =>
    !list.some(
      (o) =>
        o !== self &&
        overlapX(r, o) > EPS &&
        overlapY(r, o) > EPS &&
        !nestedIn(o, r) &&
        !nestedIn(r, o)
    );
  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    for (const a of list)
      for (const b of list) {
        if (a === b) continue;
        const [small, big] = area(a) <= area(b) ? [a, b] : [b, a];
        if (small !== a) continue;
        const gapRight = big.x0 - small.x1;
        const gapLeft = small.x0 - big.x1;
        const gapDown = big.y0 - small.y1;
        const gapUp = small.y0 - big.y1;
        const tryEdge = (k: 'x0' | 'x1' | 'y0' | 'y1', v: number) => {
          const next = { ...small, [k]: v };
          if (clear(next, small)) {
            small[k] = v;
            changed = true;
          }
        };
        const near = (g: number) => g > EPS / 2 && g <= tol + 1e-6;
        if (overlapY(small, big) > 0.3) {
          if (near(gapRight)) tryEdge('x1', big.x0);
          else if (near(gapLeft)) tryEdge('x0', big.x1);
        }
        if (overlapX(small, big) > 0.3) {
          if (near(gapDown)) tryEdge('y1', big.y0);
          else if (near(gapUp)) tryEdge('y0', big.y1);
        }
      }
    if (!changed) break;
  }
}

/** Counts, for tests and for deciding whether a pass did anything. */
export function layoutFaults(rooms: LayoutRoom[]): { overlaps: number; nearMisses: number } {
  const byFloor = new Map<string, Rect[]>();
  rooms.forEach((r) => {
    const rect = rectOf(r);
    if (!rect) return;
    const f = r.room?.floor?.trim() ?? '';
    byFloor.set(f, [...(byFloor.get(f) ?? []), rect]);
  });
  let overlaps = 0;
  let nearMisses = 0;
  byFloor.forEach((rects) => {
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i];
        const b = rects[j];
        if (overlapX(a, b) > EPS && overlapY(a, b) > EPS && !nestedIn(a, b) && !nestedIn(b, a))
          overlaps++;
        // Two walls side by side, 3–30 cm apart, facing each other along a shared run.
        const near = (p: number, q: number) =>
          Math.abs(p - q) > EPS && Math.abs(p - q) <= ALIGN_TOL_M;
        if (overlapY(a, b) > 0.3 && (near(a.x1, b.x0) || near(b.x1, a.x0))) nearMisses++;
        if (overlapX(a, b) > 0.3 && (near(a.y1, b.y0) || near(b.y1, a.y0))) nearMisses++;
      }
  });
  return { overlaps, nearMisses };
}

/**
 * Tidy a plan's rooms. `precise` is for rooms already placed on the
 * architect's own lines (a PDF with an underlay): they are left where the
 * drawing puts them and only true overlaps are resolved.
 */
export function tidyRooms<T extends LayoutRoom>(
  rooms: T[],
  options: { precise?: boolean } = {}
): T[] {
  const rects = rooms.map(rectOf);
  // "Ground floor" and "Ground Floor " are one floor.
  const keyOf = (r: LayoutRoom) => r.room?.floor?.trim().toLowerCase() ?? '';
  const floors = new Map<string, Rect[]>();
  rooms.forEach((r, i) => {
    const rect = rects[i];
    if (rect && keyOf(r)) floors.set(keyOf(r), [...(floors.get(keyOf(r)) ?? []), rect]);
  });
  // A room the reader gave no floor belongs with the floor it sits on — as a
  // group of its own it was pushed clear of the building (stairs 16 m away).
  const box = (list: Rect[]) => ({
    x0: Math.min(...list.map((r) => r.x0)),
    y0: Math.min(...list.map((r) => r.y0)),
    x1: Math.max(...list.map((r) => r.x1)),
    y1: Math.max(...list.map((r) => r.y1)),
  });
  const named = [...floors.entries()].map(([k, list]) => ({ k, b: box(list) }));
  rooms.forEach((r, i) => {
    const rect = rects[i];
    if (!rect || keyOf(r)) return;
    const home = named
      .map((n) => ({ k: n.k, a: overlapArea(rect, n.b) }))
      .sort((m, n) => n.a - m.a)[0];
    const k = home && home.a > 0 ? home.k : '';
    floors.set(k, [...(floors.get(k) ?? []), rect]);
  });

  floors.forEach((list) => {
    // Work in whole centimetres throughout, so what is written out (to the
    // centimetre) is exactly what was checked for overlaps.
    list.forEach((r) => {
      r.x0 = r2(r.x0);
      r.y0 = r2(r.y0);
      r.x1 = r2(r.x1);
      r.y1 = r2(r.y1);
    });
    const locked = new Set<Rect>();
    const tol = options.precise ? 0.08 : ALIGN_TOL_M;
    for (let pass = 0; pass < 12; pass++) {
      alignAxis(list, 'x', tol, locked);
      alignAxis(list, 'y', tol, locked);
      let changed = false;
      // Smallest rooms first: they are the ones most worth keeping intact.
      const order = [...list].sort((a, b) => area(a) - area(b));
      for (let i = 0; i < order.length; i++)
        for (let j = i + 1; j < order.length; j++)
          if (resolvePair(order[i], order[j], list, options.precise)) changed = true;
      if (!changed) break;
    }
    // Last word goes to overlaps: aligning can nudge an edge back over a
    // neighbour, so finish with resolution alone, which only ever shrinks.
    // (Run twice, re-aligning in between: a cut can leave an edge a few
    // centimetres off its neighbours, which reads as a doubled wall.)
    for (let round = 0; round < 3; round++) {
      if (round > 0) {
        alignAxis(list, 'x', tol, locked);
        alignAxis(list, 'y', tol, locked);
      }
      for (let pass = 0; pass < 40; pass++) {
        let changed = false;
        const order = [...list].sort((a, b) => area(a) - area(b));
        for (let i = 0; i < order.length; i++)
          for (let j = i + 1; j < order.length; j++)
            if (
              overlapX(order[i], order[j]) > EPS &&
              overlapY(order[i], order[j]) > EPS &&
              !nestedIn(order[i], order[j]) &&
              !nestedIn(order[j], order[i]) &&
              resolvePair(order[i], order[j], list, true)
            )
              changed = true;
        if (!changed) break;
      }
    }
    if (!options.precise) closeGaps(list, tol);
  });

  // Floors side by side must not run into each other.
  const floorBoxes = [...floors.entries()].map(([name, list]) => ({
    name,
    list,
    x0: Math.min(...list.map((r) => r.x0)),
    x1: Math.max(...list.map((r) => r.x1)),
    y0: Math.min(...list.map((r) => r.y0)),
    y1: Math.max(...list.map((r) => r.y1)),
  }));
  // Each floor against EVERY floor already placed, not just the one before
  // it — floors stacked above one another slipped past the old check.
  floorBoxes.sort((a, b) => a.x0 - b.x0 || a.y0 - b.y0);
  const placedFloors: typeof floorBoxes = [];
  for (const cur of floorBoxes) {
    for (let guard = 0; guard < floorBoxes.length + 1; guard++) {
      const hit = placedFloors.filter(
        (p) =>
          cur.x0 < p.x1 + FLOOR_GAP_M &&
          p.x0 < cur.x1 + FLOOR_GAP_M &&
          cur.y0 < p.y1 &&
          p.y0 < cur.y1
      );
      if (!hit.length) break;
      const dx = r2(Math.max(...hit.map((p) => p.x1)) + FLOOR_GAP_M - cur.x0);
      cur.list.forEach((r) => {
        r.x0 = r2(r.x0 + dx);
        r.x1 = r2(r.x1 + dx);
      });
      cur.x0 += dx;
      cur.x1 += dx;
    }
    placedFloors.push(cur);
  }

  return rooms.map((r, i) => {
    const rect = rects[i];
    if (!rect) return r;
    const w = r2(rect.x1 - rect.x0);
    const h = r2(rect.y1 - rect.y0);
    return {
      ...r,
      room: {
        ...r.room,
        origin: { ...r.room?.origin, x: r2(rect.x0), y: r2(rect.y0) },
        dimensions: { ...r.room?.dimensions, width: w, height: h },
      },
      walls: (r.walls?.length
        ? r.walls
        : [{ id: 'north' }, { id: 'east' }, { id: 'south' }, { id: 'west' }].map((x) => ({
            ...x,
            length: 0,
          }))
      ).map((wall) => ({ ...wall, length: wall.id === 'east' || wall.id === 'west' ? h : w })),
    };
  });
}
