import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import type { SparkTask } from '@/hooks/useSparkTasks';
import { useProjectEntities } from '@/hooks/useProjectEntities';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import type { ProjectPriority } from '@/hooks/useSparkProjects';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet';
import { LinkEntitySheet } from '@/components/project-management/LinkEntitySheet';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

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

type LinkType = 'quote' | 'invoice' | 'certificate' | 'rams' | 'siteVisit';

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    project,
    tasks,
    quotes,
    invoices,
    certificates,
    rams,
    siteVisits,
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
    fetchUnlinkedQuotes,
    fetchUnlinkedInvoices,
    fetchUnlinkedCertificates,
    fetchUnlinkedRams,
    fetchUnlinkedSiteVisits,
    completeProject,
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
  const visibleTasks = showAllTasks ? regularTasks : regularTasks.slice(0, TASK_PREVIEW_COUNT);

  // Sheet states
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<SparkTask | null>(null);
  const [detailTask, setDetailTask] = useState<SparkTask | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [linkType, setLinkType] = useState<LinkType | null>(null);
  const [editProjectOpen, setEditProjectOpen] = useState(false);

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
              </DropdownMenuContent>
            </DropdownMenu>
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
        {/* Summary Card — full title, metadata, edit pencil */}
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3"
        >
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-bold text-white leading-tight">{project.title}</h1>
            <button
              type="button"
              onClick={openEditSheet}
              className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-lg bg-white/[0.06] touch-manipulation active:bg-white/10 transition-colors"
            >
              <Pencil className="h-4 w-4 text-elec-yellow" />
            </button>
          </div>
          {project.description && <p className="text-sm text-white">{project.description}</p>}
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'text-[11px] font-medium px-2 py-0.5 rounded-full',
                project.status === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-blue-500/20 text-blue-400'
              )}
            >
              {project.status}
            </span>
            <div className="flex items-center gap-1">
              <div className={cn('w-2 h-2 rounded-full', PRIORITY_COLOURS[project.priority])} />
              <span className="text-[11px] font-medium text-white capitalize">
                {project.priority}
              </span>
            </div>
            {project.project_type && (
              <span className="text-[11px] font-medium bg-elec-yellow/15 text-elec-yellow px-2 py-0.5 rounded-full">
                {project.project_type}
              </span>
            )}
            {project.due_date && (
              <span className="text-[11px] font-medium text-white flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Due {formatShortDate(project.due_date)}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-[13px] text-white">
            {project.customer_name && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {project.customer_name}
              </span>
            )}
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {project.location}
              </span>
            )}
          </div>
          {project.estimated_value != null && project.estimated_value > 0 && (
            <p className="text-sm text-white">
              Estimated value:{' '}
              <span className="font-semibold text-elec-yellow">
                £{project.estimated_value.toLocaleString()}
              </span>
            </p>
          )}
        </motion.div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <motion.div variants={itemVariants} className="px-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-white">
                {doneTasks} of {totalTasks} done
              </span>
              <span className="text-sm font-bold text-elec-yellow">{progress}%</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Site Visits Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible
            open={openSections.has('siteVisits')}
            onOpenChange={() => toggleSection('siteVisits')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <HardHat className="h-5 w-5 text-sky-400" />
                  <span className="text-[15px] font-bold text-white">Site Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  {siteVisits.length > 0 ? (
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {siteVisits.length}
                    </span>
                  ) : (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinkType('siteVisit');
                      }}
                      className="text-[12px] font-medium text-elec-yellow"
                    >
                      + Link
                    </span>
                  )}
                  {openSections.has('siteVisits') ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
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
          <Collapsible open={openSections.has('tasks')} onOpenChange={() => toggleSection('tasks')}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="h-5 w-5 text-amber-400" />
                  <span className="text-[15px] font-bold text-white">Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  {regularTasks.length > 0 && (
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {regularTasks.length}
                    </span>
                  )}
                  {openSections.has('tasks') ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
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
          <Collapsible
            open={openSections.has('quotes')}
            onOpenChange={() => toggleSection('quotes')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <span className="text-[15px] font-bold text-white">Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  {quotes.length > 0 ? (
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {quotes.length}
                    </span>
                  ) : (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinkType('quote');
                      }}
                      className="text-[12px] font-medium text-elec-yellow"
                    >
                      + Link
                    </span>
                  )}
                  {openSections.has('quotes') ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
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
                        <p className="text-[11px] text-white capitalize">{q.status}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-medium text-white">
                          £{q.total.toLocaleString()}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  ))}
                  {quoteTotal > 0 && (
                    <p className="text-[12px] text-white text-right pr-2">
                      Total: £{quoteTotal.toLocaleString()}
                    </p>
                  )}
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Invoices Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible
            open={openSections.has('invoices')}
            onOpenChange={() => toggleSection('invoices')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <PoundSterling className="h-5 w-5 text-blue-400" />
                  <span className="text-[15px] font-bold text-white">Invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  {invoices.length > 0 ? (
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {invoices.length}
                    </span>
                  ) : (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinkType('invoice');
                      }}
                      className="text-[12px] font-medium text-elec-yellow"
                    >
                      + Link
                    </span>
                  )}
                  {openSections.has('invoices') ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
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
                        <span className="text-sm font-medium text-white">
                          £{inv.total.toLocaleString()}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  ))}
                  {invoiceTotal > 0 && (
                    <p className="text-[12px] text-white text-right pr-2">
                      Total: £{invoiceTotal.toLocaleString()} ({paidInvoices} paid)
                    </p>
                  )}
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* ── Certificates Section ── */}
        <motion.div variants={itemVariants}>
          <Collapsible
            open={openSections.has('certificates')}
            onOpenChange={() => toggleSection('certificates')}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-amber-400" />
                  <span className="text-[15px] font-bold text-white">Certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  {certificates.length > 0 ? (
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {certificates.length}
                    </span>
                  ) : (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinkType('certificate');
                      }}
                      className="text-[12px] font-medium text-elec-yellow"
                    >
                      + Link
                    </span>
                  )}
                  {openSections.has('certificates') ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
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
                    onClick={() =>
                      navigate(`/electrician/inspection-testing/${cert.report_type}/${cert.id}`)
                    }
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-white">
                        {cert.report_type.toUpperCase().replace(/-/g, ' ')}
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
          <Collapsible open={openSections.has('rams')} onOpenChange={() => toggleSection('rams')}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <span className="text-[15px] font-bold text-white">RAMS</span>
                </div>
                <div className="flex items-center gap-2">
                  {rams.length > 0 ? (
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {rams.length}
                    </span>
                  ) : (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinkType('rams');
                      }}
                      className="text-[12px] font-medium text-elec-yellow"
                    >
                      + Link
                    </span>
                  )}
                  {openSections.has('rams') ? (
                    <ChevronUp className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
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
                    onClick={() => navigate('/electrician/health-safety')}
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

        {/* ── Snagging Section (only when snags exist) ── */}
        {snaggingTasks.length > 0 && (
          <motion.div variants={itemVariants}>
            <Collapsible
              open={openSections.has('snagging')}
              onOpenChange={() => toggleSection('snagging')}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-orange-500/20 touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <span className="text-[15px] font-bold text-white">Snagging</span>
                    {openSnags > 0 && (
                      <span className="text-[11px] font-medium bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        {openSnags} open
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {snaggingTasks.length}
                    </span>
                    {openSections.has('snagging') ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
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

        {/* ── Photos Section — links to Photo Documentation ── */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => navigate('/electrician/photo-docs')}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-sky-400" />
              <span className="text-[15px] font-bold text-white">Photos</span>
            </div>
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </motion.div>
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
    </div>
  );
};

export default ProjectDetailPage;
