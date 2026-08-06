import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, statValueCn } from '@/components/shared/surfaceStyles';
import { ExpenseStats } from '@/types/expense';

interface ExpenseSummaryCardProps {
  stats: ExpenseStats;
  unsyncedCount?: number;
  hasConnectedProvider?: boolean;
  /** Tap the unsynced figure to act on it. */
  onShowUnsynced?: () => void;
  isSyncing?: boolean;
  className?: string;
}

const money = (v: number, dp = 0) =>
  `£${v.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

/**
 * The state of the books, in one strip.
 *
 * "This month" used to be the headline, at 2xl and in yellow. On live data that
 * is £0.00 for most of any given month — so the biggest, brightest number on
 * the page was a zero, while the £661 actually spent this year sat in a small
 * grey pill beneath it. Year to date leads now; the month is context.
 *
 * Deductible keeps a cell of its own because it is the figure the whole feature
 * exists to produce: what comes off the tax bill.
 *
 * One surface split into cells rather than a card of pills — the same
 * construction as the Price Book strip.
 */
export function ExpenseSummaryCard({
  stats,
  unsyncedCount = 0,
  hasConnectedProvider = false,
  onShowUnsynced,
  isSyncing = false,
  className,
}: ExpenseSummaryCardProps) {
  const showUnsynced = hasConnectedProvider && unsyncedCount > 0;

  return (
    <div className={cn(cardCn, 'overflow-hidden', className)}>
      <div className="grid grid-cols-3">
        <div className="px-3 py-3.5 sm:px-4">
          <span className={cn(eyebrowCn, 'block')}>This year</span>
          <span className={cn(statValueCn, 'block text-elec-yellow')}>
            {money(stats.yearToDateAmount)}
          </span>
        </div>
        <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
          <span className={cn(eyebrowCn, 'block')}>Deductible</span>
          <span className={cn(statValueCn, 'block text-white')}>
            {money(stats.totalTaxDeductible)}
          </span>
        </div>
        <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
          <span className={cn(eyebrowCn, 'block')}>This month</span>
          <span className={cn(statValueCn, 'block text-white')}>{money(stats.monthlyAmount)}</span>
        </div>
      </div>

      {showUnsynced && (
        <button
          type="button"
          onClick={onShowUnsynced}
          disabled={isSyncing}
          className="flex w-full items-center gap-3 border-t border-white/[0.10] px-4 py-3 text-left transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] touch-manipulation sm:px-5"
        >
          <span className="min-w-0 flex-1 text-[13px] text-white">
            <span className="font-semibold">{unsyncedCount}</span>{' '}
            {unsyncedCount === 1 ? 'expense has' : 'expenses have'} not reached your accounts yet
          </span>
          <span className="shrink-0 text-[12px] font-semibold text-elec-yellow">
            {isSyncing ? 'Sending…' : 'Send them'}
          </span>
        </button>
      )}
    </div>
  );
}
