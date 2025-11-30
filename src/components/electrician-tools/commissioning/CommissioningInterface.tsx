import { useState, lazy, Suspense, useEffect } from "react";
import { useCommissioningGeneration } from "@/hooks/useCommissioningGeneration";
import CommissioningInput from "./CommissioningInput";
import CommissioningProcessingView from "./CommissioningProcessingView";
import CommissioningSuccess from "./CommissioningSuccess";
import CommissioningResults from "./CommissioningResults";
import FaultDiagnosisView from "./FaultDiagnosisView";
import { Button } from "@/components/ui/button";
import type { CommissioningResponse, FaultDiagnosis } from "@/types/commissioning-response";

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
  if (isLoading) {
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
        <CommissioningProcessingView progress={progressStage} startTime={generationStartTime} />
        
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
