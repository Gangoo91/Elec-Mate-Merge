import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { AttendanceHeatmap } from '@/components/college/ui/AttendanceHeatmap';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import {
  getInitials,
  getStatusColour,
  getRiskBadgeColour,
  formatUKDateShort,
  computeAttendanceRate,
} from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Clock,
  Edit,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  UserMinus,
  Users,
  ClipboardList,
  Target,
} from 'lucide-react';

interface StudentDetailSheetProps {
  student: CollegeStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (student: CollegeStudent) => void;
  onWithdraw?: (student: CollegeStudent) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function StudentDetailSheet({
  student,
  open,
  onOpenChange,
  onEdit,
  onWithdraw,
}: StudentDetailSheetProps) {
  const { attendance, cohorts, ilps } = useCollegeSupabase();
  const [activeTab, setActiveTab] = useState('overview');

  const studentAttendance = useMemo(() => {
    if (!student) return [];
    return attendance
      .filter((a) => a.student_id === student.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [student, attendance]);

  const attendanceRate = useMemo(
    () => computeAttendanceRate(studentAttendance),
    [studentAttendance]
  );

  const cohortName = useMemo(() => {
    if (!student?.cohort_id) return 'Unassigned';
    return cohorts.find((c) => c.id === student.cohort_id)?.name || 'Unknown';
  }, [student, cohorts]);

  const studentILP = useMemo(() => {
    if (!student) return null;
    return ilps.find((ilp) => ilp.student_id === student.id && ilp.status === 'Active') || null;
  }, [student, ilps]);

  if (!student) return null;

  const progressPercent = student.progress_percent ?? 0;
  const isAtRisk = student.risk_level === 'High' || student.risk_level === 'Medium';

  const getAttendanceStatusIcon = (status: string | null) => {
    switch (status) {
      case 'Present':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'Absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'Late':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'Authorised':
        return <Calendar className="h-4 w-4 text-info" />;
      default:
        return <Clock className="h-4 w-4 text-white" />;
    }
  };

  const getAttendanceStatusColour = (status: string | null) => {
    switch (status) {
      case 'Present':
        return 'bg-success/10 text-success border-success/20';
      case 'Absent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Late':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Authorised':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted text-white';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <div className="flex items-start gap-4">
              <Avatar
                className={cn(
                  'h-16 w-16 shrink-0 ring-2 ring-offset-2 ring-offset-background',
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
                <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-lg font-semibold">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <SheetTitle className="text-xl text-left">{student.name}</SheetTitle>
                {student.uln && <p className="text-sm text-white mt-0.5">ULN: {student.uln}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className={getStatusColour(student.status)}>
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
                      {student.risk_level} Risk
                    </Badge>
                  )}
                  <Badge variant="secondary">{cohortName}</Badge>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              {student.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-11 touch-manipulation gap-2"
                  asChild
                >
                  <a href={`tel:${student.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-11 touch-manipulation gap-2"
                asChild
              >
                <a href={`mailto:${student.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              {isAtRisk && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11 touch-manipulation gap-2 border-warning/30 text-warning"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Flag</span>
                </Button>
              )}
            </div>
          </SheetHeader>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full justify-start gap-0 h-auto p-1 bg-muted/50 rounded-none border-b border-border flex-shrink-0">
              <TabsTrigger
                value="overview"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger
                value="ilp"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                ILP
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {/* Contact Details */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Contact Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-3 text-white">
                            <Mail className="h-4 w-4 shrink-0" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          {student.phone && (
                            <div className="flex items-center gap-3 text-white">
                              <Phone className="h-4 w-4 shrink-0" />
                              <span>{student.phone}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enrolment Details */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Enrolment
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-white text-xs">Cohort</p>
                            <p className="text-white font-medium">{cohortName}</p>
                          </div>
                          <div>
                            <p className="text-white text-xs">Status</p>
                            <p className="text-white font-medium">{student.status}</p>
                          </div>
                          <div>
                            <p className="text-white text-xs">Start Date</p>
                            <p className="text-white font-medium">
                              {formatUKDateShort(student.start_date)}
                            </p>
                          </div>
                          <div>
                            <p className="text-white text-xs">Expected End</p>
                            <p className="text-white font-medium">
                              {formatUKDateShort(student.expected_end_date)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Progress */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Progress
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Overall Progress</span>
                            <span className="text-lg font-bold text-white">{progressPercent}%</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />

                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <Clock
                                className={cn(
                                  'h-4 w-4',
                                  attendanceRate >= 90
                                    ? 'text-success'
                                    : attendanceRate >= 80
                                      ? 'text-warning'
                                      : 'text-destructive'
                                )}
                              />
                              <div>
                                <p className="text-lg font-bold text-white">{attendanceRate}%</p>
                                <p className="text-xs text-white">Attendance</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp
                                className={cn(
                                  'h-4 w-4',
                                  progressPercent >= 70
                                    ? 'text-success'
                                    : progressPercent >= 50
                                      ? 'text-warning'
                                      : 'text-destructive'
                                )}
                              />
                              <div>
                                <p className="text-lg font-bold text-white">{progressPercent}%</p>
                                <p className="text-xs text-white">Complete</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Attendance Tab */}
                {activeTab === 'attendance' && (
                  <motion.div
                    key="attendance"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {/* Attendance Summary */}
                    <Card className="border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-white">Attendance Rate</h4>
                          <span
                            className={cn(
                              'text-2xl font-bold',
                              attendanceRate >= 90
                                ? 'text-success'
                                : attendanceRate >= 80
                                  ? 'text-warning'
                                  : 'text-destructive'
                            )}
                          >
                            {attendanceRate}%
                          </span>
                        </div>
                        <Progress
                          value={attendanceRate}
                          className={cn(
                            'h-2',
                            attendanceRate < 80 && '[&>div]:bg-destructive',
                            attendanceRate >= 80 && attendanceRate < 90 && '[&>div]:bg-warning'
                          )}
                        />
                        <div className="flex justify-between text-xs text-white mt-2">
                          <span>{studentAttendance.length} sessions recorded</span>
                          <span>
                            {studentAttendance.filter((a) => a.status === 'Present').length} present
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Attendance Heatmap */}
                    <Card className="border-white/10">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Attendance Pattern
                        </h4>
                        <AttendanceHeatmap
                          records={studentAttendance.map((a) => ({
                            date: a.date,
                            status: a.status,
                          }))}
                          weeks={8}
                        />
                      </CardContent>
                    </Card>

                    {/* Recent Records */}
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      Recent Records
                    </h4>
                    <div className="space-y-2">
                      {studentAttendance.slice(0, 10).map((record) => (
                        <div
                          key={record.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-elec-gray border border-white/10"
                        >
                          {getAttendanceStatusIcon(record.status)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">
                              {new Date(record.date).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                              })}
                            </p>
                            {record.notes && (
                              <p className="text-xs text-white truncate">{record.notes}</p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              getAttendanceStatusColour(record.status),
                              'text-xs shrink-0'
                            )}
                          >
                            {record.status}
                          </Badge>
                        </div>
                      ))}

                      {studentAttendance.length === 0 && (
                        <Card className="border-white/10">
                          <CardContent className="p-6 text-center">
                            <Clock className="h-8 w-8 mx-auto text-white mb-2" />
                            <p className="text-sm text-white">No attendance records yet.</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ILP Tab */}
                {activeTab === 'ilp' && (
                  <motion.div
                    key="ilp"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {studentILP ? (
                      <>
                        {/* ILP Summary */}
                        <Card className="border-white/10">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                <ClipboardList className="h-4 w-4 text-elec-yellow" />
                                Individual Learning Plan
                              </h4>
                              <Badge
                                variant="outline"
                                className={getStatusColour(studentILP.status)}
                              >
                                {studentILP.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-white text-xs">Next Review</p>
                                <p className="text-white font-medium">
                                  {formatUKDateShort(studentILP.review_date)}
                                </p>
                              </div>
                              <div>
                                <p className="text-white text-xs">Last Reviewed</p>
                                <p className="text-white font-medium">
                                  {formatUKDateShort(studentILP.last_reviewed)}
                                </p>
                              </div>
                            </div>
                            {studentILP.support_needs && (
                              <div>
                                <p className="text-white text-xs mb-1">Support Needs</p>
                                <p className="text-sm text-white bg-elec-gray rounded-lg p-2">
                                  {studentILP.support_needs}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Targets */}
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                          Targets
                        </h4>
                        <div className="space-y-2">
                          {studentILP.targets?.map((target, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-lg bg-elec-gray border border-white/10"
                            >
                              <Target
                                className={cn(
                                  'h-4 w-4 mt-0.5 shrink-0',
                                  target.status === 'Achieved'
                                    ? 'text-success'
                                    : target.status === 'Overdue'
                                      ? 'text-destructive'
                                      : target.status === 'In Progress'
                                        ? 'text-info'
                                        : 'text-white'
                                )}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white">{target.description}</p>
                                <p className="text-xs text-white mt-1">
                                  Due: {formatUKDateShort(target.target_date)}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-xs shrink-0',
                                  target.status === 'Achieved' &&
                                    'bg-success/10 text-success border-success/20',
                                  target.status === 'Overdue' &&
                                    'bg-destructive/10 text-destructive border-destructive/20',
                                  target.status === 'In Progress' &&
                                    'bg-info/10 text-info border-info/20',
                                  target.status === 'Pending' && 'bg-muted text-white'
                                )}
                              >
                                {target.status}
                              </Badge>
                            </div>
                          ))}

                          {(!studentILP.targets || studentILP.targets.length === 0) && (
                            <Card className="border-white/10">
                              <CardContent className="p-6 text-center">
                                <Target className="h-8 w-8 mx-auto text-white mb-2" />
                                <p className="text-sm text-white">No targets set yet.</p>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </>
                    ) : (
                      <Card className="border-white/10">
                        <CardContent className="p-8 text-center space-y-3">
                          <ClipboardList className="h-12 w-12 mx-auto text-white" />
                          <p className="text-white font-medium">No Active ILP</p>
                          <p className="text-sm text-white">
                            This student does not have an active Individual Learning Plan.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    <Card className="border-white/10">
                      <CardContent className="p-8 text-center space-y-3">
                        <ClipboardList className="h-12 w-12 mx-auto text-white" />
                        <p className="text-white font-medium">Notes Coming Soon</p>
                        <p className="text-sm text-white">
                          Student notes and communication log will appear here.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          {/* Footer Actions */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={() => onEdit?.(student)}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            {student.status === 'Active' && (
              <Button
                variant="outline"
                className="h-11 touch-manipulation gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={() => onWithdraw?.(student)}
              >
                <UserMinus className="h-4 w-4" />
                Withdraw
              </Button>
            )}
            <Button
              variant="outline"
              className="h-11 touch-manipulation gap-2"
              onClick={() => onOpenChange(false)}
            >
              <Users className="h-4 w-4" />
              Reassign
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
