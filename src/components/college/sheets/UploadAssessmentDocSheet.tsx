import { useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Upload,
  FileText,
  FileType,
  X,
  Check,
  AlertTriangle,
  Sparkles,
  Target,
  BookOpen,
  Loader2,
  Pencil,
  Trash2,
  Users,
  User,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
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
    !!file && title.trim().length > 0 && ai.phase !== 'extracting' && ai.phase !== 'uploading' && ai.phase !== 'authoring';

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
        college_student_id:
          targetMode === 'learner' ? collegeStudentId ?? undefined : undefined,
        cohort_id: targetMode === 'cohort' ? selectedCohortId ?? undefined : undefined,
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

      // Notify recipients (best-effort — never block the publish on a push fail)
      try {
        const recipients = new Set<string>();
        const effectiveCollegeStudentId =
          targetMode === 'learner' ? collegeStudentId : null;
        const effectiveCohortId =
          targetMode === 'cohort' ? selectedCohortId : null;
        if (effectiveCollegeStudentId) {
          const { data: cs } = await supabase
            .from('college_students')
            .select('user_id')
            .eq('id', effectiveCollegeStudentId)
            .maybeSingle();
          const uid = (cs as { user_id?: string } | null)?.user_id;
          if (uid) recipients.add(uid);
        }
        if (effectiveCohortId) {
          const { data: cohortStudents } = await supabase
            .from('college_students')
            .select('user_id, status')
            .eq('cohort_id', effectiveCohortId);
          for (const r of (cohortStudents ?? []) as Array<{ user_id: string | null; status: string | null }>) {
            if (
              r.user_id &&
              r.status !== 'withdrawn' &&
              r.status !== 'completed'
            ) {
              recipients.add(r.user_id);
            }
          }
        }
        const kindLabel = labelForTarget(ai.result.kind);
        await Promise.all(
          Array.from(recipients).map((uid) =>
            supabase.functions
              .invoke('send-push-notification', {
                body: {
                  userId: uid,
                  title: `${kindLabel}: ${ai.result!.quiz.title}`,
                  body: `${ai.result!.questions.length} questions${ai.result!.quiz.time_limit_minutes ? ` · ${ai.result!.quiz.time_limit_minutes}m` : ''}. Tap to start.`,
                  type: 'college',
                  data: {
                    kind: 'tutor_quiz_assigned',
                    quiz_id: ai.result!.quiz_id,
                    deeplink: `/apprentice/college/quiz/${ai.result!.quiz_id}`,
                  },
                },
              })
              .catch(() => undefined)
          )
        );
      } catch {
        /* best-effort */
      }

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[hsl(0_0%_8%)]">
        <SheetShell
          eyebrow="From your document"
          title={
            ai.result
              ? `Preview · ${labelForTarget(ai.result.kind)}`
              : 'Generate quiz from a document'
          }
          description={
            ai.result
              ? 'Review questions before publishing. Each maps to an AC and cites BS 7671.'
              : 'Drop in a lesson plan, past paper, tutor notes, brief or reading. AI grounds questions in the doc + ACs + BS 7671.'
          }
          footer={
            ai.result ? (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1">
                  Save as draft
                </SecondaryButton>
                <PrimaryButton onClick={handlePublish} disabled={publishing} className="flex-1">
                  {publishing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                      Publishing…
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1.5" strokeWidth={3} />
                      Publish to{' '}
                      {studentName ? studentName : cohortId ? 'cohort' : 'learner'}
                    </>
                  )}
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1">
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleRun} disabled={!canRun} className="flex-1">
                  {ai.phase === 'extracting' || ai.phase === 'uploading' || ai.phase === 'authoring' ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                      {ai.progress ?? 'Working…'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-1.5" />
                      Generate {targetKind === 'mock_exam' ? 'mock exam' : targetKind}
                    </>
                  )}
                </PrimaryButton>
              </>
            )
          }
        >
          {ai.result ? (
            <PreviewBlock result={ai.result} />
          ) : (
            <>
              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={cn(
                  'rounded-2xl border-2 border-dashed px-5 py-7 text-center cursor-pointer transition-colors touch-manipulation',
                  dragActive
                    ? 'border-elec-yellow/70 bg-elec-yellow/[0.08]'
                    : file
                      ? 'border-emerald-400/40 bg-emerald-500/[0.05]'
                      : 'border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04]'
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
                    <FileText className="h-8 w-8 text-emerald-300 flex-shrink-0" />
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-[13px] font-semibold text-white truncate">{file.name}</div>
                      <div className="text-[11px] text-white tabular-nums">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="h-8 w-8 rounded-full hover:bg-white/[0.06] inline-flex items-center justify-center text-white touch-manipulation"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/[0.06] mb-1">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[13px] font-semibold text-white">
                      Drop a file or tap to choose
                    </div>
                    <div className="text-[11.5px] text-white">PDF, DOCX, TXT or MD · max 25 MB</div>
                  </div>
                )}
              </div>

              {ai.phase === 'error' && ai.error && (
                <div className="rounded-xl border border-red-500/[0.30] bg-red-500/[0.06] px-4 py-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0 mt-0.5" />
                  <div className="text-[12.5px] text-white leading-snug">{ai.error}</div>
                </div>
              )}

              {/* Title + description */}
              <Field label="Title">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What should this quiz be called?"
                  className="w-full h-11 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[13.5px] text-white placeholder:text-white/35 px-4 touch-manipulation"
                />
              </Field>
              <Field label="Description (optional)">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short intro shown to learners."
                  rows={2}
                  className="w-full rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[13px] text-white placeholder:text-white/35 px-4 py-2.5 leading-relaxed touch-manipulation resize-y"
                />
              </Field>

              {/* Source kind */}
              <Field label="What is the document?">
                <div className="grid grid-cols-2 gap-1.5">
                  {SOURCE_KINDS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSourceKind(s.value)}
                      className={cn(
                        'rounded-xl border px-3 py-2.5 text-left transition-colors touch-manipulation',
                        sourceKind === s.value
                          ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                          : 'bg-[hsl(0_0%_15%)] border-white/[0.10] hover:bg-white/[0.04]'
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        <FileType className="h-3.5 w-3.5 text-white" />
                        <span className="text-[12.5px] font-semibold text-white">{s.label}</span>
                      </div>
                      <div className="mt-0.5 text-[10.5px] text-white/85 leading-snug">{s.hint}</div>
                    </button>
                  ))}
                </div>
              </Field>

              {/* Target kind */}
              <Field label="What should the AI create?">
                <div className="space-y-1.5">
                  {TARGET_KINDS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTargetKind(t.value)}
                      className={cn(
                        'w-full rounded-xl border px-4 py-3 text-left transition-colors touch-manipulation flex items-center gap-3',
                        targetKind === t.value
                          ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                          : 'bg-[hsl(0_0%_15%)] border-white/[0.10] hover:bg-white/[0.04]'
                      )}
                    >
                      <span
                        className={cn(
                          'inline-flex items-center justify-center h-5 w-5 rounded-full border flex-shrink-0',
                          targetKind === t.value
                            ? 'bg-elec-yellow border-elec-yellow'
                            : 'border-white/30'
                        )}
                      >
                        {targetKind === t.value && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold text-white">{t.label}</div>
                        <div className="text-[11px] text-white/85 leading-snug">{t.hint}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </Field>

              {/* Counts + thresholds */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Questions">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                    className="w-full h-11 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[14px] tabular-nums text-white px-4 touch-manipulation"
                  />
                </Field>
                <Field label="Difficulty">
                  <div className="grid grid-cols-3 gap-1">
                    {DIFFICULTY.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setDifficulty(d.value)}
                        className={cn(
                          'h-11 rounded-xl text-[12.5px] font-semibold transition-colors touch-manipulation border',
                          difficulty === d.value
                            ? 'bg-elec-yellow/[0.10] border-elec-yellow/40 text-white'
                            : 'bg-[hsl(0_0%_15%)] border-white/[0.10] text-white hover:bg-white/[0.04]'
                        )}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Time limit (mins)">
                  <input
                    type="number"
                    min={1}
                    max={240}
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Math.max(1, Math.min(240, Number(e.target.value) || 1)))}
                    className="w-full h-11 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[14px] tabular-nums text-white px-4 touch-manipulation"
                  />
                </Field>
                <Field label="Pass mark (%)">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={passMark}
                    onChange={(e) => setPassMark(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className="w-full h-11 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[14px] tabular-nums text-white px-4 touch-manipulation"
                  />
                </Field>
              </div>

              {/* Homework toggle */}
              <button
                type="button"
                onClick={() => setIsHomework((v) => !v)}
                className="w-full rounded-xl border border-white/[0.10] bg-[hsl(0_0%_15%)] hover:bg-white/[0.04] px-4 py-3 text-left flex items-center gap-3 touch-manipulation"
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center h-5 w-5 rounded-md border flex-shrink-0',
                    isHomework ? 'bg-elec-yellow border-elec-yellow' : 'border-white/30'
                  )}
                >
                  {isHomework && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-white">Set as homework</div>
                  <div className="text-[11px] text-white/85 leading-snug">
                    Counts towards OTJ and triggers a due-date reminder.
                  </div>
                </div>
              </button>
              {isHomework && (
                <Field label="Due date">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full h-11 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow text-[13.5px] text-white px-4 touch-manipulation"
                  />
                </Field>
              )}
            </>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────── helpers ──────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/85">
        {label}
      </div>
      {children}
    </label>
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

  if (!result) return null;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-emerald-500/[0.25] bg-emerald-500/[0.05] px-4 py-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200 mb-0.5">
          Drafted from your document
        </div>
        <div className="text-[14px] font-semibold text-white">{result.quiz.title}</div>
        <div className="mt-1 text-[11.5px] text-white tabular-nums">
          {questions.length} questions
          {kindCounts && (
            <>
              <span className="mx-1.5 text-white/35">·</span>
              <span>{kindCounts}</span>
            </>
          )}
          {totalCitations > 0 && (
            <>
              <span className="mx-1.5 text-white/35">·</span>
              <span>{totalCitations} BS 7671 citations</span>
            </>
          )}
        </div>
        <div className="mt-1 text-[10.5px] text-white/65 leading-snug">
          Tap any question to edit. Tweaks save instantly so the published version matches what you've reviewed.
        </div>
      </div>

      <ol className="space-y-2">
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
        {questions.length === 0 && (
          <li className="rounded-xl border border-amber-500/[0.30] bg-amber-500/[0.06] px-4 py-3 text-[12px] text-white">
            All questions removed. Add or regenerate before publishing.
          </li>
        )}
      </ol>
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
        .update(update)
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

  if (!editing) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          <span className="text-[10px] font-semibold tabular-nums text-white">Q{index + 1}</span>
          <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
            {labelForKind(q.question_kind)}
          </span>
          {q.ac_ref && (
            <span className="inline-flex items-center gap-1 h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200">
              <Target className="h-2.5 w-2.5" />
              {q.ac_ref}
            </span>
          )}
          {q.difficulty && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
              {q.difficulty}
            </span>
          )}
          {(q.points ?? 1) !== 1 && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white tabular-nums">
              {q.points} pts
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={enterEdit}
              className="text-[10.5px] font-semibold text-white/85 hover:text-elec-yellow inline-flex items-center gap-1 touch-manipulation"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-[10.5px] font-semibold text-white/65 hover:text-red-300 touch-manipulation"
              >
                Remove
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-[10.5px] font-semibold text-white/65 hover:text-white touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="inline-flex items-center gap-1 h-5 px-1.5 rounded-md bg-red-500/[0.14] border border-red-400/40 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-red-200 hover:bg-red-500/[0.20] disabled:opacity-50 touch-manipulation"
                >
                  <Trash2 className="h-2.5 w-2.5" />
                  Delete
                </button>
              </span>
            )}
          </span>
        </div>
        <div className="text-[12.5px] text-white leading-snug">{q.question_text}</div>
        {q.options && q.options.length > 0 && (
          <ul className="mt-2 space-y-1">
            {q.options.map((opt, j) => (
              <li
                key={j}
                className={cn(
                  'flex items-baseline gap-2 text-[11.5px] leading-snug',
                  j === q.correct_answer_index ? 'text-emerald-200' : 'text-white/85'
                )}
              >
                <span className="font-semibold tabular-nums">{String.fromCharCode(65 + j)}.</span>
                <span>{opt}</span>
                {j === q.correct_answer_index && (
                  <Check className="h-3 w-3 text-emerald-300 flex-shrink-0" strokeWidth={3} />
                )}
              </li>
            ))}
          </ul>
        )}
        {q.bs7671_citations && q.bs7671_citations.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/[0.04]">
            <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white mb-1">
              <BookOpen className="h-3 w-3" />
              BS 7671
            </div>
            <ul className="space-y-1">
              {q.bs7671_citations.map((c, k) => (
                <li key={k} className="flex items-baseline gap-1.5">
                  <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-blue-500/[0.10] border border-blue-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200 flex-shrink-0">
                    {c.ref}
                  </span>
                  {c.snippet && (
                    <span className="text-[10.5px] text-white/85 leading-snug">{c.snippet}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {q.explanation && (
          <p className="mt-1.5 text-[10.5px] text-white/75 leading-snug">
            <span className="text-white/45">Why: </span>
            {q.explanation}
          </p>
        )}
        {q.marking_guidance && (
          <p className="mt-1 text-[10.5px] text-white/75 leading-snug">
            <span className="text-white/45">Marking: </span>
            {q.marking_guidance}
          </p>
        )}
      </div>
    );
  }

  // Editing UI
  return (
    <div className="rounded-xl border border-elec-yellow/40 bg-[hsl(0_0%_12%)] px-4 py-3 space-y-3">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold tabular-nums text-white">Q{index + 1}</span>
        <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-elec-yellow/[0.14] border border-elec-yellow/40 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
          Editing
        </span>
        <span className="ml-auto text-[10.5px] text-white/55">
          {labelForKind(q.question_kind)}
        </span>
      </div>

      <FieldSm label="Question text">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[12.5px] text-white px-3 py-2 leading-relaxed resize-y touch-manipulation"
        />
      </FieldSm>

      {q.question_kind === 'multi_choice' && (
        <FieldSm label="Options · select the correct answer">
          <div className="space-y-1.5">
            {options.map((opt, j) => (
              <div key={j} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCorrectIdx(j)}
                  className={cn(
                    'h-7 w-7 rounded-full border flex items-center justify-center flex-shrink-0 touch-manipulation',
                    correctIdx === j
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100'
                      : 'border-white/25 text-white hover:bg-white/[0.04]'
                  )}
                  aria-label={`Mark option ${String.fromCharCode(65 + j)} correct`}
                >
                  {correctIdx === j ? <Check className="h-3 w-3" strokeWidth={3} /> : String.fromCharCode(65 + j)}
                </button>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const next = [...options];
                    next[j] = e.target.value;
                    setOptions(next);
                  }}
                  className="flex-1 h-9 rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[12px] text-white px-3 touch-manipulation"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = options.filter((_, k) => k !== j);
                    setOptions(next);
                    if (correctIdx === j) setCorrectIdx(null);
                    else if (correctIdx != null && correctIdx > j) setCorrectIdx(correctIdx - 1);
                  }}
                  className="h-9 w-9 rounded-lg hover:bg-white/[0.04] inline-flex items-center justify-center text-white/65 hover:text-red-300 touch-manipulation"
                  aria-label="Remove option"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {options.length < 6 && (
              <button
                type="button"
                onClick={() => setOptions([...options, ''])}
                className="text-[11px] font-semibold text-white/85 hover:text-white touch-manipulation"
              >
                + Add option
              </button>
            )}
          </div>
        </FieldSm>
      )}

      {q.question_kind === 'true_false' && (
        <FieldSm label="Correct answer">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'True', idx: 0 },
              { label: 'False', idx: 1 },
            ].map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setCorrectIdx(c.idx)}
                className={cn(
                  'h-10 rounded-lg text-[13px] font-semibold border touch-manipulation',
                  correctIdx === c.idx
                    ? 'bg-emerald-500/[0.10] border-emerald-400/40 text-emerald-200'
                    : 'bg-[hsl(0_0%_15%)] border-white/[0.10] text-white hover:bg-white/[0.04]'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </FieldSm>
      )}

      {(q.question_kind === 'calculation' ||
        q.question_kind === 'short_answer' ||
        q.question_kind === 'long_answer' ||
        q.question_kind === 'scenario') && (
        <FieldSm
          label={
            q.question_kind === 'calculation'
              ? 'Expected answer (JSON: numeric_value / tolerance / units / working_required)'
              : 'Expected answer outline (JSON, optional)'
          }
        >
          <textarea
            value={expectedJson}
            onChange={(e) => setExpectedJson(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[11px] font-mono text-white px-3 py-2 resize-y touch-manipulation"
            placeholder={q.question_kind === 'calculation' ? '{"numeric_value": 24.5, "tolerance": 0.5, "units": "A"}' : '{"min_words": 60}'}
          />
        </FieldSm>
      )}

      {(q.question_kind === 'short_answer' ||
        q.question_kind === 'long_answer' ||
        q.question_kind === 'scenario') && (
        <FieldSm label="Marking guidance (used by AI to grade)">
          <textarea
            value={marking}
            onChange={(e) => setMarking(e.target.value)}
            rows={2}
            placeholder="What full marks looks like — concrete, BS 7671 cited where relevant."
            className="w-full rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[12px] text-white px-3 py-2 leading-relaxed resize-y touch-manipulation"
          />
        </FieldSm>
      )}

      <FieldSm label="Explanation shown after answering">
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={2}
          className="w-full rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[12px] text-white px-3 py-2 leading-relaxed resize-y touch-manipulation"
        />
      </FieldSm>

      <div className="grid grid-cols-2 gap-2">
        <FieldSm label="AC reference">
          <input
            type="text"
            value={acRef}
            onChange={(e) => setAcRef(e.target.value)}
            placeholder="e.g. K3.2"
            className="w-full h-9 rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[12px] text-white px-3 touch-manipulation"
          />
        </FieldSm>
        <FieldSm label="Points">
          <input
            type="number"
            min={1}
            max={20}
            value={points}
            onChange={(e) =>
              setPoints(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
            }
            className="w-full h-9 rounded-lg bg-[hsl(0_0%_15%)] border border-white/[0.10] focus:border-elec-yellow text-[12px] tabular-nums text-white px-3 touch-manipulation"
          />
        </FieldSm>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="h-9 px-3 rounded-full text-[11.5px] font-semibold text-white hover:bg-white/[0.06] touch-manipulation"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !text.trim()}
          className="h-9 px-3 rounded-full bg-elec-yellow text-black text-[11.5px] font-semibold hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}

function FieldSm({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85">
        {label}
      </div>
      {children}
    </label>
  );
}

function labelForKind(k: string): string {
  switch (k) {
    case 'multi_choice':
      return 'Multi-choice';
    case 'true_false':
      return 'T/F';
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
