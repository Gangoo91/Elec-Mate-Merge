
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SignatureCanvasProps {
  className?: string;
}

const SignatureCanvas = ({ className }: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">Digital Signature</label>
      <div className="border-2 border-dashed border-border rounded-lg p-2 sm:p-3">
        <canvas
          ref={canvasRef}
          width={320}
          height={120}
          className="w-full max-h-28 sm:max-h-32 bg-white rounded cursor-crosshair"
          style={{ maxWidth: '100%', height: 'auto' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        <div className="flex gap-2 mt-2 justify-center">
          <Button size="sm" variant="outline" onClick={clearSignature} className="text-xs h-7 px-2">
            Clear Signature
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas;
