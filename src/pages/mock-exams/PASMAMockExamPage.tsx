/**
 * PASMAMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/general-upskilling/pasmaMockExamData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { pasmaQuestionBank } from '@/data/general-upskilling/pasmaMockExamData';

export default function PASMAMockExamPage() {
  return (
    <PublicMockExamPage
      title={`PASMA Mock Test 2026: Free Tower Scaffolding Quiz`}
      description={`Free PASMA Towers for Users mock test: 25 questions, 200-Q bank. Aluminium tower assembly, bracing, guardrails, max heights, dismantling sequence.`}
      slug="pasma"
      heading={`PASMA Mock Test — Towers for Users`}
      intro={`Free PASMA Towers for Users mock test for UK electricians and site workers. 25 questions from a 200-question bank covering the Code of Practice for the Safe Use of Mobile Access Towers: tower components, bracing, stabilisers, working platform heights, ladder access, dismantling sequence and Working at Height Regulations 2005.`}
      questionBank={
        pasmaQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={25}
      timeLimitMinutes={30}
      passThreshold={70}
      breadcrumbLabel="PASMA"
    />
  );
}
