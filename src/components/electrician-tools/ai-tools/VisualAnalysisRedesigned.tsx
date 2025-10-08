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
  CheckCircle2,
  Zap,
  Eye,
  Lightbulb
} from "lucide-react";
import VisualAnalysisResults from "./VisualAnalysisResults";
import ComponentIdentificationResults from "./ComponentIdentificationResults";
import WiringSchematicDisplay from "./WiringSchematicDisplay";
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
    rag_verified?: {
      fault_code: string;
      regulation_references: any[];
      gn3_guidance: string;
      confidence: number;
      reasoning: string;
      verification_status: string;
    };
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
  rag_verified?: boolean;
  verification_note?: string;
  wiring_schematic?: {
    schematic_svg: string;
    circuit_spec: any;
    wiring_procedure: any[];
    terminal_connections: any[];
    testing_requirements: string[];
    installation_method_guidance: string;
    safety_warnings: string[];
    rag_sources: any;
  };
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

      const getFocusAreasForMode = (mode: AnalysisMode): string[] => {
        switch (mode) {
          case 'component_identify':
            return ['component identification', 'specifications', 'ratings', 'manufacturer details'];
          case 'wiring_instruction':
            return ['terminals', 'wire routing', 'connection points', 'cable types'];
          case 'installation_verify':
            return ['compliance checks', 'protective devices', 'earthing', 'labelling'];
          case 'fault_diagnosis':
          default:
            return ['visible defects', 'safety hazards', 'non-compliances', 'damage'];
        }
      };

      const { data, error } = await supabase.functions.invoke('visual-analysis', {
        body: { 
          primary_image: primaryImageUrl,
          additional_images: additionalImageUrls,
          analysis_settings: {
            mode: selectedMode || 'fault_diagnosis',
            confidence_threshold: 0.75,
            enable_bounding_boxes: true,
            focus_areas: getFocusAreasForMode(selectedMode || 'fault_diagnosis'),
            remove_background: false,
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
      
      const isRagError = error instanceof Error && error.message.includes('RAG');
      
      toast({
        title: isRagError ? "Analysis completed (RAG unavailable)" : "Analysis failed",
        description: error instanceof Error 
          ? error.message 
          : "Unable to analyse images. Please check your images and try again.",
        variant: isRagError ? "default" : "destructive",
        duration: 6000
      });
      
      if (!isRagError) {
        setImages([]);
        setPrimaryImageIndex(0);
      }
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
    <div className="space-y-4 sm:space-y-6 relative">
      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <Card className="p-6 max-w-sm mx-4 bg-card border-border">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-elec-yellow border-t-transparent" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg text-foreground">Analysing Images</h3>
                <p className="text-sm text-muted-foreground">
                  Stage 1: Scanning components...<br/>
                  Stage 2: Verifying against BS 7671...<br/>
                  Stage 3: Generating report...
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Compact Header */}
      <Card className="bg-gradient-to-br from-elec-card to-elec-grey/50 border-border">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base sm:text-lg text-foreground leading-tight break-words">
                  {getModeTitle()}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-0.5">
                  {getModeDescription()}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToModeSelection}
              className="text-muted-foreground hover:text-foreground flex-shrink-0 h-9 px-3"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Change</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {!analysisResult ? (
        <Card className="bg-card border-border">
          <CardContent className="p-4 sm:p-6 space-y-4">
            {/* Camera Button - Prominent on mobile */}
            <Button 
              onClick={isCameraActive ? captureImage : startCamera}
              className="w-full h-12 sm:h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-base shadow-lg shadow-elec-yellow/20"
              size="lg"
            >
              <Camera className="h-5 w-5 mr-2" />
              {isCameraActive ? 'Capture Photo' : 'Use Camera'}
            </Button>

            {isCameraActive && (
              <Button 
                variant="outline" 
                onClick={stopCamera}
                className="w-full h-11"
              >
                <X className="h-4 w-4 mr-2" />
                Close Camera
              </Button>
            )}
            
            {/* Camera View */}
            {isCameraActive && (
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border animate-fade-in">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Grid overlay for better framing */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/20" />
                    ))}
                  </div>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
            
            {/* Upload Zone - Compact & Inviting */}
            <div 
              className="relative border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center hover:border-elec-yellow/60 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-elec-yellow/5 to-transparent"
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
              <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
              <p className="text-sm sm:text-base font-semibold text-foreground mb-1">
                Drag & drop images here
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                or tap to browse files
              </p>
            </div>
            
            {/* Tips Section */}
            <div className="bg-elec-yellow/5 border-l-4 border-elec-yellow rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                <h4 className="text-xs sm:text-sm font-semibold text-foreground">Tips for Best Results</h4>
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Good lighting improves accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Get close to components for detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Multiple angles recommended</span>
                </li>
              </ul>
            </div>
            
            {/* Image Gallery - Mobile Optimized */}
            {images.length > 0 && (
              <div className="space-y-3 sm:space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    Selected Images ({images.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 sm:h-9"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Add More</span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-95 sm:hover:scale-105 ${
                        index === primaryImageIndex 
                          ? 'border-elec-yellow shadow-lg shadow-elec-yellow/20' 
                          : 'border-border hover:border-elec-yellow/50'
                      }`}
                      onClick={() => setPrimaryImageIndex(index)}
                    >
                      <div className="aspect-video w-full">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1.5 right-1.5 h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      {index === primaryImageIndex && (
                        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2">
                          <Badge className="bg-elec-yellow text-black font-semibold gap-1 text-xs px-2 py-0.5">
                            <CheckCircle2 className="h-3 w-3" />
                            Primary
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Tap an image to set as primary
                </p>
              </div>
            )}

            {/* Analyse Button - Sticky on mobile */}
            {images.length > 0 && (
              <div className="flex justify-center pt-2 sm:pt-4">
                <Button 
                  onClick={handleAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="w-full h-14 sm:h-16 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-sm sm:text-base shadow-lg shadow-elec-yellow/20 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      <span className="truncate">Analysing Installation...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>Analyse Installation</span>
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

          {/* RAG Verification Notice */}
          {analysisResult.rag_verified && analysisResult.verification_note && (
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="text-sm font-medium">{analysisResult.verification_note}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wiring Schematic Display (for wiring_instruction mode) */}
          {selectedMode === 'wiring_instruction' && analysisResult.wiring_schematic && (
            <WiringSchematicDisplay 
              schematicSvg={analysisResult.wiring_schematic.schematic_svg}
              circuitSpec={analysisResult.wiring_schematic.circuit_spec}
              wiringProcedure={analysisResult.wiring_schematic.wiring_procedure}
              terminalConnections={analysisResult.wiring_schematic.terminal_connections}
              testingRequirements={analysisResult.wiring_schematic.testing_requirements}
              installationMethodGuidance={analysisResult.wiring_schematic.installation_method_guidance}
              safetyWarnings={analysisResult.wiring_schematic.safety_warnings}
              ragSourcesCount={analysisResult.wiring_schematic.rag_sources}
            />
          )}

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
