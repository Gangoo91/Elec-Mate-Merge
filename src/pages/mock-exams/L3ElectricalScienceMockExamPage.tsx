/**
 * L3ElectricalScienceMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module3/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module3Questions } from '@/data/apprentice-courses/level3/module3/questionBank';

export default function L3ElectricalScienceMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 3 Mock Exam: Electrical Science (Unit 3)`}
      description={`Free Level 3 Electrical Science mock — 25 Qs from 251-Q bank. Three-phase, motors, transformers, voltage drop, Zs, prospective fault current, RLC.`}
      slug="level-3-electrical-science"
      heading={`Level 3 Electrical Science Mock Exam`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Electrical Science. 25 questions from a 251-question bank covering three-phase systems, motor and transformer theory, voltage drop calculations, earth fault loop impedance, prospective fault current, power factor and RLC circuit analysis.`}
      questionBank={
        module3Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 3 Electrical Science"
    />
  );
}
