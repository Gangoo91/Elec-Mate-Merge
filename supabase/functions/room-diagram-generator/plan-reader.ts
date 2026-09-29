/**
 * Reading a whole drawn plan — two stages instead of one (Paddy / Elctric Ltd,
 * 28 Sep 2026).
 *
 * ── 🔴 WHY THIS EXISTS ────────────────────────────────────────────────────
 * The single-call reader asked the model to find every room AND measure it AND
 * position it in metres AND draw its walls and doors AND design its electrics,
 * all in one answer. Measured on Paddy's real drawing — a two-floor A3 CAD
 * sheet of a care home, ~32 rooms plus title block, legend and notes:
 *
 *   • one call at 2048px → 9 rooms found
 *   • one call at 3000px → 6 rooms found
 *
 * Resolution was not the problem. Given that much to write per room, the model
 * stops early and quietly returns a fraction of the floor.
 *
 * Stage 1 (vision) asks ONLY where the rooms are: a label and a box per room.
 * That is a few dozen tokens per room, and boxes are something Gemini is
 * genuinely good at. Positions and sizes then come from the boxes with ONE
 * scale for the whole sheet — so the layout is the drawing's layout, instead of
 * 32 independent guesses at an origin in metres.
 *
 * Stage 2 (text only) designs the electrics from that room list, in small
 * batches run in parallel, so no single answer is long enough to be cut short.
 */

import { AIProviderError, withRetry } from '../_shared/ai-providers.ts';

const MODEL = 'gemini-3.5-flash';
// The key goes in a header, never the URL: a failed request's message carries
// its URL, and those messages reach logs, Sentry and (formerly) the client.
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const geminiHeaders = (key: string) => ({ 'Content-Type': 'application/json', 'x-goog-api-key': key });

/**
 * Rooms per electrics call. Four, run in parallel: at eight per call a
 * 34-room plan took 48s for the electrics alone, because each answer is long.
 */
const ELECTRICS_BATCH = 4;

export const WALLS = ['north', 'east', 'south', 'west'] as const;
type Wall = (typeof WALLS)[number];

const KINDS = [
  'bedroom',
  'ensuite',
  'bathroom',
  'wc',
  'kitchen',
  'lounge',
  'dining',
  'office',
  'corridor',
  'hall',
  'landing',
  'stairs',
  'laundry',
  'store',
  'plant',
  'conservatory',
  'garage',
  'other',
] as const;
type Kind = (typeof KINDS)[number];

export interface PlanSymbol {
  type: string;
  wall?: Wall;
  position: string;
  heightFromFloor?: number;
}

export interface PlanRoom {
  room: {
    name: string;
    kind: Kind;
    floor: string;
    dimensions: { width: number; height: number; unit: 'm' };
    origin: { x: number; y: number };
  };
  walls: { id: Wall; length: number; features: { type: string; position: string; width: number }[] }[];
  symbols: PlanSymbol[];
}

/**
 * Where a page's own drawing sits under the plan (28 Sep 2026).
 *
 * The architect's drawing is the best possible picture of the building —
 * doors, swings, stairs, wall thickness — so rather than redraw it as boxes,
 * the client lays the page itself underneath the electrics, like an xref in
 * CAD. `cropPx` is the part of the page image to use (every room plus a
 * margin, so the title block, legend and notes fall away); `atM` is where
 * that crop's top-left corner sits in plan metres; `metresPerPixel` scales it.
 */
export interface PlanUnderlay {
  page: number;
  cropPx: { x: number; y: number; w: number; h: number };
  metresPerPixel: number;
  atM: { x: number; y: number };
}

export interface PlanResult {
  rooms: PlanRoom[];
  floors: string[];
  /** How the metres were arrived at — surfaced so a bad scale is diagnosable. */
  scale: { metresPerPixel: number; basis: 'estimates' | 'fallback' };
  underlays?: PlanUnderlay[];
}

// ── Stage 1: where are the rooms? ──────────────────────────────────────────

const INVENTORY_SCHEMA = {
  type: 'object',
  properties: {
    floors: {
      type: 'array',
      description: 'Each floor drawn on the sheet, by its heading. Empty if there is only one.',
      items: { type: 'string' },
    },
    rooms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: { type: 'string' },
          floor: { type: 'string' },
          kind: { type: 'string', enum: [...KINDS] },
          /*
           * An object with four named edges, not a [y0, x0, y1, x1] array.
           * An unbounded array let the model fall into repeating numbers inside
           * one box — Paddy's sheet at 3000px spent 13,657 output tokens
           * (≈400 per room, against ≈40 needed) and hit the ceiling. Fixed
           * named fields cannot run on.
           */
          box: {
            type: 'object',
            description: 'The room walls as edges, each 0-1000 across the WHOLE image (0 = top/left edge).',
            properties: {
              top: { type: 'integer' },
              left: { type: 'integer' },
              bottom: { type: 'integer' },
              right: { type: 'integer' },
            },
            required: ['top', 'left', 'bottom', 'right'],
          },
          /*
           * Whole centimetres, never decimals. Asked for metres as a `number`,
           * the model wrote "3.5522222222222224e000000…" and filled the rest of
           * its budget with zeros — a float-formatting loop that ended 8 of 12
           * readings of Paddy's sheet. Integers cannot run on like that.
           */
          width_cm: { type: 'integer', description: 'Real left-to-right width in whole centimetres.' },
          length_cm: { type: 'integer', description: 'Real top-to-bottom length in whole centimetres.' },
          door_walls: {
            type: 'array',
            items: { type: 'string', enum: [...WALLS] },
          },
        },
        required: ['label', 'floor', 'kind', 'box', 'width_cm', 'length_cm'],
      },
    },
  },
  required: ['rooms'],
};

const INVENTORY_PROMPT = `This image is a floor plan. It may be an architect's or CAD drawing, a hand sketch or a photo of one. A CAD sheet often shows SEVERAL floors side by side, plus a title block, a legend or key, notes and device symbols.

List EVERY enclosed room or space drawn on the plan: bedrooms, en-suites, bathrooms, WCs, kitchens, lounges, dining rooms, offices, corridors, halls, landings, stairwells, laundries, stores, plant rooms, conservatories. Include spaces with no written name (corridors, halls, stairs) under a plain descriptive label, and include rooms marked "No Access".

Do NOT list: the title block, the drawing border, the legend or key, notes panels, logos, QR codes, north arrows, scale bars, or any electrical or fire alarm symbols. Those are not rooms.

For each room give:
- label: the name written inside it, exactly as written — keep numbers and the drawing's own spelling ("Bedroom 12", "Dinning Room"). If nothing is written, a plain label such as "Corridor" or "Stairs".
- floor: the heading of the floor it sits under when the sheet shows more than one floor (for example "Ground Floor", "1st Floor"); otherwise "".
- kind: the closest type from the list.
- box: the room's walls as top, left, bottom and right edges, each normalised 0-1000 over the WHOLE image.
- width_cm and length_cm: your best estimate of the real left-to-right width and top-to-bottom length, in whole centimetres (3.5 m = 350). Use any dimensions written on the drawing. Otherwise judge from typical sizes: a single bedroom is about 3-4 m a side, an en-suite 1.5-2.5 m, a door opening about 0.8 m.
- door_walls: which sides of the box have a door opening (top = north, right = east, bottom = south, left = west).

Be exhaustive and systematic. Work across each floor from left to right and top to bottom so that nothing is skipped. A care home ground floor can have 25 or more rooms, and every one of them matters. List floors (by heading) in "floors" when there is more than one.`;

interface InventoryRoom {
  label: string;
  floor?: string;
  kind: string;
  box: { top: number; left: number; bottom: number; right: number };
  width_cm?: number;
  length_cm?: number;
  door_walls?: string[];
}

/** A complete reading's output ceiling. A clean read of ~30 rooms is ~2,800. */
const INVENTORY_MAX_TOKENS = 10000;

/**
 * Keep every complete room object from an answer that was cut off.
 *
 * When a reading loops, everything BEFORE the loop is usually good — Paddy's
 * looping runs had already listed most of the floor. Throwing that away for a
 * missing closing bracket wastes it, so this walks the text and keeps each
 * `{...}` inside `"rooms": [` that closes properly.
 */
export function salvageRooms(text: string): InventoryRoom[] {
  const start = text.indexOf('"rooms"');
  if (start < 0) return [];
  const open = text.indexOf('[', start);
  if (open < 0) return [];
  const out: InventoryRoom[] = [];
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objStart = -1;
  for (let i = open + 1; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '{') {
      if (depth === 0) objStart = i;
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0 && objStart >= 0) {
        try {
          out.push(JSON.parse(text.slice(objStart, i + 1)));
        } catch {
          /* a malformed room is skipped, not fatal */
        }
        objStart = -1;
      }
    } else if (c === ']' && depth === 0) break;
  }
  return out;
}

async function readOnce(
  mimeType: string,
  base64: string,
  geminiKey: string
): Promise<{ floors: string[]; rooms: InventoryRoom[]; truncated: boolean }> {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: geminiHeaders(geminiKey),
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ inlineData: { mimeType, data: base64 } }, { text: INVENTORY_PROMPT }],
        },
      ],
      generationConfig: {
        // Not near zero: very low temperatures make repetition loops likelier.
        temperature: 0.4,
        maxOutputTokens: INVENTORY_MAX_TOKENS,
        responseMimeType: 'application/json',
        responseSchema: INVENTORY_SCHEMA,
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    // 4xx other than rate limiting will not fix itself on a retry.
    const retryable = res.status === 429 || res.status >= 500;
    throw new AIProviderError(`Gemini vision error: ${res.status} - ${text}`, 'gemini', res.status, retryable);
  }
  const data = await res.json();
  const candidate = data?.candidates?.[0];
  console.log('[plan-reader] inventory', candidate?.finishReason, JSON.stringify(data?.usageMetadata ?? {}));
  const text: string = candidate?.content?.parts?.[0]?.text ?? '';
  if (!text) throw new Error('No response from Gemini vision');

  if (candidate?.finishReason === 'MAX_TOKENS') {
    console.warn('[plan-reader] cut off — head:', text.slice(0, 400), ' … tail:', text.slice(-300));
    return { floors: [], rooms: salvageRooms(text), truncated: true };
  }
  const parsed = JSON.parse(text);
  return {
    floors: Array.isArray(parsed.floors) ? parsed.floors : [],
    rooms: Array.isArray(parsed.rooms) ? parsed.rooms : [],
    truncated: false,
  };
}

const boxOf = (r: InventoryRoom) => r.box;
function overlap(a: InventoryRoom, b: InventoryRoom): number {
  const A = boxOf(a);
  const B = boxOf(b);
  if (!A || !B) return 0;
  const ix = Math.max(0, Math.min(A.right, B.right) - Math.max(A.left, B.left));
  const iy = Math.max(0, Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top));
  const inter = ix * iy;
  const area = (x: typeof A) => Math.max(0, x.right - x.left) * Math.max(0, x.bottom - x.top);
  const union = area(A) + area(B) - inter;
  return union > 0 ? inter / union : 0;
}

const norm = (s: string | undefined) => (s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * The same room, seen twice.
 *
 * Boxes overlapping by half are the same room whatever they are called. The
 * same name on the same floor needs far less: the two readings of Paddy's
 * first floor boxed its staircase slightly differently, and at a 50% bar it was
 * drawn twice, one on top of the other.
 */
function isSameRoom(a: InventoryRoom, b: InventoryRoom): boolean {
  const o = overlap(a, b);
  if (o >= 0.5) return true;
  return o >= 0.15 && norm(a.label) === norm(b.label) && norm(a.floor) === norm(b.floor);
}

/**
 * Two readings in parallel, merged.
 *
 * One reading of a dense sheet is not reliable on its own: on Paddy's plan the
 * same request found every room on one run and looped on the next. Two
 * independent readings cover each other — a room either one saw is kept, and a
 * room both saw (boxes overlapping by half or more) is kept once. They run side
 * by side, so this costs tokens, not time.
 */
async function takeInventory(
  mimeType: string,
  base64: string,
  geminiKey: string
): Promise<{ floors: string[]; rooms: InventoryRoom[] }> {
  const reads = await Promise.allSettled([
    withRetry(() => readOnce(mimeType, base64, geminiKey), { maxAttempts: 2, backoff: [1500] }),
    withRetry(() => readOnce(mimeType, base64, geminiKey), { maxAttempts: 2, backoff: [1500] }),
  ]);
  const ok = reads
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof readOnce>>> => r.status === 'fulfilled')
    .map((r) => r.value)
    // The fuller, untruncated reading leads; the other only adds what it lacks.
    .sort((a, b) => Number(a.truncated) - Number(b.truncated) || b.rooms.length - a.rooms.length);

  if (ok.length === 0) {
    const reason = (reads[0] as PromiseRejectedResult).reason;
    throw reason instanceof Error ? reason : new Error(String(reason));
  }

  const merged: InventoryRoom[] = [];
  for (const read of ok) {
    for (const room of read.rooms) {
      if (!merged.some((m) => isSameRoom(m, room))) merged.push(room);
    }
  }
  console.log(
    `[plan-reader] readings: ${ok.map((r) => `${r.rooms.length}${r.truncated ? ' (cut off)' : ''}`).join(' + ')} → ${merged.length} rooms`
  );
  if (merged.length === 0) throw new Error('No rooms found on the plan');
  return { floors: ok.find((r) => r.floors.length)?.floors ?? [], rooms: merged };
}

// ── Geometry: boxes → metres, one scale for the whole sheet ────────────────

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const round1 = (n: number) => Math.round(n * 10) / 10;
/** Positions to the centimetre — they have to land on the architect's walls. */
const round2 = (n: number) => Math.round(n * 100) / 100;

/** Short floor tag for names, so "Bedroom" on two floors stays distinguishable. */
export function floorTag(floor: string): string {
  const f = floor.toLowerCase();
  if (/basement|lower ground/.test(f)) return 'LG';
  if (/ground/.test(f)) return 'GF';
  const n = f.match(/(\d+)\s*(st|nd|rd|th)?/);
  if (n) return `${n[1]}F`;
  if (/first/.test(f)) return '1F';
  if (/second/.test(f)) return '2F';
  if (/third/.test(f)) return '3F';
  return floor.trim();
}

/**
 * Turn boxes into rooms in metres.
 *
 * Pixels are square, so a single metres-per-pixel figure serves both axes. It
 * is the MEDIAN of every room's own estimate (its estimated metres over its
 * pixel size), which makes one wildly misjudged room harmless. Without any
 * estimates, the typical room is assumed to be 3.2 m on its short side.
 */
export function layOut(
  inv: { floors: string[]; rooms: InventoryRoom[] },
  imageWidth: number,
  imageHeight: number
): Omit<PlanResult, 'rooms'> & {
  rooms: Omit<PlanRoom, 'symbols'>[];
  crop: { cropPx: PlanUnderlay['cropPx']; atM: PlanUnderlay['atM'] };
} {
  const valid = inv.rooms
    .map((r) => {
      const b = r.box;
      const edges = [b?.top, b?.left, b?.bottom, b?.right];
      if (!edges.every((v) => Number.isFinite(v))) return null;
      const [y0, x0, y1, x1] = edges.map((v) => Math.min(Math.max(v as number, 0), 1000));
      const wPx = ((x1 - x0) / 1000) * imageWidth;
      const hPx = ((y1 - y0) / 1000) * imageHeight;
      if (wPx < 4 || hPx < 4) return null;
      return { r, xPx: (x0 / 1000) * imageWidth, yPx: (y0 / 1000) * imageHeight, wPx, hPx };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);

  // The same room reported twice (identical box) — keep the first.
  const seen = new Set<string>();
  const rooms = valid.filter((v) => {
    const key = `${Math.round(v.xPx)}:${Math.round(v.yPx)}:${Math.round(v.wPx)}:${Math.round(v.hPx)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (rooms.length === 0) throw new Error('No readable rooms found on the plan');

  const ratios: number[] = [];
  for (const v of rooms) {
    const w = (v.r.width_cm ?? 0) / 100;
    const l = (v.r.length_cm ?? 0) / 100;
    if (w > 0.5 && w < 60) ratios.push(w / v.wPx);
    if (l > 0.5 && l < 60) ratios.push(l / v.hPx);
  }
  const basis: 'estimates' | 'fallback' = ratios.length >= 3 ? 'estimates' : 'fallback';
  const mpp =
    basis === 'estimates' ? median(ratios) : 3.2 / median(rooms.map((v) => Math.min(v.wPx, v.hPx)));

  const minX = Math.min(...rooms.map((v) => v.xPx));
  const minY = Math.min(...rooms.map((v) => v.yPx));

  // The drawing to lay underneath: every room plus a margin, clamped to the page.
  const pad = Math.max(0.02 * Math.max(imageWidth, imageHeight), 30);
  const cx0 = Math.max(0, minX - pad);
  const cy0 = Math.max(0, minY - pad);
  const cx1 = Math.min(imageWidth, Math.max(...rooms.map((v) => v.xPx + v.wPx)) + pad);
  const cy1 = Math.min(imageHeight, Math.max(...rooms.map((v) => v.yPx + v.hPx)) + pad);

  const floorsUsed = [...new Set(rooms.map((v) => (v.r.floor ?? '').trim()).filter(Boolean))];

  return {
    floors: floorsUsed.length ? floorsUsed : inv.floors.filter(Boolean),
    scale: { metresPerPixel: mpp, basis },
    crop: {
      cropPx: { x: Math.round(cx0), y: Math.round(cy0), w: Math.round(cx1 - cx0), h: Math.round(cy1 - cy0) },
      // Where the crop's corner sits relative to the layout origin (the first room's corner).
      atM: { x: round2((cx0 - minX) * mpp), y: round2((cy0 - minY) * mpp) },
    },
    rooms: rooms.map((v) => {
      const width = Math.max(round2(v.wPx * mpp), 0.8);
      const height = Math.max(round2(v.hPx * mpp), 0.8);
      const floor = (v.r.floor ?? '').trim();
      const name = (v.r.label || 'Room').trim();
      const kind = (KINDS as readonly string[]).includes(v.r.kind) ? (v.r.kind as Kind) : 'other';
      const doors = new Set((v.r.door_walls ?? []).filter((w): w is Wall => (WALLS as readonly string[]).includes(w)));
      return {
        room: {
          name,
          kind,
          floor,
          dimensions: { width, height, unit: 'm' as const },
          origin: { x: round2((v.xPx - minX) * mpp), y: round2((v.yPx - minY) * mpp) },
        },
        walls: WALLS.map((id) => ({
          id,
          length: id === 'north' || id === 'south' ? width : height,
          features: doors.has(id) ? [{ type: 'door', position: 'center', width: 0.8 }] : [],
        })),
      };
    }),
  };
}

/**
 * Make neighbouring rooms share exact wall lines.
 *
 * Each room is boxed on its own, so two rooms either side of one wall come
 * back a few centimetres apart or overlapping — drawn, that is a double wall
 * with a sliver between, or two walls crossing. Edges on the same floor that
 * lie within `tol` metres of each other are pulled to one shared line (their
 * average), which is what the drawing actually shows.
 *
 * A cluster is measured from its FIRST edge, so a run of edges 0.3 m apart
 * cannot chain into one; and a room never shrinks below 0.8 m.
 */
export function snapEdges<T extends { x: number; y: number; w: number; h: number; floor: string }>(
  rooms: T[],
  tol = 0.35
): T[] {
  const snapAxis = (values: number[]) => {
    const sorted = [...new Set(values)].sort((a, b) => a - b);
    const map = new Map<number, number>();
    let i = 0;
    while (i < sorted.length) {
      const start = sorted[i];
      const group: number[] = [];
      while (i < sorted.length && sorted[i] - start <= tol) group.push(sorted[i++]);
      const mean = round2(group.reduce((a, b) => a + b, 0) / group.length);
      group.forEach((v) => map.set(v, mean));
    }
    return map;
  };

  const out = rooms.map((r) => ({ ...r }));
  const floors = new Set(out.map((r) => r.floor));
  for (const floor of floors) {
    const onFloor = out.filter((r) => r.floor === floor);
    const xs = snapAxis(onFloor.flatMap((r) => [r.x, r.x + r.w]));
    const ys = snapAxis(onFloor.flatMap((r) => [r.y, r.y + r.h]));
    for (const r of onFloor) {
      const left = xs.get(r.x) ?? r.x;
      const right = xs.get(r.x + r.w) ?? r.x + r.w;
      const top = ys.get(r.y) ?? r.y;
      const bottom = ys.get(r.y + r.h) ?? r.y + r.h;
      if (right - left >= 0.8) {
        r.x = left;
        r.w = round2(right - left);
      }
      if (bottom - top >= 0.8) {
        r.y = top;
        r.h = round2(bottom - top);
      }
    }
  }
  return out;
}

/** Apply `snapEdges` to laid-out rooms, walls included. */
function alignRooms(rooms: LaidRoomShape[]): LaidRoomShape[] {
  const snapped = snapEdges(
    rooms.map((r, i) => ({
      i,
      floor: r.room.floor,
      x: r.room.origin.x,
      y: r.room.origin.y,
      w: r.room.dimensions.width,
      h: r.room.dimensions.height,
    }))
  );
  return snapped.map((b) => {
    const r = rooms[b.i];
    return {
      ...r,
      room: {
        ...r.room,
        origin: { x: b.x, y: b.y },
        dimensions: { ...r.room.dimensions, width: b.w, height: b.h },
      },
      walls: r.walls.map((w) => ({ ...w, length: w.id === 'north' || w.id === 'south' ? b.w : b.h })),
    };
  });
}
type LaidRoomShape = Omit<PlanRoom, 'symbols'>;

// ── Stage 2: electrics, in parallel batches ────────────────────────────────

const ELECTRICS_SCHEMA = {
  type: 'object',
  properties: {
    rooms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          index: { type: 'integer' },
          symbols: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: { type: 'string', description: 'One of the listed symbol IDs, exactly as given.' },
                wall: {
                  type: 'string',
                  enum: [...WALLS],
                  description: 'The wall it is mounted on. Omit for ceiling-mounted items.',
                },
                position: {
                  type: 'string',
                  description:
                    'Metres along the named wall from its start, e.g. "2.4", or "center" for a ceiling item. Never a coordinate pair.',
                },
                // Whole millimetres — see width_cm above for why never a decimal.
                heightFromFloor_mm: { type: 'integer' },
              },
              required: ['type', 'position'],
            },
          },
        },
        required: ['index', 'symbols'],
      },
    },
  },
  required: ['rooms'],
};

/**
 * Make every symbol land where it was meant to.
 *
 * - A ceiling item given one number ("2.0") means "2 m along the room". The
 *   canvas reads a bare number only against a wall, so without this a
 *   corridor's lights all fell back to the same corner. It becomes an x,y on
 *   the room's centre line, which the canvas places exactly.
 * - A wall item past the end of its wall (2 of 236 on Paddy's plan, e.g. 10.5 m
 *   along a 2 m wall) is held on the wall.
 */
export function placeSymbols(symbols: PlanSymbol[], width: number, height: number): PlanSymbol[] {
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return symbols.map((s) => {
    const pos = String(s.position ?? '').trim();
    const n = Number.parseFloat(pos);
    const isSingleNumber = Number.isFinite(n) && !pos.includes(',');
    if (!s.wall) {
      if (!isSingleNumber) return s;
      const along = Math.min(Math.max(n, 0), Math.max(width, height));
      const at = width >= height ? `${r2(along)}, ${r2(height / 2)}` : `${r2(width / 2)}, ${r2(along)}`;
      return { ...s, position: at };
    }
    if (!isSingleNumber) return s;
    const run = s.wall === 'north' || s.wall === 'south' ? width : height;
    return { ...s, position: String(r2(Math.min(Math.max(n, 0), run))) };
  });
}

/** A safe minimum when a batch cannot be designed — never an empty room. */
function fallbackSymbols(kind: Kind): PlanSymbol[] {
  const out: PlanSymbol[] = [{ type: 'light-ceiling', position: 'center' }];
  if (!['wc', 'ensuite', 'bathroom', 'store', 'plant'].includes(kind)) {
    out.push({ type: 'smoke-detector', position: 'center' });
  }
  return out;
}

async function designBatch(
  batch: { index: number; room: Omit<PlanRoom, 'symbols'> }[],
  rules: string,
  geminiKey: string,
  notes?: string
): Promise<Map<number, PlanSymbol[]>> {
  const list = batch
    .map(({ index, room }) => {
      const doors = room.walls.filter((w) => w.features.length).map((w) => w.id);
      return `${index}. ${room.room.name} (${room.room.kind}) — ${room.room.dimensions.width} m wide (north/south walls) x ${room.room.dimensions.height} m long (east/west walls)${doors.length ? `, door on ${doors.join(' and ')}` : ''}`;
    })
    .join('\n');

  const prompt = `Design a complete UK electrical layout for each of these rooms. They are rooms of one building, read from its floor plan.

ROOMS:
${list}
${
  notes?.trim()
    ? `
WHAT THE ELECTRICIAN ASKED FOR (follow it where it applies to these rooms; it overrides the typical layout):
${notes.trim().slice(0, 2000)}
`
    : ''
}
${rules}

Return one entry per room, using its number as "index". Wall positions are metres along that wall, as text ("2.4"), and must be within its length. Give mounting heights in whole millimetres (heightFromFloor_mm: 450 for a socket, 1200 for a switch). Every room gets at least its lighting and switching.`;

  const out = await withRetry(
    async () => {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: geminiHeaders(geminiKey),
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 16000,
            // Laying out sockets and lights to written rules needs little
            // deliberation; default thinking made this the slow half of a read.
            thinkingConfig: { thinkingLevel: 'low' },
            responseMimeType: 'application/json',
            responseSchema: ELECTRICS_SCHEMA,
          },
        }),
      });
      if (!res.ok) {
        const retryable = res.status === 429 || res.status >= 500;
        throw new AIProviderError(`Gemini error: ${res.status}`, 'gemini', res.status, retryable);
      }
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('No electrics returned');
      return JSON.parse(text) as {
        rooms: { index: number; symbols: (Omit<PlanSymbol, 'heightFromFloor'> & { heightFromFloor_mm?: number })[] }[];
      };
    },
    { maxAttempts: 2, backoff: [1000] }
  );

  const byIndex = new Map<number, PlanSymbol[]>();
  for (const r of out.rooms ?? []) {
    if (!Array.isArray(r.symbols)) continue;
    byIndex.set(
      r.index,
      r.symbols.map(({ heightFromFloor_mm, ...sym }) => ({
        ...sym,
        ...(Number.isFinite(heightFromFloor_mm) ? { heightFromFloor: (heightFromFloor_mm as number) / 1000 } : {}),
      }))
    );
  }
  return byIndex;
}

// ── Image size, read from the bytes ────────────────────────────────────────

/** Width and height of a JPEG or PNG, without decoding it. */
export function imageSize(bytes: Uint8Array): { width: number; height: number } | null {
  // PNG: IHDR is always the first chunk.
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset);
    return { width: dv.getUint32(16), height: dv.getUint32(20) };
  }
  // JPEG: walk the segments to the first start-of-frame marker.
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let i = 2;
    while (i + 9 < bytes.length) {
      if (bytes[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = bytes[i + 1];
      const len = (bytes[i + 2] << 8) | bytes[i + 3];
      const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSof) {
        return { height: (bytes[i + 5] << 8) | bytes[i + 6], width: (bytes[i + 7] << 8) | bytes[i + 8] };
      }
      i += 2 + len;
    }
  }
  return null;
}

// ── The whole read ─────────────────────────────────────────────────────────

type LaidRoom = Omit<PlanRoom, 'symbols'>;

/**
 * What the reader is doing right now, for a live progress display. A 40-second
 * wait behind a spinner feels broken; "found 34 rooms on 2 floors — designing
 * the electrics, 12 of 34" feels like work being done.
 */
export type PlanProgress =
  | { stage: 'reading'; pages: number }
  | { stage: 'rooms'; rooms: number; floors: string[] }
  | { stage: 'electrics'; done: number; total: number };
export type OnProgress = (p: PlanProgress) => void;

/**
 * Name rooms by floor, once, across the whole result — a multi-page PDF has one
 * floor per page, so this cannot be decided page by page.
 */
function tagFloors(rooms: LaidRoom[]): LaidRoom[] {
  const floors = new Set(rooms.map((r) => r.room.floor).filter(Boolean));
  if (floors.size < 2) return rooms;
  return rooms.map((r) => {
    const tag = r.room.floor ? floorTag(r.room.floor) : '';
    const name = tag && !r.room.name.startsWith(tag) ? `${tag} ${r.room.name}` : r.room.name;
    return { ...r, room: { ...r.room, name } };
  });
}

/** Stage 2 for any source: electrics in parallel batches, then placement. */
async function addElectrics(
  laidRooms: LaidRoom[],
  rules: string,
  geminiKey: string,
  notes?: string,
  onProgress?: OnProgress
): Promise<PlanRoom[]> {
  const indexed = laidRooms.map((room, index) => ({ index, room }));
  const batches: (typeof indexed)[] = [];
  for (let i = 0; i < indexed.length; i += ELECTRICS_BATCH) batches.push(indexed.slice(i, i + ELECTRICS_BATCH));

  let done = 0;
  onProgress?.({ stage: 'electrics', done, total: indexed.length });
  const designed = await Promise.allSettled(
    batches.map((b) =>
      designBatch(b, rules, geminiKey, notes).finally(() => {
        done += b.length;
        onProgress?.({ stage: 'electrics', done, total: indexed.length });
      })
    )
  );
  const symbols = new Map<number, PlanSymbol[]>();
  designed.forEach((d) => {
    if (d.status === 'fulfilled') d.value.forEach((v, k) => symbols.set(k, v));
    else console.warn('[plan-reader] electrics batch failed, using fallback:', String(d.reason));
  });

  return indexed.map(({ index, room }) => ({
    ...room,
    symbols: placeSymbols(
      symbols.get(index)?.length ? symbols.get(index)! : fallbackSymbols(room.room.kind),
      room.room.dimensions.width,
      room.room.dimensions.height
    ),
  }));
}

export interface PlanPage {
  mimeType: string;
  base64: string;
  width?: number;
  height?: number;
}

/** Gap between sheets laid side by side, in metres. */
const SHEET_GAP_M = 4;

/**
 * Read one or more drawn pages — a single sheet, or an architect's pack with a
 * floor per page — into one plan. Pages are read in parallel and laid side by
 * side, left to right, in page order.
 */
export async function readPlan(
  pages: PlanPage[],
  geminiKey: string,
  rules: string,
  notes?: string,
  onProgress?: OnProgress
): Promise<PlanResult> {
  const t0 = Date.now();
  onProgress?.({ stage: 'reading', pages: pages.length });
  /*
   * Settled, not all-or-nothing: an architect's pack often opens with a cover
   * sheet or a schedule that has no rooms on it, and that page failing must not
   * sink the floors that did read. Only if EVERY page fails is it an error.
   */
  const settled = await Promise.allSettled(
    pages.map(async (page, p) => {
      const bytes = Uint8Array.from(atob(page.base64.slice(0, 200_000)), (c) => c.charCodeAt(0));
      const size =
        imageSize(bytes) ??
        (page.width && page.height ? { width: page.width, height: page.height } : { width: 1000, height: 1000 });
      const inventory = await takeInventory(page.mimeType, page.base64, geminiKey);
      const laid = layOut(inventory, size.width, size.height);
      // A page with no floor headings of its own, in a multi-page pack, is
      // still a separate sheet — name it so its rooms stay distinguishable.
      const fallbackFloor = pages.length > 1 ? `Sheet ${p + 1}` : '';
      return {
        ...laid,
        pageIndex: p,
        rooms: laid.rooms.map((r) => ({ ...r, room: { ...r.room, floor: r.room.floor || fallbackFloor } })),
      };
    })
  );
  const laidPages = settled
    .filter(
      (r): r is PromiseFulfilledResult<ReturnType<typeof layOut> & { pageIndex: number }> => r.status === 'fulfilled'
    )
    .map((r) => r.value);
  if (laidPages.length === 0) {
    const reason = (settled[0] as PromiseRejectedResult).reason;
    throw reason instanceof Error ? reason : new Error(String(reason));
  }
  settled.forEach((r, i) => {
    if (r.status === 'rejected') console.warn(`[plan-reader] page ${i + 1} skipped:`, String(r.reason));
  });

  // Side by side: each page starts where the previous one ended, plus a gap.
  let offsetX = 0;
  const allRooms: LaidRoom[] = [];
  const underlays: PlanUnderlay[] = [];
  for (const page of laidPages) {
    underlays.push({
      page: page.pageIndex,
      cropPx: page.crop.cropPx,
      metresPerPixel: page.scale.metresPerPixel,
      atM: { x: round2(page.crop.atM.x + offsetX), y: page.crop.atM.y },
    });
    const right = Math.max(...page.rooms.map((r) => r.room.origin.x + r.room.dimensions.width));
    allRooms.push(
      ...page.rooms.map((r) => ({
        ...r,
        room: { ...r.room, origin: { x: round2(r.room.origin.x + offsetX), y: r.room.origin.y } },
      }))
    );
    offsetX += right + SHEET_GAP_M;
  }
  const t1 = Date.now();
  onProgress?.({
    stage: 'rooms',
    rooms: allRooms.length,
    floors: [...new Set(allRooms.map((r) => r.room.floor).filter(Boolean))],
  });

  const rooms = await addElectrics(tagFloors(alignRooms(allRooms)), rules, geminiKey, notes, onProgress);
  console.log(`[plan-reader] timing: rooms ${t1 - t0}ms, electrics ${Date.now() - t1}ms, ${pages.length} page(s)`);

  const floors = [...new Set(allRooms.map((r) => r.room.floor).filter(Boolean))];
  return {
    floors,
    scale: laidPages[0]?.scale ?? { metresPerPixel: 0, basis: 'fallback' },
    rooms,
    underlays,
  };
}

// ── Described, not drawn ───────────────────────────────────────────────────

const DESCRIBED_SCHEMA = {
  type: 'object',
  properties: {
    rooms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: { type: 'string' },
          floor: { type: 'string' },
          kind: { type: 'string', enum: [...KINDS] },
          // Whole centimetres throughout — see width_cm on the inventory schema.
          x_cm: { type: 'integer', description: 'Left edge, cm from the left of this floor.' },
          y_cm: { type: 'integer', description: 'Top edge, cm from the top of this floor.' },
          width_cm: { type: 'integer' },
          length_cm: { type: 'integer' },
          door_walls: { type: 'array', items: { type: 'string', enum: [...WALLS] } },
        },
        required: ['label', 'floor', 'kind', 'x_cm', 'y_cm', 'width_cm', 'length_cm'],
      },
    },
  },
  required: ['rooms'],
};

const DESCRIBE_PROMPT = (description: string) => `An electrician has described a property (or one room of it). Lay it out as a floor plan.

THEIR DESCRIPTION:
"""
${description.slice(0, 4000)}
"""

Return every room they describe, and the circulation space that joins them (hall, landing, stairs) even if they did not mention it. If they describe a single room, return just that room.

For each room:
- label: its name ("Kitchen", "Bedroom 2", "En-suite").
- floor: "Ground Floor", "First Floor" and so on when the property has more than one floor; otherwise "".
- kind: the closest type from the list.
- width_cm and length_cm: the sizes they gave (4 by 3 metres = 400 x 300), otherwise typical UK sizes — a double bedroom about 350 x 350, a single 250 x 300, a family bathroom 200 x 250, a kitchen 300 x 400, a hall 120 wide.
- x_cm, y_cm: where its top-left corner sits on its floor, in whole centimetres from the top-left of that floor. Rooms that share a wall must touch exactly and NEVER overlap. Arrange them as a real house would be: rooms off a hall or landing, a stair on every floor of a house with more than one, an en-suite beside its bedroom.
- door_walls: which sides have a door (top = north, right = east, bottom = south, left = west) — normally the side facing the hall or landing.

Make it a believable building:
- The stairs occupy the SAME x_cm, y_cm and size on every floor: inside or beside the hall downstairs, opening onto the landing upstairs.
- Upper floors sit within the ground-floor footprint.
- A garage, conservatory or utility extension goes on an OUTSIDE edge of the house, never between rooms.
- Front rooms (lounge, porch, hall) along the top edge, rear rooms (kitchen, dining, garden-facing) along the bottom edge.`;

interface DescribedRoom {
  label: string;
  floor?: string;
  kind: string;
  x_cm: number;
  y_cm: number;
  width_cm: number;
  length_cm: number;
  door_walls?: string[];
}

/**
 * Remove any overlap the model left, one floor at a time.
 *
 * Asked to make rooms touch, a model mostly does — but one overlapping room
 * draws as a wall through the middle of another. Each room that overlaps an
 * already-placed one is moved right until it clears; the result stays close to
 * what was described and is always drawable.
 */
export function separate(rooms: { x: number; y: number; w: number; h: number }[]): void {
  const hits = (a: (typeof rooms)[0], b: (typeof rooms)[0]) =>
    a.x < b.x + b.w - 0.05 && b.x < a.x + a.w - 0.05 && a.y < b.y + b.h - 0.05 && b.y < a.y + a.h - 0.05;
  const placed: typeof rooms = [];
  for (const r of [...rooms].sort((a, b) => a.y - b.y || a.x - b.x)) {
    let guard = 0;
    let clash = placed.find((p) => hits(p, r));
    while (clash && guard++ < 200) {
      r.x = round1(clash.x + clash.w);
      clash = placed.find((p) => hits(p, r));
    }
    placed.push(r);
  }
}

export async function describePlan(
  description: string,
  geminiKey: string,
  rules: string,
  onProgress?: OnProgress
): Promise<PlanResult> {
  const t0 = Date.now();
  onProgress?.({ stage: 'reading', pages: 0 });
  const described = await withRetry(
    async () => {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: geminiHeaders(geminiKey),
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: DESCRIBE_PROMPT(description) }] }],
          generationConfig: {
            temperature: 0.4,
            /*
             * Thinking counts against this ceiling, and laying out a house is
             * where thinking earns its keep: with the believability rules in
             * the prompt, one run spent 9,600 of 10,000 tokens thinking and was
             * cut off after four rooms. The answer itself is ~1,500 tokens.
             */
            maxOutputTokens: 32000,
            responseMimeType: 'application/json',
            responseSchema: DESCRIBED_SCHEMA,
          },
        }),
      });
      if (!res.ok) {
        const retryable = res.status === 429 || res.status >= 500;
        throw new AIProviderError(`Gemini error: ${res.status}`, 'gemini', res.status, retryable);
      }
      const data = await res.json();
      const candidate = data?.candidates?.[0];
      console.log('[plan-reader] describe', candidate?.finishReason, JSON.stringify(data?.usageMetadata ?? {}));
      const text: string = candidate?.content?.parts?.[0]?.text ?? '';
      if (!text) throw new Error('No layout returned');
      let parsed: { rooms?: DescribedRoom[] };
      if (candidate?.finishReason === 'MAX_TOKENS') {
        console.warn('[plan-reader] describe cut off — tail:', text.slice(-300));
        parsed = { rooms: salvageRooms(text) as unknown as DescribedRoom[] };
      } else {
        parsed = JSON.parse(text);
      }
      const rooms = (parsed.rooms ?? []).filter(
        (r) => r.width_cm > 30 && r.length_cm > 30 && r.width_cm < 10000 && r.length_cm < 10000
      );
      if (rooms.length === 0) throw new Error('No rooms in the layout');
      return rooms;
    },
    { maxAttempts: 2, backoff: [1000] }
  );

  // Metres, overlaps removed per floor, floors side by side.
  const byFloor = new Map<string, DescribedRoom[]>();
  described.forEach((r) => {
    const f = (r.floor ?? '').trim();
    byFloor.set(f, [...(byFloor.get(f) ?? []), r]);
  });
  const laid: LaidRoom[] = [];
  let offsetX = 0;
  byFloor.forEach((rooms, floor) => {
    const boxes = rooms.map((r) => ({
      r,
      x: round1(Math.max(r.x_cm, 0) / 100),
      y: round1(Math.max(r.y_cm, 0) / 100),
      w: Math.max(round1(r.width_cm / 100), 0.8),
      h: Math.max(round1(r.length_cm / 100), 0.8),
    }));
    separate(boxes);
    const minX = Math.min(...boxes.map((b) => b.x));
    const minY = Math.min(...boxes.map((b) => b.y));
    for (const b of boxes) {
      const kind = (KINDS as readonly string[]).includes(b.r.kind) ? (b.r.kind as Kind) : 'other';
      const doors = new Set((b.r.door_walls ?? []).filter((w): w is Wall => (WALLS as readonly string[]).includes(w)));
      laid.push({
        room: {
          name: (b.r.label || 'Room').trim(),
          kind,
          floor,
          dimensions: { width: b.w, height: b.h, unit: 'm' },
          origin: { x: round1(b.x - minX + offsetX), y: round1(b.y - minY) },
        },
        walls: WALLS.map((id) => ({
          id,
          length: id === 'north' || id === 'south' ? b.w : b.h,
          features: doors.has(id) ? [{ type: 'door', position: 'center', width: 0.8 }] : [],
        })),
      });
    }
    offsetX += Math.max(...boxes.map((b) => b.x - minX + b.w)) + SHEET_GAP_M;
  });
  const t1 = Date.now();
  onProgress?.({
    stage: 'rooms',
    rooms: laid.length,
    floors: [...new Set(laid.map((r) => r.room.floor).filter(Boolean))],
  });

  // The description doubles as the brief for the electrics.
  const rooms = await addElectrics(tagFloors(alignRooms(laid)), rules, geminiKey, description, onProgress);
  console.log(`[plan-reader] described: ${rooms.length} rooms, layout ${t1 - t0}ms, electrics ${Date.now() - t1}ms`);
  return {
    floors: [...new Set(laid.map((r) => r.room.floor).filter(Boolean))],
    scale: { metresPerPixel: 0, basis: 'estimates' },
    rooms,
  };
}
