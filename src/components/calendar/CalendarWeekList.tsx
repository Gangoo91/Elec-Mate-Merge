/**
 * The week on a phone, as a list of seven days.
 *
 * The phone's week view used to be the day strip with ONE day's time rail under
 * it — the same screen as Day view with a sentence added, so a customer
 * reasonably said he could not see any difference between the two (ELE-1804).
 * Seven columns of time grid do not fit a phone either (every title read
 * "M20…"). What fits is what a diary on paper does: each day as a heading with
 * its bookings listed under it, read top to bottom.
 *
 * Each heading answers the two questions asked of a day: how full is it, and
 * when could someone else go in. The + on it books straight into the first free
 * slot. Tapping the heading opens that day's time rail.
 *
 * Days already gone this week fold into one line, so the list opens on today
 * without having to scroll past Monday's finished jobs on a Friday.
 */
import { useMemo, useRef, useState } from 'react';
import { addDays, format, isSameDay, isToday, isTomorrow, startOfDay, startOfWeek } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types/calendar';
import { cardCn, eyebrowCn } from './calendarStyles';
import CalendarEventRow from './CalendarEventRow';
import WeekDayStrip from './WeekDayStrip';
import { clampToDay, eventsOnDay, hoursLabel, summariseDay, summaryLine } from './eventUtils';

interface CalendarWeekListProps {
  /** Any day in the week to show. */
  currentDate: Date;
  events: CalendarEvent[];
  workingHoursStart: number;
  workingHoursEnd: number;
  workingDays: number[];
  /** Jobs that can run at once — a day is only full when this many are on. */
  capacity: number;
  onEventTap: (event: CalendarEvent) => void;
  /** Open the day's time rail. */
  onOpenDay: (date: Date) => void;
  /** Book at a given start time — the day's first gap. */
  onBookSlot: (start: Date) => void;
  /**
   * Book on a day with no gap left. No time is set, so the booking sheet
   * offers times that actually work rather than stacking a job on 08:00.
   */
  onBookDay: (date: Date) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onHaptic?: () => void;
  /**
   * Whether the bookings are in. Until they are, an empty day is unknown,
   * not free — "free all day" over a week still loading on a van's 3G is a
   * claim the electrician would take at its word.
   */
  status?: 'ready' | 'loading' | 'error';
}

function dayTitle(day: Date): string {
  if (isToday(day)) return 'Today';
  if (isTomorrow(day)) return 'Tomorrow';
  return format(day, 'EEEE');
}

const CalendarWeekList = ({
  currentDate,
  events,
  workingHoursStart,
  workingHoursEnd,
  workingDays,
  capacity,
  onEventTap,
  onOpenDay,
  onBookSlot,
  onBookDay,
  onSwipeLeft,
  onSwipeRight,
  onHaptic,
  status = 'ready',
}: CalendarWeekListProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const [focused, setFocused] = useState<Date>(currentDate);
  const [showEarlier, setShowEarlier] = useState(false);
  const sectionRefs = useRef(new Map<string, HTMLElement>());

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    trackMouse: false,
    delta: 50,
  });

  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(weekStart, i);
      return {
        day,
        // Clock order within the day, all-day work first. The shared sort puts
        // every multi-day job at the top, so a rewire starting at 10:30 sat
        // above the 09:00 quote visit and the time column read backwards.
        listed: eventsOnDay(events, day).sort((a, b) => {
          if (a.all_day !== b.all_day) return a.all_day ? -1 : 1;
          return clampToDay(a, day).start.getTime() - clampToDay(b, day).start.getTime();
        }),
        summary: summariseDay(
          events,
          day,
          workingHoursStart,
          workingHoursEnd,
          workingDays,
          capacity,
          now
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart.getTime(), events, workingHoursStart, workingHoursEnd, workingDays, capacity]);

  // Only the week holding today folds its past days away.
  const todayIndex = days.findIndex((d) => isToday(d.day));
  const earlier = todayIndex > 0 ? days.slice(0, todayIndex) : [];
  const earlierCount = earlier.reduce((n, d) => n + d.summary.booked.length, 0);
  const visible = todayIndex > 0 && !showEarlier ? days.slice(todayIndex) : days;

  const weekBooked = days.reduce((n, d) => n + d.summary.booked.length, 0);
  const weekHours = days.reduce((n, d) => n + d.summary.hours, 0);
  const ahead = days.filter((d) => !d.summary.past && !d.summary.dayOff && !d.summary.closed);
  const roomDays = ahead.filter((d) => d.summary.nextFree).length;
  // Nothing to say about room once the working week is over.
  const roomText =
    ahead.length === 0
      ? ''
      : roomDays === 0
        ? ' · no gaps left'
        : ` · room on ${roomDays} ${roomDays === 1 ? 'day' : 'days'}`;

  const jumpTo = (day: Date) => {
    onHaptic?.();
    setFocused(day);
    const fold = todayIndex > 0 && startOfDay(day) < startOfDay(days[todayIndex].day);
    if (fold) setShowEarlier(true);
    // After the fold opens, or the section would not be in the DOM yet.
    requestAnimationFrame(() => {
      sectionRefs.current
        .get(format(day, 'yyyy-MM-dd'))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="space-y-3" {...swipeHandlers}>
      <WeekDayStrip
        currentDate={currentDate}
        selectedDate={focused}
        events={events}
        workingHoursStart={workingHoursStart}
        workingHoursEnd={workingHoursEnd}
        workingDays={workingDays}
        onSelect={jumpTo}
      />

      {/* The week in one line, so a glance answers "how's the week looking". */}
      <p className="px-1 text-[13px] font-medium tabular-nums text-white">
        {status === 'loading'
          ? 'Loading the week…'
          : status === 'error'
            ? 'Could not load this week'
            : weekBooked === 0
              ? 'Nothing booked this week'
              : `${weekBooked} booked · ${hoursLabel(weekHours)}`}
        {status === 'ready' && roomText}
      </p>

      <div className={cn(cardCn, 'divide-y divide-white/[0.10] overflow-hidden')}>
        {earlier.length > 0 && (
          <button
            type="button"
            onClick={() => {
              onHaptic?.();
              setShowEarlier((v) => !v);
            }}
            aria-expanded={showEarlier}
            className="flex min-h-11 w-full items-center gap-2 px-4 py-2.5 text-left touch-manipulation active:bg-white/[0.06]"
          >
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">
              {earlier.length === 1
                ? format(earlier[0].day, 'EEEE d MMM')
                : `${format(earlier[0].day, 'EEE d')} – ${format(earlier[earlier.length - 1].day, 'EEE d MMM')}`}
              {' · '}
              {earlierCount === 0 ? 'nothing booked' : `${earlierCount} booked`}
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[12px] font-semibold text-elec-yellow">
              {showEarlier ? 'Hide' : 'Show'}
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', showEarlier && 'rotate-180')}
              />
            </span>
          </button>
        )}

        {visible.map(({ day, listed, summary }) => {
          const key = format(day, 'yyyy-MM-dd');
          const today = isToday(day);
          // Today never greys out, even as an empty day off — it is where the
          // eye goes first.
          const quiet = !today && (summary.past || (summary.dayOff && listed.length === 0));
          // No guessed slot while the day is unknown — the sheet suggests one.
          const bookAt = status === 'ready' ? (summary.nextFree?.start ?? null) : null;
          return (
            <section
              key={key}
              ref={(el) => {
                if (el) sectionRefs.current.set(key, el);
                else sectionRefs.current.delete(key);
              }}
              // Clear of the app bar and the calendar's own two-row header.
              style={{ scrollMarginTop: 'calc(var(--header-height, 56px) + 128px)' }}
              className={cn(
                today && 'bg-elec-yellow/[0.05]',
                isSameDay(day, focused) && !today && 'bg-white/[0.03]'
              )}
              aria-label={format(day, 'EEEE d MMMM')}
            >
              <div className={cn('flex items-center', quiet && 'opacity-60')}>
                <button
                  type="button"
                  onClick={() => onOpenDay(day)}
                  className="flex min-h-[60px] min-w-0 flex-1 items-center gap-3 py-2 pl-4 text-left touch-manipulation active:bg-white/[0.06]"
                >
                  <span className="flex w-10 shrink-0 flex-col items-center">
                    <span className={eyebrowCn}>{format(day, 'EEE')}</span>
                    <span
                      className={cn(
                        'mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-[15px] font-bold tabular-nums',
                        today ? 'bg-elec-yellow text-black' : 'text-white'
                      )}
                    >
                      {format(day, 'd')}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1">
                      <span className="truncate text-[15px] font-semibold tracking-tight text-white">
                        {dayTitle(day)}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </span>
                    <span className="block truncate text-[12px] tabular-nums text-white">
                      {status === 'ready' ? summaryLine(summary) : status === 'loading' ? 'Loading…' : '—'}
                    </span>
                  </span>
                </button>
                {!summary.past && (
                  <button
                    type="button"
                    onClick={() => (bookAt ? onBookSlot(bookAt) : onBookDay(day))}
                    aria-label={`Book ${format(day, 'EEEE')}${bookAt ? ` at ${format(bookAt, 'HH:mm')}` : ''}`}
                    className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-elec-yellow touch-manipulation hover:bg-elec-yellow/[0.10] active:scale-[0.95]"
                  >
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                )}
              </div>

              {listed.length > 0 && (
                <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                  {listed.map((event) => (
                    <CalendarEventRow
                      key={event.id}
                      event={event}
                      day={day}
                      onTap={onEventTap}
                      compact
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* The way on. On a Sunday the list is one empty day and nothing
            after it; the next thing anyone wants is the week ahead. */}
        <button
          type="button"
          onClick={onSwipeLeft}
          className="flex min-h-11 w-full items-center gap-2 px-4 py-3 text-left touch-manipulation active:bg-white/[0.06]"
        >
          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">
            Next week
            <span className="font-medium tabular-nums">
              {' · '}
              {format(addDays(weekStart, 7), 'd MMM')} – {format(addDays(weekStart, 13), 'd MMM')}
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow" />
        </button>
      </div>
    </div>
  );
};

export default CalendarWeekList;
