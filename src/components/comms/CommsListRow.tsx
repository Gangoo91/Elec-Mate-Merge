import type { ReactNode } from 'react';
import { Pin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CommsType } from '@/services/teamCommsService';
import { typeMeta } from './commsUi';

/** One conversation in an inbox — reads like a messaging app, not a table. */
export function CommsListRow({
  type,
  title,
  preview,
  time,
  unread,
  unreadCount,
  pinned,
  selected,
  chips,
  onClick,
}: {
  type: CommsType;
  title: string;
  preview: string;
  time: string;
  unread: boolean;
  unreadCount?: number;
  pinned?: boolean;
  selected?: boolean;
  chips?: ReactNode;
  onClick: () => void;
}) {
  const meta = typeMeta[type] ?? typeMeta.message;
  const Icon = meta.Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? 'true' : undefined}
      className={cn(
        'flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation active:bg-white/[0.08]',
        selected ? 'bg-white/[0.09]' : 'hover:bg-white/[0.05]'
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border',
          meta.chip
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-[15px] text-white',
              unread ? 'font-semibold' : 'font-medium'
            )}
          >
            {pinned && <Pin className="mr-1 inline h-3.5 w-3.5 -translate-y-px text-elec-yellow" />}
            {title}
          </span>
          <span
            className={cn(
              'shrink-0 text-[12px] tabular-nums',
              unread ? 'font-semibold text-elec-yellow' : 'text-white'
            )}
          >
            {time}
          </span>
        </span>
        <span className="mt-0.5 flex items-center gap-2">
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-[13.5px] text-white',
              unread ? 'font-medium' : 'font-normal'
            )}
          >
            {preview}
          </span>
          {unreadCount && unreadCount > 0 ? (
            <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[11px] font-bold text-black">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          ) : unread ? (
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-elec-yellow" aria-label="Unread" />
          ) : null}
        </span>
        {chips && <span className="mt-2 flex flex-wrap items-center gap-1.5">{chips}</span>}
      </span>
    </button>
  );
}

export function RowChip({
  tone = 'neutral',
  children,
}: {
  tone?: 'neutral' | 'amber' | 'green' | 'red';
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1 rounded-full border px-2 text-[11.5px] font-medium text-white',
        tone === 'amber' && 'border-amber-400/70 bg-[hsl(0_0%_14%)]',
        tone === 'green' && 'border-emerald-400/40 bg-emerald-500/15',
        tone === 'red' && 'border-red-400/40 bg-red-500/15',
        tone === 'neutral' && 'border-white/[0.12] bg-white/[0.05]'
      )}
    >
      {children}
    </span>
  );
}
