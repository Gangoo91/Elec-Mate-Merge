import { useMemo, useEffect, useRef, useState } from 'react';
import { format, differenceInMinutes, parseISO, isSameDay, isToday } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarDayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  workingHoursStart: number;
  workingHoursEnd: number;
  onEventTap: (event: CalendarEvent) => void;
  onTimeSlotTap: (date: Date, hour: number) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const HOUR_HEIGHT = 64; // px per hour — slightly taller for breathing room
const TIME_COL = 56; // width of time gutter

const CalendarDayView = ({
  currentDate,
  events,
  workingHoursStart,
  workingHoursEnd,
  onEventTap,
  onTimeSlotTap,
  onSwipeLeft,
  onSwipeRight,
}: CalendarDayViewProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: false,
    delta: 50,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(new Date());

  const hours = useMemo(() => {
    const start = Math.max(0, workingHoursStart - 2);
    const end = Math.min(23, workingHoursEnd + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [workingHoursStart, workingHoursEnd]);

  const dayEvents = useMemo(
    () => events.filter((e) => isSameDay(parseISO(e.start_at), currentDate)),
    [events, currentDate]
  );

  const allDayEvents = useMemo(() => dayEvents.filter((e) => e.all_day), [dayEvents]);
  const timedEvents = useMemo(() => dayEvents.filter((e) => !e.all_day), [dayEvents]);

  const firstHour = hours[0];
  const showNowLine = isToday(currentDate);

  // Update the "now" time every minute
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

  return (
    <div {...swipeHandlers} className="select-none">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* All-day events */}
        {allDayEvents.length > 0 && (
          <div className="px-4 py-3 border-b border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              All day
            </span>
            {allDayEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => onEventTap(event)}
                className="w-full text-left px-3 py-2.5 rounded-xl touch-manipulation active:scale-[0.98] transition-transform"
                style={{
                  backgroundColor: event.colour + '25',
                  borderLeft: `3px solid ${event.colour}`,
                }}
              >
                <span className="text-sm font-bold text-white">{event.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Time grid (scrollable) */}
        <div ref={scrollRef} className="relative overflow-y-auto max-h-[calc(100vh-260px)]">
          {hours.map((hour) => {
            const isWorkingHour = hour >= workingHoursStart && hour < workingHoursEnd;
            return (
              <button
                key={hour}
                type="button"
                onClick={() => onTimeSlotTap(currentDate, hour)}
                className={cn(
                  'flex items-start w-full touch-manipulation active:bg-white/[0.06] relative',
                  isWorkingHour ? 'bg-white/[0.025]' : 'bg-transparent'
                )}
                style={{ height: HOUR_HEIGHT }}
              >
                {/* Time label */}
                <div
                  className="flex-shrink-0 text-right pr-3 -mt-[7px]"
                  style={{ width: TIME_COL }}
                >
                  <span
                    className={cn(
                      'text-[11px] font-bold tabular-nums',
                      isWorkingHour ? 'text-white' : 'text-white/25'
                    )}
                  >
                    {format(new Date(2000, 0, 1, hour), 'HH:mm')}
                  </span>
                </div>

                {/* Grid area */}
                <div className="flex-1 h-full relative">
                  {/* Hour line */}
                  <div
                    className={cn(
                      'absolute top-0 left-0 right-0 h-px',
                      isWorkingHour ? 'bg-white/[0.08]' : 'bg-white/[0.04]'
                    )}
                  />
                  {/* Half-hour line */}
                  <div
                    className="absolute left-0 right-0 h-px bg-white/[0.03]"
                    style={{ top: HOUR_HEIGHT / 2 }}
                  />
                </div>
              </button>
            );
          })}

          {/* Current time indicator */}
          {showNowLine && nowLineTop >= 0 && nowLineTop <= hours.length * HOUR_HEIGHT && (
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
              style={{ top: nowLineTop }}
            >
              <div className="flex items-center justify-end pr-1" style={{ width: TIME_COL }}>
                <div className="px-1.5 py-0.5 rounded bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                  <span className="text-[9px] font-bold text-white tabular-nums">
                    {format(now, 'HH:mm')}
                  </span>
                </div>
              </div>
              <div className="flex-1 h-[2px] bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.3)]" />
            </div>
          )}

          {/* Event blocks overlay */}
          {timedEvents.map((event) => {
            const eventStart = parseISO(event.start_at);
            const eventEnd = parseISO(event.end_at);
            const topMinutes = differenceInMinutes(
              eventStart,
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                firstHour
              )
            );
            const durationMinutes = Math.max(differenceInMinutes(eventEnd, eventStart), 15);
            const top = Math.max(0, (topMinutes / 60) * HOUR_HEIGHT);
            const height = Math.max(32, (durationMinutes / 60) * HOUR_HEIGHT);

            return (
              <button
                key={event.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEventTap(event);
                }}
                className="absolute rounded-xl px-3 py-2 overflow-hidden text-left touch-manipulation active:scale-[0.98] transition-transform z-10"
                style={{
                  top,
                  height,
                  left: TIME_COL + 4,
                  right: 8,
                  backgroundColor: event.colour + '20',
                  borderLeft: `3px solid ${event.colour}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 2px 8px ${event.colour}15`,
                }}
              >
                <span className="text-sm font-bold text-white line-clamp-1">{event.title}</span>
                {height > 40 && (
                  <span className="text-xs text-white">
                    {format(eventStart, 'HH:mm')} – {format(eventEnd, 'HH:mm')}
                  </span>
                )}
                {height > 60 && event.location && (
                  <span className="text-[11px] text-white line-clamp-1 mt-0.5">
                    {event.location}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarDayView;
