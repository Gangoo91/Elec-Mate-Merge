import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCohortMessaging — broadcast a tutor message to every active learner
   in a cohort. Wraps the send-cohort-message edge fn.
   ========================================================================== */

export interface CohortMessageResult {
  cohort_id: string;
  cohort_name: string | null;
  recipients: number;
  sent: number;
  failed: number;
  results: Array<{ email: string; ok: boolean; error?: string }>;
}

export function useCohortMessaging() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    async (opts: {
      cohortId: string;
      subject: string;
      bodyHtml: string;
    }): Promise<CohortMessageResult> => {
      setSending(true);
      setError(null);
      try {
        const { data, error: invErr } = await supabase.functions.invoke('send-cohort-message', {
          body: {
            cohort_id: opts.cohortId,
            subject: opts.subject,
            body_html: opts.bodyHtml,
          },
        });
        if (invErr) throw invErr;
        return data as CohortMessageResult;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setSending(false);
      }
    },
    []
  );

  return { send, sending, error };
}
