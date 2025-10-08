import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  Upload, 
  X, 
  Loader, 
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Plus,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  AlertTriangle,
  ShieldAlert,
  AlertCircle
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
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<AnalysisMode | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  
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

  const cancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    toast({
      title: "Analysis cancelled",
      description: "Visual analysis has been stopped",
      variant: "default"
    });
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
    setAnalysisProgress(10);
    abortControllerRef.current = new AbortController();

    try {
      setAnalysisProgress(20);
      const primaryImageUrl = await uploadImageToSupabase(images[primaryImageIndex]);
      
      setAnalysisProgress(40);
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

      setAnalysisProgress(60);
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
      
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setAnalysisProgress(90);
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Visual Analysis service');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const result: AnalysisResult = data.analysis;
      setAnalysisResult(result);
      setUploadedImageUrls([primaryImageUrl, ...additionalImageUrls]);
      setAnalysisProgress(100);
      
      toast({
        title: "Analysis complete",
        description: "BS 7671 compliance check finished",
        variant: "success"
      });
    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      
      console.error('Analysis Error:', error);
      
      toast({
        title: "Analysis failed",
        description: error instanceof Error 
          ? error.message 
          : "Unable to analyse images. Please try again.",
        variant: "destructive",
        duration: 6000
      });
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsAnalyzing(false);
        setAnalysisProgress(0);
      }
      abortControllerRef.current = null;
    }
  };

  const handleDiscussWithInspector = () => {
    const findings = analysisResult?.findings || [];
    const context = {
      analysisType: 'visual_inspection',
      findings: findings.map(f => ({
        issue: f.description,
        code: f.eicr_code,
        clauses: f.bs7671_clauses
      })),
      imageCount: uploadedImageUrls.length
    };
    
    navigate('/electrician-tools/ai-tooling/assistant', { 
      state: { visualAnalysisContext: context }
    });
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

  const getSeverityIcon = (code: string) => {
    switch (code) {
      case 'C1': return <ShieldAlert className="h-4 w-4" />;
      case 'C2': return <AlertTriangle className="h-4 w-4" />;
      case 'C3': return <AlertCircle className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (code: string) => {
    switch (code) {
      case 'C1': return 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400';
      case 'C2': return 'bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400';
      case 'C3': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      default: return 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 pb-20 sm:pb-6">
      {/* Compact Header */}
      <Card className="bg-gradient-to-br from-elec-card to-elec-grey/50 border-border">
        <CardHeader className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <CardTitle className="text-sm sm:text-base text-foreground leading-tight">
                  {getModeTitle()}
                </CardTitle>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToModeSelection}
              className="h-8 px-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Inline Loading State */}
      {isAnalyzing && (
        <Card className="bg-card border-border animate-fade-in">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Loader className="h-5 w-5 animate-spin text-elec-yellow" />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">Analysing Installation</h3>
                    <p className="text-xs text-muted-foreground">Verifying against BS 7671...</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={cancelAnalysis}
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-elec-yellow transition-all duration-500 ease-out"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {analysisProgress < 30 && "Uploading images..."}
                  {analysisProgress >= 30 && analysisProgress < 70 && "Scanning components..."}
                  {analysisProgress >= 70 && "Generating report..."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      {!analysisResult && !isAnalyzing ? (
        <Card className="bg-card border-border">
          <CardContent className="p-3 sm:p-6 space-y-3 sm:space-y-4">
            {/* Camera Button */}
            <Button 
              onClick={isCameraActive ? captureImage : startCamera}
              className="w-full h-11 sm:h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
            >
              <Camera className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {isCameraActive ? 'Capture Photo' : 'Use Camera'}
            </Button>

            {isCameraActive && (
              <Button 
                variant="outline" 
                onClick={stopCamera}
                className="w-full h-9"
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
            
            {/* Upload Zone */}
            <div 
              className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-elec-yellow/60 transition-colors cursor-pointer group"
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
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
              <p className="text-xs sm:text-sm font-medium text-foreground">
                Tap to upload images
              </p>
            </div>
            
            
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-medium text-foreground">
                    {images.length} image{images.length > 1 ? 's' : ''}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-7 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        index === primaryImageIndex 
                          ? 'border-elec-yellow' 
                          : 'border-border'
                      }`}
                      onClick={() => setPrimaryImageIndex(index)}
                    >
                      <div className="aspect-square w-full">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === primaryImageIndex && (
                        <div className="absolute bottom-1 left-1">
                          <Badge className="bg-elec-yellow text-black text-xs px-1.5 py-0">
                            Primary
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}

      {/* Analyse Button - Fixed at bottom on mobile */}
      {images.length > 0 && !isAnalyzing && !analysisResult && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-elec-grey border-t border-border sm:relative sm:border-0 sm:bg-transparent sm:p-0 z-40">
          <Button 
            onClick={handleAnalysis}
            size="lg"
            className="w-full h-12 sm:h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold shadow-lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Analyse Installation
          </Button>
        </div>
      )}

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-3 sm:space-y-4">
          {/* Findings */}
          {selectedMode === 'fault_diagnosis' && analysisResult.findings && analysisResult.findings.length > 0 && (
            <div className="space-y-2">
              {analysisResult.findings.map((finding, index) => (
                <Card key={index} className={`border-l-4 ${getSeverityColor(finding.eicr_code)}`}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className={`p-1.5 rounded ${getSeverityColor(finding.eicr_code)}`}>
                          {getSeverityIcon(finding.eicr_code)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="font-mono text-xs">
                              {finding.eicr_code}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(finding.confidence * 100)}% confidence
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground">{finding.description}</p>
                          {finding.bs7671_clauses && finding.bs7671_clauses.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              BS 7671: {finding.bs7671_clauses.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                      {finding.fix_guidance && (
                        <div className="pl-9 text-xs text-muted-foreground border-l-2 border-border ml-2 pl-3">
                          {finding.fix_guidance}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Component Identification Results */}
          {selectedMode === 'component_identify' && (
            <ComponentIdentificationResults analysisResult={analysisResult} />
          )}

          {/* Wiring Schematic */}
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

          {/* Installation Verification */}
          {selectedMode === 'installation_verify' && (
            <VisualAnalysisResults 
              analysisResult={analysisResult}
              onExportReport={() => {}}
            />
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button 
              onClick={handleDiscussWithInspector}
              size="lg"
              className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Discuss with Inspector AI
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={resetAnalysis}
              className="h-12"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </div>
      )}

      {/* Hidden canvas for camera */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VisualAnalysisRedesigned;
