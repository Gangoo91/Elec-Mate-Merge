/**
 * LearningHome — the Learning tab of the apprentice hub (/apprentice/hub?tab=progress).
 *
 * Replaces the older learning tracker (XP hero, "predicted EPA grade", skill
 * radar, ten identical activity rows). This page answers four questions with
 * figures straight from the learner's own records:
 *
 *   What should I practise next?   accuracy per topic, from every quiz's
 *                                  category breakdown (quiz_results) and every
 *                                  mock (mock_topic_stats)
 *   How are my quizzes going?      quiz_results + seo_mock_attempts, newest first
 *   What is due?                   flashcards due for review, quizzes set by the tutor
 *   AM2                            sections at the practice bar (link only: the
 *                                  simulator is its own page)
 *
 * Achievements stay, tidied into one card. Nothing here is a grade prediction.
 */
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeStats } from '@/components/college/ui/CollegeUi';
import { ActivityChart, VisHead, VIS_CARD } from '@/components/college/student360/Student360Visuals';
import { P_BTN, P_BTN_PRIMARY } from '@/components/apprentice-hub/portfolio2/ui';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useMyAssignedQuizzes } from '@/hooks/useMyAssignedQuizzes';
import { useAchievementChecker } from '@/hooks/useAchievementChecker';
import { useAM2Sections } from '@/hooks/am2/useAM2Sections';
import { useAm2ExamDate } from '@/hooks/useAm2Readiness';
import { paperName, useMockHistory, useTopicStats } from '@/hooks/study-centre/useMockHistory';
import { studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import { flashcardSetMeta } from '@/data/flashcards';
import { AchievementGallery } from './AchievementGallery';

export const LEARNING_HELP: PageHelpContent = {
  id: 'apprentice-learning',
  title: 'Your learning',
  what: 'Your quizzes, mock exams, flashcards and AM2 practice in one place, with the topics to work on next.',
  steps: [
    {
      title: 'Practise what you got wrong',
      body: 'Practise next lists the topics where you have the lowest share of right answers across every quiz and mock. Practise your weak spots builds a paper from them.',
    },
    { title: 'Clear your flashcards', body: 'Cards come back when they are due. Reviewing them little and often is what makes them stick.' },
    { title: 'Do what your tutor set', body: 'Quizzes your tutor set appear here with their date. Open one to start or carry on.' },
    { title: 'Keep the AM2 in view', body: 'The AM2 card shows how many sections you have at the practice bar. Open the simulator to run one.' },
  ],
  notes: [
    {
      title: 'Your figures, not a forecast',
      body: 'Every number here comes from what you have done in the app. Nothing on this page predicts a grade.',
    },
  ],
};

interface ResultRow {
  key: string;
  name: string;
  pct: number;
  questions: number;
  at: string;
  passed?: boolean;
}

function fmtDay(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function LearningHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { results: quizResults, isLoading: quizLoading } = useQuizResults();
  const mocks = useMockHistory(60);
  const topicStats = useTopicStats();
  const { getAllDueCards, getSetProgress, loading: cardsLoading } = useFlashcardProgress();
  const { streak } = useStudyStreak();
  const { quizzes: assigned, loading: assignedLoading } = useMyAssignedQuizzes();
  const { data: am2, isLoading: am2Loading } = useAM2Sections();
  const { daysToGo } = useAm2ExamDate();
  const { checkAchievements, getAllAchievements, getUnlockedCount, getTotalCount, nextUp } = useAchievementChecker();

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  /* ── Results: quizzes and mocks, one list, newest first ─────────────── */
  const results = useMemo<ResultRow[]>(() => {
    const out: ResultRow[] = (quizResults ?? []).map((r) => ({
      key: `q-${r.id}`,
      name: paperName({ exam_name: null, exam_slug: r.assessment_id }),
      pct: Math.round(Number(r.percentage) || 0),
      questions: r.total_questions,
      at: r.completed_at,
    }));
    // A paper can be logged in both tables; keep one when the same paper and
    // score land within two minutes of each other.
    for (const m of mocks.rows) {
      const pct = Math.round(m.percentage);
      const t = Date.parse(m.created_at);
      const dup = out.some(
        (r) =>
          r.pct === pct &&
          r.name === paperName(m) &&
          Math.abs(Date.parse(r.at) - t) < 2 * 60_000
      );
      if (!dup)
        out.push({ key: `m-${m.id}`, name: paperName(m), pct, questions: m.total_questions, at: m.created_at, passed: m.passed });
    }
    return out.sort((a, b) => b.at.localeCompare(a.at));
  }, [quizResults, mocks.rows]);

  const last10 = results.slice(0, 10);
  const avg10 = last10.length ? Math.round(last10.reduce((n, r) => n + r.pct, 0) / last10.length) : null;
  const chart = useMemo(
    () =>
      results
        .slice(0, 12)
        .reverse()
        .map((r, i) => ({ i, label: fmtDay(r.at), pct: r.pct, name: r.name })),
    [results]
  );

  /* ── Topics: share of right answers per topic ───────────────────────── */
  const topics = useMemo(() => {
    const by = new Map<string, { topic: string; answered: number; right: number; link: { label: string; to: string } | null }>();
    for (const r of quizResults ?? []) {
      const b = r.category_breakdown as Record<string, { total?: number; correct?: number }> | null;
      if (!b || typeof b !== 'object') continue;
      for (const [topic, v] of Object.entries(b)) {
        const total = Number(v?.total) || 0;
        if (!total) continue;
        const cur = by.get(topic) ?? { topic, answered: 0, right: 0, link: null };
        cur.answered += total;
        cur.right += Number(v?.correct) || 0;
        by.set(topic, cur);
      }
    }
    for (const t of topicStats.stats) {
      const cur = by.get(t.topic) ?? { topic: t.topic, answered: 0, right: 0, link: null };
      cur.answered += t.answered;
      cur.right += t.right;
      cur.link = cur.link ?? studyLinkFor(t.examSlug, t.section, t.module, t.topic);
      by.set(t.topic, cur);
    }
    return [...by.values()]
      .filter((t) => t.answered >= 2)
      .map((t) => ({ ...t, pct: Math.round((t.right / t.answered) * 100) }))
      .sort((a, b) => a.pct - b.pct || b.answered - a.answered);
  }, [quizResults, topicStats.stats]);
  const weakest = topics.slice(0, 6);

  /* ── Flashcards ──────────────────────────────────────────────────────── */
  const due = cardsLoading ? 0 : getAllDueCards().length;
  const cards = useMemo(() => {
    let mastered = 0;
    let total = 0;
    for (const s of flashcardSetMeta) {
      total += s.count;
      mastered += getSetProgress(s.id, s.count).masteredCards;
    }
    return { mastered, total };
  }, [getSetProgress]);

  /* ── Set by your tutor ───────────────────────────────────────────────── */
  const openAssigned = useMemo(
    () =>
      assigned
        .filter((q) => q.status !== 'completed')
        .sort((a, b) => (a.due_date ?? '9999').localeCompare(b.due_date ?? '9999'))
        .slice(0, 5),
    [assigned]
  );
  const overdueAssigned = assigned.filter((q) => q.status === 'overdue').length;

  const am2Runs = am2?.allRuns ?? am2?.sections.reduce((n, s) => n + s.runs, 0) ?? 0;

  return (
    <div className="space-y-5 py-5 sm:py-6 lg:space-y-6 lg:py-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">Your learning</h1>
            <PageHelpButton help={LEARNING_HELP} />
          </div>
          <p className="mt-1 max-w-3xl text-[14px] leading-snug text-white">
            Quizzes, mock exams, flashcards and AM2 practice, and the topics to work on next.
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button type="button" className={P_BTN} onClick={() => navigate('/study-centre/mock-exams')}>
            Mock exams
          </button>
          <button type="button" className={P_BTN} onClick={() => navigate('/study-centre')}>
            Study Centre
          </button>
        </div>
      </header>

      <CollegeStats
        items={[
          {
            label: 'Quizzes and mocks',
            value: String(results.length),
            sub: avg10 === null ? 'None taken yet' : `${avg10}% average, last ${last10.length}`,
          },
          {
            label: 'Flashcards due',
            value: cardsLoading ? '–' : String(due),
            sub: `${cards.mastered.toLocaleString('en-GB')} of ${cards.total.toLocaleString('en-GB')} mastered`,
            warn: due > 20,
            onClick: () => navigate('/study-centre/flashcards'),
          },
          {
            label: 'Study streak',
            value: `${streak.currentStreak} ${streak.currentStreak === 1 ? 'day' : 'days'}`,
            sub: `Longest ${streak.longestStreak} ${streak.longestStreak === 1 ? 'day' : 'days'}`,
          },
          {
            label: 'AM2 sections ready',
            value: am2Loading ? '–' : `${am2?.readyCount ?? 0} of ${am2?.sections.length ?? 5}`,
            sub: am2Runs ? `${am2Runs} ${am2Runs === 1 ? 'run' : 'runs'} in the simulator` : 'Not started',
            onClick: () => navigate('/apprentice/am2-simulator'),
          },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Practise next */}
        <section className={cn(VIS_CARD, 'lg:col-span-2')}>
          <VisHead
            title="Practise next"
            sub={
              weakest.length
                ? 'Your lowest-scoring topics across every quiz and mock'
                : 'Take a quiz or mock and your weakest topics show here'
            }
          />
          {quizLoading && topics.length === 0 ? (
            <div className="mt-4 h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
          ) : weakest.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-white/[0.14] px-5 py-6 text-[13px] leading-relaxed text-white">
              Nothing to go on yet. A mock exam is the quickest way to find the topics to work on.
            </div>
          ) : (
            <ul className="mt-4 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {weakest.map((t) => (
                <li key={t.topic} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[13.5px] font-semibold text-white">{t.topic}</span>
                    <span className={cn('shrink-0 text-[13px] font-semibold tabular-nums', t.pct < 50 ? 'text-orange-300' : 'text-white')}>
                      {t.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className={cn('h-full rounded-full', t.pct < 50 ? 'bg-orange-400' : t.pct < 75 ? 'bg-elec-yellow' : 'bg-emerald-400')}
                      style={{ width: `${Math.max(3, t.pct)}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3 text-[12px] text-white">
                    <span>
                      {t.right} of {t.answered} right
                    </span>
                    {t.link && (
                      <button
                        type="button"
                        onClick={() => navigate(t.link!.to)}
                        className="-my-3 inline-flex h-11 items-center gap-1 font-semibold text-elec-yellow touch-manipulation"
                      >
                        Revise <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className={P_BTN_PRIMARY} onClick={() => navigate('/study-centre/mock-exams/targeted')}>
              Practise your weak spots
            </button>
            <button type="button" className={P_BTN} onClick={() => navigate('/study-centre/mock-exams/history')}>
              Mock exam history
            </button>
          </div>
        </section>

        {/* Flashcards and AM2 */}
        <div className="grid gap-4 lg:gap-5">
          <section className={VIS_CARD}>
            <VisHead title="Flashcards" sub="Spaced review: cards come back when they are due" />
            <p className="mt-4 flex items-baseline gap-2">
              <span className={cn('text-[34px] font-bold leading-none tabular-nums', due > 20 ? 'text-orange-400' : 'text-white')}>
                {cardsLoading ? '–' : due}
              </span>
              <span className="text-[13.5px] text-white">due for review</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-elec-yellow"
                style={{ width: `${cards.total ? Math.max(cards.mastered ? 2 : 0, (cards.mastered / cards.total) * 100) : 0}%` }}
              />
            </div>
            <p className="mt-1.5 text-[12px] text-white">
              {cards.mastered.toLocaleString('en-GB')} of {cards.total.toLocaleString('en-GB')} cards mastered
            </p>
            <button
              type="button"
              className={cn(due > 0 ? P_BTN_PRIMARY : P_BTN, 'mt-4 w-full')}
              onClick={() => navigate('/study-centre/flashcards')}
            >
              {due > 0 ? `Review ${due} due ${due === 1 ? 'card' : 'cards'}` : 'Start a deck'}
            </button>
          </section>

          <button
            type="button"
            onClick={() => navigate('/apprentice/am2-simulator')}
            className={cn(VIS_CARD, 'group block w-full text-left touch-manipulation transition-colors hover:border-white/[0.2]')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">AM2 practice</h3>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                  {daysToGo !== null && daysToGo >= 0
                    ? `Your AM2 is in ${daysToGo} ${daysToGo === 1 ? 'day' : 'days'}`
                    : 'Sections at the practice bar on your recent runs'}
                </p>
              </div>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
            </div>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {(am2?.sections ?? []).map((s) => (
                <span
                  key={s.key}
                  title={`${s.title}: ${s.status === 'ready' ? 'ready' : s.status === 'practising' ? 'practising' : 'not tried'}`}
                  className={cn(
                    'h-2.5 flex-1 rounded-full',
                    s.status === 'ready' ? 'bg-emerald-400' : s.status === 'practising' ? 'bg-elec-yellow' : 'bg-white/[0.12]'
                  )}
                />
              ))}
            </div>
            <p className="mt-2 text-[12.5px] text-white">
              {am2Loading
                ? 'Checking your runs…'
                : am2Runs === 0
                  ? 'Not started. Open the simulator and try a section.'
                  : `${am2?.readyCount ?? 0} of ${am2?.sections.length ?? 5} sections ready${am2?.next ? `. Next: ${am2.next.title}` : ''}`}
            </p>
          </button>
        </div>

        {/* Results */}
        <section className={cn(VIS_CARD, 'lg:col-span-2')}>
          <VisHead
            title="Quiz and mock results"
            sub={results.length ? `Your last ${Math.min(12, results.length)}, oldest on the left` : undefined}
            onOpen={results.length ? () => navigate('/study-centre/mock-exams/history') : undefined}
          />
          {results.length === 0 ? (
            <p className="mt-4 text-[13px] leading-relaxed text-white">
              No quizzes or mocks yet. Every one you take shows here with its score.
            </p>
          ) : (
            <div className="mt-2 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="-mx-2 h-48">
                <ResponsiveContainer>
                  <BarChart data={chart} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.95)' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.95)' }} tickLine={false} axisLine={false} width={48} unit="%" ticks={[0, 25, 50, 75, 100]} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.75rem', fontSize: 12 }}
                      labelStyle={{ color: 'rgba(255,255,255,0.95)' }}
                      itemStyle={{ color: 'rgba(255,255,255,0.95)' }}
                      formatter={(v: number, _n: string, p: { payload?: { name?: string } }) => [`${v}%`, p?.payload?.name ?? 'Score']}
                    />
                    <Bar dataKey="pct" radius={[5, 5, 0, 0]}>
                      {chart.map((d) => (
                        <Cell key={d.i} fill={d.pct >= 75 ? 'hsl(142 69% 58%)' : d.pct >= 50 ? 'hsl(47 100% 50%)' : 'hsl(27 96% 61%)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {results.slice(0, 5).map((r) => (
                  <li key={r.key} className="flex items-center gap-3 py-2.5 first:pt-0">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold text-white">{r.name}</span>
                      <span className="block text-[12px] text-white">
                        {fmtDay(r.at)} · {r.questions} questions
                      </span>
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-[15px] font-bold tabular-nums',
                        r.pct >= 75 ? 'text-emerald-300' : r.pct >= 50 ? 'text-white' : 'text-orange-300'
                      )}
                    >
                      {r.pct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Set by your tutor */}
        <section className={VIS_CARD}>
          <VisHead
            title="Set by your tutor"
            sub={
              assignedLoading
                ? 'Checking…'
                : openAssigned.length
                  ? `${assigned.filter((q) => q.status !== 'completed').length} to do${overdueAssigned ? `, ${overdueAssigned} late` : ''}`
                  : 'Nothing waiting'
            }
          />
          {!assignedLoading && openAssigned.length === 0 ? (
            <p className="mt-4 text-[13px] leading-relaxed text-white">
              {assigned.length
                ? `All ${assigned.length} quizzes your tutor set are done.`
                : 'When your tutor sets a quiz or mock, it shows here with its date.'}
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-white/[0.06]">
              {openAssigned.map((q) => (
                <li key={q.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/apprentice/college/quiz/${q.id}`)}
                    className="group flex min-h-[56px] w-full items-center gap-3 py-2.5 text-left touch-manipulation"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block line-clamp-2 text-[13.5px] font-semibold leading-snug text-white">{q.title}</span>
                      <span className={cn('block text-[12px]', q.status === 'overdue' ? 'text-orange-300' : 'text-white')}>
                        {q.status === 'overdue' ? 'Late' : q.status === 'in_progress' ? 'Started' : 'Not started'}
                        {q.due_date ? ` · due ${fmtDay(q.due_date)}` : ''}
                        {q.tutor_name ? ` · ${q.tutor_name}` : ''}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">
                      {q.status === 'in_progress' ? 'Carry on' : 'Start'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Time learning in the app */}
        <div className="lg:col-span-2">
          <ActivityChart userId={user?.id ?? null} first="You" />
        </div>

        {/* Achievements, tidy */}
        <section className={VIS_CARD} id="achievements">
          <AchievementGallery
            achievements={getAllAchievements()}
            unlockedCount={getUnlockedCount()}
            totalCount={getTotalCount()}
            nextUp={nextUp}
          />
        </section>
      </div>
    </div>
  );
}

export default LearningHome;
