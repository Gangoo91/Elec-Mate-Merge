/**
 * useEstimateRemedialCosts
 * Hook for AI-powered remedial cost estimation from EICR defects.
 * Calls the estimate-remedial-costs edge function.
 */

import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { RemedialQuoteItem, DefectObservation } from '@/utils/defectToQuoteItems';

interface EstimateSummary {
  totalMaterials: number;
  totalLabour: number;
  totalExVat: number;
  defectsProcessed: number;
}

export interface EstimateResult {
  items: RemedialQuoteItem[];
  summary: EstimateSummary;
  scopeOfWorks?: string;
}

export function useEstimateRemedialCosts() {
  const [isEstimating, setIsEstimating] = useState(false);
  const [progressStep, setProgressStep] = useState<'idle' | 'authenticating' | 'searching' | 'generating' | 'done'>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { toast } = useToast();
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const estimate = async (
    defects: DefectObservation[]
  ): Promise<EstimateResult | null> => {
    // Cancel any previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsEstimating(true);
    setProgressStep('authenticating');
    setElapsedSeconds(0);

    // Start elapsed timer
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      setProgressStep('searching');

      // Use a timeout race — Supabase functions.invoke doesn't support AbortSignal directly
      const invokePromise = supabase.functions.invoke(
        'estimate-remedial-costs',
        {
          body: {
            defects: defects.map(d => ({
              code: d.code,
              description: d.description,
              location: d.location,
              circuitRef: d.circuitRef,
            })),
          },
          headers: { Authorization: `Bearer ${session.access_token}` },
        }
      );

      // Create an abort promise
      const abortPromise = new Promise<never>((_, reject) => {
        abortRef.current!.signal.addEventListener('abort', () => {
          reject(new DOMException('Cancelled', 'AbortError'));
        });
      });

      const { data, error } = await Promise.race([invokePromise, abortPromise]);

      if (error || !data?.success) {
        let serverError = data?.error || error?.message || 'Estimation failed';
        if (error?.context && typeof error.context.json === 'function') {
          try {
            const body = await error.context.json();
            serverError = body?.error || serverError;
          } catch { /* response already consumed */ }
        }
        throw new Error(serverError);
      }

      setProgressStep('done');
      return {
        items: data.items,
        summary: data.summary,
        scopeOfWorks: data.scopeOfWorks,
      };
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        // User cancelled — no toast
        setProgressStep('idle');
        return null;
      }
      console.error('Estimate remedial costs error:', error);
      toast({
        title: 'Estimation failed',
        description: error?.message || 'Could not estimate remedial costs. Falling back to standard pricing.',
        variant: 'destructive',
      });
      setProgressStep('idle');
      return null;
    } finally {
      setIsEstimating(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsEstimating(false);
    setProgressStep('idle');
    setElapsedSeconds(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetProgress = () => {
    setProgressStep('idle');
    setElapsedSeconds(0);
  };

  return { estimate, isEstimating, progressStep, elapsedSeconds, cancel, resetProgress };
}
