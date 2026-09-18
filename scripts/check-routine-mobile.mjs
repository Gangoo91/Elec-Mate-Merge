#!/usr/bin/env node
/**
 * check:routine-mobile
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the routine inspection form on a REAL iPhone viewport and a desktop
 * one, and enforces the rules CLAUDE.md states for this app but which nothing
 * else checks:
 *
 *   • 44px minimum touch targets  ("Touch targets: h-11 minimum")
 *   • no sideways scrolling       ("No horizontal scrolling tables")
 *   • no text under 11px          — unreadable on a phone at arm's length
 *   • no input value truncated    — a field you cannot read back is a field you
 *                                   cannot check before signing
 *
 * ⚠️ IT MUST BE PLAYWRIGHT, NOT `chrome --headless --window-size`.
 * Chrome enforces a minimum window width of about 485px on macOS, so a
 * `--window-size=390` screenshot renders a 485px layout and then crops it. That
 * looks exactly like horizontal overflow and is not — it cost a false bug
 * report before this was written. Playwright's device emulation gives a true
 * 390px viewport.
 *
 * Every rule here was added because it caught something real: 9px code chips
 * abbreviated to "Pot. dang.", and an email rendering as
 * "landlord@example.cor" in a two-column grid.
 *
 * Run with SHOOT=1 to also write full-page screenshots next to the harness.
 */

import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/routine-render');

let chromium, devices;
try {
  ({ chromium, devices } = await import('playwright'));
} catch {
  console.log('• check:routine-mobile skipped — playwright is not installed.');
  process.exit(0);
}

/* The compiled stylesheet, so the measurements are of the real design rather
   than of unstyled markup. Rebuilt only when missing — it takes ~25s. */
const cssPath = resolve(here, 'app.css');
if (!existsSync(cssPath)) {
  await execFileP('npx', ['tailwindcss', '-i', 'src/index.css', '-o', cssPath, '--minify'], {
    cwd: root,
    maxBuffer: 32 * 1024 * 1024,
  });
}

await build({
  entryPoints: [resolve(here, 'viewport-harness.tsx')],
  outfile: resolve(here, 'viewport.js'),
  bundle: true,
  jsx: 'automatic',
  // Vite's order, not esbuild's — see check-routine-render.mjs for why.
  resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  alias: {
    '@': resolve(root, 'src'),
    '@/integrations/supabase/client': resolve(here, 'stub-supabase.ts'),
  },
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'error',
  absWorkingDir: root,
});

const TABS = ['client', 'visit', 'inspection', 'thermal', 'declaration'];
const problems = [];
const browser = await chromium.launch();

/*
 * ⚠️ `touchRules` is why this list carries a flag rather than just a viewport.
 *
 * The 44px minimum is a TOUCH rule, and this app's button variants already
 * encode that correctly: `size="sm"` is `h-11` with `min-h-[44px]` on a phone
 * and deliberately drops to `md:h-9` on desktop, because a mouse does not need
 * a 44px target. Enforcing it at 1440px reported the signature pad's clear
 * button as a defect when it is working exactly as designed — and "fixing" that
 * would have made every certificate in the app worse.
 *
 * Everything else — sideways scroll, unreadable text, truncated values — is
 * wrong at any width and is checked at both.
 */
for (const [label, opts, touchRules] of [
  ['mobile', { ...devices['iPhone 14'] }, true],
  ['desktop', { viewport: { width: 1440, height: 1000 } }, false],
]) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();

  for (const vt of ['landlord', 'commercial']) {
    for (const tab of TABS) {
      // The landlord rail has no thermal step.
      if (vt === 'landlord' && tab === 'thermal') continue;
      const id = `${label}/${vt}/${tab}`;
      await page.goto(`file://${resolve(here, 'viewport.html')}?tab=${tab}&vt=${vt}`);
      await page.addScriptTag({
        content: `window.__touchRules = ${touchRules}; window.__landlord = ${vt === 'landlord'};`,
      });
      await page.waitForTimeout(700);

      const r = await page.evaluate(() => {
        const de = document.documentElement;
        const out = { view: de.clientWidth, scroll: de.scrollWidth, over: [], small: [], tiny: [], clipped: [] };
        document.querySelectorAll('*').forEach((el) => {
          const b = el.getBoundingClientRect();
          if (b.width > 0 && b.right > de.clientWidth + 1) {
            out.over.push(`${el.tagName}.${String(el.className).slice(0, 40)}`);
          }
        });
        if (window.__touchRules) document.querySelectorAll('button, input, select, textarea, [role="button"]').forEach((el) => {
          const b = el.getBoundingClientRect();
          if (!b.height || el.getAttribute('type') === 'file') return;
          /*
           * ⚠️ THE TAP TARGET IS NOT ALWAYS THE CONTROL.
           *
           * A 20px checkbox inside a 44px clickable <label> gives a 44px
           * target — tapping the text toggles it, which is how every
           * well-built mobile form does checkboxes. Measuring the box alone
           * reported a real defect where there was none, and "fixing" it would
           * have meant a 44px checkbox, which looks wrong and helps nobody.
           *
           * So the effective target is the nearest wrapping label when there
           * is one. Everything without that ancestor is still measured on
           * itself.
           */
          const label = el.closest('label');
          const effective = label ? Math.max(b.height, label.getBoundingClientRect().height) : b.height;
          if (effective < 43.5) {
            const t = (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 34);
            out.small.push(`${Math.round(effective)}px "${t}"`);
          }
        });
        document.querySelectorAll('p, span, label, div').forEach((el) => {
          if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs && fs < 11) out.tiny.push(`${fs}px "${el.textContent.trim().slice(0, 30)}"`);
        });
        document.querySelectorAll('input').forEach((el) => {
          if (el.value && el.scrollWidth - el.clientWidth > 1) {
            out.clipped.push(`"${el.value}" by ${el.scrollWidth - el.clientWidth}px`);
          }
        });
        /*
         * 🔴 A landlord visit HAS NO THERMAL STEP, so any thermal wording on
         * one of its screens describes an input the report cannot contain.
         *
         * This has leaked three separate times — the verdict explainer, the
         * note saying what the verdict is derived from, and the PDF masthead —
         * each time because a sentence written for the commercial visit was
         * left unbranched. It is the same edit every time and it is invisible
         * to a type checker, so it is caught here instead.
         */
        out.thermalLeak = [];
        if (window.__landlord) {
          document.querySelectorAll('p, span, label, h1, h2, h3, button, option').forEach((el) => {
            const own = [...el.childNodes]
              .filter((n) => n.nodeType === 3)
              .map((n) => n.textContent)
              .join(' ');
            if (/thermal|thermograph|priority\s*[1-4]/i.test(own)) {
              out.thermalLeak.push(own.trim().slice(0, 60));
            }
          });
        }
        return out;
      });

      if (r.scroll > r.view + 1) {
        problems.push(`${id}: scrolls sideways (${r.scroll} > ${r.view}) — ${[...new Set(r.over)].slice(0, 3).join(', ')}`);
      }
      const uniq = (a) => [...new Set(a)];
      if (uniq(r.small).length) problems.push(`${id}: touch target under 44px — ${uniq(r.small).slice(0, 4).join(', ')}`);
      if (uniq(r.tiny).length) problems.push(`${id}: text under 11px — ${uniq(r.tiny).slice(0, 3).join(', ')}`);
      if (uniq(r.clipped).length) problems.push(`${id}: input value truncated — ${uniq(r.clipped).slice(0, 3).join(', ')}`);
      if (uniq(r.thermalLeak ?? []).length) {
        problems.push(
          `${id}: thermal wording on a LANDLORD screen — ${uniq(r.thermalLeak).slice(0, 2).map((t) => `"${t}"`).join(', ')}\n` +
            `      A landlord visit has no thermal step; this describes findings the report cannot hold.`
        );
      }

      if (process.env.SHOOT) {
        await page.screenshot({ path: resolve(here, `shot_${label}_${vt}_${tab}.png`), fullPage: true });
      }
    }
  }
  await ctx.close();
}
await browser.close();

if (problems.length) {
  console.error(`\n✖ check:routine-mobile — ${problems.length} problem(s)\n`);
  problems.forEach((p) => console.error(`  ${p}\n`));
  process.exit(1);
}
console.log('✓ check:routine-mobile — iPhone 14 + 1440px desktop, all rules hold');
