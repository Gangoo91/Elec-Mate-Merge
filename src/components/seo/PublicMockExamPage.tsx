/**
 * PublicMockExamPage — SEO wrapper around <SEOMockExam>.
 *
 * Each /mock-exams/<slug> page is just a thin file that imports a question
 * bank and renders this wrapper with the right title + meta + intro. The
 * shared shell handles useSEO injection, hero, intro paragraph, mock exam,
 * and the soft sign-up CTA. Saves repeating the same boilerplate 25 times.
 */
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOMockExam, type SEOMockExamQuestion } from '@/components/seo/SEOMockExam';
import useSEO from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { getRelatedMockExams } from '@/components/seo/mockExamCatalog';

interface PublicMockExamPageProps {
  /** SEO title — appended with " | Elec-Mate" by useSEO. */
  title: string;
  /** SEO meta description (150-160 chars). */
  description: string;
  /** Slug part of the URL — used in canonical + signup-CTA query. */
  slug: string;
  /** Heading shown above the intro paragraph (usually matches title without the brand). */
  heading: string;
  /** Short intro paragraph displayed above the exam. */
  intro: string;
  /** The full question bank. */
  questionBank: SEOMockExamQuestion[];
  /** Optional overrides — defaults: 25 Qs, 30 min, 70% pass. */
  questionsPerExam?: number;
  timeLimitMinutes?: number;
  passThreshold?: number;
  /** Topic label shown in the breadcrumb above the H1. */
  breadcrumbLabel?: string;
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

  useSEO({
    title,
    description,
    type: 'article',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Mock Exams', url: '/mock-exams' },
      { name: breadcrumbLabel, url: `/mock-exams/${slug}` },
    ],
  });

  return (
    <PublicPageLayout>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            to="/mock-exams"
            className="inline-flex items-center gap-2 text-sm font-medium text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft className="w-4 h-4" />
            All free mock exams
          </Link>
        </nav>

        <header className="mb-6">
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3">
            <GraduationCap className="w-4 h-4" />
            Free mock exam
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{heading}</h1>
          <p className="mt-4 text-white/85 leading-relaxed text-base sm:text-lg">{intro}</p>
        </header>

        <SEOMockExam
          examName={heading}
          examDescription={intro}
          questionBank={questionBank}
          questionsPerExam={questionsPerExam}
          timeLimitMinutes={timeLimitMinutes}
          passThreshold={passThreshold}
          canonicalUrl={canonical}
          signupCta={{
            label: 'Get the full bank in the app',
            href: `/auth/signup?ref=mock-exam-${slug}`,
            subline:
              'Sign up free for progress tracking, full question bank, AI explanations + the AM2 simulator. No card required.',
          }}
        />

        {/* FAQ — visible on-page + matches the FAQPage JSON-LD schema baked
            into static HTML by generate-seo-html.mjs. Captures "People Also
            Ask" SERP real estate. 4 evergreen Qs work for every mock exam. */}
        <section aria-labelledby="faq-heading" className="mt-12 pt-10 border-t border-white/10">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-white mb-5">
            Common questions about this mock exam
          </h2>
          <dl className="space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <dt className="font-semibold text-white">
                Is the {heading.replace(/Mock Exam|Free|—.*$/g, '').trim()} mock exam free?
              </dt>
              <dd className="mt-2 text-white/80 leading-relaxed text-sm">
                Yes. 100% free, no sign-up required. Questions are pulled at random from a
                substantial question bank, with a worked answer explanation on every question after
                you submit.
              </dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <dt className="font-semibold text-white">Can I retake the mock exam?</dt>
              <dd className="mt-2 text-white/80 leading-relaxed text-sm">
                Yes — every attempt picks a different random selection from the bank, so each retake
                gives you genuinely new questions. No limit on retakes.
              </dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <dt className="font-semibold text-white">
                Does this score count towards the real qualification?
              </dt>
              <dd className="mt-2 text-white/80 leading-relaxed text-sm">
                No. This is independent practice material for revision purposes only. To gain the
                actual qualification you need to sit the real assessment through an approved
                provider.
              </dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <dt className="font-semibold text-white">
                What happens when I get a question wrong?
              </dt>
              <dd className="mt-2 text-white/80 leading-relaxed text-sm">
                After you submit you get your overall score, a per-topic breakdown bar chart, a
                weak-area alert listing topics scored under 60%, and a worked explanation on every
                question — including why the correct answer is right.
              </dd>
            </div>
          </dl>
        </section>

        {/* Related mock exams — internal linking + dwell time. Picks 4 from
            the same category where possible (e.g. CSCS shows other trade
            certs; Level 2 H&S shows other Level 2 units). */}
        <section aria-labelledby="related-heading" className="mt-12 pt-10 border-t border-white/10">
          <h2 id="related-heading" className="text-xl sm:text-2xl font-bold text-white mb-5">
            Try another free mock exam
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {getRelatedMockExams(slug, 4).map((m) => (
              <li key={m.slug}>
                <Link
                  to={`/mock-exams/${m.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/40 p-4 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {m.title}
                    </div>
                    <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-yellow-400 mt-1">
                      {m.qCount} questions
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/55 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link to="/mock-exams" className="font-medium text-yellow-400 hover:text-yellow-300">
              See all 25 free mock exams →
            </Link>
          </p>
        </section>
      </main>
    </PublicPageLayout>
  );
}

export default PublicMockExamPage;
