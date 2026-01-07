import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Check, X, Clock, Receipt, Briefcase,
  Wrench, Car, ParkingCircle, Hammer, HardHat,
  GraduationCap, UtensilsCrossed, Package,
  ChevronRight, DollarSign
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SwipeableRow } from '@/components/ui/swipeable-row';
import { cn } from '@/lib/utils';
import { formatCurrency, getCategoryConfig } from '@/hooks/useExpenses';
import type { ExpenseClaim } from '@/services/financeService';

interface ExpenseCardProps {
  expense: ExpenseClaim;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onClick?: (expense: ExpenseClaim) => void;
  showSwipeActions?: boolean;
}

// Map category to icon component
const categoryIcons: Record<string, React.ElementType> = {
  Materials: Wrench,
  Travel: Car,
  Parking: ParkingCircle,
  Tools: Hammer,
  PPE: HardHat,
  Training: GraduationCap,
  Meals: UtensilsCrossed,
  Other: Package,
};

// Map category to color classes
const categoryColors: Record<string, string> = {
  Materials: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  Travel: 'bg-green-500/10 text-green-500 border-green-500/30',
  Parking: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  Tools: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
  PPE: 'bg-red-500/10 text-red-500 border-red-500/30',
  Training: 'bg-teal-500/10 text-teal-500 border-teal-500/30',
  Meals: 'bg-pink-500/10 text-pink-500 border-pink-500/30',
  Other: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

// Status colors
const statusConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: React.ElementType }> = {
  Pending: {
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-l-amber-500',
    icon: Clock
  },
  Approved: {
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-l-green-500',
    icon: Check
  },
  Paid: {
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-l-blue-500',
    icon: DollarSign
  },
  Rejected: {
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-l-red-500',
    icon: X
  },
};

export function ExpenseCard({
  expense,
  onApprove,
  onReject,
  onMarkPaid,
  onClick,
  showSwipeActions = true,
}: ExpenseCardProps) {
  const CategoryIcon = categoryIcons[expense.category] || Package;
  const categoryColor = categoryColors[expense.category] || categoryColors.Other;
  const status = statusConfig[expense.status] || statusConfig.Pending;
  const StatusIcon = status.icon;

  const isPending = expense.status === 'Pending';
  const isApproved = expense.status === 'Approved';

  // Determine swipe actions based on status
  const leftAction = isPending && onReject ? {
    icon: <X className="h-5 w-5" />,
    label: 'Reject',
    onClick: () => onReject(expense.id),
    variant: 'destructive' as const,
  } : undefined;

  const rightAction = isPending && onApprove ? {
    icon: <Check className="h-5 w-5" />,
    label: 'Approve',
    onClick: () => onApprove(expense.id),
    variant: 'success' as const,
  } : isApproved && onMarkPaid ? {
    icon: <DollarSign className="h-5 w-5" />,
    label: 'Mark Paid',
    onClick: () => onMarkPaid(expense.id),
    variant: 'success' as const,
  } : undefined;

  const cardContent = (
    <Card
      className={cn(
        "border-l-4 transition-all duration-200",
        status.borderColor,
        onClick && "cursor-pointer hover:bg-muted/50 active:scale-[0.99]"
      )}
      onClick={() => onClick?.(expense)}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Employee Avatar */}
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-elec-dark font-semibold text-sm">
              {expense.employees?.avatar_initials || 'U'}
            </AvatarFallback>
          </Avatar>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Row - Employee & Amount */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {expense.employees?.name || 'Unknown'}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {expense.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(Number(expense.amount))}
                </p>
              </div>
            </div>

            {/* Bottom Row - Meta Info */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {/* Category Badge */}
              <Badge variant="outline" className={cn("text-xs", categoryColor)}>
                <CategoryIcon className="h-3 w-3 mr-1" />
                {expense.category}
              </Badge>

              {/* Status Badge */}
              <Badge variant="outline" className={cn("text-xs", status.bgColor, status.color, "border-transparent")}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {expense.status}
              </Badge>

              {/* Receipt Indicator */}
              {expense.receipt_url && (
                <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground">
                  <Receipt className="h-3 w-3 mr-1" />
                  Receipt
                </Badge>
              )}

              {/* Job Link */}
              {expense.job_id && (
                <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground">
                  <Briefcase className="h-3 w-3 mr-1" />
                  Linked
                </Badge>
              )}
            </div>

            {/* Time & Actions Row */}
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(expense.submitted_date), { addSuffix: true })}
              </p>
              {onClick && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            {/* Rejection Reason */}
            {expense.status === 'Rejected' && expense.rejection_reason && (
              <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-400">
                  <span className="font-medium">Reason:</span> {expense.rejection_reason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  // Wrap with SwipeableRow if actions are available
  if (showSwipeActions && (leftAction || rightAction)) {
    return (
      <SwipeableRow
        leftAction={leftAction}
        rightAction={rightAction}
        className="rounded-lg overflow-hidden"
      >
        {cardContent}
      </SwipeableRow>
    );
  }

  return cardContent;
}

export default ExpenseCard;
