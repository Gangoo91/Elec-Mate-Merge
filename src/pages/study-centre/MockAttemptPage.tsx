/**
 * One mock exam sitting, reviewed — redesigned 10 Oct 2026.
 *
 * Andrew: "make the mock exam review designed better and allow for more
 * learning and understanding of why… excellent on mobiles".
 *
 * Built as a learning session, not a results dump:
 *   hero           the score, the gap to the pass mark, where the marks went,
 *                  and one button: go through your mistakes
 *   Where the marks went   topic by topic, with Study and Practise
 *   Learn from your mistakes
 *     One at a time (default on a phone): your answer beside the right one,
 *     why, where to look it up, "Ask Dave why" (the apprentice AI tutor —
 *     he knows every learning outcome and criterion, Andrew 10 Oct), then
 *     "Got it" / "Still unsure". Unsure ones go to revision at the end.
 *     List: every question at once, for a desk.
 *
 * Older sittings (before 7 Oct 2026) and topic tests have no saved questions;
 * they show the topic breakdown and say so.
 */
import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  RotateCcw,
  Target,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { paperName, useMockAttempt } from '@/hooks/study-centre/useMockHistory';
import { retakePathFor, studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import type { MockReviewItem } from '@/lib/mockExamTelemetry';
import { Delta, fmtDuration, fmtWhen } from '@/components/study-centre/mock-history/MockBits';
import { Hairline, ProgressRing, SC_CARD, SC_LIST } from '@/components/study-centre/ui/StudyKit';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { topicBar } from '@/lib/study-centre/mockInsights';

const LETTERS = 'ABCDEFGH';
type Mode = 'learn' | 'list';

/** What Dave is asked: the whole question, both answers, and what we want. */
function davePrompt(q: MockReviewItem, paper: string): string {
  const opts = q.o.map((o, i) => `${LETTERS[i]}) ${o}`).join('\n');
  const mine = q.a === null ? 'I skipped it.' : `I answered ${LETTERS[q.a]}) ${q.o[q.a]}.`;
  return [
    `I got this wrong in my ${paper} mock exam${q.t ? ` (topic: ${q.t})` : ''}.`,
    '',
    q.q,
    opts,
    '',
    mine,
    `The right answer is ${LETTERS[q.c]}) ${q.o[q.c]}.`,
    q.r ? `Reference given: ${q.r}.` : '',
    '',
    `Explain why ${LETTERS[q.c]} is right${q.a !== null ? ` and why ${LETTERS[q.a]} is wrong` : ''}, the easiest way to remember it on site, and which learning outcome and assessment criteria it covers.`,
  ]
    .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
    .join('\n');
}

export default function MockAttemptPage() {
  useSEO(
    'Mock exam review | Study Centre',
    'Every question you got wrong, why, and what to do next.'
  );
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { row, loading, notFound } = useMockAttempt(attemptId);
  const [previous, setPrevious] = useState<{ percentage: number } | null>(null);

  const review = useMemo(() => row?.review ?? [], [row]);
  const wrong = useMemo(() => review.filter((r) => r.a !== null), [review]);
  const skipped = useMemo(() => review.filter((r) => r.a === null), [review]);
  const ordered = useMemo(() => [...wrong, ...skipped], [wrong, skipped]);

  const [mode, setMode] = useState<Mode>('learn');
  // Position and marks survive a trip to Dave or a lesson and back: kept for
  // this sitting in sessionStorage.
  const storeKey = `mock-review:${attemptId}`;
  const saved = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(storeKey) ?? 'null') as {
        step: number;
        marks: Record<string, 'got' | 'unsure'>;
      } | null;
    } catch {
      return null;
    }
  })();
  const [step, setStep] = useState(saved?.step ?? 0);
  const [marks, setMarks] = useState<Record<string, 'got' | 'unsure'>>(saved?.marks ?? {});
  useEffect(() => {
    try {
      sessionStorage.setItem(storeKey, JSON.stringify({ step, marks }));
    } catch {
      /* private mode: the session just won't resume */
    }
  }, [storeKey, step, marks]);
  const [listSize, setListSize] = useState(10);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const unsure = Object.values(marks).filter((m) => m === 'unsure').length;
  const finished = mode === 'learn' && step >= ordered.length && ordered.length > 0;

  // Desk-sized screens start in the list; phones in one-at-a-time.
  useEffect(() => {
    if (!saved && typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
      setMode('list');
    // Returning mid-session: straight back to the question.
    if (saved && saved.step > 0)
      setTimeout(
        () => document.getElementById('learn-card')?.scrollIntoView({ block: 'start' }),
        400
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The sitting before this one on the same paper, for "▲ 6 on last time".
  useEffect(() => {
    setPrevious(null);
    if (!row || row.kind !== 'mock') return;
    let cancelled = false;
    void (supabase as unknown as SupabaseClient)
      .from('seo_mock_attempts')
      .select('percentage')
      .eq('user_id', row.user_id ?? '')
      .eq('exam_slug', row.exam_slug)
      .lt('created_at', row.created_at)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (!cancelled) setPrevious((data?.[0] as { percentage: number } | undefined) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [row]);

  // Where the marks went: right/total per topic where we have it, otherwise
  // the misses grouped by topic.
  const topicRows = useMemo(() => {
    if (!row) return [];
    if (row.topicBreakdown && row.topicBreakdown.length) {
      return [...row.topicBreakdown]
        .map((t) => ({
          ...t,
          pct: Math.round((t.right / Math.max(1, t.total)) * 100),
          lost: t.total - t.right,
        }))
        .sort((a, b) => a.pct - b.pct || b.lost - a.lost);
    }
    const by = new Map<
      string,
      { topic: string; right: number; total: number; pct: number; lost: number }
    >();
    for (const r of review) {
      const label = r.t || (r.s ? `Section ${r.s}` : '');
      if (!label) continue;
      const cur = by.get(label) ?? { topic: label, right: 0, total: 0, pct: 0, lost: 0 };
      cur.lost += 1;
      by.set(label, cur);
    }
    return [...by.values()].sort((a, b) => b.lost - a.lost);
  }, [row, review]);
  const hasTotals = !!row?.topicBreakdown?.length;
  const topLost = topicRows
    .filter((t) => t.lost > 0)
    .slice(0, 2)
    .map((t) => t.topic);

  const linkFor = (topic: string) => {
    const sample = review.find((r) => r.t === topic);
    return studyLinkFor(sample?.x ?? row?.exam_slug ?? '', sample?.s, sample?.m, topic);
  };

  const retake = row ? retakePathFor(row.exam_slug, row.retake_path) : null;
  const passMark = row?.pass_mark ?? 60;
  const gapMarks =
    row && !row.passed && row.total_questions
      ? Math.max(1, Math.ceil((passMark / 100) * row.total_questions) - row.score)
      : 0;
  const name = row ? paperName(row) : '';

  const verdict = row
    ? row.passed
      ? `A pass at ${row.percentage}% against ${passMark}%.${topLost.length ? ` The marks you dropped were mostly on ${topLost.join(' and ')}.` : ''}`
      : `${gapMarks} more right ${gapMarks === 1 ? 'answer' : 'answers'} would have passed.${topLost.length ? ` Most marks went on ${topLost.join(' and ')}.` : ''}`
    : '';

  // Each new question starts at the top of the card, not under the bar.
  const toTop = () =>
    requestAnimationFrame(() =>
      document.getElementById('learn-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );

  const startLearning = () => {
    setMode('learn');
    setStep(0);
    document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="Study Centre"
        title="Mock exam review"
        backTo="/study-centre/mock-exams/history"
      />
      <HubBody>
        {loading ? (
          <div className="flex justify-center py-16" aria-label="Loading">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : notFound || !row ? (
          <div className={SC_CARD}>
            <p className="text-[14px] text-white">
              That sitting isn’t here. It may be on another account.
            </p>
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams/history')}
              className={cn(COLLEGE_BTN, 'mt-3')}
            >
              All my sittings
            </button>
          </div>
        ) : (
          <>
            {/* ── Hero ───────────────────────────────────────────────── */}
            <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-7">
              <Hairline />
              <div className="flex items-start gap-5">
                <ProgressRing
                  pct={row.percentage}
                  size={96}
                  colour={row.passed ? '#34d399' : '#fb923c'}
                  label={`${row.percentage}%, pass mark ${passMark}%`}
                >
                  <span className="text-[26px] font-black leading-none tabular-nums text-white">
                    {row.percentage}%
                  </span>
                  <span className="mt-0.5 text-[12px] font-semibold text-white">
                    pass {passMark}%
                  </span>
                </ProgressRing>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                    {row.kind === 'test' ? 'Topic test' : row.kind === 'am2' ? 'AM2' : 'Mock exam'}{' '}
                    · {fmtWhen(row.created_at)}
                  </p>
                  <h1 className="mt-1 text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
                    {name}
                  </h1>
                  <p className="mt-1 text-[13px] text-white">
                    {row.total_questions > 0 && `${row.score} of ${row.total_questions} right · `}
                    {fmtDuration(row.time_taken_seconds)}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 text-[13px] font-semibold">
                    <span className={row.passed ? 'text-emerald-400' : 'text-orange-400'}>
                      {row.passed ? 'Pass' : 'Not a pass yet'}
                    </span>
                    <Delta now={row.percentage} before={previous?.percentage} />
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white">{verdict}</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                {ordered.length > 0 ? (
                  <button
                    type="button"
                    onClick={startLearning}
                    className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
                  >
                    {wrong.length > 0
                      ? `Review ${wrong.length} wrong ${wrong.length === 1 ? 'answer' : 'answers'}`
                      : `Review the ${skipped.length} you skipped`}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                ) : null}
                {retake && (
                  <button
                    type="button"
                    onClick={() => navigate(retake)}
                    className={cn(ordered.length ? COLLEGE_BTN : COLLEGE_BTN_PRIMARY, 'h-12 px-5')}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Take it again
                  </button>
                )}
              </div>
            </section>

            {/* ── Where the marks went ───────────────────────────────── */}
            {topicRows.length > 0 && (
              <section className="space-y-3" aria-labelledby="where">
                <CollegeSectionTitle
                  id="where"
                  title="Where the marks went"
                  sub={
                    hasTotals
                      ? 'Every topic on this paper, weakest first.'
                      : 'Topics you dropped marks on, most first.'
                  }
                />
                <div className={SC_LIST}>
                  {(showAllTopics ? topicRows : topicRows.slice(0, 6)).map((t) => {
                    const link = linkFor(t.topic);
                    return (
                      <div key={t.topic} className="px-5 py-4 sm:px-6">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="min-w-0 break-words leading-snug text-[14.5px] font-semibold text-white">
                            {t.topic}
                          </span>
                          <span className="shrink-0 text-[14px] font-bold tabular-nums text-white">
                            {hasTotals ? `${t.right}/${t.total}` : `${t.lost} lost`}
                          </span>
                        </div>
                        {hasTotals && (
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.1]">
                            <div
                              className={cn('h-full rounded-full', topicBar(t.pct))}
                              style={{ width: `${Math.max(t.pct, 3)}%` }}
                            />
                          </div>
                        )}
                        {t.lost > 0 && (link || row.kind === 'mock') && (
                          <div className="mt-2.5 flex gap-2">
                            {link && (
                              <button
                                type="button"
                                onClick={() => navigate(link.to)}
                                className={cn(
                                  COLLEGE_BTN,
                                  'h-11 flex-1 px-3 text-[13px] sm:flex-none'
                                )}
                              >
                                <BookOpen className="h-4 w-4" aria-hidden />
                                Study
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/study-centre/mock-exams/revise?topic=${encodeURIComponent(t.topic)}`
                                )
                              }
                              className={cn(
                                COLLEGE_BTN,
                                'h-11 flex-1 px-3 text-[13px] sm:flex-none'
                              )}
                            >
                              <Target className="h-4 w-4" aria-hidden />
                              Practise
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {topicRows.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllTopics((v) => !v)}
                      className="flex h-12 w-full items-center justify-center gap-1 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
                    >
                      {showAllTopics ? 'Show fewer' : `All ${topicRows.length} topics`}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          showAllTopics && 'rotate-180'
                        )}
                        aria-hidden
                      />
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* ── No questions saved ─────────────────────────────────── */}
            {row.review === null && (
              <div className={SC_CARD}>
                <p className="text-[14px] leading-relaxed text-white">
                  The questions weren’t saved for this sitting
                  {row.kind === 'mock' ? ' (it was before 7 October 2026)' : ''}. Sit it again for a
                  full review: every question you miss, the right answer, why, and a tutor to ask.
                </p>
              </div>
            )}

            {row.review !== null && review.length === 0 && (
              <div className={cn(SC_CARD, 'text-center')}>
                <p className="text-[16px] font-semibold text-emerald-400">Full marks.</p>
                <p className="mt-1 text-[13.5px] text-white">
                  Nothing to go over. Try a different paper next.
                </p>
              </div>
            )}

            {/* ── Learn from your mistakes ───────────────────────────── */}
            {ordered.length > 0 && (
              <section className="scroll-mt-20 space-y-3" id="learn" aria-labelledby="learn-title">
                <CollegeSectionTitle
                  id="learn-title"
                  title="Learn from your mistakes"
                  sub={`${wrong.length} wrong${skipped.length ? `, ${skipped.length} skipped` : ''}. Understand each one, then revise the ones that haven’t stuck.`}
                />
                <div className="flex gap-2" role="tablist" aria-label="How to go through them">
                  {(['learn', 'list'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={mode === m}
                      onClick={() => setMode(m)}
                      className={chipCn(mode === m)}
                    >
                      {m === 'learn' ? 'One at a time' : 'All at once'}
                    </button>
                  ))}
                </div>

                {mode === 'learn' ? (
                  finished ? (
                    <div className={cn(SC_CARD, 'relative overflow-hidden text-center')}>
                      <Hairline />
                      <p className="text-[20px] font-bold text-white">
                        That’s all {ordered.length} done
                      </p>
                      <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-white">
                        {unsure > 0
                          ? `${unsure} still ${unsure === 1 ? 'feels' : 'feel'} shaky. Revise them now: each one comes back after a day, three days and a week until it sticks.`
                          : 'Everything made sense. Prove it on a fresh paper.'}
                      </p>
                      <div className="mx-auto mt-5 flex max-w-md flex-col gap-2">
                        {unsure > 0 && row.kind === 'mock' && (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/study-centre/mock-exams/revise?attempt=${row.id}`)
                            }
                            className={cn(COLLEGE_BTN_PRIMARY, 'h-12')}
                          >
                            Revise this paper’s mistakes
                          </button>
                        )}
                        {retake && (
                          <button
                            type="button"
                            onClick={() => navigate(retake)}
                            className={cn(unsure > 0 ? COLLEGE_BTN : COLLEGE_BTN_PRIMARY, 'h-12')}
                          >
                            <RotateCcw className="h-4 w-4" aria-hidden />
                            Take the paper again
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className={cn(COLLEGE_BTN, 'h-12')}
                        >
                          Go through them again
                        </button>
                      </div>
                    </div>
                  ) : (
                    <LearnCard
                      key={step}
                      q={ordered[step]}
                      n={step + 1}
                      total={ordered.length}
                      paper={name}
                      examSlug={row.exam_slug}
                      mark={marks[ordered[step].k]}
                      onMark={(m) => {
                        setMarks((prev) => ({ ...prev, [ordered[step].k]: m }));
                        setStep((s) => s + 1);
                        toTop();
                      }}
                      onPrev={
                        step > 0
                          ? () => {
                              setStep((s) => s - 1);
                              toTop();
                            }
                          : undefined
                      }
                    />
                  )
                ) : (
                  <>
                    <ol className="grid gap-3 xl:grid-cols-2">
                      {ordered.slice(0, listSize).map((q, i) => (
                        <li key={`${q.k}-${i}`}>
                          <QuestionBody q={q} n={i + 1} paper={name} examSlug={row.exam_slug} />
                        </li>
                      ))}
                    </ol>
                    {ordered.length > listSize && (
                      <button
                        type="button"
                        onClick={() => setListSize((n) => n + 10)}
                        className={cn(COLLEGE_BTN, 'h-12 w-full')}
                      >
                        Show {Math.min(10, ordered.length - listSize)} more (
                        {ordered.length - listSize} left)
                      </button>
                    )}
                  </>
                )}
              </section>
            )}
          </>
        )}
      </HubBody>
    </HubPage>
  );
}

/** One mistake at a time, with "Got it" / "Still unsure" and thumb-height navigation. */
function LearnCard({
  q,
  n,
  total,
  paper,
  examSlug,
  mark,
  onMark,
  onPrev,
}: {
  q: MockReviewItem;
  n: number;
  total: number;
  paper: string;
  examSlug: string;
  mark?: 'got' | 'unsure';
  onMark: (m: 'got' | 'unsure') => void;
  onPrev?: () => void;
}) {
  return (
    <div className="scroll-mt-20 space-y-3" id="learn-card">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {n} of {total}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.1]">
          <div
            className="h-full rounded-full bg-elec-yellow transition-[width] duration-300"
            style={{ width: `${((n - 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <QuestionBody q={q} n={n} paper={paper} examSlug={examSlug} focus />

      {/* Self-check, at thumb height */}
      <div className="sticky bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-10 -mx-4 border-t border-white/[0.1] bg-background/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <p className="mb-2 text-center text-[12.5px] font-medium text-white sm:text-left">
          Does it make sense now?
        </p>
        <div className="flex gap-2">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous question"
              className={cn(COLLEGE_BTN, 'h-12 w-12 shrink-0 px-0')}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
          )}
          <button
            type="button"
            onClick={() => onMark('unsure')}
            className={cn(COLLEGE_BTN, 'h-12 flex-1', mark === 'unsure' && 'border-orange-400')}
          >
            <HelpCircle className="h-4 w-4 text-orange-400" aria-hidden />
            Still unsure
          </button>
          <button
            type="button"
            onClick={() => onMark('got')}
            className={cn(COLLEGE_BTN_PRIMARY, 'h-12 flex-1')}
          >
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

/** A question taught: what you said, what's right, why, where to look, who to ask. */
function QuestionBody({
  q,
  n,
  paper,
  examSlug,
  focus = false,
}: {
  q: MockReviewItem;
  n: number;
  paper: string;
  examSlug: string;
  focus?: boolean;
}) {
  const navigate = useNavigate();
  const [allOptions, setAllOptions] = useState(false);
  const link = studyLinkFor(q.x ?? examSlug, q.s, q.m, q.t);
  const skippedQ = q.a === null;
  const others = q.o.map((o, i) => ({ o, i })).filter(({ i }) => i !== q.c && i !== q.a);

  return (
    <article
      className={cn(
        'relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl',
        focus ? 'p-5 sm:p-7' : 'p-5'
      )}
    >
      {focus && <Hairline />}
      <p className="text-[13px] font-semibold text-white">
        {focus ? '' : `${n} · `}
        {q.t ?? (q.s ? `Section ${q.s}` : 'Question')}
        {skippedQ && ' · Skipped'}
      </p>
      <h3
        className={cn(
          'mt-2 font-semibold leading-snug text-white',
          focus ? 'text-[18px] sm:text-[20px]' : 'text-[15.5px]'
        )}
      >
        {q.q}
      </h3>

      {/* Your answer against the right one */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div
          className={cn(
            'rounded-xl border-2 px-4 py-3',
            skippedQ ? 'border-white/[0.2]' : 'border-orange-400'
          )}
        >
          <p
            className={cn(
              'flex items-center gap-1.5 text-[13px] font-bold',
              skippedQ ? 'text-white' : 'text-orange-400'
            )}
          >
            <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
            Your answer
          </p>
          <p className="mt-1 text-[14.5px] font-medium leading-snug text-white">
            {skippedQ ? 'You skipped this one' : `${LETTERS[q.a!]}. ${q.o[q.a!]}`}
          </p>
        </div>
        <div className="rounded-xl border-2 border-emerald-400 px-4 py-3">
          <p className="flex items-center gap-1.5 text-[13px] font-bold text-emerald-400">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
            Right answer
          </p>
          <p className="mt-1 text-[14.5px] font-medium leading-snug text-white">
            {LETTERS[q.c]}. {q.o[q.c]}
          </p>
        </div>
      </div>

      {others.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setAllOptions((v) => !v)}
            className="mt-1 inline-flex h-11 items-center gap-1 px-1 text-[13px] font-semibold text-white touch-manipulation active:opacity-70"
          >
            {allOptions ? 'Hide the other options' : `The other ${others.length} options`}
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', allOptions && 'rotate-180')}
              aria-hidden
            />
          </button>
          {allOptions && (
            <ul className="space-y-1.5">
              {others.map(({ o, i }) => (
                <li
                  key={i}
                  className="rounded-xl border border-white/[0.12] px-3.5 py-2.5 text-[13.5px] text-white"
                >
                  {LETTERS[i]}. {o}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Why */}
      {(q.e || q.r) && (
        <div className="mt-4 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3.5">
          <p className="text-[13px] font-bold text-elec-yellow">Why</p>
          {q.e && <p className="mt-1.5 text-[14px] leading-relaxed text-white">{q.e}</p>}
          {q.r && (
            <p className="mt-2 text-[13px] font-semibold text-white">
              Look it up: <span className="text-elec-yellow">{q.r}</span>
            </p>
          )}
        </div>
      )}

      {/* Go deeper */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            navigate(`/apprentice/advanced-help?prompt=${encodeURIComponent(davePrompt(q, paper))}`)
          }
          className={cn(COLLEGE_BTN, 'h-12')}
        >
          <MessageCircle className="h-4 w-4 text-elec-yellow" aria-hidden />
          Ask Dave why
        </button>
        {link && (
          <button
            type="button"
            onClick={() => navigate(link.to)}
            className={cn(COLLEGE_BTN, 'h-12')}
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Study the lesson
          </button>
        )}
      </div>
    </article>
  );
}
