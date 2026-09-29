/**
 * Turn the AI reader's answer into canvas objects (walls, symbols, labels).
 *
 * This lived inside `DiagramCanvas.renderAIRoom`, where it could only be
 * exercised by drawing on a live Fabric canvas. As a pure function it can be
 * tested on real reader output, and the same objects can be produced outside
 * the page — which is how a plan is prepared for a customer who asked for one
 * to be loaded for them (Paddy / Elctric Ltd, 28 Sep 2026).
 *
 * Behaviour is unchanged from the canvas version, plus one addition: when the
 * plan spans several floors, each floor gets its heading above it.
 */
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from './symbols/symbolRegistry';
import { resolveSymbolId } from './symbols/symbolAliases';
import { SCALE } from './constants';
import { computeWallSnap, isWallMountSymbol } from './wallSnap';
import { designCircuits, type RoomFacts } from './circuitDesign';
import { tidyRooms } from './roomLayout';
import { labelSize } from './textMetrics';

/**
 * `origin` is the room's offset in metres from the top-left of the whole floor,
 * which is what lets a photographed plan come back as a floor rather than a
 * stack of rooms. `dimensions` are the sizes read off the drawing. `floor` is
 * set when the sheet showed more than one floor.
 */
export type RoomMeta = {
  name?: string;
  floor?: string;
  origin?: { x?: number; y?: number };
  dimensions?: { width?: number; height?: number; unit?: string };
};

export type AIRoomEntry = {
  room?: RoomMeta;
  walls?: { id?: string; length: number }[];
  symbols?: { type: string; wall?: string; position?: number | string }[];
};

export type AIPlanData = AIRoomEntry & {
  rooms?: AIRoomEntry[];
  /**
   * The architect's drawing, already placed (see underlay.ts). When present
   * the drawing IS the walls and the names: our walls become ghosts (kept only
   * for sockets to snap to) and our room labels and floor headings are left
   * off, because the drawing already carries its own.
   */
  underlayObjects?: CanvasObject[];
};

export const WALL_THICKNESS = 3;

export function aiPlanToObjects(roomData: AIPlanData, stamp: number = Date.now()): CanvasObject[] {
  const read =
    Array.isArray(roomData.rooms) && roomData.rooms.length > 0
      ? roomData.rooms
      : [{ room: roomData.room, walls: roomData.walls, symbols: roomData.symbols }];
  // One line per wall, no room drawn over another — whatever the reader
  // returned (see roomLayout.ts). With the architect's drawing underneath the
  // rooms are already on its lines, so only true overlaps are resolved.
  // Always, even for one room: it also makes walls and dimensions agree — a
  // single room sent with dimensions but no walls was drawn 4 × 4 m and
  // labelled with its real size.
  const plan = tidyRooms(read, { precise: !!roomData.underlayObjects?.length });

  const next: CanvasObject[] = [];

  plan.forEach((entry, roomIdx) => {
    const offsetX = 100 + (entry.room?.origin?.x ?? 0) * SCALE;
    const offsetY = 100 + (entry.room?.origin?.y ?? 0) * SCALE;
    const walls = entry.walls || [];
    const symbols = entry.symbols || [];

    /*
     * Walls are resolved BY ID, not by array position.
     *
     * This used to walk the array in order, moving a pen on from the
     * previous wall's end point, and then read the room's width and
     * height off `walls[0]` and `walls[1]`. Both assume the model returns
     * exactly north, east, south, west in that order. When it does not —
     * and asking for a whole floor at once makes that far more likely —
     * the rectangle is traced in the wrong order and comes out as an open
     * zig-zag, while the extents come off the wrong walls so every symbol
     * is placed against the wrong side of the room.
     *
     * Reading by id is order-independent, and a room missing one wall
     * still closes because the opposite wall supplies the length.
     */
    const wallLength = (id: string) => walls.find((w) => w.id === id)?.length;
    const widthM = wallLength('north') ?? wallLength('south') ?? 4;
    const heightM = wallLength('east') ?? wallLength('west') ?? 4;
    const roomWidth = widthM * SCALE;
    const roomHeight = heightM * SCALE;

    // Corners, clockwise from the room's top-left.
    const x0 = offsetX;
    const y0 = offsetY;
    const x1 = offsetX + roomWidth;
    const y1 = offsetY + roomHeight;

    [
      { from: { x: x0, y: y0 }, to: { x: x1, y: y0 } }, // north
      { from: { x: x1, y: y0 }, to: { x: x1, y: y1 } }, // east
      { from: { x: x1, y: y1 }, to: { x: x0, y: y1 } }, // south
      { from: { x: x0, y: y1 }, to: { x: x0, y: y0 } }, // west
    ].forEach((run, idx) => {
      next.push({
        id: `ai-wall-${roomIdx}-${idx}-${stamp}`,
        type: 'wall',
        x: run.from.x,
        y: run.from.y,
        points: [run.from, run.to],
      });
    });
    const SYMBOL_INSET = 4;

    /*
     * Spread symbols that land on the same spot.
     *
     * The model happily puts two accessories at the same wall position —
     * a real response for a kitchen placed `socket-cooker-45a` and
     * `socket-switched-fused-spur` both at north 1.5m — and they then
     * draw exactly on top of each other. One symbol is simply invisible,
     * and the drawing is wrong in a way the user cannot see.
     *
     * Each repeat of a wall+position is stepped along the wall instead.
     */
    const SYMBOL_SPREAD = 28;
    // A WC or en-suite under 1.8 m a side is drawn with smaller fittings, as a
    // drafter would at that scale — at full size five items fill the room.
    const symbolSize = Math.min(widthM, heightM) < 1.8 ? 24 : 30;
    const usedSlots = new Map<string, number>();
    // Ceiling items that asked for "center" are laid out on an even grid over
    // the room — how downlights are actually set out — instead of a row from
    // the middle that ran out through the wall of a narrow room.
    const centreCount = symbols.filter((sy) => sy.position === 'center').length;
    const cols = Math.max(
      1,
      Math.round(Math.sqrt((centreCount * widthM) / Math.max(heightM, 0.5)))
    );
    const gridCols = Math.min(cols, centreCount || 1);
    const gridRows = Math.max(1, Math.ceil(centreCount / gridCols));

    symbols.forEach((symbol, idx) => {
      // ELE-604: the AI sometimes emits ids suffixed with -bs7671, and
      // still uses names from the retired symbol list. `resolveSymbolId`
      // handles both, so a room comes back with everything that was asked
      // for rather than quietly missing items.
      const symbolId = resolveSymbolId(symbol.type);
      const known = symbolRegistry.some((s) => s.id === symbolId);
      if (!known) {
        console.warn(`[AI room] unknown symbol skipped: ${symbol.type} (resolved: ${symbolId})`);
        return;
      }

      let sx = offsetX + 20;
      let sy = offsetY + 20;

      /*
       * `position` arrives in three shapes, and all three are useful:
       *   "center"     — middle of the room
       *   "2.4"        — metres along the named wall
       *   "0.8, 1.4"   — an exact x,y in metres inside the room
       *
       * The pair is the model's own idea, and a good one: it places
       * ceiling items where they actually go instead of piling every
       * downlight on the centre point. It appeared once the response
       * schema was introduced, so it must be handled rather than
       * half-parsed — `parseFloat("0.8, 1.4")` quietly yields 0.8 and
       * throws the second number away.
       */
      const posText = typeof symbol.position === 'string' ? symbol.position : '';
      const pair = posText.split(',');
      const pairX = Number.parseFloat(pair[0]);
      const pairY = pair.length > 1 ? Number.parseFloat(pair[1]) : NaN;
      const isCoordinatePair = Number.isFinite(pairX) && Number.isFinite(pairY);

      if (isCoordinatePair) {
        sx = offsetX + pairX * SCALE;
        sy = offsetY + pairY * SCALE;
      } else if (symbol.position === 'center') {
        /*
         * Ceiling items all ask for "center", so a room with a light and
         * a detector stacks them on one point — a real kitchen response
         * put `light-ceiling` and `heat-detector` there, and the corridor
         * did the same with its smoke detector. Each additional centre
         * item is stepped to the side so all of them are visible and can
         * be dragged apart.
         */
        const k = usedSlots.get('center') ?? 0;
        usedSlots.set('center', k + 1);
        const row = Math.floor(k / gridCols);
        // The last row centres whatever it holds.
        const inRow = row === gridRows - 1 ? centreCount - row * gridCols : gridCols;
        const col = k % gridCols;
        sx = offsetX + ((col + 0.5) / inRow) * roomWidth;
        // A small named room keeps its top band for the name — in a 2 m
        // bathroom an even grid leaves the name nowhere to go.
        const band = entry.room?.name && widthM * heightM < 8 ? 0.34 : 0;
        sy = offsetY + (band + ((row + 0.5) / gridRows) * (1 - band)) * roomHeight;
      } else if (symbol.wall) {
        const slotKey = `${symbol.wall}:${symbol.position}`;
        const repeat = usedSlots.get(slotKey) ?? 0;
        usedSlots.set(slotKey, repeat + 1);
        /*
         * `position` arrives as a number or as a numeric string.
         *
         * The generator now constrains its output with a schema, and that
         * schema types this field as a string — so "1.5" is as likely as
         * 1.5. The old `typeof === 'number'` test silently turned every
         * string into 0 and stacked the whole room's accessories in the
         * corner. Parse, and fall back to 0 only when it really is not a
         * number.
         */
        const rawPos = symbol.position;
        const parsedPos =
          typeof rawPos === 'number' ? rawPos : Number.parseFloat(String(rawPos ?? ''));
        const rawMetres = Number.isFinite(parsedPos) ? parsedPos : 0;

        /*
         * Clamp to the wall it is actually on.
         *
         * The model can give a distance measured along the ROOM when the
         * accessory is on a short end wall. A real 21m x 3.4m corridor
         * came back with a two-way switch on the east wall at 20.5m — a
         * wall only 3.4m long — which drew the switch far outside the
         * building. Whatever the model meant, a symbol belonging to a
         * room must never render outside it, so the distance is held
         * inside the wall's own length.
         */
        const wallRunMetres = symbol.wall === 'north' || symbol.wall === 'south' ? widthM : heightM;
        const alongMetres = Math.min(Math.max(rawMetres, 0), wallRunMetres);
        const along = alongMetres * SCALE + repeat * SYMBOL_SPREAD;
        if (symbol.wall === 'north') {
          sx = offsetX + along;
          sy = offsetY + WALL_THICKNESS + SYMBOL_INSET;
        } else if (symbol.wall === 'south') {
          sx = offsetX + along;
          sy = offsetY + roomHeight - WALL_THICKNESS - SYMBOL_INSET - 20;
        } else if (symbol.wall === 'east') {
          sx = offsetX + roomWidth - WALL_THICKNESS - SYMBOL_INSET - 20;
          sy = offsetY + along;
        } else if (symbol.wall === 'west') {
          sx = offsetX + WALL_THICKNESS + SYMBOL_INSET;
          sy = offsetY + along;
        }
      }

      /*
       * Last-ditch spread. Anything that reached here without a wall, a
       * centre or a coordinate pair would otherwise sit on the same
       * default corner as every other such symbol — which is how three
       * bathroom downlights ended up as one.
       */
      if (!isCoordinatePair && symbol.position !== 'center' && !symbol.wall) {
        const fallbackRepeat = usedSlots.get('fallback') ?? 0;
        usedSlots.set('fallback', fallbackRepeat + 1);
        sx += fallbackRepeat * SYMBOL_SPREAD;
      }

      // Whatever was asked for, an item of this room is drawn in this room.
      const edge = Math.min(14, roomWidth / 2, roomHeight / 2);
      sx = Math.min(Math.max(sx, offsetX + edge), offsetX + roomWidth - edge);
      sy = Math.min(Math.max(sy, offsetY + edge), offsetY + roomHeight - edge);

      next.push({
        id: `ai-sym-${roomIdx}-${idx}-${stamp}`,
        type: 'symbol',
        x: sx,
        y: sy,
        // 30, not the hand-placed 40: drawn at ~0.7m rather than ~0.9m, so a
        // 2.8m bedroom is not two symbols wall to wall (see symbolScaleOf).
        width: symbolSize,
        height: symbolSize,
        rotation: 0,
        symbolId,
      });
    });

    // Room name as a real text object so it can be moved, edited or
    // deleted like anything else — it used to be baked into the canvas.
    if (entry.room?.name) {
      /*
       * The name goes INSIDE the room.
       *
       * It used to sit 40px above the top wall, which is fine for a
       * single room floating on an empty canvas. With a whole floor the
       * space above a room belongs to the room above it — on a real
       * six-room plan the corridor's label landed inside the kitchen and
       * bedroom one's landed inside the corridor. Inset from the top-left
       * corner, a label is always in the room it names.
       */
      /*
       * Name AND size. The model reads the dimensions off the drawing and
       * we were dropping them — an electrician pricing a rewire needs the
       * room size on the plan, and it is the first thing anyone checks a
       * generated plan against. Both are ordinary text objects, so either
       * can be moved, edited or deleted.
       */
      const dims = entry.room.dimensions;
      const sizeLabel = dims?.width && dims?.height ? `${dims.width} × ${dims.height} m` : null;

      next.push({
        id: `ai-title-${roomIdx}-${stamp}`,
        type: 'text',
        x: offsetX + 8,
        y: offsetY + 8,
        text: sizeLabel ? `${entry.room.name}\n${sizeLabel}` : entry.room.name,
      });
    }
  });

  /*
   * Floor headings. A CAD sheet often carries two floors side by side; without
   * a heading the first floor reads as more rooms of the ground floor.
   */
  const floors = new Map<string, { minX: number; minY: number }>();
  plan.forEach((entry) => {
    const floor = entry.room?.floor?.trim();
    if (!floor) return;
    const x = entry.room?.origin?.x ?? 0;
    const y = entry.room?.origin?.y ?? 0;
    const f = floors.get(floor);
    floors.set(floor, { minX: Math.min(f?.minX ?? x, x), minY: Math.min(f?.minY ?? y, y) });
  });
  const withUnderlay = !!roomData.underlayObjects?.length;
  if (floors.size > 1 && !withUnderlay) {
    let i = 0;
    floors.forEach((pos, floor) => {
      next.push({
        id: `ai-floor-${i++}-${stamp}`,
        type: 'text',
        x: 100 + pos.minX * SCALE,
        y: 100 + pos.minY * SCALE - 56,
        text: floor,
      });
    });
  }

  /*
   * Seat every wall-mounted item ON its wall, facing into the room — the same
   * routine a hand-placed socket goes through. The placement above positions
   * by an inset from the wall, which left sockets and switches standing a
   * little off it and unrotated; an electrician's drawing has them fixed to
   * the wall face.
   */
  let merged = mergeSharedWalls(next);
  if (withUnderlay) {
    // Only where the drawing actually lies: one page that failed to upload
    // used to ghost the walls and drop the names on every page.
    const sheets = roomData.underlayObjects!.map((u) => ({
      x0: u.x - 2,
      y0: u.y - 2,
      x1: u.x + (u.width ?? 0) + 2,
      y1: u.y + (u.height ?? 0) + 2,
    }));
    const covered = (x: number, y: number) =>
      sheets.some((b) => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1);
    merged = merged
      .filter((o) => !(o.id.startsWith('ai-title-') && covered(o.x, o.y)))
      .map((o) => {
        if (o.type !== 'wall' || !o.points || o.points.length < 2) return o;
        const [p, q] = o.points;
        return covered((p.x + q.x) / 2, (p.y + q.y) / 2) ? { ...o, ghost: true } : o;
      });
  }
  const seated = seatInOwnRoom(merged, plan);
  const laidOut = wireUp(declutter(seated, plan), plan, stamp);
  // The drawing first, so it sits under everything else.
  return withUnderlay ? [...roomData.underlayObjects!, ...laidOut] : laidOut;
}

/**
 * Give every item its circuit, the way an electrician would wire the building
 * (see circuitDesign.ts), and stamp each symbol with the room it serves so the
 * board schedule can always be rebuilt from the drawing itself.
 */
function wireUp(objects: CanvasObject[], plan: AIRoomEntry[], stamp: number): CanvasObject[] {
  const facts: (RoomFacts | undefined)[] = plan.map((entry, i) => {
    // An unnamed room still gets a name: without one its items were left off
    // every circuit and later took a neighbour's name and area.
    const name = entry.room?.name?.trim() || `Room ${i + 1}`;
    const w = entry.room?.dimensions?.width ?? 0;
    const h = entry.room?.dimensions?.height ?? 0;
    return {
      name,
      floor: entry.room?.floor?.trim() ?? '',
      areaM2: Math.round(w * h * 10) / 10,
      cx: (entry.room?.origin?.x ?? 0) + w / 2,
      cy: (entry.room?.origin?.y ?? 0) + h / 2,
    };
  });
  const roomIdxOf = (id: string) => {
    const m = /^ai-sym-(\d+)-\d+-/.exec(id);
    return m && id.endsWith(`-${stamp}`) ? Number(m[1]) : -1;
  };
  const roomOf = (id: string) => facts[roomIdxOf(id)];
  const symbols = objects.filter((o) => o.type === 'symbol');
  const { refs } = designCircuits(symbols, roomOf);
  return objects.map((o) => {
    if (o.type !== 'symbol') return o;
    const room = roomOf(o.id);
    const ref = refs.get(o.id);
    return {
      ...o,
      ...(ref ? { circuitRef: ref } : {}),
      ...(room
        ? {
            roomName: room.name,
            floor: room.floor,
            roomArea: room.areaM2,
            roomKey: `${stamp}:${roomIdxOf(o.id)}`,
          }
        : {}),
    };
  });
}

/**
 * Seat every wall-mounted item on a wall of ITS OWN room, facing into it.
 *
 * The general re-seat snaps to the nearest wall of any room. For an item the
 * reader put at a corner — a shaver point 1.18 m along a 1.18 m wall — the
 * neighbouring room's wall is just as near, and the item was drawn on the
 * outside face, in the next room. An item the reader placed belongs to its
 * room, so only that room's walls are candidates.
 */
function seatInOwnRoom(objects: CanvasObject[], plan: AIRoomEntry[]): CanvasObject[] {
  // Each room's own four walls, from its geometry. (The wall objects can't
  // be used: a shared wall is merged into one object under one room's id.)
  const own = plan.map((entry) => {
    const x0 = 100 + (entry.room?.origin?.x ?? 0) * SCALE;
    const y0 = 100 + (entry.room?.origin?.y ?? 0) * SCALE;
    const len = (id: string) => entry.walls?.find((w) => w.id === id)?.length;
    const x1 = x0 + (len('north') ?? len('south') ?? 4) * SCALE;
    const y1 = y0 + (len('east') ?? len('west') ?? 4) * SCALE;
    const wall = (a: { x: number; y: number }, b: { x: number; y: number }): CanvasObject => ({
      id: 'seat',
      type: 'wall',
      x: a.x,
      y: a.y,
      points: [a, b],
    });
    return {
      centre: { x: (x0 + x1) / 2, y: (y0 + y1) / 2 },
      walls: [
        wall({ x: x0, y: y0 }, { x: x1, y: y0 }),
        wall({ x: x1, y: y0 }, { x: x1, y: y1 }),
        wall({ x: x1, y: y1 }, { x: x0, y: y1 }),
        wall({ x: x0, y: y1 }, { x: x0, y: y0 }),
      ],
    };
  });
  return objects.map((o) => {
    const m = /^ai-sym-(\d+)-/.exec(o.id);
    const room = m && own[Number(m[1])];
    if (o.type !== 'symbol' || !room || !isWallMountSymbol(o.symbolId)) return o;
    const placement = computeWallSnap(o.x, o.y, o.symbolId, room.walls, {
      alwaysSnap: true,
      scale: (o.width ?? 40) / 40,
      towards: room.centre,
    });
    return placement ? { ...o, x: placement.x, y: placement.y, rotation: placement.rotation } : o;
  });
}

// ── Layout passes ──────────────────────────────────────────────────────────

/**
 * One wall where two rooms share one.
 *
 * Each room draws its own four walls, so a wall between two rooms was drawn
 * twice — and every wall carries a length label, so the drawing printed two
 * lengths on top of each other ("2.80m3.80m"). Collinear walls that overlap are
 * merged into a single segment spanning both.
 */
export function mergeSharedWalls(objects: CanvasObject[]): CanvasObject[] {
  const walls = objects.filter(
    (o) => o.type === 'wall' && o.id.startsWith('ai-wall-') && o.points?.length === 2
  );
  const others = objects.filter((o) => !walls.includes(o));
  type Seg = { id: string; fixed: number; a: number; b: number; horizontal: boolean };
  const segs: Seg[] = walls.map((w) => {
    const [p, q] = w.points!;
    const horizontal = Math.abs(p.y - q.y) < 0.5;
    return horizontal
      ? { id: w.id, fixed: p.y, a: Math.min(p.x, q.x), b: Math.max(p.x, q.x), horizontal }
      : { id: w.id, fixed: p.x, a: Math.min(p.y, q.y), b: Math.max(p.y, q.y), horizontal };
  });

  const out: CanvasObject[] = [];
  for (const horizontal of [true, false]) {
    const lines = new Map<number, Seg[]>();
    segs
      .filter((sg) => sg.horizontal === horizontal)
      .forEach((sg) => {
        const key = Math.round(sg.fixed);
        lines.set(key, [...(lines.get(key) ?? []), sg]);
      });
    lines.forEach((group) => {
      group.sort((m, n) => m.a - n.a);
      let cur = { ...group[0] };
      const flush = () => {
        const from = horizontal ? { x: cur.a, y: cur.fixed } : { x: cur.fixed, y: cur.a };
        const to = horizontal ? { x: cur.b, y: cur.fixed } : { x: cur.fixed, y: cur.b };
        // No printed length: the room's label carries its size (hideLength).
        out.push({
          id: cur.id,
          type: 'wall',
          x: from.x,
          y: from.y,
          points: [from, to],
          hideLength: true,
        });
      };
      for (const sg of group.slice(1)) {
        // Overlapping (not merely touching end to end) → the same wall.
        if (sg.a < cur.b - 1) cur.b = Math.max(cur.b, sg.b);
        else {
          flush();
          cur = { ...sg };
        }
      }
      flush();
    });
  }
  return [...out, ...others];
}

/** Half the footprint used for collision — symbols render ~48px across. */
const HALF = 14;

/**
 * Nothing on top of anything else.
 *
 * The reader places symbols without knowing where the room's name will go, and
 * the model often puts a light and a detector on the same point. Per room:
 *
 *   1. Wall items first — each slides along its own wall until clear.
 *   2. Ceiling items next — each moves to the nearest free spot in the room.
 *   3. The name last, in whichever corner (or the centre) is clearest. A room
 *      too small for a two-line label keeps just the name — the size is on the
 *      walls anyway. If even the best spot is crowded, the ceiling items in
 *      the way step aside for it; wall items cannot, they belong on the wall.
 */
export function declutter(objects: CanvasObject[], plan: AIRoomEntry[]): CanvasObject[] {
  const out = objects.map((o) => ({ ...o }));
  const multiFloor = new Set(plan.map((e) => e.room?.floor?.trim()).filter(Boolean)).size > 1;
  type Box = { x0: number; y0: number; x1: number; y1: number };
  const overlap = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
  const boxAt = (x: number, y: number, half = HALF): Box => ({
    x0: x - half,
    y0: y - half,
    x1: x + half,
    y1: y + half,
  });
  // Spacing scales with the drawn fitting: the smaller ones in a WC or
  // en-suite need less clearance than a 30-unit socket in a lounge.
  const halfOf = (o: CanvasObject) => Math.min(HALF, (o.width ?? 30) * 0.47);
  // Everything placed so far on the whole drawing — items either side of a
  // shared wall can collide too.
  const placed: Box[] = [];
  const hits = (b: Box, except?: Box) => placed.some((p) => p !== except && overlap(p, b));

  /*
   * The canvas prints every wall's length beside it — above a horizontal wall,
   * to the right of a vertical one (see the wall renderer in DiagramCanvas).
   * Those labels are drawn after this pass and knew nothing of it, so a room
   * name could land under "1.40m". Reserve their spots first.
   */
  for (const wall of out) {
    if (wall.type !== 'wall' || wall.points?.length !== 2 || wall.hideLength) continue;
    const [p, q] = wall.points;
    const midX = (p.x + q.x) / 2;
    const midY = (p.y + q.y) / 2;
    const vertical = Math.abs(p.x - q.x) < 0.5;
    placed.push(
      vertical
        ? { x0: midX + 4, y0: midY - 2, x1: midX + 44, y1: midY + 14 }
        : { x0: midX - 22, y0: midY - 19, x1: midX + 22, y1: midY - 5 }
    );
  }

  plan.forEach((entry, roomIdx) => {
    const wallLen = (id: string) => entry.walls?.find((w) => w.id === id)?.length;
    const w = (wallLen('north') ?? wallLen('south') ?? 4) * SCALE;
    const h = (wallLen('east') ?? wallLen('west') ?? 4) * SCALE;
    const rx0 = 100 + (entry.room?.origin?.x ?? 0) * SCALE;
    const ry0 = 100 + (entry.room?.origin?.y ?? 0) * SCALE;
    const rx1 = rx0 + w;
    const ry1 = ry0 + h;
    // Where a ceiling item may go: clear of the wall fittings in a normal
    // room, but scaled down in a small one — a fixed 22px inset left no room
    // at all in a WC, so a light could never step off the room's name.
    const insetX = Math.min(22, (rx1 - rx0) * 0.22);
    const insetY = Math.min(22, (ry1 - ry0) * 0.22);
    const ix0 = rx0 + insetX;
    const iy0 = ry0 + insetY;
    const ix1 = rx1 - insetX;
    const iy1 = ry1 - insetY;

    const edgeOf = (o: CanvasObject) => {
      const d = {
        north: Math.abs(o.y - ry0),
        south: Math.abs(o.y - ry1),
        west: Math.abs(o.x - rx0),
        east: Math.abs(o.x - rx1),
      };
      const [side, dist] = Object.entries(d).sort((m, n) => m[1] - n[1])[0];
      return dist <= 20 ? side : null;
    };

    const slide = (sym: CanvasObject, edge: string, avoid: (b: Box) => boolean) => {
      const alongX = edge === 'north' || edge === 'south';
      const lo = (alongX ? rx0 : ry0) + 22;
      const hi = (alongX ? rx1 : ry1) - 22;
      for (let k = 1; k <= 120; k++) {
        const step = Math.ceil(k / 2) * 8 * (k % 2 ? 1 : -1);
        const nx = alongX ? sym.x + step : sym.x;
        const ny = alongX ? sym.y : sym.y + step;
        const v = alongX ? nx : ny;
        if (v < lo || v > hi) continue;
        if (!avoid(boxAt(nx, ny, halfOf(sym)))) return { x: nx, y: ny };
      }
      return null;
    };
    const spiral = (sym: CanvasObject, avoid: (b: Box) => boolean) => {
      for (let r = 6; r <= 320; r += 6) {
        for (let k = 0; k < 24; k++) {
          const a = (k / 24) * Math.PI * 2;
          const nx = sym.x + Math.cos(a) * r;
          const ny = sym.y + Math.sin(a) * r;
          if (nx < ix0 || nx > ix1 || ny < iy0 || ny > iy1) continue;
          if (!avoid(boxAt(nx, ny, halfOf(sym)))) return { x: nx, y: ny };
        }
      }
      return null;
    };

    const mine = out.filter((o) => o.type === 'symbol' && o.id.startsWith(`ai-sym-${roomIdx}-`));
    const wallItems = mine.filter((o) => edgeOf(o));
    const ceilingItems = mine.filter((o) => !edgeOf(o));
    const boxes = new Map<CanvasObject, Box>();

    // 1: fittings — wall items first (the walls decide where those go), then
    // ceiling items; the name then finds the clearest spot among them.
    for (const sym of [...wallItems, ...ceilingItems]) {
      const edge = edgeOf(sym);
      if (hits(boxAt(sym.x, sym.y, halfOf(sym)))) {
        const spot = edge ? slide(sym, edge, (b) => hits(b)) : spiral(sym, (b) => hits(b));
        if (spot) {
          sym.x = Math.round(spot.x);
          sym.y = Math.round(spot.y);
        }
      }
      const b = boxAt(sym.x, sym.y, halfOf(sym));
      boxes.set(sym, b);
      placed.push(b);
    }

    // 2: the name, where it fits best.
    const title = out.find((o) => o.id.startsWith(`ai-title-${roomIdx}-`));
    if (!title?.text) return;
    // Arial's real widths: a flat width per character undersized capitals,
    // and "WC" ran across its own wall.
    const size = (text: string) => labelSize(text, 16);
    let text = title.text;
    // The floor heading above says which floor; "GF Bedroom 4" on the drawing
    // is "Bedroom 4" under a "Ground Floor" heading — a third shorter, which
    // is the difference between fitting a small room and not.
    if (multiFloor) text = text.replace(/^(GF|LG|\d+F) /, '');
    /*
     * Where the name goes, and how. Tried in order until one sits clear of
     * every fitting: name and size; name only; name only turned to read up
     * the room (how a drawing names a corridor narrower than its own name);
     * then the same at a smaller size. Each is tried at every position in the
     * room, preferring the centre. Rooms drawn inside this one (an en-suite in
     * a corridor) are off limits.
     */
    const pad = 6;
    const nameOnly = text.split('\n')[0];
    const variants = [
      { text, fs: 16, rot: 0 },
      // The size matters to whoever prices the job: smaller before it goes.
      { text, fs: 13, rot: 0 },
      { text, fs: 11, rot: 0 },
      { text: nameOnly, fs: 16, rot: 0 },
      { text: nameOnly, fs: 16, rot: -90 },
      { text: nameOnly, fs: 12, rot: 0 },
      { text: nameOnly, fs: 12, rot: -90 },
      // A cupboard-sized room: the name, small, is still better on the drawing
      // than under a fitting.
      { text: nameOnly, fs: 10, rot: 0 },
    ]
      // Turned text only where the room runs up the page — a corridor, not a kitchen.
      .filter((v) => v.rot === 0 || h > w * 1.4)
      .filter(
        (v, i, all) =>
          all.findIndex((o) => o.text === v.text && o.fs === v.fs && o.rot === v.rot) === i
      );
    const others: Box[] = plan
      .map((e, i) => {
        if (i === roomIdx) return null;
        const ox = 100 + (e.room?.origin?.x ?? 0) * SCALE;
        const oy = 100 + (e.room?.origin?.y ?? 0) * SCALE;
        const ow = (e.walls?.find((x) => x.id === 'north')?.length ?? 0) * SCALE;
        const oh = (e.walls?.find((x) => x.id === 'east')?.length ?? 0) * SCALE;
        return { x0: ox, y0: oy, x1: ox + ow, y1: oy + oh };
      })
      .filter(
        (b): b is Box => !!b && overlap(b, { x0: rx0 + 1, y0: ry0 + 1, x1: rx1 - 1, y1: ry1 - 1 })
      );
    const boxFor = (v: (typeof variants)[0], x: number, y: number): Box => {
      const { w: tw, h: th } = size(v.text);
      const lw2 = (tw * v.fs) / 16;
      const lh2 = (th * v.fs) / 16;
      return v.rot === 0
        ? { x0: x - pad / 2, y0: y - pad / 2, x1: x + lw2 + pad / 2, y1: y + lh2 + pad / 2 }
        : // Turned -90° about its top-left: reads upwards, body to the right.
          { x0: x - pad / 2, y0: y - lw2 - pad / 2, x1: x + lh2 + pad / 2, y1: y + pad / 2 };
    };
    const inside = (b: Box) =>
      b.x0 >= rx0 + 3 && b.y0 >= ry0 + 3 && b.x1 <= rx1 - 3 && b.y1 <= ry1 - 3;
    const crowdOf = (b: Box) =>
      placed.filter((p) => overlap(p, b)).length + others.filter((o) => overlap(o, b)).length * 2;
    const cx = (rx0 + rx1) / 2;
    const cy = (ry0 + ry1) / 2;
    let choice: { v: (typeof variants)[0]; x: number; y: number; score: number } | null = null;
    for (const [vi, v] of variants.entries()) {
      let bestHere: typeof choice = null;
      for (let x = rx0 + 6; x <= rx1 - 6; x += 6)
        for (let y = ry0 + 6; y <= ry1 - 6; y += 6) {
          const b = boxFor(v, x, y);
          if (!inside(b)) continue;
          const mx = (b.x0 + b.x1) / 2;
          const my = (b.y0 + b.y1) / 2;
          const score = crowdOf(b) * 1000 + Math.hypot(mx - cx, my - cy) / 10 + vi * 5;
          if (!bestHere || score < bestHere.score) bestHere = { v, x, y, score };
        }
      if (bestHere && (!choice || bestHere.score < choice.score)) choice = bestHere;
      if (choice && choice.score < 1000) break; // clear of everything — take it
    }
    let picked = choice ?? {
      v: { text: nameOnly, fs: 12, rot: 0 },
      x: rx0 + 4,
      y: ry0 + 4,
      score: 0,
    };

    /*
     * Nowhere clear. In a small room that is normal — the fittings fill it —
     * but most of this room's own fittings can move: a light can shift, a
     * socket can slide along its wall. So try spots in order of quality where
     * the name only covers THIS room's fittings, and take the first where
     * every one of them can actually be moved clear.
     */
    if (picked.score >= 1000) {
      const mine = new Set([...wallItems, ...ceilingItems].map((m) => boxes.get(m)!));
      const hard = (b: Box) =>
        placed.some((p) => !mine.has(p) && overlap(p, b)) || others.some((o) => overlap(o, b));
      const pool: { v: (typeof variants)[0]; x: number; y: number; cost: number }[] = [];
      variants.forEach((v, vi) => {
        for (let x = rx0 + 6; x <= rx1 - 6; x += 6)
          for (let y = ry0 + 6; y <= ry1 - 6; y += 6) {
            const b = boxFor(v, x, y);
            if (!inside(b) || hard(b)) continue;
            const covered = [...mine].filter((m) => overlap(m, b)).length;
            const mx = (b.x0 + b.x1) / 2;
            const my = (b.y0 + b.y1) / 2;
            pool.push({
              v,
              x,
              y,
              cost: covered * 100 + Math.hypot(mx - cx, my - cy) / 10 + vi * 5,
            });
          }
      });
      pool.sort((m, n) => m.cost - n.cost);
      for (const cand of pool.slice(0, 120)) {
        const lbc = boxFor(cand.v, cand.x, cand.y);
        const moves = new Map<CanvasObject, { x: number; y: number }>();
        const taken: Box[] = [];
        const ok = [...wallItems, ...ceilingItems].every((sym) => {
          const b = boxes.get(sym)!;
          if (!overlap(b, lbc)) return true;
          const edge = edgeOf(sym);
          const avoid = (nb: Box) =>
            overlap(nb, lbc) || hits(nb, b) || taken.some((t) => overlap(t, nb));
          const spot = edge ? slide(sym, edge, avoid) : spiral(sym, avoid);
          if (!spot) return false;
          moves.set(sym, spot);
          taken.push(boxAt(spot.x, spot.y, halfOf(sym)));
          return true;
        });
        if (!ok) continue;
        moves.forEach((spot, sym) => {
          const b = boxes.get(sym)!;
          sym.x = Math.round(spot.x);
          sym.y = Math.round(spot.y);
          const nb = boxAt(sym.x, sym.y, halfOf(sym));
          placed[placed.indexOf(b)] = nb;
          boxes.set(sym, nb);
        });
        picked = { ...cand, score: 0 };
        break;
      }
    }

    title.text = picked.v.text;
    title.x = Math.round(picked.x);
    title.y = Math.round(picked.y);
    if (picked.v.fs !== 16) title.fontSize = picked.v.fs;
    if (picked.v.rot) title.rotation = picked.v.rot;
    const lb = boxFor(picked.v, picked.x, picked.y);

    // Anything still under the name steps aside: wall items along their own
    // wall, ceiling items to the nearest free spot.
    for (const sym of [...wallItems, ...ceilingItems]) {
      const b = boxes.get(sym)!;
      if (!overlap(b, lb)) continue;
      const edge = edgeOf(sym);
      const avoid = (nb: Box) => overlap(nb, lb) || hits(nb, b);
      const spot = edge ? slide(sym, edge, avoid) : spiral(sym, avoid);
      if (spot) {
        sym.x = Math.round(spot.x);
        sym.y = Math.round(spot.y);
        const nb = boxAt(sym.x, sym.y, halfOf(sym));
        placed[placed.indexOf(b)] = nb;
        boxes.set(sym, nb);
      }
    }
    placed.push(lb);
  });
  return out;
}
