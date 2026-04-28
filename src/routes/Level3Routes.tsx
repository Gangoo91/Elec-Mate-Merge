import { Route } from 'react-router-dom';
import { lazy } from 'react';
import { withTimeout, trackImport } from '@/lib/lazy';

/**
 * Level 3 (C&G 2365-03) Apprentice Course Routes
 *
 * Extracted from ApprenticeCourseRoutes.tsx (L3 Wave 1 — 2026-04-27).
 *
 * Exports a Fragment of <Route> elements (NOT a wrapping <Routes>) so
 * route paths remain at the same level as the rest of /apprentice-courses/*
 * — preserves all existing flat hyphen-style URLs (level3-module1-section1-1 etc).
 *
 * Spread inside the parent <Routes> via {level3Routes}.
 *
 * 8 modules / 288 routes total:
 *   M1 (Unit 201) Health & Safety — 36 Subs (refresher of L2 H&S)
 *   M2 (Unit 301) Environmental Tech — 30 Subs
 *   M3 (Unit 302) Electrical Science — 32 Subs
 *   M4 (Unit 303) Fault Diagnosis — 30 Subs
 *   M5 (Unit 304) Inspection/Test/Comm — 30 Subs
 *   M6 (Unit 305) Electrical Systems Design — 32 Subs
 *   M7 (Unit 308) Career Awareness — 26 Subs
 *   M8 Mock Exams + exam prep — 15 Subs + 8 mock exams
 */

// ============================================================================
// Lazy imports (288 components)
// ============================================================================

const Level3 = lazy(() =>
  withTimeout(() => trackImport('Level3', () => import('@/pages/apprentice-courses/Level3')))
);
const Level3Module1 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module1', () => import('@/pages/apprentice-courses/Level3Module1'))
  )
);
const Level3Module1Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Landing')
    )
  )
);
const Level3Module1Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section2',
      () => import('@/pages/apprentice-courses/level3/module1/section2/Landing')
    )
  )
);
const Level3Module1Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Landing')
    )
  )
);
const Level3Module1Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Landing')
    )
  )
);
const Level3Module1Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Landing')
    )
  )
);
const Level3Module1Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Landing')
    )
  )
);
const Level3Module1Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_1',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub1')
    )
  )
);
const Level3Module1Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_2',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub2')
    )
  )
);
const Level3Module1Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_3',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub3')
    )
  )
);
const Level3Module1Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_4',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub4')
    )
  )
);
const Level3Module1Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_5',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub5')
    )
  )
);
const Level3Module1Section1_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_6',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub6')
    )
  )
);
const Level3Module1Section1_7 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section1_7',
      () => import('@/pages/apprentice-courses/level3/module1/section1/Sub7')
    )
  )
);
const Level3Module1Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section2_1',
      () => import('@/pages/apprentice-courses/level3/module1/section2/Sub1')
    )
  )
);
const Level3Module1Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section2_2',
      () => import('@/pages/apprentice-courses/level3/module1/section2/Sub2')
    )
  )
);
const Level3Module1Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section2_3',
      () => import('@/pages/apprentice-courses/level3/module1/section2/Sub3')
    )
  )
);
const Level3Module1Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section2_4',
      () => import('@/pages/apprentice-courses/level3/module1/section2/Sub4')
    )
  )
);
const Level3Module1Section2_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section2_5',
      () => import('@/pages/apprentice-courses/level3/module1/section2/Sub5')
    )
  )
);
const Level3Module1Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3_1',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Sub1')
    )
  )
);
const Level3Module1Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3_2',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Sub2')
    )
  )
);
const Level3Module1Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3_3',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Sub3')
    )
  )
);
const Level3Module1Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3_4',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Sub4')
    )
  )
);
const Level3Module1Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3_5',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Sub5')
    )
  )
);
const Level3Module1Section3_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section3_6',
      () => import('@/pages/apprentice-courses/level3/module1/section3/Sub6')
    )
  )
);
const Level3Module1Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4_1',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Sub1')
    )
  )
);
const Level3Module1Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4_2',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Sub2')
    )
  )
);
const Level3Module1Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4_3',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Sub3')
    )
  )
);
const Level3Module1Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4_4',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Sub4')
    )
  )
);
const Level3Module1Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4_5',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Sub5')
    )
  )
);
const Level3Module1Section4_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section4_6',
      () => import('@/pages/apprentice-courses/level3/module1/section4/Sub6')
    )
  )
);
const Level3Module1Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5_1',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Sub1')
    )
  )
);
const Level3Module1Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5_2',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Sub2')
    )
  )
);
const Level3Module1Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5_3',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Sub3')
    )
  )
);
const Level3Module1Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5_4',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Sub4')
    )
  )
);
const Level3Module1Section5_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5_5',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Sub5')
    )
  )
);
const Level3Module1Section5_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section5_6',
      () => import('@/pages/apprentice-courses/level3/module1/section5/Sub6')
    )
  )
);
const Level3Module1Section6_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6_1',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Sub1')
    )
  )
);
const Level3Module1Section6_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6_2',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Sub2')
    )
  )
);
const Level3Module1Section6_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6_3',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Sub3')
    )
  )
);
const Level3Module1Section6_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6_4',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Sub4')
    )
  )
);
const Level3Module1Section6_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6_5',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Sub5')
    )
  )
);
const Level3Module1Section6_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module1Section6_6',
      () => import('@/pages/apprentice-courses/level3/module1/section6/Sub6')
    )
  )
);
const Level3Module2 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module2', () => import('@/pages/apprentice-courses/Level3Module2'))
  )
);
const Level3Module2Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section1',
      () => import('@/pages/apprentice-courses/level3/module2/section1/Landing')
    )
  )
);
const Level3Module2Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section2',
      () => import('@/pages/apprentice-courses/level3/module2/section2/Landing')
    )
  )
);
const Level3Module2Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section3',
      () => import('@/pages/apprentice-courses/level3/module2/section3/Landing')
    )
  )
);
const Level3Module2Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section4',
      () => import('@/pages/apprentice-courses/level3/module2/section4/Landing')
    )
  )
);
const Level3Module2Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section5',
      () => import('@/pages/apprentice-courses/level3/module2/section5/Landing')
    )
  )
);
const Level3Module2Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section6',
      () => import('@/pages/apprentice-courses/level3/module2/section6/Landing')
    )
  )
);
const Level3Module2Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section1_1',
      () => import('@/pages/apprentice-courses/level3/module2/section1/Sub1')
    )
  )
);
const Level3Module2Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section1_2',
      () => import('@/pages/apprentice-courses/level3/module2/section1/Sub2')
    )
  )
);
const Level3Module2Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section1_3',
      () => import('@/pages/apprentice-courses/level3/module2/section1/Sub3')
    )
  )
);
const Level3Module2Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section1_4',
      () => import('@/pages/apprentice-courses/level3/module2/section1/Sub4')
    )
  )
);
const Level3Module2Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section1_5',
      () => import('@/pages/apprentice-courses/level3/module2/section1/Sub5')
    )
  )
);
const Level3Module2Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section2_1',
      () => import('@/pages/apprentice-courses/level3/module2/section2/Sub1')
    )
  )
);
const Level3Module2Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section2_2',
      () => import('@/pages/apprentice-courses/level3/module2/section2/Sub2')
    )
  )
);
const Level3Module2Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section2_3',
      () => import('@/pages/apprentice-courses/level3/module2/section2/Sub3')
    )
  )
);
const Level3Module2Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section2_4',
      () => import('@/pages/apprentice-courses/level3/module2/section2/Sub4')
    )
  )
);
const Level3Module2Section2_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section2_5',
      () => import('@/pages/apprentice-courses/level3/module2/section2/Sub5')
    )
  )
);
const Level3Module2Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section3_1',
      () => import('@/pages/apprentice-courses/level3/module2/section3/Sub1')
    )
  )
);
const Level3Module2Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section3_2',
      () => import('@/pages/apprentice-courses/level3/module2/section3/Sub2')
    )
  )
);
const Level3Module2Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section3_3',
      () => import('@/pages/apprentice-courses/level3/module2/section3/Sub3')
    )
  )
);
const Level3Module2Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section3_4',
      () => import('@/pages/apprentice-courses/level3/module2/section3/Sub4')
    )
  )
);
const Level3Module2Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section3_5',
      () => import('@/pages/apprentice-courses/level3/module2/section3/Sub5')
    )
  )
);
const Level3Module2Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section4_1',
      () => import('@/pages/apprentice-courses/level3/module2/section4/Sub1')
    )
  )
);
const Level3Module2Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section4_2',
      () => import('@/pages/apprentice-courses/level3/module2/section4/Sub2')
    )
  )
);
const Level3Module2Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section4_3',
      () => import('@/pages/apprentice-courses/level3/module2/section4/Sub3')
    )
  )
);
const Level3Module2Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section4_4',
      () => import('@/pages/apprentice-courses/level3/module2/section4/Sub4')
    )
  )
);
const Level3Module2Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section4_5',
      () => import('@/pages/apprentice-courses/level3/module2/section4/Sub5')
    )
  )
);
const Level3Module2Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section5_1',
      () => import('@/pages/apprentice-courses/level3/module2/section5/Sub1')
    )
  )
);
const Level3Module2Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section5_2',
      () => import('@/pages/apprentice-courses/level3/module2/section5/Sub2')
    )
  )
);
const Level3Module2Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section5_3',
      () => import('@/pages/apprentice-courses/level3/module2/section5/Sub3')
    )
  )
);
const Level3Module2Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section5_4',
      () => import('@/pages/apprentice-courses/level3/module2/section5/Sub4')
    )
  )
);
const Level3Module2Section5_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section5_5',
      () => import('@/pages/apprentice-courses/level3/module2/section5/Sub5')
    )
  )
);
const Level3Module2Section6_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section6_1',
      () => import('@/pages/apprentice-courses/level3/module2/section6/Sub1')
    )
  )
);
const Level3Module2Section6_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section6_2',
      () => import('@/pages/apprentice-courses/level3/module2/section6/Sub2')
    )
  )
);
const Level3Module2Section6_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section6_3',
      () => import('@/pages/apprentice-courses/level3/module2/section6/Sub3')
    )
  )
);
const Level3Module2Section6_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section6_4',
      () => import('@/pages/apprentice-courses/level3/module2/section6/Sub4')
    )
  )
);
const Level3Module2Section6_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module2Section6_5',
      () => import('@/pages/apprentice-courses/level3/module2/section6/Sub5')
    )
  )
);
const Level3Module3 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module3', () => import('@/pages/apprentice-courses/Level3Module3'))
  )
);
const Level3Module3Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section1',
      () => import('@/pages/apprentice-courses/level3/module3/section1/Landing')
    )
  )
);
const Level3Module3Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section1_1',
      () => import('@/pages/apprentice-courses/level3/module3/section1/Sub1')
    )
  )
);
const Level3Module3Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section1_2',
      () => import('@/pages/apprentice-courses/level3/module3/section1/Sub2')
    )
  )
);
const Level3Module3Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section1_3',
      () => import('@/pages/apprentice-courses/level3/module3/section1/Sub3')
    )
  )
);
const Level3Module3Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section1_4',
      () => import('@/pages/apprentice-courses/level3/module3/section1/Sub4')
    )
  )
);
const Level3Module3Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section1_5',
      () => import('@/pages/apprentice-courses/level3/module3/section1/Sub5')
    )
  )
);
const Level3Module3Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Landing')
    )
  )
);
const Level3Module3Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2_1',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Sub1')
    )
  )
);
const Level3Module3Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2_2',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Sub2')
    )
  )
);
const Level3Module3Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2_3',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Sub3')
    )
  )
);
const Level3Module3Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2_4',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Sub4')
    )
  )
);
const Level3Module3Section2_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2_5',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Sub5')
    )
  )
);
const Level3Module3Section2_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section2_6',
      () => import('@/pages/apprentice-courses/level3/module3/section2/Sub6')
    )
  )
);
const Level3Module3Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section3',
      () => import('@/pages/apprentice-courses/level3/module3/section3/Landing')
    )
  )
);
const Level3Module3Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section3_1',
      () => import('@/pages/apprentice-courses/level3/module3/section3/Sub1')
    )
  )
);
const Level3Module3Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section3_2',
      () => import('@/pages/apprentice-courses/level3/module3/section3/Sub2')
    )
  )
);
const Level3Module3Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section3_3',
      () => import('@/pages/apprentice-courses/level3/module3/section3/Sub3')
    )
  )
);
const Level3Module3Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section3_4',
      () => import('@/pages/apprentice-courses/level3/module3/section3/Sub4')
    )
  )
);
const Level3Module3Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section3_5',
      () => import('@/pages/apprentice-courses/level3/module3/section3/Sub5')
    )
  )
);
const Level3Module3Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Landing')
    )
  )
);
const Level3Module3Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4_1',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Sub1')
    )
  )
);
const Level3Module3Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4_2',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Sub2')
    )
  )
);
const Level3Module3Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4_3',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Sub3')
    )
  )
);
const Level3Module3Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4_4',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Sub4')
    )
  )
);
const Level3Module3Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4_5',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Sub5')
    )
  )
);
const Level3Module3Section4_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section4_6',
      () => import('@/pages/apprentice-courses/level3/module3/section4/Sub6')
    )
  )
);
const Level3Module3Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section5',
      () => import('@/pages/apprentice-courses/level3/module3/section5/Landing')
    )
  )
);
const Level3Module3Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section5_1',
      () => import('@/pages/apprentice-courses/level3/module3/section5/Sub1')
    )
  )
);
const Level3Module3Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section5_2',
      () => import('@/pages/apprentice-courses/level3/module3/section5/Sub2')
    )
  )
);
const Level3Module3Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section5_3',
      () => import('@/pages/apprentice-courses/level3/module3/section5/Sub3')
    )
  )
);
const Level3Module3Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section5_4',
      () => import('@/pages/apprentice-courses/level3/module3/section5/Sub4')
    )
  )
);
const Level3Module3Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section6',
      () => import('@/pages/apprentice-courses/level3/module3/section6/Landing')
    )
  )
);
const Level3Module3Section6_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section6_1',
      () => import('@/pages/apprentice-courses/level3/module3/section6/Sub1')
    )
  )
);
const Level3Module3Section6_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section6_2',
      () => import('@/pages/apprentice-courses/level3/module3/section6/Sub2')
    )
  )
);
const Level3Module3Section6_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section6_3',
      () => import('@/pages/apprentice-courses/level3/module3/section6/Sub3')
    )
  )
);
const Level3Module3Section6_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section6_4',
      () => import('@/pages/apprentice-courses/level3/module3/section6/Sub4')
    )
  )
);
const Level3Module3Section6_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module3Section6_5',
      () => import('@/pages/apprentice-courses/level3/module3/section6/Sub5')
    )
  )
);
const Level3Module4 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module4', () => import('@/pages/apprentice-courses/Level3Module4'))
  )
);
const Level3Module4Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section1',
      () => import('@/pages/apprentice-courses/level3/module4/section1/Landing')
    )
  )
);
const Level3Module4Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section1_1',
      () => import('@/pages/apprentice-courses/level3/module4/section1/Sub1')
    )
  )
);
const Level3Module4Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section1_2',
      () => import('@/pages/apprentice-courses/level3/module4/section1/Sub2')
    )
  )
);
const Level3Module4Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section1_3',
      () => import('@/pages/apprentice-courses/level3/module4/section1/Sub3')
    )
  )
);
const Level3Module4Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section1_4',
      () => import('@/pages/apprentice-courses/level3/module4/section1/Sub4')
    )
  )
);
const Level3Module4Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section1_5',
      () => import('@/pages/apprentice-courses/level3/module4/section1/Sub5')
    )
  )
);
const Level3Module4Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section2',
      () => import('@/pages/apprentice-courses/level3/module4/section2/Landing')
    )
  )
);
const Level3Module4Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section2_1',
      () => import('@/pages/apprentice-courses/level3/module4/section2/Sub1')
    )
  )
);
const Level3Module4Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section2_2',
      () => import('@/pages/apprentice-courses/level3/module4/section2/Sub2')
    )
  )
);
const Level3Module4Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section2_3',
      () => import('@/pages/apprentice-courses/level3/module4/section2/Sub3')
    )
  )
);
const Level3Module4Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section2_4',
      () => import('@/pages/apprentice-courses/level3/module4/section2/Sub4')
    )
  )
);
const Level3Module4Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Landing')
    )
  )
);
const Level3Module4Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3_1',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Sub1')
    )
  )
);
const Level3Module4Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3_2',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Sub2')
    )
  )
);
const Level3Module4Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3_3',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Sub3')
    )
  )
);
const Level3Module4Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3_4',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Sub4')
    )
  )
);
const Level3Module4Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3_5',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Sub5')
    )
  )
);
const Level3Module4Section3_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section3_6',
      () => import('@/pages/apprentice-courses/level3/module4/section3/Sub6')
    )
  )
);
const Level3Module4Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section4',
      () => import('@/pages/apprentice-courses/level3/module4/section4/Landing')
    )
  )
);
const Level3Module4Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section4_1',
      () => import('@/pages/apprentice-courses/level3/module4/section4/Sub1')
    )
  )
);
const Level3Module4Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section4_2',
      () => import('@/pages/apprentice-courses/level3/module4/section4/Sub2')
    )
  )
);
const Level3Module4Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section4_3',
      () => import('@/pages/apprentice-courses/level3/module4/section4/Sub3')
    )
  )
);
const Level3Module4Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section4_4',
      () => import('@/pages/apprentice-courses/level3/module4/section4/Sub4')
    )
  )
);
const Level3Module4Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section4_5',
      () => import('@/pages/apprentice-courses/level3/module4/section4/Sub5')
    )
  )
);
const Level3Module4Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section5',
      () => import('@/pages/apprentice-courses/level3/module4/section5/Landing')
    )
  )
);
const Level3Module4Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section5_1',
      () => import('@/pages/apprentice-courses/level3/module4/section5/Sub1')
    )
  )
);
const Level3Module4Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section5_2',
      () => import('@/pages/apprentice-courses/level3/module4/section5/Sub2')
    )
  )
);
const Level3Module4Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section5_3',
      () => import('@/pages/apprentice-courses/level3/module4/section5/Sub3')
    )
  )
);
const Level3Module4Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section5_4',
      () => import('@/pages/apprentice-courses/level3/module4/section5/Sub4')
    )
  )
);
const Level3Module4Section5_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section5_5',
      () => import('@/pages/apprentice-courses/level3/module4/section5/Sub5')
    )
  )
);
const Level3Module4Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section6',
      () => import('@/pages/apprentice-courses/level3/module4/section6/Landing')
    )
  )
);
const Level3Module4Section6_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section6_1',
      () => import('@/pages/apprentice-courses/level3/module4/section6/Sub1')
    )
  )
);
const Level3Module4Section6_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section6_2',
      () => import('@/pages/apprentice-courses/level3/module4/section6/Sub2')
    )
  )
);
const Level3Module4Section6_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section6_3',
      () => import('@/pages/apprentice-courses/level3/module4/section6/Sub3')
    )
  )
);
const Level3Module4Section6_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module4Section6_4',
      () => import('@/pages/apprentice-courses/level3/module4/section6/Sub4')
    )
  )
);
const Level3Module5 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module5', () => import('@/pages/apprentice-courses/Level3Module5'))
  )
);
const Level3Module5Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Landing')
    )
  )
);
const Level3Module5Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1_1',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Sub1')
    )
  )
);
const Level3Module5Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1_2',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Sub2')
    )
  )
);
const Level3Module5Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1_3',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Sub3')
    )
  )
);
const Level3Module5Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1_4',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Sub4')
    )
  )
);
const Level3Module5Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1_5',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Sub5')
    )
  )
);
const Level3Module5Section1_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section1_6',
      () => import('@/pages/apprentice-courses/level3/module5/section1/Sub6')
    )
  )
);
const Level3Module5Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section2',
      () => import('@/pages/apprentice-courses/level3/module5/section2/Landing')
    )
  )
);
const Level3Module5Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section2_1',
      () => import('@/pages/apprentice-courses/level3/module5/section2/Sub1')
    )
  )
);
const Level3Module5Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section2_2',
      () => import('@/pages/apprentice-courses/level3/module5/section2/Sub2')
    )
  )
);
const Level3Module5Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section2_3',
      () => import('@/pages/apprentice-courses/level3/module5/section2/Sub3')
    )
  )
);
const Level3Module5Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section2_4',
      () => import('@/pages/apprentice-courses/level3/module5/section2/Sub4')
    )
  )
);
const Level3Module5Section2_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section2_5',
      () => import('@/pages/apprentice-courses/level3/module5/section2/Sub5')
    )
  )
);
const Level3Module5Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Landing')
    )
  )
);
const Level3Module5Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3_1',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Sub1')
    )
  )
);
const Level3Module5Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3_2',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Sub2')
    )
  )
);
const Level3Module5Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3_3',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Sub3')
    )
  )
);
const Level3Module5Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3_4',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Sub4')
    )
  )
);
const Level3Module5Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3_5',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Sub5')
    )
  )
);
const Level3Module5Section3_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section3_6',
      () => import('@/pages/apprentice-courses/level3/module5/section3/Sub6')
    )
  )
);
const Level3Module5Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section4',
      () => import('@/pages/apprentice-courses/level3/module5/section4/Landing')
    )
  )
);
const Level3Module5Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section4_1',
      () => import('@/pages/apprentice-courses/level3/module5/section4/Sub1')
    )
  )
);
const Level3Module5Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section4_2',
      () => import('@/pages/apprentice-courses/level3/module5/section4/Sub2')
    )
  )
);
const Level3Module5Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section4_3',
      () => import('@/pages/apprentice-courses/level3/module5/section4/Sub3')
    )
  )
);
const Level3Module5Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section4_4',
      () => import('@/pages/apprentice-courses/level3/module5/section4/Sub4')
    )
  )
);
const Level3Module5Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section4_5',
      () => import('@/pages/apprentice-courses/level3/module5/section4/Sub5')
    )
  )
);
const Level3Module5Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section5',
      () => import('@/pages/apprentice-courses/level3/module5/section5/Landing')
    )
  )
);
const Level3Module5Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section5_1',
      () => import('@/pages/apprentice-courses/level3/module5/section5/Sub1')
    )
  )
);
const Level3Module5Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section5_2',
      () => import('@/pages/apprentice-courses/level3/module5/section5/Sub2')
    )
  )
);
const Level3Module5Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section5_3',
      () => import('@/pages/apprentice-courses/level3/module5/section5/Sub3')
    )
  )
);
const Level3Module5Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section5_4',
      () => import('@/pages/apprentice-courses/level3/module5/section5/Sub4')
    )
  )
);
const Level3Module5Section5_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section5_5',
      () => import('@/pages/apprentice-courses/level3/module5/section5/Sub5')
    )
  )
);
const Level3Module5Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section6',
      () => import('@/pages/apprentice-courses/level3/module5/section6/Landing')
    )
  )
);
const Level3Module5Section6_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section6_1',
      () => import('@/pages/apprentice-courses/level3/module5/section6/Sub1')
    )
  )
);
const Level3Module5Section6_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section6_2',
      () => import('@/pages/apprentice-courses/level3/module5/section6/Sub2')
    )
  )
);
const Level3Module5Section6_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section6_3',
      () => import('@/pages/apprentice-courses/level3/module5/section6/Sub3')
    )
  )
);
const Level3Module5Section6_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module5Section6_4',
      () => import('@/pages/apprentice-courses/level3/module5/section6/Sub4')
    )
  )
);
const Level3Module6 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module6', () => import('@/pages/apprentice-courses/Level3Module6'))
  )
);
const Level3Module6Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section1',
      () => import('@/pages/apprentice-courses/level3/module6/section1/Landing')
    )
  )
);
const Level3Module6Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section1_1',
      () => import('@/pages/apprentice-courses/level3/module6/section1/Sub1')
    )
  )
);
const Level3Module6Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section1_2',
      () => import('@/pages/apprentice-courses/level3/module6/section1/Sub2')
    )
  )
);
const Level3Module6Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section1_3',
      () => import('@/pages/apprentice-courses/level3/module6/section1/Sub3')
    )
  )
);
const Level3Module6Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section1_4',
      () => import('@/pages/apprentice-courses/level3/module6/section1/Sub4')
    )
  )
);
const Level3Module6Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section1_5',
      () => import('@/pages/apprentice-courses/level3/module6/section1/Sub5')
    )
  )
);
const Level3Module6Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Landing')
    )
  )
);
const Level3Module6Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2_1',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Sub1')
    )
  )
);
const Level3Module6Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2_2',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Sub2')
    )
  )
);
const Level3Module6Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2_3',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Sub3')
    )
  )
);
const Level3Module6Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2_4',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Sub4')
    )
  )
);
const Level3Module6Section2_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2_5',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Sub5')
    )
  )
);
const Level3Module6Section2_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section2_6',
      () => import('@/pages/apprentice-courses/level3/module6/section2/Sub6')
    )
  )
);
const Level3Module6Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section3',
      () => import('@/pages/apprentice-courses/level3/module6/section3/Landing')
    )
  )
);
const Level3Module6Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section3_1',
      () => import('@/pages/apprentice-courses/level3/module6/section3/Sub1')
    )
  )
);
const Level3Module6Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section3_2',
      () => import('@/pages/apprentice-courses/level3/module6/section3/Sub2')
    )
  )
);
const Level3Module6Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section3_3',
      () => import('@/pages/apprentice-courses/level3/module6/section3/Sub3')
    )
  )
);
const Level3Module6Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section3_4',
      () => import('@/pages/apprentice-courses/level3/module6/section3/Sub4')
    )
  )
);
const Level3Module6Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section3_5',
      () => import('@/pages/apprentice-courses/level3/module6/section3/Sub5')
    )
  )
);
const Level3Module6Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Landing')
    )
  )
);
const Level3Module6Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4_1',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Sub1')
    )
  )
);
const Level3Module6Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4_2',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Sub2')
    )
  )
);
const Level3Module6Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4_3',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Sub3')
    )
  )
);
const Level3Module6Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4_4',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Sub4')
    )
  )
);
const Level3Module6Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4_5',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Sub5')
    )
  )
);
const Level3Module6Section4_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section4_6',
      () => import('@/pages/apprentice-courses/level3/module6/section4/Sub6')
    )
  )
);
const Level3Module6Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section5',
      () => import('@/pages/apprentice-courses/level3/module6/section5/Landing')
    )
  )
);
const Level3Module6Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section5_1',
      () => import('@/pages/apprentice-courses/level3/module6/section5/Sub1')
    )
  )
);
const Level3Module6Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section5_2',
      () => import('@/pages/apprentice-courses/level3/module6/section5/Sub2')
    )
  )
);
const Level3Module6Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section5_3',
      () => import('@/pages/apprentice-courses/level3/module6/section5/Sub3')
    )
  )
);
const Level3Module6Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section5_4',
      () => import('@/pages/apprentice-courses/level3/module6/section5/Sub4')
    )
  )
);
const Level3Module6Section6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section6',
      () => import('@/pages/apprentice-courses/level3/module6/section6/Landing')
    )
  )
);
const Level3Module6Section6_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section6_1',
      () => import('@/pages/apprentice-courses/level3/module6/section6/Sub1')
    )
  )
);
const Level3Module6Section6_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section6_2',
      () => import('@/pages/apprentice-courses/level3/module6/section6/Sub2')
    )
  )
);
const Level3Module6Section6_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section6_3',
      () => import('@/pages/apprentice-courses/level3/module6/section6/Sub3')
    )
  )
);
const Level3Module6Section6_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section6_4',
      () => import('@/pages/apprentice-courses/level3/module6/section6/Sub4')
    )
  )
);
const Level3Module6Section6_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module6Section6_5',
      () => import('@/pages/apprentice-courses/level3/module6/section6/Sub5')
    )
  )
);
const Level3Module7 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module7', () => import('@/pages/apprentice-courses/Level3Module7'))
  )
);
const Level3Module7Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section1',
      () => import('@/pages/apprentice-courses/level3/module7/section1/Landing')
    )
  )
);
const Level3Module7Section1_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section1_1',
      () => import('@/pages/apprentice-courses/level3/module7/section1/Sub1')
    )
  )
);
const Level3Module7Section1_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section1_2',
      () => import('@/pages/apprentice-courses/level3/module7/section1/Sub2')
    )
  )
);
const Level3Module7Section1_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section1_3',
      () => import('@/pages/apprentice-courses/level3/module7/section1/Sub3')
    )
  )
);
const Level3Module7Section1_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section1_4',
      () => import('@/pages/apprentice-courses/level3/module7/section1/Sub4')
    )
  )
);
const Level3Module7Section1_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section1_5',
      () => import('@/pages/apprentice-courses/level3/module7/section1/Sub5')
    )
  )
);
const Level3Module7Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section2',
      () => import('@/pages/apprentice-courses/level3/module7/section2/Landing')
    )
  )
);
const Level3Module7Section2_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section2_1',
      () => import('@/pages/apprentice-courses/level3/module7/section2/Sub1')
    )
  )
);
const Level3Module7Section2_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section2_2',
      () => import('@/pages/apprentice-courses/level3/module7/section2/Sub2')
    )
  )
);
const Level3Module7Section2_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section2_3',
      () => import('@/pages/apprentice-courses/level3/module7/section2/Sub3')
    )
  )
);
const Level3Module7Section2_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section2_4',
      () => import('@/pages/apprentice-courses/level3/module7/section2/Sub4')
    )
  )
);
const Level3Module7Section2_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section2_5',
      () => import('@/pages/apprentice-courses/level3/module7/section2/Sub5')
    )
  )
);
const Level3Module7Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section3',
      () => import('@/pages/apprentice-courses/level3/module7/section3/Landing')
    )
  )
);
const Level3Module7Section3_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section3_1',
      () => import('@/pages/apprentice-courses/level3/module7/section3/Sub1')
    )
  )
);
const Level3Module7Section3_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section3_2',
      () => import('@/pages/apprentice-courses/level3/module7/section3/Sub2')
    )
  )
);
const Level3Module7Section3_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section3_3',
      () => import('@/pages/apprentice-courses/level3/module7/section3/Sub3')
    )
  )
);
const Level3Module7Section3_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section3_4',
      () => import('@/pages/apprentice-courses/level3/module7/section3/Sub4')
    )
  )
);
const Level3Module7Section3_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section3_5',
      () => import('@/pages/apprentice-courses/Level3Module7Section3_5')
    )
  )
);
const Level3Module7Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section4',
      () => import('@/pages/apprentice-courses/level3/module7/section4/Landing')
    )
  )
);
const Level3Module7Section4_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section4_1',
      () => import('@/pages/apprentice-courses/level3/module7/section4/Sub1')
    )
  )
);
const Level3Module7Section4_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section4_2',
      () => import('@/pages/apprentice-courses/level3/module7/section4/Sub2')
    )
  )
);
const Level3Module7Section4_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section4_3',
      () => import('@/pages/apprentice-courses/level3/module7/section4/Sub3')
    )
  )
);
const Level3Module7Section4_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section4_4',
      () => import('@/pages/apprentice-courses/level3/module7/section4/Sub4')
    )
  )
);
const Level3Module7Section4_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section4_5',
      () => import('@/pages/apprentice-courses/Level3Module7Section4_5')
    )
  )
);
const Level3Module7Section5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5',
      () => import('@/pages/apprentice-courses/Level3Module7Section5')
    )
  )
);
const Level3Module7Section5_1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5_1',
      () => import('@/pages/apprentice-courses/Level3Module7Section5_1')
    )
  )
);
const Level3Module7Section5_2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5_2',
      () => import('@/pages/apprentice-courses/Level3Module7Section5_2')
    )
  )
);
const Level3Module7Section5_3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5_3',
      () => import('@/pages/apprentice-courses/Level3Module7Section5_3')
    )
  )
);
const Level3Module7Section5_4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5_4',
      () => import('@/pages/apprentice-courses/Level3Module7Section5_4')
    )
  )
);
const Level3Module7Section5_5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5_5',
      () => import('@/pages/apprentice-courses/Level3Module7Section5_5')
    )
  )
);
const Level3Module7Section5_6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module7Section5_6',
      () => import('@/pages/apprentice-courses/Level3Module7Section5_6')
    )
  )
);
const Level3Module8 = lazy(() =>
  withTimeout(() =>
    trackImport('Level3Module8', () => import('@/pages/apprentice-courses/Level3Module8'))
  )
);
const Level3Module8Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8Section1',
      () => import('@/pages/apprentice-courses/Level3Module8Section1')
    )
  )
);
const Level3Module8Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8Section2',
      () => import('@/pages/apprentice-courses/Level3Module8Section2')
    )
  )
);
const Level3Module8Section2Section1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8Section2Section1',
      () => import('@/pages/apprentice-courses/Level3Module8Section2Section1')
    )
  )
);
const Level3Module8Section2Section2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8Section2Section2',
      () => import('@/pages/apprentice-courses/Level3Module8Section2Section2')
    )
  )
);
const Level3Module8Section2Section3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8Section2Section3',
      () => import('@/pages/apprentice-courses/Level3Module8Section2Section3')
    )
  )
);
const Level3Module8Section2Section4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8Section2Section4',
      () => import('@/pages/apprentice-courses/Level3Module8Section2Section4')
    )
  )
);
const Level3Module8MockExam1 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam1',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam1')
    )
  )
);
const Level3Module8MockExam2 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam2',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam2')
    )
  )
);
const Level3Module8MockExam3 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam3',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam3')
    )
  )
);
const Level3Module8MockExam4 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam4',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam4')
    )
  )
);
const Level3Module8MockExam5 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam5',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam5')
    )
  )
);
const Level3Module8MockExam6 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam6',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam6')
    )
  )
);
const Level3Module8MockExam7 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam7',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam7')
    )
  )
);
const Level3Module8MockExam8 = lazy(() =>
  withTimeout(() =>
    trackImport(
      'Level3Module8MockExam8',
      () => import('@/pages/apprentice-courses/Level3Module8MockExam8')
    )
  )
);

// ============================================================================
// Route fragment — spread into parent <Routes>
// ============================================================================

export const level3Routes = (
  <>
    <Route path="level3" element={<Level3 />} />
    <Route path="level3-module1" element={<Level3Module1 />} />
    <Route path="level3-module1-section1" element={<Level3Module1Section1 />} />
    <Route path="level3-module1-section2" element={<Level3Module1Section2 />} />
    <Route path="level3-module1-section3" element={<Level3Module1Section3 />} />
    <Route path="level3-module1-section4" element={<Level3Module1Section4 />} />
    <Route path="level3-module1-section5" element={<Level3Module1Section5 />} />
    <Route path="level3-module1-section6" element={<Level3Module1Section6 />} />
    <Route path="level3-module1-section1-1" element={<Level3Module1Section1_1 />} />
    <Route path="level3-module1-section1-2" element={<Level3Module1Section1_2 />} />
    <Route path="level3-module1-section1-3" element={<Level3Module1Section1_3 />} />
    <Route path="level3-module1-section1-4" element={<Level3Module1Section1_4 />} />
    <Route path="level3-module1-section1-5" element={<Level3Module1Section1_5 />} />
    <Route path="level3-module1-section1-6" element={<Level3Module1Section1_6 />} />
    <Route path="level3-module1-section1-7" element={<Level3Module1Section1_7 />} />
    <Route path="level3-module1-section2-1" element={<Level3Module1Section2_1 />} />
    <Route path="level3-module1-section2-2" element={<Level3Module1Section2_2 />} />
    <Route path="level3-module1-section2-3" element={<Level3Module1Section2_3 />} />
    <Route path="level3-module1-section2-4" element={<Level3Module1Section2_4 />} />
    <Route path="level3-module1-section2-5" element={<Level3Module1Section2_5 />} />
    <Route path="level3-module1-section3-1" element={<Level3Module1Section3_1 />} />
    <Route path="level3-module1-section3-2" element={<Level3Module1Section3_2 />} />
    <Route path="level3-module1-section3-3" element={<Level3Module1Section3_3 />} />
    <Route path="level3-module1-section3-4" element={<Level3Module1Section3_4 />} />
    <Route path="level3-module1-section3-5" element={<Level3Module1Section3_5 />} />
    <Route path="level3-module1-section3-6" element={<Level3Module1Section3_6 />} />
    <Route path="level3-module1-section4-1" element={<Level3Module1Section4_1 />} />
    <Route path="level3-module1-section4-2" element={<Level3Module1Section4_2 />} />
    <Route path="level3-module1-section4-3" element={<Level3Module1Section4_3 />} />
    <Route path="level3-module1-section4-4" element={<Level3Module1Section4_4 />} />
    <Route path="level3-module1-section4-5" element={<Level3Module1Section4_5 />} />
    <Route path="level3-module1-section4-6" element={<Level3Module1Section4_6 />} />
    <Route path="level3-module1-section5-1" element={<Level3Module1Section5_1 />} />
    <Route path="level3-module1-section5-2" element={<Level3Module1Section5_2 />} />
    <Route path="level3-module1-section5-3" element={<Level3Module1Section5_3 />} />
    <Route path="level3-module1-section5-4" element={<Level3Module1Section5_4 />} />
    <Route path="level3-module1-section5-5" element={<Level3Module1Section5_5 />} />
    <Route path="level3-module1-section5-6" element={<Level3Module1Section5_6 />} />
    <Route path="level3-module1-section6-1" element={<Level3Module1Section6_1 />} />
    <Route path="level3-module1-section6-2" element={<Level3Module1Section6_2 />} />
    <Route path="level3-module1-section6-3" element={<Level3Module1Section6_3 />} />
    <Route path="level3-module1-section6-4" element={<Level3Module1Section6_4 />} />
    <Route path="level3-module1-section6-5" element={<Level3Module1Section6_5 />} />
    <Route path="level3-module1-section6-6" element={<Level3Module1Section6_6 />} />
    <Route path="level3-module2" element={<Level3Module2 />} />
    <Route path="level3-module2-section1" element={<Level3Module2Section1 />} />
    <Route path="level3-module2-section2" element={<Level3Module2Section2 />} />
    <Route path="level3-module2-section3" element={<Level3Module2Section3 />} />
    <Route path="level3-module2-section4" element={<Level3Module2Section4 />} />
    <Route path="level3-module2-section5" element={<Level3Module2Section5 />} />
    <Route path="level3-module2-section6" element={<Level3Module2Section6 />} />
    <Route path="level3-module2-section1-1" element={<Level3Module2Section1_1 />} />
    <Route path="level3-module2-section1-2" element={<Level3Module2Section1_2 />} />
    <Route path="level3-module2-section1-3" element={<Level3Module2Section1_3 />} />
    <Route path="level3-module2-section1-4" element={<Level3Module2Section1_4 />} />
    <Route path="level3-module2-section1-5" element={<Level3Module2Section1_5 />} />
    <Route path="level3-module2-section2-1" element={<Level3Module2Section2_1 />} />
    <Route path="level3-module2-section2-2" element={<Level3Module2Section2_2 />} />
    <Route path="level3-module2-section2-3" element={<Level3Module2Section2_3 />} />
    <Route path="level3-module2-section2-4" element={<Level3Module2Section2_4 />} />
    <Route path="level3-module2-section2-5" element={<Level3Module2Section2_5 />} />
    <Route path="level3-module2-section3-1" element={<Level3Module2Section3_1 />} />
    <Route path="level3-module2-section3-2" element={<Level3Module2Section3_2 />} />
    <Route path="level3-module2-section3-3" element={<Level3Module2Section3_3 />} />
    <Route path="level3-module2-section3-4" element={<Level3Module2Section3_4 />} />
    <Route path="level3-module2-section3-5" element={<Level3Module2Section3_5 />} />
    <Route path="level3-module2-section4-1" element={<Level3Module2Section4_1 />} />
    <Route path="level3-module2-section4-2" element={<Level3Module2Section4_2 />} />
    <Route path="level3-module2-section4-3" element={<Level3Module2Section4_3 />} />
    <Route path="level3-module2-section4-4" element={<Level3Module2Section4_4 />} />
    <Route path="level3-module2-section4-5" element={<Level3Module2Section4_5 />} />
    <Route path="level3-module2-section5-1" element={<Level3Module2Section5_1 />} />
    <Route path="level3-module2-section5-2" element={<Level3Module2Section5_2 />} />
    <Route path="level3-module2-section5-3" element={<Level3Module2Section5_3 />} />
    <Route path="level3-module2-section5-4" element={<Level3Module2Section5_4 />} />
    <Route path="level3-module2-section5-5" element={<Level3Module2Section5_5 />} />
    <Route path="level3-module2-section6-1" element={<Level3Module2Section6_1 />} />
    <Route path="level3-module2-section6-2" element={<Level3Module2Section6_2 />} />
    <Route path="level3-module2-section6-3" element={<Level3Module2Section6_3 />} />
    <Route path="level3-module2-section6-4" element={<Level3Module2Section6_4 />} />
    <Route path="level3-module2-section6-5" element={<Level3Module2Section6_5 />} />
    <Route path="level3-module3" element={<Level3Module3 />} />
    <Route path="level3-module3-section1" element={<Level3Module3Section1 />} />
    <Route path="level3-module3-section1-1" element={<Level3Module3Section1_1 />} />
    <Route path="level3-module3-section1-2" element={<Level3Module3Section1_2 />} />
    <Route path="level3-module3-section1-3" element={<Level3Module3Section1_3 />} />
    <Route path="level3-module3-section1-4" element={<Level3Module3Section1_4 />} />
    <Route path="level3-module3-section1-5" element={<Level3Module3Section1_5 />} />
    <Route path="level3-module3-section2" element={<Level3Module3Section2 />} />
    <Route path="level3-module3-section2-1" element={<Level3Module3Section2_1 />} />
    <Route path="level3-module3-section2-2" element={<Level3Module3Section2_2 />} />
    <Route path="level3-module3-section2-3" element={<Level3Module3Section2_3 />} />
    <Route path="level3-module3-section2-4" element={<Level3Module3Section2_4 />} />
    <Route path="level3-module3-section2-5" element={<Level3Module3Section2_5 />} />
    <Route path="level3-module3-section2-6" element={<Level3Module3Section2_6 />} />
    <Route path="level3-module3-section3" element={<Level3Module3Section3 />} />
    <Route path="level3-module3-section3-1" element={<Level3Module3Section3_1 />} />
    <Route path="level3-module3-section3-2" element={<Level3Module3Section3_2 />} />
    <Route path="level3-module3-section3-3" element={<Level3Module3Section3_3 />} />
    <Route path="level3-module3-section3-4" element={<Level3Module3Section3_4 />} />
    <Route path="level3-module3-section3-5" element={<Level3Module3Section3_5 />} />
    <Route path="level3-module3-section4" element={<Level3Module3Section4 />} />
    <Route path="level3-module3-section4-1" element={<Level3Module3Section4_1 />} />
    <Route path="level3-module3-section4-2" element={<Level3Module3Section4_2 />} />
    <Route path="level3-module3-section4-3" element={<Level3Module3Section4_3 />} />
    <Route path="level3-module3-section4-4" element={<Level3Module3Section4_4 />} />
    <Route path="level3-module3-section4-5" element={<Level3Module3Section4_5 />} />
    <Route path="level3-module3-section4-6" element={<Level3Module3Section4_6 />} />
    <Route path="level3-module3-section5" element={<Level3Module3Section5 />} />
    <Route path="level3-module3-section5-1" element={<Level3Module3Section5_1 />} />
    <Route path="level3-module3-section5-2" element={<Level3Module3Section5_2 />} />
    <Route path="level3-module3-section5-3" element={<Level3Module3Section5_3 />} />
    <Route path="level3-module3-section5-4" element={<Level3Module3Section5_4 />} />
    <Route path="level3-module3-section6" element={<Level3Module3Section6 />} />
    <Route path="level3-module3-section6-1" element={<Level3Module3Section6_1 />} />
    <Route path="level3-module3-section6-2" element={<Level3Module3Section6_2 />} />
    <Route path="level3-module3-section6-3" element={<Level3Module3Section6_3 />} />
    <Route path="level3-module3-section6-4" element={<Level3Module3Section6_4 />} />
    <Route path="level3-module3-section6-5" element={<Level3Module3Section6_5 />} />
    <Route path="level3-module4" element={<Level3Module4 />} />
    <Route path="level3-module4-section1" element={<Level3Module4Section1 />} />
    <Route path="level3-module4-section1-1" element={<Level3Module4Section1_1 />} />
    <Route path="level3-module4-section1-2" element={<Level3Module4Section1_2 />} />
    <Route path="level3-module4-section1-3" element={<Level3Module4Section1_3 />} />
    <Route path="level3-module4-section1-4" element={<Level3Module4Section1_4 />} />
    <Route path="level3-module4-section1-5" element={<Level3Module4Section1_5 />} />
    <Route path="level3-module4-section2" element={<Level3Module4Section2 />} />
    <Route path="level3-module4-section2-1" element={<Level3Module4Section2_1 />} />
    <Route path="level3-module4-section2-2" element={<Level3Module4Section2_2 />} />
    <Route path="level3-module4-section2-3" element={<Level3Module4Section2_3 />} />
    <Route path="level3-module4-section2-4" element={<Level3Module4Section2_4 />} />
    <Route path="level3-module4-section3" element={<Level3Module4Section3 />} />
    <Route path="level3-module4-section3-1" element={<Level3Module4Section3_1 />} />
    <Route path="level3-module4-section3-2" element={<Level3Module4Section3_2 />} />
    <Route path="level3-module4-section3-3" element={<Level3Module4Section3_3 />} />
    <Route path="level3-module4-section3-4" element={<Level3Module4Section3_4 />} />
    <Route path="level3-module4-section3-5" element={<Level3Module4Section3_5 />} />
    <Route path="level3-module4-section3-6" element={<Level3Module4Section3_6 />} />
    <Route path="level3-module4-section4" element={<Level3Module4Section4 />} />
    <Route path="level3-module4-section4-1" element={<Level3Module4Section4_1 />} />
    <Route path="level3-module4-section4-2" element={<Level3Module4Section4_2 />} />
    <Route path="level3-module4-section4-3" element={<Level3Module4Section4_3 />} />
    <Route path="level3-module4-section4-4" element={<Level3Module4Section4_4 />} />
    <Route path="level3-module4-section4-5" element={<Level3Module4Section4_5 />} />
    <Route path="level3-module4-section5" element={<Level3Module4Section5 />} />
    <Route path="level3-module4-section5-1" element={<Level3Module4Section5_1 />} />
    <Route path="level3-module4-section5-2" element={<Level3Module4Section5_2 />} />
    <Route path="level3-module4-section5-3" element={<Level3Module4Section5_3 />} />
    <Route path="level3-module4-section5-4" element={<Level3Module4Section5_4 />} />
    <Route path="level3-module4-section5-5" element={<Level3Module4Section5_5 />} />
    <Route path="level3-module4-section6" element={<Level3Module4Section6 />} />
    <Route path="level3-module4-section6-1" element={<Level3Module4Section6_1 />} />
    <Route path="level3-module4-section6-2" element={<Level3Module4Section6_2 />} />
    <Route path="level3-module4-section6-3" element={<Level3Module4Section6_3 />} />
    <Route path="level3-module4-section6-4" element={<Level3Module4Section6_4 />} />
    <Route path="level3-module5" element={<Level3Module5 />} />
    <Route path="level3-module5-section1" element={<Level3Module5Section1 />} />
    <Route path="level3-module5-section1-1" element={<Level3Module5Section1_1 />} />
    <Route path="level3-module5-section1-2" element={<Level3Module5Section1_2 />} />
    <Route path="level3-module5-section1-3" element={<Level3Module5Section1_3 />} />
    <Route path="level3-module5-section1-4" element={<Level3Module5Section1_4 />} />
    <Route path="level3-module5-section1-5" element={<Level3Module5Section1_5 />} />
    <Route path="level3-module5-section1-6" element={<Level3Module5Section1_6 />} />
    <Route path="level3-module5-section2" element={<Level3Module5Section2 />} />
    <Route path="level3-module5-section2-1" element={<Level3Module5Section2_1 />} />
    <Route path="level3-module5-section2-2" element={<Level3Module5Section2_2 />} />
    <Route path="level3-module5-section2-3" element={<Level3Module5Section2_3 />} />
    <Route path="level3-module5-section2-4" element={<Level3Module5Section2_4 />} />
    <Route path="level3-module5-section2-5" element={<Level3Module5Section2_5 />} />
    <Route path="level3-module5-section3" element={<Level3Module5Section3 />} />
    <Route path="level3-module5-section3-1" element={<Level3Module5Section3_1 />} />
    <Route path="level3-module5-section3-2" element={<Level3Module5Section3_2 />} />
    <Route path="level3-module5-section3-3" element={<Level3Module5Section3_3 />} />
    <Route path="level3-module5-section3-4" element={<Level3Module5Section3_4 />} />
    <Route path="level3-module5-section3-5" element={<Level3Module5Section3_5 />} />
    <Route path="level3-module5-section3-6" element={<Level3Module5Section3_6 />} />
    <Route path="level3-module5-section4" element={<Level3Module5Section4 />} />
    <Route path="level3-module5-section4-1" element={<Level3Module5Section4_1 />} />
    <Route path="level3-module5-section4-2" element={<Level3Module5Section4_2 />} />
    <Route path="level3-module5-section4-3" element={<Level3Module5Section4_3 />} />
    <Route path="level3-module5-section4-4" element={<Level3Module5Section4_4 />} />
    <Route path="level3-module5-section4-5" element={<Level3Module5Section4_5 />} />
    <Route path="level3-module5-section5" element={<Level3Module5Section5 />} />
    <Route path="level3-module5-section5-1" element={<Level3Module5Section5_1 />} />
    <Route path="level3-module5-section5-2" element={<Level3Module5Section5_2 />} />
    <Route path="level3-module5-section5-3" element={<Level3Module5Section5_3 />} />
    <Route path="level3-module5-section5-4" element={<Level3Module5Section5_4 />} />
    <Route path="level3-module5-section5-5" element={<Level3Module5Section5_5 />} />
    <Route path="level3-module5-section6" element={<Level3Module5Section6 />} />
    <Route path="level3-module5-section6-1" element={<Level3Module5Section6_1 />} />
    <Route path="level3-module5-section6-2" element={<Level3Module5Section6_2 />} />
    <Route path="level3-module5-section6-3" element={<Level3Module5Section6_3 />} />
    <Route path="level3-module5-section6-4" element={<Level3Module5Section6_4 />} />
    <Route path="level3-module6" element={<Level3Module6 />} />
    <Route path="level3-module6-section1" element={<Level3Module6Section1 />} />
    <Route path="level3-module6-section1-1" element={<Level3Module6Section1_1 />} />
    <Route path="level3-module6-section1-2" element={<Level3Module6Section1_2 />} />
    <Route path="level3-module6-section1-3" element={<Level3Module6Section1_3 />} />
    <Route path="level3-module6-section1-4" element={<Level3Module6Section1_4 />} />
    <Route path="level3-module6-section1-5" element={<Level3Module6Section1_5 />} />
    <Route path="level3-module6-section2" element={<Level3Module6Section2 />} />
    <Route path="level3-module6-section2-1" element={<Level3Module6Section2_1 />} />
    <Route path="level3-module6-section2-2" element={<Level3Module6Section2_2 />} />
    <Route path="level3-module6-section2-3" element={<Level3Module6Section2_3 />} />
    <Route path="level3-module6-section2-4" element={<Level3Module6Section2_4 />} />
    <Route path="level3-module6-section2-5" element={<Level3Module6Section2_5 />} />
    <Route path="level3-module6-section2-6" element={<Level3Module6Section2_6 />} />
    <Route path="level3-module6-section3" element={<Level3Module6Section3 />} />
    <Route path="level3-module6-section3-1" element={<Level3Module6Section3_1 />} />
    <Route path="level3-module6-section3-2" element={<Level3Module6Section3_2 />} />
    <Route path="level3-module6-section3-3" element={<Level3Module6Section3_3 />} />
    <Route path="level3-module6-section3-4" element={<Level3Module6Section3_4 />} />
    <Route path="level3-module6-section3-5" element={<Level3Module6Section3_5 />} />
    <Route path="level3-module6-section4" element={<Level3Module6Section4 />} />
    <Route path="level3-module6-section4-1" element={<Level3Module6Section4_1 />} />
    <Route path="level3-module6-section4-2" element={<Level3Module6Section4_2 />} />
    <Route path="level3-module6-section4-3" element={<Level3Module6Section4_3 />} />
    <Route path="level3-module6-section4-4" element={<Level3Module6Section4_4 />} />
    <Route path="level3-module6-section4-5" element={<Level3Module6Section4_5 />} />
    <Route path="level3-module6-section4-6" element={<Level3Module6Section4_6 />} />
    <Route path="level3-module6-section5" element={<Level3Module6Section5 />} />
    <Route path="level3-module6-section5-1" element={<Level3Module6Section5_1 />} />
    <Route path="level3-module6-section5-2" element={<Level3Module6Section5_2 />} />
    <Route path="level3-module6-section5-3" element={<Level3Module6Section5_3 />} />
    <Route path="level3-module6-section5-4" element={<Level3Module6Section5_4 />} />
    <Route path="level3-module6-section6" element={<Level3Module6Section6 />} />
    <Route path="level3-module6-section6-1" element={<Level3Module6Section6_1 />} />
    <Route path="level3-module6-section6-2" element={<Level3Module6Section6_2 />} />
    <Route path="level3-module6-section6-3" element={<Level3Module6Section6_3 />} />
    <Route path="level3-module6-section6-4" element={<Level3Module6Section6_4 />} />
    <Route path="level3-module6-section6-5" element={<Level3Module6Section6_5 />} />
    <Route path="level3-module7" element={<Level3Module7 />} />
    <Route path="level3-module7-section1" element={<Level3Module7Section1 />} />
    <Route path="level3-module7-section1-1" element={<Level3Module7Section1_1 />} />
    <Route path="level3-module7-section1-2" element={<Level3Module7Section1_2 />} />
    <Route path="level3-module7-section1-3" element={<Level3Module7Section1_3 />} />
    <Route path="level3-module7-section1-4" element={<Level3Module7Section1_4 />} />
    <Route path="level3-module7-section1-5" element={<Level3Module7Section1_5 />} />
    <Route path="level3-module7-section2" element={<Level3Module7Section2 />} />
    <Route path="level3-module7-section2-1" element={<Level3Module7Section2_1 />} />
    <Route path="level3-module7-section2-2" element={<Level3Module7Section2_2 />} />
    <Route path="level3-module7-section2-3" element={<Level3Module7Section2_3 />} />
    <Route path="level3-module7-section2-4" element={<Level3Module7Section2_4 />} />
    <Route path="level3-module7-section2-5" element={<Level3Module7Section2_5 />} />
    <Route path="level3-module7-section3" element={<Level3Module7Section3 />} />
    <Route path="level3-module7-section3-1" element={<Level3Module7Section3_1 />} />
    <Route path="level3-module7-section3-2" element={<Level3Module7Section3_2 />} />
    <Route path="level3-module7-section3-3" element={<Level3Module7Section3_3 />} />
    <Route path="level3-module7-section3-4" element={<Level3Module7Section3_4 />} />
    <Route path="level3-module7-section3-5" element={<Level3Module7Section3_5 />} />
    <Route path="level3-module7-section4" element={<Level3Module7Section4 />} />
    <Route path="level3-module7-section4-1" element={<Level3Module7Section4_1 />} />
    <Route path="level3-module7-section4-2" element={<Level3Module7Section4_2 />} />
    <Route path="level3-module7-section4-3" element={<Level3Module7Section4_3 />} />
    <Route path="level3-module7-section4-4" element={<Level3Module7Section4_4 />} />
    <Route path="level3-module7-section4-5" element={<Level3Module7Section4_5 />} />
    <Route path="level3-module7-section5" element={<Level3Module7Section5 />} />
    <Route path="level3-module7-section5-1" element={<Level3Module7Section5_1 />} />
    <Route path="level3-module7-section5-2" element={<Level3Module7Section5_2 />} />
    <Route path="level3-module7-section5-3" element={<Level3Module7Section5_3 />} />
    <Route path="level3-module7-section5-4" element={<Level3Module7Section5_4 />} />
    <Route path="level3-module7-section5-5" element={<Level3Module7Section5_5 />} />
    <Route path="level3-module7-section5-6" element={<Level3Module7Section5_6 />} />
    <Route path="level3-module8" element={<Level3Module8 />} />
    <Route path="level3-module8-section1" element={<Level3Module8Section1 />} />
    <Route path="level3-module8-section2" element={<Level3Module8Section2 />} />
    <Route
      path="level3-module8-section2-section1"
      element={<Level3Module8Section2Section1 />}
    />
    <Route
      path="level3-module8-section2-section2"
      element={<Level3Module8Section2Section2 />}
    />
    <Route
      path="level3-module8-section2-section3"
      element={<Level3Module8Section2Section3 />}
    />
    <Route
      path="level3-module8-section2-section4"
      element={<Level3Module8Section2Section4 />}
    />
    <Route path="level3-module8-mock-exam1" element={<Level3Module8MockExam1 />} />
    <Route path="level3-module8-mock-exam2" element={<Level3Module8MockExam2 />} />
    <Route path="level3-module8-mock-exam3" element={<Level3Module8MockExam3 />} />
    <Route path="level3-module8-mock-exam4" element={<Level3Module8MockExam4 />} />
    <Route path="level3-module8-mock-exam5" element={<Level3Module8MockExam5 />} />
    <Route path="level3-module8-mock-exam6" element={<Level3Module8MockExam6 />} />
    <Route path="level3-module8-mock-exam7" element={<Level3Module8MockExam7 />} />
    <Route path="level3-module8-mock-exam8" element={<Level3Module8MockExam8 />} />
  </>
);
