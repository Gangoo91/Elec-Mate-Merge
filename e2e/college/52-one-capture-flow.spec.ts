/**
 * Journey 52 — one capture flow (ELE-1916).
 *
 * UnifiedCaptureSheet is the one way evidence is created. Every entry point
 * opens it with a preset; the row it writes always has a source, status draft
 * and the preset's category. The daily reflection no longer writes the
 * portfolio itself: it goes through the same create path, and its OTJ hours
 * are written once, never doubled.
 *
 * Writes (fixture learner only, deleted by id at the end): one reflection
 * from the capture sheet, one quick reflection (plus its OTJ hours when the
 * cohort tutor is a fixture account). Each insert also leaves the
 * append-only portfolio_audit_events rows every evidence write leaves.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import {
  actor,
  admin,
  adminAvailable,
  haveCreds,
  learnersCohortTutorEmail,
  lit,
  signedInPage,
  FIXTURE_EMAIL,
  RUN,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.CAPTURE_SHOTS;

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(600);
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

const PRESET_LABELS: Record<string, { label: string; title: RegExp }> = {
  photo: { label: 'Photo', title: /Capture on site/ },
  reflection: { label: 'Reflection', title: /Write a reflection/ },
  diary_entry: { label: 'Diary entry', title: /Add a diary entry/ },
  worksheet: { label: 'Worksheet', title: /Add a worksheet/ },
  from_job: { label: 'From a job', title: /Capture this job/ },
};

test('the retired capture paths are gone, with zero importers', () => {
  const gone = [
    'src/components/apprentice-hub/FilePortfolioItemSheet.tsx',
    'src/components/apprentice/portfolio/TimeEntryToPortfolioDialog.tsx',
    'src/hooks/portfolio/useTimeToPortfolio.tsx',
    'src/components/apprentice/portfolio/UniversalPortfolioButton.tsx',
  ];
  for (const f of gone) expect(fs.existsSync(path.resolve(f)), f).toBe(false);
  const names = [
    'FilePortfolioItemSheet',
    'TimeEntryToPortfolioDialog',
    'useTimeToPortfolio',
    'UniversalPortfolioButton',
  ];
  const offenders: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(e.name)) {
        const s = fs.readFileSync(p, 'utf8');
        for (const n of names)
          if (new RegExp(`import[^;]*\\b${n}\\b`).test(s)) offenders.push(`${p}: ${n}`);
        // Nothing but the one create path inserts portfolio evidence from these surfaces.
        if (/QuickReflectionSheet\.tsx$/.test(p) && /from\('portfolio_items'\)\s*\.insert/.test(s))
          offenders.push(`${p}: direct portfolio_items insert`);
      }
    }
  };
  walk(path.resolve('src'));
  expect(offenders, offenders.join('\n')).toEqual([]);
  // The edit form has no create mode.
  const form = fs.readFileSync(
    path.resolve('src/components/apprentice/portfolio/PortfolioEntryForm.tsx'),
    'utf8'
  );
  expect(form).not.toMatch(/Create entry|New portfolio entry/);
});

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`every preset opens the one capture sheet (${viewport})`, async ({ browser }) => {
    const { context, page, errors } = await signedInPage(browser, 'learner', viewport);
    for (const [preset, meta] of Object.entries(PRESET_LABELS)) {
      await page.goto(`/apprentice/hub?capture=1&preset=${preset}`);
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText(`Capture · ${meta.label}`).first()).toBeVisible();
      await expect(dialog.getByText(meta.title).first()).toBeVisible();
      await shot(page, `c52-preset-${preset}`, phone);
      await page.keyboard.press('Escape');
    }
    // The test sheet preset opens straight onto your test results.
    await page.goto('/apprentice/hub?capture=1&preset=test_sheet');
    await expect(page.getByText(/test results/i).first()).toBeVisible();
    await shot(page, 'c52-preset-test_sheet', phone);
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });
}

test('a reflection from the capture sheet is one row with its source, status and category', async ({
  browser,
}) => {
  const l = await actor('learner');
  const title = `${RUN} capture reflection`;
  const { context, page, errors } = await signedInPage(browser, 'learner', 'desktop');
  let id: string | null = null;
  try {
    await page.goto('/apprentice/hub?capture=1&preset=reflection');
    const dialog = page.getByRole('dialog').first();
    await expect(dialog.getByText('Capture · Reflection').first()).toBeVisible();
    await dialog.getByPlaceholder('What is this evidence?').fill(title);
    await dialog
      .getByTestId('capture-reflection')
      .fill(
        'I helped second fix a kitchen ring final today and checked polarity at each socket before we energised it.'
      );
    await dialog.getByRole('button', { name: 'Save evidence' }).click();
    const anyway = page.getByRole('button', { name: 'Save anyway' });
    if (await anyway.isVisible({ timeout: 4000 }).catch(() => false)) await anyway.click();
    await expect(page.getByText(/Evidence saved|Added to portfolio/).first()).toBeVisible();

    await expect
      .poll(async () => {
        const { data } = await l.db
          .from('portfolio_items')
          .select('id')
          .eq('user_id', l.userId)
          .eq('title', title);
        return (data ?? []).length;
      })
      .toBe(1);
    const { data } = await l.db
      .from('portfolio_items')
      .select('id, source, status, category, reflection_notes')
      .eq('user_id', l.userId)
      .eq('title', title)
      .single();
    const row = data as {
      id: string;
      source: string;
      status: string;
      category: string;
      reflection_notes: string;
    };
    id = row.id;
    expect(row.source).toBe('reflection');
    expect(row.status).toBe('draft');
    expect(row.category).toBe('Reflection & Learning');
    expect(row.reflection_notes).toMatch(/polarity/);
    expect(errors, errors.join('\n')).toEqual([]);
  } finally {
    if (id) await l.db.from('portfolio_items').delete().eq('id', id);
    else await l.db.from('portfolio_items').delete().eq('user_id', l.userId).eq('title', title);
    await context.close();
  }
});

test('the daily reflection writes one portfolio row and its hours once', async ({ browser }) => {
  const l = await actor('learner');
  const tutorEmail = await learnersCohortTutorEmail().catch(() => null);
  const otjAllowed = !!tutorEmail && FIXTURE_EMAIL.test(tutorEmail) && adminAvailable();
  const headline = `${RUN} quick reflection on a CU change`;
  const { context, page, errors } = await signedInPage(browser, 'learner', 'desktop');
  try {
    await page.goto('/apprentice/college/voice');
    await page
      .getByRole('button', { name: /Capture today|Add another reflection/ })
      .first()
      .click();
    const dialog = page.getByRole('dialog').first();
    await expect(dialog.getByText('Daily reflection').first()).toBeVisible();
    await dialog
      .locator('#reflection-text')
      .fill(`${headline}\nI isolated, proved dead and labelled every circuit.`);
    const otj = dialog.getByRole('checkbox').first();
    if (await otj.isVisible().catch(() => false)) {
      const checked = (await otj.getAttribute('data-state')) === 'checked';
      if (checked !== otjAllowed) await otj.click();
      if (otjAllowed) await dialog.getByRole('button', { name: '15m' }).click();
    }
    await dialog.getByRole('button', { name: 'Save reflection' }).click();
    await expect(page.getByText(/Reflection saved/).first()).toBeVisible();

    await expect
      .poll(async () => {
        const { data } = await l.db
          .from('portfolio_items')
          .select('id')
          .eq('user_id', l.userId)
          .like('reflection_notes', `${RUN}%`);
        return (data ?? []).length;
      })
      .toBe(1);
    const { data: item } = await l.db
      .from('portfolio_items')
      .select('id, source, status, category, date_completed')
      .eq('user_id', l.userId)
      .like('reflection_notes', `${RUN}%`)
      .single();
    const it = item as {
      id: string;
      source: string;
      status: string;
      category: string;
      date_completed: string | null;
    };
    expect(it.source).toBe('reflection');
    expect(it.status).toBe('draft');
    expect(it.category).toBe('Reflection & Learning');
    expect(it.date_completed, 'dated for the reflection streak').not.toBeNull();
    if (otjAllowed) {
      const otjRows = admin<{ id: string }>(
        `select id from public.college_otj_entries where student_id = ${lit(l.userId)} and title like ${lit(`Reflection · ${RUN}%`)}`
      );
      expect(otjRows.length, 'hours written exactly once').toBe(1);
    }
    expect(errors, errors.join('\n')).toEqual([]);
  } finally {
    if (adminAvailable()) {
      admin(
        `delete from public.college_otj_entries where student_id = ${lit(l.userId)} and title like ${lit(`Reflection · ${RUN}%`)}`
      );
    }
    await l.db
      .from('portfolio_items')
      .delete()
      .eq('user_id', l.userId)
      .like('reflection_notes', `${RUN}%`);
    await context.close();
  }
});
