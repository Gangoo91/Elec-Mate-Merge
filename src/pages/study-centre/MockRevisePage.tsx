/**
 * Revise the questions you got wrong (ELE-1815).
 *
 * One at a time, options reshuffled so it's the answer you remember and not
 * its position. Right → back after 1, 3 then 7 days, learned on the third
 * (on the server, every device). Wrong → the explanation, and it's due again.
 * ?attempt=<id> revises one attempt's misses; otherwise the whole pile.
 */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { useMockAttempt, useRevisionPile } from '@/hooks/study-centre/useMockHistory';
import { studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import type { MockReviewItem } from '@/lib/mockExamTelemetry';
import { useHoldReloads } from '@/lib/reloadGuard';
import { MH_CARD } from '@/components/study-centre/mock-history/MockBits';

interface Card extends MockReviewItem {
  examSlug: string;
  paper?: string;
  /** Display order → stored option index. */
  order: number[];
}

const LETTERS = 'ABCDEFGH';
const ROUND = 10;

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MockRevisePage() {
  useSEO(
    'Revise your wrong answers | Study Centre',
    'Questions you got wrong come back after a day, three days and a week until they stick.'
  );
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // Opened from an exam's results: Back goes back to that course or library.
  const from = (useLocation().state as { from?: string } | null)?.from;
  const attemptId = params.get('attempt') ?? undefined;
  // ?topic= — revise one weak spot (from the history page).
  const topic = params.get('topic') ?? undefined;
  // One attempt's misses don't need the whole pile fetched — only `clear`.
  const pile = useRevisionPile({ enabled: !attemptId });
  const attempt = useMockAttempt(attemptId);

  const [deck, setDeck] = useState<Card[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);

  // Build the round once its source has loaded.
  useEffect(() => {
    if (deck) return;
    if (attemptId) {
      if (attempt.loading) return;
      // A bad or other-account id, or an attempt from before snapshots: an
      // empty round with its own message — never a spinner forever.
      if (!attempt.row || attempt.row.review === null) {
        setDeck([]);
        return;
      }
      // The ones they got wrong; skipped ones only if nothing was got wrong.
      const all = attempt.row.review ?? [];
      const wrongOnes = all.filter((it) => it.a !== null);
      const items = wrongOnes.length ? wrongOnes : all;
      setDeck(
        items.map((it) => ({
          ...it,
          examSlug: attempt.row!.exam_slug,
          order: shuffled(it.o.length),
        }))
      );
    } else {
      if (pile.loading) return;
      setDeck(
        pile.items
          // Due now only — the rest are waiting for their next day.
          .filter((it) => it.due && (!topic || (it.t || it.paper) === topic))
          .slice(0, ROUND)
          .map((it) => ({
            ...it,
            paper: it.paper,
            order: shuffled(it.o.length),
          }))
      );
    }
  }, [deck, attemptId, topic, attempt.loading, attempt.row, pile.loading, pile.items]);

  const card = deck?.[i];
  const done = deck !== null && i >= deck.length;
  // Mid-round: no automatic reloads (lib/reloadGuard).
  useHoldReloads(deck !== null && deck.length > 0 && !done);
  const answered = picked !== null;
  const correct = answered && card ? card.order[picked] === card.c : false;
  const link = useMemo(
    () => (card && card.examSlug ? studyLinkFor(card.x ?? card.examSlug, card.s, card.m, card.t) : null),
    [card]
  );

  // What the schedule did with this answer, for the line under it.
  const [scheduledFor, setScheduledFor] = useState<
    { step: number; mastered: boolean; dueAt: string } | 'failed' | null
  >(null);

  const choose = (displayIdx: number) => {
    if (answered || !card) return;
    setPicked(displayIdx);
    setScheduledFor(null);
    const isRight = card.order[displayIdx] === card.c;
    if (isRight) setRight((n) => n + 1);
    // Right or wrong, it goes on the schedule: right → back in 1, 3, 7 days;
    // wrong → due again now.
    void pile.answer(card.k, isRight).then((r) => {
      setScheduledFor(r ? { step: r.step, mastered: r.mastered, dueAt: r.due_at } : 'failed');
    });
  };

  const next = () => {
    setPicked(null);
    setI((n) => n + 1);
  };

  return (
    <HubPage>
      <HubMasthead
        section="Study Centre"
        title={topic ? `Revise: ${topic}` : 'Revise wrong answers'}
        backTo={
          from ??
          (attemptId
            ? `/study-centre/mock-exams/history/${attemptId}`
            : '/study-centre/mock-exams/history')
        }
      />
      <HubBody>
        {deck === null ? (
          <div className="flex justify-center py-16" aria-label="Loading">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : deck.length === 0 ? (
          <div className={cn(MH_CARD, 'p-5')}>
            <p className="text-[15px] font-semibold text-white">
              {attemptId && !attempt.row
                ? 'That attempt isn’t here.'
                : attemptId && attempt.row?.review === null
                  ? 'This attempt has no question list.'
                  : pile.scheduled > 0
                    ? 'All caught up for today.'
                    : 'Nothing to revise.'}
            </p>
            <p className="mt-1 text-[14px] text-white">
              {attemptId && !attempt.row
                ? 'It may belong to another account.'
                : attemptId && attempt.row?.review === null
                  ? 'It was sat before answers were saved. Sit the paper again for a full review.'
                  : pile.scheduled > 0
                    ? `Nothing due right now. ${pile.scheduled} ${pile.scheduled === 1 ? 'question is' : 'questions are'} scheduled to come back over the next few days — spacing it out is what makes it stick.`
                    : 'Every question you’ve missed has been learned. Sit another mock to find the next ones.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams')}
              className="mt-3 h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
            >
              Choose a mock exam
            </button>
          </div>
        ) : done ? (
          <div className={cn(MH_CARD, 'relative overflow-hidden p-5 sm:p-6')}>
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-elec-yellow" />
            <p className="text-[13px] font-semibold text-white">Round done</p>
            <p className="mt-1 text-[28px] font-bold text-white">
              {right} of {deck.length} right
            </p>
            <p className="mt-1 text-[14px] text-white">
              {right > 0 && `${right} moved on to their next review. `}
              {deck.length - right > 0
                ? `${deck.length - right} still to get — they’ll come round again.`
                : 'Clean sweep.'}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {!attemptId &&
                pile.items.some((it) => it.due && (!topic || (it.t || it.paper) === topic)) && (
                  <button
                    type="button"
                    onClick={() => {
                      setDeck(null);
                      setI(0);
                      setRight(0);
                      void pile.refresh();
                    }}
                    className="h-12 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
                  >
                    Another round
                  </button>
                )}
              <button
                type="button"
                onClick={() => navigate('/study-centre/mock-exams/history')}
                className="h-12 rounded-xl border border-white/[0.22] px-5 text-[14px] font-semibold text-white touch-manipulation"
              >
                Back to my history
              </button>
            </div>
          </div>
        ) : card ? (
          <div className="mx-auto w-full max-w-3xl space-y-4">
            {/* Progress */}
            <div>
              <div className="mb-1.5 flex justify-between text-[12.5px] font-semibold text-white">
                <span>
                  Question {i + 1} of {deck.length}
                </span>
                <span>{right} right</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
                <div
                  className="h-full rounded-full bg-elec-yellow transition-all"
                  style={{ width: `${((i + (answered ? 1 : 0)) / deck.length) * 100}%` }}
                />
              </div>
            </div>

            <div className={cn(MH_CARD, 'space-y-4 p-4 sm:p-6')}>
              {(card.t || card.paper) && (
                <p className="text-[12px] font-semibold text-white">
                  {[card.t, card.paper].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="text-[17px] font-semibold leading-snug text-white">{card.q}</p>
              <div className="space-y-2" role="group" aria-label="Answers">
                {card.order.map((orig, d) => {
                  const isRight = orig === card.c;
                  const isPicked = picked === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      disabled={answered}
                      onClick={() => choose(d)}
                      className={cn(
                        'flex min-h-[52px] w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-[15px] leading-snug text-white touch-manipulation',
                        !answered && 'border-white/[0.16] hover:border-elec-yellow',
                        answered && isRight && 'border-emerald-400',
                        answered && isPicked && !isRight && 'border-orange-400',
                        answered && !isRight && !isPicked && 'border-white/[0.08]'
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[13px] font-bold',
                          answered && isRight
                            ? 'bg-emerald-400 text-black'
                            : answered && isPicked
                              ? 'bg-orange-400 text-black'
                              : 'border border-white/[0.25] text-white'
                        )}
                      >
                        {answered && isRight ? (
                          <Check className="h-4 w-4" strokeWidth={3} />
                        ) : answered && isPicked ? (
                          <X className="h-4 w-4" strokeWidth={3} />
                        ) : (
                          LETTERS[d]
                        )}
                      </span>
                      <span className="pt-0.5">{card.o[orig]}</span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="space-y-3">
                  <p
                    className={cn(
                      'text-[15px] font-bold',
                      correct ? 'text-emerald-400' : 'text-orange-400'
                    )}
                  >
                    {correct ? (
                      scheduledFor === 'failed' ? (
                        'Right — but that didn’t save, so it’ll come round again.'
                      ) : !scheduledFor ? (
                        'Right.'
                      ) : scheduledFor.mastered ? (
                        'Right — learned. That one’s off your pile.'
                      ) : (
                        `Right — it’ll come back ${whenBack(scheduledFor.dueAt)} to make sure it sticks.`
                      )
                    ) : (
                      'Not this time — it’ll come round again until it sticks.'
                    )}
                  </p>
                  {(card.e || card.r) && (
                    <div className="rounded-xl border-l-2 border-elec-yellow bg-white/[0.04] px-3.5 py-3">
                      {card.e && <p className="text-[14px] leading-relaxed text-white">{card.e}</p>}
                      {card.r && (
                        <p className="mt-1.5 text-[12.5px] font-semibold text-white">
                          Look it up: {card.r}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={next}
                      className="h-12 flex-1 rounded-xl bg-elec-yellow px-5 text-[15px] font-bold text-black touch-manipulation"
                    >
                      {i + 1 < deck.length ? 'Next question' : 'Finish'}
                    </button>
                    {link && (
                      <button
                        type="button"
                        onClick={() => navigate(link.to)}
                        className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
                      >
                        <BookOpen className="h-4 w-4" aria-hidden />
                        Study this
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </HubBody>
    </HubPage>
  );
}

/** "tomorrow" / "in 3 days" / "in a week" from a due time. */
function whenBack(dueAt: string): string {
  const days = Math.max(1, Math.round((new Date(dueAt).getTime() - Date.now()) / 86400000));
  if (days === 1) return 'tomorrow';
  if (days === 7) return 'in a week';
  return `in ${days} days`;
}
