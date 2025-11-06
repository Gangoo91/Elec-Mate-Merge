import { useState } from "react";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";
import CommissioningInput from "./CommissioningInput";
import CommissioningProcessingView from "./CommissioningProcessingView";
import CommissioningSuccess from "./CommissioningSuccess";
import CommissioningResults from "./CommissioningResults";
import type { CommissioningResponse } from "@/types/commissioning-response";

const CommissioningInterface = () => {
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [results, setResults] = useState<CommissioningResponse | null>(null);
  const [generationStartTime, setGenerationStartTime] = useState(0);
  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    location: "",
    clientName: "",
    installationDate: ""
  });
  
  const { callAgent, isLoading, progress } = useSimpleAgent();

  const handleGenerate = async (data: {
    prompt: string;
    selectedType: 'domestic' | 'commercial' | 'industrial';
    projectName: string;
    location: string;
    clientName: string;
    installationDate: string;
  }) => {
    setGenerationStartTime(Date.now());
    setShowResults(true);
    setCelebrationShown(false);
    
    // Store project info for results page
    setProjectInfo({
      projectName: data.projectName,
      location: data.location,
      clientName: data.clientName,
      installationDate: data.installationDate
    });
    
    const response = await callAgent('commissioning', {
      query: data.prompt,
      projectContext: {
        projectType: data.selectedType,
        buildingAge: 'modern',
      },
      projectName: data.projectName,
      location: data.location,
      clientName: data.clientName,
      installationDate: data.installationDate
    });
    
    if (response?.success) {
      setResults(response as CommissioningResponse);
      
      // Show celebration screen if not shown before
      if (!celebrationShown) {
        setShowCelebration(true);
        setCelebrationShown(true);
      }
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setResults(null);
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

  // Show celebration screen after success
  if (showCelebration && results) {
    return (
      <CommissioningSuccess 
        results={results} 
        onViewResults={handleViewResults}
        generationTime={generationTime}
      />
    );
  }

  // Show results page
  if (results) {
    return (
      <CommissioningResults 
        results={results}
        projectName={projectInfo.projectName}
        location={projectInfo.location}
        installationDate={projectInfo.installationDate}
        onStartOver={handleStartOver}
      />
    );
  }

  // Fallback: show input
  return <CommissioningInput onGenerate={handleGenerate} isProcessing={isLoading} />;
};

export default CommissioningInterface;
