/**
 * Every mock exam you've sat (ELE-1815).
 *
 * Per paper first — attempts, best, last, the trend and a way back in — then
 * every attempt in date order, each opening its review. Before this there was
 * no screen at all: a result was gone once its page closed.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import {
  paperName,
  useMockHistory,
  useRevisionPile,
  useTopicStats,
  type PileItem,
} from '@/hooks/study-centre/useMockHistory';
import { retakePathFor, studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import {
  Delta,
  MH_CARD,
  ScoreBadge,
  Sparkline,
  fmtWhen,
} from '@/components/study-centre/mock-history/MockBits';

export default function MockHistoryPage() {
  useSEO('Mock exam history | Study Centre', 'Every mock exam you’ve sat, and what to revise.');
  const navigate = useNavigate();
  const { rows, papers, loading, error, signedIn } = useMockHistory(200);
  // Full pile here (this page is where you plan revision): it feeds the weak
  // spots as well as the count.
  const pile = useRevisionPile();

  // Weak spots across every mock: the pile grouped by topic, most first, each
  // with where to study it (Jack: "tell me what to revise").
  const weakSpots = useMemo(() => {
    const by = new Map<string, { topic: string; count: number; sample: PileItem }>();
    for (const it of pile.items.filter((x) => x.due)) {
      const topic = it.t || it.paper;
      const cur = by.get(topic) ?? { topic, count: 0, sample: it };
      cur.count += 1;
      by.set(topic, cur);
    }
    return [...by.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((w) => ({
        ...w,
        link: studyLinkFor(w.sample.x ?? w.sample.examSlug, w.sample.s, w.sample.m, w.sample.t),
      }));
  }, [pile.items]);

  // Accuracy per topic across every mock (ELE-1815 round 4) — a percentage
  // of what was asked, not a count of misses. Attempts from before 7 Oct have
  // no topic stats, so the pile grouping above stays as the fallback.
  const topicStats = useTopicStats();
  const topicRows = useMemo(() => {
    const pileByTopic = new Map<string, number>();
    for (const it of pile.items.filter((x) => x.due)) {
      const t = it.t || it.paper;
      pileByTopic.set(t, (pileByTopic.get(t) ?? 0) + 1);
    }
    return [...topicStats.stats]
      .sort((a, b) => a.pct - b.pct || b.answered - a.answered)
      .map((t) => ({
        ...t,
        toRevise: pileByTopic.get(t.topic) ?? 0,
        link: studyLinkFor(t.examSlug, t.section, t.module, t.topic),
      }));
  }, [topicStats.stats, pile.items]);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const summary = useMemo(() => {
    const last10 = rows.slice(0, 10);
    return {
      attempts: rows.length,
      passes: rows.filter((r) => r.passed).length,
      avg: last10.length
        ? Math.round(last10.reduce((n, r) => n + r.percentage, 0) / last10.length)
        : null,
    };
  }, [rows]);

  return (
    <HubPage>
      <HubMasthead section="Study Centre" title="Mock exam history" backTo="/study-centre" />
      <HubBody>
        {!signedIn ? (
          <p className="text-[14px] text-white">Sign in to see your mock exam history.</p>
        ) : loading ? (
          <div className="flex justify-center py-16" aria-label="Loading">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : error ? (
          <p className="text-[14px] text-white">{error}</p>
        ) : rows.length === 0 ? (
          <div className={cn(MH_CARD, 'p-5')}>
            <p className="text-[14px] leading-relaxed text-white">
              No mock exams yet. Sit one and it lands here with every question you got wrong.
            </p>
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams')}
              className="mt-3 h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
            >
              Choose a mock exam
            </button>
          </div>
        ) : (
          <>
            {/* At a glance — solid colour bars, like the rest of the app */}
            <section className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="At a glance">
              {[
                {
                  bar: 'bg-elec-yellow',
                  v: summary.attempts,
                  l: summary.attempts === 1 ? 'attempt' : 'attempts',
                },
                {
                  bar: 'bg-emerald-400',
                  v: summary.passes,
                  l: summary.passes === 1 ? 'pass' : 'passes',
                },
                {
                  bar: 'bg-sky-400',
                  v: summary.avg === null ? '—' : `${summary.avg}%`,
                  l: 'average, last 10',
                },
                {
                  bar: 'bg-orange-400',
                  v: pile.loading ? '…' : pile.count,
                  l: 'questions to revise',
                },
              ].map((g) => (
                <div key={g.bar} className={cn(MH_CARD, 'relative overflow-hidden px-4 pb-3 pt-4')}>
                  <span aria-hidden className={cn('absolute inset-x-0 top-0 h-1', g.bar)} />
                  <p className="text-[24px] font-bold leading-none tabular-nums text-white">
                    {g.v}
                  </p>
                  <p className="mt-1.5 text-[12px] text-white">{g.l}</p>
                </div>
              ))}
            </section>

            {pile.count > 0 && (
              <section
                className={cn(
                  MH_CARD,
                  'flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5'
                )}
              >
                <p className="flex-1 text-[14px] leading-snug text-white">
                  <span className="font-bold">{pile.count}</span>{' '}
                  {pile.count === 1 ? 'question' : 'questions'} you got wrong{' '}
                  {pile.count === 1 ? 'is' : 'are'} due now. Each one comes back after a day, then
                  three, then a week — get it right each time and it’s learned. On every device.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/study-centre/mock-exams/revise')}
                  className="h-12 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
                >
                  Revise my wrong answers
                </button>
              </section>
            )}

            {/* A whole paper aimed at the weak spots: some you got wrong, the rest new. */}
            {pile.items.length > 0 && (
              <section
                className={cn(
                  MH_CARD,
                  'relative flex flex-col gap-3 overflow-hidden p-4 sm:flex-row sm:items-center sm:p-5'
                )}
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-violet-400" />
                <div className="flex-1 pl-1">
                  <p className="text-[15px] font-bold text-white">Weak spots mock</p>
                  <p className="text-[13.5px] leading-snug text-white">
                    20 questions from your weakest topics — some you’ve got wrong before, the rest
                    ones you haven’t seen. Timed, and saved to your history like any paper.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/study-centre/mock-exams/targeted')}
                  className="h-12 rounded-xl bg-white px-5 text-[15px] font-bold text-black touch-manipulation"
                >
                  Sit a weak spots mock
                </button>
              </section>
            )}

            {/* Weak spots across every mock */}
            {topicRows.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-end justify-between gap-3">
                  <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                    How you’re doing by topic
                  </h2>
                  <p className="text-[12px] text-white">Weakest first</p>
                </div>
                <div className={cn(MH_CARD, 'p-4 sm:p-5')}>
                  <ul className="grid gap-x-6 gap-y-3 lg:grid-cols-2">
                    {(showAllTopics ? topicRows : topicRows.slice(0, 8)).map((t) => {
                      const bar =
                        t.pct >= 75
                          ? 'bg-emerald-400'
                          : t.pct >= 60
                            ? 'bg-sky-400'
                            : 'bg-orange-400';
                      return (
                        <li key={t.topic} className="space-y-1.5">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="min-w-0 truncate text-[14px] font-semibold text-white">
                              {t.topic}
                            </span>
                            <span className="shrink-0 text-[13px] font-bold tabular-nums text-white">
                              {t.pct}%
                            </span>
                          </div>
                          <div
                            className="h-2 overflow-hidden rounded-full bg-white/[0.1]"
                            role="img"
                            aria-label={`${t.topic}: ${t.right} of ${t.answered} answered right`}
                          >
                            <div
                              className={cn('h-full rounded-full', bar)}
                              style={{ width: `${Math.max(t.pct, 3)}%` }}
                            />
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[12px] text-white">
                              {t.right} of {t.answered} right
                              {t.asked > t.answered && ` · ${t.asked - t.answered} skipped`}
                              {t.toRevise > 0 && ` · ${t.toRevise} to revise`}
                            </span>
                            <span className="flex gap-1.5">
                              {t.link && t.pct < 75 && (
                                <button
                                  type="button"
                                  onClick={() => navigate(t.link!.to)}
                                  aria-label={`Study ${t.topic}: ${t.link.label}`}
                                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-white/[0.22] px-2.5 text-[12.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                                >
                                  <BookOpen className="h-3.5 w-3.5" aria-hidden />
                                  Study
                                </button>
                              )}
                              {t.toRevise > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/study-centre/mock-exams/revise?topic=${encodeURIComponent(t.topic)}`
                                    )
                                  }
                                  className="h-9 rounded-lg bg-elec-yellow px-2.5 text-[12.5px] font-bold text-black touch-manipulation"
                                >
                                  Revise {t.toRevise}
                                </button>
                              )}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {topicRows.length > 8 && (
                    <button
                      type="button"
                      onClick={() => setShowAllTopics((v) => !v)}
                      className="mt-4 h-10 w-full rounded-lg border border-white/[0.18] text-[13px] font-semibold text-white touch-manipulation"
                    >
                      {showAllTopics ? 'Show fewer' : `Show all ${topicRows.length} topics`}
                    </button>
                  )}
                </div>
              </section>
            )}

            {topicRows.length === 0 && weakSpots.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                  Your weak spots
                </h2>
                <div className={cn(MH_CARD, 'p-4 sm:p-5')}>
                  <p className="mb-3 text-[13.5px] text-white">
                    Where your wrong answers are piling up, across every mock you’ve sat:
                  </p>
                  <ul className="grid gap-2 lg:grid-cols-2">
                    {weakSpots.map((w) => (
                      <li
                        key={w.topic}
                        className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-white/[0.12] bg-white/[0.03] p-3"
                      >
                        <span className="flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg bg-orange-400 px-2 text-[14px] font-bold text-black">
                          {w.count}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-semibold text-white">
                            {w.topic}
                          </span>
                          {w.sample.t && (
                            <span className="block text-[12px] text-white">{w.sample.paper}</span>
                          )}
                        </span>
                        <span className="flex gap-2">
                          {w.link && (
                            <button
                              type="button"
                              onClick={() => navigate(w.link!.to)}
                              aria-label={`Study ${w.topic}: ${w.link.label}`}
                              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/[0.22] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                            >
                              <BookOpen className="h-4 w-4" aria-hidden />
                              Study
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/study-centre/mock-exams/revise?topic=${encodeURIComponent(w.topic)}`
                              )
                            }
                            className="h-10 rounded-lg bg-elec-yellow px-3 text-[13px] font-bold text-black touch-manipulation"
                          >
                            Revise {w.count}
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Per paper */}
            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                Your papers
              </h2>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {papers.map((p) => {
                  const retake = retakePathFor(p.slug, p.retakePath);
                  return (
                    <div key={p.slug} className={cn(MH_CARD, 'flex flex-col gap-3 p-4')}>
                      <div className="flex items-start gap-3">
                        <ScoreBadge pct={p.last.percentage} passed={p.last.passed} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-bold text-white">{p.name}</p>
                          <p className="text-[12.5px] text-white">
                            {p.attempts} {p.attempts === 1 ? 'attempt' : 'attempts'} · best {p.best}
                            % · {fmtWhen(p.last.created_at)}
                          </p>
                          <Delta now={p.last.percentage} before={p.previous?.percentage} />
                        </div>
                        <Sparkline values={p.trend} passMark={p.last.pass_mark ?? 60} />
                      </div>
                      <Forecast
                        trend={p.trend}
                        passMark={p.last.pass_mark ?? 60}
                        total={p.last.total_questions}
                      />
                      <div className="mt-auto flex gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/study-centre/mock-exams/history/${p.last.id}`)}
                          className="h-10 flex-1 rounded-lg bg-white px-3 text-[13px] font-semibold text-black touch-manipulation"
                        >
                          Last attempt
                        </button>
                        {retake && (
                          <button
                            type="button"
                            onClick={() => navigate(retake)}
                            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.22] px-3 text-[13px] font-semibold text-white touch-manipulation"
                          >
                            <RotateCcw className="h-4 w-4" aria-hidden />
                            Take again
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Every attempt */}
            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                Every attempt
              </h2>
              <ul className={cn(MH_CARD, 'divide-y divide-white/[0.08] overflow-hidden')}>
                {rows.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => navigate(`/study-centre/mock-exams/history/${r.id}`)}
                      className="flex min-h-[60px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation hover:bg-white/[0.03] sm:px-5"
                    >
                      <ScoreBadge pct={r.percentage} passed={r.passed} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold text-white">
                          {paperName(r)}
                        </span>
                        <span className="block text-[12px] text-white">
                          {fmtWhen(r.created_at)} · {r.score}/{r.total_questions} right
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </HubBody>
    </HubPage>
  );
}

/**
 * Pass forecast from the last three attempts on a paper against its own pass
 * mark: on track, nearly there, or how many more right answers a sitting needs.
 */
function Forecast({
  trend,
  passMark,
  total,
}: {
  trend: number[];
  passMark: number;
  total: number;
}) {
  const recent = trend.slice(-3);
  if (recent.length < 2) {
    return (
      <p className="text-[12.5px] text-white">
        Sit it again for a pass forecast — one attempt isn’t a trend yet.
      </p>
    );
  }
  const avgRaw = recent.reduce((n, v) => n + v, 0) / recent.length;
  const avg = Math.round(avgRaw);
  // From the unrounded average: marks needed minus marks being scored.
  const more = Math.max(1, Math.ceil((passMark / 100) * total - (avgRaw / 100) * total - 1e-9));
  const tone = avgRaw >= passMark + 5 ? 'done' : avgRaw >= passMark ? 'close' : 'short';
  return (
    <p className="flex items-start gap-2 text-[12.5px] leading-snug text-white">
      <span
        aria-hidden
        className={cn(
          'mt-1 h-2 w-2 shrink-0 rounded-full',
          tone === 'done' ? 'bg-emerald-400' : tone === 'close' ? 'bg-sky-400' : 'bg-orange-400'
        )}
      />
      <span>
        {tone === 'done'
          ? `On track — averaging ${avg}% over your last ${recent.length}, pass mark ${passMark}%.`
          : tone === 'close'
            ? `Just over the line — averaging ${avg}% against ${passMark}%. One bad sitting and it’s a fail.`
            : `Not there yet — averaging ${avg}% against ${passMark}%. About ${more} more right ${more === 1 ? 'answer' : 'answers'} a sitting would do it.`}
      </span>
    </p>
  );
}
