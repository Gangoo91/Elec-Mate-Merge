/**
 * StandardMockExam - Reusable Mock Exam Component
 *
 * A comprehensive mock exam component that follows the AM2 design pattern.
 * Features:
 * - Countdown timer with 5-minute warning
 * - Question flagging system
 * - Clickable question grid navigation
 * - Category breakdown on results
 * - Weak area alerts (<60%)
 * - Mobile and desktop layouts
 * - Review with filtering
 * - Result persistence via useQuizCompletion
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Flag,
  RotateCcw,
  FileText,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExamDesktopSidebar } from '@/components/apprentice-courses/ExamDesktopSidebar';
import { ExamMobileLayout } from '@/components/apprentice-courses/ExamMobileLayout';
import { toast } from 'sonner';
import { useQuizCompletion } from '@/hooks/useQuizCompletion';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import { useAuth } from '@/contexts/AuthContext';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';
import { cn } from '@/lib/utils';
import {
  StandardMockQuestion,
  MockExamConfig,
  CategoryBreakdown,
  ReviewFilter,
  QuestionStatus,
} from '@/types/standardMockExam';

interface StandardMockExamProps {
  config: MockExamConfig;
  questionBank: StandardMockQuestion[];
  getRandomQuestions: (count: number) => StandardMockQuestion[];
}

export const StandardMockExam = ({
  config,
  questionBank,
  getRandomQuestions,
}: StandardMockExamProps) => {
  const navigate = useNavigate();
  const { completeQuiz } = useQuizCompletion();
  const { user } = useAuth();
  const missesRecordedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);
  const history = useMockExamHistory(config.examId, user?.id ?? null);

  // Exam state
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [examQuestions, setExamQuestions] = useState<StandardMockQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const [hasShownWarning, setHasShownWarning] = useState(false);

  // Fetched only once the paper is done — mid-exam it would be a spoiler,
  // and nobody needs it before they have an answer to compare against.
  const failureRates = useQuestionFailureRates(
    config.examId,
    examQuestions.map((q) => q.id),
    showResults
  );

  // Start exam
  const startExam = useCallback(() => {
    const picked = getRandomQuestions(config.totalQuestions);
    // Shuffle option order per question so the correct answer isn't pinned
    // to a single letter (banks were AI-generated B-heavy). Fresh salt per
    // attempt → different order on retake.
    const questions = shuffleAllQuestionOptions(picked, createShuffleSalt());
    setExamQuestions(questions);
    setSelectedAnswers(new Array(config.totalQuestions).fill(-1));
    setCurrentQuestion(0);
    setTimeRemaining(config.timeLimit);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    setShowResults(false);
    setShowReview(false);
    setHasShownWarning(false);
    missesRecordedRef.current = false;
    startedAtRef.current = Date.now();
    toast.success(`${config.examTitle} started! Good luck!`);
  }, [config, getRandomQuestions]);

  // Timer effect
  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          // 5-minute warning
          if (prev === 301 && !hasShownWarning) {
            toast.warning('5 minutes remaining!', { duration: 5000 });
            setHasShownWarning(true);
          }
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, showResults, timeRemaining, hasShownWarning]);

  // Record the attempt once per sitting — the personal revision pile plus the
  // shared attempt/per-question dataset the public papers write to. Driven by
  // an effect rather than handleSubmit because on timer expiry handleSubmit
  // fires from a stale interval closure where selectedAnswers is still empty.
  useEffect(() => {
    if (!showResults || missesRecordedRef.current) return;
    missesRecordedRef.current = true;
    recordMockExamAttempt({
      examSlug: config.examId,
      source: 'in_app',
      examName: config.examTitle,
      questions: examQuestions,
      answers: selectedAnswers,
      startedAt: startedAtRef.current,
      passThreshold: config.passThreshold,
      userId: user?.id ?? null,
    });
  }, [
    showResults,
    examQuestions,
    selectedAnswers,
    user,
    config.examId,
    config.examTitle,
    config.passThreshold,
  ]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  // Navigation
  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setShowResults(true);

    // Calculate results for persistence
    const score = calculateScore();
    const percentage = Math.round((score / examQuestions.length) * 100);
    const timeSpent = config.timeLimit - timeRemaining;

    // Save result using quiz completion hook
    try {
      await completeQuiz({
        result: {
          score,
          totalQuestions: examQuestions.length,
          percentage,
          timeSpent,
          correctAnswers: score,
          incorrectAnswers: examQuestions.length - score,
          categoryBreakdown: getCategoryBreakdownRecord(),
        },
        assessmentId: config.examId,
        sessionId: `${config.examId}-${Date.now()}`,
      });
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }

    toast.success('Exam submitted successfully!');
  };

  // Flag functionality
  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  // Calculate score
  const calculateScore = (): number => {
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer === examQuestions[index]?.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  // Get category breakdown as record for persistence
  const getCategoryBreakdownRecord = (): Record<string, { correct: number; total: number }> => {
    const breakdown: Record<string, { total: number; correct: number }> = {};

    examQuestions.forEach((q, index) => {
      const category = q.category || 'General';
      if (!breakdown[category]) {
        breakdown[category] = { total: 0, correct: 0 };
      }
      breakdown[category].total++;
      if (selectedAnswers[index] === q.correctAnswer) {
        breakdown[category].correct++;
      }
    });

    return breakdown;
  };

  // Calculate category breakdown for display
  const getCategoryBreakdown = (): CategoryBreakdown[] => {
    const breakdown: Record<string, { total: number; correct: number }> = {};

    examQuestions.forEach((q, index) => {
      const category = q.category || 'General';
      if (!breakdown[category]) {
        breakdown[category] = { total: 0, correct: 0 };
      }
      breakdown[category].total++;
      if (selectedAnswers[index] === q.correctAnswer) {
        breakdown[category].correct++;
      }
    });

    return Object.entries(breakdown)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([category, stats]) => ({
        category,
        ...stats,
        percent: Math.round((stats.correct / stats.total) * 100),
      }));
  };

  // Get question status for review
  const getQuestionStatus = (index: number): QuestionStatus => {
    if (selectedAnswers[index] === -1) return 'unanswered';
    return selectedAnswers[index] === examQuestions[index].correctAnswer ? 'correct' : 'incorrect';
  };

  // Review functionality
  const getFilteredQuestions = () => {
    return examQuestions
      .map((q, index) => ({ question: q, index }))
      .filter(({ index }) => {
        const status = getQuestionStatus(index);
        const isFlagged = flaggedQuestions.has(index);

        switch (reviewFilter) {
          case 'correct':
            return status === 'correct';
          case 'incorrect':
            return status === 'incorrect';
          case 'unanswered':
            return status === 'unanswered';
          case 'flagged':
            return isFlagged;
          default:
            return true;
        }
      });
  };

  // Statistics
  const getSummaryStats = () => {
    const answered = selectedAnswers.filter((a) => a !== -1).length;
    const unanswered = examQuestions.length - answered;
    const flagged = flaggedQuestions.size;
    const correct = showResults ? calculateScore() : 0;
    const incorrect = showResults ? answered - correct : 0;

    return { answered, unanswered, flagged, correct, incorrect };
  };

  const stats = getSummaryStats();
  const score = calculateScore();
  const percentage =
    examQuestions.length > 0 ? Math.round((score / examQuestions.length) * 100) : 0;
  const passed = percentage >= config.passThreshold;

  // Reset exam
  const resetExam = () => {
    setExamStarted(false);
    setShowResults(false);
    setShowReview(false);
    setExamQuestions([]);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setTimeRemaining(config.timeLimit);
    setFlaggedQuestions(new Set());
    setReviewFilter('all');
    setHasShownWarning(false);
  };

  // Before exam starts - Start Screen
  if (!examStarted) {
    const passMarkQuestions = Math.ceil((config.totalQuestions * config.passThreshold) / 100);
    return (
      <div className="min-h-screen bg-[hsl(0_0%_8%)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* 44px labelled control, matching the rest of the apprentice area —
              this was a ghost text button at sm size. */}
          <button
            type="button"
            onClick={() => navigate(config.exitPath)}
            className="-ml-1 mb-5 flex h-11 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-2.5 pr-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </button>

          <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_10%)]">
            <div className="relative border-b border-white/[0.08] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0" />
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-elec-yellow/10">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </span>
                <div className="min-w-0">
                  <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[28px]">
                    {config.examTitle}
                  </h1>
                  {/* Was "Comprehensive Assessment Practice" — filler that told
                      a learner nothing. This says what actually happens. */}
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
                    A fresh set of {config.totalQuestions} questions drawn at random from a bank of{' '}
                    {questionBank.length}. Sit it as many times as you like — you'll get a
                    different paper each go.
                  </p>
                </div>
              </div>
            </div>

            {/* Your history — the reason to come back. Hidden until there is
                one, so a first sitting isn't cluttered with empty state. */}
            {history.attempts > 0 && (
              <div className="border-b border-white/[0.08] bg-white/[0.02] px-6 py-5 sm:px-8">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Your record on this paper
                </p>
                <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.08]">
                  <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
                    <p className="text-[20px] font-semibold leading-none tabular-nums text-white">
                      {history.attempts}
                    </p>
                    <p className="mt-1 text-[11px] text-white">
                      {history.attempts === 1 ? 'Attempt' : 'Attempts'}
                    </p>
                  </div>
                  <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
                    <p
                      className={cn(
                        'text-[20px] font-semibold leading-none tabular-nums',
                        (history.best ?? 0) >= config.passThreshold
                          ? 'text-emerald-400'
                          : 'text-white'
                      )}
                    >
                      {history.best}%
                    </p>
                    <p className="mt-1 text-[11px] text-white">Best</p>
                  </div>
                  <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
                    <p
                      className={cn(
                        'text-[20px] font-semibold leading-none tabular-nums',
                        history.lastPassed ? 'text-emerald-400' : 'text-orange-300'
                      )}
                    >
                      {history.last}%
                    </p>
                    <p className="mt-1 text-[11px] text-white">Last go</p>
                  </div>
                </div>
                {history.best !== null && history.best < config.passThreshold && (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-white">
                    {config.passThreshold - history.best}% off the pass mark. Every question you
                    get wrong is saved to your revision pile — clear that first, then come back.
                  </p>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Facts as a grid, not a bullet list — three numbers a learner
                  checks before committing 45 minutes. */}
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.08]">
                {[
                  { value: String(config.totalQuestions), label: 'Questions' },
                  { value: `${Math.floor(config.timeLimit / 60)} min`, label: 'Time limit' },
                  {
                    value: `${config.passThreshold}%`,
                    label: `Pass — ${passMarkQuestions} of ${config.totalQuestions}`,
                  },
                ].map((f) => (
                  <div key={f.label} className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
                    <p className="text-[22px] font-semibold leading-none tabular-nums text-white">
                      {f.value}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-snug text-white">{f.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                  What it covers
                </p>
                {/* Chips, not a comma-run — six topic names in one sentence
                    wrapped to three lines and read as a paragraph. */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {config.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1.5 text-[12px] text-white"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-4 text-[12.5px] leading-relaxed text-white">
                Flag anything you're unsure of and it'll be waiting at the end for review. Wrong
                answers are added to your revision pile automatically, so nothing you miss gets
                lost.
              </p>

              <Button
                onClick={startExam}
                className="mt-6 min-h-[48px] w-full rounded-xl bg-elec-yellow py-3 text-base font-bold text-black hover:bg-elec-yellow/90 touch-manipulation"
                size="lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  {history.attempts > 0 ? 'Sit it again' : 'Start exam'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults && !showReview) {
    const categoryBreakdown = getCategoryBreakdown();
    const weakCategories = categoryBreakdown.filter((c) => c.percent < config.passThreshold);

    // Weakest first — the list is a study order, not a register. A learner
    // scanning this wants "what do I fix", and the topic they got 40% on
    // should not be below the one they aced.
    const rankedBreakdown = [...categoryBreakdown].sort((a, b) => a.percent - b.percent);
    const beatBest = history.best !== null && percentage > history.best;

    return (
      <div className="min-h-screen bg-[hsl(0_0%_8%)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-5">
          {/* Verdict. "FAILED" in red told a learner they were a failure; the
              honest version is that they haven't passed it YET, which is also
              the truthful description of a paper you can resit immediately. */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_10%)]">
            <div className="relative p-6 text-center sm:p-8">
              <div
                className={cn(
                  'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent',
                  passed ? 'via-emerald-400/60' : 'via-orange-400/60'
                )}
              />
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]',
                  passed
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-orange-500/40 bg-orange-500/10 text-orange-300'
                )}
              >
                {passed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {passed ? 'Passed' : 'Not passed yet'}
              </span>

              <p
                className={cn(
                  'mt-5 text-[56px] font-semibold leading-none tabular-nums tracking-tight sm:text-[68px]',
                  passed ? 'text-emerald-400' : 'text-white'
                )}
              >
                {percentage}%
              </p>
              <p className="mt-3 text-[14px] text-white">
                {score} of {examQuestions.length} correct · pass mark {config.passThreshold}%
              </p>

              {/* Progress against your own history is the motivating number,
                  and it only exists now that in-app attempts are recorded. */}
              {history.attempts > 0 && (
                <p className="mt-2 text-[13px] text-white">
                  {beatBest ? (
                    <span className="font-semibold text-elec-yellow">
                      New personal best — your previous best was {history.best}%
                    </span>
                  ) : (
                    <>
                      Your best on this paper is {history.best}% · last go {history.last}%
                    </>
                  )}
                </p>
              )}

              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.08]">
                {[
                  { value: stats.correct, label: 'Correct', tone: 'text-emerald-400' },
                  { value: stats.incorrect, label: 'Wrong', tone: 'text-red-400' },
                  { value: stats.unanswered, label: 'Skipped', tone: 'text-white' },
                ].map((s) => (
                  <div key={s.label} className="bg-[hsl(0_0%_10%)] px-4 py-4">
                    <p className={cn('text-[24px] font-semibold leading-none tabular-nums', s.tone)}>
                      {s.value}
                    </p>
                    <p className="mt-1 text-[11.5px] text-white">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What to study next — promoted above the fold and framed as an
              instruction. The breakdown used to sit under the score as a
              neutral "Performance by Category" register. */}
          {rankedBreakdown.length > 0 && (
            <div className="rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_10%)] p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-elec-yellow" />
                <h2 className="text-[15px] font-semibold text-white">What to study next</h2>
              </div>
              {weakCategories.length > 0 ? (
                <p className="mt-1.5 text-[13px] leading-relaxed text-white">
                  {weakCategories.length === 1
                    ? 'One topic came in under the pass mark. Start there.'
                    : `${weakCategories.length} topics came in under the pass mark. Work down this list.`}
                </p>
              ) : (
                <p className="mt-1.5 text-[13px] leading-relaxed text-white">
                  Every topic cleared the pass mark. Weakest first, in case you want to tighten up.
                </p>
              )}

              <div className="mt-4 space-y-2.5">
                {rankedBreakdown.map(({ category, total, correct, percent }) => {
                  const weak = percent < config.passThreshold;
                  return (
                    <div
                      key={category}
                      className="rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-3.5"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="min-w-0 truncate text-[13.5px] font-medium text-white">
                          {category}
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-[13px] font-semibold tabular-nums',
                            weak ? 'text-orange-300' : 'text-emerald-400'
                          )}
                        >
                          {correct}/{total} · {percent}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            weak ? 'bg-orange-400' : 'bg-emerald-500'
                          )}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions. Reviewing the paper and drilling the misses are the two
              things that actually move a score, so they lead. */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Button
              onClick={() => setShowReview(true)}
              className="min-h-[48px] rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              <FileText className="mr-2 h-4 w-4" />
              Review every answer
            </Button>
            {stats.incorrect > 0 && (
              <Button
                onClick={() =>
                  navigate('/apprentice/revision', {
                    state: { from: config.exitPath, label: 'course' },
                  })
                }
                variant="outline"
                className="min-h-[48px] rounded-xl border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Drill the {stats.incorrect} you missed
              </Button>
            )}
            <Button
              onClick={resetExam}
              variant="outline"
              className="min-h-[48px] rounded-xl border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Sit a fresh paper
            </Button>
            <Button
              onClick={() => navigate(config.exitPath)}
              variant="outline"
              className="min-h-[48px] rounded-xl border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Review screen
  if (showReview) {
    const filteredQuestions = getFilteredQuestions();
    const filters: { id: ReviewFilter; label: string; count: number; tone: string }[] = [
      { id: 'all', label: 'All', count: examQuestions.length, tone: 'text-white' },
      { id: 'incorrect', label: 'Wrong', count: stats.incorrect, tone: 'text-red-400' },
      { id: 'unanswered', label: 'Skipped', count: stats.unanswered, tone: 'text-white' },
      { id: 'flagged', label: 'Flagged', count: stats.flagged, tone: 'text-elec-yellow' },
      { id: 'correct', label: 'Correct', count: stats.correct, tone: 'text-emerald-400' },
    ];

    return (
      <div className="min-h-screen bg-[hsl(0_0%_8%)]">
        {/* Sticky header — a review runs to 30 cards, and the way back to the
            results used to scroll off the top after the first question. */}
        <div className="sticky top-0 z-50 border-b border-white/[0.1] bg-[#1a1a1a]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setShowReview(false)}
              className="-ml-1 flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-2.5 pr-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Results
            </button>
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-white">
              Review answers
            </span>
            <span className="shrink-0 text-[12.5px] tabular-nums text-white">
              {percentage}% · {score}/{examQuestions.length}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
          {/* Filter chips. Five equal-weight cards gave "Correct" the same
              prominence as "Wrong", when only one of those is worth a
              learner's time. Chips, ordered by usefulness. */}
          <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => {
              const active = reviewFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setReviewFilter(active && f.id !== 'all' ? 'all' : f.id)}
                  className={cn(
                    'flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] transition-colors touch-manipulation',
                    active
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.1]'
                  )}
                >
                  {f.label}
                  <span className={cn('tabular-nums', active ? 'text-black/70' : f.tone)}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.1] bg-[hsl(0_0%_10%)] p-8 text-center">
              <p className="text-[15px] font-semibold text-white">Nothing in this filter</p>
              <p className="mt-1.5 text-[13px] text-white">
                {reviewFilter === 'incorrect'
                  ? 'You did not get any wrong — worth a harder paper.'
                  : 'Try another filter.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map(({ question, index }) => {
                const status = getQuestionStatus(index);
                const userAnswer = selectedAnswers[index];
                const isFlagged = flaggedQuestions.has(index);
                const failureRate =
                  typeof question.id === 'number' ? failureRates[String(question.id)] : undefined;

                return (
                  <div
                    key={index}
                    className={cn(
                      'overflow-hidden rounded-2xl border bg-[hsl(0_0%_10%)]',
                      status === 'correct'
                        ? 'border-emerald-500/25'
                        : status === 'incorrect'
                          ? 'border-red-500/30'
                          : 'border-white/[0.1]'
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] px-5 py-3">
                      <span className="text-[12.5px] font-semibold text-white">
                        Question {index + 1}
                      </span>
                      {question.category && (
                        <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white">
                          {question.category}
                        </span>
                      )}
                      <span className="flex-1" />
                      {isFlagged && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-elec-yellow/40 bg-elec-yellow/10 px-2.5 py-0.5 text-[11px] font-semibold text-elec-yellow">
                          <Flag className="h-3 w-3 fill-current" />
                          Flagged
                        </span>
                      )}
                      <span
                        className={cn(
                          'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                          status === 'correct'
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                            : status === 'incorrect'
                              ? 'border-red-500/40 bg-red-500/10 text-red-300'
                              : 'border-white/[0.14] bg-white/[0.05] text-white'
                        )}
                      >
                        {status === 'correct'
                          ? 'Correct'
                          : status === 'incorrect'
                            ? 'Wrong'
                            : 'Skipped'}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[15px] font-medium leading-snug text-white">
                        {question.question}
                      </p>

                      <div className="mt-4 space-y-2">
                        {question.options.map((option, optIndex) => {
                          const isCorrectAnswer = optIndex === question.correctAnswer;
                          const isUserAnswer = optIndex === userAnswer;
                          return (
                            <div
                              key={optIndex}
                              className={cn(
                                'flex items-center gap-3 rounded-xl border px-4 py-3',
                                isCorrectAnswer
                                  ? 'border-emerald-500/50 bg-emerald-500/[0.08]'
                                  : isUserAnswer
                                    ? 'border-red-400/50 bg-red-500/[0.08]'
                                    : 'border-white/[0.08] bg-[hsl(0_0%_9%)]'
                              )}
                            >
                              <span
                                className={cn(
                                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                                  isCorrectAnswer
                                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-200'
                                    : isUserAnswer
                                      ? 'border-red-400/50 bg-red-500/20 text-red-200'
                                      : 'border-white/[0.14] bg-white/[0.05] text-white'
                                )}
                              >
                                {isCorrectAnswer ? (
                                  <CheckCircle className="h-3.5 w-3.5" />
                                ) : isUserAnswer ? (
                                  <XCircle className="h-3.5 w-3.5" />
                                ) : (
                                  String.fromCharCode(65 + optIndex)
                                )}
                              </span>
                              <span className="flex-1 text-[14px] leading-snug text-white">
                                {option}
                              </span>
                              {/* Named, not colour-only — the marking has to
                                  survive a screen reader and colour blindness. */}
                              {isCorrectAnswer && (
                                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                                  Correct
                                </span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-red-300">
                                  You
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Everyone else's hit rate on this question. Being told
                          that most people miss it is the difference between
                          "I'm behind" and "this one is genuinely hard" — and
                          it's true far more often than learners assume. */}
                      {failureRate !== undefined && failureRate >= 40 && (
                        <p className="mt-4 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[12.5px] text-white">
                          <span className="font-semibold text-elec-yellow">{failureRate}%</span> of
                          people get this one wrong
                          {status === 'incorrect' ? " — you're in good company." : '.'}
                        </p>
                      )}

                      {question.explanation && (
                        <div className="mt-4 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-4">
                          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                            Why
                          </p>
                          <p className="text-[13.5px] leading-relaxed text-white">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reaching the end of a review is the moment to act on it. */}
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {stats.incorrect > 0 && (
              <Button
                onClick={() =>
                  navigate('/apprentice/revision', {
                    state: { from: config.exitPath, label: 'course' },
                  })
                }
                className="min-h-[48px] rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Drill the {stats.incorrect} you missed
              </Button>
            )}
            <Button
              onClick={() => setShowReview(false)}
              variant="outline"
              className="min-h-[48px] rounded-xl border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to results
            </Button>
          </div>
        </div>
      </div>
    );
  }
  // Active exam interface
  const answeredCount = selectedAnswers.filter((a) => a !== -1).length;
  const progressPercentage = (answeredCount / examQuestions.length) * 100;

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    if (flaggedArray.length > 0) {
      const currentIndex = flaggedArray.indexOf(currentQuestion);
      const nextIndex = (currentIndex + 1) % flaggedArray.length;
      setCurrentQuestion(flaggedArray[nextIndex]);
    }
  };

  return (
    <div className="bg-[#0d0d0d] overflow-x-hidden">
      {/* Desktop Header - hidden on mobile */}
      {/* The timer used to live here AND in the sidebar. Now the sidebar is
          sticky and beside the question, one clock is enough — two running
          countdowns on one screen is noise, not urgency. */}
      <div className="sticky top-0 z-50 hidden border-b border-white/[0.1] bg-[#1a1a1a]/90 backdrop-blur-sm lg:block">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <Link
            to={config.exitPath}
            className="-ml-1 flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-2.5 pr-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit exam
          </Link>
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-white">
            {config.examTitle}
          </span>
          <span className="shrink-0 text-[12.5px] tabular-nums text-white">
            {answeredCount} of {examQuestions.length} answered
          </span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <ExamMobileLayout
          examTitle={config.examTitle}
          currentQuestion={currentQuestion}
          totalQuestions={examQuestions.length}
          timeRemaining={timeRemaining}
          answeredQuestions={answeredCount}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          onQuestionSelect={setCurrentQuestion}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          onToggleFlag={toggleFlag}
          exitPath={config.exitPath}
          formatTime={formatTime}
        >
          {/* Compact question content for mobile */}
          {examQuestions[currentQuestion] && (
            <>
              {/* Category Badge - centered */}
              <div className="text-center mb-3">
                <Badge
                  variant="outline"
                  className="text-[11px] border-elec-yellow/50 text-elec-yellow bg-elec-yellow/10 px-3"
                >
                  {examQuestions[currentQuestion].category || 'General'}
                </Badge>
              </div>

              {/* Question Text - centered */}
              <p className="text-white text-center text-[15px] leading-snug mb-4 px-2">
                {examQuestions[currentQuestion].question}
              </p>

              {/* Compact Options - 48px each */}
              <div className="space-y-2">
                {examQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full min-h-[48px] p-3 flex items-center gap-3 rounded-xl border-2 transition-all touch-manipulation active:scale-[0.98] ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-elec-yellow/20 border-elec-yellow'
                        : 'bg-white/[0.02] border-white/15 hover:border-white/25'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <span className="text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <span className="text-sm text-white leading-snug text-left">{option}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </ExamMobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Two columns, not one. This grid was `grid-cols-1`, which put the
            timer, progress and question navigator in a card BELOW the
            question — so on the widest screens you had to scroll past the
            answers to see how long was left. Question left, navigator right,
            sticky so it stays with you down a long question. */}
        <div className="mx-auto max-w-6xl p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            {/* Question Panel */}
            <Card className="border border-white/[0.1]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Question {currentQuestion + 1} of {examQuestions.length}
                    </h2>
                    <div className="text-sm text-white mt-1">{config.examTitle}</div>
                  </div>
                  <Button
                    onClick={toggleFlag}
                    variant="outline"
                    size="sm"
                    className={`border-elec-yellow/30 ${
                      flaggedQuestions.has(currentQuestion)
                        ? 'bg-elec-yellow/20 text-elec-yellow'
                        : 'text-white hover:bg-elec-yellow/10'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                  </Button>
                </div>

                <div className="mb-8">
                  {/* Category Badge - Desktop */}
                  <Badge
                    variant="outline"
                    className="text-xs border-elec-yellow/40 text-elec-yellow mb-4"
                  >
                    {examQuestions[currentQuestion]?.category || 'General'}
                  </Badge>
                  <p className="text-white text-lg leading-relaxed mb-6">
                    {examQuestions[currentQuestion]?.question}
                  </p>

                  <div className="space-y-3">
                    {examQuestions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full min-h-[56px] p-4 text-left rounded-xl border-2 transition-all touch-manipulation active:scale-[0.98] ${
                          selectedAnswers[currentQuestion] === index
                            ? 'bg-elec-yellow/20 border-elec-yellow text-white'
                            : 'bg-white/[0.02] border-white/20 text-white hover:bg-elec-yellow/10 hover:border-elec-yellow/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedAnswers[currentQuestion] === index
                                ? 'bg-elec-yellow text-black font-bold'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            <span className="text-sm font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <span className="leading-relaxed pt-1">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-elec-yellow/30">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    {currentQuestion === examQuestions.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={answeredCount === 0}
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-50 text-sm px-6 py-3 min-h-[52px] font-semibold rounded-xl"
                        size="sm"
                      >
                        Submit Exam
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold py-3 text-base min-h-[48px] rounded-lg px-8"
                        size="lg"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Desktop Sidebar */}
            <Card className="border border-white/[0.1] bg-transparent shadow-lg lg:sticky lg:top-20">
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Timer */}
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 p-4 rounded-xl border border-elec-yellow/30">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-elec-yellow" />
                        <span className="text-sm font-medium text-white">Time Remaining</span>
                      </div>
                      <div
                        className={`font-mono text-2xl font-bold ${timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-elec-yellow'}`}
                      >
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-xs text-white mt-1">
                        {timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-elec-yellow/30">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-white">Progress</span>
                        <span className="text-lg font-bold text-elec-yellow">
                          {answeredCount}/{examQuestions.length}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-3 mb-3" />
                      <div className="text-xs text-center text-white">
                        {Math.round(progressPercentage)}% Complete
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-elec-yellow" />
                      Statistics
                    </h3>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-400">Answered</span>
                        </div>
                        <span className="font-bold text-green-400">{answeredCount}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-elec-yellow">Remaining</span>
                        </div>
                        <span className="font-bold text-elec-yellow">
                          {examQuestions.length - answeredCount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border border-elec-yellow/20">
                        <div className="flex items-center gap-2">
                          <Flag className="w-3 h-3 text-elec-yellow" />
                          <span className="text-sm text-elec-yellow">Flagged</span>
                        </div>
                        <span className="font-bold text-elec-yellow">{flaggedQuestions.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Grid */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Questions</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {examQuestions.map((_, index) => {
                        const isAnswered = selectedAnswers[index] !== -1;
                        const isCurrent = index === currentQuestion;
                        const isFlagged = flaggedQuestions.has(index);

                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentQuestion(index)}
                            className={`
                              relative w-10 h-10 text-xs font-bold rounded-lg transition-all duration-200 border-2
                              ${
                                isCurrent
                                  ? 'bg-elec-yellow text-black border-elec-yellow shadow-lg scale-110'
                                  : isAnswered
                                    ? 'bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/40'
                                    : 'bg-[#1a1a1a]/30 text-white border-elec-yellow/30 hover:bg-elec-yellow/20 hover:border-elec-yellow/40'
                              }
                            `}
                          >
                            {index + 1}
                            {isFlagged && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-elec-yellow rounded-full flex items-center justify-center">
                                <Flag className="w-2 h-2 text-white fill-current" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={goToNextFlagged}
                      disabled={flaggedQuestions.size === 0}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-border/30 text-elec-yellow hover:bg-transparent disabled:opacity-50"
                    >
                      <Flag className="h-3 w-3 mr-2" />
                      Next Flagged ({flaggedQuestions.size})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardMockExam;
