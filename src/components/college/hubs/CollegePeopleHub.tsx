import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { WithdrawStudentDialog } from '@/components/college/dialogs/WithdrawStudentDialog';
import { SmartSearchSheet } from '@/components/college/sheets/SmartSearchSheet';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent, CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { useQueryClient } from '@tanstack/react-query';
import {
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  HubGrid,
  HubCard,
  ListCard,
  ListRow,
  LoadingState,
  Pill,
  itemVariants,
} from '@/components/college/primitives';
import {
  useCurrentRiskForStudents,
  useRecomputeRisk,
} from '@/hooks/useStudentRisk';

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

  const queryClient = useQueryClient();

  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [staffDetailOpen, setStaffDetailOpen] = useState(false);
  const [staffEditOpen, setStaffEditOpen] = useState(false);

  const activeTutors = getStaffByRole('tutor')?.length ?? 0;
  const activeStudents = students?.filter((s) => s.status === 'Active').length ?? 0;
  const activeCohorts = cohorts?.filter((c) => c.status === 'Active').length ?? 0;
  const atRiskStudents = getStudentsAtRiskData() ?? [];
  const studentsAtRisk = atRiskStudents.length;

  // Pull computed risk rows for the visible at-risk list so we can surface
  // the top contributing factor as each row's subtitle.
  const atRiskIds = atRiskStudents.slice(0, 5).map((s) => s.id);
  const { byStudent: riskById, refresh: refreshRisk } =
    useCurrentRiskForStudents(atRiskIds);
  const { recompute, running: recomputing } = useRecomputeRisk();

  const handleRefreshRisk = async () => {
    await recompute({ student_ids: atRiskIds });
    await refreshRisk();
  };
  const supportStaffCount =
    staff?.filter((s) => ['admin', 'support', 'assessor'].includes(s.role) && s.status === 'Active')
      .length ?? 0;
  const overdueILPs = getOverdueILPReviewsData()?.length ?? 0;

  const navigate = useNavigate();
  const handleSelectStudent = (student: CollegeStudent) => {
    // Student 360 is a dedicated page; take tutors there rather than a side sheet.
    navigate(`/college/students/${student.id}`);
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

  if (isLoading) return <LoadingState />;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        {/* HERO */}
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="People Hub"
            title="Staff, students & cohorts"
            description="Manage your teaching staff, learners and class groups in one place."
            tone="blue"
            actions={
              <button
                onClick={() => setSearchOpen(true)}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Search →
              </button>
            }
          />
        </motion.div>

        {/* STAT STRIP */}
        <motion.div variants={itemVariants}>
          <StatStrip
            columns={4}
            stats={[
              {
                value: activeStudents,
                label: 'Students',
                sub: 'Enrolled & active',
                onClick: () => onNavigate('students'),
              },
              {
                value: activeTutors,
                label: 'Tutors',
                sub: 'Teaching staff',
                onClick: () => onNavigate('tutors'),
              },
              {
                value: activeCohorts,
                label: 'Cohorts',
                sub: 'Active class groups',
                onClick: () => onNavigate('cohorts'),
              },
              {
                value: studentsAtRisk,
                label: 'At Risk',
                sub: 'Require attention',
                onClick: () => onNavigate('progresstracking'),
                accent: studentsAtRisk > 0,
              },
            ]}
          />
        </motion.div>

        {/* PRIORITY — At Risk learners */}
        {studentsAtRisk > 0 && (
          <motion.section variants={itemVariants} className="space-y-5">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <SectionHeader
                eyebrow="Priority"
                title="Students requiring attention"
                action="View all"
                onAction={() => onNavigate('progresstracking')}
              />
              <button
                onClick={handleRefreshRisk}
                disabled={recomputing}
                className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors disabled:opacity-40"
              >
                {recomputing ? 'Refreshing risk…' : 'Refresh risk →'}
              </button>
            </div>
            <ListCard>
              {atRiskStudents.slice(0, 5).map((student) => {
                const initials = student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase();
                const risk = riskById.get(student.id);
                const topFactor = risk?.factors?.[0];
                const subtitle = topFactor
                  ? topFactor.label
                  : `${student.progress_percent ?? 0}% progress`;
                const level = risk?.level ?? student.risk_level?.toLowerCase();
                const tone =
                  level === 'critical' || level === 'high'
                    ? 'red'
                    : level === 'medium'
                      ? 'amber'
                      : 'yellow';
                const displayLevel =
                  (risk?.level ?? student.risk_level ?? '')
                    .toString()
                    .charAt(0)
                    .toUpperCase() +
                  (risk?.level ?? student.risk_level ?? '').toString().slice(1);
                return (
                  <ListRow
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    accent={tone}
                    lead={
                      <div className="h-9 w-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <span className="text-[11px] font-semibold text-white tabular-nums">
                          {initials}
                        </span>
                      </div>
                    }
                    title={student.name}
                    subtitle={subtitle}
                    trailing={
                      <div className="flex items-center gap-2 shrink-0">
                        {risk && risk.factors.length > 1 && (
                          <span className="text-[10.5px] text-white font-mono tabular-nums">
                            +{risk.factors.length - 1}
                          </span>
                        )}
                        <Pill tone={tone}>{displayLevel || 'Low'}</Pill>
                      </div>
                    }
                  />
                );
              })}
            </ListCard>
          </motion.section>
        )}

        {/* STAFF */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Staff" title="Teaching & support" />
          <HubGrid columns={2}>
            <HubCard
              number="01"
              eyebrow="Teaching Staff"
              title="Tutors"
              description="Manage teaching staff, qualifications and teaching allocations."
              tone="blue"
              meta={`${activeTutors} active`}
              onClick={() => onNavigate('tutors')}
            />
            <HubCard
              number="02"
              eyebrow="Assessors & Admin"
              title="Support Staff"
              description="Assessors, admin team and IQA — all non-teaching staff."
              tone="cyan"
              meta={`${supportStaffCount} active`}
              onClick={() => onNavigate('supportstaff')}
            />
          </HubGrid>
        </motion.section>

        {/* STUDENTS & GROUPS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Students & Groups" title="Learners & cohorts" />
          <HubGrid columns={3}>
            <HubCard
              number="03"
              eyebrow="Enrolled Learners"
              title="Students"
              description="Enrolments, profiles and learner records."
              tone="yellow"
              meta={`${activeStudents} active`}
              onClick={() => onNavigate('students')}
            />
            <HubCard
              number="04"
              eyebrow="Class Groups"
              title="Cohorts"
              description="Active cohorts and their learners."
              tone="emerald"
              meta={`${activeCohorts} active`}
              onClick={() => onNavigate('cohorts')}
            />
            <HubCard
              number="05"
              eyebrow="Records & Registers"
              title="Attendance"
              description="Session registers and attendance tracking."
              tone="purple"
              meta={overdueILPs > 0 ? `${overdueILPs} ILPs overdue` : 'Up to date'}
              onClick={() => onNavigate('attendance')}
            />
          </HubGrid>
        </motion.section>

        {/* EMPLOYER PARTNERS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Employer Partners" title="Employer engagement" />
          <HubGrid columns={1}>
            <HubCard
              number="06"
              eyebrow="Workplace Partners"
              title="Employer Portal"
              description="View apprentice progress, workplace reviews and employer engagement."
              tone="green"
              meta="0 employers"
              onClick={() => onNavigate('employerportal')}
            />
          </HubGrid>
        </motion.section>

        {/* Sheets & dialogs */}
        <SmartSearchSheet
          open={searchOpen}
          onOpenChange={setSearchOpen}
          onSelectStudent={handleSelectStudent}
          onSelectStaff={handleSelectStaff}
        />
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
      </PageFrame>
    </PullToRefresh>
  );
}
