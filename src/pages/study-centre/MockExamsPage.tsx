/**
 * Mock exams — every in-app paper in one place.
 *
 * The papers were always there, one per course, sitting in the final module of
 * each. Nothing listed them together, so "give me a paper to sit" meant
 * remembering which course owned the exam you wanted and scrolling to the
 * bottom of it. This page is the index that was missing.
 *
 * The free public papers at /mock-exams are a different catalogue for a
 * different audience (no sign-up, SEO entry point) and are deliberately not
 * merged in here.
 */
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, History, Search, X } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { Hairline, SC_LIST, SC_ROW } from '@/components/study-centre/ui/StudyKit';
import { ScoreBadge, fmtWhen } from '@/components/study-centre/mock-history/MockBits';
import { paperName, useMockHistory, useRevisionPile } from '@/hooks/study-centre/useMockHistory';
import { recentAverage, recentPassMark } from '@/lib/study-centre/mockInsights';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubToolGrid,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import {
  IN_APP_MOCK_EXAMS,
  MOCK_EXAM_TRACKS,
  TOTAL_IN_APP_MOCK_EXAMS,
  type MockExamTrack,
} from '@/data/study-centre/inAppMockExams';

type Filter = 'all' | MockExamTrack;

const HELP: PageHelpContent = {
  id: 'study-mock-exams',
  title: 'Mock exams',
  what: 'Every practice paper built into your courses, in one place, timed and marked against the real pass mark.',
  steps: [
    {
      title: 'Pick a paper',
      body: 'Filter by track or search by course, qualification number or topic. Each sitting draws a fresh set of questions from the course bank, so you can sit the same paper again and get a different set.',
    },
    {
      title: 'See how you did',
      body: 'Every sitting is saved to your history: your score against the pass mark, the topics that cost you marks, and the questions you got wrong.',
    },
    {
      title: 'Revise what you got wrong',
      body: 'Wrong answers go on your revision pile and come back until you get them right. A weak spots mock builds a paper from the topics you find hardest.',
    },
  ],
};

/** A tappable figure in the header. */
function Figure({
  label,
  value,
  sub,
  tone,
  onClick,
}: {
  label: string;
  value: string;
  sub: string;
  tone?: 'good' | 'warn';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-0 flex-col items-start rounded-2xl border border-white/[0.14] bg-white/[0.04] px-3.5 py-3 text-left transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.1]"
    >
      <span className="text-[12.5px] font-semibold leading-snug text-white">{label}</span>
      <span
        className={cn(
          'mt-1 text-[24px] font-black leading-none tabular-nums',
          tone === 'good' ? 'text-emerald-400' : tone === 'warn' ? 'text-orange-400' : 'text-white'
        )}
      >
        {value}
      </span>
      <span className="mt-1 text-[12px] font-medium leading-snug text-white">{sub}</span>
    </button>
  );
}

export default function MockExamsPage() {
  useSEO({
    title: 'Mock Exams | Study Centre | Elec-Mate',
    description:
      'Every practice paper in the Elec-Mate study centre — Level 2 and Level 3, AM2, HNC, MOET, 18th Edition, inspection and testing, and the safety card tests.',
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Your figures for the header: one history read, the revision pile count.
  const history = useMockHistory(500);
  const { rows, signedIn, loading } = history;
  const pile = useRevisionPile({ countOnly: true });
  const due = pile.count;
  const avg = recentAverage(rows, 10);
  const passMark = recentPassMark(rows, 10);
  const papersPassed = new Set(rows.filter((r) => r.passed).map((r) => r.exam_slug)).size;
  const hasHistory = signedIn && !loading && rows.length > 0;

  const nextAction =
    due > 0
      ? {
          label: `Revise ${due} wrong ${due === 1 ? 'answer' : 'answers'}`,
          to: '/study-centre/mock-exams/revise',
        }
      : avg !== null && avg < passMark
        ? { label: 'Sit a weak spots mock', to: '/study-centre/mock-exams/targeted' }
        : null;
  const scrollToPapers = () =>
    document.getElementById('papers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const [filter, setFilter] = useState<Filter>('all');
  // `?q=` lets a nudge land on the papers it is actually about. The evening
  // push says "you are getting 50% right on Motors & Control" — arriving at an
  // unfiltered index of every paper in the app loses that thread entirely.
  const [query, setQuery] = useState(() => params.get('q')?.replace(/\+/g, ' ') ?? '');

  const search = query.trim().toLowerCase();

  // Search spans title, course and description so "2391", "level 2" and
  // "fault" all land somewhere sensible.
  const matches = useMemo(
    () =>
      IN_APP_MOCK_EXAMS.filter((exam) => {
        if (filter !== 'all' && exam.track !== filter) return false;
        if (!search) return true;
        return (
          exam.title.toLowerCase().includes(search) ||
          exam.course.toLowerCase().includes(search) ||
          exam.description.toLowerCase().includes(search)
        );
      }),
    [filter, search]
  );

  const groups = useMemo(
    () =>
      MOCK_EXAM_TRACKS.map((track) => ({
        ...track,
        cards: matches
          .filter((exam) => exam.track === track.id)
          .map<HubTool>((exam) => ({
            id: exam.id,
            title: exam.title,
            description: exam.description,
            meta: exam.course,
            // onClick rather than `to` so the paper learns where it was opened
            // from. A paper reached from here used to exit into its parent
            // course — a place the learner had never been.
            onClick: () =>
              navigate(exam.path, {
                state: { from: '/study-centre/mock-exams', label: 'mock exams' },
              }),
          })),
      })).filter((group) => group.cards.length > 0),
    [matches, navigate]
  );

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All papers', count: TOTAL_IN_APP_MOCK_EXAMS },
    ...MOCK_EXAM_TRACKS.map((t) => ({
      id: t.id as Filter,
      label: t.label.replace(' & site cards', '').replace(' papers', ''),
      count: IN_APP_MOCK_EXAMS.filter((e) => e.track === t.id).length,
    })),
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead section="Study Centre" title="Mock exams" backTo="/study-centre" />

      <HubBody>
        {/* ── Header: what this is, how you're doing, what to do next ── */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <Hairline />
          <PageHelpButton help={HELP} className="absolute right-6 top-6 hidden lg:inline-flex" />
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-x-10">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Mock exams
                </p>
                <PageHelpButton help={HELP} className="-mt-2 lg:hidden" />
              </div>
              <h1 className="mt-1.5 text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px]">
                Sit a mock exam
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
                {TOTAL_IN_APP_MOCK_EXAMS} timed papers, marked against the real pass mark. A fresh
                set of questions every sitting, and every wrong answer saved for you to revise.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                {nextAction ? (
                  <button
                    type="button"
                    onClick={() => navigate(nextAction.to)}
                    className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
                  >
                    {nextAction.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={scrollToPapers}
                    className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
                  >
                    Choose a paper
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                )}
                {hasHistory && (
                  <button
                    type="button"
                    onClick={() => navigate('/study-centre/mock-exams/history')}
                    className={cn(COLLEGE_BTN, 'h-12 px-5')}
                  >
                    <History className="h-4 w-4" aria-hidden />
                    Your history
                  </button>
                )}
              </div>
            </div>

            {hasHistory && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:mt-8">
                <Figure
                  label="Average"
                  value={avg !== null ? `${avg}%` : '–'}
                  sub={`pass ${passMark}%`}
                  tone={avg === null ? undefined : avg >= passMark ? 'good' : 'warn'}
                  onClick={() => navigate('/study-centre/mock-exams/history')}
                />
                <Figure
                  label="Passed"
                  value={String(papersPassed)}
                  sub={`of ${TOTAL_IN_APP_MOCK_EXAMS} papers`}
                  tone={papersPassed > 0 ? 'good' : undefined}
                  onClick={() => navigate('/study-centre/mock-exams/history')}
                />
                <Figure
                  label="To revise"
                  value={String(due)}
                  sub={due === 1 ? 'answer' : 'answers'}
                  tone={due > 0 ? 'warn' : undefined}
                  onClick={() =>
                    navigate(
                      due > 0
                        ? '/study-centre/mock-exams/revise'
                        : '/study-centre/mock-exams/history'
                    )
                  }
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Recent sittings: a list on a phone, a row of cards from sm ── */}
        {hasHistory && (
          <section aria-labelledby="mx-recent" className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <h2
                id="mx-recent"
                className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
              >
                Recent sittings
              </h2>
              <button
                type="button"
                onClick={() => navigate('/study-centre/mock-exams/history?tab=attempts')}
                className="inline-flex h-11 items-center gap-1 text-[13.5px] font-semibold text-elec-yellow touch-manipulation active:opacity-70"
              >
                All {rows.length >= 500 ? '500+' : rows.length}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className={cn(SC_LIST, 'sm:hidden')}>
              {rows.slice(0, 4).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => navigate(`/study-centre/mock-exams/history/${r.id}`)}
                  className={SC_ROW}
                >
                  <ScoreBadge pct={r.percentage} passed={r.passed} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block break-words text-[14px] font-semibold leading-snug text-white">
                      {paperName(r)}
                    </span>
                    <span className="block text-[12.5px] text-white">
                      {fmtWhen(r.created_at)} · {r.passed ? 'Pass' : 'Not yet'}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              ))}
            </div>
            <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {rows.slice(0, 4).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => navigate(`/study-centre/mock-exams/history/${r.id}`)}
                  className="flex min-w-0 flex-col items-start gap-3 rounded-2xl card-landing-interactive p-4 text-left touch-manipulation active:bg-white/[0.08]"
                >
                  <ScoreBadge pct={r.percentage} passed={r.passed} size="sm" />
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">
                      {paperName(r)}
                    </span>
                    <span className="mt-1 block text-[12.5px] text-white">
                      {fmtWhen(r.created_at)} · {r.passed ? 'Pass' : 'Not yet'}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <h2
          id="papers"
          className="scroll-mt-24 text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
        >
          All papers
        </h2>

        {/* Filter + search. Chips beat a select here — five options, and on a
            phone a chip row is one tap where a picker is three. */}
        <div className="space-y-3">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
            {chips.map((chip) => {
              const active = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    'flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] touch-manipulation transition-colors',
                    active
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.1]'
                  )}
                >
                  {chip.label}
                  <span className={cn('tabular-nums', active ? 'text-black/70' : 'text-white')}>
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search
              className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers — 2391, level 2, fault finding…"
              aria-label="Search mock exams"
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-9 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation [color-scheme:dark]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 flex h-11 w-9 -translate-y-1/2 items-center justify-center text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 text-center">
            <p className="text-[15px] font-semibold text-white">No papers match that search</p>
            <p className="mt-1.5 text-[13px] text-white">
              Try a course name, a qualification number, or clear the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              className="mt-4 inline-flex h-11 items-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black touch-manipulation"
            >
              Show all {TOTAL_IN_APP_MOCK_EXAMS} papers
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="space-y-2">
              <HubToolGrid label={group.label} cards={group.cards} columns="four" />
              <p className="px-0.5 text-[12px] text-white">{group.blurb}</p>
            </div>
          ))
        )}
      </HubBody>
    </HubPage>
  );
}
