import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CollegeOverviewSection } from "@/components/college/sections/CollegeOverviewSection";
import { TutorsSection } from "@/components/college/sections/TutorsSection";
import { StudentsSection } from "@/components/college/sections/StudentsSection";
import { CohortsSection } from "@/components/college/sections/CohortsSection";
import { SupportStaffSection } from "@/components/college/sections/SupportStaffSection";
import { CoursesSection } from "@/components/college/sections/CoursesSection";
import { LessonPlansSection } from "@/components/college/sections/LessonPlansSection";
import { TeachingResourcesSection } from "@/components/college/sections/TeachingResourcesSection";
import { SchemesOfWorkSection } from "@/components/college/sections/SchemesOfWorkSection";
import { GradingSection } from "@/components/college/sections/GradingSection";
import { AttendanceSection } from "@/components/college/sections/AttendanceSection";
import { ILPManagementSection } from "@/components/college/sections/ILPManagementSection";
import { EPATrackingSection } from "@/components/college/sections/EPATrackingSection";
import { ProgressTrackingSection } from "@/components/college/sections/ProgressTrackingSection";
import { PortfolioSection } from "@/components/college/sections/PortfolioSection";
import { WorkQueueSection } from "@/components/college/sections/WorkQueueSection";
import { DocumentLibrarySection } from "@/components/college/sections/DocumentLibrarySection";
import { ComplianceDocsSection } from "@/components/college/sections/ComplianceDocsSection";
import { LTISettingsSection } from "@/components/college/sections/LTISettingsSection";
import { CollegeSettingsSection } from "@/components/college/sections/CollegeSettingsSection";
import { TutorNotebookSection } from "@/components/college/sections/TutorNotebookSection";
import { EmployerPortalSection } from "@/components/college/sections/EmployerPortalSection";
import { CollegePeopleHub } from "@/components/college/hubs/CollegePeopleHub";
import { CurriculumHub } from "@/components/college/hubs/CurriculumHub";
import { AssessmentHub } from "@/components/college/hubs/AssessmentHub";
import { ResourcesHub } from "@/components/college/hubs/ResourcesHub";
import { CollegeProvider } from "@/contexts/CollegeContext";
import { NotificationCenter } from "@/components/college/NotificationCenter";
import { CommandPalette } from "@/components/college/CommandPalette";
import { QuickActions } from "@/components/college/QuickActions";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, School, Settings } from "lucide-react";

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
  const [activeSection, setActiveSection] = useState<CollegeSection>("overview");
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
      <div className="min-h-screen bg-background">
        {/* Sticky Header - Native App Style */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 sm:h-16 items-center justify-between">
              {/* Left side - Back button */}
              <div className="flex items-center gap-2 sm:gap-4">
                {activeSection === "overview" ? (
                  <Button variant="ghost" size="sm" onClick={handleGoHome} className="gap-1 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                )}
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <span>/</span>
                  <span className="text-foreground font-medium">{sectionTitles[activeSection]}</span>
                </div>
              </div>

              {/* Center - Title (mobile only) */}
              <div className="sm:hidden flex items-center gap-2">
                <School className="h-5 w-5 text-elec-yellow" />
                <span className="font-semibold text-sm truncate max-w-[120px]">{sectionTitles[activeSection]}</span>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2 text-muted-foreground hidden sm:flex" onClick={() => setCommandPaletteOpen(true)}>
                  <Search className="h-4 w-4" />
                  <span className="text-sm">Search...</span>
                  <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">Ctrl</span>K
                  </kbd>
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9" onClick={() => setCommandPaletteOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleNavigate("collegesettings")} className="gap-2 text-muted-foreground hover:text-foreground">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto pb-24 sm:pb-8">
          <div className="animate-fade-in">{renderSection()}</div>
        </main>

        {/* Command Palette */}
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} onNavigate={handleNavigate} />

        {/* Quick Actions FAB */}
        <QuickActions onNavigate={handleNavigate} />
      </div>
    </CollegeProvider>
  );
};

export default CollegeDashboard;
