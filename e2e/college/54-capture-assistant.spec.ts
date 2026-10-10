/**
 * Journey 54 — the on-site capture assistant (ELE-1927).
 *
 * The learner photographs a consumer unit and says what they did. The
 * assistant (capture-assistant edge function, gpt-5.4-mini, BS 7671 RAG):
 *   - suggests criteria as "Suggested" chips; nothing is ticked for them,
 *   - drafts the reflective account from their own words, used only on a tap,
 *   - spots the board and asks for the test sheet,
 *   - names the one job that closes the most open criteria,
 * and every part is marked as using AI. Nothing is saved: no portfolio row is
 * written. The uploaded photo is removed from storage at the end.
 *
 * Also checks the function directly: codes it returns are only the learner's
 * real criteria, its output is labelled ai_suggested, and it never returns an
 * amendment tag from the RAG.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage, SUPABASE_URL } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.setTimeout(240_000);

const SHOTS = process.env.CAPTURE_SHOTS;
const BOARD = fs.readFileSync(path.resolve('public/images/site-photos/consumer-unit-eic.jpg'));
const NOTES =
  'Changed the consumer unit at a house today with Dave. I done the dead tests, labelled every circuit and checked the RCD trip times.';

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(500);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage: false,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

test('the assistant function suggests only real criteria, labelled, with no amendment tags', async () => {
  const l = await actor('learner');
  const res = await fetch(`${SUPABASE_URL}/functions/v1/capture-assistant`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${l.session.access_token}`,
    },
    body: JSON.stringify({
      transcript: NOTES,
      files: [
        {
          type: 'image/jpeg',
          description: 'A consumer unit with RCBOs and a main switch, a multifunction tester below',
          elements: ['consumer unit', 'RCBO', 'main switch'],
          workType: 'consumer unit replacement',
        },
      ],
      matched: [],
      hasTestSheet: false,
    }),
  });
  expect(res.status).toBe(200);
  const body = (await res.json()) as {
    source: string;
    model: string;
    criteria: Array<{ unit_code: string; ac_code: string }>;
    reflection: string;
    testSheet: { needed: boolean };
    nextJob: { covers: Array<{ unit_code: string; ac_code: string }> } | null;
  };
  expect(body.source).toBe('ai_suggested');
  expect(body.model).toBe('gpt-5.4-mini-2026-03-17');
  expect(body.testSheet.needed).toBe(true);
  expect(body.reflection.length).toBeGreaterThan(40);
  expect(body.reflection).not.toMatch(/—/);
  expect(JSON.stringify(body)).not.toMatch(/is_a4_change|A4:2026|Amendment 4/i);

  const { data: state } = await l.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
  const real = new Set(
    ((state ?? []) as Array<{ unit_code: string; ac_code: string }>).map(
      (r) => `${r.unit_code}|${r.ac_code}`
    )
  );
  for (const c of body.criteria)
    expect(real.has(`${c.unit_code}|${c.ac_code}`), `${c.unit_code} ${c.ac_code}`).toBe(true);
  for (const c of body.nextJob?.covers ?? [])
    expect(real.has(`${c.unit_code}|${c.ac_code}`)).toBe(true);
});

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`on site: suggestions, a draft in my words, the test sheet and the next job (${viewport})`, async ({
    browser,
  }) => {
    const l = await actor('learner');
    const started = new Date(Date.now() - 5000).toISOString();
    const { context, page, errors } = await signedInPage(browser, 'learner', viewport);
    // The exact objects this run uploads, so cleanup never touches anyone else's.
    const uploaded = new Set<string>();
    page.on('request', (r) => {
      const m = /\/storage\/v1\/object\/portfolio-evidence\/([^?]+)/.exec(r.url());
      if (m && r.method() !== 'GET') uploaded.add(decodeURIComponent(m[1]));
    });
    try {
      await page.goto('/apprentice/hub?capture=1&preset=photo');
      const dialog = page.getByRole('dialog').first();
      await expect(dialog.getByText('Capture · Photo').first()).toBeVisible();
      await page.locator('input[type="file"][accept="image/*"]').setInputFiles({
        name: 'e2e-board.jpg',
        mimeType: 'image/jpeg',
        buffer: BOARD,
      });
      await expect(dialog.getByText(/Uploading/).first()).toHaveCount(0, { timeout: 60_000 });
      await dialog.getByPlaceholder(/Speak or type/).fill(NOTES);
      await dialog.getByRole('button', { name: /Read it and suggest criteria/ }).click();

      const panel = dialog.getByTestId('capture-assistant');
      await expect(panel).toBeVisible({ timeout: 90_000 });
      await expect(panel.getByText('uses AI').first()).toBeVisible();
      await expect(panel.getByText('Reading your capture')).toHaveCount(0, { timeout: 90_000 });

      // The board is in the photo and there is no test sheet: it asks.
      await expect(panel.getByTestId('assist-test-sheet')).toBeVisible();
      // The draft is offered, never written in by itself.
      const reflection = dialog.getByTestId('capture-reflection');
      await expect(reflection).toHaveValue('');
      await expect(panel.getByTestId('assist-reflection')).toBeVisible();
      await panel.getByRole('button', { name: 'Use this draft' }).click();
      await expect(reflection).not.toHaveValue('');
      await expect(panel.getByText(/In your reflection below/)).toBeVisible();
      // The one job that closes the most gaps.
      await expect(panel.getByTestId('assist-next-job')).toBeVisible();
      await expect(
        panel.getByTestId('assist-next-job').getByText(/covers \d+ of your \d+ open criteria/)
      ).toBeVisible();

      // Suggested chips: nothing is claimed until tapped.
      const chips = panel.getByTestId('assist-criterion');
      const n = await chips.count();
      for (let i = 0; i < n; i++)
        await expect(chips.nth(i)).toHaveAttribute('aria-pressed', 'false');
      if (n > 0) {
        await chips.first().click();
        await expect(chips.first()).toHaveAttribute('aria-pressed', 'true');
        await expect(chips.first().getByText('Claimed by you')).toBeVisible();
      }
      await panel.scrollIntoViewIfNeeded();
      await shot(page, 'c54-assistant', phone);
      expect(errors, errors.join('\n')).toEqual([]);
    } finally {
      await context.close();
      // Remove the photo this run uploaded.
      if (uploaded.size) await l.db.storage.from('portfolio-evidence').remove(Array.from(uploaded));
      // Nothing was saved: no row from the capture sheet (it always records a
      // source) since this test began. Other journeys may write in parallel.
      const { data: made } = await l.db
        .from('portfolio_items')
        .select('id')
        .eq('user_id', l.userId)
        .gte('created_at', started)
        .not('source', 'is', null);
      expect(made ?? []).toEqual([]);
    }
  });
}
