import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Clock,
  ChevronRight,
  X,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { QuizQuestion, Assessment } from '@/types/quiz';
import { useQuizSession } from '@/hooks/useQuizSession';

interface EnhancedQuizInterfaceProps {
  assessment: Assessment;
  questions: QuizQuestion[];
  onComplete: (result: any) => void;
  onExit: () => void;
}

const EnhancedQuizInterface = ({
  assessment,
  questions,
  onComplete,
  onExit,
}: EnhancedQuizInterfaceProps) => {
  const {
    currentSession,
    startQuiz,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    getCurrentQuestion,
    getProgress,
    setTimeElapsed,
  } = useQuizSession();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    startQuiz(assessment.id, questions);
    setQuestionStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalElapsed((prev) => prev + 1);
      setTimeElapsed(totalElapsed);
    }, 1000);
    return () => clearInterval(timer);
  }, [totalElapsed]);

  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestionStartTime(Date.now());
  }, [getProgress().current]);

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  if (!currentQuestion || !currentSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow" />
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    const timeSpent = Date.now() - questionStartTime;
    submitAnswer(currentQuestion.id, answerIndex, timeSpent);

    if (answerIndex === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!hasAnswered) return;

    const hasNext = nextQuestion();
    if (!hasNext) {
      const result = finishQuiz();
      if (result) {
        onComplete(result);
      }
    }
  };

  const handleExit = () => {
    if (showExitConfirm) {
      onExit();
    } else {
      setShowExitConfirm(true);
      setTimeout(() => setShowExitConfirm(false), 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header — clean, minimal */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          {/* Top row */}
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExit}
                className={`h-11 px-3 rounded-xl touch-manipulation active:scale-[0.98] transition-all flex items-center gap-1.5 ${
                  showExitConfirm ? 'bg-red-500 text-white' : 'text-white hover:bg-white/10'
                }`}
              >
                {showExitConfirm ? <><X className="h-4 w-4" /> Exit</> : <X className="h-5 w-5" />}
              </button>
              <h1 className="text-sm font-semibold text-white truncate">{assessment.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs font-mono">{formatTime(totalElapsed)}</span>
              </div>
              <div className="text-sm font-semibold text-white">
                <span className="text-yellow-400">{correctCount}</span>
                <span className="text-white">/{progress.current - (hasAnswered ? 0 : 1)}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 mb-1">
            <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-white">Question {progress.current} of {progress.total}</span>
              <span className="text-[10px] text-white">{progress.total - progress.current} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question — full width, no card container */}
      <div className="px-4 py-5 space-y-5 pb-28">
        {/* Question text */}
        <div className="space-y-2">
          <p className="text-base font-semibold text-white leading-relaxed">
            {currentQuestion.question}
          </p>
          {currentQuestion.regulation && (
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3 w-3 text-yellow-400" />
              <span className="text-[11px] text-yellow-400 font-mono">{currentQuestion.regulation}</span>
            </div>
          )}
        </div>

        {/* Answer options — full width */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showAsCorrect = hasAnswered && isCorrectAnswer;
            const showAsWrong = hasAnswered && isSelected && !isCorrectAnswer;

            let bgClass = 'bg-white/[0.06] border-white/[0.12]';
            let labelClass = 'bg-white/[0.08] text-white';

            if (showAsCorrect) {
              bgClass = 'bg-green-500/15 border-green-500/40';
              labelClass = 'bg-green-500 text-white';
            } else if (showAsWrong) {
              bgClass = 'bg-red-500/15 border-red-500/40';
              labelClass = 'bg-red-500 text-white';
            } else if (isSelected && !hasAnswered) {
              bgClass = 'bg-yellow-400/10 border-yellow-400/40';
              labelClass = 'bg-yellow-400 text-black';
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleAnswerSelect(index)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 touch-manipulation active:scale-[0.98] ${bgClass} ${hasAnswered ? 'cursor-default' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${labelClass}`}>
                    {showAsCorrect ? <CheckCircle2 className="h-5 w-5" /> : showAsWrong ? <XCircle className="h-5 w-5" /> : optionLabels[index]}
                  </div>
                  <p className="text-sm text-white leading-snug flex-1">{option}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation — shown immediately after answering */}
        {hasAnswered && (
          <div className={`rounded-2xl p-4 space-y-2 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
              {isCorrect ? 'Correct!' : 'Not quite — here\'s why:'}
            </p>
            <p className="text-sm text-white leading-relaxed">{currentQuestion.explanation}</p>
            {currentQuestion.regulation && (
              <p className="text-xs text-white">Reference: {currentQuestion.regulation}</p>
            )}
          </div>
        )}
      </div>

      {/* Fixed bottom — Next button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-white/[0.06] pb-safe">
        <div className="px-4 py-3">
          <Button
            onClick={handleNext}
            disabled={!hasAnswered}
            className="w-full h-12 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold disabled:opacity-30 disabled:bg-white/10 disabled:text-white rounded-xl touch-manipulation active:scale-[0.98] transition-all text-sm"
          >
            {!hasAnswered ? (
              'Select an answer'
            ) : progress.current === progress.total ? (
              <><CheckCircle2 className="h-4 w-4 mr-2" /> See Results</>
            ) : (
              <>Next Question <ChevronRight className="h-4 w-4 ml-1" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedQuizInterface;
