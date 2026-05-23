/**
 * L3EnvironmentalTechMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module2/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module2Questions } from '@/data/apprentice-courses/level3/module2/questionBank';

export default function L3EnvironmentalTechMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 3 Mock Exam: Environmental Tech (Unit 2)`}
      description={`Free Level 3 Environmental Technologies mock — 25 Qs from 251-Q bank. Solar PV, wind, heat pumps, energy efficiency, MCS, BS 7671 Section 712 + 722.`}
      slug="level-3-environmental-technologies"
      heading={`Free Level 3 Mock Exam: Environmental Tech (Unit 2)`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Environmental Technologies. 25 questions from a 251-question bank covering solar photovoltaic systems (BS 7671 Section 712), heat pumps, wind generation, EV charging (Section 722), energy efficiency principles, the MCS scheme and grid connection requirements.`}
      questionBank={
        module2Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 3 Environmental Tech"
    />
  );
}
