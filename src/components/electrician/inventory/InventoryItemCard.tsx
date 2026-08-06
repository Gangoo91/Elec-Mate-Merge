import { memo, useState, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { InventoryItem, getCategoryConfig, getLocationConfig, UNIT_STEP } from '@/types/inventory';

interface InventoryItemCardProps {
  item: InventoryItem;
  onAdjust: (id: string, delta: number) => void;
  onTap: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

/** Highlight matching text in search results */
function HighlightText({ text, query }: { text: string; query?: string }) {
  if (!query?.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-elec-yellow font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

/** Get quantity colour based on stock level */
function getQuantityColour(quantity: number, threshold: number | null): string {
  if (quantity <= 0) return 'text-red-400';
  if (threshold != null && quantity <= threshold) return 'text-amber-400';
  if (threshold != null && quantity <= threshold * 2) return 'text-yellow-300';
  return 'text-white';
}

export const InventoryItemCard = memo(function InventoryItemCard({
  item,
  onAdjust,
  onTap,
  onDelete,
  searchQuery,
}: InventoryItemCardProps) {
  const category = getCategoryConfig(item.category);
  const location = getLocationConfig(item.location);
  const isLowStock = item.low_stock_threshold != null && item.quantity <= item.low_stock_threshold;
  const step = UNIT_STEP[item.unit] || 1;
  const quantityColour = getQuantityColour(item.quantity, item.low_stock_threshold);

  // Tap-to-type quantity
  const [isEditingQty, setIsEditingQty] = useState(false);
  const [editQty, setEditQty] = useState('');
  const qtyInputRef = useRef<HTMLInputElement>(null);

  // Swipe-to-delete
  const { isMobile, touchSupport } = useMobileEnhanced();
  const haptic = useHaptic();
  const controls = useAnimation();
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isTouchEvent = useRef(false);
  const hasTriggeredHaptic = useRef(false);
  const enableSwipe = touchSupport || isMobile;
  const DELETE_THRESHOLD = -80;

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    isTouchEvent.current = 'touches' in event || (event as PointerEvent).pointerType === 'touch';
    if (isTouchEvent.current || enableSwipe) {
      setIsDragging(true);
      hasTriggeredHaptic.current = false;
    }
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    setSwipeOffset(info.offset.x);
    if (!hasTriggeredHaptic.current && info.offset.x < DELETE_THRESHOLD) {
      haptic.warning();
      hasTriggeredHaptic.current = true;
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if ((isTouchEvent.current || enableSwipe) && info.offset.x < DELETE_THRESHOLD) {
      haptic.heavy();
      onDelete(item.id);
    }
    controls.start({ x: 0 });
    setSwipeOffset(0);
  };

  const handleQtyTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditQty(String(item.quantity));
    setIsEditingQty(true);
    setTimeout(() => qtyInputRef.current?.select(), 50);
  };

  const handleQtySubmit = () => {
    const newQty = parseFloat(editQty);
    if (!isNaN(newQty) && newQty >= 0 && newQty !== item.quantity) {
      onAdjust(item.id, newQty - item.quantity);
    }
    setIsEditingQty(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Delete reveal behind card */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-end pr-6 rounded-2xl transition-colors',
          swipeOffset < DELETE_THRESHOLD ? 'bg-red-500/30' : 'bg-red-500/10'
        )}
      >
        <Trash2
          className={cn(
            'h-5 w-5 transition-colors',
            swipeOffset < DELETE_THRESHOLD ? 'text-red-400' : 'text-red-400/50'
          )}
        />
      </div>

      <motion.div
        drag={enableSwipe ? 'x' : false}
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        className={cn(
          'relative h-full rounded-2xl border bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 transition-colors active:bg-white/[0.08] touch-manipulation',
          isLowStock ? 'border-amber-500/40' : 'border-white/[0.12]'
        )}
        onClick={() => !isDragging && onTap(item)}
      >
        <div className="flex items-start gap-3">
          {/* Left: what it is and where */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2.5">
              {item.photo_url && (
                <img
                  src={item.photo_url}
                  alt=""
                  loading="lazy"
                  className="h-10 w-10 flex-shrink-0 rounded-lg border border-white/[0.1] object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[15px] font-medium leading-snug text-white">
                  <HighlightText text={item.name} query={searchQuery} />
                </p>
                {/* Location, category and supplier as plain text, not three
                    pills and a coloured dot. The rainbow of per-category
                    colours was decoration competing with the quantity, which
                    is the only thing on this card anyone reads at a glance. */}
                <p className="mt-1 truncate text-[12px] text-white">
                  {location.label} · {category.label}
                  {item.supplier ? ' · ' : ''}
                  {item.supplier && <HighlightText text={item.supplier} query={searchQuery} />}
                </p>
                {isLowStock && (
                  <p className="mt-1.5 text-[11px] font-semibold text-amber-400">
                    Low stock
                    {item.low_stock_threshold != null
                      ? ` — reorder at ${item.low_stock_threshold}`
                      : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: the stepper. Full 44px targets — these get tapped with
              gloves on, in a van, in the dark. */}
          <div
            className="flex flex-shrink-0 items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={`Remove one ${item.name}`}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12] disabled:opacity-40 touch-manipulation"
              onClick={() => onAdjust(item.id, -step)}
              disabled={item.quantity <= 0}
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="min-w-[64px] text-center">
              {isEditingQty ? (
                <Input
                  ref={qtyInputRef}
                  type="number"
                  value={editQty}
                  onChange={(e) => setEditQty(e.target.value)}
                  onBlur={handleQtySubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleQtySubmit()}
                  className="h-11 w-16 border-elec-yellow/50 bg-transparent p-0 text-center text-[17px] font-bold touch-manipulation"
                  min={0}
                  step={step}
                  autoFocus
                />
              ) : (
                <button
                  type="button"
                  onClick={handleQtyTap}
                  aria-label={`Set quantity for ${item.name}`}
                  className="flex h-11 w-full flex-col items-center justify-center rounded-xl transition-colors hover:bg-white/[0.04] touch-manipulation"
                >
                  <motion.span
                    key={item.quantity}
                    initial={{ scale: 1.25, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={cn('text-[19px] font-bold leading-none tabular-nums', quantityColour)}
                  >
                    {item.quantity}
                  </motion.span>
                  {item.unit !== 'each' && (
                    <span className="mt-0.5 text-[10px] leading-none text-white">{item.unit}</span>
                  )}
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label={`Add one ${item.name}`}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12] touch-manipulation"
              onClick={() => onAdjust(item.id, step)}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
