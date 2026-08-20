/**
 * L3InspectionTestingMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module5/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module5Questions } from '@/data/apprentice-courses/level3/module5/questionBank';

export default function L3InspectionTestingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Level 3 Inspection & Testing Mock Exam (2365-03)`}
      description={`Free C&G 2365-03 Level 3 Inspection & Testing mock exam (Unit 5). 25 Qs from a 201-Q bank. GN3 sequence, EICR coding, RCD testing. No sign-up.`}
      slug="level-3-inspection-testing"
      heading={`Level 3 Inspection, Testing & Commissioning Mock Exam`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Inspection, Testing and Commissioning. 25 questions from a 201-question bank covering the BS 7671 testing sequence per GN3, initial verification, periodic inspection (EICR), RCD test methods, MFT use, polarity, continuity, insulation resistance and the certification process.`}
      questionBank={
        module5Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="Level 3 Inspection & Testing"
    />
  );
}
