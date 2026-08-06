import { useMemo, useEffect, useRef, useState } from 'react';
import { startOfWeek, addDays, isToday, format, differenceInMinutes } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn } from './calendarStyles';
import { eventsOnDay, isMultiDay, layoutDayEvents } from './eventUtils';
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

const HOUR_HEIGHT = 56;
const TIME_COL = 42;

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
  const todayIndex = weekDays.findIndex((d) => isToday(d));

  /**
   * Per-day layout. Timed events are positioned in the grid; anything all-day
   * or running across days goes to the banner instead — it has no start time on
   * the middle days to place it against.
   */
  const perDay = useMemo(
    () =>
      weekDays.map((day) => {
        const onDay = eventsOnDay(events, day);
        return {
          day,
          banner: onDay.filter((e) => e.all_day || isMultiDay(e)),
          timed: layoutDayEvents(
            onDay.filter((e) => !isMultiDay(e)),
            day
          ),
        };
      }),
    [weekDays, events]
  );

  const hasBanner = perDay.some((d) => d.banner.length > 0);

  useEffect(() => {
    if (!showNowLine) return;
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, [showNowLine]);

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

  const gridColumns = `${TIME_COL}px repeat(7, 1fr)`;

  return (
    <div {...swipeHandlers} className={cn(cardCn, 'select-none overflow-hidden')}>
      {/* Day headers */}
      <div
        className="grid border-b border-white/[0.10]"
        style={{ gridTemplateColumns: gridColumns }}
      >
        <div className="h-14" />
        {weekDays.map((day) => {
          const today = isToday(day);
          return (
            <div
              key={day.toISOString()}
              className={cn(
                'flex h-14 flex-col items-center justify-center gap-0.5',
                today && 'bg-elec-yellow/[0.06]'
              )}
            >
              <span className={eyebrowCn}>{format(day, 'EEEEE')}</span>
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold tabular-nums',
                  today ? 'bg-elec-yellow text-black' : 'text-white'
                )}
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>

      {/* All-day / multi-day banner row */}
      {hasBanner && (
        <div
          className="grid border-b border-white/[0.10]"
          style={{ gridTemplateColumns: gridColumns }}
        >
          <div className="flex items-start justify-end pr-1.5 pt-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
              All
            </span>
          </div>
          {perDay.map(({ day, banner }) => (
            <div key={day.toISOString()} className="space-y-1 px-0.5 py-1.5">
              {banner.slice(0, 2).map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onEventTap(event)}
                  className="block w-full truncate rounded px-1 py-0.5 text-left text-[9px] font-semibold text-white touch-manipulation"
                  style={{
                    backgroundColor: `${event.colour}30`,
                    borderLeft: `2px solid ${event.colour}`,
                  }}
                >
                  {event.title}
                </button>
              ))}
              {banner.length > 2 && (
                <span className="block px-1 text-[9px] font-semibold tabular-nums text-white">
                  +{banner.length - 2}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Time grid */}
      <div ref={scrollRef} className="max-h-[calc(100vh-340px)] overflow-y-auto">
        <div className="relative grid" style={{ gridTemplateColumns: gridColumns }}>
          {hours.map((hour) => {
            const working = hour >= workingHoursStart && hour < workingHoursEnd;
            return (
              <div key={hour} className="contents">
                <div
                  className={cn(
                    '-mt-[6px] flex items-start justify-end pr-1.5',
                    !working && 'opacity-55'
                  )}
                  style={{ height: HOUR_HEIGHT }}
                >
                  <span className="text-[10px] font-semibold tabular-nums text-white">
                    {format(new Date(2000, 0, 1, hour), 'HH')}
                  </span>
                </div>

                {weekDays.map((day, dayIdx) => (
                  <button
                    key={`${day.toISOString()}-${hour}`}
                    type="button"
                    onClick={() => onTimeSlotTap(day, hour)}
                    className={cn(
                      'relative border-l border-t border-white/[0.05] touch-manipulation active:bg-white/[0.06]',
                      working
                        ? dayIdx >= 5
                          ? 'bg-white/[0.02]'
                          : 'bg-white/[0.03]'
                        : 'bg-transparent'
                    )}
                    style={{ height: HOUR_HEIGHT }}
                  >
                    <span
                      className="absolute inset-x-0 h-px bg-white/[0.03]"
                      style={{ top: HOUR_HEIGHT / 2 }}
                    />
                  </button>
                ))}
              </div>
            );
          })}

          {/* Now line — yellow, matching the day view and the rest of the app */}
          {showNowLine && nowLineTop >= 0 && nowLineTop <= hours.length * HOUR_HEIGHT && (
            <div
              className="pointer-events-none absolute inset-x-0 z-20 grid"
              style={{ top: nowLineTop, gridTemplateColumns: gridColumns }}
            >
              <div className="flex items-center justify-end pr-0.5">
                <span className="h-2.5 w-2.5 rounded-full bg-elec-yellow shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              </div>
              {weekDays.map((day, i) => (
                <div
                  key={day.toISOString()}
                  className={cn('h-[2px]', i === todayIndex ? 'bg-elec-yellow' : 'bg-transparent')}
                />
              ))}
            </div>
          )}

          {/* Event blocks */}
          {perDay.map(({ day, timed }, dayIndex) =>
            timed.map(({ event, start, end, column, columns }) => {
              const topMinutes = differenceInMinutes(
                start,
                new Date(day.getFullYear(), day.getMonth(), day.getDate(), firstHour)
              );
              const duration = Math.max(differenceInMinutes(end, start), 15);
              const top = Math.max(0, (topMinutes / 60) * HOUR_HEIGHT);
              const height = Math.max(20, (duration / 60) * HOUR_HEIGHT);
              // The seven day columns share the width LEFT OVER after the time
              // gutter, so a plain `dayIndex * (100/7)%` — which is what this
              // used to do — drifts a whole gutter's width by Sunday.
              const track = `(100% - ${TIME_COL}px)`;
              const offset = dayIndex / 7 + column / columns / 7;
              const widthFraction = 1 / 7 / columns;

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventTap(event);
                  }}
                  className="absolute z-10 overflow-hidden rounded-md px-1 py-0.5 text-left touch-manipulation active:scale-[0.97]"
                  style={{
                    top,
                    height,
                    left: `calc(${TIME_COL}px + ${track} * ${offset.toFixed(6)} + 2px)`,
                    width: `calc(${track} * ${widthFraction.toFixed(6)} - 3px)`,
                    backgroundColor: `${event.colour}2E`,
                    borderLeft: `2px solid ${event.colour}`,
                  }}
                >
                  <span className="line-clamp-1 text-[9px] font-semibold leading-tight text-white">
                    {event.title}
                  </span>
                  {height > 28 && (
                    <span className="text-[8px] tabular-nums text-white">
                      {format(start, 'HH:mm')}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarWeekView;
