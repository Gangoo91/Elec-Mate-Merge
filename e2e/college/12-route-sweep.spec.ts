/**
 * Journey 12 — every College Hub route and dashboard section, read-only.
 *
 * Opens each as the fixture tutor, on desktop and phone, and fails on a page
 * error or a horizontal overflow on the phone. Nothing is written.
 */
import { test, expect } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const PATHS = [
  'college', 'college/today', 'college/marking', 'college/inbox', 'college/compliance',
  'college/compliance/pack', 'college/compliance/ofsted', 'college/compliance/sar',
  'college/compliance/qip', 'college/compliance/rehearsal', 'college/reports', 'college/compare',
  'college/iqa', 'college/otj', 'college/otj/inbox', 'college/evidence-pack', 'college/help',
  'college/value', 'college/reviews', 'college/ai-notebook', 'college/epa', 'college/quizzes',
  'college/settings/curriculum', 'college/settings/operational', 'assessor',
];

const SECTIONS = [
  'overview', 'peoplehub', 'curriculumhub', 'assessmenthub', 'resourceshub', 'qualityhub', 'tutors',
  'students', 'cohorts', 'supportstaff', 'courses', 'coursesetup', 'lessonplans', 'teachingresources',
  'tutornotebook', 'schemesofwork', 'documentlibrary', 'grading', 'attendance', 'ilpmanagement',
  'epatracking', 'progresstracking', 'portfolio', 'workqueue', 'compliancedocs', 'safeguardingqueue',
  'ltisettings', 'collegesettings', 'employerportal', 'otjtraining', 'qualitydashboard', 'timetable',
  'aiilpgenerator', 'iqaworkflow', 'batchoperations', 'assessmentcalendar', 'resourceanalytics',
  'masteryqueue', 'iqaotjaudit', 'tutorobs', 'auditlog', 'tutorworkload',
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`every College Hub route (${viewport})`, async ({ browser }) => {
    test.setTimeout(15 * 60_000);
    const ctx = await learnerContext();
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    const urls = [
      ...PATHS.map((p) => `/${p}`),
      ...SECTIONS.map((s) => `/college?section=${s}`),
      `/college?section=student360&studentId=${ctx.student_id}`,
      `/college/students/${ctx.student_id}/evidence`,
    ];
    const problems: string[] = [];
    for (const url of urls) {
      const before = errors.length;
      await page.goto(url);
      await page.waitForLoadState('networkidle').catch(() => undefined);
      await page.waitForTimeout(700);
      if (errors.length > before) problems.push(`${url}: ${errors.slice(before).join(' | ')}`);
      if (viewport === 'phone') {
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 1) problems.push(`${url}: overflows the phone by ${overflow}px`);
      }
    }
    expect(problems).toEqual([]);
  });
}
