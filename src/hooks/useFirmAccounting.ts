/**
 * The firm's accounting connection, invoice sync and payroll runs (ELE-1825).
 *
 * The firm's connection is the OWNER's existing Electrical Hub connection
 * (Xero / QuickBooks / Sage). Reads go through SECURITY DEFINER functions that
 * gate money on can_see_firm_money, so office managers get counts and hours
 * but never a £ figure, an expense line or an invoice list.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { openExternalUrl } from '@/utils/open-external-url';
import type { PayrollFileKind, PayrollRun } from '@/services/payrollRun';

export type AccountingProviderId = 'xero' | 'quickbooks' | 'sage' | 'freshbooks';

export const PROVIDER_NAME: Record<AccountingProviderId, string> = {
  xero: 'Xero',
  quickbooks: 'QuickBooks',
  sage: 'Sage',
  freshbooks: 'FreshBooks',
};

export type ConnectionState = 'connected' | 'stale' | 'expired' | 'missing' | 'error';

export interface FirmConnection {
  provider: AccountingProviderId;
  tenant_name: string | null;
  connected_at: string | null;
  last_sync_at: string | null;
  auto_sync: boolean;
  token_refreshed_at: string | null;
  state: ConnectionState;
}

export interface FirmAccounting {
  firm_name: string | null;
  role: string | null;
  is_owner: boolean;
  can_manage: boolean;
  money_visible: boolean;
  connections: FirmConnection[];
  invoices: { synced: number; failed: number; waiting: number };
  last_error: { invoice_id: string; invoice_number: string | null; error: string; at: string } | null;
  last_payroll: {
    id: string;
    period_start: string;
    period_end: string;
    exported_at: string;
    kind: string;
    by_name: string;
  } | null;
}

export interface InvoiceSyncRow {
  id: string;
  invoice_number: string | null;
  client: string;
  amount: number;
  issued_on: string | null;
  money_state: string;
  provider: AccountingProviderId | null;
  external_url: string | null;
  synced_at: string | null;
  sync_error: string | null;
  failed_at: string | null;
  sync_state: 'synced' | 'failed' | 'waiting' | 'before';
}

const rpc = async <T>(fn: string, args: Record<string, unknown>): Promise<T> => {
  // Cast: these RPCs postdate the last types.ts regeneration.
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) throw error;
  return data as unknown as T;
};

export function useFirmAccounting(firmId: string | null | undefined) {
  return useQuery({
    queryKey: ['firm-accounting', firmId],
    enabled: !!firmId,
    staleTime: 30 * 1000,
    queryFn: () => rpc<FirmAccounting>('get_firm_accounting', { p_firm: firmId }),
  });
}

export function useFirmInvoiceSync(firmId: string | null | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['firm-invoice-sync', firmId],
    enabled: !!firmId && enabled,
    staleTime: 30 * 1000,
    queryFn: async () =>
      ((await rpc<InvoiceSyncRow[] | null>('get_firm_invoice_sync', {
        p_firm: firmId,
        p_limit: 150,
      })) ?? []).map((r) => ({ ...r, amount: Number(r.amount) || 0 })),
  });
}

export function usePayrollRun(
  firmId: string | null | undefined,
  start: string | null,
  end: string | null
) {
  return useQuery({
    queryKey: ['payroll-run', firmId, start, end],
    enabled: !!firmId && !!start && !!end,
    staleTime: 15 * 1000,
    queryFn: () =>
      rpc<PayrollRun>('get_payroll_run', { p_firm: firmId, p_start: start, p_end: end, p_export: null }),
  });
}

/** A past run's rows, for "Save the file again". */
export async function fetchPayrollExport(firmId: string, exportId: string): Promise<PayrollRun> {
  return rpc<PayrollRun>('get_payroll_run', {
    p_firm: firmId,
    p_start: null,
    p_end: null,
    p_export: exportId,
  });
}

/** Plain words for the database's error codes. */
export function payrollErrorMessage(e: unknown): string {
  const msg = (e as { message?: string })?.message ?? '';
  if (msg.includes('run_changed'))
    return 'Something changed since this screen loaded (an entry was approved, rejected or sent by someone else). The list has been refreshed. Check it and send again.';
  if (msg.includes('nothing_to_send')) return 'There is nothing new to send for this period.';
  if (msg.includes('expenses_paid'))
    return 'The expenses in this run have been repaid on payday, so the run cannot be put back. Correct anything in the next run instead.';
  if (msg.includes('too_late')) return 'A run can only be put back within 48 hours of sending.';
  if (msg.includes('not_allowed')) return 'You do not have permission to do that.';
  if (msg.includes('period_invalid')) return 'Pick a pay period of up to two months.';
  return 'Could not save. Check your connection and try again.';
}

export function useSendPayrollRun() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: {
      firmId: string;
      start: string;
      end: string;
      kind: PayrollFileKind;
      timesheetIds: string[];
      expenseIds: string[];
    }) =>
      rpc<{ export_id: string; replayed: boolean }>('send_payroll_run', {
        p_firm: v.firmId,
        p_start: v.start,
        p_end: v.end,
        p_kind: v.kind,
        p_timesheet_ids: v.timesheetIds,
        p_expense_ids: v.expenseIds,
      }),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['payroll-run'] });
      qc.invalidateQueries({ queryKey: ['firm-accounting'] });
      qc.invalidateQueries({ queryKey: ['my-payroll-exports'] });
      qc.invalidateQueries({ queryKey: ['timesheets'] });
      qc.invalidateQueries({ queryKey: ['expense_claims'] });
    },
  });
}

export function useUndoPayrollExport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (exportId: string) =>
      rpc<{ timesheets: number; expenses: number }>('undo_payroll_export', { p_export: exportId }),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['payroll-run'] });
      qc.invalidateQueries({ queryKey: ['firm-accounting'] });
      qc.invalidateQueries({ queryKey: ['my-payroll-exports'] });
    },
  });
}

export function useSetFirmAutoSync() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { firmId: string; provider: AccountingProviderId; enabled: boolean }) =>
      rpc<boolean>('set_firm_accounting_autosync', {
        p_firm: v.firmId,
        p_provider: v.provider,
        p_enabled: v.enabled,
      }),
    onSettled: () => qc.invalidateQueries({ queryKey: ['firm-accounting'] }),
  });
}

/**
 * Start the existing OAuth flow for the FIRM (the owner's account). Owners and
 * admin managers only; the edge function checks that again.
 */
export async function connectFirmAccounting(firmId: string, provider: AccountingProviderId) {
  const { data, error } = await supabase.functions.invoke('accounting-oauth-init', {
    body: { provider, firmId, returnTo: 'employer' },
  });
  if (error || !data?.authUrl) {
    const detail = (data as { error?: string } | null)?.error;
    throw new Error(detail || error?.message || 'Could not start the connection.');
  }
  await openExternalUrl(data.authUrl as string);
}

/** Push one invoice through the firm's connection. Never throws. */
export async function syncFirmInvoice(
  invoiceId: string,
  provider: AccountingProviderId
): Promise<{ ok: boolean; message: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('accounting-sync-invoice', {
      body: { invoiceId, provider },
    });
    if (data?.success === true) return { ok: true, message: `Sent to ${PROVIDER_NAME[provider]}` };
    const raw = [data?.error, data?.detail].filter(Boolean).join(': ') || error?.message || '';
    return { ok: false, message: plainSyncError(raw, provider) };
  } catch (e) {
    return { ok: false, message: plainSyncError((e as Error)?.message ?? '', provider) };
  }
}

/** Turn a provider or server error into one plain sentence. */
export function plainSyncError(raw: string | null | undefined, provider?: AccountingProviderId | null): string {
  const name = provider ? PROVIDER_NAME[provider] : 'the accounting package';
  const r = (raw ?? '').toLowerCase();
  if (!r) return `Could not reach ${name}. Try again in a minute.`;
  if (r.includes('office manager')) return raw!.trim();
  if (r.includes('token') || r.includes('reconnect') || r.includes('expired') || r.includes('unauthor') || r.includes('401'))
    return `The connection to ${name} has run out. Reconnect it, then sync again.`;
  if (r.includes('no ') && r.includes('connection found')) return `${name} is not connected.`;
  if (r.includes('account code') || r.includes('accountcode') || r.includes('account must be valid'))
    return `${name} rejected the sales account code. Pick the right account in Settings, Business, Accounting.`;
  if (r.includes('contact') && (r.includes('archived') || r.includes('duplicate')))
    return `${name} has a problem with this customer's contact (archived or duplicated). Fix the contact in ${name}, then sync again.`;
  if (r.includes('tax') || r.includes('vat'))
    return `${name} rejected the VAT setting on a line. Check the VAT rate on this invoice, then sync again.`;
  if (r.includes('rate limit') || r.includes('429') || r.includes('too many'))
    return `${name} is busy. Try again in a few minutes.`;
  if (r.includes('not found or access denied')) return 'Only the owner or an admin can sync invoices.';
  const firstLine = (raw ?? '').split(/\n|Stack:/)[0].trim();
  return firstLine.length > 220 ? `${firstLine.slice(0, 217)}...` : firstLine;
}
