import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { getInitials, formatUKDateShort } from '@/utils/collegeHelpers';
import {
  Pill,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

interface GradeDetailSheetProps {
  gradeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function GradeDetailSheet({ gradeId, open, onOpenChange }: GradeDetailSheetProps) {
  const { data: grade, isLoading } = useCollegeGrade(gradeId!);
  const { data: students } = useCollegeStudents();
  const { data: staff } = useCollegeStaff();
  const updateGrade = useUpdateGrade();

  const [activeTab, setActiveTab] = useState('details');
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const student = useMemo(() => {
    if (!grade?.student_id || !students) return null;
    return students.find((s) => s.id === grade.student_id) ?? null;
  }, [grade, students]);

  const assessor = useMemo(() => {
    if (!grade?.assessed_by || !staff) return null;
    return staff.find((s) => s.id === grade.assessed_by) ?? null;
  }, [grade, staff]);

  const gradeTone = (gradeValue: string | null | undefined): Tone => {
    switch (gradeValue) {
      case 'Distinction':
        return 'green';
      case 'Merit':
        return 'blue';
      case 'Pass':
        return 'yellow';
      case 'Competent':
        return 'emerald';
      case 'Refer':
      case 'Not Yet Competent':
        return 'red';
      default:
        return 'yellow';
    }
  };

  const statusTone = (s: string | null): Tone =>
    s === 'Pending' ? 'amber' : s === 'Graded' ? 'green' : s === 'Resubmission' ? 'blue' : 'yellow';

  const handleStartFeedback = () => {
    setFeedbackText(grade?.feedback ?? '');
    setIsEditingFeedback(true);
  };

  const handleSaveFeedback = () => {
    if (!gradeId) return;
    updateGrade.mutate(
      { id: gradeId, updates: { feedback: feedbackText } },
      {
        onSuccess: () => setIsEditingFeedback(false),
      }
    );
  };

  if (!gradeId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {isLoading && <LoadingState />}

          {!isLoading && grade && (
            <>
              <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 shrink-0 ring-1 ring-white/[0.08]">
                    <AvatarFallback className="bg-amber-500/10 text-amber-400 text-lg font-semibold">
                      {student ? getInitials(student.name) : '??'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                      Assessment
                    </div>
                    <SheetTitle className="mt-1 text-xl text-left">
                      {student?.name ?? 'Unknown Student'}
                    </SheetTitle>
                    <p className="mt-0.5 text-[11.5px] text-white/75 truncate">
                      {grade.unit_name ?? 'Unassigned Unit'}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <Pill tone={statusTone(grade.status)}>{grade.status ?? 'Pending'}</Pill>
                      {grade.grade && <Pill tone={gradeTone(grade.grade)}>{grade.grade}</Pill>}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-white/[0.06] flex-shrink-0">
                  {['details', 'feedback', 'history'].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="flex-1 h-11 touch-manipulation text-[12.5px] font-medium text-white/60 data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <AnimatePresence mode="wait">
                    {activeTab === 'details' && (
                      <motion.div
                        key="details"
                        variants={tabVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="p-5 space-y-5"
                      >
                        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                            Assessment
                          </div>
                          <div className="mt-3 space-y-3 text-[13px]">
                            <div className="flex items-center justify-between">
                              <span className="text-white/75">Type</span>
                              <span className="text-white">
                                {grade.assessment_type ?? 'Not specified'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/75">Grade</span>
                              <span className="text-white">
                                {grade.grade ?? 'Not yet graded'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/75">Score</span>
                              <span className="text-white tabular-nums">
                                {grade.score != null ? `${grade.score}%` : 'No score'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                            Assessor & Dates
                          </div>
                          <div className="mt-3 space-y-3 text-[13px]">
                            <div className="flex items-center justify-between">
                              <span className="text-white/75">Assessor</span>
                              <span className="text-white">{assessor?.name ?? 'Not assigned'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/75">Assessed</span>
                              <span className="text-white tabular-nums">
                                {formatUKDateShort(grade.assessed_at)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/75">Created</span>
                              <span className="text-white tabular-nums">
                                {formatUKDateShort(grade.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'feedback' && (
                      <motion.div
                        key="feedback"
                        variants={tabVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="p-5 space-y-5"
                      >
                        {isEditingFeedback ? (
                          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                              Edit Feedback
                            </div>
                            <Textarea
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              placeholder="Enter assessment feedback for the student…"
                              className="touch-manipulation text-sm min-h-[180px] bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60"
                            />
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => setIsEditingFeedback(false)}
                                className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSaveFeedback}
                                disabled={updateGrade.isPending}
                                className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                              >
                                {updateGrade.isPending ? 'Saving…' : 'Save feedback →'}
                              </button>
                            </div>
                          </div>
                        ) : grade.feedback ? (
                          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                            <div className="flex items-baseline justify-between mb-3">
                              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                                Feedback
                              </div>
                              <button
                                onClick={handleStartFeedback}
                                className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                              >
                                Edit →
                              </button>
                            </div>
                            <pre className="whitespace-pre-wrap text-[13.5px] font-sans text-white/80 leading-relaxed">
                              {grade.feedback}
                            </pre>
                          </div>
                        ) : (
                          <EmptyState
                            title="No feedback yet"
                            description="No feedback has been recorded for this assessment."
                            action="Add feedback"
                            onAction={handleStartFeedback}
                          />
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'history' && (
                      <motion.div
                        key="history"
                        variants={tabVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="p-5"
                      >
                        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
                          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 mb-5">
                            Timeline
                          </div>

                          <div className="relative pl-6 space-y-5">
                            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/[0.08]" />

                            <div className="relative">
                              <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                              <div className="text-[13px] font-medium text-white">
                                Assessment created
                              </div>
                              <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                                {formatUKDateShort(grade.created_at)} · Unit:{' '}
                                {grade.unit_name ?? 'Not specified'}
                              </div>
                            </div>

                            {grade.status && grade.status !== 'Pending' && (
                              <div className="relative">
                                <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                                <div className="text-[13px] font-medium text-white">
                                  Status → {grade.status}
                                </div>
                                <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                                  {grade.assessed_at
                                    ? formatUKDateShort(grade.assessed_at)
                                    : 'Date not recorded'}
                                </div>
                              </div>
                            )}

                            {grade.assessed_at && (
                              <div className="relative">
                                <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                <div className="text-[13px] font-medium text-white">
                                  Graded
                                </div>
                                <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                                  {formatUKDateShort(grade.assessed_at)}
                                  {assessor && ` · ${assessor.name}`}
                                </div>
                                {grade.grade && (
                                  <div className="mt-2">
                                    <Pill tone={gradeTone(grade.grade)}>
                                      {grade.grade}
                                      {grade.score != null && ` · ${grade.score}%`}
                                    </Pill>
                                  </div>
                                )}
                              </div>
                            )}

                            {grade.feedback && (
                              <div className="relative">
                                <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-elec-yellow" />
                                <div className="text-[13px] font-medium text-white">
                                  Feedback recorded
                                </div>
                                <div className="mt-0.5 text-[11.5px] text-white/75 tabular-nums">
                                  {grade.feedback.length} characters
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Tabs>

              <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-5 flex-row items-center justify-end gap-4">
                <button
                  onClick={() => onOpenChange(false)}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  Close
                </button>
                <button
                  onClick={() => onOpenChange(false)}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  Rubric grade
                </button>
                <button
                  onClick={() => onOpenChange(false)}
                  className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
                >
                  Quick grade →
                </button>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
