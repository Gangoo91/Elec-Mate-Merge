import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Camera, Upload, Search, X, Loader2, Sparkles,
  Cpu, Zap, Shield, Box, CircuitBoard, PlugZap, Power, Gauge
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ComponentIdentificationResults from "@/components/electrician-tools/ai-tools/ComponentIdentificationResults";

// Component categories with icons
const componentCategories = [
  { id: 'protection', label: 'Protection Devices', icon: Shield, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
  { id: 'distribution', label: 'Distribution', icon: Box, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { id: 'control', label: 'Control Gear', icon: CircuitBoard, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'accessories', label: 'Accessories', icon: PlugZap, color: 'text-green-400 bg-green-500/10 border-green-500/30' },
  { id: 'metering', label: 'Metering', icon: Gauge, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'unknown', label: "Don't Know", icon: Search, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
];

// What user wants to know
const infoChips = [
  { id: 'specs', label: 'Specifications', icon: Cpu },
  { id: 'bs7671', label: 'BS 7671 Requirements', icon: Shield },
  { id: 'replacement', label: 'Replacement Options', icon: Box },
  { id: 'age', label: 'Age & Compliance', icon: Gauge },
  { id: 'installation', label: 'Installation Notes', icon: Zap },
];

const ComponentIdentifyPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
  const [images, setImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<string[]>(['specs', 'bs7671']);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
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
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          setImages(prev => [...prev, file]);
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).filter(f => f.type.startsWith('image/'));
      setImages(prev => [...prev, ...newImages].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleInfo = (id: string) => {
    setSelectedInfo(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({ title: "No Image", description: "Please upload or capture a photo", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + Math.random() * 15, 90));
    }, 500);

    try {
      // Upload image
      const image = images[0];
      const { data: { user } } = await supabase.auth.getUser();
      const fileName = `${user?.id}/visual-analysis/component-${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('visual-uploads')
        .getPublicUrl(fileName);

      // Call analysis function
      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: publicUrl,
          analysis_settings: {
            mode: 'component_identify',
            confidence_threshold: 0.5,
            enable_bounding_boxes: false,
            focus_areas: [`Category: ${selectedCategory || 'unknown'}`, `Info needed: ${selectedInfo.join(', ')}`],
            remove_background: false,
            bs7671_compliance: true,
            fast_mode: false
          }
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
    setSelectedCategory(null);
    setAnalysisProgress(0);
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 pt-safe">
        <div className="px-4 py-2">
          <button
            onClick={() => navigate('/electrician-tools/ai-tooling')}
            className="flex items-center gap-2 text-foreground h-11 touch-manipulation active:scale-[0.98] transition-all -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">AI Tools</span>
          </button>
        </div>
      </div>

      <main className="px-4 py-5 space-y-5 max-w-2xl mx-auto">
        {/* Hero */}
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-card to-card/90 backdrop-blur-xl p-5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-transparent pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
              <Search className="h-7 w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Component Identification</h1>
              <p className="text-sm text-muted-foreground">Identify specs & BS 7671 requirements</p>
            </div>
          </div>
        </div>

        {/* Results */}
        {analysisResult ? (
          <div className="space-y-4">
            <ComponentIdentificationResults analysisResult={analysisResult} />
            <Button onClick={resetAnalysis} variant="outline" className="w-full h-12">
              Identify Another Component
            </Button>
          </div>
        ) : isAnalyzing ? (
          /* Loading State */
          <div className="rounded-xl border border-border/30 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              <div>
                <h3 className="font-semibold text-foreground">Identifying Component...</h3>
                <p className="text-xs text-muted-foreground">Analyzing image and cross-referencing database</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Category Selection */}
            <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Box className="h-5 w-5 text-blue-400" />
                <h2 className="font-semibold text-foreground">Component Type</h2>
                <span className="text-xs text-muted-foreground">(optional)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {componentCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all min-h-[70px]",
                      "flex flex-col items-center justify-center gap-2 text-center",
                      selectedCategory === cat.id
                        ? cat.color
                        : "border-border/30 bg-background/50 hover:border-border/50"
                    )}
                  >
                    <cat.icon className={cn("h-5 w-5", selectedCategory === cat.id ? "" : "text-muted-foreground")} />
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Capture */}
            <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-400" />
                <h2 className="font-semibold text-foreground">Capture Component</h2>
              </div>

              {/* Camera View */}
              <AnimatePresence>
                {isCameraActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                      <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={captureImage} className="flex-1 h-12 bg-blue-500 hover:bg-blue-600">
                        <Camera className="h-5 w-5 mr-2" />
                        Capture
                      </Button>
                      <Button onClick={stopCamera} variant="outline" className="h-12">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              {!isCameraActive && (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={startCamera}
                    className="h-14 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Camera
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="h-14 border-blue-500/30 hover:bg-blue-500/10"
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
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 border-blue-500/30">
                      <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What do you want to know? */}
            <div className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <h2 className="font-semibold text-foreground">What do you want to know?</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {infoChips.map(chip => (
                  <button
                    key={chip.id}
                    onClick={() => toggleInfo(chip.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all",
                      "min-h-[44px] flex items-center gap-2",
                      selectedInfo.includes(chip.id)
                        ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                        : "border-border/30 text-muted-foreground hover:border-border/50"
                    )}
                  >
                    <chip.icon className="h-4 w-4" />
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Analyse Button */}
            {images.length > 0 && (
              <Button
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className={cn(
                  "w-full h-14 text-base font-semibold rounded-xl",
                  "bg-gradient-to-r from-blue-500 to-blue-600",
                  "hover:from-blue-600 hover:to-blue-700",
                  "text-white shadow-lg shadow-blue-500/25"
                )}
              >
                <Search className="h-5 w-5 mr-2" />
                Identify Component
              </Button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default ComponentIdentifyPage;
