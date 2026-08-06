import { useMemo } from 'react';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, rowCn } from './calendarStyles';
import { clampToDay, effectiveEnd, eventsOnDay, isMultiDay } from './eventUtils';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarAgendaStripProps {
  /** Date the agenda is showing. */
  date: Date;
  /** All events the page already has — filtering happens here. */
  events: CalendarEvent[];
  /** Tap an event → open detail / navigate to the linked record. */
  onEventTap: (event: CalendarEvent) => void;
  /** Add a new event on this date. */
  onAdd: () => void;
  /** Switch the whole view to Day for this date. */
  onOpenDayView: () => void;
}

function agendaHeading(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'EEE d MMM');
}

const CalendarAgendaStrip = ({
  date,
  events,
  onEventTap,
  onAdd,
  onOpenDayView,
}: CalendarAgendaStripProps) => {
  const dayEvents = useMemo(() => eventsOnDay(events, date), [events, date]);

  // Only meaningful on today, and only worth recomputing when the day changes —
  // a minute-accurate "on now" would need a ticking clock the agenda doesn't
  // otherwise want. The day view is where the live line lives.
  const now = new Date();
  const showingToday = isToday(date);

  return (
    <div className={cn(cardCn, 'overflow-hidden')}>
      {/* Heading — the whole label opens Day view for this date */}
      <div className="flex items-center gap-2 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onOpenDayView}
          className="flex items-center gap-1.5 touch-manipulation"
        >
          <span className={eyebrowCn}>{agendaHeading(date)}</span>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {dayEvents.length}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-elec-yellow" />
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="ml-auto flex items-center gap-1 text-[12px] font-semibold text-elec-yellow touch-manipulation"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {dayEvents.length === 0 ? (
        <button
          type="button"
          onClick={onAdd}
          className={cn(rowCn, 'py-4 text-[13px] text-white')}
        >
          Nothing on {isToday(date) ? 'today' : agendaHeading(date).toLowerCase()} — tap to add.
        </button>
      ) : (
        <div className="divide-y divide-white/[0.08]">
          {dayEvents.map((event) => {
            const { start, end } = clampToDay(event, date);
            const continues = isMultiDay(event) && start.getTime() > new Date(event.start_at).getTime();
            const runsOn = isMultiDay(event) && end.getTime() < effectiveEnd(event).getTime();
            const onNow = showingToday && !event.all_day && start <= now && effectiveEnd(event) >= now;
            const meta = [event.customer?.name, event.location].filter(Boolean).join(' · ');

            return (
              <button key={event.id} type="button" onClick={() => onEventTap(event)} className={rowCn}>
                {/* Time column — fixed width so every title lines up */}
                <span className="w-[54px] shrink-0 pt-0.5">
                  <span className="block text-[12px] font-semibold tabular-nums text-white">
                    {event.all_day ? 'All day' : continues ? 'Cont.' : format(start, 'HH:mm')}
                  </span>
                  {!event.all_day && (
                    <span className="block text-[11px] tabular-nums text-white">
                      {runsOn ? '→' : format(end, 'HH:mm')}
                    </span>
                  )}
                </span>

                {/* Colour spine — a bar, not a dot, so it reads as a block of time */}
                <span
                  className="mt-0.5 w-[3px] shrink-0 self-stretch rounded-full"
                  style={{ backgroundColor: event.colour }}
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
                  </span>
                  {meta && (
                    <span className="mt-0.5 block truncate text-[12px] leading-snug text-white">
                      {meta}
                    </span>
                  )}
                </span>

                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-elec-yellow" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarAgendaStrip;
