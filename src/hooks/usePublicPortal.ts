import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   usePublicPortal: the CUSTOMER side of the client portal (ELE-1996/1837).
   Signed out, token in the URL. One read (client_portal_get) returns only
   this customer's public fields; the token is checked, rate limited and can
   be paused, expired or switched off by the firm.
   ========================================================================== */

export type PortalError = 'not_found' | 'paused' | 'expired' | 'rate_limited';

export interface PortalFirm {
  name: string;
  logo_url: string | null;
  primary_color: string | null;
  accent_color: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  registration_scheme: string | null;
}

export interface PortalCrew {
  count: number;
  named: string[];
  today: string[];
  today_count: number;
  next_date: string | null;
  next_time: string | null;
}

export type JobStage = 'arranging' | 'booked' | 'in_progress' | 'on_hold' | 'complete';

export interface PortalJob {
  id: string;
  title: string;
  address: string | null;
  start_date: string | null;
  end_date: string | null;
  completed_at: string | null;
  stage: JobStage;
  crew: PortalCrew | null;
}

export interface PortalCertificate {
  id: string;
  report_type: string;
  certificate_number: string | null;
  inspection_date: string | null;
  next_inspection_due: string | null;
  address: string | null;
  state: 'ready' | 'finalising' | 'ask';
  pdf_url: string | null;
}

export interface PortalQuote {
  id: string;
  number: string | null;
  title: string | null;
  total: number;
  sent_at: string | null;
  expires_at: string | null;
  is_estimate: boolean;
  url: string;
}

export interface PortalInvoice {
  id: string;
  number: string | null;
  title: string | null;
  total: number;
  paid_so_far: number;
  issued_at: string | null;
  due_date: string | null;
  state: 'paid' | 'overdue' | 'part_paid' | 'due';
  pay_url: string | null;
  pdf_url: string | null;
}

export interface PortalSignature {
  id: string;
  type: string;
  title: string;
  expires_at: string | null;
  url: string;
}

export interface PortalMessage {
  id: string;
  message: string;
  from: 'you' | 'firm';
  created_at: string;
}

export interface PortalReview {
  job_id: string;
  job_title: string;
  completed_at: string | null;
  names: string[];
  links: { label: string; url: string }[];
  message: string | null;
}

export interface ClientPortal {
  firm: PortalFirm;
  customer: { name: string; company_name: string | null };
  today: string;
  jobs: PortalJob[];
  certificates: PortalCertificate[];
  quotes: PortalQuote[];
  invoices: PortalInvoice[];
  signatures: PortalSignature[];
  bank_details: string | null;
  messages: PortalMessage[];
  review: PortalReview | null;
  expires_at: string | null;
}

type PortalResult = { error: PortalError } | ClientPortal;

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export function useClientPortalPage(token: string | undefined) {
  return useQuery({
    queryKey: ['client-portal-page', token],
    enabled: !!token,
    retry: false,
    // Each load counts as one "open" for the firm, so no background refetch.
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async (): Promise<PortalResult> => {
      const { data, error } = await rpc('client_portal_get', { p_token: token });
      if (error) throw new Error(error.message);
      return (data as PortalResult) ?? { error: 'not_found' };
    },
  });
}

/** The thread, refreshed every 20s while the page is open (does not count as a view). */
export function usePortalThread(token: string | undefined, initial: PortalMessage[] | undefined) {
  return useQuery({
    queryKey: ['client-portal-thread', token],
    enabled: !!token && !!initial,
    initialData: initial,
    refetchInterval: 20_000,
    refetchIntervalInBackground: false,
    queryFn: async (): Promise<PortalMessage[]> => {
      const { data, error } = await rpc('client_portal_messages', { p_token: token });
      if (error) throw new Error(error.message);
      const d = data as { messages?: PortalMessage[]; error?: string };
      if (d?.error) throw new Error(d.error);
      return d?.messages ?? [];
    },
  });
}

export function useSendPortalMessage(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (message: string) => {
      const { data, error } = await rpc('client_portal_send_message', {
        p_token: token,
        p_message: message,
      });
      if (error) throw new Error(error.message);
      const d = data as { error?: string };
      if (d?.error) {
        throw new Error(
          d.error === 'rate_limited'
            ? 'You have sent a lot of messages in a short time. Please wait a few minutes.'
            : d.error === 'too_long'
              ? 'That message is too long. Please keep it under 2,000 characters.'
              : 'This link is no longer working, so the message could not be sent.'
        );
      }
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['client-portal-thread', token] }),
  });
}

export function useReviewOptOut(token: string | undefined) {
  return useMutation({
    mutationFn: async () => {
      const { error } = await rpc('client_portal_review_opt_out', { p_token: token });
      if (error) throw new Error(error.message);
    },
  });
}
