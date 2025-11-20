import { useState, useEffect } from "react";
import { StructuredDesignWizard } from "./structured-input/StructuredDesignWizard";
import { DesignReviewEditor } from "./DesignReviewEditor";
import { DesignProcessingView } from "./DesignProcessingView";
import { DesignInputs } from "@/types/installation-design";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { clearDesignCache } from "@/utils/clearDesignCache";
import { useCircuitDesignGeneration } from "@/hooks/useCircuitDesignGeneration";

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<'input' | 'processing' | 'results'>('input');
  const [userRequest, setUserRequest] = useState<string>('');
  const [totalCircuits, setTotalCircuits] = useState<number>(0);
  const [designData, setDesignData] = useState<any>(null);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  
  // Use job polling hook
  const { job, progress, status, currentStep, designData: jobDesignData, error } = useCircuitDesignGeneration(jobId);

  const handleClearCache = async () => {
    setIsClearingCache(true);
    const result = await clearDesignCache();
    
    if (result.success) {
      toast.success('Cache cleared', {
        description: 'All cached designs removed. Next design will use fresh RAG data.'
      });
    } else {
      toast.error('Cache clear failed', {
        description: result.error || 'Please try again'
      });
    }
    
    setIsClearingCache(false);
  };

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
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
    if (status === 'complete' && jobDesignData) {
      console.log('✅ Job complete, processing results...');
      
      // Extract project info from job inputs
      const jobInputs = (job as any)?.job_inputs;
      
      const designWithMetadata = {
        circuits: jobDesignData.circuits.map((circuit: any) => ({
          ...circuit,
          loadPower: circuit.loadPower,
          phases: circuit.phases,
          cableLength: circuit.cableLength,
          installationMethod: circuit.installationMethod || circuit.installMethod,
          installationGuidance: circuit.installationGuidance,
          structuredOutput: circuit.structuredOutput
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
        }
      };

      setDesignData(designWithMetadata);
      sessionStorage.setItem('circuit-design-data', JSON.stringify(designWithMetadata));
      setCurrentView('results');
      
      const cacheInfo = jobDesignData.fromCache ? ' (from cache)' : '';
      const autoFixInfo = jobDesignData.autoFixApplied ? ' (auto-fixed)' : '';
      toast.success('Design generated successfully' + cacheInfo + autoFixInfo, {
        description: `${jobDesignData.circuits?.length || 0} circuit${(jobDesignData.circuits?.length || 0) !== 1 ? 's' : ''} designed`
      });
    }
    
    if (status === 'failed' && error) {
      toast.error('Design generation failed', {
        description: error || 'Please try again'
      });
      setCurrentView('input');
      setJobId(null);
    }
  }, [status, jobDesignData, error, job]);

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
      {/* Cache Clear Button - Always visible */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearCache}
          disabled={isClearingCache}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          {isClearingCache ? 'Clearing...' : 'Clear Cache'}
        </Button>
      </div>

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
            message: currentStep || 'Processing...'
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
