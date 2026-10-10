/**
 * Journey 77 — phone audit, part two: the bottom of every screen and
 * everything that opens from it (sheets, forms, menus, pickers).
 *
 *   PHONE_AUDIT=1 npx playwright test -c playwright.college.config.ts e2e/college/77-phone-audit-inside.spec.ts --headed
 *
 * A report, not a gate (skipped unless PHONE_AUDIT is set). Runs in the
 * installed Google Chrome at 360 px and 390 px. Every write to the database,
 * storage or an edge function is answered with a fake success, so tapping
 * "Add", "Record" or "New" opens the form and nothing is saved or sent.
 *
 * Per screen:
 *   bottom   the last content hidden behind a fixed bottom bar; a dead empty
 *            band at the end; a fixed bar with no room for the home indicator
 * Per thing that opens (tapped from the page, up to 30 per screen):
 *   kind     bottom sheet / full screen / centred dialog / popover / menu
 *   fits     any part off screen
 *   overflow sideways scroll inside it
 *   tap      controls under 44 px
 *   tiny     text under 12 px
 *   cut      names cut off with an ellipsis
 *   scroll   taller than the screen with no scrolling body
 *   close    no visible way to close it
 * Screenshots of each, at the top and scrolled to the bottom.
 * Writes /tmp/em-qa/phone-audit/inside.json.
 */
import fs from 'node:fs';
import { test, type BrowserContext, type Page } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage, type Who } from './support';

test.skip(!haveCreds() || !process.env.PHONE_AUDIT, 'Set PHONE_AUDIT=1 to run the phone audit');
test.use({ channel: 'chrome' });

const OUT = '/tmp/em-qa/phone-audit/inside';

const TUTOR_PATHS = [
  'college', 'college/today', 'college/marking', 'college/inbox', 'college/compliance',
  'college/compliance/pack', 'college/compliance/ofsted', 'college/reports', 'college/iqa',
  'college/otj', 'college/otj/inbox', 'college/evidence-pack', 'college/value', 'college/reviews',
  'college/ai-notebook', 'college/epa', 'college/quizzes', 'college/settings/curriculum',
  'college/settings/operational', 'college/settings/data', 'college/settings/mis',
  'college/onboarding', 'college/trust',
];
const SECTIONS = [
  'peoplehub', 'curriculumhub', 'assessmenthub', 'resourceshub', 'qualityhub', 'students',
  'cohorts', 'tutors', 'lessonplans', 'attendance', 'portfolio', 'workqueue', 'collegesettings',
  'employerportal', 'timetable', 'iqaworkflow', 'safeguardingqueue', 'compliancedocs',
];
const LEARNER_PATHS = [
  'apprentice/college-plan', 'apprentice/college-plan/hours', 'apprentice/college/today',
  'apprentice/college/plan', 'apprentice/college/progress', 'apprentice/college/activities',
  'apprentice/college/epa', 'apprentice/college/voice', 'apprentice/college/compliance',
  'apprentice/hub', 'apprentice/hub?tab=work', 'apprentice/hub?tab=progress', 'apprentice/hub?tab=me',
];

/** Taps that leave the app or end the session, even with writes faked. */
const NEVER = /^(log ?out|sign out|delete account|call|whatsapp|email|open in|download|print)\b|^(← )?back$/i;
const READ_RPC =
  /\/rest\/v1\/rpc\/((get|list|fetch|search|count|my|is|has|can|current|college|calc|compute|check|resolve_my|match|catalogue|study)_?|tripartite_due_by|resolve_learner_qualification|_safeguarding_reader)/i;

async function blockWrites(context: BrowserContext) {
  await context.route(/supabase\.co\/(rest|storage|functions)\/v1\//, async (route) => {
    const req = route.request();
    const url = req.url();
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method())) return route.continue();
    if (/\/rest\/v1\/rpc\//.test(url) && READ_RPC.test(url)) return route.continue();
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: /\/rpc\//.test(url) ? 'null' : /\/functions\//.test(url) ? '{}' : '[]',
    });
  });
}

interface Opened {
  trigger: string;
  kind: string;
  w: number;
  h: number;
  top: number;
  bottom: number;
  fits: boolean;
  overflow: number;
  tap: string[];
  tiny: string[];
  cut: string[];
  scroll: boolean;
  close: boolean;
  shot: string;
}
interface Screen {
  who: Who;
  width: number;
  url: string;
  bottom: string[];
  opened: Opened[];
  skipped: string[];
}

/**
 * Tags every tappable thing on the page (outside the masthead and any open
 * overlay) with data-audit-key = "<name>#<n>" and returns the keys. Rows that
 * repeat (88 inbox rows) keep only their first two, by the row's first line.
 */
async function tag(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const vis = (e: Element) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none';
    };
    const main = document.querySelector('main') ?? document.body;
    const seen = new Map<string, number>();
    const shape = new Map<string, number>();
    const out: string[] = [];
    for (const e of main.querySelectorAll('button, [role=button], [role=combobox], a[href^="#"]')) {
      if (!vis(e) || (e as HTMLButtonElement).disabled) continue;
      if (e.closest('[role=dialog], [role=alertdialog], [role=menu], .sticky, nav')) continue;
      const name = (e.getAttribute('aria-label') || (e as HTMLElement).innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70);
      if (!name) continue;
      // Same-shaped rows: the class list plus the first word stands for the row type.
      const sh = `${(e as HTMLElement).className}`.slice(0, 120);
      const k = (shape.get(sh) ?? 0) + 1;
      shape.set(sh, k);
      if (k > 2 && (e as HTMLElement).innerText.includes('\n')) continue;
      const n = (seen.get(name) ?? 0) + 1;
      seen.set(name, n);
      const key = `${name}#${n}`;
      e.setAttribute('data-audit-key', key);
      out.push(key);
    }
    return out;
  });
}

async function overlay(page: Page) {
  return page.evaluate(() => {
    const els = [
      ...document.querySelectorAll('[role=dialog], [role=alertdialog], [role=menu], [role=listbox], [data-radix-popper-content-wrapper]'),
    ].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 20 && r.height > 20 && getComputedStyle(e).visibility !== 'hidden';
    });
    return els.length;
  });
}

async function measureOverlay(page: Page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cands = [
      ...document.querySelectorAll('[role=dialog], [role=alertdialog], [role=menu], [role=listbox], [data-radix-popper-content-wrapper]'),
    ].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 20 && r.height > 20;
    });
    const el = cands[cands.length - 1] as HTMLElement;
    const r = el.getBoundingClientRect();
    const role = el.getAttribute('role') || 'popover';
    const kind =
      role === 'menu' || role === 'listbox'
        ? 'menu'
        : r.width >= vw - 2 && r.height >= vh - 2
          ? 'full screen'
          : r.width >= vw - 2 && Math.abs(r.bottom - vh) < 3
            ? 'bottom sheet'
            : el.matches('[data-radix-popper-content-wrapper]') || el.querySelector('[data-radix-popper-content-wrapper]')
              ? 'popover'
              : 'centred dialog';
    const label = (e: Element) =>
      (e.getAttribute('aria-label') || (e as HTMLElement).innerText || e.tagName).replace(/\s+/g, ' ').trim().slice(0, 36);
    const tap: string[] = [];
    const tiny: string[] = [];
    const cut: string[] = [];
    for (const c of el.querySelectorAll('button, a[href], [role=button], [role=tab], [role=menuitem], [role=option], input:not([type=hidden]), select, textarea')) {
      const b = c.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) continue;
      const t = (c as HTMLInputElement).type;
      if (t === 'checkbox' || t === 'radio') continue;
      if (c.tagName === 'A' && getComputedStyle(c).display === 'inline') continue;
      if (b.height < 44 || b.width < 32) tap.push(`${label(c)} ${Math.round(b.width)}x${Math.round(b.height)}`);
    }
    for (const n of el.querySelectorAll('*')) {
      const h = n as HTMLElement;
      if (!Array.from(h.childNodes).some((c) => c.nodeType === 3 && c.textContent!.trim())) continue;
      const b = h.getBoundingClientRect();
      if (b.width === 0) continue;
      const s = getComputedStyle(h);
      if (parseFloat(s.fontSize) < 12) tiny.push(`${h.innerText.trim().slice(0, 28)} ${s.fontSize}`);
      if (s.textOverflow === 'ellipsis' && h.scrollWidth > h.clientWidth + 1) cut.push(h.innerText.trim().slice(0, 36));
    }
    // A scrolling body somewhere inside, or the overlay itself scrolls.
    const scrollers = [el, ...el.querySelectorAll('*')].filter((n) => {
      const s = getComputedStyle(n);
      return (s.overflowY === 'auto' || s.overflowY === 'scroll') && n.scrollHeight > n.clientHeight + 2;
    });
    const tall = el.scrollHeight > vh + 4 || r.bottom > vh + 4;
    const closeBtn = [...el.querySelectorAll('button')].some((b) =>
      /^(close|done|cancel|×|✕)$/i.test((b.getAttribute('aria-label') || b.textContent || '').trim())
    );
    return {
      kind,
      w: Math.round(r.width),
      h: Math.round(r.height),
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      fits: r.left >= -1 && r.right <= vw + 1 && r.top >= -1 && r.bottom <= vh + 1,
      overflow: Math.max(0, ...[el, ...el.querySelectorAll('*')].map((n) => {
        const s = getComputedStyle(n);
        return s.overflowX === 'hidden' || s.overflowX === 'clip' ? 0 : n.scrollWidth - n.clientWidth;
      })),
      tap: [...new Set(tap)].slice(0, 25),
      tiny: [...new Set(tiny)].slice(0, 12),
      cut: [...new Set(cut)].slice(0, 12),
      scroll: !tall || scrollers.length > 0,
      close: closeBtn || kind === 'menu' || kind === 'popover',
      scrollerIndex: scrollers.length,
    };
  });
}

async function scrollOverlayToBottom(page: Page) {
  await page.evaluate(() => {
    const els = document.querySelectorAll('[role=dialog], [role=alertdialog]');
    const el = els[els.length - 1];
    if (!el) return;
    for (const n of [el, ...el.querySelectorAll('*')]) {
      const s = getComputedStyle(n);
      if ((s.overflowY === 'auto' || s.overflowY === 'scroll') && n.scrollHeight > n.clientHeight + 2) n.scrollTop = n.scrollHeight;
    }
  });
}

async function pageBottom(page: Page): Promise<string[]> {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  return page.evaluate(() => {
    const vh = window.innerHeight;
    const out: string[] = [];
    const fixed = [...document.querySelectorAll('body *')].filter((e) => {
      const s = getComputedStyle(e);
      if (s.position !== 'fixed' || s.display === 'none' || s.visibility === 'hidden') return false;
      const r = e.getBoundingClientRect();
      return r.height > 30 && r.height < vh * 0.4 && r.bottom >= vh - 2 && r.width > window.innerWidth * 0.5;
    }) as HTMLElement[];
    // The lowest visible piece of real content on the page.
    let lowest: HTMLElement | null = null;
    let lowestBottom = 0;
    for (const e of document.querySelectorAll('main *')) {
      const h = e as HTMLElement;
      if (fixed.some((f) => f.contains(h))) continue;
      const hasText = Array.from(h.childNodes).some((c) => c.nodeType === 3 && c.textContent!.trim());
      if (!hasText && !h.matches('button, a, input, img')) continue;
      const r = h.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      if (r.bottom > lowestBottom) {
        lowestBottom = r.bottom;
        lowest = h;
      }
    }
    for (const f of fixed) {
      const fr = f.getBoundingClientRect();
      if (lowestBottom > fr.top + 2)
        out.push(`last content "${(lowest?.innerText || '').trim().slice(0, 30)}" is behind a fixed bar (${Math.round(lowestBottom - fr.top)}px)`);
      const pb = parseFloat(getComputedStyle(f).paddingBottom);
      if (pb < 8) out.push(`fixed bottom bar has ${pb}px bottom padding (no room for the home indicator)`);
    }
    const docEnd = document.documentElement.scrollHeight - window.scrollY;
    const gap = docEnd - lowestBottom;
    if (lowest && gap > 240) out.push(`${Math.round(gap)}px of empty space after the last content`);
    if (lowest && gap < 12 && fixed.length === 0) out.push(`page ends ${Math.round(gap)}px under the last content (cramped)`);
    return out;
  });
}

const screens: Screen[] = [];

for (const who of ['tutor', 'learner'] as const) {
  test(`inside every screen as ${who}`, async ({ browser }) => {
    test.setTimeout(3 * 60 * 60_000);
    fs.mkdirSync(OUT, { recursive: true });
    const ctx = await learnerContext();
    const urls =
      who === 'tutor'
        ? [
            ...TUTOR_PATHS.map((p) => `/${p}`),
            ...SECTIONS.map((s) => `/college?section=${s}`),
            `/college?section=student360&studentId=${ctx.student_id}`,
          ]
        : LEARNER_PATHS.map((p) => `/${p}`);
    const only = process.env.PHONE_AUDIT_ONLY;
    if (only) urls.splice(0, urls.length, ...urls.filter((u) => u.includes(only)));
    if (urls.length === 0) return;
    const { context, page } = await signedInPage(browser, who, 'phone');
    await blockWrites(context);
    page.on('dialog', (d) => void d.dismiss());
    for (const width of [390, 360]) {
      await page.setViewportSize({ width, height: width === 360 ? 780 : 844 });
      for (const url of urls) {
        const go = async () => {
          await page.goto(url).catch(() => undefined);
          await page.waitForLoadState('networkidle').catch(() => undefined);
          // Lists load after the shell: wait until the number of controls
          // has held still for 1.5 s (at most 10 s).
          let last = -1;
          let still = 0;
          for (let i = 0; i < 20 && still < 3; i++) {
            const n = await page.locator('main button').count().catch(() => 0);
            still = n === last ? still + 1 : 0;
            last = n;
            await page.waitForTimeout(500);
          }
        };
        await go();
        const screen: Screen = { who, width, url, bottom: await pageBottom(page), opened: [], skipped: [] };
        await page.evaluate(() => window.scrollTo(0, 0));
        if (process.env.PHONE_AUDIT_DEBUG) console.log(url, JSON.stringify(await page.evaluate(() => ({ main: !!document.querySelector("main"), buttons: document.querySelectorAll("button").length, inSticky: [...document.querySelectorAll("button")].filter((b) => b.closest(".sticky")).length, inNav: [...document.querySelectorAll("button")].filter((b) => b.closest("nav")).length, inMain: document.querySelector("main")?.querySelectorAll("button").length }))));
        const keys = (await tag(page)).filter((k) => !NEVER.test(k.replace(/#\d+$/, ''))).slice(0, 40);
        for (const key of keys) {
          const name = key.replace(/#\d+$/, '');
          const start = page.url();
          try {
            let target = page.locator(`[data-audit-key="${key.replace(/"/g, '\\"')}"]`);
            if ((await target.count()) === 0) {
              await tag(page);
              target = page.locator(`[data-audit-key="${key.replace(/"/g, '\\"')}"]`);
            }
            if ((await target.count()) === 0 || !(await target.first().isVisible())) continue;
            await target.first().scrollIntoViewIfNeeded();
            await target.first().click({ timeout: 3000 });
            await page.waitForTimeout(800);
            if ((await overlay(page)) > 0) {
              const m = await measureOverlay(page);
              const base = `${who}-${width}-${url.replace(/[^a-z0-9]+/gi, '_')}-${name.replace(/[^a-z0-9]+/gi, '_')}`.slice(0, 140);
              const shot = `${OUT}/${base}.png`;
              await page.screenshot({ path: shot });
              await scrollOverlayToBottom(page);
              await page.waitForTimeout(300);
              await page.screenshot({ path: `${OUT}/${base}-end.png` });
              screen.opened.push({ trigger: name, shot, ...m } as Opened);
              await page.keyboard.press('Escape');
              await page.waitForTimeout(350);
              if ((await overlay(page)) > 0) await page.keyboard.press('Escape');
              await page.waitForTimeout(200);
            }
            else if (process.env.PHONE_AUDIT_DEBUG) screen.skipped.push(`no overlay: ${name.slice(0, 40)} -> ${page.url().replace(/^.*\/\/[^/]+/, '')}`);
            if (page.url() !== start) await go();
          } catch (e) {
            screen.skipped.push(`${name}: ${String(e).split('\n')[0].slice(0, 80)}`);
            await page.keyboard.press('Escape').catch(() => undefined);
            if (page.url() !== start) await go();
          }
        }
        screens.push(screen);
        fs.writeFileSync(`${OUT}/../inside-${who}.json`, JSON.stringify(screens.filter((s) => s.who === who), null, 1));
      }
    }
    await context.close();
  });
}
