/**
 * Customer messages from the firm's jobs (ELE-1822). The office tells the
 * customer about the booking (the Electrical Hub's TellCustomerSheet), the
 * sparky says "On my way" from site, and a review ask goes out at the end.
 * Hand-offs open the sender's own WhatsApp or Messages; every one is logged on
 * the job (`customer_contact`) so the office can see it happened.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { normaliseUkPhone } from '@/components/electrician/booking/bookingMessage';
import { greetingName } from '@/components/calendar/confirmationMessage';

export type ContactKind = 'confirmation' | 'on_my_way' | 'reminder' | 'review' | 'message';

export interface FirmJobMessage {
  job_id: string;
  firm_id: string;
  title: string;
  client: string | null;
  client_email: string | null;
  client_phone: string | null;
  customer_id: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  board_stage: string | null;
  status: string | null;
  business_name: string | null;
  crew: string[];
  event: {
    id: string;
    start_at: string;
    end_at: string;
    all_day: boolean;
    confirmation_sent_at: string | null;
    confirmation_sent_to: string | null;
    reminder_opt_in: boolean | null;
    reminder_sent_at: string | null;
  } | null;
  review: { enabled: boolean; links: { url: string; label?: string }[]; message: string | null };
  log: { at: string; who: string | null; text: string }[];
}

export interface ContactLogRow {
  at: string;
  who: string | null;
  text: string;
  job_id: string;
  job: string;
}

const rpc = (name: string, args: Record<string, unknown>) =>
  // Cast: these RPCs postdate the last types.ts regeneration.
  supabase.rpc(name as never, args as never);

export function useFirmJobMessage(jobId?: string | null) {
  return useQuery({
    queryKey: ['firm-job-message', jobId],
    enabled: !!jobId,
    queryFn: async (): Promise<FirmJobMessage> => {
      const { data, error } = await rpc('get_firm_job_message', { p_job: jobId });
      if (error) throw error;
      return data as unknown as FirmJobMessage;
    },
  });
}

export function useLogCustomerContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { jobId: string; kind: ContactKind; channel?: string | null; text?: string | null }) => {
      const { error } = await rpc('log_customer_contact', {
        p_job: v.jobId,
        p_kind: v.kind,
        p_channel: v.channel ?? null,
        p_text: v.text ?? null,
      });
      if (error) throw error;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['firm-job-message', v.jobId] });
      qc.invalidateQueries({ queryKey: ['customer-contact-log'] });
      qc.invalidateQueries({ queryKey: ['job-comments', v.jobId] });
    },
  });
}

export function useCustomerContactLog(customerId?: string | null, firmId?: string | null) {
  return useQuery({
    queryKey: ['customer-contact-log', customerId, firmId],
    enabled: !!customerId && !!firmId,
    queryFn: async (): Promise<ContactLogRow[]> => {
      const { data, error } = await rpc('get_customer_contact_log', { p_customer: customerId, p_firm: firmId });
      if (error) throw error;
      return (data as unknown as ContactLogRow[]) ?? [];
    },
  });
}

/** "Dan and Priya" */
export function namesList(names: string[]): string {
  const n = names.filter(Boolean);
  if (n.length <= 1) return n[0] ?? '';
  return `${n.slice(0, -1).join(', ')} and ${n[n.length - 1]}`;
}

/** The review ask, in the firm's own words when it has set them (Settings › Reviews). */
export function reviewMessage(m: Pick<FirmJobMessage, 'client' | 'business_name' | 'review'>): string {
  const who = greetingName(m.client);
  const hello = who ? `Hi ${who},` : 'Hi,';
  const body =
    m.review.message?.trim() ||
    `Thanks for choosing ${m.business_name || 'us'}. It was a pleasure doing the work. We would be grateful for an honest review: it helps a small business like ours, and only takes a minute.`;
  const links = (m.review.links ?? [])
    .map((l) => (l.url || '').trim().split(/\s+/)[0])
    .filter((u) => /^https?:\/\//i.test(u));
  return [hello, '', body, ...(links.length ? ['', ...links] : [])].join('\n');
}

export function waLink(phone: string, text: string) {
  const to = normaliseUkPhone(phone);
  return to ? `https://wa.me/${to}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function smsLink(phone: string, text: string) {
  return `sms:${phone.replace(/[^\d+]/g, '')}?&body=${encodeURIComponent(text)}`;
}
