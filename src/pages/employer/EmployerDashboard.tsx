import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { OverviewSection } from "@/components/employer/sections/OverviewSection";
import { EmployeesSection } from "@/components/employer/sections/EmployeesSection";
import { JobsSection } from "@/components/employer/sections/JobsSection";
import DraggableVoiceAssistant from "@/components/DraggableVoiceAssistant";

import { SafetyHRSection } from "@/components/employer/sections/SafetyHRSection";
import { RAMSSection } from "@/components/employer/sections/RAMSSection";
import { IncidentsSection } from "@/components/employer/sections/IncidentsSection";
import { PoliciesSection } from "@/components/employer/sections/PoliciesSection";
import { ContractsSection } from "@/components/employer/sections/ContractsSection";
import { TrainingRecordsSection } from "@/components/employer/sections/TrainingRecordsSection";
import { BriefingsSection } from "@/components/employer/sections/BriefingsSection";
import { ComplianceSection } from "@/components/employer/sections/ComplianceSection";
import { QuotesInvoicesSection } from "@/components/employer/sections/QuotesInvoicesSection";
import { TenderSection } from "@/components/employer/sections/TenderSection";
import { ReportsSection } from "@/components/employer/sections/ReportsSection";
import { SettingsSection } from "@/components/employer/sections/SettingsSection";
import { JobPacksSection } from "@/components/employer/sections/JobPacksSection";
import { ElecIDSection } from "@/components/employer/sections/ElecIDSection";
import { TimesheetsSection } from "@/components/employer/sections/TimesheetsSection";
import { CommunicationsSection } from "@/components/employer/sections/CommunicationsSection";
import { QualitySection } from "@/components/employer/sections/QualitySection";
import { JobBoardSection } from "@/components/employer/sections/JobBoardSection";
import { JobTimelineSection } from "@/components/employer/sections/JobTimelineSection";
import { WorkerTrackingSection } from "@/components/employer/sections/WorkerTrackingSection";
import { ProgressLogsSection } from "@/components/employer/sections/ProgressLogsSection";
import { JobIssuesSection } from "@/components/employer/sections/JobIssuesSection";
import { JobFinancialsSection } from "@/components/employer/sections/JobFinancialsSection";
import { TestingWorkflowSection } from "@/components/employer/sections/TestingWorkflowSection";
import { ClientPortalSection } from "@/components/employer/sections/ClientPortalSection";
import { TalentPoolSection } from "@/components/employer/sections/TalentPoolSection";
import { JobVacanciesSection } from "@/components/employer/sections/JobVacanciesSection";
import { ProcurementSection } from "@/components/employer/sections/ProcurementSection";
import { ExpensesSection } from "@/components/employer/sections/ExpensesSection";
import { SignaturesSection } from "@/components/employer/sections/SignaturesSection";
import { PriceBookSection } from "@/components/employer/sections/PriceBookSection";
import { FleetSection } from "@/components/employer/sections/FleetSection";
import { PhotoGallerySection } from "@/components/employer/sections/PhotoGallerySection";
import { PeopleHub } from "@/components/employer/hubs/PeopleHub";
import { FinanceHub } from "@/components/employer/hubs/FinanceHub";
import { JobsHub } from "@/components/employer/hubs/JobsHub";
import { SafetyHub } from "@/components/employer/hubs/SafetyHub";
import { SmartDocsHub } from "@/components/employer/hubs/SmartDocsHub";
import { AutomationsSection } from "@/components/employer/sections/AutomationsSection";
import { AIDesignSpecSection } from "@/components/employer/sections/AIDesignSpecSection";
import { AIRAMSSection } from "@/components/employer/sections/AIRAMSSection";
import { AIMethodStatementSection } from "@/components/employer/sections/AIMethodStatementSection";
import { AIBriefingPackSection } from "@/components/employer/sections/AIBriefingPackSection";
import { AIQuoteSection } from "@/components/employer/sections/AIQuoteSection";
import { EmployerProvider } from "@/contexts/EmployerContext";

// Import dialogs for voice control
import { CreateQuoteDialog } from "@/components/employer/dialogs/CreateQuoteDialog";
import { AddJobDialog } from "@/components/employer/dialogs/AddJobDialog";
import { AddEmployeeDialog } from "@/components/employer/dialogs/AddEmployeeDialog";
import { CreateInvoiceDialog } from "@/components/employer/dialogs/CreateInvoiceDialog";
import { CreateExpenseDialog } from "@/components/employer/dialogs/CreateExpenseDialog";
import { ManualTimeEntryDialog } from "@/components/employer/dialogs/ManualTimeEntryDialog";
import { AddCertificationDialog } from "@/components/employer/dialogs/AddCertificationDialog";
import { CreateOrderDialog } from "@/components/employer/dialogs/CreateOrderDialog";
import { CreateSupplierDialog } from "@/components/employer/dialogs/CreateSupplierDialog";
import { PostVacancyDialog } from "@/components/employer/dialogs/PostVacancyDialog";

export type Section =
  | "overview" 
  | "jobpacks"
  | "team"
  | "elecid"
  | "jobs" 
  | "timesheets"
  | "comms"
  | "quality"
  | "safety" 
  | "quotes" 
  | "tenders" 
  | "reports" 
  | "settings"
  | "jobboard"
  | "timeline"
  | "tracking"
  | "progresslogs"
  | "issues"
  | "financials"
  | "testing"
  | "clientportal"
  | "talentpool"
  | "vacancies"
  | "procurement"
  | "expenses"
  | "signatures"
  | "pricebook"
  | "fleet"
  | "photogallery"
  | "peoplehub"
  | "financehub"
  | "jobshub"
  | "safetyhub"
  | "rams"
  | "incidents"
  | "policies"
  | "contracts"
  | "training"
  | "briefings"
  | "compliance"
  | "automations"
  // Smart Docs Hub
  | "smartdocs"
  | "aidesignspec"
  | "airams"
  | "aimethodstatement"
  | "aibriefingpack"
  | "aiquote";

const EmployerDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<Section>("overview");

  // Sync URL params to activeSection on mount and when URL changes
  useEffect(() => {
    const sectionFromUrl = searchParams.get('section');
    if (sectionFromUrl) {
      // Map URL param to valid section
      const validSections: Section[] = [
        'overview', 'peoplehub', 'team', 'elecid', 'timesheets', 'comms',
        'talentpool', 'vacancies', 'financehub', 'quotes', 'expenses',
        'procurement', 'financials', 'reports', 'signatures', 'pricebook',
        'jobshub', 'jobs', 'jobpacks', 'jobboard', 'timeline', 'tracking',
        'progresslogs', 'issues', 'quality', 'fleet', 'photogallery', 'testing',
        'safetyhub', 'safety', 'rams', 'incidents', 'policies', 'contracts',
        'training', 'briefings', 'compliance', 'smartdocs', 'aidesignspec',
        'airams', 'aimethodstatement', 'aibriefingpack', 'aiquote', 'settings'
      ];
      if (validSections.includes(sectionFromUrl as Section)) {
        setActiveSection(sectionFromUrl as Section);
      }
    }
  }, [searchParams]);

  // Voice-controlled dialog states
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [timeEntryDialogOpen, setTimeEntryDialogOpen] = useState(false);
  const [certificationDialogOpen, setCertificationDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [vacancyDialogOpen, setVacancyDialogOpen] = useState(false);

  // Voice dialog open handler
  useEffect(() => {
    const handleOpenDialog = (e: CustomEvent<{ dialogName: string }>) => {
      const { dialogName } = e.detail;
      console.log('Voice open dialog:', dialogName);
      
      const dialogMap: Record<string, () => void> = {
        'quote': () => setQuoteDialogOpen(true),
        'create-quote': () => setQuoteDialogOpen(true),
        'job': () => setJobDialogOpen(true),
        'create-job': () => setJobDialogOpen(true),
        'employee': () => setEmployeeDialogOpen(true),
        'add-employee': () => setEmployeeDialogOpen(true),
        'invoice': () => setInvoiceDialogOpen(true),
        'create-invoice': () => setInvoiceDialogOpen(true),
        'expense': () => setExpenseDialogOpen(true),
        'create-expense': () => setExpenseDialogOpen(true),
        'time-entry': () => setTimeEntryDialogOpen(true),
        'timesheet': () => setTimeEntryDialogOpen(true),
        'certification': () => setCertificationDialogOpen(true),
        'add-certification': () => setCertificationDialogOpen(true),
        'order': () => setOrderDialogOpen(true),
        'create-order': () => setOrderDialogOpen(true),
        'supplier': () => setSupplierDialogOpen(true),
        'create-supplier': () => setSupplierDialogOpen(true),
        'vacancy': () => setVacancyDialogOpen(true),
        'post-vacancy': () => setVacancyDialogOpen(true),
      };
      
      const openFn = dialogMap[dialogName.toLowerCase()];
      if (openFn) openFn();
    };

    const handleCloseDialog = () => {
      setQuoteDialogOpen(false);
      setJobDialogOpen(false);
      setEmployeeDialogOpen(false);
      setInvoiceDialogOpen(false);
      setExpenseDialogOpen(false);
      setTimeEntryDialogOpen(false);
      setCertificationDialogOpen(false);
      setOrderDialogOpen(false);
      setSupplierDialogOpen(false);
      setVacancyDialogOpen(false);
    };

    window.addEventListener('voice-open-dialog', handleOpenDialog as EventListener);
    window.addEventListener('voice-close-dialog', handleCloseDialog);
    
    return () => {
      window.removeEventListener('voice-open-dialog', handleOpenDialog as EventListener);
      window.removeEventListener('voice-close-dialog', handleCloseDialog);
    };
  }, []);

  const handleNavigate = useCallback((section: Section | string) => {
    // Complete mapping from voice command section names to internal section names
    const sectionMap: Record<string, Section> = {
      // Main sections
      'overview': 'overview',
      'dashboard': 'overview',
      'home': 'overview',
      
      // Hubs
      'people-hub': 'peoplehub',
      'peoplehub': 'peoplehub',
      'people hub': 'peoplehub',
      'finance-hub': 'financehub',
      'financehub': 'financehub',
      'finance hub': 'financehub',
      'finance': 'financehub',
      'jobs-hub': 'jobshub',
      'jobshub': 'jobshub',
      'jobs hub': 'jobshub',
      'safety-hub': 'safetyhub',
      'safetyhub': 'safetyhub',
      'safety hub': 'safetyhub',
      
      // People Hub sections
      'employees': 'team',
      'team': 'team',
      'workers': 'team',
      'staff': 'team',
      'people': 'team',
      'elec-id': 'elecid',
      'elecid': 'elecid',
      'elec id': 'elecid',
      'credentials': 'elecid',
      'id cards': 'elecid',
      'identification': 'elecid',
      'badges': 'elecid',
      'timesheets': 'timesheets',
      'time sheets': 'timesheets',
      'leave': 'timesheets',
      'communications': 'comms',
      'comms': 'comms',
      'messages': 'comms',
      'talent-pool': 'talentpool',
      'talentpool': 'talentpool',
      'talent pool': 'talentpool',
      'candidates': 'talentpool',
      'job-vacancies': 'vacancies',
      'vacancies': 'vacancies',
      'job vacancies': 'vacancies',
      'recruitment': 'vacancies',
      'hiring': 'vacancies',
      
      // Finance Hub sections
      'quotes-invoices': 'quotes',
      'quotes': 'quotes',
      'invoices': 'quotes',
      'billing': 'quotes',
      'tenders': 'tenders',
      'bids': 'tenders',
      'expenses': 'expenses',
      'receipts': 'expenses',
      'procurement': 'procurement',
      'materials': 'procurement',
      'purchasing': 'procurement',
      'job-financials': 'financials',
      'financials': 'financials',
      'job financials': 'financials',
      'job costs': 'financials',
      'reports': 'reports',
      'analytics': 'reports',
      'signatures': 'signatures',
      'sign offs': 'signatures',
      'approvals': 'signatures',
      'price-book': 'pricebook',
      'pricebook': 'pricebook',
      'price book': 'pricebook',
      'pricing': 'pricebook',
      'rates': 'pricebook',
      
      // Jobs Hub sections
      'job-packs': 'jobpacks',
      'jobpacks': 'jobpacks',
      'job packs': 'jobpacks',
      'documentation': 'jobpacks',
      'jobs': 'jobs',
      'projects': 'jobs',
      'sites': 'jobs',
      'job-board': 'jobboard',
      'jobboard': 'jobboard',
      'job board': 'jobboard',
      'job-timeline': 'timeline',
      'timeline': 'timeline',
      'schedule': 'timeline',
      'milestones': 'timeline',
      'worker-tracking': 'tracking',
      'tracking': 'tracking',
      'location': 'tracking',
      'gps': 'tracking',
      'whereabouts': 'tracking',
      'progress-logs': 'progresslogs',
      'progresslogs': 'progresslogs',
      'progress logs': 'progresslogs',
      'progress': 'progresslogs',
      'diary': 'progresslogs',
      'job-issues': 'issues',
      'issues': 'issues',
      'problems': 'issues',
      'blockers': 'issues',
      'testing-workflow': 'testing',
      'testing': 'testing',
      'inspections': 'testing',
      'quality': 'quality',
      'snags': 'quality',
      'defects': 'quality',
      'client-portal': 'clientportal',
      'clientportal': 'clientportal',
      'client portal': 'clientportal',
      'fleet': 'fleet',
      'vehicles': 'fleet',
      'vans': 'fleet',
      'transport': 'fleet',
      'photo-gallery': 'photogallery',
      'photogallery': 'photogallery',
      'photo gallery': 'photogallery',
      'photos': 'photogallery',
      'gallery': 'photogallery',
      'images': 'photogallery',
      
      // Safety Hub sections
      'safety': 'safetyhub',
      'health and safety': 'safetyhub',
      'h&s': 'safetyhub',
      'rams': 'rams',
      'risk assessments': 'rams',
      'method statements': 'rams',
      'incidents': 'incidents',
      'accidents': 'incidents',
      'near misses': 'incidents',
      'policies': 'policies',
      'procedures': 'policies',
      'rules': 'policies',
      'contracts': 'contracts',
      'agreements': 'contracts',
      'training': 'training',
      'training-records': 'training',
      'training records': 'training',
      'certifications': 'training',
      'certs': 'training',
      'courses': 'training',
      'briefings': 'briefings',
      'toolbox talks': 'briefings',
      'site meetings': 'briefings',
      'compliance': 'compliance',
      'regulations': 'compliance',
      'audits': 'compliance',
      
      // Settings
      'settings': 'settings',
      'preferences': 'settings',
      'configuration': 'settings',

      // Smart Docs Hub
      'smart-docs': 'smartdocs',
      'smartdocs': 'smartdocs',
      'smart docs': 'smartdocs',
      'ai docs': 'smartdocs',
      'document generator': 'smartdocs',
      'doc production': 'smartdocs',
      'ai design': 'aidesignspec',
      'design spec': 'aidesignspec',
      'circuit design': 'aidesignspec',
      'ai rams': 'airams',
      'generate rams': 'airams',
      'ai method statement': 'aimethodstatement',
      'method statement': 'aimethodstatement',
      'ai briefing': 'aibriefingpack',
      'briefing pack': 'aibriefingpack',
      'ai quote': 'aiquote',
      'generate quote': 'aiquote',
    };
    
    const mappedSection = sectionMap[section.toLowerCase()] || section as Section;
    console.log(`Voice navigation: "${section}" -> "${mappedSection}"`);
    setActiveSection(mappedSection);
  }, []);

  const handleBack = () => {
    // Smart back navigation - go to hub if coming from sub-section
    const peopleSubSections: Section[] = ["team", "elecid", "timesheets", "comms", "talentpool", "vacancies"];
    const financeSubSections: Section[] = ["quotes", "tenders", "expenses", "procurement", "financials", "reports", "signatures", "pricebook"];
    const jobsSubSections: Section[] = ["jobpacks", "jobs", "jobboard", "timeline", "tracking", "progresslogs", "issues", "testing", "quality", "clientportal", "fleet", "photogallery"];
    const safetySubSections: Section[] = ["safety", "rams", "incidents", "policies", "contracts", "training", "briefings", "compliance"];
    const smartDocsSubSections: Section[] = ["aidesignspec", "airams", "aimethodstatement", "aibriefingpack", "aiquote"];

    if (peopleSubSections.includes(activeSection)) {
      setActiveSection("peoplehub");
    } else if (financeSubSections.includes(activeSection)) {
      setActiveSection("financehub");
    } else if (jobsSubSections.includes(activeSection)) {
      setActiveSection("jobshub");
    } else if (safetySubSections.includes(activeSection)) {
      setActiveSection("safetyhub");
    } else if (smartDocsSubSections.includes(activeSection)) {
      setActiveSection("smartdocs");
    } else if (activeSection === "smartdocs") {
      setActiveSection("overview");
    } else {
      setActiveSection("overview");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview": 
        return <OverviewSection onNavigate={handleNavigate} />;
      case "peoplehub":
        return <PeopleHub onNavigate={handleNavigate} />;
      case "financehub":
        return <FinanceHub onNavigate={handleNavigate} />;
      case "jobshub":
        return <JobsHub onNavigate={handleNavigate} />;
      case "safetyhub":
        return <SafetyHub onNavigate={handleNavigate} />;
      case "talentpool":
        return <TalentPoolSection />;
      case "vacancies":
        return <JobVacanciesSection />;
      case "procurement":
        return <ProcurementSection />;
      case "expenses":
        return <ExpensesSection />;
      case "signatures":
        return <SignaturesSection />;
      case "pricebook":
        return <PriceBookSection />;
      case "fleet":
        return <FleetSection />;
      case "photogallery":
        return <PhotoGallerySection />;
      case "jobpacks":
        return <JobPacksSection />;
      case "team": 
        return <EmployeesSection />;
      case "elecid":
        return <ElecIDSection />;
      case "jobs": 
        return <JobsSection />;
      case "timesheets":
        return <TimesheetsSection />;
      case "comms":
        return <CommunicationsSection />;
      case "quality":
        return <QualitySection />;
      case "safety": 
        return <SafetyHRSection />;
      case "quotes": 
        return <QuotesInvoicesSection />;
      case "tenders": 
        return <TenderSection />;
      case "reports": 
        return <ReportsSection />;
      case "settings": 
        return <SettingsSection />;
      case "jobboard":
        return <JobBoardSection />;
      case "timeline":
        return <JobTimelineSection />;
      case "tracking":
        return <WorkerTrackingSection />;
      case "progresslogs":
        return <ProgressLogsSection />;
      case "issues":
        return <JobIssuesSection />;
      case "financials":
        return <JobFinancialsSection />;
      case "testing":
        return <TestingWorkflowSection />;
      case "clientportal":
        return <ClientPortalSection />;
      case "rams":
        return <RAMSSection />;
      case "incidents":
        return <IncidentsSection />;
      case "policies":
        return <PoliciesSection />;
      case "contracts":
        return <ContractsSection />;
      case "training":
        return <TrainingRecordsSection />;
      case "briefings":
        return <BriefingsSection />;
      case "compliance":
        return <ComplianceSection />;
      case "automations":
        return <AutomationsSection />;
      // Smart Docs Hub
      case "smartdocs":
        return <SmartDocsHub onNavigate={handleNavigate} />;
      case "aidesignspec":
        return <AIDesignSpecSection onNavigate={handleNavigate} />;
      case "airams":
        return <AIRAMSSection onNavigate={handleNavigate} />;
      case "aimethodstatement":
        return <AIMethodStatementSection onNavigate={handleNavigate} />;
      case "aibriefingpack":
        return <AIBriefingPackSection onNavigate={handleNavigate} />;
      case "aiquote":
        return <AIQuoteSection onNavigate={handleNavigate} />;
      default:
        return <OverviewSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <EmployerProvider>
      <div className="animate-fade-in pb-20 md:pb-0 px-4 sm:px-6">
        {/* Back navigation for sub-sections */}
        {activeSection !== "overview" && (
          <div className="mb-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-elec-yellow transition-colors touch-target"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        )}

        {renderSection()}

        {/* Voice-controlled dialogs */}
        <CreateQuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        <AddJobDialog open={jobDialogOpen} onOpenChange={setJobDialogOpen} trigger={null} />
        <AddEmployeeDialog open={employeeDialogOpen} onOpenChange={setEmployeeDialogOpen} trigger={null} />
        <CreateInvoiceDialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen} />
        <CreateExpenseDialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen} />
        <ManualTimeEntryDialog open={timeEntryDialogOpen} onOpenChange={setTimeEntryDialogOpen} trigger={null} />
        <AddCertificationDialog open={certificationDialogOpen} onOpenChange={setCertificationDialogOpen} trigger={null} />
        <CreateOrderDialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen} />
        <CreateSupplierDialog open={supplierDialogOpen} onOpenChange={setSupplierDialogOpen} />
        <PostVacancyDialog open={vacancyDialogOpen} onOpenChange={setVacancyDialogOpen} trigger={null} />

        {/* Draggable Voice Assistant */}
        <DraggableVoiceAssistant onNavigate={handleNavigate} currentSection={activeSection} />
      </div>
    </EmployerProvider>
  );
};

export default EmployerDashboard;