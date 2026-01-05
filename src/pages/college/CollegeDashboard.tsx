import { useState, useCallback, useEffect } from "react";
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
import { Search } from "lucide-react";

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

const CollegeDashboard = () => {
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
      <div className="animate-fade-in">
        {/* Top bar with search and notifications */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {/* Back navigation for sub-sections */}
            {activeSection !== "overview" && (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-elec-yellow transition-colors mr-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <Button
              variant="outline"
              className="gap-2 text-muted-foreground hidden sm:flex"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Search...</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Mobile search button */}
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <NotificationCenter onNavigate={handleNavigate} />
          </div>
        </div>

        {renderSection()}

        {/* Command Palette */}
        <CommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
          onNavigate={handleNavigate}
        />

        {/* Quick Actions FAB */}
        <QuickActions onNavigate={handleNavigate} />
      </div>
    </CollegeProvider>
  );
};

export default CollegeDashboard;
