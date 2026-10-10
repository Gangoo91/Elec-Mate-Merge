/**
 * Data for the pay-law features (ELE-2062 holiday and sick pay, ELE-2063
 * apprentice pay and money). The maths lives in src/lib/payLaw.ts.
 *
 * Tables (migration 20261010170000):
 *   employer_employee_pay_profiles  owner/admin only (date of birth etc.)
 *   employer_sickness_records       owner/admin; the worker reads their own
 *   employer_holiday_records        6-year record; insert-only through functions
 *   statutory_pay_rates             NMW and SSP rates by date
 */
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, format, parseISO } from 'date-fns';
import { useFirmPaySettings, useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { payPeriodContaining } from '@/utils/payPeriods';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import {
  FALLBACK_RATES,
  isoWeekOf,
  type HolidayBasis,
  type StatutoryRate,
  type TimeEntry,
} from '@/lib/payLaw';

// These tables and functions postdate the generated Supabase types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export interface PayProfile {
  employeeId: string;
  employerId: string;
  dateOfBirth: string | null;
  apprenticeshipStart: string | null;
  /** Last day of the apprenticeship (null = still on it). NMW Regs 2015 reg 5. */
  apprenticeshipEnd: string | null;
  holidayBasis: HolidayBasis;
  rolledUp: boolean;
  careLeaver: boolean;
  ehcp: boolean;
  /** Works number / payroll ID in the payroll package (gap #4). */
  payrollId: string | null;
  updatedAt: string | null;
}

const PROFILES_KEY = ['pay-profiles'];

function mapProfile(r: Record<string, unknown>): PayProfile {
  return {
    employeeId: String(r.employee_id),
    employerId: String(r.employer_id),
    dateOfBirth: (r.date_of_birth as string) ?? null,
    apprenticeshipStart: (r.apprenticeship_start_date as string) ?? null,
    apprenticeshipEnd: (r.apprenticeship_end_date as string) ?? null,
    holidayBasis: ((r.holiday_basis as string) ?? 'fixed') as HolidayBasis,
    rolledUp: !!r.rolled_up_holiday,
    careLeaver: !!r.care_leaver_declared,
    ehcp: !!r.ehcp_declared,
    payrollId: (r.payroll_id as string) ?? null,
    updatedAt: (r.updated_at as string) ?? null,
  };
}

/** Every pay profile the signed-in owner/admin can see (RLS scopes it). */
export function usePayProfiles(enabled = true) {
  return useQuery({
    queryKey: PROFILES_KEY,
    enabled,
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<Map<string, PayProfile>> => {
      const { data, error } = await db.from('employer_employee_pay_profiles').select('*');
      if (error) throw error;
      const map = new Map<string, PayProfile>();
      ((data ?? []) as Record<string, unknown>[]).forEach((r) => {
        const p = mapProfile(r);
        map.set(p.employeeId, p);
      });
      return map;
    },
  });
}

export function useSavePayProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: {
      employeeId: string;
      dateOfBirth?: string | null;
      apprenticeshipStart?: string | null;
      apprenticeshipEnd?: string | null;
      holidayBasis?: HolidayBasis;
      rolledUp?: boolean;
      careLeaver?: boolean;
      ehcp?: boolean;
      payrollId?: string | null;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const employerId = await getActingEmployerId(user?.id ?? null);
      if (!employerId) throw new Error('Could not work out which firm this is for');
      const row: Record<string, unknown> = { employee_id: v.employeeId, employer_id: employerId };
      if (v.dateOfBirth !== undefined) row.date_of_birth = v.dateOfBirth || null;
      if (v.apprenticeshipStart !== undefined)
        row.apprenticeship_start_date = v.apprenticeshipStart || null;
      if (v.apprenticeshipEnd !== undefined)
        row.apprenticeship_end_date = v.apprenticeshipEnd || null;
      if (v.holidayBasis !== undefined) row.holiday_basis = v.holidayBasis;
      if (v.rolledUp !== undefined) row.rolled_up_holiday = v.rolledUp;
      if (v.careLeaver !== undefined) row.care_leaver_declared = v.careLeaver;
      if (v.ehcp !== undefined) row.ehcp_declared = v.ehcp;
      if (v.payrollId !== undefined) row.payroll_id = v.payrollId?.trim().slice(0, 40) || null;
      const { error } = await db
        .from('employer_employee_pay_profiles')
        .upsert(row, { onConflict: 'employee_id' });
      if (error) {
        if (String(error.message).includes('pay_profile_rolled_up_only_irregular')) {
          throw new Error('Rolled-up holiday pay is only for irregular-hours or part-year workers');
        }
        if (
          String(error.code) === '42501' ||
          String(error.message).includes('row-level security')
        ) {
          throw new Error('Only the owner or an admin can change this');
        }
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILES_KEY });
      qc.invalidateQueries({ queryKey: ['young-workers'] });
      qc.invalidateQueries({ queryKey: ['my-holiday-basis'] });
      qc.invalidateQueries({ queryKey: ['firm-holiday-bases'] });
    },
  });
}

/** NMW and SSP rates by date. Falls back to the built-in copy if the read fails. */
export function useStatutoryRates() {
  const q = useQuery({
    queryKey: ['statutory-pay-rates'],
    staleTime: 60 * 60 * 1000,
    queryFn: async (): Promise<StatutoryRate[]> => {
      const { data, error } = await db
        .from('statutory_pay_rates')
        .select('key, effective_from, amount');
      if (error) throw error;
      const rows = (
        (data ?? []) as Array<{ key: string; effective_from: string; amount: number | string }>
      ).map(
        (r) =>
          ({
            key: r.key,
            effective_from: r.effective_from,
            amount: Number(r.amount),
          }) as StatutoryRate
      );
      return rows.length ? rows : FALLBACK_RATES;
    },
  });
  return q.data ?? FALLBACK_RATES;
}

/** Under-18s on the team: employee id → the date they turn 18. Office managers can read it. */
export function useYoungWorkers() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['young-workers', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Map<string, string>> => {
      const firm = (await getActingEmployerId(user!.id)) ?? user!.id;
      const { data, error } = await db.rpc('get_young_workers', { p_firm: firm });
      if (error) throw error;
      const map = new Map<string, string>();
      ((data ?? []) as Array<{ employee_id: string; adult_from: string }>).forEach((r) =>
        map.set(r.employee_id, r.adult_from)
      );
      return map;
    },
  });
}

/** The signed-in worker's own holiday basis (no date of birth). */
export function useMyHolidayBasis(employeeId: string | null | undefined) {
  return useQuery({
    queryKey: ['my-holiday-basis', employeeId],
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<{ basis: HolidayBasis; rolledUp: boolean }> => {
      const { data, error } = await db.rpc('get_my_holiday_basis');
      if (error) throw error;
      const row = (
        (data ?? []) as Array<{
          employee_id: string;
          holiday_basis: string;
          rolled_up_holiday: boolean;
        }>
      ).find((r) => r.employee_id === employeeId);
      return {
        basis: ((row?.holiday_basis as HolidayBasis) ?? 'fixed') as HolidayBasis,
        rolledUp: !!row?.rolled_up_holiday,
      };
    },
  });
}

/**
 * Approved hours since a date. One person (`employeeId`) or the whole firm
 * (RLS scopes it). Pages through, because two years for a team is well over
 * the 1,000-row default.
 */
export function useApprovedHours(opts: {
  employeeId?: string | null;
  since: string;
  enabled?: boolean;
}) {
  const { employeeId, since, enabled = true } = opts;
  return useQuery({
    queryKey: ['approved-hours', employeeId ?? 'firm', since],
    enabled: enabled && (employeeId === undefined || !!employeeId),
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<Map<string, Array<TimeEntry & { breakMins: number }>>> => {
      const out = new Map<string, Array<TimeEntry & { breakMins: number }>>();
      const page = 1000;
      for (let from = 0; from < 60000; from += page) {
        let q = supabase
          .from('employer_timesheets')
          .select('employee_id, date, total_hours, break_minutes')
          .eq('status', 'Approved')
          .gte('date', since)
          .order('date', { ascending: true })
          .order('id', { ascending: true })
          .range(from, from + page - 1);
        if (employeeId) q = q.eq('employee_id', employeeId);
        const { data, error } = await q;
        if (error) throw error;
        (data ?? []).forEach((r) => {
          const list = out.get(r.employee_id) ?? [];
          list.push({
            date: String(r.date).slice(0, 10),
            hours: Number(r.total_hours ?? 0),
            breakMins: Number(r.break_minutes ?? 0),
          });
          out.set(r.employee_id, list);
        });
        if (!data || data.length < page) break;
      }
      return out;
    },
  });
}

/** Two years back from today, for the 52-week reference (it may look back 104 weeks). */
export const twoYearsBack = () => format(addDays(new Date(), -7 * 106), 'yyyy-MM-dd');

/* ── Sickness records ─────────────────────────────────────────────────── */

export interface SicknessRecord {
  id: string;
  employerId: string;
  employeeId: string;
  leaveRequestId: string | null;
  startDate: string;
  endDate: string | null;
  qualifyingDaysPerWeek: number | null;
  averageWeeklyEarnings: number | null;
  fitNotePath: string | null;
  fitNoteName: string | null;
  fitNoteUntil: string | null;
  fitNoteUploadedAt: string | null;
  rtwDate: string | null;
  rtwFitForFullDuties: boolean | null;
  rtwAdjustments: string | null;
  rtwNotes: string | null;
  rtwRecordedAt: string | null;
}

const num = (v: unknown) => (v == null ? null : Number(v));
function mapSickness(r: Record<string, unknown>): SicknessRecord {
  return {
    id: String(r.id),
    employerId: String(r.employer_id),
    employeeId: String(r.employee_id),
    leaveRequestId: (r.leave_request_id as string) ?? null,
    startDate: String(r.start_date),
    endDate: (r.end_date as string) ?? null,
    qualifyingDaysPerWeek: num(r.qualifying_days_per_week),
    averageWeeklyEarnings: num(r.average_weekly_earnings),
    fitNotePath: (r.fit_note_path as string) ?? null,
    fitNoteName: (r.fit_note_name as string) ?? null,
    fitNoteUntil: (r.fit_note_until as string) ?? null,
    fitNoteUploadedAt: (r.fit_note_uploaded_at as string) ?? null,
    rtwDate: (r.rtw_date as string) ?? null,
    rtwFitForFullDuties: (r.rtw_fit_for_full_duties as boolean) ?? null,
    rtwAdjustments: (r.rtw_adjustments as string) ?? null,
    rtwNotes: (r.rtw_notes as string) ?? null,
    rtwRecordedAt: (r.rtw_recorded_at as string) ?? null,
  };
}

const SICK_KEY = ['sickness-records'];

/** Sickness records keyed by leave request id. Owner/admin see the firm; a worker sees their own. */
export function useSicknessRecords(enabled = true) {
  return useQuery({
    queryKey: SICK_KEY,
    enabled,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<Map<string, SicknessRecord>> => {
      const { data, error } = await db
        .from('employer_sickness_records')
        .select('*')
        .order('start_date', { ascending: false })
        .limit(1000);
      if (error) throw error;
      const map = new Map<string, SicknessRecord>();
      ((data ?? []) as Record<string, unknown>[]).forEach((r) => {
        const s = mapSickness(r);
        if (s.leaveRequestId) map.set(s.leaveRequestId, s);
      });
      return map;
    },
  });
}

export function useSaveSickness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: {
      leaveRequestId: string;
      employeeId: string;
      startDate: string;
      endDate: string;
      patch: Partial<{
        qualifying_days_per_week: number | null;
        average_weekly_earnings: number | null;
        fit_note_path: string | null;
        fit_note_name: string | null;
        fit_note_until: string | null;
        fit_note_uploaded_at: string | null;
        fit_note_uploaded_by: string | null;
        rtw_date: string | null;
        rtw_fit_for_full_duties: boolean | null;
        rtw_adjustments: string | null;
        rtw_notes: string | null;
        rtw_recorded_by: string | null;
        rtw_recorded_at: string | null;
      }>;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const employerId = await getActingEmployerId(user?.id ?? null);
      if (!employerId) throw new Error('Could not work out which firm this is for');
      const { error } = await db.from('employer_sickness_records').upsert(
        {
          employer_id: employerId,
          employee_id: v.employeeId,
          leave_request_id: v.leaveRequestId,
          start_date: v.startDate,
          end_date: v.endDate,
          ...v.patch,
        },
        { onConflict: 'leave_request_id' }
      );
      if (error) {
        if (
          String(error.code) === '42501' ||
          String(error.message).includes('row-level security')
        ) {
          throw new Error('Only the owner or an admin can change sickness records');
        }
        throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: SICK_KEY }),
  });
}

/* ── Office managers and sickness (gap 3C #33) ──────────────────────────
 * Recording an absence is an office task, so the office attaches the fit note
 * and sets the dates through two RPCs (my_employer_scope). Pay (earnings,
 * qualifying days, SSP) and the return-to-work notes stay owner/admin: the
 * RPC never returns them, and the fit note file itself is not opened by the
 * office (ICO: health records only for those who need them).
 */
export interface OfficeSicknessRow {
  leaveRequestId: string;
  employeeId: string;
  fitNoteOnFile: boolean;
  fitNoteUntil: string | null;
  fitNoteUploadedAt: string | null;
  rtwDate: string | null;
}

const OFFICE_SICK_KEY = ['sickness-office'];

export function useOfficeSickness(enabled = true) {
  return useQuery({
    queryKey: OFFICE_SICK_KEY,
    enabled,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<Map<string, OfficeSicknessRow>> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const firm = await getActingEmployerId(user?.id ?? null);
      const { data, error } = await db.rpc('sickness_office_rows', { p_firm: firm });
      if (error) throw error;
      const map = new Map<string, OfficeSicknessRow>();
      ((data ?? []) as Record<string, unknown>[]).forEach((r) => {
        map.set(String(r.leave_request_id), {
          leaveRequestId: String(r.leave_request_id),
          employeeId: String(r.employee_id),
          fitNoteOnFile: !!r.fit_note_on_file,
          fitNoteUntil: (r.fit_note_until as string) ?? null,
          fitNoteUploadedAt: (r.fit_note_uploaded_at as string) ?? null,
          rtwDate: (r.rtw_date as string) ?? null,
        });
      });
      return map;
    },
  });
}

export function useOfficeSaveSickness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: {
      leaveRequestId: string;
      fitNoteUntil: string | null;
      rtwDate: string | null;
      file?: File | null;
    }) => {
      let path: string | null = null;
      if (v.file) path = await uploadFitNote(v.file, v.leaveRequestId);
      const { error } = await db.rpc('sickness_office_save', {
        p_leave_request: v.leaveRequestId,
        p_fit_note_until: v.fitNoteUntil,
        p_rtw_date: v.rtwDate,
        p_fit_note_path: path,
        p_fit_note_name: v.file ? v.file.name.slice(0, 200) : null,
      });
      if (error) {
        // The upload has nothing pointing at it; the uploader may delete it.
        if (path) await supabase.storage.from('fit-notes').remove([path]);
        const m = String(error.message);
        if (m.includes('rtw_before_start'))
          throw new Error('Back at work must be on or after the first day off');
        if (m.includes('until_before_start'))
          throw new Error('The fit note date must be on or after the first day off');
        if (m.includes('not_allowed')) throw new Error('Only the office can record this');
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: OFFICE_SICK_KEY });
      qc.invalidateQueries({ queryKey: SICK_KEY });
    },
  });
}

/** Upload a fit note to the private bucket, under the uploader's own folder. */
export async function uploadFitNote(file: File, leaveRequestId: string): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  if (file.size > 10 * 1024 * 1024) throw new Error('That file is over 10 MB');
  const ext = (file.name.split('.').pop() || file.type.split('/')[1] || 'pdf')
    .toLowerCase()
    .slice(0, 5);
  const path = `${user.id}/${leaveRequestId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('fit-notes')
    .upload(path, file, { contentType: file.type || 'application/pdf', upsert: false });
  if (error) {
    if (String(error.message).toLowerCase().includes('mime')) {
      throw new Error('Use a photo or a PDF');
    }
    throw error;
  }
  return path;
}

/** The worker sends their own fit note (Worker Tools). */
export function useAttachMyFitNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { leaveRequestId: string; file: File; until?: string | null }) => {
      const path = await uploadFitNote(v.file, v.leaveRequestId);
      const { error } = await db.rpc('attach_my_fit_note', {
        p_leave_request: v.leaveRequestId,
        p_path: path,
        p_name: v.file.name.slice(0, 200),
        p_until: v.until || null,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: SICK_KEY }),
  });
}

/* ── The 6-year holiday record ────────────────────────────────────────── */

export interface HolidayRecordRow {
  id: string;
  employeeId: string;
  employeeName: string | null;
  kind: string;
  periodStart: string | null;
  periodEnd: string | null;
  days: number | null;
  hours: number | null;
  amount: number | null;
  basis: string | null;
  method: string | null;
  isEstimate: boolean;
  createdAt: string;
}

export function useHolidayRecords(employeeId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['holiday-records', employeeId],
    enabled: enabled && !!employeeId,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<HolidayRecordRow[]> => {
      const since = format(addDays(new Date(), -366 * 6 - 2), 'yyyy-MM-dd');
      const { data, error } = await db
        .from('employer_holiday_records')
        .select('*')
        .eq('employee_id', employeeId)
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(5000);
      if (error) throw error;
      return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
        id: String(r.id),
        employeeId: String(r.employee_id),
        employeeName: (r.employee_name as string) ?? null,
        kind: String(r.kind),
        periodStart: (r.period_start as string) ?? null,
        periodEnd: (r.period_end as string) ?? null,
        days: num(r.days),
        hours: num(r.hours),
        amount: num(r.amount),
        basis: (r.basis as string) ?? null,
        method: (r.method as string) ?? null,
        isEstimate: !!r.is_estimate,
        createdAt: String(r.created_at),
      }));
    },
  });
}

/** Write accrual / holiday pay rows when the payroll file is made. Never blocks the file. */
export async function recordHolidayPeriod(
  firmId: string,
  rows: Array<Record<string, unknown>>
): Promise<void> {
  if (rows.length === 0) return;
  const { error } = await db.rpc('record_holiday_period', { p_firm: firmId, p_rows: rows });
  if (error) console.error('[recordHolidayPeriod]', error);
}

/* ── Pay periods and allowances ───────────────────────────────────── */

const isoDay = (d: Date) => format(d, 'yyyy-MM-dd');

/** The firm's pay period for a date, or a Monday–Sunday week when none is set. */
export function usePeriodOf() {
  const { data: firmId } = useOfficeFirmId();
  const { data: settings } = useFirmPaySettings(firmId);
  return useMemo(
    () => (date: string) => {
      const p = payPeriodContaining(settings ?? null, parseISO(date));
      // The payday is used for the SSP relevant period (reg 19).
      return p
        ? { start: isoDay(p.start), end: isoDay(p.end), payday: isoDay(p.payday) }
        : isoWeekOf(date);
    },
    [settings]
  );
}

export function useAllAllowances(employeeId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['holiday-allowances-all-years', employeeId],
    enabled: enabled && !!employeeId,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_holiday_allowances')
        .select('*')
        .eq('employee_id', employeeId as string)
        .order('year', { ascending: true });
      if (error) throw error;
      return (data ?? []) as Array<{
        year: number;
        total_days: number;
        carried_over: number | null;
        used_days: number | null;
        days_per_week?: number | null;
        updated_at: string | null;
      }>;
    },
  });
}
