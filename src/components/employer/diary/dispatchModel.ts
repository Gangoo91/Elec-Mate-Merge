/**
 * Pure helpers for the Diary (ELE-1820): dates as 'yyyy-MM-dd' strings, which
 * days a booking covers, and each person's load and clashes per day.
 *
 * Kept free of React so the desktop grid, the phone day view and the sheets
 * all agree on what "double-booked" means.
 */
import type {
  DispatchAssignment,
  DispatchBoard,
  DispatchJob,
  DispatchLeave,
} from '@/hooks/useDispatchBoard';

/**
 * A full working day, in hours. A booking with no hours set counts as this.
 * The firm sets it in Timesheet rules (company_profiles.working_day_hours,
 * 8 by default); useDispatchBoard calls setWorkingDayHours with the firm's
 * value before the board renders. Exported as a live binding.
 */
export let WORKING_DAY_HOURS = 8;
export function setWorkingDayHours(hours: unknown): void {
  const h = Number(hours);
  WORKING_DAY_HOURS = Number.isFinite(h) && h >= 1 && h <= 24 ? h : 8;
}

/* ── Dates (local, never UTC: a 'yyyy-MM-dd' is a day in the UK, not an instant) ── */

export function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseYmd(s: string): Date {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function addDaysYmd(s: string, n: number): string {
  const d = parseYmd(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
}

export function diffDays(a: string, b: string): number {
  return Math.round((parseYmd(a).getTime() - parseYmd(b).getTime()) / 86_400_000);
}

export function mondayOf(s: string): string {
  const d = parseYmd(s);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return ymd(d);
}

export const todayYmd = (): string => ymd(new Date());

export function weekDays(monday: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDaysYmd(monday, i));
}

export const isWeekend = (s: string): boolean => {
  const dow = parseYmd(s).getDay();
  return dow === 0 || dow === 6;
};

export function fmtDay(s: string, opts: Intl.DateTimeFormatOptions): string {
  return parseYmd(s).toLocaleDateString('en-GB', opts);
}

/** "Thu 9 Oct" / "Thu 9 to Fri 10 Oct" / "Fri 30 Oct to Mon 2 Nov". */
export function rangeLabel(start: string, end?: string | null): string {
  const a = parseYmd(start);
  if (!end || end === start) return fmtDay(start, { weekday: 'short', day: 'numeric', month: 'short' });
  const b = parseYmd(end);
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${fmtDay(start, { weekday: 'short', day: 'numeric' })} to ${fmtDay(end, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })}`;
  }
  return `${fmtDay(start, { weekday: 'short', day: 'numeric', month: 'short' })} to ${fmtDay(end, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })}`;
}

/** "10:12" today, "Tue 10:12" this week, else "6 Oct, 10:12". */
export function stampLabel(iso: string): string {
  const d = new Date(iso);
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const days = Math.round(
    (new Date(new Date().toDateString()).getTime() - new Date(d.toDateString()).getTime()) /
      86_400_000
  );
  if (days === 0) return time;
  if (days === 1) return `yesterday ${time}`;
  if (days < 7) return `${d.toLocaleDateString('en-GB', { weekday: 'short' })} ${time}`;
  return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}, ${time}`;
}

export const firstName = (name?: string | null): string =>
  (name || '').trim().split(/\s+/)[0]?.replace(/^./, (c) => c.toUpperCase()) ?? '';

/** Capitalise a shouted name ("ANDREW MOORE" → "Andrew"). */
export function niceFirstName(name?: string | null): string {
  const f = (name || '').trim().split(/\s+/)[0] ?? '';
  if (!f) return '';
  return f.charAt(0).toUpperCase() + f.slice(1).toLowerCase();
}

export function initialsOf(name: string, given?: string | null): string {
  if (given && given.trim()) return given.trim().slice(0, 3).toUpperCase();
  const parts = name.replace(/\(.*?\)/g, ' ').replace(/[^\p{L}\s'-]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** UK postcode out of a free-text address ("…Sheffield, S10 3AB" → "S10 3AB"). */
export function postcodeOf(address?: string | null): string | null {
  if (!address) return null;
  const m = address.toUpperCase().match(/\b([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})\b/);
  return m ? `${m[1]} ${m[2]}` : null;
}

/** Short place for a block: the postcode, else the last bit of the address. */
export function placeOf(address?: string | null): string | null {
  const pc = postcodeOf(address);
  if (pc) return pc;
  if (!address) return null;
  const parts = address.split(',').map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

/* ── Which days a booking covers ── */

/**
 * A booking that runs Mon to the next Fri covers the weekend between on paper,
 * but nobody works it. Weekend days count only when the booking itself starts
 * or ends on that weekend (the office booked a Saturday on purpose).
 */
export function coversDay(start: string, end: string, day: string): boolean {
  if (day < start || day > end) return false;
  if (!isWeekend(day)) return true;
  const startsWeekend = isWeekend(start) && diffDays(day, start) <= 1 && diffDays(day, start) >= 0;
  const endsWeekend = isWeekend(end) && diffDays(end, day) <= 1 && diffDays(end, day) >= 0;
  return start === day || end === day || startsWeekend || endsWeekend;
}

export const bookingHours = (a: Pick<DispatchAssignment, 'hours_per_day'>): number =>
  a.hours_per_day && a.hours_per_day > 0 ? Number(a.hours_per_day) : WORKING_DAY_HOURS;

function minutesOf(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** "08:00 · 4h", "08:00", "4h", or null for an all-day booking. */
export function timeLabel(a: Pick<DispatchAssignment, 'start_time' | 'hours_per_day'>): string | null {
  const hrs = a.hours_per_day ? `${Number(a.hours_per_day).toString().replace(/\.0+$/, '')}h` : null;
  if (a.start_time && hrs) return `${a.start_time} · ${hrs}`;
  return a.start_time || hrs;
}

export function leaveOnDay(leave: DispatchLeave[], employeeId: string, day: string): DispatchLeave | null {
  return (
    leave.find((l) => l.employee_id === employeeId && l.start_date <= day && l.end_date >= day) ??
    null
  );
}

export const leaveHours = (l: DispatchLeave | null): number =>
  !l ? 0 : l.half_day ? WORKING_DAY_HOURS / 2 : WORKING_DAY_HOURS;

export function leaveLabel(l: Pick<DispatchLeave, 'type' | 'half_day'>): string {
  const t = (l.type || 'leave').toLowerCase();
  const name =
    t === 'annual' ? 'Annual leave' : t === 'sick' ? 'Off sick' : `${t.charAt(0).toUpperCase()}${t.slice(1)} leave`;
  return l.half_day ? `${name} (half day${/am|pm/i.test(l.half_day) ? `, ${l.half_day.toUpperCase()}` : ''})` : name;
}

export type ClashKind = 'leave' | 'double' | 'over';

export interface PersonDay {
  day: string;
  bookings: DispatchAssignment[];
  leave: DispatchLeave | null;
  hours: number;
  /** Why the day is red, or null when it is fine. */
  clash: ClashKind | null;
}

function overlapsInTime(a: DispatchAssignment, b: DispatchAssignment): boolean {
  if (!a.start_time || !b.start_time) return false;
  const a0 = minutesOf(a.start_time);
  const b0 = minutesOf(b.start_time);
  const a1 = a0 + bookingHours(a) * 60;
  const b1 = b0 + bookingHours(b) * 60;
  return a0 < b1 && b0 < a1;
}

export function personDay(
  board: Pick<DispatchBoard, 'assignments' | 'leave'>,
  employeeId: string,
  day: string
): PersonDay {
  const bookings = board.assignments
    .filter((a) => a.employee_id === employeeId && coversDay(a.start_date, a.end_date, day))
    .sort((x, y) => (x.start_time ?? '99').localeCompare(y.start_time ?? '99'));
  const leave = leaveOnDay(board.leave, employeeId, day);
  const hours = bookings.reduce((s, a) => s + bookingHours(a), 0);
  let clash: ClashKind | null = null;
  if (leave && bookings.length > 0) clash = 'leave';
  else if (bookings.some((a, i) => bookings.slice(i + 1).some((b) => overlapsInTime(a, b))))
    clash = 'double';
  else if (hours + leaveHours(leave) > WORKING_DAY_HOURS) clash = bookings.length > 1 ? 'double' : 'over';
  return { day, bookings, leave, hours, clash };
}

export function clashLabel(c: ClashKind, pd: PersonDay): string {
  if (c === 'leave' && pd.leave) return `Booked on ${leaveLabel(pd.leave).toLowerCase()}`;
  if (c === 'double') return 'Double-booked';
  return `${pd.hours}h booked, over a working day`;
}

/**
 * What booking `employeeId` onto `start..end` would collide with — shown on
 * every person in the pickers before anyone is moved.
 */
export function clashesFor(
  board: Pick<DispatchBoard, 'assignments' | 'leave'>,
  jobsById: Map<string, DispatchJob>,
  employeeId: string,
  start: string,
  end: string,
  opts: { ignoreAssignmentId?: string; ignoreJobId?: string; hours?: number | null } = {}
): string[] {
  const out: string[] = [];
  const hours = opts.hours && opts.hours > 0 ? opts.hours : WORKING_DAY_HOURS;
  const seen = new Set<string>();
  for (let d = start; d <= end; d = addDaysYmd(d, 1)) {
    if (!coversDay(start, end, d)) continue;
    const l = leaveOnDay(board.leave, employeeId, d);
    if (l && !seen.has(`l${l.id}`)) {
      seen.add(`l${l.id}`);
      out.push(`${leaveLabel(l)} ${rangeLabel(l.start_date, l.end_date)}`);
    }
    const others = board.assignments.filter(
      (a) =>
        a.employee_id === employeeId &&
        a.id !== opts.ignoreAssignmentId &&
        a.job_id !== opts.ignoreJobId &&
        coversDay(a.start_date, a.end_date, d)
    );
    const booked = others.reduce((s, a) => s + bookingHours(a), 0);
    if (others.length > 0 && booked + hours + leaveHours(l) > WORKING_DAY_HOURS) {
      for (const a of others) {
        if (seen.has(a.id)) continue;
        seen.add(a.id);
        const job = jobsById.get(a.job_id);
        out.push(`On ${job?.title ?? 'another job'} ${rangeLabel(a.start_date, a.end_date)}`);
      }
    }
  }
  return out;
}

/** Jobs on `day` with nobody booked: the Unassigned row. */
export function unassignedOnDay(
  jobs: DispatchJob[],
  assignedJobIds: Set<string>,
  day: string
): DispatchJob[] {
  return jobs.filter(
    (j) =>
      !assignedJobIds.has(j.id) &&
      j.start_date &&
      j.stage !== 'Complete' &&
      j.stage !== 'On Hold' &&
      coversDay(j.start_date, j.end_date || j.start_date, day)
  );
}

/** Won work with no date: the "To schedule" tray. */
export const toSchedule = (jobs: DispatchJob[]): DispatchJob[] =>
  jobs.filter((j) => !j.start_date && j.stage !== 'Complete' && j.stage !== 'On Hold');
