/**
 * CSCSCardMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/cscsCardMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { cscsCardQuestionBank } from '@/data/general-upskilling/cscsCardMockExamData';

export default function CSCSCardMockExamPage() {
  return (
    <PublicMockExamPage
      title={`CSCS Card Mock Test 2026: Free Practice Exam`}
      description={`Free CSCS mock test for UK construction workers: 25 H&S questions, 30-min timer, 70% pass. From a 200-question bank covering CSCS HS&E test topics.`}
      slug="cscs-card"
      heading={`CSCS Card Mock Test — Free Practice`}
      intro={`Free CSCS card mock test for UK construction and electrical site workers. 25 questions pulled at random from a 200-question bank covering the CITB HS&E test syllabus: general responsibilities, accident reporting, manual handling, working at height, COSHH, fire, electricity, plant and equipment.`}
      questionBank={
        cscsCardQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="CSCS Card"
    />
  );
}
