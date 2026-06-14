import { useEffect, useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Brain,
  Check,
  X,
  Target,
  BookOpen,
  Sparkles,
  Loader2,
  Pencil,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PresenceBadges } from '@/components/college/ui/PresenceBadges';

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

      const [{ data: q }, { data: qs }, { data: gs }] = await Promise.all([
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
      ]);
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
      toast({ title: 'Regraded', description: 'AI scores refreshed and attempt total re-tallied.' });
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Attempt review"
          title={quiz?.title ?? 'Quiz attempt'}
          description={
            studentName ? `${studentName} · ${pct ?? 0}%${passed ? ' · passed' : ''}` : null
          }
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1">
                Close
              </SecondaryButton>
              <PrimaryButton onClick={handleRegrade} disabled={regrading} className="flex-1">
                {regrading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                    Regrading…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    AI regrade
                  </>
                )}
              </PrimaryButton>
            </>
          }
        >
          {attemptId && (
            <div className="flex justify-end -mt-1">
              <PresenceBadges
                channelKey={`quiz:attempt:${attemptId}`}
                verb="reviewing"
                compact
              />
            </div>
          )}
          {loading ? (
            <div className="text-[12.5px] text-white">Loading attempt…</div>
          ) : !attempt || !quiz ? (
            <div className="text-[12.5px] text-white">Attempt not found.</div>
          ) : (
            <>
              {/* Total badge */}
              <div
                className={cn(
                  'rounded-2xl border px-4 py-3 flex items-center gap-3',
                  passed
                    ? 'border-emerald-500/[0.30] bg-emerald-500/[0.06]'
                    : pct != null && pct > 0
                      ? 'border-amber-500/[0.30] bg-amber-500/[0.05]'
                      : 'border-white/[0.06] bg-white/[0.02]'
                )}
              >
                <div
                  className={cn(
                    'h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0',
                    passed
                      ? 'bg-emerald-500/[0.18] border border-emerald-400/30'
                      : 'bg-white/[0.06] border border-white/[0.10]'
                  )}
                >
                  <Trophy className={cn('h-6 w-6', passed ? 'text-emerald-300' : 'text-white/65')} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    {passed ? 'Passed' : 'Submitted'}
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-[22px] font-semibold tabular-nums text-white leading-none">
                      {pct ?? 0}%
                    </span>
                    <span className="text-[11px] text-white tabular-nums">
                      {attempt.score ?? 0}/{attempt.total_points ?? 0} pts
                    </span>
                    {quiz.pass_mark != null && (
                      <span className="text-[10.5px] text-white/65">
                        pass mark {quiz.pass_mark}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <ol className="space-y-2.5">
                {questions.map((q, i) => (
                  <li key={q.id}>
                    <QuestionReview
                      q={q}
                      index={i}
                      attemptId={attempt.id}
                      answer={attempt.answers?.[q.id]}
                      grade={grades[q.id]}
                      onChanged={load}
                    />
                  </li>
                ))}
              </ol>
            </>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ────────────────────── per-question ────────────────────── */

function QuestionReview({
  q,
  index,
  attemptId,
  answer,
  grade,
  onChanged,
}: {
  q: QuestionRow;
  index: number;
  attemptId: string;
  answer: LearnerAnswer | undefined;
  grade: GradeRow | undefined;
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
      const { error } = await supabase
        .from('tutor_quiz_answer_grades')
        .update({
          tutor_override_score: num,
          tutor_override_rationale: overrideRationale.trim() || null,
          tutor_override_by: uid ?? null,
          tutor_override_at: new Date().toISOString(),
        })
        .eq('id', grade.id);
      if (error) throw new Error(error.message);
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

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
      <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
        <span className="text-[10px] font-semibold tabular-nums text-white">Q{index + 1}</span>
        <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
          {kindLabel(q.question_kind)}
        </span>
        {q.ac_ref && (
          <span className="inline-flex items-center gap-1 h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200">
            <Target className="h-2.5 w-2.5" />
            {q.ac_ref}
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] tabular-nums text-white">
          <ScoreVerdictPill verdict={verdict} />
          <span>
            {verdict === 'unanswered'
              ? '—'
              : `${formatScore(q, answer, grade)} / ${points}`}
          </span>
        </span>
      </div>

      <div className="text-[12.5px] text-white leading-snug">{q.question_text}</div>

      {/* Learner's answer */}
      <div className="mt-2 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.06] px-3 py-2">
        <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-1">
          Learner answer
        </div>
        <LearnerAnswerView q={q} answer={answer} />
      </div>

      {/* AI grade or auto-graded info */}
      {isFreeResponse ? (
        grade && grade.ai_score != null ? (
          <div className="mt-2 rounded-xl bg-blue-500/[0.05] border border-blue-400/20 px-3 py-2">
            <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-blue-200 mb-1">
              <Brain className="h-3 w-3" />
              AI grade
              {grade.tutor_override_score != null && (
                <span className="ml-1 text-amber-200">· tutor override applied</span>
              )}
            </div>
            <div className="text-[11.5px] text-white/85 leading-snug">{grade.ai_rationale ?? ''}</div>
            {grade.ai_strengths && grade.ai_strengths.length > 0 && (
              <ul className="mt-1.5 space-y-0.5 text-[10.5px] text-emerald-200 leading-snug">
                {grade.ai_strengths.map((s, i) => (
                  <li key={i} className="flex items-baseline gap-1.5">
                    <Check className="h-3 w-3 text-emerald-300 flex-shrink-0" strokeWidth={3} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
            {grade.ai_areas && grade.ai_areas.length > 0 && (
              <ul className="mt-1 space-y-0.5 text-[10.5px] text-amber-200 leading-snug">
                {grade.ai_areas.map((s, i) => (
                  <li key={i} className="flex items-baseline gap-1.5">
                    <span className="h-3 w-3 inline-flex items-center justify-center text-amber-300 flex-shrink-0">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="mt-2 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2 text-[11.5px] text-white">
            Awaiting AI grading. Hit "AI regrade" if it hasn't kicked off.
          </div>
        )
      ) : null}

      {q.explanation && !isFreeResponse && (
        <div className="mt-2 text-[10.5px] text-white/75 leading-snug">
          <span className="text-white/45">Why: </span>
          {q.explanation}
        </div>
      )}

      {q.bs7671_citations && q.bs7671_citations.length > 0 && (
        <div className="mt-2 pt-2 border-t border-white/[0.04]">
          <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/65 mb-1.5">
            BS 7671
          </div>
          <ul className="space-y-2">
            {q.bs7671_citations.map((c, k) => (
              <li key={k} className="border-l-2 border-blue-400/30 pl-2.5 break-words">
                <div className="text-[10px] font-semibold tracking-[0.04em] text-blue-200 break-all">
                  {c.ref}
                </div>
                {c.snippet && (
                  <p className="mt-0.5 text-[11px] text-white/85 leading-relaxed break-words">
                    {c.snippet}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tutor override controls (only for free-response with a grade row) */}
      {isFreeResponse && grade && (
        <div className="mt-2">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-white/85 hover:text-white touch-manipulation"
            >
              <Pencil className="h-3 w-3" />
              {grade.tutor_override_score != null ? 'Edit override' : 'Override AI'}
            </button>
          ) : (
            <div className="rounded-xl bg-[hsl(0_0%_15%)] border border-amber-400/30 px-3 py-2.5 space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/85">
                  Score
                </label>
                <input
                  type="number"
                  min={0}
                  max={points}
                  step={0.5}
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(e.target.value)}
                  className="w-20 h-9 rounded-lg bg-[hsl(0_0%_18%)] border border-white/[0.10] focus:border-elec-yellow text-[13px] tabular-nums text-white px-2 touch-manipulation"
                />
                <span className="text-[10.5px] text-white/65 tabular-nums">/ {points}</span>
              </div>
              <textarea
                value={overrideRationale}
                onChange={(e) => setOverrideRationale(e.target.value)}
                rows={2}
                placeholder="Why are you overriding the AI? (optional)"
                className="w-full rounded-lg bg-[hsl(0_0%_18%)] border border-white/[0.10] focus:border-elec-yellow text-[12px] text-white px-3 py-2 leading-relaxed touch-manipulation resize-y"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="h-9 px-3 rounded-full text-[11.5px] font-semibold text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveOverride}
                  disabled={saving}
                  className="h-9 px-3 rounded-full bg-elec-yellow text-black text-[11.5px] font-semibold hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
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

function LearnerAnswerView({
  q,
  answer,
}: {
  q: QuestionRow;
  answer: LearnerAnswer | undefined;
}) {
  if (answer == null) {
    return <div className="text-[11.5px] text-white/55 italic">No answer submitted.</div>;
  }
  if (answer.kind === 'multi_choice') {
    const opt = q.options?.[answer.index];
    const correct = answer.index === q.correct_answer_index;
    return (
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'text-[11.5px] font-semibold',
            correct ? 'text-emerald-200' : 'text-red-200'
          )}
        >
          {String.fromCharCode(65 + answer.index)}.
        </span>
        <span className="text-[11.5px] text-white leading-snug">{opt ?? '—'}</span>
        {correct ? (
          <Check className="h-3 w-3 text-emerald-300 flex-shrink-0" strokeWidth={3} />
        ) : (
          <X className="h-3 w-3 text-red-300 flex-shrink-0" />
        )}
      </div>
    );
  }
  if (answer.kind === 'true_false') {
    const expectedTrue = q.correct_answer_index === 0;
    const correct = answer.value === expectedTrue;
    return (
      <div className="flex items-baseline gap-2 text-[11.5px]">
        <span className={correct ? 'text-emerald-200' : 'text-red-200'}>
          {answer.value ? 'True' : 'False'}
        </span>
        {correct ? (
          <Check className="h-3 w-3 text-emerald-300 flex-shrink-0" strokeWidth={3} />
        ) : (
          <X className="h-3 w-3 text-red-300 flex-shrink-0" />
        )}
      </div>
    );
  }
  if (answer.kind === 'calculation') {
    const expected = (q.expected_answer ?? {}) as { numeric_value?: number; tolerance?: number; units?: string };
    const correct =
      expected.numeric_value != null &&
      answer.numeric != null &&
      Math.abs(answer.numeric - expected.numeric_value) <= (expected.tolerance ?? 0);
    return (
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'text-[13px] font-semibold tabular-nums',
              correct ? 'text-emerald-200' : 'text-red-200'
            )}
          >
            {answer.numeric ?? '—'}
            {expected.units ? ` ${expected.units}` : ''}
          </span>
          {expected.numeric_value != null && (
            <span className="text-[10.5px] text-white/55 tabular-nums">
              expected {expected.numeric_value}
              {expected.tolerance ? ` ±${expected.tolerance}` : ''}
              {expected.units ? ` ${expected.units}` : ''}
            </span>
          )}
        </div>
        {answer.working && (
          <div className="text-[11px] text-white/85 whitespace-pre-wrap font-mono leading-snug">
            {answer.working}
          </div>
        )}
      </div>
    );
  }
  // Free-response text
  return (
    <div className="text-[12px] text-white whitespace-pre-wrap leading-relaxed">
      {answer.text || <span className="text-white/55 italic">No answer submitted.</span>}
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

function ScoreVerdictPill({ verdict }: { verdict: Verdict }) {
  const cls =
    verdict === 'correct'
      ? 'bg-emerald-500/20 text-emerald-300'
      : verdict === 'partial'
        ? 'bg-amber-500/20 text-amber-300'
        : verdict === 'incorrect'
          ? 'bg-red-500/20 text-red-300'
          : verdict === 'pending'
            ? 'bg-blue-500/20 text-blue-300'
            : 'bg-white/[0.06] text-white/55';
  const sym =
    verdict === 'correct' ? '✓' : verdict === 'incorrect' ? '✗' : verdict === 'partial' ? '½' : verdict === 'pending' ? '…' : '–';
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold flex-shrink-0',
        cls
      )}
    >
      {sym}
    </span>
  );
}

function kindLabel(k: QuestionKind): string {
  switch (k) {
    case 'multi_choice':
      return 'Multi-choice';
    case 'true_false':
      return 'T/F';
    case 'short_answer':
      return 'Short';
    case 'long_answer':
      return 'Long';
    case 'calculation':
      return 'Calc';
    case 'scenario':
      return 'Scenario';
    case 'image_annotation':
      return 'Image';
    case 'practical_evidence':
      return 'Practical';
  }
}
