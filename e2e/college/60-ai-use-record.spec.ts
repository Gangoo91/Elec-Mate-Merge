/**
 * Journey 60 — AI use is recorded on every piece of evidence (ELE-2048).
 *
 * Ofqual advice note (27 Apr 2026) and JCQ "AI Use in Assessments" (Apr 2025):
 * the tool and date, what it was given and what it wrote, how it was used, and
 * an acknowledgement in the signed declaration.
 *
 *  1. Database: a capture's metadata.ai_use becomes portfolio_items.ai_use and
 *     ai_assisted; the learner cannot clear it; staff cannot change it;
 *     submit_portfolio_evidence refuses an AI-assisted item without "How I used
 *     AI:" and binds ai_assisted into the signed hashes.
 *  2. Journey (desktop + phone): the learner captures by voice; the reflective
 *     account drafter and the capture assistant are INTERCEPTED (no tokens
 *     spent); they use the AI draft and save. The row records which fields the
 *     AI drafted. Submitting shows the AI record, needs a line on how AI was
 *     used, and signs it. The tutor's submission drawer shows the AI record and,
 *     on a tap, what the AI was given and wrote.
 * Every row is deleted by id at the end.
 */
import { test, expect, type Page } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerContext, lit, signedInPage, RUN } from './support';

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

function cleanup(itemIds: string[]) {
  if (!itemIds.length) return;
  const ids = itemIds.map(lit).join(',');
  // The audit trail is append-only to every role by design; test rows are
  // removed with triggers off for that one statement (as journeys 42-44 do).
  admin(`
    create temp table if not exists _w3_subs (id uuid);
    insert into _w3_subs select distinct submission_id from public.portfolio_submission_items where portfolio_item_id in (${ids});
    delete from public.portfolio_signatures where submission_id in (select id from _w3_subs);
    delete from public.portfolio_submission_items where portfolio_item_id in (${ids});
    delete from public.portfolio_submissions where id in (select id from _w3_subs);
    delete from public.portfolio_item_criteria where portfolio_item_id in (${ids});
    delete from public.portfolio_items where id in (${ids});
    set session_replication_role = replica;
    delete from public.portfolio_audit_events where object_id in (${ids}) or object_id in (select id from _w3_subs);
    set session_replication_role = origin;
    delete from public.learning_activity_log where source_title like 'Portfolio: E2E·%' and created_at > now() - interval '1 hour';
    delete from public.user_notifications where (title like '%E2E·%' or message like '%E2E·%') and created_at > now() - interval '1 hour';
  `);
  const left = admin<{ n: number }>(
    `select (select count(*) from public.portfolio_items where id in (${ids})) + (select count(*) from public.portfolio_submission_items where portfolio_item_id in (${ids})) as n`
  );
  expect(Number(left[0]?.n ?? 0)).toBe(0);
}

/** An AC this learner has not started, so claiming it disturbs nothing. */
async function freeCriterion() {
  const l = await actor('learner');
  const { data } = await l.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
  const rows = (data ?? []) as Array<{ unit_code: string; ac_code: string; ac_text: string; state: string }>;
  const r = rows.find((x) => x.state === 'not_started') ?? rows[rows.length - 1];
  expect(r, 'the fixture learner has criteria').toBeTruthy();
  return r;
}

const RECORD = {
  v: 1,
  assisted: true,
  recorded_at: new Date().toISOString(),
  tools: [
    {
      tool: 'voice_to_star',
      fn: 'portfolio-capture-stream',
      model: 'gpt-5.4-mini-2026-03-17',
      at: new Date().toISOString(),
      prompt: { transcript: 'Changed a consumer unit with Dave, did the dead tests.' },
      output: {},
    },
  ],
  fields: [
    {
      field: 'reflection',
      from: 'voice_to_star',
      ai_text: 'Situation: a consumer unit change. Action: I did the dead tests.',
      ai_share: 0.8,
      edited: true,
    },
  ],
  criteria_from_ai: [],
  ran_not_used: false,
};

test('database: the record is sticky, staff cannot change it, the declaration must say how AI was used', async () => {
  test.skip(!adminAvailable(), 'Needs the Supabase CLI to clean up');
  const l = await actor('learner');
  const t = await actor('tutor');
  const ac = await freeCriterion();
  const id = crypto.randomUUID();
  try {
    const { error: insErr } = await l.db.from('portfolio_items').insert({
      id,
      user_id: l.userId,
      title: `${RUN} AI record`,
      category: 'site_work',
      status: 'draft',
      reflection_notes: 'Situation: a consumer unit change. Action: I did the dead tests myself.',
      metadata: { workDate: '2026-10-09', ai_use: RECORD },
    } as never);
    expect(insErr, insErr?.message).toBeNull();
    const read = async () =>
      (
        await l.db.from('portfolio_items').select('ai_assisted, ai_use, metadata').eq('id', id).single()
      ).data as { ai_assisted: boolean; ai_use: { fields: unknown[] } | null; metadata: Record<string, unknown> };
    let row = await read();
    expect(row.ai_assisted).toBe(true);
    expect(row.ai_use?.fields).toHaveLength(1);
    expect(row.metadata.ai_use).toBeUndefined();

    // The learner cannot clear it.
    await l.db.from('portfolio_items').update({ ai_assisted: false, ai_use: null, metadata: { workDate: '2026-10-09' } } as never).eq('id', id);
    row = await read();
    expect(row.ai_assisted).toBe(true);
    expect(row.ai_use).not.toBeNull();

    // Staff cannot change it.
    const { error: staffErr } = await t.db.from('portfolio_items').update({ ai_use: { v: 1, assisted: false } } as never).eq('id', id);
    const after = await read();
    expect(after.ai_use?.fields).toHaveLength(1);
    if (staffErr) expect(staffErr.message).toMatch(/staff|not allowed|permission|row-level/i);

    // Claim a criterion, then sign without and with the AI line.
    const { error: cErr } = await l.db.rpc('set_portfolio_item_criteria', {
      p_item_id: id,
      p_claimed: [{ unit_code: ac.unit_code, ac_code: ac.ac_code }],
      p_suggested: [],
    } as never);
    expect(cErr, cErr?.message).toBeNull();
    const sig = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    const base = 'I confirm that the evidence I am submitting is my own work.';
    const noAi = await l.db.rpc('submit_portfolio_evidence', {
      p_item_ids: [id],
      p_typed_name: 'Demo Learner',
      p_signature_image: sig,
      p_declaration_text: base,
    } as never);
    expect(noAi.error?.message ?? '').toMatch(/how you used AI/);
    const ok = await l.db.rpc('submit_portfolio_evidence', {
      p_item_ids: [id],
      p_typed_name: 'Demo Learner',
      p_signature_image: sig,
      p_declaration_text: `${base}\n\nHow I used AI: the app drafted my reflection from my voice note and I corrected it.`,
    } as never);
    expect(ok.error, ok.error?.message).toBeNull();
    const subId = (ok.data as { submission_id: string }).submission_id;
    const { data: s } = await t.db
      .from('portfolio_signatures')
      .select('signed_hashes, declaration_text')
      .eq('submission_id', subId)
      .eq('signature_type', 'declaration')
      .single();
    const signed = (s as { signed_hashes: Array<{ ai_assisted: boolean; ai_fields: string[] }> }).signed_hashes[0];
    expect(signed.ai_assisted).toBe(true);
    expect(signed.ai_fields).toEqual(['reflection']);
  } finally {
    cleanup([id]);
  }
});

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`capture with AI, submit and the assessor's view (${viewport})`, async ({ browser }) => {
    test.skip(!adminAvailable(), 'Needs the Supabase CLI to clean up');
    const l = await actor('learner');
    const ac = await freeCriterion();
    const title = `${RUN} board change ${viewport}`;
    const started = new Date(Date.now() - 5000).toISOString();
    const made: string[] = [];
    const { context, page, errors } = await signedInPage(browser, 'learner', viewport);
    let aiCalls = 0;
    const cors = {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
    };
    // No tokens spent: both AI functions answer from here.
    await context.route('**/functions/v1/portfolio-capture-stream', async (route) => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 200, headers: cors, body: 'ok' });
      aiCalls += 1;
      const reflection = {
        situation: 'A consumer unit change at a house.',
        task: 'Replace the board and test it.',
        action: 'I isolated the supply, proved it dead and did the dead tests.',
        result: 'The new board passed every test and was labelled.',
        learning: 'Labelling as I go saves time at the end.',
        suggestedTitle: title,
      };
      const body = `event: reflection-result\ndata: ${JSON.stringify({ reflection })}\n\nevent: done\ndata: {"completed":1}\n\n`;
      return route.fulfill({ status: 200, headers: { ...cors, 'content-type': 'text/event-stream' }, body });
    });
    await context.route('**/functions/v1/capture-assistant', async (route) => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 200, headers: cors, body: 'ok' });
      aiCalls += 1;
      return route.fulfill({
        status: 200,
        headers: { ...cors, 'content-type': 'application/json' },
        body: JSON.stringify({
          source: 'ai_suggested',
          model: 'gpt-5.4-mini-2026-03-17',
          criteria: [{ unit_code: ac.unit_code, ac_code: ac.ac_code, ac_text: ac.ac_text, reason: 'You described it.' }],
          reflection:
            'I changed a consumer unit at a house with my supervisor. I isolated the supply, proved it dead and carried out the dead tests myself, then labelled every circuit.',
          testSheet: { needed: false, ask: '' },
          nextJob: null,
          openGaps: 0,
          regs: [],
        }),
      });
    });
    try {
      await page.goto('/apprentice/hub?capture=1&preset=photo');
      const dialog = page.getByRole('dialog').first();
      await dialog.getByRole('button', { name: /Voice only/ }).click();
      await dialog.getByPlaceholder(/Speak or type/).fill('Changed a consumer unit with Dave today, I did the dead tests.');
      await dialog.getByRole('button', { name: /Read it and suggest criteria/ }).click();
      const panel = dialog.getByTestId('capture-assistant');
      await expect(panel).toBeVisible({ timeout: 30_000 });
      await panel.getByRole('button', { name: 'Use this draft' }).click();
      await expect(dialog.getByTestId('capture-reflection')).not.toHaveValue('');
      // The learner makes it their own a little.
      await dialog.getByTestId('capture-reflection').press('End');
      await dialog.getByTestId('capture-reflection').pressSequentially(' Next time I will book the isolation earlier.');
      await panel.getByTestId('assist-criterion').first().click();
      await expect(dialog.getByRole('textbox').first()).toBeVisible();
      expect(aiCalls).toBeGreaterThanOrEqual(2);
      await shot(page, 'w60-capture', phone);
      await dialog.getByRole('button', { name: 'Save evidence' }).click();
      const anyway = page.getByRole('button', { name: 'Save anyway' });
      if (await anyway.isVisible({ timeout: 4000 }).catch(() => false)) await anyway.click();
      await expect(page.getByRole('dialog').filter({ hasText: 'Save evidence' })).toHaveCount(0, { timeout: 30_000 });

      // The row records what the AI drafted.
      let row: { id: string; ai_assisted: boolean; ai_use: { fields: Array<{ field: string; from: string; edited: boolean }>; tools: Array<{ tool: string; model?: string }> } } | null = null;
      for (let i = 0; i < 10 && !row; i++) {
        const { data } = await l.db
          .from('portfolio_items')
          .select('id, ai_assisted, ai_use')
          .eq('user_id', l.userId)
          .eq('title', title)
          .gte('created_at', started)
          .maybeSingle();
        row = data as typeof row;
        if (!row) await page.waitForTimeout(1000);
      }
      expect(row, 'the capture saved').toBeTruthy();
      made.push(row!.id);
      expect(row!.ai_assisted).toBe(true);
      const fields = row!.ai_use.fields.map((f) => f.field);
      expect(fields).toContain('reflection');
      expect(fields).toContain('title');
      expect(row!.ai_use.fields.find((f) => f.field === 'reflection')?.edited).toBe(true);
      expect(row!.ai_use.tools.map((t) => t.tool)).toEqual(expect.arrayContaining(['voice_to_star', 'capture_assistant']));

      // Submit: the AI record, the line on how it was used, then sign.
      // The capture sheet may still be changing the URL as it closes: retry an aborted load.
      await page.waitForLoadState('networkidle').catch(() => undefined);
      for (let i = 0; i < 3; i++) {
        try {
          await page.goto(`/apprentice/hub?item=${row!.id}`);
          break;
        } catch (err) {
          if (i === 2 || !/ERR_ABORTED|interrupted/.test(String(err))) throw err;
          await page.waitForTimeout(1500);
        }
      }
      await page.getByRole('button', { name: 'Submit for assessment' }).first().click();
      const sheet = page.getByRole('dialog').filter({ hasText: 'Sign and send' }).first();
      await expect(sheet.getByTestId('ai-use-record')).toBeVisible();
      await expect(sheet.getByText('AI drafted the', { exact: false }).first()).toBeVisible();
      await expect(sheet.getByTestId('submit-ai-note')).toBeVisible();
      await sheet.getByRole('checkbox', { name: /I confirm this is my own work/ }).click();
      const canvas = sheet.locator('canvas').first();
      await canvas.scrollIntoViewIfNeeded();
      const box = (await canvas.boundingBox())!;
      await page.mouse.move(box.x + 20, box.y + 40);
      await page.mouse.down();
      await page.mouse.move(box.x + 120, box.y + 80, { steps: 8 });
      await page.mouse.move(box.x + 200, box.y + 50, { steps: 8 });
      await page.mouse.up();
      const send = sheet.getByRole('button', { name: /^Sign and send/ });
      await expect(send).toBeDisabled();
      await sheet.getByTestId('submit-ai-note').fill('The app drafted my reflection from my voice note. I checked it and added what I would do next time.');
      await shot(page, 'w60-submit', phone);
      await expect(send).toBeEnabled();
      await send.click();
      await expect(page.getByRole('dialog').getByText('Sent to your assessor').first()).toBeVisible({
        timeout: 20_000,
      });
      const { data: decl } = await l.db
        .from('portfolio_submission_items')
        .select('submission_id')
        .eq('portfolio_item_id', row!.id)
        .single();
      expect(decl).toBeTruthy();
      expect(errors, errors.join('\n')).toEqual([]);
    } catch (e) {
      cleanup(made);
      throw e;
    } finally {
      await context.close();
    }

    // The assessor (and the IQA, through the same drawer) sees the record.
    try {
      const ctx = await learnerContext();
      const tut = await signedInPage(browser, 'tutor', viewport);
      await tut.page.goto(`/college?section=student360&studentId=${ctx.student_id}#portfolio`);
      await tut.page.waitForLoadState('networkidle').catch(() => undefined);
      const rowBtn = tut.page.getByRole('button', { name: /Submitted .* ago|Submitted (today|yesterday)|Submitted just now/i }).first();
      await expect(rowBtn).toBeVisible({ timeout: 30_000 });
      const drawer = tut.page.getByRole('dialog').first();
      // The list can re-render as it settles; tap again if the first tap was lost.
      await expect(async () => {
        if (!(await drawer.isVisible().catch(() => false))) await rowBtn.click();
        await expect(drawer.getByText('Evidence sent').first()).toBeVisible({ timeout: 5_000 });
      }).toPass({ timeout: 30_000 });
      const rec = drawer.getByTestId('ai-use-record').first();
      await expect(rec).toBeVisible({ timeout: 20_000 });
      await expect(rec.getByTestId('ai-use-chip')).toHaveText(/AI assisted/);
      await rec.getByRole('button', { name: /Show what the AI was given and wrote/ }).click();
      await expect(rec.getByTestId('ai-use-detail')).toContainText('as the AI wrote it');
      await expect(drawer.getByText(/How I used AI:/).first()).toBeVisible();
      await rec.scrollIntoViewIfNeeded();
      await shot(tut.page, 'w60-assessor', phone);
      expect(tut.errors, tut.errors.join('\n')).toEqual([]);
      await tut.context.close();
    } finally {
      cleanup(made);
    }
  });
}
