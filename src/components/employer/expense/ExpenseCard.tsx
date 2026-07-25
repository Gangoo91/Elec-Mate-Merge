import { formatDistanceToNow } from 'date-fns';
import {
  Check,
  X,
  Clock,
  Receipt,
  Briefcase,
  Wrench,
  Car,
  ParkingCircle,
  Hammer,
  HardHat,
  GraduationCap,
  UtensilsCrossed,
  Package,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SwipeableRow } from '@/components/ui/swipeable-row';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/hooks/useExpenses';
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

// One muted icon treatment — the icon varies per category, the colour doesn't.
const categoryTile = 'bg-white/[0.05] text-elec-yellow border-white/[0.08]';
const categoryColors: Record<string, string> = {
  Materials: categoryTile,
  Travel: categoryTile,
  Parking: categoryTile,
  Tools: categoryTile,
  PPE: categoryTile,
  Training: categoryTile,
  Meals: categoryTile,
  Other: categoryTile,
};

// Status: quiet semantic colour on the dot/text only — no filled chips.
const statusConfig: Record<
  string,
  { color: string; bgColor: string; borderColor: string; icon: React.ElementType }
> = {
  Pending: {
    color: 'text-amber-400',
    bgColor: 'bg-transparent',
    borderColor: 'border-l-amber-400/60',
    icon: Clock,
  },
  Approved: {
    color: 'text-emerald-400',
    bgColor: 'bg-transparent',
    borderColor: 'border-l-emerald-400/60',
    icon: Check,
  },
  Paid: {
    color: 'text-emerald-400',
    bgColor: 'bg-transparent',
    borderColor: 'border-l-emerald-400/60',
    icon: Check,
  },
  Rejected: {
    color: 'text-red-400',
    bgColor: 'bg-transparent',
    borderColor: 'border-l-red-400/60',
    icon: X,
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
  const leftAction =
    isPending && onReject
      ? {
          icon: <X className="h-5 w-5" />,
          label: 'Reject',
          onClick: () => onReject(expense.id),
          variant: 'destructive' as const,
        }
      : undefined;

  const rightAction =
    isPending && onApprove
      ? {
          icon: <Check className="h-5 w-5" />,
          label: 'Approve',
          onClick: () => onApprove(expense.id),
          variant: 'success' as const,
        }
      : isApproved && onMarkPaid
        ? {
            icon: <DollarSign className="h-5 w-5" />,
            label: 'Mark Paid',
            onClick: () => onMarkPaid(expense.id),
            variant: 'success' as const,
          }
        : undefined;

  const cardContent = (
    <div
      className={cn(
        'rounded-2xl border bg-[hsl(0_0%_12%)] border-white/[0.06] border-l-[3px] transition-colors',
        status.borderColor,
        onClick && 'cursor-pointer hover:bg-[hsl(0_0%_14%)] active:scale-[0.99] touch-manipulation'
      )}
      onClick={() => onClick?.(expense)}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Employee Avatar */}
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-elec-yellow to-amber-500 text-black font-semibold text-sm">
              {expense.employees?.avatar_initials || 'U'}
            </AvatarFallback>
          </Avatar>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Row - Employee & Amount */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">
                  {expense.employees?.name || 'Unknown'}
                </p>
                <p className="text-sm text-white line-clamp-1">{expense.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-white">
                  {formatCurrency(Number(expense.amount))}
                </p>
              </div>
            </div>

            {/* Bottom Row - Meta Info */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {/* Category Badge */}
              <Badge variant="outline" className={cn('text-xs', categoryColor)}>
                <CategoryIcon className="h-3 w-3 mr-1" />
                {expense.category}
              </Badge>

              {/* Status Badge */}
              <Badge
                variant="outline"
                className={cn('text-xs', status.bgColor, status.color, 'border-transparent')}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {expense.status}
              </Badge>

              {/* Receipt Indicator */}
              {expense.receipt_url && (
                <Badge
                  variant="outline"
                  className="text-xs bg-white/[0.04] text-white border-white/[0.08]"
                >
                  <Receipt className="h-3 w-3 mr-1" />
                  Receipt
                </Badge>
              )}

              {/* Job Link */}
              {expense.job_id && (
                <Badge
                  variant="outline"
                  className="text-xs bg-white/[0.04] text-white border-white/[0.08]"
                >
                  <Briefcase className="h-3 w-3 mr-1" />
                  Linked
                </Badge>
              )}
            </div>

            {/* Time & Actions Row */}
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-white">
                {formatDistanceToNow(new Date(expense.submitted_date), { addSuffix: true })}
              </p>
              {onClick && <ChevronRight className="h-4 w-4 text-white" />}
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
    </div>
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
