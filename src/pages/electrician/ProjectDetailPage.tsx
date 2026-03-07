import { useState, useCallback, useEffect } from 'react';
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
  MoreVertical,
  Plus,
  Link2,
  ChevronRight,
  Circle,
  FileText,
  Camera,
  Images,
  PoundSterling,
  Shield,
  Zap,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import type { SparkTask } from '@/hooks/useSparkTasks';
import { useProjectEntities } from '@/hooks/useProjectEntities';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet';
import { LinkEntitySheet } from '@/components/project-management/LinkEntitySheet';
import { ProjectDocumentSheet } from '@/components/project-management/ProjectDocumentSheet';
import { useProjectDocuments } from '@/hooks/useProjectDocuments';
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

type LinkType = 'quote' | 'invoice' | 'certificate' | 'rams';

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
    fetchUnlinkedQuotes,
    fetchUnlinkedInvoices,
    fetchUnlinkedCertificates,
    fetchUnlinkedRams,
    completeProject,
    refresh,
  } = useProjectEntities(id);

  // Task operations via the shared hook
  const { saveTask, updateTask, markDone, reopenTask, snoozeTask, deleteTask } =
    useSparkTasks('all');

  // Project documents (photos + drawings)
  const { photos, drawings, fetchDocuments } = useProjectDocuments(id || '');
  useEffect(() => {
    if (id) fetchDocuments();
  }, [id]);

  // Sheet states
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<SparkTask | null>(null);
  const [detailTask, setDetailTask] = useState<SparkTask | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [linkType, setLinkType] = useState<LinkType | null>(null);
  const [docSheetType, setDocSheetType] = useState<'photo' | 'drawing' | null>(null);

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
      createUrl: `/electrician/certificates/new`,
    },
    rams: {
      title: 'Link RAMS',
      fetch: fetchUnlinkedRams,
      link: linkRams,
      createLabel: 'Create new RAMS',
      createUrl: `/electrician-tools/site-safety`,
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

      {/* Single Scroll Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-3 space-y-4"
      >
        {/* 5b. Project Info Card */}
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
          {project.estimated_value != null && project.estimated_value > 0 && (
            <p className="text-sm text-white">
              Estimated value:{' '}
              <span className="font-semibold text-elec-yellow">
                £{project.estimated_value.toLocaleString()}
              </span>
            </p>
          )}
        </motion.div>

        {/* 5c. Progress Bar */}
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

        {/* 5d. Quick Actions Strip */}
        <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setTaskFormOpen(true);
            }}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Plus className="h-4 w-4" /> Task
          </button>
          <button
            type="button"
            onClick={() => setLinkType('quote')}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Link2 className="h-4 w-4" /> Quote
          </button>
          <button
            type="button"
            onClick={() => setLinkType('invoice')}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Link2 className="h-4 w-4" /> Invoice
          </button>
          <button
            type="button"
            onClick={() => setLinkType('certificate')}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Link2 className="h-4 w-4" /> Cert
          </button>
          <button
            type="button"
            onClick={() => setLinkType('rams')}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Link2 className="h-4 w-4" /> RAMS
          </button>
          <button
            type="button"
            onClick={() => setDocSheetType('photo')}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Camera className="h-4 w-4" /> Photos
          </button>
          <button
            type="button"
            onClick={() => setDocSheetType('drawing')}
            className="flex items-center gap-1.5 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium whitespace-nowrap touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Images className="h-4 w-4" /> Drawings
          </button>
        </motion.div>

        {/* 5e. Tasks Section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Tasks ({totalTasks})
          </h3>
          {tasks.length === 0 ? (
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
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                >
                  {/* Checkbox area */}
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

                  {/* Title + date — tappable for detail */}
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

                  {/* Priority dot + chevron */}
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
                onClick={() => {
                  setEditingTask(null);
                  setTaskFormOpen(true);
                }}
                className="w-full h-11 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white text-sm font-medium touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <Plus className="h-4 w-4" /> Add Task
              </button>
            </div>
          )}
        </motion.div>

        {/* 5f. Financials Section */}
        {(quotes.length > 0 || invoices.length > 0) && (
          <motion.div variants={itemVariants} className="space-y-3">
            {/* Quotes */}
            {quotes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Quotes ({quotes.length})
                  {quoteTotal > 0 && (
                    <span className="text-[11px] font-normal text-white ml-auto">
                      £{quoteTotal.toLocaleString()}
                    </span>
                  )}
                </h3>
                <div className="space-y-2">
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
                </div>
              </div>
            )}

            {/* Invoices */}
            {invoices.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Invoices ({invoices.length})
                  {invoiceTotal > 0 && (
                    <span className="text-[11px] font-normal text-white ml-auto">
                      £{invoiceTotal.toLocaleString()} ({paidInvoices} paid)
                    </span>
                  )}
                </h3>
                <div className="space-y-2">
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
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 5g. Photos preview */}
        {photos.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Photos ({photos.length})
              </h3>
              <button
                type="button"
                onClick={() => setDocSheetType('photo')}
                className="text-xs text-elec-yellow font-medium touch-manipulation"
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {photos.slice(0, 6).map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setDocSheetType('photo')}
                  className="aspect-square rounded-xl overflow-hidden bg-white/[0.04] touch-manipulation active:opacity-80"
                >
                  {photo.signedUrl && (
                    <img
                      src={photo.signedUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 5h. Drawings preview */}
        {drawings.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Drawings ({drawings.length})
              </h3>
              <button
                type="button"
                onClick={() => setDocSheetType('drawing')}
                className="text-xs text-elec-yellow font-medium touch-manipulation"
              >
                View all
              </button>
            </div>
            <div className="space-y-2">
              {drawings.slice(0, 3).map((drawing) => (
                <div
                  key={drawing.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                >
                  <FileText className="h-4 w-4 text-purple-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate">{drawing.name}</p>
                  </div>
                  {drawing.signedUrl && (
                    <a
                      href={drawing.signedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-elec-yellow font-medium flex-shrink-0 touch-manipulation"
                    >
                      Open
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 5i. Documents Section (Certs + RAMS) */}
        {(certificates.length > 0 || rams.length > 0) && (
          <motion.div variants={itemVariants} className="space-y-3">
            {/* Certificates */}
            {certificates.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Certificates ({certificates.length})
                </h3>
                <div className="space-y-2">
                  {certificates.map((cert) => (
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
                  ))}
                </div>
              </div>
            )}

            {/* RAMS */}
            {rams.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  RAMS ({rams.length})
                </h3>
                <div className="space-y-2">
                  {rams.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => navigate('/electrician/health-safety')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.08] transition-colors"
                    >
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-white">{r.job_type}</p>
                        <p className="text-[11px] text-white capitalize">{r.status}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty state when no documents or financials at all */}
        {quotes.length === 0 &&
          invoices.length === 0 &&
          certificates.length === 0 &&
          rams.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center py-6 text-center"
            >
              <FileText className="h-7 w-7 text-white mb-2" />
              <p className="text-sm text-white">No linked documents yet.</p>
              <p className="text-[12px] text-white mt-1">
                Use the buttons above to link quotes, invoices, certificates, and RAMS.
              </p>
            </motion.div>
          )}
      </motion.div>

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

      {docSheetType && project && (
        <ProjectDocumentSheet
          isOpen={true}
          onClose={() => setDocSheetType(null)}
          docType={docSheetType}
          projectId={project.id}
          projectName={project.name}
        />
      )}
    </div>
  );
};

export default ProjectDetailPage;
