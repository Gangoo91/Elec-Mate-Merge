/**
 * CorrectiveActionsPanel
 *
 * Drop-in corrective action tracker for any safety tool detail view.
 * Shows existing actions + add new action form.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  ChevronDown,
  ChevronUp,
  Target,
  User,
  Calendar,
  Loader2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  useCorrectiveActions,
  useCreateCorrectiveAction,
  useUpdateCorrectiveAction,
  getActionStats,
  type SourceType,
  type ActionPriority,
  type ActionStatus,
  type CorrectiveAction,
} from '@/hooks/useCorrectiveActions';

const PRIORITY_CONFIG: Record<ActionPriority, { bg: string; text: string; label: string }> = {
  low: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Low' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Medium' },
  high: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'High' },
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Critical' },
};

const STATUS_CONFIG: Record<
  ActionStatus,
  { bg: string; text: string; label: string; icon: typeof CheckCircle2 }
> = {
  open: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Open', icon: Clock },
  in_progress: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'In Progress', icon: Target },
  completed: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    label: 'Completed',
    icon: CheckCircle2,
  },
  cancelled: { bg: 'bg-white/5', text: 'text-white', label: 'Cancelled', icon: X },
  overdue: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Overdue', icon: AlertTriangle },
};

interface CorrectiveActionsPanelProps {
  sourceType: SourceType;
  sourceId: string;
}

export function CorrectiveActionsPanel({ sourceType, sourceId }: CorrectiveActionsPanelProps) {
  const { data: actions = [], isLoading } = useCorrectiveActions(sourceType, sourceId);
  const createAction = useCreateCorrectiveAction();
  const updateAction = useUpdateCorrectiveAction();
  const [showAddForm, setShowAddForm] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // New action form state
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState<ActionPriority>('medium');
  const [targetDate, setTargetDate] = useState('');

  const stats = getActionStats(actions);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    await createAction.mutateAsync({
      source_type: sourceType,
      source_id: sourceId,
      action_description: description.trim(),
      assigned_to: assignedTo.trim() || undefined,
      priority,
      target_date: targetDate || undefined,
    });
    setDescription('');
    setAssignedTo('');
    setPriority('medium');
    setTargetDate('');
    setShowAddForm(false);
  };

  const handleStatusChange = (action: CorrectiveAction, newStatus: ActionStatus) => {
    updateAction.mutate({
      id: action.id,
      updates: {
        status: newStatus,
        ...(newStatus === 'completed'
          ? { completed_date: new Date().toISOString().split('T')[0] }
          : {}),
      },
    });
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-elec-yellow" />
          <h3 className="text-sm font-semibold text-white">Corrective Actions</h3>
          {stats.total > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-elec-yellow/15 text-elec-yellow">
              {stats.open + stats.inProgress} open
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {stats.overdue > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400 animate-pulse">
              {stats.overdue} overdue
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-white" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Stat bar */}
              {stats.total > 0 && (
                <div className="flex gap-2">
                  {[
                    { label: 'Open', value: stats.open, colour: 'text-amber-400' },
                    { label: 'In Progress', value: stats.inProgress, colour: 'text-blue-400' },
                    { label: 'Done', value: stats.completed, colour: 'text-emerald-400' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex-1 text-center py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                    >
                      <div className={cn('text-lg font-bold', s.colour)}>{s.value}</div>
                      <div className="text-[9px] text-white uppercase tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action list */}
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                </div>
              ) : actions.length === 0 && !showAddForm ? (
                <p className="text-xs text-white text-center py-3">
                  No corrective actions recorded
                </p>
              ) : (
                <div className="space-y-2">
                  {actions.map((action) => {
                    const sc = STATUS_CONFIG[action.status] || STATUS_CONFIG.open;
                    const pc = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
                    const StatusIcon = sc.icon;
                    const isOverdue =
                      action.status !== 'completed' &&
                      action.status !== 'cancelled' &&
                      action.target_date &&
                      new Date(action.target_date) < new Date();

                    return (
                      <div
                        key={action.id}
                        className={cn(
                          'p-3 rounded-xl border',
                          isOverdue
                            ? 'border-red-500/30 bg-red-500/[0.04]'
                            : 'border-white/[0.06] bg-white/[0.02]'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <StatusIcon
                            className={cn(
                              'h-4 w-4 mt-0.5 flex-shrink-0',
                              isOverdue ? 'text-red-400' : sc.text
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white leading-relaxed">
                              {action.action_description}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span
                                className={cn(
                                  'text-[9px] font-bold px-1.5 py-0.5 rounded',
                                  sc.bg,
                                  sc.text
                                )}
                              >
                                {isOverdue ? 'OVERDUE' : sc.label}
                              </span>
                              <span
                                className={cn(
                                  'text-[9px] font-bold px-1.5 py-0.5 rounded',
                                  pc.bg,
                                  pc.text
                                )}
                              >
                                {pc.label}
                              </span>
                              {action.assigned_to && (
                                <span className="text-[10px] text-white flex items-center gap-0.5">
                                  <User className="h-2.5 w-2.5" /> {action.assigned_to}
                                </span>
                              )}
                              {action.target_date && (
                                <span
                                  className={cn(
                                    'text-[10px] flex items-center gap-0.5',
                                    isOverdue ? 'text-red-400' : 'text-white'
                                  )}
                                >
                                  <Calendar className="h-2.5 w-2.5" />{' '}
                                  {new Date(action.target_date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Quick status buttons */}
                        {action.status !== 'completed' && action.status !== 'cancelled' && (
                          <div className="flex gap-1.5 mt-2">
                            {action.status === 'open' && (
                              <button
                                onClick={() => handleStatusChange(action, 'in_progress')}
                                className="flex-1 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium touch-manipulation active:scale-[0.97]"
                              >
                                Start
                              </button>
                            )}
                            <button
                              onClick={() => handleStatusChange(action, 'completed')}
                              className="flex-1 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium touch-manipulation active:scale-[0.97]"
                            >
                              Complete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add action form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2.5 overflow-hidden"
                  >
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What needs to be done?"
                      className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow/20"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        placeholder="Assigned to"
                        className="h-11 text-sm touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow"
                      />
                      <Input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="h-11 text-sm touch-manipulation bg-white/[0.03] border-white/[0.08] focus:border-elec-yellow [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex gap-1.5">
                      {(['low', 'medium', 'high', 'critical'] as ActionPriority[]).map((p) => {
                        const pc = PRIORITY_CONFIG[p];
                        return (
                          <button
                            key={p}
                            onClick={() => setPriority(p)}
                            className={cn(
                              'flex-1 h-10 rounded-lg text-[11px] font-semibold touch-manipulation active:scale-[0.97] transition-all border',
                              priority === p
                                ? `${pc.bg} ${pc.text} border-current`
                                : 'bg-white/[0.03] border-white/[0.06] text-white'
                            )}
                          >
                            {pc.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:scale-[0.97]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!description.trim() || createAction.isPending}
                        className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-sm font-bold touch-manipulation active:scale-[0.97] disabled:opacity-40"
                      >
                        {createAction.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        ) : (
                          'Add Action'
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Add button */}
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.15] text-xs font-medium text-white touch-manipulation active:scale-[0.98] hover:border-elec-yellow/30 hover:text-elec-yellow transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Corrective Action
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
