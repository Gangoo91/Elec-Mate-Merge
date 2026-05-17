import { useMemo } from 'react';
import { format, isSameDay, isToday, isTomorrow } from 'date-fns';
import { ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import CalendarEventDot from './CalendarEventDot';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarAgendaStripProps {
  /** Date the agenda is showing — defaults to today. */
  date: Date;
  /** All events the page already has (filter happens here). */
  events: CalendarEvent[];
  /** Tap an event → open detail / navigate. */
  onEventTap: (event: CalendarEvent) => void;
  /** Add new event for this date. */
  onAdd: () => void;
  /** Switch the whole view to Day for this date. */
  onOpenDayView: () => void;
}

function agendaHeading(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEE d MMM');
}

function formatTime(iso: string, allDay?: boolean | null): string {
  if (allDay) return 'All day';
  const d = new Date(iso);
  return format(d, 'HH:mm');
}

const CalendarAgendaStrip = ({
  date,
  events,
  onEventTap,
  onAdd,
  onOpenDayView,
}: CalendarAgendaStripProps) => {
  const dayEvents = useMemo(() => {
    return events
      .filter((e) => isSameDay(new Date(e.start_at), date))
      .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
  }, [events, date]);

  return (
    <div className="space-y-1">
      {/* Label row — clickable to open Day view */}
      <div className="flex items-baseline gap-2 px-1">
        <button
          type="button"
          onClick={onOpenDayView}
          className="flex items-baseline gap-1.5 text-white hover:opacity-80 touch-manipulation"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {agendaHeading(date)}
          </span>
          <span className="text-[11px] font-medium text-white/35 tabular-nums">
            {dayEvents.length}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-white/30 self-center" />
        </button>
        <div className="ml-auto">
          <button
            type="button"
            onClick={onAdd}
            className="text-[12px] font-medium text-elec-yellow hover:text-yellow-300 touch-manipulation flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Events list — hairline-separated rows */}
      {dayEvents.length === 0 ? (
        <button
          type="button"
          onClick={onAdd}
          className="w-full text-left px-4 py-3 text-[13px] text-white/40 hover:text-white/60 hover:bg-white/[0.03] touch-manipulation rounded-lg transition-colors"
        >
          Nothing on for {isToday(date) ? 'today' : agendaHeading(date).toLowerCase()} — tap to add.
        </button>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {dayEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => onEventTap(event)}
              className={cn(
                'w-full flex items-start gap-3 px-4 py-3 text-left touch-manipulation transition-colors',
                'hover:bg-white/[0.03] active:bg-white/[0.05]'
              )}
            >
              {/* Time column — fixed width so titles align */}
              <div className="w-[52px] shrink-0 pt-0.5">
                <p className="text-[12px] font-semibold text-white tabular-nums">
                  {formatTime(event.start_at, event.all_day)}
                </p>
                {!event.all_day && event.end_at && (
                  <p className="text-[10.5px] text-white/40 tabular-nums">
                    {formatTime(event.end_at)}
                  </p>
                )}
              </div>

              {/* Coloured event dot */}
              <span className="pt-1.5 shrink-0">
                <CalendarEventDot colour={event.colour} className="w-2 h-2" />
              </span>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-white truncate leading-snug">
                  {event.title || 'Untitled event'}
                </p>
                {(event.location || event.customer?.name) && (
                  <p className="mt-0.5 text-[12px] text-white/50 truncate leading-snug">
                    {[event.customer?.name, event.location].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarAgendaStrip;
