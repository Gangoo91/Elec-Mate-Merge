/**
 * Debtor aging — buckets overdue (unpaid, past-due) invoices by how long they've
 * been outstanding. Shared by the invoices view and the client CRM so "who owes
 * you, and how badly" reads consistently everywhere.
 */

export interface AgingInvoice {
  status?: string | null;
  due_date?: string | null;
  amount?: number | null;
}

export type AgingBucketKey = 'current' | 'd1_30' | 'd31_60' | 'd61_90' | 'd90_plus';

export interface AgingSummary {
  current: number; // not yet due (unpaid, due in the future)
  d1_30: number;
  d31_60: number;
  d61_90: number;
  d90_plus: number;
  totalOverdue: number; // 1+ days past due
  totalOutstanding: number; // current + overdue
}

const isUnpaid = (inv: AgingInvoice) => (inv.status ?? '').toLowerCase() !== 'paid';

/** Whole days an unpaid invoice is past its due date (0 if not yet due / no date). */
export const daysOverdue = (inv: AgingInvoice, now: Date = new Date()): number => {
  if (!inv.due_date) return 0;
  const due = new Date(inv.due_date);
  const ms = now.getTime() - due.getTime();
  if (ms <= 0) return 0;
  return Math.floor(ms / 86_400_000);
};

export const computeAging = (invoices: AgingInvoice[], now: Date = new Date()): AgingSummary => {
  const s: AgingSummary = {
    current: 0,
    d1_30: 0,
    d31_60: 0,
    d61_90: 0,
    d90_plus: 0,
    totalOverdue: 0,
    totalOutstanding: 0,
  };
  for (const inv of invoices) {
    if (!isUnpaid(inv)) continue;
    const amt = Number(inv.amount ?? 0);
    const d = daysOverdue(inv, now);
    s.totalOutstanding += amt;
    if (d === 0) {
      s.current += amt;
      continue;
    }
    s.totalOverdue += amt;
    if (d <= 30) s.d1_30 += amt;
    else if (d <= 60) s.d31_60 += amt;
    else if (d <= 90) s.d61_90 += amt;
    else s.d90_plus += amt;
  }
  return s;
};
