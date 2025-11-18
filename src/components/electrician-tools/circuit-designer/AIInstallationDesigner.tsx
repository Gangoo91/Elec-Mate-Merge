import { useState, useEffect } from "react";
import { StructuredDesignWizard } from "./structured-input/StructuredDesignWizard";
import { DesignReviewEditor } from "./DesignReviewEditor";
import { CircuitDesignProcessing } from "./CircuitDesignProcessing";
import { DesignInputs } from "@/types/installation-design";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [designData, setDesignData] = useState<any>(null);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  // Use the job polling hook
  const { job, progress, status, currentStep, designData: jobDesignData, error: jobError } = useCircuitDesignGeneration(jobId);

  // Monitor job completion
  useEffect(() => {
    if (!job) return;

    if (status === 'complete' && jobDesignData) {
      console.log("✅ Design job completed:", jobDesignData);
      setDesignData(jobDesignData);
      setCurrentView('results');
      setIsProcessing(false);
      toast.success("Circuit design completed successfully!");
    } else if (status === 'failed') {
      console.error("❌ Design job failed:", jobError);
      setCurrentView('input');
      setIsProcessing(false);
      toast.error(jobError || "Design generation failed");
    }
  }, [job, status, jobDesignData, jobError]);

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

      // Count circuits that require AI processing (complex/non-standard)
      const aiRequiredCircuits = inputs.circuits.filter(c => {
        const isComplex = 
          (c.loadPower || 0) > 7200 || // High power (>32A)
          (c.cableLength || 0) > 100 || // Long run
          c.specialLocation !== 'none'; // Special location
        return isComplex || !['socket', 'lighting'].includes(c.loadType || '');
      });

      // Warn if job is very large
      if (aiRequiredCircuits.length > 16) {
        toast.warning('Large design detected', {
          description: `${aiRequiredCircuits.length} complex circuits may take 3-5 minutes to process. Consider splitting into smaller designs for faster results.`,
          duration: 8000
        });
      }

      setCurrentView('processing');
      setIsProcessing(true);
      
      // Create async job for circuit design
      const { data: jobData, error: jobError } = await supabase.functions.invoke('create-circuit-design-job', {
        body: {
          circuits: inputs.circuits,
          supply: {
            voltage: inputs.voltage,
            phases: inputs.phases,
            ze: inputs.ze || 0.35,
            installationMethod: inputs.installationMethod || 'Method C'
          }
        }
      });
      
      if (jobError || !jobData?.jobId) {
        console.error('Failed to create design job:', jobError);
        setCurrentView('input');
        setIsProcessing(false);
        toast.error('Failed to start design generation', {
          description: jobError?.message || 'Please try again'
        });
        return;
      }

      console.log('✅ Design job created:', jobData.jobId);
      setJobId(jobData.jobId);
      
      toast.success('Design generation started', {
        description: 'Processing in background...'
      });
    } catch (error) {
      console.error('Error starting design:', error);
      setCurrentView('input');
      setIsProcessing(false);
      toast.error('Failed to start design generation', {
        description: error instanceof Error ? error.message : 'Please try again'
      });
    }
  };

  const handleNewDesign = () => {
    setCurrentView('input');
    setDesignData(null);
    setJobId(null);
    sessionStorage.removeItem('design-user-request');
    sessionStorage.removeItem('design-total-circuits');
  };

  // Restore state from sessionStorage on mount
  useEffect(() => {
    const savedRequest = sessionStorage.getItem('design-user-request');
    const savedCircuits = sessionStorage.getItem('design-total-circuits');
    if (savedRequest) setUserRequest(savedRequest);
    if (savedCircuits) setTotalCircuits(Number(savedCircuits));
  }, []);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Cache Clear Button - Always visible in top right */}
      <div className="flex justify-end mb-2">
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

      {currentView === 'input' && (
        <StructuredDesignWizard 
          onGenerate={handleGenerate}
          isProcessing={isProcessing}
        />
      )}

      {currentView === 'processing' && (
        <CircuitDesignProcessing 
          circuitCount={totalCircuits}
          estimatedTime={totalCircuits * 8}
          progress={progress}
          currentStep={currentStep}
        />
      )}

      {currentView === 'results' && designData && (
        <DesignReviewEditor 
          design={designData}
          onReset={handleNewDesign}
        />
      )}
    </div>
  );
};
