import { format, isToday, isTomorrow } from 'date-fns';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, statValueCn } from './calendarStyles';
import type { CalendarPulse } from '@/hooks/useCalendarPulse';

interface CalendarSummaryStripProps {
  pulse: CalendarPulse;
  /** Open the day view on a date — how every cell here is acted on. */
  onGoToDay: (date: Date) => void;
  /** Show the week the diary is filling up. */
  onGoToWeek: () => void;
}

function freeLabel(day: Date | null): string {
  if (!day) return 'None';
  if (isToday(day)) return 'Today';
  if (isTomorrow(day)) return 'Tmrw';
  return format(day, 'EEE d');
}

/**
 * The state of the diary in one line: what today holds, how full the week is,
 * and when the next free day falls.
 *
 * The third figure is the one that earns its place. "When can you fit me in?"
 * is the question every enquiry opens with, and answering it used to mean
 * paging through the grid counting empty squares.
 *
 * One surface split into three, rather than three cards with three borders
 * competing for the same glance — same construction as the Price Book strip.
 */
const CalendarSummaryStrip = ({ pulse, onGoToDay, onGoToWeek }: CalendarSummaryStripProps) => {
  const { todayCount, weekHours, nextFreeDay, loading } = pulse;

  // Half the height it was. On an iPhone 13 this strip, the tidy strip and
  // the header together pushed the grid below the fold; the numbers read
  // just as well at 15px in a 44px row.
  // Stacked on a phone (a 130px cell cannot hold "NEXT FREE" beside "Today"),
  // side by side from `sm` where the cell is 450px wide and 44px is plenty.
  const cellCn =
    'flex min-h-[52px] flex-col items-start justify-center gap-0 px-3 py-1.5 text-left touch-manipulation transition-colors sm:min-h-11 sm:flex-row sm:items-center sm:justify-start sm:gap-2 sm:px-5 sm:py-2';

  return (
    <div className={cn(cardCn, 'grid grid-cols-3 overflow-hidden')}>
      <button
        type="button"
        onClick={() => onGoToDay(new Date())}
        className={cn(cellCn, 'hover:bg-white/[0.04] active:bg-white/[0.06]')}
      >
        <span className={cn(eyebrowCn, 'block whitespace-nowrap')}>Today</span>
        <span className={cn(statValueCn, 'mt-0 block text-[15px] text-white sm:text-[20px]')}>{loading ? '—' : todayCount}</span>
      </button>

      <button
        type="button"
        onClick={onGoToWeek}
        className={cn(
          cellCn,
          'border-l border-white/[0.10] hover:bg-white/[0.04] active:bg-white/[0.06]'
        )}
      >
        <span className={cn(eyebrowCn, 'block whitespace-nowrap')}>7 days</span>
        <span className={cn(statValueCn, 'mt-0 block text-[15px] text-white sm:text-[20px]')}>
          {loading ? '—' : `${weekHours}h`}
        </span>
      </button>

      <button
        type="button"
        onClick={() => nextFreeDay && onGoToDay(nextFreeDay)}
        disabled={!nextFreeDay}
        className={cn(
          cellCn,
          'border-l border-white/[0.10] hover:bg-white/[0.04] active:bg-white/[0.06] disabled:active:bg-transparent'
        )}
      >
        <span className={cn(eyebrowCn, 'block whitespace-nowrap')}>Next free</span>
        <span className={cn(statValueCn, 'mt-0 block text-[15px] text-elec-yellow sm:text-[20px]')}>
          {loading ? '—' : freeLabel(nextFreeDay)}
        </span>
      </button>
    </div>
  );
};

export default CalendarSummaryStrip;
