/**
 * Journey 63 — the employer verifies each behaviour for gateway, in the
 * no-login employer portal (ELE-2040, DfE behaviour verification guidance).
 *
 *  1. Database: the behaviours come from the catalogue for the learner's
 *     standard version (never written in code); a learner whose start date has
 *     no recorded version (the revised ST0152 plan from 17 Dec 2026) gets no
 *     behaviours and no checklist; the sign RPC refuses a bad link, a changed
 *     list, a missing example; a signed checklist is never edited.
 *  2. Journey (desktop + phone): the fixture employer opens their portal link,
 *     rates every behaviour on the guidance's scale with an example, types
 *     name and role, signs. The card then shows who signed. The tutor sees the
 *     checklist in Student 360 (EPA readiness), which also feeds the gateway pack.
 * The portal link made for the test and every verification are deleted.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import {
  admin,
  adminAvailable,
  haveCreds,
  learnerContext,
  lit,
  londonDate,
  signedInPage,
  SUPABASE_URL,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
// Real Chrome, as the design checks are made in (docs/college-mobile-standard.md).
test.use({ channel: 'chrome' });
test.setTimeout(240_000);

const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const anon = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
const OUT = process.env.W3_SHOTS;
const PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(600);
  if (OUT) await page.screenshot({ path: `${OUT}/${name}-${phone ? 'phone' : 'desk'}.png` });
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

interface Portal {
  ok?: boolean;
  error?: string;
  behaviours: Array<{ code: string; title: string; description: string | null }> | null;
  behaviours_hash: string | null;
  standard: { code: string; version: string } | null;
  gaps: string[];
  current: { signer_name: string; items: unknown[] } | null;
}

/** A portal link for the fixture employer (the learner's employer), made for this run. */
async function makeLink(): Promise<{ token: string; studentId: string; employerId: string }> {
  const ctx = await learnerContext();
  const emp = admin<{ employer_id: string; email: string }>(
    `select s.employer_id, e.contact_email as email from public.college_students s join public.college_employers e on e.id = s.employer_id where s.id = ${lit(ctx.student_id)}`
  )[0];
  expect(emp?.employer_id, 'the fixture learner has an employer').toBeTruthy();
  expect(emp.email).toMatch(/^founder\+collegedemo-/);
  const token = `e2e-bv-${crypto.randomBytes(16).toString('hex')}`;
  admin(
    `insert into public.college_employer_tokens (employer_id, token, purpose, expires_at) values (${lit(emp.employer_id)}, ${lit(token)}, 'employer_view', now() + interval '2 hours')`
  );
  return { token, studentId: ctx.student_id, employerId: emp.employer_id };
}

function cleanup(token: string, studentId: string, since: string) {
  admin(`
    delete from public.epa_behaviour_verifications where college_student_id = ${lit(studentId)} and created_at >= ${lit(since)};
    delete from public.college_employer_tokens where token = ${lit(token)};
  `);
  const left = admin<{ n: number }>(
    `select (select count(*) from public.epa_behaviour_verifications where college_student_id = ${lit(studentId)} and created_at >= ${lit(since)}) + (select count(*) from public.college_employer_tokens where token = ${lit(token)}) as n`
  );
  expect(Number(left[0]?.n ?? 0)).toBe(0);
}

test('database: catalogue behaviours by version, the sign rules, never edited', async () => {
  test.skip(!adminAvailable(), 'Needs the Supabase CLI');
  const since = new Date(Date.now() - 2000).toISOString();
  const { token, studentId } = await makeLink();
  try {
    const { data } = await anon.rpc('employer_portal_behaviours', {
      p_token: token,
      p_student: studentId,
    } as never);
    const p = data as unknown as Portal;
    expect(p.ok).toBe(true);
    // The catalogue, exactly: same codes and wording as apprenticeship_ksbs for this standard version.
    const cat = admin<{ code: string; title: string }>(`
      select distinct on (k.ksb_code) k.ksb_code as code, k.title
        from public.apprenticeship_ksbs k
        join public.qualifications kq on kq.id = k.qualification_id
        join public.standard_qualifications sq on sq.qualification_code = kq.code
        join public.apprenticeship_standards s on s.id = sq.standard_id
       where k.ksb_type = 'behaviour' and s.code = ${lit(p.standard!.code)} and s.version = ${lit(p.standard!.version)}
       order by k.ksb_code, k.created_at`);
    expect(p.behaviours!.map((b) => `${b.code}|${b.title}`).sort()).toEqual(
      cat.map((c) => `${c.code}|${c.title}`).sort()
    );
    expect(p.behaviours!.length).toBeGreaterThan(0);

    // A start date with no recorded version: no behaviours, never another plan's wording.
    const revised = admin<{ c: Portal }>(`
      begin;
      update public.college_students set start_date = '2027-01-11' where id = ${lit(studentId)};
      select public._behaviour_catalogue(${lit(studentId)}) as c;
      rollback;`);
    const r = revised[revised.length - 1]?.c;
    expect(r?.behaviours ?? null).toBeNull();
    expect(r?.gaps).toContain('standard_version_for_date');
    const back = admin<{ start_date: string }>(
      `select start_date::text from public.college_students where id = ${lit(studentId)}`
    );
    expect(back[0].start_date).not.toBe('2027-01-11');

    const items = p.behaviours!.map((b) => ({
      code: b.code,
      rating: 'consistent',
      evidence: `Seen on site: ${b.title} every week.`,
    }));
    const sign = (over: Record<string, unknown>) =>
      anon.rpc('employer_portal_sign_behaviours', {
        p_token: token,
        p_student: studentId,
        p_behaviours_hash: p.behaviours_hash,
        p_items: items,
        p_name: 'Fixture Manager',
        p_role: 'Contracts manager',
        p_signature: PNG,
        ...over,
      } as never);
    expect(
      ((await sign({ p_token: 'nope-nope-nope-nope' })).data as { error?: string }).error
    ).toMatch(/not valid/);
    expect(((await sign({ p_behaviours_hash: 'x' })).data as { error?: string }).error).toMatch(
      /changed/
    );
    expect(((await sign({ p_items: items.slice(1) })).data as { error?: string }).error).toMatch(
      /every behaviour/
    );
    expect(
      (
        (await sign({ p_items: [{ ...items[0], evidence: 'ok' }, ...items.slice(1)] })).data as {
          error?: string;
        }
      ).error
    ).toMatch(/short example/);
    const ok = (await sign({})).data as {
      success?: boolean;
      id?: string;
      all_consistent?: boolean;
    };
    expect(ok.success).toBe(true);
    expect(ok.all_consistent).toBe(true);
    // Signed is never edited.
    expect(() =>
      admin(
        `update public.epa_behaviour_verifications set items = '[]'::jsonb where id = ${lit(ok.id!)}`
      )
    ).toThrow();
    // A second signature supersedes the first.
    const ok2 = (await sign({ p_name: 'Fixture Manager Two' })).data as {
      success?: boolean;
      id?: string;
    };
    expect(ok2.success).toBe(true);
    const rows = admin<{ id: string; superseded_by: string | null }>(
      `select id, superseded_by from public.epa_behaviour_verifications where id in (${lit(ok.id!)}, ${lit(ok2.id!)})`
    );
    expect(rows.find((x) => x.id === ok.id)?.superseded_by).toBe(ok2.id);
  } finally {
    cleanup(token, studentId, since);
  }
});

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`employer rates every behaviour and signs; the tutor sees it (${viewport})`, async ({
    browser,
  }) => {
    test.skip(!adminAvailable(), 'Needs the Supabase CLI');
    const since = new Date(Date.now() - 2000).toISOString();
    const { token, studentId } = await makeLink();
    try {
      const context = await browser.newContext(
        phone
          ? {
              viewport: { width: 390, height: 844 },
              isMobile: true,
              hasTouch: true,
              locale: 'en-GB',
            }
          : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
      );
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
      await page.goto(`/employer-view/${token}`);
      const card = page.getByTestId('behaviour-verification').first();
      await expect(card).toBeVisible({ timeout: 30_000 });
      await card.scrollIntoViewIfNeeded();
      await shot(page, 'w63-portal', phone);
      await card.getByTestId('behaviours-open').click();
      const sheet = page.getByRole('dialog').first();
      const list = sheet.getByTestId('behaviours-list');
      await expect(list).toBeVisible();
      const n = await list.locator('> li').count();
      expect(n).toBeGreaterThan(0);
      const sign = sheet.getByTestId('behaviours-sign');
      await expect(sign).toBeDisabled();
      for (let i = 0; i < n; i++) {
        const li = list.locator('> li').nth(i);
        await li
          .getByRole('radio', { name: i === 0 ? 'Developing' : 'Consistently demonstrated' })
          .click();
        await li
          .locator('textarea')
          .fill(`On the school rewire they showed this, example ${i + 1}.`);
      }
      await sheet.locator('#bv-name').fill('Fixture Manager');
      await sheet.locator('#bv-role').fill('Contracts manager');
      const canvas = sheet.locator('canvas').first();
      await canvas.scrollIntoViewIfNeeded();
      const box = (await canvas.boundingBox())!;
      await page.mouse.move(box.x + 20, box.y + 40);
      await page.mouse.down();
      await page.mouse.move(box.x + 140, box.y + 90, { steps: 8 });
      await page.mouse.up();
      await expect(sign).toBeEnabled();
      await list.locator('> li').first().scrollIntoViewIfNeeded();
      await shot(page, 'w63-checklist', phone);
      await sign.click();
      await expect(card).toContainText('Signed by Fixture Manager', { timeout: 20_000 });
      await expect(card).toContainText(`${n - 1} of ${n} consistently demonstrated`);
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();

      const row = admin<{
        items: Array<{ rating: string }>;
        all_consistent: boolean;
        standard_version: string;
        behaviours: unknown[];
      }>(
        `select items, all_consistent, standard_version, behaviours from public.epa_behaviour_verifications where college_student_id = ${lit(studentId)} and superseded_at is null and created_at >= ${lit(since)}`
      )[0];
      expect(row.items).toHaveLength(n);
      expect(row.behaviours).toHaveLength(n);
      expect(row.all_consistent).toBe(false);
      expect(row.standard_version).toBeTruthy();

      const tut = await signedInPage(browser, 'tutor', viewport);
      await tut.page.goto(`/college?section=student360&studentId=${studentId}#epa`);
      const bv = tut.page.getByTestId('behaviour-verification-card');
      await expect(bv).toBeVisible({ timeout: 30_000 });
      await expect(bv).toContainText('Signed by Fixture Manager, Contracts manager');
      await expect(bv).toContainText('Developing');
      await bv.scrollIntoViewIfNeeded();
      await shot(tut.page, 'w63-tutor', phone);
      expect(tut.errors, tut.errors.join('\n')).toEqual([]);
      await tut.context.close();
    } finally {
      cleanup(token, studentId, since);
    }
  });
}

/* ── ELE-2049 + ELE-2040 prompt: AM2 practice on the employer page, and the
      behaviour sign-off line in the Monday email ───────────────────────────
   The fixture learner gets one fault finding tag (today) and a gateway 60 days
   out for the run; both are deleted after. The weekly email is BUILT with
   { action: 'digest_preview' } (service role) — it sends nothing and writes
   nothing; the test checks no send was logged and last_digest_at is unchanged. */
const EM_OUT = '/tmp/em-qa/employer';

test.describe('employer page: AM2 practice and the behaviour prompt', () => {
  test('AM2 practice renders per area at 360, 390 and 1440; the digest carries the behaviour line', async ({
    browser,
  }) => {
    test.skip(!adminAvailable(), 'Needs the Supabase CLI');
    fs.mkdirSync(EM_OUT, { recursive: true });
    const since = new Date(Date.now() - 2000).toISOString();
    const { token, studentId, employerId } = await makeLink();
    const learner = admin<{ user_id: string; name: string }>(
      `select user_id, name from public.college_students where id = ${lit(studentId)}`
    )[0];
    const first = learner.name.split(' ')[0];
    const existingEpa = admin<{ n: number }>(
      `select count(*)::int as n from public.college_epa where student_id = ${lit(studentId)}`
    )[0];
    test.skip(
      Number(existingEpa?.n ?? 0) > 0,
      'The fixture learner already has an EPA row; not overwriting it'
    );
    const signed = admin<{ n: number }>(
      `select count(*)::int as n from public.epa_behaviour_verifications where college_student_id = ${lit(studentId)} and superseded_at is null`
    )[0];
    test.skip(Number(signed?.n ?? 0) > 0, 'The fixture learner already has a signed checklist');
    const gateway = londonDate(60);
    const tagSource = crypto.randomUUID();
    const before = admin<{ last: string | null; logs: number }>(
      `select (select last_digest_at::text from public.college_employers where id = ${lit(employerId)}) as last,
              (select count(*)::int from public.email_logs where template = 'college_employer_digest' and created_at >= ${lit(since)}) as logs`
    )[0];
    try {
      admin(`
        insert into public.am2_exposure_tags (learner_id, source_kind, source_id, area, state, activity_date, tagged_role)
        values (${lit(learner.user_id)}, 'diary', ${lit(tagSource)}, 'fault_finding', 'tagged', current_date, 'staff');
        insert into public.college_epa (student_id, status, gateway_date) values (${lit(studentId)}, 'Not Started', ${lit(gateway)});
      `);

      // 1. The page, three widths, real Chrome.
      for (const vp of [
        { name: '360', width: 360, height: 780, phone: true },
        { name: '390', width: 390, height: 844, phone: true },
        { name: '1440', width: 1440, height: 900, phone: false },
      ]) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          ...(vp.phone ? { isMobile: true, hasTouch: true } : {}),
          locale: 'en-GB',
        });
        // Screenshots without the cookie banner over the page (an essential-only choice).
        await context.addInitScript(() => {
          try {
            localStorage.setItem('elec-mate-cookie-consent', 'true');
            localStorage.setItem(
              'elec-mate-cookie-preferences',
              JSON.stringify({ essential: true, analytics: false, marketing: false })
            );
          } catch {
            /* private mode */
          }
        });
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
        await page.goto(`/employer-view/${token}`);
        const section = page.getByTestId('am2-exposure').first();
        await expect(section).toBeVisible({ timeout: 30_000 });
        await expect(section).toContainText('Practice for the final practical test');
        await expect(section).toContainText('Safe isolation');
        await expect(section).toContainText('Inspection and testing');
        await expect(section).toContainText('Fault finding');
        const ff = section.getByTestId('am2-area-fault_finding');
        await expect(ff).toContainText('1');
        await expect(ff).toContainText('Last done');
        // One is fewer than enough: the suggestion shows for every area.
        await expect(ff).toContainText('first go at finding the fault');
        await expect(section.getByTestId('am2-area-safe_isolation')).toContainText(
          'None recorded yet'
        );
        await expect(section.getByTestId('am2-area-safe_isolation')).toContainText('prove it dead');
        await expect(section).toContainText('ask them to add it');
        // No jargon: no task codes, no app words.
        const text = (await section.innerText()) ?? '';
        expect(text).not.toMatch(/\bA1\b|NET|tagged|exposure/);
        // Every bit of text is white (no grey).
        const greys = await section.evaluate((el) =>
          Array.from(el.querySelectorAll('p, span'))
            .map((n) => getComputedStyle(n).color)
            .filter((c) => !/^rgb\(255, 255, 255\)$|^rgb\(253, 186, 116\)$/.test(c))
        );
        expect(greys, `non-white text: ${greys.join(', ')}`).toEqual([]);
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${EM_OUT}/employer-page-${vp.name}-top.png` });
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${EM_OUT}/employer-page-${vp.name}-am2.png` });
        if (vp.width === 1440)
          await page.screenshot({ path: `${EM_OUT}/employer-page-1440-full.png`, fullPage: true });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow, `overflows ${vp.name}px by ${overflow}px`).toBeLessThanOrEqual(1);

        // The email's link (#behaviours-<id>) lands on the behaviour card, marked "Needs you".
        await page.goto(`/employer-view/${token}#behaviours-${studentId}`);
        const card = page.locator(`#behaviours-${studentId}`);
        await expect(card.getByTestId('behaviour-verification')).toBeVisible({ timeout: 30_000 });
        await expect(card).toContainText('Needs you');
        await page.waitForTimeout(900);
        await expect(card).toBeInViewport();
        await page.screenshot({ path: `${EM_OUT}/employer-page-${vp.name}-behaviours-link.png` });
        expect(errors, errors.join('\n')).toEqual([]);
        await context.close();
      }

      // 2. The Monday email, built and not sent.
      const key = admin<{ k: string }>(
        `select decrypted_secret as k from vault.decrypted_secrets where name = 'service_role_key' limit 1`
      )[0]?.k;
      expect(key, 'service role key in the vault').toBeTruthy();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/college-review-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ action: 'digest_preview', employer_id: employerId }),
      });
      const built = (await res.json()) as {
        success?: boolean;
        html?: string;
        behaviour_lines?: string[];
        error?: string;
      };
      expect(built.error ?? null).toBeNull();
      expect(built.success).toBe(true);
      const day = new Date(`${gateway}T12:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/London',
      });
      const line = `${first}'s behaviour sign-off is due before gateway on ${day}`;
      expect(built.behaviour_lines).toContain(line);
      expect(built.html).toContain(line);
      // The employer's own live link (the longest-lived one), straight to the card.
      expect(built.html).toMatch(
        new RegExp(`/employer-view/[0-9a-zA-Z-]+#behaviours-${studentId}"`)
      );
      fs.writeFileSync(`${EM_OUT}/digest-preview.html`, built.html ?? '');

      // Nothing sent, nothing written.
      const after = admin<{ last: string | null; logs: number }>(
        `select (select last_digest_at::text from public.college_employers where id = ${lit(employerId)}) as last,
                (select count(*)::int from public.email_logs where template = 'college_employer_digest' and created_at >= ${lit(since)}) as logs`
      )[0];
      expect(after.last).toBe(before.last);
      expect(after.logs).toBe(before.logs);
    } finally {
      admin(`
        delete from public.am2_exposure_tags where source_id = ${lit(tagSource)};
        delete from public.college_epa where student_id = ${lit(studentId)} and gateway_date = ${lit(gateway)} and created_at >= ${lit(since)};
      `);
      cleanup(token, studentId, since);
      const left = admin<{ n: number }>(
        `select (select count(*) from public.am2_exposure_tags where source_id = ${lit(tagSource)}) + (select count(*) from public.college_epa where student_id = ${lit(studentId)} and created_at >= ${lit(since)}) as n`
      );
      expect(Number(left[0]?.n ?? 0)).toBe(0);
    }
  });
});
