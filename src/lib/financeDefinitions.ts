/* ==========================================================================
   financeDefinitions.ts — the client half of the ONE finance model
   (ELE-1992 / ELE-1981 / ELE-1983).

   Every money figure is computed server-side, once, in
   supabase/migrations/20261007140000_finance_model_core.sql
   (get_finance_summary, get_finance_monthly, get_job_finance). This module
   only carries the shapes, the period helper, labels and the invoice-state
   mapping for screens that list individual invoices. Never re-derive a
   total here — read it from the RPC.

   DEFINITIONS (identical to the SQL comment block):
   - Invoice state: void (cancelled/void/written off) · paid (paid date set or
     status paid) · draft · overdue (unpaid, not draft, due date before today
     or status overdue) · sent (everything else).
   - Invoiced (accrual) = total of sent + overdue + paid invoices, by invoice
     date. Drafts and void never count.
   - Paid in (cash) = amount received on PAID invoices, by paid date.
   - Outstanding = unpaid balance (total − paid so far) of sent + overdue
     invoices, today. Excludes drafts, paid and void. Overdue is part of it.
   - Costs = materials (POs not draft/cancelled; supplier bill replaces its PO)
     + supplier bills not on a PO + approved/paid expense claims + labour
     (approved hours × rate, overtime per worker per day) + manual job costs.
   - Gross profit = Invoiced − costs (always the invoiced basis).
     Margin = gross profit ÷ invoiced.
   - Open quote = sent to the client, still awaiting an answer.
   - Job contract value = accepted quotes (else job value, else open quotes)
     + approved variations. Forecast revenue = max(contract value, invoiced).
   - Who sees what (ELE-1831): invoice-side figures for every manager; costs,
     labour cost, gross profit, margin and budget only for the owner and
     'admin' managers (can_see_firm_money). Office gets nulls → hide, not £0.
   ========================================================================== */

export type MoneyState = 'draft' | 'sent' | 'overdue' | 'paid' | 'void';

/** Labels used on every screen — one wording per figure. */
export const FINANCE_LABELS = {
  invoiced: 'Invoiced',
  invoicedHint: 'Sent, overdue and paid invoices dated in the period. Drafts never count.',
  paidIn: 'Cash in',
  paidInHint: 'Money received: invoices paid in the period.',
  outstanding: 'Outstanding',
  outstandingHint: 'Unpaid balance of sent and overdue invoices, today. Drafts excluded.',
  overdue: 'Overdue',
  costs: 'Costs',
  costsHint:
    'Purchase orders, supplier bills, approved expenses, labour from approved timesheets and manual job costs.',
  grossProfit: 'Gross profit',
  grossProfitHint: 'Invoiced less costs — the same figure on Reports, Accounts and Job financials.',
  margin: 'Margin',
  openQuotes: 'Open quotes',
  openQuotesHint: 'Sent and awaiting the client’s answer.',
} as const;

/** Mirrors finance_invoice_rows() for screens that list single invoices. */
export function moneyState(inv: {
  status?: string | null;
  paid_date?: string | null;
  due_date?: string | null;
}): MoneyState {
  const st = (inv.status || 'draft').toLowerCase().trim();
  if (['cancelled', 'canceled', 'void', 'voided', 'written_off', 'written off'].includes(st))
    return 'void';
  if (inv.paid_date || st === 'paid') return 'paid';
  if (st === 'draft' || st === '') return 'draft';
  if (st === 'overdue') return 'overdue';
  if (inv.due_date && inv.due_date.slice(0, 10) < todayUk()) return 'overdue';
  return 'sent';
}

/** Unpaid balance of one invoice: only sent/overdue invoices carry one. */
export function invoiceBalance(inv: {
  status?: string | null;
  paid_date?: string | null;
  due_date?: string | null;
  amount?: number | string | null;
  total_paid?: number | string | null;
}): number {
  const state = moneyState(inv);
  if (state !== 'sent' && state !== 'overdue') return 0;
  return Math.max(Number(inv.amount || 0) - Number(inv.total_paid || 0), 0);
}

/** Today's date in the UK as yyyy-MM-dd (the books run to UK days). */
export function todayUk(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

/* ── Shapes returned by the RPCs ─────────────────────────────────────── */

export interface FinanceSummary {
  /**
   * False for office managers (ELE-1831): the server returns the cost side
   * (costs, labour, gross profit, margin) as null. Screens must HIDE those
   * figures — never show them as £0.
   */
  moneyVisible: boolean;
  invoiced: number;
  invoiceCount: number;
  paidIn: number;
  paidCount: number;
  draftValue: number;
  draftCount: number;
  outstanding: number;
  outstandingCount: number;
  overdue: number;
  overdueCount: number;
  paidLast30d: number;
  openQuoteValue: number;
  openQuoteCount: number;
  materials: number;
  supplierInvoices: number;
  expenses: number;
  labour: number;
  otherCosts: number;
  totalCosts: number;
  grossProfit: number;
  /** null when nothing was invoiced — a margin on £0 is meaningless. */
  marginPct: number | null;
}

export interface MonthlyFinance {
  /** False when costs/profit are hidden for the caller's role. */
  moneyVisible: boolean;
  monthStart: string;
  label: string;
  invoiced: number;
  paidIn: number;
  totalCosts: number;
  grossProfit: number;
}

export interface JobFinance {
  /** False when the caller may not see this firm's costs/profit (office). */
  moneyVisible: boolean;
  jobId: string;
  title: string;
  client: string | null;
  jobStatus: string | null;
  budgetTotal: number;
  jobValue: number;
  quoted: number;
  acceptedQuotes: number;
  variationsApproved: number;
  variationsPending: number;
  contractValue: number;
  invoiced: number;
  paid: number;
  outstanding: number;
  overdue: number;
  draftInvoiced: number;
  invoiceCount: number;
  labourHours: number;
  labourTimesheets: number;
  labourAdjustments: number;
  labour: number;
  materials: number;
  materialsCommitted: number;
  expenses: number;
  otherCosts: number;
  totalCosts: number;
  grossProfit: number;
  marginPct: number | null;
  forecastRevenue: number;
  forecastProfit: number;
  forecastMarginPct: number | null;
  lastLabourAdjustment: {
    amount: number;
    previous_value: number | null;
    new_value: number | null;
    note: string | null;
    by: string | null;
    at: string;
  } | null;
}

const n = (v: unknown) => Number(v ?? 0) || 0;
const nOrNull = (v: unknown) => (v === null || v === undefined ? null : Number(v));

export function toFinanceSummary(r: Record<string, unknown> | undefined): FinanceSummary {
  const row = r ?? {};
  return {
    // An empty result (no row) is an all-zero firm, not a hidden one.
    moneyVisible: r === undefined || (row.total_costs !== null && row.total_costs !== undefined),
    invoiced: n(row.invoiced),
    invoiceCount: n(row.invoice_count),
    paidIn: n(row.paid_in),
    paidCount: n(row.paid_count),
    draftValue: n(row.draft_value),
    draftCount: n(row.draft_count),
    outstanding: n(row.outstanding),
    outstandingCount: n(row.outstanding_count),
    overdue: n(row.overdue),
    overdueCount: n(row.overdue_count),
    paidLast30d: n(row.paid_last_30d),
    openQuoteValue: n(row.open_quote_value),
    openQuoteCount: n(row.open_quote_count),
    materials: n(row.materials),
    supplierInvoices: n(row.supplier_invoices),
    expenses: n(row.expenses),
    labour: n(row.labour),
    otherCosts: n(row.other_costs),
    totalCosts: n(row.total_costs),
    grossProfit: n(row.gross_profit),
    marginPct: nOrNull(row.margin_pct),
  };
}

export function toJobFinance(r: Record<string, unknown>): JobFinance {
  return {
    moneyVisible: r.total_costs !== null && r.total_costs !== undefined,
    jobId: String(r.job_id),
    title: (r.title as string) || 'Untitled job',
    client: (r.client as string) ?? null,
    jobStatus: (r.job_status as string) ?? null,
    budgetTotal: n(r.budget_total),
    jobValue: n(r.job_value),
    quoted: n(r.quoted),
    acceptedQuotes: n(r.accepted_quotes),
    variationsApproved: n(r.variations_approved),
    variationsPending: n(r.variations_pending),
    contractValue: n(r.contract_value),
    invoiced: n(r.invoiced),
    paid: n(r.paid),
    outstanding: n(r.outstanding),
    overdue: n(r.overdue),
    draftInvoiced: n(r.draft_invoiced),
    invoiceCount: n(r.invoice_count),
    labourHours: n(r.labour_hours),
    labourTimesheets: n(r.labour_timesheets),
    labourAdjustments: n(r.labour_adjustments),
    labour: n(r.labour),
    materials: n(r.materials),
    materialsCommitted: n(r.materials_committed),
    expenses: n(r.expenses),
    otherCosts: n(r.other_costs),
    totalCosts: n(r.total_costs),
    grossProfit: n(r.gross_profit),
    marginPct: nOrNull(r.margin_pct),
    forecastRevenue: n(r.forecast_revenue),
    forecastProfit: n(r.forecast_profit),
    forecastMarginPct: nOrNull(r.forecast_margin_pct),
    lastLabourAdjustment: (r.last_labour_adjustment as JobFinance['lastLabourAdjustment']) ?? null,
  };
}

/* ── Periods (shared by Reports and Accounts so they ask the same question) ── */

export type FinancePeriodKey =
  | 'this_month'
  | 'last_month'
  | 'this_quarter'
  | 'this_year'
  | 'last_12_months'
  | 'all_time';

export const FINANCE_PERIODS: { value: FinancePeriodKey; label: string }[] = [
  { value: 'this_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'this_year', label: 'This year' },
  { value: 'last_12_months', label: 'Last 12 months' },
  { value: 'all_time', label: 'All time' },
];

export interface FinancePeriod {
  key: FinancePeriodKey;
  /** yyyy-MM-dd, or null for all time */
  from: string | null;
  to: string | null;
  label: string;
}

/** Local calendar dates — a UK contractor's books run to their calendar. */
export function financePeriod(key: FinancePeriodKey, now = new Date()): FinancePeriod {
  const y = now.getFullYear();
  const m = now.getMonth();
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const label = FINANCE_PERIODS.find((p) => p.value === key)?.label ?? 'This month';
  switch (key) {
    case 'last_month':
      return { key, from: fmt(new Date(y, m - 1, 1)), to: fmt(new Date(y, m, 0)), label };
    case 'this_quarter': {
      const q = Math.floor(m / 3) * 3;
      return { key, from: fmt(new Date(y, q, 1)), to: fmt(new Date(y, q + 3, 0)), label };
    }
    case 'this_year':
      return { key, from: fmt(new Date(y, 0, 1)), to: fmt(new Date(y, 11, 31)), label };
    case 'last_12_months':
      return { key, from: fmt(new Date(y, m - 11, 1)), to: fmt(new Date(y, m + 1, 0)), label };
    case 'all_time':
      return { key, from: null, to: null, label };
    case 'this_month':
    default:
      return { key: 'this_month', from: fmt(new Date(y, m, 1)), to: fmt(new Date(y, m + 1, 0)), label };
  }
}

/* ── Formatting ─────────────────────────────────────────────────────── */

/** £1,234.56 — pennies matter on the books. */
export function formatGBP(v: number): string {
  const sign = v < 0 ? '−' : '';
  return `${sign}£${Math.abs(v).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** £450 · £12.4k · £1.2m — for tiles where space is tight. */
export function formatGBPCompact(v: number): string {
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  if (a >= 1_000_000) return `${sign}£${(a / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`;
  if (a >= 1_000) return `${sign}£${(a / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${sign}£${Math.round(a).toLocaleString('en-GB')}`;
}

export function formatMargin(pct: number | null | undefined): string {
  return pct === null || pct === undefined ? '—' : `${pct.toFixed(1)}%`;
}
