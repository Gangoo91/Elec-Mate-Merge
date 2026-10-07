import { defineConfig, devices } from '@playwright/test';

/**
 * College Hub journeys (ELE-1968) — the eight tutor–apprentice journeys, run
 * as the fixture tutor and fixture learner against the live demo college.
 *
 *   npm run test:college-e2e
 *
 * One worker, in order: the journeys share two accounts and one cohort, and
 * each cleans up its own rows by id. Kept out of the main config (which runs
 * every spec under five browsers with a different signed-in user).
 */
export default defineConfig({
  testDir: './e2e/college',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 120_000,
  expect: { timeout: 20_000 },
  reporter: process.env.CI ? [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-college' }]] : [['list']],
  use: {
    baseURL: process.env.COLLEGE_E2E_BASE_URL || 'http://localhost:8080',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: process.env.COLLEGE_E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:8080',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
