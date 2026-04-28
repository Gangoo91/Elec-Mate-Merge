import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  BookOpen,
  Check,
  X,
  Trophy,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

/* ==========================================================================
   TakeQuizPage — /apprentice/college/quiz/:id
   Reads a tutor_quizzes row + its questions, runs the quiz with a stepper
   and timer, persists answers + score to tutor_quiz_attempts on submit.

   Resumes an in-progress attempt if one exists (started_at set, no completed_at).
   ========================================================================== */

interface QuizMeta {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  difficulty: string | null;
  time_limit_minutes: number | null;
  pass_mark: number | null;
  qualification_code: string | null;
  is_homework: boolean;
  due_date: string | null;
  source: string | null;
}

type QuestionKind =
  | 'multi_choice'
  | 'true_false'
  | 'short_answer'
  | 'long_answer'
  | 'calculation'
  | 'scenario'
  | 'image_annotation'
  | 'practical_evidence';

interface QuizQuestion {
  id: string;
  question_kind: QuestionKind;
  question_text: string;
  options: string[] | null;
  correct_answer_index: number | null;
  expected_answer: Record<string, unknown> | null;
  marking_guidance: string | null;
  explanation: string | null;
  category: string | null;
  difficulty: string | null;
  ac_ref: string | null;
  points: number | null;
  sort_order: number | null;
  bs7671_citations: Array<{ ref: string; regulation_id?: string; snippet?: string }> | null;
}

/** A learner's answer for any question kind. Stored as jsonb keyed by question_id
 *  in tutor_quiz_attempts.answers — so we can keep it heterogeneous. */
type LearnerAnswer =
  | { kind: 'multi_choice'; index: number }
  | { kind: 'true_false'; value: boolean }
  | { kind: 'short_answer' | 'long_answer' | 'scenario'; text: string }
  | { kind: 'calculation'; numeric: number | null; working: string }
  | {
      kind: 'image_annotation' | 'practical_evidence';
      caption: string;
      files: Array<{ url: string; name: string; mime?: string }>;
    };

interface AttemptRow {
  id: string;
  quiz_id: string;
  student_id: string;
  score: number | null;
  total_points: number | null;
  started_at: string | null;
  completed_at: string | null;
  answers: Record<string, LearnerAnswer> | null;
  time_taken_seconds: number | null;
}

type Phase = 'loading' | 'intro' | 'in_progress' | 'review' | 'submitted' | 'error';

export default function TakeQuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [attempt, setAttempt] = useState<AttemptRow | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LearnerAnswer>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resultPct, setResultPct] = useState<number | null>(null);

  const startedAtRef = useRef<Date | null>(null);

  // Load quiz + questions + attempt
  useEffect(() => {
    if (!id || !user) return;
    let cancelled = false;
    (async () => {
      setPhase('loading');
      try {
        const [{ data: q, error: qErr }, { data: qs, error: qsErr }, { data: existingAttempt }] =
          await Promise.all([
            supabase
              .from('tutor_quizzes')
              .select(
                'id, title, description, topic, difficulty, time_limit_minutes, pass_mark, qualification_code, is_homework, due_date, source'
              )
              .eq('id', id)
              .maybeSingle(),
            supabase
              .from('tutor_quiz_questions')
              .select(
                'id, question_kind, question_text, options, correct_answer_index, expected_answer, marking_guidance, explanation, category, difficulty, ac_ref, points, sort_order, bs7671_citations'
              )
              .eq('quiz_id', id)
              .order('sort_order', { ascending: true, nullsFirst: false }),
            supabase
              .from('tutor_quiz_attempts')
              .select('*')
              .eq('quiz_id', id)
              .eq('student_id', user.id)
              .order('started_at', { ascending: false })
              .limit(1)
              .maybeSingle(),
          ]);

        if (cancelled) return;
        if (qErr || !q) {
          setError(qErr?.message ?? 'Quiz not found or you do not have access.');
          setPhase('error');
          return;
        }
        if (qsErr) {
          setError(qsErr.message);
          setPhase('error');
          return;
        }
        setQuiz(q as QuizMeta);
        setQuestions((qs ?? []) as QuizQuestion[]);
        const att = (existingAttempt as AttemptRow | null) ?? null;
        setAttempt(att);
        if (att && att.completed_at) {
          // Already done — show submitted view with their score
          setAnswers(att.answers ?? {});
          if (att.score != null && att.total_points != null && att.total_points > 0) {
            setResultPct(Math.round((att.score / att.total_points) * 100));
          }
          setPhase('submitted');
        } else if (att && att.started_at && !att.completed_at) {
          // Resuming — restore answers + start timer
          setAnswers(att.answers ?? {});
          startedAtRef.current = new Date(att.started_at);
          setPhase('in_progress');
        } else {
          setPhase('intro');
        }
      } catch (e) {
        if (cancelled) return;
        setError((e as Error).message ?? 'Failed to load quiz');
        setPhase('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, user]);

  // Realtime: lift the displayed score when AI grading lands on the attempt
  useEffect(() => {
    if (phase !== 'submitted' || !attempt?.id) return;
    const channel = supabase
      .channel(`quiz-attempt-${attempt.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tutor_quiz_attempts',
          filter: `id=eq.${attempt.id}`,
        },
        (payload) => {
          const next = payload.new as { score: number | null; total_points: number | null };
          if (next.score != null && next.total_points != null && next.total_points > 0) {
            setResultPct(Math.round((next.score / next.total_points) * 100));
          }
        }
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [phase, attempt?.id]);

  // Timer
  useEffect(() => {
    if (phase !== 'in_progress' || !quiz?.time_limit_minutes || !startedAtRef.current) return;
    const limitMs = quiz.time_limit_minutes * 60 * 1000;
    const tick = () => {
      const elapsed = Date.now() - startedAtRef.current!.getTime();
      const remaining = Math.max(0, Math.floor((limitMs - elapsed) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) {
        // Auto-submit when time runs out
        void handleSubmit(true);
      }
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, quiz?.time_limit_minutes]);

  const totalPoints = useMemo(
    () => questions.reduce((s, q) => s + (q.points ?? 1), 0),
    [questions]
  );
  const currentQ = questions[stepIdx];
  const answeredCount = Object.keys(answers).length;

  const handleStart = async () => {
    if (!user || !id) return;
    try {
      // Create or reuse attempt row
      let attemptId = attempt?.id;
      if (!attemptId) {
        const { data: newRow, error: insErr } = await supabase
          .from('tutor_quiz_attempts')
          .insert({
            quiz_id: id,
            student_id: user.id,
            started_at: new Date().toISOString(),
            answers: {},
            score: 0,
            total_points: totalPoints,
          })
          .select()
          .single();
        if (insErr || !newRow) throw new Error(insErr?.message ?? 'Could not start attempt');
        setAttempt(newRow as AttemptRow);
        attemptId = (newRow as AttemptRow).id;
        startedAtRef.current = new Date(
          (newRow as AttemptRow).started_at ?? new Date().toISOString()
        );
      } else if (!attempt?.started_at) {
        const startedAt = new Date().toISOString();
        const { error: updErr } = await supabase
          .from('tutor_quiz_attempts')
          .update({ started_at: startedAt })
          .eq('id', attemptId);
        if (updErr) throw new Error(updErr.message);
        startedAtRef.current = new Date(startedAt);
      }
      setPhase('in_progress');
    } catch (e) {
      toast({
        title: 'Could not start',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const setAnswer = (qid: string, value: LearnerAnswer, revealExplanation = true) => {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    if (revealExplanation) setShowExplanation(true);
    if (attempt) {
      void supabase.from('tutor_quiz_attempts').update({ answers: next }).eq('id', attempt.id);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (stepIdx < questions.length - 1) setStepIdx(stepIdx + 1);
    else setPhase('review');
  };

  const handleSubmit = async (autoSubmitted = false) => {
    if (!attempt || submitting) return;
    setSubmitting(true);
    try {
      // Single source of truth: scoreVerdict. Refuses to count questions that
      // have no usable answer key (a 5/5 honesty bug we hit on AI-authored
      // quizzes where the model didn't supply correct_answer_index).
      const pendingGradeRows: Array<{ question_id: string; learner_answer: LearnerAnswer }> = [];
      let score = 0;
      let gradableTotalPoints = 0;
      let ungradeableCount = 0;
      for (const q of questions) {
        const points = q.points ?? 1;
        const a = answers[q.id];
        const verdict = scoreVerdict(q, a);
        if (verdict === 'no_key') {
          // Don't count broken questions in the denominator either — keeps
          // the percentage honest. Tutor will see ungradeableCount > 0 and
          // can review.
          ungradeableCount += 1;
          continue;
        }
        if (isFreeResponseKind(q.question_kind)) {
          // Free-response counts toward total_points. Score reconciles when
          // ai-grade-free-response runs.
          gradableTotalPoints += points;
          if (a != null) {
            pendingGradeRows.push({ question_id: q.id, learner_answer: a });
          }
          continue;
        }
        // Deterministic kinds with a usable answer key.
        gradableTotalPoints += points;
        if (verdict === 'correct') score += points;
      }

      // Insert pending grade rows for AI grading
      if (pendingGradeRows.length > 0) {
        try {
          await supabase.from('tutor_quiz_answer_grades').insert(
            pendingGradeRows.map((r) => ({
              attempt_id: attempt.id,
              question_id: r.question_id,
              learner_answer: r.learner_answer,
              ai_score: null,
              ai_rationale: null,
            }))
          );
        } catch {
          /* best-effort — tutor will still see attempt */
        }
      }

      const completedAt = new Date().toISOString();
      const startedAt = startedAtRef.current?.toISOString() ?? completedAt;
      const timeTaken = Math.round(
        (new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000
      );
      const { error: submitErr } = await supabase
        .from('tutor_quiz_attempts')
        .update({
          score,
          total_points: gradableTotalPoints,
          answers,
          completed_at: completedAt,
          time_taken_seconds: timeTaken,
        })
        .eq('id', attempt.id);
      if (submitErr) throw new Error(submitErr.message);

      const pct = gradableTotalPoints > 0 ? Math.round((score / gradableTotalPoints) * 100) : 0;
      void ungradeableCount; // surfaced via scoreVerdict in SubmittedState

      // OTJ: log this completed quiz as off-the-job structured learning so it
      // feeds the OTJ gauge, the EPA verdict, and ESFA exports. Best-effort
      // — don't fail the submit if this insert errors.
      if (user && quiz) {
        try {
          const minutes = Math.max(1, Math.round(timeTaken / 60));
          const xp = Math.round((pct / 100) * 30) + 5; // 5–35 XP based on score
          await supabase.from('learning_activity_log').insert({
            user_id: user.id,
            activity_type: 'tutor_quiz',
            source_id: attempt.id,
            source_title: quiz.title,
            xp_earned: xp,
            duration_minutes: minutes,
            counted_as_ojt: true,
            metadata: {
              quiz_id: quiz.id,
              score,
              total_points: gradableTotalPoints,
              percentage: pct,
              passed: quiz.pass_mark != null ? pct >= quiz.pass_mark : null,
              qualification_code: quiz.qualification_code,
              difficulty: quiz.difficulty,
              ungradeable_questions: ungradeableCount,
            },
          });
        } catch {
          /* best-effort */
        }
      }
      setResultPct(pct);
      setPhase('submitted');
      if (autoSubmitted) {
        toast({
          title: 'Time up — submitted',
          description: `You scored ${score}/${gradableTotalPoints} (${pct}%).`,
        });
      } else {
        toast({
          title: 'Quiz submitted',
          description: `You scored ${score}/${gradableTotalPoints} (${pct}%).`,
        });
      }

      // Fire AI grading for any free-response questions. Non-blocking — the
      // apprentice already sees their auto-graded score; the AI grade lifts
      // the total when it finishes (realtime subscription below picks it up).
      if (pendingGradeRows.length > 0) {
        void supabase.functions
          .invoke('ai-grade-free-response', { body: { attempt_id: attempt.id } })
          .catch(() => undefined);
      }
    } catch (e) {
      toast({
        title: 'Could not submit',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ─────────────────── render ─────────────────── */

  if (phase === 'loading') {
    return (
      <CenterShell>
        <div className="text-white/85 text-sm">Loading quiz…</div>
      </CenterShell>
    );
  }

  if (phase === 'error') {
    return (
      <CenterShell>
        <div className="rounded-2xl border border-red-500/[0.25] bg-red-500/[0.05] px-5 py-4 max-w-md">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300 mb-1">
            Couldn't load quiz
          </div>
          <p className="text-[13px] text-white">{error}</p>
          <button
            onClick={() => navigate('/apprentice/college-plan')}
            className="mt-3 text-[12px] font-semibold text-white hover:text-elec-yellow"
          >
            ← Back to my college hub
          </button>
        </div>
      </CenterShell>
    );
  }

  if (!quiz) return null;

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <button
          onClick={() => navigate('/apprentice/college-plan')}
          className="text-[12px] font-medium text-white hover:text-elec-yellow inline-flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          My college hub
        </button>

        <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/[0.14] border border-blue-400/30 flex items-center justify-center flex-shrink-0">
              <Brain className="h-5 w-5 text-blue-200" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  {quiz.is_homework ? 'Homework' : 'Quiz'}
                </span>
                {quiz.source === 'ai_authored' && (
                  <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
                    AI
                  </span>
                )}
                {quiz.difficulty && (
                  <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9px] font-semibold tracking-[0.06em] uppercase text-white capitalize">
                    {quiz.difficulty}
                  </span>
                )}
              </div>
              <h1 className="text-[18px] font-semibold text-white tracking-tight leading-tight">
                {quiz.title}
              </h1>
              {quiz.description && (
                <p className="mt-1 text-[12.5px] text-white leading-snug">{quiz.description}</p>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-white tabular-nums flex-wrap">
            <span>{questions.length} questions</span>
            {quiz.time_limit_minutes && (
              <>
                <span className="text-white/35">·</span>
                <span>{quiz.time_limit_minutes}m</span>
              </>
            )}
            {quiz.pass_mark != null && (
              <>
                <span className="text-white/35">·</span>
                <span>{quiz.pass_mark}% to pass</span>
              </>
            )}
            {phase === 'in_progress' && secondsLeft != null && (
              <>
                <span className="text-white/35">·</span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1',
                    secondsLeft < 60 && 'text-red-300'
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Phase-specific body */}
        <div className="mt-5">
          {phase === 'intro' && (
            <IntroState
              questions={questions}
              quiz={quiz}
              onStart={handleStart}
              hasInProgress={!!attempt && !!attempt.started_at && !attempt.completed_at}
            />
          )}

          {phase === 'in_progress' && currentQ && (
            <QuestionStep
              q={currentQ}
              index={stepIdx}
              total={questions.length}
              answer={answers[currentQ.id]}
              showExplanation={showExplanation}
              onAnswer={setAnswer}
              onReveal={() => setShowExplanation(true)}
              onNext={handleNext}
              onPrev={() => stepIdx > 0 && (setShowExplanation(false), setStepIdx(stepIdx - 1))}
              onJumpTo={(i) => (setShowExplanation(false), setStepIdx(i))}
              answeredCount={answeredCount}
            />
          )}

          {phase === 'review' && (
            <ReviewState
              questions={questions}
              answers={answers}
              answeredCount={answeredCount}
              onJumpTo={(i) => {
                setStepIdx(i);
                setShowExplanation(true);
                setPhase('in_progress');
              }}
              onSubmit={() => void handleSubmit(false)}
              submitting={submitting}
            />
          )}

          {phase === 'submitted' && (
            <SubmittedState
              quiz={quiz}
              questions={questions}
              answers={answers}
              resultPct={resultPct}
              onBack={() => navigate('/apprentice/college-plan')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── states ──────────────────── */

function IntroState({
  questions,
  quiz,
  onStart,
  hasInProgress,
}: {
  questions: QuizQuestion[];
  quiz: QuizMeta;
  onStart: () => void;
  hasInProgress: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
          Before you start
        </div>
        <ul className="space-y-1.5 text-[12.5px] text-white leading-snug">
          <li className="pl-3 relative">
            <span className="absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full bg-white/65" />
            {questions.length} {questionKindMixLabel(questions)}
          </li>
          {quiz.time_limit_minutes && (
            <li className="pl-3 relative">
              <span className="absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full bg-white/65" />
              {quiz.time_limit_minutes} minute time limit — auto-submits when it runs out
            </li>
          )}
          {quiz.pass_mark != null && (
            <li className="pl-3 relative">
              <span className="absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full bg-white/65" />
              Pass mark is {quiz.pass_mark}%
            </li>
          )}
          <li className="pl-3 relative">
            <span className="absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full bg-white/65" />
            You'll see the explanation + BS 7671 citation after each answer
          </li>
        </ul>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="w-full h-12 rounded-full bg-elec-yellow text-black text-[14px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation inline-flex items-center justify-center gap-2"
      >
        {hasInProgress ? (
          <>
            <RefreshCw className="h-4 w-4" strokeWidth={2.5} />
            Resume quiz
          </>
        ) : (
          <>
            Start quiz
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </>
        )}
      </button>
    </div>
  );
}

function QuestionStep({
  q,
  index,
  total,
  answer,
  showExplanation,
  onAnswer,
  onReveal,
  onNext,
  onPrev,
  onJumpTo,
  answeredCount,
}: {
  q: QuizQuestion;
  index: number;
  total: number;
  answer: LearnerAnswer | undefined;
  showExplanation: boolean;
  onAnswer: (qid: string, value: LearnerAnswer, revealExplanation?: boolean) => void;
  onReveal: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJumpTo: (i: number) => void;
  answeredCount: number;
}) {
  return (
    <div className="space-y-3">
      {/* Progress strip */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onJumpTo(i)}
            className={cn(
              'flex-1 h-1.5 rounded-full transition-colors touch-manipulation',
              i === index
                ? 'bg-elec-yellow'
                : i < index
                  ? 'bg-emerald-400/60'
                  : 'bg-white/[0.10] hover:bg-white/[0.15]'
            )}
            aria-label={`Question ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10.5px] text-white tabular-nums">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>
          {answeredCount}/{total} answered
        </span>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-5">
        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
            {kindLabel(q.question_kind)}
          </span>
          {q.difficulty && (
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[9.5px] font-semibold tracking-[0.06em] uppercase',
                q.difficulty === 'easy'
                  ? 'bg-emerald-500/[0.10] border-emerald-400/30 text-emerald-200'
                  : q.difficulty === 'hard'
                    ? 'bg-red-500/[0.10] border-red-400/30 text-red-200'
                    : 'bg-amber-500/[0.10] border-amber-400/30 text-amber-200'
              )}
            >
              {q.difficulty}
            </span>
          )}
          {q.ac_ref && (
            <span className="inline-flex items-center gap-1 h-5 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200">
              <Target className="h-2.5 w-2.5" /> AC {q.ac_ref}
            </span>
          )}
          {(q.points ?? 1) !== 1 && (
            <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white tabular-nums">
              {q.points} pts
            </span>
          )}
        </div>

        <h2 className="text-[15px] font-medium text-white leading-snug">{q.question_text}</h2>

        <div className="mt-4">
          <AnswerInput q={q} answer={answer} locked={showExplanation} onAnswer={onAnswer} />
        </div>

        {/* Reveal-result button for free-response (no auto-reveal) */}
        {!showExplanation && isFreeResponseKind(q.question_kind) && answer != null && (
          <button
            type="button"
            onClick={onReveal}
            className="mt-3 w-full h-10 rounded-full bg-white/[0.06] border border-white/[0.10] text-white text-[12.5px] font-semibold hover:bg-white/[0.10] transition-all touch-manipulation"
          >
            Lock answer & continue
          </button>
        )}

        {/* Explanation / feedback reveal */}
        <AnimatePresence>
          {showExplanation && (q.explanation || isFreeResponseKind(q.question_kind)) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-white/[0.06] overflow-hidden"
            >
              <FeedbackBadge q={q} answer={answer} />
              {q.explanation && (
                <p className="mt-2 text-[12px] text-white leading-relaxed">{q.explanation}</p>
              )}

              {q.bs7671_citations && q.bs7671_citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-2">
                    BS 7671
                  </div>
                  <ul className="space-y-2.5">
                    {q.bs7671_citations.map((c, k) => (
                      <li key={k} className="border-l-2 border-blue-400/30 pl-3 break-words">
                        <div className="text-[10.5px] font-semibold tracking-[0.04em] text-blue-200 break-all">
                          {c.ref}
                        </div>
                        {c.snippet && (
                          <p className="mt-0.5 text-[12px] text-white/85 leading-relaxed break-words">
                            {c.snippet}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav row */}
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onPrev} disabled={index === 0} className="flex-1">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!showExplanation} className="flex-1">
          {index === total - 1 ? 'Review answers' : 'Next'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

/* ───────────── per-kind input renderer ───────────── */

function AnswerInput({
  q,
  answer,
  locked,
  onAnswer,
}: {
  q: QuizQuestion;
  answer: LearnerAnswer | undefined;
  locked: boolean;
  onAnswer: (qid: string, value: LearnerAnswer, revealExplanation?: boolean) => void;
}) {
  if (q.question_kind === 'multi_choice') {
    const opts = q.options ?? [];
    const selected = answer?.kind === 'multi_choice' ? answer.index : null;
    return (
      <ul className="space-y-2">
        {opts.map((opt, j) => {
          const isSelected = selected === j;
          const correct = j === q.correct_answer_index;
          return (
            <li key={j}>
              <button
                type="button"
                disabled={locked}
                onClick={() => onAnswer(q.id, { kind: 'multi_choice', index: j }, true)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors touch-manipulation border',
                  locked && correct
                    ? 'bg-emerald-500/[0.10] border-emerald-400/40 text-emerald-100'
                    : locked && isSelected && !correct
                      ? 'bg-red-500/[0.08] border-red-400/40 text-red-100'
                      : isSelected
                        ? 'bg-elec-yellow/[0.10] border-elec-yellow/40 text-white'
                        : 'bg-[hsl(0_0%_15%)] border-white/[0.10] text-white hover:bg-white/[0.04]'
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center h-7 w-7 rounded-full border text-[12px] font-bold tabular-nums flex-shrink-0',
                    locked && correct
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100'
                      : locked && isSelected && !correct
                        ? 'bg-red-500/30 border-red-400 text-red-100'
                        : isSelected
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'border-white/25 text-white'
                  )}
                >
                  {String.fromCharCode(65 + j)}
                </span>
                <span className="min-w-0 flex-1 text-[13px] leading-snug">{opt}</span>
                {locked && correct && (
                  <Check className="h-4 w-4 text-emerald-300 flex-shrink-0" strokeWidth={3} />
                )}
                {locked && isSelected && !correct && (
                  <X className="h-4 w-4 text-red-300 flex-shrink-0" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  if (q.question_kind === 'true_false') {
    const selected = answer?.kind === 'true_false' ? answer.value : null;
    const expectedTrue = q.correct_answer_index === 0;
    const choices: { label: string; value: boolean }[] = [
      { label: 'True', value: true },
      { label: 'False', value: false },
    ];
    return (
      <ul className="grid grid-cols-2 gap-2">
        {choices.map((c) => {
          const isSelected = selected === c.value;
          const correct = c.value === expectedTrue;
          return (
            <li key={c.label}>
              <button
                type="button"
                disabled={locked}
                onClick={() => onAnswer(q.id, { kind: 'true_false', value: c.value }, true)}
                className={cn(
                  'w-full h-12 rounded-xl text-[14px] font-semibold transition-colors touch-manipulation border',
                  locked && correct
                    ? 'bg-emerald-500/[0.10] border-emerald-400/40 text-emerald-100'
                    : locked && isSelected && !correct
                      ? 'bg-red-500/[0.08] border-red-400/40 text-red-100'
                      : isSelected
                        ? 'bg-elec-yellow/[0.10] border-elec-yellow/40 text-white'
                        : 'bg-[hsl(0_0%_15%)] border-white/[0.10] text-white hover:bg-white/[0.04]'
                )}
              >
                {c.label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  if (
    q.question_kind === 'short_answer' ||
    q.question_kind === 'long_answer' ||
    q.question_kind === 'scenario'
  ) {
    const text = answer?.kind === q.question_kind ? answer.text : '';
    const minRows = q.question_kind === 'short_answer' ? 3 : 6;
    const placeholder =
      q.question_kind === 'scenario'
        ? 'Walk through what you would do, step by step.'
        : 'Type your answer…';
    const expected = (q.expected_answer ?? {}) as { min_words?: number; max_words?: number };
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    return (
      <div>
        <textarea
          value={text}
          disabled={locked}
          onChange={(e) =>
            onAnswer(q.id, { kind: q.question_kind, text: e.target.value } as LearnerAnswer, false)
          }
          placeholder={placeholder}
          rows={minRows}
          className="w-full rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[13.5px] text-white placeholder:text-white/35 px-4 py-3 leading-relaxed touch-manipulation resize-y disabled:opacity-70"
        />
        <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-white tabular-nums">
          <span>
            {wordCount} word{wordCount === 1 ? '' : 's'}
            {expected.min_words && wordCount < expected.min_words && (
              <span className="ml-1 text-amber-300">· aim for {expected.min_words}+</span>
            )}
          </span>
          <span className="text-white/55">AI graded</span>
        </div>
        {q.marking_guidance && locked && (
          <div className="mt-2 rounded-lg bg-white/[0.03] border border-white/[0.08] px-3 py-2">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-0.5">
              Marking guidance
            </div>
            <p className="text-[11.5px] text-white/85 leading-snug">{q.marking_guidance}</p>
          </div>
        )}
      </div>
    );
  }

  if (q.question_kind === 'calculation') {
    const numeric = answer?.kind === 'calculation' ? answer.numeric : null;
    const working = answer?.kind === 'calculation' ? answer.working : '';
    const expected = (q.expected_answer ?? {}) as {
      numeric_value?: number;
      tolerance?: number;
      units?: string;
      working_required?: boolean;
    };
    const correct =
      locked &&
      expected.numeric_value != null &&
      numeric != null &&
      Math.abs(numeric - expected.numeric_value) <= (expected.tolerance ?? 0);
    return (
      <div className="space-y-3">
        <div>
          <label className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/85">
            Final answer{expected.units ? ` (${expected.units})` : ''}
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              step="any"
              disabled={locked}
              value={numeric ?? ''}
              onChange={(e) => {
                const n = e.target.value === '' ? null : Number(e.target.value);
                onAnswer(
                  q.id,
                  {
                    kind: 'calculation',
                    numeric: Number.isFinite(n as number) ? (n as number) : null,
                    working,
                  },
                  false
                );
              }}
              placeholder="e.g. 24.5"
              className={cn(
                'w-full h-12 rounded-xl bg-[hsl(0_0%_15%)] border text-[15px] font-semibold tabular-nums text-white placeholder:text-white/35 px-4 touch-manipulation',
                locked
                  ? correct
                    ? 'border-emerald-400/40'
                    : 'border-red-400/40'
                  : 'border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow'
              )}
            />
            {expected.units && (
              <span className="text-[12px] text-white/65 whitespace-nowrap">{expected.units}</span>
            )}
          </div>
        </div>
        <div>
          <label className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/85">
            Show your working{expected.working_required ? ' (required)' : ''}
          </label>
          <textarea
            value={working}
            disabled={locked}
            onChange={(e) =>
              onAnswer(q.id, { kind: 'calculation', numeric, working: e.target.value }, false)
            }
            placeholder="Step through your calculation…"
            rows={4}
            className="mt-1 w-full rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[13px] text-white placeholder:text-white/35 px-4 py-3 leading-relaxed touch-manipulation resize-y disabled:opacity-70 font-mono"
          />
        </div>
      </div>
    );
  }

  // image_annotation / practical_evidence — file upload + caption
  if (q.question_kind === 'image_annotation' || q.question_kind === 'practical_evidence') {
    return <MediaAnswerInput q={q} answer={answer} locked={locked} onAnswer={onAnswer} />;
  }

  return null;
}

function MediaAnswerInput({
  q,
  answer,
  locked,
  onAnswer,
}: {
  q: QuizQuestion;
  answer: LearnerAnswer | undefined;
  locked: boolean;
  onAnswer: (qid: string, value: LearnerAnswer, revealExplanation?: boolean) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const isMedia =
    q.question_kind === 'image_annotation' || q.question_kind === 'practical_evidence';
  if (!isMedia) return null;
  const current =
    answer?.kind === 'image_annotation' || answer?.kind === 'practical_evidence'
      ? answer
      : ({ kind: q.question_kind, caption: '', files: [] } as LearnerAnswer & {
          kind: typeof q.question_kind;
          caption: string;
          files: Array<{ url: string; name: string; mime?: string }>;
        });
  const accept =
    q.question_kind === 'image_annotation' ? 'image/*' : 'image/*,video/*,application/pdf';

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData?.user?.id;
      if (!uid) throw new Error('Not signed in');
      const uploaded: Array<{ url: string; name: string; mime?: string }> = [];
      for (const f of Array.from(files)) {
        if (f.size > 10 * 1024 * 1024) {
          throw new Error(`${f.name} is over 10 MB.`);
        }
        const safe = f.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const path = `quiz-evidence/${uid}/${q.id}/${Date.now()}-${safe}`;
        const { error: upErr } = await supabase.storage
          .from('portfolio-evidence')
          .upload(path, f, { contentType: f.type || 'application/octet-stream' });
        if (upErr) throw new Error(upErr.message);
        const { data: pub } = supabase.storage.from('portfolio-evidence').getPublicUrl(path);
        uploaded.push({ url: pub.publicUrl, name: f.name, mime: f.type });
      }
      const next: LearnerAnswer = {
        kind: q.question_kind as 'image_annotation' | 'practical_evidence',
        caption: current.caption,
        files: [...current.files, ...uploaded],
      };
      onAnswer(q.id, next, false);
    } catch (e) {
      // best-effort — surface error inline next render via local state would
      // mean another hook; instead just log and let the user try again.
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (idx: number) => {
    const next: LearnerAnswer = {
      kind: q.question_kind as 'image_annotation' | 'practical_evidence',
      caption: current.caption,
      files: current.files.filter((_, i) => i !== idx),
    };
    onAnswer(q.id, next, false);
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        disabled={locked}
        onChange={(e) => void handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={locked || uploading}
        className="w-full rounded-xl border-2 border-dashed border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] px-4 py-5 text-center disabled:opacity-50 touch-manipulation"
      >
        <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/[0.06] mb-1.5">
          <Brain className="h-4 w-4 text-white" />
        </div>
        <div className="text-[13px] font-semibold text-white">
          {uploading
            ? 'Uploading…'
            : q.question_kind === 'image_annotation'
              ? 'Tap to upload your annotated image'
              : 'Tap to upload photo / video / PDF evidence'}
        </div>
        <div className="text-[10.5px] text-white/65 mt-0.5">
          Up to 10 MB per file.{' '}
          {q.question_kind === 'image_annotation' ? 'Image only.' : 'Image, video or PDF.'}
        </div>
      </button>
      {current.files.length > 0 && (
        <ul className="space-y-1.5">
          {current.files.map((f, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_15%)] px-3 py-2 flex items-center gap-2"
            >
              {f.mime?.startsWith('image/') ? (
                <img
                  src={f.url}
                  alt={f.name}
                  className="h-12 w-12 rounded-md object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-md bg-white/[0.04] inline-flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-white/65" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-white truncate">{f.name}</div>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10.5px] text-blue-300 hover:underline"
                >
                  Open
                </a>
              </div>
              {!locked && (
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-white/[0.06] text-white/65 hover:text-red-300 touch-manipulation"
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <textarea
        value={current.caption}
        disabled={locked}
        onChange={(e) =>
          onAnswer(
            q.id,
            {
              kind: q.question_kind as 'image_annotation' | 'practical_evidence',
              caption: e.target.value,
              files: current.files,
            },
            false
          )
        }
        rows={3}
        placeholder={
          q.question_kind === 'image_annotation'
            ? 'Describe what each annotation marks (the AI marks against your description + the image).'
            : 'Describe what the evidence shows and how it meets the AC.'
        }
        className="w-full rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[12.5px] text-white placeholder:text-white/35 px-4 py-3 leading-relaxed touch-manipulation resize-y disabled:opacity-70"
      />
      {q.marking_guidance && locked && (
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.08] px-3 py-2">
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-0.5">
            Marking guidance
          </div>
          <p className="text-[11.5px] text-white/85 leading-snug">{q.marking_guidance}</p>
        </div>
      )}
    </div>
  );
}

function FeedbackBadge({ q, answer }: { q: QuizQuestion; answer: LearnerAnswer | undefined }) {
  const verdict = scoreVerdict(q, answer);
  if (verdict === 'correct') {
    return (
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
        <Check className="h-3 w-3 text-emerald-300" strokeWidth={3} />
        <span className="text-emerald-200">Correct</span>
      </div>
    );
  }
  if (verdict === 'incorrect') {
    return (
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
        <X className="h-3 w-3 text-red-300" strokeWidth={3} />
        <span className="text-red-200">Not quite</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
      <Brain className="h-3 w-3 text-blue-200" />
      <span className="text-blue-200">Awaiting AI review</span>
    </div>
  );
}

function ReviewState({
  questions,
  answers,
  answeredCount,
  onJumpTo,
  onSubmit,
  submitting,
}: {
  questions: QuizQuestion[];
  answers: Record<string, LearnerAnswer>;
  answeredCount: number;
  onJumpTo: (i: number) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const unanswered = questions.filter((q) => answers[q.id] == null).length;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
          Review your answers
        </div>
        <p className="text-[12.5px] text-white">
          {answeredCount} of {questions.length} answered
          {unanswered > 0 && <span className="ml-1 text-amber-300">· {unanswered} unanswered</span>}
        </p>
      </div>

      <ol className="space-y-2">
        {questions.map((q, i) => {
          const a = answers[q.id];
          const preview = answerPreview(q, a);
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onJumpTo(i)}
                className="w-full text-left rounded-xl border border-white/[0.06] bg-[hsl(0_0%_12%)] hover:bg-white/[0.03] px-4 py-3 transition-colors touch-manipulation"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold tabular-nums text-white">
                    Q{i + 1}
                  </span>
                  <span className="text-[12px] text-white truncate flex-1">{q.question_text}</span>
                  {a != null ? (
                    <Check className="h-3.5 w-3.5 text-emerald-300 flex-shrink-0" strokeWidth={3} />
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.06em] text-amber-300">
                      Skip
                    </span>
                  )}
                </div>
                {preview && (
                  <div className="mt-1 pl-7 text-[11px] text-white/65 truncate">
                    <span className="text-white/45">Your answer: </span>
                    {preview}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="w-full h-12 rounded-full bg-elec-yellow text-black text-[14px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50 transition-all touch-manipulation"
      >
        {submitting ? 'Submitting…' : `Submit quiz`}
      </button>
    </div>
  );
}

function SubmittedState({
  quiz,
  questions,
  answers,
  resultPct,
  onBack,
}: {
  quiz: QuizMeta;
  questions: QuizQuestion[];
  answers: Record<string, LearnerAnswer>;
  resultPct: number | null;
  onBack: () => void;
}) {
  // Recompute verdict-counts from the canonical scoreVerdict so the recap and
  // the headline never disagree.
  const verdicts = questions.map((q) => scoreVerdict(q, answers[q.id]));
  const correctCount = verdicts.filter((v) => v === 'correct').length;
  const incorrectCount = verdicts.filter((v) => v === 'incorrect').length;
  const pendingCount = verdicts.filter((v) => v === 'pending').length;
  const noKeyCount = verdicts.filter((v) => v === 'no_key').length;
  const unansweredCount = verdicts.filter((v) => v === 'unanswered').length;
  const gradableCount = correctCount + incorrectCount + pendingCount + unansweredCount;

  const passed = quiz.pass_mark != null && resultPct != null && resultPct >= quiz.pass_mark;
  const accentTone: 'emerald' | 'amber' | 'red' = passed
    ? 'emerald'
    : resultPct != null && resultPct >= 50
      ? 'amber'
      : 'red';
  const accent =
    accentTone === 'emerald'
      ? 'text-emerald-300'
      : accentTone === 'amber'
        ? 'text-amber-300'
        : 'text-red-300';

  return (
    <div className="space-y-6">
      {/* Headline — typography only, no card / icon */}
      <div className="px-1">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/65">
          {passed ? 'Passed' : 'Submitted'}
        </div>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          <span
            className={cn(
              'text-[56px] sm:text-[64px] font-semibold tabular-nums leading-none',
              accent
            )}
          >
            {resultPct ?? 0}
            <span className="text-[28px] sm:text-[32px] ml-0.5 align-baseline">%</span>
          </span>
          <span className="text-[13px] text-white/85 tabular-nums">
            {correctCount} of {gradableCount} correct
            {pendingCount > 0 && ` · ${pendingCount} pending`}
          </span>
        </div>
        <p className="mt-2 text-[12.5px] text-white/65 leading-relaxed">
          {quiz.pass_mark != null && (
            <>
              Pass mark {quiz.pass_mark}% · you{' '}
              {passed ? 'cleared it' : `need ${quiz.pass_mark - (resultPct ?? 0)}% more`}.
            </>
          )}
          {pendingCount > 0 && (
            <>
              {quiz.pass_mark != null ? ' ' : ''}
              Your written answers will be marked by AI shortly — your score may rise.
            </>
          )}
          {noKeyCount > 0 && (
            <>
              {' '}
              {noKeyCount} {noKeyCount === 1 ? 'question is' : 'questions are'} flagged for tutor
              review (no answer key).
            </>
          )}
        </p>
      </div>

      {/* Question recap — editorial list, no per-row containers */}
      <div>
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/65 mb-3 px-1">
          Question recap
        </div>
        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {questions.map((q, i) => {
            const a = answers[q.id];
            const verdict = verdicts[i];
            const preview = answerPreview(q, a);
            const verdictMeta = (() => {
              if (verdict === 'correct') return { label: 'Correct', cls: 'text-emerald-300' };
              if (verdict === 'incorrect') return { label: 'Wrong', cls: 'text-red-300' };
              if (verdict === 'pending') return { label: 'Awaiting AI', cls: 'text-blue-300' };
              if (verdict === 'no_key') return { label: 'For tutor review', cls: 'text-amber-300' };
              return { label: 'Skipped', cls: 'text-white/45' };
            })();
            return (
              <li key={q.id} className="py-4 px-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10.5px] tabular-nums text-white/55 font-mono w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        'text-[10.5px] font-semibold uppercase tracking-[0.14em]',
                        verdictMeta.cls
                      )}
                    >
                      {verdictMeta.label}
                    </div>
                    <p className="mt-1 text-[13px] sm:text-[13.5px] text-white leading-snug break-words">
                      {q.question_text}
                    </p>
                    {preview && (
                      <p className="mt-1.5 text-[11.5px] text-white/65 leading-relaxed break-words">
                        Your answer: <span className="text-white/85">{preview}</span>
                      </p>
                    )}
                    {(verdict === 'incorrect' || verdict === 'no_key') && q.explanation && (
                      <p className="mt-1.5 text-[11.5px] text-white/85 leading-relaxed break-words">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="text-[13px] font-medium text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation px-1"
      >
        ← Back to my college hub
      </button>
    </div>
  );
}

/* ──────────────────── helpers ──────────────────── */

function kindLabel(kind: QuestionKind): string {
  switch (kind) {
    case 'multi_choice':
      return 'Multi-choice';
    case 'true_false':
      return 'True / False';
    case 'short_answer':
      return 'Short answer';
    case 'long_answer':
      return 'Long answer';
    case 'calculation':
      return 'Calculation';
    case 'scenario':
      return 'Scenario';
    case 'image_annotation':
      return 'Image annotation';
    case 'practical_evidence':
      return 'Practical evidence';
  }
}

function isFreeResponseKind(kind: QuestionKind): boolean {
  return (
    kind === 'short_answer' ||
    kind === 'long_answer' ||
    kind === 'scenario' ||
    kind === 'image_annotation' ||
    kind === 'practical_evidence'
  );
}

function questionKindMixLabel(qs: QuizQuestion[]): string {
  const kinds = new Set(qs.map((q) => q.question_kind));
  if (kinds.size === 1) {
    const only = qs[0]?.question_kind;
    if (only === 'multi_choice') return 'multiple-choice questions';
    if (only === 'true_false') return 'true/false questions';
    if (only === 'calculation') return 'calculation questions';
    return `${kindLabel(only as QuestionKind).toLowerCase()} questions`;
  }
  return 'mixed-format questions';
}

type Verdict = 'correct' | 'incorrect' | 'pending' | 'unanswered' | 'no_key';

/** True when this deterministic question has no usable answer key — the AI
 *  failed to supply correct_answer_index (multi_choice / true_false) or a
 *  numeric_value (calculation). We refuse to grade it rather than guess. */
function isUngradeable(q: QuizQuestion): boolean {
  if (q.question_kind === 'multi_choice') return q.correct_answer_index == null;
  if (q.question_kind === 'true_false') return q.correct_answer_index == null;
  if (q.question_kind === 'calculation') {
    const e = (q.expected_answer ?? {}) as { numeric_value?: number };
    return e.numeric_value == null;
  }
  return false; // free-response goes to AI grading
}

function scoreVerdict(q: QuizQuestion, a: LearnerAnswer | undefined): Verdict {
  if (isUngradeable(q)) return 'no_key';
  if (a == null) return 'unanswered';
  if (q.question_kind === 'multi_choice' && a.kind === 'multi_choice') {
    return a.index === q.correct_answer_index ? 'correct' : 'incorrect';
  }
  if (q.question_kind === 'true_false' && a.kind === 'true_false') {
    // correct_answer_index 0 = True, 1 = False. We've already proven it's
    // not null in isUngradeable.
    const expectedTrue = q.correct_answer_index === 0;
    return a.value === expectedTrue ? 'correct' : 'incorrect';
  }
  if (q.question_kind === 'calculation' && a.kind === 'calculation') {
    const expected = (q.expected_answer ?? {}) as { numeric_value?: number; tolerance?: number };
    if (a.numeric == null) return 'incorrect';
    return Math.abs(a.numeric - (expected.numeric_value as number)) <= (expected.tolerance ?? 0)
      ? 'correct'
      : 'incorrect';
  }
  if (isFreeResponseKind(q.question_kind)) return 'pending';
  return 'pending';
}

function answerPreview(q: QuizQuestion, a: LearnerAnswer | undefined): string | null {
  if (a == null) return null;
  if (a.kind === 'multi_choice') {
    const opt = q.options?.[a.index];
    return opt ? `${String.fromCharCode(65 + a.index)}. ${opt}` : `Option ${a.index + 1}`;
  }
  if (a.kind === 'true_false') return a.value ? 'True' : 'False';
  if (a.kind === 'calculation') {
    const expected = (q.expected_answer ?? {}) as { units?: string };
    return a.numeric == null ? '—' : `${a.numeric}${expected.units ? ' ' + expected.units : ''}`;
  }
  if (a.kind === 'image_annotation' || a.kind === 'practical_evidence') {
    const fileLabel =
      a.files.length === 0
        ? 'no files'
        : `${a.files.length} file${a.files.length === 1 ? '' : 's'}`;
    if (!a.caption) return fileLabel;
    return `${fileLabel} · ${a.caption.length > 80 ? a.caption.slice(0, 77) + '…' : a.caption}`;
  }
  return a.text.length > 120 ? a.text.slice(0, 117) + '…' : a.text;
}

function CenterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] flex items-center justify-center px-4">
      {children}
    </div>
  );
}
