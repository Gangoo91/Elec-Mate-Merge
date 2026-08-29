import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:8082';
const OUT = '/private/tmp/claude-501/-Users-andrewmoore/a7558e23-4008-488c-b2b2-9559ba5f8197/scratchpad';

test('import page — mobile and desktop', async ({ browser }) => {
  for (const [name, size] of [
    ['mobile', { width: 390, height: 844 }],
    ['desktop', { width: 1440, height: 900 }],
  ] as const) {
    const ctx = await browser.newContext({
      storageState: 'e2e/.auth/user.json',
      viewport: size,
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    page.on('console', (m) => m.type() === 'error' && console.log(`[${name}] console: ${m.text().slice(0,160)}`));
    await page.goto(`${BASE}/electrician/inspection-testing/import`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/import-${name}-1.png`, fullPage: true });

    // Step 2 — pick a cert type to reach the upload screen.
    const eicr = page.getByRole('button', { name: /EICR/i }).first();
    if (await eicr.count()) {
      await eicr.click();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/import-${name}-2.png`, fullPage: true });
    }
    console.log(`[${name}] url=${page.url()}`);
    await ctx.close();
  }
});
