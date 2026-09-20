/**
 * Seven days in a row, one tap each.
 *
 * The phone's week view used to be the desktop's seven-column time grid
 * squeezed into 48px columns — every title read "M20…", and the morning was
 * scrolled out of sight. A phone cannot show a week of detail; it can show a
 * week's SHAPE and one day's detail. This is the shape: which days are busy,
 * how busy, which is today, which is chosen. The chosen day's rail sits
 * underneath it. Next week keeps the weekday, so Monday to Monday is one tap.
 *
 * Also sits above the day view on every size, because "the next day" is the
 * commonest move in a diary and the header chevrons are a long way from the
 * thumb.
 */
import { useMemo } from 'react';
import { addDays, format, isSameDay, isToday, startOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types/calendar';
import { eyebrowCn } from './calendarStyles';
import { displayColour, eventsOnDay, isSyntheticEvent, occupiesTime, totalHours } from './eventUtils';

interface WeekDayStripProps {
  /** Any day in the week to show. */
  currentDate: Date;
  events: CalendarEvent[];
  workingHoursStart: number;
  workingHoursEnd: number;
  /** Days worked (0 = Sunday). A day off dims as a whole chip. */
  workingDays?: number[];
  onSelect: (date: Date) => void;
}

const WeekDayStrip = ({
  currentDate,
  events,
  workingHoursStart,
  workingHoursEnd,
  workingDays,
  onSelect,
}: WeekDayStripProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const dayHours = Math.max(1, workingHoursEnd - workingHoursStart);

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const day = addDays(weekStart, i);
        const onDay = eventsOnDay(events, day).filter(
          (e) => !isSyntheticEvent(e) && occupiesTime(e)
        );
        const hours = totalHours(onDay, dayHours);
        return {
          day,
          count: onDay.length,
          load: Math.min(1, hours / dayHours),
          colours: onDay.slice(0, 3).map((e) => displayColour(e)),
        };
      }),
    [weekStart, events, dayHours]
  );

  return (
    <div className="flex gap-1">
      {days.map(({ day, count, load, colours }) => {
        const today = isToday(day);
        const selected = isSameDay(day, currentDate);
        const dayOff = workingDays ? !workingDays.includes(day.getDay()) : false;
        return (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => onSelect(day)}
            aria-pressed={selected}
            aria-label={`${format(day, 'EEEE d MMMM')}, ${count} booked`}
            className={cn(
              'flex min-h-[68px] min-w-0 flex-1 flex-col items-center justify-start gap-1 rounded-xl border pb-1.5 pt-1.5 transition-colors touch-manipulation active:scale-[0.97]',
              selected
                ? 'border-white/[0.30] bg-white/[0.08]'
                : 'border-transparent hover:bg-white/[0.04]',
              // A day off dims as a unit — the type stays white.
              dayOff && !selected && 'opacity-45'
            )}
          >
            <span className={eyebrowCn}>{format(day, 'EEEEE')}</span>
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-semibold tabular-nums',
                today ? 'bg-elec-yellow text-black' : 'text-white'
              )}
            >
              {format(day, 'd')}
            </span>
            {/* How full the day is, as a bar. Three dots said "something is
                on"; the bar says "half a day" or "rammed" at a glance. */}
            <span className="flex h-[3px] w-8 overflow-hidden rounded-full bg-white/[0.10]">
              <span
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(load * 100)}%`,
                  backgroundColor: colours[0] ?? '#F59E0B',
                }}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default WeekDayStrip;
