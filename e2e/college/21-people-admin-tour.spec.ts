/**
 * Journey 21 — people and admin, every screen, read-only.
 *
 * As the fixture tutor: the people hub, tutors, learners, cohorts, support
 * staff, course setup, settings (college, curriculum, operational, LTI),
 * batch operations, the audit log, the employer portal and college setup,
 * plus the add-a-learner / staff / cohort sheets, on desktop and phone.
 * Nothing is saved: every sheet is opened, screenshotted and closed.
 * Fails on a page error or phone overflow. Screenshots go to
 * PORTFOLIO_TOUR_SHOTS when set.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
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

/**
 * Opens a sheet by its button, screenshots it, then (when `submit` is given)
 * presses the sheet's save button on the EMPTY form so the validation shows,
 * screenshots that, and closes. An empty form never saves: the name is
 * required on every one of these sheets. Skips if the button is not there.
 */
async function sheet(page: Page, button: RegExp, name: string, phone: boolean, submit?: RegExp) {
  const b = page.getByRole('button', { name: button }).first();
  if (!(await b.isVisible().catch(() => false))) return;
  await b.click();
  await page.waitForTimeout(600);
  await shot(page, name, phone);
  if (submit) {
    const dialog = page.getByRole('dialog').last();
    const save = dialog.getByRole('button', { name: submit }).last();
    if (await save.isVisible().catch(() => false)) {
      await save.click();
      await page.waitForTimeout(400);
      await expect(
        dialog.getByText(/Enter their full name|Give the cohort a name/).first()
      ).toBeVisible();
      await shot(page, `${name}-errors`, phone);
    }
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
}

const SECTIONS: [string, string, RegExp | null, RegExp | undefined][] = [
  ['peoplehub', 'pa01-people-hub', null, undefined],
  ['students', 'pa02-learners', /^Enrol learner$/, /^Enrol learner$/],
  ['tutors', 'pa03-tutors', /^Add one$/, /^Add tutor$/],
  ['cohorts', 'pa04-cohorts', /^New cohort$/, /^Create cohort$/],
  ['supportstaff', 'pa05-support-staff', /^Add staff member$/, /^Add staff member$/],
  ['coursesetup', 'pa06-course-setup', /^Add course$/, undefined],
  ['collegesettings', 'pa07-college-settings', null, undefined],
  ['ltisettings', 'pa08-lti', null, undefined],
  ['batchoperations', 'pa09-batch', null, undefined],
  ['auditlog', 'pa10-audit-log', null, undefined],
  ['employerportal', 'pa11-employer-portal', null, undefined],
];

const PAGES: [string, string][] = [
  ['/college/settings/curriculum', 'pa12-curriculum-settings'],
  ['/college/settings/operational', 'pa13-operational-settings'],
  ['/college/setup', 'pa14-college-setup'],
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`people and admin screens (${viewport})`, async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    for (const [section, name, add, submit] of SECTIONS) {
      await page.goto(`/college?section=${section}`);
      await shot(page, name, phone);
      if (add) await sheet(page, add, `${name}-sheet`, phone, submit);
    }
    for (const [url, name] of PAGES) {
      await page.goto(url);
      await shot(page, name, phone);
    }
    expect(errors).toEqual([]);
  });
}
