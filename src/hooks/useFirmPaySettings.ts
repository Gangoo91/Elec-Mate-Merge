/**
 * Firm pay settings (pay period, payday, mileage rate) and the payroll export
 * log — ELE-2001 / ELE-2009.
 *
 * Reads go through get_firm_pay_settings (settings only, no money) so the
 * office AND the firm's own active workers can see them; writes go through the
 * owner/admin-only setters, because company_profiles UPDATE RLS is owner-only.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import type { FirmPaySettings, PayFrequency } from '@/utils/payPeriods';

/** HMRC approved mileage allowance payments (cars and vans). */
export const HMRC_MILEAGE = { firstPence: 45, afterPence: 25, thresholdMiles: 10000 } as const;

/** The firm the signed-in office user acts for. */
export function useOfficeFirmId() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-firm-id', user?.id],
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

export function useFirmPaySettings(firmId: string | null | undefined) {
  return useQuery({
    queryKey: ['firm-pay-settings', firmId],
    enabled: !!firmId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<FirmPaySettings> => {
      const { data, error } = await supabase.rpc(
        'get_firm_pay_settings' as never,
        { p_firm: firmId } as never
      );
      if (error) throw error;
      const raw = (data ?? {}) as Partial<FirmPaySettings>;
      return {
        has_profile: !!raw.has_profile,
        pay_frequency: (raw.pay_frequency as PayFrequency | null) ?? null,
        pay_period_anchor: raw.pay_period_anchor ?? null,
        payday_offset_days: raw.payday_offset_days ?? null,
        payday_day_of_month: raw.payday_day_of_month ?? null,
        payday_next_month: raw.payday_next_month ?? null,
        mileage_rate_pence:
          raw.mileage_rate_pence == null ? null : Number(raw.mileage_rate_pence),
      };
    },
  });
}

const friendlyError = (e: unknown) => {
  const msg = (e as { message?: string })?.message ?? '';
  if (msg.includes('no_company_profile')) return 'Set up your company profile first.';
  if (msg.includes('not_allowed')) return 'Only the owner or an admin can change this.';
  if (msg.includes('invalid') || msg.includes('out_of_range')) return 'Those settings are not valid.';
  return 'Could not save. Check your connection and try again.';
};

export function useSetFirmPaySettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: {
      firmId: string;
      frequency: PayFrequency | null;
      anchor: string | null;
      offsetDays: number | null;
      dayOfMonth: number | null;
      nextMonth: boolean | null;
    }) => {
      const { error } = await supabase.rpc(
        'set_firm_pay_settings' as never,
        {
          p_firm: v.firmId,
          p_frequency: v.frequency,
          p_anchor: v.anchor,
          p_offset_days: v.offsetDays,
          p_day_of_month: v.dayOfMonth,
          p_next_month: v.nextMonth,
        } as never
      );
      if (error) throw new Error(friendlyError(error));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-pay-settings'] }),
  });
}

export function useSetFirmMileageRate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { firmId: string; pence: number | null }) => {
      const { error } = await supabase.rpc(
        'set_firm_mileage_rate' as never,
        { p_firm: v.firmId, p_pence: v.pence } as never
      );
      if (error) throw new Error(friendlyError(error));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-pay-settings'] }),
  });
}

export interface PayrollExportRow {
  period_start: string;
  period_end: string;
  exported_at: string;
}

/** When this worker's hours were sent to payroll (dates only, own row only). */
export function useMyPayrollExports(employeeId: string | null | undefined, since?: string) {
  return useQuery({
    queryKey: ['my-payroll-exports', employeeId, since ?? null],
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<PayrollExportRow[]> => {
      const { data, error } = await supabase.rpc(
        'get_my_payroll_exports' as never,
        { p_employee: employeeId, p_since: since ?? null } as never
      );
      if (error) throw error;
      return (data as unknown as PayrollExportRow[] | null) ?? [];
    },
  });
}

/**
 * Log an export of approved hours so each worker can see "sent to payroll on".
 * Never blocks the export itself: a failure here is reported to the console
 * only, because the file has already been saved.
 */
export async function recordPayrollExport(v: {
  firmId: string;
  start: string;
  end: string;
  kind: 'hours' | 'xero' | 'sage' | 'quickbooks' | 'csv';
  employeeIds: string[];
}): Promise<void> {
  const { error } = await supabase.rpc(
    'record_payroll_export' as never,
    {
      p_firm: v.firmId,
      p_start: v.start,
      p_end: v.end,
      p_kind: v.kind,
      p_employee_ids: v.employeeIds,
    } as never
  );
  if (error) console.error('[recordPayrollExport]', error);
}

export interface MileageQuote {
  amount: number;
  rate_source: 'hmrc' | 'firm';
  bands: { miles: number; pence: number }[];
  ytd_miles_before: number | null;
}

/** Server-side mileage amount for this worker (same maths the claim uses). */
export function useMileageQuote(
  employeeId: string | null | undefined,
  miles: number,
  on: string | null,
  excludeClaimId?: string | null
) {
  const valid = !!employeeId && Number.isFinite(miles) && miles > 0 && miles <= 2000;
  const rounded = valid ? Math.round(miles * 10) / 10 : 0;
  return useQuery({
    queryKey: ['mileage-quote', employeeId, rounded, on, excludeClaimId ?? null],
    enabled: valid,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
    queryFn: async (): Promise<MileageQuote> => {
      const { data, error } = await supabase.rpc(
        'mileage_quote' as never,
        {
          p_employee: employeeId,
          p_miles: rounded,
          p_on: on,
          p_exclude: excludeClaimId ?? null,
        } as never
      );
      if (error) throw error;
      const q = data as unknown as MileageQuote;
      return { ...q, amount: Number(q.amount) };
    },
  });
}
