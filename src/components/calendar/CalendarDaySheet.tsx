/**
 * A day, opened up.
 *
 * Tapping a date used to do nothing but retarget the agenda strip underneath
 * the month grid — you could see that Thursday had two things on it and had no
 * way to find out where the gaps were without switching the whole calendar to
 * Day view and losing your place in the month.
 *
 * Drawn as a TIME RAIL rather than a list, for two reasons.
 *
 * A list of blocks made an empty day look like an empty page: one row saying
 * "08:00–18:00 free", a strip of chips, and then six hundred pixels of nothing.
 * A rail gives the day its shape whether or not anything is on it — ten hours
 * of tappable, hour-lined space that reads as a working day.
 *
 * And it is the only honest way to draw `jobsAtOnce`. Lanes are the capacity:
 * three vans means three columns, so a Tuesday with one job on it shows that
 * job taking a third of the day and two empty lanes beside it. A list can say
 * "1 of 3 running"; only a rail can show you the two that are idle.
 *
 * Tap anywhere in a free lane and it books from there, rounded to the nearest
 * half hour. No chips, no picker — the rail IS the picker.
 */
import { useMemo, useRef, useEffect, useState } from 'react';
import { addDays, differenceInMinutes, format, isBefore, isToday, startOfDay, subDays } from 'date-fns';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { eyebrowCn } from './calendarStyles';
import {
  buildDayShape,
  clampToDay,
  effectiveEnd,
  eventsOnDay,
  humanMinutes,
  isMultiDay,
  occupiesTime,
} from './eventUtils';
import type { CalendarEvent } from '@/types/calendar';

/** Slot granularity. Half an hour is the smallest thing anyone books. */
const STEP_MINUTES = 30;
/** Pixels per hour. 68 puts a half-hour target at 34px — thumb-sized. */
const HOUR_HEIGHT = 68;
const TIME_COL = 52;
/** Below this, a block cannot hold a second line without clipping it. */
const TWO_LINE_HEIGHT = 44;

/**
 * Whole-day and multi-day bookings.
 *
 * Working days rather than calendar days for the longer runs: "2 weeks" means
 * ten working days, and an all-day event stretched across two Sundays says the
 * job is on when nobody is on site.
 */
const BOOK_OUT_OPTIONS: Array<{ label: string; days: number }> = [
  { label: 'The day', days: 1 },
  { label: '2 days', days: 2 },
  { label: '3 days', days: 3 },
  { label: 'The week', days: 5 },
  { label: '2 weeks', days: 10 },
];

interface CalendarDaySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  events: CalendarEvent[];
  workingHoursStart: number;
  workingHoursEnd: number;
  /** How many jobs can run at once — the number of lanes on the rail. */
  capacity: number;
  /** Book something starting at this exact time. */
  onPickSlot: (start: Date) => void;
  /** Book the day, or a run of days, out in one go. */
  onBookOut: (start: Date, days: number) => void;
  onEventTap: (event: CalendarEvent) => void;
  /** Step the sheet to another day without closing it. */
  onChangeDate: (date: Date) => void;
}

const hhmm = (d: Date) => format(d, 'HH:mm');

/** A booked stretch of one lane. */
interface LaneBlock {
  event: CalendarEvent;
  start: Date;
  end: Date;
}

/**
 * Pack the day's timed events into lanes.
 *
 * Greedy: an event takes the first lane whose last block has already finished.
 * Deliberately NOT `layoutDayEvents`, which widths a cluster by how many events
 * happen to overlap — that makes two concurrent jobs each take half the rail
 * whether the electrician can run two or six. Here the rail is always `capacity`
 * lanes wide, so the empty ones are the point.
 */
function packLanes(events: CalendarEvent[], day: Date): LaneBlock[][] {
  const lanes: LaneBlock[][] = [];
  const sorted = events
    .map((event) => ({ event, ...clampToDay(event, day) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  for (const block of sorted) {
    const lane = lanes.find((l) => l[l.length - 1].end <= block.start);
    if (lane) lane.push(block);
    else lanes.push([block]);
  }
  return lanes;
}

const CalendarDaySheet = ({
  open,
  onOpenChange,
  date,
  events,
  workingHoursStart,
  workingHoursEnd,
  capacity,
  onPickSlot,
  onBookOut,
  onEventTap,
  onChangeDate,
}: CalendarDaySheetProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => new Date());
  const showNow = isToday(date);
  const isPast = isBefore(startOfDay(date), startOfDay(new Date()));

  const shape = useMemo(
    () =>
      buildDayShape(events, date, workingHoursStart, workingHoursEnd, STEP_MINUTES, capacity),
    [events, date, workingHoursStart, workingHoursEnd, capacity]
  );

  const dayEvents = useMemo(() => eventsOnDay(events, date), [events, date]);
  /**
   * Everything the rail has to account for: timed, time-occupying work,
   * INCLUDING the middle days of a multi-day job.
   *
   * A run that started on Monday genuinely occupies a lane on the Tuesday, and
   * leaving it out would have shown a free lane that is not free — the stat
   * strip counts it (via `buildDayShape`) and the lanes must agree, or the sheet
   * contradicts itself in two places a centimetre apart.
   */
  const railEvents = useMemo(
    () => dayEvents.filter((e) => !e.all_day && occupiesTime(e)),
    [dayEvents]
  );

  /** Only what has a real start and end ON this day sets the rail's bounds. */
  const boundsEvents = useMemo(
    () => railEvents.filter((e) => !isMultiDay(e)),
    [railEvents]
  );

  /** All-day work — stated across the top, because it has no hour to sit at. */
  const bannerEvents = useMemo(
    () => dayEvents.filter((e) => occupiesTime(e) && e.all_day),
    [dayEvents]
  );

  const lanes = useMemo(() => packLanes(railEvents, date), [railEvents, date]);
  /** Always at least `capacity` columns — the empty ones are what you can sell. */
  const laneCount = Math.max(capacity, lanes.length, 1);

  /**
   * How much of the clock the rail covers.
   *
   * The working day, widened to swallow anything booked outside it. A 06:30
   * start pulls the rail open to 06:00 rather than being exiled to a "before
   * hours" list, which is where it used to go and where nobody looked.
   */
  const { firstHour, lastHour } = useMemo(() => {
    let first = workingHoursStart;
    let last = workingHoursEnd;
    boundsEvents.forEach((e) => {
      const { start, end } = clampToDay(e, date);
      first = Math.min(first, start.getHours());
      last = Math.max(last, end.getHours() + (end.getMinutes() > 0 ? 1 : 0));
    });
    return { firstHour: Math.max(0, first), lastHour: Math.min(24, Math.max(last, first + 1)) };
  }, [boundsEvents, date, workingHoursStart, workingHoursEnd]);

  const hours = useMemo(
    () => Array.from({ length: lastHour - firstHour }, (_, i) => firstHour + i),
    [firstHour, lastHour]
  );
  const railTop = useMemo(
    () => new Date(date.getFullYear(), date.getMonth(), date.getDate(), firstHour, 0, 0),
    [date, firstHour]
  );
  const railHeight = hours.length * HOUR_HEIGHT;
  /** The instant the bottom of the rail represents. */
  const railEnd = useMemo(
    () => new Date(railTop.getTime() + hours.length * 3_600_000),
    [railTop, hours.length]
  );

  const yFor = (d: Date) => (differenceInMinutes(d, railTop) / 60) * HOUR_HEIGHT;

  /** Where each lane is free, within the working day only. */
  const laneGaps = useMemo(() => {
    const windowStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      workingHoursStart
    );
    const windowEnd = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      workingHoursEnd
    );

    return Array.from({ length: laneCount }, (_, i) => {
      const blocks = (lanes[i] ?? []).filter(
        (b) => b.end > windowStart && b.start < windowEnd
      );
      const gaps: Array<{ start: Date; end: Date }> = [];
      let cursor = windowStart;
      blocks.forEach((b) => {
        if (b.start > cursor) gaps.push({ start: cursor, end: b.start });
        if (b.end > cursor) cursor = b.end;
      });
      if (cursor < windowEnd) gaps.push({ start: cursor, end: windowEnd });
      // Anything under a slot long is not a bookable gap, it is a seam.
      return gaps.filter((g) => differenceInMinutes(g.end, g.start) >= STEP_MINUTES);
    });
  }, [lanes, laneCount, date, workingHoursStart, workingHoursEnd]);

  const firstGap = useMemo(() => {
    const clock = new Date();
    const candidates = shape.blocks.filter(
      (b) => b.kind === 'free' && (!showNow || b.end > clock)
    );
    if (candidates.length === 0) return null;
    const block = candidates[0];
    return showNow && block.start < clock ? clock : block.start;
  }, [shape.blocks, showNow]);

  const totalBooked = useMemo(() => {
    const ids = new Set<string>();
    dayEvents.forEach((e) => ids.add(e.id));
    return ids.size;
  }, [dayEvents]);

  /*
   * Left and right step the day.
   *
   * The month, week and day views have been swipeable and arrow-navigable since
   * they were written; a sheet that covers them and cannot be moved the same way
   * is the kind of inconsistency that makes an app feel assembled rather than
   * designed. Ignored while typing, so a search field in a nested sheet is not
   * hijacked.
   */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === 'ArrowLeft') onChangeDate(subDays(date, 1));
      if (e.key === 'ArrowRight') onChangeDate(addDays(date, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, date, onChangeDate]);

  /** Horizontal only — the rail underneath has to stay vertically scrollable. */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onChangeDate(addDays(date, 1)),
    onSwipedRight: () => onChangeDate(subDays(date, 1)),
    preventScrollOnSwipe: false,
    trackMouse: false,
    delta: 60,
  });

  // Tick the now line, but only on the day it can be seen.
  useEffect(() => {
    if (!open || !showNow) return;
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, [open, showNow]);

  // Open on the useful part of the day rather than at the top of the rail.
  useEffect(() => {
    if (!open || !scrollRef.current) return;
    const target = showNow ? new Date() : (firstGap ?? railTop);
    scrollRef.current.scrollTop = Math.max(0, yFor(target) - HOUR_HEIGHT);
    // Re-runs when the sheet opens or the day changes; yFor is derived state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, date, showNow]);

  /** Where in a lane the finger landed, rounded to the nearest half hour. */
  const timeFromOffset = (offsetY: number, gapStart: Date, gapEnd: Date): Date => {
    const minutes = (offsetY / HOUR_HEIGHT) * 60;
    const raw = new Date(gapStart.getTime() + minutes * 60_000);
    const rounded = new Date(
      Math.round(raw.getTime() / (STEP_MINUTES * 60_000)) * (STEP_MINUTES * 60_000)
    );
    if (rounded < gapStart) return gapStart;
    // Never hand back a start with no room left after it.
    const latest = new Date(gapEnd.getTime() - STEP_MINUTES * 60_000);
    return rounded > latest ? (latest > gapStart ? latest : gapStart) : rounded;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        // The sheet renders its own close button at right-4 top-4, which landed
        // directly on top of the one in the header row below — two overlapping
        // crosses in the corner.
        hideCloseButton
        className="h-[85vh] overflow-hidden rounded-t-2xl p-0"
      >
        <div
          {...swipeHandlers}
          className="mx-auto flex h-full w-full max-w-4xl flex-col bg-background"
        >
          <SheetHeader className="shrink-0 space-y-0 border-b border-white/[0.10] px-1.5 py-1.5">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onChangeDate(subDays(date, 1))}
                aria-label="Previous day"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.06]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <SheetTitle className="flex items-center justify-center gap-2 truncate text-[16px] font-semibold tracking-tight text-white">
                  {format(date, 'EEEE')}
                  {showNow && (
                    <span className="rounded-full bg-elec-yellow px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-[0.1em] text-black">
                      Today
                    </span>
                  )}
                  {isPast && (
                    <span className="rounded-full border border-white/[0.20] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                      Past
                    </span>
                  )}
                </SheetTitle>
                <SheetDescription className="text-[12px] text-white">
                  {format(date, 'd MMMM yyyy')}
                </SheetDescription>
              </div>

              <button
                type="button"
                onClick={() => onChangeDate(addDays(date, 1))}
                aria-label="Next day"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.06]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.06]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </SheetHeader>

          {/* Three figures, and the middle one is the point of the screen. */}
          <div className="grid shrink-0 grid-cols-3 divide-x divide-white/[0.10] border-b border-white/[0.10]">
            <Stat
              label="Booked"
              value={String(totalBooked)}
              hint={capacity > 1 ? `peak ${shape.peakRunning} of ${capacity}` : undefined}
            />
            {/* "Free" is WALL-CLOCK time with room in it — when could I fit
                them in. The hint is spare LANE time, which is a different and
                much bigger number. They were previously one figure captioned
                as the other. */}
            <Stat
              label="Free"
              value={humanMinutes(shape.freeMinutes)}
              accent
              hint={
                capacity > 1
                  ? `${humanMinutes(shape.spareLaneMinutes)} of capacity spare`
                  : undefined
              }
            />
            <Stat
              label={isPast ? 'Day' : 'Next gap'}
              value={isPast ? 'Gone' : firstGap ? hhmm(firstGap) : 'Full'}
            />
          </div>

          {/* All-day work and deadlines. Neither takes an hour out of the rail;
              both change what you would agree to on the phone. */}
          {(bannerEvents.length > 0 || shape.markers.length > 0) && (
            <div className="shrink-0 space-y-1.5 border-b border-white/[0.10] px-4 py-2.5">
              {[...bannerEvents, ...shape.markers].map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onEventTap(event)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left touch-manipulation active:scale-[0.99]"
                  style={{
                    backgroundColor: `${event.colour}22`,
                    borderLeft: `3px solid ${event.colour}`,
                  }}
                >
                  <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">
                    {event.title || 'Untitled'}
                  </span>
                  {/* Keyed on whether it OCCUPIES time, not on `all_day`.
                      Task and project events are minted all-day because a
                      deadline has no hour — labelling them "All day" said the
                      day was spoken for when nothing had been booked at all. */}
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                    {!occupiesTime(event)
                      ? 'Due'
                      : isMultiDay(event)
                        ? `To ${format(effectiveEnd(event), 'EEE d')}`
                        : 'All day'}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* ── The rail ─────────────────────────────────────────────────── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
            <div className="relative" style={{ height: railHeight }}>
              {/* Hour lines and the time gutter */}
              {hours.map((hour, i) => {
                const working = hour >= workingHoursStart && hour < workingHoursEnd;
                return (
                  <div
                    key={hour}
                    className="absolute inset-x-0"
                    style={{ top: i * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                  >
                    <span
                      className={cn(
                        '-mt-[7px] absolute left-0 pr-3 text-right text-[11px] font-semibold tabular-nums text-white',
                        !working && 'opacity-55'
                      )}
                      style={{ width: TIME_COL }}
                    >
                      {String(hour).padStart(2, '0')}:00
                    </span>
                    <span
                      className={cn(
                        'absolute right-0 top-0 h-px',
                        working ? 'bg-white/[0.10]' : 'bg-white/[0.05]'
                      )}
                      style={{ left: TIME_COL }}
                    />
                    <span
                      className="absolute right-0 h-px bg-white/[0.04]"
                      style={{ left: TIME_COL, top: HOUR_HEIGHT / 2 }}
                    />
                  </div>
                );
              })}

              {/* Free lanes. Drawn first so a booked block always sits over
                  them, and tappable anywhere along their length. */}
              {laneGaps.map((gaps, laneIndex) =>
                gaps.map((gap) => {
                  const top = yFor(gap.start);
                  const height = Math.max(
                    18,
                    (differenceInMinutes(gap.end, gap.start) / 60) * HOUR_HEIGHT
                  );
                  const minutes = differenceInMinutes(gap.end, gap.start);
                  return (
                    <button
                      key={`gap-${laneIndex}-${gap.start.toISOString()}`}
                      type="button"
                      aria-label={`Free ${hhmm(gap.start)} to ${hhmm(gap.end)}${
                        laneCount > 1 ? `, lane ${laneIndex + 1} of ${laneCount}` : ''
                      } — tap to book`}
                      onClick={(e) => {
                        const box = e.currentTarget.getBoundingClientRect();
                        onPickSlot(timeFromOffset(e.clientY - box.top, gap.start, gap.end));
                      }}
                      className={cn(
                        'absolute overflow-hidden rounded-xl border border-dashed border-elec-yellow/35 bg-elec-yellow/[0.05] text-left transition-colors touch-manipulation hover:bg-elec-yellow/[0.10] active:bg-elec-yellow/[0.14]',
                        // A past day is still bookable — people write jobs up
                        // after the fact — but it should not shout at you.
                        isPast && 'opacity-45'
                      )}
                      style={{
                        top,
                        height,
                        left: `calc(${TIME_COL}px + 4px + (100% - ${TIME_COL}px - 8px) * ${laneIndex / laneCount})`,
                        width: `calc((100% - ${TIME_COL}px - 8px) / ${laneCount} - 4px)`,
                      }}
                    >
                      {height >= 34 && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1.5">
                          <Plus className="h-3.5 w-3.5 shrink-0 text-elec-yellow" strokeWidth={2.5} />
                          <span className="min-w-0">
                            <span className="block truncate text-[12px] font-semibold tabular-nums text-white">
                              {hhmm(gap.start)}–{hhmm(gap.end)}
                            </span>
                            {height >= 64 && (
                              <span className="block text-[11px] tabular-nums text-elec-yellow">
                                {humanMinutes(minutes)} free · tap to book
                              </span>
                            )}
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })
              )}

              {/* Booked blocks */}
              {lanes.map((lane, laneIndex) =>
                lane.map(({ event, start, end }) => {
                  /*
                   * Clamped to the rail, not to the day.
                   *
                   * The middle day of a multi-day job clamps to 00:00–23:59,
                   * and drawing that literally would push the block far above
                   * and below a rail that only covers the working hours. It is
                   * shown filling its lane across the visible day instead, which
                   * is what being on that job all Tuesday actually looks like.
                   */
                  const drawStart = start < railTop ? railTop : start;
                  const drawEnd = end > railEnd ? railEnd : end;
                  const continues = start < railTop || end > railEnd;
                  const top = yFor(drawStart);
                  const height = Math.max(
                    28,
                    (Math.max(differenceInMinutes(drawEnd, drawStart), 15) / 60) * HOUR_HEIGHT
                  );
                  const meta = [event.customer?.name, event.crew, event.location]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onEventTap(event)}
                      className="absolute z-10 overflow-hidden rounded-xl px-2.5 py-1.5 text-left touch-manipulation active:scale-[0.98]"
                      style={{
                        top,
                        height,
                        left: `calc(${TIME_COL}px + 4px + (100% - ${TIME_COL}px - 8px) * ${laneIndex / laneCount})`,
                        width: `calc((100% - ${TIME_COL}px - 8px) / ${laneCount} - 4px)`,
                        backgroundColor: `${event.colour}26`,
                        borderLeft: `3px solid ${event.colour}`,
                      }}
                    >
                      <span className="block truncate text-[13px] font-semibold leading-tight text-white">
                        {event.title || 'Untitled event'}
                      </span>
                      {height >= TWO_LINE_HEIGHT && (
                        <span className="block truncate text-[11px] tabular-nums leading-tight text-white">
                          {continues
                            ? `Runs to ${format(effectiveEnd(event), 'EEE d MMM')}`
                            : `${hhmm(start)}–${hhmm(end)}`}
                        </span>
                      )}
                      {height >= TWO_LINE_HEIGHT + 18 && meta && (
                        <span className="mt-0.5 block truncate text-[11px] leading-tight text-white">
                          {meta}
                        </span>
                      )}
                    </button>
                  );
                })
              )}

              {/* Now */}
              {showNow && (() => {
                const top = yFor(now);
                if (top < 0 || top > railHeight) return null;
                return (
                  <div
                    className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
                    style={{ top }}
                  >
                    <span
                      className="flex justify-end pr-1"
                      style={{ width: TIME_COL }}
                    >
                      <span className="rounded bg-elec-yellow px-1 py-0.5 text-[9px] font-bold tabular-nums text-black">
                        {hhmm(now)}
                      </span>
                    </span>
                    <span className="h-[2px] flex-1 bg-elec-yellow shadow-[0_0_8px_rgba(250,204,21,0.45)]" />
                  </div>
                );
              })()}
            </div>

            <p className="px-4 py-3 text-[11px] text-white">
              Working day {String(workingHoursStart).padStart(2, '0')}:00–
              {String(workingHoursEnd).padStart(2, '0')}:00
              {capacity > 1 ? ` · ${capacity} jobs at once` : ''} · change it in calendar settings.
            </p>
          </div>

          {/* ── Actions ──────────────────────────────────────────────────── */}
          <div
            className="shrink-0 space-y-2 border-t border-white/[0.10] px-4 pt-2.5"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="scrollbar-hide -mx-1 flex items-center gap-1.5 overflow-x-auto px-1">
              <span className="shrink-0 text-[11px] font-semibold text-white">Book out</span>
              {BOOK_OUT_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => onBookOut(date, opt.days)}
                  className="h-9 shrink-0 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 text-[12px] font-semibold text-white touch-manipulation active:bg-white/[0.10]"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                onPickSlot(
                  firstGap ??
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                      workingHoursStart,
                      0,
                      0
                    )
                )
              }
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
              {isPast ? 'Add to this day' : firstGap ? `Book ${hhmm(firstGap)}` : 'Book anyway'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function Stat({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="px-3 py-2">
      <span className={eyebrowCn}>{label}</span>
      <p
        className={cn(
          'mt-0.5 text-[17px] font-bold tabular-nums leading-none',
          accent ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 truncate text-[10px] tabular-nums text-white">{hint}</p>}
    </div>
  );
}

export default CalendarDaySheet;
