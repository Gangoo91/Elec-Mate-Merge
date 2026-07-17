/**
 * C239150InitialMockExamPage — public mock exam page for C&G 2391-50.
 * Reuses the shared inspection & testing bank, excluding the
 * periodic-inspection-only questions (EICR observations, condition
 * reporting, sampling) so every draw fits the initial verification
 * syllabus. Inverse filter of C239151PeriodicMockExamPage.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { inspectionTestingQuestionBank } from '@/data/upskilling/inspectionTestingMockExamData';

/** Questions specific to periodic inspection/EICR — out of scope for 2391-50. */
const PERIODIC_ONLY_IDS = new Set([
  1, 3, 5, 6, 7, 8, 9, 13, 14, 16, 21, 30, 129, 169, 170, 171, 172, 173, 174, 175, 218, 258, 263,
  271, 273,
]);

const initialVerificationBank = inspectionTestingQuestionBank.filter(
  (q) => !PERIODIC_ONLY_IDS.has(q.id)
);

export default function C239150InitialMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free 2391-50 Mock Exam 2026 — Initial Verification`}
      description={`Free City & Guilds 2391-50 mock test: 30 questions, 90-min timer. Initial verification, the GN3 test sequence, certification and the EIC, dead + live testing.`}
      slug="2391-50-initial-verification"
      heading={`C&G 2391-50 Mock Exam — Initial Verification`}
      intro={`Free City & Guilds 2391-50 Initial Verification mock exam. 30 questions drawn from a ${initialVerificationBank.length}-question bank covering initial verification to BS 7671: the full GN3 test sequence, safe isolation, continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing, and certification with the Electrical Installation Certificate. Sitting the periodic unit instead? Use our 2391-51 mock exam — or the combined 2391 exam for the full 2391-52 syllabus.`}
      questionBank={
        initialVerificationBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={90}
      passThreshold={70}
      breadcrumbLabel="2391-50 Initial Verification"
    />
  );
}
