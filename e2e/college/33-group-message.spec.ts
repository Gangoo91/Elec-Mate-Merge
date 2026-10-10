/**
 * Journey 33 — message a group, each learner with their own figures.
 *
 * As the fixture tutor on the Learners list: filter to "Behind on hours",
 * Select the fixture learner, open the group message, check the preview
 * carries that learner's real figures (read independently from
 * get_otj_summary and get_portfolio_ac_state), pick the review template, go
 * through "This sends 1 private message" and send. Then the fixture learner
 * can read the thread and message (as themselves), and it shows on their
 * Student 360. Desktop 1440 and phone 390.
 *
 * Sends to "Demo Learner (fixture)" ONLY: the selection is that one row, and
 * the test fails before sending if the confirm step lists anyone else. The
 * thread, message and the learner's bell row are deleted by id afterwards.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import {
  actor,
  admin,
  adminAvailable,
  haveCreds,
  learnerRoll,
  lit,
  RUN,
  signedInPage,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(
  () => !adminAvailable(),
  'No Supabase CLI login / SUPABASE_ACCESS_TOKEN — cannot clean up the thread'
);
test.describe.configure({ mode: 'serial' });

const FIXTURE_NAME = 'Demo Learner (fixture)';
const SHOTS = process.env.GROUP_MESSAGE_SHOTS;

const hrs = (n: number) => n.toLocaleString('en-GB', { maximumFractionDigits: 1 });
const round1 = (n: number) => Math.round(n * 10) / 10;

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(500);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({ path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`) });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

/** The fixture learner's figures, read from the same sources the hub uses — not from the new RPC. */
async function realFigures(learnerUserId: string) {
  const t = await actor('tutor');
  const { data: otj, error: e1 } = await t.db.rpc('get_otj_summary', { p_user: learnerUserId });
  if (e1) throw e1;
  const { data: acs, error: e2 } = await t.db.rpc('get_portfolio_ac_state', {
    p_user_id: learnerUserId,
  });
  if (e2) throw e2;
  const o = otj as { counted_hours: number; planned_to_date_hours: number | null };
  const rows = (acs ?? []) as Array<{ state: string }>;
  const counted = round1(o.counted_hours ?? 0);
  const planned = o.planned_to_date_hours === null ? null : round1(o.planned_to_date_hours);
  return {
    counted,
    planned,
    behind: planned === null ? null : Math.max(0, round1(planned - counted)),
    passed: rows.filter((r) => r.state === 'passed' || r.state === 'iqa_confirmed').length,
    total: rows.length,
  };
}

for (const viewport of ['desktop', 'phone'] as const) {
  test(`group message with own figures (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const roll = await learnerRoll();
    const l = await actor('learner');
    const real = await realFigures(l.userId);
    const subject = `${RUN} ${viewport} Your progress review`;
    let threadId: string | null = null;
    let messageId: string | null = null;
    let noteIds: string[] = [];

    try {
      const tutor = await signedInPage(browser, 'tutor', viewport);
      const page = tutor.page;
      await page.goto('/college?section=students');
      const chip = page.getByRole('button', { name: /^Behind on hours/ }).first();
      await expect(chip).toBeVisible({ timeout: 45_000 });
      await chip.click();

      // The fixture learner may be outside "mine": widen to the whole college.
      const row = page.getByRole('button', { name: `Open ${FIXTURE_NAME}` });
      // Wait for the filtered roster itself before deciding (isVisible does not wait).
      await expect(page.getByRole('button', { name: /^Message these \d+$/ })).toBeVisible({
        timeout: 45_000,
      });
      await expect(page.getByRole('button', { name: /^Open .+/ }).first()).toBeVisible();
      if (!(await row.isVisible())) {
        await page
          .getByRole('tab', { name: /Whole college/ })
          .first()
          .click();
        await page
          .getByRole('button', { name: /^Behind on hours/ })
          .first()
          .click();
      }
      await expect(row).toBeVisible();
      // Filter path: the group action appears on a filtered list (not used to send here).
      await expect(page.getByRole('button', { name: /^Message these \d+$/ })).toBeVisible();
      await shot(page, 'gm01-filtered', phone);

      // Select path: just the fixture learner.
      await page.getByRole('button', { name: 'Select', exact: true }).click();
      await page.getByRole('button', { name: `Select ${FIXTURE_NAME}` }).click();
      await expect(page.getByText('1 selected').first()).toBeVisible();
      await shot(page, 'gm02-selected', phone);
      await page.getByRole('button', { name: 'Message', exact: true }).click();

      const sheet = page.getByRole('dialog');
      await expect(sheet.getByText('Message 1 learner')).toBeVisible();
      const preview = sheet.getByTestId('group-message-preview');
      await expect(preview).toBeVisible({ timeout: 30_000 });
      await expect(sheet.getByText(FIXTURE_NAME).first()).toBeVisible();

      // Came from "Behind on hours", so the hours template is the start.
      await expect(
        sheet.getByRole('button', { name: 'Behind on hours', pressed: true })
      ).toBeVisible();
      if (real.planned !== null && real.behind !== null && real.behind > 0) {
        await expect(preview).toContainText(`${hrs(real.counted)} hour`);
        await expect(preview).toContainText(`has you at ${hrs(real.planned)} by now`);
        await expect(preview).toContainText(`${hrs(real.behind)} hour`);
        await expect(sheet.getByText('Will be sent')).toBeVisible();
      } else {
        await expect(sheet.getByText(/not behind on off-the-job hours/)).toBeVisible();
      }
      await shot(page, 'gm03-hours-template', phone);
      if (phone) {
        // The sheet's own columns fit the phone (a wide chip row once pushed them off).
        for (const sel of ['#gm-body', '[data-testid="group-message-preview"]']) {
          const box = await sheet.locator(sel).boundingBox();
          expect(box && box.x + box.width, `${sel} fits the phone`).toBeLessThanOrEqual(391);
        }
      }

      // The review template: hours and criteria, from their record.
      await sheet.getByRole('button', { name: 'Review coming up' }).click();
      await sheet.locator('#gm-subject').fill(subject);
      await expect(preview).toContainText(`Hi Demo,`);
      await expect(preview).toContainText(`${hrs(real.counted)} off-the-job hours counted`);
      if (real.planned !== null)
        await expect(preview).toContainText(`against ${hrs(real.planned)} planned by now`);
      await expect(preview).toContainText(`${real.passed} of ${real.total} criteria passed`);
      await expect(preview).toContainText(
        /Your next progress review is (on|due by) \w+day \d+ \w+\./
      );
      await expect(sheet.getByText('Will be sent')).toBeVisible();
      const expectedBody = (await preview.innerText()).trim();
      await shot(page, 'gm04-review-preview', phone);

      await sheet.getByRole('button', { name: 'Review 1 message' }).click();
      await expect(sheet.getByText('This sends 1 private message')).toBeVisible();
      // Guard: the confirm list is exactly the fixture learner.
      const listed = await sheet.locator('ul li').allInnerTexts();
      expect(listed.map((s) => s.trim())).toEqual([FIXTURE_NAME]);
      await shot(page, 'gm05-confirm', phone);

      await sheet.getByRole('button', { name: 'Send 1 message' }).click();
      await expect(sheet.getByText('1 message sent')).toBeVisible();
      await shot(page, 'gm06-sent', phone);

      // The row exists, from the tutor, with the previewed text.
      const t = await actor('tutor');
      await expect
        .poll(
          async () => {
            const { data } = await t.db
              .from('student_message_threads')
              .select('id')
              .eq('student_id', roll.id)
              .eq('subject', subject)
              .maybeSingle();
            threadId = (data as { id: string } | null)?.id ?? null;
            return threadId;
          },
          { message: 'the thread was created' }
        )
        .toBeTruthy();

      // The learner sees it, as themselves.
      const { data: lth } = await l.db
        .from('student_message_threads')
        .select('id, subject, unread_count_student')
        .eq('id', threadId!)
        .maybeSingle();
      expect(lth, 'the learner can read the thread').toBeTruthy();
      expect((lth as { unread_count_student: number }).unread_count_student).toBeGreaterThan(0);
      const { data: lmsg } = await l.db
        .from('student_messages')
        .select('id, body, sender_kind')
        .eq('thread_id', threadId!);
      const msgs = (lmsg ?? []) as Array<{ id: string; body: string; sender_kind: string }>;
      expect(msgs).toHaveLength(1);
      messageId = msgs[0].id;
      expect(msgs[0].sender_kind).toBe('tutor');
      expect(msgs[0].body.replace(/\s+/g, ' ').trim()).toBe(
        expectedBody.replace(/\s+/g, ' ').trim()
      );
      expect(msgs[0].body).toContain(`${real.passed} of ${real.total} criteria passed`);

      // Their bell: notify-student-message runs off the insert trigger.
      await expect
        .poll(
          async () => {
            const { data } = await l.db
              .from('user_notifications')
              .select('id, link, metadata')
              .eq('user_id', l.userId)
              .order('created_at', { ascending: false })
              .limit(20);
            noteIds = (
              (data ?? []) as Array<{ id: string; link: string | null; metadata: unknown }>
            )
              .filter((n) =>
                `${n.link ?? ''}${JSON.stringify(n.metadata ?? {})}`.includes(threadId!)
              )
              .map((n) => n.id);
            return noteIds.length;
          },
          { message: 'the learner got a notification', timeout: 45_000 }
        )
        .toBeGreaterThan(0);

      // And it is on their Student 360, under messages.
      await page.goto(`/college?section=student360&studentId=${roll.id}#messages`);
      const s360 = page.getByRole('dialog');
      await expect(s360.getByText(subject).first()).toBeVisible({ timeout: 30_000 });
      await shot(page, 'gm07-student360', phone);

      expect(tutor.errors).toEqual([]);
      await tutor.context.close();
    } finally {
      const T = threadId ? lit(threadId) : null;
      admin(`
        ${noteIds.length ? `delete from public.user_notifications where id in (${noteIds.map(lit).join(',')});` : ''}
        ${T ? `delete from public.user_notifications where user_id = ${lit(l.userId)} and (coalesce(link, '') || metadata::text) like '%' || ${T} || '%';` : ''}
        ${messageId ? `delete from public.student_messages where id = ${lit(messageId)};` : ''}
        ${T ? `delete from public.student_messages where thread_id = ${T};` : ''}
        ${T ? `delete from public.student_message_threads where id = ${T};` : ''}
        delete from public.student_messages where thread_id in (select id from public.student_message_threads where student_id = ${lit(roll.id)} and subject = ${lit(subject)});
        delete from public.student_message_threads where student_id = ${lit(roll.id)} and subject = ${lit(subject)};
      `);
    }
    const left = admin<{ n: number }>(
      `select (select count(*) from public.student_message_threads where student_id = ${lit(roll.id)} and subject = ${lit(subject)})::int
            + (select count(*) from public.student_messages where id = ${lit(messageId ?? '00000000-0000-0000-0000-000000000000')})::int n`
    );
    expect(left[0]?.n, 'the thread and message were cleaned up').toBe(0);
  });
}
