import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RAMSJob {
  id: string;
  status: string;
  progress: number;
  current_step: string | null;
  hs_agent_progress?: number;
  installer_agent_progress?: number;
  hs_agent_status?: string;
  installer_agent_status?: string;
  rams_data: any;
  method_data: any;
  raw_hs_response: any;
  raw_installer_response: any;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  /** Server heartbeat — refreshed every ~15s while an agent is actually alive. */
  updated_at: string | null;
}

/**
 * Client-side backstop only. The server `rams-stall-reaper` cron runs every
 * minute against a 5-minute window and will almost always get there first; this
 * exists so a user staring at the screen isn't left waiting on a cron.
 */
const CLIENT_STALL_MS = 6 * 60 * 1000;

interface UseRAMSJobPollingReturn {
  job: RAMSJob | null;
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  progress: number;
  hsAgentProgress: number;
  installerAgentProgress: number;
  hsAgentStatus: string;
  installerAgentStatus: string;
  status: 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled' | 'partial';
  currentStep: string;
  ramsData: any;
  methodData: any;
  error: string | null;
  /** Seconds since the server last reported activity. null when not running. */
  secondsSinceHeartbeat: number | null;
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

      // Liveness comes straight from the server heartbeat. The agents refresh
      // `updated_at` every ~15s while streaming, so a stale value means the
      // isolate is genuinely gone — previously this inferred activity from
      // `progress` / `current_step`, which barely move during a long stream.
      if (data.status === 'processing') {
        const lastBeat = data.updated_at ? new Date(data.updated_at).getTime() : Date.now();
        const stalledMs = Date.now() - lastBeat;

        if (stalledMs > CLIENT_STALL_MS) {
          console.error(`RAMS job ${jobId}: no server heartbeat for ${Math.round(stalledMs / 1000)}s`);
          await supabase
            .from('rams_generation_jobs')
            .update({
              status: 'failed',
              error_message:
                'Generation timed out — no activity detected for 6 minutes. Please try again.',
            })
            .eq('id', jobId)
            // Guard: without this, a job that finished while the timer was
            // expiring gets its `complete` status overwritten with `failed`
            // and the finished document is thrown away.
            .eq('status', 'processing');
          setIsPolling(false);
          return;
        }
      }

      // Stop polling when complete, partial, failed, or cancelled
      if (
        data.status === 'complete' ||
        data.status === 'partial' ||
        data.status === 'failed' ||
        data.status === 'cancelled'
      ) {
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

    // Progressive polling backoff
    let pollInterval = 1000; // Start at 1s for faster initial feedback
    let pollCount = 0;
    let timeoutId: number;

    const poll = () => {
      pollJob();
      pollCount++;

      // Progressive backoff:
      // 0-20 polls (0-20s): 1s interval (super fast initial feedback)
      // 21-40 polls (20s-1.5min): 5s interval
      // 41+ polls (1.5min+): 10s interval
      if (pollCount === 20) {
        pollInterval = 5000;
        console.log('📊 Polling: Switching to 5s interval');
      }
      if (pollCount === 40) {
        pollInterval = 10000;
        console.log('📊 Polling: Switching to 10s interval');
      }

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
    hsAgentProgress: job?.hs_agent_progress || 0,
    installerAgentProgress: job?.installer_agent_progress || 0,
    hsAgentStatus: job?.hs_agent_status || 'pending',
    installerAgentStatus: job?.installer_agent_status || 'pending',
    status: jobId
      ? (job?.status as 'idle' | 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled') ||
        'pending'
      : 'idle',
    currentStep: job?.current_step || '',
    ramsData: job?.rams_data,
    methodData: job?.method_data,
    error: job?.error_message,
    secondsSinceHeartbeat:
      job?.status === 'processing' && job?.updated_at
        ? Math.max(0, Math.round((Date.now() - new Date(job.updated_at).getTime()) / 1000))
        : null,
  };
};
