/**
 * FaultDiagnosisPage — editorial Fault Diagnosis screen.
 *
 * Drops the orange/red/amber gradient chrome and per-symptom icons.
 * Editorial eyebrows, type-led chips with critical-tone accent for HIGH
 * severity symptoms, gradient-surface cards, elec-yellow CTA. Logic
 * preserved (visual-analysis with image; visual-fault-diagnosis-rag for
 * text-only diagnosis).
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Loader2 } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import VisualAnalysisResults from '@/components/electrician-tools/ai-tools/VisualAnalysisResults';

const symptoms = [
  { id: 'burning', label: 'Burning / scorching', severity: 'high' },
  { id: 'tripping', label: 'Tripping / RCD', severity: 'high' },
  { id: 'water', label: 'Water damage', severity: 'high' },
  { id: 'exposed', label: 'Exposed wiring', severity: 'high' },
  { id: 'old', label: 'Old / outdated', severity: 'medium' },
  { id: 'damage', label: 'Physical damage', severity: 'medium' },
  { id: 'overheating', label: 'Overheating', severity: 'high' },
  { id: 'other', label: 'Other issue', severity: 'medium' },
];

const timeframes = [
  { id: 'just-now', label: 'Just noticed', urgency: 'high' },
  { id: 'today', label: 'Today', urgency: 'high' },
  { id: 'week', label: 'This week', urgency: 'medium' },
  { id: 'month', label: 'Ongoing', urgency: 'low' },
  { id: 'unknown', label: "Don't know", urgency: 'medium' },
];

const locations = [
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

const FaultDiagnosisPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('unknown');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
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
        [...prev, ...Array.from(files).filter((f) => f.type.startsWith('image/'))].slice(0, 4)
      );
    }
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleTextOnlyFaultDiagnosis = async () => {
    const symptomLabels = selectedSymptoms
      .map((s) => symptoms.find((sym) => sym.id === s)?.label)
      .filter(Boolean)
      .join(', ');

    const faultDescription = [symptomLabels, additionalNotes].filter(Boolean).join('. ');

    setIsAnalyzing(true);
    setAnalysisProgress(10);
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + 8, 70));
    }, 500);

    try {
      const { data, error } = await supabase.functions.invoke('visual-fault-diagnosis-rag', {
        body: {
          fault_description: faultDescription,
          location_context: selectedLocation || '',
          visible_indicators: selectedSymptoms
            .map((s) => symptoms.find((sym) => sym.id === s)?.label)
            .filter(Boolean),
        },
      });

      if (error) throw error;

      const faultCode = (data.fault_code as string) || 'FI';
      const isPass = faultCode === 'PASS';

      setAnalysisResult({
        findings: isPass
          ? []
          : [
              {
                description: data.reasoning || 'Fault identified based on your description.',
                eicr_code: faultCode as 'C1' | 'C2' | 'C3' | 'FI',
                confidence: data.confidence || 0.8,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                bs7671_clauses: (data.regulation_references || []).map((r: any) => r.number),
                fix_guidance: data.gn3_guidance || '',
              },
            ],
        recommendations: isPass
          ? []
          : [
              {
                action: data.gn3_guidance || 'Remedial action required.',
                priority:
                  faultCode === 'C1' ? 'immediate' : faultCode === 'C2' ? 'urgent' : 'recommended',
                bs7671_reference: data.regulation_references?.[0]?.number,
                eicr_code: (faultCode === 'FI' ? 'C3' : faultCode) as 'C1' | 'C2' | 'C3',
              },
            ],
        compliance_summary: {
          overall_assessment:
            faultCode === 'C1' || faultCode === 'C2' ? 'unsatisfactory' : 'satisfactory',
          c1_count: faultCode === 'C1' ? 1 : 0,
          c2_count: faultCode === 'C2' ? 1 : 0,
          c3_count: faultCode === 'C3' ? 1 : 0,
          fi_count: faultCode === 'FI' ? 1 : 0,
          safety_rating: isPass ? 100 : faultCode === 'C1' ? 20 : faultCode === 'C2' ? 50 : 75,
        },
        summary: isPass
          ? data.user_context_addressed ||
            'No immediate concerns from your description. Installation appears compliant.'
          : data.reasoning || '',
        rag_verified: true,
        verification_note:
          'Text-based diagnostic — verified against BS 7671:2018+A4:2026 and GN3. Add a photo for visual confirmation.',
      });

      setAnalysisProgress(100);
      toast({
        title: 'Diagnosis complete',
        description: isPass
          ? 'No immediate concerns from your description.'
          : `${faultCode} classification — see full diagnosis below.`,
        duration: 3000,
      });
    } catch {
      toast({ title: 'Analysis failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      const hasDescription = selectedSymptoms.length > 0 || additionalNotes.trim().length > 0;
      if (!hasDescription) {
        toast({
          title: 'Describe the fault first',
          description: 'Pick symptoms or add notes — or upload a photo.',
          variant: 'destructive',
        });
        return;
      }
      await handleTextOnlyFaultDiagnosis();
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + Math.random() * 10, 90));
    }, 500);

    try {
      const image = images[0];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const fileName = `${user?.id}/visual-analysis/fault-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, image);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

      const symptomLabels = selectedSymptoms
        .map((s) => symptoms.find((sym) => sym.id === s)?.label)
        .join(', ');
      const timeLabel = timeframes.find((t) => t.id === selectedTimeframe)?.label || '';

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: publicUrl,
          analysis_settings: {
            mode: 'fault_diagnosis',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            focus_areas: [
              `Symptoms: ${symptomLabels}`,
              `Timeframe: ${timeLabel}`,
              `Location: ${selectedLocation}`,
              additionalNotes,
            ].filter(Boolean),
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false,
          },
        },
      });

      if (error) throw error;

      setAnalysisProgress(100);
      setAnalysisResult(data?.analysis || data);
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
    setSelectedSymptoms([]);
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
            <Eyebrow>FAULT DIAGNOSIS</Eyebrow>
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-6 pt-6 pb-6 space-y-7 max-w-5xl mx-auto">
        {analysisResult?.compliance_summary ? (
          <div className="space-y-4">
            <VisualAnalysisResults
              analysisResult={{
                findings: analysisResult.findings,
                recommendations: analysisResult.recommendations || [],
                compliance_summary: analysisResult.compliance_summary,
                summary: analysisResult.summary || '',
              }}
              onStartChat={() => {}}
            />
            <button
              type="button"
              onClick={resetAnalysis}
              className="w-full text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              Diagnose another fault
            </button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" aria-hidden />
              <Eyebrow>DIAGNOSING</Eyebrow>
            </div>
            <p className="mt-3 text-[14px] text-white">
              Cross-referencing fault patterns + BS 7671…
            </p>
            <p className="mt-1 text-[11.5px] text-white/65">
              BS 7671 cited · GN3 guidance referenced
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
                <span className="text-elec-yellow">What's</span>{' '}
                <span className="text-white">wrong?</span>
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/85 max-w-2xl">
                Describe the symptoms or photograph the fault. Get the most likely cause, EICR
                classification (C1/C2/C3/FI), the BS 7671 reg cited, and a clear fix path.
              </p>
            </section>

            {/* 01 — Symptoms */}
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <Eyebrow>01 · WHAT YOU SEE</Eyebrow>
                {selectedSymptoms.length > 0 && (
                  <span className="text-[10.5px] tabular-nums text-white/65">
                    {selectedSymptoms.length} selected
                  </span>
                )}
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {symptoms.map((symptom) => {
                  const active = selectedSymptoms.includes(symptom.id);
                  const isCritical = symptom.severity === 'high';
                  return (
                    <li key={symptom.id}>
                      <button
                        type="button"
                        onClick={() => toggleSymptom(symptom.id)}
                        className={cn(
                          'w-full inline-flex flex-col items-start text-left text-[12px] font-semibold uppercase tracking-[0.12em] rounded-2xl px-4 py-3 min-h-[64px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        <span className="leading-tight">{symptom.label}</span>
                        {isCritical && (
                          <span
                            className={cn(
                              'mt-1.5 text-[9.5px] uppercase tracking-[0.16em] font-semibold',
                              active ? 'text-elec-yellow/85' : 'text-red-300'
                            )}
                          >
                            High severity
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 02 — Timeframe */}
            <section className="space-y-3">
              <Eyebrow>02 · WHEN STARTED</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {timeframes.map((time) => {
                  const active = selectedTimeframe === time.id;
                  return (
                    <li key={time.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedTimeframe(time.id)}
                        className={cn(
                          'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        {time.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 03 — Location */}
            <section className="space-y-3">
              <Eyebrow>03 · LOCATION</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {locations.map((loc) => {
                  const active = selectedLocation === loc;
                  return (
                    <li key={loc}>
                      <button
                        type="button"
                        onClick={() => setSelectedLocation(active ? '' : loc)}
                        className={cn(
                          'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        {loc}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 04 — Photo */}
            <section className="space-y-3">
              <Eyebrow>04 · PHOTO EVIDENCE</Eyebrow>
              <p className="text-[11.5px] text-white/65 -mt-1">
                Optional — text-only diagnosis works, but a photo sharpens the call.
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
                </div>
              )}
            </section>

            {/* 05 — Notes */}
            <section className="space-y-3">
              <Eyebrow>05 · DETAILS</Eyebrow>
              <input
                type="text"
                placeholder="Symptoms, what you've tested, anything unusual…"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl border border-white/[0.10] bg-white/[0.04] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30"
                style={{ fontSize: '16px' }}
              />
            </section>

            {/* Diagnose */}
            {(images.length > 0 ||
              selectedSymptoms.length > 0 ||
              additionalNotes.trim().length > 0) && (
              <button
                type="button"
                onClick={handleAnalysis}
                className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-4 min-h-[52px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
              >
                {images.length === 0 ? 'Diagnose from description →' : 'Diagnose fault →'}
              </button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default FaultDiagnosisPage;
