/**
 * IPAFMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/ipafMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { ipafQuestionBank } from '@/data/general-upskilling/ipafMockExamData';

export default function IPAFMockExamPage() {
  return (
    <PublicMockExamPage
      title={`IPAF Mock Test 2026: Free MEWP Theory Practice`}
      description={`Free IPAF mock test for MEWP operators: 25 questions from a 200-Q bank. Categories 1a/1b/3a/3b, daily checks, harnesses, exclusion zones. 30-min timer.`}
      slug="ipaf"
      heading={`IPAF Mock Test — Free MEWP Theory`}
      intro={`Free IPAF MEWP operator mock test covering categories 1a (static vertical), 1b (static boom), 3a (mobile vertical) and 3b (mobile boom). 25 questions from a 200-question bank — daily pre-use checks, ground conditions, harness and lanyard use, exclusion zones, emergency lowering.`}
      questionBank={
        ipafQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="IPAF"
    />
  );
}
