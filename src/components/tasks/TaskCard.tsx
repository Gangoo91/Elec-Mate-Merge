import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { CheckCircle2, Check, AlarmClock } from 'lucide-react';
import { SparkTask } from '@/hooks/useSparkTasks';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: SparkTask;
  onTap: (task: SparkTask) => void;
  onSwipeComplete?: (id: string) => void;
}

// Priority colour for the leading dot. Order of visual weight:
// urgent > high > normal > low. Snags overlay an orange ring.
const PRIORITY_DOT: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-400',
  normal: 'bg-yellow-400',
  low: 'bg-white/30',
};

const SWIPE_THRESHOLD = 100;

interface DueMeta {
  /** Right-aligned compact label, e.g. "12d", "Today", "Tue", "15:00". */
  label: string;
  /** Tone of the label — overdue is red, today amber, future muted. */
  tone: 'overdue' | 'today' | 'soon' | 'future';
}

function dueMeta(dueAt: string): DueMeta {
  const due = new Date(dueAt);
  const now = new Date();
  const ms = due.getTime() - now.getTime();
  const days = Math.round(ms / 86400000);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const sameDay = dueDay.getTime() === today.getTime();

  if (ms < 0) {
    const overdueDays = Math.max(1, Math.abs(Math.floor(ms / 86400000)));
    return { label: `${overdueDays}d`, tone: 'overdue' };
  }
  if (sameDay) {
    const hh = due.getHours();
    const mm = String(due.getMinutes()).padStart(2, '0');
    return { label: `${hh}:${mm}`, tone: 'today' };
  }
  if (days <= 7) {
    return {
      label: due.toLocaleDateString('en-GB', { weekday: 'short' }),
      tone: 'soon',
    };
  }
  return {
    label: due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    tone: 'future',
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

const TONE_TEXT: Record<DueMeta['tone'], string> = {
  overdue: 'text-red-400',
  today: 'text-amber-400',
  soon: 'text-white/70',
  future: 'text-white/40',
};

export function TaskCard({ task, onTap, onSwipeComplete }: TaskCardProps) {
  const due = task.dueAt ? dueMeta(task.dueAt) : null;
  const isSnoozed = task.snoozedUntil && new Date(task.snoozedUntil) > new Date();
  const isDone = task.status === 'done';
  const isSnag = task.tags?.includes('snagging');
  const canSwipe = task.status === 'open' && !!onSwipeComplete;

  const x = useMotionValue(0);
  const bgOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const checkScale = useTransform(x, [0, SWIPE_THRESHOLD], [0.3, 1]);
  const [swiping, setSwiping] = useState(false);

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.x >= SWIPE_THRESHOLD && canSwipe) {
      onSwipeComplete(task.id);
    }
    setSwiping(false);
  }

  // Secondary line — only render if there's something to say.
  const subParts: string[] = [];
  if (task.customerName) subParts.push(task.customerName);
  if (task.location) subParts.push(task.location);
  if (isSnoozed) subParts.push('snoozed');
  const subLine = subParts.join(' · ');

  return (
    <div className="relative overflow-hidden">
      {/* Swipe reveal — emerald wash with check */}
      {canSwipe && (
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center pl-5"
        >
          <motion.div style={{ scale: checkScale }}>
            <CheckCircle2 className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>
      )}

      {/* Row — flat, no card chrome. Hover/active is the only chrome. */}
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => !swiping && onTap(task)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !swiping) {
            e.preventDefault();
            onTap(task);
          }
        }}
        drag={canSwipe ? 'x' : false}
        dragConstraints={{ left: 0, right: 150 }}
        dragElastic={0.1}
        onDragStart={() => setSwiping(true)}
        onDragEnd={handleDragEnd}
        style={canSwipe ? { x } : undefined}
        className={cn(
          'relative w-full text-left cursor-pointer touch-manipulation',
          'bg-background hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors',
          'focus:outline-none focus-visible:bg-white/[0.04]',
          'flex items-start gap-3 px-4 py-3',
          isDone && 'opacity-50'
        )}
      >
        {/* Leading control — checkbox when swipeable, dot otherwise. Same width
            either way so titles align. */}
        {canSwipe ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwipeComplete(task.id);
            }}
            aria-label="Mark complete"
            className={cn(
              'relative w-5 h-5 rounded-full shrink-0 mt-0.5',
              'border-2 border-white/25 hover:border-white/45 active:border-green-400 active:bg-green-500/20 transition-colors',
              isSnag && 'ring-2 ring-orange-500/40 ring-offset-2 ring-offset-background'
            )}
          >
            {/* Priority colour as a tiny inner pip */}
            <span
              className={cn(
                'absolute inset-1 rounded-full',
                PRIORITY_DOT[task.priority] || PRIORITY_DOT.normal,
                task.priority === 'normal' || task.priority === 'low' ? 'opacity-0' : 'opacity-100'
              )}
            />
          </button>
        ) : isDone ? (
          <div className="w-5 h-5 rounded-full bg-emerald-500 shrink-0 mt-0.5 flex items-center justify-center">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
        ) : (
          <div className="w-5 h-5 shrink-0 mt-0.5" />
        )}

        {/* Body — title + sub-line */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3
              className={cn(
                'flex-1 min-w-0 text-[15px] font-medium text-white leading-snug line-clamp-2',
                isDone && 'line-through text-white/60'
              )}
            >
              {task.title}
            </h3>
            {/* Right-aligned due meta — single label, tone-coloured */}
            {due && !isDone && (
              <span
                className={cn(
                  'text-[12px] font-semibold tabular-nums shrink-0 leading-tight pt-0.5',
                  TONE_TEXT[due.tone]
                )}
              >
                {due.label}
              </span>
            )}
            {isDone && task.completedAt && (
              <span className="text-[11px] text-emerald-400/80 shrink-0 leading-tight pt-0.5">
                {timeAgo(task.completedAt)}
              </span>
            )}
          </div>

          {/* Sub-line — customer · location · snoozed. One subtle row, no pills. */}
          {subLine && (
            <p
              className={cn(
                'mt-0.5 text-[12.5px] leading-snug truncate',
                isDone ? 'text-white/35' : 'text-white/50'
              )}
            >
              {isSnoozed && <AlarmClock className="inline h-3 w-3 mr-1 -mt-0.5 text-blue-400" />}
              {subLine}
            </p>
          )}

          {/* Optional detail preview — only when present and short */}
          {task.details && (
            <p
              className={cn(
                'mt-0.5 text-[12.5px] leading-snug line-clamp-1',
                isDone ? 'text-white/30' : 'text-white/45'
              )}
            >
              {task.details}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
