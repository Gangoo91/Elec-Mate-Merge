/**
 * L2CommsCareerMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/apprentice-courses/level2/module5/questionBank
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { module5QuestionBank as module5Questions } from '@/data/apprentice-courses/level2/module5/questionBank';

export default function L2CommsCareerMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Level 2 Comms & Career Mock Exam (2365-02)`}
      description={`Free C&G 2365-02 Level 2 Comms & Career mock exam with answers. 25 Qs from a 301-Q bank. Site roles, customer care, CPD, ECS Gold Card.`}
      slug="level-2-communications-career"
      heading={`Level 2 Communications & Career Development Mock Exam`}
      intro={`Free mock exam for Level 2 Electrical apprentices on Unit 205 (Communication and Career Development). 25 questions from a 301-question bank covering site management team structure, communication skills, customer relations, professional bodies (NICEIC, NAPIT, JIB), CPD and the route to ECS Gold Card.`}
      questionBank={
        module5Questions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="Level 2 Comms & Career"
    />
  );
}
