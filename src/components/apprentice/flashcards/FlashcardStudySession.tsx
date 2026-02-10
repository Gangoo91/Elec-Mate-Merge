
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, RotateCcw, CheckCircle, Trophy, Clock, Target,
  XCircle, Sparkles, Brain, Zap, ChevronRight, Award, TrendingUp
} from "lucide-react";
import { useStudyStreak } from "@/hooks/useStudyStreak";
import { flashcardSets, type FlashcardData } from "@/data/flashcards";

interface FlashcardStudySessionProps {
  setId: string;
  studyMode: string;
  onExit: () => void;
}

const FlashcardStudySession = ({ setId, studyMode, onExit }: FlashcardStudySessionProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Streak tracking
  const { recordSession } = useStudyStreak();
  const sessionRecordedRef = useRef(false);

  useEffect(() => {
    const cards = flashcardSets[setId] || [];
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
  }, [setId, studyMode]);

  // Record streak when session completes
  useEffect(() => {
    if (isCompleted && flashcards.length > 0 && !sessionRecordedRef.current) {
      sessionRecordedRef.current = true;
      recordSession(flashcards.length);
    }
  }, [isCompleted, flashcards.length, recordSession]);

  const currentCard = flashcards[currentIndex];
  const progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;

  const handleShowAnswer = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(true);
      setIsFlipping(false);
    }, 150);
  };

  const handleMarkCorrect = () => {
    if (currentCard) {
      setMasteredCards(prev => new Set([...prev, currentCard.id]));
      setCorrectAnswers(prev => prev + 1);
    }
    handleNextCard();
  };

  const handleMarkIncorrect = () => {
    handleNextCard();
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setMasteredCards(new Set());
    setIsCompleted(false);
    setCorrectAnswers(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case 'medium': return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case 'hard': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      default: return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="p-4 rounded-full bg-elec-yellow/10 inline-block mb-4">
            <Brain className="h-8 w-8 text-elec-yellow animate-pulse" />
          </div>
          <p className="text-white/70">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  // Completion screen
  if (isCompleted) {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const successRate = Math.round((correctAnswers / flashcards.length) * 100);
    const performanceLevel = successRate >= 80 ? 'excellent' : successRate >= 60 ? 'good' : 'needsWork';

    return (
      <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
        {/* Hero Completion Card */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl" />

          <CardContent className="p-6 sm:p-8 text-center relative">
            <div className="flex justify-center mb-6">
              <div className={`p-5 rounded-full ${
                performanceLevel === 'excellent' ? 'bg-green-500/20' :
                performanceLevel === 'good' ? 'bg-elec-yellow/20' : 'bg-orange-500/20'
              } animate-bounce`}>
                <Trophy className={`h-12 w-12 ${
                  performanceLevel === 'excellent' ? 'text-green-400' :
                  performanceLevel === 'good' ? 'text-elec-yellow' : 'text-orange-400'
                }`} />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {performanceLevel === 'excellent' ? 'Outstanding!' :
               performanceLevel === 'good' ? 'Well Done!' : 'Keep Practicing!'}
            </h2>
            <p className="text-white/70 mb-6">
              {performanceLevel === 'excellent' ? "You've mastered this set!" :
               performanceLevel === 'good' ? 'Great progress on your learning journey' :
               'Practice makes perfect - keep going!'}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-gradient-to-br from-elec-gray to-elec-dark/50 rounded-xl p-4 border border-elec-yellow/10">
                <div className="p-2 rounded-lg bg-elec-yellow/10 inline-block mb-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-2xl font-bold text-elec-yellow">{flashcards.length}</div>
                <div className="text-xs text-white/60">Cards</div>
              </div>
              <div className="bg-gradient-to-br from-elec-gray to-elec-dark/50 rounded-xl p-4 border border-green-500/10">
                <div className="p-2 rounded-lg bg-green-500/10 inline-block mb-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">{successRate}%</div>
                <div className="text-xs text-white/60">Accuracy</div>
              </div>
              <div className="bg-gradient-to-br from-elec-gray to-elec-dark/50 rounded-xl p-4 border border-blue-500/10">
                <div className="p-2 rounded-lg bg-blue-500/10 inline-block mb-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">{sessionDuration || '<1'}m</div>
                <div className="text-xs text-white/60">Time</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12 touch-manipulation"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Study Again
              </Button>
              <Button
                variant="outline"
                onClick={onExit}
                className="border-white/20 text-white hover:bg-white/10 h-12 touch-manipulation"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sets
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Tips */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Sparkles className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Next Steps</h3>
            </div>
            <div className="space-y-3">
              {[
                { text: 'Review incorrect answers to reinforce learning', done: successRate === 100 },
                { text: 'Come back tomorrow for spaced repetition', done: false },
                { text: 'Try a harder difficulty set next', done: successRate >= 80 }
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle className={`h-4 w-4 flex-shrink-0 ${tip.done ? 'text-green-400' : 'text-white/70'}`} />
                  <span className={tip.done ? 'text-white/60 line-through' : 'text-white/80'}>{tip.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Study session interface
  const difficultyColors = currentCard?.difficulty ? getDifficultyColor(currentCard.difficulty) : getDifficultyColor('medium');

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onExit}
          className="border-white/20 text-white hover:bg-white/10 h-10 touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-sm bg-white/5 px-3 py-1.5 rounded-full">
            <Target className="h-4 w-4 text-elec-yellow" />
            <span className="text-white font-medium">{currentIndex + 1}/{flashcards.length}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm bg-green-500/10 px-3 py-1.5 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-green-400 font-medium">{masteredCards.size}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/80 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/80">
          <span>Progress</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Flashcard */}
      <Card className={`bg-gradient-to-br from-elec-gray to-elec-card border-${showAnswer ? 'elec-yellow' : 'white'}/20 min-h-[350px] sm:min-h-[400px] transition-all duration-300 ${isFlipping ? 'scale-95 opacity-80' : 'scale-100'}`}>
        <CardContent className="p-5 sm:p-8 h-full flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                <Zap className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-sm font-medium text-white/70">{currentCard?.category}</span>
            </div>
            {currentCard?.difficulty && (
              <span className={`text-xs px-3 py-1 rounded-full ${difficultyColors.bg} ${difficultyColors.text} border ${difficultyColors.border}`}>
                {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
              </span>
            )}
          </div>

          {/* Question/Answer Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center space-y-6">
              {/* Question */}
              <div className={`transition-all duration-300 ${showAnswer ? 'opacity-60 scale-95' : ''}`}>
                <p className="text-xs uppercase tracking-wider text-white/70 mb-2">Question</p>
                <p className="text-lg sm:text-xl text-white font-medium leading-relaxed">
                  {currentCard?.question}
                </p>
              </div>

              {/* Answer */}
              {showAnswer && (
                <div className="animate-fade-in">
                  <div className="p-5 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-xl">
                    <p className="text-xs uppercase tracking-wider text-elec-yellow/70 mb-2">Answer</p>
                    <p className="text-lg text-white font-medium">{currentCard?.answer}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            {!showAnswer ? (
              <Button
                onClick={handleShowAnswer}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-14 text-lg font-semibold touch-manipulation active:scale-95 transition-transform"
              >
                <ChevronRight className="mr-2 h-5 w-5" />
                Reveal Answer
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleMarkIncorrect}
                  variant="outline"
                  className="border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 h-14 touch-manipulation active:scale-95 transition-transform"
                >
                  <XCircle className="mr-2 h-5 w-5" />
                  Need Practice
                </Button>
                <Button
                  onClick={handleMarkCorrect}
                  className="bg-green-600 hover:bg-green-700 text-white h-14 touch-manipulation active:scale-95 transition-transform"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Got It!
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tip */}
      <div className="text-center text-xs text-white/70">
        <span>Tip: Tap anywhere on the card to flip it</span>
      </div>
    </div>
  );
};

export default FlashcardStudySession;
