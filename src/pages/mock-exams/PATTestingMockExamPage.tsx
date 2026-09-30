/**
 * PATTestingMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/patTestingMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { patTestingQuestionBank } from '@/data/upskilling/patTestingMockExamData';

export default function PATTestingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`PAT Testing Mock Exam: Free C&G 2377 Practice`}
      description={`Free PAT testing mock exam with answers: 30 questions per attempt from a 170-question bank, 35-minute timer. Equipment classes, inspection, testing, EAWR 1989.`}
      slug="pat-testing"
      heading={`PAT Testing Mock Exam (C&G 2377)`}
      intro={`Free PAT testing mock exam for anyone preparing for the City & Guilds 2377 In-Service Inspection and Testing of Electrical Equipment qualification. 30 questions drawn from a 170-question bank covering the Electricity at Work Regulations 1989 and duty holder responsibilities, Class I and Class II equipment classification, formal visual inspection, testing procedures and intervals for different environments, and documentation and record keeping. Every question comes with a worked explanation.`}
      questionBank={
        patTestingQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="PAT Testing"
    />
  );
}
