/**
 * Shared plumbing for the College Hub journey tests (ELE-1968).
 *
 * Two fixture accounts at the Northgate demo college, both fictional:
 *   tutor   founder+collegedemo-tutor@elec-mate.com   ("Demo Tutor (fixture)")
 *   learner founder+collegedemo-learner@elec-mate.com ("Demo Learner (fixture)")
 *
 * Credentials come from the environment in CI —
 *   COLLEGE_E2E_TUTOR_EMAIL / COLLEGE_E2E_TUTOR_PASSWORD
 *   COLLEGE_E2E_LEARNER_EMAIL / COLLEGE_E2E_LEARNER_PASSWORD
 * — and fall back to the gitignored e2e/.auth/college-demo-*.json files locally.
 * A password is never printed.
 *
 * Every row a test creates carries the run marker (`E2E·<run>`) in a title,
 * subject or note, is deleted by id when the test ends, and `sweepStale()`
 * removes anything an earlier crashed run left behind. Deletes go through the
 * Supabase CLI's Management API (`db query --linked`) because several of the
 * rows a journey creates — a verified OTJ entry, a signed submission, an
 * assessment decision — are append-only to every app role by design. So the
 * journeys that write need a logged-in CLI or SUPABASE_ACCESS_TOKEN; without
 * one they skip rather than leave data on the live demo college.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient, type Session } from '@supabase/supabase-js';
import type { Browser, BrowserContext, Page } from '@playwright/test';

export const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
export const PROJECT_REF = 'jtwygbeceundfgnkirof';
// Public anon key (already shipped in the web bundle and e2e/fixtures/auth.ts).
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const STORAGE_KEY = 'sb-jtwygbeceundfgnkirof-auth-token';

export const NORTHGATE = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
/** Emails of accounts the tests may notify. Anything else is a real person. */
export const FIXTURE_EMAIL = /^founder\+collegedemo-(tutor|learner)@elec-mate\.com$/i;

/** One marker per run, so a test only ever touches its own rows. */
export const RUN = `E2E·${Date.now().toString(36)}`;

export type Who = 'tutor' | 'learner';

interface Creds {
  email: string;
  password: string;
}

function readCreds(who: Who): Creds | null {
  const up = who.toUpperCase();
  const email = process.env[`COLLEGE_E2E_${up}_EMAIL`];
  const password = process.env[`COLLEGE_E2E_${up}_PASSWORD`];
  if (email && password) return { email, password };
  const file = path.resolve(process.cwd(), `e2e/.auth/college-demo-${who}.json`);
  try {
    const j = JSON.parse(fs.readFileSync(file, 'utf8')) as Partial<Creds>;
    if (j.email && j.password) return { email: j.email, password: j.password };
  } catch {
    /* no local fixture file */
  }
  return null;
}

export function haveCreds(): boolean {
  return !!readCreds('tutor') && !!readCreds('learner');
}

export interface Actor {
  who: Who;
  db: SupabaseClient;
  session: Session;
  userId: string;
  email: string;
}

const actors = new Map<Who, Actor>();

/** Signs the fixture in once per worker and returns a client acting as them. */
export async function actor(who: Who): Promise<Actor> {
  const cached = actors.get(who);
  if (cached) return cached;
  const creds = readCreds(who);
  if (!creds) throw new Error(`No credentials for the fixture ${who}`);
  const auth = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await auth.auth.signInWithPassword(creds);
  if (error || !data.session) throw new Error(`Fixture ${who} could not sign in: ${error?.message ?? 'no session'}`);
  const db = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });
  const a: Actor = { who, db, session: data.session, userId: data.session.user.id, email: creds.email };
  actors.set(who, a);
  return a;
}

/** A browser context already signed in as the fixture (same localStorage shape the app uses). */
export async function signedInPage(
  browser: Browser,
  who: Who,
  viewport: 'desktop' | 'phone' = 'desktop'
): Promise<{ context: BrowserContext; page: Page; errors: string[] }> {
  const a = await actor(who);
  const context = await browser.newContext(
    viewport === 'phone'
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'en-GB', timezoneId: 'Europe/London' }
      : { viewport: { width: 1440, height: 900 }, locale: 'en-GB', timezoneId: 'Europe/London' }
  );
  await context.addInitScript(
    ([k, v]) => {
      try {
        if (!window.localStorage.getItem(k)) window.localStorage.setItem(k, v);
        window.localStorage.setItem(
          'elec-mate-cookie-consent',
          JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() })
        );
      } catch {
        /* storage blocked */
      }
    },
    [STORAGE_KEY, JSON.stringify(a.session)] as const
  );
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
  return { context, page, errors };
}

/* ───────────────────────────── admin SQL (cleanup only) ───────────────────────────── */

let adminOk: boolean | null = null;

/** Runs SQL as the project owner via the Supabase CLI. Used ONLY to delete test rows by id. */
export function admin<T = Record<string, unknown>>(sql: string): T[] {
  const out = execFileSync(
    'npx',
    ['--yes', 'supabase', 'db', 'query', '--linked', '--project-ref', PROJECT_REF, '-o', 'json', sql],
    { cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 }
  );
  const start = out.indexOf('{');
  if (start === -1) return [];
  const json = JSON.parse(out.slice(start, out.lastIndexOf('}') + 1)) as { rows?: T[] };
  return json.rows ?? [];
}

export function adminAvailable(): boolean {
  if (adminOk !== null) return adminOk;
  try {
    adminOk = admin<{ ok: number }>('select 1 as ok')[0]?.ok === 1;
  } catch {
    adminOk = false;
  }
  return adminOk;
}

/** SQL literal for a uuid/text value (ids come from the database, markers from RUN). */
export const lit = (v: string) => `'${v.replace(/'/g, "''")}'`;

/**
 * Removes anything an earlier, crashed run left behind: every row whose
 * title/subject/note starts with "E2E·" and is older than ten minutes, on the
 * fixture learner only. Idempotent.
 */
export function sweepStale(learnerId: string, studentRowId: string) {
  const L = lit(learnerId);
  const S = lit(studentRowId);
  admin(`
    delete from public.user_notifications where user_id in (${L}) and (title like '%E2E·%' or message like '%E2E·%') and created_at < now() - interval '10 minutes';
    delete from public.learning_activity_log where user_id = ${L} and source_title like 'E2E·%' and created_at < now() - interval '10 minutes';
    delete from public.tutor_quiz_attempts where student_id = ${L} and quiz_id in (select id from public.tutor_quizzes where title like 'E2E·%' and created_at < now() - interval '10 minutes');
    delete from public.tutor_quizzes where title like 'E2E·%' and created_at < now() - interval '10 minutes';
    delete from public.college_otj_entries where student_id = ${L} and title like 'E2E·%' and created_at < now() - interval '10 minutes';
    delete from public.student_messages where thread_id in (select id from public.student_message_threads where student_id = ${S} and subject like 'E2E·%' and created_at < now() - interval '10 minutes');
    delete from public.student_message_threads where student_id = ${S} and subject like 'E2E·%' and created_at < now() - interval '10 minutes';
    delete from public.college_ilp_goals where student_id = ${S} and title like 'E2E·%' and created_at < now() - interval '10 minutes';
    delete from public.college_attendance where student_id = ${S} and notes like 'E2E·%' and created_at < now() - interval '10 minutes';
    delete from public.college_lesson_plans where college_id = ${lit(NORTHGATE)} and title like 'E2E·%' and created_at < now() - interval '10 minutes';
  `);
}

/** Europe/London calendar date, offset by `days`, as YYYY-MM-DD. */
export function londonDate(days = 0): string {
  const d = new Date(Date.now() + days * 86_400_000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(d);
}

/** The fixture learner's roll row (college_students), read as the learner. */
export async function learnerRoll(): Promise<{ id: string; college_id: string; cohort_id: string | null }> {
  const l = await actor('learner');
  const { data, error } = await l.db
    .from('college_students')
    .select('id, college_id, cohort_id')
    .eq('user_id', l.userId)
    .maybeSingle();
  if (error || !data) throw new Error(`Fixture learner has no college roll row: ${error?.message ?? 'none'}`);
  return data as { id: string; college_id: string; cohort_id: string | null };
}

/** The fixture tutor's college_staff row, read as the tutor. */
export async function tutorStaff(): Promise<{ id: string; college_id: string; name: string }> {
  const t = await actor('tutor');
  const { data, error } = await t.db
    .from('college_staff')
    .select('id, college_id, name')
    .eq('user_id', t.userId)
    .maybeSingle();
  if (error || !data) throw new Error(`Fixture tutor has no staff row: ${error?.message ?? 'none'}`);
  return data as { id: string; college_id: string; name: string };
}

export interface LearnerContext {
  student_id: string;
  college_id: string;
  college_name: string;
  cohort_id: string | null;
  cohort_name: string | null;
  tutor_name: string | null;
  tutor_staff_id: string | null;
  qualification_code: string | null;
}

/** What the app itself reads to show the learner their college (get_my_college_context). */
export async function learnerContext(): Promise<LearnerContext> {
  const l = await actor('learner');
  const { data, error } = await l.db.rpc('get_my_college_context');
  const ctx = (data as { learner?: LearnerContext } | null)?.learner;
  if (error || !ctx) throw new Error(`No college context for the fixture learner: ${error?.message ?? 'none'}`);
  return ctx;
}

/**
 * Who gets the push when the learner sends hours to "their tutor": the cohort
 * tutor. A journey that pushes the cohort tutor only runs when that person is
 * a fixture account, so a nightly run never buzzes a real tutor's phone.
 */
export async function learnersCohortTutorEmail(): Promise<string | null> {
  const t = await actor('tutor');
  const ctx = await learnerContext();
  if (!ctx.tutor_staff_id) return null;
  const { data: staff } = await t.db.from('college_staff').select('email').eq('id', ctx.tutor_staff_id).maybeSingle();
  return (staff as { email?: string } | null)?.email ?? null;
}

/** Reloads until `check` passes (realtime is not guaranteed in a headless run). */
export async function eventually(page: Page, check: () => Promise<void>, tries = 4) {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      await check();
      return;
    } catch (e) {
      last = e;
      await page.reload({ waitUntil: 'domcontentloaded' });
    }
  }
  throw last;
}
