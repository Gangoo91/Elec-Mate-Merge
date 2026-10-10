/**
 * Holiday and SSP columns for the payroll file (ELE-2062).
 *
 * Loads what the figures need only while the export sheet is open: two years
 * of approved hours (the 52-week reference may look back 104 weeks), pay
 * profiles, allowances, leave and sickness records. Then `fieldsFor(id)` gives
 * the extra PayrollEntry fields for one person, and `record(entries)` writes
 * the accrual and holiday pay rows into the 6-year holiday record.
 */
import { useCallback, useMemo } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useTeamAllowances, useTeamLeaveRequests } from '@/hooks/useTeamLeave';
import {
  recordHolidayPeriod,
  twoYearsBack,
  useApprovedHours,
  usePayProfiles,
  useSicknessRecords,
  useStatutoryRates,
  usePeriodOf,
} from '@/hooks/usePayLaw';
import { payrollExtras, type PayrollExtras } from '@/lib/payLaw';
import { useFirmHolidayBases } from '@/hooks/usePayRun';
import type { PayrollEntry } from '@/services/types';

export function usePayrollLaw(opts: {
  enabled: boolean;
  canSeeMoney: boolean;
  windowStart: string;
  windowEnd: string;
  firmId: string | null | undefined;
}) {
  const { enabled, canSeeMoney, windowStart, windowEnd, firmId } = opts;
  const rates = useStatutoryRates();
  const { data: employees = [] } = useEmployees();
  const { data: profiles, isLoading: profilesLoading } = usePayProfiles(enabled && canSeeMoney);
  // Office managers can't read pay profiles; the basis alone (no date of
  // birth, no pay) still lets their hours run write the accrual record.
  const { data: bases, isLoading: basesLoading } = useFirmHolidayBases(
    firmId,
    enabled && !canSeeMoney
  );
  const { data: allowances = [] } = useTeamAllowances();
  const { data: leave = [] } = useTeamLeaveRequests();
  const { data: sickness, isLoading: sicknessLoading } = useSicknessRecords(
    enabled && canSeeMoney
  );
  const since = useMemo(() => twoYearsBack(), []);
  const { data: hours, isLoading } = useApprovedHours({ since, enabled });
  const periodOf = usePeriodOf();

  const extrasFor = useCallback(
    (employeeId: string): PayrollExtras | null => {
      const emp = employees.find((e) => e.id === employeeId);
      if (!emp || emp.team_role === 'Subcontractor') return null;
      const profile = profiles?.get(employeeId);
      const mine = leave.filter((l) => l.employeeId === employeeId && l.status === 'approved');
      const sickMap = new Map<
        string,
        { awe: number | null; qualifyingDaysPerWeek: number | null }
      >();
      mine
        .filter((l) => l.type === 'sick')
        .forEach((l) => {
          const r = sickness?.get(l.id);
          sickMap.set(l.id, {
            awe: r?.averageWeeklyEarnings ?? null,
            qualifyingDaysPerWeek: r?.qualifyingDaysPerWeek ?? null,
          });
        });
      return payrollExtras({
        rates,
        basis: profile?.holidayBasis ?? bases?.get(employeeId)?.basis ?? 'fixed',
        rolledUp: profile?.rolledUp ?? bases?.get(employeeId)?.rolledUp ?? false,
        payType: emp.pay_type,
        hourlyRate: canSeeMoney && Number(emp.hourly_rate) > 0 ? Number(emp.hourly_rate) : null,
        annualSalary: canSeeMoney && emp.annual_salary ? Number(emp.annual_salary) : null,
        daysPerWeek: allowances.find((a) => a.employeeId === employeeId)?.daysPerWeek ?? null,
        overtime: {
          multiplier: Number(emp.overtime_multiplier ?? 1.5),
          threshold: Number(emp.overtime_threshold_hours ?? 8),
        },
        entries: hours?.get(employeeId) ?? [],
        windowStart,
        windowEnd,
        periodOf,
        employedFrom: emp.join_date ?? null,
        holidayLeave: mine
          .filter((l) => l.type === 'annual' || l.type === 'bank_holiday')
          .map((l) => ({
            startDate: l.startDate,
            endDate: l.endDate,
            halfDay: l.halfDay ?? null,
            hours: l.hours ?? null,
          })),
        sickLeave: mine
          .filter((l) => l.type === 'sick')
          .map((l) => ({
            id: l.id,
            startDate: l.startDate,
            endDate: l.halfDay ? l.startDate : l.endDate,
          })),
        sickness: sickMap,
        withMoney: canSeeMoney,
      });
    },
    [
      employees,
      profiles,
      bases,
      leave,
      sickness,
      rates,
      canSeeMoney,
      allowances,
      hours,
      windowStart,
      windowEnd,
      periodOf,
    ]
  );

  /** The extra columns for one person's payroll line. */
  const fieldsFor = useCallback(
    (employeeId: string): Partial<PayrollEntry> => {
      const x = extrasFor(employeeId);
      if (!x) return {};
      return {
        holidayHours: x.holidayHours,
        holidayPay: x.holidayPay,
        holidayAccruedHours: x.accruedHours,
        rolledUpHolidayPay: x.rolledUpPay,
        sspDays: x.sspDays,
        sspPay: x.sspPay,
        payLawEstimate: x.estimate,
        payLawNotes: x.notes.join('; '),
      };
    },
    [extrasFor]
  );

  /** Write accrual and holiday pay into the 6-year record. Owner/admin only; never blocks the file. */
  const record = useCallback(
    (entries: PayrollEntry[]) => {
      if (!canSeeMoney || !firmId) return;
      const rows = entries.flatMap((e) =>
        (extrasFor(e.employeeId)?.records ?? []).map((r) => ({ ...r, employee_id: e.employeeId }))
      );
      void recordHolidayPeriod(firmId, rows);
    },
    [canSeeMoney, firmId, extrasFor]
  );

  /** Works number / payroll ID, so the payroll package matches the right person. */
  const payrollIdFor = useCallback(
    (employeeId: string): string | null =>
      profiles?.get(employeeId)?.payrollId ?? bases?.get(employeeId)?.payrollId ?? null,
    [profiles, bases]
  );

  return {
    ready: !enabled || !(isLoading || profilesLoading || basesLoading || sicknessLoading),
    fieldsFor, record, extrasFor, payrollIdFor };
}
