import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Trophy,
  Star,
} from 'lucide-react';
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
  /** When provided, filter the set to only these card IDs (for "Due Today" mode) */
  dueCardIds?: string[];
}

/** Trigger a short haptic vibration (safe no-op on unsupported devices) */
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

  // Hooks for persistence
  const { recordSession } = useStudyStreak();
  const { updateCardProgress } = useFlashcardProgress();
  const { recentlyUnlocked, reportSession } = useFlashcardAchievements();
  const sessionRecordedRef = useRef(false);

  useEffect(() => {
    let cards = flashcardSets[setId] || [];

    // Filter to only due cards when in "Due Today" mode
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

  // Record streak + achievements when session completes
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

  const getDifficultyColour = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30';
      case 'hard':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="p-4 rounded-full bg-elec-yellow/10 inline-block mb-4">
            <Target className="h-8 w-8 text-elec-yellow animate-pulse" />
          </div>
          <p className="text-white">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  // Achievement unlock toast (shown across all states)
  const achievementToast = <AchievementUnlockToast achievements={recentlyUnlocked} />;

  // Completion screen
  if (isCompleted) {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const successRate = Math.round((correctAnswers / flashcards.length) * 100);
    const performanceLabel =
      successRate >= 80 ? 'Outstanding!' : successRate >= 60 ? 'Well Done!' : 'Keep Practising!';

    return (
      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-6 animate-fade-in">
        {achievementToast}

        {/* Mastery celebration for high scores */}
        {successRate >= 80 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            className="flex justify-center pt-4"
          >
            <div className="flex items-center gap-2">
              {successRate === 100 && <Star className="h-5 w-5 text-elec-yellow animate-pulse" />}
              <Trophy
                className={`h-8 w-8 ${successRate === 100 ? 'text-elec-yellow' : 'text-green-400'}`}
              />
              {successRate === 100 && <Star className="h-5 w-5 text-elec-yellow animate-pulse" />}
            </div>
          </motion.div>
        )}

        {/* Large progress ring */}
        <div className="flex flex-col items-center pt-8">
          <MiniProgressRing score={successRate} size={120} strokeWidth={8} />
          <h2 className="text-2xl font-bold text-white mt-4">{performanceLabel}</h2>
          {successRate === 100 && (
            <p className="text-sm text-elec-yellow mt-1 font-medium">Perfect score!</p>
          )}
        </div>

        {/* Stat pills */}
        <div className="flex gap-3 justify-center">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center">
            <div className="text-lg font-bold text-elec-yellow">{flashcards.length}</div>
            <div className="text-[10px] text-white">Cards</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center">
            <div className="text-lg font-bold text-green-400">{successRate}%</div>
            <div className="text-[10px] text-white">Accuracy</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center">
            <div className="text-lg font-bold text-blue-400">{sessionDuration || '<1'}m</div>
            <div className="text-[10px] text-white">Time</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleRestart}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-14 text-base font-semibold touch-manipulation active:scale-[0.98]"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Study Again
          </Button>
          <Button
            variant="outline"
            onClick={onExit}
            className="border-white/20 text-white hover:bg-white/10 h-14 text-base touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Sets
          </Button>
        </div>
      </div>
    );
  }

  // Study session
  const diffColour = currentCard?.difficulty ? getDifficultyColour(currentCard.difficulty) : '';

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20 space-y-4 animate-fade-in">
      {achievementToast}
      {/* Header bar */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExit}
          className="border-white/20 text-white hover:bg-white/10 h-10 touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Exit
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Target className="h-3.5 w-3.5 text-elec-yellow" />
            <span className="text-white font-medium">
              {currentIndex + 1}/{flashcards.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            <span className="text-green-400 font-medium">{masteredCards.size}</span>
          </div>
          <MiniProgressRing score={progress} size={28} strokeWidth={2.5} />
        </div>
      </div>

      {/* 3D Flip Card */}
      <div {...swipeHandlers} className="relative" style={{ perspective: '1000px' }}>
        {/* Swipe feedback overlay */}
        {swipeFeedback && (
          <div
            className={`absolute inset-0 z-20 rounded-2xl pointer-events-none transition-opacity ${
              swipeFeedback === 'correct'
                ? 'bg-green-500/20 border-2 border-green-500/50'
                : 'bg-red-500/20 border-2 border-red-500/50'
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
              {/* Front face */}
              <div
                className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-8 flex flex-col"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Category + difficulty badges */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs text-white font-medium">{currentCard?.category}</span>
                  {currentCard?.difficulty && (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${diffColour}`}>
                      {currentCard.difficulty.charAt(0).toUpperCase() +
                        currentCard.difficulty.slice(1)}
                    </span>
                  )}
                </div>

                {/* Question centred */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-lg sm:text-xl text-white font-medium leading-relaxed text-center">
                    {currentCard?.question}
                  </p>
                </div>

                {/* Tap hint */}
                <p className="text-xs text-white text-center mt-4">Tap to flip</p>
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 rounded-2xl bg-white/5 border border-elec-yellow/20 p-5 sm:p-8 flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* Answer header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 rounded bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30 font-medium">
                    Answer
                  </span>
                </div>

                {/* Answer text */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-base sm:text-lg text-white font-medium leading-relaxed text-center">
                    {currentCard?.answer}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkIncorrect();
                    }}
                    variant="outline"
                    className="border-red-500/30 bg-red-500/10 text-red-400 h-14 touch-manipulation active:scale-[0.98]"
                  >
                    <XCircle className="mr-2 h-5 w-5" />
                    Need Practice
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkCorrect();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white h-14 touch-manipulation active:scale-[0.98]"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Got It!
                  </Button>
                </div>

                {/* Swipe hint */}
                <p className="text-xs text-white text-center mt-3">
                  Swipe right = Got It | Swipe left = Need Practice
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
