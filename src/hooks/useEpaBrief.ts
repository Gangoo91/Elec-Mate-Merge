import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useEpaBrief — fetches a personalised pre-EPA brief from ai-epa-brief.
   Non-streaming (single JSON return).
   ========================================================================== */

export interface EpaBrief {
  intro: string;
  likely_viva_topics: Array<{ topic: string; why: string; prep: string }>;
  bs7671_hot_zones: Array<{ ref: string; what_to_remember: string }>;
  weak_ac_revision: Array<{ unit_code: string; focus: string; exemplar?: string }>;
  common_pitfalls: string[];
  day_of_advice: string[];
  confidence_message: string;
}

export interface EpaBriefContext {
  student_name: string;
  course: { name: string | null; code: string | null } | null;
  epa_booking_date: string | null;
  weak_units_count: number;
  facets_used: number;
}

export interface UseEpaBrief {
  status: 'idle' | 'loading' | 'done' | 'error';
  brief: EpaBrief | null;
  context: EpaBriefContext | null;
  error: string | null;
  generate: (collegeStudentId: string) => Promise<void>;
  reset: () => void;
}

export function useEpaBrief(): UseEpaBrief {
  const [status, setStatus] = useState<UseEpaBrief['status']>('idle');
  const [brief, setBrief] = useState<EpaBrief | null>(null);
  const [context, setContext] = useState<EpaBriefContext | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setBrief(null);
    setContext(null);
    setError(null);
  }, []);

  const generate = useCallback(async (collegeStudentId: string) => {
    reset();
    setStatus('loading');
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not signed in');
      const res = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/ai-epa-brief',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ college_student_id: collegeStudentId }),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      }
      const json = (await res.json()) as { brief: EpaBrief; context: EpaBriefContext };
      setBrief(json.brief);
      setContext(json.context);
      setStatus('done');
    } catch (e) {
      setError((e as Error).message ?? 'Failed to generate brief');
      setStatus('error');
    }
  }, [reset]);

  return { status, brief, context, error, generate, reset };
}
