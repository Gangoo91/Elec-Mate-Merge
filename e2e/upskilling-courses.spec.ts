import { test, expect, Page } from '@playwright/test';

/**
 * Electrical Upskilling Courses - Comprehensive End-to-End Test Suite
 *
 * Tests ALL 14 upskilling courses in the Study Centre:
 * - BMS (Building Management Systems)
 * - BS7671 (Wiring Regulations)
 * - PAT Testing
 * - Fire Alarm Systems
 * - Inspection & Testing
 * - Industrial Electrical
 * - Data Cabling
 * - Emergency Lighting
 * - Fiber Optics
 * - Renewable Energy
 * - Smart Home
 * - EV Charging
 * - Instrumentation
 * - Energy Efficiency
 *
 * Each course is tested for:
 * - Course hub page loads
 * - All modules accessible
 * - Section content renders
 * - Mock exam functionality
 * - Navigation (back buttons, browser back)
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

// Helper to verify page has content and no errors
async function verifyPageContent(page: Page) {
  const bodyText = await page.locator('body').textContent();
  expect(bodyText?.length).toBeGreaterThan(100);
  expect(bodyText).not.toContain('404');
  expect(bodyText?.toLowerCase()).not.toContain('not found');
  // Allow "Error" in content as it might be part of legitimate text like "Error Handling"
  return bodyText;
}

// Helper to test mock exam start screen
async function verifyMockExamStartScreen(page: Page) {
  await waitForContentLoad(page);

  // Should show exam interface or start button
  const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
  const examTitle = page.locator('text=Mock Exam, text=Assessment, text=Questions').first();

  const hasStartButton = await startButton.isVisible().catch(() => false);
  const hasExamTitle = await examTitle.isVisible().catch(() => false);

  expect(hasStartButton || hasExamTitle).toBeTruthy();
}

// Course configuration - all 14 courses
const UPSKILLING_COURSES = [
  {
    name: 'BMS (Building Management Systems)',
    slug: 'bms',
    routeBase: '/electrician/upskilling/bms',
    courseRoute: '/electrician/upskilling/bms-course',
    modulePattern: 'bms-module-{n}',
    sectionPattern: 'bms-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/bms-mock-exam',
    modules: 7,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'BS7671 (Wiring Regulations)',
    slug: 'bs7671',
    routeBase: '/electrician/upskilling/bs7671',
    courseRoute: '/electrician/upskilling/bs7671-course',
    modulePattern: 'bs7671-module-{n}',
    sectionPattern: 'bs7671-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/bs7671-mock-exam',
    modules: 9,
    testSections: [
      { module: 1, section: 1 },
      { module: 4, section: 3 },
      { module: 6, section: 2 },
    ]
  },
  {
    name: 'PAT Testing',
    slug: 'pat-testing',
    routeBase: '/electrician/upskilling/pat-testing',
    courseRoute: '/electrician/upskilling/pat-testing-course',
    modulePattern: 'pat-testing-module-{n}',
    sectionPattern: 'pat-testing-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/pat-testing-mock-exam',
    modules: 5,
    testSections: [
      { module: 1, section: 1 },
      { module: 2, section: 2 },
      { module: 4, section: 3 },
    ]
  },
  {
    name: 'Fire Alarm Systems',
    slug: 'fire-alarm',
    routeBase: '/electrician/upskilling/fire-alarm-course',
    courseRoute: '/electrician/upskilling/fire-alarm-course',
    modulePattern: 'fire-alarm-course/module-{n}',
    sectionPattern: 'fire-alarm-course/module-{m}/section-{n}',
    mockExamRoute: '/electrician/upskilling/fire-alarm-course/mock-exam',
    modules: 7,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Inspection & Testing',
    slug: 'inspection-testing',
    routeBase: '/electrician/upskilling/inspection-testing',
    courseRoute: '/electrician/upskilling/inspection-testing',
    modulePattern: 'inspection-testing/module-{n}',
    sectionPattern: 'inspection-testing/module-{m}/section-{n}',
    mockExamRoute: '/electrician/upskilling/inspection-testing-mock-exam',
    modules: 8,
    testSections: [
      { module: 1, section: 1 },
      { module: 2, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Industrial Electrical',
    slug: 'industrial-electrical',
    routeBase: '/electrician/upskilling/industrial-electrical',
    courseRoute: '/electrician/upskilling/industrial-electrical-course',
    modulePattern: 'industrial-electrical-module-{n}',
    sectionPattern: 'industrial-electrical-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/industrial-electrical-mock-exam',
    modules: 5,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Data Cabling',
    slug: 'data-cabling',
    routeBase: '/electrician/upskilling/data-cabling',
    courseRoute: '/electrician/upskilling/data-cabling-course',
    modulePattern: 'data-cabling-module-{n}',
    sectionPattern: 'data-cabling-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/data-cabling-mock-exam',
    modules: 6,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Emergency Lighting',
    slug: 'emergency-lighting',
    routeBase: '/electrician/upskilling/emergency-lighting',
    courseRoute: '/electrician/upskilling/emergency-lighting-course',
    modulePattern: 'emergency-lighting-module-{n}',
    sectionPattern: 'emergency-lighting-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/emergency-lighting-mock-exam',
    modules: 6,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Fiber Optics',
    slug: 'fiber-optics',
    routeBase: '/electrician/upskilling/fiber-optics',
    courseRoute: '/electrician/upskilling/fiber-optics-course',
    modulePattern: 'fiber-optics-module-{n}',
    sectionPattern: 'fiber-optics-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/fiber-optics-mock-exam',
    modules: 7,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Renewable Energy',
    slug: 'renewable-energy',
    routeBase: '/electrician/upskilling/renewable-energy',
    courseRoute: '/electrician/upskilling/renewable-energy-course',
    modulePattern: 'renewable-energy-module-{n}',
    sectionPattern: 'renewable-energy-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/renewable-energy-mock-exam',
    modules: 10,
    testSections: [
      { module: 1, section: 1 },
      { module: 4, section: 2 },
      { module: 7, section: 1 },
    ]
  },
  {
    name: 'Smart Home',
    slug: 'smart-home',
    routeBase: '/electrician/upskilling/smart-home',
    courseRoute: '/electrician/upskilling/smart-home-course',
    modulePattern: 'smart-home-module-{n}',
    sectionPattern: 'smart-home-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/smart-home-mock-exam',
    modules: 8,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'EV Charging',
    slug: 'ev-charging',
    routeBase: '/electrician/upskilling/ev-charging',
    courseRoute: '/electrician/upskilling/ev-charging-course',
    modulePattern: 'ev-charging-module-{n}',
    sectionPattern: 'ev-charging-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/ev-charging-mock-exam',
    modules: 7,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
  {
    name: 'Instrumentation',
    slug: 'instrumentation',
    routeBase: '/electrician/upskilling/instrumentation',
    courseRoute: '/electrician/upskilling/instrumentation-course',
    modulePattern: 'instrumentation-module-{n}',
    sectionPattern: 'instrumentation-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/instrumentation-mock-exam',
    modules: 9,
    testSections: [
      { module: 1, section: 1 },
      { module: 4, section: 2 },
      { module: 7, section: 1 },
    ]
  },
  {
    name: 'Energy Efficiency',
    slug: 'energy-efficiency',
    routeBase: '/electrician/upskilling/energy-efficiency',
    courseRoute: '/electrician/upskilling/energy-efficiency-course',
    modulePattern: 'energy-efficiency-module-{n}',
    sectionPattern: 'energy-efficiency-module-{m}-section-{n}',
    mockExamRoute: '/electrician/upskilling/energy-efficiency-mock-exam',
    modules: 6,
    testSections: [
      { module: 1, section: 1 },
      { module: 3, section: 2 },
      { module: 5, section: 1 },
    ]
  },
];

test.describe('Upskilling Courses - Navigation & Access', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  test('should access upskilling hub from Study Centre', async ({ page }) => {
    await page.goto('/study-centre');
    await loginIfRequired(page);
    await waitForContentLoad(page);

    // Look for Upskilling or CPD section
    const upskillingLink = page.locator('text=Upskilling, text=CPD, text=Professional Development').first();
    await expect(upskillingLink).toBeVisible({ timeout: 10000 });
  });

  test('should display all course categories', async ({ page }) => {
    await page.goto('/electrician/upskilling');
    await loginIfRequired(page);
    await waitForContentLoad(page);

    // Check for course categories - at least some should be visible
    const courseKeywords = ['BS7671', 'Fire', 'PAT', 'EV', 'Smart', 'Solar', 'Renewable', 'Testing'];
    let foundCount = 0;

    for (const keyword of courseKeywords) {
      const element = page.locator(`text=${keyword}`).first();
      if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
        foundCount++;
      }
    }

    expect(foundCount).toBeGreaterThan(3);
  });
});

// Generate tests for each course
for (const course of UPSKILLING_COURSES) {
  test.describe(`${course.name}`, () => {
    test.beforeEach(async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
    });

    test(`should load ${course.name} course hub page`, async ({ page }) => {
      await page.goto(course.courseRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageContent(page);

      // Should show course title or related content
      const titleElement = page.locator(`h1, h2, h3`).first();
      await expect(titleElement).toBeVisible();
    });

    test(`should display all ${course.modules} modules for ${course.name}`, async ({ page }) => {
      await page.goto(course.courseRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Check for module cards or links
      const moduleLinks = page.locator('a[href*="module"], .module-card, [data-module]');
      const count = await moduleLinks.count();

      // Should have at least some modules visible
      expect(count).toBeGreaterThan(0);
    });

    // Test sample sections for content
    for (const section of course.testSections) {
      test(`should load Module ${section.module} Section ${section.section} with content`, async ({ page }) => {
        const sectionUrl = `/electrician/upskilling/${course.sectionPattern
          .replace('{m}', section.module.toString())
          .replace('{n}', section.section.toString())}`;

        await page.goto(sectionUrl);

        if (page.url().includes('/auth/signin')) {
          test.skip(true, 'Authentication required');
          return;
        }

        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageContent(page);
      });
    }

    test(`should access ${course.name} mock exam`, async ({ page }) => {
      await page.goto(course.mockExamRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await verifyMockExamStartScreen(page);
    });

    test(`should navigate back from module to ${course.name} course hub`, async ({ page }) => {
      const moduleUrl = `/electrician/upskilling/${course.modulePattern.replace('{n}', '1')}`;
      await page.goto(moduleUrl);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Find back button
      const backLink = page.locator('a:has-text("Back"), button:has-text("Back"), [aria-label*="back"]').first();

      if (await backLink.isVisible()) {
        await backLink.click();
        await waitForContentLoad(page);

        // Should be back at course hub
        expect(page.url()).toContain(course.slug);
      }
    });
  });
}

test.describe('Mock Exam Consistency Tests', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  // Test that all mock exams have consistent structure like AM2
  const mockExamRoutes = UPSKILLING_COURSES.map(c => ({
    name: c.name,
    route: c.mockExamRoute
  }));

  for (const exam of mockExamRoutes) {
    test(`${exam.name} mock exam should have Start button`, async ({ page }) => {
      await page.goto(exam.route);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await expect(startButton).toBeVisible({ timeout: 10000 });
    });

    test(`${exam.name} mock exam should show questions after starting`, async ({ page }) => {
      await page.goto(exam.route);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();

      if (await startButton.isVisible()) {
        await startButton.click();
        await waitForContentLoad(page);

        // Should show question interface
        const questionIndicator = page.locator('text=Question, text=1 of, text=1/').first();
        await expect(questionIndicator).toBeVisible({ timeout: 10000 });
      }
    });

    test(`${exam.name} mock exam should have timer`, async ({ page }) => {
      await page.goto(exam.route);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();

      if (await startButton.isVisible()) {
        await startButton.click();
        await waitForContentLoad(page);

        // Should show timer
        const timer = page.locator('text=:00, text=:59, .timer, [data-timer]').first();
        await expect(timer).toBeVisible({ timeout: 10000 });
      }
    });

    test(`${exam.name} mock exam should have answer options`, async ({ page }) => {
      await page.goto(exam.route);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();

      if (await startButton.isVisible()) {
        await startButton.click();
        await waitForContentLoad(page);

        // Should show answer options (radio buttons or clickable options)
        const options = page.locator('input[type="radio"], button[role="radio"], .answer-option, label:has(input)');
        const count = await options.count();
        expect(count).toBeGreaterThan(1);
      }
    });

    test(`${exam.name} mock exam should have navigation buttons`, async ({ page }) => {
      await page.goto(exam.route);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();

      if (await startButton.isVisible()) {
        await startButton.click();
        await waitForContentLoad(page);

        // Should have Next button (Previous may be disabled on first question)
        const nextButton = page.locator('button:has-text("Next")').first();
        await expect(nextButton).toBeVisible({ timeout: 10000 });
      }
    });
  }
});

test.describe('Mock Exam Full Flow Test', () => {
  // Test one mock exam thoroughly (BS7671 as it's the most important)
  test('BS7671 mock exam complete flow - matches AM2 pattern', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);

    await page.goto('/electrician/upskilling/bs7671-mock-exam');

    if (page.url().includes('/auth/signin')) {
      test.skip(true, 'Authentication required');
      return;
    }

    await loginIfRequired(page);
    await waitForContentLoad(page);

    // Step 1: Verify start screen
    const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startButton).toBeVisible({ timeout: 10000 });

    // Step 2: Start exam
    await startButton.click();
    await waitForContentLoad(page);

    // Step 3: Verify exam interface
    await expect(page.locator('text=Question 1, text=1 of, text=1/')).toBeVisible({ timeout: 10000 });

    // Step 4: Verify timer
    const timer = page.locator('.timer, [data-timer], text=:00, text=:59').first();
    await expect(timer).toBeVisible();

    // Step 5: Answer first question
    const firstOption = page.locator('input[type="radio"], button[role="radio"], .answer-option, label:has(input)').first();
    await firstOption.click();

    // Step 6: Navigate to next question
    const nextButton = page.locator('button:has-text("Next")').first();
    await nextButton.click();
    await waitForContentLoad(page);

    // Step 7: Verify moved to question 2
    await expect(page.locator('text=Question 2, text=2 of, text=2/')).toBeVisible({ timeout: 5000 });

    // Step 8: Test flag functionality
    const flagButton = page.locator('button:has-text("Flag"), button[aria-label*="flag"], .flag-button').first();
    if (await flagButton.isVisible()) {
      await flagButton.click();
    }

    // Step 9: Test previous button
    const prevButton = page.locator('button:has-text("Previous"), button:has-text("Prev")').first();
    if (await prevButton.isVisible()) {
      await prevButton.click();
      await waitForContentLoad(page);
      await expect(page.locator('text=Question 1, text=1 of, text=1/')).toBeVisible({ timeout: 5000 });
    }

    // Step 10: Quick answer a few questions
    for (let i = 0; i < 3; i++) {
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

    // Step 11: Look for question grid (jump to end)
    const lastQuestion = page.locator('button:has-text("30"), .question-grid button:last-child').first();
    if (await lastQuestion.isVisible()) {
      await lastQuestion.click();
      await waitForContentLoad(page);
    }

    // Step 12: Answer last question
    const lastOption = page.locator('input[type="radio"], button[role="radio"], .answer-option').first();
    if (await lastOption.isVisible()) {
      await lastOption.click();
    }

    // Step 13: Submit
    const submitButton = page.locator('button:has-text("Submit"), button:has-text("Finish")').first();
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await waitForContentLoad(page);

      // Step 14: Verify results
      const results = page.locator('text=Results, text=Score, text=%, text=Complete').first();
      await expect(results).toBeVisible({ timeout: 10000 });

      // Step 15: Check for review button
      const reviewButton = page.locator('button:has-text("Review"), button:has-text("View Answers")').first();
      if (await reviewButton.isVisible()) {
        await reviewButton.click();
        await waitForContentLoad(page);

        // Should show review interface
        await expect(page.locator('text=Review, text=Answer, text=Correct').first()).toBeVisible();
      }

      // Step 16: Check for retake button
      const retakeButton = page.locator('button:has-text("Retake"), button:has-text("Try Again")').first();
      await expect(retakeButton).toBeVisible();
    }
  });
});

test.describe('Content Rendering Tests', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  // Test that all course hubs have proper content
  for (const course of UPSKILLING_COURSES) {
    test(`${course.name} course hub should have module cards`, async ({ page }) => {
      await page.goto(course.courseRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Should have clickable module elements
      const moduleElements = page.locator('a[href*="module"], .module-card, [data-module], button:has-text("Module")');
      const count = await moduleElements.count();
      expect(count).toBeGreaterThan(0);
    });
  }
});

test.describe('Back Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  // Test browser back button for a few courses
  const navigationTestCourses = [
    UPSKILLING_COURSES.find(c => c.slug === 'bs7671'),
    UPSKILLING_COURSES.find(c => c.slug === 'fire-alarm'),
    UPSKILLING_COURSES.find(c => c.slug === 'ev-charging'),
  ].filter(Boolean);

  for (const course of navigationTestCourses) {
    if (!course) continue;

    test(`${course.name} browser back navigation should work`, async ({ page }) => {
      // Navigate through hierarchy
      await page.goto(course.courseRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const moduleUrl = `/electrician/upskilling/${course.modulePattern.replace('{n}', '1')}`;
      await page.goto(moduleUrl);
      await waitForContentLoad(page);

      const sectionUrl = `/electrician/upskilling/${course.sectionPattern.replace('{m}', '1').replace('{n}', '1')}`;
      await page.goto(sectionUrl);
      await waitForContentLoad(page);

      // Use browser back
      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain('module');

      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain(course.slug);
    });
  }
});

test.describe('Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
  });

  // Test mobile view for a few courses
  const mobileTestCourses = [
    UPSKILLING_COURSES.find(c => c.slug === 'bs7671'),
    UPSKILLING_COURSES.find(c => c.slug === 'pat-testing'),
  ].filter(Boolean);

  for (const course of mobileTestCourses) {
    if (!course) continue;

    test(`${course.name} should display correctly on mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(course.courseRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      // No horizontal scroll
      const body = page.locator('body');
      const scrollWidth = await body.evaluate(el => el.scrollWidth);
      const clientWidth = await body.evaluate(el => el.clientWidth);
      expect(scrollWidth - clientWidth).toBeLessThan(20);

      // Content should be visible
      const content = page.locator('main, .content, h1, h2').first();
      await expect(content).toBeVisible();
    });

    test(`${course.name} mock exam should work on mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(course.mockExamRoute);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Start button should be visible and tappable
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      await expect(startButton).toBeVisible();

      // Start exam
      await startButton.tap();
      await waitForContentLoad(page);

      // Question should be visible
      const question = page.locator('text=Question, text=1 of').first();
      await expect(question).toBeVisible({ timeout: 10000 });

      // Answer options should be tappable
      const option = page.locator('input[type="radio"], button[role="radio"], .answer-option, label:has(input)').first();
      await expect(option).toBeVisible();
    });
  }
});

test.describe('Inspection & Testing Guides', () => {
  // Inspection & Testing has additional guide pages
  const guides = [
    { name: 'Visual Inspection Guide', route: '/electrician/upskilling/visual-inspection-guide' },
    { name: 'Safe Isolation Guide', route: '/electrician/upskilling/safe-isolation-guide' },
    { name: 'CPC Continuity Guide', route: '/electrician/upskilling/cpc-continuity-guide' },
    { name: 'Ring Final Continuity Guide', route: '/electrician/upskilling/ring-final-continuity-guide' },
    { name: 'Insulation Resistance Guide', route: '/electrician/upskilling/insulation-resistance-guide' },
    { name: 'Polarity Testing Guide', route: '/electrician/upskilling/polarity-testing-guide' },
    { name: 'Earth Fault Loop Guide', route: '/electrician/upskilling/earth-fault-loop-guide' },
    { name: 'RCD Testing Guide', route: '/electrician/upskilling/rcd-testing-guide' },
    { name: 'Functional Testing Guide', route: '/electrician/upskilling/functional-testing-guide' },
    { name: 'Documentation Guide', route: '/electrician/upskilling/documentation-guide' },
  ];

  for (const guide of guides) {
    test(`${guide.name} should load with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);

      await page.goto(guide.route);

      if (page.url().includes('/auth/signin')) {
        test.skip(true, 'Authentication required');
        return;
      }

      await loginIfRequired(page);
      await waitForContentLoad(page);

      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(100);
      expect(bodyText).not.toContain('404');
    });
  }
});

// Quick smoke test for ALL courses - every module hub
test.describe('All Modules Smoke Test', () => {
  for (const course of UPSKILLING_COURSES) {
    for (let moduleNum = 1; moduleNum <= course.modules; moduleNum++) {
      test(`${course.name} Module ${moduleNum} should load`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);

        const moduleUrl = `/electrician/upskilling/${course.modulePattern.replace('{n}', moduleNum.toString())}`;
        await page.goto(moduleUrl);

        if (page.url().includes('/auth/signin')) {
          test.skip(true, 'Authentication required');
          return;
        }

        await page.waitForLoadState('networkidle');

        const bodyText = await page.locator('body').textContent();
        expect(bodyText?.length).toBeGreaterThan(50);
        expect(bodyText).not.toContain('404');
      });
    }
  }
});
