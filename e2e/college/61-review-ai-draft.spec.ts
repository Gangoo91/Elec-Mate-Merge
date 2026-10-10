/**
 * Journey 61 — progress review: AI draft of the summary and SMART targets,
 * a draft until the tutor confirms it (ELE-2051, the ELE-1926 rule).
 *
 * On the fixture learner's booked review (never a new booking: that would
 * notify the employer contact), desktop and phone:
 *   - the Actions step offers "Draft the summary and targets", marked as AI;
 *   - the tutor types notes and drafts. The review-ai-draft call is
 *     INTERCEPTED: the test writes the held draft itself (as the tutor, through
 *     RLS) so no tokens are spent;
 *   - nothing reaches the review until the tutor ticks that they checked it;
 *   - "Use this draft" adds only the targets kept, as actions marked
 *     ai_draft_confirmed, puts the summary in the review with summary_source
 *     ai_draft_confirmed and who confirmed it, and the Sign off step says so;
 *   - a used draft cannot be rewritten.
 * Plus the database rules on their own: a tutor cannot edit the model's words,
 * and a learner cannot read the drafts.
 * The review's outcomes are put back and every draft and action deleted.
 */
import { test, expect, type Page } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerRoll, lit, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.setTimeout(240_000);

const OUT = process.env.W3_SHOTS;
async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(600);
  if (OUT) await page.screenshot({ path: `${OUT}/${name}-${phone ? 'phone' : 'desk'}.png` });
  if (phone) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

async function bookedReview() {
  const t = await actor('tutor');
  const roll = await learnerRoll();
  const { data } = await t.db
    .from('college_tripartite_reviews')
    .select('id, college_id, student_id, outcomes, locked_at')
    .eq('student_id', roll.id)
    .neq('status', 'cancelled')
    .is('locked_at', null)
    .order('scheduled_at', { ascending: false })
    .limit(1);
  return (data ?? [])[0] as
    | { id: string; college_id: string; student_id: string; outcomes: Record<string, unknown> }
    | undefined;
}

function restore(reviewId: string, outcomes: Record<string, unknown>, since: string) {
  admin(`
    delete from public.college_review_actions where review_id = ${lit(reviewId)} and (source = 'ai_draft_confirmed' or created_at >= ${lit(since)});
    delete from public.college_review_ai_drafts where review_id = ${lit(reviewId)} and created_at >= ${lit(since)};
    update public.college_tripartite_reviews set outcomes = ${lit(JSON.stringify(outcomes))}::jsonb where id = ${lit(reviewId)};
  `);
  const left = admin<{ n: number }>(
    `select (select count(*) from public.college_review_ai_drafts where review_id = ${lit(reviewId)} and created_at >= ${lit(since)}) + (select count(*) from public.college_review_actions where review_id = ${lit(reviewId)} and created_at >= ${lit(since)}) as n`
  );
  expect(Number(left[0]?.n ?? 0)).toBe(0);
}

const TARGETS = [
  {
    action: 'Complete three supervised insulation resistance tests on the training rig',
    owner: 'apprentice',
    due_date: '2026-12-01',
    measure: 'Three tests recorded and signed by the workshop tutor',
    unit_code: null,
  },
  {
    action: 'Give Demo two days of second fix work each fortnight',
    owner: 'employer',
    due_date: '2027-01-10',
    measure: 'Confirmed by the employer at the next review',
    unit_code: null,
  },
  {
    action: 'Book a catch-up session on off-the-job hours',
    owner: 'college',
    due_date: '2026-11-05',
    measure: 'Session held and 20 hours planned',
    unit_code: null,
  },
];

test('database: the model’s words are kept as written, learners cannot read drafts', async () => {
  test.skip(!adminAvailable(), 'Needs the Supabase CLI to clean up');
  const review = await bookedReview();
  test.skip(!review, 'No open review on the fixture learner');
  const t = await actor('tutor');
  const l = await actor('learner');
  const since = new Date(Date.now() - 2000).toISOString();
  try {
    const { data, error } = await t.db
      .from('college_review_ai_drafts')
      .insert({
        review_id: review!.id,
        college_id: review!.college_id,
        student_id: review!.student_id,
        created_by: t.userId,
        input_source: 'notes',
        input_notes: 'E2E notes',
        model: 'gpt-5.4-mini-2026-03-17',
        summary: 'E2E summary as the model wrote it, long enough.',
        targets: TARGETS,
      } as never)
      .select('id')
      .single();
    expect(error, error?.message).toBeNull();
    const id = (data as { id: string }).id;
    const edit = await t.db.from('college_review_ai_drafts').update({ summary: 'changed' } as never).eq('id', id);
    expect(edit.error?.message ?? '').toMatch(/kept as it was written/);
    const asLearner = await l.db.from('college_review_ai_drafts').select('id').eq('id', id);
    expect(asLearner.data ?? []).toEqual([]);
    const ok = await t.db
      .from('college_review_ai_drafts')
      .update({ confirmed_at: new Date().toISOString(), confirmed_by_name: 'E2E', targets_used: 1 } as never)
      .eq('id', id);
    expect(ok.error, ok.error?.message).toBeNull();
    const again = await t.db.from('college_review_ai_drafts').update({ discarded_at: new Date().toISOString() } as never).eq('id', id);
    expect(again.error?.message ?? '').toMatch(/already been used/);
  } finally {
    restore(review!.id, review!.outcomes ?? {}, since);
  }
});

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`tutor drafts, checks and uses the summary and targets (${viewport})`, async ({ browser }) => {
    test.skip(!adminAvailable(), 'Needs the Supabase CLI to clean up');
    const review = await bookedReview();
    test.skip(!review, 'No open review on the fixture learner');
    const t = await actor('tutor');
    const since = new Date(Date.now() - 2000).toISOString();
    const { context, page, errors } = await signedInPage(browser, 'tutor', viewport);
    let drafted = 0;
    // No tokens spent: the draft is written here, as the tutor, and returned.
    await context.route('**/functions/v1/review-ai-draft', async (route) => {
      const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' };
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 200, headers: cors, body: 'ok' });
      drafted += 1;
      const body = route.request().postDataJSON() as { review_id: string; notes: string };
      const { data, error } = await t.db
        .from('college_review_ai_drafts')
        .insert({
          review_id: body.review_id,
          college_id: review!.college_id,
          student_id: review!.student_id,
          created_by: t.userId,
          input_source: 'notes',
          input_notes: body.notes,
          model: 'gpt-5.4-mini-2026-03-17',
          summary:
            'Demo had made good progress on containment and first fix. They were behind on off-the-job hours and nervous about insulation resistance testing. It was agreed they would practise testing and catch up their hours.',
          targets: TARGETS,
        } as never)
        .select('id, created_at, model, summary, targets, input_source')
        .single();
      if (error) return route.fulfill({ status: 500, headers: cors, body: JSON.stringify({ error: error.message }) });
      return route.fulfill({
        status: 200,
        headers: { ...cors, 'content-type': 'application/json' },
        body: JSON.stringify({ source: 'ai_draft', draft: data }),
      });
    });
    try {
      await page.goto('/college/reviews');
      await page.getByText('Demo Learner (fixture)').first().click();
      const sheet = page.getByRole('dialog').first();
      await sheet.getByRole('button', { name: /Actions$/ }).first().click();
      const panel = sheet.getByTestId('review-ai-draft');
      await expect(panel).toBeVisible({ timeout: 20_000 });
      await expect(panel.getByText('uses AI').first()).toBeVisible();
      await panel.getByTestId('rv-ai-notes').fill('Doing well on containment. Nervous about IR testing. Behind on hours.');
      await panel.getByTestId('rv-ai-run').click();
      const result = panel.getByTestId('rv-ai-draft-result');
      await expect(result).toBeVisible({ timeout: 20_000 });
      expect(drafted).toBe(1);
      await expect(result.getByText('Drafted with AI. Check it before you use it.')).toBeVisible();
      // Nothing is in the review yet.
      const before = await t.db.from('college_review_actions').select('id').eq('review_id', review!.id).gte('created_at', since);
      expect(before.data ?? []).toEqual([]);
      const use = result.getByTestId('rv-ai-use');
      await expect(use).toBeDisabled();
      // Keep two of three targets.
      await result.getByRole('checkbox', { name: /Book a catch-up session/ }).click();
      await result.getByTestId('rv-ai-checked').click();
      await shot(page, 'w61-draft', phone);
      await expect(use).toBeEnabled();
      await use.click();
      await expect(sheet.getByText('from an AI draft you confirmed').first()).toBeVisible({ timeout: 20_000 });

      // The record: two actions marked, the draft confirmed, the summary's source.
      await expect
        .poll(async () => {
          const { data } = await t.db
            .from('college_tripartite_reviews')
            .select('outcomes')
            .eq('id', review!.id)
            .single();
          return (data as { outcomes: { summary_source?: string } }).outcomes.summary_source;
        })
        .toBe('ai_draft_confirmed');
      const { data: acts } = await t.db
        .from('college_review_actions')
        .select('action, source, ai_draft_id')
        .eq('review_id', review!.id)
        .gte('created_at', since);
      const list = (acts ?? []) as Array<{ action: string; source: string; ai_draft_id: string }>;
      expect(list).toHaveLength(2);
      expect(list.every((a) => a.source === 'ai_draft_confirmed' && a.ai_draft_id)).toBe(true);
      expect(list.some((a) => /catch-up/.test(a.action))).toBe(false);
      const { data: d } = await t.db
        .from('college_review_ai_drafts')
        .select('confirmed_at, confirmed_by_name, targets_used')
        .eq('id', list[0].ai_draft_id)
        .single();
      expect(d).toMatchObject({ targets_used: 2 });
      expect((d as { confirmed_at: string | null }).confirmed_at).toBeTruthy();
      await shot(page, 'w61-actions', phone);

      await sheet.getByRole('button', { name: /Sign off$/ }).first().click();
      await expect(sheet.getByTestId('rv-summary-provenance')).toContainText('Drafted with AI from the tutor');
      await sheet.getByTestId('rv-summary-provenance').scrollIntoViewIfNeeded();
      await shot(page, 'w61-signoff', phone);
      expect(errors, errors.join('\n')).toEqual([]);
    } finally {
      await context.close();
      restore(review!.id, review!.outcomes ?? {}, since);
    }
  });
}
