/**
 * BatchOperationsSection — Bulk actions for tutors managing cohorts.
 * Batch grading, ILP reviews, and notifications.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CheckSquare,
  ClipboardCheck,
  Bell,
  ChevronRight,
  ChevronDown,
  Send,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BatchOperationsSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export function BatchOperationsSection({ onNavigate }: BatchOperationsSectionProps) {
  const { cohorts, students, ilps } = useCollegeSupabase();
  const { toast } = useToast();

  // Cohort selector
  const activeCohorts = cohorts.filter((c) => c.status === 'Active');
  const [selectedCohortId, setSelectedCohortId] = useState<string>(activeCohorts[0]?.id || '');
  const [cohortSelectorOpen, setCohortSelectorOpen] = useState(false);

  const cohortStudents = useMemo(
    () => students.filter((s) => s.cohort_id === selectedCohortId && s.status === 'Active'),
    [students, selectedCohortId]
  );

  const selectedCohort = cohorts.find((c) => c.id === selectedCohortId);

  // Batch Grade state
  const [unitName, setUnitName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('Pass');
  const [batchFeedback, setBatchFeedback] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set());
  const [gradeSubmitting, setGradeSubmitting] = useState(false);
  const [gradeExpanded, setGradeExpanded] = useState(true);

  // Batch ILP state
  const [ilpSubmitting, setIlpSubmitting] = useState(false);
  const [ilpExpanded, setIlpExpanded] = useState(false);

  // Batch Notification state
  const [notifMessage, setNotifMessage] = useState('');
  const [notifRecipients, setNotifRecipients] = useState<'all' | 'selected'>('all');
  const [notifSelectedIds, setNotifSelectedIds] = useState<Set<string>>(new Set());
  const [notifExpanded, setNotifExpanded] = useState(false);
  const [notifSending, setNotifSending] = useState(false);

  // Auto-select all students when cohort changes
  const handleCohortChange = (cohortId: string) => {
    setSelectedCohortId(cohortId);
    setCohortSelectorOpen(false);
    setSelectedStudentIds(new Set());
    setNotifSelectedIds(new Set());
  };

  // Select all / deselect all for grading
  const handleToggleAllGrade = () => {
    if (selectedStudentIds.size === cohortStudents.length) {
      setSelectedStudentIds(new Set());
    } else {
      setSelectedStudentIds(new Set(cohortStudents.map((s) => s.id)));
    }
  };

  const handleToggleStudentGrade = (id: string) => {
    setSelectedStudentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Select all / deselect all for notifications
  const handleToggleAllNotif = () => {
    if (notifSelectedIds.size === cohortStudents.length) {
      setNotifSelectedIds(new Set());
    } else {
      setNotifSelectedIds(new Set(cohortStudents.map((s) => s.id)));
    }
  };

  const handleToggleStudentNotif = (id: string) => {
    setNotifSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Overdue ILPs for this cohort
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

  // Submit batch grades
  const handleSubmitGrades = async () => {
    if (!unitName.trim() || selectedStudentIds.size === 0) {
      toast({ title: 'Missing information', description: 'Enter a unit name and select students.', variant: 'destructive' });
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
      toast({ title: 'Grades submitted', description: `${gradeRows.length} grades recorded for ${unitName}.` });
      setUnitName('');
      setBatchFeedback('');
      setSelectedStudentIds(new Set());
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to submit grades.', variant: 'destructive' });
    } finally {
      setGradeSubmitting(false);
    }
  };

  // Batch ILP review
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
      toast({ title: 'ILPs updated', description: `${overdueILPs.length} ILPs marked as reviewed today.` });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to update ILPs.', variant: 'destructive' });
    } finally {
      setIlpSubmitting(false);
    }
  };

  // Send notification (local-only for now)
  const handleSendNotification = () => {
    const recipientCount = notifRecipients === 'all' ? cohortStudents.length : notifSelectedIds.size;
    if (!notifMessage.trim() || recipientCount === 0) {
      toast({ title: 'Missing information', description: 'Enter a message and ensure recipients are selected.', variant: 'destructive' });
      return;
    }
    setNotifSending(true);
    // Simulated send
    setTimeout(() => {
      toast({ title: 'Notification sent', description: `Message sent to ${recipientCount} student${recipientCount !== 1 ? 's' : ''}.` });
      setNotifMessage('');
      setNotifSending(false);
    }, 800);
  };

  const notifRecipientCount = notifRecipients === 'all' ? cohortStudents.length : notifSelectedIds.size;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Cohort Selector */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-3">Select Cohort</h2>
        <div className="relative">
          <button
            onClick={() => setCohortSelectorOpen(!cohortSelectorOpen)}
            className="w-full card-surface-interactive overflow-hidden touch-manipulation active:scale-[0.98] transition-all"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30" />
            <div className="relative z-10 p-4 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-white">
                  {selectedCohort?.name || 'No cohort selected'}
                </p>
                <p className="text-[11px] text-white">
                  {cohortStudents.length} active student{cohortStudents.length !== 1 ? 's' : ''}
                </p>
              </div>
              <ChevronDown className={cn('h-4 w-4 text-white transition-transform', cohortSelectorOpen && 'rotate-180')} />
            </div>
          </button>

          {cohortSelectorOpen && (
            <div className="mt-1 rounded-xl bg-[#1a1a2e] border border-white/[0.06] overflow-hidden shadow-xl z-30 relative">
              {activeCohorts.length === 0 ? (
                <p className="p-4 text-sm text-white text-center">No active cohorts found.</p>
              ) : (
                activeCohorts.map((cohort) => {
                  const count = students.filter((s) => s.cohort_id === cohort.id && s.status === 'Active').length;
                  return (
                    <button
                      key={cohort.id}
                      onClick={() => handleCohortChange(cohort.id)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3.5 text-left touch-manipulation active:scale-[0.98] transition-all border-b border-white/[0.04] last:border-b-0 h-11 min-h-[44px]',
                        cohort.id === selectedCohortId ? 'bg-elec-yellow/5' : 'hover:bg-white/[0.02]'
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{cohort.name}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
                        {count} students
                      </span>
                      {cohort.id === selectedCohortId && (
                        <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Batch Grade */}
      <motion.section variants={itemVariants} className="space-y-3">
        <button
          onClick={() => setGradeExpanded(!gradeExpanded)}
          className="flex items-center justify-between w-full touch-manipulation h-11 min-h-[44px]"
        >
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Batch Grade</h2>
          <ChevronDown className={cn('h-4 w-4 text-white transition-transform', gradeExpanded && 'rotate-180')} />
        </button>

        {gradeExpanded && (
          <div className="card-surface overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 opacity-30" />
            <div className="relative z-10 p-4 space-y-4">
              {/* Unit name */}
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Unit / Assessment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Unit 201 — Health and Safety"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/40 focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
                />
              </div>

              {/* Grade selector */}
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Grade</label>
                <div className="flex gap-2 flex-wrap">
                  {['Distinction', 'Merit', 'Pass', 'Refer'].map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium border touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]',
                        selectedGrade === grade
                          ? grade === 'Distinction' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : grade === 'Merit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : grade === 'Pass' ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-white/[0.02] text-white border-white/[0.06]'
                      )}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student list with checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-white uppercase tracking-wider">Students</label>
                  <button
                    onClick={handleToggleAllGrade}
                    className="text-[11px] text-elec-yellow font-medium touch-manipulation h-11 min-h-[44px] flex items-center px-2"
                  >
                    {selectedStudentIds.size === cohortStudents.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                {cohortStudents.length === 0 ? (
                  <p className="text-sm text-white text-center py-3">No students in this cohort.</p>
                ) : (
                  <div className="space-y-1 max-h-[240px] overflow-y-auto">
                    {cohortStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => handleToggleStudentGrade(student.id)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]"
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all',
                            selectedStudentIds.has(student.id)
                              ? 'bg-elec-yellow border-elec-yellow'
                              : 'border-white/20 bg-white/[0.02]'
                          )}
                        >
                          {selectedStudentIds.has(student.id) && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          )}
                        </div>
                        <span className="text-sm text-white truncate">{student.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Feedback */}
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Feedback (applies to all)</label>
                <textarea
                  placeholder="Enter feedback for all selected students..."
                  value={batchFeedback}
                  onChange={(e) => setBatchFeedback(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/40 focus:border-elec-yellow/40 focus:outline-none touch-manipulation resize-none"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmitGrades}
                disabled={gradeSubmitting || selectedStudentIds.size === 0 || !unitName.trim()}
                className={cn(
                  'w-full h-11 rounded-lg text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all flex items-center justify-center gap-2',
                  selectedStudentIds.size > 0 && unitName.trim()
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.04] text-white/40 border border-white/[0.06]'
                )}
              >
                {gradeSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ClipboardCheck className="h-4 w-4" />
                    Submit Grades ({selectedStudentIds.size})
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.section>

      {/* Batch ILP Review */}
      <motion.section variants={itemVariants} className="space-y-3">
        <button
          onClick={() => setIlpExpanded(!ilpExpanded)}
          className="flex items-center justify-between w-full touch-manipulation h-11 min-h-[44px]"
        >
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Batch ILP Review</h2>
          <div className="flex items-center gap-2">
            {overdueILPs.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {overdueILPs.length} overdue
              </span>
            )}
            <ChevronDown className={cn('h-4 w-4 text-white transition-transform', ilpExpanded && 'rotate-180')} />
          </div>
        </button>

        {ilpExpanded && (
          <div className="card-surface overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 opacity-30" />
            <div className="relative z-10 p-4 space-y-3">
              {overdueILPs.length === 0 ? (
                <div className="flex items-center gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm text-white">All ILPs are up to date for this cohort.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    </div>
                    <p className="text-sm text-white">
                      {overdueILPs.length} student{overdueILPs.length !== 1 ? 's' : ''} with overdue ILP reviews
                    </p>
                  </div>

                  <div className="space-y-1 max-h-[200px] overflow-y-auto">
                    {overdueILPs.map((ilp) => {
                      const student = students.find((s) => s.id === ilp.student_id);
                      return (
                        <div key={ilp.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <span className="text-sm text-white flex-1 truncate">{student?.name || 'Unknown'}</span>
                          <span className="text-[10px] text-white shrink-0">
                            {ilp.last_reviewed
                              ? `Last: ${new Date(ilp.last_reviewed).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                              : 'Never reviewed'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleBatchILPReview}
                    disabled={ilpSubmitting}
                    className="w-full h-11 rounded-lg bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {ilpSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        Mark All as Reviewed Today
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.section>

      {/* Batch Notifications */}
      <motion.section variants={itemVariants} className="space-y-3">
        <button
          onClick={() => setNotifExpanded(!notifExpanded)}
          className="flex items-center justify-between w-full touch-manipulation h-11 min-h-[44px]"
        >
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Batch Notifications</h2>
          <ChevronDown className={cn('h-4 w-4 text-white transition-transform', notifExpanded && 'rotate-180')} />
        </button>

        {notifExpanded && (
          <div className="card-surface overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-400 opacity-30" />
            <div className="relative z-10 p-4 space-y-4">
              {/* Message */}
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea
                  placeholder="Type your notification message..."
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/40 focus:border-elec-yellow/40 focus:outline-none touch-manipulation resize-none"
                />
              </div>

              {/* Recipient selector */}
              <div>
                <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Recipients</label>
                <div className="flex gap-2 mb-3">
                  {(['all', 'selected'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setNotifRecipients(opt)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium border touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]',
                        notifRecipients === opt
                          ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30'
                          : 'bg-white/[0.02] text-white border-white/[0.06]'
                      )}
                    >
                      {opt === 'all' ? 'All in Cohort' : 'Selected Students'}
                    </button>
                  ))}
                </div>

                {notifRecipients === 'selected' && (
                  <div className="space-y-1 max-h-[200px] overflow-y-auto">
                    <button
                      onClick={handleToggleAllNotif}
                      className="text-[11px] text-elec-yellow font-medium touch-manipulation h-11 min-h-[44px] flex items-center px-2 mb-1"
                    >
                      {notifSelectedIds.size === cohortStudents.length ? 'Deselect All' : 'Select All'}
                    </button>
                    {cohortStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => handleToggleStudentNotif(student.id)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]"
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all',
                            notifSelectedIds.has(student.id)
                              ? 'bg-elec-yellow border-elec-yellow'
                              : 'border-white/20 bg-white/[0.02]'
                          )}
                        >
                          {notifSelectedIds.has(student.id) && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          )}
                        </div>
                        <span className="text-sm text-white truncate">{student.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Preview */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[11px] text-white">
                  <Bell className="h-3 w-3 inline mr-1" />
                  Will send to <span className="font-semibold text-elec-yellow">{notifRecipientCount}</span> student{notifRecipientCount !== 1 ? 's' : ''}
                  {selectedCohort ? ` in ${selectedCohort.name}` : ''}
                </p>
              </div>

              {/* Send */}
              <button
                onClick={handleSendNotification}
                disabled={notifSending || !notifMessage.trim() || notifRecipientCount === 0}
                className={cn(
                  'w-full h-11 rounded-lg text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all flex items-center justify-center gap-2',
                  notifMessage.trim() && notifRecipientCount > 0
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.04] text-white/40 border border-white/[0.06]'
                )}
              >
                {notifSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Notification
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
