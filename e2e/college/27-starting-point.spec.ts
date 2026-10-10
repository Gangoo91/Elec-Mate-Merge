/**
 * Journey 27 — the learner's starting point in Student 360 (ELE-1977).
 *
 * As the fixture tutor, on desktop and phone: the Starting point section shows
 * its three cards (initial assessment, English and maths, prior learning),
 * each sheet opens with its save button on screen at 44px or more, and the
 * page never scrolls sideways. Nothing is saved.
 */
import { test, expect } from '@playwright/test';
import { haveCreds, learnerRoll, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

for (const size of ['desktop', 'phone'] as const) {
  test(`starting point reads and opens on ${size}`, async ({ browser }, info) => {
    test.setTimeout(120_000);
    const roll = await learnerRoll();
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto(`/college?section=student360&studentId=${roll.id}#ilp`);
      const section = page.locator('#starting-point');
      await section.scrollIntoViewIfNeeded({ timeout: 30_000 });
      for (const h of ['Initial assessment', 'English and maths', 'Prior learning']) {
        await expect(section.getByRole('heading', { name: h })).toBeVisible();
      }
      await page.screenshot({ path: info.outputPath(`starting-point-${size}.png`), fullPage: false });

      const cards = section.locator('h3');
      for (let i = 0; i < 3; i++) {
        const card = cards.nth(i).locator('xpath=ancestor::*[.//button][1]');
        await card.getByRole('button').first().click();
        const sheet = page.getByRole('dialog').last();
        await expect(sheet).toBeVisible();
        await page.waitForTimeout(600); // let the sheet finish sliding up
        const save = sheet.getByRole('button', { name: /save|record/i }).last();
        await expect(save).toBeInViewport({ ratio: 1 });
        const box = await save.boundingBox();
        expect(box?.height ?? 0, 'save button is a 44px target').toBeGreaterThanOrEqual(43);
        await page.screenshot({ path: info.outputPath(`starting-point-${size}-sheet${i + 1}.png`) });
        await page.keyboard.press('Escape');
        await expect(sheet).toBeHidden();
        // Escape closes the sheet but must not leave Student 360.
        await expect(section).toBeVisible();
      }

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, 'no sideways scroll').toBeLessThanOrEqual(1);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
