/**
 * One booking as a row: time, colour spine, title, who and where.
 *
 * Shared by the agenda under the grid and the phone's week list, so a booking
 * reads the same wherever it is listed.
 */
import { format, isToday } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rowCn } from './calendarStyles';
import { clampToDay, displayColour, effectiveEnd, isMultiDay, occupiesTime } from './eventUtils';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarEventRowProps {
  event: CalendarEvent;
  /** The day the row is listed under — continuation days say so. */
  day: Date;
  onTap: (event: CalendarEvent) => void;
  /** Tighter padding for long lists. */
  compact?: boolean;
}

const STATE_LABEL: Record<string, string> = {
  active: 'On site',
  completed: 'Done',
  on_hold: 'On hold',
  cancelled: 'Cancelled',
};

/**
 * What goes in the time column. Tasks and job start/due dates are deadlines,
 * not booked time (see `occupiesTime`) — "All day" against a task said the
 * day was spoken for when it was not.
 */
function timeLabel(event: CalendarEvent, start: Date, continues: boolean): string {
  if (event.id.startsWith('task-')) return 'Task';
  if (event.id.startsWith('project-')) return 'Job';
  if (event.all_day) return 'All day';
  return continues ? 'Cont.' : format(start, 'HH:mm');
}

/** A meeting link synced from Google is a call, not an address to read out. */
function placeLabel(location?: string | null): string | null {
  if (!location) return null;
  return /^https?:\/\//i.test(location.trim()) ? 'Video call' : location;
}

const CalendarEventRow = ({ event, day, onTap, compact }: CalendarEventRowProps) => {
  const { start, end } = clampToDay(event, day);
  const continues = isMultiDay(event) && start.getTime() > new Date(event.start_at).getTime();
  const runsOn = isMultiDay(event) && end.getTime() < effectiveEnd(event).getTime();
  const now = new Date();
  const onNow = isToday(day) && !event.all_day && start <= now && effectiveEnd(event) >= now;
  // Finished earlier today: dims as a unit, so what is LEFT of the day reads
  // first. Other days stay as they are — the whole of a past day dims already.
  const finished = isToday(day) && !event.all_day && occupiesTime(event) && effectiveEnd(event) < now;
  const meta = [event.customer?.name, placeLabel(event.location)].filter(Boolean).join(' · ');
  const state = event.project?.status ? STATE_LABEL[event.project.status] : undefined;

  return (
    <button
      type="button"
      onClick={() => onTap(event)}
      className={cn(rowCn, compact && 'min-h-11 py-2.5', finished && 'opacity-60')}
    >
      {/* Time column — fixed width so every title lines up */}
      <span className="w-[54px] shrink-0 pt-0.5">
        <span className="block text-[12px] font-semibold tabular-nums text-white">
          {timeLabel(event, start, continues)}
        </span>
        {!event.all_day && occupiesTime(event) && (
          <span className="block text-[11px] tabular-nums text-white">
            {runsOn ? '→' : format(end, 'HH:mm')}
          </span>
        )}
      </span>

      {/* Colour spine — a bar, not a dot, so it reads as a block of time */}
      <span
        className="mt-0.5 w-[3px] shrink-0 self-stretch rounded-full"
        style={{ backgroundColor: displayColour(event) }}
      />

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[14px] font-semibold leading-snug tracking-tight text-white">
            {event.title || 'Untitled event'}
          </span>
          {onNow && (
            <span className="shrink-0 rounded-full bg-elec-yellow px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-[0.1em] text-black">
              Now
            </span>
          )}
          {state && !onNow && (
            <span
              className="shrink-0 rounded-full border px-1.5 py-[1px] text-[10px] font-semibold text-white"
              style={{ borderColor: `${displayColour(event)}80` }}
            >
              {state}
            </span>
          )}
        </span>
        {meta && (
          <span className="mt-0.5 block truncate text-[12px] leading-snug text-white">{meta}</span>
        )}
      </span>

      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-elec-yellow" />
    </button>
  );
};

export default CalendarEventRow;
