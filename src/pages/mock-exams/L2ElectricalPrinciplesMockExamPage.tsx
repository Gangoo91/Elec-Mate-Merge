/**
 * L2ElectricalPrinciplesMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level2/module2/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module2QuestionBank as module2Questions } from '@/data/apprentice-courses/level2/module2/questionBank';

export default function L2ElectricalPrinciplesMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 2 Mock Exam: Electrical Principles (Unit 2)`}
      description={`Free Level 2 Electrical Principles mock exam — 25 Qs from 301-Q bank. AC/DC theory, Ohm’s Law, power, magnetism, three-phase, capacitance, transformers.`}
      slug="level-2-electrical-principles"
      heading={`Level 2 Electrical Principles Mock Exam`}
      intro={`Free mock exam for Level 2 Electrical apprentices on Unit 202 (Electrical Principles). 25 questions from a 301-question bank covering AC and DC theory, Ohm’s Law and power, magnetism and induction, three-phase systems, capacitance and inductance, transformer principles and the SI unit system.`}
      questionBank={
        module2Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 2 Electrical Principles"
    />
  );
}
