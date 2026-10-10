/**
 * Journey 65 — NET's AM2S v1 Candidate Checklist, three signatures and the
 * NET booking pack (ELE-2050).
 *
 *   1. The fixture learner's answers are set as themselves (52 items
 *      Adequate or better, D.2 Experience Limited). On their checklist page
 *      the headline says 1 below Adequate and signing is closed; they move
 *      D.2 to Adequate on screen, and sign the apprentice declaration.
 *   2. The tutor opens the same form, makes the employer's link and signs the
 *      training provider declaration.
 *   3. The employer opens the link on a phone with no account, reads NET's
 *      behaviours statement and declaration, and signs.
 *   4. All three signed: the gateway gate "NET Readiness for Assessment
 *      checklist" is green, and the booking pack downloads as an 11-page PDF
 *      (cover + NET's 10 pages, flattened); "NET checklist only" is 10 pages.
 *   5. The learner changes an answer: their signature shows "Sign again" and
 *      the gate is red again.
 * The checklist, its signatures and bells are deleted at the end (the audit
 * trail is append-only by design, so its signing events stay).
 */
import fs from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import { test, expect, type Page, type Locator } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerRoll, lit, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.W3_SHOTS;
const KEYS = [
  ...[1, 2, 3].map((n) => `A1.${n}`),
  ...Array.from({ length: 22 }, (_, i) => `A2.${i + 1}`),
  ...Array.from({ length: 13 }, (_, i) => `B.${i + 1}`),
  ...[1, 2, 3].map((n) => `C.${n}`),
  ...[1, 2, 3, 4, 5].map((n) => `D.${n}`),
  ...Array.from({ length: 7 }, (_, i) => `E.${i + 1}`),
];
let token = '';

function cleanup(learnerId: string, tutorId: string) {
  admin(`
    delete from public.net_am2s_checklists where learner_id = ${lit(learnerId)};
    delete from public.user_notifications where user_id = ${lit(tutorId)} and type = 'net_checklist_signed' and created_at > now() - interval '1 hour';
  `);
}

async function draw(canvasHost: Locator, page: Page) {
  const canvas = canvasHost.locator('canvas').first();
  await canvas.scrollIntoViewIfNeeded();
  const b = (await canvas.boundingBox())!;
  await page.mouse.move(b.x + 20, b.y + b.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++)
    await page.mouse.move(b.x + 20 + i * 15, b.y + b.height / 2 + (i % 2 ? -18 : 18));
  await page.mouse.up();
}

async function gate(): Promise<string> {
  const t = await actor('tutor');
  const l = await actor('learner');
  const { data } = await t.db.rpc('get_gateway_readiness', { p_learner: l.userId });
  const items = (data as { items: Array<{ key: string; state: string }> }).items;
  return items.find((i) => i.key === 'net_checklist')?.state ?? 'missing';
}

async function noSideways(page: Page, size: string) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `no sideways scroll (${size})`).toBeLessThanOrEqual(1);
}

test.describe.serial('NET AM2S checklist and booking pack', () => {
  test.skip(() => !adminAvailable(), 'Needs the Supabase CLI to clean up');

  test.beforeAll(async () => {
    const l = await actor('learner');
    cleanup(l.userId, (await actor('tutor')).userId);
    const ratings = Object.fromEntries(
      KEYS.map((k, i) => [
        k,
        { k: i % 3 ? 'adequate' : 'extensive', e: k === 'D.2' ? 'limited' : 'adequate' },
      ])
    );
    const { data, error } = await l.db.rpc('save_net_am2s_checklist', {
      p_learner: l.userId,
      p_patch: { registered_version: '1.2', uln: '1234567890', ratings },
    });
    expect(error).toBeNull();
    expect((data as { success?: boolean }).success).toBe(true);
  });
  test.afterAll(async () => {
    cleanup((await actor('learner')).userId, (await actor('tutor')).userId);
  });

  test('learner fixes the last gap on screen and signs (desktop)', async ({ browser }) => {
    test.setTimeout(3 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', 'desktop');
    try {
      await page.goto('/apprentice/net-checklist');
      const head = page.getByTestId('net-checklist-headline');
      await expect(head).toHaveText('53 of 53 items rated, 1 below Adequate, 0 of 3 signatures.', {
        timeout: 60_000,
      });
      await expect(page.getByTestId('net-section-A2')).toContainText(
        'Install and terminate XLPE SWA'
      );
      await expect(page.getByTestId('net-section-E')).toContainText(
        'Apprentices will be expected to answer 45 questions'
      );
      const cand = page.getByTestId('net-sign-candidate');
      await expect(cand).toContainText('Signing opens when every item is rated at least Adequate');
      await expect(async () => {
        const chip = page.getByTestId('rate-D.2-e').getByRole('radio', { name: 'Adequate' });
        await chip.click();
        await expect(chip).toHaveAttribute('aria-checked', 'true', { timeout: 3_000 });
      }).toPass({ timeout: 30_000 });
      await expect(head).toHaveText('53 of 53 items rated, 0 below Adequate, 0 of 3 signatures.', {
        timeout: 20_000,
      });
      await expect(cand).toContainText('As the apprentice, I formally confirm');
      await cand.getByLabel('Print name').fill('Demo Learner');
      await draw(cand, page);
      await cand.getByRole('button', { name: 'Sign as the apprentice' }).click();
      await expect(cand).toContainText('Signed', { timeout: 20_000 });
      await expect(head).toHaveText('53 of 53 items rated, 0 below Adequate, 1 of 3 signatures.');
      await noSideways(page, 'desktop');
      if (SHOTS)
        await page
          .screenshot({ timeout: 15_000, path: `${SHOTS}/65-learner-desktop.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('tutor makes the employer link and signs for the provider (desktop)', async ({
    browser,
  }) => {
    test.setTimeout(3 * 60_000);
    const roll = await learnerRoll();
    const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
    try {
      await page.goto(`/college/net-checklist/${roll.id}`);
      await expect(page.getByTestId('net-checklist-headline')).toContainText('1 of 3 signatures', {
        timeout: 60_000,
      });
      await expect(page.getByTestId('net-cert')).toContainText(
        'Delivery of Apprenticeship Completion Certificate'
      );
      const emp = page.getByTestId('net-sign-employer');
      await emp.getByRole('button', { name: /signing link/ }).click();
      const link = emp.getByTestId('net-employer-link');
      await expect(link).toContainText('/net-checklist-sign/', { timeout: 20_000 });
      token = ((await link.textContent()) ?? '').split('/net-checklist-sign/')[1].trim();
      expect(token.length).toBeGreaterThan(30);

      const prov = page.getByTestId('net-sign-provider');
      await expect(prov).toContainText('As the apprentice’s training provider');
      await prov.getByLabel('Print name').fill('Fixture Tutor');
      await draw(prov, page);
      await prov.getByRole('button', { name: 'Sign for the training provider' }).click();
      await expect(prov).toContainText('Signed', { timeout: 20_000 });
      if (SHOTS)
        await page
          .screenshot({ timeout: 15_000, path: `${SHOTS}/65-tutor-desktop.png` })
          .catch(() => undefined);
      await noSideways(page, 'desktop');
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('employer signs on a phone with no account', async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    expect(token).not.toBe('');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      locale: 'en-GB',
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    try {
      await page.goto(`/net-checklist-sign/${token}`);
      await expect(page.getByRole('heading', { name: /employer signature/ })).toBeVisible({
        timeout: 60_000,
      });
      await expect(
        page.getByText(
          'has consistently demonstrated the following behaviours to the standard I require'
        )
      ).toBeVisible();
      await expect(page.getByText('Install a 32A TP & N supply')).toBeVisible();
      await page.getByLabel('Company Name').fill('Turner Electrical Ltd');
      await page.getByLabel('Print Name').fill('Sam Turner');
      await draw(page.locator('main, body').first(), page);
      await page.getByRole('button', { name: /I am the apprentice’s employer/ }).click();
      await page.getByRole('button', { name: 'Sign NET’s checklist' }).click();
      await expect(page.getByText('Signed. Thank you.')).toBeVisible({ timeout: 20_000 });
      await noSideways(page, 'phone');
      if (SHOTS)
        await page
          .screenshot({ timeout: 15_000, path: `${SHOTS}/65-employer-phone.png`, fullPage: false })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('all three signed: gate green, booking pack downloads (phone)', async ({ browser }) => {
    test.setTimeout(3 * 60_000);
    expect(await gate()).toBe('green');
    const roll = await learnerRoll();
    const { context, page, errors } = await signedInPage(browser, 'tutor', 'phone');
    try {
      await page.goto(`/college/net-checklist/${roll.id}`);
      await expect(page.getByTestId('net-checklist-headline')).toContainText('3 of 3 signatures', {
        timeout: 60_000,
      });
      const [dl] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download the NET booking pack' }).click(),
      ]);
      const pack = await PDFDocument.load(fs.readFileSync((await dl.path())!));
      expect(pack.getPageCount()).toBe(11);
      expect(pack.getForm().getFields().length).toBe(0);
      const [dl2] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'NET checklist only (PDF)' }).click(),
      ]);
      const form = await PDFDocument.load(fs.readFileSync((await dl2.path())!));
      expect(form.getPageCount()).toBe(10);
      await noSideways(page, 'phone');
      if (SHOTS)
        await page
          .getByTestId('net-checklist-summary')
          .screenshot({ timeout: 15_000, path: `${SHOTS}/65-tutor-phone.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('a changed answer marks the signatures to sign again (phone)', async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', 'phone');
    try {
      await page.goto('/apprentice/net-checklist');
      await expect(page.getByTestId('net-checklist-headline')).toContainText('3 of 3 signatures', {
        timeout: 60_000,
      });
      await expect(async () => {
        const chip = page.getByTestId('rate-E.7-k').getByRole('radio', { name: 'Extensive' });
        await chip.click();
        await expect(chip).toHaveAttribute('aria-checked', 'true', { timeout: 3_000 });
      }).toPass({ timeout: 30_000 });
      await expect(page.getByTestId('net-checklist-headline')).toContainText('0 of 3 signatures', {
        timeout: 20_000,
      });
      await expect(page.getByTestId('net-sign-candidate')).toContainText('Sign again');
      expect(await gate()).toBe('red');
      await noSideways(page, 'phone');
      if (SHOTS)
        await page
          .getByTestId('net-sign-candidate')
          .screenshot({ timeout: 15_000, path: `${SHOTS}/65-learner-stale-phone.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('the public link refuses a bad token', async () => {
    const r = admin<{ r: { error?: string } }>(
      `select public.get_net_am2s_checklist_public(${lit('x'.repeat(48))}) as r`
    );
    expect(r[0].r.error).toBe('This link is not valid.');
  });
});
