/**
 * BMSMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/bmsMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { bmsStandardQuestionBank } from '@/data/upskilling/bmsMockExamData';

export default function BMSMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free BMS Mock Exam 2026 — Building Management Systems`}
      description={`Free BMS mock exam — 25 questions, 30-min timer, 245-question bank. Building management fundamentals, HVAC integration, protocols and commissioning.`}
      slug="bms"
      heading={`Building Management Systems (BMS) Mock Exam`}
      intro={`Free building management systems mock exam. 25 questions from a 245-question bank covering BMS fundamentals, hardware and field wiring, HVAC integration including air handling units, fan coil units and chiller sequencing, lighting and access control, communication protocols, dashboards and analytics, and commissioning and handover.`}
      questionBank={
        bmsStandardQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="BMS"
    />
  );
}
