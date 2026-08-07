/**
 * RelatedMockExamCta — "you've read the theory, now sit the paper".
 *
 * Rendered by PublicPageLayout for any route present in GUIDE_TO_MOCK_EXAM,
 * so a guide gains its exam link without its page component being touched.
 * Routes with no honest pairing render nothing at all.
 *
 * WHY IT LOOKS LIKE THIS
 * It is a quiet band above the footer, not a coloured promo card. The guides
 * it sits under are reference material people arrive at mid-job from a search
 * result; an interruption styled like an advert gets scrolled past, and the
 * design rules here rule out the gradient-card treatment anyway. The offer
 * does the work: free, no sign-up, and it names what the exam covers.
 */
import { Link } from 'react-router-dom';

interface RelatedMockExamCtaProps {
  examSlug: string;
  examName: string;
  /** Completes "…so you can {reason}". */
  reason: string;
}

export const RelatedMockExamCta = ({ examSlug, examName, reason }: RelatedMockExamCtaProps) => (
  <aside
    aria-labelledby="related-mock-exam-heading"
    className="border-t border-white/[0.12] bg-white/[0.02]"
  >
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow">
        Test yourself
      </p>
      <h2
        id="related-mock-exam-heading"
        className="mt-3 max-w-[26ch] text-[22px] font-bold leading-tight tracking-[-0.01em] text-white sm:text-[26px]"
      >
        {examName} mock exam
      </h2>
      <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-white">
        30 questions with a worked explanation on every one, so you can {reason}. Free, no sign-up,
        and you can retake it as many times as you like.
      </p>
      <Link
        to={`/mock-exams/${examSlug}`}
        className="mt-6 inline-flex h-11 touch-manipulation items-center rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95"
      >
        Start the {examName} mock exam
      </Link>
    </div>
  </aside>
);
