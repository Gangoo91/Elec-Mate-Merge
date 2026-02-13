import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions as allQuizQuestions } from './workplaceCultureData';
import type { CultureProgress } from './useCultureProgress';

interface CultureQuizProps {
  progress: CultureProgress;
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

const CultureQuiz = ({ progress, onClose }: CultureQuizProps) => {
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

  // ── Complete screen ─────────────────────────────────────
  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    let grade = 'Keep Practising';
    let gradeColour = 'text-amber-400';
    let gradeBg = 'bg-amber-500/10 border-amber-500/30';
    if (percentage >= 80) {
      grade = 'Excellent';
      gradeColour = 'text-green-400';
      gradeBg = 'bg-green-500/10 border-green-500/30';
    } else if (percentage >= 60) {
      grade = 'Good Work';
      gradeColour = 'text-blue-400';
      gradeBg = 'bg-blue-500/10 border-blue-500/30';
    }

    return (
      <div className="bg-gradient-to-br from-background via-background/98 to-background/95 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-white">Quiz Complete</h1>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 touch-manipulation active:scale-95"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <Card className={`border ${gradeBg}`}>
            <CardContent className="p-6 text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-white/5">
                <Trophy className={`h-10 w-10 ${gradeColour}`} />
              </div>
              <div>
                <p className={`text-3xl font-bold ${gradeColour}`}>
                  {score}/{questions.length}
                </p>
                <p className="text-sm text-white mt-1">{percentage}% correct</p>
              </div>
              <p className={`text-lg font-semibold ${gradeColour}`}>{grade}</p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-white">Breakdown</h2>
            <div className="flex flex-wrap gap-2">
              {results.map((correct, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                    correct
                      ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                      : 'bg-red-500/15 text-red-400 border border-red-500/30'
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
              className="flex-1 h-11 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-lg bg-elec-yellow text-black font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz in progress ────────────────────────────────────
  return (
    <div className="bg-gradient-to-br from-background via-background/98 to-background/95 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 touch-manipulation active:scale-95"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">Culture Quiz</h1>
          </div>
          <span className="text-sm text-white font-medium">
            Q{currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i < currentIndex
                  ? results[i]
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : i === currentIndex
                    ? 'bg-elec-yellow'
                    : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <Card className="border border-white/10">
          <CardContent className="p-5">
            <p className="text-base font-medium text-white leading-relaxed text-left">
              {currentQ.question}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {currentQ.options.map((option, idx) => {
            let optionStyle = 'bg-white/5 border-white/10 text-white';
            if (showExplanation && idx === currentQ.correctIndex) {
              optionStyle = 'bg-green-500/15 border-green-500/30 text-green-300';
            } else if (showExplanation && selectedAnswer === idx && idx !== currentQ.correctIndex) {
              optionStyle = 'bg-red-500/15 border-red-500/30 text-red-300';
            } else if (!showExplanation && selectedAnswer === idx) {
              optionStyle = 'bg-elec-yellow/15 border-elec-yellow/30 text-elec-yellow';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all touch-manipulation active:scale-[0.99] flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="pt-0.5">{option}</span>
                {showExplanation && idx === currentQ.correctIndex && (
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5 ml-auto" />
                )}
                {showExplanation && selectedAnswer === idx && idx !== currentQ.correctIndex && (
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5 ml-auto" />
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <Card className="border border-blue-500/30 bg-blue-500/10 animate-fade-in">
            <CardContent className="p-4">
              <p className="text-sm text-white leading-relaxed text-left">{currentQ.explanation}</p>
            </CardContent>
          </Card>
        )}

        {!showExplanation && selectedAnswer !== null && (
          <button
            onClick={handleSubmit}
            className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.98] transition-all"
          >
            Check Answer
          </button>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all"
          >
            {currentIndex >= questions.length - 1 ? 'See Results' : 'Next Question'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CultureQuiz;
