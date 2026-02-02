import React from 'react';
import { Users, ChevronRight, TrendingUp } from 'lucide-react';
import { Customer } from '@/hooks/useCustomers';
import { isThisMonth, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface CustomerStatsProps {
  customers: Customer[];
  onNavigateToCustomers?: () => void;
}

export const CustomerStats = ({ customers, onNavigateToCustomers }: CustomerStatsProps) => {
  // Calculate stats
  const totalCustomers = customers.length;
  const recentCustomers = customers.filter(c => {
    try {
      return isThisMonth(parseISO(c.createdAt));
    } catch {
      return false;
    }
  }).length;

  return (
    <button
      onClick={onNavigateToCustomers}
      disabled={!onNavigateToCustomers}
      className={cn(
        "w-full rounded-2xl border bg-card/50 text-left transition-all touch-manipulation",
        onNavigateToCustomers
          ? "border-white/10 hover:border-white/20 active:scale-[0.98] cursor-pointer"
          : "border-white/5"
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
            <Users className="h-6 w-6 text-blue-400" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white mb-0.5">Customers</h3>
            {totalCustomers === 0 ? (
              <p className="text-xs text-white/40">
                Track your clients and their certificates
              </p>
            ) : (
              <div className="flex items-center gap-6 mt-1.5">
                <div>
                  <p className="text-[10px] text-white/40 font-medium uppercase tracking-wide">Total</p>
                  <p className="text-2xl font-bold text-white tabular-nums">{totalCustomers}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-[10px] text-white/40 font-medium uppercase tracking-wide">This Month</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-2xl font-bold text-white tabular-nums">{recentCustomers}</p>
                    {recentCustomers > 0 && (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chevron */}
          {onNavigateToCustomers && (
            <ChevronRight className="h-5 w-5 text-white/20 flex-shrink-0" />
          )}
        </div>
      </div>
    </button>
  );
};
