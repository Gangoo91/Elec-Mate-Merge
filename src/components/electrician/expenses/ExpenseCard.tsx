import { useState, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Trash2, Pencil, Loader2 } from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { useHaptic } from '@/hooks/useHaptic';
import { Expense, getCategoryConfig } from '@/types/expense';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
interface ExpenseCardProps {
  expense: Expense;
  onDelete: () => void;
  onEdit?: () => void;
  onClick?: () => void;
  onSync?: () => void;
  isSyncing?: boolean;
  showSyncButton?: boolean;
  /**
   * Whether this expense has actually reached an accounting package. Passed in
   * because `expense.synced_to_accounting` is not reliable — see
   * `useExpenseSyncRecords`.
   */
  isSynced?: boolean;
  /** Link to the expense in Xero/QuickBooks, when the sync recorded one. */
  syncUrl?: string | null;
  /** Why the last attempt to send it was refused, if it was. */
  syncError?: string | null;
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
  isSynced,
  syncUrl = null,
  syncError = null,
  delay = 0,
}: ExpenseCardProps) {
  const synced = isSynced ?? !!expense.synced_to_accounting;
  const { isMobile, touchSupport } = useMobileEnhanced();
  const haptic = useHaptic();
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
        haptic.warning(); // Warning haptic for delete
        hasTriggeredHaptic.current = true;
      } else if (offset > EDIT_THRESHOLD && onEdit) {
        haptic.light(); // Light tap for edit
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
        haptic.heavy();
        onDelete();
      } else if (info.offset.x > EDIT_THRESHOLD && onEdit) {
        // Swipe right - edit
        haptic.success();
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
      className="relative h-full"
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
          opacity:
            swipeDirection === 'left'
              ? Math.min(Math.abs(swipeOffset) / Math.abs(DELETE_THRESHOLD), 1)
              : 0,
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
          'relative flex h-full flex-col overflow-hidden rounded-2xl touch-manipulation',
          'border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04]',
          'transition-colors hover:from-white/[0.10] hover:to-white/[0.06]',
          onClick && 'cursor-pointer active:scale-[0.98]'
        )}
        animate={controls}
        style={{ x: swipeOffset }}
        transition={iosSpring}
        drag={enableSwipe ? 'x' : false}
        dragConstraints={{ left: -120, right: onEdit ? 120 : 0 }}
        dragElastic={0.08}
        dragSnapToOrigin
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={() => !isDragging && onClick?.()}
      >
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-white">
              {expense.vendor || categoryConfig.label}
            </span>
            <span className="whitespace-nowrap text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
              £{expense.amount.toFixed(2)}
            </span>
          </div>

          {/* One meta line. The category lives here now that the icon has gone —
              as a word, which says "Materials" far more plainly than a box
              glyph ever did, and costs no room of its own. */}
          <p className="truncate text-[12px] leading-snug text-white">
            {[
              dateDisplay,
              expense.vendor ? categoryConfig.label : null,
              expense.category === 'mileage' && expense.mileage_miles
                ? `${expense.mileage_miles} mi`
                : null,
              expense.description || null,
            ]
              .filter(Boolean)
              .join(' \u00B7 ')}
          </p>

          {/* Badges mark EXCEPTIONS only. "Deductible" sat on nearly every row
              (127 of 179 expenses are), which is not information — it is
              wallpaper. What is worth seeing is the one that is not, and the
              missing receipt that makes a claim hard to defend. */}
          {syncError && !synced && (
            <p className="rounded-xl border border-orange-500/30 bg-orange-500/[0.10] px-3 py-2 text-[12px] leading-snug text-orange-300">
              Your accounts package refused this: {syncError}
            </p>
          )}

          {(!expense.receipt_url || !expense.tax_deductible) && (
            <div className="flex flex-wrap items-center gap-1.5">
              {!expense.receipt_url && (
                <span className="rounded-full border border-orange-500/30 bg-orange-500/[0.12] px-2 py-0.5 text-[10px] font-semibold text-orange-300">
                  No receipt
                </span>
              )}
              {!expense.tax_deductible && (
                <span className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white">
                  Not deductible
                </span>
              )}
            </div>
          )}

          {/* mt-auto so short and long cards end level in the 2-up grid. */}
          <div className="mt-auto flex items-center gap-2 border-t border-white/[0.10] pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
            >
              Edit
            </button>
            {showSyncButton &&
              (synced ? (
                syncUrl ? (
                  <a
                    href={syncUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-11 items-center rounded-xl px-3 text-[13px] font-medium text-elec-yellow touch-manipulation"
                  >
                    View in accounts
                  </a>
                ) : (
                  <span className="flex h-11 items-center px-3 text-[13px] font-medium text-white">
                    In your accounts
                  </span>
                )
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSync?.();
                  }}
                  disabled={isSyncing}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] disabled:opacity-60"
                >
                  {isSyncing && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSyncing ? 'Sending' : syncError ? 'Try again' : 'Send to accounts'}
                </button>
              ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
