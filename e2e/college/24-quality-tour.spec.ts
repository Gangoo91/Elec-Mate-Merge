/**
 * Journey 24 — quality and compliance, every screen, read-only.
 *
 * As the fixture tutor: the Quality & Compliance hub and its sections
 * (quality dashboard, compliance docs, safeguarding queue, IQA workflow,
 * IQA OTJ audit, lesson observations, tutor workload), then the standalone
 * pages (compliance hub, pack, Ofsted lens, SAR, QIP, rehearsal, IQA,
 * a sampling plan, a policy, college value), on desktop and phone.
 * Fails on a page error or phone overflow. Screenshots go to
 * PORTFOLIO_TOUR_SHOTS when set.
 *
 * Then a tap-through of the actions that write nothing: help sheets, filters
 * and tabs, the next-gap drawer, a random OTJ sample's verdict form (closed
 * with Cancel), the QIP "Add as action" sheet (closed unsaved), the IQA tabs
 * and the value report's month stepper. Nothing is saved, so nothing needs
 * deleting.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage, NORTHGATE } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.setTimeout(240_000);
const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(1200);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage: true,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

const SECTIONS = [
  'qualityhub',
  'qualitydashboard',
  'compliancedocs',
  'safeguardingqueue',
  'iqaworkflow',
  'iqaotjaudit',
  'tutorobs',
  'tutorworkload',
] as const;

const PAGES: Array<[string, string]> = [
  ['q20-compliance', '/college/compliance'],
  ['q21-pack', '/college/compliance/pack'],
  ['q22-ofsted', '/college/compliance/ofsted'],
  ['q23-sar', '/college/compliance/sar'],
  ['q24-qip', '/college/compliance/qip'],
  ['q25-rehearsal', '/college/compliance/rehearsal'],
  ['q26-iqa', '/college/iqa'],
  ['q29-value', '/college/value'],
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`quality and compliance screens (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const t = await actor('tutor');
    const [{ data: plan }, { data: policy }] = await Promise.all([
      t.db
        .from('college_iqa_sampling')
        .select('id')
        .eq('college_id', NORTHGATE)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      t.db
        .from('college_policies')
        .select('id')
        .eq('college_id', NORTHGATE)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    const planId = (plan as { id: string } | null)?.id;
    const policyId = (policy as { id: string } | null)?.id;

    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    let i = 10;
    for (const s of SECTIONS) {
      await page.goto(`/college?section=${s}`);
      await shot(page, `q${i++}-${s}`, phone);
    }
    for (const [name, url] of PAGES) {
      await page.goto(url);
      await shot(page, name, phone);
    }
    if (planId) {
      await page.goto(`/college/iqa/sampling/${planId}`);
      await shot(page, 'q27-sampling-plan', phone);
    }
    if (policyId) {
      await page.goto(`/college/policies/${policyId}`);
      await shot(page, 'q28-policy', phone);
    }
    expect(errors).toEqual([]);
  });

  test(`quality and compliance actions (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    // Close with the sheet's own button. Escape also works, but on the
    // dashboard a second Escape handler steps back to the parent hub.
    const closeSheet = async () => {
      const dialog = page.getByRole('dialog').last();
      const close = dialog.getByRole('button', { name: /^(close|cancel)$/i }).first();
      if (await close.isVisible().catch(() => false)) await close.click();
      else await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
    };

    // Hub: the help sheet opens and the primary action goes somewhere.
    await page.goto('/college?section=qualityhub');
    // The header draws the help twice (beside the title on a phone, by the
    // actions on desktop); click the one that is showing.
    await page
      .locator('button[aria-label="How quality and compliance works"]:visible')
      .first()
      .click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await shot(page, 'a01-hub-help', phone);
    await closeSheet();

    // Staff records: the next gap opens the person's drawer; filters switch.
    await page.goto('/college?section=compliancedocs');
    const fix = page.getByRole('button', { name: 'Fix next gap' });
    if (
      await fix.waitFor({ state: 'visible', timeout: 15_000 }).then(
        () => true,
        () => false
      )
    ) {
      await fix.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await shot(page, 'a02-next-gap', phone);
      await closeSheet();
    }
    await page
      .getByRole('button', { name: /^Action needed/ })
      .first()
      .click();
    await page
      .getByRole('button', { name: /^Policies$/ })
      .first()
      .click();
    await expect(page.getByRole('button', { name: 'Add policy' })).toBeVisible();
    await shot(page, 'a03-policies-tab', phone);

    // OTJ audit: a random entry opens with its verdict form; Cancel saves nothing.
    await page.goto('/college?section=iqaotjaudit');
    const random = page.getByRole('button', { name: 'Sample one at random' });
    if (
      await random.waitFor({ state: 'visible', timeout: 15_000 }).then(
        () => true,
        () => false
      )
    ) {
      await random.click();
      await expect(page.getByRole('button', { name: 'Record verdict' })).toBeVisible();
      await shot(page, 'a04-otj-verdict-form', phone);
      await page.getByRole('button', { name: 'Cancel' }).first().click();
      await expect(page.getByRole('button', { name: 'Record verdict' })).toHaveCount(0);
    }

    // IQA workflow: the open filter.
    await page.goto('/college?section=iqaworkflow');
    await page.getByRole('button', { name: /^Open/ }).first().click();

    // Lesson observations: a row opens its detail.
    await page.goto('/college?section=tutorobs');
    const obs = page.locator('button[aria-expanded]').first();
    if (
      await obs.waitFor({ state: 'visible', timeout: 15_000 }).then(
        () => true,
        () => false
      )
    ) {
      await obs.click();
      await expect(obs).toHaveAttribute('aria-expanded', 'true');
    }

    // Compliance hub: tabs swap the panel.
    await page.goto('/college/compliance');
    await page.getByRole('tab', { name: 'Ofsted readiness' }).click();
    await expect(page.getByRole('heading', { name: 'Ofsted readiness' })).toBeVisible();
    await page.getByRole('tab', { name: 'Evidence search' }).click();
    await expect(page.getByRole('heading', { name: 'Ask an inspection question' })).toBeVisible();
    await shot(page, 'a07-evidence-search', phone);
    await page.getByRole('tab', { name: 'Improvement plan' }).click();
    await expect(page.getByRole('button', { name: 'Open improvement plan' })).toBeVisible();

    // QIP: an SAR area for improvement opens a prefilled sheet; closed unsaved.
    await page.goto('/college/compliance/qip');
    const addAs = page.getByRole('button', { name: 'Add as action' }).first();
    if (
      await addAs.waitFor({ state: 'visible', timeout: 15_000 }).then(
        () => true,
        () => false
      )
    ) {
      await addAs.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.locator('#qip-title')).not.toHaveValue('');
      await shot(page, 'a05-qip-from-sar', phone);
      await closeSheet();
    }
    await page.getByRole('button', { name: 'New action' }).click();
    await expect(page.locator('#qip-title')).toHaveValue('');
    await closeSheet();

    // IQA dashboard: every tab renders.
    await page.goto('/college/iqa');
    for (const t of [/^Findings/, /^Standardisation/, /^Coverage/, /^Sampling/]) {
      // The IQA tabs are real tabs since the 10 Oct redesign.
      await page.getByRole('tab', { name: t }).first().click();
      await page.waitForTimeout(300);
    }
    await shot(page, 'a06-iqa-tabs', phone);

    // Value report: step back a month and forward again.
    await page.goto('/college/value');
    const title = page.getByRole('heading', { level: 1, name: /in numbers$/ }).last();
    const before = await title.textContent();
    await page.getByRole('button', { name: 'Previous month' }).click();
    await expect(title).not.toHaveText(before ?? '');
    await page.getByRole('button', { name: 'Next month' }).click();
    await expect(title).toHaveText(before ?? '');

    expect(errors).toEqual([]);
  });
}
