/**
 * initialVerificationBank — the shared inspection & testing bank filtered to
 * the initial-verification syllabus.
 *
 * Used by BOTH public mock exam pages that cover initial verification:
 *   • /mock-exams/2391-50-initial-verification  (C&G 2391-50)
 *   • /mock-exams/2392-fundamental-inspection-testing  (C&G 2392)
 * The 2392 (Fundamental Inspection, Testing and Initial Verification) sits a
 * level below the 2391-50 but examines the same domain — initial verification
 * to BS 7671 — so the same periodic-only exclusions apply. Inverse filter of
 * C239151PeriodicMockExamPage.
 */
import { inspectionTestingQuestionBank } from '@/data/upskilling/inspectionTestingMockExamData';

/** Questions specific to periodic inspection/EICR — out of scope for initial verification. */
export const PERIODIC_ONLY_IDS = new Set([
  1, 3, 5, 6, 7, 8, 9, 13, 14, 16, 21, 30, 129, 169, 170, 171, 172, 173, 174, 175, 218, 258, 263,
  271, 273,
]);

export const initialVerificationBank = inspectionTestingQuestionBank.filter(
  (q) => !PERIODIC_ONLY_IDS.has(q.id)
);
