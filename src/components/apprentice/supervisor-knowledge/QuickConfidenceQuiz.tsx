import { useState, useMemo } from 'react';
import { X, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { quizQuestions as allQuizQuestions } from './supervisorKnowledgeData';
import type { SupervisorProgress } from './useSupervisorProgress';

interface QuickConfidenceQuizProps {
  progress: SupervisorProgress;
  onClose: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QuickConfidenceQuiz = ({ progress, onClose }: QuickConfidenceQuizProps) => {
  const questions = useMemo(() => shuffle(allQuizQuestions).slice(0, 10), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questions[currentIndex];
  const score = results.filter(Boolean).length;

  const handleSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentQ.correctIndex;
    setResults((prev) => [...prev, correct]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      const finalScore = results.filter(Boolean).length;
      progress.saveQuizResult(finalScore, questions.length);
      setIsComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setResults([]);
    setIsComplete(false);
  };

  // Complete screen
  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    let grade = 'Keep practising';
    if (percentage >= 80) grade = 'Excellent';
    else if (percentage >= 60) grade = 'Good work';

    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 animate-fade-in text-left">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] sm:text-[22px] font-semibold text-white">Quiz complete</h1>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] touch-manipulation active:scale-95"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Result
              </span>
              <span className="text-[12px] text-white/85 font-mono">
                {score}/{questions.length} · {percentage}%
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[16px] sm:text-[18px] font-medium text-white">{grade}</p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Breakdown
            </span>
            <div className="flex flex-wrap gap-2">
              {results.map((correct, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-semibold border ${
                    correct
                      ? 'bg-elec-yellow/[0.04] text-elec-yellow border-elec-yellow/30'
                      : 'bg-white/[0.02] text-white/55 border-white/10'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 h-11 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white font-semibold text-[14px] flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-fade-in text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] touch-manipulation active:scale-95"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-[20px] sm:text-[22px] font-semibold text-white">Quick quiz</h1>
          </div>
          <span className="text-[12px] text-white/55 font-mono">
            Q{currentIndex + 1}/{questions.length}
          </span>
        </div>

        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i < currentIndex
                  ? 'bg-elec-yellow'
                  : i === currentIndex
                    ? 'bg-elec-yellow'
                    : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
          <p className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
            {currentQ.question}
          </p>
        </div>

        <div className="space-y-2">
          {currentQ.options.map((option, idx) => {
            let optionStyle = 'bg-white/[0.02] border-white/[0.06] text-white/85';
            if (showExplanation && idx === currentQ.correctIndex) {
              optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/30 text-white';
            } else if (showExplanation && selectedAnswer === idx && idx !== currentQ.correctIndex) {
              optionStyle = 'bg-red-500/[0.04] border-red-500/30 text-white';
            } else if (!showExplanation && selectedAnswer === idx) {
              optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/40 text-white';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border text-[14px] transition-all touch-manipulation active:scale-[0.99] flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[12px] font-semibold flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="pt-0.5 flex-1 leading-relaxed">{option}</span>
                {showExplanation && idx === currentQ.correctIndex && (
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                )}
                {showExplanation && selectedAnswer === idx && idx !== currentQ.correctIndex && (
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2 animate-fade-in">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Explanation
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {!showExplanation && selectedAnswer !== null && (
          <button
            onClick={handleSubmit}
            className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] touch-manipulation active:scale-[0.98] transition-all"
          >
            Check answer
          </button>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all"
          >
            {currentIndex >= questions.length - 1 ? 'See results' : 'Next question'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickConfidenceQuiz;
