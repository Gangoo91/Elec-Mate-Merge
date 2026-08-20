/**
 * L3CareerDevelopmentMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level3/module7/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module7Questions } from '@/data/apprentice-courses/level3/module7/questionBank';

export default function L3CareerDevelopmentMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Level 3 Career Development Mock Exam (2365-03)`}
      description={`Free C&G 2365-03 Level 3 Career Development mock exam with answers. 25 Qs from a 201-Q bank. CPD, ECS Gold Card, JIB grades, registration.`}
      slug="level-3-career-development"
      heading={`Free Level 3 Mock Exam: Career Development (Unit 7)`}
      intro={`Free mock exam for Level 3 Electrical apprentices on Career Development. 25 questions from a 201-question bank covering continuing professional development (CPD), the ECS Gold Card route, NICEIC and NAPIT registration, JIB grades, supervisor and approved electrician progression, and routes into self-employment.`}
      questionBank={
        module7Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="Level 3 Career Development"
    />
  );
}
