import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CollegeSupabaseProvider } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { CommandPalette } from '@/components/college/CommandPalette';
import { NotificationCenter } from '@/components/college/NotificationCenter';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
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
const PortfolioSection = lazy(() =>
  import('@/components/college/sections/PortfolioSection').then((m) => ({
    default: m.PortfolioSection,
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
const LiveLessonSection = lazy(() =>
  import('@/components/college/sections/LiveLessonSection').then((m) => ({
    default: m.LiveLessonSection,
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
  // People Hub sections
  | 'tutors'
  | 'students'
  | 'cohorts'
  | 'supportstaff'
  // Curriculum Hub sections
  | 'courses'
  | 'lessonplans'
  | 'teachingresources'
  | 'tutornotebook'
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
  | 'ltisettings'
  | 'collegesettings'
  // Employer Portal
  | 'employerportal'
  // New sections
  | 'otjtraining'
  | 'student360'
  | 'qualitydashboard'
  | 'timetable'
  | 'livelesson'
  | 'aiilpgenerator'
  | 'iqaworkflow'
  | 'batchoperations'
  | 'assessmentcalendar';

// Section titles for the header
const sectionTitles: Record<CollegeSection, string> = {
  overview: 'College Dashboard',
  peoplehub: 'People Hub',
  curriculumhub: 'Curriculum Hub',
  assessmenthub: 'Assessment Hub',
  resourceshub: 'Resources Hub',
  tutors: 'Tutors',
  students: 'Students',
  cohorts: 'Cohorts',
  supportstaff: 'Support Staff',
  courses: 'Courses',
  lessonplans: 'Lesson Plans',
  teachingresources: 'Teaching Resources',
  tutornotebook: 'Tutor Notebook',
  grading: 'Grading',
  attendance: 'Attendance',
  ilpmanagement: 'ILP Management',
  epatracking: 'EPA Tracking',
  progresstracking: 'Progress Tracking',
  portfolio: 'Portfolio',
  workqueue: 'Work Queue',
  compliancedocs: 'Compliance Docs',
  ltisettings: 'LTI Settings',
  collegesettings: 'College Settings',
  employerportal: 'Employer Portal',
  otjtraining: 'OTJ Training',
  student360: 'Student Profile',
  qualitydashboard: 'Quality Dashboard',
  timetable: 'Timetable',
  livelesson: 'Live Lesson',
  aiilpgenerator: 'AI ILP Generator',
  iqaworkflow: 'IQA Workflow',
  batchoperations: 'Batch Operations',
  assessmentcalendar: 'Assessment Calendar',
};

const CollegeDashboard = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = (searchParams.get('section') as CollegeSection) || 'overview';
  const setActiveSection = (section: CollegeSection) =>
    setSearchParams({ section }, { replace: false });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'k', ctrl: true, handler: () => setCommandPaletteOpen(true) },
    {
      key: 'Escape',
      handler: () => {
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false);
        } else if (activeSection !== 'overview') {
          handleBack();
        }
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

  const handleBack = useCallback(() => {
    // Smart back navigation - go to hub if coming from sub-section
    const peopleSubSections: CollegeSection[] = ['tutors', 'students', 'cohorts', 'supportstaff'];
    const curriculumSubSections: CollegeSection[] = [
      'courses',
      'lessonplans',
      'teachingresources',
      'tutornotebook',
      'timetable',
      'livelesson',
    ];
    const assessmentSubSections: CollegeSection[] = [
      'grading',
      'attendance',
      'ilpmanagement',
      'epatracking',
      'progresstracking',
      'portfolio',
      'workqueue',
      'otjtraining',
      'student360',
      'aiilpgenerator',
      'batchoperations',
      'assessmentcalendar',
    ];
    const resourcesSubSections: CollegeSection[] = [
      'compliancedocs',
      'ltisettings',
      'collegesettings',
      'qualitydashboard',
      'iqaworkflow',
    ];

    if (peopleSubSections.includes(activeSection)) {
      setActiveSection('peoplehub');
    } else if (curriculumSubSections.includes(activeSection)) {
      setActiveSection('curriculumhub');
    } else if (assessmentSubSections.includes(activeSection)) {
      setActiveSection('assessmenthub');
    } else if (resourcesSubSections.includes(activeSection)) {
      setActiveSection('resourceshub');
    } else if (
      ['peoplehub', 'curriculumhub', 'assessmenthub', 'resourceshub'].includes(activeSection)
    ) {
      setActiveSection('overview');
    } else {
      setActiveSection('overview');
    }
  }, [activeSection]);

  const handleGoHome = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const renderSection = () => {
    switch (activeSection) {
      // Overview
      case 'overview':
        return <CollegeOverviewSection onNavigate={handleNavigate} />;

      // Hubs
      case 'peoplehub':
        return <CollegePeopleHub onNavigate={handleNavigate} />;
      case 'curriculumhub':
        return <CurriculumHub onNavigate={handleNavigate} />;
      case 'assessmenthub':
        return <AssessmentHub onNavigate={handleNavigate} />;
      case 'resourceshub':
        return <ResourcesHub onNavigate={handleNavigate} />;

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
      case 'lessonplans':
        return <LessonPlansSection />;
      case 'teachingresources':
        return <TeachingResourcesSection />;
      case 'tutornotebook':
        return <TutorNotebookSection />;

      // Assessment Hub sections
      case 'grading':
        return <GradingSection />;
      case 'attendance':
        return <AttendanceSection />;
      case 'ilpmanagement':
        return <ILPManagementSection />;
      case 'epatracking':
        return <EPATrackingSection />;
      case 'progresstracking':
        return <ProgressTrackingSection />;
      case 'portfolio':
        return <PortfolioSection onNavigate={handleNavigate} />;
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
      case 'livelesson':
        return (
          <LiveLessonSection
            lessonId={searchParams.get('lessonId') || undefined}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        );
      case 'aiilpgenerator':
        return <AIILPGeneratorSection onNavigate={handleNavigate} />;
      case 'iqaworkflow':
        return <IQAWorkflowSection onNavigate={handleNavigate} />;
      case 'batchoperations':
        return <BatchOperationsSection onNavigate={handleNavigate} />;
      case 'assessmentcalendar':
        return <AssessmentCalendarSection onNavigate={handleNavigate} />;

      default:
        return <CollegeOverviewSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <CollegeSupabaseProvider collegeId={profile?.college_id ?? undefined}>
      <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
        {/* Sticky Header — editorial text-only nav */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center h-12 gap-4 sm:gap-6">
              <button
                onClick={activeSection === 'overview' ? handleGoHome : handleBack}
                aria-label="Go back"
                className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation whitespace-nowrap"
              >
                ← Back
              </button>
              <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 hidden sm:inline">
                  College
                </span>
                <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
                <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                  {sectionTitles[activeSection]}
                </h1>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  Search
                </button>
                <NotificationCenter onNavigate={handleNavigate} />
                <button
                  onClick={() => setActiveSection('collegesettings')}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-4">
          <Suspense fallback={<SectionLoader />}>{renderSection()}</Suspense>
        </div>

        {/* Command Palette */}
        <CommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
          onNavigate={handleNavigate}
        />
      </div>
    </CollegeSupabaseProvider>
  );
};

export default CollegeDashboard;
