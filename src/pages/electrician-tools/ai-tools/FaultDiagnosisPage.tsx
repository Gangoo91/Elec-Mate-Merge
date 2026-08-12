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

import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Camera, Upload, Stethoscope } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { mintFreshSignedUrl } from '@/utils/storageUrls';
import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';
import { useCameraCapture } from '@/hooks/useCameraCapture';
import {
  AiToolPage,
  ToolPanel,
  ToolChip,
  ToolChoice,
  ToolAction,
  ToolWorking,
} from '@/components/electrician-tools/ai-tools/ToolShell';
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
  const camera = useCameraCapture({
    onError: () =>
      toast({
        title: 'No camera access',
        description: 'Allow camera access, or upload a photo instead.',
        variant: 'destructive',
      }),
  });

  const [images, setImages] = useState<File[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState('unknown');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<FaultDiagnosisData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // ── Photo previews ───────────────────────────────────────────────────────
  // One URL per file, revoked when the list changes or the page unmounts. The
  // previous version minted one inside the render of every thumbnail.
  const previews = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images]);
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  const handleCapture = async () => {
    const file = await camera.capture(`capture-${images.length + 1}.jpg`);
    if (file) {
      haptic.success();
      setImages((prev) => [...prev, file].slice(0, MAX_PHOTOS));
    }
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
        <ToolWorking
          title="Working through it…"
          detail="Matching the symptoms against BS 7671 and GN3 guidance."
        />
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
    <ToolAction
      onClick={handleDiagnose}
      disabled={!canDiagnose || isAnalysing}
      busy={isAnalysing}
      busyLabel="Working through it…"
      icon={<Stethoscope className="h-4 w-4" aria-hidden />}
    >
      {images.length > 0 ? 'Diagnose from the photos' : 'Diagnose the fault'}
    </ToolAction>
  );

  return (
    <AiToolPage
      title="Fault Diagnosis"
      result={result}
      resultTitle="Fault diagnosis"
      hasResult={Boolean(diagnosis) || isAnalysing}
      action={diagnoseButton}
      sheetOpen={sheetOpen}
      onSheetOpenChange={setSheetOpen}
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <div className="space-y-4">
                <ToolPanel
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
                </ToolPanel>

                <ToolPanel title="Anything else">
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
                </ToolPanel>
              </div>

              <div className="space-y-4">
                <ToolPanel title="When and where">
                  <p className="mb-2 text-[12px] font-medium text-white">It started</p>
                  <div className="flex flex-wrap gap-1.5">
                    {TIMEFRAMES.map((t) => (
                      <ToolChip
                        key={t.id}
                        on={timeframe === t.id}
                        onClick={() => {
                          haptic.light();
                          setTimeframe(t.id);
                        }}
                      >
                        {t.label}
                      </ToolChip>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Where it is</p>
                  <div className="flex flex-wrap gap-1.5">
                    {LOCATIONS.map((loc) => (
                      <ToolChip
                        key={loc}
                        on={location === loc}
                        onClick={() => {
                          haptic.light();
                          setLocation(location === loc ? '' : loc);
                        }}
                      >
                        {loc}
                      </ToolChip>
                    ))}
                  </div>
                </ToolPanel>

                <ToolPanel
                  title="Photos"
                  hint={images.length > 0 ? `${images.length} of ${MAX_PHOTOS}` : 'Optional'}
                >
                  {camera.isActive ? (
                    <div className="space-y-2">
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-elec-yellow/40 bg-black">
                        <video
                          ref={camera.videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCapture}
                          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[12.5px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90"
                        >
                          <Camera className="h-4 w-4" aria-hidden />
                          Capture
                        </button>
                        <button
                          type="button"
                          onClick={camera.stop}
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
                        onClick={camera.start}
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
                </ToolPanel>
              </div>
            </div>

      <canvas ref={camera.canvasRef} className="hidden" />
    </AiToolPage>
  );
};

export default FaultDiagnosisPage;
