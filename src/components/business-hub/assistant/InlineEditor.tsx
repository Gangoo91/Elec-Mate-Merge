import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PRIORITY_CHOICES } from './helpers';
import type { ProposedAction } from './types';

export function InlineEditor({
  action,
  onEdit,
}: {
  action: ProposedAction;
  onEdit: (patch: Record<string, unknown>) => void;
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [showDate, setShowDate] = useState(false);

  if (
    action.type !== 'create-task' &&
    action.type !== 'create-snag' &&
    action.type !== 'create-project'
  ) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = (action as any).payload as Record<string, any>;
  const priority = payload.priority as
    | 'low'
    | 'normal'
    | 'high'
    | 'urgent'
    | undefined;
  const isProject = action.type === 'create-project';
  const dateField = isProject ? 'dueDate' : 'dueAt';
  const dateValue: string | undefined = payload[dateField];
  // Format for <input type="datetime-local"> (yyyy-MM-ddTHH:mm)
  const dateInputValue = dateValue
    ? new Date(dateValue).toISOString().slice(0, isProject ? 10 : 16)
    : '';

  return (
    <div className="mt-2 space-y-2">
      {/* Title edit */}
      {editingTitle ? (
        <input
          autoFocus
          type="text"
          defaultValue={payload.title || ''}
          onBlur={(e) => {
            const v = e.currentTarget.value.trim();
            if (v) onEdit({ title: v });
            setEditingTitle(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const v = e.currentTarget.value.trim();
              if (v) onEdit({ title: v });
              setEditingTitle(false);
            } else if (e.key === 'Escape') {
              setEditingTitle(false);
            }
          }}
          className="w-full bg-white/[0.06] border border-white/[0.12] rounded-md px-2 py-1 text-[13px] text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/40"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditingTitle(true)}
          className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35 hover:text-white/70 transition-colors"
        >
          + Edit title
        </button>
      )}

      {/* Priority chips */}
      <div className="flex flex-wrap items-center gap-1">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35 mr-1">
          Priority
        </span>
        {PRIORITY_CHOICES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onEdit({ priority: p })}
            className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors touch-manipulation',
              priority === p
                ? p === 'urgent'
                  ? 'bg-red-500/30 text-red-200 ring-1 ring-red-400/40'
                  : p === 'high'
                    ? 'bg-orange-500/25 text-orange-200 ring-1 ring-orange-400/40'
                    : p === 'low'
                      ? 'bg-white/15 text-white ring-1 ring-white/25'
                      : 'bg-elec-yellow/20 text-elec-yellow ring-1 ring-elec-yellow/40'
                : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/80'
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Due date */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
          {isProject ? 'Due date' : 'Due at'}
        </span>
        {showDate || dateValue ? (
          <input
            type={isProject ? 'date' : 'datetime-local'}
            value={dateInputValue}
            onChange={(e) => {
              const v = e.target.value;
              if (!v) {
                onEdit({ [dateField]: undefined });
                setShowDate(false);
                return;
              }
              const iso = new Date(v).toISOString();
              onEdit({ [dateField]: iso });
            }}
            className="bg-white/[0.06] border border-white/[0.12] rounded-md px-2 py-1 text-[11px] text-white focus:outline-none focus:ring-2 focus:ring-elec-yellow/40"
            style={{ colorScheme: 'dark' }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowDate(true)}
            className="text-[10px] font-medium text-white/40 hover:text-white/70 transition-colors"
          >
            + Set
          </button>
        )}
      </div>
    </div>
  );
}
