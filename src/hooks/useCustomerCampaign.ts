/**
 * ELE-1554 — "keep in touch" campaign state.
 *
 * Templates are ordinary user-owned rows (RLS on user_id). Sending is NOT —
 * it goes through the `send-customer-campaign` edge function, because the
 * daily cap, the 30-day dedupe window and the suppression checks all have to
 * be enforced somewhere the client cannot reach. The send log table is
 * read-only to the client for the same reason: it is what the cap is counted
 * from, so a client that could write to it could erase its own limit.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CampaignTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  isDefault: boolean;
  updatedAt: string;
}

export interface CampaignSkip {
  customerId: string;
  name: string;
  reason: string;
}

export interface CampaignResult {
  sent: number;
  skipped: CampaignSkip[];
  failed: CampaignSkip[];
  remainingToday: number;
  dailyCap?: number;
  message?: string;
}

/** Placeholders the edge function substitutes. Keep in step with it. */
export const MERGE_FIELDS = [
  { token: '{{customer_name}}', label: 'First name', example: 'Dave' },
  { token: '{{customer_full_name}}', label: 'Full name', example: 'Dave Thompson' },
  { token: '{{company_name}}', label: 'Your company', example: 'ABC Electrical' },
] as const;

export const DEFAULT_TEMPLATE = {
  name: 'Checking in',
  subject: 'Anything I can help with, {{customer_name}}?',
  body: `Hi {{customer_name}},

It's {{company_name}} here — just checking in to see how everything's been since I was last out.

If anything electrical needs looking at, or you've got a job you've been putting off, give me a shout and I'll get you booked in.

And if you know anyone — family, friends, neighbours — who needs an electrician, I'd really appreciate you passing my details on.

Thanks,
{{company_name}}`,
};

export function useCustomerCampaign() {
  const [templates, setTemplates] = useState<CampaignTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sentTodayCount, setSentTodayCount] = useState(0);
  const { toast } = useToast();

  const loadTemplates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('customer_campaign_templates')
        .select('id, name, subject, body, is_default, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setTemplates(
        (data ?? []).map((t) => ({
          id: t.id,
          name: t.name,
          subject: t.subject,
          body: t.body,
          isDefault: t.is_default,
          updatedAt: t.updated_at,
        }))
      );
    } catch (err) {
      console.error('Failed to load campaign templates:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** How many have gone today — drives the "N of 10 left" counter in the UI. */
  const loadSentToday = useCallback(async () => {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const { count } = await supabase
      .from('customer_campaign_sends')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'sent')
      .gte('sent_at', startOfDay.toISOString());
    setSentTodayCount(count ?? 0);
  }, []);

  useEffect(() => {
    loadTemplates();
    loadSentToday();
  }, [loadTemplates, loadSentToday]);

  const saveTemplate = useCallback(
    async (input: { id?: string; name: string; subject: string; body: string }) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Not signed in');

        const row = {
          user_id: user.id,
          name: input.name.trim(),
          subject: input.subject.trim(),
          body: input.body.trim(),
          updated_at: new Date().toISOString(),
        };

        const { data, error } = input.id
          ? await supabase
              .from('customer_campaign_templates')
              .update(row)
              .eq('id', input.id)
              .select('id')
              .single()
          : await supabase
              .from('customer_campaign_templates')
              .insert(row)
              .select('id')
              .single();

        if (error) throw error;
        await loadTemplates();
        return data?.id as string | undefined;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Could not save template';
        toast({ title: 'Save failed', description: msg, variant: 'destructive' });
        return undefined;
      }
    },
    [loadTemplates, toast]
  );

  const send = useCallback(
    async (input: {
      subject: string;
      body: string;
      customerIds: string[];
      templateId?: string;
      dailyCap?: number;
    }): Promise<CampaignResult | null> => {
      setIsSending(true);
      try {
        const { data, error } = await supabase.functions.invoke('send-customer-campaign', {
          body: input,
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        await loadSentToday();
        return data as CampaignResult;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Could not send';
        toast({ title: 'Send failed', description: msg, variant: 'destructive' });
        return null;
      } finally {
        setIsSending(false);
      }
    },
    [loadSentToday, toast]
  );

  return {
    templates,
    isLoading,
    isSending,
    sentTodayCount,
    saveTemplate,
    send,
    refresh: loadTemplates,
  };
}
