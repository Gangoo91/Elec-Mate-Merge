/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * DesignVisionUpload — Phase 4c standalone vision input component.
 *
 * Drop-in component that lets the user upload a floor plan, BoQ, existing
 * schedule, or site photo and get back structured extraction. Wraps the
 * `extract-design-vision` edge function. Designed to live in the design
 * wizard's first step but works standalone for testing.
 *
 * The extraction is returned via `onExtracted` so the parent can decide
 * what to do with it (pre-fill wizard fields, store in design context,
 * just display, etc.). This component is intentionally dumb about
 * downstream wiring.
 */

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

export type VisionExtractionKind = 'floor-plan' | 'bom' | 'schedule' | 'photo';

export interface VisionExtractionResult {
  kind: VisionExtractionKind;
  extraction: any;
  durationMs: number;
  model: string;
}

interface Props {
  /** Default kind when the picker first renders. Defaults to 'floor-plan'. */
  defaultKind?: VisionExtractionKind;
  /** Hide the kind picker (e.g. when the wizard knows what it wants). */
  fixedKind?: VisionExtractionKind;
  /** Called when extraction succeeds. Parent decides what to do with the result. */
  onExtracted?: (result: VisionExtractionResult) => void;
  className?: string;
}

const KIND_LABELS: Record<VisionExtractionKind, { label: string; hint: string }> = {
  'floor-plan': {
    label: 'Floor plan',
    hint: 'Rooms, accessories, special locations (bathroom / kitchen / pool / agricultural)',
  },
  bom: {
    label: 'BoQ / Materials list',
    hint: 'Bill of materials → itemised line list with categories',
  },
  schedule: {
    label: 'Existing schedule',
    hint: 'Schedule of test results / circuit list → cable + protection + load per circuit',
  },
  photo: {
    label: 'Site photo',
    hint: 'CU / DB / installation photo → findings, defects, compliance flags',
  },
};

export const DesignVisionUpload = ({
  defaultKind = 'floor-plan',
  fixedKind,
  onExtracted,
  className,
}: Props) => {
  const [kind, setKind] = useState<VisionExtractionKind>(fixedKind ?? defaultKind);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // For PDFs: dataURL of page-1 rendered to JPEG, plus page metadata.
  const [pdfPageImage, setPdfPageImage] = useState<{
    dataUrl: string;
    pageNumber: number;
    totalPages: number;
  } | null>(null);
  const [isConvertingPdf, setIsConvertingPdf] = useState(false);
  const [contextHint, setContextHint] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<VisionExtractionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Render page 1 of a PDF to a JPEG dataURL using pdfjs-dist. The vision API
   * accepts images only, so PDFs are converted client-side. Capped at scale
   * 2 (≈ 144 dpi for A4) and JPEG quality 0.85 to keep base64 size sane —
   * floor plans don't need photographic quality.
   */
  const pdfToImage = async (
    f: File
  ): Promise<{ dataUrl: string; totalPages: number }> => {
    const pdfjs = await import('pdfjs-dist');
    // Vite-friendly worker URL — `?url` returns the asset URL as a string.
    // The `as unknown as` cast bypasses TS not knowing about Vite's `?url`
    // suffix on a node_modules path.
    const workerMod = (await import(
      // @ts-expect-error — Vite resolves `?url` at build time.
      'pdfjs-dist/build/pdf.worker.min.mjs?url'
    )) as { default: string };
    pdfjs.GlobalWorkerOptions.workerSrc = workerMod.default;

    const buf = await f.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    // pdfjs-dist v5 takes the canvas directly (the older `canvasContext` API
    // was removed in v4+).
    await page.render({ canvas, viewport }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    return { dataUrl, totalPages: pdf.numPages };
  };

  const handleFileChange = async (f: File | null) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setResult(null);
    setPdfPageImage(null);
    if (!f) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);

    // PDFs: convert page 1 → JPEG client-side so the vision API can accept it.
    if (f.type === 'application/pdf') {
      setIsConvertingPdf(true);
      const loading = toast.loading('Converting PDF page 1…');
      try {
        const { dataUrl, totalPages } = await pdfToImage(f);
        setPdfPageImage({ dataUrl, pageNumber: 1, totalPages });
        toast.success(
          totalPages === 1
            ? 'PDF converted'
            : `Page 1 of ${totalPages} converted (multi-page PDF — only page 1 is read for now)`,
          { id: loading }
        );
      } catch (err: any) {
        toast.error('Could not read this PDF', {
          id: loading,
          description: err?.message ?? 'Try a different file or export the page as an image.',
        });
        setFile(null);
        setPreviewUrl(null);
      } finally {
        setIsConvertingPdf(false);
      }
    }
  };

  const fileToBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(f);
    });

  const handleExtract = async () => {
    if (!file) {
      toast.error('Pick a file first');
      return;
    }
    if (file.type === 'application/pdf' && !pdfPageImage) {
      toast.error('PDF still converting — try again in a moment');
      return;
    }
    setIsExtracting(true);
    const loading = toast.loading('Reading the file…', {
      description: 'Vision extraction usually takes 10–30 seconds.',
    });
    try {
      // For PDFs we send the converted JPEG (page 1). For images we send the
      // file as a data URL.
      const dataUrl = pdfPageImage ? pdfPageImage.dataUrl : await fileToBase64(file);
      const sendMime = pdfPageImage ? 'image/jpeg' : file.type;
      const { data, error } = await supabase.functions.invoke('extract-design-vision', {
        body: {
          kind,
          fileBase64: dataUrl,
          mimeType: sendMime,
          contextHint: contextHint.trim() || undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const r = data as VisionExtractionResult;
      setResult(r);
      toast.success('Extraction complete', {
        id: loading,
        description: `${r.durationMs} ms · ${describeResult(r)}`,
      });
      onExtracted?.(r);
    } catch (err: any) {
      toast.error('Extraction failed', {
        id: loading,
        description: err?.message ?? 'Try again or use a clearer image.',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Kind picker */}
      {!fixedKind && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(KIND_LABELS) as VisionExtractionKind[]).map((k) => {
            const isActive = k === kind;
            return (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setKind(k);
                  setResult(null);
                }}
                className={cn(
                  'rounded-xl border px-3 py-3 text-left touch-manipulation transition-colors min-h-[64px]',
                  isActive
                    ? 'border-elec-yellow/60 bg-elec-yellow/[0.06]'
                    : 'border-white/[0.10] bg-[hsl(0_0%_8%)] hover:bg-white/[0.03]'
                )}
                aria-pressed={isActive}
              >
                <div
                  className={cn(
                    'text-[12px] font-semibold tabular-nums',
                    isActive ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {KIND_LABELS[k].label}
                </div>
                <div className="mt-1 text-[10.5px] leading-tight text-white/80">
                  {KIND_LABELS[k].hint}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* File picker */}
      <div className="bg-[hsl(0_0%_8%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5 space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        {!file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full min-h-[80px] rounded-xl border border-dashed border-white/30 hover:border-elec-yellow/60 active:bg-white/[0.04] text-white transition-colors px-4 py-6 touch-manipulation"
          >
            <div className="text-[13px] font-semibold">Tap to pick an image or PDF</div>
            <div className="mt-1 text-[11px] text-white/80">
              {KIND_LABELS[kind].hint}
            </div>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[12px] text-white truncate">{file.name}</div>
              <button
                type="button"
                onClick={() => handleFileChange(null)}
                className="text-[10.5px] uppercase tracking-[0.14em] text-white/85 hover:text-white border border-white/30 rounded-md px-2.5 py-1 min-h-[28px] touch-manipulation"
              >
                Remove
              </button>
            </div>
            {/* Image preview — straight from the file. */}
            {previewUrl && file.type.startsWith('image/') && (
              <img
                src={previewUrl}
                alt="Upload preview"
                className="max-h-64 w-full object-contain rounded-lg bg-black/40"
              />
            )}
            {/* PDF — show converting state, then the rendered page-1 image. */}
            {file.type === 'application/pdf' && isConvertingPdf && (
              <div className="rounded-lg bg-black/40 border border-white/[0.10] p-4 flex items-center gap-3 text-[12px] text-white">
                <span className="inline-block w-3 h-3 border-2 border-elec-yellow/60 border-t-transparent rounded-full animate-spin" />
                Converting page 1…
              </div>
            )}
            {file.type === 'application/pdf' && pdfPageImage && (
              <div className="space-y-2">
                <img
                  src={pdfPageImage.dataUrl}
                  alt="Converted PDF page 1"
                  className="max-h-64 w-full object-contain rounded-lg bg-black/40"
                />
                <div className="text-[10.5px] tabular-nums text-white/80">
                  Converted from PDF · page {pdfPageImage.pageNumber} of{' '}
                  {pdfPageImage.totalPages}
                  {pdfPageImage.totalPages > 1 &&
                    ' · only page 1 is read for this extraction'}
                </div>
              </div>
            )}
          </div>
        )}

        <textarea
          value={contextHint}
          onChange={(e) => setContextHint(e.target.value)}
          placeholder="Optional: any context that'll help (e.g. '1980s 3-bed semi, single-storey extension at the rear')"
          className="w-full min-h-[60px] bg-black/40 border border-white/[0.15] rounded-lg px-3 py-2 text-[12.5px] text-white placeholder:text-white/60 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
          maxLength={500}
        />

        <button
          type="button"
          onClick={handleExtract}
          disabled={!file || isExtracting || isConvertingPdf}
          className={cn(
            'w-full min-h-[44px] rounded-xl text-[13px] font-semibold uppercase tracking-[0.14em] tabular-nums transition-colors touch-manipulation',
            !file || isExtracting || isConvertingPdf
              ? 'bg-white/[0.04] text-white/40 cursor-not-allowed'
              : 'bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/85'
          )}
        >
          {isExtracting ? 'Reading…' : isConvertingPdf ? 'Converting PDF…' : 'Extract'}
        </button>
      </div>

      {/* Result */}
      {result && <ExtractionResultPanel result={result} />}
    </div>
  );
};

function describeResult(r: VisionExtractionResult): string {
  const e = r.extraction ?? {};
  switch (r.kind) {
    case 'floor-plan': {
      const rooms = Array.isArray(e.rooms) ? e.rooms.length : 0;
      const accs = Array.isArray(e.rooms)
        ? e.rooms.reduce(
            (n: number, room: any) =>
              n + (Array.isArray(room.accessories) ? room.accessories.length : 0),
            0
          )
        : 0;
      return `${rooms} room${rooms === 1 ? '' : 's'} · ${accs} accessory line${accs === 1 ? '' : 's'}`;
    }
    case 'bom': {
      const items = Array.isArray(e.items) ? e.items.length : 0;
      return `${items} item${items === 1 ? '' : 's'}`;
    }
    case 'schedule': {
      const ckts = Array.isArray(e.circuits) ? e.circuits.length : 0;
      return `${ckts} circuit${ckts === 1 ? '' : 's'}`;
    }
    case 'photo': {
      const findings = Array.isArray(e.findings) ? e.findings.length : 0;
      return `${findings} finding${findings === 1 ? '' : 's'}`;
    }
    default:
      return '';
  }
}

const ExtractionResultPanel = ({ result }: { result: VisionExtractionResult }) => {
  return (
    <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          Extraction
        </span>
        <span className="text-[10.5px] tabular-nums text-white/50">
          {result.durationMs} ms · {result.model}
        </span>
      </div>
      {result.kind === 'floor-plan' && <FloorPlanResult e={result.extraction} />}
      {result.kind === 'bom' && <BomResult e={result.extraction} />}
      {result.kind === 'schedule' && <ScheduleResult e={result.extraction} />}
      {result.kind === 'photo' && <PhotoResult e={result.extraction} />}
      <details className="group">
        <summary className="cursor-pointer text-[10.5px] uppercase tracking-[0.14em] text-white/50 hover:text-white/80 select-none touch-manipulation">
          Raw JSON
        </summary>
        <pre className="mt-2 text-[10.5px] tabular-nums text-white/70 bg-black/40 rounded-lg p-3 overflow-auto max-h-64">
          {JSON.stringify(result.extraction, null, 2)}
        </pre>
      </details>
    </div>
  );
};

const FloorPlanResult = ({ e }: { e: any }) => {
  const rooms = Array.isArray(e?.rooms) ? e.rooms : [];
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline gap-3 flex-wrap text-[11px] tabular-nums text-white/60">
        {e?.buildingType && <span>{e.buildingType}</span>}
        {e?.floors != null && (
          <span>· {e.floors} storey{e.floors === 1 ? '' : 's'}</span>
        )}
        {e?.totalAreaM2 != null && <span>· {Number(e.totalAreaM2).toFixed(1)} m²</span>}
        <span>· {rooms.length} room{rooms.length === 1 ? '' : 's'}</span>
      </div>
      {e?.cuPosition?.roomName && (
        <div className="text-[11px] tabular-nums text-elec-yellow/85 border border-elec-yellow/20 bg-elec-yellow/[0.04] rounded-md px-2.5 py-1.5">
          <span className="font-semibold uppercase tracking-[0.14em] text-[10px] text-elec-yellow/70">
            CU position
          </span>{' '}
          {e.cuPosition.roomName}
          {e.cuPosition.inferred && (
            <span className="text-white/55"> · inferred (not on plan)</span>
          )}
          {e.cuPosition.note && <span className="text-white/55"> · {e.cuPosition.note}</span>}
        </div>
      )}
      <div className="space-y-1.5">
        {rooms.map((r: any, i: number) => (
          <div
            key={i}
            className="flex items-baseline justify-between gap-3 py-1.5 border-b border-white/[0.06] last:border-b-0"
          >
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[12.5px] font-semibold text-white truncate">{r.name}</span>
                {r.cableRunEstimateM != null && (
                  <span className="text-[10px] tabular-nums text-elec-yellow/80 shrink-0">
                    ~{Number(r.cableRunEstimateM).toFixed(0)} m
                  </span>
                )}
              </div>
              <div className="text-[10.5px] text-white/55 tabular-nums">
                {r.areaM2 != null && <span>{Number(r.areaM2).toFixed(1)} m² · </span>}
                {r.floor != null && <span>F{r.floor} · </span>}
                {r.specialLocation && r.specialLocation !== 'none' && (
                  <span className="text-amber-400">{r.specialLocation} · </span>
                )}
                {Array.isArray(r.accessories) &&
                  r.accessories
                    .map((a: any) => `${a.count}× ${a.kind}`)
                    .join(' · ')}
              </div>
            </div>
          </div>
        ))}
      </div>
      {e?.notes && (
        <p className="text-[11px] leading-relaxed text-white/55 pt-1">{e.notes}</p>
      )}
    </div>
  );
};

const BomResult = ({ e }: { e: any }) => {
  const items = Array.isArray(e?.items) ? e.items : [];
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] tabular-nums text-white/60">{items.length} line items</div>
      {items.map((it: any, i: number) => (
        <div
          key={i}
          className="flex items-baseline justify-between gap-3 py-1 border-b border-white/[0.06] last:border-b-0"
        >
          <div className="text-[12px] text-white truncate flex-1">{it.description}</div>
          <div className="text-[11px] tabular-nums text-white/65 shrink-0">
            {it.quantity} {it.unit}
          </div>
        </div>
      ))}
    </div>
  );
};

const ScheduleResult = ({ e }: { e: any }) => {
  const circuits = Array.isArray(e?.circuits) ? e.circuits : [];
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-3 flex-wrap text-[11px] tabular-nums text-white/60">
        {e?.boardReference && <span>{e.boardReference}</span>}
        {e?.mainSwitchRating && <span>· {e.mainSwitchRating}A main</span>}
        <span>· {circuits.length} circuit{circuits.length === 1 ? '' : 's'}</span>
      </div>
      {circuits.map((c: any, i: number) => (
        <div
          key={i}
          className="flex items-baseline justify-between gap-3 py-1 border-b border-white/[0.06] last:border-b-0"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-semibold text-white truncate">{c.name}</div>
            <div className="text-[10.5px] text-white/55 tabular-nums">
              {c.cableSize && `${c.cableSize}mm² ${c.cableType ?? ''}`}
              {c.protectionRating && ` · ${c.protectionRating}A ${c.protectionType ?? 'MCB'}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PhotoResult = ({ e }: { e: any }) => {
  const findings = Array.isArray(e?.findings) ? e.findings : [];
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-3 flex-wrap text-[11px] tabular-nums text-white/60">
        {e?.equipmentType && <span>{e.equipmentType}</span>}
        {e?.brand && <span>· {e.brand}</span>}
        {e?.estimatedAge && <span>· {e.estimatedAge}</span>}
      </div>
      {findings.map((f: any, i: number) => (
        <div
          key={i}
          className="space-y-0.5 pb-2 border-b border-white/[0.06] last:border-b-0"
        >
          <div className="flex items-baseline justify-between gap-2">
            <span
              className={cn(
                'text-[10px] uppercase tracking-[0.16em] font-semibold',
                f.kind === 'defect' || f.kind === 'compliance-concern'
                  ? 'text-amber-400'
                  : f.kind === 'positive'
                    ? 'text-emerald-400'
                    : 'text-white/65'
              )}
            >
              {f.kind}
            </span>
            {f.reg && (
              <span className="text-[10px] tabular-nums text-white/50 border border-white/15 rounded px-1.5 py-0.5">
                BS 7671 {f.reg}
              </span>
            )}
          </div>
          <p className="text-[12px] text-white/85 leading-snug">{f.detail}</p>
        </div>
      ))}
    </div>
  );
};
