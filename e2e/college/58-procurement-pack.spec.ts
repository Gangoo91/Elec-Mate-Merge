/**
 * ELE-1972 / ELE-1915 — the security and procurement pack at /college/trust.
 *
 * As the fixture tutor: every document opens and reads, the data-flow diagram
 * draws, placeholders are marked, the pack is linked from Settings and Help,
 * and both downloads produce a self-contained HTML file with the right
 * contents. Read-only: nothing is written.
 */
import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import { haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const DOCS = [
  'Security and data processing',
  'Data protection impact assessment (template)',
  'Sub-processor list',
  'Data-flow diagram',
  'Learners under 18',
  'Accessibility statement',
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`the pack reads and downloads (${viewport})`, async ({ browser }) => {
    test.setTimeout(4 * 60_000);
    const { page, context, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto('/college/trust');
    await expect(page.getByRole('heading', { name: 'Security and procurement pack' })).toBeVisible({
      timeout: 60_000,
    });

    const nav = page.getByRole('navigation', { name: 'Documents in the pack' });
    for (const title of DOCS) {
      await nav
        .getByRole('button', { name: new RegExp(`^${title.replace(/[()]/g, '\\$&')}`) })
        .click();
      await expect(page.locator('#trust-doc-title')).toHaveText(title);
    }

    // Facts that must be there, and must not drift.
    await nav.getByRole('button', { name: /^Security and data processing/ }).click();
    const doc = page.locator('#trust-doc');
    await expect(doc).toContainText('London, United Kingdom (AWS eu-west-2)');
    await expect(doc).toContainText('[Company registration number]');

    await nav.getByRole('button', { name: /^Sub-processor list/ }).click();
    for (const name of ['Supabase', 'OpenAI', 'PDFMonkey', 'Brevo', 'Sentry', 'Vercel']) {
      await expect(doc).toContainText(name);
    }

    await nav.getByRole('button', { name: /^Data-flow diagram/ }).click();
    await expect(doc.getByRole('img', { name: 'Elec-Mate College Hub data flow' })).toBeVisible();

    // One document.
    await nav.getByRole('button', { name: /^Data protection impact assessment/ }).click();
    const [one] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('trust-download-one').click(),
    ]);
    expect(one.suggestedFilename()).toBe(
      'Elec-Mate - Data protection impact assessment (template).html'
    );
    const oneHtml = fs.readFileSync((await one.path())!, 'utf8');
    expect(oneHtml).toContain('<!doctype html>');
    expect(oneHtml).toContain('Data protection impact assessment (template)');
    expect(oneHtml).toContain('<mark>[Name, role]</mark>');
    expect(oneHtml).not.toContain('Sub-processor list</h1>');

    // The full pack.
    const [all] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('trust-download-all').click(),
    ]);
    expect(all.suggestedFilename()).toBe('Elec-Mate - College security and procurement pack.html');
    const allHtml = fs.readFileSync((await all.path())!, 'utf8');
    for (const title of DOCS) expect(allHtml).toContain(`<h1>${title.replace('&', '&amp;')}</h1>`);
    expect(allHtml).toContain('<svg');

    // Linked from Settings and Help.
    await page.goto('/college?section=collegesettings');
    await expect(page.getByText('Security and procurement', { exact: true }).first()).toBeVisible({
      timeout: 60_000,
    });
    await page.goto('/college/help');
    await expect(page.getByText(/security, DPIA and accessibility documents/).first()).toBeVisible({
      timeout: 60_000,
    });

    if (viewport === 'phone') {
      await page.goto('/college/trust');
      await page.waitForLoadState('networkidle').catch(() => undefined);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }

    expect(errors).toEqual([]);
    await context.close();
  });
}
