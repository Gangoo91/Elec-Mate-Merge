import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DesignInputs, InstallationDesign } from '@/types/installation-design';

// Client-side timeout for edge function calls (4 minutes safety limit)
const CLIENT_TIMEOUT_MS = 240000; // 240s (4 minutes max - gives 40s buffer for backend processing)

/**
 * Timeout wrapper for promises
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
}

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
  const [retryMessage, setRetryMessage] = useState('');

  const generateDesign = async (inputs: DesignInputs): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    setDesignData(null);

    // Validate inputs - must have either circuits OR a prompt description
    if ((!inputs.circuits || inputs.circuits.length === 0) && !inputs.additionalPrompt?.trim()) {
      toast.error('No circuits or description provided', {
        description: 'Please either add circuits manually or describe your requirements in the AI prompt.'
      });
      setIsProcessing(false);
      return false;
    }

    // Realistic progress stages aligned with actual backend processing times
    // Total: ~175s to match typical processing time for batch designs
    const stages = [
      { stage: 1, message: 'Understanding your requirements...', duration: 5000, targetPercent: 5 },
      { stage: 2, message: 'Searching BS 7671 regulations...', duration: 10000, targetPercent: 12 },
      { stage: 3, message: 'AI designing circuits (this may take 2-3 minutes)...', duration: 140000, targetPercent: 85 },
      { stage: 4, message: 'Running compliance validation...', duration: 15000, targetPercent: 95 },
      { stage: 5, message: 'Finalising documentation...', duration: 5000, targetPercent: 99 }
    ];

    let progressInterval: ReturnType<typeof setInterval> | null = null;
    let currentPercent = 0;

    // Initialize progress immediately
    setProgress({ stage: 1, message: 'Initialising...', percent: 0 });

    // Pre-flight health check
    try {
      const { data: healthData, error: healthError } = await supabase.functions.invoke('designer-agent-v2', {
        method: 'GET'
      });
      
      if (healthError || !healthData?.status) {
        setProgress({ stage: 0, message: 'Design service starting up...', percent: 0 });
        console.warn('⚠️ Design service not healthy, will retry automatically');
      } else {
        console.log(`✅ Design service healthy - Version: ${healthData.version}`, healthData);
      }
    } catch (e) {
      // Health check failed - service might be cold starting
      setProgress({ stage: 0, message: 'Initialising design service...', percent: 0 });
    }

    const invokeWithRetry = async (attempt = 1, maxAttempts = 2): Promise<any> => {
      try {
        // Update retry message state
        if (attempt > 1) {
          setRetryMessage(`Reconnecting… (retry ${attempt - 1}/${maxAttempts - 1})`);
        } else {
          setRetryMessage('');
        }
        
        // Create abort controller for timeout safety
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), CLIENT_TIMEOUT_MS);

        const invokePromise = supabase.functions.invoke('designer-agent-v2', {
          body: {
            mode: 'batch-design',
            aiConfig: {
              model: 'openai/gpt-5-mini', // Proven reliable model from Lovable AI Gateway
              maxTokens: 20000, // Balanced token limit for quality + speed
              timeoutMs: 200000, // 200s (3m 20s) backend timeout - client waits 240s
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
        
        // Wrap with client-side timeout (withTimeout handles the actual timeout)
        const { data, error: invokeError } = await withTimeout(invokePromise, CLIENT_TIMEOUT_MS);

        clearTimeout(timeoutId);
        
        if (invokeError) throw invokeError;
        setRetryMessage(''); // Clear retry message on success
        return { data, error: null };
      } catch (error: any) {
        
        const isTransient = 
          error?.message?.includes('Failed to send a request to the Edge Function') ||
          error?.message?.includes('fetch') ||
          error?.message?.includes('network') ||
          error?.message?.includes('timeout') ||
          error?.message?.includes('ECONNREFUSED') ||
          error?.message?.includes('ECONNRESET') ||
          error?.message?.includes('500') ||
          error?.message?.includes('502') ||
          error?.message?.includes('503') ||
          error?.message?.includes('504') ||
          error instanceof TypeError;

        if (isTransient && attempt < maxAttempts) {
          const delay = attempt === 1 ? 1500 : 3000; // 1.5s then 3s
          console.warn(`⚠️ Attempt ${attempt}/${maxAttempts} failed, retrying in ${delay}ms...`, error.message);
          await new Promise(resolve => setTimeout(resolve, delay));
          return invokeWithRetry(attempt + 1, maxAttempts);
        }

        // Log final failure with context
        if (attempt >= maxAttempts) {
          console.warn('🚨 All retry attempts exhausted', {
            attempts: maxAttempts,
            lastError: error.message,
            payload: { circuits: inputs.circuits.length }
          });
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
            message: stages[currentStage].message,
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

      // PHASE 6: Handle structured errors including validation failures
      if (!data.success) {
        // Clear progress immediately for known errors
        setProgress(null);
        
        const errorMsg = data.error || 'Design generation failed';
        const errorCode = data.code || 'UNKNOWN_ERROR';
        
        // Handle non-compliant design errors (PHASE 6)
        if (errorCode === 'NON_COMPLIANT_DESIGN' && data.validationErrors) {
          console.error('❌ Design validation failed:', data.validationErrors);
          
          // Build detailed error message
          const errorDetails = data.validationErrors.map((e: any) => 
            `• ${e.circuit}: ${e.message}${e.regulation ? ` (${e.regulation})` : ''}`
          ).join('\n');
          
          toast.error('Design Non-Compliant with BS 7671', {
            description: `${data.validationErrors.length} compliance error(s) detected. Review and adjust parameters.`,
            duration: 10000
          });
          
          // Store validation errors for display
          setError(`${errorMsg}\n\n${errorDetails}`);
          
          // Don't throw - allow frontend to display structured errors
          return false;
        }
        
        const isKnownError = errorCode === 'NO_CIRCUITS' || errorCode;
        
        if (isKnownError) {
          // Friendly message for known errors - no retry needed
          throw new Error(errorMsg);
        } else {
          // Unknown errors
          throw new Error(errorMsg);
        }
      }

      // Complete progress to 100%
      setProgress({ stage: 5, message: 'Design complete!', percent: 100 });
      
      console.log('✅ Design generated successfully', data.design);
      setDesignData(data.design);

      toast.success('Design generated successfully', {
        description: `${data.design.circuits.length} circuits designed and verified`
      });

      // Hold at 100% briefly before clearing
      setTimeout(() => setProgress(null), 800);

      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('❌ Design generation failed:', errorMessage, err);
      setError(errorMessage);

      if (progressInterval) clearInterval(progressInterval);
      setProgress(null); // Clear immediately on error

      // Timeout-specific messaging
      const isTimeout = errorMessage.includes('timeout');
      const mainError = errorMessage.split('\n')[0];
      const details = errorMessage.split('\n').slice(1).join(' ');

      toast.error(isTimeout ? 'Design Service Timeout' : 'Design generation failed', {
        description: isTimeout 
          ? 'Design service didn\'t respond in time. Please try again.'
          : (details || mainError),
        duration: 6000
      });

      return false;
    } finally {
      setIsProcessing(false);
      if (progressInterval) clearInterval(progressInterval);
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
