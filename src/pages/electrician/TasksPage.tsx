import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, ClipboardCheck, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskDetailSheet } from '@/components/tasks/TaskDetailSheet';
import { TaskQuickAdd } from '@/components/tasks/TaskQuickAdd';
import { TaskTemplates } from '@/components/tasks/TaskTemplates';
import {
  useSparkTasks,
  type SparkTask,
  type TaskView,
  type UpdateTaskInput,
} from '@/hooks/useSparkTasks';
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
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
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
                <span className="text-[11px] font-bold bg-white/10 text-white px-2 py-0.5 rounded-full">
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
        <div className="px-4 pb-2">
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
                      activeView === v.key ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
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
        </div>
      </div>

      {/* Quick-add + notification prompt */}
      <div className="px-4 pt-3 space-y-3">
        {/* Quick-add bar */}
        <TaskQuickAdd
          onQuickSave={handleQuickSave}
          onExpandForm={() => handleOpenForm()}
          onShowTemplates={() => setTemplatesOpen(true)}
        />
        {/* Push notification opt-in (compact, shows once if not subscribed) */}
        <PushNotificationPrompt
          compact
          delay={2000}
          context="Get reminders for overdue and upcoming tasks"
        />
      </div>

      {/* Task list */}
      <PullToRefresh onRefresh={refreshTasks} isRefreshing={isLoading}>
        <div className="px-4 py-4">
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
                  {/* Section header */}
                  <div className="flex items-center gap-2 px-1">
                    <div className={cn('w-1.5 h-1.5 rounded-full', group.dot)} />
                    <span
                      className={cn(
                        'text-xs font-semibold uppercase tracking-wider',
                        group.labelColour
                      )}
                    >
                      {group.label}
                    </span>
                    <span className="text-xs text-white font-medium">{group.tasks.length}</span>
                  </div>
                  {/* Tasks in this group */}
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
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Flat list for Today, This Week, Completed */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
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
    </div>
  );
};

export default TasksPage;
