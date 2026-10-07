import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, infoPanelCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { CollegeCohort, CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import { londonToday } from '@/hooks/useTripartiteReviews';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { norm } from './peopleKit';

/* ==========================================================================
   LearnerLifecycleSheet — moving cohort, a break in learning, withdrawing,
   completing and coming back, as first-class actions (ELE-1902, the part
   the current data allows).

   What each one writes to college_students (nothing is deleted):
     move      cohort_id                      everything else stays with them
               (+ college_student_assignments.cohort_id / cohort_name for
               the learner's assignment rows, so "mine" and reports follow)
     break     status 'On Break'     off live registers until back
     withdraw  status 'Withdrawn' + learning_actual_end_date
     complete  status 'Completed' + learning_actual_end_date
     transfer  status 'Transferred' + learning_actual_end_date
     return    status 'Active', end date cleared

   Each write asks for the row back (.select) so an RLS-blocked update is a
   visible failure, not a silent "done". The wider effects run in the database
   (trg_college_student_lifecycle, migration 20261008057200) so the released
   app gets them too: share, assessor, employer and witness links paused and
   resumed, open reviews stood down, the funding episode written, OTJ hours
   frozen at the leave date, the learner told to download their record, and
   college access (seats) re-synced from the status. The sheet reads back the
   history row the trigger wrote and says what happened.
   ========================================================================== */

export type LifecycleAction = 'move' | 'break' | 'withdraw' | 'complete' | 'transfer' | 'return';

const ACTIONS: Array<{ value: LifecycleAction; label: string }> = [
  { value: 'move', label: 'Move cohort' },
  { value: 'break', label: 'On Break' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'complete', label: 'Completed' },
  { value: 'transfer', label: 'Transferred' },
  { value: 'return', label: 'Back to active' },
];

const EXPLAIN: Record<LifecycleAction, string[]> = {
  move: [
    'They keep everything: portfolio, hours, reviews and history. The move is logged with both cohorts.',
    'Their timetable, registers and new quizzes follow the new cohort from today. Quizzes they already sat stay on their record.',
  ],
  break: [
    'For a planned pause (illness, caring, a change of employer). They come off live registers until you bring them back.',
    'Share links, assessor and employer links and open progress reviews are paused, and put back when they return.',
    'A break is added to their funding history. Nothing is deleted.',
  ],
  withdraw: [
    'They have left the programme. Their record is kept for audit and funding, and you can reverse this later.',
    'Share links, assessor and employer links and open progress reviews are paused. Their off-the-job hours stop counting after the last day.',
    'They are told they can download their record, and their college place is freed.',
  ],
  complete: [
    'They have finished. The record is kept and stays in your reports and the evidence pack.',
    'Live links are paused and their off-the-job hours are frozen at the date completed.',
    'They are told they can download their record, and their college place is freed.',
  ],
  transfer: [
    'They are moving to another provider. Their record is kept here and recorded as a withdrawal in their funding history.',
    'Live links are paused and their off-the-job hours are frozen at the last day.',
    'Give the new provider the transfer pack. The learner is told they can download their own copy.',
  ],
  return: [
    'Back on the roll as an active learner, on registers and in every list again.',
    'Links that were paused when they left are put back, unless they have expired since.',
  ],
};

/** What the database did, read back from the history row the trigger wrote. */
interface LifecycleEffects {
  links_paused?: number;
  links_resumed?: number;
  links_expired?: number;
  otj_frozen_at?: string;
  funding_episode?: string;
  learner_told?: boolean;
  quizzes_kept?: number;
}

const LEAVING: LifecycleAction[] = ['withdraw', 'complete', 'transfer'];

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function effectLines(e: LifecycleEffects | null, first: string): string[] {
  if (!e) return [];
  const out: string[] = [];
  const n = (x: number, one: string, many: string) => `${x} ${x === 1 ? one : many}`;
  if (e.links_paused) out.push(`${n(e.links_paused, 'link or review', 'links and reviews')} paused.`);
  if (e.links_resumed) out.push(`${n(e.links_resumed, 'link or review', 'links and reviews')} put back.`);
  if (e.links_expired) out.push(`${n(e.links_expired, 'link had', 'links had')} expired while paused, so ${e.links_expired === 1 ? 'it stays' : 'they stay'} off.`);
  if (e.otj_frozen_at) out.push(`Off-the-job hours frozen at ${fmtDate(e.otj_frozen_at)}.`);
  if (e.funding_episode) out.push('Added to their funding history.');
  if (e.learner_told) out.push(`${first} has been told they can download their record.`);
  if (e.quizzes_kept) out.push(`${n(e.quizzes_kept, 'quiz', 'quizzes')} from the old cohort kept on their record.`);
  return out;
}

// The UK date, not UTC: just after midnight in summer, UTC is still yesterday.
const today = () => londonToday();

export function LearnerLifecycleSheet({
  student,
  cohorts,
  students = [],
  open,
  onOpenChange,
  initialAction = 'move',
  onOpenExportPack,
  onChanged,
}: {
  student: CollegeStudent | null;
  cohorts: CollegeCohort[];
  /** The roll, to warn when the cohort they are moving into is full. */
  students?: CollegeStudent[];
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initialAction?: LifecycleAction;
  /** Opens the learner's export pack sheet (Student 360). Shown after they leave. */
  onOpenExportPack?: () => void;
  /** Called after a successful change, so the page can reload the learner. */
  onChanged?: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [action, setAction] = useState<LifecycleAction>(initialAction);
  const [cohortId, setCohortId] = useState('');
  const [endDate, setEndDate] = useState(today());
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<{ action: LifecycleAction; title: string; lines: string[] } | null>(null);
  const [packBusy, setPackBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setAction(initialAction);
      setCohortId('');
      setEndDate(today());
      setDone(null);
    }
  }, [open, initialAction]);

  if (!student) return null;
  const status = norm(student.status) || 'active';
  const isActive = status === 'active';
  const current = cohorts.find((c) => c.id === student.cohort_id)?.name ?? 'No cohort';
  const choices = cohorts.filter((c) => c.id !== student.cohort_id && norm(c.status) !== 'completed');

  const first = student.name.split(' ')[0] || student.name;
  const onBreak = status === 'on break' || status === 'break in learning';
  const allowed: LifecycleAction[] = isActive
    ? ['move', 'break', 'withdraw', 'complete', 'transfer']
    : onBreak
      ? ['return', 'move', 'withdraw', 'complete', 'transfer']
      : ['return', 'move'];
  const available = ACTIONS.filter((a) => allowed.includes(a.value));
  const effective: LifecycleAction = allowed.includes(action) ? action : allowed[0];

  // Warn (never block) when the cohort they are joining is already at its places.
  const target = effective === 'move' ? cohorts.find((c) => c.id === cohortId) ?? null : null;
  const targetCount = target
    ? students.filter((s) => s.cohort_id === target.id && norm(s.status) === 'active').length
    : 0;
  const targetFull = !!target && typeof target.max_students === 'number' && target.max_students > 0 && targetCount >= target.max_students;

  const canSave = effective === 'move' ? !!cohortId : LEAVING.includes(effective) ? !!endDate : true;

  const save = async () => {
    const action = effective;
    setSaving(true);
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (action === 'move') patch.cohort_id = cohortId;
    if (action === 'break') patch.status = 'On Break';
    if (action === 'withdraw') Object.assign(patch, { status: 'Withdrawn', learning_actual_end_date: endDate });
    if (action === 'complete') Object.assign(patch, { status: 'Completed', learning_actual_end_date: endDate });
    if (action === 'transfer') Object.assign(patch, { status: 'Transferred', learning_actual_end_date: endDate });
    if (action === 'return') Object.assign(patch, { status: 'Active', learning_actual_end_date: null });
    const { data, error } = await supabase
      .from('college_students')
      .update(patch as never)
      .eq('id', student.id)
      .select('id');
    setSaving(false);
    if (error || !data || data.length === 0) {
      toast({
        title: 'Not saved',
        description: error?.message ?? 'You do not have permission to change this learner.',
        variant: 'destructive',
      });
      return;
    }
    // Their assignment rows carry the cohort too (text id + name). Keep them in
    // step so "mine", the marking queue and reports follow the move. RLS lets
    // same-college staff update these; a failure here is reported, not fatal.
    let assignmentNote: string | null = null;
    if (action === 'move' && student.user_id) {
      const newName = cohorts.find((c) => c.id === cohortId)?.name ?? null;
      const { error: aErr } = await supabase
        .from('college_student_assignments')
        .update({ cohort_id: cohortId, cohort_name: newName, updated_at: new Date().toISOString() } as never)
        .eq('student_id', student.user_id);
      if (aErr) assignmentNote = 'Their tutor assignment still shows the old cohort. Update it from Assign staff.';
    }
    // Read back what the database did (links paused, hours frozen, learner told).
    const { data: ev } = await supabase
      .from('college_student_lifecycle_events' as never)
      .select('effects, created_at')
      .eq('student_id', student.id)
      .eq('kind', action === 'move' ? 'cohort_move' : 'status')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const lines = effectLines(((ev as { effects?: LifecycleEffects } | null)?.effects ?? null), first);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['college-students'] }),
      queryClient.invalidateQueries({ queryKey: ['college-my-assignments'] }),
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] }),
    ]);
    onChanged?.();
    const titles: Record<LifecycleAction, string> = {
      move: `${student.name} moved to ${cohorts.find((c) => c.id === cohortId)?.name ?? 'the new cohort'}`,
      break: `${student.name} is on a break in learning`,
      withdraw: `${student.name} withdrawn`,
      complete: `${student.name} marked completed`,
      transfer: `${student.name} marked as transferred`,
      return: `${student.name} is back on the roll`,
    };
    if (LEAVING.includes(action)) {
      // Leaving: stay open on what happened and offer their record.
      setDone({ action, title: titles[action], lines: assignmentNote ? [...lines, assignmentNote] : lines });
      return;
    }
    toast({ title: titles[action], description: [...lines, assignmentNote].filter(Boolean).join(' ') || undefined });
    onOpenChange(false);
  };

  const downloadTransferPack = async () => {
    if (!student.user_id || packBusy) return;
    setPackBusy(true);
    try {
      await downloadLearnerDocument({ kind: 'transfer_pack', learnerId: student.user_id });
    } catch (e) {
      toast({ title: 'Could not make the PDF', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setPackBusy(false);
    }
  };

  if (done) {
    return (
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow="Learner"
        title={done.title}
        description="Their record is kept. Here is what changed and what to hand over."
        footer={
          <div className="flex gap-2">
            <button type="button" className={cn(COLLEGE_BTN_PRIMARY, 'flex-1 sm:flex-none')} onClick={() => onOpenChange(false)}>
              Done
            </button>
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className={cn(infoPanelCn, 'self-start')}>
            <p className="text-[13px] font-semibold text-white">What happened</p>
            {done.lines.length ? (
              <ul className="mt-2 space-y-1.5">
                {done.lines.map((l) => (
                  <li key={l} className="text-[13px] leading-relaxed text-white">{l}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-[13px] leading-relaxed text-white">Their status is saved. Nothing else needed changing.</p>
            )}
          </div>
          <div className="space-y-3">
            <p className={labelCn}>Their record</p>
            {student.user_id ? (
              <>
                <p className="text-[13.5px] leading-relaxed text-white">
                  {done.action === 'transfer'
                    ? 'Send the transfer pack to the new provider. It has their units, decisions, evidence, hours and reviews.'
                    : `Keep a copy for your files, or give ${first} theirs now.`}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <button type="button" className={cn(COLLEGE_BTN_PRIMARY, 'h-11')} disabled={packBusy} onClick={() => void downloadTransferPack()}>
                    {packBusy ? 'Making the PDF…' : 'Download transfer pack'}
                  </button>
                  {onOpenExportPack && (
                    <button
                      type="button"
                      className={cn(COLLEGE_BTN, 'h-11')}
                      onClick={() => {
                        onOpenChange(false);
                        setTimeout(onOpenExportPack, 150);
                      }}
                    >
                      Export pack with files
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p className="text-[13.5px] leading-relaxed text-white">
                {first} never signed in to the app, so there is no portfolio to export. Their college record stays here.
              </p>
            )}
          </div>
        </div>
      </FormSheet>
    );
  }

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Learner"
      title={student.name}
      description={`${current} · ${student.status ?? 'Active'}`}
      footer={
        <div className="flex gap-2">
          <button type="button" className={cn(COLLEGE_BTN, 'flex-1 sm:flex-none')} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={cn(
              COLLEGE_BTN_PRIMARY,
              'flex-1 sm:flex-none',
              (effective === 'withdraw' || effective === 'transfer') && 'bg-red-500 text-white'
            )}
            disabled={!canSave || saving}
            onClick={save}
          >
            {saving ? 'Saving…' : ACTIONS.find((a) => a.value === effective)?.label}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-5">
          <div>
            <p className={labelCn}>What is changing</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {available.map((a) => (
                <button key={a.value} type="button" className={cn(chipCn(effective === a.value), 'h-11')} onClick={() => setAction(a.value)}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {effective === 'move' && (
            <div>
              <p className={labelCn}>New cohort</p>
              {choices.length === 0 ? (
                <p className="text-[13.5px] text-white">There is no other cohort to move them to. Create one under Cohorts first.</p>
              ) : choices.length <= 6 ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {choices.map((c) => (
                    <button key={c.id} type="button" className={cn(chipCn(cohortId === c.id), 'h-11')} onClick={() => setCohortId(c.id)}>
                      {c.name}
                    </button>
                  ))}
                </div>
              ) : (
                <MobileSelectPicker
                  value={cohortId}
                  onValueChange={setCohortId}
                  title="New cohort"
                  placeholder="Choose a cohort"
                  options={choices.map((c) => ({ value: c.id, label: c.name }))}
                />
              )}
              {targetFull && target && (
                <p role="status" className="mt-3 rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-[13px] text-white">
                  {target.name} already has {targetCount} of {target.max_students} places filled. You can still move them; consider raising the places on the cohort.
                </p>
              )}
            </div>
          )}

          {LEAVING.includes(effective) && (
            <div className="max-w-xs">
              <label className={labelCn} htmlFor="lifecycle-end">
                {effective === 'complete' ? 'Date completed' : 'Last day in learning'}
              </label>
              <input
                id="lifecycle-end"
                type="date"
                value={endDate}
                max={today()}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputCn}
              />
            </div>
          )}
        </div>

        <div className={cn(infoPanelCn, 'self-start')}>
          <p className="text-[13px] font-semibold text-white">What this does</p>
          <ul className="mt-1 space-y-1.5">
            {EXPLAIN[effective].map((l) => (
              <li key={l} className="text-[13px] leading-relaxed text-white">{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </FormSheet>
  );
}
