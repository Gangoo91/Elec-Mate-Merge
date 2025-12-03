import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Activity tracking for stuck job detection
  const lastProgressRef = useRef(0);
  const lastCurrentStepRef = useRef<string>('');
  const lastActivityUpdateRef = useRef(Date.now());

  const fetchJob = useCallback(async () => {
    if (!jobId) return;

    try {
      const { data, error } = await supabase
        .from('maintenance_method_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      
      // Debug: Log raw polling data
      console.log('🔄 Maintenance job polling:', {
        id: data.id,
        status: data.status,
        progress: data.progress,
        currentStep: data.current_step,
        timestamp: new Date().toISOString()
      });
      
      setJob({
        ...data,
        method_data: (data.method_data as unknown) as MaintenanceMethodData | null
      } as MaintenanceMethodJob);

      // Stuck job detection: 360s timeout (6 minutes)
      if (data.status === 'processing') {
        const hasProgressChanged = data.progress !== lastProgressRef.current;
        const hasStepChanged = data.current_step !== lastCurrentStepRef.current;
        
        if (hasProgressChanged || hasStepChanged) {
          lastProgressRef.current = data.progress;
          lastCurrentStepRef.current = data.current_step || '';
          lastActivityUpdateRef.current = Date.now();
        } else {
          const stuckDuration = Date.now() - lastActivityUpdateRef.current;
          if (stuckDuration > 360000) { // 6 minutes
            console.error('❌ STUCK JOB DETECTED: No activity for 6 minutes at', data.progress + '%');
            await supabase
              .from('maintenance_method_jobs')
              .update({
                status: 'failed',
                error_message: 'Generation timed out - no progress for 6 minutes. Please try again.'
              })
              .eq('id', jobId);
            setIsPolling(false);
            return;
          }
        }
      }

      // Stop polling if job is in terminal state
      if (data.status === 'completed' || data.status === 'failed' || data.status === 'cancelled') {
        setTimeout(() => {
          setIsPolling(false);
        }, 500); // Delay to ensure state propagates
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

    // Reset activity tracking for new job
    lastProgressRef.current = 0;
    lastCurrentStepRef.current = '';
    lastActivityUpdateRef.current = Date.now();

    // Start polling
    setIsPolling(true);
    fetchJob();

    // Progressive polling backoff
    let pollInterval = 1000; // Start at 1s
    let pollCount = 0;
    let timeoutId: number;

    const poll = () => {
      if (!isPolling) return;
      fetchJob();
      pollCount++;
      
      // 0-20 polls: 1s interval
      // 21-40 polls: 3s interval  
      // 41+ polls: 5s interval
      if (pollCount === 20) {
        pollInterval = 3000;
        console.log('📊 Polling: Switching to 3s interval');
      }
      if (pollCount === 40) {
        pollInterval = 5000;
        console.log('📊 Polling: Switching to 5s interval');
      }
      
      timeoutId = window.setTimeout(poll, pollInterval);
    };

    poll();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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
