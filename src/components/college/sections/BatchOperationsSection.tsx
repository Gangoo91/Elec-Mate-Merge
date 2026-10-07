/**
 * BatchOperationsSection — grades, ILP reviews or a message for a whole
 * cohort in one pass.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   cohort → what to run → the one form → run it
 *
 * What went: the PageHero, three numbered `01 · Cohort` cards on a
 * `bg-[hsl(0_0%_12%)]` grid, and THREE solid volt submit buttons on one
 * screen. The three batches are now chips; one form shows at a time, so the
 * screen has one primary and a phone does not scroll past two forms to reach
 * the third. Every batch keeps its state while you switch.
 *
 * Three things corrected:
 *
 * 1. The cohort was chosen once, on first render, from a list that had not
 *    loaded yet — so on a cold load nothing was selected and every form was
 *    empty until you tapped a cohort. It now defaults to the first active
 *    cohort as soon as cohorts arrive.
 *
 * 2. "Overdue ILP review" meant `last_reviewed` older than six weeks here and
 *    `review_date` in the past everywhere else (the Assessment hub KPI, the
 *    work queue, ILP management — `getOverdueILPReviews`). The two lists
 *    disagreed. This page now uses the same rule as the rest of the hub.
 *
 * 3. "Mark all reviewed" only stamped `last_reviewed`, so by the hub's rule
 *    every plan stayed overdue afterwards. It now also sets the next
 *    `review_date` (six weeks out, the cadence this page already assumed) and
 *    refreshes the ILP queries so the hub's count drops with it.
 */
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegePageHeader,
  CollegeSectionTitle,
  chipCn as kitChipCn,
} from '@/components/college/ui/CollegeUi';
import {
  inputCn as fieldInputCn,
  labelCn as fieldLabelCn,
  textareaCn as fieldTextareaCn,
} from '@/components/forms/fieldStyles';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BatchOperationsSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type Operation = 'grades' | 'ilp' | 'message';
const GRADES = ['Distinction', 'Merit', 'Pass', 'Refer'] as const;
const REVIEW_CADENCE_DAYS = 42;

const chipCn = (active: boolean) => cn(kitChipCn(active), 'inline-flex h-11 items-center whitespace-nowrap');
const primaryCn = COLLEGE_BTN_PRIMARY;
const inputCn = fieldInputCn;
const textareaCn = fieldTextareaCn;
const labelCn = fieldLabelCn;

const HELP: PageHelpContent = {
  id: 'college-batch-operations',
  title: 'Bulk jobs',
  what: 'Do one job for a whole cohort in one pass: record the same grade for many learners, clear overdue ILP reviews, or send everyone a message.',
  steps: [
    { title: 'Pick the cohort', body: 'The first active cohort is picked for you. The number beside each is its active learners.' },
    { title: 'Pick the job', body: 'Record grades, ILP reviews (with how many are overdue), or Message the cohort.' },
    { title: 'Check and run', body: 'The line above the button says exactly what will happen and to whom before you tap it.' },
  ],
  notes: [
    { title: 'ILP reviews', body: `Marking a plan reviewed stamps today and sets the next review ${REVIEW_CADENCE_DAYS / 7} weeks out.` },
    { title: 'Messages', body: 'Only learners with an app account receive a message. The confirmation says how many were skipped.' },
  ],
};

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Tick-list of learners, 44px rows, used by two of the three batches. */
function LearnerPicker({
  learners,
  selected,
  onToggle,
  onToggleAll,
}: {
  learners: Array<{ id: string; name: string }>;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}) {
  const allSelected = learners.length > 0 && selected.size === learners.length;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className={labelCn}>
          Learners · {selected.size}/{learners.length}
        </span>
        {learners.length > 0 && (
          <button
            type="button"
            onClick={onToggleAll}
            className="-my-1 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
          >
            {allSelected ? 'Clear all' : 'Select all'}
          </button>
        )}
      </div>
      {learners.length === 0 ? (
        <p className="py-3 text-[13px] text-white">No active learners in this cohort.</p>
      ) : (
        <ul className="max-h-[360px] divide-y divide-white/[0.06] overflow-y-auto rounded-2xl border border-white/[0.10]">
          {learners.map((learner) => {
            const on = selected.has(learner.id);
            return (
              <li key={learner.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => onToggle(learner.id)}
                  className="flex h-11 w-full items-center gap-3 px-4 text-left transition-colors touch-manipulation hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold',
                      on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.25]'
                    )}
                  >
                    {on ? '✓' : ''}
                  </span>
                  <span className="truncate text-[13.5px] text-white">{learner.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function BatchOperationsSection({ onNavigate: _onNavigate }: BatchOperationsSectionProps) {
  void _onNavigate;
  const { cohorts, students, ilps } = useCollegeSupabase();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );
  const [selectedCohortId, setSelectedCohortId] = useState<string>('');
  // Cohorts load after first render; pick the first active one once they do.
  useEffect(() => {
    if (!selectedCohortId && activeCohorts.length > 0) setSelectedCohortId(activeCohorts[0].id);
  }, [activeCohorts, selectedCohortId]);

  const [operation, setOperation] = useState<Operation>('grades');

  const cohortStudents = useMemo(
    () =>
      students.filter(
        (s) => s.cohort_id === selectedCohortId && (s.status ?? '').toLowerCase() === 'active'
      ),
    [students, selectedCohortId]
  );
  const selectedCohort = cohorts.find((c) => c.id === selectedCohortId);
  const activeCountFor = (cohortId: string) =>
    students.filter((s) => s.cohort_id === cohortId && (s.status ?? '').toLowerCase() === 'active').length;

  const [unitName, setUnitName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<(typeof GRADES)[number]>('Pass');
  const [batchFeedback, setBatchFeedback] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());
  const [gradeSubmitting, setGradeSubmitting] = useState(false);

  const [ilpSubmitting, setIlpSubmitting] = useState(false);

  const [notifMessage, setNotifMessage] = useState('');
  const [notifRecipients, setNotifRecipients] = useState<'all' | 'selected'>('all');
  const [notifSelectedIds, setNotifSelectedIds] = useState<Set<string>>(new Set());
  const [notifSending, setNotifSending] = useState(false);

  const handleCohortChange = (cohortId: string) => {
    setSelectedCohortId(cohortId);
    setSelectedStudentIds(new Set());
    setNotifSelectedIds(new Set());
  };

  const toggleIn = (setter: React.Dispatch<React.SetStateAction<Set<string>>>) => (id: string) =>
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleAllIn = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, current: Set<string>) => () =>
    setter(
      current.size === cohortStudents.length ? new Set() : new Set(cohortStudents.map((s) => s.id))
    );

  // Same rule as getOverdueILPReviews: current, active, review date passed.
  const overdueILPs = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const cohortStudentIds = new Set(cohortStudents.map((s) => s.id));
    return ilps
      .filter(
        (ilp) =>
          !!ilp.student_id &&
          cohortStudentIds.has(ilp.student_id) &&
          (ilp.status ?? '').toLowerCase() === 'active' &&
          !!ilp.review_date &&
          ilp.review_date < today
      )
      .sort((a, b) => (a.review_date ?? '').localeCompare(b.review_date ?? ''));
  }, [ilps, cohortStudents]);

  const handleSubmitGrades = async () => {
    if (!unitName.trim() || selectedStudentIds.size === 0) {
      toast({
        title: 'Missing information',
        description: 'Enter a unit name and select at least one learner.',
        variant: 'destructive',
      });
      return;
    }
    setGradeSubmitting(true);
    try {
      const gradeRows = Array.from(selectedStudentIds).map((studentId) => ({
        student_id: studentId,
        unit_name: unitName.trim(),
        grade: selectedGrade,
        feedback: batchFeedback.trim() || null,
        status: 'Graded',
        assessed_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from('college_grades').insert(gradeRows);
      if (error) throw error;
      toast({
        title: 'Grades recorded',
        description: `${gradeRows.length} grade${gradeRows.length === 1 ? '' : 's'} recorded for ${unitName.trim()}.`,
      });
      void queryClient.invalidateQueries({ queryKey: ['college-grades'] });
      setUnitName('');
      setBatchFeedback('');
      setSelectedStudentIds(new Set());
    } catch (err) {
      toast({
        title: 'Could not record grades',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setGradeSubmitting(false);
    }
  };

  const handleBatchILPReview = async () => {
    if (overdueILPs.length === 0) return;
    setIlpSubmitting(true);
    try {
      const now = new Date();
      const next = new Date(now.getTime() + REVIEW_CADENCE_DAYS * 86_400_000).toISOString().slice(0, 10);
      const { error } = await supabase
        .from('college_ilps')
        .update({ last_reviewed: now.toISOString(), review_date: next })
        .in(
          'id',
          overdueILPs.map((i) => i.id)
        );
      if (error) throw error;
      toast({
        title: 'Reviews recorded',
        description: `${overdueILPs.length} plan${overdueILPs.length === 1 ? '' : 's'} marked reviewed today · next review ${shortDate(next)}.`,
      });
      void queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    } catch (err) {
      toast({
        title: 'Could not update the plans',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIlpSubmitting(false);
    }
  };

  const notifRecipientCount = notifRecipients === 'all' ? cohortStudents.length : notifSelectedIds.size;

  const handleSendNotification = async () => {
    const ids = notifRecipients === 'all' ? cohortStudents.map((s) => s.id) : [...notifSelectedIds];
    if (!notifMessage.trim() || ids.length === 0) {
      toast({
        title: 'Missing information',
        description: 'Write a message and choose who receives it.',
        variant: 'destructive',
      });
      return;
    }
    setNotifSending(true);
    try {
      // One server call: it checks you are staff at each learner's college,
      // writes their bell and pushes with their notification settings
      // (ELE-1913). Writing push_notification_log from here never pushed and
      // never reached the bell.
      const { data, error } = await supabase.rpc('send_college_announcement' as never, {
        p_student_ids: ids,
        p_message: notifMessage.trim(),
      } as never);
      if (error) throw error;
      const res = (data ?? {}) as { sent?: number; no_account?: number };
      const sent = res.sent ?? 0;
      const skipped = res.no_account ?? 0;
      if (sent === 0) {
        toast({
          title: 'No linked accounts',
          description: 'None of the chosen learners have an app account yet.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Message sent',
        description: `Sent to ${sent} learner${sent === 1 ? '' : 's'}${
          skipped > 0 ? ` (${skipped} without an app account skipped)` : ''
        }.`,
      });
      setNotifMessage('');
    } catch (e) {
      toast({
        title: 'Could not send',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setNotifSending(false);
    }
  };

  const cardCn = COLLEGE_CARD;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      <CollegePageHeader
        eyebrow="Courses and admin"
        title="Bulk jobs"
        description="Grades, ILP reviews or a message for a whole cohort, in one pass."
        help={HELP}
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8">
      <div className="space-y-6">
      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle title="Cohort" />
        {activeCohorts.length === 0 ? (
          <motion.div variants={itemVariants} className={cardCn}>
            <p className="text-[13px] text-white">No active cohorts yet. Set one up under People.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2"
          >
            {activeCohorts.map((cohort) => (
              <button
                key={cohort.id}
                type="button"
                onClick={() => handleCohortChange(cohort.id)}
                className={chipCn(cohort.id === selectedCohortId)}
              >
                {cohort.name} · {activeCountFor(cohort.id)}
              </button>
            ))}
          </motion.div>
        )}
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle title="What to run" />
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-2"
        >
          {(
            [
              ['grades', 'Record grades'],
              ['ilp', `ILP reviews${overdueILPs.length > 0 ? ` · ${overdueILPs.length} overdue` : ''}`],
              ['message', 'Message the cohort'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setOperation(value)}
              className={chipCn(operation === value)}
            >
              {label}
            </button>
          ))}
        </motion.div>
      </motion.section>
      </div>

      <motion.section variants={itemVariants} className="min-w-0">
        {operation === 'grades' && (
          <motion.div variants={itemVariants} className={cn(cardCn, 'space-y-4')}>
            <div>
              <label htmlFor="batch-unit" className={labelCn}>
                Unit or assessment
              </label>
              <input
                id="batch-unit"
                type="text"
                placeholder="e.g. Unit 201 Health and safety"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className={inputCn}
              />
            </div>

            <div>
              <span className={labelCn}>Grade</span>
              <div className="flex flex-wrap gap-2">
                {GRADES.map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedGrade(grade)}
                    className={chipCn(selectedGrade === grade)}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <LearnerPicker
              learners={cohortStudents}
              selected={selectedStudentIds}
              onToggle={toggleIn(setSelectedStudentIds)}
              onToggleAll={toggleAllIn(setSelectedStudentIds, selectedStudentIds)}
            />

            <div>
              <label htmlFor="batch-feedback" className={labelCn}>
                Feedback for every selected learner
              </label>
              <textarea
                id="batch-feedback"
                placeholder="Optional. The same feedback goes on each grade"
                value={batchFeedback}
                onChange={(e) => setBatchFeedback(e.target.value)}
                rows={3}
                className={textareaCn}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-white">
                {selectedStudentIds.size === 0
                  ? 'Choose the learners to grade.'
                  : `${selectedGrade} for ${selectedStudentIds.size} learner${selectedStudentIds.size === 1 ? '' : 's'}${
                      selectedCohort ? ` in ${selectedCohort.name}` : ''
                    }.`}
              </p>
              <button
                type="button"
                onClick={handleSubmitGrades}
                disabled={gradeSubmitting || selectedStudentIds.size === 0 || !unitName.trim()}
                className={primaryCn}
              >
                {gradeSubmitting ? 'Recording…' : `Record ${selectedStudentIds.size || ''} grade${selectedStudentIds.size === 1 ? '' : 's'}`}
              </button>
            </div>
          </motion.div>
        )}

        {operation === 'ilp' && (
          <motion.div variants={itemVariants} className={cn(cardCn, 'space-y-4')}>
            {overdueILPs.length === 0 ? (
              <p className="text-[13px] text-white">
                No overdue reviews{selectedCohort ? ` in ${selectedCohort.name}` : ''}. Every current plan
                has a review date ahead of it.
              </p>
            ) : (
              <>
                <p className="text-[13px] text-white">
                  {overdueILPs.length} plan{overdueILPs.length === 1 ? ' is' : 's are'} past{' '}
                  {overdueILPs.length === 1 ? 'its' : 'their'} review date. Marking them reviewed stamps
                  today and sets the next review {REVIEW_CADENCE_DAYS / 7} weeks out.
                </p>
                <ul className="-mx-5 divide-y divide-white/[0.06] border-y border-white/[0.06] sm:-mx-6">
                  {overdueILPs.map((ilp) => {
                    const student = students.find((s) => s.id === ilp.student_id);
                    return (
                      <li key={ilp.id} className="flex min-h-11 items-center gap-3 px-5 py-2.5 sm:px-6">
                        <span aria-hidden className="h-8 w-[3px] shrink-0 rounded-full bg-orange-400" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                            {student?.name ?? 'Unknown learner'}
                          </span>
                          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                            {ilp.last_reviewed
                              ? `Last reviewed ${shortDate(ilp.last_reviewed)}`
                              : 'Never reviewed'}
                          </span>
                        </span>
                        <span className="shrink-0 text-[12px] font-semibold tabular-nums text-orange-400">
                          Due {ilp.review_date ? shortDate(ilp.review_date) : '—'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleBatchILPReview}
                    disabled={ilpSubmitting}
                    className={primaryCn}
                  >
                    {ilpSubmitting ? 'Updating…' : `Mark all ${overdueILPs.length} reviewed`}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {operation === 'message' && (
          <motion.div variants={itemVariants} className={cn(cardCn, 'space-y-4')}>
            <div>
              <label htmlFor="batch-message" className={labelCn}>
                Message
              </label>
              <textarea
                id="batch-message"
                placeholder="Goes to each learner's app as a notification"
                value={notifMessage}
                onChange={(e) => setNotifMessage(e.target.value)}
                rows={4}
                className={textareaCn}
              />
            </div>

            <div>
              <span className={labelCn}>Recipients</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['all', 'Everyone in the cohort'],
                    ['selected', 'Chosen learners'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setNotifRecipients(value)}
                    className={chipCn(notifRecipients === value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {notifRecipients === 'selected' && (
              <LearnerPicker
                learners={cohortStudents}
                selected={notifSelectedIds}
                onToggle={toggleIn(setNotifSelectedIds)}
                onToggleAll={toggleAllIn(setNotifSelectedIds, notifSelectedIds)}
              />
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-white">
                Sending to {notifRecipientCount} learner{notifRecipientCount === 1 ? '' : 's'}
                {selectedCohort ? ` in ${selectedCohort.name}` : ''}. Only learners with an app account
                receive it.
              </p>
              <button
                type="button"
                onClick={handleSendNotification}
                disabled={notifSending || !notifMessage.trim() || notifRecipientCount === 0}
                className={primaryCn}
              >
                {notifSending ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </motion.div>
        )}
      </motion.section>
      </div>
    </motion.div>
  );
}
