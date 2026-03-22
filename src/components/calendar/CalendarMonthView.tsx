import { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  format,
} from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import CalendarEventDot from './CalendarEventDot';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarMonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  selectedDate?: Date;
}

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarMonthView = ({
  currentDate,
  events,
  onDateSelect,
  onSwipeLeft,
  onSwipeRight,
  selectedDate,
}: CalendarMonthViewProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: false,
    delta: 50,
  });

  // Build calendar grid (Monday start)
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentDate]);

  // Map events to day keys for quick lookup
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const key = format(new Date(event.start_at), 'yyyy-MM-dd');
      const existing = map.get(key) ?? [];
      existing.push(event);
      map.set(key, existing);
    });
    return map;
  }, [events]);

  return (
    <div {...swipeHandlers} className="select-none">
      {/* Card wrapper */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-white/[0.06]">
          {WEEKDAY_LABELS.map((label, i) => (
            <div
              key={label}
              className={cn(
                'text-center text-[11px] font-bold uppercase tracking-wider py-3',
                i >= 5 ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const key = format(day, 'yyyy-MM-dd');
            const dayEvents = eventsByDay.get(key) ?? [];
            const inMonth = isSameMonth(day, currentDate);
            const today = isToday(day);
            const selected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isWeekend = i % 7 >= 5;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onDateSelect(day)}
                className={cn(
                  'relative flex flex-col items-center justify-start pt-2 pb-1.5 min-h-[60px] touch-manipulation transition-all',
                  !inMonth && 'opacity-40',
                  isWeekend && inMonth && 'bg-white/[0.015]',
                  !today && !selected && 'active:bg-white/[0.06]'
                )}
              >
                {/* Date number */}
                <div
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all',
                    today && !selected && 'bg-elec-yellow text-black',
                    selected && 'bg-blue-500 text-white shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                    !today && !selected && 'text-white'
                  )}
                >
                  {format(day, 'd')}
                </div>

                {/* Event dots (max 3 visible) */}
                {dayEvents.length > 0 && (
                  <div className="flex items-center gap-[3px] mt-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <CalendarEventDot
                        key={event.id}
                        colour={event.colour}
                        className="w-[5px] h-[5px]"
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] text-white font-bold ml-0.5">
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonthView;
