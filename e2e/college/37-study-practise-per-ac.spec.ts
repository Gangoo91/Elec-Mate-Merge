/**
 * Journey 37 — "Study" and "Practise" on each criterion (ELE-1904).
 *
 * The links come from mappings people already made: each Study Centre lesson's
 * own "Maps to … AC x.y" header, and the mock exams' content-matched question
 * → page table. The fixture learner is on C&G 5357, whose criteria borrow the
 * links of identically worded 2365-03 criteria (canonical_ac_id).
 *
 * Checks, desktop and phone:
 *   - the coverage screen shows Study on exactly the criteria study_links_for
 *     returns for a unit, and Practise likewise;
 *   - Study opens the mapped lesson page;
 *   - Practise opens a paper of 10 questions drawn from that lesson's section.
 * Read-only: the paper is opened, never sat.
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

type Link = { unit_code: string; ac_code: string; kind: 'study' | 'practise'; route: string; minutes: number | null; question_count: number | null };

const UNIT = '103/003';

async function linksFor(code: string): Promise<Link[]> {
  const l = await actor('learner');
  const { data, error } = await l.db.rpc('study_links_for' as never, { p_qualification_code: code } as never);
  expect(error).toBeNull();
  return data as unknown as Link[];
}

test('study_links_for: every link is a real lesson route, own links win', async () => {
  const rows = await linksFor('2365-03');
  expect(rows.length).toBeGreaterThan(100);
  for (const r of rows) {
    expect(r.route).toMatch(/^\/study-centre\/apprentice\//);
    if (r.kind === 'practise') expect(r.question_count ?? 0).toBeGreaterThanOrEqual(5);
  }
  // 5357 borrows by identical wording only; EAL borrows nothing.
  const cg = await linksFor('5357');
  expect(cg.length).toBeGreaterThan(0);
  expect(cg.every((r) => (r as unknown as { via: string }).via === 'same_wording')).toBe(true);
  expect(await linksFor('601/7345/2')).toEqual([]);
});

for (const size of ['desktop', 'phone'] as const) {
  test(`coverage shows Study and Practise, and both open the right place (${size})`, async ({ browser }) => {
    test.setTimeout(3 * 60_000);
    const rows = (await linksFor('5357')).filter((r) => r.unit_code === UNIT);
    const studyAcs = new Set(rows.filter((r) => r.kind === 'study').map((r) => r.ac_code));
    const practiseAcs = new Set(rows.filter((r) => r.kind === 'practise').map((r) => r.ac_code));
    expect(studyAcs.size).toBeGreaterThan(0);

    const { context, page, errors } = await signedInPage(browser, 'learner', size);
    try {
      await page.goto('/apprentice/hub?tab=work&view=coverage');
      const unitBtn = page.getByRole('button', { name: new RegExp(UNIT.replace('/', '\\/')) }).first();
      await unitBtn.scrollIntoViewIfNeeded({ timeout: 45_000 });
      await unitBtn.click();
      const chips = page.getByTestId('study-practise');
      await expect(chips.first()).toBeVisible({ timeout: 20_000 });
      await expect(page.getByRole('button', { name: /^Study/ })).toHaveCount(studyAcs.size);
      await expect(page.getByRole('button', { name: /^Practise \(\d+ questions\)/ })).toHaveCount(
        practiseAcs.size
      );

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, 'no sideways scroll').toBeLessThanOrEqual(1);
      if (process.env.ELE1904_SHOTS)
        await chips.first().locator('xpath=ancestor::ul[1]').screenshot({ path: `${process.env.ELE1904_SHOTS}/coverage-${size}.png` });

      // Study → the lesson page that names this criterion in its header.
      const firstRow = chips.first().locator('xpath=ancestor::li[1]');
      const acCode = ((await firstRow.locator('span', { hasText: /^AC / }).first().textContent()) ?? '')
        .replace('AC ', '')
        .trim();
      const study = rows.find((r) => r.kind === 'study' && r.ac_code === acCode)!;
      expect(study, `a study link for AC ${acCode}`).toBeTruthy();
      await expect(firstRow.getByRole('button', { name: /^Study/ })).toContainText(
        study.minutes ? `Study (${study.minutes} min)` : 'Study'
      );
      await firstRow.getByRole('button', { name: /^Study/ }).click();
      await expect(page).toHaveURL(new RegExp(`${study.route.replace(/[/-]/g, '\\$&')}$`));
      await page.goBack();

      // Practise → a ten-question paper on that lesson's section.
      const practise = rows.find((r) => r.kind === 'practise' && practiseAcs.has(r.ac_code))!;
      await page.goto(
        `/study-centre/practise?bank=&section=${encodeURIComponent(practise.route)}&ac=x`
      );
      await expect(page.getByText('This practice link is incomplete.')).toBeVisible({ timeout: 30_000 });

      await page.goto('/apprentice/hub?tab=work&view=coverage');
      await page.getByRole('button', { name: new RegExp(UNIT.replace('/', '\\/')) }).first().click();
      const pBtn = page.getByRole('button', { name: /^Practise \(\d+ questions\)/ }).first();
      await pBtn.scrollIntoViewIfNeeded();
      await pBtn.click();
      await expect(page).toHaveURL(/\/study-centre\/practise\?bank=level[23]-module8-mock\d/);
      await expect(page.getByText(new RegExp(`Practise ${UNIT.replace('/', '\\/')} AC`)).first()).toBeVisible({
        timeout: 45_000,
      });
      await expect(page.getByText(/10 questions from the lesson section/).first()).toBeVisible();
      if (process.env.ELE1904_SHOTS)
        await page.screenshot({ path: `${process.env.ELE1904_SHOTS}/practise-${size}.png` });
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
