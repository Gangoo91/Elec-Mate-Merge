/**
 * InstallationVerifyPage — editorial Install Verify screen.
 *
 * Drops the cyan/teal gradient chrome and per-cert/property icons. Editorial
 * eyebrows, type-led chips, gradient surfaces, elec-yellow CTA. All capture +
 * analyse logic preserved (visual-analysis edge function).
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { mintFreshSignedUrl } from '@/utils/storageUrls';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Loader2, Plus, Check } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import InstallationVerificationResults from '@/components/electrician-tools/ai-tools/InstallationVerificationResults';

const certificateTypes = [
  {
    id: 'eic',
    label: 'EIC',
    fullName: 'Electrical Installation Certificate',
    desc: 'New installations',
  },
  {
    id: 'eicr',
    label: 'EICR',
    fullName: 'Condition Report',
    desc: 'Periodic inspection',
  },
  {
    id: 'minor-works',
    label: 'Minor Works',
    fullName: 'Minor Electrical Works',
    desc: 'Small alterations',
  },
];

const propertyTypes = [
  { id: 'domestic', label: 'Domestic', desc: 'House / Flat' },
  { id: 'commercial', label: 'Commercial', desc: 'Office / Shop' },
  { id: 'industrial', label: 'Industrial', desc: 'Factory / Warehouse' },
];

const scopeAreas = [
  { id: 'consumer-unit', label: 'Consumer unit' },
  { id: 'distribution', label: 'Distribution board' },
  { id: 'lighting', label: 'Lighting circuits' },
  { id: 'power', label: 'Power circuits' },
  { id: 'outdoor', label: 'Outdoor installation' },
  { id: 'earthing', label: 'Earthing + bonding' },
  { id: 'rcd', label: 'RCD protection' },
  { id: 'special', label: 'Special locations' },
];

const quickChecks = [
  { id: 'labels', label: 'Circuit labels present' },
  { id: 'covers', label: 'All covers in place' },
  { id: 'accessible', label: 'Installation accessible' },
  { id: 'clean', label: 'Clean installation' },
];

const InstallationVerifyPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [selectedCertType, setSelectedCertType] = useState<string>('eicr');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('domestic');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['consumer-unit']);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch {
      toast({
        title: 'Camera error',
        description: 'Unable to access camera',
        variant: 'destructive',
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setImages((prev) => [
              ...prev,
              new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' }),
            ]);
            stopCamera();
          }
        },
        'image/jpeg',
        0.9
      );
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setImages((prev) =>
        [...prev, ...Array.from(files).filter((f) => f.type.startsWith('image/'))].slice(0, 6)
      );
    }
  };

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({
        title: 'No images',
        description: 'Capture or upload installation photos first',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + Math.random() * 8, 90));
    }, 600);

    try {
      const image = images[0];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const fileName = `${user?.id}/visual-analysis/verify-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, image);
      if (uploadError) throw uploadError;

      // Fresh signed URL (1h) — visual-analysis fetches it server-side, so it
      // must stay valid after visual-uploads goes private. Identical
      // behaviour while the bucket is still public.
      const signedUrl = await mintFreshSignedUrl('visual-uploads', fileName);
      if (!signedUrl) throw new Error('Could not prepare the uploaded image for analysis');

      const certLabel = certificateTypes.find((c) => c.id === selectedCertType)?.fullName || '';
      const propLabel = propertyTypes.find((p) => p.id === selectedPropertyType)?.label || '';
      const scopeLabels = selectedScopes
        .map((s) => scopeAreas.find((a) => a.id === s)?.label)
        .join(', ');

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: signedUrl,
          analysis_settings: {
            mode: 'installation_verify',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            focus_areas: [
              `Certificate: ${certLabel}`,
              `Property: ${propLabel}`,
              `Scope: ${scopeLabels}`,
              additionalNotes,
            ].filter(Boolean),
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false,
          },
        },
      });

      const verificationData = data?.verification_checks || data?.analysis?.verification_checks;

      if (error) throw error;

      if (!verificationData) {
        toast({
          title: 'Invalid response',
          description: "The analysis didn't return verification results.",
          variant: 'destructive',
        });
        return;
      }

      setAnalysisProgress(100);
      setAnalysisResult(data?.verification_checks ? data : data.analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({ title: 'Analysis failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setImages([]);
    setAnalysisProgress(0);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <button
              type="button"
              onClick={() => navigate('/electrician-tools/ai-tooling')}
              aria-label="Back"
              className="text-white/85 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Eyebrow>INSTALL VERIFY</Eyebrow>
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-6 pt-6 pb-6 space-y-7 max-w-5xl mx-auto">
        {analysisResult?.verification_checks ? (
          <div className="space-y-4">
            <InstallationVerificationResults
              analysisResult={analysisResult}
              onStartChat={() => {}}
            />
            <button
              type="button"
              onClick={resetAnalysis}
              className="w-full text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              Verify another installation
            </button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" aria-hidden />
              <Eyebrow>VERIFYING</Eyebrow>
            </div>
            <p className="mt-3 text-[14px] text-white">
              Checking against BS 7671 A4:2026 requirements…
            </p>
            <p className="mt-1 text-[11.5px] text-white/65">
              BS 7671 cited · A4:2026 referenced
            </p>
            <div className="mt-4 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-elec-yellow rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
              />
            </div>
            <p className="mt-2 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums text-right">
              {Math.round(analysisProgress)}%
            </p>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="space-y-2">
              <Eyebrow>WHAT IT DOES</Eyebrow>
              <h1 className="text-[28px] sm:text-[36px] font-semibold tracking-tight leading-[1.05]">
                <span className="text-elec-yellow">Pass</span>{' '}
                <span className="text-white">/ fail in seconds.</span>
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/85 max-w-2xl">
                Photograph an installation. Get a BS 7671 compliance pass/fail with cited regs,
                priority risk ratings and a fix list — no guesswork.
              </p>
            </section>

            {/* 01 — Certificate type */}
            <section className="space-y-3">
              <Eyebrow>01 · CERTIFICATE TYPE</Eyebrow>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {certificateTypes.map((cert) => {
                  const active = selectedCertType === cert.id;
                  return (
                    <li key={cert.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedCertType(cert.id)}
                        className={cn(
                          'w-full text-left rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 transition-colors touch-manipulation',
                          active
                            ? 'border-elec-yellow/40'
                            : 'border-white/[0.10] hover:border-white/[0.20]'
                        )}
                      >
                        <Eyebrow>{cert.label}</Eyebrow>
                        <div
                          className={cn(
                            'mt-1.5 text-[14px] font-semibold tracking-tight',
                            active ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          {cert.fullName}
                        </div>
                        <p className="mt-0.5 text-[11px] text-white/65">{cert.desc}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 02 — Property type */}
            <section className="space-y-3">
              <Eyebrow>02 · PROPERTY TYPE</Eyebrow>
              <ul className="grid grid-cols-3 gap-2">
                {propertyTypes.map((prop) => {
                  const active = selectedPropertyType === prop.id;
                  return (
                    <li key={prop.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedPropertyType(prop.id)}
                        className={cn(
                          'w-full inline-flex flex-col items-center justify-center text-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-2xl px-3 py-3 min-h-[60px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        <span>{prop.label}</span>
                        <span
                          className={cn(
                            'mt-0.5 text-[9.5px] font-normal normal-case tracking-normal',
                            active ? 'text-elec-yellow/85' : 'text-white/65'
                          )}
                        >
                          {prop.desc}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 03 — Scope */}
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <Eyebrow>03 · SCOPE</Eyebrow>
                <span className="text-[10.5px] tabular-nums text-white/65">
                  {selectedScopes.length} area{selectedScopes.length === 1 ? '' : 's'}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {scopeAreas.map((scope) => {
                  const active = selectedScopes.includes(scope.id);
                  return (
                    <li key={scope.id}>
                      <button
                        type="button"
                        onClick={() => toggleScope(scope.id)}
                        className={cn(
                          'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        {scope.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 04 — Pre-checks */}
            <section className="space-y-3">
              <Eyebrow>04 · PRE-VERIFICATION CHECKLIST</Eyebrow>
              <ul className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] divide-y divide-white/[0.06]">
                {quickChecks.map((check) => {
                  const active = checkedItems.includes(check.id);
                  return (
                    <li key={check.id}>
                      <button
                        type="button"
                        onClick={() => toggleCheck(check.id)}
                        className="w-full flex items-center gap-3 px-5 py-3 text-left touch-manipulation hover:bg-white/[0.02] transition-colors"
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                            active
                              ? 'bg-elec-yellow border-elec-yellow text-black'
                              : 'border-white/30'
                          )}
                        >
                          {active && <Check className="h-3 w-3" strokeWidth={3} />}
                        </div>
                        <span
                          className={cn(
                            'text-[13px]',
                            active ? 'text-white' : 'text-white/85'
                          )}
                        >
                          {check.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 05 — Photos */}
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <Eyebrow>05 · INSTALLATION PHOTOS</Eyebrow>
                <span className="text-[10.5px] tabular-nums text-white/65">
                  {images.length} / 6
                </span>
              </div>
              <p className="text-[11.5px] text-white/65 -mt-1">
                Multiple angles: consumer unit front, internal, labels, earthing, etc.
              </p>

              <AnimatePresence>
                {isCameraActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-elec-yellow/30">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={captureImage}
                        className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
                      >
                        Capture
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        aria-label="Cancel"
                        className="h-11 w-11 rounded-full inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white/85 touch-manipulation transition-colors shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isCameraActive && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
                  >
                    Open camera
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
                  >
                    Upload
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.10]"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                        aria-label="Remove"
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 border border-white/20 flex items-center justify-center touch-manipulation"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {images.length < 6 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Add photo"
                      className="aspect-square rounded-xl border border-dashed border-white/[0.15] flex items-center justify-center hover:border-elec-yellow/40 transition-colors touch-manipulation"
                    >
                      <Plus className="h-5 w-5 text-white/65" />
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* 06 — Notes */}
            <section className="space-y-3">
              <Eyebrow>06 · ADDITIONAL NOTES</Eyebrow>
              <input
                type="text"
                placeholder="Age of installation, recent work, concerns…"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl border border-white/[0.10] bg-white/[0.04] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30"
                style={{ fontSize: '16px' }}
              />
            </section>

            {/* Verify */}
            {images.length > 0 && (
              <button
                type="button"
                onClick={handleAnalysis}
                className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-4 min-h-[52px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
              >
                Verify installation →
              </button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default InstallationVerifyPage;
