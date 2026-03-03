import { useState } from 'react';
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
  ChevronRight,
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
  'rewire',
  'eicr',
  'new-build',
  'maintenance',
  'ev-charging',
  'fire-alarm',
  'consumer-unit',
  'lighting',
  'commercial',
  'other',
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

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<ProjectView>('active');
  const [showCreate, setShowCreate] = useState(false);
  const { projects, counts, isLoading, createProject, refreshProjects } = useSparkProjects(view);

  // Create form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState('');
  const [newPriority, setNewPriority] = useState<ProjectPriority>('normal');
  const [newLocation, setNewLocation] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    const input: CreateProjectInput = {
      title: newTitle,
      description: newDescription || undefined,
      projectType: newType || undefined,
      priority: newPriority,
      location: newLocation || undefined,
    };
    const id = await createProject(input);
    setCreating(false);
    if (id) {
      setShowCreate(false);
      setNewTitle('');
      setNewDescription('');
      setNewType('');
      setNewPriority('normal');
      setNewLocation('');
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
            <div className="flex flex-col items-center py-16 text-center">
              <div className="p-4 rounded-xl bg-white/[0.04] mb-4">
                <FolderKanban className="h-8 w-8 text-white" />
              </div>
              <p className="text-base font-medium text-white">No projects yet</p>
              <p className="text-sm text-white mt-1">Tap + to create your first project.</p>
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
                    className="w-full text-left p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] active:bg-white/[0.08] transition-colors touch-manipulation"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Title + Priority dot */}
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full flex-shrink-0',
                              PRIORITY_COLOURS[project.priority]
                            )}
                          />
                          <h3 className="text-[15px] font-semibold text-white truncate">
                            {project.title}
                          </h3>
                        </div>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          {project.projectType && (
                            <span className="text-[11px] font-medium bg-elec-yellow/15 text-elec-yellow px-2 py-0.5 rounded-full">
                              {project.projectType}
                            </span>
                          )}
                          <span
                            className={cn(
                              'text-[11px] font-medium px-2 py-0.5 rounded-full',
                              STATUS_COLOURS[project.status] || 'bg-white/10 text-white'
                            )}
                          >
                            {project.status}
                          </span>
                          {project.customerName && (
                            <span className="text-[12px] text-white flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {project.customerName}
                            </span>
                          )}
                          {project.location && (
                            <span className="text-[12px] text-white flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </span>
                          )}
                          {project.dueDate && (
                            <span className="text-[12px] text-white flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(project.dueDate)}
                            </span>
                          )}
                        </div>

                        {/* Progress bar */}
                        {project.totalTasks > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] text-white">
                                {project.completedTasks}/{project.totalTasks} tasks
                              </span>
                              <span className="text-[11px] font-medium text-white">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
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
              <SheetTitle className="text-white text-lg">New Project</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
                <label className="text-sm font-medium text-white mb-1.5 block">Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setNewType(newType === t ? '' : t)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-medium touch-manipulation h-9 transition-all',
                        newType === t
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] text-white active:bg-white/10'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-1.5 block">Priority</label>
                <div className="flex gap-2">
                  {(['low', 'normal', 'high', 'urgent'] as ProjectPriority[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setNewPriority(p)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-medium touch-manipulation h-9 transition-all capitalize',
                        newPriority === p
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] text-white active:bg-white/10'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

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
