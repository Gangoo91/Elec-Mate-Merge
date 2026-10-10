/**
 * MyPayPage — Worker Tools → My pay (ELE-2009).
 *
 * "This pay period (1–31 Oct, paid Fri 30 Oct): 152 approved hours, about
 * £2,850 before tax; 6 hours awaiting approval; £84 expenses to be repaid.
 * Hours for 1–7 Oct sent to payroll on Mon 8 Oct."
 *
 * Every figure comes from data the office already uses — nothing is a second
 * calculation:
 *   - pay period + payday: the firm's settings (get_firm_pay_settings), worked
 *     out by utils/payPeriods (the same module the office's settings preview uses)
 *   - pay: approved timesheet hours × the worker's OWN rate with their overtime
 *     terms, through utils/payCalculations.labourCost — the payroll export's maths
 *   - expenses: useMyExpenses — the same rows the Expenses page and the office use
 *   - "sent to payroll": the office's Timesheets export log (get_my_payroll_exports)
 * It is labelled an estimate everywhere: no tax, NI or pension maths.
 */
import { useMemo, useState } from 'react';
import {
  endOfMonth,
  endOfWeek,
  format,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { labourCost, DEFAULT_OVERTIME_TERMS } from '@/utils/payCalculations';
import {
  formatPeriodRange,
  isoInRange,
  payPeriodContaining,
  previousPayPeriod,
  describePayRule,
  type PayPeriod,
} from '@/utils/payPeriods';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { useEmployeeTimesheets } from '@/hooks/useTimesheets';
import { useMyExpenses } from '@/hooks/useExpenses';
import { useFirmPaySettings, useMyPayrollExports } from '@/hooks/useFirmPaySettings';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import type { HelpBlocker } from '@/components/hub/PageHelp';
import { WT_PAY_HELP } from '@/components/worker-tools/help/worker-help';
import { GroupLabel, Segmented, SolidBadge, WorkerPanel } from '@/components/worker-tools/WorkerUi';
import { LoadingBlocks, StatStrip } from '@/components/employer/editorial';
import {
  categoryLabel,
  gbp,
  shortDate,
  statusKey,
} from '@/components/worker-tools/expenses/expenseShared';
import { useNavigate } from 'react-router-dom';
import { expensePayState, shortPayday } from '@/utils/expensePayroll';
import { MySubcontractorPay } from '@/components/employer/subcontractors/MySubcontractorPay';

type Which = 'this' | 'last';

const hrs = (n: number) => `${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })}h`;

export default function MyPayPage() {
  const navigate = useNavigate();
  const { data: employee, isLoading: employeeLoading } = useMyEmployeeRecord();
  const employeeId = employee?.id;
  const firmId = (employee as { employer_id?: string | null } | null | undefined)?.employer_id ?? null;

  const { data: timesheets = [], isLoading: timesheetsLoading } = useEmployeeTimesheets(employeeId || '');
  const { expenses, isLoading: expensesLoading } = useMyExpenses(employeeId);
  const { data: settings, isLoading: settingsLoading } = useFirmPaySettings(firmId);

  const [which, setWhich] = useState<Which>('this');

  // Pay period for the selected tab (null when the firm hasn't set one).
  const periods = useMemo(() => {
    const current = payPeriodContaining(settings);
    const last = current ? previousPayPeriod(settings, current) : null;
    return { current, last };
  }, [settings]);
  const period: PayPeriod | null = which === 'last' ? periods.last : periods.current;

  // Exports reaching back to the start of last period (or ~4 months).
  const since = periods.last ? format(periods.last.start, 'yyyy-MM-dd') : undefined;
  const { data: exportsLog = [] } = useMyPayrollExports(employeeId, since);

  useRealtimeInvalidate(
    'worker-pay',
    [
      { table: 'employer_timesheets', filter: `employee_id=eq.${employeeId}` },
      { table: 'employer_expense_claims', filter: `employee_id=eq.${employeeId}` },
    ],
    [
      ['timesheets', 'employee', employeeId],
      ['my_expense_claims', employeeId],
      ['my-employee-record'],
    ],
    Boolean(employeeId)
  );

  const rate = Number(employee?.hourly_rate) || 0;
  const isDayRate = employee?.pay_type === 'day_rate';
  const terms = useMemo(() => {
    const e = employee as
      | { overtime_multiplier?: number | null; overtime_threshold_hours?: number | null }
      | null
      | undefined;
    const m = Number(e?.overtime_multiplier);
    const t = Number(e?.overtime_threshold_hours);
    return {
      multiplier: e?.overtime_multiplier != null && Number.isFinite(m) ? m : DEFAULT_OVERTIME_TERMS.multiplier,
      threshold: e?.overtime_threshold_hours != null && Number.isFinite(t) ? t : DEFAULT_OVERTIME_TERMS.threshold,
    };
  }, [employee]);

  // Fallback window when the firm hasn't set a pay period: this week / month.
  const [fallback, setFallback] = useState<'week' | 'month'>('month');
  const win = useMemo(() => {
    if (period) return { start: period.start, end: period.end };
    const now = new Date();
    return fallback === 'week'
      ? { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) }
      : { start: startOfMonth(now), end: endOfMonth(now) };
  }, [period, fallback]);

  const calc = useMemo(() => {
    const live = timesheets;
    const inWin = (d?: string | null) => isoInRange(d, win.start, win.end);
    const approved = live
      .filter((t) => statusKey(t.status) === 'approved' && inWin(t.date))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const pending = live.filter((t) => statusKey(t.status) === 'pending' && inWin(t.date));
    const toEntries = (rows: typeof timesheets) =>
      rows.map((t) => ({ date: t.date || '', totalHours: Number(t.total_hours) || 0 }));
    const approvedHours = approved.reduce((s, t) => s + (Number(t.total_hours) || 0), 0);
    const pendingHours = pending.reduce((s, t) => s + (Number(t.total_hours) || 0), 0);

    // Approved days that no export covers yet.
    const covered = (d: string) =>
      exportsLog.some((x) => d >= x.period_start && d <= x.period_end);
    const notSentDays = new Set(approved.filter((t) => t.date && !covered(t.date)).map((t) => t.date));
    const notSentHours = approved
      .filter((t) => t.date && !covered(t.date))
      .reduce((s, t) => s + (Number(t.total_hours) || 0), 0);
    const exportsInWin = exportsLog
      .filter(
        (x) =>
          x.period_end >= format(win.start, 'yyyy-MM-dd') &&
          x.period_start <= format(win.end, 'yyyy-MM-dd')
      )
      .sort((a, b) => a.period_start.localeCompare(b.period_start));
    // One line per exported range — the latest export of a range wins.
    const byRange = new Map<string, (typeof exportsInWin)[number]>();
    exportsInWin.forEach((x) => {
      const k = `${x.period_start}|${x.period_end}`;
      const prev = byRange.get(k);
      if (!prev || prev.exported_at < x.exported_at) byRange.set(k, x);
    });

    // Per-day overtime split so rows add up to the headline.
    const dayHours = new Map<string, number>();
    approved.forEach((t) =>
      dayHours.set(t.date || '', (dayHours.get(t.date || '') ?? 0) + (Number(t.total_hours) || 0))
    );

    return {
      approved,
      approvedHours,
      approvedPay: labourCost(toEntries(approved), rate, terms),
      pendingHours,
      pendingPay: labourCost(toEntries(pending), rate, terms),
      notSentHours,
      notSentDays: notSentDays.size,
      exportLines: [...byRange.values()],
      dayHours,
    };
  }, [timesheets, win, exportsLog, rate, terms]);

  // Expenses to be repaid — approved, not yet paid. Same rows as the Expenses page.
  const owed = useMemo(
    () => expenses.filter((e) => statusKey(e.status) === 'approved'),
    [expenses]
  );
  const owedTotal = owed.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  // ELE-1830: a subcontractor is paid by self-bill statement, not PAYE.
  if (employee?.team_role === 'Subcontractor') return <MySubcontractorPay />;

  const isLoading = employeeLoading || timesheetsLoading || expensesLoading || settingsLoading;
  if (isLoading) {
    return (
      <WorkerToolPage eyebrow="Earnings" title="My pay">
        <LoadingBlocks />
      </WorkerToolPage>
    );
  }

  const today = format(new Date(), 'yyyy-MM-dd');
  const rateLabel = isDayRate ? 'Day rate' : rate > 0 ? `${gbp(rate)} an hour` : 'Rate not set';
  const rangeText = formatPeriodRange(win.start, win.end);
  const paydayIso = period ? format(period.payday, 'yyyy-MM-dd') : null;
  const paydayText = period ? format(period.payday, 'EEE d MMM') : null;
  const paydayPast = paydayIso ? paydayIso < today : false;

  const headlineLabel = period
    ? `${which === 'this' ? 'This pay period' : 'Last pay period'} · ${rangeText}`
    : `${fallback === 'week' ? 'This week' : 'This month'} · ${rangeText}`;

  const headlineValue = isDayRate
    ? hrs(calc.approvedHours)
    : rate > 0
      ? gbp(calc.approvedPay)
      : hrs(calc.approvedHours);

  // Live "Before you start" for the help (ELE-1980). Both are the office's to fix.
  const helpBlockers: HelpBlocker[] = [];
  if (!period) {
    helpBlockers.push({
      text: 'Your firm hasn’t set a payday, so there’s no pay period yet. Ask the office to set it.',
    });
  }
  if (!isDayRate && !(rate > 0)) {
    helpBlockers.push({
      text: 'The office hasn’t set your pay rate, so you see hours, not £. Ask the office.',
    });
  }

  return (
    <WorkerToolPage
      eyebrow="Earnings"
      title="My pay"
      description="What your approved hours and expenses add up to, and when they're paid."
      actions={<SolidBadge tone="neutral">{rateLabel}</SolidBadge>}
      help={WT_PAY_HELP}
      helpBlockers={helpBlockers}
    >
      <div className="space-y-6 sm:space-y-8">
        <div data-help="wt-pay.period">
        {period ? (
          <Segmented<Which>
            value={which}
            onChange={setWhich}
            options={[
              { value: 'this', label: 'This pay period' },
              { value: 'last', label: 'Last pay period' },
            ]}
          />
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl border border-white/[0.08] border-l-2 border-l-orange-400 bg-white/[0.04] px-4 py-3">
              <p className="text-[14px] font-semibold text-orange-300">
                Your firm hasn&rsquo;t set a payday
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-white">
                So there&rsquo;s no pay period to show yet. Below is this{' '}
                {fallback === 'week' ? 'week' : 'month'} instead. The office can set it in
                Timesheets → Payroll file.
              </p>
            </div>
            <Segmented<'week' | 'month'>
              value={fallback}
              onChange={setFallback}
              options={[
                { value: 'week', label: 'This week' },
                { value: 'month', label: 'This month' },
              ]}
            />
          </div>
        )}
        </div>

        {/* Headline */}
        <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              {headlineLabel}
            </p>
            {!isDayRate && rate > 0 && <SolidBadge tone="neutral">Estimate</SolidBadge>}
          </div>
          <p className="mt-2 text-[40px] font-semibold leading-none tabular-nums text-white sm:text-[52px]">
            {headlineValue}
          </p>
          <p className="mt-2.5 text-[14px] leading-snug text-white">
            {isDayRate
              ? 'Approved hours. You are on a day rate, so your payslip prices the days.'
              : rate > 0
                ? `Before tax. ${hrs(calc.approvedHours)} approved at ${gbp(rate)} an hour${
                    terms.multiplier !== 1 ? `, with overtime over ${terms.threshold}h a day at ×${terms.multiplier}` : ''
                  }.`
                : 'Approved hours. The office hasn’t set your rate, so there’s no £ figure.'}
          </p>
          {period && (
            <p className="mt-3 border-t border-white/[0.1] pt-3 text-[14px] text-white">
              {paydayPast ? 'Paid on or about ' : 'Payday: '}
              <span className="font-semibold">{paydayText}</span>
              <span className="block text-[12.5px] text-white">{describePayRule(settings)}</span>
            </p>
          )}
        </div>

        <div data-help="wt-pay.stats">
        <StatStrip
          columns={3}
          className="-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x"
          stats={[
            {
              label: 'Approved',
              value: hrs(calc.approvedHours),
              sub: `${calc.approved.length} day${calc.approved.length === 1 ? '' : 's'} in this ${period ? 'period' : fallback}`,
            },
            {
              label: 'Awaiting approval',
              value: hrs(calc.pendingHours),
              sub:
                calc.pendingHours > 0 && !isDayRate && rate > 0
                  ? `About ${gbp(calc.pendingPay)} more`
                  : 'Not counted until approved',
              tone: calc.pendingHours > 0 ? 'amber' : undefined,
            },
            {
              label: 'Expenses to be repaid',
              value: gbp(owedTotal),
              sub: `${owed.length} approved claim${owed.length === 1 ? '' : 's'}`,
              tone: owedTotal > 0 ? 'emerald' : undefined,
              onClick: () => navigate('/electrician/worker-tools/expenses'),
            },
          ]}
        />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="space-y-6">
            {/* Payroll */}
            <div data-help="wt-pay.payroll">
            <WorkerPanel>
              <GroupLabel>Sent to payroll</GroupLabel>
              <div className="space-y-2.5 px-4 pb-4 sm:px-5">
                {calc.exportLines.length === 0 ? (
                  <p className="text-[14px] leading-snug text-white">
                    {calc.approvedHours > 0
                      ? 'None of these hours have been sent to payroll yet.'
                      : 'Nothing to send yet.'}
                  </p>
                ) : (
                  calc.exportLines.map((x) => (
                    <p key={`${x.period_start}-${x.period_end}`} className="text-[14px] leading-snug text-white">
                      Hours for{' '}
                      <span className="font-semibold">
                        {formatPeriodRange(parseISO(x.period_start), parseISO(x.period_end))}
                      </span>{' '}
                      sent on{' '}
                      <span className="font-semibold">{format(parseISO(x.exported_at), 'EEE d MMM')}</span>
                    </p>
                  ))
                )}
                {calc.exportLines.length > 0 && calc.notSentHours > 0 && (
                  <p className="text-[13px] leading-snug text-orange-300">
                    {hrs(calc.notSentHours)} approved on {calc.notSentDays} day
                    {calc.notSentDays === 1 ? '' : 's'} not sent yet. They go in the next export.
                  </p>
                )}
              </div>
            </WorkerPanel>
            </div>

            {/* Approved days */}
            <WorkerPanel>
              <GroupLabel>Approved days</GroupLabel>
              {calc.approved.length === 0 ? (
                <p className="px-4 pb-4 text-[14px] text-white sm:px-5">
                  No approved hours in this {period ? 'period' : fallback} yet.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
                  {calc.approved.map((t) => {
                    const h = Number(t.total_hours) || 0;
                    const day = calc.dayHours.get(t.date || '') ?? h;
                    const overtime = Math.max(day - terms.threshold, 0);
                    const dayGross =
                      Math.min(day, terms.threshold) * rate + overtime * rate * terms.multiplier;
                    const rowPay = day > 0 ? (h / day) * dayGross : 0;
                    return (
                      <li key={t.id} className="flex min-h-[56px] items-center gap-3 px-4 py-2.5 sm:px-5">
                        <div className="min-w-0 flex-1">
                          <p className="text-[14.5px] font-semibold text-white">
                            {t.date ? format(parseISO(t.date), 'EEE d MMM') : '—'}
                          </p>
                          <p className="text-[12.5px] text-white">
                            {hrs(h)}
                            {overtime > 0 ? ' incl. overtime' : ''}
                          </p>
                        </div>
                        {!isDayRate && rate > 0 && (
                          <span className="text-[14.5px] font-semibold tabular-nums text-white">
                            {gbp(rowPay)}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </WorkerPanel>
          </div>

          <div className="space-y-6">
            <WorkerPanel>
              <GroupLabel>Expenses to be repaid</GroupLabel>
              {owed.length === 0 ? (
                <p className="px-4 pb-4 text-[14px] text-white sm:px-5">
                  Nothing approved and waiting to be paid back.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
                  {owed.map((e) => (
                    <li key={e.id} className="flex min-h-[56px] items-center gap-3 px-4 py-2.5 sm:px-5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14.5px] font-semibold text-white">
                          {categoryLabel(e.category)}
                        </p>
                        <p className="truncate text-[12.5px] text-white">
                          {shortDate(e.incurred_on || e.submitted_date)}
                          {e.description && e.description !== e.category ? ` · ${e.description}` : ''}
                        </p>
                        {(() => {
                          const pay = expensePayState(e);
                          return (
                            <p className="text-[12.5px] font-medium text-white">
                              {pay?.kind === 'in_payroll'
                                ? `In payroll · paid on ${shortPayday(pay.payday)}`
                                : 'Waiting for the office to pay it'}
                            </p>
                          );
                        })()}
                      </div>
                      <span className="text-[14.5px] font-semibold tabular-nums text-white">
                        {gbp(Number(e.amount))}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </WorkerPanel>

            <WorkerPanel>
              <GroupLabel>About these figures</GroupLabel>
              <div className="space-y-2 px-4 pb-4 text-[13.5px] leading-relaxed text-white sm:px-5">
                <p>
                  This is an estimate of your pay before tax, National Insurance, pension or any
                  other deductions. It is not a payslip.
                </p>
                <p>
                  It counts approved hours only, at the rate the office has on your record. Your
                  payslip from your employer is the final figure.
                </p>
              </div>
            </WorkerPanel>
          </div>
        </div>
      </div>
    </WorkerToolPage>
  );
}
