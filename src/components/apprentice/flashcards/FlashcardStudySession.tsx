/**
 * The flashcard study screen (ELE-1655).
 *
 * ## Why the flip is built the way it is
 *
 * The old version drove a CSS `rotateY` from a single `isFlipped` state while
 * framer's `AnimatePresence` swapped the card underneath it. Advancing a card
 * changed the flip and the card in the same commit, so a 0.4s rotation played
 * during the swap — Andrew: "I'm clicking next and it's just flipping back to
 * the answer."
 *
 * Two things fixed it, and both matter:
 *
 * 1. `flipAnimatable` — the rotation transition is switched OFF for the frame
 *    in which a new card mounts, so the next card can only ever appear on its
 *    question face, instantly. It cannot rotate into view.
 * 2. The tap-to-flip guard in `onTap` — react-swipeable listens for `touchend`
 *    on the whole card, and `e.stopPropagation()` inside a Button's `onClick`
 *    cannot stop it, because click happens after touchend. Every tap on
 *    "Got it" was therefore ALSO toggling the flip.
 *
 * ## Design
 *
 * Built from `@/components/shared/surfaceStyles` so it reads as the same
 * product as the rest of the app: full-bleed cards on a phone, hierarchy from
 * type rather than icons, and every piece of text full white — de-emphasis is
 * `opacity` on a whole element, never a `text-white` that renders as grey.
 */
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardAchievements } from '@/hooks/useFlashcardAchievements';
import { flashcardSets, type FlashcardData } from '@/data/flashcards';
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { ghostButtonCn, primaryButtonCn } from '@/components/shared/surfaceStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import AchievementUnlockToast from './AchievementUnlockToast';

interface FlashcardStudySessionProps {
  setId: string;
  studyMode: string;
  onExit: () => void;
  /** Shown on the finish screen: where to go next ("Review 5 due in Testing"). */
  nextUp?: { title: string; detail: string; start: () => void } | null;
  dueCardIds?: string[];
  /** Serve the deck in this order (card ids), e.g. "Keep going". */
  orderIds?: string[];
  /**
   * A review queue that spans decks: each entry names the card and the deck it
   * came from. When present it replaces `setId`/`dueCardIds` as the source of
   * cards, and every answer is written back against the card's OWN deck —
   * writing them all against one `setId` would corrupt the other decks'
   * mastery. Card ids are globally unique across the 41 decks, which is what
   * makes the lookup safe.
   */
  queue?: { setId: string; cardId: string }[];
}

const haptic = (pattern: number | number[]) => {
  try {
    navigator?.vibrate?.(pattern);
  } catch {
    /* unsupported */
  }
};

/** Anything that handles its own tap and must not also flip the card. */
const INTERACTIVE = 'button, a, input, textarea, select, [role="button"]';

/**
 * One face of the flip card.
 *
 * Deliberately NOT `cardCn`: that carries `-mx-4` so a card can go full-bleed
 * on a phone, and a negative margin on an `absolute inset-0` face makes it
 * wider than the card it sits in and shunts it off to the left. Same surface
 * — gradient, border, radius — without the bleed.
 */
const faceCn = cn(
  'absolute inset-0 rounded-3xl border border-white/[0.14] group-focus-visible:border-elec-yellow',
  CARD_SURFACE
);

/**
 * The card's way in and out (10 Oct 2026 — Andrew: "when we click got it,
 * make the animation better"). It used to flash a border for 220ms and then
 * swap the card in place. Now the answered card leaves the way the verdict
 * points — right for got it, left for not yet — tilting as it goes, while the
 * next card rises into place behind it. With the answer showing you can also
 * drag it: it follows your finger, a "Got it" / "Not yet" stamp fades in, and
 * letting go past the line (or flicking) decides. Short of the line it springs
 * back. Reduced motion: a plain fade.
 */
const cardMotion = {
  enter: { opacity: 0, y: 14, scale: 0.97, x: 0, rotate: 0 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: 0,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 420, damping: 34, delay: 0.06 },
  },
  exit: (dir: 1 | -1) => ({
    x: dir * 560,
    y: 24,
    rotate: dir * 14,
    opacity: 0,
    transition: { duration: 0.34, ease: [0.32, 0.72, 0, 1] as const },
  }),
};
const fadeMotion = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

function SwipeCard({
  draggable,
  reduceMotion,
  onSwipe,
  children,
}: {
  draggable: boolean;
  reduceMotion: boolean;
  onSwipe: (dir: 1 | -1) => void;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 0, 260], [-9, 0, 9]);
  const gotIt = useTransform(x, [24, 110], [0, 1]);
  const notYet = useTransform(x, [-110, -24], [1, 0]);
  /**
   * A drag ends in a click, and that click must not flip the card. The click
   * can land after framer's drag-end callback, so a flag cleared there isn't
   * enough: ignore clicks for a moment after any drag.
   */
  const dragUntil = useRef(0);
  // The card on its way out takes no more taps or keys.
  const present = useIsPresent();

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const far = Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 650;
    if (far) {
      haptic(info.offset.x > 0 ? 15 : [10, 30, 10]);
      onSwipe(info.offset.x > 0 ? 1 : -1);
    }
    dragUntil.current = Date.now() + 350;
  };

  return (
    <motion.div
      variants={reduceMotion ? fadeMotion : cardMotion}
      initial="enter"
      animate="center"
      exit="exit"
      style={reduceMotion ? undefined : { x, rotate }}
      drag={draggable && !reduceMotion ? 'x' : false}
      dragSnapToOrigin
      dragElastic={0.85}
      onDragStart={() => (dragUntil.current = Number.MAX_SAFE_INTEGER)}
      onDragEnd={onDragEnd}
      onClickCapture={(e) => {
        if (Date.now() < dragUntil.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      className={cn('relative [grid-area:1/1]', !present && 'pointer-events-none')}
      aria-hidden={!present || undefined}
    >
      {!reduceMotion && (
        <>
          <motion.span
            aria-hidden
            style={{ opacity: gotIt }}
            className="pointer-events-none absolute left-6 top-6 z-30 -rotate-6 rounded-xl border-2 border-emerald-400 bg-[#1c1c1c] px-3.5 py-1.5 text-[18px] font-bold text-emerald-400"
          >
            Got it
          </motion.span>
          <motion.span
            aria-hidden
            style={{ opacity: notYet }}
            className="pointer-events-none absolute right-6 top-6 z-30 rotate-6 rounded-xl border-2 border-orange-400 bg-[#1c1c1c] px-3.5 py-1.5 text-[18px] font-bold text-orange-400"
          >
            Not yet
          </motion.span>
        </>
      )}
      {children}
    </motion.div>
  );
}

const FlashcardStudySession = ({
  setId,
  studyMode,
  onExit,
  nextUp,
  dueCardIds,
  orderIds,
  queue,
}: FlashcardStudySessionProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  /** False for the frame a new card mounts, so the flip cannot animate on swap. */
  const [flipAnimatable, setFlipAnimatable] = useState(true);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  /**
   * Missed cards come back (10 Oct 2026 — "make it better at functioning").
   * A "Not yet" puts the card at the end of the round, up to twice, so a
   * session finishes with the misses answered, not just seen. Accuracy is
   * first-try: a card you get on its second go still counts as missed.
   */
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [requeued, setRequeued] = useState<Record<string, number>>({});
  /** The cards this session started with (the queue grows as misses come back). */
  const [deckSize, setDeckSize] = useState(0);
  /** Which way the answered card leaves: +1 right (got it), -1 left (not yet). */
  const [exitDir, setExitDir] = useState<1 | -1>(1);

  const { recordSession } = useStudyStreak();
  const { updateCardProgress } = useFlashcardProgress();
  const { recentlyUnlocked, reportSession } = useFlashcardAchievements();
  const sessionRecordedRef = useRef(false);

  /** cardId -> the deck it belongs to, so progress is written back correctly. */
  const [ownerOf, setOwnerOf] = useState<Record<string, string>>({});

  useEffect(() => {
    /*
     * A cross-deck queue keeps the order the schedule gave it (most overdue
     * first). Re-sorting it by difficulty would undo the scheduling, which is
     * the whole point of the queue.
     */
    if (queue && queue.length > 0) {
      const owners: Record<string, string> = {};
      const queued: FlashcardData[] = [];
      for (const entry of queue) {
        const card = (flashcardSets[entry.setId] || []).find((c) => c.id === entry.cardId);
        // A card can disappear when a deck is edited; its progress row outlives
        // it. Skip rather than render a blank card.
        if (!card) continue;
        owners[card.id] = entry.setId;
        queued.push(card);
      }
      setOwnerOf(owners);
      setFlashcards(queued);
      setDeckSize(queued.length);
      return;
    }

    let cards = flashcardSets[setId] || [];

    if (dueCardIds && dueCardIds.length > 0) {
      const dueSet = new Set(dueCardIds);
      const due = cards.filter((c) => dueSet.has(c.id));
      // Due ids that no longer match a card (a card removed from the deck)
      // would leave an empty session stuck on "Loading": fall back to the deck.
      if (due.length > 0) cards = due;
    }

    let orderedCards = [...cards];

    // Fisher–Yates (sorting by a random comparator isn't a fair shuffle).
    const shuffled = (list: FlashcardData[]) => {
      const out = [...list];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    };
    if (orderIds && orderIds.length > 0) {
      const rank = new Map(orderIds.map((id, i) => [id, i]));
      orderedCards = [...orderedCards].sort(
        (a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9)
      );
    } else if (studyMode === 'quick') {
      orderedCards = shuffled(orderedCards).slice(0, 10);
    } else if (studyMode === 'random') {
      orderedCards = shuffled(orderedCards);
    } else if (studyMode === 'spaced') {
      orderedCards = orderedCards.sort((a, b) => {
        const difficultyWeight = { easy: 1, medium: 2, hard: 3 };
        return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty];
      });
    }

    setOwnerOf({});
    setFlashcards(orderedCards);
    setDeckSize(orderedCards.length);
  }, [setId, studyMode, dueCardIds, orderIds, queue]);

  /** The deck an answer belongs to — the card's own, on a mixed queue. */
  const deckOf = useCallback((cardId: string) => ownerOf[cardId] ?? setId, [ownerOf, setId]);

  useEffect(() => {
    if (isCompleted && flashcards.length > 0 && !sessionRecordedRef.current) {
      sessionRecordedRef.current = true;
      recordSession(deckSize || flashcards.length);
      const durationSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
      const unique = deckSize || flashcards.length;
      const accuracy = Math.round(((unique - missed.size) / unique) * 100);
      reportSession({
        accuracy,
        durationSeconds,
        cardCount: unique,
        mode: studyMode,
      });
    }
  }, [
    isCompleted,
    flashcards.length,
    recordSession,
    reportSession,
    sessionStartTime,
    correctAnswers,
    studyMode,
    deckSize,
    missed.size,
  ]);

  /*
   * Re-enable the flip transition one frame AFTER the card changes.
   *
   * Two rAFs, not one: the first fires before the browser has painted the new
   * card, so re-enabling there would still let the very first paint animate.
   */
  useEffect(() => {
    setFlipAnimatable(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setFlipAnimatable(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [currentIndex]);

  const currentCard = flashcards[currentIndex];
  const total = flashcards.length;
  const progress = total > 0 ? Math.round((currentIndex / total) * 100) : 0;
  const toGo = Math.max(0, total - currentIndex);

  /** When the current card arrived: a tap that lands in its first moments was
   *  meant for the card before (a double tap on Got it), not a reveal. */
  const arrivedAt = useRef(0);
  const handleFlip = useCallback(() => {
    if (Date.now() - arrivedAt.current < 380) return;
    haptic(8);
    setIsFlipped((prev) => !prev);
  }, []);

  // The queue's live length: a miss on the last card adds it back, and the
  // move to the next card (220ms later) must see that, not the old length.
  const lengthRef = useRef(0);
  lengthRef.current = flashcards.length;
  const indexRef = useRef(0);
  indexRef.current = currentIndex;

  /** `added` = cards just appended this tick (a requeued miss), not yet in the ref. */
  const handleNextCard = useCallback((added = 0) => {
    arrivedAt.current = Date.now();
    if (indexRef.current < lengthRef.current - 1 + added) {
      setIsFlipped(false);
      setCurrentIndex(indexRef.current + 1);
    } else {
      setIsCompleted(true);
    }
  }, []);

  /**
   * Cards answered in this session. Only the first answer moves a card's
   * schedule: a missed card coming back is practice, and getting it right on
   * the third go mustn't push its next review out as if it were known.
   */
  const answeredRef = useRef<Set<string>>(new Set());
  const record = useCallback(
    (cardId: string, correct: boolean) => {
      if (answeredRef.current.has(cardId)) return;
      answeredRef.current.add(cardId);
      updateCardProgress(deckOf(cardId), cardId, correct);
    },
    [deckOf, updateCardProgress]
  );

  const handleMarkCorrect = useCallback(() => {
    haptic(15);
    if (currentCard) {
      record(currentCard.id, true);
      setMasteredCards((prev) => new Set([...prev, currentCard.id]));
      setCorrectAnswers((prev) => prev + 1);
      setSeen((prev) => new Set([...prev, currentCard.id]));
    }
    setExitDir(1);
    handleNextCard();
  }, [currentCard, record, handleNextCard]);

  const handleMarkIncorrect = useCallback(() => {
    haptic([10, 30, 10]);
    if (currentCard) {
      record(currentCard.id, false);
      const id = currentCard.id;
      // A miss on first sight counts against first-try accuracy.
      if (!seen.has(id)) setMissed((prev) => new Set([...prev, id]));
      setSeen((prev) => new Set([...prev, id]));
      // Back at the end of the round, up to twice.
      const again = (requeued[id] ?? 0) < 2;
      if (again) {
        setRequeued((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
        setFlashcards((prev) => [...prev, currentCard]);
      }
      setExitDir(-1);
      handleNextCard(again ? 1 : 0);
      return;
    }
    setExitDir(-1);
    handleNextCard();
  }, [currentCard, record, handleNextCard, seen, requeued]);

  /** Again: the whole set, or (`onlyMissed`) just the cards that tripped you up. */
  const handleRestart = (onlyMissed = false) => {
    if (onlyMissed && missed.size > 0) {
      const unique = new Map(flashcards.map((c) => [c.id, c]));
      const subset = [...missed].map((id) => unique.get(id)).filter(Boolean) as FlashcardData[];
      setFlashcards(subset);
      setDeckSize(subset.length);
    } else {
      const unique = [...new Map(flashcards.map((c) => [c.id, c])).values()];
      setFlashcards(unique);
      setDeckSize(unique.length);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setIsCompleted(false);
    setCorrectAnswers(0);
    setSeen(new Set());
    setMissed(new Set());
    setRequeued({});
    setSessionStartTime(Date.now());
    answeredRef.current = new Set();
    sessionRecordedRef.current = false;
  };

  const reduceMotion = useReducedMotion();

  /*
   * Keyboard and screen-reader users: when a card is answered, focus moves to
   * the next card (it used to drop to the page as the old card unmounted).
   * Only when focus was already in the session, so a phone tap never pulls
   * focus anywhere.
   */
  const sessionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = sessionRef.current;
    if (!root || !root.contains(document.activeElement)) return;
    const id = requestAnimationFrame(() => {
      const cards = root.querySelectorAll<HTMLElement>('[data-flip-card]');
      cards[cards.length - 1]?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [currentIndex]);

  /** Leaving part way: the cards answered still count towards the streak. */
  const exitEarly = () => {
    if (answeredRef.current.size > 0 && !sessionRecordedRef.current) {
      sessionRecordedRef.current = true;
      recordSession(answeredRef.current.size);
    }
    onExit();
  };

  /** A drag across the answer face: right for got it, left for not yet. */
  const onSwipe = useCallback(
    (dir: 1 | -1) => (dir === 1 ? handleMarkCorrect() : handleMarkIncorrect()),
    [handleMarkCorrect, handleMarkIncorrect]
  );

  // Keyboard: space/enter reveals, arrows mark. Desktop study is a real use case.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isCompleted || e.repeat) return;
      // Enter/Space on a focused button is that button's (Got it, Exit…).
      const t = e.target as HTMLElement | null;
      if (t?.closest('button, a, input, textarea, select')) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight' && isFlipped) {
        handleMarkCorrect();
      } else if (e.code === 'ArrowLeft' && isFlipped) {
        handleMarkIncorrect();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleFlip, handleMarkCorrect, handleMarkIncorrect, isFlipped, isCompleted]);

  const achievementToast = <AchievementUnlockToast achievements={recentlyUnlocked} />;

  if (flashcards.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-[14px] text-white">Loading flashcards…</p>
      </div>
    );
  }

  // ─── Completion ───────────────────────────────────────────────────────────
  if (isCompleted) {
    const unique = [...new Map(flashcards.map((c) => [c.id, c])).values()];
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const firstTry = unique.length - missed.size;
    const successRate = unique.length ? Math.round((firstTry / unique.length) * 100) : 0;
    const missedCards = unique.filter((c) => missed.has(c.id));
    const headline =
      missedCards.length === 0
        ? 'Every card, first time'
        : successRate >= 80
          ? 'Nearly there'
          : successRate >= 50
            ? 'Good session'
            : 'Worth another go';

    return (
      <div className="mx-auto max-w-3xl space-y-5 px-4 pb-24 pt-4 text-left">
        {achievementToast}

        <div className="rounded-3xl border border-white/[0.12] bg-white/[0.04] p-6 sm:p-8">
          <p className="text-[13px] font-medium text-white">Session done</p>
          <h2 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white">
            {headline}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            {firstTry} of {unique.length} right first time
            {missedCards.length > 0
              ? `. The ${missedCards.length} you missed came back and you went over ${missedCards.length === 1 ? 'it' : 'them'} again.`
              : '.'}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { label: 'Cards', value: String(unique.length) },
              { label: 'First try', value: `${successRate}%` },
              { label: 'Minutes', value: `${sessionDuration || '<1'}` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.1] px-3.5 py-3">
                <p className="text-[12.5px] font-semibold text-white">{stat.label}</p>
                <p className="mt-1 text-[22px] font-bold tabular-nums text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {nextUp && (
          <button
            type="button"
            onClick={nextUp.start}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.04] px-4 py-3.5 text-left transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.08]"
          >
            <span className="min-w-0">
              <span className="block text-[12.5px] font-medium text-white">Up next</span>
              <span className="mt-0.5 block text-[15.5px] font-semibold leading-snug text-white">
                {nextUp.title}
              </span>
              <span className="mt-0.5 block text-[13px] text-white">{nextUp.detail}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-white" aria-hidden />
          </button>
        )}

        <div className="flex flex-col gap-2.5">
          {missedCards.length > 0 && (
            <button
              type="button"
              onClick={() => handleRestart(true)}
              className={cn(primaryButtonCn, 'w-full')}
            >
              Practise the {missedCards.length} you missed
            </button>
          )}
          <button
            type="button"
            onClick={() => handleRestart(false)}
            className={cn(missedCards.length ? ghostButtonCn : primaryButtonCn, 'w-full')}
          >
            <RotateCcw className="mr-2 inline h-5 w-5" />
            Go through all {unique.length} again
          </button>
          <button type="button" onClick={onExit} className={cn(ghostButtonCn, 'w-full')}>
            <ArrowLeft className="mr-2 inline h-5 w-5" />
            Back to decks
          </button>
        </div>

        {missedCards.length > 0 && (
          <section className="space-y-2.5" aria-labelledby="fc-missed">
            <h3 id="fc-missed" className="text-[17px] font-bold tracking-tight text-white">
              The ones that tripped you up
            </h3>
            <ul className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.1]">
              {missedCards.map((c) => (
                <li key={c.id} className="px-4 py-3.5">
                  <p className="text-[14.5px] font-semibold leading-snug text-white">
                    {c.question}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-snug text-white">{c.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // ─── Study ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={sessionRef}
      className="mx-auto max-w-4xl space-y-4 px-4 pb-24 text-left [overflow-x:clip] lg:space-y-5"
    >
      {achievementToast}

      {/* Session bar: where you are, in one line */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button type="button" onClick={exitEarly} className={ghostButtonCn}>
          <ArrowLeft className="mr-1.5 inline h-4 w-4" />
          Exit
        </button>
        <p className="text-[13.5px] font-semibold tabular-nums text-white">
          {toGo} to go
          {masteredCards.size > 0 && (
            <span className="ml-2 text-emerald-400">· {masteredCards.size} got it</span>
          )}
        </p>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.10]">
        <motion.div
          className="h-full rounded-full bg-elec-yellow"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* The card */}
      {/* One grid cell: the leaving card and the next one overlap while they swap. */}
      <div className="grid" style={{ perspective: '1200px' }}>
        <AnimatePresence initial={false} custom={exitDir}>
          <SwipeCard
            key={currentIndex}
            draggable={isFlipped}
            reduceMotion={!!reduceMotion}
            onSwipe={onSwipe}
          >
            <div
              role="button"
              tabIndex={0}
              data-flip-card
              aria-label={isFlipped ? 'Hide the answer' : 'Reveal the answer'}
              onClick={(e) => {
                /*
                 * A click that started on a verdict button is that button's, not a
                 * reveal.
                 *
                 * `hit !== e.currentTarget` is load-bearing: this card carries
                 * `role="button"` for accessibility, and `closest()` matches the
                 * element it starts from — so without the comparison the guard
                 * matched the CARD ITSELF and swallowed every reveal.
                 */
                const hit = (e.target as HTMLElement | null)?.closest(INTERACTIVE);
                if (hit && hit !== e.currentTarget) return;
                handleFlip();
              }}
              className="group relative h-[calc(100dvh-270px)] min-h-[380px] w-full cursor-pointer touch-manipulation outline-none sm:h-auto sm:min-h-[460px] lg:min-h-[540px]"
              style={{
                transformStyle: 'preserve-3d',
                // Off for the frame a new card mounts — see flipAnimatable.
                transition: flipAnimatable ? 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' : 'none',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Question */}
              <div
                className={cn(faceCn, 'flex flex-col justify-between p-5 sm:p-10 lg:p-12')}
                style={{ backfaceVisibility: 'hidden' }}
                {...(isFlipped ? { inert: '' } : {})}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white">
                    {requeued[currentCard?.id ?? ''] ? 'Back again' : 'Question'}
                  </span>
                  {currentCard?.difficulty && (
                    <span className="rounded-full border border-white/[0.14] px-2.5 py-1 text-[12px] font-medium capitalize text-white">
                      {currentCard.difficulty}
                    </span>
                  )}
                </div>

                <p className="py-6 text-[22px] font-semibold leading-snug tracking-tight text-white sm:text-[28px] lg:text-[32px]">
                  {currentCard?.question}
                </p>

                <p className="text-center text-[13px] font-medium text-white">
                  <span className="sm:hidden">Tap the card to see the answer</span>
                  <span className="hidden sm:inline">Click or press Space to see the answer</span>
                </p>
              </div>

              {/* Answer */}
              <div
                className={cn(faceCn, 'flex flex-col justify-between p-5 sm:p-10 lg:p-12')}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                {...(!isFlipped ? { inert: '' } : {})}
              >
                {/* The question stays in view, small, so the answer has its context. */}
                <p className="line-clamp-2 text-[13.5px] font-medium leading-snug text-white sm:text-[15px]">
                  {currentCard?.question}
                </p>

                <div className="my-4 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain border-t border-white/[0.1] pt-4">
                  {/* Centred when short, scrolls from the top when long. */}
                  <div className="my-auto">
                    <p
                      className={cn(
                        'leading-relaxed text-white',
                        // A one-word answer ("Brown") reads as the answer, not a footnote.
                        (currentCard?.answer.length ?? 0) < 60
                          ? 'text-[26px] font-semibold leading-snug sm:text-[34px] lg:text-[40px]'
                          : 'text-[17px] sm:text-[20px] lg:text-[22px]'
                      )}
                    >
                      {currentCard?.answer}
                    </p>

                    {/* Where to check it. Quiet — the answer is the card, this is
                  the footnote that makes the answer checkable. */}
                    {currentCard?.reference && (
                      <p className="mt-3 text-[12.5px] leading-snug text-white">
                        {currentCard.reference}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkIncorrect();
                      }}
                      className={cn(ghostButtonCn, 'h-14 w-full text-[16px]')}
                    >
                      Not yet
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkCorrect();
                      }}
                      className={cn(primaryButtonCn, 'h-14 w-full text-[16px]')}
                    >
                      Got it
                    </button>
                  </div>
                  <p className="text-center text-[12.5px] text-white">
                    <span className="sm:hidden">Or swipe: right for got it, left for not yet</span>
                    <span className="hidden sm:inline">Keys: → got it · ← not yet</span>
                  </p>
                </div>
              </div>
            </div>
          </SwipeCard>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashcardStudySession;
