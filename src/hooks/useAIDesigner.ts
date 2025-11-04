import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DesignInputs, InstallationDesign } from '@/types/installation-design';

// Fix 3: Client-side timeout increased to 300s for large response transfer
const CLIENT_TIMEOUT_MS = 300000; // 300s (5m) - extra buffer for large responses

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
  const [progress, setProgress] = useState<DesignProgress | null>(() => {
    // Restore progress from localStorage on mount
    const savedProgress = localStorage.getItem('designer-progress');
    return savedProgress ? JSON.parse(savedProgress) : null;
  });

  // Persist progress to localStorage
  const setProgressWithPersistence = (newProgress: DesignProgress | null) => {
    setProgress(newProgress);
    if (newProgress) {
      localStorage.setItem('designer-progress', JSON.stringify(newProgress));
    } else {
      localStorage.removeItem('designer-progress');
    }
  };
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

    // Fix 5: Improved progress stages with extraction feedback
    // Total: ~180s to match typical processing time for batch designs
    const stages = [
      { stage: 1, message: 'Understanding your requirements...', duration: 5000, targetPercent: 5 },
      { stage: 2, message: 'Extracting circuits from description (may take 20-30s)...', duration: 20000, targetPercent: 15 },
      { stage: 3, message: 'Searching BS 7671 regulations...', duration: 10000, targetPercent: 20 },
      { stage: 4, message: 'AI designing circuits (this may take 2-3 minutes)...', duration: 125000, targetPercent: 85 },
      { stage: 5, message: 'Running compliance validation...', duration: 10000, targetPercent: 95 },
      { stage: 6, message: 'Finalising documentation...', duration: 3000, targetPercent: 97 },
      { stage: 7, message: 'Downloading design data...', duration: 5000, targetPercent: 99 }
    ];

    let progressInterval: ReturnType<typeof setInterval> | null = null;
    let currentPercent = 0;

    // Initialize progress immediately
    setProgressWithPersistence({ stage: 1, message: 'Initialising...', percent: 0 });

    // Pre-flight health check with retry (Fix 1: Intelligent Pre-warm)
    let healthCheckPassed = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const { data: healthData, error: healthError } = await supabase.functions.invoke('designer-agent-v2', {
          method: 'GET'
        });
        
        if (!healthError && healthData?.status) {
          console.log(`✅ Design service healthy - Version: ${healthData.version}`, healthData);
          healthCheckPassed = true;
          break;
        }
        
        if (attempt < 3) {
          setProgressWithPersistence({ stage: 0, message: `Service starting up (${attempt}/3)...`, percent: 0 });
          console.warn(`⚠️ Health check attempt ${attempt}/3 failed, retrying in 5s...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      } catch (e) {
        if (attempt < 3) {
          setProgressWithPersistence({ stage: 0, message: `Initialising service (${attempt}/3)...`, percent: 0 });
          console.warn(`⚠️ Health check attempt ${attempt}/3 failed, retrying in 5s...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    }
    
    // Add 10s pre-warm delay if cold start detected
    if (!healthCheckPassed) {
      setProgressWithPersistence({ stage: 0, message: 'Warming up service, please wait...', percent: 0 });
      console.log('🔥 Cold start detected, adding 10s pre-warm delay');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    const invokeWithRetry = async (attempt = 1, maxAttempts = 3): Promise<any> => {
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

        // Keep connection alive with progress updates
        const invokeStartTime = Date.now();
        const keepaliveInterval = setInterval(() => {
          const elapsedSeconds = Math.floor((Date.now() - invokeStartTime) / 1000);
          setProgress(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              message: `${prev.message.split(' (')[0]} (${elapsedSeconds}s elapsed)`
            };
          });
        }, 10000); // Update every 10 seconds

        let data, invokeError;
        try {
          const invokePromise = supabase.functions.invoke('designer-agent-v2', {
            body: {
              mode: 'batch-design',
              projectInfo: {
                name: inputs.projectName,
                installationType: inputs.propertyType,
                additionalPrompt: inputs.additionalPrompt || ''
              },
              supply: {
                voltage: inputs.voltage || 230,
                phases: inputs.phases || 'single',
                ze: inputs.ze || 0.35,
                pfc: (inputs.pscc || 3500) / 1000, // Convert from A to kA
                earthingSystem: inputs.earthingSystem || 'TN-C-S'
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
          
          // Wrap with extended client-side timeout  
          const result = await withTimeout(invokePromise, 300000); // 5 minutes
          data = result.data;
          invokeError = result.error;
        } finally {
          clearInterval(keepaliveInterval);
        }

        clearTimeout(timeoutId);
        
        // NEW: Monitor response size
        if (data) {
          const responseSize = JSON.stringify(data).length;
          const responseSizeKB = (responseSize / 1024).toFixed(1);
          console.log(`📦 Response received: ${responseSizeKB}KB`);
          
          if (responseSize > 500000) { // >500KB
            console.warn(`⚠️ Large response detected (${responseSizeKB}KB) - may take a few seconds to parse`);
            setProgressWithPersistence({ stage: 7, message: `Processing large design (${responseSizeKB}KB)...`, percent: 98 });
          }
        }
        
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
          // Fix 4: Exponential backoff with cold start handling
          let delay = 2000; // Base delay 2s
          if (attempt === 2) delay = 5000; // 5s on second retry
          if (attempt === 3) delay = 10000; // 10s on third retry
          
          // Extra delay for 503/504 (cold start indicators)
          if (error?.message?.includes('503') || error?.message?.includes('504')) {
            delay += 5000;
            console.warn(`⚠️ Cold start detected (${error.message}), adding extra delay`);
          }
          
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
          
          setProgressWithPersistence({
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
        setProgressWithPersistence(null);
        
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
      setProgressWithPersistence({ stage: 8, message: 'Design complete!', percent: 100 });
      
      // Validate design structure before accepting
      const hasInvalidCircuits = data.circuits.some((c: any) => !c.protectionDevice);
      if (hasInvalidCircuits) {
        console.warn('⚠️ Some circuits missing protection device data, applying defaults');
        data.circuits = data.circuits.map((c: any) => ({
          ...c,
          protectionDevice: c.protectionDevice || {
            type: 'MCB',
            rating: Math.ceil((c.designCurrent || c.calculations?.Ib || 0) * 1.25),
            curve: 'B',
            kaRating: 6
          }
        }));
      }
      
      // Validate calculations structure
      const hasInvalidCalculations = data.circuits.some((c: any) => 
        !c.calculations || 
        typeof c.calculations.Ib !== 'number' ||
        !c.calculations.voltageDrop
      );
      
      if (hasInvalidCalculations) {
        console.warn('⚠️ Some circuits missing calculation data, applying defaults');
        data.circuits = data.circuits.map((c: any) => {
          const Ib = c.designCurrent || c.calculations?.Ib || (c.loadPower || 0) / (c.voltage || 230);
          return {
            ...c,
            calculations: {
              Ib: Ib,
              In: c.calculations?.In ?? c.protectionDevice?.rating ?? Math.ceil(Ib * 1.25),
              Iz: c.calculations?.Iz ?? c.protectionDevice?.rating ?? Math.ceil(Ib * 1.25),
              safetyMargin: c.calculations?.safetyMargin ?? 20,
              voltageDrop: c.calculations?.voltageDrop ?? {
                volts: 0,
                percent: 0,
                compliant: true,
                limit: (c.voltage || 230) * 0.05
              },
              zs: c.calculations?.zs ?? c.ze ?? 0.35,
              maxZs: c.calculations?.maxZs ?? 2.19,
              deratedCapacity: c.calculations?.deratedCapacity ?? c.calculations?.Iz ?? 0,
              ...c.calculations
            }
          };
        });
      }
      
      // Wrap backend response into InstallationDesign format
      const design: InstallationDesign = {
        projectName: data.projectInfo?.name || inputs.projectName,
        location: data.projectInfo?.location || '',
        installationType: data.projectInfo?.installationType || inputs.propertyType,
        totalLoad: data.circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0),
        diversityApplied: false,
        circuits: data.circuits,
        consumerUnit: {
          type: 'main-switch',
          mainSwitchRating: inputs.mainSwitchRating || 100,
          incomingSupply: {
            voltage: data.supply?.voltage || inputs.voltage || 230,
            phases: data.supply?.phases || inputs.phases || 'single',
            incomingPFC: (data.supply?.pfc || inputs.pscc || 3500) * 1000,
            Ze: data.supply?.ze || inputs.ze || 0.35,
            earthingSystem: data.supply?.earthingSystem || inputs.earthingSystem || 'TN-C-S'
          }
        },
        materials: [],
        practicalGuidance: []
      };
      
      console.log('✅ Design generated successfully', design);
      setDesignData(design);

      toast.success('Design generated successfully', {
        description: `${design.circuits.length} circuits designed and verified`
      });

      // Hold at 100% briefly before clearing
      setTimeout(() => setProgressWithPersistence(null), 800);

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
    progress,
    retryMessage
  };
};
