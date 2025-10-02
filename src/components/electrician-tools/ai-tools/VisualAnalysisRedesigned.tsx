import React, { useState, useRef, useCallback } from "react";
import { 
  Camera, 
  Upload, 
  X, 
  Loader, 
  Download,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Plus,
  CheckCircle2
} from "lucide-react";
import VisualAnalysisResults from "./VisualAnalysisResults";
import ComponentIdentificationResults from "./ComponentIdentificationResults";
import ModeSelector, { AnalysisMode } from "./ModeSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  findings: Array<{
    description: string;
    eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
    confidence: number;
    bs7671_clauses: string[];
    location?: string;
    fix_guidance: string;
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

const VisualAnalysisRedesigned = () => {
  const [selectedMode, setSelectedMode] = useState<AnalysisMode | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

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

    const compressedImages = await Promise.all(
      imageFiles.map(file => compressImage(file))
    );

    setImages(prev => [...prev, ...compressedImages]);
    
    toast({
      title: "Images added",
      description: `${compressedImages.length} image(s) ready for analysis`,
      variant: "success"
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
        
        toast({
          title: "Photo captured",
          description: "Image added to gallery",
          variant: "success"
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
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('You must be logged in to upload images');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${user.id}/visual-analysis/${fileName}`;

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
      const primaryImageUrl = await uploadImageToSupabase(images[primaryImageIndex]);
      
      const additionalImageUrls = await Promise.all(
        images.filter((_, index) => index !== primaryImageIndex)
          .map(image => uploadImageToSupabase(image))
      );

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: { 
          primary_image: primaryImageUrl,
          additional_images: additionalImageUrls,
          analysis_settings: {
            mode: selectedMode || 'fault_diagnosis',
            confidence_threshold: 0.75,
            enable_bounding_boxes: true,
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
      
      toast({
        title: "Analysis complete",
        description: "BS 7671 compliance check finished",
        variant: "success"
      });
    } catch (error) {
      console.error('Analysis Error:', error);
      toast({
        title: "Analysis failed",
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
      
      doc.setFontSize(20);
      doc.text('Visual Fault Analysis Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, 20, 30);
      doc.text(`Safety Rating: ${analysisResult.compliance_summary.safety_rating}/10`, 20, 40);
      
      doc.setFontSize(14);
      doc.text('Summary', 20, 55);
      doc.setFontSize(10);
      const splitSummary = doc.splitTextToSize(analysisResult.summary, 170);
      doc.text(splitSummary, 20, 65);
      
      let yPosition = 65 + (splitSummary.length * 5) + 10;
      
      doc.setFontSize(14);
      doc.text('Findings', 20, yPosition);
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
      
      doc.save(`visual-analysis-${Date.now()}.pdf`);
      
      toast({
        title: "Report exported",
        description: "PDF saved to downloads",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Unable to generate PDF report",
        variant: "destructive",
      });
    }
  };

  const resetAnalysis = () => {
    setImages([]);
    setAnalysisResult(null);
    setUploadedImageUrls([]);
    setPrimaryImageIndex(0);
    setSelectedMode(null);
  };

  const handleModeSelect = (mode: AnalysisMode) => {
    setSelectedMode(mode);
  };

  const handleBackToModeSelection = () => {
    resetAnalysis();
  };

  // Show mode selector if no mode selected
  if (!selectedMode) {
    return (
      <div className="space-y-6">
        <ModeSelector onSelectMode={handleModeSelect} />
      </div>
    );
  }

  const getModeTitle = () => {
    switch (selectedMode) {
      case 'component_identify': return 'Component Identification';
      case 'wiring_instruction': return 'Wiring Instructions';
      case 'installation_verify': return 'Installation Verification';
      case 'fault_diagnosis':
      default: return 'Fault Diagnosis';
    }
  };

  const getModeDescription = () => {
    switch (selectedMode) {
      case 'component_identify': 
        return 'Identify electrical components with specifications';
      case 'wiring_instruction': 
        return 'Step-by-step UK wiring guidance';
      case 'installation_verify': 
        return 'BS 7671 compliance verification';
      case 'fault_diagnosis':
      default: 
        return 'AI-powered fault detection and analysis';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToModeSelection}
                  className="text-muted-foreground hover:text-foreground mb-2 -ml-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Change Mode
                </Button>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Sparkles className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <span className="truncate">{getModeTitle()}</span>
                </CardTitle>
                <CardDescription className="mt-1">
                  {getModeDescription()}
                </CardDescription>
              </div>
              {analysisResult && (
                <Badge 
                  variant={analysisResult.compliance_summary?.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}
                  className="text-xs sm:text-sm flex-shrink-0"
                >
                  {analysisResult.compliance_summary?.overall_assessment === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory'}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {!analysisResult ? (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upload Images</CardTitle>
            <CardDescription>
              Add photos of the installation for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Zone */}
            <div 
              className="relative border-2 border-dashed border-border rounded-xl p-8 sm:p-12 text-center hover:border-elec-yellow/60 hover:bg-elec-yellow/5 transition-all duration-300 cursor-pointer group"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
              <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
                Drag & drop images here
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                or click to browse files
              </p>
              <Button variant="outline" type="button" className="pointer-events-none">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
            
            {/* Camera Button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={isCameraActive ? captureImage : startCamera}
                className="w-full sm:w-auto"
                size="lg"
              >
                <Camera className="h-5 w-5 mr-2" />
                {isCameraActive ? 'Capture Photo' : 'Use Camera'}
              </Button>
              {isCameraActive && (
                <Button 
                  variant="destructive" 
                  onClick={stopCamera}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  <X className="h-5 w-5 mr-2" />
                  Close Camera
                </Button>
              )}
            </div>
            
            {/* Camera View */}
            {isCameraActive && (
              <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border border-border">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
            
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">
                    Selected Images ({images.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add More
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                        index === primaryImageIndex 
                          ? 'border-elec-yellow shadow-lg shadow-elec-yellow/20' 
                          : 'border-border hover:border-elec-yellow/50'
                      }`}
                      onClick={() => setPrimaryImageIndex(index)}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {index === primaryImageIndex && (
                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-elec-yellow text-black font-semibold gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Primary
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Click an image to set as primary
                </p>
              </div>
            )}

            {/* Analyse Button */}
            {images.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-64 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-base h-14"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Analysing Installation...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Analyse Installation
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Results Header Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <CardTitle className="text-foreground">Analysis Results</CardTitle>
                  <CardDescription>
                    {selectedMode === 'component_identify' ? 'Component identification' : 'BS 7671 compliance findings'}
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={resetAnalysis}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New Analysis
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Results Component - Conditional based on mode */}
          {selectedMode === 'component_identify' ? (
            <ComponentIdentificationResults analysisResult={analysisResult} />
          ) : (
            <VisualAnalysisResults 
              analysisResult={analysisResult}
              onExportReport={exportReport}
            />
          )}
        </div>
      )}

      {/* Hidden canvas for camera */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VisualAnalysisRedesigned;
