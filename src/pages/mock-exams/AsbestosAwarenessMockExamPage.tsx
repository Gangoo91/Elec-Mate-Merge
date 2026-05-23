/**
 * AsbestosAwarenessMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/asbestosMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { asbestosQuestionBank } from '@/data/general-upskilling/asbestosMockExamData';

export default function AsbestosAwarenessMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Asbestos Awareness Mock Test 2026: Free UK Exam`}
      description={`Free Asbestos Awareness mock test (UKATA/IATP): 25 questions from a 200-Q bank. ACMs, CAR 2012, duty to manage, what to do if found. 30-min timer.`}
      slug="asbestos-awareness"
      heading={`Asbestos Awareness Mock Test — Category A`}
      intro={`Free Asbestos Awareness Category A mock test aligned to UKATA and IATP syllabuses. 25 questions from a 200-question bank covering asbestos-containing materials (ACMs), the Control of Asbestos Regulations 2012, duty to manage, recognising asbestos in buildings, exposure limits and emergency procedures if ACMs are disturbed.`}
      questionBank={
        asbestosQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="Asbestos Awareness"
    />
  );
}
