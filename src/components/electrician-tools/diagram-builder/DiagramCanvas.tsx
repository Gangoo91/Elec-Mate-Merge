import { useRef, useEffect, useState } from "react";
import { CanvasObject } from "@/pages/electrician-tools/ai-tools/DiagramBuilderPage";
import type { DrawingTool } from "@/pages/electrician-tools/ai-tools/DiagramBuilderPage";
import { electricalSymbols } from "./symbols/electricalSymbols";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiagramCanvasProps {
  activeTool: DrawingTool;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const GRID_SIZE = 20;

  const snapToGrid = (value: number) => {
    if (!snapEnabled) return value;
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const getCanvasPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left - pan.x) / zoom;
    const y = (clientY - rect.top - pan.y) / zoom;
    
    return {
      x: snapToGrid(x),
      y: snapToGrid(y),
    };
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!gridEnabled) return;
    
    ctx.save();
    ctx.strokeStyle = "rgba(250, 204, 21, 0.1)";
    ctx.lineWidth = 0.5;

    const startX = Math.floor(-pan.x / zoom / GRID_SIZE) * GRID_SIZE;
    const startY = Math.floor(-pan.y / zoom / GRID_SIZE) * GRID_SIZE;
    const endX = width / zoom;
    const endY = height / zoom;

    for (let x = startX; x < endX; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    for (let y = startY; y < endY; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  const drawObjects = (ctx: CanvasRenderingContext2D) => {
    objects.forEach((obj) => {
      ctx.save();
      
      if (obj.type === "symbol" && obj.symbolId) {
        const symbol = electricalSymbols.find(s => s.id === obj.symbolId);
        if (symbol) {
          ctx.translate(obj.x, obj.y);
          if (obj.rotation) ctx.rotate((obj.rotation * Math.PI) / 180);
          
          ctx.fillStyle = "hsl(var(--elec-yellow))";
          ctx.strokeStyle = "hsl(var(--elec-yellow))";
          ctx.lineWidth = 2;
          
          const path = new Path2D(symbol.svg);
          ctx.fill(path);
          ctx.stroke(path);
        }
      } else if (obj.type === "rectangle" && obj.width && obj.height) {
        ctx.strokeStyle = "hsl(var(--elec-yellow))";
        ctx.lineWidth = 2;
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
      } else if (obj.type === "line" && obj.points && obj.points.length > 1) {
        ctx.strokeStyle = "hsl(var(--elec-yellow))";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(obj.points[0].x, obj.points[0].y);
        obj.points.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.stroke();
      } else if (obj.type === "text" && obj.text) {
        ctx.fillStyle = "hsl(var(--elec-light))";
        ctx.font = "16px sans-serif";
        ctx.fillText(obj.text, obj.x, obj.y);
      }
      
      ctx.restore();
    });
  };

  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    
    drawGrid(ctx, canvas.width, canvas.height);
    drawObjects(ctx);
    
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      render();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    render();
  }, [objects, zoom, pan, gridEnabled]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const point = getCanvasPoint(e.clientX, e.clientY);
    
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setStartPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    if (activeTool === "symbol" && selectedSymbolId) {
      const newObject: CanvasObject = {
        id: `obj-${Date.now()}`,
        type: "symbol",
        x: point.x,
        y: point.y,
        symbolId: selectedSymbolId,
        rotation: 0,
      };
      onObjectsChange([...objects, newObject]);
    } else if (activeTool === "rectangle" || activeTool === "line") {
      setIsDrawing(true);
      setStartPos(point);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
      return;
    }

    if (!isDrawing) return;
    
    const point = getCanvasPoint(e.clientX, e.clientY);
    
    if (activeTool === "rectangle") {
      const tempCanvas = canvasRef.current;
      const ctx = tempCanvas?.getContext("2d");
      if (!ctx) return;
      
      render();
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);
      ctx.strokeStyle = "hsl(var(--elec-yellow) / 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        startPos.x,
        startPos.y,
        point.x - startPos.x,
        point.y - startPos.y
      );
      ctx.restore();
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (!isDrawing) return;
    
    const point = getCanvasPoint(e.clientX, e.clientY);
    
    if (activeTool === "rectangle") {
      const newObject: CanvasObject = {
        id: `obj-${Date.now()}`,
        type: "rectangle",
        x: Math.min(startPos.x, point.x),
        y: Math.min(startPos.y, point.y),
        width: Math.abs(point.x - startPos.x),
        height: Math.abs(point.y - startPos.y),
      };
      onObjectsChange([...objects, newObject]);
    } else if (activeTool === "line") {
      const newObject: CanvasObject = {
        id: `obj-${Date.now()}`,
        type: "line",
        x: startPos.x,
        y: startPos.y,
        points: [startPos, point],
      };
      onObjectsChange([...objects, newObject]);
    }
    
    setIsDrawing(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.1), 5));
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-elec-dark">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className="cursor-crosshair touch-none"
      />
      
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setZoom(prev => Math.min(prev * 1.2, 5))}
          className="bg-elec-card border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setZoom(prev => Math.max(prev * 0.8, 0.1))}
          className="bg-elec-card border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="bg-elec-card border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom Indicator */}
      <div className="absolute top-4 right-4 bg-elec-card border border-elec-yellow/20 rounded px-3 py-1 text-sm text-elec-light">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};
