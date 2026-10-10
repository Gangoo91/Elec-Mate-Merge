/**
 * ELE-1915: staff two-step sign-in (TOTP), required per college and by
 * default for safeguarding leads, enforced server-side; Sentry on every
 * college route.
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/47-staff-mfa.spec.ts
 *
 * 1. Server rule, inside a rolled-back transaction on the live database:
 *    a college that requires two steps hides learner records (college_students,
 *    pastoral_notes, ILP goals, attendance) from its staff at aal1 and shows
 *    them at aal2; learners are untouched; a tutor cannot flip the switch;
 *    safeguarding leads are gated by default once platform TOTP is on.
 * 2. Live API as the fixture tutor: the requirement RPC, the refused setter,
 *    and the platform state of TOTP enrolment (reported, not assumed).
 * 3. UI as the fixture tutor: College settings shows Security and access,
 *    read-only for a tutor; the College Hub renders through the Sentry
 *    boundary and the MFA gate without blocking (not required today).
 */
import { test, expect } from '@playwright/test';
import { adminAvailable, haveCreds, signedInPage } from './support';
import { clientAs, rolledBack } from './trustSupport';

const NG = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

test.describe('ELE-1915 staff two-step sign-in', () => {
  test.skip(!haveCreds(), 'College fixture credentials not available');

  test('server: a requiring college hides learner records from aal1 staff', () => {
    test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI or SUPABASE_ACCESS_TOKEN');
    const r = rolledBack(`
do $$
declare
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  learner uuid := (select id from auth.users where email='founder+collegedemo-learner@elec-mate.com');
  r text := ''; n int;
begin
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated','aal','aal1')::text, true);
  set local role authenticated;
  select count(*) into n from college_students; r := r || 'off_aal1=' || n;
  reset role;
  update colleges set require_staff_mfa = true where id = '${NG}';
  set local role authenticated;
  select count(*) into n from college_students; r := r || ' on_aal1=' || n;
  select count(*) into n from pastoral_notes; r := r || ' on_aal1_pastoral=' || n;
  select count(*) into n from college_ilp_goals; r := r || ' on_aal1_ilp=' || n;
  select count(*) into n from college_attendance; r := r || ' on_aal1_attendance=' || n;
  r := r || ' required=' || (get_my_mfa_requirement()->>'required') || ' satisfied=' || (get_my_mfa_requirement()->>'satisfied');
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated','aal','aal2')::text, true);
  select count(*) into n from college_students; r := r || ' on_aal2=' || n;
  perform set_config('request.jwt.claims', json_build_object('sub',learner,'role','authenticated','aal','aal1')::text, true);
  select count(*) into n from college_students; r := r || ' learner_on_aal1=' || n;
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated','aal','aal2')::text, true);
  begin perform set_college_require_staff_mfa('${NG}', false); r := r || ' tutor_set=allowed';
  exception when others then r := r || ' tutor_set=refused'; end;
  reset role;
  raise exception 'RESULT %', r;
end $$;`);
    console.log(`[47] ${r}`);
    const n = (k: string) => Number(new RegExp(`${k}=(\\d+)`).exec(r)?.[1] ?? NaN);
    expect(n('off_aal1')).toBeGreaterThan(0);
    expect(n('on_aal1')).toBe(0);
    expect(n('on_aal1_pastoral')).toBe(0);
    expect(n('on_aal1_ilp')).toBe(0);
    expect(n('on_aal1_attendance')).toBe(0);
    expect(n('on_aal2')).toBe(n('off_aal1'));
    expect(n('learner_on_aal1')).toBeGreaterThan(0);
    expect(r).toContain('required=true satisfied=false');
    expect(r).toContain('tutor_set=refused');
  });

  test('server: safeguarding leads need two steps by default once platform TOTP is on', () => {
    test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI or SUPABASE_ACCESS_TOKEN');
    const r = rolledBack(`
do $$
declare
  iqa uuid := (select id from auth.users where email='founder+collegedemo-iqa@elec-mate.com');
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  r text := ''; n int;
begin
  r := 'dsl=' || coalesce((select bool_or(is_dsl or is_deputy_dsl) from college_staff where user_id=iqa)::text, 'none');
  r := r || ' default_on=' || (select require_safeguarding_mfa from colleges where id='${NG}');
  perform set_config('request.jwt.claims', json_build_object('sub',iqa,'role','authenticated','aal','aal1')::text, true);
  set local role authenticated;
  select count(*) into n from college_students; r := r || ' platform_off=' || n;
  reset role;
  update platform_security_settings set totp_enrolment_enabled = true;
  set local role authenticated;
  select count(*) into n from college_students; r := r || ' platform_on_aal1=' || n;
  perform set_config('request.jwt.claims', json_build_object('sub',iqa,'role','authenticated','aal','aal2')::text, true);
  select count(*) into n from college_students; r := r || ' platform_on_aal2=' || n;
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated','aal','aal1')::text, true);
  select count(*) into n from college_students; r := r || ' non_dsl_aal1=' || n;
  reset role;
  raise exception 'RESULT %', r;
end $$;`);
    console.log(`[47] ${r}`);
    const n = (k: string) => Number(new RegExp(`${k}=(\\d+)`).exec(r)?.[1] ?? NaN);
    expect(r).toContain('dsl=true');
    expect(r).toContain('default_on=true');
    expect(n('platform_off')).toBeGreaterThan(0);
    expect(n('platform_on_aal1')).toBe(0);
    expect(n('platform_on_aal2')).toBe(n('platform_off'));
    expect(n('non_dsl_aal1')).toBeGreaterThan(0);
  });

  test('live API: requirement, refused setter, platform TOTP state', async () => {
    const { db } = await clientAs('tutor');
    const { data: req, error } = await db.rpc('get_my_mfa_requirement');
    expect(error).toBeNull();
    expect(req).toMatchObject({ is_staff: true, required: false, satisfied: true, aal: 'aal1' });
    const set = await db.rpc('set_college_require_staff_mfa', { p_college: NG, p_required: true });
    expect(set.error?.message).toMatch(/Only your college admin/);
    const consent = await db.rpc('set_college_require_safeguarding_mfa', {
      p_college: NG,
      p_required: false,
    });
    expect(consent.error?.message).toMatch(/Only your college admin/);

    // Report the platform state: Supabase refuses TOTP enrolment until Andrew
    // enables it (Authentication -> Multi-Factor). Recorded, not failed.
    const enrol = await db.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: `probe-${Date.now()}`,
    });
    if (enrol.data?.id) {
      await db.auth.mfa.unenroll({ factorId: enrol.data.id });
      test
        .info()
        .annotations.push({
          type: 'totp',
          description: 'TOTP enrolment is ENABLED on the project',
        });
    } else {
      test.info().annotations.push({
        type: 'totp',
        description: `TOTP enrolment is DISABLED on the project (${enrol.error?.code}): Andrew's dashboard step`,
      });
      expect(enrol.error?.code).toBe('mfa_totp_enroll_not_enabled');
    }
    const { data: platform } = await db
      .from('platform_security_settings')
      .select('totp_enrolment_enabled')
      .single();
    expect(platform).toEqual({ totp_enrolment_enabled: !!enrol.data?.id });
  });

  test('UI: settings show Security and access, read-only for a tutor; hub renders through the gate', async ({
    browser,
  }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor');
    try {
      await page.goto('/college?section=collegesettings');
      const card = page.getByTestId('security-access-card');
      await expect(card).toBeVisible({ timeout: 60_000 });
      await expect(card.getByText('Require two-step sign-in for staff')).toBeVisible();
      await expect(card.getByText('Always require it for safeguarding leads')).toBeVisible();
      await expect(
        page.getByRole('switch', { name: 'Require two-step sign-in for staff' })
      ).toBeDisabled();
      await expect(
        page.getByRole('switch', { name: 'Let Elec-Mate support see the hub as a staff member' })
      ).toBeDisabled();
      await expect(page.getByText('Only your college admin can change these.')).toBeVisible();
      await expect(
        card.getByText('Available as soon as Elec-Mate switches on two-step sign-in')
      ).toBeVisible();
      // Not required today, so the gate lets the tutor straight in.
      await page.goto('/college');
      await expect(page.getByText('Enter your sign-in code')).toHaveCount(0);
      await expect(page.getByText('Set up two-step sign-in')).toHaveCount(0);

      // Sentry tagging helpers (pure functions, loaded through the dev server).
      const tags = await page.evaluate(async () => {
        const m = await import('/src/components/college/security/CollegeRouteMonitor.tsx');
        return [
          m.hubFor('/college/students/123'),
          m.hubFor('/apprentice/college-plan/hours'),
          m.hubFor('/dashboard'),
          m.routePattern('/college/students/3f2a1b4c-1111-2222-3333-444455556666/evidence'),
        ];
      });
      expect(tags).toEqual([
        'college',
        'apprentice-college',
        'other',
        '/college/students/:id/evidence',
      ]);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
});
