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

// Colour carries urgency; anything not urgent is plain white rather than a
// dimmer shade of it. Fading future dates made them read as disabled.
const TONE_TEXT: Record<DueMeta['tone'], string> = {
  overdue: 'text-red-400',
  today: 'text-amber-400',
  soon: 'text-white',
  future: 'text-white',
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
    <div className="relative h-full overflow-hidden rounded-2xl">
      {/* Swipe reveal — emerald wash with check */}
      {canSwipe && (
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 flex items-center bg-gradient-to-r from-green-500 to-emerald-600 pl-5"
        >
          <motion.div style={{ scale: checkScale }}>
            <CheckCircle2 className="h-6 w-6 text-white" />
          </motion.div>
        </motion.div>
      )}

      {/* A card, not a row. Brighter than the page so a task reads as an
          object you can pick up, and tall enough that the title has room
          instead of being clipped between two hairlines. */}
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
          'relative flex h-full cursor-pointer flex-col rounded-2xl border p-4 text-left transition-colors touch-manipulation',
          'border-white/[0.16] bg-gradient-to-b from-white/[0.13] to-white/[0.07]',
          'hover:from-white/[0.17] hover:to-white/[0.10] active:from-white/[0.20]',
          'focus:outline-none focus-visible:border-elec-yellow',
          isSnag && 'border-orange-500/40',
          due?.tone === 'overdue' && !isDone && 'border-red-500/40',
          isDone && 'opacity-60'
        )}
      >
        <div className="flex items-start gap-3">
          {/* 20px circle in a 44px hit area. */}
          {canSwipe ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSwipeComplete(task.id);
              }}
              aria-label="Mark complete"
              className="relative -m-3 box-content shrink-0 p-3 touch-manipulation"
            >
              <span
                className={cn(
                  'block h-5 w-5 rounded-full border-2 border-white/50 transition-colors',
                  'hover:border-white active:border-green-400 active:bg-green-500/20'
                )}
              />
              {(task.priority === 'urgent' || task.priority === 'high') && (
                <span
                  className={cn(
                    'absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full',
                    PRIORITY_DOT[task.priority]
                  )}
                />
              )}
            </button>
          ) : isDone ? (
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </div>
          ) : null}

          <h3
            className={cn(
              'min-w-0 flex-1 text-[15px] font-semibold leading-snug tracking-tight text-white',
              isDone && 'line-through'
            )}
          >
            {task.title}
          </h3>
        </div>

        {/* Site and customer. */}
        {subLine && (
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-white">
            {isSnoozed && <AlarmClock className="-mt-0.5 mr-1 inline h-3 w-3 text-blue-400" />}
            {subLine}
          </p>
        )}

        {/* Due sits at the foot of the card, so it lands in the same place on
            every card in a row regardless of how long the title ran. */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          {due && !isDone ? (
            <span className={cn('text-[12px] font-semibold tabular-nums', TONE_TEXT[due.tone])}>
              {due.tone === 'overdue' ? `${due.label} overdue` : due.label}
            </span>
          ) : isDone && task.completedAt ? (
            <span className="text-[12px] text-emerald-400">Done {timeAgo(task.completedAt)}</span>
          ) : (
            <span className="text-[12px] text-white">No date</span>
          )}
          {isSnag && (
            <span className="rounded-full border border-orange-500/40 bg-orange-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-300">
              Snag
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
