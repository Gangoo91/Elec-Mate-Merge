/**
 * useEnhanceObservation
 * Hook for AI-enhanced EICR observation suggestions.
 * Calls the enhance-eicr-observation edge function.
 */

import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ObservationSuggestions {
  suggestedCode: 'C1' | 'C2' | 'C3' | 'FI';
  confidence: number;
  enhancedDescription: string;
  clientExplanation: string;
  recommendation: string;
  regulationRefs: Array<{ number: string; title: string; relevance: string }>;
}

export interface EnhanceRequest {
  description: string;
  location?: string;
  currentCode?: string;
  /**
   * ELE-1528 — 'generate' expands a few words into a full observation.
   * 'polish' tidies wording the inspector has already written and must not
   * replace it. Defaults to 'generate' so existing callers are unchanged.
   */
  mode?: 'generate' | 'polish';
  /**
   * The inspector's own recommendation. Only meaningful in polish mode — until
   * now it was never sent, so the model could only ever replace it.
   */
  recommendation?: string;
}

export function useEnhanceObservation() {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [suggestions, setSuggestions] = useState<ObservationSuggestions | null>(null);
  const [progressStep, setProgressStep] = useState<'idle' | 'searching' | 'analysing' | 'done'>(
    'idle'
  );
  const { toast } = useToast();
  const lastRequestRef = useRef<EnhanceRequest | null>(null);

  const enhance = async (request: EnhanceRequest): Promise<ObservationSuggestions | null> => {
    if (!request.description || request.description.trim().length < 5) {
      toast({
        title: 'Description too short',
        description: 'Enter at least 5 characters to use AI enhancement.',
        variant: 'destructive',
      });
      return null;
    }

    lastRequestRef.current = request;
    setIsEnhancing(true);
    setSuggestions(null);
    setProgressStep('searching');

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      setProgressStep('analysing');

      const { data, error } = await supabase.functions.invoke('enhance-eicr-observation', {
        body: {
          description: request.description,
          location: request.location,
          currentCode: request.currentCode,
          mode: request.mode || 'generate',
          recommendation: request.recommendation,
        },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error || !data?.success) {
        throw new Error(data?.error || 'Enhancement failed');
      }

      setProgressStep('done');
      setSuggestions(data.suggestions);
      return data.suggestions;
    } catch (error) {
      console.error('Enhance observation error:', error);
      setProgressStep('idle');
      toast({
        title: 'AI enhancement failed',
        description: 'Could not enhance observation. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsEnhancing(false);
    }
  };

  const retry = async (): Promise<ObservationSuggestions | null> => {
    if (lastRequestRef.current) {
      return enhance(lastRequestRef.current);
    }
    return null;
  };

  const reset = () => {
    setSuggestions(null);
    setProgressStep('idle');
  };

  return { enhance, retry, isEnhancing, suggestions, progressStep, reset };
}
