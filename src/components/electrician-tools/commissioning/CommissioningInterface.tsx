import { useState, lazy, Suspense, useEffect } from "react";
import { useCommissioningGeneration } from "@/hooks/useCommissioningGeneration";
import { supabase } from "@/integrations/supabase/client";
import CommissioningInput from "./CommissioningInput";
import CommissioningProcessingView from "./CommissioningProcessingView";
import CommissioningSuccess from "./CommissioningSuccess";
import CommissioningResults from "./CommissioningResults";
import FaultDiagnosisView from "./FaultDiagnosisView";
import { Button } from "@/components/ui/button";
import type { CommissioningResponse, FaultDiagnosis } from "@/types/commissioning-response";
import { toast } from "sonner";

const CommissioningChat = lazy(() => import("./CommissioningChat"));

const CommissioningInterface = () => {
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [results, setResults] = useState<CommissioningResponse | null>(null);
  const [generationStartTime, setGenerationStartTime] = useState(0);
  const [responseMode, setResponseMode] = useState<'procedure' | 'conversational' | 'fault-diagnosis' | null>(null);
  const [conversationalResponse, setConversationalResponse] = useState<{
    text: string;
    queryType: 'troubleshooting' | 'question' | 'photo-analysis';
    citations: any[];
  } | null>(null);
  const [faultDiagnosis, setFaultDiagnosis] = useState<FaultDiagnosis | null>(null);
  const [eicrDefects, setEicrDefects] = useState<any[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isFastPath, setIsFastPath] = useState(false);
  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    location: "",
    clientName: "",
    installationDate: "",
    selectedType: 'domestic' as 'domestic' | 'commercial' | 'industrial'
  });
  
  const { job, isLoading, error, createJob, cancelJob } = useCommissioningGeneration();

  // Update results when job completes
  useEffect(() => {
    if (job?.status === 'complete' && job.result_data) {
      const typedResponse = job.result_data as CommissioningResponse;
      if (typedResponse.mode === 'eicr-photo-analysis') {
        setResponseMode('fault-diagnosis');
        setEicrDefects(typedResponse.eicrDefects || []);
        setFaultDiagnosis(null);
        setShowCelebration(false);
      } else if (typedResponse.mode === 'fault-diagnosis') {
        setResponseMode('fault-diagnosis');
        setFaultDiagnosis(typedResponse.structuredDiagnosis || null);
        setEicrDefects([]);
        setShowCelebration(false);
      } else if (typedResponse.mode === 'conversational') {
        setResponseMode('conversational');
        setConversationalResponse({
          text: typedResponse.response || '',
          queryType: typedResponse.queryType || 'question',
          citations: typedResponse.citations || []
        });
        setShowCelebration(false);
      } else {
        setResponseMode('procedure');
        setResults(typedResponse);
        if (!celebrationShown) {
          setShowCelebration(true);
          setCelebrationShown(true);
        }
      }
    }
  }, [job, celebrationShown]);

  const handleGenerate = async (data: {
    prompt: string;
    selectedType: 'domestic' | 'commercial' | 'industrial';
    projectName: string;
    location: string;
    clientName: string;
    installationDate: string;
    imageUrl?: string;
    imageUrls?: string[];
  }) => {
    setGenerationStartTime(Date.now());
    setShowResults(true);
    setCelebrationShown(false);
    
    // Store project info for results page
    setProjectInfo({
      projectName: data.projectName,
      location: data.location,
      clientName: data.clientName,
      installationDate: data.installationDate,
      selectedType: data.selectedType
    });
    
    // Store uploaded image URL for results display
    const imageUrlsArray = data.imageUrls || (data.imageUrl ? [data.imageUrl] : []);
    setUploadedImageUrl(imageUrlsArray.length > 0 ? imageUrlsArray[0] : null);
    setUploadedImageUrls(imageUrlsArray);
    
    // FAST PATH: Direct call to commissioning-v3 for EICR photo analysis
    const hasPhotos = imageUrlsArray.length > 0;
    
    if (hasPhotos) {
      console.log('🚀 Fast path: Calling commissioning-v3 directly for photo analysis');
      setIsFastPath(true);
      
      try {
        const { data: result, error: invokeError } = await supabase.functions.invoke('commissioning-v3', {
          body: {
            query: data.prompt,
            imageUrl: imageUrlsArray[0],
            imageUrls: imageUrlsArray,
            projectContext: {
              projectType: data.selectedType,
              projectName: data.projectName,
              location: data.location,
              clientName: data.clientName,
              installationDate: data.installationDate
            }
          }
        });

        if (invokeError) {
          throw invokeError;
        }

        if (!result?.success) {
          throw new Error(result?.error || 'Photo analysis failed');
        }

        console.log('✅ Fast path complete:', result);
        
        const typedResponse = result as CommissioningResponse;
        
        // Handle EICR photo analysis response
        if (typedResponse.mode === 'eicr-photo-analysis') {
          setResponseMode('fault-diagnosis');
          setEicrDefects(typedResponse.eicrDefects || []);
          setFaultDiagnosis(null);
        } else if (typedResponse.mode === 'fault-diagnosis') {
          setResponseMode('fault-diagnosis');
          setFaultDiagnosis(typedResponse.structuredDiagnosis || null);
          setEicrDefects([]);
        } else {
          // Fallback to other modes
          setResponseMode(typedResponse.mode || 'conversational');
          setConversationalResponse({
            text: typedResponse.response || '',
            queryType: typedResponse.queryType || 'photo-analysis',
            citations: typedResponse.citations || []
          });
        }
        
        // Clear fast path state so results display correctly
        setIsFastPath(false);
        
        toast.success('Photo analysis complete', {
          description: 'Results ready in ~' + Math.floor((Date.now() - generationStartTime) / 1000) + 's'
        });
        
      } catch (err) {
        console.error('❌ Fast path error:', err);
        toast.error('Photo analysis failed', {
          description: err instanceof Error ? err.message : 'Unknown error occurred'
        });
        setShowResults(false);
        setIsFastPath(false);
      }
      
      return;
    }
    
    // SLOW PATH: Use job queue for detailed commissioning procedures
    console.log('🐌 Slow path: Using job queue for commissioning procedures');
    setIsFastPath(false);
    
    try {
      await createJob({
        query: data.prompt,
        projectContext: {
          projectType: data.selectedType,
          buildingAge: 'modern',
        },
        projectName: data.projectName,
        location: data.location,
        clientName: data.clientName,
        installationDate: data.installationDate,
        imageUrl: data.imageUrl,
        imageUrls: data.imageUrls
      });
    } catch (err) {
      console.error('Error creating commissioning job:', err);
    }
  };

  const handleCancel = () => {
    if (job?.id) {
      cancelJob(job.id);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setResults(null);
    setResponseMode(null);
    setConversationalResponse(null);
    setFaultDiagnosis(null);
    setEicrDefects([]);
    setUploadedImageUrl(null);
    setUploadedImageUrls([]);
    setIsFastPath(false);
  };

  const handleViewResults = () => {
    setShowCelebration(false);
  };

  const generationTime = generationStartTime > 0 
    ? Math.floor((Date.now() - generationStartTime) / 1000) 
    : 0;

  // Show input form
  if (!showResults) {
    return <CommissioningInput onGenerate={handleGenerate} isProcessing={isLoading} />;
  }

  // Show processing view while loading
  if (isLoading || isFastPath) {
    // Fast path: Simple loading message for photo analysis
    if (isFastPath && !isLoading) {
      return (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Analyzing photo...</h3>
            <p className="text-sm text-white/70 text-center max-w-md">
              Using Gemini AI to analyze your EICR photo for defect codes
            </p>
          </div>
        </div>
      );
    }
    
    // Slow path: Detailed progress for commissioning procedures
    const progressStage = {
      stage: 
        !job?.progress || job.progress < 20 ? 'initializing' as const :
        job.progress < 50 ? 'parsing' as const :
        job.progress < 75 ? 'ai' as const :
        job.progress < 100 ? 'validation' as const : 'complete' as const,
      message: job?.current_step || 'Processing...'
    };

    return (
      <div className="space-y-6">
        <CommissioningProcessingView 
          progress={progressStage} 
          startTime={generationStartTime}
          backendProgress={job?.progress || 0}
        />
        
        {/* Progress Display with Cancel */}
        {job && (
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Generating Procedures</h3>
                  <p className="text-sm text-white/70 mt-1">
                    {job.current_step || 'Processing...'}
                  </p>
                </div>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 hover:bg-red-500/10 text-red-400"
                >
                  Cancel
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Progress</span>
                  <span className="text-white font-medium">{job.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-elec-yellow transition-all duration-500"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>
    );
  }

  // Handle race condition: job complete but responseMode not yet set by useEffect
  if (job?.status === 'complete' && !responseMode) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Preparing results...</div>
      </div>
    );
  }

  // CONVERSATIONAL MODE: Show chat-style response
  if (responseMode === 'conversational' && conversationalResponse) {
    return (
      <Suspense fallback={<CommissioningProcessingView progress={{ stage: 'ai', message: 'Loading...' }} startTime={generationStartTime} />}>
        <CommissioningChat
          response={conversationalResponse.text}
          queryType={conversationalResponse.queryType}
          citations={conversationalResponse.citations}
          onStartOver={handleStartOver}
          onAskFollowUp={(followUpQuery) => {
            handleGenerate({
              prompt: followUpQuery,
              selectedType: projectInfo.selectedType,
              projectName: projectInfo.projectName,
              location: projectInfo.location,
              clientName: projectInfo.clientName,
              installationDate: projectInfo.installationDate
            });
          }}
        />
      </Suspense>
    );
  }

  // FAULT DIAGNOSIS MODE: Show structured fault troubleshooting or EICR defects
  if (responseMode === 'fault-diagnosis' && (faultDiagnosis || eicrDefects.length > 0)) {
    return (
      <FaultDiagnosisView
        diagnosis={faultDiagnosis}
        eicrDefects={eicrDefects}
        imageUrl={uploadedImageUrl}
        imageUrls={uploadedImageUrls}
        onStartOver={handleStartOver}
      />
    );
  }

  // PROCEDURE MODE: Show structured results
  if (responseMode === 'procedure' && results) {
    return (
      <>
        <CommissioningResults 
          results={results}
          projectName={projectInfo.projectName}
          location={projectInfo.location}
          installationDate={projectInfo.installationDate}
          installationType={projectInfo.selectedType}
          onStartOver={handleStartOver}
        />
        
        {/* Success celebration popup */}
        <CommissioningSuccess 
          results={results} 
          onViewResults={handleViewResults}
          generationTime={generationTime}
          open={showCelebration}
          onOpenChange={setShowCelebration}
        />
      </>
    );
  }

  // Fallback: show input
  return <CommissioningInput onGenerate={handleGenerate} isProcessing={isLoading} />;
};

export default CommissioningInterface;
