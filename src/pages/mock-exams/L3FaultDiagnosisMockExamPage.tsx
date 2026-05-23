/**
 * L3FaultDiagnosisMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module4/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module4Questions } from '@/data/apprentice-courses/level3/module4/questionBank';

export default function L3FaultDiagnosisMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 3 Mock Exam: Fault Diagnosis (Unit 4)`}
      description={`Free Level 3 Fault Diagnosis mock exam — 25 Qs from 251-Q bank. Logical fault-finding, MFT use, dead vs live testing, common fault types, EICR coding.`}
      slug="level-3-fault-diagnosis"
      heading={`Level 3 Fault Diagnosis Mock Exam`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Fault Diagnosis. 25 questions from a 251-question bank covering the logical fault-finding sequence, dead vs live testing, multifunction tester use, common fault types (high Zs, low IR, RCD nuisance tripping, broken neutral) and how each maps to EICR observation codes.`}
      questionBank={
        module4Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 3 Fault Diagnosis"
    />
  );
}
