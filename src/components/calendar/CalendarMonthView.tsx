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

const WEEKDAY_LABELS_FULL = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAY_LABELS_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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
      {/* Grid — flat on mobile, subtle border on sm+. Dense rows so the agenda
          below the grid is visible without scrolling on a phone. */}
      <div className="rounded-xl sm:border sm:border-white/[0.06] overflow-hidden">
        {/* Weekday headers — single letters on mobile, full on sm+ */}
        <div className="grid grid-cols-7">
          {WEEKDAY_LABELS_FULL.map((label, i) => (
            <div
              key={label + i}
              className={cn(
                'text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] py-1.5 sm:py-2',
                i >= 5 ? 'text-white/35' : 'text-white/45'
              )}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{WEEKDAY_LABELS_SHORT[i]}</span>
            </div>
          ))}
        </div>

        {/* Day cells — tighter on mobile (~46px) so agenda fits */}
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
                  'relative flex flex-col items-center justify-start pt-1.5 pb-1 min-h-[46px] sm:min-h-[56px] touch-manipulation transition-colors',
                  !inMonth && 'opacity-35',
                  isWeekend && inMonth && 'bg-white/[0.015]',
                  'hover:bg-white/[0.03] active:bg-white/[0.05]'
                )}
              >
                {/* Date number */}
                <div
                  className={cn(
                    'w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[13px] sm:text-sm font-semibold transition-colors',
                    today && !selected && 'bg-elec-yellow text-black',
                    selected && !today && 'bg-white/[0.12] text-white ring-1 ring-white/30',
                    selected && today && 'bg-elec-yellow text-black ring-2 ring-white/50',
                    !today && !selected && 'text-white'
                  )}
                >
                  {format(day, 'd')}
                </div>

                {/* Event dots (max 3 visible) */}
                {dayEvents.length > 0 && (
                  <div className="flex items-center gap-[3px] mt-0.5">
                    {dayEvents.slice(0, 3).map((event) => (
                      <CalendarEventDot
                        key={event.id}
                        colour={event.colour}
                        className="w-[4px] h-[4px] sm:w-[5px] sm:h-[5px]"
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] text-white/60 font-semibold ml-0.5 tabular-nums">
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
