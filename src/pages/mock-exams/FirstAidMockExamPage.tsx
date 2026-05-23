/**
 * FirstAidMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/firstAidMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { firstAidQuestionBank } from '@/data/general-upskilling/firstAidMockExamData';

export default function FirstAidMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free First Aid at Work Mock Test 2026`}
      description={`Free First Aid at Work mock exam: 25 questions from a 200-question bank. CPR, choking, bleeding, shock. Pass mark 70%. Instant feedback + explanations.`}
      slug="first-aid"
      heading={`First Aid at Work — Free Mock Exam`}
      intro={`Practise the First Aid at Work assessment with 25 questions pulled at random from a 200-question bank. Covers CPR ratios, choking, severe bleeding, shock, secondary survey and resuscitation. Used by UK electricians, site supervisors and apprentices preparing for HSE-recognised first aid certification.`}
      questionBank={
        firstAidQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="First Aid at Work"
    />
  );
}
