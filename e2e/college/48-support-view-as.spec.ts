/**
 * ELE-1966: Elec-Mate support views a college screen AS a named staff member:
 * read-only, logged, only with the college's consent.
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/48-support-view-as.spec.ts
 *
 * 1. Server rules, rolled back on the live database, as a real platform admin:
 *    refused without consent, refused without a reason, an admin cannot give
 *    consent; with consent the session opens AS the tutor, reads the college,
 *    every write is refused, and the start is in the college's activity log.
 * 2. Real API: a view_as session row is opened for the fixture tutor for a
 *    few seconds; through PostgREST with the tutor's own JWT, reads still work and
 *    inserts/updates/deletes are refused. The row is removed in `finally`.
 * 3. UI: the consent switch is visible and read-only for a tutor; with the
 *    acting session and admin flag simulated in the browser (routes stubbed),
 *    the hub shows the read-only bar naming the staff member.
 */
import { test, expect } from '@playwright/test';
import { admin, adminAvailable, haveCreds, lit, signedInPage } from './support';
import { clientAs, rolledBack } from './trustSupport';

const NG = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

test.describe('ELE-1966 support view-as', () => {
  test.skip(!haveCreds(), 'College fixture credentials not available');

  test('server: consent, reason, read-only, logged', () => {
    test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI or SUPABASE_ACCESS_TOKEN');
    const r = rolledBack(`
do $$
declare
  adm uuid := (select id from profiles where admin_role is not null order by created_at limit 1);
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  r text := ''; n int; j jsonb;
begin
  perform set_config('request.jwt.claims', json_build_object('sub',adm,'role','authenticated')::text, true);
  set local role authenticated;
  begin perform admin_start_view_as('${NG}', tutor, 'Support ticket test'); r := r || 'no_consent=opened';
  exception when others then r := r || 'no_consent=refused'; end;
  begin perform set_college_support_consent('${NG}', true); r := r || ' admin_consent=allowed';
  exception when others then r := r || ' admin_consent=refused'; end;
  reset role;
  insert into college_support_consent (college_id, view_as_allowed) values ('${NG}', true)
    on conflict (college_id) do update set view_as_allowed = true;
  set local role authenticated;
  begin perform admin_start_view_as('${NG}', tutor, ''); r := r || ' no_reason=opened';
  exception when others then r := r || ' no_reason=refused'; end;
  j := admin_start_view_as('${NG}', tutor, 'Support ticket test');
  r := r || ' mode=' || (get_my_acting_college()->>'mode') || ' as_role=' || (get_my_acting_college()->>'as_role');
  select count(*) into n from college_students where college_id = '${NG}'; r := r || ' reads=' || n;
  update college_cohorts set name = name where college_id = '${NG}'; get diagnostics n = row_count; r := r || ' cohort_updates=' || n;
  begin insert into college_cohorts (college_id, name) values ('${NG}', 'view-as probe'); r := r || ' cohort_insert=allowed';
  exception when others then r := r || ' cohort_insert=refused'; end;
  begin insert into college_student_assignments (student_id, college_id, qualification_id) values (tutor, '${NG}', gen_random_uuid()); r := r || ' assignment_insert=allowed';
  exception when others then r := r || ' assignment_insert=refused'; end;
  reset role;
  select count(*) into n from college_activity where college_id = '${NG}' and action = 'elec_mate_view_as.start'
     and details->>'reason' = 'Support ticket test' and created_at > now() - interval '1 minute';
  r := r || ' logged=' || n;
  raise exception 'RESULT %', r;
end $$;`);
    console.log(`[48] ${r}`);
    expect(r).toContain('no_consent=refused');
    expect(r).toContain('admin_consent=refused');
    expect(r).toContain('no_reason=refused');
    expect(r).toContain('mode=view_as as_role=tutor');
    expect(Number(/reads=(\d+)/.exec(r)?.[1])).toBeGreaterThan(0);
    expect(r).toContain('cohort_updates=0');
    expect(r).toContain('cohort_insert=refused');
    expect(r).toContain('assignment_insert=refused');
    expect(r).toContain('logged=1');
  });

  test('server: withdrawing consent ends an open session', () => {
    test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI or SUPABASE_ACCESS_TOKEN');
    const r = rolledBack(`
do $$
declare
  adm uuid := (select id from profiles where admin_role is not null order by created_at limit 1);
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  mgr uuid;
  r text := '';
begin
  insert into college_support_consent (college_id, view_as_allowed) values ('${NG}', true)
    on conflict (college_id) do update set view_as_allowed = true;
  perform set_config('request.jwt.claims', json_build_object('sub',adm,'role','authenticated')::text, true);
  set local role authenticated;
  perform admin_start_view_as('${NG}', tutor, 'Support ticket test');
  r := r || 'open_before=' || _viewing_as_now();
  reset role;
  -- A college manager withdraws consent (made admin inside this rolled-back transaction).
  update college_staff set role = 'admin' where user_id = tutor and college_id = '${NG}';
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated')::text, true);
  set local role authenticated;
  perform set_college_support_consent('${NG}', false);
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub',adm,'role','authenticated')::text, true);
  set local role authenticated;
  r := r || ' open_after=' || _viewing_as_now();
  reset role;
  r := r || ' ended_logged=' || (select count(*) from college_activity where college_id = '${NG}'
        and action = 'elec_mate_view_as.ended_by_college' and created_at > now() - interval '1 minute');
  raise exception 'RESULT %', r;
end $$;`);
    console.log(`[48] ${r}`);
    expect(r).toContain('open_before=true');
    expect(r).toContain('open_after=false');
    expect(r).toContain('ended_logged=1');
  });

  test('real API: with a view_as session open, PostgREST refuses writes and still reads', async () => {
    test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI or SUPABASE_ACCESS_TOKEN');
    // The fixture tutor can normally update its cohorts: the control.
    const { db, userId } = await clientAs('tutor');
    const before = await db
      .from('college_cohorts')
      .select('id, name')
      .eq('college_id', NG)
      .limit(1);
    expect(before.error).toBeNull();
    const cohort = before.data?.[0];
    expect(cohort).toBeTruthy();
    const touch = () =>
      db.from('college_cohorts').update({ name: cohort!.name }).eq('id', cohort!.id).select('id');
    const control = await touch();
    expect(control.error).toBeNull();
    expect(control.data ?? []).toHaveLength(1);

    // Open a view_as session for this account for a few seconds.
    const sid = admin<{ id: string }>(`
      insert into public.college_acting_sessions (admin_id, college_id, reason, expires_at, mode, as_user_id)
      values (${lit(userId)}, ${lit(NG)}, 'E2E spec 48 (removed in finally)', now() + interval '5 minutes', 'view_as', ${lit(userId)})
      returning id`)[0].id;
    try {
      const read = await db.from('college_students').select('id').eq('college_id', NG);
      expect(read.error).toBeNull();
      expect((read.data ?? []).length).toBeGreaterThan(0);

      const upd = await touch();
      expect(upd.data ?? []).toHaveLength(0);

      const ins = await db
        .from('college_cohorts')
        .insert({ college_id: NG, name: 'E2E view-as probe' })
        .select('id');
      expect(ins.error?.message ?? '').toMatch(/row-level security/);

      const plan = await db
        .from('college_lesson_plans')
        .insert({ college_id: NG, title: 'E2E view-as probe' })
        .select('id');
      expect(plan.error).not.toBeNull();
    } finally {
      admin(`delete from public.college_acting_sessions where id = ${lit(sid)}`);
      admin(
        `delete from public.college_cohorts where college_id = ${lit(NG)} and name = 'E2E view-as probe'`
      );
      admin(
        `delete from public.college_lesson_plans where college_id = ${lit(NG)} and title = 'E2E view-as probe'`
      );
    }
    // Session closed: the same write works again.
    const after = await touch();
    expect(after.data ?? []).toHaveLength(1);
  });

  test('UI: consent switch for staff; read-only bar names the person', async ({ browser }) => {
    const { context, page } = await signedInPage(browser, 'tutor');
    try {
      await page.goto('/college?section=collegesettings');
      const sw = page.getByRole('switch', {
        name: 'Let Elec-Mate support see the hub as a staff member',
      });
      await expect(sw).toBeVisible({ timeout: 60_000 });
      await expect(sw).toBeDisabled();
      await expect(sw).toHaveAttribute('aria-checked', 'false');
    } finally {
      await context.close();
    }

    // Simulate the platform admin's browser: admin flag on the profile read,
    // and an open view_as session from get_my_acting_college. Server rules are
    // proven above; this checks what support sees.
    const sim = await signedInPage(browser, 'tutor');
    try {
      await sim.page.route('**/rest/v1/profiles?*', async (route) => {
        const res = await route.fetch();
        const text = await res.text();
        try {
          const j = JSON.parse(text);
          const patch = (o: Record<string, unknown>) => ({ ...o, admin_role: 'support' });
          const body = Array.isArray(j) ? j.map(patch) : j && typeof j === 'object' ? patch(j) : j;
          await route.fulfill({ response: res, body: JSON.stringify(body) });
        } catch {
          await route.fulfill({ response: res, body: text });
        }
      });
      await sim.page.route('**/rest/v1/rpc/get_my_acting_college', (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            college_id: NG,
            college_name: 'Northgate Technical College',
            college_code: 'NTC',
            expires_at: new Date(Date.now() + 3_600_000).toISOString(),
            started_at: new Date().toISOString(),
            mode: 'view_as',
            as_user_id: '00000000-0000-0000-0000-000000000001',
            as_name: 'Demo Tutor (fixture)',
            as_role: 'tutor',
          }),
        })
      );
      await sim.page.goto('/college');
      const bar = sim.page.getByTestId('view-as-bar');
      await expect(bar).toBeVisible({ timeout: 60_000 });
      await expect(bar).toContainText('Read only');
      await expect(bar).toContainText(
        'Viewing Northgate Technical College as Demo Tutor (fixture) (tutor)'
      );
      await expect(bar).toContainText('Nothing can be changed');
      await expect(bar.getByRole('button', { name: 'Stop viewing' })).toBeVisible();
    } finally {
      await sim.context.close();
    }
  });
});
