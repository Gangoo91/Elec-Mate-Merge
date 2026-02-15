import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CollegeFeatureTile } from '@/components/college/CollegeFeatureTile';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { WithdrawStudentDialog } from '@/components/college/dialogs/WithdrawStudentDialog';
import { SmartSearchSheet } from '@/components/college/sheets/SmartSearchSheet';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { Button } from '@/components/ui/button';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent, CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getRiskBadgeColour } from '@/utils/collegeHelpers';
import { useQueryClient } from '@tanstack/react-query';
import {
  Users,
  UserCog,
  GraduationCap,
  UsersRound,
  AlertTriangle,
  Calendar,
  Building2,
  Loader2,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';

interface CollegePeopleHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function CollegePeopleHub({ onNavigate }: CollegePeopleHubProps) {
  const {
    staff,
    students,
    cohorts,
    isLoading,
    getStudentsAtRiskData,
    getStaffByRole,
    getOverdueILPReviewsData,
  } = useCollegeSupabase();

  const { staggerContainer, staggerItem } = useHapticFeedback();
  const queryClient = useQueryClient();

  const [atRiskExpanded, setAtRiskExpanded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // Smart Search
  const [searchOpen, setSearchOpen] = useState(false);

  // Staff detail from search
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [staffDetailOpen, setStaffDetailOpen] = useState(false);
  const [staffEditOpen, setStaffEditOpen] = useState(false);

  const activeTutors = getStaffByRole('tutor')?.length ?? 0;
  const activeStudents = students?.filter((s) => s.status === 'Active').length ?? 0;
  const activeCohorts = cohorts?.filter((c) => c.status === 'Active').length ?? 0;
  const atRiskStudents = getStudentsAtRiskData() ?? [];
  const studentsAtRisk = atRiskStudents.length;
  const supportStaffCount =
    staff?.filter((s) => ['admin', 'support', 'assessor'].includes(s.role) && s.status === 'Active')
      .length ?? 0;
  const overdueILPs = getOverdueILPReviewsData()?.length ?? 0;

  const handleSelectStudent = (student: CollegeStudent) => {
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

  const handleSelectStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setStaffDetailOpen(true);
  };

  const handleEditStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setStaffDetailOpen(false);
    setStaffEditOpen(true);
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-staff'] });
    await queryClient.invalidateQueries({ queryKey: ['college-students'] });
    await queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <motion.div
        className="space-y-4 md:space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <CollegeSectionHeader
          title="People Hub"
          description="Manage your teaching staff, students and cohorts"
          action={
            <Button
              variant="outline"
              className="gap-2 h-11 touch-manipulation"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          }
        />

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <Card
            className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-elec-yellow/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation"
            onClick={() => onNavigate('students')}
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{activeStudents}</p>
                <p className="text-xs text-white">Students</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-info/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation"
            onClick={() => onNavigate('tutors')}
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-info via-blue-400 to-info/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-info/20 to-info/5 border border-info/20 shadow-lg shadow-info/5 group-hover:scale-110 transition-transform duration-300">
                <UserCog className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{activeTutors}</p>
                <p className="text-xs text-white">Tutors</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-success/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation"
            onClick={() => onNavigate('cohorts')}
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-success via-green-400 to-success/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5 group-hover:scale-110 transition-transform duration-300">
                <UsersRound className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{activeCohorts}</p>
                <p className="text-xs text-white">Cohorts</p>
              </div>
            </CardContent>
          </Card>
          {studentsAtRisk > 0 && (
            <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-warning/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-warning via-orange-400 to-warning/50" />
              <CardContent className="p-3 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/20 shadow-lg shadow-warning/5 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{studentsAtRisk}</p>
                  <p className="text-xs text-white">At Risk</p>
                </div>
              </CardContent>
            </Card>
          )}
          {overdueILPs > 0 && (
            <Card className="relative overflow-hidden backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-destructive/30 shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-destructive via-red-400 to-destructive/50" />
              <CardContent className="p-3 flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 border border-destructive/20 shadow-lg shadow-destructive/5 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardList className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{overdueILPs}</p>
                  <p className="text-xs text-white">Overdue ILPs</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* At Risk Alert — Expandable with tappable student names */}
        {studentsAtRisk > 0 && (
          <motion.div variants={staggerItem}>
            <Card className="border-warning/30 bg-warning/5 overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="w-full p-4 flex items-center justify-between touch-manipulation"
                  onClick={() => setAtRiskExpanded(!atRiskExpanded)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-warning/10 border border-warning/20">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">
                        {studentsAtRisk} Student{studentsAtRisk !== 1 ? 's' : ''} Requiring
                        Attention
                      </p>
                      <p className="text-xs text-white">Tap to view and take action</p>
                    </div>
                  </div>
                  {atRiskExpanded ? (
                    <ChevronUp className="h-5 w-5 text-warning shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-warning shrink-0" />
                  )}
                </button>

                {atRiskExpanded && (
                  <div className="px-4 pb-4 space-y-2 border-t border-warning/20 pt-3">
                    {atRiskStudents.map((student) => (
                      <button
                        key={student.id}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-elec-gray/50 hover:bg-elec-gray border border-white/10 hover:border-warning/30 transition-all duration-200 touch-manipulation"
                        onClick={() => handleSelectStudent(student)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                            <span className="text-xs font-semibold text-warning">
                              {student.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">{student.name}</p>
                            <p className="text-xs text-white">
                              {student.progress_percent ?? 0}% progress
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getRiskBadgeColour(student.risk_level)}>
                          {student.risk_level}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Staff Management */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-info to-blue-500 rounded-full"></span>
            Staff
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CollegeFeatureTile
              icon={UserCog}
              title="Tutors"
              description="Teaching staff & qualifications"
              onClick={() => onNavigate('tutors')}
              badge={`${activeTutors} active`}
            />
            <CollegeFeatureTile
              icon={Users}
              title="Support Staff"
              description="Assessors, admin & IQA"
              onClick={() => onNavigate('supportstaff')}
              badge={`${supportStaffCount} active`}
            />
          </div>
        </motion.div>

        {/* Students & Cohorts */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
            Students & Groups
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <CollegeFeatureTile
              icon={GraduationCap}
              title="Students"
              description="Enrolments & profiles"
              onClick={() => onNavigate('students')}
              badge={`${activeStudents}`}
              compact
            />
            <CollegeFeatureTile
              icon={UsersRound}
              title="Cohorts"
              description="Class groups"
              onClick={() => onNavigate('cohorts')}
              badge={`${activeCohorts}`}
              compact
            />
            <CollegeFeatureTile
              icon={Calendar}
              title="Attendance"
              description="Records & registers"
              onClick={() => onNavigate('attendance')}
              compact
            />
          </div>
        </motion.div>

        {/* Employers */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-success to-green-500 rounded-full"></span>
            Employer Partners
          </h2>
          <CollegeFeatureTile
            icon={Building2}
            title="Employer Portal"
            description="View apprentice progress & employer engagement"
            onClick={() => onNavigate('employerportal')}
            badge="0 employers"
          />
        </motion.div>

        {/* Smart Search Sheet */}
        <SmartSearchSheet
          open={searchOpen}
          onOpenChange={setSearchOpen}
          onSelectStudent={handleSelectStudent}
          onSelectStaff={handleSelectStaff}
        />

        {/* Student Detail Sheet — accessible from at-risk list & search */}
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

        {/* Staff Detail Sheet — accessible from search */}
        <StaffDetailSheet
          staff={selectedStaff}
          open={staffDetailOpen}
          onOpenChange={setStaffDetailOpen}
          onEdit={handleEditStaff}
        />

        <EditStaffSheet
          staff={selectedStaff}
          open={staffEditOpen}
          onOpenChange={setStaffEditOpen}
        />
      </motion.div>
    </PullToRefresh>
  );
}
