import { useState, useEffect } from 'react';
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
  progress: number;
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep: string;
  designData: any;
  error: string | null;
}

export const useCircuitDesignGeneration = (jobId: string | null): UseCircuitDesignGenerationReturn => {
  const [job, setJob] = useState<CircuitDesignJob | null>(null);
  const [stuckCheckTimeout, setStuckCheckTimeout] = useState<number | null>(null);

  useEffect(() => {
    // CRITICAL: Reset state when jobId is null to ensure fresh start
    if (!jobId) {
      setJob(null);
      return;
    }

    console.log('🔌 Setting up Realtime subscription for job:', jobId);

    // Initial fetch
    const fetchInitialJob = async () => {
      const { data, error } = await supabase
        .from('circuit_design_jobs' as any)
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Error fetching initial job:', error);
        return;
      }

      if (data) {
        console.log('📊 Initial job state:', (data as any).status, (data as any).progress + '%');
        setJob(data as any as CircuitDesignJob);
      }
    };

    fetchInitialJob();

    // Poll as fallback every 10s in case Realtime drops
    const pollInterval = setInterval(async () => {
      if (!jobId) return;
      
      const { data, error } = await supabase
        .from('circuit_design_jobs' as any)
        .select('*')
        .eq('id', jobId)
        .single();
      
      if (!error && data) {
        console.log('📊 Polling update:', (data as any).status, (data as any).progress + '%');
        setJob(data as any as CircuitDesignJob);
      }
    }, 10000);

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`circuit-design-job-${jobId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'circuit_design_jobs',
          filter: `id=eq.${jobId}`
        },
        (payload) => {
          const updatedJob = payload.new as CircuitDesignJob;
          console.log('🔄 Realtime update:', {
            status: updatedJob.status,
            progress: updatedJob.progress + '%',
            step: updatedJob.current_step
          });
          
          setJob(updatedJob);
          
          // Clear existing stuck check
          if (stuckCheckTimeout) {
            clearTimeout(stuckCheckTimeout);
            setStuckCheckTimeout(null);
          }
          
          // Set new stuck check if processing (6 min timeout)
          if (updatedJob.status === 'processing') {
            const timeout = window.setTimeout(async () => {
              console.error('❌ STUCK JOB: No activity in 6 minutes');
              await supabase
                .from('circuit_design_jobs' as any)
                .update({
                  status: 'failed',
                  error_message: 'Generation timed out - no activity for 6 minutes.'
                })
                .eq('id', jobId);
            }, 360000);
            
            setStuckCheckTimeout(timeout);
          }
        }
      )
      .subscribe((status, err) => {
        console.log('📡 Subscription status:', status);
        
        if (status === 'CHANNEL_ERROR') {
          console.error('❌ Realtime channel error, polling will continue');
        }
        
        if (status === 'TIMED_OUT') {
          console.warn('⏱️ Realtime timed out, polling will continue');
        }
      });

    // Refetch when user returns to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && jobId) {
        fetchInitialJob();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('🔌 Cleaning up Realtime subscription');
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      supabase.removeChannel(channel);
      if (stuckCheckTimeout) {
        clearTimeout(stuckCheckTimeout);
      }
    };
  }, [jobId]);

  return {
    job,
    progress: job?.status === 'failed' ? 0 : (job?.progress || 0), // Show 0% on failure
    status: jobId ? ((job?.status as any) || 'pending') : 'idle',
    currentStep: job?.current_step || '',
    designData: job?.design_data,
    error: job?.error_message
  };
};
