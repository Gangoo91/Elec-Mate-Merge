/**
 * WorkingAtHeightMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/workingAtHeightMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { workingAtHeightQuestionBank } from '@/data/general-upskilling/workingAtHeightMockExamData';

export default function WorkingAtHeightMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Working at Height Mock Test 2026: Free UK Exam`}
      description={`Free Working at Height mock test (WAHR 2005): 25 questions, 200-Q bank. Hierarchy of control, ladder use, fragile surfaces, fall arrest vs fall restraint.`}
      slug="working-at-height"
      heading={`Working at Height Mock Test — Free Practice`}
      intro={`Free Working at Height Regulations 2005 mock test for UK site workers, electricians and supervisors. 25 questions from a 200-question bank covering the hierarchy of control (avoid, prevent, mitigate), ladder safety, fragile surfaces, edge protection, MEWP selection, fall arrest vs fall restraint and rescue planning.`}
      questionBank={
        workingAtHeightQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Working at Height"
    />
  );
}
