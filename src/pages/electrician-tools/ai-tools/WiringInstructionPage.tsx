/**
 * WiringInstructionPage — editorial Wiring Guide screen.
 *
 * Drops the per-circuit colour configs (~60 colour declarations across
 * domestic / commercial / industrial), the per-property gradient hero, and
 * all the inline icons. Editorial eyebrows, type-led property + circuit
 * pills, gradient-surface cards, elec-yellow CTA. All logic preserved
 * (camera, upload, wiring-diagram-generator-rag edge function, results via
 * WiringGuidanceDisplay).
 */

import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Loader2 } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import WiringGuidanceDisplay from '@/components/electrician-tools/ai-tools/WiringGuidanceDisplay';

const propertyTypes = [
  { id: 'domestic', label: 'Domestic', desc: 'Houses, flats, apartments' },
  { id: 'commercial', label: 'Commercial', desc: 'Offices, shops, restaurants' },
  { id: 'industrial', label: 'Industrial', desc: 'Factories, warehouses, workshops' },
];

const circuitsByProperty: Record<string, Array<{ id: string; label: string }>> = {
  domestic: [
    { id: 'consumer-unit', label: 'Consumer unit' },
    { id: 'lighting', label: 'Lighting circuit' },
    { id: 'ring-main', label: 'Ring main' },
    { id: 'cooker', label: 'Cooker / hob' },
    { id: 'shower', label: 'Electric shower' },
    { id: 'ev-charger', label: 'EV charger' },
    { id: 'immersion', label: 'Immersion heater' },
    { id: 'solar-pv', label: 'Solar PV' },
    { id: 'other', label: 'Other' },
  ],
  commercial: [
    { id: 'distribution-board', label: 'Distribution board' },
    { id: 'three-phase', label: '3-phase supply' },
    { id: 'commercial-lighting', label: 'Commercial lighting' },
    { id: 'hvac', label: 'HVAC systems' },
    { id: 'commercial-kitchen', label: 'Commercial kitchen' },
    { id: 'server-room', label: 'Server room / IT' },
    { id: 'emergency-lighting', label: 'Emergency lighting' },
    { id: 'refrigeration', label: 'Refrigeration' },
    { id: 'other', label: 'Other' },
  ],
  industrial: [
    { id: 'main-switchgear', label: 'Main switchgear' },
    { id: 'motor-control', label: 'Motor control centre' },
    { id: 'high-voltage', label: 'HV systems' },
    { id: 'industrial-lighting', label: 'Industrial lighting' },
    { id: 'ups-systems', label: 'UPS systems' },
    { id: 'plc-automation', label: 'PLC / automation' },
    { id: 'crane-hoist', label: 'Crane / hoist systems' },
    { id: 'welding', label: 'Welding equipment' },
    { id: 'other', label: 'Other' },
  ],
};

const installContexts = [
  { id: 'new', label: 'New install' },
  { id: 'replacement', label: 'Replacement' },
  { id: 'upgrade', label: 'Upgrade' },
  { id: 'extension', label: 'Extension' },
  { id: 'fault-repair', label: 'Fault repair' },
];

const earthingSystems = [
  { id: 'tn-c-s', label: 'TN-C-S (PME)' },
  { id: 'tn-s', label: 'TN-S' },
  { id: 'tt', label: 'TT' },
  { id: 'unknown', label: 'Unknown' },
];

const WiringInstructionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('domestic');
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);
  const [selectedContext, setSelectedContext] = useState<string>('new');
  const [selectedEarthing, setSelectedEarthing] = useState<string>('unknown');
  const [supplyAmps, setSupplyAmps] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [textDescription, setTextDescription] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [inputTab, setInputTab] = useState<'photo' | 'describe'>('describe');

  const currentCircuits = circuitsByProperty[selectedProperty] || circuitsByProperty.domestic;

  const currentStep = useMemo(() => {
    if (!selectedCircuit) return 2;
    return 3;
  }, [selectedCircuit]);

  const hasInput = images.length > 0 || textDescription.trim().length > 0;
  const canGenerate = selectedCircuit && hasInput;

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

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePropertyChange = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setSelectedCircuit(null);
  };

  const handleAnalysis = async () => {
    const hasImage = images.length > 0;
    const hasText = textDescription.trim().length > 0;

    if (!hasImage && !hasText) {
      toast({
        title: 'Add input',
        description: 'Upload a photo or describe the component',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + Math.random() * 12, 90));
    }, 600);

    try {
      let publicUrl: string | null = null;

      if (hasImage) {
        const image = images[0];
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const fileName = `${user?.id}/visual-analysis/wiring-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);
        publicUrl = urlData.publicUrl;
      }

      const circuitLabel = currentCircuits.find((c) => c.id === selectedCircuit)?.label || '';
      const earthingLabel = earthingSystems.find((e) => e.id === selectedEarthing)?.label || '';

      const { data, error } = await supabase.functions.invoke('wiring-diagram-generator-rag', {
        body: {
          component_image_url: publicUrl,
          component_description: hasText
            ? `${textDescription.trim()}${additionalNotes ? `. ${additionalNotes}` : ''}`
            : null,
          property_type: selectedProperty,
          circuit_type: circuitLabel,
          earthing_system: earthingLabel,
          supply_amps: supplyAmps || null,
        },
      });

      if (error) throw error;

      const wiringData = data?.wiring_schematic;
      if (!wiringData) {
        toast({
          title: 'Invalid response',
          description: "The analysis didn't return wiring instructions.",
          variant: 'destructive',
        });
        return;
      }

      setAnalysisProgress(100);
      setAnalysisResult(data);
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
    setTextDescription('');
    setSelectedCircuit(null);
    setAnalysisProgress(0);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11 max-w-5xl mx-auto">
            <button
              type="button"
              onClick={() => navigate('/electrician-tools/ai-tooling')}
              aria-label="Back"
              className="text-white/85 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Eyebrow>WIRING GUIDE</Eyebrow>

            {!analysisResult && !isAnalyzing && (
              <div className="ml-auto flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={cn(
                      'inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] tabular-nums',
                      currentStep >= s ? 'text-elec-yellow' : 'text-white/40'
                    )}
                  >
                    0{s}
                    {s < 3 && (
                      <span
                        className={cn(
                          'ml-2 w-4 h-px',
                          currentStep > s ? 'bg-elec-yellow/60' : 'bg-white/15'
                        )}
                      />
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main
        className={cn(
          'px-4 sm:px-6 pt-6 pb-6 space-y-7 max-w-5xl mx-auto',
          canGenerate && !analysisResult && !isAnalyzing && 'pb-28'
        )}
      >
        {analysisResult?.wiring_schematic ? (
          <div className="space-y-4">
            <WiringGuidanceDisplay
              componentName={analysisResult.wiring_schematic.component_name}
              componentDetails={analysisResult.wiring_schematic.component_details}
              wiringScenarios={
                analysisResult.wiring_schematic.wiring_scenarios || [
                  {
                    scenario_id: 'default',
                    scenario_name: 'Standard installation',
                    use_case: 'Standard BS 7671 compliant installation',
                    complexity: 'simple',
                    recommended: true,
                    wiring_steps: analysisResult.wiring_schematic.wiring_steps,
                    terminal_connections: analysisResult.wiring_schematic.terminal_connections,
                    safety_warnings: analysisResult.wiring_schematic.safety_warnings,
                    required_tests: analysisResult.wiring_schematic.required_tests,
                  },
                ]
              }
              comparison={analysisResult.wiring_schematic.comparison}
              ragSourcesCount={analysisResult.wiring_schematic.rag_sources}
              preInstallationTasks={analysisResult.wiring_schematic.pre_installation_tasks}
              boardLayoutGuide={analysisResult.wiring_schematic.board_layout_guide}
              wiringSequenceStrategy={analysisResult.wiring_schematic.wiring_sequence_strategy}
              practicalTips={analysisResult.wiring_schematic.practical_tips}
              commonMistakes={analysisResult.wiring_schematic.common_mistakes}
            />
            <button
              type="button"
              onClick={resetAnalysis}
              className="w-full text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              Get a new wiring guide
            </button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" aria-hidden />
              <Eyebrow>GENERATING</Eyebrow>
            </div>
            <p className="mt-3 text-[14px] text-white">
              {analysisProgress < 30
                ? 'Analysing the component…'
                : analysisProgress < 60
                  ? 'Pulling matched BS 7671 regs…'
                  : 'Composing the wiring guide…'}
            </p>
            <p className="mt-1 text-[11.5px] text-white/65">
              BS 7671 cited · GN3 + manufacturer guidance referenced
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
                <span className="text-elec-yellow">Wire</span>{' '}
                <span className="text-white">it right.</span>
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/85 max-w-2xl">
                Pick the property and circuit, drop in a photo or describe what you've got, get
                step-by-step UK-compliant wiring with cited regs, terminal connections, safety
                warnings, and the tests to run.
              </p>
            </section>

            {/* 01 — Property */}
            <section className="space-y-3">
              <Eyebrow>01 · PROPERTY TYPE</Eyebrow>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {propertyTypes.map((prop) => {
                  const active = selectedProperty === prop.id;
                  return (
                    <li key={prop.id}>
                      <button
                        type="button"
                        onClick={() => handlePropertyChange(prop.id)}
                        className={cn(
                          'w-full text-left rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 transition-colors touch-manipulation',
                          active
                            ? 'border-elec-yellow/40'
                            : 'border-white/[0.10] hover:border-white/[0.20]'
                        )}
                      >
                        <Eyebrow>{prop.label.toUpperCase()}</Eyebrow>
                        <p className="mt-1.5 text-[12px] text-white/85">{prop.desc}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 02 — Circuit */}
            <section className="space-y-3">
              <Eyebrow>02 · CIRCUIT TYPE</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {currentCircuits.map((circuit) => {
                  const active = selectedCircuit === circuit.id;
                  return (
                    <li key={circuit.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedCircuit(active ? null : circuit.id)}
                        className={cn(
                          'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                          active
                            ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                            : 'text-white/85 border-white/15 hover:border-white/30'
                        )}
                      >
                        {circuit.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 03 — Component (only after circuit picked) */}
            {selectedCircuit && (
              <>
                {/* Tab switcher */}
                <section className="space-y-3">
                  <Eyebrow>03 · COMPONENT</Eyebrow>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.10]">
                    {(['describe', 'photo'] as const).map((tab) => {
                      const active = inputTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setInputTab(tab)}
                          className={cn(
                            'inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.14em] rounded-full px-3 py-2 min-h-[36px] transition-colors touch-manipulation',
                            active
                              ? 'text-black bg-elec-yellow'
                              : 'text-white/85 hover:text-white'
                          )}
                        >
                          {tab === 'describe' ? 'Describe' : 'Photo'}
                        </button>
                      );
                    })}
                  </div>

                  {inputTab === 'describe' ? (
                    <textarea
                      placeholder="e.g. 'Hager 32A Type B MCB for ring main' or 'Schneider Acti9 RCBO'…"
                      value={textDescription}
                      onChange={(e) => setTextDescription(e.target.value)}
                      className="w-full min-h-[100px] px-4 py-3 rounded-2xl border border-white/[0.10] bg-white/[0.04] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 resize-none"
                      style={{ fontSize: '16px' }}
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                </section>

                {/* 04 — Context */}
                <section className="space-y-3">
                  <Eyebrow>04 · CONTEXT</Eyebrow>
                  <ul className="flex flex-wrap gap-1.5">
                    {installContexts.map((ctx) => {
                      const active = selectedContext === ctx.id;
                      return (
                        <li key={ctx.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedContext(ctx.id)}
                            className={cn(
                              'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                              active
                                ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                                : 'text-white/85 border-white/15 hover:border-white/30'
                            )}
                          >
                            {ctx.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                {/* 05 — Earthing + supply */}
                <section className="space-y-3">
                  <Eyebrow>05 · EARTHING + SUPPLY</Eyebrow>
                  <ul className="flex flex-wrap gap-1.5">
                    {earthingSystems.map((sys) => {
                      const active = selectedEarthing === sys.id;
                      return (
                        <li key={sys.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedEarthing(sys.id)}
                            className={cn(
                              'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-2 min-h-[40px] border transition-colors touch-manipulation',
                              active
                                ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                                : 'text-white/85 border-white/15 hover:border-white/30'
                            )}
                          >
                            {sys.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Supply amperage (e.g. 100A) — optional"
                    value={supplyAmps}
                    onChange={(e) => setSupplyAmps(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl border border-white/[0.10] bg-white/[0.04] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30 tabular-nums"
                    style={{ fontSize: '16px' }}
                  />
                </section>

                {/* 06 — Notes */}
                <section className="space-y-3">
                  <Eyebrow>06 · ADDITIONAL NOTES</Eyebrow>
                  <input
                    type="text"
                    placeholder="Cable run, location, special conditions…"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl border border-white/[0.10] bg-white/[0.04] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/30"
                    style={{ fontSize: '16px' }}
                  />
                </section>
              </>
            )}

            {/* Generate */}
            {canGenerate && (
              <button
                type="button"
                onClick={handleAnalysis}
                className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-5 py-4 min-h-[52px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
              >
                Generate wiring guide →
              </button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default WiringInstructionPage;
