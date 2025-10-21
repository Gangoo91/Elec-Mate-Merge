import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { InstallationInputForm } from "./InstallationInputForm";
import { InstallationProcessingView } from "./InstallationProcessingView";
import { InstallationResultsEditor } from "./InstallationResultsEditor";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { generateMethodStatement } from "./methodStatementHandler";

type ViewMode = 'input' | 'processing' | 'results';

const InstallationSpecialistInterface = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('input');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ stage: 0, percent: 0, message: '' });
  const [methodData, setMethodData] = useState<any>(null);
  const [installationGuide, setInstallationGuide] = useState("");
  const [generateFullMethodStatement, setGenerateFullMethodStatement] = useState(true);
  const [methodStatementProgress, setMethodStatementProgress] = useState<string>('');
  
  // Watchdog refs for detecting stalls
  const lastAdvanceRef = useRef(Date.now());
  const lastProjectRef = useRef<{details: ProjectDetailsType, description: string} | null>(null);
  const watchdogShownRef = useRef(false);

  // Helper to advance progress without going backwards
  const applyProgress = (stage: number, percent: number, message: string) => {
    setProgress(prev => {
      const shouldUpdate = stage > prev.stage || (stage === prev.stage && percent > prev.percent);
      if (shouldUpdate) {
        lastAdvanceRef.current = Date.now();
      }
      return shouldUpdate ? { stage, percent, message } : prev;
    });
  };

  // Watchdog timer to detect stalls
  useEffect(() => {
    if (!isProcessing) {
      watchdogShownRef.current = false;
      return;
    }
    
    const watchdogId = setInterval(() => {
      const stuckMs = Date.now() - lastAdvanceRef.current;
      if (stuckMs > 120000 && (progress.stage === 1 || progress.stage === 2) && !watchdogShownRef.current) {
        watchdogShownRef.current = true;
        toast({
          title: 'Taking longer than usual',
          description: 'The full method statement can take 3-5 minutes. Use the "Switch to Quick Mode" button below for a faster result.',
        });
        clearInterval(watchdogId);
      }
    }, 5000);
    
    return () => clearInterval(watchdogId);
  }, [isProcessing, progress.stage]);

  const handleGenerate = async (projectDetails: ProjectDetailsType, description: string, useFullMethodStatement: boolean = false) => {
    // Store for Quick Mode fallback
    lastProjectRef.current = { details: projectDetails, description };
    
    // Update the internal state based on user selection from the form
    setGenerateFullMethodStatement(useFullMethodStatement);
    setCurrentView('processing');
    setIsProcessing(true);
    setMethodData(null);
    setInstallationGuide("");
    setMethodStatementProgress('');
    setProgress({ stage: 0, percent: 0, message: '' });
    lastAdvanceRef.current = Date.now();
    watchdogShownRef.current = false;

    try {
      if (useFullMethodStatement) {
        // 3-AGENT METHOD STATEMENT MODE (Installer first, then H&S + Maintenance parallel)
        const query = `Create a comprehensive method statement for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        const mergedResult = await generateMethodStatement(
          query,
          projectDetails,
          'ms-' + Date.now(),
          (msg) => {
            setMethodStatementProgress(msg);
            
            // Priority 1: Check explicit stage tokens FIRST (from backend)
            const t = msg.trim().toUpperCase();
            if (t.startsWith('STAGE_1_START') || t.includes('STAGE_1_START')) {
              return applyProgress(1, 20, 'Analysing installation requirements...');
            }
            if (t.startsWith('STAGE_2_START') || t.includes('STAGE_2_START')) {
              return applyProgress(2, 40, 'Checking BS 7671 regulations...');
            }
            if (t.startsWith('STAGE_3_START') || t.includes('STAGE_3_START')) {
              return applyProgress(3, 60, 'Creating step-by-step instructions...');
            }
            if (t.startsWith('STAGE_4_START') || t.includes('STAGE_4_START')) {
              return applyProgress(4, 85, 'Listing tools and materials...');
            }
            if (t.startsWith('STAGE_5_COMPLETE') || t.includes('STAGE_5_COMPLETE')) {
              return applyProgress(5, 95, 'Adding safety notes and checks...');
            }

            // Priority 2: Content hints as fallback (check specific phrases before generic)
            const m = msg.toLowerCase();
            if (m.includes('final validation') || m.includes('inspection items')) {
              applyProgress(4, 90, 'Finalising method and inspection items...');
            } else if (m.includes('risk assessment complete')) {
              applyProgress(3, 70, 'Risk assessment complete...');
            } else if (m.includes('generating steps') && m.includes('installation')) {
              applyProgress(2, 45, 'Generating installation steps...');
            } else if (m.includes('searching installation procedures')) {
              applyProgress(1, 25, 'Searching installation procedures...');
            } else if (m.includes('searching') && !m.includes('generating') && progress.stage < 2) {
              // Generic "Searching" only if we haven't progressed beyond stage 1
              applyProgress(1, 20, 'Analysing installation requirements...');
            }
          }
        );

        applyProgress(5, 100, 'Complete!');

        // Transform merged result for UI display
        const installationSteps = mergedResult.installationSteps.map((step: any) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          content: step.description,
          safety: step.safetyRequirements,
          toolsRequired: step.equipmentNeeded,
          materialsNeeded: [],
          estimatedDuration: step.estimatedDuration,
          riskLevel: step.riskLevel,
          inspectionCheckpoints: step.inspectionCheckpoints,
          linkedHazards: step.linkedHazards
        }));

        const allTools = [...new Set(installationSteps.flatMap((s: any) => s.toolsRequired || []))];
        const riskLevels = installationSteps.map((s: any) => s.riskLevel);
        const overallRisk = riskLevels.includes('high') ? 'high' : 
                           riskLevels.includes('medium') ? 'medium' : 'low';

        // Calculate actual total duration from steps
        const totalMinutes = installationSteps.reduce((sum: number, step: any) => {
          const stepTime = typeof step.estimatedDuration === 'number' 
            ? step.estimatedDuration 
            : parseInt(step.estimatedDuration) || 20;
          return sum + stepTime;
        }, 0);

        const formatDuration = (mins: number): string => {
          if (mins < 60) return `${mins} minutes`;
          const hours = Math.floor(mins / 60);
          const remainingMins = mins % 60;
          return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} hours`;
        };

        const summary = {
          totalSteps: installationSteps.length,
          estimatedDuration: formatDuration(totalMinutes),
          requiredQualifications: [mergedResult.competencyRequirements.minimumQualifications],
          toolsRequired: allTools,
          materialsRequired: [],
          overallRiskLevel: overallRisk as 'low' | 'medium' | 'high'
        };

        setMethodData({
          jobTitle: description,
          installationType: projectDetails.installationType,
          steps: installationSteps,
          summary,
          projectDetails,
          // Store full merged data for PDF generation
          _fullMethodStatement: mergedResult
        });

        toast({
          title: "Method Statement Generated",
          description: `Complete with ${summary.totalSteps} steps, testing procedures, and risk assessment`,
          variant: "success",
        });

      } else {
        // QUICK MODE - Just installer-v3
        const stages = [
          { stage: 1, percent: 20, message: 'Analysing installation requirements...' },
          { stage: 2, percent: 50, message: 'Generating step-by-step procedures...' },
          { stage: 3, percent: 80, message: 'Compiling safety requirements...' },
          { stage: 4, percent: 95, message: 'Finalising installation method...' }
        ];
        
        let stageIndex = 0;
        const progressInterval = setInterval(() => {
          if (stageIndex < stages.length) {
            applyProgress(stages[stageIndex].stage, stages[stageIndex].percent, stages[stageIndex].message);
            stageIndex++;
          }
        }, 1500);

        const query = `Create a detailed step-by-step installation method for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        const { data, error } = await supabase.functions.invoke('installer-v3', {
          body: { query, installationType: projectDetails.installationType }
        });

        clearInterval(progressInterval);
        applyProgress(5, 100, 'Complete!');

        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || 'Failed to generate installation method');

        // FIX: Correct field mapping for installer-v3 response
        const steps = data.structuredData?.installationSteps || 
                      data.installationSteps || 
                      data.methodStatementSteps || [];

        const installationSteps = steps.map((step: any, index: number) => ({
          stepNumber: step.step || step.stepNumber || index + 1,
          title: step.title || step.stepTitle || `Step ${index + 1}`,
          content: step.description || step.content || '',
          safety: step.safetyNotes || step.safetyRequirements || [],
          toolsRequired: step.tools || step.equipmentNeeded || [],
          materialsNeeded: step.materials || [],
          estimatedDuration: step.estimatedTime || step.estimatedDuration || step.duration || 'Not specified',
          riskLevel: (step.riskLevel || 'medium') as 'low' | 'medium' | 'high'
        }));

        const allTools = [...new Set(installationSteps.flatMap((s: any) => s.toolsRequired || []))];
        const riskLevels = installationSteps.map((s: any) => s.riskLevel);
        const overallRisk = riskLevels.includes('high') ? 'high' : 
                           riskLevels.includes('medium') ? 'medium' : 'low';

        // Calculate actual total duration from steps
        const totalMinutes = installationSteps.reduce((sum: number, step: any) => {
          const stepTime = typeof step.estimatedDuration === 'number' 
            ? step.estimatedDuration 
            : parseInt(step.estimatedDuration) || 20;
          return sum + stepTime;
        }, 0);

        const formatDuration = (mins: number): string => {
          if (mins < 60) return `${mins} minutes`;
          const hours = Math.floor(mins / 60);
          const remainingMins = mins % 60;
          return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours} hours`;
        };

        const summary = {
          totalSteps: installationSteps.length,
          estimatedDuration: formatDuration(totalMinutes),
          requiredQualifications: ['18th Edition BS 7671:2018+A3:2024'],
          toolsRequired: allTools,
          materialsRequired: [],
          overallRiskLevel: overallRisk as 'low' | 'medium' | 'high'
        };

        setInstallationGuide(data.response || '');
        setMethodData({
          jobTitle: description,
          installationType: projectDetails.installationType,
          steps: installationSteps,
          summary,
          projectDetails
        });

        toast({
          title: "Installation Guide Generated",
          description: `${summary.totalSteps} steps created successfully`,
          variant: "success",
        });
      }

      setCurrentView('results');

    } catch (error) {
      console.error('Installation guide generation error:', error);
      
      let errorMessage = "Could not generate installation guide. Please try again.";
      let errorTitle = "Generation Failed";
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('timed out')) {
          errorTitle = "Request Timed Out";
          errorMessage = "The installation method is taking longer than expected (>5 minutes). This can happen with complex installations. Please try again or use Quick Mode for faster results.";
        } else if (error.message.includes('rate limit') || error.message.includes('429')) {
          errorTitle = "Too Many Requests";
          errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
        } else if (error.message.includes('API key') || error.message.includes('LOVABLE_API_KEY')) {
          errorTitle = "Configuration Error";
          errorMessage = "AI service is not properly configured. Please contact support.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorTitle = "Network Error";
          errorMessage = "Connection issue detected. Please check your internet and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
      
      setCurrentView('input');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentView('input');
    setMethodData(null);
    setInstallationGuide("");
  };

  return (
    <div className="space-y-3 sm:space-y-4 pb-6">
      {currentView === 'input' && (
        <InstallationInputForm
          onGenerate={handleGenerate}
          isProcessing={isProcessing}
        />
      )}

        {currentView === 'processing' && (
          <InstallationProcessingView 
            progress={progress} 
            isGenerating={isProcessing}
            onCancel={() => {
              setIsProcessing(false);
              setCurrentView('input');
            }}
            onQuickMode={() => {
              setIsProcessing(false);
              if (lastProjectRef.current) {
                handleGenerate(
                  lastProjectRef.current.details,
                  lastProjectRef.current.description,
                  false
                );
              }
            }}
          />
        )}

      {currentView === 'results' && methodData && (
        <InstallationResultsEditor
          jobTitle={methodData.jobTitle}
          installationType={methodData.installationType}
          installationGuide={installationGuide}
          steps={methodData.steps}
          summary={methodData.summary}
          projectDetails={methodData.projectDetails}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default InstallationSpecialistInterface;
