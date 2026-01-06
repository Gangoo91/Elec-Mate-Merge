import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Camera, Upload, CheckCircle, X, Loader2, Sparkles,
  FileCheck, ClipboardList, FileText, Home, Building, Factory,
  Plus, Shield, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import InstallationVerificationResults from "@/components/electrician-tools/ai-tools/InstallationVerificationResults";

// Certificate types
const certificateTypes = [
  {
    id: 'eic',
    label: 'EIC',
    fullName: 'Electrical Installation Certificate',
    desc: 'New installations',
    icon: FileCheck,
    color: 'text-green-400 bg-green-500/10 border-green-500/30'
  },
  {
    id: 'eicr',
    label: 'EICR',
    fullName: 'Condition Report',
    desc: 'Periodic inspection',
    icon: ClipboardList,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
  },
  {
    id: 'minor-works',
    label: 'Minor Works',
    fullName: 'Minor Electrical Works',
    desc: 'Small alterations',
    icon: FileText,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
  },
];

// Property types
const propertyTypes = [
  { id: 'domestic', label: 'Domestic', icon: Home, desc: 'House/Flat' },
  { id: 'commercial', label: 'Commercial', icon: Building, desc: 'Office/Shop' },
  { id: 'industrial', label: 'Industrial', icon: Factory, desc: 'Factory/Warehouse' },
];

// Installation scope areas
const scopeAreas = [
  { id: 'consumer-unit', label: 'Consumer Unit' },
  { id: 'distribution', label: 'Distribution Board' },
  { id: 'lighting', label: 'Lighting Circuits' },
  { id: 'power', label: 'Power Circuits' },
  { id: 'outdoor', label: 'Outdoor Installation' },
  { id: 'earthing', label: 'Earthing & Bonding' },
  { id: 'rcd', label: 'RCD Protection' },
  { id: 'special', label: 'Special Locations' },
];

// Quick checks to verify
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

  // State
  const [images, setImages] = useState<File[]>([]);
  const [selectedCertType, setSelectedCertType] = useState<string>('eicr');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('domestic');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['consumer-unit']);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

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
      setImages(prev => [...prev, ...Array.from(files).filter(f => f.type.startsWith('image/'))].slice(0, 6));
    }
  };

  const toggleScope = (id: string) => {
    setSelectedScopes(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({ title: "No Images", description: "Please upload photos of the installation", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + Math.random() * 8, 90));
    }, 600);

    try {
      const image = images[0];
      const fileName = `verify-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage.from('visual-analysis').upload(fileName, image);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('visual-analysis').getPublicUrl(fileName);

      const certLabel = certificateTypes.find(c => c.id === selectedCertType)?.fullName || '';
      const propLabel = propertyTypes.find(p => p.id === selectedPropertyType)?.label || '';
      const scopeLabels = selectedScopes.map(s => scopeAreas.find(a => a.id === s)?.label).join(', ');

      const { data, error } = await supabase.functions.invoke('visual-electrical-analysis', {
        body: {
          imageUrl: publicUrl,
          analysisMode: 'installation_verify',
          userContext: `Certificate: ${certLabel}. Property: ${propLabel}. Scope: ${scopeLabels}. Notes: ${additionalNotes}`
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
    setAnalysisProgress(0);
  };

  const selectedCert = certificateTypes.find(c => c.id === selectedCertType);

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
        {/* Hero */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-card to-card/90 backdrop-blur-xl p-5 overflow-hidden relative">
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
              <CheckCircle className="h-7 w-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Installation Verification</h1>
              <p className="text-sm text-muted-foreground">BS 7671 compliance check</p>
            </div>
          </div>
        </div>

        {/* Results */}
        {analysisResult?.verification_checks ? (
          <div className="space-y-4">
            <InstallationVerificationResults
              analysisResult={analysisResult}
              onStartChat={() => {}}
            />
            <Button onClick={resetAnalysis} variant="outline" className="w-full h-12">
              Verify Another Installation
            </Button>
          </div>
        ) : isAnalyzing ? (
          <div className="rounded-xl border border-cyan-500/30 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
              <div>
                <h3 className="font-semibold text-foreground">Verifying Installation...</h3>
                <p className="text-xs text-muted-foreground">Checking against BS 7671 requirements</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full bg-cyan-500" initial={{ width: 0 }} animate={{ width: `${analysisProgress}%` }} />
            </div>
          </div>
        ) : (
          <>
            {/* Certificate Type - Card Selection */}
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground px-1">Certificate Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {certificateTypes.map(cert => (
                  <button
                    key={cert.id}
                    onClick={() => setSelectedCertType(cert.id)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all",
                      "min-h-[100px] flex flex-col items-center justify-center gap-2 text-center",
                      selectedCertType === cert.id ? cert.color : "border-border/30 bg-card/50 hover:border-border/50"
                    )}
                  >
                    <cert.icon className={cn("h-6 w-6", selectedCertType === cert.id ? "" : "text-muted-foreground")} />
                    <div>
                      <span className="text-sm font-bold block">{cert.label}</span>
                      <span className="text-[10px] text-muted-foreground">{cert.desc}</span>
                    </div>
                    {selectedCertType === cert.id && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm">Property Type</h3>
              <div className="grid grid-cols-3 gap-2">
                {propertyTypes.map(prop => (
                  <button
                    key={prop.id}
                    onClick={() => setSelectedPropertyType(prop.id)}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 min-h-[70px]",
                      selectedPropertyType === prop.id
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                        : "border-border/30 text-muted-foreground hover:border-border/50"
                    )}
                  >
                    <prop.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{prop.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope of Verification */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  What are you verifying?
                </h3>
                <Badge variant="secondary" className="text-xs">{selectedScopes.length} areas</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {scopeAreas.map(scope => (
                  <button
                    key={scope.id}
                    onClick={() => toggleScope(scope.id)}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-xs font-medium transition-all min-h-[36px]",
                      selectedScopes.includes(scope.id)
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                        : "border-border/30 text-muted-foreground hover:border-border/50"
                    )}
                  >
                    {scope.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Checks - Pre-flight */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                Pre-verification Checklist
              </h3>
              <div className="space-y-2">
                {quickChecks.map(check => (
                  <button
                    key={check.id}
                    onClick={() => toggleCheck(check.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left min-h-[48px]",
                      checkedItems.includes(check.id)
                        ? "bg-cyan-500/10 border-cyan-500/30"
                        : "border-border/30 hover:border-border/50"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                      checkedItems.includes(check.id)
                        ? "bg-cyan-500 border-cyan-500"
                        : "border-muted-foreground/30"
                    )}>
                      {checkedItems.includes(check.id) && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={cn(
                      "text-sm",
                      checkedItems.includes(check.id) ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {check.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Capture - Multi-photo encouraged */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-cyan-400" />
                  <h3 className="font-semibold text-foreground">Installation Photos</h3>
                </div>
                <Badge variant="outline" className="text-xs">{images.length}/6</Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Capture multiple angles: consumer unit front, internal, labels, earthing, etc.
              </p>

              <AnimatePresence>
                {isCameraActive && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="space-y-3 overflow-hidden">
                    <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={captureImage} className="flex-1 h-12 bg-cyan-500 hover:bg-cyan-600">Capture</Button>
                      <Button onClick={stopCamera} variant="outline" className="h-12"><X className="h-5 w-5" /></Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isCameraActive && (
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={startCamera} className="h-14 bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Camera className="h-5 w-5 mr-2" />Camera
                  </Button>
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="h-14 border-cyan-500/30">
                    <Upload className="h-5 w-5 mr-2" />Upload
                  </Button>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => handleFileSelect(e.target.files)} className="hidden" />

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border-2 border-cyan-500/30">
                      <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full">
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {images.length < 6 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-border/30 flex items-center justify-center hover:border-cyan-500/30 transition-colors"
                    >
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-4 space-y-3">
              <h3 className="font-medium text-foreground text-sm">Additional Notes</h3>
              <input
                type="text"
                placeholder="Age of installation, recent work, concerns..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border/30 bg-background/50 text-foreground"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Verify Button */}
            {images.length > 0 && (
              <Button
                onClick={handleAnalysis}
                className={cn(
                  "w-full h-14 text-base font-semibold rounded-xl",
                  "bg-gradient-to-r from-cyan-500 to-teal-500",
                  "hover:from-cyan-600 hover:to-teal-600",
                  "text-white shadow-lg shadow-cyan-500/25"
                )}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Verify Installation
              </Button>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default InstallationVerifyPage;
