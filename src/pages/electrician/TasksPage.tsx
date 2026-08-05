import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
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
import { GenerateTasksSheet } from '@/components/tasks/GenerateTasksSheet';
import { Assistant } from '@/components/business-hub/Assistant';
import {
  useSparkTasks,
  type SparkTask,
  type TaskView,
  type UpdateTaskInput,
  type SaveTaskInput,
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
    saveTasks,
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

  /**
   * The one task to do next.
   *
   * 59% of open tasks platform-wide carry no due date, so an urgency-grouped
   * list collapses into a single undifferentiated pile — 16 of 17 under "No
   * due date" in the reported case. Grouping does not fix that; it just labels
   * it. Picking one task and putting it above everything else does.
   *
   * Order: most overdue first, then soonest due, then the oldest thing sitting
   * undated — because a task nobody has touched in three weeks is exactly what
   * gets lost in a flat list.
   */
  const upNext = useMemo(() => {
    if (activeView !== 'all' || tasks.length === 0) return null;
    const open = tasks.filter((t) => t.status !== 'done');
    if (open.length === 0) return null;
    const dated = open.filter((t) => t.dueAt);
    if (dated.length > 0) {
      return dated.reduce((a, b) => (new Date(a.dueAt!) <= new Date(b.dueAt!) ? a : b));
    }
    return open.reduce((a, b) =>
      new Date(a.createdAt ?? 0) <= new Date(b.createdAt ?? 0) ? a : b
    );
  }, [tasks, activeView]);

  /** Everything except the hero, so it is not shown twice. */
  const listTasks = useMemo(
    () => (upNext ? tasks.filter((t) => t.id !== upNext.id) : tasks),
    [tasks, upNext]
  );

  // Group tasks by urgency when in "All Open" view
  const groups = useMemo(
    () => (activeView === 'all' ? groupTasksByUrgency(listTasks) : null),
    [listTasks, activeView]
  );

  // Sheet state
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState<SparkTask | null>(null);
  const [detailTask, setDetailTask] = useState<SparkTask | null>(null);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);

  /** One insert for the whole plan — see saveTasks. Looping saveTask made a
   *  nine-task plan arrive one row at a time. */
  async function handleGenerateCreate(list: SaveTaskInput[]) {
    await saveTasks(list);
  }

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
        <div className="mx-auto max-w-5xl px-4 py-2 lg:px-6">
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
                {/* "17 open · 1 overdue" restated the tabs directly beneath it.
                    Completed momentum was buried in the last tab instead — and
                    for someone clearing jobs, what you have finished is the
                    number worth showing. */}
                <p className="text-[11px] leading-tight text-white truncate">
                  {(counts.completed ?? 0) > 0 ? (
                    <>
                      <span className="font-semibold text-emerald-400 tabular-nums">
                        {counts.completed}
                      </span>{' '}
                      done
                      <span className="mx-1">·</span>
                    </>
                  ) : null}
                  <span className="font-semibold tabular-nums">{counts.all ?? 0}</span> to go
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenForm()}
              aria-label="New task"
              className="h-11 w-11 text-white hover:text-white hover:bg-white/10 rounded-xl touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filter tabs — single source of truth for what's on screen.
            "Overdue" leads when count > 0 with a red tint so the eye lands
            on what's pressing without needing a separate stat grid. */}
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto scrollbar-hide">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setActiveView(v.key)}
                  className="relative flex-shrink-0 pb-2.5 pt-1 text-[13px] font-medium whitespace-nowrap touch-manipulation select-none"
                >
                  <span className="text-white">
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
                            : 'text-white'
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
      <div className="mx-auto max-w-5xl px-4 pt-4 lg:px-6">
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

      {/* ─── Up next — the page's answer to "what do I do?" ───────────────
          A flat list of seventeen equal-weight rows makes the reader do the
          prioritising. This makes one choice for them and gives it the actions
          it needs, so the common case is a single tap and move on. */}
      {upNext && !isLoading && (
        <div className="mx-auto max-w-5xl px-4 pt-4 lg:px-6">
          <div className="rounded-2xl border border-elec-yellow/30 bg-gradient-to-b from-elec-yellow/[0.10] to-white/[0.06] p-4 sm:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                Up next
              </p>
              {upNext.dueAt && (
                <p
                  className={cn(
                    'text-[12px] font-semibold tabular-nums',
                    new Date(upNext.dueAt) < new Date() ? 'text-red-400' : 'text-white'
                  )}
                >
                  {new Date(upNext.dueAt) < new Date() ? 'Overdue' : 'Due'}{' '}
                  {new Date(upNext.dueAt).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleTapTask(upNext)}
              className="mt-2 block w-full text-left touch-manipulation"
            >
              <h2 className="text-[19px] font-semibold leading-snug tracking-tight text-white">
                {upNext.title}
              </h2>
              {(upNext.location || upNext.customerName) && (
                <p className="mt-1 text-[13px] text-white">
                  {[upNext.customerName, upNext.location].filter(Boolean).join(' · ')}
                </p>
              )}
            </button>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => markDone(upNext.id)}
                className="h-11 flex-1 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99]"
              >
                Mark done
              </button>
              <button
                type="button"
                onClick={() => {
                  // Tomorrow morning, not "+24 hours" — a task pushed from
                  // 21:00 to 21:00 lands outside the working day.
                  const t = new Date();
                  t.setDate(t.getDate() + 1);
                  t.setHours(9, 0, 0, 0);
                  snoozeTask(upNext.id, t);
                }}
                className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.99]"
              >
                Tomorrow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task list */}
      <PullToRefresh onRefresh={refreshTasks} isRefreshing={isLoading}>
        <div className="mx-auto max-w-5xl px-4 py-4 lg:px-6">
          {isLoading && tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <p className="text-sm text-white mt-3">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            /* Typography carries the empty state — the boxed icon was chrome
               around a sentence. */
            <div className="py-14 text-center">
              <h3 className="text-[17px] font-semibold tracking-tight text-white mb-1.5">{empty.title}</h3>
              <p className="text-[13px] text-white mb-4">{empty.subtitle}</p>
              {activeView !== 'completed' && (
                <div className="flex flex-wrap justify-center gap-2">
                  {/* Describing the job beats picking from a template list when
                      you have nothing yet — it produces the whole plan at once. */}
                  <button
                    type="button"
                    onClick={() => setGenerateOpen(true)}
                    className="h-11 rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                  >
                    Plan a job with AI
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplatesOpen(true)}
                    className="h-11 rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation active:scale-[0.98]"
                  >
                    Browse templates
                  </button>
                </div>
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
                  {/* Plain heading and a count. The old "01 ·" prefix numbered
                      the sections, which told the reader nothing — the order is
                      already urgency, and a number in front of "Overdue" reads
                      like part of the label. */}
                  <div className="mb-2 flex items-baseline gap-2">
                    <h2
                      className={cn(
                        'text-[15px] font-semibold tracking-tight',
                        group.key === 'overdue'
                          ? 'text-red-400'
                          : group.key === 'today'
                            ? 'text-amber-400'
                            : 'text-white'
                      )}
                    >
                      {group.label}
                    </h2>
                    <span className="text-[13px] text-white tabular-nums">{group.tasks.length}</span>
                  </div>
                  {/* Tasks — hairline-separated rows. Two columns on lg+. */}
                  {/* Deliberately one column on every width. The two-column
                      version flowed tasks left-right-left-right while the eye
                      reads top-to-bottom, so the third most urgent job appeared
                      below the fifth. A prioritised list only works read in
                      order; width is capped instead so lines stay readable. */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {group.tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
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
            /* Today / This week / Snagging / Completed — same card grid */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
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
      <GenerateTasksSheet
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        onCreate={handleGenerateCreate}
      />

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
