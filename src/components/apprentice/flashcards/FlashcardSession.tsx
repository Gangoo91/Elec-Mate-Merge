import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, RotateCcw, CheckCircle, X, SkipForward, Clock, Target,
  TrendingUp, Trophy, Zap, Star, Flame, ArrowRight, Sparkles
} from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface FlashcardSessionProps {
  setTitle: string;
  cards: Flashcard[];
  onExit: () => void;
}

type AnswerResult = 'correct' | 'incorrect' | 'skipped';

const FlashcardSession = ({ setTitle, cards, onExit }: FlashcardSessionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });
  const [sessionStartTime] = useState(Date.now());
  const [studyTime, setStudyTime] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Update study time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + (showAnswer ? 0.5 : 0)) / cards.length) * 100;
  const isLastCard = currentCardIndex === cards.length - 1;

  const handleAnswer = (result: AnswerResult) => {
    setSessionStats(prev => ({
      ...prev,
      [result]: prev[result] + 1
    }));

    if (isLastCard) {
      setIsSessionComplete(true);
    } else {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
        setShowAnswer(false);
        setIsFlipping(false);
      }, 200);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShowAnswer = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowAnswer(true);
      setIsFlipping(false);
    }, 150);
  };

  const handleSkip = () => {
    handleAnswer('skipped');
  };

  const totalAnswered = sessionStats.correct + sessionStats.incorrect + sessionStats.skipped;
  const accuracy = totalAnswered > 0 ? Math.round((sessionStats.correct / totalAnswered) * 100) : 0;

  const getDifficultyConfig = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Easy' };
      case 'medium':
        return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30', label: 'Medium' };
      case 'hard':
        return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'Hard' };
      default:
        return { bg: 'bg-white/5', text: 'text-white/70', border: 'border-white/20', label: 'Standard' };
    }
  };

  const getPerformanceGrade = () => {
    if (accuracy >= 90) return { label: 'Excellent!', color: 'text-green-400', icon: Trophy, message: "Outstanding performance! You've mastered this content." };
    if (accuracy >= 75) return { label: 'Great Job!', color: 'text-blue-400', icon: Star, message: "Strong performance! Keep practicing to perfect your knowledge." };
    if (accuracy >= 60) return { label: 'Good Effort!', color: 'text-elec-yellow', icon: Zap, message: "You're making progress! Focus on the cards you missed." };
    return { label: 'Keep Practicing!', color: 'text-orange-400', icon: Flame, message: "Don't give up! Review this set again to improve your score." };
  };

  // Session Complete Screen
  if (isSessionComplete) {
    const performance = getPerformanceGrade();
    const PerformanceIcon = performance.icon;

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <PerformanceIcon className={`h-10 w-10 ${performance.color}`} />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${performance.color}`}>
            {performance.label}
          </h1>
          <p className="text-white/70 max-w-md mx-auto">{performance.message}</p>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20">
            <CardContent className="p-5 text-center">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 w-fit mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">{sessionStats.correct}</div>
              <div className="text-sm text-white/60">Correct</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-red-500/20">
            <CardContent className="p-5 text-center">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 w-fit mx-auto mb-3">
                <X className="h-6 w-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-red-400 mb-1">{sessionStats.incorrect}</div>
              <div className="text-sm text-white/60">Incorrect</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20">
            <CardContent className="p-5 text-center">
              <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 w-fit mx-auto mb-3">
                <SkipForward className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="text-3xl font-bold text-elec-yellow mb-1">{sessionStats.skipped}</div>
              <div className="text-sm text-white/60">Skipped</div>
            </CardContent>
          </Card>
        </div>

        {/* Session Summary */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <TrendingUp className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Session Summary</h3>
                <p className="text-sm text-white/60">{setTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-elec-yellow mb-1">{accuracy}%</div>
                <div className="text-xs text-white/60">Accuracy</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{formatTime(studyTime)}</div>
                <div className="text-xs text-white/60">Study Time</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">{cards.length}</div>
                <div className="text-xs text-white/60">Total Cards</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
                  {studyTime > 0 ? Math.round(cards.length / (studyTime / 60)) : 0}
                </div>
                <div className="text-xs text-white/60">Cards/Min</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={onExit}
            className="h-12 px-6 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Sets
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="h-12 px-6 border-white/20 hover:bg-white/5 hover:border-elec-yellow/50 font-semibold touch-manipulation active:scale-95 transition-all"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Study Again
          </Button>
        </div>
      </div>
    );
  }

  const difficultyConfig = getDifficultyConfig(currentCard?.difficulty);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header with progress */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onExit}
            className="border-white/20 hover:bg-white/5 hover:border-elec-yellow/50 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit
          </Button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">{setTitle}</h1>
            <p className="text-sm text-white/60">
              Card {currentCardIndex + 1} of {cards.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>{formatTime(studyTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="h-4 w-4 text-green-400" />
            <span className={accuracy >= 70 ? 'text-green-400' : accuracy >= 50 ? 'text-elec-yellow' : 'text-white/70'}>
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/70 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>Progress: {Math.round(progress)}%</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-400" />
              {sessionStats.correct}
            </span>
            <span className="flex items-center gap-1">
              <X className="h-3 w-3 text-red-400" />
              {sessionStats.incorrect}
            </span>
            <span className="flex items-center gap-1">
              <SkipForward className="h-3 w-3 text-elec-yellow" />
              {sessionStats.skipped}
            </span>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <Card className={`
        bg-gradient-to-br from-elec-gray to-elec-card
        border-${showAnswer ? 'elec-yellow' : 'white'}/20
        min-h-[350px] sm:min-h-[400px]
        transition-all duration-300
        ${isFlipping ? 'scale-95 opacity-80' : 'scale-100'}
      `}>
        <CardContent className="p-6 sm:p-8 flex flex-col min-h-[350px] sm:min-h-[400px]">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <Badge className={`${showAnswer ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
              {showAnswer ? (
                <><Sparkles className="h-3 w-3 mr-1" /> Answer</>
              ) : (
                <><Target className="h-3 w-3 mr-1" /> Question</>
              )}
            </Badge>

            {currentCard?.difficulty && (
              <Badge className={`${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}`}>
                {difficultyConfig.label}
              </Badge>
            )}
          </div>

          {/* Card Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-2xl">
              <div className={`text-xl sm:text-2xl leading-relaxed ${showAnswer ? 'text-elec-yellow' : 'text-white'}`}>
                {showAnswer ? currentCard?.back : currentCard?.front}
              </div>

              {currentCard?.category && (
                <Badge variant="outline" className="bg-white/5 border-white/20 text-white/60 text-xs">
                  {currentCard.category}
                </Badge>
              )}
            </div>
          </div>

          {/* Tap to flip hint */}
          {!showAnswer && (
            <div className="text-center text-xs text-white/70 mt-4">
              Tap the button below to reveal the answer
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-center gap-3 sm:gap-4">
        {!showAnswer ? (
          <>
            <Button
              variant="outline"
              onClick={handleSkip}
              className="h-12 px-4 sm:px-6 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 font-medium touch-manipulation active:scale-95 transition-all"
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Skip
            </Button>
            <Button
              onClick={handleShowAnswer}
              className="h-12 px-6 sm:px-8 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-all"
            >
              Show Answer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => handleAnswer('incorrect')}
              className="h-12 px-4 sm:px-6 border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium touch-manipulation active:scale-95 transition-all"
            >
              <X className="mr-2 h-4 w-4" />
              Incorrect
            </Button>
            <Button
              onClick={() => handleAnswer('correct')}
              className="h-12 px-6 sm:px-8 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 font-semibold touch-manipulation active:scale-95 transition-all"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Correct
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardSession;
