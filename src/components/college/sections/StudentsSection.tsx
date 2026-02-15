import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { AddStudentDialog } from '@/components/college/dialogs/AddStudentDialog';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { WithdrawStudentDialog } from '@/components/college/dialogs/WithdrawStudentDialog';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { ProgressSparkline } from '@/components/college/ui/ProgressSparkline';
import { StudentCardSkeletonList } from '@/components/college/ui/StudentCardSkeleton';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import {
  getInitials,
  getStatusColour,
  getRiskBadgeColour,
  formatUKDateShort,
} from '@/utils/collegeHelpers';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Clock,
  Filter,
  AlertTriangle,
  GraduationCap,
  UserPlus,
  CheckSquare,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function StudentsSection() {
  const { students, cohorts, attendance, isLoading, updateStudent } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // Batch selection
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { staggerContainer, staggerItem, tapAnimation } = useHapticFeedback();

  const handleSelectStudent = (student: CollegeStudent) => {
    if (batchMode) {
      toggleSelection(student.id);
      return;
    }
    setSelectedStudent(student);
    setDetailOpen(true);
  };

  const handleEditStudent = (student: CollegeStudent) => {
    setSelectedStudent(student);
    setDetailOpen(false);
    setEditOpen(true);
  };

  const handleWithdrawStudent = (student: CollegeStudent) => {
    setSelectedStudent(student);
    setDetailOpen(false);
    setWithdrawOpen(true);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLongPress = useCallback(
    (id: string) => {
      if (!batchMode) {
        setBatchMode(true);
        setSelectedIds(new Set([id]));
      }
    },
    [batchMode]
  );

  const exitBatchMode = () => {
    setBatchMode(false);
    setSelectedIds(new Set());
  };

  const getAttendanceRate = (studentId: string): number => {
    const records = attendance.filter((a) => a.student_id === studentId);
    if (records.length === 0) return 100;
    const present = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return Math.round((present / records.length) * 100);
  };

  // Generate fake sparkline data from progress_percent (would use real historical data in production)
  const getSparklineData = (student: CollegeStudent): number[] => {
    const base = student.progress_percent ?? 0;
    // Deterministic pseudo-random from student id
    const seed = student.id.charCodeAt(0) + student.id.charCodeAt(1);
    return [
      Math.max(0, base - 15 - (seed % 10)),
      Math.max(0, base - 10 - (seed % 5)),
      Math.max(0, base - 8 + (seed % 7)),
      Math.max(0, base - 4),
      base,
    ];
  };

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch =
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (student.uln ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
        const matchesCohort = filterCohort === 'all' || student.cohort_id === filterCohort;
        return matchesSearch && matchesStatus && matchesCohort;
      }),
    [students, searchQuery, filterStatus, filterCohort]
  );

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  };

  const handleRefresh = async () => {
    // Simulate refresh delay — in production this would refetch from Supabase
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const hasActiveFilters = searchQuery || filterStatus !== 'all' || filterCohort !== 'all';

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Students"
        description={`${students.filter((s) => s.status === 'Active').length} active students enrolled`}
        actions={
          <div className="flex items-center gap-2">
            {batchMode && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 h-11 touch-manipulation"
                onClick={exitBatchMode}
              >
                <X className="h-4 w-4" />
                {selectedIds.size} selected
              </Button>
            )}
            <Button className="gap-2" onClick={() => setAddStudentOpen(true)}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Enrol Student</span>
            </Button>
          </div>
        }
      />

      {/* Sticky Search and Filters */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm -mx-4 px-4 py-2 md:mx-0 md:px-0 md:static md:bg-transparent md:backdrop-blur-none md:py-0">
        <div className="flex flex-col sm:flex-row gap-3">
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Withdrawn">Withdrawn</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="On Break">On Break</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCohort} onValueChange={setFilterCohort}>
            <SelectTrigger className="w-full sm:w-[200px] h-11 touch-manipulation">
              <SelectValue placeholder="Cohort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cohorts</SelectItem>
              {cohorts
                .filter((c) => c.status === 'Active')
                .map((cohort) => (
                  <SelectItem key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {searchQuery && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer touch-manipulation gap-1"
                onClick={() => setSearchQuery('')}
              >
                "{searchQuery}" <X className="h-3 w-3" />
              </Badge>
            )}
            {filterStatus !== 'all' && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer touch-manipulation gap-1"
                onClick={() => setFilterStatus('all')}
              >
                {filterStatus} <X className="h-3 w-3" />
              </Badge>
            )}
            {filterCohort !== 'all' && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer touch-manipulation gap-1"
                onClick={() => setFilterCohort('all')}
              >
                {getCohortName(filterCohort)} <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && <StudentCardSkeletonList count={4} />}

      {/* Students List with Pull to Refresh */}
      {!isLoading && (
        <PullToRefresh onRefresh={handleRefresh}>
          <motion.div
            className="grid gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredStudents.map((student) => {
              const attendanceRate = getAttendanceRate(student.id);
              const progressPercent = student.progress_percent ?? 0;
              const isAtRisk = student.risk_level === 'High' || student.risk_level === 'Medium';
              const isSelected = selectedIds.has(student.id);

              return (
                <motion.div key={student.id} variants={staggerItem}>
                  <SwipeableCard
                    onTap={() => handleSelectStudent(student)}
                    onLongPress={() => handleLongPress(student.id)}
                    selected={isSelected}
                    rightActions={[
                      {
                        icon: <Phone className="h-5 w-5" />,
                        label: 'Call',
                        onClick: () => {
                          if (student.phone) window.location.href = `tel:${student.phone}`;
                        },
                        className: 'bg-success text-white',
                      },
                      {
                        icon: <Mail className="h-5 w-5" />,
                        label: 'Email',
                        onClick: () => {
                          window.location.href = `mailto:${student.email}`;
                        },
                        className: 'bg-info text-white',
                      },
                    ]}
                    leftActions={
                      isAtRisk
                        ? []
                        : [
                            {
                              icon: <AlertTriangle className="h-5 w-5" />,
                              label: 'Flag',
                              onClick: () => handleEditStudent(student),
                              className: 'bg-warning text-white',
                            },
                          ]
                    }
                  >
                    <motion.div {...tapAnimation}>
                      <Card className="relative overflow-hidden border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
                        {/* Gradient accent line */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow/50" />
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-elec-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />

                        <CardContent className="p-4 relative">
                          <div className="flex items-start gap-4">
                            {/* Batch checkbox or Avatar */}
                            {batchMode ? (
                              <div
                                className={cn(
                                  'h-12 w-12 shrink-0 rounded-full flex items-center justify-center border-2 transition-colors',
                                  isSelected
                                    ? 'bg-elec-yellow border-elec-yellow'
                                    : 'border-white/30'
                                )}
                              >
                                {isSelected && <CheckSquare className="h-5 w-5 text-black" />}
                              </div>
                            ) : (
                              <Avatar
                                className={cn(
                                  'h-12 w-12 shrink-0 ring-2 ring-offset-2 ring-offset-elec-gray',
                                  student.status === 'Active'
                                    ? isAtRisk
                                      ? 'ring-warning'
                                      : 'ring-success'
                                    : student.status === 'Withdrawn'
                                      ? 'ring-destructive'
                                      : 'ring-muted'
                                )}
                              >
                                <AvatarImage src={student.photo_url ?? undefined} />
                                <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                                  {getInitials(student.name)}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-white">{student.name}</h3>
                                  {student.uln && (
                                    <p className="text-sm text-white">ULN: {student.uln}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={getStatusColour(student.status)}
                                  >
                                    {student.status}
                                  </Badge>
                                  {isAtRisk && (
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        getRiskBadgeColour(student.risk_level),
                                        'flex items-center gap-1'
                                      )}
                                    >
                                      <AlertTriangle className="h-3 w-3" />
                                      {student.risk_level}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3.5 w-3.5" />
                                  <span className="truncate max-w-[150px]">{student.email}</span>
                                </div>
                                {student.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>{student.phone}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                                <Badge variant="secondary" className="text-xs">
                                  {getCohortName(student.cohort_id)}
                                </Badge>
                              </div>

                              {/* Progress Bar with Sparkline */}
                              <div className="mt-3 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-white">Progress</span>
                                  <div className="flex items-center gap-2">
                                    <ProgressSparkline
                                      data={getSparklineData(student)}
                                      width={50}
                                      height={16}
                                    />
                                    <span className="font-medium text-white">
                                      {progressPercent}%
                                    </span>
                                  </div>
                                </div>
                                <Progress value={progressPercent} className="h-1.5" />
                              </div>

                              {/* Stats Row */}
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                  <Clock
                                    className={cn(
                                      'h-3.5 w-3.5',
                                      attendanceRate >= 90
                                        ? 'text-success'
                                        : attendanceRate >= 80
                                          ? 'text-warning'
                                          : 'text-destructive'
                                    )}
                                  />
                                  <span className="text-xs text-white">
                                    {attendanceRate}% attendance
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <TrendingUp
                                    className={cn(
                                      'h-3.5 w-3.5',
                                      progressPercent >= 70
                                        ? 'text-success'
                                        : progressPercent >= 50
                                          ? 'text-warning'
                                          : 'text-destructive'
                                    )}
                                  />
                                  <span className="text-xs text-white">
                                    {progressPercent}% complete
                                  </span>
                                </div>
                                {student.expected_end_date && (
                                  <div className="flex items-center gap-1 text-xs text-white">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Due: {formatUKDateShort(student.expected_end_date)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </SwipeableCard>
                </motion.div>
              );
            })}

            {filteredStudents.length === 0 && !isLoading && (
              <motion.div variants={staggerItem}>
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardContent className="p-8 text-center space-y-3">
                    <GraduationCap className="h-12 w-12 mx-auto text-white" />
                    <p className="text-white font-medium">No students found</p>
                    <p className="text-sm text-white">
                      {hasActiveFilters
                        ? 'Try adjusting your search or filters.'
                        : 'Get started by enrolling your first student.'}
                    </p>
                    {!hasActiveFilters && (
                      <Button className="gap-2 mt-2" onClick={() => setAddStudentOpen(true)}>
                        <UserPlus className="h-4 w-4" />
                        Enrol Student
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </PullToRefresh>
      )}

      {/* Batch Actions Bar */}
      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border"
        >
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <p className="text-sm text-white font-medium">{selectedIds.size} selected</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-11 touch-manipulation gap-2"
                onClick={exitBatchMode}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-11 touch-manipulation gap-2 bg-warning hover:bg-warning/90 text-white"
                onClick={async () => {
                  const ids = Array.from(selectedIds);
                  for (const id of ids) {
                    await updateStudent(id, { risk_level: 'High' });
                  }
                  toast({
                    title: 'Students flagged',
                    description: `${ids.length} student${ids.length !== 1 ? 's' : ''} flagged as high risk.`,
                  });
                  exitBatchMode();
                }}
              >
                <AlertTriangle className="h-4 w-4" />
                Flag Risk
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <AddStudentDialog open={addStudentOpen} onOpenChange={setAddStudentOpen} />

      <StudentDetailSheet
        student={selectedStudent}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStudent}
        onWithdraw={handleWithdrawStudent}
      />

      <EditStudentSheet student={selectedStudent} open={editOpen} onOpenChange={setEditOpen} />

      <WithdrawStudentDialog
        student={selectedStudent}
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        onWithdrawn={() => {
          setSelectedStudent(null);
          setWithdrawOpen(false);
        }}
      />
    </div>
  );
}
