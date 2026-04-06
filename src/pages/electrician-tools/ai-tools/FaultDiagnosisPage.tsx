import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Camera,
  Upload,
  AlertTriangle,
  X,
  Loader2,
  Sparkles,
  Flame,
  Zap,
  Droplets,
  ShieldAlert,
  Clock,
  Eye,
  ThermometerSun,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import VisualAnalysisResults from '@/components/electrician-tools/ai-tools/VisualAnalysisResults';

// Symptoms with visual icons
const symptoms = [
  {
    id: 'burning',
    label: 'Burning/Scorching',
    icon: Flame,
    color: 'text-red-400 bg-red-500/10 border-red-500/30',
    severity: 'high',
  },
  {
    id: 'tripping',
    label: 'Tripping/RCD',
    icon: Zap,
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    severity: 'high',
  },
  {
    id: 'water',
    label: 'Water Damage',
    icon: Droplets,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    severity: 'high',
  },
  {
    id: 'exposed',
    label: 'Exposed Wiring',
    icon: ShieldAlert,
    color: 'text-red-400 bg-red-500/10 border-red-500/30',
    severity: 'high',
  },
  {
    id: 'old',
    label: 'Old/Outdated',
    icon: Clock,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    severity: 'medium',
  },
  {
    id: 'damage',
    label: 'Physical Damage',
    icon: Eye,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    severity: 'medium',
  },
  {
    id: 'overheating',
    label: 'Overheating',
    icon: ThermometerSun,
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    severity: 'high',
  },
  {
    id: 'other',
    label: 'Other Issue',
    icon: AlertTriangle,
    color: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
    severity: 'medium',
  },
];

// When did it start options
const timeframes = [
  { id: 'just-now', label: 'Just noticed', urgency: 'high' },
  { id: 'today', label: 'Today', urgency: 'high' },
  { id: 'week', label: 'This week', urgency: 'medium' },
  { id: 'month', label: 'Ongoing', urgency: 'low' },
  { id: 'unknown', label: "Don't know", urgency: 'medium' },
];

// Location in property
const locations = [
  'Consumer Unit',
  'Kitchen',
  'Bathroom',
  'Bedroom',
  'Living Room',
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

  // State
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

  // Calculate overall urgency
  const getUrgencyLevel = () => {
    const highSeveritySelected = selectedSymptoms.some(
      (s) => symptoms.find((sym) => sym.id === s)?.severity === 'high'
    );
    const timeUrgency = timeframes.find((t) => t.id === selectedTimeframe)?.urgency;

    if (highSeveritySelected && timeUrgency === 'high') return 'critical';
    if (highSeveritySelected || timeUrgency === 'high') return 'high';
    return 'medium';
  };

  const urgencyLevel = getUrgencyLevel();

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast({
        title: 'Camera Error',
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

  // Text-only path — routes to visual-fault-diagnosis-rag when no image provided
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

      // Map RAG response to the shape VisualAnalysisResults expects
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
          'Text-based diagnostic — verified against BS 7671:2018+A3:2024 and GN3. Add a photo for visual confirmation.',
      });

      setAnalysisProgress(100);
      toast({
        title: 'Diagnosis complete',
        description: isPass
          ? 'No immediate concerns from your description.'
          : `${faultCode} classification — see full diagnosis below.`,
        duration: 3000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({ title: 'Analysis Failed', description: 'Please try again', variant: 'destructive' });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const handleAnalysis = async () => {
    // Text-only path when no image — route to RAG function using symptoms + notes
    if (images.length === 0) {
      const hasDescription = selectedSymptoms.length > 0 || additionalNotes.trim().length > 0;
      if (!hasDescription) {
        toast({
          title: 'Describe the fault first',
          description: 'Select symptoms or add a description, or upload a photo of the fault.',
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

      console.log('🔍 Fault Diagnosis Response:', {
        data,
        error,
        hasAnalysis: !!data?.analysis,
        hasComplianceSummary: !!(data?.compliance_summary || data?.analysis?.compliance_summary),
      });

      if (error) {
        console.error('❌ Fault diagnosis error:', error);
        throw error;
      }

      setAnalysisProgress(100);
      // Unwrap if wrapped in analysis
      setAnalysisResult(data?.analysis || data);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({ title: 'Analysis Failed', description: 'Please try again', variant: 'destructive' });
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
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate('/electrician-tools/ai-tooling')} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <h1 className="text-base font-semibold text-white">Fault Diagnosis</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
        {/* Results */}
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
            <Button onClick={resetAnalysis} variant="outline" className="w-full h-12">
              Diagnose Another Fault
            </Button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
              <div>
                <h3 className="font-semibold text-white">Analysing Fault...</h3>
                <p className="text-xs text-white">Identifying issues and safety concerns</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Symptom Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">What symptoms do you see?</h2>
                {selectedSymptoms.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedSymptoms.length} selected
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={cn(
                        'relative p-4 rounded-xl transition-all touch-manipulation',
                        'min-h-[80px] flex flex-col items-center justify-center gap-2',
                        isSelected
                          ? 'h-11 rounded-xl bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40 shadow-sm shadow-orange-500/10'
                          : 'h-11 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] active:scale-[0.97] transition-all'
                      )}
                    >
                      <symptom.icon
                        className={cn('h-6 w-6', isSelected ? 'text-orange-400' : 'text-white')}
                      />
                      <span
                        className={cn(
                          'text-sm font-medium text-center',
                          isSelected ? 'text-orange-400' : 'text-white'
                        )}
                      >
                        {symptom.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-4 w-4 text-orange-400" />
                        </div>
                      )}
                      {symptom.severity === 'high' && (
                        <div className="absolute top-2 left-2">
                          <ShieldAlert className="h-3 w-3 text-red-400" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* When Did It Start */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">When did you first notice this?</h2>
              <div className="flex flex-wrap gap-2">
                {timeframes.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTimeframe(time.id)}
                    className={cn(
                      'px-4 py-2.5 text-sm font-medium transition-all min-h-[44px]',
                      selectedTimeframe === time.id
                        ? 'h-11 rounded-xl bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40 shadow-sm shadow-orange-500/10 touch-manipulation'
                        : 'h-11 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] touch-manipulation active:scale-[0.97] transition-all'
                    )}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Quick Select */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Location in Property</h2>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={cn(
                      'px-3 py-2 text-xs font-medium transition-all min-h-[44px]',
                      selectedLocation === loc
                        ? 'h-11 rounded-xl bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40 shadow-sm shadow-orange-500/10 touch-manipulation'
                        : 'h-11 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] touch-manipulation active:scale-[0.97] transition-all'
                    )}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Capture */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Photo Evidence</h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {isCameraActive && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={captureImage}
                          className="flex-1 h-12 bg-orange-500 hover:bg-orange-600"
                        >
                          Capture
                        </Button>
                        <Button onClick={stopCamera} variant="outline" className="h-12">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isCameraActive && (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={startCamera}
                      className="h-14 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Camera
                    </Button>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="ghost"
                      className="h-14 bg-white/[0.06] ring-1 ring-white/[0.08] text-white hover:text-white hover:bg-white/[0.1]"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload
                    </Button>
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
                        className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.08]"
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Additional Details</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Describe the fault, symptoms, or what you have already tested..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-white/[0.08] bg-background/50 text-white"
                  style={{ fontSize: '16px' }}
                />
                {images.length === 0 && (
                  <p className="text-xs text-white">
                    Add a photo above for visual analysis, or select symptoms and describe the
                    fault here to get a text-based diagnosis without one.
                  </p>
                )}
              </div>
            </div>

            {/* Analyse Button */}
            {(images.length > 0 ||
              selectedSymptoms.length > 0 ||
              additionalNotes.trim().length > 0) && (
              <Button
                onClick={handleAnalysis}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-orange-500/20"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                {images.length === 0 ? 'Diagnose from Description' : 'Diagnose Fault'}
              </Button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default FaultDiagnosisPage;
