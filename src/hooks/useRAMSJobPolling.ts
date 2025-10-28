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
  status: 'pending' | 'processing' | 'complete' | 'failed';
  currentStep: string;
  ramsData: any;
  methodData: any;
  error: string | null;
}

export const useRAMSJobPolling = (jobId: string | null): UseRAMSJobPollingReturn => {
  const [job, setJob] = useState<RAMSJob | null>(null);
  const [isPolling, setIsPolling] = useState(false);

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

      // Stop polling when complete or failed
      if (data.status === 'complete' || data.status === 'failed') {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Error polling job:', error);
    }
  }, [jobId]);

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
    status: (job?.status as 'pending' | 'processing' | 'complete' | 'failed') || 'pending',
    currentStep: job?.current_step || '',
    ramsData: job?.rams_data,
    methodData: job?.method_data,
    error: job?.error_message
  };
};
