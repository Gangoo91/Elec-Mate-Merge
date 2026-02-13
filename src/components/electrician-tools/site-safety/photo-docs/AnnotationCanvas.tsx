import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Check,
  Undo2,
  Redo2,
  Pen,
  Circle,
  Square,
  ArrowUpRight,
  Type,
  Eraser,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { SafetyPhoto } from '@/hooks/useSafetyPhotos';
import { toast } from '@/hooks/use-toast';

interface AnnotationCanvasProps {
  photo: SafetyPhoto;
  onSave: (annotatedDataUrl: string) => void;
  onClose: () => void;
}

type Tool = 'pen' | 'arrow' | 'circle' | 'rectangle' | 'text' | 'eraser';

interface DrawAction {
  tool: Tool;
  color: string;
  lineWidth: number;
  points?: { x: number; y: number }[];
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  text?: string;
}

const COLORS = [
  { value: '#ef4444', label: 'Red' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#22c55e', label: 'Green' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#ffffff', label: 'White' },
  { value: '#000000', label: 'Black' },
];

const LINE_WIDTHS = [2, 4, 6, 8];

export default function AnnotationCanvas({ photo, onSave, onClose }: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [activeColor, setActiveColor] = useState('#ef4444');
  const [lineWidth, setLineWidth] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [actions, setActions] = useState<DrawAction[]>([]);
  const [redoStack, setRedoStack] = useState<DrawAction[]>([]);
  const [currentAction, setCurrentAction] = useState<DrawAction | null>(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [textValue, setTextValue] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasDimensions = useRef({ width: 0, height: 0, scale: 1 });

  // Load image and set up canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setupCanvas(img);
      setImageLoaded(true);
    };
    img.src = photo.file_url;
  }, [photo.file_url]);

  const setupCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Fit image to container
    const scaleX = containerRect.width / img.width;
    const scaleY = containerRect.height / img.height;
    const scale = Math.min(scaleX, scaleY);

    const displayWidth = img.width * scale;
    const displayHeight = img.height * scale;

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvasDimensions.current = { width: displayWidth, height: displayHeight, scale: dpr };

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      redrawCanvas(ctx, img, []);
    }
  }, []);

  const redrawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, img: HTMLImageElement, actionList: DrawAction[]) => {
      const { width, height } = canvasDimensions.current;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Replay all actions
      actionList.forEach((action) => drawAction(ctx, action));
    },
    []
  );

  const drawAction = (ctx: CanvasRenderingContext2D, action: DrawAction) => {
    ctx.strokeStyle = action.color;
    ctx.fillStyle = action.color;
    ctx.lineWidth = action.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (action.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = action.lineWidth * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    switch (action.tool) {
      case 'pen':
      case 'eraser':
        if (action.points && action.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(action.points[0].x, action.points[0].y);
          for (let i = 1; i < action.points.length; i++) {
            ctx.lineTo(action.points[i].x, action.points[i].y);
          }
          ctx.stroke();
        }
        break;

      case 'arrow':
        if (
          action.startX !== undefined &&
          action.startY !== undefined &&
          action.endX !== undefined &&
          action.endY !== undefined
        ) {
          drawArrow(ctx, action.startX, action.startY, action.endX, action.endY, action.lineWidth);
        }
        break;

      case 'circle':
        if (
          action.startX !== undefined &&
          action.startY !== undefined &&
          action.endX !== undefined &&
          action.endY !== undefined
        ) {
          const rx = Math.abs(action.endX - action.startX) / 2;
          const ry = Math.abs(action.endY - action.startY) / 2;
          const cx = (action.startX + action.endX) / 2;
          const cy = (action.startY + action.endY) / 2;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;

      case 'rectangle':
        if (
          action.startX !== undefined &&
          action.startY !== undefined &&
          action.endX !== undefined &&
          action.endY !== undefined
        ) {
          ctx.beginPath();
          ctx.strokeRect(
            action.startX,
            action.startY,
            action.endX - action.startX,
            action.endY - action.startY
          );
        }
        break;

      case 'text':
        if (action.text && action.startX !== undefined && action.startY !== undefined) {
          ctx.globalCompositeOperation = 'source-over';
          const fontSize = Math.max(14, action.lineWidth * 4);
          ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;

          // Text background
          const metrics = ctx.measureText(action.text);
          const padding = 4;
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(
            action.startX - padding,
            action.startY - fontSize - padding,
            metrics.width + padding * 2,
            fontSize + padding * 2
          );

          ctx.fillStyle = action.color;
          ctx.fillText(action.text, action.startX, action.startY);
        }
        break;
    }

    ctx.globalCompositeOperation = 'source-over';
  };

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number
  ) => {
    const headLen = Math.max(15, width * 4);
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLen * Math.cos(angle - Math.PI / 6),
      y2 - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLen * Math.cos(angle + Math.PI / 6),
      y2 - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  const getCanvasCoords = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX =
      'touches' in e ? e.touches[0]?.clientX || e.changedTouches[0]?.clientX : e.clientX;
    const clientY =
      'touches' in e ? e.touches[0]?.clientY || e.changedTouches[0]?.clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const handleStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      const coords = getCanvasCoords(e);

      if (activeTool === 'text') {
        setTextPosition(coords);
        setShowTextInput(true);
        return;
      }

      setIsDrawing(true);
      const action: DrawAction = {
        tool: activeTool,
        color: activeColor,
        lineWidth,
        points: activeTool === 'pen' || activeTool === 'eraser' ? [coords] : undefined,
        startX: coords.x,
        startY: coords.y,
        endX: coords.x,
        endY: coords.y,
      };
      setCurrentAction(action);
    },
    [activeTool, activeColor, lineWidth, getCanvasCoords]
  );

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDrawing || !currentAction) return;
      e.preventDefault();

      const coords = getCanvasCoords(e);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = imageRef.current;
      if (!ctx || !img) return;

      const updatedAction = { ...currentAction };

      if (activeTool === 'pen' || activeTool === 'eraser') {
        updatedAction.points = [...(updatedAction.points || []), coords];
      } else {
        updatedAction.endX = coords.x;
        updatedAction.endY = coords.y;
      }

      setCurrentAction(updatedAction);

      // Redraw everything
      redrawCanvas(ctx, img, actions);
      drawAction(ctx, updatedAction);
    },
    [isDrawing, currentAction, activeTool, actions, getCanvasCoords, redrawCanvas]
  );

  const handleEnd = useCallback(() => {
    if (!isDrawing || !currentAction) return;
    setIsDrawing(false);
    setActions((prev) => [...prev, currentAction]);
    setRedoStack([]);
    setCurrentAction(null);
  }, [isDrawing, currentAction]);

  const handleTextSubmit = useCallback(() => {
    if (!textValue.trim()) {
      setShowTextInput(false);
      return;
    }

    const action: DrawAction = {
      tool: 'text',
      color: activeColor,
      lineWidth,
      startX: textPosition.x,
      startY: textPosition.y,
      text: textValue.trim(),
    };

    setActions((prev) => [...prev, action]);
    setRedoStack([]);
    setShowTextInput(false);
    setTextValue('');

    // Redraw
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    if (ctx && img) {
      redrawCanvas(ctx, img, [...actions, action]);
    }
  }, [textValue, activeColor, lineWidth, textPosition, actions, redrawCanvas]);

  const handleUndo = useCallback(() => {
    if (actions.length === 0) return;
    const lastAction = actions[actions.length - 1];
    setRedoStack((prev) => [...prev, lastAction]);
    const newActions = actions.slice(0, -1);
    setActions(newActions);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    if (ctx && img) {
      redrawCanvas(ctx, img, newActions);
    }
  }, [actions, redrawCanvas]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const action = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    const newActions = [...actions, action];
    setActions(newActions);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    if (ctx && img) {
      redrawCanvas(ctx, img, newActions);
    }
  }, [redoStack, actions, redrawCanvas]);

  const handleClear = useCallback(() => {
    setActions([]);
    setRedoStack([]);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    if (ctx && img) {
      redrawCanvas(ctx, img, []);
    }
  }, [redrawCanvas]);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a high-res export canvas at original image dimensions
    const img = imageRef.current;
    if (!img) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = img.width;
    exportCanvas.height = img.height;
    const exportCtx = exportCanvas.getContext('2d');
    if (!exportCtx) return;

    // Draw original image
    exportCtx.drawImage(img, 0, 0);

    // Scale factor from display to original
    const { width: displayW, height: displayH } = canvasDimensions.current;
    const scaleX = img.width / displayW;
    const scaleY = img.height / displayH;

    // Replay all actions at original resolution
    actions.forEach((action) => {
      const scaledAction: DrawAction = {
        ...action,
        lineWidth: action.lineWidth * scaleX,
        points: action.points?.map((p) => ({ x: p.x * scaleX, y: p.y * scaleY })),
        startX: action.startX !== undefined ? action.startX * scaleX : undefined,
        startY: action.startY !== undefined ? action.startY * scaleY : undefined,
        endX: action.endX !== undefined ? action.endX * scaleX : undefined,
        endY: action.endY !== undefined ? action.endY * scaleY : undefined,
      };
      drawAction(exportCtx, scaledAction);
    });

    const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.9);
    onSave(dataUrl);
    toast({ title: 'Annotation saved', description: 'Photo has been annotated' });
  }, [actions, onSave]);

  const tools: { id: Tool; icon: typeof Pen; label: string }[] = [
    { id: 'pen', icon: Pen, label: 'Draw' },
    { id: 'arrow', icon: ArrowUpRight, label: 'Arrow' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'rectangle', icon: Square, label: 'Box' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'eraser', icon: Eraser, label: 'Erase' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-black/95 backdrop-blur-sm border-b border-white/10 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between px-2 py-2">
          <button
            onClick={onClose}
            className="px-3 py-2 text-sm text-white font-medium touch-manipulation active:opacity-70"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={actions.length === 0}
              className="p-2 rounded-lg active:bg-white/10 touch-manipulation disabled:opacity-30"
            >
              <Undo2 className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-2 rounded-lg active:bg-white/10 touch-manipulation disabled:opacity-30"
            >
              <Redo2 className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={handleClear}
              disabled={actions.length === 0}
              className="p-2 rounded-lg active:bg-white/10 touch-manipulation disabled:opacity-30"
            >
              <RotateCcw className="h-4 w-4 text-white" />
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={actions.length === 0}
            className="px-3 py-2 text-sm text-elec-yellow font-semibold touch-manipulation active:opacity-70 disabled:opacity-30"
          >
            Save
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden bg-black/95"
      >
        {!imageLoaded && <div className="text-sm text-white">Loading image...</div>}
        <canvas
          ref={canvasRef}
          className="touch-none"
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        />

        {/* Text input overlay */}
        {showTextInput && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <div className="bg-[#1e1e1e] rounded-2xl p-4 mx-4 w-full max-w-sm border border-white/10">
              <input
                autoFocus
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder="Enter text annotation..."
                className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-3 text-sm text-white focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 touch-manipulation"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setShowTextInput(false);
                    setTextValue('');
                  }}
                  className="flex-1 h-10 rounded-lg bg-white/10 text-sm text-white font-medium touch-manipulation active:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTextSubmit}
                  disabled={!textValue.trim()}
                  className="flex-1 h-10 rounded-lg bg-elec-yellow text-sm text-black font-semibold touch-manipulation active:bg-yellow-400 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tool bar */}
      <div className="flex-shrink-0 bg-[#0a0a0a] border-t border-white/10">
        {/* Colour picker row */}
        <div className="flex items-center justify-center gap-2 py-2 px-3">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setActiveColor(color.value)}
              className={`w-7 h-7 rounded-full transition-all touch-manipulation ${
                activeColor === color.value
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                  : ''
              }`}
              style={{
                backgroundColor: color.value,
                border: color.value === '#000000' ? '1px solid rgba(255,255,255,0.3)' : undefined,
              }}
            />
          ))}
          <div className="w-px h-5 bg-white/10 mx-1" />
          {/* Line width */}
          {LINE_WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`flex items-center justify-center w-7 h-7 rounded-full touch-manipulation ${
                lineWidth === w ? 'bg-white/20' : 'active:bg-white/10'
              }`}
            >
              <div className="rounded-full bg-white" style={{ width: w + 2, height: w + 2 }} />
            </button>
          ))}
        </div>

        {/* Tool selection row */}
        <div className="flex items-center justify-around px-2 pb-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all touch-manipulation ${
                activeTool === tool.id
                  ? 'bg-elec-yellow/20 text-elec-yellow'
                  : 'text-white active:text-white active:bg-white/5'
              }`}
            >
              <tool.icon className="h-5 w-5" />
              <span className="text-[9px] font-medium">{tool.label}</span>
            </button>
          ))}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </motion.div>
  );
}
