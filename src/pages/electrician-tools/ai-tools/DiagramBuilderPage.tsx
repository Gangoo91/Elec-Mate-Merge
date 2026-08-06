import { useState, useRef, useEffect, useMemo, Fragment, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  MousePointer2,
  Minus,
  Square,
  Type,
  Plus,
  Sparkles,
  Undo2,
  Redo2,
  MoreVertical,
  Grid3x3,
  Magnet,
  Save,
  FolderOpen,
  Ruler,
  PenTool,
  Check,
  LayoutGrid,
  Eraser,
  RotateCw,
  FileText,
  Trash2,
  Spline,
  Download,
  Copy,
  Crosshair,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DiagramCanvas } from '@/components/electrician-tools/diagram-builder/DiagramCanvas';
import { SymbolLibrary } from '@/components/electrician-tools/diagram-builder/SymbolLibrary';
// Old jsPDF export removed — using PDFMonkey via ExportReviewSheet
import { PropertiesPanel } from '@/components/electrician-tools/diagram-builder/PropertiesPanel';
import { AIRoomBuilderDialog } from '@/components/electrician-tools/diagram-builder/AIRoomBuilderDialog';
import { RoomShapePicker } from '@/components/electrician-tools/diagram-builder/RoomShapePicker';
import { SaveRoomSheet } from '@/components/electrician-tools/diagram-builder/SaveRoomSheet';
import { SavedRoomsStrip } from '@/components/electrician-tools/diagram-builder/SavedRoomsStrip';
import { SymbolCountPanel } from '@/components/electrician-tools/diagram-builder/SymbolCountPanel';
import { ExportReviewSheet } from '@/components/electrician-tools/diagram-builder/ExportReviewSheet';
import { MyPlansSheet } from '@/components/electrician-tools/diagram-builder/MyPlansSheet';
import { symbolRegistry } from '@/components/electrician-tools/diagram-builder/symbols/symbolRegistry';
import { STANDARD_NOTES } from '@/utils/standard-electrical-notes';
import { buildConsumerUnitSchedule } from '@/utils/circuit-assignment';
import { useFloorPlanRooms, FLOOR_PLAN_ROOMS_KEY, type SavedRoom } from '@/hooks/useFloorPlanRooms';
import { resnapWallSymbols } from '@/components/electrician-tools/diagram-builder/wallSnap';
import { useFloorPlanCloud } from '@/hooks/useFloorPlanCloud';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { storageSetJSONSync, storageGetJSONSync } from '@/utils/storage';
import { isTypingContext, isInOverlay } from '@/utils/keyboardGuards';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { preloadAllSymbols } from '@/components/electrician-tools/diagram-builder/symbols/svgLoader';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export type DrawingTool = 'select' | 'line' | 'rectangle' | 'wall' | 'text' | 'symbol' | 'dimension' | 'eraser' | 'cable';

export interface CanvasObject {
  id: string;
  type: 'symbol' | 'line' | 'rectangle' | 'text' | 'wall' | 'dimension' | 'cable';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  symbolId?: string;
  text?: string;
  points?: { x: number; y: number }[];
  circuitRef?: string;
}

// Circuit colour map for visual identification
export const CIRCUIT_COLOURS: Record<string, string> = {
  L1: '#3B82F6', L2: '#60A5FA', // Lighting — blue
  S1: '#EF4444', S2: '#F87171', // Ring finals — red
  C1: '#F59E0B', // Cooker — amber
  EV1: '#10B981', // EV — green
  FA1: '#EC4899', // Fire alarm — pink
  IH1: '#8B5CF6', // Immersion — purple
  AC1: '#06B6D4', // AC — cyan
};

/** Quick circuit ref lookup for a single symbol */
function getCircuitRefForSymbol(symbolId: string): string | undefined {
  const LIGHTING = ['light-ceiling','light-wall','light-downlight','light-emergency','light-fluorescent','light-pendant','light-bulkhead','light-pir','light-outside','light-led-strip','light-exit-sign','light-twin-emergency','light-high-bay'];
  const SOCKETS = ['socket-single-13a','socket-double-13a','socket-usb','socket-data','socket-telephone','socket-tv-aerial','socket-floor','socket-outdoor','socket-shaver','socket-fused-spur','socket-switched-fused-spur','socket-unswitched-spur'];
  const FIRE = ['smoke-detector','co-detector','heat-detector'];

  if (LIGHTING.includes(symbolId)) return 'L1';
  if (SOCKETS.includes(symbolId)) return 'S1';
  if (symbolId === 'socket-cooker-45a') return 'C1';
  if (symbolId === 'socket-ev-charger') return 'EV1';
  if (symbolId === 'extractor-fan') return 'L1';
  if (FIRE.includes(symbolId)) return 'FA1';
  if (symbolId === 'water-heater') return 'IH1';
  if (symbolId === 'air-conditioning' || symbolId === 'fan-coil-unit') return 'AC1';
  return undefined;
}

const HEADER_HEIGHT = 48;
const TOOLBAR_HEIGHT = 56;
const ROOM_IMAGE_PADDING = 64;
const ROOM_THUMBNAIL_SIZE = { width: 120, height: 90 };
const ROOM_EXPORT_SIZE = { width: 1800, height: 1350 };

const getObjectBounds = (items: CanvasObject[]) => {
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
      continue;
    }

    const width = obj.width || 40;
    const height = obj.height || 40;
    minX = Math.min(minX, obj.x);
    minY = Math.min(minY, obj.y);
    maxX = Math.max(maxX, obj.x + width);
    maxY = Math.max(maxY, obj.y + height);
  }

  if (!isFinite(minX)) return null;
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    centreX: (minX + maxX) / 2,
    centreY: (minY + maxY) / 2,
  };
};

const applyCanvasObjectUpdates = (obj: CanvasObject, updates: Partial<CanvasObject>): CanvasObject => {
  if (!obj.points || obj.points.length === 0) {
    return { ...obj, ...updates };
  }

  const nextX = updates.x ?? obj.x;
  const nextY = updates.y ?? obj.y;
  const deltaX = nextX - obj.x;
  const deltaY = nextY - obj.y;

  return {
    ...obj,
    ...updates,
    x: nextX,
    y: nextY,
    points: obj.points.map((point) => ({
      x: point.x + deltaX,
      y: point.y + deltaY,
    })),
  };
};

const duplicateCanvasObject = (obj: CanvasObject, offset = 24): CanvasObject => ({
  ...obj,
  id: `obj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  x: obj.x + offset,
  y: obj.y + offset,
  points: obj.points?.map((point) => ({
    x: point.x + offset,
    y: point.y + offset,
  })),
});

/**
 * Render the room to a centred image at `targetSize` with `padding` margin.
 *
 * Uses Fabric's `toCanvasElement(multiplier, { left, top, width, height })`
 * which renders objects at their NATIVE coordinates regardless of the current
 * viewport pan/zoom. The previous implementation cropped pixels off the
 * displayed HTML canvas, which produced blank images whenever the user had
 * panned/zoomed so the room sat outside the visible canvas pixel bounds.
 */
type ExportableCanvas = {
  toCanvasElement: (
    multiplier: number,
    options?: { left: number; top: number; width: number; height: number }
  ) => HTMLCanvasElement;
  getObjects?: () => { visible?: boolean; isGridLine?: boolean }[];
  renderAll?: () => unknown;
  getZoom?: () => number;
  viewportTransform?: number[];
  setViewportTransform?: (vpt: number[]) => unknown;
};

const renderCenteredRoomImage = (
  fabricCanvas: ExportableCanvas | null | undefined,
  bounds: ReturnType<typeof getObjectBounds>,
  targetSize: { width: number; height: number },
  padding: number,
  quality = 1
) => {
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = targetSize.width;
  outputCanvas.height = targetSize.height;
  const ctx = outputCanvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

  if (!fabricCanvas || !bounds || bounds.width <= 0 || bounds.height <= 0) {
    return outputCanvas.toDataURL('image/png', quality);
  }

  const cropPad = 24;
  const cropL = bounds.minX - cropPad;
  const cropT = bounds.minY - cropPad;
  const cropW = bounds.width + cropPad * 2;
  const cropH = bounds.height + cropPad * 2;
  const multiplier = 2;

  // The on-screen grid is a drawing aid, not drawing content — it has no place
  // on a document handed to a client. Hide the grid lines for the capture and
  // put them straight back, so the export is the drawing alone.
  const gridLines = (fabricCanvas.getObjects?.() ?? []).filter((o) => o.isGridLine);
  const gridWasVisible = gridLines.map((o) => o.visible !== false);
  gridLines.forEach((o) => { o.visible = false; });

  // Capture at identity viewport.
  //
  // Fabric v6's toCanvasElement does NOT ignore the viewport — it computes
  // newZoom = zoom * multiplier and offsets the crop by the current pan. The
  // crop rect here is in world coordinates, so any zoom other than 1 aimed it
  // somewhere other than the drawing and produced a blank white sheet. This
  // silently worked only because the canvas happened to sit at zoom 1 until
  // fit-to-view started setting it. Neutralise the viewport for the capture
  // and restore it after, so the image is correct at any zoom or pan.
  const savedVpt = fabricCanvas.viewportTransform ? [...fabricCanvas.viewportTransform] : null;
  const canResetViewport = typeof fabricCanvas.setViewportTransform === 'function';

  let tightCanvas: HTMLCanvasElement;
  try {
    if (canResetViewport) fabricCanvas.setViewportTransform!([1, 0, 0, 1, 0, 0]);
    tightCanvas = fabricCanvas.toCanvasElement(multiplier, {
      left: cropL,
      top: cropT,
      width: cropW,
      height: cropH,
    });
  } catch {
    return outputCanvas.toDataURL('image/png', quality);
  } finally {
    if (savedVpt && canResetViewport) fabricCanvas.setViewportTransform!(savedVpt);
    gridLines.forEach((o, i) => { o.visible = gridWasVisible[i]; });
    fabricCanvas.renderAll?.();
  }

  const scale = Math.min(
    (outputCanvas.width - padding * 2) / tightCanvas.width,
    (outputCanvas.height - padding * 2) / tightCanvas.height
  );
  const drawWidth = tightCanvas.width * scale;
  const drawHeight = tightCanvas.height * scale;
  const drawX = (outputCanvas.width - drawWidth) / 2;
  const drawY = (outputCanvas.height - drawHeight) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(tightCanvas, drawX, drawY, drawWidth, drawHeight);

  return outputCanvas.toDataURL('image/png', quality);
};

const DiagramBuilderPage = () => {
  const navigate = useNavigate();

  const [activeTool, setActiveTool] = useState<DrawingTool>('select');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string | null>(null);
  // Hydrate from autosave on first mount so users never lose unsaved progress.
  const restoredProject = useRef(
    storageGetJSONSync<{
      objects?: CanvasObject[];
      settings?: { gridEnabled?: boolean; snapEnabled?: boolean };
      activeRoomId?: string | null;
    } | null>('diagram-builder-project', null)
  ).current;
  /**
   * The saved room the restored canvas belongs to, or null.
   *
   * `activeRoomId` used to live only in React state, so any reload — or the OS
   * evicting a backgrounded tab — brought the drawing back but forgot which
   * saved room it was. Export then refused with "Save this room first" for a
   * room that WAS saved, and obeying that toast appended a duplicate room
   * instead of updating the original.
   *
   * Resolved against storage rather than trusted blindly: a stale id (room
   * deleted in another tab) would reopen the same hole, and `updateRoom` on a
   * missing id no-ops silently, losing the save.
   */
  const restoredRoom = useRef<SavedRoom | null>(
    (() => {
      const id = restoredProject?.activeRoomId;
      if (!id) return null;
      return (
        storageGetJSONSync<SavedRoom[]>(FLOOR_PLAN_ROOMS_KEY, []).find((r) => r.id === id) ?? null
      );
    })()
  ).current;
  // Drawings saved before the wall-snap rotation fix carry symbols that are
  // 90° out and standing off the wall, so every existing plan would have gone
  // on looking wrong. Re-seating on load fixes them wherever the user goes.
  const restoredResnap = useRef(
    resnapWallSymbols(restoredProject?.objects ?? [])
  ).current;
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>(
    () => restoredResnap.objects
  );
  const [gridEnabled, setGridEnabled] = useState<boolean>(
    () => restoredProject?.settings?.gridEnabled ?? true
  );
  const [snapEnabled, setSnapEnabled] = useState<boolean>(
    () => restoredProject?.settings?.snapEnabled ?? true
  );
  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null);
  // Phase 2: PropertiesPanel only opens on an explicit gesture (long-press or
  // double-tap), not on every single-tap selection. `selectedObject` still
  // tracks the internally-selected object for other flows (rotate-all, delete),
  // but `propertiesTarget` is the state that controls the panel sheet.
  const [propertiesTarget, setPropertiesTarget] = useState<CanvasObject | null>(null);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [symbolSheetOpen, setSymbolSheetOpen] = useState(false);
  const [shapesSheetOpen, setShapesSheetOpen] = useState(false);
  const [wallEditState, setWallEditState] = useState<{
    wallId: string;
    currentLength: number;
    position: { x: number; y: number };
  } | null>(null);
  const [wallEditLength, setWallEditLength] = useState<string>('0');
  // exportDialogOpen removed — using ExportReviewSheet only
  const [placingSymbolName, setPlacingSymbolName] = useState<string | null>(null);
  const [saveSheetOpen, setSaveSheetOpen] = useState(false);
  // Captured at the moment the user taps "Save Room" — before the sheet
  // covers the canvas — so the thumbnail is always generated from a clean,
  // fully-rendered fabric canvas.
  const [pendingSave, setPendingSave] = useState<{ thumbnail: string; fullImage: string } | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(restoredRoom?.id ?? null);
  const [exportReviewOpen, setExportReviewOpen] = useState(false);
  const [myPlansOpen, setMyPlansOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [mobileUiOffset, setMobileUiOffset] = useState(0);
  const { rooms, saveRoom, deleteRoom, updateRoom, clearAllRooms, persistFailed, didLastWriteFail } =
    useFloorPlanRooms();
  const { saveToCloud, loadFromCloud } = useFloorPlanCloud();
  const canvasRef = useRef<any>(null);
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId') || null;
  // When opened from a certificate/report (?reportId=…) the plan is attached to
  // that report via floor_plans.report_id, mirroring the project link. Both can
  // be present (a report that belongs to a project).
  const reportId = searchParams.get('reportId') || null;
  const initialFloorPlanId = searchParams.get('floorPlanId') || null;
  const [linkedFloorPlanId, setLinkedFloorPlanId] = useState<string | null>(initialFloorPlanId);
  const [projectName, setProjectName] = useState<string | null>(null);
  // When a deep-linked plan would clobber unsaved local rooms, the cloud
  // payload is parked here and an AlertDialog asks the user to confirm
  // the replace. Without this, the load would silently destroy local work.
  const [pendingCloudPlan, setPendingCloudPlan] = useState<
    { id: string; name: string; rooms: SavedRoom[]; localRoomCount: number } | null
  >(null);
  const [projectLocation, setProjectLocation] = useState<string | null>(null);
  const [projectClientName, setProjectClientName] = useState<string | null>(null);
  const [electricianName, setElectricianName] = useState<string | null>(null);
  // Company branding for the PDF. Every certificate template carries the
  // installer's logo and accent colour; the floor plan was the only client-
  // facing document going out unbranded.
  const [companyBrand, setCompanyBrand] = useState<{
    name: string; logo: string; accent: string; phone: string; email: string;
  } | null>(null);
  // Short label for the "Linked to report" pill + cloud plan name (e.g. the
  // installation address or certificate number of the attached report).
  const [reportLabel, setReportLabel] = useState<string | null>(null);
  // Refs that mirror the latest committed state for use inside async chains
  // where capturing React state via closure would be stale. Critical for the
  // cloud-save chain below: the second Save Room tap must see the first
  // save's resulting row id, even before React has re-rendered.
  const linkedFloorPlanIdRef = useRef<string | null>(initialFloorPlanId);
  const projectNameRef = useRef<string | null>(null);
  const reportNameRef = useRef<string | null>(null);
  const cloudPlanNameSetRef = useRef<boolean>(false);
  // Serialises every cloud upsert/delete so rapid taps can't race into
  // duplicate `floor_plans` rows. Each handler appends to the chain rather
  // than firing in parallel.
  const cloudSaveChainRef = useRef<Promise<unknown>>(Promise.resolve());
  const haptic = useHaptic();
  // useHaptic() returns a NEW object literal each render (its methods are
  // memoised, the container isn't). Effects that need it must read it through
  // this ref — depending on `haptic` directly would re-run them every render.
  const hapticRef = useRef(haptic);
  hapticRef.current = haptic;
  // Latest-handler mirror for the window keydown effect — see the shortcuts
  // effect below for why this can't be a plain closure capture.
  const shortcutsRef = useRef<{ save: () => void; undo: () => void; redo: () => void }>({
    save: () => {},
    undo: () => {},
    redo: () => {},
  });
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Raised immediately before a programmatic objects swap (loading a room /
  // starting a new one) so it isn't mistaken for a user edit.
  //
  // Seeded true when the restored canvas is byte-identical to the restored
  // room's saved state: the mount run of the roomDirty effect below would
  // otherwise flag a freshly-reloaded, fully-saved room as having unsaved
  // changes and block export on the second gate. When the two differ the user
  // really did edit after saving, so it stays false and dirty is set — which
  // is exactly what that gate is for.
  //
  // A re-seat on restore counts as a real change: the drawing on screen no
  // longer matches the room's stored image, and the PDF is built from that
  // image. Leaving dirty set makes the export gate ask for a re-save, which is
  // exactly what regenerates the corrected drawing.
  const suppressRoomDirtyRef = useRef(
    !!restoredRoom &&
      !restoredResnap.changed &&
      restoredRoom.canvasState === JSON.stringify(restoredProject?.objects ?? [])
  );
  const propertiesTipShown = useRef<boolean>(
    storageGetJSONSync<boolean>('floor-plan-tip-properties-shown', false)
  );
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [savedAgoTick, setSavedAgoTick] = useState(0);
  // True when the canvas has been edited since the active room was last saved.
  // The PDF is built from each room's stored image, so exporting while this is
  // set would silently ship the previous drawing — the edits on screen would
  // simply be missing from the document.
  const [roomDirty, setRoomDirty] = useState(false);
  // Set when a write to device storage is rejected (quota). Drives the header
  // badge so the failure is visible for as long as it lasts, not just in the
  // toast the user may have missed.
  const [autosaveFailed, setAutosaveFailed] = useState(false);
  const autosaveWarnedRef = useRef(false);
  // Parked destructive My Plans action awaiting confirmation.
  const [pendingPlanAction, setPendingPlanAction] = useState<
    { kind: 'load'; plan: { name: string; rooms: SavedRoom[] } } | { kind: 'new' } | null
  >(null);

  // Auto-assign circuitRef to symbols that don't have one
  useEffect(() => {
    let needsUpdate = false;
    const updated = canvasObjects.map((obj) => {
      if (obj.type === 'symbol' && obj.symbolId && !obj.circuitRef) {
        const ref = getCircuitRefForSymbol(obj.symbolId);
        if (ref) { needsUpdate = true; return { ...obj, circuitRef: ref }; }
      }
      return obj;
    });
    if (needsUpdate) setCanvasObjects(updated);
  }, [canvasObjects]);

  // Circuit summary for the circuit panel
  const circuitSummary = useMemo(() => {
    const circuits = new Map<string, { ref: string; name: string; count: number; colour: string }>();
    for (const obj of canvasObjects) {
      if (obj.circuitRef) {
        const existing = circuits.get(obj.circuitRef);
        if (existing) {
          existing.count++;
        } else {
          const names: Record<string, string> = {
            L1: 'Lighting 1', L2: 'Lighting 2', S1: 'Ring Final 1', S2: 'Ring Final 2',
            C1: 'Cooker', EV1: 'EV Charger', FA1: 'Fire Alarm', IH1: 'Immersion', AC1: 'A/C',
          };
          circuits.set(obj.circuitRef, {
            ref: obj.circuitRef,
            name: names[obj.circuitRef] || obj.circuitRef,
            count: 1,
            colour: CIRCUIT_COLOURS[obj.circuitRef] || '#6B7280',
          });
        }
      }
    }
    return Array.from(circuits.values()).sort((a, b) => a.ref.localeCompare(b.ref));
  }, [canvasObjects]);

  // Live symbol counts for the floating panel
  const symbolCounts = useMemo(() => {
    const counts = new Map<string, number>();
    canvasObjects.filter((o) => o.type === 'symbol' && o.symbolId).forEach((o) => {
      counts.set(o.symbolId!, (counts.get(o.symbolId!) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([id, count]) => {
      const sym = symbolRegistry.find((s) => s.id === id);
      return { id, name: sym?.name || id, category: sym?.category || 'other', count };
    });
  }, [canvasObjects]);

  const activeRoom = useMemo(
    () => rooms.find((room) => room.id === activeRoomId) || null,
    [activeRoomId, rooms]
  );
  // Either the debounced project autosave or a room write was rejected. Both
  // mean the same thing to the user: this device can't store any more.
  const storageBlocked = autosaveFailed || persistFailed;
  const isMobileViewport = viewportWidth < 768;
  const floatingUiBottom = 72 + mobileUiOffset;
  const overlayBottom = mobileUiOffset;

  // Auto-open AI Room Builder dialog when ?ai=true is in the URL
  useEffect(() => {
    if (searchParams.get('ai') === 'true') {
      setAiDialogOpen(true);
    }
  }, [searchParams]);

  // Preload symbol SVGs on mount
  useEffect(() => {
    preloadAllSymbols();
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateViewportOffset = () => {
      const keyboardOverlap = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      setMobileUiOffset(keyboardOverlap > 80 ? keyboardOverlap + 12 : 0);
    };

    updateViewportOffset();
    viewport.addEventListener('resize', updateViewportOffset);
    viewport.addEventListener('scroll', updateViewportOffset);

    return () => {
      viewport.removeEventListener('resize', updateViewportOffset);
      viewport.removeEventListener('scroll', updateViewportOffset);
    };
  }, []);

  // Debounced autosave on every change so progress is never lost.
  // 300ms means at most a third of a second of work can disappear if the
  // page is killed mid-edit; in practice almost nothing.
  // Track edits to the ACTIVE ROOM separately from the autosave dirty flag,
  // keyed on objects alone so toggling grid/snap doesn't count as an edit.
  // Loading a room is not an edit, so those paths raise `suppressRoomDirtyRef`
  // first — the flag is set before the state update, so this effect (which
  // always runs after) is guaranteed to see it.
  useEffect(() => {
    if (suppressRoomDirtyRef.current) {
      suppressRoomDirtyRef.current = false;
      return;
    }
    setRoomDirty(true);
  }, [canvasObjects]);

  useEffect(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    setIsDirty(true);
    autoSaveTimerRef.current = setTimeout(() => {
      // Autosave is the primary safety net, so it must never claim to have
      // written when it hasn't. A full quota used to be swallowed here while
      // the header carried on showing a green "Saved" — the single most
      // misleading state the planner could be in.
      const ok = storageSetJSONSync('diagram-builder-project', {
        objects: canvasObjects,
        settings: { gridEnabled, snapEnabled },
        activeRoomId,
        timestamp: new Date().toISOString(),
      });
      setAutosaveFailed(!ok);
      if (!ok) {
        // Warn once per outage, not every 300ms.
        if (!autosaveWarnedRef.current) {
          autosaveWarnedRef.current = true;
          hapticRef.current.error();
          toast({
            title: 'Autosave stopped — device storage is full',
            description: 'Export this plan or delete a saved one. Changes are only in memory until then.',
            variant: 'destructive',
          });
        }
        return; // leave `isDirty` set — nothing was written
      }
      autosaveWarnedRef.current = false;
      setLastSavedAt(new Date());
      setIsDirty(false);
    }, 300);
    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
    // Haptics are read through `hapticRef`, not listed as a dependency:
    // useHaptic() returns a fresh object literal on every render, so depending
    // on it would re-run this effect constantly, clearing and restarting the
    // 300ms debounce each time and starving the autosave completely.
    //
    // `activeRoomId` IS a dependency: it's part of the persisted record, and
    // the very first save of a room changes it without touching the objects.
  }, [canvasObjects, gridEnabled, snapEnabled, activeRoomId]);

  // Tick "Saved Xs ago" label once a minute so it stays accurate without
  // re-rendering on every frame.
  useEffect(() => {
    const t = setInterval(() => setSavedAgoTick((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  // Prefetch the current user's name so we can prefill "Drawn by" in the
  // export sheet — saves the electrician retyping their own name every
  // time. Runs regardless of project mode.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', authData.user.id)
        .maybeSingle();
      if (!cancelled && profile?.full_name) setElectricianName(profile.full_name);

      const { data: company } = await supabase
        .from('company_profiles')
        .select('company_name, company_phone, company_email, logo_data_url, logo_url, accent_color, primary_color')
        .eq('user_id', authData.user.id)
        .maybeSingle();
      if (!cancelled && company) {
        setCompanyBrand({
          name: company.company_name ?? '',
          // Inline data URL first — PDFMonkey can't reach a signed storage URL.
          logo: company.logo_data_url ?? company.logo_url ?? '',
          // primary_color wins over accent_color, per the house branding rule.
          accent: company.primary_color ?? company.accent_color ?? '',
          phone: company.company_phone ?? '',
          email: company.company_email ?? '',
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // When the planner is opened from a project, fetch the project name +
  // address + customer so we can: (a) show a "Linked to [project]" pill,
  // (b) name the cloud plan, (c) prefill the export sheet so the user
  // doesn't retype info that's already on the project record.
  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    (async () => {
      // spark_projects stores the project name in `title` (not `name`). Selecting
      // a non-existent column made PostgREST throw, the rejection was unhandled,
      // and the planner rendered a black screen — but only when opened from a
      // project (?projectId=…). Guard the whole fetch so a query error can never
      // blank the page again. (ELE-1005)
      try {
        const { data: proj, error } = await supabase
          .from('spark_projects')
          .select('title, location, customers(name)')
          .eq('id', projectId)
          .maybeSingle();
        if (cancelled || error || !proj) return;
        if (proj.title) setProjectName(proj.title);
        if (proj.location) setProjectLocation(proj.location);
        const customer = (proj as { customers?: { name?: string } | null } | null)?.customers;
        if (customer?.name) setProjectClientName(customer.name);
      } catch {
        // Non-fatal — the planner still works without the linked-project pill.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // When opened from a certificate/report (?reportId=…), fetch its address +
  // client + inspector so we can show a "Linked to report" pill, name the cloud
  // plan after it, and prefill the export sheet. Mirrors the project fetch and
  // is fully guarded so a query error can never blank the page.
  useEffect(() => {
    if (!reportId) return;
    let cancelled = false;
    (async () => {
      try {
        const { data: report, error } = await supabase
          .from('reports')
          .select('installation_address, client_name, inspector_name, certificate_number')
          .eq('id', reportId)
          .maybeSingle();
        if (cancelled || error || !report) return;
        const label = report.installation_address || report.certificate_number || 'Report';
        setReportLabel(label);
        reportNameRef.current = label;
        // Prefill export fields only if a project hasn't already supplied them.
        if (report.installation_address) setProjectLocation((prev) => prev ?? report.installation_address);
        if (report.client_name) setProjectClientName((prev) => prev ?? report.client_name);
        if (report.inspector_name) setElectricianName((prev) => prev ?? report.inspector_name);
      } catch {
        // Non-fatal — the planner still works without the linked-report pill.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reportId]);

  // Apply a cloud plan locally — clears existing rooms and hydrates the
  // strip from the cloud payload. Pulled out of the deep-link effect so
  // the AlertDialog confirm can also call it after the user okays a
  // replace.
  const applyCloudPlan = (plan: { name: string; rooms: SavedRoom[] }) => {
    clearAllRooms();
    plan.rooms.forEach((r) =>
      saveRoom({
        name: r.name,
        thumbnail: r.thumbnail,
        fullImage: r.fullImage,
        canvasState: r.canvasState,
        symbolIds: r.symbolIds,
        photoBase64: r.photoBase64,
      })
    );
    toast({
      title: 'Plan loaded',
      description: `${plan.rooms.length} room${plan.rooms.length !== 1 ? 's' : ''} from "${plan.name}"`,
    });
  };

  // When a specific floor plan is deep-linked from a project, load its
  // rooms from the cloud once on mount. If the user already has local
  // rooms in this session, park the cloud payload and ask before
  // replacing — silent destruction of unsaved work is a non-negotiable.
  useEffect(() => {
    if (!initialFloorPlanId) return;
    let cancelled = false;
    (async () => {
      const plans = await loadFromCloud();
      if (cancelled) return;
      const match = plans.find((p) => p.id === initialFloorPlanId);
      if (!match || !Array.isArray(match.rooms) || match.rooms.length === 0) return;
      const cloudRooms = match.rooms as SavedRoom[];
      if (rooms.length > 0) {
        setPendingCloudPlan({
          id: match.id,
          name: match.name,
          rooms: cloudRooms,
          localRoomCount: rooms.length,
        });
        return;
      }
      applyCloudPlan({ name: match.name, rooms: cloudRooms });
    })();
    return () => {
      cancelled = true;
    };
    // Intentionally one-shot — initialFloorPlanId is read once from the URL
    // on mount; re-running on every dep change would clobber the user's
    // in-progress edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFloorPlanId]);

  // Keep the cloud-save refs in lock-step with their state mirrors. The
  // refs are read inside the serial save chain (closures there can't see
  // post-commit React state, which is how the race that creates duplicate
  // rows happens in the first place).
  useEffect(() => {
    linkedFloorPlanIdRef.current = linkedFloorPlanId;
  }, [linkedFloorPlanId]);
  useEffect(() => {
    projectNameRef.current = projectName;
  }, [projectName]);

  // Late-name fix: if the user did a Save Room BEFORE projectName had
  // resolved, the cloud row landed with a generic "Floor Plan" name. When
  // projectName finally arrives, fire a one-shot rename through the save
  // chain so the user finds it sensibly named in their plan list rather
  // than as a generic "Floor Plan".
  useEffect(() => {
    if (!projectId) return;
    if (!projectName) return;
    if (!linkedFloorPlanIdRef.current) return;
    if (cloudPlanNameSetRef.current) return;
    cloudPlanNameSetRef.current = true;
    cloudSaveChainRef.current = cloudSaveChainRef.current
      .then(() =>
        saveToCloud({
          id: linkedFloorPlanIdRef.current!,
          name: `${projectName} — Floor Plan`,
          rooms,
          projectId,
          reportId: reportId ?? undefined,
        })
      )
      .catch(() => {
        // Non-fatal — name update is cosmetic, retry on next save.
        cloudPlanNameSetRef.current = false;
      });
    // `rooms` intentionally excluded: this should fire exactly once when
    // projectName resolves, capturing the rooms at that moment. Re-firing
    // on every room change would defeat the purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName, projectId]);

  // One-shot discoverability hint: the first time a user has at least one
  // symbol placed, tell them they can long-press it to open Properties.
  // Without this, the Properties panel is effectively invisible — there's
  // no visible trigger anywhere.
  useEffect(() => {
    if (propertiesTipShown.current) return;
    if (!canvasObjects.some((o) => o.type === 'symbol')) return;
    toast({
      title: 'Tip: Long-press any item',
      description: 'Opens Properties to rotate, nudge, or delete it.',
    });
    propertiesTipShown.current = true;
    storageSetJSONSync('floor-plan-tip-properties-shown', true);
  }, [canvasObjects]);

  // Desktop keyboard shortcuts — Figma-style. Skipped on mobile (no keyboard).
  //
  // The handlers are read through `shortcutsRef` rather than captured in the
  // effect closure. This effect registers once ([] deps), so closing over
  // `handleSave` directly captured the FIRST render's copy — and with it the
  // first render's `canvasObjects`. Cmd+S after an hour of drawing then wrote
  // the original (usually empty) objects back over the autosave and toasted
  // "Saved". Reading from a ref means the shortcut always runs current state.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingContext(e.target)) return;
      // A sheet or dialog on top owns the keyboard. Without this, pressing a
      // tool letter while the symbol picker was open switched the tool on the
      // canvas hidden behind it.
      if (isInOverlay(e.target)) return;
      const meta = e.ctrlKey || e.metaKey;
      const k = e.key.toLowerCase();

      if (meta && k === 's') { e.preventDefault(); shortcutsRef.current.save(); return; }
      if (meta && k === 'z') {
        e.preventDefault();
        if (e.shiftKey) shortcutsRef.current.redo(); else shortcutsRef.current.undo();
        return;
      }
      if (meta && k === 'y') { e.preventDefault(); shortcutsRef.current.redo(); return; }

      if (e.shiftKey || e.altKey || meta) return;
      switch (k) {
        case 'v': setActiveTool('select'); setSelectedSymbolId(null); setPlacingSymbolName(null); break;
        case 'w': setActiveTool('wall'); break;
        case 'r': setShapesSheetOpen(true); break;
        case 'a': setSymbolSheetOpen(true); break;
        case 'c': setActiveTool('cable'); break;
        case 'e': setActiveTool('eraser'); break;
        case 'd': setActiveTool('dimension'); break;
        case 'escape':
          setSelectedObject(null);
          setActiveTool('select');
          setSelectedSymbolId(null);
          setPlacingSymbolName(null);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /**
   * Apply a page-originated mutation to the canvas objects, recording an undo
   * snapshot first.
   *
   * Every mutation that starts in this page — room shapes, multi-place,
   * properties edits, duplicate, rotate-all, wall length, AI auto-place — must
   * go through here. Previously they called `setCanvasObjects` directly, which
   * bypassed the undo stack entirely: undo skipped straight past them and
   * Rotate All could not be reversed at all.
   *
   * Do NOT use this inside `onObjectsChange` — edits that originate on the
   * canvas already push their own snapshot and would double up.
   */
  const commitObjects = (next: SetStateAction<CanvasObject[]>) => {
    canvasRef.current?.saveState?.();
    setCanvasObjects(next);
  };

  const handleSave = () => {
    haptic.success();
    const projectData = {
      objects: canvasObjects,
      settings: { gridEnabled, snapEnabled },
      activeRoomId,
      timestamp: new Date().toISOString(),
    };
    const ok = storageSetJSONSync('diagram-builder-project', projectData);
    if (!ok) {
      haptic.error();
      toast({
        title: 'Could not save',
        description: 'This device is out of storage. Export or delete a saved plan to free space.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Saved',
      variant: 'success',
    });
  };

  /**
   * "Open Draft" — restores the autosaved project.
   *
   * Note this reads the SAME key the 300ms autosave writes to, so in practice
   * it reloads what is already on screen; it only differs after an edit that
   * has not yet been autosaved. Left in place, but routed through
   * `commitObjects` so replacing the canvas is at least undoable — it used to
   * overwrite everything with no confirmation and no way back.
   */
  const handleLoad = () => {
    const data = storageGetJSONSync<any>('diagram-builder-project', null);
    if (data) {
      commitObjects(data.objects || []);
      setGridEnabled(data.settings?.gridEnabled ?? true);
      setSnapEnabled(data.settings?.snapEnabled ?? true);
      setSelectedObject(null);
      setTimeout(() => canvasRef.current?.zoomToFit?.(), 120);
      toast({
        title: 'Project loaded',
        description: 'Your saved diagram has been restored',
        variant: 'success',
      });
    } else {
      toast({
        title: 'No saved project',
        description: 'No saved diagram found',
        variant: 'default',
      });
    }
  };

  // Save the current room as a high-res PNG. Renders the live canvas when
  // there's work on it, otherwise falls back to the active/first saved room's
  // pre-rendered image. PDF (via ExportReviewSheet) is the full multi-room
  // document; this is the quick "give me an image of this room" path.
  const handleSaveImage = async () => {
    const fabricCanvas = canvasRef.current?.getFabricCanvas?.();
    let dataUrl = '';
    if (canvasObjects.length > 0 && fabricCanvas) {
      fabricCanvas.renderAll?.();
      const bounds = getObjectBounds(canvasObjects);
      dataUrl = renderCenteredRoomImage(fabricCanvas, bounds, ROOM_EXPORT_SIZE, ROOM_IMAGE_PADDING, 1);
    } else {
      const room = rooms.find((r) => r.id === activeRoomId) ?? rooms[0];
      dataUrl = room?.fullImage || room?.thumbnail || '';
    }
    if (!dataUrl) {
      toast({ title: 'Nothing to export', description: 'Draw a room or place symbols first' });
      return;
    }
    haptic.light();
    try {
      const { saveOrShareImage } = await import('@/utils/image-export');
      const base = (projectName || activeRoom?.name || 'room-plan')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase() || 'room-plan';
      await saveOrShareImage(dataUrl, `${base}-${Date.now()}.png`);
      haptic.success();
      toast({ title: 'Image saved', variant: 'success' });
    } catch (err) {
      haptic.error();
      toast({
        title: 'Image export failed',
        description: err instanceof Error ? err.message : 'Could not save image',
        variant: 'destructive',
      });
    }
  };

  const handleUndo = () => {
    canvasRef.current?.undo?.();
  };

  const handleRedo = () => {
    canvasRef.current?.redo?.();
  };

  // Mirror the latest handlers so the keyboard effect (registered once) always
  // calls the current closures rather than the first render's. Assigned during
  // render, which is synchronous and always ahead of the effect firing.
  shortcutsRef.current = { save: handleSave, undo: handleUndo, redo: handleRedo };

  // Clear placement indicator when objects change (symbol was placed)
  useEffect(() => {
    if (placingSymbolName && activeTool !== 'symbol') {
      setPlacingSymbolName(null);
    }
  }, [activeTool, placingSymbolName]);

  useEffect(() => {
    if (!selectedObject) return;
    const updatedSelection = canvasObjects.find((obj) => obj.id === selectedObject.id) || null;
    if (!updatedSelection) {
      setSelectedObject(null);
      return;
    }
    if (updatedSelection !== selectedObject) {
      setSelectedObject(updatedSelection);
    }
  }, [canvasObjects, selectedObject]);

  const handleRotateAll = () => {
    haptic.medium();
    const bounds = getObjectBounds(canvasObjects);
    const placementCentre = canvasRef.current?.getPlacementCenter?.();
    const centreX = bounds?.centreX ?? placementCentre?.x ?? window.innerWidth / 2;
    const centreY = bounds?.centreY ?? placementCentre?.y ?? (window.innerHeight - HEADER_HEIGHT - TOOLBAR_HEIGHT) / 2;

    const rotated = canvasObjects.map((obj) => {
      // Rotate position around centre
      const dx = obj.x - centreX;
      const dy = obj.y - centreY;
      const newX = centreX + dy;
      const newY = centreY - dx;

      // Rotate wall endpoints
      let newPoints = obj.points;
      if (obj.points) {
        newPoints = obj.points.map((p) => {
          const pdx = p.x - centreX;
          const pdy = p.y - centreY;
          return { x: centreX + pdy, y: centreY - pdx };
        });
      }

      return {
        ...obj,
        x: newX,
        y: newY,
        rotation: ((obj.rotation || 0) + 90) % 360,
        points: newPoints,
      };
    });

    // Force full re-render with rotated positions
    canvasRef.current?.forceFullRedraw?.();
    commitObjects(rotated);
    setTimeout(() => canvasRef.current?.zoomToFit?.(), 300);
    toast({ title: 'Rotated 90°' });
  };

  const handleObjectUpdate = (updates: Partial<CanvasObject>) => {
    if (!selectedObject) return;
    const updatedObjects = canvasObjects.map((obj) =>
      obj.id === selectedObject.id ? applyCanvasObjectUpdates(obj, updates) : obj
    );
    commitObjects(updatedObjects);
    setSelectedObject(applyCanvasObjectUpdates(selectedObject, updates));
  };

  const handleObjectDelete = () => {
    if (!selectedObject) return;
    commitObjects((prev) => prev.filter((obj) => obj.id !== selectedObject.id));
    setSelectedObject(null);
    canvasRef.current?.deleteSelected?.();
  };

  const handleDuplicateSelected = () => {
    if (!selectedObject) return;
    const duplicated = duplicateCanvasObject(selectedObject);
    commitObjects((prev) => [...prev, duplicated]);
    setSelectedObject(duplicated);
    setTimeout(() => canvasRef.current?.focusOnObject?.(duplicated.id), 120);
    toast({ title: 'Item duplicated' });
  };

  const handleRoomGenerated = (roomData: any) => {
    if (canvasRef.current?.renderAIRoom) {
      canvasRef.current.renderAIRoom(roomData);
      haptic.success();
      toast({
        title: 'Room generated',
        description: `${roomData.room.name} diagram created`,
        variant: 'success',
      });
    }
  };

  // Name for the cloud `floor_plans` row — prefers the project, then the
  // attached report, then a generic fallback. Reads refs so it's correct
  // inside the async save chain even before React re-renders.
  const cloudPlanName = () =>
    projectNameRef.current
      ? `${projectNameRef.current} — Floor Plan`
      : reportNameRef.current
        ? `${reportNameRef.current} — Floor Plan`
        : 'Floor Plan';

  // True whenever the planner is linked to a project and/or a report — both
  // mirror Save Room into the cloud `floor_plans` table.
  const isCloudLinked = !!(projectId || reportId);

  const handleSaveRoom = (name: string) => {
    // Prefer the thumbnail captured when the user tapped "Save Room" (canvas
    // was clean then). Fall back to re-rendering now only if it's missing.
    let thumbnail = pendingSave?.thumbnail ?? '';
    let fullImage = pendingSave?.fullImage ?? '';
    if (!thumbnail) {
      const fabricCanvas = canvasRef.current?.getFabricCanvas?.();
      if (fabricCanvas) {
        fabricCanvas.renderAll?.();
        const bounds = getObjectBounds(canvasObjects);
        fullImage = renderCenteredRoomImage(fabricCanvas, bounds, ROOM_EXPORT_SIZE, ROOM_IMAGE_PADDING, 1);
        thumbnail = renderCenteredRoomImage(fabricCanvas, bounds, ROOM_THUMBNAIL_SIZE, 18, 0.8);
      }
    }

    const symbolIds = canvasObjects
      .filter((o) => o.type === 'symbol' && o.symbolId)
      .map((o) => o.symbolId!);

    const roomPayload = {
      name,
      thumbnail,
      fullImage,
      canvasState: JSON.stringify(canvasObjects),
      symbolIds,
    };

    let nextRooms: SavedRoom[];
    // Only update in place if that room still exists. `updateRoom` maps over
    // the list, so a stale id (room deleted in another tab, or storage cleared
    // under us) matches nothing and the save vanishes without a word — falling
    // through to a fresh save keeps the user's work.
    if (activeRoomId && rooms.some((r) => r.id === activeRoomId)) {
      updateRoom(activeRoomId, roomPayload);
      nextRooms = rooms.map((r) =>
        r.id === activeRoomId ? { ...r, ...roomPayload } : r
      );
    } else {
      const newRoom = saveRoom(roomPayload);
      setActiveRoomId(newRoom.id);
      nextRooms = [...rooms, newRoom];
    }

    setSaveSheetOpen(false);
    setPendingSave(null);
    // Room images are large; on web they can exhaust the localStorage quota.
    // `persistFailed` is set synchronously by the hook, so read the storage
    // result rather than assuming the write landed — the old code always
    // claimed success.
    if (didLastWriteFail()) {
      haptic.error();
      toast({
        title: 'Room not saved',
        description:
          'This device is out of storage. Export or delete a saved plan to free space, then try again.',
        variant: 'destructive',
      });
      return;
    }
    setRoomDirty(false);
    haptic.success();
    toast({
      title: `${name} saved`,
      description: `${symbolCounts.length > 0 ? symbolCounts.reduce((sum, s) => sum + s.count, 0) + ' items. ' : ''}Keep editing or export when ready.`,
    });

    // When the planner is bound to a project, mirror every Save Room into
    // the cloud `floor_plans` table with `project_id` baked in. Each call
    // is appended to a serial chain so that a rapid double-tap cannot fire
    // two parallel INSERTs and create duplicate rows. Refs (not React
    // state) are read inside the chain so the second link sees the first
    // save's row id, even before React has re-rendered.
    if (isCloudLinked) {
      cloudSaveChainRef.current = cloudSaveChainRef.current
        .then(() =>
          saveToCloud({
            id: linkedFloorPlanIdRef.current ?? undefined,
            name: cloudPlanName(),
            rooms: nextRooms,
            projectId: projectId ?? undefined,
            reportId: reportId ?? undefined,
          })
        )
        .then((row) => {
          if (row) {
            linkedFloorPlanIdRef.current = row.id;
            if (row.id !== linkedFloorPlanId) setLinkedFloorPlanId(row.id);
            if (projectNameRef.current) cloudPlanNameSetRef.current = true;
          }
        })
        .catch(() => {
          // Cloud failure is non-fatal — local save already succeeded.
          // The next user save will retry through the same chain.
        });
    }
  };

  const handleRoomSelect = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      try {
        // Same re-seat as on restore. If it corrected anything the room is
        // genuinely out of step with its stored image, so leave it dirty and
        // let the export gate ask for a re-save.
        const { objects, changed } = resnapWallSymbols(JSON.parse(room.canvasState));
        canvasRef.current?.forceFullRedraw?.();
        suppressRoomDirtyRef.current = !changed;
        setCanvasObjects(objects);
        setRoomDirty(changed);
        setActiveRoomId(roomId);
        setSelectedObject(null);
        const bounds = getObjectBounds(objects);
        if (bounds) {
          setTimeout(() => canvasRef.current?.focusOnPoint?.(bounds.centreX, bounds.centreY), 80);
          setTimeout(() => canvasRef.current?.zoomToFit?.(), 220);
        } else {
          setTimeout(() => canvasRef.current?.zoomToFit?.(), 220);
        }
      } catch { /* ignore parse errors */ }
    }
  };

  /** Replace every local room with the chosen plan's rooms. Destructive. */
  const applyPlanLoad = (plan: { name: string; rooms: SavedRoom[] }) => {
    canvasRef.current?.forceFullRedraw?.();
    clearAllRooms();
    plan.rooms.forEach((room) =>
      saveRoom({
        name: room.name,
        thumbnail: room.thumbnail,
        fullImage: room.fullImage,
        canvasState: room.canvasState,
        symbolIds: room.symbolIds,
        photoBase64: room.photoBase64,
      })
    );
    suppressRoomDirtyRef.current = true;
    setCanvasObjects([]);
    setRoomDirty(false);
    setActiveRoomId(null);
    setSelectedObject(null);
    toast({
      title: `Loaded: ${plan.name}`,
      description: `${plan.rooms.length} room${plan.rooms.length !== 1 ? 's' : ''}`,
    });
  };

  /** Clear every local room to start a fresh plan. Destructive. */
  const applyPlanReset = () => {
    canvasRef.current?.forceFullRedraw?.();
    clearAllRooms();
    suppressRoomDirtyRef.current = true;
    setCanvasObjects([]);
    setRoomDirty(false);
    setActiveRoomId(null);
    setSelectedObject(null);
  };

  const handleNewRoom = () => {
    canvasRef.current?.forceFullRedraw?.();
    suppressRoomDirtyRef.current = true;
    setCanvasObjects([]);
    setRoomDirty(false);
    setActiveRoomId(null);
    setSelectedObject(null);
  };

  // Wraps deleteRoom so that, in project mode, the deletion is mirrored
  // up to the cloud `floor_plans` row. Goes through the same serial chain
  // as Save Room so a delete can't race past an in-flight save (which
  // would otherwise write back the deleted room).
  const handleRoomDelete = (roomId: string) => {
    deleteRoom(roomId);
    if (activeRoomId === roomId) {
      setActiveRoomId(null);
      setCanvasObjects([]);
    }
    if (isCloudLinked && linkedFloorPlanIdRef.current) {
      const nextRooms = rooms.filter((r) => r.id !== roomId);
      cloudSaveChainRef.current = cloudSaveChainRef.current
        .then(() =>
          saveToCloud({
            id: linkedFloorPlanIdRef.current!,
            name: cloudPlanName(),
            rooms: nextRooms,
            projectId: projectId ?? undefined,
            reportId: reportId ?? undefined,
          })
        )
        .catch(() => {
          // Local delete already succeeded; cloud failure is non-fatal.
        });
    }
  };

  // Primary toolbar — the tools electricians need most
  const toolButtons: {
    id: DrawingTool | 'add-symbol' | 'ai-room' | 'undo' | 'redo' | 'shapes';
    icon: any;
    label: string;
    group: 'select' | 'draw' | 'place' | 'edit' | 'ai' | 'history';
    /** Shown on the desktop rail — the shortcuts existed but were invisible. */
    key?: string;
  }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select', group: 'select', key: 'V' },
    { id: 'wall', icon: PenTool, label: 'Wall', group: 'draw', key: 'W' },
    { id: 'shapes', icon: LayoutGrid, label: 'Room', group: 'draw', key: 'R' },
    { id: 'add-symbol', icon: Plus, label: 'Add Item', group: 'place', key: 'A' },
    { id: 'cable', icon: Spline, label: 'Cable', group: 'place', key: 'C' },
    { id: 'dimension', icon: Ruler, label: 'Size', group: 'edit', key: 'D' },
    { id: 'eraser', icon: Eraser, label: 'Erase', group: 'edit', key: 'E' },
    { id: 'ai-room', icon: Sparkles, label: 'AI Help', group: 'ai' },
    { id: 'undo', icon: Undo2, label: 'Undo', group: 'history', key: '⌘Z' },
    { id: 'redo', icon: Redo2, label: 'Redo', group: 'history', key: '⇧⌘Z' },
  ];

  // The mobile bar scrolls the drawing tools but pins undo/redo, so the two
  // are separated here rather than at the render site.
  const drawingTools = toolButtons.filter((t) => t.group !== 'history');
  const historyTools = toolButtons.filter((t) => t.group === 'history');

  const handleToolTap = (id: string) => {
    haptic.light();
    if (id === 'add-symbol') {
      setSymbolSheetOpen(true);
    } else if (id === 'shapes') {
      setShapesSheetOpen(true);
    } else if (id === 'ai-room') {
      setAiDialogOpen(true);
    } else if (id === 'undo') {
      handleUndo();
    } else if (id === 'redo') {
      handleRedo();
    } else {
      setActiveTool(id as DrawingTool);
      setSelectedSymbolId(null); // Clear symbol selection — select mode should only move, not place
      setPlacingSymbolName(null);
    }
  };

  const isToolActive = (id: string) => {
    if (id === 'add-symbol') return activeTool === 'symbol';
    if (id === 'ai-room' || id === 'undo' || id === 'redo' || id === 'shapes') return false;
    return activeTool === id;
  };

  const applyWallLength = () => {
    const parsedLength = parseFloat(wallEditLength);
    if (!wallEditState || isNaN(parsedLength) || parsedLength < 0.3) return;
    haptic.light();
    // One snapshot for the whole operation — the branches below each commit a
    // different object set, but to the user this is a single "set wall length".
    canvasRef.current?.saveState?.();

    const SCALE_PX = 52;
    const newLengthPx = parsedLength * SCALE_PX;

    const updatedObjects = canvasObjects.map((obj) => {
      if (obj.id !== wallEditState.wallId) return obj;
      if (!obj.points || obj.points.length < 2) return obj;

      const p1 = obj.points[0];
      const p2 = obj.points[1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const currentDist = Math.hypot(dx, dy);

      if (currentDist === 0) return obj;

      // Scale the endpoint to match new length, keeping p1 fixed
      const ratio = newLengthPx / currentDist;
      const newP2 = {
        x: p1.x + dx * ratio,
        y: p1.y + dy * ratio,
      };

      // Find connected walls (share an endpoint with p2) and adjust them
      return {
        ...obj,
        points: [p1, newP2],
      };
    });

    // Adjust connected walls: find walls that share an endpoint with the old p2 and move it to new p2
    const wall = canvasObjects.find((o) => o.id === wallEditState.wallId);
    if (wall?.points && wall.points.length >= 2) {
      const oldP2 = wall.points[1];
      const p1 = wall.points[0];
      const dx = oldP2.x - p1.x;
      const dy = oldP2.y - p1.y;
      const currentDist = Math.hypot(dx, dy);
      if (currentDist > 0) {
        const ratio = newLengthPx / currentDist;
        const newP2 = { x: p1.x + dx * ratio, y: p1.y + dy * ratio };

        const finalObjects = updatedObjects.map((obj) => {
          if (obj.id === wallEditState.wallId) return obj;
          if (!obj.points || obj.points.length < 2) return obj;

          const pts = [...obj.points];
          let changed = false;

          // If this wall's start point matches oldP2, move it to newP2
          if (Math.abs(pts[0].x - oldP2.x) < 2 && Math.abs(pts[0].y - oldP2.y) < 2) {
            pts[0] = { ...newP2 };
            changed = true;
          }
          // If this wall's end point matches oldP2, move it to newP2
          if (Math.abs(pts[1].x - oldP2.x) < 2 && Math.abs(pts[1].y - oldP2.y) < 2) {
            pts[1] = { ...newP2 };
            changed = true;
          }

          return changed ? { ...obj, points: pts } : obj;
        });

        setCanvasObjects(finalObjects);
      } else {
        setCanvasObjects(updatedObjects);
      }
    } else {
      setCanvasObjects(updatedObjects);
    }

    setWallEditState(null);
  };

  // Rendered through a portal to <body>.
  //
  // The planner is a full-screen tool, but it mounts inside the app shell's
  // route-transition wrapper — and that wrapper animates `opacity`, which
  // creates a STACKING CONTEXT. Inside one, no z-index can lift a child above
  // an element outside it, so the app header (z-[60]) painted straight over
  // the planner's header and Save Room / Export / My Plans were literally
  // unclickable on desktop. Raising the z-index only appeared to work in the
  // instants the wrapper's opacity sat at exactly 1.
  //
  // Portalling to <body> puts the planner in the root stacking context, where
  // z-[70] reliably clears the header and sidebar (both z-[60]) while staying
  // under sheets and dialogs (z-[100]) so its own pickers layer on top.
  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[70] bg-[#1a1a1a] flex flex-col',
        // Desktop docks into the content column so the sidebar and app header
        // stay usable — you can still reach the rest of Elec-Mate without
        // leaving the drawing. `--sidebar-width` and `--header-height` are
        // published live by Layout/Header, so this follows the sidebar being
        // collapsed or expanded without the planner tracking that state.
        // Phones keep the full-bleed canvas: there is no sidebar there and
        // every pixel counts.
        'lg:top-[var(--header-height,56px)] lg:left-[var(--sidebar-width,0px)]'
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Minimal sticky header */}
      <div
        className="flex items-center justify-between px-3 bg-elec-dark border-b border-white/10 shrink-0"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 sm:h-9 sm:w-9 text-white hover:text-white hover:bg-white/10 touch-manipulation"
            aria-label={projectId ? 'Back to project' : 'Back'}
            onClick={() => navigate(projectId ? `/electrician/projects/${projectId}` : '/electrician/business')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="hidden sm:block text-sm font-semibold text-white truncate">Room Planner</h1>
          {projectId && (
            <span
              className="flex items-center gap-1.5 text-[11px] text-elec-yellow px-2 py-1 rounded-md bg-elec-yellow/10 border border-elec-yellow/20 max-w-[140px] sm:max-w-[200px]"
              title={projectName ? `Linked to ${projectName}` : 'Linked to project'}
            >
              <FolderOpen className="h-3 w-3 shrink-0" />
              <span className="truncate">{projectName ?? 'Project'}</span>
            </span>
          )}
          {reportId && !projectId && (
            <span
              className="flex items-center gap-1.5 text-[11px] text-elec-yellow px-2 py-1 rounded-md bg-elec-yellow/10 border border-elec-yellow/20 max-w-[140px] sm:max-w-[200px]"
              title={reportLabel ? `Linked to report — ${reportLabel}` : 'Linked to report'}
            >
              <FileText className="h-3 w-3 shrink-0" />
              <span className="truncate">{reportLabel ?? 'Report'}</span>
            </span>
          )}
          {(() => {
            // Storage rejected a write — this outranks every other status.
            // Showing "Saved" here while nothing is being persisted is the
            // failure mode this badge exists to prevent.
            if (storageBlocked) {
              return (
                <span
                  className="flex items-center gap-1.5 text-[11px] text-white px-2 py-1 rounded-md bg-red-500/20 border border-red-500/40"
                  title="Device storage is full — changes are not being saved"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="whitespace-nowrap">Not saved — storage full</span>
                </span>
              );
            }
            if (canvasObjects.length === 0 && !lastSavedAt) return null;
            const diffSec = lastSavedAt
              ? Math.max(0, Math.floor((Date.now() - lastSavedAt.getTime()) / 1000))
              : null;
            const label = isDirty
              ? 'Saving…'
              : diffSec === null
                ? null
                : diffSec < 5
                  ? 'Saved'
                  : diffSec < 60
                    ? `Saved ${diffSec}s ago`
                    : `Saved ${Math.floor(diffSec / 60)}m ago`;
            if (!label) return null;
            const dotColour = isDirty ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400';
            // Reference the tick state so React knows to re-render this branch.
            void savedAgoTick;
            return (
              <span
                className="flex items-center gap-1.5 text-[11px] text-white/70 px-2 py-1 rounded-md bg-white/5"
                title={label}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dotColour}`} />
                {/* Wording is dropped below sm: on a 390px phone the header
                    has to fit Back, this pill and three actions. */}
                <span className="hidden sm:inline whitespace-nowrap">{label}</span>
              </span>
            );
          })()}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* My Plans — primary discoverable entry to multi-room plan library */}
          <Button
            onClick={() => { haptic.light(); setMyPlansOpen(true); }}
            aria-label="My Plans"
            variant="ghost"
            className="h-11 sm:h-9 px-3 text-white hover:bg-white/10 text-xs font-medium touch-manipulation rounded-lg border border-white/10"
          >
            <FolderOpen className="h-3.5 w-3.5 sm:mr-1" />
            <span className="hidden sm:inline">My Plans</span>
          </Button>

          {/* Save Room — primary action */}
          <Button
            onClick={() => {
              if (canvasObjects.length === 0) {
                toast({ title: 'Nothing to save', description: 'Draw a room or place symbols first' });
                return;
              }
              haptic.light();
              // Capture the thumbnail NOW while the canvas is clean and
              // unobstructed — before the SaveRoomSheet covers half of it.
              // This is critical: if we wait until after the sheet is open,
              // the fabric canvas can be in a resized/stale state and
              // toCanvasElement returns a blank image (the "blank second
              // room" bug).
              const fabricCanvas = canvasRef.current?.getFabricCanvas?.();
              if (fabricCanvas) {
                fabricCanvas.renderAll?.();
                const bounds = getObjectBounds(canvasObjects);
                const fullImage = renderCenteredRoomImage(
                  fabricCanvas, bounds, ROOM_EXPORT_SIZE, ROOM_IMAGE_PADDING, 1,
                );
                const thumbnail = renderCenteredRoomImage(
                  fabricCanvas, bounds, ROOM_THUMBNAIL_SIZE, 18, 0.8,
                );
                setPendingSave({ thumbnail, fullImage });
              }
              setSaveSheetOpen(true);
            }}
            aria-label="Save Room"
            className="h-11 sm:h-9 px-3 bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs font-bold touch-manipulation rounded-lg shrink-0"
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            <span className="sm:hidden">Save</span>
            <span className="hidden sm:inline">Save Room</span>
          </Button>

          {/* Export — visible on EVERY size (icon-only on mobile). Previously
              this was tablet-only and mobile users had to dig into the ⋮ menu
              to find it, which read as "there's no way to export". Guides the
              user to save first if they haven't. */}
          <Button
            onClick={() => {
              if (rooms.length === 0 && canvasObjects.length === 0) {
                toast({ title: 'Nothing to export', description: 'Draw a room or place symbols first' });
                return;
              }
              if (canvasObjects.length > 0 && !rooms.find((r) => r.id === activeRoomId)) {
                toast({ title: 'Save this room first', description: 'Tap Save Room before exporting' });
                return;
              }
              // The PDF is built from each room's SAVED image. Editing a room
              // and exporting without re-saving used to silently produce a
              // document missing every change made since the last save.
              if (roomDirty && activeRoomId && canvasObjects.length > 0) {
                haptic.warning();
                toast({
                  title: 'Unsaved changes to this room',
                  description: 'Tap Save Room first, or the PDF will show the previous version.',
                });
                return;
              }
              haptic.light();
              setExportReviewOpen(true);
            }}
            aria-label="Export PDF"
            variant="ghost"
            className="flex h-11 sm:h-9 px-3 text-white hover:bg-white/10 text-xs font-medium touch-manipulation rounded-lg border border-white/10"
          >
            <Download className="h-3.5 w-3.5 sm:mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          {/* Overflow menu — rotate, delete, and other options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 sm:h-9 sm:w-9 text-white hover:text-white hover:bg-white/10 touch-manipulation"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-elec-card border-white/10 min-w-[180px]">
              {/* Save as image — quick PNG of the current room (PDF lives as a
                  visible button in the header now). */}
              <DropdownMenuItem
                onClick={handleSaveImage}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Save as Image (PNG)
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => { canvasRef.current?.handleRotate?.(); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Rotate Selected
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { canvasRef.current?.deleteSelected?.(); haptic.heavy(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />

              {/* Advanced drawing tools */}
              <DropdownMenuItem
                onClick={() => { setActiveTool('line'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Minus className="h-4 w-4 mr-2" />
                Draw Line
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { setActiveTool('rectangle'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Square className="h-4 w-4 mr-2" />
                Draw Box
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { setActiveTool('text'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Type className="h-4 w-4 mr-2" />
                Add Label
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { setActiveTool('dimension'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Ruler className="h-4 w-4 mr-2" />
                Add Dimension
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => setGridEnabled(!gridEnabled)}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Grid3x3 className="h-4 w-4 mr-2" />
                {gridEnabled ? 'Hide Grid' : 'Show Grid'}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSnapEnabled(!snapEnabled)}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Magnet className="h-4 w-4 mr-2" />
                {snapEnabled ? 'Disable Snap' : 'Enable Snap'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => setMyPlansOpen(true)}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Saved Plans
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSave}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLoad}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Open Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Saved rooms strip */}
      {rooms.length > 0 && (
        <SavedRoomsStrip
          rooms={rooms}
          activeRoomId={activeRoomId}
          onRoomSelect={handleRoomSelect}
          onNewRoom={handleNewRoom}
          onDeleteRoom={handleRoomDelete}
        />
      )}

      {/* Full-viewport canvas with dark surround */}
      <div className="flex-1 overflow-hidden relative bg-[#1a1a1a] p-1">
        {/* Cable tool status banner — drops from top of canvas when active */}
        {activeTool === 'cable' && (
          <div className="pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center px-4">
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-black/85 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
              </span>
              <span className="text-yellow-400">Cable tool</span>
              <span className="text-white">·</span>
              <span>Tap a symbol, then tap the next to route</span>
            </div>
          </div>
        )}
        <DiagramCanvas
          ref={canvasRef}
          activeTool={activeTool}
          selectedSymbolId={selectedSymbolId}
          objects={canvasObjects}
          onObjectsChange={(newObjects) => {
            // If a new symbol was just placed, auto-switch back to select
            if (activeTool === 'symbol' && newObjects.length > canvasObjects.length) {
              haptic.success();
              setActiveTool('select');
              setSelectedSymbolId(null);
              setPlacingSymbolName(null);
            }
            setCanvasObjects(newObjects);
          }}
          gridEnabled={gridEnabled}
          snapEnabled={snapEnabled}
          headerHeight={HEADER_HEIGHT}
          toolbarHeight={TOOLBAR_HEIGHT}
          onWallTapped={(wallId, currentLength, screenPos) => {
            setWallEditState({ wallId, currentLength, position: screenPos });
            setWallEditLength(currentLength.toFixed(2));
          }}
          onRotate={handleRotateAll}
          onToolChange={(tool) => {
            setActiveTool(tool as any);
            if (tool === 'select') {
              setSelectedSymbolId(null);
              setPlacingSymbolName(null);
            }
          }}
          onSelectionChange={(object) => {
            setSelectedObject(object);
            // Only recentre when the selection is actually off-screen. It used
            // to recentre on EVERY tap, so simply picking a socket yanked the
            // whole drawing under your thumb and lost your place.
            if (object && isMobileViewport) {
              setTimeout(() => {
                if (canvasRef.current?.isObjectVisible?.(object.id) === false) {
                  canvasRef.current?.focusOnObject?.(object.id);
                }
              }, 90);
            }
          }}
          onRequestProperties={(object) => {
            // Only fires on long-press or double-tap — opens the sheet.
            setPropertiesTarget(object);
            haptic.light();
          }}
          showMinimap={!isMobileViewport && canvasObjects.length > 0}
        />
        {/* Desktop tool rail — DESKTOP ONLY (lg+).
            A centred pill of icon-only buttons at the bottom of a 1900px screen
            is a phone layout stranded on a monitor: the tools sit miles from
            the drawing and the labels are hidden exactly where there is room
            for them. The rail follows the convention of every desktop drawing
            tool — anchored left, full labels, and the keyboard shortcuts made
            visible (they already existed but nothing advertised them). */}
        <div className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
          <div className="pointer-events-auto flex flex-col gap-0.5 rounded-2xl border border-white/10 bg-black/75 p-1.5 shadow-2xl backdrop-blur-xl">
            {toolButtons.map((tool, idx) => {
              const Icon = tool.icon;
              const active = isToolActive(tool.id);
              const prev = toolButtons[idx - 1];
              const showDivider = prev && prev.group !== tool.group;
              return (
                <Fragment key={tool.id}>
                  {showDivider && <span aria-hidden className="my-1 h-px w-full bg-white/10" />}
                  <button
                    onClick={() => handleToolTap(tool.id)}
                    aria-label={tool.label}
                    aria-pressed={active}
                    title={tool.key ? `${tool.label} (${tool.key})` : tool.label}
                    className={cn(
                      'group flex h-11 w-[150px] items-center gap-2.5 rounded-xl px-2.5 text-left transition-colors touch-manipulation',
                      active
                        ? 'bg-elec-yellow text-black'
                        : 'text-white hover:bg-white/10'
                    )}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="flex-1 truncate text-[13px] font-medium leading-none">
                      {tool.label}
                    </span>
                    {tool.key && (
                      <kbd
                        className={cn(
                          'rounded px-1 py-0.5 text-[10px] font-semibold leading-none tabular-nums',
                          active ? 'bg-black/15 text-black' : 'bg-white/10 text-white'
                        )}
                      >
                        {tool.key}
                      </kbd>
                    )}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Empty canvas hint */}
        {canvasObjects.length === 0 && rooms.length === 0 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="text-center pointer-events-auto px-6 w-[min(26rem,calc(100vw-2rem))] rounded-3xl bg-[#141414]/95 backdrop-blur-xl border border-white/[0.12] shadow-[0_24px_70px_-12px_rgba(0,0,0,0.9)] py-7">
              <h2 className="text-white text-lg font-bold mb-1">Start Your First Room</h2>
              <p className="text-white text-xs mb-5">Pick a starting point — or open one you've already saved.</p>
              <div className="space-y-2">
                <button onClick={() => { haptic.light(); setMyPlansOpen(true); }} className="w-full p-3.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] rounded-2xl touch-manipulation active:scale-[0.98] transition-colors text-left flex items-center gap-3">
                  <FolderOpen className="h-5 w-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Open a Saved Plan</p>
                    <p className="text-[11px] text-white/90">Pick up where you left off on a previous job.</p>
                  </div>
                </button>
                <button onClick={() => setShapesSheetOpen(true)} className="w-full p-3.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] rounded-2xl touch-manipulation active:scale-[0.98] transition-colors text-left flex items-center gap-3">
                  <LayoutGrid className="h-5 w-5 text-elec-yellow shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Use a Room Shape</p>
                    <p className="text-[11px] text-white/90">Start with a rectangle, L-shape, T-shape, or corridor.</p>
                  </div>
                </button>
                <button onClick={() => setAiDialogOpen(true)} className="w-full p-3.5 bg-elec-yellow/[0.12] hover:bg-elec-yellow/20 border border-elec-yellow/30 rounded-2xl touch-manipulation active:scale-[0.98] transition-colors text-left flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-elec-yellow shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-elec-yellow">Use AI Help</p>
                    <p className="text-[11px] text-elec-yellow/80">Generate from a template, voice description, or photo.</p>
                  </div>
                </button>
              </div>
              <p className="text-white/80 text-[11px] mt-5">
                {/* The toolbar is below on phones and to the left on desktop —
                    the copy has to follow the layout it is describing. */}
                <span className="lg:hidden">You can also draw walls manually from the toolbar below.</span>
                <span className="hidden lg:inline">You can also draw walls manually — the tools are on the left.</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom toolbar — PHONE AND TABLET ONLY.
          Native tab-bar feel, horizontally scrollable so every tool keeps a
          full 44px+ thumb target on a 360px phone. The active tool expands to
          show its label (iOS segmented-control style). Group dividers
          (Select / Draw / Place / Edit / AI / History) are visible at every
          size. Desktop gets the vertical rail instead — see below. */}
      <div className="shrink-0 bg-[#111] border-t border-white/10 safe-area-pb lg:hidden">
        <div className="flex items-stretch">
          {/* Scrolling tool list. Ten tools cannot fit a 374px phone, so this
              scrolls — with a fade on the right edge so it is obvious there
              is more, which a plain overflow gave no hint of. */}
          <div className="relative min-w-0 flex-1">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2 py-1.5">
              {drawingTools.map((tool, idx) => {
                const Icon = tool.icon;
                const active = isToolActive(tool.id);
                const prev = drawingTools[idx - 1];
                const showDivider = prev && prev.group !== tool.group;
                return (
                  <Fragment key={tool.id}>
                    {showDivider && (
                      <span aria-hidden className="self-center h-7 w-px shrink-0 bg-white/10 mx-0.5" />
                    )}
                    <button
                      onClick={() => handleToolTap(tool.id)}
                      aria-label={tool.label}
                      aria-pressed={active}
                      className={cn(
                        'flex h-12 min-w-[48px] shrink-0 items-center justify-center rounded-xl px-2.5 touch-manipulation transition-colors duration-200 active:scale-90',
                        active
                          ? 'bg-elec-yellow text-black'
                          : 'text-white/90 hover:bg-white/5 active:bg-white/10'
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span
                        className={cn(
                          'overflow-hidden whitespace-nowrap text-[12px] font-semibold leading-none transition-all duration-200',
                          active ? 'ml-1.5 max-w-[80px] opacity-100' : 'ml-0 max-w-0 opacity-0'
                        )}
                      >
                        {tool.label}
                      </span>
                    </button>
                  </Fragment>
                );
              })}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#111] to-transparent"
            />
          </div>

          {/* Undo / Redo are PINNED, never scrolled away.
              They used to sit at the end of the scrolling row, which put the
              two controls you reach for most often off the right edge of a
              phone with nothing to say they existed. */}
          <div className="flex shrink-0 items-center gap-1 border-l border-white/10 px-2 py-1.5">
            {historyTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolTap(tool.id)}
                  aria-label={tool.label}
                  className="flex h-12 min-w-[48px] shrink-0 items-center justify-center rounded-xl text-white/90 touch-manipulation transition-colors duration-200 active:scale-90 hover:bg-white/5 active:bg-white/10"
                >
                  <Icon className="h-5 w-5 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedObject && !wallEditState && (
        <div
          className="absolute left-1/2 z-40 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl px-2 py-2 shadow-2xl max-w-[calc(100vw-16px)] overflow-x-auto"
          style={{ bottom: `calc(${floatingUiBottom}px + env(safe-area-inset-bottom, 0px))` }}
        >
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={handleDuplicateSelected}
              className="flex min-h-11 items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-white hover:bg-white/10 touch-manipulation active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" />
              Duplicate
            </button>
            <button
              onClick={() => canvasRef.current?.focusOnObject?.(selectedObject.id)}
              className="flex min-h-11 items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-white hover:bg-white/10 touch-manipulation active:scale-95"
            >
              <Crosshair className="h-3.5 w-3.5" />
              Focus
            </button>
            <button
              onClick={() => canvasRef.current?.handleRotate?.()}
              className="flex min-h-11 items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-white hover:bg-white/10 touch-manipulation active:scale-95"
            >
              <RotateCw className="h-3.5 w-3.5" />
              Rotate
            </button>
            <button
              onClick={() => canvasRef.current?.deleteSelected?.()}
              className="flex min-h-11 items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-95"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Symbol count panel — floats above scale bar */}
      <SymbolCountPanel
        counts={symbolCounts}
        circuits={circuitSummary}
        mobile={isMobileViewport}
        bottomOffset={overlayBottom}
        // Any overlay covering the canvas should hide this too — it used to stay
        // pinned above the Export, My Plans and AI sheets on mobile.
        hidden={
          isMobileViewport &&
          (!!propertiesTarget ||
            !!wallEditState ||
            saveSheetOpen ||
            symbolSheetOpen ||
            shapesSheetOpen ||
            exportReviewOpen ||
            myPlansOpen ||
            aiDialogOpen ||
            !!pendingPlanAction ||
            !!pendingCloudPlan)
        }
      />

      {/* Scale bar is rendered by DiagramCanvas — no duplicate needed */}

      {/* Symbol placement indicator */}
      {placingSymbolName && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-elec-yellow text-black text-xs font-semibold shadow-lg animate-pulse">
          Tap canvas to place: {placingSymbolName}
        </div>
      )}

      {/* Symbol Library Sheet */}
      <SymbolLibrary
        open={symbolSheetOpen}
        onOpenChange={setSymbolSheetOpen}
        onSymbolSelect={(symbolId, quantity) => {
          if (quantity > 1) {
            // Multi-place: add symbols in a grid pattern near canvas centre
            // Use viewport-aware centre (account for zoom/pan)
            const fabricCanvas = canvasRef.current?.getFabricCanvas?.();
            const placementCentre = canvasRef.current?.getPlacementCenter?.();
            let centreX = placementCentre?.x ?? window.innerWidth / 2;
            let centreY = placementCentre?.y ?? (window.innerHeight - HEADER_HEIGHT - TOOLBAR_HEIGHT) / 2;
            if (!placementCentre && fabricCanvas) {
              const vpt = fabricCanvas.viewportTransform;
              const zoom = fabricCanvas.getZoom();
              if (vpt) {
                centreX = (centreX - vpt[4]) / zoom;
                centreY = (centreY - vpt[5]) / zoom;
              }
            }
            const cols = Math.min(quantity, 4);
            const spacing = 60;
            const ts = Date.now();
            const newObjects: CanvasObject[] = [];
            for (let i = 0; i < quantity; i++) {
              const col = i % cols;
              const row = Math.floor(i / cols);
              newObjects.push({
                id: `obj-${ts}-${i}`,
                type: 'symbol' as const,
                x: centreX + col * spacing - ((cols - 1) * spacing) / 2,
                y: centreY + row * spacing,
                width: 40,
                height: 40,
                rotation: 0,
                symbolId,
              });
            }
            commitObjects((prev) => [...prev, ...newObjects]);
            setSymbolSheetOpen(false);
            setPlacingSymbolName(null);
            setSelectedSymbolId(null);
            setActiveTool('select');
          } else {
            // Single place: tap canvas to position
            setSelectedSymbolId(symbolId);
            setActiveTool('symbol');
            setSymbolSheetOpen(false);
            import('@/components/electrician-tools/diagram-builder/symbols/symbolRegistry').then(
              ({ symbolRegistry }) => {
                const sym = symbolRegistry.find((s) => s.id === symbolId);
                setPlacingSymbolName(sym?.name || null);
              }
            );
          }
        }}
        selectedSymbolId={selectedSymbolId}
      />

      {/* Properties Panel Sheet — driven by `propertiesTarget`, which is
          only set via long-press or double-tap (Phase 2 gesture refactor).
          A single-tap still selects objects for the floating action bar
          above, but no longer auto-opens this sheet. */}
      <PropertiesPanel
        selectedObject={propertiesTarget}
        onUpdate={(updates) => {
          handleObjectUpdate(updates);
          // Mirror the update into the live target so the sheet reflects
          // the change immediately.
          setPropertiesTarget((prev) => (prev ? { ...prev, ...updates } : prev));
        }}
        onDelete={handleObjectDelete}
        onClose={() => setPropertiesTarget(null)}
      />

      {/* My Floor Plans Sheet */}
      <MyPlansSheet
        open={myPlansOpen}
        onOpenChange={setMyPlansOpen}
        currentRooms={rooms}
        // Both of these wipe every room on the device. The deep-link path has
        // always confirmed first; these two did it silently, which meant an
        // accidental tap could destroy a day's survey with no undo. Route them
        // through the same confirmation instead.
        onLoadPlan={(plan) => {
          haptic.light();
          if (rooms.length > 0) {
            setPendingPlanAction({ kind: 'load', plan });
            return;
          }
          applyPlanLoad(plan);
        }}
        onNewPlan={() => {
          if (rooms.length > 0) {
            setPendingPlanAction({ kind: 'new' });
            return;
          }
          applyPlanReset();
        }}
      />

      {/* AI Room Builder Dialog */}
      <AIRoomBuilderDialog
        open={aiDialogOpen}
        onOpenChange={setAiDialogOpen}
        onRoomGenerated={handleRoomGenerated}
        canvasObjects={canvasObjects}
        savedRooms={rooms}
        onSymbolsAutoPlaced={(symbols) => commitObjects((prev) => [...prev, ...symbols])}
      />

      {/* Save Room Sheet */}
      <SaveRoomSheet
        open={saveSheetOpen}
        onOpenChange={(open) => {
          setSaveSheetOpen(open);
          if (!open) setPendingSave(null);
        }}
        onSave={handleSaveRoom}
        defaultName={activeRoom?.name || `Room ${rooms.length + 1}`}
      />

      {/* Deep-link replace confirmation — protects unsaved local work when
          the URL points to a different cloud plan than what's in localStorage. */}
      <AlertDialog
        open={!!pendingCloudPlan}
        onOpenChange={(open) => {
          if (!open) {
            // User dismissed without choosing — treat as Cancel:
            // local rooms stay, and we detach from the cloud row so the
            // next Save Room creates a fresh plan rather than overwriting
            // the one they declined to load.
            setPendingCloudPlan(null);
            linkedFloorPlanIdRef.current = null;
            setLinkedFloorPlanId(null);
          }
        }}
      >
        <AlertDialogContent className="bg-elec-gray border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Open this saved plan?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              You already have {pendingCloudPlan?.localRoomCount ?? 0} room
              {pendingCloudPlan && pendingCloudPlan.localRoomCount !== 1 ? 's' : ''} on this
              device. Opening "{pendingCloudPlan?.name}" replaces them with{' '}
              {pendingCloudPlan?.rooms.length ?? 0} cloud room
              {pendingCloudPlan && pendingCloudPlan.rooms.length !== 1 ? 's' : ''}. This
              can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                setPendingCloudPlan(null);
                // Detach so subsequent saves create a new plan instead of
                // silently overwriting the one we declined.
                linkedFloorPlanIdRef.current = null;
                setLinkedFloorPlanId(null);
                toast({
                  title: 'Kept your local rooms',
                  description: 'Save Room will create a new plan instead of opening the linked one.',
                });
              }}
            >
              Keep local
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={() => {
                if (pendingCloudPlan) {
                  applyCloudPlan({ name: pendingCloudPlan.name, rooms: pendingCloudPlan.rooms });
                }
                setPendingCloudPlan(null);
              }}
            >
              Replace with cloud
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* My Plans destructive-action confirmation — loading a plan or starting
          a new one replaces every room held on this device. */}
      <AlertDialog
        open={!!pendingPlanAction}
        onOpenChange={(open) => { if (!open) setPendingPlanAction(null); }}
      >
        <AlertDialogContent className="bg-elec-gray border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {pendingPlanAction?.kind === 'load' ? 'Replace your current rooms?' : 'Start a new plan?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              You have {rooms.length} room{rooms.length !== 1 ? 's' : ''} on this device.{' '}
              {pendingPlanAction?.kind === 'load'
                ? `Opening "${pendingPlanAction.plan.name}" replaces ${rooms.length === 1 ? 'it' : 'them'} with ${pendingPlanAction.plan.rooms.length} room${pendingPlanAction.plan.rooms.length !== 1 ? 's' : ''}.`
                : `Starting a new plan clears ${rooms.length === 1 ? 'it' : 'them'}.`}{' '}
              This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              Keep my rooms
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                if (pendingPlanAction?.kind === 'load') applyPlanLoad(pendingPlanAction.plan);
                else if (pendingPlanAction?.kind === 'new') applyPlanReset();
                setPendingPlanAction(null);
              }}
            >
              {pendingPlanAction?.kind === 'load' ? 'Replace' : 'Clear and start new'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Export Review Sheet */}
      <ExportReviewSheet
        open={exportReviewOpen}
        onOpenChange={setExportReviewOpen}
        rooms={rooms}
        defaultProperty={projectLocation ?? undefined}
        defaultClient={projectClientName ?? undefined}
        defaultElectrician={electricianName ?? undefined}
        onGeneratePdf={async (data) => {
          haptic.light();
          const loadingToast = toast({ title: 'Generating PDF...', description: 'This may take a moment' });

          try {
            // Build room data with canvas images
            const roomsPayload = data.rooms.map((room) => ({
              name: room.name,
              floor_plan_image: room.fullImage || room.thumbnail || '',
              item_count: room.symbolIds.length,
              items: (() => {
                const counts = new Map<string, number>();
                room.symbolIds.forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
                return Array.from(counts.entries()).map(([id, count]) => {
                  const sym = symbolRegistry.find((s) => s.id === id);
                  return { name: sym?.name || id, count };
                });
              })(),
            }));

            // Group materials by category
            const materialsByCategory = Object.entries(
              data.materialsSchedule.reduce<Record<string, { name: string; count: number }[]>>((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push({ name: item.name, count: item.count });
                return acc;
              }, {})
            ).map(([name, items]) => ({ name, items }));

            // Symbol legend — only the symbols this drawing actually uses.
            //
            // This used to embed all 114 registry symbols as base64 SVG data
            // URIs on every export, alongside a full-resolution PNG per room.
            // On a multi-room plan that pushed the request body into the tens
            // of megabytes for a legend that was mostly irrelevant to the job.
            // A legend of what's on the drawing is also what the electrician
            // actually wants in front of a client.
            const usedSymbolIds = new Set(data.rooms.flatMap((room) => room.symbolIds));
            const { loadSymbolSvg } = await import(
              '@/components/electrician-tools/diagram-builder/symbols/svgLoader'
            );
            const allSymbolsLegend = await Promise.all(
              symbolRegistry
                .filter((sym) => usedSymbolIds.has(sym.id))
                .map(async (sym) => {
                  try {
                    const svgContent = await loadSymbolSvg(sym.id);
                    // btoa throws on non-Latin1; encode first.
                    const b64 = btoa(unescape(encodeURIComponent(svgContent)));
                    return {
                      name: sym.name,
                      category: sym.category.charAt(0).toUpperCase() + sym.category.slice(1),
                      svg_data_uri: `data:image/svg+xml;base64,${b64}`,
                    };
                  } catch {
                    return { name: sym.name, category: sym.category, svg_data_uri: '' };
                  }
                })
            );

            // The schedule comes from the export sheet, where the electrician
            // has had the chance to correct it. Recomputing it here would throw
            // their edits away and silently issue the auto-generated defaults.
            const circuitSchedule = data.circuitSchedule;
            // Board schedule is derived from the circuits the user just
            // reviewed, so it always agrees with the circuit page.
            const cu = buildConsumerUnitSchedule(circuitSchedule);

            const revision = {
              rev: data.revision,
              date: data.date,
              description: data.revisionNote,
              by: data.electrician,
            };

            const { data: result, error } = await supabase.functions.invoke('generate-floor-plan-pdf', {
              body: {
                // Without this the function's writeback is skipped entirely, so
                // `pdf_url` / `status: 'exported'` were never set on the row and
                // a linked project or report never showed its drawing.
                floor_plan_id: linkedFloorPlanIdRef.current ?? undefined,
                property_address: data.property,
                client_name: data.client,
                electrician_name: data.electrician,
                date: data.date,
                drawing_number: data.drawingNumber,
                notes: data.notes,
                rooms: roomsPayload,
                materials_by_category: materialsByCategory,
                total_items: data.totalItems,
                all_symbols: allSymbolsLegend,
                circuit_schedule: circuitSchedule,
                consumer_unit: {
                  ways: cu.ways,
                  way_count: cu.wayCount,
                  total_connected_load_kw: cu.totalConnectedLoadKw,
                },
                standard_notes: STANDARD_NOTES,
                revision,
                // Branding — the floor plan was the only client-facing document
                // in the app going out with no company identity on it.
                company_name: companyBrand?.name ?? '',
                company_logo: companyBrand?.logo ?? '',
                company_accent_color: companyBrand?.accent ?? '',
                company_phone: companyBrand?.phone ?? '',
                company_email: companyBrand?.email ?? '',
                // The drawing is dimensioned in metres but rasterised to fit the
                // page, so it is not reproduced at a fixed printed ratio. Say so
                // honestly rather than the old blanket "Not to scale".
                scale_note: 'Dimensions in metres — not reproduced to printed scale',
              },
            });

            if (error) throw error;

            if (result?.success && result?.pdf_url) {
              haptic.success();
              toast({ title: 'PDF ready', description: 'Opening...', variant: 'success' });

              // Download/share the PDF on all platforms
              const { openOrDownloadPdf } = await import('@/utils/pdf-download');
              await openOrDownloadPdf(result.pdf_url, `floor-plan-${Date.now()}.pdf`);
              setExportReviewOpen(false);
            } else if (result?.status === 'processing') {
              toast({ title: 'PDF generating', description: 'Check back in a moment — the PDF is still being created.' });
            } else {
              throw new Error(result?.error || 'PDF generation failed');
            }
          } catch (err) {
            haptic.error();
            toast({ title: 'PDF failed', description: err instanceof Error ? err.message : 'Could not generate PDF', variant: 'destructive' });
          }
        }}
      />

      {/* Room Shape Picker Sheet */}
      <RoomShapePicker
        open={shapesSheetOpen}
        onOpenChange={setShapesSheetOpen}
        getPlacementCenter={() => canvasRef.current?.getPlacementCenter?.() ?? null}
        onShapePlaced={(walls) => {
          haptic.success();
          commitObjects((prev) => [...prev, ...walls]);
          const bounds = getObjectBounds(walls);
          if (bounds) {
            setTimeout(() => canvasRef.current?.focusOnPoint?.(bounds.centreX, bounds.centreY), 90);
          }
          setTimeout(() => canvasRef.current?.zoomToFit?.(), 220);
        }}
      />

      {/* Wall length edit — fixed bottom bar */}
      {wallEditState && (
        <div
          className={cn(
            // Phones: a full-width bar pinned to the bottom, which is right for
            // a thumb. Desktop: a floating card in the content column instead —
            // as a full-width slab it spanned the whole window (including under
            // the sidebar) and covered the bottom of the tool rail.
            'fixed left-0 right-0 z-50 bg-[#111] border-t border-elec-yellow/30 px-4 py-3 safe-area-pb',
            'lg:left-[calc(var(--sidebar-width,0px)+1rem)] lg:right-4 lg:mx-auto lg:mb-4 lg:max-w-xl',
            'lg:rounded-2xl lg:border lg:border-elec-yellow/30 lg:shadow-2xl'
          )}
          style={{ bottom: `${overlayBottom}px` }}
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <p className="text-xs text-white mb-1.5 font-medium">Wall length</p>
              <p className="text-[11px] text-white mb-2">Drag the end handles on the wall or enter an exact length.</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="20"
                  value={wallEditLength}
                  onChange={(e) => setWallEditLength(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') applyWallLength();
                    if (e.key === 'Escape') setWallEditState(null);
                  }}
                  className="h-12 w-24 bg-white/10 border border-white/20 rounded-xl text-white text-center text-lg font-semibold px-3 touch-manipulation focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/30 focus:outline-none"
                  autoFocus
                />
                <span className="text-white text-sm font-medium">metres</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setWallEditState(null)}
                className="h-12 px-4 bg-white/10 text-white rounded-xl text-sm font-medium touch-manipulation active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={applyWallLength}
                className="h-12 px-6 bg-elec-yellow text-black rounded-xl text-sm font-bold touch-manipulation active:scale-95"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default DiagramBuilderPage;
