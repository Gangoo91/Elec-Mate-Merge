import { useState, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Trash2, Receipt, Calendar, MapPin, ChevronRight, Pencil, CheckCircle2, Coins, CloudUpload, Loader2 } from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { useHaptics } from '@/hooks/useHaptics';
import { Expense, getCategoryConfig } from '@/types/expense';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
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
  onEdit?: () => void;
  onClick?: () => void;
  onSync?: () => void;
  isSyncing?: boolean;
  showSyncButton?: boolean;
  delay?: number;
}

export function ExpenseCard({
  expense,
  onDelete,
  onEdit,
  onClick,
  onSync,
  isSyncing = false,
  showSyncButton = false,
  delay = 0,
}: ExpenseCardProps) {
  const { isMobile, touchSupport } = useMobileEnhanced();
  const haptics = useHaptics();
  const controls = useAnimation();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const isTouchEvent = useRef(false);
  const hasTriggeredHaptic = useRef(false);

  // Only enable swipe on touch devices - not desktop mouse
  const enableSwipe = touchSupport || isMobile;

  // Swipe thresholds
  const DELETE_THRESHOLD = -80;
  const EDIT_THRESHOLD = 80;

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    // Track if this drag started from touch
    isTouchEvent.current = 'touches' in event || (event as PointerEvent).pointerType === 'touch';
    if (isTouchEvent.current || enableSwipe) {
      setIsDragging(true);
      hasTriggeredHaptic.current = false;
    }
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;

    const offset = info.offset.x;
    setSwipeOffset(offset);

    // Determine swipe direction
    if (offset < -20) {
      setSwipeDirection('left');
    } else if (offset > 20) {
      setSwipeDirection('right');
    } else {
      setSwipeDirection(null);
    }

    // Haptic feedback when crossing thresholds
    if (!hasTriggeredHaptic.current) {
      if (offset < DELETE_THRESHOLD) {
        haptics.warning(); // Warning haptic for delete
        hasTriggeredHaptic.current = true;
      } else if (offset > EDIT_THRESHOLD && onEdit) {
        haptics.tap(); // Light tap for edit
        hasTriggeredHaptic.current = true;
      }
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    // Only process swipe if it was a touch interaction or on mobile
    if (isTouchEvent.current || enableSwipe) {
      if (info.offset.x < DELETE_THRESHOLD) {
        // Swipe left - delete
        haptics.impact();
        onDelete();
      } else if (info.offset.x > EDIT_THRESHOLD && onEdit) {
        // Swipe right - edit
        haptics.success();
        onEdit();
      }
    }

    // Reset
    setSwipeOffset(0);
    setSwipeDirection(null);
    isTouchEvent.current = false;
    hasTriggeredHaptic.current = false;
  };

  const categoryConfig = getCategoryConfig(expense.category);
  const CategoryIcon = CATEGORY_ICONS[expense.category] || MoreHorizontal;

  // Always show the actual expense date, not relative time
  const expenseDate = new Date(expense.date);
  const dateDisplay = format(expenseDate, 'dd MMM yyyy');

  // iOS-native timing curve
  const iosSpring = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 35,
    mass: 0.8,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {/* Edit action background (revealed on swipe right) - Left side */}
      {onEdit && (
        <div
          className="absolute inset-y-0 left-0 right-0 flex items-center justify-start px-6 bg-elec-yellow/15 rounded-xl overflow-hidden"
          style={{
            opacity: swipeDirection === 'right' ? Math.min(swipeOffset / EDIT_THRESHOLD, 1) : 0,
          }}
        >
          <div className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow font-medium">Edit</span>
          </div>
        </div>
      )}

      {/* Delete action background (revealed on swipe left) - Right side */}
      <div
        className="absolute inset-y-0 left-0 right-0 flex items-center justify-end px-6 bg-red-500/20 rounded-xl overflow-hidden"
        style={{
          opacity: swipeDirection === 'left' ? Math.min(Math.abs(swipeOffset) / Math.abs(DELETE_THRESHOLD), 1) : 0,
        }}
      >
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-red-400" />
          <span className="text-red-400 font-medium">Delete</span>
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
        animate={controls}
        style={{ x: swipeOffset }}
        transition={iosSpring}
        drag={enableSwipe ? "x" : false}
        dragConstraints={{ left: -120, right: onEdit ? 120 : 0 }}
        dragElastic={0.08}
        dragSnapToOrigin
        onDragStart={handleDragStart}
        onDrag={handleDrag}
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
            {/* Row 1: Vendor/Category + Amount */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground truncate">
                {expense.vendor || categoryConfig.label}
              </span>
              <span className="font-bold text-lg text-elec-yellow whitespace-nowrap">
                £{expense.amount.toFixed(2)}
              </span>
            </div>

            {/* Row 2: Date - Always visible and prominent */}
            <div className="flex items-center gap-1.5 mt-1 text-sm text-foreground/70">
              <Calendar className="h-3.5 w-3.5 text-elec-yellow/70" />
              <span className="font-medium">{dateDisplay}</span>
            </div>

            {/* Row 3: Badges */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2">
              {expense.receipt_url && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-green-500/30 bg-green-500/10 text-green-400">
                  <Receipt className="h-2.5 w-2.5 mr-0.5" />
                  Receipt
                </Badge>
              )}
              {expense.category === 'mileage' && expense.mileage_miles && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-white/20 bg-white/5 text-foreground/70">
                  <MapPin className="h-2.5 w-2.5 mr-0.5" />
                  {expense.mileage_miles} mi
                </Badge>
              )}
              {expense.ai_extracted && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-blue-500/30 bg-blue-500/10 text-blue-400">
                  AI
                </Badge>
              )}
              {expense.tax_deductible && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-amber-500/30 bg-amber-500/10 text-amber-400">
                  <Coins className="h-2.5 w-2.5 mr-0.5" />
                  Tax
                </Badge>
              )}
              {expense.synced_to_accounting && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-green-500/30 bg-green-500/10 text-green-400">
                  <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                  Synced
                </Badge>
              )}
            </div>

            {/* Row 4: Description (if exists) */}
            {expense.description && (
              <p className="text-xs text-muted-foreground/70 mt-1.5 truncate">
                {expense.description}
              </p>
            )}
          </div>

          {/* Sync / Chevron */}
          {showSyncButton && !expense.synced_to_accounting ? (
            <button
              onClick={(e) => { e.stopPropagation(); onSync?.(); }}
              disabled={isSyncing}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-amber-500/15 active:scale-[0.95] transition-all touch-manipulation flex-shrink-0"
            >
              {isSyncing ? (
                <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
              ) : (
                <CloudUpload className="h-5 w-5 text-amber-400" />
              )}
            </button>
          ) : showSyncButton && expense.synced_to_accounting ? (
            <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
          ) : onClick ? (
            <ChevronRight className="h-5 w-5 text-muted-foreground/40 flex-shrink-0" />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
