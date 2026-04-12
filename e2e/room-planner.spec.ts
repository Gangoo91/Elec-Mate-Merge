import { test, expect } from '@playwright/test';
import { loginViaUI } from './fixtures/auth';

test.describe('Room Planner', () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test('live room planner route shows a clear first-run state', async ({ page }) => {
    await page.goto('/electrician/business/room-planner');

    await expect(page.getByRole('heading', { name: 'Start Your First Room' })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Choose a starting point to draw your room layout.')).toBeVisible();
    await expect(page.getByRole('button', { name: /use a room shape/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /use ai help/i })).toBeVisible();
  });

  test('user can create and save a room from a shape on the live route', async ({ page }) => {
    await page.goto('/electrician/business/room-planner');

    await page.getByRole('button', { name: /use a room shape/i }).click();
    await page.getByRole('button', { name: /^Rectangle$/ }).click();
    await page.getByRole('button', { name: 'Place Rectangle' }).click();

    await page.getByRole('button', { name: 'Save Room' }).first().click();
    await page.getByLabel('Room name').fill('Kitchen');
    await page.getByRole('button', { name: 'Save Room' }).last().click();

    await expect(page.getByText('Kitchen', { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Export PDF' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create new room' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Start Your First Room' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Save Room' }).first().click();
    await expect(page.getByLabel('Room name')).toHaveValue('Kitchen');
  });
});
