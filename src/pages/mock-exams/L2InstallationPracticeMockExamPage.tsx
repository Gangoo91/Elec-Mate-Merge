/**
 * L2InstallationPracticeMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level2/module4/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module4QuestionBank as module4Questions } from '@/data/apprentice-courses/level2/module4/questionBank';

export default function L2InstallationPracticeMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 2 Mock Exam: Installation Practice (Unit 4)`}
      description={`Free Level 2 Installation Practice mock exam — 25 Qs from 301-Q bank. Risk assessment, safe isolation, installation method statements, tools and PPE.`}
      slug="level-2-installation-practice"
      heading={`Free Level 2 Mock Exam: Installation Practice (Unit 4)`}
      intro={`Free mock exam for Level 2 Electrical apprentices on Unit 204 (Electrical Installation Practices). 25 questions from a 301-question bank covering risk assessment, safe isolation procedure, tool selection, PPE, working in occupied premises, installation method statements and good site practice.`}
      questionBank={
        module4Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 2 Installation Practice"
    />
  );
}
