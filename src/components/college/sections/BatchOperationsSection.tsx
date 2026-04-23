/**
 * BatchOperationsSection — Bulk actions for tutors managing cohorts.
 * Editorial redesign, typography-led, no icons.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

interface BatchOperationsSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

export function BatchOperationsSection({ onNavigate: _onNavigate }: BatchOperationsSectionProps) {
  const { cohorts, students, ilps } = useCollegeSupabase();
  const { toast } = useToast();

  const activeCohorts = cohorts.filter((c) => c.status === 'Active');
  const [selectedCohortId, setSelectedCohortId] = useState<string>(activeCohorts[0]?.id || '');

  const cohortStudents = useMemo(
    () => students.filter((s) => s.cohort_id === selectedCohortId && s.status === 'Active'),
    [students, selectedCohortId]
  );
  const selectedCohort = cohorts.find((c) => c.id === selectedCohortId);

  const [unitName, setUnitName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('Pass');
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

  const handleToggleAllGrade = () => {
    if (selectedStudentIds.size === cohortStudents.length) setSelectedStudentIds(new Set());
    else setSelectedStudentIds(new Set(cohortStudents.map((s) => s.id)));
  };
  const handleToggleStudentGrade = (id: string) => {
    setSelectedStudentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleAllNotif = () => {
    if (notifSelectedIds.size === cohortStudents.length) setNotifSelectedIds(new Set());
    else setNotifSelectedIds(new Set(cohortStudents.map((s) => s.id)));
  };
  const handleToggleStudentNotif = (id: string) => {
    setNotifSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const overdueILPs = useMemo(() => {
    const sixWeeksAgo = new Date();
    sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42);
    const cohortStudentIds = new Set(cohortStudents.map((s) => s.id));
    return ilps.filter(
      (ilp) =>
        cohortStudentIds.has(ilp.student_id) &&
        (!ilp.last_reviewed || new Date(ilp.last_reviewed) < sixWeeksAgo)
    );
  }, [ilps, cohortStudents]);

  const handleSubmitGrades = async () => {
    if (!unitName.trim() || selectedStudentIds.size === 0) {
      toast({
        title: 'Missing information',
        description: 'Enter a unit name and select students.',
        variant: 'destructive',
      });
      return;
    }
    setGradeSubmitting(true);
    try {
      const gradeRows = Array.from(selectedStudentIds).map((studentId) => ({
        student_id: studentId,
        unit_name: unitName,
        grade: selectedGrade,
        feedback: batchFeedback || null,
        status: 'Graded',
        assessed_at: new Date().toISOString(),
      }));
      const { error } = await (supabase as any).from('college_grades').insert(gradeRows);
      if (error) throw error;
      toast({
        title: 'Grades submitted',
        description: `${gradeRows.length} grades recorded for ${unitName}.`,
      });
      setUnitName('');
      setBatchFeedback('');
      setSelectedStudentIds(new Set());
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to submit grades.',
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
      const today = new Date().toISOString().split('T')[0];
      for (const ilp of overdueILPs) {
        await (supabase as any)
          .from('college_ilps')
          .update({ last_reviewed: today })
          .eq('id', ilp.id);
      }
      toast({
        title: 'ILPs updated',
        description: `${overdueILPs.length} ILPs marked as reviewed today.`,
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update ILPs.',
        variant: 'destructive',
      });
    } finally {
      setIlpSubmitting(false);
    }
  };

  const handleSendNotification = () => {
    const recipientCount =
      notifRecipients === 'all' ? cohortStudents.length : notifSelectedIds.size;
    if (!notifMessage.trim() || recipientCount === 0) {
      toast({
        title: 'Missing information',
        description: 'Enter a message and ensure recipients are selected.',
        variant: 'destructive',
      });
      return;
    }
    setNotifSending(true);
    setTimeout(() => {
      toast({
        title: 'Notification sent',
        description: `Message sent to ${recipientCount} student${recipientCount !== 1 ? 's' : ''}.`,
      });
      setNotifMessage('');
      setNotifSending(false);
    }, 800);
  };

  const notifRecipientCount =
    notifRecipients === 'all' ? cohortStudents.length : notifSelectedIds.size;

  const gradeTone = (g: string): Tone =>
    g === 'Distinction'
      ? 'green'
      : g === 'Merit'
        ? 'blue'
        : g === 'Pass'
          ? 'yellow'
          : 'red';

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Tools · Batch Operations"
          title="Batch operations"
          description="Bulk grades, ILP reviews and notifications across whole cohorts in one go."
          tone="amber"
        />
      </motion.div>

      {/* COHORT SELECTOR */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Cohort" title="Select a cohort" />
        {activeCohorts.length === 0 ? (
          <EmptyState title="No active cohorts found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {activeCohorts.map((cohort, i) => {
              const count = students.filter(
                (s) => s.cohort_id === cohort.id && s.status === 'Active'
              ).length;
              const selected = cohort.id === selectedCohortId;
              return (
                <button
                  key={cohort.id}
                  onClick={() => handleCohortChange(cohort.id)}
                  className={cn(
                    'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 text-left touch-manipulation',
                    selected && 'bg-elec-yellow/[0.05] ring-1 ring-inset ring-elec-yellow/30'
                  )}
                >
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                    {String(i + 1).padStart(2, '0')} · Cohort
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium text-white truncate">
                        {cohort.name}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                        {count} active student{count !== 1 ? 's' : ''}
                      </div>
                    </div>
                    {selected && <Pill tone="yellow">Selected</Pill>}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* BATCH GRADE */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Grade Workflow"
          title="Batch grade"
          action="Select all"
          onAction={handleToggleAllGrade}
        />

        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Unit / Assessment
            </label>
            <input
              type="text"
              placeholder="e.g. Unit 201 — Health and Safety"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              className="mt-2 w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            />
          </div>

          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Grade
            </label>
            <div className="mt-2 flex gap-1.5 flex-wrap">
              {(['Distinction', 'Merit', 'Pass', 'Refer'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={cn(
                    'h-10 px-4 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                    selectedGrade === grade
                      ? 'bg-elec-yellow text-black'
                      : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white/70 hover:text-white'
                  )}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                Students ({selectedStudentIds.size}/{cohortStudents.length})
              </label>
            </div>
            {cohortStudents.length === 0 ? (
              <div className="py-6 text-center text-[12px] text-white/70 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl">
                No students in this cohort.
              </div>
            ) : (
              <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl max-h-[260px] overflow-y-auto divide-y divide-white/[0.04]">
                {cohortStudents.map((student) => {
                  const selected = selectedStudentIds.has(student.id);
                  return (
                    <button
                      key={student.id}
                      onClick={() => handleToggleStudentGrade(student.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors text-left touch-manipulation"
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all',
                          selected
                            ? 'bg-elec-yellow border-elec-yellow'
                            : 'border-white/20 bg-transparent'
                        )}
                      >
                        {selected && (
                          <span className="text-[9px] font-bold text-black leading-none">✓</span>
                        )}
                      </div>
                      <span className="text-[13px] text-white truncate">{student.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Feedback (applied to all)
            </label>
            <textarea
              placeholder="Shared feedback for all selected students…"
              value={batchFeedback}
              onChange={(e) => setBatchFeedback(e.target.value)}
              rows={3}
              className="mt-2 w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-white/75">
              {selectedGrade && (
                <span className="inline-flex items-center gap-2">
                  Grade ·
                  <Pill tone={gradeTone(selectedGrade)}>{selectedGrade}</Pill>
                </span>
              )}
            </div>
            <button
              onClick={handleSubmitGrades}
              disabled={gradeSubmitting || selectedStudentIds.size === 0 || !unitName.trim()}
              className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {gradeSubmitting
                ? 'Submitting…'
                : `Submit grades (${selectedStudentIds.size}) →`}
            </button>
          </div>
        </div>
      </motion.section>

      {/* BATCH ILP REVIEW */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="ILP Workflow"
          title="Batch ILP review"
          action={overdueILPs.length > 0 ? `Mark all reviewed` : undefined}
          onAction={overdueILPs.length > 0 ? handleBatchILPReview : undefined}
        />
        {overdueILPs.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
            <span aria-hidden className="w-[3px] h-10 rounded-full bg-emerald-400 shrink-0" />
            <div>
              <div className="text-[15px] font-medium text-white">All caught up</div>
              <div className="mt-0.5 text-[12px] text-white/75">
                All ILPs are up to date for this cohort.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
              <span aria-hidden className="w-[3px] h-10 rounded-full bg-amber-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium text-white">
                  {overdueILPs.length} overdue ILP review
                  {overdueILPs.length !== 1 ? 's' : ''}
                </div>
                <div className="mt-0.5 text-[12px] text-white/75">
                  Mark all as reviewed today, or action individually below.
                </div>
              </div>
              <button
                onClick={handleBatchILPReview}
                disabled={ilpSubmitting}
                className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation whitespace-nowrap"
              >
                {ilpSubmitting ? 'Updating…' : 'Mark all →'}
              </button>
            </div>

            <ListCard>
              {overdueILPs.map((ilp) => {
                const student = students.find((s) => s.id === ilp.student_id);
                return (
                  <ListRow
                    key={ilp.id}
                    accent="amber"
                    title={student?.name || 'Unknown'}
                    subtitle={
                      ilp.last_reviewed
                        ? `Last reviewed ${new Date(ilp.last_reviewed).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                        : 'Never reviewed'
                    }
                  />
                );
              })}
            </ListCard>
          </div>
        )}
      </motion.section>

      {/* BATCH NOTIFICATIONS */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Communications" title="Batch notifications" />

        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Message
            </label>
            <textarea
              placeholder="Type your notification…"
              value={notifMessage}
              onChange={(e) => setNotifMessage(e.target.value)}
              rows={4}
              className="mt-2 w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Recipients
            </label>
            <div className="mt-2 flex gap-1.5">
              {(['all', 'selected'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setNotifRecipients(opt)}
                  className={cn(
                    'h-10 px-4 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                    notifRecipients === opt
                      ? 'bg-elec-yellow text-black'
                      : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white/70 hover:text-white'
                  )}
                >
                  {opt === 'all' ? 'All in cohort' : 'Selected students'}
                </button>
              ))}
            </div>
          </div>

          {notifRecipients === 'selected' && (
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Selected ({notifSelectedIds.size}/{cohortStudents.length})
                </label>
                <button
                  onClick={handleToggleAllNotif}
                  className="text-[11.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  {notifSelectedIds.size === cohortStudents.length
                    ? 'Deselect all'
                    : 'Select all'}
                </button>
              </div>
              <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl max-h-[240px] overflow-y-auto divide-y divide-white/[0.04]">
                {cohortStudents.map((student) => {
                  const sel = notifSelectedIds.has(student.id);
                  return (
                    <button
                      key={student.id}
                      onClick={() => handleToggleStudentNotif(student.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors text-left touch-manipulation"
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all',
                          sel
                            ? 'bg-elec-yellow border-elec-yellow'
                            : 'border-white/20 bg-transparent'
                        )}
                      >
                        {sel && (
                          <span className="text-[9px] font-bold text-black leading-none">✓</span>
                        )}
                      </div>
                      <span className="text-[13px] text-white truncate">{student.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-4 py-3">
            <p className="text-[12px] text-white/60">
              Sending to{' '}
              <span className="font-semibold text-elec-yellow tabular-nums">
                {notifRecipientCount}
              </span>{' '}
              student{notifRecipientCount !== 1 ? 's' : ''}
              {selectedCohort ? ` in ${selectedCohort.name}` : ''}
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={handleSendNotification}
              disabled={notifSending || !notifMessage.trim() || notifRecipientCount === 0}
              className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {notifSending
                ? 'Sending…'
                : `Send notification (${notifRecipientCount}) →`}
            </button>
          </div>
        </div>
      </motion.section>
    </PageFrame>
  );
}
