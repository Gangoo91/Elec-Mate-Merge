/**
 * EighteenthEditionMockExamPage — auto-generated public mock exam page.
 * Source bank: @/data/upskilling/mockExamQuizData
 * Edit content in /tmp/gen_mock_pages.py and regenerate, not here.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { mockExamQuestions } from '@/data/upskilling/mockExamQuizData';

export default function EighteenthEditionMockExamPage() {
  return (
    <PublicMockExamPage
      title={`18th Edition Mock Exam 2026 with Answers — Free (Amendment 4)`}
      description={`Free 18th Edition mock exam with answers explained. 30 questions from a 300-question bank, 60-min timer, fully updated for BS 7671 Amendment 4 (A4:2026). Chapter 41 shock protection, RCD types, Section 722 EV charging, AFDDs. Instant score, weak-topic breakdown, no sign-up.`}
      slug="18th-edition-bs-7671"
      heading={`18th Edition Mock Exam (BS 7671:2018+A4:2026)`}
      intro={`Free 18th Edition mock exam covering BS 7671:2018 Amendment 4 (2026). 30 questions pulled from a 300-question bank: Chapter 41 protection against electric shock, RCD selection (Type AC restriction post-A4), AFDD recommendations under Reg 421.1.7, Section 722 EV charging, supplementary bonding, Section 701 special locations, inspection and testing.`}
      questionBank={
        mockExamQuestions as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={60}
      passThreshold={70}
      breadcrumbLabel="18th Edition"
    />
  );
}
