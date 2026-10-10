import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   Gap #9: review requests after payment. One read (get_review_requests) feeds
   the Clients hub figure and the settings sheet; one write
   (save_review_settings, owner or admin) and a wording preview
   (preview_review_request, the same functions the sender uses).
   The RPCs postdate the last types.ts regeneration, so they go through an
   untyped caller.
   ========================================================================== */

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string; code?: string } | null }>;

export type ReviewChannel = 'email' | 'sms';
export type ReviewStatus = 'queued' | 'sending' | 'sent' | 'skipped' | 'failed';
export type ReviewPlatform = 'google' | 'checkatrade' | 'trustatrader' | 'facebook';

export interface ReviewSettings {
  enabled: boolean;
  enabled_at: string | null;
  delay_days: number;
  cooldown_days: number;
  channel: ReviewChannel;
  wait_for_job_complete: boolean;
  google_url: string | null;
  checkatrade_url: string | null;
  trustatrader_url: string | null;
  facebook_url: string | null;
  message: string | null;
  changed_by_name: string | null;
  updated_at: string | null;
}

export interface ReviewRequestRow {
  id: string;
  invoice_id: string;
  job_id: string | null;
  customer_id: string | null;
  client_name: string | null;
  invoice_number: string | null;
  status: ReviewStatus;
  summary: string;
  channel: ReviewChannel | null;
  due_at: string;
  sent_at: string | null;
  click_count: number;
  clicks: Partial<Record<ReviewPlatform | 'any', number>>;
  first_clicked_at: string | null;
  opted_out_at: string | null;
  created_at: string;
}

export interface ReviewStats {
  asked_30: number;
  clicked_30: number;
  asked_all: number;
  clicked_all: number;
  waiting: number;
  skipped_30: number;
  failed_30: number;
}

export interface ReviewRequestsData {
  firm_id: string;
  firm_name: string;
  can_manage: boolean;
  saved: boolean;
  settings: ReviewSettings;
  default_message: string;
  suggested_links: Partial<Record<`${ReviewPlatform}_url`, string>>;
  texts_live: boolean;
  automations_paused: boolean;
  old_rule_on: boolean;
  receipt_asks: boolean;
  stats: ReviewStats;
  recent: ReviewRequestRow[];
}

export interface ReviewPreview {
  subject: string;
  greeting: string;
  paragraph: string;
  sms: string;
  sms_segments: number;
  problem: string | null;
}

export const REVIEW_REQUESTS_KEY = ['review-requests'] as const;

export const PLATFORM_LABEL: Record<ReviewPlatform, string> = {
  google: 'Google',
  checkatrade: 'Checkatrade',
  trustatrader: 'TrustATrader',
  facebook: 'Facebook',
};

export function useReviewRequests(enabled = true) {
  return useQuery({
    queryKey: REVIEW_REQUESTS_KEY,
    enabled,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await rpc('get_review_requests', { p_firm: null });
      if (error) throw new Error(error.message);
      return data as ReviewRequestsData;
    },
  });
}

export type ReviewSettingsPatch = Partial<
  Pick<
    ReviewSettings,
    | 'enabled'
    | 'delay_days'
    | 'cooldown_days'
    | 'channel'
    | 'wait_for_job_complete'
    | 'google_url'
    | 'checkatrade_url'
    | 'trustatrader_url'
    | 'facebook_url'
    | 'message'
  >
>;

export function useSaveReviewSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: ReviewSettingsPatch) => {
      const { data, error } = await rpc('save_review_settings', { p_firm: null, p_patch: patch });
      if (error) throw new Error(error.message);
      return data as ReviewRequestsData;
    },
    onSuccess: (data) => qc.setQueryData(REVIEW_REQUESTS_KEY, data),
  });
}

/** The wording exactly as the customer will see it. */
export function useReviewPreview(message: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ['review-request-preview', message ?? ''],
    enabled,
    staleTime: 5 * 60_000,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const { data, error } = await rpc('preview_review_request', {
        p_firm: null,
        p_message: message && message.trim() ? message : null,
      });
      if (error) throw new Error(error.message);
      return data as ReviewPreview;
    },
  });
}
