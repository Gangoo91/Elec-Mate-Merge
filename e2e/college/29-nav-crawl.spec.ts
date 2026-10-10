/**
 * Journey 29 — a crawler for every way out of every College Hub page.
 *
 * Read-only. For each College Hub section, each standalone /college page, the
 * learner's My college and each of their college pages, on desktop and phone,
 * it clicks every control that moves you somewhere (cards, rows, "Open…",
 * "See all", links) one at a time and checks what a person would feel:
 *
 *   - it lands on a real page: no "Page Not Found", no page error, not blank,
 *     not bounced to sign-in;
 *   - the new page opens at the top (unless the address carries an #anchor);
 *   - the masthead "← Back" returns to the page it came from, at the place it
 *     was scrolled to;
 *   - the control pushed a new history entry (a control that replaces history
 *     leaves Back nowhere to return to).
 *
 * Never clicked: anything that records, sends, saves, deletes, signs, verifies
 * or creates (by name), form submits, tabs, switches, checkboxes, menus,
 * anything inside a dialog, and the masthead's own controls (search, alerts,
 * Act; tested in their own journeys). A control that opens a sheet instead of
 * navigating is closed with Escape and counted, not judged.
 *
 * Every failure is reported as `page › control: what went wrong`.
 *
 *   npx playwright test -c playwright.college.config.ts 29-nav-crawl --workers=4
 */
import { test, expect, type BrowserContext, type Page, type TestInfo } from '@playwright/test';
import { haveCreds, learnerRoll, signedInPage, type Who } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.describe.configure({ mode: 'parallel' });

const STANDALONE = [
  'college',
  'college/today',
  'college/marking',
  'college/inbox',
  'college/compliance',
  'college/compliance/pack',
  'college/compliance/ofsted',
  'college/compliance/sar',
  'college/compliance/qip',
  'college/compliance/rehearsal',
  'college/reports',
  'college/compare',
  'college/iqa',
  'college/otj',
  'college/otj/inbox',
  'college/evidence-pack',
  'college/help',
  'college/value',
  'college/reviews',
  'college/ai-notebook',
  'college/epa',
  'college/quizzes',
  'college/settings/curriculum',
  'college/settings/operational',
];

const SECTIONS = [
  'peoplehub',
  'curriculumhub',
  'assessmenthub',
  'resourceshub',
  'qualityhub',
  'tutors',
  'students',
  'cohorts',
  'supportstaff',
  'courses',
  'coursesetup',
  'lessonplans',
  'teachingresources',
  'tutornotebook',
  'schemesofwork',
  'documentlibrary',
  'grading',
  'attendance',
  'ilpmanagement',
  'epatracking',
  'progresstracking',
  'portfolio',
  'workqueue',
  'compliancedocs',
  'safeguardingqueue',
  'ltisettings',
  'collegesettings',
  'employerportal',
  'otjtraining',
  'qualitydashboard',
  'timetable',
  'aiilpgenerator',
  'iqaworkflow',
  'batchoperations',
  'assessmentcalendar',
  'resourceanalytics',
  'iqaotjaudit',
  'tutorobs',
  'auditlog',
  'tutorworkload',
];

const LEARNER_PAGES = [
  'apprentice/college-plan',
  ...['today', 'plan', 'progress', 'activities', 'epa', 'voice', 'compliance', 'activity'].map(
    (s) => `apprentice/college/${s}`
  ),
  'apprentice/college-ai',
  'apprentice/voice-survey',
];

/** Names that start with a verb that does something rather than goes somewhere (after any ALL-CAPS eyebrow). */
const DOES_SOMETHING =
  /^(delete|remove|archive|send|submit|save|sign|approve|reject|verify|confirm|log ?out|revoke|invite|upload|generate|regenerate|create|publish|clock|export|download|print|share|copy|email|reset|import|accept|decline|resend|post|book|cancel|undo|restore|dismiss|enable|disable|recompute|refresh|nudge|remind|chase|acknowledge|resolve|complete|record|add|new|start|begin|retry|sync|join|leave|unlink|link|assign|unassign|pause|resume|duplicate|edit|rename|pin|unpin|star|follow|mute|flag|escalate|close|end|stop|run|apply|request|withdraw|transfer|merge|translate|play|listen|read aloud|speak|call|whatsapp|take (a )?register|register|mark|tick|untick|select|deselect|clear|upgrade|subscribe|pay|buy|claim|redeem|try again|reload|grade|decide|observe|discussion|message|reply|chat|ask|feedback|report a|draft|scan|photo|camera|capture|log|refer|pass|fail|nominate|unlock|lock|set|change|move|swap|update|upload|attach|plan a|schedule|propose|rate|vote|answer|reveal|show answer|hide|expand|collapse|more options|options|menu|filter|sort|search|find|show me|previous|next|prev)\b/i;

/** The compliance "show me" suggestions: each one asks the AI search. */
const AI_PROMPTS = /^(Recent safeguarding activity|Apprentices ready for EPA|Show me\b)/;
/** Deep links that deliberately scroll to one row (the inbox's entry, a focused item). */
const FOCUS_PARAMS = ['entry', 'focus', 'item', 'attempt', 'thread'];

const AREA = /^\/(college|apprentice)(\/|$)/;

/** RPCs that read. Anything else that is not a GET is answered locally and never reaches the database. */
const READ_RPC =
  /\/rest\/v1\/rpc\/((get|list|fetch|search|count|my|is|has|can|current|college|calc|compute|check|resolve_my|match)_?|tripartite_due_by|resolve_learner_qualification|_safeguarding_reader)/i;
/** Edge functions checked to only read (no insert/update/delete in their source). */
const READ_FN = /\/functions\/v1\/(ai-otj-verdict)(\?|$)/;

/**
 * Keeps the crawl read-only whatever it taps: opening an inbox row marks it
 * seen, a page view is logged, and so on. Writes to tables, write RPCs,
 * storage and edge functions get a quiet fake success instead.
 */
async function blockWrites(context: BrowserContext) {
  await context.route(/supabase\.co\/(rest|storage|functions)\/v1\//, async (route) => {
    const req = route.request();
    const url = req.url();
    if (req.method() === 'GET' || req.method() === 'HEAD' || req.method() === 'OPTIONS')
      return route.continue();
    if (/\/rest\/v1\/rpc\//.test(url) && READ_RPC.test(url)) return route.continue();
    if (READ_FN.test(url)) return route.continue();
    blocked.push(`${req.method()} ${url.replace(/^.*\/v1\//, '').split('?')[0]}`);
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: /\/rpc\//.test(url) ? 'null' : /\/functions\//.test(url) ? '{}' : '[]',
    });
  });
}
const blocked: string[] = [];

interface Cand {
  key: string;
  name: string;
  href: string | null;
}

/** Every visible control on the page that might navigate, keyed by name + occurrence. */
async function candidates(page: Page): Promise<Cand[]> {
  return page.evaluate(() => {
    const visible = (e: Element) => {
      const r = (e as HTMLElement).getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return false;
      const s = getComputedStyle(e as HTMLElement);
      return s.visibility !== 'hidden' && s.display !== 'none' && s.pointerEvents !== 'none';
    };
    const back = [...document.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === '← Back'
    );
    let mast: Element | null = null;
    for (let p = back?.parentElement ?? null; p; p = p.parentElement) {
      if (getComputedStyle(p).position === 'sticky' || getComputedStyle(p).position === 'fixed') {
        mast = p;
        break;
      }
    }
    const main = document.querySelector('main') ?? document.body;
    const els = [
      ...main.querySelectorAll('a[href], button, [role=button], [role=link]'),
    ] as HTMLElement[];
    const seen = new Map<string, number>();
    const out: { key: string; name: string; href: string | null; tag: string }[] = [];
    for (const e of els) {
      if (!visible(e)) continue;
      if (mast && mast.contains(e)) continue;
      if (
        e.closest(
          '[role=dialog], [role=alertdialog], [role=menu], [role=tablist], [role=listbox], form, nav'
        )
      )
        continue;
      if ((e as HTMLButtonElement).disabled || e.getAttribute('aria-disabled') === 'true') continue;
      if (e.hasAttribute('aria-expanded') || e.hasAttribute('aria-haspopup')) continue;
      if (e.getAttribute('aria-pressed') !== null || e.getAttribute('aria-selected') !== null)
        continue;
      if (e.getAttribute('role') && !['button', 'link'].includes(e.getAttribute('role')!)) continue;
      if (e.tagName === 'BUTTON' && (e as HTMLButtonElement).type === 'submit' && e.closest('form'))
        continue;
      if (e.parentElement?.closest('a[href], button, [role=button], [role=link]')) continue; // nested
      const a = e as HTMLAnchorElement;
      const href = e.tagName === 'A' ? a.getAttribute('href') : null;
      if (
        href &&
        (/^(mailto|tel|sms|javascript):/i.test(href) ||
          a.target === '_blank' ||
          /^https?:/i.test(href))
      )
        continue;
      const name = (e.getAttribute('aria-label') || e.innerText || e.getAttribute('title') || '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!name || /^(← )?Back$/.test(name)) continue; // a page's own Back is tested from the page it opened
      const n = (seen.get(name) ?? 0) + 1;
      seen.set(name, n);
      e.setAttribute('data-crawl-key', `${name}#${n}`);
      out.push({ key: `${name}#${n}`, name, href, tag: e.tagName });
    }
    return out;
  });
}

const actionName = (name: string) => name.replace(/^(?:[A-Z][A-Z0-9&'’\-]+\s+)+/, '');

/** Repeated rows (a roster, a list of plans): try the first two of each run of similar names. */
function thin(cands: Cand[]): Cand[] {
  const byShape = new Map<string, number>();
  const out: Cand[] = [];
  for (const c of cands) {
    if (DOES_SOMETHING.test(actionName(c.name))) continue;
    if (/\?$/.test(c.name) || AI_PROMPTS.test(c.name)) continue; // a question for the AI search, not a link
    const shape = c.href
      ? c.href.replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, ':id').replace(/\d+/g, 'n')
      : c.name.split(' ').slice(0, 1).join(' ').replace(/\d+/g, 'n') +
        (c.name.length > 40 ? '…' : '');
    const n = (byShape.get(shape) ?? 0) + 1;
    byShape.set(shape, n);
    if (/^(Open|View|See)\b/.test(c.name) || c.href) {
      if (n > 2) continue;
    } else if (n > 4) continue;
    out.push(c);
  }
  return out.slice(0, 45);
}

const settle = async (page: Page) => {
  await page.waitForLoadState('networkidle', { timeout: 6_000 }).catch(() => undefined);
  await page.waitForTimeout(500);
};
/** Waits (up to 3s) until the page stops growing, so a tap is not made mid layout shift. */
async function stable(page: Page) {
  let last = -1;
  for (let i = 0; i < 10; i++) {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    if (h === last) return;
    last = h;
    await page.waitForTimeout(300);
  }
}
const scrollY = (page: Page) => page.evaluate(() => Math.round(window.scrollY));
/** Pushes and replaces this document has made (counted by an init script; history.length caps at 50). */
const pushes = (page: Page) =>
  page.evaluate(() => (window as unknown as { __crawlPushes?: number }).__crawlPushes ?? 0);
const countPushes = () => {
  const w = window as unknown as { __crawlPushes?: number; __crawlDownY?: number };
  w.__crawlPushes = 0;
  // Where the page really was at the tap (scroll anchoring can move it after a read).
  window.addEventListener('pointerdown', () => (w.__crawlDownY = Math.round(window.scrollY)), {
    capture: true,
  });
  const push = history.pushState.bind(history);
  history.pushState = (...a: Parameters<History['pushState']>) => {
    w.__crawlPushes = (w.__crawlPushes ?? 0) + 1;
    return push(...a);
  };
};
const rel = (u: string) => {
  const x = new URL(u);
  return `${x.pathname}${x.search}${x.hash}`;
};
const noHash = (u: string) => {
  const x = new URL(u);
  return `${x.pathname}${x.search}`;
};

async function closeOverlays(page: Page) {
  for (let i = 0; i < 3; i++) {
    const open = await page
      .locator(
        '[role=dialog]:visible, [role=alertdialog]:visible, [role=menu]:visible, [data-vaul-drawer]:visible'
      )
      .count();
    if (!open) return;
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }
}

async function landingProblem(
  page: Page,
  errors: string[],
  before: number
): Promise<string | null> {
  const url = new URL(page.url());
  if (/^\/(auth|login|signin|sign-in)\b/.test(url.pathname))
    return `bounced to sign-in (${url.pathname})`;
  const read = () => page.evaluate(() => document.body.innerText || '');
  let text = await read();
  for (let i = 0; i < 20 && text.replace(/\s+/g, '').length < 40; i++) {
    await page.waitForTimeout(400); // a lazy page compiling on first visit
    text = await read();
  }
  if (/Page Not Found|doesn't exist or has been moved/i.test(text))
    return `Page Not Found at ${rel(page.url())}`;
  if (text.replace(/\s+/g, '').length < 40) return `blank page at ${rel(page.url())}`;
  if (errors.length > before)
    return `page error at ${rel(page.url())}: ${errors.slice(before).join(' | ')}`;
  return null;
}

async function crawl(page: Page, errors: string[], start: string, info: TestInfo) {
  const problems: string[] = [];
  const notes: string[] = [];
  const counts = { controls: 0, navigated: 0, sheets: 0, inert: 0, skipped: 0, outside: 0 };

  let opens = 0;
  const docId = () => page.evaluate(() => performance.timeOrigin).catch(() => -1);
  const open = async () => {
    opens++;
    await page.goto(start);
    await settle(page);
  };
  await open();
  const startProblem = await landingProblem(page, errors, 0);
  if (startProblem) return { problems: [`${start}: ${startProblem}`], notes, counts };
  const home = noHash(page.url()); // where the page settled (a redirect is fine)

  const list = thin(await candidates(page));
  counts.controls = list.length;

  for (const c of list) {
    const tag = `${start} › "${c.name.slice(0, 70)}"`;
    for (let attempt = 0; attempt < 2; attempt++) {
      const mine: string[] = [];
      let clickDoc = 0;
      let opensAtClick = -1;
      const once = async () => {
        if (noHash(page.url()) !== home) await open();
        await closeOverlays(page);
        // Re-stamp keys (the page may have re-rendered since the list was made).
        let now = await candidates(page);
        for (let i = 0; i < 16 && !now.some((x) => x.key === c.key); i++) {
          await page.waitForTimeout(400); // content still loading after Back
          now = await candidates(page);
        }
        if (!now.some((x) => x.key === c.key)) {
          // An earlier tap may have switched a view in place: start the page afresh.
          await open();
          now = await candidates(page);
        }
        if (!now.some((x) => x.key === c.key)) {
          counts.skipped++;
          notes.push(
            `${tag}: not on the page any more (${rel(page.url())}, ${now.length} controls)`
          );
          return;
        }
        const el = page.locator(`[data-crawl-key="${c.key.replace(/"/g, '\\"')}"]`).first();
        await el.scrollIntoViewIfNeeded({ timeout: 4_000 });
        await stable(page);
        const fromUrl = page.url();
        const len = await pushes(page);
        const errBefore = errors.length;
        const popup = page
          .context()
          .waitForEvent('page', { timeout: 1_500 })
          .catch(() => null);
        clickDoc = await docId();
        opensAtClick = opens;
        await el.click({ timeout: 4_000 });
        const fromY = await page
          .evaluate(
            () =>
              (window as unknown as { __crawlDownY?: number }).__crawlDownY ??
              Math.round(window.scrollY)
          )
          .catch(() => 0);
        await page.waitForTimeout(900);
        const pop = await popup;
        if (pop) {
          notes.push(`${tag}: opened a new tab (${pop.url()})`);
          await pop.close();
        }

        if (page.url() === fromUrl) {
          const sheet = await page
            .locator('[role=dialog]:visible, [role=alertdialog]:visible')
            .count();
          if (sheet) counts.sheets++;
          else counts.inert++;
          if (errors.length > errBefore)
            mine.push(`${tag}: page error: ${errors.slice(errBefore).join(' | ')}`);
          await closeOverlays(page);
          return;
        }

        const pushed = (await pushes(page)) > len;
        const changedPath = new URL(page.url()).pathname !== new URL(fromUrl).pathname;
        if (!pushed && !changedPath) {
          // A filter or tab rewriting the address in place: not a navigation.
          counts.inert++;
          return;
        }
        counts.navigated++;
        await settle(page);
        const dest = rel(page.url());
        if (!pushed)
          mine.push(`${tag}: replaced history instead of opening ${dest} (Back cannot return)`);

        const bad = await landingProblem(page, errors, errBefore);
        if (bad) {
          mine.push(`${tag}: ${bad}`);
          await open();
          return;
        }
        const landed = new URL(page.url());
        if (!landed.hash && !FOCUS_PARAMS.some((k) => landed.searchParams.has(k))) {
          const top = await expect
            .poll(() => scrollY(page), { timeout: 3_000 })
            .toBeLessThan(5)
            .then(() => true)
            .catch(() => false);
          if (!top && (await scrollY(page)) > 5)
            mine.push(`${tag}: ${dest} opened scrolled down (${await scrollY(page)}px)`);
        }

        const inArea = AREA.test(new URL(page.url()).pathname);
        if (!inArea) {
          counts.outside++;
          notes.push(`${tag}: leaves the college area for ${dest}`);
          await page.goBack();
        } else {
          // A deep link that opens a sheet (a learner's hours, a piece of evidence): close it first.
          await closeOverlays(page);
          // Closing a sheet that a link opened returns to where it came from by
          // itself (9 Oct). That is the return; don't press Back a second time.
          // Full address, hash included: a Student 360 area differs only by #area.
          const closedHome = await expect
            .poll(() => page.url(), { timeout: 1_500 })
            .toBe(fromUrl)
            .then(() => true)
            .catch(() => false);
          const backBtn = page.getByRole('button', { name: /^(← )?Back$/ }).first();
          const hasBack = closedHome
            ? true
            : await backBtn
                .waitFor({ state: 'visible', timeout: 6_000 })
                .then(() => true)
                .catch(() => false);
          if (closedHome) {
            // already back
          } else if (!hasBack) {
            mine.push(`${tag}: ${dest} has no "← Back"`);
            await page.goBack();
          } else {
            await backBtn.click();
          }
        }
        const returned = await expect
          .poll(() => noHash(page.url()), { timeout: 5_000 })
          .toBe(noHash(fromUrl))
          .then(() => true)
          .catch(() => false);
        if (!returned) {
          mine.push(`${tag}: Back from ${dest} went to ${rel(page.url())}, not ${rel(fromUrl)}`);
          await open();
          return;
        }
        if (fromY > 40) {
          const near = await expect
            .poll(async () => Math.abs((await scrollY(page)) - fromY), { timeout: 5_000 })
            .toBeLessThan(80)
            .then(() => true)
            .catch(() => false);
          if (!near) {
            const room = await page.evaluate(
              () => document.documentElement.scrollHeight - window.innerHeight
            );
            if (room >= fromY - 80)
              mine.push(
                `${tag}: Back from ${dest} lost the scroll position (${await scrollY(page)}px, was ${fromY}px)`
              );
          }
        }
      };
      try {
        await once();
      } catch (e) {
        counts.skipped++;
        notes.push(`${tag}: skipped (${String(e).split('\n')[0].slice(0, 120)})`);
        await open().catch(() => undefined);
      }
      // The dev server reloads the page when another session saves a file:
      // that is not the app's navigation, so check this control again.
      if (attempt === 0 && opens === opensAtClick && clickDoc && (await docId()) !== clickDoc) {
        notes.push(`${tag}: the dev server reloaded the page mid-check; checked again`);
        await open().catch(() => undefined);
        continue;
      }
      problems.push(...mine);
      break;
    }
  }
  await info.attach('crawl.json', {
    body: JSON.stringify({ start, counts, problems, notes }, null, 2),
    contentType: 'application/json',
  });
  if (blocked.length)
    notes.push(`writes answered locally: ${[...new Set(blocked.splice(0))].join(', ')}`);
  console.log(
    `CRAWL ${start} ${JSON.stringify(counts)}${problems.length ? ` PROBLEMS ${problems.length}` : ''}`
  );
  for (const n of notes) console.log(`  note ${n}`);
  return { problems, notes, counts };
}

function crawlTest(
  who: Who,
  size: 'desktop' | 'phone',
  target: () => Promise<string> | string,
  label: string
) {
  test(`crawl ${label} (${who}, ${size})`, async ({ browser }, info) => {
    test.setTimeout(20 * 60_000);
    const { context, page, errors } = await signedInPage(browser, who, size);
    await context.addInitScript(countPushes);
    await blockWrites(context);
    page.setDefaultTimeout(30_000);
    page.setDefaultNavigationTimeout(45_000);
    try {
      const { problems } = await crawl(page, errors, await target(), info);
      expect.soft(problems, 'navigation problems').toEqual([]);
    } finally {
      await context.close();
    }
  });
}

for (const size of ['desktop', 'phone'] as const) {
  for (const p of STANDALONE) crawlTest('tutor', size, () => `/${p}`, `/${p}`);
  for (const s of SECTIONS) crawlTest('tutor', size, () => `/college?section=${s}`, `section ${s}`);
  crawlTest(
    'tutor',
    size,
    async () => `/college?section=student360&studentId=${(await learnerRoll()).id}`,
    'section student360'
  );
  crawlTest(
    'tutor',
    size,
    async () => `/college/students/${(await learnerRoll()).id}/evidence`,
    'evidence timeline'
  );
  for (const p of LEARNER_PAGES) crawlTest('learner', size, () => `/${p}`, `/${p}`);
}

/* ───────────── the ways around that are not on the page itself ───────────── */

const section = (page: Page) => new URL(page.url()).searchParams.get('section');
const backBtn = (page: Page) => page.getByRole('button', { name: /^(← )?Back$/ }).first();
async function atTop(page: Page, where: string) {
  await expect
    .poll(() => scrollY(page), { message: `${where} opens at the top`, timeout: 5_000 })
    .toBeLessThan(5);
}
async function guarded(
  browser: Parameters<typeof signedInPage>[0],
  who: Who,
  size: 'desktop' | 'phone'
) {
  const s = await signedInPage(browser, who, size);
  await s.context.addInitScript(countPushes);
  await blockWrites(s.context);
  s.page.setDefaultTimeout(15_000);
  return s;
}

for (const size of ['desktop', 'phone'] as const) {
  test(`learner profile: previous / next swap the learner, Back returns to the list (${size})`, async ({
    browser,
  }) => {
    test.setTimeout(3 * 60_000);
    const { context, page, errors } = await guarded(browser, 'tutor', size);
    try {
      await page.goto('/college?section=students');
      await settle(page);
      await page.getByRole('button', { name: /^Open Demo Learner \(fixture\)$/ }).click();
      await expect.poll(() => section(page)).toBe('student360');
      await settle(page);
      const first = new URL(page.url()).searchParams.get('studentId');
      const next = page.getByRole('button', { name: /^Next: / }).first();
      await next.click();
      await expect.poll(() => new URL(page.url()).searchParams.get('studentId')).not.toBe(first);
      await settle(page);
      await atTop(page, 'The next learner');
      await page
        .getByRole('button', { name: /^Previous: / })
        .first()
        .click();
      await expect.poll(() => new URL(page.url()).searchParams.get('studentId')).toBe(first);
      await backBtn(page).click();
      await expect
        .poll(() => section(page), {
          message: 'Back goes to the list, not the learner flicked past',
        })
        .toBe('students');
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test(`search (Ctrl+K), alerts and Act land and come back (${size})`, async ({ browser }) => {
    test.setTimeout(4 * 60_000);
    const { context, page, errors } = await guarded(browser, 'tutor', size);
    try {
      // Search: a learner result opens their profile; Back returns home.
      await page.goto('/college');
      await settle(page);
      await page.getByRole('button', { name: 'Search learners' }).click();
      await page.getByPlaceholder('Search learners, staff or courses').fill('Demo Learner');
      await page
        .getByRole('option', { name: /Demo Learner/ })
        .first()
        .click();
      await expect.poll(() => section(page)).toBe('student360');
      await settle(page);
      await atTop(page, 'A learner from search');
      await backBtn(page).click();
      await expect(page).toHaveURL(/\/college$/);

      // Search: a page result (Inbox).
      if (size === 'desktop') {
        await page.keyboard.press('Control+k');
      } else {
        await page.getByRole('button', { name: 'Search learners' }).click();
      }
      await page
        .getByRole('option', { name: /^Inbox/ })
        .first()
        .click();
      await expect(page).toHaveURL(/\/college\/inbox$/);
      await settle(page);
      await atTop(page, 'Inbox from search');
      await backBtn(page).click();
      await expect(page).toHaveURL(/\/college$/);

      // Alerts: each of the first three lands on a real page and Back returns.
      let opened = 0;
      for (let n = 0; n < 3; n++) {
        await page.getByRole('button', { name: /^Alerts/ }).click();
        const items = page.locator('[role=dialog] li button');
        await items
          .first()
          .waitFor({ timeout: 8_000 })
          .catch(() => undefined);
        if ((await items.count()) <= n) {
          await page.keyboard.press('Escape');
          break;
        }
        const label = ((await items.nth(n).innerText()) || '').replace(/\s+/g, ' ').slice(0, 60);
        const before = errors.length;
        await items.nth(n).click();
        await expect(page, `alert "${label}" navigates`).not.toHaveURL(/\/college$/);
        await settle(page);
        expect(await landingProblem(page, errors, before), `alert "${label}"`).toBeNull();
        await closeOverlays(page);
        // A sheet the alert opened returns to the College home when it closes.
        await page.waitForTimeout(800);
        if (!/\/college$/.test(new URL(page.url()).pathname)) await backBtn(page).click();
        await expect(page, `Back from alert "${label}"`).toHaveURL(/\/college$/);
        await settle(page);
        opened++;
      }
      console.log(`ALERTS opened ${opened}`);

      // Act from a standalone page: Verify hours, then Register (opens on the home page).
      await page.goto('/college/today');
      await settle(page);
      await page.getByRole('button', { name: /^Act/ }).first().click();
      await page
        .getByRole('button', { name: /^Verify hours/ })
        .first()
        .click();
      await expect(page).toHaveURL(/\/college\/otj$/);
      await settle(page);
      await atTop(page, 'Act › Verify hours');
      await backBtn(page).click();
      await expect(page).toHaveURL(/\/college\/today$/);
      await settle(page);
      await page.getByRole('button', { name: /^Act/ }).first().click();
      await page
        .getByRole('button', { name: /^Register/ })
        .first()
        .click();
      await expect(page.locator('[role=dialog]:visible').first()).toBeVisible();
      await closeOverlays(page);
      await backBtn(page).click();
      await expect(page, 'Back after Act › Register returns to Today').toHaveURL(
        /\/college\/today$/
      );
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}

test('learner tab bar: every tab lands at the top and Back returns (phone)', async ({
  browser,
}) => {
  test.setTimeout(4 * 60_000);
  const { context, page, errors } = await guarded(browser, 'learner', 'phone');
  try {
    const bar = page.getByRole('navigation', { name: 'Apprentice navigation' });
    for (const [tab, to] of [
      ['Today', /\/apprentice\/today$/],
      ['Hours', /\/apprentice\/ojt-hub/],
      ['Me', /\/apprentice\/hub/],
      ['Learn', /\/study-centre/],
    ] as const) {
      await page.goto('/apprentice/college-plan');
      await settle(page);
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(300);
      const fromY = await scrollY(page);
      await bar.getByRole('button', { name: tab }).click();
      await expect(page).toHaveURL(to);
      await settle(page);
      expect(await landingProblem(page, errors, 0), tab).toBeNull();
      await atTop(page, tab);
      await closeOverlays(page); // a "your week" card can open over Today
      // Tapping the tab you are on does not stack it in history.
      const n = await pushes(page);
      await bar.getByRole('button', { name: tab }).click();
      await page.waitForTimeout(400);
      expect(await pushes(page), `${tab} tapped twice`).toBe(n);
      if (tab === 'Learn') await page.goBack();
      else await backBtn(page).click();
      await expect(page, `Back from ${tab}`).toHaveURL(/\/apprentice\/college-plan$/);
      await expect
        .poll(async () => Math.abs((await scrollY(page)) - fromY), {
          message: `${tab}: My college scroll`,
          timeout: 5_000,
        })
        .toBeLessThan(80);
    }
    // Capture opens the sheet in place.
    await bar.getByRole('button', { name: 'Capture evidence' }).click();
    await expect(page.locator('[role=dialog]:visible').first()).toBeVisible();
    await closeOverlays(page);
    await expect(page).toHaveURL(/\/apprentice\/college-plan$/);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
