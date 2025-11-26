import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CostEngineerJob {
  id: string;
  status: 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  progress: number;
  current_step: string | null;
  output_data: any;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

interface UseCostEngineerGenerationProps {
  jobId: string | null;
  onComplete?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useCostEngineerGeneration({ 
  jobId, 
  onComplete, 
  onError 
}: UseCostEngineerGenerationProps) {
  const [job, setJob] = useState<CostEngineerJob | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef<number>(0);
  const stuckCheckRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const clearPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (stuckCheckRef.current) {
      clearTimeout(stuckCheckRef.current);
      stuckCheckRef.current = null;
    }
    setIsPolling(false);
  };

  const fetchJob = async () => {
    if (!jobId) return;

    try {
      const { data, error } = await supabase
        .from('cost_engineer_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Error fetching job:', error);
        clearPolling();
        onError?.('Failed to fetch job status');
        return;
      }

      setJob(data as CostEngineerJob);

      // Check if job is complete
      if (data.status === 'complete') {
        clearPolling();
        onComplete?.(data.output_data);
        toast({
          title: "Cost Analysis Complete",
          description: "Your cost estimate has been generated successfully.",
        });
      } else if (data.status === 'failed') {
        clearPolling();
        onError?.(data.error_message || 'Job failed');
        toast({
          title: "Generation Failed",
          description: data.error_message || 'An error occurred during generation',
          variant: "destructive",
        });
      } else if (data.status === 'cancelled') {
        clearPolling();
        toast({
          title: "Generation Cancelled",
          description: "Cost analysis was cancelled.",
          variant: "destructive",
        });
      }

      // Update last progress for stuck detection
      lastProgressRef.current = data.progress;

    } catch (error: any) {
      console.error('Error in fetchJob:', error);
      clearPolling();
      onError?.(error.message);
    }
  };

  const startPolling = () => {
    if (!jobId || isPolling) return;

    setIsPolling(true);
    lastProgressRef.current = 0;

    // Initial fetch
    fetchJob();

    // Progressive backoff: 1s -> 2s -> 5s -> 10s
    let pollInterval = 1000;
    let pollCount = 0;

    const poll = () => {
      fetchJob();
      pollCount++;

      // Adjust polling interval based on duration
      if (pollCount === 5 && pollInterval === 1000) {
        clearInterval(pollingIntervalRef.current!);
        pollInterval = 2000;
        pollingIntervalRef.current = setInterval(poll, pollInterval);
      } else if (pollCount === 15 && pollInterval === 2000) {
        clearInterval(pollingIntervalRef.current!);
        pollInterval = 5000;
        pollingIntervalRef.current = setInterval(poll, pollInterval);
      } else if (pollCount === 30 && pollInterval === 5000) {
        clearInterval(pollingIntervalRef.current!);
        pollInterval = 10000;
        pollingIntervalRef.current = setInterval(poll, pollInterval);
      }
    };

    pollingIntervalRef.current = setInterval(poll, pollInterval);

    // Check for stuck jobs (no progress for 6 minutes)
    stuckCheckRef.current = setTimeout(() => {
      if (lastProgressRef.current === job?.progress) {
        clearPolling();
        onError?.('Job appears to be stuck. Please try again.');
        toast({
          title: "Generation Timeout",
          description: "The cost analysis is taking longer than expected. Please try again.",
          variant: "destructive",
        });
      }
    }, 6 * 60 * 1000); // 6 minutes
  };

  const cancelJob = async () => {
    if (!jobId) return;

    try {
      const { error } = await supabase.functions.invoke('cancel-cost-engineer-job', {
        body: { jobId }
      });

      if (error) throw error;

      clearPolling();
      toast({
        title: "Generation Cancelled",
        description: "Cost analysis has been cancelled.",
      });
    } catch (error: any) {
      console.error('Error cancelling job:', error);
      toast({
        title: "Cancellation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (jobId) {
      startPolling();
    }

    return () => {
      clearPolling();
    };
  }, [jobId]);

  return {
    job,
    isPolling,
    startPolling,
    cancelJob,
  };
}
