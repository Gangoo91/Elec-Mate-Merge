/**
 * "Job done" on site (ELE-2068).
 *
 * The phone side reads one context (get_job_done_context: can this person
 * finish the job, completion checks still open, the job's certificates, the
 * firm's sell prices for extras, VAT) and keeps a copy for no signal. Doing it
 * is ONE outbox op ('job_done'), so the whole flow can be done in a basement
 * and lands exactly once when the signal is back.
 *
 * The office side reads today's finished jobs for the Overview, and the firm's
 * "who can finish jobs" setting.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { OFFLINE_FIRST, offlineSnapshot } from '@/lib/workerOfflineCache';
import {
  clipWords,
  submitWorkerAction,
  type OutboxPhoto,
  type SubmitResult,
} from '@/lib/workerOutbox';

const rpc = (name: string, args: Record<string, unknown>) =>
  supabase.rpc(name as never, args as never);

export interface JobDonePriceItem {
  item_id: string;
  name: string;
  unit: string;
  category: string | null;
  price: number;
}

export interface JobDoneCertificate {
  report_uuid: string;
  report_type: string;
  certificate_number: string | null;
  status: string | null;
  mine: boolean;
  qs_status: string | null;
}

export interface JobDoneContext {
  allowed: boolean;
  reason: string | null;
  role?: string;
  job?: {
    id: string;
    title: string;
    client: string | null;
    status: string | null;
    has_client_email: boolean;
  };
  closed?: boolean;
  last_completion?: { completed_at: string; by: string | null } | null;
  completion_outstanding?: string[];
  vat_registered?: boolean;
  /**
   * The VAT the extras will be invoiced at, worked out the way the invoice will
   * be (the job's invoice, else the accepted quote the draft copies, else the
   * profile). The customer signs this figure. 0 under the reverse charge.
   */
  vat_basis?: {
    rate: number;
    reverse_charge: boolean;
    source: 'draft_invoice' | 'invoice' | 'accepted_quote' | 'job_value' | 'firm';
  };
  draft_invoice_on?: boolean;
  review_request_on?: boolean;
  /** Gap #3: the firm's "tell the customer" setting, as it applies to this job. */
  customer_message?: {
    mode: CustomerMessageMode;
    photos: boolean;
    invoice: CustomerMessageInvoice;
    has_email: boolean;
    imported: boolean;
    already: boolean;
  };
  certificates?: JobDoneCertificate[];
  price_list?: JobDonePriceItem[];
}

export type CustomerMessageMode = 'off' | 'office_checks' | 'auto';
export type CustomerMessageInvoice = 'none' | 'invoice' | 'pay_link';

/** Whether this job's Job done will write to the customer at all. */
export const customerMessageApplies = (ctx: JobDoneContext | null | undefined) =>
  !!ctx?.customer_message &&
  ctx.customer_message.mode !== 'off' &&
  ctx.customer_message.has_email &&
  !ctx.customer_message.imported &&
  !ctx.customer_message.already;

export function useJobDoneContext(jobId: string | null | undefined) {
  return useQuery<JobDoneContext>({
    queryKey: ['job-done-context', jobId],
    enabled: !!jobId,
    staleTime: 30 * 1000,
    retry: 1,
    ...OFFLINE_FIRST,
    queryFn: () =>
      offlineSnapshot(`job-done-context:${jobId}`, async () => {
        const { data, error } = await rpc('get_job_done_context', { p_job: jobId });
        if (error) throw error;
        const d = (data ?? { allowed: false, reason: null }) as JobDoneContext;
        return {
          ...d,
          completion_outstanding: d.completion_outstanding ?? [],
          certificates: d.certificates ?? [],
          price_list: (d.price_list ?? []).map((p) => ({ ...p, price: Number(p.price) })),
        };
      }),
  });
}

export interface JobDoneExtra {
  key: string;
  item_id?: string | null;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
}

export type CertificateChoice = 'linked' | 'started' | 'not_needed' | 'later';

export interface JobDoneInput {
  jobId: string;
  jobTitle: string;
  note: string;
  photos: OutboxPhoto[];
  certificate: CertificateChoice;
  customer: { name: string; signature: string | null; absentReason: string | null };
  extras: JobDoneExtra[];
  /** Gap #3: what goes to the customer, when the firm has it on. */
  customerMessage?: { send: boolean; summary: string; photoIndexes: number[] } | null;
}

/** Money as the phone shows it: £1,234.50. */
export const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const extrasTotal = (extras: JobDoneExtra[]) =>
  extras.reduce((s, x) => s + Math.round(x.quantity * x.unit_price * 100) / 100, 0);

export function useSubmitJobDone() {
  const qc = useQueryClient();
  return useMutation({
    // The outbox is the queue: never paused by React Query when offline.
    networkMode: 'always',
    mutationFn: async (i: JobDoneInput): Promise<SubmitResult> => {
      const { result } = await submitWorkerAction(
        {
          kind: 'job_done',
          label: `Job done · ${clipWords(i.jobTitle, 48)}`,
          detail: i.customer.signature
            ? `Signed by ${i.customer.name}`
            : 'Not signed by the customer',
          jobId: i.jobId,
          photos: i.photos,
          payload: {
            jobId: i.jobId,
            payload: {
              note: i.note.trim() || null,
              photos: [],
              certificate: { status: i.certificate },
              customer: {
                name: i.customer.name.trim() || null,
                signature: i.customer.signature,
                absent_reason: i.customer.signature
                  ? null
                  : i.customer.absentReason?.trim() || null,
              },
              extras: i.extras.map((x) => ({
                item_id: x.item_id ?? null,
                description: x.description.trim(),
                quantity: x.quantity,
                unit: x.unit,
                unit_price: x.unit_price,
              })),
              ...(i.customerMessage
                ? {
                    customer_message: {
                      send: i.customerMessage.send,
                      summary: i.customerMessage.summary.trim() || null,
                      photo_indexes: i.customerMessage.photoIndexes,
                    },
                  }
                : {}),
            },
          },
        },
        12_000
      );
      return result;
    },
    onSuccess: (_r, v) => {
      qc.invalidateQueries({ queryKey: ['job-done-context', v.jobId] });
      qc.invalidateQueries({ queryKey: ['my-job-detail', v.jobId] });
      qc.invalidateQueries({ queryKey: ['my-jobs'] });
    },
  });
}

/* ── Office ───────────────────────────────────────────────────────────── */

export interface JobsDoneToday {
  finished_today: number;
  /** Null when the viewer can't see the firm's money. */
  invoices_ready: number | null;
  to_invoice?: number | null;
  jobs: {
    job_id: string;
    title: string;
    by: string | null;
    completed_at: string;
    signed: boolean;
    invoice_state: string | null;
    invoice_id: string | null;
    invoice_number: string | null;
    invoice_status: string | null;
  }[];
}

export function useFirmJobsDoneToday(firmId: string | null | undefined) {
  return useQuery<JobsDoneToday>({
    queryKey: ['jobs-done-today', firmId],
    enabled: !!firmId,
    staleTime: 60 * 1000,
    queryFn: async () => {
      const { data, error } = await rpc('get_firm_jobs_done_today', { p_firm: firmId });
      if (error) throw error;
      const d = (data ?? {}) as Partial<JobsDoneToday>;
      return {
        finished_today: Number(d.finished_today ?? 0),
        invoices_ready: d.invoices_ready == null ? null : Number(d.invoices_ready),
        to_invoice: d.to_invoice == null ? null : Number(d.to_invoice),
        jobs: d.jobs ?? [],
      };
    },
  });
}

export type WhoCanFinish = 'crew' | 'supervisors' | 'office_only';

export interface JobDoneSettings {
  who_can_finish: WhoCanFinish;
  updated_by_name: string | null;
  updated_at: string | null;
  can_change: boolean;
  draft_invoice_on: boolean;
  review_request_on: boolean;
  customer_message: CustomerMessageMode;
  customer_message_invoice: CustomerMessageInvoice;
  customer_message_photos: boolean;
  company_name: string | null;
  pay_links_on: boolean;
}

export function useJobDoneSettings(firmId: string | null | undefined) {
  const qc = useQueryClient();
  const query = useQuery<JobDoneSettings | null>({
    queryKey: ['job-done-settings', firmId],
    enabled: !!firmId,
    queryFn: async () => {
      const { data, error } = await rpc('get_job_done_settings', { p_firm: firmId });
      if (error) throw error;
      return (data ?? null) as JobDoneSettings | null;
    },
  });
  const save = useMutation({
    mutationFn: async (who: WhoCanFinish) => {
      const { data, error } = await rpc('set_job_done_settings', { p_firm: firmId, p_who: who });
      if (error) throw error;
      return data as unknown as JobDoneSettings;
    },
    onSuccess: (d) => qc.setQueryData(['job-done-settings', firmId], d),
  });
  const saveMessage = useMutation({
    mutationFn: async (v: {
      mode: CustomerMessageMode;
      invoice?: CustomerMessageInvoice;
      photos?: boolean;
    }) => {
      const { data, error } = await rpc('set_job_done_customer_message', {
        p_firm: firmId,
        p_mode: v.mode,
        p_invoice: v.invoice ?? null,
        p_photos: v.photos ?? null,
      });
      if (error) throw error;
      return data as unknown as JobDoneSettings;
    },
    onSuccess: (d) => qc.setQueryData(['job-done-settings', firmId], d),
  });
  return { ...query, save, saveMessage };
}

/* ── Office: "Done on site" on the job (gap #3) ───────────────────────── */

export type JobDoneMessageStatus =
  | 'waiting_certificate'
  | 'to_check'
  | 'queued'
  | 'sending'
  | 'sent'
  | 'skipped'
  | 'cancelled'
  | 'failed';

export interface JobDoneSummary {
  can_see_money: boolean;
  company_name: string;
  job: {
    id: string;
    title: string;
    client: string | null;
    client_email: string | null;
    email_ok: boolean;
    imported: boolean;
  };
  completion: {
    id: string;
    by: string | null;
    completed_at: string;
    received_at: string;
    note: string | null;
    photos: string[];
    certificate_status: CertificateChoice;
    customer_name: string | null;
    signed: boolean;
    signature: string | null;
    signed_at: string | null;
    absent_reason: string | null;
    extras: {
      description: string;
      quantity: number;
      unit?: string;
      unit_price?: number;
      total?: number;
    }[];
    extras_net: number | null;
    variation_order_id: string | null;
    invoice_state: string | null;
    invoice_id: string | null;
    invoice_number: string | null;
    invoice_status: string | null;
  };
  certificates: {
    waiting: boolean;
    held_until_paid: boolean;
    qs_required?: boolean;
    choice: CertificateChoice | null;
    certificates: {
      report_uuid: string;
      type: string;
      number: string | null;
      issued: boolean;
      qs: string | null;
      pdf_url: string | null;
    }[];
  };
  invoice: {
    exists: boolean;
    sent: boolean;
    number?: string | null;
    status?: string;
    paid?: boolean;
    total?: number;
    balance?: number;
    has_pdf?: boolean;
    has_pay_link?: boolean;
  };
  settings: { mode: CustomerMessageMode; invoice: CustomerMessageInvoice; photos: boolean };
  message: {
    id: string;
    mode: 'office_checks' | 'auto';
    status: JobDoneMessageStatus;
    reason: string | null;
    to_name: string | null;
    summary: string | null;
    photos: string[];
    include_invoice: CustomerMessageInvoice;
    created_at: string;
    decided_by_name: string | null;
    decided_at: string | null;
    sent_to: string | null;
    sent_at: string | null;
    can_send: boolean;
    can_cancel: boolean;
  } | null;
}

export function useJobDoneSummary(jobId: string | null | undefined) {
  return useQuery<JobDoneSummary | null>({
    queryKey: ['job-done-summary', jobId],
    enabled: !!jobId,
    staleTime: 30 * 1000,
    queryFn: async () => {
      const { data, error } = await rpc('get_job_done_summary', { p_job: jobId });
      if (error) throw error;
      return (data ?? null) as JobDoneSummary | null;
    },
  });
}

/**
 * Ask the sender to send a queued message now (it only ever sends a message
 * that is queued, once). Fire and forget: if it is not reachable, the 5-minute
 * dispatcher sends it.
 */
export async function pokeJobDoneMessage(messageId: string): Promise<boolean> {
  try {
    const { error } = await supabase.functions.invoke('job-done-customer-message', {
      body: { message_id: messageId },
    });
    return !error;
  } catch {
    return false;
  }
}

export function useDecideJobDoneMessage(jobId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: {
      messageId: string;
      action: 'send' | 'save' | 'cancel';
      summary?: string | null;
      photos?: string[] | null;
      includeInvoice?: CustomerMessageInvoice | null;
    }) => {
      const { data, error } = await rpc('job_done_message_decide', {
        p_msg: v.messageId,
        p_action: v.action,
        p_summary: v.summary ?? null,
        p_photos: v.photos ?? null,
        p_include_invoice: v.includeInvoice ?? null,
      });
      if (error) throw error;
      if (v.action === 'send') await pokeJobDoneMessage(v.messageId);
      return data as unknown as JobDoneSummary;
    },
    onSuccess: (d) => {
      qc.setQueryData(['job-done-summary', jobId], d);
      // The sender may have finished by now: read it again shortly.
      window.setTimeout(
        () => qc.invalidateQueries({ queryKey: ['job-done-summary', jobId] }),
        4000
      );
    },
  });
}
