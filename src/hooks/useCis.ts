/**
 * CIS done properly (ELE-2064): the monthly CIS300 helper, HMRC verification
 * state per subbie, the due-diligence log, and marking a month filed or paid.
 *
 * Everything here is owner/admin only: get_cis_month raises for anyone else,
 * and the two tables are can_see_firm_money under RLS.
 *
 * Rules (gov.uk, checked 10 Oct 2026): the tax month runs 6th to 5th; the
 * CIS300 is due by the 19th, a nil return when nobody was paid; HMRC is paid
 * by the 22nd (19th by post); statements go out within 14 days of the month
 * end; no re-verification if the subbie was on a return in the current or last
 * 2 tax years.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cisLabel, type CisStatus } from '@/hooks/useSubcontractors';

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export interface CisMonthRow {
  roster_id: string;
  name: string;
  trading_name: string | null;
  utr: string | null;
  verification_number: string | null;
  cis_status: CisStatus;
  cis_rate: number;
  statements: number;
  payments: number;
  materials: number;
  deducted: number;
  net_paid: number;
}

export interface CisMonth {
  month_start: string;
  month_end: string;
  ended: boolean;
  statements_by: string;
  return_by: string;
  pay_by: string;
  rows: CisMonthRow[];
  unbilled: { roster_id: string; name: string; days: number }[];
  totals: {
    subcontractors: number;
    statements: number;
    payments: number;
    materials: number;
    deducted: number;
  };
  nil: boolean;
  filing: {
    filed_on: string | null;
    nil_return: boolean;
    submission_reference: string | null;
    paid_on: string | null;
    paid_amount: number | null;
  } | null;
}

export type VerifyState = 'ok' | 'verify_first' | 'not_recorded' | 'reverify';

export interface CisSubbie {
  roster_id: string;
  name: string;
  cis_status: CisStatus;
  utr: string | null;
  verification_number: string | null;
  verified_on: string | null;
  last_paid_on: string | null;
  checks: number;
  last_check_on: string | null;
  concerns: number;
  state: VerifyState;
  reverify_from: string | null;
}

export interface CisOverview {
  month: CisMonth;
  due_now: CisMonth;
  subcontractors: CisSubbie[];
  today: string;
}

export const CIS_KEY = 'cis-month';

export function useCisMonth(firm: string | undefined, start: string, end: string, enabled = true) {
  return useQuery({
    queryKey: [CIS_KEY, firm, start, end],
    enabled: !!firm && enabled,
    queryFn: async (): Promise<CisOverview> => {
      const { data, error } = await rpc('get_cis_month', {
        p_firm: firm,
        p_start: start,
        p_end: end,
      });
      if (error) throw new Error(error.message);
      return data as CisOverview;
    },
    staleTime: 30_000,
  });
}

export type CheckKind =
  | 'verification'
  | 'gps_review'
  | 'vat_number'
  | 'companies_house'
  | 'insurance'
  | 'bank_details'
  | 'references'
  | 'other';

export const CHECK_KINDS: { value: CheckKind; label: string; hint: string }[] = [
  {
    value: 'verification',
    label: 'HMRC verification',
    hint: 'You verified them with HMRC online or in your CIS software. Record the rate HMRC gave you.',
  },
  {
    value: 'gps_review',
    label: 'Gross status check',
    hint: 'They are paid gross. Note how you confirmed it is still in place and the work is genuine.',
  },
  {
    value: 'vat_number',
    label: 'VAT number checked',
    hint: 'Checked on the gov.uk VAT number service.',
  },
  {
    value: 'companies_house',
    label: 'Companies House',
    hint: 'Company and directors look right and match who turns up.',
  },
  { value: 'insurance', label: 'Insurance seen', hint: 'You saw their current certificate.' },
  {
    value: 'bank_details',
    label: 'Bank details',
    hint: 'The account is in their own or their company name.',
  },
  {
    value: 'references',
    label: 'References or site visit',
    hint: 'Other firms vouched for them, or you saw their work.',
  },
  { value: 'other', label: 'Other check', hint: 'Anything else you checked.' },
];

export const checkLabel = (k: string) => CHECK_KINDS.find((c) => c.value === k)?.label ?? 'Check';

export interface CisCheck {
  id: string;
  roster_id: string;
  kind: CheckKind;
  checked_on: string;
  outcome: 'ok' | 'concern' | 'failed';
  reference: string | null;
  cis_status: CisStatus | null;
  note: string | null;
  created_at: string;
}

export function useCisChecks(rosterId: string | null | undefined) {
  return useQuery({
    queryKey: ['cis-checks', rosterId],
    enabled: !!rosterId,
    queryFn: async (): Promise<CisCheck[]> => {
      const { data, error } = await supabase
        .from('employer_cis_checks' as never)
        .select('id, roster_id, kind, checked_on, outcome, reference, cis_status, note, created_at')
        .eq('roster_id' as never, rosterId as never)
        .order('checked_on' as never, { ascending: false })
        .order('created_at' as never, { ascending: false });
      if (error) throw new Error(error.message);
      return (data as unknown as CisCheck[]) ?? [];
    },
  });
}

function useInvalidateCis() {
  const qc = useQueryClient();
  return () => {
    for (const key of [
      CIS_KEY,
      'cis-checks',
      'subcontractor-run',
      'subcontractor-terms',
      'cash-forecast',
    ]) {
      qc.invalidateQueries({ queryKey: [key] });
    }
  };
}

export function useRecordCisCheck() {
  const invalidate = useInvalidateCis();
  return useMutation({
    mutationFn: async (args: {
      rosterId: string;
      kind: CheckKind;
      checkedOn: string;
      outcome: 'ok' | 'concern' | 'failed';
      reference?: string | null;
      cisStatus?: CisStatus | null;
      note?: string | null;
    }) => {
      const { error } = await rpc('record_cis_check', {
        p_roster: args.rosterId,
        p_kind: args.kind,
        p_checked_on: args.checkedOn,
        p_outcome: args.outcome,
        p_reference: args.reference ?? null,
        p_cis_status: args.kind === 'verification' ? (args.cisStatus ?? null) : null,
        p_note: args.note ?? null,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
  });
}

export function useSaveCisReturn() {
  const invalidate = useInvalidateCis();
  return useMutation({
    mutationFn: async (args: {
      firm: string;
      monthEnd: string;
      filedOn: string | null;
      nilReturn: boolean;
      reference: string | null;
      paidOn: string | null;
      paidAmount: number | null;
    }) => {
      const { error } = await rpc('save_cis_return', {
        p_firm: args.firm,
        p_tax_month_end: args.monthEnd,
        p_filed_on: args.filedOn,
        p_nil_return: args.nilReturn,
        p_submission_reference: args.reference,
        p_paid_on: args.paidOn,
        p_paid_amount: args.paidAmount,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
  });
}

export function cisErrorMessage(e: unknown): string {
  const msg = (e as { message?: string })?.message ?? 'Something went wrong';
  if (msg.includes('not_allowed')) return 'Only the owner or an admin can do that.';
  if (msg.includes('status_required')) return 'Pick the rate HMRC gave you.';
  if (msg.includes('date_in_future')) return 'The date cannot be in the future.';
  if (msg.includes('period_invalid')) return 'That is not a CIS tax month.';
  return msg;
}

/* ── Verification wording ─────────────────────────────────────────────── */

const CIS_RATE: Record<string, number> = { gross: 0, standard: 0.2, higher: 0.3, unverified: 0.3 };

export function verifyCopy(s: CisSubbie): {
  tone: 'red' | 'yellow' | 'done';
  pill: string;
  line: string;
} {
  const on = (d: string | null) =>
    d
      ? new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '';
  switch (s.state) {
    case 'verify_first':
      return {
        tone: 'yellow',
        pill: 'Verify first',
        line: 'Verify them with HMRC before you pay them. Until then deduct 30%.',
      };
    case 'reverify':
      return {
        tone: 'red',
        pill: 'Verify again',
        line: `Not on a return since ${on(s.last_paid_on ?? s.verified_on)}, more than 2 tax years ago. Verify them again before the next payment.`,
      };
    case 'not_recorded':
      return {
        tone: 'yellow',
        pill: 'No record',
        line: `Paid with ${Math.round((CIS_RATE[s.cis_status] ?? 0.3) * 100)}% off and no HMRC verification on file. Record the check.`,
      };
    default:
      return {
        tone: 'done',
        pill: 'Verified',
        line: `${cisLabel(s.cis_status)}, verified ${on(s.verified_on)}${s.verification_number ? ` · ${s.verification_number}` : ''}`,
      };
  }
}

/* ── CIS300 export ────────────────────────────────────────────────────── */

const csvCell = (v: unknown) => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/**
 * One row per subcontractor in the order the CIS300 asks for them. HMRC's CIS
 * online service is filled in by hand and accepts no upload, and Basic PAYE
 * Tools does not file CIS returns; commercial CIS software and bookkeepers take
 * this CSV. The verification number is only required for higher-rate subbies.
 */
export function cis300Csv(
  month: CisMonth,
  refs: { employerRef: string | null; accountsOfficeRef: string | null }
): string {
  const header = [
    'Tax month start',
    'Tax month end',
    'Employer reference',
    'Accounts office reference',
    'Subcontractor',
    'Trading name',
    'UTR',
    'Verification number',
    'Deduction rate',
    'Total payments (excluding VAT)',
    'Cost of materials',
    'Amount deducted',
  ];
  const rows = month.rows.map((r) => [
    month.month_start,
    month.month_end,
    refs.employerRef,
    refs.accountsOfficeRef,
    r.name,
    r.trading_name,
    r.utr,
    Number(r.cis_rate) >= 0.3 ? r.verification_number : '',
    `${Math.round(Number(r.cis_rate) * 100)}%`,
    Number(r.payments).toFixed(2),
    Number(r.materials).toFixed(2),
    Number(r.deducted).toFixed(2),
  ]);
  const total = [
    month.month_start,
    month.month_end,
    refs.employerRef,
    refs.accountsOfficeRef,
    month.nil ? 'NIL RETURN: no payments this month' : 'TOTAL',
    '',
    '',
    '',
    '',
    Number(month.totals.payments).toFixed(2),
    Number(month.totals.materials).toFixed(2),
    Number(month.totals.deducted).toFixed(2),
  ];
  return [header, ...rows, total].map((r) => r.map(csvCell).join(',')).join('\n');
}

const shortDay = (d: string) =>
  new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

/** The month whose return matters now: the selected one if it has ended, else the last one that has. */
export function returnMonth(data: CisOverview | undefined): CisMonth | undefined {
  if (!data) return undefined;
  return data.month.ended ? data.month : data.due_now;
}

/** One line for the page hero about the return that is due, or null. */
export function cisHeroBit(data: CisOverview | undefined): string | null {
  const m = data?.due_now;
  if (!m || !data) return null;
  const today = data.today;
  if (today > m.pay_by) return null;
  if (!m.filing?.filed_on && today <= m.return_by)
    return m.nil
      ? `nil CIS return due ${shortDay(m.return_by)}`
      : `CIS300 due ${shortDay(m.return_by)}`;
  if (!m.filing?.filed_on) return 'CIS300 late';
  if (Number(m.totals.deducted) > 0 && !m.filing?.paid_on)
    return `CIS to pay HMRC by ${shortDay(m.pay_by)}`;
  return null;
}
