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
      title={`First Aid Mock Test UK: Free 2026 Questions`}
      description={`Free first aid mock test with answers: 30 questions per attempt from a 250-question bank. CPR, AED, choking, bleeding, burns, shock. Instant marking, no sign-up.`}
      slug="first-aid"
      heading={`First Aid at Work — Free Mock Exam`}
      intro={`Practise the First Aid at Work assessment with 30 questions pulled at random from a 250-question bank. Covers CPR ratios, choking, severe bleeding, shock, secondary survey and resuscitation. Used by UK electricians, site supervisors and apprentices preparing for HSE-recognised first aid certification.`}
      questionBank={
        firstAidQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="First Aid at Work"
    />
  );
}
