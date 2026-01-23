import { test, expect, Page } from '@playwright/test';

/**
 * Level 3 Apprentice Courses - End-to-End Test Suite
 *
 * Tests the complete flow through Study Centre → Apprentice → Level 3 courses:
 * - Navigation to Level 3 from various entry points
 * - All 8 modules open correctly
 * - Sections within modules load content
 * - Back navigation works properly
 * - Mock exam full flow (start → answer → submit → results → review)
 */

const TIMEOUT = 30000;

// Helper function to login if required
async function loginIfRequired(page: Page) {
  if (page.url().includes('/auth/signin')) {
    await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'testpassword');
    await page.click('button[type="submit"]');
    await page.waitForURL(/(?!.*signin)/);
  }
}

// Helper to wait for page content to load
async function waitForContentLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('[data-loading="true"]', { state: 'hidden', timeout: 5000 }).catch(() => {});
}

test.describe('Level 3 Apprentice Courses', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  test.describe('Navigation & Access', () => {
    test('should navigate to Level 3 from Study Centre', async ({ page }) => {
      await page.goto('/study-centre');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Look for Apprentice section
      const apprenticeLink = page.locator('text=Apprentice').first();
      if (await apprenticeLink.isVisible()) {
        await apprenticeLink.click();
        await waitForContentLoad(page);
      }

      // Navigate to Level 3
      const level3Link = page.locator('text=Level 3').first();
      await expect(level3Link).toBeVisible({ timeout: 10000 });
      await level3Link.click();

      await expect(page).toHaveURL(/level3/);
    });

    test('should navigate directly to Level 3 via URL', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify Level 3 page loaded
      await expect(page.locator('h1, h2').filter({ hasText: /Level 3|Apprentice/i }).first()).toBeVisible();
    });

    test('should display all 8 modules on Level 3 page', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check for module cards/links - Level 3 specific topics
      const moduleTexts = [
        'Health and Safety',
        'Environmental',
        'Electrical Science',
        'Fault',
        'Inspection',
        'Design',
        'Career',
        'Mock'
      ];

      for (const moduleText of moduleTexts) {
        const moduleElement = page.locator(`text=${moduleText}`).first();
        await expect(moduleElement).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe('Module 1: Health and Safety', () => {
    test('should open Module 1 and display sections', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify module title
      await expect(page.locator('text=Health and Safety').first()).toBeVisible();

      // Check sections are visible (Module 1 has 6 sections)
      const sectionCount = await page.locator('[data-section], .section-card, a[href*="section"]').count();
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('should navigate to Section 1 and load content', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module1-section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify content loaded
      const content = page.locator('main, .content, article').first();
      await expect(content).toBeVisible();

      // Should have meaningful content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);
    });

    test('should navigate to subsection and back', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module1-section1-1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify content loaded
      await expect(page.locator('main, .content, article').first()).toBeVisible();

      // Find and click back button
      const backButton = page.locator('button:has-text("Back"), a:has-text("Back"), [aria-label*="back"]').first();
      if (await backButton.isVisible()) {
        await backButton.click();
        await waitForContentLoad(page);

        // Should be back at section or module level
        expect(page.url()).not.toMatch(/section1-1$/);
      }
    });
  });

  test.describe('Module 2: Environmental Technology', () => {
    test('should open Module 2 and display sections', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module2');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Environmental').first()).toBeVisible();
    });

    test('should navigate through Module 2 sections', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module2-section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await expect(page.locator('main, .content').first()).toBeVisible();

      await page.goto('/study-centre/apprentice/level3-module2-section2');
      await waitForContentLoad(page);
      await expect(page.locator('main, .content').first()).toBeVisible();
    });
  });

  test.describe('Module 3: Electrical Science', () => {
    test('should open Module 3', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module3');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Electrical Science, text=Science').first()).toBeVisible();
    });
  });

  test.describe('Module 4: Fault Diagnosis', () => {
    test('should open Module 4', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module4');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Fault').first()).toBeVisible();
    });
  });

  test.describe('Module 5: Inspection & Testing', () => {
    test('should open Module 5', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module5');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Inspection, text=Testing').first()).toBeVisible();
    });
  });

  test.describe('Module 6: Electrical Systems Design', () => {
    test('should open Module 6', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module6');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Design').first()).toBeVisible();
    });
  });

  test.describe('Module 7: Career & Professional Development', () => {
    test('should open Module 7', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module7');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Career, text=Professional').first()).toBeVisible();
    });
  });

  test.describe('Module 8: Mock Examinations', () => {
    test('should open Module 8 and display mock exam options', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Mock, text=Exam, text=Assessment').first()).toBeVisible();
    });

    test('should access Mock Exam 1 (Health & Safety)', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module8-mock-exam1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should see exam interface or start screen
      const examElement = page.locator('text=Mock Exam, text=Start, text=Question, button:has-text("Start"), button:has-text("Begin")').first();
      await expect(examElement).toBeVisible({ timeout: 10000 });
    });

    test('should access Mock Exam 8 (Comprehensive)', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module8-mock-exam8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const examElement = page.locator('text=Mock Exam, text=Start, text=Comprehensive, button:has-text("Start")').first();
      await expect(examElement).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Mock Exam Full Flow', () => {
    test('should complete full mock exam flow - start, answer, submit, review', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module8-mock-exam1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Step 1: Verify exam start screen
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await expect(startButton).toBeVisible({ timeout: 10000 });

      // Step 2: Start the exam
      await startButton.click();
      await waitForContentLoad(page);

      // Step 3: Verify exam interface loaded
      await expect(page.locator('text=Question 1, text=1 of, text=1/')).toBeVisible({ timeout: 10000 });

      // Step 4: Answer first question
      const firstOption = page.locator('input[type="radio"], button[role="radio"], .answer-option, label:has(input)').first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      // Step 5: Navigate to next question
      const nextButton = page.locator('button:has-text("Next"), button[aria-label*="next"]').first();
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await waitForContentLoad(page);
        await expect(page.locator('text=Question 2, text=2 of, text=2/')).toBeVisible({ timeout: 5000 });
      }

      // Step 6: Test flag functionality
      const flagButton = page.locator('button:has-text("Flag"), button[aria-label*="flag"], .flag-button').first();
      if (await flagButton.isVisible()) {
        await flagButton.click();
      }

      // Step 7: Test previous navigation
      const prevButton = page.locator('button:has-text("Previous"), button:has-text("Prev")').first();
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await waitForContentLoad(page);
        await expect(page.locator('text=Question 1, text=1 of, text=1/')).toBeVisible({ timeout: 5000 });
      }

      // Step 8: Answer a few more questions
      for (let i = 0; i < 5; i++) {
        const option = page.locator('input[type="radio"], button[role="radio"], .answer-option, label:has(input)').first();
        if (await option.isVisible()) {
          await option.click();
        }

        const next = page.locator('button:has-text("Next")').first();
        if (await next.isVisible() && await next.isEnabled()) {
          await next.click();
          await page.waitForTimeout(300);
        }
      }

      // Step 9: Look for submit functionality
      const submitButton = page.locator('button:has-text("Submit"), button:has-text("Finish"), button:has-text("Complete")').first();

      if (!(await submitButton.isVisible())) {
        // Try to navigate to last question via question grid
        const lastQuestion = page.locator('button:has-text("30"), .question-grid button:last-child').first();
        if (await lastQuestion.isVisible()) {
          await lastQuestion.click();
          await waitForContentLoad(page);
        }
      }

      // Answer last question if needed
      const lastOption = page.locator('input[type="radio"], button[role="radio"], .answer-option').first();
      if (await lastOption.isVisible()) {
        await lastOption.click();
      }

      // Submit exam
      const finalSubmit = page.locator('button:has-text("Submit"), button:has-text("Finish")').first();
      if (await finalSubmit.isVisible()) {
        await finalSubmit.click();
        await waitForContentLoad(page);

        // Step 10: Verify results screen
        const resultsIndicator = page.locator('text=Results, text=Score, text=%, text=Correct, text=Complete').first();
        await expect(resultsIndicator).toBeVisible({ timeout: 10000 });

        // Step 11: Test review mode
        const reviewButton = page.locator('button:has-text("Review"), button:has-text("View Answers")').first();
        if (await reviewButton.isVisible()) {
          await reviewButton.click();
          await waitForContentLoad(page);
          await expect(page.locator('text=Review, text=Answer').first()).toBeVisible();
        }

        // Step 12: Verify retake option exists
        const retakeButton = page.locator('button:has-text("Retake"), button:has-text("Try Again"), button:has-text("Restart")').first();
        await expect(retakeButton).toBeVisible();
      }
    });

    test('should show timer during exam', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module8-mock-exam1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await startButton.click();
      await waitForContentLoad(page);

      // Check for timer display (45:00 or similar)
      const timer = page.locator('text=45:, text=44:, text=:00, .timer, [data-timer]').first();
      await expect(timer).toBeVisible({ timeout: 10000 });
    });

    test('should show progress indicator during exam', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module8-mock-exam1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await startButton.click();
      await waitForContentLoad(page);

      const progress = page.locator('text=1 of 30, text=1/30, .progress, [role="progressbar"]').first();
      await expect(progress).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Back Navigation', () => {
    test('should navigate back from section to module', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module1-section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const backLink = page.locator('a:has-text("Back"), button:has-text("Back"), a:has-text("Module"), [aria-label*="back"]').first();
      await expect(backLink).toBeVisible();
      await backLink.click();
      await waitForContentLoad(page);

      expect(page.url()).toMatch(/level3-module1\/?$/);
    });

    test('should navigate back from module to Level 3 overview', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const backLink = page.locator('a:has-text("Back"), a:has-text("Level 3"), button:has-text("Back"), [aria-label*="back"]').first();
      await expect(backLink).toBeVisible();
      await backLink.click();
      await waitForContentLoad(page);

      expect(page.url()).toMatch(/level3\/?$/);
    });

    test('should use browser back button correctly', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await page.goto('/study-centre/apprentice/level3-module1');
      await waitForContentLoad(page);

      await page.goto('/study-centre/apprentice/level3-module1-section1');
      await waitForContentLoad(page);

      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain('level3-module1');
      expect(page.url()).not.toContain('section1');

      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toMatch(/level3\/?$/);
    });
  });

  test.describe('Content Loading', () => {
    test('should load text content on section pages', async ({ page }) => {
      await page.goto('/study-centre/apprentice/level3-module1-section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);

      // Should not show error messages
      expect(bodyText).not.toContain('Error');
      expect(bodyText).not.toContain('404');
      expect(bodyText).not.toContain('Not Found');
    });

    test('should not show console errors on page load', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/study-centre/apprentice/level3-module1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const criticalErrors = consoleErrors.filter(err =>
        !err.includes('favicon') &&
        !err.includes('analytics') &&
        !err.includes('third-party')
      );

      expect(criticalErrors.length).toBe(0);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/study-centre/apprentice/level3');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const body = page.locator('body');
      const scrollWidth = await body.evaluate(el => el.scrollWidth);
      const clientWidth = await body.evaluate(el => el.clientWidth);

      expect(scrollWidth - clientWidth).toBeLessThan(20);

      const moduleLink = page.locator('text=Module 1, a[href*="module1"]').first();
      await expect(moduleLink).toBeVisible();
    });
  });
});

test.describe('All Level 3 Modules Quick Smoke Test', () => {
  const modules = [
    { num: 1, name: 'Health and Safety' },
    { num: 2, name: 'Environmental Technology' },
    { num: 3, name: 'Electrical Science' },
    { num: 4, name: 'Fault Diagnosis' },
    { num: 5, name: 'Inspection Testing' },
    { num: 6, name: 'Systems Design' },
    { num: 7, name: 'Career Development' },
    { num: 8, name: 'Mock Exams' },
  ];

  for (const module of modules) {
    test(`Module ${module.num} (${module.name}) should load without errors`, async ({ page }) => {
      await page.goto(`/study-centre/apprentice/level3-module${module.num}`);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required - skipping');
        return;
      }

      await page.waitForLoadState('networkidle');

      const bodyText = await page.locator('body').textContent();
      expect(bodyText).not.toContain('Error');
      expect(bodyText).not.toContain('404');
      expect(bodyText?.length).toBeGreaterThan(50);
    });
  }
});

test.describe('All Level 3 Mock Exams Quick Smoke Test', () => {
  for (let i = 1; i <= 8; i++) {
    test(`Mock Exam ${i} should load start screen`, async ({ page }) => {
      await page.goto(`/study-centre/apprentice/level3-module8-mock-exam${i}`);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required - skipping');
        return;
      }

      await page.waitForLoadState('networkidle');

      // Should show exam start button or exam interface
      const examElement = page.locator('button:has-text("Start"), button:has-text("Begin"), text=Mock Exam, text=Question').first();
      await expect(examElement).toBeVisible({ timeout: 10000 });
    });
  }
});
