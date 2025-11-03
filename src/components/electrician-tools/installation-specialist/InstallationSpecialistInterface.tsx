import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { InstallationInputForm } from "./InstallationInputForm";
import { InstallationProcessingView } from "./InstallationProcessingView";
import { InstallationResultsEditor } from "./InstallationResultsEditor";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { generateMethodStatement } from "./methodStatementHandler";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";

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
  
  const { callAgent } = useSimpleAgent();

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    if (contextData) {
      // Load context from another agent
      console.log('Installation task received from another agent:', contextData, instruction);
      toast({ title: 'Context loaded', description: 'Work forwarded from another agent' });
    }
  };

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
        // 3-AGENT PARALLEL METHOD STATEMENT MODE
        applyProgress(1, 10, 'Initializing all agents...');
        
        const query = `Create a comprehensive method statement for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        applyProgress(1, 20, 'Running all agents in parallel...');

        const mergedResult = await generateMethodStatement(
          query,
          projectDetails,
          'ms-' + Date.now(),
          (msg) => {
            setMethodStatementProgress(msg);
            
            // Simplified progress for parallel execution
            const m = msg.toLowerCase();
            if (m.includes('installer') || m.includes('installation steps')) {
              applyProgress(2, 30, 'Generating installation steps...');
            } else if (m.includes('health') || m.includes('safety') || m.includes('hazard')) {
              applyProgress(3, 50, 'Identifying hazards and safety measures...');
            } else if (m.includes('maintenance') || m.includes('testing')) {
              applyProgress(4, 70, 'Creating testing procedures...');
            } else if (m.includes('merging') || m.includes('combining')) {
              applyProgress(5, 85, 'Merging all agent outputs...');
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

        // Initialize default project metadata
        const today = new Date().toISOString().split('T')[0];
        const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const defaultMetadata = {
          documentRef: `MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          issueDate: today,
          reviewDate: nextYear,
          companyName: projectDetails.electricianName || 'Your Company Ltd',
          contractor: 'Main Contractor Ltd',
          siteManagerName: '',
          siteManagerPhone: '',
          firstAiderName: '',
          firstAiderPhone: '',
          safetyOfficerName: '',
          safetyOfficerPhone: '',
          assemblyPoint: 'Main Car Park',
          startDate: projectDetails.expectedStartDate || today,
          completionDate: '',
          siteSupervisor: projectDetails.electricianName || '',
          clientContact: projectDetails.clientName || '',
          preparedByName: projectDetails.electricianName || '',
          preparedByPosition: 'Electrician',
          preparedDate: today,
          authorisedByName: '',
          authorisedByPosition: 'Contracts Manager',
          authorisedDate: today
        };

        setMethodData({
          jobTitle: description,
          installationType: projectDetails.installationType,
          steps: installationSteps,
          summary,
          projectDetails,
          projectMetadata: defaultMetadata,
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

        const response = await callAgent('installer', {
          query,
          projectContext: {
            projectType: projectDetails.installationType as 'domestic' | 'commercial' | 'industrial',
            buildingAge: 'modern',
          }
        });

        clearInterval(progressInterval);
        applyProgress(5, 100, 'Complete!');

        if (!response?.success) throw new Error(response?.error || 'Failed to generate installation method');

        // Match installer-v3 response structure: response.data.steps
        const steps = response.data?.steps || [];

        const installationSteps = steps.map((step: any, index: number) => ({
          stepNumber: step.stepNumber || index + 1,
          title: step.title || `Step ${index + 1}`,
          content: step.description || '',
          safety: step.safetyRequirements || [],
          toolsRequired: step.equipmentNeeded || [],
          materialsNeeded: [],
          estimatedDuration: step.estimatedDuration || 'Not specified',
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

        setInstallationGuide(response.response || '');
        
        // Initialize default project metadata for Quick Mode too
        const today = new Date().toISOString().split('T')[0];
        const defaultMetadata = {
          documentRef: `MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          issueDate: today,
          reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          companyName: projectDetails.electricianName || 'Your Company Ltd',
          contractor: 'Main Contractor Ltd',
          siteManagerName: '',
          siteManagerPhone: '',
          firstAiderName: '',
          firstAiderPhone: '',
          safetyOfficerName: '',
          safetyOfficerPhone: '',
          assemblyPoint: 'Main Car Park',
          startDate: projectDetails.expectedStartDate || today,
          completionDate: '',
          siteSupervisor: projectDetails.electricianName || '',
          clientContact: projectDetails.clientName || '',
          preparedByName: projectDetails.electricianName || '',
          preparedByPosition: 'Electrician',
          preparedDate: today,
          authorisedByName: '',
          authorisedByPosition: 'Contracts Manager',
          authorisedDate: today
        };
        
        setMethodData({
          jobTitle: description,
          installationType: projectDetails.installationType,
          steps: installationSteps,
          summary,
          projectDetails,
          projectMetadata: defaultMetadata
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
      {/* Agent Inbox */}
      <AgentInbox currentAgent="installer" onTaskAccept={handleTaskAccept} />

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
          projectMetadata={methodData.projectMetadata}
          fullMethodStatement={methodData._fullMethodStatement}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default InstallationSpecialistInterface;
