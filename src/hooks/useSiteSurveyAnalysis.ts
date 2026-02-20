import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { SiteVisit } from '@/types/siteVisit';
import type { SiteSurveyAnalysisJob, SurveyAnalysisResult } from '@/types/surveyAnalysis';

interface UseSiteSurveyAnalysisReturn {
  status: SiteSurveyAnalysisJob['status'] | 'idle';
  progress: number;
  currentStep: string | null;
  result: SurveyAnalysisResult | null;
  error: string | null;
  startAnalysis: (visit: SiteVisit) => Promise<void>;
  isStarting: boolean;
}

export function useSiteSurveyAnalysis(siteVisitId?: string): UseSiteSurveyAnalysisReturn {
  const [status, setStatus] = useState<SiteSurveyAnalysisJob['status'] | 'idle'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [result, setResult] = useState<SurveyAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stuckCheckRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef(0);
  const { toast } = useToast();

  const clearPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (stuckCheckRef.current) {
      clearTimeout(stuckCheckRef.current);
      stuckCheckRef.current = null;
    }
  }, []);

  const fetchJob = useCallback(
    async (id: string) => {
      try {
        const { data, error: fetchError } = await supabase
          .from('site_survey_analysis_jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError || !data) {
          console.error('Error fetching analysis job:', fetchError);
          setError('Failed to fetch analysis status');
          clearPolling();
          return;
        }

        const job = data as unknown as SiteSurveyAnalysisJob;
        setStatus(job.status);
        setProgress(job.progress);
        setCurrentStep(job.current_step);
        lastProgressRef.current = job.progress;

        if (job.status === 'completed') {
          clearPolling();
          setResult(job.result);
          toast({
            title: 'Analysis Complete',
            description: 'Site survey analysis has been generated.',
          });
        } else if (job.status === 'failed') {
          clearPolling();
          setError(job.error || 'Analysis failed');
          toast({
            title: 'Analysis Failed',
            description: job.error || 'An error occurred during analysis',
            variant: 'destructive',
          });
        }
      } catch (err: unknown) {
        console.error('Error in fetchJob:', err);
        clearPolling();
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    },
    [clearPolling, toast]
  );

  const startPolling = useCallback(
    (id: string) => {
      fetchJob(id);

      let pollInterval = 2000;
      let pollCount = 0;

      const poll = () => {
        fetchJob(id);
        pollCount++;

        // Progressive backoff: 2s -> 5s -> 10s
        if (pollCount === 10 && pollInterval === 2000) {
          clearInterval(pollingIntervalRef.current!);
          pollInterval = 5000;
          pollingIntervalRef.current = setInterval(poll, pollInterval);
        } else if (pollCount === 25 && pollInterval === 5000) {
          clearInterval(pollingIntervalRef.current!);
          pollInterval = 10000;
          pollingIntervalRef.current = setInterval(poll, pollInterval);
        }
      };

      pollingIntervalRef.current = setInterval(poll, pollInterval);

      // Stuck detection: 6 minutes
      stuckCheckRef.current = setTimeout(
        () => {
          clearPolling();
          setError('Analysis is taking longer than expected. Please try again.');
          setStatus('failed');
          toast({
            title: 'Analysis Timeout',
            description: 'The analysis is taking too long. Please try again.',
            variant: 'destructive',
          });
        },
        6 * 60 * 1000
      );
    },
    [fetchJob, clearPolling, toast]
  );

  const startAnalysis = useCallback(
    async (visit: SiteVisit) => {
      setIsStarting(true);
      setError(null);
      setResult(null);
      setStatus('pending');
      setProgress(0);

      try {
        const { data, error: invokeError } = await supabase.functions.invoke(
          'create-site-survey-analysis',
          {
            body: {
              siteVisitId: visit.id,
              inputData: {
                propertyType: visit.propertyType,
                propertyAddress: visit.propertyAddress,
                propertyPostcode: visit.propertyPostcode,
                rooms: visit.rooms.map((r) => ({
                  roomName: r.roomName,
                  roomType: r.roomType,
                  items: r.items.map((i) => ({
                    description: i.itemDescription,
                    quantity: i.quantity,
                    unit: i.unit,
                    notes: i.notes,
                  })),
                  notes: r.notes,
                })),
                prompts: visit.prompts
                  .filter((p) => p.response)
                  .map((p) => ({
                    question: p.promptQuestion,
                    response: p.response,
                    roomId: p.roomId,
                  })),
                photoCount: visit.photos.length,
              },
            },
          }
        );

        if (invokeError || !data?.jobId) {
          throw new Error(invokeError?.message || 'Failed to start analysis');
        }

        setJobId(data.jobId);
        startPolling(data.jobId);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('Failed to start analysis:', err);
        setError(message);
        setStatus('failed');
        toast({
          title: 'Failed to Start Analysis',
          description: message,
          variant: 'destructive',
        });
      } finally {
        setIsStarting(false);
      }
    },
    [startPolling, toast]
  );

  // Load existing analysis for this visit on mount
  useEffect(() => {
    if (!siteVisitId) return;

    const loadExisting = async () => {
      const { data } = await supabase
        .from('site_survey_analysis_jobs')
        .select('*')
        .eq('site_visit_id', siteVisitId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        const job = data as unknown as SiteSurveyAnalysisJob;
        setStatus(job.status);
        setProgress(job.progress);
        setCurrentStep(job.current_step);
        setJobId(job.id);

        if (job.status === 'completed' && job.result) {
          setResult(job.result);
        } else if (job.status === 'failed') {
          setError(job.error || 'Previous analysis failed');
        } else if (job.status === 'pending' || job.status === 'processing') {
          // Resume polling for in-progress jobs
          startPolling(job.id);
        }
      }
    };

    loadExisting();

    return () => clearPolling();
  }, [siteVisitId, startPolling, clearPolling]);

  return {
    status,
    progress,
    currentStep,
    result,
    error,
    startAnalysis,
    isStarting,
  };
}
