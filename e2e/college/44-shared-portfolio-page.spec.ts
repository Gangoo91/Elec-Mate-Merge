/**
 * Journey 44 — the shared portfolio page on the landing design (ELE-2016).
 *
 * The fixture learner makes a share link (a portfolio_shares row, as the app
 * makes it). A signed-out visitor opens /view/<token> at desktop 1440 and
 * phone 390 and the page must:
 *   · lead with the learner, qualification and college
 *   · show three figures that match the sources of truth, read independently:
 *     criteria passed (get_portfolio_ac_state), evidence items, verified hours
 *     (get_otj_summary)
 *   · list units and criteria in LearnerAssessmentView's states, with no AI
 *     suggestion shown as a claim
 *   · label feedback advisory and offer "Become their assessor": the request
 *     reaches the learner (a portfolio_assessor_requests row + notification)
 *   · follow the house rules: no horizontal scroll on the phone, no text under
 *     11px, no translucent yellow fills
 *
 * Cleanup by id: the share (its views cascade), the request, the learner's
 * notification, and the share's audit events (replica mode, test rows only).
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, lit, RUN, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot clean up');
test.describe.configure({ mode: 'serial' });

const SHOTS = process.env.W2_SHOTS;
const token = `e2e${Date.now().toString(36)}SharePage44`;
let shareId = '';

async function shot(page: Page, name: string) {
  if (!SHOTS) return;
  fs.mkdirSync(SHOTS, { recursive: true });
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

/** House rules a reviewer can see: overflow, tiny text, brown (translucent yellow) fills. */
async function houseRules(page: Page, phone: boolean) {
  const r = await page.evaluate(() => {
    const tiny: string[] = [];
    const brown: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('main *, body *'))) {
      const cs = getComputedStyle(el);
      if (el.offsetParent === null && cs.position !== 'fixed') continue;
      const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim());
      if (own && parseFloat(cs.fontSize) < 11)
        tiny.push(`${el.tagName} ${cs.fontSize} ${el.textContent!.trim().slice(0, 30)}`);
      const m = cs.backgroundColor.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);
      if (m) {
        const [rr, gg, bb, a] = [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
        // elec-yellow family (high red + green, low blue) at partial opacity
        if (a > 0 && a < 0.9 && rr > 200 && gg > 150 && bb < 120)
          brown.push(`${el.tagName}.${el.className}`.slice(0, 80));
      }
    }
    return { overflow: document.documentElement.scrollWidth - window.innerWidth, tiny, brown };
  });
  if (phone) expect(r.overflow, 'no horizontal scroll on the phone').toBeLessThanOrEqual(1);
  expect(r.tiny, 'no text under 11px').toEqual([]);
  expect(r.brown, 'no translucent yellow fills').toEqual([]);
}

test.beforeAll(async () => {
  const l = await actor('learner');
  const { data, error } = await l.db
    .from('portfolio_shares')
    .insert({
      user_id: l.userId,
      token,
      title: `${RUN} share page`,
      expires_at: new Date(Date.now() + 86_400_000).toISOString(),
    })
    .select('id')
    .single();
  if (error || !data) throw new Error(`Could not make the share: ${error?.message}`);
  shareId = (data as { id: string }).id;
});

test.afterAll(async () => {
  if (!shareId) return;
  const l = await actor('learner');
  admin(`
    delete from public.portfolio_assessor_requests where share_id = ${lit(shareId)};
    delete from public.user_notifications where user_id = ${lit(l.userId)} and type = 'assessor_request' and created_at > now() - interval '30 minutes' and title like '%(fixture)%';
    delete from public.portfolio_shares where id = ${lit(shareId)};
    set session_replication_role = replica;
    delete from public.portfolio_audit_events where object_id = ${lit(shareId)};
    set session_replication_role = origin;
  `);
  const left = admin<{ n: number }>(
    `select (select count(*) from public.portfolio_shares where id = ${lit(shareId)}) + (select count(*) from public.portfolio_audit_events where object_id = ${lit(shareId)}) as n`
  );
  expect(Number(left[0]?.n ?? 0), 'everything this test made is gone').toBe(0);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`shared portfolio page (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const l = await actor('learner');
    const t = await actor('tutor');

    // Sources of truth, read as the tutor (not from the share RPC).
    const acs = await t.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
    expect(acs.error).toBeNull();
    const rows = (acs.data ?? []) as { state: string; unit_code: string }[];
    const passed = rows.filter((r) => r.state === 'passed' || r.state === 'iqa_confirmed').length;
    const suggestedOnly = rows.filter((r) => r.state === 'suggested').length;
    const otj = await t.db.rpc('get_otj_summary', { p_user: l.userId });
    expect(otj.error).toBeNull();
    const verified = (otj.data as { verified_hours: number }).verified_hours;
    const { count: items } = await l.db
      .from('portfolio_items')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', l.userId);

    const context = await browser.newContext(
      phone
        ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'en-GB' }
        : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
    );
    await context.addInitScript(() => {
      try {
        localStorage.setItem(
          'elec-mate-cookie-consent',
          JSON.stringify({
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: Date.now(),
          })
        );
      } catch {
        /* blocked */
      }
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
    await page.goto(`/view/${token}`);

    // Who
    await expect(
      page.getByRole('heading', { level: 1, name: 'Demo Learner (fixture)' })
    ).toBeVisible({ timeout: 45_000 });
    await expect(page.getByText(/Northgate Technical College/).first()).toBeVisible();

    // Three figures
    await expect(page.getByText('criteria passed by the assessor')).toBeVisible();
    const figures = await page.locator('main').innerText();
    expect(figures, 'criteria passed matches get_portfolio_ac_state').toMatch(
      new RegExp(`${passed}\\s*/\\s*${rows.length}`)
    );
    expect(figures).toMatch(new RegExp(`${items}\\s*\\n?\\s*pieces? of evidence shared`));
    expect(figures, 'verified hours match get_otj_summary').toMatch(new RegExp(`${verified}\\s*/`));
    await expect(page.getByText('verified off-the-job hours').first()).toBeVisible();

    // Units in LearnerAssessmentView's states; an AI suggestion is never a claim.
    await expect(page.getByRole('heading', { name: 'Progress by unit' })).toBeVisible();
    await expect(page.getByLabel('Key')).toContainText('Not started');
    await expect(page.getByLabel('Key')).not.toContainText('Suggested');
    if (suggestedOnly > 0) {
      await expect(page.getByLabel('Key')).toContainText('Not started');
    }

    // Assessment record with provenance
    await expect(page.getByRole('heading', { name: 'Assessment record' })).toBeVisible();
    await expect(page.getByText(/at Northgate Technical College, /).first()).toBeVisible();

    // Advisory + become their assessor
    await expect(page.getByText('Advisory only')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Become their assessor' })).toBeVisible();
    await houseRules(page, phone);
    await shot(page, `44-share-${viewport}`);

    if (!phone) {
      await page.getByLabel('Your name').fill('Pat Reviewer (fixture)');
      await page.getByRole('button', { name: 'Ask to be their assessor' }).click();
      await page.getByLabel('Your email').fill('pat.reviewer.fixture@example.invalid');
      await page.getByRole('button', { name: 'End-point assessor' }).click();
      await page.getByRole('button', { name: 'Send my request' }).click();
      await expect(page.getByText(/Request sent\./)).toBeVisible();
      const req = admin<{ role: string; email: string }>(
        `select role, requester_email as email from public.portfolio_assessor_requests where share_id = ${lit(shareId)}`
      );
      expect(req).toEqual([
        { role: 'epa_assessor', email: 'pat.reviewer.fixture@example.invalid' },
      ]);
      const note = admin<{ link: string }>(
        `select link from public.user_notifications where user_id = ${lit(l.userId)} and type = 'assessor_request' and created_at > now() - interval '10 minutes' order by created_at desc limit 1`
      );
      expect(note[0]?.link).toMatch(/^\/apprentice\/college\/progress\?assessor_request=/);

      // The learner taps it: the invite sheet opens filled in with the reviewer.
      const learner = await signedInPage(browser, 'learner');
      await learner.page.goto(note[0]!.link);
      await expect(learner.page.getByRole('heading', { name: 'Invite an assessor' })).toBeVisible({
        timeout: 45_000,
      });
      await expect(learner.page.getByLabel('Their email')).toHaveValue(
        'pat.reviewer.fixture@example.invalid'
      );
      await expect(learner.page.getByLabel('Their name')).toHaveValue('Pat Reviewer (fixture)');
      await expect(
        learner.page.getByRole('button', { name: 'End-point assessor' })
      ).toHaveAttribute('aria-pressed', 'true');
      await shot(learner.page, '44-learner-request-sheet');
      await learner.context.close();
    }

    expect(errors).toEqual([]);
    await context.close();
  });
}
