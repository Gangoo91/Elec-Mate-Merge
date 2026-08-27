import { useMemo } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn } from './calendarStyles';
import { buildDayShape, compareEvents, dayKey, effectiveEnd, eventsOnDay, isMultiDay } from './eventUtils';
import type { CalendarEvent } from '@/types/calendar';

interface CalendarMonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  selectedDate?: Date;
  /** Working day bounds and capacity — what makes a day "full". */
  workingHoursStart: number;
  workingHoursEnd: number;
  capacity: number;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * How many continuous bars a week row shows before the rest collapse into the
 * day's "+n". Two keeps a phone row readable; a third pushes the grid past the
 * fold and buries the agenda underneath it.
 */
const MAX_LANES = 2;
/** Vertical pitch of one lane, and where the lane stack starts in a cell. */
const LANE_PITCH = 16;
const LANE_TOP = 38;

/** A run of one event across one week row, in column terms. */
interface Segment {
  event: CalendarEvent;
  /** 0–6 within the week row. */
  startCol: number;
  endCol: number;
  /** The event itself begins here, rather than continuing from an earlier week. */
  opensLeft: boolean;
  /** The event itself ends here. */
  closesRight: boolean;
}

/**
 * Pack a week's spanning events into lanes.
 *
 * Greedy interval packing: an event takes the first lane whose segments have
 * all finished before it starts. Same principle as a Gantt row, and it keeps a
 * single event on one visual line across the whole week instead of repeating
 * it in seven unconnected cells.
 */
function packLanes(
  weekDays: Date[],
  events: CalendarEvent[]
): { lanes: Segment[][]; hidden: Map<string, number> } {
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  const spanning = events
    .filter((e) => e.all_day || isMultiDay(e))
    .filter((e) => new Date(e.start_at) <= weekEnd && effectiveEnd(e) >= weekStart)
    .sort(compareEvents);

  const colOf = (date: Date) => weekDays.findIndex((d) => isSameDay(d, date));

  const lanes: Segment[][] = [];
  const hidden = new Map<string, number>();

  for (const event of spanning) {
    const rawStart = colOf(new Date(event.start_at));
    const rawEnd = colOf(effectiveEnd(event));
    // -1 means the event runs in from the previous week, or on into the next.
    const startCol = rawStart === -1 ? 0 : rawStart;
    const endCol = rawEnd === -1 ? 6 : rawEnd;

    const segment: Segment = {
      event,
      startCol,
      endCol,
      opensLeft: rawStart !== -1,
      closesRight: rawEnd !== -1,
    };

    const lane = lanes.find((l) => l.every((s) => s.endCol < startCol || s.startCol > endCol));
    if (lane) {
      lane.push(segment);
    } else if (lanes.length < MAX_LANES) {
      lanes.push([segment]);
    } else {
      // No room for a bar — the days it covers carry it in their "+n" instead,
      // so a hidden event is still counted somewhere rather than dropped.
      for (let c = startCol; c <= endCol; c++) {
        const key = dayKey(weekDays[c]);
        hidden.set(key, (hidden.get(key) ?? 0) + 1);
      }
    }
  }

  return { lanes, hidden };
}

const CalendarMonthView = ({
  currentDate,
  events,
  onDateSelect,
  onSwipeLeft,
  onSwipeRight,
  selectedDate,
  workingHoursStart,
  workingHoursEnd,
  capacity,
}: CalendarMonthViewProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: false,
    delta: 50,
  });

  // Monday-start grid, split into week rows — bars are laid out per row, so a
  // row has to be the unit rather than one flat list of 42 cells.
  const weeks = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const gridEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
    const rows: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
    return rows;
  }, [currentDate]);

  /*
   * Which days have nothing left in them.
   *
   * The grid could say what was ON a day and never whether you could take
   * anything else — which is the question a month view is actually opened with.
   * Someone on the phone asking "when can you come?" was being made to tap into
   * days one at a time to find out.
   *
   * Same `buildDayShape` walk the day sheet uses, so a day the grid calls full
   * cannot open onto a sheet offering slots.
   */
  const fullDays = useMemo(() => {
    const full = new Set<string>();
    for (const week of weeks) {
      for (const day of week) {
        const shape = buildDayShape(
          eventsOnDay(events, day),
          day,
          workingHoursStart,
          workingHoursEnd,
          30,
          capacity
        );
        if (shape.freeMinutes === 0) full.add(dayKey(day));
      }
    }
    return full;
  }, [weeks, events, workingHoursStart, workingHoursEnd, capacity]);

  return (
    <div {...swipeHandlers} className={cn(cardCn, 'select-none overflow-hidden')}>
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-white/[0.10]">
        {WEEKDAYS.map((label) => (
          <div key={label} className={cn(eyebrowCn, 'py-2.5 text-center')}>
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label[0]}</span>
          </div>
        ))}
      </div>

      {weeks.map((weekDays, weekIndex) => {
        const { lanes, hidden } = packLanes(weekDays, events);

        return (
          <div
            key={dayKey(weekDays[0])}
            className={cn(
              'relative grid grid-cols-7',
              weekIndex > 0 && 'border-t border-white/[0.07]'
            )}
          >
            {weekDays.map((day, col) => {
              const key = dayKey(day);
              const inMonth = isSameMonth(day, currentDate);
              const today = isToday(day);
              const selected = selectedDate ? isSameDay(day, selectedDate) : false;
              const weekend = col >= 5;

              // Dots stand for timed work; anything spanning is already a bar.
              const dotted = eventsOnDay(events, day).filter((e) => !e.all_day && !isMultiDay(e));
              const overflow = hidden.get(key) ?? 0;
              const extra = dotted.length + overflow - 3;
              const full = inMonth && fullDays.has(key);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onDateSelect(day)}
                  aria-label={`${format(day, 'EEEE d MMMM')}${full ? ' — full' : ''}`}
                  aria-pressed={selected}
                  className={cn(
                    // Taller cells as the grid gets wider, so a wide window
                    // shows squares rather than stretched letterboxes.
                    'relative flex min-h-[76px] touch-manipulation flex-col items-center pt-1.5 transition-colors sm:min-h-[104px] xl:min-h-[124px]',
                    col > 0 && 'border-l border-white/[0.05]',
                    weekend && inMonth && 'bg-white/[0.02]',
                    // A day with nothing left in it. Deliberately a wash over
                    // the whole cell rather than a badge — you should be able to
                    // read the shape of a month's availability at a glance,
                    // without stopping to decode anything.
                    full && 'bg-orange-500/[0.10]',
                    // An out-of-month day dims as a whole cell. Greying the type
                    // instead would break the all-text-is-white rule and read as
                    // a different colour rather than a quieter day.
                    !inMonth && 'opacity-30',
                    'hover:bg-white/[0.04] active:bg-white/[0.06]'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums transition-colors sm:h-8 sm:w-8 sm:text-sm',
                      today && 'bg-elec-yellow text-black',
                      selected && !today && 'bg-white/[0.14] text-white ring-1 ring-white/40',
                      selected && today && 'ring-2 ring-white/60',
                      !today && !selected && 'text-white'
                    )}
                  >
                    {format(day, 'd')}
                  </span>

                  {/* Room the bar overlay is drawn into. */}
                  <span
                    aria-hidden
                    className="w-full shrink-0"
                    style={{ height: MAX_LANES * LANE_PITCH }}
                  />

                  {full && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-orange-400/60" />
                  )}

                  {/* Timed events */}
                  {(dotted.length > 0 || overflow > 0) && (
                    <span className="flex items-center gap-[3px] px-1">
                      {dotted.slice(0, 3).map((event) => (
                        <span
                          key={event.id}
                          className="h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{ backgroundColor: event.colour }}
                        />
                      ))}
                      {extra > 0 && (
                        <span className="text-[9px] font-semibold tabular-nums text-white">
                          +{extra}
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Continuous bars, laid over the cells. Non-interactive, so a tap
                anywhere on a day still selects that day. */}
            <div
              className="pointer-events-none absolute inset-x-0"
              style={{ top: LANE_TOP }}
              aria-hidden
            >
              {lanes.map((lane, laneIndex) => (
                <div key={laneIndex} className="relative" style={{ height: LANE_PITCH }}>
                  {lane.map((seg) => {
                    const inset = (seg.opensLeft ? 3 : 0) + (seg.closesRight ? 3 : 0);
                    return (
                      <div
                        key={`${seg.event.id}-${seg.startCol}`}
                        className={cn(
                          'absolute flex items-center overflow-hidden px-1.5',
                          seg.opensLeft && 'rounded-l-md',
                          seg.closesRight && 'rounded-r-md'
                        )}
                        style={{
                          left: `calc(${(seg.startCol / 7) * 100}% + ${seg.opensLeft ? 3 : 0}px)`,
                          width: `calc(${((seg.endCol - seg.startCol + 1) / 7) * 100}% - ${inset}px)`,
                          height: 12,
                          backgroundColor: `${seg.event.colour}38`,
                          borderLeft: seg.opensLeft ? `2px solid ${seg.event.colour}` : undefined,
                        }}
                      >
                        {/* A title only fits where the cells are wide enough. */}
                        {seg.opensLeft && (
                          <span className="hidden truncate text-[10px] font-medium leading-none text-white sm:inline">
                            {seg.event.title}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarMonthView;
