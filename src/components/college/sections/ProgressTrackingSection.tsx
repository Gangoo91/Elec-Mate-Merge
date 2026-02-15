import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useCollegeStudents, useStudentsAtRisk } from '@/hooks/college/useCollegeStudents';
import type { CollegeStudent } from '@/services/college/collegeStudentService';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useCollegeAttendance } from '@/hooks/college/useCollegeAttendance';
import { cn } from '@/lib/utils';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { ProgressUpdateSheet } from '@/components/college/sheets/ProgressUpdateSheet';
import { useToast } from '@/hooks/use-toast';
import { ProgressCardSkeletonList } from '@/components/college/ui/ProgressCardSkeleton';
import { motion } from 'framer-motion';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import {
  Search,
  User,
  MoreVertical,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Calendar,
  BarChart3,
  Loader2,
  Mail,
  Phone,
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

export function ProgressTrackingSection() {
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: studentsAtRisk = [] } = useStudentsAtRisk();
  const { data: cohorts = [] } = useCollegeCohorts();
  const { data: attendance = [] } = useCollegeAttendance();

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { staggerContainer, staggerItem } = useHapticFeedback();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [progressSheetOpen, setProgressSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-students'] });
    await queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
  };

  const isLoading = studentsLoading;

  const getAvatarInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getStudentAttendanceRate = (studentId: string): number => {
    const records = attendance.filter((a) => a.student_id === studentId);
    if (records.length === 0) return 100;
    const present = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return Math.round((present / records.length) * 100);
  };

  // Combine progress data with student info
  const progressData = students
    .filter((s) => s.status === 'Active')
    .map((student) => {
      const attendanceRate = getStudentAttendanceRate(student.id);
      const overallProgress = student.progress_percent ?? 0;
      const isAtRisk = student.risk_level === 'high' || student.risk_level === 'critical';

      return {
        ...student,
        attendanceRate,
        overallProgress,
        isAtRisk,
      };
    });

  const filteredProgress = progressData.filter((data) => {
    const matchesSearch =
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (data.uln && data.uln.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'at-risk' && data.isAtRisk) ||
      (filterStatus === 'on-track' && !data.isAtRisk && data.overallProgress >= 70) ||
      (filterStatus === 'behind' && !data.isAtRisk && data.overallProgress < 70);

    const matchesCohort = filterCohort === 'all' || data.cohort_id === filterCohort;

    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Sort by progress (lowest first for attention)
  const sortedProgress = [...filteredProgress].sort(
    (a, b) => a.overallProgress - b.overallProgress
  );

  const getCohortName = (cohortId?: string | null) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return 'text-success';
    if (percent >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressBg = (percent: number) => {
    if (percent >= 80) return 'bg-success';
    if (percent >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  // Calculate cohort averages
  const cohortAverages = cohorts
    .filter((c) => c.status === 'Active')
    .map((cohort) => {
      const cohortStudents = progressData.filter((p) => p.cohort_id === cohort.id);
      const avgProgress =
        cohortStudents.length > 0
          ? Math.round(
              cohortStudents.reduce((sum, s) => sum + s.overallProgress, 0) / cohortStudents.length
            )
          : 0;
      const avgAttendance =
        cohortStudents.length > 0
          ? Math.round(
              cohortStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / cohortStudents.length
            )
          : 0;

      return {
        ...cohort,
        avgProgress,
        avgAttendance,
        studentCount: cohortStudents.length,
        atRiskCount: cohortStudents.filter((s) => s.isAtRisk).length,
      };
    });

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader title="Progress Tracking" description="Loading..." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-lg bg-muted/50 animate-pulse" />
          ))}
        </div>
        <ProgressCardSkeletonList count={4} />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <CollegeSectionHeader
          title="Progress Tracking"
          description={`${studentsAtRisk.length} students at risk`}
          actions={
            <Button
              className="gap-2 h-11 touch-manipulation"
              onClick={() =>
                toast({
                  title: 'Export coming soon',
                  description: 'Progress report export is being developed.',
                })
              }
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Export Report</span>
            </Button>
          }
        />

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {progressData.filter((p) => p.overallProgress >= 80).length}
                  </p>
                  <p className="text-xs text-white">On Track (80%+)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {
                      progressData.filter((p) => p.overallProgress >= 60 && p.overallProgress < 80)
                        .length
                    }
                  </p>
                  <p className="text-xs text-white">Needs Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-lg font-bold text-foreground">{studentsAtRisk.length}</p>
                  <p className="text-xs text-white">At Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {Math.round(
                      progressData.reduce((sum, p) => sum + p.overallProgress, 0) /
                        (progressData.length || 1)
                    )}
                    %
                  </p>
                  <p className="text-xs text-white">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cohort Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cohort Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cohortAverages.map((cohort) => (
                <div key={cohort.id} className="flex items-center gap-4">
                  <div className="w-32 truncate text-sm font-medium">{cohort.name}</div>
                  <div className="flex-1">
                    <Progress value={cohort.avgProgress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white">
                    <span>{cohort.avgProgress}%</span>
                    <span>{cohort.studentCount} students</span>
                    {cohort.atRiskCount > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-destructive/10 text-destructive text-xs"
                      >
                        {cohort.atRiskCount} at risk
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students At Risk Alert */}
        {studentsAtRisk.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Students At Risk - Immediate Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {studentsAtRisk.slice(0, 5).map((student) => (
                  <Badge
                    key={student.id}
                    variant="outline"
                    className="bg-destructive/10 text-destructive border-destructive/20"
                  >
                    {student.name}
                  </Badge>
                ))}
                {studentsAtRisk.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{studentsAtRisk.length - 5} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:mx-0 md:px-0 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              placeholder="Search students..."
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
                All Students
              </SelectItem>
              <SelectItem value="on-track" className="h-11 touch-manipulation">
                On Track
              </SelectItem>
              <SelectItem value="behind" className="h-11 touch-manipulation">
                Behind
              </SelectItem>
              <SelectItem value="at-risk" className="h-11 touch-manipulation">
                At Risk
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

        {/* Filter Chips */}
        {(filterStatus !== 'all' || filterCohort !== 'all') && (
          <div className="flex flex-wrap gap-2">
            {filterStatus !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterStatus('all')}
              >
                {filterStatus === 'at-risk'
                  ? 'At Risk'
                  : filterStatus === 'on-track'
                    ? 'On Track'
                    : 'Behind'}{' '}
                <span className="ml-1">&times;</span>
              </Badge>
            )}
            {filterCohort !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 h-8 touch-manipulation cursor-pointer"
                onClick={() => setFilterCohort('all')}
              >
                {cohorts.find((c) => c.id === filterCohort)?.name || filterCohort}{' '}
                <span className="ml-1">&times;</span>
              </Badge>
            )}
          </div>
        )}

        {/* Student Progress List */}
        <motion.div
          className="grid gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {sortedProgress.map((data) => (
            <motion.div variants={staggerItem} key={data.id}>
              <SwipeableCard
                leftActions={[
                  {
                    icon: <Mail className="h-5 w-5" />,
                    label: 'Email',
                    onClick: () => {
                      if (data.email) window.location.href = 'mailto:' + data.email;
                    },
                    className: 'bg-info text-white',
                  },
                  {
                    icon: <Phone className="h-5 w-5" />,
                    label: 'Call',
                    onClick: () => {
                      if (data.phone) window.location.href = 'tel:' + data.phone;
                    },
                    className: 'bg-success text-white',
                  },
                ]}
                rightActions={[
                  {
                    icon: <AlertTriangle className="h-5 w-5" />,
                    label: 'Flag Risk',
                    onClick: () => {
                      setSelectedStudentId(data.id);
                      setProgressSheetOpen(true);
                    },
                    className: 'bg-warning text-white',
                  },
                ]}
              >
                <Card
                  className={`hover:shadow-md transition-shadow ${
                    data.isAtRisk ? 'border-l-4 border-l-destructive' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={data.photo_url ?? undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getAvatarInitials(data.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{data.name}</h3>
                              {data.isAtRisk && (
                                <Badge
                                  variant="outline"
                                  className="bg-destructive/10 text-destructive text-xs"
                                >
                                  At Risk
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-white">{getCohortName(data.cohort_id)}</p>
                          </div>
                          <div className="flex items-center gap-2">
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
                                    setSelectedStudent(data);
                                    setProfileSheetOpen(true);
                                  }}
                                >
                                  View Full Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => {
                                    setSelectedStudentId(data.id);
                                    setProgressSheetOpen(true);
                                  }}
                                >
                                  Update Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => {
                                    setSelectedStudentId(data.id);
                                    setProgressSheetOpen(true);
                                    toast({
                                      title: 'Schedule Review',
                                      description:
                                        'Use the progress sheet to schedule an ILP review for ' +
                                        data.name,
                                    });
                                  }}
                                >
                                  Schedule Review
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => {
                                    if (data.email) {
                                      window.location.href = 'mailto:' + data.email;
                                    } else {
                                      toast({
                                        title: 'No email',
                                        description: 'No email address on file for this student.',
                                      });
                                    }
                                  }}
                                >
                                  Contact Student
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => {
                                    if (data.employer_email) {
                                      window.location.href = 'mailto:' + data.employer_email;
                                    } else {
                                      toast({
                                        title: 'Contact Employer',
                                        description: 'No employer contact on file for ' + data.name,
                                      });
                                    }
                                  }}
                                >
                                  Contact Employer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-white">Overall Progress</span>
                              <span
                                className={`font-medium ${getProgressColor(data.overallProgress)}`}
                              >
                                {data.overallProgress}%
                              </span>
                            </div>
                            <Progress
                              value={data.overallProgress}
                              className={`h-2 ${getProgressBg(data.overallProgress)}`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-white">Attendance</span>
                              <span
                                className={`font-medium ${getProgressColor(data.attendanceRate)}`}
                              >
                                {data.attendanceRate}%
                              </span>
                            </div>
                            <Progress
                              value={data.attendanceRate}
                              className={`h-2 ${getProgressBg(data.attendanceRate)}`}
                            />
                          </div>
                        </div>

                        {/* Expected End Date */}
                        {data.expected_end_date && (
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Due:{' '}
                                {new Date(data.expected_end_date).toLocaleDateString('en-GB', {
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwipeableCard>
            </motion.div>
          ))}

          {sortedProgress.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-white">No students found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <StudentDetailSheet
          student={selectedStudent}
          open={profileSheetOpen}
          onOpenChange={setProfileSheetOpen}
        />
        <ProgressUpdateSheet
          studentId={selectedStudentId}
          open={progressSheetOpen}
          onOpenChange={setProgressSheetOpen}
        />
      </div>
    </PullToRefresh>
  );
}
