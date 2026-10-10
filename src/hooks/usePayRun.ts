/**
 * Data for the one pay run (gap #4). Reads and the minimum wage gate live in
 * SQL (migration 20261010281000):
 *   send_pay_run()           minimum wage check, send_payroll_run, the 6-year
 *                            holiday record and the preset, in one transaction
 *   get_firm_holiday_bases() holiday basis and payroll ID for the firm scope
 *                            (no date of birth, no pay), for hours-only runs
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { payrollErrorMessage } from '@/hooks/useFirmAccounting';
import type { HolidayBasis } from '@/lib/payLaw';
import type { PayPresetId } from '@/services/payRun';

const rpc = async <T>(fn: string, args: Record<string, unknown>): Promise<T> => {
  // Cast: these RPCs postdate the last types.ts regeneration.
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) throw error;
  return data as unknown as T;
};

export interface HolidayBasisRow {
  basis: HolidayBasis;
  rolledUp: boolean;
  payrollId: string | null;
}

export function useFirmHolidayBases(firmId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['firm-holiday-bases', firmId],
    enabled: !!firmId && enabled,
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<Map<string, HolidayBasisRow>> => {
      const rows = await rpc<
        Array<{
          employee_id: string;
          holiday_basis: string;
          rolled_up_holiday: boolean;
          payroll_id: string | null;
        }>
      >('get_firm_holiday_bases', { p_firm: firmId });
      const map = new Map<string, HolidayBasisRow>();
      (rows ?? []).forEach((r) =>
        map.set(r.employee_id, {
          basis: (r.holiday_basis as HolidayBasis) ?? 'fixed',
          rolledUp: !!r.rolled_up_holiday,
          payrollId: r.payroll_id ?? null,
        })
      );
      return map;
    },
  });
}

export interface RunMeta {
  preset: string | null;
  holidayRows: number | null;
  exportedAt: string;
  periodStart: string;
  periodEnd: string;
  /** SSP days carried per person (days only). */
  ssp: Record<string, number>;
}

/** Preset and pay-law facts of past runs (the old run list predates them). RLS: the firm scope. */
export function useRunPresets(ids: string[]) {
  return useQuery({
    queryKey: ['pay-run-presets', ids.slice().sort().join(',')],
    enabled: ids.length > 0,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<Map<string, RunMeta>> => {
      const { data, error } = await supabase
        .from('employer_payroll_exports' as never)
        .select('id, preset, holiday_rows, pay_check, exported_at, period_start, period_end')
        .in('id', ids);
      if (error) throw error;
      const map = new Map<string, RunMeta>();
      (
        (data ?? []) as Array<{
          id: string;
          preset: string | null;
          holiday_rows: number | null;
          pay_check: { ssp?: Record<string, number> } | null;
          exported_at: string;
          period_start: string;
          period_end: string;
        }>
      ).forEach((r) =>
        map.set(r.id, {
          preset: r.preset,
          holidayRows: r.holiday_rows,
          exportedAt: r.exported_at,
          periodStart: r.period_start,
          periodEnd: r.period_end,
          ssp: r.pay_check?.ssp ?? {},
        })
      );
      return map;
    },
  });
}

export interface RunHolidayLine {
  employeeId: string;
  sourceId: string;
  kind: string;
  period_start: string | null;
  period_end: string | null;
  hours: number | null;
  amount: number | null;
  days: number | null;
}

/** Holiday record lines written by these runs. Owner/admin only (RLS); others get none. */
export function useRunHolidayLines(ids: string[], enabled: boolean) {
  return useQuery({
    queryKey: ['pay-run-holiday-lines', ids.slice().sort().join(',')],
    enabled: enabled && ids.length > 0,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<RunHolidayLine[]> => {
      const { data, error } = await supabase
        .from('employer_holiday_records' as never)
        .select('employee_id, source_id, kind, period_start, period_end, hours, amount, days')
        .eq('source', 'pay_run')
        .in('source_id', ids);
      if (error) throw error;
      return (
        (data ?? []) as Array<{
          employee_id: string;
          source_id: string;
          kind: string;
          period_start: string | null;
          period_end: string | null;
          hours: number | string | null;
          amount: number | string | null;
          days: number | string | null;
        }>
      ).map((r) => ({
        employeeId: r.employee_id,
        sourceId: r.source_id,
        kind: r.kind,
        period_start: r.period_start,
        period_end: r.period_end,
        hours: r.hours == null ? null : Number(r.hours),
        amount: r.amount == null ? null : Number(r.amount),
        days: r.days == null ? null : Number(r.days),
      }));
    },
  });
}

export interface SendPayRunResult {
  export_id: string;
  replayed: boolean;
  holiday_rows: number | null;
  preset: PayPresetId | null;
  below?: number;
}

export function useSendPayRun() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: {
      firmId: string;
      start: string;
      end: string;
      preset: PayPresetId;
      timesheetIds: string[];
      expenseIds: string[];
      holidayRows: Array<Record<string, unknown>>;
      payCheck: {
        no_birth_date: number;
        override_reason: string | null;
        ssp: Record<string, number>;
      };
    }) =>
      rpc<SendPayRunResult>('send_pay_run', {
        p_firm: v.firmId,
        p_start: v.start,
        p_end: v.end,
        p_preset: v.preset,
        p_timesheet_ids: v.timesheetIds,
        p_expense_ids: v.expenseIds,
        p_holiday_rows: v.holidayRows,
        p_pay_check: v.payCheck,
      }),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['payroll-run'] });
      qc.invalidateQueries({ queryKey: ['firm-accounting'] });
      qc.invalidateQueries({ queryKey: ['my-payroll-exports'] });
      qc.invalidateQueries({ queryKey: ['timesheets'] });
      qc.invalidateQueries({ queryKey: ['expense_claims'] });
      qc.invalidateQueries({ queryKey: ['holiday-records'] });
      qc.invalidateQueries({ queryKey: ['pay-run-presets'] });
      qc.invalidateQueries({ queryKey: ['pay-run-holiday-lines'] });
    },
  });
}

/** Plain words for the pay run's own errors, then the run's shared ones. */
export function payRunErrorMessage(e: unknown): string {
  const err = e as { message?: string; details?: string };
  const msg = err?.message ?? '';
  if (msg.includes('below_minimum'))
    return `${err.details ? `${err.details}: ` : ''}paid below the legal minimum. Fix the rate in Team, or give a reason to send anyway.`;
  if (msg.includes('pay_check_needed'))
    return 'Someone in this run is paid below the legal minimum. Ask the owner or an admin to check it before it is sent.';
  if (msg.includes('preset_invalid')) return 'Pick which payroll software the file is for.';
  return payrollErrorMessage(e);
}

/** Put a run back: entries can be sent again, and the holiday lines it wrote go too. */
export function useUndoPayRun() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (exportId: string) =>
      rpc<{ timesheets: number; expenses: number; holiday_removed: number }>('undo_pay_run', {
        p_export: exportId,
      }),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['payroll-run'] });
      qc.invalidateQueries({ queryKey: ['firm-accounting'] });
      qc.invalidateQueries({ queryKey: ['my-payroll-exports'] });
      qc.invalidateQueries({ queryKey: ['holiday-records'] });
      qc.invalidateQueries({ queryKey: ['pay-run-presets'] });
      qc.invalidateQueries({ queryKey: ['pay-run-holiday-lines'] });
    },
  });
}
