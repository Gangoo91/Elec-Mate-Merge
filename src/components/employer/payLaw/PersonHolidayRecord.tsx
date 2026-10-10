/**
 * Holiday on the person sheet (ELE-2062): what they have built up this leave
 * year if they are on irregular hours or part-year, and the 6-year holiday
 * record (WTR 1998 reg 16B) as a CSV.
 *
 * The record joins: entitlement set each year, approved and reversed holiday
 * (copied into employer_holiday_records the moment it is approved, so it
 * outlives the request), accrual and holiday pay written when payroll files
 * were made, and accrual worked out now from approved timesheets for any pay
 * period not yet in the record.
 */
import { useMemo } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { Download } from 'lucide-react';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import { KeyValue, rowBtnSecondary, rowsClass } from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { saveCSVFile } from '@/services/accountingService';
import { useTeamLeaveRequests } from '@/hooks/useTeamLeave';
import {
  HOLIDAY_BASIS_LABEL,
  accrueOverPeriods,
  csvRow,
  leaveDaysInWindow,
  type HolidayBasis,
} from '@/lib/payLaw';
import {
  useAllAllowances,
  useApprovedHours,
  useHolidayRecords,
  usePayProfiles,
  usePeriodOf,
} from '@/hooks/usePayLaw';

const iso = (d: Date) => format(d, 'yyyy-MM-dd');
const nice = (d: string | null | undefined) => (d ? format(parseISO(d), 'd MMM yyyy') : '');

const KIND_LABEL: Record<string, string> = {
  leave_approved: 'Holiday approved',
  leave_reversed: 'Holiday cancelled or declined',
  accrual: 'Holiday built up',
  holiday_pay: 'Holiday pay',
  rolled_up_pay: 'Rolled-up holiday pay',
  entitlement: 'Entitlement',
};

export function PersonHolidayRecord({ person }: { person: { id: string; name: string } }) {
  const { data: profiles } = usePayProfiles();
  const profile = profiles?.get(person.id);
  const basis: HolidayBasis = profile?.holidayBasis ?? 'fixed';
  const irregular = basis !== 'fixed';
  const year = new Date().getFullYear();
  const sixYearsAgo = iso(addDays(new Date(), -366 * 6));
  const { data: hoursMap, isLoading: hoursLoading } = useApprovedHours({
    employeeId: person.id,
    since: sixYearsAgo,
  });
  const { data: records = [] } = useHolidayRecords(person.id);
  const { data: allowances = [] } = useAllAllowances(person.id);
  const { data: leave = [] } = useTeamLeaveRequests();
  const periodOf = usePeriodOf();
  const today = iso(new Date());

  const entries = useMemo(() => hoursMap?.get(person.id) ?? [], [hoursMap, person.id]);
  const myLeave = useMemo(
    () =>
      leave.filter(
        (l) => l.employeeId === person.id && (l.type === 'annual' || l.type === 'bank_holiday')
      ),
    [leave, person.id]
  );

  // Sick leave: holiday still builds up during it (WTR reg 15C).
  const sickSpans = useMemo(
    () =>
      leave
        .filter((l) => l.employeeId === person.id && l.type === 'sick' && l.status === 'approved')
        .map((l) => ({
          start: l.startDate,
          end: l.halfDay ? l.startDate : l.endDate,
          halfDay: !!l.halfDay,
        })),
    [leave, person.id]
  );

  // This leave year (calendar year, as the allowances are).
  const thisYear = useMemo(() => {
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;
    const acc = accrueOverPeriods(
      entries.filter((e) => e.date >= start && e.date <= end),
      periodOf,
      today,
      undefined,
      { leave: sickSpans, history: entries, from: start }
    );
    const taken = myLeave.filter(
      (l) => l.status === 'approved' && l.startDate <= end && l.endDate >= start
    );
    const takenDays = taken.reduce((s, l) => s + leaveDaysInWindow(l, start, end), 0);
    const takenHours = taken.reduce((s, l) => s + Number(l.hours ?? 0), 0);
    return { ...acc, takenDays, takenHours, takenHaveHours: taken.every((l) => l.hours != null) };
  }, [entries, periodOf, today, myLeave, year, sickSpans]);

  const downloadCsv = () => {
    const lines: string[] = [];
    lines.push(csvRow(['Holiday record', person.name]));
    lines.push(csvRow(['Made', format(new Date(), 'd MMM yyyy HH:mm')]));
    lines.push(
      csvRow([
        'Kept for 6 years (Working Time Regulations 1998, regulation 16B). Holiday basis now',
        `${HOLIDAY_BASIS_LABEL[basis]}${profile?.rolledUp ? ', rolled up' : ''}`,
      ])
    );
    lines.push('');
    lines.push(
      csvRow([
        'Recorded',
        'What',
        'From',
        'To',
        'Days',
        'Hours',
        'Amount (£)',
        'Basis',
        'How it was worked out',
        'Estimate',
      ])
    );
    type Line = { sort: string; cells: Array<string | number | null | boolean> };
    const out: Line[] = [];
    allowances.forEach((a) =>
      out.push({
        sort: `${a.year}-01-01`,
        cells: [
          a.updated_at ? format(parseISO(a.updated_at), 'yyyy-MM-dd') : `${a.year}-01-01`,
          'Entitlement for the year',
          `${a.year}-01-01`,
          `${a.year}-12-31`,
          Number(a.total_days) + Number(a.carried_over ?? 0),
          null,
          null,
          'fixed',
          `${a.total_days} days${a.carried_over ? ` + ${a.carried_over} carried over` : ''}${
            a.days_per_week ? `, ${a.days_per_week} days a week` : ''
          }`,
          false,
        ],
      })
    );
    const ledgerLeave = new Set(
      records
        .filter((r) => r.kind === 'leave_approved')
        .map((r) => `${r.periodStart}|${r.periodEnd}`)
    );
    records
      .filter((r) => (r.periodStart ?? r.createdAt) >= sixYearsAgo)
      .forEach((r) =>
        out.push({
          sort: r.periodStart ?? r.createdAt.slice(0, 10),
          cells: [
            r.createdAt.slice(0, 10),
            KIND_LABEL[r.kind] ?? r.kind,
            r.periodStart,
            r.periodEnd,
            r.days,
            r.hours,
            r.amount,
            r.basis,
            r.method,
            r.isEstimate,
          ],
        })
      );
    // Holiday approved before the record existed.
    myLeave
      .filter(
        (l) =>
          l.status === 'approved' &&
          l.startDate >= sixYearsAgo &&
          !ledgerLeave.has(`${l.startDate}|${l.halfDay ? l.startDate : l.endDate}`)
      )
      .forEach((l) =>
        out.push({
          sort: l.startDate,
          cells: [
            (l.decidedAt ?? l.createdAt ?? l.startDate).slice(0, 10),
            'Holiday approved',
            l.startDate,
            l.halfDay ? l.startDate : l.endDate,
            l.totalDays,
            l.hours ?? null,
            null,
            null,
            `From the leave request${l.decidedBy ? `, approved by ${l.decidedBy}` : ''}`,
            false,
          ],
        })
      );
    // Accrual for irregular / part-year, any pay period not already recorded.
    if (irregular) {
      const recorded = new Set(
        records.filter((r) => r.kind === 'accrual').map((r) => `${r.periodStart}|${r.periodEnd}`)
      );
      accrueOverPeriods(entries, periodOf, today, undefined, { leave: sickSpans })
        .periods.filter((p) => p.complete && !recorded.has(`${p.start}|${p.end}`))
        .forEach((p) =>
          out.push({
            sort: p.start,
            cells: [
              today,
              'Holiday built up (worked out now)',
              p.start,
              p.end,
              null,
              p.accrued,
              null,
              basis,
              `12.07% of ${p.hours}h on approved timesheets = ${((p.hours * 12.07) / 100).toFixed(3)}h` +
                (p.leaveWeeks > 0
                  ? `, plus ${p.leaveAccrual.toFixed(3)}h for ${p.leaveWeeks} week(s) off sick (reg 15C)`
                  : '') +
                `, rounded to ${p.accrued}h. Family leave is not recorded here and is not included`,
              false,
            ],
          })
        );
    }
    out.sort((a, b) => a.sort.localeCompare(b.sort)).forEach((l) => lines.push(csvRow(l.cells)));
    const safe =
      person.name
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase() || 'person';
    saveCSVFile(lines.join('\n'), `holiday-record-${safe}-${today}.csv`)
      .then((r) => {
        if (!r.cancelled) toast({ title: 'Holiday record saved', description: r.filename });
      })
      .catch(() => toast({ title: 'Could not save the file', variant: 'destructive' }));
  };

  return (
    <section data-help="people.holiday-record">
      <PanelTitle
        title="Holiday record"
        meta={irregular ? HOLIDAY_BASIS_LABEL[basis] : undefined}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        <div className={rowsClass}>
          {irregular && !profile?.rolledUp && (
            <>
              <KeyValue
                label={`Built up in ${year}`}
                value={hoursLoading ? '…' : `${thisYear.accruedHours}h`}
              />
              {thisYear.accruingNow > 0 && (
                <KeyValue label="This pay period so far" value={`${thisYear.accruingNow}h`} />
              )}
              <KeyValue
                label="Taken"
                value={
                  thisYear.takenHaveHours
                    ? `${thisYear.takenHours}h`
                    : `${thisYear.takenDays} day${thisYear.takenDays === 1 ? '' : 's'}`
                }
              />
              {thisYear.takenHaveHours && (
                <KeyValue
                  label="Left to take"
                  value={`${Math.round((thisYear.accruedHours - thisYear.takenHours) * 100) / 100}h`}
                  tone={thisYear.accruedHours - thisYear.takenHours < 0 ? 'red' : undefined}
                />
              )}
              <div className="px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
                12.07% of {thisYear.workedHours}h on approved timesheets this year
                {thisYear.leaveWeeks > 0
                  ? `, plus ${thisYear.leaveWeeks} week${thisYear.leaveWeeks === 1 ? '' : 's'} off sick at their average week`
                  : ''}
                , worked out at the end of each pay period. Maternity, paternity, adoption and other
                family leave are not recorded here, so add holiday built up during them by hand.
              </div>
            </>
          )}
          {irregular && profile?.rolledUp && (
            <div className="px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
              Holiday pay is rolled up: 12.07% is added to every pay period and shows in the payroll
              file. Time off is unpaid when taken.
            </div>
          )}
          <div className="flex min-h-[60px] items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-white">Six years of holiday</div>
              <div className="text-[13px] text-white">
                {records.length > 0
                  ? `${records.length} recorded since ${nice(records[records.length - 1].createdAt)}`
                  : 'Entitlement, holiday taken, built up and paid'}
              </div>
            </div>
            <button
              type="button"
              onClick={downloadCsv}
              className={cn(rowBtnSecondary, 'gap-1.5')}
              aria-label={`Download ${person.name}'s holiday record`}
            >
              <Download className="h-4 w-4" />
              CSV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
