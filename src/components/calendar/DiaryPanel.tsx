/**
 * The diary, at the top of the page you actually open.
 *
 * If you run a business the calendar is the first thing you look at in the
 * morning and the last thing you check at night, and until now it was a tile
 * six scrolls down the Business Hub with a count on it. Worse, that count came
 * from a hand-rolled query against `calendar_events` alone, so a day holding
 * two site visits and a job deadline reported "Nothing booked in".
 *
 * Two densities, one component, because the two pages are asking different
 * questions:
 *
 *   `full`    — Business Hub. The week ahead and what is on it. On a phone
 *               that is a row of day chips with the chosen day listed below;
 *               from `lg:` up the seven days become seven columns, which is
 *               what the width is for.
 *   `compact` — Dashboard. One question only: what is next, and when.
 *
 * Nothing here duplicates the slot arithmetic — tapping a day opens the day
 * itself, which is where slots are chosen.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, format, isSameDay, isToday, isTomorrow, startOfDay } from 'date-fns';
import { ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, rowCn } from './calendarStyles';
import {
  buildDayShape,
  clampToDay,
  eventsOnDay,
  nextEventFrom,
  occupiesTime,
  totalHours,
} from './eventUtils';
import { calendarDayUrl, calendarNewEventUrl, eventRecordHref, CALENDAR_PATH } from './diaryLinks';
import { useDiaryEvents, diaryRange, DIARY_WINDOW_DAYS } from '@/hooks/useDiaryEvents';
import { useCalendarSettings } from '@/hooks/useCalendarSettings';
import type { CalendarEvent } from '@/types/calendar';

/** How many days forward the panel looks. A working week plus the weekend. */
const DAYS = DIARY_WINDOW_DAYS;

interface DiaryPanelProps {
  variant?: 'full' | 'compact';
}

const pad = (n: number) => String(n).padStart(2, '0');

function dayHeading(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEEE d MMMM');
}

const DiaryPanel = ({ variant = 'full' }: DiaryPanelProps) => {
  const navigate = useNavigate();
  const { settings } = useCalendarSettings();

  /*
   * Keyed on today's DATE, not on mount.
   *
   * A fresh range object every render would change the React Query key every
   * render and refetch forever, so it has to be memoised — but memoising on []
   * meant an app left open overnight kept yesterday's window and drew "Today"
   * against the wrong day until it was reloaded. Vans get left with the app
   * open; this corrects itself on the first render after midnight.
   */
  const todayKey = format(new Date(), 'yyyy-MM-dd');
  /** Local midnight for `todayKey`, so both memos below key off a real value. */
  const today = useMemo(() => {
    const [y, m, d] = todayKey.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [todayKey]);

  const range = useMemo(() => diaryRange(DAYS, today), [today]);
  const days = useMemo(
    () => Array.from({ length: DAYS }, (_, i) => addDays(today, i)),
    [today]
  );

  const { events, isLoading } = useDiaryEvents(range.dateFrom, range.dateTo);

  const [selected, setSelected] = useState<Date>(() => startOfDay(new Date()));

  const byDay = useMemo(
    () => days.map((day) => ({ day, items: eventsOnDay(events, day) })),
    [days, events]
  );

  // Memoised because the `?? []` fallback would otherwise hand a fresh array to
  // the verdict memos below on every single render.
  const todayItems = useMemo(() => byDay[0]?.items ?? [], [byDay]);
  const selectedItems = useMemo(
    () => byDay.find((d) => isSameDay(d.day, selected))?.items ?? [],
    [byDay, selected]
  );

  const openEvent = (event: CalendarEvent) => {
    const record = eventRecordHref(event);
    navigate(record ?? calendarDayUrl(new Date(event.start_at)));
  };

  /**
   * When the working day next has room in it.
   *
   * Runs the same `buildDayShape` walk the day sheet does, rather than "the end
   * of the last job" — with `jobsAtOnce` above one, the end of the last job is
   * not when you are next free, and an electrician with three vans would have
   * been told they were busy until five while two of them sat idle.
   */
  const freeFrom = useMemo(() => {
    const shape = buildDayShape(
      todayItems,
      new Date(),
      settings.workingHoursStart,
      settings.workingHoursEnd,
      30,
      settings.jobsAtOnce
    );
    const now = new Date();
    const gap = shape.blocks.find((b) => b.kind === 'free' && b.end > now);
    if (!gap) return null;
    return gap.start < now ? now : gap.start;
  }, [todayItems, settings.workingHoursStart, settings.workingHoursEnd, settings.jobsAtOnce]);

  const bookedHours = useMemo(
    () => totalHours(todayItems.filter(occupiesTime)),
    [todayItems]
  );

  /** The one line at the top. Says what today is, not how many rows follow. */
  const verdict = useMemo(() => {
    if (isLoading) return 'Loading your day…';
    if (todayItems.length === 0) return 'Nothing booked in today';
    const hours = bookedHours >= 1 ? `${Math.round(bookedHours)}h booked` : null;
    const free = freeFrom ? `free from ${pad(freeFrom.getHours())}:${pad(freeFrom.getMinutes())}` : null;
    return [
      `${todayItems.length} on today`,
      ...[hours, free].filter(Boolean),
    ].join(' · ');
  }, [isLoading, todayItems.length, bookedHours, freeFrom]);

  // ── Compact — the dashboard only wants to know what is next ───────────────
  if (variant === 'compact') {
    // `nextEventFrom`, not `events[0]` — `events` is in DISPLAY order, which
    // puts all-day work first, so an all-day job on Friday was being announced
    // as "next up" over a callout twenty minutes away.
    const next = nextEventFrom(events);

    return (
      <section className={cn(cardCn, 'overflow-hidden')}>
        <button
          type="button"
          onClick={() => navigate(CALENDAR_PATH)}
          className="flex w-full items-center gap-2 border-b border-white/[0.10] px-4 py-3 text-left touch-manipulation sm:px-5"
        >
          <span className={eyebrowCn}>Your diary</span>
          <ChevronRight className="ml-auto h-4 w-4 text-elec-yellow" />
        </button>

        {next ? (
          <button type="button" onClick={() => openEvent(next)} className={rowCn}>
            <span className="w-[58px] shrink-0 pt-0.5">
              <span className="block text-[13px] font-semibold tabular-nums text-white">
                {next.all_day ? 'All day' : format(new Date(next.start_at), 'HH:mm')}
              </span>
              <span className="block text-[11px] text-white">
                {isToday(new Date(next.start_at))
                  ? 'Today'
                  : format(new Date(next.start_at), 'EEE d MMM')}
              </span>
            </span>
            <span
              className="mt-0.5 w-[3px] shrink-0 self-stretch rounded-full"
              style={{ backgroundColor: next.colour }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold leading-snug tracking-tight text-white">
                {next.title || 'Untitled event'}
              </span>
              <span className="mt-0.5 block truncate text-[12px] leading-snug text-white">
                {[next.customer?.name, next.location].filter(Boolean).join(' · ') || verdict}
              </span>
            </span>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-elec-yellow" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate(calendarNewEventUrl(new Date()))}
            className={cn(rowCn, 'py-4 text-[13px] text-white')}
          >
            {isLoading ? 'Loading your day…' : 'Nothing in the diary this week — tap to book something in.'}
          </button>
        )}
      </section>
    );
  }

  // ── Full — the week ahead ────────────────────────────────────────────────
  return (
    <section className={cn(cardCn, 'overflow-hidden')}>
      <div className="flex items-center gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <span className={eyebrowCn}>Your diary</span>
          <p className="mt-1 truncate text-[15px] font-semibold tracking-tight text-white">
            {verdict}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(CALENDAR_PATH)}
          className="ml-auto flex h-11 shrink-0 items-center gap-1 text-[12px] font-semibold text-elec-yellow touch-manipulation"
        >
          Open calendar
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Phone and tablet — a row of days, then the chosen one in full. */}
      <div className="lg:hidden">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-3 sm:px-5">
          {byDay.map(({ day, items }) => {
            const active = isSameDay(day, selected);
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelected(day)}
                className={cn(
                  'flex h-[68px] w-[52px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl border transition-colors touch-manipulation active:scale-[0.97]',
                  active
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-white/[0.12] bg-white/[0.04] text-white',
                  // Today stays identifiable once the row has been scrolled —
                  // otherwise the only clue was that it happened to be first.
                  !active && isToday(day) && 'border-elec-yellow/60'
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                  {format(day, 'EEE')}
                </span>
                <span className="text-[17px] font-bold tabular-nums leading-none">
                  {format(day, 'd')}
                </span>
                <span className="flex h-1.5 items-center gap-[3px]">
                  {items.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: active ? '#000' : e.colour }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 border-t border-white/[0.10] px-4 py-2.5 sm:px-5">
          <button
            type="button"
            onClick={() => navigate(calendarDayUrl(selected))}
            className="flex items-center gap-1.5 text-left touch-manipulation"
          >
            <span className={eyebrowCn}>{dayHeading(selected)}</span>
            <ChevronRight className="h-3.5 w-3.5 text-elec-yellow" />
          </button>
          <button
            type="button"
            onClick={() => navigate(calendarNewEventUrl(selected))}
            className="ml-auto flex h-11 items-center gap-1 text-[12px] font-semibold text-elec-yellow touch-manipulation"
          >
            <Plus className="h-3.5 w-3.5" />
            Book something in
          </button>
        </div>

        {selectedItems.length === 0 ? (
          <button
            type="button"
            onClick={() => navigate(calendarNewEventUrl(selected))}
            className={cn(rowCn, 'py-4 text-[13px] text-white')}
          >
            Nothing on {dayHeading(selected).toLowerCase()} — tap to book someone in.
          </button>
        ) : (
          <div className="divide-y divide-white/[0.08]">
            {selectedItems.map((event) => (
              <DiaryRow key={event.id} event={event} day={selected} onOpen={openEvent} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop — seven columns. The width is the whole reason to be here. */}
      <div className="hidden lg:grid lg:grid-cols-7 lg:divide-x lg:divide-white/[0.08]">
        {byDay.map(({ day, items }) => (
          <div key={day.toISOString()} className="flex min-h-[188px] flex-col">
            <button
              type="button"
              onClick={() => navigate(calendarDayUrl(day))}
              className={cn(
                'flex items-baseline gap-1.5 px-3 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04]',
                isToday(day) && 'bg-elec-yellow/10'
              )}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                {format(day, 'EEE')}
              </span>
              <span
                className={cn(
                  'text-[15px] font-bold tabular-nums leading-none text-white',
                  isToday(day) && 'text-elec-yellow'
                )}
              >
                {format(day, 'd')}
              </span>
            </button>

            <div className="flex-1 space-y-1 px-2 pb-2">
              {items.slice(0, 4).map((event) => {
                const { start } = clampToDay(event, day);
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => openEvent(event)}
                    className="flex w-full items-start gap-1.5 rounded-lg bg-white/[0.05] px-2 py-1.5 text-left transition-colors touch-manipulation hover:bg-white/[0.10]"
                  >
                    <span
                      className="mt-[3px] h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: event.colour }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-semibold leading-tight text-white">
                        {event.title || 'Untitled event'}
                      </span>
                      <span className="block text-[10px] tabular-nums leading-tight text-white">
                        {event.all_day ? 'All day' : format(start, 'HH:mm')}
                      </span>
                    </span>
                  </button>
                );
              })}

              {items.length > 4 && (
                <button
                  type="button"
                  onClick={() => navigate(calendarDayUrl(day))}
                  className="w-full px-2 py-1 text-left text-[10px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {items.length - 4} more
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate(calendarNewEventUrl(day))}
              aria-label={`Book something in on ${format(day, 'EEEE d MMMM')}`}
              className="flex h-9 items-center justify-center gap-1 border-t border-white/[0.08] text-[11px] font-semibold text-elec-yellow transition-colors touch-manipulation hover:bg-white/[0.05]"
            >
              <Plus className="h-3.5 w-3.5" />
              Book
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

/** One event on the phone list. Same shape as the calendar's own agenda row. */
function DiaryRow({
  event,
  day,
  onOpen,
}: {
  event: CalendarEvent;
  day: Date;
  onOpen: (event: CalendarEvent) => void;
}) {
  const { start, end } = clampToDay(event, day);
  const meta = [event.customer?.name, event.location].filter(Boolean).join(' · ');

  return (
    <button type="button" onClick={() => onOpen(event)} className={rowCn}>
      <span className="w-[54px] shrink-0 pt-0.5">
        <span className="block text-[12px] font-semibold tabular-nums text-white">
          {event.all_day ? 'All day' : format(start, 'HH:mm')}
        </span>
        {!event.all_day && (
          <span className="block text-[11px] tabular-nums text-white">{format(end, 'HH:mm')}</span>
        )}
      </span>
      <span
        className="mt-0.5 w-[3px] shrink-0 self-stretch rounded-full"
        style={{ backgroundColor: event.colour }}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-snug tracking-tight text-white">
          {event.title || 'Untitled event'}
        </span>
        {meta && (
          <span className="mt-0.5 block truncate text-[12px] leading-snug text-white">{meta}</span>
        )}
      </span>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-elec-yellow" />
    </button>
  );
}

export default DiaryPanel;
