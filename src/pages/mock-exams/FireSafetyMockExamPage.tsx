/**
 * FireSafetyMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/fireSafetyMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { fireSafetyQuestionBank } from '@/data/general-upskilling/fireSafetyMockExamData';

export default function FireSafetyMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Fire Safety Mock Test 2026: Free UK Awareness Exam`}
      description={`Free Fire Safety Awareness mock test (RRO 2005): 25 questions from a 200-Q bank. Classes A-F, extinguishers, alarm systems, evacuation, fire warden role.`}
      slug="fire-safety"
      heading={`Fire Safety Awareness Mock Test`}
      intro={`Free Fire Safety Awareness mock test aligned to the Regulatory Reform (Fire Safety) Order 2005 and BS 9999. 25 questions from a 200-question bank covering the fire triangle, fire classes A through F, extinguisher selection, fire alarm system categories, evacuation procedures, fire warden duties and the Responsible Person role.`}
      questionBank={
        fireSafetyQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Fire Safety"
    />
  );
}
