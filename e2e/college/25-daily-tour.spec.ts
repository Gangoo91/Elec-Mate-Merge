/**
 * Journey 25 — the tutor's daily work, every screen, read-only.
 *
 * As the fixture tutor: the College Hub home, Today, the inbox, the work
 * queue, off-the-job hours (section, page and inbox), progress reviews, help,
 * plus the Act sheet, the learner search and the notifications, on desktop
 * and phone. Fails on a page error or phone overflow. Screenshots go to
 * PORTFOLIO_TOUR_SHOTS when set.
 *
 * The third test taps through every daily action on a 390px phone and checks
 * each one lands where it should: all six Act tiles, the learner search, the
 * alerts, the inbox, hours, the work queue and a progress review. It saves
 * nothing: no message is sent, nothing is verified or approved (a verified
 * entry is append-only).
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

/** Closes whatever sheet or dialog is open. */
async function dismiss(page: Page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
}

const PAGES: [string, string][] = [
  ['day1-home', '/college'],
  ['day2-today', '/college/today'],
  ['day3-inbox', '/college/inbox'],
  ['day4-workqueue', '/college?section=workqueue'],
  ['day5-otj-section', '/college?section=otjtraining'],
  ['day6-otj', '/college/otj'],
  ['day7-otj-inbox', '/college/otj/inbox'],
  ['day8-reviews', '/college/reviews'],
  ['day9-help', '/college/help'],
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`daily work screens (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);

    for (const [name, url] of PAGES) {
      await page.goto(url);
      await shot(page, name, phone);
    }

    // The Act sheet, from the masthead.
    await page.goto('/college/today');
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const act = page.getByRole('button', { name: /^Act/ }).first();
    if (await act.isVisible().catch(() => false)) {
      await act.click();
      await expect(page.getByRole('heading', { name: 'What do you need to do?' })).toBeVisible();
      await shot(page, 'day10-act', phone);
      const message = page.getByRole('button', { name: /^Message/ }).last();
      if (await message.isVisible().catch(() => false)) {
        await message.click();
        await expect(page.getByRole('heading', { name: 'Who to message?' })).toBeVisible();
        await shot(page, 'day11-act-message', phone);
        // Pick the fixture learner: the message sheet must open on a phone too.
        const learner = page.getByRole('button', { name: /Demo Learner/ }).first();
        if (await learner.isVisible().catch(() => false)) {
          await learner.click();
          await shot(page, 'day11b-message-sheet', phone);
        }
        await dismiss(page);
        await dismiss(page);
      }
    }

    // The learner search and notifications live on the College Hub masthead.
    await page.goto('/college');
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const search = page.getByRole('button', { name: 'Search learners' }).first();
    if (await search.isVisible().catch(() => false)) {
      await search.click();
      await shot(page, 'day12-search', phone);
      await dismiss(page);
    }
    const bell = page.getByRole('button', { name: /^Alerts/ }).first();
    if (await bell.isVisible().catch(() => false)) {
      await bell.click();
      await shot(page, 'day13-notifications', phone);
      await dismiss(page);
    }

    // A progress review, opened from the reviews page.
    await page.goto('/college/reviews');
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const openReview = page.locator('[data-review-row]').first();
    if (await openReview.isVisible().catch(() => false)) {
      await openReview.click();
      await shot(page, 'day14-review', phone);
      await dismiss(page);
    }

    expect(errors).toEqual([]);
  });
}

test('daily actions work on a phone (tap-through, nothing saved)', async ({ browser }) => {
  const { page, errors } = await signedInPage(browser, 'tutor', 'phone');
  const dialog = page.getByRole('dialog').last();
  const settle = () => page.waitForLoadState('networkidle').catch(() => undefined);

  /** Opens the Act sheet from the masthead and taps one tile. */
  const actTile = async (label: RegExp) => {
    await page.goto('/college/today');
    await settle();
    await page.getByRole('button', { name: /^Act/ }).first().click();
    await expect(page.getByRole('heading', { name: 'What do you need to do?' })).toBeVisible();
    await page.getByRole('dialog').getByRole('button', { name: label }).first().click();
  };

  // Register: hands over to the College Hub, which opens the register sheet.
  await actTile(/^Register/);
  await expect(page).toHaveURL(/\/college/);
  await expect(dialog).toBeVisible();
  await dismiss(page);

  // Observe and Discussion: the observation sheet, learner picker first.
  await actTile(/^Observe/);
  await expect(page.getByText('Who are you assessing?').first()).toBeVisible();
  await dismiss(page);
  await actTile(/^Discussion/);
  await expect(page.getByText('Who are you assessing?').first()).toBeVisible();
  await dismiss(page);

  // Decide: whose criteria.
  await actTile(/^Decide/);
  await expect(page.getByRole('heading', { name: 'Whose criteria?' })).toBeVisible();
  await dismiss(page);

  // Verify hours: the off-the-job page with its primary action.
  await actTile(/^Verify hours/);
  await expect(page).toHaveURL(/\/college\/otj$/);
  await expect(page.getByRole('heading', { name: /app learning|approved/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Hours to verify' })).toBeVisible();

  // Message: pick the fixture learner, write (never send).
  await actTile(/^Message/);
  await expect(page.getByRole('heading', { name: 'Who to message?' })).toBeVisible();
  await page
    .getByRole('button', { name: /Demo Learner/ })
    .first()
    .click();
  const box = page.getByRole('textbox', { name: 'Message' });
  await expect(box).toBeVisible();
  await box.fill('Tap-through check, not sent');
  await expect(page.getByRole('button', { name: /^Send$/ })).toBeEnabled();
  await box.fill('');
  await dismiss(page);

  // Learner search finds a learner by name and opens their record.
  await page.goto('/college');
  await settle();
  await page.getByRole('button', { name: 'Search learners' }).first().click();
  await page.getByPlaceholder('Search learners, staff or courses').fill('Demo Learner');
  const hit = page.getByRole('option', { name: /Demo Learner/ }).first();
  await expect(hit).toBeVisible();
  await hit.click();
  await expect(page).toHaveURL(/section=student360/);

  // Alerts: the first row opens its item.
  await page.goto('/college');
  await settle();
  await page
    .getByRole('button', { name: /^Alerts/ })
    .first()
    .click();
  await expect(page.getByText(/things? needs? you|Nothing needs you/).first()).toBeVisible();
  await page.getByRole('button', { name: /^(All \d+ in the inbox|Open the inbox)/ }).click();
  await expect(page).toHaveURL(/\/college\/inbox/);

  // Inbox: the Hours chip, then the first entry opens in Hours to verify.
  await settle();
  const hoursChip = page.getByRole('button', { name: /^Hours \d+/ }).first();
  if (await hoursChip.isVisible().catch(() => false)) {
    await hoursChip.click();
    await page.locator('[data-qkey^="hours:"] button:not([role="checkbox"])').first().click();
    await expect(page).toHaveURL(/\/college\/otj\/inbox\?entry=/);
    await settle();
    // The entry opens under its row on a phone, Verify and Return within reach.
    await expect(page.getByRole('button', { name: 'Verify hours' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^Return/ }).first()).toBeVisible();
  }

  // Off-the-job page: a learner's days open in a sheet.
  await page.goto('/college/otj');
  await settle();
  await page
    .getByRole('button', { name: /of 1,066h|counted/ })
    .first()
    .click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Student 360' })).toBeVisible();
  await dismiss(page);

  // Work queue: evidence opens the submission itself.
  await page.goto('/college?section=workqueue');
  await settle();
  const assess = page.locator('[data-qkey] button:not([role="checkbox"])').first();
  if (await assess.isVisible().catch(() => false)) {
    await assess.click();
    await settle();
    await expect(page.getByRole('dialog').first().or(page.locator('h1').first())).toBeVisible();
    await dismiss(page);
  }

  // Progress reviews: a row opens the review workspace.
  await page.goto('/college/reviews');
  await settle();
  await page.locator('[data-review-row]').first().click();
  await expect(dialog).toBeVisible();
  await dismiss(page);

  expect(errors).toEqual([]);
});
