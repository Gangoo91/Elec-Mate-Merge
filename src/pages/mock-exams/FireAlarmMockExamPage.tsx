/**
 * FireAlarmMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/fireAlarmMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { fireAlarmQuestionBank } from '@/data/upskilling/fireAlarmMockExamData';

export default function FireAlarmMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Fire Alarm Mock Exam 2026 (BS 5839-1 Practice)`}
      description={`Free BS 5839-1 fire alarm mock exam — 25 questions, 30-min timer, 150-question bank. System categories L1-L5 and P1/P2, detectors, zoning, testing.`}
      slug="fire-alarm"
      heading={`Fire Alarm Systems Mock Exam (BS 5839-1)`}
      intro={`Free fire alarm systems mock exam aligned with BS 5839-1 practice. 25 questions from a 150-question bank covering system categories (L1 to L5 and P1/P2), detector and device selection, zoning and design, power supplies and cabling, installation, testing and maintenance, and compliance topics such as Approved Document B and designer responsibilities.`}
      questionBank={
        fireAlarmQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Fire Alarm"
    />
  );
}
