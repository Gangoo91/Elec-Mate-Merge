/**
 * ELE-1887 / ELE-1890 — register offline outbox + taught per learner + quiz offer.
 *   node scripts/college-demo/register-offline-flow.mjs <outDir> [step]
 * steps: deliver | register | learner | all (default)
 * Uses the fixture tutor/learner under e2e/.auth/. Never prints passwords.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const [outDir, step = 'all'] = process.argv.slice(2);
const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const BASE = 'http://localhost:8080';
const LESSON = '4a9b3ad6-c6bd-465e-b963-987e728a0074';
fs.mkdirSync(outDir, { recursive: true });

async function signIn(fixturePath) {
  const fx = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const sb = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
  const { data, error } = await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
  if (error) throw new Error('sign-in failed: ' + error.message);
  return { sb, session: data.session };
}

async function open(browser, session, mode) {
  const context = await browser.newContext(
    mode === 'phone' ? { ...devices['iPhone 14'], locale: 'en-GB' } : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
  );
  await context.addInitScript(([k, v]) => {
    try { if (!window.localStorage.getItem(k)) window.localStorage.setItem(k, v); } catch {}
  }, ['sb-jtwygbeceundfgnkirof-auth-token', JSON.stringify(session)]);
  await context.addCookies([]);
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('[pageerror] ' + String(e).slice(0, 300)));
  return { context, page, errors };
}
async function dismissCookies(page) {
  const b = page.getByRole('button', { name: 'Essential only' });
  if (await b.count()) await b.first().click().catch(() => {});
}
const shot = (page, name) => page.screenshot({ path: path.join(outDir, name + '.png'), fullPage: false });
const log = (...a) => console.log(...a);

const browser = await chromium.launch();
const tutor = await signIn('e2e/.auth/college-demo-tutor.json');

if (step === 'deliver' || step === 'all') {
  const { page, errors } = await open(browser, tutor.session, 'desktop');
  await page.goto(BASE + '/college', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  const btn = page.getByRole('button', { name: 'Open lesson' }).first();
  log('open lesson buttons:', await page.getByRole('button', { name: 'Open lesson' }).count());
  if (await btn.count()) {
    await btn.click();
    await page.waitForTimeout(3500);
    log('after Open lesson url=', page.url());
    await shot(page, 'deliver_1_after_open');
    const del = page.getByRole('button', { name: /Deliver/ }).first();
    log('deliver buttons:', await page.getByRole('button', { name: /Deliver/ }).count());
    if (await del.count()) {
      await del.click();
      await page.waitForTimeout(3000);
      log('after Deliver url=', page.url());
      log('text:', (await page.locator('body').innerText()).slice(0, 400).replace(/\n/g, ' | '));
      await shot(page, 'deliver_2_deliver');
    }
  }
  await page.goto(BASE + '/college/lessons/' + LESSON + '/deliver', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(3000);
  await dismissCookies(page);
  log('deliver direct text:', (await page.locator('body').innerText()).slice(0, 500).replace(/\n/g, ' | '));
  await shot(page, 'deliver_3_direct');
  await page.goto(BASE + '/college/lessons/6173460b-c491-41d7-9f1a-7a68f5ae9ba5/deliver', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(3000);
  log('deliver content lesson text:', (await page.locator('body').innerText()).slice(0, 300).replace(/\n/g, ' | '));
  await shot(page, 'deliver_4_content_lesson');
  log('deliver console errors:', errors.length, errors.slice(0, 5));
}

if (step === 'register' || step === 'all') {
  const { context, page, errors } = await open(browser, tutor.session, 'phone');
  await page.goto(BASE + '/college/lessons/' + LESSON, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await dismissCookies(page);
  await page.getByRole('button', { name: /^Register/ }).first().click();
  await page.waitForTimeout(3000);
  log('session chip morning checked:', await page.getByRole('radio', { name: 'Morning' }).getAttribute('aria-checked'));
  await shot(page, 'register_1_open_online');
  // Go offline and mark two learners.
  await context.setOffline(true);
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));
  await page.getByRole('button', { name: 'Ethan Brooks (fixture): Present' }).click();
  await page.getByRole('button', { name: 'Mason Wright (fixture): Absent' }).click();
  await page.waitForTimeout(1500);
  const banner = await page.getByRole('status').first().innerText().catch(() => '');
  log('offline banner:', banner.replace(/\n/g, ' '));
  const box = await page.evaluate(() => localStorage.getItem('college-register-outbox:v1'));
  log('outbox entries while offline:', JSON.parse(box || '[]').map((e) => `${e.student_id.slice(-2)}:${e.status}`));
  await shot(page, 'register_2_offline_marked');
  // Back online: the outbox sends.
  await context.setOffline(false);
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await page.waitForTimeout(5000);
  const box2 = await page.evaluate(() => localStorage.getItem('college-register-outbox:v1'));
  log('outbox after online:', box2);
  const { data: rows } = await tutor.sb.from('college_attendance').select('student_id, status, session, lesson_plan_id').eq('date', new Date().toISOString().slice(0, 10)).in('student_id', ['fc000000-1852-4000-8005-000000000015', 'fc000000-1852-4000-8005-000000000013']);
  log('server rows after sync:', rows);
  await shot(page, 'register_3_synced');

  // Network dropped (server unreachable) + page reload: the mark must survive and sync later.
  await page.route('**/rest/v1/**', (r) => r.abort());
  await page.getByRole('button', { name: 'Zara Hussain (fixture): Late' }).click();
  await page.waitForTimeout(1500);
  await page.unroute('**/rest/v1/**');
  await page.route('**/rest/v1/college_attendance**', (r) => r.abort());
  await page.reload({ waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2500);
  const box3 = await page.evaluate(() => localStorage.getItem('college-register-outbox:v1'));
  log('outbox after reload while blocked:', JSON.parse(box3 || '[]').map((e) => `${e.student_id.slice(-2)}:${e.status} attempts=${e.attempts}`));
  await page.unroute('**/rest/v1/college_attendance**');
  await page.goto(BASE + '/college/lessons/' + LESSON, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(4000);
  const box4 = await page.evaluate(() => localStorage.getItem('college-register-outbox:v1'));
  log('outbox after reopening app:', box4);
  // Everyone else here -> quiz offer.
  await page.getByRole('button', { name: /^Register/ }).first().click();
  await page.waitForTimeout(3000);
  const ev = page.getByRole('button', { name: 'Everyone else here' });
  if (await ev.count()) await ev.click();
  await page.waitForTimeout(3000);
  log('quiz offer:', (await page.getByText(/Set the lesson's quiz|Quiz set for this lesson/).count()) > 0);
  await shot(page, 'register_4_quiz_offer');
  const setQ = page.getByRole('button', { name: 'Set the quiz' });
  if (await setQ.count()) {
    await setQ.click();
    await page.waitForTimeout(2500);
    const { data: qz } = await tutor.sb.from('tutor_quizzes').select('is_published, cohort_id').eq('lesson_plan_id', LESSON);
    log('quiz after Set:', qz);
    await shot(page, 'register_4b_quiz_set');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const { data: taught } = await tutor.sb.from('college_learner_taught').select('student_id, taught_on').eq('lesson_plan_id', LESSON);
  log('taught rows:', taught?.length, taught?.map((t) => t.student_id.slice(-2)).join(','));
  const { data: del } = await tutor.sb.from('college_lesson_deliveries').select('delivered_on, ac_codes').eq('lesson_plan_id', LESSON);
  log('deliveries:', del);
  log('register console errors:', errors.length, errors.slice(0, 8));
  await context.close();

  // Desktop register screenshot
  const d = await open(browser, tutor.session, 'desktop');
  await d.page.goto(BASE + '/college/lessons/' + LESSON, { waitUntil: 'networkidle' }).catch(() => {});
  await d.page.waitForTimeout(3000);
  await dismissCookies(d.page);
  await d.page.getByRole('button', { name: /^Register/ }).first().click();
  await d.page.waitForTimeout(3000);
  await shot(d.page, 'register_5_desktop');
  log('desktop console errors:', d.errors.length, d.errors.slice(0, 5));
  await d.context.close();
}

if (step === 'learner' || step === 'all') {
  const learner = await signIn('e2e/.auth/college-demo-learner.json');
  for (const mode of ['phone', 'desktop']) {
    const { page, errors } = await open(browser, learner.session, mode);
    await page.goto(BASE + '/apprentice/college/today', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(3500);
    await dismissCookies(page);
    const card = page.getByText('Taught in class').first();
    if (await card.count()) await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const sec = page.locator('section', { hasText: 'Taught in class' }).first();
    if (await sec.count()) await sec.screenshot({ path: path.join(outDir, `learner_${mode}_card.png`) });
    await page.screenshot({ path: path.join(outDir, `learner_${mode}.png`), fullPage: false });
    log(mode, 'learner taught card:', await card.count(), 'errors:', errors.length, errors.slice(0, 5));
  }
}
await browser.close();
