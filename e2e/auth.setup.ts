import { test as setup, expect } from '@playwright/test';
import { seedAuthenticatedSession } from './fixtures/auth';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await seedAuthenticatedSession(page);

  // Ensure login was successful
  await expect(page.locator('body')).toBeVisible();

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
