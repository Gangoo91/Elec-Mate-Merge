/**
 * Journey 75 — the inbox bell on a phone, and "seen" for every inbox kind.
 *
 *  1. Every kind get_college_inbox can emit, and every kind the client labels,
 *     is accepted by college_inbox_read_states. 'deadline' (ELE-2041) was not,
 *     so "Mark all seen" failed with a 400 for any tutor with an EPAO deadline
 *     in their inbox (10 Oct 2026).
 *  2. At 360, 375 and 390 px the College masthead fits (Act fully on screen,
 *     no sideways scroll) and the bell opens a full-width bottom sheet whose
 *     rows show the learner's whole name line. Nothing is marked seen.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { admin, adminAvailable, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('every inbox kind can be marked seen', async () => {
  test.skip(!adminAvailable(), 'No Supabase CLI login');
  const [row] = admin<{ def: string; chk: string }>(
    `select (select pg_get_functiondef(p.oid) from pg_proc p where p.proname = 'get_college_inbox' limit 1) as def,
            (select pg_get_constraintdef(oid) from pg_constraint where conname = 'college_inbox_read_states_source_check') as chk`
  );
  const serverKinds = [...row.def.matchAll(/'kind',\s*'([a-z_]+)'/g)].map((m) => m[1]);
  const src = fs.readFileSync(path.resolve('src/hooks/useUnifiedInbox.ts'), 'utf8');
  const block = src.slice(src.indexOf('INBOX_KIND_LABEL'), src.indexOf('};', src.indexOf('INBOX_KIND_LABEL')));
  const clientKinds = [...block.matchAll(/^\s+([a-z_]+):/gm)].map((m) => m[1]);
  expect(serverKinds.length).toBeGreaterThan(5);
  expect(clientKinds.length).toBeGreaterThan(5);
  for (const k of new Set([...serverKinds, ...clientKinds])) {
    expect(row.chk, `read-state check must accept '${k}'`).toContain(`'${k}'`);
  }
});

test('masthead fits and the bell is a full-width sheet on phones', async ({ browser }) => {
  const { context, page, errors } = await signedInPage(browser, 'tutor', 'phone');
  for (const w of [360, 375, 390]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('/college');
    const act = page.getByRole('button', { name: /^Act:/ });
    await expect(act).toBeVisible();
    const box = await act.boundingBox();
    expect(box!.x + box!.width, `Act on screen at ${w}px`).toBeLessThanOrEqual(w);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(w);

    await page.getByRole('button', { name: /^Alerts/ }).click();
    const sheet = page.getByRole('dialog', { name: 'Inbox' });
    await expect(sheet).toBeVisible();
    const s = await sheet.boundingBox();
    expect(Math.round(s!.x)).toBe(0);
    expect(Math.round(s!.width)).toBe(w);
    await expect(sheet.getByRole('button', { name: /in the inbox|Open the inbox/ })).toBeVisible();
    await sheet.getByRole('button', { name: 'Close' }).click();
    await expect(sheet).toBeHidden();
  }
  expect(errors).toEqual([]);
  await context.close();
});

test.describe('area navigation', () => {
  test('slides away on a phone when scrolling down, back on scrolling up; fixed on desktop', async ({
    browser,
  }) => {
    const navHeight = (page: import('@playwright/test').Page) =>
      page.getByRole('navigation', { name: 'College Hub' }).evaluate((n) => Math.round(n.getBoundingClientRect().height));

    const phone = await signedInPage(browser, 'tutor', 'phone');
    await phone.page.goto('/college');
    await expect(phone.page.getByRole('navigation', { name: 'College Hub' })).toBeVisible();
    expect(await navHeight(phone.page)).toBeGreaterThanOrEqual(44);
    await phone.page.mouse.wheel(0, 900);
    await expect.poll(() => navHeight(phone.page)).toBeLessThan(4);
    await phone.page.screenshot({ path: '/tmp/em-qa/dash/nav-tucked-390.png' });
    await phone.page.mouse.wheel(0, -200);
    await expect.poll(() => navHeight(phone.page)).toBeGreaterThanOrEqual(44);
    await phone.context.close();

    const desk = await signedInPage(browser, 'tutor', 'desktop');
    await desk.page.goto('/college');
    await expect(desk.page.getByRole('navigation', { name: 'College Hub' })).toBeVisible();
    await desk.page.mouse.wheel(0, 900);
    await desk.page.waitForTimeout(600);
    expect(await navHeight(desk.page)).toBeGreaterThanOrEqual(44);
    await desk.context.close();
  });
});
