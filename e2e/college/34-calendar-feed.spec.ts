/**
 * Journey 34 — subscribe to your college calendar (8 Oct 2026).
 *
 * As the fixture learner and the fixture tutor: make a private calendar link,
 * fetch the .ics from the college-calendar-feed edge function, check it parses
 * (VCALENDAR, VTIMEZONE, VEVENTs with DTSTART/DTEND/UID) and that a known
 * lesson and a known review sit at the right Europe/London wall-clock time.
 * Then rotate the link and check the old one 404s. The card's buttons are
 * checked on desktop (1440) and phone (390). Every token the run creates is
 * deleted at the end (admin SQL), or revoked if the CLI is not logged in.
 */
import { test, expect, type Page } from '@playwright/test';
import {
  SUPABASE_URL,
  actor,
  admin,
  adminAvailable,
  haveCreds,
  learnerRoll,
  lit,
  londonDate,
  signedInPage,
  tutorStaff,
  type Actor,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.describe.configure({ mode: 'serial' });

const FEED = `${SUPABASE_URL}/functions/v1/college-calendar-feed`;
const START = new Date(Date.now() - 5_000).toISOString();

interface VEvent {
  [prop: string]: string;
}

/** Unfolds RFC 5545 lines and returns the VEVENT property maps (params kept in the key). */
function parseIcs(text: string): { lines: string[]; events: VEvent[] } {
  const lines = text
    .replace(/\r\n[ \t]/g, '')
    .split(/\r\n/)
    .filter(Boolean);
  const events: VEvent[] = [];
  let cur: VEvent | null = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') cur = {};
    else if (line === 'END:VEVENT') {
      if (cur) events.push(cur);
      cur = null;
    } else if (cur) {
      const i = line.indexOf(':');
      cur[line.slice(0, i)] = line.slice(i + 1);
    }
  }
  return { lines, events };
}

async function fetchFeed(token: string, tries = 3): Promise<Response> {
  let last: Response | null = null;
  for (let i = 0; i < tries; i++) {
    last = await fetch(`${FEED}?token=${token}`);
    if (last.status < 500) return last;
    await new Promise((r) => setTimeout(r, 1500));
  }
  return last!;
}

async function issue(a: Actor, rotate = false): Promise<string> {
  const { data, error } = await a.db.rpc('get_my_college_calendar_feed', { p_rotate: rotate });
  if (error) throw new Error(`get_my_college_calendar_feed: ${error.message}`);
  const row = (Array.isArray(data) ? data[0] : data) as { token: string };
  expect(row.token).toMatch(/^[0-9a-f]{64}$/);
  return row.token;
}

function validCalendar(text: string) {
  const { lines, events } = parseIcs(text);
  expect(lines[0]).toBe('BEGIN:VCALENDAR');
  expect(lines[lines.length - 1]).toBe('END:VCALENDAR');
  expect(lines).toContain('VERSION:2.0');
  expect(lines).toContain('TZID:Europe/London');
  for (const e of events) {
    const keys = Object.keys(e);
    expect(e.UID, 'every event has a UID').toMatch(/@college\.elec-mate\.com$/);
    expect(
      keys.some((k) => k.startsWith('DTSTART')),
      `${e.UID} has DTSTART`
    ).toBe(true);
    expect(
      keys.some((k) => k.startsWith('DTEND')),
      `${e.UID} has DTEND`
    ).toBe(true);
    expect(e.SUMMARY, `${e.UID} has SUMMARY`).toBeTruthy();
  }
  // Folded lines never exceed 75 octets.
  for (const raw of text.split('\r\n')) expect(Buffer.byteLength(raw)).toBeLessThanOrEqual(75);
  const uids = events.map((e) => e.UID);
  expect(new Set(uids).size, 'UIDs are unique').toBe(uids.length);
  return events;
}

/** London wall clock of a timestamptz, as an iCalendar local stamp. */
function londonStamp(iso: string): string {
  const p = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(iso));
  const g = (t: string) => p.find((x) => x.type === t)!.value;
  return `${g('year')}${g('month')}${g('day')}T${g('hour')}${g('minute')}${g('second')}`;
}

async function phoneOverflow(page: Page) {
  const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(o, `phone overflow ${o}px`).toBeLessThanOrEqual(1);
}

test.afterAll(async () => {
  const l = await actor('learner');
  const t = await actor('tutor');
  if (adminAvailable()) {
    admin(
      `delete from public.college_calendar_feeds where user_id in (${lit(l.userId)}, ${lit(t.userId)}) and created_at >= ${lit(START)}`
    );
  } else {
    await l.db.rpc('revoke_my_college_calendar_feed');
    await t.db.rpc('revoke_my_college_calendar_feed');
  }
});

test('learner: the feed carries their classes and reviews at London time, and rotating kills the old link', async () => {
  const l = await actor('learner');
  const roll = await learnerRoll();
  const token = await issue(l);

  const res = await fetchFeed(token);
  expect(res.status).toBe(200);
  expect(res.headers.get('content-type')).toContain('text/calendar');
  expect(res.headers.get('cache-control') ?? '').toContain('max-age');
  const text = await res.text();
  const events = validCalendar(text);
  expect(events.length).toBeGreaterThan(0);

  // A known timed lesson for the learner's cohort, inside the feed window.
  const { data: lessons } = await l.db
    .from('college_lesson_plans')
    .select('id, title, scheduled_date, scheduled_start_time, duration_minutes, status')
    .eq('cohort_id', roll.cohort_id!)
    .gte('scheduled_date', londonDate(-30))
    .lte('scheduled_date', londonDate(300))
    .not('scheduled_start_time', 'is', null)
    .order('scheduled_date', { ascending: true })
    .limit(5);
  const lesson = ((lessons ?? []) as Array<Record<string, string | number | null>>).find(
    (x) => !/cancel/i.test(String(x.status ?? ''))
  );
  if (lesson) {
    const ev = events.find((e) => e.UID === `lesson-${lesson.id}@college.elec-mate.com`);
    expect(ev, `lesson ${lesson.title} is in the feed`).toBeTruthy();
    const date = String(lesson.scheduled_date).replace(/-/g, '');
    const time = String(lesson.scheduled_start_time).slice(0, 8).replace(/:/g, '');
    expect(ev!['DTSTART;TZID=Europe/London']).toBe(`${date}T${time}`);
    const [hh, mm] = String(lesson.scheduled_start_time).split(':').map(Number);
    const endMin = hh * 60 + mm + Number(lesson.duration_minutes ?? 60);
    if (endMin < 24 * 60) {
      const end = `${String(Math.floor(endMin / 60)).padStart(2, '0')}${String(endMin % 60).padStart(2, '0')}`;
      expect(ev!['DTEND;TZID=Europe/London']).toBe(`${date}T${end}00`);
    }
  } else {
    test
      .info()
      .annotations.push({
        type: 'note',
        description: 'No timed lesson for the fixture cohort in the window',
      });
  }

  // A booked review: timestamptz converted to the London wall clock.
  const { data: reviews } = await l.db
    .from('college_tripartite_reviews')
    .select('id, scheduled_at, status')
    .eq('student_id', roll.id)
    .gte('scheduled_at', new Date().toISOString())
    .neq('status', 'cancelled')
    .order('scheduled_at', { ascending: true })
    .limit(1);
  const review = (reviews ?? [])[0] as { id: string; scheduled_at: string } | undefined;
  if (review) {
    const ev = events.find((e) => e.UID === `review-${review.id}@college.elec-mate.com`);
    expect(ev, 'the booked review is in the feed').toBeTruthy();
    expect(ev!['DTSTART;TZID=Europe/London']).toBe(londonStamp(review.scheduled_at));
  }

  // Sample for the report.
  const first = text.slice(text.indexOf('BEGIN:VEVENT'), text.indexOf('END:VEVENT') + 10);
  console.log(`[learner feed] ${events.length} events; first:\n${first}`);

  // Rotate: the old token 404s, the new one serves.
  const fresh = await issue(l, true);
  expect(fresh).not.toBe(token);
  expect((await fetchFeed(token)).status).toBe(404);
  expect((await fetchFeed(fresh)).status).toBe(200);

  // Garbage and unknown tokens 404 too.
  expect((await fetchFeed('not-a-token')).status).toBe(404);
  expect((await fetchFeed('0'.repeat(64))).status).toBe(404);
});

test('tutor: the feed carries the classes they teach', async () => {
  const t = await actor('tutor');
  const staff = await tutorStaff();
  const token = await issue(t);
  const res = await fetchFeed(token);
  expect(res.status).toBe(200);
  const text = await res.text();
  const events = validCalendar(text);

  const { data: lessons } = await t.db
    .from('college_lesson_plans')
    .select('id, title, scheduled_date, scheduled_start_time, status')
    .eq('tutor_id', staff.id)
    .gte('scheduled_date', londonDate(-30))
    .lte('scheduled_date', londonDate(300))
    .not('scheduled_start_time', 'is', null)
    .limit(5);
  const lesson = ((lessons ?? []) as Array<Record<string, string | null>>).find(
    (x) => !/cancel/i.test(String(x.status ?? ''))
  );
  if (lesson) {
    const ev = events.find((e) => e.UID === `lesson-${lesson.id}@college.elec-mate.com`);
    expect(ev, `taught lesson ${lesson.title} is in the tutor feed`).toBeTruthy();
    expect(ev!['DTSTART;TZID=Europe/London']).toBe(
      `${String(lesson.scheduled_date).replace(/-/g, '')}T${String(lesson.scheduled_start_time).slice(0, 8).replace(/:/g, '')}`
    );
  }
  console.log(`[tutor feed] ${events.length} events`);

  const fresh = await issue(t, true);
  expect((await fetchFeed(token)).status).toBe(404);
  expect((await fetchFeed(fresh)).status).toBe(200);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`learner card on /apprentice/college-plan (${viewport})`, async ({ browser }) => {
    const l = await actor('learner');
    // Start from no link so the card's own "Get my calendar link" is exercised.
    await l.db.rpc('revoke_my_college_calendar_feed');
    const { page, context, errors } = await signedInPage(browser, 'learner', viewport);
    await page.goto('/apprentice/college-plan');
    const card = page.getByTestId('college-calendar-card');
    await expect(card).toBeVisible({ timeout: 45_000 });
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByRole('heading', { name: 'Add to my calendar' })).toBeVisible();
    await card.getByRole('button', { name: 'Get my calendar link' }).click();

    const apple = card.getByTestId('calendar-apple');
    await expect(apple).toBeVisible();
    await expect(apple).toHaveText('Add to Apple / iPhone calendar');
    const webcal = await apple.getAttribute('href');
    expect(webcal).toMatch(
      /^webcal:\/\/jtwygbeceundfgnkirof\.supabase\.co\/functions\/v1\/college-calendar-feed\?token=[0-9a-f]{64}$/
    );
    const google = await card.getByTestId('calendar-google').getAttribute('href');
    expect(google).toBe(
      `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal!)}`
    );
    await expect(card.getByTestId('calendar-copy')).toHaveText('Copy link');
    await expect(card.getByText('Private to you.', { exact: false }).first()).toBeVisible();
    for (const id of ['calendar-apple', 'calendar-google', 'calendar-copy', 'calendar-rotate']) {
      const box = await card.getByTestId(id).boundingBox();
      expect(box!.height, `${id} is a 44px target`).toBeGreaterThanOrEqual(44);
    }

    // New link through the card: the old URL stops working.
    const oldToken = webcal!.split('token=')[1];
    await card.getByTestId('calendar-rotate').click();
    await card.getByTestId('calendar-confirm').click();
    await expect(apple).not.toHaveAttribute('href', webcal!);
    expect((await fetchFeed(oldToken)).status).toBe(404);

    if (viewport === 'phone') await phoneOverflow(page);
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });

  test(`tutor card on the timetable (${viewport})`, async ({ browser }) => {
    const t = await actor('tutor');
    await issue(t); // card opens with a live link
    const { page, context, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto('/college?section=timetable');
    const card = page.getByTestId('college-calendar-card');
    await expect(card).toBeVisible({ timeout: 45_000 });
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByTestId('calendar-apple')).toBeVisible();
    await expect(card.getByTestId('calendar-google')).toHaveText('Add to Google Calendar');
    await expect(card.getByTestId('calendar-copy')).toBeVisible();

    // Stop sharing through the card.
    await card.getByTestId('calendar-stop').click();
    await card.getByTestId('calendar-confirm').click();
    await expect(card.getByRole('button', { name: 'Get my calendar link' })).toBeVisible();

    if (viewport === 'phone') await phoneOverflow(page);
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });
}
