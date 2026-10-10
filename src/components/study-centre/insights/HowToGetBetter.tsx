/**
 * "How to get better" — the Study Centre's answer to "what do I do about my
 * score?" (ELE-2024). Andrew: the front page should "have stats and how they
 * can be better".
 *
 * One card, three parts, every line ending in something to tap:
 *   1. The verdict on the paper they're working on (pass forecast).
 *   2. Their three weakest topics by accuracy, each with Study and Practise.
 *   3. The one action that moves the number: revise what's due, or a weak
 *      spots mock when nothing is due.
 *
 * Reads only what the mock history hooks already load; no new queries.
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTopicStats, type useMockHistory } from '@/hooks/study-centre/useMockHistory';
import { studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import { forecastFor, forecastText, mainPaper, topicBar } from '@/lib/study-centre/mockInsights';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { Hairline } from '@/components/study-centre/ui/StudyKit';

type History = ReturnType<typeof useMockHistory>;

export function HowToGetBetter({
  history,
  dueCount,
  className,
  topicLimit = 3,
}: {
  history: History;
  /** Questions due in the revision pile (from useRevisionPile countOnly). */
  dueCount: number;
  className?: string;
  topicLimit?: number;
}) {
  const navigate = useNavigate();
  const topicStats = useTopicStats();
  const paper = useMemo(
    () => mainPaper(history.papers, history.rows),
    [history.papers, history.rows]
  );
  const forecast = paper
    ? forecastFor(paper.trend, paper.last.pass_mark ?? 60, paper.last.total_questions)
    : null;

  // Weakest first, ignoring topics with too few answers to mean anything.
  const weakest = useMemo(
    () =>
      [...topicStats.stats]
        .filter((t) => t.answered >= 3 && t.pct < 75)
        .sort((a, b) => a.pct - b.pct || b.answered - a.answered)
        .slice(0, topicLimit)
        .map((t) => ({ ...t, link: studyLinkFor(t.examSlug, t.section, t.module, t.topic) })),
    [topicStats.stats, topicLimit]
  );

  if (!history.signedIn || history.loading) return null;

  if (history.rows.length === 0) {
    return (
      <div
        className={cn(
          '-mx-4 card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl',
          className
        )}
      >
        <div className="p-5 sm:p-6">
          <p className="text-[15px] font-semibold text-white">Sit a mock to see where you stand</p>
          <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-white">
            Your first mock exam gives you a score against the pass mark, your weakest topics, and
            every question you got wrong ready to revise. It takes about 30 minutes.
          </p>
          <button
            type="button"
            onClick={() => navigate('/study-centre/mock-exams')}
            className={cn(COLLEGE_BTN_PRIMARY, 'mt-4')}
          >
            Choose a mock exam
          </button>
        </div>
      </div>
    );
  }

  // The verdict's gauge: the recent average on this paper against its pass mark.
  const passMark = paper?.last.pass_mark ?? 60;
  const recent = paper?.trend.slice(-3) ?? [];
  const avg = recent.length ? Math.round(recent.reduce((a, b) => a + b, 0) / recent.length) : null;
  const passing = avg !== null && avg >= passMark;

  return (
    <div
      className={cn(
        'relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl',
        className
      )}
    >
      <Hairline />
      {/* 1 — the verdict, with where you stand against the pass mark */}
      {paper && forecast && (
        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center lg:gap-8">
          <div className="min-w-0">
            <p className="text-[12.5px] font-medium text-white">{paper.name}</p>
            <p
              className={cn(
                'mt-0.5 text-[20px] font-bold leading-tight tracking-tight',
                forecastText[forecast.tone]
              )}
            >
              {forecast.label}
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-white">{forecast.sentence}</p>
          </div>
          {avg !== null && (
            <div
              className="min-w-0"
              role="img"
              aria-label={`Recent average ${avg}%, pass mark ${passMark}%`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] font-semibold text-white">Recent average</span>
                <span
                  className={cn(
                    'text-[24px] font-black leading-none tabular-nums',
                    passing ? 'text-emerald-400' : 'text-orange-400'
                  )}
                >
                  {avg}%
                </span>
              </div>
              <div className="relative mt-2.5 h-2.5 rounded-full bg-white/[0.1]">
                <div
                  className={cn(
                    'h-full rounded-full',
                    passing ? 'bg-emerald-400' : 'bg-orange-400'
                  )}
                  style={{ width: `${Math.max(Math.min(avg, 100), 3)}%` }}
                />
                <span
                  aria-hidden
                  className="absolute -top-1 h-[18px] w-0.5 rounded-full bg-white"
                  style={{ left: `${passMark}%` }}
                />
              </div>
              <div className="relative mt-1.5 h-4">
                <span
                  className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[12px] font-medium text-white"
                  style={{ left: `${passMark}%` }}
                >
                  Pass {passMark}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2 — weakest topics. A divided list, not a card per topic: on a phone
          the tiles stacked into a tall column of boxes inside a box, each with
          a full-width button (Andrew, 10 Oct: "design this better on
          mobiles"). Score on the right, bar under, two text actions. */}
      {weakest.length > 0 && (
        <div className="border-t border-white/[0.08] px-5 pt-5 sm:px-6">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[14px] font-semibold text-white">Your weakest topics</p>
            <p className="text-[12px] font-medium text-white">Last 12 months</p>
          </div>
          <ul className="mt-1 divide-y divide-white/[0.08]">
            {weakest.map((t) => (
              <li
                key={t.topic}
                className="py-3.5 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,180px)_auto] sm:items-center sm:gap-6"
              >
                <div className="flex min-w-0 items-start justify-between gap-3 sm:contents">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-white">
                      {t.topic}
                    </p>
                    <p className="mt-0.5 text-[12.5px] font-medium text-white">
                      {t.right} of {t.answered} right
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 sm:order-none">
                    <div
                      className="hidden h-1.5 w-full min-w-[120px] overflow-hidden rounded-full bg-white/[0.1] sm:block"
                      aria-hidden
                    >
                      <div
                        className={cn('h-full rounded-full', topicBar(t.pct))}
                        style={{ width: `${Math.max(t.pct, 3)}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-[20px] font-bold leading-none tabular-nums text-orange-400">
                      {t.pct}%
                    </span>
                  </div>
                </div>
                <div
                  className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.1] sm:hidden"
                  aria-hidden
                >
                  <div
                    className={cn('h-full rounded-full', topicBar(t.pct))}
                    style={{ width: `${Math.max(t.pct, 3)}%` }}
                  />
                </div>
                <div className="-mb-1 mt-1 flex gap-5 sm:mb-0 sm:mt-0 sm:justify-end">
                  {/* A 10-question paper on just this topic (the revise page only
                      shows answers that are due, so it was often empty). */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/study-centre/mock-exams/targeted?topic=${encodeURIComponent(t.topic)}`
                      )
                    }
                    aria-label={`Practise ${t.topic}`}
                    className="inline-flex h-11 items-center gap-1 text-[13.5px] font-semibold text-elec-yellow touch-manipulation active:opacity-70"
                  >
                    Practise
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                  {t.link && (
                    <button
                      type="button"
                      onClick={() => navigate(t.link!.to)}
                      aria-label={`Study ${t.topic}: ${t.link.label}`}
                      className="inline-flex h-11 items-center gap-1 text-[13.5px] font-semibold text-white touch-manipulation active:opacity-70"
                    >
                      Study the lesson
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3 — the one thing that moves the number */}
      <div className="flex flex-col gap-3 border-t border-white/[0.08] p-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <p className="min-w-0 text-[14px] leading-snug text-white lg:flex-1">
          {dueCount > 0 ? (
            <>
              <span className="font-bold">{dueCount}</span>{' '}
              {dueCount === 1 ? 'question' : 'questions'} you got wrong{' '}
              {dueCount === 1 ? 'is' : 'are'} due. Getting them right is the quickest way up.
            </>
          ) : (
            'Nothing due to revise. A weak spots mock mixes your misses with fresh questions on your weakest topics.'
          )}
        </p>
        <div className="flex gap-2 lg:shrink-0">
          {dueCount > 0 ? (
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams/revise')}
              className={cn(COLLEGE_BTN_PRIMARY, 'flex-1 whitespace-nowrap px-5 lg:flex-none')}
            >
              Revise {dueCount} now
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => navigate('/study-centre/mock-exams/targeted')}
            className={cn(
              dueCount > 0 ? COLLEGE_BTN : COLLEGE_BTN_PRIMARY,
              'flex-1 whitespace-nowrap px-5 lg:flex-none'
            )}
          >
            Weak spots mock
          </button>
        </div>
      </div>
    </div>
  );
}
