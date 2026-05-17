import React, { useState } from 'react';
import { useCustomerReminders } from '@/hooks/useCustomerReminders';
import { Eyebrow, Dot } from '@/components/college/primitives';
import { Check, Trash2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  customerId: string;
}

const PRESETS: { label: string; days: number }[] = [
  { label: 'Tomorrow', days: 1 },
  { label: '1 week', days: 7 },
  { label: '1 month', days: 30 },
  { label: '3 months', days: 90 },
  { label: '1 year', days: 365 },
  { label: '5 years', days: 365 * 5 },
];

const isoFromDaysFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
};

const formatDueLabel = (iso: string): { label: string; tone: 'amber' | 'yellow' | 'red' | 'green' } => {
  const due = new Date(iso);
  const diffMs = due.getTime() - Date.now();
  const days = Math.round(diffMs / 86_400_000);

  if (days < 0) return { label: `${Math.abs(days)}d overdue`, tone: 'red' };
  if (days === 0) return { label: 'Today', tone: 'amber' };
  if (days === 1) return { label: 'Tomorrow', tone: 'amber' };
  if (days < 7) return { label: `In ${days}d`, tone: 'amber' };
  if (days < 31) return { label: `In ${days}d`, tone: 'yellow' };
  if (days < 365) return { label: `In ${Math.round(days / 30)}mo`, tone: 'yellow' };
  return { label: `In ${Math.floor(days / 365)}y`, tone: 'green' };
};

export const CustomerReminders: React.FC<Props> = ({ customerId }) => {
  const { reminders, addReminder, completeReminder, deleteReminder } =
    useCustomerReminders(customerId);
  const [addOpen, setAddOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDays, setDraftDays] = useState(7);

  const open = reminders.filter((r) => !r.completedAt);

  const handleAdd = async () => {
    if (!draftTitle.trim()) return;
    await addReminder({
      title: draftTitle.trim(),
      dueAt: isoFromDaysFromNow(draftDays),
    });
    setDraftTitle('');
    setDraftDays(7);
    setAddOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <Eyebrow>REMINDERS</Eyebrow>
          <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
            {open.length === 0
              ? 'No follow-ups set'
              : `${open.length} follow-up${open.length === 1 ? '' : 's'}`}
          </h3>
        </div>
        {!addOpen && (
          <button
            onClick={() => setAddOpen(true)}
            className="flex h-9 items-center gap-1.5 rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
          >
            <Plus className="h-3.5 w-3.5" />
            Add reminder
          </button>
        )}
      </div>

      {/* Add form */}
      {addOpen && (
        <div className="space-y-3 rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4">
          <div className="flex items-start justify-between gap-2">
            <input
              autoFocus
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd();
                if (e.key === 'Escape') {
                  setAddOpen(false);
                  setDraftTitle('');
                }
              }}
              placeholder='e.g. "Chase invoice INV-1023" or "EICR due"'
              className="h-10 flex-1 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 text-[13px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:outline-none"
            />
            <button
              onClick={() => {
                setAddOpen(false);
                setDraftTitle('');
              }}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white touch-manipulation"
              aria-label="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
              Due
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setDraftDays(p.days)}
                className={cn(
                  'flex h-8 items-center rounded-full border px-3 text-[12px] font-medium transition-colors touch-manipulation',
                  draftDays === p.days
                    ? 'border-elec-yellow/40 bg-elec-yellow/[0.12] text-elec-yellow'
                    : 'border-white/[0.08] bg-white/[0.04] text-white/75 hover:bg-white/[0.08]'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleAdd}
              disabled={!draftTitle.trim()}
              className="flex h-9 items-center rounded-full bg-elec-yellow px-4 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-40 touch-manipulation"
            >
              Set reminder
            </button>
          </div>
        </div>
      )}

      {/* Reminder list */}
      {open.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
          {open.map((r) => {
            const due = formatDueLabel(r.dueAt);
            return (
              <div
                key={r.id}
                className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4"
              >
                <Dot tone={due.tone} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-medium text-white sm:text-[14.5px]">
                    {r.title}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-white/55">
                    {new Date(r.dueAt).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {' · '}
                    <span
                      className={cn(
                        due.tone === 'red' && 'text-red-400',
                        due.tone === 'amber' && 'text-amber-400',
                        due.tone === 'yellow' && 'text-elec-yellow',
                        due.tone === 'green' && 'text-emerald-400'
                      )}
                    >
                      {due.label}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => completeReminder(r.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-emerald-500/15 hover:text-emerald-400 touch-manipulation"
                    aria-label="Mark complete"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteReminder(r.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-red-500/15 hover:text-red-400 touch-manipulation"
                    aria-label="Delete reminder"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
