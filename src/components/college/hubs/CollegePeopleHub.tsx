/**
 * People Hub — learners, tutors, cohorts, support staff and employers.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`), the same
 * one the College overview, the Business Hub and Inspection & Testing use.
 * The masthead is drawn by CollegeDashboard; this is only the body:
 *
 *   quick start → KPI row → at-risk list → staff & partners → learners
 *
 * What went, and why:
 *
 * The HERO ("People Hub / Staff, students & cohorts" plus a sentence saying
 * the same thing again) and the NUMBERED, COLOUR-TONED cards — blue, amber,
 * cyan, yellow, emerald, purple, green on one screen. Colour now only encodes
 * state: a volt figure means work outstanding.
 *
 * Three sheets were deleted, not moved: StudentDetailSheet, EditStudentSheet
 * and WithdrawStudentDialog. `detailOpen` was only ever set to false — a
 * learner tap navigates to Student 360 — so the detail sheet never opened, and
 * edit/withdraw were only reachable from inside it. Dead code, not a lost
 * destination.
 *
 * Two counts were corrected, see the comments beside them.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SmartSearchSheet } from '@/components/college/sheets/SmartSearchSheet';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent, CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { useCurrentRiskForStudents, useRecomputeRisk } from '@/hooks/useStudentRisk';
import { useCollegeEmployers } from '@/hooks/useCollegeEmployers';
import { itemVariants } from '@/components/college/primitives';
import {
  HubQuickStart,
  HubKpi,
  HubKpiRow,
  HubWorkList,
  HubToolGrid,
  type HubTool,
  type HubQuickAction,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';

interface CollegePeopleHubProps {
  onNavigate: (section: CollegeSection) => void;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function CollegePeopleHub({ onNavigate }: CollegePeopleHubProps) {
  const navigate = useNavigate();
  const { staff, students, cohorts, isLoading, getStudentsAtRiskData, getStaffByRole } =
    useCollegeSupabase();
  const { employers } = useCollegeEmployers();

  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [staffDetailOpen, setStaffDetailOpen] = useState(false);
  const [staffEditOpen, setStaffEditOpen] = useState(false);

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const activeCohorts = cohorts.filter((c) => c.status === 'Active').length;
  const atRiskStudents = getStudentsAtRiskData();
  const studentsAtRisk = atRiskStudents.length;

  /*
   * Same definition the Support Staff page uses (SupportStaffSection.tsx:44):
   * anyone who is not a tutor or head of department and is not archived.
   * This card used to count `role in ('admin','support','assessor') AND status
   * = 'Active'`, so it disagreed with the page it opened — IQA staff and
   * anyone with a status other than 'Active' were missing from the figure but
   * present in the list.
   */
  const supportStaffCount = staff.filter(
    (s) => s.role !== 'tutor' && s.role !== 'head_of_department' && s.status !== 'Archived'
  ).length;

  // The computed risk rows for the visible list, so each row can say WHY the
  // learner is on it rather than just that they are.
  const atRiskIds = useMemo(() => atRiskStudents.slice(0, 5).map((s) => s.id), [atRiskStudents]);
  const { byStudent: riskById, refresh: refreshRisk } = useCurrentRiskForStudents(atRiskIds);
  const { recompute, running: recomputing } = useRecomputeRisk();

  const handleRefreshRisk = async () => {
    await recompute({ student_ids: atRiskIds });
    await refreshRisk();
  };

  const openStudent = (student: CollegeStudent) => {
    // Student 360 is a page, not a side sheet.
    navigate(`/college/students/${student.id}`);
  };
  const openStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setStaffDetailOpen(true);
  };
  const editStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setStaffDetailOpen(false);
    setStaffEditOpen(true);
  };

  /*
   * ── At risk ──────────────────────────────────────────────────────────
   * The one list on this page. Critical and high outrank medium; the reason
   * is the top contributing factor when the risk engine has one, else the
   * learner's progress figure. The trailing figure is the risk level as a
   * word — a score out of 100 means nothing to a tutor between classes.
   */
  const work: HubWorkItem[] = useMemo(() => {
    const items = atRiskStudents.slice(0, 5).map((student): HubWorkItem => {
      const risk = riskById.get(student.id);
      const level = (risk?.level ?? student.risk_level ?? 'medium').toString().toLowerCase();
      const topFactor = risk?.factors?.[0]?.label;
      const extra = risk && risk.factors.length > 1 ? `+${risk.factors.length - 1} more` : null;
      return {
        id: student.id,
        title: student.name,
        reason: [topFactor ?? `${student.progress_percent ?? 0}% progress`, extra]
          .filter(Boolean)
          .join(' · '),
        trailing: level.charAt(0).toUpperCase() + level.slice(1),
        urgent: level === 'critical' || level === 'high',
        onClick: () => navigate(`/college/students/${student.id}`),
      };
    });
    return items.sort((a, b) => Number(!!b.urgent) - Number(!!a.urgent));
  }, [atRiskStudents, riskById, navigate]);

  /*
   * ── Start something ──────────────────────────────────────────────────
   * Finding a person is what this page is for, so it takes the one solid
   * volt card. The masthead's ⌘K palette only searches learners; this sheet
   * searches staff too.
   */
  const quickStart: HubQuickAction[] = [
    {
      title: 'Find someone',
      description: 'Learners, tutors and support staff',
      onClick: () => setSearchOpen(true),
      primary: true,
    },
    {
      title: 'Take a register',
      description: 'Attendance for a class',
      onClick: () => onNavigate('attendance'),
    },
    {
      title: 'Compare cohorts',
      description: 'Progress, attendance, OTJ and EPA side by side',
      onClick: () => navigate('/college/compare'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   * Four and four. The grid is auto-fit, and auto-fit only collapses tracks
   * that are empty for the whole grid, so a group of one (the old "Employer
   * partners" section) drew a single card in a quarter-width track.
   *
   * A card reports a figure when it has one and says what it is for when it
   * doesn't — never both.
   */
  const staffAndPartners: HubTool[] = [
    {
      id: 'tutors',
      title: 'Tutors',
      onClick: () => onNavigate('tutors'),
      value: activeTutors > 0 ? String(activeTutors) : undefined,
      valueLabel: activeTutors > 0 ? 'teaching' : undefined,
      description: 'Teaching staff, qualifications and allocations.',
    },
    {
      id: 'support-staff',
      title: 'Support staff',
      onClick: () => onNavigate('supportstaff'),
      value: supportStaffCount > 0 ? String(supportStaffCount) : undefined,
      valueLabel: supportStaffCount > 0 ? 'assessors, IQA and admin' : undefined,
      description: 'Assessors, IQA and the admin team.',
    },
    {
      id: 'workload',
      title: 'Workload',
      onClick: () => onNavigate('tutorworkload'),
      description: 'Cohorts, lessons, marking and observation recency per tutor.',
    },
    {
      // Was a hard-coded "0 employers". Now the same query the Employer Portal
      // page runs, scoped to this college.
      id: 'employers',
      title: 'Employer portal',
      onClick: () => onNavigate('employerportal'),
      value: employers.length > 0 ? String(employers.length) : undefined,
      valueLabel: employers.length > 0 ? 'employers linked' : undefined,
      description: 'Apprentice progress, workplace reviews and employer engagement.',
    },
  ];

  const learners: HubTool[] = [
    {
      id: 'students',
      title: 'Students',
      onClick: () => onNavigate('students'),
      value: activeStudents > 0 ? String(activeStudents) : undefined,
      valueLabel: activeStudents > 0 ? 'active on the roll' : undefined,
      description: 'Enrolments, profiles and learner records.',
    },
    {
      id: 'cohorts',
      title: 'Cohorts',
      onClick: () => onNavigate('cohorts'),
      value: activeCohorts > 0 ? String(activeCohorts) : undefined,
      valueLabel: activeCohorts > 0 ? 'active class groups' : undefined,
      description: 'Class groups and the learners in them.',
    },
    {
      // This card used to carry "N ILPs overdue" — an ILP figure on the
      // attendance card, because it was the only spare number on the page.
      id: 'attendance',
      title: 'Attendance',
      onClick: () => onNavigate('attendance'),
      description: 'Session registers and attendance patterns.',
    },
    {
      id: 'progress',
      title: 'Progress tracking',
      onClick: () => onNavigate('progresstracking'),
      value: studentsAtRisk > 0 ? String(studentsAtRisk) : undefined,
      valueLabel: studentsAtRisk > 0 ? 'learners at risk' : undefined,
      description: 'RAG ratings, progress scores and at-risk flags.',
      alert: studentsAtRisk > 0,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <HubQuickStart label="Start something" items={quickStart} />

      {/* Four KPIs, capped at four on purpose. One accent, the first. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Learners"
          value={String(activeStudents)}
          verdict={activeStudents > 0 ? 'Active on the roll' : 'No active learners yet'}
          context={activeCohorts > 0 ? `Across ${plural(activeCohorts, 'cohort')}` : undefined}
          onClick={() => onNavigate('students')}
        />
        <HubKpi
          label="Tutors"
          value={String(activeTutors)}
          verdict={activeTutors > 0 ? 'Teaching this year' : 'No tutors added yet'}
          context={
            supportStaffCount > 0 ? `${plural(supportStaffCount, 'support colleague')}` : undefined
          }
          onClick={() => onNavigate('tutors')}
        />
        <HubKpi
          label="Cohorts"
          value={String(activeCohorts)}
          verdict={activeCohorts > 0 ? 'Running now' : 'No active cohorts'}
          onClick={() => onNavigate('cohorts')}
        />
        <HubKpi
          label="At risk"
          value={String(studentsAtRisk)}
          verdict={
            work.some((w) => w.urgent)
              ? 'High or critical — check in today'
              : studentsAtRisk > 0
                ? 'Worth a check-in this week'
                : 'Nothing flagged'
          }
          sentiment={studentsAtRisk > 0 ? 'bad' : 'neutral'}
          onClick={() => onNavigate('progresstracking')}
        />
      </HubKpiRow>

      {/* Renders nothing when nobody is flagged — a short page is the reward. */}
      <HubWorkList label="At risk" items={work} unit="learner" />

      {studentsAtRisk > 0 && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="-mt-6 flex justify-end sm:-mt-8"
        >
          {/* Volt as TEXT, not a second solid button — the quick-start card
              above is the one solid volt control on this screen. */}
          <button
            type="button"
            onClick={handleRefreshRisk}
            disabled={recomputing}
            className="flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation disabled:text-white"
          >
            {recomputing ? 'Refreshing risk…' : 'Refresh risk scores'}
          </button>
        </motion.div>
      )}

      <HubToolGrid label="Staff & partners" cards={staffAndPartners} columns="four" />

      <HubToolGrid label="Learners" cards={learners} columns="four" />

      <SmartSearchSheet
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectStudent={openStudent}
        onSelectStaff={openStaff}
      />
      <StaffDetailSheet
        staff={selectedStaff}
        open={staffDetailOpen}
        onOpenChange={setStaffDetailOpen}
        onEdit={editStaff}
      />
      <EditStaffSheet staff={selectedStaff} open={staffEditOpen} onOpenChange={setStaffEditOpen} />
    </>
  );
}
