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
const SNAP = 10;

const snap = (n: number) => Math.round(n / SNAP) * SNAP;
const snapPoint = (p: Point): Point => ({ x: snap(p.x), y: snap(p.y) });
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
 * Orthogonal cable route from `start` to `end` that avoids walls and hugs
 * walls when the endpoints sit on one. Returns at minimum [start, end] —
 * never null. Falls back to a straight line if no clean route is found.
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
    if (!pathCrossesWalls(c, walls, ignore)) return c;
  }

  return [start, end];
}

/** No-walls case: still produce a tidy L-shape rather than a diagonal. */
function manhattanFallback(start: Point, end: Point): Point[] {
  if (Math.abs(start.x - end.x) < 1 || Math.abs(start.y - end.y) < 1) {
    return [start, end];
  }
  const corner: Point = { x: end.x, y: start.y };
  return dedupePath([start, snapPoint(corner), end]);
}
