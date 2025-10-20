import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DesignInputs, InstallationDesign } from '@/types/installation-design';

export interface DesignProgress {
  stage: number;
  message: string;
  percent: number;
}

export const useAIDesigner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [designData, setDesignData] = useState<InstallationDesign | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<DesignProgress | null>(null);

  const generateDesign = async (inputs: DesignInputs): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    setDesignData(null);

    // SPEED BOOST: Shortened stages to match faster backend (total ~120s)
    const stages = [
      { stage: 1, message: 'Understanding your requirements...', duration: 5000, targetPercent: 8 },
      { stage: 2, message: 'Searching BS 7671 for circuit types...', duration: 20000, targetPercent: 30 },
      { stage: 3, message: 'AI is designing circuits...', duration: 60000, targetPercent: 75 },
      { stage: 4, message: 'Validating compliance...', duration: 25000, targetPercent: 95 },
      { stage: 5, message: 'Finalising materials...', duration: 10000, targetPercent: 99 }
    ];

    let progressInterval: ReturnType<typeof setInterval> | null = null;
    let currentPercent = 0;
    let retryMessage = '';

    // Initialize progress immediately
    setProgress({ stage: 1, message: 'Initialising...', percent: 0 });

    // Pre-flight health check
    try {
      const { data: healthData, error: healthError } = await supabase.functions.invoke('designer-agent/health', {});
      
      if (healthError || !healthData?.status) {
        setProgress({ stage: 0, message: 'Design service starting up...', percent: 0 });
        console.warn('⚠️ Design service not healthy, will retry automatically');
      } else {
        console.log('✅ Design service healthy', healthData);
      }
    } catch (e) {
      // Health check failed - service might be cold starting
      setProgress({ stage: 0, message: 'Initialising design service...', percent: 0 });
    }

    const invokeWithRetry = async (attempt = 1, maxAttempts = 3): Promise<any> => {
      try {
        const { data, error: invokeError } = await supabase.functions.invoke('designer-agent', {
          body: {
            mode: 'batch-design',
            aiConfig: {
              model: 'google/gemini-2.5-flash', // SPEED BOOST: faster default model
              maxTokens: 6000, // SPEED BOOST: reduced from 15000
              timeoutMs: 180000, // SPEED BOOST: 3 min (from 280s)
              noMemory: true,
              ragPriority: {
                design: 95,
                bs7671: 85,
                installation: 75
              }
            },
            projectInfo: {
              name: inputs.projectName,
              location: inputs.location,
              clientName: inputs.clientName,
              electricianName: inputs.electricianName,
              installationType: inputs.propertyType,
              propertyAge: inputs.propertyAge,
              existingInstallation: inputs.existingInstallation,
              budgetLevel: inputs.budgetLevel,
              additionalPrompt: inputs.additionalPrompt
            },
            incomingSupply: {
              voltage: inputs.voltage,
              phases: inputs.phases,
              Ze: inputs.ze,
              earthingSystem: inputs.earthingSystem,
              pscc: inputs.pscc || 3500,
              mainSwitchRating: inputs.mainSwitchRating || 100,
              ambientTemp: inputs.ambientTemp || 30,
              installationMethod: inputs.installationMethod || 'clipped-direct',
              groupingFactor: inputs.groupingFactor || 1
            },
            circuits: inputs.circuits.map(c => ({
              name: c.name,
              loadType: c.loadType,
              loadPower: c.loadPower,
              cableLength: c.cableLength,
              phases: c.phases,
              specialLocation: c.specialLocation,
              notes: c.notes
            }))
          }
        });

        if (invokeError) throw invokeError;
        retryMessage = ''; // Clear retry message on success
        return { data, error: null };
      } catch (error: any) {
        const isTransient = 
          error?.message?.includes('Failed to send a request to the Edge Function') ||
          error?.message?.includes('fetch') ||
          error?.message?.includes('network') ||
          error?.message?.includes('502') ||
          error?.message?.includes('503') ||
          error?.message?.includes('504') ||
          error instanceof TypeError;

        if (isTransient && attempt < maxAttempts) {
          const delay = 1500 * Math.pow(2, attempt - 1); // 1.5s, 3s
          console.warn(`⚠️ Attempt ${attempt}/${maxAttempts} failed, retrying in ${delay}ms...`, error.message);
          retryMessage = `Reconnecting to design service… (retry ${attempt}/${maxAttempts - 1})`;
          await new Promise(resolve => setTimeout(resolve, delay));
          return invokeWithRetry(attempt + 1, maxAttempts);
        }

        throw error;
      }
    };

    try {
      // Pre-compute cumulative stage durations for monotonic progress (fix temporal dead zone)
      const cumulativeDurations: number[] = [];
      stages.forEach((s, i) => {
        cumulativeDurations[i] = (i === 0 ? 0 : cumulativeDurations[i - 1]) + s.duration;
      });
      const totalDuration = cumulativeDurations[cumulativeDurations.length - 1];

      // Defensive check
      if (totalDuration <= 0) {
        console.warn('⚠️ Invalid total duration, skipping progress scheduler');
      } else {
        // Monotonic progress controller
        const startTime = Date.now();

        progressInterval = setInterval(() => {
          const elapsed = Math.min(Date.now() - startTime, totalDuration * 0.99);
          
          // Find current stage based on cumulative durations
          const stageIndex = cumulativeDurations.findIndex(t => elapsed < t);
          const currentStage = stageIndex === -1 ? stages.length - 1 : stageIndex;
          
          const stageStartTime = currentStage === 0 ? 0 : cumulativeDurations[currentStage - 1];
          const stageDuration = stages[currentStage].duration;
          const stageElapsed = Math.max(0, elapsed - stageStartTime);
          const stageFraction = Math.min(1, stageElapsed / stageDuration);
          
          const prevPercent = currentStage === 0 ? 0 : stages[currentStage - 1].targetPercent;
          const targetPercent = stages[currentStage].targetPercent;
          const computedPercent = Math.floor(prevPercent + (targetPercent - prevPercent) * stageFraction);
          
          // Ensure monotonic progress
          currentPercent = Math.max(currentPercent, computedPercent);
          
          setProgress({
            stage: currentStage + 1,
            message: retryMessage || stages[currentStage].message,
            percent: currentPercent
          });
        }, 1000);
      }

      console.log('🔧 Generating installation design', {
        circuits: inputs.circuits.length,
        projectName: inputs.projectName
      });

      const { data, error: invokeError } = await invokeWithRetry();

      if (progressInterval) clearInterval(progressInterval);

      if (invokeError) {
        let errorMessage = invokeError.message || 'Unknown error occurred';
        let errorDetails: string | undefined;
        
        // Try to parse structured error from backend
        try {
          const errorData = typeof data === 'object' && data !== null ? data : {};
          if ('error' in errorData && 'code' in errorData) {
            errorMessage = errorData.error as string;
            errorDetails = `Error code: ${errorData.code}`;
          }
        } catch (e) {
          // Ignore parsing errors
        }
        
        // Friendly error messages based on status patterns
        if (invokeError.message?.includes('429')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (invokeError.message?.includes('402')) {
          errorMessage = 'Payment required. Please add Lovable AI credits to continue.';
        } else if (invokeError.message?.includes('No tool call')) {
          errorMessage = 'AI did not return a structured design. Please try again.';
        } else if (invokeError.message?.includes('non-2xx')) {
          errorMessage = 'Design service error. Please try again or check the logs for details.';
          errorDetails = invokeError.message;
        }
        
        const fullError = errorDetails ? `${errorMessage}\n${errorDetails}` : errorMessage;
        throw new Error(fullError);
      }

      // FIX: Handle structured errors (success=false) gracefully
      if (!data.success) {
        // Clear progress immediately for known errors
        setProgress(null);
        
        const errorMsg = data.error || 'Design generation failed';
        const isKnownError = data.code === 'NO_CIRCUITS' || data.code;
        
        if (isKnownError) {
          // Friendly message for known errors - no retry needed
          throw new Error(errorMsg);
        } else {
          // Unknown errors
          throw new Error(errorMsg);
        }
      }

      // Complete progress to 100%
      setProgress({ stage: 8, message: 'Design complete!', percent: 100 });
      
      console.log('✅ Design generated successfully', data.design);
      setDesignData(data.design);

      toast.success('Design generated successfully', {
        description: `${data.design.circuits.length} circuits designed and verified`
      });

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Design generation failed:', errorMessage, err);
      setError(errorMessage);

      if (progressInterval) clearInterval(progressInterval);

      // Show actionable error message
      const lines = errorMessage.split('\n');
      const mainError = lines[0];
      const details = lines.slice(1).join(' ');

      toast.error('Design generation failed', {
        description: details || mainError,
        duration: 6000 // Give users more time to read errors
      });

      return false;
    } finally {
      setIsProcessing(false);
      if (progressInterval) clearInterval(progressInterval);
      setTimeout(() => setProgress(null), 2000);
    }
  };

  const resetDesign = () => {
    setDesignData(null);
    setError(null);
    setProgress(null);
  };

  return {
    generateDesign,
    resetDesign,
    isProcessing,
    designData,
    error,
    progress
  };
};
