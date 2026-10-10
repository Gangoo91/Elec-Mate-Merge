/**
 * Mock exam history — redesigned 10 Oct 2026.
 *
 * Andrew: "they should be able to see what they've done and where they are
 * and how they can be better", "back filled with everyone's history".
 *
 * History now covers everything a learner has sat (useMockHistory): mock
 * exams, the in-app topic tests and AM2 assessments that lived in their own
 * tables, and — for 561 older mocks — topic results filled in from their
 * quiz_results twin (migration 20261010120000).
 *
 * The page answers the three questions in order:
 *   hero              one sentence on where you stand + the one next step
 *   What you've done  sittings, papers, passes, time, and a 12-week rhythm
 *   Where you are     the paper you're working on, then every paper's verdict
 *   How to get better weakest topics with Study / Practise, what's due
 *   Everything        Papers · Topics · Attempts (?tab= so Back returns to it)
 */
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Hairline,
  ProgressRing,
  SC_CARD,
  SC_LIST,
  SC_ROW,
  ScStats,
} from '@/components/study-centre/ui/StudyKit';
import useSEO from '@/hooks/useSEO';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  paperName,
  useMockHistory,
  useRevisionPile,
  useTopicStats,
  type MockAttemptRow,
} from '@/hooks/study-centre/useMockHistory';
import { retakePathFor, studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import {
  forecastDot,
  forecastFor,
  forecastText,
  mainPaper,
  recentAverage,
  recentPassMark,
  topicBar,
} from '@/lib/study-centre/mockInsights';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { HowToGetBetter } from '@/components/study-centre/insights/HowToGetBetter';
import {
  Delta,
  ScoreBadge,
  Sparkline,
  TrendChart,
  fmtDuration,
  fmtWhen,
} from '@/components/study-centre/mock-history/MockBits';

type Tab = 'papers' | 'topics' | 'attempts';

const KIND_LABEL: Record<string, string> = { test: 'Topic test', am2: 'AM2' };

const HELP: PageHelpContent = {
  id: 'mock-exam-history',
  title: 'Mock exam history',
  what: 'Everything you’ve sat, on any device: mock exams, topic tests and AM2 practice. How each paper is going, your strongest and weakest topics, and what to do next.',
  steps: [
    {
      title: 'What you’ve done',
      body: 'Every sitting, how many passed and your study rhythm over the last 12 weeks.',
    },
    {
      title: 'Where you are',
      body: 'The paper you’re working on, with a pass forecast from your last three sittings, then a verdict for every paper.',
    },
    {
      title: 'How to get better',
      body: 'Your weakest topics across everything you’ve sat. Study opens the lesson; Practise drills those questions.',
    },
    {
      title: 'Open any sitting',
      body: 'Attempts lists every sitting. Recent mocks show each question you got wrong; older ones show how you did by topic.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'Pass, or a strong topic (75% or more)' },
    { swatch: 'bg-sky-400', label: 'Just passing, or 60–74% on a topic' },
    { swatch: 'bg-orange-400', label: 'Below the pass mark, or a topic to work on' },
  ],
};

/** Sittings per week for the last 12 weeks (Monday starts), oldest first. */
function weeklyRhythm(rows: MockAttemptRow[]) {
  const now = new Date();
  const monday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - ((now.getDay() + 6) % 7)
  );
  return Array.from({ length: 12 }, (_, i) => {
    const start = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() - (11 - i) * 7
    );
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
    const n = rows.filter((r) => {
      const t = new Date(r.created_at);
      return t >= start && t < end;
    }).length;
    return {
      label: start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      n,
      current: i === 11,
    };
  });
}

export default function MockHistoryPage() {
  useSEO(
    'Mock exam history | Study Centre',
    'Everything you’ve sat, where you are, and how to get better.'
  );
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab: Tab = (['papers', 'topics', 'attempts'] as const).includes(params.get('tab') as Tab)
    ? (params.get('tab') as Tab)
    : 'papers';
  const setTab = (t: Tab) => setParams(t === 'papers' ? {} : { tab: t }, { replace: true });

  const history = useMockHistory(500);
  const { rows, papers, loading, error, signedIn } = history;
  const pile = useRevisionPile({ countOnly: true });
  const due = pile.count;
  const topicStats = useTopicStats();
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showAllAttempts, setShowAllAttempts] = useState(false);

  const hero = useMemo(() => mainPaper(papers, rows), [papers, rows]);
  const heroForecast = hero
    ? forecastFor(hero.trend, hero.last.pass_mark ?? 60, hero.last.total_questions)
    : null;
  const heroRetake = hero ? retakePathFor(hero.slug, hero.retakePath) : null;

  const avg = recentAverage(rows, 10);
  const passMark = recentPassMark(rows, 10);
  const passes = rows.filter((r) => r.passed).length;
  const minutes = Math.round(rows.reduce((s, r) => s + (r.time_taken_seconds || 0), 0) / 60);
  const firstDate = rows.length ? rows[rows.length - 1].created_at : null;
  const weeks = useMemo(() => weeklyRhythm(rows), [rows]);
  const weekMax = Math.max(1, ...weeks.map((w) => w.n));
  const activeWeeks = weeks.filter((w) => w.n > 0).length;

  const topicRows = useMemo(
    () =>
      [...topicStats.stats]
        .sort((a, b) => a.pct - b.pct || b.answered - a.answered)
        .map((t) => ({ ...t, link: studyLinkFor(t.examSlug, t.section, t.module, t.topic) })),
    [topicStats.stats]
  );

  // Every paper with a verdict, newest activity first.
  const paperVerdicts = useMemo(
    () =>
      papers.map((p) => ({
        ...p,
        forecast: forecastFor(p.trend, p.last.pass_mark ?? 60, p.last.total_questions),
        retake: retakePathFor(p.slug, p.retakePath),
      })),
    [papers]
  );

  const verdict = (() => {
    if (!rows.length) return '';
    const since = firstDate
      ? new Date(firstDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
      : '';
    const done = `${rows.length} ${rows.length === 1 ? 'sitting' : 'sittings'} across ${papers.length} ${papers.length === 1 ? 'paper' : 'papers'}${since ? ` since ${since}` : ''}.`;
    if (avg === null) return done;
    return avg >= passMark
      ? `${done} Your recent average is ${avg}%, above the pass mark.`
      : `${done} Your recent average is ${avg}%, ${passMark - avg} points under the ${passMark}% pass mark.`;
  })();

  const nextAction =
    due > 0
      ? {
          label: `Revise ${due} wrong ${due === 1 ? 'answer' : 'answers'}`,
          to: '/study-centre/mock-exams/revise',
        }
      : avg !== null && avg < passMark
        ? { label: 'Sit a weak spots mock', to: '/study-centre/mock-exams/targeted' }
        : heroRetake
          ? { label: `Sit ${hero?.name ?? 'it'} again`, to: heroRetake }
          : { label: 'Sit a mock', to: '/study-centre/mock-exams' };

  const attempts = showAllAttempts ? rows : rows.slice(0, 25);

  return (
    <HubPage ground="landing">
      <HubMasthead section="Study Centre" title="Mock exam history" backTo="/study-centre" />
      <HubBody>
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <Hairline />
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-10">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Mock exams
                </p>
                <PageHelpButton help={HELP} className="-mt-2 lg:hidden" />
              </div>
              <h1 className="mt-1.5 text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px]">
                Your mock exam history
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
                {loading
                  ? 'Loading everything you’ve sat…'
                  : rows.length
                    ? verdict
                    : 'Everything you sit lands here: your score against the pass mark, how it’s moving, and what to work on.'}
              </p>
            </div>
            {avg !== null && (
              <div className="flex items-center gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
                <ProgressRing
                  pct={avg}
                  colour={avg >= passMark ? '#34d399' : '#fb923c'}
                  label={`Recent average ${avg}%, pass mark ${passMark}%`}
                >
                  <span className="text-[13px] font-semibold text-white">Average</span>
                  <span className="text-[26px] font-black leading-none tabular-nums text-white">
                    {avg}%
                  </span>
                  <span className="text-[12px] font-semibold text-white">pass {passMark}%</span>
                </ProgressRing>
                {/* The latest sitting beside the average, so the row is never half empty on a phone. */}
                {rows[0] && (
                  <button
                    type="button"
                    onClick={() => navigate(`/study-centre/mock-exams/history/${rows[0].id}`)}
                    className="group flex min-w-0 flex-1 flex-col items-start justify-center self-stretch rounded-2xl border border-white/[0.14] bg-white/[0.04] px-4 py-3 text-left transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.1] lg:hidden"
                  >
                    <span className="text-[13px] font-semibold text-white">
                      Last sitting · {fmtWhen(rows[0].created_at)}
                    </span>
                    <span
                      className={cn(
                        'mt-1 text-[26px] font-black leading-none tabular-nums',
                        rows[0].passed ? 'text-emerald-400' : 'text-orange-400'
                      )}
                    >
                      {Math.round(rows[0].percentage)}%
                    </span>
                    <span className="mt-1 line-clamp-2 text-[12.5px] font-medium leading-snug text-white">
                      {paperName(rows[0])}
                    </span>
                  </button>
                )}
                <PageHelpButton help={HELP} className="hidden lg:inline-flex" />
              </div>
            )}
            <div className="flex flex-col gap-2 sm:flex-row lg:col-start-1 lg:row-start-2">
              <button
                type="button"
                onClick={() => navigate(nextAction.to)}
                className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
              >
                {nextAction.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => navigate('/study-centre/mock-exams')}
                className={cn(COLLEGE_BTN, 'h-12 px-5')}
              >
                All mock exams
              </button>
            </div>
          </div>
        </section>

        {!signedIn ? (
          <p className={SC_CARD}>Sign in to see your mock exam history.</p>
        ) : error ? (
          <p className={SC_CARD}>{error}</p>
        ) : loading ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-busy>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[96px] animate-pulse rounded-2xl card-landing" />
            ))}
          </div>
        ) : rows.length === 0 ? null : (
          <>
            {/* ── What you've done ─────────────────────────────────────── */}
            <section className="space-y-3" aria-labelledby="mh-done">
              <CollegeSectionTitle id="mh-done" title="What you’ve done" />
              <ScStats
                items={[
                  {
                    label: 'Sittings',
                    value: rows.length >= 500 ? '500+' : String(rows.length),
                    sub: `${papers.length} ${papers.length === 1 ? 'paper' : 'papers'}`,
                  },
                  {
                    label: 'Passed',
                    value: `${Math.round((passes / rows.length) * 100)}%`,
                    sub: `${passes} of ${rows.length}`,
                    good: passes / rows.length >= 0.6,
                  },
                  {
                    label: 'Time practising',
                    value: minutes >= 120 ? `${Math.round(minutes / 60)}h` : `${minutes}m`,
                    sub: 'under exam timing',
                  },
                  {
                    label: 'Active weeks',
                    value: `${activeWeeks}/12`,
                    sub: 'weeks with a sitting',
                  },
                ]}
              />
              <div className={SC_CARD}>
                <div className="mb-3 flex items-baseline justify-between">
                  <p className="text-[13px] font-semibold text-white">Sittings per week</p>
                  <p className="text-[12px] text-white">Last 12 weeks</p>
                </div>
                <div
                  className="flex h-24 items-end gap-1.5"
                  role="img"
                  aria-label={`Sittings per week: ${weeks.map((w) => `${w.label} ${w.n}`).join(', ')}`}
                >
                  {weeks.map((w) => (
                    <div
                      key={w.label}
                      className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
                    >
                      {w.n > 0 && (
                        <span className="text-[12px] font-bold tabular-nums text-white">{w.n}</span>
                      )}
                      <div
                        className={cn(
                          'w-full rounded-t-md',
                          w.n === 0
                            ? 'bg-white/[0.1]'
                            : w.current
                              ? 'bg-elec-yellow'
                              : 'bg-white/70'
                        )}
                        style={{ height: w.n === 0 ? 4 : `${Math.max(10, (w.n / weekMax) * 80)}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between text-[12px] text-white">
                  <span>{weeks[0].label}</span>
                  <span>This week</span>
                </div>
              </div>
            </section>

            {/* ── Where you are ────────────────────────────────────────── */}
            <section className="space-y-3" aria-labelledby="mh-where">
              <CollegeSectionTitle
                id="mh-where"
                title="Where you are"
                sub="Forecasts use your last three sittings of each paper."
              />
              <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                {hero && heroForecast && (
                  <div className={cn(SC_CARD, 'relative overflow-hidden')}>
                    <Hairline />
                    <p className="text-[12px] font-medium text-white">
                      The paper you’re working on
                    </p>
                    <h2 className="mt-1 text-[20px] font-bold leading-tight text-white sm:text-[22px]">
                      {hero.name}
                    </h2>
                    <p className="mt-1 text-[13px] text-white">
                      {hero.attempts} {hero.attempts === 1 ? 'sitting' : 'sittings'} · best{' '}
                      {hero.best}% · last {fmtWhen(hero.last.created_at).toLowerCase()}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <ScoreBadge pct={hero.last.percentage} passed={hero.last.passed} size="lg" />
                      <div className="min-w-0">
                        <p
                          className={cn(
                            'flex items-center gap-2 text-[16px] font-bold',
                            forecastText[heroForecast.tone]
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              forecastDot[heroForecast.tone]
                            )}
                          />
                          {heroForecast.label}
                        </p>
                        <p className="mt-0.5 text-[13px] leading-snug text-white">
                          {heroForecast.sentence}
                        </p>
                        <Delta now={hero.last.percentage} before={hero.previous?.percentage} />
                      </div>
                    </div>
                    {hero.trend.length >= 2 && (
                      <TrendChart
                        values={hero.trend}
                        passMark={hero.last.pass_mark ?? 60}
                        className="mt-5 h-28"
                      />
                    )}
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      {heroRetake && (
                        <button
                          type="button"
                          onClick={() => navigate(heroRetake)}
                          className={cn(COLLEGE_BTN, 'sm:flex-1')}
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden />
                          Take it again
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => navigate(`/study-centre/mock-exams/history/${hero.last.id}`)}
                        className={cn(COLLEGE_BTN, 'sm:flex-1')}
                      >
                        Review last sitting
                      </button>
                    </div>
                  </div>
                )}

                <div className={SC_LIST}>
                  <p className="px-5 pb-2 pt-4 text-[13px] font-semibold text-white sm:px-6">
                    Every paper
                  </p>
                  {paperVerdicts.slice(0, 6).map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => navigate(`/study-centre/mock-exams/history/${p.last.id}`)}
                      className={SC_ROW}
                    >
                      <ScoreBadge pct={p.last.percentage} passed={p.last.passed} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block break-words leading-snug text-[14px] font-semibold text-white">
                          {p.name}
                        </span>
                        <span
                          className={cn(
                            'block text-[12.5px] font-semibold leading-snug',
                            forecastText[p.forecast.tone]
                          )}
                        >
                          {p.forecast.label} · {p.attempts}{' '}
                          {p.attempts === 1 ? 'sitting' : 'sittings'}
                        </span>
                      </span>
                      <Sparkline
                        values={p.trend}
                        passMark={p.last.pass_mark ?? 60}
                        className="hidden w-[72px] sm:block"
                      />
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  ))}
                  {paperVerdicts.length > 6 && (
                    <button
                      type="button"
                      onClick={() => {
                        setTab('papers');
                        document.getElementById('mh-all')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={cn(
                        SC_ROW,
                        'justify-center text-[13.5px] font-semibold text-elec-yellow'
                      )}
                    >
                      All {paperVerdicts.length} papers
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* ── How to get better ────────────────────────────────────── */}
            <section className="space-y-3" aria-labelledby="mh-better">
              <CollegeSectionTitle
                id="mh-better"
                title="How to get better"
                sub="From everything you’ve sat in the last year. Weakest first."
              />
              <HowToGetBetter history={history} dueCount={due} topicLimit={4} />
            </section>

            {/* ── Everything ───────────────────────────────────────────── */}
            <section className="space-y-4" aria-labelledby="mh-all" id="mh-all">
              <CollegeSectionTitle id="mh-all-title" title="Everything" />
              <div
                role="tablist"
                aria-label="View"
                className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
              >
                {(
                  [
                    ['papers', `Papers · ${papers.length}`],
                    ['topics', `Topics${topicRows.length ? ` · ${topicRows.length}` : ''}`],
                    ['attempts', `Sittings · ${rows.length}`],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={chipCn(tab === id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === 'papers' && (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {paperVerdicts.map((p) => (
                    <div
                      key={p.slug}
                      className="-mx-4 flex flex-col card-landing max-sm:!rounded-none max-sm:!border-x-0 p-5 sm:mx-0 sm:rounded-2xl"
                    >
                      <div className="flex items-start gap-3">
                        <ScoreBadge pct={p.last.percentage} passed={p.last.passed} />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-[15px] font-bold leading-snug text-white">
                            {p.name}
                          </p>
                          <p className="mt-0.5 text-[12.5px] text-white">
                            {p.attempts} {p.attempts === 1 ? 'sitting' : 'sittings'} · best {p.best}
                            % · {fmtWhen(p.last.created_at)}
                          </p>
                        </div>
                        <Sparkline
                          values={p.trend}
                          passMark={p.last.pass_mark ?? 60}
                          className="hidden w-[88px] sm:block"
                        />
                      </div>
                      <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-snug text-white">
                        <span
                          aria-hidden
                          className={cn(
                            'mt-1 h-2 w-2 shrink-0 rounded-full',
                            forecastDot[p.forecast.tone]
                          )}
                        />
                        {p.forecast.sentence}
                      </p>
                      <div className="mt-4 flex gap-2 sm:mt-auto sm:pt-4">
                        <button
                          type="button"
                          onClick={() => navigate(`/study-centre/mock-exams/history/${p.last.id}`)}
                          className={cn(COLLEGE_BTN, 'h-11 flex-1 px-3 text-[13px]')}
                        >
                          Last sitting
                        </button>
                        {p.retake && (
                          <button
                            type="button"
                            onClick={() => navigate(p.retake!)}
                            className={cn(COLLEGE_BTN, 'h-11 flex-1 px-3 text-[13px]')}
                          >
                            <RotateCcw className="h-4 w-4" aria-hidden />
                            Again
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'topics' &&
                (topicRows.length > 0 ? (
                  <div className={SC_LIST}>
                    {(showAllTopics ? topicRows : topicRows.slice(0, 15)).map((t) => (
                      <div
                        key={t.topic}
                        className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="min-w-0 break-words leading-snug text-[14.5px] font-semibold text-white">
                              {t.topic}
                            </span>
                            <span className="shrink-0 text-[14.5px] font-bold tabular-nums text-white">
                              {t.pct}%
                            </span>
                          </div>
                          <div
                            className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.1]"
                            role="img"
                            aria-label={`${t.topic}: ${t.right} of ${t.answered} right`}
                          >
                            <div
                              className={cn('h-full rounded-full', topicBar(t.pct))}
                              style={{ width: `${Math.max(t.pct, 3)}%` }}
                            />
                          </div>
                          <p className="mt-1 text-[12px] text-white">
                            {t.right} of {t.answered} right
                            {t.asked > t.answered && ` · ${t.asked - t.answered} skipped`}
                          </p>
                        </div>
                        {t.link && t.pct < 75 && (
                          <button
                            type="button"
                            onClick={() => navigate(t.link!.to)}
                            aria-label={`Study ${t.topic}: ${t.link.label}`}
                            className={cn(COLLEGE_BTN, 'h-11 shrink-0 px-3 text-[13px]')}
                          >
                            <BookOpen className="h-4 w-4" aria-hidden />
                            Study
                          </button>
                        )}
                      </div>
                    ))}
                    {topicRows.length > 15 && (
                      <button
                        type="button"
                        onClick={() => setShowAllTopics((v) => !v)}
                        className={cn(
                          SC_ROW,
                          'justify-center text-[13.5px] font-semibold text-elec-yellow'
                        )}
                      >
                        {showAllTopics ? 'Show fewer' : `Show all ${topicRows.length} topics`}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className={SC_CARD}>
                    No topic results yet. Sit any mock or topic test and your strongest and weakest
                    topics appear here.
                  </p>
                ))}

              {tab === 'attempts' && (
                <div className={SC_LIST}>
                  {attempts.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => navigate(`/study-centre/mock-exams/history/${r.id}`)}
                      className={SC_ROW}
                    >
                      <ScoreBadge pct={r.percentage} passed={r.passed} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="break-words leading-snug text-[14px] font-semibold text-white">
                            {paperName(r)}
                          </span>
                          {r.kind && KIND_LABEL[r.kind] && (
                            <span className="shrink-0 rounded-full border border-white/[0.2] px-2 py-0.5 text-[12px] font-semibold text-white">
                              {KIND_LABEL[r.kind]}
                            </span>
                          )}
                        </span>
                        <span className="block text-[12px] text-white">
                          {fmtWhen(r.created_at)}
                          {r.total_questions > 0 && ` · ${r.score} of ${r.total_questions} right`}
                          {r.time_taken_seconds > 0 && ` · ${fmtDuration(r.time_taken_seconds)}`}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  ))}
                  {rows.length > 25 && (
                    <button
                      type="button"
                      onClick={() => setShowAllAttempts((v) => !v)}
                      className={cn(
                        SC_ROW,
                        'justify-center text-[13.5px] font-semibold text-elec-yellow'
                      )}
                    >
                      {showAllAttempts ? 'Show fewer' : `Show all ${rows.length} sittings`}
                    </button>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </HubBody>
    </HubPage>
  );
}
