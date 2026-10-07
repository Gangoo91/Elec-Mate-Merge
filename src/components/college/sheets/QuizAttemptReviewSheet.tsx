import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PresenceBadges } from '@/components/college/ui/PresenceBadges';
import { UsesAi } from '@/components/college/ui/UsesAi';

/* ==========================================================================
   QuizAttemptReviewSheet — tutor / assessor view of a learner's quiz attempt
   with per-question answers, AI grades for free-response, and an inline
   override (score + rationale) that re-tallies the attempt total.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attemptId: string | null;
  studentName?: string;
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

type LearnerAnswer =
  | { kind: 'multi_choice'; index: number }
  | { kind: 'true_false'; value: boolean }
  | { kind: 'short_answer' | 'long_answer' | 'scenario'; text: string }
  | { kind: 'calculation'; numeric: number | null; working: string };

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

interface QuizMeta {
  id: string;
  title: string;
  pass_mark: number | null;
}

interface QuestionRow {
  id: string;
  question_kind: QuestionKind;
  question_text: string;
  options: string[] | null;
  correct_answer_index: number | null;
  expected_answer: Record<string, unknown> | null;
  marking_guidance: string | null;
  explanation: string | null;
  points: number | null;
  ac_ref: string | null;
  sort_order: number | null;
  bs7671_citations: Array<{ ref: string; snippet?: string }> | null;
}

interface GradeRow {
  id: string;
  question_id: string;
  ai_score: number | null;
  ai_rationale: string | null;
  ai_strengths: string[] | null;
  ai_areas: string[] | null;
  tutor_override_score: number | null;
  tutor_override_rationale: string | null;
  tutor_override_by: string | null;
  tutor_override_at: string | null;
}

export function QuizAttemptReviewSheet({ open, onOpenChange, attemptId, studentName }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState<AttemptRow | null>(null);
  const [quiz, setQuiz] = useState<QuizMeta | null>(null);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [grades, setGrades] = useState<Record<string, GradeRow>>({});
  const [regrading, setRegrading] = useState(false);
  // Staff at the college can read any attempt; only the tutor who set the
  // quiz (or a college admin) can mark it (ELE-1895).
  const [canMark, setCanMark] = useState(true);

  const load = useCallback(async () => {
    if (!attemptId) return;
    setLoading(true);
    try {
      const { data: a } = await supabase
        .from('tutor_quiz_attempts')
        .select(
          'id, quiz_id, student_id, score, total_points, started_at, completed_at, answers, time_taken_seconds'
        )
        .eq('id', attemptId)
        .maybeSingle();
      if (!a) {
        setLoading(false);
        return;
      }
      const att = a as AttemptRow;
      setAttempt(att);

      const [{ data: q }, { data: qs }, { data: gs }, { data: may }] = await Promise.all([
        supabase
          .from('tutor_quizzes')
          .select('id, title, pass_mark')
          .eq('id', att.quiz_id)
          .maybeSingle(),
        supabase
          .from('tutor_quiz_questions')
          .select(
            'id, question_kind, question_text, options, correct_answer_index, expected_answer, marking_guidance, explanation, points, ac_ref, sort_order, bs7671_citations'
          )
          .eq('quiz_id', att.quiz_id)
          .order('sort_order', { ascending: true, nullsFirst: false }),
        supabase
          .from('tutor_quiz_answer_grades')
          .select(
            'id, question_id, ai_score, ai_rationale, ai_strengths, ai_areas, tutor_override_score, tutor_override_rationale, tutor_override_by, tutor_override_at'
          )
          .eq('attempt_id', attemptId),
        supabase.rpc('_can_manage_tutor_quiz' as never, { p_quiz: att.quiz_id } as never),
      ]);
      setCanMark((may as unknown as boolean | null) !== false);
      setQuiz((q as QuizMeta) ?? null);
      setQuestions((qs ?? []) as QuestionRow[]);
      const map: Record<string, GradeRow> = {};
      for (const row of (gs ?? []) as GradeRow[]) map[row.question_id] = row;
      setGrades(map);
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    if (open && attemptId) void load();
    if (!open) {
      setAttempt(null);
      setQuestions([]);
      setGrades({});
      setQuiz(null);
    }
  }, [open, attemptId, load]);

  const handleRegrade = async () => {
    if (!attempt) return;
    setRegrading(true);
    try {
      const { error } = await supabase.functions.invoke('ai-grade-free-response', {
        body: { attempt_id: attempt.id },
      });
      if (error) throw new Error(error.message);
      toast({
        title: 'Remarked',
        description: 'Written answers marked again and the total re-tallied.',
      });
      await load();
    } catch (e) {
      toast({
        title: 'Could not regrade',
        description: (e as Error).message ?? 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setRegrading(false);
    }
  };

  const pct =
    attempt?.score != null && attempt?.total_points != null && attempt.total_points > 0
      ? Math.round((attempt.score / attempt.total_points) * 100)
      : null;
  const passed = quiz?.pass_mark != null && pct != null ? pct >= quiz.pass_mark : null;

  const [filter, setFilter] = useState<'all' | 'free' | 'wrong'>('all');
  useEffect(() => {
    if (open) setFilter('all');
  }, [open, attemptId]);

  const isFree = (q: QuestionRow) =>
    q.question_kind === 'short_answer' ||
    q.question_kind === 'long_answer' ||
    q.question_kind === 'scenario';
  const verdicts = questions.map((q) => scoreVerdict(q, attempt?.answers?.[q.id], grades[q.id]));
  const count = (v: Verdict) => verdicts.filter((x) => x === v).length;
  const freeCount = questions.filter(isFree).length;
  const wrongCount = count('incorrect') + count('partial') + count('unanswered');
  const shown = questions
    .map((q, i) => ({ q, i, v: verdicts[i] }))
    .filter(({ q, v }) =>
      filter === 'all'
        ? true
        : filter === 'free'
          ? isFree(q)
          : v === 'incorrect' || v === 'partial' || v === 'unanswered'
    );
  const mins =
    attempt?.time_taken_seconds != null && attempt.time_taken_seconds > 0
      ? Math.max(1, Math.round(attempt.time_taken_seconds / 60))
      : null;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
      eyebrow={studentName ? `Attempt review · ${studentName}` : 'Attempt review'}
      title={quiz?.title ?? 'Quiz attempt'}
      description="Check the answers, read the AI marking on written questions and override any score you disagree with. The total re-tallies."
      headerTrailing={
        attemptId ? (
          <PresenceBadges channelKey={`quiz:attempt:${attemptId}`} verb="reviewing" compact />
        ) : undefined
      }
      footer={
        canMark ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Close
            </button>
            <button
              type="button"
              onClick={handleRegrade}
              disabled={regrading}
              className={buttonPrimaryCn}
            >
              {regrading ? (
                'Remarking…'
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  Remark written answers <UsesAi />
                </span>
              )}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            <p className="text-center text-[12px] text-white">
              Read only. The tutor who set this quiz marks it.
            </p>
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Close
            </button>
          </div>
        )
      }
    >
      {loading ? (
        <p className="text-[13px] text-white lg:col-span-2">Loading attempt…</p>
      ) : !attempt || !quiz ? (
        <p className="text-[13px] text-white lg:col-span-2">Attempt not found.</p>
      ) : (
        <>
          {/* ── Summary: the result, then the breakdown ── */}
          <aside className="space-y-5 lg:sticky lg:top-0">
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5">
              <p
                className={cn(
                  'text-[12.5px] font-semibold',
                  passed ? 'text-emerald-300' : passed === false ? 'text-orange-300' : 'text-white'
                )}
              >
                {passed ? 'Passed' : passed === false ? 'Below the pass mark' : 'Submitted'}
              </p>
              <p className="mt-1 text-[40px] font-bold leading-none tabular-nums text-white">
                {pct ?? 0}%
              </p>
              <p className="mt-2 text-[13px] tabular-nums text-white">
                {attempt.score ?? 0} of {attempt.total_points ?? 0} points
                {quiz.pass_mark != null && <> · pass mark {quiz.pass_mark}%</>}
              </p>
              {quiz.pass_mark != null && (
                <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      passed ? 'bg-emerald-400' : 'bg-elec-yellow'
                    )}
                    style={{ width: `${Math.min(100, pct ?? 0)}%` }}
                  />
                  <span
                    aria-hidden
                    className="absolute top-0 h-full w-0.5 bg-white"
                    style={{ left: `${Math.min(100, quiz.pass_mark)}%` }}
                  />
                </div>
              )}
              {(mins != null || attempt.completed_at) && (
                <p className="mt-3 text-[12px] text-white">
                  {attempt.completed_at &&
                    `Submitted ${new Date(attempt.completed_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}`}
                  {attempt.completed_at && mins != null && ' · '}
                  {mins != null && `${mins} min`}
                </p>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-white">
              <Tally label="Correct" n={count('correct')} />
              <Tally label="Part marks" n={count('partial')} />
              <Tally label="Wrong" n={count('incorrect')} />
              <Tally label="Not answered" n={count('unanswered')} />
              {count('pending') > 0 && <Tally label="Being scored" n={count('pending')} warn />}
            </dl>
          </aside>

          {/* ── Questions ── */}
          <section className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={chipCn(filter === 'all')}
              >
                All {questions.length}
              </button>
              {freeCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('free')}
                  className={chipCn(filter === 'free')}
                >
                  Written {freeCount}
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilter('wrong')}
                className={chipCn(filter === 'wrong')}
              >
                Lost marks {wrongCount}
              </button>
            </div>
            {shown.length === 0 ? (
              <p className="text-[13px] text-white">No questions in this group.</p>
            ) : (
              <ol className="space-y-3">
                {shown.map(({ q, i }) => (
                  <li key={q.id}>
                    <QuestionReview
                      q={q}
                      index={i}
                      attemptId={attempt.id}
                      answer={attempt.answers?.[q.id]}
                      grade={grades[q.id]}
                      canMark={canMark}
                      onChanged={load}
                    />
                  </li>
                ))}
              </ol>
            )}
          </section>
        </>
      )}
    </FormSheet>
  );
}

function Tally({ label, n, warn }: { label: string; n: number; warn?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-white/[0.06] pb-2">
      <dt>{label}</dt>
      <dd className={cn('font-semibold tabular-nums', warn && 'text-orange-300')}>{n}</dd>
    </div>
  );
}

/* ────────────────────── per-question ────────────────────── */

function QuestionReview({
  q,
  index,
  attemptId,
  answer,
  grade,
  canMark = true,
  onChanged,
}: {
  q: QuestionRow;
  index: number;
  attemptId: string;
  answer: LearnerAnswer | undefined;
  grade: GradeRow | undefined;
  canMark?: boolean;
  onChanged: () => Promise<void> | void;
}) {
  const { toast } = useToast();
  const isFreeResponse =
    q.question_kind === 'short_answer' ||
    q.question_kind === 'long_answer' ||
    q.question_kind === 'scenario';
  const verdict = scoreVerdict(q, answer, grade);
  const points = q.points ?? 1;

  const [editing, setEditing] = useState(false);
  const [overrideScore, setOverrideScore] = useState<string>(
    grade?.tutor_override_score != null
      ? String(grade.tutor_override_score)
      : grade?.ai_score != null
        ? String(grade.ai_score)
        : ''
  );
  const [overrideRationale, setOverrideRationale] = useState<string>(
    grade?.tutor_override_rationale ?? ''
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setOverrideScore(
      grade?.tutor_override_score != null
        ? String(grade.tutor_override_score)
        : grade?.ai_score != null
          ? String(grade.ai_score)
          : ''
    );
    setOverrideRationale(grade?.tutor_override_rationale ?? '');
  }, [grade?.tutor_override_score, grade?.ai_score, grade?.tutor_override_rationale]);

  const handleSaveOverride = async () => {
    if (!grade) return;
    const num = Number(overrideScore);
    if (!Number.isFinite(num) || num < 0 || num > points) {
      toast({
        title: 'Invalid score',
        description: `Score must be between 0 and ${points}.`,
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData?.user?.id;
      const { data: saved, error } = await supabase
        .from('tutor_quiz_answer_grades')
        .update({
          tutor_override_score: num,
          tutor_override_rationale: overrideRationale.trim() || null,
          tutor_override_by: uid ?? null,
          tutor_override_at: new Date().toISOString(),
        })
        .eq('id', grade.id)
        .select('id');
      if (error) throw new Error(error.message);
      // RLS hides a refused update as zero rows, not an error.
      if (!saved || saved.length === 0)
        throw new Error('Only the tutor who set this quiz can mark it.');
      // Re-tally attempt total via the same edge fn (idempotent — it sees no
      // ungraded rows so it skips OpenAI and just recomputes the score).
      await supabase.functions
        .invoke('ai-grade-free-response', {
          body: { attempt_id: attemptId },
        })
        .catch(() => undefined);
      toast({ title: 'Override saved', description: 'Attempt total re-tallied.' });
      setEditing(false);
      await onChanged();
    } catch (e) {
      toast({
        title: 'Could not save override',
        description: (e as Error).message ?? 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const effective = grade?.tutor_override_score ?? grade?.ai_score;
  return (
    <div className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-4 sm:mx-0 sm:rounded-3xl sm:border-x sm:px-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-white">
            <span className="font-semibold tabular-nums">Question {index + 1}</span>
            {' · '}
            {kindLabel(q.question_kind)}
            {q.ac_ref && <> · AC {q.ac_ref}</>}
          </p>
          <p className="mt-1 text-[14.5px] font-medium leading-snug text-white">
            {q.question_text}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[15px] font-semibold tabular-nums text-white">
            {verdict === 'unanswered' ? '—' : formatScore(q, answer, grade)}
            <span className="font-normal"> / {points}</span>
          </p>
          <p className={cn('text-[12px] font-semibold', VERDICT_TONE[verdict])}>
            {VERDICT_LABEL[verdict]}
          </p>
        </div>
      </div>

      {/* Learner's answer */}
      <div className="mt-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-3.5 py-3">
        <p className="mb-1 text-[12px] font-semibold text-white">Learner's answer</p>
        <LearnerAnswerView q={q} answer={answer} />
      </div>

      {/* AI grade or auto-graded info */}
      {isFreeResponse ? (
        grade && grade.ai_score != null ? (
          <div className="mt-3 border-t border-white/[0.08] pt-3">
            <p className="text-[12px] font-semibold text-white">
              AI marking: {grade.ai_score} / {points}
              {grade.tutor_override_score != null && (
                <span className="ml-1 text-elec-yellow">· your override applies</span>
              )}
            </p>
            {grade.ai_rationale && (
              <p className="mt-1 text-[13px] leading-relaxed text-white">{grade.ai_rationale}</p>
            )}
            {grade.ai_strengths && grade.ai_strengths.length > 0 && (
              <div className="mt-2">
                <p className="text-[12px] font-semibold text-emerald-300">Got right</p>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-[13px] leading-snug text-white">
                  {grade.ai_strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {grade.ai_areas && grade.ai_areas.length > 0 && (
              <div className="mt-2">
                <p className="text-[12px] font-semibold text-orange-300">Missed</p>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-[13px] leading-snug text-white">
                  {grade.ai_areas.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-3 text-[13px] text-white">
            Waiting for marking. Press Remark written answers if it hasn't started.
          </p>
        )
      ) : null}

      {q.explanation && !isFreeResponse && (
        <p className="mt-3 text-[13px] leading-relaxed text-white">
          <span className="font-semibold">Why: </span>
          {q.explanation}
        </p>
      )}

      {q.bs7671_citations && q.bs7671_citations.length > 0 && (
        <div className="mt-3 border-t border-white/[0.08] pt-3">
          <p className="mb-1.5 text-[12px] font-semibold text-white">BS 7671</p>
          <ul className="space-y-2">
            {q.bs7671_citations.map((c, k) => (
              <li key={k} className="break-words border-l-2 border-white/[0.2] pl-3">
                <div className="break-all text-[12px] font-semibold text-white">{c.ref}</div>
                {c.snippet && (
                  <p className="mt-0.5 break-words text-[13px] leading-relaxed text-white">
                    {c.snippet}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tutor override controls (only for free-response with a grade row) */}
      {isFreeResponse && grade && canMark && (
        <div className="mt-3 border-t border-white/[0.08] pt-2">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              {grade.tutor_override_score != null ? 'Edit your override' : 'Override the AI score'}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-[8rem_minmax(0,1fr)] items-end gap-4">
                <div>
                  <label htmlFor={`ov-${q.id}`} className={labelCn}>
                    Score out of {points}
                  </label>
                  <input
                    id={`ov-${q.id}`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={points}
                    step={0.5}
                    value={overrideScore}
                    onChange={(e) => setOverrideScore(e.target.value)}
                    className={cn(inputCn, 'tabular-nums')}
                  />
                </div>
                <p className="pb-3 text-[12px] text-white">
                  {effective != null
                    ? `Currently ${effective} / ${points}`
                    : `Between 0 and ${points}`}
                </p>
              </div>
              <div>
                <label htmlFor={`ovr-${q.id}`} className={labelCn}>
                  Why (optional)
                </label>
                <textarea
                  id={`ovr-${q.id}`}
                  value={overrideRationale}
                  onChange={(e) => setOverrideRationale(e.target.value)}
                  rows={2}
                  placeholder="Why are you overriding the AI?"
                  className={textareaCn}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:max-w-sm">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className={buttonSecondaryCn}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveOverride}
                  disabled={saving}
                  className={buttonPrimaryCn}
                >
                  {saving ? 'Saving…' : 'Save override'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const RIGHT = 'text-emerald-300';
const WRONG = 'text-red-300';

function LearnerAnswerView({ q, answer }: { q: QuestionRow; answer: LearnerAnswer | undefined }) {
  if (answer == null) {
    return <p className="text-[13px] text-white">No answer submitted.</p>;
  }
  if (answer.kind === 'multi_choice') {
    const opt = q.options?.[answer.index];
    const correct = answer.index === q.correct_answer_index;
    const right = q.correct_answer_index != null ? q.options?.[q.correct_answer_index] : null;
    return (
      <div className="space-y-1 text-[13.5px] leading-snug">
        <p className="text-white">
          <span className={cn('font-semibold', correct ? RIGHT : WRONG)}>
            {String.fromCharCode(65 + answer.index)}.
          </span>{' '}
          {opt ?? '—'}{' '}
          <span className={cn('font-semibold', correct ? RIGHT : WRONG)}>
            {correct ? 'Correct' : 'Wrong'}
          </span>
        </p>
        {!correct && right && q.correct_answer_index != null && (
          <p className="text-[12.5px] text-white">
            Answer: {String.fromCharCode(65 + q.correct_answer_index)}. {right}
          </p>
        )}
      </div>
    );
  }
  if (answer.kind === 'true_false') {
    const expectedTrue = q.correct_answer_index === 0;
    const correct = answer.value === expectedTrue;
    return (
      <p className="text-[13.5px] text-white">
        {answer.value ? 'True' : 'False'}{' '}
        <span className={cn('font-semibold', correct ? RIGHT : WRONG)}>
          {correct ? 'Correct' : 'Wrong'}
        </span>
      </p>
    );
  }
  if (answer.kind === 'calculation') {
    const expected = (q.expected_answer ?? {}) as {
      numeric_value?: number;
      tolerance?: number;
      units?: string;
    };
    const correct =
      expected.numeric_value != null &&
      answer.numeric != null &&
      Math.abs(answer.numeric - expected.numeric_value) <= (expected.tolerance ?? 0);
    return (
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className={cn('text-[15px] font-semibold tabular-nums', correct ? RIGHT : WRONG)}>
            {answer.numeric ?? '—'}
            {expected.units ? ` ${expected.units}` : ''}
          </span>
          {expected.numeric_value != null && (
            <span className="text-[12.5px] tabular-nums text-white">
              expected {expected.numeric_value}
              {expected.tolerance ? ` ±${expected.tolerance}` : ''}
              {expected.units ? ` ${expected.units}` : ''}
            </span>
          )}
        </div>
        {answer.working && (
          <div className="whitespace-pre-wrap font-mono text-[12.5px] leading-snug text-white">
            {answer.working}
          </div>
        )}
      </div>
    );
  }
  // Free-response text
  return (
    <div className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">
      {answer.text || 'No answer submitted.'}
    </div>
  );
}

/* ──────────── helpers ──────────── */

type Verdict = 'correct' | 'incorrect' | 'partial' | 'pending' | 'unanswered';

function scoreVerdict(
  q: QuestionRow,
  a: LearnerAnswer | undefined,
  grade: GradeRow | undefined
): Verdict {
  if (a == null) return 'unanswered';
  if (q.question_kind === 'multi_choice' && a.kind === 'multi_choice') {
    return a.index === q.correct_answer_index ? 'correct' : 'incorrect';
  }
  if (q.question_kind === 'true_false' && a.kind === 'true_false') {
    const expectedTrue = q.correct_answer_index === 0;
    return a.value === expectedTrue ? 'correct' : 'incorrect';
  }
  if (q.question_kind === 'calculation' && a.kind === 'calculation') {
    const expected = (q.expected_answer ?? {}) as { numeric_value?: number; tolerance?: number };
    if (expected.numeric_value == null || a.numeric == null) return 'incorrect';
    return Math.abs(a.numeric - expected.numeric_value) <= (expected.tolerance ?? 0)
      ? 'correct'
      : 'incorrect';
  }
  // Free-response
  const points = q.points ?? 1;
  const effective = grade?.tutor_override_score ?? grade?.ai_score;
  if (effective == null) return 'pending';
  if (effective >= points) return 'correct';
  if (effective <= 0) return 'incorrect';
  return 'partial';
}

function formatScore(
  q: QuestionRow,
  a: LearnerAnswer | undefined,
  grade: GradeRow | undefined
): string {
  if (a == null) return '0';
  const points = q.points ?? 1;
  const verdict = scoreVerdict(q, a, grade);
  if (
    q.question_kind === 'multi_choice' ||
    q.question_kind === 'true_false' ||
    q.question_kind === 'calculation'
  ) {
    return verdict === 'correct' ? String(points) : '0';
  }
  const effective = grade?.tutor_override_score ?? grade?.ai_score;
  return effective != null ? String(effective) : '—';
}

const VERDICT_LABEL: Record<Verdict, string> = {
  correct: 'Correct',
  incorrect: 'Wrong',
  partial: 'Part marks',
  pending: 'Being scored',
  unanswered: 'Not answered',
};
const VERDICT_TONE: Record<Verdict, string> = {
  correct: 'text-emerald-300',
  incorrect: 'text-red-300',
  partial: 'text-orange-300',
  pending: 'text-white',
  unanswered: 'text-white',
};

function kindLabel(k: QuestionKind): string {
  switch (k) {
    case 'multi_choice':
      return 'Multi-choice';
    case 'true_false':
      return 'True or false';
    case 'short_answer':
      return 'Short answer';
    case 'long_answer':
      return 'Long answer';
    case 'calculation':
      return 'Calculation';
    case 'scenario':
      return 'Scenario';
    case 'image_annotation':
      return 'Image';
    case 'practical_evidence':
      return 'Practical';
  }
}
