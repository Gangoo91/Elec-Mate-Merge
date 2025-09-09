import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Zap,
  Eye,
  Shield,
  FileText,
  ArrowRight,
  RotateCcw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { checkImageQuality, type ImageQualityResult } from "@/utils/imageQuality";

interface CapturePreset {
  id: string;
  name: string;
  description: string;
  icon: typeof Eye;
  checklist: string[];
  examples: string[];
  estimatedPhotos: number;
}

interface CaptureWizardProps {
  onImagesCapture: (images: File[]) => void;
  onPresetSelect: (preset: CapturePreset) => void;
}

const CAPTURE_PRESETS: CapturePreset[] = [
  {
    id: 'consumer-unit',
    name: 'Consumer Unit Inspection',
    description: 'Complete consumer unit and distribution board documentation',
    icon: Zap,
    checklist: [
      'Overall consumer unit condition',
      'Main switch and RCD operation',
      'MCB/RCBO labelling and condition',
      'Cable entries and glands',
      'Earth and neutral connections',
      'Any signs of overheating or damage'
    ],
    examples: [
      'Wide shot of entire consumer unit',
      'Close-up of RCD test button',
      'MCB labels and ratings',
      'Cable connections at top/bottom'
    ],
    estimatedPhotos: 4
  },
  {
    id: 'socket-accessories',
    name: 'Socket & Accessory Survey',
    description: 'Socket outlets, switches, and fixed accessories',
    icon: Target,
    checklist: [
      'Socket condition and mounting',
      'Switch operation and damage',
      'Cable condition and routing',
      'Earth bonding connections',
      'Accessory labelling',
      'Signs of overheating or arcing'
    ],
    examples: [
      'Socket face and condition',
      'Switch plate alignment',
      'Cable entry points',
      'Any visible damage or discolouration'
    ],
    estimatedPhotos: 3
  },
  {
    id: 'safety-survey',
    name: 'General Safety Survey',
    description: 'Comprehensive electrical safety documentation',
    icon: Shield,
    checklist: [
      'Overall installation condition',
      'Visible cable damage',
      'Earthing and bonding',
      'Environmental hazards',
      'Access and maintenance issues',
      'Compliance with current standards'
    ],
    examples: [
      'Installation overview',
      'Problem areas or defects',
      'Earthing arrangements',
      'Environmental conditions'
    ],
    estimatedPhotos: 5
  }
];

const CaptureWizard: React.FC<CaptureWizardProps> = ({
  onImagesCapture,
  onPresetSelect
}) => {
  const [selectedPreset, setSelectedPreset] = useState<CapturePreset | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState<File[]>([]);
  const [qualityResults, setQualityResults] = useState<ImageQualityResult[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [completedChecklist, setCompletedChecklist] = useState<number[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCapture = useCallback((preset: CapturePreset) => {
    setSelectedPreset(preset);
    setCurrentStep(0);
    setCapturedImages([]);
    setQualityResults([]);
    setCompletedChecklist([]);
    onPresetSelect(preset);
    startCamera();
  }, [onPresetSelect]);

  const startCamera = async () => {
    console.log('CaptureWizard: Attempting to start camera...');
    
    // Feature detection
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('CaptureWizard: Camera API not supported');
      toast({
        title: "Camera not supported",
        description: "Your browser doesn't support camera access. Wizard mode requires camera functionality.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('CaptureWizard: Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      console.log('CaptureWizard: Camera access granted');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        toast({
          title: "Camera ready",
          description: "Follow the guided checklist to capture quality images.",
        });
      }
    } catch (error: any) {
      console.error('CaptureWizard: Camera access error:', error);
      
      let errorMessage = "Please allow camera access to use guided capture.";
      if (error.name === 'NotAllowedError') {
        errorMessage = "Camera permission denied. Please enable camera access in your browser settings and try again.";
      } else if (error.name === 'NotFoundError') {
        errorMessage = "No camera found. Please use the standard upload mode instead.";
      } else if (error.name === 'NotSupportedError') {
        errorMessage = "Camera not supported in this environment. Please use standard upload mode.";
      }
      
      toast({
        title: "Camera access failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    console.log('CaptureWizard: Stopping camera...');
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
        console.log(`CaptureWizard: Stopped ${track.kind} track`);
      });
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current || !selectedPreset) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], `${selectedPreset.id}-${currentStep + 1}-${Date.now()}.jpg`, { 
          type: 'image/jpeg' 
        });
        
        // Check image quality
        const quality = await checkImageQuality(file);
        
        setCapturedImages(prev => [...prev, file]);
        setQualityResults(prev => [...prev, quality]);
        
        // Mark current checklist item as completed
        setCompletedChecklist(prev => [...prev, currentStep]);
        
        if (quality.overall < 0.7) {
          toast({
            title: "Image quality warning",
            description: `${quality.issues.join(', ')}. Consider retaking this photo.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Image captured",
            description: `Step ${currentStep + 1}/${selectedPreset.checklist.length} completed.`,
          });
        }
        
        // Auto-advance to next step
        if (currentStep < selectedPreset.checklist.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }
    }, 'image/jpeg', 0.85);
  };

  const retakeImage = () => {
    if (capturedImages.length > 0) {
      setCapturedImages(prev => prev.slice(0, -1));
      setQualityResults(prev => prev.slice(0, -1));
      setCompletedChecklist(prev => prev.slice(0, -1));
    }
  };

  const finishCapture = () => {
    onImagesCapture(capturedImages);
    stopCamera();
    setSelectedPreset(null);
    toast({
      title: "Capture complete",
      description: `${capturedImages.length} images ready for analysis.`,
    });
  };

  const coveragePercentage = selectedPreset 
    ? Math.round((capturedImages.length / selectedPreset.estimatedPhotos) * 100)
    : 0;

  if (!selectedPreset) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Guided Capture Wizard</h2>
          <p className="text-muted-foreground">
            Select an inspection type for guided photo capture with quality checks
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {CAPTURE_PRESETS.map((preset) => {
            const IconComponent = preset.icon;
            return (
              <Card 
                key={preset.id} 
                className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                onClick={() => startCapture(preset)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{preset.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        ~{preset.estimatedPhotos} photos
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {preset.description}
                  </p>
                  <Button className="w-full" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Capture
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">{selectedPreset.name}</h2>
          <p className="text-muted-foreground text-sm">{selectedPreset.description}</p>
        </div>
        <Button variant="outline" onClick={() => setSelectedPreset(null)}>
          Exit Wizard
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Coverage Progress</span>
            <span className="text-sm text-muted-foreground">
              {capturedImages.length}/{selectedPreset.estimatedPhotos} photos
            </span>
          </div>
          <Progress value={coveragePercentage} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            {coveragePercentage >= 100 ? 'Minimum coverage achieved' : 'Capture more photos for better analysis'}
          </p>
        </CardContent>
      </Card>

      {/* Current step guidance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Camera view */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Step {currentStep + 1}: {selectedPreset.checklist[currentStep]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isCameraActive ? (
              <div className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Capture overlay */}
                  <div className="absolute inset-0 border-2 border-primary/30 rounded-lg pointer-events-none">
                    <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs font-medium">Focus on: {selectedPreset.checklist[currentStep]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={captureImage} className="flex-1">
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Image
                  </Button>
                  {capturedImages.length > 0 && (
                    <Button variant="outline" onClick={retakeImage}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retake
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Button onClick={startCamera}>
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Camera access required for guided capture. If denied, please use the standard upload mode.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checklist and guidance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Inspection Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {selectedPreset.checklist.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                    index === currentStep 
                      ? 'bg-primary/10 border border-primary/20' 
                      : completedChecklist.includes(index)
                      ? 'bg-green-500/10'
                      : 'bg-muted/30'
                  }`}
                >
                  <div className="mt-0.5">
                    {completedChecklist.includes(index) ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : index === currentStep ? (
                      <Target className="h-4 w-4 text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/50" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    index === currentStep ? 'font-medium text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {capturedImages.length >= selectedPreset.estimatedPhotos && (
              <Button onClick={finishCapture} className="w-full">
                <ArrowRight className="h-4 w-4 mr-2" />
                Complete Capture & Analyze
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quality feedback */}
      {qualityResults.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Image Quality Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {qualityResults.map((result, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  {result.overall >= 0.8 ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : result.overall >= 0.6 ? (
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm">
                    Photo {index + 1}: {Math.round(result.overall * 100)}% quality
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CaptureWizard;