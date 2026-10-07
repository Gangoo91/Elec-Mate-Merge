/**
 * ELE-1873 / ELE-1891 walkthrough on a phone (390) or desktop (1440):
 *   tutor  : bottom nav → Act → Observe → learner → narrative → criteria → photo → Send
 *   learner: the alert → evidence detail → Acknowledge (with a comment)
 *   tutor  : the alert's link → Assess (criteria ticked) → Record passed (method Observed)
 *
 *   node scripts/college-demo/observation-flow.mjs <outDir> phone|desktop
 *
 * Fixture accounts only (e2e/.auth/college-demo-*.json). Prints the ids it
 * made so the caller can clean up.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';

const [outDir, mode = 'phone'] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const URL_ = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON = fs.readFileSync('scripts/college-demo/shoot.mjs', 'utf8').match(/'(eyJ[^']+)'/)[1];
const BASE = 'http://localhost:8080';

async function session(fixture) {
  const fx = JSON.parse(fs.readFileSync(fixture, 'utf8'));
  const sb = createClient(URL_, ANON, { auth: { persistSession: false } });
  const { data, error } = await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
  if (error) throw error;
  return { sb, session: data.session };
}

const browser = await chromium.launch();
async function ctxFor(sess) {
  const ctx = await browser.newContext(
    mode === 'phone' ? { ...devices['iPhone 14'], locale: 'en-GB' } : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
  );
  await ctx.addInitScript(([k, v]) => {
    try {
      if (!localStorage.getItem(k)) localStorage.setItem(k, v);
      localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() }));
    } catch {}
  }, ['sb-jtwygbeceundfgnkirof-auth-token', JSON.stringify(sess.session)]);
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(`[pageerror] ${String(e).slice(0, 200)}`));
  page.on('console', (m) => m.type() === 'error' && errs.push(`[console] ${m.text().slice(0, 200)}`));
  return { ctx, page, errs };
}
const shot = (page, name) => page.screenshot({ path: `${outDir}/${mode}_${name}.png` });
const wait = (page, ms = 800) => page.waitForTimeout(ms);
async function go(page, url, settle = 3000) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(settle);
  await page.getByRole('button', { name: 'Essential only' }).click({ timeout: 2500 }).catch(() => {});
  await page.waitForTimeout(400);
}

const tutor = await session('e2e/.auth/college-demo-tutor.json');
const learner = await session('e2e/.auth/college-demo-learner.json');
const out = {};

// ── 1. Tutor records ───────────────────────────────────────────────────────
{
  const { page, errs } = await ctxFor(tutor);
  await go(page, `${BASE}/college`);
  await shot(page, '01_dashboard');
  if (mode === 'phone') {
    await page.getByRole('button', { name: /^Act:/ }).click();
    await wait(page);
    await shot(page, '02_act_sheet');
    await page.getByRole('button', { name: /^Observe/ }).click();
  } else {
    // Desktop: the masthead's Act button.
    await page.getByRole('button', { name: 'Act', exact: true }).click();
    await wait(page);
    await shot(page, '02_act_sheet');
    await page.getByRole('button', { name: /^Observe/ }).click();
  }
  await wait(page, 1200);
  {
    await shot(page, '03_pick_learner');
    await page.getByPlaceholder('Search learners or cohorts').fill('Demo Learner');
    await wait(page, 500);
    await page.getByRole('button', { name: /Demo Learner/ }).first().click();
    await wait(page, 1500);
  }
  await page.locator('#ro-title').fill('Wired and tested a ring final circuit');
  await page.locator('#ro-summary').fill(
    'Isolated and proved dead before starting. Terminated the ring at the board, checked end-to-end continuity of line, neutral and cpc, then cross-connected and took R1+R2 at each socket. Explained each reading as he went.'
  );
  await page.getByRole('button', { name: '45', exact: true }).click();
  await wait(page, 300);
  await shot(page, '04_record_top');
  // Criteria: open the first unit, tick two.
  await page.getByLabel('Search criteria').fill('');
  const unit = page.getByRole('dialog').locator('button[aria-expanded]').first();
  await unit.scrollIntoViewIfNeeded();
  await unit.click();
  await wait(page, 500);
  const boxes = page.getByRole('checkbox');
  await boxes.nth(0).click();
  await boxes.nth(1).click();
  await wait(page, 400);
  await shot(page, '05_criteria');
  // Photo through the real upload path.
  await page.locator('input[type=file][accept="image/*"]').setInputFiles('public/images/site-photos/site-testing.jpg');
  await page.waitForSelector('img[alt="site-testing.jpg"]', { timeout: 30000 }).catch(() => {});
  await wait(page, 800);
  await page.locator('#ro-strengths').fill('Safe isolation done properly and in the right order.');
  await page.locator('#ro-actions').fill('Label the board\nRe-read Regulation 643.2.1');
  await page.locator('#ro-actions').scrollIntoViewIfNeeded();
  await wait(page, 2800); // let the draft autosave
  await shot(page, '06_evidence_outcome');
  await page.getByRole('button', { name: /^Send to / }).click();
  await page.getByText(/^Sent to /).first().waitFor({ timeout: 20000 });
  await wait(page, 600);
  await shot(page, '07_sent');
  out.tutorErrors1 = errs.slice();
}

// Find what was made.
const { data: obs } = await tutor.sb
  .from('college_observations')
  .select('id, portfolio_item_id, sent_at, criteria, media, content_hash')
  .eq('created_by', tutor.session.user.id)
  .order('created_at', { ascending: false })
  .limit(1)
  .single();
out.observation = obs;

// ── 2. Learner gets the alert and acknowledges ─────────────────────────────
{
  const { data: notes } = await learner.sb
    .from('user_notifications')
    .select('id, title, message, link, created_at')
    .eq('type', 'observation_recorded')
    .order('created_at', { ascending: false })
    .limit(1);
  out.learnerAlert = notes?.[0] ?? null;
  const { page, errs } = await ctxFor(learner);
  await go(page, `${BASE}/apprentice/college/today`, 3500);
  await shot(page, '08_learner_today');
  await go(page, `${BASE}${out.learnerAlert?.link ?? `/apprentice/hub?item=${obs.portfolio_item_id}`}`, 4000);
  await shot(page, '09_learner_detail');
  await page.locator('#obs-ack-comment').fill('Thanks, I will label the board next time.');
  await page.getByRole('button', { name: 'Acknowledge', exact: true }).first().click();
  await wait(page, 2500);
  await shot(page, '10_learner_acknowledged');
  out.learnerErrors = errs.slice();
}

// ── 3. Tutor gets the alert and decides ────────────────────────────────────
{
  const { data: notes } = await tutor.sb
    .from('user_notifications')
    .select('id, title, message, link')
    .eq('type', 'observation_acknowledged')
    .order('created_at', { ascending: false })
    .limit(1);
  out.tutorAlert = notes?.[0] ?? null;
  const { page, errs } = await ctxFor(tutor);
  await go(page, `${BASE}${out.tutorAlert?.link}`, 5000);
  await shot(page, '11_tutor_assess_focus');
  await page.getByRole('button', { name: /Record decision for/ }).click();
  await wait(page, 1000);
  await shot(page, '12_decision_sheet');
  await page.locator('[role=dialog] .overflow-y-auto').first().evaluate((el) => el.scrollTo(0, el.scrollHeight)).catch(() => {});
  await wait(page, 300);
  await shot(page, '13_decision_sheet_bottom');
  await page.getByRole('button', { name: /^Record passed/ }).click();
  await wait(page, 2500);
  await shot(page, '14_decided');
  // Observations section shows the state.
  await page.locator('text=Observations').first().scrollIntoViewIfNeeded().catch(() => {});
  await wait(page, 800);
  await shot(page, '15_observations_section');
  out.tutorErrors2 = errs.slice();
}

const { data: decisions } = await tutor.sb
  .from('portfolio_assessment_decisions')
  .select('id, unit_code, ac_code, decision, method, evidence_item_ids, superseded_at')
  .eq('learner_id', learner.session.user.id)
  .contains('evidence_item_ids', [obs.portfolio_item_id]);
out.decisions = decisions;
console.log(JSON.stringify(out, null, 2));
await browser.close();
