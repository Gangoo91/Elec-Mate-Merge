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
  // Parallel agent tracking
  designer_progress: number;
  designer_status: string;
  installer_progress: number;
  installer_status: string;
  installation_data: any;
  // NEW: Installation guidance from Design Installation Agent
  installation_agent_progress: number;
  installation_agent_status: string;
  installation_guidance: any;
}

interface UseCircuitDesignGenerationReturn {
  job: CircuitDesignJob | null;
  progress: number;
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep: string;
  designData: any;
  installationGuidance: any;
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

    // Poll as fallback every 3s for faster completion detection
    const pollInterval = setInterval(async () => {
      if (!jobId) return;
      
      const { data, error } = await supabase
        .from('circuit_design_jobs' as any)
        .select('*')
        .eq('id', jobId)
        .single();
      
      if (!error && data) {
        const jobStatus = (data as any).status;
        const jobProgress = (data as any).progress;
        console.log('📊 Polling update:', jobStatus, jobProgress + '%');
        
        // Only update if progress moves forward or status changes (prevent regression display)
        setJob(prev => {
          if (!prev) return data as any as CircuitDesignJob;
          // Never allow progress to go backwards in UI
          if (jobProgress < prev.progress && jobStatus === 'processing') {
            console.warn('⚠️ Ignoring progress regression:', prev.progress, '->', jobProgress);
            return { ...data as any, progress: prev.progress } as CircuitDesignJob;
          }
          return data as any as CircuitDesignJob;
        });
        
        // Stop polling when job reaches terminal state
        if (jobStatus === 'complete' || jobStatus === 'failed' || jobStatus === 'cancelled') {
          console.log('✅ Job finished, stopping poll interval');
          clearInterval(pollInterval);
        }
      }
    }, 3000);

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
          
          // Unsubscribe when job completes
          if (updatedJob.status === 'complete' || updatedJob.status === 'failed' || updatedJob.status === 'cancelled') {
            console.log('✅ Job finished, unsubscribing from Realtime');
            supabase.removeChannel(channel);
          }
          
          // Clear any existing timeout when job updates
          if (stuckCheckTimeout) {
            clearTimeout(stuckCheckTimeout);
            setStuckCheckTimeout(null);
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

  // Enhanced progress messages for sequential execution
  const getProgressMessage = () => {
    if (!job) return '';
    
    // Phase 1: Circuit Designer
    if (job.designer_status === 'processing') {
      return `${job.current_step} (Phase 1/2)`;
    }
    
    // Phase 2: Installation Agent
    if (job.designer_status === 'complete' && job.installation_agent_status === 'processing') {
      return `${job.current_step} (Phase 2/2)`;
    }
    
    return job.current_step || '';
  };

  return {
    job,
    progress: job?.status === 'failed' ? 0 : (job?.progress || 0), // Show 0% on failure
    status: jobId ? ((job?.status as any) || 'pending') : 'idle',
    currentStep: getProgressMessage(),
    designData: job?.design_data,
    installationGuidance: job?.installation_guidance,
    error: job?.error_message
  };
};
