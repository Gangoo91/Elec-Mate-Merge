import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AcSuggestion {
  qualification_code: string;
  unit_code: string;
  unit_title: string | null;
  ac_code: string;
  ac_text: string;
  confidence: number;
  rationale: string;
}

/**
 * AI auto-tagger for a college resource. Returns ranked AC suggestions
 * (via the ai-tag-resource edge function) + exposes accept/reject handlers
 * that write to resource_ac_links with mapping_source='ai_confirmed'.
 */
export function useResourceAiSuggestions(resourceId: string | null) {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<AcSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setSuggestions([]);
    setReason(null);
    setError(null);
  }, []);

  useEffect(() => {
    // Clear suggestions when switching resources so they don't linger
    reset();
  }, [resourceId, reset]);

  const suggest = useCallback(async () => {
    if (!resourceId) return;
    setLoading(true);
    setError(null);
    setReason(null);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not signed in');
      const res = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/ai-tag-resource',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resource_id: resourceId }),
        }
      );
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`HTTP ${res.status}: ${t.slice(0, 200)}`);
      }
      const body = (await res.json()) as {
        suggestions?: AcSuggestion[];
        reason?: string;
      };
      setSuggestions(body.suggestions ?? []);
      setReason(body.reason ?? null);
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      toast({
        title: 'AI suggest failed',
        description: msg,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [resourceId, toast]);

  const dismiss = useCallback((key: string) => {
    setSuggestions((prev) =>
      prev.filter(
        (s) => `${s.qualification_code}|${s.unit_code}|${s.ac_code}` !== key
      )
    );
  }, []);

  const accept = useCallback(
    async (s: AcSuggestion, onAccepted?: () => void) => {
      if (!resourceId) return;
      try {
        const { error } = await supabase.from('resource_ac_links').insert({
          resource_id: resourceId,
          qualification_code: s.qualification_code,
          unit_code: s.unit_code,
          ac_code: s.ac_code,
          mapping_source: 'ai_confirmed',
          confidence: s.confidence,
        });
        if (error) {
          // Ignore unique-constraint violations — already linked
          if (!error.message.includes('duplicate key')) throw error;
        }
        dismiss(`${s.qualification_code}|${s.unit_code}|${s.ac_code}`);
        onAccepted?.();
      } catch (e) {
        toast({
          title: 'Could not link AC',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
    },
    [resourceId, dismiss, toast]
  );

  const acceptAll = useCallback(
    async (onAccepted?: () => void) => {
      if (!resourceId || suggestions.length === 0) return;
      for (const s of suggestions) {
        await supabase
          .from('resource_ac_links')
          .insert({
            resource_id: resourceId,
            qualification_code: s.qualification_code,
            unit_code: s.unit_code,
            ac_code: s.ac_code,
            mapping_source: 'ai_confirmed',
            confidence: s.confidence,
          })
          .then(({ error }) => {
            if (error && !error.message.includes('duplicate key')) {
              console.error('[accept-all]', error);
            }
          });
      }
      setSuggestions([]);
      onAccepted?.();
    },
    [resourceId, suggestions]
  );

  return {
    suggestions,
    loading,
    reason,
    error,
    suggest,
    accept,
    acceptAll,
    dismiss,
    reset,
  };
}
