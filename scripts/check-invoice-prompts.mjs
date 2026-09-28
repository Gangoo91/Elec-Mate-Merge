#!/usr/bin/env node
/**
 * check:invoice-prompts
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the money surfaces on a REAL iPhone viewport and a desktop one:
 *
 *   banner      — the Stripe Connect prompt on the invoices page
 *   dropdown    — the Connect block inside the invoice send dropdown
 *   uninvoiced  — accepted-but-never-invoiced quotes (+ single / hostile cases)
 *   schedule    — the shared schedule of tests behind EIC, EICR & Testing-Only
 *
 * For the card surfaces it enforces what CLAUDE.md states:
 *
 *   • 44px minimum touch targets
 *   • no sideways scrolling
 *   • no text under 11px
 *   • no grey text (low-opacity white reads grey and is banned)
 *
 * ⚠️ PLAYWRIGHT, NOT `chrome --headless --window-size`. Chrome enforces a
 * ~485px minimum window on macOS, so a 390px request renders 485 and crops —
 * indistinguishable from real overflow, and it has caused a false bug report
 * here before.
 *
 * ⚠️ app.css is REBUILT every run. A committed stylesheet goes stale the moment
 * a class is added, and then the harness measures a layout that no longer
 * exists.
 *
 * SHOOT=1 also writes screenshots next to the harness.
 */
import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/stripe-render');

let chromium, devices;
try {
  ({ chromium, devices } = await import('playwright'));
} catch {
  console.log('• check:invoice-prompts skipped — playwright is not installed.');
  process.exit(0);
}

await execFileP('npx', ['tailwindcss', '-i', 'src/index.css', '-o', resolve(here, 'app.css'), '--minify'],
  { cwd: root, maxBuffer: 32 * 1024 * 1024 });

await build({
  entryPoints: [resolve(here, 'viewport-harness.tsx')],
  outfile: resolve(here, 'viewport.js'),
  bundle: true,
  jsx: 'automatic',
  resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  alias: {
    '@': resolve(root, 'src'),
    '@/integrations/supabase/client': resolve(here, 'stub-supabase.ts'),
    // Without a provider `useAuth` has nothing to read, and the card bails
    // before rendering — which the harness would report as "did not mount".
    '@/contexts/AuthContext': resolve(here, 'stub-auth.tsx'),
  },
  define: {
    'process.env.NODE_ENV': '"development"',
    // The components read Vite's env directly; without this the bundle throws
    // "Cannot read properties of undefined (reading 'DEV')" before it mounts,
    // and the harness reports a clean page that never rendered.
    'import.meta.env': JSON.stringify({
      DEV: false,
      VITE_SUPABASE_URL: 'https://harness.invalid',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'harness',
    }),
  },
  logLevel: 'error',
  absWorkingDir: root,
});

const problems = [];
const browser = await chromium.launch();

for (const [label, opts, touchRules] of [
  ['mobile', { ...devices['iPhone 14'] }, true],
  ['desktop', { viewport: { width: 1440, height: 1000 } }, false],
]) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();

  for (const which of ['banner', 'dropdown', 'uninvoiced', 'uninvoiced&case=single', 'uninvoiced&case=long', 'schedule', 'quoteitem', 'quotestep', 'creditnote', 'creditnote&case=switch', 'invoicecard', 'invoicecard&case=full']) {
    const id = `${label}/${which.replace('&case=', ':')}`;
    await page.goto(`file://${resolve(here, 'viewport.html')}?which=${which}`);
    await page.waitForTimeout(600);

    /*
     * ELE-1704 — the invoice card's actions live behind a menu, so asserting
     * on `document.body.innerText` with it CLOSED proves nothing: the first
     * version of the "no credit note on a fully-credited invoice" check
     * passed happily with the guard deleted, because the text was never in
     * the DOM either way. Open it.
     */
    if (which.startsWith('invoicecard')) {
      const menu = page.locator('button[aria-label="Invoice actions"]');
      if (await menu.count()) {
        await menu.first().click().catch(() => {});
        await page.waitForTimeout(500);
      }
    }

    // The dropdown only renders its Stripe block once opened.
    if (which.startsWith('dropdown')) {
      const trigger = page.locator('button').first();
      if (await trigger.count()) {
        await trigger.click().catch(() => {});
        await page.waitForTimeout(700);
      }
    }

    /*
     * The schedule of tests is exempt from the CARD rules, and deliberately so.
     *
     * It is a ~30-column certificate grid that scrolls horizontally BY DESIGN
     * — the mobile experience is the same table behind a scroll container, and
     * the ticket for ELE-1770 confirms that is intentional. Measured against
     * the card rules it reports overflow (true and intended), 10.5px column
     * headers and 24px group-collapse toggles.
     *
     * None of that is new: HEAD already carries 54 sub-11px classes in
     * `EnhancedTestResultDesktopTableHeader` and the scroll container in the
     * table, and the ELE-1770 diff adds ZERO lines touching `className` or
     * `TableCell` — it is pure wiring. Reporting them here would be a false
     * alarm of exactly the kind that cost a bogus bug report before.
     *
     * What IS worth enforcing on this surface is that it mounts at all, and
     * that the 1P/3P control the ticket is about actually renders. A crash
     * here takes out EIC, EICR and Testing-Only together, and a typecheck
     * cannot see it.
     */
    /*
     * `schedule` and `quotestep` are exempt from the CARD rules.
     *
     * Both are dense existing surfaces, not cards: the schedule is a ~30
     * column grid that scrolls horizontally by design, and the quote items
     * step carries 24 `text-[10px]` classes at HEAD. The ELE-1770 and
     * ELE-1780 diffs add ZERO lines touching `className` on either — they are
     * pure wiring plus one appended field — so reporting their existing
     * density here would be a false alarm, which has cost a bogus bug report
     * in this repo before.
     *
     * What IS enforced on them is what those tickets are about: that they
     * mount, and that the control each one adds actually renders with the
     * right value.
     */
    const cardRules = !which.startsWith('schedule') && !which.startsWith('quotestep');
    await page.addScriptTag({ content: `window.__touchRules = ${touchRules && cardRules};` });

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const out = { view: de.clientWidth, scroll: de.scrollWidth, over: [], small: [], tiny: [], grey: [], mounted: 0 };
      const all = document.querySelectorAll('body *');
      out.mounted = all.length;
      all.forEach((el) => {
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (b.width > 0 && b.right > de.clientWidth + 1) {
          out.over.push(`${el.tagName}.${String(el.className).slice(0, 40)}`);
        }
        const txt = (el.textContent || '').trim();
        const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
        if (own && txt) {
          const px = parseFloat(cs.fontSize);
          if (px && px < 11) out.tiny.push(`${px}px "${txt.slice(0, 32)}"`);
          // Grey = white text dimmed below ~0.75 alpha, which CLAUDE.md bans.
          const m = cs.color.match(/rgba?\(([^)]+)\)/);
          if (m) {
            const p = m[1].split(',').map((n) => parseFloat(n));
            const a = p.length > 3 ? p[3] : 1;
            const isWhiteish = p[0] > 200 && p[1] > 200 && p[2] > 200;
            if (isWhiteish && a < 0.75) out.grey.push(`a=${a} "${txt.slice(0, 32)}"`);
          }
        }
      });
      if (window.__touchRules) {
        document.querySelectorAll('button,[role="menuitem"],[role="button"],a').forEach((el) => {
          const b = el.getBoundingClientRect();
          if (!b.height || !b.width) return;
          if (b.height < 44) out.small.push(`${Math.round(b.height)}px ${el.tagName} "${(el.textContent||'').trim().slice(0,28)}"`);
        });
      }
      return out;
    });

    if (r.mounted < 5) problems.push(`${id}: did not mount (only ${r.mounted} nodes)`);

    /*
     * ELE-1780 — the arithmetic is the feature. An estimator adding time to a
     * line has to see what it costs AS THEY TYPE, or they are still guessing.
     * The harness rendered the "no hourly rate saved yet" fallback for a while
     * because `useCompanyProfile` reads through an RPC rather than the table —
     * a green check that was testing the empty state.
     */
    if (which.startsWith('quoteitem') || which.startsWith('quotestep')) {
      const text = await page.evaluate(() => document.body.innerText);
      if (!/Add another trade/.test(text)) {
        problems.push(`${id}: the time allowance field did not render`);
      }
      if (/No hourly rate saved yet/.test(text)) {
        problems.push(`${id}: showing the no-rate fallback — the rate never reached the field`);
      }
      if (!/5h total @ 10 × 0\.5h = £225\.00 labour/.test(text)) {
        problems.push(`${id}: the labour arithmetic is wrong or missing`);
      }
      // A grade absent from LABOUR_GRADE_SHORT used to fall back to
      // "Electrician", so the picker showed it twice at different rates —
      // and printed the wrong trade on the customer's PDF.
      const electricianOptions = (text.match(/Electrician —/g) ?? []).length;
      if (electricianOptions > 1) {
        problems.push(`${id}: "Electrician" listed ${electricianOptions}× — a grade is mislabelled`);
      }
      // The grade picker is what makes an apprentice-rate task priceable.
      const grades = await page.evaluate(() =>
        Array.from(document.querySelectorAll('select')).flatMap((s) =>
          Array.from(s.options).map((o) => o.text)
        )
      );
      if (!grades.some((g) => /Electrician/.test(g))) {
        problems.push(`${id}: the labour grade picker did not render`);
      }
      if (!grades.some((g) => /Apprentice/.test(g))) {
        problems.push(`${id}: the grade picker offers no alternative to electrician`);
      }
      if (!grades.some((g) => /\/hr|no rate set/.test(g))) {
        problems.push(`${id}: grades do not show their rate — the choice is uninformed`);
      }
    }

    if (which.startsWith('schedule')) {
      /*
       * Read INPUT VALUES and the phase combobox, not `innerText`.
       * The schedule is a grid of controls: the circuit description lives in
       * an `<input value="EV charger">` and the phase in a Radix combobox, and
       * `innerText` sees neither. Asserting on `innerText` here reported "the
       * circuit rows did not render" against a grid that had rendered 727
       * nodes perfectly well.
       */
      const grid = await page.evaluate(() => ({
        header: /1P\/3P/.test(document.body.innerText),
        values: Array.from(document.querySelectorAll('input')).map((i) => i.value),
        phases: Array.from(document.querySelectorAll('[role="combobox"]')).map((c) => c.textContent || ''),
      }));
      if (!grid.header) problems.push(`${id}: the 1P/3P column header did not render`);
      if (!grid.values.includes('EV charger')) {
        problems.push(`${id}: the circuit rows did not render`);
      }
      if (!grid.phases.includes('3P')) {
        problems.push(`${id}: the 3P circuit does not show 3P in its phase cell`);
      }
      if (r.mounted < 200) problems.push(`${id}: only ${r.mounted} nodes — grid did not fully render`);
    }

    /*
     * Correctness, not layout. The uninvoiced fixture includes a quote that is
     * flagged accepted but was never sent and never signed — the 25-of-33
     * draft case in live data. If it ever renders, the evidence filter has
     * regressed and the card is telling an electrician their client agreed to
     * something they never saw.
     */
    /*
     * The age must LEAD the second line on every row.
     *
     * Note what this can and cannot see: CSS truncation does not change
     * `innerText`, so asking "is the age present" passes even when it is
     * visibly cut off — the first version of this check did exactly that and
     * proved nothing. What is checkable, and what actually guarantees the age
     * survives, is that it comes FIRST. With the client name leading, a long
     * name truncated the age away on the oldest quote (see `case=long`).
     */
    if (which.startsWith('uninvoiced')) {
      const badOrder = await page.evaluate(() =>
        Array.from(document.querySelectorAll('button'))
          .filter((b) => /£/.test(b.innerText || ''))
          .map((b) => ((b.innerText || '').split(/\n+/)[1] || '').trim())
          .filter((line) => line && !/^accepted .+ ago/.test(line)).length
      );
      if (badOrder > 0) {
        problems.push(`${id}: ${badOrder} row(s) do not lead with the age — truncation can eat it`);
      }
    }

    /*
     * ELE-1704 — the credited badge.
     *
     * The generic rules above would stay green if the badge disappeared
     * entirely: they only measure what IS rendered. So the figure is asserted
     * by value. A part credit must show the AMOUNT — "credited" with no
     * number still means opening the invoice to find out what changed — and a
     * full credit must say so in words rather than print a figure that looks
     * like a second charge.
     */
    /*
     * ELE-1704 — the sheet must list the credit notes already raised, and it
     * must NOT count the voided one. Both halves matter: the list is the only
     * route back to the document, and a void note that still counted would
     * quietly shrink what is left to credit.
     */
    if (which === 'creditnote') {
      const body = await page.evaluate(() => document.body.innerText);
      if (!body.includes('Credit/001')) {
        problems.push(`${id}: the credit notes already raised are not listed`);
      }
      /*
       * Assert the SUMMED figure, not the presence of "£120.00" anywhere —
       * the list below prints each note's own total, so a loose substring
       * check passes off the list even when the sum is wrong. It did: with
       * `sumCreditsAgainst` mutated to count voids, the loose version stayed
       * green. Only the minus-prefixed figure is the summary row.
       *
       * £120 issued + £999 VOID, against the £600 `creditableInvoice`. If
       * the void were counted the row would read −£1,119.00 and nothing
       * would be left to credit at all.
       */
      if (!body.includes('\u2212£120.00')) {
        problems.push(`${id}: already-credited is not £120 — a voided note is being counted`);
      }
      if (!body.includes('£480.00')) {
        problems.push(`${id}: still-creditable is not £480 (£600 less the £120 credited)`);
      }

      /*
       * Voiding is the only remedy for a credit note raised in error, so the
       * control must exist on a live note and must NOT exist on one already
       * voided — and a voided note must still be shown, marked, rather than
       * hidden: the number is spent and the row is part of the trail.
       */
      const v = await page.evaluate(() => ({
        voidable: document.querySelectorAll('[aria-label^="Void "]').length,
        downloads: document.querySelectorAll('[aria-label^="Download Credit/"]').length,
        marked: /Voided/.test(document.body.innerText),
      }));
      if (v.downloads !== 2) {
        problems.push(`${id}: expected both credit notes listed, found ${v.downloads}`);
      }
      if (v.voidable !== 1) {
        problems.push(`${id}: expected exactly 1 voidable note (the other is already void), found ${v.voidable}`);
      }
      if (!v.marked) {
        problems.push(`${id}: the voided credit note is not marked as voided`);
      }

      /*
       * Voiding must be CONFIRMED, not instant. There is no un-void, and the
       * control sits beside Download at the same size — a mis-tap on a phone
       * would permanently cancel a document already sent to a customer.
       */
      const voidBtn = page.locator('[aria-label^="Void "]').first();
      if (await voidBtn.count()) {
        await voidBtn.click().catch(() => {});
        await page.waitForTimeout(250);
        const confirm = await page.evaluate(() => {
          const t = Array.from(document.querySelectorAll('button')).map((b) =>
            (b.textContent || '').trim()
          );
          return { cancel: t.includes('Cancel'), confirmVoid: t.includes('Void') };
        });
        if (!confirm.cancel || !confirm.confirmVoid) {
          problems.push(`${id}: voiding is not confirmed — one tap destroys a sent document`);
        }
      }
    }

    /*
     * ELE-1704 — state must not survive a change of invoice.
     *
     * Untick a line on invoice A, switch the sheet to invoice B, and B must
     * be fully creditable. Before the reset effect, `selected` still held A's
     * line ids, matched none of B's, and B refused with "already been
     * credited in full" — on a screen showing what was still creditable.
     */
    if (which === 'creditnote&case=switch') {
      const row = page.locator('button', { hasText: 'Consumer unit change' }).first();
      if (await row.count()) {
        await row.click().catch(() => {});
        await page.waitForTimeout(200);
      }
      // Type a reason against the FIRST invoice. Carrying this over is the
      // more dangerous half of the leak: it puts one client's wording on
      // another client's credit note.
      await page.evaluate(() => {
        const el = document.querySelector('#credit-reason');
        if (!el) return;
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ).set;
        setter.call(el, 'WRONG CLIENT REASON');
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await page.waitForTimeout(150);
      // The sheet's overlay covers the page, so a pointer click never reaches
      // this button. Dispatched straight on the element instead.
      await page.evaluate(() => document.querySelector('[data-switch]')?.click());
      await page.waitForTimeout(400);
      const after = await page.evaluate(() => ({
        text: document.body.innerText,
        cta: (
          Array.from(document.querySelectorAll('button')).find((b) =>
            /Raise credit note/.test(b.textContent || '')
          )?.textContent || ''
        ).trim(),
      }));
      /*
       * The exact symptom of a leak. A stale `selected` matches none of the
       * new invoice's line ids, so `buildCreditNote` refuses with
       * `no-lines-selected` — asserted by its message rather than by the
       * button's figure, which also moves for legitimate reasons such as
       * exceeds-remaining.
       */
      if (/Choose at least one line to credit/i.test(after.text)) {
        problems.push(`${id}: nothing is selected on the new invoice — selection leaked from the previous one`);
      }
      if (/already been credited in full/i.test(after.text)) {
        problems.push(`${id}: the new invoice is wrongly reported as fully credited`);
      }
      if (!/£/.test(after.cta)) {
        problems.push(`${id}: the new invoice cannot be credited (button reads "${after.cta}")`);
      }
      if (!after.text.includes('Invoice/043')) {
        problems.push(`${id}: the sheet did not switch to the second invoice`);
      }
      const carried = await page.evaluate(
        () => document.querySelector('#credit-reason')?.value || ''
      );
      if (carried) {
        problems.push(`${id}: the reason carried over to another invoice — "${carried}"`);
      }
    }

    if (which.startsWith('invoicecard')) {
      const body = await page.evaluate(() => document.body.innerText);
      const full = which.includes('case=full');
      if (full) {
        if (!/·\s*Credited/.test(body)) {
          problems.push(`${id}: a fully-credited invoice does not say so`);
        }
        // `canCredit` must be false here — crediting a fully-credited invoice
        // can only be refused, and offering it is offering a dead end.
        if (/Raise a credit note/.test(body)) {
          problems.push(`${id}: offers a credit note on an already fully-credited invoice`);
        }
      } else if (!body.includes('£420.50')) {
        problems.push(`${id}: the part-credited badge does not show the amount`);
      }
    }

    if (which === 'uninvoiced') { // phantom fixture only in the default case
      const body = await page.evaluate(() => document.body.innerText);
      if (body.includes('PHANTOM')) {
        problems.push(`${id}: a never-sent quote rendered — evidence filter has regressed`);
      }
      if (!body.includes('Azhar Abbasi')) {
        problems.push(`${id}: the genuinely-accepted rows did not render`);
      }
    }
    if (cardRules && r.scroll > r.view + 1) problems.push(`${id}: scrolls sideways (${r.scroll} > ${r.view})`);
    if (cardRules) r.over.slice(0, 3).forEach((o) => problems.push(`${id}: overflows — ${o}`));
    if (cardRules) r.tiny.slice(0, 5).forEach((t) => problems.push(`${id}: text under 11px — ${t}`));
    if (cardRules) r.grey.slice(0, 5).forEach((g) => problems.push(`${id}: grey text — ${g}`));
    if (cardRules) r.small.slice(0, 5).forEach((s) => problems.push(`${id}: touch target under 44px — ${s}`));

    console.log(`  ${id}: ${r.mounted} nodes, ${r.view}px viewport`);
    if (process.env.SHOOT) {
      await page.screenshot({ path: resolve(here, `shot_${label}_${which.replace('&case=', '_')}.png`), fullPage: true });
    }
  }
  await ctx.close();
}
await browser.close();

if (problems.length) {
  console.log(`\n❌ invoice prompts: ${problems.length} problem(s)\n`);
  problems.forEach((p) => console.log('  • ' + p));
  process.exitCode = 1;
} else {
  console.log('\n✅ invoice prompts: phone and desktop clean\n');
}
