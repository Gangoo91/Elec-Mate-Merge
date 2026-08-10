/**
 * ComponentIdentifyPage — photograph a component, get it identified.
 *
 * Third of the AI tools onto the shared shell, and the layout deliberately
 * differs from its siblings. Client Explainer and Fault Diagnosis have a big
 * brief and a modest answer, so they run a 2x2 of input panels beside a
 * narrow rail. This one is the opposite: the input is a photo and a couple of
 * chips, and the output is a full datasheet — specs, ratings, BS 7671
 * requirements, replacement notes, similar components. So the ratio is
 * inverted, brief in a 360px column and the result taking the rest of the
 * page. Same grammar, weighted to where the content actually is.
 *
 * ── Fixed here ─────────────────────────────────────────────────────────────
 *
 * THE CAMERA NEVER OPENED. Same defect proven on Fault Diagnosis:
 * `setIsCameraActive(true)` sat inside `if (videoRef.current)`, and the
 * <video> holding that ref only renders once the flag is true. First tap:
 * ref is null, flag never set, no preview — and the MediaStream stays live
 * because nothing ever stops it. Order is now acquire → set state → attach in
 * an effect → stop every track on close and on unmount.
 *
 * "UP TO 4 PHOTOS" WAS NEVER TRUE, TWICE OVER. The file input had no
 * `multiple` attribute, so the picker only ever returned one; and the request
 * sent `images[0]` regardless. Both fixed — `multiple` is set, and every
 * photo goes as `additional_images`, which `visual-analysis` has always
 * accepted.
 *
 * THE CATEGORY WAS SENT AS AN ID. `Category: ${selectedCategory}` put
 * "protection" and "control" in the prompt instead of "Protection devices"
 * and "Control gear"; the info chips went the same way as "specs, bs7671".
 * Labels now.
 *
 * Plus the same three the sibling pages carried: `URL.createObjectURL` called
 * inline in every thumbnail render and never revoked, a progress bar built
 * from `Math.random()`, and a reset that left half the form populated.
 *
 * ⚠️ InstallationVerifyPage and WiringInstructionPage still carry the camera
 * bug.
 */

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { X, Loader2, Camera, Upload, ScanSearch } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { mintFreshSignedUrl } from '@/utils/storageUrls';
import { cn } from '@/lib/utils';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { HubPage, HubMasthead } from '@/components/hub/HubPrimitives';
import ComponentIdentificationResults from '@/components/electrician-tools/ai-tools/ComponentIdentificationResults';

const MAX_PHOTOS = 4;

const CATEGORIES = [
  { id: 'protection', label: 'Protection devices' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'control', label: 'Control gear' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'metering', label: 'Metering' },
  { id: 'unknown', label: "Don't know" },
];

const INFO = [
  { id: 'specs', label: 'Specifications' },
  { id: 'bs7671', label: 'BS 7671 requirements' },
  { id: 'replacement', label: 'Replacement options' },
  { id: 'age', label: 'Age + compliance' },
  { id: 'installation', label: 'Installation notes' },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnalysisResult = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// ───────────────────────────────────────────────────────────────────────────

const Panel = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section
    className={cn(
      '-mx-4 border-y border-elec-yellow/35 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5',
      'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]'
    )}
  >
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">{title}</h2>
      {hint && (
        <span className="shrink-0 text-[11px] font-medium tabular-nums text-white">{hint}</span>
      )}
    </div>
    {children}
  </section>
);

/** Sentence case, not the uppercase `tracking-[0.12em]` these chips were in. */
const Chip = ({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={cn(
      'inline-flex min-h-11 items-center rounded-full border px-3.5 text-[12.5px] font-medium',
      'transition-colors duration-150 touch-manipulation select-none',
      '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
      on
        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
        : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.28]'
    )}
  >
    {children}
  </button>
);

// ───────────────────────────────────────────────────────────────────────────

const ComponentIdentifyPage = () => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const isMobile = useIsMobile();

  useSEO({
    title: 'Component ID',
    description:
      'Photograph any electrical component for its specifications, the BS 7671 regulations that apply, age and replacement options.',
    noindex: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [info, setInfo] = useState<string[]>(['specs', 'bs7671']);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // One URL per file, revoked when the list changes or the page unmounts.
  const previews = useMemo(() => images.map((f) => URL.createObjectURL(f)), [images]);
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  // ── Camera ───────────────────────────────────────────────────────────────
  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setStream(media);
      setIsCameraActive(true);
    } catch {
      toast({
        title: 'No camera access',
        description: 'Allow camera access, or upload a photo instead.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  // The only place tracks stop: when the stream we hold is replaced or
  // dropped, and on unmount.
  useEffect(() => {
    if (!stream) return;
    return () => stream.getTracks().forEach((t) => t.stop());
  }, [stream]);

  const stopCamera = useCallback(() => {
    setStream(null);
    setIsCameraActive(false);
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        haptic.success();
        setImages((prev) =>
          [
            ...prev,
            new File([blob], `component-${prev.length + 1}.jpg`, { type: 'image/jpeg' }),
          ].slice(0, MAX_PHOTOS)
        );
        stopCamera();
      },
      'image/jpeg',
      0.9
    );
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    setImages((prev) =>
      [...prev, ...Array.from(files).filter((f) => f.type.startsWith('image/'))].slice(0, MAX_PHOTOS)
    );
  };

  // ── Analysis ─────────────────────────────────────────────────────────────
  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label;
  const infoLabels = info
    .map((id) => INFO.find((i) => i.id === id)?.label)
    .filter(Boolean) as string[];

  const handleAnalyse = async () => {
    if (images.length === 0) {
      toast({
        title: 'Take a photo first',
        description: 'Use the camera, or upload one you already have.',
        variant: 'destructive',
      });
      return;
    }

    haptic.medium();
    setIsAnalysing(true);
    if (isMobile) setSheetOpen(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const stamp = Date.now();

      const urls: string[] = [];
      for (const [index, file] of images.entries()) {
        const path = `${user?.id}/visual-analysis/component-${stamp}-${index}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(path, file);
        if (uploadError) throw uploadError;

        // Fresh signed URL (1h) — visual-analysis fetches it server-side.
        const signed = await mintFreshSignedUrl('visual-uploads', path);
        if (!signed) throw new Error('Could not prepare the uploaded image for analysis');
        urls.push(signed);
      }

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: urls[0],
          // Every photo, not just the first.
          additional_images: urls.slice(1),
          analysis_settings: {
            mode: 'component_identify',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            // Labels, not ids. The prompt used to receive "protection" and
            // "specs, bs7671".
            focus_areas: [
              `Category: ${categoryLabel ?? 'not stated'}`,
              infoLabels.length ? `Tell me about: ${infoLabels.join(', ')}` : '',
            ].filter(Boolean),
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false,
          },
        },
      });

      if (error) throw error;

      if (!data?.analysis?.component) {
        toast({
          title: 'Not identified',
          description: 'Try a closer photo, square to the label, with even light.',
          variant: 'destructive',
        });
        return;
      }

      setResult(data.analysis);
      haptic.success();
      toast({
        title: 'Component identified',
        description: data.analysis.component.name ?? 'See the detail.',
        variant: 'success',
      });
    } catch (err) {
      console.error('Component identification failed:', err);
      toast({
        title: 'Identification failed',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalysing(false);
    }
  };

  /** Everything. The old reset left the info chips as they were. */
  const reset = () => {
    haptic.light();
    setResult(null);
    setImages([]);
    setCategory(null);
    setInfo(['specs', 'bs7671']);
    setSheetOpen(false);
  };

  const canAnalyse = images.length > 0 && !isAnalysing;

  // ── The result panel ─────────────────────────────────────────────────────
  const panel = (
    <div
      className={cn(
        'flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-elec-yellow/35',
        'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]'
      )}
    >
      <div className="shrink-0 border-b border-white/[0.10] px-5 py-4">
        {/* Static. The results component leads with the component name in a
            32px hero directly beneath this, and echoing it here printed the
            same long string twice in the space of two lines. */}
        <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">
          The component
        </h2>
      </div>

      {result ? (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
            <ComponentIdentificationResults analysisResult={result} onRetry={reset} />
          </div>
          <div className="shrink-0 border-t border-white/[0.10] p-2.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
            >
              Identify another
            </button>
          </div>
        </>
      ) : isAnalysing ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" aria-hidden />
          <p className="text-[13.5px] font-semibold text-white">Reading the photo…</p>
          <p className="max-w-[34ch] text-[12px] leading-snug text-white">
            Matching what's on the label against BS 7671 and the component data.
          </p>
          {/* Indeterminate. The old bar counted up in random increments. */}
          <div className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-white/[0.10]">
            <div className="h-full w-full animate-pulse rounded-full bg-elec-yellow/70" />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-5">
          <p className="text-[12.5px] leading-relaxed text-white">
            Photograph the component — square to the label, even light, no glare — and you'll get:
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {[
              ['What it is', 'Make, model and type, in plain English.'],
              ['Ratings', 'Voltage, current, breaking capacity, poles, IP.'],
              ['BS 7671', 'The regulations that apply to it.'],
              ['Age', 'Roughly when it dates from, and whether it still complies.'],
              ['Replacing it', 'What to fit instead, and what to watch for.'],
              ['Common issues', 'What tends to go wrong with this one.'],
            ].map(([label, blurb]) => (
              <li key={label} className="flex gap-3">
                <span className="w-[86px] shrink-0 text-[12px] font-semibold text-white">
                  {label}
                </span>
                <span className="min-w-0 flex-1 text-[12px] leading-snug text-white">{blurb}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const analyseButton = (
    <button
      type="button"
      onClick={handleAnalyse}
      disabled={!canAnalyse}
      className={cn(
        'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5',
        'text-[14px] font-semibold text-black',
        'bg-gradient-to-b from-[hsl(47_100%_57%)] to-[hsl(47_100%_47%)]',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_4px_14px_-8px_hsl(47_100%_50%_/_0.30)]',
        'transition-colors duration-150 touch-manipulation select-none',
        '[-webkit-tap-highlight-color:transparent] active:scale-[0.98]',
        'hover:from-[hsl(47_100%_61%)] hover:to-[hsl(47_100%_50%)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        'disabled:cursor-not-allowed disabled:opacity-40'
      )}
    >
      {isAnalysing ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Reading the photo…
        </>
      ) : (
        <>
          <ScanSearch className="h-4 w-4" aria-hidden />
          Identify {images.length > 1 ? `from ${images.length} photos` : 'the component'}
        </>
      )}
    </button>
  );

  return (
    <HubPage>
      <HubMasthead
        section="AI tools"
        title="Component ID"
        backTo="/electrician-tools/ai-tooling"
      />

      <div className="mx-auto max-w-[1600px] px-4 pb-32 pt-4 lg:px-8 lg:pb-10">
        {/* Inverted against the sibling tools: small brief, big answer. */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-6 2xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* ── The brief ───────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-4">
            <Panel
              title="The photo"
              hint={images.length > 0 ? `${images.length} of ${MAX_PHOTOS}` : undefined}
            >
              {isCameraActive ? (
                <div className="space-y-2">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-elec-yellow/40 bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-3 rounded-lg border border-elec-yellow/40"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={captureImage}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[12.5px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90"
                    >
                      <Camera className="h-4 w-4" aria-hidden />
                      Capture
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      aria-label="Close camera"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-white transition-colors touch-manipulation hover:border-white/[0.28]"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={startCamera}
                    disabled={images.length >= MAX_PHOTOS}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10] disabled:opacity-40"
                  >
                    <Camera className="h-4 w-4" aria-hidden />
                    Camera
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= MAX_PHOTOS}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10] disabled:opacity-40"
                  >
                    <Upload className="h-4 w-4" aria-hidden />
                    Upload
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                // Was missing, while the copy promised four photos.
                multiple
                onChange={(e) => {
                  handleFileSelect(e.target.files);
                  e.target.value = '';
                }}
                className="hidden"
              />

              {previews.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {previews.map((url, idx) => (
                    <div
                      key={url}
                      className="relative aspect-square overflow-hidden rounded-lg border border-white/[0.12]"
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                        aria-label={`Remove photo ${idx + 1}`}
                        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-black/75 touch-manipulation"
                      >
                        <X className="h-3 w-3 text-white" aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-3 text-[11.5px] leading-snug text-white">
                Square to the label, bright and even light, no glare. Up to {MAX_PHOTOS} photos —
                all of them are read.
              </p>
            </Panel>

            <Panel title="What sort of thing is it">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <Chip
                    key={c.id}
                    on={category === c.id}
                    onClick={() => {
                      haptic.light();
                      setCategory(category === c.id ? null : c.id);
                    }}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
              <p className="mt-2.5 text-[11.5px] leading-snug text-white">
                Optional — it narrows the search when a label is hard to read.
              </p>
            </Panel>

            <Panel title="What to tell me">
              <div className="flex flex-wrap gap-1.5">
                {INFO.map((i) => (
                  <Chip
                    key={i.id}
                    on={info.includes(i.id)}
                    onClick={() => {
                      haptic.light();
                      setInfo((prev) =>
                        prev.includes(i.id) ? prev.filter((x) => x !== i.id) : [...prev, i.id]
                      );
                    }}
                  >
                    {i.label}
                  </Chip>
                ))}
              </div>
            </Panel>

            <div className="hidden lg:block">{analyseButton}</div>
          </div>

          {/* ── The result ──────────────────────────────────────────────── */}
          {!isMobile && (
            <aside className="hidden lg:block">
              <div
                className={cn(
                  'sticky top-20',
                  result || isAnalysing ? 'h-[calc(100dvh-9.5rem)] min-h-[420px]' : 'h-full'
                )}
              >
                {panel}
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ── Mobile: fixed action bar ────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-elec-dark via-elec-dark/95 to-transparent px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-4 lg:hidden">
        <div className="flex items-center gap-2">
          {result && (
            <button
              type="button"
              onClick={() => {
                haptic.light();
                setSheetOpen(true);
              }}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-neutral-900 px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation active:bg-white/[0.10]"
            >
              View result
            </button>
          )}
          <div className="min-w-0 flex-1">{analyseButton}</div>
        </div>
      </div>

      {/* ── Mobile: the result ──────────────────────────────────────────── */}
      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.10] bg-elec-dark p-0"
          >
            <SheetHeader className="border-b border-white/[0.10] px-4 py-3 text-left">
              <SheetTitle className="text-[15px] font-semibold text-white">
                Component
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(85vh-57px)] p-3">{panel}</div>
          </SheetContent>
        </Sheet>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </HubPage>
  );
};

export default ComponentIdentifyPage;
