import { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants, LoadingState } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
} from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { QuizAttemptReviewSheet } from '@/components/college/sheets/QuizAttemptReviewSheet';
import { useToast } from '@/hooks/use-toast';
import { rowsToCsv, downloadCsv } from '@/lib/csv';

/* ==========================================================================
   TutorQuizDetailPage — /college/quizzes/:id

   Per-quiz cohort view: what the quiz is, how the cohort did per question
   and per AC, and every attempt (tap → QuizAttemptReviewSheet). Publish /
   unpublish, regrade pending AI marks, export CSV.

   Rebuilt on the shared hub shell. What went: the hero with a 28px title
   and five coloured badges, four tinted count tiles, and a per-question
   card stack in five hues. Publish is the one solid volt control while the
   quiz is a draft; once it is live the page has no volt button at all and
   regrade is a volt text action on the Attempts heading.

   The per-question bar keeps its colour because it encodes real state:
   right (emerald), partly right (volt), wrong (red). Pending and skipped
   are white at two strengths.
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

const KIND_LABEL: Record<Kind, string> = {
  quiz: 'Quiz',
  assessment: 'Assessment',
  mock_exam: 'Mock exam',
};

const neutralButtonCn =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] active:scale-[0.98] disabled:bg-white/[0.03] disabled:opacity-60';

const primaryButtonCn =
  'inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white sm:w-auto';

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export default function TutorQuizDetailPage() {
  const { id } = useParams<{ id: string }>();
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
  const [visibleAttempts, setVisibleAttempts] = useState(50);

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
    // tutor_quiz_attempts.student_id is the learner's AUTH uid (verified
    // against the live DB), which is why names come from profiles.
    const studentIds = Array.from(new Set(attemptList.map((a) => a.student_id)));

    const nameById = new Map<string, string>();
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
      .channel(realtimeChannelName(`tutor_quiz_detail:${id}`))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_quiz_attempts', filter: `quiz_id=eq.${id}` },
        () => void load()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_quiz_answer_grades' },
        () => void load()
      )
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
    const acMap = new Map<string, { correct: number; total: number; questions: number }>();
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
    // Average over the attempts that actually carry a score. The old
    // version summed scored attempts and divided by ALL completed attempts,
    // which dragged the average down whenever a submission was still
    // waiting on its AI marks.
    const scored = completed.filter(
      (a) => a.score != null && a.total_points != null && a.total_points > 0
    );
    const avg =
      scored.length > 0
        ? Math.round(
            scored.reduce(
              (s, a) => s + ((a.score as number) / (a.total_points as number)) * 100,
              0
            ) / scored.length
          )
        : null;
    const totalPending = Object.values(pendingByAttempt).reduce((s, n) => s + n, 0);
    return {
      total: attempts.length,
      completed: completed.length,
      inProgress,
      passes: passes.length,
      passRate: completed.length > 0 ? Math.round((passes.length / completed.length) * 100) : null,
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

  const handleExportCsv = () => {
    if (!quiz) return;
    if (attempts.length === 0) {
      toast({ title: 'Nothing to export', description: 'No attempts yet.' });
      return;
    }
    const gradesByAttemptQ = new Map<string, GradeRow>();
    for (const g of allGrades) {
      gradesByAttemptQ.set(`${g.attempt_id}:${g.question_id}`, g);
    }
    const rows = attempts.map((a) => {
      const pct =
        a.score != null && a.total_points != null && a.total_points > 0
          ? Math.round((a.score / a.total_points) * 100)
          : null;
      const passed = quiz.pass_mark != null && pct != null ? pct >= quiz.pass_mark : null;
      let pendingForAttempt = 0;
      let overrideCount = 0;
      for (const q of questions) {
        const g = gradesByAttemptQ.get(`${a.id}:${q.id}`);
        if (!g) continue;
        if (g.ai_score == null) pendingForAttempt += 1;
        if (g.tutor_override_score != null) overrideCount += 1;
      }
      return {
        learner_name: a.student_name,
        student_id: a.student_id,
        status: a.completed_at
          ? passed === false
            ? 'failed'
            : passed
              ? 'passed'
              : 'submitted'
          : 'in_progress',
        score: a.score ?? '',
        total_points: a.total_points ?? '',
        percentage: pct ?? '',
        passed: passed == null ? '' : passed ? 'yes' : 'no',
        time_taken_minutes: a.time_taken_seconds != null ? Math.round(a.time_taken_seconds / 60) : '',
        started_at: a.started_at ?? '',
        completed_at: a.completed_at ?? '',
        ai_marks_pending: pendingForAttempt,
        tutor_overrides: overrideCount,
        attempt_id: a.id,
      };
    });
    const csv = rowsToCsv(rows, [
      { key: 'learner_name', header: 'Learner' },
      { key: 'status', header: 'Status' },
      { key: 'score', header: 'Score' },
      { key: 'total_points', header: 'Total points' },
      { key: 'percentage', header: 'Percentage' },
      { key: 'passed', header: 'Passed' },
      { key: 'time_taken_minutes', header: 'Time taken (min)' },
      { key: 'started_at', header: 'Started at' },
      { key: 'completed_at', header: 'Completed at' },
      { key: 'ai_marks_pending', header: 'AI marks pending' },
      { key: 'tutor_overrides', header: 'Tutor overrides' },
      { key: 'student_id', header: 'Student ID' },
      { key: 'attempt_id', header: 'Attempt ID' },
    ]);
    const stamp = new Date().toISOString().slice(0, 10);
    const safeTitle = quiz.title
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60)
      .toLowerCase();
    downloadCsv(csv, `${safeTitle || 'quiz'}-${stamp}.csv`);
    toast({ title: 'CSV exported', description: `${rows.length} attempts` });
  };

  const handleRegradeAll = async () => {
    setBusy('regrade');
    try {
      const targets = attempts.filter((a) => a.completed_at).map((a) => a.id);
      // allSettled so a single attempt's invocation failure doesn't drop
      // every other attempt's grade. We collect failures and surface a
      // honest mixed result so the tutor knows how many actually re-ran.
      const results = await Promise.allSettled(
        targets.map((aid) =>
          supabase.functions
            .invoke('ai-grade-free-response', { body: { attempt_id: aid } })
            .then((res) => {
              if (res.error) throw res.error;
              return res;
            })
        )
      );
      const failed = results.filter((r) => r.status === 'rejected') as PromiseRejectedResult[];
      const okCount = targets.length - failed.length;

      if (failed.length === 0) {
        toast({
          title: 'Regraded',
          description: `Reran AI grading on ${targets.length} attempts.`,
        });
      } else if (okCount === 0) {
        toast({
          title: 'Could not regrade',
          description:
            (failed[0]?.reason as Error | undefined)?.message ??
            'AI grading failed for all attempts.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Regraded with errors',
          description: `${okCount}/${targets.length} reran successfully — ${failed.length} failed. Try again to retry the failures.`,
          variant: 'destructive',
        });
        for (const f of failed) {
          console.error('ai-grade-free-response failed:', f.reason);
        }
      }
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
      <HubPage>
        <HubMasthead section="College" title="Quiz" backTo="/college/quizzes" />
        <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
          <LoadingState />
        </HubBody>
      </HubPage>
    );
  }
  if (!quiz) {
    return (
      <HubPage>
        <HubMasthead section="College" title="Quiz" backTo="/college/quizzes" />
        <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
          <div
            className={cn(
              'rounded-2xl border border-elec-yellow/35 px-4 py-8 text-center text-[13px] text-white sm:px-5',
              CARD_SURFACE
            )}
          >
            Quiz not found. It may have been deleted.
          </div>
        </HubBody>
      </HubPage>
    );
  }

  const kindLabel = KIND_LABEL[quiz.kind];
  const metaLine = [
    kindLabel,
    !quiz.is_published ? 'Draft' : 'Published',
    quiz.is_homework ? 'Homework' : null,
    quiz.source === 'ai_authored' ? 'AI authored' : null,
    quiz.source_document_id ? 'From document' : null,
    plural(questions.length, 'question'),
    quiz.time_limit_minutes ? `${quiz.time_limit_minutes} min` : null,
    quiz.pass_mark != null ? `${quiz.pass_mark}% to pass` : null,
    quiz.qualification_code,
    quiz.due_date ? `Due ${quiz.due_date}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const showQuestionPerformance = questionStats.length > 0 && stats.completed > 0;

  return (
    <HubPage>
      <HubMasthead section="College" title={quiz.title} backTo="/college/quizzes" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        {/* About the quiz — what it is and the actions on it. Publish is the
            one solid volt control, and only while it is a draft: once it is
            live the page has nothing that needs the tutor at that strength. */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            'rounded-2xl border border-elec-yellow/35 px-4 py-4 sm:px-5 sm:py-5',
            CARD_SURFACE
          )}
        >
          <h2 className="text-[17px] font-semibold leading-tight tracking-tight text-white">
            {quiz.title}
          </h2>
          {quiz.description && (
            <p className="mt-1.5 max-w-prose text-[13px] leading-relaxed text-white">
              {quiz.description}
            </p>
          )}
          <p className="mt-2 text-[12px] leading-snug tabular-nums text-white">{metaLine}</p>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={busy !== null}
              className={cn(quiz.is_published ? cn(neutralButtonCn, 'w-full sm:w-auto') : primaryButtonCn)}
            >
              {busy === 'publish'
                ? 'Working…'
                : quiz.is_published
                  ? 'Unpublish'
                  : 'Publish to learners'}
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={attempts.length === 0}
              className={cn(neutralButtonCn, 'w-full sm:w-auto')}
            >
              Export CSV
            </button>
          </div>
        </motion.div>

        <HubKpiRow>
          <HubKpi
            accent
            label="Started"
            value={String(stats.total)}
            verdict={
              stats.total === 0
                ? quiz.is_published
                  ? 'Nobody has opened it yet'
                  : 'Publish it so learners can start'
                : `${stats.inProgress} still in progress`
            }
          />
          <HubKpi
            label="Completed"
            value={String(stats.completed)}
            verdict={
              stats.completed === 0
                ? 'No submissions yet'
                : stats.passRate == null
                  ? 'No pass mark set'
                  : `${stats.passRate}% passed`
            }
            sentiment={stats.completed > 0 ? 'good' : 'neutral'}
          />
          <HubKpi
            label="AI marks pending"
            value={String(stats.pending)}
            verdict={
              stats.pending > 0 ? 'Free-response answers waiting for a mark' : 'Nothing waiting'
            }
            sentiment={stats.pending > 0 ? 'bad' : 'neutral'}
          />
          <HubKpi
            label="Average score"
            value={stats.avg == null ? '—' : `${stats.avg}%`}
            verdict={
              stats.avg == null
                ? 'No scored attempts yet'
                : quiz.pass_mark != null
                  ? stats.avg >= quiz.pass_mark
                    ? 'Above the pass mark'
                    : 'Below the pass mark'
                  : 'Across every scored attempt'
            }
            sentiment={
              stats.avg == null || quiz.pass_mark == null
                ? 'neutral'
                : stats.avg >= quiz.pass_mark
                  ? 'good'
                  : 'bad'
            }
          />
        </HubKpiRow>

        {/* Question performance */}
        {showQuestionPerformance && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <HubSectionHeading>Where the cohort struggles</HubSectionHeading>

            {acStats.length > 0 && (
              <motion.div
                variants={itemVariants}
                className={cn(
                  'grid grid-cols-1 gap-2.5 sm:gap-3',
                  acStats.length >= 3
                    ? 'sm:grid-cols-3'
                    : acStats.length === 2
                      ? 'sm:grid-cols-2'
                      : 'sm:grid-cols-1'
                )}
              >
                {acStats.slice(0, 3).map((s) => {
                  const weak = (s.correctness ?? 100) < 50;
                  return (
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
                        CARD_BASE,
                        CARD_NEUTRAL,
                        'min-h-[104px] p-4',
                        weak && 'border-elec-yellow/70'
                      )}
                      title="Send a follow-up quiz on this AC"
                    >
                      <span className="text-[14.5px] font-semibold leading-tight tracking-tight text-white">
                        AC {s.ac_ref}
                      </span>
                      <span
                        className={cn(
                          'mt-2 text-[26px] font-semibold leading-none tabular-nums tracking-tight',
                          weak ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {s.correctness ?? '—'}%
                      </span>
                      <span className="mt-1.5 text-[11.5px] leading-snug text-white">
                        across {plural(s.questions, 'question')}
                      </span>
                      <span className="flex-grow" />
                      <span className="mt-2 text-[12px] font-medium text-elec-yellow">
                        Send a quiz on this AC
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className={cn(
                '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
                CARD_SURFACE
              )}
            >
              <ol className="divide-y divide-white/[0.10]">
                {questionStats.map((qs, i) => {
                  const weak = qs.correctness != null && qs.correctness < 50;
                  const breakdown = [
                    `${qs.correct} right`,
                    qs.partial > 0 ? `${qs.partial} partly` : null,
                    `${qs.incorrect} wrong`,
                    qs.pending > 0 ? `${qs.pending} pending` : null,
                    qs.unanswered > 0 ? `${qs.unanswered} skipped` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <li key={qs.question.id} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-0.5 h-8 w-[3px] shrink-0 rounded-full',
                          weak ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] leading-tight tabular-nums text-white">
                          Q{i + 1}
                          {qs.question.ac_ref ? ` · AC ${qs.question.ac_ref}` : ''}
                          {` · ${qs.question.question_kind.replace(/_/g, ' ')}`}
                        </div>
                        <div className="mt-0.5 truncate text-[14px] font-semibold leading-tight text-white">
                          {qs.question.question_text}
                        </div>
                        {/* Right / partly / wrong — real state, so it keeps
                            its colour. Pending and skipped are white. */}
                        <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                          {qs.correct > 0 && (
                            <div
                              className="bg-emerald-400"
                              style={{ width: `${(qs.correct / qs.total) * 100}%` }}
                            />
                          )}
                          {qs.partial > 0 && (
                            <div
                              className="bg-elec-yellow"
                              style={{ width: `${(qs.partial / qs.total) * 100}%` }}
                            />
                          )}
                          {qs.incorrect > 0 && (
                            <div
                              className="bg-red-400"
                              style={{ width: `${(qs.incorrect / qs.total) * 100}%` }}
                            />
                          )}
                          {qs.pending > 0 && (
                            <div
                              className="bg-white/[0.35]"
                              style={{ width: `${(qs.pending / qs.total) * 100}%` }}
                            />
                          )}
                        </div>
                        <div className="mt-1.5 text-[12px] leading-tight tabular-nums text-white">
                          {breakdown}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div
                          className={cn(
                            'text-[16px] font-semibold leading-none tabular-nums',
                            weak ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          {qs.correctness ?? '—'}%
                        </div>
                        <div className="mt-1 text-[11px] tabular-nums text-white">
                          of {qs.total}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          </motion.section>
        )}

        {/* Attempts */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>Attempts</HubSectionHeading>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  'text-[11px] font-semibold tabular-nums',
                  stats.pending > 0 ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {stats.pending > 0
                  ? `${stats.pending} need AI marks`
                  : plural(attempts.length, 'attempt')}
              </span>
              {/* Regrade is a volt text action, not a second volt button. */}
              {stats.pending > 0 && (
                <button
                  type="button"
                  onClick={() => void handleRegradeAll()}
                  disabled={busy !== null}
                  className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
                >
                  {busy === 'regrade' ? 'Regrading…' : `Regrade ${stats.pending} pending`}
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
              CARD_SURFACE
            )}
          >
            {attempts.length === 0 ? (
              <p className="px-4 py-8 text-center text-[13px] text-white sm:px-5">
                Nobody has started this {kindLabel.toLowerCase()} yet.
                {!quiz.is_published && ' Publish it so the learner or cohort can see and take it.'}
              </p>
            ) : (
              <>
                <ul className="divide-y divide-white/[0.10]">
                  {attempts.slice(0, visibleAttempts).map((a) => (
                    <li key={a.id}>
                      <AttemptRowButton
                        a={a}
                        quiz={quiz}
                        pendingCount={pendingByAttempt[a.id] ?? 0}
                        onClick={() => {
                          setReviewAttemptId(a.id);
                          setReviewStudentName(a.student_name);
                        }}
                      />
                    </li>
                  ))}
                </ul>
                {attempts.length > visibleAttempts && (
                  <button
                    type="button"
                    onClick={() => setVisibleAttempts((n) => n + 50)}
                    className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
                  >
                    {attempts.length - visibleAttempts} more
                  </button>
                )}
              </>
            )}
          </motion.div>
        </motion.section>
      </HubBody>

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
    </HubPage>
  );
}

function AttemptRowButton({
  a,
  quiz,
  pendingCount,
  onClick,
}: {
  a: AttemptRow;
  quiz: QuizMeta;
  pendingCount: number;
  onClick: () => void;
}) {
  const pct =
    a.score != null && a.total_points != null && a.total_points > 0
      ? Math.round((a.score / a.total_points) * 100)
      : null;
  const passed = quiz.pass_mark != null && pct != null ? pct >= quiz.pass_mark : null;
  const isComplete = !!a.completed_at;
  const urgent = pendingCount > 0;

  const status = !isComplete
    ? 'In progress'
    : passed
      ? 'Passed'
      : passed === false
        ? 'Failed'
        : 'Submitted';

  const reason = [
    status,
    a.completed_at ? `submitted ${formatRelative(a.completed_at)}` : `started ${formatRelative(a.started_at)}`,
    a.time_taken_seconds != null ? `${Math.round(a.time_taken_seconds / 60)} min` : null,
    pendingCount > 0 ? `${pendingCount} AI ${pendingCount === 1 ? 'mark' : 'marks'} pending` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-8 w-[3px] shrink-0 rounded-full',
          passed === false ? 'bg-red-400' : urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
          {a.student_name}
        </span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[12px] leading-tight',
            passed === false ? 'text-red-300' : urgent ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {reason}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span
          className={cn(
            'block text-[13px] font-semibold tabular-nums',
            urgent ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {pct != null ? `${pct}%` : '—'}
        </span>
        {a.score != null && a.total_points != null && (
          <span className="mt-0.5 block text-[11px] tabular-nums text-white">
            {a.score}/{a.total_points}
          </span>
        )}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
    </button>
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
