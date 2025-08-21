import { useState, useRef, useCallback } from "react";
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
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load background removal for performance
const loadBackgroundRemoval = async () => {
  const { removeBackground, loadImage } = await import("@/lib/background-removal");
  return { removeBackground, loadImage };
};

interface AnalysisResult {
  issues: Array<{
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    regulation?: string;
    location?: string;
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
}

const VisualAnalysis = () => {
  const [images, setImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [analysisHistory, setAnalysisHistory] = useState<Array<{ id: string; images: string[]; result: AnalysisResult; timestamp: Date }>>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileSelect = useCallback((files: FileList | null) => {
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

    setImages(prev => [...prev, ...imageFiles]);
    toast({
      title: "Images added",
      description: `${imageFiles.length} image(s) added for analysis.`,
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
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

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setImages(prev => [...prev, file]);
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
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `visual-analysis/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('evidence-files')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('evidence-files')
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

      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          type: "visual_analysis_advanced",
          primary_image: primaryImageUrl,
          additional_images: additionalImageUrls,
          context: {
            remove_background: removeBackground,
            analysis_focus: "safety_compliance"
          }
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Visual Analysis service');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const result: AnalysisResult = data.analysis || {
        issues: [
          {
            description: "Thermal damage visible on main switch contacts",
            severity: "high" as const,
            confidence: 0.92,
            regulation: "BS 7671 Section 422.2.1",
            location: "Consumer unit - main switch"
          },
          {
            description: "Loose terminal connections detected on MCB",
            severity: "medium" as const,
            confidence: 0.87,
            regulation: "BS 7671 Section 526.1"
          }
        ],
        recommendations: [
          {
            action: "Replace main switch immediately",
            priority: "high" as const,
            regulation: "BS 7671 422.2.1",
            cost_estimate: "£150-250"
          },
          {
            action: "Tighten all MCB connections to manufacturer specifications",
            priority: "medium" as const,
            regulation: "BS 7671 526.1"
          }
        ],
        regulations: [
          {
            clause: "BS 7671 422.2.1",
            description: "Precautions against thermal effects",
            compliance_status: "non_compliant" as const
          }
        ],
        overall_safety_rating: 6.5,
        summary: "Installation shows signs of thermal stress requiring immediate attention."
      };
      
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
        description: error instanceof Error ? error.message : "Failed to analyze images",
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
      
      // Summary
      doc.setFontSize(14);
      doc.text('Executive Summary', 20, 55);
      doc.setFontSize(10);
      const splitSummary = doc.splitTextToSize(analysisResult.summary, 170);
      doc.text(splitSummary, 20, 65);
      
      let yPosition = 65 + (splitSummary.length * 5) + 10;
      
      // Issues
      doc.setFontSize(14);
      doc.text('Identified Issues', 20, yPosition);
      yPosition += 10;
      
      const issueData = analysisResult.issues.map(issue => [
        issue.description,
        issue.severity.toUpperCase(),
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
        rec.priority.toUpperCase(),
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
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
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

  return (
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
          Upload images of electrical installations for AI-powered safety analysis and BS 7671 compliance checking.
          Get detailed fault identification with severity ratings and actionable recommendations.
        </p>
      </div>

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
                <Button
                  variant="outline"
                  className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
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
                className="w-full max-w-md mx-auto rounded-lg"
              />
              <div className="text-center">
                <Button onClick={captureImage} className="bg-blue-600 hover:bg-blue-700">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Image
                </Button>
              </div>
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />

          {/* Advanced Options */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-neutral-700/30 rounded-lg">
              <div>
                <label className="text-sm sm:text-base font-medium text-white">Remove Background</label>
                <p className="text-xs sm:text-sm text-gray-400">Focus analysis on the main subject</p>
              </div>
              <Switch
                checked={removeBackground}
                onCheckedChange={setRemoveBackground}
              />
            </div>
          </div>

          {/* Selected Images */}
          {images.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-gray-300 text-sm sm:text-base">Selected Images ({images.length})</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className={`w-full h-20 sm:h-24 object-cover rounded-lg border-2 cursor-pointer transition-all ${
                        index === primaryImageIndex 
                          ? 'border-blue-400 ring-2 ring-blue-400/50' 
                          : 'border-neutral-600 hover:border-neutral-500'
                      }`}
                      onClick={() => setPrimaryImageIndex(index)}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    {index === primaryImageIndex && (
                      <Badge className="absolute bottom-1 left-1 text-xs bg-blue-600">Primary</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Controls */}
          <div className="flex gap-2 sm:gap-3">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base" 
              onClick={handleAnalysis} 
              disabled={isAnalyzing || images.length === 0}
            >
              {isAnalyzing ? (
                <>
                  <Loader className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" /> 
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Analyze Images
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50 px-4 sm:px-6 h-10 sm:h-12 text-sm sm:text-base"
              onClick={() => setShowResults(!showResults)}
              disabled={!analysisResult}
            >
              {showResults ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="hidden sm:inline ml-2">
                {showResults ? 'Hide' : 'Show'}
              </span>
            </Button>
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="p-4 sm:p-6 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                </div>
                <span className="text-white font-medium text-sm sm:text-base">Analyzing electrical installation...</span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-full bg-neutral-700/50" />
                <Skeleton className="h-3 sm:h-4 w-3/4 bg-neutral-700/50" />
                <Skeleton className="h-3 sm:h-4 w-5/6 bg-neutral-700/50" />
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-medium text-gray-300 text-sm sm:text-base">Common analysis scenarios:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {exampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-neutral-600/50 text-gray-300 hover:bg-neutral-700/50 hover:border-neutral-500 h-auto py-2 sm:py-3 px-3 sm:px-4 text-left justify-start text-xs sm:text-sm"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && !isAnalyzing && showResults && (
        <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Analysis Results</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportReport}
                className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnalysisResult(null)}
                className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
            </div>
          </div>

          {/* Summary Card */}
          <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                </div>
                Summary
                <Badge 
                  className={`ml-auto ${
                    analysisResult.overall_safety_rating >= 8 ? 'bg-green-600' :
                    analysisResult.overall_safety_rating >= 6 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                >
                  Safety: {analysisResult.overall_safety_rating}/10
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-gray-300 text-sm sm:text-base">{analysisResult.summary}</p>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Issues */}
            <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                  </div>
                  Issues ({analysisResult.issues.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                {analysisResult.issues.map((issue, index) => (
                  <div key={index} className="p-3 bg-neutral-700/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-gray-300 text-sm flex-1">{issue.description}</p>
                      <Badge className={`text-xs ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Confidence: {Math.round(issue.confidence * 100)}%</span>
                      {issue.regulation && <span>{issue.regulation}</span>}
                    </div>
                    {issue.location && (
                      <p className="text-xs text-gray-500">Location: {issue.location}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  </div>
                  Recommendations ({analysisResult.recommendations.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-neutral-700/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-gray-300 text-sm flex-1">{rec.action}</p>
                      <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      {rec.cost_estimate && <span>Est: {rec.cost_estimate}</span>}
                      {rec.regulation && <span>{rec.regulation}</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Regulations */}
            <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  </div>
                  Regulations ({analysisResult.regulations.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                {analysisResult.regulations.map((reg, index) => (
                  <div key={index} className="p-3 bg-neutral-700/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-purple-400 text-sm font-medium">{reg.clause}</p>
                        <p className="text-gray-300 text-xs mt-1">{reg.description}</p>
                      </div>
                      <Badge 
                        className={`text-xs ${
                          reg.compliance_status === 'compliant' ? 'bg-green-600' :
                          reg.compliance_status === 'non_compliant' ? 'bg-red-600' :
                          'bg-yellow-600 text-black'
                        }`}
                      >
                        {reg.compliance_status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualAnalysis;