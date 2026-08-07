/**
 * RevisionPlan — "revise topic by topic", built from the mock exam topic registry.
 *
 * WHY THIS EXISTS
 * "Revision" queries were the one intent where demand existed and we were
 * genuinely absent — 203 impressions over 90 days at an average position of 20,
 * earning 2 clicks. The obvious move was to write revision pages. The data said
 * otherwise: "2391 revision" already had FIVE of our pages competing for it
 * (positions 11.2 / 29.3 / 36.5 / 43.1 / 62.3) and earning nothing between them.
 * A sixth page would have split the signal further.
 *
 * The real defect was that the two pages ranking best for revision queries —
 * /training/city-guilds-2391 and /apprentice-first-year-revision — linked to
 * ZERO mock exams. Someone searching "2391 revision" landed on a page that
 * offered them no practice, while the site had a 2391 exam broken into eight
 * topics.
 *
 * So this is not a new page. It gives the pages that already rank the thing the
 * searcher actually wanted, and points at the topic landings, which is the one
 * format that earns a normal click-through from search.
 */
import { Link } from 'react-router-dom';
import { getTopicsForExam } from '@/components/seo/mockExamTopicRegistry';

interface RevisionPlanProps {
  /** Exam slugs to build a plan from, most relevant first. */
  examSlugs: string[];
  /** Names shown per slug — keyed to match, so copy reads naturally. */
  examNames: Record<string, string>;
  heading?: string;
  /** What the reader is revising for, e.g. "the 2391". Completes a sentence. */
  subject: string;
}

export const RevisionPlan = ({ examSlugs, examNames, heading, subject }: RevisionPlanProps) => {
  const plans = examSlugs
    .map((slug) => ({ slug, name: examNames[slug] ?? slug, topics: getTopicsForExam(slug) }))
    .filter((p) => p.topics.length > 0);

  if (!plans.length) return null;

  return (
    <section aria-labelledby="revision-plan-heading" className="mt-12">
      <h2
        id="revision-plan-heading"
        className="text-[19px] font-bold tracking-tight text-white sm:text-[22px]"
      >
        {heading ?? `How to revise for ${subject}`}
      </h2>
      <p className="mt-2 max-w-[64ch] text-[14.5px] leading-relaxed text-white">
        Sit the full mock once to find out where you actually stand, then drill the topics you got
        wrong rather than re-reading everything. Each topic below is its own timed exam drawn from
        the same bank, with a worked explanation on every answer. All free, no sign-up.
      </p>

      <div className="mt-6 space-y-8">
        {plans.map((plan) => (
          <div key={plan.slug}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-[15px] font-semibold text-white">{plan.name}</h3>
              <Link
                to={`/mock-exams/${plan.slug}`}
                className="touch-manipulation text-[13.5px] font-semibold text-elec-yellow hover:brightness-110"
              >
                Start the full mock exam
              </Link>
            </div>
            <p className="mt-1 text-[13px] text-white">
              {plan.topics.length} topics · {plan.topics.reduce((n, t) => n + t.qCount, 0)} questions
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
              {plan.topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    to={`/mock-exams/${plan.slug}/${topic.slug}`}
                    className="inline-flex touch-manipulation items-baseline gap-2 py-1.5 text-[14px] text-white transition-colors hover:text-elec-yellow"
                  >
                    <span>{topic.category}</span>
                    <span className="text-[12px] tabular-nums text-white">{topic.qCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
