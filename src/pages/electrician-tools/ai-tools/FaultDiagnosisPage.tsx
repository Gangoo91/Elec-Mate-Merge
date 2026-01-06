import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Camera, Upload, AlertTriangle, X, Loader2, Sparkles,
  Flame, Zap, Droplets, ShieldAlert, Clock, Eye, ThermometerSun, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import VisualAnalysisResults from "@/components/electrician-tools/ai-tools/VisualAnalysisResults";

// Symptoms with visual icons
const symptoms = [
  { id: 'burning', label: 'Burning/Scorching', icon: Flame, color: 'text-red-400 bg-red-500/10 border-red-500/30', severity: 'high' },
  { id: 'tripping', label: 'Tripping/RCD', icon: Zap, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30', severity: 'high' },
  { id: 'water', label: 'Water Damage', icon: Droplets, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', severity: 'high' },
  { id: 'exposed', label: 'Exposed Wiring', icon: ShieldAlert, color: 'text-red-400 bg-red-500/10 border-red-500/30', severity: 'high' },
  { id: 'old', label: 'Old/Outdated', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', severity: 'medium' },
  { id: 'damage', label: 'Physical Damage', icon: Eye, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', severity: 'medium' },
  { id: 'overheating', label: 'Overheating', icon: ThermometerSun, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30', severity: 'high' },
  { id: 'other', label: 'Other Issue', icon: AlertTriangle, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30', severity: 'medium' },
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
  'Consumer Unit', 'Kitchen', 'Bathroom', 'Bedroom', 'Living Room',
  'Garage', 'Outdoor', 'Loft', 'Other'
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
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Calculate overall urgency
  const getUrgencyLevel = () => {
    const highSeveritySelected = selectedSymptoms.some(s =>
      symptoms.find(sym => sym.id === s)?.severity === 'high'
    );
    const timeUrgency = timeframes.find(t => t.id === selectedTimeframe)?.urgency;

    if (highSeveritySelected && timeUrgency === 'high') return 'critical';
    if (highSeveritySelected || timeUrgency === 'high') return 'high';
    return 'medium';
  };

  const urgencyLevel = getUrgencyLevel();

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast({ title: "Camera Error", description: "Unable to access camera", variant: "destructive" });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
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
      canvas.toBlob((blob) => {
        if (blob) {
          setImages(prev => [...prev, new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })]);
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setImages(prev => [...prev, ...Array.from(files).filter(f => f.type.startsWith('image/'))].slice(0, 4));
    }
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({ title: "No Image", description: "Please upload photos of the fault", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + Math.random() * 10, 90));
    }, 500);

    try {
      const image = images[0];
      const fileName = `fault-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage.from('visual-analysis').upload(fileName, image);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('visual-analysis').getPublicUrl(fileName);

      const symptomLabels = selectedSymptoms.map(s => symptoms.find(sym => sym.id === s)?.label).join(', ');
      const timeLabel = timeframes.find(t => t.id === selectedTimeframe)?.label || '';

      const { data, error } = await supabase.functions.invoke('visual-electrical-analysis', {
        body: {
          imageUrl: publicUrl,
          analysisMode: 'fault_diagnosis',
          userContext: `Symptoms: ${symptomLabels}. Timeframe: ${timeLabel}. Location: ${selectedLocation}. Notes: ${additionalNotes}`
        }
      });

      if (error) throw error;
      setAnalysisProgress(100);
      setAnalysisResult(data);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({ title: "Analysis Failed", description: "Please try again", variant: "destructive" });
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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="px-4 py-3">
          <button onClick={() => navigate('/electrician-tools/ai-tooling')} className="flex items-center gap-2 text-foreground min-h-[44px]">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">AI Tools</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-2xl mx-auto">
        {/* Hero with Urgency Indicator */}
        <div className={cn(
          "rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-5 overflow-hidden relative",
          urgencyLevel === 'critical' ? "border-red-500/50 from-red-500/20 via-card to-card/90" :
          urgencyLevel === 'high' ? "border-orange-500/30 from-orange-500/10 via-card to-card/90" :
          "border-amber-500/30 from-amber-500/10 via-card to-card/90"
        )}>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl border",
                urgencyLevel === 'critical' ? "bg-red-500/20 border-red-500/30" :
                urgencyLevel === 'high' ? "bg-orange-500/20 border-orange-500/30" :
                "bg-amber-500/20 border-amber-500/30"
              )}>
                <AlertTriangle className={cn(
                  "h-7 w-7",
                  urgencyLevel === 'critical' ? "text-red-400" :
                  urgencyLevel === 'high' ? "text-orange-400" : "text-amber-400"
                )} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Fault Diagnosis</h1>
                <p className="text-sm text-muted-foreground">Identify issues & get rectification steps</p>
              </div>
            </div>
            {selectedSymptoms.length > 0 && (
              <Badge className={cn(
                "text-xs",
                urgencyLevel === 'critical' ? "bg-red-500/20 text-red-400 border-red-500/30" :
                urgencyLevel === 'high' ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                "bg-amber-500/20 text-amber-400 border-amber-500/30"
              )}>
                {urgencyLevel === 'critical' ? 'URGENT' : urgencyLevel.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        {analysisResult?.compliance_summary ? (
          <div className="space-y-4">
            <VisualAnalysisResults
              analysisResult={{
                findings: analysisResult.findings,
                recommendations: analysisResult.recommendations || [],
                compliance_summary: analysisResult.compliance_summary,
                summary: analysisResult.summary || ''
              }}
              onStartChat={() => {}}
            />
            <Button onClick={resetAnalysis} variant="outline" className="w-full h-12">
              Diagnose Another Fault
            </Button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-xl border border-orange-500/30 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-orange-400" />
              <div>
                <h3 className="font-semibold text-foreground">Analyzing Fault...</h3>
                <p className="text-xs text-muted-foreground">Identifying issues and safety concerns</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full bg-orange-500" initial={{ width: 0 }} animate={{ width: `${analysisProgress}%` }} />
            </div>
          </div>
        ) : (
          <>
            {/* Symptom Selection - Visual Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="font-semibold text-foreground">What symptoms do you see?</h2>
                {selectedSymptoms.length > 0 && (
                  <Badge variant="secondary" className="text-xs">{selectedSymptoms.length} selected</Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map(symptom => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={cn(
                        "relative p-4 rounded-xl border-2 transition-all",
                        "min-h-[80px] flex flex-col items-center justify-center gap-2",
                        isSelected ? symptom.color : "border-border/30 bg-card/50 hover:border-border/50"
                      )}
                    >
                      <symptom.icon className={cn("h-6 w-6", isSelected ? "" : "text-muted-foreground")} />
                      <span className={cn("text-sm font-medium text-center", isSelected ? "text-foreground" : "text-muted-foreground")}>
                        {symptom.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <Check className="h-4 w-4 text-current" />
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

            {/* When Did It Start - Timeline */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                When did you first notice this?
              </h3>
              <div className="flex flex-wrap gap-2">
                {timeframes.map(time => (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTimeframe(time.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all min-h-[44px]",
                      selectedTimeframe === time.id
                        ? time.urgency === 'high'
                          ? "bg-red-500/20 border-red-500/40 text-red-400"
                          : "bg-orange-500/20 border-orange-500/40 text-orange-400"
                        : "border-border/30 text-muted-foreground hover:border-border/50"
                    )}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Quick Select */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm">Location in Property</h3>
              <div className="flex flex-wrap gap-2">
                {locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-xs font-medium transition-all min-h-[36px]",
                      selectedLocation === loc
                        ? "bg-orange-500/20 border-orange-500/40 text-orange-400"
                        : "border-border/30 text-muted-foreground hover:border-border/50"
                    )}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Capture */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-orange-400" />
                <h3 className="font-semibold text-foreground">Photo Evidence</h3>
              </div>

              <AnimatePresence>
                {isCameraActive && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="space-y-3 overflow-hidden">
                    <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={captureImage} className="flex-1 h-12 bg-orange-500 hover:bg-orange-600">Capture</Button>
                      <Button onClick={stopCamera} variant="outline" className="h-12"><X className="h-5 w-5" /></Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isCameraActive && (
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={startCamera} className="h-14 bg-orange-500 hover:bg-orange-600 text-white">
                    <Camera className="h-5 w-5 mr-2" />Camera
                  </Button>
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="h-14 border-orange-500/30">
                    <Upload className="h-5 w-5 mr-2" />Upload
                  </Button>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => handleFileSelect(e.target.files)} className="hidden" />

              {images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-orange-500/30">
                      <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full">
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm">Additional Details</h3>
              <input
                type="text"
                placeholder="Describe what you observed..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border/30 bg-background/50 text-foreground"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Analyse Button */}
            {images.length > 0 && (
              <Button
                onClick={handleAnalysis}
                className={cn(
                  "w-full h-14 text-base font-semibold rounded-xl",
                  "bg-gradient-to-r from-orange-500 to-red-500",
                  "hover:from-orange-600 hover:to-red-600",
                  "text-white shadow-lg shadow-orange-500/25"
                )}
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Diagnose Fault
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
