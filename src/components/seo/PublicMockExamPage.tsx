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
import { Helmet } from 'react-helmet';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOMockExam, type SEOMockExamQuestion } from '@/components/seo/SEOMockExam';
import useSEO from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { getRelatedMockExams, MOCK_EXAM_CATALOG } from '@/components/seo/mockExamCatalog';
import { getTopicsForExam } from '@/components/seo/mockExamTopicRegistry';
import { useMemo } from 'react';

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
  questionsPerExam?: number;
  timeLimitMinutes?: number;
  passThreshold?: number;
  /** Topic label shown in the breadcrumb above the H1. */
  breadcrumbLabel?: string;
}

// Last edit of this template — bumps date-modified on every page that
// uses it. Update when the schema or template structure changes.
const TEMPLATE_DATE_MODIFIED = '2026-05-25';

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
  questionsPerExam = 25,
  timeLimitMinutes = 30,
  passThreshold = 70,
  breadcrumbLabel = 'Mock exam',
}: PublicMockExamPageProps) {
  const canonical = `https://www.elec-mate.com/mock-exams/${slug}`;

  // Topic pages get a 4-level breadcrumb (Home → Mock Exams → Exam →
  // Topic). The exam name comes from the catalog so we don't pass it
  // manually for every topic. Parent-exam pages stay 3-level.
  const slugParts = slug.split('/');
  const parentExamSlug = slugParts.length > 1 ? slugParts[0] : null;
  const parentExam = parentExamSlug
    ? MOCK_EXAM_CATALOG.find((e) => e.slug === parentExamSlug)
    : null;

  useSEO({
    title,
    description,
    type: 'article',
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

  const faq = useMemo(() => buildFaq(heading), [heading]);
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

  return (
    <PublicPageLayout>
      <Helmet>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb back link — goes to parent exam on topic pages,
              hub otherwise. Single line; the JSON-LD breadcrumb above
              carries the full hierarchy for crawlers. */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <Link
              to={parentExam ? `/mock-exams/${parentExamSlug}` : '/mock-exams'}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-yellow-400 hover:text-yellow-300 touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {parentExam ? `Back to ${parentExam.title}` : 'All free mock exams'}
            </Link>
          </nav>

          {/* Header — eyebrow + H1 + intro. Constrain the text column to
              max-w-3xl so the intro paragraph stays readable on desktop
              even though the page wrapper is 5xl wide. Bigger H1 on lg+
              so it has presence on big monitors without sprawling. */}
          <header className="mb-10 sm:mb-12 max-w-3xl">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400">
              Free mock exam
            </p>
            <h1 className="mt-2 text-[28px] sm:text-[40px] lg:text-[48px] font-bold text-white leading-[1.05] tracking-tight">
              {heading}
            </h1>
            <p className="mt-5 text-[15px] sm:text-[17px] text-white/75 leading-relaxed">{intro}</p>
          </header>

          {/* The exam — stats, CTA, sample Qs, active state, results, conversion */}
          <SEOMockExam
            examName={heading}
            questionBank={questionBank}
            questionsPerExam={questionsPerExam}
            timeLimitMinutes={timeLimitMinutes}
            passThreshold={passThreshold}
            signupCta={{
              label: 'Start Free Trial',
              href: `/auth/signup?ref=mock-exam-${slug.replace(/\//g, '-')}`,
              subline: 'Free trial · no charge until day 8 · cancel anytime',
            }}
          />

          {/* Practice by topic — only on the parent exam page. Links to
              /mock-exams/<slug>/<topic-slug> drill-down landings. These
              are real indexable pages with topic-specific copy + a
              filtered bank, so they catch long-tail SERP queries like
              "AM2 safe isolation practice questions". */}
          {topics.length > 0 && (
            <nav
              aria-labelledby="topic-heading"
              className="mt-10 pt-8 border-t border-white/[0.08]"
            >
              <h2
                id="topic-heading"
                className="text-[13px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3"
              >
                Practice by topic
              </h2>
              <p className="text-[13.5px] text-white/65 mb-4 leading-relaxed">
                Drill a single topic from this exam — same bank, filtered to one area.
              </p>
              <ul className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to={`/mock-exams/${baseExamSlug}/${t.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-yellow-500/40 hover:bg-yellow-500/[0.06] text-[13px] font-medium text-white/85 hover:text-yellow-300 transition-colors touch-manipulation"
                    >
                      {t.category}
                      <span className="text-[11px] text-white/40 tabular-nums">{t.qCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Compact FAQ — 3 Qs in a native accordion. Schema above
              already emits FAQPage so we get the rich-result eligibility
              without the page bloat. */}
          <section
            aria-labelledby="faq-heading"
            className="mt-12 pt-8 border-t border-white/[0.08]"
          >
            <h2
              id="faq-heading"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3"
            >
              FAQ
            </h2>
            <div className="space-y-1.5">
              {faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl bg-white/[0.03] border border-white/[0.06] open:bg-white/[0.05]"
                >
                  <summary className="cursor-pointer list-none px-4 py-3 sm:px-5 sm:py-3.5 flex items-start justify-between gap-3 touch-manipulation">
                    <span className="text-white text-[14.5px] font-medium leading-snug flex-1">
                      {f.q}
                    </span>
                    <ChevronDown className="w-4 h-4 text-white/40 shrink-0 mt-0.5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="px-4 pb-4 sm:px-5 sm:pb-4 text-[13.5px] text-white/70 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related strip — internal linking without the section sprawl */}
          <nav
            aria-labelledby="related-heading"
            className="mt-10 pt-8 border-t border-white/[0.08]"
          >
            <h2
              id="related-heading"
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3"
            >
              More free mock exams
            </h2>
            <ul className="flex flex-wrap gap-2">
              {getRelatedMockExams(slug, 4).map((m) => (
                <li key={m.slug}>
                  <Link
                    to={`/mock-exams/${m.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-yellow-500/40 hover:bg-yellow-500/[0.06] text-[13px] font-medium text-white/85 hover:text-yellow-300 transition-colors touch-manipulation"
                  >
                    {m.title}
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/mock-exams"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-[13px] font-semibold text-yellow-300 hover:bg-yellow-500/15 transition-colors touch-manipulation"
                >
                  See all 25
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </article>
    </PublicPageLayout>
  );
}

export default PublicMockExamPage;
