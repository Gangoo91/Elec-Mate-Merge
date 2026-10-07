import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * ELE-1993 — a big, one-handed signature pad for the public signing page.
 *
 * Two ways to sign: draw with a finger (pointer events, so touch, pen and
 * mouse all work, with `touch-action: none` so the page does not scroll
 * under the finger) or type the name, which is set in a handwriting face.
 * Either way the result is a PNG with dark ink on a transparent background.
 */

export type SignatureMethod = 'drawn' | 'typed';

export interface SignatureCaptureHandle {
  /** PNG of the signature, or null when nothing has been drawn or typed. */
  toBlob: () => Promise<Blob | null>;
  toDataUrl: () => string | null;
  method: SignatureMethod;
  clear: () => void;
}

const INK = '#0f172a';
const SCRIPT_FONT = "'Snell Roundhand', 'Segoe Script', 'Brush Script MT', 'Apple Chancery', cursive";

export const SignatureCapture = forwardRef<
  SignatureCaptureHandle,
  {
    /** Name to set when typing (the signer's name field). */
    typedName: string;
    onChange?: (hasSignature: boolean, method: SignatureMethod) => void;
    disabled?: boolean;
  }
>(function SignatureCapture({ typedName, onChange, disabled }, ref) {
  const [method, setMethod] = useState<SignatureMethod>('drawn');
  const [hasInk, setHasInk] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const inkRef = useRef(false);
  useEffect(() => {
    inkRef.current = hasInk;
  }, [hasInk]);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    const prev = inkRef.current && canvas.width ? canvas.toDataURL('image/png') : null;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.6;
    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = prev;
    }
  }, []);

  useEffect(() => {
    if (method !== 'drawn') return;
    const id = requestAnimationFrame(setup);
    const ro = new ResizeObserver(() => setup());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [method, setup]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drawing.current = true;
    const p = point(e);
    last.current = p;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();
    }
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || disabled) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    const p = point(e);
    if (ctx && last.current) {
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    last.current = p;
    if (!hasInk) {
      setHasInk(true);
      onChange?.(true, 'drawn');
    }
  };

  const onUp = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
    setHasInk(false);
    onChange?.(false, method);
  }, [method, onChange]);

  const typedReady = typedName.trim().length >= 2;

  useEffect(() => {
    if (method === 'typed') onChange?.(typedReady, 'typed');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, typedReady]);

  const renderTyped = (): HTMLCanvasElement | null => {
    if (!typedReady) return null;
    const c = document.createElement('canvas');
    c.width = 1200;
    c.height = 360;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    let size = 150;
    ctx.font = `italic ${size}px ${SCRIPT_FONT}`;
    while (ctx.measureText(typedName.trim()).width > 1100 && size > 40) {
      size -= 6;
      ctx.font = `italic ${size}px ${SCRIPT_FONT}`;
    }
    ctx.fillStyle = INK;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(typedName.trim(), 600, 190);
    return c;
  };

  useImperativeHandle(
    ref,
    () => ({
      method,
      clear,
      toDataUrl: () => {
        if (method === 'typed') return renderTyped()?.toDataURL('image/png') ?? null;
        if (!hasInk || !canvasRef.current) return null;
        return canvasRef.current.toDataURL('image/png');
      },
      toBlob: () =>
        new Promise<Blob | null>((resolve) => {
          const c = method === 'typed' ? renderTyped() : hasInk ? canvasRef.current : null;
          if (!c) return resolve(null);
          c.toBlob((b) => resolve(b), 'image/png');
        }),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [method, hasInk, typedName, clear]
  );

  const tab = (m: SignatureMethod, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={method === m}
      onClick={() => {
        setMethod(m);
        onChange?.(m === 'typed' ? typedReady : hasInk, m);
      }}
      className={cn(
        'h-11 flex-1 rounded-lg text-[15px] font-semibold touch-manipulation transition-colors',
        method === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="How to sign" className="flex gap-1 rounded-xl bg-slate-100 p-1">
        {tab('drawn', 'Draw')}
        {tab('typed', 'Type')}
      </div>

      {method === 'drawn' ? (
        <div>
          <div
            ref={wrapRef}
            className="relative h-[220px] sm:h-[200px] w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white"
          >
            <canvas
              ref={canvasRef}
              data-testid="signature-canvas"
              aria-label="Signature pad. Draw your signature with your finger."
              className="absolute inset-0 h-full w-full rounded-2xl"
              style={{ touchAction: 'none' }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onPointerLeave={onUp}
            />
            {!hasInk ? (
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-[16px] text-slate-500">
                Sign here with your finger
              </p>
            ) : null}
            <div className="pointer-events-none absolute left-6 right-6 bottom-12 border-b border-slate-300" />
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={clear}
              disabled={!hasInk}
              className="h-11 px-4 rounded-lg text-[15px] font-medium text-slate-700 disabled:text-slate-400 touch-manipulation"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-[220px] sm:h-[200px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4">
          {typedReady ? (
            <p
              className="text-center text-[44px] leading-tight text-slate-900 break-words"
              style={{ fontFamily: SCRIPT_FONT, fontStyle: 'italic' }}
            >
              {typedName.trim()}
            </p>
          ) : (
            <p className="text-[16px] text-slate-500">Type your full name above</p>
          )}
        </div>
      )}
    </div>
  );
});

export default SignatureCapture;
