import { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DiagramCanvas } from '@/components/electrician-tools/diagram-builder/DiagramCanvas';
import { SymbolLibrary } from '@/components/electrician-tools/diagram-builder/SymbolLibrary';
import { ExportControls } from '@/components/electrician-tools/diagram-builder/ExportControls';
import { ExportDialog } from '@/components/electrician-tools/diagram-builder/ExportDialog';
import { PropertiesPanel } from '@/components/electrician-tools/diagram-builder/PropertiesPanel';
import { AIRoomBuilderDialog } from '@/components/electrician-tools/diagram-builder/AIRoomBuilderDialog';
import { RoomShapePicker } from '@/components/electrician-tools/diagram-builder/RoomShapePicker';
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

export type DrawingTool = 'select' | 'line' | 'rectangle' | 'wall' | 'text' | 'symbol' | 'dimension' | 'eraser';

export interface CanvasObject {
  id: string;
  type: 'symbol' | 'line' | 'rectangle' | 'text' | 'wall' | 'dimension';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  symbolId?: string;
  text?: string;
  points?: { x: number; y: number }[];
}

const HEADER_HEIGHT = 48;
const TOOLBAR_HEIGHT = 56;

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
  const [wallEditLength, setWallEditLength] = useState<number>(0);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [placingSymbolName, setPlacingSymbolName] = useState<string | null>(null);
  const canvasRef = useRef<any>(null);
  const [searchParams] = useSearchParams();
  const haptic = useHaptic();
  const autoSaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      description: 'Diagram saved locally',
      variant: 'success',
    });
  };

  const handleLoad = () => {
    const data = storageGetJSONSync<any>('diagram-builder-project', null);
    if (data) {
      setCanvasObjects(data.objects || []);
      setGridEnabled(data.settings?.gridEnabled ?? true);
      setSnapEnabled(data.settings?.snapEnabled ?? true);
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

  const handleRotateAll = () => {
    haptic.medium();
    // Rotate all objects 90° clockwise around the canvas centre
    const centreX = window.innerWidth / 2;
    const centreY = (window.innerHeight - HEADER_HEIGHT - TOOLBAR_HEIGHT) / 2;

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

    // Clear canvas and re-render with rotated positions
    const canvas = canvasRef.current;
    if (canvas) {
      const fabricCanvas = canvas.getCanvasElement?.()?.parentElement;
      // Force full re-render by clearing rendered IDs
    }
    setCanvasObjects(rotated);
    toast({ title: 'Rotated 90°' });
  };

  const handleObjectUpdate = (updates: Partial<CanvasObject>) => {
    if (!selectedObject) return;
    const updatedObjects = canvasObjects.map((obj) =>
      obj.id === selectedObject.id ? { ...obj, ...updates } : obj
    );
    setCanvasObjects(updatedObjects);
    setSelectedObject({ ...selectedObject, ...updates });
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

  // Primary toolbar — the tools electricians need most
  const toolButtons: { id: DrawingTool | 'add-symbol' | 'ai-room' | 'undo' | 'redo' | 'shapes'; icon: any; label: string }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'wall', icon: PenTool, label: 'Wall' },
    { id: 'shapes', icon: LayoutGrid, label: 'Shapes' },
    { id: 'add-symbol', icon: Plus, label: 'Symbol' },
    { id: 'eraser', icon: Eraser, label: 'Delete' },
    { id: 'ai-room', icon: Sparkles, label: 'AI' },
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
    if (!wallEditState || !wallEditLength || wallEditLength < 0.5) return;
    haptic.light();

    const SCALE_PX = 70;
    const newLengthPx = wallEditLength * SCALE_PX;

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
    <div className="fixed inset-0 bg-[#1a1a1a] flex flex-col">
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

        <div className="flex items-center gap-1">
          {/* Done button */}
          {canvasObjects.length > 0 && (
            <Button
              onClick={() => {
                haptic.success();
                handleSave();
                toast({
                  title: 'Room saved',
                  description: 'Floor plan saved. You can export or attach to a project.',
                  variant: 'success',
                });
              }}
              className="h-8 px-3 bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs font-semibold touch-manipulation"
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Done
            </Button>
          )}

          {/* Overflow menu */}
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
              <ExportControls canvasObjects={canvasObjects} canvasRef={canvasRef} asMenuItems onOpenPdfDialog={() => setExportDialogOpen(true)} />
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleRotateAll}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Rotate 90°
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />

              {/* Advanced drawing tools */}
              <DropdownMenuItem
                onClick={() => { setActiveTool('line'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Minus className="h-4 w-4 mr-2" />
                Line Tool
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { setActiveTool('rectangle'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Square className="h-4 w-4 mr-2" />
                Rectangle Tool
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { setActiveTool('text'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Type className="h-4 w-4 mr-2" />
                Text Label
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { setActiveTool('dimension'); haptic.light(); }}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Ruler className="h-4 w-4 mr-2" />
                Measure Distance
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
                onClick={handleSave}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLoad}
                className="text-white hover:bg-white/10 touch-manipulation"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Load Saved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
            setWallEditLength(parseFloat(currentLength.toFixed(2)));
          }}
          onRotate={handleRotateAll}
        />
      </div>

      {/* Floating pill toolbar at bottom centre */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-32px)] overflow-x-auto scrollbar-hide rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 px-1.5 py-1.5 shadow-2xl"
        style={{ bottom: 16 }}
      >
        <div className="flex items-center gap-0.5">
          {toolButtons.map((tool) => {
            const Icon = tool.icon;
            const active = isToolActive(tool.id);
            const isAction = tool.id === 'undo' || tool.id === 'redo';
            return (
              <button
                key={tool.id}
                onClick={() => handleToolTap(tool.id)}
                className={cn(
                  'flex flex-col items-center justify-center rounded-xl transition-all touch-manipulation active:scale-90',
                  active
                    ? 'bg-elec-yellow text-black min-w-[48px] h-12 px-2'
                    : isAction
                      ? 'text-white/40 hover:text-white/70 h-10 w-10'
                      : 'text-white/60 hover:text-white active:bg-white/10 min-w-[44px] h-12 px-1'
                )}
              >
                <Icon className={cn('h-5 w-5', active && 'h-4.5 w-4.5')} />
                {active && (
                  <span className="text-[8px] font-bold mt-0.5 leading-none">{tool.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale bar overlay */}
      <div className="absolute bottom-20 left-4 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
        <div className="h-2.5 border-l border-white/70" />
        <div className="w-[70px] border-t border-white/70" />
        <div className="h-2.5 border-l border-white/70" />
        <span className="text-[9px] text-white/70 ml-1 font-medium">1m</span>
      </div>

      {/* Symbol placement indicator */}
      {placingSymbolName && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-elec-yellow text-black text-xs font-semibold shadow-lg">
          Tap canvas to place: {placingSymbolName}
        </div>
      )}

      {/* Symbol Library Sheet */}
      <SymbolLibrary
        open={symbolSheetOpen}
        onOpenChange={setSymbolSheetOpen}
        onSymbolSelect={(symbolId) => {
          setSelectedSymbolId(symbolId);
          setActiveTool('symbol');
          setSymbolSheetOpen(false);
          // Find symbol name for placement indicator
          import('@/components/electrician-tools/diagram-builder/symbols/symbolRegistry').then(
            ({ symbolRegistry }) => {
              const sym = symbolRegistry.find((s) => s.id === symbolId);
              setPlacingSymbolName(sym?.name || null);
            }
          );
        }}
        selectedSymbolId={selectedSymbolId}
      />

      {/* Properties Panel Sheet */}
      <PropertiesPanel
        selectedObject={selectedObject}
        onUpdate={handleObjectUpdate}
        onClose={() => setSelectedObject(null)}
      />

      {/* AI Room Builder Dialog */}
      <AIRoomBuilderDialog
        open={aiDialogOpen}
        onOpenChange={setAiDialogOpen}
        onRoomGenerated={handleRoomGenerated}
      />

      {/* PDF Export Dialog */}
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        canvasRef={canvasRef}
        canvasObjects={canvasObjects}
      />

      {/* Room Shape Picker Sheet */}
      <RoomShapePicker
        open={shapesSheetOpen}
        onOpenChange={setShapesSheetOpen}
        onShapePlaced={(walls) => {
          haptic.success();
          setCanvasObjects((prev) => [...prev, ...walls]);
        }}
      />

      {/* Wall length edit popup */}
      {wallEditState && (
        <div
          className="absolute z-50"
          style={{
            left: Math.min(wallEditState.position.x, window.innerWidth - 200),
            top: Math.max(wallEditState.position.y - 70, 60),
          }}
        >
          <div className="bg-black/90 backdrop-blur rounded-xl p-3 border border-elec-yellow/30 shadow-xl">
            <p className="text-xs text-white mb-1">Wall length</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="20"
                value={wallEditLength}
                onChange={(e) => setWallEditLength(parseFloat(e.target.value) || 0)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') applyWallLength();
                  if (e.key === 'Escape') setWallEditState(null);
                }}
                className="h-11 w-20 bg-white/10 border border-white/20 rounded-lg text-white text-center text-sm px-2 touch-manipulation focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                autoFocus
              />
              <span className="text-white text-sm">m</span>
              <button
                onClick={applyWallLength}
                className="h-11 px-3 bg-elec-yellow text-black rounded-lg font-semibold text-sm touch-manipulation active:scale-95"
              >
                Set
              </button>
              <button
                onClick={() => setWallEditState(null)}
                className="h-11 px-2 text-white text-sm touch-manipulation active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagramBuilderPage;
