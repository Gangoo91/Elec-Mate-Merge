import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Eraser, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SignaturePadProps {
  value?: string; // Base64 image data
  onChange: (signature: string | undefined) => void;
  name?: string;
  error?: string;
  className?: string;
}

export function SignaturePad({
  value,
  onChange,
  name,
  error,
  className,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }

      // Restore signature if exists
      if (value) {
        const img = new Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0, rect.width, rect.height);
          setHasDrawn(true);
        };
        img.src = value;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Get position from event
  const getPosition = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Start drawing
  const startDrawing = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [getPosition]);

  // Continue drawing
  const draw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [isDrawing, getPosition]);

  // Stop drawing
  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      onChange(dataUrl);
    }
  }, [isDrawing, onChange]);

  // Clear signature
  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
    onChange(undefined);
  }, [onChange]);

  return (
    <div className={cn("space-y-3", className)}>
      {name && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">
            {name}
          </label>
          {hasDrawn && (
            <Button
              type="button"
              variant="ghost"
                            onClick={clearSignature}
              className="h-11 px-2 text-white/50 hover:text-white hover:bg-white/10 touch-manipulation"
            >
              <Eraser className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-xl",
          "border-2 border-dashed transition-colors",
          hasDrawn
            ? "border-emerald-500/30 bg-emerald-500/5"
            : error
              ? "border-red-500/30 bg-red-500/5"
              : "border-white/20 bg-white/5",
          "touch-none" // Prevent scrolling while drawing
        )}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-32 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Placeholder */}
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white/30 text-sm">Sign here</p>
          </div>
        )}

        {/* Signed indicator */}
        {hasDrawn && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30"
          >
            <Check className="h-3 w-3 text-emerald-400" />
          </motion.div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

// Attendee signature card
interface AttendeeSignatureProps {
  name: string;
  signed: boolean;
  signature?: string;
  timestamp?: string;
  onSign?: () => void;
  onRemove?: () => void;
}

export function AttendeeSignatureCard({
  name,
  signed,
  signature,
  timestamp,
  onSign,
  onRemove,
}: AttendeeSignatureProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border",
        signed
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-white/5 border-white/10"
      )}
    >
      {/* Status icon */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          signed
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-white/10 text-white/40"
        )}
      >
        {signed ? (
          <Check className="h-4 w-4" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-current" />
        )}
      </div>

      {/* Name and timestamp */}
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", signed ? "text-white" : "text-white/70")}>
          {name}
        </p>
        {signed && timestamp && (
          <p className="text-xs text-white/40">{timestamp}</p>
        )}
      </div>

      {/* Actions */}
      {!signed && onSign && (
        <Button
                    onClick={onSign}
          className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
        >
          Sign
        </Button>
      )}
      {onRemove && (
        <Button
          variant="ghost"
                    onClick={onRemove}
          className="h-11 w-11 p-0 text-white/40 hover:text-red-400 hover:bg-red-500/10 touch-manipulation"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </motion.div>
  );
}
