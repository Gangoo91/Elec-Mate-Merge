import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Sparkles,
  Brain,
  Users,
  Clock,
  AlertTriangle,
  Check,
  TrendingUp,
  FileText,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageFrame, LoadingState } from '@/components/college/primitives';
import { supabase } from '@/integrations/supabase/client';
import { QuizAttemptReviewSheet } from '@/components/college/sheets/QuizAttemptReviewSheet';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   TutorQuizDetailPage — /college/quizzes/:id
   Per-quiz cohort dashboard: header with quiz meta + per-question stats +
   per-attempt list (clickable to QuizAttemptReviewSheet). Buttons to
   publish/unpublish + AI-regrade-all-pending.
   ========================================================================== */

type Kind = 'quiz' | 'assessment' | 'mock_exam';

interface QuizMeta {
  id: string;
  title: string;
  description: string | null;
  kind: Kind;
  difficulty: string | null;
  is_published: boolean;
  is_homework: boolean;
  due_date: string | null;
  pass_mark: number | null;
  time_limit_minutes: number | null;
  qualification_code: string | null;
  source: string | null;
  source_document_id: string | null;
  cohort_id: string | null;
  assigned_student_ids: string[];
  created_at: string | null;
  published_at: string | null;
  creator_id: string | null;
}

type LearnerAnswer =
  | { kind: 'multi_choice'; index: number }
  | { kind: 'true_false'; value: boolean }
  | { kind: 'short_answer' | 'long_answer' | 'scenario'; text: string }
  | { kind: 'calculation'; numeric: number | null; working: string };

interface AttemptRow {
  id: string;
  student_id: string;
  score: number | null;
  total_points: number | null;
  started_at: string | null;
  completed_at: string | null;
  time_taken_seconds: number | null;
  answers: Record<string, LearnerAnswer> | null;
  student_name: string;
}

interface QuestionRow {
  id: string;
  question_kind: string;
  question_text: string;
  ac_ref: string | null;
  points: number | null;
  sort_order: number | null;
  options: string[] | null;
  correct_answer_index: number | null;
  expected_answer: Record<string, unknown> | null;
}

interface GradeRow {
  attempt_id: string;
  question_id: string;
  ai_score: number | null;
  tutor_override_score: number | null;
}

export default function TutorQuizDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [pendingByAttempt, setPendingByAttempt] = useState<Record<string, number>>({});
  const [allGrades, setAllGrades] = useState<GradeRow[]>([]);
  const [reviewAttemptId, setReviewAttemptId] = useState<string | null>(null);
  const [reviewStudentName, setReviewStudentName] = useState<string | undefined>();
  const [busy, setBusy] = useState<'publish' | 'regrade' | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { data: q } = await supabase
      .from('tutor_quizzes')
      .select(
        'id, title, description, kind, difficulty, is_published, is_homework, due_date, pass_mark, time_limit_minutes, qualification_code, source, source_document_id, cohort_id, assigned_student_ids, created_at, published_at, creator_id'
      )
      .eq('id', id)
      .maybeSingle();
    if (!q) {
      setLoading(false);
      return;
    }
    const meta = q as QuizMeta & { kind: string };
    setQuiz({
      ...meta,
      kind: (meta.kind === 'assessment' || meta.kind === 'mock_exam' ? meta.kind : 'quiz') as Kind,
      assigned_student_ids: (meta.assigned_student_ids ?? []) as string[],
    });

    const [{ data: qs }, { data: at }] = await Promise.all([
      supabase
        .from('tutor_quiz_questions')
        .select(
          'id, question_kind, question_text, ac_ref, points, sort_order, options, correct_answer_index, expected_answer'
        )
        .eq('quiz_id', id)
        .order('sort_order', { ascending: true, nullsFirst: false }),
      supabase
        .from('tutor_quiz_attempts')
        .select(
          'id, student_id, score, total_points, started_at, completed_at, time_taken_seconds, answers'
        )
        .eq('quiz_id', id)
        .order('started_at', { ascending: false }),
    ]);

    setQuestions((qs ?? []) as QuestionRow[]);

    const attemptList = (at ?? []) as Array<Omit<AttemptRow, 'student_name'>>;
    const studentIds = Array.from(new Set(attemptList.map((a) => a.student_id)));

    let nameById = new Map<string, string>();
    if (studentIds.length > 0) {
      const { data: profs } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', studentIds);
      for (const p of (profs ?? []) as Array<{ id: string; full_name: string | null }>) {
        nameById.set(p.id, p.full_name ?? 'Apprentice');
      }
    }

    setAttempts(
      attemptList.map((a) => ({ ...a, student_name: nameById.get(a.student_id) ?? 'Apprentice' }))
    );

    // All grades — used for both per-attempt pending count and per-question stats
    if (attemptList.length > 0) {
      const { data: grades } = await supabase
        .from('tutor_quiz_answer_grades')
        .select('attempt_id, question_id, ai_score, tutor_override_score')
        .in(
          'attempt_id',
          attemptList.map((a) => a.id)
        );
      const rows = (grades ?? []) as GradeRow[];
      setAllGrades(rows);
      const map: Record<string, number> = {};
      for (const g of rows) {
        if (g.ai_score == null) {
          map[g.attempt_id] = (map[g.attempt_id] ?? 0) + 1;
        }
      }
      setPendingByAttempt(map);
    } else {
      setAllGrades([]);
      setPendingByAttempt({});
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime
  useEffect(() => {
    if (!id) return;
    const ch = supabase
      .channel(`tutor_quiz_detail:${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tutor_quiz_attempts', filter: `quiz_id=eq.${id}` }, () => void load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tutor_quiz_answer_grades' }, () => void load())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [id, load]);

  const questionStats = useMemo(() => {
    if (questions.length === 0 || attempts.length === 0) return [];
    const completedAttempts = attempts.filter((a) => a.completed_at);
    const gradesByAttemptQ = new Map<string, GradeRow>();
    for (const g of allGrades) {
      gradesByAttemptQ.set(`${g.attempt_id}:${g.question_id}`, g);
    }
    return questions.map((q) => {
      let correct = 0;
      let incorrect = 0;
      let partial = 0;
      let pending = 0;
      let unanswered = 0;
      for (const a of completedAttempts) {
        const ans = a.answers?.[q.id];
        if (ans == null) {
          unanswered += 1;
          continue;
        }
        if (q.question_kind === 'multi_choice' && ans.kind === 'multi_choice') {
          if (ans.index === q.correct_answer_index) correct += 1;
          else incorrect += 1;
        } else if (q.question_kind === 'true_false' && ans.kind === 'true_false') {
          const expectedTrue = q.correct_answer_index === 0;
          if (ans.value === expectedTrue) correct += 1;
          else incorrect += 1;
        } else if (q.question_kind === 'calculation' && ans.kind === 'calculation') {
          const expected = (q.expected_answer ?? {}) as { numeric_value?: number; tolerance?: number };
          if (
            expected.numeric_value != null &&
            ans.numeric != null &&
            Math.abs(ans.numeric - expected.numeric_value) <= (expected.tolerance ?? 0)
          ) {
            correct += 1;
          } else {
            incorrect += 1;
          }
        } else {
          // Free-response — read from grade row
          const g = gradesByAttemptQ.get(`${a.id}:${q.id}`);
          const points = q.points ?? 1;
          const effective = g?.tutor_override_score ?? g?.ai_score;
          if (effective == null) pending += 1;
          else if (effective >= points) correct += 1;
          else if (effective <= 0) incorrect += 1;
          else partial += 1;
        }
      }
      const total = correct + incorrect + partial + pending + unanswered;
      const correctness = total > 0 ? Math.round(((correct + partial * 0.5) / total) * 100) : null;
      return {
        question: q,
        correct,
        incorrect,
        partial,
        pending,
        unanswered,
        total,
        correctness,
      };
    });
  }, [questions, attempts, allGrades]);

  const acStats = useMemo(() => {
    const acMap = new Map<
      string,
      { correct: number; total: number; questions: number }
    >();
    for (const qs of questionStats) {
      const ac = qs.question.ac_ref;
      if (!ac) continue;
      const cur = acMap.get(ac) ?? { correct: 0, total: 0, questions: 0 };
      cur.correct += qs.correct + qs.partial * 0.5;
      cur.total += qs.total;
      cur.questions += 1;
      acMap.set(ac, cur);
    }
    return Array.from(acMap.entries())
      .map(([ac, s]) => ({
        ac_ref: ac,
        correctness: s.total > 0 ? Math.round((s.correct / s.total) * 100) : null,
        questions: s.questions,
      }))
      .sort((a, b) => (a.correctness ?? 100) - (b.correctness ?? 100));
  }, [questionStats]);

  const stats = useMemo(() => {
    const completed = attempts.filter((a) => a.completed_at);
    const inProgress = attempts.filter((a) => !a.completed_at).length;
    const passes = completed.filter((a) => {
      if (quiz?.pass_mark == null || a.score == null || a.total_points == null || a.total_points === 0)
        return false;
      return (a.score / a.total_points) * 100 >= quiz.pass_mark;
    });
    const avg =
      completed.length > 0
        ? Math.round(
            completed
              .filter((a) => a.score != null && a.total_points != null && a.total_points > 0)
              .reduce(
                (s, a) => s + ((a.score as number) / (a.total_points as number)) * 100,
                0
              ) / Math.max(1, completed.length)
          )
        : null;
    const totalPending = Object.values(pendingByAttempt).reduce((s, n) => s + n, 0);
    return {
      total: attempts.length,
      completed: completed.length,
      inProgress,
      passes: passes.length,
      passRate:
        completed.length > 0 ? Math.round((passes.length / completed.length) * 100) : null,
      avg,
      pending: totalPending,
    };
  }, [attempts, pendingByAttempt, quiz]);

  const handleTogglePublish = async () => {
    if (!quiz) return;
    setBusy('publish');
    try {
      const { error } = await supabase
        .from('tutor_quizzes')
        .update({
          is_published: !quiz.is_published,
          published_at: !quiz.is_published ? new Date().toISOString() : null,
        })
        .eq('id', quiz.id);
      if (error) throw new Error(error.message);
      toast({
        title: !quiz.is_published ? 'Published' : 'Unpublished',
        description: !quiz.is_published
          ? 'Apprentices can now see and take this.'
          : 'Hidden from apprentices.',
      });
      await load();
    } catch (e) {
      toast({
        title: 'Could not update',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const handleRegradeAll = async () => {
    setBusy('regrade');
    try {
      const targets = attempts.filter((a) => a.completed_at).map((a) => a.id);
      await Promise.all(
        targets.map((aid) =>
          supabase.functions.invoke('ai-grade-free-response', { body: { attempt_id: aid } })
        )
      );
      toast({ title: 'Regraded', description: `Reran AI grading on ${targets.length} attempts.` });
      await load();
    } catch (e) {
      toast({
        title: 'Could not regrade',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  if (loading && !quiz) {
    return (
      <PageFrame className="max-w-[1280px] pb-24">
        <LoadingState />
      </PageFrame>
    );
  }
  if (!quiz) {
    return (
      <PageFrame className="max-w-[1280px] pb-24">
        <div className="text-[13px] text-white">Quiz not found.</div>
      </PageFrame>
    );
  }

  const kindLabel =
    quiz.kind === 'mock_exam' ? 'Mock exam' : quiz.kind === 'assessment' ? 'Assessment' : 'Quiz';

  return (
    <PageFrame className="max-w-[1280px] pb-24">
      <button
        onClick={() => navigate('/college/quizzes')}
        className="text-[12px] font-medium text-white hover:text-elec-yellow inline-flex items-center gap-1 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        All quizzes
      </button>

      {/* Hero */}
      <div className="mt-4 flex items-start gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span
              className={cn(
                'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold tracking-[0.06em] uppercase',
                quiz.kind === 'mock_exam'
                  ? 'bg-orange-500/[0.10] border-orange-400/30 text-orange-200'
                  : quiz.kind === 'assessment'
                    ? 'bg-cyan-500/[0.10] border-cyan-400/30 text-cyan-200'
                    : 'bg-blue-500/[0.10] border-blue-400/30 text-blue-200'
              )}
            >
              {kindLabel}
            </span>
            {!quiz.is_published && (
              <span className="inline-flex items-center h-5 px-2 rounded-md bg-amber-500/[0.10] border border-amber-400/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-amber-200">
                Draft
              </span>
            )}
            {quiz.source === 'ai_authored' && (
              <span className="inline-flex items-center gap-1 h-5 px-2 rounded-md bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
                <Sparkles className="h-3 w-3" />
                AI authored
              </span>
            )}
            {quiz.source_document_id && (
              <span className="inline-flex items-center gap-1 h-5 px-2 rounded-md bg-white/[0.04] border border-white/[0.10] text-[10px] font-semibold tracking-[0.06em] uppercase text-white">
                <FileText className="h-3 w-3" />
                From document
              </span>
            )}
            {quiz.is_homework && (
              <span className="inline-flex items-center h-5 px-2 rounded-md bg-purple-500/[0.10] border border-purple-400/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-purple-200">
                Homework
              </span>
            )}
          </div>
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
            {quiz.title}
          </h1>
          {quiz.description && (
            <p className="mt-1 text-[13px] text-white max-w-2xl leading-relaxed">{quiz.description}</p>
          )}
          <div className="mt-2 text-[11px] text-white tabular-nums flex items-center gap-x-2 flex-wrap">
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
                <span>{quiz.pass_mark}% pass</span>
              </>
            )}
            {quiz.qualification_code && (
              <>
                <span className="text-white/35">·</span>
                <span>{quiz.qualification_code}</span>
              </>
            )}
            {quiz.due_date && (
              <>
                <span className="text-white/35">·</span>
                <span>Due {quiz.due_date}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={busy !== null}
            className={cn(
              'h-9 px-3 rounded-full border text-[12px] font-semibold touch-manipulation transition-colors disabled:opacity-50',
              quiz.is_published
                ? 'bg-white/[0.04] border-white/[0.10] text-white hover:bg-white/[0.08]'
                : 'bg-elec-yellow text-black border-elec-yellow hover:bg-elec-yellow/90'
            )}
          >
            {busy === 'publish'
              ? 'Working…'
              : quiz.is_published
                ? 'Unpublish'
                : 'Publish to learners'}
          </button>
          {stats.pending > 0 && (
            <button
              type="button"
              onClick={handleRegradeAll}
              disabled={busy !== null}
              className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.10] text-white text-[12px] font-semibold hover:bg-white/[0.08] touch-manipulation disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              <Brain className="h-3.5 w-3.5" />
              {busy === 'regrade' ? 'Regrading…' : `Regrade ${stats.pending} pending`}
            </button>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <Tile label="Started" value={stats.total} icon={<Users className="h-3.5 w-3.5" />} />
        <Tile
          label="Completed"
          value={stats.completed}
          tone={stats.completed > 0 ? 'emerald' : undefined}
          icon={<Check className="h-3.5 w-3.5" />}
        />
        <Tile
          label="In progress"
          value={stats.inProgress}
          tone={stats.inProgress > 0 ? 'amber' : undefined}
          icon={<Clock className="h-3.5 w-3.5" />}
        />
        <Tile
          label="Avg score"
          value={stats.avg ?? '—'}
          suffix={stats.avg != null ? '%' : undefined}
          tone={
            stats.avg == null ? undefined : stats.avg >= 75 ? 'emerald' : stats.avg >= 50 ? 'amber' : 'red'
          }
          icon={<TrendingUp className="h-3.5 w-3.5" />}
        />
      </div>

      {/* Question performance */}
      {questionStats.length > 0 && stats.completed > 0 && (
        <div className="mt-6">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Question performance
          </div>
          <h2 className="mt-1 text-[18px] font-semibold text-white tracking-tight">
            Where the cohort struggles
          </h2>

          {acStats.length > 0 && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {acStats.slice(0, 3).map((s) => (
                <button
                  key={s.ac_ref}
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('quiz:suggest-from-ac', {
                        detail: { ac_codes: [s.ac_ref] },
                      })
                    )
                  }
                  className={cn(
                    'rounded-2xl border px-4 py-3 text-left touch-manipulation transition-colors hover:ring-1 hover:ring-elec-yellow/40',
                    (s.correctness ?? 100) < 50
                      ? 'border-red-500/[0.30] bg-red-500/[0.05]'
                      : (s.correctness ?? 100) < 75
                        ? 'border-amber-500/[0.30] bg-amber-500/[0.05]'
                        : 'border-emerald-500/[0.20] bg-emerald-500/[0.05]'
                  )}
                  title="Send a follow-up quiz on this AC"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85">
                    AC {s.ac_ref}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-[20px] font-semibold tabular-nums text-white leading-none">
                      {s.correctness ?? '—'}%
                    </span>
                    <span className="text-[10.5px] text-white/65 tabular-nums">
                      across {s.questions}{' '}
                      {s.questions === 1 ? 'question' : 'questions'}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[10.5px] text-white/85 inline-flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Tap to send a quiz on this AC
                  </div>
                </button>
              ))}
            </div>
          )}

          <ol className="mt-3 space-y-2">
            {questionStats.map((qs, i) => (
              <li
                key={qs.question.id}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/[0.04] border border-white/[0.10] text-[11px] font-semibold tabular-nums text-white">
                    Q{i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      {qs.question.ac_ref && (
                        <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200">
                          AC {qs.question.ac_ref}
                        </span>
                      )}
                      <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
                        {qs.question.question_kind.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[12.5px] text-white leading-snug truncate">
                      {qs.question.question_text}
                    </div>
                    {/* Bar */}
                    <div className="mt-2 h-2 rounded-full bg-white/[0.05] overflow-hidden flex">
                      {qs.correct > 0 && (
                        <div
                          className="bg-emerald-400/85"
                          style={{ width: `${(qs.correct / qs.total) * 100}%` }}
                        />
                      )}
                      {qs.partial > 0 && (
                        <div
                          className="bg-amber-400/85"
                          style={{ width: `${(qs.partial / qs.total) * 100}%` }}
                        />
                      )}
                      {qs.incorrect > 0 && (
                        <div
                          className="bg-red-400/85"
                          style={{ width: `${(qs.incorrect / qs.total) * 100}%` }}
                        />
                      )}
                      {qs.pending > 0 && (
                        <div
                          className="bg-blue-400/85"
                          style={{ width: `${(qs.pending / qs.total) * 100}%` }}
                        />
                      )}
                      {qs.unanswered > 0 && (
                        <div
                          className="bg-white/[0.10]"
                          style={{ width: `${(qs.unanswered / qs.total) * 100}%` }}
                        />
                      )}
                    </div>
                    <div className="mt-1.5 flex items-center gap-x-2 text-[10.5px] tabular-nums flex-wrap">
                      <span className="text-emerald-300">{qs.correct} correct</span>
                      {qs.partial > 0 && <span className="text-amber-300">· {qs.partial} partial</span>}
                      <span className="text-red-300">· {qs.incorrect} wrong</span>
                      {qs.pending > 0 && <span className="text-blue-300">· {qs.pending} pending</span>}
                      {qs.unanswered > 0 && <span className="text-white/55">· {qs.unanswered} skipped</span>}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div
                      className={cn(
                        'text-[16px] font-semibold tabular-nums leading-none',
                        qs.correctness == null
                          ? 'text-white/55'
                          : qs.correctness >= 75
                            ? 'text-emerald-300'
                            : qs.correctness >= 50
                              ? 'text-amber-300'
                              : 'text-red-300'
                      )}
                    >
                      {qs.correctness ?? '—'}%
                    </div>
                    <div className="mt-0.5 text-[10px] text-white/55 tabular-nums">
                      n={qs.total}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Attempts list */}
      <div className="mt-6">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Attempts
            </div>
            <h2 className="mt-1 text-[18px] font-semibold text-white tracking-tight">
              {attempts.length === 0 ? 'No attempts yet' : `${attempts.length} attempts`}
            </h2>
          </div>
          {stats.pending > 0 && (
            <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full bg-amber-500/[0.10] border border-amber-400/30 text-[10.5px] font-semibold text-amber-200">
              <Brain className="h-3 w-3" />
              {stats.pending} need AI marks
            </span>
          )}
        </div>

        {attempts.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
            <p className="text-[13px] text-white max-w-md mx-auto leading-relaxed">
              No-one has started this {kindLabel.toLowerCase()} yet.
              {!quiz.is_published &&
                ' Publish it so the learner / cohort can see and take it.'}
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {attempts.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => {
                    setReviewAttemptId(a.id);
                    setReviewStudentName(a.student_name);
                  }}
                  className="w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3 hover:bg-white/[0.02] hover:border-white/[0.10] transition-colors touch-manipulation"
                >
                  <AttemptListRow
                    a={a}
                    quiz={quiz}
                    pendingCount={pendingByAttempt[a.id] ?? 0}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <QuizAttemptReviewSheet
        open={reviewAttemptId !== null}
        onOpenChange={(o) => {
          if (!o) {
            setReviewAttemptId(null);
            void load();
          }
        }}
        attemptId={reviewAttemptId}
        studentName={reviewStudentName}
      />
    </PageFrame>
  );
}

function AttemptListRow({
  a,
  quiz,
  pendingCount,
}: {
  a: AttemptRow;
  quiz: QuizMeta;
  pendingCount: number;
}) {
  const pct =
    a.score != null && a.total_points != null && a.total_points > 0
      ? Math.round((a.score / a.total_points) * 100)
      : null;
  const passed = quiz.pass_mark != null && pct != null ? pct >= quiz.pass_mark : null;
  const isComplete = !!a.completed_at;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[13px] font-semibold text-white tracking-tight truncate">
            {a.student_name}
          </span>
          {!isComplete ? (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-amber-500/[0.10] border border-amber-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-amber-200">
              In progress
            </span>
          ) : passed ? (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-emerald-500/[0.10] border border-emerald-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-emerald-200">
              Pass
            </span>
          ) : passed === false ? (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-red-500/[0.10] border border-red-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-red-200">
              Fail
            </span>
          ) : (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
              Submitted
            </span>
          )}
          {pendingCount > 0 && (
            <span className="inline-flex items-center gap-1 h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200">
              <Brain className="h-2.5 w-2.5" />
              {pendingCount} AI pending
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[10.5px] text-white tabular-nums">
          {a.completed_at ? `Submitted ${formatRelative(a.completed_at)}` : `Started ${formatRelative(a.started_at)}`}
          {a.time_taken_seconds != null && (
            <>
              <span className="mx-1.5 text-white/35">·</span>
              <span>{Math.round(a.time_taken_seconds / 60)}m</span>
            </>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        {pct != null ? (
          <>
            <div className="text-[16px] font-semibold tabular-nums text-white leading-none">
              {pct}%
            </div>
            {a.score != null && a.total_points != null && (
              <div className="mt-0.5 text-[10px] text-white/65 tabular-nums">
                {a.score}/{a.total_points}
              </div>
            )}
          </>
        ) : (
          <div className="text-[10.5px] text-white/55">—</div>
        )}
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  suffix,
  tone,
  icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  tone?: 'emerald' | 'amber' | 'red';
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          'mt-1 text-[24px] font-semibold tabular-nums leading-none',
          tone === 'emerald' && 'text-emerald-300',
          tone === 'amber' && 'text-amber-300',
          tone === 'red' && 'text-red-300',
          !tone && 'text-white'
        )}
      >
        {value}
        {suffix && <span className="text-[14px] ml-0.5">{suffix}</span>}
      </div>
    </div>
  );
}

function formatRelative(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
