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
  estimatedTimeRemaining: string | null; // OPTIMIZATION: Show estimated completion time
  designData: any;
  installationGuidance: any;
  installationAgentStatus: string | undefined; // Track installation agent status separately
  error: string | null;
}

// Installation agent timeout - 5 minutes
const INSTALLATION_TIMEOUT_MS = 5 * 60 * 1000;

export const useCircuitDesignGeneration = (jobId: string | null): UseCircuitDesignGenerationReturn => {
  const [job, setJob] = useState<CircuitDesignJob | null>(null);
  const [stuckCheckTimeout, setStuckCheckTimeout] = useState<number | null>(null);
  // Track when installation agent started processing for timeout detection
  const [installationStartTime, setInstallationStartTime] = useState<number | null>(null);

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

        // Installation agent stuck detection
        const installAgentStatus = (data as any).installation_agent_status;
        if (jobStatus === 'complete' && installAgentStatus === 'processing') {
          // Installation agent is still processing after main design is complete
          setInstallationStartTime(prev => prev ?? Date.now());
        } else if (installAgentStatus === 'complete' || installAgentStatus === 'failed' || installAgentStatus === 'skipped') {
          // Clear timeout tracking when installation agent finishes
          setInstallationStartTime(null);
        }
        
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

  // Check for installation agent timeout
  useEffect(() => {
    if (!installationStartTime || !job) return;

    const checkTimeout = () => {
      if (Date.now() - installationStartTime > INSTALLATION_TIMEOUT_MS) {
        console.warn('⏱️ Installation agent timed out after 5 minutes');
        // Mark installation agent as timed out locally
        setJob(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            installation_agent_status: 'timeout',
            current_step: 'Installation guidance timed out'
          };
        });
        setInstallationStartTime(null);
      }
    };

    // Check immediately and then every 10 seconds
    checkTimeout();
    const interval = setInterval(checkTimeout, 10000);

    return () => clearInterval(interval);
  }, [installationStartTime, job?.status]);

  // Calculate estimated time remaining based on progress and elapsed time
  const getEstimatedTimeRemaining = (): string | null => {
    if (!job || !job.started_at || job.progress <= 5) return null;
    if (job.status === 'complete' || job.status === 'failed') return null;

    const startTime = new Date(job.started_at).getTime();
    const elapsedMs = Date.now() - startTime;
    const progress = Math.max(job.progress, 1);

    // Estimate based on linear projection
    const totalEstimatedMs = (elapsedMs / progress) * 100;
    const remainingMs = totalEstimatedMs - elapsedMs;

    if (remainingMs <= 0) return 'Almost done...';
    if (remainingMs < 10000) return 'A few seconds...';
    if (remainingMs < 60000) return `~${Math.ceil(remainingMs / 1000)}s remaining`;
    if (remainingMs < 120000) return '~1 minute remaining';
    return `~${Math.ceil(remainingMs / 60000)} minutes remaining`;
  };

  // Enhanced progress messages for sequential execution with phase details
  const getProgressMessage = () => {
    if (!job) return '';

    // Phase 1: Circuit Designer
    if (job.designer_status === 'processing') {
      const designerProgress = job.designer_progress || 0;
      const baseMessage = job.current_step || 'Designing circuits...';

      // Add circuit-level progress if available
      if (designerProgress > 0 && designerProgress < 100) {
        return `${baseMessage} (${designerProgress}% complete)`;
      }
      return `${baseMessage} (Phase 1/2)`;
    }

    // Transition phase
    if (job.designer_status === 'complete' && job.installation_agent_status === 'pending') {
      return 'Circuit design complete. Starting installation guidance...';
    }

    // Phase 2: Installation Agent
    if (job.designer_status === 'complete' && job.installation_agent_status === 'processing') {
      const installProgress = job.installation_agent_progress || 0;
      const baseMessage = job.current_step || 'Generating installation guidance...';

      if (installProgress > 0 && installProgress < 100) {
        return `${baseMessage} (${installProgress}% complete)`;
      }
      return `${baseMessage} (Phase 2/2)`;
    }

    // Installation agent timed out or skipped
    if (job.installation_agent_status === 'timeout' || job.installation_agent_status === 'skipped') {
      return 'Design complete (installation guidance skipped)';
    }

    // Completed
    if (job.status === 'complete') {
      return 'Design complete!';
    }

    return job.current_step || '';
  };

  // Calculate smoothed progress that never decreases
  const getSmoothedProgress = (): number => {
    if (!job) return 0;
    if (job.status === 'failed') return 0;

    // Combine designer and installation agent progress for overall
    const designerContribution = Math.min(job.designer_progress || 0, 100) * 0.5; // 0-50%
    const installContribution = Math.min(job.installation_agent_progress || 0, 100) * 0.5; // 50-100%

    // Use job.progress if available, otherwise calculate
    const calculatedProgress = job.progress > 0
      ? job.progress
      : Math.round(designerContribution + installContribution);

    return Math.max(calculatedProgress, 0);
  };

  return {
    job,
    progress: getSmoothedProgress(),
    status: jobId ? ((job?.status as any) || 'pending') : 'idle',
    currentStep: getProgressMessage(),
    estimatedTimeRemaining: getEstimatedTimeRemaining(),
    designData: job?.design_data,
    installationGuidance: job?.installation_guidance,
    installationAgentStatus: job?.installation_agent_status,
    error: job?.error_message
  };
};
