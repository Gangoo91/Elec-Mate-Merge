/**
 * MockExamsHubPage — /mock-exams index.
 *
 * The free papers, grouped by category. Designed as a share-target (clean URL,
 * branded card grid) for trade groups and apprentice chats, and as the top of
 * the acquisition funnel — no sign-up, nothing gated.
 *
 * Width: the container runs to max-w-7xl because this page is a card grid, and
 * a grid wants room — at max-w-5xl it showed three cards on a display with
 * space for five and left a third of the viewport empty. Prose keeps its own
 * measure (max-w-[62ch]) rather than stretching to the container, so the
 * reading line stays short while the cards use the width.
 *
 * Counts are derived from the card data, never typed in. Both the headline and
 * the meta description previously carried hand-written figures ("7,800+
 * questions", "38 mock exams") that had drifted from the real catalogue.
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

const ALL_CARDS = [...TRADE_CERTS, ...ELECTRICAL_EXAMS, ...LEVEL_2, ...LEVEL_3];
const TOTAL_QUESTIONS = ALL_CARDS.reduce((n, c) => n + c.qCount, 0);
const TOTAL_EXAMS = ALL_CARDS.length;

const SECTIONS = [
  {
    id: 'trade-certifications',
    title: 'Trade certifications',
    icon: HardHat,
    cards: TRADE_CERTS,
    accent: 'bg-orange-500/15 text-orange-300',
  },
  {
    id: 'electrical-exams',
    title: 'Electrical exams',
    icon: Zap,
    cards: ELECTRICAL_EXAMS,
    accent: 'bg-yellow-500/15 text-yellow-300',
  },
  {
    id: 'level-2',
    title: 'Level 2 Electrical (C&G 2365)',
    icon: ShieldCheck,
    cards: LEVEL_2,
    accent: 'bg-emerald-500/15 text-emerald-300',
  },
  {
    id: 'level-3',
    title: 'Level 3 Electrical (C&G 2365)',
    icon: GraduationCap,
    cards: LEVEL_3,
    accent: 'bg-blue-500/15 text-blue-300',
  },
];

function ExamGrid({ cards }: { cards: ExamCard[] }) {
  return (
    // Four across on a large display. The cards are ~260px of content in a
    // ~330px track at three columns, which is why the old layout read as
    // sparse rather than generous.
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((c) => (
        <Link
          key={c.slug}
          to={`/mock-exams/${c.slug}`}
          className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-yellow-500/40 hover:bg-white/[0.06] touch-manipulation"
        >
          <h3 className="font-bold leading-tight text-white transition-colors group-hover:text-yellow-400">
            {c.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">{c.blurb}</p>
          {/* Spacer pins the meta row to the bottom so it lines up across a
              row whatever length the blurbs run to. */}
          <span className="flex-grow" />
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400">
              {c.qCount} questions
            </span>
            <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-yellow-400" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function MockExamsHubPage() {
  useSEO({
    title: 'Free UK Mock Exams for Electricians + Tradespeople',
    description: `${TOTAL_QUESTIONS.toLocaleString()}+ free practice questions across ${TOTAL_EXAMS} mock exams: CSCS, 18th Edition, 2391, AM2, PAT testing, EV charging, fire alarm, Level 2 + 3. No sign-up to try.`,
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Mock Exams', url: '/mock-exams' },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free UK Mock Exams Hub',
      description: `${TOTAL_QUESTIONS}+ free practice questions across ${TOTAL_EXAMS} mock exams.`,
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
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header>
          <div className="mb-3 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400">
            <GraduationCap className="h-4 w-4" />
            {TOTAL_QUESTIONS.toLocaleString()} free practice questions
          </div>
          <h1 className="max-w-[20ch] text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Free UK mock exams for electricians + tradespeople
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-white sm:text-lg">
            Every mock exam below is free, no sign-up needed, drawn from real question banks used
            inside the Elec-Mate study centre. Pick one, run a 25-question random selection, score
            yourself, see worked explanations on every wrong answer.
          </p>

          {/* Three facts that answer "is this worth my time?" before the reader
              has to scroll into the grid to work it out. */}
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.08] sm:max-w-xl">
            {[
              [TOTAL_EXAMS.toString(), 'Mock exams'],
              [TOTAL_QUESTIONS.toLocaleString(), 'Questions'],
              ['£0', 'No sign-up'],
            ].map(([value, label]) => (
              <div key={label} className="bg-[hsl(0_0%_8%)] px-4 py-4">
                <dt className="sr-only">{label}</dt>
                <dd className="text-xl font-semibold tabular-nums tracking-tight text-white sm:text-2xl">
                  {value}
                </dd>
                <p className="mt-0.5 text-[11.5px] leading-snug text-white">{label}</p>
              </div>
            ))}
          </dl>

          {/* Jump links — four sections and up to a dozen cards each is a long
              scroll on a phone without them. */}
          <nav aria-label="Exam categories" className="mt-8 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex h-11 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:border-yellow-500/40 hover:bg-white/[0.1] touch-manipulation"
              >
                {s.title}
                <span className="text-white tabular-nums">{s.cards.length}</span>
              </a>
            ))}
          </nav>
        </header>

        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-24">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
              <span className={`rounded-xl p-2 ${s.accent}`}>
                <s.icon className="h-5 w-5" />
              </span>
              {s.title}
              <span className="ml-1 text-sm font-normal text-white">({s.cards.length})</span>
            </h2>
            <ExamGrid cards={s.cards} />
          </section>
        ))}

        <section className="mt-16 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/[0.08] to-transparent p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Want the full bank + progress tracking?
          </h2>
          <p className="mt-3 max-w-[62ch] leading-relaxed text-white">
            Free mock exams above pull 25 questions at random. Inside the Elec-Mate app you get the
            full banks, category breakdowns, weak-area alerts, AI explanations on every question, the
            AM2 simulator, EPA simulator, and study tracking across all your courses. Free to sign up
            — no charge until day 8.
          </p>
          <Link
            to="/auth/signup?ref=mock-exams-hub"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-yellow-500 px-6 font-bold text-black hover:bg-yellow-400 touch-manipulation"
          >
            Start free in Elec-Mate
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </main>
    </PublicPageLayout>
  );
}
