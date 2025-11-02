import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Line, Path, FabricText, FabricObject } from "fabric";
import type { CanvasObject } from "@/pages/electrician-tools/ai-tools/DiagramBuilderPage";
import { electricalSymbols } from "./symbols/electricalSymbols";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiagramCanvasProps {
  activeTool: string;
  selectedSymbolId: string | null;
  objects: CanvasObject[];
  onObjectsChange: (objects: CanvasObject[]) => void;
  gridEnabled: boolean;
  snapEnabled: boolean;
}

export const DiagramCanvas = ({
  activeTool,
  selectedSymbolId,
  objects,
  onObjectsChange,
  gridEnabled,
  snapEnabled,
}: DiagramCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const undoStack = useRef<CanvasObject[][]>([]);
  const redoStack = useRef<CanvasObject[][]>([]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasWidth = window.innerWidth > 768 ? 1200 : window.innerWidth - 24;
    const canvasHeight = window.innerWidth > 768 
      ? window.innerHeight - 200 
      : window.innerHeight - 220; // Mobile: reduced for compact layout
    
    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#1a1f2e",
      selection: activeTool === "select",
    });

    fabricCanvasRef.current = canvas;

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth > 768 ? 1200 : window.innerWidth - 24;
      const newHeight = window.innerWidth > 768 
        ? window.innerHeight - 200 
        : window.innerHeight - 220;
      
      canvas.setDimensions({
        width: newWidth,
        height: newHeight,
      });
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  // Draw grid
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.clear();
    canvas.backgroundColor = "#1a1f2e";

    if (gridEnabled) {
      const gridSize = 20;
      const width = canvas.width || 1200;
      const height = canvas.height || 600;

      // Vertical lines
      for (let i = 0; i < width / gridSize; i++) {
        const line = new Line([i * gridSize, 0, i * gridSize, height], {
          stroke: "#fbbf24",
          strokeWidth: i % 5 === 0 ? 0.5 : 0.2,
          selectable: false,
          evented: false,
          opacity: 0.15,
        });
        canvas.add(line);
      }

      // Horizontal lines
      for (let i = 0; i < height / gridSize; i++) {
        const line = new Line([0, i * gridSize, width, i * gridSize], {
          stroke: "#fbbf24",
          strokeWidth: i % 5 === 0 ? 0.5 : 0.2,
          selectable: false,
          evented: false,
          opacity: 0.15,
        });
        canvas.add(line);
      }
    }

    // Restore objects from state
    objects.forEach((obj) => {
      addObjectToCanvas(obj);
    });

    canvas.renderAll();
  }, [gridEnabled, objects]);

  // Snap to grid helper
  const snapToGrid = (value: number) => {
    if (!snapEnabled) return value;
    const gridSize = 20;
    return Math.round(value / gridSize) * gridSize;
  };

  // Add object to canvas
  const addObjectToCanvas = (obj: CanvasObject) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let fabricObj: FabricObject | null = null;

    if (obj.type === "symbol" && obj.symbolId) {
      const symbol = electricalSymbols.find((s) => s.id === obj.symbolId);
      if (symbol) {
        fabricObj = new Path(symbol.svg, {
          left: obj.x,
          top: obj.y,
          fill: "#fbbf24",
          scaleX: (obj.width || 40) / 40,
          scaleY: (obj.height || 40) / 40,
          angle: obj.rotation || 0,
          selectable: true,
          hasControls: true,
        });
        (fabricObj as any).customData = { id: obj.id, type: "symbol", symbolId: obj.symbolId };
      }
    } else if (obj.type === "rectangle") {
      fabricObj = new Rect({
        left: obj.x,
        top: obj.y,
        width: obj.width || 100,
        height: obj.height || 100,
        fill: "transparent",
        stroke: "#fbbf24",
        strokeWidth: 2,
        angle: obj.rotation || 0,
        selectable: true,
        hasControls: true,
      });
      (fabricObj as any).customData = { id: obj.id, type: "rectangle" };
    } else if (obj.type === "line" && obj.points && obj.points.length >= 2) {
      const points = obj.points;
      fabricObj = new Line(
        [points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y],
        {
          stroke: "#fbbf24",
          strokeWidth: 2,
          selectable: true,
          hasControls: true,
        }
      );
      (fabricObj as any).customData = { id: obj.id, type: "line" };
    } else if (obj.type === "text") {
      fabricObj = new FabricText(obj.text || "Text", {
        left: obj.x,
        top: obj.y,
        fill: "#fbbf24",
        fontSize: 16,
        fontFamily: "Arial",
        angle: obj.rotation || 0,
        selectable: true,
        hasControls: true,
      });
      (fabricObj as any).customData = { id: obj.id, type: "text" };
    }

    if (fabricObj) {
      canvas.add(fabricObj);
    }
  };

  // Save state for undo
  const saveState = () => {
    undoStack.current.push([...objects]);
    if (undoStack.current.length > 50) {
      undoStack.current.shift();
    }
    redoStack.current = [];
  };

  // Undo
  const undo = () => {
    if (undoStack.current.length === 0) return;
    const prevState = undoStack.current.pop();
    if (prevState) {
      redoStack.current.push([...objects]);
      onObjectsChange(prevState);
    }
  };

  // Redo
  const redo = () => {
    if (redoStack.current.length === 0) return;
    const nextState = redoStack.current.pop();
    if (nextState) {
      undoStack.current.push([...objects]);
      onObjectsChange(nextState);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // Undo: Ctrl+Z
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      // Delete: Delete or Backspace
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
          saveState();
          activeObjects.forEach((obj) => canvas.remove(obj));
          const updatedObjects = objects.filter(
            (o) => !activeObjects.some((ao) => (ao as any).customData?.id === o.id)
          );
          onObjectsChange(updatedObjects);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
      // Copy: Ctrl+C
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          (window as any).clipboard = activeObject;
        }
      }
      // Paste: Ctrl+V
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        const clipboardObj = (window as any).clipboard;
        if (clipboardObj) {
          clipboardObj.clone((cloned: FabricObject) => {
            cloned.set({
              left: (cloned.left || 0) + 20,
              top: (cloned.top || 0) + 20,
            });
            canvas.add(cloned);
            canvas.setActiveObject(cloned);
            canvas.renderAll();

            // Add to objects state
            saveState();
            const newObj: CanvasObject = {
              id: `obj-${Date.now()}`,
              type: (cloned as any).customData?.type || "rectangle",
              x: cloned.left || 0,
              y: cloned.top || 0,
              width: (cloned as any).width || 100,
              height: (cloned as any).height || 100,
              rotation: cloned.angle || 0,
            };
            onObjectsChange([...objects, newObj]);
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [objects]);

  // Handle mouse events for drawing
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.selection = activeTool === "select";

    const handleMouseDown = (e: any) => {
      if (activeTool === "select") return;

      const pointer = canvas.getPointer(e.e);
      const x = snapToGrid(pointer.x);
      const y = snapToGrid(pointer.y);

      setIsDrawing(true);
      setStartPoint({ x, y });

      if (activeTool === "symbol" && selectedSymbolId) {
        saveState();
        const symbol = electricalSymbols.find((s) => s.id === selectedSymbolId);
        if (symbol) {
          const newObj: CanvasObject = {
            id: `obj-${Date.now()}`,
            type: "symbol",
            x,
            y,
            width: 40,
            height: 40,
            rotation: 0,
            symbolId: selectedSymbolId,
          };
          onObjectsChange([...objects, newObj]);
        }
        setIsDrawing(false);
      } else if (activeTool === "text") {
        saveState();
        const newObj: CanvasObject = {
          id: `obj-${Date.now()}`,
          type: "text",
          x,
          y,
          text: "Label",
        };
        onObjectsChange([...objects, newObj]);
        setIsDrawing(false);
      }
    };

    const handleMouseMove = (e: any) => {
      if (!isDrawing || !startPoint || activeTool === "symbol" || activeTool === "text") return;

      const pointer = canvas.getPointer(e.e);
      const x = snapToGrid(pointer.x);
      const y = snapToGrid(pointer.y);

      // Clear temporary objects
      const tempObjects = canvas.getObjects().filter((obj) => (obj as any).isTemp);
      tempObjects.forEach((obj) => canvas.remove(obj));

      if (activeTool === "line") {
        const line = new Line([startPoint.x, startPoint.y, x, y], {
          stroke: "#fbbf24",
          strokeWidth: 2,
          selectable: false,
        });
        (line as any).isTemp = true;
        canvas.add(line);
      } else if (activeTool === "rectangle") {
        const rect = new Rect({
          left: Math.min(startPoint.x, x),
          top: Math.min(startPoint.y, y),
          width: Math.abs(x - startPoint.x),
          height: Math.abs(y - startPoint.y),
          fill: "transparent",
          stroke: "#fbbf24",
          strokeWidth: 2,
          selectable: false,
        });
        (rect as any).isTemp = true;
        canvas.add(rect);
      }

      canvas.renderAll();
    };

    const handleMouseUp = (e: any) => {
      if (!isDrawing || !startPoint) return;
      if (activeTool === "symbol" || activeTool === "text") return;

      const pointer = canvas.getPointer(e.e);
      const x = snapToGrid(pointer.x);
      const y = snapToGrid(pointer.y);

      saveState();

      // Remove temporary objects
      const tempObjects = canvas.getObjects().filter((obj) => (obj as any).isTemp);
      tempObjects.forEach((obj) => canvas.remove(obj));

      if (activeTool === "line") {
        const newObj: CanvasObject = {
          id: `obj-${Date.now()}`,
          type: "line",
          x: startPoint.x,
          y: startPoint.y,
          points: [
            { x: startPoint.x, y: startPoint.y },
            { x, y },
          ],
        };
        onObjectsChange([...objects, newObj]);
      } else if (activeTool === "rectangle") {
        const newObj: CanvasObject = {
          id: `obj-${Date.now()}`,
          type: "rectangle",
          x: Math.min(startPoint.x, x),
          y: Math.min(startPoint.y, y),
          width: Math.abs(x - startPoint.x),
          height: Math.abs(y - startPoint.y),
          rotation: 0,
        };
        onObjectsChange([...objects, newObj]);
      }

      setIsDrawing(false);
      setStartPoint(null);
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    };
  }, [activeTool, selectedSymbolId, isDrawing, startPoint, objects, snapEnabled]);

  // Handle object modifications
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const handleObjectModified = (e: any) => {
      const modifiedObj = e.target;
      const customData = (modifiedObj as any).customData;
      if (!customData) return;

      saveState();

      const updatedObjects = objects.map((obj) => {
        if (obj.id === customData.id) {
          return {
            ...obj,
            x: modifiedObj.left || obj.x,
            y: modifiedObj.top || obj.y,
            width: (modifiedObj.width || obj.width || 100) * (modifiedObj.scaleX || 1),
            height: (modifiedObj.height || obj.height || 100) * (modifiedObj.scaleY || 1),
            rotation: modifiedObj.angle || obj.rotation || 0,
          };
        }
        return obj;
      });

      onObjectsChange(updatedObjects);
    };

    canvas.on("object:modified", handleObjectModified);

    return () => {
      canvas.off("object:modified", handleObjectModified);
    };
  }, [objects]);

  // Zoom controls
  const handleZoomIn = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const zoom = canvas.getZoom();
    canvas.setZoom(Math.min(zoom * 1.2, 5));
  };

  const handleZoomOut = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const zoom = canvas.getZoom();
    canvas.setZoom(Math.max(zoom * 0.8, 0.1));
  };

  const handleResetView = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.setZoom(1);
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.renderAll();
  };

  return (
    <div className="flex-1 overflow-hidden bg-elec-dark p-2 md:p-4 flex items-center justify-center relative">
      <canvas ref={canvasRef} className="border border-elec-yellow/20 rounded shadow-lg" />
      
      {/* Zoom Controls - Floating */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-1.5">
        <Button
          size="icon"
          variant="outline"
          onClick={handleZoomIn}
          className="h-8 w-8 md:h-9 md:w-9 bg-elec-card/90 backdrop-blur border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          title="Zoom In"
        >
          <ZoomIn className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleZoomOut}
          className="h-8 w-8 md:h-9 md:w-9 bg-elec-card/90 backdrop-blur border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          title="Zoom Out"
        >
          <ZoomOut className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleResetView}
          className="h-8 w-8 md:h-9 md:w-9 bg-elec-card/90 backdrop-blur border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          title="Reset View"
        >
          <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* Zoom Indicator */}
      <div className="absolute top-8 right-8 bg-elec-card border border-elec-yellow/20 rounded px-3 py-1 text-sm text-elec-light">
        {Math.round((fabricCanvasRef.current?.getZoom() || 1) * 100)}%
      </div>
    </div>
  );
};
