import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MaintenanceMethodData } from '@/types/maintenance-method';

interface MaintenanceMethodJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  current_step: string | null;
  method_data: MaintenanceMethodData | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export const useMaintenanceMethodJobPolling = (jobId: string | null) => {
  const [job, setJob] = useState<MaintenanceMethodJob | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const fetchJob = useCallback(async () => {
    if (!jobId) return;

    try {
      const { data, error } = await supabase
        .from('maintenance_method_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      
      setJob({
        ...data,
        method_data: (data.method_data as unknown) as MaintenanceMethodData | null
      } as MaintenanceMethodJob);

      // Stop polling if job is in terminal state
      if (data.status === 'completed' || data.status === 'failed' || data.status === 'cancelled') {
        setIsPolling(false);
      }
    } catch (error) {
      console.error('Error fetching maintenance method job:', error);
      setIsPolling(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (!jobId) {
      setJob(null);
      setIsPolling(false);
      return;
    }

    // Start polling
    setIsPolling(true);
    fetchJob();

    // Poll every 2 seconds while processing
    const interval = setInterval(() => {
      if (isPolling) {
        fetchJob();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, fetchJob, isPolling]);

  const cancelJob = useCallback(async () => {
    if (!jobId) return;

    try {
      const { error } = await supabase.functions.invoke('cancel-maintenance-method-job', {
        body: { jobId }
      });

      if (error) throw error;
      
      // Refresh job status
      await fetchJob();
    } catch (error) {
      console.error('Error cancelling maintenance method job:', error);
    }
  }, [jobId, fetchJob]);

  return {
    job,
    isPolling,
    cancelJob,
    refetch: fetchJob
  };
};
