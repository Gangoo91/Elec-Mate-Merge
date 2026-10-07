/**
 * Journey 15 — the lesson plan generator, end to end. NOT a default run:
 * a generation calls the model and costs money, so every test here skips
 * unless asked for.
 *
 *   RUN_GENERATE=1          a real generation through the "Shape the session"
 *                           sheet as the fixture tutor (saves a draft plan,
 *                           titled from the model; delete it afterwards).
 *   GEN_RECORD=<file.json>  calls the function directly with save_to_db:false
 *                           and records the raw SSE stream with timings.
 *   GEN_REPLAY=<file.json>  replays a recording into the sheet (no model call,
 *                           no cost) to screenshot every state, plus an error.
 *
 * Screenshots go to PORTFOLIO_TOUR_SHOTS when set. Desktop 1440 and phone 390.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage, SUPABASE_URL } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.setTimeout(420_000);

const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;
const COHORT = '33333333-cccc-4000-8000-000000000001'; // L2 Electrical 2025-A (5357)
const INPUT = {
  qualification_code: '5357',
  unit_code: '113',
  ac_codes: ['1.1', '2.1', '3.2'],
  cohort_id: COHORT,
  session_length_mins: 90,
  delivery_mode: 'workshop',
};

async function shot(page: Page, name: string, phone: boolean) {
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `gen-${name}-${phone ? 'phone' : 'desk'}.png`),
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

/** Opens the generator from the Start-a-plan sheet: cohort, unit 113, three criteria. */
async function openGenerator(page: Page) {
  await page.goto('/college?section=lessonplans');
  await page
    .getByRole('button', { name: /New plan/ })
    .first()
    .click();
  await page
    .getByRole('button', { name: /L2 Electrical 2025-A\b/ })
    .first()
    .click();
  await page
    .getByRole('button', { name: /Unit 113\b/ })
    .first()
    .click();
  await page
    .getByRole('button', { name: /^Next: criteria/ })
    .last()
    .click();
  for (const ac of INPUT.ac_codes) {
    await page.getByText(ac, { exact: true }).first().click({ timeout: 10_000 });
  }
  await page
    .getByRole('button', { name: /^Next: shape the session/ })
    .last()
    .click();
  await expect(page.getByText(/^Shape the session$/).last()).toBeVisible();
  await page.waitForTimeout(1500);
}

test('record a raw generation stream', async () => {
  test.skip(!process.env.GEN_RECORD, 'GEN_RECORD not set');
  const t = await actor('tutor');
  const started = Date.now();
  const res = await fetch(`${SUPABASE_URL}/functions/v1/curriculum-generate-lesson`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${t.session.access_token}`,
      accept: 'text/event-stream',
    },
    body: JSON.stringify({ ...INPUT, save_to_db: false }),
  });
  expect(res.ok).toBeTruthy();
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  const chunks: { t: number; s: string }[] = [];
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push({ t: Date.now() - started, s: decoder.decode(value, { stream: true }) });
  }
  fs.writeFileSync(process.env.GEN_RECORD!, JSON.stringify(chunks));
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`generator, real run (${viewport})`, async ({ browser }) => {
    test.skip(!process.env.RUN_GENERATE, 'RUN_GENERATE not set');
    test.skip(viewport === 'phone' && !process.env.RUN_GENERATE_PHONE, 'one real run is enough');
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    await openGenerator(page);
    await shot(page, 'live-0-shape', phone);
    await page
      .getByRole('button', { name: /^Build lesson plan/ })
      .last()
      .click();
    for (let i = 1; i <= 12; i++) {
      await page.waitForTimeout(8000);
      await shot(page, `live-${i}`, phone);
      if (
        await page
          .getByText(/Your plan is ready/)
          .isVisible()
          .catch(() => false)
      )
        break;
    }
    await expect(page.getByText(/Your plan is ready/)).toBeVisible({ timeout: 240_000 });
    await shot(page, 'live-done', phone);
    expect(errors).toEqual([]);
  });

  test(`generator, replayed (${viewport})`, async ({ browser }) => {
    test.skip(!process.env.GEN_REPLAY, 'GEN_REPLAY not set');
    const phone = viewport === 'phone';
    const chunks = JSON.parse(fs.readFileSync(process.env.GEN_REPLAY!, 'utf8')) as {
      t: number;
      s: string;
    }[];
    // Point the recorded done event at a real plan so "Open the plan" lands.
    const t = await actor('tutor');
    const { data } = await t.db
      .from('college_lesson_plans')
      .select('id')
      .not('content', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const planId = (data as { id: string } | null)?.id ?? null;
    const speed = Number(process.env.GEN_REPLAY_SPEED ?? '4');
    const { page, context, errors } = await signedInPage(browser, 'tutor', viewport);
    await context.addInitScript(
      ([recorded, id, sp, failAt]) => {
        const realFetch = window.fetch.bind(window);
        window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
          const url =
            typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
          if (!url.includes('curriculum-generate-lesson')) return realFetch(input, init);
          const enc = new TextEncoder();
          const signal = init?.signal;
          const body = new ReadableStream<Uint8Array>({
            async start(controller) {
              let last = 0;
              for (const c of recorded) {
                if (failAt && c.t > failAt) {
                  controller.enqueue(
                    enc.encode(
                      'event: error\ndata: {"message":"plan: connection dropped (after 1 retry)"}\n\n'
                    )
                  );
                  break;
                }
                await new Promise((r) => setTimeout(r, (c.t - last) / sp));
                last = c.t;
                if (signal?.aborted) {
                  controller.error(new DOMException('Aborted', 'AbortError'));
                  return;
                }
                controller.enqueue(
                  enc.encode(
                    c.s.replace('"lesson_plan_id":null', `"lesson_plan_id":${JSON.stringify(id)}`)
                  )
                );
              }
              controller.close();
            },
          });
          return Promise.resolve(
            new Response(body, { status: 200, headers: { 'content-type': 'text/event-stream' } })
          );
        };
      },
      [chunks, planId, speed, Number(process.env.GEN_REPLAY_FAIL_AT ?? '0')] as const
    );
    await openGenerator(page);
    await shot(page, 'r0-shape', phone);
    for (const h of ['Room and equipment', 'What the plan includes', 'Anything else?']) {
      await page.getByRole('heading', { name: h }).scrollIntoViewIfNeeded();
      await shot(page, `r0-shape-${h.split(' ')[0].toLowerCase()}`, phone);
    }
    await page
      .getByRole('button', { name: /^Build lesson plan/ })
      .last()
      .click();
    const total = chunks[chunks.length - 1].t / speed;
    const marks = (process.env.GEN_REPLAY_MARKS ?? '0.02,0.1,0.3,0.55,0.8').split(',').map(Number);
    let elapsed = 0;
    for (const [i, m] of marks.entries()) {
      const at = total * m;
      await page.waitForTimeout(Math.max(0, at - elapsed));
      elapsed = at;
      await shot(page, `r${i + 1}`, phone);
      if (process.env.GEN_REPLAY_STOP) {
        await page
          .getByRole('button', { name: 'Stop generating' })
          .locator('visible=true')
          .first()
          .click();
        await expect(page.getByText('Generation stopped')).toBeVisible();
        await shot(page, 'r-stopped', phone);
        return;
      }
    }
    await page.waitForTimeout(Math.max(0, total - elapsed));
    if (!process.env.GEN_REPLAY_FAIL_AT) {
      // setTimeout clamping makes a replay drift a few seconds behind the recording.
      await expect(page.getByText(/Your plan is ready/).first()).toBeVisible({ timeout: 60_000 });
    }
    await page.waitForTimeout(1500);
    await shot(page, 'r-end', phone);
    if (process.env.GEN_REPLAY_FAIL_AT) return;
    // Scroll the sheet body to the timeline and the sources.
    await page.getByRole('heading', { name: 'Activity timeline' }).scrollIntoViewIfNeeded();
    await shot(page, 'r-end-timeline', phone);
    await page.getByRole('heading', { name: 'Regulation sources' }).last().scrollIntoViewIfNeeded();
    await shot(page, 'r-end-sources', phone);
    expect(errors).toEqual([]);
  });
}
