import { useMemo, useEffect, useRef, useState } from 'react';
import { startOfWeek, addDays, isToday, isSameDay, format, differenceInMinutes } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn } from './calendarStyles';
import { displayColour, effectiveEnd, eventsOnDay, isMultiDay, layoutDayEvents } from './eventUtils';
import { useDragMove } from './useDragMove';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarWeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  workingHoursStart: number;
  workingHoursEnd: number;
  onEventTap: (event: CalendarEvent) => void;
  /** `minute` is 0 or 30 — the half of the hour cell that was tapped. */
  onTimeSlotTap: (date: Date, hour: number, minute?: number) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Days worked (0 = Sunday). Days off shade like weekends used to. */
  workingDays?: number[];
  /** How many columns. 7 = the week; 3 = three days from `currentDate`. */
  days?: number;
  /** `week` starts the columns on Monday; `day` starts them on `currentDate`. */
  anchor?: 'week' | 'day';
  /** Drag a block to a new time or column (mouse and pen only). */
  onMoveEvent?: (event: CalendarEvent, minuteShift: number, dayShift: number) => void;
}
const DEFAULT_DAYS = [1, 2, 3, 4, 5];

// Desktop-only from ELE-1755 (the phone shows a day strip and a rail), so the
// rows can be tall enough to read and the time gutter wide enough for "08".
const HOUR_HEIGHT = 64;
const TIME_COL = 48;
/** Continuous all-day bars per week, before the rest collapse into "+n". */
const MAX_BANNER_LANES = 3;

/**
 * One all-day or multi-day event as a bar across the columns it covers.
 *
 * It used to be drawn once per day it touched — a two-day job appeared twice,
 * side by side, and each copy overflowed its 1fr column into the next. Same
 * lane packing as the month view: one event, one bar, first free lane.
 */
interface BannerSegment {
  event: CalendarEvent;
  startCol: number;
  endCol: number;
  opensLeft: boolean;
  closesRight: boolean;
}
function packBanner(
  weekDays: Date[],
  events: CalendarEvent[]
): { lanes: BannerSegment[][]; hidden: number } {
  const n = weekDays.length;
  const weekStart = weekDays[0];
  const weekEnd = weekDays[n - 1];
  const spanning = events
    .filter((e) => e.all_day || isMultiDay(e))
    .filter((e) => new Date(e.start_at) <= addDays(weekEnd, 1) && effectiveEnd(e) >= weekStart);
  const colOf = (date: Date) => weekDays.findIndex((d) => isSameDay(d, date));
  const lanes: BannerSegment[][] = [];
  let hidden = 0;
  for (const event of spanning) {
    const rawStart = colOf(new Date(event.start_at));
    const rawEnd = colOf(effectiveEnd(event));
    const seg: BannerSegment = {
      event,
      startCol: rawStart === -1 ? 0 : rawStart,
      endCol: rawEnd === -1 ? n - 1 : rawEnd,
      opensLeft: rawStart !== -1,
      closesRight: rawEnd !== -1,
    };
    const lane = lanes.find((l) =>
      l.every((s) => s.endCol < seg.startCol || s.startCol > seg.endCol)
    );
    if (lane) lane.push(seg);
    else if (lanes.length < MAX_BANNER_LANES) lanes.push([seg]);
    else hidden++;
  }
  return { lanes, hidden };
}

const CalendarWeekView = ({
  currentDate,
  events,
  workingHoursStart,
  workingHoursEnd,
  onEventTap,
  onTimeSlotTap,
  onSwipeLeft,
  onSwipeRight,
  workingDays = DEFAULT_DAYS,
  days = 7,
  anchor = 'week',
  onMoveEvent,
}: CalendarWeekViewProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: false,
    delta: 50,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(new Date());

  const weekStart =
    anchor === 'day'
      ? new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      : startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = useMemo(
    () => Array.from({ length: days }, (_, i) => addDays(weekStart, i)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [weekStart.getTime(), days]
  );

  /*
   * Drag to move. The column width is measured, not assumed: the seven (or
   * three) columns share what is left after the time gutter.
   */
  const [columnWidth, setColumnWidth] = useState<number | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => setColumnWidth((el.clientWidth - TIME_COL) / days);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [days]);
  const dragMove = useDragMove({
    hourHeight: HOUR_HEIGHT,
    columnWidth,
    columns: days,
    enabled: !!onMoveEvent,
    onMove: (event, minuteShift, dayShift) => onMoveEvent?.(event, minuteShift, dayShift),
  });

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
          timed: layoutDayEvents(
            onDay.filter((e) => !e.all_day && !isMultiDay(e)),
            day
          ),
        };
      }),
    [weekDays, events]
  );

  const banner = useMemo(() => packBanner(weekDays, events), [weekDays, events]);
  const hasBanner = banner.lanes.length > 0 || banner.hidden > 0;

  useEffect(() => {
    if (!showNowLine) return;
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, [showNowLine]);

  /*
   * Land on the start of the working day, not two hours before now.
   *
   * Scrolling to "now" hid the morning: opened at three in the afternoon the
   * grid began at 13:00, with the 08:30 job above the fold and the empty
   * evening filling the screen. The morning is where the jobs are.
   */
  useEffect(() => {
    if (!scrollRef.current) return;
    // -8 keeps the first hour label whole; it sits 6px above its line.
    scrollRef.current.scrollTop = Math.max(
      0,
      (workingHoursStart - 1 - firstHour) * HOUR_HEIGHT - 8
    );
  }, [firstHour, workingHoursStart, currentDate]);

  const nowLineTop = useMemo(() => {
    if (!showNowLine) return -1;
    const minutes = differenceInMinutes(
      now,
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), firstHour)
    );
    return (minutes / 60) * HOUR_HEIGHT;
  }, [now, firstHour, showNowLine]);

  const gridColumns = `${TIME_COL}px repeat(${days}, 1fr)`;

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
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
              All
            </span>
          </div>
          {/* One bar per event across the days it covers, in lanes — the
              seven day cells are only the track it is drawn along. */}
          <div className="relative col-span-7 space-y-1 py-1.5">
            {banner.lanes.map((lane, laneIndex) => (
              <div key={laneIndex} className="relative h-6">
                {lane.map((seg) => {
                  const inset = (seg.opensLeft ? 3 : 0) + (seg.closesRight ? 3 : 0);
                  return (
                    <button
                      key={`${seg.event.id}-${seg.startCol}`}
                      type="button"
                      onClick={() => onEventTap(seg.event)}
                      className={cn(
                        'absolute top-0 flex h-6 items-center overflow-hidden px-2 text-left touch-manipulation active:scale-[0.99]',
                        seg.opensLeft && 'rounded-l-md',
                        seg.closesRight && 'rounded-r-md'
                      )}
                      style={{
                        left: `calc(${(seg.startCol / days) * 100}% + ${seg.opensLeft ? 3 : 0}px)`,
                        width: `calc(${((seg.endCol - seg.startCol + 1) / days) * 100}% - ${inset}px)`,
                        backgroundColor: `${displayColour(seg.event)}30`,
                        borderLeft: seg.opensLeft ? `2px solid ${displayColour(seg.event)}` : undefined,
                      }}
                    >
                      <span className="truncate text-[12px] font-semibold text-white">
                        {seg.event.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
            {banner.hidden > 0 && (
              <span className="block px-2 text-[11px] font-semibold tabular-nums text-white">
                +{banner.hidden} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Time grid */}
      {/* Fills the window rather than stopping at its content — a time grid
          with dark space under it looked unfinished on a tall screen. */}
      <div ref={scrollRef} className="h-[calc(100vh-290px)] min-h-[480px] overflow-y-auto">
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

                {weekDays.map((day) => (
                  <button
                    key={`${day.toISOString()}-${hour}`}
                    type="button"
                    onClick={(e) =>
                      onTimeSlotTap(day, hour, e.nativeEvent.offsetY > HOUR_HEIGHT / 2 ? 30 : 0)
                    }
                    className={cn(
                      'relative border-l border-t border-white/[0.05] touch-manipulation active:bg-white/[0.06]',
                      working
                        ? !workingDays.includes(day.getDay())
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
              const offset = dayIndex / days + column / columns / days;
              const widthFraction = 1 / days / columns;
              const dragging = dragMove.drag?.id === event.id ? dragMove.drag : null;

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    dragMove.guardClick(() => onEventTap(event))();
                  }}
                  onPointerDown={dragMove.onPointerDown(event, dayIndex)}
                  onPointerMove={dragMove.onPointerMove}
                  onPointerUp={dragMove.onPointerUp}
                  onPointerCancel={dragMove.onPointerCancel}
                  className={cn(
                    'absolute z-10 flex flex-col items-start justify-start overflow-hidden rounded-md px-1.5 py-1 text-left touch-manipulation active:scale-[0.97]',
                    onMoveEvent && 'cursor-grab',
                    dragging && 'z-30 cursor-grabbing shadow-xl shadow-black/40 ring-1 ring-elec-yellow/60'
                  )}
                  style={{
                    top,
                    height,
                    transform: dragging ? `translate(${dragging.dx}px, ${dragging.dy}px)` : undefined,
                    transition: dragging ? 'none' : undefined,
                    left: `calc(${TIME_COL}px + ${track} * ${offset.toFixed(6)} + 2px)`,
                    width: `calc(${track} * ${widthFraction.toFixed(6)} - 3px)`,
                    backgroundColor: `${displayColour(event)}2E`,
                    borderLeft: `2px solid ${displayColour(event)}`,
                  }}
                >
                  <span className="line-clamp-1 text-[12px] font-semibold leading-tight text-white">
                    {event.title}
                  </span>
                  {height > 34 && (
                    <span className="text-[11px] tabular-nums text-white">
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
