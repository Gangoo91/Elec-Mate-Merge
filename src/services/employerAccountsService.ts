import { supabase } from '@/integrations/supabase/client';
import {
  splitDailyOvertime,
  grossPay,
  DEFAULT_OVERTIME_TERMS,
} from '@/utils/payCalculations';

/**
 * Accounts for the Employer Hub — the cashbook (ledger) and the P&L.
 *
 * Money in comes from the same place the invoice builder writes (`quotes`);
 * money out from procurement and expense claims. Everything is scoped
 * server-side through my_employer_scope(), so a co-admin sees the company's
 * books rather than their own.
 *
 * Labour is NOT computed in SQL. Per-day overtime at each worker's own
 * multiplier lives in payCalculations.ts and is shared with Timesheets, My Pay
 * and the payroll export; duplicating it in a database function would give two
 * answers that drift apart. The RPC returns raw per-worker/per-day hours and
 * the gross is derived here with the same helpers everything else uses.
 *
 * Casts on rpc(): these functions postdate the last types.ts regeneration.
 */

export interface LedgerEntry {
  entry_date: string;
  direction: 'in' | 'out';
  category: string;
  reference: string | null;
  counterparty: string | null;
  amount: number;
  source_id: string;
}

export interface ProfitAndLoss {
  revenueInvoiced: number;
  revenuePaid: number;
  revenueOutstanding: number;
  materials: number;
  supplierInvoices: number;
  expenses: number;
  /** Gross labour from approved timesheets — overtime-aware. */
  labour: number;
  /** Revenue invoiced less materials, supplier invoices, expenses and labour. */
  grossProfit: number;
  grossMarginPct: number;
}

interface LabourDayRow {
  employee_id: string;
  employee_name: string;
  hourly_rate: number;
  overtime_multiplier: number;
  overtime_threshold_hours: number;
  work_date: string;
  hours: number;
}

const num = (v: unknown) => Number(v ?? 0);

export async function getLedger(from: string, to: string): Promise<LedgerEntry[]> {
  const { data, error } = await supabase.rpc('get_employer_ledger' as never, {
    p_from: from,
    p_to: to,
  } as never);
  if (error) throw error;
  return ((data ?? []) as unknown as LedgerEntry[]).map((r) => ({
    ...r,
    amount: num(r.amount),
  }));
}

/** Gross labour for the period, per worker, using the shared pay maths. */
export async function getLabourCost(from: string, to: string): Promise<number> {
  const { data, error } = await supabase.rpc('get_employer_labour_days' as never, {
    p_from: from,
    p_to: to,
  } as never);
  if (error) return 0; // a labour read failure must not blank the whole P&L
  const rows = (data ?? []) as unknown as LabourDayRow[];

  const byEmployee = new Map<string, LabourDayRow[]>();
  for (const row of rows) {
    const list = byEmployee.get(row.employee_id) ?? [];
    list.push(row);
    byEmployee.set(row.employee_id, list);
  }

  let total = 0;
  byEmployee.forEach((list) => {
    const first = list[0];
    const threshold = num(first.overtime_threshold_hours) || DEFAULT_OVERTIME_TERMS.threshold;
    const multiplier = num(first.overtime_multiplier) || DEFAULT_OVERTIME_TERMS.multiplier;
    const { regularHours, overtimeHours } = splitDailyOvertime(
      list.map((r) => ({ date: r.work_date, totalHours: num(r.hours) })),
      threshold
    );
    total += grossPay(regularHours, overtimeHours, num(first.hourly_rate), multiplier);
  });
  return total;
}

export async function getProfitAndLoss(from: string, to: string): Promise<ProfitAndLoss> {
  const [pnlRes, labour] = await Promise.all([
    supabase.rpc('get_employer_pnl' as never, { p_from: from, p_to: to } as never),
    getLabourCost(from, to),
  ]);
  if (pnlRes.error) throw pnlRes.error;

  const row = (((pnlRes.data ?? []) as unknown as Record<string, unknown>[])[0] ?? {}) as Record<
    string,
    unknown
  >;
  const revenueInvoiced = num(row.revenue_invoiced);
  const materials = num(row.materials);
  const supplierInvoices = num(row.supplier_invoices);
  const expenses = num(row.expenses);
  const grossProfit = revenueInvoiced - materials - supplierInvoices - expenses - labour;

  return {
    revenueInvoiced,
    revenuePaid: num(row.revenue_paid),
    revenueOutstanding: num(row.revenue_outstanding),
    materials,
    supplierInvoices,
    expenses,
    labour,
    grossProfit,
    // Guard the divide — an empty period must read 0%, not NaN or Infinity.
    grossMarginPct: revenueInvoiced > 0 ? (grossProfit / revenueInvoiced) * 100 : 0,
  };
}
