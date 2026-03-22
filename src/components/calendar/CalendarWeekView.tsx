import { useMemo, useEffect, useRef, useState } from 'react';
import { startOfWeek, addDays, isToday, format, differenceInMinutes, parseISO } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarWeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  workingHoursStart: number;
  workingHoursEnd: number;
  onEventTap: (event: CalendarEvent) => void;
  onTimeSlotTap: (date: Date, hour: number) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const HOUR_HEIGHT = 56; // px per hour
const TIME_COL = 42; // width of time gutter

const CalendarWeekView = ({
  currentDate,
  events,
  workingHoursStart,
  workingHoursEnd,
  onEventTap,
  onTimeSlotTap,
  onSwipeLeft,
  onSwipeRight,
}: CalendarWeekViewProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: false,
    delta: 50,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const hours = useMemo(() => {
    const start = Math.max(0, workingHoursStart - 2);
    const end = Math.min(23, workingHoursEnd + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [workingHoursStart, workingHoursEnd]);

  const firstHour = hours[0];
  const showNowLine = weekDays.some((d) => isToday(d));

  // Update "now" every minute
  useEffect(() => {
    if (!showNowLine) return;
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, [showNowLine]);

  // Auto-scroll to current time on mount
  useEffect(() => {
    if (!scrollRef.current || !showNowLine) return;
    const nowHour = new Date().getHours();
    const scrollTarget = Math.max(0, (nowHour - firstHour - 2) * HOUR_HEIGHT);
    scrollRef.current.scrollTop = scrollTarget;
  }, [firstHour, showNowLine]);

  // Current time indicator position
  const nowLineTop = useMemo(() => {
    if (!showNowLine) return -1;
    const minutesSinceFirstHour = differenceInMinutes(
      now,
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), firstHour)
    );
    return (minutesSinceFirstHour / 60) * HOUR_HEIGHT;
  }, [now, firstHour, showNowLine]);

  // Today column index for the now-line
  const todayIndex = weekDays.findIndex((d) => isToday(d));

  // Group events by day
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const key = format(parseISO(event.start_at), 'yyyy-MM-dd');
      const existing = map.get(key) ?? [];
      existing.push(event);
      map.set(key, existing);
    });
    return map;
  }, [events]);

  return (
    <div {...swipeHandlers} className="select-none">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Day headers */}
        <div
          className="grid border-b border-white/[0.06]"
          style={{ gridTemplateColumns: `${TIME_COL}px repeat(7, 1fr)` }}
        >
          <div className="h-14" />
          {weekDays.map((day, i) => {
            const today = isToday(day);
            const isWeekend = i >= 5;
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'flex flex-col items-center justify-center h-14 gap-0.5',
                  today && 'bg-elec-yellow/5'
                )}
              >
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider',
                    today ? 'text-elec-yellow' : isWeekend ? 'text-elec-yellow/60' : 'text-white'
                  )}
                >
                  {format(day, 'EEE')}
                </span>
                <div
                  className={cn(
                    'w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold',
                    today && 'bg-elec-yellow text-black',
                    !today && 'text-white'
                  )}
                >
                  {format(day, 'd')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Time grid (scrollable) */}
        <div ref={scrollRef} className="overflow-y-auto max-h-[calc(100vh-280px)]">
          <div
            className="grid relative"
            style={{ gridTemplateColumns: `${TIME_COL}px repeat(7, 1fr)` }}
          >
            {hours.map((hour) => {
              const isWorkingHour = hour >= workingHoursStart && hour < workingHoursEnd;
              return (
                <div key={hour} className="contents">
                  {/* Time label */}
                  <div
                    className={cn(
                      'flex items-start justify-end pr-1.5 -mt-[6px] text-[10px] font-bold tabular-nums',
                      isWorkingHour ? 'text-white' : 'text-white opacity-50'
                    )}
                    style={{ height: HOUR_HEIGHT }}
                  >
                    {format(new Date(2000, 0, 1, hour), 'HH')}
                  </div>

                  {/* Day columns */}
                  {weekDays.map((day, dayIdx) => {
                    const isWeekend = dayIdx >= 5;
                    return (
                      <button
                        key={`${day.toISOString()}-${hour}`}
                        type="button"
                        onClick={() => onTimeSlotTap(day, hour)}
                        className={cn(
                          'border-t border-l border-white/[0.04] touch-manipulation active:bg-white/[0.06] relative',
                          isWorkingHour
                            ? isWeekend
                              ? 'bg-white/[0.015]'
                              : 'bg-white/[0.025]'
                            : 'bg-transparent'
                        )}
                        style={{ height: HOUR_HEIGHT }}
                      >
                        {/* Half-hour line */}
                        <div
                          className="absolute left-0 right-0 h-px bg-white/[0.025]"
                          style={{ top: HOUR_HEIGHT / 2 }}
                        />
                      </button>
                    );
                  })}
                </div>
              );
            })}

            {/* Current time indicator */}
            {showNowLine && nowLineTop >= 0 && nowLineTop <= hours.length * HOUR_HEIGHT && (
              <div
                className="absolute left-0 right-0 z-20 pointer-events-none"
                style={{
                  top: nowLineTop,
                  gridTemplateColumns: `${TIME_COL}px repeat(7, 1fr)`,
                  display: 'grid',
                }}
              >
                <div className="flex items-center justify-end pr-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                </div>
                {weekDays.map((day, i) => (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      'h-[2px]',
                      i === todayIndex
                        ? 'bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.3)]'
                        : 'bg-transparent'
                    )}
                  />
                ))}
              </div>
            )}

            {/* Event blocks overlay */}
            {weekDays.map((day, dayIndex) => {
              const key = format(day, 'yyyy-MM-dd');
              const dayEvents = eventsByDay.get(key) ?? [];

              return dayEvents.map((event) => {
                const eventStart = parseISO(event.start_at);
                const eventEnd = parseISO(event.end_at);
                const topMinutes = differenceInMinutes(
                  eventStart,
                  new Date(day.getFullYear(), day.getMonth(), day.getDate(), firstHour)
                );
                const durationMinutes = Math.max(differenceInMinutes(eventEnd, eventStart), 15);
                const top = Math.max(0, (topMinutes / 60) * HOUR_HEIGHT);
                const height = Math.max(20, (durationMinutes / 60) * HOUR_HEIGHT);

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventTap(event);
                    }}
                    className="absolute rounded-lg px-1 py-0.5 overflow-hidden text-left touch-manipulation active:scale-[0.97] transition-transform z-10"
                    style={{
                      top,
                      height,
                      left: `calc(${TIME_COL}px + ${(dayIndex / 7) * 100}% * (7 / 7) + 2px)`,
                      width: `calc(${100 / 7}% - 3px)`,
                      backgroundColor: event.colour + '28',
                      borderLeft: `2px solid ${event.colour}`,
                      boxShadow: `0 1px 4px ${event.colour}15`,
                    }}
                  >
                    <span className="text-[9px] font-bold text-white line-clamp-1 leading-tight">
                      {event.title}
                    </span>
                    {height > 28 && (
                      <span className="text-[8px] text-white line-clamp-1">
                        {format(eventStart, 'HH:mm')}
                      </span>
                    )}
                  </button>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWeekView;
