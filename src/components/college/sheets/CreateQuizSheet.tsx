import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { CHOICE_OFF, CHOICE_ON } from '@/components/college/teaching/TeachingKit';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkRowCn,
  chipBase,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { choiceCn } from '@/components/college/teaching/TeachingKit';
import { AiMarker } from '@/components/college/teaching/TeachingKit';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  useAuthorQuiz,
  type AuthorQuizQuestion,
  type AuthorQuizInput,
} from '@/hooks/useAuthorQuiz';
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
  /** ELE-1890: opened after a lesson's register — the quiz is linked to that lesson. */
  lessonPlanId?: string | null;
  /** Prefills the topic (e.g. the lesson title). Does not start generating. */
  initialTopic?: string;
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
  lessonPlanId,
  initialTopic,
  onSaved,
}: Props) {
  const ai = useAuthorQuiz();
  const { toast } = useToast();
  const { cohorts, lessonPlans } = useTutorTargets();
  const autoStartedRef = useRef(false);
  const [publishing, setPublishing] = useState(false);

  // Targeting — default to the prop-provided learner if any; else "cohort"
  type TargetMode = 'learner' | 'cohort';
  const [targetMode, setTargetMode] = useState<TargetMode>(collegeStudentId ? 'learner' : 'cohort');
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(cohortId ?? null);
  const [selectedLessonPlanId, setSelectedLessonPlanId] = useState<string | null>(
    lessonPlanId ?? null
  );

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
      setTopic(initialTopic ?? '');
      setAcCodes(initialAcCodes?.join(', ') ?? '');
      setCount(5);
      setDifficulty('medium');
      setTitle('');
      setTimeLimit(15);
      setPassMark(60);
      setIsHomework(false);
      setDueDate('');
      setTargetMode(collegeStudentId ? 'learner' : 'cohort');
      setSelectedCohortId(cohortId ?? null);
      setSelectedLessonPlanId(lessonPlanId ?? null);
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
        college_student_id: targetMode === 'learner' ? (collegeStudentId ?? undefined) : undefined,
        cohort_id: targetMode === 'cohort' ? (selectedCohortId ?? undefined) : undefined,
        ac_codes: initialAcCodes,
        difficulty: 'medium',
        count: 5,
        lesson_plan_id: selectedLessonPlanId ?? undefined,
        // Saved as a draft; it only goes live when the tutor taps Publish.
        publish: false,
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
      college_student_id: targetMode === 'learner' ? (collegeStudentId ?? undefined) : undefined,
      cohort_id: targetMode === 'cohort' ? (selectedCohortId ?? undefined) : undefined,
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
      // Generate as a DRAFT (is_published false, no push to learners). It only
      // goes live when the tutor reviews it and taps Publish (handleSave).
      publish: false,
    };
    await ai.author(input);
  };

  const handleSave = async () => {
    if (!ai.result || publishing) return;
    const result = ai.result;
    setPublishing(true);
    try {
      // ai-author-quiz was called with publish: false, so the quiz is a draft
      // until now. Publishing it is all the client does: the database trigger
      // trg_tutor_quiz_notify_set (ELE-1895) sends each learner a push and a
      // bell item, deep-linked to the quiz, whichever screen published it.
      const { error: updErr } = await supabase
        .from('tutor_quizzes')
        .update({ is_published: true, published_at: new Date().toISOString() })
        .eq('id', result.quiz_id);
      if (updErr) throw new Error(updErr.message);

      toast({
        title: 'Quiz published',
        description: `${result.quiz.title} · ${result.questions_count} questions · ${result.citations_count} BS 7671 citations`,
      });
      onSaved?.(result.quiz_id);
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not publish',
        description: `${(e as Error).message ?? 'Try again.'} The quiz is saved as a draft in Quizzes.`,
        variant: 'destructive',
      });
    } finally {
      setPublishing(false);
    }
  };

  // Says what the sheet does: an AI model drafts the questions, the tutor
  // checks and publishes them (8 Oct 2026; was "Create quiz free-form").
  const targetLabel =
    collegeStudentId && studentName
      ? ` for ${studentName.split(' ')[0]}`
      : cohortId
        ? ' for a cohort'
        : '';

  const footer =
    ai.status === 'done' && ai.result ? (
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => ai.reset()}
          disabled={publishing}
          className={buttonSecondaryCn}
        >
          Regenerate
        </button>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={publishing}
          className={buttonPrimaryCn}
        >
          {publishing ? 'Publishing…' : 'Publish quiz'}
        </button>
      </div>
    ) : ai.status === 'loading' ? (
      <div className="grid grid-cols-1 gap-2.5">
        <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
          Cancel
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
          Cancel
        </button>
        <button type="button" onClick={handleGenerate} className={buttonPrimaryCn}>
          {ai.status === 'error' ? 'Try again' : 'Draft the questions'}
        </button>
      </div>
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="New quiz"
      title={
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{`Draft a quiz${targetLabel}`}</span>
          <AiMarker />
        </span>
      }
      description={
        ai.status === 'done' && ai.result
          ? 'Saved as a draft learners cannot see. Review every question, then publish. If you regenerate or close, this one stays in Quizzes as an unpublished draft.'
          : "An AI model drafts the questions from BS 7671 and the qualification's criteria, each with its citation. It is saved as a draft; nothing reaches learners until you check it and publish."
      }
      bodyClassName={
        ai.status === 'idle'
          ? 'grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'
          : 'space-y-5'
      }
      footer={footer}
    >
      {ai.status === 'idle' && (
        <ConfigForm
          topic={topic}
          setTopic={setTopic}
          acCodes={acCodes}
          setAcCodes={setAcCodes}
          count={count}
          setCount={setCount}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          title={title}
          setTitle={setTitle}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          passMark={passMark}
          setPassMark={setPassMark}
          isHomework={isHomework}
          setIsHomework={setIsHomework}
          dueDate={dueDate}
          setDueDate={setDueDate}
          targetMode={targetMode}
          setTargetMode={setTargetMode}
          cohorts={cohorts}
          selectedCohortId={selectedCohortId}
          setSelectedCohortId={setSelectedCohortId}
          lessonPlans={lessonPlans}
          selectedLessonPlanId={selectedLessonPlanId}
          setSelectedLessonPlanId={setSelectedLessonPlanId}
          learnerName={collegeStudentId ? studentName : null}
        />
      )}
      {ai.status === 'loading' && <LoadingState count={count} />}
      {ai.status === 'error' && <ErrorState message={ai.error} />}
      {ai.status === 'done' && ai.result && <PreviewState result={ai.result} />}
    </FormSheet>
  );
}

/* ────────────────────────────────────────────────────────
   Config form
   ──────────────────────────────────────────────────────── */

const COUNTS = [3, 5, 8, 10, 12, 15];
const NO_LESSON = '__none__';

function ConfigForm({
  topic,
  setTopic,
  acCodes,
  setAcCodes,
  count,
  setCount,
  difficulty,
  setDifficulty,
  title,
  setTitle,
  timeLimit,
  setTimeLimit,
  passMark,
  setPassMark,
  isHomework,
  setIsHomework,
  dueDate,
  setDueDate,
  targetMode,
  setTargetMode,
  cohorts,
  selectedCohortId,
  setSelectedCohortId,
  lessonPlans,
  selectedLessonPlanId,
  setSelectedLessonPlanId,
  learnerName,
}: {
  topic: string;
  setTopic: (s: string) => void;
  acCodes: string;
  setAcCodes: (s: string) => void;
  count: number;
  setCount: (n: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (d: 'easy' | 'medium' | 'hard') => void;
  title: string;
  setTitle: (s: string) => void;
  timeLimit: number;
  setTimeLimit: (n: number) => void;
  passMark: number;
  setPassMark: (n: number) => void;
  isHomework: boolean;
  setIsHomework: (b: boolean) => void;
  dueDate: string;
  setDueDate: (s: string) => void;
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
  const targetSummary = (() => {
    if (targetMode === 'cohort') {
      const cohort = cohorts.find((c) => c.id === selectedCohortId);
      if (cohort) return `${cohort.name} (${cohort.member_count} active)`;
      return 'Whole cohort, none picked yet';
    }
    if (learnerName) return learnerName;
    return 'No learner picked';
  })();
  const lessonTitle = lessonPlans.find((l) => l.id === selectedLessonPlanId)?.title ?? null;

  return (
    <>
      <div className="min-w-0 space-y-6">
        {/* Who it goes to */}
        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Who it goes to</h3>
          <div>
            <p className={labelCn}>Send to</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {(['learner', 'cohort'] as const).map((mode) => {
                const disabled = mode === 'learner' && !learnerName;
                const on = targetMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={on}
                    onClick={() => !disabled && setTargetMode(mode)}
                    disabled={disabled}
                    className={cn(
                      'rounded-xl border px-3.5 py-3 text-left transition-colors touch-manipulation',
                      disabled && 'cursor-not-allowed opacity-40',
                      on ? CHOICE_ON : CHOICE_OFF
                    )}
                  >
                    <span className="block text-[13.5px] font-semibold">
                      {mode === 'learner' ? (learnerName ?? 'Single learner') : 'Whole cohort'}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 block text-[12px] font-normal leading-snug',
                        on ? 'text-black' : 'text-white'
                      )}
                    >
                      {mode === 'learner'
                        ? learnerName
                          ? `Only ${learnerName.split(' ')[0]} sees it.`
                          : 'Open from a Student 360 page.'
                        : 'Every active member of the cohort sees it.'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {targetMode === 'cohort' && (
            <div>
              <p className={labelCn}>Cohort</p>
              {cohorts.length === 0 ? (
                <p className="text-[13px] text-white">
                  No cohorts in your college yet. Create one in your settings, then come back.
                </p>
              ) : cohorts.length <= 6 ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {cohorts.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={selectedCohortId === c.id}
                      className={cn(choiceCn(selectedCohortId === c.id), 'h-11')}
                      onClick={() => setSelectedCohortId(c.id)}
                    >
                      {c.name} ({c.member_count})
                    </button>
                  ))}
                </div>
              ) : (
                <MobileSelectPicker
                  triggerClassName={selectTriggerCn}
                  value={selectedCohortId ?? ''}
                  onValueChange={(v) => setSelectedCohortId(v || null)}
                  title="Cohort"
                  placeholder="Choose a cohort"
                  options={cohorts.map((c) => ({
                    value: c.id,
                    label: `${c.name}${c.course_name ? ` · ${c.course_name}` : ''} (${c.member_count} active)`,
                  }))}
                />
              )}
            </div>
          )}

          <div>
            <p className={labelCn}>Link to lesson plan (optional)</p>
            <MobileSelectPicker
              triggerClassName={selectTriggerCn}
              value={selectedLessonPlanId ?? NO_LESSON}
              onValueChange={(v) => setSelectedLessonPlanId(v && v !== NO_LESSON ? v : null)}
              title="Lesson plan"
              placeholder="No lesson plan"
              options={[
                { value: NO_LESSON, label: 'No lesson plan' },
                ...filteredLessons.map((l) => ({ value: l.id, label: l.title })),
              ]}
            />
            <p className="mt-1.5 text-[12px] leading-snug text-white">
              Tells the AI which lesson the questions back up, so the quiz mirrors what you taught.
            </p>
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        {/* What it covers */}
        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">What it covers</h3>
          <div>
            <label className={labelCn} htmlFor="cq-title">
              Title (optional, the AI fills it if blank)
            </label>
            <input
              id="cq-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Inspection & testing knowledge check"
              className={inputCn}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <label className={labelCn} htmlFor="cq-ac">
                AC codes (comma separated, optional)
              </label>
              <input
                id="cq-ac"
                type="text"
                value={acCodes}
                onChange={(e) => setAcCodes(e.target.value)}
                placeholder="e.g. 3.1, 3.4, 4.2"
                className={inputCn}
              />
              <p className="mt-1.5 text-[12px] leading-snug text-white">
                When set, every question maps to one of these ACs.
              </p>
            </div>
            <div>
              <label className={labelCn} htmlFor="cq-topic">
                Topic (used when no AC codes)
              </label>
              <input
                id="cq-topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Earthing & bonding for domestic installations"
                className={inputCn}
              />
            </div>
          </div>
        </section>

        <div className="h-px bg-white/[0.08]" />

        {/* How it runs */}
        <section className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">How it runs</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <p className={labelCn}>Number of questions</p>
              <div className="mt-1 grid grid-cols-6 gap-1.5">
                {COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={count === n}
                    onClick={() => setCount(n)}
                    className={cn(chipBase, count === n ? CHOICE_ON : CHOICE_OFF, 'tabular-nums')}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className={labelCn}>Difficulty</p>
              <div className="mt-1 grid grid-cols-3 gap-1.5">
                {DIFFICULTY.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    aria-pressed={difficulty === d.value}
                    onClick={() => setDifficulty(d.value)}
                    className={cn(chipBase, difficulty === d.value ? CHOICE_ON : CHOICE_OFF)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCn} htmlFor="cq-time">
                Time limit (minutes)
              </label>
              <input
                id="cq-time"
                type="number"
                inputMode="numeric"
                min={2}
                max={120}
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="cq-pass">
                Pass mark (%)
              </label>
              <input
                id="cq-pass"
                type="number"
                inputMode="numeric"
                min={0}
                max={100}
                value={passMark}
                onChange={(e) => setPassMark(Number(e.target.value))}
                className={inputCn}
              />
            </div>
          </div>

          <label className={cn(checkRowCn, 'items-start')} htmlFor="cq-homework">
            <input
              id="cq-homework"
              type="checkbox"
              checked={isHomework}
              onChange={(e) => setIsHomework(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[hsl(var(--elec-yellow))]"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium text-white">Set as homework</span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                The learner gets a notification and the quiz appears in their app with a deadline.
              </span>
            </span>
          </label>
          {isHomework && (
            <div className="sm:max-w-xs">
              <label className={labelCn} htmlFor="cq-due">
                Due date
              </label>
              <input
                id="cq-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputCn}
              />
            </div>
          )}
        </section>
      </div>

      <aside className="min-w-0 space-y-3 border-t border-white/[0.08] pt-5 text-[13px] leading-relaxed text-white lg:sticky lg:top-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <h3 className="text-[15px] font-semibold text-white">This quiz</h3>
        <dl className="divide-y divide-white/[0.08]">
          <SummaryRow label="Goes to" value={targetSummary} />
          <SummaryRow label="Questions" value={`${count} · ${difficulty}`} />
          <SummaryRow
            label="Time and pass"
            value={
              timeLimit > 0 ? `${timeLimit} min · ${passMark}% to pass` : `${passMark}% to pass`
            }
          />
          <SummaryRow label="Lesson" value={lessonTitle ?? 'None'} />
          <SummaryRow
            label="Homework"
            value={isHomework ? (dueDate ? `Due ${dueDate}` : 'Yes, no due date') : 'No'}
          />
        </dl>
        <p>
          The AI pulls from BS 7671 and the qualification ACs. Every question comes back with its
          citation and AC so you can check it before it reaches a learner.
        </p>
      </aside>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-white">{label}</dt>
      <dd className="min-w-0 truncate text-right font-medium text-white">{value}</dd>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Loading state
   ──────────────────────────────────────────────────────── */

function LoadingState({ count }: { count: number }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[15px] font-semibold text-white">Writing the quiz</h3>
        <p className="mt-1 text-[13px] leading-snug text-white">
          Pulling BS 7671 facets, mapping to ACs and drafting {count} questions with citations…
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 animate-pulse lg:grid-cols-2">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
            <div className="h-2.5 w-1/4 rounded bg-white/[0.08]" />
            <div className="mt-2.5 h-2 w-3/4 rounded bg-white/[0.06]" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-white/[0.06]" />
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
    <div className="card-surface rounded-2xl border-orange-400/40 p-4">
      <h3 className="text-[15px] font-semibold text-white">Could not write the quiz</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-white">
        {message ?? 'Try again in a moment.'}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Preview state — review each question
   ──────────────────────────────────────────────────────── */

function PreviewState({
  result,
}: {
  result: NonNullable<ReturnType<typeof useAuthorQuiz>['result']>;
}) {
  return (
    <div className="space-y-5">
      <div className="border-b border-white/[0.08] pb-4">
        <p className="text-[12px] font-medium text-emerald-300">Quiz drafted</p>
        <h3 className="mt-1 text-[18px] font-semibold leading-tight text-white">
          {result.quiz.title}
        </h3>
        {result.quiz.description && (
          <p className="mt-1 text-[13px] leading-relaxed text-white">{result.quiz.description}</p>
        )}
        <p className="mt-2 text-[12.5px] tabular-nums text-white">
          {result.questions_count} questions · {result.citations_count} BS 7671 citations ·{' '}
          {result.quiz.time_limit_minutes} min limit · {result.quiz.pass_mark}% to pass
        </p>
      </div>

      <ol className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
        {result.questions.map((q, i) => (
          <QuestionCard key={i} index={i + 1} q={q} />
        ))}
      </ol>
    </div>
  );
}

function QuestionCard({ index, q }: { index: number; q: AuthorQuizQuestion }) {
  return (
    <li className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white">
        <span className="font-semibold tabular-nums">Q{index}</span>
        <span>·</span>
        <span className="capitalize">{q.difficulty}</span>
        {q.ac_ref && (
          <>
            <span>·</span>
            <span>AC {q.ac_ref}</span>
          </>
        )}
        {q.points && q.points > 1 && (
          <>
            <span>·</span>
            <span className="tabular-nums">{q.points} pts</span>
          </>
        )}
      </div>

      <p className="mt-2 text-[14px] leading-snug text-white">{q.question_text}</p>

      <ul className="mt-3 space-y-1.5">
        {q.options.map((opt, j) => {
          const correct = j === q.correct_answer_index;
          return (
            <li
              key={j}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[13px] leading-snug text-white',
                correct ? 'border-emerald-400/40' : 'border-white/[0.08]'
              )}
            >
              <span
                className={cn(
                  'w-4 shrink-0 font-semibold tabular-nums',
                  correct && 'text-emerald-300'
                )}
              >
                {String.fromCharCode(65 + j)}
              </span>
              <span className="min-w-0 flex-1">{opt}</span>
              {correct && (
                <span className="shrink-0 text-[12px] font-medium text-emerald-300">Correct</span>
              )}
            </li>
          );
        })}
      </ul>

      {q.explanation && (
        <div className="mt-3 border-t border-white/[0.08] pt-3">
          <p className="text-[12px] font-semibold text-white">Why</p>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">{q.explanation}</p>
        </div>
      )}

      {q.bs7671_citations && q.bs7671_citations.length > 0 && (
        <div className="mt-3 border-t border-white/[0.08] pt-3">
          <p className="text-[12px] font-semibold text-white">BS 7671</p>
          <ul className="mt-1 space-y-1">
            {q.bs7671_citations.map((c, k) => (
              <li key={k} className="text-[12.5px] leading-snug text-white">
                <span className="font-semibold tabular-nums">{c.ref}</span>
                {c.snippet && <span> · {c.snippet}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
