import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Pencil,
  Type,
  Square,
  Circle,
  ArrowRight,
  Minus,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Check,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Tool = "pen" | "line" | "arrow" | "rectangle" | "circle" | "text";

interface DrawAction {
  type: Tool;
  points?: { x: number; y: number }[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  color: string;
  lineWidth: number;
  text?: string;
}

interface PhotoAnnotationEditorProps {
  photoId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (annotations: DrawAction[]) => void;
  existingAnnotations?: DrawAction[];
}

const COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#ffffff", "#000000"];
const LINE_WIDTHS = [2, 4, 8];

export const PhotoAnnotationEditor = ({
  photoId,
  isOpen,
  onClose,
  onSave,
  existingAnnotations = [],
}: PhotoAnnotationEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#ef4444");
  const [lineWidth, setLineWidth] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [actions, setActions] = useState<DrawAction[]>(existingAnnotations);
  const [redoStack, setRedoStack] = useState<DrawAction[]>([]);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [textInput, setTextInput] = useState("");
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null);

  // Redraw canvas when actions change
  useEffect(() => {
    redrawCanvas();
  }, [actions]);

  const getCanvasCoords = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw placeholder background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#334155");
    gradient.addColorStop(1, "#0f172a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw camera icon
    ctx.fillStyle = "#64748b";
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("📷", canvas.width / 2, canvas.height / 2);

    // Redraw all actions
    actions.forEach((action) => drawAction(ctx, action));
  }, [actions]);

  const drawAction = (ctx: CanvasRenderingContext2D, action: DrawAction) => {
    ctx.strokeStyle = action.color;
    ctx.fillStyle = action.color;
    ctx.lineWidth = action.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (action.type) {
      case "pen":
        if (action.points && action.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(action.points[0].x, action.points[0].y);
          action.points.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.stroke();
        }
        break;

      case "line":
        if (action.start && action.end) {
          ctx.beginPath();
          ctx.moveTo(action.start.x, action.start.y);
          ctx.lineTo(action.end.x, action.end.y);
          ctx.stroke();
        }
        break;

      case "arrow":
        if (action.start && action.end) {
          const headLength = 15;
          const dx = action.end.x - action.start.x;
          const dy = action.end.y - action.start.y;
          const angle = Math.atan2(dy, dx);

          ctx.beginPath();
          ctx.moveTo(action.start.x, action.start.y);
          ctx.lineTo(action.end.x, action.end.y);
          ctx.stroke();

          // Arrow head
          ctx.beginPath();
          ctx.moveTo(action.end.x, action.end.y);
          ctx.lineTo(
            action.end.x - headLength * Math.cos(angle - Math.PI / 6),
            action.end.y - headLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(action.end.x, action.end.y);
          ctx.lineTo(
            action.end.x - headLength * Math.cos(angle + Math.PI / 6),
            action.end.y - headLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
        break;

      case "rectangle":
        if (action.start && action.end) {
          ctx.strokeRect(
            action.start.x,
            action.start.y,
            action.end.x - action.start.x,
            action.end.y - action.start.y
          );
        }
        break;

      case "circle":
        if (action.start && action.end) {
          const radiusX = Math.abs(action.end.x - action.start.x) / 2;
          const radiusY = Math.abs(action.end.y - action.start.y) / 2;
          const centerX = action.start.x + (action.end.x - action.start.x) / 2;
          const centerY = action.start.y + (action.end.y - action.start.y) / 2;

          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;

      case "text":
        if (action.start && action.text) {
          ctx.font = `${action.lineWidth * 6}px sans-serif`;
          ctx.fillText(action.text, action.start.x, action.start.y);
        }
        break;
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);

    if (tool === "text") {
      setTextPosition(coords);
      return;
    }

    setIsDrawing(true);
    setStartPoint(coords);
    setCurrentPoints([coords]);
    setRedoStack([]);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (tool === "pen") {
      setCurrentPoints((prev) => [...prev, coords]);

      // Draw live
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      const points = [...currentPoints, coords];
      if (points.length > 1) {
        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    } else {
      // For shapes, redraw everything and show preview
      redrawCanvas();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([5, 5]);
      
      const previewAction: DrawAction = {
        type: tool,
        start: startPoint!,
        end: coords,
        color,
        lineWidth,
      };
      drawAction(ctx, previewAction);
      ctx.setLineDash([]);
    }
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const coords = getCanvasCoords(e);

    let newAction: DrawAction;

    if (tool === "pen") {
      newAction = {
        type: "pen",
        points: currentPoints,
        color,
        lineWidth,
      };
    } else {
      newAction = {
        type: tool,
        start: startPoint!,
        end: coords,
        color,
        lineWidth,
      };
    }

    setActions((prev) => [...prev, newAction]);
    setCurrentPoints([]);
    setStartPoint(null);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim() || !textPosition) return;

    const newAction: DrawAction = {
      type: "text",
      start: textPosition,
      text: textInput,
      color,
      lineWidth,
    };

    setActions((prev) => [...prev, newAction]);
    setTextInput("");
    setTextPosition(null);
  };

  const handleUndo = () => {
    if (actions.length === 0) return;
    const lastAction = actions[actions.length - 1];
    setRedoStack((prev) => [...prev, lastAction]);
    setActions((prev) => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const lastRedo = redoStack[redoStack.length - 1];
    setActions((prev) => [...prev, lastRedo]);
    setRedoStack((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setActions([]);
    setRedoStack([]);
  };

  const handleSave = () => {
    onSave(actions);
    onClose();
  };

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: "pen", icon: <Pencil className="h-4 w-4" />, label: "Pen" },
    { id: "line", icon: <Minus className="h-4 w-4" />, label: "Line" },
    { id: "arrow", icon: <ArrowRight className="h-4 w-4" />, label: "Arrow" },
    { id: "rectangle", icon: <Square className="h-4 w-4" />, label: "Rectangle" },
    { id: "circle", icon: <Circle className="h-4 w-4" />, label: "Circle" },
    { id: "text", icon: <Type className="h-4 w-4" />, label: "Text" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-border/50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h3 className="font-medium text-foreground">Annotate Photo</h3>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-foreground/70 hover:text-foreground"
              onClick={handleClear}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              size="sm"
              variant="default"
              onClick={handleSave}
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-foreground/70 hover:text-foreground"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 p-4 border-b border-border/50 bg-black/50">
          {/* Tools */}
          <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  tool === t.id
                    ? "bg-elec-yellow text-elec-dark"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                )}
                title={t.label}
              >
                {t.icon}
              </button>
            ))}
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "w-6 h-6 rounded-full transition-all",
                  color === c && "ring-2 ring-white ring-offset-2 ring-offset-black"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Line width */}
          <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
            {LINE_WIDTHS.map((w) => (
              <button
                key={w}
                onClick={() => setLineWidth(w)}
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                  lineWidth === w
                    ? "bg-elec-yellow text-elec-dark"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: w * 2, height: w * 2 }}
                />
              </button>
            ))}
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1 ml-auto">
            <Button
              size="icon"
              variant="ghost"
              className="text-foreground/70 hover:text-foreground"
              onClick={handleUndo}
              disabled={actions.length === 0}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-foreground/70 hover:text-foreground"
              onClick={handleRedo}
              disabled={redoStack.length === 0}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-contain cursor-crosshair touch-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />

          {/* Text input overlay */}
          {textPosition && (
            <div
              className="absolute z-10"
              style={{
                left: `${(textPosition.x / 800) * 100}%`,
                top: `${(textPosition.y / 600) * 100}%`,
              }}
            >
              <div className="flex gap-2">
                <Input
                  autoFocus
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                  placeholder="Enter text..."
                  className="w-48"
                />
                <Button size="sm" onClick={handleTextSubmit}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setTextPosition(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="p-3 text-center text-xs text-foreground/50 border-t border-border/50">
          {tool === "text"
            ? "Click on the image to add text"
            : "Click and drag to draw. Use touch gestures on mobile."}
        </div>
      </DialogContent>
    </Dialog>
  );
};
