import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  useSparkProjects,
  type ProjectView,
  type CreateProjectInput,
  type ProjectPriority,
} from '@/hooks/useSparkProjects';
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
}

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ProjectView>('active');
  const [showCreate, setShowCreate] = useState(false);
  const { projects, counts, isLoading, createProject, refreshProjects } = useSparkProjects(view);

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
        .select('id, name')
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
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician/business')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-elec-yellow" />
              <h1 className="text-lg font-bold text-white">Projects</h1>
              {counts.active > 0 && (
                <span className="text-[11px] font-bold bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded-full">
                  {counts.active}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCreate(true)}
              className="text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-2">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation h-11 flex items-center gap-1.5',
                view === v.key
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.06] text-white active:bg-white/10'
              )}
            >
              {v.label}
              <span
                className={cn(
                  'text-[11px] font-bold px-1.5 py-0.5 rounded-full',
                  view === v.key ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                )}
              >
                {counts[v.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <PullToRefresh onRefresh={refreshProjects}>
        <div className="px-4 py-2">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : projects.length === 0 ? (
            /* Enhanced Empty State */
            <div className="flex flex-col items-center py-12 text-center px-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center mb-5">
                <FolderKanban className="h-9 w-9 text-amber-400" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Start your first project</h2>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-white">
                    Track tasks, quotes & certs in one place
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-white">See progress at a glance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-white">Link customers, invoices & RAMS</span>
                </div>
              </div>
              <Button
                onClick={() => setShowCreate(true)}
                className="w-full h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-base rounded-xl touch-manipulation active:scale-[0.98]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Project
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => navigate(`/electrician/projects/${project.id}`)}
                    className="w-full text-left rounded-2xl bg-white/[0.04] border border-white/[0.08] active:bg-white/[0.08] transition-colors touch-manipulation overflow-hidden"
                  >
                    {/* Priority accent bar */}
                    <div className={cn('h-1 w-full', PRIORITY_COLOURS[project.priority])} />

                    <div className="p-4 space-y-3">
                      {/* Title — full width, no truncation on 2 lines */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2">
                            {project.title}
                          </h3>
                          {project.customerName && (
                            <p className="text-[13px] text-white mt-0.5 flex items-center gap-1">
                              <Users className="h-3 w-3 flex-shrink-0" />
                              {project.customerName}
                              {project.location && (
                                <>
                                  <span className="mx-1">·</span>
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  {project.location}
                                </>
                              )}
                            </p>
                          )}
                          {!project.customerName && project.location && (
                            <p className="text-[13px] text-white mt-0.5 flex items-center gap-1">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              {project.location}
                            </p>
                          )}
                        </div>
                        {project.estimatedValue ? (
                          <span className="text-base font-bold text-emerald-400 flex-shrink-0 tabular-nums">
                            {formatCurrency(project.estimatedValue)}
                          </span>
                        ) : null}
                      </div>

                      {/* Badges row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            'text-[11px] font-medium px-2 py-0.5 rounded-full',
                            STATUS_COLOURS[project.status] || 'bg-white/10 text-white'
                          )}
                        >
                          {project.status}
                        </span>
                        {project.projectType && (
                          <span className="text-[11px] font-medium bg-elec-yellow/15 text-elec-yellow px-2 py-0.5 rounded-full">
                            {project.projectType}
                          </span>
                        )}
                        {project.dueDate && (
                          <span className="text-[11px] font-medium text-white flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(project.dueDate)}
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-white">
                            {project.totalTasks > 0
                              ? `${project.completedTasks}/${project.totalTasks} tasks`
                              : 'No tasks yet'}
                          </span>
                          {project.totalTasks > 0 && (
                            <span className="text-[11px] font-bold text-elec-yellow">
                              {project.progress}%
                            </span>
                          )}
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </PullToRefresh>

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
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Job Details
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-1.5 block">Title</label>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Henderson Full Rewire"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-1.5 block">Description</label>
                  <Input
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Brief project description"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Type</label>
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
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Customer & Location
                  </span>
                </div>

                {customers.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">Customer</label>
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
                  <label className="text-sm font-medium text-white mb-1.5 block">Location</label>
                  <Input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Job site address"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* ── Priority & Schedule ── */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Priority & Schedule
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Priority</label>
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
                    <label className="text-sm font-medium text-white mb-1.5 block">Due Date</label>
                    <Input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-1.5 block">
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
