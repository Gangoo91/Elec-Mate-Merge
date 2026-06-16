/**
 * MyPayPage — the worker's read-only pay summary, as a routed page.
 *
 * Ported from MyPaySheet. Derived entirely from data the worker already
 * captures + what the employer sets: approved timesheet hours × their hourly
 * rate, plus approved-but-unpaid expenses owed. Nothing is written here — it
 * surfaces money already earned so the worker can see what they're owed
 * without asking.
 *
 * Page improvements over the sheet (existing data only):
 *  - Earnings headline via HeroNumber (this-week £ / hours, day-rate aware).
 *  - StatStrip summary across week / month / awaiting / owed.
 *  - Period toggle (week / month) on the contributing-timesheets breakdown.
 *  - Owed-expenses breakdown listing each approved-unpaid claim.
 *  - Relative "x days ago" timestamps on shifts.
 *  - Keeps the loading state and all source data hooks/derivations unchanged.
 */
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  format,
  formatDistanceToNowStrict,
} from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { useEmployeeTimesheets } from '@/hooks/useTimesheets';
import { useMyExpenses } from '@/hooks/useExpenses';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  HeroNumber,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  FilterBar,
  Pill,
  EmptyState,
  LoadingBlocks,
  SplitLayout,
} from '@/components/employer/editorial';

const gbp = (n: number) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 });

const relative = (iso: string | null | undefined) => {
  if (!iso) return null;
  try {
    return formatDistanceToNowStrict(parseISO(iso), { addSuffix: true });
  } catch {
    return null;
  }
};

export default function MyPayPage() {
  const { data: employee, isLoading: employeeLoading } = useMyEmployeeRecord();
  const { data: timesheets = [], isLoading: timesheetsLoading } = useEmployeeTimesheets(
    employee?.id || ''
  );
  const { expenses = [], isLoading: expensesLoading } = useMyExpenses(employee?.id);

  const queryClient = useQueryClient();

  // Live: an employer approving/paying this worker's timesheets or expense
  // claims updates the pay summary instantly — no manual reload. Pay is derived
  // from both tables, so subscribe to each (filtered to this worker's rows) and
  // invalidate the exact keys behind the page's data.
  const employeeId = employee?.id;
  useEffect(() => {
    if (!employeeId) return;
    const channel = supabase
      .channel(realtimeChannelName('worker-pay'))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_timesheets',
          filter: `employee_id=eq.${employeeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['timesheets', 'employee', employeeId] });
          queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_expense_claims',
          filter: `employee_id=eq.${employeeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['my_expense_claims', employeeId] });
          queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [employeeId, queryClient]);

  // Which period the contributing-shifts breakdown shows.
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  // While any of the source queries are in flight, show a loading state rather
  // than rendering 'Not set' / 0.0h / £0.00 from empty defaults.
  const isLoading = employeeLoading || timesheetsLoading || expensesLoading;

  const rate = Number(employee?.hourly_rate) || 0;

  // Day-rate workers are not paid by the hour, so an hourly-derived money figure
  // would be misleading. Suppress/relabel the monetary estimate for them; the
  // hourly path is unchanged.
  const isDayRate = employee?.pay_type === 'day_rate';

  const pay = useMemo(() => {
    const now = new Date();
    const weekIv = {
      start: startOfWeek(now, { weekStartsOn: 1 }),
      end: endOfWeek(now, { weekStartsOn: 1 }),
    };
    const monthIv = { start: startOfMonth(now), end: endOfMonth(now) };

    const approved = timesheets.filter((t) => (t.status || '').toLowerCase() === 'approved');
    const pending = timesheets.filter((t) => (t.status || '').toLowerCase() === 'pending');

    const inInterval = (t: (typeof timesheets)[number], iv: { start: Date; end: Date }) =>
      t.date ? isWithinInterval(parseISO(t.date), iv) : false;

    const hoursIn = (rows: typeof timesheets, iv: { start: Date; end: Date }) =>
      rows.reduce((s, t) => (inInterval(t, iv) ? s + (Number(t.total_hours) || 0) : s), 0);

    const weekHours = hoursIn(approved, weekIv);
    const monthHours = hoursIn(approved, monthIv);
    const pendingHours = pending.reduce((s, t) => s + (Number(t.total_hours) || 0), 0);

    // Approved-but-unpaid expenses are money owed to the worker.
    const owedExpenses = expenses.filter((e) => (e.status || '').toLowerCase() === 'approved');
    const expensesOwed = owedExpenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

    // Contributing approved shifts for the chosen period, newest first.
    const iv = period === 'week' ? weekIv : monthIv;
    const periodApproved = approved
      .filter((t) => inInterval(t, iv))
      .slice()
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    // Recent approved shifts overall (fallback when a period has none).
    const recent = approved
      .slice()
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 10);

    return {
      weekHours,
      weekPay: weekHours * rate,
      monthHours,
      monthPay: monthHours * rate,
      pendingHours,
      pendingPay: pendingHours * rate,
      expensesOwed,
      owedExpenses,
      periodApproved,
      recent,
    };
  }, [timesheets, expenses, rate, period]);

  if (isLoading) {
    return (
      <WorkerToolPage eyebrow="Earnings" title="My Pay">
        <LoadingBlocks />
      </WorkerToolPage>
    );
  }

  const rateLabel = isDayRate ? 'Day rate' : rate > 0 ? `${gbp(rate)}/hr` : 'Not set';

  // Shifts list for the chosen period; if empty, fall back to recent approved.
  const shifts = pay.periodApproved.length > 0 ? pay.periodApproved : pay.recent;
  const usingFallback = pay.periodApproved.length === 0 && pay.recent.length > 0;

  return (
    <WorkerToolPage
      eyebrow="Earnings"
      title="My Pay"
      description="Estimated from your approved hours and what you're owed. Your employer's payslip is the final figure."
      actions={<Pill tone={isDayRate ? 'amber' : 'yellow'}>{rateLabel}</Pill>}
    >
      {/* Headline — this week. Money is hourly-derived, so day-rate workers see
          hours instead of a misleading £ figure. */}
      <HeroNumber
        eyebrow={isDayRate ? 'Approved this week' : 'Earned this week'}
        value={isDayRate ? `${pay.weekHours.toFixed(1)}h` : gbp(pay.weekPay)}
        caption={
          isDayRate
            ? 'Hours worked this week (on a day rate)'
            : `${pay.weekHours.toFixed(1)}h approved × ${rate > 0 ? `${gbp(rate)}/hr` : 'rate not set'}`
        }
        tone={isDayRate ? 'amber' : 'yellow'}
        columns={[
          {
            label: 'This month',
            value: isDayRate ? `${pay.monthHours.toFixed(1)}h` : gbp(pay.monthPay),
          },
          {
            label: 'Awaiting',
            value: `${pay.pendingHours.toFixed(1)}h`,
            tone: pay.pendingHours > 0 ? 'amber' : undefined,
          },
          {
            label: 'Owed',
            value: gbp(pay.expensesOwed),
            tone: pay.expensesOwed > 0 ? 'emerald' : undefined,
          },
        ]}
      />

      {/* Summary strip */}
      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Week hours',
            value: `${pay.weekHours.toFixed(1)}h`,
            sub: isDayRate ? 'approved · day rate' : gbp(pay.weekPay),
            accent: true,
          },
          {
            label: 'Month hours',
            value: `${pay.monthHours.toFixed(1)}h`,
            sub: isDayRate ? 'approved · day rate' : gbp(pay.monthPay),
          },
          {
            label: 'Awaiting approval',
            value: `${pay.pendingHours.toFixed(1)}h`,
            sub: isDayRate ? 'pending' : gbp(pay.pendingPay),
            tone: pay.pendingHours > 0 ? 'amber' : undefined,
          },
          {
            label: 'Expenses owed',
            value: gbp(pay.expensesOwed),
            sub: `${pay.owedExpenses.length} approved`,
            tone: pay.expensesOwed > 0 ? 'emerald' : undefined,
          },
        ]}
      />

      {/* Approved shifts (left) and expenses owed (right) — 2-col on lg, stacked on mobile */}
      <SplitLayout
        ratio="1-1"
        primary={
          <>
            {/* Contributing approved shifts, filterable by period */}
            <ListCard>
        <ListCardHeader
          title="Approved shifts"
          tone="yellow"
          meta={
            <span className="text-[11px] text-white/45">
              {usingFallback
                ? 'recent'
                : period === 'week'
                  ? 'this week'
                  : 'this month'}
            </span>
          }
        />
        <div className="px-4 sm:px-5 pt-3.5">
          <FilterBar
            tabs={[
              { value: 'week', label: 'This week' },
              { value: 'month', label: 'This month' },
            ]}
            activeTab={period}
            onTabChange={(v) => setPeriod(v as 'week' | 'month')}
          />
        </div>
        {shifts.length > 0 ? (
          <ListBody>
            {shifts.map((t) => {
              const hours = Number(t.total_hours) || 0;
              const rel = relative(t.date);
              return (
                <ListRow
                  key={t.id}
                  title={t.date ? format(parseISO(t.date), 'EEE d MMM yyyy') : '—'}
                  subtitle={
                    isDayRate
                      ? `${hours.toFixed(1)}h worked${rel ? ` · ${rel}` : ''}`
                      : `${hours.toFixed(1)}h × ${gbp(rate)}${rel ? ` · ${rel}` : ''}`
                  }
                  trailing={
                    isDayRate ? (
                      <span className="text-[12px] font-medium text-white/45">Day rate</span>
                    ) : (
                      <span className="text-[14px] font-semibold text-white tabular-nums">
                        {gbp(hours * rate)}
                      </span>
                    )
                  }
                />
              );
            })}
          </ListBody>
        ) : (
          <div className="p-4 sm:p-5">
            <EmptyState
              title="No approved hours yet"
              description="Once your employer approves a timesheet, the contributing shifts show here."
            />
          </div>
        )}
            </ListCard>
          </>
        }
        secondary={
          <>
            {/* Expenses owed breakdown */}
            <ListCard>
        <ListCardHeader
          title="Expenses owed"
          tone="emerald"
          meta={
            <span className="text-[12px] font-semibold text-emerald-400 tabular-nums">
              {gbp(pay.expensesOwed)}
            </span>
          }
        />
        {pay.owedExpenses.length > 0 ? (
          <ListBody>
            {pay.owedExpenses.map((e) => {
              const rel = relative(e.submitted_date);
              return (
                <ListRow
                  key={e.id}
                  title={e.description || e.category || 'Expense'}
                  subtitle={
                    [e.category, rel ? `submitted ${rel}` : null].filter(Boolean).join(' · ') ||
                    undefined
                  }
                  trailing={
                    <span className="text-[14px] font-semibold text-emerald-400 tabular-nums">
                      {gbp(Number(e.amount) || 0)}
                    </span>
                  }
                />
              );
            })}
          </ListBody>
        ) : (
          <div className="p-4 sm:p-5">
            <EmptyState
              title="Nothing owed"
              description="Approved-but-unpaid expense claims appear here so you can see what you're owed."
            />
          </div>
        )}
            </ListCard>
          </>
        }
      />

      <p className="text-[11px] text-white/30 leading-relaxed">
        {isDayRate
          ? 'You’re on a day rate, so hours are shown for your records — your actual payslip from your employer is the final figure.'
          : 'Estimated from approved hours × your rate. Your actual payslip from your employer is the final figure.'}
      </p>
    </WorkerToolPage>
  );
}
