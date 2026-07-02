/**
 * DataCablingMockExamPage — public mock exam page.
 * Source bank: @/data/upskilling/dataCablingMockExamData
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { dataCablingQuestionBank } from '@/data/upskilling/dataCablingMockExamData';

export default function DataCablingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free Data Cabling Mock Exam 2026 — Network Cabling`}
      description={`Free data cabling mock exam — 25 questions, 30-min timer, 150-question bank. Structured cabling, cable types, terminations, testing, PoE and standards.`}
      slug="data-cabling"
      heading={`Data Cabling Mock Exam`}
      intro={`Free data cabling mock exam for electricians moving into network infrastructure. 25 questions from a 150-question bank covering structured cabling fundamentals, twisted pair cable types and specifications, patch panels and terminations, installation techniques and cable support, testing and certification, Power over Ethernet, and industry standards such as TIA-568.`}
      questionBank={
        dataCablingQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Data Cabling"
    />
  );
}
