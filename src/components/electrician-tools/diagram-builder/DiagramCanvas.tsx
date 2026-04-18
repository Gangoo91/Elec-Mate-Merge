import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Canvas as FabricCanvas, Rect, Line, FabricText, FabricObject, Group, Circle, Path, Point, loadSVGFromString, util } from 'fabric';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from './symbols/symbolRegistry';
import { electricalSymbols } from './symbols/electricalSymbols';
import { loadSymbolSvg } from './symbols/svgLoader';
import { extractWalls, orthogonalRoute } from './cableRouter';
import { ZoomIn, ZoomOut, Maximize2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

    // Event-driven updates instead of polling
    fabricCanvas.on('after:render', update);
    fabricCanvas.on('object:modified', update);
    fabricCanvas.on('object:added', update);
    fabricCanvas.on('object:removed', update);
    update();

    return () => {
      fabricCanvas.off('after:render', update);
      fabricCanvas.off('object:modified', update);
      fabricCanvas.off('object:added', update);
      fabricCanvas.off('object:removed', update);
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

// Scale: 52px = 1 metre
const SCALE = 52;
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

const WALL_SNAP_THRESHOLD = 32;
const WALL_MOUNT_OFFSET = 14;
const WALL_END_MARGIN = 12;
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

const isWallMountSymbol = (symbolId?: string | null): boolean => {
  if (!symbolId) return false;
  const sym = symbolRegistry.find((entry) => entry.id === symbolId);
  return !!sym && (sym.mountType === 'wall' || sym.mountType === 'panel');
};

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

interface WallSnapPlacement {
  x: number;
  y: number;
  rotation: number;
  projectedX: number;
  projectedY: number;
  wallId: string;
}

const pointsMatch = (
  a: { x: number; y: number },
  b: { x: number; y: number },
  tolerance = WALL_POINT_MATCH_TOLERANCE
) => Math.abs(a.x - b.x) <= tolerance && Math.abs(a.y - b.y) <= tolerance;

export const DiagramCanvas = forwardRef<any, DiagramCanvasProps>(
  ({ activeTool, selectedSymbolId, objects, onObjectsChange, onSelectionChange, onRequestProperties, gridEnabled, snapEnabled, headerHeight = 48, toolbarHeight = 56, onWallTapped, onRotate, onToolChange, showMinimap = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const aiRenderActiveRef = useRef(false);
    // Block single-finger handlers during multi-touch pinch/pan (ELE-712)
    const isTouchGestureRef = useRef(false);
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

    const getWallSnapPlacement = (
      x: number,
      y: number,
      symbolId?: string | null
    ): WallSnapPlacement | null => {
      if (!isWallMountSymbol(symbolId)) return null;

      const wallObjects = objectsRef.current.filter(
        (obj) => obj.type === 'wall' && obj.points && obj.points.length >= 2
      );

      let best:
        | (WallSnapPlacement & { distance: number })
        | null = null;

      for (const wall of wallObjects) {
        const p1 = wall.points![0];
        const p2 = wall.points![1];
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

        if (distance > WALL_SNAP_THRESHOLD) continue;

        const side = (x - projX) * normalX + (y - projY) * normalY >= 0 ? 1 : -1;
        const snapX = projX + normalX * WALL_MOUNT_OFFSET * side;
        const snapY = projY + normalY * WALL_MOUNT_OFFSET * side;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

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

      return best
        ? {
            x: best.x,
            y: best.y,
            rotation: best.rotation,
            projectedX: best.projectedX,
            projectedY: best.projectedY,
            wallId: best.wallId,
          }
        : null;
    };

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

    // Zoom canvas to fit all non-grid objects with padding
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

      const zoomX = (canvasWidth - padding * 2) / contentWidth;
      const zoomY = (canvasHeight - padding * 2) / contentHeight;
      const zoom = Math.min(zoomX, zoomY, 2); // Don't zoom in more than 2x

      canvas.setZoom(zoom);
      const vpw = canvasWidth / zoom;
      const vph = canvasHeight / zoom;
      const centreX = minX + contentWidth / 2;
      const centreY = minY + contentHeight / 2;
      canvas.viewportTransform = [zoom, 0, 0, zoom, canvasWidth / 2 - centreX * zoom, canvasHeight / 2 - centreY * zoom];
      setZoomLevel(zoom);
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
      zoomToFit,
      focusOnPoint,
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
      renderAIRoom: async (roomData: any) => {
        if (!fabricCanvasRef.current) return;

        aiRenderActiveRef.current = true;
        const canvas = fabricCanvasRef.current;
        const scale = SCALE;
        const offsetX = 100;
        const offsetY = 100;

        // Clear existing objects but redraw grid
        canvas.clear();
        canvas.backgroundColor = '#FFFFFF';

        // Redraw grid after clear
        if (gridEnabledRef.current) {
          const gridSize = 10;
          const gw = canvas.width || 1200;
          const gh = canvas.height || 600;
          for (let i = 0; i < gw / gridSize; i++) {
            const isMajor = i % 5 === 0;
            canvas.add(new Line([i * gridSize, 0, i * gridSize, gh], {
              stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
            }));
          }
          for (let i = 0; i < gh / gridSize; i++) {
            const isMajor = i % 5 === 0;
            canvas.add(new Line([0, i * gridSize, gw, i * gridSize], {
              stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
            }));
          }
        }

        // Draw walls as lines
        const walls = roomData.walls || [];
        let currentX = offsetX;
        let currentY = offsetY;

        walls.forEach((wall: any) => {
          const length = wall.length * scale;
          let endX = currentX;
          let endY = currentY;

          if (wall.id === 'north') endX = currentX + length;
          else if (wall.id === 'east') endY = currentY + length;
          else if (wall.id === 'south') endX = currentX - length;
          else if (wall.id === 'west') endY = currentY - length;

          const wallThickness = WALL_THICKNESS;
          const isVertical = Math.abs(endX - currentX) < Math.abs(endY - currentY);

          if (isVertical) {
            const wallRect = new Rect({
              left: currentX - wallThickness / 2,
              top: Math.min(currentY, endY),
              width: wallThickness,
              height: Math.abs(endY - currentY),
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 1,
              selectable: false,
            });
            canvas.add(wallRect);
          } else {
            const wallRect = new Rect({
              left: Math.min(currentX, endX),
              top: currentY - wallThickness / 2,
              width: Math.abs(endX - currentX),
              height: wallThickness,
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 1,
              selectable: false,
            });
            canvas.add(wallRect);
          }

          const midX = (currentX + endX) / 2;
          const midY = (currentY + endY) / 2;
          const label = new FabricText(`${wall.length}m`, {
            left: midX,
            top: midY - 20,
            fontSize: 12,
            fill: '#000000',
            fontFamily: 'Arial',
            fontWeight: '500',
            selectable: false,
          });
          canvas.add(label);

          currentX = endX;
          currentY = endY;
        });

        // Place electrical symbols (async)
        const SYMBOL_INSET = 4;
        const roomWidth = walls[0]?.length * scale || 200;
        const roomHeight = walls[1]?.length * scale || 200;

        const symbols = roomData.symbols || [];
        const symbolPromises = symbols.map(async (symbol: any) => {
          // ELE-604: Strip -bs7671 suffix from AI-generated symbol IDs
          const symbolId = symbol.type.replace(/-bs7671$/, '');

          // Try symbolRegistry first, then fall back to legacy electricalSymbols
          const registrySymbol = symbolRegistry.find((s) => s.id === symbolId);
          const legacySymbol = electricalSymbols.find((s) => s.id === symbolId);

          if (!registrySymbol && !legacySymbol) {
            console.warn(`Symbol not found: ${symbol.type} (resolved: ${symbolId})`);
            return;
          }

          let symbolX = offsetX + 20;
          let symbolY = offsetY + 20;

          // ELE-589: Calculate symbol position INSIDE the room
          if (symbol.position === 'center') {
            symbolX = offsetX + roomWidth / 2;
            symbolY = offsetY + roomHeight / 2;
          } else if (symbol.wall) {
            const positionOnWall = (symbol.position || 0) * scale;

            if (symbol.wall === 'north') {
              symbolX = offsetX + positionOnWall;
              symbolY = offsetY + WALL_THICKNESS + SYMBOL_INSET;
            } else if (symbol.wall === 'south') {
              symbolX = offsetX + positionOnWall;
              symbolY = offsetY + roomHeight - WALL_THICKNESS - SYMBOL_INSET - 20;
            } else if (symbol.wall === 'east') {
              symbolX = offsetX + roomWidth - WALL_THICKNESS - SYMBOL_INSET - 20;
              symbolY = offsetY + positionOnWall;
            } else if (symbol.wall === 'west') {
              symbolX = offsetX + WALL_THICKNESS + SYMBOL_INSET;
              symbolY = offsetY + positionOnWall;
            }
          }

          // Load SVG via the new loader
          try {
            const svgString = await loadSymbolSvg(symbolId);
            const { objects: svgObjects } = await loadSVGFromString(svgString);
            const validObjects = svgObjects.filter((o): o is FabricObject => o !== null);
            if (validObjects.length > 0) {
              const group = util.groupSVGElements(validObjects, {
                left: symbolX,
                top: symbolY,
                scaleX: 1.2,
                scaleY: 1.2,
                selectable: true,
                hasControls: false,
                lockScalingX: true,
                lockScalingY: true,
                originX: 'center',
                originY: 'center',
              });
              group.set({ fill: '#000000', stroke: '#000000' });
              canvas.add(group);
            }
          } catch (err) {
            console.warn('Failed to load SVG for AI symbol:', symbolId, err);
          }
        });

        await Promise.all(symbolPromises);

        // Add room title
        if (roomData.room?.name) {
          const title = new FabricText(roomData.room.name, {
            left: offsetX,
            top: offsetY - 50,
            fontSize: 18,
            fill: '#000000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            selectable: false,
          });
          canvas.add(title);
        }

        // Scale bar in bottom-left
        const scaleBarMetres = 1;
        const scaleBarPx = scaleBarMetres * scale;
        const scaleBarX = 20;
        const scaleBarY = (canvas.height || 600) - 30;

        const scaleBarLine = new Line([scaleBarX, scaleBarY, scaleBarX + scaleBarPx, scaleBarY], {
          stroke: '#000000', strokeWidth: 2, selectable: false, evented: false,
        });
        canvas.add(scaleBarLine);

        const tickLeft = new Line([scaleBarX, scaleBarY - 5, scaleBarX, scaleBarY + 5], {
          stroke: '#000000', strokeWidth: 2, selectable: false, evented: false,
        });
        canvas.add(tickLeft);

        const tickRight = new Line([scaleBarX + scaleBarPx, scaleBarY - 5, scaleBarX + scaleBarPx, scaleBarY + 5], {
          stroke: '#000000', strokeWidth: 2, selectable: false, evented: false,
        });
        canvas.add(tickRight);

        const scaleLabel = new FabricText(`${scaleBarMetres}m`, {
          left: scaleBarX + scaleBarPx / 2,
          top: scaleBarY - 18,
          fontSize: 11,
          fill: '#000000',
          fontFamily: 'Arial',
          fontWeight: '500',
          selectable: false,
          originX: 'center',
        });
        canvas.add(scaleLabel);

        canvas.renderAll();

        // Sync AI-generated objects to React state so "Done" can save them
        const newCanvasObjects: any[] = [];

        // Add walls as CanvasObjects
        let wx = offsetX, wy = offsetY;
        walls.forEach((wall: any, idx: number) => {
          const length = wall.length * scale;
          let ex = wx, ey = wy;
          if (wall.id === 'north') ex = wx + length;
          else if (wall.id === 'east') ey = wy + length;
          else if (wall.id === 'south') ex = wx - length;
          else if (wall.id === 'west') ey = wy - length;

          newCanvasObjects.push({
            id: `ai-wall-${idx}-${Date.now()}`,
            type: 'wall',
            x: wx, y: wy,
            points: [{ x: wx, y: wy }, { x: ex, y: ey }],
          });
          wx = ex; wy = ey;
        });

        // Add symbols as CanvasObjects
        symbols.forEach((symbol: any, idx: number) => {
          const symbolId = symbol.type.replace(/-bs7671$/, '');
          let sx = offsetX + 20, sy = offsetY + 20;
          if (symbol.position === 'center') {
            sx = offsetX + roomWidth / 2; sy = offsetY + roomHeight / 2;
          } else if (symbol.wall) {
            const pos = (symbol.position || 0) * scale;
            if (symbol.wall === 'north') { sx = offsetX + pos; sy = offsetY + WALL_THICKNESS + SYMBOL_INSET; }
            else if (symbol.wall === 'south') { sx = offsetX + pos; sy = offsetY + roomHeight - WALL_THICKNESS - SYMBOL_INSET - 20; }
            else if (symbol.wall === 'east') { sx = offsetX + roomWidth - WALL_THICKNESS - SYMBOL_INSET - 20; sy = offsetY + pos; }
            else if (symbol.wall === 'west') { sx = offsetX + WALL_THICKNESS + SYMBOL_INSET; sy = offsetY + pos; }
          }
          newCanvasObjects.push({
            id: `ai-sym-${idx}-${Date.now()}`,
            type: 'symbol',
            x: sx, y: sy,
            width: 40, height: 40,
            rotation: 0,
            symbolId,
          });
        });

        onObjectsChangeRef.current(newCanvasObjects);
        aiRenderActiveRef.current = false;

        // Auto-zoom to fit the generated room on screen
        setTimeout(() => zoomToFit(), 100);
      },
    }));

    // Initialize Fabric.js canvas
    useEffect(() => {
      if (!canvasRef.current) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight - headerHeight - toolbarHeight;

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

      fabricCanvasRef.current = canvas;

      // Draw initial grid immediately
      if (gridEnabled) {
        const gridSize = 10;
        for (let i = 0; i <= canvasWidth / gridSize; i++) {
          const isMajor = i % 5 === 0;
          const line = new Line([i * gridSize, 0, i * gridSize, canvasHeight], {
            stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
          });
          (line as any).isGridLine = true;
          canvas.add(line);
        }
        for (let i = 0; i <= canvasHeight / gridSize; i++) {
          const isMajor = i % 5 === 0;
          const line = new Line([0, i * gridSize, canvasWidth, i * gridSize], {
            stroke: isMajor ? '#999999' : '#CCCCCC', strokeWidth: isMajor ? 1 : 0.5, selectable: false, evented: false,
          });
          (line as any).isGridLine = true;
          canvas.add(line);
        }
        canvas.renderAll();
      }

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

      // Handle window resize — fill available space
      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight - headerHeight - toolbarHeight;
        canvas.setDimensions({ width: newWidth, height: newHeight });
        canvas.renderAll();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.off('mouse:move', handleTouchGesture);
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

      // Remove existing grid lines
      const gridObjects = canvas.getObjects().filter((obj) => (obj as any).isGridLine);
      gridObjects.forEach((obj) => canvas.remove(obj));

      if (gridEnabled) {
        const gridSize = 10;
        const width = canvas.width || 1200;
        const height = canvas.height || 600;

        for (let i = 0; i <= width / gridSize; i++) {
          const isMajor = i % 5 === 0;
          const line = new Line([i * gridSize, 0, i * gridSize, height], {
            stroke: isMajor ? '#999999' : '#CCCCCC',
            strokeWidth: isMajor ? 1 : 0.5,
            selectable: false,
            evented: false,
          });
          (line as any).isGridLine = true;
          canvas.add(line);
          canvas.sendObjectToBack(line);
        }

        for (let i = 0; i <= height / gridSize; i++) {
          const isMajor = i % 5 === 0;
          const line = new Line([0, i * gridSize, width, i * gridSize], {
            stroke: isMajor ? '#999999' : '#CCCCCC',
            strokeWidth: isMajor ? 1 : 0.5,
            selectable: false,
            evented: false,
          });
          (line as any).isGridLine = true;
          canvas.add(line);
          canvas.sendObjectToBack(line);
        }
      }

      canvas.renderAll();
    }, [gridEnabled]);

    // Sync new objects from React state to Fabric canvas (add only, no clear/rebuild)
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // Skip if AI render is active
      if (aiRenderActiveRef.current) {
        aiRenderActiveRef.current = false;
        return;
      }

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
            if (cd?.type === 'symbol' || cd?.type === 'circuit-dot' || cd?.type === 'cable') {
              canvas.bringObjectToFront(fObj);
            }
          });
          canvas.renderAll();
        }

        if (selectedWallIdRef.current) {
          const wallStillExists = objects.some((obj) => obj.id === selectedWallIdRef.current && obj.type === 'wall');
          renderWallAdornment(wallStillExists ? selectedWallIdRef.current : null);
        }
      };
      addNewObjects();
    }, [objects]);

    // Snap to grid helper
    const snapToGrid = (value: number) => {
      if (!snapEnabledRef.current) return value;
      const gridSize = 10;
      return Math.round(value / gridSize) * gridSize;
    };

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
      const mainLine = new Line([x1, y1, x2, y2], {
        stroke: '#333333',
        strokeWidth: 1,
        selectable: false,
      });
      elements.push(mainLine as unknown as FabricObject);

      // Tick marks (perpendicular end lines)
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

      // Arrowheads
      const angle = Math.atan2(dy, dx);
      const addArrow = (tipX: number, tipY: number, pointAngle: number) => {
        const a1x = tipX - arrowSize * Math.cos(pointAngle - Math.PI / 6);
        const a1y = tipY - arrowSize * Math.sin(pointAngle - Math.PI / 6);
        const a2x = tipX - arrowSize * Math.cos(pointAngle + Math.PI / 6);
        const a2y = tipY - arrowSize * Math.sin(pointAngle + Math.PI / 6);
        elements.push(new Line([tipX, tipY, a1x, a1y], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
        elements.push(new Line([tipX, tipY, a2x, a2y], {
          stroke: '#333333', strokeWidth: 1, selectable: false,
        }) as unknown as FabricObject);
      };

      addArrow(x1, y1, angle + Math.PI); // arrow pointing away from start towards start
      addArrow(x2, y2, angle); // arrow pointing away from end towards end

      // Wait — arrows should point outward from the line ends.
      // Actually for dimension lines: arrows point INWARD. Let me fix:
      // Arrow at start points toward end (angle), arrow at end points toward start (angle + PI)
      // Let me redo:
      elements.length = 0; // clear and redo

      // Main line
      elements.push(new Line([x1, y1, x2, y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

      // Tick marks
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

      // Arrowhead at start (pointing toward end)
      const a1x1 = x1 + arrowSize * Math.cos(angle - Math.PI / 6);
      const a1y1 = y1 + arrowSize * Math.sin(angle - Math.PI / 6);
      const a1x2 = x1 + arrowSize * Math.cos(angle + Math.PI / 6);
      const a1y2 = y1 + arrowSize * Math.sin(angle + Math.PI / 6);
      elements.push(new Line([x1, y1, a1x1, a1y1], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);
      elements.push(new Line([x1, y1, a1x2, a1y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

      // Arrowhead at end (pointing toward start)
      const reverseAngle = angle + Math.PI;
      const a2x1 = x2 + arrowSize * Math.cos(reverseAngle - Math.PI / 6);
      const a2y1 = y2 + arrowSize * Math.sin(reverseAngle - Math.PI / 6);
      const a2x2 = x2 + arrowSize * Math.cos(reverseAngle + Math.PI / 6);
      const a2y2 = y2 + arrowSize * Math.sin(reverseAngle + Math.PI / 6);
      elements.push(new Line([x2, y2, a2x1, a2y1], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);
      elements.push(new Line([x2, y2, a2x2, a2y2], {
        stroke: '#333333', strokeWidth: 1, selectable: false,
      }) as unknown as FabricObject);

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

        // Circuit colour dot — small indicator showing which circuit this symbol is on
        if (obj.circuitRef && fabricObj) {
          const COLOURS: Record<string, string> = {
            L1: '#3B82F6', L2: '#60A5FA', S1: '#EF4444', S2: '#F87171',
            C1: '#F59E0B', EV1: '#10B981', FA1: '#EC4899', IH1: '#8B5CF6', AC1: '#06B6D4',
          };
          const dotColour = COLOURS[obj.circuitRef] || '#6B7280';
          const dot = new Circle({
            radius: 4,
            fill: dotColour,
            stroke: '#000000',
            strokeWidth: 0.5,
            left: (fabricObj.left || 0) + 16,
            top: (fabricObj.top || 0) - 16,
            selectable: false,
            evented: false,
            originX: 'center',
            originY: 'center',
          });
          (dot as any).customData = { type: 'circuit-dot', parentId: obj.id };
          canvas.add(dot);
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
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 1,
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
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 1,
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
        const label = new FabricText(labelText, {
          left: isVertical ? midX + WALL_THICKNESS / 2 + 6 : midX,
          top: isVertical ? midY : midY - WALL_THICKNESS / 2 - 16,
          fontSize: 10,
          fill: '#000000',
          fontFamily: 'Arial',
          fontWeight: '500',
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
      if (undoStack.current.length === 0) return;
      const prevState = undoStack.current.pop();
      if (prevState) {
        redoStack.current.push([...objectsRef.current]);
        onObjectsChangeRef.current(prevState);
      }
    };

    const redo = () => {
      if (redoStack.current.length === 0) return;
      const nextState = redoStack.current.pop();
      if (nextState) {
        undoStack.current.push([...objectsRef.current]);
        onObjectsChangeRef.current(nextState);
      }
    };

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
          e.preventDefault();
          redo();
        }
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
            }
            cableStartIdRef.current = null;
            canvas.discardActiveObject();
            canvas.renderAll();
          }
          return;
        }

        // Always allow tapping existing objects to select them (except in eraser/cable mode)
        // Fixes ELE-611: wall-draw cursor stays active when clicking placed symbols
        if (tool !== 'eraser' && tool !== 'select' && tool !== 'cable' && e.target && (e.target as any).customData) {
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
            const snappedPlacement = getWallSnapPlacement(x, y, symId);
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
          const snappedPlacement = getWallSnapPlacement(x, y, selectedSymbolIdRef.current);
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
          dots.forEach((dot) => {
            dot.set({
              left: (modifiedObj.left || 0) + 16,
              top: (modifiedObj.top || 0) - 16,
            });
          });
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
                x: modifiedObj.left || obj.x,
                y: modifiedObj.top || obj.y,
                rotation: modifiedObj.angle || obj.rotation || 0,
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

    // Zoom controls
    const handleZoomIn = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const newZoom = Math.min(canvas.getZoom() * 1.2, 5);
      canvas.setZoom(newZoom);
      setZoomLevel(newZoom);
    };

    const handleZoomOut = () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const newZoom = Math.max(canvas.getZoom() * 0.8, 0.1);
      canvas.setZoom(newZoom);
      setZoomLevel(newZoom);
    };

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
      canvas.renderAll();
    };

    // Calculate scale bar width based on zoom
    const scaleBarWidth = Math.round(SCALE * zoomLevel);

    return (
      <div className="w-full h-full overflow-hidden relative">
        <canvas ref={canvasRef} />

        {/* Scale Bar Overlay — bottom-left */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-[10px]">
          <div className="h-3 border-l border-white/80" />
          <div style={{ width: `${scaleBarWidth}px` }} className="border-t border-white/80" />
          <div className="h-3 border-l border-white/80" />
          <span className="ml-1">1m</span>
        </div>

        {/* Zoom Controls - Floating top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomIn}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleZoomOut}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleResetView}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Reset View"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleRotate}
            className="h-9 w-9 bg-black/60 backdrop-blur border-white/10 text-white hover:bg-black/80 touch-manipulation"
            title="Rotate 90°"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Minimap — bottom-right overview */}
        {showMinimap && <MinimapOverlay fabricCanvas={fabricCanvasRef.current} />}
      </div>
    );
  }
);

DiagramCanvas.displayName = 'DiagramCanvas';
