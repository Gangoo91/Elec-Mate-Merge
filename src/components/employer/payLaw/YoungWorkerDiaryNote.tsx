/**
 * Diary warning for under-18s (ELE-2063): booking them past 8 hours a day or
 * 40 hours a week (WTR 1998 reg 5A, no opt-out). A full-day booking counts as
 * 8 hours. It warns; the office can still book.
 */
import { useMemo } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { useYoungWorkers } from '@/hooks/usePayLaw';
import { youngScheduleWarnings } from '@/lib/payLaw';

const FULL_DAY_HOURS = 8;

export function YoungWorkerDiaryNote({
  assignments,
  employeeId,
  start,
  end,
  hoursPerDay,
  ignoreAssignmentId,
}: {
  assignments: Array<{
    id: string;
    employee_id: string;
    start_date: string;
    end_date: string | null;
    hours_per_day: number | null;
  }>;
  employeeId: string | null;
  start: string;
  end: string;
  hoursPerDay: number | null;
  ignoreAssignmentId?: string;
}) {
  const { data: young } = useYoungWorkers();
  const adultFrom = employeeId ? young?.get(employeeId) : undefined;

  const warnings = useMemo(() => {
    if (!employeeId || !adultFrom || !start) return [];
    const booked = new Map<string, number>();
    assignments
      .filter((a) => a.employee_id === employeeId && a.id !== ignoreAssignmentId)
      .forEach((a) => {
        const last = a.end_date || a.start_date;
        for (let d = parseISO(a.start_date); format(d, 'yyyy-MM-dd') <= last; d = addDays(d, 1)) {
          const k = format(d, 'yyyy-MM-dd');
          booked.set(k, (booked.get(k) ?? 0) + (a.hours_per_day ?? FULL_DAY_HOURS));
        }
      });
    return youngScheduleWarnings({
      adultFrom,
      bookedByDay: booked,
      start,
      end: end < start ? start : end,
      hoursPerDay: hoursPerDay ?? FULL_DAY_HOURS,
    });
  }, [assignments, employeeId, adultFrom, start, end, hoursPerDay, ignoreAssignmentId]);

  if (warnings.length === 0) return null;
  return (
    <p
      data-help="diary.under-18"
      className="rounded-xl border border-red-500/50 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-white"
    >
      <span className="font-semibold text-red-300">Under 18: </span>
      {warnings.join('; ')}. The legal limit is 8 hours a day and 40 a week, with no opt-out. You
      can still book it.
    </p>
  );
}
