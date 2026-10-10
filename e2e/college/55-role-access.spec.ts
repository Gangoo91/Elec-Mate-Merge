/**
 * ELE-1914 — access control per role, through the LIVE API.
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/55-role-access.spec.ts
 *
 * `npm run rls:verify` proves the policies inside Postgres with transient
 * actors in a rolled-back transaction. This spec is the other half: each
 * fixture account signs in for real, gets a real JWT, and tries every
 * sensitive read and write through PostgREST and Storage exactly as the app
 * (or an attacker with the anon key) would.
 *
 * Roles: learner, tutor, assessor, IQA, college admin, employer, anonymous.
 * Credentials: COLLEGE_E2E_<ROLE>_EMAIL / COLLEGE_E2E_<ROLE>_PASSWORD, else the
 * gitignored e2e/.auth/college-demo-<role>.json. A role with no credentials
 * is SKIPPED with a message that names the missing account, and the summary
 * at the end lists every role as covered or missing. No account is created.
 *
 * Writes are harmless by construction: every write here is one that must be
 * refused. If one is ever accepted, the test puts the row back (or deletes
 * it by id) through the Supabase CLI and fails, naming the hole.
 */
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, NORTHGATE, admin, adminAvailable, lit, RUN } from './support';

// Public anon key (already shipped in the web bundle and support.ts).
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

/** A second college (South Thames demo). Nobody in this spec belongs to it. */
const OTHER_COLLEGE = 'b2c3d4e5-f6a7-8901-bcde-f23456789012';

type Role = 'learner' | 'tutor' | 'assessor' | 'iqa' | 'admin' | 'employer';
const ROLES: Role[] = ['learner', 'tutor', 'assessor', 'iqa', 'admin', 'employer'];

/** The fixture account each role should be, so a missing one can be named. */
const EXPECTED_ACCOUNT: Record<Role, string> = {
  learner: 'founder+collegedemo-learner@elec-mate.com',
  tutor: 'founder+collegedemo-tutor@elec-mate.com',
  assessor: 'founder+collegedemo-assessor@elec-mate.com',
  iqa: 'founder+collegedemo-iqa@elec-mate.com',
  admin:
    'founder+collegedemo-admin@elec-mate.com (college admin at Northgate — does not exist yet)',
  employer:
    'founder+collegedemo-employer@elec-mate.com (employer linked to the fixture learner — does not exist yet)',
};

function readCreds(role: Role): { email: string; password: string } | null {
  const up = role.toUpperCase();
  const email = process.env[`COLLEGE_E2E_${up}_EMAIL`];
  const password = process.env[`COLLEGE_E2E_${up}_PASSWORD`];
  if (email && password) return { email, password };
  try {
    const j = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), `e2e/.auth/college-demo-${role}.json`), 'utf8')
    ) as { email?: string; password?: string };
    if (j.email && j.password) return { email: j.email, password: j.password };
  } catch {
    /* no local fixture file */
  }
  return null;
}

function missingMessage(role: Role) {
  const up = role.toUpperCase();
  return `No ${role} fixture: needs ${EXPECTED_ACCOUNT[role]} with COLLEGE_E2E_${up}_EMAIL / COLLEGE_E2E_${up}_PASSWORD (CI secrets) or e2e/.auth/college-demo-${role}.json (local)`;
}

interface Signed {
  db: SupabaseClient;
  userId: string;
}
const signed = new Map<Role, Signed>();

async function signIn(role: Role): Promise<Signed> {
  const hit = signed.get(role);
  if (hit) return hit;
  const creds = readCreds(role);
  if (!creds) throw new Error(missingMessage(role));
  const auth = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await auth.auth.signInWithPassword(creds);
  if (error || !data.session)
    throw new Error(`${role} fixture could not sign in: ${error?.message ?? 'no session'}`);
  const db = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });
  const s = { db, userId: data.session.user.id };
  signed.set(role, s);
  return s;
}

const anonDb = () =>
  createClient(SUPABASE_URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });

/* ───────────────────────────── the table list ───────────────────────────── */

/** Reference tables any signed-in user may read (no learner data in them). */
const REFERENCE = new Set([
  'colleges',
  'college_courses',
  'college_apprentice_surveys',
  'college_capabilities',
]);

/** Security-invoker aggregate views: one row per college, counts under the caller's RLS. */
const AGGREGATE_VIEWS: Record<string, string[]> = {
  v_portfolio_stats_by_college: ['total_students', 'total_submissions'],
};

/** Fallback when the CLI is not available: the tables that matter most. */
const STATIC_COLLEGE_TABLES = [
  'college_students',
  'college_staff',
  'college_cohorts',
  'college_attendance',
  'college_ilp_goals',
  'college_lesson_plans',
  'college_invites',
  'college_activity',
  'college_employer_tokens',
  'pastoral_notes',
];

let collegeTables: string[] | null = null;
/** Every public table or view with a college_id column (the same rule rls:verify's sweep uses). */
function tablesWithCollegeId(): string[] {
  if (collegeTables) return collegeTables;
  if (!adminAvailable()) return (collegeTables = STATIC_COLLEGE_TABLES);
  const rows = admin<{ t: string }>(`
    select c.table_name as t
      from information_schema.columns c
      join information_schema.tables t using (table_schema, table_name)
     where c.table_schema = 'public' and c.column_name = 'college_id'
       and t.table_type in ('BASE TABLE', 'VIEW')
     order by 1`);
  collegeTables = rows.map((r) => r.t).filter((t) => t !== 'college_outreach');
  return collegeTables;
}

/** Reads college_id from every college table; returns per-table visible counts. */
async function sweep(db: SupabaseClient) {
  const out: { t: string; rows: number; foreign: number; denied: boolean }[] = [];
  const tables = tablesWithCollegeId();
  for (let i = 0; i < tables.length; i += 8) {
    const batch = tables.slice(i, i + 8);
    const res = await Promise.all(
      batch.map(async (t) => {
        // Aggregate views list every college by name (colleges is reference
        // data) with counts computed under the caller's own RLS: a foreign row
        // is only a leak if it carries a non-zero count.
        const agg = AGGREGATE_VIEWS[t];
        const { data, error } = await db
          .from(t)
          .select(agg ? ['college_id', ...agg].join(',') : 'college_id')
          .limit(1000);
        if (error) return { t, rows: 0, foreign: 0, denied: true };
        const all = (data ?? []) as unknown as Record<string, unknown>[];
        const rows = (
          agg
            ? all.filter(
                (r) => r.college_id === NORTHGATE || agg.some((c) => Number(r[c] ?? 0) !== 0)
              )
            : all
        ) as { college_id: string | null }[];
        return {
          t,
          rows: rows.length,
          foreign: rows.filter((r) => r.college_id && r.college_id !== NORTHGATE).length,
          denied: false,
        };
      })
    );
    out.push(...res);
  }
  return out;
}

/* ───────────────────────────── summary ───────────────────────────── */

const summary: { role: string; status: string; checks: number; note: string }[] = [];
function record(role: string, status: string, checks: number, note = '') {
  summary.push({ role, status, checks, note });
}

test.afterAll(() => {
  const covered = summary.filter((s) => s.status === 'covered').map((s) => s.role);
  const missing = summary.filter((s) => s.status === 'MISSING');
  const lines = [
    '',
    'ELE-1914 access control per role — live API',
    'role        status    checks  note',
    ...summary.map(
      (s) => `${s.role.padEnd(11)} ${s.status.padEnd(9)} ${String(s.checks).padStart(6)}  ${s.note}`
    ),
    '',
    `covered: ${covered.join(', ') || 'none'}`,
    `missing fixture accounts: ${missing.map((m) => m.role).join(', ') || 'none'}`,
    '',
  ];
  console.log(lines.join('\n'));
});

/* ───────────────────────────── shared checks ───────────────────────────── */

/** Tries to promote yourself on profiles; must be refused. Reverts and fails if not. */
async function cannotSelfEscalateProfile(role: Role, s: Signed) {
  const { data: before } = await s.db
    .from('profiles')
    .select('college_id, college_role, admin_role, role')
    .eq('id', s.userId)
    .single();
  expect(before, `${role}: reads own profile`).toBeTruthy();
  await s.db
    .from('profiles')
    .update({ college_role: 'admin', admin_role: 'admin', college_id: OTHER_COLLEGE })
    .eq('id', s.userId);
  const { data: after } = await s.db
    .from('profiles')
    .select('college_id, college_role, admin_role, role')
    .eq('id', s.userId)
    .single();
  const changed = JSON.stringify(after) !== JSON.stringify(before);
  if (changed && adminAvailable()) {
    const b = before as Record<string, string | null>;
    const v = (x: string | null) => (x === null ? 'null' : lit(x));
    admin(
      `update public.profiles set college_id = ${v(b.college_id)}, college_role = ${v(b.college_role)}, admin_role = ${v(b.admin_role)} where id = ${lit(s.userId)}`
    );
  }
  expect(changed, `${role}: HOLE — could change own college_id / college_role / admin_role`).toBe(
    false
  );
}

/** Every visible college row is Northgate's (staff and learners are all at Northgate). */
async function seesNoOtherCollege(role: Role, s: Signed) {
  const res = await sweep(s.db);
  const leaks = res.filter((r) => r.foreign > 0).map((r) => `${r.t}(${r.foreign})`);
  expect(leaks, `${role}: rows from another college visible in ${leaks.join(', ')}`).toEqual([]);
  return res;
}

/** A staff member cannot add anything to a college they are not in. */
async function cannotWriteOtherCollege(role: Role, s: Signed) {
  const title = `${RUN} ${role} cross-college`;
  const { data } = await s.db
    .from('college_cohorts')
    .insert({ college_id: OTHER_COLLEGE, name: title })
    .select('id');
  const leaked = (data ?? []) as { id: string }[];
  if (leaked.length && adminAvailable()) {
    admin(
      `delete from public.college_cohorts where id in (${leaked.map((r) => lit(r.id)).join(',')})`
    );
  }
  expect(leaked.length, `${role}: HOLE — created a cohort at another college`).toBe(0);

  const { data: s2 } = await s.db
    .from('college_students')
    .insert({ college_id: OTHER_COLLEGE, name: title, email: 'rls-55@example.invalid' })
    .select('id');
  const leaked2 = (s2 ?? []) as { id: string }[];
  if (leaked2.length && adminAvailable()) {
    admin(
      `delete from public.college_students where id in (${leaked2.map((r) => lit(r.id)).join(',')})`
    );
  }
  expect(leaked2.length, `${role}: HOLE — enrolled a learner at another college`).toBe(0);
}

/** A staff member cannot raise their own college_staff role or safeguarding duty. */
async function cannotSelfPromoteStaff(role: Role, s: Signed) {
  const { data: before } = await s.db
    .from('college_staff')
    .select('id, role, is_dsl, is_deputy_dsl')
    .eq('user_id', s.userId)
    .maybeSingle();
  expect(before, `${role}: reads own staff row`).toBeTruthy();
  const b = before as { id: string; role: string; is_dsl: boolean; is_deputy_dsl: boolean };
  await s.db.from('college_staff').update({ role: 'admin' }).eq('id', b.id);
  if (!b.is_dsl) await s.db.from('college_staff').update({ is_dsl: true }).eq('id', b.id);
  const { data: after } = await s.db
    .from('college_staff')
    .select('id, role, is_dsl, is_deputy_dsl')
    .eq('id', b.id)
    .single();
  const changed = JSON.stringify(after) !== JSON.stringify(before);
  if (changed && adminAvailable()) {
    admin(
      `update public.college_staff set role = ${lit(b.role)}, is_dsl = ${b.is_dsl}, is_deputy_dsl = ${b.is_deputy_dsl} where id = ${lit(b.id)}`
    );
  }
  expect(changed, `${role}: HOLE — promoted self in college_staff`).toBe(false);
}

/** Safeguarding notes the caller can read (visibility = 'safeguarding', the column the policies gate on). */
async function safeguardingVisible(s: Signed): Promise<string[]> {
  const { data, error } = await s.db
    .from('pastoral_notes')
    .select('id')
    .or('visibility.eq.safeguarding,kind.eq.safeguarding');
  return error ? [] : ((data ?? []) as { id: string }[]).map((r) => r.id).sort();
}

/**
 * What the rules say this staff member should read, computed as the owner:
 * a DSL / deputy reads every safeguarding note at the college; anyone else
 * only their OWN learners' (cohort tutor, or tutor named on the assignment —
 * ELE-1911, Andrew 8 Oct). null when the CLI is not available.
 */
function expectedSafeguarding(userId: string, isLead: boolean): string[] | null {
  if (!adminAvailable()) return null;
  const rows = admin<{ id: string }>(
    isLead
      ? `select id from public.pastoral_notes where college_id = ${lit(NORTHGATE)} and (visibility = 'safeguarding' or kind = 'safeguarding') order by id`
      : `select n.id from public.pastoral_notes n
           join public.college_students s on s.id = n.student_id
           join public.college_staff me on me.user_id = ${lit(userId)} and me.archived_at is null and me.college_id = s.college_id
          where (n.visibility = 'safeguarding' or n.kind = 'safeguarding')
            and (exists (select 1 from public.college_cohorts c where c.id = s.cohort_id and c.tutor_id = me.id)
                 or exists (select 1 from public.college_student_assignments a where a.student_id = s.user_id and a.tutor_id = me.id))
          order by n.id`
  );
  return rows.map((r) => r.id).sort();
}

/* ───────────────────────────── per role ───────────────────────────── */

test.describe('ELE-1914 access control per role (live API)', () => {
  test('learner: own rows only, no safeguarding, no self-escalation, no self sign-off', async () => {
    if (!readCreds('learner')) {
      record('learner', 'MISSING', 0, missingMessage('learner'));
      test.skip(true, missingMessage('learner'));
    }
    const s = await signIn('learner');
    let n = 0;

    const { data: roll } = await s.db.from('college_students').select('id, user_id, college_id');
    const rolls = (roll ?? []) as { id: string; user_id: string; college_id: string }[];
    expect(rolls.length, 'learner: sees own roll row').toBeGreaterThan(0);
    expect(
      rolls.every((r) => r.user_id === s.userId),
      'learner: sees only own roll row'
    ).toBe(true);
    const sid = rolls[0].id;
    n += 2;

    const own = async (table: string, col: string, ids: string[]) => {
      const { data, error } = await s.db.from(table).select(col).limit(1000);
      if (error) return; // not granted = cannot read
      const rows = (data ?? []) as unknown as Record<string, string | null>[];
      const others = rows.filter((r) => r[col] && !ids.includes(r[col] as string));
      expect(others.length, `learner: sees ${others.length} other people's rows in ${table}`).toBe(
        0
      );
      n++;
    };
    await own('portfolio_submissions', 'user_id', [s.userId]);
    await own('college_otj_entries', 'student_id', [s.userId, sid]);
    await own('college_ilp_goals', 'student_id', [sid, s.userId]);
    await own('college_attendance', 'student_id', [sid, s.userId]);
    await own('student_message_threads', 'student_id', [sid, s.userId]);
    await own('portfolio_items', 'user_id', [s.userId]);

    expect(await safeguardingVisible(s), 'learner: reads no safeguarding notes').toEqual([]);
    n++;
    const { data: tokens } = await s.db.from('college_employer_tokens').select('*').limit(5);
    expect((tokens ?? []).length, 'learner: reads no employer tokens').toBe(0);
    n++;

    await seesNoOtherCollege('learner', s);
    n++;
    await cannotSelfEscalateProfile('learner', s);
    n++;

    // Sign off / grade own submission: must be refused (or silently stripped).
    const { data: subs } = await s.db
      .from('portfolio_submissions')
      .select('id, status, grade, signed_off_by, signed_off_at')
      .eq('user_id', s.userId)
      .limit(1);
    const sub = (
      (subs ?? []) as {
        id: string;
        status: string;
        grade: string | null;
        signed_off_by: string | null;
        signed_off_at: string | null;
      }[]
    )[0];
    if (sub) {
      await s.db
        .from('portfolio_submissions')
        .update({
          status: 'signed_off',
          grade: 'Distinction',
          signed_off_by: s.userId,
          signed_off_at: new Date().toISOString(),
        })
        .eq('id', sub.id);
      const { data: after } = await s.db
        .from('portfolio_submissions')
        .select('id, status, grade, signed_off_by, signed_off_at')
        .eq('id', sub.id)
        .single();
      const changed = JSON.stringify(after) !== JSON.stringify(sub);
      if (changed && adminAvailable()) {
        const v = (x: string | null) => (x === null ? 'null' : lit(x));
        admin(
          `update public.portfolio_submissions set status = ${lit(sub.status)}, grade = ${v(sub.grade)}, signed_off_by = ${v(sub.signed_off_by)}, signed_off_at = ${v(sub.signed_off_at)} where id = ${lit(sub.id)}`
        );
      }
      expect(changed, 'learner: HOLE — signed off / graded own submission').toBe(false);
      n++;
    }

    // Cannot write a pastoral note, or hours onto someone else.
    const { data: pn } = await s.db
      .from('pastoral_notes')
      .insert({
        student_id: sid,
        college_id: NORTHGATE,
        kind: 'praise',
        body: `${RUN} learner self-note`,
      })
      .select('id');
    const pnRows = (pn ?? []) as { id: string }[];
    if (pnRows.length && adminAvailable())
      admin(
        `delete from public.pastoral_notes where id in (${pnRows.map((r) => lit(r.id)).join(',')})`
      );
    expect(pnRows.length, 'learner: HOLE — wrote a pastoral note').toBe(0);
    n++;

    if (adminAvailable()) {
      const other = admin<{ user_id: string }>(
        `select user_id from public.college_students where college_id = ${lit(NORTHGATE)} and user_id is not null and user_id <> ${lit(s.userId)} limit 1`
      )[0];
      if (other) {
        const { data: otj } = await s.db
          .from('college_otj_entries')
          .insert({
            student_id: other.user_id,
            duration_minutes: 60,
            activity_type: 'other',
            title: `${RUN} hours on a neighbour`,
            source: 'learner',
            source_kind: 'learner_submitted',
            verification_status: 'verified',
          })
          .select('id');
        const otjRows = (otj ?? []) as { id: string }[];
        if (otjRows.length)
          admin(
            `delete from public.college_otj_entries where id in (${otjRows.map((r) => lit(r.id)).join(',')})`
          );
        expect(otjRows.length, 'learner: HOLE — logged verified hours on another learner').toBe(0);
        n++;
      }
    }

    // Own private export: readable (positive control for the bucket checks below).
    const { data: list } = await s.db.storage
      .from('portfolio-exports')
      .list(s.userId, { limit: 5 });
    expect(Array.isArray(list), 'learner: can list own exports folder').toBe(true);
    n++;

    record('learner', 'covered', n, EXPECTED_ACCOUNT.learner);
  });

  for (const role of ['tutor', 'assessor', 'iqa', 'admin'] as const) {
    test(`${role}: college-scoped reads, safeguarding role-gated, no cross-college writes, no self-promotion`, async () => {
      if (!readCreds(role)) {
        record(role, 'MISSING', 0, missingMessage(role));
        test.skip(true, missingMessage(role));
      }
      const s = await signIn(role);
      let n = 0;

      const { data: me } = await s.db
        .from('college_staff')
        .select('college_id, role, is_dsl, is_deputy_dsl')
        .eq('user_id', s.userId)
        .maybeSingle();
      const staff = me as {
        college_id: string;
        role: string;
        is_dsl: boolean;
        is_deputy_dsl: boolean;
      } | null;
      expect(staff?.college_id, `${role}: is staff at Northgate`).toBe(NORTHGATE);
      n++;

      const res = await seesNoOtherCollege(role, s);
      const students = res.find((r) => r.t === 'college_students');
      expect(
        students?.rows ?? 0,
        `${role}: sees Northgate's learners (positive control)`
      ).toBeGreaterThan(0);
      n += 2;

      // Safeguarding: the DSL / deputy reads all; anyone else only their own learners'.
      const visible = await safeguardingVisible(s);
      const isLead = !!(staff?.is_dsl || staff?.is_deputy_dsl);
      const expected = expectedSafeguarding(s.userId, isLead);
      if (expected) {
        expect(
          visible,
          `${role}${isLead ? ' (named DSL)' : ' (not DSL)'}: safeguarding notes readable must match the rule exactly`
        ).toEqual(expected);
        n++;
      }
      if (isLead) {
        expect(
          visible.length,
          `${role} (named DSL): reads the college's safeguarding notes (positive control)`
        ).toBeGreaterThan(0);
        n++;
      }

      await cannotWriteOtherCollege(role, s);
      n += 2;
      await cannotSelfPromoteStaff(role, s);
      n++;
      await cannotSelfEscalateProfile(role, s);
      n++;

      record(role, 'covered', n, `${EXPECTED_ACCOUNT[role]}${isLead ? ' (named DSL)' : ''}`);
    });
  }

  test('employer: no learner data at the college beyond its own links', async () => {
    if (!readCreds('employer')) {
      record('employer', 'MISSING', 0, missingMessage('employer'));
      test.skip(true, missingMessage('employer'));
    }
    const s = await signIn('employer');
    let n = 0;
    const res = await sweep(s.db);
    const leaks = res.filter(
      (r) => !REFERENCE.has(r.t) && r.rows > 0 && r.t !== 'college_employer_tokens'
    );
    expect(
      leaks.map((r) => `${r.t}(${r.rows})`),
      'employer: reads college tables'
    ).toEqual([]);
    n++;
    expect(await safeguardingVisible(s), 'employer: reads no safeguarding notes').toEqual([]);
    n++;
    await cannotSelfEscalateProfile('employer' as Role, s);
    n++;
    record('employer', 'covered', n, EXPECTED_ACCOUNT.employer);
  });

  test('anonymous: nothing except token RPCs, private buckets denied, no writes', async () => {
    const db = anonDb();
    let n = 0;

    const res = await sweep(db);
    const leaks = res
      .filter((r) => !REFERENCE.has(r.t) && r.rows > 0)
      .map((r) => `${r.t}(${r.rows})`);
    expect(leaks, 'anonymous: reads college tables').toEqual([]);
    n += res.length;

    for (const t of [
      'profiles',
      'portfolio_submissions',
      'portfolio_items',
      'portfolio_shares',
      'college_otj_entries',
      'student_messages',
    ]) {
      const { data } = await db.from(t).select('*').limit(1);
      expect((data ?? []).length, `anonymous: reads ${t}`).toBe(0);
      n++;
    }

    // Made-up tokens open nothing on every token RPC.
    const fake = 'a'.repeat(40);
    const rpcs: [string, Record<string, unknown>][] = [
      ['get_shared_portfolio', { share_token: fake }],
      ['get_shared_portfolio_entries', { p_share_token: fake }],
      ['get_tripartite_review_public', { p_token: fake }],
      ['get_otj_hours_statement_public', { p_token: fake }],
      ['get_witness_request', { p_token: fake }],
      ['get_assessor_invite', { p_token: fake }],
    ];
    for (const [fn, args] of rpcs) {
      const { data, error } = await db.rpc(fn, args);
      expect(error?.code, `anonymous: ${fn} must exist with these arguments`).not.toBe('PGRST202');
      const empty =
        !!error ||
        data === null ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === 'object' &&
          data !== null &&
          ('error' in (data as object) || Object.keys(data as object).length === 0));
      expect(
        empty,
        `anonymous: ${fn} with a made-up token returned data: ${JSON.stringify(data)?.slice(0, 120)}`
      ).toBe(true);
      n++;
    }

    // "Who am I" RPCs give an anonymous caller nothing.
    for (const fn of ['get_my_college_context', 'get_my_college_access']) {
      const { data, error } = await db.rpc(fn);
      expect(
        !!error ||
          data === null ||
          (typeof data === 'object' && Object.values(data as object).every((v) => v === null)),
        `anonymous: ${fn} returned ${JSON.stringify(data)?.slice(0, 80)}`
      ).toBe(true);
      n++;
    }

    // Private buckets: no listing, no download.
    for (const b of [
      'college-learner-evidence',
      'college-resources',
      'portfolio-exports',
      'tutor-assessment-docs',
    ]) {
      const { data } = await db.storage.from(b).list('', { limit: 5 });
      expect((data ?? []).length, `anonymous: lists private bucket ${b}`).toBe(0);
      n++;
    }
    if (adminAvailable()) {
      const obj = admin<{ name: string }>(
        `select name from storage.objects where bucket_id = 'portfolio-exports' order by created_at desc limit 1`
      )[0];
      if (obj) {
        const { data, error } = await db.storage.from('portfolio-exports').download(obj.name);
        expect(!!error || !data, 'anonymous: downloaded a private portfolio export').toBe(true);
        const r = await fetch(
          `${SUPABASE_URL}/storage/v1/object/public/portfolio-exports/${encodeURI(obj.name)}`
        );
        expect(r.ok, 'anonymous: private export reachable on the public URL').toBe(false);
        n += 2;
      }
    }

    // No writes.
    const { data: ins } = await db
      .from('college_students')
      .insert({ college_id: NORTHGATE, name: `${RUN} anon`, email: 'rls-55-anon@example.invalid' })
      .select('id');
    const insRows = (ins ?? []) as { id: string }[];
    if (insRows.length && adminAvailable())
      admin(
        `delete from public.college_students where id in (${insRows.map((r) => lit(r.id)).join(',')})`
      );
    expect(insRows.length, 'anonymous: HOLE — enrolled a learner').toBe(0);
    // Same-value update: proves the permission without changing anything if it were allowed.
    const { data: col } = await db
      .from('colleges')
      .select('name')
      .eq('id', NORTHGATE)
      .maybeSingle();
    const { data: upd } = await db
      .from('colleges')
      .update({ name: (col as { name?: string } | null)?.name ?? 'Northgate' })
      .eq('id', NORTHGATE)
      .select('id');
    expect((upd ?? []).length, 'anonymous: HOLE — renamed a college').toBe(0);
    n += 2;

    record('anonymous', 'covered', n, 'anon key only');
  });
});
