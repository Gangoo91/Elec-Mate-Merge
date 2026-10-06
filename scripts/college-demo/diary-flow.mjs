/**
 * Site diary end-to-end as the FICTIONAL fixture learner (6 Oct 2026).
 *
 *   node scripts/college-demo/diary-flow.mjs <phase> <outDir> [photo.jpg]
 *   phase: create | edit | mark | delete | desktop
 *
 * create — log today at "Fixture Test Site" with a task, a learned line, a
 *          photo (Library input), 1h training and "share with my college"
 *          (NO question — a shared question bells the cohort tutor, who is a
 *          real account). Screens: page, sheet, after-save.
 * edit   — open the entry, edit the learned line, save.
 * mark   — mark yesterday (or the last gap weekday) as a College day.
 * delete — open the entry, delete it.
 * desktop— full-page shot of the diary at 1440.
 * evidence — open the entry, run "Check how this works as evidence" (AI).
 * reflect  — "Reflect on the week" (AI), wait for it.
 * portfolio— open the entry, Add to my portfolio → add (claim or not).
 * locked   — after the tutor signs it off: open, Edit, look at training,
 *            change the learned line, save.
 * rejected — after the tutor returns it: shot the page (Needs you), open,
 *            Edit, training 2h, save (resubmits).
 * browse   — search "fixture", then the calendar view.
 * tutor-verify / tutor-reject — as the fixture TUTOR on the learner's
 *            Student 360: Verify hours / Return with a reason.
 *
 * Signs in like shoot.mjs; never prints the password. Verify each phase with
 * SQL before running the next.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const [phase, outDir, photo] = process.argv.slice(2);
const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const BASE = 'http://localhost:8080';
const asTutor = phase.startsWith('tutor-');
const fixture = JSON.parse(
  fs.readFileSync(`e2e/.auth/college-demo-${asTutor ? 'tutor' : 'learner'}.json`, 'utf8')
);
const STUDENT_360 = '/college?section=student360&studentId=3d756aaf-c37d-4aa8-bd24-8ced1b0b766f';

const sb = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
const { data, error } = await sb.auth.signInWithPassword({
  email: fixture.email,
  password: fixture.password,
});
if (error || !data.session) {
  console.error('sign-in failed:', error?.message);
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext(
  phase === 'desktop' || phase === 'desktop-sheets'
    ? { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
    : { ...devices['iPhone 14'], locale: 'en-GB' }
);
await context.addInitScript(
  ([k, v]) => {
    try {
      if (!window.localStorage.getItem(k)) window.localStorage.setItem(k, v);
    } catch {}
  },
  ['sb-jtwygbeceundfgnkirof-auth-token', JSON.stringify(data.session)]
);
const page = await context.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 300)));
page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
const shot = async (name, full = false) => {
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, `${phase}_${name}.png`), fullPage: full });
  console.log('shot', name);
};
const sheet = () => page.locator('[role="dialog"]').last();

await page.goto(BASE + (asTutor ? STUDENT_360 : '/apprentice/site-diary'), {
  waitUntil: 'networkidle',
  timeout: 60000,
});
await page.waitForTimeout(2500);

const openEntry = async () => {
  await page
    .getByRole('button', { name: /Fixture Test Site/ })
    .first()
    .click();
  await page.waitForTimeout(1200);
};

if (phase === 'create') {
  await shot('page', true);
  await page.getByRole('button', { name: 'Log today', exact: true }).first().click();
  await page.waitForTimeout(1200);
  const s = sheet();
  await s.getByPlaceholder(/site or job/i).fill('Fixture Test Site');
  await s
    .getByPlaceholder(/SWA gland/)
    .fill('How to prove dead with a two-pole tester before touching anything');
  await s.getByLabel('Add a task').fill('Second fix sockets');
  await s.getByLabel('Add a task').press('Enter');
  if (photo) {
    await s.locator('input[type="file"][multiple]').setInputFiles(photo);
    await page.waitForTimeout(4000);
  }
  await s.getByRole('button', { name: /Training time today/ }).click();
  await s.getByRole('button', { name: '1h', exact: true }).click();
  await s.getByRole('button', { name: /Question for your tutor/ }).click();
  await page.waitForTimeout(800);
  const share = s.getByRole('switch', { name: /Share this entry with my college/ });
  if (await share.count()) await share.click();
  else console.log('NOTE: share toggle not shown (college link not detected)');
  await shot('sheet_filled');
  await s.getByRole('button', { name: /Save entry/ }).click();
  await page.waitForTimeout(3500);
  await shot('after_save');
  await shot('after_save_full', true);
} else if (phase === 'edit') {
  await openEntry();
  await shot('detail');
  await sheet().getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(1200);
  await sheet()
    .getByPlaceholder(/SWA gland/)
    .fill('Prove dead with an approved two-pole tester, then prove the tester');
  // Share it (no question, so no tutor bell — the cohort tutor is a real account).
  await sheet()
    .getByRole('button', { name: /Question for your tutor/ })
    .click();
  await page.waitForTimeout(800);
  const share = sheet().getByRole('switch', { name: /Share this entry with my college/ });
  if ((await share.getAttribute('aria-checked')) !== 'true') await share.click();
  await sheet()
    .getByRole('button', { name: /Save changes/ })
    .click();
  await page.waitForTimeout(3000);
  await shot('after_edit', true);
} else if (phase === 'mark') {
  // First gap day in this week's strip.
  const gap = page.getByRole('button', { name: /nothing logged — add it/ }).first();
  if (!(await gap.count())) console.log('NOTE: no gap day this week');
  else {
    await gap.click();
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: 'College day' }).click();
    await page.waitForTimeout(2000);
  }
  // A day still to come can be marked ahead (a booked holiday) — not logged.
  const ahead = page.getByRole('button', { name: /to come — mark it/ }).first();
  if (await ahead.count()) {
    await ahead.click();
    await page.waitForTimeout(600);
    const canLog = await page.getByRole('button', { name: /^Log (this day|today)$/ }).count();
    console.log('future day offers Log:', canLog > 0);
    await page.getByRole('button', { name: 'Holiday' }).first().click();
    await page.waitForTimeout(2000);
  } else console.log('NOTE: no future weekday left this week');
  await shot('after_mark');
} else if (phase === 'delete') {
  await openEntry();
  await sheet().getByRole('button', { name: 'Delete this entry' }).click();
  await page.waitForTimeout(500);
  await sheet().getByRole('button', { name: 'Delete', exact: true }).click();
  await page.waitForTimeout(3000);
  await shot('after_delete', true);
} else if (phase === 'desktop') {
  await shot('page', true);
} else if (phase === 'evidence') {
  await openEntry();
  await sheet()
    .getByRole('button', { name: /Check how this works as evidence/ })
    .click();
  await page
    .getByText(/Strong evidence|Reasonable evidence|Weak evidence so far|Couldn/)
    .first()
    .waitFor({ timeout: 90000 })
    .catch(() => console.log('NOTE: evidence result not seen in 90s'));
  await shot('evidence');
} else if (phase === 'reflect') {
  await page
    .getByRole('button', { name: /Reflect on the week/ })
    .first()
    .click();
  await page
    .getByText(/Your week, reflected|Couldn’t write the reflection/)
    .first()
    .waitFor({ timeout: 120000 })
    .catch(() => console.log('NOTE: reflection not seen in 120s'));
  await shot('reflection', true);
} else if (phase === 'portfolio') {
  await openEntry();
  await sheet().getByRole('button', { name: 'Add to my portfolio' }).click();
  const add = sheet().getByRole('button', { name: /^Add and claim \d+|^Add without claiming/ });
  await add.first().waitFor({ timeout: 90000 });
  await page.waitForTimeout(1500);
  await shot('picker');
  await add.first().click();
  await page.waitForTimeout(3000);
  await shot('after_add');
} else if (phase === 'locked') {
  await openEntry();
  await shot('detail_signed_off');
  await sheet().getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(1200);
  await sheet()
    .getByRole('button', { name: /Training time today/ })
    .click();
  await page.waitForTimeout(500);
  await shot('edit_training_locked');
  await sheet()
    .getByPlaceholder(/SWA gland/)
    .fill('Signed-off day: changed only the learned line');
  await sheet()
    .getByRole('button', { name: /Save changes/ })
    .click();
  await page.waitForTimeout(3000);
  await shot('after_locked_save');
} else if (phase === 'rejected') {
  await shot('page_with_returned', true);
  await openEntry();
  await shot('detail_returned');
  await sheet().getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(1200);
  await sheet()
    .getByRole('button', { name: /Training time today/ })
    .click();
  await sheet().getByRole('button', { name: '2h', exact: true }).click();
  await shot('edit_returned');
  await sheet()
    .getByRole('button', { name: /Save changes/ })
    .click();
  await page.waitForTimeout(3000);
  await shot('after_resubmit');
} else if (phase === 'desktop-sheets') {
  await openEntry();
  await page.waitForTimeout(1500);
  await shot('detail');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Log today' }).first().click();
  await page.waitForTimeout(1500);
  await shot('entry_sheet');
} else if (phase === 'edit-mood') {
  // After a tutor returns training: change ONLY the mood. Must not resend.
  await openEntry();
  await shot('detail_returned');
  await sheet().getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(1200);
  await sheet().getByRole('button', { name: /How was today/ }).click();
  await sheet().getByRole('button', { name: 'Great day' }).click();
  await sheet().getByRole('button', { name: /Save changes/ }).click();
  await page.waitForTimeout(3000);
  await shot('after_mood_edit');
} else if (phase === 'browse') {
  await page.getByRole('button', { name: 'Search the diary' }).click();
  await page.getByLabel(/Search sites, tasks/).fill('fixture');
  await page.waitForTimeout(800);
  await shot('search');
  await page.getByRole('button', { name: 'Close search' }).click();
  await page.getByRole('button', { name: 'Show the calendar' }).click();
  await page.waitForTimeout(1000);
  await shot('calendar', true);
} else if (phase === 'tutor-verify' || phase === 'tutor-reject') {
  const card = page.locator('li', { hasText: 'Site diary — Fixture Test Site' }).filter({
    has: page.getByRole('button', { name: 'Verify hours' }),
  });
  await card.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await card.first().screenshot({ path: path.join(outDir, `${phase}_card.png`) });
  if (phase === 'tutor-verify') {
    await card.first().getByRole('button', { name: 'Verify hours' }).click();
  } else {
    await card.first().getByRole('button', { name: 'Return for more info' }).click();
    // The card loses its Verify button in return mode — find the box on the page.
    await page
      .getByPlaceholder(/What does the apprentice need/)
      .fill('Say which socket circuits you second-fixed and what you tested.');
    await page.getByRole('button', { name: 'Return to apprentice' }).click();
  }
  await page.waitForTimeout(3000);
  console.log('tutor action done');
}

fs.writeFileSync(path.join(outDir, `${phase}_console.txt`), errors.join('\n'));
console.log(`${phase}: ${errors.length} console errors`);
await browser.close();
