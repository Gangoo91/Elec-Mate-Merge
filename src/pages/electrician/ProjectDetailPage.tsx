import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FolderKanban,
  Loader2,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  FileText,
  PoundSterling,
  Shield,
  Zap,
  ClipboardList,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

type Tab = 'overview' | 'tasks' | 'documents';

interface ProjectDetail {
  id: string;
  title: string;
  description?: string;
  project_type?: string;
  status: string;
  priority: string;
  customer_name?: string;
  location?: string;
  estimated_value?: number;
  start_date?: string;
  due_date?: string;
  created_at: string;
  tasks: Array<{ id: string; title: string; status: string; priority: string; due_at?: string }>;
  quotes: Array<{ id: string; status: string; total: number }>;
  invoices: Array<{ id: string; payment_status: string; total: number }>;
  certificates: Array<{ id: string; report_type: string; status: string }>;
  rams: Array<{ id: string; status: string; job_type: string }>;
}

const PRIORITY_COLOURS: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-white/30',
};

const TASK_STATUS_ICON: Record<string, { colour: string }> = {
  open: { colour: 'text-blue-400' },
  done: { colour: 'text-emerald-400' },
  snoozed: { colour: 'text-amber-400' },
};

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('overview');
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProject = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: proj, error } = await (supabase as any)
        .from('spark_projects')
        .select('*, customers(name)')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error || !proj) throw error || new Error('Project not found');

      // Load linked entities in parallel
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = supabase as any;
      const [tasksRes, quotesRes, invoicesRes, certsRes, ramsRes] = await Promise.all([
        s
          .from('spark_tasks')
          .select('id, title, status, priority, due_at')
          .eq('project_id', id)
          .neq('status', 'cancelled')
          .order('due_at', { ascending: true }),
        s
          .from('quotes')
          .select('id, status, total')
          .eq('project_id', id)
          .eq('invoice_raised', false),
        s
          .from('quotes')
          .select('id, payment_status, total')
          .eq('project_id', id)
          .eq('invoice_raised', true),
        s.from('reports').select('id, report_type, status').eq('project_id', id),
        s.from('rams_generation_jobs').select('id, status, job_type').eq('project_id', id),
      ]);

      setProject({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        project_type: proj.project_type,
        status: proj.status,
        priority: proj.priority,
        customer_name: proj.customers?.name,
        location: proj.location,
        estimated_value: proj.estimated_value,
        start_date: proj.start_date,
        due_date: proj.due_date,
        created_at: proj.created_at,
        tasks: tasksRes.data || [],
        quotes: quotesRes.data || [],
        invoices: invoicesRes.data || [],
        certificates: certsRes.data || [],
        rams: ramsRes.data || [],
      });
    } catch (err) {
      console.error('Failed to load project:', err);
      toast({ title: 'Error', description: 'Could not load project.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const completeProject = async () => {
    if (!id) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('spark_projects')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      toast({ title: 'Project completed', description: 'Nice one! Project marked as done.' });
      await loadProject();
    } catch {
      toast({
        title: 'Failed',
        description: 'Could not complete project.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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

  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter((t) => t.status === 'done').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const quoteTotal = project.quotes.reduce((s, q) => s + (Number(q.total) || 0), 0);
  const invoiceTotal = project.invoices.reduce((s, i) => s + (Number(i.total) || 0), 0);
  const paidInvoices = project.invoices.filter((i) => i.payment_status === 'paid').length;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
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
            <div className="flex items-center gap-2 flex-1 min-w-0 mx-3">
              <FolderKanban className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              <h1 className="text-lg font-bold text-white truncate">{project.title}</h1>
            </div>
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

      {/* Tabs */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-2">
          {(
            [
              { key: 'overview', label: 'Overview' },
              { key: 'tasks', label: `Tasks (${totalTasks})` },
              { key: 'documents', label: 'Docs' },
            ] as { key: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation h-11',
                tab === t.key
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.06] text-white active:bg-white/10'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-2 space-y-4"
      >
        {tab === 'overview' && (
          <>
            {/* Project Info Card */}
            <motion.div
              variants={itemVariants}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3"
            >
              {project.description && <p className="text-sm text-white">{project.description}</p>}
              <div className="flex flex-wrap gap-3">
                {project.project_type && (
                  <span className="text-[11px] font-medium bg-elec-yellow/15 text-elec-yellow px-2 py-0.5 rounded-full">
                    {project.project_type}
                  </span>
                )}
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
                  <span className="text-[12px] text-white capitalize">{project.priority}</span>
                </div>
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
                {project.due_date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Due {formatDate(project.due_date)}
                  </span>
                )}
              </div>
              {project.estimated_value && (
                <p className="text-sm text-white">
                  Estimated value:{' '}
                  <span className="font-semibold text-elec-yellow">
                    £{project.estimated_value.toLocaleString()}
                  </span>
                </p>
              )}
            </motion.div>

            {/* Progress */}
            {totalTasks > 0 && (
              <motion.div
                variants={itemVariants}
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Task Progress</span>
                  <span className="text-sm font-bold text-elec-yellow">{progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[12px] text-white mt-1.5">
                  {doneTasks} of {totalTasks} tasks completed
                </p>
              </motion.div>
            )}

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  <span className="text-[12px] text-white">Quotes</span>
                </div>
                <p className="text-lg font-bold text-white">{project.quotes.length}</p>
                {quoteTotal > 0 && (
                  <p className="text-[11px] text-white">£{quoteTotal.toLocaleString()}</p>
                )}
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-1">
                  <PoundSterling className="h-4 w-4 text-blue-400" />
                  <span className="text-[12px] text-white">Invoices</span>
                </div>
                <p className="text-lg font-bold text-white">{project.invoices.length}</p>
                {invoiceTotal > 0 && (
                  <p className="text-[11px] text-white">
                    £{invoiceTotal.toLocaleString()} ({paidInvoices} paid)
                  </p>
                )}
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-amber-400" />
                  <span className="text-[12px] text-white">Certificates</span>
                </div>
                <p className="text-lg font-bold text-white">{project.certificates.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-[12px] text-white">RAMS</span>
                </div>
                <p className="text-lg font-bold text-white">{project.rams.length}</p>
              </div>
            </motion.div>
          </>
        )}

        {tab === 'tasks' && (
          <>
            {project.tasks.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center py-12 text-center"
              >
                <ClipboardList className="h-8 w-8 text-white mb-3" />
                <p className="text-sm text-white">No tasks linked to this project yet.</p>
                <p className="text-[12px] text-white mt-1">
                  Create tasks and link them to this project, or ask Mate to set them up.
                </p>
              </motion.div>
            ) : (
              project.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3"
                >
                  <CheckCircle2
                    className={cn(
                      'h-5 w-5 flex-shrink-0',
                      task.status === 'done' ? 'text-emerald-400' : 'text-white/30'
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm font-medium truncate',
                        task.status === 'done' ? 'text-white line-through' : 'text-white'
                      )}
                    >
                      {task.title}
                    </p>
                    {task.due_at && (
                      <p className="text-[11px] text-white">
                        {new Date(task.due_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    )}
                  </div>
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full flex-shrink-0',
                      PRIORITY_COLOURS[task.priority] || 'bg-white/30'
                    )}
                  />
                </motion.div>
              ))
            )}
          </>
        )}

        {tab === 'documents' && (
          <>
            {project.quotes.length === 0 &&
            project.invoices.length === 0 &&
            project.certificates.length === 0 &&
            project.rams.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center py-12 text-center"
              >
                <FileText className="h-8 w-8 text-white mb-3" />
                <p className="text-sm text-white">No documents linked yet.</p>
                <p className="text-[12px] text-white mt-1">
                  Quotes, invoices, certificates, and RAMS linked to this project will appear here.
                </p>
              </motion.div>
            ) : (
              <>
                {project.quotes.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Quotes ({project.quotes.length})
                    </h3>
                    {project.quotes.map((q) => (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-2 flex items-center justify-between"
                      >
                        <span className="text-sm text-white capitalize">{q.status}</span>
                        <span className="text-sm font-medium text-white">
                          £{Number(q.total).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {project.invoices.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Invoices ({project.invoices.length})
                    </h3>
                    {project.invoices.map((i) => (
                      <div
                        key={i.id}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-2 flex items-center justify-between"
                      >
                        <span className="text-sm text-white capitalize">{i.payment_status}</span>
                        <span className="text-sm font-medium text-white">
                          £{Number(i.total).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {project.certificates.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Certificates ({project.certificates.length})
                    </h3>
                    {project.certificates.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-2 flex items-center justify-between"
                      >
                        <span className="text-sm text-white">{c.report_type}</span>
                        <span className="text-sm text-white capitalize">{c.status}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {project.rams.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      RAMS ({project.rams.length})
                    </h3>
                    {project.rams.map((r) => (
                      <div
                        key={r.id}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-2 flex items-center justify-between"
                      >
                        <span className="text-sm text-white">{r.job_type}</span>
                        <span className="text-sm text-white capitalize">{r.status}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectDetailPage;
