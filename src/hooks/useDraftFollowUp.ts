import { useState, useCallback } from 'react';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

export interface FollowUpLead {
  name: string;
  contact_name?: string | null;
  source?: string | null;
  notes?: string | null;
  estimated_value?: number | null;
  channel: 'sms' | 'email';
}

/**
 * Draft a personalised follow-up to a lead using Employer Mate (the existing
 * employer-ai-assistant streaming endpoint) — no new edge function. Returns the
 * streamed text so the owner can copy/send it. SMS = short & punchy, email =
 * a proper enquiry reply with subject line.
 */
export const useDraftFollowUp = () => {
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (lead: FollowUpLead) => {
    setLoading(true);
    setError(null);
    setDraft('');

    const brief = [
      `Lead: ${lead.name}`,
      lead.contact_name ? `Contact: ${lead.contact_name}` : '',
      lead.source ? `Source: ${lead.source}` : '',
      lead.estimated_value ? `Estimated value: £${Math.round(lead.estimated_value)}` : '',
      lead.notes ? `What they asked for: ${lead.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const instruction =
      lead.channel === 'sms'
        ? `Draft a short, warm follow-up TEXT MESSAGE (2–3 sentences, under 320 characters, no subject line) to this new enquiry. Thank them for getting in touch, reference what they need, and offer to book a time to take a look or send a price. Sign off from the firm. UK English, friendly but professional. Output ONLY the message text — no preamble, no options, no notes.`
        : `Draft a follow-up EMAIL to this new enquiry. Start with "Subject:" then the email body. Thank them, reference exactly what they asked for, briefly reassure them (registered electrician, work to BS 7671), and propose the next step (a quick call or site visit to price it up). Keep it concise and personable. UK English. Output ONLY the subject line and email body — no preamble, no notes, no alternatives.`;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/employer-ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session?.access_token ?? SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `${instruction}\n\n${brief}` }],
          page_context: 'Leads — drafting a follow-up to a new enquiry',
        }),
      });
      if (!resp.ok || !resp.body) throw new Error('request failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setDraft(acc);
      }
      if (!acc.trim()) throw new Error('empty');
      return acc;
    } catch {
      setError('Mate couldn’t draft that just now. Try again in a moment.');
      return '';
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setDraft('');
    setError(null);
    setLoading(false);
  }, []);

  return { draft, loading, error, generate, reset };
};
