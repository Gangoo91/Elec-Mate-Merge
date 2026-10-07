import { useCallback, useEffect, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ArrowUpRight, Circle, Loader2, Pencil, Square, Undo2, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/* ==========================================================================
   Mark up a photo (ELE-1970). Draw on a copy of the photo with a pen, an
   arrow, a box or a ring, then save it. The original is never changed: the
   caller stores the marked-up copy as a new job photo, ready to share with
   the client or attach to a certificate.

   The image is fetched as a blob first so the canvas is never "tainted" by a
   cross-origin source and can always be exported.
   ========================================================================== */

type Tool = 'pen' | 'arrow' | 'box' | 'ring';
interface Pt {
  x: number;
  y: number;
}
interface Mark {
  tool: Tool;
  colour: string;
  width: number;
  points: Pt[];
}

const COLOURS = ['#ef4444', '#facc15', '#ffffff', '#3b82f6'];
const TOOLS: { id: Tool; label: string; icon: typeof Pencil }[] = [
  { id: 'pen', label: 'Pen', icon: Pencil },
  { id: 'arrow', label: 'Arrow', icon: ArrowUpRight },
  { id: 'box', label: 'Box', icon: Square },
  { id: 'ring', label: 'Ring', icon: Circle },
];

function drawMark(ctx: CanvasRenderingContext2D, m: Mark) {
  const pts = m.points;
  if (!pts.length) return;
  ctx.strokeStyle = m.colour;
  ctx.fillStyle = m.colour;
  ctx.lineWidth = m.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const a = pts[0];
  const b = pts[pts.length - 1];
  ctx.beginPath();
  if (m.tool === 'pen') {
    ctx.moveTo(a.x, a.y);
    pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  } else if (m.tool === 'box') {
    ctx.strokeRect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y));
  } else if (m.tool === 'ring') {
    ctx.ellipse((a.x + b.x) / 2, (a.y + b.y) / 2, Math.abs(b.x - a.x) / 2 || 1, Math.abs(b.y - a.y) / 2 || 1, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    const head = m.width * 4;
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x - head * Math.cos(ang - Math.PI / 6), b.y - head * Math.sin(ang - Math.PI / 6));
    ctx.lineTo(b.x - head * Math.cos(ang + Math.PI / 6), b.y - head * Math.sin(ang + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
}

export function PhotoAnnotationEditor({
  open,
  imageUrl,
  title,
  saving,
  onClose,
  onSave,
}: {
  open: boolean;
  imageUrl: string | null;
  title?: string | null;
  saving?: boolean;
  onClose: () => void;
  /** Receives the marked-up copy as a JPEG. */
  onSave: (blob: Blob) => void | Promise<void>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('arrow');
  const [colour, setColour] = useState(COLOURS[0]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const drawing = useRef<Mark | null>(null);

  const redraw = useCallback(() => {
    const c = canvasRef.current;
    const img = imgRef.current;
    if (!c || !img) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    marks.forEach((m) => drawMark(ctx, m));
    if (drawing.current) drawMark(ctx, drawing.current);
  }, [marks]);

  // Load the photo as a blob (no cross-origin taint), size the canvas to it.
  useEffect(() => {
    if (!open || !imageUrl) return;
    let cancelled = false;
    let objectUrl: string | null = null;
    setReady(false);
    setLoadError(null);
    setMarks([]);
    (async () => {
      try {
        const res = await fetch(imageUrl);
        if (!res.ok) throw new Error('fetch');
        objectUrl = URL.createObjectURL(await res.blob());
        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          const max = 2000;
          const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
          const c = canvasRef.current;
          if (c) {
            c.width = Math.round(img.naturalWidth * scale);
            c.height = Math.round(img.naturalHeight * scale);
          }
          imgRef.current = img;
          setReady(true);
        };
        img.onerror = () => !cancelled && setLoadError('This photo could not be opened for marking up.');
        img.src = objectUrl;
      } catch {
        if (!cancelled) setLoadError('This photo could not be opened for marking up.');
      }
    })();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [open, imageUrl]);

  useEffect(() => {
    if (ready) redraw();
  }, [ready, redraw]);

  const toCanvas = (e: React.PointerEvent<HTMLCanvasElement>): Pt => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };
  const lineWidth = () => Math.max(4, Math.round((canvasRef.current?.width ?? 1000) / 160));

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!ready) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = { tool, colour, width: lineWidth(), points: [toCanvas(e)] };
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = drawing.current;
    if (!d) return;
    const p = toCanvas(e);
    d.points = d.tool === 'pen' ? [...d.points, p] : [d.points[0], p];
    redraw();
  };
  const onUp = () => {
    const d = drawing.current;
    drawing.current = null;
    if (d && d.points.length > 1) setMarks((m) => [...m, d]);
    else redraw();
  };

  const save = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((blob) => blob && onSave(blob), 'image/jpeg', 0.9);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-black" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[111] flex flex-col bg-black text-white outline-none"
          aria-describedby={undefined}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-3 px-4 pb-2"
            style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
          >
            <DialogPrimitive.Title className="min-w-0 truncate text-[15px] font-semibold text-white">
              Mark up{title ? `: ${title}` : ' the photo'}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.1] touch-manipulation"
              aria-label="Close without saving"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center p-2">
            {loadError ? (
              <p className="px-6 text-center text-[14px] text-white">{loadError}</p>
            ) : (
              <>
                {!ready && <Loader2 className="absolute h-6 w-6 animate-spin text-white" />}
                <canvas
                  ref={canvasRef}
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                  className={cn('max-h-full max-w-full touch-none', !ready && 'invisible')}
                  aria-label="Photo to draw on"
                />
              </>
            )}
          </div>

          <div
            className="shrink-0 space-y-3 border-t border-white/[0.1] px-4 pt-3"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
              {TOOLS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTool(t.id)}
                  aria-pressed={tool === t.id}
                  className={cn(
                    'flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] touch-manipulation',
                    tool === t.id ? 'border-elec-yellow bg-elec-yellow font-semibold text-black' : 'border-white/[0.15] bg-white/[0.06] text-white'
                  )}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
              <span className="mx-1 h-6 w-px shrink-0 bg-white/20" aria-hidden />
              {COLOURS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColour(c)}
                  aria-label={`Colour ${c}`}
                  aria-pressed={colour === c}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full touch-manipulation"
                >
                  <span
                    className={cn('h-7 w-7 rounded-full border-2', colour === c ? 'border-white' : 'border-white/30')}
                    style={{ background: c }}
                  />
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMarks((m) => m.slice(0, -1))}
                disabled={!marks.length}
                className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/[0.15] bg-white/[0.06] text-[14px] text-white disabled:opacity-40 touch-manipulation"
              >
                <Undo2 className="h-4 w-4" />
                Undo
              </button>
              <button
                type="button"
                onClick={save}
                disabled={!ready || !marks.length || saving}
                className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-elec-yellow text-[14px] font-semibold text-black disabled:opacity-40 touch-manipulation"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save as a new photo
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

export default PhotoAnnotationEditor;
