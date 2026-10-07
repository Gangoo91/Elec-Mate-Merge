/**
 * Subcontractors on the roster (ELE-1830).
 *
 * A subbie is an employer_employees row with team_role = 'Subcontractor'.
 *   - employer_subcontractor_details: trade + insurance. Not money; office edits it.
 *   - employer_subcontractor_terms:   rate, CIS status, UTR, VAT. Owner/admin only.
 *   - employer_subcontractor_statements: self-bill statements, written only by
 *     issue_subcontractor_statement() and void_subcontractor_statement().
 * get_subcontractor_run() returns the period: days for everyone, money only when
 * the caller can see firm money. The CIS maths lives in the database
 * (cis_statement_amounts); the screen only displays it.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';

export type CisStatus = 'gross' | 'standard' | 'higher' | 'unverified';
export type RateBasis = 'day' | 'hour';

export const CIS_STATUS_OPTIONS: { value: CisStatus; label: string; rate: number; hint: string }[] =
  [
    { value: 'standard', label: 'Verified, 20%', rate: 0.2, hint: 'HMRC verified them at the standard rate.' },
    { value: 'gross', label: 'Gross, 0%', rate: 0, hint: 'HMRC verified them for gross payment.' },
    { value: 'higher', label: 'Verified, 30%', rate: 0.3, hint: 'HMRC told you to deduct at the higher rate.' },
    {
      value: 'unverified',
      label: 'Not verified, 30%',
      rate: 0.3,
      hint: 'Until you verify them with HMRC you must deduct 30%.',
    },
  ];

export const cisLabel = (s: CisStatus | string | null | undefined) =>
  CIS_STATUS_OPTIONS.find((o) => o.value === s)?.label ?? 'Not verified, 30%';
export const cisPercent = (s: CisStatus | string | null | undefined) =>
  `${Math.round((CIS_STATUS_OPTIONS.find((o) => o.value === s)?.rate ?? 0.3) * 100)}%`;

export interface SubcontractorDay {
  date: string;
  hours: number;
  jobs: string | null;
}

export interface SubcontractorExpense {
  id: string;
  category: string | null;
  description: string | null;
  amount: number;
  materials: boolean;
  date: string | null;
}

export interface SubcontractorTerms {
  rate_basis: RateBasis;
  rate: number | null;
  cis_status: CisStatus;
  cis_verification_number: string | null;
  cis_verified_on: string | null;
  utr: string | null;
  vat_registered: boolean;
  vat_number: string | null;
}

export interface CisAmounts {
  labour: number;
  other_costs: number;
  materials: number;
  gross: number;
  cis_rate: number;
  cis_deduction: number;
  net_payable: number;
}

export interface SubcontractorRow {
  roster_id: string;
  name: string;
  linked_account: boolean;
  photo_url: string | null;
  status: string | null;
  trade: string | null;
  trading_name: string | null;
  insurance_provider: string | null;
  insurance_policy_number: string | null;
  insurance_cover_amount: number | null;
  insurance_expiry: string | null;
  ecs_expiry: string | null;
  elec_id_number: string | null;
  timesheet_ids: string[];
  days: SubcontractorDay[];
  day_count: number;
  hours: number;
  awaiting_count: number;
  billed_days: number;
  /** Money: null for office managers. */
  expense_ids: string[] | null;
  expenses: SubcontractorExpense[] | null;
  terms: SubcontractorTerms | null;
  amounts: CisAmounts | null;
}

export interface StatementLine {
  kind: 'day' | 'materials' | 'other';
  date: string | null;
  hours?: number;
  jobs?: string | null;
  description?: string | null;
  amount?: number;
}

export interface SubcontractorStatement {
  id: string;
  roster_id?: string;
  statement_number: string;
  name?: string | null;
  period_start: string;
  period_end: string;
  day_count: number;
  hours: number;
  issued_at: string;
  voided_at?: string | null;
  // Money (absent for office managers)
  rate_basis?: RateBasis;
  rate?: number;
  labour_amount?: number;
  other_costs?: number;
  materials_amount?: number;
  gross_amount?: number;
  cis_status?: CisStatus;
  cis_rate?: number;
  cis_deduction?: number;
  net_payable?: number;
  utr?: string | null;
  trade?: string | null;
  trading_name?: string | null;
  vat_registered?: boolean;
  cis_verification_number?: string | null;
  lines?: StatementLine[];
  can_void?: boolean;
}

export interface SubcontractorRun {
  period_start: string;
  period_end: string;
  money_visible: boolean;
  subcontractors: SubcontractorRow[];
  statements: SubcontractorStatement[];
  cis_settings: { employer_tax_reference: string | null; accounts_office_reference: string | null } | null;
  company_name: string | null;
}

/* ── Periods: the CIS tax month runs 6th to 5th ───────────────────────── */

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** The tax month containing `on`, shifted by `offset` months. */
export function taxMonth(offset = 0, on: Date = new Date()): { start: string; end: string } {
  const y = on.getFullYear();
  const m = on.getMonth() + (on.getDate() >= 6 ? 0 : -1) + offset;
  const start = new Date(y, m, 6);
  const end = new Date(y, m + 1, 5);
  return { start: iso(start), end: iso(end) };
}

export const fmtDay = (isoDate: string | null | undefined) =>
  isoDate
    ? new Date(`${isoDate.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

export const fmtShortDay = (isoDate: string) =>
  new Date(`${isoDate.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

export const gbp = (n: number | null | undefined) =>
  `£${Number(n ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const fmtDays = (n: number) => `${Number(n) % 1 === 0 ? Number(n) : Number(n).toFixed(1)} day${Number(n) === 1 ? '' : 's'}`;

/** Expiry status for insurance / ECS pills. */
export function expiryState(date: string | null | undefined): {
  tone: 'red' | 'amber' | 'emerald' | 'blue';
  label: string;
} {
  if (!date) return { tone: 'blue', label: 'Not recorded' };
  const days = Math.ceil(
    (new Date(`${date.slice(0, 10)}T12:00:00`).getTime() - Date.now()) / 86_400_000
  );
  if (days < 0) return { tone: 'red', label: `Expired ${fmtDay(date)}` };
  if (days <= 30) return { tone: 'amber', label: `${days} day${days === 1 ? '' : 's'} left` };
  return { tone: 'emerald', label: `To ${fmtDay(date)}` };
}

export function rpcErrorMessage(e: unknown): string {
  const msg = (e as { message?: string })?.message ?? 'Something went wrong';
  if (msg.includes('rate_missing')) return 'Set their day or hourly rate first.';
  if (msg.includes('run_changed'))
    return 'Something changed since you opened this. Refresh and try again.';
  if (msg.includes('nothing_to_bill')) return 'There are no approved days to bill.';
  if (msg.includes('too_late')) return 'A statement can only be voided within 48 hours.';
  if (msg.includes('not_allowed')) return 'Only the owner or an admin can do that.';
  if (msg.includes('period_invalid')) return 'Pick a period of up to two months.';
  if (msg.includes('utr')) return 'A UTR is 10 digits.';
  return msg;
}

/* ── Reads ─────────────────────────────────────────────────────────────── */

async function actingFirm(userId: string): Promise<string> {
  return (await getActingEmployerId(userId)) ?? userId;
}

export function useSubcontractorRun(start: string, end: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['subcontractor-run', user?.id, start, end],
    enabled: !!user,
    queryFn: async (): Promise<SubcontractorRun & { firm: string }> => {
      const firm = await actingFirm(user!.id);
      const { data, error } = await supabase.rpc('get_subcontractor_run' as never, {
        p_firm: firm,
        p_start: start,
        p_end: end,
      } as never);
      if (error) throw error;
      return { ...(data as unknown as SubcontractorRun), firm };
    },
  });
}

/** Non-money details for one roster row (team sheet). */
export function useSubcontractorDetails(rosterId: string | null | undefined) {
  return useQuery({
    queryKey: ['subcontractor-details', rosterId],
    enabled: !!rosterId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_subcontractor_details' as never)
        .select('*')
        .eq('roster_id', rosterId!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as Partial<SubcontractorRow> | null;
    },
  });
}

/** Money terms for one roster row; RLS returns nothing to office managers. */
export function useSubcontractorTerms(rosterId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['subcontractor-terms', rosterId],
    enabled: !!rosterId && enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_subcontractor_terms' as never)
        .select('*')
        .eq('roster_id', rosterId!)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as SubcontractorTerms | null;
    },
  });
}

/* ── Writes ────────────────────────────────────────────────────────────── */

function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    for (const key of ['subcontractor-run', 'subcontractor-details', 'subcontractor-terms', 'my-subcontractor-summary']) {
      qc.invalidateQueries({ queryKey: [key] });
    }
  };
}

export interface DetailsInput {
  trade?: string | null;
  trading_name?: string | null;
  insurance_provider?: string | null;
  insurance_policy_number?: string | null;
  insurance_cover_amount?: number | null;
  insurance_expiry?: string | null;
}

export async function saveSubcontractorDetails(rosterId: string, input: DetailsInput) {
  const { error } = await supabase
    .from('employer_subcontractor_details' as never)
    // employer_id is filled from the roster row by trigger (tg_subcontractor_row_firm).
    .upsert({ roster_id: rosterId, ...input } as never, {
      onConflict: 'roster_id',
    });
  if (error) throw error;
}

export interface TermsInput {
  rate_basis?: RateBasis;
  rate?: number | null;
  cis_status?: CisStatus;
  cis_verification_number?: string | null;
  cis_verified_on?: string | null;
  utr?: string | null;
  vat_registered?: boolean;
  vat_number?: string | null;
}

export async function saveSubcontractorTerms(rosterId: string, input: TermsInput) {
  const { error } = await supabase
    .from('employer_subcontractor_terms' as never)
    .upsert({ roster_id: rosterId, ...input } as never, {
      onConflict: 'roster_id',
    });
  if (error) throw error;
}

export function useSaveSubcontractor() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async ({
      rosterId,
      details,
      terms,
    }: {
      rosterId: string;
      details?: DetailsInput;
      terms?: TermsInput;
    }) => {
      if (details) await saveSubcontractorDetails(rosterId, details);
      if (terms) await saveSubcontractorTerms(rosterId, terms);
    },
    onSuccess: invalidate,
  });
}

export function useSaveCisSettings() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async ({
      firm,
      employer_tax_reference,
      accounts_office_reference,
    }: {
      firm: string;
      employer_tax_reference: string | null;
      accounts_office_reference: string | null;
    }) => {
      const { error } = await supabase
        .from('employer_cis_settings' as never)
        .upsert(
          { employer_id: firm, employer_tax_reference, accounts_office_reference } as never,
          { onConflict: 'employer_id' }
        );
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

export function useIssueStatement() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (args: {
      firm: string;
      rosterId: string;
      start: string;
      end: string;
      timesheetIds: string[];
      expenseIds: string[];
    }) => {
      const { data, error } = await supabase.rpc('issue_subcontractor_statement' as never, {
        p_firm: args.firm,
        p_roster: args.rosterId,
        p_start: args.start,
        p_end: args.end,
        p_timesheet_ids: args.timesheetIds,
        p_expense_ids: args.expenseIds,
      } as never);
      if (error) throw error;
      return data as unknown as { statement_id: string; statement_number?: string; replayed: boolean };
    },
    onSuccess: invalidate,
  });
}

export function useVoidStatement() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc('void_subcontractor_statement' as never, {
        p_id: id,
      } as never);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });
}

/* ── The subbie's own side ─────────────────────────────────────────────── */

export interface MySubcontractorFirm {
  roster_id: string;
  employer_id: string;
  company_name: string;
  month_days: number;
  month_unbilled_days: number;
  awaiting_days: number;
  statements: SubcontractorStatement[];
}

export function useMySubcontractorSummary() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-subcontractor-summary', user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<MySubcontractorFirm[]> => {
      const { data, error } = await supabase.rpc('get_my_subcontractor_summary' as never);
      if (error) throw error;
      return (data as unknown as MySubcontractorFirm[] | null) ?? [];
    },
  });
}

/* ── CSV export of statements (separate from the PAYE payroll export) ─── */

const csvCell = (v: unknown) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function statementsCsv(statements: SubcontractorStatement[]): string {
  const header = [
    'Statement',
    'Subcontractor',
    'Trading name',
    'UTR',
    'Verification number',
    'Period start',
    'Period end',
    'Days',
    'Hours',
    'Rate basis',
    'Rate',
    'Labour',
    'Other costs',
    'Materials',
    'Gross',
    'Liable to deduction',
    'CIS status',
    'CIS rate',
    'CIS deducted',
    'Net payable',
    'Issued',
  ];
  const rows = statements
    .filter((s) => !s.voided_at)
    .map((s) => [
      s.statement_number,
      s.name,
      s.trading_name,
      s.utr,
      s.cis_verification_number,
      s.period_start,
      s.period_end,
      s.day_count,
      s.hours,
      s.rate_basis,
      Number(s.rate ?? 0).toFixed(2),
      Number(s.labour_amount ?? 0).toFixed(2),
      Number(s.other_costs ?? 0).toFixed(2),
      Number(s.materials_amount ?? 0).toFixed(2),
      Number(s.gross_amount ?? 0).toFixed(2),
      (Number(s.labour_amount ?? 0) + Number(s.other_costs ?? 0)).toFixed(2),
      cisLabel(s.cis_status),
      `${Math.round(Number(s.cis_rate ?? 0) * 100)}%`,
      Number(s.cis_deduction ?? 0).toFixed(2),
      Number(s.net_payable ?? 0).toFixed(2),
      s.issued_at?.slice(0, 10),
    ]);
  return [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
}

export function downloadText(filename: string, text: string, type = 'text/csv') {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
