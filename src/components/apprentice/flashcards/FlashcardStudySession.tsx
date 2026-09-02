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
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardAchievements } from '@/hooks/useFlashcardAchievements';
import { flashcardSets, type FlashcardData } from '@/data/flashcards';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  eyebrowCn,
  ghostButtonCn,
  primaryButtonCn,
  statValueCn,
} from '@/components/shared/surfaceStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import MiniProgressRing from './MiniProgressRing';
import AchievementUnlockToast from './AchievementUnlockToast';

interface FlashcardStudySessionProps {
  setId: string;
  studyMode: string;
  onExit: () => void;
  dueCardIds?: string[];
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
const faceCn = cn('absolute inset-0 rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

const FlashcardStudySession = ({
  setId,
  studyMode,
  onExit,
  dueCardIds,
}: FlashcardStudySessionProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  /** False for the frame a new card mounts, so the flip cannot animate on swap. */
  const [flipAnimatable, setFlipAnimatable] = useState(true);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [swipeFeedback, setSwipeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const { recordSession } = useStudyStreak();
  const { updateCardProgress } = useFlashcardProgress();
  const { recentlyUnlocked, reportSession } = useFlashcardAchievements();
  const sessionRecordedRef = useRef(false);

  useEffect(() => {
    let cards = flashcardSets[setId] || [];

    if (dueCardIds && dueCardIds.length > 0) {
      const dueSet = new Set(dueCardIds);
      cards = cards.filter((c) => dueSet.has(c.id));
    }

    let orderedCards = [...cards];

    if (studyMode === 'random') {
      orderedCards = orderedCards.sort(() => Math.random() - 0.5);
    } else if (studyMode === 'spaced') {
      orderedCards = orderedCards.sort((a, b) => {
        const difficultyWeight = { easy: 1, medium: 2, hard: 3 };
        return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty];
      });
    }

    setFlashcards(orderedCards);
  }, [setId, studyMode, dueCardIds]);

  useEffect(() => {
    if (isCompleted && flashcards.length > 0 && !sessionRecordedRef.current) {
      sessionRecordedRef.current = true;
      recordSession(flashcards.length);
      const durationSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
      const accuracy = Math.round((correctAnswers / flashcards.length) * 100);
      reportSession({
        accuracy,
        durationSeconds,
        cardCount: flashcards.length,
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
  const progress = total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  const handleFlip = useCallback(() => {
    haptic(8);
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNextCard = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, flashcards.length]);

  const handleMarkCorrect = useCallback(() => {
    haptic(15);
    if (currentCard) {
      updateCardProgress(setId, currentCard.id, true);
      setMasteredCards((prev) => new Set([...prev, currentCard.id]));
      setCorrectAnswers((prev) => prev + 1);
    }
    setSwipeFeedback('correct');
    setTimeout(() => {
      setSwipeFeedback(null);
      handleNextCard();
    }, 220);
  }, [currentCard, setId, updateCardProgress, handleNextCard]);

  const handleMarkIncorrect = useCallback(() => {
    haptic([10, 30, 10]);
    if (currentCard) {
      updateCardProgress(setId, currentCard.id, false);
    }
    setSwipeFeedback('incorrect');
    setTimeout(() => {
      setSwipeFeedback(null);
      handleNextCard();
    }, 220);
  }, [currentCard, setId, updateCardProgress, handleNextCard]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setIsCompleted(false);
    setCorrectAnswers(0);
    setSwipeFeedback(null);
    sessionRecordedRef.current = false;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (isFlipped) handleMarkIncorrect();
    },
    onSwipedRight: () => {
      if (isFlipped) handleMarkCorrect();
    },
    /*
     * Reveal is an onClick on the card, NOT react-swipeable's `onTap`.
     *
     * Two bugs, one cause. `onTap` fires on touchend, so:
     *
     *  - With `trackMouse: false` it never fires for a mouse at all — the card
     *    said "Tap to reveal", showed a pointer cursor, and was completely
     *    inert on a desktop. Only the space bar worked.
     *  - The verdict buttons call `e.stopPropagation()`, but that is on the
     *    React *click* event, which happens after touchend and cannot stop a
     *    touch handler — so every tap on "Got it" advanced the card AND
     *    toggled the flip.
     *
     * A plain click fires for mouse and touch alike, and `stopPropagation` on
     * the buttons genuinely stops it. Swipes are unaffected: the browser
     * suppresses the click when the finger has travelled.
     */
    trackMouse: false,
    delta: 50,
  });

  // Keyboard: space/enter reveals, arrows mark. Desktop study is a real use case.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isCompleted) return;
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
        <p className="text-[14px] text-white opacity-70">Loading flashcards…</p>
      </div>
    );
  }

  // ─── Completion ───────────────────────────────────────────────────────────
  if (isCompleted) {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const successRate = Math.round((correctAnswers / flashcards.length) * 100);
    const performanceLabel =
      successRate >= 80 ? 'Outstanding' : successRate >= 60 ? 'Well done' : 'Keep practising';

    return (
      <div className="mx-auto max-w-2xl space-y-5 px-4 pb-20 text-left">
        {achievementToast}

        <div className="flex flex-col items-center space-y-3 pt-8">
          <MiniProgressRing score={successRate} size={120} strokeWidth={6} />
          <h2 className="text-[22px] font-semibold tracking-tight text-white">
            {performanceLabel}
          </h2>
          {successRate === 100 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-elec-yellow px-3 py-1 text-[12px] font-semibold text-black">
              <Sparkles className="h-3.5 w-3.5" />
              Perfect score
            </span>
          )}
        </div>

        <div
          className={cn(
            'grid grid-cols-3 divide-x divide-white/[0.14] overflow-hidden rounded-2xl border border-elec-yellow/35',
            CARD_SURFACE
          )}
        >
          {[
            { label: 'Cards', value: String(flashcards.length) },
            { label: 'Accuracy', value: `${successRate}%` },
            { label: 'Time', value: `${sessionDuration || '<1'}m` },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-4">
              <span className={eyebrowCn}>{stat.label}</span>
              <p className={cn(statValueCn, 'text-white')}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button type="button" onClick={handleRestart} className={cn(primaryButtonCn, 'w-full')}>
            <RotateCcw className="mr-2 inline h-5 w-5" />
            Study again
          </button>
          <button type="button" onClick={onExit} className={cn(ghostButtonCn, 'w-full')}>
            <ArrowLeft className="mr-2 inline h-5 w-5" />
            Back to sets
          </button>
        </div>
      </div>
    );
  }

  // ─── Study ────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 pb-20 text-left">
      {achievementToast}

      {/* Session bar */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button type="button" onClick={onExit} className={ghostButtonCn}>
          <ArrowLeft className="mr-1.5 inline h-4 w-4" />
          Exit
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold tabular-nums text-white">
            {currentIndex + 1}/{total}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold tabular-nums text-white">
            <CheckCircle className="h-3.5 w-3.5 text-elec-yellow" />
            {masteredCards.size}
          </span>
          <MiniProgressRing score={progress} size={30} strokeWidth={2.5} />
        </div>
      </div>

      {/* Progress rail — one glance at how far through you are */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.10]">
        <motion.div
          className="h-full rounded-full bg-elec-yellow"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* The card */}
      <div {...swipeHandlers} className="relative" style={{ perspective: '1200px' }}>
        {swipeFeedback && (
          <div
            className={cn(
              'pointer-events-none absolute inset-0 z-20 rounded-2xl border-2 transition-opacity',
              swipeFeedback === 'correct'
                ? 'border-elec-yellow/50 bg-white/[0.05]'
                : 'border-red-500/50 bg-red-500/[0.06]'
            )}
          />
        )}

        <div
          role="button"
          tabIndex={0}
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
          className="relative min-h-[360px] w-full cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60 sm:min-h-[420px]"
          style={{
            transformStyle: 'preserve-3d',
            // Off for the frame a new card mounts — see flipAnimatable.
            transition: flipAnimatable ? 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' : 'none',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Question */}
          <div
            className={cn(faceCn, 'flex flex-col justify-between p-5 sm:p-8')}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center justify-between">
              <span className={eyebrowCn}>Question</span>
              {currentCard?.difficulty && (
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium capitalize text-white">
                  {currentCard.difficulty}
                </span>
              )}
            </div>

            <p className="py-6 text-[19px] font-semibold leading-snug tracking-tight text-white sm:text-[22px]">
              {currentCard?.question}
            </p>

            <div className="flex items-center justify-center gap-2 text-[13px] font-medium text-white opacity-70">
              <RotateCcw className="h-4 w-4" />
              Tap to reveal
            </div>
          </div>

          {/* Answer */}
          <div
            className={cn(faceCn, 'flex flex-col justify-between p-5 sm:p-8')}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className={eyebrowCn}>Answer</span>

            <div className="max-h-[200px] overflow-y-auto py-4 sm:max-h-[240px]">
              <p className="text-[16px] leading-relaxed text-white sm:text-[17px]">
                {currentCard?.answer}
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkIncorrect();
                  }}
                  className={cn(ghostButtonCn, 'h-12 w-full')}
                >
                  <XCircle className="mr-2 inline h-5 w-5" />
                  Need practice
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkCorrect();
                  }}
                  className={cn(primaryButtonCn, 'h-12 w-full')}
                >
                  <CheckCircle className="mr-2 inline h-5 w-5" />
                  Got it
                </button>
              </div>
              <p className="text-center text-[12px] text-white opacity-70">
                Swipe right for got it · swipe left for practice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudySession;
