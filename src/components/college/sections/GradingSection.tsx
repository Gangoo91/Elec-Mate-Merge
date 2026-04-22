import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecordGradeDialog } from '@/components/college/dialogs/RecordGradeDialog';
import { RubricGradingDialog } from '@/components/college/dialogs/RubricGradingDialog';
import { GradeDetailSheet } from '@/components/college/sheets/GradeDetailSheet';
import { FeedbackSheet } from '@/components/college/sheets/FeedbackSheet';
import { GradeCardSkeletonList } from '@/components/college/ui/GradeCardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { useCollegeGrades, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  Pill,
  EmptyState,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

export function GradingSection() {
  const { data: grades = [], isLoading: gradesLoading } = useCollegeGrades();
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: staff = [], isLoading: staffLoading } = useCollegeStaff();
  const { data: cohorts = [], isLoading: cohortsLoading } = useCollegeCohorts();
  const updateGrade = useUpdateGrade();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-grades'] });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [rubricDialogOpen, setRubricDialogOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | undefined>();
  const [gradeDetailOpen, setGradeDetailOpen] = useState(false);
  const [feedbackSheetOpen, setFeedbackSheetOpen] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);

  const isLoading = gradesLoading || studentsLoading || staffLoading || cohortsLoading;

  const pendingGrades = grades.filter((g) => g.status === 'Pending');
  const gradedGrades = grades.filter((g) => g.status === 'Graded');
  const resubmissions = grades.filter((g) => g.status === 'Resubmission');

  const filteredGrades = grades.filter((grade) => {
    const student = students.find((s) => s.id === grade.student_id);
    const matchesSearch =
      (grade.unit_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (grade.assessment_type || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || grade.status === filterStatus;
    const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
    return matchesSearch && matchesStatus && matchesCohort;
  });

  const statusTone = (status: string | null): Tone =>
    status === 'Pending'
      ? 'amber'
      : status === 'Graded'
        ? 'green'
        : status === 'Resubmission'
          ? 'blue'
          : status === 'Not Yet Competent'
            ? 'red'
            : 'yellow';

  const gradeTone = (grade?: string | null): Tone =>
    grade === 'Distinction'
      ? 'green'
      : grade === 'Merit'
        ? 'blue'
        : grade === 'Pass' || grade === 'Competent'
          ? 'yellow'
          : grade === 'Refer'
            ? 'red'
            : 'yellow';

  const getStudentName = (studentId: string | null) =>
    !studentId ? 'Unknown' : students.find((s) => s.id === studentId)?.name || 'Unknown';
  const getStudentInitials = (studentId: string | null) => {
    if (!studentId) return '?';
    const student = students.find((s) => s.id === studentId);
    if (!student?.name) return '?';
    return student.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  const getStudentPhotoUrl = (studentId: string | null) => {
    if (!studentId) return undefined;
    return students.find((s) => s.id === studentId)?.photo_url || undefined;
  };
  const getAssessorName = (assessorId: string | null) =>
    !assessorId ? 'Unassigned' : staff.find((s) => s.id === assessorId)?.name || 'Unknown';

  const handleRequestResubmission = (gradeId: string) => {
    updateGrade.mutate(
      { id: gradeId, updates: { status: 'Resubmission' } },
      {
        onSuccess: () =>
          toast({
            title: 'Resubmission requested',
            description: 'The student has been notified to resubmit.',
          }),
        onError: () =>
          toast({
            title: 'Error',
            description: 'Failed to request resubmission.',
            variant: 'destructive',
          }),
      }
    );
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Assessment · Grading"
            title="Assessment & grading"
            description={`${pendingGrades.length} pending · ${gradedGrades.length} graded.`}
            tone="amber"
            actions={
              <button
                onClick={() => {
                  setSelectedAssessmentId(undefined);
                  setGradeDialogOpen(true);
                }}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Record grade →
              </button>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatStrip
            columns={3}
            stats={[
              {
                value: pendingGrades.length,
                label: 'Pending',
                sub: 'Awaiting grading',
                accent: pendingGrades.length > 0,
              },
              { value: gradedGrades.length, label: 'Graded', sub: 'Complete' },
              { value: resubmissions.length, label: 'Resubmissions', sub: 'Returned to student', tone: 'blue' },
            ]}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: grades.length },
              { value: 'Pending', label: 'Pending', count: pendingGrades.length },
              { value: 'Graded', label: 'Graded', count: gradedGrades.length },
              { value: 'Resubmission', label: 'Resubmission', count: resubmissions.length },
            ]}
            activeTab={filterStatus}
            onTabChange={setFilterStatus}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search assessment, student or type…"
            actions={
              <select
                value={filterCohort}
                onChange={(e) => setFilterCohort(e.target.value)}
                className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
              >
                <option value="all">All Cohorts</option>
                {cohorts
                  .filter((c) => c.status === 'Active')
                  .map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </option>
                  ))}
              </select>
            }
          />
        </motion.div>

        {isLoading ? (
          <GradeCardSkeletonList count={4} />
        ) : filteredGrades.length === 0 ? (
          <EmptyState title="No assessments found" description="Try adjusting filters." />
        ) : (
          <motion.div variants={itemVariants}>
            <ListCard>
              {filteredGrades.map((grade) => {
                const initials = getStudentInitials(grade.student_id);
                const photoUrl = getStudentPhotoUrl(grade.student_id);
                const tone = statusTone(grade.status);

                return (
                  <SwipeableCard
                    key={grade.id}
                    leftActions={[
                      {
                        label: 'Grade',
                        onClick: () => {
                          setSelectedAssessmentId(grade.id);
                          setGradeDialogOpen(true);
                        },
                        className: 'bg-emerald-500/90 text-white',
                      },
                      {
                        label: 'View',
                        onClick: () => {
                          setSelectedGradeId(grade.id);
                          setGradeDetailOpen(true);
                        },
                        className: 'bg-blue-500/90 text-white',
                      },
                    ]}
                    rightActions={[
                      {
                        label: 'Resubmit',
                        onClick: () => handleRequestResubmission(grade.id),
                        className: 'bg-amber-500/90 text-white',
                      },
                    ]}
                  >
                    <div className="group flex items-start gap-4 px-5 sm:px-6 py-5 hover:bg-[hsl(0_0%_15%)] transition-colors">
                      <Avatar className="h-10 w-10 shrink-0 ring-1 ring-white/[0.08]">
                        <AvatarImage src={photoUrl} />
                        <AvatarFallback className="bg-amber-500/10 text-amber-400 text-xs font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[15px] font-medium text-white truncate">
                              {grade.unit_name || 'Untitled unit'}
                            </div>
                            <div className="mt-0.5 text-[11.5px] text-white/50 truncate">
                              {getStudentName(grade.student_id)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Pill tone={tone}>{grade.status || 'Unknown'}</Pill>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  className="text-white/50 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                                  aria-label="Options"
                                >
                                  ⋯
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedGradeId(grade.id);
                                    setGradeDetailOpen(true);
                                  }}
                                >
                                  View submission
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedAssessmentId(grade.id);
                                    setRubricDialogOpen(true);
                                  }}
                                >
                                  Grade with rubric
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedAssessmentId(grade.id);
                                    setGradeDialogOpen(true);
                                  }}
                                >
                                  Quick grade
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedGradeId(grade.id);
                                    setFeedbackSheetOpen(true);
                                  }}
                                >
                                  Add feedback
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => handleRequestResubmission(grade.id)}
                                >
                                  Request resubmission
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {grade.assessment_type && (
                            <Pill tone="yellow">{grade.assessment_type}</Pill>
                          )}
                          {grade.grade && <Pill tone={gradeTone(grade.grade)}>{grade.grade}</Pill>}
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/50">
                          <span>Assessor · {getAssessorName(grade.assessed_by)}</span>
                          {grade.assessed_at && (
                            <span className="tabular-nums">
                              {new Date(grade.assessed_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                        </div>

                        {grade.feedback && (
                          <div className="mt-3 text-[12px] text-white/70 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                            <span className="text-white/40">Feedback · </span>
                            {grade.feedback.length > 120
                              ? grade.feedback.substring(0, 120) + '…'
                              : grade.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                  </SwipeableCard>
                );
              })}
            </ListCard>
          </motion.div>
        )}

        <RecordGradeDialog
          open={gradeDialogOpen}
          onOpenChange={setGradeDialogOpen}
          assessmentId={selectedAssessmentId}
        />
        <RubricGradingDialog
          open={rubricDialogOpen}
          onOpenChange={setRubricDialogOpen}
          assessmentId={selectedAssessmentId}
        />
        <GradeDetailSheet
          gradeId={selectedGradeId}
          open={gradeDetailOpen}
          onOpenChange={setGradeDetailOpen}
        />
        <FeedbackSheet
          gradeId={selectedGradeId}
          open={feedbackSheetOpen}
          onOpenChange={setFeedbackSheetOpen}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
