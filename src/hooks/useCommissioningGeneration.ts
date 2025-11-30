import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CommissioningJob {
  id: string;
  status: 'pending' | 'processing' | 'complete' | 'failed' | 'cancelled';
  progress: number;
  current_step: string | null;
  result_data: any;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export const useCommissioningGeneration = () => {
  const [job, setJob] = useState<CommissioningJob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = async (jobInputs: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: createError } = await supabase.functions.invoke('create-commissioning-job', {
        body: jobInputs
      });

      if (createError) throw createError;

      console.log('✅ Created commissioning job:', data.jobId);
      
      // Start polling for job status
      pollJobStatus(data.jobId);

      return data.jobId;
    } catch (err: any) {
      console.error('Error creating commissioning job:', err);
      setError(err.message || 'Failed to create commissioning job');
      setIsLoading(false);
      toast.error('Failed to start commissioning generation');
      throw err;
    }
  };

  const pollJobStatus = async (jobId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('commissioning_jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (fetchError) {
          console.error('Error fetching job status:', fetchError);
          clearInterval(pollInterval);
          setError('Failed to fetch job status');
          setIsLoading(false);
          return;
        }

        setJob(data as CommissioningJob);

        // Stop polling if job is complete, failed, or cancelled
        if (data.status === 'complete' || data.status === 'failed' || data.status === 'cancelled') {
          clearInterval(pollInterval);
          setIsLoading(false);

          if (data.status === 'complete') {
            toast.success('Commissioning procedures generated successfully');
          } else if (data.status === 'failed') {
            setError(data.error_message || 'Generation failed');
            toast.error('Failed to generate commissioning procedures');
          } else if (data.status === 'cancelled') {
            toast.info('Generation cancelled');
          }
        }
      } catch (err: any) {
        console.error('Error polling job status:', err);
        clearInterval(pollInterval);
        setError(err.message);
        setIsLoading(false);
      }
    }, 2000); // Poll every 2 seconds

    // Cleanup interval on unmount
    return () => clearInterval(pollInterval);
  };

  const cancelJob = async (jobId: string) => {
    try {
      const { error: cancelError } = await supabase.functions.invoke('cancel-commissioning-job', {
        body: { jobId }
      });

      if (cancelError) throw cancelError;

      toast.success('Generation cancelled');
      setIsLoading(false);
    } catch (err: any) {
      console.error('Error cancelling job:', err);
      toast.error('Failed to cancel generation');
    }
  };

  return {
    job,
    isLoading,
    error,
    createJob,
    cancelJob
  };
};
