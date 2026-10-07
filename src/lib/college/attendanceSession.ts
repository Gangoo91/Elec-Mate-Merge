/* ==========================================================================
   Attendance sessions (Andrew, 7 Oct 2026): one register mark per learner per
   SESSION, not per day. college_attendance.session is 'morning', 'afternoon'
   or 'all_day' (marks taken before per-session registers, or by an old app
   build). Unique key: (student_id, date, session). The database fills session
   from the lesson's start time when a writer leaves it out (trigger a1_session).
   ========================================================================== */

export type AttendanceSession = 'morning' | 'afternoon' | 'all_day';
export type RegisterSession = Exclude<AttendanceSession, 'all_day'>;

/** The upsert target every register writer uses. */
export const ATTENDANCE_CONFLICT = 'student_id,date,session';

/** Lessons starting before 12:30 are morning; the database uses the same line. */
const MIDDAY_MINUTES = 12 * 60 + 30;

export const REGISTER_SESSIONS: Array<{ value: RegisterSession; label: string }> = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
];

export const SESSION_LABEL: Record<AttendanceSession, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  all_day: 'All day',
};

export const SESSION_SHORT: Record<AttendanceSession, string> = {
  morning: 'AM',
  afternoon: 'PM',
  all_day: 'Day',
};

/** 'HH:MM[:SS]' -> morning / afternoon; null when there is no time. */
export function sessionOfTime(time: string | null | undefined): RegisterSession | null {
  if (!time) return null;
  const [h, m] = time.split(':').map((n) => Number(n));
  if (!Number.isFinite(h)) return null;
  return h * 60 + (Number.isFinite(m) ? m : 0) < MIDDAY_MINUTES ? 'morning' : 'afternoon';
}

/** The session it is now, on UK time. */
export function currentSession(now: Date = new Date()): RegisterSession {
  const hm = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false });
  return sessionOfTime(hm) ?? 'morning';
}

export function asSession(v: unknown): AttendanceSession {
  return v === 'morning' || v === 'afternoon' ? v : 'all_day';
}
