import { useState, useEffect, useRef } from "react";
import { StructuredDesignWizard } from "./structured-input/StructuredDesignWizard";
import { DesignReviewEditor } from "./DesignReviewEditor";
import { DesignProcessingView } from "./DesignProcessingView";
import { DesignInputs } from "@/types/installation-design";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCircuitDesignGeneration } from "@/hooks/useCircuitDesignGeneration";

// User-friendly error message mapper
const getFriendlyErrorMessage = (error: string): string => {
  if (error.includes('user_id') || error.includes('authentication')) {
    return 'Authentication error. Please try logging out and back in.';
  }
  if (error.includes('timeout') || error.includes('3 minutes')) {
    return 'Design generation is taking longer than expected. Please try again with fewer circuits, or contact support if the issue persists.';
  }
  if (error.includes('rate limit') || error.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  if (error.includes('cancelled')) {
    return 'Design generation was cancelled.';
  }
  if (error.includes('RAG') || error.includes('regulations')) {
    return 'Unable to access design knowledge base. Please try again in a moment.';
  }
  if (error.includes('OpenAI') || error.includes('API')) {
    return 'AI service temporarily unavailable. Please try again in a moment.';
  }
  
  // Generic fallback
  return `Design generation failed: ${error.slice(0, 100)}`;
};

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<'input' | 'processing' | 'results'>('input');
  const [userRequest, setUserRequest] = useState<string>('');
  const [totalCircuits, setTotalCircuits] = useState<number>(0);
  const [designData, setDesignData] = useState<any>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const successToastShown = useRef(false);
  
  // Use job polling hook (now includes installationGuidance)
  const { job, progress, status, currentStep, designData: jobDesignData, installationGuidance, error } = useCircuitDesignGeneration(jobId);

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
      successToastShown.current = false; // Reset flag for new job
      // Store user request and circuit count for processing view
      const userDescription = inputs.additionalPrompt || 
        `${inputs.projectName} - ${inputs.circuits.length} circuit${inputs.circuits.length !== 1 ? 's' : ''}`;
      sessionStorage.setItem('design-user-request', userDescription);
      sessionStorage.setItem('design-total-circuits', String(inputs.circuits.length));
      setUserRequest(userDescription);
      setTotalCircuits(inputs.circuits.length);

      // Count circuits that require AI processing
      const aiRequiredCircuits = inputs.circuits.filter(c => {
        const isComplex = 
          (c.loadPower || 0) > 7200 || 
          (c.cableLength || 0) > 100 || 
          c.specialLocation !== 'none';
        return isComplex || !['socket', 'lighting'].includes(c.loadType || '');
      });

      // Warn if job is very large
      if (aiRequiredCircuits.length > 16) {
        toast.warning('Large design detected', {
          description: `${aiRequiredCircuits.length} complex circuits may take 3-5 minutes to process.`,
          duration: 8000
        });
      }

      setCurrentView('processing');
      
      // Create async job via job queue
      const { data, error } = await supabase.functions.invoke('create-circuit-design-job', {
        body: {
          mode: 'direct-design',
          projectInfo: {
            projectName: inputs.projectName || 'Untitled Project',
            location: inputs.location || 'Not specified',
            clientName: inputs.clientName,
            electricianName: inputs.electricianName,
            installationType: inputs.propertyType || 'domestic'
          },
          supply: {
            voltage: inputs.voltage || 230,
            phases: inputs.phases || 'single',
            pfc: inputs.pscc || 16000,
            ze: inputs.ze || 0.35,
            earthingSystem: inputs.earthingSystem || 'TN-C-S',
            consumerUnitType: 'split-load',
            mainSwitchRating: 100
          },
          circuits: inputs.circuits || [],
          additionalPrompt: inputs.additionalPrompt || '',
          specialRequirements: [],
          installationConstraints: {
            ambientTemp: inputs.ambientTemp || 30,
            groupingFactor: inputs.groupingFactor || 1,
            budget: inputs.budgetLevel || 'standard'
          }
        }
      });

      if (error) {
        toast.error('Failed to start design generation', {
          description: error.message || 'Please try again'
        });
        setCurrentView('input');
        return;
      }

      // Start polling the job
      setJobId(data.jobId);
      console.log('🚀 Started circuit design job:', data.jobId);
      
    } catch (error: any) {
      console.error('Design generation error:', error);
      toast.error('Design generation failed', {
        description: error.message || 'Please try again'
      });
      setCurrentView('input');
    }
  };

  // Monitor job completion
  useEffect(() => {
    if (status === 'complete' && jobDesignData && !successToastShown.current) {
      console.log('✅ Job complete, processing results...');
      
      // Extract project info from job inputs
      const jobInputs = (job as any)?.job_inputs;
      
      const designWithMetadata = {
        circuits: jobDesignData.circuits.map((circuit: any) => ({
          ...circuit,
          // Explicitly preserve all core fields
          name: circuit.name,
          loadType: circuit.loadType,
          loadPower: circuit.loadPower,
          phases: circuit.phases,
          cableLength: circuit.cableLength,
          cableSize: circuit.cableSize,
          cpcSize: circuit.cpcSize,
          voltage: circuit.voltage,
          protectionDevice: circuit.protectionDevice,
          calculations: circuit.calculations,
          justifications: circuit.justifications,
          installationMethod: circuit.installationMethod || circuit.installMethod,
          installationGuidance: circuit.installationGuidance,
          reasoning: circuit.reasoning,
          rcdProtected: circuit.rcdProtected,
          circuitNumber: circuit.circuitNumber,
          specialLocation: circuit.specialLocation,
          // CRITICAL: Preserve expectedTests
          expectedTests: circuit.expectedTests,
          // CRITICAL: Deep clone structuredOutput to preserve all nested data
          structuredOutput: circuit.structuredOutput ? {
            atAGlanceSummary: circuit.structuredOutput.atAGlanceSummary ? {
              loadKw: circuit.structuredOutput.atAGlanceSummary.loadKw,
              loadIb: circuit.structuredOutput.atAGlanceSummary.loadIb,
              cable: circuit.structuredOutput.atAGlanceSummary.cable,
              protectiveDevice: circuit.structuredOutput.atAGlanceSummary.protectiveDevice,
              voltageDrop: circuit.structuredOutput.atAGlanceSummary.voltageDrop,
              zs: circuit.structuredOutput.atAGlanceSummary.zs,
              complianceTick: circuit.structuredOutput.atAGlanceSummary.complianceTick,
              notes: circuit.structuredOutput.atAGlanceSummary.notes
            } : undefined,
            sections: circuit.structuredOutput.sections
          } : undefined
        })),
        projectInfo: jobInputs?.projectInfo || {
          projectName: 'Untitled Project',
          location: 'Not specified'
        },
        supply: jobInputs?.supply || {
          voltage: 230,
          phases: 'single',
          pfc: 16000,
          ze: 0.35,
          earthingSystem: 'TN-C-S'
        },
        // Transform supply into consumerUnit format for mobile compatibility
        consumerUnit: {
          type: (jobInputs?.supply?.consumerUnitType as 'split-load' | 'high-integrity' | 'main-switch') || 'split-load',
          mainSwitchRating: jobInputs?.supply?.mainSwitchRating || 100,
          incomingSupply: {
            voltage: jobInputs?.supply?.voltage || 230,
            phases: (jobInputs?.supply?.phases as 'single' | 'three') || 'single',
            incomingPFC: jobInputs?.supply?.pfc || 16000,
            Ze: jobInputs?.supply?.ze || 0.35,
            earthingSystem: (jobInputs?.supply?.earthingSystem as 'TN-S' | 'TN-C-S' | 'TT') || 'TN-C-S'
          }
        },
        projectName: jobInputs?.projectInfo?.projectName || 'Untitled Project',
        location: jobInputs?.projectInfo?.location || 'Not specified',
        clientName: jobInputs?.projectInfo?.clientName,
        electricianName: jobInputs?.projectInfo?.electricianName,
        installationType: (jobInputs?.projectInfo?.installationType as 'domestic' | 'commercial' | 'industrial') || 'domestic',
        totalLoad: jobDesignData?.circuits?.reduce((sum, c) => sum + (c.loadPower || 0), 0) || 0,
        diversityApplied: false,
        materials: [],
        // NEW: Add installation guidance from parallel agent
        installationGuidance: installationGuidance || undefined,
        // CRITICAL: Pass validation state to frontend
        validationPassed: jobDesignData.validationPassed,
        validationIssues: jobDesignData.validationIssues || [],
        autoFixSuggestions: jobDesignData.autoFixSuggestions || []
      };

      console.log('🔧 Design data mapped:', {
        circuitCount: designWithMetadata.circuits.length,
        firstCircuit: designWithMetadata.circuits[0]?.name,
        hasAtAGlance: !!designWithMetadata.circuits[0]?.structuredOutput?.atAGlanceSummary,
        hasExpectedTests: !!designWithMetadata.circuits[0]?.expectedTests,
        validationPassed: designWithMetadata.validationPassed,
        issueCount: designWithMetadata.validationIssues.length
      });

      setDesignData(designWithMetadata);
      sessionStorage.setItem('circuit-design-data', JSON.stringify(designWithMetadata));
      setCurrentView('results');
      
      const cacheInfo = jobDesignData.fromCache ? ' (from cache)' : '';
      const autoFixInfo = jobDesignData.autoFixApplied ? ' (auto-fixed)' : '';
      const validationInfo = !jobDesignData.validationPassed 
        ? ` - ${jobDesignData.validationIssues?.length || 0} validation issue(s) found` 
        : '';
      
      toast.success('Design generated successfully' + cacheInfo + autoFixInfo, {
        description: `${jobDesignData.circuits?.length || 0} circuit${(jobDesignData.circuits?.length || 0) !== 1 ? 's' : ''} designed${validationInfo}`
      });
      
      // Mark toast as shown
      successToastShown.current = true;
    }
    
    if (status === 'failed' && error) {
      toast.error('Design generation failed', {
        description: error || 'Please try again'
      });
      setCurrentView('input');
      setJobId(null);
    }
  }, [status, jobDesignData, error]);

  // Load design data from session on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem('circuit-design-data');
    if (savedData) {
      try {
        setDesignData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved design data:', e);
      }
    }
  }, []);

  const handleCancel = async () => {
    if (jobId) {
      // Cancel the job
      await supabase.functions.invoke('cancel-circuit-design-job', {
        body: { jobId }
      });
    }
    setCurrentView('input');
    setJobId(null);
    sessionStorage.removeItem('circuit-design-data');
    toast.info('Design generation cancelled');
  };

  const handleRetry = () => {
    setCurrentView('input');
    setJobId(null);
    sessionStorage.removeItem('circuit-design-data');
  };

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    console.log('Task accepted from agent:', contextData, instruction);
    // TODO: Pre-fill form with data from other agents
  };

  return (
    <div className="space-y-4">
      {/* Agent Inbox */}
      <AgentInbox 
        currentAgent="designer"
        onTaskAccept={handleTaskAccept}
      />

      {currentView === 'input' && (
        <StructuredDesignWizard 
          onGenerate={handleGenerate}
          isProcessing={status === 'processing'}
        />
      )}

      {currentView === 'processing' && (
        <DesignProcessingView 
          progress={{ 
            stage: Math.floor(progress / 14), 
            percent: progress,
            message: currentStep || 'Processing...',
            designer_progress: job?.designer_progress || 0,
            designer_status: job?.designer_status || 'pending',
            installer_progress: job?.installer_progress || 0,
            installer_status: job?.installer_status || 'pending'
          }}
          userRequest={userRequest}
          totalCircuits={totalCircuits}
          onCancel={handleCancel}
        />
      )}

      {currentView === 'results' && designData && (
        <DesignReviewEditor 
          design={designData}
          onReset={handleRetry}
        />
      )}
    </div>
  );
};
