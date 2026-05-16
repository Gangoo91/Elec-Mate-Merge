import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  ClipboardCheck,
  Loader2,
  AlertTriangle,
  Flame,
  CalendarClock,
  CalendarDays,
  Inbox,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet';
import { TaskQuickAdd } from '@/components/tasks/TaskQuickAdd';
import { TaskTemplates } from '@/components/tasks/TaskTemplates';
import { Assistant } from '@/components/business-hub/Assistant';
import {
  useSparkTasks,
  type SparkTask,
  type TaskView,
  type UpdateTaskInput,
} from '@/hooks/useSparkTasks';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
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

// "All Open" is the default — shows everything, most useful landing view
const VIEWS: { key: TaskView; label: string; icon?: typeof AlertTriangle }[] = [
  { key: 'all', label: 'All Open' },
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'snagging', label: 'Snagging', icon: AlertTriangle },
  { key: 'completed', label: 'Completed' },
];

const EMPTY_MESSAGES: Record<TaskView, { title: string; subtitle: string }> = {
  all: {
    title: 'No tasks yet',
    subtitle: 'Type above to add your first task.',
  },
  today: {
    title: 'Nothing due today',
    subtitle: 'Enjoy the quiet! Tap + to add a task.',
  },
  week: {
    title: 'Nothing due this week',
    subtitle: 'Looking clear. Tap + to plan ahead.',
  },
  snagging: {
    title: 'No snags yet',
    subtitle: 'Ask your AI assistant to create a snagging list.',
  },
  completed: {
    title: 'No completed tasks yet',
    subtitle: 'Tasks you mark as done will appear here.',
  },
};

// Urgency group definitions for the "All Open" view
interface TaskGroup {
  key: string;
  label: string;
  dot: string;
  labelColour: string;
  tasks: SparkTask[];
}

function groupTasksByUrgency(tasks: SparkTask[]): TaskGroup[] {
  const now = new Date();
  const eod = new Date(now);
  eod.setHours(23, 59, 59, 999);

  const eow = new Date(now);
  const day = eow.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  eow.setDate(eow.getDate() + daysUntilSunday);
  eow.setHours(23, 59, 59, 999);

  const overdue: SparkTask[] = [];
  const dueToday: SparkTask[] = [];
  const dueThisWeek: SparkTask[] = [];
  const upcoming: SparkTask[] = [];
  const noDueDate: SparkTask[] = [];

  for (const task of tasks) {
    if (!task.dueAt) {
      noDueDate.push(task);
      continue;
    }
    const due = new Date(task.dueAt);
    if (due < now) {
      overdue.push(task);
    } else if (due <= eod) {
      dueToday.push(task);
    } else if (due <= eow) {
      dueThisWeek.push(task);
    } else {
      upcoming.push(task);
    }
  }

  return [
    {
      key: 'overdue',
      label: 'Overdue',
      dot: 'bg-red-500',
      labelColour: 'text-red-400',
      tasks: overdue,
    },
    {
      key: 'today',
      label: 'Due Today',
      dot: 'bg-yellow-500',
      labelColour: 'text-yellow-400',
      tasks: dueToday,
    },
    {
      key: 'week',
      label: 'This Week',
      dot: 'bg-blue-400',
      labelColour: 'text-blue-400',
      tasks: dueThisWeek,
    },
    {
      key: 'upcoming',
      label: 'Upcoming',
      dot: 'bg-white/40',
      labelColour: 'text-white',
      tasks: upcoming,
    },
    {
      key: 'no-date',
      label: 'No Due Date',
      dot: 'bg-white/20',
      labelColour: 'text-white',
      tasks: noDueDate,
    },
  ].filter((g) => g.tasks.length > 0);
}

const TasksPage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<TaskView>('all');

  // Single hook instance — counts derived internally, no extra queries
  const {
    tasks,
    counts,
    isLoading,
    saveTask,
    updateTask,
    deleteTask,
    markDone,
    reopenTask,
    snoozeTask,
    refreshTasks,
  } = useSparkTasks(activeView);

  // Projects — for AI assistant context (linking snags to projects, etc.)
  const {
    projects,
    createProject,
    updateProject,
    completeProject,
    deleteProject,
  } = useSparkProjects('all');

  // Group tasks by urgency when in "All Open" view
  const groups = useMemo(
    () => (activeView === 'all' ? groupTasksByUrgency(tasks) : null),
    [tasks, activeView]
  );

  // Sheet state
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState<SparkTask | null>(null);
  const [detailTask, setDetailTask] = useState<SparkTask | null>(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  async function handleQuickSave(title: string) {
    return saveTask({ title });
  }

  function handleOpenForm(task?: SparkTask) {
    setEditTask(task || null);
    setFormOpen(true);
  }

  function handleTapTask(task: SparkTask) {
    setDetailTask(task);
  }

  async function handleUpdate(id: string, input: Partial<UpdateTaskInput>) {
    await updateTask(id, input as UpdateTaskInput);
  }

  function handleSwipeComplete(id: string) {
    markDone(id);
  }

  const empty = EMPTY_MESSAGES[activeView];

  // Editorial summary line — live counts woven into a sentence.
  const summaryParts: string[] = [];
  if (counts.overdue > 0) summaryParts.push(`${counts.overdue} overdue`);
  if (counts.today > 0) summaryParts.push(`${counts.today} due today`);
  if (counts.week > 0 && counts.week !== counts.today) summaryParts.push(`${counts.week} this week`);
  if (counts.all > 0) summaryParts.push(`${counts.all} open in total`);
  const summaryLine =
    summaryParts.length > 0 ? summaryParts.join(' · ') + '.' : 'Nothing on the board right now.';

  // Stat strip — clickable mini-cards mapped to filter views.
  // The most pressing one (overdue → today → week) gets the gold accent.
  const accentKey: 'overdue' | 'today' | 'week' | 'all' =
    counts.overdue > 0 ? 'overdue' : counts.today > 0 ? 'today' : counts.week > 0 ? 'week' : 'all';

  const stats: {
    key: 'overdue' | 'today' | 'week' | 'all';
    label: string;
    value: number;
    icon: typeof Flame;
    onClick: () => void;
  }[] = [
    {
      key: 'overdue',
      label: 'Overdue',
      value: counts.overdue,
      icon: Flame,
      // Overdue lives inside "today" group in the data model — switch
      // to All Open so the user lands on the urgency-grouped view that
      // surfaces overdue at the top.
      onClick: () => setActiveView('all'),
    },
    {
      key: 'today',
      label: 'Today',
      value: counts.today,
      icon: CalendarClock,
      onClick: () => setActiveView('today'),
    },
    {
      key: 'week',
      label: 'This week',
      value: counts.week,
      icon: CalendarDays,
      onClick: () => setActiveView('week'),
    },
    {
      key: 'all',
      label: 'Open',
      value: counts.all,
      icon: Inbox,
      onClick: () => setActiveView('all'),
    },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24 min-h-screen">
      {/* Sticky compact bar — back, title, add */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 lg:px-8 py-2 lg:max-w-[1200px] lg:mx-auto">
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
              <h1 className="text-lg font-bold text-white">Tasks</h1>
              {counts[activeView] > 0 && (
                <span
                  className={cn(
                    'text-[11px] font-bold px-2.5 py-0.5 rounded-full min-w-[24px] text-center shadow-sm',
                    activeView === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/20'
                      : (counts.overdue ?? 0) > 0 && activeView === 'all'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-red-500/25'
                        : 'bg-gradient-to-r from-yellow-400/90 to-amber-500/90 text-black shadow-yellow-500/20'
                  )}
                >
                  {counts[activeView]}
                </span>
              )}
            </div>
            <Button
              size="icon"
              onClick={() => handleOpenForm()}
              className="h-11 w-11 bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-xl touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="px-4 lg:px-8 pb-2 lg:max-w-[1200px] lg:mx-auto">
          <div className="relative">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setActiveView(v.key)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                    activeView === v.key
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white active:bg-white/10'
                  )}
                >
                  {v.icon && <v.icon className="h-3 w-3" />}
                  {v.label}
                  {counts[v.key] > 0 && (
                    <span
                      className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                        activeView === v.key
                          ? 'bg-black/20 text-black'
                          : v.key === 'snagging'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-white/10 text-white'
                      )}
                    >
                      {counts[v.key]}
                    </span>
                  )}
                  {/* Red overdue dot — show on Today tab when overdue tasks exist */}
                  {v.key === 'today' && counts.overdue > 0 && activeView !== 'today' && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-background" />
                  )}
                </button>
              ))}
            </div>
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ─── Editorial intro + stat strip + quick-add ─── */}
      <div className="px-4 lg:px-8 pt-4 lg:pt-6 lg:max-w-[1200px] lg:mx-auto">
        {/* Editorial header */}
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
          Business · Workload
        </p>
        <h2 className="text-[28px] sm:text-[34px] lg:text-[44px] font-bold leading-[1.05] tracking-tight mb-2">
          <span className="text-elec-yellow">Today's</span> <span className="text-white">tasks.</span>
        </h2>
        <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed max-w-[640px] mb-4">
          {summaryLine}
        </p>

        {/* Stat strip — 2×2 mobile, 4-up desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
          {stats.map((s) => {
            const isAccent = s.key === accentKey && s.value > 0;
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                type="button"
                onClick={s.onClick}
                className={cn(
                  'group relative text-left rounded-xl p-3 sm:p-4 border touch-manipulation transition-all active:scale-[0.98]',
                  isAccent
                    ? 'bg-gradient-to-br from-elec-yellow/15 to-amber-500/5 border-elec-yellow/30'
                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={cn(
                      'text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em]',
                      isAccent ? 'text-elec-yellow' : 'text-white/60'
                    )}
                  >
                    {s.label}
                  </span>
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 sm:h-4 sm:w-4',
                      isAccent
                        ? 'text-elec-yellow'
                        : s.key === 'overdue' && s.value > 0
                          ? 'text-red-400'
                          : 'text-white/40'
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'text-2xl sm:text-3xl font-bold tabular-nums leading-none',
                    isAccent
                      ? 'text-white'
                      : s.key === 'overdue' && s.value > 0
                        ? 'text-red-400'
                        : 'text-white'
                  )}
                >
                  {s.value}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick-add bar */}
        <TaskQuickAdd
          onQuickSave={handleQuickSave}
          onExpandForm={() => handleOpenForm()}
          onShowTemplates={() => setTemplatesOpen(true)}
        />
        {/* Push notification opt-in (compact, shows once if not subscribed) */}
        <div className="mt-3">
          <PushNotificationPrompt
            compact
            delay={2000}
            context="Get reminders for overdue and upcoming tasks"
          />
        </div>
      </div>

      {/* Task list */}
      <PullToRefresh onRefresh={refreshTasks} isRefreshing={isLoading}>
        <div className="px-4 lg:px-8 py-4 lg:max-w-[1200px] lg:mx-auto">
          {isLoading && tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <p className="text-sm text-white mt-3">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="p-4 rounded-2xl bg-white/[0.04] mb-4">
                <ClipboardCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{empty.title}</h3>
              <p className="text-sm text-white mb-5">{empty.subtitle}</p>
              {activeView !== 'completed' && (
                <button
                  type="button"
                  onClick={() => setTemplatesOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-purple-500/20 text-purple-400 text-sm font-semibold touch-manipulation active:bg-purple-500/30 transition-colors"
                >
                  Browse templates
                </button>
              )}
            </div>
          ) : groups ? (
            /* Grouped "All Open" view — sections by urgency */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {groups.map((group) => (
                <motion.div key={group.key} variants={itemVariants} className="space-y-2">
                  {/* Section header — gold divider underneath, editorial style */}
                  <div className="flex items-center justify-between px-1 pb-2 border-b border-elec-yellow/20">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-1 h-4 rounded-full', group.dot)} />
                      <span
                        className={cn(
                          'text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]',
                          group.labelColour
                        )}
                      >
                        {group.label}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center',
                        group.key === 'overdue'
                          ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/20'
                          : group.key === 'today'
                            ? 'bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/20'
                            : group.key === 'week'
                              ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/20'
                              : 'bg-white/[0.06] text-white ring-1 ring-white/10'
                      )}
                    >
                      {group.tasks.length}
                    </span>
                  </div>
                  {/* Tasks in this group — 2-col grid on lg+ */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                    <AnimatePresence mode="popLayout">
                      {group.tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                        >
                          <TaskCard
                            task={task}
                            onTap={handleTapTask}
                            onSwipeComplete={handleSwipeComplete}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Flat list for Today, This Week, Completed — 2-col grid on lg+ */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  >
                    <TaskCard
                      task={task}
                      onTap={handleTapTask}
                      onSwipeComplete={activeView !== 'completed' ? handleSwipeComplete : undefined}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </PullToRefresh>

      {/* Create/Edit form */}
      <TaskForm
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditTask(null);
        }}
        onSave={saveTask}
        onUpdate={handleUpdate}
        editTask={editTask}
      />

      {/* Detail sheet */}
      <TaskDetailSheet
        task={detailTask}
        isOpen={!!detailTask}
        onClose={() => setDetailTask(null)}
        onMarkDone={markDone}
        onReopen={reopenTask}
        onSnooze={snoozeTask}
        onEdit={(task) => handleOpenForm(task)}
        onDelete={deleteTask}
      />

      {/* Templates sheet */}
      <TaskTemplates
        isOpen={templatesOpen}
        onClose={() => setTemplatesOpen(false)}
        onSelect={saveTask}
      />

      {/* AI assistant sheet */}
      <Assistant
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        currentTasks={tasks}
        currentProjects={projects}
        onSave={saveTask}
        onUpdate={handleUpdate}
        onMarkDone={markDone}
        onDelete={deleteTask}
        onCreateProject={createProject}
        onUpdateProject={updateProject}
        onCompleteProject={completeProject}
        onDeleteProject={deleteProject}
      />

      {/* AI FAB — anchored bottom-right above the tab bar */}
      <button
        type="button"
        onClick={() => setAiOpen(true)}
        aria-label="Open AI task assistant"
        className="fixed right-4 bottom-[max(env(safe-area-inset-bottom),16px)] sm:bottom-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-elec-yellow to-amber-500 text-black shadow-xl shadow-elec-yellow/30 flex items-center justify-center active:scale-[0.96] touch-manipulation"
      >
        <Sparkles className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
      </button>
    </div>
  );
};

export default TasksPage;
