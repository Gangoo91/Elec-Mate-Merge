/**
 * EVChargingMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/evChargingMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { evChargingQuestionBank } from '@/data/upskilling/evChargingMockExamData';

export default function EVChargingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free EV Charging Mock Exam 2026 (C&G 2921 Practice)`}
      description={`Free EV charging installation mock exam — 25 questions, 30-min timer, 150-question bank. Connectors, earthing and protection, smart charging, testing.`}
      slug="ev-charging"
      heading={`EV Charging Installation Mock Exam`}
      intro={`Free EV charging mock exam — ideal practice for EV charger installation qualifications like C&G 2921-31. 25 questions from a 150-question bank covering charge point types and connectors (Type 2 AC and rapid DC), electrical design of domestic 7kW installations, earthing and protection including protective conductor monitoring, smart charging and back-office communication protocols, plus testing and compliance with BS 7671.`}
      questionBank={
        evChargingQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="EV Charging"
    />
  );
}
