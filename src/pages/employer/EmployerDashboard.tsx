import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { EmployerProvider } from '@/contexts/EmployerContext';
import {
  IconButton,
  LoadingBlocks,
  Eyebrow,
} from '@/components/employer/editorial';

const OverviewSection = lazy(() =>
  import('@/components/employer/sections/OverviewSection').then((m) => ({
    default: m.OverviewSection,
  }))
);
const EmployeesSection = lazy(() =>
  import('@/components/employer/sections/EmployeesSection').then((m) => ({
    default: m.EmployeesSection,
  }))
);
const JobsSection = lazy(() =>
  import('@/components/employer/sections/JobsSection').then((m) => ({ default: m.JobsSection }))
);
const SafetyHRSection = lazy(() =>
  import('@/components/employer/sections/SafetyHRSection').then((m) => ({
    default: m.SafetyHRSection,
  }))
);
const RAMSSection = lazy(() =>
  import('@/components/employer/sections/RAMSSection').then((m) => ({ default: m.RAMSSection }))
);
const IncidentsSection = lazy(() =>
  import('@/components/employer/sections/IncidentsSection').then((m) => ({
    default: m.IncidentsSection,
  }))
);
const PoliciesSection = lazy(() =>
  import('@/components/employer/sections/PoliciesSection').then((m) => ({
    default: m.PoliciesSection,
  }))
);
const ContractsSection = lazy(() =>
  import('@/components/employer/sections/ContractsSection').then((m) => ({
    default: m.ContractsSection,
  }))
);
const TrainingRecordsSection = lazy(() =>
  import('@/components/employer/sections/TrainingRecordsSection').then((m) => ({
    default: m.TrainingRecordsSection,
  }))
);
const BriefingsSection = lazy(() =>
  import('@/components/employer/sections/BriefingsSection').then((m) => ({
    default: m.BriefingsSection,
  }))
);
const ComplianceSection = lazy(() =>
  import('@/components/employer/sections/ComplianceSection').then((m) => ({
    default: m.ComplianceSection,
  }))
);
const QuotesInvoicesSection = lazy(() =>
  import('@/components/employer/sections/QuotesInvoicesSection').then((m) => ({
    default: m.QuotesInvoicesSection,
  }))
);
const TenderSection = lazy(() =>
  import('@/components/employer/sections/TenderSection').then((m) => ({ default: m.TenderSection }))
);
const ReportsSection = lazy(() =>
  import('@/components/employer/sections/ReportsSection').then((m) => ({
    default: m.ReportsSection,
  }))
);
const SettingsSection = lazy(() =>
  import('@/components/employer/sections/SettingsSection').then((m) => ({
    default: m.SettingsSection,
  }))
);
const JobPacksSection = lazy(() =>
  import('@/components/employer/sections/JobPacksSection').then((m) => ({
    default: m.JobPacksSection,
  }))
);
const ElecIDSection = lazy(() =>
  import('@/components/employer/sections/ElecIDSection').then((m) => ({ default: m.ElecIDSection }))
);
const TimesheetsSection = lazy(() =>
  import('@/components/employer/sections/TimesheetsSection').then((m) => ({
    default: m.TimesheetsSection,
  }))
);
const CommunicationsSection = lazy(() =>
  import('@/components/employer/sections/CommunicationsSection').then((m) => ({
    default: m.CommunicationsSection,
  }))
);
const QualitySection = lazy(() =>
  import('@/components/employer/sections/QualitySection').then((m) => ({
    default: m.QualitySection,
  }))
);
const JobBoardSection = lazy(() =>
  import('@/components/employer/sections/JobBoardSection').then((m) => ({
    default: m.JobBoardSection,
  }))
);
const JobTimelineSection = lazy(() =>
  import('@/components/employer/sections/JobTimelineSection').then((m) => ({
    default: m.JobTimelineSection,
  }))
);
const WorkerTrackingSection = lazy(() =>
  import('@/components/employer/sections/WorkerTrackingSection').then((m) => ({
    default: m.WorkerTrackingSection,
  }))
);
const ProgressLogsSection = lazy(() =>
  import('@/components/employer/sections/ProgressLogsSection').then((m) => ({
    default: m.ProgressLogsSection,
  }))
);
const JobIssuesSection = lazy(() =>
  import('@/components/employer/sections/JobIssuesSection').then((m) => ({
    default: m.JobIssuesSection,
  }))
);
const JobFinancialsSection = lazy(() =>
  import('@/components/employer/sections/JobFinancialsSection').then((m) => ({
    default: m.JobFinancialsSection,
  }))
);
const TestingWorkflowSection = lazy(() =>
  import('@/components/employer/sections/TestingWorkflowSection').then((m) => ({
    default: m.TestingWorkflowSection,
  }))
);
const ClientPortalSection = lazy(() =>
  import('@/components/employer/sections/ClientPortalSection').then((m) => ({
    default: m.ClientPortalSection,
  }))
);
const TalentPoolSection = lazy(() =>
  import('@/components/employer/sections/TalentPoolSection').then((m) => ({
    default: m.TalentPoolSection,
  }))
);
const JobVacanciesSection = lazy(() =>
  import('@/components/employer/sections/JobVacanciesSection').then((m) => ({
    default: m.JobVacanciesSection,
  }))
);
const ProcurementSection = lazy(() =>
  import('@/components/employer/sections/ProcurementSection').then((m) => ({
    default: m.ProcurementSection,
  }))
);
const ExpensesSection = lazy(() =>
  import('@/components/employer/sections/ExpensesSection').then((m) => ({
    default: m.ExpensesSection,
  }))
);
const SignaturesSection = lazy(() =>
  import('@/components/employer/sections/SignaturesSection').then((m) => ({
    default: m.SignaturesSection,
  }))
);
const PriceBookSection = lazy(() =>
  import('@/components/employer/sections/PriceBookSection').then((m) => ({
    default: m.PriceBookSection,
  }))
);
const FleetSection = lazy(() =>
  import('@/components/employer/sections/FleetSection').then((m) => ({ default: m.FleetSection }))
);
const PhotoGallerySection = lazy(() =>
  import('@/components/employer/sections/PhotoGallerySection').then((m) => ({
    default: m.PhotoGallerySection,
  }))
);
const AutomationsSection = lazy(() =>
  import('@/components/employer/sections/AutomationsSection').then((m) => ({
    default: m.AutomationsSection,
  }))
);
const AIDesignSpecSection = lazy(() =>
  import('@/components/employer/sections/AIDesignSpecSection').then((m) => ({
    default: m.AIDesignSpecSection,
  }))
);
const AIRAMSSection = lazy(() =>
  import('@/components/employer/sections/AIRAMSSection').then((m) => ({ default: m.AIRAMSSection }))
);
const AIMethodStatementSection = lazy(() =>
  import('@/components/employer/sections/AIMethodStatementSection').then((m) => ({
    default: m.AIMethodStatementSection,
  }))
);
const AIBriefingPackSection = lazy(() =>
  import('@/components/employer/sections/AIBriefingPackSection').then((m) => ({
    default: m.AIBriefingPackSection,
  }))
);
const AIQuoteSection = lazy(() =>
  import('@/components/employer/sections/AIQuoteSection').then((m) => ({
    default: m.AIQuoteSection,
  }))
);

const PeopleHub = lazy(() =>
  import('@/components/employer/hubs/PeopleHub').then((m) => ({ default: m.PeopleHub }))
);
const FinanceHub = lazy(() =>
  import('@/components/employer/hubs/FinanceHub').then((m) => ({ default: m.FinanceHub }))
);
const JobsHub = lazy(() =>
  import('@/components/employer/hubs/JobsHub').then((m) => ({ default: m.JobsHub }))
);
const SafetyHub = lazy(() =>
  import('@/components/employer/hubs/SafetyHub').then((m) => ({ default: m.SafetyHub }))
);
const SmartDocsHub = lazy(() =>
  import('@/components/employer/hubs/SmartDocsHub').then((m) => ({ default: m.SmartDocsHub }))
);

const CreateQuoteDialog = lazy(() =>
  import('@/components/employer/dialogs/CreateQuoteDialog').then((m) => ({
    default: m.CreateQuoteDialog,
  }))
);
const AddJobDialog = lazy(() =>
  import('@/components/employer/dialogs/AddJobDialog').then((m) => ({ default: m.AddJobDialog }))
);
const AddEmployeeDialog = lazy(() =>
  import('@/components/employer/dialogs/AddEmployeeDialog').then((m) => ({
    default: m.AddEmployeeDialog,
  }))
);
const CreateInvoiceDialog = lazy(() =>
  import('@/components/employer/dialogs/CreateInvoiceDialog').then((m) => ({
    default: m.CreateInvoiceDialog,
  }))
);
const CreateExpenseDialog = lazy(() =>
  import('@/components/employer/dialogs/CreateExpenseDialog').then((m) => ({
    default: m.CreateExpenseDialog,
  }))
);
const ManualTimeEntryDialog = lazy(() =>
  import('@/components/employer/dialogs/ManualTimeEntryDialog').then((m) => ({
    default: m.ManualTimeEntryDialog,
  }))
);
const AddCertificationDialog = lazy(() =>
  import('@/components/employer/dialogs/AddCertificationDialog').then((m) => ({
    default: m.AddCertificationDialog,
  }))
);
const CreateOrderDialog = lazy(() =>
  import('@/components/employer/dialogs/CreateOrderDialog').then((m) => ({
    default: m.CreateOrderDialog,
  }))
);
const CreateSupplierDialog = lazy(() =>
  import('@/components/employer/dialogs/CreateSupplierDialog').then((m) => ({
    default: m.CreateSupplierDialog,
  }))
);
const PostVacancyDialog = lazy(() =>
  import('@/components/employer/dialogs/PostVacancyDialog').then((m) => ({
    default: m.PostVacancyDialog,
  }))
);

export type Section =
  | 'overview'
  | 'jobpacks'
  | 'team'
  | 'elecid'
  | 'jobs'
  | 'timesheets'
  | 'comms'
  | 'quality'
  | 'safety'
  | 'quotes'
  | 'tenders'
  | 'reports'
  | 'settings'
  | 'jobboard'
  | 'timeline'
  | 'tracking'
  | 'progresslogs'
  | 'issues'
  | 'financials'
  | 'testing'
  | 'clientportal'
  | 'talentpool'
  | 'vacancies'
  | 'procurement'
  | 'expenses'
  | 'signatures'
  | 'pricebook'
  | 'fleet'
  | 'photogallery'
  | 'peoplehub'
  | 'financehub'
  | 'jobshub'
  | 'safetyhub'
  | 'rams'
  | 'incidents'
  | 'policies'
  | 'contracts'
  | 'training'
  | 'briefings'
  | 'compliance'
  | 'automations'
  | 'smartdocs'
  | 'aidesignspec'
  | 'airams'
  | 'aimethodstatement'
  | 'aibriefingpack'
  | 'aiquote';

const getParentSection = (section: Section): Section => {
  const hierarchy: Record<Section, Section> = {
    team: 'peoplehub',
    elecid: 'peoplehub',
    timesheets: 'peoplehub',
    comms: 'peoplehub',
    talentpool: 'peoplehub',
    vacancies: 'peoplehub',
    quotes: 'financehub',
    tenders: 'financehub',
    expenses: 'financehub',
    procurement: 'financehub',
    financials: 'financehub',
    reports: 'financehub',
    signatures: 'financehub',
    pricebook: 'financehub',
    jobpacks: 'jobshub',
    jobs: 'jobshub',
    jobboard: 'jobshub',
    timeline: 'jobshub',
    tracking: 'jobshub',
    progresslogs: 'jobshub',
    issues: 'jobshub',
    testing: 'jobshub',
    quality: 'jobshub',
    clientportal: 'jobshub',
    fleet: 'jobshub',
    photogallery: 'jobshub',
    safety: 'safetyhub',
    rams: 'safetyhub',
    incidents: 'safetyhub',
    policies: 'safetyhub',
    contracts: 'safetyhub',
    training: 'safetyhub',
    briefings: 'safetyhub',
    compliance: 'safetyhub',
    aidesignspec: 'smartdocs',
    airams: 'smartdocs',
    aimethodstatement: 'smartdocs',
    aibriefingpack: 'smartdocs',
    aiquote: 'smartdocs',
    peoplehub: 'overview',
    financehub: 'overview',
    jobshub: 'overview',
    safetyhub: 'overview',
    smartdocs: 'overview',
    overview: 'overview',
    settings: 'overview',
    automations: 'overview',
  };
  return hierarchy[section] || 'overview';
};

const getSectionDepth = (section: Section): number => {
  if (section === 'overview') return 0;
  if (['peoplehub', 'financehub', 'jobshub', 'safetyhub', 'smartdocs'].includes(section)) return 1;
  return 2;
};

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
  ease: [0.32, 0.72, 0, 1],
};

interface SectionMeta {
  eyebrow: string;
  title: string;
  queryKeys?: string[];
}

const sectionMetadata: Record<Section, SectionMeta> = {
  overview: {
    eyebrow: 'Hub',
    title: 'Employer',
    queryKeys: ['employerDashboardStats'],
  },
  peoplehub: {
    eyebrow: 'Hub',
    title: 'People',
    queryKeys: ['employees', 'talentPool', 'vacancies'],
  },
  team: { eyebrow: 'People', title: 'Your Team', queryKeys: ['employees'] },
  elecid: { eyebrow: 'People', title: 'Credentials', queryKeys: ['employees', 'certifications'] },
  timesheets: { eyebrow: 'People', title: 'Timesheets', queryKeys: ['timesheets'] },
  comms: { eyebrow: 'People', title: 'Communications', queryKeys: ['communications'] },
  talentpool: { eyebrow: 'People', title: 'Talent Pool', queryKeys: ['talentPool'] },
  vacancies: { eyebrow: 'People', title: 'Vacancies', queryKeys: ['vacancies', 'applications'] },
  financehub: {
    eyebrow: 'Hub',
    title: 'Finance',
    queryKeys: ['quotes', 'invoices', 'expenses'],
  },
  quotes: { eyebrow: 'Finance', title: 'Quotes & Invoices', queryKeys: ['quotes', 'invoices'] },
  tenders: { eyebrow: 'Finance', title: 'Tenders', queryKeys: ['tenders'] },
  expenses: { eyebrow: 'Finance', title: 'Expenses', queryKeys: ['expenses'] },
  procurement: { eyebrow: 'Finance', title: 'Procurement', queryKeys: ['procurement', 'suppliers'] },
  financials: { eyebrow: 'Finance', title: 'Job Financials', queryKeys: ['jobFinancials'] },
  reports: { eyebrow: 'Finance', title: 'Reports', queryKeys: ['reports'] },
  signatures: { eyebrow: 'Finance', title: 'Signatures' },
  pricebook: { eyebrow: 'Finance', title: 'Price Book', queryKeys: ['priceBook'] },
  jobshub: { eyebrow: 'Hub', title: 'Jobs', queryKeys: ['jobs', 'activeJobs'] },
  jobpacks: { eyebrow: 'Jobs', title: 'Job Packs', queryKeys: ['jobPacks'] },
  jobs: { eyebrow: 'Jobs', title: 'Jobs', queryKeys: ['jobs'] },
  jobboard: { eyebrow: 'Jobs', title: 'Job Board', queryKeys: ['jobs'] },
  timeline: { eyebrow: 'Jobs', title: 'Timeline', queryKeys: ['jobTimeline'] },
  tracking: { eyebrow: 'Jobs', title: 'Worker Tracking', queryKeys: ['workerTracking'] },
  progresslogs: { eyebrow: 'Jobs', title: 'Progress Logs', queryKeys: ['progressLogs'] },
  issues: { eyebrow: 'Jobs', title: 'Job Issues', queryKeys: ['jobIssues'] },
  testing: { eyebrow: 'Jobs', title: 'Testing Workflow', queryKeys: ['testingWorkflow'] },
  quality: { eyebrow: 'Jobs', title: 'Quality & Snags', queryKeys: ['quality', 'snags'] },
  clientportal: { eyebrow: 'Jobs', title: 'Client Portal' },
  fleet: { eyebrow: 'Jobs', title: 'Fleet', queryKeys: ['fleet', 'vehicles'] },
  photogallery: { eyebrow: 'Jobs', title: 'Photo Gallery', queryKeys: ['photos'] },
  safetyhub: {
    eyebrow: 'Hub',
    title: 'Safety',
    queryKeys: ['rams', 'incidents', 'compliance'],
  },
  safety: { eyebrow: 'Safety', title: 'Health & Safety', queryKeys: ['safetyRecords'] },
  rams: { eyebrow: 'Safety', title: 'RAMS', queryKeys: ['rams'] },
  incidents: { eyebrow: 'Safety', title: 'Incidents', queryKeys: ['incidents'] },
  policies: { eyebrow: 'Safety', title: 'Policies', queryKeys: ['policies'] },
  contracts: { eyebrow: 'Safety', title: 'Contracts', queryKeys: ['contracts'] },
  training: { eyebrow: 'Safety', title: 'Training Records', queryKeys: ['trainingRecords'] },
  briefings: { eyebrow: 'Safety', title: 'Briefings', queryKeys: ['briefings'] },
  compliance: { eyebrow: 'Safety', title: 'Compliance', queryKeys: ['compliance'] },
  smartdocs: { eyebrow: 'Hub', title: 'Smart Docs' },
  aidesignspec: { eyebrow: 'Smart Docs', title: 'Design Spec' },
  airams: { eyebrow: 'Smart Docs', title: 'RAMS' },
  aimethodstatement: { eyebrow: 'Smart Docs', title: 'Method Statement' },
  aibriefingpack: { eyebrow: 'Smart Docs', title: 'Briefing Pack' },
  aiquote: { eyebrow: 'Smart Docs', title: 'Quote' },
  automations: { eyebrow: 'Tools', title: 'Automations' },
  settings: { eyebrow: 'Account', title: 'Settings' },
};

const EmployerDashboard = () => {
  useSEO({
    title: 'Employer Dashboard',
    description:
      'Manage your electrical team, track apprentice progress, and view compliance analytics.',
    noindex: true,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const activeSection = (searchParams.get('section') as Section) || 'overview';
  const setActiveSection = (section: Section) => setSearchParams({ section }, { replace: false });

  const currentMeta = sectionMetadata[activeSection];
  const isOverview = activeSection === 'overview';

  const handleRefresh = useCallback(async () => {
    const queryKeys = currentMeta.queryKeys || [];
    if (queryKeys.length > 0) {
      await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })));
      toast({
        title: 'Refreshed',
        description: `${currentMeta.title} data updated.`,
      });
    }
  }, [currentMeta, queryClient, toast]);

  const previousSectionRef = useRef<Section | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    if (previousSectionRef.current && previousSectionRef.current !== activeSection) {
      const prevDepth = getSectionDepth(previousSectionRef.current);
      const currDepth = getSectionDepth(activeSection);
      setNavigationDirection(currDepth >= prevDepth ? 'forward' : 'backward');
    }
    previousSectionRef.current = activeSection;
  }, [activeSection]);

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

  useEffect(() => {
    const handleOpenDialog = (e: CustomEvent<{ dialogName: string }>) => {
      const { dialogName } = e.detail;

      const dialogMap: Record<string, () => void> = {
        quote: () => setQuoteDialogOpen(true),
        'create-quote': () => setQuoteDialogOpen(true),
        job: () => setJobDialogOpen(true),
        'create-job': () => setJobDialogOpen(true),
        employee: () => setEmployeeDialogOpen(true),
        'add-employee': () => setEmployeeDialogOpen(true),
        invoice: () => setInvoiceDialogOpen(true),
        'create-invoice': () => setInvoiceDialogOpen(true),
        expense: () => setExpenseDialogOpen(true),
        'create-expense': () => setExpenseDialogOpen(true),
        'time-entry': () => setTimeEntryDialogOpen(true),
        timesheet: () => setTimeEntryDialogOpen(true),
        certification: () => setCertificationDialogOpen(true),
        'add-certification': () => setCertificationDialogOpen(true),
        order: () => setOrderDialogOpen(true),
        'create-order': () => setOrderDialogOpen(true),
        supplier: () => setSupplierDialogOpen(true),
        'create-supplier': () => setSupplierDialogOpen(true),
        vacancy: () => setVacancyDialogOpen(true),
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
    const sectionMap: Record<string, Section> = {
      overview: 'overview',
      dashboard: 'overview',
      home: 'overview',

      'people-hub': 'peoplehub',
      peoplehub: 'peoplehub',
      'people hub': 'peoplehub',
      'finance-hub': 'financehub',
      financehub: 'financehub',
      'finance hub': 'financehub',
      finance: 'financehub',
      'jobs-hub': 'jobshub',
      jobshub: 'jobshub',
      'jobs hub': 'jobshub',
      'safety-hub': 'safetyhub',
      safetyhub: 'safetyhub',
      'safety hub': 'safetyhub',

      employees: 'team',
      team: 'team',
      workers: 'team',
      staff: 'team',
      people: 'team',
      'elec-id': 'elecid',
      elecid: 'elecid',
      'elec id': 'elecid',
      credentials: 'elecid',
      'id cards': 'elecid',
      identification: 'elecid',
      badges: 'elecid',
      timesheets: 'timesheets',
      'time sheets': 'timesheets',
      leave: 'timesheets',
      communications: 'comms',
      comms: 'comms',
      messages: 'comms',
      'talent-pool': 'talentpool',
      talentpool: 'talentpool',
      'talent pool': 'talentpool',
      candidates: 'talentpool',
      'job-vacancies': 'vacancies',
      vacancies: 'vacancies',
      'job vacancies': 'vacancies',
      recruitment: 'vacancies',
      hiring: 'vacancies',

      'quotes-invoices': 'quotes',
      quotes: 'quotes',
      invoices: 'quotes',
      billing: 'quotes',
      tenders: 'tenders',
      bids: 'tenders',
      expenses: 'expenses',
      receipts: 'expenses',
      procurement: 'procurement',
      materials: 'procurement',
      purchasing: 'procurement',
      'job-financials': 'financials',
      financials: 'financials',
      'job financials': 'financials',
      'job costs': 'financials',
      reports: 'reports',
      analytics: 'reports',
      signatures: 'signatures',
      'sign offs': 'signatures',
      approvals: 'signatures',
      'price-book': 'pricebook',
      pricebook: 'pricebook',
      'price book': 'pricebook',
      pricing: 'pricebook',
      rates: 'pricebook',

      'job-packs': 'jobpacks',
      jobpacks: 'jobpacks',
      'job packs': 'jobpacks',
      documentation: 'jobpacks',
      jobs: 'jobs',
      projects: 'jobs',
      sites: 'jobs',
      'job-board': 'jobboard',
      jobboard: 'jobboard',
      'job board': 'jobboard',
      'job-timeline': 'timeline',
      timeline: 'timeline',
      schedule: 'timeline',
      milestones: 'timeline',
      'worker-tracking': 'tracking',
      tracking: 'tracking',
      location: 'tracking',
      gps: 'tracking',
      whereabouts: 'tracking',
      'progress-logs': 'progresslogs',
      progresslogs: 'progresslogs',
      'progress logs': 'progresslogs',
      progress: 'progresslogs',
      diary: 'progresslogs',
      'job-issues': 'issues',
      issues: 'issues',
      problems: 'issues',
      blockers: 'issues',
      'testing-workflow': 'testing',
      testing: 'testing',
      inspections: 'testing',
      quality: 'quality',
      snags: 'quality',
      defects: 'quality',
      'client-portal': 'clientportal',
      clientportal: 'clientportal',
      'client portal': 'clientportal',
      fleet: 'fleet',
      vehicles: 'fleet',
      vans: 'fleet',
      transport: 'fleet',
      'photo-gallery': 'photogallery',
      photogallery: 'photogallery',
      'photo gallery': 'photogallery',
      photos: 'photogallery',
      gallery: 'photogallery',
      images: 'photogallery',

      safety: 'safetyhub',
      'health and safety': 'safetyhub',
      'h&s': 'safetyhub',
      rams: 'rams',
      'risk assessments': 'rams',
      'method statements': 'rams',
      incidents: 'incidents',
      accidents: 'incidents',
      'near misses': 'incidents',
      policies: 'policies',
      procedures: 'policies',
      rules: 'policies',
      contracts: 'contracts',
      agreements: 'contracts',
      training: 'training',
      'training-records': 'training',
      'training records': 'training',
      certifications: 'training',
      certs: 'training',
      courses: 'training',
      briefings: 'briefings',
      'toolbox talks': 'briefings',
      'site meetings': 'briefings',
      compliance: 'compliance',
      regulations: 'compliance',
      audits: 'compliance',

      settings: 'settings',
      preferences: 'settings',
      configuration: 'settings',

      'smart-docs': 'smartdocs',
      smartdocs: 'smartdocs',
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

    const mappedSection = sectionMap[section.toLowerCase()] || (section as Section);
    setActiveSection(mappedSection);
  }, []);

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      const parent = getParentSection(activeSection);
      setActiveSection(parent);
    }
  }, [navigate, activeSection, setActiveSection]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection onNavigate={handleNavigate} />;
      case 'peoplehub':
        return <PeopleHub onNavigate={handleNavigate} />;
      case 'financehub':
        return <FinanceHub onNavigate={handleNavigate} />;
      case 'jobshub':
        return <JobsHub onNavigate={handleNavigate} />;
      case 'safetyhub':
        return <SafetyHub onNavigate={handleNavigate} />;
      case 'talentpool':
        return <TalentPoolSection />;
      case 'vacancies':
        return <JobVacanciesSection />;
      case 'procurement':
        return <ProcurementSection />;
      case 'expenses':
        return <ExpensesSection />;
      case 'signatures':
        return <SignaturesSection />;
      case 'pricebook':
        return <PriceBookSection />;
      case 'fleet':
        return <FleetSection />;
      case 'photogallery':
        return <PhotoGallerySection />;
      case 'jobpacks':
        return <JobPacksSection />;
      case 'team':
        return <EmployeesSection />;
      case 'elecid':
        return <ElecIDSection />;
      case 'jobs':
        return <JobsSection />;
      case 'timesheets':
        return <TimesheetsSection />;
      case 'comms':
        return <CommunicationsSection />;
      case 'quality':
        return <QualitySection />;
      case 'safety':
        return <SafetyHRSection />;
      case 'quotes':
        return <QuotesInvoicesSection />;
      case 'tenders':
        return <TenderSection />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      case 'jobboard':
        return <JobBoardSection />;
      case 'timeline':
        return <JobTimelineSection />;
      case 'tracking':
        return <WorkerTrackingSection />;
      case 'progresslogs':
        return <ProgressLogsSection />;
      case 'issues':
        return <JobIssuesSection />;
      case 'financials':
        return <JobFinancialsSection />;
      case 'testing':
        return <TestingWorkflowSection />;
      case 'clientportal':
        return <ClientPortalSection />;
      case 'rams':
        return <RAMSSection />;
      case 'incidents':
        return <IncidentsSection />;
      case 'policies':
        return <PoliciesSection />;
      case 'contracts':
        return <ContractsSection />;
      case 'training':
        return <TrainingRecordsSection />;
      case 'briefings':
        return <BriefingsSection />;
      case 'compliance':
        return <ComplianceSection />;
      case 'automations':
        return <AutomationsSection />;
      case 'smartdocs':
        return <SmartDocsHub onNavigate={handleNavigate} />;
      case 'aidesignspec':
        return <AIDesignSpecSection onNavigate={handleNavigate} />;
      case 'airams':
        return <AIRAMSSection onNavigate={handleNavigate} />;
      case 'aimethodstatement':
        return <AIMethodStatementSection onNavigate={handleNavigate} />;
      case 'aibriefingpack':
        return <AIBriefingPackSection onNavigate={handleNavigate} />;
      case 'aiquote':
        return <AIQuoteSection onNavigate={handleNavigate} />;
      default:
        return <OverviewSection onNavigate={handleNavigate} />;
    }
  };

  const hasRefresh = !!(currentMeta.queryKeys && currentMeta.queryKeys.length > 0);

  return (
    <EmployerProvider>
      <div className="min-h-screen bg-[hsl(0_0%_6%)] text-white">
        {!isOverview && (
          <div className="sticky top-0 z-30 bg-[hsl(0_0%_6%)]/85 backdrop-blur-md border-b border-white/[0.06]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
              <IconButton aria-label="Back" onClick={handleBack}>
                <ChevronLeft className="h-5 w-5" />
              </IconButton>
              <div className="min-w-0 flex-1">
                <Eyebrow>{currentMeta.eyebrow}</Eyebrow>
                <div className="mt-0.5 text-[14px] font-semibold text-white truncate">
                  {currentMeta.title}
                </div>
              </div>
              {hasRefresh && (
                <IconButton aria-label="Refresh" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </IconButton>
              )}
            </div>
          </div>
        )}

        <main className="px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSection}
              initial={slideVariants[navigationDirection].initial}
              animate={slideVariants[navigationDirection].animate}
              exit={slideVariants[navigationDirection].exit}
              transition={pageTransition}
              className="w-full"
            >
              <Suspense fallback={<div className="mx-auto max-w-7xl pt-6"><LoadingBlocks /></div>}>
                {renderSection()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Suspense fallback={null}>
        {quoteDialogOpen && (
          <CreateQuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        )}
        {jobDialogOpen && (
          <AddJobDialog open={jobDialogOpen} onOpenChange={setJobDialogOpen} trigger={null} />
        )}
        {employeeDialogOpen && (
          <AddEmployeeDialog
            open={employeeDialogOpen}
            onOpenChange={setEmployeeDialogOpen}
            trigger={null}
          />
        )}
        {invoiceDialogOpen && (
          <CreateInvoiceDialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen} />
        )}
        {expenseDialogOpen && (
          <CreateExpenseDialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen} />
        )}
        {timeEntryDialogOpen && (
          <ManualTimeEntryDialog
            open={timeEntryDialogOpen}
            onOpenChange={setTimeEntryDialogOpen}
            trigger={null}
          />
        )}
        {certificationDialogOpen && (
          <AddCertificationDialog
            open={certificationDialogOpen}
            onOpenChange={setCertificationDialogOpen}
            trigger={null}
          />
        )}
        {orderDialogOpen && (
          <CreateOrderDialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen} />
        )}
        {supplierDialogOpen && (
          <CreateSupplierDialog open={supplierDialogOpen} onOpenChange={setSupplierDialogOpen} />
        )}
        {vacancyDialogOpen && (
          <PostVacancyDialog
            open={vacancyDialogOpen}
            onOpenChange={setVacancyDialogOpen}
            trigger={null}
          />
        )}
      </Suspense>
    </EmployerProvider>
  );
};

export default EmployerDashboard;
