/**
 * Journey 72 — Apprenticeship Units, ILR programme type 34 (ELE-2053).
 * STRUCTURE ONLY: no unit content is created; the test uses an existing
 * criteria set and a made-up aim reference, and removes everything it makes.
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/72-apprenticeship-units.spec.ts
 *
 *  1. Server rules, rolled back: the fixture learner moved onto a unit
 *     course is a unit learner; the review board and the tutor inbox leave
 *     them out (another learner stays in); the ILR export gives ProgType 34
 *     and the unit's LearnAimRef; learner_reviews says reviews do not apply;
 *     the overview counts their criteria with the one read model; completion
 *     refuses a future date and a non-unit learner, then records Completed,
 *     the end date and CompStatus 2. A learner cannot see the overview or set
 *     up a programme; a bad aim reference is refused.
 *  2. Journey, desktop 1440 and phone 390: the tutor sets up a unit
 *     programme in the sheet (an hours figure outside 30 to 140 is
 *     questioned), sees what it still needs, a learner on it, and on that
 *     learner's profile the reviews and gateway areas say why they are off.
 */
import fs from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import {
  admin as adminOnce,
  adminAvailable,
  haveCreds,
  lit,
  NORTHGATE,
  RUN,
  signedInPage,
} from './support';
import { rolledBack } from './trustSupport';

test.setTimeout(240_000);
test.describe.configure({ mode: 'serial' });

function admin<T = Record<string, unknown>>(q: string): T[] {
  for (let i = 0; ; i++) {
    try {
      return adminOnce<T>(q);
    } catch (e) {
      if (i < 3 && /concurrently updated|login role/i.test(String((e as Error).message))) continue;
      throw e;
    }
  }
}

const OUT = process.env.W3_SHOTS;
async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(500);
  if (OUT) {
    fs.mkdirSync(OUT, { recursive: true });
    await page.screenshot({ path: `${OUT}/${name}-${phone ? 'phone' : 'desk'}.png` });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

test('1. Server rules (rolled back)', () => {
  test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI');
  const r = rolledBack(`
do $$
declare
  ng uuid := '${NORTHGATE}';
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  lu uuid := (select id from auth.users where email='founder+collegedemo-learner@elec-mate.com');
  sid uuid; other uuid; course uuid; coh uuid; q uuid; j json; jb jsonb; p json; r text := ''; n int;
begin
  select id into sid from college_students where user_id = lu and college_id = ng;
  select id into other from college_students
   where college_id = ng and id <> sid and user_id is not null
     and lower(coalesce(status, '')) not in ('withdrawn', 'completed', 'archived') limit 1;
  select cc.qualification_id into q from college_students cs left join college_cohorts co on co.id = cs.cohort_id
    join college_courses cc on cc.id = coalesce(cs.course_id, co.course_id) where cs.id = sid;
  r := r || 'before=' || _college_student_is_unit(sid) || ' ';

  perform set_config('request.jwt.claims', json_build_object('sub', lu, 'role', 'authenticated')::text, true);
  set local role authenticated;
  begin perform college_unit_overview(ng); r := r || 'learner_overview=allowed ';
  exception when others then r := r || 'learner_overview=refused '; end;
  begin perform college_unit_programme_save(ng, null, 'X unit', null, null, 60, null, null); r := r || 'learner_save=allowed ';
  exception when others then r := r || 'learner_save=refused '; end;
  reset role;

  perform set_config('request.jwt.claims', json_build_object('sub', tutor, 'role', 'authenticated')::text, true);
  set local role authenticated;
  begin perform college_unit_programme_save(ng, null, 'Bad aim', null, q, 60, 'TOO-LONG-REF', null); r := r || 'bad_aim=allowed ';
  exception when others then r := r || 'bad_aim=refused '; end;
  course := college_unit_programme_save(ng, null, 'E2E unit programme', 'E2EU', q, 60, 'e2etest1', 8);
  reset role;
  insert into college_cohorts (college_id, name, course_id, code) values (ng, 'E2E unit cohort', course, 'E2EU-1') returning id into coh;
  update college_students set cohort_id = coh, course_id = course where id = sid;
  r := r || 'after=' || _college_student_is_unit(sid) || ' other_unit=' || _college_student_is_unit(other) || ' ';

  perform set_config('request.jwt.claims', json_build_object('sub', tutor, 'role', 'authenticated')::text, true);
  set local role authenticated;
  jb := get_review_board(ng);
  r := r || 'board_unit=' || exists (select 1 from jsonb_array_elements(jb->'rows') x where x->>'student_id' = sid::text)
         || ' board_other=' || exists (select 1 from jsonb_array_elements(jb->'rows') x where x->>'student_id' = other::text) || ' ';
  jb := get_college_inbox(ng);
  r := r || 'inbox_review_unit=' || exists (select 1 from jsonb_array_elements(jb->'items') x
                                             where x->>'kind' = 'review' and x->>'student_id' = sid::text) || ' ';
  j := college_unit_overview(ng);
  select x into p from json_array_elements(j->'programmes') x where x->>'course_id' = course::text;
  r := r || 'aim=' || (p->>'aim_ref') || ' hours=' || (p->>'planned_hours') || ' learners=' || json_array_length(p->'learners')
         || ' missing=' || json_array_length(p->'missing')
         || ' crit_total_ok=' || (((p->'learners'->0->>'criteria_total')::int) = (select count(*) from get_portfolio_ac_state(lu))) || ' ';
  begin perform college_unit_complete(other, current_date); r := r || 'complete_other=allowed ';
  exception when others then r := r || 'complete_other=refused '; end;
  begin perform college_unit_complete(sid, current_date + 3); r := r || 'complete_future=allowed ';
  exception when others then r := r || 'complete_future=refused '; end;
  perform college_unit_complete(sid, current_date);
  reset role;

  jb := _college_interchange(ng, 'ilr', null, 50000, 0)::jsonb;
  select x::json into p from jsonb_array_elements(jb) x where x->>'elecmate_learner_id' = sid::text;
  r := r || 'ProgType=' || coalesce(p->>'ProgType', 'null') || ' LearnAimRef=' || coalesce(p->>'LearnAimRef', 'null')
         || ' CompStatus=' || coalesce(p->>'CompStatus', 'null') || ' ';
  select x::json into p from jsonb_array_elements(_college_interchange(ng, 'ilr', null, 50000, 0)::jsonb) x where x->>'elecmate_learner_id' = other::text;
  r := r || 'other_ProgType_not34=' || (coalesce(p->>'ProgType', '') <> '34') || ' ';
  select x::json into p from jsonb_array_elements(_college_interchange(ng, 'learner_reviews', null, 50000, 0)::jsonb) x where x->>'learner_id' = sid::text;
  r := r || 'reviews_apply=' || (p->>'reviews_apply') || ' due=' || coalesce(p->>'review_due_by', 'null') || ' ';
  select count(*) into n from college_students where id = sid and status = 'Completed' and learning_actual_end_date = public._lon(now());
  r := r || 'completed=' || n;
  raise exception 'RESULT %', r;
end $$;`);
  expect(r).toContain('before=false');
  expect(r).toContain('learner_overview=refused');
  expect(r).toContain('learner_save=refused');
  expect(r).toContain('bad_aim=refused');
  expect(r).toContain('after=true other_unit=false');
  expect(r).toContain('board_unit=false board_other=true');
  expect(r).toContain('inbox_review_unit=false');
  expect(r).toContain('aim=E2ETEST1 hours=60 learners=1 missing=0 crit_total_ok=true');
  expect(r).toContain('complete_other=refused');
  expect(r).toContain('complete_future=refused');
  expect(r).toContain('ProgType=34 LearnAimRef=E2ETEST1 CompStatus=2');
  expect(r).toContain('other_ProgType_not34=true');
  expect(r).toContain('reviews_apply=false due=null');
  expect(r).toContain('completed=1');
});

test('2. Journey: set up a unit programme, a learner on it, the profile (desktop and phone)', async ({
  browser,
}) => {
  test.skip(
    !haveCreds() || !adminAvailable(),
    'Needs fixture credentials and a Supabase CLI login'
  );
  const name = `${RUN} EV unit programme`;
  let courseId: string | null = null;
  let studentId: string | null = null;
  try {
    {
      const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
      await page.goto('/college/units');
      await expect(
        page.getByRole('heading', { name: 'Short units, without the full machinery' })
      ).toBeVisible({ timeout: 45_000 });
      await expect(page.getByText(/\d+ unit programmes?, \d+ learners? on (it|them)/)).toBeVisible({
        timeout: 30_000,
      });
      await page.getByTestId('unit-new').click();
      await page.getByTestId('unit-name').fill(name);
      await page.getByTestId('unit-hours').fill('400');
      await expect(
        page.getByText('The first units announced run 30 to 140 hours.', { exact: false })
      ).toBeVisible();
      await page.getByTestId('unit-hours').fill('60');
      await page.getByTestId('unit-aim').fill('bad-ref!');
      await expect(page.getByTestId('unit-save')).toBeDisabled();
      await page.getByTestId('unit-aim').fill('');
      await shot(page, 'unit-sheet', false);
      await page.getByTestId('unit-save').click();
      await expect(page.getByText('Unit programme saved').first()).toBeVisible({ timeout: 20_000 });
      courseId =
        admin<{ id: string }>(
          `select id from public.college_courses where college_id = ${lit(NORTHGATE)} and name = ${lit(name)}`
        )[0]?.id ?? null;
      expect(courseId).toBeTruthy();
      const c = admin<{ t: string; h: number; aim: string | null }>(
        `select course_type as t, unit_planned_hours as h, unit_aim_ref as aim from public.college_courses where id = ${lit(courseId!)}`
      )[0];
      expect(c.t).toBe('apprenticeship_unit');
      expect(Number(c.h)).toBe(60);
      expect(c.aim).toBeNull();
      const prog = page.getByTestId('unit-programme').filter({ hasText: name });
      await expect(prog.getByTestId('unit-missing')).toContainText('No criteria set chosen');
      await expect(prog.getByTestId('unit-missing')).toContainText('No learning aim reference yet');
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();
    }
    // A learner on the unit (no login, removed at the end).
    studentId = admin<{ id: string }>(
      `insert into public.college_students (college_id, name, email, status, course_id, start_date, expected_end_date)
       values (${lit(NORTHGATE)}, ${lit(`${RUN} Unit Learner`)}, ${lit(`e2e-unit-${Date.now()}@example.com`)}, 'Active', ${lit(courseId!)}, current_date, current_date + 56)
       returning id`
    )[0].id;
    for (const vp of ['desktop', 'phone'] as const) {
      const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
      await page.goto('/college/units');
      const prog = page.getByTestId('unit-programme').filter({ hasText: name });
      await expect(prog.getByTestId('unit-learner')).toContainText(`${RUN} Unit Learner`, {
        timeout: 45_000,
      });
      await expect(prog.getByTestId('unit-learner')).toContainText('no criteria loaded yet');
      await expect(prog.getByTestId('unit-learner')).toContainText('In progress');
      await prog.scrollIntoViewIfNeeded();
      await shot(page, 'units', vp === 'phone');
      await page.goto(`/college?section=student360&studentId=${studentId}#reviews`);
      await expect(page.getByTestId('unit-note-reviews')).toBeVisible({ timeout: 45_000 });
      await shot(page, 'unit-profile-reviews', vp === 'phone');
      await page.goto(`/college?section=student360&studentId=${studentId}#quizzes`);
      await expect(page.getByTestId('unit-note-gateway')).toBeVisible({ timeout: 45_000 });
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();
    }
  } finally {
    if (studentId) admin(`delete from public.college_students where id = ${lit(studentId)}`);
    if (courseId)
      admin(
        `delete from public.college_activity where entity_id = ${lit(courseId)}; delete from public.college_courses where id = ${lit(courseId)}`
      );
  }
  const left = admin<{ n: number }>(
    `select (select count(*) from public.college_courses where college_id = ${lit(NORTHGATE)} and name = ${lit(name)}) + (select count(*) from public.college_students where college_id = ${lit(NORTHGATE)} and name = ${lit(`${RUN} Unit Learner`)}) as n`
  )[0];
  expect(Number(left.n)).toBe(0);
});
