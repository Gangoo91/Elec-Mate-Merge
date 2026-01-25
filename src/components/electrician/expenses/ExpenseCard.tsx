import { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Trash2, Receipt, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { Expense, getCategoryConfig } from '@/types/expense';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Fuel,
  Wrench,
  HardHat,
  Package,
  Hotel,
  Car,
  GraduationCap,
  Truck,
  Shield,
  CreditCard,
  UtensilsCrossed,
  MoreHorizontal,
} from 'lucide-react';

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  fuel: Fuel,
  tools: Wrench,
  ppe: HardHat,
  materials: Package,
  hotels: Hotel,
  mileage: Car,
  training: GraduationCap,
  vehicle: Truck,
  insurance: Shield,
  subscriptions: CreditCard,
  meals: UtensilsCrossed,
  other: MoreHorizontal,
};

interface ExpenseCardProps {
  expense: Expense;
  onDelete: () => void;
  onClick?: () => void;
  delay?: number;
}

export function ExpenseCard({
  expense,
  onDelete,
  onClick,
  delay = 0,
}: ExpenseCardProps) {
  const { isMobile, touchSupport } = useMobileEnhanced();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isTouchEvent = useRef(false);

  // Only enable swipe on touch devices - not desktop mouse
  const enableSwipe = touchSupport || isMobile;

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    // Track if this drag started from touch
    isTouchEvent.current = 'touches' in event || (event as PointerEvent).pointerType === 'touch';
    if (isTouchEvent.current || enableSwipe) {
      setIsDragging(true);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // Only process swipe if it was a touch interaction or on mobile
    if ((isTouchEvent.current || enableSwipe) && info.offset.x < -80) {
      onDelete();
    } else {
      setSwipeOffset(0);
    }
    isTouchEvent.current = false;
  };

  const categoryConfig = getCategoryConfig(expense.category);
  const CategoryIcon = CATEGORY_ICONS[expense.category] || MoreHorizontal;

  // Format date - show relative if within 7 days, otherwise full date
  const expenseDate = new Date(expense.date);
  const daysDiff = Math.floor((Date.now() - expenseDate.getTime()) / (1000 * 60 * 60 * 24));
  const dateDisplay = daysDiff <= 7
    ? formatDistanceToNow(expenseDate, { addSuffix: true })
    : format(expenseDate, 'dd MMM yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay, duration: 0.2 }}
      className="relative"
    >
      {/* Delete action background (revealed on swipe left) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-end px-6 bg-red-500 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-white" />
          <span className="text-white font-medium">Delete</span>
        </div>
      </div>

      {/* Card Content */}
      <motion.div
        className={cn(
          "relative rounded-xl overflow-hidden touch-manipulation",
          "bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.08]",
          "hover:border-white/[0.15] transition-colors",
          onClick && "cursor-pointer active:scale-[0.98]"
        )}
        animate={{ x: swipeOffset }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        drag={enableSwipe ? "x" : false}
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.05}
        dragSnapToOrigin
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => !isDragging && onClick?.()}
      >
        <div className="flex items-center p-3.5 gap-3.5">
          {/* Category Icon */}
          <div
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
              `bg-${categoryConfig.colour}/15`
            )}
            style={{
              backgroundColor: `rgb(var(--${categoryConfig.colour.replace('-500', '-500')}) / 0.12)`,
            }}
          >
            <CategoryIcon
              className={cn("h-5 w-5", `text-${categoryConfig.colour}`)}
              style={{ color: `var(--${categoryConfig.colour}, #f97316)` }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground truncate">
                {expense.vendor || categoryConfig.label}
              </span>
              <span className="font-bold text-lg text-elec-yellow whitespace-nowrap">
                £{expense.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {dateDisplay}
              </span>
              {expense.receipt_url && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-green-500/30 bg-green-500/10 text-green-400">
                  <Receipt className="h-2.5 w-2.5 mr-0.5" />
                  Receipt
                </Badge>
              )}
              {expense.category === 'mileage' && expense.mileage_miles && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {expense.mileage_miles} miles
                </span>
              )}
              {expense.ai_extracted && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-blue-500/30 bg-blue-500/10 text-blue-400">
                  AI
                </Badge>
              )}
            </div>
            {expense.description && (
              <p className="text-xs text-muted-foreground/80 mt-1.5 truncate">
                {expense.description}
              </p>
            )}
          </div>

          {/* Chevron */}
          {onClick && (
            <ChevronRight className="h-5 w-5 text-muted-foreground/40 flex-shrink-0" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
