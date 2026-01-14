import { useState, useCallback, lazy, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CollegeProvider } from "@/contexts/CollegeContext";
import { CommandPalette } from "@/components/college/CommandPalette";
import { QuickActions } from "@/components/college/QuickActions";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, School, Settings, Loader2 } from "lucide-react";

// Lazy-loaded sections for code splitting
const CollegeOverviewSection = lazy(() => import("@/components/college/sections/CollegeOverviewSection").then(m => ({ default: m.CollegeOverviewSection })));
const TutorsSection = lazy(() => import("@/components/college/sections/TutorsSection").then(m => ({ default: m.TutorsSection })));
const StudentsSection = lazy(() => import("@/components/college/sections/StudentsSection").then(m => ({ default: m.StudentsSection })));
const CohortsSection = lazy(() => import("@/components/college/sections/CohortsSection").then(m => ({ default: m.CohortsSection })));
const SupportStaffSection = lazy(() => import("@/components/college/sections/SupportStaffSection").then(m => ({ default: m.SupportStaffSection })));
const CoursesSection = lazy(() => import("@/components/college/sections/CoursesSection").then(m => ({ default: m.CoursesSection })));
const LessonPlansSection = lazy(() => import("@/components/college/sections/LessonPlansSection").then(m => ({ default: m.LessonPlansSection })));
const TeachingResourcesSection = lazy(() => import("@/components/college/sections/TeachingResourcesSection").then(m => ({ default: m.TeachingResourcesSection })));
const SchemesOfWorkSection = lazy(() => import("@/components/college/sections/SchemesOfWorkSection").then(m => ({ default: m.SchemesOfWorkSection })));
const GradingSection = lazy(() => import("@/components/college/sections/GradingSection").then(m => ({ default: m.GradingSection })));
const AttendanceSection = lazy(() => import("@/components/college/sections/AttendanceSection").then(m => ({ default: m.AttendanceSection })));
const ILPManagementSection = lazy(() => import("@/components/college/sections/ILPManagementSection").then(m => ({ default: m.ILPManagementSection })));
const EPATrackingSection = lazy(() => import("@/components/college/sections/EPATrackingSection").then(m => ({ default: m.EPATrackingSection })));
const ProgressTrackingSection = lazy(() => import("@/components/college/sections/ProgressTrackingSection").then(m => ({ default: m.ProgressTrackingSection })));
const PortfolioSection = lazy(() => import("@/components/college/sections/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const WorkQueueSection = lazy(() => import("@/components/college/sections/WorkQueueSection").then(m => ({ default: m.WorkQueueSection })));
const DocumentLibrarySection = lazy(() => import("@/components/college/sections/DocumentLibrarySection").then(m => ({ default: m.DocumentLibrarySection })));
const ComplianceDocsSection = lazy(() => import("@/components/college/sections/ComplianceDocsSection").then(m => ({ default: m.ComplianceDocsSection })));
const LTISettingsSection = lazy(() => import("@/components/college/sections/LTISettingsSection").then(m => ({ default: m.LTISettingsSection })));
const CollegeSettingsSection = lazy(() => import("@/components/college/sections/CollegeSettingsSection").then(m => ({ default: m.CollegeSettingsSection })));
const TutorNotebookSection = lazy(() => import("@/components/college/sections/TutorNotebookSection").then(m => ({ default: m.TutorNotebookSection })));
const EmployerPortalSection = lazy(() => import("@/components/college/sections/EmployerPortalSection").then(m => ({ default: m.EmployerPortalSection })));

// Lazy-loaded hubs
const CollegePeopleHub = lazy(() => import("@/components/college/hubs/CollegePeopleHub").then(m => ({ default: m.CollegePeopleHub })));
const CurriculumHub = lazy(() => import("@/components/college/hubs/CurriculumHub").then(m => ({ default: m.CurriculumHub })));
const AssessmentHub = lazy(() => import("@/components/college/hubs/AssessmentHub").then(m => ({ default: m.AssessmentHub })));
const ResourcesHub = lazy(() => import("@/components/college/hubs/ResourcesHub").then(m => ({ default: m.ResourcesHub })));

// Loading spinner for lazy components
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
  </div>
);

export type CollegeSection =
  | "overview"
  // Hubs
  | "peoplehub"
  | "curriculumhub"
  | "assessmenthub"
  | "resourceshub"
  // People Hub sections
  | "tutors"
  | "students"
  | "cohorts"
  | "supportstaff"
  // Curriculum Hub sections
  | "courses"
  | "lessonplans"
  | "teachingresources"
  | "schemesofwork"
  | "tutornotebook"
  // Assessment Hub sections
  | "grading"
  | "attendance"
  | "ilpmanagement"
  | "epatracking"
  | "progresstracking"
  | "portfolio"
  | "workqueue"
  // Resources Hub sections
  | "documentlibrary"
  | "compliancedocs"
  | "ltisettings"
  | "collegesettings"
  // Employer Portal
  | "employerportal";

// Section titles for the header
const sectionTitles: Record<CollegeSection, string> = {
  overview: "College Dashboard",
  peoplehub: "People Hub",
  curriculumhub: "Curriculum Hub",
  assessmenthub: "Assessment Hub",
  resourceshub: "Resources Hub",
  tutors: "Tutors",
  students: "Students",
  cohorts: "Cohorts",
  supportstaff: "Support Staff",
  courses: "Courses",
  lessonplans: "Lesson Plans",
  teachingresources: "Teaching Resources",
  schemesofwork: "Schemes of Work",
  tutornotebook: "Tutor Notebook",
  grading: "Grading",
  attendance: "Attendance",
  ilpmanagement: "ILP Management",
  epatracking: "EPA Tracking",
  progresstracking: "Progress Tracking",
  portfolio: "Portfolio",
  workqueue: "Work Queue",
  documentlibrary: "Document Library",
  compliancedocs: "Compliance Docs",
  ltisettings: "LTI Settings",
  collegesettings: "College Settings",
  employerportal: "Employer Portal",
};

const CollegeDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = (searchParams.get("section") as CollegeSection) || "overview";
  const setActiveSection = (section: CollegeSection) => setSearchParams({ section }, { replace: false });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: "k", ctrl: true, handler: () => setCommandPaletteOpen(true) },
    { key: "Escape", handler: () => {
      if (commandPaletteOpen) {
        setCommandPaletteOpen(false);
      } else if (activeSection !== "overview") {
        handleBack();
      }
    }},
  ]);

  const handleNavigate = useCallback((section: CollegeSection | string) => {
    // Section name mapping for flexibility
    const sectionMap: Record<string, CollegeSection> = {
      // Main
      'overview': 'overview',
      'dashboard': 'overview',
      'home': 'overview',

      // Hubs
      'people-hub': 'peoplehub',
      'peoplehub': 'peoplehub',
      'people hub': 'peoplehub',
      'people': 'peoplehub',
      'curriculum-hub': 'curriculumhub',
      'curriculumhub': 'curriculumhub',
      'curriculum hub': 'curriculumhub',
      'curriculum': 'curriculumhub',
      'assessment-hub': 'assessmenthub',
      'assessmenthub': 'assessmenthub',
      'assessment hub': 'assessmenthub',
      'assessment': 'assessmenthub',
      'resources-hub': 'resourceshub',
      'resourceshub': 'resourceshub',
      'resources hub': 'resourceshub',
      'resources': 'resourceshub',

      // People Hub sections
      'tutors': 'tutors',
      'staff': 'tutors',
      'teachers': 'tutors',
      'students': 'students',
      'learners': 'students',
      'apprentices': 'students',
      'cohorts': 'cohorts',
      'classes': 'cohorts',
      'groups': 'cohorts',
      'support-staff': 'supportstaff',
      'supportstaff': 'supportstaff',
      'support staff': 'supportstaff',
      'admin': 'supportstaff',

      // Curriculum Hub sections
      'courses': 'courses',
      'qualifications': 'courses',
      'lesson-plans': 'lessonplans',
      'lessonplans': 'lessonplans',
      'lesson plans': 'lessonplans',
      'lessons': 'lessonplans',
      'teaching-resources': 'teachingresources',
      'teachingresources': 'teachingresources',
      'teaching resources': 'teachingresources',
      'materials': 'teachingresources',
      'schemes-of-work': 'schemesofwork',
      'schemesofwork': 'schemesofwork',
      'schemes of work': 'schemesofwork',
      'schemes': 'schemesofwork',
      'tutor-notebook': 'tutornotebook',
      'tutornotebook': 'tutornotebook',
      'tutor notebook': 'tutornotebook',
      'notebook': 'tutornotebook',
      'teaching-notebook': 'tutornotebook',

      // Assessment Hub sections
      'grading': 'grading',
      'grades': 'grading',
      'assessments': 'grading',
      'marking': 'grading',
      'attendance': 'attendance',
      'registers': 'attendance',
      'ilp-management': 'ilpmanagement',
      'ilpmanagement': 'ilpmanagement',
      'ilp management': 'ilpmanagement',
      'ilps': 'ilpmanagement',
      'epa-tracking': 'epatracking',
      'epatracking': 'epatracking',
      'epa tracking': 'epatracking',
      'epa': 'epatracking',
      'progress-tracking': 'progresstracking',
      'progresstracking': 'progresstracking',
      'progress tracking': 'progresstracking',
      'progress': 'progresstracking',
      'portfolio': 'portfolio',
      'portfolios': 'portfolio',
      'evidence': 'portfolio',
      'workqueue': 'workqueue',
      'work-queue': 'workqueue',
      'work queue': 'workqueue',
      'queue': 'workqueue',

      // Resources Hub sections
      'document-library': 'documentlibrary',
      'documentlibrary': 'documentlibrary',
      'document library': 'documentlibrary',
      'documents': 'documentlibrary',
      'compliance-docs': 'compliancedocs',
      'compliancedocs': 'compliancedocs',
      'compliance docs': 'compliancedocs',
      'compliance': 'compliancedocs',
      'policies': 'compliancedocs',
      'lti-settings': 'ltisettings',
      'ltisettings': 'ltisettings',
      'lti settings': 'ltisettings',
      'lti': 'ltisettings',
      'vle': 'ltisettings',
      'canvas': 'ltisettings',
      'moodle': 'ltisettings',
      'college-settings': 'collegesettings',
      'collegesettings': 'collegesettings',
      'college settings': 'collegesettings',
      'settings': 'collegesettings',

      // Employer Portal
      'employer-portal': 'employerportal',
      'employerportal': 'employerportal',
      'employer portal': 'employerportal',
      'employers': 'employerportal',
    };

    const mappedSection = sectionMap[section.toLowerCase()] || section as CollegeSection;
    setActiveSection(mappedSection);
  }, []);

  const handleBack = useCallback(() => {
    // Smart back navigation - go to hub if coming from sub-section
    const peopleSubSections: CollegeSection[] = ["tutors", "students", "cohorts", "supportstaff"];
    const curriculumSubSections: CollegeSection[] = ["courses", "lessonplans", "teachingresources", "schemesofwork", "tutornotebook"];
    const assessmentSubSections: CollegeSection[] = ["grading", "attendance", "ilpmanagement", "epatracking", "progresstracking", "portfolio", "workqueue"];
    const resourcesSubSections: CollegeSection[] = ["documentlibrary", "compliancedocs", "ltisettings", "collegesettings"];

    if (peopleSubSections.includes(activeSection)) {
      setActiveSection("peoplehub");
    } else if (curriculumSubSections.includes(activeSection)) {
      setActiveSection("curriculumhub");
    } else if (assessmentSubSections.includes(activeSection)) {
      setActiveSection("assessmenthub");
    } else if (resourcesSubSections.includes(activeSection)) {
      setActiveSection("resourceshub");
    } else if (["peoplehub", "curriculumhub", "assessmenthub", "resourceshub"].includes(activeSection)) {
      setActiveSection("overview");
    } else {
      setActiveSection("overview");
    }
  }, [activeSection]);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const renderSection = () => {
    switch (activeSection) {
      // Overview
      case "overview":
        return <CollegeOverviewSection onNavigate={handleNavigate} />;

      // Hubs
      case "peoplehub":
        return <CollegePeopleHub onNavigate={handleNavigate} />;
      case "curriculumhub":
        return <CurriculumHub onNavigate={handleNavigate} />;
      case "assessmenthub":
        return <AssessmentHub onNavigate={handleNavigate} />;
      case "resourceshub":
        return <ResourcesHub onNavigate={handleNavigate} />;

      // People Hub sections
      case "tutors":
        return <TutorsSection />;
      case "students":
        return <StudentsSection />;
      case "cohorts":
        return <CohortsSection />;
      case "supportstaff":
        return <SupportStaffSection />;

      // Curriculum Hub sections
      case "courses":
        return <CoursesSection />;
      case "lessonplans":
        return <LessonPlansSection />;
      case "teachingresources":
        return <TeachingResourcesSection />;
      case "schemesofwork":
        return <SchemesOfWorkSection />;
      case "tutornotebook":
        return <TutorNotebookSection />;

      // Assessment Hub sections
      case "grading":
        return <GradingSection />;
      case "attendance":
        return <AttendanceSection />;
      case "ilpmanagement":
        return <ILPManagementSection />;
      case "epatracking":
        return <EPATrackingSection />;
      case "progresstracking":
        return <ProgressTrackingSection />;
      case "portfolio":
        return <PortfolioSection onNavigate={handleNavigate} />;
      case "workqueue":
        return <WorkQueueSection onNavigate={handleNavigate} />;

      // Resources Hub sections
      case "documentlibrary":
        return <DocumentLibrarySection />;
      case "compliancedocs":
        return <ComplianceDocsSection />;
      case "ltisettings":
        return <LTISettingsSection />;
      case "collegesettings":
        return <CollegeSettingsSection />;

      // Employer Portal
      case "employerportal":
        return <EmployerPortalSection />;

      default:
        return <CollegeOverviewSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <CollegeProvider>
      <div className="min-h-screen mobile-safe-area">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in px-4 sm:px-6 py-4 md:py-6 pb-20 sm:pb-12">
          {/* Header - Native App Style (non-sticky) */}
          <div className="relative w-full">
            {/* Back button - top left */}
            <div className="absolute top-0 left-0">
              {activeSection === "overview" ? (
                <Button variant="ghost" size="sm" onClick={handleGoHome} className="hover:bg-accent/10">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleBack} className="hover:bg-accent/10">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search and Settings - top right */}
            <div className="absolute top-0 right-0 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommandPaletteOpen(true)}
                aria-label="Search"
                className="h-9 w-9 sm:h-10 sm:w-auto sm:px-3 rounded-full sm:rounded-md bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-500/50 hover:from-blue-500/30 hover:to-cyan-500/20 hover:border-blue-400/70 transition-all duration-200 p-0 sm:p-2"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span className="hidden sm:inline ml-2 text-sm">Search...</span>
                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium ml-2">
                  <span className="text-xs">Ctrl</span>K
                </kbd>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/settings")}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>

            {/* Main content - centered */}
            <div className="flex flex-col items-center gap-4 w-full pt-8 sm:pt-0">
              <div className="text-center w-full max-w-2xl mx-auto px-4">
                <div className="flex justify-center mb-2">
                  <School className="h-7 w-7 sm:h-9 sm:w-9 text-elec-yellow" />
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">
                  {sectionTitles[activeSection]}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {activeSection === "overview" ? "Manage your apprenticeship programme" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Suspense fallback={<SectionLoader />}>
            {renderSection()}
          </Suspense>

          {/* Command Palette */}
          <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} onNavigate={handleNavigate} />

          {/* Quick Actions FAB */}
          <QuickActions onNavigate={handleNavigate} />
        </div>
      </div>
    </CollegeProvider>
  );
};

export default CollegeDashboard;
