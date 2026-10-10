/**
 * Gap #7: the firm's bills address and the bills that came by email.
 *
 * bills-<token>@in.elec-mate.com is made on first look (get_bills_inbox,
 * owner/admin only). Emailed bills land in Receipts as captures; this hook
 * adds where each came from, the PO match, and the actions only an emailed
 * bill has: trust the sender, read it (read-emailed-bill, one AI read), and
 * send its prices to the price book once posted.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const rpc = (name: string, args: Record<string, unknown>) =>
  supabase.rpc(name as never, args as never);

export interface EmailedBillMatch {
  order_id: string | null;
  order_number?: string | null;
  supplier?: string | null;
  job_id?: string | null;
  job_title?: string | null;
  how?: 'reference' | 'supplier_and_total' | 'supplier';
  check?: { matched?: boolean; variances?: { type: string; detail: string; amount: number }[] };
}

export interface EmailedBill {
  capture_id: string;
  from_address: string | null;
  from_name: string | null;
  subject: string | null;
  received_at: string;
  status: 'held' | 'reading' | 'read' | 'failed';
  sender_known: string | null;
  hold_reason: string | null;
  order_ref: string | null;
  match: EmailedBillMatch | null;
  prices_applied_at: string | null;
  prices_result: {
    applied?: boolean;
    account?: boolean;
    price_changes?: number;
    book_updated?: number;
    last_paid?: number;
  } | null;
}

export interface BillsInbox {
  allowed: boolean;
  address?: string;
  enabled?: boolean;
  last_received_at?: string | null;
  forwarding_code?: string | null;
  forwarding_link?: string | null;
  bills: EmailedBill[];
}

export function useBillsInbox(firmId: string | null | undefined, enabled = true) {
  return useQuery<BillsInbox>({
    queryKey: ['bills-inbox', firmId],
    enabled: !!firmId && enabled,
    staleTime: 30 * 1000,
    queryFn: async () => {
      const { data, error } = await rpc('get_bills_inbox', { p_firm: firmId });
      if (error) throw error;
      const d = (data ?? {}) as Partial<BillsInbox>;
      return { ...d, allowed: !!d.allowed, bills: d.bills ?? [] } as BillsInbox;
    },
  });
}

export function useResetBillsAddress(firmId: string | null | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await rpc('reset_bills_address', { p_firm: firmId });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bills-inbox'] }),
  });
}

/** Read an emailed bill (a held one, or "Read it again"). Optionally trust the sender first. */
export function useReadEmailedBill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      captureId,
      trust,
      force,
    }: {
      captureId: string;
      trust?: boolean;
      force?: boolean;
    }) => {
      if (trust) {
        const { error } = await rpc('trust_bill_sender', { p_capture: captureId });
        if (error) throw error;
      }
      const { data, error } = await supabase.functions.invoke('read-emailed-bill', {
        body: { capture_id: captureId, force: !!force },
      });
      if (error) throw error;
      return data as { ok?: boolean; error?: string };
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['receipt-captures'] });
      qc.invalidateQueries({ queryKey: ['bills-inbox'] });
    },
  });
}

/** After posting: the bill's prices go to the price book (once per bill). */
export async function applyEmailedBillPrices(captureId: string) {
  const { data, error } = await rpc('apply_emailed_bill_prices', { p_capture: captureId });
  if (error) throw error;
  return (data ?? {}) as NonNullable<EmailedBill['prices_result']> & { already?: boolean };
}

/** "Pennine Electrical Wholesale" or the address. */
export function senderLabel(b: Pick<EmailedBill, 'from_name' | 'from_address'>) {
  return b.from_name?.trim() || b.from_address || 'an unknown sender';
}
