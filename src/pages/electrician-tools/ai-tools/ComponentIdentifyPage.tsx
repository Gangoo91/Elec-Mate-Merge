import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Camera,
  Upload,
  Search,
  X,
  Loader2,
  Sparkles,
  Cpu,
  Zap,
  Shield,
  Box,
  CircuitBoard,
  PlugZap,
  Gauge,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ComponentIdentificationResults from '@/components/electrician-tools/ai-tools/ComponentIdentificationResults';

// Component categories with icons
const componentCategories = [
  { id: 'protection', label: 'Protection Devices', icon: Shield },
  { id: 'distribution', label: 'Distribution', icon: Box },
  { id: 'control', label: 'Control Gear', icon: CircuitBoard },
  { id: 'accessories', label: 'Accessories', icon: PlugZap },
  { id: 'metering', label: 'Metering', icon: Gauge },
  { id: 'unknown', label: "Don't Know", icon: Search },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

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
        title: 'No Image',
        description: 'Please upload or capture a photo',
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
      // Upload image
      const image = images[0];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const fileName = `${user?.id}/visual-analysis/component-${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

      // Call analysis function
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
        console.error('Request settings:', {
          mode: 'component_identify',
          category: selectedCategory,
          info: selectedInfo,
          imageUrl: publicUrl,
        });

        toast({
          title: 'Analysis Failed',
          description: 'Please try again with a clearer photo',
          variant: 'destructive',
        });
        return;
      }

      console.log('Analysis response received:', {
        hasAnalysis: !!data?.analysis,
        hasComponent: !!data?.analysis?.component,
        componentName: data?.analysis?.component?.name,
        responseKeys: Object.keys(data || {}),
      });

      if (!data?.analysis?.component) {
        console.error('Response missing component:', data);
        toast({
          title: 'Component Not Identified',
          description: 'Please try again with a clearer photo',
          variant: 'destructive',
        });
        return;
      }

      setAnalysisProgress(100);
      setAnalysisResult(data.analysis);
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
    setSelectedCategory(null);
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
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Search className="h-4 w-4 text-blue-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Component Identification</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main className="px-4 py-4 space-y-5">
        {/* Results */}
        {analysisResult ? (
          <div className="space-y-4">
            <ComponentIdentificationResults
              analysisResult={analysisResult}
              onRetry={resetAnalysis}
            />
            <Button
              onClick={resetAnalysis}
              className="w-full h-12 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] font-semibold touch-manipulation active:scale-[0.98] hover:bg-white/[0.1]"
            >
              Identify Another Component
            </Button>
          </div>
        ) : isAnalyzing ? (
          /* Loading State */
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
              <div>
                <p className="text-sm font-medium text-white">Analysing...</p>
                <p className="text-xs text-white">Cross-referencing component database</p>
              </div>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Category Selection */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Component Type</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {componentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 transition-all touch-manipulation',
                      selectedCategory === cat.id
                        ? 'h-11 rounded-xl bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40 shadow-sm shadow-blue-500/10'
                        : 'h-11 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] active:scale-[0.97]'
                    )}
                  >
                    <cat.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Capture */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Capture Component</h2>
              <div className="space-y-3">
                {/* Camera View */}
                <AnimatePresence>
                  {isCameraActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={captureImage}
                          className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold touch-manipulation active:scale-[0.98]"
                        >
                          <Camera className="h-5 w-5 mr-2" />
                          Capture
                        </Button>
                        <Button
                          onClick={stopCamera}
                          className="h-12 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] touch-manipulation active:scale-[0.98] hover:bg-white/[0.1]"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                {!isCameraActive && (
                  <div className="flex gap-3">
                    <Button
                      onClick={startCamera}
                      className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold touch-manipulation active:scale-[0.98]"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Camera
                    </Button>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 h-12 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] font-semibold touch-manipulation active:scale-[0.98] hover:bg-white/[0.1]"
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
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/[0.08]"
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* What do you want to know? */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">What Do You Want To Know?</h2>
              <div className="flex flex-wrap gap-2">
                {infoChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => toggleInfo(chip.id)}
                    className={cn(
                      'px-3 text-sm font-medium transition-all touch-manipulation flex items-center gap-2',
                      selectedInfo.includes(chip.id)
                        ? 'h-9 rounded-xl bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40 shadow-sm shadow-blue-500/10'
                        : 'h-9 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] active:scale-[0.97]'
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
                className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-cyan-600"
              >
                <Search className="h-5 w-5 mr-2" />
                Identify Component
              </Button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </motion.main>
    </div>
  );
};

export default ComponentIdentifyPage;
