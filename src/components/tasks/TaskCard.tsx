import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Clock, MapPin, Users, AlarmClock, CheckCircle2, AlertTriangle, Check } from 'lucide-react';
import { SparkTask } from '@/hooks/useSparkTasks';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: SparkTask;
  onTap: (task: SparkTask) => void;
  onSwipeComplete?: (id: string) => void;
}

const PRIORITY_BORDER: Record<string, string> = {
  urgent: 'border-l-red-500',
  high: 'border-l-orange-400',
  normal: 'border-l-yellow-400',
  low: 'border-l-white/20',
};

const PRIORITY_LABEL: Record<string, string> = {
  urgent: 'Urgent',
  high: 'High',
  normal: 'Normal',
  low: 'Low',
};

const PRIORITY_TINT: Record<string, string> = {
  urgent: 'bg-red-500/[0.04]',
  high: 'bg-orange-500/[0.03]',
  normal: '',
  low: '',
};

const TAG_COLOUR: Record<string, string> = {
  snagging: 'bg-orange-500/20 text-orange-400',
  quote: 'bg-yellow-500/20 text-yellow-400',
  'follow-up': 'bg-blue-500/20 text-blue-400',
  booking: 'bg-purple-500/20 text-purple-400',
  urgent: 'bg-red-500/20 text-red-400',
  inspection: 'bg-cyan-500/20 text-cyan-400',
  testing: 'bg-green-500/20 text-green-400',
};

const SWIPE_THRESHOLD = 100;

function formatDueDate(dueAt: string): { label: string; className: string } {
  const due = new Date(dueAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  if (due < now) {
    return { label: 'Overdue', className: 'bg-red-500/20 text-red-400' };
  }
  if (due >= today && due < dayAfterTomorrow) {
    return { label: 'Today', className: 'bg-amber-500/20 text-amber-400' };
  }
  if (due >= dayAfterTomorrow && due < new Date(today.getTime() + 2 * 86400000)) {
    return { label: 'Tomorrow', className: 'bg-white/10 text-white' };
  }
  return {
    label: due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    className: 'bg-white/10 text-white',
  };
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function TaskCard({ task, onTap, onSwipeComplete }: TaskCardProps) {
  const dueInfo = task.dueAt ? formatDueDate(task.dueAt) : null;
  const isSnoozed = task.snoozedUntil && new Date(task.snoozedUntil) > new Date();
  const isDone = task.status === 'done';
  const canSwipe = task.status === 'open' && !!onSwipeComplete;

  const x = useMotionValue(0);
  const bgOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const checkScale = useTransform(x, [0, SWIPE_THRESHOLD], [0.3, 1]);
  const [swiping, setSwiping] = useState(false);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x >= SWIPE_THRESHOLD && canSwipe) {
      onSwipeComplete(task.id);
    }
    setSwiping(false);
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Swipe reveal background */}
      {canSwipe && (
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center pl-5"
        >
          <motion.div style={{ scale: checkScale }}>
            <CheckCircle2 className="h-7 w-7 text-white" />
          </motion.div>
        </motion.div>
      )}

      {/* Card content — draggable */}
      <motion.button
        type="button"
        onClick={() => !swiping && onTap(task)}
        drag={canSwipe ? 'x' : false}
        dragConstraints={{ left: 0, right: 150 }}
        dragElastic={0.1}
        onDragStart={() => setSwiping(true)}
        onDragEnd={handleDragEnd}
        style={canSwipe ? { x } : undefined}
        className={cn(
          'relative w-full text-left rounded-xl border-l-4 p-4',
          'bg-white/[0.03] border border-white/[0.08]',
          'active:bg-white/[0.06] transition-colors',
          'touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
          PRIORITY_BORDER[task.priority] || 'border-l-white/20',
          !isDone && (PRIORITY_TINT[task.priority] || ''),
          isDone && 'opacity-80'
        )}
      >
        {/* Title + priority + checkbox */}
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          {canSwipe ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSwipeComplete(task.id);
              }}
              className="w-6 h-6 rounded-full border-2 border-white/30 shrink-0 flex items-center justify-center touch-manipulation active:border-green-400 active:bg-green-500/20 transition-colors mt-0.5"
            >
              {/* Empty circle — tapping completes */}
            </button>
          ) : isDone ? (
            <div className="w-6 h-6 rounded-full bg-emerald-500 shrink-0 flex items-center justify-center mt-0.5">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          ) : null}
          <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
            <h3
              className={cn(
                'text-[15px] font-semibold text-white line-clamp-2 flex-1',
                isDone && 'line-through'
              )}
            >
              {task.title}
            </h3>
            {task.priority !== 'normal' && (
              <span
                className={cn(
                  'text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0',
                  task.priority === 'urgent' && 'bg-red-500/20 text-red-400',
                  task.priority === 'high' && 'bg-orange-500/20 text-orange-400',
                  task.priority === 'low' && 'bg-white/10 text-white'
                )}
              >
                {PRIORITY_LABEL[task.priority]}
              </span>
            )}
          </div>
        </div>

        {/* Details preview */}
        {task.details && <p className="text-[13px] text-white line-clamp-2 mt-1">{task.details}</p>}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mt-2.5">
          {/* Due date badge */}
          {dueInfo && !isDone && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full',
                dueInfo.className
              )}
            >
              <Clock className="h-3 w-3" />
              {dueInfo.label}
            </span>
          )}

          {/* Completed timestamp */}
          {isDone && task.completedAt && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              Done {timeAgo(task.completedAt)}
            </span>
          )}

          {/* Snoozed badge */}
          {isSnoozed && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
              <AlarmClock className="h-3 w-3" />
              Snoozed
            </span>
          )}

          {/* Customer */}
          {task.customerName && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white">
              <Users className="h-3 w-3" />
              {task.customerName}
            </span>
          )}

          {/* Location */}
          {task.location && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white">
              <MapPin className="h-3 w-3" />
              {task.location}
            </span>
          )}

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex items-center gap-1">
              {task.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'text-[10px] font-medium px-1.5 py-0.5 rounded inline-flex items-center gap-0.5',
                    TAG_COLOUR[tag] || 'bg-white/10 text-white'
                  )}
                >
                  {tag === 'snagging' && <AlertTriangle className="h-2.5 w-2.5" />}
                  {tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="text-[10px] text-white">+{task.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

      </motion.button>
    </div>
  );
}
