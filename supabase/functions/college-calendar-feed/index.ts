/**
 * college-calendar-feed — "Subscribe to your college calendar" (8 Oct 2026).
 *
 * GET /functions/v1/college-calendar-feed?token=<64 hex chars>
 *
 * Serves a private iCalendar (RFC 5545) feed that a phone or Google calendar
 * subscribes to. Deployed with --no-verify-jwt: calendar apps cannot send a
 * JWT, so the token in the URL is the only credential. It is 32 random bytes
 * (public.get_my_college_calendar_feed), it is NEVER logged, and an unknown
 * or revoked token gets a plain 404. Not wrapped in withSentry on purpose:
 * that wrapper reports the request URL, which carries the token.
 *
 * Learner (college_students row): their cohort's classes
 * (college_lesson_plans), quizzes due (tutor_quizzes, the same targeting as
 * useMyAssignedQuizzes), progress reviews (college_tripartite_reviews),
 * booked assessments (college_scheduled_assessments), gateway and EPA dates
 * (college_epa) and the cohort's weekly college day (college_cohorts).
 *
 * Tutor (college_staff row): classes they teach, reviews they hold, assessments
 * they are booked to carry out, standardisation meetings they chair or attend,
 * and teaching observations of them or by them.
 *
 * Times are Europe/London wall-clock with a VTIMEZONE. Every event's UID is
 * "<kind>-<row id>@college.elec-mate.com", so an edit replaces the event and
 * a deleted or cancelled row simply drops out on the next refresh.
 */

import { createClient } from '../_shared/deps.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const APP_URL = 'https://elec-mate.com';
const TOKEN_RE = /^[0-9a-f]{64}$/;

/** Feed window: the last 60 days and the year ahead. */
const PAST_DAYS = 60;
const FUTURE_DAYS = 365;

const BASE_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
};

function notFound(): Response {
  return new Response('Not found', {
    status: 404,
    headers: {
      ...BASE_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

/* ───────────────────────────── iCalendar helpers ───────────────────────────── */

const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/London',
  'X-LIC-LOCATION:Europe/London',
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0000',
  'TZOFFSETTO:+0100',
  'TZNAME:BST',
  'DTSTART:19700329T010000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0000',
  'TZNAME:GMT',
  'DTSTART:19701025T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
];

function esc(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** RFC 5545 3.1: lines longer than 75 octets are folded with CRLF + space. */
function fold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  const out: string[] = [];
  let cur = '';
  let curBytes = 0;
  let limit = 75;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    if (curBytes + b > limit) {
      out.push(cur);
      cur = ch;
      curBytes = b;
      limit = 74; // continuation lines start with a space
    } else {
      cur += ch;
      curBytes += b;
    }
  }
  if (cur) out.push(cur);
  return out.join('\r\n ');
}

const pad = (n: number) => String(n).padStart(2, '0');

/** UTC instant → 20261008T120000Z */
function utcStamp(d: Date): string {
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/** YYYY-MM-DD → 20261008 */
function ymd(date: string): string {
  return date.slice(0, 10).replace(/-/g, '');
}

function addDays(date: string, days: number): string {
  const [y, m, d] = date.slice(0, 10).split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

/** London wall clock for a UTC instant: { date: YYYY-MM-DD, time: HH:MM:SS }. */
function londonParts(iso: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(iso));
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? '00';
  return {
    date: `${g('year')}-${g('month')}-${g('day')}`,
    time: `${g('hour')}:${g('minute')}:${g('second')}`,
  };
}

/** London date + time + minutes → London date + time (wall-clock arithmetic). */
function addMinutesLocal(
  date: string,
  time: string,
  minutes: number
): { date: string; time: string } {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm, ss] = time.split(':').map((x) => Number(x) || 0);
  const dt = new Date(Date.UTC(y, m - 1, d, hh, mm + minutes, ss));
  return {
    date: `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`,
    time: `${pad(dt.getUTCHours())}:${pad(dt.getUTCMinutes())}:${pad(dt.getUTCSeconds())}`,
  };
}

const localStamp = (date: string, time: string) =>
  `${ymd(date)}T${time.replace(/:/g, '').padEnd(6, '0').slice(0, 6)}`;

interface FeedEvent {
  uid: string;
  summary: string;
  /** All-day when time is null. */
  date: string;
  time: string | null;
  minutes?: number | null;
  location?: string | null;
  description?: string | null;
  url?: string;
  category: string;
  updated?: string | null;
  rrule?: string;
}

function renderEvent(e: FeedEvent, now: Date): string[] {
  const lines = ['BEGIN:VEVENT', `UID:${e.uid}`, `DTSTAMP:${utcStamp(now)}`];
  if (e.time) {
    const end = addMinutesLocal(e.date, e.time, Math.max(5, e.minutes ?? 60));
    lines.push(`DTSTART;TZID=Europe/London:${localStamp(e.date, e.time)}`);
    lines.push(`DTEND;TZID=Europe/London:${localStamp(end.date, end.time)}`);
  } else {
    lines.push(`DTSTART;VALUE=DATE:${ymd(e.date)}`);
    lines.push(`DTEND;VALUE=DATE:${ymd(addDays(e.date, 1))}`);
    lines.push('TRANSP:TRANSPARENT');
  }
  if (e.rrule) lines.push(`RRULE:${e.rrule}`);
  lines.push(`SUMMARY:${esc(e.summary)}`);
  if (e.location) lines.push(`LOCATION:${esc(e.location)}`);
  if (e.description) lines.push(`DESCRIPTION:${esc(e.description)}`);
  if (e.url) lines.push(`URL:${e.url}`);
  lines.push(`CATEGORIES:${esc(e.category)}`);
  if (e.updated) {
    const u = new Date(e.updated);
    if (!Number.isNaN(u.getTime())) lines.push(`LAST-MODIFIED:${utcStamp(u)}`);
  }
  lines.push('STATUS:CONFIRMED', 'END:VEVENT');
  return lines;
}

const clip = (s: string | null | undefined, n = 600) => {
  const t = (s ?? '').trim();
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
};

/** '10:00' / '10:00:00' / '9:30' → '10:00:00'; anything else → null (all-day). */
const timeOrNull = (t: string | null | undefined): string | null => {
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec((t ?? '').trim());
  if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return null;
  return `${pad(Number(m[1]))}:${m[2]}:${m[3] ?? '00'}`;
};

const isCancelled = (s: string | null | undefined) => /cancel|archiv|deleted/i.test(s ?? '');

const DAY_CODES: Record<string, string> = {
  mo: 'MO',
  tu: 'TU',
  we: 'WE',
  th: 'TH',
  fr: 'FR',
  sa: 'SA',
  su: 'SU',
};
const DAY_INDEX: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

/* ───────────────────────────── data ───────────────────────────── */

// deno-lint-ignore no-explicit-any
type Db = any;
type Row = Record<string, unknown>;
const s = (v: unknown) => (typeof v === 'string' ? v : v == null ? null : String(v));

async function learnerEvents(
  db: Db,
  userId: string,
  from: string,
  to: string
): Promise<{ events: FeedEvent[]; college: string | null }> {
  const { data: rolls } = await db
    .from('college_students')
    .select('id, college_id, cohort_id, status')
    .eq('user_id', userId);
  const live = ((rolls ?? []) as Row[]).filter(
    (r) => (s(r.status) ?? '').toLowerCase() !== 'withdrawn'
  );
  if (live.length === 0) return { events: [], college: null };

  const studentIds = live.map((r) => s(r.id)!);
  const cohortIds = live.map((r) => s(r.cohort_id)).filter((x): x is string => !!x);
  const events: FeedEvent[] = [];

  const [
    cohortsRes,
    collegeRes,
    lessonsRes,
    quizCohortRes,
    quizDirectRes,
    reviewsRes,
    epaRes,
    assessRes,
  ] = await Promise.all([
    cohortIds.length
      ? db
          .from('college_cohorts')
          .select('id, name, room, meeting_day, meeting_time, start_date, end_date, status')
          .in('id', cohortIds)
      : Promise.resolve({ data: [] }),
    db.from('colleges').select('name').eq('id', s(live[0].college_id)).maybeSingle(),
    cohortIds.length
      ? db
          .from('college_lesson_plans')
          .select(
            'id, title, cohort_id, scheduled_date, scheduled_start_time, duration_minutes, scheduled_room, objectives, status, created_at'
          )
          .in('cohort_id', cohortIds)
          .gte('scheduled_date', from)
          .lte('scheduled_date', to)
      : Promise.resolve({ data: [] }),
    cohortIds.length
      ? db
          .from('tutor_quizzes')
          .select('id, title, kind, due_date, updated_at, time_limit_minutes')
          .eq('is_published', true)
          .in('cohort_id', cohortIds)
          .gte('due_date', from)
          .lte('due_date', to)
      : Promise.resolve({ data: [] }),
    db
      .from('tutor_quizzes')
      .select('id, title, kind, due_date, updated_at, time_limit_minutes')
      .eq('is_published', true)
      .contains('assigned_student_ids', [userId])
      .gte('due_date', from)
      .lte('due_date', to),
    db
      .from('college_tripartite_reviews')
      .select('id, scheduled_at, duration_minutes, location, meeting_url, mode, status, updated_at')
      .in('student_id', studentIds)
      .gte('scheduled_at', `${from}T00:00:00Z`)
      .lte('scheduled_at', `${to}T23:59:59Z`),
    db
      .from('college_epa')
      .select('id, gateway_date, epa_date, status, updated_at')
      .in('student_id', studentIds),
    db
      .from('college_scheduled_assessments')
      .select('id, assessment_type, scheduled_date, scheduled_time, location, status, updated_at')
      .in('student_id', studentIds)
      .gte('scheduled_date', from)
      .lte('scheduled_date', to),
  ]);

  const cohorts = new Map<string, Row>(
    ((cohortsRes.data ?? []) as Row[]).map((c) => [s(c.id)!, c])
  );
  const collegeName = s((collegeRes.data as Row | null)?.name);

  for (const l of (lessonsRes.data ?? []) as Row[]) {
    if (isCancelled(s(l.status)) || !l.scheduled_date) continue;
    const cohort = cohorts.get(s(l.cohort_id) ?? '');
    events.push({
      uid: `lesson-${l.id}@college.elec-mate.com`,
      summary: s(l.title) ?? 'College class',
      date: s(l.scheduled_date)!,
      time: timeOrNull(s(l.scheduled_start_time)),
      minutes: (l.duration_minutes as number | null) ?? 60,
      location: s(l.scheduled_room) ?? s(cohort?.room),
      description: [cohort ? `Class with ${s(cohort.name)}` : null, clip(s(l.objectives)) || null]
        .filter(Boolean)
        .join('\n\n'),
      url: `${APP_URL}/apprentice/college-plan`,
      category: 'Class',
      updated: s(l.created_at),
    });
  }

  const quizzes = new Map<string, Row>();
  for (const q of [
    ...((quizCohortRes.data ?? []) as Row[]),
    ...((quizDirectRes.data ?? []) as Row[]),
  ])
    quizzes.set(s(q.id)!, q);
  for (const q of quizzes.values()) {
    if (!q.due_date) continue;
    const kind =
      s(q.kind) === 'assessment' ? 'Assessment' : s(q.kind) === 'mock_exam' ? 'Mock exam' : 'Quiz';
    events.push({
      uid: `quiz-${q.id}@college.elec-mate.com`,
      summary: `${kind} due: ${s(q.title) ?? 'Quiz'}`,
      date: s(q.due_date)!,
      time: null,
      description: `Set by your tutor. Do it in Elec-Mate before the end of the day.${
        q.time_limit_minutes ? `\nTime limit: ${q.time_limit_minutes} minutes.` : ''
      }`,
      url: `${APP_URL}/apprentice/college/quizzes`,
      category: 'Quiz due',
      updated: s(q.updated_at),
    });
  }

  for (const r of (reviewsRes.data ?? []) as Row[]) {
    if (isCancelled(s(r.status)) || !r.scheduled_at) continue;
    const p = londonParts(s(r.scheduled_at)!);
    events.push({
      uid: `review-${r.id}@college.elec-mate.com`,
      summary: 'Progress review with your tutor and employer',
      date: p.date,
      time: p.time,
      minutes: (r.duration_minutes as number | null) ?? 60,
      location: s(r.location) ?? (r.meeting_url ? 'Online' : null),
      description: [
        'Your three-way progress review. Add your view in Elec-Mate before it.',
        s(r.meeting_url) ? `Join: ${s(r.meeting_url)}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      url: `${APP_URL}/apprentice/college-plan`,
      category: 'Progress review',
      updated: s(r.updated_at),
    });
  }

  for (const a of (assessRes.data ?? []) as Row[]) {
    if (isCancelled(s(a.status)) || !a.scheduled_date) continue;
    events.push({
      uid: `assessment-${a.id}@college.elec-mate.com`,
      summary: `Assessment: ${s(a.assessment_type) ?? 'booked assessment'}`,
      date: s(a.scheduled_date)!,
      time: timeOrNull(s(a.scheduled_time)),
      minutes: 60,
      location: s(a.location),
      category: 'Assessment',
      updated: s(a.updated_at),
    });
  }

  for (const e of (epaRes.data ?? []) as Row[]) {
    if (e.gateway_date) {
      events.push({
        uid: `gateway-${e.id}@college.elec-mate.com`,
        summary: 'EPA gateway',
        date: s(e.gateway_date)!,
        time: null,
        description: 'Your gateway date, as recorded by your college.',
        url: `${APP_URL}/apprentice/college/epa`,
        category: 'EPA',
        updated: s(e.updated_at),
      });
    }
    if (e.epa_date) {
      events.push({
        uid: `epa-${e.id}@college.elec-mate.com`,
        summary: 'End-point assessment',
        date: s(e.epa_date)!,
        time: null,
        description: 'Your end-point assessment date, as recorded by your college.',
        url: `${APP_URL}/apprentice/college/epa`,
        category: 'EPA',
        updated: s(e.updated_at),
      });
    }
  }

  // The cohort's weekly college day, as an all-day repeating event.
  for (const c of cohorts.values()) {
    if (isCancelled(s(c.status))) continue;
    const day = (s(c.meeting_day) ?? '').trim().toLowerCase().slice(0, 2);
    const code = DAY_CODES[day];
    if (!code) continue;
    // First occurrence on or after max(cohort start, window start).
    let start = s(c.start_date) && s(c.start_date)! > from ? s(c.start_date)! : from;
    const [y, m, d] = start.split('-').map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    start = addDays(start, (DAY_INDEX[code] - dow + 7) % 7);
    const end = s(c.end_date);
    if (end && end < start) continue;
    const time = (s(c.meeting_time) ?? '').trim();
    events.push({
      uid: `collegeday-${c.id}@college.elec-mate.com`,
      summary: time ? `College day (from ${time.slice(0, 5)})` : 'College day',
      date: start,
      time: null,
      rrule: `FREQ=WEEKLY;BYDAY=${code}${end ? `;UNTIL=${ymd(end)}` : ''}`,
      location: s(c.room),
      description: `Your weekly college day with ${s(c.name)}.`,
      url: `${APP_URL}/apprentice/college-plan`,
      category: 'College day',
    });
  }

  return { events, college: collegeName };
}

async function tutorEvents(
  db: Db,
  userId: string,
  from: string,
  to: string
): Promise<{ events: FeedEvent[]; college: string | null }> {
  const { data: staffRows } = await db
    .from('college_staff')
    .select('id, college_id, name, archived_at')
    .eq('user_id', userId);
  const staff = ((staffRows ?? []) as Row[]).filter((r) => !r.archived_at);
  if (staff.length === 0) return { events: [], college: null };
  const staffIds = staff.map((r) => s(r.id)!);
  const events: FeedEvent[] = [];

  const [collegeRes, lessonsRes, reviewsRes, assessRes, chairRes, attendRes, obsOfRes, obsByRes] =
    await Promise.all([
      db.from('colleges').select('name').eq('id', s(staff[0].college_id)).maybeSingle(),
      db
        .from('college_lesson_plans')
        .select(
          'id, title, cohort_id, scheduled_date, scheduled_start_time, duration_minutes, scheduled_room, objectives, status, created_at'
        )
        .in('tutor_id', staffIds)
        .gte('scheduled_date', from)
        .lte('scheduled_date', to),
      db
        .from('college_tripartite_reviews')
        .select(
          'id, student_id, scheduled_at, duration_minutes, location, meeting_url, status, updated_at, employer_contact_name'
        )
        .in('tutor_staff_id', staffIds)
        .gte('scheduled_at', `${from}T00:00:00Z`)
        .lte('scheduled_at', `${to}T23:59:59Z`),
      db
        .from('college_scheduled_assessments')
        .select(
          'id, student_id, assessment_type, scheduled_date, scheduled_time, location, status, updated_at'
        )
        .in('assessor_id', staffIds)
        .gte('scheduled_date', from)
        .lte('scheduled_date', to),
      db
        .from('college_standardisation_meetings')
        .select('id, topic, date, scheduled_at, duration_min, status, updated_at')
        .in('chair_id', staffIds),
      db
        .from('college_standardisation_meetings')
        .select('id, topic, date, scheduled_at, duration_min, status, updated_at')
        .overlaps('attendee_ids', staffIds),
      db
        .from('college_tutor_observations')
        .select(
          'id, observed_at, observed_time, duration_minutes, location, focus_area, observer_name_snapshot, tutor_name_snapshot, observation_kind, updated_at'
        )
        .in('tutor_staff_id', staffIds)
        .gte('observed_at', from)
        .lte('observed_at', to),
      db
        .from('college_tutor_observations')
        .select(
          'id, observed_at, observed_time, duration_minutes, location, focus_area, observer_name_snapshot, tutor_name_snapshot, observation_kind, updated_at'
        )
        .in('observer_staff_id', staffIds)
        .gte('observed_at', from)
        .lte('observed_at', to),
    ]);

  const lessons = (lessonsRes.data ?? []) as Row[];
  const cohortIds = [
    ...new Set(lessons.map((l) => s(l.cohort_id)).filter((x): x is string => !!x)),
  ];
  const studentIds = [
    ...new Set(
      [...((reviewsRes.data ?? []) as Row[]), ...((assessRes.data ?? []) as Row[])]
        .map((r) => s(r.student_id))
        .filter((x): x is string => !!x)
    ),
  ];
  const [cohortsRes, studentsRes] = await Promise.all([
    cohortIds.length
      ? db.from('college_cohorts').select('id, name, room').in('id', cohortIds)
      : Promise.resolve({ data: [] }),
    studentIds.length
      ? db.from('college_students').select('id, name').in('id', studentIds)
      : Promise.resolve({ data: [] }),
  ]);
  const cohorts = new Map<string, Row>(
    ((cohortsRes.data ?? []) as Row[]).map((c) => [s(c.id)!, c])
  );
  const students = new Map<string, string>(
    ((studentsRes.data ?? []) as Row[]).map((r) => [s(r.id)!, shortName(s(r.name))])
  );

  for (const l of lessons) {
    if (isCancelled(s(l.status)) || !l.scheduled_date) continue;
    const cohort = cohorts.get(s(l.cohort_id) ?? '');
    events.push({
      uid: `lesson-${l.id}@college.elec-mate.com`,
      summary: cohort ? `${s(l.title) ?? 'Class'} (${s(cohort.name)})` : (s(l.title) ?? 'Class'),
      date: s(l.scheduled_date)!,
      time: timeOrNull(s(l.scheduled_start_time)),
      minutes: (l.duration_minutes as number | null) ?? 60,
      location: s(l.scheduled_room) ?? s(cohort?.room),
      description: clip(s(l.objectives)) || null,
      url: `${APP_URL}/college/lessons/${l.id}`,
      category: 'Teaching',
      updated: s(l.created_at),
    });
  }

  for (const r of (reviewsRes.data ?? []) as Row[]) {
    if (isCancelled(s(r.status)) || !r.scheduled_at) continue;
    const p = londonParts(s(r.scheduled_at)!);
    events.push({
      uid: `review-${r.id}@college.elec-mate.com`,
      summary: `Progress review: ${students.get(s(r.student_id) ?? '') ?? 'learner'}`,
      date: p.date,
      time: p.time,
      minutes: (r.duration_minutes as number | null) ?? 60,
      location: s(r.location) ?? (r.meeting_url ? 'Online' : null),
      description: [
        s(r.employer_contact_name) ? `Employer: ${s(r.employer_contact_name)}` : null,
        s(r.meeting_url) ? `Join: ${s(r.meeting_url)}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      url: `${APP_URL}/college/reviews`,
      category: 'Progress review',
      updated: s(r.updated_at),
    });
  }

  for (const a of (assessRes.data ?? []) as Row[]) {
    if (isCancelled(s(a.status)) || !a.scheduled_date) continue;
    events.push({
      uid: `assessment-${a.id}@college.elec-mate.com`,
      summary: `Assessment: ${students.get(s(a.student_id) ?? '') ?? 'learner'}${a.assessment_type ? ` (${s(a.assessment_type)})` : ''}`,
      date: s(a.scheduled_date)!,
      time: timeOrNull(s(a.scheduled_time)),
      minutes: 60,
      location: s(a.location),
      category: 'Assessment',
      updated: s(a.updated_at),
    });
  }

  const meetings = new Map<string, Row>();
  for (const m of [...((chairRes.data ?? []) as Row[]), ...((attendRes.data ?? []) as Row[])])
    meetings.set(s(m.id)!, m);
  for (const m of meetings.values()) {
    if (isCancelled(s(m.status))) continue;
    let date: string | null = null;
    let time: string | null = null;
    if (m.scheduled_at) {
      const p = londonParts(s(m.scheduled_at)!);
      date = p.date;
      time = p.time;
    } else if (m.date) {
      date = s(m.date);
    }
    if (!date || date < from || date > to) continue;
    events.push({
      uid: `standardisation-${m.id}@college.elec-mate.com`,
      summary: `Standardisation: ${s(m.topic) ?? 'meeting'}`,
      date,
      time,
      minutes: (m.duration_min as number | null) ?? 60,
      url: `${APP_URL}/college`,
      category: 'Standardisation',
      updated: s(m.updated_at),
    });
  }

  const obs = new Map<string, { row: Row; observer: boolean }>();
  for (const o of (obsOfRes.data ?? []) as Row[]) obs.set(s(o.id)!, { row: o, observer: false });
  for (const o of (obsByRes.data ?? []) as Row[])
    if (!obs.has(s(o.id)!)) obs.set(s(o.id)!, { row: o, observer: true });
  for (const { row: o, observer } of obs.values()) {
    if (!o.observed_at) continue;
    events.push({
      uid: `observation-${o.id}@college.elec-mate.com`,
      summary: observer
        ? `Observing ${s(o.tutor_name_snapshot) ?? 'a tutor'} teach`
        : `Teaching observation${s(o.observer_name_snapshot) ? ` by ${s(o.observer_name_snapshot)}` : ''}`,
      date: s(o.observed_at)!,
      time: timeOrNull(s(o.observed_time)),
      minutes: (o.duration_minutes as number | null) ?? 60,
      location: s(o.location),
      description: s(o.focus_area) ? `Focus: ${s(o.focus_area)}` : null,
      category: 'Observation',
      updated: s(o.updated_at),
    });
  }

  return { events, college: s((collegeRes.data as Row | null)?.name) };
}

/* ───────────────────────────── handler ───────────────────────────── */

/**
 * A tutor's feed lands in a third-party calendar (Google, Outlook), so a
 * learner is named by first name and surname initial only: "Demo L.".
 */
function shortName(full: string | null | undefined): string {
  const parts = String(full ?? '').replace(/\s*\(.*?\)\s*/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'learner';
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { ...BASE_HEADERS, 'Access-Control-Allow-Methods': 'GET, HEAD' },
    });
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: BASE_HEADERS });
  }

  const token = (new URL(req.url).searchParams.get('token') ?? '').trim().toLowerCase();
  if (!TOKEN_RE.test(token)) return notFound();

  try {
    const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: feed, error } = await db
      .from('college_calendar_feeds')
      .select('id, user_id')
      .eq('token', token)
      .is('revoked_at', null)
      .maybeSingle();
    if (error || !feed) return notFound();

    const now = new Date();
    const londonToday = londonParts(now.toISOString()).date;
    const from = addDays(londonToday, -PAST_DAYS);
    const to = addDays(londonToday, FUTURE_DAYS);

    const [learner, tutor] = await Promise.all([
      learnerEvents(db, feed.user_id, from, to),
      tutorEvents(db, feed.user_id, from, to),
    ]);

    // A person who is both a learner and a tutor sees one copy of a shared row.
    const seen = new Set<string>();
    const events = [...learner.events, ...tutor.events].filter((e) => {
      if (seen.has(e.uid)) return false;
      seen.add(e.uid);
      return true;
    });
    events.sort((a, b) => (a.date + (a.time ?? '')).localeCompare(b.date + (b.time ?? '')));

    const college = learner.college ?? tutor.college;
    const calName = college ? `College: ${college}` : 'Elec-Mate college';

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Elec-Mate//College Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${esc(calName)}`,
      'X-WR-CALDESC:Your classes\\, deadlines and reviews from Elec-Mate. Private to you.',
      'X-WR-TIMEZONE:Europe/London',
      'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
      'X-PUBLISHED-TTL:PT1H',
      ...VTIMEZONE,
    ];
    for (const e of events) lines.push(...renderEvent(e, now));
    lines.push('END:VCALENDAR');
    const body = lines.map(fold).join('\r\n') + '\r\n';

    // Best effort; a failure here must not break the feed.
    try {
      await db
        .from('college_calendar_feeds')
        .update({ last_fetched_at: now.toISOString() })
        .eq('id', feed.id);
    } catch {
      /* ignore */
    }

    return new Response(req.method === 'HEAD' ? null : body, {
      status: 200,
      headers: {
        ...BASE_HEADERS,
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'inline; filename="college-calendar.ics"',
        'Cache-Control': 'private, max-age=900',
      },
    });
  } catch (err) {
    // Never log the request URL: it carries the token.
    console.error(
      'college-calendar-feed: failed to build feed',
      err instanceof Error ? err.message : 'unknown error'
    );
    return new Response('Could not build the calendar', {
      status: 500,
      headers: {
        ...BASE_HEADERS,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }
});
