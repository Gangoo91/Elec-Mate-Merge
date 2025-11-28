import { useState, lazy, Suspense } from "react";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";
import CommissioningInput from "./CommissioningInput";
import CommissioningProcessingView from "./CommissioningProcessingView";
import CommissioningSuccess from "./CommissioningSuccess";
import CommissioningResults from "./CommissioningResults";
import FaultDiagnosisView from "./FaultDiagnosisView";
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
  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    location: "",
    clientName: "",
    installationDate: "",
    selectedType: 'domestic' as 'domestic' | 'commercial' | 'industrial'
  });
  
  const { callAgent, isLoading, progress } = useSimpleAgent();

  const handleGenerate = async (data: {
    prompt: string;
    selectedType: 'domestic' | 'commercial' | 'industrial';
    projectName: string;
    location: string;
    clientName: string;
    installationDate: string;
    imageUrl?: string;
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
    setUploadedImageUrl(data.imageUrl || null);
    
    const response = await callAgent('commissioning', {
      query: data.prompt,
      projectContext: {
        projectType: data.selectedType,
        buildingAge: 'modern',
      },
      projectName: data.projectName,
      location: data.location,
      clientName: data.clientName,
      installationDate: data.installationDate,
      imageUrl: data.imageUrl
    });
    
    if (response?.success) {
      const typedResponse = response as CommissioningResponse;
      if (typedResponse.mode === 'eicr-photo-analysis') {
        // EICR Photo Analysis response
        setResponseMode('fault-diagnosis'); // Reuse fault-diagnosis view
        setEicrDefects(typedResponse.eicrDefects || []);
        setFaultDiagnosis(null); // Clear standard diagnosis
        setShowCelebration(false);
      } else if (typedResponse.mode === 'fault-diagnosis') {
        // Fault diagnosis response
        setResponseMode('fault-diagnosis');
        setFaultDiagnosis(typedResponse.structuredDiagnosis || null);
        setEicrDefects([]); // Clear EICR defects
        setShowCelebration(false);
      } else if (typedResponse.mode === 'conversational') {
        // Conversational response
        setResponseMode('conversational');
        setConversationalResponse({
          text: typedResponse.response || '',
          queryType: typedResponse.queryType || 'question',
          citations: typedResponse.citations || []
        });
        setShowCelebration(false);
      } else {
        // Structured procedure response
        setResponseMode('procedure');
        setResults(typedResponse);
        
        if (!celebrationShown) {
          setShowCelebration(true);
          setCelebrationShown(true);
        }
      }
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
    return <CommissioningProcessingView progress={progress} startTime={generationStartTime} />;
  }

  // CONVERSATIONAL MODE: Show chat-style response
  if (responseMode === 'conversational' && conversationalResponse) {
    return (
      <Suspense fallback={<CommissioningProcessingView progress={progress} startTime={generationStartTime} />}>
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
        onStartOver={handleStartOver}
        onAskFollowUp={(followUpQuery) => {
          handleGenerate({
            prompt: followUpQuery,
            selectedType: projectInfo.selectedType,
            projectName: projectInfo.projectName,
            location: projectInfo.location,
            clientName: projectInfo.clientName,
            installationDate: projectInfo.installationDate,
            imageUrl: uploadedImageUrl || undefined
          });
        }}
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
