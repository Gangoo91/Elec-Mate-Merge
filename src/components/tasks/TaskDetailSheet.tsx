import { useState } from 'react';
import { Drawer } from 'vaul';
import {
  X,
  CheckCircle2,
  RotateCcw,
  AlarmClock,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  Users,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { SparkTask } from '@/hooks/useSparkTasks';
import { cn } from '@/lib/utils';

interface TaskDetailSheetProps {
  task: SparkTask | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkDone: (id: string) => Promise<void>;
  onReopen: (id: string) => Promise<void>;
  onSnooze: (id: string, until: Date) => Promise<void>;
  onEdit: (task: SparkTask) => void;
  onDelete: (id: string) => Promise<void>;
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-green-500/20 text-green-400' },
  done: { label: 'Done', className: 'bg-emerald-500/20 text-emerald-400' },
  snoozed: { label: 'Snoozed', className: 'bg-blue-500/20 text-blue-400' },
  cancelled: { label: 'Cancelled', className: 'bg-red-500/20 text-red-400' },
};

const PRIORITY_DOT: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-400',
  normal: 'bg-yellow-400',
  low: 'bg-white/30',
};

function getSnoozeOptions(): { label: string; date: Date }[] {
  const now = new Date();
  const today6pm = new Date(now);
  today6pm.setHours(18, 0, 0, 0);
  if (today6pm <= now) today6pm.setDate(today6pm.getDate() + 1);

  const tomorrow9am = new Date(now);
  tomorrow9am.setDate(tomorrow9am.getDate() + 1);
  tomorrow9am.setHours(9, 0, 0, 0);

  const nextMonday9am = new Date(now);
  const day = nextMonday9am.getDay();
  const daysToMonday = day === 0 ? 1 : 8 - day;
  nextMonday9am.setDate(nextMonday9am.getDate() + daysToMonday);
  nextMonday9am.setHours(9, 0, 0, 0);

  return [
    { label: 'Later today (6pm)', date: today6pm },
    { label: 'Tomorrow (9am)', date: tomorrow9am },
    { label: 'Next week (Mon 9am)', date: nextMonday9am },
  ];
}

export function TaskDetailSheet({
  task,
  isOpen,
  onClose,
  onMarkDone,
  onReopen,
  onSnooze,
  onEdit,
  onDelete,
}: TaskDetailSheetProps) {
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  if (!task) return null;

  const status = STATUS_BADGE[task.status] || STATUS_BADGE.open;
  const priorityDot = PRIORITY_DOT[task.priority] || PRIORITY_DOT.normal;

  const dueDate = task.dueAt
    ? new Date(task.dueAt).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const isOverdue = task.dueAt && new Date(task.dueAt) < new Date() && task.status === 'open';

  async function handleAction(fn: () => Promise<void>) {
    setActionLoading(true);
    try {
      await fn();
      onClose();
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <>
      <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[70dvh] outline-none">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 pb-3 border-b border-white/10">
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn('w-2.5 h-2.5 rounded-full', priorityDot)} />
                  <span
                    className={cn(
                      'text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full',
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white leading-tight">{task.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation shrink-0"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* Details */}
              {task.details && (
                <div className="space-y-1">
                  <p className="text-[13px] font-medium text-white">Details</p>
                  <p className="text-sm text-white whitespace-pre-wrap">{task.details}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2">
                {dueDate && (
                  <div className="flex items-center gap-2">
                    <Clock className={cn('h-4 w-4', isOverdue ? 'text-red-400' : 'text-white')} />
                    <span
                      className={cn(
                        'text-sm',
                        isOverdue ? 'text-red-400 font-medium' : 'text-white'
                      )}
                    >
                      {isOverdue ? 'Overdue — ' : ''}
                      {dueDate}
                    </span>
                  </div>
                )}

                {task.customerName && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white" />
                    <span className="text-sm text-white">{task.customerName}</span>
                  </div>
                )}

                {task.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-sm text-white">{task.location}</span>
                  </div>
                )}

                {task.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-white mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Snooze options */}
              {showSnoozeOptions && (
                <div className="space-y-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-400">Snooze until:</p>
                  {getSnoozeOptions().map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleAction(() => onSnooze(task.id, opt.date))}
                      disabled={actionLoading}
                      className="w-full text-left h-11 px-3 rounded-lg bg-blue-500/10 text-white text-sm font-medium active:bg-blue-500/20 touch-manipulation transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                {task.status === 'open' ? (
                  <Button
                    onClick={() => handleAction(() => onMarkDone(task.id))}
                    disabled={actionLoading}
                    className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Done
                  </Button>
                ) : task.status === 'done' ? (
                  <Button
                    onClick={() => handleAction(() => onReopen(task.id))}
                    disabled={actionLoading}
                    className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reopen
                  </Button>
                ) : null}

                {task.status === 'open' && (
                  <Button
                    variant="outline"
                    onClick={() => setShowSnoozeOptions(!showSnoozeOptions)}
                    disabled={actionLoading}
                    className="w-full h-11 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                  >
                    <AlarmClock className="h-4 w-4 mr-2" />
                    {showSnoozeOptions ? 'Hide Snooze' : 'Snooze'}
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    onEdit(task);
                    onClose();
                  }}
                  className="w-full h-11 border-white/20 text-white hover:bg-white/10 font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={actionLoading}
                  className="w-full h-11 border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Delete confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete task?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will remove "{task.title}" from your task list. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                handleAction(async () => {
                  await onDelete(task.id);
                  setShowDeleteConfirm(false);
                })
              }
              className="h-11 bg-red-500 hover:bg-red-600 text-white touch-manipulation"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
