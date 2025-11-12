import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RAMSJob {
  id: string;
  status: string;
  progress: number;
  current_step: string | null;
  rams_data: any;
  method_data: any;
  raw_hs_response: any;
  raw_installer_response: any;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

interface UseRAMSJobPollingReturn {
  job: RAMSJob | null;
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  progress: number;
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep: string;
  ramsData: any;
  methodData: any;
  error: string | null;
}

export const useRAMSJobPolling = (jobId: string | null): UseRAMSJobPollingReturn => {
  const [job, setJob] = useState<RAMSJob | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [lastProgress, setLastProgress] = useState(0);
  const [lastCurrentStep, setLastCurrentStep] = useState<string>('');
  const [lastActivityUpdate, setLastActivityUpdate] = useState(Date.now());

  const pollJob = useCallback(async () => {
    if (!jobId) return;

    try {
      const { data, error } = await supabase
        .from('rams_generation_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Polling error:', error);
        return;
      }

      setJob(data);

      // Stuck job detection: 180s timeout (3 minutes) - reset on progress OR step change
      if (data.status === 'processing') {
        const hasProgressChanged = data.progress !== lastProgress;
        const hasStepChanged = data.current_step !== lastCurrentStep;
        
        if (hasProgressChanged || hasStepChanged) {
          // Any activity detected - reset timer
          setLastProgress(data.progress);
          setLastCurrentStep(data.current_step || '');
          setLastActivityUpdate(Date.now());
        } else {
          // No activity - check if stuck (increased timeout to 6 minutes)
          const stuckDuration = Date.now() - lastActivityUpdate;
          if (stuckDuration > 360000) {
            console.error('❌ STUCK JOB DETECTED: No activity in 360s at', data.progress + '%');
            await supabase
              .from('rams_generation_jobs')
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
      if (data.status === 'complete' || data.status === 'failed' || data.status === 'cancelled') {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Error polling job:', error);
    }
  }, [jobId, lastProgress, lastCurrentStep, lastActivityUpdate]);

  useEffect(() => {
    if (!jobId || !isPolling) return;

    // Initial poll
    pollJob();

    // Fixed 1s polling - no backoff for smooth progress
    const pollInterval = 1000; // Always 1s for instant UI updates
    let timeoutId: number;

    const poll = () => {
      pollJob();
      timeoutId = window.setTimeout(poll, pollInterval);
    };

    poll(); // Start polling

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
    ramsData: job?.rams_data,
    methodData: job?.method_data,
    error: job?.error_message
  };
};
