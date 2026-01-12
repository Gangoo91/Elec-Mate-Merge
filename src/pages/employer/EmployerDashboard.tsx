import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { NativePageWrapper } from "@/components/native/NativePageWrapper";
import { useToast } from "@/hooks/use-toast";
import {
  Home, Users, UserSearch, Briefcase, CreditCard, Clock, MessageSquare,
  PoundSterling, FileText, Receipt, ShoppingCart, BarChart3, FileSignature,
  Tag, Truck, Camera, Folder, MapPin, ListChecks, AlertCircle, PlayCircle,
  CheckCircle, Users2, ShieldCheck, BookOpen, ClipboardList, GraduationCap,
  FileCheck, Sparkles, Cpu, Zap, Settings, type LucideIcon,
} from "lucide-react";
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

// Section hierarchy for back navigation fallback
const getParentSection = (section: Section): Section => {
  const hierarchy: Record<Section, Section> = {
    // People Hub children -> peoplehub
    team: "peoplehub", elecid: "peoplehub", timesheets: "peoplehub",
    comms: "peoplehub", talentpool: "peoplehub", vacancies: "peoplehub",
    // Finance Hub children -> financehub
    quotes: "financehub", tenders: "financehub", expenses: "financehub",
    procurement: "financehub", financials: "financehub", reports: "financehub",
    signatures: "financehub", pricebook: "financehub",
    // Jobs Hub children -> jobshub
    jobpacks: "jobshub", jobs: "jobshub", jobboard: "jobshub",
    timeline: "jobshub", tracking: "jobshub", progresslogs: "jobshub",
    issues: "jobshub", testing: "jobshub", quality: "jobshub",
    clientportal: "jobshub", fleet: "jobshub", photogallery: "jobshub",
    // Safety Hub children -> safetyhub
    safety: "safetyhub", rams: "safetyhub", incidents: "safetyhub",
    policies: "safetyhub", contracts: "safetyhub", training: "safetyhub",
    briefings: "safetyhub", compliance: "safetyhub",
    // SmartDocs children -> smartdocs
    aidesignspec: "smartdocs", airams: "smartdocs", aimethodstatement: "smartdocs",
    aibriefingpack: "smartdocs", aiquote: "smartdocs",
    // Hubs -> overview
    peoplehub: "overview", financehub: "overview", jobshub: "overview",
    safetyhub: "overview", smartdocs: "overview",
    // Default cases
    overview: "overview", settings: "overview", automations: "overview",
  };
  return hierarchy[section] || "overview";
};

// Get section depth for determining navigation direction
const getSectionDepth = (section: Section): number => {
  if (section === 'overview') return 0;
  if (['peoplehub', 'financehub', 'jobshub', 'safetyhub', 'smartdocs'].includes(section)) return 1;
  return 2;
};

// Page transition variants - iOS-style slide animations
const slideVariants = {
  forward: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  },
  backward: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 24 },
  },
};

const pageTransition = {
  duration: 0.2,
  ease: [0.32, 0.72, 0, 1], // iOS-like spring curve
};

// Section metadata for NativePageWrapper
interface SectionMeta {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  color: 'yellow' | 'blue' | 'green' | 'purple' | 'orange';
  queryKeys?: string[];
}

const sectionMetadata: Record<Section, SectionMeta> = {
  // Overview
  overview: { title: "Employer Hub", subtitle: "Your business command centre", icon: Home, color: "yellow", queryKeys: ['employerDashboardStats'] },
  // People Hub
  peoplehub: { title: "People Hub", subtitle: "Team & hiring", icon: Users, color: "yellow", queryKeys: ['employees', 'talentPool', 'vacancies'] },
  team: { title: "Your Team", subtitle: "Active employees", icon: Users, color: "yellow", queryKeys: ['employees'] },
  elecid: { title: "Credentials", subtitle: "Elec-ID & compliance", icon: CreditCard, color: "purple", queryKeys: ['employees', 'certifications'] },
  timesheets: { title: "Timesheets", subtitle: "Hours & attendance", icon: Clock, color: "orange", queryKeys: ['timesheets'] },
  comms: { title: "Communications", subtitle: "Messages & alerts", icon: MessageSquare, color: "blue", queryKeys: ['communications'] },
  talentpool: { title: "Talent Pool", subtitle: "Browse available sparkies", icon: UserSearch, color: "green", queryKeys: ['talentPool'] },
  vacancies: { title: "Job Vacancies", subtitle: "Post jobs & manage apps", icon: Briefcase, color: "blue", queryKeys: ['vacancies', 'applications'] },
  // Finance Hub
  financehub: { title: "Finance Hub", subtitle: "Quotes, invoices & costs", icon: PoundSterling, color: "green", queryKeys: ['quotes', 'invoices', 'expenses'] },
  quotes: { title: "Quotes & Invoices", icon: FileText, color: "green", queryKeys: ['quotes', 'invoices'] },
  tenders: { title: "Tenders", icon: FileText, color: "blue", queryKeys: ['tenders'] },
  expenses: { title: "Expenses", icon: Receipt, color: "orange", queryKeys: ['expenses'] },
  procurement: { title: "Procurement", icon: ShoppingCart, color: "blue", queryKeys: ['procurement', 'suppliers'] },
  financials: { title: "Job Financials", icon: BarChart3, color: "green", queryKeys: ['jobFinancials'] },
  reports: { title: "Reports", icon: BarChart3, color: "blue", queryKeys: ['reports'] },
  signatures: { title: "Signatures", icon: FileSignature, color: "purple" },
  pricebook: { title: "Price Book", icon: Tag, color: "yellow", queryKeys: ['priceBook'] },
  // Jobs Hub
  jobshub: { title: "Jobs Hub", subtitle: "Projects & tracking", icon: Briefcase, color: "blue", queryKeys: ['jobs', 'activeJobs'] },
  jobpacks: { title: "Job Packs", icon: Folder, color: "yellow", queryKeys: ['jobPacks'] },
  jobs: { title: "Jobs", icon: Briefcase, color: "blue", queryKeys: ['jobs'] },
  jobboard: { title: "Job Board", icon: Briefcase, color: "blue", queryKeys: ['jobs'] },
  timeline: { title: "Timeline", icon: Clock, color: "blue", queryKeys: ['jobTimeline'] },
  tracking: { title: "Worker Tracking", icon: MapPin, color: "green", queryKeys: ['workerTracking'] },
  progresslogs: { title: "Progress Logs", icon: ListChecks, color: "blue", queryKeys: ['progressLogs'] },
  issues: { title: "Job Issues", icon: AlertCircle, color: "orange", queryKeys: ['jobIssues'] },
  testing: { title: "Testing Workflow", icon: PlayCircle, color: "purple", queryKeys: ['testingWorkflow'] },
  quality: { title: "Quality & Snags", icon: CheckCircle, color: "green", queryKeys: ['quality', 'snags'] },
  clientportal: { title: "Client Portal", icon: Users2, color: "blue" },
  fleet: { title: "Fleet", icon: Truck, color: "orange", queryKeys: ['fleet', 'vehicles'] },
  photogallery: { title: "Photo Gallery", icon: Camera, color: "purple", queryKeys: ['photos'] },
  // Safety Hub
  safetyhub: { title: "Safety Hub", subtitle: "RAMS & compliance", icon: ShieldCheck, color: "orange", queryKeys: ['rams', 'incidents', 'compliance'] },
  safety: { title: "Health & Safety", icon: ShieldCheck, color: "orange", queryKeys: ['safetyRecords'] },
  rams: { title: "RAMS", icon: FileCheck, color: "orange", queryKeys: ['rams'] },
  incidents: { title: "Incidents", icon: AlertCircle, color: "orange", queryKeys: ['incidents'] },
  policies: { title: "Policies", icon: BookOpen, color: "blue", queryKeys: ['policies'] },
  contracts: { title: "Contracts", icon: FileSignature, color: "purple", queryKeys: ['contracts'] },
  training: { title: "Training Records", icon: GraduationCap, color: "blue", queryKeys: ['trainingRecords'] },
  briefings: { title: "Briefings", icon: ClipboardList, color: "yellow", queryKeys: ['briefings'] },
  compliance: { title: "Compliance", icon: CheckCircle, color: "green", queryKeys: ['compliance'] },
  // Smart Docs Hub
  smartdocs: { title: "Smart Docs", subtitle: "AI-powered documents", icon: Sparkles, color: "purple" },
  aidesignspec: { title: "AI Design Spec", icon: Cpu, color: "purple" },
  airams: { title: "AI RAMS", icon: ShieldCheck, color: "purple" },
  aimethodstatement: { title: "AI Method Statement", icon: FileText, color: "purple" },
  aibriefingpack: { title: "AI Briefing Pack", icon: ClipboardList, color: "purple" },
  aiquote: { title: "AI Quote", icon: PoundSterling, color: "purple" },
  // Other
  automations: { title: "Automations", icon: Zap, color: "purple" },
  settings: { title: "Settings", icon: Settings, color: "yellow" },
};

const EmployerDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const activeSection = (searchParams.get('section') as Section) || "overview";
  const setActiveSection = (section: Section) => setSearchParams({ section }, { replace: false });

  // Get current section metadata
  const currentMeta = sectionMetadata[activeSection];
  const CurrentIcon = currentMeta.icon;

  // Pull-to-refresh handler - invalidates React Query cache
  const handleRefresh = useCallback(async () => {
    const queryKeys = currentMeta.queryKeys || [];
    if (queryKeys.length > 0) {
      await Promise.all(
        queryKeys.map(key => queryClient.invalidateQueries({ queryKey: [key] }))
      );
      toast({
        title: "Refreshed",
        description: `${currentMeta.title} data updated.`,
      });
    }
  }, [currentMeta, queryClient, toast]);

  // Track navigation direction for page transitions
  const previousSectionRef = useRef<Section | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');

  // Update navigation direction when section changes
  useEffect(() => {
    if (previousSectionRef.current && previousSectionRef.current !== activeSection) {
      const prevDepth = getSectionDepth(previousSectionRef.current);
      const currDepth = getSectionDepth(activeSection);
      setNavigationDirection(currDepth >= prevDepth ? 'forward' : 'backward');
    }
    previousSectionRef.current = activeSection;
  }, [activeSection]);

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

  // Use real browser history for back navigation (fixes phone back button)
  const handleBack = useCallback(() => {
    // Check if we have browser history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback for direct URL access - navigate to logical parent
      const parent = getParentSection(activeSection);
      setActiveSection(parent);
    }
  }, [navigate, activeSection, setActiveSection]);

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
      <NativePageWrapper
        title={currentMeta.title}
        subtitle={currentMeta.subtitle}
        icon={<CurrentIcon />}
        headerColor={currentMeta.color}
        showBackButton={activeSection !== "overview"}
        onBack={handleBack}
        onRefresh={currentMeta.queryKeys && currentMeta.queryKeys.length > 0 ? handleRefresh : undefined}
        collapsingHeader={true}
        contentClassName="pb-20 md:pb-0"
      >
        {/* Animated page transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial={slideVariants[navigationDirection].initial}
            animate={slideVariants[navigationDirection].animate}
            exit={slideVariants[navigationDirection].exit}
            transition={pageTransition}
            className="w-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </NativePageWrapper>

      {/* Voice-controlled dialogs - outside NativePageWrapper */}
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
    </EmployerProvider>
  );
};

export default EmployerDashboard;