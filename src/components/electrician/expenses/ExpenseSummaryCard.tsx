import { motion } from 'framer-motion';
import { TrendingUp, Receipt, CloudOff } from 'lucide-react';
import { ExpenseStats } from '@/types/expense';
import { cn } from '@/lib/utils';

interface ExpenseSummaryCardProps {
  stats: ExpenseStats;
  unsyncedCount?: number;
  hasConnectedProvider?: boolean;
  className?: string;
}

export function ExpenseSummaryCard({
  stats,
  unsyncedCount = 0,
  hasConnectedProvider = false,
  className,
}: ExpenseSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.08] p-4",
        className
      )}
    >
      {/* Row 1: Label + Amount */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">This Month</span>
        <span className="text-2xl font-bold text-elec-yellow">
          £{stats.monthlyAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Row 2: Inline pills */}
      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] text-muted-foreground">
          YTD £{stats.yearToDateAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 flex items-center gap-1">
          <TrendingUp className="h-2.5 w-2.5" />
          £{stats.totalTaxDeductible.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} deductible
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] text-muted-foreground flex items-center gap-1">
          <Receipt className="h-2.5 w-2.5" />
          {stats.count} {stats.count === 1 ? 'expense' : 'expenses'}
        </span>
        {hasConnectedProvider && unsyncedCount > 0 && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 flex items-center gap-1">
            <CloudOff className="h-2.5 w-2.5" />
            {unsyncedCount} unsynced
          </span>
        )}
      </div>
    </motion.div>
  );
}
