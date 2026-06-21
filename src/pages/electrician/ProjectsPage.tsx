import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  FolderKanban,
  Loader2,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  MoreVertical,
  Trash2,
  Timer,
  Sparkles,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';
import { Assistant } from '@/components/business-hub/Assistant';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import {
  useSparkProjects,
  type ProjectView,
  type CreateProjectInput,
  type ProjectPriority,
} from '@/hooks/useSparkProjects';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { PANEL } from '@/components/electrician/shared/surfaces';
import ProjectActionsSheet from '@/components/project-management/ProjectActionsSheet';

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

const VIEWS: { key: ProjectView; label: string }[] = [
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'all', label: 'All' },
];

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

const PRIORITY_COLOURS: Record<ProjectPriority, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-white/30',
};

const STATUS_COLOURS: Record<string, string> = {
  open: 'bg-blue-500/20 text-blue-400',
  active: 'bg-emerald-500/20 text-emerald-400',
  completed: 'bg-white/10 text-white',
};

interface SimpleCustomer {
  id: string;
  name: string;
  address?: string | null;
}

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ProjectView>('active');
  const [showCreate, setShowCreate] = useState(false);
  const {
    projects,
    counts,
    isLoading,
    createProject,
    completeProject,
    deleteProject,
    refreshProjects,
  } = useSparkProjects(view);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [actionsTarget, setActionsTarget] = useState<(typeof projects)[number] | null>(null);

  // Task hook — Mate needs the handlers to propose/apply task actions.
  // We load 'all' so the assistant has context regardless of which view we're on.
  const {
    tasks: assistantTasks,
    saveTask,
    updateTask,
    deleteTask,
    markDone,
  } = useSparkTasks('all');

  // AI assistant — opened with project-context prompt from the cards
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string | undefined>(undefined);

  const openAiForProject = (project: (typeof projects)[number]) => {
    const parts = [`Tell me what's outstanding on the "${project.title}" project`];
    if (project.customerName) parts.push(`for ${project.customerName}`);
    if (project.location) parts.push(`at ${project.location}`);
    parts.push(
      `— pull tasks, overdue items, any draft quotes/invoices, and tell me what I should do next.`
    );
    setAiPrompt(parts.join(' '));
    setAiOpen(true);
  };

  // Start the timer on the Time Tracker page with this project pre-tagged.
  // We hand off via sessionStorage so Time Tracker reads it on mount.
  const startTimerForProject = (project: (typeof projects)[number]) => {
    try {
      sessionStorage.setItem(
        'time-tracker-prefill',
        JSON.stringify({
          projectId: project.id,
          label: project.title,
        })
      );
    } catch {
      /* ignore quota / disabled */
    }
    navigate('/electrician/time-tracker');
  };

  // ─── Hero metrics ─────────────────────────────────────────────────
  // Active value: sum of estimatedValue across active (open/active) projects.
  // To bill: project count + total value where status='completed' and we
  //   haven't yet invoiced — proxy = completed projects (we don't have an
  //   invoiced flag on projects, so we surface it as a rollup that nudges
  //   the user to bill out completed work).
  // Won this month: count of projects with status='completed' that
  //   completed in the current calendar month (updated_at as proxy).
  const metrics = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    let activeValue = 0;
    let activeCount = 0;
    let toBillValue = 0;
    let toBillCount = 0;
    let wonThisMonthCount = 0;
    let wonThisMonthValue = 0;
    for (const p of projects) {
      const val = Number(p.estimatedValue ?? 0);
      if (p.status === 'completed') {
        toBillCount += 1;
        toBillValue += val;
        const updated = p.updatedAt ? new Date(p.updatedAt) : null;
        if (updated && updated >= monthStart) {
          wonThisMonthCount += 1;
          wonThisMonthValue += val;
        }
      } else {
        activeCount += 1;
        activeValue += val;
      }
    }
    return {
      activeCount,
      activeValue,
      toBillCount,
      toBillValue,
      wonThisMonthCount,
      wonThisMonthValue,
    };
  }, [projects]);

  // Customers for the create form
  const [customers, setCustomers] = useState<SimpleCustomer[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('customers')
        .select('id, name, address')
        .eq('user_id', user.id)
        .order('name');

      if (data) setCustomers(data);
    };
    loadCustomers();
  }, []);

  // Create form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState('');
  const [newPriority, setNewPriority] = useState<ProjectPriority>('normal');
  const [newLocation, setNewLocation] = useState('');
  const [newCustomerId, setNewCustomerId] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newEstimatedValue, setNewEstimatedValue] = useState('');
  const [creating, setCreating] = useState(false);

  // ELE-1122: addresses already on file for the selected customer — their saved
  // address plus any addresses used on their previous projects (distinct).
  const customerAddresses = useMemo(() => {
    if (!newCustomerId) return [];
    const cust = customers.find((c) => c.id === newCustomerId);
    const seen = new Set<string>();
    if (cust?.address?.trim()) seen.add(cust.address.trim());
    for (const p of projects) {
      if (p.customerId === newCustomerId && p.location?.trim()) seen.add(p.location.trim());
    }
    return Array.from(seen);
  }, [newCustomerId, customers, projects]);

  // Pre-fill the location with the customer's primary saved address when one is
  // picked and the field is still empty — they can pick another chip or edit.
  useEffect(() => {
    if (newCustomerId && !newLocation && customerAddresses.length > 0) {
      setNewLocation(customerAddresses[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCustomerId]);

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewType('');
    setNewPriority('normal');
    setNewLocation('');
    setNewCustomerId('');
    setNewDueDate('');
    setNewEstimatedValue('');
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    const input: CreateProjectInput = {
      title: newTitle,
      description: newDescription || undefined,
      projectType: newType || undefined,
      priority: newPriority,
      location: newLocation || undefined,
      customerId: newCustomerId || undefined,
      dueDate: newDueDate || undefined,
      estimatedValue: newEstimatedValue ? parseFloat(newEstimatedValue) : undefined,
    };
    const id = await createProject(input);
    setCreating(false);
    if (id) {
      setShowCreate(false);
      resetForm();
      navigate(`/electrician/projects/${id}`);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24 min-h-screen">
      {/* Sticky compact header — matches Tasks/Calendar/Time-Tracker pattern */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 lg:px-6 py-2">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/electrician/business')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-white leading-tight">Projects</h1>
                <p className="text-[11px] text-white/60 leading-tight truncate">
                  <span className="font-semibold text-elec-yellow tabular-nums">
                    {formatCurrency(metrics.activeValue)}
                  </span>{' '}
                  active
                  {metrics.toBillCount > 0 && (
                    <>
                      <span className="mx-1 text-white/30">·</span>
                      <span className="font-semibold text-white tabular-nums">{metrics.toBillCount}</span> to bill
                    </>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCreate(true)}
              aria-label="New project"
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 01 · WORKLOAD — elevated panel, mirrors the quotes pipeline */}
      <div className="px-4 lg:px-6 pt-4 space-y-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">01</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">· Workload</span>
        </div>
        <div className={cn(PANEL, 'overflow-hidden')}>
          <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
            <div className="px-3.5 py-3.5 sm:px-5">
              <p className="text-[20px] sm:text-[22px] font-bold text-white tabular-nums leading-none tracking-tight">
                {formatCurrency(metrics.activeValue)}
              </p>
              <p className="text-[11px] text-white/80 mt-1.5">
                Active · <span className="text-white tabular-nums">{metrics.activeCount}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setView('completed')}
              className="px-3.5 py-3.5 sm:px-5 text-left touch-manipulation active:bg-white/[0.03] transition-colors"
            >
              <p
                className={cn(
                  'text-[20px] sm:text-[22px] font-bold tabular-nums leading-none tracking-tight',
                  metrics.toBillCount > 0 ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {formatCurrency(metrics.toBillValue)}
              </p>
              <p className="text-[11px] text-white/80 mt-1.5">
                To bill · <span className="text-white tabular-nums">{metrics.toBillCount}</span>
              </p>
            </button>
            <div className="px-3.5 py-3.5 sm:px-5">
              <p className="text-[20px] sm:text-[22px] font-bold text-emerald-400 tabular-nums leading-none tracking-tight">
                {formatCurrency(metrics.wonThisMonthValue)}
              </p>
              <p className="text-[11px] text-white/80 mt-1.5">
                Won this month · <span className="text-white tabular-nums">{metrics.wonThisMonthCount}</span>
              </p>
            </div>
          </div>
          {metrics.toBillCount > 0 && (
            <button
              type="button"
              onClick={() => setView('completed')}
              className="w-full flex items-center justify-between px-3.5 sm:px-5 py-2.5 border-t border-white/[0.06] touch-manipulation active:bg-white/[0.03] transition-colors"
            >
              <span className="text-[12px] text-white/80">
                <span className="font-semibold text-elec-yellow tabular-nums">{formatCurrency(metrics.toBillValue)}</span>{' '}
                of finished work hasn\u2019t been invoiced yet
              </span>
              <ChevronRight className="h-4 w-4 text-white/40" />
            </button>
          )}
        </div>
      </div>

      {/* View tabs — slimmed to match the rest of the app */}
      <div className="px-4 lg:px-6 pt-3">
        <div className="flex gap-5 border-b border-white/[0.06]">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className="relative flex-shrink-0 pb-2.5 pt-1 text-[13px] font-medium whitespace-nowrap touch-manipulation select-none"
            >
              <span className={view === v.key ? 'text-white' : 'text-white/80'}>{v.label}</span>
              {counts[v.key] > 0 && (
                <span
                  className={cn(
                    'ml-1.5 text-[11px] tabular-nums',
                    view === v.key ? 'text-elec-yellow' : 'text-white/60'
                  )}
                >
                  {counts[v.key]}
                </span>
              )}
              {view === v.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-elec-yellow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <PullToRefresh onRefresh={refreshProjects}>
        <div className="px-4 lg:px-6 py-2">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : projects.length === 0 ? (
            /* Empty state — leads with AI as the easy path in */
            <div className="flex flex-col items-center py-12 text-center max-w-[460px] mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                <FolderKanban className="h-6 w-6 text-white/55" />
              </div>
              <h2 className="text-[18px] font-semibold text-white mb-1.5">
                No projects yet
              </h2>
              <p className="text-[13.5px] text-white/55 leading-relaxed mb-6 max-w-[360px]">
                A project bundles a job's tasks, time, quotes, certs and invoices in one place.
                Ask Mate to set one up — or build it yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[360px]">
                <Button
                  onClick={() => {
                    setAiPrompt(
                      "I've got a new job — walk me through setting it up as a project: customer, location, dates, value, and a sensible task list."
                    );
                    setAiOpen(true);
                  }}
                  className="flex-1 h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation active:scale-[0.98]"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Set one up with Mate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreate(true)}
                  className="flex-1 h-12 text-white border-white/[0.12] hover:bg-white/[0.06] hover:text-white rounded-xl touch-manipulation"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Build manually
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
            >
              <AnimatePresence mode="popLayout">
                {projects.map((project) => {
                  const isCompleted = project.status === 'completed';
                  return (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      layout
                      exit={{ opacity: 0, scale: 0.97 }}
                      className={cn(PANEL, 'group relative overflow-hidden touch-manipulation h-full flex flex-col')}
                    >
                      <div
                        className={cn(
                          'absolute inset-x-0 top-0 h-14 bg-gradient-to-b to-transparent pointer-events-none',
                          isCompleted
                            ? 'from-emerald-500/[0.07]'
                            : project.priority === 'urgent'
                              ? 'from-red-500/[0.08]'
                              : project.priority === 'high'
                                ? 'from-orange-500/[0.07]'
                                : 'from-white/[0.04]'
                        )}
                      />
                      {/* Tappable body — opens the project detail */}
                      <button
                        type="button"
                        onClick={() => navigate(`/electrician/projects/${project.id}`)}
                        className="relative w-full flex-1 flex flex-col text-left p-4 active:bg-white/[0.04] transition-colors"
                      >
                        {/* Title row — priority dot · title · value */}
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className={cn(
                              'w-2 h-2 rounded-full shrink-0 mt-2',
                              PRIORITY_COLOURS[project.priority]
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <h3
                              className={cn(
                                'text-[15px] font-semibold text-white leading-snug line-clamp-2',
                                isCompleted && 'text-white/60'
                              )}
                            >
                              {project.title}
                            </h3>
                            {(project.customerName || project.location) && (
                              <p className="mt-0.5 text-[12.5px] text-white/50 truncate leading-snug">
                                {[project.customerName, project.location]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </p>
                            )}
                          </div>
                          {project.estimatedValue ? (
                            <span
                              className={cn(
                                'text-[15px] font-bold tabular-nums shrink-0 pt-0.5 tracking-tight',
                                isCompleted ? 'text-white/50' : 'text-elec-yellow'
                              )}
                            >
                              {formatCurrency(project.estimatedValue)}
                            </span>
                          ) : null}
                        </div>

                        {/* Meta row — type · due date — subtle */}
                        {(project.projectType || project.dueDate) && (
                          <div className="mt-2.5 ml-5 flex items-center gap-3 text-[11px] text-white/40">
                            {project.projectType && (
                              <span className="capitalize">{project.projectType}</span>
                            )}
                            {project.dueDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Due {formatDate(project.dueDate)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Progress — only render if there are tasks */}
                        {project.totalTasks > 0 ? (
                          <div className="mt-auto pt-3 ml-5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] text-white/45 tabular-nums">
                                {project.completedTasks}/{project.totalTasks} tasks
                              </span>
                              <span className="text-[11px] font-semibold text-white/70 tabular-nums">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-all duration-500',
                                  project.progress === 100
                                    ? 'bg-emerald-400'
                                    : project.progress >= 50
                                      ? 'bg-elec-yellow'
                                      : 'bg-white/35'
                                )}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="mt-auto pt-3 ml-5 text-[11px] text-white/35">No tasks yet</p>
                        )}
                      </button>

                      {/* Action row — start timer · ask Mate · kebab */}
                      <div className="px-3 py-2 border-t border-white/[0.10] flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startTimerForProject(project);
                          }}
                          disabled={isCompleted}
                          className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-[12.5px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] touch-manipulation transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <Timer className="h-3.5 w-3.5" />
                          Start timer
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAiForProject(project);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-[12.5px] font-medium text-elec-yellow hover:text-yellow-300 hover:bg-elec-yellow/[0.06] active:bg-elec-yellow/[0.10] touch-manipulation transition-colors"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          Ask Mate
                        </button>
                        <button
                          type="button"
                          aria-label="Project actions"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionsTarget(project);
                          }}
                          className="h-9 w-9 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/[0.06] rounded-lg shrink-0 touch-manipulation"
                        >
                          <LayoutGrid className="h-4 w-4" />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="More actions"
                              className="h-9 w-9 text-white/55 hover:text-white hover:bg-white/[0.06] rounded-lg shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-elec-gray border-white/10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {!isCompleted && (
                              <DropdownMenuItem
                                className="text-white focus:bg-white/10 focus:text-white"
                                onClick={() => completeProject(project.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" />
                                Mark complete
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                              onClick={() =>
                                setDeleteTarget({ id: project.id, title: project.title })
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </PullToRefresh>

      {/* AI sparkle FAB — always-on entry to Mate from the projects page */}
      <button
        type="button"
        onClick={() => {
          setAiPrompt(undefined);
          setAiOpen(true);
        }}
        aria-label="Open Mate"
        className="fixed right-4 bottom-[max(env(safe-area-inset-bottom),16px)] sm:bottom-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-elec-yellow to-amber-500 text-black shadow-xl shadow-elec-yellow/30 flex items-center justify-center active:scale-[0.96] touch-manipulation"
      >
        <Sparkles className="h-6 w-6" strokeWidth={2.4} />
      </button>

      {/* Mate assistant — handlers are wired so chat-proposed actions actually apply */}
      <Assistant
        isOpen={aiOpen}
        onClose={() => {
          setAiOpen(false);
          setAiPrompt(undefined);
        }}
        initialPrompt={aiPrompt}
        currentTasks={assistantTasks}
        currentProjects={projects}
        onSave={saveTask}
        onUpdate={(id, input) => updateTask(id, input)}
        onMarkDone={markDone}
        onDelete={deleteTask}
        onCreateProject={createProject}
        onCompleteProject={completeProject}
        onDeleteProject={deleteProject}
      />

      {/* Project actions — tile-grid bottom sheet (card mode) */}
      {actionsTarget && (
        <ProjectActionsSheet
          open={!!actionsTarget}
          onOpenChange={(open) => !open && setActionsTarget(null)}
          mode="card"
          projectId={actionsTarget.id}
          projectTitle={actionsTarget.title}
          customerName={actionsTarget.customerName}
          location={actionsTarget.location}
          status={actionsTarget.status}
          onComplete={
            actionsTarget.status === 'completed'
              ? undefined
              : () => completeProject(actionsTarget.id)
          }
          onDelete={() =>
            setDeleteTarget({ id: actionsTarget.id, title: actionsTarget.title })
          }
        />
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-elec-gray border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Project?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete "{deleteTarget?.title}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={async () => {
                if (deleteTarget) await deleteProject(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Project Sheet */}
      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="px-4 py-4 border-b border-white/10">
              <SheetTitle className="text-white text-lg flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-elec-yellow" />
                New Project
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {/* ── Job Details ── */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">01</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· Job details</span>
                </div>

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block">Title</label>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Henderson Full Rewire"
                    className="h-12 text-base rounded-xl bg-white/[0.05] border-white/[0.10] touch-manipulation focus:border-elec-yellow focus:ring-elec-yellow/15 placeholder:text-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block">Description</label>
                  <Input
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Brief project description"
                    className="h-12 text-base rounded-xl bg-white/[0.05] border-white/[0.10] touch-manipulation focus:border-elec-yellow focus:ring-elec-yellow/15 placeholder:text-white/40"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-2 block">Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PROJECT_TYPES.map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setNewType(newType === key ? '' : key)}
                        className={cn(
                          'flex items-center justify-center px-2.5 py-2 rounded-xl text-[13px] font-medium touch-manipulation transition-all',
                          newType === key
                            ? 'bg-elec-yellow text-black ring-2 ring-elec-yellow/30'
                            : 'bg-white/[0.06] text-white active:bg-white/10 border border-white/[0.08]'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Customer & Location ── */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">02</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· Customer & Location</span>
                </div>

                {customers.length > 0 && (
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block">Customer</label>
                    <select
                      value={newCustomerId}
                      onChange={(e) => setNewCustomerId(e.target.value)}
                      className="w-full h-11 rounded-md bg-background border border-white/30 text-white text-base px-3 touch-manipulation focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    >
                      <option value="">Select customer...</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block">Location</label>
                  {customerAddresses.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {customerAddresses.map((addr) => (
                        <button
                          key={addr}
                          type="button"
                          onClick={() => setNewLocation(addr)}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-[12px] text-left touch-manipulation transition-colors active:scale-[0.98]',
                            newLocation === addr
                              ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                              : 'border-white/15 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'
                          )}
                        >
                          {addr}
                        </button>
                      ))}
                    </div>
                  )}
                  <Input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Job site address"
                    className="h-12 text-base rounded-xl bg-white/[0.05] border-white/[0.10] touch-manipulation focus:border-elec-yellow focus:ring-elec-yellow/15 placeholder:text-white/40"
                  />
                </div>
              </div>

              {/* ── Priority & Schedule ── */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">03</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· Priority & Schedule</span>
                </div>

                <div>
                  <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-2 block">Priority</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['low', 'normal', 'high', 'urgent'] as ProjectPriority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewPriority(p)}
                        className={cn(
                          'flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-medium touch-manipulation transition-all capitalize',
                          newPriority === p
                            ? 'bg-elec-yellow text-black ring-2 ring-elec-yellow/30'
                            : 'bg-white/[0.06] text-white active:bg-white/10 border border-white/[0.08]'
                        )}
                      >
                        <div className={cn('w-2 h-2 rounded-full', PRIORITY_COLOURS[p])} />
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block">Due Date</label>
                    <Input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="h-12 text-base rounded-xl bg-white/[0.05] border-white/[0.10] touch-manipulation focus:border-elec-yellow focus:ring-elec-yellow/15 placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider text-white/65 mb-1.5 block">
                      Est. Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-base font-medium">
                        £
                      </span>
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={newEstimatedValue}
                        onChange={(e) => setNewEstimatedValue(e.target.value)}
                        placeholder="0"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 pl-7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10">
              <Button
                onClick={handleCreate}
                disabled={!newTitle.trim() || creating}
                className="w-full h-12 bg-elec-yellow text-black font-bold text-base rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-40"
              >
                {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Project'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectsPage;
