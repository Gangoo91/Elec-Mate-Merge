import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

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
  updated_at?: string | null;
  designer_progress: number;
  designer_status: string;
}

interface UseCircuitDesignGenerationReturn {
  job: CircuitDesignJob | null;
  progress: number;
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  currentStep: string;
  estimatedTimeRemaining: string | null;
  designData: any;
  error: string | null;
}

// A worker that dies (edge wall-clock limit, deploy, crash) never writes
// 'failed', so the row sits on 'processing' for good — six did, the oldest
// since Nov 2025. No row update for this long means nobody is working on it:
// the edge runtime ends a worker well inside it.
const STALLED_AFTER_MS = 7 * 60 * 1000;
const STALLED_MESSAGE = 'The designer stopped responding before it finished. Please try again.';

const isStalled = (j: CircuitDesignJob | null) =>
  !!j &&
  (j.status === 'pending' || j.status === 'processing') &&
  Date.now() - new Date(j.updated_at ?? j.started_at ?? j.created_at).getTime() > STALLED_AFTER_MS;

export const useCircuitDesignGeneration = (
  jobId: string | null
): UseCircuitDesignGenerationReturn => {
  const [job, setJob] = useState<CircuitDesignJob | null>(null);
  const [stalled, setStalled] = useState(false);

  useEffect(() => {
    setStalled(false);
    if (!jobId) {
      setJob(null);
      return;
    }

    console.log('🔌 Setting up Realtime subscription for job:', jobId);

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

        setJob((prev) => {
          if (!prev) return data as any as CircuitDesignJob;
          if (jobProgress < prev.progress && jobStatus === 'processing') {
            console.warn('⚠️ Ignoring progress regression:', prev.progress, '->', jobProgress);
            return { ...(data as any), progress: prev.progress } as CircuitDesignJob;
          }
          return data as any as CircuitDesignJob;
        });

        if (jobStatus === 'complete' || jobStatus === 'failed' || jobStatus === 'cancelled') {
          console.log('✅ Job finished, stopping poll interval');
          clearInterval(pollInterval);
        } else if (isStalled(data as any as CircuitDesignJob)) {
          setStalled(true);
          clearInterval(pollInterval);
        }
      }
    }, 3000);

    const channel = supabase
      .channel(realtimeChannelName(`circuit-design-job-${jobId}`))
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'circuit_design_jobs',
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          const updatedJob = payload.new as CircuitDesignJob;
          console.log('🔄 Realtime update:', {
            status: updatedJob.status,
            progress: updatedJob.progress + '%',
            step: updatedJob.current_step,
          });

          setJob(updatedJob);
          // A late update means the worker is alive after all — drop the
          // stall verdict so a completion still shows.
          setStalled(false);

          if (
            updatedJob.status === 'complete' ||
            updatedJob.status === 'failed' ||
            updatedJob.status === 'cancelled'
          ) {
            console.log('✅ Job finished, unsubscribing from Realtime');
            supabase.removeChannel(channel);
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });

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
    };
  }, [jobId]);

  const getEstimatedTimeRemaining = (): string | null => {
    if (!job || !job.started_at || job.progress <= 5) return null;
    if (job.status === 'complete' || job.status === 'failed') return null;

    const startTime = new Date(job.started_at).getTime();
    const elapsedMs = Date.now() - startTime;
    const progress = Math.max(job.progress, 1);

    const totalEstimatedMs = (elapsedMs / progress) * 100;
    const remainingMs = totalEstimatedMs - elapsedMs;

    if (remainingMs <= 0) return 'Almost done...';
    if (remainingMs < 10000) return 'A few seconds...';
    if (remainingMs < 60000) return `~${Math.ceil(remainingMs / 1000)}s remaining`;
    if (remainingMs < 120000) return '~1 minute remaining';
    return `~${Math.ceil(remainingMs / 60000)} minutes remaining`;
  };

  const getProgressMessage = () => {
    if (!job) return '';

    if (job.designer_status === 'processing') {
      const designerProgress = job.designer_progress || 0;
      const baseMessage = job.current_step || 'Designing circuits...';

      if (designerProgress > 0 && designerProgress < 100) {
        return `${baseMessage} (${designerProgress}% complete)`;
      }
      return baseMessage;
    }

    if (job.status === 'complete') {
      return 'Design complete!';
    }

    return job.current_step || '';
  };

  return {
    job,
    progress: Math.max(job?.progress ?? 0, 0),
    status: !jobId ? 'idle' : stalled ? 'failed' : (job?.status as any) || 'pending',
    currentStep: getProgressMessage(),
    estimatedTimeRemaining: getEstimatedTimeRemaining(),
    designData: job?.design_data,
    error: stalled ? STALLED_MESSAGE : job?.error_message,
  };
};
