import { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CollegeSupabaseProvider } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { CommandPalette } from '@/components/college/CommandPalette';
import { NotificationCenter } from '@/components/college/NotificationCenter';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, School, Settings, Loader2 } from 'lucide-react';
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
  | 'employerportal';

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
    ];
    const assessmentSubSections: CollegeSection[] = [
      'grading',
      'attendance',
      'ilpmanagement',
      'epatracking',
      'progresstracking',
      'portfolio',
      'workqueue',
    ];
    const resourcesSubSections: CollegeSection[] = [
      'compliancedocs',
      'ltisettings',
      'collegesettings',
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

      default:
        return <CollegeOverviewSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <CollegeSupabaseProvider collegeId={profile?.college_id ?? undefined}>
      <div className="mobile-safe-area bg-elec-dark">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in px-4 sm:px-6 py-4 md:py-6 pb-20 sm:pb-12">
          {/* Header - flex row matching ElectricalHub */}
          <div className="flex items-center h-14 gap-2">
            {/* Back button */}
            <Button
              variant="ghost"
              size="sm"
              aria-label="Go back"
              onClick={activeSection === 'overview' ? handleGoHome : handleBack}
              className="h-10 w-10 -ml-2 hover:bg-accent/10 flex items-center justify-center rounded-xl touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* Title */}
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <School className="h-5 w-5 text-elec-yellow shrink-0" />
              <h1 className="text-xl font-bold truncate">{sectionTitles[activeSection]}</h1>
            </div>

            {/* Search button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommandPaletteOpen(true)}
              aria-label="Search"
              className="h-10 w-10 rounded-xl bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20 hover:border-elec-yellow/50 transition-all p-0 touch-manipulation"
            >
              <Search className="h-4 w-4 text-elec-yellow" />
            </Button>

            {/* Notifications */}
            <NotificationCenter onNavigate={handleNavigate} />

            {/* Settings button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveSection('collegesettings')}
              aria-label="Settings"
              className="h-10 w-10 rounded-xl hover:bg-accent/10 transition-all p-0 touch-manipulation"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Content */}
          <Suspense fallback={<SectionLoader />}>{renderSection()}</Suspense>

          {/* Command Palette */}
          <CommandPalette
            open={commandPaletteOpen}
            onOpenChange={setCommandPaletteOpen}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </CollegeSupabaseProvider>
  );
};

export default CollegeDashboard;
