/**
 * Journey 43 — share link controls (ELE-1885): expiry, PIN, open log, turn off.
 *
 * The bucket stays public (Andrew, 6 Oct); this proves everything else.
 * As the fixture learner, at desktop 1440 and phone 390:
 *   1. /apprentice/hub?share=1 opens the share sheet (the "wrong PIN"
 *      notification's route). Pick 24 hours, add a PIN, create the link.
 *   2. A signed-out visitor opens the link: the PIN screen, a wrong PIN says
 *      how many tries are left, the right PIN opens the portfolio with its
 *      assessment record (read-only, decisions and witness statements).
 *   3. Back in the sheet: "Opened once", the open log lists the device, and
 *      the wrong PIN is counted.
 *   4. Turn the link off: the visitor now sees "This link has expired".
 * The link's expiry is checked in the database to be 24 hours out.
 *
 * Cleanup by id: the shares (views and PIN attempts cascade) and their audit
 * events (replica mode, test rows only).
 */
import { test, expect, type Browser } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, lit, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot clean up');
test.describe.configure({ mode: 'serial' });

const made: string[] = [];
const SHOTS = process.env.W2_SHOTS;

async function visitor(browser: Browser, phone: boolean) {
  const context = await browser.newContext(
    phone
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'en-GB' }
      : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
  );
  await context.addInitScript(() => {
    try {
      localStorage.setItem(
        'elec-mate-cookie-consent',
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          timestamp: Date.now(),
        })
      );
    } catch {
      /* blocked */
    }
  });
  return context;
}

test.afterAll(async () => {
  if (made.length === 0) return;
  const ids = made.map(lit).join(',');
  admin(`
    delete from public.portfolio_shares where id in (${ids});
    set session_replication_role = replica;
    delete from public.portfolio_audit_events where object_id in (${ids});
    set session_replication_role = origin;
  `);
  const left = admin<{ n: number }>(
    `select (select count(*) from public.portfolio_shares where id in (${ids})) + (select count(*) from public.portfolio_audit_events where object_id in (${ids})) + (select count(*) from public.portfolio_share_pin_attempts where share_id in (${ids})) as n`
  );
  expect(Number(left[0]?.n ?? 0), 'everything this test made is gone').toBe(0);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`share link with a PIN, open log and turn off (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const l = await actor('learner');
    const started = new Date(Date.now() - 5_000).toISOString();
    const pin = phone ? '73915' : '4826';

    // 1. Make the link in the sheet.
    const learner = await signedInPage(browser, 'learner', viewport);
    await learner.page.goto('/apprentice/hub?share=1');
    const sheet = learner.page.getByRole('dialog');
    await expect(sheet.getByRole('heading', { name: 'Share your portfolio' })).toBeVisible({
      timeout: 45_000,
    });
    await sheet.getByRole('button', { name: '24 hours' }).click();
    await sheet.getByRole('button', { name: 'Add a PIN' }).click();
    await sheet.getByLabel('4 to 8 numbers').fill(pin);
    await sheet.getByRole('button', { name: 'Create link' }).click();
    await expect(sheet.getByText('PIN', { exact: true }).first()).toBeVisible();

    const rows = admin<{ id: string; public_token: string; hours: number }>(
      `select id, public_token, round(extract(epoch from (expires_at - created_at)) / 3600) as hours
         from public.portfolio_shares
        where user_id = ${lit(l.userId)} and created_at >= ${lit(started)} and public_token is not null and is_active
        order by created_at desc limit 1`
    );
    expect(rows.length, 'the PIN link exists').toBe(1);
    const share = rows[0]!;
    made.push(share.id);
    expect(Number(share.hours), 'the link ends 24 hours out').toBe(24);
    const card = sheet.locator('article').filter({ hasText: share.public_token });
    await expect(card, 'the link shown is the PIN link').toBeVisible();
    if (SHOTS) await learner.page.screenshot({ path: `${SHOTS}/43-sheet-${viewport}.png` });

    // 2. A visitor needs the PIN.
    const ctx = await visitor(browser, phone);
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
    await page.goto(`/view/${share.public_token}`);
    await expect(page.getByRole('heading', { name: 'Enter the PIN' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.getByText('Demo Learner (fixture)')).toHaveCount(0);
    await page.getByLabel('PIN').fill('0000');
    await page.getByRole('button', { name: 'Open the portfolio' }).click();
    await expect(page.getByText('That PIN is not right. 4 tries left.')).toBeVisible();
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/43-pin-${viewport}.png` });
    await page.getByLabel('PIN').fill(pin);
    await page.getByRole('button', { name: 'Open the portfolio' }).click();
    await expect(
      page.getByRole('heading', { level: 1, name: 'Demo Learner (fixture)' })
    ).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole('heading', { name: 'Assessment record' })).toBeVisible();
    await expect(page.getByText(/This is read-only/)).toBeVisible();
    await expect(page.getByText('Witness statement').first()).toBeVisible();
    // Nothing on the page can pass or fail work.
    await expect(page.getByRole('button', { name: /approve|sign off|pass/i })).toHaveCount(0);

    // 3. The learner sees the open and the wrong PIN.
    await learner.page.reload();
    await expect(sheet.getByRole('heading', { name: 'Share your portfolio' })).toBeVisible({
      timeout: 45_000,
    });
    const card2 = sheet.locator('article').filter({ hasText: share.public_token });
    await expect(card2.getByText(/^Opened once, last /)).toBeVisible();
    await expect(card2.getByText('1 wrong PIN in the last 24 hours')).toBeVisible();
    await card2.getByRole('button', { name: /Who opened it/ }).click();
    await expect(
      card2.getByText(phone ? /iPhone|Android|Mac|Linux|Windows/ : /Mac|Windows|Linux/).first()
    ).toBeVisible();
    if (SHOTS) await learner.page.screenshot({ path: `${SHOTS}/43-log-${viewport}.png` });

    // 4. Turn it off.
    await card2.getByRole('button', { name: 'Turn off' }).click();
    await card2.getByRole('button', { name: 'Turn it off' }).click();
    await expect(sheet.locator('article').filter({ hasText: share.public_token })).toHaveCount(0);
    const off = admin<{ is_active: boolean }>(
      `select is_active from public.portfolio_shares where id = ${lit(share.id)}`
    );
    expect(off[0]?.is_active).toBe(false);

    const ctx2 = await visitor(browser, phone);
    const page2 = await ctx2.newPage();
    await page2.goto(`/view/${share.public_token}`);
    await expect(page2.getByRole('heading', { name: 'This link has expired' })).toBeVisible({
      timeout: 45_000,
    });

    if (phone) {
      const overflow = await learner.page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }
    expect([...errors, ...learner.errors]).toEqual([]);
    await Promise.all([ctx.close(), ctx2.close(), learner.context.close()]);
  });
}
