/**
 * C239150InitialMockExamPage — public mock exam page for C&G 2391-50.
 * Reuses the shared inspection & testing bank, excluding the
 * periodic-inspection-only questions (EICR observations, condition
 * reporting, sampling) so every draw fits the initial verification
 * syllabus. Inverse filter of C239151PeriodicMockExamPage.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { initialVerificationBank } from '@/data/upskilling/initialVerificationBank';

export default function C239150InitialMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free 2391-50 Mock Exam: Initial Verification`}
      description={`Free City & Guilds 2391-50 mock test: 30 questions, 90-min timer. Initial verification, the GN3 test sequence, dead and live testing, the EIC.`}
      slug="2391-50-initial-verification"
      heading={`C&G 2391-50 Mock Exam — Initial Verification`}
      intro={`Free City & Guilds 2391-50 Initial Verification mock exam. 30 questions drawn from a ${initialVerificationBank.length}-question bank covering initial verification to BS 7671: the full GN3 test sequence, safe isolation, continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing, and certification with the Electrical Installation Certificate. Sitting the periodic unit instead? Use our 2391-51 mock exam — or the combined 2391 exam for the full 2391-52 syllabus.`}
      // Initial verification only. The default first-three are periodic/EICR
      // questions, which were being shown on this page before.
      sampleQuestionIds={[17, 11, 267]}
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
