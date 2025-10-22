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
  AlertCircle,
  BookOpen,
  Scale
} from "lucide-react";
import VisualAnalysisResults from "./VisualAnalysisResults";
import InstallationVerificationResults from "./InstallationVerificationResults";
import ComponentIdentificationResults from "./ComponentIdentificationResults";
import WiringGuidanceDisplay from "./WiringGuidanceDisplay";
import WiringGuidanceSection from "./WiringGuidanceSection";
import ModeSelector, { AnalysisMode } from "./ModeSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InspectorChatModal } from "./InspectorChatModal";

interface AnalysisResult {
  findings?: Array<{
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
  recommendations?: Array<{
    action: string;
    priority: 'immediate' | 'urgent' | 'recommended';
    bs7671_reference?: string;
    cost_estimate?: string;
    eicr_code: 'C1' | 'C2' | 'C3';
  }>;
  compliance_summary?: {
    overall_assessment: 'satisfactory' | 'unsatisfactory';
    c1_count: number;
    c2_count: number;
    c3_count: number;
    fi_count: number;
    safety_rating: number;
  };
  summary?: string;
  rag_verified?: boolean;
  verification_note?: string;
  // Installation Verification fields
  verification_checks?: Array<{
    check_name: string;
    status: 'pass' | 'fail' | 'requires_testing';
    details: string;
    bs7671_references: string[];
    confidence: number;
  }>;
  improvement_recommendations?: string[];
  overall_result?: 'pass' | 'fail' | 'requires_testing';
  confidence_score?: number;
  processing_time?: number;
  wiring_schematic?: {
    component_name: string;
    component_details: string;
    pre_installation_tasks?: Array<{
      task: string;
      description: string;
      why?: string;
      tools_needed?: string[];
    }>;
    board_layout_guide?: {
      mcb_arrangement: string;
      earth_bar_numbering: string;
      neutral_bar_numbering: string;
      visual_diagram?: string;
    };
    wiring_sequence_strategy?: {
      order: string[];
      rationale: string;
    };
    practical_tips?: string[];
    common_mistakes?: string[];
    wiring_steps?: any[];
    terminal_connections?: any[];
    safety_warnings?: string[];
    required_tests?: string[];
    wiring_scenarios?: Array<{
      scenario_id: string;
      scenario_name: string;
      use_case: string;
      complexity: 'simple' | 'intermediate' | 'advanced';
      recommended: boolean;
      wiring_steps: any[];
      terminal_connections: any[];
      safety_warnings: string[];
      required_tests: string[];
    }>;
    comparison?: {
      key_differences: string[];
      decision_factors: string[];
    };
    rag_sources: any;
  };
}

interface VisualAnalysisRedesignedProps {
  initialMode?: AnalysisMode;
}

const VisualAnalysisRedesigned = ({ initialMode }: VisualAnalysisRedesignedProps) => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<AnalysisMode | null>(initialMode || null);
  const [images, setImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [fastMode, setFastMode] = useState(true); // Default Quick mode
  const [inspectorModalOpen, setInspectorModalOpen] = useState(false);
  const [userContext, setUserContext] = useState("");
  const [showContextField, setShowContextField] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [analyzedImageUrl, setAnalyzedImageUrl] = useState<string | null>(null);
  const [analysisTimestamp, setAnalysisTimestamp] = useState<string | null>(null);
  const [ragSources, setRagSources] = useState<{
    maintenanceKnowledge?: Array<{ topic: string; content: string; source: string; score: number }>;
    bs7671Regulations?: Array<{ regulation: string; section: string; content: string; score: number }>;
  } | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const compressImage = (file: File, maxWidth = 1920, quality = 0.85): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // More aggressive compression on mobile
      const isMobile = window.innerWidth < 768;
      const finalMaxWidth = isMobile ? 1280 : maxWidth;
      const finalQuality = isMobile ? 0.75 : quality;
      
      img.onload = () => {
        const ratio = Math.min(finalMaxWidth / img.width, finalMaxWidth / img.height);
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
          }, 'image/jpeg', finalQuality);
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
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    toast({
      title: "Cancelled",
      description: "Analysis stopped",
      duration: 2000
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

    // Animate progress steadily
    const targetProgress = fastMode ? 70 : 60;
    const step = fastMode ? 8 : 5;
    progressIntervalRef.current = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= targetProgress) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          return prev;
        }
        return prev + step;
      });
    }, 500);

    try {
      const primaryImageUrl = await uploadImageToSupabase(images[primaryImageIndex]);
      
      // Limit images in fast mode on mobile
      const isMobile = window.innerWidth < 768;
      const imageLimit = fastMode && isMobile ? 3 : images.length;
      const imagesToUpload = images.filter((_, index) => index !== primaryImageIndex).slice(0, imageLimit - 1);
      
      const additionalImageUrls = await Promise.all(
        imagesToUpload.map(image => uploadImageToSupabase(image))
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

      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Analysis cancelled');
      }
      
      let data, error;
      
      // Route to proper backend based on mode
      // Use RAG-enhanced function for fault diagnosis with user context
      const useRagEnhanced = selectedMode === 'fault_diagnosis' && userContext.trim().length > 10;
      
      if (useRagEnhanced) {
        console.log('🔍 Using RAG-enhanced fault diagnosis with maintenance knowledge + BS 7671');
        
        // Convert image to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            const base64 = reader.result?.toString().split(',')[1];
            resolve(base64 || '');
          };
          reader.readAsDataURL(images[primaryImageIndex]);
        });
        
        const base64Image = await base64Promise;
        
        const analyzeWithAbort = new Promise<any>((resolve, reject) => {
          if (abortControllerRef.current) {
            abortControllerRef.current.signal.addEventListener('abort', () => {
              reject(new Error('Analysis cancelled'));
            });
          }
          
          supabase.functions.invoke('visual-analysis-rag-enhanced', {
            body: {
              imageBase64: base64Image,
              userContext: userContext.trim(),
              mode: 'fault_diagnosis'
            }
          }).then(resolve).catch(reject);
        });
        
        const result = await analyzeWithAbort;
        
        // Store RAG sources if available
        if (result.data?.ragSources) {
          setRagSources(result.data.ragSources);
          console.log('📚 RAG Sources:', {
            maintenance: result.data.ragSources.maintenanceKnowledge?.length || 0,
            regulations: result.data.ragSources.bs7671Regulations?.length || 0
          });
        }
        
        // Transform RAG-enhanced response to match expected format
        data = {
          analysis: {
            summary: result.data?.analysis || '',
            rag_verified: result.data?.verified,
            verification_note: result.data?.verified 
              ? 'Analysis verified against BS 7671 Guidance Note 3 and BS 7671:2018+A3:2024' 
              : undefined
          }
        };
        error = result.error;
        
      } else if (selectedMode === 'wiring_instruction') {
        // Use wiring-diagram-generator-rag for comprehensive BS 7671 schematics
        const analyzeWithAbort = new Promise<any>((resolve, reject) => {
          if (abortControllerRef.current) {
            abortControllerRef.current.signal.addEventListener('abort', () => {
              reject(new Error('Analysis cancelled'));
            });
          }
          
          supabase.functions.invoke('wiring-diagram-generator-rag', {
            body: {
              component_type: userContext.trim() || 'electrical component',
              circuit_params: {
                cableSize: 2.5,
                cableType: '6242Y Twin & Earth',
                protectionDevice: '32A MCB Type B',
                rcdRequired: true,
                loadPower: 3000,
                voltage: 230
              },
              installation_context: userContext.trim() || 'Standard UK domestic installation. Analyse the uploaded image to determine specific component requirements and generate appropriate wiring schematic.',
              component_image_url: primaryImageUrl
            }
          }).then(resolve).catch(reject);
        });
        
        const result = await analyzeWithAbort;
        data = result.data;
        error = result.error;
        
        // Transform response to expected format
        if (!error && data) {
          data = {
            analysis: {
              wiring_schematic: data
            }
          };
        }
      } else {
        // Use visual-analysis for other modes
        const analyzeWithAbort = new Promise<any>((resolve, reject) => {
          if (abortControllerRef.current) {
            abortControllerRef.current.signal.addEventListener('abort', () => {
              reject(new Error('Analysis cancelled'));
            });
          }
          
          supabase.functions.invoke('visual-analysis', {
            body: { 
              primary_image: primaryImageUrl,
              additional_images: additionalImageUrls,
              user_context: userContext.trim() || undefined,
              analysis_settings: {
                mode: selectedMode || 'fault_diagnosis',
                confidence_threshold: 0.75,
                enable_bounding_boxes: true,
                focus_areas: getFocusAreasForMode(selectedMode || 'fault_diagnosis'),
                remove_background: false,
                bs7671_compliance: true,
                fast_mode: fastMode
              }
            }
          }).then(resolve).catch(reject);
        });
        
        const result = await analyzeWithAbort;
        data = result.data;
        error = result.error;
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (error) {
        if (error?.message?.includes('429') || error?.message?.includes('rate limit')) {
          throw new Error('RATE_LIMIT');
        }
        if (error?.message?.includes('402') || error?.message?.includes('payment')) {
          throw new Error('PAYMENT_REQUIRED');
        }
        throw new Error(error?.message || 'Edge function error');
      }

      if (!data) {
        throw new Error('No response from analysis');
      }

      if (data.error || data.code) {
        if (data.code === 429) throw new Error('RATE_LIMIT');
        if (data.code === 402) throw new Error('PAYMENT_REQUIRED');
        if (data.code === 'TIMEOUT') throw new Error('TIMEOUT');
        throw new Error(data.message || data.error || 'Analysis failed');
      }

      if (!data.analysis) {
        console.error('Invalid data structure:', data);
        throw new Error('Empty analysis - try again');
      }
      
      setAnalysisProgress(90);
      const result: AnalysisResult = data.analysis;
      
      // Debug log for component_identify mode
      if (selectedMode === 'component_identify') {
        console.log('📋 Component identify response keys:', Object.keys(data.analysis || {}));
        console.log('📋 Has component?', !!data.analysis?.component);
      }
      
      // Check if this is a parse error and should trigger auto-retry
      const isParseError = result.findings?.some(
        (f: any) => f.description?.toLowerCase().includes('unable to complete') ||
                    f.description?.toLowerCase().includes('format was invalid')
      );
      
      if (isParseError && retryAttempts === 0 && !fastMode) {
        console.log('🔄 Parse error detected, auto-retrying with Quick mode...');
        setRetryAttempts(1);
        setFastMode(true);
        
        toast({
          title: "Retrying with Quick mode",
          description: "Automatically retrying with faster settings...",
          duration: 3000
        });
        
      // Retry immediately with fast mode
        setTimeout(() => handleAnalysis(), 1000);
        return;
      }
      
      // Store image and timestamp for results display
      if (uploadedImageUrls.length > 0) {
        setAnalyzedImageUrl(uploadedImageUrls[primaryImageIndex]);
        setAnalysisTimestamp(new Date().toISOString());
      }
      
      // Normalise installation_verify analysis shape for UI stability
      let normalised: AnalysisResult = result;
      if (selectedMode === 'installation_verify') {
        const checksRaw = Array.isArray((result as any)?.verification_checks)
          ? (result as any).verification_checks
          : [];
        const checks = checksRaw.map((c: any) => ({
          check_name: c?.check_name ?? c?.check ?? c?.name ?? 'Verification check',
          status: (c?.status ?? c?.result ?? 'requires_testing') as any,
          details: c?.details ?? c?.detail ?? c?.summary ?? c?.description ?? 'No detail provided',
          bs7671_references: Array.isArray(c?.bs7671_references)
            ? c.bs7671_references
            : (c?.bs7671_reference ? [c.bs7671_reference] : []),
          confidence: typeof c?.confidence === 'number'
            ? c.confidence
            : (typeof c?.confidence_score === 'number' ? c.confidence_score : 0.7),
        }));
        normalised = {
          ...result,
          verification_checks: checks,
          improvement_recommendations: Array.isArray((result as any)?.improvement_recommendations)
            ? (result as any).improvement_recommendations
            : (Array.isArray((result as any)?.recommendations) ? (result as any).recommendations : []),
          overall_result: (result as any)?.overall_result ?? (result as any)?.assessment ?? (result as any)?.overall ?? 'requires_testing',
          confidence_score: (result as any)?.confidence_score ?? (result as any)?.confidence ?? 0.7,
          processing_time: (result as any)?.processing_time ?? (result as any)?.processing_time_ms ?? 0,
        } as any;
      }
      
      setAnalysisResult(normalised);
      setUploadedImageUrls([primaryImageUrl, ...additionalImageUrls]);
      setAnalysisProgress(100);
      setRetryAttempts(0); // Reset on success
      
      toast({
        title: "Analysis Complete",
        description: `${fastMode ? 'Quick' : 'Full'} analysis of ${1 + additionalImageUrls.length} image${additionalImageUrls.length > 0 ? 's' : ''}`,
        variant: "success",
        duration: 3000
      });
    } catch (error: any) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (error.message === 'Analysis cancelled' || error.name === 'AbortError' || abortControllerRef.current?.signal.aborted) {
        console.log('Analysis cancelled by user');
        return;
      }
      
      console.error('Visual Analysis Error:', error);
      
      let errorTitle = "Analysis failed";
      let errorDescription = "Please try again";
      
      if (error.message === 'RATE_LIMIT') {
        errorTitle = "Rate limit exceeded";
        errorDescription = "Too many requests. Wait a moment and try again.";
      } else if (error.message === 'PAYMENT_REQUIRED') {
        errorTitle = "Credits depleted";
        errorDescription = "Please top up your Lovable AI workspace credits.";
      } else if (error.message?.includes('timeout') || error.message?.includes('TIMEOUT')) {
        errorTitle = "Timeout";
        errorDescription = fastMode ? "Try with fewer images" : "Enable Quick mode or use fewer images";
      } else if (error.message) {
        errorDescription = error.message;
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      abortControllerRef.current = null;
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };

  const handleDiscussWithInspector = () => {
    setInspectorModalOpen(true);
  };

  const handleContextTagClick = (tag: string) => {
    setUserContext(prev => {
      const current = prev.trim();
      return current ? `${current}, ${tag}` : tag;
    });
  };

  const resetAnalysis = () => {
    setImages([]);
    setAnalysisResult(null);
    setUploadedImageUrls([]);
    setPrimaryImageIndex(0);
    setSelectedMode(null);
    setRetryAttempts(0);
  };
  
  const handleRetryFromError = () => {
    setRetryAttempts(prev => prev + 1);
    setFastMode(true); // Always use fast mode on manual retry
    setAnalysisResult(null);
    
    if (retryAttempts >= 2) {
      toast({
        title: "Need help?",
        description: "If issues persist, contact support@example.com",
        variant: "default",
        duration: 5000
      });
    }
    
    handleAnalysis();
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

  const getSeverityBorderColor = (code: string) => {
    switch (code) {
      case 'C1': return 'border-red-500';
      case 'C2': return 'border-orange-500';
      case 'C3': return 'border-yellow-500';
      default: return 'border-green-500';
    }
  };

  const getSeverityBgColor = (code: string) => {
    switch (code) {
      case 'C1': return 'bg-red-500/20';
      case 'C2': return 'bg-orange-500/20';
      case 'C3': return 'bg-yellow-500/20';
      default: return 'bg-green-500/20';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 pb-20 sm:pb-6">
      {/* Compact Header */}
      <Card className="bg-gradient-to-br from-elec-card to-elec-grey/50 border-border">
        <CardHeader className="p-3 sm:p-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Sparkles className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm sm:text-base text-foreground leading-tight">
                {getModeTitle()}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Guidance Section - Only for wiring_instruction mode */}
      {selectedMode === 'wiring_instruction' && !analysisResult && !isAnalyzing && (
        <WiringGuidanceSection />
      )}

      {/* Context Tags for Wiring Mode */}
      {selectedMode === 'wiring_instruction' && !analysisResult && !isAnalyzing && images.length > 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Quick Context</p>
            <div className="flex flex-wrap gap-1.5">
              {['Consumer Unit', 'Cooker Circuit', 'EV Charger', 'Shower Circuit', 'Outdoor Socket', 'Immersion Heater'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleContextTagClick(tag)}
                  className="px-2.5 py-1.5 text-xs bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow rounded border border-elec-yellow/30 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
            
            
            {/* Optional Context Field */}
            {images.length > 0 && (
              <div className="space-y-2 animate-fade-in">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContextField(!showContextField)}
                  className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Lightbulb className="h-3 w-3 mr-1.5" />
                  {showContextField ? 'Hide' : 'Add'} Context (Optional)
                </Button>
                
                {showContextField && (
                  <div className="space-y-2 p-3 bg-muted/30 rounded-lg border border-border/50">
                    <textarea
                      value={userContext}
                      onChange={(e) => setUserContext(e.target.value.slice(0, 200))}
                      placeholder="e.g., EICR inspection, fault occurred after storm, new installation..."
                      className="w-full h-16 px-3 py-2 text-xs bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 text-foreground placeholder:text-muted-foreground"
                      maxLength={200}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {['EICR', 'New Install', 'Fault', 'Upgrade', 'Rewire'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleContextTagClick(tag)}
                            className="px-2 py-0.5 text-xs bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow rounded border border-elec-yellow/30 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {userContext.length}/200
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
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
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-elec-grey border-t border-border sm:relative sm:border-0 sm:bg-transparent sm:p-0 z-40 space-y-2">
          {/* Quick/Full Toggle */}
          <div className="flex items-center justify-center gap-2 bg-muted/50 rounded-lg p-1">
            <button
              onClick={() => setFastMode(true)}
              className={`flex-1 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-all ${
                fastMode 
                  ? 'bg-elec-yellow text-black shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ⚡ Quick (5-8s)
            </button>
            <button
              onClick={() => setFastMode(false)}
              className={`flex-1 px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-all ${
                !fastMode 
                  ? 'bg-elec-yellow text-black shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🔍 Full (15-20s)
            </button>
          </div>
          
          <Button 
            onClick={handleAnalysis}
            size="lg"
            className="w-full h-12 sm:h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold shadow-lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            {fastMode ? 'Quick' : 'Full'} Analysis
          </Button>
        </div>
      )}

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-3 sm:space-y-4">
          {/* RAG Verification Badge */}
          {ragSources && (ragSources.maintenanceKnowledge?.length > 0 || ragSources.bs7671Regulations?.length > 0) && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                  ✓ Verified: GN3 + BS 7671
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {ragSources.maintenanceKnowledge?.length || 0} maintenance references, {ragSources.bs7671Regulations?.length || 0} regulations
                </p>
              </div>
            </div>
          )}

          {/* Findings */}
          {selectedMode === 'fault_diagnosis' && analysisResult.findings && analysisResult.findings.length > 0 && (
            <div className="space-y-4">
              {/* Summary Header with Classification Counts */}
              {analysisResult.compliance_summary && (
                <div className="flex flex-wrap gap-2 p-3 sm:p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
                  <p className="text-xs font-medium text-muted-foreground w-full mb-1">Classifications Found:</p>
                  {analysisResult.compliance_summary.c1_count > 0 && (
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
                      {analysisResult.compliance_summary.c1_count} × C1
                    </Badge>
                  )}
                  {analysisResult.compliance_summary.c2_count > 0 && (
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                      {analysisResult.compliance_summary.c2_count} × C2
                    </Badge>
                  )}
                  {analysisResult.compliance_summary.c3_count > 0 && (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                      {analysisResult.compliance_summary.c3_count} × C3
                    </Badge>
                  )}
                  {analysisResult.compliance_summary.fi_count > 0 && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                      {analysisResult.compliance_summary.fi_count} × FI
                    </Badge>
                  )}
                </div>
              )}

              {/* Sorted Findings Cards */}
              <div className="space-y-3">
                {analysisResult.findings
                  .sort((a, b) => {
                    const order: Record<string, number> = { C1: 0, C2: 1, C3: 2, FI: 3 };
                    return (order[a.eicr_code] ?? 999) - (order[b.eicr_code] ?? 999);
                  })
                  .map((finding, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg border-l-4 p-4 sm:p-5 ${getSeverityBorderColor(finding.eicr_code)} bg-elec-dark/50`}
                    >
                      {/* Header: Classification + Confidence */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getSeverityBgColor(finding.eicr_code)}`}>
                            {getSeverityIcon(finding.eicr_code)}
                          </div>
                          <Badge variant="outline" className="font-mono text-sm px-3 py-1">
                            {finding.eicr_code}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(finding.confidence * 100)}% confidence
                        </span>
                      </div>

                      {/* Description - LEFT ALIGNED */}
                      <p className="text-base text-white leading-relaxed mb-4 text-left">
                        {finding.description}
                      </p>

                      {/* BS 7671 References - LEFT ALIGNED */}
                      {finding.bs7671_clauses && finding.bs7671_clauses.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-elec-yellow mb-2 text-left">
                            BS 7671 References:
                          </p>
                          <ul className="space-y-1.5 text-left">
                            {finding.bs7671_clauses.map((clause, clauseIndex) => (
                              <li 
                                key={clauseIndex}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="text-elec-yellow mt-0.5">•</span>
                                <span>{clause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommended Fix - LEFT ALIGNED */}
                      {finding.fix_guidance && (
                        <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                          <div className="flex items-start gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                            <p className="text-sm font-semibold text-elec-yellow text-left">
                              Recommended Fix:
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed text-left ml-6">
                            {finding.fix_guidance}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              
              {/* RAG Sources - Collapsible Details */}
              {ragSources && (
                <div className="space-y-3 mt-4">
                  {/* Maintenance Knowledge (GN3) */}
                  {ragSources.maintenanceKnowledge && ragSources.maintenanceKnowledge.length > 0 && (
                    <details className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                      <summary className="font-semibold text-sm cursor-pointer flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        Inspection Guidance (BS 7671 Guidance Note 3) - {ragSources.maintenanceKnowledge.length} references
                      </summary>
                      <div className="mt-3 space-y-3">
                        {ragSources.maintenanceKnowledge.map((ref, idx) => (
                          <div key={idx} className="pl-6 border-l-2 border-blue-500/30 text-sm space-y-1">
                            <div className="font-medium text-blue-700 dark:text-blue-400">{ref.topic}</div>
                            <div className="text-muted-foreground text-xs leading-relaxed">{ref.content.substring(0, 300)}...</div>
                            <div className="text-xs text-muted-foreground/60">Source: {ref.source}</div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}

                  {/* BS 7671 Regulations */}
                  {ragSources.bs7671Regulations && ragSources.bs7671Regulations.length > 0 && (
                    <details className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                      <summary className="font-semibold text-sm cursor-pointer flex items-center gap-2">
                        <Scale className="h-4 w-4 text-amber-500" />
                        Regulatory Requirements (BS 7671:2018+A3:2024) - {ragSources.bs7671Regulations.length} regulations
                      </summary>
                      <div className="mt-3 space-y-3">
                        {ragSources.bs7671Regulations.map((reg, idx) => (
                          <div key={idx} className="pl-6 border-l-2 border-amber-500/30 text-sm space-y-1">
                            <div className="font-medium text-amber-700 dark:text-amber-400">
                              Regulation {reg.regulation} ({reg.section})
                            </div>
                            <div className="text-muted-foreground text-xs leading-relaxed">{reg.content.substring(0, 300)}...</div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Component Identification Results */}
          {selectedMode === 'component_identify' && (
            <ComponentIdentificationResults analysisResult={analysisResult} />
          )}

          {/* Wiring Guidance */}
          {selectedMode === 'wiring_instruction' && analysisResult.wiring_schematic && (
            <WiringGuidanceDisplay 
              componentName={analysisResult.wiring_schematic.component_name}
              componentDetails={analysisResult.wiring_schematic.component_details}
              wiringScenarios={analysisResult.wiring_schematic.wiring_scenarios || [
                {
                  scenario_id: 'default',
                  scenario_name: 'Standard Installation',
                  use_case: 'Standard BS 7671 compliant installation',
                  complexity: 'simple',
                  recommended: true,
                  wiring_steps: analysisResult.wiring_schematic.wiring_steps,
                  terminal_connections: analysisResult.wiring_schematic.terminal_connections,
                  safety_warnings: analysisResult.wiring_schematic.safety_warnings,
                  required_tests: analysisResult.wiring_schematic.required_tests
                }
              ]}
              comparison={analysisResult.wiring_schematic.comparison}
              ragSourcesCount={analysisResult.wiring_schematic.rag_sources}
              preInstallationTasks={analysisResult.wiring_schematic.pre_installation_tasks}
              boardLayoutGuide={analysisResult.wiring_schematic.board_layout_guide}
              wiringSequenceStrategy={analysisResult.wiring_schematic.wiring_sequence_strategy}
              practicalTips={analysisResult.wiring_schematic.practical_tips}
              commonMistakes={analysisResult.wiring_schematic.common_mistakes}
            />
          )}

          {/* Installation Verification */}
          {selectedMode === 'installation_verify' && analysisResult.verification_checks && (
            <InstallationVerificationResults 
              analysisResult={analysisResult}
              imageUrl={analyzedImageUrl || undefined}
              timestamp={analysisTimestamp || undefined}
              onStartChat={() => setInspectorModalOpen(true)}
              onExportReport={() => {
                toast({
                  title: "Export coming soon",
                  description: "PDF export functionality will be available shortly"
                });
              }}
            />
          )}

          {/* Action Button */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="lg"
              onClick={resetAnalysis}
              className="h-12 w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </div>
      )}

      {/* Hidden canvas for camera */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Inspector Chat Modal */}
      <InspectorChatModal
        isOpen={inspectorModalOpen}
        onClose={() => setInspectorModalOpen(false)}
        findings={analysisResult?.findings || []}
        imageUrl={uploadedImageUrls[0]}
        analysisMode={selectedMode || 'fault_diagnosis'}
        userContext={userContext}
      />
    </div>
  );
};

export default VisualAnalysisRedesigned;
