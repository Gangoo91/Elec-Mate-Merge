import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  ClipboardCheck,
  Loader2,
  AlertTriangle,
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

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24 min-h-screen">
      {/* Sticky compact bar — back, title, add */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 lg:px-6 py-2">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-2 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/electrician/business')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98] flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-white leading-tight">Tasks</h1>
                <p className="text-[11px] text-white/60 leading-tight truncate">
                  <span className="font-semibold text-white tabular-nums">{counts.all ?? 0}</span> open
                  {(counts.overdue ?? 0) > 0 && (
                    <>
                      <span className="mx-1 text-white/30">·</span>
                      <span className="font-semibold text-red-400 tabular-nums">{counts.overdue}</span> overdue
                    </>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenForm()}
              aria-label="New task"
              className="h-11 w-11 text-white/80 hover:text-white hover:bg-white/10 rounded-xl touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filter tabs — single source of truth for what's on screen.
            "Overdue" leads when count > 0 with a red tint so the eye lands
            on what's pressing without needing a separate stat grid. */}
        <div className="px-4 lg:px-6 lg:mx-auto">
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto scrollbar-hide">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setActiveView(v.key)}
                  className="relative flex-shrink-0 pb-2.5 pt-1 text-[13px] font-medium whitespace-nowrap touch-manipulation select-none"
                >
                  <span className={activeView === v.key ? 'text-white' : 'text-white/80'}>
                    {v.label}
                  </span>
                  {counts[v.key] > 0 && (
                    <span
                      className={cn(
                        'ml-1.5 text-[11px] tabular-nums',
                        v.key === 'snagging' && counts.snagging > 0
                          ? 'text-orange-400'
                          : activeView === v.key
                            ? 'text-elec-yellow'
                            : 'text-white/60'
                      )}
                    >
                      {counts[v.key]}
                    </span>
                  )}
                  {activeView === v.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-elec-yellow" />
                  )}
                </button>
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ─── Quick-add bar — straight to action, no editorial chrome ─── */}
      <div className="px-4 lg:px-6 pt-4">
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
        <div className="px-4 lg:px-6 py-4">
          {isLoading && tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <p className="text-sm text-white mt-3">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center text-center py-10 px-4">
              <div className="h-12 w-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-3.5">
                <ClipboardCheck className="h-6 w-6 text-white/70" />
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-1">{empty.title}</h3>
              <p className="text-[13px] text-white/60 mb-4">{empty.subtitle}</p>
              {activeView !== 'completed' && (
                <button
                  type="button"
                  onClick={() => setTemplatesOpen(true)}
                  className="px-5 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation active:scale-[0.97] transition-all"
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
                <motion.div key={group.key} variants={itemVariants}>
                  {/* Subtle group label — small caps, count inline, no badges */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                      0{groups.indexOf(group) + 1}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-medium uppercase tracking-[0.18em]',
                        group.key === 'overdue'
                          ? 'text-red-400'
                          : group.key === 'today'
                            ? 'text-amber-400'
                            : 'text-white/65'
                      )}
                    >
                      · {group.label}
                    </span>
                    <span className="text-[11px] font-medium text-white/35 tabular-nums">
                      {group.tasks.length}
                    </span>
                  </div>
                  {/* Tasks — hairline-separated rows. Two columns on lg+. */}
                  <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 divide-y divide-white/[0.06] lg:divide-y-0">
                    <AnimatePresence mode="popLayout">
                      {group.tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                          className="lg:border-b lg:border-white/[0.06]"
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
            /* Flat list — hairline rows, two columns on lg+ */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:grid lg:grid-cols-2 lg:gap-x-6 divide-y divide-white/[0.06] lg:divide-y-0"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    className="lg:border-b lg:border-white/[0.06]"
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
