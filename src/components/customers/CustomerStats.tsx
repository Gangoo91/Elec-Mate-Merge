import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ChevronRight } from 'lucide-react';
import { Customer } from '@/hooks/useCustomers';
import { isThisMonth, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CustomerStatsProps {
  customers: Customer[];
  onNavigateToCustomers?: () => void;
}

export const CustomerStats = ({ customers, onNavigateToCustomers }: CustomerStatsProps) => {
  const isMobile = useIsMobile();

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
    <div className="mb-6">
      <Card
        className={cn(
          "bg-card/80 border-elec-yellow/30",
          onNavigateToCustomers && "hover:border-elec-yellow/50 transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99] touch-manipulation"
        )}
        onClick={onNavigateToCustomers}
      >
        <CardContent className={cn(isMobile ? "p-3" : "p-4")}>
          <div className="flex items-center justify-between gap-4">
            <div className={cn("flex items-center flex-1", isMobile ? "gap-2" : "gap-3")}>
              <div className={cn("rounded-xl bg-elec-yellow/20 flex-shrink-0", isMobile ? "p-2" : "p-2.5")}>
                <Users className={cn("text-elec-yellow", isMobile ? "h-4 w-4" : "h-5 w-5")} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={cn("font-semibold text-foreground", isMobile ? "text-sm" : "text-base")}>Customers</h3>
                {totalCustomers === 0 ? (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Track your clients and their certificates
                  </p>
                ) : (
                  <div className={cn("flex flex-row items-center mt-2", isMobile ? "gap-3" : "gap-4 sm:gap-6")}>
                    <div>
                      <p className="text-[10px] sm:text-xs text-neutral-400 font-medium">Total Customers</p>
                      <p className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">{totalCustomers}</p>
                    </div>
                    <div className={cn("bg-muted", isMobile ? "w-px h-8" : "w-px h-10")}></div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-neutral-400 font-medium">Added This Month</p>
                      <p className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">{recentCustomers}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {onNavigateToCustomers && (
              <ChevronRight className={cn("text-elec-yellow flex-shrink-0", isMobile ? "h-5 w-5" : "h-6 w-6")} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
