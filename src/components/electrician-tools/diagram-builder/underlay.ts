/**
 * Putting the architect's own drawing under the plan (28 Sep 2026).
 *
 * Redrawing a building as boxes loses everything that makes a drawing
 * professional — doors and their swings, windows, stairs, wall thickness. CAD
 * does not redraw: it lays the architect's drawing underneath (an xref) and the
 * electrical design goes on a layer above. This does the same:
 *
 *   1. `snapRoomsToLines` moves each room edge onto the real wall face drawn
 *      in the PDF, so sockets and switches land ON the architect's walls
 *      rather than 0.1–0.3 m off them where the reader boxed by eye.
 *   2. `buildUnderlays` crops each page to the plan (title block, legend and
 *      notes fall away), stores it privately, and places it at true scale.
 */
import { supabase } from '@/integrations/supabase/client';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import type { PlanLine } from '@/utils/pdfVectors';
import { SCALE } from './constants';

export interface ReaderUnderlay {
  page: number;
  cropPx: { x: number; y: number; w: number; h: number };
  metresPerPixel: number;
  atM: { x: number; y: number };
}

type Room = {
  room?: {
    origin?: { x?: number; y?: number };
    dimensions?: { width?: number; height?: number };
  };
  walls?: { id?: string; length: number }[];
};

/** How far a room edge may move to reach a wall face, in metres. */
const SNAP_TOLERANCE_M = 0.4;
/** A line must run alongside at least this share of the edge to count as its wall. */
const MIN_OVERLAP = 0.3;
const MIN_ROOM_M = 0.8;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Which page's crop a room sits in, by its centre. */
function pageOf(room: Room, underlays: ReaderUnderlay[]): ReaderUnderlay | undefined {
  const o = room.room?.origin;
  const d = room.room?.dimensions;
  if (!o || !d) return undefined;
  const cx = (o.x ?? 0) + (d.width ?? 0) / 2;
  const cy = (o.y ?? 0) + (d.height ?? 0) / 2;
  return underlays.find((u) => {
    const w = u.cropPx.w * u.metresPerPixel;
    const h = u.cropPx.h * u.metresPerPixel;
    return cx >= u.atM.x && cx <= u.atM.x + w && cy >= u.atM.y && cy <= u.atM.y + h;
  });
}

/**
 * Move every room edge onto the nearest drawn wall face alongside it.
 * Returns how many edges moved, for the progress display and for tests.
 */
export function snapRoomsToLines<T extends Room>(
  rooms: T[],
  underlays: ReaderUnderlay[],
  linesByPage: Map<number, PlanLine[]>
): { rooms: T[]; edgesMoved: number } {
  let edgesMoved = 0;
  const split = new Map<number, { v: PlanLine[]; h: PlanLine[] }>();
  linesByPage.forEach((lines, page) =>
    split.set(page, {
      v: lines.filter((l) => Math.abs(l.x1 - l.x2) < 0.75),
      h: lines.filter((l) => Math.abs(l.y1 - l.y2) < 0.75),
    })
  );

  const out = rooms.map((room) => {
    const u = pageOf(room, underlays);
    const lines = u && split.get(u.page);
    const o = room.room?.origin;
    const d = room.room?.dimensions;
    if (!u || !lines || !o || !d || d.width == null || d.height == null) return room;

    const mpp = u.metresPerPixel;
    const toPx = (mx: number, my: number) => ({
      x: u.cropPx.x + (mx - u.atM.x) / mpp,
      y: u.cropPx.y + (my - u.atM.y) / mpp,
    });
    const a = toPx(o.x ?? 0, o.y ?? 0);
    const b = toPx((o.x ?? 0) + d.width, (o.y ?? 0) + d.height);
    const tol = SNAP_TOLERANCE_M / mpp;

    /*
     * A wall is drawn as TWO lines, its faces. "Nearest line" can land on the
     * outer face, which puts sockets in the wall's thickness or beyond it. So:
     * find the nearest line, then take whichever face of that same wall (any
     * line within a wall's thickness of it) is furthest into the room.
     * `inward` is +1 when "into the room" means a larger coordinate.
     */
    const WALL_THICKNESS_PX = 0.45 / mpp;
    const nearest = (
      value: number,
      spanLo: number,
      spanHi: number,
      vertical: boolean,
      inward: 1 | -1
    ) => {
      const span = spanHi - spanLo;
      const runs = (l: PlanLine) => {
        const lo = Math.min(vertical ? l.y1 : l.x1, vertical ? l.y2 : l.x2);
        const hi = Math.max(vertical ? l.y1 : l.x1, vertical ? l.y2 : l.x2);
        return Math.min(hi, spanHi) - Math.max(lo, spanLo) >= MIN_OVERLAP * span;
      };
      const candidates = (vertical ? lines.v : lines.h).filter(
        (l) => Math.abs((vertical ? l.x1 : l.y1) - value) < tol && runs(l)
      );
      if (candidates.length === 0) return value;
      const pos = (l: PlanLine) => (vertical ? l.x1 : l.y1);
      const first = candidates.reduce((m, l) =>
        Math.abs(pos(l) - value) < Math.abs(pos(m) - value) ? l : m
      );
      const sameWall = candidates.filter((l) => Math.abs(pos(l) - pos(first)) <= WALL_THICKNESS_PX);
      const innerFace = sameWall.reduce(
        (m, l) => (pos(l) * inward > pos(m) * inward ? l : m),
        first
      );
      return pos(innerFace);
    };

    const left = nearest(a.x, a.y, b.y, true, 1);
    const right = nearest(b.x, a.y, b.y, true, -1);
    const top = nearest(a.y, a.x, b.x, false, 1);
    const bottom = nearest(b.y, a.x, b.x, false, -1);

    const w = (right - left) * mpp;
    const h = (bottom - top) * mpp;
    if (w < MIN_ROOM_M || h < MIN_ROOM_M) return room;
    edgesMoved += [left !== a.x, right !== b.x, top !== a.y, bottom !== b.y].filter(Boolean).length;

    const originX = r2(u.atM.x + (left - u.cropPx.x) * mpp);
    const originY = r2(u.atM.y + (top - u.cropPx.y) * mpp);
    return {
      ...room,
      room: {
        ...room.room,
        origin: { ...o, x: originX, y: originY },
        dimensions: { ...d, width: r2(w), height: r2(h) },
      },
      walls: room.walls?.map((wall) => ({
        ...wall,
        length: r2(wall.id === 'north' || wall.id === 'south' ? w : h),
      })),
    };
  });
  return { rooms: out, edgesMoved };
}

/**
 * A name from the file's content. SHA-256 where the browser offers it; a plain
 * FNV-1a over the bytes where it doesn't (crypto.subtle only exists on secure
 * origins — a phone testing over http on the LAN would otherwise lose every
 * drawing).
 */
async function contentHash(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)]
      .slice(0, 16)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < bytes.length; i++) {
    h1 = Math.imul(h1 ^ bytes[i], 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ bytes[bytes.length - 1 - i], 0x811c9dc5) >>> 0;
  }
  return `${h1.toString(16).padStart(8, '0')}${h2.toString(16).padStart(8, '0')}${bytes.length.toString(16)}`;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not open the page image'));
    img.src = src;
  });

/**
 * Crop each page to its plan, store it privately, and return the canvas
 * objects that lay it underneath at true scale. A page that cannot be stored is
 * skipped — the plan still draws, just without that page's drawing.
 */
export async function buildUnderlays(
  underlays: ReaderUnderlay[],
  pageImages: { dataUrl: string }[],
  userId: string
): Promise<CanvasObject[]> {
  const stamp = Date.now();
  const results = await Promise.all(
    underlays.map(async (u) => {
      const page = pageImages[u.page];
      if (!page) return null;
      try {
        const img = await loadImage(page.dataUrl);
        const canvas = document.createElement('canvas');
        canvas.width = u.cropPx.w;
        canvas.height = u.cropPx.h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          u.cropPx.x,
          u.cropPx.y,
          u.cropPx.w,
          u.cropPx.h,
          0,
          0,
          u.cropPx.w,
          u.cropPx.h
        );
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.9));
        if (!blob) return null;

        // Named by what is in it: reading the same drawing again (or again
        // after undoing) reuses the one file instead of storing another copy.
        const hash = await contentHash(blob);
        const path = `${userId}/floor-plan-underlays/${hash}.jpg`;
        const { error } = await supabase.storage
          .from('project-documents')
          .upload(path, blob, { contentType: 'image/jpeg', upsert: true });
        if (error) throw error;

        const obj: CanvasObject = {
          id: `underlay-${u.page}-${stamp}`,
          type: 'underlay',
          x: 100 + u.atM.x * SCALE,
          y: 100 + u.atM.y * SCALE,
          width: u.cropPx.w * u.metresPerPixel * SCALE,
          height: u.cropPx.h * u.metresPerPixel * SCALE,
          src: path,
        };
        return obj;
      } catch (err) {
        console.warn('[underlay] page', u.page + 1, 'not laid underneath:', err);
        return null;
      }
    })
  );
  return results.filter((o): o is CanvasObject => o !== null);
}
