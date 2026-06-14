import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Wand2, RotateCw, Check, BookOpen, Target, AlertTriangle, Users, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { useAuthorQuiz, type AuthorQuizQuestion, type AuthorQuizInput } from '@/hooks/useAuthorQuiz';
import { useTutorTargets } from '@/hooks/useTutorTargets';

/* ==========================================================================
   CreateQuizSheet — tutor authors a quiz/assessment.
   Three intake modes: from-AC, from-topic, learner-targeted.
   AI generates → tutor reviews each question with its BS 7671 citation
   and AC mapping → save → publish.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When opened from a Student 360 page — targets that learner. */
  collegeStudentId?: string | null;
  /** When opened from cohort context. */
  cohortId?: string | null;
  /** When opened with a specific AC pre-selected (from AC coverage cell). */
  initialAcCodes?: string[];
  studentName?: string;
  onSaved?: (quizId: string) => void;
}

const DIFFICULTY: { value: 'easy' | 'medium' | 'hard'; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export function CreateQuizSheet({
  open,
  onOpenChange,
  collegeStudentId,
  cohortId,
  initialAcCodes,
  studentName,
  onSaved,
}: Props) {
  const ai = useAuthorQuiz();
  const { toast } = useToast();
  const { cohorts, lessonPlans } = useTutorTargets();
  const autoStartedRef = useRef(false);

  // Targeting — default to the prop-provided learner if any; else "cohort"
  type TargetMode = 'learner' | 'cohort';
  const [targetMode, setTargetMode] = useState<TargetMode>(
    collegeStudentId ? 'learner' : cohortId ? 'cohort' : 'learner'
  );
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(cohortId ?? null);
  const [selectedLessonPlanId, setSelectedLessonPlanId] = useState<string | null>(null);

  // Form state
  const [topic, setTopic] = useState('');
  const [acCodes, setAcCodes] = useState<string>(initialAcCodes?.join(', ') ?? '');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [title, setTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(15);
  const [passMark, setPassMark] = useState(60);
  const [isHomework, setIsHomework] = useState(false);
  const [dueDate, setDueDate] = useState('');

  // Reset on open
  useEffect(() => {
    if (open) {
      setTopic('');
      setAcCodes(initialAcCodes?.join(', ') ?? '');
      setCount(5);
      setDifficulty('medium');
      setTitle('');
      setTimeLimit(15);
      setPassMark(60);
      setIsHomework(false);
      setDueDate('');
      setTargetMode(collegeStudentId ? 'learner' : cohortId ? 'cohort' : 'learner');
      setSelectedCohortId(cohortId ?? null);
      setSelectedLessonPlanId(null);
      autoStartedRef.current = false;
      ai.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialAcCodes?.join(',')]);

  // If we open with a pre-selected AC, generate immediately
  useEffect(() => {
    if (
      open &&
      !autoStartedRef.current &&
      initialAcCodes &&
      initialAcCodes.length > 0 &&
      ai.status === 'idle'
    ) {
      autoStartedRef.current = true;
      void ai.author({
        college_student_id:
          targetMode === 'learner' ? collegeStudentId ?? undefined : undefined,
        cohort_id: targetMode === 'cohort' ? selectedCohortId ?? undefined : undefined,
        ac_codes: initialAcCodes,
        difficulty: 'medium',
        count: 5,
        lesson_plan_id: selectedLessonPlanId ?? undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleGenerate = async () => {
    const acList = acCodes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const input: AuthorQuizInput = {
      college_student_id:
        targetMode === 'learner' ? collegeStudentId ?? undefined : undefined,
      cohort_id: targetMode === 'cohort' ? selectedCohortId ?? undefined : undefined,
      ac_codes: acList.length > 0 ? acList : undefined,
      topic: !acList.length && topic.trim() ? topic.trim() : undefined,
      difficulty,
      count,
      title: title.trim() || undefined,
      time_limit_minutes: timeLimit,
      pass_mark: passMark,
      is_homework: isHomework,
      due_date: dueDate || undefined,
      lesson_plan_id: selectedLessonPlanId ?? undefined,
      publish: true,
    };
    await ai.author(input);
  };

  const handleSave = () => {
    if (!ai.result) return;
    toast({
      title: 'Quiz published',
      description: `${ai.result.quiz.title} · ${ai.result.questions_count} questions · ${ai.result.citations_count} BS 7671 citations`,
    });
    onSaved?.(ai.result.quiz_id);
    onOpenChange(false);
  };

  const targetLabel =
    collegeStudentId && studentName
      ? `for ${studentName.split(' ')[0]}`
      : cohortId
        ? 'for cohort'
        : 'free-form';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[94vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="AI quiz authoring"
          title={`Create quiz ${targetLabel}`}
          description="Citation-grade questions drawn from BS 7671 and the qualification's ACs. Review every question, edit if needed, then publish."
          footer={
            ai.status === 'done' && ai.result ? (
              <>
                <SecondaryButton onClick={() => ai.reset()} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Regenerate
                </SecondaryButton>
                <PrimaryButton onClick={handleSave} fullWidth>
                  <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                  Publish quiz
                </PrimaryButton>
              </>
            ) : ai.status === 'loading' ? (
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
            ) : ai.status === 'error' ? (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleGenerate} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Retry
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleGenerate} fullWidth>
                  <Wand2 className="h-3.5 w-3.5 mr-1.5" strokeWidth={2.5} />
                  Generate
                </PrimaryButton>
              </>
            )
          }
        >
          {ai.status === 'idle' && (
            <ConfigForm
              topic={topic} setTopic={setTopic}
              acCodes={acCodes} setAcCodes={setAcCodes}
              count={count} setCount={setCount}
              difficulty={difficulty} setDifficulty={setDifficulty}
              title={title} setTitle={setTitle}
              timeLimit={timeLimit} setTimeLimit={setTimeLimit}
              passMark={passMark} setPassMark={setPassMark}
              isHomework={isHomework} setIsHomework={setIsHomework}
              dueDate={dueDate} setDueDate={setDueDate}
              targetMode={targetMode} setTargetMode={setTargetMode}
              cohorts={cohorts}
              selectedCohortId={selectedCohortId} setSelectedCohortId={setSelectedCohortId}
              lessonPlans={lessonPlans}
              selectedLessonPlanId={selectedLessonPlanId} setSelectedLessonPlanId={setSelectedLessonPlanId}
              learnerName={collegeStudentId ? studentName : null}
            />
          )}
          {ai.status === 'loading' && <LoadingState count={count} />}
          {ai.status === 'error' && <ErrorState message={ai.error} />}
          {ai.status === 'done' && ai.result && <PreviewState result={ai.result} />}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ────────────────────────────────────────────────────────
   Config form
   ──────────────────────────────────────────────────────── */

function ConfigForm({
  topic, setTopic,
  acCodes, setAcCodes,
  count, setCount,
  difficulty, setDifficulty,
  title, setTitle,
  timeLimit, setTimeLimit,
  passMark, setPassMark,
  isHomework, setIsHomework,
  dueDate, setDueDate,
  targetMode, setTargetMode,
  cohorts,
  selectedCohortId, setSelectedCohortId,
  lessonPlans,
  selectedLessonPlanId, setSelectedLessonPlanId,
  learnerName,
}: {
  topic: string; setTopic: (s: string) => void;
  acCodes: string; setAcCodes: (s: string) => void;
  count: number; setCount: (n: number) => void;
  difficulty: 'easy' | 'medium' | 'hard'; setDifficulty: (d: 'easy' | 'medium' | 'hard') => void;
  title: string; setTitle: (s: string) => void;
  timeLimit: number; setTimeLimit: (n: number) => void;
  passMark: number; setPassMark: (n: number) => void;
  isHomework: boolean; setIsHomework: (b: boolean) => void;
  dueDate: string; setDueDate: (s: string) => void;
  targetMode: 'learner' | 'cohort';
  setTargetMode: (m: 'learner' | 'cohort') => void;
  cohorts: Array<{ id: string; name: string; course_name: string | null; member_count: number }>;
  selectedCohortId: string | null;
  setSelectedCohortId: (id: string | null) => void;
  lessonPlans: Array<{ id: string; title: string; cohort_id: string | null }>;
  selectedLessonPlanId: string | null;
  setSelectedLessonPlanId: (id: string | null) => void;
  learnerName?: string | null;
}) {
  const filteredLessons = selectedCohortId
    ? lessonPlans.filter((l) => l.cohort_id === selectedCohortId || l.cohort_id == null)
    : lessonPlans;
  // Sticky context summary so the user always sees who/what they're sending
  const targetSummary = (() => {
    if (targetMode === 'cohort') {
      const cohort = cohorts.find((c) => c.id === selectedCohortId);
      if (cohort) return `Cohort · ${cohort.name} (${cohort.member_count})`;
      return 'Cohort · pick one';
    }
    if (learnerName) return `For ${learnerName.split(' ')[0]}`;
    return 'No target picked';
  })();

  return (
    <div className="space-y-4">
      {/* Sticky context strip — pinned while form scrolls */}
      <div className="sticky -top-5 -mx-5 px-5 py-2 bg-[hsl(0_0%_8%)]/95 backdrop-blur-md border-b border-white/[0.06] z-10 -mt-5 mb-1">
        <div className="flex items-center gap-2 flex-wrap text-[10.5px] tabular-nums">
          <span className="inline-flex items-center gap-1 h-5 px-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white">
            {targetMode === 'cohort' ? <Users className="h-3 w-3" /> : <User className="h-3 w-3" />}
            {targetSummary}
          </span>
          <span className="inline-flex items-center h-5 px-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white">
            {count} questions · {difficulty}
          </span>
          {timeLimit > 0 && (
            <span className="inline-flex items-center h-5 px-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white">
              {timeLimit}m · {passMark}% pass
            </span>
          )}
          {isHomework && (
            <span className="inline-flex items-center h-5 px-2 rounded-full bg-purple-500/[0.10] border border-purple-400/30 text-purple-200">
              Homework
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-elec-yellow/[0.18] bg-elec-yellow/[0.04] px-5 py-4 flex items-start gap-3">
        <Wand2 className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-white leading-snug">
          Describe what to cover. AI pulls from BS 7671 + the qualification ACs and produces traceable questions every learner can trust.
        </p>
      </div>

      {/* Targeting */}
      <Field label="Send to">
        <div className="grid grid-cols-2 gap-1.5">
          {(['learner', 'cohort'] as const).map((mode) => {
            const disabled = mode === 'learner' && !learnerName;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => !disabled && setTargetMode(mode)}
                disabled={disabled}
                className={cn(
                  'rounded-xl border px-3 py-2.5 text-left transition-colors touch-manipulation',
                  disabled && 'opacity-40 cursor-not-allowed',
                  targetMode === mode
                    ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                    : 'bg-[hsl(0_0%_15%)] border-white/[0.10] hover:bg-white/[0.04]'
                )}
              >
                <div className="flex items-center gap-1.5">
                  {mode === 'learner' ? (
                    <User className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <Users className="h-3.5 w-3.5 text-white" />
                  )}
                  <span className="text-[12.5px] font-semibold text-white">
                    {mode === 'learner' ? (learnerName ?? 'Single learner') : 'Whole cohort'}
                  </span>
                </div>
                <div className="mt-0.5 text-[10.5px] text-white/85 leading-snug">
                  {mode === 'learner'
                    ? learnerName
                      ? `Visible only to ${learnerName.split(' ')[0]}.`
                      : 'Open from a Student 360 page.'
                    : 'Visible to every active member of the cohort.'}
                </div>
              </button>
            );
          })}
        </div>
      </Field>

      {targetMode === 'cohort' && (
        <Field label="Cohort">
          {cohorts.length === 0 ? (
            <div className="rounded-xl border border-white/[0.10] bg-[hsl(0_0%_15%)] px-3 py-3 text-[12px] text-white">
              No cohorts in your college yet. Create one in your settings, then come back.
            </div>
          ) : (
            <select
              value={selectedCohortId ?? ''}
              onChange={(e) => setSelectedCohortId(e.target.value || null)}
              className={inputCls}
            >
              <option value="">Choose cohort…</option>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                  {c.course_name ? ` · ${c.course_name}` : ''}
                  {' '}({c.member_count} active)
                </option>
              ))}
            </select>
          )}
        </Field>
      )}

      <Field
        label="Link to lesson plan (optional)"
        hint="Tells the AI which lesson the questions back up. Helps if you want a quiz that mirrors what you taught."
      >
        <select
          value={selectedLessonPlanId ?? ''}
          onChange={(e) => setSelectedLessonPlanId(e.target.value || null)}
          className={inputCls}
        >
          <option value="">No lesson plan</option>
          {filteredLessons.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Title (optional — AI fills if blank)">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Inspection & testing — knowledge check"
          className={inputCls}
        />
      </Field>

      <Field
        label="AC codes (comma-separated, optional)"
        hint="When set, every question maps to one of these ACs. Leave blank to use topic instead."
      >
        <input
          type="text"
          value={acCodes}
          onChange={(e) => setAcCodes(e.target.value)}
          placeholder="e.g. 3.1, 3.4, 4.2"
          className={inputCls}
        />
      </Field>

      <Field label="Topic (used when no AC codes)">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Earthing & bonding for domestic installations"
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Number of questions">
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className={inputCls}
          >
            {[3, 5, 8, 10, 12, 15].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </Field>
        <Field label="Difficulty">
          <div className="mt-1 grid grid-cols-3 gap-1.5">
            {DIFFICULTY.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDifficulty(d.value)}
                className={cn(
                  'h-12 sm:h-11 rounded-lg border text-[12px] sm:text-[11.5px] font-semibold transition-colors touch-manipulation',
                  difficulty === d.value
                    ? 'bg-elec-yellow/[0.14] border-elec-yellow/40 text-elec-yellow'
                    : 'bg-[hsl(0_0%_12%)] border-white/[0.10] text-white hover:bg-white/[0.04]'
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Time limit (minutes)">
          <input
            type="number"
            min={2}
            max={120}
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className={inputCls}
          />
        </Field>
        <Field label="Pass mark (%)">
          <input
            type="number"
            min={0}
            max={100}
            value={passMark}
            onChange={(e) => setPassMark(Number(e.target.value))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
        <label className="flex items-start gap-3 cursor-pointer touch-manipulation">
          <input
            type="checkbox"
            checked={isHomework}
            onChange={(e) => setIsHomework(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/[0.04] text-elec-yellow focus:ring-elec-yellow/40"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium text-white">Set as homework</div>
            <p className="mt-0.5 text-[11.5px] text-white leading-snug">
              The assigned learner gets a notification and the quiz appears in their app with a deadline.
            </p>
          </div>
        </label>
        {isHomework && (
          <div className="mt-3 pl-7">
            <Field label="Due date">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Loading state
   ──────────────────────────────────────────────────────── */

function LoadingState({ count }: { count: number }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-elec-yellow/[0.20] bg-elec-yellow/[0.04] px-5 py-5 relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent"
          style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
        />
        <style>{`@keyframes shimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }`}</style>
        <div className="flex items-center gap-3">
          <Wand2 className="h-5 w-5 text-elec-yellow" />
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Authoring quiz
            </div>
            <p className="mt-0.5 text-[12px] text-white leading-snug">
              Pulling BS 7671 facets, mapping to ACs, drafting {count} citation-grade questions…
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2.5 animate-pulse">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.04] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="h-2.5 w-1/4 rounded bg-white/[0.06]" />
            <div className="mt-2.5 h-2 w-3/4 rounded bg-white/[0.04]" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Error state
   ──────────────────────────────────────────────────────── */

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="rounded-2xl border border-red-500/[0.20] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-red-500/15 flex-shrink-0">
        <AlertTriangle className="h-5 w-5 text-red-300" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
          Could not author quiz
        </div>
        <p className="mt-1 text-[12.5px] text-white leading-relaxed">
          {message ?? 'Try again in a moment.'}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Preview state — review each question
   ──────────────────────────────────────────────────────── */

function PreviewState({ result }: { result: NonNullable<ReturnType<typeof useAuthorQuiz>['result']> }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-emerald-500/[0.18] bg-emerald-500/[0.04] px-5 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Check className="h-4 w-4 text-emerald-300" strokeWidth={3} />
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Quiz drafted
          </div>
        </div>
        <h3 className="text-[16px] font-semibold text-white leading-tight">{result.quiz.title}</h3>
        <p className="mt-1 text-[12px] text-white leading-relaxed">{result.quiz.description}</p>
        <div className="mt-3 flex items-center gap-3 text-[11px] text-white tabular-nums">
          <span>{result.questions_count} questions</span>
          <span className="opacity-50">·</span>
          <span>{result.citations_count} BS 7671 citations</span>
          <span className="opacity-50">·</span>
          <span>{result.quiz.time_limit_minutes}m limit</span>
          <span className="opacity-50">·</span>
          <span>{result.quiz.pass_mark}% to pass</span>
        </div>
      </div>

      <ol className="space-y-3">
        {result.questions.map((q, i) => (
          <QuestionCard key={i} index={i + 1} q={q} />
        ))}
      </ol>
    </div>
  );
}

function QuestionCard({ index, q }: { index: number; q: AuthorQuizQuestion }) {
  return (
    <li className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white tabular-nums">
          Q{index}
        </span>
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
        {q.ac_ref && (
          <span className="inline-flex items-center gap-1 h-5 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200">
            <Target className="h-2.5 w-2.5" /> AC {q.ac_ref}
          </span>
        )}
        {q.points && q.points > 1 && (
          <span className="text-[10px] text-white tabular-nums">{q.points} pts</span>
        )}
      </div>

      <p className="mt-2 text-[13.5px] text-white leading-snug">{q.question_text}</p>

      <ul className="mt-3 space-y-1.5">
        {q.options.map((opt, j) => (
          <li
            key={j}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] leading-snug',
              j === q.correct_answer_index
                ? 'bg-emerald-500/[0.08] border border-emerald-400/30 text-emerald-100'
                : 'bg-white/[0.02] border border-white/[0.06] text-white'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center justify-center h-5 w-5 rounded-full border text-[10px] font-bold tabular-nums flex-shrink-0',
                j === q.correct_answer_index
                  ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100'
                  : 'border-white/20 text-white'
              )}
            >
              {String.fromCharCode(65 + j)}
            </span>
            <span className="min-w-0 flex-1">{opt}</span>
            {j === q.correct_answer_index && <Check className="h-3.5 w-3.5 text-emerald-300 flex-shrink-0" strokeWidth={3} />}
          </li>
        ))}
      </ul>

      {q.explanation && (
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white mb-1">
            Why
          </div>
          <p className="text-[11.5px] text-white leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {q.bs7671_citations && q.bs7671_citations.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white mb-1.5">
            <BookOpen className="h-3 w-3" />
            BS 7671
          </div>
          <ul className="space-y-1.5">
            {q.bs7671_citations.map((c, k) => (
              <li key={k} className="flex items-baseline gap-2">
                <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200 flex-shrink-0">
                  {c.ref}
                </span>
                {c.snippet && <span className="text-[11px] text-white leading-snug">{c.snippet}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/* ────────────────────────────────────────────────────────
   Form helpers
   ──────────────────────────────────────────────────────── */

const inputCls =
  'mt-1 w-full h-12 sm:h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[14px] sm:text-[13px] text-white px-3 touch-manipulation';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-[10.5px] text-white">{hint}</p>}
      {children}
    </div>
  );
}

