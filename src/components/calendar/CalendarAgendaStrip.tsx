import { useMemo } from 'react';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, rowCn } from './calendarStyles';
import { eventsOnDay } from './eventUtils';
import CalendarEventRow from './CalendarEventRow';
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

  return (
    <div className={cn(cardCn, 'overflow-hidden')}>
      {/* Heading — the whole label opens Day view for this date */}
      <div className="flex items-center gap-2 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onOpenDayView}
          className="-my-2 flex min-h-11 items-center gap-1.5 touch-manipulation"
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
          className="-my-2 ml-auto flex min-h-11 items-center gap-1 px-1 text-[12px] font-semibold text-elec-yellow touch-manipulation"
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
          {dayEvents.map((event) => (
            <CalendarEventRow key={event.id} event={event} day={date} onTap={onEventTap} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarAgendaStrip;
