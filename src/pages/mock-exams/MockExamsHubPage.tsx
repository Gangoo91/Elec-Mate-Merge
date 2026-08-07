/**
 * MockExamsHubPage — /mock-exams index.
 *
 * Lists all 38 free mock exams grouped by category. Designed as a share-target
 * (clean URL, branded card grid) for Facebook trade groups + apprentice chats.
 */
import { Link } from 'react-router-dom';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import useSEO from '@/hooks/useSEO';
import { GraduationCap, HardHat, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

import {
  TRADE_CERTS,
  ELECTRICAL_EXAMS,
  LEVEL_2,
  LEVEL_3,
  type ExamCard,
} from '@/data/seo/mockExamIndex';





const TOTAL_QUESTIONS = [...TRADE_CERTS, ...ELECTRICAL_EXAMS, ...LEVEL_2, ...LEVEL_3].reduce(
  (n, c) => n + c.qCount,
  0
);

function Section({
  title,
  icon: Icon,
  cards,
  accent,
}: {
  title: string;
  icon: typeof GraduationCap;
  cards: ExamCard[];
  accent: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 mb-5">
        <span className={`p-2 rounded-xl ${accent}`}>
          <Icon className="w-5 h-5" />
        </span>
        {title}
        <span className="text-white/40 text-sm font-normal ml-1">({cards.length})</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.slug}
            to={`/mock-exams/${c.slug}`}
            className="group block rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/40 p-5 transition-colors touch-manipulation"
          >
            <h3 className="font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">{c.blurb}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-yellow-400">
                {c.qCount} questions
              </span>
              <ArrowRight className="w-4 h-4 text-white/55 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function MockExamsHubPage() {
  useSEO({
    title: 'Free UK Mock Exams for Electricians + Tradespeople',
    description:
      '7,800+ free practice questions across 38 mock exams: CSCS, 18th Edition, 2391, AM2, PAT testing, EV charging, fire alarm, Level 2 + 3. No sign-up to try.',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Mock Exams', url: '/mock-exams' },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free UK Mock Exams Hub',
      description: `${TOTAL_QUESTIONS}+ free practice questions across 38 mock exams.`,
      url: 'https://www.elec-mate.com/mock-exams',
      isAccessibleForFree: true,
      inLanguage: 'en-GB',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
        url: 'https://www.elec-mate.com',
      },
    },
  });

  return (
    <PublicPageLayout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <header>
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3">
            <GraduationCap className="w-4 h-4" />
            {TOTAL_QUESTIONS.toLocaleString()} free practice questions
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            Free UK mock exams for electricians + tradespeople
          </h1>
          <p className="mt-5 text-white/85 leading-relaxed text-base sm:text-lg max-w-3xl">
            Every mock exam below is free, no sign-up needed, drawn from real question banks used
            inside the Elec-Mate study centre. Pick one, run a 25-question random selection, score
            yourself, see worked explanations on every wrong answer.
          </p>
        </header>

        <Section
          title="Trade certifications"
          icon={HardHat}
          cards={TRADE_CERTS}
          accent="bg-orange-500/15 text-orange-300"
        />
        <Section
          title="Electrical exams"
          icon={Zap}
          cards={ELECTRICAL_EXAMS}
          accent="bg-yellow-500/15 text-yellow-300"
        />
        <Section
          title="Level 2 Electrical (C&G 2365)"
          icon={ShieldCheck}
          cards={LEVEL_2}
          accent="bg-emerald-500/15 text-emerald-300"
        />
        <Section
          title="Level 3 Electrical (C&G 2365)"
          icon={GraduationCap}
          cards={LEVEL_3}
          accent="bg-blue-500/15 text-blue-300"
        />

        <section className="mt-16 rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] to-transparent border border-yellow-500/20 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Want the full bank + progress tracking?
          </h2>
          <p className="mt-3 text-white/85 leading-relaxed max-w-2xl">
            Free mock exams above pull 25 questions at random. Inside the Elec-Mate app you get the
            full banks (200-300 questions each), category breakdowns, weak-area alerts, AI
            explanations on every question, the AM2 simulator, EPA simulator, and study tracking
            across all your courses. Free to sign up — no charge until day 8.
          </p>
          <Link
            to="/auth/signup?ref=mock-exams-hub"
            className="mt-5 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold touch-manipulation"
          >
            Start free in Elec-Mate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
    </PublicPageLayout>
  );
}
