import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
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
import { motion } from 'framer-motion';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function GradingSection() {
  const { data: grades = [], isLoading: gradesLoading } = useCollegeGrades();
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: staff = [], isLoading: staffLoading } = useCollegeStaff();
  const { data: cohorts = [], isLoading: cohortsLoading } = useCollegeCohorts();
  const updateGrade = useUpdateGrade();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { staggerContainer, staggerItem } = useHapticFeedback();

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

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Graded':
        return 'bg-success/10 text-success border-success/20';
      case 'Resubmission':
        return 'bg-info/10 text-info border-info/20';
      case 'Not Yet Competent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-white';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-3.5 w-3.5" />;
      case 'Graded':
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Resubmission':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'Not Yet Competent':
        return <XCircle className="h-3.5 w-3.5" />;
      default:
        return <FileText className="h-3.5 w-3.5" />;
    }
  };

  const getGradeColor = (grade?: string | null) => {
    switch (grade) {
      case 'Distinction':
        return 'bg-success/10 text-success';
      case 'Merit':
        return 'bg-info/10 text-info';
      case 'Pass':
        return 'bg-primary/10 text-primary';
      case 'Competent':
        return 'bg-success/10 text-success';
      case 'Refer':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-white';
    }
  };

  const getStudentName = (studentId: string | null) => {
    if (!studentId) return 'Unknown';
    return students.find((s) => s.id === studentId)?.name || 'Unknown';
  };

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
    const student = students.find((s) => s.id === studentId);
    return student?.photo_url || undefined;
  };

  const getAssessorName = (assessorId: string | null) => {
    if (!assessorId) return 'Unassigned';
    return staff.find((s) => s.id === assessorId)?.name || 'Unknown';
  };

  const handleRequestResubmission = (gradeId: string) => {
    updateGrade.mutate(
      { id: gradeId, updates: { status: 'Resubmission' } },
      {
        onSuccess: () => {
          toast({
            title: 'Resubmission requested',
            description: 'The student has been notified to resubmit their work.',
          });
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to request resubmission. Please try again.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader title="Assessment & Grading" description="Loading..." />
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-28 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 shrink-0 animate-pulse"
            />
          ))}
        </div>
        <GradeCardSkeletonList count={4} />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader
          title="Assessment & Grading"
          description={`${pendingGrades.length} pending, ${gradedGrades.length} graded`}
          action={
            <Button
              className="gap-2 h-11 touch-manipulation"
              onClick={() => {
                setSelectedAssessmentId(undefined);
                setGradeDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Record Grade</span>
            </Button>
          }
        />

        {/* Quick Stats */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{pendingGrades.length}</p>
                <p className="text-xs text-white">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">{gradedGrades.length}</p>
                <p className="text-xs text-white">Graded</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-elec-yellow" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {grades.filter((g) => g.status === 'Resubmission').length}
                </p>
                <p className="text-xs text-white">Resubmissions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:mx-0 md:px-0 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn('h-11 touch-manipulation', !searchQuery && 'pl-9')}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[150px] h-11 touch-manipulation">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Status
              </SelectItem>
              <SelectItem value="Pending" className="h-11 touch-manipulation">
                Pending
              </SelectItem>
              <SelectItem value="Graded" className="h-11 touch-manipulation">
                Graded
              </SelectItem>
              <SelectItem value="Resubmission" className="h-11 touch-manipulation">
                Resubmission
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCohort} onValueChange={setFilterCohort}>
            <SelectTrigger className="w-full sm:w-[180px] h-11 touch-manipulation">
              <SelectValue placeholder="Cohort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="h-11 touch-manipulation">
                All Cohorts
              </SelectItem>
              {cohorts
                .filter((c) => c.status === 'Active')
                .map((cohort) => (
                  <SelectItem key={cohort.id} value={cohort.id} className="h-11 touch-manipulation">
                    {cohort.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {(filterStatus !== 'all' || filterCohort !== 'all') && (
          <div className="flex flex-wrap gap-2">
            {filterStatus !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterStatus('all')}
              >
                {filterStatus} <span className="ml-1">×</span>
              </Badge>
            )}
            {filterCohort !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterCohort('all')}
              >
                {cohorts.find((c) => c.id === filterCohort)?.name || filterCohort}{' '}
                <span className="ml-1">×</span>
              </Badge>
            )}
          </div>
        )}

        {/* Grades List */}
        <motion.div
          className="grid gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredGrades.map((grade) => {
            const initials = getStudentInitials(grade.student_id);
            const photoUrl = getStudentPhotoUrl(grade.student_id);

            return (
              <motion.div variants={staggerItem} key={grade.id}>
                <SwipeableCard
                  leftActions={[
                    {
                      icon: <CheckCircle2 className="h-5 w-5" />,
                      label: 'Quick Grade',
                      onClick: () => {
                        setSelectedAssessmentId(grade.id);
                        setGradeDialogOpen(true);
                      },
                      className: 'bg-success text-white',
                    },
                    {
                      icon: <FileText className="h-5 w-5" />,
                      label: 'View',
                      onClick: () => {
                        setSelectedGradeId(grade.id);
                        setGradeDetailOpen(true);
                      },
                      className: 'bg-info text-white',
                    },
                  ]}
                  rightActions={[
                    {
                      icon: <AlertCircle className="h-5 w-5" />,
                      label: 'Resubmit',
                      onClick: () => handleRequestResubmission(grade.id),
                      className: 'bg-warning text-white',
                    },
                  ]}
                >
                  <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage src={photoUrl} />
                          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-sm font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {grade.unit_name || 'Untitled Unit'}
                              </h3>
                              <p className="text-sm text-white">
                                {getStudentName(grade.student_id)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`${getStatusColor(grade.status)} flex items-center gap-1`}
                              >
                                {getStatusIcon(grade.status)}
                                {grade.status || 'Unknown'}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-11 w-11 touch-manipulation"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedGradeId(grade.id);
                                      setGradeDetailOpen(true);
                                    }}
                                  >
                                    View Submission
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedAssessmentId(grade.id);
                                      setRubricDialogOpen(true);
                                    }}
                                  >
                                    Grade with Rubric
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedAssessmentId(grade.id);
                                      setGradeDialogOpen(true);
                                    }}
                                  >
                                    Quick Grade
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => {
                                      setSelectedGradeId(grade.id);
                                      setFeedbackSheetOpen(true);
                                    }}
                                  >
                                    Add Feedback
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="h-11 touch-manipulation"
                                    onClick={() => handleRequestResubmission(grade.id)}
                                  >
                                    Request Resubmission
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {grade.assessment_type && (
                              <Badge variant="secondary" className="text-xs">
                                {grade.assessment_type}
                              </Badge>
                            )}
                            {grade.grade && (
                              <Badge variant="outline" className={getGradeColor(grade.grade)}>
                                {grade.grade}
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white">
                            <div className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" />
                              <span>Assessor: {getAssessorName(grade.assessed_by)}</span>
                            </div>
                            {grade.assessed_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>
                                  Assessed:{' '}
                                  {new Date(grade.assessed_at).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                              </div>
                            )}
                          </div>

                          {grade.feedback && (
                            <div className="mt-3 p-2 bg-muted/50 rounded-md">
                              <p className="text-xs text-white line-clamp-2">
                                <span className="font-medium">Feedback:</span> {grade.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwipeableCard>
              </motion.div>
            );
          })}

          {filteredGrades.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-white">No assessments found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>

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
      </div>
    </PullToRefresh>
  );
}
