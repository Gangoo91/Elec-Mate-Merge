/**
 * Journey 42 — invite an independent assessor from a link (ELE-1870).
 *
 * At desktop 1440 and phone 390:
 *   1. The fixture learner, on Progress and assessment, taps "Invite an
 *      assessor", enters the assessor's email, name and role and creates the
 *      invite (a portfolio_assessor_links row, status invited).
 *   2. The invited assessor (the fixture IQA account, signed in) opens
 *      /assessor-invite/<token>, sees who asked and what they can do, and
 *      accepts. They land in the Assessor workspace on that learner, with the
 *      criteria view and decision tools, and nothing else of the learner's.
 *   3. The learner sees them under "Your assessors" and removes them; the
 *      workspace no longer lists the learner and the deep link says
 *      "You don't assess this learner".
 *
 * Only fixture accounts are involved and nothing is emailed (the invite is a
 * link the learner shares). Cleanup by id: the link, its audit events
 * (replica mode, test rows only) and the learner's "accepted" notification.
 */
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, lit, signedInPage, type Who } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot clean up');
test.describe.configure({ mode: 'serial' });

const IQA = 'iqa' as Who; // e2e/.auth/college-demo-iqa.json: Priya Nair (fixture)
const IQA_EMAIL = 'founder+collegedemo-iqa@elec-mate.com';
const made: string[] = [];
const SHOTS = process.env.W2_SHOTS;

test.afterAll(async () => {
  if (made.length === 0) return;
  const l = await actor('learner');
  const ids = made.map(lit).join(',');
  admin(`
    delete from public.user_notifications where user_id = ${lit(l.userId)} and type = 'assessor_accepted' and metadata->>'link_id' in (${ids});
    delete from public.portfolio_assessor_links where id in (${ids});
    set session_replication_role = replica;
    delete from public.portfolio_audit_events where object_id in (${ids});
    set session_replication_role = origin;
  `);
  const left = admin<{ n: number }>(
    `select (select count(*) from public.portfolio_assessor_links where id in (${ids})) + (select count(*) from public.portfolio_audit_events where object_id in (${ids})) as n`
  );
  expect(Number(left[0]?.n ?? 0), 'everything this test made is gone').toBe(0);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`invite, accept, assess, remove (${viewport})`, async ({ browser }) => {
    const l = await actor('learner');
    const iqa = await actor(IQA);
    expect(iqa.email.toLowerCase()).toBe(IQA_EMAIL);

    // 1. The learner invites.
    const learner = await signedInPage(browser, 'learner', viewport);
    await learner.page.goto('/apprentice/college/progress');
    await learner.page
      .getByRole('button', { name: /Invite an assessor/ })
      .first()
      .click({ timeout: 45_000 });
    const sheet = learner.page.getByRole('dialog');
    await sheet.getByLabel('Their email').fill(IQA_EMAIL);
    await sheet.getByLabel('Their name').fill('Priya Nair (fixture)');
    await sheet.getByRole('button', { name: 'Assessor', exact: true }).click();
    await sheet.getByRole('button', { name: 'Create invite' }).click();
    await expect(sheet.getByRole('heading', { name: 'Invite ready' })).toBeVisible();
    const url = (await sheet.locator('p.font-mono').innerText()).trim();
    const token = url.split('/assessor-invite/')[1];
    expect(token, 'the invite link carries a token').toBeTruthy();
    const link = admin<{ id: string; status: string; role: string }>(
      `select id, status, role from public.portfolio_assessor_links where token = ${lit(token!)}`
    );
    expect(link[0]).toMatchObject({ status: 'invited', role: 'assessor' });
    made.push(link[0]!.id);
    if (SHOTS) await learner.page.screenshot({ path: `${SHOTS}/42-invite-${viewport}.png` });
    await sheet.getByRole('button', { name: 'Done' }).click();

    // 2. The assessor accepts and lands on the learner.
    const assessor = await signedInPage(browser, IQA, viewport);
    await assessor.page.goto(`/assessor-invite/${token}`);
    await expect(assessor.page.getByRole('heading', { level: 1 })).toContainText(
      'has asked you to be their',
      {
        timeout: 45_000,
      }
    );
    if (SHOTS) await assessor.page.screenshot({ path: `${SHOTS}/42-accept-${viewport}.png` });
    await assessor.page.getByRole('button', { name: 'Accept and open portfolio' }).click();
    await expect(assessor.page).toHaveURL(new RegExp(`/assessor\\?learner=${l.userId}`), {
      timeout: 30_000,
    });
    await expect(
      assessor.page.getByRole('heading', { level: 1, name: 'Demo Learner (fixture)' })
    ).toBeVisible({
      timeout: 30_000,
    });
    // The criteria view with decision tools.
    await expect(assessor.page.getByText(/^AC \d/).first()).toBeVisible({ timeout: 30_000 });
    expect(
      admin<{ status: string }>(
        `select status from public.portfolio_assessor_links where id = ${lit(link[0]!.id)}`
      )[0]?.status
    ).toBe('active');
    if (SHOTS) await assessor.page.screenshot({ path: `${SHOTS}/42-workspace-${viewport}.png` });
    await assessor.page.getByRole('button', { name: 'All learners' }).click();
    await expect(assessor.page.getByText('Demo Learner (fixture)').first()).toBeVisible();
    await expect(assessor.page.getByText('You are their assessor').first()).toBeVisible();
    await expect(
      assessor.page
        .getByRole('heading', { name: 'Your assessor profile' })
        .or(assessor.page.getByText(/assessor profile/i).first())
    ).toBeVisible();

    // 3. The learner sees and removes them.
    await learner.page.reload();
    const row = learner.page
      .locator('li')
      .filter({ hasText: 'Priya Nair (fixture)' })
      .filter({ hasText: /accepted/ });
    await expect(row).toBeVisible({ timeout: 45_000 });
    await row.getByRole('button', { name: 'Remove' }).click();
    await learner.page.getByRole('button', { name: 'Remove access' }).click();
    await expect(row).toHaveCount(0);
    expect(
      admin<{ status: string }>(
        `select status from public.portfolio_assessor_links where id = ${lit(link[0]!.id)}`
      )[0]?.status
    ).toBe('revoked');

    await assessor.page.goto(`/assessor?learner=${l.userId}`);
    await expect(
      assessor.page.getByRole('heading', { name: "You don't assess this learner" })
    ).toBeVisible({
      timeout: 30_000,
    });

    if (viewport === 'phone') {
      for (const p of [learner.page, assessor.page]) {
        const overflow = await p.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);
      }
    }
    expect([...learner.errors, ...assessor.errors]).toEqual([]);
    await Promise.all([learner.context.close(), assessor.context.close()]);
  });
}
