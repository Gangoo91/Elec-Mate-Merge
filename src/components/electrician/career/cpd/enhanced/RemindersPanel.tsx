/**
 * RemindersPanel — editorial CPD reminders.
 *
 * Type-led: high-priority alerts, then divided list of other reminders,
 * quick actions row, and a three-cell stat strip. Drops stock Card chrome
 * and the per-priority colour boxes for editorial accents.
 */

import React from 'react';
import {
  Bell,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle,
  Target,
  Award,
  RefreshCw,
  X,
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { CPDReminder } from '@/types/cpd-enhanced';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const surface =
  'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

const RemindersPanel = () => {
  const { reminders, dismissReminder } = useEnhancedCPD();

  const getReminderIcon = (type: CPDReminder['type']) => {
    switch (type) {
      case 'deadline':
        return Clock;
      case 'goal-progress':
        return Target;
      case 'assessment':
        return Award;
      case 'renewal':
        return RefreshCw;
      default:
        return Bell;
    }
  };

  const priorityTone = (priority: CPDReminder['priority']) =>
    priority === 'high'
      ? 'text-red-300'
      : priority === 'medium'
        ? 'text-amber-300'
        : 'text-blue-300';

  const formatDaysUntil = (dueDate: string) => {
    const diffDays = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays}d`;
  };

  const highPriorityReminders = reminders.filter((r) => r.priority === 'high');
  const otherReminders = reminders.filter((r) => r.priority !== 'high');

  if (reminders.length === 0) {
    return (
      <div className={cn(surface, 'p-8 text-center')}>
        <CheckCircle className="h-8 w-8 text-emerald-300 mx-auto" aria-hidden />
        <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-white">All caught up.</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-md mx-auto">
          No pending reminders — your CPD is on track.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* High priority */}
      {highPriorityReminders.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-red-300 self-center" aria-hidden />
            <Eyebrow>URGENT</Eyebrow>
          </div>
          <ul className="space-y-2">
            {highPriorityReminders.map((reminder) => (
              <li
                key={reminder.id}
                className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-red-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="h-4 w-4 text-red-300 shrink-0 self-center"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-white">{reminder.title}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-white/85">
                      {reminder.message}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-500/40 bg-red-500/[0.08] rounded-md px-1.5 py-0.5 tabular-nums">
                        {formatDaysUntil(reminder.dueDate)}
                      </span>
                      {reminder.actionRequired && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                          {reminder.actionRequired}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissReminder(reminder.id)}
                    aria-label="Dismiss"
                    className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-7 w-7 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Other */}
      {otherReminders.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <Bell className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
            <Eyebrow>NOTIFICATIONS</Eyebrow>
          </div>
          <ul className={cn(surface, 'divide-y divide-white/[0.06]')}>
            {otherReminders.map((reminder) => {
              const Icon = getReminderIcon(reminder.type);
              return (
                <li key={reminder.id} className="px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl">
                  <div className="flex items-start gap-3">
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 self-center',
                        priorityTone(reminder.priority)
                      )}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h4 className="text-[13.5px] font-semibold text-white">{reminder.title}</h4>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65 border border-white/15 rounded-md px-1.5 py-0.5">
                          {reminder.type.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-white/85">
                        {reminder.message}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2 text-[11px] tabular-nums">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 uppercase tracking-[0.12em] font-semibold',
                            priorityTone(reminder.priority)
                          )}
                        >
                          <Calendar className="h-3 w-3 self-center" aria-hidden />
                          {formatDaysUntil(reminder.dueDate)}
                        </span>
                        {reminder.actionRequired && (
                          <>
                            <span className="text-white/40">·</span>
                            <span className="text-white/85">{reminder.actionRequired}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => dismissReminder(reminder.id)}
                      aria-label="Dismiss"
                      className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-7 w-7 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Quick actions */}
      <section className={cn(surface, 'p-5 sm:p-6')}>
        <Eyebrow>QUICK ACTIONS</Eyebrow>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <QuickAction icon={Calendar} label="Set reminder" />
          <QuickAction icon={Target} label="Create goal" />
          <QuickAction icon={Award} label="Schedule assessment" />
          <QuickAction icon={RefreshCw} label="Renewal tracker" />
        </div>
      </section>

      {/* Stat strip */}
      <section className={cn(surface, 'p-5')}>
        <dl className="grid grid-cols-3 gap-4 text-center">
          <PriorityStat
            count={highPriorityReminders.length}
            label="High"
            tone="text-red-300"
          />
          <PriorityStat
            count={reminders.filter((r) => r.priority === 'medium').length}
            label="Medium"
            tone="text-amber-300"
          />
          <PriorityStat
            count={reminders.filter((r) => r.priority === 'low').length}
            label="Low"
            tone="text-blue-300"
          />
        </dl>
      </section>
    </div>
  );
};

const QuickAction = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <button
    type="button"
    className="inline-flex items-center justify-start gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-3 py-2.5 min-h-[40px] touch-manipulation transition-colors"
  >
    <Icon className="h-3.5 w-3.5" aria-hidden />
    {label}
  </button>
);

const PriorityStat = ({
  count,
  label,
  tone,
}: {
  count: number;
  label: string;
  tone: string;
}) => (
  <div>
    <dd className={cn('text-[20px] font-semibold tabular-nums', tone)}>{count}</dd>
    <dt className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
  </div>
);

export default RemindersPanel;
