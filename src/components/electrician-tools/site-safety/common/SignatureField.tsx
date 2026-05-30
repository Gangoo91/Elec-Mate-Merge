/**
 * SignatureField — the canonical on-brand signature pad for Site Safety.
 *
 * Dark surface, elec-yellow ink, responsive (ResizeObserver), DPR-aware.
 * Replaces the per-module inline pads that drifted in style. Use this for
 * every sign-off across the safety modules so signatures look identical.
 *
 * (The older common/SignaturePad is a light Card-styled pad used by the RAMS
 * flow; this dark variant matches the editorial module shell.)
 */

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SignatureFieldProps {
  label: string;
  /** Existing signature data URL, if any. */
  value?: string;
  onChange: (dataUrl: string) => void;
  className?: string;
}

export function SignatureField({ label, value, onChange, className }: SignatureFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(!!value);

  // Resize canvas to match container width for crisp, responsive rendering.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const { width } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = 120 * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = '120px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getCoords = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasContent(true);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
    if (hasContent && canvasRef.current) {
      onChange(canvasRef.current.toDataURL());
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    setHasContent(false);
    onChange('');
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-[11.5px] text-white block">{label}</label>
      <div
        ref={containerRef}
        className="relative border border-white/[0.12] rounded-xl overflow-hidden bg-[hsl(0_0%_9%)]"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[120px] touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {!hasContent && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/40 text-[13px]">Sign here</span>
          </div>
        )}
      </div>
      {hasContent && (
        <button
          type="button"
          onClick={clear}
          className="text-[11.5px] font-medium text-white/60 hover:text-white transition-colors h-9 touch-manipulation"
        >
          Clear signature
        </button>
      )}
    </div>
  );
}

export default SignatureField;
