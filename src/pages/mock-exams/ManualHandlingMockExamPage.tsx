/**
 * ManualHandlingMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/manualHandlingMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { manualHandlingQuestionBank } from '@/data/general-upskilling/manualHandlingMockExamData';

export default function ManualHandlingMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Manual Handling Mock Test 2026: Free UK Practice`}
      description={`Free Manual Handling mock test (MHOR 1992): 25 questions, 200-Q bank. TILE assessment, load weights, lifting technique, MAC tool. 30-min timer.`}
      slug="manual-handling"
      heading={`Manual Handling Mock Test — Free Practice`}
      intro={`Free Manual Handling Operations Regulations 1992 mock test. 25 questions from a 200-question bank covering TILE (Task, Individual, Load, Environment) risk assessment, the MAC tool, individual capability factors, team lifts, mechanical aids and the legal duty to avoid hazardous manual handling where reasonably practicable.`}
      questionBank={
        manualHandlingQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Manual Handling"
    />
  );
}
