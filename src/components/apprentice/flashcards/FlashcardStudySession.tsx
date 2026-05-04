import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardAchievements } from '@/hooks/useFlashcardAchievements';
import { flashcardSets, type FlashcardData } from '@/data/flashcards';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence, motion } from 'framer-motion';
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

const FlashcardStudySession = ({
  setId,
  studyMode,
  onExit,
  dueCardIds,
}: FlashcardStudySessionProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
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

  const currentCard = flashcards[currentIndex];
  const progress =
    flashcards.length > 0 ? Math.round(((currentIndex + 1) / flashcards.length) * 100) : 0;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNextCard = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setSwipeDirection(null);
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
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
    setSwipeDirection('right');
    setTimeout(() => {
      setSwipeFeedback(null);
      handleNextCard();
    }, 300);
  }, [currentCard, setId, updateCardProgress, handleNextCard]);

  const handleMarkIncorrect = useCallback(() => {
    haptic([10, 30, 10]);
    if (currentCard) {
      updateCardProgress(setId, currentCard.id, false);
    }
    setSwipeFeedback('incorrect');
    setSwipeDirection('left');
    setTimeout(() => {
      setSwipeFeedback(null);
      handleNextCard();
    }, 300);
  }, [currentCard, setId, updateCardProgress, handleNextCard]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setIsCompleted(false);
    setCorrectAnswers(0);
    setSwipeDirection(null);
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
    onTap: () => {
      handleFlip();
    },
    trackMouse: false,
    delta: 50,
  });

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[14px] text-white/55">Loading flashcards…</p>
      </div>
    );
  }

  const achievementToast = <AchievementUnlockToast achievements={recentlyUnlocked} />;

  if (isCompleted) {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const successRate = Math.round((correctAnswers / flashcards.length) * 100);
    const performanceLabel =
      successRate >= 80 ? 'Outstanding' : successRate >= 60 ? 'Well done' : 'Keep practising';

    return (
      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-6 animate-fade-in text-left">
        {achievementToast}

        <div className="flex flex-col items-center pt-8 space-y-3">
          <MiniProgressRing score={successRate} size={120} strokeWidth={6} />
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white">
            {performanceLabel}
          </h2>
          {successRate === 100 && (
            <p className="text-[12px] text-elec-yellow font-medium">Perfect score</p>
          )}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Cards
            </span>
            <p className="text-[20px] font-semibold text-white font-mono">{flashcards.length}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Accuracy
            </span>
            <p className="text-[20px] font-semibold text-white font-mono">{successRate}%</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Time
            </span>
            <p className="text-[20px] font-semibold text-white font-mono">
              {sessionDuration || '<1'}m
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleRestart}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12 text-[14px] font-semibold touch-manipulation active:scale-[0.98]"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Study again
          </Button>
          <Button
            variant="outline"
            onClick={onExit}
            className="border-white/15 text-white hover:bg-white/[0.05] h-12 text-[14px] touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to sets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20 space-y-4 animate-fade-in text-left">
      {achievementToast}

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExit}
          className="border-white/15 text-white hover:bg-white/[0.05] h-10 touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Exit
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-white/85 font-mono px-2 py-1 rounded-md border border-white/10 bg-white/[0.03]">
            {currentIndex + 1}/{flashcards.length}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] text-white/85 font-mono px-2 py-1 rounded-md border border-white/10 bg-white/[0.03]">
            <CheckCircle className="h-3 w-3 text-elec-yellow" />
            {masteredCards.size}
          </span>
          <MiniProgressRing score={progress} size={28} strokeWidth={2.5} />
        </div>
      </div>

      <div {...swipeHandlers} className="relative" style={{ perspective: '1000px' }}>
        {swipeFeedback && (
          <div
            className={`absolute inset-0 z-20 rounded-2xl pointer-events-none transition-opacity ${
              swipeFeedback === 'correct'
                ? 'bg-elec-yellow/[0.04] border-2 border-elec-yellow/40'
                : 'bg-red-500/[0.04] border-2 border-red-500/40'
            }`}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{
              x: swipeDirection === 'right' ? -100 : swipeDirection === 'left' ? 100 : 0,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: swipeDirection === 'right' ? 300 : swipeDirection === 'left' ? -300 : 0,
              opacity: 0,
            }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="w-full min-h-[350px] sm:min-h-[400px] cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s ease',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 sm:p-8 flex flex-col"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex items-baseline justify-between mb-6 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  <span>{currentCard?.category}</span>
                  {currentCard?.difficulty && <span>{currentCard.difficulty}</span>}
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <p className="text-[18px] sm:text-[20px] text-white font-medium leading-relaxed text-center">
                    {currentCard?.question}
                  </p>
                </div>

                <p className="text-[12px] text-white/55 text-center mt-4">Tap to flip</p>
              </div>

              <div
                className="absolute inset-0 rounded-2xl bg-white/[0.02] border border-elec-yellow/20 p-5 sm:p-8 flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85 mb-4">
                  Answer
                </span>

                <div className="flex-1 flex items-center justify-center">
                  <p className="text-[16px] sm:text-[18px] text-white font-medium leading-relaxed text-center">
                    {currentCard?.answer}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkIncorrect();
                    }}
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/[0.05] h-12 touch-manipulation active:scale-[0.98]"
                  >
                    <XCircle className="mr-2 h-5 w-5" />
                    Need practice
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkCorrect();
                    }}
                    className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-12 touch-manipulation active:scale-[0.98]"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Got it
                  </Button>
                </div>

                <p className="text-[12px] text-white/55 text-center mt-3">
                  Swipe right = got it · Swipe left = need practice
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashcardStudySession;
