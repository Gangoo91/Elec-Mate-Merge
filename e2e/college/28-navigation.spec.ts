/**
 * Journey 28 — moving around the College Hub and the learner's college pages.
 *
 * Desktop and phone. Checks what a person feels:
 *   - every new page opens at the top;
 *   - Back returns to the page you came from (not a fixed hub), at the place
 *     you scrolled to;
 *   - the browser's back and forward agree with the Back button and never loop;
 *   - a page opened cold (a link, a refresh) goes Back to its parent instead;
 *   - Escape on a section steps back like Back, and never while a sheet is open.
 */
import { test, expect, type Page } from '@playwright/test';
import { haveCreds, learnerRoll, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const section = (page: Page) => new URL(page.url()).searchParams.get('section');
const settle = async (page: Page) => {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(700);
};
const scrollY = (page: Page) => page.evaluate(() => Math.round(window.scrollY));
const back = (page: Page) => page.getByRole('button', { name: '← Back' }).first().click();

async function expectAtTop(page: Page, where: string) {
  await expect.poll(() => scrollY(page), { message: `${where} opens at the top`, timeout: 5_000 }).toBeLessThan(5);
}
async function expectNear(page: Page, y: number, where: string) {
  await expect
    .poll(async () => Math.abs((await scrollY(page)) - y), {
      message: `${where} comes back where it was left (${y}px)`,
      timeout: 6_000,
    })
    .toBeLessThan(80);
}
async function scrollTo(page: Page, y: number) {
  await page.evaluate((to) => window.scrollTo(0, to), y);
  await page.waitForTimeout(300); // the position is saved after scrolling stops
  return scrollY(page);
}

for (const size of ['desktop', 'phone'] as const) {
  test(`college hub: back goes where you came from (${size})`, async ({ browser }) => {
    test.setTimeout(4 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto('/college');
      await settle(page);

      // Home → People (a card near the bottom) → Learners.
      const people = page.getByRole('button', { name: /^People\b/ }).first();
      // Centre it: at the very top edge the sticky masthead (with the area
      // navigation) covers it and the tap scrolls the page again first.
      await people.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      const homeY = await scrollY(page);
      await people.click();
      await expect.poll(() => section(page)).toBe('peoplehub');
      await settle(page);
      await expectAtTop(page, 'People');

      await page.getByRole('button', { name: /^Learners \d+/ }).first().click();
      await expect.poll(() => section(page)).toBe('students');
      await settle(page);
      await expectAtTop(page, 'Learners');

      // Scroll the list, open the last learner.
      const rows = page.getByRole('button', { name: /^Open .+\(fixture\)$/ });
      const last = rows.last();
      await last.scrollIntoViewIfNeeded();
      const listY = await scrollTo(page, Math.max(0, (await scrollY(page)) - 40));
      const name = (await last.getAttribute('aria-label'))?.replace(/^Open /, '') ?? '';
      await last.click();
      await expect.poll(() => section(page)).toBe('student360');
      await settle(page);
      await expectAtTop(page, 'Learner profile');
      await expect(page.getByText(name).first()).toBeVisible();

      // Back → the Learners list, where it was scrolled to (not the Assessment hub).
      await back(page);
      await expect.poll(() => section(page)).toBe('students');
      await expectNear(page, listY, 'Learners list');

      // Browser back and forward agree with it.
      await page.goBack();
      await expect.poll(() => section(page)).toBe('peoplehub');
      await page.goForward();
      await expect.poll(() => section(page)).toBe('students');
      await page.goForward();
      await expect.poll(() => section(page), { message: 'forward reopens the learner' }).toBe('student360');
      await page.goBack();
      await expect.poll(() => section(page)).toBe('students');

      // Back, Back → People, then home at the card that was tapped.
      await back(page);
      await expect.poll(() => section(page)).toBe('peoplehub');
      await back(page);
      await expect.poll(() => section(page)).toBeNull();
      await expect(page).toHaveURL(/\/college$/);
      await expectNear(page, homeY, 'College home');

      // Escape on a section steps back like Back.
      await page.getByRole('button', { name: /^People\b/ }).first().click();
      await expect.poll(() => section(page)).toBe('peoplehub');
      await settle(page);
      await page.keyboard.press('Escape');
      await expect.poll(() => section(page), { message: 'Escape steps back to home' }).toBeNull();
      // Let home finish restoring its place before moving it again.
      await settle(page);
      await page.waitForTimeout(1500);

      // A standalone page (Off-the-job hours) opens at the top and comes back.
      const otj = page.getByRole('button', { name: /^Off-the-job hours\b/ }).first();
      await otj.evaluate((e) => e.scrollIntoView({ block: 'center' }));
      const homeY2 = await scrollY(page);
      await otj.click();
      await expect(page).not.toHaveURL(/\/college$/);
      await settle(page);
      await expectAtTop(page, 'Off-the-job hours');
      await back(page);
      await expect(page).toHaveURL(/\/college$/);
      await expectNear(page, homeY2, 'College home after a standalone page');

      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test(`college hub: a page opened cold goes back to its parent (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const roll = await learnerRoll();
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto(`/college?section=student360&studentId=${roll.id}`);
      await settle(page);
      await back(page);
      await expect.poll(() => section(page), { message: 'a cold learner profile goes back to Learners' }).toBe('students');
      await back(page);
      await expect.poll(() => section(page)).toBe('peoplehub');
      await back(page);
      await expect.poll(() => section(page)).toBeNull();
      await expect(page).toHaveURL(/\/college$/);
      // Parents replace the cold entry: the browser's back does not loop to the profile.
      await page.goBack().catch(() => undefined);
      await page.waitForTimeout(500);
      expect(page.url()).not.toContain('student360');

      // A standalone page opened cold goes back to the College home.
      await page.goto('/college/today');
      await settle(page);
      await back(page);
      await expect(page).toHaveURL(/\/college$/);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test(`learner profile: areas open at the top and Back steps out (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto('/college?section=students');
      await settle(page);
      await page.getByRole('button', { name: /^Open Demo Learner \(fixture\)$/ }).click();
      await expect.poll(() => section(page)).toBe('student360');
      await settle(page);

      const card = page.getByRole('button', { name: /^Attendance \d+%/ }).first();
      await card.scrollIntoViewIfNeeded();
      const overviewY = await scrollY(page);
      await card.click();
      await expect(page).toHaveURL(/#attendance$/);
      await expectAtTop(page, 'Attendance area');

      await back(page);
      await expect(page).not.toHaveURL(/#attendance/);
      await expect.poll(() => section(page)).toBe('student360');
      await expectNear(page, overviewY, 'Learner overview');

      await back(page);
      await expect.poll(() => section(page), { message: 'then Back returns to the Learners list' }).toBe('students');
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test(`learner college pages: open at the top, back to the same place (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', size);
    try {
      await page.goto('/apprentice/college-plan');
      await settle(page);
      const card = page.getByRole('button', { name: /^Comments and sign-offs/i }).first();
      await card.scrollIntoViewIfNeeded();
      const planY = await scrollY(page);
      await card.click();
      await expect(page).not.toHaveURL(/college-plan$/);
      await settle(page);
      await expectAtTop(page, 'Comments and sign-offs');
      await back(page);
      await expect(page).toHaveURL(/\/apprentice\/college-plan$/);
      await expectNear(page, planY, 'My college');

      // Opened cold, a college page goes back to My college.
      await page.goto('/apprentice/college/activities');
      await settle(page);
      await back(page);
      await expect(page).toHaveURL(/\/apprentice\/college-plan$/);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}

// Sheets opened from an inbox row: closing goes straight back, in one step.
for (const size of ['desktop', 'phone'] as const) {
  test(`inbox rows: a sheet opened from a link closes back to the inbox (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      // App learning row → the hours page with that learner's sheet → close → inbox.
      // (Hours rows to verify open the Hours to verify list in place, no sheet.)
      await page.goto('/college/inbox');
      await settle(page);
      const hoursChip = page.getByRole('button', { name: /^App learning\b/ }).locator('visible=true').first();
      await expect(hoursChip, 'the demo inbox has app learning rows').toBeVisible({ timeout: 20_000 });
      {
        await hoursChip.click();
        await page.waitForTimeout(400);
        await page.locator('main').getByText(/\(fixture\)$/).locator('visible=true').first().click();
        await expect(page).toHaveURL(/\/college\/otj\?.*learner=/, { timeout: 15_000 });
        const sheet = page.getByRole('dialog').last();
        await expect(sheet).toBeVisible({ timeout: 15_000 });
        await page.keyboard.press('Escape');
        await expect(page, 'closing the learner sheet returns to the inbox').toHaveURL(/\/college\/inbox/);
      }

      // Review row → the learner's review → one Escape closes it completely.
      await page.goto('/college/inbox');
      await settle(page);
      const reviewChip = page.getByRole('button', { name: /^Review\b/ }).locator('visible=true').first();
      await expect(reviewChip, 'the demo inbox has review rows').toBeVisible({ timeout: 20_000 });
      {
        await reviewChip.click();
        await page.waitForTimeout(400);
        await page.locator('main').getByText(/\(fixture\)$/).locator('visible=true').first().click();
        await expect(page).toHaveURL(/section=student360/, { timeout: 15_000 });
        await expect(page.getByRole('dialog').last()).toBeVisible({ timeout: 15_000 });
        await page.waitForTimeout(600);
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog'), 'one Escape closes the review').toHaveCount(0, { timeout: 5_000 });
        await back(page);
        await expect(page, 'then Back returns to the inbox').toHaveURL(/\/college\/inbox/);
      }
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
