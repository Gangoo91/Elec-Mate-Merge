import React, { useState, useRef, useCallback } from "react";
import { 
  Camera, 
  Upload, 
  X, 
  Eye, 
  EyeOff, 
  Loader, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  Download,
  Trash2,
  RefreshCw,
  Sparkles,
  Info,
  Zap,
  Target,
  Settings,
  RotateCcw,
  Save
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  issues: Array<{
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    regulation?: string;
    location?: string;
    bounding_box?: BoundingBox;
  }>;
  recommendations: Array<{
    action: string;
    priority: 'low' | 'medium' | 'high';
    regulation?: string;
    cost_estimate?: string;
  }>;
  regulations: Array<{
    clause: string;
    description: string;
    compliance_status: 'compliant' | 'non_compliant' | 'requires_inspection';
  }>;
  overall_safety_rating: number;
  summary: string;
  bounding_boxes?: BoundingBox[];
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
  },
  {
    name: "General Safety Survey",
    description: "Comprehensive safety analysis",
    icon: Eye,
    settings: {
      focus_areas: ["general_safety", "visible_damage", "compliance", "hazards"],
      confidence_threshold: 0.7,
      enable_bounding_boxes: false
    }
  }
];

const VisualAnalysis = () => {
  const [images, setImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [analysisHistory, setAnalysisHistory] = useState<Array<{ id: string; images: string[]; result: AnalysisResult; timestamp: Date }>>([]);
  const [selectedPreset, setSelectedPreset] = useState<AnalysisPreset>(ANALYSIS_PRESETS[0]);
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.8]);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [selectedBoundingBox, setSelectedBoundingBox] = useState<BoundingBox | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

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

  const handleQuickReAnalyse = async () => {
    if (analysisResult && images.length > 0) {
      await handleAnalysis();
    }
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
      
      // Save to history
      const historyEntry = {
        id: Date.now().toString(),
        images: [primaryImageUrl, ...additionalImageUrls],
        result,
        timestamp: new Date()
      };
      setAnalysisHistory(prev => [historyEntry, ...prev.slice(0, 4)]);
      
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
      doc.text(`Safety Rating: ${analysisResult.overall_safety_rating}/10`, 20, 40);
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
      
      const issueData = analysisResult.issues.map(issue => [
        issue.description,
        issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1),
        `${Math.round(issue.confidence * 100)}%`,
        issue.regulation || 'N/A'
      ]);
      
      autoTable(doc, {
        head: [['Issue', 'Severity', 'Confidence', 'Regulation']],
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
        rec.regulation || 'N/A',
        rec.cost_estimate || 'TBC'
      ]);
      
      autoTable(doc, {
        head: [['Action', 'Priority', 'Regulation', 'Cost Estimate']],
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const exampleQueries = [
    "Consumer unit with overheating signs",
    "Damaged socket outlet",
    "Exposed cables in loft space",
    "Corroded electrical connections",
    "Faulty distribution board",
    "Water damaged electrical equipment"
  ];

  // Keyboard shortcuts
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'u':
          e.preventDefault();
          fileInputRef.current?.click();
          break;
        case 'Enter':
          e.preventDefault();
          if (images.length > 0 && !isAnalyzing) {
            handleAnalysis();
          }
          break;
        case 'r':
          e.preventDefault();
          if (analysisResult && !isAnalyzing) {
            handleQuickReAnalyse();
          }
          break;
      }
    }
  }, [images.length, isAnalyzing, analysisResult]);

  // Add keyboard event listeners
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <TooltipProvider>
      <div className="space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-2xl border border-blue-400/30">
            <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
            Visual Fault Analyser
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            Upload images of electrical installations for AI-powered safety analysis and BS 7671 18th Edition compliance checking.
            Get detailed fault identification with severity ratings and actionable recommendations.
          </p>
        </div>

        {/* Analysis Presets */}
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600 max-w-5xl mx-auto">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              <CardTitle className="text-lg sm:text-xl text-white">Analysis Presets</CardTitle>
            </div>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Choose a preset optimised for your specific inspection type:
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {ANALYSIS_PRESETS.map((preset, index) => {
                const IconComponent = preset.icon;
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedPreset.name === preset.name ? "default" : "outline"}
                        className={`h-auto p-4 flex flex-col items-start gap-2 ${
                          selectedPreset.name === preset.name 
                            ? 'bg-blue-600 text-white border-blue-500' 
                            : 'border-neutral-600 text-gray-300 hover:bg-neutral-700/50'
                        }`}
                        onClick={() => {
                          setSelectedPreset(preset);
                          setConfidenceThreshold([preset.settings.confidence_threshold]);
                          setShowBoundingBoxes(preset.settings.enable_bounding_boxes);
                        }}
                      >
                        <IconComponent className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-semibold text-sm">{preset.name}</div>
                          <div className="text-xs opacity-80 line-clamp-2">{preset.description}</div>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{preset.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Interface */}
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600 max-w-5xl mx-auto">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              <CardTitle className="text-lg sm:text-xl text-white">Visual Analysis</CardTitle>
            </div>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Upload images or capture live photos for intelligent fault detection and safety analysis:
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
            {/* Image Upload Area */}
            <div 
              className="border-2 border-dashed border-neutral-600 rounded-lg p-6 sm:p-8 text-center space-y-4 hover:border-blue-400 transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex justify-center">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-300 mb-2">Drag and drop images here, or</p>
                <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ctrl+U</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button
                    variant="outline"
                    className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
                    onClick={isCameraActive ? stopCamera : startCamera}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {isCameraActive ? 'Stop Camera' : 'Use Camera'}
                  </Button>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>

            {/* Camera Preview */}
            {isCameraActive && (
              <div className="space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-w-md mx-auto rounded-lg border border-border"
                />
                <div className="text-center">
                  <Button onClick={captureImage} className="bg-primary hover:bg-primary/90">
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Image
                  </Button>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />

            {/* Selected Images */}
            {images.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Selected Images ({images.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative group rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
                        index === primaryImageIndex 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPrimaryImageIndex(index)}
                    >
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Selected ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      {index === primaryImageIndex && (
                        <Badge className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs">
                          Primary
                        </Badge>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Settings */}
            <div className="space-y-4 border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground">Analysis Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Confidence Threshold: {Math.round(confidenceThreshold[0] * 100)}%
                  </label>
                  <Slider
                    value={confidenceThreshold}
                    onValueChange={setConfidenceThreshold}
                    max={1}
                    min={0.5}
                    step={0.05}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values show only more confident detections
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Background Removal</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Switch
                          checked={removeBackground}
                          onCheckedChange={setRemoveBackground}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove background to focus on electrical components</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Bounding Boxes</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Switch
                          checked={showBoundingBoxes}
                          onCheckedChange={setShowBoundingBoxes}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show visual indicators for detected issues</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Actions */}
            <div className="flex gap-3 flex-wrap">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleAnalysis}
                    disabled={images.length === 0 || isAnalyzing}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Analysing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyse Images
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ctrl+Enter</p>
                </TooltipContent>
              </Tooltip>

              {analysisResult && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={handleQuickReAnalyse}
                      disabled={isAnalyzing}
                      className="border-border hover:bg-accent/50"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Re-analyse
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ctrl+R</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Button
                variant="outline"
                onClick={() => setShowResults(!showResults)}
                disabled={!analysisResult}
                className="border-border hover:bg-accent/50"
              >
                {showResults ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showResults ? 'Hide Results' : 'Show Results'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && showResults && (
          <Card className="bg-card border-border max-w-5xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  <CardTitle className="text-lg sm:text-xl text-foreground">Analysis Results</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportReport}
                    className="border-border hover:bg-accent/50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-accent/50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
              {/* Safety Rating */}
              <div className="bg-accent/10 border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Overall Safety Rating</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {analysisResult.overall_safety_rating}/10
                    </span>
                    {analysisResult.overall_safety_rating >= 8 ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : analysisResult.overall_safety_rating >= 6 ? (
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{analysisResult.summary}</p>
              </div>

              {/* Issues */}
              {analysisResult.issues.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Identified Issues</h3>
                  <div className="space-y-3">
                    {analysisResult.issues.map((issue, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{issue.description}</p>
                            {issue.location && (
                              <p className="text-sm text-muted-foreground">Location: {issue.location}</p>
                            )}
                            {issue.regulation && (
                              <p className="text-sm text-muted-foreground">Regulation: {issue.regulation}</p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge className={getSeverityColor(issue.severity)}>
                              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(issue.confidence * 100)}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{rec.action}</p>
                            {rec.regulation && (
                              <p className="text-sm text-muted-foreground">Regulation: {rec.regulation}</p>
                            )}
                            {rec.cost_estimate && (
                              <p className="text-sm text-muted-foreground">Estimated cost: {rec.cost_estimate}</p>
                            )}
                          </div>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compliance Status */}
              {analysisResult.regulations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">BS 7671 Compliance Status</h3>
                  <div className="space-y-3">
                    {analysisResult.regulations.map((reg, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{reg.clause}</p>
                            <p className="text-sm text-muted-foreground">{reg.description}</p>
                          </div>
                          <Badge className={
                            reg.compliance_status === 'compliant' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : reg.compliance_status === 'non_compliant'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }>
                            {reg.compliance_status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-200">
                    <p className="font-medium mb-1">Important Notice</p>
                    <p>
                      This AI analysis is for guidance only and should not replace professional electrical inspection. 
                      Always consult a qualified electrician for definitive safety assessments and compliance verification.
                      Results may vary and should be verified by competent persons as per BS 7671 requirements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <Card className="bg-card border-border max-w-5xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <CardTitle className="text-lg sm:text-xl text-foreground">Recent Analysis History</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                {analysisHistory.map((entry) => (
                  <div key={entry.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {entry.timestamp.toLocaleDateString('en-GB')} at {entry.timestamp.toLocaleTimeString('en-GB')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Safety: {entry.result.overall_safety_rating}/10
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{entry.result.summary}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {entry.result.issues.length} issues
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {entry.result.recommendations.length} recommendations
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Example Queries for New Users */}
        {analysisResult === null && images.length === 0 && (
          <Card className="bg-card border-border max-w-5xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <CardTitle className="text-lg sm:text-xl text-foreground">Common Analysis Types</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Upload images of these common electrical scenarios for analysis:
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {exampleQueries.map((query, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg text-sm text-muted-foreground hover:bg-accent/50 transition-colors">
                    {query}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};

export default VisualAnalysis;