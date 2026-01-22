import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
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
        "w-full rounded-xl border bg-card text-left transition-all touch-manipulation",
        onNavigateToCustomers
          ? "border-elec-yellow/20 hover:border-elec-yellow/40 active:scale-[0.98] cursor-pointer"
          : "border-elec-yellow/10"
      )}
    >
      <div className="p-3">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center flex-shrink-0">
            <Users className="h-5 w-5 text-elec-yellow" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white">Customers</h3>
            {totalCustomers === 0 ? (
              <p className="text-xs text-white/50 mt-0.5">
                Track your clients and their certificates
              </p>
            ) : (
              <div className="flex items-center gap-4 mt-1">
                <div>
                  <p className="text-[10px] text-white/40 font-medium">Total</p>
                  <p className="text-lg font-bold text-white tabular-nums">{totalCustomers}</p>
                </div>
                <div className="w-px h-8 bg-elec-yellow/20" />
                <div>
                  <p className="text-[10px] text-white/40 font-medium">This Month</p>
                  <p className="text-lg font-bold text-white tabular-nums">{recentCustomers}</p>
                </div>
              </div>
            )}
          </div>

          {/* Chevron */}
          {onNavigateToCustomers && (
            <ChevronRight className="h-5 w-5 text-elec-yellow/40 flex-shrink-0" />
          )}
        </div>
      </div>
    </button>
  );
};
