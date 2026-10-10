import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSmartBack } from '@/lib/navHistory';
import { Search } from 'lucide-react';
import { CollegeSupabaseProvider } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { CommandPalette } from '@/components/college/CommandPalette';
import { CollegeAreaNav } from '@/components/college/nav/CollegeAreaNav';
import { NotificationCenter } from '@/components/college/NotificationCenter';
import { QuickRegisterSheet } from '@/components/college/teaching/QuickRegisterSheet';
import { CollegeActButton } from '@/components/college/CollegeActSheet';
import { CollegeScopeSwitch } from '@/components/college/scope/CollegeScopeSwitch';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubMastheadExtraContext,
} from '@/components/hub/HubPrimitives';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { SectionSkeleton } from '@/components/ui/page-skeleton';

// Lazy-loaded sections for code splitting
const CollegeOverviewSection = lazy(() =>
  import('@/components/college/sections/CollegeOverviewSection').then((m) => ({
    default: m.CollegeOverviewSection,
  }))
);
const TutorsSection = lazy(() =>
  import('@/components/college/sections/TutorsSection').then((m) => ({ default: m.TutorsSection }))
);
const StudentsSection = lazy(() =>
  import('@/components/college/sections/StudentsSection').then((m) => ({
    default: m.StudentsSection,
  }))
);
const CohortsSection = lazy(() =>
  import('@/components/college/sections/CohortsSection').then((m) => ({
    default: m.CohortsSection,
  }))
);
const SupportStaffSection = lazy(() =>
  import('@/components/college/sections/SupportStaffSection').then((m) => ({
    default: m.SupportStaffSection,
  }))
);
const CoursesSection = lazy(() =>
  import('@/components/college/sections/CoursesSection').then((m) => ({
    default: m.CoursesSection,
  }))
);
const CourseManagementSection = lazy(() =>
  import('@/components/college/sections/CourseManagementSection').then((m) => ({
    default: m.CourseManagementSection,
  }))
);
const SafeguardingQueueSection = lazy(() =>
  import('@/components/college/sections/SafeguardingQueueSection').then((m) => ({
    default: m.SafeguardingQueueSection,
  }))
);
const LessonPlansSection = lazy(() =>
  import('@/components/college/sections/LessonPlansSection').then((m) => ({
    default: m.LessonPlansSection,
  }))
);
const TeachingResourcesSection = lazy(() =>
  import('@/components/college/sections/TeachingResourcesSection').then((m) => ({
    default: m.TeachingResourcesSection,
  }))
);
const GradingSection = lazy(() =>
  import('@/components/college/sections/GradingSection').then((m) => ({
    default: m.GradingSection,
  }))
);
const AttendanceSection = lazy(() =>
  import('@/components/college/sections/AttendanceSection').then((m) => ({
    default: m.AttendanceSection,
  }))
);
const ILPManagementSection = lazy(() =>
  import('@/components/college/sections/ILPManagementSection').then((m) => ({
    default: m.ILPManagementSection,
  }))
);
const EPATrackingSection = lazy(() =>
  import('@/components/college/sections/EPATrackingSection').then((m) => ({
    default: m.EPATrackingSection,
  }))
);
const ProgressTrackingSection = lazy(() =>
  import('@/components/college/sections/ProgressTrackingSection').then((m) => ({
    default: m.ProgressTrackingSection,
  }))
);
// PortfolioSection was a 26-line passthrough to CollegePortfolioHub — deleted.
// We render CollegePortfolioHub directly via the `portfolio` case below.
const CollegePortfolioHub = lazy(() =>
  import('@/components/college/portfolio/CollegePortfolioHub').then((m) => ({
    default: m.default,
  }))
);
const WorkQueueSection = lazy(() =>
  import('@/components/college/sections/WorkQueueSection').then((m) => ({
    default: m.WorkQueueSection,
  }))
);
const ComplianceDocsSection = lazy(() =>
  import('@/components/college/sections/ComplianceDocsSection').then((m) => ({
    default: m.ComplianceDocsSection,
  }))
);
const LTISettingsSection = lazy(() =>
  import('@/components/college/sections/LTISettingsSection').then((m) => ({
    default: m.LTISettingsSection,
  }))
);
const CollegeSettingsSection = lazy(() =>
  import('@/components/college/sections/CollegeSettingsSection').then((m) => ({
    default: m.CollegeSettingsSection,
  }))
);
const TutorNotebookSection = lazy(() =>
  import('@/components/college/sections/TutorNotebookSection').then((m) => ({
    default: m.TutorNotebookSection,
  }))
);
const SchemesOfWorkSection = lazy(() =>
  import('@/components/college/sections/SchemesOfWorkSection').then((m) => ({
    default: m.SchemesOfWorkSection,
  }))
);
const CriteriaGapsSection = lazy(() =>
  import('@/components/college/sections/CriteriaGapsSection').then((m) => ({
    default: m.CriteriaGapsSection,
  }))
);
const DocumentLibrarySection = lazy(() =>
  import('@/components/college/sections/DocumentLibrarySection').then((m) => ({
    default: m.DocumentLibrarySection,
  }))
);
const EmployerPortalSection = lazy(() =>
  import('@/components/college/sections/EmployerPortalSection').then((m) => ({
    default: m.EmployerPortalSection,
  }))
);

// New feature sections (batch 1)
const OTJTrainingSection = lazy(() =>
  import('@/components/college/sections/OTJTrainingSection').then((m) => ({
    default: m.OTJTrainingSection,
  }))
);
const Student360Section = lazy(() =>
  import('@/components/college/sections/Student360Section').then((m) => ({
    default: m.Student360Section,
  }))
);
const QualityDashboardSection = lazy(() =>
  import('@/components/college/sections/QualityDashboardSection').then((m) => ({
    default: m.QualityDashboardSection,
  }))
);
const TimetableSection = lazy(() =>
  import('@/components/college/sections/TimetableSection').then((m) => ({
    default: m.TimetableSection,
  }))
);

// New feature sections (batch 2)
const AIILPGeneratorSection = lazy(() =>
  import('@/components/college/sections/AIILPGeneratorSection').then((m) => ({
    default: m.AIILPGeneratorSection,
  }))
);
const IQAWorkflowSection = lazy(() =>
  import('@/components/college/sections/IQAWorkflowSection').then((m) => ({
    default: m.IQAWorkflowSection,
  }))
);
const BatchOperationsSection = lazy(() =>
  import('@/components/college/sections/BatchOperationsSection').then((m) => ({
    default: m.BatchOperationsSection,
  }))
);
const AssessmentCalendarSection = lazy(() =>
  import('@/components/college/sections/AssessmentCalendarSection').then((m) => ({
    default: m.AssessmentCalendarSection,
  }))
);
const ResourceAnalyticsSection = lazy(() =>
  import('@/components/college/sections/ResourceAnalyticsSection').then((m) => ({
    default: m.ResourceAnalyticsSection,
  }))
);
const IqaOtjAuditSection = lazy(() =>
  import('@/components/college/sections/IqaOtjAuditSection').then((m) => ({
    default: m.IqaOtjAuditSection,
  }))
);
const TutorObsSection = lazy(() =>
  import('@/components/college/sections/TutorObsSection').then((m) => ({
    default: m.TutorObsSection,
  }))
);
const AuditLogSection = lazy(() =>
  import('@/components/college/sections/AuditLogSection').then((m) => ({
    default: m.AuditLogSection,
  }))
);
const TutorWorkloadSection = lazy(() =>
  import('@/components/college/sections/TutorWorkloadSection').then((m) => ({
    default: m.TutorWorkloadSection,
  }))
);

// Lazy-loaded hubs
const CollegePeopleHub = lazy(() =>
  import('@/components/college/hubs/CollegePeopleHub').then((m) => ({
    default: m.CollegePeopleHub,
  }))
);
const CurriculumHub = lazy(() =>
  import('@/components/college/hubs/CurriculumHub').then((m) => ({ default: m.CurriculumHub }))
);
const AssessmentHub = lazy(() =>
  import('@/components/college/hubs/AssessmentHub').then((m) => ({ default: m.AssessmentHub }))
);
const QualityComplianceHub = lazy(() =>
  import('@/components/college/hubs/QualityComplianceHub').then((m) => ({
    default: m.QualityComplianceHub,
  }))
);
const ResourcesHub = lazy(() =>
  import('@/components/college/hubs/ResourcesHub').then((m) => ({ default: m.ResourcesHub }))
);

// Skeleton loader for lazy components
const SectionLoader = SectionSkeleton;

export type CollegeSection =
  | 'overview'
  // Hubs
  | 'peoplehub'
  | 'curriculumhub'
  | 'assessmenthub'
  | 'resourceshub'
  | 'qualityhub'
  // People Hub sections
  | 'tutors'
  | 'students'
  | 'cohorts'
  | 'supportstaff'
  // Curriculum Hub sections
  | 'courses'
  | 'coursesetup'
  | 'lessonplans'
  | 'teachingresources'
  | 'tutornotebook'
  | 'schemesofwork'
  | 'criteriagaps'
  | 'documentlibrary'
  // Assessment Hub sections
  | 'grading'
  | 'attendance'
  | 'ilpmanagement'
  | 'epatracking'
  | 'progresstracking'
  | 'portfolio'
  | 'workqueue'
  // Resources Hub sections
  | 'compliancedocs'
  | 'safeguardingqueue'
  | 'ltisettings'
  | 'collegesettings'
  // Employer Portal
  | 'employerportal'
  // New sections
  | 'otjtraining'
  | 'student360'
  | 'qualitydashboard'
  | 'timetable'
  | 'aiilpgenerator'
  | 'iqaworkflow'
  | 'batchoperations'
  | 'assessmentcalendar'
  | 'resourceanalytics'
  | 'iqaotjaudit'
  | 'tutorobs'
  | 'auditlog'
  | 'tutorworkload';

// Section titles for the header
const sectionTitles: Record<CollegeSection, string> = {
  overview: 'Home',
  peoplehub: 'People',
  curriculumhub: 'Curriculum',
  assessmenthub: 'Assessment',
  resourceshub: 'Resources',
  qualityhub: 'Quality and compliance',
  tutors: 'Tutors',
  students: 'Learners',
  cohorts: 'Cohorts',
  supportstaff: 'Support staff',
  courses: 'Courses',
  coursesetup: 'Course setup',
  lessonplans: 'Lesson plans',
  teachingresources: 'Teaching resources',
  tutornotebook: 'Learner notebook',
  schemesofwork: 'Schemes of work',
  criteriagaps: 'Criteria gaps',
  documentlibrary: 'Document library',
  grading: 'Grading',
  attendance: 'Attendance',
  ilpmanagement: 'Learning plans',
  epatracking: 'EPA readiness',
  progresstracking: 'Progress',
  portfolio: 'Portfolio',
  workqueue: 'Work queue',
  compliancedocs: 'Compliance documents',
  safeguardingqueue: 'Safeguarding',
  ltisettings: 'VLE integration',
  collegesettings: 'College settings',
  employerportal: 'Employers',
  otjtraining: 'Off-the-job training',
  student360: 'Learner profile',
  qualitydashboard: 'Quality dashboard',
  timetable: 'Timetable',
  aiilpgenerator: 'Draft learning plans',
  iqaworkflow: 'IQA',
  batchoperations: 'Bulk jobs',
  assessmentcalendar: 'Assessment calendar',
  resourceanalytics: 'Resource use',
  iqaotjaudit: 'IQA: off-the-job audit',
  tutorobs: 'Lesson observations',
  auditlog: 'Audit log',
  tutorworkload: 'Tutor workload',
};

// Act is in this masthead's own `trailing` (it opens the register in place), so
// CollegeGuard's is switched off here; the masthead still parks under the header.
const DASHBOARD_MASTHEAD = { stickBelowHeader: true, nav: <CollegeAreaNav /> };

/** Each section's home hub: where Back goes when the page was opened cold. */
const SECTION_PARENT: Partial<Record<CollegeSection, CollegeSection>> = {
  peoplehub: 'overview',
  curriculumhub: 'overview',
  assessmenthub: 'overview',
  resourceshub: 'overview',
  qualityhub: 'overview',
  tutors: 'peoplehub',
  students: 'peoplehub',
  cohorts: 'peoplehub',
  supportstaff: 'peoplehub',
  employerportal: 'peoplehub',
  tutorworkload: 'peoplehub',
  student360: 'students',
  courses: 'curriculumhub',
  coursesetup: 'curriculumhub',
  lessonplans: 'curriculumhub',
  teachingresources: 'curriculumhub',
  tutornotebook: 'curriculumhub',
  schemesofwork: 'curriculumhub',
  criteriagaps: 'curriculumhub',
  documentlibrary: 'curriculumhub',
  timetable: 'curriculumhub',
  grading: 'assessmenthub',
  attendance: 'assessmenthub',
  ilpmanagement: 'assessmenthub',
  epatracking: 'assessmenthub',
  progresstracking: 'assessmenthub',
  portfolio: 'assessmenthub',
  workqueue: 'assessmenthub',
  otjtraining: 'assessmenthub',
  aiilpgenerator: 'assessmenthub',
  batchoperations: 'assessmenthub',
  assessmentcalendar: 'assessmenthub',
  compliancedocs: 'qualityhub',
  iqaworkflow: 'qualityhub',
  qualitydashboard: 'qualityhub',
  safeguardingqueue: 'qualityhub',
  tutorobs: 'qualityhub',
  auditlog: 'qualityhub',
  iqaotjaudit: 'qualityhub',
  ltisettings: 'resourceshub',
  collegesettings: 'resourceshub',
  resourceanalytics: 'resourceshub',
};

const CollegeDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = (searchParams.get('section') as CollegeSection) || 'overview';
  const setActiveSection = (section: CollegeSection) =>
    setSearchParams({ section }, { replace: false });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  // ELE-1891: Act → Register opens here; `?act=register` arrives from Act on
  // pages outside the dashboard.
  const [registerOpen, setRegisterOpen] = useState(false);
  useEffect(() => {
    if (searchParams.get('act') !== 'register') return;
    setRegisterOpen(true);
    const next = new URLSearchParams(searchParams);
    next.delete('act');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  // The masthead names the COLLEGE on the home screen, not the generic
  // "College Dashboard" — a tutor at Northgate should see Northgate. Inner
  // sections keep their own title so the reader knows where they are.
  const { staff: me } = useMyCollegeContext();
  const mastheadTitle =
    activeSection === 'overview'
      ? me?.college_name?.trim() || 'College Hub'
      : sectionTitles[activeSection];

  // The home (six-area overview) is the front door for EVERY role — it embeds
  // the daily "Today" view and the nav on one page, so tutors get their
  // daily-driver without being trapped on /college/today (which had no way back
  // to the hub). /college/today stays reachable via the "My Work" area card.

  // Cmd/Ctrl+K opens the learner search the masthead advertises. Caught on the
  // way down (window, capture) and stopped there: the app header's own Cmd+K
  // (focus the sidebar search) is a document listener that ran first and
  // marked the key handled, so the palette never opened in the College Hub.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return;
      e.preventDefault();
      e.stopPropagation();
      setCommandPaletteOpen(true);
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Escape',
      handler: (event) => {
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false);
          return;
        }
        // Escape belongs to an open sheet, dialog or menu: it closes that and
        // must not also jump the page back to its hub underneath. The sheet
        // has usually closed by the time this runs, so look at where focus was
        // when the key went down, as well as what is still open.
        const overlay = '[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]';
        const from = event.target instanceof Element ? event.target : null;
        if (from?.closest(overlay) || document.querySelector(overlay)) return;
        if (activeSection !== 'overview') handleBack();
      },
    },
  ]);

  const handleNavigate = useCallback((section: CollegeSection | string) => {
    // Section name mapping for flexibility
    const sectionMap: Record<string, CollegeSection> = {
      // Main
      overview: 'overview',
      dashboard: 'overview',
      home: 'overview',

      // Hubs
      'people-hub': 'peoplehub',
      peoplehub: 'peoplehub',
      'people hub': 'peoplehub',
      people: 'peoplehub',
      'curriculum-hub': 'curriculumhub',
      curriculumhub: 'curriculumhub',
      'curriculum hub': 'curriculumhub',
      curriculum: 'curriculumhub',
      'assessment-hub': 'assessmenthub',
      assessmenthub: 'assessmenthub',
      'assessment hub': 'assessmenthub',
      assessment: 'assessmenthub',
      'resources-hub': 'resourceshub',
      resourceshub: 'resourceshub',
      'resources hub': 'resourceshub',
      resources: 'resourceshub',

      // People Hub sections
      tutors: 'tutors',
      staff: 'tutors',
      teachers: 'tutors',
      students: 'students',
      learners: 'students',
      apprentices: 'students',
      cohorts: 'cohorts',
      classes: 'cohorts',
      groups: 'cohorts',
      'support-staff': 'supportstaff',
      supportstaff: 'supportstaff',
      'support staff': 'supportstaff',
      admin: 'supportstaff',

      // Curriculum Hub sections
      courses: 'courses',
      qualifications: 'courses',
      'lesson-plans': 'lessonplans',
      lessonplans: 'lessonplans',
      'lesson plans': 'lessonplans',
      lessons: 'lessonplans',
      'teaching-resources': 'teachingresources',
      teachingresources: 'teachingresources',
      'teaching resources': 'teachingresources',
      materials: 'teachingresources',
      'tutor-notebook': 'tutornotebook',
      tutornotebook: 'tutornotebook',
      'tutor notebook': 'tutornotebook',
      notebook: 'tutornotebook',
      'teaching-notebook': 'tutornotebook',
      'schemes-of-work': 'schemesofwork',
      schemesofwork: 'schemesofwork',
      'schemes of work': 'schemesofwork',
      schemes: 'schemesofwork',
      sow: 'schemesofwork',
      'document-library': 'documentlibrary',
      documentlibrary: 'documentlibrary',
      'document library': 'documentlibrary',
      documents: 'documentlibrary',
      docs: 'documentlibrary',

      // Assessment Hub sections
      grading: 'grading',
      grades: 'grading',
      assessments: 'grading',
      marking: 'grading',
      attendance: 'attendance',
      registers: 'attendance',
      'ilp-management': 'ilpmanagement',
      ilpmanagement: 'ilpmanagement',
      'ilp management': 'ilpmanagement',
      ilps: 'ilpmanagement',
      'epa-tracking': 'epatracking',
      epatracking: 'epatracking',
      'epa tracking': 'epatracking',
      epa: 'epatracking',
      'progress-tracking': 'progresstracking',
      progresstracking: 'progresstracking',
      'progress tracking': 'progresstracking',
      progress: 'progresstracking',
      portfolio: 'portfolio',
      portfolios: 'portfolio',
      evidence: 'portfolio',
      workqueue: 'workqueue',
      'work-queue': 'workqueue',
      'work queue': 'workqueue',
      queue: 'workqueue',

      // Resources Hub sections
      'compliance-docs': 'compliancedocs',
      compliancedocs: 'compliancedocs',
      'compliance docs': 'compliancedocs',
      compliance: 'compliancedocs',
      policies: 'compliancedocs',
      'lti-settings': 'ltisettings',
      ltisettings: 'ltisettings',
      'lti settings': 'ltisettings',
      lti: 'ltisettings',
      vle: 'ltisettings',
      canvas: 'ltisettings',
      moodle: 'ltisettings',
      'college-settings': 'collegesettings',
      collegesettings: 'collegesettings',
      'college settings': 'collegesettings',
      settings: 'collegesettings',

      // Employer Portal
      'employer-portal': 'employerportal',
      employerportal: 'employerportal',
      'employer portal': 'employerportal',
      employers: 'employerportal',
    };

    const mappedSection = sectionMap[section.toLowerCase()] || (section as CollegeSection);
    setActiveSection(mappedSection);
  }, []);

  // Back returns to where you came from (the Learners list, a hub, Today…).
  // Opened cold, from a link or a refresh, it goes to the section's parent hub
  // instead, replacing this entry so the browser's back never loops.
  const smartBack = useSmartBack();
  const handleBack = useCallback(() => {
    const parent = SECTION_PARENT[activeSection] ?? 'overview';
    smartBack(parent === 'overview' ? '/college' : `/college?section=${parent}`);
  }, [activeSection, smartBack]);

  const handleGoHome = useCallback(() => smartBack('/dashboard'), [smartBack]);

  const renderSection = () => {
    switch (activeSection) {
      // Overview
      case 'overview':
        return (
          <CollegeOverviewSection
            onNavigate={handleNavigate}
            onFindLearner={() => setCommandPaletteOpen(true)}
            onRegister={() => setRegisterOpen(true)}
          />
        );

      // Hubs
      case 'peoplehub':
        return <CollegePeopleHub onNavigate={handleNavigate} />;
      case 'curriculumhub':
        return <CurriculumHub onNavigate={handleNavigate} />;
      case 'assessmenthub':
        return <AssessmentHub onNavigate={handleNavigate} />;
      case 'resourceshub':
        return <ResourcesHub onNavigate={handleNavigate} />;
      case 'qualityhub':
        return <QualityComplianceHub onNavigate={handleNavigate} />;

      // People Hub sections
      case 'tutors':
        return <TutorsSection />;
      case 'students':
        return <StudentsSection />;
      case 'cohorts':
        return <CohortsSection />;
      case 'supportstaff':
        return <SupportStaffSection />;

      // Curriculum Hub sections
      case 'courses':
        return <CoursesSection />;
      case 'coursesetup':
        return <CourseManagementSection />;
      case 'safeguardingqueue':
        return <SafeguardingQueueSection />;
      case 'lessonplans':
        return <LessonPlansSection />;
      case 'teachingresources':
        return <TeachingResourcesSection />;
      case 'tutornotebook':
        return <TutorNotebookSection />;
      case 'schemesofwork':
        return <SchemesOfWorkSection />;
      case 'criteriagaps':
        return <CriteriaGapsSection />;
      case 'documentlibrary':
        return <DocumentLibrarySection onNavigate={handleNavigate} />;

      // Assessment Hub sections
      case 'grading':
        return <GradingSection />;
      case 'attendance':
        return <AttendanceSection />;
      case 'ilpmanagement':
        return <ILPManagementSection />;
      case 'epatracking':
        return <EPATrackingSection onNavigate={handleNavigate} />;
      case 'progresstracking':
        return <ProgressTrackingSection />;
      case 'portfolio':
        return <CollegePortfolioHub />;
      case 'workqueue':
        return <WorkQueueSection onNavigate={handleNavigate} />;

      // Resources Hub sections
      case 'compliancedocs':
        return <ComplianceDocsSection />;
      case 'ltisettings':
        return <LTISettingsSection />;
      case 'collegesettings':
        return <CollegeSettingsSection />;

      // Employer Portal
      case 'employerportal':
        return <EmployerPortalSection />;

      // New feature sections
      case 'otjtraining':
        return <OTJTrainingSection onNavigate={handleNavigate} />;
      case 'student360':
        return (
          <Student360Section
            studentId={searchParams.get('studentId') || ''}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );
      case 'qualitydashboard':
        return <QualityDashboardSection onNavigate={handleNavigate} />;
      case 'timetable':
        return <TimetableSection onNavigate={handleNavigate} />;
      case 'aiilpgenerator':
        return <AIILPGeneratorSection onNavigate={handleNavigate} />;
      case 'iqaworkflow':
        return <IQAWorkflowSection onNavigate={handleNavigate} />;
      case 'batchoperations':
        return <BatchOperationsSection onNavigate={handleNavigate} />;
      case 'assessmentcalendar':
        return <AssessmentCalendarSection onNavigate={handleNavigate} />;
      case 'resourceanalytics':
        return <ResourceAnalyticsSection />;
      case 'iqaotjaudit':
        return <IqaOtjAuditSection />;
      case 'tutorobs':
        return <TutorObsSection />;
      case 'auditlog':
        return <AuditLogSection />;
      case 'tutorworkload':
        return <TutorWorkloadSection />;

      default:
        return (
          <CollegeOverviewSection
            onNavigate={handleNavigate}
            onFindLearner={() => setCommandPaletteOpen(true)}
            onRegister={() => setRegisterOpen(true)}
          />
        );
    }
  };

  return (
    <CollegeSupabaseProvider collegeId={profile?.college_id ?? undefined}>
      {/* Same shell as the Business Hub and Inspection & Testing: the shared
          masthead with the college's own controls on the right of the rule,
          and the shared body frame beneath it. The hand-rolled header this
          replaces was a near-copy of HubMasthead that had already drifted —
          a 32px search pill on a 48px bar, grey text, and a `max-w-7xl` that
          did not match the page under it. */}
      <HubPage ground="landing">
        {/* No bottom bar (Andrew, 7 Oct): Act lives in the masthead. This one
            opens the register in place, so it replaces CollegeGuard's. */}
        <HubMastheadExtraContext.Provider value={DASHBOARD_MASTHEAD}>
          <HubMasthead
            section="College"
            title={mastheadTitle}
            onBack={activeSection === 'overview' ? handleGoHome : handleBack}
            trailing={
              <>
                <button
                  type="button"
                  onClick={() => setCommandPaletteOpen(true)}
                  aria-label="Search learners"
                  className="flex h-11 items-center gap-2 px-2 text-white transition-colors hover:text-elec-yellow touch-manipulation max-sm:w-10 max-sm:justify-center sm:px-2.5"
                >
                  <Search className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="hidden text-[12.5px] font-medium sm:inline">
                    Search learners
                  </span>
                  <kbd className="ml-0.5 hidden rounded border border-white/15 px-1 text-[10px] font-medium text-white lg:inline">
                    ⌘K
                  </kbd>
                </button>
                <NotificationCenter onNavigate={handleNavigate} />
                {/* Settings lives in the area navigation under the masthead. */}
                <CollegeScopeSwitch />
                <CollegeActButton onRegister={() => setRegisterOpen(true)} />
              </>
            }
          />
        </HubMastheadExtraContext.Provider>

        <HubBody
          pushContext="Get notified about marking, off-the-job hours and learners who need you"
          hidePushPrompt={activeSection === 'overview'}
        >
          <Suspense fallback={<SectionLoader />}>{renderSection()}</Suspense>
        </HubBody>

        {/* Command Palette */}
        <CommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
          onNavigate={handleNavigate}
        />

        <QuickRegisterSheet open={registerOpen} onOpenChange={setRegisterOpen} />
      </HubPage>
    </CollegeSupabaseProvider>
  );
};

export default CollegeDashboard;
