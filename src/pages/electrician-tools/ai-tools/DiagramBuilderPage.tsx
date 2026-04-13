import { useState, useRef, useEffect, useMemo } from 'react';
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
import { assignCircuits } from '@/utils/circuit-assignment';
import { STANDARD_NOTES } from '@/utils/standard-electrical-notes';
import { useFloorPlanRooms } from '@/hooks/useFloorPlanRooms';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { storageSetJSONSync, storageGetJSONSync } from '@/utils/storage';
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

const renderCenteredRoomImage = (
  sourceCanvas: HTMLCanvasElement,
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

  if (!bounds || bounds.width <= 0 || bounds.height <= 0) {
    ctx.drawImage(sourceCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
    return outputCanvas.toDataURL('image/png', quality);
  }

  const cropX = Math.max(0, bounds.minX - padding);
  const cropY = Math.max(0, bounds.minY - padding);
  const cropWidth = Math.min(sourceCanvas.width - cropX, bounds.width + padding * 2);
  const cropHeight = Math.min(sourceCanvas.height - cropY, bounds.height + padding * 2);

  const scale = Math.min(
    (outputCanvas.width - padding * 2) / cropWidth,
    (outputCanvas.height - padding * 2) / cropHeight
  );

  const drawWidth = cropWidth * scale;
  const drawHeight = cropHeight * scale;
  const drawX = (outputCanvas.width - drawWidth) / 2;
  const drawY = (outputCanvas.height - drawHeight) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    sourceCanvas,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );

  return outputCanvas.toDataURL('image/png', quality);
};

const DiagramBuilderPage = () => {
  const navigate = useNavigate();

  const [activeTool, setActiveTool] = useState<DrawingTool>('select');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string | null>(null);
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([]);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null);
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
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [exportReviewOpen, setExportReviewOpen] = useState(false);
  const [myPlansOpen, setMyPlansOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [mobileUiOffset, setMobileUiOffset] = useState(0);
  const { rooms, saveRoom, deleteRoom, updateRoom } = useFloorPlanRooms();
  const canvasRef = useRef<any>(null);
  const [searchParams] = useSearchParams();
  const haptic = useHaptic();
  const autoSaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Auto-save every 30 seconds when canvas has objects
  useEffect(() => {
    if (canvasObjects.length === 0) return;
    autoSaveTimerRef.current = setInterval(() => {
      const projectData = {
        objects: canvasObjects,
        settings: { gridEnabled, snapEnabled },
        timestamp: new Date().toISOString(),
      };
      storageSetJSONSync('diagram-builder-project', projectData);
    }, 30000);
    return () => {
      if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current);
    };
  }, [canvasObjects, gridEnabled, snapEnabled]);

  const handleSave = () => {
    haptic.success();
    const projectData = {
      objects: canvasObjects,
      settings: { gridEnabled, snapEnabled },
      timestamp: new Date().toISOString(),
    };
    storageSetJSONSync('diagram-builder-project', projectData);
    toast({
      title: 'Saved',
      variant: 'success',
    });
  };

  const handleLoad = () => {
    const data = storageGetJSONSync<any>('diagram-builder-project', null);
    if (data) {
      setCanvasObjects(data.objects || []);
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

  const handleUndo = () => {
    canvasRef.current?.undo?.();
  };

  const handleRedo = () => {
    canvasRef.current?.redo?.();
  };

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
    setCanvasObjects(rotated);
    setTimeout(() => canvasRef.current?.zoomToFit?.(), 300);
    toast({ title: 'Rotated 90°' });
  };

  const handleObjectUpdate = (updates: Partial<CanvasObject>) => {
    if (!selectedObject) return;
    if ((updates as any)._delete) {
      setCanvasObjects((prev) => prev.filter((obj) => obj.id !== selectedObject.id));
      setSelectedObject(null);
      canvasRef.current?.deleteSelected?.();
      return;
    }
    const updatedObjects = canvasObjects.map((obj) =>
      obj.id === selectedObject.id ? applyCanvasObjectUpdates(obj, updates) : obj
    );
    setCanvasObjects(updatedObjects);
    setSelectedObject(applyCanvasObjectUpdates(selectedObject, updates));
  };

  const handleDuplicateSelected = () => {
    if (!selectedObject) return;
    const duplicated = duplicateCanvasObject(selectedObject);
    setCanvasObjects((prev) => [...prev, duplicated]);
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

  const handleSaveRoom = (name: string) => {
    const fabricCanvas = canvasRef.current?.getFabricCanvas?.();
    const previousViewport = fabricCanvas?.viewportTransform ? [...fabricCanvas.viewportTransform] : null;
    if (fabricCanvas) {
      fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      fabricCanvas.renderAll();
    }

    const canvasEl = canvasRef.current?.getCanvasElement();
    let thumbnail = '';
    let fullImage = '';
    if (canvasEl) {
      const bounds = getObjectBounds(canvasObjects);
      fullImage = renderCenteredRoomImage(
        canvasEl,
        bounds,
        ROOM_EXPORT_SIZE,
        ROOM_IMAGE_PADDING,
        1
      );
      thumbnail = renderCenteredRoomImage(
        canvasEl,
        bounds,
        ROOM_THUMBNAIL_SIZE,
        18,
        0.8
      );
    }

    if (fabricCanvas && previousViewport) {
      fabricCanvas.setViewportTransform(previousViewport as [number, number, number, number, number, number]);
      fabricCanvas.renderAll();
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

    if (activeRoomId) {
      updateRoom(activeRoomId, roomPayload);
    } else {
      const newRoom = saveRoom(roomPayload);
      setActiveRoomId(newRoom.id);
    }

    setSaveSheetOpen(false);
    haptic.success();
    toast({
      title: `${name} saved`,
      description: `${symbolCounts.length > 0 ? symbolCounts.reduce((sum, s) => sum + s.count, 0) + ' items. ' : ''}Keep editing or export when ready.`,
    });
  };

  const handleRoomSelect = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      try {
        const objects = JSON.parse(room.canvasState);
        canvasRef.current?.forceFullRedraw?.();
        setCanvasObjects(objects);
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

  const handleNewRoom = () => {
    canvasRef.current?.forceFullRedraw?.();
    setCanvasObjects([]);
    setActiveRoomId(null);
    setSelectedObject(null);
  };

  // Primary toolbar — the tools electricians need most
  const toolButtons: { id: DrawingTool | 'add-symbol' | 'ai-room' | 'undo' | 'redo' | 'shapes'; icon: any; label: string }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'wall', icon: PenTool, label: 'Wall' },
    { id: 'shapes', icon: LayoutGrid, label: 'Room' },
    { id: 'add-symbol', icon: Plus, label: 'Add Item' },
    { id: 'cable', icon: Spline, label: 'Cable' },
    { id: 'dimension', icon: Ruler, label: 'Size' },
    { id: 'eraser', icon: Eraser, label: 'Erase' },
    { id: 'ai-room', icon: Sparkles, label: 'AI Help' },
    { id: 'undo', icon: Undo2, label: 'Undo' },
    { id: 'redo', icon: Redo2, label: 'Redo' },
  ];

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

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Minimal sticky header */}
      <div
        className="flex items-center justify-between px-3 bg-elec-dark border-b border-white/10 shrink-0"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white hover:text-white hover:bg-white/10 touch-manipulation"
            onClick={() => navigate('/electrician/business')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-sm font-semibold text-white">Room Planner</h1>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Save Room — primary action */}
          <Button
            onClick={() => {
              if (canvasObjects.length === 0) {
                toast({ title: 'Nothing to save', description: 'Draw a room or place symbols first' });
                return;
              }
              haptic.light();
              setSaveSheetOpen(true);
            }}
            aria-label="Save Room"
            className="h-9 px-3 bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs font-bold touch-manipulation rounded-lg"
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            Save Room
          </Button>

          {/* Export — visible when rooms saved */}
          {rooms.length > 0 && (
            <Button
              onClick={() => {
                if (canvasObjects.length > 0 && !rooms.find(r => r.id === activeRoomId)) {
                  toast({ title: 'Save this room first', description: 'Tap Save before exporting' });
                  return;
                }
                setExportReviewOpen(true);
              }}
              aria-label="Export PDF"
              variant="ghost"
              className="h-9 px-3 text-white hover:bg-white/10 text-xs font-medium touch-manipulation rounded-lg border border-white/10"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Export PDF
            </Button>
          )}

          {/* Overflow menu — rotate, delete, and other options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:text-white hover:bg-white/10 touch-manipulation"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-elec-card border-white/10 min-w-[180px]">
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
          onDeleteRoom={deleteRoom}
        />
      )}

      {/* Full-viewport canvas with dark surround */}
      <div className="flex-1 overflow-hidden relative bg-[#1a1a1a] p-1">
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
            if (object && isMobileViewport) {
              setTimeout(() => canvasRef.current?.focusOnObject?.(object.id), 90);
            }
          }}
          showMinimap={!isMobileViewport && canvasObjects.length > 0}
        />
        {/* Empty canvas hint */}
        {canvasObjects.length === 0 && rooms.length === 0 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="text-center pointer-events-auto px-6 max-w-sm rounded-3xl bg-black/45 backdrop-blur-md border border-white/10 shadow-2xl py-6">
              <h2 className="text-white text-lg font-bold mb-1">Start Your First Room</h2>
              <p className="text-white/80 text-xs mb-5">Choose a starting point to draw your room layout.</p>
              <div className="space-y-2">
                <button onClick={() => setShapesSheetOpen(true)} className="w-full p-3 bg-white/[0.08] border border-white/15 rounded-xl touch-manipulation active:scale-95 text-left flex items-center gap-3">
                  <LayoutGrid className="h-5 w-5 text-elec-yellow shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Use a Room Shape</p>
                    <p className="text-[10px] text-white/60">Start with a rectangle, L-shape, T-shape, or corridor.</p>
                  </div>
                </button>
                <button onClick={() => setAiDialogOpen(true)} className="w-full p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl touch-manipulation active:scale-95 text-left flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-elec-yellow shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-elec-yellow">Use AI Help</p>
                    <p className="text-[10px] text-elec-yellow/70">Create a room from a template, voice description, or photo.</p>
                  </div>
                </button>
              </div>
              <p className="text-white/70 text-[10px] mt-4">You can also draw walls manually from the toolbar below.</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom toolbar — docked like native app tab bar */}
      <div className="shrink-0 bg-[#111] border-t border-white/10 px-2 py-1.5 safe-area-pb">
        <div className="flex items-center justify-around">
          {toolButtons.map((tool) => {
            const Icon = tool.icon;
            const active = isToolActive(tool.id);
            const isAction = tool.id === 'undo' || tool.id === 'redo';
            return (
              <button
                key={tool.id}
                onClick={() => handleToolTap(tool.id)}
                aria-label={tool.label}
                className={cn(
                  'flex flex-col items-center justify-center transition-all touch-manipulation active:scale-90',
                  active
                    ? 'text-elec-yellow'
                    : isAction
                      ? 'text-white'
                      : 'text-white/60'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className={cn('text-[9px] mt-0.5 leading-none hidden min-[375px]:block', active ? 'font-bold' : 'font-medium')}>
                  {tool.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedObject && !wallEditState && (
        <div
          className="absolute left-1/2 z-40 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl px-2 py-2 shadow-2xl max-w-[calc(100vw-16px)] overflow-x-auto"
          style={{ bottom: `${floatingUiBottom}px` }}
        >
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={handleDuplicateSelected}
              className="flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-white hover:bg-white/10 touch-manipulation active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" />
              Duplicate
            </button>
            <button
              onClick={() => canvasRef.current?.focusOnObject?.(selectedObject.id)}
              className="flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-white hover:bg-white/10 touch-manipulation active:scale-95"
            >
              <Crosshair className="h-3.5 w-3.5" />
              Focus
            </button>
            <button
              onClick={() => canvasRef.current?.handleRotate?.()}
              className="flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-white hover:bg-white/10 touch-manipulation active:scale-95"
            >
              <RotateCw className="h-3.5 w-3.5" />
              Rotate
            </button>
            <button
              onClick={() => canvasRef.current?.deleteSelected?.()}
              className="flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-95"
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
        hidden={isMobileViewport && (!!selectedObject || !!wallEditState || saveSheetOpen || symbolSheetOpen || shapesSheetOpen)}
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
            setCanvasObjects((prev) => [...prev, ...newObjects]);
            setTimeout(() => canvasRef.current?.focusOnPoint?.(centreX, centreY), 120);
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

      {/* Properties Panel Sheet */}
      <PropertiesPanel
        selectedObject={selectedObject}
        onUpdate={handleObjectUpdate}
        onClose={() => setSelectedObject(null)}
      />

      {/* My Floor Plans Sheet */}
      <MyPlansSheet
        open={myPlansOpen}
        onOpenChange={setMyPlansOpen}
        currentRooms={rooms}
        onLoadPlan={(plan) => {
          haptic.light();
          canvasRef.current?.forceFullRedraw?.();
          // Clear current rooms and load the plan's rooms
          rooms.forEach((r) => deleteRoom(r.id));
          plan.rooms.forEach((room) => {
            saveRoom({
              name: room.name,
              thumbnail: room.thumbnail,
              fullImage: room.fullImage,
              canvasState: room.canvasState,
              symbolIds: room.symbolIds,
            });
          });
          setCanvasObjects([]);
          setActiveRoomId(null);
          setSelectedObject(null);
          toast({ title: `Loaded: ${plan.name}`, description: `${plan.rooms.length} rooms` });
        }}
        onNewPlan={() => {
          canvasRef.current?.forceFullRedraw?.();
          rooms.forEach((r) => deleteRoom(r.id));
          setCanvasObjects([]);
          setActiveRoomId(null);
        }}
      />

      {/* AI Room Builder Dialog */}
      <AIRoomBuilderDialog
        open={aiDialogOpen}
        onOpenChange={setAiDialogOpen}
        onRoomGenerated={handleRoomGenerated}
        canvasObjects={canvasObjects}
        savedRooms={rooms}
        onSymbolsAutoPlaced={(symbols) => setCanvasObjects((prev) => [...prev, ...symbols])}
      />

      {/* Save Room Sheet */}
      <SaveRoomSheet
        open={saveSheetOpen}
        onOpenChange={setSaveSheetOpen}
        onSave={handleSaveRoom}
        defaultName={activeRoom?.name || `Room ${rooms.length + 1}`}
      />

      {/* Export Review Sheet */}
      <ExportReviewSheet
        open={exportReviewOpen}
        onOpenChange={setExportReviewOpen}
        rooms={rooms}
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

            // Build full symbol legend (all 114 symbols as SVG data URIs)
            const allSymbolsLegend = await Promise.all(
              symbolRegistry.map(async (sym) => {
                try {
                  const { loadSymbolSvg } = await import('@/components/electrician-tools/diagram-builder/symbols/svgLoader');
                  const svgContent = await loadSymbolSvg(sym.id);
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

            // Auto-assign circuits from all symbols across all rooms
            const allSymbolIds = data.rooms.flatMap((room) => room.symbolIds);
            const { circuitSchedule } = assignCircuits(allSymbolIds);

            const revision = {
              rev: 'A',
              date: data.date,
              description: 'Initial Issue',
              by: data.electrician,
            };

            const { data: result, error } = await supabase.functions.invoke('generate-floor-plan-pdf', {
              body: {
                property_address: data.property,
                client_name: data.client,
                electrician_name: data.electrician,
                date: data.date,
                drawing_number: 'EL-001',
                notes: data.notes,
                rooms: roomsPayload,
                materials_by_category: materialsByCategory,
                total_items: data.totalItems,
                all_symbols: allSymbolsLegend,
                circuit_schedule: circuitSchedule,
                standard_notes: STANDARD_NOTES,
                revision,
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
          setCanvasObjects((prev) => [...prev, ...walls]);
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
          className="fixed left-0 right-0 z-50 bg-[#111] border-t border-elec-yellow/30 px-4 py-3 safe-area-pb"
          style={{ bottom: `${overlayBottom}px` }}
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <p className="text-xs text-white mb-1.5 font-medium">Wall length</p>
              <p className="text-[11px] text-white/55 mb-2">Drag the end handles on the wall or enter an exact length.</p>
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
    </div>
  );
};

export default DiagramBuilderPage;
