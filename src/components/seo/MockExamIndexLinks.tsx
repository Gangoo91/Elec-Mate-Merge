/**
 * MockExamIndexLinks — the full list of mock exams, for pages that talk about
 * mock exams without being one.
 *
 * WHY THIS EXISTS
 * Three pages were competing for "mock exams for electricians": /mock-exams and
 * two guides. The guides ranked for the query (one at position 39 for "18th
 * edition mock exam") while linking to only one to three of the 38 exams. They
 * were splitting the signal with the pages that actually convert, and offering
 * a reader who wanted a mock exam almost no way to reach one.
 *
 * Exam-intent is the one format on this site that earns a normal click-through
 * from search — 0.91x expected at position 1-3, where definitional pages get
 * 0.02x. So consolidating onto the exam URLs is worth more here than anywhere
 * else on the site.
 *
 * Rendered from `mockExamIndex`, so a new exam appears everywhere at once.
 */
import { Link } from 'react-router-dom';
import { ELECTRICAL_EXAMS, LEVEL_3, LEVEL_2, TRADE_CERTS } from '@/data/seo/mockExamIndex';

const GROUPS = [
  { heading: 'Qualification exams', exams: ELECTRICAL_EXAMS },
  { heading: 'Level 3 units', exams: LEVEL_3 },
  { heading: 'Level 2 units', exams: LEVEL_2 },
  { heading: 'Site safety cards', exams: TRADE_CERTS },
];

/**
 * Anchor text for an exam link.
 *
 * The card titles were written for the hub grid, where the page heading already
 * says "mock exams", so they read "18th Edition BS 7671 (A4:2026)". Measured
 * 2026-08-07: NONE of the 38 contains the phrase "mock exam" — while "mock
 * exam" queries are 7,786 impressions at an average position of 7.1, our
 * largest exam-intent cluster and the one closest to breaking into the top 5.
 * Every internal link pointing at those pages was describing them without the
 * words people search for.
 *
 * Appended rather than baked into the data so the hub grid stays clean — there,
 * 38 cards each ending "Mock Exam" under a "Mock Exams" heading reads as
 * keyword stuffing rather than as navigation.
 */
function linkText(title: string): string {
  if (/mock (exam|test)/i.test(title)) return title;
  // A title already ending in Test/Exam/Assessment would read "…Knowledge Test
  // Mock Exam". Insert the word instead of appending it.
  const tail = title.match(/\s(Test|Exam|Assessment)$/i);
  if (tail) return title.replace(/\s(Test|Exam|Assessment)$/i, ` Mock${tail[0]}`);
  return `${title} Mock Exam`;
}

interface MockExamIndexLinksProps {
  /** Optional heading override — omit for the default. */
  heading?: string;
}

export const MockExamIndexLinks = ({
  heading = 'Every mock exam on Elec-Mate',
}: MockExamIndexLinksProps) => (
  <section aria-labelledby="mock-exam-index-heading" className="mt-12">
    <h2
      id="mock-exam-index-heading"
      className="text-[19px] font-bold tracking-tight text-white sm:text-[22px]"
    >
      {heading}
    </h2>
    <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-white">
      All free, no sign-up, 30 questions each with a worked explanation on every answer. Retake as
      many times as you like.
    </p>

    <div className="mt-6 space-y-7">
      {GROUPS.map((group) => (
        <div key={group.heading}>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            {group.heading}
          </h3>
          <ul className="mt-3 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
            {group.exams.map((exam) => (
              <li key={exam.slug}>
                <Link
                  to={`/mock-exams/${exam.slug}`}
                  className="inline-block touch-manipulation py-1.5 text-[14px] text-white transition-colors hover:text-elec-yellow"
                >
                  {linkText(exam.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
