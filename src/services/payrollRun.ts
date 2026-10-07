/**
 * Month-end "Send to payroll" (ELE-1825).
 *
 * The run itself comes from the database (get_payroll_run): approved hours not
 * yet sent, approved expense claims not yet repaid through payroll, approved
 * leave in the period. This file turns that into one line per worker and then
 * into the file for whichever package the firm uses.
 *
 * Pay maths is utils/payCalculations, the same functions the Timesheets export
 * and the worker's My pay page use, so the three can never disagree.
 *
 * Honest about what this is: a FILE. The Xero / QuickBooks connection we have
 * can post invoices but has no payroll permission, so nothing here is posted to
 * a payroll API. The columns follow each package's own wording so a bookkeeper
 * can import or key it without translating.
 */
import { format, parseISO } from 'date-fns';
import { splitDailyOvertime, grossPay } from '@/utils/payCalculations';

export interface RunExpense {
  id: string;
  category: string | null;
  description: string | null;
  /** null when the viewer cannot see money (never sent to office managers). */
  amount: number | null;
  miles: number | null;
  date: string | null;
}

export interface RunWorker {
  employee_id: string;
  name: string;
  pay_type: 'hourly' | 'annual' | 'day_rate' | string;
  hourly_rate: number | null;
  overtime_multiplier: number;
  overtime_threshold: number;
  timesheet_ids: string[];
  days: Array<{ date: string; hours: number }>;
  earlier_hours: number;
  awaiting_count: number;
  awaiting_hours: number;
  sent_hours: number;
  leave_days: number;
  leave_detail: string;
  expenses: RunExpense[];
}

export interface PayrollRunExport {
  id: string;
  period_start: string;
  period_end: string;
  exported_at: string;
  kind: PayrollFileKind;
  destination: 'file' | 'api';
  timesheet_count: number;
  expense_count: number;
  total_hours: number;
  mileage_miles: number;
  people: number;
  by_name: string;
  mine: boolean;
  can_undo: boolean;
  /** The run's payday: the firm's payday for period_end, or period_end when none is set. */
  payday?: string | null;
  payday_source?: 'settings' | 'period_end' | null;
  /** When the daily job marked this run's expense claims Paid. */
  expenses_paid_at?: string | null;
  /** Expenses in the run are paid (or payday has come), so Undo is closed. */
  expenses_paid?: boolean;
}

export interface PayrollRun {
  period_start: string;
  period_end: string;
  export_id: string | null;
  money_visible: boolean;
  /** Payday for this period (or the run's stored payday). */
  payday?: string | null;
  payday_source?: 'settings' | 'period_end' | null;
  workers: RunWorker[];
  hidden_expense_count: number;
  exports: PayrollRunExport[];
}

export type PayrollFileKind = 'xero' | 'quickbooks' | 'sage' | 'csv' | 'hours';

export const PAYROLL_FILE_LABEL: Record<PayrollFileKind, string> = {
  xero: 'Xero',
  quickbooks: 'QuickBooks',
  sage: 'Sage',
  csv: 'Spreadsheet',
  hours: 'Hours only',
};

export interface PayrollLine {
  employeeId: string;
  name: string;
  payType: string;
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  /** Hours approved late, dated before this period. Already inside totalHours. */
  earlierHours: number;
  rate: number | null;
  overtimeMultiplier: number;
  gross: number | null;
  mileageMiles: number;
  mileagePay: number | null;
  expensesPay: number | null;
  reimbursement: number | null;
  expenseDetail: string;
  leaveDays: number;
  leaveDetail: string;
  awaitingCount: number;
  awaitingHours: number;
  sentHours: number;
  timesheetIds: string[];
  expenseIds: string[];
  /** Hours to pay but no rate on the team record. */
  noRate: boolean;
}

const num = (v: unknown) => (typeof v === 'number' ? v : Number(v ?? 0)) || 0;
const isMileage = (e: RunExpense) =>
  (e.category ?? '').toLowerCase() === 'mileage' || num(e.miles) > 0;

const gbp = (n: number) => `£${n.toFixed(2)}`;
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export function buildPayrollLines(run: PayrollRun): PayrollLine[] {
  const money = run.money_visible;
  return run.workers.map((w) => {
    const days = (w.days ?? []).map((d) => ({ date: d.date, totalHours: num(d.hours) }));
    const { regularHours, overtimeHours } = splitDailyOvertime(days, num(w.overtime_threshold) || 8);
    const totalHours = regularHours + overtimeHours;
    const rate = money && w.hourly_rate != null && num(w.hourly_rate) > 0 ? num(w.hourly_rate) : null;
    const mult = num(w.overtime_multiplier) || 1;
    const mileage = (w.expenses ?? []).filter(isMileage);
    const other = (w.expenses ?? []).filter((e) => !isMileage(e));
    const mileagePay = money ? mileage.reduce((s, e) => s + num(e.amount), 0) : null;
    const expensesPay = money ? other.reduce((s, e) => s + num(e.amount), 0) : null;
    const detail = (w.expenses ?? [])
      .map((e) => {
        const when = e.date ? format(parseISO(e.date), 'd MMM') : '';
        const what = isMileage(e)
          ? `Mileage ${num(e.miles).toLocaleString('en-GB', { maximumFractionDigits: 1 })} mi`
          : cap(e.category || e.description || 'Expense');
        return [what, when, money && e.amount != null ? gbp(num(e.amount)) : '']
          .filter(Boolean)
          .join(' ');
      })
      .join('; ');
    return {
      employeeId: w.employee_id,
      name: w.name,
      payType: w.pay_type,
      regularHours,
      overtimeHours,
      totalHours,
      earlierHours: num(w.earlier_hours),
      rate,
      overtimeMultiplier: mult,
      gross: rate != null ? grossPay(regularHours, overtimeHours, rate, mult) : null,
      mileageMiles: mileage.reduce((s, e) => s + num(e.miles), 0),
      mileagePay,
      expensesPay,
      reimbursement: money ? (mileagePay ?? 0) + (expensesPay ?? 0) : null,
      expenseDetail: detail,
      leaveDays: num(w.leave_days),
      leaveDetail: w.leave_detail ?? '',
      awaitingCount: num(w.awaiting_count),
      awaitingHours: num(w.awaiting_hours),
      sentHours: num(w.sent_hours),
      timesheetIds: w.timesheet_ids ?? [],
      expenseIds: (w.expenses ?? []).map((e) => e.id),
      noRate: money && totalHours > 0 && rate == null,
    };
  });
}

/** Lines that actually carry something to send (hours or a claim). */
export function sendableLines(lines: PayrollLine[], includeExpenses: boolean): PayrollLine[] {
  return lines.filter(
    (l) => l.timesheetIds.length > 0 || (includeExpenses && l.expenseIds.length > 0) || l.leaveDays > 0
  );
}

export interface RunTotals {
  people: number;
  hours: number;
  overtime: number;
  gross: number | null;
  reimbursement: number | null;
  miles: number;
  timesheets: number;
  expenses: number;
  awaiting: number;
  noRate: string[];
}

export function runTotals(lines: PayrollLine[], includeExpenses: boolean, money: boolean): RunTotals {
  const live = sendableLines(lines, includeExpenses);
  return {
    people: live.length,
    hours: live.reduce((s, l) => s + l.totalHours, 0),
    overtime: live.reduce((s, l) => s + l.overtimeHours, 0),
    gross: money ? live.reduce((s, l) => s + (l.gross ?? 0), 0) : null,
    reimbursement: money && includeExpenses ? live.reduce((s, l) => s + (l.reimbursement ?? 0), 0) : null,
    miles: includeExpenses ? live.reduce((s, l) => s + l.mileageMiles, 0) : 0,
    timesheets: live.reduce((s, l) => s + l.timesheetIds.length, 0),
    expenses: includeExpenses ? live.reduce((s, l) => s + l.expenseIds.length, 0) : 0,
    awaiting: lines.reduce((s, l) => s + l.awaitingCount, 0),
    noRate: live.filter((l) => l.noRate).map((l) => l.name),
  };
}

/* ── Files ─────────────────────────────────────────────────────────────────── */

function cell(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : '';
  // Quote everything textual: names like "Smith, J" must not split a row, and
  // a leading = + - @ must never run as a spreadsheet formula.
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
}
const h2 = (n: number) => n.toFixed(2);
const m2 = (n: number | null) => (n == null ? '' : n.toFixed(2));
const ukDate = (iso: string) => format(parseISO(iso), 'dd/MM/yyyy');

export function payrollCsv(
  kind: PayrollFileKind,
  lines: PayrollLine[],
  start: string,
  end: string,
  includeExpenses: boolean
): string {
  const rows: Array<Array<string | number | null>> = [];
  const exp = includeExpenses;
  const reimb = (l: PayrollLine) => (exp ? m2(l.reimbursement) : '');
  const miles = (l: PayrollLine) => (exp ? h2(l.mileageMiles) : '');
  const mpay = (l: PayrollLine) => (exp ? m2(l.mileagePay) : '');
  const opay = (l: PayrollLine) => (exp ? m2(l.expensesPay) : '');
  const detail = (l: PayrollLine) => (exp ? l.expenseDetail : '');
  const otRate = (l: PayrollLine) => (l.rate == null ? '' : h2(l.rate * l.overtimeMultiplier));

  switch (kind) {
    case 'xero':
      rows.push([
        'Employee Name', 'Pay Period Start', 'Pay Period End', 'Ordinary Hours', 'Overtime Hours',
        'Hourly Rate', 'Overtime Rate', 'Gross Pay', 'Mileage (miles)', 'Mileage Allowance',
        'Expense Claims', 'Total Reimbursements', 'Leave Days', 'Leave Detail', 'Reimbursement Detail',
      ]);
      lines.forEach((l) =>
        rows.push([
          cell(l.name), ukDate(start), ukDate(end), h2(l.regularHours), h2(l.overtimeHours),
          m2(l.rate), otRate(l), m2(l.gross), miles(l), mpay(l), opay(l), reimb(l),
          l.leaveDays.toFixed(1), cell(l.leaveDetail), cell(detail(l)),
        ])
      );
      break;
    case 'sage':
      rows.push([
        'Name', 'Period Start', 'Period End', 'Basic Hours', 'OT Hours', 'Rate', 'OT Rate', 'Gross',
        'Mileage', 'Mileage Allowance', 'Expenses', 'Total Reimbursed', 'Hol Days', 'Notes',
      ]);
      lines.forEach((l) =>
        rows.push([
          cell(l.name), ukDate(start), ukDate(end), h2(l.regularHours), h2(l.overtimeHours),
          m2(l.rate), otRate(l), m2(l.gross), miles(l), mpay(l), opay(l), reimb(l),
          l.leaveDays.toFixed(1), cell([l.leaveDetail, detail(l)].filter(Boolean).join(' | ')),
        ])
      );
      break;
    case 'quickbooks':
      rows.push([
        'Employee', 'Pay Period', 'Regular Hours', 'Overtime Hours', 'Pay Rate', 'Overtime Rate',
        'Gross Wages', 'Mileage (miles)', 'Mileage Reimbursement', 'Expense Reimbursement',
        'Total Reimbursement', 'Leave Days', 'Memo',
      ]);
      lines.forEach((l) =>
        rows.push([
          cell(l.name), cell(`${ukDate(start)} to ${ukDate(end)}`), h2(l.regularHours),
          h2(l.overtimeHours), m2(l.rate), otRate(l), m2(l.gross), miles(l), mpay(l), opay(l),
          reimb(l), l.leaveDays.toFixed(1),
          cell([l.leaveDetail, detail(l)].filter(Boolean).join(' | ')),
        ])
      );
      break;
    case 'hours':
      rows.push([
        'Employee Name', 'Period Start', 'Period End', 'Regular Hours', 'Overtime Hours',
        'Total Hours', 'Of which approved late (earlier dates)', 'Leave Days', 'Leave Detail',
      ]);
      lines.forEach((l) =>
        rows.push([
          cell(l.name), ukDate(start), ukDate(end), h2(l.regularHours), h2(l.overtimeHours),
          h2(l.totalHours), h2(l.earlierHours), l.leaveDays.toFixed(1), cell(l.leaveDetail),
        ])
      );
      break;
    case 'csv':
    default:
      rows.push([
        'Employee ID', 'Employee Name', 'Pay Type', 'Period Start', 'Period End', 'Regular Hours',
        'Overtime Hours', 'Total Hours', 'Approved Late (earlier dates)', 'Hourly Rate',
        'Overtime Rate', 'Gross Pay', 'Mileage (miles)', 'Mileage Allowance', 'Expense Claims',
        'Total Reimbursement', 'Leave Days', 'Leave Detail', 'Reimbursement Detail',
      ]);
      lines.forEach((l) =>
        rows.push([
          l.employeeId, cell(l.name), cell(l.payType), start, end, h2(l.regularHours),
          h2(l.overtimeHours), h2(l.totalHours), h2(l.earlierHours), m2(l.rate), otRate(l),
          m2(l.gross), miles(l), mpay(l), opay(l), reimb(l), l.leaveDays.toFixed(1),
          cell(l.leaveDetail), cell(detail(l)),
        ])
      );
  }
  return rows.map((r) => r.map((v) => (v === null ? '' : String(v))).join(',')).join('\n');
}

export const payrollFilename = (kind: PayrollFileKind, start: string, end: string) =>
  kind === 'hours' ? `hours-${start}-to-${end}.csv` : `payroll-${kind}-${start}-to-${end}.csv`;
