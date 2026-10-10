/**
 * Journey 23 — assessment and progress, every screen, read-only.
 *
 * As the fixture tutor: the assessment hub, grading, ILPs and the plan
 * drafter, progress, EPA tracking, the assessment calendar, the portfolio
 * hub, Student 360, cohort EPA, cohort comparison, reports, the evidence
 * timeline, both evidence packs and the assessor workspace, on desktop and
 * phone. Fails on a page error or phone overflow. Screenshots go to
 * PORTFOLIO_TOUR_SHOTS when set. Nothing is written.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;

async function shot(page: Page, name: string, phone: boolean, fullPage = true) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(2500);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

const SECTIONS: Array<[string, string]> = [
  ['as01-hub', 'assessmenthub'],
  ['as02-grading', 'grading'],
  ['as03-ilp', 'ilpmanagement'],
  ['as04-ilp-draft', 'aiilpgenerator'],
  ['as05-progress', 'progresstracking'],
  ['as06-epa', 'epatracking'],
  ['as07-calendar', 'assessmentcalendar'],
  ['as08-portfolio', 'portfolio'],
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`assessment and progress screens (${viewport})`, async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    const phone = viewport === 'phone';
    const ctx = await learnerContext();
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);

    for (const [name, section] of SECTIONS) {
      await page.goto(`/college?section=${section}`);
      await shot(page, name, phone);
    }

    await page.goto(`/college?section=student360&studentId=${ctx.student_id}`);
    await shot(page, 'as09-student360', phone);

    // Criteria end to end: the assess area, then one criterion's evidence and
    // decision sheet. Opened and closed, never decided.
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#assess`);
    await page
      .getByRole('button', { name: /^(Ready to assess|Passed|All)\s*\d/ })
      .first()
      .waitFor({ timeout: 25_000 })
      .catch(() => undefined);
    await shot(page, 'as09b-assess', phone);
    // Tick one criterion that is ready to assess, open the decision sheet, look,
    // close it. Decisions are append-only, so nothing is recorded.
    const criterion = page.getByRole('button', { name: /^✓?AC \d/ }).first();
    if (await criterion.isVisible().catch(() => false)) {
      await criterion.click();
      const record = page.getByRole('button', { name: /^Record decision for/ }).first();
      await record.waitFor({ timeout: 10_000 });
      await shot(page, 'as09c-criterion-picked', phone, false);
      await record.click();
      await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
      await shot(page, 'as09d-decision-sheet', phone, false);
      await closeSheet(page);
    }

    const pages: Array<[string, string]> = [
      ['as10-cohort-epa', '/college/epa'],
      ['as11-compare', '/college/compare'],
      ['as12-reports', '/college/reports'],
      ['as13-evidence-timeline', `/college/students/${ctx.student_id}/evidence`],
      ['as14-evidence-pack', '/college/evidence-pack'],
      ['as15-learner-pack', `/college/evidence-pack/${ctx.student_id}`],
      ['as16-assessor', '/assessor'],
    ];
    for (const [name, url] of pages) {
      await page.goto(url);
      await shot(page, name, phone);
    }

    expect(errors).toEqual([]);
  });
}

/* ── Tap through the actions, on both sizes. Read-only: every sheet is opened
   and closed, every report is run and its CSV downloaded, nothing is saved. ── */

/**
 * Closes the open sheet with its own close button. Not Escape: inside the
 * College dashboard, Escape also runs the page's "back" shortcut and leaves
 * the section (CollegeDashboard's useKeyboardShortcuts).
 */
async function closeSheet(page: Page) {
  const dialog = page.getByRole('dialog').first();
  const close = dialog.getByRole('button', { name: /^(Close|Cancel)$/i }).first();
  if (await close.isVisible().catch(() => false)) {
    await close.click();
    await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 10_000 });
  } else {
    // No close button found: reload rather than risk Escape leaving the section.
    await page.reload();
  }
}

for (const viewport of ['phone', 'desktop'] as const) {
  test(`assessment and progress actions (${viewport})`, async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    const phone = viewport === 'phone';
    const ctx = await learnerContext();
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    const settle = async () => {
      await page.waitForLoadState('networkidle').catch(() => undefined);
      await page.waitForTimeout(1200);
    };

    // Portfolio: Assess on the oldest submission opens that learner's criteria.
    await page.goto('/college?section=portfolio');
    await settle();
    // The row itself is the button on a phone; desktop shows an Assess label in it.
    const assess = page.getByRole('button', { name: /Waiting|since yesterday/ }).first();
    if (await assess.isVisible().catch(() => false)) {
      await assess.click();
      await expect(page).toHaveURL(/section=student360.*#assess/);
      await shot(page, 'act01-portfolio-assess', phone);
    }

    // Grading: a row opens the submission sheet.
    await page.goto('/college?section=grading');
    await settle();
    const gradeRow = page.locator('li[data-qkey] > button').first();
    if (await gradeRow.isVisible().catch(() => false)) {
      await gradeRow.click();
      await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
      await shot(page, 'act02-grade-sheet', phone, false);
      await closeSheet(page);
    }

    // Learning plans: a plan opens the plan sheet; Create an ILP opens the picker.
    await page.goto('/college?section=ilpmanagement');
    await settle();
    const plan = page.locator('#ilp-plans').locator('xpath=following::ul[1]//li//button').first();
    if (await plan.isVisible().catch(() => false)) {
      await plan.click();
      await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
      await shot(page, 'act03-ilp-sheet', phone, false);
      await closeSheet(page);
    }
    await page.getByRole('button', { name: 'Create an ILP' }).first().click();
    await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
    await shot(page, 'act04-ilp-create', phone, false);
    await closeSheet(page);

    // Progress: a learner opens their Student 360.
    await page.goto('/college?section=progresstracking');
    await settle();
    const learner = page
      .locator('#progress-learners')
      .locator('xpath=following::ul[1]//li//button')
      .first();
    if (await learner.isVisible().catch(() => false)) {
      await learner.click();
      await expect(page).toHaveURL(/section=student360/);
    }

    // EPA admin: a record opens its detail sheet.
    await page.goto('/college?section=epatracking');
    await settle();
    const epaRow = page.getByRole('button', { name: /fixture\)/ }).first();
    if (await epaRow.isVisible().catch(() => false)) {
      await epaRow.click();
      await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
      await shot(page, 'act05-epa-sheet', phone, false);
      await closeSheet(page);
    }

    // Calendar: Schedule an assessment opens the form.
    await page.goto('/college?section=assessmentcalendar');
    await settle();
    await page.getByRole('button', { name: 'Schedule an assessment' }).first().click();
    await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
    await shot(page, 'act06-schedule', phone, false);
    await closeSheet(page);

    // Gateway readiness: "and N more" shows the rest of a learner's gate.
    await page.goto('/college/epa');
    await settle();
    const more = page.getByRole('button', { name: /^and \d+ more$/ }).first();
    if (await more.isVisible().catch(() => false)) {
      await more.click();
      await expect(page.getByRole('button', { name: /^and \d+ more$/ }).first())
        .not.toHaveText((await more.textContent()) ?? '', { timeout: 5_000 })
        .catch(() => undefined);
    }

    // Reports: cohort progress and quiz results run, and the CSV downloads.
    for (const r of ['cohort_progress', 'quiz_results']) {
      await page.goto(`/college/reports?r=${r}`);
      await settle();
      await expect(page.getByText('Could not run report')).toHaveCount(0);
      await expect(page.getByText(/rows? in the download/)).toBeVisible({ timeout: 20_000 });
      await shot(page, `act07-report-${r}`, phone);
      const dl = page.getByRole('button', { name: /^Download CSV/ }).first();
      if (await dl.isEnabled().catch(() => false)) {
        const [file] = await Promise.all([page.waitForEvent('download'), dl.click()]);
        expect(file.suggestedFilename()).toMatch(/\.csv$/);
      }
    }

    // Evidence timeline: a kind chip filters the list.
    await page.goto(`/college/students/${ctx.student_id}/evidence`);
    await settle();
    const portfolioChip = page.getByRole('tab', { name: /^Portfolio/ }).first();
    if (await portfolioChip.isVisible().catch(() => false)) {
      await portfolioChip.click();
      await expect(portfolioChip).toHaveAttribute('aria-selected', 'true');
    }

    // A learner's evidence pack: Learner details opens its sheet.
    await page.goto(`/college/evidence-pack/${ctx.student_id}`);
    await settle();
    await page.getByRole('button', { name: 'Learner details' }).first().click();
    await page.getByRole('dialog').first().waitFor({ timeout: 15_000 });
    await shot(page, 'act08-learner-details', phone, false);
    await closeSheet(page);

    // Assessor workspace: a learner card opens their criteria.
    await page.goto('/assessor');
    await settle();
    const card = page.getByRole('button', { name: /You are their/ }).first();
    if (await card.isVisible().catch(() => false)) {
      await card.click();
      await expect(page).toHaveURL(/learner=/);
      await settle();
      await shot(page, 'act09-assessor-learner', phone);
    }

    expect(errors).toEqual([]);
  });
}
