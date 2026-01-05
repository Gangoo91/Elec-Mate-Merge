import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignatureCaptureProps {
  onCapture: (signatureData: string) => void;
  onCancel?: () => void;
  className?: string;
  showActions?: boolean;
  height?: number;
  variant?: "light" | "dark";
}

export function SignatureCapture({ 
  onCapture, 
  onCancel, 
  className,
  showActions = true,
  height = 150,
  variant = "light"
}: SignatureCaptureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const isDark = variant === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set actual canvas size for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Auto-capture signature when showActions is false
  const captureSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;
    
    const signatureData = canvas.toDataURL("image/png");
    onCapture(signatureData);
  }, [hasSignature, onCapture]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = isDark ? "#ffffff" : "#1e293b";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    
    // Auto-capture when showActions is false (inline mode)
    if (!showActions && hasSignature) {
      setTimeout(() => {
        captureSignature();
      }, 100);
    }
  };

  // Also capture when hasSignature becomes true in inline mode
  useEffect(() => {
    if (!showActions && hasSignature) {
      captureSignature();
    }
  }, [showActions, hasSignature, captureSignature]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    ctx.beginPath();
    setHasSignature(false);
    
    // Notify parent that signature was cleared
    if (!showActions) {
      onCapture("");
    }
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;
    
    const signatureData = canvas.toDataURL("image/png");
    onCapture(signatureData);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className={cn(
          "text-sm font-medium flex items-center gap-2",
          isDark ? "text-slate-300" : "text-foreground"
        )}>
          <PenTool className={cn("h-4 w-4", isDark ? "text-amber-400" : "text-primary")} />
          Sign Here
        </label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearCanvas}
          className={cn(
            isDark 
              ? "text-slate-400 hover:text-foreground hover:bg-slate-700" 
              : "text-foreground/60 hover:text-foreground"
          )}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          style={{ height: `${height}px` }}
          className={cn(
            "border-2 border-dashed rounded-xl w-full cursor-crosshair touch-none",
            isDark 
              ? "border-slate-600 bg-slate-800/80" 
              : "border-border bg-muted/30"
          )}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onMouseMove={handleMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className={cn(
              "text-sm",
              isDark ? "text-slate-500" : "text-foreground/30"
            )}>
              Draw your signature above
            </span>
          </div>
        )}
      </div>
      
      {showActions && (
        <div className="flex gap-3">
          {onCancel && (
            <Button 
              variant="outline" 
              className="flex-1 h-12"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            className="flex-1 h-12"
            onClick={handleConfirm}
            disabled={!hasSignature}
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm Signature
          </Button>
        </div>
      )}
    </div>
  );
}
