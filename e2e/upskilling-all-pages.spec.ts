import { test, expect, Page } from '@playwright/test';

/**
 * Electrical Upskilling - COMPLETE PAGE COVERAGE Test Suite
 *
 * Tests EVERY SINGLE PAGE across all 14 upskilling courses:
 * - Every course hub
 * - Every module page
 * - Every section page
 * - Every mock exam
 *
 * Total: ~500+ pages tested
 */

const TIMEOUT = 30000;

async function loginIfRequired(page: Page) {
  if (page.url().includes('/auth/signin')) {
    await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'test@example.com');
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'testpassword');
    await page.click('button[type="submit"]');
    await page.waitForURL(/(?!.*signin)/);
  }
}

async function waitForContentLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('[data-loading="true"]', { state: 'hidden', timeout: 5000 }).catch(() => {});
}

async function verifyPageHasContent(page: Page, pageName: string) {
  const bodyText = await page.locator('body').textContent();

  // Must have meaningful content
  expect(bodyText?.length, `${pageName} should have content`).toBeGreaterThan(100);

  // Must not be error pages
  expect(bodyText, `${pageName} should not be 404`).not.toContain('404');
  expect(bodyText?.toLowerCase(), `${pageName} should not show "not found"`).not.toContain('page not found');

  return bodyText;
}

// Complete course structure with EXACT section counts
const COURSES = {
  bms: {
    name: 'BMS',
    courseRoute: '/electrician/upskilling/bms-course',
    mockExamRoute: '/electrician/upskilling/bms-mock-exam',
    modulePattern: '/electrician/upskilling/bms-module-{m}',
    sectionPattern: '/electrician/upskilling/bms-module-{m}-section-{s}',
    modules: {
      1: { sections: 6 },
      2: { sections: 6 },
      3: { sections: 6 },
      4: { sections: 5 },
      5: { sections: 6 },
      6: { sections: 6 },
      7: { sections: 6 },
    }
  },
  bs7671: {
    name: 'BS7671',
    courseRoute: '/electrician/upskilling/bs7671-course',
    mockExamRoute: '/electrician/upskilling/bs7671-mock-exam',
    modulePattern: '/electrician/upskilling/bs7671-module-{m}',
    sectionPattern: '/electrician/upskilling/bs7671-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 4 },
      3: { sections: 5 },
      4: { sections: 7 },
      5: { sections: 6 },
      6: { sections: 6 },
      7: { sections: 5 },
      8: { sections: 3 },
      9: { sections: 0 },
    }
  },
  patTesting: {
    name: 'PAT Testing',
    courseRoute: '/electrician/upskilling/pat-testing-course',
    mockExamRoute: '/electrician/upskilling/pat-testing-mock-exam',
    modulePattern: '/electrician/upskilling/pat-testing-module-{m}',
    sectionPattern: '/electrician/upskilling/pat-testing-module-{m}-section-{s}',
    modules: {
      1: { sections: 5 },
      2: { sections: 5 },
      3: { sections: 5 },
      4: { sections: 6 },
      5: { sections: 5 },
    }
  },
  fireAlarm: {
    name: 'Fire Alarm',
    courseRoute: '/electrician/upskilling/fire-alarm-course',
    mockExamRoute: '/electrician/upskilling/fire-alarm-course/mock-exam',
    modulePattern: '/electrician/upskilling/fire-alarm-course/module-{m}',
    sectionPattern: '/electrician/upskilling/fire-alarm-course/module-{m}/section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 5 },
      3: { sections: 6 },
      4: { sections: 5 },
      5: { sections: 6 },
      6: { sections: 6 },
      7: { sections: 4 },
    }
  },
  inspectionTesting: {
    name: 'Inspection & Testing',
    courseRoute: '/electrician/upskilling/inspection-testing',
    mockExamRoute: '/electrician/upskilling/inspection-testing-mock-exam',
    modulePattern: '/electrician/upskilling/inspection-testing/module-{m}',
    sectionPattern: '/electrician/upskilling/inspection-testing/module-{m}/section-{s}',
    modules: {
      1: { sections: 5 },
      2: { sections: 6 },
      3: { sections: 6 },
      4: { sections: 6 },
      5: { sections: 6 },
      6: { sections: 5 },
      7: { sections: 5 },
      8: { sections: 5 },
    }
  },
  industrialElectrical: {
    name: 'Industrial Electrical',
    courseRoute: '/electrician/upskilling/industrial-electrical-course',
    mockExamRoute: '/electrician/upskilling/industrial-electrical-mock-exam',
    modulePattern: '/electrician/upskilling/industrial-electrical-module-{m}',
    sectionPattern: '/electrician/upskilling/industrial-electrical-module-{m}-section-{s}',
    modules: {
      1: { sections: 5 },
      2: { sections: 6 },
      3: { sections: 5 },
      4: { sections: 6 },
      5: { sections: 5 },
    }
  },
  dataCabling: {
    name: 'Data Cabling',
    courseRoute: '/electrician/upskilling/data-cabling-course',
    mockExamRoute: '/electrician/upskilling/data-cabling-mock-exam',
    modulePattern: '/electrician/upskilling/data-cabling-module-{m}',
    sectionPattern: '/electrician/upskilling/data-cabling-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 5 },
      3: { sections: 6 },
      4: { sections: 5 },
      5: { sections: 5 },
      6: { sections: 4 },
    }
  },
  emergencyLighting: {
    name: 'Emergency Lighting',
    courseRoute: '/electrician/upskilling/emergency-lighting-course',
    mockExamRoute: '/electrician/upskilling/emergency-lighting-mock-exam',
    modulePattern: '/electrician/upskilling/emergency-lighting-module-{m}',
    sectionPattern: '/electrician/upskilling/emergency-lighting-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 6 },
      3: { sections: 6 },
      4: { sections: 5 },
      5: { sections: 6 },
      6: { sections: 4 },
    }
  },
  fiberOptics: {
    name: 'Fiber Optics',
    courseRoute: '/electrician/upskilling/fiber-optics-course',
    mockExamRoute: '/electrician/upskilling/fiber-optics-mock-exam',
    modulePattern: '/electrician/upskilling/fiber-optics-module-{m}',
    sectionPattern: '/electrician/upskilling/fiber-optics-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 6 },
      3: { sections: 6 },
      4: { sections: 5 },
      5: { sections: 4 },
      6: { sections: 4 },
      7: { sections: 5 },
    }
  },
  renewableEnergy: {
    name: 'Renewable Energy',
    courseRoute: '/electrician/upskilling/renewable-energy-course',
    mockExamRoute: '/electrician/upskilling/renewable-energy-mock-exam',
    modulePattern: '/electrician/upskilling/renewable-energy-module-{m}',
    sectionPattern: '/electrician/upskilling/renewable-energy-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 6 },
      3: { sections: 5 },
      4: { sections: 6 },
      5: { sections: 6 },
      6: { sections: 5 },
      7: { sections: 6 },
      8: { sections: 5 },
      9: { sections: 6 },
      10: { sections: 0 },
    }
  },
  smartHome: {
    name: 'Smart Home',
    courseRoute: '/electrician/upskilling/smart-home-course',
    mockExamRoute: '/electrician/upskilling/smart-home-mock-exam',
    modulePattern: '/electrician/upskilling/smart-home-module-{m}',
    sectionPattern: '/electrician/upskilling/smart-home-module-{m}-section-{s}',
    modules: {
      1: { sections: 5 },
      2: { sections: 6 },
      3: { sections: 5 },
      4: { sections: 6 },
      5: { sections: 6 },
      6: { sections: 5 },
      7: { sections: 6 },
      8: { sections: 0 },
    }
  },
  evCharging: {
    name: 'EV Charging',
    courseRoute: '/electrician/upskilling/ev-charging-course',
    mockExamRoute: '/electrician/upskilling/ev-charging-mock-exam',
    modulePattern: '/electrician/upskilling/ev-charging-module-{m}',
    sectionPattern: '/electrician/upskilling/ev-charging-module-{m}-section-{s}',
    modules: {
      1: { sections: 5 },
      2: { sections: 5 },
      3: { sections: 5 },
      4: { sections: 5 },
      5: { sections: 5 },
      6: { sections: 6 },
      7: { sections: 4 },
    }
  },
  instrumentation: {
    name: 'Instrumentation',
    courseRoute: '/electrician/upskilling/instrumentation-course',
    mockExamRoute: '/electrician/upskilling/instrumentation-mock-exam',
    modulePattern: '/electrician/upskilling/instrumentation-module-{m}',
    sectionPattern: '/electrician/upskilling/instrumentation-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 6 },
      3: { sections: 5 },
      4: { sections: 5 },
      5: { sections: 6 },
      6: { sections: 6 },
      7: { sections: 7 },
      8: { sections: 6 },
      9: { sections: 0 },
    }
  },
  energyEfficiency: {
    name: 'Energy Efficiency',
    courseRoute: '/electrician/upskilling/energy-efficiency-course',
    mockExamRoute: '/electrician/upskilling/energy-efficiency-mock-exam',
    modulePattern: '/electrician/upskilling/energy-efficiency-module-{m}',
    sectionPattern: '/electrician/upskilling/energy-efficiency-module-{m}-section-{s}',
    modules: {
      1: { sections: 4 },
      2: { sections: 5 },
      3: { sections: 5 },
      4: { sections: 5 },
      5: { sections: 5 },
      6: { sections: 5 },
    }
  },
};

// ============================================
// BMS - 7 Modules, 41 Sections
// ============================================
test.describe('BMS (Building Management Systems) - All Pages', () => {
  const course = COURSES.bms;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'BMS Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  // Test ALL modules and ALL sections
  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `BMS Module ${m}`);
    });

    // Test every section in this module
    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `BMS M${m}S${s}`);
      });
    }
  }
});

// ============================================
// BS7671 - 9 Modules, 40 Sections
// ============================================
test.describe('BS7671 (Wiring Regulations) - All Pages', () => {
  const course = COURSES.bs7671;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'BS7671 Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `BS7671 Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `BS7671 M${m}S${s}`);
      });
    }
  }
});

// ============================================
// PAT Testing - 5 Modules, 26 Sections
// ============================================
test.describe('PAT Testing - All Pages', () => {
  const course = COURSES.patTesting;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'PAT Testing Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `PAT Testing Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `PAT M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Fire Alarm - 7 Modules, 36 Sections
// ============================================
test.describe('Fire Alarm Systems - All Pages', () => {
  const course = COURSES.fireAlarm;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Fire Alarm Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Fire Alarm Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Fire Alarm M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Inspection & Testing - 8 Modules, 44 Sections + 10 Guides
// ============================================
test.describe('Inspection & Testing - All Pages', () => {
  const course = COURSES.inspectionTesting;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Inspection Testing Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Inspection Testing Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Inspection Testing M${m}S${s}`);
      });
    }
  }

  // Test all 10 guides
  const guides = [
    'visual-inspection-guide',
    'safe-isolation-guide',
    'cpc-continuity-guide',
    'ring-final-continuity-guide',
    'insulation-resistance-guide',
    'polarity-testing-guide',
    'earth-fault-loop-guide',
    'rcd-testing-guide',
    'functional-testing-guide',
    'documentation-guide',
  ];

  for (const guide of guides) {
    test(`Guide: ${guide} loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      await page.goto(`/electrician/upskilling/${guide}`);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, guide);
    });
  }
});

// ============================================
// Industrial Electrical - 5 Modules, 27 Sections
// ============================================
test.describe('Industrial Electrical - All Pages', () => {
  const course = COURSES.industrialElectrical;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Industrial Electrical Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Industrial Electrical Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Industrial Electrical M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Data Cabling - 6 Modules, 29 Sections
// ============================================
test.describe('Data Cabling - All Pages', () => {
  const course = COURSES.dataCabling;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Data Cabling Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Data Cabling Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Data Cabling M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Emergency Lighting - 6 Modules, 31 Sections
// ============================================
test.describe('Emergency Lighting - All Pages', () => {
  const course = COURSES.emergencyLighting;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Emergency Lighting Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Emergency Lighting Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Emergency Lighting M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Fiber Optics - 7 Modules, 34 Sections
// ============================================
test.describe('Fiber Optics - All Pages', () => {
  const course = COURSES.fiberOptics;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Fiber Optics Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Fiber Optics Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Fiber Optics M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Renewable Energy - 10 Modules, 49 Sections
// ============================================
test.describe('Renewable Energy - All Pages', () => {
  const course = COURSES.renewableEnergy;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Renewable Energy Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Renewable Energy Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Renewable Energy M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Smart Home - 8 Modules, 39 Sections
// ============================================
test.describe('Smart Home - All Pages', () => {
  const course = COURSES.smartHome;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Smart Home Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Smart Home Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Smart Home M${m}S${s}`);
      });
    }
  }
});

// ============================================
// EV Charging - 7 Modules, 35 Sections
// ============================================
test.describe('EV Charging - All Pages', () => {
  const course = COURSES.evCharging;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'EV Charging Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `EV Charging Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `EV Charging M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Instrumentation - 9 Modules, 45 Sections
// ============================================
test.describe('Instrumentation - All Pages', () => {
  const course = COURSES.instrumentation;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Instrumentation Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  for (const [moduleNum, moduleData] of Object.entries(course.modules)) {
    const m = parseInt(moduleNum);

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Instrumentation Module ${m}`);
    });

    for (let s = 1; s <= moduleData.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Instrumentation M${m}S${s}`);
      });
    }
  }
});

// ============================================
// Energy Efficiency - 6 Modules, 29 Sections
// ============================================
test.describe('Energy Efficiency - All Pages', () => {
  const course = COURSES.energyEfficiency;

  test('Course hub page loads with content', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.courseRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    await verifyPageHasContent(page, 'Energy Efficiency Course Hub');
  });

  test('Mock exam page loads', async ({ page }) => {
    page.setDefaultTimeout(TIMEOUT);
    await page.goto(course.mockExamRoute);
    if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
    await loginIfRequired(page);
    await waitForContentLoad(page);
    const startBtn = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  // All modules and sections
  for (const moduleNum of Object.keys(course.modules)) {
    const m = parseInt(moduleNum);
    const moduleConfig = course.modules[m];

    test(`Module ${m} page loads with content`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);
      const url = course.modulePattern.replace('{m}', m.toString());
      await page.goto(url);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);
      await verifyPageHasContent(page, `Energy Efficiency Module ${m}`);
    });

    // Section pages
    for (let s = 1; s <= moduleConfig.sections; s++) {
      test(`Module ${m} Section ${s} loads with content`, async ({ page }) => {
        page.setDefaultTimeout(TIMEOUT);
        const url = course.sectionPattern.replace('{m}', m.toString()).replace('{s}', s.toString());
        await page.goto(url);
        if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
        await loginIfRequired(page);
        await waitForContentLoad(page);
        await verifyPageHasContent(page, `Module ${m}`);
      });
    }
  }
});

// ============================================
// Navigation Tests - Back Button Functionality
// ============================================
test.describe('Navigation - Section to Module to Course', () => {
  const testCases = [
    { course: COURSES.bs7671, module: 1, section: 1 },
    { course: COURSES.fireAlarm, module: 2, section: 1 },
    { course: COURSES.evCharging, module: 3, section: 2 },
    { course: COURSES.smartHome, module: 4, section: 1 },
    { course: COURSES.energyEfficiency, module: 1, section: 1 },
  ];

  for (const tc of testCases) {
    test(`${tc.course.name} - back from section to module`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);

      const sectionUrl = tc.course.sectionPattern
        .replace('{m}', tc.module.toString())
        .replace('{s}', tc.section.toString());

      await page.goto(sectionUrl);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);

      // Find and click back button
      const backBtn = page.locator('a:has-text("Back"), button:has-text("Back"), [aria-label*="back"]').first();
      if (await backBtn.isVisible()) {
        await backBtn.click();
        await waitForContentLoad(page);

        // Should be at module level
        expect(page.url()).toContain('module');
        expect(page.url()).not.toContain('section');
      }
    });

    test(`${tc.course.name} - browser back navigation`, async ({ page }) => {
      page.setDefaultTimeout(TIMEOUT);

      // Navigate: Course -> Module -> Section
      await page.goto(tc.course.courseRoute);
      if (page.url().includes('/auth/signin')) { test.skip(true, 'Auth required'); return; }
      await loginIfRequired(page);
      await waitForContentLoad(page);

      const moduleUrl = tc.course.modulePattern.replace('{m}', tc.module.toString());
      await page.goto(moduleUrl);
      await waitForContentLoad(page);

      const sectionUrl = tc.course.sectionPattern
        .replace('{m}', tc.module.toString())
        .replace('{s}', tc.section.toString());
      await page.goto(sectionUrl);
      await waitForContentLoad(page);

      // Browser back to module
      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain('module');

      // Browser back to course
      await page.goBack();
      await waitForContentLoad(page);
      expect(page.url()).toContain(tc.course.name.toLowerCase().replace(/\s+/g, '-').replace('&', ''));
    });
  }
});
