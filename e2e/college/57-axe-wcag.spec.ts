/**
 * ELE-1972 — accessibility audit, WCAG 2.2 AA, with axe-core.
 *
 * Opens the key College Hub screens as the fixture tutor and the key
 * apprentice-college screens as the fixture learner, on desktop and on a
 * phone, injects axe-core (node_modules/axe-core, the same engine as
 * @axe-core/playwright) and runs the WCAG 2.0 / 2.1 / 2.2 A and AA rules.
 *
 * Fails on any SERIOUS or CRITICAL violation. Moderate and minor findings are
 * written to the report (a11y-wcag22.json in the test output folder) so the
 * accessibility statement can name them, but do not fail the run.
 *
 * Read-only: nothing is written.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const AXE = fs.readFileSync(
  path.resolve(process.cwd(), 'node_modules/axe-core/axe.min.js'),
  'utf8'
);
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

interface Finding {
  url: string;
  viewport: string;
  rule: string;
  impact: string;
  help: string;
  nodes: number;
  targets: string[];
  sample: string;
}

async function audit(page: Page, url: string, viewport: string): Promise<Finding[]> {
  await page.goto(url);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  // Let skeletons resolve and entrance animations finish (framer-motion fades
  // would otherwise be measured half-transparent).
  await page.waitForTimeout(2500);
  await page.addScriptTag({ content: AXE });
  const result = await page.evaluate(async (tags) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axe = (window as any).axe;
    const r = await axe.run(document, {
      runOnly: { type: 'tag', values: tags },
      resultTypes: ['violations'],
    });
    return r.violations.map(
      (v: {
        id: string;
        impact: string;
        help: string;
        nodes: { target: string[]; html: string; failureSummary?: string }[];
      }) => ({
        rule: v.id,
        impact: v.impact ?? 'minor',
        help: v.help,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 8).map((n) => n.target.join(' ')),
        sample:
          (v.nodes[0]?.failureSummary ?? '').slice(0, 400) +
          ' :: ' +
          (v.nodes[0]?.html ?? '').slice(0, 200),
      })
    );
  }, TAGS);
  return (result as Omit<Finding, 'url' | 'viewport'>[]).map((f) => ({ ...f, url, viewport }));
}

/**
 * Findings are appended to one JSON-lines file per run (A11Y_OUT, or
 * a11y-wcag22.jsonl in the test output folder): a failed test restarts the
 * worker, so an in-memory list would lose the earlier pages.
 */
function record(found: Finding[], outDir: string) {
  const out = process.env.A11Y_OUT || path.join(outDir, 'a11y-wcag22.jsonl');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  for (const f of found) fs.appendFileSync(out, JSON.stringify(f) + '\n');
  for (const f of found)
    console.log(`  [${f.impact}] ${f.viewport} ${f.url} ${f.rule} x${f.nodes}`);
}

const STAFF = [
  '/college',
  '/college?section=peoplehub',
  '/college?section=students',
  '/college?section=cohorts',
  '/college?section=assessmenthub',
  '/college?section=qualityhub',
  '/college?section=collegesettings',
  '/college/inbox',
  '/college/today',
  '/college/marking',
  '/college/otj/inbox',
  '/college/iqa',
  '/college?section=workqueue',
  '/college?section=portfolio',
  '/college?section=safeguardingqueue',
  '/college/help',
  '/college/trust',
];

const LEARNER = [
  '/apprentice/college-plan',
  '/apprentice/college/today',
  '/apprentice/college/plan',
  '/apprentice/college/progress',
  '/apprentice/college/epa',
  '/apprentice/college/compliance',
];

const blocking = (fs: Finding[]) =>
  fs
    .filter((f) => f.impact === 'serious' || f.impact === 'critical')
    .map(
      (f) =>
        `${f.viewport} ${f.url} [${f.impact}] ${f.rule} x${f.nodes}: ${f.targets.slice(0, 3).join(' | ')}`
    );

for (const viewport of ['desktop', 'phone'] as const) {
  test(`College Hub staff screens meet WCAG 2.2 AA (${viewport})`, async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    const ctx = await learnerContext();
    const { page, context } = await signedInPage(browser, 'tutor', viewport);
    const urls = [...STAFF, `/college?section=student360&studentId=${ctx.student_id}`];
    const found: Finding[] = [];
    for (const url of urls) found.push(...(await audit(page, url, viewport)));
    record(found, test.info().project.outputDir);
    await context.close();
    expect(blocking(found)).toEqual([]);
  });

  test(`apprentice college screens meet WCAG 2.2 AA (${viewport})`, async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    const { page, context } = await signedInPage(browser, 'learner', viewport);
    const found: Finding[] = [];
    for (const url of LEARNER) found.push(...(await audit(page, url, viewport)));
    record(found, test.info().project.outputDir);
    await context.close();
    expect(blocking(found)).toEqual([]);
  });
}
