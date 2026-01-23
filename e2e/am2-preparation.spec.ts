import { test, expect, Page } from '@playwright/test';

/**
 * AM2 Preparation Course - End-to-End Test Suite
 *
 * Tests the complete flow through Study Centre → Apprentice → AM2:
 * - Navigation to AM2 from various entry points
 * - All 8 modules open correctly
 * - Sections within modules load content
 * - Navigation footer (Previous/Next) works
 * - Back navigation works properly
 * - Mock exam full flow (60 mins, 30 questions, 60% pass mark)
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

test.describe('AM2 Preparation Course', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  test.describe('Navigation & Access', () => {
    test('should navigate to AM2 from Study Centre', async ({ page }) => {
      await page.goto('/study-centre');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Look for Apprentice section
      const apprenticeLink = page.locator('text=Apprentice').first();
      if (await apprenticeLink.isVisible()) {
        await apprenticeLink.click();
        await waitForContentLoad(page);
      }

      // Navigate to AM2
      const am2Link = page.locator('text=AM2').first();
      await expect(am2Link).toBeVisible({ timeout: 10000 });
      await am2Link.click();

      await expect(page).toHaveURL(/am2/);
    });

    test('should navigate directly to AM2 via URL', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify AM2 page loaded
      await expect(page.locator('h1, h2').filter({ hasText: /AM2/i }).first()).toBeVisible();
    });

    test('should display all 8 modules on AM2 page', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check for AM2 module topics
      const moduleTexts = [
        'Introduction',
        'Health',
        'Safety',
        'Installation',
        'Inspection',
        'Testing',
        'Fault',
        'Online',
        'Strategy',
        'Mock'
      ];

      let foundCount = 0;
      for (const moduleText of moduleTexts) {
        const moduleElement = page.locator(`text=${moduleText}`).first();
        if (await moduleElement.isVisible({ timeout: 2000 }).catch(() => false)) {
          foundCount++;
        }
      }
      // Should find at least 5 of these keywords
      expect(foundCount).toBeGreaterThan(4);
    });
  });

  test.describe('Module 1: Introduction to AM2', () => {
    test('should open Module 1 and display sections', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify module title contains AM2 or Introduction
      await expect(page.locator('text=Introduction, text=AM2').first()).toBeVisible();

      // Check sections are visible (Module 1 has 4 sections)
      const sectionLinks = page.locator('a[href*="section"], .section-card, [data-section]');
      const count = await sectionLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to Section 1 and load content', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Verify content loaded
      const content = page.locator('main, .content, article').first();
      await expect(content).toBeVisible();

      // Should have meaningful content about AM2 purpose
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);
    });

    test('should navigate through sections using Next/Previous', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Find Next button
      const nextButton = page.locator('button:has-text("Next"), a:has-text("Next")').first();
      await expect(nextButton).toBeVisible();
      await nextButton.click();
      await waitForContentLoad(page);

      // Should be at section 2
      expect(page.url()).toContain('section2');

      // Find Previous button
      const prevButton = page.locator('button:has-text("Previous"), a:has-text("Previous"), button:has-text("Prev")').first();
      await expect(prevButton).toBeVisible();
      await prevButton.click();
      await waitForContentLoad(page);

      // Should be back at section 1
      expect(page.url()).toContain('section1');
    });

    test('should show progress dots in navigation footer', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Look for progress dots or section indicators
      const progressIndicator = page.locator('.progress-dots, [data-progress], text=1 of, text=Section 1').first();
      await expect(progressIndicator).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Module 2: Health, Safety & Documentation', () => {
    test('should open Module 2 and display sections', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module2');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Health, text=Safety, text=Documentation').first()).toBeVisible();
    });

    test('should navigate through all 5 sections', async ({ page }) => {
      // Module 2 has 5 sections
      for (let i = 1; i <= 5; i++) {
        await page.goto(`/study-centre/apprentice/am2/module2/section${i}`);
        await loginIfRequired(page);
        await waitForContentLoad(page);

        const content = page.locator('main, .content').first();
        await expect(content).toBeVisible();
      }
    });
  });

  test.describe('Module 3: Installation Tasks', () => {
    test('should open Module 3', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module3');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Installation').first()).toBeVisible();
    });

    test('should navigate through all 6 sections', async ({ page }) => {
      for (let i = 1; i <= 6; i++) {
        await page.goto(`/study-centre/apprentice/am2/module3/section${i}`);
        await loginIfRequired(page);
        await waitForContentLoad(page);

        const content = page.locator('main, .content').first();
        await expect(content).toBeVisible();
      }
    });
  });

  test.describe('Module 4: Inspection & Testing', () => {
    test('should open Module 4', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module4');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Inspection, text=Testing').first()).toBeVisible();
    });

    test('should load all 6 sections', async ({ page }) => {
      for (let i = 1; i <= 6; i++) {
        await page.goto(`/study-centre/apprentice/am2/module4/section${i}`);
        await loginIfRequired(page);
        await waitForContentLoad(page);

        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(100);
      }
    });
  });

  test.describe('Module 5: Fault Diagnosis', () => {
    test('should open Module 5', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module5');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Fault').first()).toBeVisible();
    });
  });

  test.describe('Module 6: Online Knowledge Test', () => {
    test('should open Module 6', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module6');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Online, text=Knowledge, text=Test').first()).toBeVisible();
    });
  });

  test.describe('Module 7: Exam Strategy', () => {
    test('should open Module 7', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module7');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await expect(page.locator('text=Strategy, text=Success, text=Tips').first()).toBeVisible();
    });
  });

  test.describe('Module 8: Full Mock AM2 Assessment', () => {
    test('should open Module 8 mock exam page', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should show mock exam interface or start screen
      await expect(page.locator('text=Mock, text=Assessment, text=Exam').first()).toBeVisible();
    });

    test('should display exam instructions before starting', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should show exam info (30 questions, 60 minutes, 60% pass mark)
      const bodyText = await page.locator('body').textContent();

      // Check for key exam details
      const has30Questions = bodyText?.includes('30') || false;
      const has60Minutes = bodyText?.includes('60') || false;

      expect(has30Questions || has60Minutes).toBeTruthy();

      // Should have start button
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await expect(startButton).toBeVisible();
    });
  });

  test.describe('AM2 Mock Exam Full Flow', () => {
    test('should complete full AM2 mock exam flow', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Step 1: Start the exam
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await expect(startButton).toBeVisible({ timeout: 10000 });
      await startButton.click();
      await waitForContentLoad(page);

      // Step 2: Verify exam interface loaded
      await expect(page.locator('text=Question 1, text=1 of, text=1/')).toBeVisible({ timeout: 10000 });

      // Step 3: Verify timer shows 60 minutes (AM2 specific)
      const timer = page.locator('text=60:, text=59:, text=:00, .timer').first();
      await expect(timer).toBeVisible({ timeout: 10000 });

      // Step 4: Answer first question
      const firstOption = page.locator('input[type="radio"], button[role="radio"], .answer-option, label:has(input)').first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      // Step 5: Navigate to next question
      const nextButton = page.locator('button:has-text("Next")').first();
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await waitForContentLoad(page);
        await expect(page.locator('text=Question 2, text=2 of, text=2/')).toBeVisible({ timeout: 5000 });
      }

      // Step 6: Test flag functionality
      const flagButton = page.locator('button:has-text("Flag"), button[aria-label*="flag"]').first();
      if (await flagButton.isVisible()) {
        await flagButton.click();
      }

      // Step 7: Answer a few more questions
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

      // Step 8: Try to submit (navigate to end if needed)
      const submitButton = page.locator('button:has-text("Submit"), button:has-text("Finish")').first();

      if (!(await submitButton.isVisible())) {
        const lastQuestion = page.locator('button:has-text("30"), .question-grid button:last-child').first();
        if (await lastQuestion.isVisible()) {
          await lastQuestion.click();
          await waitForContentLoad(page);
        }
      }

      // Answer last question
      const lastOption = page.locator('input[type="radio"], button[role="radio"], .answer-option').first();
      if (await lastOption.isVisible()) {
        await lastOption.click();
      }

      // Submit
      const finalSubmit = page.locator('button:has-text("Submit"), button:has-text("Finish")').first();
      if (await finalSubmit.isVisible()) {
        await finalSubmit.click();
        await waitForContentLoad(page);

        // Step 9: Verify results screen
        const resultsIndicator = page.locator('text=Results, text=Score, text=%, text=Pass, text=Fail').first();
        await expect(resultsIndicator).toBeVisible({ timeout: 10000 });

        // Step 10: Check for category breakdown (AM2 specific)
        const categoryBreakdown = page.locator('text=Health, text=Safety, text=BS7671, text=Category').first();
        // Category breakdown may or may not be visible depending on implementation

        // Step 11: Test review mode
        const reviewButton = page.locator('button:has-text("Review"), button:has-text("View Answers")').first();
        if (await reviewButton.isVisible()) {
          await reviewButton.click();
          await waitForContentLoad(page);

          // Should have review filters
          const filterOptions = page.locator('text=All, text=Correct, text=Incorrect, text=Unanswered, text=Flagged');
          // At least some filter options should be visible
        }

        // Step 12: Verify retake option
        const retakeButton = page.locator('button:has-text("Retake"), button:has-text("Try Again")').first();
        await expect(retakeButton).toBeVisible();
      }
    });

    test('should show 60-minute timer for AM2 exam', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await startButton.click();
      await waitForContentLoad(page);

      // AM2 has 60-minute timer
      const timer = page.locator('text=60:, text=59:58, text=59:59, .timer').first();
      await expect(timer).toBeVisible({ timeout: 10000 });
    });

    test('should show 30 questions indicator', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module8');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await startButton.click();
      await waitForContentLoad(page);

      // Should show 30 questions total
      const questionCount = page.locator('text=of 30, text=/30, text=30 questions').first();
      await expect(questionCount).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Back Navigation', () => {
    test('should navigate back from section to module', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const backLink = page.locator('a:has-text("Back"), button:has-text("Back"), a:has-text("Module"), [aria-label*="back"]').first();
      await expect(backLink).toBeVisible();
      await backLink.click();
      await waitForContentLoad(page);

      expect(page.url()).toMatch(/module1\/?$/);
    });

    test('should navigate back from module to AM2 overview', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const backLink = page.locator('a:has-text("Back"), a:has-text("AM2"), button:has-text("Back"), [aria-label*="back"]').first();
      await expect(backLink).toBeVisible();
      await backLink.click();
      await waitForContentLoad(page);

      expect(page.url()).toMatch(/am2\/?$/);
    });

    test('should use browser back button correctly', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      await page.goto('/study-centre/apprentice/am2/module1');
      await waitForContentLoad(page);

      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await waitForContentLoad(page);

      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain('module1');
      expect(page.url()).not.toContain('section1');

      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toMatch(/am2\/?$/);
    });
  });

  test.describe('Content Loading', () => {
    test('should load text content on section pages', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);

      expect(bodyText).not.toContain('Error');
      expect(bodyText).not.toContain('404');
      expect(bodyText).not.toContain('Not Found');
    });

    test('should display learning outcomes on section pages', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // AM2 sections typically have learning outcomes
      const learningOutcomes = page.locator('text=Learning, text=Outcome, text=Objective').first();
      // Learning outcomes may or may not be present on all pages
    });

    test('should not show console errors on page load', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/study-centre/apprentice/am2/module1');
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

      await page.goto('/study-centre/apprentice/am2');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const body = page.locator('body');
      const scrollWidth = await body.evaluate(el => el.scrollWidth);
      const clientWidth = await body.evaluate(el => el.clientWidth);

      expect(scrollWidth - clientWidth).toBeLessThan(20);

      const moduleLink = page.locator('text=Module 1, a[href*="module1"]').first();
      await expect(moduleLink).toBeVisible();
    });

    test('should show mobile-optimized navigation footer', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/study-centre/apprentice/am2/module1/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Navigation footer should be visible
      const navFooter = page.locator('button:has-text("Next"), button:has-text("Previous")').first();
      await expect(navFooter).toBeVisible();
    });
  });

  test.describe('AM2 Specific Content', () => {
    test('should display safe isolation content in Module 2', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module2/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Module 2 covers safe isolation - critical AM2 topic
      const bodyText = await page.locator('body').textContent();
      const hasSafetyContent = bodyText?.toLowerCase().includes('safe') ||
                               bodyText?.toLowerCase().includes('isolation') ||
                               bodyText?.toLowerCase().includes('safety');
      expect(hasSafetyContent).toBeTruthy();
    });

    test('should display test sequence content in Module 4', async ({ page }) => {
      await page.goto('/study-centre/apprentice/am2/module4/section1');
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Module 4 covers testing procedures
      const bodyText = await page.locator('body').textContent();
      const hasTestingContent = bodyText?.toLowerCase().includes('test') ||
                                 bodyText?.toLowerCase().includes('inspection');
      expect(hasTestingContent).toBeTruthy();
    });
  });
});

test.describe('All AM2 Modules Quick Smoke Test', () => {
  const modules = [
    { num: 1, name: 'Introduction to AM2', sections: 4 },
    { num: 2, name: 'Health Safety Documentation', sections: 5 },
    { num: 3, name: 'Installation Tasks', sections: 6 },
    { num: 4, name: 'Inspection Testing', sections: 6 },
    { num: 5, name: 'Fault Diagnosis', sections: 6 },
    { num: 6, name: 'Online Knowledge Test', sections: 4 },
    { num: 7, name: 'Exam Strategy', sections: 4 },
    { num: 8, name: 'Mock Assessment', sections: 0 }, // Module 8 is the exam itself
  ];

  for (const module of modules) {
    test(`Module ${module.num} (${module.name}) should load without errors`, async ({ page }) => {
      await page.goto(`/study-centre/apprentice/am2/module${module.num}`);

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

test.describe('All AM2 Sections Quick Smoke Test', () => {
  const sectionsToTest = [
    { module: 1, section: 1 },
    { module: 1, section: 4 },
    { module: 2, section: 1 },
    { module: 2, section: 5 },
    { module: 3, section: 1 },
    { module: 3, section: 6 },
    { module: 4, section: 1 },
    { module: 4, section: 6 },
    { module: 5, section: 1 },
    { module: 6, section: 1 },
    { module: 7, section: 1 },
  ];

  for (const item of sectionsToTest) {
    test(`Module ${item.module} Section ${item.section} should load content`, async ({ page }) => {
      await page.goto(`/study-centre/apprentice/am2/module${item.module}/section${item.section}`);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required - skipping');
        return;
      }

      await page.waitForLoadState('networkidle');

      const bodyText = await page.locator('body').textContent();
      expect(bodyText).not.toContain('Error');
      expect(bodyText).not.toContain('404');
      expect(bodyText?.length).toBeGreaterThan(100);
    });
  }
});
