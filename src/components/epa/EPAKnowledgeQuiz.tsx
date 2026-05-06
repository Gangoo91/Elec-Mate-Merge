/**
 * EPAKnowledgeQuiz
 *
 * Editorial-style EPA mock knowledge test. AI generates EPA-style MCQ
 * questions tailored to the apprentice's qualification, weak areas, and
 * (optionally) a single AC they want to drill. Surfaces AC references
 * inline so the apprentice can see what each question maps to.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useEPAKnowledgeQuiz } from '@/hooks/epa/useEPAKnowledgeQuiz';
import { useQuizSession } from '@/hooks/useQuizSession';
import { supabase } from '@/integrations/supabase/client';
import type { QuizQuestion } from '@/types/quiz';

interface EPAKnowledgeQuizProps {
  qualificationCode: string;
  targetUnitCodes?: string[];
  /** Optional single-AC drill — passed in from EPAReadinessDashboard "Drill this AC". */
  targetAC?: { acRef: string; acText: string; unitCode?: string } | null;
  onClearTargetAC?: () => void;
  onSessionComplete?: () => void;
}

const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55',
      className
    )}
  >
    {children}
  </span>
);

export function EPAKnowledgeQuiz({
  qualificationCode,
  targetUnitCodes,
  targetAC,
  onClearTargetAC,
  onSessionComplete,
}: EPAKnowledgeQuizProps) {
  const { generateQuizStream, isGenerating, error: genError } = useEPAKnowledgeQuiz();
  const quiz = useQuizSession();
  const [difficulty, setDifficulty] = useState<'mixed' | 'easy' | 'medium' | 'hard'>('mixed');
  const [questionCount, setQuestionCount] = useState(20);

  // Live stream state — populated as questions arrive
  const [streamReady, setStreamReady] = useState(0);
  const [streamTotal, setStreamTotal] = useState(0);
  const [streamRegs, setStreamRegs] = useState<string[]>([]);
  const [streamErrors, setStreamErrors] = useState<string[]>([]);
  const collectedRef = useRef<(QuizQuestion | null)[]>([]);
  const earlyStartRef = useRef(false);

  // When a target AC arrives via prop, default the test to a 5-question drill
  useEffect(() => {
    if (targetAC) {
      setQuestionCount(5);
    }
  }, [targetAC]);

  const tryEarlyStart = useCallback(() => {
    if (earlyStartRef.current) return;
    const ready = collectedRef.current.filter((q): q is QuizQuestion => !!q);
    // Apprentice can hit "Start now" once we have at least 1 ready
    void ready;
  }, []);

  const handleStartNow = useCallback(() => {
    const ready = collectedRef.current.filter((q): q is QuizQuestion => !!q);
    if (!ready.length || earlyStartRef.current) return;
    earlyStartRef.current = true;
    quiz.startQuiz('epa-knowledge-mock', ready, 'test');
  }, [quiz]);

  const handleGenerate = async () => {
    const targetCodes = targetAC?.unitCode
      ? [targetAC.unitCode, ...(targetUnitCodes || [])]
      : targetUnitCodes;

    // Reset stream state
    setStreamReady(0);
    setStreamTotal(questionCount);
    setStreamRegs([]);
    setStreamErrors([]);
    collectedRef.current = new Array(questionCount).fill(null);
    earlyStartRef.current = false;

    const final = await generateQuizStream(
      {
        qualificationCode,
        targetUnitCodes: targetCodes,
        difficulty,
        questionCount,
        targetAcRef: targetAC?.acRef,
        targetAcText: targetAC?.acText,
      },
      {
        onMeta: (meta) => {
          setStreamTotal(meta.total);
          setStreamRegs(meta.regNumbers || []);
          collectedRef.current = new Array(meta.total).fill(null);
        },
        onQuestion: (q, index, ready) => {
          collectedRef.current[index] = q;
          setStreamReady(ready);
          tryEarlyStart();
        },
        onError: (err) => setStreamErrors((prev) => [...prev, err]),
      }
    );

    // If user already hit "Start now", don't restart with the full set
    if (earlyStartRef.current) return;
    if (final?.length) {
      quiz.startQuiz('epa-knowledge-mock', final, 'test');
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
    if (!result) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const sessionId = `epa-kq-${Date.now()}`;

      const { error: quizError } = await supabase.from('quiz_results').insert({
        user_id: user.id,
        assessment_id: 'epa-knowledge-mock',
        session_id: sessionId,
        score: result.percentage,
        percentage: result.percentage,
        total_questions: result.totalQuestions,
        correct_answers: result.correctAnswers,
        incorrect_answers: result.incorrectAnswers,
        time_spent: result.timeSpent,
        category_breakdown: result.categoryBreakdown,
      });
      if (quizError) toast.error('Failed to save quiz results');

      const { error: sessionError } = await supabase.from('epa_mock_sessions').insert({
        user_id: user.id,
        qualification_code: qualificationCode || 'unknown',
        session_type: 'knowledge_test',
        status: 'completed',
        quiz_questions: (quiz.currentSession?.questions || []) as unknown as Record<
          string,
          unknown
        >,
        quiz_answers: (quiz.currentSession?.answers || []) as unknown as Record<string, unknown>,
        overall_score: result.percentage,
        predicted_grade:
          result.percentage >= 80 ? 'distinction' : result.percentage >= 60 ? 'pass' : 'fail',
        component_scores: result.categoryBreakdown as unknown as Record<string, unknown>,
        ai_feedback: `${result.correctAnswers}/${result.totalQuestions} correct (${result.percentage}%)`,
        improvement_suggestions: [] as unknown as Record<string, unknown>,
        completed_at: new Date().toISOString(),
        time_spent_seconds: result.timeSpent,
      });
      if (sessionError) console.error('Failed to save mock session:', sessionError);

      onSessionComplete?.();
    } catch (err) {
      console.error('Error saving quiz results:', err);
      toast.error('Failed to save quiz results');
    }
  }, [quiz, qualificationCode, onSessionComplete]);

  const handleReset = () => {
    quiz.resetQuiz();
    onClearTargetAC?.();
  };

  /* ─── SETUP STATE ──────────────────────────────────────────── */
  if (!quiz.currentSession) {
    return (
      <div className="px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <Eyebrow>Mock knowledge test</Eyebrow>
          <h2 className="text-[24px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
            {targetAC ? 'Drill a single AC' : 'EPA-style multiple choice'}
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-xl">
            AI generates EPA-style multiple-choice questions grounded in your qualification's
            learning outcomes and assessment criteria. Adapts to your weak areas.
          </p>
        </div>

        {/* Target AC badge — when drilling a specific AC */}
        {targetAC && (
          <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow className="text-elec-yellow">Targeted drill</Eyebrow>
              {onClearTargetAC && (
                <button
                  type="button"
                  onClick={onClearTargetAC}
                  className="text-[11px] text-white/55 hover:text-white/85 transition-colors h-7 px-2"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[12px] font-mono text-elec-yellow">{targetAC.acRef}</span>
              {targetAC.unitCode && (
                <span className="text-[10px] uppercase tracking-[0.14em] text-white/55">
                  Unit {targetAC.unitCode}
                </span>
              )}
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed">{targetAC.acText}</p>
          </div>
        )}

        {/* Settings — editorial chips */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Eyebrow>Difficulty</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {(['mixed', 'easy', 'medium', 'hard'] as const).map((d) => {
                const active = difficulty === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      'h-9 px-3.5 rounded-full text-[12px] font-medium border transition-colors touch-manipulation',
                      active
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.02] text-white/85 border-white/[0.08] hover:bg-white/[0.04]'
                    )}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Eyebrow>Questions</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {[5, 10, 20, 30].map((n) => {
                const active = questionCount === n;
                return (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={cn(
                      'h-9 px-3.5 rounded-full text-[12px] font-medium border transition-colors touch-manipulation',
                      active
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.02] text-white/85 border-white/[0.08] hover:bg-white/[0.04]'
                    )}
                  >
                    {n} Qs
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {genError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 space-y-1.5">
            <Eyebrow className="text-red-300">Error</Eyebrow>
            <p className="text-[13px] text-white/85 leading-relaxed">{genError}</p>
          </div>
        )}

        {/* Live progress — appears while streaming */}
        {isGenerating && streamTotal > 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>Generating · BS 7671 grounded</Eyebrow>
              <span className="text-[12px] font-mono text-white/85 tabular-nums">
                {streamReady} / {streamTotal} ready
              </span>
            </div>
            <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all duration-300"
                style={{ width: `${(streamReady / streamTotal) * 100}%` }}
              />
            </div>
            {streamRegs.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  Reg sources
                </span>
                {streamRegs.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] font-mono text-elec-yellow/85 px-1.5 py-0 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}
            {streamErrors.length > 0 && (
              <p className="text-[11px] text-red-300/85">
                {streamErrors.length} call{streamErrors.length === 1 ? '' : 's'} failed — continuing
                with the rest.
              </p>
            )}
          </div>
        )}

        {/* Primary action — generate, with early-start option once 1+ ready */}
        {isGenerating && streamReady > 0 && !earlyStartRef.current ? (
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <button
              onClick={handleStartNow}
              className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
            >
              Start now with {streamReady} ready →
            </button>
            <button
              disabled
              className="h-12 px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/55 text-[13px] font-medium inline-flex items-center justify-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating rest…
            </button>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Fetching BS 7671 context…
              </>
            ) : targetAC ? (
              <>Drill {targetAC.acRef} →</>
            ) : (
              <>Generate mock test →</>
            )}
          </button>
        )}
      </div>
    );
  }

  /* ─── RESULTS STATE ────────────────────────────────────────── */
  if (quiz.currentSession.isCompleted) {
    const answers = quiz.currentSession.answers;
    const correct = answers.filter((a) => a.isCorrect).length;
    const total = quiz.currentSession.totalQuestions;
    const pct = Math.round((correct / total) * 100);
    const grade =
      pct >= 80 ? 'Distinction' : pct >= 60 ? 'Merit' : pct >= 40 ? 'Pass' : 'Below pass';

    return (
      <div className="px-4 sm:px-6 py-6 space-y-6">
        {/* Score */}
        <section className="space-y-2">
          <Eyebrow>Result · {grade}</Eyebrow>
          <div className="flex items-baseline gap-2">
            <span className="text-[64px] sm:text-[72px] font-mono font-semibold text-white leading-none tabular-nums">
              {pct}
            </span>
            <span className="text-[18px] text-white/40 font-mono">%</span>
          </div>
          <p className="text-[14px] text-white/70 leading-relaxed">
            {correct} of {total} correct.
          </p>
        </section>

        {/* Category breakdown */}
        {quiz.currentSession.questions.length > 0 && (
          <section className="space-y-3">
            <Eyebrow>Breakdown by category</Eyebrow>
            <div className="space-y-2">
              {Object.entries(
                answers.reduce(
                  (acc, answer) => {
                    const q = quiz.currentSession!.questions.find(
                      (question) => question.id === answer.questionId
                    );
                    if (q) {
                      if (!acc[q.category]) acc[q.category] = { correct: 0, total: 0 };
                      acc[q.category].total++;
                      if (answer.isCorrect) acc[q.category].correct++;
                    }
                    return acc;
                  },
                  {} as Record<string, { correct: number; total: number }>
                )
              ).map(([cat, data]) => {
                const catPct = Math.round((data.correct / data.total) * 100);
                const fillClass = catPct >= 70 ? 'bg-elec-yellow' : 'bg-white/55';
                return (
                  <div
                    key={cat}
                    className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5 space-y-2"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-medium text-white truncate">{cat}</span>
                      <span className="text-[12px] font-mono text-white/85">
                        {data.correct}/{data.total}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all duration-700', fillClass)}
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Question review */}
        <section className="space-y-3">
          <Eyebrow>Question review</Eyebrow>
          <ul className="space-y-2">
            {quiz.currentSession.questions.map((q, i) => {
              const answer = answers.find((a) => a.questionId === q.id);
              const isCorrect = answer?.isCorrect;
              return (
                <li
                  key={q.id}
                  className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono text-white/40 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {q.regulation && (
                          <span className="text-[10px] font-mono text-elec-yellow/85 uppercase tracking-[0.14em]">
                            {q.regulation}
                          </span>
                        )}
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                          {q.category}
                        </span>
                        {isCorrect ? (
                          <span className="text-[10px] uppercase tracking-[0.14em] text-elec-yellow inline-flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Correct
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase tracking-[0.14em] text-red-300 inline-flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            Wrong
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-white leading-relaxed">{q.question}</p>
                      {!isCorrect && answer && (
                        <p className="text-[13px] text-red-300/85 leading-relaxed">
                          <span className="text-white/55">Your answer: </span>
                          {q.options[answer.selectedAnswer]}
                        </p>
                      )}
                      <p className="text-[13px] text-white/85 leading-relaxed">
                        <span className="text-white/55">Correct: </span>
                        {q.options[q.correctAnswer as number]}
                      </p>
                      <p className="text-[12px] text-white/70 leading-relaxed pt-1 border-t border-white/[0.04]">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <button
          onClick={handleReset}
          className="w-full h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-[14px] font-semibold hover:bg-white/[0.04] transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Take another test
        </button>
      </div>
    );
  }

  /* ─── IN-PROGRESS STATE ─────────────────────────────────────── */
  const currentQ = quiz.getCurrentQuestion();
  const progress = quiz.getProgress();
  const currentAnswer = quiz.getCurrentAnswer();

  if (!currentQ) return null;

  return (
    <div className="flex flex-col min-h-[60vh]">
      {/* Progress strip */}
      <div className="px-4 sm:px-6 pt-4 pb-3 space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>
            Question {progress.current} / {progress.total}
          </Eyebrow>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em]">
            {progress.answered} answered
          </span>
        </div>
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-elec-yellow transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 sm:px-6 py-4 space-y-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          {currentQ.regulation && (
            <span className="text-[10px] font-mono text-elec-yellow/85 uppercase tracking-[0.14em]">
              {currentQ.regulation}
            </span>
          )}
          {currentQ.category && (
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              {currentQ.category}
            </span>
          )}
          {currentQ.difficulty && (
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              {currentQ.difficulty}
            </span>
          )}
        </div>

        <p className="text-[16px] sm:text-[17px] text-white leading-relaxed">{currentQ.question}</p>

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
                  'w-full flex items-baseline gap-3 p-3.5 rounded-xl border text-left touch-manipulation transition-colors min-h-[44px]',
                  showResult && isCorrect
                    ? 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                    : showResult && isSelected && !isCorrect
                      ? 'border-red-500/30 bg-red-500/[0.04]'
                      : isSelected
                        ? 'border-elec-yellow/40 bg-elec-yellow/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                )}
              >
                <span
                  className={cn(
                    'text-[11px] font-mono shrink-0 mt-0.5',
                    showResult && isCorrect
                      ? 'text-elec-yellow'
                      : showResult && isSelected && !isCorrect
                        ? 'text-red-300'
                        : 'text-white/55'
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[14px] text-white/85 leading-relaxed flex-1">{option}</span>
                {showResult && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 text-red-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {currentAnswer && (
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-1.5">
            <Eyebrow>Explanation</Eyebrow>
            <p className="text-[13px] text-white/85 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
        <button
          onClick={() => quiz.previousQuestion()}
          disabled={quiz.currentQuestionIndex === 0}
          className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white text-[13px] font-medium hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-30"
        >
          ← Previous
        </button>

        {quiz.currentQuestionIndex < progress.total - 1 ? (
          <button
            onClick={() => quiz.nextQuestion()}
            className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.02] text-white text-[13px] font-medium hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="h-11 px-5 rounded-lg bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center gap-1.5"
          >
            <CheckCircle2 className="h-4 w-4" />
            Finish test
          </button>
        )}
      </div>
    </div>
  );
}

export default EPAKnowledgeQuiz;
