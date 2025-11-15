import { useState, useEffect } from "react";
import { StructuredDesignWizard } from "./structured-input/StructuredDesignWizard";
import { DesignReviewEditor } from "./DesignReviewEditor";
import { CircuitDesignProcessing } from "./CircuitDesignProcessing";
import { DesignInputs } from "@/types/installation-design";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<'input' | 'processing' | 'results'>('input');
  const [userRequest, setUserRequest] = useState<string>('');
  const [totalCircuits, setTotalCircuits] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [designData, setDesignData] = useState<any>(null);

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
      // Store user request and circuit count for processing view
      const userDescription = inputs.additionalPrompt || 
        `${inputs.projectName} - ${inputs.circuits.length} circuit${inputs.circuits.length !== 1 ? 's' : ''}`;
      sessionStorage.setItem('design-user-request', userDescription);
      sessionStorage.setItem('design-total-circuits', String(inputs.circuits.length));
      setUserRequest(userDescription);
      setTotalCircuits(inputs.circuits.length);

      // Count circuits that require AI processing (complex/non-standard)
      const aiRequiredCircuits = inputs.circuits.filter(c => {
        const isComplex = 
          (c.loadPower || 0) > 7200 || // High power (>32A)
          (c.cableLength || 0) > 100 || // Long run
          c.specialLocation !== 'none'; // Special location
        return isComplex || !['socket', 'lighting'].includes(c.loadType || '');
      });

      // Warn if job is very large
      if (aiRequiredCircuits.length > 12) {
        toast.warning('Large design detected', {
          description: `${aiRequiredCircuits.length} complex circuits may take 3-5 minutes to process. Consider splitting into smaller designs for faster results.`,
          duration: 8000
        });
      }

      setCurrentView('processing');
      setIsProcessing(true);
      
      // Direct synchronous call to designer-agent-v2 with properly formatted data
      const { data, error } = await supabase.functions.invoke('designer-agent-v2', {
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
            installationMethod: inputs.installationMethod || 'clipped-direct',
            groupingFactor: inputs.groupingFactor || 1,
            budget: inputs.budgetLevel || 'standard'
          }
        }
      });

      if (error) {
        toast.error('Design generation failed', {
          description: error.message || 'Please try again'
        });
        setCurrentView('input');
        setIsProcessing(false);
        return;
      }

      if (!data?.success || !data?.design) {
        toast.error('Design generation failed', {
          description: data?.error || 'No design data received'
        });
        setCurrentView('input');
        setIsProcessing(false);
        return;
      }

      console.log('✅ Circuit design completed:', data.design);
      
      // Store design data
      setDesignData(data.design);
      sessionStorage.setItem('circuit-design-data', JSON.stringify(data.design));
      setCurrentView('results');
      setIsProcessing(false);
      
    } catch (error: any) {
      console.error('Design generation error:', error);
      toast.error('Design generation failed', {
        description: error.message || 'Please try again'
      });
      setCurrentView('input');
      setIsProcessing(false);
    }
  };

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

  const handleCancel = () => {
    setCurrentView('input');
    setIsProcessing(false);
    sessionStorage.removeItem('circuit-design-data');
    toast.info('Design generation cancelled');
  };

  const handleRetry = () => {
    setCurrentView('input');
    sessionStorage.removeItem('circuit-design-data');
  };

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    console.log('Task accepted from agent:', contextData, instruction);
    // TODO: Pre-fill form with data from other agents
  };

  return (
    <div className="min-h-screen bg-background space-y-6">
      {/* Agent Inbox */}
      <AgentInbox currentAgent="designer" onTaskAccept={handleTaskAccept} />

      {currentView === 'input' && (
        <StructuredDesignWizard onGenerate={handleGenerate} isProcessing={isProcessing} />
      )}

      {currentView === 'processing' && (
        <CircuitDesignProcessing 
          circuitCount={totalCircuits || 0}
          estimatedTime={
            // Estimate based on circuit count
            totalCircuits <= 3 ? 20 :
            totalCircuits <= 10 ? 40 : 60
          }
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
