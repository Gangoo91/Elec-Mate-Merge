/**
 * "When can you come?" — answered, instead of hunted for.
 *
 * The one question every booking starts with, and until now the app made the
 * electrician answer it by opening days one at a time until they found a gap
 * big enough. Everything needed to answer it was already there: the working
 * hours, the capacity, and every event on the diary.
 *
 * Returns the next few starts that genuinely fit the job — respecting how many
 * jobs can run at once, skipping days that are full, and never offering a time
 * that has already passed.
 */
import { useMemo } from 'react';
import { addDays, startOfDay } from 'date-fns';
import { buildDayShape, eventsOnDay } from '@/components/calendar/eventUtils';
import { useDiaryEvents, diaryRange } from './useDiaryEvents';
import { useCalendarSettings } from './useCalendarSettings';

/** How far ahead to look. Beyond a fortnight nobody is holding the phone. */
const HORIZON_DAYS = 14;
/** Enough to offer a real choice; more reads as a list to work through. */
const MAX_SUGGESTIONS = 6;
/** Starts land on the half hour, same grid the day sheet books on. */
const STEP_MINUTES = 30;

export interface SlotSuggestion {
  start: Date;
  end: Date;
}

/**
 * @param durationMinutes How long the job needs. All-day work has no slot.
 * @param enabled         Skip the work entirely when nothing is asking.
 */
export function useSlotSuggestions(durationMinutes: number, enabled = true) {
  const { settings } = useCalendarSettings();

  // One window, memoised on the day, so this shares a cache entry with any
  // other diary consumer asking for the same fortnight.
  const todayKey = startOfDay(new Date()).toISOString();
  const range = useMemo(
    () => diaryRange(HORIZON_DAYS, new Date(todayKey)),
    [todayKey]
  );
  /*
   * Gated, not merely ignored.
   *
   * Without passing `enabled` down, opening the event form from anywhere fired
   * a fortnight-wide fetch across four tables even when no suggestions were
   * wanted — an edit, an all-day block, or a slot already chosen in the day
   * sheet. The memo below discarded the result; the round trips still happened.
   */
  const { events, isLoading } = useDiaryEvents(range.dateFrom, range.dateTo, enabled);

  const suggestions = useMemo<SlotSuggestion[]>(() => {
    if (!enabled || durationMinutes <= 0) return [];

    const out: SlotSuggestion[] = [];
    const now = new Date();
    const first = startOfDay(new Date(todayKey));

    for (let i = 0; i < HORIZON_DAYS && out.length < MAX_SUGGESTIONS; i++) {
      const day = addDays(first, i);
      const shape = buildDayShape(
        eventsOnDay(events, day),
        day,
        settings.workingHoursStart,
        settings.workingHoursEnd,
        STEP_MINUTES,
        settings.jobsAtOnce
      );

      for (const block of shape.blocks) {
        if (out.length >= MAX_SUGGESTIONS) break;
        if (block.kind !== 'free') continue;

        // A gap that started before now is only usable from now on.
        const usableFrom = block.start < now ? now : block.start;
        // Rounded UP to the grid so a suggestion is never 14:07.
        const stepMs = STEP_MINUTES * 60_000;
        const alignedMs = Math.ceil(usableFrom.getTime() / stepMs) * stepMs;
        const start = new Date(alignedMs);
        const end = new Date(alignedMs + durationMinutes * 60_000);

        if (end > block.end) continue;

        /*
         * One suggestion per day.
         *
         * Offering 08:00, 08:30, 09:00 and 09:30 on the same Tuesday is not a
         * choice, it is the same answer four times — and it pushes Wednesday
         * and Thursday off the end of the row. The day sheet is where an exact
         * time gets picked.
         */
        out.push({ start, end });
        break;
      }
    }

    return out;
  }, [
    enabled,
    durationMinutes,
    events,
    todayKey,
    settings.workingHoursStart,
    settings.workingHoursEnd,
    settings.jobsAtOnce,
  ]);

  return { suggestions, isLoading };
}
