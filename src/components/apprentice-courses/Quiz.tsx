import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Target,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCourseProgress } from '@/hooks/useCourseProgress';

interface QuizQuestion {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

// Extract course and section from current URL for auto-recording
const CATEGORY_PREFIXES = ['general-upskilling', 'personal-development', 'upskilling'];

function deriveKeysFromUrl(): { courseKey: string; sectionKey: string } {
  const path = window.location.pathname;
  const studyPart = path.replace(/.*\/study-centre\//, '').replace(/.*\/apprentice\//, '');
  const parts = studyPart.split('/');
  const category = parts[0] || '';

  if (CATEGORY_PREFIXES.includes(category) && parts.length > 1) {
    const firstSeg = parts[1];
    const moduleMatch = firstSeg.match(/^(.+?)-(module-\d+.*)$/);
    if (moduleMatch) {
      const rest = parts.slice(2).filter((p) => p !== 'quiz').join('/');
      const section = moduleMatch[2] + (rest ? '/' + rest : '');
      return { courseKey: moduleMatch[1], sectionKey: section + '-quiz' };
    }
    const restParts = parts.slice(2).filter((p) => p !== 'quiz');
    return {
      courseKey: parts[1],
      sectionKey: restParts.length ? restParts.join('/') + '-quiz' : 'quiz',
    };
  }

  return { courseKey: category, sectionKey: parts.slice(1).join('/') || 'quiz' };
}

export const Quiz: React.FC<QuizProps> = ({ questions, title = 'Knowledge check' }) => {
  const { recordProgress } = useCourseProgress();
  const hasRecorded = useRef(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const getCorrectAnswerIndex = (q: QuizQuestion): number => {
    if (typeof q.correctAnswer === 'number') return q.correctAnswer;
    const i = q.options.findIndex((opt) => opt === q.correctAnswer);
    return i >= 0 ? i : 0;
  };

  const handleAnswerSelect = (i: number) => {
    if (showResult) return;
    const next = [...selectedAnswers];
    next[currentQuestion] = i;
    setSelectedAnswers(next);
    // Light haptic — nudge the user that the tap landed
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ignore */
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResult(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
    try {
      navigator.vibrate?.(currentQ && selectedAnswers[currentQuestion] === correctIndex ? 12 : 30);
    } catch {
      /* ignore */
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    hasRecorded.current = false;
  };

  const getScore = () => {
    let correct = 0;
    selectedAnswers.forEach((a, i) => {
      if (a === getCorrectAnswerIndex(questions[i])) correct++;
    });
    return correct;
  };

  const getScorePercentage = () => Math.round((getScore() / questions.length) * 100);

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const correctIndex = currentQ ? getCorrectAnswerIndex(currentQ) : -1;
  const isCorrect = selectedAnswers[currentQuestion] === correctIndex;
  const answeredCount = selectedAnswers.filter((a) => a !== undefined).length;

  // Auto-record quiz completion to course_progress
  useEffect(() => {
    if (quizCompleted && !hasRecorded.current) {
      hasRecorded.current = true;
      const { courseKey, sectionKey } = deriveKeysFromUrl();
      if (courseKey) {
        recordProgress(courseKey, sectionKey + '-quiz', 100, true);
      }
    }
  }, [quizCompleted, recordProgress]);

  /* ── Completion screen ─────────────────────────────────────── */

  if (quizCompleted) {
    const score = getScore();
    const percentage = getScorePercentage();
    const passed = percentage >= 70;
    const aced = percentage === 100;

    return (
      <div className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-6 sm:p-8">
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-80',
            passed
              ? 'from-emerald-500/70 via-emerald-400/70 to-green-400/70'
              : 'from-orange-500/70 via-amber-400/70 to-orange-400/70'
          )}
        />

        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            {aced ? (
              <Trophy className="h-4 w-4 text-elec-yellow" />
            ) : passed ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <Target className="h-4 w-4 text-orange-400" />
            )}
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white">
              {aced ? 'Aced it' : passed ? 'Quiz complete' : 'Worth another go'}
            </span>
          </div>

          <div
            className={cn(
              'text-6xl sm:text-7xl font-semibold tabular-nums tracking-tight leading-none',
              passed ? 'text-emerald-400' : 'text-orange-400'
            )}
          >
            {percentage}%
          </div>
          <p className="mt-3 text-[14px] text-white">
            {score} out of {questions.length} correct
          </p>

          {aced && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elec-yellow/15 border border-elec-yellow/30">
              <Sparkles className="h-3 w-3 text-elec-yellow" />
              <span className="text-[11px] font-semibold text-elec-yellow uppercase tracking-wider">
                Streak +1
              </span>
            </div>
          )}

          {!passed && (
            <div className="mt-5 rounded-xl bg-orange-500/[0.06] border border-orange-500/25 p-4 text-left">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-orange-300 mb-1">
                Tip
              </div>
              <p className="text-[13px] text-white leading-relaxed">
                70% is the pass mark. Skim the section once more — focus on the bits the explanations
                covered — then take it again. No limit.
              </p>
            </div>
          )}

          <button
            onClick={restartQuiz}
            className="mt-6 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" />
            {passed ? 'Take it again' : 'Try again'}
          </button>
        </div>
      </div>
    );
  }

  /* ── Active quiz ──────────────────────────────────────────── */

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-80" />

      {/* Header — title + progress */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Target className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow truncate">
              {title}
            </span>
          </div>
          <span className="text-[11.5px] font-medium text-white shrink-0 tabular-nums">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar — segmented */}
        <div className="flex gap-1">
          {questions.map((_, i) => {
            const answered = selectedAnswers[i] !== undefined;
            const isCurrent = i === currentQuestion;
            return (
              <div
                key={i}
                className={cn(
                  'flex-1 h-1 rounded-full transition-colors',
                  isCurrent
                    ? 'bg-elec-yellow'
                    : answered
                      ? 'bg-elec-yellow/40'
                      : 'bg-white/10'
                )}
              />
            );
          })}
        </div>
      </div>

      <div className="px-5 sm:px-6 py-5 sm:py-6">
        {/* Question */}
        <h3 className="text-[16px] sm:text-[18px] font-semibold text-white tracking-tight leading-snug">
          {currentQ?.question}
        </h3>

        {/* Options */}
        <div className="mt-5 space-y-2.5">
          {currentQ?.options.map((option, index) => {
            const selected = selectedAnswers[currentQuestion] === index;
            const isCorrectOpt = showResult && index === correctIndex;
            const isWrongOpt = showResult && selected && index !== correctIndex;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={cn(
                  'group relative w-full text-left rounded-xl px-4 py-3.5 border transition-colors touch-manipulation active:scale-[0.99]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                  isCorrectOpt
                    ? 'bg-emerald-500/[0.08] border-emerald-500/40'
                    : isWrongOpt
                      ? 'bg-red-500/[0.08] border-red-500/40'
                      : selected
                        ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                        : 'bg-[hsl(0_0%_9%)] border-white/[0.08] hover:bg-[hsl(0_0%_11%)] hover:border-white/[0.14]'
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Letter badge */}
                  <div
                    className={cn(
                      'shrink-0 h-7 w-7 rounded-full border flex items-center justify-center text-[11px] font-bold transition-colors',
                      isCorrectOpt
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : isWrongOpt
                          ? 'bg-red-500/20 border-red-500/50 text-red-300'
                          : selected
                            ? 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
                            : 'bg-white/[0.04] border-white/[0.12] text-white/80'
                    )}
                  >
                    {isCorrectOpt ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : isWrongOpt ? (
                      <XCircle className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span
                    className={cn(
                      'flex-1 text-[14px] leading-snug',
                      isCorrectOpt
                        ? 'text-emerald-200'
                        : isWrongOpt
                          ? 'text-red-200'
                          : 'text-white'
                    )}
                  >
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && currentQ?.explanation && (
          <div
            className={cn(
              'mt-5 rounded-xl border p-4',
              isCorrect
                ? 'bg-emerald-500/[0.06] border-emerald-500/30'
                : 'bg-orange-500/[0.06] border-orange-500/30'
            )}
          >
            <div
              className={cn(
                'flex items-center gap-2 mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em]',
                isCorrect ? 'text-emerald-300' : 'text-orange-300'
              )}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Spot on</span>
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Not quite</span>
                </>
              )}
            </div>
            <p className="text-[13.5px] text-white leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="inline-flex items-center gap-1.5 h-10 px-3 rounded-full text-[12.5px] font-medium text-white touch-manipulation disabled:opacity-40 hover:bg-white/[0.05] transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </button>

          {!showResult && isAnswered && (
            <button
              onClick={handleSubmitAnswer}
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
            >
              Check
            </button>
          )}

          {showResult && (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}

          {!isAnswered && !showResult && (
            <span className="text-[11.5px] text-white">
              {answeredCount} of {questions.length} answered
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
