/**
 * One mock exam attempt, reviewed (ELE-1815).
 *
 * "Is there a way to see wrong answers? … to access test history?" — this is
 * the page that answers it. The score and how it moved, then WHAT TO DO NEXT
 * (weakest topics with a link to the exact study page, revise these, take it
 * again), then every question got wrong or skipped: what you picked, the right
 * answer, why, and where to look it up.
 *
 * Reads the attempt's own review snapshot (recordMockExamAttempt), so it
 * reviews the same forever whichever bank the paper came from. Attempts from
 * before 7 Oct 2026 have no snapshot and say so honestly.
 */
import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Check, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { paperName, useMockAttempt } from '@/hooks/study-centre/useMockHistory';
import { retakePathFor, studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import type { MockReviewItem } from '@/lib/mockExamTelemetry';
import {
  Delta,
  MH_CARD,
  ScoreBadge,
  fmtDuration,
  fmtWhen,
} from '@/components/study-centre/mock-history/MockBits';

type Filter = 'wrong' | 'skipped' | 'all';

const LETTERS = 'ABCDEFGH';

export default function MockAttemptPage() {
  useSEO('Mock exam review | Study Centre', 'Every question you got wrong, and what to do next.');
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { row, loading, notFound } = useMockAttempt(attemptId);
  const [previous, setPrevious] = useState<{ percentage: number } | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const review = useMemo(() => row?.review ?? [], [row]);
  const wrong = review.filter((r) => r.a !== null);
  const skipped = review.filter((r) => r.a === null);
  const shown =
    filter === 'wrong' ? wrong : filter === 'skipped' ? skipped : [...wrong, ...skipped];
  const [pageSize, setPageSize] = useState(10);
  // An abandoned paper: most of the "misses" were never answered.
  const mostlySkipped = skipped.length > wrong.length;

  // The attempt before this one on the same paper, for "▲ 6 on last time" —
  // one row, not the whole history.
  useEffect(() => {
    setPrevious(null);
    if (!row) return;
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

  // Weakest topics: misses grouped by topic (or section), most first.
  const topics = useMemo(() => {
    if (!row) return [];
    const by = new Map<
      string,
      { label: string; count: number; section?: string; module?: string; topic?: string; source?: string }
    >();
    for (const r of review) {
      const label = r.t || (r.s ? `Section ${r.s}` : '');
      if (!label) continue;
      const cur = by.get(label) ?? {
        label,
        count: 0,
        section: r.s,
        module: r.m,
        topic: r.t,
        source: r.x,
      };
      cur.count += 1;
      by.set(label, cur);
    }
    return [...by.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map((t) => ({ ...t, link: studyLinkFor(t.source ?? row.exam_slug, t.section, t.module, t.topic) }));
  }, [review, row]);

  const retake = row ? retakePathFor(row.exam_slug, row.retake_path) : null;
  const linkTargets = new Set(topics.map((t) => t.link?.to).filter(Boolean));
  const sharedLink =
    topics.length > 1 && linkTargets.size === 1 && topics.every((t) => t.link)
      ? topics[0].link
      : null;

  return (
    <HubPage>
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
          <div className={cn(MH_CARD, 'p-5')}>
            <p className="text-[14px] text-white">
              That attempt isn’t here — it may be on another account.
            </p>
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams/history')}
              className="mt-3 h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              All my attempts
            </button>
          </div>
        ) : (
          <>
            {/* Result */}
            <section className={cn(MH_CARD, 'relative overflow-hidden p-4 sm:p-6')}>
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 top-0 h-1',
                  row.passed ? 'bg-emerald-400' : 'bg-orange-400'
                )}
              />
              <div className="flex flex-wrap items-center gap-4">
                <ScoreBadge pct={row.percentage} passed={row.passed} size="lg" />
                <div className="min-w-0 flex-1">
                  <h1 className="text-[20px] font-bold leading-tight text-white sm:text-[24px]">
                    {paperName(row)}
                  </h1>
                  <p className="mt-1 text-[13px] text-white">
                    {fmtWhen(row.created_at)} · {row.score} of {row.total_questions} right ·{' '}
                    {fmtDuration(row.time_taken_seconds)}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 text-[13px] font-semibold text-white">
                    <span>{row.passed ? 'Pass' : 'Not a pass yet'}</span>
                    <Delta now={row.percentage} before={previous?.percentage} />
                  </p>
                </div>
              </div>
            </section>

            {/* What to do next */}
            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                What to do next
              </h2>
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
                <div className={cn(MH_CARD, 'p-4 sm:p-5')}>
                  {row.review === null ? (
                    <p className="text-[14px] leading-relaxed text-white">
                      This attempt was before we started saving answers, so there’s no question list
                      for it. Sit the paper again and you’ll get a full review — every question you
                      miss, the right answer and what to study.
                    </p>
                  ) : review.length === 0 ? (
                    <p className="text-[14px] leading-relaxed text-white">
                      Full marks — nothing to review. Try a different paper next.
                    </p>
                  ) : topics.length > 0 ? (
                    <>
                      {mostlySkipped && (
                        <p className="mb-3 rounded-xl border-l-2 border-orange-400 bg-white/[0.04] px-3.5 py-2.5 text-[13.5px] leading-snug text-white">
                          You left {skipped.length} of {row.total_questions} unanswered, so this
                          isn’t a fair picture yet. Sit it through to the end for one you can trust.
                        </p>
                      )}
                      <p className="mb-3 text-[13.5px] text-white">
                        Where you dropped the most marks:
                      </p>
                      <ul className="space-y-2">
                        {topics.map((t) => (
                          <li
                            key={t.label}
                            className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-white/[0.12] bg-white/[0.03] p-3"
                          >
                            <span className="flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg bg-orange-400 px-2 text-[14px] font-bold text-black">
                              {t.count}
                            </span>
                            <span className="min-w-0 flex-1 text-[14px] font-semibold text-white">
                              {t.label}
                            </span>
                            {t.link && !sharedLink && (
                              <button
                                type="button"
                                onClick={() => navigate(t.link!.to)}
                                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/[0.22] px-3 text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                                aria-label={`Study ${t.label}: ${t.link.label}`}
                              >
                                <BookOpen className="h-4 w-4" aria-hidden />
                                Study this
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {/* Every topic studies on the same page (Level 2/3 link the
                          module): one button, not four identical ones. */}
                      {sharedLink && (
                        <button
                          type="button"
                          onClick={() => navigate(sharedLink.to)}
                          className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
                        >
                          <BookOpen className="h-4 w-4" aria-hidden />
                          Study {sharedLink.label}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-[14px] leading-relaxed text-white">
                      {review.length} {review.length === 1 ? 'question' : 'questions'} to go over
                      below — read the explanation for each, then revise them until they stick.
                    </p>
                  )}
                </div>
                <div className={cn(MH_CARD, 'flex flex-col gap-2 p-4 sm:p-5')}>
                  {review.length > 0 && (
                    <button
                      type="button"
                      onClick={() => navigate(`/study-centre/mock-exams/revise?attempt=${row.id}`)}
                      className="h-12 rounded-xl bg-elec-yellow px-4 text-[15px] font-bold text-black touch-manipulation"
                    >
                      {wrong.length > 0
                        ? `Revise the ${wrong.length} you got wrong`
                        : `Try the ${skipped.length} you skipped`}
                    </button>
                  )}
                  {wrong.length > 0 && (
                    <button
                      type="button"
                      onClick={() => navigate('/study-centre/mock-exams/targeted')}
                      className="h-12 rounded-xl bg-white px-4 text-[14px] font-bold text-black touch-manipulation"
                    >
                      Sit a weak spots mock
                    </button>
                  )}
                  {retake && (
                    <button
                      type="button"
                      onClick={() => navigate(retake)}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden />
                      Take this paper again
                    </button>
                  )}
                  <p className="pt-1 text-[12.5px] leading-snug text-white">
                    Revised questions come back after a day, then three, then a week until they
                    stick. Sitting the paper again gives you a fresh set to measure against.
                  </p>
                </div>
              </div>
            </section>

            {/* The questions */}
            {review.length > 0 && (
              <section className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                    Questions to go over
                  </h2>
                  <div className="flex gap-1.5" role="group" aria-label="Show">
                    {(
                      [
                        ['all', `All ${review.length}`],
                        ['wrong', `Wrong ${wrong.length}`],
                        ['skipped', `Skipped ${skipped.length}`],
                      ] as const
                    )
                      .filter(([k]) => k !== 'skipped' || skipped.length > 0)
                      .map(([k, label]) => (
                        <button
                          key={k}
                          type="button"
                          aria-pressed={filter === k}
                          onClick={() => {
                            setFilter(k);
                            setPageSize(10);
                          }}
                          className={cn(
                            'h-10 rounded-lg border px-3 text-[13px] font-semibold touch-manipulation',
                            filter === k
                              ? 'border-elec-yellow bg-elec-yellow text-black'
                              : 'border-white/[0.18] text-white'
                          )}
                        >
                          {label}
                        </button>
                      ))}
                  </div>
                </div>
                <ol className="grid gap-3 xl:grid-cols-2">
                  {shown.slice(0, pageSize).map((q, i) => (
                    <ReviewQuestion key={`${q.k}-${i}`} n={i + 1} q={q} examSlug={row.exam_slug} />
                  ))}
                </ol>
                {shown.length > pageSize && (
                  <button
                    type="button"
                    onClick={() => setPageSize((n) => n + 10)}
                    className="h-12 w-full rounded-xl border border-white/[0.22] text-[14px] font-semibold text-white touch-manipulation"
                  >
                    Show {Math.min(10, shown.length - pageSize)} more ({shown.length - pageSize}{' '}
                    left)
                  </button>
                )}
              </section>
            )}
          </>
        )}
      </HubBody>
    </HubPage>
  );
}

function ReviewQuestion({ q, n, examSlug }: { q: MockReviewItem; n: number; examSlug: string }) {
  const navigate = useNavigate();
  const link = studyLinkFor(q.x ?? examSlug, q.s, q.m, q.t);
  return (
    <li className={cn(MH_CARD, 'flex flex-col gap-3 p-4 sm:p-5')}>
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg px-1.5 text-[13px] font-bold text-black',
            q.a === null ? 'bg-white' : 'bg-orange-400'
          )}
        >
          {n}
          <span className="sr-only">{q.a === null ? ', skipped' : ', wrong'}</span>
        </span>
        <div className="min-w-0 flex-1">
          {(q.t || q.s) && (
            <p className="text-[12px] font-semibold text-white">
              {q.t ?? `Section ${q.s}`}
              {q.a === null && ' · Skipped'}
            </p>
          )}
          <p className="mt-0.5 text-[15px] font-semibold leading-snug text-white">{q.q}</p>
        </div>
      </div>

      <ul className="space-y-1.5">
        {q.o.map((opt, i) => {
          const right = i === q.c;
          const picked = i === q.a;
          return (
            <li
              key={i}
              className={cn(
                'flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-[14px] leading-snug text-white',
                right ? 'border-emerald-400' : picked ? 'border-orange-400' : 'border-white/[0.1]'
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px] font-bold',
                  right
                    ? 'bg-emerald-400 text-black'
                    : picked
                      ? 'bg-orange-400 text-black'
                      : 'border border-white/[0.25] text-white'
                )}
                aria-hidden
              >
                {right ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : picked ? (
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  LETTERS[i]
                )}
              </span>
              <span className="min-w-0 flex-1">
                {opt}
                {right && <span className="ml-2 font-semibold text-emerald-400">Right answer</span>}
                {picked && !right && (
                  <span className="ml-2 font-semibold text-orange-400">Your answer</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {(q.e || q.r) && (
        <div className="rounded-xl border-l-2 border-elec-yellow bg-white/[0.04] px-3.5 py-3">
          {q.e && <p className="text-[13.5px] leading-relaxed text-white">{q.e}</p>}
          {q.r && (
            <p className="mt-1.5 text-[12.5px] font-semibold text-white">Look it up: {q.r}</p>
          )}
        </div>
      )}

      {link && (
        <button
          type="button"
          onClick={() => navigate(link.to)}
          className="inline-flex h-10 items-center gap-1.5 self-start rounded-lg px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          Study this: {link.label}
        </button>
      )}
    </li>
  );
}
