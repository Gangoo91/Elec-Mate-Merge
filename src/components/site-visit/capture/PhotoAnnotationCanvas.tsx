import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PenTool, Undo2, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface PhotoAnnotationCanvasProps {
  photoUrl: string;
  onSave: (annotatedUrl: string) => void;
  open: boolean;
  onClose: () => void;
}

const COLOURS = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'White', hex: '#ffffff' },
];

interface Stroke {
  points: { x: number; y: number }[];
  colour: string;
}

export const PhotoAnnotationCanvas = ({
  photoUrl,
  onSave,
  open,
  onClose,
}: PhotoAnnotationCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColour, setActiveColour] = useState(COLOURS[0].hex);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load the photo
  useEffect(() => {
    if (!open || !photoUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
    img.src = photoUrl;
  }, [open, photoUrl]);

  // Redraw canvas whenever strokes change or image loads
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Draw background image
    const aspectRatio = img.width / img.height;
    const canvasWidth = rect.width;
    const canvasHeight = canvasWidth / aspectRatio;
    ctx.drawImage(img, 0, 0, canvasWidth, Math.min(canvasHeight, rect.height));

    // Draw all strokes
    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = stroke.colour;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }
  }, [strokes, currentStroke, imageLoaded]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    setCurrentStroke({ points: [{ x, y }], colour: activeColour });
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStroke) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    setCurrentStroke((prev) => (prev ? { ...prev, points: [...prev.points, { x, y }] } : null));
  };

  const handleEnd = () => {
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
  };

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onSave(dataUrl);
    onClose();
  }, [onSave, onClose]);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-4 py-3 border-b border-white/[0.06]">
            <SheetTitle className="text-white flex items-center gap-2">
              <PenTool className="h-4 w-4 text-elec-yellow" />
              Annotate Photo
            </SheetTitle>
          </SheetHeader>

          {/* Canvas area */}
          <div className="flex-1 overflow-hidden p-2">
            <canvas
              ref={canvasRef}
              className="w-full h-full rounded-lg cursor-crosshair touch-none bg-black"
              onMouseDown={handleStart}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onMouseMove={handleMove}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
              onTouchMove={handleMove}
            />
          </div>

          {/* Tools bar */}
          <div className="px-4 py-3 border-t border-white/[0.06] space-y-3">
            {/* Colour selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {COLOURS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setActiveColour(c.hex)}
                    className={`w-8 h-8 rounded-full border-2 touch-manipulation ${
                      activeColour === c.hex ? 'border-elec-yellow scale-110' : 'border-white/20'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  disabled={strokes.length === 0}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10 disabled:opacity-30"
                  aria-label="Undo"
                >
                  <Undo2 className="h-4 w-4 text-white" />
                </button>
                <button
                  onClick={handleClear}
                  disabled={strokes.length === 0}
                  className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10 disabled:opacity-30"
                  aria-label="Clear all"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Save button */}
            <Button
              onClick={handleSave}
              className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Check className="h-5 w-5 mr-2" />
              Save Annotation
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
