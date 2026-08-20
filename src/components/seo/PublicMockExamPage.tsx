/**
 * PublicMockExamPage — SEO wrapper around <SEOMockExam>.
 *
 * Each /mock-exams/<slug> page is a thin file that imports a question
 * bank and renders this wrapper. The shell handles useSEO injection,
 * the H1 + intro, the exam itself, and the conversion section.
 *
 * Design intent (2026-05-25 rewrite):
 *   - One H1 only (here). The exam component no longer adds nested
 *     headings.
 *   - Mobile-flat: edge-to-edge px-4; sm:+ desktop constraints.
 *   - Minimal visible chrome below the exam. FAQ becomes a 3-Q native
 *     `<details>` accordion (still indexable + emits FAQPage JSON-LD)
 *     and related exams compress to a single horizontal strip.
 *   - "Come to Elec-Mate" conversion sits AFTER results inside the exam
 *     component, so it only appears once the visitor has engaged.
 *   - Best-in-class SEO: LearningResource, Quiz, FAQPage, HowTo,
 *     BreadcrumbList JSON-LD; `dateModified` + `publisher` for E-A-T.
 */
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOMockExam, type SEOMockExamQuestion } from '@/components/seo/SEOMockExam';
import useSEO from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { getRelatedMockExams, MOCK_EXAM_CATALOG } from '@/components/seo/mockExamCatalog';
import { getTopicsForExam } from '@/components/seo/mockExamTopicRegistry';
import { SEOStickyMobileCTA } from '@/components/seo/SEOStickyMobileCTA';
import { PANEL, LABEL } from '@/components/seo/seoSurface';
import { useCallback, useMemo, useState } from 'react';

interface PublicMockExamPageProps {
  /** SEO <title> — appended with " | Elec-Mate" by useSEO. */
  title: string;
  /** SEO meta description (150-160 chars). */
  description: string;
  /** Slug part of the URL — used in canonical + signup-CTA query. */
  slug: string;
  /** Heading shown above the intro paragraph (matches title sans brand). */
  heading: string;
  /** Short intro paragraph displayed under the H1. */
  intro: string;
  /** Full question bank — must contain at least `questionsPerExam` entries. */
  questionBank: SEOMockExamQuestion[];
  /** Ids of the 3 crawlable sample questions — see SEOMockExam. */
  sampleQuestionIds?: Array<number | string>;
  questionsPerExam?: number;
  timeLimitMinutes?: number;
  passThreshold?: number;
  /** Override the draw's difficulty profile. Only set where the bank's tags have
   *  been validated against measured wrong-rates — see SEOMockExam. */
  difficultyMix?: Record<string, number>;
  /** Topic label shown in the breadcrumb above the H1. */
  breadcrumbLabel?: string;
  /** Exam-specific FAQs appended after the three evergreen ones — rendered
   *  visibly AND emitted in the FAQPage JSON-LD. Answers must state facts the
   *  page (or the linked guide) already carries; never invent exam formats. */
  extraFaqs?: Array<{ q: string; a: string }>;
}

// Last edit of this template — bumps date-modified on every page that
// uses it. Update when the schema or template structure changes.
const TEMPLATE_DATE_MODIFIED = '2026-08-05';

// Evergreen 3-Q FAQ — visible AND emitted as JSON-LD. Same 3 Qs across
// every page is fine because the schema's content reflects what's on
// the page. Tweak with the heading to keep answers contextual.
function buildFaq(heading: string): Array<{ q: string; a: string }> {
  const examShortName =
    heading.replace(/Free|Mock Exam|—.*$|\(.*$/g, '').trim() || 'this mock exam';
  return [
    {
      q: `Is the ${examShortName} mock exam free?`,
      a: 'Yes — 100% free, no sign-up needed. Questions are pulled at random from a substantial bank, with a worked explanation on every question after you submit.',
    },
    {
      q: 'Can I retake the mock exam?',
      a: 'Yes. Every attempt picks a different random selection and reshuffles the options, so each retake gives you genuinely new questions. No limit on retakes.',
    },
    {
      q: 'Does this count towards the real qualification?',
      a: 'No — this is independent practice material. To gain the actual qualification you need to sit the official assessment through an approved provider.',
    },
  ];
}

export function PublicMockExamPage({
  title,
  description,
  slug,
  heading,
  intro,
  questionBank,
  sampleQuestionIds,
  questionsPerExam = 25,
  difficultyMix,
  timeLimitMinutes = 30,
  passThreshold = 70,
  breadcrumbLabel = 'Mock exam',
  extraFaqs,
}: PublicMockExamPageProps) {
  const canonical = `https://www.elec-mate.com/mock-exams/${slug}`;

  // Sticky mobile CTA is held back until the exam is submitted — mid-exam it
  // would be pestering someone through the most valuable minutes on the site.
  // Stable identity so it doesn't re-create the exam's submit callback (and
  // with it the countdown timeout) on every parent render.
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examActive, setExamActive] = useState(false);
  const handleExamSubmitted = useCallback(() => {
    setExamSubmitted(true);
    setExamActive(false);
  }, []);
  // While the clock is running, everything below the exam is hidden. A timed
  // assessment should not share the page with a list of links out of it.
  const handleExamStarted = useCallback(() => {
    setExamActive(true);
    setExamSubmitted(false);
  }, []);
  const preStart = !examActive && !examSubmitted;

  // Topic pages get a 4-level breadcrumb (Home → Mock Exams → Exam →
  // Topic). The exam name comes from the catalog so we don't pass it
  // manually for every topic. Parent-exam pages stay 3-level.
  const slugParts = slug.split('/');
  const parentExamSlug = slugParts.length > 1 ? slugParts[0] : null;
  const parentExam = parentExamSlug
    ? MOCK_EXAM_CATALOG.find((e) => e.slug === parentExamSlug)
    : null;

  const faq = useMemo(() => [...buildFaq(heading), ...(extraFaqs ?? [])], [heading, extraFaqs]);
  const sampleQuestions = useMemo(
    () => questionBank.slice(0, Math.min(3, questionBank.length)),
    [questionBank]
  );

  // Topic landings — only render the strip on the parent exam page, not
  // on a topic page (slug contains a "/" for topic routes). Pass the bare
  // exam slug into the registry lookup.
  const isTopicPage = slug.includes('/');
  const baseExamSlug = isTopicPage ? slug.split('/')[0] : slug;
  const topics = useMemo(
    () => (isTopicPage ? [] : getTopicsForExam(baseExamSlug)),
    [isTopicPage, baseExamSlug]
  );

  // ----- JSON-LD: LearningResource + Quiz + FAQPage + HowTo --------
  // Single @graph keeps all schemas in one script tag (preferred by
  // search engines vs multiple tags) and lets them cross-reference via
  // @id. publisher points at the Organization in PublicPageLayout.
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        '@id': `${canonical}#learning-resource`,
        name: heading,
        description: intro,
        url: canonical,
        learningResourceType: 'Quiz',
        teaches: heading,
        educationalLevel: 'professional',
        timeRequired: `PT${timeLimitMinutes}M`,
        isAccessibleForFree: true,
        inLanguage: 'en-GB',
        dateModified: TEMPLATE_DATE_MODIFIED,
        publisher: { '@id': 'https://www.elec-mate.com/#organization' },
        about: { '@type': 'Thing', name: heading },
      },
      {
        '@type': 'Quiz',
        '@id': `${canonical}#quiz`,
        name: heading,
        about: intro,
        url: canonical,
        educationalAlignment: { '@type': 'AlignmentObject', alignmentType: 'assesses' },
        numberOfQuestions: questionsPerExam,
        timeRequired: `PT${timeLimitMinutes}M`,
        hasPart: sampleQuestions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          suggestedAnswer: q.options.map((opt, i) => ({
            '@type': 'Answer',
            text: opt,
            ...(i === q.correctAnswer ? { acceptedAnswer: true } : {}),
          })),
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.options[q.correctAnswer],
            ...(q.explanation ? { encodingFormat: 'text/plain', text: q.explanation } : {}),
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': `${canonical}#howto`,
        name: `How to take the ${heading}`,
        description: `Practice in 4 steps: read each question, pick an option, submit when ready, and review your weak topics.`,
        totalTime: `PT${timeLimitMinutes}M`,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Start the mock exam',
            text: `Tap Start to begin. ${questionsPerExam} random questions will be drawn from the bank.`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Answer at your pace',
            text: 'Select an option per question. You can go back to change answers before submitting.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Submit to see your score',
            text: `Submit when ready (or let the ${timeLimitMinutes}-minute timer run out). You need ${passThreshold}% to pass.`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Review weak topics',
            text: 'See a per-topic breakdown, weak-area callouts, and worked explanations on every question.',
          },
        ],
      },
    ],
  };

  // The @graph goes through useSEO, whose direct DOM injection demonstrably
  // renders. It previously went through a <Helmet><script> here, which never
  // reached the DOM on any mock-exam page (verified against production
  // 2026-08-20) — the Quiz/FAQPage/LearningResource markup was silently
  // missing site-wide. No <link rel="canonical"> here either: the static
  // prerender bakes one in and useSEO() maintains it, so a Helmet copy
  // rendered a SECOND canonical (Bing flagged 20 pages).
  useSEO({
    title,
    description,
    type: 'article',
    schema,
    breadcrumbs: parentExam
      ? [
          { name: 'Home', url: '/' },
          { name: 'Mock Exams', url: '/mock-exams' },
          { name: parentExam.title, url: `/mock-exams/${parentExamSlug}` },
          { name: breadcrumbLabel, url: `/mock-exams/${slug}` },
        ]
      : [
          { name: 'Home', url: '/' },
          { name: 'Mock Exams', url: '/mock-exams' },
          { name: breadcrumbLabel, url: `/mock-exams/${slug}` },
        ],
  });

  return (
    <PublicPageLayout>

      <article className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb back link — goes to parent exam on topic pages,
              hub otherwise. Single line; the JSON-LD breadcrumb above
              carries the full hierarchy for crawlers. */}
          <nav aria-label="Breadcrumb" className="mb-7 sm:mb-9">
            <Link
              to={parentExam ? `/mock-exams/${parentExamSlug}` : '/mock-exams'}
              className="inline-flex h-11 touch-manipulation items-center text-[13px] font-semibold text-elec-yellow"
            >
              {parentExam ? `Back to ${parentExam.title}` : 'All free mock exams'}
            </Link>
          </nav>

          {/* Header + exam sit side by side on desktop BEFORE the exam starts.
              Stacked, the header left a dead right-hand column on every wide
              screen and pushed the Start button below the fold. Once an
              attempt is running (or finished) the exam takes the full width —
              a question paper and a results breakdown both need it. */}
          <div
            className={
              preStart
                ? 'lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14'
                : ''
            }
          >
            <header className={preStart ? 'mb-11 sm:mb-12 lg:mb-0' : 'mb-11 max-w-3xl sm:mb-14'}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow">
                Free mock exam
              </p>
              <h1 className="mt-3 text-[32px] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[44px] lg:text-[52px]">
                {heading}
              </h1>
              <p className="mt-5 max-w-[58ch] text-[15.5px] leading-relaxed text-white sm:text-[17px]">
                {intro}
              </p>
            </header>

            {/* The exam — spec rows, CTA, sample Qs, active state, results */}
            <div className="min-w-0">
              <SEOMockExam
                examName={heading}
                questionBank={questionBank}
                sampleQuestionIds={sampleQuestionIds}
                questionsPerExam={questionsPerExam}
                timeLimitMinutes={timeLimitMinutes}
                passThreshold={passThreshold}
                difficultyMix={difficultyMix}
                signupCta={{
                  // Names what they get rather than what they start. These are
                  // logged-out strangers mid-revision — "Start Free Trial" asks
                  // them to begin a billing relationship; this asks them to open
                  // the thing they were already looking for.
                  label: 'Open the full Study Centre — £0 for 7 days',
                  href: `/auth/signup?ref=mock-exam-${slug.replace(/\//g, '-')}`,
                  subline: 'Cancel any time before day 8 and you are never charged.',
                }}
                onSubmitted={handleExamSubmitted}
                onStarted={handleExamStarted}
              />
            </div>
          </div>

          {/* Post-result sticky CTA — mobile only, 58% of our search clicks.
              appearAfterScroll 0 because by submit time the user is already
              deep in the page and we want it immediately. */}
          {examSubmitted && (
            <SEOStickyMobileCTA
              // Leads with the price, not the feature: this bar is what most
              // people actually see (mobile is 58% of search clicks) and it has
              // room for one idea. "£0" is the one that removes the objection.
              label="£0 for 7 days — full access"
              href={`/auth/signup?ref=mock-exam-${slug.replace(/\//g, '-')}`}
              appearAfterScroll={0}
              dismissKey="seo-sticky-cta-mock-exam-v1"
            />
          )}

          {/* Practice by topic — only on the parent exam page. Links to
              /mock-exams/<slug>/<topic-slug> drill-down landings. These
              are real indexable pages with topic-specific copy + a
              filtered bank, so they catch long-tail SERP queries like
              "AM2 safe isolation practice questions". */}
          {/* Page furniture — hidden while an attempt is in progress so the
              exam is the only thing on screen. Restored on submit. */}
          {!examActive && (
            <>
            {topics.length > 0 && (
              <nav aria-labelledby="topic-heading" className="mt-14">
                <h2 id="topic-heading" className={`${LABEL} mb-3 text-white`}>
                  Practice by topic
                </h2>
                <p className="mb-4 max-w-[60ch] text-[14px] leading-relaxed text-white">
                  Drill a single topic from this exam — same bank, filtered to one area.
                </p>
                <ul className={`${PANEL} divide-y divide-white/[0.08]`}>
                  {topics.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to={`/mock-exams/${baseExamSlug}/${t.slug}`}
                        className="flex min-h-[52px] touch-manipulation items-center justify-between gap-4 px-4 py-3 text-white transition-colors hover:bg-white/[0.04] sm:px-5"
                      >
                        <span className="text-[15px] font-medium">{t.category}</span>
                        <span className="shrink-0 text-[13px] tabular-nums text-white">
                          {t.qCount}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Compact FAQ — 3 Qs in a native accordion. Schema above
                already emits FAQPage so we get the rich-result eligibility
                without the page bloat. */}
            <section aria-labelledby="faq-heading" className="mt-14">
              <h2 id="faq-heading" className={`${LABEL} mb-3 text-white`}>
                Common questions
              </h2>
              <div className={`${PANEL} divide-y divide-white/[0.08]`}>
                {faq.map((f, i) => (
                  <details key={i} className="group">
                    <summary className="flex min-h-[52px] cursor-pointer list-none touch-manipulation items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
                      <span className="flex-1 text-[15px] font-medium leading-snug text-white">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="h-[7px] w-[7px] shrink-0 rotate-45 border-b border-r border-white transition-transform group-open:-rotate-[135deg]"
                      />
                    </summary>
                    <p className="max-w-[62ch] px-4 pb-4 text-[14px] leading-relaxed text-white sm:px-5">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related strip — internal linking without the section sprawl */}
            <nav aria-labelledby="related-heading" className="mt-14">
              <h2 id="related-heading" className={`${LABEL} mb-3 text-white`}>
                More free mock exams
              </h2>
              <ul className={`${PANEL} divide-y divide-white/[0.08]`}>
                {getRelatedMockExams(slug, 4).map((m) => (
                  <li key={m.slug}>
                    <Link
                      to={`/mock-exams/${m.slug}`}
                      className="flex min-h-[52px] touch-manipulation items-center px-4 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.04] sm:px-5"
                    >
                      {m.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/mock-exams"
                    className="flex min-h-[52px] touch-manipulation items-center px-4 py-3 text-[15px] font-semibold text-elec-yellow transition-colors hover:bg-white/[0.04] sm:px-5"
                  >
                    See every free mock exam
                  </Link>
                </li>
              </ul>
            </nav>
            </>
          )}

        </div>
      </article>
    </PublicPageLayout>
  );
}

export default PublicMockExamPage;
