import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Pen } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange: (signature: string) => void;
  className?: string;
}

export interface SignaturePadRef {
  clear: () => void;
  getSignature: () => string;
}

const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  ({ onSignatureChange, className = "" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDrawing = useRef(false);
    const [hasSignature, setHasSignature] = useState(false);

    useImperativeHandle(ref, () => ({
      clear: clearSignature,
      getSignature: () => canvasRef.current?.toDataURL() || ""
    }));

    useEffect(() => {
      initCanvas();

      // Re-init on resize
      const handleResize = () => {
        // Save current signature
        const currentData = canvasRef.current?.toDataURL();
        initCanvas();
        // Restore if there was a signature
        if (currentData && hasSignature) {
          const img = new Image();
          img.onload = () => {
            const ctx = canvasRef.current?.getContext("2d");
            if (ctx && canvasRef.current) {
              ctx.drawImage(img, 0, 0, canvasRef.current.width / window.devicePixelRatio, canvasRef.current.height / window.devicePixelRatio);
            }
          };
          img.src = currentData;
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const initCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Get container dimensions
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set canvas size with device pixel ratio for sharpness
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      // Set drawing style
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw signature line hint
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, rect.height - 30);
      ctx.lineTo(rect.width - 20, rect.height - 30);
      ctx.stroke();

      // Reset stroke style for signature
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 2.5;
    };

    const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return { x: 0, y: 0 };

      // Use container rect for more accurate positioning
      const rect = container.getBoundingClientRect();

      if ('touches' in e) {
        const touch = e.touches[0];
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      isDrawing.current = true;
      const { x, y } = getCoordinates(e);

      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawing.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { x, y } = getCoordinates(e);

      ctx.lineTo(x, y);
      ctx.stroke();

      // Mark as having signature
      if (!hasSignature) {
        setHasSignature(true);
      }

      // Update signature data
      onSignatureChange(canvas.toDataURL());
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    const clearSignature = () => {
      setHasSignature(false);
      initCanvas();
      onSignatureChange("");
    };

    return (
      <div className={`relative ${className}`}>
        {/* Container with fixed aspect ratio for mobile */}
        <div
          ref={containerRef}
          className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-dashed border-white/30 hover:border-elec-yellow/50 transition-colors"
          style={{ height: '160px' }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Placeholder hint when empty */}
          {!hasSignature && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-400">
                <Pen className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-sm font-medium">Sign here</p>
              </div>
            </div>
          )}
        </div>

        {/* Clear button - positioned outside canvas for easy tapping */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="absolute -top-2 -right-2 h-10 w-10 p-0 rounded-full bg-elec-card border-white/20 hover:bg-red-500/20 hover:border-red-500/50 touch-manipulation shadow-lg"
          onClick={clearSignature}
        >
          <RotateCcw className="h-4 w-4 text-elec-light" />
        </Button>
      </div>
    );
  }
);

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
