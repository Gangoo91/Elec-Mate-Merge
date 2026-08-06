import { useMemo, useEffect, useRef, useState } from 'react';
import { format, differenceInMinutes, isToday, startOfDay } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn } from './calendarStyles';
import { effectiveEnd, eventsOnDay, isMultiDay, layoutDayEvents } from './eventUtils';
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

const HOUR_HEIGHT = 64;
const TIME_COL = 56;

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

  // Every event touching this day, not only those starting on it — day two of
  // a three-day job belongs here as much as day one.
  const dayEvents = useMemo(() => eventsOnDay(events, currentDate), [events, currentDate]);
  const bannerEvents = useMemo(
    () => dayEvents.filter((e) => e.all_day || isMultiDay(e)),
    [dayEvents]
  );
  const positioned = useMemo(
    () => layoutDayEvents(dayEvents.filter((e) => !isMultiDay(e)), currentDate),
    [dayEvents, currentDate]
  );

  const firstHour = hours[0];
  const showNowLine = isToday(currentDate);

  useEffect(() => {
    if (!showNowLine) return;
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, [showNowLine]);

  // Land on the current time rather than at midnight.
  useEffect(() => {
    if (!scrollRef.current || !showNowLine) return;
    const nowHour = new Date().getHours();
    scrollRef.current.scrollTop = Math.max(0, (nowHour - firstHour - 2) * HOUR_HEIGHT);
  }, [firstHour, showNowLine]);

  const nowLineTop = useMemo(() => {
    if (!showNowLine) return -1;
    const minutes = differenceInMinutes(
      now,
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), firstHour)
    );
    return (minutes / 60) * HOUR_HEIGHT;
  }, [now, firstHour, showNowLine]);

  return (
    <div {...swipeHandlers} className={cn(cardCn, 'select-none overflow-hidden')}>
      {/* All-day and multi-day work — a banner, not a block in the grid. A job
          running Mon–Wed has no start time on the Tuesday to place it at. */}
      {bannerEvents.length > 0 && (
        <div className="space-y-2 border-b border-white/[0.10] px-4 py-3 sm:px-5">
          <span className={eyebrowCn}>All day</span>
          {bannerEvents.map((event) => {
            // startOfDay, not currentDate.setHours(...) — the latter mutates
            // the prop, so the whole page would silently jump to midnight.
            const continues = new Date(event.start_at) < startOfDay(currentDate);
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onEventTap(event)}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left touch-manipulation active:scale-[0.98]"
                style={{
                  backgroundColor: `${event.colour}25`,
                  borderLeft: `3px solid ${event.colour}`,
                }}
              >
                <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                  {event.title}
                </span>
                {continues && (
                  <span className="shrink-0 text-[11px] font-medium text-white">
                    until {format(effectiveEnd(event), 'EEE d')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Time grid */}
      <div ref={scrollRef} className="relative max-h-[calc(100vh-320px)] overflow-y-auto">
        {hours.map((hour) => {
          const working = hour >= workingHoursStart && hour < workingHoursEnd;
          return (
            <button
              key={hour}
              type="button"
              onClick={() => onTimeSlotTap(currentDate, hour)}
              className={cn(
                'relative flex w-full items-start touch-manipulation active:bg-white/[0.06]',
                working ? 'bg-white/[0.03]' : 'bg-transparent'
              )}
              style={{ height: HOUR_HEIGHT }}
            >
              {/* Hours outside the working day dim as a unit rather than
                  switching to a grey — the type stays white. */}
              <span
                className={cn('-mt-[7px] shrink-0 pr-3 text-right', !working && 'opacity-55')}
                style={{ width: TIME_COL }}
              >
                <span className="text-[11px] font-semibold tabular-nums text-white">
                  {format(new Date(2000, 0, 1, hour), 'HH:mm')}
                </span>
              </span>

              <span className="relative h-full flex-1">
                <span
                  className={cn(
                    'absolute inset-x-0 top-0 h-px',
                    working ? 'bg-white/[0.10]' : 'bg-white/[0.05]'
                  )}
                />
                <span
                  className="absolute inset-x-0 h-px bg-white/[0.04]"
                  style={{ top: HOUR_HEIGHT / 2 }}
                />
              </span>
            </button>
          );
        })}

        {/* Now line */}
        {showNowLine && nowLineTop >= 0 && nowLineTop <= hours.length * HOUR_HEIGHT && (
          <div
            className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
            style={{ top: nowLineTop }}
          >
            <div className="flex justify-end pr-1" style={{ width: TIME_COL }}>
              <span className="rounded bg-elec-yellow px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-black">
                {format(now, 'HH:mm')}
              </span>
            </div>
            <div className="h-[2px] flex-1 bg-elec-yellow shadow-[0_0_8px_rgba(250,204,21,0.45)]" />
          </div>
        )}

        {/* Event blocks */}
        {positioned.map(({ event, start, end, column, columns }) => {
          const topMinutes = differenceInMinutes(
            start,
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              firstHour
            )
          );
          const duration = Math.max(differenceInMinutes(end, start), 15);
          const top = Math.max(0, (topMinutes / 60) * HOUR_HEIGHT);
          const height = Math.max(32, (duration / 60) * HOUR_HEIGHT);
          const widthPct = 100 / columns;

          return (
            <button
              key={event.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEventTap(event);
              }}
              className="absolute z-10 overflow-hidden rounded-xl px-3 py-2 text-left touch-manipulation active:scale-[0.98]"
              style={{
                top,
                height,
                left: `calc(${TIME_COL}px + 4px + (100% - ${TIME_COL}px - 12px) * ${
                  (column * widthPct) / 100
                })`,
                width: `calc((100% - ${TIME_COL}px - 12px) * ${widthPct / 100} - 3px)`,
                backgroundColor: `${event.colour}22`,
                borderLeft: `3px solid ${event.colour}`,
              }}
            >
              <span className="block truncate text-[14px] font-semibold text-white">
                {event.title}
              </span>
              {height > 40 && (
                <span className="block text-[12px] tabular-nums text-white">
                  {format(start, 'HH:mm')} – {format(end, 'HH:mm')}
                </span>
              )}
              {height > 62 && event.location && (
                <span className="mt-0.5 block truncate text-[11px] text-white">
                  {event.location}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDayView;
