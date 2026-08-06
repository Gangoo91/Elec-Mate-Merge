import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas as FabricCanvas, Rect, Line, FabricText, FabricObject, Group, Circle, Path, Point, loadSVGFromString, util } from 'fabric';
import type { TPointerEventInfo, TPointerEvent } from 'fabric';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from './symbols/symbolRegistry';
import { electricalSymbols } from './symbols/electricalSymbols';
import { loadSymbolSvg } from './symbols/svgLoader';
import { extractWalls, orthogonalRoute } from './cableRouter';
import { SCALE, GRID_MINOR, GRID_MAJOR, snapToStep } from './constants';
import {
  computeWallSnap,
  isWallMountSymbol,
  WALL_MOUNT_OFFSET,
  type WallSnapPlacement,
} from './wallSnap';
import { isTypingContext, shouldAllowSpaceDefault, isInOverlay } from '@/utils/keyboardGuards';
import { ZoomIn, ZoomOut, Maximize2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHaptic } from '@/hooks/useHaptic';

// Minimap component — renders a small overview of the canvas
const MinimapOverlay = ({ fabricCanvas }: { fabricCanvas: FabricCanvas | null }) => {
  const minimapRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!minimapRef.current || !fabricCanvas) return;

    const el = minimapRef.current;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    el.width = 120;
    el.height = 80;

    const update = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, 120, 80);

      const mainEl = (fabricCanvas as any).lowerCanvasEl || fabricCanvas.getElement?.();
      if (!mainEl) return;

      const cw = fabricCanvas.width || 400;
      const ch = fabricCanvas.height || 600;
      const sx = 120 / cw;
      const sy = 80 / ch;
      const s = Math.min(sx, sy);
      const ox = (120 - cw * s) / 2;
      const oy = (80 - ch * s) / 2;

      ctx.drawImage(mainEl, ox, oy, cw * s, ch * s);

      // Viewport rectangle
      const vpt = fabricCanvas.viewportTransform;
      if (vpt) {
        const zoom = fabricCanvas.getZoom();
        ctx.strokeStyle = '#EAB308';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(
          ox + (-vpt[4] / zoom) * s,
          oy + (-vpt[5] / zoom) * s,
          (cw / zoom) * s,
          (ch / zoom) * s
        );
      }
    };

    // Coalesce to one repaint per frame.
    //
    // `update` blits the entire main canvas, and it is wired to object:added /
    // object:removed — which fire once PER OBJECT. The grid alone is ~80 line
    // objects and it is now rebuilt whenever the viewport moves, so a single
    // pan frame would otherwise trigger ~160 full-canvas blits.
    let frame: number | null = null;
    const scheduleUpdate = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        update();
      });
    };

    fabricCanvas.on('after:render', scheduleUpdate);
    fabricCanvas.on('object:modified', scheduleUpdate);
    fabricCanvas.on('object:added', scheduleUpdate);
    fabricCanvas.on('object:removed', scheduleUpdate);
    update();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      fabricCanvas.off('after:render', scheduleUpdate);
      fabricCanvas.off('object:modified', scheduleUpdate);
      fabricCanvas.off('object:added', scheduleUpdate);
      fabricCanvas.off('object:removed', scheduleUpdate);
    };
  }, [fabricCanvas]);

  return (
    <div className="absolute bottom-3 right-3 z-10">
      <div className="bg-black/70 backdrop-blur border border-white/20 rounded-lg overflow-hidden" style={{ width: 120, height: 80 }}>
        <canvas ref={minimapRef} style={{ width: 120, height: 80 }} />
      </div>
    </div>
  );
};

const WALL_THICKNESS = 3;
const SNAP_DISTANCE = 10; // px for wall endpoint snapping
const AXIS_SNAP_DEGREES = 10; // snap to horizontal/vertical within this angle

/**
 * Phase 4: door / window symbols cut walls at render time. Width in px
 * using the 52px = 1m scale. Realistic UK domestic door widths:
 *   - single internal door ≈ 0.8m  →  42px
 *   - double door           ≈ 1.6m →  84px
 *   - window                ≈ 1.0m →  52px
 * Symbols in the registry use `architectural` category; the IDs below
 * are what the user drags onto a wall.
 */
const FEATURE_WIDTH_PX: Record<string, number> = {
  'door-left': 42,
  'door-right': 42,
  'door-double': 84,
  'door-entry': 42,
  'door-release': 42,
  'window': 52,
};
const isWallFeature = (symbolId?: string | null): boolean =>
  !!symbolId && symbolId in FEATURE_WIDTH_PX;

interface DiagramCanvasProps {
  activeTool: string;
  selectedSymbolId: string | null;
  objects: CanvasObject[];
  onObjectsChange: (objects: CanvasObject[]) => void;
  onSelectionChange?: (object: CanvasObject | null) => void;
  /**
   * Fires when the user explicitly requests the PropertiesPanel for an
   * object. Driven by long-press (500ms) or double-tap. Single-tap is
   * selection only — it does NOT open the properties panel.
   */
  onRequestProperties?: (object: CanvasObject) => void;
  gridEnabled: boolean;
  snapEnabled: boolean;
  headerHeight?: number;
  toolbarHeight?: number;
  onWallTapped?: (wallId: string, currentLength: number, screenPos: { x: number; y: number }) => void;
  onRotate?: () => void;
  onToolChange?: (tool: string) => void;
  showMinimap?: boolean;
}

/** Convert pixel distance to metres string */
const pxToMetres = (px: number): string => {
  return (Math.abs(px) / SCALE).toFixed(2) + 'm';
};

// WALL_SNAP_THRESHOLD / WALL_MOUNT_OFFSET / WALL_END_MARGIN and the snap
// geometry itself live in ./wallSnap so the canvas and the re-seat pass share
// one implementation. Only WALL_MOUNT_OFFSET is needed here, for the
// "is this symbol sitting on that wall?" test used by the wall-feature logic.
const WALL_SNAP_GUIDE_COLOUR = '#EAB308';
const WALL_POINT_MATCH_TOLERANCE = 6;

/**
 * Fast state-hash for a CanvasObject. Replaces `JSON.stringify(obj)` with a direct
 * concat of the mutable render-affecting fields. ~10-20× faster on large canvases
 * because it avoids the string serialiser + key iteration that JSON.stringify pays.
 * Only used to detect whether a rendered Fabric object is still in sync with React state —
 * any property that doesn't affect rendering can be omitted safely.
 */
const serialiseCanvasObject = (obj: CanvasObject): string => {
  // Points array is the hot path for walls/lines — stringify only if present
  const points = obj.points ? obj.points.map((p) => `${p.x},${p.y}`).join(';') : '';
  return (
    `${obj.id}|${obj.type}|${obj.x ?? ''}|${obj.y ?? ''}|${obj.rotation ?? ''}|` +
    `${obj.width ?? ''}|${obj.height ?? ''}|${obj.symbolId ?? ''}|` +
    `${(obj as { text?: string }).text ?? ''}|${(obj as { color?: string }).color ?? ''}|${points}`
  );
};


/**
 * Pick a clear position for a circuit tag.
 *
 * A fixed offset only moves the collision — put the tag above and it lands on
 * whatever sits above. This walks candidate positions around the symbol
 * (above, below, right, left, then the diagonals) and takes the first that
 * does not sit on top of a neighbouring symbol, falling back to directly above
 * when a symbol is boxed in on every side.
 */
const TAG_RADIUS = 23;
const TAG_CLEARANCE = 15;
const findTagSpot = (
  target: CanvasObject,
  all: CanvasObject[]
): { x: number; y: number } => {
  const candidates = [
    { x: 0, y: -TAG_RADIUS },
    { x: 0, y: TAG_RADIUS },
    { x: TAG_RADIUS, y: 0 },
    { x: -TAG_RADIUS, y: 0 },
    { x: TAG_RADIUS * 0.75, y: -TAG_RADIUS * 0.75 },
    { x: -TAG_RADIUS * 0.75, y: -TAG_RADIUS * 0.75 },
    { x: TAG_RADIUS * 0.75, y: TAG_RADIUS * 0.75 },
    { x: -TAG_RADIUS * 0.75, y: TAG_RADIUS * 0.75 },
  ];
  const neighbours = all.filter(
    (o) => o.type === 'symbol' && o.id !== target.id
  );

  for (const c of candidates) {
    const px = target.x + c.x;
    const py = target.y + c.y;
    const clashes = neighbours.some(
      (n) => Math.abs(n.x - px) < TAG_CLEARANCE && Math.abs(n.y - py) < TAG_CLEARANCE
    );
    if (!clashes) return { x: px, y: py };
  }
  return { x: target.x, y: target.y - TAG_RADIUS };
};

// KNOWN GAP: lettering inside a mounted symbol rotates with it, so the cooker
// outlet's "C" reads sideways once the symbol faces into the room (same for
// EM, 2xEM, USB, D, T, SH, EXIT). Drawing convention is that labels stay
// horizontal whatever the device orientation.
//
// Counter-rotating the text child does NOT work on its own: SVG text imports
// with a top-left origin, so setting `angle` spins the glyph about its corner
// and throws it clear of the symbol — tried, and it looked worse than the
// sideways letter. Capturing the centre and restoring it across an origin
// change is the likely fix, but it needs to be seen on the canvas before it
// ships. The durable answer is probably to re-author the lettered SVGs so the
// glyph is a separate, rotation-exempt layer.

const cloneCanvasObjectWithOffset = (obj: CanvasObject, offset = 20): CanvasObject => ({
  ...obj,
  id: `obj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  x: obj.x + offset,
  y: obj.y + offset,
  points: obj.points?.map((point) => ({
    x: point.x + offset,
    y: point.y + offset,
  })),
});

const pointsMatch = (
  a: { x: number; y: number },
  b: { x: number; y: number },
  tolerance = WALL_POINT_MATCH_TOLERANCE
) => Math.abs(a.x - b.x) <= tolerance && Math.abs(a.y - b.y) <= tolerance;

/**
 * Rebuild the metric grid.
 *
 * Covers the visible WORLD area rather than a fixed rectangle in canvas
 * pixels: the old version drew the grid once at the canvas' own width/height,
 * so panning or zooming out took you off the edge of it and left you drawing
 * on blank white with no reference at all.
 *
 * Lines are drawn on exact 0.5m / 1m multiples so the squares are a usable
 * measuring reference that agrees with the on-screen scale bar.
 *
 * Single source of truth — this used to be copy-pasted three times (init,
 * gridEnabled toggle, and the AI room render) with subtly different values.
 */
const drawGrid = (canvas: FabricCanvas, enabled: boolean) => {
  const cache = canvas as FabricCanvas & { __gridKey?: string };

  if (!enabled) {
    if (cache.__gridKey === 'off') return;
    canvas
      .getObjects()
      .filter((obj) => (obj as { isGridLine?: boolean }).isGridLine)
      .forEach((obj) => canvas.remove(obj));
    cache.__gridKey = 'off';
    return;
  }

  const zoom = canvas.getZoom() || 1;
  const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
  const viewW = (canvas.width || 1200) / zoom;
  const viewH = (canvas.height || 600) / zoom;
  // World coordinate of the top-left corner of the viewport.
  const originX = -vpt[4] / zoom;
  const originY = -vpt[5] / zoom;

  // Coarsen as you zoom out rather than giving up. A fixed 0.5m spacing needs
  // ~460 lines at minimum zoom, so a naive cap simply deleted the grid at the
  // moment you most need a sense of scale. Step up 0.5m → 1m → 5m → 10m so the
  // line count stays bounded and the squares always mean a round distance.
  const MAX_LINES_PER_AXIS = 160;
  const steps = [GRID_MINOR, GRID_MAJOR, GRID_MAJOR * 5, GRID_MAJOR * 10];
  const span = Math.max(viewW, viewH) + GRID_MAJOR * 2;
  const step = steps.find((s) => span / s <= MAX_LINES_PER_AXIS) ?? steps[steps.length - 1];
  // Emphasise every metre at the fine step, every fifth line beyond it.
  // (`<=` here made major == step at the 1m step, so every line came out
  // emphasised and the grid read as a solid slab of heavy lines.)
  const majorEvery = step < GRID_MAJOR ? GRID_MAJOR : step * 5;

  // Overscan by two steps so a small pan doesn't reveal an unpainted edge
  // before the next redraw lands.
  const pad = step * 2;
  const left = Math.floor((originX - pad) / step) * step;
  const right = originX + viewW + pad;
  const top = Math.floor((originY - pad) / step) * step;
  const bottom = originY + viewH + pad;

  // Panning moves the viewport continuously, but the grid only actually
  // changes when it crosses a step boundary or the zoom step changes. Bail
  // early when the result would be identical — otherwise a drag rebuilt ~160
  // Fabric objects every frame to draw exactly the same lines.
  const key = `${step}|${left}|${top}|${Math.ceil(right)}|${Math.ceil(bottom)}`;
  if (cache.__gridKey === key) return;
  cache.__gridKey = key;

  canvas
    .getObjects()
    .filter((obj) => (obj as { isGridLine?: boolean }).isGridLine)
    .forEach((obj) => canvas.remove(obj));

  const addLine = (coords: [number, number, number, number], isMajor: boolean) => {
    const line = new Line(coords, {
      stroke: isMajor ? '#B0B0B0' : '#DCDCDC',
      strokeWidth: isMajor ? 1 : 0.5,
      selectable: false,
      evented: false,
    });
    (line as { isGridLine?: boolean }).isGridLine = true;
    canvas.add(line);
    canvas.sendObjectToBack(line);
  };

  // Emphasis is derived from the world coordinate, not a loop index, so major
  // lines stay locked to true metre multiples however the viewport has moved.
  const isMajorAt = (v: number) => Math.abs(v % majorEvery) < 0.01;

  for (let x = left; x <= right; x += step) addLine([x, top, x, bottom], isMajorAt(x));
  for (let y = top; y <= bottom; y += step) addLine([left, y, right, y], isMajorAt(y));
};

export const DiagramCanvas = forwardRef<any, DiagramCanvasProps>(
  ({ activeTool, selectedSymbolId, objects, onObjectsChange, onSelectionChange, onRequestProperties, gridEnabled, snapEnabled, headerHeight = 48, toolbarHeight = 56, onWallTapped, onRotate, onToolChange, showMinimap = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Flex-driven wrapper around the fabric canvas. We size the canvas from
    // this element's measured box rather than `window.innerHeight − constants`
    // so the safe-area inset and the real toolbar height are always accounted
    // for (the constants left a strip hidden under the toolbar on notched phones).
    const wrapperRef = useRef<HTMLDivElement>(null);
    const fabricCanvasRef = useRef<FabricCanvas | null>(null);
    // Drawing state as refs — avoids stale closures in event handlers and prevents
    // handler re-registration mid-gesture (fixes ELE-711, ELE-713, ELE-714)
    const isDrawingRef = useRef(false);
    const startPointRef = useRef<{ x: number; y: number } | null>(null);
    const undoStack = useRef<CanvasObject[][]>([]);
    const redoStack = useRef<CanvasObject[][]>([]);
    const clipboardRef = useRef<CanvasObject[]>([]);
    const wallSnapPreviewIdsRef = useRef<Set<string>>(new Set());
    const wallAdornmentIdsRef = useRef<Set<string>>(new Set());
    const selectedWallIdRef = useRef<string | null>(null);
    const wallDragPreviewRef = useRef<CanvasObject[] | null>(null);
    const dimensionStartRef = useRef<{ x: number; y: number } | null>(null);
    const cableStartIdRef = useRef<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    // Published once the Fabric canvas exists so children re-render with it.
    const [canvasReady, setCanvasReady] = useState<FabricCanvas | null>(null);
    // (An `aiRenderActiveRef` guard used to live here to suppress the object
    // sync during AI rendering. It never worked — it was cleared before React
    // re-rendered — and `renderAIRoom` is now state-only, so nothing to guard.)
    // Block single-finger handlers during multi-touch pinch/pan (ELE-712)
    const isTouchGestureRef = useRef(false);
    // Set while a desktop drag-pan is in progress. Shared at component scope
    // because pan and drawing are registered as SEPARATE mouse:down handlers
    // on the same canvas — without this, alt/space/middle-dragging to pan
    // while the wall tool was active would pan AND draw a wall at once.
    const isPanningRef = useRef(false);

    // Haptics. Read through a ref because the canvas event handlers are
    // registered once on mount, and useHaptic() returns a fresh object each
    // render. Snap feedback is fired on TRANSITION into a snap — pulsing every
    // frame while a symbol sits against a wall would be unbearable.
    const haptic = useHaptic();
    const hapticRef = useRef(haptic);
    hapticRef.current = haptic;
    /** Wall the symbol under the cursor is currently snapped to, for haptics. */
    const wasSnappedRef = useRef<string | null>(null);
    const wasEndpointSnappedRef = useRef(false);
    // Long-press + double-tap detection for PropertiesPanel gesture.
    // Single tap = select only. Long-press (500ms) or double-tap = open props.
    const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastTapRef = useRef<{ id: string; time: number } | null>(null);
    const mouseDownAtRef = useRef<{ x: number; y: number } | null>(null);

    // Ref mirrors for props — event handlers read current values without
    // needing to be in useEffect dependency arrays (register once, always fresh)
    const activeToolRef = useRef(activeTool);
    const selectedSymbolIdRef = useRef(selectedSymbolId);
    const objectsRef = useRef(objects);
    const snapEnabledRef = useRef(snapEnabled);
    const onWallTappedRef = useRef(onWallTapped);
    const onToolChangeRef = useRef(onToolChange);
    const onObjectsChangeRef = useRef(onObjectsChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const onRequestPropertiesRef = useRef(onRequestProperties);
    const gridEnabledRef = useRef(gridEnabled);

    // Sync refs on every render (synchronous, before effects fire)
    activeToolRef.current = activeTool;
    selectedSymbolIdRef.current = selectedSymbolId;
    objectsRef.current = objects;
    snapEnabledRef.current = snapEnabled;
    onWallTappedRef.current = onWallTapped;
    onToolChangeRef.current = onToolChange;
    onObjectsChangeRef.current = onObjectsChange;
    onSelectionChangeRef.current = onSelectionChange;
    onRequestPropertiesRef.current = onRequestProperties;
    gridEnabledRef.current = gridEnabled;

    const getRenderableObjects = () => wallDragPreviewRef.current ?? objectsRef.current;

    // Collect all wall endpoints from current objects for snapping
    const getWallEndpoints = (
      items = getRenderableObjects(),
      exclude: { x: number; y: number }[] = []
    ): { x: number; y: number }[] => {
      const endpoints: { x: number; y: number }[] = [];
      for (const obj of items) {
        if (obj.type === 'wall' && obj.points && obj.points.length >= 2) {
          [obj.points[0], obj.points[obj.points.length - 1]].forEach((point) => {
            if (!exclude.some((excluded) => pointsMatch(point, excluded))) {
              endpoints.push(point);
            }
          });
        }
      }
      return endpoints;
    };

    // Find nearest wall endpoint within SNAP_DISTANCE
    const findSnapEndpoint = (
      x: number,
      y: number,
      items = getRenderableObjects(),
      exclude: { x: number; y: number }[] = []
    ): { x: number; y: number } | null => {
      const endpoints = getWallEndpoints(items, exclude);
      let closest: { x: number; y: number } | null = null;
      let closestDist = SNAP_DISTANCE;
      for (const ep of endpoints) {
        const dist = Math.hypot(ep.x - x, ep.y - y);
        if (dist < closestDist) {
          closestDist = dist;
          closest = ep;
        }
      }
      return closest;
    };

    const buildWallEndpointUpdate = (
      items: CanvasObject[],
      wallId: string,
      endpointIndex: 0 | 1,
      nextPoint: { x: number; y: number }
    ) => {
      const wall = items.find((obj) => obj.id === wallId && obj.type === 'wall');
      if (!wall?.points || wall.points.length < 2) {
        return items;
      }

      const originalPoint = wall.points[endpointIndex];
      const otherPoint = wall.points[endpointIndex === 0 ? 1 : 0];
      const isHorizontal = Math.abs(otherPoint.x - originalPoint.x) >= Math.abs(otherPoint.y - originalPoint.y);
      const constrainedPoint = {
        x: isHorizontal ? nextPoint.x : otherPoint.x,
        y: isHorizontal ? otherPoint.y : nextPoint.y,
      };

      const snappedPoint = findSnapEndpoint(
        constrainedPoint.x,
        constrainedPoint.y,
        items,
        [originalPoint, otherPoint]
      ) || constrainedPoint;

      return items.map((obj) => {
        if (obj.type !== 'wall' || !obj.points || obj.points.length < 2) {
          return obj;
        }

        const points = [...obj.points];
        let changed = false;

        if (obj.id === wallId) {
          points[endpointIndex] = snappedPoint;
          changed = true;
        } else {
          if (pointsMatch(points[0], originalPoint)) {
            points[0] = snappedPoint;
            changed = true;
          }
          if (pointsMatch(points[1], originalPoint)) {
            points[1] = snappedPoint;
            changed = true;
          }
        }

        return changed
          ? {
              ...obj,
              x: points[0].x,
              y: points[0].y,
              points,
            }
          : obj;
      });
    };

    const getBoundsForObjects = (items: CanvasObject[]) => {
      if (items.length === 0) return null;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (const obj of items) {
        if (obj.points && obj.points.length > 0) {
          for (const point of obj.points) {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
          }
        } else {
          const width = obj.width || 40;
          const height = obj.height || 40;
          minX = Math.min(minX, obj.x);
          minY = Math.min(minY, obj.y);
          maxX = Math.max(maxX, obj.x + width);
          maxY = Math.max(maxY, obj.y + height);
        }
      }

      if (!isFinite(minX)) return null;
      return {
        minX,
        minY,
        maxX,
        maxY,
        centreX: (minX + maxX) / 2,
        centreY: (minY + maxY) / 2,
      };
    };

    const clearWallSnapPreview = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas || wallSnapPreviewIdsRef.current.size === 0) return;

      const previewObjects = canvas.getObjects().filter((obj) => {
        const previewId = (obj as any).wallSnapPreviewId;
        return previewId && wallSnapPreviewIdsRef.current.has(previewId);
      });

      previewObjects.forEach((obj) => canvas.remove(obj));
      wallSnapPreviewIdsRef.current.clear();
    };

    const renderWallSnapPreview = (placement: WallSnapPlacement | null) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      clearWallSnapPreview();
      if (!placement) {
        canvas.renderAll();
        return;
      }

      const wall = objectsRef.current.find((obj) => obj.id === placement.wallId);
      if (!wall?.points || wall.points.length < 2) {
        canvas.renderAll();
        return;
      }

      const [p1, p2] = wall.points;
      const guideId = `${placement.wallId}-${placement.projectedX}-${placement.projectedY}`;
      wallSnapPreviewIdsRef.current.add(guideId);

      const guideLine = new Line([p1.x, p1.y, p2.x, p2.y], {
        stroke: WALL_SNAP_GUIDE_COLOUR,
        strokeWidth: WALL_THICKNESS + 2,
        opacity: 0.2,
        selectable: false,
        evented: false,
      });
      (guideLine as any).wallSnapPreviewId = guideId;

      const projectionDot = new Circle({
        left: placement.projectedX,
        top: placement.projectedY,
        radius: 5,
        fill: '#FFFFFF',
        stroke: WALL_SNAP_GUIDE_COLOUR,
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });
      (projectionDot as any).wallSnapPreviewId = guideId;

      const placementHalo = new Circle({
        left: placement.x,
        top: placement.y,
        radius: 12,
        fill: 'rgba(234,179,8,0.16)',
        stroke: WALL_SNAP_GUIDE_COLOUR,
        strokeWidth: 1,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });
      (placementHalo as any).wallSnapPreviewId = guideId;

      canvas.add(guideLine);
      canvas.add(projectionDot);
      canvas.add(placementHalo);
      canvas.bringObjectToFront(guideLine);
      canvas.bringObjectToFront(projectionDot);
      canvas.bringObjectToFront(placementHalo);
      canvas.renderAll();
    };

    const clearWallAdornment = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas || wallAdornmentIdsRef.current.size === 0) return;

      const adornments = canvas.getObjects().filter((obj) => {
        const adornmentId = (obj as any).wallAdornmentId;
        return adornmentId && wallAdornmentIdsRef.current.has(adornmentId);
      });

      adornments.forEach((obj) => canvas.remove(obj));
      wallAdornmentIdsRef.current.clear();
    };

    const renderWallAdornment = (wallId: string | null) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      clearWallAdornment();
      selectedWallIdRef.current = wallId;
      if (!wallId) {
        canvas.renderAll();
        return;
      }

      const wall = getRenderableObjects().find((obj) => obj.id === wallId && obj.type === 'wall');
      if (!wall?.points || wall.points.length < 2) {
        canvas.renderAll();
        return;
      }

      const [p1, p2] = wall.points;
      const highlightId = `wall-highlight-${wallId}`;
      wallAdornmentIdsRef.current.add(highlightId);

      const highlight = new Line([p1.x, p1.y, p2.x, p2.y], {
        stroke: WALL_SNAP_GUIDE_COLOUR,
        strokeWidth: WALL_THICKNESS + 6,
        opacity: 0.15,
        selectable: false,
        evented: false,
      });
      (highlight as any).wallAdornmentId = highlightId;

        const handles = [p1, p2].map((point, endpointIndex) => {
          const handleId = `wall-handle-${wallId}-${endpointIndex}`;
          wallAdornmentIdsRef.current.add(handleId);
          const handle = new Circle({
            left: point.x,
            top: point.y,
            radius: 10,
            fill: 'rgba(255,255,255,0.96)',
            stroke: WALL_SNAP_GUIDE_COLOUR,
            strokeWidth: 2,
            originX: 'center',
            originY: 'center',
            selectable: true,
            hasControls: false,
            hasBorders: false,
            lockScalingX: true,
            lockScalingY: true,
            padding: 10,
            hoverCursor: 'grab',
            moveCursor: 'grabbing',
          });
        (handle as any).wallAdornmentId = handleId;
        (handle as any).customData = { type: 'wall-handle', wallId, endpointIndex };
        return handle;
      });

      canvas.add(highlight);
      handles.forEach((handle) => canvas.add(handle));
      canvas.bringObjectToFront(highlight);
      handles.forEach((handle) => canvas.bringObjectToFront(handle));
      canvas.renderAll();
    };

    const redrawWallVisual = (wall: CanvasObject) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas || wall.type !== 'wall') return;

      const existing = canvas.getObjects().filter((obj) => {
        const customData = (obj as any).customData;
        return customData?.id === wall.id || (customData?.parentId === wall.id && customData?.type === 'wall-label');
      });
      existing.forEach((obj) => canvas.remove(obj));
      addObjectToCanvas(wall);
    };

    const getViewportCentre = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const width = canvas.width || 0;
      const height = canvas.height || 0;
      const zoom = canvas.getZoom() || 1;
      const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];

      return {
        x: (width / 2 - vpt[4]) / zoom,
        y: (height / 2 - vpt[5]) / zoom,
      };
    };

    const getPreferredPlacementCentre = () => {
      const wallBounds = getBoundsForObjects(objectsRef.current.filter((obj) => obj.type === 'wall'));
      if (wallBounds) {
        return { x: wallBounds.centreX, y: wallBounds.centreY };
      }

      const objectBounds = getBoundsForObjects(objectsRef.current);
      if (objectBounds) {
        return { x: objectBounds.centreX, y: objectBounds.centreY };
      }

      return getViewportCentre();
    };

    /**
     * Thin wrapper over the shared geometry in `wallSnap.ts`, supplying the
     * walls currently on the drawing. The maths lives in that module so that
     * placement here and the re-seat pass applied when an existing room is
     * opened can never drift apart.
     */
    const getWallSnapPlacement = (
      x: number,
      y: number,
      symbolId?: string | null,
      opts?: { alwaysSnap?: boolean }
    ): WallSnapPlacement | null =>
      computeWallSnap(x, y, symbolId, objectsRef.current, opts);

    // Snap wall direction to horizontal/vertical if within threshold
    const snapWallDirection = (sx: number, sy: number, ex: number, ey: number): { x: number; y: number } => {
      const dx = ex - sx;
      const dy = ey - sy;
      const angle = Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
      // Near horizontal (0 or 180 degrees)
      if (angle < AXIS_SNAP_DEGREES || angle > (180 - AXIS_SNAP_DEGREES)) {
        return { x: ex, y: sy };
      }
      // Near vertical (90 degrees)
      if (Math.abs(angle - 90) < AXIS_SNAP_DEGREES) {
        return { x: sx, y: ey };
      }
      return { x: ex, y: ey };
    };

    /**
     * Fit all drawing content to the visible working area.
     *
     * The left inset matters: on desktop a 150px tool rail floats over the
     * canvas, so centring on the raw canvas width tucked the drawing partly
     * underneath it. Fitting to the area the user can actually see puts the
     * work where they are looking.
     */
    const RAIL_INSET = 178;
    const zoomToFit = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const objects = canvas.getObjects().filter((obj) => !(obj as any).isGridLine);
      if (objects.length === 0) return;

      // Calculate bounding box of all objects
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const obj of objects) {
        const bound = obj.getBoundingRect();
        if (bound.left < minX) minX = bound.left;
        if (bound.top < minY) minY = bound.top;
        if (bound.left + bound.width > maxX) maxX = bound.left + bound.width;
        if (bound.top + bound.height > maxY) maxY = bound.top + bound.height;
      }

      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;
      const canvasWidth = canvas.width || 400;
      const canvasHeight = canvas.height || 600;
      const padding = 60;
      // Only inset on desktop, where the rail exists.
      const leftInset = canvasWidth >= 1024 ? RAIL_INSET : 0;
      const usableWidth = canvasWidth - leftInset;

      const zoomX = (usableWidth - padding * 2) / contentWidth;
      const zoomY = (canvasHeight - padding * 2) / contentHeight;
      const zoom = Math.min(zoomX, zoomY, 2); // Don't zoom in more than 2x

      canvas.setZoom(zoom);
      const centreX = minX + contentWidth / 2;
      const centreY = minY + contentHeight / 2;
      canvas.viewportTransform = [
        zoom, 0, 0, zoom,
        leftInset + usableWidth / 2 - centreX * zoom,
        canvasHeight / 2 - centreY * zoom,
      ];
      setZoomLevel(zoom);
      drawGrid(canvas, gridEnabledRef.current);
      canvas.renderAll();
    };

    const focusOnPoint = (x: number, y: number, zoom?: number) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const width = canvas.width || 0;
      const height = canvas.height || 0;
      const targetZoom = zoom ?? canvas.getZoom() ?? 1;
      canvas.viewportTransform = [
        targetZoom,
        0,
        0,
        targetZoom,
        width / 2 - x * targetZoom,
        height / 2 - y * targetZoom,
      ];
      setZoomLevel(targetZoom);
      drawGrid(canvas, gridEnabledRef.current);
      canvas.renderAll();
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      getCanvasElement: (): HTMLCanvasElement | null => {
        return canvasRef.current;
      },
      getFabricCanvas: () => fabricCanvasRef.current,
      getPlacementCenter: () => getPreferredPlacementCentre(),
      undo,
      redo,
      /**
       * Push the current objects onto the undo stack.
       *
       * Exposed so mutations that originate in DiagramBuilderPage — room
       * shapes, multi-place, properties edits, duplicate, rotate-all, wall
       * length — become undoable too. Previously `saveState` was only reached
       * from canvas-drawn actions, so undo silently skipped past half the
       * tools and Rotate All could not be reversed at all.
       *
       * Call BEFORE applying the mutation. Never call it from the
       * `onObjectsChange` handler: canvas-originated edits already push their
       * own snapshot and would double up.
       */
      saveState,
      zoomToFit,
      focusOnPoint,
      /**
       * Is the object comfortably inside the current viewport?
       *
       * Used to decide whether selecting something on mobile should recentre
       * the view. Inset by a margin so an item hard against the edge (or under
       * the floating action bar) still counts as needing a nudge.
       */
      isObjectVisible: (id: string, margin = 56): boolean => {
        const canvas = fabricCanvasRef.current;
        const target = objectsRef.current.find((obj) => obj.id === id);
        if (!canvas || !target) return true;

        // Symbols are drawn with a CENTRE origin, so x/y is their middle —
        // treating it as a top-left corner overstated their extent and made
        // on-screen items read as off-screen.
        const halfW = (target.width || 0) / 2;
        const halfH = (target.height || 0) / 2;
        const pts = target.points?.length
          ? target.points
          : target.type === 'symbol'
            ? [
                { x: target.x - halfW, y: target.y - halfH },
                { x: target.x + halfW, y: target.y + halfH },
              ]
            : [
                { x: target.x, y: target.y },
                { x: target.x + (target.width || 0), y: target.y + (target.height || 0) },
              ];

        const zoom = canvas.getZoom() || 1;
        const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
        const width = canvas.width || 0;
        const height = canvas.height || 0;

        return pts.every((p) => {
          const screenX = p.x * zoom + vpt[4];
          const screenY = p.y * zoom + vpt[5];
          return (
            screenX >= margin &&
            screenX <= width - margin &&
            screenY >= margin &&
            screenY <= height - margin
          );
        });
      },
      focusOnObject: (id: string) => {
        const target = objectsRef.current.find((obj) => obj.id === id);
        if (!target) return;

        if (target.points && target.points.length > 0) {
          const xs = target.points.map((point) => point.x);
          const ys = target.points.map((point) => point.y);
          focusOnPoint(
            (Math.min(...xs) + Math.max(...xs)) / 2,
            (Math.min(...ys) + Math.max(...ys)) / 2
          );
          return;
        }

        focusOnPoint(target.x + (target.width || 0) / 2, target.y + (target.height || 0) / 2);
      },
      handleRotate,
      deleteSelected: () => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) {
          const customData = (active as any).customData;
          if (customData?.id) {
            saveState();
            // Remove wall labels too
            if (customData.type === 'wall') {
              const labels = canvas.getObjects().filter(o => (o as any).customData?.parentId === customData.id);
              labels.forEach(l => canvas.remove(l));
            }
            canvas.remove(active);
            renderedObjectIds.current.delete(customData.id);
            canvas.discardActiveObject();
            canvas.renderAll();
            onObjectsChangeRef.current(objectsRef.current.filter(o => o.id !== customData.id));
          }
        } else if (selectedWallIdRef.current) {
          const wallId = selectedWallIdRef.current;
          clearWallAdornment();
          selectedWallIdRef.current = null;
          onObjectsChangeRef.current(objectsRef.current.filter((obj) => obj.id !== wallId));
          onSelectionChangeRef.current?.(null);
        }
      },
      forceFullRedraw: () => {
        // Clear rendered IDs + clear all non-grid objects from canvas
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        wallDragPreviewRef.current = null;
        clearWallSnapPreview();
        clearWallAdornment();
        const nonGrid = canvas.getObjects().filter((obj) => !(obj as any).isGridLine);
        nonGrid.forEach((obj) => canvas.remove(obj));
        renderedObjectIds.current.clear();
        canvas.renderAll();
      },
      /**
       * Render an AI-generated room.
       *
       * This is deliberately STATE-ONLY: it converts the AI payload into
       * CanvasObjects and hands them to React, letting the normal sync effect
       * draw them exactly like any other object.
       *
       * It previously drew walls, labels and symbols onto Fabric by hand AND
       * pushed the same geometry into state. The guard flag meant to suppress
       * the resulting double-draw was cleared synchronously, before React had
       * re-rendered, so the sync effect never saw it — every AI room was drawn
       * twice, and the hand-drawn copy carried no `customData`, which made it
       * invisible to selection, undo and delete. Going through state removes
       * the duplication, the orphaned geometry and ~150 lines of drawing code.
       */
      renderAIRoom: async (roomData: {
        room?: { name?: string };
        walls?: { id?: string; length: number }[];
        symbols?: { type: string; wall?: string; position?: number | string }[];
      }) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        const offsetX = 100;
        const offsetY = 100;
        const walls = roomData.walls || [];
        const symbols = roomData.symbols || [];
        const stamp = Date.now();
        const next: CanvasObject[] = [];

        // Walls, laid end to end from the offset origin.
        let cx = offsetX;
        let cy = offsetY;
        walls.forEach((wall, idx) => {
          const length = wall.length * SCALE;
          let ex = cx;
          let ey = cy;
          if (wall.id === 'north') ex = cx + length;
          else if (wall.id === 'east') ey = cy + length;
          else if (wall.id === 'south') ex = cx - length;
          else if (wall.id === 'west') ey = cy - length;

          next.push({
            id: `ai-wall-${idx}-${stamp}`,
            type: 'wall',
            x: cx,
            y: cy,
            points: [{ x: cx, y: cy }, { x: ex, y: ey }],
          });
          cx = ex;
          cy = ey;
        });

        // Room extents, used to place symbols against the correct wall.
        const roomWidth = (walls[0]?.length ?? 0) * SCALE || 200;
        const roomHeight = (walls[1]?.length ?? 0) * SCALE || 200;
        const SYMBOL_INSET = 4;

        symbols.forEach((symbol, idx) => {
          // ELE-604: AI sometimes emits ids suffixed with -bs7671.
          const symbolId = symbol.type.replace(/-bs7671$/, '');
          const known =
            symbolRegistry.some((s) => s.id === symbolId) ||
            electricalSymbols.some((s) => s.id === symbolId);
          if (!known) {
            console.warn(`[AI room] unknown symbol skipped: ${symbol.type} (resolved: ${symbolId})`);
            return;
          }

          let sx = offsetX + 20;
          let sy = offsetY + 20;
          if (symbol.position === 'center') {
            sx = offsetX + roomWidth / 2;
            sy = offsetY + roomHeight / 2;
          } else if (symbol.wall) {
            const along = (typeof symbol.position === 'number' ? symbol.position : 0) * SCALE;
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

          next.push({
            id: `ai-sym-${idx}-${stamp}`,
            type: 'symbol',
            x: sx,
            y: sy,
            width: 40,
            height: 40,
            rotation: 0,
            symbolId,
          });
        });

        // Room name as a real text object so it can be moved, edited or
        // deleted like anything else — it used to be baked into the canvas.
        if (roomData.room?.name) {
          next.push({
            id: `ai-title-${stamp}`,
            type: 'text',
            x: offsetX,
            y: offsetY - 40,
            text: roomData.room.name,
          });
        }

        // Generating a room REPLACES whatever was on the canvas. Snapshot
        // first so that is reversible — an accidental tap on AI Help could
        // otherwise wipe a finished room with no way back.
        saveState();

        // Replacing the drawing wholesale — clear the rendered-id bookkeeping
        // so the sync effect rebuilds from scratch rather than skipping ids it
        // thinks it has already drawn.
        const nonGrid = canvas.getObjects().filter((obj) => !(obj as { isGridLine?: boolean }).isGridLine);
        nonGrid.forEach((obj) => canvas.remove(obj));
        renderedObjectIds.current.clear();
        drawGrid(canvas, gridEnabledRef.current);

        onObjectsChangeRef.current(next);

        // Let the sync effect paint before fitting the view to it.
        setTimeout(() => zoomToFit(), 120);
      },
    }));

    // Initialize Fabric.js canvas
    useEffect(() => {
      if (!canvasRef.current) return;

      // Measure the real drawing area from the flex wrapper; fall back to the
      // window-minus-constants math only if the element isn't laid out yet.
      const measureSize = () => {
        const el = wrapperRef.current;
        if (el && el.clientWidth > 0 && el.clientHeight > 0) {
          return { width: el.clientWidth, height: el.clientHeight };
        }
        return {
          width: window.innerWidth,
          height: window.innerHeight - headerHeight - toolbarHeight,
        };
      };

      const { width: canvasWidth, height: canvasHeight } = measureSize();

      const canvas = new FabricCanvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: '#FFFFFF',
        selection: activeTool === 'select',
        allowTouchScrolling: false,
      });

      // rAF-batch renderAll so ~40 call sites that fire during a single interaction
      // coalesce into one paint per frame. Huge perf win on interactive editing
      // without touching the call sites themselves. (ELE-762)
      const originalRenderAll = canvas.renderAll.bind(canvas);
      let renderScheduled = false;
      canvas.renderAll = function () {
        if (renderScheduled) return canvas;
        renderScheduled = true;
        requestAnimationFrame(() => {
          renderScheduled = false;
          originalRenderAll();
        });
        return canvas;
      };

      // Selection styling. Fabric's defaults are cyan corner squares on a
      // dashed blue box — off-brand, and it reads as an unfinished prototype
      // rather than a drawing tool. Brand yellow, thin, no scaling corners
      // (symbols are fixed size, so corners only ever caused accidental
      // distortion), and a soft marquee.
      FabricObject.prototype.borderColor = '#EAB308';
      FabricObject.prototype.borderScaleFactor = 1.5;
      FabricObject.prototype.cornerColor = '#EAB308';
      FabricObject.prototype.cornerStrokeColor = '#1a1a1a';
      FabricObject.prototype.cornerSize = 9;
      FabricObject.prototype.transparentCorners = false;
      FabricObject.prototype.padding = 4;
      canvas.selectionColor = 'rgba(234,179,8,0.10)';
      canvas.selectionBorderColor = '#EAB308';
      canvas.selectionLineWidth = 1;

      fabricCanvasRef.current = canvas;
      setCanvasReady(canvas);

      // Draw initial grid immediately
      drawGrid(canvas, gridEnabled);
      canvas.renderAll();

      // Pinch-to-zoom + two-finger pan handler (ELE-712 fix: deselect objects during gesture)
      let lastPinchDistance = 0;
      let lastPinchMidpoint: { x: number; y: number } | null = null;

      const handleTouchGesture = (e: any) => {
        if (e.e?.touches?.length === 2) {
          // Deselect any active object — prevents Fabric.js interpreting pinch as object scale (ELE-712)
          canvas.discardActiveObject();
          isTouchGestureRef.current = true;

          const touch1 = e.e.touches[0];
          const touch2 = e.e.touches[1];
          const distance = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );
          const midX = (touch1.clientX + touch2.clientX) / 2;
          const midY = (touch1.clientY + touch2.clientY) / 2;

          if (lastPinchDistance > 0 && lastPinchMidpoint) {
            // Zoom toward pinch midpoint
            const zoomFactor = distance / lastPinchDistance;
            const currentZoom = canvas.getZoom();
            const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.1), 5);

            const canvasRect = canvasRef.current?.getBoundingClientRect();
            if (canvasRect) {
              const pointX = midX - canvasRect.left;
              const pointY = midY - canvasRect.top;
              canvas.zoomToPoint(new Point(pointX, pointY), newZoom);
              setZoomLevel(newZoom);

              // Two-finger pan — translate viewport by midpoint delta
              const panDeltaX = midX - lastPinchMidpoint.x;
              const panDeltaY = midY - lastPinchMidpoint.y;
              if (Math.abs(panDeltaX) > 0.5 || Math.abs(panDeltaY) > 0.5) {
                const vpt = canvas.viewportTransform;
                if (vpt) {
                  vpt[4] += panDeltaX;
                  vpt[5] += panDeltaY;
                  canvas.setViewportTransform(vpt);
                }
              }
            }
          }
          lastPinchDistance = distance;
          lastPinchMidpoint = { x: midX, y: midY };
          e.e.preventDefault();

          // Cancel any in-progress drawing — user switched to gesture
          if (isDrawingRef.current) {
            const tempObjs = canvas.getObjects().filter((obj) => (obj as any).isTemp);
            tempObjs.forEach((obj) => canvas.remove(obj));
            isDrawingRef.current = false;
            startPointRef.current = null;
            canvas.renderAll();
          }
        }
      };

      // touchend safety net — resets gesture state and catches stuck drawing (ELE-713)
      const handleTouchEnd = (e: TouchEvent) => {
        if (lastPinchDistance > 0) {
          // Repaint the grid to cover wherever the pinch/pan landed. Deferred
          // to gesture end so we aren't rebuilding line objects mid-pinch.
          drawGrid(canvas, gridEnabledRef.current);
          canvas.renderAll();
        }
        lastPinchDistance = 0;
        lastPinchMidpoint = null;
        // Small delay before clearing gesture flag so the final mouse:up from Fabric.js
        // still sees it as a gesture and doesn't trigger a draw
        if (isTouchGestureRef.current) {
          setTimeout(() => { isTouchGestureRef.current = false; }, 50);
        }
        // If all fingers lifted and we're still drawing, force-cancel (prevents stuck wall tool)
        if (e.touches.length === 0 && isDrawingRef.current) {
          const tempObjs = canvas.getObjects().filter((obj) => (obj as any).isTemp);
          tempObjs.forEach((obj) => canvas.remove(obj));
          isDrawingRef.current = false;
          startPointRef.current = null;
          canvas.renderAll();
        }
      };

      canvas.on('mouse:move', handleTouchGesture);
      canvas.upperCanvasEl?.addEventListener('touchend', handleTouchEnd, { passive: true });

      // ── Desktop navigation ────────────────────────────────────────────────
      // There was none. No wheel handler, no drag-to-pan: a desktop user had
      // three zoom buttons and literally no way to move around a drawing
      // larger than the viewport. Touch had pinch-zoom and two-finger pan; the
      // desktop equivalents are below.

      // Rebuilding the grid means recreating ~80 Fabric objects, which is far
      // too heavy to do per wheel tick or per pan frame. Coalesce to one
      // rebuild per animation frame; the grid trails the gesture by a frame,
      // which is imperceptible, instead of stuttering it.
      let gridFrame: number | null = null;
      const scheduleGridRedraw = () => {
        if (gridFrame !== null) return;
        gridFrame = requestAnimationFrame(() => {
          gridFrame = null;
          drawGrid(canvas, gridEnabledRef.current);
          canvas.renderAll();
        });
      };

      // Wheel zooms to the cursor; a trackpad two-finger scroll (which arrives
      // as a wheel event with a dominant deltaX) pans instead.
      const handleWheel = (opt: TPointerEventInfo<WheelEvent>) => {
        const e = opt.e;
        e.preventDefault();
        e.stopPropagation();

        const vpt = canvas.viewportTransform;
        const isPanGesture = !e.ctrlKey && !e.metaKey && Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (isPanGesture && vpt) {
          vpt[4] -= e.deltaX;
          vpt[5] -= e.deltaY;
          canvas.setViewportTransform(vpt);
          scheduleGridRedraw();
          return;
        }

        // Exponential, so a notch feels the same at any zoom level.
        const next = Math.min(Math.max(canvas.getZoom() * 0.999 ** e.deltaY, 0.1), 5);
        canvas.zoomToPoint(new Point(e.offsetX, e.offsetY), next);
        setZoomLevel(next);
        scheduleGridRedraw();
      };

      // Drag to pan: middle mouse, or space/alt held with the left button.
      // Plain left-drag stays as marquee selection / drawing.
      let panLastX = 0;
      let panLastY = 0;
      let spaceHeld = false;

      // Fabric delivers mouse:* for touch too, so the event is TPointerEvent
      // (mouse OR touch) — not MouseEvent. Narrowing properly matters: a
      // TouchEvent has no `button`, `clientX` or `altKey`, and typing these as
      // MouseEvent quietly asserted properties that do not exist at runtime.
      // Touch panning is handled by the pinch/two-finger path, so this only
      // ever engages for a real mouse.
      const asMouse = (e: TPointerEvent): MouseEvent | null =>
        'button' in e && typeof (e as MouseEvent).button === 'number' ? (e as MouseEvent) : null;

      const wantsPan = (e: MouseEvent) => e.button === 1 || spaceHeld || e.altKey;

      const handlePanDown = (opt: TPointerEventInfo<TPointerEvent>) => {
        const e = asMouse(opt.e);
        if (!e || !wantsPan(e)) return;
        // Middle-click otherwise triggers browser autoscroll.
        e.preventDefault();
        isPanningRef.current = true;
        canvas.selection = false;
        canvas.setCursor('grabbing');
        panLastX = e.clientX;
        panLastY = e.clientY;
      };

      const handlePanMove = (opt: TPointerEventInfo<TPointerEvent>) => {
        if (!isPanningRef.current) return;
        const e = asMouse(opt.e);
        if (!e) return;
        const vpt = canvas.viewportTransform;
        if (!vpt) return;
        vpt[4] += e.clientX - panLastX;
        vpt[5] += e.clientY - panLastY;
        panLastX = e.clientX;
        panLastY = e.clientY;
        canvas.setViewportTransform(vpt);
        canvas.renderAll();
        scheduleGridRedraw();
      };

      const handlePanUp = () => {
        if (!isPanningRef.current) return;
        isPanningRef.current = false;
        canvas.selection = activeToolRef.current === 'select';
        canvas.setCursor('default');
        drawGrid(canvas, gridEnabledRef.current);
        canvas.renderAll();
      };

      const handleSpaceDown = (e: KeyboardEvent) => {
        if (e.code !== 'Space' || e.repeat) return;
        if (isTypingContext(e.target) || isInOverlay(e.target)) return;
        // Space still has to activate a focused button or checkbox — only
        // claim it when the focus isn't on something that needs it.
        if (shouldAllowSpaceDefault(e.target)) return;
        e.preventDefault();
        spaceHeld = true;
        canvas.defaultCursor = 'grab';
      };
      const handleSpaceUp = (e: KeyboardEvent) => {
        if (e.code !== 'Space') return;
        spaceHeld = false;
        canvas.defaultCursor = 'default';
      };
      // A drag that ends outside the window never delivers mouse:up to the
      // canvas, which would leave the pan latched on. Reset on blur.
      const handleWindowBlur = () => {
        spaceHeld = false;
        if (isPanningRef.current) handlePanUp();
      };

      canvas.on('mouse:wheel', handleWheel);
      canvas.on('mouse:down', handlePanDown);
      canvas.on('mouse:move', handlePanMove);
      canvas.on('mouse:up', handlePanUp);
      window.addEventListener('keydown', handleSpaceDown);
      window.addEventListener('keyup', handleSpaceUp);
      window.addEventListener('blur', handleWindowBlur);

      // Fill the available space whenever it changes. A ResizeObserver on the
      // flex wrapper catches everything window 'resize' misses — the iOS URL
      // bar collapsing, safe-area changes, orientation, split-view — and keeps
      // the fabric canvas exactly matched to its visible box.
      const handleResize = () => {
        const { width, height } = measureSize();
        canvas.setDimensions({ width, height });
        // The grid covers the visible world area, so it has to be re-laid when
        // that area changes — rotating the phone or the iOS URL bar collapsing
        // would otherwise leave the new strip ungridded.
        drawGrid(canvas, gridEnabledRef.current);
        canvas.renderAll();
      };

      const resizeObserver =
        typeof ResizeObserver !== 'undefined' && wrapperRef.current
          ? new ResizeObserver(() => handleResize())
          : null;
      resizeObserver?.observe(wrapperRef.current!);
      window.addEventListener('resize', handleResize);

      return () => {
        if (gridFrame !== null) cancelAnimationFrame(gridFrame);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleSpaceDown);
        window.removeEventListener('keyup', handleSpaceUp);
        window.removeEventListener('blur', handleWindowBlur);
        resizeObserver?.disconnect();
        canvas.off('mouse:move', handleTouchGesture);
        canvas.off('mouse:wheel', handleWheel);
        canvas.off('mouse:down', handlePanDown);
        canvas.off('mouse:move', handlePanMove);
        canvas.off('mouse:up', handlePanUp);
        canvas.upperCanvasEl?.removeEventListener('touchend', handleTouchEnd);
        canvas.dispose();
      };
    }, []);

    // Track which object IDs are already on the Fabric canvas
    const renderedObjectIds = useRef<Set<string>>(new Set());

    // Draw grid only when gridEnabled changes
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      drawGrid(canvas, gridEnabled);
      canvas.renderAll();
    }, [gridEnabled]);

    // Fit restored work to the view on first paint. Without this you reopened a
    // plan to find it as a postage stamp in the corner of an empty sheet, and
    // had to hunt for it with the zoom buttons before you could do anything.
    //
    // Triggered from the object-sync completion rather than a timer: symbols
    // load their SVGs asynchronously, so a fixed delay fitted to whatever
    // happened to be drawn at that instant — usually the walls alone, and
    // sometimes nothing at all.
    const didInitialFitRef = useRef(false);
    // Whether there was work on the canvas at mount — i.e. a plan restored from
    // storage. Captured on the first render only.
    //
    // This must gate the fit. Without it, starting from an empty canvas and
    // drawing the FIRST wall counted as "content appeared" and re-zoomed the
    // view mid-draw: the canvas jumped under the user's hand and every wall
    // after it was drawn at a different scale, so a 3m drag became 1.5m.
    const hadRestoredContentRef = useRef(objects.length > 0);

    // Sync new objects from React state to Fabric canvas (add only, no clear/rebuild)
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const stateMap = new Map(objects.map((obj) => [obj.id, obj]));

      // If an existing object's serialised state changed outside Fabric,
      // remove its rendered version so it can be rebuilt from state.
      canvas.getObjects().forEach((fabricObj) => {
        const customData = (fabricObj as any).customData;
        if (!customData?.id || customData.type === 'wall-label' || customData.type === 'circuit-dot') {
          return;
        }

        const stateObj = stateMap.get(customData.id);
        if (!stateObj) return;

        const stateHash = serialiseCanvasObject(stateObj);
        if (customData.stateHash === stateHash) return;

        const related = canvas.getObjects().filter((obj) => {
          const data = (obj as any).customData;
          return data?.id === customData.id || data?.parentId === customData.id;
        });

        related.forEach((obj) => canvas.remove(obj));
        renderedObjectIds.current.delete(customData.id);
      });

      // Find objects in state that aren't on the canvas yet
      const newObjects = objects.filter((obj) => !renderedObjectIds.current.has(obj.id));

      // Find objects removed from state that are still on canvas
      const stateIds = new Set(objects.map((o) => o.id));
      const toRemove = canvas.getObjects().filter((fObj) => {
        const customData = (fObj as any).customData;
        if (!customData?.id) return false;
        // Don't remove wall labels / circuit dots — they're tied to their parent
        if (customData.type === 'wall-label' || customData.type === 'circuit-dot') {
          return !stateIds.has(customData.parentId);
        }
        return !stateIds.has(customData.id);
      });

      // Remove deleted objects from canvas
      toRemove.forEach((fObj) => {
        const id = (fObj as any).customData?.id || (fObj as any).customData?.parentId;
        if (id) renderedObjectIds.current.delete(id);
        canvas.remove(fObj);
      });

      // Add new objects
      const addNewObjects = async () => {
        for (const obj of newObjects) {
          await addObjectToCanvas(obj);
          renderedObjectIds.current.add(obj.id);
        }
        if (newObjects.length > 0 || toRemove.length > 0) {
          // Bring symbols and circuit dots above walls
          const allObjs = canvas.getObjects();
          allObjs.forEach((fObj) => {
            const cd = (fObj as any).customData;
            if (cd?.type === 'symbol' || cd?.type === 'cable') {
              canvas.bringObjectToFront(fObj);
            }
          });
          // Annotation last, so dimensions and circuit tags always read on top
          // of the geometry rather than being buried beneath a symbol.
          canvas.getObjects().forEach((fObj) => {
            const cd = (fObj as any).customData;
            if (cd?.type === 'wall-label' || cd?.type === 'circuit-dot') {
              canvas.bringObjectToFront(fObj);
            }
          });
          canvas.renderAll();
        }

        if (selectedWallIdRef.current) {
          const wallStillExists = objects.some((obj) => obj.id === selectedWallIdRef.current && obj.type === 'wall');
          renderWallAdornment(wallStillExists ? selectedWallIdRef.current : null);
        }

        // Everything for this pass is now on the canvas — safe to fit. Only for
        // work restored at mount; never for something the user just drew.
        if (!didInitialFitRef.current && objects.length > 0) {
          didInitialFitRef.current = true;
          if (hadRestoredContentRef.current) zoomToFit();
        }
      };
      addNewObjects();
    }, [objects]);

    const snapToGrid = (value: number) =>
      snapEnabledRef.current ? snapToStep(value) : value;

    // Create a dimension line group from two points
    const createDimensionGroup = (x1: number, y1: number, x2: number, y2: number): Group => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const label = pxToMetres(dist);
      const isHorizontal = Math.abs(dx) >= Math.abs(dy);
      const tickLen = 8;
      const arrowSize = 5;

      const elements: FabricObject[] = [];

      // Main line
      elements.push(new Line([x1, y1, x2, y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

      // Tick marks (perpendicular end caps)
      if (isHorizontal) {
        elements.push(new Line([x1, y1 - tickLen, x1, y1 + tickLen], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([x2, y2 - tickLen, x2, y2 + tickLen], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      } else {
        elements.push(new Line([x1 - tickLen, y1, x1 + tickLen, y1], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([x2 - tickLen, y2, x2 + tickLen, y2], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      }

      // Arrowheads, pointing inward along the dimension line as drafting
      // convention requires.
      const angle = Math.atan2(dy, dx);
      const addArrowhead = (tipX: number, tipY: number, pointAngle: number) => {
        for (const spread of [-Math.PI / 6, Math.PI / 6]) {
          elements.push(new Line([
            tipX, tipY,
            tipX + arrowSize * Math.cos(pointAngle + spread),
            tipY + arrowSize * Math.sin(pointAngle + spread),
          ], { stroke: '#333333', strokeWidth: 1, selectable: false }) as unknown as FabricObject);
        }
      };
      addArrowhead(x1, y1, angle);
      addArrowhead(x2, y2, angle + Math.PI);

      // Label background + text
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const labelOffsetY = isHorizontal ? -14 : 0;
      const labelOffsetX = isHorizontal ? 0 : 14;

      const labelBg = new Rect({
        left: midX + labelOffsetX - 20,
        top: midY + labelOffsetY - 7,
        width: 40,
        height: 14,
        fill: '#FFFFFF',
        stroke: 'transparent',
        strokeWidth: 0,
        selectable: false,
      });
      elements.push(labelBg as unknown as FabricObject);

      const labelText = new FabricText(label, {
        left: midX + labelOffsetX,
        top: midY + labelOffsetY - 6,
        fontSize: 10,
        fill: '#000000',
        fontFamily: 'Arial',
        fontWeight: '500',
        originX: 'center',
        selectable: false,
      });
      elements.push(labelText as unknown as FabricObject);

      const group = new Group(elements, {
        selectable: true,
        hasControls: true,
        hasBorders: true,
      });

      return group;
    };

    /**
     * Build certain symbols natively in Fabric instead of parsing SVG.
     * Doors/windows/stairs/north-arrow have shapes (arcs, markers, text)
     * that Fabric v6's SVG parser handles unreliably — so they were silently
     * not rendering. Drawing them as native primitives is bulletproof.
     *
     * Returns null if the symbolId isn't one of the natively-handled set.
     */
    const buildNativeSymbol = (symbolId: string): FabricObject | null => {
      const stroke = '#000000';
      const sw = 1.5;
      const common = { stroke, strokeWidth: sw, selectable: false, evented: false } as const;

      switch (symbolId) {
        case 'door-left': {
          // Frame on top, jamb on left, swing arc opening to the right/bottom
          const jamb = new Line([10, 10, 10, 30], common);
          const top = new Line([10, 10, 30, 10], common);
          const arc = new Path('M 30 10 A 20 20 0 0 1 10 30', {
            ...common,
            fill: '',
            strokeDashArray: [3, 2],
          });
          return new Group([jamb, top, arc], { originX: 'center', originY: 'center' });
        }
        case 'door-right': {
          const jamb = new Line([30, 10, 30, 30], common);
          const top = new Line([10, 10, 30, 10], common);
          const arc = new Path('M 10 10 A 20 20 0 0 0 30 30', {
            ...common,
            fill: '',
            strokeDashArray: [3, 2],
          });
          return new Group([jamb, top, arc], { originX: 'center', originY: 'center' });
        }
        case 'door-double': {
          const jambL = new Line([6, 10, 6, 30], common);
          const jambR = new Line([34, 10, 34, 30], common);
          const topL = new Line([6, 10, 20, 10], common);
          const topR = new Line([20, 10, 34, 10], common);
          const arcL = new Path('M 20 10 A 14 14 0 0 0 6 24', {
            ...common,
            fill: '',
            strokeDashArray: [3, 2],
          });
          const arcR = new Path('M 20 10 A 14 14 0 0 1 34 24', {
            ...common,
            fill: '',
            strokeDashArray: [3, 2],
          });
          return new Group([jambL, jambR, topL, topR, arcL, arcR], {
            originX: 'center',
            originY: 'center',
          });
        }
        case 'window': {
          const top = new Line([6, 17, 34, 17], common);
          const bot = new Line([6, 23, 34, 23], common);
          const left = new Line([6, 17, 6, 23], common);
          const right = new Line([34, 17, 34, 23], common);
          return new Group([top, bot, left, right], {
            originX: 'center',
            originY: 'center',
          });
        }
        case 'stairs': {
          const frame = new Rect({
            left: 8, top: 6, width: 24, height: 28,
            fill: '', stroke, strokeWidth: sw,
            selectable: false, evented: false,
          });
          const lines: FabricObject[] = [];
          for (let i = 1; i <= 5; i++) {
            lines.push(new Line([8, 6 + i * 5, 32, 6 + i * 5], { ...common, strokeWidth: 1 }));
          }
          const arrow = new Line([20, 30, 20, 8], common);
          const head = new Path('M 17 11 L 20 6 L 23 11 Z', {
            fill: stroke,
            stroke,
            strokeWidth: 0.5,
            selectable: false,
            evented: false,
          });
          return new Group([frame, ...lines, arrow, head], {
            originX: 'center',
            originY: 'center',
          });
        }
        case 'north-arrow': {
          const arrow = new Path('M 20 4 L 14 24 L 20 20 L 26 24 Z', {
            fill: stroke,
            stroke,
            strokeWidth: sw,
            selectable: false,
            evented: false,
          });
          const label = new FabricText('N', {
            left: 20,
            top: 32,
            fontSize: 11,
            fontWeight: '700',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fill: stroke,
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
          });
          return new Group([arrow, label as unknown as FabricObject], {
            originX: 'center',
            originY: 'center',
          });
        }
        default:
          return null;
      }
    };

    /** Yellow labeled placeholder so a failed symbol is visible, not silent. */
    const buildPlaceholderSymbol = (label: string): FabricObject => {
      const box = new Rect({
        left: 0, top: 0, width: 48, height: 48,
        fill: '#FEF3C7', stroke: '#D97706', strokeWidth: 1.5,
        rx: 6, ry: 6,
        selectable: false, evented: false,
        originX: 'center', originY: 'center',
      });
      const txt = new FabricText(label.slice(0, 6), {
        left: 0, top: 0,
        fontSize: 9,
        fontWeight: '700',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fill: '#92400E',
        originX: 'center', originY: 'center',
        selectable: false, evented: false,
      });
      return new Group([box, txt as unknown as FabricObject], {
        originX: 'center', originY: 'center',
      });
    };

    // Add object to canvas (async for SVG symbol loading)
    const addObjectToCanvas = async (obj: CanvasObject) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      let fabricObj: FabricObject | null = null;

      if (obj.type === 'symbol' && obj.symbolId) {
        // Try native render first for symbols that Fabric's SVG parser
        // mishandles. Falls through to SVG loading for everything else.
        const native = buildNativeSymbol(obj.symbolId);
        if (native) {
          native.set({
            left: obj.x,
            top: obj.y,
            scaleX: 1.2,
            scaleY: 1.2,
            angle: obj.rotation || 0,
            selectable: true,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            originX: 'center',
            originY: 'center',
          });
          fabricObj = native;
          (fabricObj as any).customData = {
            id: obj.id,
            type: 'symbol',
            symbolId: obj.symbolId,
            stateHash: serialiseCanvasObject(obj),
          };
        } else {
          try {
            const svgString = await loadSymbolSvg(obj.symbolId);
            const result = await loadSVGFromString(svgString);
            const svgObjects = result.objects;
            const validObjects = (svgObjects || []).filter((o): o is FabricObject => o !== null);
            if (validObjects.length > 0) {
              fabricObj = util.groupSVGElements(validObjects, {
                left: obj.x,
                top: obj.y,
                scaleX: 1.2,
                scaleY: 1.2,
                angle: obj.rotation || 0,
                selectable: true,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
                originX: 'center',
                originY: 'center',
              });
              (fabricObj as any).customData = {
                id: obj.id,
                type: 'symbol',
                symbolId: obj.symbolId,
                stateHash: serialiseCanvasObject(obj),
              };
            } else {
              // SVG parsed but yielded nothing — show a visible placeholder
              // so the user knows the symbol exists and can move/delete it.
              console.warn('[Symbol] SVG yielded 0 objects, using placeholder:', obj.symbolId);
              fabricObj = buildPlaceholderSymbol(obj.symbolId);
              fabricObj.set({
                left: obj.x,
                top: obj.y,
                angle: obj.rotation || 0,
                selectable: true,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true,
              });
              (fabricObj as any).customData = {
                id: obj.id,
                type: 'symbol',
                symbolId: obj.symbolId,
                stateHash: serialiseCanvasObject(obj),
              };
            }
          } catch (err) {
            console.error('[Symbol] FAILED to load SVG for:', obj.symbolId, err);
            // Fallback placeholder so the symbol is at least visible
            fabricObj = buildPlaceholderSymbol(obj.symbolId);
            fabricObj.set({
              left: obj.x,
              top: obj.y,
              angle: obj.rotation || 0,
              selectable: true,
              hasControls: false,
              lockScalingX: true,
              lockScalingY: true,
              lockRotation: true,
            });
            (fabricObj as any).customData = {
              id: obj.id,
              type: 'symbol',
              symbolId: obj.symbolId,
              stateHash: serialiseCanvasObject(obj),
            };
          }
        }

        // Circuit reference tag.
        //
        // This used to be a coloured dot floating beside each symbol. On screen
        // that reads as a UI affordance; printed on a drawing handed to a
        // client it reads as a stray blob and says nothing. Drawings label
        // circuits with their reference — L1, S1, C1 — so that is what we
        // draw. The colour is kept as the TEXT colour, so the at-a-glance
        // scanning still works without the blob.
        if (obj.circuitRef && fabricObj) {
          const COLOURS: Record<string, string> = {
            L1: '#1D4ED8', L2: '#3B82F6', S1: '#B91C1C', S2: '#DC2626',
            C1: '#B45309', EV1: '#047857', FA1: '#BE185D', IH1: '#6D28D9', AC1: '#0E7490',
          };
          const tagColour = COLOURS[obj.circuitRef] || '#374151';
          const spot = findTagSpot(obj, objectsRef.current);
          const tag = new FabricText(obj.circuitRef, {
            left: spot.x,
            top: spot.y,
            fontSize: 7.5,
            fontWeight: '700',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fill: tagColour,
            // A white ground keeps the tag legible where it lands on a wall.
            backgroundColor: 'rgba(255,255,255,0.9)',
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
          });
          // Same customData type so the follow-the-symbol move logic still applies.
          (tag as any).customData = { type: 'circuit-dot', parentId: obj.id };
          canvas.add(tag);
        }
      } else if (obj.type === 'rectangle') {
        fabricObj = new Rect({
          left: obj.x,
          top: obj.y,
          width: obj.width || 100,
          height: obj.height || 100,
          fill: 'transparent',
          stroke: '#000000',
          strokeWidth: 2,
          angle: obj.rotation || 0,
          selectable: true,
          hasControls: true,
        });
        (fabricObj as any).customData = { id: obj.id, type: 'rectangle', stateHash: serialiseCanvasObject(obj) };
      } else if (obj.type === 'line' && obj.points && obj.points.length >= 2) {
        const points = obj.points;
        fabricObj = new Line(
          [points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y],
          {
            stroke: '#000000',
            strokeWidth: 2,
            selectable: true,
            hasControls: true,
          }
        );
        (fabricObj as any).customData = { id: obj.id, type: 'line', stateHash: serialiseCanvasObject(obj) };
      } else if (obj.type === 'text') {
        fabricObj = new FabricText(obj.text || 'Text', {
          left: obj.x,
          top: obj.y,
          fill: '#000000',
          fontSize: 16,
          fontFamily: 'Arial',
          angle: obj.rotation || 0,
          selectable: true,
          hasControls: true,
        });
        (fabricObj as any).customData = { id: obj.id, type: 'text', stateHash: serialiseCanvasObject(obj) };
      } else if (obj.type === 'wall' && obj.points && obj.points.length >= 2) {
        const p1 = obj.points[0];
        const p2 = obj.points[1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const isVertical = Math.abs(dy) > Math.abs(dx);
        const dist = Math.hypot(dx, dy);

        // Phase 4: find door/window features attached to this wall, compute
        // their parametric ranges [0..1] along the wall, and render the wall
        // as a set of segments that skip those ranges. When no features are
        // attached, this falls through to a single full-length segment
        // (identical to the pre-Phase-4 render).
        type FeatureRange = [number, number];
        const featureRanges: FeatureRange[] = [];
        if (dist > 0) {
          for (const other of objectsRef.current) {
            if (other.type !== 'symbol' || !isWallFeature(other.symbolId)) continue;
            // Project the feature's centre onto the wall line (parameter t).
            const relX = other.x - p1.x;
            const relY = other.y - p1.y;
            const tRaw = (relX * dx + relY * dy) / (dist * dist);
            const projX = p1.x + tRaw * dx;
            const projY = p1.y + tRaw * dy;
            const perpDist = Math.hypot(other.x - projX, other.y - projY);
            // Feature is attached to this wall if its projection is within
            // the wall's length AND it's within WALL_MOUNT_OFFSET+slack of
            // the wall line (same threshold used by getWallSnapPlacement).
            if (tRaw < 0 || tRaw > 1) continue;
            if (perpDist > WALL_MOUNT_OFFSET + 8) continue;
            const featureWidth = FEATURE_WIDTH_PX[other.symbolId!] || 40;
            const halfT = (featureWidth / 2) / dist;
            featureRanges.push([
              Math.max(0, tRaw - halfT),
              Math.min(1, tRaw + halfT),
            ]);
          }
        }
        // Sort + merge overlapping ranges
        featureRanges.sort((a, b) => a[0] - b[0]);
        const merged: FeatureRange[] = [];
        for (const range of featureRanges) {
          const last = merged[merged.length - 1];
          if (last && range[0] <= last[1]) {
            last[1] = Math.max(last[1], range[1]);
          } else {
            merged.push([range[0], range[1]]);
          }
        }
        // Build the visible segments (complement of the feature ranges)
        const segments: FeatureRange[] = [];
        let cursor = 0;
        for (const [fStart, fEnd] of merged) {
          if (fStart > cursor) segments.push([cursor, fStart]);
          cursor = Math.max(cursor, fEnd);
        }
        if (cursor < 1) segments.push([cursor, 1]);

        // Render each visible segment as its own rect.
        for (let segIdx = 0; segIdx < segments.length; segIdx++) {
          const [segStart, segEnd] = segments[segIdx];
          const sx = p1.x + segStart * dx;
          const sy = p1.y + segStart * dy;
          const ex = p1.x + segEnd * dx;
          const ey = p1.y + segEnd * dy;
          const segDx = ex - sx;
          const segDy = ey - sy;
          // Skip 0-length segments (feature covers entire wall edge)
          if (Math.abs(segDx) < 0.5 && Math.abs(segDy) < 0.5) continue;

          if (isVertical) {
            const segRect = new Rect({
              left: sx - WALL_THICKNESS / 2,
              top: Math.min(sy, ey),
              width: WALL_THICKNESS,
              height: Math.abs(segDy),
              fill: '#111827',
              // No extra stroke — fill plus a 1px stroke rendered ~5px of solid
              // black, which read as a slab rather than a drafted wall.
              strokeWidth: 0,
              selectable: false,
              hasControls: false,
              evented: true,
            });
            (segRect as any).customData = {
              id: obj.id,
              type: 'wall',
              parentId: obj.id,
              segmentIndex: segIdx,
              stateHash: serialiseCanvasObject(obj),
            };
            canvas.add(segRect);
          } else {
            const segRect = new Rect({
              left: Math.min(sx, ex),
              top: sy - WALL_THICKNESS / 2,
              width: Math.abs(segDx),
              height: WALL_THICKNESS,
              fill: '#111827',
              strokeWidth: 0,
              selectable: false,
              hasControls: false,
              evented: true,
            });
            (segRect as any).customData = {
              id: obj.id,
              type: 'wall',
              parentId: obj.id,
              segmentIndex: segIdx,
              stateHash: serialiseCanvasObject(obj),
            };
            canvas.add(segRect);
          }
        }

        // Auto dimension label — always the FULL wall length, placed at the
        // midpoint of the original line (not per-segment). This gives the
        // correct total length even when the wall is split by features.
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const labelText = pxToMetres(dist);
        // Dimension text sits ON the drawing, so it needs to read as annotation
        // rather than content: smaller, mid-grey, on a white ground so it is
        // never lost against a wall or a symbol it happens to overlap.
        const label = new FabricText(labelText, {
          left: isVertical ? midX + WALL_THICKNESS / 2 + 7 : midX,
          top: isVertical ? midY : midY - WALL_THICKNESS / 2 - 15,
          fontSize: 9,
          fill: '#1f2937',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: '600',
          backgroundColor: 'rgba(255,255,255,0.92)',
          selectable: false,
          evented: false,
          originX: isVertical ? 'left' : 'center',
        });
        (label as any).customData = { id: obj.id + '-label', type: 'wall-label', parentId: obj.id };
        canvas.add(label);

        return; // Already added manually
      } else if (obj.type === 'cable' && obj.points && obj.points.length >= 2) {
        // Cable route — visible line in circuit colour with length label at midpoint.
        // The canvas background is white, so the fallback uses a dark grey (#404040)
        // which is visible against white yet distinct from black walls. Previously
        // the fallback was #6B7280 which rendered as invisible washed-out grey.
        const CIRCUIT_PALETTE: Record<string, string> = {
          L1: '#2563eb', L2: '#60A5FA', S1: '#dc2626', S2: '#F87171',
          C1: '#D97706', EV1: '#059669', FA1: '#DB2777', IH1: '#7C3AED', AC1: '#0891b2',
        };
        const cableColour = CIRCUIT_PALETTE[obj.circuitRef || ''] || '#404040';

        // Walk all waypoints so Phase-5 multi-segment cable routes render
        // correctly without another touch to this block.
        const pts = obj.points;
        const segments: FabricObject[] = [];
        let totalLen = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          totalLen += Math.hypot(b.x - a.x, b.y - a.y);
          segments.push(
            new Line([a.x, a.y, b.x, b.y], {
              stroke: cableColour,
              strokeWidth: 3,
              strokeDashArray: [8, 5],
              strokeLineCap: 'round',
              selectable: false,
              evented: false,
            }) as unknown as FabricObject,
          );
        }

        // Length label at the midpoint of the LONGEST segment so it sits on
        // the main cable run, not on a short perpendicular exit near a symbol.
        let labelX = (pts[0].x + pts[1].x) / 2;
        let labelY = (pts[0].y + pts[1].y) / 2;
        let bestSegLen = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          const segLen = Math.hypot(b.x - a.x, b.y - a.y);
          if (segLen > bestSegLen) {
            bestSegLen = segLen;
            labelX = (a.x + b.x) / 2;
            labelY = (a.y + b.y) / 2;
          }
        }
        const cableLabel = pxToMetres(totalLen);
        const circuitTag = obj.circuitRef ? `${obj.circuitRef} · ` : '';
        const labelText = `${circuitTag}${cableLabel}`;

        // Background pill behind label so it reads against any background
        const labelBg = new Rect({
          left: labelX,
          top: labelY,
          width: labelText.length * 6.8 + 14,
          height: 18,
          fill: 'rgba(10,10,10,0.85)',
          stroke: cableColour,
          strokeWidth: 1,
          rx: 9,
          ry: 9,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });
        const label = new FabricText(labelText, {
          left: labelX,
          top: labelY,
          fontSize: 11,
          fontWeight: '600',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fill: '#ffffff',
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });

        const cableGroup = new Group([...segments, labelBg as unknown as FabricObject, label as unknown as FabricObject], {
          selectable: true,
          hasControls: false,
          evented: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
          lockMovementX: true,
          lockMovementY: true,
          perPixelTargetFind: true,
          hoverCursor: 'pointer',
        });
        (cableGroup as any).customData = {
          id: obj.id,
          type: 'cable',
          stateHash: serialiseCanvasObject(obj),
        };
        canvas.add(cableGroup);
        return;
      } else if (obj.type === 'dimension' && obj.points && obj.points.length >= 2) {
        const p1 = obj.points[0];
        const p2 = obj.points[1];
        const group = createDimensionGroup(p1.x, p1.y, p2.x, p2.y);
        (group as any).customData = { id: obj.id, type: 'dimension', stateHash: serialiseCanvasObject(obj) };
        canvas.add(group);
        return; // Already added manually
      }

      if (fabricObj) {
        canvas.add(fabricObj);
      }
    };

    // Save state for undo
    const saveState = () => {
      undoStack.current.push([...objectsRef.current]);
      if (undoStack.current.length > 50) {
        undoStack.current.shift();
      }
      redoStack.current = [];
    };

    const undo = () => {
      if (undoStack.current.length === 0) {
        // Nothing left to undo — a soft warning beats silence.
        hapticRef.current.warning();
        return;
      }
      hapticRef.current.light();
      const prevState = undoStack.current.pop();
      if (prevState) {
        redoStack.current.push([...objectsRef.current]);
        onObjectsChangeRef.current(prevState);
      }
    };

    const redo = () => {
      if (redoStack.current.length === 0) {
        hapticRef.current.warning();
        return;
      }
      hapticRef.current.light();
      const nextState = redoStack.current.pop();
      if (nextState) {
        undoStack.current.push([...objectsRef.current]);
        onObjectsChangeRef.current(nextState);
      }
    };

    // Canvas-local keyboard shortcuts.
    //
    // Undo/redo deliberately live in DiagramBuilderPage ONLY. They used to be
    // handled here as well, and because both listeners are on `window` a single
    // Cmd+Z fired both and popped the undo stack twice.
    //
    // Every branch below is gated on `isTypingContext` — without it, pressing
    // Backspace to correct a room name in SaveRoomSheet (which autofocuses)
    // deleted whatever was selected on the canvas.
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        if (isTypingContext(e.target)) return;
        // Deleting or pasting must not reach the canvas while a sheet covers it.
        if (isInOverlay(e.target)) return;

        if (e.key === 'Delete' || e.key === 'Backspace') {
          const activeObjects = canvas.getActiveObjects();
          if (activeObjects.length > 0) {
            saveState();
            activeObjects.forEach((obj) => canvas.remove(obj));
            const updatedObjects = objectsRef.current.filter(
              (o) => !activeObjects.some((ao) => (ao as any).customData?.id === o.id)
            );
            onObjectsChangeRef.current(updatedObjects);
            canvas.discardActiveObject();
            canvas.renderAll();
          } else if (selectedWallIdRef.current) {
            saveState();
            const wallId = selectedWallIdRef.current;
            renderWallAdornment(null);
            onObjectsChangeRef.current(objectsRef.current.filter((obj) => obj.id !== wallId));
            onSelectionChangeRef.current?.(null);
          }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
          const activeObjects = canvas.getActiveObjects();
          const selectedIds = activeObjects
            .map((obj) => (obj as any).customData?.id)
            .filter(Boolean);

          clipboardRef.current = objectsRef.current
            .filter((obj) => selectedIds.includes(obj.id))
            .map((obj) => cloneCanvasObjectWithOffset(obj, 0));
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
          if (clipboardRef.current.length > 0) {
            saveState();
            const clones = clipboardRef.current.map((obj) => cloneCanvasObjectWithOffset(obj, 24));
            clipboardRef.current = clones.map((obj) => cloneCanvasObjectWithOffset(obj, 0));
            onObjectsChangeRef.current([...objectsRef.current, ...clones]);
            setTimeout(() => {
              focusOnPoint(
                clones.reduce((sum, obj) => sum + obj.x, 0) / clones.length,
                clones.reduce((sum, obj) => sum + obj.y, 0) / clones.length
              );
            }, 80);
          }
        }
        // Escape clears dimension tool first-click
        if (e.key === 'Escape') {
          dimensionStartRef.current = null;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Clear dimension/cable start when tool changes + sync canvas selection mode
    useEffect(() => {
      if (activeTool !== 'dimension') dimensionStartRef.current = null;
      if (activeTool !== 'cable') cableStartIdRef.current = null;
      const canvas = fabricCanvasRef.current;
      if (canvas) {
        if (activeTool !== 'select') {
          wallDragPreviewRef.current = null;
          renderWallAdornment(null);
        }
        clearWallSnapPreview();
        canvas.selection = activeTool === 'select';
        // Clean up any leftover temp objects from previous tool
        const tempObjs = canvas.getObjects().filter((obj) => (obj as any).isTemp);
        tempObjs.forEach((obj) => canvas.remove(obj));
        if (tempObjs.length > 0) canvas.renderAll();
      }
    }, [activeTool]);

    // Handle mouse/touch events for drawing — registered ONCE, reads from refs (ELE-711 fix)
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const handleMouseDown = (e: any) => {
        // Block drawing during multi-touch gesture (ELE-712)
        if (isTouchGestureRef.current) return;
        // Block drawing while drag-panning — pan is a separate mouse:down
        // handler on this same canvas, so both would otherwise run.
        if (isPanningRef.current) return;

        const tool = activeToolRef.current;

        // Record press location for move-threshold cancellation of long-press
        const downPointer = fabricCanvasRef.current?.getPointer(e.e);
        if (downPointer) {
          mouseDownAtRef.current = { x: downPointer.x, y: downPointer.y };
        }

        // Long-press + double-tap → open PropertiesPanel.
        // Applies when the user taps a selectable object (symbol/cable) in
        // select mode. Cleared on mouse:up, mouse:move beyond threshold,
        // or tool change. See Phase 2 of the Room Planner refactor.
        if (tool === 'select' && e.target) {
          const tappedData = (e.target as any).customData;
          const isPropsCandidate =
            tappedData?.type === 'symbol' ||
            tappedData?.type === 'cable' ||
            tappedData?.type === 'text' ||
            tappedData?.type === 'rectangle' ||
            tappedData?.type === 'line';

          if (isPropsCandidate && tappedData.id) {
            const tappedId: string = tappedData.id;
            const now = Date.now();
            const lastTap = lastTapRef.current;

            // Double-tap (same object within 300ms) → open properties now
            if (lastTap && lastTap.id === tappedId && now - lastTap.time < 300) {
              const obj = objectsRef.current.find((o) => o.id === tappedId);
              if (obj) onRequestPropertiesRef.current?.(obj);
              lastTapRef.current = null;
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
              }
              return;
            }

            lastTapRef.current = { id: tappedId, time: now };

            // Long-press (500ms without release/move) → open properties
            if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = setTimeout(() => {
              const obj = objectsRef.current.find((o) => o.id === tappedId);
              if (obj) onRequestPropertiesRef.current?.(obj);
              longPressTimerRef.current = null;
            }, 500);
          }
        }

        if (tool === 'select') {
          if (e.target) {
            const tapped = e.target as any;
            const customData = tapped.customData;

            if (customData?.type === 'wall-handle') {
              return;
            }

            if (customData?.type === 'wall') {
              const wallObj = getRenderableObjects().find((o) => o.id === customData.id);
              if (wallObj) {
                renderWallAdornment(customData.id);
                onSelectionChangeRef.current?.(null);
              }
            } else if (!customData || customData.type !== 'wall-selection') {
              renderWallAdornment(null);
            }
          } else {
            renderWallAdornment(null);
          }

          // Check if user tapped a wall object — emit onWallTapped
          const wallTapCb = onWallTappedRef.current;
          if (wallTapCb && e.target) {
            const tapped = e.target as any;
            const customData = tapped.customData;
            if (customData?.type === 'wall') {
              const wallObj = objectsRef.current.find((o) => o.id === customData.id);
              if (wallObj?.points && wallObj.points.length >= 2) {
                const p1 = wallObj.points[0];
                const p2 = wallObj.points[1];
                const lengthPx = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                const lengthMetres = lengthPx / SCALE;

                const rawEvent = e.e as MouseEvent | TouchEvent;
                let screenX = 0;
                let screenY = 0;
                if ('touches' in rawEvent && rawEvent.touches.length > 0) {
                  screenX = rawEvent.touches[0].clientX;
                  screenY = rawEvent.touches[0].clientY;
                } else if ('clientX' in rawEvent) {
                  screenX = (rawEvent as MouseEvent).clientX;
                  screenY = (rawEvent as MouseEvent).clientY;
                }

                wallTapCb(customData.id, lengthMetres, { x: screenX, y: screenY });
              }
            }
          }
          return;
        }

        // Eraser tool — tap to delete objects
        if (tool === 'eraser' && e.target) {
          const tapped = e.target as any;
          const customData = tapped.customData;
          if (customData?.id) {
            hapticRef.current.medium();
            saveState();
            if (customData.type === 'wall') {
              const labels = canvas.getObjects().filter(
                (o) => (o as any).customData?.parentId === customData.id
              );
              labels.forEach((l) => canvas.remove(l));
            }
            canvas.remove(e.target);
            renderedObjectIds.current.delete(customData.id);
            canvas.renderAll();
            onObjectsChangeRef.current(objectsRef.current.filter((o) => o.id !== customData.id));
          }
          return;
        }

        // Cable tool — click on symbol to start/end a cable route.
        // Phase 5: circuitRef is inferred from the source symbol's category
        // so a fresh cable has the correct colour even when no circuit has
        // been manually assigned yet.
        if (tool === 'cable' && e.target && (e.target as any).customData?.type === 'symbol') {
          const targetData = (e.target as any).customData;
          const targetObj = objectsRef.current.find((o) => o.id === targetData.id);
          if (!targetObj) return;

          if (!cableStartIdRef.current) {
            hapticRef.current.light();
            cableStartIdRef.current = targetData.id;
            canvas.setActiveObject(e.target);
            canvas.renderAll();
          } else if (cableStartIdRef.current !== targetData.id) {
            saveState();
            const startObj = objectsRef.current.find((o) => o.id === cableStartIdRef.current);
            if (startObj) {
              // Infer circuit from symbol type if neither end has one
              const inferCircuit = (symId?: string): string => {
                if (!symId) return 'S1';
                if (symId.startsWith('light-') || symId === 'extractor-fan') return 'L1';
                if (symId === 'socket-cooker-45a') return 'C1';
                if (symId === 'socket-ev-charger') return 'EV1';
                if (
                  symId.startsWith('smoke-') ||
                  symId.startsWith('heat-') ||
                  symId.startsWith('co-')
                ) return 'FA1';
                if (symId.startsWith('socket-')) return 'S1';
                return 'S1';
              };
              const circuitRef =
                startObj.circuitRef ||
                targetObj.circuitRef ||
                inferCircuit(startObj.symbolId);

              const startPt = { x: startObj.x, y: startObj.y };
              const endPt = { x: targetObj.x, y: targetObj.y };
              const routedPoints = orthogonalRoute(
                startPt,
                endPt,
                extractWalls(objectsRef.current)
              );

              const newCable: CanvasObject = {
                id: `cable-${Date.now()}`,
                type: 'cable',
                x: startObj.x,
                y: startObj.y,
                points: routedPoints,
                circuitRef,
              };
              onObjectsChangeRef.current([...objectsRef.current, newCable]);
              hapticRef.current.success();
            }
            cableStartIdRef.current = null;
            canvas.discardActiveObject();
            canvas.renderAll();
          }
          return;
        }

        // Tapping an existing object with a PLACEMENT tool active means "I want
        // that one" — switch to select (ELE-611).
        //
        // It must NOT apply to the drawing tools. Rooms are drawn by chaining
        // walls, each starting exactly where the last ended — which means every
        // wall after the first begins ON an existing wall's endpoint. Treating
        // that as a select gesture kicked the user out of the Wall tool and
        // silently dropped the wall, so a closed room could not be drawn at all:
        // you got two sides and then found yourself in Select.
        const isPlacementTool = tool === 'symbol' || tool === 'text';
        if (isPlacementTool && e.target && (e.target as any).customData) {
          canvas.setActiveObject(e.target);
          canvas.renderAll();
          onToolChangeRef.current?.('select');
          return;
        }

        const pointer = canvas.getPointer(e.e);
        let x = snapToGrid(pointer.x);
        let y = snapToGrid(pointer.y);

        // Dimension tool uses click-click, not drag
        if (tool === 'dimension') {
          if (!dimensionStartRef.current) {
            dimensionStartRef.current = { x, y };

            const dot = new Circle({
              left: x,
              top: y,
              radius: 3,
              fill: '#333333',
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
            });
            (dot as any).isTemp = true;
            (dot as any).isDimensionDot = true;
            canvas.add(dot);
            canvas.renderAll();
          } else {
            saveState();

            const tempDots = canvas.getObjects().filter((obj) => (obj as any).isDimensionDot);
            tempDots.forEach((obj) => canvas.remove(obj));

            hapticRef.current.light();
            const ds = dimensionStartRef.current;
            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: 'dimension',
              x: ds.x,
              y: ds.y,
              points: [{ x: ds.x, y: ds.y }, { x, y }],
            };
            onObjectsChangeRef.current([...objectsRef.current, newObj]);
            dimensionStartRef.current = null;
          }
          return;
        }

        // Wall tool: snap to existing wall endpoints
        if (tool === 'wall') {
          const snapPoint = findSnapEndpoint(x, y);
          if (snapPoint) {
            x = snapPoint.x;
            y = snapPoint.y;
          }
        }

        isDrawingRef.current = true;
        startPointRef.current = { x, y };

        if (tool === 'symbol' && selectedSymbolIdRef.current) {
          clearWallSnapPreview();
          const symId = selectedSymbolIdRef.current;
          saveState();
          const found = symbolRegistry.find((s) => s.id === symId) ||
                        electricalSymbols.find((s) => s.id === symId);
          if (found) {
            let placeX = x;
            let placeY = y;
            let placeRotation = 0;
            const snappedPlacement = getWallSnapPlacement(x, y, symId, { alwaysSnap: true });
            if (snappedPlacement) {
              placeX = snappedPlacement.x;
              placeY = snappedPlacement.y;
              placeRotation = snappedPlacement.rotation;
            }

            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: 'symbol',
              x: placeX,
              y: placeY,
              width: 40,
              height: 40,
              rotation: placeRotation,
              symbolId: symId,
            };
            onObjectsChangeRef.current([...objectsRef.current, newObj]);
          }
          isDrawingRef.current = false;
        } else if (tool === 'text') {
          saveState();
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: 'text',
            x,
            y,
            text: 'Label',
          };
          onObjectsChangeRef.current([...objectsRef.current, newObj]);
          isDrawingRef.current = false;
        }
      };

      const handleMouseMove = (e: any) => {
        // Block drawing preview during multi-touch gesture
        if (isTouchGestureRef.current) return;
        if (isPanningRef.current) return;

        const tool = activeToolRef.current;
        const pointer = canvas.getPointer(e.e);
        const x = snapToGrid(pointer.x);
        const y = snapToGrid(pointer.y);

        // Cancel long-press timer if user moves more than ~6px — they're
        // dragging, not trying to open properties.
        if (longPressTimerRef.current && mouseDownAtRef.current) {
          const dx = pointer.x - mouseDownAtRef.current.x;
          const dy = pointer.y - mouseDownAtRef.current.y;
          if (Math.hypot(dx, dy) > 6) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
          }
        }

        if (tool === 'symbol') {
          // Preview with the same rule placement uses, so the ghost lands
          // exactly where the tap will put the symbol.
          const snappedPlacement = getWallSnapPlacement(x, y, selectedSymbolIdRef.current, {
            alwaysSnap: true,
          });
          // Pulse as it moves to a DIFFERENT wall, not every frame it stays on
          // one. Keyed on the wall rather than on snapped-vs-not: with
          // always-snap a wall-mounted symbol is permanently snapped, so the
          // old null-to-non-null test would have fired once and gone silent.
          if ((snappedPlacement?.wallId ?? null) !== wasSnappedRef.current) {
            wasSnappedRef.current = snappedPlacement?.wallId ?? null;
            if (snappedPlacement) hapticRef.current.selection();
          }
          renderWallSnapPreview(snappedPlacement);
        } else if (wallSnapPreviewIdsRef.current.size > 0) {
          clearWallSnapPreview();
          canvas.renderAll();
        }

        // Dimension tool preview line from first click to cursor
        const dimStart = dimensionStartRef.current;
        if (tool === 'dimension' && dimStart) {
          const tempPreviews = canvas.getObjects().filter((obj) => (obj as any).isDimensionPreview);
          tempPreviews.forEach((obj) => canvas.remove(obj));

          const previewLine = new Line([dimStart.x, dimStart.y, x, y], {
            stroke: '#666666',
            strokeWidth: 1,
            strokeDashArray: [4, 4],
            selectable: false,
            evented: false,
          });
          (previewLine as any).isTemp = true;
          (previewLine as any).isDimensionPreview = true;
          canvas.add(previewLine);

          const dist = Math.hypot(x - dimStart.x, y - dimStart.y);
          const midX = (dimStart.x + x) / 2;
          const midY = (dimStart.y + y) / 2;
          const liveLabel = new FabricText(pxToMetres(dist), {
            left: midX,
            top: midY - 16,
            fontSize: 10,
            fill: '#333333',
            fontFamily: 'Arial',
            fontWeight: '500',
            originX: 'center',
            selectable: false,
            evented: false,
          });
          (liveLabel as any).isTemp = true;
          (liveLabel as any).isDimensionPreview = true;
          canvas.add(liveLabel);

          canvas.renderAll();
          return;
        }

        const sp = startPointRef.current;
        if (!isDrawingRef.current || !sp || tool === 'symbol' || tool === 'text') return;

        const tempObjects = canvas.getObjects().filter((obj) => (obj as any).isTemp);
        tempObjects.forEach((obj) => canvas.remove(obj));
        clearWallSnapPreview();

        if (tool === 'line') {
          const line = new Line([sp.x, sp.y, x, y], {
            stroke: '#000000', strokeWidth: 2, selectable: false,
          });
          (line as any).isTemp = true;
          canvas.add(line);
        } else if (tool === 'rectangle') {
          const w = Math.abs(x - sp.x);
          const h = Math.abs(y - sp.y);
          const rect = new Rect({
            left: Math.min(sp.x, x),
            top: Math.min(sp.y, y),
            width: w,
            height: h,
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: 2,
            selectable: false,
          });
          (rect as any).isTemp = true;
          canvas.add(rect);

          const dimLabel = new FabricText(`${pxToMetres(w)} \u00d7 ${pxToMetres(h)}`, {
            left: x + 8,
            top: y + 8,
            fontSize: 10,
            fill: '#333333',
            fontFamily: 'Arial',
            fontWeight: '500',
            backgroundColor: 'rgba(255,255,255,0.8)',
            selectable: false,
            evented: false,
          });
          (dimLabel as any).isTemp = true;
          canvas.add(dimLabel);
        } else if (tool === 'wall') {
          const snapped = snapWallDirection(sp.x, sp.y, x, y);
          let endX = snapped.x;
          let endY = snapped.y;

          const snapEnd = findSnapEndpoint(endX, endY);
          if (snapEnd) {
            endX = snapEnd.x;
            endY = snapEnd.y;
          }

          const previewLine = new Line([sp.x, sp.y, endX, endY], {
            stroke: 'rgba(0,0,0,0.4)',
            strokeWidth: WALL_THICKNESS,
            selectable: false,
            evented: false,
          });
          (previewLine as any).isTemp = true;
          canvas.add(previewLine);

          const dist = Math.hypot(endX - sp.x, endY - sp.y);
          const isVertical = Math.abs(endY - sp.y) > Math.abs(endX - sp.x);
          const midX = (sp.x + endX) / 2;
          const midY = (sp.y + endY) / 2;
          const liveLabel = new FabricText(pxToMetres(dist), {
            left: isVertical ? midX + WALL_THICKNESS / 2 + 6 : midX,
            top: isVertical ? midY : midY - WALL_THICKNESS / 2 - 16,
            fontSize: 10,
            fill: '#333333',
            fontFamily: 'Arial',
            fontWeight: '500',
            originX: isVertical ? 'left' : 'center',
            backgroundColor: 'rgba(255,255,255,0.8)',
            selectable: false,
            evented: false,
          });
          (liveLabel as any).isTemp = true;
          canvas.add(liveLabel);

          // Endpoint snap is the moment a room closes cleanly — worth feeling.
          if (!!snapEnd !== wasEndpointSnappedRef.current) {
            wasEndpointSnappedRef.current = !!snapEnd;
            if (snapEnd) hapticRef.current.light();
          }

          if (snapEnd) {
            const snapIndicator = new Circle({
              left: snapEnd.x,
              top: snapEnd.y,
              radius: 5,
              fill: 'rgba(250,204,21,0.7)',
              stroke: '#EAB308',
              strokeWidth: 1,
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
            });
            (snapIndicator as any).isTemp = true;
            canvas.add(snapIndicator);
          }

          const snapStart = findSnapEndpoint(sp.x, sp.y);
          if (snapStart && (snapStart.x === sp.x && snapStart.y === sp.y)) {
            const snapIndicator = new Circle({
              left: snapStart.x,
              top: snapStart.y,
              radius: 5,
              fill: 'rgba(250,204,21,0.7)',
              stroke: '#EAB308',
              strokeWidth: 1,
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false,
            });
            (snapIndicator as any).isTemp = true;
            canvas.add(snapIndicator);
          }
        }

        canvas.renderAll();
      };

      const handleMouseUp = (e: any) => {
        // Cancel any pending long-press on release — a quick tap-and-release
        // should never open the PropertiesPanel.
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
        mouseDownAtRef.current = null;

        // Block if gesture was multi-touch
        if (isTouchGestureRef.current) return;
        if (isPanningRef.current) return;

        const sp = startPointRef.current;
        if (!isDrawingRef.current || !sp) return;

        const tool = activeToolRef.current;
        if (tool === 'symbol' || tool === 'text' || tool === 'dimension') return;

        const pointer = canvas.getPointer(e.e);
        const x = snapToGrid(pointer.x);
        const y = snapToGrid(pointer.y);

        saveState();

        const tempObjects = canvas.getObjects().filter((obj) => (obj as any).isTemp);
        tempObjects.forEach((obj) => canvas.remove(obj));

        if (tool === 'line') {
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: 'line',
            x: sp.x,
            y: sp.y,
            points: [{ x: sp.x, y: sp.y }, { x, y }],
          };
          onObjectsChangeRef.current([...objectsRef.current, newObj]);
        } else if (tool === 'rectangle') {
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: 'rectangle',
            x: Math.min(sp.x, x),
            y: Math.min(sp.y, y),
            width: Math.abs(x - sp.x),
            height: Math.abs(y - sp.y),
            rotation: 0,
          };
          onObjectsChangeRef.current([...objectsRef.current, newObj]);
        } else if (tool === 'wall') {
          const snapped = snapWallDirection(sp.x, sp.y, x, y);
          let endX = snapped.x;
          let endY = snapped.y;

          const snapEnd = findSnapEndpoint(endX, endY);
          if (snapEnd) {
            endX = snapEnd.x;
            endY = snapEnd.y;
          }

          const dist = Math.hypot(endX - sp.x, endY - sp.y);
          if (dist > 5) {
            hapticRef.current.light();
            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: 'wall',
              x: sp.x,
              y: sp.y,
              points: [{ x: sp.x, y: sp.y }, { x: endX, y: endY }],
            };
            onObjectsChangeRef.current([...objectsRef.current, newObj]);
          }
        }

        isDrawingRef.current = false;
        startPointRef.current = null;
        wasEndpointSnappedRef.current = false;
        wasSnappedRef.current = null;
        canvas.renderAll();
      };

      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:up', handleMouseUp);

      return () => {
        canvas.off('mouse:down', handleMouseDown);
        canvas.off('mouse:move', handleMouseMove);
        canvas.off('mouse:up', handleMouseUp);
      };
    }, []);

    // Handle object modifications
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const handleObjectModified = (e: any) => {
        const modifiedObj = e.target;
        const customData = (modifiedObj as any).customData;
        if (!customData) return;

        if (customData.type === 'wall-handle') {
          const previewObjects = wallDragPreviewRef.current ?? getRenderableObjects();
          saveState();
          wallDragPreviewRef.current = null;
          onObjectsChangeRef.current(previewObjects);
          renderWallAdornment(customData.wallId);
          return;
        }

        saveState();
        clearWallSnapPreview();

        // Move circuit colour dots to follow the symbol
        if (customData.type === 'symbol') {
          const dots = canvas.getObjects().filter(
            (o) => (o as any).customData?.type === 'circuit-dot' &&
                   (o as any).customData?.parentId === customData.id
          );
          const moved = objectsRef.current.find((o) => o.id === customData.id);
          if (moved) {
            // Re-run placement rather than translating by a fixed offset — the
            // symbol may have been dragged next to something else.
            const spot = findTagSpot(
              { ...moved, x: modifiedObj.left || moved.x, y: modifiedObj.top || moved.y },
              objectsRef.current
            );
            dots.forEach((dot) => dot.set({ left: spot.x, top: spot.y }));
          }
          if (dots.length > 0) canvas.renderAll();
        }

        const updatedObjects = objectsRef.current.map((obj) => {
          if (obj.id === customData.id) {
            // Symbols are fixed size — only save position and rotation
            if (customData.type === 'symbol') {
              // Reset any accidental scaling back to 1:1 (ELE-712 safety)
              modifiedObj.set({ scaleX: 1.2, scaleY: 1.2 });
              const updatedObject = {
                ...obj,
                // ?? not || — rotating an item back to 0deg is a real value,
                // and the falsy check silently kept the previous angle.
                x: modifiedObj.left ?? obj.x,
                y: modifiedObj.top ?? obj.y,
                rotation: modifiedObj.angle ?? obj.rotation ?? 0,
              };
              customData.stateHash = serialiseCanvasObject(updatedObject);
              return updatedObject;
            }

            if ((customData.type === 'line' || customData.type === 'wall' || customData.type === 'cable' || customData.type === 'dimension') && obj.points && obj.points.length >= 2) {
              const currentBounds = getBoundsForObjects([obj]);
              const nextLeft = modifiedObj.left ?? currentBounds?.minX ?? obj.x;
              const nextTop = modifiedObj.top ?? currentBounds?.minY ?? obj.y;
              const deltaX = nextLeft - (currentBounds?.minX ?? obj.x);
              const deltaY = nextTop - (currentBounds?.minY ?? obj.y);
              const nextPoints = obj.points.map((point) => ({
                x: point.x + deltaX,
                y: point.y + deltaY,
              }));
              const updatedObject = {
                ...obj,
                x: (obj.x || 0) + deltaX,
                y: (obj.y || 0) + deltaY,
                points: nextPoints,
                rotation: modifiedObj.angle || obj.rotation || 0,
              };
              customData.stateHash = serialiseCanvasObject(updatedObject);
              return updatedObject;
            }

            if (customData.type === 'text') {
              const updatedObject = {
                ...obj,
                x: modifiedObj.left || obj.x,
                y: modifiedObj.top || obj.y,
                rotation: modifiedObj.angle || obj.rotation || 0,
                text: modifiedObj.text || obj.text,
              };
              customData.stateHash = serialiseCanvasObject(updatedObject);
              return updatedObject;
            }

            const updatedObject = {
              ...obj,
              x: modifiedObj.left || obj.x,
              y: modifiedObj.top || obj.y,
              width: (modifiedObj.width || obj.width || 100) * (modifiedObj.scaleX || 1),
              height: (modifiedObj.height || obj.height || 100) * (modifiedObj.scaleY || 1),
              rotation: modifiedObj.angle || obj.rotation || 0,
            };
            customData.stateHash = serialiseCanvasObject(updatedObject);
            return updatedObject;
          }
          return obj;
        });

        onObjectsChangeRef.current(updatedObjects);
      };

      // Wall snap while dragging wall-mount symbols
      const handleObjectMoving = (e: any) => {
        const movingObj = e.target;
        const customData = (movingObj as any).customData;
        if (!customData) return;

        if (customData.type === 'wall-handle') {
          const snapshot = wallDragPreviewRef.current ?? getRenderableObjects();
          const nextObjects = buildWallEndpointUpdate(snapshot, customData.wallId, customData.endpointIndex, {
            x: snapToGrid(movingObj.left || 0),
            y: snapToGrid(movingObj.top || 0),
          });
          wallDragPreviewRef.current = nextObjects;
          nextObjects
            .filter((obj) => obj.type === 'wall')
            .forEach((wall) => redrawWallVisual(wall));
          renderWallAdornment(customData.wallId);
          return;
        }

        if (customData.type !== 'symbol') return;

        const snappedPlacement = getWallSnapPlacement(
          movingObj.left || 0,
          movingObj.top || 0,
          customData.symbolId
        );

        if ((snappedPlacement?.wallId ?? null) !== wasSnappedRef.current) {
          wasSnappedRef.current = snappedPlacement?.wallId ?? null;
          if (snappedPlacement) hapticRef.current.selection();
        }
        if (snappedPlacement) {
          movingObj.set({
            left: snappedPlacement.x,
            top: snappedPlacement.y,
            angle: snappedPlacement.rotation,
          });
          renderWallSnapPreview(snappedPlacement);
        } else if (wallSnapPreviewIdsRef.current.size > 0) {
          clearWallSnapPreview();
          canvas.renderAll();
        }
      };

      canvas.on('object:modified', handleObjectModified);
      canvas.on('object:moving', handleObjectMoving);
      return () => {
        canvas.off('object:modified', handleObjectModified);
        canvas.off('object:moving', handleObjectMoving);
      };
    }, []);

    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const emitSelection = (target?: FabricObject | null) => {
        if (!target) {
          renderWallAdornment(null);
          onSelectionChangeRef.current?.(null);
          return;
        }

        const customData = (target as any).customData;
        if (
          !customData?.id ||
          customData.type === 'wall-label' ||
          customData.type === 'circuit-dot' ||
          customData.type === 'wall-handle' ||
          customData.type === 'wall-selection'
        ) {
          onSelectionChangeRef.current?.(null);
          return;
        }

        if (customData.type !== 'wall') {
          renderWallAdornment(null);
        }
        const selected = objectsRef.current.find((obj) => obj.id === customData.id) || null;
        if (selected) hapticRef.current.selection();
        onSelectionChangeRef.current?.(selected);
      };

      const handleSelectionCreated = (e: any) => emitSelection(e.selected?.[0] || e.target || null);
      const handleSelectionUpdated = (e: any) => emitSelection(e.selected?.[0] || e.target || null);
      const handleSelectionCleared = () => emitSelection(null);

      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);
      canvas.on('selection:cleared', handleSelectionCleared);

      return () => {
        canvas.off('selection:created', handleSelectionCreated);
        canvas.off('selection:updated', handleSelectionUpdated);
        canvas.off('selection:cleared', handleSelectionCleared);
      };
    }, []);

    // Rotate selected object 90° or rotate all if nothing selected
    const handleRotate = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const active = canvas.getActiveObject();
      if (active) {
        // Rotate just the selected object
        const currentAngle = active.angle || 0;
        active.rotate(currentAngle + 90);
        canvas.renderAll();

        // Update React state
        const customData = (active as any).customData;
        if (customData?.id) {
          const updated = objectsRef.current.map((obj) =>
            obj.id === customData.id ? { ...obj, rotation: (obj.rotation || 0) + 90 } : obj
          );
          onObjectsChangeRef.current(updated);
        }
      } else if (onRotate) {
        // No selection — rotate everything
        onRotate();
      }
    };

    // Zoom controls.
    //
    // These used `setZoom`, which scales about the canvas ORIGIN — so zooming
    // in pushed whatever you were looking at off toward the bottom-right and
    // you had to hunt for it. Zooming about the viewport centre keeps the
    // thing you are working on under the cursor, which is what the buttons
    // are assumed to do.
    const zoomAboutCentre = (factor: number) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const next = Math.min(Math.max(canvas.getZoom() * factor, 0.1), 5);
      canvas.zoomToPoint(
        new Point((canvas.width || 0) / 2, (canvas.height || 0) / 2),
        next
      );
      setZoomLevel(next);
      drawGrid(canvas, gridEnabledRef.current);
      canvas.renderAll();
    };

    const handleZoomIn = () => zoomAboutCentre(1.2);
    const handleZoomOut = () => zoomAboutCentre(0.8);

    const handleResetView = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      if (objectsRef.current.length > 0) {
        zoomToFit();
        return;
      }
      canvas.setZoom(1);
      setZoomLevel(1);
      canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
      drawGrid(canvas, gridEnabledRef.current);
      canvas.renderAll();
    };

    // Calculate scale bar width based on zoom
    const scaleBarWidth = Math.round(SCALE * zoomLevel);

    return (
      <div ref={wrapperRef} className="w-full h-full overflow-hidden relative">
        <canvas ref={canvasRef} />

        {/* Scale Bar Overlay — bottom-left */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-[10px]">
          <div className="h-3 border-l border-white/80" />
          <div style={{ width: `${scaleBarWidth}px` }} className="border-t border-white/80" />
          <div className="h-3 border-l border-white/80" />
          <span className="ml-1">1m</span>
        </div>

        {/* Zoom / view controls — only once there is something to look at.
            Four 44px buttons run 176px down the right edge, which on a phone
            collided with the empty-state card and cluttered the very first
            thing a user sees, on a canvas with nothing to zoom or rotate. */}
        {objects.length > 0 && (
        <div className="absolute top-3 right-3 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl divide-y divide-white/10">
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomIn}
            className="h-11 w-11 sm:h-10 sm:w-10 rounded-none border-0 bg-transparent text-white hover:bg-white/10 touch-manipulation"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomOut}
            className="h-11 w-11 sm:h-10 sm:w-10 rounded-none border-0 bg-transparent text-white hover:bg-white/10 touch-manipulation"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleResetView}
            className="h-11 w-11 sm:h-10 sm:w-10 rounded-none border-0 bg-transparent text-white hover:bg-white/10 touch-manipulation"
            title="Reset View"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleRotate}
            className="h-11 w-11 sm:h-10 sm:w-10 rounded-none border-0 bg-transparent text-white hover:bg-white/10 touch-manipulation"
            title="Rotate 90°"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        )}

        {/* Minimap — bottom-right overview. Driven by state rather than
            reading fabricCanvasRef during render: a ref mutation doesn't
            re-render, so the minimap only ever populated by accident when
            some other state change happened to follow canvas init. */}
        {showMinimap && <MinimapOverlay fabricCanvas={canvasReady} />}
      </div>
    );
  }
);

DiagramCanvas.displayName = 'DiagramCanvas';
