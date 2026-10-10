/**
 * ELE-1971: Sign in with Microsoft (Entra ID), college domain -> college.
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/49-microsoft-sso.spec.ts
 *
 * 1. Server rules, rolled back on the live database with throwaway auth users
 *    and Microsoft identities: staff link only via the staff list, learners
 *    only via the roster, a stranger on the domain gets nothing, an
 *    unverified Microsoft email links nothing, a password account is not
 *    treated as Microsoft, a tutor cannot register a domain, consumer domains
 *    are refused, a pinned tenant refuses other organisations.
 * 2. Anonymous API: sso_domain_enabled answers true/false only.
 * 3. UI: the sign-in page hides the Microsoft button while the provider is
 *    off; with the provider reported on, the button starts the Supabase
 *    authorize flow for provider=azure with the /auth/microsoft return; the
 *    return page explains a missing session; settings show the domain section
 *    read-only for a tutor.
 */
import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { adminAvailable, haveCreds, signedInPage, SUPABASE_URL } from './support';
import { ANON, rolledBack } from './trustSupport';

const NG = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

test.describe('ELE-1971 Sign in with Microsoft', () => {
  test('server: links only listed people, never grants a role on its own', () => {
    test.skip(!adminAvailable(), 'Needs a logged-in Supabase CLI or SUPABASE_ACCESS_TOKEN');
    const r = rolledBack(`
do $$
declare
  tutor uuid := (select id from auth.users where email='founder+collegedemo-tutor@elec-mate.com');
  u1 uuid := gen_random_uuid(); u2 uuid := gen_random_uuid(); u3 uuid := gen_random_uuid();
  u4 uuid := gen_random_uuid(); u5 uuid := gen_random_uuid();
  r text := ''; sid uuid;
  z constant uuid := '00000000-0000-0000-0000-000000000000';
begin
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated')::text, true);
  set local role authenticated;
  begin perform college_sso_add_domain('${NG}', 'northgate-e2e.ac.uk'); r := r || 'tutor_add=allowed';
  exception when others then r := r || 'tutor_add=refused'; end;
  reset role;
  r := r || ' consumer_outlook=' || _sso_consumer_domain('outlook.com') || ' consumer_tenant=' || _sso_consumer_domain('northgate.onmicrosoft.com');
  insert into college_sso_domains (college_id, domain) values ('${NG}', 'northgate-e2e.ac.uk');
  insert into college_sso_domains (college_id, domain, azure_tenant_id) values ('${NG}', 'pinned-e2e.ac.uk', 'tenant-a');
  insert into auth.users (id, email, aud, role, instance_id) values
    (u1, 'staff.e2e@northgate-e2e.ac.uk', 'authenticated', 'authenticated', z),
    (u2, 'learner.e2e@northgate-e2e.ac.uk', 'authenticated', 'authenticated', z),
    (u3, 'stranger.e2e@northgate-e2e.ac.uk', 'authenticated', 'authenticated', z),
    (u4, 'unverified.e2e@northgate-e2e.ac.uk', 'authenticated', 'authenticated', z),
    (u5, 'other.e2e@pinned-e2e.ac.uk', 'authenticated', 'authenticated', z);
  insert into auth.identities (id, user_id, provider, provider_id, identity_data, last_sign_in_at) values
    (gen_random_uuid(), u1, 'azure', 'e2e-p1', jsonb_build_object('email','staff.e2e@northgate-e2e.ac.uk','email_verified',true,'sub','e2e-p1'), now()),
    (gen_random_uuid(), u2, 'azure', 'e2e-p2', jsonb_build_object('email','learner.e2e@northgate-e2e.ac.uk','email_verified',true,'sub','e2e-p2'), now()),
    (gen_random_uuid(), u3, 'azure', 'e2e-p3', jsonb_build_object('email','stranger.e2e@northgate-e2e.ac.uk','email_verified',true,'sub','e2e-p3'), now()),
    (gen_random_uuid(), u4, 'azure', 'e2e-p4', jsonb_build_object('email','unverified.e2e@northgate-e2e.ac.uk','email_verified',false,'sub','e2e-p4'), now()),
    (gen_random_uuid(), u5, 'azure', 'e2e-p5', jsonb_build_object('email','other.e2e@pinned-e2e.ac.uk','email_verified',true,'sub','e2e-p5','custom_claims',jsonb_build_object('tid','tenant-b')), now());
  insert into college_staff (college_id, name, email, role, status) values ('${NG}', 'E2E SSO staff', 'Staff.E2E@northgate-e2e.ac.uk', 'tutor', 'active');
  insert into college_students (college_id, name, email, status) values ('${NG}', 'E2E SSO learner', 'learner.e2e@northgate-e2e.ac.uk', 'Active') returning id into sid;
  insert into college_staff (college_id, name, email, role, status) values ('${NG}', 'E2E pinned staff', 'other.e2e@pinned-e2e.ac.uk', 'tutor', 'active');
  set local role authenticated;
  perform set_config('request.jwt.claims', json_build_object('sub',u1,'role','authenticated')::text, true);
  r := r || ' staff=' || (sso_claim_my_college()->>'status');
  r := r || ' staff_again=' || (sso_claim_my_college()->>'already');
  perform set_config('request.jwt.claims', json_build_object('sub',u2,'role','authenticated')::text, true);
  r := r || ' learner=' || (sso_claim_my_college()->>'status');
  perform set_config('request.jwt.claims', json_build_object('sub',u3,'role','authenticated')::text, true);
  r := r || ' stranger=' || (sso_claim_my_college()->>'status');
  perform set_config('request.jwt.claims', json_build_object('sub',u4,'role','authenticated')::text, true);
  r := r || ' unverified=' || (sso_claim_my_college()->>'status');
  perform set_config('request.jwt.claims', json_build_object('sub',u5,'role','authenticated')::text, true);
  r := r || ' other_tenant=' || (sso_claim_my_college()->>'status');
  perform set_config('request.jwt.claims', json_build_object('sub',tutor,'role','authenticated')::text, true);
  r := r || ' password_account=' || (sso_claim_my_college()->>'status');
  reset role;
  r := r || ' staff_role=' || coalesce((select college_role from profiles where id=u1),'none');
  r := r || ' learner_linked=' || exists(select 1 from college_students where id=sid and user_id=u2);
  r := r || ' stranger_rows=' || ((select count(*) from college_staff where user_id=u3) + (select count(*) from college_students where user_id=u3));
  r := r || ' other_tenant_linked=' || exists(select 1 from college_staff where user_id=u5);
  r := r || ' logged=' || (select count(*) from college_activity where college_id='${NG}' and action like 'security.sso_linked_%' and created_at > now() - interval '1 minute');
  raise exception 'RESULT %', r;
end $$;`);
    console.log(`[49] ${r}`);
    expect(r).toContain('tutor_add=refused');
    expect(r).toContain('consumer_outlook=true consumer_tenant=true');
    expect(r).toContain('staff=staff');
    expect(r).toContain('staff_again=true');
    expect(r).toContain('learner=learner');
    expect(r).toContain('stranger=not_on_list');
    expect(r).toContain('unverified=email_not_verified');
    expect(r).toContain('other_tenant=wrong_tenant');
    expect(r).toContain('password_account=not_microsoft');
    expect(r).toContain('staff_role=tutor');
    expect(r).toContain('learner_linked=true');
    expect(r).toContain('stranger_rows=0');
    expect(r).toContain('other_tenant_linked=false');
    expect(r).toContain('logged=2');
  });

  test('anonymous: sso_domain_enabled is a yes/no only', async () => {
    const anon = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
    const { data, error } = await anon.rpc('sso_domain_enabled', {
      p_email: 'someone@not-a-college.example',
    });
    expect(error).toBeNull();
    expect(data).toBe(false);
    const list = await anon.from('college_sso_domains').select('domain');
    expect(list.data ?? []).toHaveLength(0);
  });

  test('UI: button hidden while the provider is off; starts the azure flow when on', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    try {
      await page.goto('/auth/signin');
      await expect(page.locator('#signin-form')).toBeVisible({ timeout: 60_000 });
      await page.waitForTimeout(1500);
      await expect(page.getByTestId('microsoft-sign-in')).toHaveCount(0);
    } finally {
      await ctx.close();
    }

    const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page2 = await ctx2.newPage();
    try {
      await page2.route('**/auth/v1/settings', async (route) => {
        const res = await route.fetch();
        const j = await res.json();
        j.external = { ...(j.external ?? {}), azure: true };
        await route.fulfill({ response: res, body: JSON.stringify(j) });
      });
      let authorizeUrl = '';
      await page2.route('**/auth/v1/authorize*', (route) => {
        authorizeUrl = route.request().url();
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<p>stub</p>' });
      });
      await page2.goto('/auth/signin');
      const btn = page2.getByTestId('microsoft-sign-in');
      await expect(btn).toBeVisible({ timeout: 60_000 });
      await expect(btn).toHaveText(/Sign in with Microsoft/);
      await btn.click();
      await expect.poll(() => authorizeUrl, { timeout: 20_000 }).toContain('provider=azure');
      const u = new URL(authorizeUrl);
      expect(u.searchParams.get('redirect_to')).toBe('http://localhost:8080/auth/microsoft');
      expect(u.searchParams.get('scopes')).toContain('email');
      expect(u.searchParams.get('code_challenge')).toBeTruthy();
    } finally {
      await ctx2.close();
    }
  });

  test('UI: the return page explains a missing session', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    try {
      await page.goto('/auth/microsoft');
      await expect(page.getByRole('heading', { name: 'Sign-in did not finish' })).toBeVisible({
        timeout: 60_000,
      });
      await expect(page.getByRole('link', { name: 'I have a join code' })).toBeVisible();
    } finally {
      await ctx.close();
    }
  });

  test('UI: settings show Microsoft domains read-only for a tutor', async ({ browser }) => {
    test.skip(!haveCreds(), 'College fixture credentials not available');
    const { context, page } = await signedInPage(browser, 'tutor');
    try {
      await page.goto('/college?section=collegesettings');
      const card = page.getByTestId('security-access-card');
      await expect(card).toBeVisible({ timeout: 60_000 });
      await expect(card.getByRole('heading', { name: 'Sign in with Microsoft' })).toBeVisible();
      await expect(card.getByText('Coming soon')).toBeVisible();
      await expect(card.getByLabel('Email domain')).toHaveCount(0);
    } finally {
      await context.close();
    }
  });
});
