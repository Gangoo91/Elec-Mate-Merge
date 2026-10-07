/**
 * The blocks drawn on the Diary: a person's booking, and a job nobody is on.
 * Neutral surfaces with a solid stage-colour edge — never a translucent
 * yellow wash (it renders brown on the dark theme).
 */
import type { DragEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { jobStage, stageDef } from '@/lib/jobStages';
import type { DispatchAssignment, DispatchJob } from '@/hooks/useDispatchBoard';
import { DRAG_MIME, type DragPayload } from './dragPayload';
import { placeOf, timeLabel } from './dispatchModel';

function startDrag(e: DragEvent, payload: DragPayload) {
  const raw = JSON.stringify(payload);
  e.dataTransfer.setData(DRAG_MIME, raw);
  e.dataTransfer.setData('text/plain', raw);
  e.dataTransfer.effectAllowed = 'move';
}

interface BlockShellProps {
  stageBar: string;
  title: string;
  lines: Array<ReactNode | null | undefined>;
  danger?: boolean;
  dimmed?: boolean;
  compact?: boolean;
  badge?: ReactNode;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: () => void;
  ariaLabel?: string;
}

function BlockShell({
  stageBar,
  title,
  lines,
  danger,
  dimmed,
  compact,
  badge,
  onClick,
  draggable,
  onDragStart,
  onDragEnd,
  ariaLabel,
}: BlockShellProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      aria-label={ariaLabel}
      className={cn(
        'group relative w-full text-left rounded-lg border overflow-hidden touch-manipulation transition-colors',
        'bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]',
        danger ? 'border-red-500/60' : 'border-white/[0.10]',
        draggable && 'cursor-grab active:cursor-grabbing',
        dimmed && 'opacity-60',
        compact ? 'pl-2.5 pr-2 py-1.5' : 'pl-3.5 pr-3 py-2.5 min-h-[44px]'
      )}
    >
      <span aria-hidden className={cn('absolute left-0 top-0 bottom-0 w-[3px]', stageBar)} />
      <span className="flex items-start gap-1.5">
        <span
          className={cn(
            'min-w-0 flex-1 font-semibold text-white leading-snug',
            compact ? 'text-[11.5px] line-clamp-2' : 'text-[13.5px] line-clamp-2'
          )}
        >
          {title}
        </span>
        {badge}
      </span>
      {lines
        .filter(Boolean)
        .map((l, i) => (
          <span
            key={i}
            className={cn('block text-white truncate', compact ? 'text-[10.5px]' : 'text-[12px] mt-0.5')}
          >
            {l}
          </span>
        ))}
    </button>
  );
}

export function BookingBlock({
  booking,
  job,
  day,
  danger,
  compact,
  onClick,
  draggable,
  onDragEnd,
  showWho,
}: {
  booking: DispatchAssignment;
  job: DispatchJob | undefined;
  day: string;
  danger?: boolean;
  compact?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  onDragEnd?: () => void;
  showWho?: string;
}) {
  const sd = stageDef(jobStage({ board_stage: job?.stage, status: job?.status }));
  const place = placeOf(job?.location);
  const time = timeLabel(booking);
  const multi = booking.start_date !== booking.end_date;
  const unsent = booking.last_change && !booking.last_change.sent;
  return (
    <BlockShell
      stageBar={sd.bar}
      title={job?.title ?? 'Job'}
      lines={[
        showWho,
        compact
          ? [place, time].filter(Boolean).join(' · ') || null
          : [job?.client, place].filter(Boolean).join(' · ') || null,
        !compact ? time : null,
        multi && booking.start_date !== day ? 'continued' : null,
      ]}
      danger={danger}
      dimmed={job?.stage === 'Complete'}
      compact={compact}
      badge={
        unsent ? (
          <span
            title="Changed, not sent yet"
            aria-label="Changed, not sent yet"
            className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400"
          />
        ) : null
      }
      onClick={onClick}
      draggable={draggable}
      onDragStart={(e) => startDrag(e, { type: 'booking', id: booking.id, fromDay: day })}
      onDragEnd={onDragEnd}
      ariaLabel={`${job?.title ?? 'Job'}${time ? `, ${time}` : ''}`}
    />
  );
}

export function JobBlock({
  job,
  day,
  compact,
  onClick,
  draggable,
  onDragEnd,
  note,
}: {
  job: DispatchJob;
  day: string | null;
  compact?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  onDragEnd?: () => void;
  note?: string;
}) {
  const sd = stageDef(jobStage({ board_stage: job.stage, status: job.status }));
  const place = placeOf(job.location);
  return (
    <BlockShell
      stageBar={sd.bar}
      title={job.title}
      lines={[
        compact ? place : [job.client, place].filter(Boolean).join(' · ') || null,
        note,
      ]}
      compact={compact}
      onClick={onClick}
      draggable={draggable}
      onDragStart={(e) => startDrag(e, { type: 'job', id: job.id, fromDay: day })}
      onDragEnd={onDragEnd}
      ariaLabel={`${job.title}, nobody booked`}
    />
  );
}

/** Hours booked against a working day, as a thin bar plus the figure. */
export function CapacityBar({
  hours,
  max,
  danger,
  className,
}: {
  hours: number;
  max: number;
  danger?: boolean;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((hours / max) * 100));
  return (
    <span className={cn('flex items-center gap-1.5', className)}>
      <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.10]">
        <span
          className={cn('absolute inset-y-0 left-0 rounded-full', danger ? 'bg-red-400' : 'bg-emerald-400')}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className={cn('text-[10.5px] tabular-nums', danger ? 'text-red-300' : 'text-white')}>
        {hours ? `${String(hours).replace(/\.0+$/, '')}/${max}h` : 'Free'}
      </span>
    </span>
  );
}
