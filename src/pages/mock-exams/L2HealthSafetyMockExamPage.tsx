/**
 * L2HealthSafetyMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level2/module1/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module1Questions } from '@/data/apprentice-courses/level2/module1/questionBank';

export default function L2HealthSafetyMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Level 2 Mock Exam: Health & Safety (Unit 1)`}
      description={`Free Level 2 Electrical mock exam — Health & Safety in Building Services Engineering. 25 questions, 30-min timer, 301-Q bank. HASAWA, RIDDOR, COSHH, EAWR.`}
      slug="level-2-electrical-health-safety"
      heading={`Level 2 Electrical: Health & Safety Mock Exam`}
      intro={`Free mock exam for Level 2 Electrical apprentices on Unit 201 (Health and Safety in Building Services Engineering). 25 questions from a 301-question bank covering HASAWA 1974, EAWR 1989, RIDDOR, COSHH 2002, manual handling, CDM 2015, fire safety, PPE and asbestos awareness.`}
      questionBank={
        module1Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Level 2 Health & Safety"
    />
  );
}
