import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from './symbols/symbolRegistry';

/** How near a wall a DRAGGED symbol must come before it catches. */
export const WALL_SNAP_THRESHOLD = 32;

/**
 * Distance from the wall centreline to the CENTRE of a mounted symbol.
 *
 * Symbol plates sit 6–10px below their own centre (baseline y=26–30 in a
 * 40-unit box), and the wall renders at WALL_THICKNESS+2 wide, so ~8 + 2.5
 * seats the plate on the wall face. The previous 14 left a visible gap that
 * made outlets read as floating near the wall rather than fixed to it.
 */
export const WALL_MOUNT_OFFSET = 11;

/** Keeps a mounted symbol clear of the corner where two walls meet. */
export const WALL_END_MARGIN = 12;

export interface WallSnapPlacement {
  x: number;
  y: number;
  rotation: number;
  projectedX: number;
  projectedY: number;
  wallId: string;
}

/**
 * True for symbols that belong ON a wall — sockets, switches, spurs, cooker
 * outlets, EV points, distribution boards. Lights and detectors are ceiling
 * items and stay wherever they are put.
 */
export const isWallMountSymbol = (symbolId?: string | null): boolean => {
  if (!symbolId) return false;
  const sym = symbolRegistry.find((entry) => entry.id === symbolId);
  return !!sym && (sym.mountType === 'wall' || sym.mountType === 'panel');
};

/**
 * Where a wall-mounted symbol should actually sit, given the walls on the
 * drawing.
 *
 * `alwaysSnap` drops the proximity threshold and takes the nearest wall
 * however far away it is. Placement uses it; dragging does not.
 *
 * The reason for the split: a socket, switch, spur or cooker outlet is by
 * definition on a wall, so tapping into the middle of a room and getting a
 * socket floating in mid-air is never what the electrician meant — it just
 * made finished drawings look thrown together. Dragging keeps the threshold so
 * anyone who deliberately pulls an outlet off the wall (a kitchen island, a
 * plant room) can still leave it there.
 */
export function computeWallSnap(
  x: number,
  y: number,
  symbolId: string | null | undefined,
  walls: CanvasObject[],
  { alwaysSnap = false }: { alwaysSnap?: boolean } = {}
): WallSnapPlacement | null {
  if (!isWallMountSymbol(symbolId)) return null;

  let best: (WallSnapPlacement & { distance: number }) | null = null;

  for (const wall of walls) {
    if (wall.type !== 'wall' || !wall.points || wall.points.length < 2) continue;

    const p1 = wall.points[0];
    const p2 = wall.points[1];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.hypot(dx, dy);
    if (length === 0) continue;

    const unitX = dx / length;
    const unitY = dy / length;
    const normalX = -unitY;
    const normalY = unitX;

    let t = ((x - p1.x) * dx + (y - p1.y) * dy) / (length * length);
    const marginRatio = Math.min(WALL_END_MARGIN / length, 0.2);
    t = Math.max(marginRatio, Math.min(1 - marginRatio, t));

    const projX = p1.x + t * dx;
    const projY = p1.y + t * dy;
    const distance = Math.hypot(x - projX, y - projY);

    if (!alwaysSnap && distance > WALL_SNAP_THRESHOLD) continue;

    const side = (x - projX) * normalX + (y - projY) * normalY >= 0 ? 1 : -1;
    const snapX = projX + normalX * WALL_MOUNT_OFFSET * side;
    const snapY = projY + normalY * WALL_MOUNT_OFFSET * side;

    // Turn the symbol so its plate lies flat on the wall and the device faces
    // INTO the room.
    //
    // Every wall-mounted symbol is drawn plate-at-the-bottom facing up: the
    // socket outlines put their baseline at y=26–30 of a 40-unit box with the
    // arc above it. So the symbol's own "into the room" direction is (0,-1),
    // and the angle we want is the one that maps (0,-1) onto the outward
    // normal — the wall-to-symbol direction, which is where the room is.
    //
    // The old formula was `atan2(dy, dx) + 90`, derived from the wall's
    // direction alone. That ignored `side`, so it was 90° out on every wall:
    // sockets on the top wall pointed right, ones on the right wall pointed
    // down. Symbols sat in the right PLACE but faced the wrong way, which is
    // what made finished drawings look thrown together.
    const outX = normalX * side;
    const outY = normalY * side;
    const rotation = Math.atan2(outX, -outY) * (180 / Math.PI);

    if (!best || distance < best.distance) {
      best = {
        x: snapX,
        y: snapY,
        rotation,
        projectedX: projX,
        projectedY: projY,
        wallId: wall.id,
        distance,
      };
    }
  }

  if (!best) return null;
  const { distance: _distance, ...placement } = best;
  return placement;
}

/** Two angles are the same heading once wrapped into 0–360. */
const sameAngle = (a: number, b: number): boolean => {
  const wrap = (deg: number) => ((deg % 360) + 360) % 360;
  return Math.abs(wrap(a) - wrap(b)) < 0.5;
};

/**
 * Re-seat every wall-mounted symbol in a drawing onto its nearest wall.
 *
 * Applied when a room is opened, because drawings saved before the rotation
 * fix carry symbols that are 90° out and standing off the wall — they were
 * stored with the bad angle, so correcting placement alone would have left
 * every existing plan looking wrong forever.
 *
 * Ceiling and floor items are untouched. Returns `changed: false` when nothing
 * moved, so callers can avoid marking a clean room dirty.
 */
export function resnapWallSymbols(objects: CanvasObject[]): {
  objects: CanvasObject[];
  changed: boolean;
} {
  const walls = objects.filter(
    (obj) => obj.type === 'wall' && obj.points && obj.points.length >= 2
  );
  if (walls.length === 0) return { objects, changed: false };

  let changed = false;
  const next = objects.map((obj) => {
    if (obj.type !== 'symbol' || !isWallMountSymbol(obj.symbolId)) return obj;

    const placement = computeWallSnap(obj.x, obj.y, obj.symbolId, walls, {
      alwaysSnap: true,
    });
    if (!placement) return obj;

    const moved =
      Math.abs(placement.x - obj.x) > 0.5 ||
      Math.abs(placement.y - obj.y) > 0.5 ||
      !sameAngle(placement.rotation, obj.rotation ?? 0);
    if (!moved) return obj;

    changed = true;
    return { ...obj, x: placement.x, y: placement.y, rotation: placement.rotation };
  });

  return changed ? { objects: next, changed } : { objects, changed: false };
}
