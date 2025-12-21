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
  
  // Use ref for polling state to avoid stale closure issues
  const isPollingRef = useRef(false);
  
  // Activity tracking for stuck job detection
  const lastProgressRef = useRef(0);
  const lastCurrentStepRef = useRef<string>('');
  const lastActivityUpdateRef = useRef(Date.now());

  const fetchJob = useCallback(async () => {
    if (!jobId) return null;

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
        hasMethodData: !!data.method_data,
        timestamp: new Date().toISOString()
      });
      
      const jobData = {
        ...data,
        method_data: (data.method_data as unknown) as MaintenanceMethodData | null
      } as MaintenanceMethodJob;

      // Force state update immediately
      setJob(jobData);

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
            isPollingRef.current = false;
            setIsPolling(false);
            return jobData;
          }
        }
      }

      // Stop polling if job is in terminal state - but update state FIRST
      if (data.status === 'completed' || data.status === 'failed' || data.status === 'cancelled') {
        console.log('✅ Job reached terminal state:', data.status, '- stopping polling');
        isPollingRef.current = false;
        setIsPolling(false);
      }
      
      return jobData;
    } catch (error) {
      console.error('Error fetching maintenance method job:', error);
      isPollingRef.current = false;
      setIsPolling(false);
      return null;
    }
  }, [jobId]);

  // Realtime subscription as backup to polling
  useEffect(() => {
    if (!jobId) return;

    console.log('📡 Setting up realtime subscription for job:', jobId);
    
    const channel = supabase
      .channel(`maintenance-job-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'maintenance_method_jobs',
          filter: `id=eq.${jobId}`
        },
        (payload) => {
          console.log('📡 Realtime update received:', payload.new);
          const data = payload.new as any;
          
          const jobData = {
            ...data,
            method_data: (data.method_data as unknown) as MaintenanceMethodData | null
          } as MaintenanceMethodJob;
          
          // Force immediate state update from realtime
          setJob(jobData);
          
          // Stop polling if terminal state
          if (data.status === 'completed' || data.status === 'failed' || data.status === 'cancelled') {
            console.log('📡 Realtime: Job terminal state detected, stopping polling');
            isPollingRef.current = false;
            setIsPolling(false);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('📡 Removing realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [jobId]);

  // Polling mechanism
  useEffect(() => {
    if (!jobId) {
      setJob(null);
      isPollingRef.current = false;
      setIsPolling(false);
      return;
    }

    // Reset activity tracking for new job
    lastProgressRef.current = 0;
    lastCurrentStepRef.current = '';
    lastActivityUpdateRef.current = Date.now();

    // Start polling
    isPollingRef.current = true;
    setIsPolling(true);
    fetchJob();

    // Keep fast 1.5s polling during active processing (OpenAI can take 2-4 mins)
    // Only slow down after 5 minutes (200 polls at 1.5s)
    let pollInterval = 1500; // 1.5s - fast enough to catch completion quickly
    let pollCount = 0;
    let timeoutId: number;

    const poll = () => {
      // Use ref to check current polling state (avoids stale closure)
      if (!isPollingRef.current) return;
      
      fetchJob();
      pollCount++;
      
      // Stay at 1.5s for first 200 polls (5 minutes)
      // Then slow to 3s for polls 201-300 (another 5 mins)
      // Only go to 5s after 10 minutes of processing
      if (pollCount === 200) {
        pollInterval = 3000;
        console.log('📊 Polling: Switching to 3s interval after 5 mins');
      }
      if (pollCount === 300) {
        pollInterval = 5000;
        console.log('📊 Polling: Switching to 5s interval after ~10 mins');
      }
      
      timeoutId = window.setTimeout(poll, pollInterval);
    };

    poll();

    return () => {
      // Stop polling on cleanup
      isPollingRef.current = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [jobId, fetchJob]);

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
