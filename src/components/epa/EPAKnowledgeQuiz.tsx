/**
 * EPAKnowledgeQuiz
 *
 * Generates AI-powered EPA mock knowledge test, then renders an inline
 * quiz UI (since QuizInterface may not exist as a standalone wrapper).
 * Fully self-contained with generate → take quiz → results flow.
 */

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Zap,
} from 'lucide-react';
import { useEPAKnowledgeQuiz } from '@/hooks/epa/useEPAKnowledgeQuiz';
import { useQuizSession } from '@/hooks/useQuizSession';
import { supabase } from '@/integrations/supabase/client';

interface EPAKnowledgeQuizProps {
  qualificationCode: string;
  targetUnitCodes?: string[];
}

export function EPAKnowledgeQuiz({
  qualificationCode,
  targetUnitCodes,
}: EPAKnowledgeQuizProps) {
  const { generateQuiz, isGenerating, error: genError } = useEPAKnowledgeQuiz();
  const quiz = useQuizSession();
  const [difficulty, setDifficulty] = useState<'mixed' | 'easy' | 'medium' | 'hard'>('mixed');
  const [questionCount, setQuestionCount] = useState(20);

  const handleGenerate = async () => {
    const questions = await generateQuiz({
      qualificationCode,
      targetUnitCodes,
      difficulty,
      questionCount,
    });
    if (questions?.length) {
      quiz.startQuiz('epa-knowledge-mock', questions, 'test');
    }
  };

  const handleSelectAnswer = (index: number) => {
    quiz.selectAnswer(index);
    const currentQ = quiz.getCurrentQuestion();
    if (currentQ) {
      const timeSpent = quiz.questionStartTime
        ? Math.round((Date.now() - quiz.questionStartTime.getTime()) / 1000)
        : 0;
      quiz.submitAnswer(currentQ.id, index, timeSpent);
    }
  };

  const handleFinish = useCallback(async () => {
    const result = quiz.finishQuiz();
    if (result) {
      // Save to quiz_results
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('quiz_results').insert({
            user_id: user.id,
            assessment_id: 'epa-knowledge-mock',
            score: result.percentage,
            total_questions: result.totalQuestions,
            correct_answers: result.correctAnswers,
            time_spent: result.timeSpent,
            category_breakdown: result.categoryBreakdown,
          });
        }
      } catch {
        /* non-critical */
      }
    }
  }, [quiz]);

  const handleReset = () => {
    quiz.resetQuiz();
  };

  // --- SETUP STATE ---
  if (!quiz.currentSession) {
    return (
      <div className="py-8 px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Mock Knowledge Test
            </h2>
            <p className="text-sm text-white/90 mt-0.5">
              AI generates EPA-style multiple choice questions tailored to
              your qualification and weak areas.
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-4">
          <div>
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Difficulty
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {(['mixed', 'easy', 'medium', 'hard'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    'h-9 rounded-lg text-xs font-medium touch-manipulation',
                    difficulty === d
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/[0.06] text-white/70'
                  )}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Questions
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[10, 20, 30].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={cn(
                    'h-9 rounded-lg text-xs font-medium touch-manipulation',
                    questionCount === n
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/[0.06] text-white/70'
                  )}
                >
                  {n} Qs
                </button>
              ))}
            </div>
          </div>
        </div>

        {genError && (
          <p className="text-sm text-red-400">{genError}</p>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-14 rounded-xl bg-blue-500 text-white font-semibold text-base touch-manipulation active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating questions...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Generate Mock Test
            </>
          )}
        </button>
      </div>
    );
  }

  // --- RESULTS STATE ---
  if (quiz.currentSession.isCompleted) {
    const answers = quiz.currentSession.answers;
    const correct = answers.filter((a) => a.isCorrect).length;
    const total = quiz.currentSession.totalQuestions;
    const pct = Math.round((correct / total) * 100);

    const scoreColour = pct >= 80
      ? 'border-emerald-500 text-emerald-400'
      : pct >= 60
        ? 'border-blue-500 text-blue-400'
        : pct >= 40
          ? 'border-amber-500 text-amber-400'
          : 'border-red-500 text-red-400';

    return (
      <div className="space-y-5 px-4 py-5">
        {/* Score Hero — left-aligned */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'h-20 w-20 rounded-full flex flex-col items-center justify-center border-4 shrink-0',
              scoreColour
            )}
          >
            <span className="text-2xl font-bold">{pct}%</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {correct}/{total} Correct
            </p>
            <p className="text-sm text-white/70">
              {pct >= 80
                ? 'Distinction Level'
                : pct >= 60
                  ? 'Merit Level'
                  : pct >= 40
                    ? 'Pass Level'
                    : 'Below Pass'}
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        {quiz.currentSession.questions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
              Category Breakdown
            </h3>
            {Object.entries(
              answers.reduce(
                (acc, answer) => {
                  const q = quiz.currentSession!.questions.find(
                    (question) => question.id === answer.questionId
                  );
                  if (q) {
                    if (!acc[q.category])
                      acc[q.category] = { correct: 0, total: 0 };
                    acc[q.category].total++;
                    if (answer.isCorrect) acc[q.category].correct++;
                  }
                  return acc;
                },
                {} as Record<string, { correct: number; total: number }>
              )
            ).map(([cat, data]) => {
              const catPct = Math.round((data.correct / data.total) * 100);
              return (
                <div
                  key={cat}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{cat}</p>
                    <div className="h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          catPct >= 70
                            ? 'bg-emerald-500'
                            : catPct >= 50
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        )}
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-white/70 shrink-0">
                    {data.correct}/{data.total}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Review Questions */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            Question Review
          </h3>
          {quiz.currentSession.questions.map((q, i) => {
            const answer = answers.find((a) => a.questionId === q.id);
            const isCorrect = answer?.isCorrect;

            return (
              <Card key={q.id} className="border-white/10">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        {i + 1}. {q.question}
                      </p>
                      {!isCorrect && answer && (
                        <p className="text-xs text-red-400 mt-1">
                          Your answer: {q.options[answer.selectedAnswer]}
                        </p>
                      )}
                      <p className="text-xs text-emerald-400 mt-0.5">
                        Correct: {q.options[q.correctAnswer as number]}
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 font-medium text-sm touch-manipulation active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Take Another Test
        </button>
      </div>
    );
  }

  // --- IN PROGRESS STATE ---
  const currentQ = quiz.getCurrentQuestion();
  const progress = quiz.getProgress();
  const currentAnswer = quiz.getCurrentAnswer();

  if (!currentQ) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
          <span>
            Question {progress.current} of {progress.total}
          </span>
          <span>{progress.answered} answered</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          {currentQ.category && (
            <Badge variant="outline" className="text-[10px] text-white/70">
              {currentQ.category}
            </Badge>
          )}
          <Badge variant="outline" className="text-[10px] text-white/70">
            {currentQ.difficulty}
          </Badge>
        </div>

        <p className="text-base text-foreground leading-relaxed">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {currentQ.options.map((option, i) => {
            const isSelected = currentAnswer?.selectedAnswer === i;
            const isCorrect = i === currentQ.correctAnswer;
            const showResult = currentAnswer !== null;

            return (
              <button
                key={i}
                onClick={() => !currentAnswer && handleSelectAnswer(i)}
                disabled={currentAnswer !== null}
                className={cn(
                  'w-full flex items-start gap-3 p-3.5 rounded-xl border text-left touch-manipulation transition-all',
                  showResult && isCorrect
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : showResult && isSelected && !isCorrect
                      ? 'border-red-500/40 bg-red-500/10'
                      : isSelected
                        ? 'border-blue-500/40 bg-blue-500/10'
                        : 'border-white/10 bg-white/[0.02] active:bg-white/[0.06]'
                )}
              >
                <span
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                    showResult && isCorrect
                      ? 'bg-emerald-500 text-white'
                      : showResult && isSelected && !isCorrect
                        ? 'bg-red-500 text-white'
                        : isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white/70'
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-foreground flex-1">
                  {option}
                </span>
                {showResult && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after answering) */}
        {currentAnswer && (
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                Explanation
              </span>
            </div>
            <p className="text-sm text-white/80">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
        <button
          onClick={() => quiz.previousQuestion()}
          disabled={quiz.currentQuestionIndex === 0}
          className="h-11 px-4 rounded-xl border border-white/10 text-white/80 text-sm touch-manipulation active:scale-95 disabled:opacity-30 flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {quiz.currentQuestionIndex < progress.total - 1 ? (
          <button
            onClick={() => quiz.nextQuestion()}
            className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 text-sm font-medium touch-manipulation active:scale-95 flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="h-11 px-6 rounded-xl bg-emerald-500 text-white text-sm font-medium touch-manipulation active:scale-95 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Finish Test
          </button>
        )}
      </div>
    </div>
  );
}

export default EPAKnowledgeQuiz;
