/**
 * EighteenthEditionMockExamPage — public mock exam page (hand-maintained;
 * the /tmp generator that produced the first cut is gone).
 * Source bank: @/data/upskilling/mockExamQuizData
 *
 * This is the site's highest-demand exam cluster (~1,300 impressions/28d on
 * "18th edition mock exam/test/questions/simulator") sitting at position ~7 —
 * the intro and extraFaqs deliberately cover those variant phrasings, and the
 * real-exam facts in the FAQs are grounded in CityGuilds2382ExamGuidePage
 * (60 Qs, 2 hours, open book, 60% pass mark). Keep the two in step.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { mockExamQuestions } from '@/data/upskilling/mockExamQuizData';

export default function EighteenthEditionMockExamPage() {
  return (
    <PublicMockExamPage
      title={`18th Edition Mock Exam: Free (Amendment 4:2026)`}
      description={`Free 18th Edition mock exam with answers. 30 questions from a 300-question bank, 60-min timer, updated for BS 7671 Amendment 4:2026. No sign-up.`}
      slug="18th-edition-bs-7671"
      heading={`18th Edition Mock Exam (BS 7671:2018+A4:2026)`}
      intro={`Free 18th Edition mock exam covering BS 7671:2018 Amendment 4 (2026) — a timed practice exam with a worked answer on every question. 30 questions pulled from a 300-question bank: Chapter 41 protection against electric shock, RCD selection (Type AC restriction post-A4), AFDD recommendations under Reg 421.1.7, Section 722 EV charging, supplementary bonding, Section 701 special locations, inspection and testing. Retake it as often as you like — every attempt draws a fresh mock test from the bank, so it works as an exam simulator for the real open-book paper.`}
      extraFaqs={[
        {
          q: 'Is this mock exam like the real C&G 2382 18th Edition exam?',
          a: 'The real 2382 exam is 60 multiple-choice questions in 2 hours, open book (you can take a tabbed copy of BS 7671 and the On-Site Guide in), with a 60% pass mark and no negative marking. This mock uses the same multiple-choice format and regulation coverage in a shorter 30-question, 60-minute sitting — the per-question time pressure is deliberately similar, so treat it as timed practice for the paper.',
        },
        {
          q: 'Does this mock exam cover Amendment 4 (A4:2026)?',
          a: 'Yes. The question bank is written against BS 7671:2018+A4:2026, including the changes Amendment 4 made: AFDD recommendations under Regulation 421.1.7, the Type AC RCD restriction, and Section 722 EV charging requirements.',
        },
        {
          q: 'Can I practise specific 18th Edition topics instead of a full paper?',
          a: 'Yes — below the exam there are topic-by-topic practice pages drawn from the same bank, so you can drill just Chapter 41, special locations, or inspection and testing before sitting a full timed mock.',
        },
        {
          q: 'Should I use the book during this mock exam?',
          a: 'Practise the way you will sit the paper: the real 2382 is open book, and finding a regulation quickly matters as much as knowing it. Using a tabbed copy of BS 7671 under the timer is exactly the skill the exam tests — if a lookup takes you more than two minutes, tab that chapter.',
        },
      ]}
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
