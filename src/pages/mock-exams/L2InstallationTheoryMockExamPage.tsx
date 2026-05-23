/**
 * L2InstallationTheoryMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level2/module3/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module3QuestionBank as module3Questions } from '@/data/apprentice-courses/level2/module3/questionBank';

export default function L2InstallationTheoryMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 2 Mock Exam: Installation Theory (Unit 3)`}
      description={`Free Level 2 Installation Theory mock exam — 25 Qs, 301-Q bank. Cable types (T&E, SWA, MICC), conduit, trunking, accessories, BS 7671 selection.`}
      slug="level-2-installation-theory"
      heading={`Free Level 2 Mock Exam: Installation Theory (Unit 3)`}
      intro={`Free mock exam for Level 2 Electrical apprentices on Unit 203 (Electrical Installation Theory). 25 questions from a 301-question bank covering cable types (twin and earth, SWA, MICC), conduit and trunking systems, accessories, joints and terminations, and BS 7671 cable selection principles.`}
      questionBank={
        module3Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 2 Installation Theory"
    />
  );
}
