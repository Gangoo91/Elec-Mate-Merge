/**
 * Journey 68 — safeguarding records ready for inspection day one (ELE-2043).
 *
 * KCSIE 2026 para 74 (decisions and the reasons for them, in writing),
 * 78 (LADO), 150 (child protection file to the new setting within 5 days,
 * secure transit, confirmation of receipt), 151 (Channel), 218 (the DSL holds
 * the fact that a child has a social worker).
 *
 * Server (real RLS, real functions):
 *   - the tutor (not a lead, but the fixture learner's own tutor, who CAN read
 *     the concern note itself) and the learner read none of the decision,
 *     case or transfer records, and every write and the export refuse them.
 *   - the DSL (Priya Nair, fixture): a "referral made" decision without a date
 *     is refused; with a date it saves; an update supersedes it (history kept);
 *     the open-case flag saves; a file transfer for a learner who has left is
 *     recorded with a 5-day due date, then its receipt; the export holds all of it.
 * Browser as the DSL, desktop 1440 and phone 390: record a decision in the
 * sheet, see it on the concern card, record the file sent and the receipt in
 * Child protection files, open the inspection export.
 *
 * Fixture data only: one safeguarding note on the fixture learner, one leaver
 * roll row with one note, all marked with the run id and deleted by id.
 */
import { test, expect, type Browser } from '@playwright/test';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import {
  NORTHGATE,
  RUN,
  SUPABASE_URL,
  actor,
  admin,
  adminAvailable,
  haveCreds,
  learnerRoll,
  lit,
  londonDate,
} from './support';

const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const STORAGE_KEY = 'sb-jtwygbeceundfgnkirof-auth-token';
const SHOTS = process.env.SG_SHOTS;

function dslCreds(): { email: string; password: string } | null {
  const email = process.env.COLLEGE_E2E_IQA_EMAIL;
  const password = process.env.COLLEGE_E2E_IQA_PASSWORD;
  if (email && password) return { email, password };
  try {
    const j = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'e2e/.auth/college-demo-iqa.json'), 'utf8')
    ) as { email?: string; password?: string };
    if (j.email && j.password) return { email: j.email, password: j.password };
  } catch {
    /* none */
  }
  return null;
}

test.skip(!haveCreds() || !dslCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot clean up');
test.describe.configure({ mode: 'serial' });

let dsl: { db: SupabaseClient; session: unknown; userId: string };
let studentId = '';
let leaverId = '';
const notes: string[] = [];

async function signInDsl() {
  const c = dslCreds()!;
  const auth = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await auth.auth.signInWithPassword(c);
  if (error || !data.session) throw new Error(`DSL fixture could not sign in: ${error?.message}`);
  const db = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });
  return { db, session: data.session, userId: data.session.user.id };
}

async function dslPage(browser: Browser, phone: boolean) {
  const context = await browser.newContext(
    phone
      ? {
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
          locale: 'en-GB',
          timezoneId: 'Europe/London',
        }
      : { viewport: { width: 1440, height: 900 }, locale: 'en-GB', timezoneId: 'Europe/London' }
  );
  await context.addInitScript(
    ([k, v]) => {
      try {
        if (!window.localStorage.getItem(k)) window.localStorage.setItem(k, v);
        window.localStorage.setItem(
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
    },
    [STORAGE_KEY, JSON.stringify(dsl.session)] as const
  );
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
  return { context, page, errors };
}

function cleanup() {
  const studs = [studentId, leaverId].filter(Boolean).map(lit).join(',');
  const ns = notes.map(lit).join(',');
  if (!studs) return;
  admin(`
    delete from public.college_cp_file_transfers where student_id in (${studs});
    delete from public.college_safeguarding_learner_status where student_id in (${studs});
    delete from public.college_safeguarding_decisions where student_id in (${studs});
    ${ns ? `delete from public.college_activity where entity_id in (${ns});` : ''}
    delete from public.college_activity where college_id = ${lit(NORTHGATE)} and action like 'safeguarding.%'
      and (entity_id in (${studs}) or (entity_type = 'college' and actor_id = ${lit(dsl?.userId ?? '00000000-0000-0000-0000-000000000000')} and created_at > now() - interval '2 hours'));
    ${notes.length ? `delete from public.user_notifications where ${notes.map((n) => `metadata::text like ${lit(`%${n}%`)} or coalesce(link, '') like ${lit(`%${n}%`)}`).join(' or ')};` : ''}
    ${ns ? `delete from public.pastoral_notes where id in (${ns});` : ''}
    ${leaverId ? `delete from public.college_students where id = ${lit(leaverId)};` : ''}
  `);
}

test.beforeAll(async () => {
  dsl = await signInDsl();
  studentId = (await learnerRoll()).id;
  const t = await actor('tutor');
  const { data: me } = await t.db
    .from('college_staff')
    .select('id')
    .eq('user_id', t.userId)
    .maybeSingle();
  // A concern on the fixture learner, raised by the tutor as in the app.
  const { data: n, error } = await t.db
    .from('pastoral_notes')
    .insert({
      student_id: studentId,
      college_id: NORTHGATE,
      author_id: (me as { id: string }).id,
      kind: 'safeguarding',
      visibility: 'safeguarding',
      title: `${RUN} concern`,
      body: `${RUN} The learner said something on site that worried me (fixture).`,
    } as never)
    .select('id')
    .single();
  if (error) throw error;
  notes.push((n as { id: string }).id);

  // A learner who left two days ago with a safeguarding record.
  const rows = admin<{ id: string }>(`
    insert into public.college_students (name, email, college_id, status, learning_actual_end_date, date_of_birth)
    values (${lit(`${RUN} Leaver (fixture)`)}, ${lit(`e2e-leaver-${Date.now()}@example.invalid`)}, ${lit(NORTHGATE)},
            'Transferred', ${lit(londonDate(-2))}, '2009-03-01')
    returning id`);
  leaverId = rows[0].id;
  const nr = admin<{ id: string }>(`
    insert into public.pastoral_notes (student_id, college_id, kind, visibility, title, body)
    values (${lit(leaverId)}, ${lit(NORTHGATE)}, 'safeguarding', 'safeguarding', ${lit(`${RUN} leaver concern`)}, ${lit(`${RUN} earlier concern (fixture)`)})
    returning id`);
  notes.push(nr[0].id);
});

test.afterAll(() => {
  cleanup();
  const studs = [studentId, leaverId].filter(Boolean).map(lit).join(',');
  const left = admin<{ n: number }>(`
    select (select count(*) from public.college_safeguarding_decisions where student_id in (${studs}))
         + (select count(*) from public.college_safeguarding_learner_status where student_id in (${studs}))
         + (select count(*) from public.college_cp_file_transfers where student_id in (${studs}))
         + (select count(*) from public.pastoral_notes where id in (${notes.map(lit).join(',')}))
         + (select count(*) from public.college_students where id = ${lit(leaverId || '00000000-0000-0000-0000-000000000000')}) as n`);
  expect(Number(left[0]?.n ?? 0), 'everything this test made is gone').toBe(0);
});

test('server: only leads read or write decisions, cases and transfers', async () => {
  const t = await actor('tutor');
  const l = await actor('learner');
  const [noteId] = notes;

  // The tutor is the learner's own tutor: they can read the note itself.
  const { data: tNote } = await t.db.from('pastoral_notes').select('id').eq('id', noteId);
  const tutorReadsNote = (tNote ?? []).length === 1;

  for (const who of [t, l]) {
    const save = await who.db.rpc('save_safeguarding_decision', {
      p_note_id: noteId,
      p_decision: 'monitor',
      p_rationale: 'Should never be saved by a non-lead.',
    } as never);
    expect(save.error, `${who.who} cannot save a decision`).not.toBeNull();
    const status = await who.db.rpc('set_safeguarding_learner_status', {
      p_student: studentId,
      p_open: true,
      p_case_type: 'child_in_need',
      p_local_authority: 'Nowhere',
    } as never);
    expect(status.error, `${who.who} cannot set the case flag`).not.toBeNull();
    const exp = await who.db.rpc('get_safeguarding_inspection_export', {
      p_college: NORTHGATE,
    } as never);
    expect(exp.error, `${who.who} cannot export`).not.toBeNull();
    const list = await who.db.rpc('list_cp_file_transfers', { p_college: NORTHGATE } as never);
    expect(list.error, `${who.who} cannot list transfers`).not.toBeNull();
  }

  // Lead: referral decision needs a date.
  const bad = await dsl.db.rpc('save_safeguarding_decision', {
    p_note_id: noteId,
    p_decision: 'referral_made',
    p_rationale: 'Referred because the learner is under 18 and at risk.',
  } as never);
  expect(bad.error?.message).toMatch(/date of the referral/);

  const first = await dsl.db.rpc('save_safeguarding_decision', {
    p_note_id: noteId,
    p_decision: 'monitor',
    p_rationale: 'Spoke with the learner; monitor weekly with the tutor (fixture).',
  } as never);
  expect(first.error).toBeNull();
  const second = await dsl.db.rpc('save_safeguarding_decision', {
    p_note_id: noteId,
    p_decision: 'referral_made',
    p_rationale: 'New disclosure; referred to children’s social care (fixture).',
    p_la_referral_on: londonDate(0),
    p_la_name: 'Fixture County Council',
    p_la_reference: 'FX-001',
  } as never);
  expect(second.error).toBeNull();
  const { data: rows } = await dsl.db
    .from('college_safeguarding_decisions')
    .select('decision, superseded_at')
    .eq('note_id', noteId);
  const r = (rows ?? []) as Array<{ decision: string; superseded_at: string | null }>;
  expect(r.length, 'the earlier decision is kept').toBe(2);
  expect(r.filter((x) => !x.superseded_at).map((x) => x.decision)).toEqual(['referral_made']);

  const st = await dsl.db.rpc('set_safeguarding_learner_status', {
    p_student: studentId,
    p_open: true,
    p_case_type: 'child_in_need',
    p_local_authority: 'Fixture County Council',
    p_social_worker: 'A. Worker (fixture)',
  } as never);
  expect(st.error).toBeNull();

  // Neither the tutor nor the learner can read any of it back.
  for (const who of [t, l]) {
    const a = await who.db
      .from('college_safeguarding_decisions')
      .select('id')
      .eq('note_id', noteId);
    const b = await who.db
      .from('college_safeguarding_learner_status')
      .select('student_id')
      .eq('student_id', studentId);
    expect((a.data ?? []).length, `${who.who} reads no decisions`).toBe(0);
    expect((b.data ?? []).length, `${who.who} reads no case flag`).toBe(0);
  }

  // The leaver: due within 5 days of leaving, then sent, then receipt.
  const list = await dsl.db.rpc('list_cp_file_transfers', { p_college: NORTHGATE } as never);
  expect(list.error).toBeNull();
  const out = (
    list.data as { outgoing: Array<{ student_id: string; due_by: string; transfer: unknown }> }
  ).outgoing;
  const mine = out.find((o) => o.student_id === leaverId);
  expect(mine, 'the leaver is listed').toBeTruthy();
  expect(mine!.due_by).toBe(londonDate(3));
  expect(mine!.transfer).toBeNull();

  for (const who of [t, l]) {
    const s = await who.db.rpc('record_cp_file_sent', {
      p_student: leaverId,
      p_to_provider: 'Nowhere College',
      p_method: 'secure_email',
    } as never);
    expect(s.error, `${who.who} cannot record a transfer`).not.toBeNull();
  }

  expect(tutorReadsNote, 'own tutor read of the note itself is unchanged').toBe(true);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`DSL records the decision, the file transfer and receipt, and exports (${viewport})`, async ({
    browser,
  }) => {
    const phone = viewport === 'phone';
    if (phone) {
      // Phone run starts from a clean transfer so the flow can be walked again.
      admin(`delete from public.college_cp_file_transfers where student_id = ${lit(leaverId)}`);
    }
    const { context, page, errors } = await dslPage(browser, phone);
    try {
      await page.goto('/college?section=safeguardingqueue', { waitUntil: 'domcontentloaded' });
      const card = page.locator(`#concern-${notes[0]}`);
      await expect(card).toBeVisible({ timeout: 60_000 });
      await card.scrollIntoViewIfNeeded();

      // Record (update) the decision through the sheet.
      await card.getByRole('button', { name: /decision/i }).click();
      const sheet = page.getByRole('dialog');
      await expect(sheet.getByText(/the decision/i).first()).toBeVisible();
      await sheet
        .getByRole('radiogroup', { name: 'Decision' })
        .getByRole('radio', { name: 'Early help' })
        .click();
      const why = `${RUN} ${viewport}: early help offered after a review with the learner (fixture).`;
      await sheet.locator('#sg-rationale').fill(why);
      await sheet.getByRole('button', { name: 'Save decision' }).click();
      await expect(sheet).toBeHidden();
      const block = page.getByTestId(`sg-decision-${notes[0]}`);
      await expect(block).toContainText('Decision: Early help');
      await expect(block).toContainText(why);
      await expect(card.getByText(/Social worker · Child in need/)).toBeVisible();
      if (SHOTS)
        await page.screenshot({ path: `${SHOTS}/68-${viewport}-decision.png`, fullPage: false });

      // Child protection files: the leaver, sent, then receipt.
      const cp = page.getByTestId('cp-transfers');
      await cp.scrollIntoViewIfNeeded();
      const row = page.getByTestId(`cp-row-${leaverId}`);
      await expect(row.getByText(/File to send/)).toBeVisible();
      await row.getByRole('button', { name: 'Record file sent' }).click();
      const s2 = page.getByRole('dialog');
      await s2.locator('#cp-to').fill('Fixture Sixth Form College');
      await s2.locator('#cp-dsl').fill('R. Lead (fixture)');
      await s2.getByRole('radio', { name: 'Secure email' }).click();
      await s2.getByRole('button', { name: 'Save' }).click();
      await expect(s2).toBeHidden();
      await expect(row.getByText(/Sent, receipt not confirmed/)).toBeVisible();
      await row.getByRole('button', { name: 'Record receipt' }).click();
      const s3 = page.getByRole('dialog');
      await expect(s3.locator('#cp-r-by')).toHaveValue('R. Lead (fixture)');
      await s3.locator('#cp-r-role').fill('Designated safeguarding lead');
      await s3.getByRole('radio', { name: 'Email confirmation' }).click();
      await s3.getByRole('button', { name: 'Save receipt' }).click();
      await expect(s3).toBeHidden();
      await expect(row.getByText('Receipt confirmed')).toBeVisible();
      await expect(row).toContainText('Fixture Sixth Form College');
      if (SHOTS) {
        await cp.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${SHOTS}/68-${viewport}-transfers.png`, fullPage: false });
      }

      // Inspection export.
      await page.getByRole('button', { name: 'Inspection export' }).click();
      const s4 = page.getByRole('dialog');
      const summary = s4.getByTestId('sg-export-summary');
      await expect(summary).toBeVisible();
      await expect(summary).toContainText('open social care cases');
      const [dl] = await Promise.all([
        page.waitForEvent('download'),
        s4.getByRole('button', { name: 'Download report' }).click(),
      ]);
      const file = await dl.path();
      const html = fs.readFileSync(file!, 'utf8');
      expect(html).toContain(why);
      expect(html).toContain('Fixture Sixth Form College');
      expect(html).toContain('Child in need');
      expect(html).toContain('Local authority');
      if (SHOTS)
        await page.screenshot({ path: `${SHOTS}/68-${viewport}-export.png`, fullPage: false });

      // No horizontal scroll on the phone.
      if (phone) {
        await page.keyboard.press('Escape');
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(over, 'no horizontal page scroll').toBeLessThanOrEqual(1);
      }
      expect(errors, 'no page errors').toEqual([]);
    } finally {
      await context.close();
    }
  });
}
