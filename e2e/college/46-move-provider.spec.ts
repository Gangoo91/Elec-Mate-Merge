/**
 * Journey 46 — move to a new college in one tap, record and all (ELE-1882).
 *
 * Learner: "Ethan Brooks (fixture)" at Northgate (signed in with the gitignored
 * e2e/.auth/college-demo-mover.json). Set up as the project owner:
 *   · a second fixture college, "Riverside Skills Academy (fixture)", with a
 *     course on the same qualification and a learner join code
 *   · a Northgate assessor link (Owen Price (fixture), Northgate staff) and an
 *     independent assessor invite (an example.invalid address)
 *   · one decision on Ethan's record by Owen Price at Northgate
 *
 * Desktop 1440: My college → "Move to a new college" → code → the preview
 * lists what comes with him (counted independently here) and what changes
 * (Owen loses access, the independent assessor keeps it) → one tap. Then:
 *   · the Northgate roll row is kept, Transferred, detached from his account
 *   · he is on Riverside's roll; the decision, hours and evidence are still his
 *   · Owen's link is revoked, the independent invite is untouched
 *   · the Northgate fixture tutor can no longer read his criteria
 *   · on his own criteria page the decision reads "Assessed at Northgate
 *     Technical College by Owen Price (fixture)"
 * Phone 390: the same code now says he is already with Riverside (no double
 * move), and the provenance line renders at phone width.
 *
 * Everything is put back exactly afterwards (roll row, assignment, review,
 * links, notifications, audit rows) and the second college is deleted.
 */
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, lit, signedInPage, type Who } from './support';
import fs from 'node:fs';
import path from 'node:path';

const MOVER = 'mover' as Who;
const haveMover = fs.existsSync(path.resolve(process.cwd(), 'e2e/.auth/college-demo-mover.json'));

test.skip(!haveCreds() || !haveMover, 'Fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot set up or restore');
test.describe.configure({ mode: 'serial' });

const ETHAN = 'fc000000-1852-4000-8001-000000000015';
const ETHAN_ROW = 'fc000000-1852-4000-8005-000000000015';
const OWEN = 'fc000000-1852-4000-8003-000000000002';
const NORTHGATE = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
const RIVERSIDE = 'fc000000-1882-4000-8000-0000000000a1';
const RIVERSIDE_COURSE = 'fc000000-1882-4000-8000-0000000000a2';
const CODE = `RV${Date.now().toString(36).toUpperCase().slice(-6)}`;
const SHOTS = process.env.W2_SHOTS;

let started = '';
let decisionId = '';
let decisionAc = '';
let linkIds: string[] = [];
let snapRow: Record<string, unknown> = {};
let snapAssign: Record<string, unknown>[] = [];

test.beforeAll(async () => {
  started = admin<{ t: string }>(`select now()::text as t`)[0]!.t;
  snapRow = admin<Record<string, unknown>>(
    `select user_id, status, learning_actual_end_date, cohort_id from public.college_students where id = ${lit(ETHAN_ROW)}`
  )[0]!;
  expect(snapRow.user_id, 'Ethan starts on the Northgate roll').toBe(ETHAN);
  expect(snapRow.status).toBe('Active');

  // Snapshot of his assignment row, restored exactly afterwards.
  snapAssign = admin<{ row: Record<string, unknown> }>(
    `select to_jsonb(a) as row from public.college_student_assignments a where a.student_id = ${lit(ETHAN)}`
  ).map((r) => r.row);
  expect(snapAssign.length, 'one assignment row').toBe(1);

  admin(`
    insert into public.colleges (id, name, is_demo) values (${lit(RIVERSIDE)}, 'Riverside Skills Academy (fixture)', true);
    insert into public.college_courses (id, college_id, name, qualification_id)
      select ${lit(RIVERSIDE_COURSE)}, ${lit(RIVERSIDE)}, 'Level 3 Electrical (fixture)', cc.qualification_id
        from public.college_students s join public.college_courses cc on cc.id = s.course_id where s.id = ${lit(ETHAN_ROW)};
    insert into public.college_invites (college_id, invite_code, invite_type, is_active, course_id, use_count)
      values (${lit(RIVERSIDE)}, ${lit(CODE)}, 'student', true, ${lit(RIVERSIDE_COURSE)}, 0);
  `);
  linkIds = admin<{ id: string }>(`
    insert into public.portfolio_assessor_links (learner_id, assessor_email, assessor_name, role, assessor_user_id, status, accepted_at)
    values (${lit(ETHAN)}, 'founder+collegedemo-assessor@elec-mate.com', 'Owen Price (fixture)', 'assessor', ${lit(OWEN)}, 'active', now()),
           (${lit(ETHAN)}, 'independent.assessor.fixture@example.invalid', 'Indy Assessor (fixture)', 'assessor', null, 'invited', null)
    returning id`).map((r) => r.id);
  const dec = admin<{ id: string; unit_code: string; ac_code: string }>(`
    insert into public.portfolio_assessment_decisions (learner_id, qualification_code, unit_code, ac_code, decision, feedback, assessor_id, method)
    select ${lit(ETHAN)}, r.requirement_code, qr.unit_code, qr.ac_code, 'passed', 'E2E·w2 fixture decision at Northgate.', ${lit(OWEN)}, 'observation'
      from public._resolve_qualification(${lit(ETHAN)}, null) r
      join lateral (select unit_code, ac_code from public.qualification_requirements q
                     where q.qualification_code = r.requirement_code order by unit_code, lo_number, ac_code limit 1) qr on true
    returning id, unit_code, ac_code`)[0]!;
  decisionId = dec.id;
  decisionAc = `${dec.unit_code}:${dec.ac_code}`;
});

test.afterAll(async () => {
  if (!started) return;
  const S = lit(started);
  admin(`
    -- the assignment row, exactly as it was
    update public.college_student_assignments a
       set college_id = (x.row->>'college_id')::uuid, college_name = x.row->>'college_name',
           cohort_id = x.row->>'cohort_id', cohort_name = x.row->>'cohort_name',
           tutor_id = (x.row->>'tutor_id')::uuid, assessor_id = (x.row->>'assessor_id')::uuid,
           iqa_id = (x.row->>'iqa_id')::uuid, qualification_id = (x.row->>'qualification_id')::uuid,
           status = x.row->>'status', start_date = (x.row->>'start_date')::date,
           expected_end_date = (x.row->>'expected_end_date')::date, actual_end_date = (x.row->>'actual_end_date')::date,
           last_review_date = (x.row->>'last_review_date')::date, next_review_date = (x.row->>'next_review_date')::date,
           notes = x.row->>'notes', employer_name = x.row->>'employer_name'
      from (select ${lit(JSON.stringify(snapAssign[0] ?? {}))}::jsonb as row) x
     where a.id = (x.row->>'id')::uuid;
    delete from public.college_student_assignments where student_id = ${lit(ETHAN)} and college_id = ${lit(RIVERSIDE)};
    -- off Riverside's roll, back on Northgate's
    delete from public.college_students where college_id = ${lit(RIVERSIDE)};
    update public.college_students set user_id = ${lit(ETHAN)}, status = 'Active',
           learning_actual_end_date = ${snapRow.learning_actual_end_date ? lit(String(snapRow.learning_actual_end_date)) : 'null'}
     where id = ${lit(ETHAN_ROW)};
    -- the review the move stood down
    select set_config('app.tripartite_rpc', 'on', true);
    update public.college_tripartite_reviews t set status = p.prev_value
      from public.college_learner_link_pauses p
     where p.student_id = ${lit(ETHAN_ROW)} and p.link_kind = 'tripartite_review' and p.paused_at >= ${S}::timestamptz
       and t.id = p.link_id and t.status = 'cancelled';
    delete from public.college_learner_link_pauses where student_id = ${lit(ETHAN_ROW)} and paused_at >= ${S}::timestamptz;
    delete from public.college_learner_episodes where student_id = ${lit(ETHAN_ROW)} and created_at >= ${S}::timestamptz;
    delete from public.college_student_lifecycle_events where student_id = ${lit(ETHAN_ROW)} and created_at >= ${S}::timestamptz;
    delete from public.college_learner_moves where user_id = ${lit(ETHAN)} and moved_at >= ${S}::timestamptz;
    delete from public.user_notifications where user_id = ${lit(ETHAN)} and created_at >= ${S}::timestamptz;
    delete from public.portfolio_assessor_links where id in (${linkIds.map(lit).join(',') || 'null'});
    delete from public.colleges where id = ${lit(RIVERSIDE)};
    set session_replication_role = replica;
    delete from public.portfolio_assessment_decisions where id = ${lit(decisionId || '00000000-0000-0000-0000-000000000000')};
    delete from public.portfolio_audit_events where learner_id = ${lit(ETHAN)} and created_at >= ${S}::timestamptz;
    set session_replication_role = origin;
  `);
  const after = admin<Record<string, unknown>>(
    `select (select count(*) from public.college_students where user_id = ${lit(ETHAN)})::int as rows,
            (select user_id from public.college_students where id = ${lit(ETHAN_ROW)}) as user_id,
            (select status from public.college_students where id = ${lit(ETHAN_ROW)}) as status,
            (select count(*) from public.colleges where id = ${lit(RIVERSIDE)})::int as riverside,
            (select count(*) from public.portfolio_audit_events where learner_id = ${lit(ETHAN)} and created_at >= ${S}::timestamptz)::int as audit,
            (select college_id from public.college_student_assignments where student_id = ${lit(ETHAN)} limit 1) as assign_college`
  )[0]!;
  expect(after).toMatchObject({
    rows: 1,
    user_id: ETHAN,
    status: 'Active',
    riverside: 0,
    audit: 0,
    assign_college: NORTHGATE,
  });
});

test('move to a new college, record and all (desktop)', async ({ browser }) => {
  const t = await actor('tutor');
  const before = await t.db.rpc('get_portfolio_ac_state', { p_user_id: ETHAN });
  expect(before.error, 'the Northgate tutor reads his criteria before the move').toBeNull();

  const counts = admin<{ d: number; o: number; e: number }>(
    `select (select count(*) from public.portfolio_assessment_decisions where learner_id = ${lit(ETHAN)})::int as d,
            (select count(*) from public.college_otj_entries where student_id = ${lit(ETHAN)})::int as o,
            (select count(*) from public.portfolio_items where user_id = ${lit(ETHAN)})::int as e`
  )[0]!;

  const me = await signedInPage(browser, MOVER, 'desktop');
  await me.page.goto('/apprentice/college-plan');
  await me.page.getByRole('button', { name: 'Move to a new college' }).click({ timeout: 45_000 });
  const sheet = me.page.getByRole('dialog');
  await sheet.getByLabel("New college's join code").fill(CODE.toLowerCase());
  await sheet.getByRole('button', { name: 'Check the code' }).click();
  await expect(
    sheet.getByRole('heading', { name: 'Move to Riverside Skills Academy (fixture)' })
  ).toBeVisible();
  await expect(sheet).toContainText(`${counts.d} assessor decision`);
  await expect(sheet).toContainText(`${counts.o} hours entr`);
  await expect(sheet).toContainText(`${counts.e} piece`);
  await expect(sheet).toContainText('loses access: Owen Price (fixture)');
  await expect(sheet).toContainText('Still working: 1 independent assessor');
  if (SHOTS) await me.page.screenshot({ path: `${SHOTS}/46-preview-desktop.png` });
  await sheet.getByRole('button', { name: 'Move my record', exact: true }).click();
  await expect(
    sheet.getByRole('heading', { name: 'You are with Riverside Skills Academy (fixture)' })
  ).toBeVisible({
    timeout: 30_000,
  });
  if (SHOTS) await me.page.screenshot({ path: `${SHOTS}/46-done-desktop.png` });

  // The database, as the owner sees it.
  const state = admin<Record<string, unknown>>(
    `select (select status from public.college_students where id = ${lit(ETHAN_ROW)}) as old_status,
            (select user_id from public.college_students where id = ${lit(ETHAN_ROW)}) as old_user,
            (select count(*) from public.college_students where user_id = ${lit(ETHAN)} and college_id = ${lit(RIVERSIDE)} and status = 'Active')::int as new_rows,
            (select status from public.portfolio_assessor_links where id = ${lit(linkIds[0]!)}) as owen_link,
            (select status from public.portfolio_assessor_links where id = ${lit(linkIds[1]!)}) as indy_link,
            (select count(*) from public.portfolio_assessment_decisions where id = ${lit(decisionId)})::int as decision_kept,
            (select count(*) from public.college_otj_entries where student_id = ${lit(ETHAN)})::int as hours_kept,
            (select count(*) from public.college_learner_moves where user_id = ${lit(ETHAN)} and to_college_id = ${lit(RIVERSIDE)})::int as moves,
            (select count(*) from public.portfolio_audit_events where learner_id = ${lit(ETHAN)} and action = 'college_moved')::int as audit`
  )[0]!;
  expect(state).toMatchObject({
    old_status: 'Transferred',
    old_user: null,
    new_rows: 1,
    owen_link: 'revoked',
    indy_link: 'invited',
    decision_kept: 1,
    hours_kept: counts.o,
    moves: 1,
    audit: 1,
  });

  // The old college has lost access.
  const afterMove = await t.db.rpc('get_portfolio_ac_state', { p_user_id: ETHAN });
  expect(afterMove.error?.message ?? '', 'Northgate can no longer read his criteria').toMatch(
    /not allowed/
  );

  // His own record: the earlier decision says where it was made.
  await me.page.goto(`/apprentice/college/progress?ac=${encodeURIComponent(decisionAc)}`);
  await expect(
    me.page.getByText(/Assessed at Northgate Technical College by Owen Price \(fixture\)/).first()
  ).toBeVisible({
    timeout: 45_000,
  });
  expect(me.errors).toEqual([]);
  await me.context.close();
});

test('the same code again, and the record at phone width (phone)', async ({ browser }) => {
  const me = await signedInPage(browser, MOVER, 'phone');
  await me.page.goto('/apprentice/college-plan');
  await me.page.getByRole('button', { name: 'Move to a new college' }).click({ timeout: 45_000 });
  const sheet = me.page.getByRole('dialog');
  await sheet.getByLabel("New college's join code").fill(CODE);
  await sheet.getByRole('button', { name: 'Check the code' }).click();
  await expect(sheet.getByRole('alert')).toContainText(
    'You are already with Riverside Skills Academy (fixture).'
  );
  if (SHOTS) await me.page.screenshot({ path: `${SHOTS}/46-again-phone.png` });
  await me.page.keyboard.press('Escape');

  // The join page offers the move when a code belongs to another college
  // (Northgate's code, now that he is at Riverside). Nothing is changed here.
  await me.page.goto('/college/join/NTCY2DEMO');
  await expect(me.page.getByRole('heading', { name: 'You are with another college' })).toBeVisible({ timeout: 45_000 });
  await expect(me.page.getByRole('button', { name: 'Move my record here' })).toBeVisible();
  await expect(me.page.getByText(/linked to Riverside Skills Academy \(fixture\)/)).toBeVisible();

  await me.page.goto(`/apprentice/college/progress?ac=${encodeURIComponent(decisionAc)}`);
  await expect(
    me.page.getByText(/Assessed at Northgate Technical College by Owen Price \(fixture\)/).first()
  ).toBeVisible({
    timeout: 45_000,
  });
  const overflow = await me.page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
  if (SHOTS) await me.page.screenshot({ path: `${SHOTS}/46-record-phone.png` });
  expect(me.errors).toEqual([]);
  await me.context.close();
});
