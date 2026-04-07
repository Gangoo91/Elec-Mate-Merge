import { memo } from 'react';
import { Minus, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  InventoryItem,
  getCategoryConfig,
  getLocationConfig,
  formatQuantity,
  UNIT_STEP,
} from '@/types/inventory';

interface InventoryItemCardProps {
  item: InventoryItem;
  onAdjust: (id: string, delta: number) => void;
  onTap: (item: InventoryItem) => void;
}

export const InventoryItemCard = memo(function InventoryItemCard({
  item,
  onAdjust,
  onTap,
}: InventoryItemCardProps) {
  const category = getCategoryConfig(item.category);
  const location = getLocationConfig(item.location);
  const isLowStock = item.low_stock_threshold != null && item.quantity <= item.low_stock_threshold;
  const step = UNIT_STEP[item.unit] || 1;

  return (
    <div
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 active:bg-white/[0.06] transition-all touch-manipulation"
      onClick={() => onTap(item)}
    >
      <div className="flex items-start gap-3">
        {/* Left: category dot + info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={cn('w-2 h-2 rounded-full flex-shrink-0', category.dotClass)} />
            <p className="text-[15px] font-medium text-white truncate">{item.name}</p>
            {isLowStock && <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-[11px] text-white/50 bg-white/[0.06] px-2 py-0.5 rounded-full">
              {location.label}
            </span>
            <span className="text-[11px] text-white/50 bg-white/[0.06] px-2 py-0.5 rounded-full">
              {category.label}
            </span>
            {item.supplier && (
              <span className="text-[11px] text-white/40 truncate">{item.supplier}</span>
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
            <p
              className={cn(
                'text-[17px] font-bold leading-tight',
                isLowStock ? 'text-amber-400' : 'text-white'
              )}
            >
              {item.quantity}
            </p>
            <p className="text-[10px] text-white/40 leading-tight">
              {item.unit === 'each' ? '' : item.unit}
            </p>
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
    </div>
  );
});
