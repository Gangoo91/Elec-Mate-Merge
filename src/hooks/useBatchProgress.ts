import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BatchJob {
  id: string;
  job_type: string;
  status: string;
  total_batches: number;
  completed_batches: number;
  failed_batches: number;
  current_batch: number;
  progress_percentage: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  metadata?: any;
}

interface BatchProgress {
  id: string;
  job_id: string;
  batch_number: number;
  status: string;
  items_processed: number;
  total_items: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  data?: any;
}

export const useBatchProgress = (jobId?: string) => {
  const [job, setJob] = useState<BatchJob | null>(null);
  const [progress, setProgress] = useState<BatchProgress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobStatus = async (id: string) => {
    try {
      const { data: jobData, error: jobError } = await supabase
        .from('batch_jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (jobError) {
        throw new Error(jobError.message);
      }

      setJob(jobData);

      // Fetch progress details
      const { data: progressData, error: progressError } = await supabase
        .from('batch_progress')
        .select('*')
        .eq('job_id', id)
        .order('batch_number', { ascending: true });

      if (progressError) {
        console.warn('Failed to fetch progress details:', progressError);
      } else {
        setProgress(progressData || []);
      }

      return jobData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch job status');
      return null;
    }
  };

  const pollJobStatus = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const jobData = await fetchJobStatus(id);
      
      // Continue polling if job is still in progress
      if (jobData && (jobData.status === 'pending' || jobData.status === 'processing')) {
        setTimeout(() => pollJobStatus(id), 3000); // Poll every 3 seconds
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Polling failed');
      setIsLoading(false);
    }
  };

  const startPolling = (id: string) => {
    if (id) {
      pollJobStatus(id);
    }
  };

  useEffect(() => {
    if (jobId) {
      startPolling(jobId);
    }
  }, [jobId]);

  const getLatestJobs = async (limit: number = 5) => {
    try {
      const { data, error } = await supabase
        .from('batch_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent jobs');
      return [];
    }
  };

  return {
    job,
    progress,
    isLoading,
    error,
    startPolling,
    fetchJobStatus,
    getLatestJobs,
    isCompleted: job?.status === 'completed',
    isFailed: job?.status === 'failed',
    isProcessing: job?.status === 'processing' || job?.status === 'pending'
  };
};