/**
 * Journey 76 — phone audit of every College Hub screen (tutor and learner).
 *
 *   PHONE_AUDIT=1 npx playwright test -c playwright.college.config.ts e2e/college/76-phone-audit.spec.ts
 *
 * A report, not a gate: skipped unless PHONE_AUDIT is set. At 360 px (small
 * Android) and 390 px (iPhone) it opens every route read-only and records,
 * per screen, what makes a phone screen feel unfinished:
 *   overflow   page scrolls sideways
 *   offscreen  a visible control whose right edge is past the screen
 *   tap        visible controls under 44 px tall or 32 px wide (not inline links in prose)
 *   tiny       visible text under 12 px
 *   cut        text cut off with an ellipsis
 *   caps       spaced uppercase labels (letter-spacing over 1 px)
 *   tint       translucent yellow backgrounds (render muddy brown)
 * Runs in the installed Google Chrome. Writes /tmp/em-qa/phone-audit/report.json and a full-page screenshot per screen.
 */
import fs from 'node:fs';
import { test, type Page } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage, type Who } from './support';

test.skip(!haveCreds() || !process.env.PHONE_AUDIT, 'Set PHONE_AUDIT=1 to run the phone audit');
// Real Google Chrome, not Playwright's bundled Chromium.
test.use({ channel: 'chrome' });

const OUT = '/tmp/em-qa/phone-audit';

const TUTOR_PATHS = [
  'college', 'college/today', 'college/marking', 'college/inbox', 'college/compliance',
  'college/compliance/pack', 'college/compliance/ofsted', 'college/compliance/sar',
  'college/compliance/qip', 'college/compliance/rehearsal', 'college/reports', 'college/compare',
  'college/iqa', 'college/otj', 'college/otj/inbox', 'college/evidence-pack', 'college/help',
  'college/value', 'college/reviews', 'college/ai-notebook', 'college/epa', 'college/quizzes',
  'college/settings/curriculum', 'college/settings/operational', 'college/settings/data',
  'college/settings/mis', 'college/onboarding', 'college/trust', 'assessor',
];
const SECTIONS = [
  'peoplehub', 'curriculumhub', 'assessmenthub', 'resourceshub', 'qualityhub', 'tutors',
  'students', 'cohorts', 'supportstaff', 'courses', 'coursesetup', 'lessonplans', 'teachingresources',
  'tutornotebook', 'schemesofwork', 'documentlibrary', 'grading', 'attendance', 'ilpmanagement',
  'epatracking', 'progresstracking', 'portfolio', 'workqueue', 'compliancedocs', 'safeguardingqueue',
  'ltisettings', 'collegesettings', 'employerportal', 'otjtraining', 'qualitydashboard', 'timetable',
  'aiilpgenerator', 'iqaworkflow', 'batchoperations', 'assessmentcalendar', 'resourceanalytics',
  'iqaotjaudit', 'tutorobs', 'auditlog', 'tutorworkload',
];
const LEARNER_PATHS = [
  'apprentice/college-plan', 'apprentice/college-plan/hours', 'apprentice/college/today',
  'apprentice/college/plan', 'apprentice/college/progress', 'apprentice/college/activities',
  'apprentice/college/epa', 'apprentice/college/voice', 'apprentice/college/compliance',
  'apprentice/college-ai', 'apprentice/hub', 'apprentice/hub?tab=work',
  'apprentice/hub?tab=work&view=coverage', 'apprentice/hub?tab=work&view=readiness',
  'apprentice/hub?tab=progress', 'apprentice/hub?tab=me', 'apprentice/epa-simulator?tab=readiness',
  'apprentice/net-checklist', 'apprentice/gold-card', 'apprentice/today',
];

interface Finding {
  who: Who;
  width: number;
  url: string;
  shot: string;
  overflow: number;
  offscreen: string[];
  tap: string[];
  tiny: string[];
  cut: string[];
  caps: string[];
  tint: number;
  errors: string[];
}

async function measure(page: Page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const visible = (el: Element) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return false;
      const s = getComputedStyle(el);
      return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
    };
    const label = (el: Element) =>
      ((el.getAttribute('aria-label') || (el as HTMLElement).innerText || el.tagName) ?? '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 40);
    // Inside something that scrolls sideways on purpose (a chip rail)?
    const inScroller = (el: Element) => {
      for (let p = el.parentElement; p; p = p.parentElement) {
        const s = getComputedStyle(p);
        if ((s.overflowX === 'auto' || s.overflowX === 'scroll') && p.scrollWidth > p.clientWidth) return true;
      }
      return false;
    };
    const controls = Array.from(
      document.querySelectorAll('button, a[href], [role="button"], [role="tab"], input:not([type="hidden"]), select, textarea')
    ).filter(visible);
    const offscreen: string[] = [];
    const tap: string[] = [];
    for (const el of controls) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && !inScroller(el)) offscreen.push(`${label(el)} (${Math.round(r.right)})`);
      const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline';
      const tiny = (el as HTMLInputElement).type === 'checkbox' || (el as HTMLInputElement).type === 'radio';
      if (!inline && !tiny && (r.height < 44 || r.width < 32)) tap.push(`${label(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    const tinyText: string[] = [];
    const cut: string[] = [];
    const caps: string[] = [];
    let tint = 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = n as HTMLElement;
      if (!visible(el)) continue;
      const s = getComputedStyle(el);
      const ownText = Array.from(el.childNodes).some((c) => c.nodeType === 3 && c.textContent!.trim());
      if (ownText) {
        const fs = parseFloat(s.fontSize);
        if (fs < 12) tinyText.push(`${el.innerText.trim().slice(0, 30)} ${fs}px`);
        if (s.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1) cut.push(el.innerText.trim().slice(0, 40));
        if (s.textTransform === 'uppercase' && parseFloat(s.letterSpacing) > 1) caps.push(el.innerText.trim().slice(0, 30));
      }
      const m = s.backgroundColor.match(/rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/);
      if (m && +m[1] > 200 && +m[2] > 180 && +m[3] < 80 && +m[4] < 0.5 && +m[4] > 0) tint++;
    }
    return {
      overflow: Math.max(0, document.documentElement.scrollWidth - vw),
      offscreen: [...new Set(offscreen)].slice(0, 15),
      tap: [...new Set(tap)].slice(0, 40),
      tiny: [...new Set(tinyText)].slice(0, 20),
      cut: [...new Set(cut)].slice(0, 20),
      caps: [...new Set(caps)].slice(0, 15),
      tint,
    };
  });
}

const findings: Finding[] = [];

for (const who of ['tutor', 'learner'] as const) {
  test(`phone audit as ${who}`, async ({ browser }) => {
    test.setTimeout(60 * 60_000);
    fs.mkdirSync(OUT, { recursive: true });
    const ctx = await learnerContext();
    const urls =
      who === 'tutor'
        ? [
            ...TUTOR_PATHS.map((p) => `/${p}`),
            ...SECTIONS.map((s) => `/college?section=${s}`),
            `/college?section=student360&studentId=${ctx.student_id}`,
            `/college/students/${ctx.student_id}/evidence`,
          ]
        : LEARNER_PATHS.map((p) => `/${p}`);
    const { context, page, errors } = await signedInPage(browser, who, 'phone');
    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: width === 360 ? 780 : 844 });
      for (const url of urls) {
        const before = errors.length;
        try {
          await page.goto(url);
        } catch {
          await page.waitForTimeout(1500);
          await page.goto(url).catch(() => undefined);
        }
        await page.waitForLoadState('networkidle').catch(() => undefined);
        await page.waitForTimeout(900);
        const name = `${who}-${width}-${url.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '')}`.slice(0, 120);
        const shot = `${OUT}/${name}.png`;
        await page.screenshot({ path: shot, fullPage: true }).catch(() => undefined);
        const m = await measure(page).catch(() => null);
        if (!m) continue;
        findings.push({ who, width, url, shot, ...m, errors: errors.slice(before) });
      }
    }
    await context.close();
    const file = `${OUT}/report.json`;
    const prev = fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as Finding[]) : [];
    fs.writeFileSync(file, JSON.stringify([...prev.filter((f) => f.who !== who), ...findings.filter((f) => f.who === who)], null, 1));
  });
}
