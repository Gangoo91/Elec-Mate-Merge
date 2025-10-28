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
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed';
  currentStep: string;
  ramsData: any;
  methodData: any;
  error: string | null;
}

export const useRAMSJobPolling = (jobId: string | null): UseRAMSJobPollingReturn => {
  const [job, setJob] = useState<RAMSJob | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [lastProgress, setLastProgress] = useState(0);
  const [lastProgressUpdate, setLastProgressUpdate] = useState(Date.now());

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

      // Stuck job detection: if progress hasn't changed in 45 seconds, mark as failed
      if (data.status === 'processing') {
        if (data.progress === lastProgress) {
          const stuckDuration = Date.now() - lastProgressUpdate;
          if (stuckDuration > 45000) {
            console.error('❌ STUCK JOB DETECTED: No progress in 45s at', data.progress + '%');
            // Update the job in the database to failed status
            await supabase
              .from('rams_generation_jobs')
              .update({
                status: 'failed',
                error_message: 'Generation stalled - no progress detected for 45 seconds. Please try again.'
              })
              .eq('id', jobId);
            setIsPolling(false);
            return;
          }
        } else {
          setLastProgress(data.progress);
          setLastProgressUpdate(Date.now());
        }
      }

      // Stop polling when complete or failed
      if (data.status === 'complete' || data.status === 'failed') {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Error polling job:', error);
    }
  }, [jobId, lastProgress, lastProgressUpdate]);

  useEffect(() => {
    if (!jobId || !isPolling) return;

    // Initial poll
    pollJob();

    // Poll every 2 seconds
    const interval = setInterval(pollJob, 2000);

    return () => clearInterval(interval);
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
    status: jobId ? ((job?.status as 'pending' | 'processing' | 'complete' | 'failed') || 'pending') : 'idle',
    currentStep: job?.current_step || '',
    ramsData: job?.rams_data,
    methodData: job?.method_data,
    error: job?.error_message
  };
};
