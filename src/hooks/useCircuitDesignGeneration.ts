import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CircuitDesignJob {
  id: string;
  status: string;
  progress: number;
  current_step: string | null;
  design_data: any;
  raw_response: any;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

interface UseCircuitDesignGenerationReturn {
  job: CircuitDesignJob | null;
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  progress: number;
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep: string;
  designData: any;
  error: string | null;
}

export const useCircuitDesignGeneration = (jobId: string | null): UseCircuitDesignGenerationReturn => {
  const [job, setJob] = useState<CircuitDesignJob | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [lastProgress, setLastProgress] = useState(0);
  const [lastCurrentStep, setLastCurrentStep] = useState<string>('');
  const [lastActivityUpdate, setLastActivityUpdate] = useState(Date.now());

  const pollJob = useCallback(async () => {
    if (!jobId) return;

    try {
      const { data, error } = await supabase
        .from('circuit_design_jobs' as any)
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Polling error:', error);
        return;
      }

      setJob(data as any);

      // Stuck job detection: 360s timeout (6 minutes) - reset on progress OR step change
      if ((data as any).status === 'processing') {
        const hasProgressChanged = (data as any).progress !== lastProgress;
        const hasStepChanged = (data as any).current_step !== lastCurrentStep;
        
        if (hasProgressChanged || hasStepChanged) {
          setLastProgress((data as any).progress);
          setLastCurrentStep((data as any).current_step || '');
          setLastActivityUpdate(Date.now());
        } else {
          const stuckDuration = Date.now() - lastActivityUpdate;
          if (stuckDuration > 360000) {
            console.error('❌ STUCK JOB DETECTED: No activity in 360s at', (data as any).progress + '%');
            await supabase
              .from('circuit_design_jobs' as any)
              .update({
                status: 'failed',
                error_message: 'Generation timed out - no activity detected for 6 minutes. Please try again.'
              })
              .eq('id', jobId);
            setIsPolling(false);
            return;
          }
        }
      }

      // Stop polling when complete, failed, or cancelled
      if ((data as any).status === 'complete' || (data as any).status === 'failed' || (data as any).status === 'cancelled') {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Error polling job:', error);
    }
  }, [jobId, lastProgress, lastCurrentStep, lastActivityUpdate]);

  useEffect(() => {
    if (!jobId || !isPolling) return;

    pollJob();

    // Progressive polling backoff
    let pollInterval = 1000; // Start at 1s
    let pollCount = 0;
    let timeoutId: number;

    const poll = () => {
      pollJob();
      pollCount++;
      
      if (pollCount === 20) {
        pollInterval = 5000;
        console.log('📊 Polling: Switching to 5s interval');
      }
      if (pollCount === 40) {
        pollInterval = 10000;
        console.log('📊 Polling: Switching to 10s interval');
      }
      
      timeoutId = window.setTimeout(poll, pollInterval);
    };

    poll();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [jobId, isPolling, pollJob]);

  const startPolling = useCallback(() => {
    setIsPolling(true);
  }, []);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  return {
    job,
    isPolling,
    startPolling,
    stopPolling,
    progress: job?.progress || 0,
    status: jobId ? ((job?.status as 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled') || 'pending') : 'idle',
    currentStep: job?.current_step || '',
    designData: job?.design_data,
    error: job?.error_message
  };
};
