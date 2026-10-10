import { useState, useCallback, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { EmployerMate } from '@/components/employer/EmployerMate';
import {
  EmployerCommandPalette,
  CommandTrigger,
  type CommandSection,
} from '@/components/employer/EmployerCommandPalette';
import { useSearchParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { IconButton, LoadingBlocks, Eyebrow } from '@/components/employer/editorial';
import { AreaNav } from '@/components/employer/overview/AreaNav';
import { InDevelopmentBanner } from '@/components/employer/InDevelopmentBanner';
import { EmployerSearchSheet } from '@/components/employer/EmployerSearchSheet';
import { PageHelpAskProvider, type PageAskHandler } from '@/components/hub/PageHelp';
import { openEmployerMate } from '@/components/employer/employerMateBus';
import { RtwGuardHost } from '@/components/employer/people/RtwGuard';
import { SafetyScopeProvider } from '@/components/electrician-tools/site-safety/common/SafetyScope';

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
const ComplianceSection = lazy(() =>
  import('@/components/employer/sections/ComplianceSection').then((m) => ({
    default: m.ComplianceSection,
  }))
);
const AccountsSection = lazy(() =>
  import('@/components/employer/sections/AccountsSection').then((m) => ({
    default: m.AccountsSection,
  }))
);
const QuotesInvoicesSection = lazy(() =>
  import('@/components/employer/sections/QuotesInvoicesSection').then((m) => ({
    default: m.QuotesInvoicesSection,
  }))
);
const ClientsSection = lazy(() =>
  import('@/components/employer/sections/ClientsSection').then((m) => ({
    default: m.ClientsSection,
  }))
);
const CustomerInboxSection = lazy(() =>
  import('@/components/employer/sections/CustomerInboxSection').then((m) => ({
    default: m.CustomerInboxSection,
  }))
);
// ELE-2094: Leads IS Enquiries now (the shared `enquiries` table and AI
// reader). The section key stays 'leads' so every link and bell still opens it.
const EnquiriesSection = lazy(() =>
  import('@/components/employer/sections/EnquiriesSection').then((m) => ({
    default: m.EnquiriesSection,
  }))
);
const QuotePageSection = lazy(() =>
  import('@/components/employer/sections/QuotePageSection').then((m) => ({
    default: m.QuotePageSection,
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
const LeaveSection = lazy(() =>
  import('@/components/employer/sections/LeaveSection').then((m) => ({
    default: m.LeaveSection,
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
const QSReviewsSection = lazy(() =>
  import('@/components/employer/sections/QSReviewsSection').then((m) => ({
    default: m.QSReviewsSection,
  }))
);
const JobBoardSection = lazy(() =>
  import('@/components/employer/sections/JobBoardSection').then((m) => ({
    default: m.JobBoardSection,
  }))
);
const DiarySection = lazy(() =>
  import('@/components/employer/sections/DiarySection').then((m) => ({
    default: m.DiarySection,
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
const CashForecastSection = lazy(() =>
  import('@/components/employer/sections/CashForecastSection').then((m) => ({
    default: m.CashForecastSection,
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
const SubcontractorsSection = lazy(() =>
  import('@/components/employer/sections/SubcontractorsSection').then((m) => ({
    default: m.SubcontractorsSection,
  }))
);
// ELE-2061 / ELE-2075: right to work, probation and retention.
const HrRecordsSection = lazy(() =>
  import('@/components/employer/sections/HrRecordsSection').then((m) => ({
    default: m.HrRecordsSection,
  }))
);
const ApprenticeProgressSection = lazy(() =>
  import('@/components/employer/sections/ApprenticeProgressSection').then((m) => ({
    default: m.ApprenticeProgressSection,
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
const AccountingSection = lazy(() =>
  import('@/components/employer/sections/AccountingSection').then((m) => ({
    default: m.AccountingSection,
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
const KitRegisterSection = lazy(() =>
  import('@/components/employer/sections/KitRegisterSection').then((m) => ({
    default: m.KitRegisterSection,
  }))
);
const PhotoGallerySection = lazy(() =>
  import('@/components/employer/sections/PhotoGallerySection').then((m) => ({
    default: m.PhotoGallerySection,
  }))
);
const RecurringSection = lazy(() =>
  import('@/components/employer/sections/RecurringSection').then((m) => ({
    default: m.RecurringSection,
  }))
);
// ELE-1987
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
// Site Safety in both hubs: the Electrical Hub's tools, in the firm's scope.
const SiteSafetySection = lazy(() =>
  import('@/components/employer/sections/SiteSafetySection').then((m) => ({
    default: m.SiteSafetySection,
  }))
);
const ChecklistsSection = lazy(() =>
  import('@/components/employer/sections/ChecklistsSection').then((m) => ({
    default: m.ChecklistsSection,
  }))
);
const SafetyHub = lazy(() =>
  import('@/components/employer/hubs/SafetyHub').then((m) => ({ default: m.SafetyHub }))
);
const SmartDocsHub = lazy(() =>
  import('@/components/employer/hubs/SmartDocsHub').then((m) => ({ default: m.SmartDocsHub }))
);
const ClientsHub = lazy(() =>
  import('@/components/employer/hubs/ClientsHub').then((m) => ({ default: m.ClientsHub }))
);

export type Section =
  | 'overview'
  | 'jobpacks'
  | 'team'
  | 'elecid'
  | 'jobs'
  | 'timesheets'
  | 'leave'
  | 'comms'
  | 'quality'
  | 'safety'
  | 'quotes'
  | 'accounts'
  | 'tenders'
  | 'reports'
  | 'settings'
  | 'jobboard'
  | 'diary'
  | 'timeline'
  | 'tracking'
  | 'progresslogs'
  | 'issues'
  | 'financials'
  | 'cashforecast'
  | 'testing'
  | 'clientportal'
  | 'talentpool'
  | 'apprentices'
  | 'subcontractors'
  | 'vacancies'
  | 'procurement'
  | 'expenses'
  | 'signatures'
  | 'pricebook'
  | 'accounting'
  | 'fleet'
  | 'kit'
  | 'photogallery'
  | 'recurring'
  | 'automations'
  | 'peoplehub'
  | 'financehub'
  | 'jobshub'
  | 'safetyhub'
  | 'clientshub'
  | 'rams'
  | 'incidents'
  | 'policies'
  | 'contracts'
  | 'training'
  | 'briefings'
  | 'compliance'
  | 'checklists'
  | 'sitesafety'
  | 'smartdocs'
  | 'aidesignspec'
  | 'airams'
  | 'aimethodstatement'
  | 'aibriefingpack'
  | 'aiquote'
  | 'clients'
  | 'inbox'
  | 'leads'
  | 'quotepage'
  | 'qsreviews'
  | 'hrrecords';

const getParentSection = (section: Section): Section => {
  const hierarchy: Record<Section, Section> = {
    team: 'peoplehub',
    elecid: 'peoplehub',
    timesheets: 'peoplehub',
    leave: 'peoplehub',
    comms: 'peoplehub',
    talentpool: 'peoplehub',
    apprentices: 'peoplehub',
    subcontractors: 'peoplehub',
    vacancies: 'peoplehub',
    hrrecords: 'peoplehub',
    quotes: 'financehub',
    accounts: 'financehub',
    tenders: 'financehub',
    expenses: 'financehub',
    procurement: 'financehub',
    financials: 'financehub',
    cashforecast: 'financehub',
    reports: 'financehub',
    signatures: 'financehub',
    pricebook: 'financehub',
    accounting: 'financehub',
    jobpacks: 'jobshub',
    jobs: 'jobshub',
    jobboard: 'jobshub',
    diary: 'jobshub',
    timeline: 'jobshub',
    tracking: 'jobshub',
    progresslogs: 'jobshub',
    issues: 'jobshub',
    testing: 'jobshub',
    quality: 'jobshub',
    qsreviews: 'jobshub',
    clientportal: 'clientshub',
    clients: 'clientshub',
    inbox: 'clientshub',
    leads: 'clientshub',
    quotepage: 'clientshub',
    fleet: 'jobshub',
    kit: 'jobshub',
    photogallery: 'jobshub',
    recurring: 'jobshub',
    automations: 'jobshub',
    safety: 'safetyhub',
    rams: 'safetyhub',
    incidents: 'safetyhub',
    policies: 'safetyhub',
    contracts: 'peoplehub', // ELE-1982: an HR record, not a safety one
    training: 'safetyhub',
    briefings: 'safetyhub',
    compliance: 'safetyhub',
    checklists: 'safetyhub',
    sitesafety: 'safetyhub',
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
    clientshub: 'overview',
    overview: 'overview',
    settings: 'overview',
  };
  return hierarchy[section] || 'overview';
};

const HUB_AREAS: Section[] = ['peoplehub', 'jobshub', 'financehub', 'safetyhub', 'clientshub', 'smartdocs'];

const getSectionDepth = (section: Section): number => {
  if (section === 'overview') return 0;
  if (
    ['peoplehub', 'financehub', 'jobshub', 'safetyhub', 'smartdocs', 'clientshub'].includes(section)
  )
    return 1;
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

// queryKeys must match the REAL react-query keys used by each section's hooks
// (see the hooks named in each comment) — otherwise the header Refresh button
// silently invalidates nothing.
// URL-level aliases for deep links (notifications, emails, old bookmarks).
// In-app navigation has its own richer map in handleNavigate.
const URL_SECTION_ALIASES: Record<string, string> = {
  incident: 'incidents',
  accidents: 'incidents',
  'near-misses': 'incidents',
  progress: 'progresslogs',
  'progress-logs': 'progresslogs',
  invoices: 'quotes',
  invoice: 'quotes',
  quote: 'quotes',
  messages: 'comms',
  communications: 'comms',
  thread: 'comms',
  employees: 'team',
  workers: 'team',
  people: 'team',
  member: 'team',
  snags: 'quality',
  snag: 'quality',
  defects: 'quality',
  'punch-list': 'quality',
  'site-diary': 'progresslogs',
  photos: 'photogallery',
  'photo-gallery': 'photogallery',
  gallery: 'photogallery',
  renewals: 'recurring',
  renewal: 'recurring',
  maintenance: 'recurring',
  'recurring-work': 'recurring',
  repeat: 'recurring',
  automation: 'automations',
  workflows: 'automations',
  customers: 'clients',
  client: 'clients',
  'customer-inbox': 'inbox',
  enquiries: 'leads',
  lead: 'leads',
  expense: 'expenses',
  receipts: 'expenses',
  timesheet: 'timesheets',
  holiday: 'leave',
  holidays: 'leave',
  absence: 'leave',
  signature: 'signatures',
  approvals: 'signatures',
  'qs-reviews': 'qsreviews',
  qs: 'qsreviews',
  'job-packs': 'jobpacks',
  packs: 'jobpacks',
  'pre-start': 'checklists',
  prestart: 'checklists',
  checklist: 'checklists',
  'site-safety': 'sitesafety',
  'safety-tools': 'sitesafety',
  job: 'jobs',
  briefing: 'briefings',
  apprentice: 'apprentices',
  subcontractor: 'subcontractors',
  subbies: 'subcontractors',
  subbie: 'subcontractors',
  'right-to-work': 'hrrecords',
  rtw: 'hrrecords',
  vehicles: 'fleet',
  policy: 'policies',
};

const sectionMetadata: Record<Section, SectionMeta> = {
  overview: {
    eyebrow: 'Hub',
    title: 'Employer',
    queryKeys: [
      'employer-jobs',
      'worker-locations',
      'quotes',
      'employer-leads',
      'qsReviews',
      'employer-otj-attestations',
    ],
  },
  peoplehub: {
    eyebrow: 'Hub',
    title: 'People',
    queryKeys: [
      'employer-employees',
      'vacancies',
      'vacancy-applications',
      'timesheets',
      'communications',
      'elec-id-profiles',
      'worker-locations',
      'people-hub-activity',
      'apprentice-progress',
    ],
  },
  team: { eyebrow: 'People', title: 'Your Team', queryKeys: ['employer-employees'] },
  elecid: {
    eyebrow: 'People',
    title: 'Credentials',
    queryKeys: ['elec-id-profiles', 'employer-employees'],
  },
  timesheets: { eyebrow: 'People', title: 'Timesheets', queryKeys: ['timesheets'] },
  leave: {
    eyebrow: 'People',
    title: 'Leave',
    queryKeys: ['team-leave-requests', 'team-holiday-allowances', 'team-job-assignments'],
  },
  comms: { eyebrow: 'People', title: 'Communications', queryKeys: ['communications'] },
  talentpool: { eyebrow: 'People', title: 'Talent Pool' }, // RPC-backed, not react-query
  apprentices: {
    eyebrow: 'People',
    title: 'Apprentices',
    queryKeys: ['apprentice-progress', 'employer-otj-attestations'],
  },
  subcontractors: {
    eyebrow: 'People',
    title: 'Subcontractors',
    queryKeys: ['subcontractor-run', 'employer-employees'],
  },
  hrrecords: {
    eyebrow: 'People',
    title: 'Right to work and HR records',
    queryKeys: ['rtw-team-status', 'rtw-submissions', 'hr-people', 'hr-retention-queue', 'hr-settings'],
  },
  vacancies: {
    eyebrow: 'People',
    title: 'Vacancies',
    queryKeys: ['vacancies', 'vacancy-applications'],
  },
  financehub: {
    eyebrow: 'Hub',
    title: 'Finance',
    queryKeys: ['quotes', 'invoices', 'expense_claims', 'material_orders', 'price_book'],
  },
  quotes: { eyebrow: 'Finance', title: 'Quotes & Invoices', queryKeys: ['quotes', 'invoices'] },
  accounts: {
    eyebrow: 'Finance',
    title: 'Accounts',
    queryKeys: ['employer-pnl', 'employer-ledger'],
  },
  tenders: { eyebrow: 'Finance', title: 'Tenders', queryKeys: ['tenders'] },
  expenses: {
    eyebrow: 'Finance',
    title: 'Expenses',
    queryKeys: ['expense_claims', 'receipt-captures'],
  },
  procurement: {
    eyebrow: 'Finance',
    title: 'Procurement',
    queryKeys: ['material_orders', 'suppliers'],
  },
  financials: { eyebrow: 'Finance', title: 'Job Financials', queryKeys: ['job-financials'] },
  cashforecast: { eyebrow: 'Finance', title: 'Cash forecast', queryKeys: ['cash-forecast'] },
  reports: { eyebrow: 'Finance', title: 'Reports', queryKeys: ['finance-reports', 'debtor-aging'] },
  signatures: { eyebrow: 'Finance', title: 'Signatures' },
  pricebook: {
    eyebrow: 'Finance',
    title: 'Price book',
    queryKeys: ['firm-price-book', 'firm-rates'],
  },
  accounting: {
    eyebrow: 'Finance',
    title: 'Accounting',
    queryKeys: ['firm-accounting', 'firm-invoice-sync', 'payroll-run'],
  },
  jobshub: {
    eyebrow: 'Hub',
    title: 'Jobs',
    queryKeys: ['employer-jobs', 'job-packs', 'jobIssues', 'fleet', 'qsReviews'],
  },
  jobpacks: { eyebrow: 'Jobs', title: 'Job Packs', queryKeys: ['job-packs'] },
  jobs: { eyebrow: 'Jobs', title: 'Jobs', queryKeys: ['employer-jobs'] },
  jobboard: { eyebrow: 'Jobs', title: 'Job Board', queryKeys: ['employer-jobs'] },
  diary: { eyebrow: 'Jobs', title: 'Diary', queryKeys: ['dispatch-board', 'employer-jobs'] },
  timeline: {
    eyebrow: 'Jobs',
    title: 'Timeline',
    queryKeys: ['employer-jobs', 'all-job-assignments'],
  },
  tracking: { eyebrow: 'Jobs', title: 'Worker Tracking', queryKeys: ['worker-locations'] },
  progresslogs: { eyebrow: 'Jobs', title: 'Site diary', queryKeys: ['progressLogs', 'site-diary'] },
  issues: {
    eyebrow: 'Jobs',
    title: 'Issues',
    queryKeys: ['jobIssues', 'issue-variations', 'signatureRequests'],
  },
  testing: { eyebrow: 'Jobs', title: 'Testing', queryKeys: ['job-certificates', 'employer-jobs'] },
  quality: { eyebrow: 'Jobs', title: 'Issues', queryKeys: ['jobIssues', 'employer-jobs'] },
  qsreviews: { eyebrow: 'Jobs', title: 'QS Reviews', queryKeys: ['qsReviews'] },
  clientportal: { eyebrow: 'Clients', title: 'Client Portal' },
  inbox: { eyebrow: 'Clients', title: 'Customer inbox', queryKeys: ['firm-customer-inbox'] },
  fleet: { eyebrow: 'Jobs', title: 'Fleet', queryKeys: ['fleet', 'vehicles'] },
  kit: { eyebrow: 'Jobs', title: 'Kit register', queryKeys: ['company-tools', 'tool-checks'] },
  photogallery: { eyebrow: 'Jobs', title: 'Photo Gallery', queryKeys: ['jobPhotos', 'photo-feed'] },
  recurring: {
    eyebrow: 'Jobs',
    title: 'Recurring work',
    queryKeys: ['firm-recurring', 'firm-renewals'],
  },
  automations: { eyebrow: 'Jobs', title: 'Automations', queryKeys: ['employer-automations'] },
  safetyhub: {
    eyebrow: 'Hub',
    title: 'Safety',
    queryKeys: ['incidents', 'ramsDocuments', 'userPolicies', 'trainingRecords'],
  },
  safety: {
    eyebrow: 'Safety',
    title: 'Health & Safety',
    queryKeys: ['incidents', 'trainingRecords'],
  },
  rams: { eyebrow: 'Safety', title: 'RAMS', queryKeys: ['ramsDocuments'] },
  incidents: { eyebrow: 'Safety', title: 'Incidents', queryKeys: ['incidents'] },
  policies: {
    eyebrow: 'Safety',
    title: 'Policies',
    queryKeys: ['userPolicies', 'policyTemplates'],
  },
  contracts: {
    eyebrow: 'People',
    title: 'Contracts',
    queryKeys: ['contracts', 'person-contracts'],
  },
  training: { eyebrow: 'Safety', title: 'Training Records', queryKeys: ['trainingRecords'] },
  briefings: { eyebrow: 'Safety', title: 'Briefings', queryKeys: ['briefings'] },
  compliance: { eyebrow: 'Safety', title: 'Compliance', queryKeys: ['complianceDocuments'] },
  sitesafety: {
    eyebrow: 'Safety',
    title: 'Site Safety',
    queryKeys: ['recent-generated-rams', 'ramsDocuments'],
  },
  checklists: {
    eyebrow: 'Safety',
    title: 'Checklists',
    queryKeys: ['checklist-overview', 'checklist-templates'],
  },
  smartdocs: { eyebrow: 'Hub', title: 'Smart Docs' },
  clientshub: { eyebrow: 'Hub', title: 'Clients', queryKeys: ['employer-clients'] },
  clients: { eyebrow: 'Clients', title: 'Clients', queryKeys: ['employer-clients'] },
  leads: { eyebrow: 'Clients', title: 'Enquiries', queryKeys: ['front-door', 'enquiries'] },
  quotepage: { eyebrow: 'Clients', title: 'Quote Page', queryKeys: ['lead-page-config'] },
  aidesignspec: { eyebrow: 'Smart Docs', title: 'Design Spec' },
  airams: { eyebrow: 'Smart Docs', title: 'Safety documents' },
  aimethodstatement: { eyebrow: 'Smart Docs', title: 'Safety documents' },
  aibriefingpack: { eyebrow: 'Smart Docs', title: 'Briefing Pack' },
  aiquote: { eyebrow: 'Smart Docs', title: 'AI quote' },
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
  const location = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // Deep links (bell, push, email) can carry an old or singular key. Resolve
  // it to a real section so an unknown key never blanks the hub.
  const rawSection = searchParams.get('section') || 'overview';
  const activeSection: Section =
    rawSection in sectionMetadata
      ? (rawSection as Section)
      : ((URL_SECTION_ALIASES[rawSection.toLowerCase()] as Section | undefined) ?? 'overview');
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
  const [mateOpen, setMateOpen] = useState(false);
  const [mateQuery, setMateQuery] = useState<string | undefined>(undefined);
  const [cmdOpen, setCmdOpen] = useState(false);
  // ELE-1939: one search, two shapes. Phones get the full-screen sheet; a
  // wider screen keeps the ⌘K palette.
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => {
    const phone =
      typeof window !== 'undefined' && window.matchMedia?.('(max-width: 767px)').matches;
    if (phone) setSearchOpen(true);
    else setCmdOpen(true);
  }, []);
  const [recentKeys, setRecentKeys] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('employer_recent_sections') || '[]');
    } catch {
      return [];
    }
  });

  // Every navigable section, for the ⌘K command palette (excludes the hub root).
  const commandSections: CommandSection[] = useMemo(
    () =>
      (Object.entries(sectionMetadata) as [Section, SectionMeta][])
        .filter(([key]) => key !== 'overview')
        .map(([key, m]) => ({ key, eyebrow: m.eyebrow, title: m.title })),
    []
  );

  const recentSections: CommandSection[] = useMemo(
    () =>
      recentKeys
        .map((k) => {
          const m = sectionMetadata[k as Section];
          return m ? { key: k, eyebrow: m.eyebrow, title: m.title } : null;
        })
        .filter((s): s is CommandSection => s !== null),
    [recentKeys]
  );

  useEffect(() => {
    if (previousSectionRef.current && previousSectionRef.current !== activeSection) {
      const prevDepth = getSectionDepth(previousSectionRef.current);
      const currDepth = getSectionDepth(activeSection);
      setNavigationDirection(currDepth >= prevDepth ? 'forward' : 'backward');
    }
    previousSectionRef.current = activeSection;
  }, [activeSection]);

  // A new section is a fresh page — land at the top. Sections swap via the
  // ?section= param (the /employer pathname never changes), so the global
  // pathname-keyed ScrollToTop doesn't fire for hub navigation.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeSection]);

  // ⌘K / Ctrl-K opens the command palette from anywhere in the hub.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Track recently-visited leaf sections for the palette's "Recent" group.
  useEffect(() => {
    if (getSectionDepth(activeSection) !== 2) return;
    setRecentKeys((prev) => {
      const next = [activeSection, ...prev.filter((k) => k !== activeSection)].slice(0, 5);
      try {
        localStorage.setItem('employer_recent_sections', JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [activeSection]);

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
      'clients-hub': 'clientshub',
      clientshub: 'clientshub',
      'clients hub': 'clientshub',
      crm: 'clientshub',

      subcontractors: 'subcontractors',
      subcontractor: 'subcontractors',
      subbies: 'subcontractors',
      'right to work': 'hrrecords',
      'right-to-work': 'hrrecords',
      probation: 'hrrecords',
      retention: 'hrrecords',
      'hr records': 'hrrecords',
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
      accounts: 'accounts',
      ledger: 'accounts',
      'profit and loss': 'accounts',
      'p&l': 'accounts',
      books: 'accounts',
      accounting: 'accounting',
      timesheets: 'timesheets',
      'time sheets': 'timesheets',
      leave: 'leave',
      holiday: 'leave',
      holidays: 'leave',
      'annual leave': 'leave',
      absence: 'leave',
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
      'cash forecast': 'cashforecast',
      forecast: 'cashforecast',
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
      xero: 'accounting',
      quickbooks: 'accounting',
      sage: 'accounting',
      payroll: 'accounting',
      'send to payroll': 'accounting',

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
      diary: 'diary',
      dispatch: 'diary',
      'dispatch board': 'diary',
      rota: 'diary',
      'who is where': 'diary',
      'site diary': 'progresslogs',
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
      'qs-reviews': 'qsreviews',
      qsreviews: 'qsreviews',
      'qs reviews': 'qsreviews',
      'qs review': 'qsreviews',
      'qualifying supervisor': 'qsreviews',
      'client-portal': 'clientportal',
      clientportal: 'clientportal',
      'client portal': 'clientportal',
      clients: 'clients',
      customers: 'clients',
      inbox: 'inbox',
      'customer inbox': 'inbox',
      leads: 'leads',
      enquiries: 'leads',
      'quote-page': 'quotepage',
      quotepage: 'quotepage',
      'quote page': 'quotepage',
      'get quotes': 'quotepage',
      'get a quote': 'quotepage',
      'lead page': 'quotepage',
      'lead capture': 'quotepage',
      fleet: 'fleet',
      vehicles: 'fleet',
      vans: 'fleet',
      transport: 'fleet',
      kit: 'kit',
      'kit register': 'kit',
      'kit-register': 'kit',
      tools: 'kit',
      equipment: 'kit',
      calibration: 'kit',
      'pat testing': 'kit',
      'photo-gallery': 'photogallery',
      photogallery: 'photogallery',
      'photo gallery': 'photogallery',
      photos: 'photogallery',
      gallery: 'photogallery',
      images: 'photogallery',
      recurring: 'recurring',
      'recurring work': 'recurring',
      renewals: 'recurring',
      maintenance: 'recurring',
      'maintenance contracts': 'recurring',
      automations: 'automations',
      automation: 'automations',

      safety: 'safetyhub',
      'health and safety': 'safetyhub',
      'h&s': 'safetyhub',
      rams: 'rams',
      'risk assessments': 'rams',
      'method statements': 'rams',
      incidents: 'incidents',
      accidents: 'incidents',
      'near misses': 'incidents',
      checklists: 'checklists',
      checklist: 'checklists',
      'pre-start checks': 'checklists',
      'pre-start': 'checklists',
      'site safety': 'sitesafety',
      'site-safety': 'sitesafety',
      sitesafety: 'sitesafety',
      'hazard database': 'sitesafety',
      'safety alerts': 'sitesafety',
      recalls: 'sitesafety',
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
      'ai method statement': 'airams',
      'method statement': 'airams',
      'safety documents': 'airams',
      'ai briefing': 'aibriefingpack',
      'briefing pack': 'aibriefingpack',
      'ai quote': 'aiquote',
      'generate quote': 'aiquote',
    };

    const mappedSection = sectionMap[section.toLowerCase()] || (section as Section);
    setActiveSection(mappedSection);
  }, []);

  const handleBack = useCallback(() => {
    // location.key === 'default' means a cold entry (deep link / refresh) —
    // browser-back would leave the app entirely, so walk up the hub
    // hierarchy instead. Otherwise honour real history like a native app.
    // Entries pushed during a hierarchy walk are tagged state.hubWalk so the
    // next back keeps walking up rather than navigate(-1)-ing straight back
    // into the cold entry (which would ping-pong between the two forever).
    const isColdEntry = location.key === 'default';
    const isHubWalk = (location.state as { hubWalk?: boolean } | null)?.hubWalk === true;
    if (!isColdEntry && !isHubWalk && window.history.length > 1) {
      navigate(-1);
    } else {
      const parent = getParentSection(activeSection);
      setSearchParams({ section: parent }, { replace: false, state: { hubWalk: true } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, activeSection, location.key, location.state]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewSection
            onNavigate={handleNavigate}
            onOpenMate={() => {
              setMateQuery(undefined);
              setMateOpen(true);
            }}
            onOpenCommand={openSearch}
          />
        );
      case 'peoplehub':
        return <PeopleHub onNavigate={handleNavigate} />;
      case 'financehub':
        return <FinanceHub onNavigate={handleNavigate} />;
      case 'jobshub':
        return <JobsHub onNavigate={handleNavigate} />;
      case 'clientshub':
        return <ClientsHub onNavigate={handleNavigate} />;
      case 'safetyhub':
        return <SafetyHub onNavigate={handleNavigate} />;
      case 'talentpool':
        return <TalentPoolSection />;
      case 'subcontractors':
        return <SubcontractorsSection />;
      case 'hrrecords':
        return <HrRecordsSection />;
      case 'apprentices':
        return <ApprenticeProgressSection />;
      case 'vacancies':
        return <JobVacanciesSection />;
      case 'procurement':
        return <ProcurementSection />;
      case 'expenses':
        return <ExpensesSection />;
      case 'clients':
        return <ClientsSection onNavigate={handleNavigate} />;
      case 'inbox':
        return <CustomerInboxSection />;
      case 'leads':
        return <EnquiriesSection />;
      case 'quotepage':
        return <QuotePageSection />;
      case 'signatures':
        return <SignaturesSection />;
      case 'pricebook':
        return <PriceBookSection />;
      case 'accounting':
        return <AccountingSection />;
      case 'fleet':
        return <FleetSection />;
      case 'kit':
        return <KitRegisterSection />;
      case 'photogallery':
        return <PhotoGallerySection />;
      case 'recurring':
        return <RecurringSection />;
      case 'automations':
        return <AutomationsSection />;
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
      case 'leave':
        return <LeaveSection />;
      case 'comms':
        return <CommunicationsSection />;
      case 'quality':
        return <QualitySection />;
      case 'qsreviews':
        return <QSReviewsSection />;
      case 'safety':
        return <SafetyHRSection />;
      case 'quotes':
        return <QuotesInvoicesSection />;
      case 'accounts':
        return <AccountsSection />;
      case 'tenders':
        return <TenderSection />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      case 'jobboard':
        return <JobBoardSection />;
      case 'diary':
        return <DiarySection />;
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
      case 'cashforecast':
        return <CashForecastSection onNavigate={setActiveSection} />;
      case 'testing':
        return <TestingWorkflowSection />;
      case 'clientportal':
        return <ClientPortalSection />;
      case 'rams':
        // The firm's RAMS (employer_id), on the same rows as Site Safety.
        return (
          <SafetyScopeProvider mode="firm" fallback={<LoadingBlocks />}>
            <RAMSSection onNavigate={handleNavigate} />
          </SafetyScopeProvider>
        );
      case 'incidents':
        return <IncidentsSection />;
      case 'policies':
        return <PoliciesSection />;
      case 'contracts':
        return <ContractsSection />;
      case 'training':
        return <TrainingRecordsSection />;
      case 'briefings':
        // Toolbox talks are Site Safety's (team_briefings) in both hubs now
        // (ELE-2031). The old Employer briefings screen is retired from
        // navigation; its table and rows are kept.
        return <Navigate to="/employer?section=site-safety&tool=team-briefing" replace />;
      case 'sitesafety':
        return <SiteSafetySection onNavigate={handleNavigate} />;
      case 'checklists':
        return <ChecklistsSection />;
      case 'compliance':
        return <ComplianceSection />;
      case 'smartdocs':
        return <SmartDocsHub onNavigate={handleNavigate} />;
      case 'aidesignspec':
        return <AIDesignSpecSection onNavigate={handleNavigate} />;
      case 'airams':
        return <AIRAMSSection onNavigate={handleNavigate} />;
      case 'aimethodstatement':
        // One "Safety documents for this job" generator (ELE-1941): a run has
        // always produced the RAMS and its method statement together.
        return <Navigate to="/employer?section=airams" replace />;
      case 'aibriefingpack':
        // The AI briefing pack is now a real toolbox talk (ELE-1942): drafted
        // with AI (and the site photos) in the briefing editor, signed by the
        // crew in the app. The old section only wrote text onto a job pack.
        return <Navigate to="/employer?section=site-safety&tool=team-briefing&new=1" replace />;
      case 'aiquote':
        return <AIQuoteSection onNavigate={handleNavigate} />;
      default:
        return (
          <OverviewSection
            onNavigate={handleNavigate}
            onOpenMate={() => {
              setMateQuery(undefined);
              setMateOpen(true);
            }}
            onOpenCommand={openSearch}
          />
        );
    }
  };

  const hasRefresh = !!(currentMeta.queryKeys && currentMeta.queryKeys.length > 0);

  // "Ask Mate about this page" in every page's ? help opens Mate with the page in context.
  const askMate: PageAskHandler = (ctx) =>
    openEmployerMate({ page: ctx.page, tab: ctx.tab, summary: ctx.summary });

  return (
    <PageHelpAskProvider value={askMate}>
      {/* Same ground as the landing page (--background, 11%), bled to the edges of
          Layout's padded <main> so there's no darker frame around it. */}
      <div className="-mx-3 -mt-1 sm:-mx-4 sm:-mt-3 md:-mx-6 md:-mt-6 lg:-mx-8 min-h-screen bg-background text-white">
        <InDevelopmentBanner section={activeSection} />

        {/* A Site Safety tool draws its own masthead with Back, so the hub's
            bar is hidden while one is open (one Back, not two). */}
        {!isOverview && !(activeSection === 'sitesafety' && searchParams.get('tool')) && (
          <div className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-white/[0.06]">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
              <IconButton aria-label="Back" onClick={handleBack}>
                <ChevronLeft className="h-5 w-5" />
              </IconButton>
              <div className="min-w-0 flex-1">
                <Eyebrow>{currentMeta.eyebrow}</Eyebrow>
                <div className="mt-0.5 text-[14px] font-semibold text-white truncate">
                  {currentMeta.title}
                </div>
              </div>
              <AreaNav
                className="hidden xl:flex"
                current={
                  HUB_AREAS.includes(activeSection)
                    ? activeSection
                    : HUB_AREAS.includes(getParentSection(activeSection))
                      ? getParentSection(activeSection)
                      : null
                }
                onGo={(s) => setActiveSection(s as Section)}
              />
              <CommandTrigger onOpen={openSearch} />
              {hasRefresh && (
                <IconButton aria-label="Refresh" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </IconButton>
              )}
            </div>
          </div>
        )}

        {/* pb-28 / sm:pb-24 keep the last control on every page clear of the
            floating Ask Mate button once you scroll to the end (phone: bottom-20,
            48px; wider: bottom-6, 44px). */}
        <main className="px-4 pb-28 sm:px-6 sm:pb-24 lg:px-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSection}
              initial={slideVariants[navigationDirection].initial}
              animate={slideVariants[navigationDirection].animate}
              exit={slideVariants[navigationDirection].exit}
              transition={pageTransition}
              className="w-full"
            >
              <Suspense
                fallback={
                  <div className="mx-auto max-w-[1600px] pt-6">
                    <LoadingBlocks />
                  </div>
                }
              >
                {renderSection()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ELE-2061: the right-to-work gate the assign / book / approve / pay paths call. */}
      <RtwGuardHost />
      <EmployerCommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        sections={commandSections}
        recents={recentSections}
        onNavigate={(k) => handleNavigate(k)}
        onAskMate={(q) => {
          setMateQuery(q || undefined);
          setMateOpen(true);
        }}
      />
      <EmployerSearchSheet
        open={searchOpen}
        onOpenChange={setSearchOpen}
        sections={commandSections}
        recentPages={recentSections}
        onGo={(section, params) =>
          params ? setSearchParams({ section, ...params }) : handleNavigate(section)
        }
        onAskMate={(q) => {
          setMateQuery(q || undefined);
          setMateOpen(true);
        }}
      />
      <EmployerMate
        open={mateOpen}
        onOpenChange={(o) => {
          setMateOpen(o);
          if (!o) setMateQuery(undefined);
        }}
        initialQuery={mateQuery}
        pageContext={currentMeta?.title}
        pageKey={activeSection}
        showLauncher={!isOverview}
      />
    </PageHelpAskProvider>
  );
};

export default EmployerDashboard;
