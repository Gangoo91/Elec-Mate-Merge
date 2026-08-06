import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, statValueCn } from '@/components/shared/surfaceStyles';

export interface TimeMetrics {
  /** Seconds and value that are ready to invoice — flagged sessions excluded. */
  readySec: number;
  readyVal: number;
  readyCount: number;
  /** Sessions long enough to look like a forgotten timer, kept separate. */
  checkSec: number;
  checkVal: number;
  checkCount: number;
  todaySec: number;
  todayVal: number;
  weekSec: number;
  weekVal: number;
}

interface TimeTrackerSummaryProps {
  metrics: TimeMetrics;
  formatDuration: (seconds: number) => string;
  formatCurrency: (amount: number) => string;
  /** Whether the list is filtered to unbilled sessions. */
  filtered: boolean;
  onToggleFilter: () => void;
  /** Jump the list to the sessions that need checking. */
  onShowFlagged: () => void;
}

/**
 * What you are owed, what today was worth, what the week was worth.
 *
 * The headline used to be a single "To bill" figure that summed everything
 * unbilled — including sessions the page itself had already decided were
 * probably forgotten timers. On live data that made it £9,118.80, of which
 * £9,117.41 was one timer left running from 20 to 27 July. The number was
 * technically true and completely useless: you cannot invoice it, and it hid
 * the £1.39 that was actually ready.
 *
 * So the total is SPLIT rather than altered. Nothing is hidden and no figure is
 * quietly rewritten — the ready money leads, and the questionable money sits
 * beneath it with its own count and a way to go and fix it.
 */
const TimeTrackerSummary = ({
  metrics,
  formatDuration,
  formatCurrency,
  filtered,
  onToggleFilter,
  onShowFlagged,
}: TimeTrackerSummaryProps) => {
  const { readySec, readyVal, readyCount, checkVal, checkCount } = metrics;

  return (
    <div className="space-y-3">
      <div className={cn(cardCn, 'overflow-hidden')}>
        <button
          type="button"
          onClick={onToggleFilter}
          aria-pressed={filtered}
          className="w-full px-4 py-4 text-left transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] touch-manipulation sm:px-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className={eyebrowCn}>
              Ready to bill{readyCount > 0 ? ` · ${readyCount}` : ''}
            </span>
            {readyCount > 0 && (
              <span className="text-[11px] font-medium text-white">
                {filtered ? 'Showing unbilled' : 'Tap to filter'}
              </span>
            )}
          </div>
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <span className="text-[30px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
              {formatCurrency(readyVal)}
            </span>
            <span className="shrink-0 text-[13px] text-white tabular-nums">
              {formatDuration(readySec)}
            </span>
          </div>
        </button>

        {checkCount > 0 && (
          <button
            type="button"
            onClick={onShowFlagged}
            className="flex w-full items-center gap-3 border-t border-white/[0.10] bg-orange-500/[0.07] px-4 py-3 text-left transition-colors hover:bg-orange-500/[0.11] touch-manipulation sm:px-5"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-orange-300">
                {formatCurrency(checkVal)} needs checking
              </span>
              <span className="mt-0.5 block text-[12px] text-white">
                {checkCount === 1
                  ? 'One session looks like a timer left running'
                  : `${checkCount} sessions look like timers left running`}
              </span>
            </span>
            <span className="shrink-0 text-[12px] font-semibold text-orange-300">Review</span>
          </button>
        )}
      </div>

      <div className={cn(cardCn, 'grid grid-cols-2 overflow-hidden')}>
        <div className="px-4 py-3.5">
          <span className={cn(eyebrowCn, 'block')}>Today</span>
          <span className={cn(statValueCn, 'block text-white')}>
            {formatDuration(metrics.todaySec)}
          </span>
          <span className="mt-1 block text-[12px] text-elec-yellow tabular-nums">
            {formatCurrency(metrics.todayVal)}
          </span>
        </div>
        <div className="border-l border-white/[0.10] px-4 py-3.5">
          <span className={cn(eyebrowCn, 'block')}>This week</span>
          <span className={cn(statValueCn, 'block text-white')}>
            {formatDuration(metrics.weekSec)}
          </span>
          <span className="mt-1 block text-[12px] text-elec-yellow tabular-nums">
            {formatCurrency(metrics.weekVal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerSummary;
