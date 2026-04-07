import { memo, useState, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Minus, Plus, AlertTriangle, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        className="relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 active:bg-white/[0.06] transition-colors touch-manipulation"
        onClick={() => !isDragging && onTap(item)}
      >
        <div className="flex items-start gap-3">
          {/* Left: category dot + info + optional photo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {item.photo_url ? (
                <img
                  src={item.photo_url}
                  alt=""
                  className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className={cn('w-2 h-2 rounded-full flex-shrink-0', category.dotClass)} />
              )}
              <p className="text-[15px] font-medium text-white truncate">
                <HighlightText text={item.name} query={searchQuery} />
              </p>
              {isLowStock && <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-[11px] text-white/50 bg-white/[0.06] px-2 py-0.5 rounded-full flex items-center gap-1">
                <MapPin className="h-2.5 w-2.5" />
                {location.label}
              </span>
              <span className="text-[11px] text-white/50 bg-white/[0.06] px-2 py-0.5 rounded-full">
                {category.label}
              </span>
              {item.supplier && (
                <span className="text-[11px] text-white truncate">
                  <HighlightText text={item.supplier} query={searchQuery} />
                </span>
              )}
            </div>
          </div>

          {/* Right: quantity + stepper */}
          <div
            className="flex items-center gap-1.5 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white touch-manipulation"
              onClick={() => onAdjust(item.id, -step)}
              disabled={item.quantity <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="min-w-[60px] text-center">
              {isEditingQty ? (
                <Input
                  ref={qtyInputRef}
                  type="number"
                  value={editQty}
                  onChange={(e) => setEditQty(e.target.value)}
                  onBlur={handleQtySubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleQtySubmit()}
                  className="h-8 w-16 text-center text-[15px] font-bold p-0 border-elec-yellow/50 bg-transparent"
                  min={0}
                  step={step}
                  autoFocus
                />
              ) : (
                <button type="button" onClick={handleQtyTap} className="touch-manipulation">
                  <p className={cn('text-[17px] font-bold leading-tight', quantityColour)}>
                    {item.quantity}
                  </p>
                  <p className="text-[10px] text-white leading-tight">
                    {item.unit === 'each' ? '' : item.unit}
                  </p>
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white touch-manipulation"
              onClick={() => onAdjust(item.id, step)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
