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

  const cellCn = 'px-3 py-3.5 text-left touch-manipulation transition-colors sm:px-4';

  return (
    <div className={cn(cardCn, 'grid grid-cols-3 overflow-hidden')}>
      <button
        type="button"
        onClick={() => onGoToDay(new Date())}
        className={cn(cellCn, 'hover:bg-white/[0.04] active:bg-white/[0.06]')}
      >
        <span className={cn(eyebrowCn, 'block')}>Today</span>
        <span className={cn(statValueCn, 'block text-white')}>{loading ? '—' : todayCount}</span>
      </button>

      <button
        type="button"
        onClick={onGoToWeek}
        className={cn(
          cellCn,
          'border-l border-white/[0.10] hover:bg-white/[0.04] active:bg-white/[0.06]'
        )}
      >
        <span className={cn(eyebrowCn, 'block')}>7 days</span>
        <span className={cn(statValueCn, 'block text-white')}>
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
        <span className={cn(eyebrowCn, 'block')}>Next free</span>
        <span className={cn(statValueCn, 'block text-elec-yellow')}>
          {loading ? '—' : freeLabel(nextFreeDay)}
        </span>
      </button>
    </div>
  );
};

export default CalendarSummaryStrip;
