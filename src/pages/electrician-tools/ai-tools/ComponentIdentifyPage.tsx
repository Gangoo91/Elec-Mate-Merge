/**
 * ComponentIdentifyPage — editorial Quick Capture / Component ID screen.
 *
 * Drops the blue/cyan gradient chrome and per-category icons for the
 * editorial cadence: numbered eyebrows, gradient-surface cards,
 * type-led category and info chips, elec-yellow CTA. All logic
 * (camera capture, upload, analyse pipeline) preserved.
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';
import ComponentIdentificationResults from '@/components/electrician-tools/ai-tools/ComponentIdentificationResults';

// Component categories — type-led, no icons
const componentCategories = [
  { id: 'protection', label: 'Protection devices' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'control', label: 'Control gear' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'metering', label: 'Metering' },
  { id: 'unknown', label: "Don't know" },
];

const infoChips = [
  { id: 'specs', label: 'Specifications' },
  { id: 'bs7671', label: 'BS 7671 requirements' },
  { id: 'replacement', label: 'Replacement options' },
  { id: 'age', label: 'Age + compliance' },
  { id: 'installation', label: 'Installation notes' },
];

const ComponentIdentifyPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<string[]>(['specs', 'bs7671']);
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
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            setImages((prev) => [...prev, file]);
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
      const newImages = Array.from(files).filter((f) => f.type.startsWith('image/'));
      setImages((prev) => [...prev, ...newImages].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleInfo = (id: string) => {
    setSelectedInfo((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({
        title: 'No image',
        description: 'Capture or upload a photo first',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + Math.random() * 15, 90));
    }, 500);

    try {
      const image = images[0];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const fileName = `${user?.id}/visual-analysis/component-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: publicUrl,
          analysis_settings: {
            mode: 'component_identify',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            focus_areas: [
              `Category: ${selectedCategory || 'unknown'}`,
              `Info needed: ${selectedInfo.join(', ')}`,
            ],
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false,
          },
        },
      });

      if (error) {
        console.error('Analysis error:', error);
        toast({
          title: 'Analysis failed',
          description: 'Try again with a clearer photo',
          variant: 'destructive',
        });
        return;
      }

      if (!data?.analysis?.component) {
        toast({
          title: 'Component not identified',
          description: 'Try again with a clearer photo',
          variant: 'destructive',
        });
        return;
      }

      setAnalysisProgress(100);
      setAnalysisResult(data.analysis);
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
    setSelectedCategory(null);
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
            <Eyebrow>COMPONENT ID</Eyebrow>
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-6 pt-6 pb-6 space-y-7 max-w-5xl mx-auto">
        {analysisResult ? (
          <div className="space-y-4">
            <ComponentIdentificationResults
              analysisResult={analysisResult}
              onRetry={resetAnalysis}
            />
            <button
              type="button"
              onClick={resetAnalysis}
              className="w-full text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
            >
              Identify another component
            </button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" aria-hidden />
              <Eyebrow>ANALYSING</Eyebrow>
            </div>
            <p className="mt-3 text-[14px] text-white">
              Cross-referencing the component database…
            </p>
            <p className="mt-1 text-[11.5px] text-white/65">
              BS 7671 cited · Every claim referenced
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
                <span className="text-elec-yellow">Snap</span>{' '}
                <span className="text-white">it. Know it.</span>
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/85 max-w-2xl">
                Photograph any component. Get specs, applicable BS 7671 regs, replacement options,
                age estimate and install notes — every claim cited.
              </p>
            </section>

            {/* 01 — Category */}
            <section className="space-y-3">
              <Eyebrow>01 · COMPONENT TYPE</Eyebrow>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {componentCategories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCategory(active ? null : cat.id)
                        }
                        className={cn(
                          'w-full inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        {cat.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 02 — Capture */}
            <section className="space-y-3">
              <Eyebrow>02 · CAPTURE</Eyebrow>

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
                      <div className="absolute inset-3 border border-elec-yellow/40 rounded-xl pointer-events-none" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={captureImage}
                        className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
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
                <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5">
                  <p className="text-[12.5px] leading-relaxed text-white/85 mb-4">
                    Get the component square in frame, bright + flat lighting, no glare. Up to 4
                    photos.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
                    >
                      Open camera
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              {/* Image preview */}
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
                        onClick={() => removeImage(idx)}
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

            {/* 03 — What to know */}
            <section className="space-y-3">
              <Eyebrow>03 · WHAT TO KNOW</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {infoChips.map((chip) => {
                  const active = selectedInfo.includes(chip.id);
                  return (
                    <li key={chip.id}>
                      <button
                        type="button"
                        onClick={() => toggleInfo(chip.id)}
                        className={cn(
                          'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[36px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        {chip.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Analyse */}
            {images.length > 0 && (
              <button
                type="button"
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-4 min-h-[52px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-50"
              >
                Identify component →
              </button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default ComponentIdentifyPage;
