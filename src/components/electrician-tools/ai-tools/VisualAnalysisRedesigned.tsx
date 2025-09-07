import React, { useState, useRef, useCallback, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  X, 
  Loader, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  RefreshCw,
  Sparkles,
  Zap,
  Target,
  Settings,
  Save,
  Image as ImageIcon,
  History,
  TrendingUp,
  FileText,
  Layers,
  Eye
} from "lucide-react";
import VisualAnalysisResults from "./VisualAnalysisResults";
import EvidenceViewer from "./EvidenceViewer";
import CaptureWizard from "./CaptureWizard";
import FixPack from "./FixPack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Stepper } from "@/components/ui/stepper";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEICR } from "@/contexts/EICRContext";

// Lazy load background removal for performance
const loadBackgroundRemoval = async () => {
  const { removeBackground, loadImage } = await import("@/lib/background-removal");
  return { removeBackground, loadImage };
};

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
}

interface AnalysisResult {
  findings: Array<{
    description: string;
    eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
    confidence: number;
    bs7671_clauses: string[];
    location?: string;
    fix_guidance: string;
    bounding_box?: BoundingBox;
  }>;
  recommendations: Array<{
    action: string;
    priority: 'immediate' | 'urgent' | 'recommended';
    bs7671_reference?: string;
    cost_estimate?: string;
    eicr_code: 'C1' | 'C2' | 'C3';
  }>;
  compliance_summary: {
    overall_assessment: 'satisfactory' | 'unsatisfactory';
    c1_count: number;
    c2_count: number;
    c3_count: number;
    fi_count: number;
    safety_rating: number;
  };
  summary: string;
}

interface AnalysisPreset {
  name: string;
  description: string;
  icon: typeof Eye;
  settings: {
    focus_areas: string[];
    confidence_threshold: number;
    enable_bounding_boxes: boolean;
  };
}

const ANALYSIS_PRESETS: AnalysisPreset[] = [
  {
    name: "Consumer Unit Inspection",
    description: "Distribution boards and consumer units",
    icon: Zap,
    settings: {
      focus_areas: ["consumer_unit", "mcb", "rcd", "main_switch", "labelling"],
      confidence_threshold: 0.8,
      enable_bounding_boxes: true
    }
  },
  {
    name: "Socket & Accessory Check",
    description: "Socket outlets and accessories",
    icon: Target,
    settings: {
      focus_areas: ["sockets", "switches", "accessories", "cables", "earthing"],
      confidence_threshold: 0.75,
      enable_bounding_boxes: true
    }
  }
];

const STEPS = [
  { id: 'capture', title: 'Capture', description: 'Upload images' },
  { id: 'analyse', title: 'Analyse', description: 'Review & run' },
  { id: 'results', title: 'Results', description: 'View findings' }
];

const VisualAnalysisRedesigned = () => {
  const [images, setImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<Array<{ id: string; images: string[]; result: AnalysisResult; timestamp: Date }>>([]);
  const [selectedPreset, setSelectedPreset] = useState<AnalysisPreset>(ANALYSIS_PRESETS[0]);
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.8]);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [currentStep, setCurrentStep] = useState<'capture' | 'analyse' | 'results'>('capture');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [fixPacks, setFixPacks] = useState<any[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const { addFault } = useEICR();

  // Auto-advance to analyse step when images are present
  useEffect(() => {
    if (images.length > 0 && currentStep === 'capture') {
      setCurrentStep('analyse');
      setCompletedSteps(prev => [...prev, 'capture']);
    }
  }, [images.length, currentStep]);

  // Compress image before upload for better performance
  const compressImage = (file: File, maxWidth = 1920, quality = 0.85): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          }, 'image/jpeg', quality);
        } else {
          resolve(file);
        }
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return;
    
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please select image files only.",
        variant: "destructive",
      });
      return;
    }

    // Compress images for better performance
    const compressedImages = await Promise.all(
      imageFiles.map(file => compressImage(file))
    );

    setImages(prev => [...prev, ...compressedImages]);
    toast({
      title: "Images added",
      description: `${compressedImages.length} image(s) added for analysis.`,
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to capture images.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        const compressedFile = await compressImage(file);
        setImages(prev => [...prev, compressedFile]);
        stopCamera();
        toast({
          title: "Image captured",
          description: "Image added for analysis.",
        });
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (primaryImageIndex >= index && primaryImageIndex > 0) {
      setPrimaryImageIndex(prev => prev - 1);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `visual-analysis/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('visual-uploads')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('visual-uploads')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const processImageForAnalysis = async (file: File): Promise<string> => {
    if (removeBackground) {
      try {
        const { removeBackground: removeBg, loadImage } = await loadBackgroundRemoval();
        const image = await loadImage(file);
        const processedBlob = await removeBg(image);
        const processedFile = new File([processedBlob], file.name, { type: 'image/png' });
        return uploadImageToSupabase(processedFile);
      } catch (error) {
        console.warn('Background removal failed, using original image:', error);
        return uploadImageToSupabase(file);
      }
    }
    return uploadImageToSupabase(file);
  };

  const handleAnalysis = async () => {
    if (images.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload or capture at least one image.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Upload primary image
      const primaryImageUrl = await processImageForAnalysis(images[primaryImageIndex]);
      
      // Upload additional images if any
      const additionalImageUrls = await Promise.all(
        images.filter((_, index) => index !== primaryImageIndex)
          .map(image => processImageForAnalysis(image))
      );

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: { 
          primary_image: primaryImageUrl,
          additional_images: additionalImageUrls,
          analysis_settings: {
            confidence_threshold: confidenceThreshold[0],
            enable_bounding_boxes: showBoundingBoxes,
            focus_areas: selectedPreset.settings.focus_areas,
            remove_background: removeBackground,
            bs7671_compliance: true
          }
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Visual Analysis service');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const result: AnalysisResult = data.analysis;
      setAnalysisResult(result);
      setUploadedImageUrls([primaryImageUrl, ...additionalImageUrls]);
      
      // Generate fix packs for findings
      const generatedFixPacks = result.findings.map(finding => ({
        eicr_code: finding.eicr_code,
        finding: finding.description,
        urgency: finding.eicr_code === 'C1' ? 'immediate' : finding.eicr_code === 'C2' ? 'urgent' : 'recommended',
        estimated_time: finding.eicr_code === 'C1' ? '30-60 mins' : '1-2 hours',
        estimated_cost: finding.eicr_code === 'C1' ? '£50-200' : '£100-500',
        difficulty: 'electrician' as const,
        safety_priority: finding.eicr_code === 'C1' ? 'critical' : 'high' as const,
        steps: [{
          id: `step-${finding.eicr_code}-1`,
          title: 'Safe Isolation',
          description: 'Safely isolate the circuit before commencing work',
          duration: '10 mins',
          safety_notes: ['Use approved voltage tester', 'Apply lock-off procedure'],
          tools_required: ['Voltage tester', 'Lock-off kit'],
          materials_needed: [],
          regulation_reference: 'BS 7671 Regulation 537.2'
        }],
        materials_list: [],
        verification_steps: ['Test installation', 'Visual inspection', 'Complete certification'],
        compliance_notes: [`Repair must comply with ${finding.bs7671_clauses.join(', ')}`]
      }));
      setFixPacks(generatedFixPacks);
      
      // Save to history
      const historyEntry = {
        id: Date.now().toString(),
        images: [primaryImageUrl, ...additionalImageUrls],
        result,
        timestamp: new Date()
      };
      setAnalysisHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
      setCurrentStep('results');
      setCompletedSteps(prev => [...prev, 'analyse']);
      
      toast({
        title: "Analysis Complete",
        description: "Visual analysis has been completed successfully.",
      });
    } catch (error) {
      console.error('Analysis Error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyse images",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportReport = async () => {
    if (!analysisResult) return;
    
    try {
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text('Visual Fault Analysis Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 20, 30);
      doc.text(`Safety Rating: ${analysisResult.compliance_summary.safety_rating}/10`, 20, 40);
      doc.text(`BS 7671 18th Edition Compliance Assessment`, 20, 50);
      
      // Summary
      doc.setFontSize(14);
      doc.text('Executive Summary', 20, 65);
      doc.setFontSize(10);
      const splitSummary = doc.splitTextToSize(analysisResult.summary, 170);
      doc.text(splitSummary, 20, 75);
      
      let yPosition = 75 + (splitSummary.length * 5) + 10;
      
      // Issues
      doc.setFontSize(14);
      doc.text('Identified Issues', 20, yPosition);
      yPosition += 10;
      
      const issueData = analysisResult.findings.map(finding => [
        finding.description,
        finding.eicr_code,
        `${Math.round(finding.confidence * 100)}%`,
        finding.bs7671_clauses.join(', ') || 'N/A'
      ]);
      
      autoTable(doc, {
        head: [['Finding', 'EICR Code', 'Confidence', 'BS 7671 Clauses']],
        body: issueData,
        startY: yPosition,
        margin: { left: 20 },
        styles: { fontSize: 8 }
      });
      
      // Recommendations
      yPosition = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.text('Recommendations', 20, yPosition);
      yPosition += 10;
      
      const recData = analysisResult.recommendations.map(rec => [
        rec.action,
        rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1),
        rec.bs7671_reference || 'N/A',
        rec.cost_estimate || 'TBC'
      ]);
      
      autoTable(doc, {
        head: [['Action', 'Priority', 'BS 7671 Reference', 'Cost Estimate']],
        body: recData,
        startY: yPosition,
        margin: { left: 20 },
        styles: { fontSize: 8 }
      });
      
      doc.save(`visual-analysis-report-${Date.now()}.pdf`);
      
      toast({
        title: "Report Exported",
        description: "PDF report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to generate PDF report.",
        variant: "destructive",
      });
    }
  };

  const addToEICR = () => {
    if (!analysisResult) return;
    
    analysisResult.findings.forEach(finding => {
      addFault({
        id: Date.now().toString() + Math.random(),
        circuitRef: 'TBC',
        circuitType: 'other',
        faultCode: finding.eicr_code,
        description: finding.description,
        location: finding.location || 'Visual inspection',
        remedy: finding.fix_guidance,
        timestamp: new Date()
      });
    });
    
    toast({
      title: "Added to EICR",
      description: `${analysisResult.findings.length} finding(s) added to EICR observations.`,
    });
  };

  const resetAnalysis = () => {
    setImages([]);
    setAnalysisResult(null);
    setUploadedImageUrls([]);
    setFixPacks([]);
    setCurrentStep('capture');
    setCompletedSteps([]);
    setPrimaryImageIndex(0);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with Stepper */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Visual Installation Analyser
                </CardTitle>
                <CardDescription>
                  AI-powered BS 7671 compliance analysis using advanced computer vision
                </CardDescription>
              </div>
              {analysisResult && (
                <Badge 
                  variant={analysisResult.compliance_summary.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}
                  className="text-sm"
                >
                  {analysisResult.compliance_summary.overall_assessment === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory'}
                </Badge>
              )}
            </div>
            <Stepper 
              steps={STEPS} 
              currentStep={currentStep} 
              completedSteps={completedSteps}
            />
          </CardHeader>
        </Card>

        {/* Main Content */}
        {currentStep === 'capture' && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">1. Capture & Upload Images</CardTitle>
              <CardDescription>
                Upload or capture images of electrical installations for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Simple file upload area */}
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium mb-2">Upload Images for Analysis</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop images here, or click to select files
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              
              {/* Camera capture */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={isCameraActive ? captureImage : startCamera}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {isCameraActive ? 'Capture Photo' : 'Use Camera'}
                </Button>
              </div>
              
              {/* Camera view */}
              {isCameraActive && (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="destructive" onClick={stopCamera}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Image Gallery */}
              {images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Uploaded Images ({images.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-border"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {index === primaryImageIndex && (
                          <Badge className="absolute -top-2 -left-2">Primary</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 'analyse' && (
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">2. Review & Analyse</CardTitle>
                  <CardDescription>
                    Configure analysis settings and run the inspection
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Advanced Settings
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Analysis Settings</DrawerTitle>
                        <DrawerDescription>
                          Customise the analysis parameters for optimal results
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 space-y-6">
                        {/* Preset Selection */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-foreground">Analysis Preset</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {ANALYSIS_PRESETS.map((preset) => (
                              <Card 
                                key={preset.name}
                                className={`cursor-pointer transition-colors ${
                                  selectedPreset.name === preset.name 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border hover:border-muted-foreground'
                                }`}
                                onClick={() => setSelectedPreset(preset)}
                              >
                                <CardContent className="p-3">
                                  <div className="flex items-center gap-3">
                                    <preset.icon className="h-5 w-5 text-primary" />
                                    <div>
                                      <p className="font-medium text-sm text-foreground">{preset.name}</p>
                                      <p className="text-xs text-muted-foreground">{preset.description}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Confidence Threshold */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">Confidence Threshold</h4>
                            <Badge variant="secondary">{Math.round(confidenceThreshold[0] * 100)}%</Badge>
                          </div>
                          <Slider
                            value={confidenceThreshold}
                            onValueChange={setConfidenceThreshold}
                            max={1}
                            min={0.1}
                            step={0.05}
                            className="w-full"
                          />
                        </div>

                        {/* Toggle Options */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">Show Bounding Boxes</p>
                              <p className="text-sm text-muted-foreground">Display visual markers on detected issues</p>
                            </div>
                            <Switch 
                              checked={showBoundingBoxes} 
                              onCheckedChange={setShowBoundingBoxes}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">Remove Background</p>
                              <p className="text-sm text-muted-foreground">Enhance focus on electrical components</p>
                            </div>
                            <Switch 
                              checked={removeBackground} 
                              onCheckedChange={setRemoveBackground}
                            />
                          </div>
                        </div>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <ImageIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">{images.length}</p>
                  <p className="text-xs text-muted-foreground">Images</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">{selectedPreset.name}</p>
                  <p className="text-xs text-muted-foreground">Preset</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">{Math.round(confidenceThreshold[0] * 100)}%</p>
                  <p className="text-xs text-muted-foreground">Threshold</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Layers className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">{showBoundingBoxes ? 'On' : 'Off'}</p>
                  <p className="text-xs text-muted-foreground">Overlays</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleAnalysis}
                  disabled={isAnalyzing || images.length === 0}
                  size="lg"
                  className="min-w-48"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Analysing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'results' && analysisResult && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">3. Analysis Results</CardTitle>
                    <CardDescription>
                      BS 7671 compliance findings and recommendations
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={addToEICR}>
                      <Save className="h-4 w-4 mr-2" />
                      Add to EICR
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetAnalysis}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      New Analysis
                    </Button>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">
                          <History className="h-4 w-4 mr-2" />
                          History
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Analysis History</DrawerTitle>
                          <DrawerDescription>
                            Previous analysis results and comparisons
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4">
                          {analysisHistory.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No previous analyses</p>
                          ) : (
                            <div className="space-y-4">
                              {analysisHistory.map((entry) => (
                                <Card key={entry.id} className="border-border">
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium text-foreground">
                                          {entry.result.findings.length} findings
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {entry.timestamp.toLocaleDateString()}
                                        </p>
                                      </div>
                                      <Badge variant={entry.result.compliance_summary.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}>
                                        {entry.result.compliance_summary.overall_assessment}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="text-center p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-lg font-bold text-destructive">{analysisResult.compliance_summary.c1_count}</p>
                    <p className="text-xs text-muted-foreground">C1 Issues</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-lg font-bold text-yellow-600">{analysisResult.compliance_summary.c2_count}</p>
                    <p className="text-xs text-muted-foreground">C2 Issues</p>
                  </div>
                  <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{analysisResult.compliance_summary.c3_count}</p>
                    <p className="text-xs text-muted-foreground">C3 Issues</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-foreground">{analysisResult.compliance_summary.fi_count}</p>
                    <p className="text-xs text-muted-foreground">FI Items</p>
                  </div>
                  <div className="text-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-lg font-bold text-primary">{analysisResult.compliance_summary.safety_rating}/10</p>
                    <p className="text-xs text-muted-foreground">Safety Rating</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h4 className="font-medium text-foreground mb-2">Executive Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{analysisResult.summary}</p>
                </div>
              </CardContent>
            </Card>

            {/* Evidence Viewer */}
            {uploadedImageUrls.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Evidence & Annotations</CardTitle>
                </CardHeader>
                <CardContent>
                  <EvidenceViewer
                    imageUrl={uploadedImageUrls[0]}
                    findings={analysisResult.findings}
                    showOverlays={showBoundingBoxes}
                  />
                </CardContent>
              </Card>
            )}

            {/* Detailed Results */}
            <VisualAnalysisResults 
              analysisResult={analysisResult}
              onExportReport={exportReport}
            />

            {/* Fix Packs */}
            {fixPacks.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Repair Guidance</CardTitle>
                  <CardDescription>
                    Step-by-step repair instructions for identified issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fixPacks.map((fixPack, index) => (
                      <FixPack key={index} {...fixPack} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Hidden elements for camera capture */}
        <video ref={videoRef} autoPlay playsInline muted className="hidden" />
        <canvas ref={canvasRef} className="hidden" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>
    </TooltipProvider>
  );
};

export default VisualAnalysisRedesigned;