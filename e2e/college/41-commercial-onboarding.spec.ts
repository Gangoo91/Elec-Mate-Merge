/**
 * Journey 41 — commercial and onboarding (P-ELE-13 wave 2):
 *   ELE-1854 "Try it on your phone": the presenter's QR in the demo college,
 *            a visitor's phone signed in as a throwaway demo learner in one
 *            scan, single-use token, the Demo learner bar, ending the visit,
 *            and the cleanup deleting the account.
 *   ELE-1921 the week-one checklist on the College Hub home (days 1 to 5).
 *   ELE-1924 the public /for-colleges page and its request flow.
 *   ELE-1922 Learners and billing: staff-only screen, admin-only writes.
 *   ELE-1979 provider type in Settings, admin-only change.
 *
 * Desktop 1440 and phone 390. The request form is intercepted (no email is
 * sent and no lead is created). The demo visitor is a real account made by the
 * college-demo-try edge function in the demo college only; the test ends the
 * visit and runs the cleanup so the account is deleted before it finishes.
 */
import { test, expect, type Browser } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, lit, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SIZES = ['desktop', 'phone'] as const;
const PHONE = {
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  locale: 'en-GB',
  timezoneId: 'Europe/London',
};
const DESKTOP = {
  viewport: { width: 1440, height: 900 },
  locale: 'en-GB',
  timezoneId: 'Europe/London',
};

async function anonPage(browser: Browser, size: 'desktop' | 'phone') {
  const context = await browser.newContext(size === 'phone' ? PHONE : DESKTOP);
  await context.addInitScript(() => {
    try {
      window.localStorage.setItem(
        'elec-mate-cookie-consent',
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          timestamp: Date.now(),
        })
      );
    } catch {
      /* storage blocked */
    }
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
  return { context, page, errors };
}

/* ───────────────────────── ELE-1924 public page ───────────────────────── */

for (const size of SIZES) {
  test(`for-colleges: learner-owned story, pricing placeholder, request flow (${size})`, async ({
    browser,
  }) => {
    const { context, page, errors } = await anonPage(browser, size);
    try {
      let payload: Record<string, unknown> | null = null;
      await page.route('**/functions/v1/college-request-info', async (route) => {
        if (route.request().method() === 'OPTIONS')
          return route.fulfill({ status: 200, body: 'ok' });
        payload = JSON.parse(route.request().postData() ?? '{}');
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
      });
      await page.goto('/for-colleges');
      await expect(page.getByRole('heading', { level: 1 })).toContainText(
        'The apprentice keeps the record'
      );
      await expect(page.getByText('The learner keeps their record for life')).toBeVisible();
      await expect(page.getByText('The tutor’s morning in one screen')).toBeVisible();
      await expect(page.getByText('Evidence to decision on a phone')).toBeVisible();
      await expect(page.getByTestId('pricing-placeholder')).toContainText(
        '[PRICING: Andrew to confirm'
      );

      const body = (await page.locator('main').innerText()).toLowerCase();
      for (const banned of [
        'learner pays',
        'college pays nothing',
        'walkthrough',
        'book a demo',
        'book a call',
        '—',
      ]) {
        expect(body, `public copy must not contain "${banned}"`).not.toContain(banned);
      }
      for (const name of ['onefile', 'bud ', 'smart assessor', 'aptem', 'ecordia']) {
        expect(body, 'no competitor named').not.toContain(name);
      }
      // No horizontal scroll at this width.
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
      ).toBe(true);

      await page.getByRole('link', { name: 'Request access for your college' }).first().click();
      await page.getByRole('radio', { name: 'Independent training provider' }).click();
      await page.getByLabel(/Your name/).fill('E2E Tester');
      await page.getByLabel(/Work email/).fill('e2e-request@example.invalid');
      await page.getByLabel(/^Organisation/).fill('E2E Training Centre');
      await page.getByLabel(/Roughly how many learners/).fill('120');
      await page.getByRole('button', { name: /Request access for your centre/ }).click();
      await expect(page.getByTestId('request-sent')).toBeVisible();
      expect(payload).toMatchObject({
        audience: 'college',
        organisation: 'E2E Training Centre',
        provider_type: 'itp',
        learner_estimate: '120',
      });
      await page.screenshot({
        path: test.info().outputPath(`for-colleges-${size}.png`),
        fullPage: true,
      });
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}

test('the request function still validates on the server (no email sent)', async ({ request }) => {
  const res = await request.post(
    'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/college-request-info',
    {
      headers: {
        apikey: process.env.VITE_SUPABASE_ANON_KEY ?? '',
        'Content-Type': 'application/json',
      },
      data: { name: '', email: 'x' },
    }
  );
  // Without a key the gateway refuses (401); with one the function refuses the empty name (400). Never 200.
  expect([400, 401]).toContain(res.status());
});

/* ───────────────────────── ELE-1854 try it on your phone ───────────────────────── */

test('try it on your phone: bad and finished links explain themselves', async ({ browser }) => {
  const { context, page, errors } = await anonPage(browser, 'phone');
  try {
    await page.goto('/try/0123456789abcdef0123456789abcdef0123');
    await expect(page.getByTestId('demo-try-error')).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('That code does not work');
    await page.goto('/try');
    await expect(page.getByTestId('demo-try-ended')).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('try it on your phone: one scan makes a demo learner, the code works once, cleanup deletes it', async ({
  browser,
}) => {
  test.skip(!adminAvailable(), 'Needs the Supabase CLI to run the cleanup');
  test.setTimeout(240_000);

  // Guard rails, in the database: a real college has no demo cohort, so nothing can be minted for it.
  const guard = admin<{ real: string | null; demo: string | null }>(
    `select public._demo_try_cohort('b2c3d4e5-f6a7-8901-bcde-f23456789012') as real,
            public._demo_try_cohort('a1b2c3d4-e5f6-7890-abcd-ef1234567890') as demo`
  )[0];
  expect(guard.real).toBeNull();
  expect(guard.demo).not.toBeNull();

  const presenter = await signedInPage(browser, 'tutor', 'desktop');
  const visitor = await anonPage(browser, 'phone');
  const second = await anonPage(browser, 'phone');
  let visitorEmail: string | null = null;
  try {
    await presenter.page.goto('/college/try-on-phone');
    await expect(presenter.page.getByTestId('try-qr')).toBeVisible({ timeout: 45_000 });
    const href = await presenter.page.getByTestId('try-link').getAttribute('href');
    expect(href).toMatch(/\/try\/[0-9a-f]{36}$/);
    const path = new URL(href as string).pathname;
    await presenter.page.screenshot({ path: test.info().outputPath('try-presenter-desktop.png') });

    // The visitor's phone: one scan, signed in, labelled as a demo.
    await visitor.page.goto(path);
    await visitor.page.waitForURL('**/apprentice/college-plan', { timeout: 60_000 });
    await expect(visitor.page.getByTestId('demo-visitor-bar')).toBeVisible({ timeout: 30_000 });
    await expect(visitor.page.getByTestId('demo-visitor-bar')).toContainText('Demo learner');
    await expect(
      visitor.page.locator('h1:visible', { hasText: 'Northgate Technical College' }).first()
    ).toBeVisible({ timeout: 30_000 });
    visitorEmail = await visitor.page.evaluate(() => {
      const raw = window.localStorage.getItem('sb-jtwygbeceundfgnkirof-auth-token');
      return raw ? (JSON.parse(raw).user?.email as string) : null;
    });
    expect(visitorEmail).toMatch(/^founder\+collegedemo-try-[0-9a-f]+@elec-mate\.com$/);
    await visitor.page.screenshot({ path: test.info().outputPath('try-visitor-phone.png') });

    // The presenter sees them arrive and the next code goes up.
    await expect(presenter.page.getByTestId('try-just-in')).toBeVisible({ timeout: 20_000 });

    // The same code a second time: refused.
    await second.page.goto(path);
    await expect(second.page.getByTestId('demo-try-error')).toBeVisible({ timeout: 30_000 });
    await expect(second.page.getByRole('heading', { level: 1 })).toHaveText(
      'Someone got there first'
    );

    // The ledger row: demo college, demo cohort, fixture-tutor cohort, 2-hour session.
    const row = admin<{ demo: boolean; tutor_email: string; hours: number }>(
      `select c.is_demo as demo, st.email as tutor_email,
              round(extract(epoch from (v.session_ends_at - v.created_at)) / 3600) as hours
         from public.college_demo_visitors v
         join public.colleges c on c.id = v.college_id
         join public.college_students s on s.id = v.student_row_id
         join public.college_cohorts co on co.id = s.cohort_id
         join public.college_staff st on st.id = co.tutor_id
        where v.email = ${lit(visitorEmail as string)}`
    )[0];
    expect(row.demo).toBe(true);
    expect(row.tutor_email).toMatch(/^founder\+collegedemo-/);
    expect(Number(row.hours)).toBe(2);

    // End the visit from the bar.
    await visitor.page.getByRole('button', { name: 'End demo' }).click();
    await visitor.page.waitForURL('**/try', { timeout: 30_000 });
    await expect(visitor.page.getByTestId('demo-try-ended')).toBeVisible();
  } finally {
    await presenter.context.close();
    await visitor.context.close();
    await second.context.close();
    if (visitorEmail) {
      // Bring the 48-hour deletion forward for this visitor only, then run the real cleanup.
      admin(
        `update public.college_demo_visitors set delete_after = now() where email = ${lit(visitorEmail)};
         select public.cleanup_demo_visitors();`
      );
    }
  }
  const after = admin<{ deleted: boolean; users: number; roll: number }>(
    `select v.deleted_at is not null as deleted,
            (select count(*) from auth.users u where u.email = v.email) as users,
            (select count(*) from public.college_students s where s.email = v.email) as roll
       from public.college_demo_visitors v where v.email = ${lit(visitorEmail as string)}`
  )[0];
  expect(after.deleted).toBe(true);
  expect(Number(after.users)).toBe(0);
  expect(Number(after.roll)).toBe(0);
});

/* ───────────────────────── ELE-1921 / 1922 / 1979 in the hub ───────────────────────── */

for (const size of SIZES) {
  test(`week one, billing and provider type in the hub (${size})`, async ({ browser }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      // ELE-1921: the first week, days 1 to 5.
      await page.goto('/college');
      const week = page.getByTestId('college-week-one');
      await expect(week).toBeVisible({ timeout: 45_000 });
      for (const d of [1, 2, 3, 4, 5])
        await expect(page.getByTestId(`week-one-day-${d}`)).toBeVisible();
      await expect(week).toContainText('Your first week');
      await expect(page.getByTestId('week-one-day-5')).toContainText('Head of department');
      await week.screenshot({ path: test.info().outputPath(`week-one-${size}.png`) });

      // ELE-1922: billing is for admins and heads of department; the fixture tutor is neither.
      await page.goto('/college/billing');
      await expect(page.getByRole('heading', { name: 'Learners and billing' }).first()).toBeVisible(
        { timeout: 30_000 }
      );
      await expect(page.getByText('For admins and heads of department')).toBeVisible();

      // ELE-1979: provider type shown in Settings, read-only for a tutor.
      await page.goto('/college?section=collegesettings');
      const card = page.getByTestId('provider-type-card');
      await expect(card).toBeVisible({ timeout: 30_000 });
      await expect(card.getByRole('radio', { name: /FE college/ })).toHaveAttribute(
        'aria-checked',
        'true'
      );
      await expect(card.getByRole('radio', { name: /Employer-provider/ })).toBeDisabled();
      await expect(page.getByText('Learners and billing').first()).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
      ).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}

test('only Elec-Mate can write billing or change the provider type', async () => {
  const t = await actor('tutor');
  const prov = await t.db.rpc('set_college_provider_type', {
    p_college: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    p_type: 'itp',
  });
  expect(prov.error?.message).toMatch(/admin or head of department/);
  const count = await t.db.rpc('admin_record_learner_count', {
    p_college: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    p_count: 1,
    p_note: null,
  });
  expect(count.error?.message).toMatch(/Platform admins only/);
  const billing = await t.db.rpc('get_college_billing', { p_college: null });
  expect(billing.error).toBeNull();
  expect(billing.data).toBeNull(); // a tutor gets nothing
  const token = await t.db.rpc('create_demo_try_token');
  expect(token.error).toBeNull(); // a demo-college tutor can present
  // Learner accounts can never mint a code or read billing for another college.
  const l = await actor('learner');
  const lt = await l.db.rpc('create_demo_try_token');
  expect(lt.error?.message).toMatch(/demo college/);
  // Ledger tables are invisible to app users.
  const read = await t.db.from('college_demo_visitors').select('id').limit(1);
  expect(read.data ?? []).toEqual([]);
});

/* ELE-1922: what an admin or head of department sees. No fixture holds that role,
   so the screen is fed the shape get_college_billing returned for the demo college
   in a rolled-back check on 10 Oct 2026 (count taken then corrected, one invoice). */
const BILLING_SAMPLE = {
  college_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  college_name: 'Northgate Technical College',
  provider_type: 'fe_college',
  has_account: true,
  pricing_model: 'to_confirm',
  college_price_pence: null,
  setup_fee_pence: null,
  academic_year: '2026/27',
  academic_year_start_month: 9,
  renewal_date: '2027-08-31',
  po_number: 'PO-TEST',
  billing_contact_name: 'Finance team',
  billing_contact_email: 'finance@example.invalid',
  payment_terms_days: 30,
  invoice_split: 'annual',
  live: { linked: 3, no_cohort: 1, linked_cohort_ids: [] },
  count: { academic_year: '2026/27', counted_on: '2026-10-10', learner_count: 5, corrected: true },
  previous_counts: [{ academic_year: '2025/26', counted_on: '2025-09-15', learner_count: 4 }],
  cohorts: [
    { id: 'a', name: 'L2 Electrical 2025-A', billing_linked: true, learners: 8 },
    { id: 'b', name: 'Evening short course', billing_linked: false, learners: 3 },
  ],
  invoices: [
    {
      id: 'i1',
      academic_year: '2026/27',
      description: '2026/27 licence',
      amount_pence: 617000,
      vat_pence: 0,
      invoice_number: 'INV-T1',
      po_number: 'PO-TEST',
      status: 'sent',
      issued_on: '2026-10-10',
      due_on: '2026-11-09',
      paid_on: null,
    },
  ],
};

for (const size of SIZES) {
  test(`learners and billing: a counted year for an admin (${size})`, async ({ browser }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.route('**/rest/v1/rpc/get_college_billing', (route) =>
        route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(BILLING_SAMPLE) })
      );
      await page.goto('/college/billing');
      await expect(page.getByText('Counted for 2026/27')).toBeVisible({ timeout: 30_000 });
      await expect(page.getByTestId('billing-price')).toHaveText('On your order form');
      await expect(page.getByText('INV-T1', { exact: false })).toBeVisible();
      await expect(page.getByText('Not linked')).toBeVisible();
      await expect(page.getByText(/without a cohort/)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      await page.screenshot({ path: test.info().outputPath(`billing-${size}.png`), fullPage: true });
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test(`presenter screen for try it on your phone (${size})`, async ({ browser }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto('/college/try-on-phone');
      await expect(page.getByTestId('try-qr')).toBeVisible({ timeout: 45_000 });
      await expect(page.getByText(/Visitors today/)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      await page.screenshot({ path: test.info().outputPath(`try-presenter-${size}.png`), fullPage: true });
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
