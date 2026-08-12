/**
 * InstallationVerifyPage — photograph an installation, check it against BS 7671.
 *
 * Fourth AI tool onto the shared shell: 2x2 brief beside a sticky result rail
 * on a desktop, one column with a fixed action bar and an 85vh sheet on a
 * phone.
 *
 * ── The results were wrong, not just ugly ──────────────────────────────────
 *
 * `visual-analysis` and `InstallationVerificationResults` were written to two
 * different vocabularies and nothing translated between them. The function
 * emits `result` / `observation` / `regulation_reference`; the component reads
 * `status` / `details` / `bs7671_references`. Every field it needed was
 * undefined, so:
 *
 *   • EVERY CHECK RENDERED AMBER "TEST". `check.status` was undefined, so
 *     `statusTone()` fell to its default for all of them. Pass and fail counts
 *     were always zero and the Pass/Fail filters returned nothing.
 *
 *   • EVERY VERIFICATION SAID "FAIL". `overallTone` is keyed
 *     pass|fail|requires_testing, the function returns `compliant_visual`, and
 *     the lookup ends `rawResult in overallTone ? … : 'fail'`. A fully
 *     compliant installation was reported as a failure.
 *
 *   • CONFIDENCE READ "8500%". The component renders
 *     `Math.round(check.confidence * 100)` — it expects 0-1, the function
 *     sends 0-100.
 *
 *   • No observation text and no regulation ever appeared, for the same
 *     reason.
 *
 * `toResultsContract()` below is the translation, and it is the only place
 * that knows about both vocabularies.
 *
 * ── The rest ───────────────────────────────────────────────────────────────
 *
 * SIX PHOTOS IN, ONE PHOTO ANALYSED. This page asks for "multiple angles:
 * consumer unit front, internal, labels, earthing", gives you a "+" tile up to
 * six, and sent `images[0]`. Of the four tools carrying this bug it was the
 * worst placed to have it — multi-angle evidence is the whole premise of
 * verifying an installation from photographs. All of them go now.
 *
 * THE QUICK CHECKS WENT NOWHERE. "Circuit labels present", "All covers in
 * place", "Installation accessible", "Clean installation" — four things the
 * electrician confirms on site, which the request never mentioned. They are
 * first-hand observations the camera cannot make, so they are now sent as
 * exactly that.
 *
 * Plus the shared set: the camera that never opened (state was set inside
 * `if (videoRef.current)` while the <video> only mounts once that flag is
 * true), `URL.createObjectURL` in the thumbnail render, a `Math.random()`
 * progress bar, a reset that cleared only the photos, and a CTA that did not
 * exist until you had already filled the form in.
 *
 * ⚠️ WiringInstructionPage is the last page still carrying the camera bug.
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Camera, Upload, Plus, Check, ClipboardCheck } from 'lucide-react';

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
  ToolAction,
  ToolWorking,
} from '@/components/electrician-tools/ai-tools/ToolShell';
import InstallationVerificationResults from '@/components/electrician-tools/ai-tools/InstallationVerificationResults';

const MAX_PHOTOS = 6;

const CERT_TYPES = [
  { id: 'eic', label: 'EIC', full: 'Electrical Installation Certificate' },
  { id: 'eicr', label: 'EICR', full: 'Electrical Installation Condition Report' },
  { id: 'minor-works', label: 'Minor Works', full: 'Minor Electrical Installation Works' },
];

const PROPERTY_TYPES = [
  { id: 'domestic', label: 'Domestic' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
];

const SCOPES = [
  { id: 'consumer-unit', label: 'Consumer unit' },
  { id: 'distribution', label: 'Distribution board' },
  { id: 'lighting', label: 'Lighting circuits' },
  { id: 'power', label: 'Power circuits' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'earthing', label: 'Earthing + bonding' },
  { id: 'rcd', label: 'RCD protection' },
  { id: 'special', label: 'Special locations' },
];

/**
 * Things the photograph cannot establish but the person holding it can. They
 * are sent as confirmed on site, which is a different kind of evidence from
 * anything the model can see.
 */
const SITE_CHECKS = [
  { id: 'labels', label: 'Circuit labels present' },
  { id: 'covers', label: 'All covers in place' },
  { id: 'accessible', label: 'Installation accessible' },
  { id: 'clean', label: 'Clean installation' },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
type RawAnalysis = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface ResultsContract {
  verification_checks: {
    check_name: string;
    status: 'pass' | 'fail' | 'requires_testing';
    details: string;
    bs7671_references: string[];
    /** 0-1. The component multiplies by 100 to display. */
    confidence: number;
  }[];
  improvement_recommendations: string[];
  overall_result: 'pass' | 'fail' | 'requires_testing';
  confidence_score?: number;
}

/** The function's per-check vocabulary → the component's. */
const STATUS_MAP: Record<string, 'pass' | 'fail' | 'requires_testing'> = {
  compliant_visual: 'pass',
  compliant: 'pass',
  pass: 'pass',
  non_compliant: 'fail',
  fail: 'fail',
  requires_testing: 'requires_testing',
  // Not visible in the photo is not a failure — it is something to go and look
  // at, which is exactly what "requires testing" means to the reader.
  not_visible: 'requires_testing',
};

/** The function's overall vocabulary → the component's. */
const OVERALL_MAP: Record<string, 'pass' | 'fail' | 'requires_testing'> = {
  compliant_visual: 'pass',
  pass: 'pass',
  non_compliant: 'fail',
  fail: 'fail',
  requires_physical_testing: 'requires_testing',
  requires_testing: 'requires_testing',
  insufficient_image_quality: 'requires_testing',
};

/**
 * Translate the edge function's response into what the results component
 * actually reads. Without this every check is amber, every verdict is "Fail"
 * and confidence reads in the thousands of percent.
 */
const toResultsContract = (raw: RawAnalysis): ResultsContract => {
  const rawChecks: RawAnalysis[] = raw?.verification_checks ?? [];

  const verification_checks = rawChecks.map((c) => {
    // 0-100 from the function; the component multiplies by 100 to render, so
    // hand it a fraction. Values already below 1 are passed through.
    const rawConfidence = typeof c.confidence === 'number' ? c.confidence : Number(c.confidence);
    const confidence = Number.isFinite(rawConfidence)
      ? rawConfidence > 1
        ? Math.min(rawConfidence / 100, 1)
        : rawConfidence
      : 0.5;

    // `regulation_reference` is a single string; the component wants a list,
    // and the model often puts two clauses in one field.
    const refs = String(c.regulation_reference ?? '')
      .split(/[,;]/)
      .map((r: string) => r.trim())
      .filter((r: string) => r && !/^(n\/?a|none|unknown)$/i.test(r));

    return {
      check_name: c.check_name || c.category || 'Check',
      status: STATUS_MAP[String(c.result ?? c.status ?? '').toLowerCase()] ?? 'requires_testing',
      details: [c.observation, c.assessment, c.why_it_matters]
        .filter(Boolean)
        .join('\n\n')
        .trim(),
      bs7671_references: refs,
      confidence,
    };
  });

  // `priority_actions` is three buckets; the component takes one flat list.
  const p = raw?.priority_actions ?? {};
  const improvement_recommendations = [
    ...(p.critical_now ?? []),
    ...(p.important_soon ?? []),
    ...(p.advisory ?? []),
    ...(raw?.improvement_recommendations ?? []),
  ].filter(Boolean);

  return {
    verification_checks,
    improvement_recommendations,
    overall_result: OVERALL_MAP[String(raw?.overall_result ?? '').toLowerCase()] ?? 'requires_testing',
    confidence_score:
      typeof raw?.confidence === 'number' && raw.confidence > 1
        ? raw.confidence / 100
        : raw?.confidence,
  };
};

// ───────────────────────────────────────────────────────────────────────────

const InstallationVerifyPage = () => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const isMobile = useIsMobile();

  useSEO({
    title: 'Install Verify',
    description:
      'Photograph an installation and check what is visible against BS 7671, with the tests that still need doing on site.',
    noindex: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const camera = useCameraCapture({
    onError: () =>
      toast({
        title: 'No camera access',
        description: 'Allow camera access, or upload photos instead.',
        variant: 'destructive',
      }),
  });

  const [images, setImages] = useState<File[]>([]);
  const [certType, setCertType] = useState('eicr');
  const [propertyType, setPropertyType] = useState('domestic');
  const [scopes, setScopes] = useState<string[]>(['consumer-unit']);
  const [siteChecks, setSiteChecks] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<ResultsContract | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const previews = useMemo(() => images.map((f) => URL.createObjectURL(f)), [images]);
  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  const handleCapture = async () => {
    const file = await camera.capture(`verify-${images.length + 1}.jpg`);
    if (file) {
      haptic.success();
      setImages((prev) => [...prev, file].slice(0, MAX_PHOTOS));
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const picked = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (picked.length === 0) return;
    setImages((prev) => [...prev, ...picked].slice(0, MAX_PHOTOS));
  };

  // ── Analysis ─────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    if (images.length === 0) {
      toast({
        title: 'Photos first',
        description: 'Take a few angles of what you want checked.',
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
        const path = `${user?.id}/visual-analysis/verify-${stamp}-${index}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(path, file);
        if (uploadError) throw uploadError;

        const signed = await mintFreshSignedUrl('visual-uploads', path);
        if (!signed) throw new Error('Could not prepare the uploaded images for analysis');
        urls.push(signed);
      }

      const certLabel = CERT_TYPES.find((c) => c.id === certType)?.full ?? '';
      const propLabel = PROPERTY_TYPES.find((p) => p.id === propertyType)?.label ?? '';
      const scopeLabels = scopes
        .map((s) => SCOPES.find((a) => a.id === s)?.label)
        .filter(Boolean)
        .join(', ');
      const confirmedOnSite = siteChecks
        .map((c) => SITE_CHECKS.find((s) => s.id === c)?.label)
        .filter(Boolean)
        .join(', ');

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: urls[0],
          // All of them. This page asks for six angles and used to read one.
          additional_images: urls.slice(1),
          analysis_settings: {
            mode: 'installation_verify',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            focus_areas: [
              `Certificate: ${certLabel}`,
              `Property: ${propLabel}`,
              scopeLabels ? `Scope: ${scopeLabels}` : '',
              // Never sent before. First-hand observations, flagged as such so
              // they aren't confused with what the photographs show.
              confirmedOnSite ? `Confirmed on site by the electrician: ${confirmedOnSite}` : '',
              notes,
            ].filter(Boolean),
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false,
          },
        },
      });

      if (error) throw error;

      const raw = data?.verification_checks ? data : data?.analysis;
      if (!raw?.verification_checks?.length) {
        toast({
          title: 'Nothing to verify',
          description: 'The photos were too unclear to check anything against. Try closer shots.',
          variant: 'destructive',
        });
        return;
      }

      const normalised = toResultsContract(raw);
      setResult(normalised);
      haptic.success();

      const fails = normalised.verification_checks.filter((c) => c.status === 'fail').length;
      toast({
        title: 'Verification done',
        description: fails > 0 ? `${fails} item${fails === 1 ? '' : 's'} not compliant.` : 'Nothing failed on what was visible.',
        variant: 'success',
      });
    } catch (err) {
      console.error('Installation verification failed:', err);
      toast({
        title: 'Verification failed',
        description: 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalysing(false);
    }
  };

  /** Everything. The old reset cleared the photos and nothing else. */
  const reset = () => {
    haptic.light();
    setResult(null);
    setImages([]);
    setCertType('eicr');
    setPropertyType('domestic');
    setScopes(['consumer-unit']);
    setSiteChecks([]);
    setNotes('');
    setSheetOpen(false);
  };

  const canVerify = images.length > 0 && !isAnalysing;

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
        <h2 className="text-[14px] font-semibold tracking-tight text-elec-yellow">
          What the photos show
        </h2>
      </div>

      {result ? (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
            <InstallationVerificationResults analysisResult={result} />
          </div>
          <div className="shrink-0 border-t border-white/[0.10] p-2.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
            >
              Verify something else
            </button>
          </div>
        </>
      ) : isAnalysing ? (
        <ToolWorking
          title="Going through the photos…"
          detail="Checking what's visible against BS 7671, and noting what it can't tell from a picture."
        />
      ) : (
        <div className="flex-1 p-5">
          <p className="text-[12.5px] leading-relaxed text-white">
            This is a visual check, not an inspection. Photograph what you want looked at and
            you'll get:
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              ['Pass', "What's visibly right, against the regulation it satisfies."],
              ['Fail', "What's visibly wrong, and what to do about it."],
              ['Test', "What a photo can't settle — the readings you still need."],
            ].map(([label, blurb]) => (
              <li key={label} className="flex gap-3">
                <span className="w-[34px] shrink-0 text-[12px] font-semibold text-white">
                  {label}
                </span>
                <span className="min-w-0 flex-1 text-[12px] leading-snug text-white">{blurb}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/[0.10] pt-3 text-[11.5px] leading-snug text-white">
            It cannot replace an EICR. Nothing here is a substitute for testing.
          </p>
        </div>
      )}
    </div>
  );

  const verifyButton = (
    <ToolAction
      onClick={handleVerify}
      disabled={!canVerify}
      busy={isAnalysing}
      busyLabel="Going through the photos…"
      icon={<ClipboardCheck className="h-4 w-4" aria-hidden />}
    >
      Check {images.length > 1 ? `all ${images.length} photos` : 'the installation'}
    </ToolAction>
  );

  return (
    <AiToolPage
      title="Install Verify"
      result={panel}
      resultTitle="Visual check"
      hasResult={Boolean(result) || isAnalysing}
      action={verifyButton}
      sheetOpen={sheetOpen}
      onSheetOpenChange={setSheetOpen}
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
              <div className="space-y-4">
                <ToolPanel
                  title="The photos"
                  hint={images.length > 0 ? `${images.length} of ${MAX_PHOTOS}` : undefined}
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
                      {images.length < MAX_PHOTOS && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          aria-label="Add another photo"
                          className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/[0.18] transition-colors touch-manipulation hover:border-elec-yellow/50"
                        >
                          <Plus className="h-5 w-5 text-white" aria-hidden />
                        </button>
                      )}
                    </div>
                  )}

                  <p className="mt-3 text-[11.5px] leading-snug text-white">
                    Several angles beat one wide shot — board front, inside the enclosure, the
                    labels, the earthing. All {MAX_PHOTOS} are read.
                  </p>
                </ToolPanel>

                <ToolPanel title="What to look at">
                  <div className="flex flex-wrap gap-1.5">
                    {SCOPES.map((s) => (
                      <ToolChip
                        key={s.id}
                        on={scopes.includes(s.id)}
                        onClick={() => {
                          haptic.light();
                          setScopes((prev) =>
                            prev.includes(s.id)
                              ? prev.filter((x) => x !== s.id)
                              : [...prev, s.id]
                          );
                        }}
                      >
                        {s.label}
                      </ToolChip>
                    ))}
                  </div>
                </ToolPanel>
              </div>

              <div className="space-y-4">
                <ToolPanel title="What it's for">
                  <p className="mb-2 text-[12px] font-medium text-white">Certificate</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CERT_TYPES.map((c) => (
                      <ToolChip
                        key={c.id}
                        on={certType === c.id}
                        onClick={() => {
                          haptic.light();
                          setCertType(c.id);
                        }}
                      >
                        {c.label}
                      </ToolChip>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Property</p>
                  <div className="flex flex-wrap gap-1.5">
                    {PROPERTY_TYPES.map((p) => (
                      <ToolChip
                        key={p.id}
                        on={propertyType === p.id}
                        onClick={() => {
                          haptic.light();
                          setPropertyType(p.id);
                        }}
                      >
                        {p.label}
                      </ToolChip>
                    ))}
                  </div>
                </ToolPanel>

                <ToolPanel
                  title="Confirmed on site"
                  hint={siteChecks.length > 0 ? `${siteChecks.length} of 4` : undefined}
                >
                  <p className="mb-2.5 text-[11.5px] leading-snug text-white">
                    Things a photo can't establish. Tick what you've checked yourself.
                  </p>
                  <div className="grid gap-2">
                    {SITE_CHECKS.map((c) => {
                      const on = siteChecks.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => {
                            haptic.light();
                            setSiteChecks((prev) =>
                              prev.includes(c.id)
                                ? prev.filter((x) => x !== c.id)
                                : [...prev, c.id]
                            );
                          }}
                          className={cn(
                            'flex min-h-11 items-center gap-2.5 rounded-xl border px-3 text-left',
                            'transition-colors duration-150 touch-manipulation select-none',
                            '[-webkit-tap-highlight-color:transparent] active:scale-[0.98]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                            on
                              ? 'border-elec-yellow bg-elec-yellow/[0.10]'
                              : 'border-white/[0.12] bg-white/[0.06] hover:border-white/[0.28]'
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                              on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30'
                            )}
                          >
                            {on && <Check className="h-3 w-3 text-black" />}
                          </span>
                          <span className="text-[12.5px] font-medium text-white">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mb-2 mt-4 text-[12px] font-medium text-white">Anything else</p>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Age of the installation, recent work, what's worrying you…"
                    style={{ fontSize: '16px' }}
                    className={cn(
                      'min-h-[76px] resize-none rounded-xl border-white/[0.12] bg-black/20 text-white',
                      'caret-elec-yellow placeholder:text-white/45',
                      'focus-visible:border-elec-yellow focus-visible:ring-0 focus-visible:ring-offset-0'
                    )}
                  />
                </ToolPanel>
              </div>
            </div>

      <canvas ref={camera.canvasRef} className="hidden" />
    </AiToolPage>
  );
};

export default InstallationVerifyPage;
