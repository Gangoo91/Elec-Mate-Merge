/**
 * The heading over the day's time rail.
 *
 * Day view had no heading of its own — the date lived only in the sticky bar,
 * abbreviated — so at a glance it was indistinguishable from the old phone
 * week view (ELE-1804). It now says which day, in full, whether it is today,
 * how full it is and where the next gap is.
 */
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { Plus } from 'lucide-react';
import { eyebrowCn } from './calendarStyles';
import { summaryLine, type DaySummary } from './eventUtils';

interface CalendarDayHeadingProps {
  date: Date;
  summary: DaySummary;
  /** Book into the next gap. */
  onBook: (start: Date) => void;
  /** No gap left — open the sheet without a time so it suggests one. */
  onBookDay: (date: Date) => void;
  /** Until the bookings are in, the day's fullness is unknown — never "free". */
  status?: 'ready' | 'loading' | 'error';
}

function relative(date: Date): string | null {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return null;
}

const CalendarDayHeading = ({
  date,
  summary,
  onBook,
  onBookDay,
  status = 'ready',
}: CalendarDayHeadingProps) => {
  const rel = relative(date);
  const bookAt = status === 'ready' ? (summary.nextFree?.start ?? null) : null;
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="min-w-0 flex-1">
        {rel && <span className={eyebrowCn}>{rel}</span>}
        <h2 className="truncate text-[20px] font-semibold leading-tight tracking-tight text-white">
          {format(date, 'EEEE d MMMM')}
        </h2>
        <p className="truncate text-[13px] tabular-nums text-white">
          {status === 'ready'
            ? summaryLine(summary)
            : status === 'loading'
              ? 'Loading…'
              : 'Could not load this day'}
        </p>
      </div>
      {!summary.past && (
        <button
          type="button"
          onClick={() => (bookAt ? onBook(bookAt) : onBookDay(date))}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-elec-yellow/40 bg-elec-yellow/[0.10] px-4 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          {bookAt ? format(bookAt, 'HH:mm') : 'Book'}
        </button>
      )}
    </div>
  );
};

export default CalendarDayHeading;
