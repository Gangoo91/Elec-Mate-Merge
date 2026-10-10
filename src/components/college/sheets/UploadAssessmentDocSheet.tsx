import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkboxCn,
  checkRowCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useToast } from '@/hooks/use-toast';
import {
  useParseAssessmentDocument,
  type AssessmentSourceKind,
  type AssessmentTargetKind,
} from '@/hooks/useParseAssessmentDocument';
import { useTutorTargets } from '@/hooks/useTutorTargets';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   UploadAssessmentDocSheet — drag-drop a PDF / DOCX / TXT (lesson plan, past
   paper, tutor notes, brief, scheme of work, reading) → AI extracts text →
   RAG-checks against ACs + BS 7671 → drafts a full quiz / assessment / mock
   exam with mixed question kinds. Tutor previews + publishes.
   FormSheet, wide on desktop: the document and what to make on the left,
   who it's for and a read-back summary on the right. The preview lays the
   questions out two-up on desktop.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collegeStudentId?: string | null;
  cohortId?: string | null;
  studentName?: string;
  qualificationCode?: string | null;
  onSaved?: (quizId: string) => void;
}

const SOURCE_KINDS: { value: AssessmentSourceKind; label: string; hint: string }[] = [
  { value: 'lesson_plan', label: 'Lesson plan', hint: 'Use ACs covered + activities' },
  { value: 'past_paper', label: 'Past paper', hint: 'Mirror the question style' },
  { value: 'tutor_notes', label: 'Tutor notes', hint: 'Test what was taught' },
  { value: 'brief', label: 'Assignment brief', hint: 'Build prep questions for it' },
  { value: 'scheme_of_work', label: 'Scheme of work', hint: 'Sample across the scheme' },
  { value: 'reading', label: 'Reading material', hint: 'Test comprehension + recall' },
];

const TARGET_KINDS: { value: AssessmentTargetKind; label: string; hint: string }[] = [
  { value: 'quiz', label: 'Quiz', hint: 'Short, mixed kinds, low stakes' },
  { value: 'assessment', label: 'Assessment', hint: 'Longer, AC-aligned, graded' },
  { value: 'mock_exam', label: 'Mock exam', hint: 'Exam-style under time pressure' },
];

const DIFFICULTY: { value: 'easy' | 'medium' | 'hard'; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export function UploadAssessmentDocSheet({
  open,
  onOpenChange,
  collegeStudentId,
  cohortId,
  studentName,
  qualificationCode,
  onSaved,
}: Props) {
  const ai = useParseAssessmentDocument();
  const { toast } = useToast();
  const { cohorts, lessonPlans } = useTutorTargets();
  const inputRef = useRef<HTMLInputElement>(null);

  type TargetMode = 'learner' | 'cohort';
  const [targetMode, setTargetMode] = useState<TargetMode>(
    collegeStudentId ? 'learner' : cohortId ? 'cohort' : 'learner'
  );
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(cohortId ?? null);
  const [selectedLessonPlanId, setSelectedLessonPlanId] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sourceKind, setSourceKind] = useState<AssessmentSourceKind>('lesson_plan');
  const [targetKind, setTargetKind] = useState<AssessmentTargetKind>('quiz');
  const [count, setCount] = useState(8);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timeLimit, setTimeLimit] = useState(20);
  const [passMark, setPassMark] = useState(60);
  const [isHomework, setIsHomework] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) {
      setFile(null);
      setTitle('');
      setDescription('');
      setSourceKind('lesson_plan');
      setTargetKind('quiz');
      setCount(8);
      setDifficulty('medium');
      setTimeLimit(20);
      setPassMark(60);
      setIsHomework(false);
      setDueDate('');
      setTargetMode(collegeStudentId ? 'learner' : cohortId ? 'cohort' : 'learner');
      setSelectedCohortId(cohortId ?? null);
      setSelectedLessonPlanId(null);
      ai.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handlePickFile(f);
  };

  const handlePickFile = (f: File) => {
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ''));
  };

  const targetCountDefault = (k: AssessmentTargetKind) =>
    k === 'mock_exam' ? 20 : k === 'assessment' ? 12 : 8;

  // When target kind changes, nudge sensible defaults
  useEffect(() => {
    setCount(targetCountDefault(targetKind));
    setTimeLimit(targetKind === 'mock_exam' ? 90 : targetKind === 'assessment' ? 45 : 20);
    setPassMark(targetKind === 'mock_exam' ? 50 : 60);
  }, [targetKind]);

  const canRun =
    !!file &&
    title.trim().length > 0 &&
    ai.phase !== 'extracting' &&
    ai.phase !== 'uploading' &&
    ai.phase !== 'authoring';

  const handleRun = async () => {
    if (!file) return;
    if (targetMode === 'cohort' && !selectedCohortId) {
      toast({
        title: 'Pick a cohort',
        description: 'Choose which cohort this is for, or switch to a single learner.',
        variant: 'destructive',
      });
      return;
    }
    try {
      const out = await ai.run({
        file,
        title: title.trim() || file.name,
        description: description.trim() || undefined,
        source_kind: sourceKind,
        target_kind: targetKind,
        college_student_id: targetMode === 'learner' ? (collegeStudentId ?? undefined) : undefined,
        cohort_id: targetMode === 'cohort' ? (selectedCohortId ?? undefined) : undefined,
        qualification_code: qualificationCode ?? undefined,
        count,
        difficulty,
        time_limit_minutes: timeLimit,
        pass_mark: passMark,
        is_homework: isHomework,
        due_date: dueDate || undefined,
        lesson_plan_id: selectedLessonPlanId ?? undefined,
        publish: false,
      });
      toast({
        title: `${labelForTarget(out.kind)} drafted`,
        description: `${out.questions.length} questions · ${out.citations_count} BS 7671 citations`,
      });
    } catch (e) {
      toast({
        title: 'Could not generate',
        description: (e as Error).message ?? 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const handlePublish = async () => {
    if (!ai.result) return;
    setPublishing(true);
    try {
      const { error: updErr } = await supabase
        .from('tutor_quizzes')
        .update({ is_published: true, published_at: new Date().toISOString() })
        .eq('id', ai.result.quiz_id);
      if (updErr) throw new Error(updErr.message);

      // Learner pushes + bell items come from the database trigger
      // trg_tutor_quiz_notify_set when is_published flips (ELE-1895).

      toast({
        title: 'Published',
        description: studentName
          ? `Sent to ${studentName}.`
          : 'Visible to the assigned learner / cohort.',
      });
      onSaved?.(ai.result.quiz_id);
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not publish',
        description: (e as Error).message ?? 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setPublishing(false);
    }
  };

  const working = ai.phase === 'extracting' || ai.phase === 'uploading' || ai.phase === 'authoring';
  const targetLabel = targetKind === 'mock_exam' ? 'mock exam' : targetKind;
  const chosenCohort = cohorts.find((x) => x.id === selectedCohortId);
  const forWho =
    targetMode === 'cohort'
      ? chosenCohort
        ? `${chosenCohort.name} (${chosenCohort.member_count} active)`
        : 'No cohort picked yet'
      : studentName
        ? studentName
        : 'No learner picked';
  const missing = !file
    ? 'Add a document'
    : !title.trim()
      ? 'Give it a title'
      : targetMode === 'cohort' && !selectedCohortId
        ? 'Pick a cohort'
        : null;
  const cohortOptions = cohorts.map((c) => ({
    value: c.id,
    label: `${c.name}${c.course_name ? ` · ${c.course_name}` : ''} (${c.member_count} active)`,
  }));
  const lessonOptions = [
    { value: '', label: 'No lesson plan' },
    ...lessonPlans
      .filter((l) => !selectedCohortId || l.cohort_id === selectedCohortId || l.cohort_id == null)
      .map((l) => ({ value: l.id, label: l.title })),
  ];

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName={
        ai.result
          ? 'space-y-5'
          : 'grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]'
      }
      eyebrow={studentName ? `From your document · ${studentName}` : 'From your document'}
      title={
        ai.result
          ? `Preview: ${labelForTarget(ai.result.kind).toLowerCase()}`
          : 'Make a quiz from a document'
      }
      description={
        ai.result
          ? 'Check every question before you publish. Each maps to an AC and cites BS 7671. It is saved as a draft until you publish.'
          : 'Drop in a lesson plan, past paper, tutor notes, brief or reading. The questions are grounded in the document, the ACs and BS 7671.'
      }
      footer={
        ai.result ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Save as draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className={buttonPrimaryCn}
            >
              {publishing
                ? 'Publishing…'
                : `Publish to ${studentName ? studentName : cohortId ? 'cohort' : 'learner'}`}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRun}
              disabled={!canRun}
              className={buttonPrimaryCn}
            >
              {working
                ? (ai.progress ?? 'Working…')
                : missing && missing !== 'Pick a cohort'
                  ? missing
                  : `Generate ${targetLabel}`}
            </button>
          </div>
        )
      }
    >
      {ai.result ? (
        <PreviewBlock result={ai.result} />
      ) : (
        <>
          {/* ── Left: the document and what to make from it ── */}
          <div className="space-y-7">
            <Section title="1. The document">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                  'cursor-pointer rounded-2xl border border-dashed px-5 py-6 transition-colors touch-manipulation',
                  dragActive
                    ? 'border-elec-yellow bg-elec-yellow/[0.06]'
                    : file
                      ? 'border-emerald-400/50 bg-white/[0.03]'
                      : 'border-white/[0.18] hover:bg-white/[0.03]'
                )}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handlePickFile(f);
                  }}
                />
                {file ? (
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1 text-left">
                      <div className="truncate text-[14px] font-semibold text-white">
                        {file.name}
                      </div>
                      <div className="text-[12px] tabular-nums text-white">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · ready
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="inline-flex h-11 shrink-0 items-center px-1 text-[13px] font-semibold text-white touch-manipulation hover:text-red-300"
                      aria-label="Remove file"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 text-left">
                      <div className="text-[14px] font-semibold text-white">
                        Drop a file or tap to choose
                      </div>
                      <div className="mt-0.5 text-[12px] text-white">
                        PDF, DOCX, TXT or MD, up to 25 MB
                      </div>
                    </div>
                    <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">
                      Choose
                    </span>
                  </div>
                )}
              </div>

              {ai.phase === 'error' && ai.error && (
                <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13px] leading-snug text-orange-300">
                  {ai.error}
                </p>
              )}

              <div>
                <label htmlFor="ua-title" className={labelCn}>
                  Title
                </label>
                <input
                  id="ua-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What should this quiz be called?"
                  className={inputCn}
                />
              </div>
              <div>
                <label htmlFor="ua-desc" className={labelCn}>
                  Description (optional)
                </label>
                <textarea
                  id="ua-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short intro shown to learners."
                  rows={2}
                  className={textareaCn}
                />
              </div>
              <div>
                <span className={labelCn}>What is the document?</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SOURCE_KINDS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      aria-pressed={sourceKind === s.value}
                      onClick={() => setSourceKind(s.value)}
                      className={cn(
                        chipBase,
                        'px-2 text-[13px] leading-tight',
                        sourceKind === s.value ? chipOn : chipOff
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className={hintCn}>{SOURCE_KINDS.find((s) => s.value === sourceKind)?.hint}.</p>
              </div>
            </Section>

            <Section title="2. What to make">
              <div>
                <div className="grid grid-cols-3 gap-2">
                  {TARGET_KINDS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      aria-pressed={targetKind === t.value}
                      onClick={() => setTargetKind(t.value)}
                      className={cn(chipBase, 'px-2', targetKind === t.value ? chipOn : chipOff)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className={hintCn}>{TARGET_KINDS.find((t) => t.value === targetKind)?.hint}.</p>
              </div>
              <div>
                <span className={labelCn}>Difficulty</span>
                <div className="grid grid-cols-3 gap-2">
                  {DIFFICULTY.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      aria-pressed={difficulty === d.value}
                      onClick={() => setDifficulty(d.value)}
                      className={cn(chipBase, difficulty === d.value ? chipOn : chipOff)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-6">
                <div>
                  <label htmlFor="ua-count" className={labelCn}>
                    Questions
                  </label>
                  <input
                    id="ua-count"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={30}
                    value={count}
                    onChange={(e) =>
                      setCount(Math.max(1, Math.min(30, Number(e.target.value) || 1)))
                    }
                    className={cn(inputCn, 'tabular-nums')}
                  />
                </div>
                <div>
                  <label htmlFor="ua-time" className={labelCn}>
                    Time limit (mins)
                  </label>
                  <input
                    id="ua-time"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={240}
                    value={timeLimit}
                    onChange={(e) =>
                      setTimeLimit(Math.max(1, Math.min(240, Number(e.target.value) || 1)))
                    }
                    className={cn(inputCn, 'tabular-nums')}
                  />
                </div>
                <div>
                  <label htmlFor="ua-pass" className={labelCn}>
                    Pass mark (%)
                  </label>
                  <input
                    id="ua-pass"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    value={passMark}
                    onChange={(e) =>
                      setPassMark(Math.max(0, Math.min(100, Number(e.target.value) || 0)))
                    }
                    className={cn(inputCn, 'tabular-nums')}
                  />
                </div>
              </div>
            </Section>
          </div>

          {/* ── Right: who it's for, and the summary ── */}
          <div className="space-y-7 border-t border-white/[0.1] pt-5 lg:border-t-0 lg:pt-0">
            <Section title="3. Who it's for">
              <div className="grid grid-cols-2 gap-2">
                {(['learner', 'cohort'] as const).map((mode) => {
                  const disabled = mode === 'learner' && !studentName;
                  return (
                    <button
                      key={mode}
                      type="button"
                      aria-pressed={targetMode === mode}
                      onClick={() => !disabled && setTargetMode(mode)}
                      disabled={disabled}
                      className={cn(
                        chipBase,
                        'truncate px-3',
                        disabled && 'cursor-not-allowed opacity-40',
                        targetMode === mode ? chipOn : chipOff
                      )}
                    >
                      {mode === 'learner' ? (studentName ?? 'Single learner') : 'Whole cohort'}
                    </button>
                  );
                })}
              </div>
              <p className={hintCn}>
                {targetMode === 'learner'
                  ? studentName
                    ? `Only ${studentName.split(' ')[0]} sees it.`
                    : 'Open this from a learner’s page to send it to one learner.'
                  : 'Every active member of the cohort sees it.'}
              </p>

              {targetMode === 'cohort' && (
                <div>
                  <span className={labelCn}>Cohort</span>
                  {cohorts.length === 0 ? (
                    <p className="text-[13px] text-white">No cohorts in your college yet.</p>
                  ) : (
                    <MobileSelectPicker
                      value={selectedCohortId ?? ''}
                      onValueChange={(v) => setSelectedCohortId(v || null)}
                      options={cohortOptions}
                      placeholder="Choose cohort…"
                      title="Cohort"
                      triggerClassName={selectTriggerCn}
                    />
                  )}
                </div>
              )}

              {lessonPlans.length > 0 && (
                <div>
                  <span className={labelCn}>Link to lesson plan (optional)</span>
                  <MobileSelectPicker
                    value={selectedLessonPlanId ?? ''}
                    onValueChange={(v) => setSelectedLessonPlanId(v || null)}
                    options={lessonOptions}
                    placeholder="No lesson plan"
                    title="Lesson plan"
                    triggerClassName={selectTriggerCn}
                  />
                </div>
              )}

              <label className={checkRowCn}>
                <Checkbox
                  checked={isHomework}
                  onCheckedChange={(v) => setIsHomework(v === true)}
                  className={checkboxCn}
                />
                <span className="text-[14px] text-white">
                  Set as homework
                  <span className="mt-0.5 block text-[12px] leading-snug text-white">
                    Counts towards OTJ and sends a due-date reminder.
                  </span>
                </span>
              </label>
              {isHomework && (
                <div>
                  <label htmlFor="ua-due" className={labelCn}>
                    Due date
                  </label>
                  <input
                    id="ua-due"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={inputCn}
                  />
                </div>
              )}
            </Section>

            {/* Summary — what will be made, read back before generating */}
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">You'll get</h3>
              <dl className="mt-3 space-y-2 text-[13px] text-white">
                <SummaryRow label="Type" value={labelForTarget(targetKind)} />
                <SummaryRow label="Questions" value={`${count}, ${difficulty}`} />
                <SummaryRow label="Time and pass mark" value={`${timeLimit} min · ${passMark}%`} />
                <SummaryRow
                  label="For"
                  value={forWho}
                  warn={targetMode === 'cohort' && !chosenCohort}
                />
                {isHomework && (
                  <SummaryRow label="Homework" value={dueDate ? `Due ${dueDate}` : 'No due date'} />
                )}
              </dl>
              <p className="mt-3 text-[12px] leading-relaxed text-white">
                Nothing is sent until you review the questions and press Publish.
              </p>
            </div>
          </div>
        </>
      )}
    </FormSheet>
  );
}

/* ──────────────────── helpers ──────────────────── */

const hintCn = 'mt-1.5 text-[12px] leading-relaxed text-white';

/** A plain section: white heading over a hairline. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
      {children}
    </section>
  );
}

function SummaryRow({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] pb-2 last:border-b-0 last:pb-0">
      <dt>{label}</dt>
      <dd className={cn('text-right font-semibold', warn && 'text-orange-300')}>{value}</dd>
    </div>
  );
}

function labelForTarget(k: string): string {
  if (k === 'mock_exam') return 'Mock exam';
  if (k === 'assessment') return 'Assessment';
  return 'Quiz';
}

type PreviewQuestion = ReturnType<typeof useParseAssessmentDocument>['result'] extends {
  questions: infer Q;
}
  ? Q extends Array<infer One>
    ? One
    : never
  : never;

function PreviewBlock({
  result,
}: {
  result: ReturnType<typeof useParseAssessmentDocument>['result'] & {};
}) {
  const initial = result.questions ?? [];
  const [questions, setQuestions] = useState<PreviewQuestion[]>(initial);

  // Reset when a fresh result comes in
  useEffect(() => {
    setQuestions(result.questions ?? []);
  }, [result.questions]);

  const totalCitations = useMemo(
    () => questions.reduce((s, q) => s + ((q.bs7671_citations?.length ?? 0) as number), 0),
    [questions]
  );
  const kindCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const q of questions) {
      m.set(q.question_kind, (m.get(q.question_kind) ?? 0) + 1);
    }
    return Array.from(m.entries())
      .map(([k, n]) => `${n} ${labelForKind(k)}`)
      .join(' · ');
  }, [questions]);

  const handleSave = (next: PreviewQuestion) => {
    setQuestions((prev) => prev.map((p) => (p.id === next.id ? next : p)));
  };
  const handleDelete = (id: string) => {
    setQuestions((prev) => prev.filter((p) => p.id !== id));
  };
  const { toast: addToast } = useToast();
  const [adding, setAdding] = useState(false);
  const handleAddNew = async () => {
    if (adding) return;
    setAdding(true);
    try {
      const nextSort = questions.length + 1;
      const { data, error } = await supabase
        .from('tutor_quiz_questions')
        .insert({
          quiz_id: result.quiz_id,
          question_kind: 'multi_choice',
          question_text: 'New question. Tap Edit to write it.',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct_answer_index: 0,
          expected_answer: {},
          explanation: null,
          marking_guidance: null,
          ac_ref: null,
          points: 1,
          sort_order: nextSort,
          difficulty: 'medium',
          bs7671_citations: [],
        })
        .select(
          'id, question_kind, question_text, options, correct_answer_index, expected_answer, marking_guidance, explanation, category, difficulty, ac_ref, points, bs7671_citations'
        )
        .single();
      if (error) throw new Error(error.message);
      setQuestions((prev) => [...prev, data as unknown as PreviewQuestion]);
      addToast({ title: 'Question added. Edit it now' });
    } catch (e) {
      addToast({
        title: 'Could not add question',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setAdding(false);
    }
  };

  if (!result) return null;
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-emerald-300">Drafted from your document</p>
          <p className="mt-1 text-[17px] font-semibold leading-snug text-white">
            {result.quiz.title}
          </p>
          <p className="mt-1 text-[13px] tabular-nums text-white">
            {questions.length} questions
            {kindCounts && <> · {kindCounts}</>}
            {totalCitations > 0 && <> · {totalCitations} BS 7671 citations</>}
          </p>
        </div>
        <p className="max-w-sm text-[12.5px] leading-relaxed text-white sm:text-right">
          Edit or remove any question. Changes save straight away, so what you publish is what you
          reviewed.
        </p>
      </div>

      {questions.length === 0 ? (
        <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13px] text-orange-300">
          All questions removed. Add one or generate again before publishing.
        </p>
      ) : (
        <ol className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
          {questions.map((q, i) => (
            <li key={q.id}>
              <QuestionPreviewCard
                q={q}
                index={i}
                onSaved={handleSave}
                onDeleted={() => handleDelete(q.id)}
              />
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        onClick={handleAddNew}
        disabled={adding}
        className={cn(buttonSecondaryCn, 'w-full border-dashed lg:max-w-sm')}
      >
        {adding ? 'Adding…' : 'Add a question yourself'}
      </button>
    </div>
  );
}

/* ───────────── per-question editable card ───────────── */

function QuestionPreviewCard({
  q,
  index,
  onSaved,
  onDeleted,
}: {
  q: PreviewQuestion;
  index: number;
  onSaved: (next: PreviewQuestion) => void;
  onDeleted: () => void;
}) {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Editable copies
  const [text, setText] = useState(q.question_text);
  const [options, setOptions] = useState<string[]>(q.options ?? []);
  const [correctIdx, setCorrectIdx] = useState<number | null>(q.correct_answer_index);
  const [explanation, setExplanation] = useState(q.explanation ?? '');
  const [marking, setMarking] = useState(q.marking_guidance ?? '');
  const [acRef, setAcRef] = useState(q.ac_ref ?? '');
  const [points, setPoints] = useState(q.points ?? 1);
  const [expectedJson, setExpectedJson] = useState(
    q.expected_answer ? JSON.stringify(q.expected_answer, null, 2) : ''
  );

  const enterEdit = () => {
    setText(q.question_text);
    setOptions(q.options ?? []);
    setCorrectIdx(q.correct_answer_index);
    setExplanation(q.explanation ?? '');
    setMarking(q.marking_guidance ?? '');
    setAcRef(q.ac_ref ?? '');
    setPoints(q.points ?? 1);
    setExpectedJson(q.expected_answer ? JSON.stringify(q.expected_answer, null, 2) : '');
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let expectedAnswer: Record<string, unknown> = {};
      if (expectedJson.trim()) {
        try {
          expectedAnswer = JSON.parse(expectedJson) as Record<string, unknown>;
        } catch {
          toast({
            title: 'Invalid expected_answer JSON',
            description: 'Fix the JSON or clear the field.',
            variant: 'destructive',
          });
          setSaving(false);
          return;
        }
      }
      const update: Record<string, unknown> = {
        question_text: text.trim(),
        explanation: explanation.trim() || null,
        marking_guidance: marking.trim() || null,
        ac_ref: acRef.trim() || null,
        points: Math.max(1, Math.min(20, Number(points) || 1)),
        expected_answer: expectedAnswer,
      };
      if (q.question_kind === 'multi_choice') {
        update.options = options.filter((o) => o.trim().length > 0);
        update.correct_answer_index = correctIdx;
      } else if (q.question_kind === 'true_false') {
        update.options = ['True', 'False'];
        update.correct_answer_index = correctIdx ?? 0;
      }
      const { error } = await supabase
        .from('tutor_quiz_questions')
        .update(update as never)
        .eq('id', q.id);
      if (error) throw new Error(error.message);
      onSaved({
        ...q,
        question_text: update.question_text as string,
        explanation: (update.explanation as string | null) ?? null,
        marking_guidance: (update.marking_guidance as string | null) ?? null,
        ac_ref: (update.ac_ref as string | null) ?? null,
        points: update.points as number,
        expected_answer: expectedAnswer,
        options:
          q.question_kind === 'multi_choice' || q.question_kind === 'true_false'
            ? (update.options as string[])
            : q.options,
        correct_answer_index:
          q.question_kind === 'multi_choice' || q.question_kind === 'true_false'
            ? (update.correct_answer_index as number | null)
            : q.correct_answer_index,
      });
      setEditing(false);
      toast({ title: 'Question updated' });
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('tutor_quiz_questions').delete().eq('id', q.id);
      if (error) throw new Error(error.message);
      onDeleted();
      toast({ title: 'Question removed' });
    } catch (e) {
      toast({
        title: 'Could not delete',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const cardCn =
    '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-4 sm:mx-0 sm:rounded-3xl sm:border-x sm:px-5';
  const linkBtn = 'inline-flex h-11 items-center px-1 text-[13px] font-semibold touch-manipulation';

  if (!editing) {
    return (
      <div className={cardCn}>
        <div className="flex items-start justify-between gap-3">
          <p className="pt-3 text-[12px] text-white">
            <span className="font-semibold tabular-nums">Question {index + 1}</span>
            {' · '}
            {labelForKind(q.question_kind)}
            {q.ac_ref && <> · AC {q.ac_ref}</>}
            {q.difficulty && <> · {q.difficulty}</>}
            {(q.points ?? 1) !== 1 && <> · {q.points} points</>}
          </p>
          <div className="-my-1 flex shrink-0 items-center gap-3">
            {!confirmDelete ? (
              <>
                <button
                  type="button"
                  onClick={enterEdit}
                  className={cn(linkBtn, 'text-elec-yellow')}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className={cn(linkBtn, 'text-white hover:text-red-300')}
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className={cn(linkBtn, 'text-white')}
                >
                  Keep
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className={cn(linkBtn, 'text-red-300 disabled:opacity-50')}
                >
                  {saving ? 'Removing…' : 'Delete it'}
                </button>
              </>
            )}
          </div>
        </div>
        <p className="mt-1 text-[14.5px] font-medium leading-snug text-white">{q.question_text}</p>
        {q.options && q.options.length > 0 && (
          <ul className="mt-2.5 space-y-1">
            {q.options.map((opt, j) => {
              const right = j === q.correct_answer_index;
              return (
                <li
                  key={j}
                  className="flex items-baseline gap-2 text-[13px] leading-snug text-white"
                >
                  <span className={cn('font-semibold tabular-nums', right && 'text-emerald-300')}>
                    {String.fromCharCode(65 + j)}.
                  </span>
                  <span className={cn(right && 'font-semibold')}>{opt}</span>
                  {right && (
                    <span className="text-[12px] font-semibold text-emerald-300">Answer</span>
                  )}
                </li>
              );
            })}
          </ul>
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
        {q.explanation && (
          <p className="mt-2 text-[13px] leading-snug text-white">
            <span className="font-semibold">Why: </span>
            {q.explanation}
          </p>
        )}
        {q.marking_guidance && (
          <p className="mt-1 text-[13px] leading-snug text-white">
            <span className="font-semibold">Marking: </span>
            {q.marking_guidance}
          </p>
        )}
      </div>
    );
  }

  // Editing UI
  return (
    <div className={cn(cardCn, 'space-y-4 sm:border-elec-yellow/60')}>
      <p className="text-[12px] text-white">
        <span className="font-semibold tabular-nums">Question {index + 1}</span> ·{' '}
        {labelForKind(q.question_kind)} ·{' '}
        <span className="font-semibold text-elec-yellow">Editing</span>
      </p>

      <div>
        <label htmlFor={`qt-${q.id}`} className={labelCn}>
          Question
        </label>
        <textarea
          id={`qt-${q.id}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className={textareaCn}
        />
      </div>

      {q.question_kind === 'multi_choice' && (
        <div>
          <span className={labelCn}>Options (tap the letter of the right answer)</span>
          <div className="space-y-1">
            {options.map((opt, j) => (
              <div key={j} className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => setCorrectIdx(j)}
                  aria-pressed={correctIdx === j}
                  className={cn(
                    'mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold touch-manipulation',
                    correctIdx === j ? chipOn : chipOff
                  )}
                  aria-label={`Mark option ${String.fromCharCode(65 + j)} correct`}
                >
                  {String.fromCharCode(65 + j)}
                </button>
                <input
                  type="text"
                  aria-label={`Option ${String.fromCharCode(65 + j)}`}
                  value={opt}
                  onChange={(e) => {
                    const next = [...options];
                    next[j] = e.target.value;
                    setOptions(next);
                  }}
                  className={inputCn}
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = options.filter((_, k) => k !== j);
                    setOptions(next);
                    if (correctIdx === j) setCorrectIdx(null);
                    else if (correctIdx != null && correctIdx > j) setCorrectIdx(correctIdx - 1);
                  }}
                  className={cn(linkBtn, 'shrink-0 text-white hover:text-red-300')}
                  aria-label="Remove option"
                >
                  Remove
                </button>
              </div>
            ))}
            {options.length < 6 && (
              <button
                type="button"
                onClick={() => setOptions([...options, ''])}
                className={cn(linkBtn, 'text-elec-yellow')}
              >
                Add an option
              </button>
            )}
          </div>
        </div>
      )}

      {q.question_kind === 'true_false' && (
        <div>
          <span className={labelCn}>Correct answer</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'True', idx: 0 },
              { label: 'False', idx: 1 },
            ].map((c) => (
              <button
                key={c.label}
                type="button"
                aria-pressed={correctIdx === c.idx}
                onClick={() => setCorrectIdx(c.idx)}
                className={cn(chipBase, correctIdx === c.idx ? chipOn : chipOff)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {(q.question_kind === 'calculation' ||
        q.question_kind === 'short_answer' ||
        q.question_kind === 'long_answer' ||
        q.question_kind === 'scenario') && (
        <div>
          <label htmlFor={`qe-${q.id}`} className={labelCn}>
            {q.question_kind === 'calculation'
              ? 'Expected answer (JSON: numeric_value, tolerance, units, working_required)'
              : 'Expected answer outline (JSON, optional)'}
          </label>
          <textarea
            id={`qe-${q.id}`}
            value={expectedJson}
            onChange={(e) => setExpectedJson(e.target.value)}
            rows={3}
            className={cn(textareaCn, 'font-mono text-[13px] md:text-[13px]')}
            placeholder={
              q.question_kind === 'calculation'
                ? '{"numeric_value": 24.5, "tolerance": 0.5, "units": "A"}'
                : '{"min_words": 60}'
            }
          />
        </div>
      )}

      {(q.question_kind === 'short_answer' ||
        q.question_kind === 'long_answer' ||
        q.question_kind === 'scenario') && (
        <div>
          <label htmlFor={`qm-${q.id}`} className={labelCn}>
            Marking guidance (the AI marks against this)
          </label>
          <textarea
            id={`qm-${q.id}`}
            value={marking}
            onChange={(e) => setMarking(e.target.value)}
            rows={2}
            placeholder="What full marks looks like. Concrete, with BS 7671 cited where relevant."
            className={textareaCn}
          />
        </div>
      )}

      <div>
        <label htmlFor={`qx-${q.id}`} className={labelCn}>
          Explanation shown after answering
        </label>
        <textarea
          id={`qx-${q.id}`}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={2}
          className={textareaCn}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6">
        <div>
          <label htmlFor={`qa-${q.id}`} className={labelCn}>
            AC reference
          </label>
          <input
            id={`qa-${q.id}`}
            type="text"
            value={acRef}
            onChange={(e) => setAcRef(e.target.value)}
            placeholder="e.g. K3.2"
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor={`qp-${q.id}`} className={labelCn}>
            Points
          </label>
          <input
            id={`qp-${q.id}`}
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={points}
            onChange={(e) => setPoints(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            className={cn(inputCn, 'tabular-nums')}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => setEditing(false)} className={buttonSecondaryCn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !text.trim()}
          className={buttonPrimaryCn}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}

function labelForKind(k: string): string {
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
    default:
      return k;
  }
}
