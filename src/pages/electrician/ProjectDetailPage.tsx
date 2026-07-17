import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  MoreVertical,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Circle,
  FileText,
  Camera,
  PoundSterling,
  Shield,
  Zap,
  ClipboardCheck,
  ClipboardList,
  AlertTriangle,
  Pencil,
  HardHat,
  Trash2,
  X,
  LayoutGrid,
  Timer,
  Sparkles,
  Receipt,
  TrendingUp,
  Package,
  Clock,
} from 'lucide-react';
import { Assistant } from '@/components/business-hub/Assistant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import type { SparkTask } from '@/hooks/useSparkTasks';
import { useProjectEntities } from '@/hooks/useProjectEntities';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import type { ProjectPriority } from '@/hooks/useSparkProjects';
import { useExpensesStorage } from '@/hooks/useExpensesStorage';
import { ExpenseAddSheet } from '@/components/electrician/expenses/ExpenseAddSheet';
import { getCategoryConfig } from '@/types/expense';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet';
import { LinkEntitySheet } from '@/components/project-management/LinkEntitySheet';
import ProjectActionsSheet from '@/components/project-management/ProjectActionsSheet';
import { buildAndSaveProjectPack, assembleProjectPackServer } from '@/utils/project-pack/projectPack';
import type { ProjectPackCoverData } from '@/utils/project-pack/projectPackCover';
import { resolveSchemeLogo } from '@/utils/resolveSchemeLogo';
import { computeProjectFinancials, revenueSourceLabel } from '@/utils/projectFinancials';
import { useProjectMaterials } from '@/hooks/useProjectMaterials';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { toast } from '@/hooks/use-toast';
import { ProjectDocumentSheet } from '@/components/project-management/ProjectDocumentSheet';
import { useProjectDocuments } from '@/hooks/useProjectDocuments';
import { ProjectAINotes } from '@/components/project-management/ProjectAINotes';
import { ProjectSafetyPack } from '@/components/electrician/project-detail/ProjectSafetyPack';
import { ProjectSuggestedLinks } from '@/components/project-management/ProjectSuggestedLinks';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { PANEL } from '@/components/electrician/shared/surfaces';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const PRIORITY_COLOURS: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-white/30',
};

const PROJECT_TYPES = [
  { key: 'rewire', label: 'Rewire' },
  { key: 'eicr', label: 'EICR' },
  { key: 'new-build', label: 'New Build' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'ev-charging', label: 'EV Charging' },
  { key: 'fire-alarm', label: 'Fire Alarm' },
  { key: 'consumer-unit', label: 'Consumer Unit' },
  { key: 'lighting', label: 'Lighting' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'other', label: 'Other' },
];

const VISIT_STATUS_COLOURS: Record<string, string> = {
  draft: 'bg-white/10 text-white',
  in_progress: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

interface SimpleCustomer {
  id: string;
  name: string;
}

const TASK_PREVIEW_COUNT = 5;

type LinkType =
  | 'quote'
  | 'invoice'
  | 'certificate'
  | 'rams'
  | 'siteVisit'
  | 'circuitDesign'
  | 'costEstimate'
  | 'floorPlan';

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    project,
    tasks,
    quotes,
    invoices,
    certificates,
    rams,
    siteVisits,
    circuitDesigns,
    costEstimates,
    floorPlans,
    isLoading,
    progress,
    totalTasks,
    doneTasks,
    quoteTotal,
    invoiceTotal,
    paidInvoices,
    linkQuote,
    linkInvoice,
    linkCertificate,
    linkRams,
    linkSiteVisit,
    linkCircuitDesign,
    linkCostEstimate,
    fetchUnlinkedQuotes,
    fetchUnlinkedInvoices,
    fetchUnlinkedCertificates,
    fetchUnlinkedRams,
    fetchUnlinkedSiteVisits,
    fetchUnlinkedCircuitDesigns,
    fetchUnlinkedCostEstimates,
    linkFloorPlan,
    fetchUnlinkedFloorPlans,
    completeProject,
    deleteProject,
    refresh,
  } = useProjectEntities(id);

  const { updateProject } = useSparkProjects('all');

  // Task operations via the shared hook
  const { saveTask, updateTask, markDone, reopenTask, snoozeTask, deleteTask } =
    useSparkTasks('all');

  // Customers for edit form
  const [customers, setCustomers] = useState<SimpleCustomer[]>([]);
  useEffect(() => {
    const loadCustomers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('customers')
        .select('id, name')
        .eq('user_id', user.id)
        .order('name');
      if (data) setCustomers(data);
    };
    loadCustomers();
  }, []);

  // Project photos & documents
  const {
    photos: projectPhotos,
    documents: projectDocuments,
    fetchDocuments,
    deleteDocument,
  } = useProjectDocuments(id || '');

  // Fetch project photos on mount
  useEffect(() => {
    if (id) fetchDocuments();
  }, [id, fetchDocuments]);

  const { companyProfile } = useCompanyProfile();

  // ─── Expenses logged against this project (ELE-1176) ─────────────
  const { expenses, createExpense } = useExpensesStorage();
  const projectExpenses = useMemo(
    () => expenses.filter((e) => e.project_id === id),
    [expenses, id]
  );
  const projectSpend = useMemo(
    () => projectExpenses.reduce((sum, e) => sum + e.amount, 0),
    [projectExpenses]
  );

  // ─── Materials used on this project (from quote/invoice line items, ELE-1014) ──
  const {
    materials: projectMaterials,
    totalCost: materialsTotal,
    source: materialsSource,
  } = useProjectMaterials(id);

  // Split tasks into regular and snagging
  const regularTasks = useMemo(() => tasks.filter((t) => !t.tags.includes('snagging')), [tasks]);
  const snaggingTasks = useMemo(() => tasks.filter((t) => t.tags.includes('snagging')), [tasks]);
  const openSnags = useMemo(
    () => snaggingTasks.filter((t) => t.status === 'open').length,
    [snaggingTasks]
  );

  // Collapsible section state — tasks expanded by default
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['tasks']));
  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Task truncation
  const [showAllTasks, setShowAllTasks] = useState(false);

  // ─── Time logged on this project ─────────────────────────────────
  const [timeSummary, setTimeSummary] = useState<{
    totalSec: number;
    unbilledSec: number;
    unbilledValue: number;
  }>({ totalSec: 0, unbilledSec: 0, unbilledValue: 0 });
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('time_sessions')
        .select('duration_seconds, hourly_rate, invoice_id')
        .eq('user_id', user.id)
        .eq('project_id', id);
      if (cancelled || !data) return;
      let totalSec = 0;
      let unbilledSec = 0;
      let unbilledValue = 0;
      for (const s of data) {
        const sec = (s.duration_seconds as number | null) ?? 0;
        const rate = Number(s.hourly_rate ?? 0);
        totalSec += sec;
        if (!s.invoice_id) {
          unbilledSec += sec;
          unbilledValue += (sec / 3600) * rate;
        }
      }
      setTimeSummary({
        totalSec,
        unbilledSec,
        unbilledValue: Math.round(unbilledValue * 100) / 100,
      });
    })();
    return () => {
      cancelled = true;
    };
    // Re-fetch when tasks/invoices change in case an invoice was just attached
  }, [id, tasks.length, invoices.length]);

  // ─── Project economics — one source of truth (revenue / cost / profit) ───
  const financials = useMemo(
    () =>
      computeProjectFinancials({
        invoiceTotal,
        quoteTotal,
        estimatedValue: project?.estimated_value,
        expenses: projectSpend,
        totalSeconds: timeSummary.totalSec,
      }),
    [invoiceTotal, quoteTotal, project?.estimated_value, projectSpend, timeSummary.totalSec]
  );

  // ─── AI assistant — context-aware prompts ────────────────────────
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string | undefined>(undefined);

  const askMateAboutProject = useCallback(() => {
    if (!project) return;
    const parts = [`I'm working on the "${project.title}" project`];
    if (project.customer_name) parts.push(`for ${project.customer_name}`);
    if (project.location) parts.push(`at ${project.location}`);
    parts.push(
      `— what's outstanding? Pull tasks, overdue items, any draft quotes/invoices, and tell me what to do next.`
    );
    setAiPrompt(parts.join(' '));
    setAiOpen(true);
  }, [project]);

  const askMateToInvoiceUnbilled = useCallback(() => {
    if (!project) return;
    const customer = project.customer_name ? ` to ${project.customer_name}` : '';
    setAiPrompt(
      `Draft an invoice${customer} for the unbilled time on "${project.title}" — find every time session tagged to this project that hasn't been billed and bundle them into one invoice. Show me the line items before sending.`
    );
    setAiOpen(true);
  }, [project]);

  // Start the timer pre-tagged to this project (cross-page hand-off via sessionStorage)
  const handleStartTimerForProject = useCallback(() => {
    if (!project) return;
    try {
      sessionStorage.setItem(
        'time-tracker-prefill',
        JSON.stringify({ projectId: project.id, label: project.title })
      );
    } catch {
      /* ignore */
    }
    navigate('/electrician/time-tracker');
  }, [project, navigate]);

  // Helpers used in the new hero
  const formatHoursMinutes = (seconds: number): string => {
    if (!seconds) return '0h 0m';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h === 0) return `${m}m`;
    return `${h}h ${String(m).padStart(2, '0')}m`;
  };

  const formatGBP = (n: number): string =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n || 0);
  // Precise GBP (with pence) for expense figures
  const formatGBPexact = (n: number): string =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n || 0);

  // ─── Export the project handover pack (cover + expenses + merged docs) ───
  const handleExportPack = async () => {
    if (!project) return;
    toast({
      title: 'Building project pack…',
      description: 'Gathering the cover, expenses and documents.',
    });
    const fileName = `Project Pack - ${project.title}.pdf`;
    const brandHex = companyProfile?.accent_color;

    let cover: ProjectPackCoverData;
    try {
      const schemeLogoDataUrl = await resolveSchemeLogo(
        companyProfile?.scheme_logo_data_url,
        companyProfile?.registration_scheme
      );
      cover = {
        project: {
          title: project.title,
          type: project.project_type,
          status: project.status,
          customerName: project.customer_name,
          location: project.location,
          startDate: project.start_date,
        },
        company: {
          company_name: companyProfile?.company_name,
          logo_url: companyProfile?.logo_url,
          company_phone: companyProfile?.company_phone,
          company_email: companyProfile?.company_email,
          company_website: companyProfile?.company_website,
          registration_scheme: companyProfile?.registration_scheme,
          registration_number: companyProfile?.registration_number,
          accent_color: companyProfile?.accent_color,
        },
        schemeLogoDataUrl,
        summary: {
          value: project.estimated_value || quoteTotal,
          spend: projectSpend,
          timeLabel: formatHoursMinutes(timeSummary.totalSec),
          tasksLabel: totalTasks > 0 ? `${doneTasks}/${totalTasks}` : '—',
        },
        contents: [
          { label: 'Quotes', count: quotes.length },
          { label: 'Invoices', count: invoices.length },
          { label: 'Certificates', count: certificates.length },
          { label: 'RAMS', count: rams.length },
          { label: 'Site visits', count: siteVisits.length },
          { label: 'Expenses', count: projectExpenses.length },
        ],
      };
    } catch (err) {
      console.error('[project-pack] cover build failed', err);
      toast({ title: 'Export failed', description: 'Could not build the pack.', variant: 'destructive' });
      return;
    }

    const packArgs = {
      cover,
      expenses: projectExpenses,
      expenseTotal: projectSpend,
      brandHex,
    };

    try {
      const result = await assembleProjectPackServer({ projectId: project.id, fileName, ...packArgs });
      toast({
        title: 'Project pack ready',
        description:
          result.included.length > 0
            ? `Merged ${result.included.length} document${result.included.length === 1 ? '' : 's'} after the cover.`
            : 'Cover + expenses summary.',
      });
    } catch (err) {
      console.error('[project-pack] server merge failed, falling back to cover-only', err);
      try {
        await buildAndSaveProjectPack({ ...packArgs, fileName });
        toast({
          title: 'Pack saved (cover only)',
          description: 'Couldn’t merge the documents — saved the cover & expenses.',
        });
      } catch (err2) {
        console.error('[project-pack] fallback save failed', err2);
        toast({
          title: 'Export failed',
          description: 'Could not build the project pack. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const visibleTasks = showAllTasks ? regularTasks : regularTasks.slice(0, TASK_PREVIEW_COUNT);

  // Sheet states
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<SparkTask | null>(null);
  const [detailTask, setDetailTask] = useState<SparkTask | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [linkType, setLinkType] = useState<LinkType | null>(null);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [photoSheetOpen, setPhotoSheetOpen] = useState(false);
  const [docSheetOpen, setDocSheetOpen] = useState(false);
  const [expenseSheetOpen, setExpenseSheetOpen] = useState(false);
  const [confirmDeleteDoc, setConfirmDeleteDoc] = useState<string | null>(null);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);
  const [actionsSheetOpen, setActionsSheetOpen] = useState(false);

  // Card → detail handoff: open the matching sheet from a `?action=` param,
  // then clear it so a refresh / back doesn't re-trigger.
  useEffect(() => {
    const action = searchParams.get('action');
    if (!action) return;
    if (action === 'expense') {
      setExpenseSheetOpen(true);
    } else if (action === 'task') {
      setEditingTask(null);
      setTaskFormOpen(true);
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('action');
        return next;
      },
      { replace: true }
    );
  }, [searchParams, setSearchParams]);

  // Edit project form state
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editType, setEditType] = useState('');
  const [editPriority, setEditPriority] = useState<ProjectPriority>('normal');
  const [editLocation, setEditLocation] = useState('');
  const [editCustomerId, setEditCustomerId] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editEstimatedValue, setEditEstimatedValue] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  const openEditSheet = useCallback(() => {
    if (!project) return;
    setEditTitle(project.title);
    setEditDescription(project.description || '');
    setEditType(project.project_type || '');
    setEditPriority((project.priority as ProjectPriority) || 'normal');
    setEditLocation(project.location || '');
    // Find customer ID from name
    const cust = customers.find((c) => c.name === project.customer_name);
    setEditCustomerId(cust?.id || '');
    setEditStartDate(project.start_date || '');
    setEditDueDate(project.due_date || '');
    setEditEstimatedValue(project.estimated_value ? String(project.estimated_value) : '');
    setEditProjectOpen(true);
  }, [project, customers]);

  const handleEditSave = useCallback(async () => {
    if (!project || !editTitle.trim()) return;
    setEditSaving(true);
    try {
      await updateProject(project.id, {
        title: editTitle,
        description: editDescription || undefined,
        projectType: editType || undefined,
        priority: editPriority,
        location: editLocation || undefined,
        customerId: editCustomerId || undefined,
        startDate: editStartDate || undefined,
        dueDate: editDueDate || undefined,
        estimatedValue: editEstimatedValue ? parseFloat(editEstimatedValue) : undefined,
      });
      setEditProjectOpen(false);
      await refresh();
    } finally {
      setEditSaving(false);
    }
  }, [
    project,
    editTitle,
    editDescription,
    editType,
    editPriority,
    editLocation,
    editCustomerId,
    editStartDate,
    editDueDate,
    editEstimatedValue,
    updateProject,
    refresh,
  ]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatShortDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  // ─── "Needs attention" flags — derived from already-loaded data ──────
  const isCompleted = project?.status === 'completed';
  const hasAcceptedQuote = quotes.some(
    (q) => q.status === 'approved' || q.acceptance_status === 'accepted'
  );
  const awaitingQuote =
    !hasAcceptedQuote && quotes.some((q) => q.status === 'sent' || q.status === 'pending');
  const unpaidInvoice = invoices.some((i) => i.payment_status !== 'paid');
  const hasUnbilledTime = timeSummary.unbilledValue > 0 && !isCompleted;
  const noCertificate = certificates.length === 0;

  type AttentionFlag = {
    key: string;
    label: string;
    sub: string;
    icon: typeof PoundSterling;
    tint: string;
    onClick: () => void;
  };
  const attentionFlags: AttentionFlag[] = [];
  if (hasUnbilledTime) {
    attentionFlags.push({
      key: 'unbilled',
      label: `${formatGBP(timeSummary.unbilledValue)} unbilled`,
      sub: `${formatHoursMinutes(timeSummary.unbilledSec)} — draft an invoice`,
      icon: PoundSterling,
      tint: 'text-elec-yellow',
      onClick: askMateToInvoiceUnbilled,
    });
  }
  if (awaitingQuote) {
    attentionFlags.push({
      key: 'quote',
      label: 'Quote awaiting response',
      sub: 'Chase the customer or ask Mate',
      icon: FileText,
      tint: 'text-blue-400',
      onClick: () => {
        if (!openSections.has('quotes')) toggleSection('quotes');
      },
    });
  }
  if (unpaidInvoice) {
    attentionFlags.push({
      key: 'invoice',
      label: 'Invoice unpaid',
      sub: 'Awaiting payment',
      icon: Receipt,
      tint: 'text-orange-300',
      onClick: () => {
        if (!openSections.has('invoices')) toggleSection('invoices');
      },
    });
  }
  if (noCertificate) {
    attentionFlags.push({
      key: 'certificate',
      label: 'No certificate issued yet',
      sub: 'Link or create the paperwork',
      icon: Shield,
      tint: 'text-amber-400',
      onClick: () => setLinkType('certificate'),
    });
  }

  // ─── Timeline — chronological activity assembled client-side ─────────
  type TimelineEntry = {
    key: string;
    label: string;
    detail?: string;
    date?: string;
    tint: string;
  };
  const timelineEntries: TimelineEntry[] = [];
  if (project) {
    timelineEntries.push({
      key: 'project-created',
      label: 'Project created',
      date: project.created_at,
      tint: 'bg-elec-yellow',
    });
    if (isCompleted) {
      timelineEntries.push({
        key: 'project-completed',
        label: 'Project completed',
        tint: 'bg-emerald-400',
      });
    }
  }
  quotes.forEach((q) =>
    timelineEntries.push({
      key: `quote-${q.id}`,
      label: 'Quote raised',
      detail: q.total ? formatGBP(q.total) : undefined,
      date: q.created_at,
      tint: 'bg-emerald-400',
    })
  );
  invoices.forEach((inv) =>
    timelineEntries.push({
      key: `invoice-${inv.id}`,
      label: 'Invoice raised',
      detail: inv.total ? formatGBP(inv.total) : undefined,
      date: inv.created_at,
      tint: 'bg-blue-400',
    })
  );
  certificates.forEach((cert) =>
    timelineEntries.push({
      key: `cert-${cert.id}`,
      label: 'Certificate',
      detail: cert.report_type?.toUpperCase().replace(/-/g, ' '),
      date: cert.created_at,
      tint: 'bg-amber-400',
    })
  );
  siteVisits.forEach((v) =>
    timelineEntries.push({
      key: `visit-${v.id}`,
      label: 'Site visit',
      detail: v.property_address || undefined,
      date: v.created_at,
      tint: 'bg-sky-400',
    })
  );
  rams.forEach((r) =>
    timelineEntries.push({
      key: `rams-${r.id}`,
      label: 'RAMS',
      detail: r.job_description || undefined,
      date: r.created_at,
      tint: 'bg-purple-400',
    })
  );
  projectExpenses.forEach((exp) =>
    timelineEntries.push({
      key: `expense-${exp.id}`,
      label: 'Expense',
      detail: formatGBPexact(exp.amount),
      date: exp.date,
      tint: 'bg-rose-400',
    })
  );
  tasks
    .filter((t) => t.status === 'done')
    .forEach((t) =>
      timelineEntries.push({
        key: `task-${t.id}`,
        label: 'Task completed',
        detail: t.title,
        date: t.completedAt,
        tint: 'bg-white/50',
      })
    );
  // Newest first — undated entries (e.g. project completed) float to the top.
  timelineEntries.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : Infinity;
    const tb = b.date ? new Date(b.date).getTime() : Infinity;
    return tb - ta;
  });
  const TIMELINE_CAP = 20;
  const visibleTimeline = timelineEntries.slice(0, TIMELINE_CAP);
  const timelineOverflow = timelineEntries.length - visibleTimeline.length;

  // Task toggle handler
  const handleToggleTask = useCallback(
    async (task: SparkTask) => {
      if (task.status === 'done') {
        await reopenTask(task.id);
      } else {
        await markDone(task.id);
      }
      refresh();
    },
    [markDone, reopenTask, refresh]
  );

  // Task detail actions
  const handleTaskEdit = useCallback((task: SparkTask) => {
    setEditingTask(task);
    setTaskFormOpen(true);
  }, []);

  // Build site visit URL with project context
  const siteVisitNewUrl = useMemo(() => {
    if (!project) return '/electrician/site-visit/new';
    const params = new URLSearchParams();
    params.set('projectId', project.id);
    if (project.customer_name) params.set('clientName', project.customer_name);
    if (project.location) params.set('address', project.location);
    return `/electrician/site-visit/new?${params.toString()}`;
  }, [project]);

  // Link sheet config
  const linkConfig: Record<
    LinkType,
    {
      title: string;
      fetch: () => Promise<{ id: string; label: string; sublabel?: string }[]>;
      link: (id: string) => Promise<boolean>;
      createLabel: string;
      createUrl: string;
    }
  > = {
    quote: {
      title: 'Link Quote',
      fetch: fetchUnlinkedQuotes,
      link: linkQuote,
      createLabel: 'Create new quote',
      createUrl: `/electrician/quote-builder/create?projectId=${project?.id}`,
    },
    invoice: {
      title: 'Link Invoice',
      fetch: fetchUnlinkedInvoices,
      link: linkInvoice,
      createLabel: 'Create new invoice',
      createUrl: `/electrician/invoice-builder/create?projectId=${project?.id}`,
    },
    certificate: {
      title: 'Link Certificate',
      fetch: fetchUnlinkedCertificates,
      link: linkCertificate,
      createLabel: 'Create new certificate',
      createUrl: `/electrician/certificates/new?projectId=${project?.id}&clientName=${encodeURIComponent(project?.customer_name || '')}&address=${encodeURIComponent(project?.location || '')}`,
    },
    rams: {
      title: 'Link RAMS',
      fetch: fetchUnlinkedRams,
      link: linkRams,
      createLabel: 'Create new RAMS',
      createUrl: `/electrician-tools/site-safety?projectId=${project?.id}&location=${encodeURIComponent(project?.location || '')}&clientName=${encodeURIComponent(project?.customer_name || '')}`,
    },
    siteVisit: {
      title: 'Link Site Visit',
      fetch: fetchUnlinkedSiteVisits,
      link: linkSiteVisit,
      createLabel: 'Start new site visit',
      createUrl: siteVisitNewUrl,
    },
    circuitDesign: {
      title: 'Link Circuit Design',
      fetch: fetchUnlinkedCircuitDesigns,
      link: linkCircuitDesign,
      createLabel: 'New circuit design',
      createUrl: `/electrician/circuit-designer?projectId=${project?.id ?? ''}`,
    },
    costEstimate: {
      title: 'Link Cost Estimate',
      fetch: fetchUnlinkedCostEstimates,
      link: linkCostEstimate,
      createLabel: 'New cost estimate',
      createUrl: `/electrician/cost-engineer?projectId=${project?.id ?? ''}`,
    },
    floorPlan: {
      title: 'Link Floor Plan',
      fetch: fetchUnlinkedFloorPlans,
      link: linkFloorPlan,
      createLabel: 'Create new floor plan',
      createUrl: `/electrician/business/room-planner?projectId=${project?.id ?? ''}`,
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
        <p>Project not found</p>
        <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4 text-white">
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Slim Sticky Header — back + kebab only */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician/projects')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-elec-gray border-white/10">
                <DropdownMenuItem
                  onClick={openEditSheet}
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  <Pencil className="h-4 w-4 mr-2 text-elec-yellow" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(siteVisitNewUrl)}
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  <HardHat className="h-4 w-4 mr-2 text-sky-400" />
                  Start Site Visit
                </DropdownMenuItem>
                {project.status !== 'completed' && (
                  <DropdownMenuItem
                    onClick={completeProject}
                    className="text-white focus:bg-white/10 focus:text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" />
                    Mark Complete
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => setConfirmDeleteProject(true)}
                  className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete project confirmation */}
            <AlertDialog open={confirmDeleteProject} onOpenChange={setConfirmDeleteProject}>
              <AlertDialogContent className="bg-elec-gray border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Delete Project?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white">
                    This will permanently delete "{project.title}". Tasks, time entries and linked records will be removed. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={async () => {
                      const ok = await deleteProject();
                      if (ok) navigate('/electrician/projects');
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Single Scroll Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-3 space-y-3"
      >
        {/* ── Smart hero — title · subtitle · 3 metrics · action row ── */}
        <motion.div
          variants={itemVariants}
          className={cn(PANEL, 'relative overflow-hidden')}
        >
          <div
            className={cn(
              'absolute inset-x-0 top-0 h-20 bg-gradient-to-b to-transparent pointer-events-none',
              project.status === 'completed'
                ? 'from-emerald-500/[0.08]'
                : project.priority === 'urgent'
                  ? 'from-red-500/[0.08]'
                  : project.priority === 'high'
                    ? 'from-orange-500/[0.07]'
                    : 'from-elec-yellow/[0.05]'
            )}
          />
          {/* Header — priority dot · title · status · edit */}
          <div className="relative p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'w-2 h-2 rounded-full shrink-0 mt-2',
                  PRIORITY_COLOURS[project.priority]
                )}
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-[20px] sm:text-[24px] font-bold text-white leading-tight tracking-tight">
                  {project.title}
                </h1>
                {(project.customer_name || project.location) && (
                  <p className="mt-1 text-[13px] text-white/55 truncate flex items-center gap-1.5">
                    {project.customer_name && (
                      <>
                        <Users className="h-3 w-3 text-white/35" />
                        <span>{project.customer_name}</span>
                      </>
                    )}
                    {project.customer_name && project.location && (
                      <span className="text-white/25">·</span>
                    )}
                    {project.location && (
                      <>
                        <MapPin className="h-3 w-3 text-white/35" />
                        <span>{project.location}</span>
                      </>
                    )}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={cn(
                    'text-[10.5px] font-medium px-2 py-0.5 rounded-full',
                    project.status === 'completed'
                      ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20'
                      : 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20'
                  )}
                >
                  {project.status}
                </span>
                <button
                  type="button"
                  onClick={openEditSheet}
                  aria-label="Edit project"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/55 hover:text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {project.description && (
              <p className="mt-2.5 text-[13px] text-white/55 leading-snug">
                {project.description}
              </p>
            )}

            {(project.project_type || project.due_date) && (
              <div className="mt-2.5 ml-5 flex items-center gap-3 text-[11.5px] text-white/40">
                {project.project_type && <span className="capitalize">{project.project_type}</span>}
                {project.due_date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Due {formatShortDate(project.due_date)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Metrics — 4 tiles (2×2 mobile, 4-up desktop), hairline dividers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/[0.08]">
            <div className="px-3 py-3 sm:px-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Tasks
              </p>
              <p className="mt-1 text-[18px] sm:text-[20px] font-bold text-white tabular-nums leading-none tracking-tight">
                {totalTasks > 0 ? `${progress}%` : '—'}
              </p>
              <p className="mt-1 text-[11.5px] text-white/45 tabular-nums">
                {totalTasks > 0 ? `${doneTasks}/${totalTasks} done` : 'No tasks yet'}
              </p>
            </div>
            <div className="px-3 py-3 sm:px-4 border-l border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Time logged
              </p>
              <p className="mt-1 text-[18px] sm:text-[20px] font-bold text-white tabular-nums leading-none tracking-tight">
                {formatHoursMinutes(timeSummary.totalSec)}
              </p>
              <p className="mt-1 text-[11.5px] text-white/45 tabular-nums">
                across all sessions
              </p>
            </div>
            <div className="px-3 py-3 sm:px-4 border-t sm:border-t-0 sm:border-l border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                {project.estimated_value && project.estimated_value > 0 ? 'Value' : 'Unbilled'}
              </p>
              <p
                className={cn(
                  'mt-1 text-[17px] sm:text-[18px] font-bold tabular-nums leading-none',
                  project.estimated_value && project.estimated_value > 0
                    ? 'text-emerald-400'
                    : timeSummary.unbilledValue > 0
                      ? 'text-elec-yellow'
                      : 'text-white/40'
                )}
              >
                {project.estimated_value && project.estimated_value > 0
                  ? formatGBP(project.estimated_value)
                  : formatGBP(timeSummary.unbilledValue)}
              </p>
              <p className="mt-1 text-[11.5px] text-white/45 tabular-nums">
                {project.estimated_value && project.estimated_value > 0
                  ? 'estimated'
                  : timeSummary.unbilledSec > 0
                    ? `${formatHoursMinutes(timeSummary.unbilledSec)} to bill`
                    : 'nothing to bill'}
              </p>
            </div>
            <div className="px-3 py-3 sm:px-4 border-t sm:border-t-0 border-l border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Spend
              </p>
              <p
                className={cn(
                  'mt-1 text-[17px] sm:text-[18px] font-bold tabular-nums leading-none',
                  projectSpend > 0 ? 'text-orange-300' : 'text-white/40'
                )}
              >
                {formatGBPexact(projectSpend)}
              </p>
              <p className="mt-1 text-[11.5px] text-white/45 tabular-nums">
                {projectExpenses.length > 0
                  ? `${projectExpenses.length} expense${projectExpenses.length === 1 ? '' : 's'}`
                  : 'no costs yet'}
              </p>
            </div>
          </div>

          {/* Action row — Start timer · Actions · Ask Mate */}
          <div className="border-t border-white/[0.08] flex items-stretch">
            <button
              type="button"
              onClick={handleStartTimerForProject}
              disabled={project.status === 'completed'}
              className="flex-1 h-11 flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] touch-manipulation transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Timer className="h-3.5 w-3.5" />
              Start timer
            </button>
            <div className="w-px bg-white/[0.06]" />
            <button
              type="button"
              onClick={() => setActionsSheetOpen(true)}
              className="flex-1 h-11 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold text-white hover:bg-white/[0.06] active:bg-white/[0.08] touch-manipulation transition-colors"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-elec-yellow" />
              Actions
            </button>
            <div className="w-px bg-white/[0.06]" />
            <button
              type="button"
              onClick={askMateAboutProject}
              className="flex-1 h-11 flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-elec-yellow hover:text-yellow-300 hover:bg-elec-yellow/[0.06] active:bg-elec-yellow/[0.10] touch-manipulation transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ask Mate
            </button>
          </div>
        </motion.div>

        {/* ── Mate auto-link suggestions — unlinked items matching this job ── */}
        <motion.div variants={itemVariants}>
          <ProjectSuggestedLinks
            projectId={project.id}
            customerName={project.customer_name}
            location={project.location}
            linkQuote={async (lid) => { await linkQuote(lid); refresh(); }}
            linkInvoice={async (lid) => { await linkInvoice(lid); refresh(); }}
            linkCertificate={async (lid) => { await linkCertificate(lid); refresh(); }}
            linkSiteVisit={async (lid) => { await linkSiteVisit(lid); refresh(); }}
          />
        </motion.div>

        {/* ── Profitability — revenue · materials · gross profit · earned/hr ── */}
        {(financials.revenueSource !== 'none' ||
          financials.materials > 0 ||
          financials.hours > 0) && (
          <motion.div variants={itemVariants} className={cn(PANEL, 'overflow-hidden')}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white leading-tight">Profitability</p>
                  <p className="text-[11px] text-white/55 leading-tight">Revenue less materials</p>
                </div>
              </div>
              <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-white/65">
                {revenueSourceLabel(financials.revenueSource)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <div className="px-3 py-3 sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Revenue
                </p>
                <p className="mt-1 text-[17px] sm:text-[18px] font-bold text-white tabular-nums leading-none">
                  {formatGBP(financials.revenue)}
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 border-l border-white/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Materials
                </p>
                <p className="mt-1 text-[17px] sm:text-[18px] font-bold text-orange-300 tabular-nums leading-none">
                  {formatGBPexact(financials.materials)}
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 border-t sm:border-t-0 sm:border-l border-white/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Gross profit
                </p>
                <p
                  className={cn(
                    'mt-1 text-[17px] sm:text-[18px] font-bold tabular-nums leading-none',
                    financials.grossProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                  )}
                >
                  {formatGBP(financials.grossProfit)}
                </p>
                <p className="mt-1 text-[11.5px] text-white/45 tabular-nums">
                  {financials.marginPct != null ? `${financials.marginPct.toFixed(0)}% margin` : '—'}
                </p>
              </div>
              <div className="px-3 py-3 sm:px-4 border-t sm:border-t-0 border-l border-white/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Earned / hr
                </p>
                <p className="mt-1 text-[17px] sm:text-[18px] font-bold text-elec-yellow tabular-nums leading-none">
                  {financials.effectiveHourly != null
                    ? formatGBPexact(financials.effectiveHourly)
                    : '—'}
                </p>
                <p className="mt-1 text-[11.5px] text-white/45 tabular-nums">
                  {financials.hours > 0
                    ? `over ${formatHoursMinutes(financials.hours * 3600)}`
                    : 'no time logged'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Materials used — line items from quotes & invoices (stock link, ELE-1014) ── */}
        {projectMaterials.length > 0 && (
          <motion.div variants={itemVariants} className={cn(PANEL, 'overflow-hidden')}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  <Package className="h-4 w-4 text-cyan-400" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white leading-tight">Materials used</p>
                  <p className="text-[11px] text-white/55 leading-tight">
                    From {materialsSource === 'invoices' ? 'invoices' : 'quotes'} ·{' '}
                    {formatGBPexact(materialsTotal)}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                {projectMaterials.length}
              </span>
            </div>
            <div className="px-3.5 sm:px-4 py-2 divide-y divide-white/[0.05]">
              {projectMaterials.slice(0, 8).map((m) => (
                <div key={m.key} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0 flex items-center gap-2">
                    {m.fromInventory && (
                      <span
                        title="From your stock"
                        className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"
                      />
                    )}
                    <span className="text-[13px] text-white/90 truncate">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 tabular-nums">
                    <span className="text-[12px] text-white/45">
                      ×{m.quantity}
                      {m.unit ? ` ${m.unit}` : ''}
                    </span>
                    <span className="text-[13px] font-semibold text-white">
                      {formatGBPexact(m.totalCost)}
                    </span>
                  </div>
                </div>
              ))}
              {projectMaterials.length > 8 && (
                <p className="text-[11px] text-white/45 pt-2">+{projectMaterials.length - 8} more</p>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Needs attention — derived flags, only when something applies ── */}
        {attentionFlags.length > 0 && (
          <motion.div variants={itemVariants} className={cn(PANEL, 'overflow-hidden')}>
            <div className="flex items-center gap-3 px-4 py-3 sm:px-5 border-b border-white/[0.06]">
              <span className="h-9 w-9 rounded-xl bg-elec-yellow/[0.10] border border-elec-yellow/20 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-white leading-tight">Needs attention</p>
                <p className="text-[11px] text-white/55 leading-tight">
                  {attentionFlags.length} thing{attentionFlags.length === 1 ? '' : 's'} to action
                </p>
              </div>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {attentionFlags.map((flag) => (
                <button
                  key={flag.key}
                  type="button"
                  onClick={flag.onClick}
                  className="w-full flex items-center gap-3 px-3.5 sm:px-4 py-3 min-h-[56px] text-left touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors"
                >
                  <flag.icon className={cn('h-4 w-4 shrink-0', flag.tint)} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] font-medium text-white leading-tight truncate">
                      {flag.label}
                    </span>
                    <span className="block text-[11.5px] text-white/55 leading-tight truncate mt-0.5">
                      {flag.sub}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/45 shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Sections grid — 2-up on md+, cards expand independently ── */}
        <div className="grid md:grid-cols-2 gap-3 items-start">

        {/* ── Site Visits Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('siteVisits')}
            onOpenChange={() => toggleSection('siteVisits')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><HardHat className="h-4 w-4 text-sky-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Site Visits</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{siteVisits.length > 0 ? `${siteVisits.length} visit${siteVisits.length === 1 ? '' : 's'} · last ${formatShortDate(siteVisits[0].created_at)}` : 'Record what you find on site'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {siteVisits.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {siteVisits.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('siteVisit');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('siteVisits') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {siteVisits.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">No site visits linked yet</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLinkType('siteVisit')}
                      className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                    >
                      + Link Existing
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(siteVisitNewUrl)}
                      className="h-11 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform"
                    >
                      Start Visit
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {siteVisits.map((visit) => (
                    <button
                      key={visit.id}
                      type="button"
                      onClick={() => navigate(`/electrician/site-visit/${visit.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                    >
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-white">
                          {visit.property_address || 'Site Visit'}
                        </p>
                        <p className="text-[11px] text-white">
                          {formatShortDate(visit.created_at)}
                          {visit.property_postcode ? ` — ${visit.property_postcode}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={cn(
                            'text-[11px] font-medium px-2 py-0.5 rounded-full',
                            VISIT_STATUS_COLOURS[visit.status] || 'bg-white/10 text-white'
                          )}
                        >
                          {visit.status.replace(/_/g, ' ')}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => navigate(siteVisitNewUrl)}
                    className="w-full h-11 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white text-sm font-medium touch-manipulation active:bg-white/[0.04] transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Start New Visit
                  </button>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Tasks Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')} open={openSections.has('tasks')} onOpenChange={() => toggleSection('tasks')}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><ClipboardCheck className="h-4 w-4 text-amber-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Tasks</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{totalTasks > 0 ? `${doneTasks} of ${totalTasks} done` : 'Plan the work'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {regularTasks.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {regularTasks.length}
                    </span>
                  )}
                  {openSections.has('tasks') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {regularTasks.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <ClipboardList className="h-7 w-7 text-white mb-2" />
                  <p className="text-sm text-white">No tasks yet.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTask(null);
                      setTaskFormOpen(true);
                    }}
                    className="mt-3 h-11 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform"
                  >
                    <Plus className="h-4 w-4 inline mr-1" />
                    Add First Task
                  </button>
                </div>
              ) : (
                <>
                  {visibleTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleTask(task)}
                        className="w-11 h-11 flex items-center justify-center flex-shrink-0 touch-manipulation rounded-lg active:bg-white/10 -m-1.5"
                      >
                        {task.status === 'done' ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Circle className="h-5 w-5 text-white" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDetailTask(task);
                          setDetailSheetOpen(true);
                        }}
                        className="flex-1 min-w-0 text-left touch-manipulation"
                      >
                        <p
                          className={cn(
                            'text-sm font-medium truncate',
                            task.status === 'done' ? 'text-white line-through' : 'text-white'
                          )}
                        >
                          {task.title}
                        </p>
                        {task.dueAt && (
                          <p className="text-[11px] text-white">{formatShortDate(task.dueAt)}</p>
                        )}
                      </button>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full',
                            PRIORITY_COLOURS[task.priority] || 'bg-white/30'
                          )}
                        />
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  ))}
                  {regularTasks.length > TASK_PREVIEW_COUNT && !showAllTasks && (
                    <button
                      onClick={() => setShowAllTasks(true)}
                      className="w-full h-11 flex items-center justify-center text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.04] rounded-xl transition-colors"
                    >
                      Show all {regularTasks.length} tasks
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTask(null);
                      setTaskFormOpen(true);
                    }}
                    className="w-full h-11 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white text-sm font-medium touch-manipulation active:bg-white/[0.04] transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Task
                  </button>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Quotes Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('quotes')}
            onOpenChange={() => toggleSection('quotes')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><FileText className="h-4 w-4 text-emerald-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Quotes</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{quotes.length > 0 ? `${quotes.length} quote${quotes.length === 1 ? '' : 's'} · ${formatGBP(quoteTotal)}` : 'Price the job'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {quotes.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {quotes.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('quote');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('quotes') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {quotes.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing quote or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('quote')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link Quote
                  </button>
                </div>
              ) : (
                <>
                  {quotes.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => navigate(`/electrician/quotes/view/${q.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                    >
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-white">
                          {q.quote_number ? `#${q.quote_number}` : 'Quote'}
                        </p>
                        <p className="text-[11px] capitalize flex items-center gap-1.5">
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              q.status === 'approved' || q.acceptance_status === 'accepted'
                                ? 'bg-emerald-400'
                                : q.status === 'rejected' || q.acceptance_status === 'rejected'
                                  ? 'bg-red-400'
                                  : q.status === 'sent' || q.status === 'pending'
                                    ? 'bg-blue-400'
                                    : 'bg-white/50'
                            )}
                          />
                          <span className="text-white/65">{q.status}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[14px] font-bold text-elec-yellow tabular-nums">
                          £{q.total.toLocaleString()}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  ))}
                  {quoteTotal > 0 && (
                    <p className="text-[12px] text-white/60 text-right pr-1 pt-1">
                      Total <span className="font-semibold text-elec-yellow tabular-nums">£{quoteTotal.toLocaleString()}</span>
                    </p>
                  )}
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Invoices Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('invoices')}
            onOpenChange={() => toggleSection('invoices')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><PoundSterling className="h-4 w-4 text-blue-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Invoices</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{invoices.length > 0 ? `${invoices.length} invoice${invoices.length === 1 ? '' : 's'} · ${formatGBP(invoiceTotal)}${paidInvoices > 0 ? ` · ${paidInvoices} paid` : ''}` : 'Bill the work'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {invoices.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {invoices.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('invoice');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('invoices') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {invoices.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing invoice or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('invoice')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link Invoice
                  </button>
                </div>
              ) : (
                <>
                  {invoices.map((inv) => (
                    <button
                      key={inv.id}
                      type="button"
                      onClick={() => navigate(`/electrician/invoices/${inv.id}/view`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                    >
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-white">
                          {inv.invoice_number ? `#${inv.invoice_number}` : 'Invoice'}
                        </p>
                        <p className="text-[11px] text-white capitalize">{inv.payment_status}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[14px] font-bold text-elec-yellow tabular-nums">
                          £{inv.total.toLocaleString()}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  ))}
                  {invoiceTotal > 0 && (
                    <p className="text-[12px] text-white text-right pr-2">
                      Total <span className="font-semibold text-elec-yellow tabular-nums">£{invoiceTotal.toLocaleString()}</span>{paidInvoices > 0 ? ` · ${paidInvoices} paid` : ''}
                    </p>
                  )}
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Certificates Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('certificates')}
            onOpenChange={() => toggleSection('certificates')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><Shield className="h-4 w-4 text-amber-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Certificates</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{certificates.length > 0 ? `${certificates.length} linked` : 'EICR, EIC, Minor Works'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {certificates.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {certificates.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('certificate');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('certificates') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {certificates.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing certificate or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('certificate')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link Certificate
                  </button>
                </div>
              ) : (
                certificates.map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => {
                      if (!cert.report_type) return;
                      // eicr/eic/minor-works are query-param sections; pat/
                      // testing-only are path routes — both take report_id,
                      // not the row uuid (uuid paths fell to the dashboard).
                      if (['eicr', 'eic', 'minor-works'].includes(cert.report_type)) {
                        navigate(
                          `/electrician/inspection-testing?section=${cert.report_type}&reportId=${encodeURIComponent(cert.report_id)}`
                        );
                      } else if (['pat-testing', 'testing-only'].includes(cert.report_type)) {
                        navigate(
                          `/electrician/inspection-testing/${cert.report_type}/${encodeURIComponent(cert.report_id)}`
                        );
                      } else {
                        navigate('/electrician/inspection-testing?section=my-reports');
                      }
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white">
                        {cert.report_type?.toUpperCase().replace(/-/g, ' ') || 'Certificate'}
                      </p>
                      {cert.client_name && (
                        <p className="text-[11px] text-white">{cert.client_name}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[12px] text-white capitalize">{cert.status}</span>
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── RAMS Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')} open={openSections.has('rams')} onOpenChange={() => toggleSection('rams')}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><Zap className="h-4 w-4 text-purple-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">RAMS</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{rams.length > 0 ? `${rams.length} document${rams.length === 1 ? '' : 's'}` : 'Risk assessments & method statements'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {rams.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {rams.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('rams');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('rams') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {rams.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing RAMS or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('rams')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link RAMS
                  </button>
                </div>
              ) : (
                rams.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => navigate('/electrician/site-safety?tab=documents')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white">{r.job_description}</p>
                      <p className="text-[11px] text-white capitalize">{r.status}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Safety Pack Section — every Site Safety doc linked to this project ── */}
        <motion.div variants={itemVariants}>
          <ProjectSafetyPack projectId={project.id} />
        </motion.div>

        {/* ── Circuit Design Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('circuitDesign')}
            onOpenChange={() => toggleSection('circuitDesign')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><Zap className="h-4 w-4 text-purple-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Circuit Design</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{circuitDesigns.length > 0 ? `${circuitDesigns.length} design${circuitDesigns.length === 1 ? '' : 's'}` : 'AI circuit designer'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {circuitDesigns.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {circuitDesigns.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('circuitDesign');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('circuitDesign') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {circuitDesigns.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing circuit design or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('circuitDesign')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link Circuit Design
                  </button>
                </div>
              ) : (
                circuitDesigns.map((cd) => (
                  <button
                    key={cd.id}
                    type="button"
                    onClick={() => navigate(`/electrician/circuit-designer?projectId=${project?.id ?? ''}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white">
                        {(cd.job_inputs?.project_name as string) ||
                          (cd.job_inputs?.description as string) ||
                          'Circuit Design'}
                      </p>
                      <p className="text-[11px] text-white capitalize">{cd.status}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Cost Estimates Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('costEstimate')}
            onOpenChange={() => toggleSection('costEstimate')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><PoundSterling className="h-4 w-4 text-green-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Cost Estimates</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{costEstimates.length > 0 ? `${costEstimates.length} estimate${costEstimates.length === 1 ? '' : 's'}` : 'AI cost engineer'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {costEstimates.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {costEstimates.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('costEstimate');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('costEstimate') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {costEstimates.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing cost estimate or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('costEstimate')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link Cost Estimate
                  </button>
                </div>
              ) : (
                costEstimates.map((ce) => (
                  <button
                    key={ce.id}
                    type="button"
                    onClick={() => navigate(`/electrician/cost-engineer?projectId=${project?.id ?? ''}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white truncate">
                        {ce.query || 'Cost Estimate'}
                      </p>
                      <p className="text-[11px] text-white capitalize">{ce.status}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Expenses & spend Section (ELE-1176) ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('expenses')}
            onOpenChange={() => toggleSection('expenses')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><Receipt className="h-4 w-4 text-rose-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Expenses &amp; spend</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{projectExpenses.length > 0 ? `${projectExpenses.length} expense${projectExpenses.length === 1 ? '' : 's'} · ${formatGBPexact(projectSpend)}` : 'Track what this job costs you'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {projectExpenses.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {projectExpenses.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpenseSheetOpen(true);
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Add
                  </span>
                  {openSections.has('expenses') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {projectExpenses.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <Receipt className="h-7 w-7 text-white mb-2" />
                  <p className="text-sm text-white mb-3">No expenses logged for this job yet</p>
                  <button
                    type="button"
                    onClick={() => setExpenseSheetOpen(true)}
                    className="h-11 px-4 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform"
                  >
                    <Plus className="h-4 w-4 inline mr-1" />
                    Add Expense
                  </button>
                </div>
              ) : (
                <>
                  {/* Total spent */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/20">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      Total spent
                    </span>
                    <span className="text-[18px] font-bold text-elec-yellow tabular-nums">
                      {formatGBPexact(projectSpend)}
                    </span>
                  </div>

                  {/* Linked expenses */}
                  {projectExpenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                    >
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-white truncate">
                          {getCategoryConfig(exp.category).label}
                          {(exp.vendor || exp.description) && (
                            <span className="text-white/55 font-normal">
                              {' · '}
                              {exp.vendor || exp.description}
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-white/55">{formatDate(exp.date)}</p>
                      </div>
                      <span className="text-[14px] font-bold text-white tabular-nums flex-shrink-0 ml-2">
                        {formatGBPexact(exp.amount)}
                      </span>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setExpenseSheetOpen(true)}
                    className="w-full h-11 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white text-sm font-medium touch-manipulation active:bg-white/[0.04] transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Expense
                  </button>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Floor Plans Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('floorPlan')}
            onOpenChange={() => toggleSection('floorPlan')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><LayoutGrid className="h-4 w-4 text-cyan-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Floor Plans</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{floorPlans.length > 0 ? `${floorPlans.length} plan${floorPlans.length === 1 ? '' : 's'}` : 'Room planner layouts'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {floorPlans.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {floorPlans.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLinkType('floorPlan');
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Link
                  </span>
                  {openSections.has('floorPlan') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {floorPlans.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <p className="text-sm text-white mb-3">
                    Link an existing floor plan or create a new one
                  </p>
                  <button
                    type="button"
                    onClick={() => setLinkType('floorPlan')}
                    className="h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    + Link Floor Plan
                  </button>
                </div>
              ) : (
                floorPlans.map((fp) => (
                  <button
                    key={fp.id}
                    type="button"
                    onClick={() => navigate(`/electrician/business/room-planner?projectId=${project?.id ?? ''}&floorPlanId=${fp.id}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white truncate">
                        {fp.name || 'Floor Plan'}
                      </p>
                      <p className="text-[11px] text-white">
                        {fp.total_items} items — {fp.status}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Snagging Section (only when snags exist) ── */}
        {snaggingTasks.length > 0 && (
          <motion.div variants={itemVariants}>
            <Collapsible className={cn(PANEL, 'overflow-hidden')}
              open={openSections.has('snagging')}
              onOpenChange={() => toggleSection('snagging')}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-orange-500/20 touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><AlertTriangle className="h-4 w-4 text-orange-400" /></span>
                    <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Snagging</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{`${snaggingTasks.filter((t) => t.status === 'open').length} open of ${snaggingTasks.length}`}</span>
                  </span>
                    {openSnags > 0 && (
                      <span className="text-[11px] font-medium bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        {openSnags} open
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {snaggingTasks.length}
                    </span>
                    {openSections.has('snagging') ? (
                      <ChevronUp className="h-4 w-4 text-white/45" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/45" />
                    )}
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
                {snaggingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-orange-500/20"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task)}
                      className="w-11 h-11 flex items-center justify-center flex-shrink-0 touch-manipulation rounded-lg active:bg-white/10 -m-1.5"
                    >
                      {task.status === 'done' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDetailTask(task);
                        setDetailSheetOpen(true);
                      }}
                      className="flex-1 min-w-0 text-left touch-manipulation"
                    >
                      <p
                        className={cn(
                          'text-sm font-medium truncate',
                          task.status === 'done' ? 'text-white line-through' : 'text-white'
                        )}
                      >
                        {task.title}
                      </p>
                      {task.location && <p className="text-[11px] text-white">{task.location}</p>}
                    </button>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          PRIORITY_COLOURS[task.priority] || 'bg-white/30'
                        )}
                      />
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => navigate('/electrician/snagging')}
                  className="w-full h-11 flex items-center justify-center text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.04] rounded-xl transition-colors"
                >
                  View all snagging
                </button>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        )}

        {/* ── Photos Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('photos')}
            onOpenChange={() => toggleSection('photos')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><Camera className="h-4 w-4 text-sky-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Photos</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{projectPhotos.length > 0 ? `${projectPhotos.length} photo${projectPhotos.length === 1 ? '' : 's'}` : 'Before, during & after shots'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {projectPhotos.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {projectPhotos.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoSheetOpen(true);
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Add
                  </span>
                  {openSections.has('photos') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {projectPhotos.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <Camera className="h-7 w-7 text-white mb-2" />
                  <p className="text-sm text-white mb-3">No photos yet</p>
                  <button
                    type="button"
                    onClick={() => setPhotoSheetOpen(true)}
                    className="h-11 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform"
                  >
                    Add Photo
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-1.5">
                    {projectPhotos.slice(0, 6).map((photo) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square rounded-xl overflow-hidden bg-white/[0.04]"
                      >
                        {photo.signedUrl && (
                          <img
                            src={photo.signedUrl}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('/electrician/photo-docs')}
                      className="flex-1 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white touch-manipulation active:bg-white/[0.08] transition-colors"
                    >
                      View all in Photo Docs
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoSheetOpen(true)}
                      className="h-11 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform"
                    >
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add
                    </button>
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Elec-AI notes section — saved answers from Elec-AI per project ── */}
        <motion.div variants={itemVariants}>
          <ProjectAINotes
            projectId={id || ''}
            isOpen={openSections.has('aiNotes')}
            onToggle={() => toggleSection('aiNotes')}
          />
        </motion.div>

        {/* ── Documents Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('documents')}
            onOpenChange={() => toggleSection('documents')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><FileText className="h-4 w-4 text-amber-400" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Documents</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{projectDocuments.length > 0 ? `${projectDocuments.length} file${projectDocuments.length === 1 ? '' : 's'}` : 'Drawings, specs & paperwork'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {projectDocuments.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {projectDocuments.length}
                    </span>
                  )}
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDocSheetOpen(true);
                    }}
                    className="text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/[0.08] transition-colors"
                  >
                    + Add
                  </span>
                  {openSections.has('documents') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 space-y-2 border-t border-white/[0.06]">
              {projectDocuments.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <FileText className="h-7 w-7 text-white mb-2" />
                  <p className="text-sm text-white mb-1">No documents yet</p>
                  <p className="text-xs text-white mb-3">
                    Upload works orders, drawings, specs or any project files
                  </p>
                  <button
                    type="button"
                    onClick={() => setDocSheetOpen(true)}
                    className="h-11 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform"
                  >
                    Upload Document
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    {projectDocuments.slice(0, 5).map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                      >
                        <button
                          type="button"
                          onClick={() => doc.signedUrl && window.open(doc.signedUrl, '_blank')}
                          className="flex items-center gap-3 min-w-0 flex-1 touch-manipulation text-left"
                        >
                          <FileText className="h-5 w-5 text-amber-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-white font-medium truncate">{doc.name}</p>
                            {doc.file_size != null && (
                              <p className="text-[11px] text-white">
                                {doc.file_size < 1024
                                  ? `${doc.file_size} B`
                                  : doc.file_size < 1024 * 1024
                                    ? `${(doc.file_size / 1024).toFixed(0)} KB`
                                    : `${(doc.file_size / (1024 * 1024)).toFixed(1)} MB`}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteDoc(doc.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/10 touch-manipulation flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {projectDocuments.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setDocSheetOpen(true)}
                      className="w-full h-11 flex items-center justify-center text-sm font-medium text-elec-yellow touch-manipulation active:bg-white/[0.04] rounded-xl transition-colors"
                    >
                      View all {projectDocuments.length} documents
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setDocSheetOpen(true)}
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-sm font-bold touch-manipulation active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Upload Document
                  </button>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Timeline Section — chronological activity, collapsed by default ── */}
        <motion.div variants={itemVariants}>
          <Collapsible className={cn(PANEL, 'overflow-hidden')}
            open={openSections.has('timeline')}
            onOpenChange={() => toggleSection('timeline')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0"><Clock className="h-4 w-4 text-elec-yellow" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-white leading-tight">Timeline</span>
                    <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">{timelineEntries.length > 0 ? `${timelineEntries.length} event${timelineEntries.length === 1 ? '' : 's'} on this job` : 'Activity as it happens'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {timelineEntries.length > 0 && (
                    <span className="text-[11px] font-semibold text-white/55 tabular-nums">
                      {timelineEntries.length}
                    </span>
                  )}
                  {openSections.has('timeline') ? (
                    <ChevronUp className="h-4 w-4 text-white/45" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3.5 sm:px-4 pb-3.5 pt-2.5 border-t border-white/[0.06]">
              {timelineEntries.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <Clock className="h-7 w-7 text-white/40 mb-2" />
                  <p className="text-sm text-white">Nothing has happened on this job yet.</p>
                </div>
              ) : (
                <ol className="space-y-0">
                  {visibleTimeline.map((e, i) => (
                    <li key={e.key} className="flex gap-3">
                      {/* Dot + connecting line */}
                      <div className="flex flex-col items-center pt-1.5">
                        <span className={cn('h-2 w-2 rounded-full shrink-0', e.tint)} />
                        {i < visibleTimeline.length - 1 && (
                          <span className="w-px flex-1 bg-white/[0.10] mt-1" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 pb-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-[13px] font-medium text-white leading-tight truncate">
                            {e.label}
                          </p>
                          <span className="text-[11px] text-white/45 tabular-nums shrink-0">
                            {formatShortDate(e.date) || '—'}
                          </span>
                        </div>
                        {e.detail && (
                          <p className="text-[11.5px] text-white/55 leading-snug truncate mt-0.5">
                            {e.detail}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                  {timelineOverflow > 0 && (
                    <li className="text-[11.5px] text-white/45 pl-5 pt-1">
                      +{timelineOverflow} earlier
                    </li>
                  )}
                </ol>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        </div>
      </motion.div>

      {/* Edit Project Sheet */}
      <Sheet open={editProjectOpen} onOpenChange={setEditProjectOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            {/* Sheet Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <SheetTitle className="text-lg font-bold text-white">Edit Project</SheetTitle>
              <button
                type="button"
                onClick={() => setEditProjectOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-xl touch-manipulation active:bg-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Title</label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Project title"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Description</label>
                <Input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Optional description"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              {/* Type Pills */}
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setEditType(editType === t.key ? '' : t.key)}
                      className={cn(
                        'h-10 rounded-xl text-[13px] font-medium touch-manipulation transition-colors',
                        editType === t.key
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] border border-white/[0.08] text-white active:bg-white/[0.08]'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer */}
              {customers.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-white mb-1.5 block">Customer</label>
                  <select
                    value={editCustomerId}
                    onChange={(e) => setEditCustomerId(e.target.value)}
                    className="w-full h-11 rounded-xl bg-elec-gray border border-white/30 text-white text-base px-3 touch-manipulation focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                  >
                    <option value="">No customer</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Location</label>
                <Input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="Address or area"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              {/* Priority Pills */}
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Priority</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['low', 'normal', 'high', 'urgent'] as ProjectPriority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setEditPriority(p)}
                      className={cn(
                        'h-10 rounded-xl text-[13px] font-medium touch-manipulation transition-colors flex items-center justify-center gap-1.5 capitalize',
                        editPriority === p
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] border border-white/[0.08] text-white active:bg-white/[0.08]'
                      )}
                    >
                      <div className={cn('w-2 h-2 rounded-full', PRIORITY_COLOURS[p])} />
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-white mb-1.5 block">Start Date</label>
                  <Input
                    type="date"
                    value={editStartDate}
                    onChange={(e) => setEditStartDate(e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-1.5 block">Due Date</label>
                  <Input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Estimated Value */}
              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">
                  Estimated Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-medium">
                    £
                  </span>
                  <Input
                    type="number"
                    value={editEstimatedValue}
                    onChange={(e) => setEditEstimatedValue(e.target.value)}
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 pl-7"
                  />
                </div>
              </div>
            </div>

            {/* Fixed Save Button */}
            <div className="px-5 py-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleEditSave}
                disabled={!editTitle.trim() || editSaving}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-base font-bold touch-manipulation active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {editSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Sheets */}
      <TaskForm
        isOpen={taskFormOpen}
        onClose={() => {
          setTaskFormOpen(false);
          setEditingTask(null);
        }}
        onSave={async (input) => {
          const result = await saveTask(input);
          if (result) refresh();
          return result;
        }}
        onUpdate={async (taskId, updates) => {
          await updateTask(taskId, updates);
          refresh();
        }}
        editTask={editingTask}
        projectId={id}
      />

      <TaskDetailSheet
        task={detailTask}
        isOpen={detailSheetOpen}
        onClose={() => {
          setDetailSheetOpen(false);
          setDetailTask(null);
        }}
        onMarkDone={async (taskId) => {
          await markDone(taskId);
          refresh();
        }}
        onReopen={async (taskId) => {
          await reopenTask(taskId);
          refresh();
        }}
        onSnooze={async (taskId, until) => {
          await snoozeTask(taskId, until);
          refresh();
        }}
        onEdit={handleTaskEdit}
        onDelete={async (taskId) => {
          await deleteTask(taskId);
          refresh();
        }}
      />

      {id && (
        <>
          <ProjectDocumentSheet
            isOpen={photoSheetOpen}
            onClose={() => {
              setPhotoSheetOpen(false);
              fetchDocuments();
            }}
            docType="photo"
            projectId={id}
            projectName={project.title}
          />
          <ProjectDocumentSheet
            isOpen={docSheetOpen}
            onClose={() => {
              setDocSheetOpen(false);
              fetchDocuments();
            }}
            docType="document"
            projectId={id}
            projectName={project.title}
          />
        </>
      )}

      {/* Add expense — pre-locked to this project (ELE-1176) */}
      <ExpenseAddSheet
        open={expenseSheetOpen}
        onOpenChange={setExpenseSheetOpen}
        onSave={async (input) => {
          await createExpense(input);
        }}
        defaultProjectId={project.id}
        lockProject
      />

      {/* AI sparkle FAB — always-on entry to Mate, with project context */}
      <button
        type="button"
        onClick={askMateAboutProject}
        aria-label="Ask Mate about this project"
        className="fixed right-4 bottom-[max(env(safe-area-inset-bottom),16px)] sm:bottom-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-elec-yellow to-amber-500 text-black shadow-xl shadow-elec-yellow/30 flex items-center justify-center active:scale-[0.96] touch-manipulation"
      >
        <Sparkles className="h-6 w-6" strokeWidth={2.4} />
      </button>

      {/* Mate assistant — context-loaded with this project on tap */}
      <Assistant
        isOpen={aiOpen}
        onClose={() => {
          setAiOpen(false);
          setAiPrompt(undefined);
        }}
        initialPrompt={aiPrompt}
        currentTasks={tasks}
        onSave={saveTask}
        onUpdate={(taskId, input) => updateTask(taskId, input)}
        onMarkDone={markDone}
        onDelete={deleteTask}
        onCompleteProject={async () => {
          await completeProject();
        }}
      />

      {linkType && (
        <LinkEntitySheet
          isOpen={true}
          onClose={() => setLinkType(null)}
          title={linkConfig[linkType].title}
          fetchItems={linkConfig[linkType].fetch}
          onSelect={linkConfig[linkType].link}
          createLabel={linkConfig[linkType].createLabel}
          createUrl={linkConfig[linkType].createUrl}
        />
      )}

      {/* Project actions — tile-grid bottom sheet (create · link · manage) */}
      <ProjectActionsSheet
        open={actionsSheetOpen}
        onOpenChange={setActionsSheetOpen}
        mode="detail"
        projectId={project.id}
        projectTitle={project.title}
        customerName={project.customer_name}
        location={project.location}
        status={project.status}
        onAddExpense={() => setExpenseSheetOpen(true)}
        onAddTask={() => {
          setEditingTask(null);
          setTaskFormOpen(true);
        }}
        onLink={(type) => setLinkType(type)}
        onComplete={completeProject}
        onDelete={() => setConfirmDeleteProject(true)}
        onExportPack={handleExportPack}
      />

      {/* Delete document confirmation */}
      {confirmDeleteDoc && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-end justify-center px-4 pb-8">
          <div className="w-full max-w-sm bg-[#1A1A1A] rounded-3xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white">Delete document?</h3>
            <p className="text-sm text-white">
              This file will be permanently deleted from the project.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirmDeleteDoc(null)}
                className="h-11 rounded-xl bg-white/[0.06] text-white text-sm font-medium touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const doc = projectDocuments.find((d) => d.id === confirmDeleteDoc);
                  if (doc) await deleteDocument(doc);
                  setConfirmDeleteDoc(null);
                }}
                className="h-11 rounded-xl bg-red-500/80 text-white text-sm font-semibold touch-manipulation"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
