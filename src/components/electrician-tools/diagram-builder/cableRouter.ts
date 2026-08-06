import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';

export interface Point {
  x: number;
  y: number;
}

export interface WallSeg {
  p1: Point;
  p2: Point;
}

const HOST_WALL_THRESHOLD = 35;
const WALL_OFFSET = 10;
/**
 * Waypoints are TIDIED, not snapped to the grid.
 *
 * The route is orthogonal by construction: for an axis-aligned wall the exit
 * point shares one coordinate with the symbol it leaves, and each corner
 * shares a coordinate with its neighbours. Rounding every waypoint to the
 * drawing lattice independently DESTROYED that — it nudged the shared
 * coordinate by a fraction and left a tiny diagonal stub at each end, so a
 * cable run was never actually orthogonal. Sub-pixel at 1:1, a visible kink
 * zoomed in, and simply wrong on a drawing.
 *
 * Rounding to 3dp keeps coordinates that were equal still exactly equal, while
 * keeping float noise out of the serialised geometry.
 */
const tidy = (n: number): number => Math.round(n * 1000) / 1000;
const snapPoint = (p: Point): Point => ({ x: tidy(p.x), y: tidy(p.y) });
const ptEq = (a: Point, b: Point) =>
  Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5;

export function extractWalls(objects: CanvasObject[]): WallSeg[] {
  return objects
    .filter((o) => o.type === 'wall' && o.points && o.points.length >= 2)
    .map((o) => ({ p1: o.points![0], p2: o.points![1] }));
}

function closestPointOnSegment(p: Point, seg: WallSeg): Point {
  const dx = seg.p2.x - seg.p1.x;
  const dy = seg.p2.y - seg.p1.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return seg.p1;
  let t = ((p.x - seg.p1.x) * dx + (p.y - seg.p1.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return { x: seg.p1.x + t * dx, y: seg.p1.y + t * dy };
}

function pointToSegmentDist(p: Point, seg: WallSeg): number {
  const cp = closestPointOnSegment(p, seg);
  return Math.hypot(p.x - cp.x, p.y - cp.y);
}

export function findHostWall(p: Point, walls: WallSeg[]): WallSeg | null {
  let best: WallSeg | null = null;
  let bestDist = HOST_WALL_THRESHOLD;
  for (const w of walls) {
    const d = pointToSegmentDist(p, w);
    if (d < bestDist) {
      bestDist = d;
      best = w;
    }
  }
  return best;
}

/**
 * Project the symbol onto its host wall, then offset perpendicular by
 * WALL_OFFSET in whichever direction is closer to `towards` — that side is
 * the room interior.
 */
export function exitPoint(p: Point, hostWall: WallSeg, towards: Point): Point {
  const foot = closestPointOnSegment(p, hostWall);
  const wx = hostWall.p2.x - hostWall.p1.x;
  const wy = hostWall.p2.y - hostWall.p1.y;
  const len = Math.hypot(wx, wy) || 1;
  const nx = -wy / len;
  const ny = wx / len;
  const opt1 = { x: foot.x + nx * WALL_OFFSET, y: foot.y + ny * WALL_OFFSET };
  const opt2 = { x: foot.x - nx * WALL_OFFSET, y: foot.y - ny * WALL_OFFSET };
  const d1 = (opt1.x - towards.x) ** 2 + (opt1.y - towards.y) ** 2;
  const d2 = (opt2.x - towards.x) ** 2 + (opt2.y - towards.y) ** 2;
  return d1 < d2 ? opt1 : opt2;
}

/** Strict interior crossing — touching at endpoints does not count. */
function segmentsCross(a1: Point, a2: Point, b1: Point, b2: Point): boolean {
  const d = (a2.x - a1.x) * (b2.y - b1.y) - (a2.y - a1.y) * (b2.x - b1.x);
  if (Math.abs(d) < 1e-9) return false;
  const t =
    ((b1.x - a1.x) * (b2.y - b1.y) - (b1.y - a1.y) * (b2.x - b1.x)) / d;
  const u =
    ((b1.x - a1.x) * (a2.y - a1.y) - (b1.y - a1.y) * (a2.x - a1.x)) / d;
  const EPS = 0.01;
  return t > EPS && t < 1 - EPS && u > EPS && u < 1 - EPS;
}

function pathCrossesWalls(
  path: Point[],
  walls: WallSeg[],
  ignore: WallSeg[] = []
): boolean {
  for (let i = 0; i < path.length - 1; i++) {
    for (const w of walls) {
      if (ignore.includes(w)) continue;
      if (segmentsCross(path[i], path[i + 1], w.p1, w.p2)) return true;
    }
  }
  return false;
}

function pathLength(path: Point[]): number {
  let s = 0;
  for (let i = 0; i < path.length - 1; i++) {
    s += Math.hypot(path[i + 1].x - path[i].x, path[i + 1].y - path[i].y);
  }
  return s;
}

function dedupePath(path: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of path) {
    if (out.length === 0 || !ptEq(out[out.length - 1], p)) out.push(p);
  }
  return out;
}

/**
 * Force every segment onto an axis by inserting an elbow wherever a segment
 * is diagonal.
 *
 * The route is built orthogonal, but two things could reintroduce diagonals:
 * `dedupePath` collapsing a waypoint that sat within tolerance of its
 * neighbour (leaving that neighbour's slightly different coordinate joined to
 * a corner), and the no-clean-route fallback returning a bare `[start, end]`
 * straight line. Both produced a diagonal cable on a drawing that is supposed
 * to be orthogonal, so orthogonality is now enforced as a post-process and
 * holds for every path this module can return.
 *
 * ORDER MATTERS: always dedupe FIRST, then force. Deduping afterwards can
 * collapse a pair of points that differ slightly on both axes and put a
 * diagonal straight back in.
 */
const EPS = 0.001;
function forceOrthogonal(path: Point[]): Point[] {
  if (path.length < 2) return path;
  const out: Point[] = [path[0]];
  for (let i = 1; i < path.length; i++) {
    const prev = out[out.length - 1];
    const cur = path[i];
    const dx = Math.abs(cur.x - prev.x);
    const dy = Math.abs(cur.y - prev.y);
    if (dx > EPS && dy > EPS) {
      // Turn along the dominant axis first — the shorter leg becomes the
      // drop, which reads naturally on a floor plan.
      out.push(dx >= dy ? { x: cur.x, y: prev.y } : { x: prev.x, y: cur.y });
    }
    out.push(cur);
  }
  return out;
}

/**
 * Orthogonal cable route from `start` to `end` that avoids walls and hugs
 * walls when the endpoints sit on one. Returns at minimum [start, end] —
 * never null, and never with a diagonal segment.
 */
export function orthogonalRoute(
  start: Point,
  end: Point,
  walls: WallSeg[]
): Point[] {
  if (walls.length === 0) {
    return manhattanFallback(start, end);
  }

  const hostA = findHostWall(start, walls);
  const hostB = findHostWall(end, walls);
  const exitA = hostA ? exitPoint(start, hostA, end) : start;
  const exitB = hostB ? exitPoint(end, hostB, start) : end;
  const ignore = [hostA, hostB].filter(Boolean) as WallSeg[];

  const cornerH: Point = { x: exitB.x, y: exitA.y };
  const cornerV: Point = { x: exitA.x, y: exitB.y };

  const candidates: Point[][] = [
    [start, snapPoint(exitA), snapPoint(cornerH), snapPoint(exitB), end],
    [start, snapPoint(exitA), snapPoint(cornerV), snapPoint(exitB), end],
  ].map(dedupePath);

  candidates.sort((a, b) => pathLength(a) - pathLength(b));
  for (const c of candidates) {
    if (!pathCrossesWalls(c, walls, ignore)) return forceOrthogonal(dedupePath(c));
  }

  // No candidate avoided every wall. Prefer the shortest orthogonal route
  // anyway — a cable crossing a wall is normal, a diagonal one is not.
  return forceOrthogonal(dedupePath(candidates[0] ?? [start, end]));
}

/** No-walls case: still produce a tidy L-shape rather than a diagonal. */
function manhattanFallback(start: Point, end: Point): Point[] {
  // Near-aligned endpoints took a shortcut straight out of the function,
  // skipping the orthogonality guarantee — "within 1px" is not the same as
  // aligned, and the leftover fraction was a real (if tiny) diagonal.
  if (Math.abs(start.x - end.x) < 1 || Math.abs(start.y - end.y) < 1) {
    return forceOrthogonal([start, end]);
  }
  const corner: Point = { x: end.x, y: start.y };
  return forceOrthogonal(dedupePath([start, snapPoint(corner), end]));
}
