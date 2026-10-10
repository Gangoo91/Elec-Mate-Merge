/**
 * Customer inbox (ELE-2070): texts, WhatsApp and email with customers,
 * merged with the client portal messages, per client and per job.
 *
 * Every rule (who can see, who can send, consent, STOP, the monthly
 * allowance, the WhatsApp 24-hour window) lives in the database functions;
 * this file only calls them. A message is queued by queue_customer_message.
 * In sandbox mode (every firm until Elec-Mate switches a provider on) it is
 * stored and never sent. Once live, the queued row is handed to the
 * customer-message-send edge function.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';

export type InboxChannel = 'portal' | 'sms' | 'whatsapp' | 'email';
export type SendChannel = Exclude<InboxChannel, 'portal'>;
export type TemplateKey =
  'booking_confirmation' | 'on_my_way' | 'running_late' | 'invoice' | 'review_request';

export const TEMPLATE_LABEL: Record<TemplateKey, string> = {
  booking_confirmation: 'Booking confirmation',
  on_my_way: 'On my way',
  running_late: 'Running late',
  invoice: 'Invoice',
  review_request: 'Review request',
};

export const CHANNEL_LABEL: Record<InboxChannel, string> = {
  portal: 'Portal',
  sms: 'Text',
  whatsapp: 'WhatsApp',
  email: 'Email',
};

export interface FirmMessaging {
  firm_id: string;
  provider: 'sandbox' | 'twilio' | 'meta' | 'bird' | 'vonage';
  live: boolean;
  sms_enabled: boolean;
  whatsapp_enabled: boolean;
  email_enabled: boolean;
  sms_number: string | null;
  whatsapp_number: string | null;
  sender_name: string | null;
  monthly_allowance: number;
  used_this_month: number;
  sent_this_month: number;
  received_this_month: number;
  crew_can_see_job_messages: boolean;
  can_manage: boolean;
  opt_outs: number;
  templates: { key: TemplateKey; body: string; custom: boolean; marketing: boolean }[];
}

export interface InboxThread {
  customer_id: string | null;
  address: string | null;
  customer_name: string;
  last_message: string;
  last_channel: InboxChannel;
  last_direction: 'in' | 'out';
  last_at: string;
  unread: number;
  channels: InboxChannel[];
}

export interface ConversationMessage {
  id: string;
  source: InboxChannel;
  direction: 'in' | 'out';
  body: string;
  at: string;
  status: string;
  template_key: TemplateKey | null;
  job_id: string | null;
  job_title: string | null;
  read_at: string | null;
  sender_name: string | null;
}

export interface Conversation {
  firm_id: string;
  customer_id: string | null;
  customer_name: string | null;
  job_id: string | null;
  can_send: boolean;
  provider: FirmMessaging['provider'];
  live: boolean;
  channels: Record<InboxChannel, boolean>;
  phone: string | null;
  email: string | null;
  whatsapp_window_open: boolean;
  opted_out: SendChannel[];
  messages: ConversationMessage[];
}

// The functions are newer than the generated types.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

async function call<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

const KEYS = {
  settings: (firm?: string | null) => ['firm-messaging', firm] as const,
  inbox: (firm?: string | null) => ['firm-customer-inbox', firm] as const,
  conversation: (customer?: string | null, job?: string | null) =>
    ['customer-conversation', customer ?? null, job ?? null] as const,
};

export function useFirmMessaging() {
  const { data: firm } = useOfficeFirmId();
  return useQuery({
    queryKey: KEYS.settings(firm),
    enabled: !!firm,
    staleTime: 60_000,
    queryFn: () => call<FirmMessaging>('get_firm_messaging', { p_firm: firm }),
  });
}

export function useSaveMessagingSettings() {
  const qc = useQueryClient();
  const { data: firm } = useOfficeFirmId();
  return useMutation({
    mutationFn: (
      patch: Partial<
        Pick<
          FirmMessaging,
          | 'sms_enabled'
          | 'whatsapp_enabled'
          | 'email_enabled'
          | 'crew_can_see_job_messages'
          | 'sender_name'
        >
      >
    ) => call<FirmMessaging>('save_firm_messaging_settings', { p_firm: firm, p_patch: patch }),
    onSuccess: (data) => qc.setQueryData(KEYS.settings(firm), data),
  });
}

export function useSaveMessageTemplate() {
  const qc = useQueryClient();
  const { data: firm } = useOfficeFirmId();
  return useMutation({
    mutationFn: ({ key, body }: { key: TemplateKey; body: string }) =>
      call<void>('save_firm_message_template', { p_firm: firm, p_key: key, p_body: body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.settings(firm) }),
  });
}

export function useFirmCustomerInbox(enabled = true) {
  const { data: firm } = useOfficeFirmId();
  return useQuery({
    queryKey: KEYS.inbox(firm),
    enabled: enabled && !!firm,
    refetchInterval: 60_000,
    queryFn: () => call<InboxThread[]>('get_firm_customer_inbox', { p_firm: firm, p_limit: 150 }),
  });
}

export function useCustomerConversation(customerId?: string | null, jobId?: string | null) {
  return useQuery({
    queryKey: KEYS.conversation(customerId, jobId),
    enabled: !!customerId || !!jobId,
    refetchInterval: 30_000,
    retry: false,
    queryFn: () =>
      call<Conversation>('get_customer_conversation', {
        p_customer_id: customerId ?? null,
        p_job_id: jobId ?? null,
      }),
  });
}

function useInvalidateConversation() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ['customer-conversation'] });
    qc.invalidateQueries({ queryKey: ['firm-customer-inbox'] });
    qc.invalidateQueries({ queryKey: ['firm-messaging'] });
    // The portal's own caches (Overview, Client portal page).
    qc.invalidateQueries({ queryKey: ['client-message-inbox'] });
    qc.invalidateQueries({ queryKey: ['customer-messages'] });
  };
}

export function useMarkConversationRead() {
  const done = useInvalidateConversation();
  return useMutation({
    mutationFn: (customerId: string) =>
      call<number>('mark_customer_conversation_read', { p_customer_id: customerId }),
    onSuccess: (n) => {
      if (n > 0) done();
    },
  });
}

export function usePreviewMessage() {
  return useMutation({
    mutationFn: (v: { customerId: string; key: TemplateKey; jobId?: string | null }) =>
      call<string>('preview_customer_message', {
        p_customer_id: v.customerId,
        p_template_key: v.key,
        p_job_id: v.jobId ?? null,
      }),
  });
}

export interface SendResult {
  status: 'sandbox' | 'queued' | 'sent' | 'failed';
  sandbox: boolean;
}

/**
 * Send on one channel. Portal replies use the existing portal function;
 * text, WhatsApp and email are queued, then dispatched when the firm is live.
 */
export function useSendCustomerMessage() {
  const done = useInvalidateConversation();
  return useMutation({
    mutationFn: async (v: {
      customerId: string;
      channel: InboxChannel;
      body: string;
      jobId?: string | null;
      templateKey?: TemplateKey | null;
    }): Promise<SendResult> => {
      if (v.channel === 'portal') {
        await call('reply_customer_message', { p_customer_id: v.customerId, p_message: v.body });
        return { status: 'sent', sandbox: false };
      }
      const queued = await call<{ id: string; status: 'sandbox' | 'queued'; dispatch: boolean }>(
        'queue_customer_message',
        {
          p_customer_id: v.customerId,
          p_channel: v.channel,
          p_body: v.body,
          p_job_id: v.jobId ?? null,
          p_template_key: v.templateKey ?? null,
        }
      );
      if (!queued.dispatch) return { status: queued.status, sandbox: queued.status === 'sandbox' };
      const { data, error } = await supabase.functions.invoke('customer-message-send', {
        body: { messageId: queued.id },
      });
      if (error) return { status: 'queued', sandbox: false };
      const status = (data as { status?: SendResult['status'] })?.status ?? 'queued';
      if (status === 'failed') {
        throw new Error((data as { error?: string })?.error || 'The message did not send');
      }
      return { status, sandbox: false };
    },
    onSettled: () => done(),
  });
}

export function useSetMessageOptOut() {
  const done = useInvalidateConversation();
  return useMutation({
    mutationFn: (v: { customerId: string; channel: SendChannel; optedOut: boolean }) =>
      call<void>('set_customer_message_opt_out', {
        p_customer_id: v.customerId,
        p_channel: v.channel,
        p_opted_out: v.optedOut,
      }),
    onSuccess: () => done(),
  });
}

/** Sandbox only: play the customer's reply, to see the inbox and the bell work. */
export function useSimulateCustomerReply() {
  const done = useInvalidateConversation();
  return useMutation({
    mutationFn: (v: { customerId: string; channel: SendChannel; body: string }) =>
      call('sandbox_simulate_customer_reply', {
        p_customer_id: v.customerId,
        p_channel: v.channel,
        p_body: v.body,
      }),
    onSuccess: () => done(),
  });
}

/** SMS segments, the same rule as the database (GSM-7 160/153, else 70/67). */
export function smsSegments(body: string): number {
  const n = [...body].length;
  if (n === 0) return 0;
  const ext = (body.match(/[[\]{}~|€^\\]/g) ?? []).length;
  const gsm =
    /^[A-Za-z0-9 @£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,./:;<=>?¡ÄÖÑÜ§¿äöñüà\n\r\-[\]{}~|€^\\]*$/.test(
      body
    );
  if (gsm) {
    const len = n + ext;
    return len <= 160 ? 1 : Math.ceil(len / 153);
  }
  return n <= 70 ? 1 : Math.ceil(n / 67);
}
