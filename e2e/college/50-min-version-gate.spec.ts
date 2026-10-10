/**
 * ELE-1969: minimum supported native build per feature, served from config,
 * so a college learner is never on a stale build.
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/50-min-version-gate.spec.ts
 *
 * The prompt itself only renders inside the native app (Capacitor), which a
 * browser cannot be. So this proves the two halves it is built from:
 * 1. Config: app_versions.feature_minimums exists on the live database, is
 *    readable by the app (anon and signed-in) and defaults to no gate.
 * 2. Decision: the pure function the prompt uses (src/utils/featureGate.ts),
 *    loaded through the dev server: blocks college-linked users on College Hub
 *    screens, nudges them elsewhere, leaves everyone else alone, compares
 *    build numbers and dotted versions.
 */
import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL } from './support';
import { ANON } from './trustSupport';

test('config: feature_minimums is served and gates nothing by default', async () => {
  const anon = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
  const { data, error } = await anon
    .from('app_versions')
    .select('platform, version, feature_minimums')
    .eq('is_current', true);
  expect(error).toBeNull();
  expect((data ?? []).length).toBeGreaterThan(0);
  for (const row of data ?? []) {
    expect(typeof row.feature_minimums).toBe('object');
    console.log(
      `[50] ${row.platform} current ${row.version} feature_minimums=${JSON.stringify(row.feature_minimums)}`
    );
  }
});

test('decision: block on college screens, nudge elsewhere, nobody else affected', async ({
  page,
}) => {
  await page.goto('/auth/signin');
  const out = await page.evaluate(async () => {
    const m = await import('/src/utils/featureGate.ts');
    const minimums = { college: { build: 48, version: '1.0.5' } };
    const d = (v: string, b: string | number, linked: boolean, path: string) =>
      m.collegeGateDecision({
        minimums,
        currentVersion: v,
        currentBuild: b,
        isCollegeLinked: linked,
        pathname: path,
      });
    return {
      oldBuildCollege: d('1.0.5', 46, true, '/college'),
      oldBuildApprentice: d('1.0.5', 46, true, '/apprentice/college-plan/hours'),
      oldBuildElsewhere: d('1.0.5', 46, true, '/dashboard'),
      oldVersionCollege: d('1.0.4', 50, true, '/college/students/x'),
      upToDate: d('1.0.5', 48, true, '/college'),
      newer: d('1.1.0', 60, true, '/college'),
      notLinked: d('1.0.0', 1, false, '/college'),
      noFloor: m.collegeGateDecision({
        minimums: {},
        currentVersion: '0.0.1',
        currentBuild: 1,
        isCollegeLinked: true,
        pathname: '/college',
      }),
      cmp: [
        m.compareDotted('1.0.10', '1.0.9'),
        m.compareDotted('1.0', '1.0.0'),
        m.compareDotted('1.2', '1.10'),
      ],
      notCollegePath: m.isCollegePath('/colleges-near-me'),
    };
  });
  expect(out).toEqual({
    oldBuildCollege: 'block',
    oldBuildApprentice: 'block',
    oldBuildElsewhere: 'nudge',
    oldVersionCollege: 'block',
    upToDate: 'none',
    newer: 'none',
    notLinked: 'none',
    noFloor: 'none',
    cmp: [1, 0, -1],
    notCollegePath: false,
  });
});
