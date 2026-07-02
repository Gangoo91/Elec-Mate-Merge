/**
 * PATTestingMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/patTestingMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { patTestingQuestionBank } from '@/data/upskilling/patTestingMockExamData';

export default function PATTestingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free PAT Testing Mock Exam 2026 (C&G 2377 Practice)`}
      description={`Free PAT testing mock exam — 25 questions, 30-minute timer, 120-question bank. In-service inspection and testing, equipment classes, EAWR 1989 duties.`}
      slug="pat-testing"
      heading={`PAT Testing Mock Exam (C&G 2377)`}
      intro={`Free PAT testing mock exam for anyone preparing for the City & Guilds 2377 In-Service Inspection and Testing of Electrical Equipment qualification. 25 questions drawn from a 120-question bank covering the Electricity at Work Regulations 1989 and duty holder responsibilities, Class I and Class II equipment classification, formal visual inspection, testing procedures and intervals for different environments, and documentation and record keeping. Every question comes with a worked explanation.`}
      questionBank={
        patTestingQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="PAT Testing"
    />
  );
}
