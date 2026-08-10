/**
 * FaultDiagnosisPage — symptoms in, EICR classification and a fix path out.
 *
 * Rebuilt on the same shape as the Client Explainer, because they are sibling
 * tools and were drawn in two different hands: the brief is a 2x2 block of
 * panels beside a sticky result rail on a desktop, and on a phone it is one
 * column with the action in a fixed bar and the diagnosis in an 85vh sheet.
 *
 * ── The camera was broken ──────────────────────────────────────────────────
 *
 * `startCamera` only set `isCameraActive` from INSIDE `if (videoRef.current)`,
 * and the <video> it refers to was rendered behind `{isCameraActive && …}`. So
 * on the first tap the ref is null, the flag is never set, the video never
 * mounts — and the MediaStream that was just acquired is never released.
 *
 * Verified in the browser rather than read off the page: stubbing
 * getUserMedia and tapping "Open camera" gives one stream acquired, its track
 * still `live`, and no <video> in the DOM. On a real device that is the camera
 * light coming on and staying on, with nothing to show for it, once per tap.
 *
 * The order is now: acquire → set state → attach the stream in an effect once
 * the element exists → stop every track on close AND on unmount.
 *
 * ⚠️ ComponentIdentifyPage, InstallationVerifyPage and WiringInstructionPage
 * all carry a byte-for-byte copy of the old sequence and are broken the same
 * way. They are not fixed here.
 *
 * ── Other things that were wrong ───────────────────────────────────────────
 *
 *   Three of every four photos were discarded. The picker accepted four and
 *   the request sent `images[0]`. `visual-analysis` has taken
 *   `additional_images` all along, so all of them are sent now.
 *
 *   `URL.createObjectURL(img)` was called inline in the render of every
 *   thumbnail, so each render minted a new blob URL and none were ever
 *   revoked. Created once per file now, revoked when it goes.
 *
 *   The progress bar was invented — `prev + Math.random() * 10` on a timer,
 *   capped at 90 until the request happened to land. A number that precise
 *   about something it cannot know is worse than no number.
 *
 *   "Diagnose another fault" cleared the symptoms and photos but left the
 *   location, timeframe and notes from the previous fault sitting in the form.
 *
 *   The primary button did not exist until you had already filled something
 *   in, so the page opened with no visible way to do the one thing it does.
 *
 *   `onExportReport` was a required prop that was never passed — a live
 *   TypeScript error, and a dead "Export report" button in the results. It
 *   now saves the diagnosis.
 */

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { X, Loader2, Camera, Upload, Stethoscope } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { mintFreshSignedUrl } from '@/utils/storageUrls';
import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { HubPage, HubMasthead } from '@/components/hub/HubPrimitives';
import FaultDiagnosisResult, {
  type FaultDiagnosisData,
} from '@/components/electrician-tools/ai-tools/FaultDiagnosisResult';

/** `visual-analysis` takes a primary plus extras; this is the picker's cap. */
const MAX_PHOTOS = 4;

const SYMPTOMS = [
  { id: 'burning', label: 'Burning or scorching', severe: true },
  { id: 'tripping', label: 'Tripping / RCD', severe: true },
  { id: 'water', label: 'Water damage', severe: true },
  { id: 'exposed', label: 'Exposed wiring', severe: true },
  { id: 'overheating', label: 'Overheating', severe: true },
  { id: 'old', label: 'Old or outdated', severe: false },
  { id: 'damage', label: 'Physical damage', severe: false },
  { id: 'other', label: 'Something else', severe: false },
];

const TIMEFRAMES = [
  { id: 'just-now', label: 'Just noticed' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'Ongoing' },
  { id: 'unknown', label: "Don't know" },
];

const LOCATIONS = [
  'Consumer unit',
  'Kitchen',
  'Bathroom',
  'Bedroom',
  'Living room',
  'Garage',
  'Outdoor',
  'Loft',
  'Other',
];

type EicrCode = 'C1' | 'C2' | 'C3' | 'FI' | 'PASS';

/**
 * The shape `visual-analysis` returns for the photo path. Only used to fold
 * that response into the same `FaultDiagnosisData` the panel renders, so both
 * paths produce one layout instead of two.
 */
interface VisualAnalysisShape {
  findings?: {
    description: string;
    eicr_code: EicrCode;
    confidence?: number;
    bs7671_clauses?: string[];
    fix_guidance?: string;
  }[];
  compliance_summary?: {
    c1_count: number;
    c2_count: number;
    c3_count: number;
    fi_count: number;
  };
  summary?: string;
}

/** Worst code present wins — that is how an EICR is graded overall. */
const worstCode = (codes: EicrCode[]): EicrCode =>
  (['C1', 'C2', 'FI', 'C3'] as EicrCode[]).find((c) => codes.includes(c)) ?? 'PASS';

// ───────────────────────────────────────────────────────────────────────────

/** One panel of the brief. Edge-to-edge on a phone, inset from `sm:` up. */
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

/**
 * A pill. Sentence case, not the uppercase `tracking-[0.12em]` the whole form
 * used to be set in — eight shouting chips is harder to scan than eight words.
 */
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

const FaultDiagnosisPage = () => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const isMobile = useIsMobile();

  useSEO({
    title: 'Fault Diagnosis',
    description:
      'Describe or photograph an electrical fault and get the likely cause, EICR classification and the BS 7671 regulation that applies.',
    noindex: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState('unknown');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<FaultDiagnosisData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // ── Photo previews ───────────────────────────────────────────────────────
  // One URL per file, revoked when the list changes or the page unmounts. The
  // previous version minted one inside the render of every thumbnail.
  const previews = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images]);
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  // ── Camera ───────────────────────────────────────────────────────────────
  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      // State FIRST. The <video> does not exist until this flips, which is
      // exactly what the old ordering got wrong.
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

  // Attach once the element is on the page.
  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  // The one place tracks are stopped: whenever the stream we hold is replaced
  // or dropped, and on unmount. Navigating away mid-capture used to leave the
  // camera running.
  useEffect(() => {
    if (!stream) return;
    return () => stream.getTracks().forEach((track) => track.stop());
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
          [...prev, new File([blob], `capture-${prev.length + 1}.jpg`, { type: 'image/jpeg' })].slice(
            0,
            MAX_PHOTOS
          )
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

  const toggleSymptom = (id: string) => {
    haptic.light();
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // ── Analysis ─────────────────────────────────────────────────────────────
  const symptomLabels = selectedSymptoms
    .map((id) => SYMPTOMS.find((s) => s.id === id)?.label)
    .filter(Boolean) as string[];

  const canDiagnose = images.length > 0 || selectedSymptoms.length > 0 || notes.trim().length > 0;

  /** Upload every photo and hand back a signed URL for each, in order. */
  const uploadPhotos = async (files: File[]) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const stamp = Date.now();

    const urls: string[] = [];
    for (const [index, file] of files.entries()) {
      const path = `${user?.id}/visual-analysis/fault-${stamp}-${index}.jpg`;
      const { error } = await supabase.storage.from('visual-uploads').upload(path, file);
      if (error) throw error;

      // Fresh signed URL (1h) — visual-analysis fetches it server-side, so it
      // must stay valid once visual-uploads goes private.
      const signed = await mintFreshSignedUrl('visual-uploads', path);
      if (!signed) throw new Error('Could not prepare the uploaded image for analysis');
      urls.push(signed);
    }
    return urls;
  };

  const diagnoseFromText = async (): Promise<FaultDiagnosisData> => {
    const { data, error } = await supabase.functions.invoke('visual-fault-diagnosis-rag', {
      body: {
        fault_description: [symptomLabels.join(', '), notes].filter(Boolean).join('. '),
        location_context: location || '',
        visible_indicators: symptomLabels,
        // "When it started" was collected on this page and never sent. It is
        // the difference between a burning smell noticed ten minutes ago and
        // one that has been there for months.
        timeframe: TIMEFRAMES.find((t) => t.id === timeframe)?.label ?? '',
      },
    });
    if (error) throw error;

    const code = ((data.fault_code as string) || 'FI') as EicrCode;

    // Straight across. The old mapping folded all of this into the four fields
    // `VisualAnalysisResults` understood — the fix path became one blob of
    // text, the checks were appended to the summary with semicolons, and the
    // citations collapsed to a bare list of numbers.
    return {
      code,
      reasoning:
        (code === 'PASS' ? data.user_context_addressed : data.reasoning) ||
        data.reasoning ||
        'No reasoning returned.',
      immediateAction: data.immediate_action || undefined,
      fixSteps: Array.isArray(data.fix_steps) ? data.fix_steps : [],
      furtherChecks: Array.isArray(data.further_checks) ? data.further_checks : [],
      citations: (data.regulation_references || []).map(
        (r: { number: string | null; section?: string; source?: string }) => ({
          number: r.number ?? null,
          section: r.section ?? '',
          source: r.source ?? 'bs7671',
        })
      ),
      confidence: typeof data.confidence === 'number' ? data.confidence : undefined,
      grounded: data.grounded !== false,
    };
  };

  const diagnoseFromPhotos = async (): Promise<FaultDiagnosisData> => {
    const urls = await uploadPhotos(images);
    const { data, error } = await supabase.functions.invoke('visual-analysis', {
      body: {
        primary_image: urls[0],
        // Every photo, not just the first. The picker has always accepted
        // four and the function has always accepted the extras.
        additional_images: urls.slice(1),
        analysis_settings: {
          mode: 'fault_diagnosis',
          confidence_threshold: 0.5,
          enable_bounding_boxes: false,
          focus_areas: [
            symptomLabels.length ? `Symptoms: ${symptomLabels.join(', ')}` : '',
            `Timeframe: ${TIMEFRAMES.find((t) => t.id === timeframe)?.label ?? ''}`,
            location ? `Location: ${location}` : '',
            notes,
          ].filter(Boolean),
          remove_background: false,
          bs7671_compliance: true,
          fast_mode: false,
        },
      },
    });
    if (error) throw error;

    // Fold the photo response into the same shape as the text one, so both
    // render through a single panel. `visual-analysis` reports per-finding;
    // the overall code is the worst of them.
    const analysis = (data?.analysis || data) as VisualAnalysisShape;
    const findings = analysis.findings ?? [];
    const code = worstCode(findings.map((f) => f.eicr_code));

    return {
      code,
      reasoning:
        analysis.summary ||
        findings.map((f) => f.description).filter(Boolean).join(' ') ||
        'No reasoning returned.',
      fixSteps: findings.map((f) => f.fix_guidance).filter((s): s is string => Boolean(s)),
      furtherChecks: [],
      citations: findings
        .flatMap((f) => f.bs7671_clauses ?? [])
        .filter(Boolean)
        .map((number) => ({ number, section: '', source: 'bs7671' })),
      confidence: findings[0]?.confidence,
      // The photo path does not report grounding, so don't imply either way.
      grounded: true,
    };
  };

  const handleDiagnose = async () => {
    if (!canDiagnose) {
      toast({
        title: 'Tell it something first',
        description: 'Pick a symptom, add a note, or take a photo.',
        variant: 'destructive',
      });
      return;
    }

    haptic.medium();
    setIsAnalysing(true);
    if (isMobile) setSheetOpen(true);

    try {
      const result = images.length > 0 ? await diagnoseFromPhotos() : await diagnoseFromText();
      setDiagnosis(result);
      haptic.success();

      toast({
        title: 'Diagnosis ready',
        description:
          result.code === 'PASS'
            ? 'Nothing requiring remedial work.'
            : `Classified ${result.code} — check the detail.`,
        variant: 'success',
      });
    } catch (error) {
      console.error('Fault diagnosis failed:', error);
      toast({
        title: 'Diagnosis failed',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalysing(false);
    }
  };

  /** Everything, not just the symptoms and the photos. */
  const reset = () => {
    haptic.light();
    setDiagnosis(null);
    setImages([]);
    setSelectedSymptoms([]);
    setTimeframe('unknown');
    setLocation('');
    setNotes('');
    setSheetOpen(false);
  };

  /** The "Export report" button in the results was wired to nothing. */
  const handleExport = () => {
    if (!diagnosis) return;
    const lines = [
      'FAULT DIAGNOSIS',
      '',
      symptomLabels.length ? `Symptoms: ${symptomLabels.join(', ')}` : '',
      location ? `Location: ${location}` : '',
      `Started: ${TIMEFRAMES.find((t) => t.id === timeframe)?.label ?? 'Unknown'}`,
      notes ? `Notes: ${notes}` : '',
      '',
      `Classification: ${diagnosis.code}`,
      '',
      diagnosis.reasoning,
      diagnosis.immediateAction ? `\nDo first: ${diagnosis.immediateAction}` : '',
      ...(diagnosis.fixSteps?.length
        ? ['', 'Putting it right:', ...diagnosis.fixSteps.map((s, i) => `${i + 1}. ${s}`)]
        : []),
      ...(diagnosis.furtherChecks?.length
        ? ['', 'Worth checking:', ...diagnosis.furtherChecks.map((s) => `- ${s}`)]
        : []),
      ...(diagnosis.citations?.length
        ? [
            '',
            'Based on:',
            ...diagnosis.citations.map(
              (c) => `- ${c.source}${c.number ? ` ${c.number}` : ''}${c.section ? ` — ${c.section}` : ''}`
            ),
          ]
        : []),
      '',
      `Prepared ${new Date().toLocaleDateString('en-GB')}`,
    ].filter((l) => l !== '');

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fault-diagnosis.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ── The result panel ─────────────────────────────────────────────────────
  const panelSurface = cn(
    'flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-elec-yellow/35',
    'bg-gradient-to-br from-white/[0.14] via-white/[0.075] to-white/[0.045]',
    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]'
  );

  const result = (
    <div className={panelSurface}>
      <div className="shrink-0 border-b border-white/[0.10] px-5 py-4">
        <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">The diagnosis</h2>
      </div>

      {diagnosis ? (
        <div className="min-h-0 flex-1">
          <FaultDiagnosisResult data={diagnosis} onExport={handleExport} onReset={reset} />
        </div>
      ) : isAnalysing ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" aria-hidden />
          <p className="text-[13.5px] font-semibold text-white">Working through it…</p>
          <p className="max-w-[30ch] text-[12px] leading-snug text-white">
            Matching the symptoms against BS 7671 and GN3 guidance.
          </p>
          {/* Indeterminate. The old bar counted up in random increments to a
              number it had no way of knowing. */}
          <div className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-white/[0.10]">
            <div className="h-full w-full animate-pulse rounded-full bg-elec-yellow/70" />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-5">
          <p className="text-[12.5px] leading-relaxed text-white">
            Describe what you're looking at, or photograph it, then press Diagnose. You'll get:
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              ['Cause', 'The most likely reason, not a list of maybes.'],
              ['Code', 'C1, C2, C3 or FI, the way it goes on an EICR.'],
              ['Reg', 'The BS 7671 regulation it hangs on.'],
              ['Fix', 'What to do about it, in order.'],
            ].map(([label, blurb]) => (
              <li key={label} className="flex gap-3">
                <span className="w-[42px] shrink-0 text-[12px] font-semibold text-white">
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

  const diagnoseButton = (
    <button
      type="button"
      onClick={handleDiagnose}
      disabled={!canDiagnose || isAnalysing}
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
          Working through it…
        </>
      ) : (
        <>
          <Stethoscope className="h-4 w-4" aria-hidden />
          {images.length > 0 ? 'Diagnose from the photos' : 'Diagnose the fault'}
        </>
      )}
    </button>
  );

  return (
    <HubPage>
      <HubMasthead
        section="AI tools"
        title="Fault Diagnosis"
        backTo="/electrician-tools/ai-tooling"
      />

      <div className="mx-auto max-w-[1600px] px-4 pb-32 pt-4 lg:px-8 lg:pb-10">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          {/* ── The brief ───────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-4">
            {/* Two independent stacks rather than a 2x2 of grid cells, so a
                short panel isn't stretched to the height of a tall neighbour. */}
            <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <div className="space-y-4">
                <Panel
                  title="What you see"
                  hint={selectedSymptoms.length > 0 ? `${selectedSymptoms.length} picked` : undefined}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {SYMPTOMS.map(({ id, label, severe }) => {
                      const on = selectedSymptoms.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleSymptom(id)}
                          className={cn(
                            'min-h-[60px] rounded-xl border px-3 py-2.5 text-left',
                            'transition-colors duration-150 touch-manipulation select-none',
                            '[-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                            on
                              ? 'border-elec-yellow bg-elec-yellow'
                              : 'border-white/[0.12] bg-white/[0.06] hover:border-white/[0.28]'
                          )}
                        >
                          <span
                            className={cn(
                              'block text-[13px] font-semibold leading-tight',
                              on ? 'text-black' : 'text-white'
                            )}
                          >
                            {label}
                          </span>
                          {severe && (
                            <span
                              className={cn(
                                'mt-1 block text-[10.5px] font-semibold leading-tight',
                                on ? 'text-black/70' : 'text-red-300'
                              )}
                            >
                              Often serious
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Panel>

                <Panel title="Anything else">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What you've tested, readings you took, anything unusual…"
                    // 16px or iOS zooms the page on focus.
                    style={{ fontSize: '16px' }}
                    className={cn(
                      'min-h-[92px] resize-none rounded-xl border-white/[0.12] bg-black/20 text-white',
                      'caret-elec-yellow placeholder:text-white/45',
                      'focus-visible:border-elec-yellow focus-visible:ring-0 focus-visible:ring-offset-0'
                    )}
                  />
                </Panel>
              </div>

              <div className="space-y-4">
                <Panel title="When and where">
                  <p className="mb-2 text-[12px] font-medium text-white">It started</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TIMEFRAMES.map((t) => (
                      <Chip
                        key={t.id}
                        on={timeframe === t.id}
                        onClick={() => {
                          haptic.light();
                          setTimeframe(t.id);
                        }}
                      >
                        {t.label}
                      </Chip>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Where it is</p>
                  <div className="flex flex-wrap gap-1.5">
                    {LOCATIONS.map((loc) => (
                      <Chip
                        key={loc}
                        on={location === loc}
                        onClick={() => {
                          haptic.light();
                          setLocation(location === loc ? '' : loc);
                        }}
                      >
                        {loc}
                      </Chip>
                    ))}
                  </div>
                </Panel>

                <Panel
                  title="Photos"
                  hint={images.length > 0 ? `${images.length} of ${MAX_PHOTOS}` : 'Optional'}
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
                    multiple
                    onChange={(e) => {
                      handleFileSelect(e.target.files);
                      // Let the same file be picked again after removing it.
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
                    Optional — a description alone works, but a photo sharpens the call.
                  </p>
                </Panel>
              </div>
            </div>

            <div className="hidden lg:block">{diagnoseButton}</div>
          </div>

          {/* ── The result rail ─────────────────────────────────────────── */}
          {/* Exactly one of the rail and the sheet is ever mounted —
              `useIsMobile` switches at 1024px, the same width as `lg:`. */}
          {!isMobile && (
            <aside className="hidden lg:block">
              {/* Full height once there is something to scroll; matched to the
                  brief's height when empty, so it isn't a hole in the page. */}
              <div
                className={cn(
                  'sticky top-20',
                  diagnosis || isAnalysing ? 'h-[calc(100dvh-9.5rem)] min-h-[420px]' : 'h-full'
                )}
              >
                {result}
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ── Mobile: fixed action bar ────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-elec-dark via-elec-dark/95 to-transparent px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-4 lg:hidden">
        <div className="flex items-center gap-2">
          {diagnosis && (
            <button
              type="button"
              onClick={() => {
                haptic.light();
                setSheetOpen(true);
              }}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-neutral-900 px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation active:bg-white/[0.10]"
            >
              View diagnosis
            </button>
          )}
          <div className="min-w-0 flex-1">{diagnoseButton}</div>
        </div>
      </div>

      {/* ── Mobile: the diagnosis ───────────────────────────────────────── */}
      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.10] bg-elec-dark p-0"
          >
            <SheetHeader className="border-b border-white/[0.10] px-4 py-3 text-left">
              <SheetTitle className="text-[15px] font-semibold text-white">
                Fault diagnosis
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(85vh-57px)] p-3">{result}</div>
          </SheetContent>
        </Sheet>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </HubPage>
  );
};

export default FaultDiagnosisPage;
