/**
 * Journey 53 — capture works offline end to end (ELE-1894).
 *
 * In airplane mode (context.setOffline) the learner photographs a board (and,
 * at desktop width, adds a 6 MB video), saves, and sees it "Waiting to sync".
 * Nothing reaches the server. The app is then closed. When it is opened again
 * with signal the outbox sends it by itself: one portfolio row, every file in
 * storage with its fingerprint, the queue empty.
 *
 * Writes (fixture learner only, deleted by id at the end): one portfolio item
 * per viewport and its files in the portfolio-evidence bucket. The insert also
 * leaves the append-only portfolio_audit_events rows every evidence write leaves.
 *
 * Not covered here, and still to do on a real phone: a 50 MB video in true
 * airplane mode, and sending with the app closed (needs a native background
 * task the app does not ship yet).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage, RUN } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.CAPTURE_SHOTS;
const BOARD = fs.readFileSync(path.resolve('public/images/site-photos/consumer-unit-eic.jpg'));

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

/** What is in the on-phone outbox, read straight from IndexedDB. */
async function outboxContents(page: Page) {
  return page.evaluate(
    () =>
      new Promise<
        Array<{ id: string; title: string; files: number; bytes: number; state: string }>
      >((resolve) => {
        const req = indexedDB.open('elecmate-capture-outbox', 1);
        req.onerror = () => resolve([]);
        req.onsuccess = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains('items')) return resolve([]);
          const all = db.transaction('items', 'readonly').objectStore('items').getAll();
          all.onsuccess = () =>
            resolve(
              (
                all.result as Array<{
                  id: string;
                  state: string;
                  entry: { title: string };
                  files: Array<{ blob: Blob }>;
                }>
              ).map((i) => ({
                id: i.id,
                title: i.entry.title,
                files: i.files.length,
                bytes: i.files.reduce((n, f) => n + (f.blob?.size ?? 0), 0),
                state: i.state,
              }))
            );
          all.onerror = () => resolve([]);
        };
      })
  );
}

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`a capture made with no signal is kept, then syncs (${viewport})`, async ({ browser }) => {
    const l = await actor('learner');
    const title = `${RUN} offline board ${viewport}`;
    const { context, page } = await signedInPage(browser, 'learner', viewport);
    const errors: string[] = [];
    let itemId: string | null = null;
    try {
      await page.goto('/apprentice/hub?capture=1&preset=photo');
      const dialog = page.getByRole('dialog').first();
      await expect(dialog.getByText('Capture · Photo').first()).toBeVisible();

      // ── Airplane mode on.
      await context.setOffline(true);
      await expect(dialog.getByTestId('capture-offline')).toBeVisible();

      await page.locator('input[type="file"][accept="image/*"]').setInputFiles({
        name: `${RUN}-board.jpg`,
        mimeType: 'image/jpeg',
        buffer: BOARD,
      });
      if (!phone) {
        await page
          .locator('input[type="file"]:not([accept="image/*"])')
          .setInputFiles({
            name: `${RUN}-clip.mp4`,
            mimeType: 'video/mp4',
            buffer: crypto.randomBytes(6 * 1024 * 1024),
          });
      }
      await expect(dialog.getByText('On this phone').first()).toBeVisible();
      await dialog.getByPlaceholder('What is this evidence?').fill(title);
      await shot(page, 'c53-offline-details', phone);
      await dialog.getByRole('button', { name: 'Save evidence' }).click();
      const anyway = page.getByRole('button', { name: 'Save anyway' });
      if (await anyway.isVisible({ timeout: 4000 }).catch(() => false)) await anyway.click();
      await expect(page.getByText('Saved on this phone').first()).toBeVisible();

      // Visible queue state, and the blobs really are in IndexedDB.
      const strip = page.getByTestId('capture-outbox').first();
      await expect(strip).toBeVisible();
      await expect(strip.getByText('Waiting to sync')).toBeVisible();
      await expect(strip.getByText(title)).toBeVisible();
      await shot(page, 'c53-waiting-to-sync', phone);
      const queued = await outboxContents(page);
      const mine = queued.find((q) => q.title === title);
      expect(mine, 'the capture is in the outbox').toBeTruthy();
      expect(mine!.files).toBe(phone ? 1 : 2);
      expect(mine!.bytes).toBeGreaterThan(phone ? BOARD.length - 1 : 6 * 1024 * 1024);
      itemId = mine!.id;

      // Nothing has reached the server.
      const { data: none } = await l.db.from('portfolio_items').select('id').eq('id', itemId);
      expect(none ?? []).toHaveLength(0);

      // ── The app is closed on site, and opened again back in signal.
      await page.close();
      await context.setOffline(false);
      const page2 = await context.newPage();
      page2.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
      await page2.goto('/apprentice/hub');

      await expect
        .poll(
          async () => {
            const { data } = await l.db.from('portfolio_items').select('id').eq('id', itemId!);
            return (data ?? []).length;
          },
          { timeout: 90_000, intervals: [2000] }
        )
        .toBe(1);
      await expect(page2.getByText(/Synced to your portfolio/).first()).toBeVisible({
        timeout: 20_000,
      });
      await expect(page2.getByTestId('capture-outbox')).toHaveCount(0, { timeout: 20_000 });
      await shot(page2, 'c53-synced', phone);
      expect(await outboxContents(page2)).toEqual([]);

      const { data: row } = await l.db
        .from('portfolio_items')
        .select('id, title, source, status, storage_urls')
        .eq('id', itemId)
        .single();
      const r = row as {
        title: string;
        source: string;
        status: string;
        storage_urls: Array<{ url: string; sha256?: string; evidenceType?: string }>;
      };
      expect(r.title).toBe(title);
      expect(r.source).toBe('photo');
      expect(r.status).toBe('draft');
      expect(r.storage_urls).toHaveLength(phone ? 1 : 2);
      for (const f of r.storage_urls) {
        expect(f.sha256, 'each file is fingerprinted').toMatch(/^[0-9a-f]{64}$/);
        const head = await fetch(f.url, { method: 'HEAD' });
        expect(head.status, f.url).toBe(200);
      }
      const boardHash = crypto.createHash('sha256').update(BOARD).digest('hex');
      expect(
        r.storage_urls.some((f) => f.sha256 === boardHash),
        'the photo arrived byte for byte'
      ).toBe(true);
      expect(errors, errors.join('\n')).toEqual([]);
    } finally {
      await context.setOffline(false).catch(() => undefined);
      if (itemId) {
        const { data: row } = await l.db
          .from('portfolio_items')
          .select('storage_urls')
          .eq('id', itemId)
          .maybeSingle();
        const paths = (
          ((row as { storage_urls?: Array<{ url: string }> } | null)?.storage_urls ?? []) as Array<{
            url: string;
          }>
        )
          .map((f) => f.url.split('/portfolio-evidence/')[1])
          .filter(Boolean);
        await l.db.from('portfolio_items').delete().eq('id', itemId);
        // Files from a run that never synced are still named after the item.
        const { data: listed } = await l.db.storage
          .from('portfolio-evidence')
          .list(l.userId, { search: itemId });
        for (const o of listed ?? []) paths.push(`${l.userId}/${o.name}`);
        if (paths.length)
          await l.db.storage.from('portfolio-evidence').remove(Array.from(new Set(paths)));
      }
      await context.close();
    }
  });
}
