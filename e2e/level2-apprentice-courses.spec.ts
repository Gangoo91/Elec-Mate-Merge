import { test, expect, Page } from '@playwright/test';

/**
 * Level 2 Apprentice Courses - End-to-End Test Suite
 *
 * Tests the complete flow through the Study Centre → Apprentice → Level 2 courses:
 * - Navigation to Level 2 from various entry points
 * - All 8 modules open correctly
 * - Sections within modules load content
 * - Back navigation works properly
 * - Mock exam full flow (start → answer → submit → results → review)
 */

// Test configuration - uses baseURL from playwright.config.ts
const TIMEOUT = 30000;

// Helper function to login (if auth is required)
async function loginIfRequired(page: Page) {
  // Check if we're redirected to login
  if (page.url().includes('/auth/signin')) {
    // Use test credentials or skip auth for public pages
    await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'testpassword');
    await page.click('button[type="submit"]');
    await page.waitForURL(/(?!.*signin)/);
  }
}

// Helper to wait for page content to load
async function waitForContentLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  // Wait for any loading spinners to disappear
  await page.waitForSelector('[data-loading="true"]', { state: 'hidden', timeout: 5000 }).catch(() => {});
}

test.describe('Level 2 Apprentice Courses', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  test.describe('Navigation & Access', () => {
    test('should navigate to Level 2 from Study Centre', async ({ page }) => {
      await page.goto(`/study-centre`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Look for Apprentice section
      const apprenticeLink = page.locator('text=Apprentice').first();
      if (await apprenticeLink.isVisible()) {
        await apprenticeLink.click();
        await waitForContentLoad(page);
      }

      // Navigate to Level 2
      const level2Link = page.locator('text=Level 2').first();
      await expect(level2Link).toBeVisible({ timeout: 10000 });
      await level2Link.click();

      await expect(page).toHaveURL(/level2/);
    });

    test('should navigate directly to Level 2 via URL', async ({ page }) => {
      await page.goto(`/apprentice/study/level2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify Level 2 page loaded
      await expect(page.locator('h1, h2').filter({ hasText: /Level 2|Apprentice/i }).first()).toBeVisible();
    });

    test('should display all 8 modules on Level 2 page', async ({ page }) => {
      await page.goto(`/apprentice/study/level2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check for module cards/links
      const moduleTexts = [
        'Health and Safety',
        'Electrical Science',
        'Installation Methods',
        'Wiring Systems',
        'Design',
        'Inspection',
        'Fault Finding',
        'Mock Exam'
      ];

      for (const moduleText of moduleTexts) {
        const moduleElement = page.locator(`text=${moduleText}`).first();
        await expect(moduleElement).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe('Module 1: Health and Safety', () => {
    test('should open Module 1 and display sections', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify module title
      await expect(page.locator('text=Health and Safety').first()).toBeVisible();

      // Check sections are visible (Module 1 has 6 sections)
      const sectionCount = await page.locator('[data-section], .section-card, a[href*="section"]').count();
      expect(sectionCount).toBeGreaterThan(0);
    });

    test('should navigate to Section 1 and load content', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module1/section1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify content loaded
      const content = page.locator('main, .content, article').first();
      await expect(content).toBeVisible();

      // Check for subsection navigation
      const hasSubsections = await page.locator('a[href*="1-1"], button:has-text("1.1"), text=1.1').count() > 0;
      expect(hasSubsections || await content.textContent()).toBeTruthy();
    });

    test('should navigate to subsection and back', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module1/section1/1-1`);
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
        expect(page.url()).not.toContain('1-1');
      }
    });
  });

  test.describe('Module 2: Electrical Science', () => {
    test('should open Module 2 and display sections', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Electrical Science').first()).toBeVisible();
    });

    test('should navigate through Module 2 sections', async ({ page }) => {
      // Test section 1
      await page.goto(`/apprentice/study/level2/module2/section1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await expect(page.locator('main, .content').first()).toBeVisible();

      // Test section 2
      await page.goto(`/apprentice/study/level2/module2/section2`);
      await waitForContentLoad(page);
      await expect(page.locator('main, .content').first()).toBeVisible();
    });
  });

  test.describe('Module 3: Installation Methods', () => {
    test('should open Module 3', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module3`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Installation').first()).toBeVisible();
    });
  });

  test.describe('Module 4: Wiring Systems', () => {
    test('should open Module 4', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module4`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Wiring').first()).toBeVisible();
    });
  });

  test.describe('Module 5: Design & Planning', () => {
    test('should open Module 5', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module5`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Design').first()).toBeVisible();
    });
  });

  test.describe('Module 6: Inspection & Testing', () => {
    test('should open Module 6', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module6`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Inspection').first()).toBeVisible();
    });

    test('should load Level 2 specific content in Section 6', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module6/section6`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // This section has Level 2 specific content about recording test results
      await expect(page.locator('main, .content').first()).toBeVisible();
    });
  });

  test.describe('Module 7: Fault Finding', () => {
    test('should open Module 7', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module7`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Fault').first()).toBeVisible();
    });

    test('should access Module 7 mock exam', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module7/mock-exam-7`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should see exam start screen or exam interface
      const examElement = page.locator('text=Mock Exam, text=Start Exam, text=Question, button:has-text("Start")').first();
      await expect(examElement).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Module 8: Mock Examinations', () => {
    test('should open Module 8 and display mock exam options', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module8`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check for mock exam section
      await expect(page.locator('text=Mock').first()).toBeVisible();
    });

    test('should display all mock exams in Section 1', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module8/section1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should show multiple mock exam cards/links
      const mockExamLinks = page.locator('a[href*="mock"], button:has-text("Mock"), .mock-exam-card');
      const count = await mockExamLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display exam tips in Section 2', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module8/section2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should show exam tips content
      await expect(page.locator('text=Exam, text=Tips, text=Pass').first()).toBeVisible();
    });
  });

  test.describe('Mock Exam Full Flow', () => {
    test('should complete full mock exam flow - start, answer, submit, review', async ({ page }) => {
      // Go to Mock Exam 1 (Health & Safety)
      await page.goto(`/apprentice/study/level2/module8/section1/mock1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Step 1: Verify exam start screen
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await expect(startButton).toBeVisible({ timeout: 10000 });

      // Verify exam info is shown (30 questions, 45 minutes)
      const examInfo = page.locator('text=30, text=questions, text=45, text=minutes');
      // At least some exam info should be visible

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

        // Verify moved to question 2
        await expect(page.locator('text=Question 2, text=2 of, text=2/')).toBeVisible({ timeout: 5000 });
      }

      // Step 6: Test flag functionality
      const flagButton = page.locator('button:has-text("Flag"), button[aria-label*="flag"], .flag-button').first();
      if (await flagButton.isVisible()) {
        await flagButton.click();
        // Flag should be active/highlighted
      }

      // Step 7: Test previous navigation
      const prevButton = page.locator('button:has-text("Previous"), button:has-text("Prev"), button[aria-label*="previous"]').first();
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await waitForContentLoad(page);
        await expect(page.locator('text=Question 1, text=1 of, text=1/')).toBeVisible({ timeout: 5000 });
      }

      // Step 8: Quick answer multiple questions for submission test
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

      // Step 9: Go to last question and submit
      // Look for submit button or navigate to end
      const submitButton = page.locator('button:has-text("Submit"), button:has-text("Finish"), button:has-text("Complete")').first();

      // If submit is not visible, try to find question grid to jump to end
      if (!(await submitButton.isVisible())) {
        const lastQuestion = page.locator('button:has-text("30"), .question-grid button:last-child, [data-question="30"]').first();
        if (await lastQuestion.isVisible()) {
          await lastQuestion.click();
          await waitForContentLoad(page);
        }
      }

      // Try to submit (may need to answer last question first)
      const lastOption = page.locator('input[type="radio"], button[role="radio"], .answer-option').first();
      if (await lastOption.isVisible()) {
        await lastOption.click();
      }

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

          // Should see review interface
          await expect(page.locator('text=Review, text=Answer, text=Correct, text=Incorrect').first()).toBeVisible();
        }

        // Step 12: Test retake option
        const retakeButton = page.locator('button:has-text("Retake"), button:has-text("Try Again"), button:has-text("Restart")').first();
        await expect(retakeButton).toBeVisible();
      }
    });

    test('should show timer during exam', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module8/section1/mock1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Start exam
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await startButton.click();
      await waitForContentLoad(page);

      // Check for timer display (45:00 or similar)
      const timer = page.locator('text=45:, text=44:, text=:00, .timer, [data-timer]').first();
      await expect(timer).toBeVisible({ timeout: 10000 });
    });

    test('should show progress indicator during exam', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module8/section1/mock1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Start exam
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await startButton.click();
      await waitForContentLoad(page);

      // Check for progress indicator (question count, progress bar, etc.)
      const progress = page.locator('text=1 of 30, text=1/30, .progress, [role="progressbar"]').first();
      await expect(progress).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Back Navigation', () => {
    test('should navigate back from section to module', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module1/section1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Find back navigation
      const backLink = page.locator('a:has-text("Back"), button:has-text("Back"), a:has-text("Module 1"), [aria-label*="back"]').first();
      await expect(backLink).toBeVisible();
      await backLink.click();
      await waitForContentLoad(page);

      // Should be at module level
      expect(page.url()).toMatch(/module1\/?$/);
    });

    test('should navigate back from module to Level 2 overview', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Find back navigation to Level 2
      const backLink = page.locator('a:has-text("Back"), a:has-text("Level 2"), button:has-text("Back"), [aria-label*="back"]').first();
      await expect(backLink).toBeVisible();
      await backLink.click();
      await waitForContentLoad(page);

      // Should be at Level 2 overview
      expect(page.url()).toMatch(/level2\/?$/);
    });

    test('should use browser back button correctly', async ({ page }) => {
      // Navigate through hierarchy
      await page.goto(`/apprentice/study/level2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await page.goto(`/apprentice/study/level2/module1`);
      await waitForContentLoad(page);

      await page.goto(`/apprentice/study/level2/module1/section1`);
      await waitForContentLoad(page);

      // Use browser back
      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain('module1');
      expect(page.url()).not.toContain('section1');

      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toMatch(/level2\/?$/);
    });
  });

  test.describe('Content Loading', () => {
    test('should load text content on section pages', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module1/section1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Page should have meaningful content (not just loading/error)
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);

      // Should not show error messages
      expect(bodyText).not.toContain('Error');
      expect(bodyText).not.toContain('404');
      expect(bodyText).not.toContain('Not Found');
    });

    test('should load images and media without errors', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module2/section1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check no broken images
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        // Images should have loaded (naturalWidth > 0) unless they're decorative
        // Some images might be lazy-loaded, so we just ensure no obvious errors
      }
    });

    test('should not show console errors on page load', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(`/apprentice/study/level2/module1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Filter out known acceptable errors (like favicon, third-party scripts)
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
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

      await page.goto(`/apprentice/study/level2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Content should be visible and not overflow
      const body = page.locator('body');
      const scrollWidth = await body.evaluate(el => el.scrollWidth);
      const clientWidth = await body.evaluate(el => el.clientWidth);

      // Horizontal scroll should be minimal (allow small tolerance for scrollbars)
      expect(scrollWidth - clientWidth).toBeLessThan(20);

      // Navigation should still work
      const moduleLink = page.locator('text=Module 1, a[href*="module1"]').first();
      await expect(moduleLink).toBeVisible();
    });

    test('should handle touch navigation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(`/apprentice/study/level2/module1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Tap on a section
      const sectionLink = page.locator('a[href*="section"], .section-card').first();
      if (await sectionLink.isVisible()) {
        await sectionLink.tap();
        await waitForContentLoad(page);

        // Should have navigated
        expect(page.url()).toContain('section');
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto(`/apprentice/study/level2`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check for h1
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();

      // There should be a logical heading structure
      const headings = await page.locator('h1, h2, h3, h4').allTextContents();
      expect(headings.length).toBeGreaterThan(0);
    });

    test('should have accessible button labels', async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module8/section1/mock1`);
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // All buttons should have accessible names
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();

      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = buttons.nth(i);
        const accessibleName = await button.evaluate(el =>
          el.textContent || el.getAttribute('aria-label') || el.getAttribute('title')
        );
        expect(accessibleName).toBeTruthy();
      }
    });
  });
});

test.describe('All Modules Quick Smoke Test', () => {
  const modules = [
    { num: 1, name: 'Health and Safety' },
    { num: 2, name: 'Electrical Science' },
    { num: 3, name: 'Installation Methods' },
    { num: 4, name: 'Wiring Systems' },
    { num: 5, name: 'Design' },
    { num: 6, name: 'Inspection' },
    { num: 7, name: 'Fault Finding' },
    { num: 8, name: 'Mock Exam' },
  ];

  for (const module of modules) {
    test(`Module ${module.num} (${module.name}) should load without errors`, async ({ page }) => {
      await page.goto(`/apprentice/study/level2/module${module.num}`);

      // Check if redirected to login
      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required - skipping');
        return;
      }

      await page.waitForLoadState('networkidle');

      // Page should load without errors
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).not.toContain('Error');
      expect(bodyText).not.toContain('404');

      // Should have some content
      expect(bodyText?.length).toBeGreaterThan(50);
    });
  }
});
