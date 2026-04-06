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
  CheckCircle,
  X,
  Loader2,
  FileCheck,
  ClipboardList,
  FileText,
  Home,
  Building,
  Factory,
  Plus,
  Shield,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import InstallationVerificationResults from '@/components/electrician-tools/ai-tools/InstallationVerificationResults';

// Certificate types
const certificateTypes = [
  {
    id: 'eic',
    label: 'EIC',
    fullName: 'Electrical Installation Certificate',
    desc: 'New installations',
    icon: FileCheck,
    color: 'text-green-400 bg-green-500/10 border-green-500/30',
  },
  {
    id: 'eicr',
    label: 'EICR',
    fullName: 'Condition Report',
    desc: 'Periodic inspection',
    icon: ClipboardList,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
  {
    id: 'minor-works',
    label: 'Minor Works',
    fullName: 'Minor Electrical Works',
    desc: 'Small alterations',
    icon: FileText,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
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
    setSelectedScopes((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({
        title: 'No Images',
        description: 'Please upload photos of the installation',
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

      const {
        data: { publicUrl },
      } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

      const certLabel = certificateTypes.find((c) => c.id === selectedCertType)?.fullName || '';
      const propLabel = propertyTypes.find((p) => p.id === selectedPropertyType)?.label || '';
      const scopeLabels = selectedScopes
        .map((s) => scopeAreas.find((a) => a.id === s)?.label)
        .join(', ');

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: {
          primary_image: publicUrl,
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

      // Handle both wrapped and unwrapped responses
      const verificationData = data?.verification_checks || data?.analysis?.verification_checks;

      console.log('🔍 Installation Verify Response:', {
        data,
        error,
        hasVerificationChecks: !!verificationData,
        dataStructure: data?.verification_checks
          ? 'unwrapped'
          : data?.analysis?.verification_checks
            ? 'wrapped'
            : 'missing',
      });

      if (error) {
        console.error('❌ Installation verify error:', error);
        throw error;
      }

      if (!verificationData) {
        console.error('❌ Response missing verification_checks:', data);
        toast({
          title: 'Invalid Response',
          description:
            "The analysis didn't return verification results. Check console for details.",
          variant: 'destructive',
        });
        return;
      }

      setAnalysisProgress(100);
      // Unwrap if needed
      setAnalysisResult(data?.verification_checks ? data : data.analysis);
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
    setAnalysisProgress(0);
  };

  const selectedCert = certificateTypes.find((c) => c.id === selectedCertType);

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
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <CheckCircle className="h-4 w-4 text-cyan-500" />
              </div>
              <h1 className="text-base font-semibold text-white">Installation Verification</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
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
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
              <div>
                <h3 className="font-semibold text-white">Verifying Installation...</h3>
                <p className="text-xs text-white">Checking against BS 7671 requirements</p>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Certificate Type */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Certificate Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {certificateTypes.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setSelectedCertType(cert.id)}
                    className={cn(
                      'relative p-4 rounded-xl transition-all touch-manipulation',
                      'min-h-[100px] flex flex-col items-center justify-center gap-2 text-center',
                      selectedCertType === cert.id
                        ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40 shadow-sm shadow-cyan-500/10'
                        : 'bg-white/[0.06] text-white ring-1 ring-white/[0.08] active:scale-[0.97]'
                    )}
                  >
                    <cert.icon
                      className={cn(
                        'h-6 w-6',
                        selectedCertType === cert.id ? 'text-cyan-400' : 'text-white'
                      )}
                    />
                    <div>
                      <span className="text-sm font-bold block">{cert.label}</span>
                      <span className="text-[10px] text-white">{cert.desc}</span>
                    </div>
                    {selectedCertType === cert.id && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Property Type</h2>
              <div className="grid grid-cols-3 gap-2">
                {propertyTypes.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => setSelectedPropertyType(prop.id)}
                    className={cn(
                      'p-3 rounded-xl transition-all flex flex-col items-center gap-1.5 min-h-[70px] touch-manipulation',
                      selectedPropertyType === prop.id
                        ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40 shadow-sm shadow-cyan-500/10'
                        : 'bg-white/[0.06] text-white ring-1 ring-white/[0.08] active:scale-[0.97]'
                    )}
                  >
                    <prop.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{prop.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope of Verification */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">What are you verifying?</h2>
                <Badge variant="secondary" className="text-xs">
                  {selectedScopes.length} areas
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {scopeAreas.map((scope) => (
                  <button
                    key={scope.id}
                    onClick={() => toggleScope(scope.id)}
                    className={cn(
                      'px-3 py-2 text-xs font-medium transition-all min-h-[44px]',
                      selectedScopes.includes(scope.id)
                        ? 'h-11 rounded-xl bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40 shadow-sm shadow-cyan-500/10 touch-manipulation'
                        : 'h-11 rounded-xl bg-white/[0.06] text-white ring-1 ring-white/[0.08] touch-manipulation active:scale-[0.97] transition-all'
                    )}
                  >
                    {scope.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pre-verification Checklist */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Pre-verification Checklist</h2>
              <div className="space-y-2">
                {quickChecks.map((check) => (
                  <button
                    key={check.id}
                    onClick={() => toggleCheck(check.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left min-h-[48px] touch-manipulation',
                      checkedItems.includes(check.id)
                        ? 'bg-cyan-500/10 border-cyan-500/30'
                        : 'border-white/[0.08] hover:border-white/[0.15]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                        checkedItems.includes(check.id)
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-white/30'
                      )}
                    >
                      {checkedItems.includes(check.id) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm text-white">
                      {check.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Capture */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Installation Photos</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white">
                    Capture multiple angles: consumer unit front, internal, labels, earthing, etc.
                  </p>
                  <Badge variant="outline" className="text-xs text-white border-white/[0.08]">
                    {images.length}/6
                  </Badge>
                </div>

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
                          className="flex-1 h-12 bg-cyan-500 hover:bg-cyan-600"
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
                      className="h-14 bg-cyan-500 hover:bg-cyan-600 text-white"
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
                    {images.length < 6 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border border-dashed border-white/[0.15] flex items-center justify-center hover:border-cyan-500/30 transition-colors"
                      >
                        <Plus className="h-6 w-6 text-white" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Additional Notes</h2>
              <input
                type="text"
                placeholder="Age of installation, recent work, concerns..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-white/[0.08] bg-background/50 text-white"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Verify Button */}
            {images.length > 0 && (
              <Button
                onClick={handleAnalysis}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-cyan-500/20"
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
