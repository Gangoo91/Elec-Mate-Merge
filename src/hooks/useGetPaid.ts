import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FINANCE_MODEL_KEY } from '@/hooks/useFinanceModel';

/* ==========================================================================
   ELE-2065 Get paid: "Who owes me", the chasing schedule, promise-to-pay
   notes and pauses. Every call is an owner/admin RPC (can_see_firm_money);
   an office manager gets a 42501 and the page says so.
   The RPCs postdate the last types.ts regeneration, so they go through an
   untyped caller.
   ========================================================================== */

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string; code?: string } | null }>;

export type DebtBucket = 'not_due' | 'd1_30' | 'd31_60' | 'd61_90' | 'd90_plus';
export type ChaseChannel = 'email' | 'sms';
export type ChaseTone = 'gentle' | 'firm' | 'final';

export interface ChaseStep {
  offset: number;
  channel: ChaseChannel;
  tone: ChaseTone;
  subject?: string | null;
  body?: string | null;
}

export interface QuoteFollowUpStep {
  day: number;
  subject?: string | null;
  body?: string | null;
}

export interface NextChase extends ChaseStep {
  date: string;
}

export interface Debtor {
  invoice_id: string;
  invoice_number: string | null;
  client: string;
  client_email: string | null;
  client_phone: string | null;
  customer_id: string | null;
  customer_key: string;
  company_name: string | null;
  job_id: string | null;
  amount: number;
  paid: number;
  balance: number;
  retention_held: number;
  retention_release_date: string | null;
  due_now: number;
  issued_on: string | null;
  due_on: string | null;
  days_overdue: number;
  bucket: DebtBucket;
  pay_url: string | null;
  paused: boolean;
  customer_paused: boolean;
  disputed: boolean;
  dispute_note: string | null;
  debtor_type: 'business' | 'consumer' | null;
  promise_date: string | null;
  interest_offered_at: string | null;
  last_chased_at: string | null;
  reminder_count: number;
  next_chase: NextChase | null;
  latest_note: {
    kind: string;
    body: string | null;
    promise_date: string | null;
    by: string | null;
    at: string;
  } | null;
  note_count: number;
}

export interface DebtorTotals {
  owed: number;
  count: number;
  not_due: number;
  d1_30: number;
  d31_60: number;
  d61_90: number;
  d90_plus: number;
  overdue: number;
  overdue_count: number;
  over_60: number;
  retention_held: number;
  disputed_count: number;
}

export interface FirmDebtors {
  firm_id: string;
  today: string;
  schedule_on: boolean;
  rows: Debtor[];
  totals: DebtorTotals;
}

export interface ChaseSettings {
  firm_id: string;
  invoice_enabled: boolean;
  invoice_enabled_at: string | null;
  invoice_steps: ChaseStep[];
  quote_enabled: boolean;
  quote_enabled_at: string | null;
  quote_steps: QuoteFollowUpStep[];
  changed_by_name: string | null;
  updated_at: string | null;
  old_rule_on: boolean;
  automations_paused: boolean;
}

export interface ChaseNote {
  id: string;
  kind: 'note' | 'promise' | 'dispute' | 'resolved' | 'chase' | 'interest';
  promise_date: string | null;
  body: string | null;
  created_by_name: string | null;
  created_at: string;
}

export const DEBTORS_KEY = ['firm-debtors'] as const;
const SETTINGS_KEY = ['firm-chase-settings'] as const;

const num = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export function useFirmDebtors(enabled = true) {
  return useQuery({
    queryKey: DEBTORS_KEY,
    enabled,
    staleTime: 30_000,
    retry: (n, err) => !String((err as Error)?.message ?? '').includes('Only the owner') && n < 2,
    queryFn: async (): Promise<FirmDebtors> => {
      const { data, error } = await rpc('get_firm_debtors');
      if (error) throw new Error(error.message);
      const d = data as FirmDebtors;
      return {
        ...d,
        rows: (d.rows ?? []).map((r) => ({
          ...r,
          amount: num(r.amount),
          paid: num(r.paid),
          balance: num(r.balance),
          retention_held: num(r.retention_held),
          due_now: num(r.due_now),
          days_overdue: num(r.days_overdue),
        })),
        totals: Object.fromEntries(
          Object.entries(d.totals ?? {}).map(([k, v]) => [k, num(v)])
        ) as unknown as DebtorTotals,
      };
    },
  });
}

export function useChaseSettings(enabled = true) {
  return useQuery({
    queryKey: SETTINGS_KEY,
    enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<ChaseSettings> => {
      const { data, error } = await rpc('get_firm_chase_settings');
      if (error) throw new Error(error.message);
      return data as ChaseSettings;
    },
  });
}

function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: DEBTORS_KEY });
    qc.invalidateQueries({ queryKey: ['invoice-chase-notes'] });
  };
}

export function useSaveChaseSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      p: Partial<
        Pick<ChaseSettings, 'invoice_enabled' | 'invoice_steps' | 'quote_enabled' | 'quote_steps'>
      >
    ) => {
      const { data, error } = await rpc('save_firm_chase_settings', { p });
      if (error) throw new Error(error.message);
      return data as ChaseSettings;
    },
    onSuccess: (data) => {
      qc.setQueryData(SETTINGS_KEY, data);
      qc.invalidateQueries({ queryKey: DEBTORS_KEY });
    },
    onError: (e: Error) => toast.error(e.message || 'Could not save the schedule'),
  });
}

export function useSetChaseState() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async ({
      invoiceId,
      patch,
    }: {
      invoiceId: string;
      patch: Record<string, unknown>;
    }) => {
      const { error } = await rpc('set_invoice_chase_state', {
        p_invoice: invoiceId,
        p_patch: patch,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message || 'Could not save that'),
  });
}

export function useAddChaseNote() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (p: {
      invoiceId: string;
      kind: 'note' | 'promise' | 'chase' | 'interest';
      body?: string;
      promiseDate?: string | null;
    }) => {
      const { error } = await rpc('add_invoice_chase_note', {
        p_invoice: p.invoiceId,
        p_kind: p.kind,
        p_body: p.body ?? null,
        p_promise_date: p.promiseDate ?? null,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message || 'Could not save the note'),
  });
}

export function useChaseNotes(invoiceId: string | null) {
  return useQuery({
    queryKey: ['invoice-chase-notes', invoiceId],
    enabled: !!invoiceId,
    queryFn: async (): Promise<{
      notes: ChaseNote[];
      runs: { status: string; summary: string; created_at: string }[];
    }> => {
      const { data, error } = await rpc('get_invoice_chase_notes', { p_invoice: invoiceId });
      if (error) throw new Error(error.message);
      return data as {
        notes: ChaseNote[];
        runs: { status: string; summary: string; created_at: string }[];
      };
    },
  });
}

export function useCustomerChasePause() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (p: { key: string; label: string; paused: boolean }) => {
      const { error } = await rpc('set_customer_chase_pause', {
        p_key: p.key,
        p_label: p.label,
        p_paused: p.paused,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message || 'Could not change that'),
  });
}

/**
 * One-tap chase: the existing send-payment-reminder (balance-aware, logs the
 * send, records last_reminder_sent_at so the schedule does not double up),
 * then a "chase" note on the invoice.
 */
export function useChaseNow() {
  const invalidate = useInvalidate();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: {
      invoiceId: string;
      tone: ChaseTone;
      customSubject?: string;
      customBody?: string;
      note: string;
      kind?: 'chase' | 'interest';
    }) => {
      const { data, error } = await supabase.functions.invoke('send-payment-reminder', {
        body: {
          invoiceId: p.invoiceId,
          reminderType: p.tone,
          ...(p.customBody ? { customSubject: p.customSubject, customBody: p.customBody } : {}),
        },
      });
      if (error) {
        const { readEdgeFunctionError } = await import('@/lib/edgeFunctionError');
        const parsed = await readEdgeFunctionError<{ error?: string }>(error);
        throw new Error(parsed?.error || 'The reminder did not send. Try again.');
      }
      if ((data as { error?: string } | null)?.error)
        throw new Error((data as { error: string }).error);
      await rpc('add_invoice_chase_note', {
        p_invoice: p.invoiceId,
        p_kind: p.kind ?? 'chase',
        p_body: p.note,
        p_promise_date: null,
      });
    },
    onSuccess: () => {
      invalidate();
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: FINANCE_MODEL_KEY });
    },
  });
}

/* ── Display helpers ─────────────────────────────────────────────────── */

export const BUCKET_LABEL: Record<DebtBucket, string> = {
  not_due: 'Not due yet',
  d1_30: '1 to 30 days late',
  d31_60: '31 to 60 days late',
  d61_90: '61 to 90 days late',
  d90_plus: 'Over 90 days late',
};

export const TONE_LABEL: Record<ChaseTone, string> = {
  gentle: 'Polite',
  firm: 'Firm',
  final: 'Final',
};

export function stepDayLabel(offset: number) {
  if (offset === 0) return 'On the due date';
  if (offset < 0) return `${-offset} day${offset === -1 ? '' : 's'} before it is due`;
  return `${offset} day${offset === 1 ? '' : 's'} after it is due`;
}

export function gbp(n: number, pence = false) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: pence ? 2 : 0,
    maximumFractionDigits: pence ? 2 : 0,
  }).format(n || 0);
}

export function shortDate(iso: string | null | undefined) {
  if (!iso) return '';
  const d = new Date(iso.length <= 10 ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Fill the owner's wording for a text message hand-off. */
export function fillChaseText(
  text: string,
  d: Pick<Debtor, 'client' | 'invoice_number' | 'due_now' | 'due_on' | 'days_overdue' | 'pay_url'>,
  company: string
) {
  return text
    .replace(/\{customer\}/g, d.client || 'there')
    .replace(/\{invoice\}/g, d.invoice_number || '')
    .replace(/\{amount\}/g, gbp(d.due_now, true))
    .replace(
      /\{due_date\}/g,
      d.due_on
        ? new Date(`${d.due_on}T12:00:00`).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
          })
        : 'the due date'
    )
    .replace(/\{days_overdue\}/g, String(Math.max(0, d.days_overdue)))
    .replace(/\{company\}/g, company || 'us')
    .replace(/\{pay_link\}/g, d.pay_url || '')
    .replace(
      /\{pay_line\}/g,
      d.pay_url ? `You can pay by card here: ${d.pay_url}` : 'Our bank details are on the invoice.'
    );
}

export const DEFAULT_TEXT_WORDING =
  'Hi {customer}, a quick reminder from {company} that invoice {invoice} for {amount} is now {days_overdue} days overdue. {pay_line} Thank you.';
