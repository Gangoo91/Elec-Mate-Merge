import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Receipt, PoundSterling } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ExpenseStats } from '@/types/expense';
import { cn } from '@/lib/utils';

interface ExpenseSummaryCardProps {
  stats: ExpenseStats;
  className?: string;
}

export function ExpenseSummaryCard({ stats, className }: ExpenseSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("bg-gradient-to-br from-elec-card to-elec-card/80 border-white/[0.08] overflow-hidden", className)}>
        {/* Main Amount */}
        <div className="p-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                This Month
              </p>
              <p className="text-3xl font-bold text-elec-yellow">
                £{stats.monthlyAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
              <PoundSterling className="h-6 w-6 text-elec-yellow" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {/* YTD */}
          <div className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Year to Date</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              £{stats.yearToDateAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Tax Deductible */}
          <div className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs text-muted-foreground">Tax Deductible</span>
            </div>
            <p className="text-lg font-semibold text-green-400">
              £{stats.totalTaxDeductible.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Receipt Count */}
        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5" />
              {stats.count} {stats.count === 1 ? 'expense' : 'expenses'} recorded
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
